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
import queue
import threading
import time

import zenoh
from google.protobuf.timestamp_pb2 import Timestamp
from pymavlink import mavutil

# Explicit dialect rather than mavutil.mavlink, which binds whatever dialect
# pymavlink happened to load last. ardupilotmega is the ArduPilot superset and
# is what makes MAV_RESULT_* / MAV_CMD_* references reliable.
from pymavlink.dialects.v20 import ardupilotmega as mavlink_dialect

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
# SITL is launched with --speedup 1 (see entrypoint.sh), so physics is already
# advancing and telemetry already flowing when this process starts. RUNNING is
# the honest value; STOPPED would misreport from the first second.
_state: int = SimulationStatus.RUNNING
_stored_pose: InitialPose | None = None

# Guards mutation of mav.message_hooks. The recv thread iterates the list
# without taking it; a mid-iteration append/remove is benign for our use.
_HOOK_LOCK = threading.Lock()


# ── MAVLink receive pump ──────────────────────────────────────────────────────
#
# Adapted from keelson's mavlink2keelson.py, which is not importable — the
# connector package ships no Python modules, so pip install gives dependencies
# only.
#
# The point of all this: exactly ONE thread may call recv_match. Previously
# each RPC handler read the socket itself, so SITL's HEARTBEATs piled up
# unread between calls and the next recv_match(type="PARAM_VALUE") could be
# satisfied instantly by a stale frame from a previous command. Waiters now
# get their own queue, fed by a hook that filters before enqueueing, so a
# non-matching frame can never end a wait and nothing received before the
# subscription opened can satisfy it.


class _ReplySubscription:
    """Collects matching MAVLink messages into a private queue while open."""

    def __init__(self, mav, types=None, predicate=None, name="sub", maxsize=64):
        self._mav = mav
        self._types = set(types) if types else None
        self._predicate = predicate
        self._name = name
        self._installed = False
        self._dropped = 0
        self.queue: queue.Queue = queue.Queue(maxsize=maxsize)

    def _hook(self, _mav_conn, msg) -> None:
        try:
            if self._types is not None and msg.get_type() not in self._types:
                return
            if self._predicate is not None and not self._predicate(msg):
                return
            self.queue.put_nowait(msg)
        except queue.Full:
            self._dropped += 1
        except Exception:
            # Never let a waiter's hook kill the recv thread.
            logger.exception("subscribe(%s): hook raised", self._name)

    def __enter__(self):
        with _HOOK_LOCK:
            self._mav.message_hooks.append(self._hook)
            self._installed = True
        return self

    def __exit__(self, *_exc):
        with _HOOK_LOCK:
            if self._installed:
                try:
                    self._mav.message_hooks.remove(self._hook)
                except ValueError:
                    pass
                self._installed = False
        if self._dropped:
            logger.warning("subscribe(%s): dropped %d message(s)", self._name, self._dropped)

    def get(self, timeout: float):
        return self.queue.get(timeout=timeout)


def subscribe(mav, types=None, predicate=None, name="sub", maxsize=64):
    """Open a filtered subscription. Always subscribe BEFORE sending."""
    return _ReplySubscription(mav, types=types, predicate=predicate, name=name, maxsize=maxsize)


def _run_recv_loop(mav, stop_event: threading.Event, recv_timeout: float = 0.5) -> None:
    """Sole reader of the MAVLink link; drives message_hooks for all waiters."""
    while not stop_event.is_set():
        try:
            got_frame = False
            # Drain everything currently buffered in one pass. blocking=False
            # is deliberate: pymavlink's blocking recv_match busy-spins on a
            # half-closed TCP socket.
            while not stop_event.is_set():
                if mav.recv_match(blocking=False) is None:
                    break
                got_frame = True
            if got_frame:
                continue  # more may have arrived while we drained
            mav.select(recv_timeout)  # idle: park instead of spinning
        except Exception:
            if stop_event.is_set():
                break
            logger.exception("MAVLink recv loop error")
            time.sleep(0.5)
    logger.info("MAVLink recv loop stopped")


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


def _param_id_of(msg) -> str:
    """pymavlink yields param_id as str or bytes, NUL-padded to 16."""
    pname = msg.param_id
    if isinstance(pname, bytes):
        pname = pname.decode("utf-8", "replace")
    return pname.rstrip("\x00")


def _set_param(mav, name: str, value: float, timeout: float = 3.0) -> bool:
    """
    Set an ArduPilot parameter and confirm the read-back.

    Returns True only if a PARAM_VALUE for *this* parameter came back carrying
    the value we asked for. Any PARAM_VALUE used to count as success, so a
    clamped or rejected write was indistinguishable from an accepted one.
    """
    deadline = time.monotonic() + timeout
    with subscribe(
        mav,
        types=("PARAM_VALUE",),
        predicate=lambda m: _param_id_of(m) == name,
        name=f"param:{name}",
    ) as sub:
        # Send after subscribing so a fast reply cannot race past the waiter.
        mav.mav.param_set_send(
            mav.target_system,
            mav.target_component,
            name.encode().ljust(16, b"\x00"),
            value,
            mavlink_dialect.MAV_PARAM_TYPE_REAL32,
        )
        while True:
            remaining = deadline - time.monotonic()
            if remaining <= 0:
                logger.warning("%s: no PARAM_VALUE within %.1fs", name, timeout)
                return False
            try:
                msg = sub.get(timeout=remaining)
            except queue.Empty:
                logger.warning("%s: no PARAM_VALUE within %.1fs", name, timeout)
                return False

            actual = float(msg.param_value)
            # Tolerance covers the float32 round-trip, not a real difference.
            if math.isclose(actual, value, rel_tol=1e-6, abs_tol=1e-6):
                return True
            logger.warning(
                "%s: autopilot reported %.4f after we asked for %.4f "
                "(clamped or rejected)",
                name, actual, value,
            )
            return False


def _set_speedup(mav, value: float) -> bool:
    if not _set_param(mav, "SIM_SPEEDUP", value):
        logger.warning("SIM_SPEEDUP not confirmed at %.1f", value)
        return False
    return True


def _reposition(
    mav,
    pose: InitialPose,
    target_system: int,
    target_component: int,
    timeout: float = 3.0,
) -> bool:
    """
    Teleport the SITL vehicle to the given pose.

    Uses MAV_CMD_DO_REPOSITION with the CHANGE_MODE flag (=1), which
    switches the autopilot to GUIDED mode and moves it to the target
    position.  For a disarmed rover/boat the physics engine repositions
    the body directly.

    Returns True only on MAV_RESULT_ACCEPTED. Previously any COMMAND_ACK —
    including a DENIED — was treated as success and logged nothing.
    """
    command = mavlink_dialect.MAV_CMD_DO_REPOSITION
    with subscribe(
        mav,
        types=("COMMAND_ACK",),
        predicate=lambda m: int(m.command) == command,
        name="ack:DO_REPOSITION",
    ) as sub:
        # Send after subscribing so a fast ack cannot race past the waiter.
        mav.mav.command_long_send(
            target_system,
            target_component,
            command,
            0,                      # confirmation
            -1,                     # ground speed (-1 = keep current)
            1,                      # MAV_DO_REPOSITION_FLAGS_CHANGE_MODE
            0,                      # loiter radius (unused for rover)
            math.radians(pose.heading_deg),
            pose.position.latitude_deg,
            pose.position.longitude_deg,
            0,                      # altitude: Coordinate carries lat/lon only
        )
        try:
            ack = sub.get(timeout=timeout)
        except queue.Empty:
            logger.warning("DO_REPOSITION: no COMMAND_ACK within %.1fs", timeout)
            return False

    raw = int(ack.result)
    if raw == mavlink_dialect.MAV_RESULT_ACCEPTED:
        return True
    # Keep the raw value so DENIED is distinguishable from TEMPORARILY_REJECTED.
    logger.warning("DO_REPOSITION rejected by autopilot (MAV_RESULT=%d)", raw)
    return False


def _parse_home(value: str) -> InitialPose | None:
    """
    Parse SITL_HOME format 'lat,lon,alt,heading' into an InitialPose.

    The altitude field is parsed and discarded: keelson's Coordinate carries
    latitude_deg/longitude_deg only, and a surface vessel has no use for it.
    """
    try:
        lat, lon, _alt, hdg = (float(p) for p in value.split(","))
    except ValueError:
        logger.warning(
            "Could not parse --home %r (want 'lat,lon,alt,heading'); "
            "stop will not reset position until set_initial_pose is called",
            value,
        )
        return None
    pose = InitialPose()
    pose.position.latitude_deg = lat
    pose.position.longitude_deg = lon
    pose.heading_deg = hdg
    pose.sog_mps = 0.0
    return pose


# ── Zenoh reply helpers ───────────────────────────────────────────────────────

def _reply_ok(query, key: str, payload: bytes):
    try:
        query.reply(key, payload)
    except Exception:
        logger.exception("Failed to reply OK on RPC %s", key)


def _reply_error(query, msg: str, code: int):
    try:
        query.reply_err(
            ErrorResponse(error_description=msg, code=code).SerializeToString()
        )
    except Exception:
        logger.exception("Failed to reply_err")


def _reply_invalid_state(query, msg: str):
    _reply_error(query, msg, ErrorResponse.INVALID_STATE)


def _reply_mavlink_failed(query, msg: str):
    """The autopilot rejected the command, or never acknowledged it."""
    _reply_error(query, msg, ErrorResponse.IO_FAILURE)


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
    parser.add_argument(
        "--home",
        default=None,
        help="Initial pose as 'lat,lon,alt,heading' (same format as SITL_HOME). "
             "Seeds the pose that stop resets to, before any set_initial_pose.",
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

    # Take over the link: from here nothing else may call recv_match, so RPC
    # waiters get their replies through filtered subscriptions instead of
    # racing each other for whatever is next in the socket buffer.
    recv_stop = threading.Event()
    recv_thread = threading.Thread(
        target=_run_recv_loop,
        args=(mav, recv_stop),
        name="mavlink-recv",
        daemon=True,
    )
    recv_thread.start()

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

    # Seed the pose stop() resets to. Without this, stop on a drone that never
    # received set_initial_pose just freezes wherever it drifted, contrary to
    # SimulationControl.proto ("reset to the configured / last-set pose").
    if args.home:
        _stored_pose = _parse_home(args.home)
        if _stored_pose is not None:
            logger.info(
                "Initial pose from --home: lat=%.6f lon=%.6f hdg=%.1f",
                _stored_pose.position.latitude_deg,
                _stored_pose.position.longitude_deg,
                _stored_pose.heading_deg,
            )

    def _on_start(query):
        global _state
        with _lock:
            if _state == SimulationStatus.RUNNING:
                _reply_invalid_state(query, "already RUNNING")
                return
            if not _set_speedup(mav, 1.0):
                _reply_mavlink_failed(query, "autopilot did not confirm SIM_SPEEDUP=1")
                return
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
            if not _set_speedup(mav, 0.0):
                _reply_mavlink_failed(query, "autopilot did not confirm SIM_SPEEDUP=0")
                return
            _state = SimulationStatus.PAUSED
        logger.info("pause → PAUSED")
        _reply_ok(query, rpc_key("SimulationControl/pause"), PauseResponse().SerializeToString())
        _publish_status()

    def _on_stop(query):
        global _state
        with _lock:
            if not _set_speedup(mav, 0.0):
                _reply_mavlink_failed(query, "autopilot did not confirm SIM_SPEEDUP=0")
                return
            # _stored_pose is seeded from --home at startup, so this normally
            # runs even before any set_initial_pose.
            #
            # A failed reposition is logged but does NOT fail the RPC: halting
            # is stop's primary effect and it succeeded. Returning an error
            # here would also leave the state machine inconsistent — speedup
            # already 0 while _state still said RUNNING. Note ArduRover
            # answers DO_REPOSITION with MAV_RESULT_UNSUPPORTED, so on a boat
            # frame this warning is the normal path today.
            if _stored_pose is not None:
                if not _reposition(mav, _stored_pose, args.target_system, args.target_component):
                    logger.warning("stop: halted, but could not reset to the initial pose")
            else:
                logger.warning("stop: no initial pose known, halting in place")
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
            if not _reposition(mav, pose, args.target_system, args.target_component):
                _reply_mavlink_failed(query, "autopilot rejected reposition")
                return
            _stored_pose = pose

        logger.info(
            "set_initial_pose lat=%.6f lon=%.6f hdg=%.1f sog=%.2f",
            pose.position.latitude_deg,
            pose.position.longitude_deg,
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
    logger.info(
        "Simulation control ready (state=%s)",
        SimulationStatus.SimulationState.Name(_state),
    )
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
        # Stop the reader before closing the link, or it will spin on a dead
        # socket during teardown.
        recv_stop.set()
        recv_thread.join(timeout=2.0)
        for q in queryables:
            q.undeclare()
        pub.undeclare()
        session.close()
        mav.close()


if __name__ == "__main__":
    main()
