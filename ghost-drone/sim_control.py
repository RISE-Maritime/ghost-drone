#!/usr/bin/env python3
"""
Ghost-drone simulation lifecycle controller.

Implements the keelson SimulationControl and VehicleSimulatorControl RPC
interfaces over Zenoh, backed by ArduPilot SITL via MAVLink on the
second serial port (default: tcp:localhost:5762).

State machine (from SimulationControl.proto):

    STOPPED ──start──► RUNNING ──pause──► PAUSED
       ▲                  │                  │
       └──── stop ◄───────┴──────start───────┘

set_initial_pose is valid only in STOPPED state; it (re)places the
vehicle via MAV_CMD_DO_REPOSITION and remains in STOPPED.

Zenoh RPCs served:
  {realm}/@v0/{entity_id}/@rpc/SimulationControl/start/{source_id}
  {realm}/@v0/{entity_id}/@rpc/SimulationControl/pause/{source_id}
  {realm}/@v0/{entity_id}/@rpc/SimulationControl/stop/{source_id}
  {realm}/@v0/{entity_id}/@rpc/VehicleSimulatorControl/set_initial_pose/{source_id}

Published:
  {realm}/@v0/{entity_id}/pubsub/simulation_status/{source_id}
"""

import argparse
import logging
import math
import threading
import time

import zenoh
from google.protobuf.timestamp_pb2 import Timestamp
from pymavlink import mavutil

import keelson
from keelson import enclose
from keelson.interfaces.ErrorResponse_pb2 import ErrorResponse
from keelson.interfaces.SimulationControl_pb2 import (
    PauseResponse,
    StartResponse,
    StopResponse,
)
from keelson.interfaces.VehicleSimulatorControl_pb2 import (
    InitialPose,
    SetInitialPoseResponse,
)
from keelson.payloads.SimulationStatus_pb2 import SimulationStatus
from keelson.scaffolding import (
    GracefulShutdown,
    add_common_arguments,
    create_zenoh_config,
)

logger = logging.getLogger("sim_control")

_lock = threading.Lock()
_state: int = SimulationStatus.STOPPED
_stored_pose: InitialPose | None = None


# ── MAVLink helpers ───────────────────────────────────────────────────────────

def _connect_mavlink(url: str, source_system: int, retries: int = 30) -> mavutil.mavfile:
    """Connect to SITL, retrying until the port is available."""
    for attempt in range(retries):
        try:
            mav = mavutil.mavlink_connection(url, source_system=source_system, source_component=190)
            return mav
        except OSError:
            if attempt < retries - 1:
                logger.debug("MAVLink not ready (attempt %d/%d), retrying...", attempt + 1, retries)
                time.sleep(1.0)
    raise RuntimeError(f"Could not connect MAVLink at {url} after {retries}s")


def _set_param(mav, name: str, value: float) -> bool:
    """Set an ArduPilot parameter and wait for ack."""
    mav.mav.param_set_send(
        mav.target_system,
        mav.target_component,
        name.encode().ljust(16, b"\x00"),
        value,
        mavutil.mavlink.MAV_PARAM_TYPE_REAL32,
    )
    ack = mav.recv_match(type="PARAM_VALUE", blocking=True, timeout=3.0)
    return ack is not None


def _set_speedup(mav, value: float):
    if not _set_param(mav, "SIM_SPEEDUP", value):
        logger.warning("SIM_SPEEDUP param ack timed out (value=%.1f)", value)


def _reposition(mav, pose: InitialPose, target_system: int, target_component: int):
    """
    Teleport the SITL vehicle to the given pose.

    Uses MAV_CMD_DO_REPOSITION with the CHANGE_MODE flag (=1), which
    switches the autopilot to GUIDED mode and moves it to the target
    position.  For a disarmed rover/boat the physics engine repositions
    the body directly.
    """
    mav.mav.command_long_send(
        target_system,
        target_component,
        mavutil.mavlink.MAV_CMD_DO_REPOSITION,
        0,                      # confirmation
        -1,                     # ground speed (-1 = keep current)
        1,                      # MAV_DO_REPOSITION_FLAGS_CHANGE_MODE
        0,                      # loiter radius (unused for rover)
        math.radians(pose.heading_deg),
        pose.position.latitude,
        pose.position.longitude,
        pose.position.altitude,
    )
    ack = mav.recv_match(type="COMMAND_ACK", blocking=True, timeout=3.0)
    if ack is None:
        logger.warning("DO_REPOSITION ack timed out")


# ── Zenoh reply helpers ───────────────────────────────────────────────────────

def _reply_ok(query, key: str, payload: bytes):
    try:
        query.reply(key, payload)
    except Exception:
        logger.exception("Failed to reply OK on RPC %s", key)


def _reply_invalid_state(query, msg: str):
    try:
        query.reply_err(
            ErrorResponse(
                error_description=msg,
                code=ErrorResponse.INVALID_STATE,
            ).SerializeToString()
        )
    except Exception:
        logger.exception("Failed to reply_err")


def _now_timestamp() -> Timestamp:
    ts = Timestamp()
    ts.FromNanoseconds(time.time_ns())
    return ts


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    add_common_arguments(parser)
    parser.add_argument("-r", "--realm", required=True)
    parser.add_argument("-e", "--entity-id", required=True)
    parser.add_argument("-s", "--source-id", required=True)
    parser.add_argument(
        "--mavlink-url",
        default="tcp:localhost:5762",
        help="pymavlink URL for SITL second serial port (default: tcp:localhost:5762)",
    )
    parser.add_argument("--target-system", type=int, default=1)
    parser.add_argument("--target-component", type=int, default=1)
    parser.add_argument(
        "--status-interval",
        type=float,
        default=1.0,
        help="Seconds between simulation_status publications",
    )
    args = parser.parse_args()

    logging.basicConfig(
        level=args.log_level,
        format="%(asctime)s %(levelname)s %(name)s %(message)s",
    )

    # ── MAVLink ───────────────────────────────────────────────────────────────
    logger.info("Connecting MAVLink: %s (will retry up to 30s)", args.mavlink_url)
    mav = _connect_mavlink(args.mavlink_url, source_system=255)
    mav.target_system = args.target_system
    mav.target_component = args.target_component

    logger.info("Waiting for HEARTBEAT...")
    hb = mav.wait_heartbeat(timeout=15)
    if hb is None:
        logger.error("No heartbeat received; is SITL running?")
        raise SystemExit(1)
    logger.info("MAVLink connected (sysid=%d)", hb.get_srcSystem())

    # ── Zenoh ─────────────────────────────────────────────────────────────────
    conf = create_zenoh_config(mode=args.mode, connect=args.connect, listen=args.listen)
    session = zenoh.open(conf)
    logger.info("Zenoh session open")

    def rpc_key(proc: str) -> str:
        return keelson.construct_rpc_key(args.realm, args.entity_id, proc, args.source_id)

    # ── simulation_status publisher ───────────────────────────────────────────
    status_key = keelson.construct_pubsub_key(
        args.realm, args.entity_id, "simulation_status", args.source_id
    )
    pub = session.declare_publisher(status_key)
    logger.info("Declared publisher: %s", status_key)

    sim_id = f"{args.entity_id}/{args.source_id}"

    def _publish_status():
        with _lock:
            current = _state
        msg = SimulationStatus(
            timestamp=_now_timestamp(),
            state=current,
            name="ghost-drone-sitl",
            id=sim_id,
            simulation_timestamp=_now_timestamp(),
        )
        pub.put(enclose(msg.SerializeToString()))

    # ── RPC handlers ──────────────────────────────────────────────────────────
    global _state, _stored_pose

    def _on_start(query):
        global _state
        with _lock:
            if _state == SimulationStatus.RUNNING:
                _reply_invalid_state(query, "already RUNNING")
                return
            _set_speedup(mav, 1.0)
            _state = SimulationStatus.RUNNING
        logger.info("start → RUNNING")
        _reply_ok(query, rpc_key("SimulationControl/start"), StartResponse().SerializeToString())
        _publish_status()

    def _on_pause(query):
        global _state
        with _lock:
            if _state != SimulationStatus.RUNNING:
                _reply_invalid_state(query, "can only pause while RUNNING")
                return
            _set_speedup(mav, 0.0)
            _state = SimulationStatus.PAUSED
        logger.info("pause → PAUSED")
        _reply_ok(query, rpc_key("SimulationControl/pause"), PauseResponse().SerializeToString())
        _publish_status()

    def _on_stop(query):
        global _state
        with _lock:
            _set_speedup(mav, 0.0)
            if _stored_pose is not None:
                _reposition(mav, _stored_pose, args.target_system, args.target_component)
            _state = SimulationStatus.STOPPED
        logger.info("stop → STOPPED")
        _reply_ok(query, rpc_key("SimulationControl/stop"), StopResponse().SerializeToString())
        _publish_status()

    def _on_set_initial_pose(query):
        global _state, _stored_pose
        pose = InitialPose()
        payload = query.payload
        if payload is not None:
            pose.ParseFromString(bytes(payload.to_bytes()))

        with _lock:
            if _state in (SimulationStatus.RUNNING, SimulationStatus.PAUSED):
                state_name = SimulationStatus.SimulationState.Name(_state)
                _reply_invalid_state(
                    query,
                    f"set_initial_pose not valid while {state_name}; call stop first",
                )
                return
            _stored_pose = pose
            _reposition(mav, pose, args.target_system, args.target_component)

        logger.info(
            "set_initial_pose lat=%.6f lon=%.6f alt=%.1f hdg=%.1f sog=%.2f",
            pose.position.latitude,
            pose.position.longitude,
            pose.position.altitude,
            pose.heading_deg,
            pose.sog_mps,
        )
        _reply_ok(
            query,
            rpc_key("VehicleSimulatorControl/set_initial_pose"),
            SetInitialPoseResponse().SerializeToString(),
        )
        _publish_status()

    # ── Declare queryables ────────────────────────────────────────────────────
    handlers = {
        "SimulationControl/start": _on_start,
        "SimulationControl/pause": _on_pause,
        "SimulationControl/stop": _on_stop,
        "VehicleSimulatorControl/set_initial_pose": _on_set_initial_pose,
    }
    queryables = []
    for proc, handler in handlers.items():
        key = rpc_key(proc)
        queryables.append(session.declare_queryable(key, handler))
        logger.info("Declared RPC queryable: %s", key)

    # ── Status publish loop ───────────────────────────────────────────────────
    logger.info("Simulation control ready (state=STOPPED)")
    # GracefulShutdown handles SIGTERM as well as SIGINT. Without it, a plain
    # `docker stop` kills this process outright — Python only installs a handler
    # for SIGINT, so the finally block below would never run and the queryables
    # would stay advertised on the bus until peers timed them out.
    try:
        with GracefulShutdown() as shutdown:
            while not shutdown.is_requested():
                _publish_status()
                # wait() rather than sleep() so a signal is acted on at once
                # instead of after the remainder of the interval.
                shutdown.wait(timeout=args.status_interval)
    finally:
        for q in queryables:
            q.undeclare()
        pub.undeclare()
        session.close()
        mav.close()


if __name__ == "__main__":
    main()
