"""
ghost_drone/server.py

Pure-Python simulator process (no web framework).

The simulator publishes sim_frame at 20 Hz and keelson telemetry when PLAYING,
all via zenoh pub/sub. Control commands arrive on the zenoh daemon thread;
the tick loop runs on its own daemon thread.

Entry points:
  - start_simulator(cfg)  context manager for tests / embedding
  - run(cfg)              blocking entry point for CLI use
"""

import contextlib
import json
import math
import random
import signal
import threading
import time

from ghost_drone.config import AppConfig
from ghost_drone.sim_state import SimGlobals
from ghost_drone.simulation.engine import TICK_HZ
from ghost_drone.simulation.models import SimState
from ghost_drone.zenoh_bridge.control import register_control_handlers
from ghost_drone.zenoh_bridge.publisher import ZenohPublisher
from ghost_drone.zenoh_bridge.telemetry import (
    HEALTH_INACTIVE,
    HEALTH_NOMINAL,
    MODE_AUTONOMOUS,
    MODE_IDLE,
    MPS_TO_KNOTS,
    encode_entity_health,
    encode_location_fix,
    encode_timestamped_float,
    make_key,
)


# ---------------------------------------------------------------------------
# Telemetry publish helper
# ---------------------------------------------------------------------------

def _publish_telemetry(
    publisher: ZenohPublisher,
    cfg: AppConfig,
    frame,
    roll: float,
    pitch: float,
    sim: SimGlobals,
    stuck_values: dict,
) -> None:
    """Publish all 5 keelson subjects if their throttle interval has elapsed.

    Called only when the simulation is PLAYING.
    """
    settings = sim.settings
    throttle = sim.throttle

    for subject, encode_fn, value in [
        ("location_fix",            None,                     None),
        ("heading_true_north_deg",  encode_timestamped_float, frame.heading),
        ("speed_over_ground_knots", encode_timestamped_float, frame.speed * MPS_TO_KNOTS),
        ("roll_deg",                encode_timestamped_float, roll),
        ("pitch_deg",               encode_timestamped_float, pitch),
    ]:
        # Skip subjects with active "drop" fault
        if sim.faults.has_fault(subject, "drop"):
            continue
        sc = settings.subjects[subject]
        if not throttle.should_publish(subject, sc.rate_hz):
            continue

        # Handle "stuck" fault: freeze the value at the first reading
        if sim.faults.has_fault(subject, "stuck"):
            if subject not in stuck_values:
                # Capture the current value to freeze on
                if subject == "location_fix":
                    stuck_values[subject] = (frame.lat, frame.lng)
                else:
                    stuck_values[subject] = value
            # Use the frozen value
            if subject == "location_fix":
                frozen_lat, frozen_lng = stuck_values[subject]
                payload = encode_location_fix(frozen_lat, frozen_lng)
            else:
                payload = encode_fn(stuck_values[subject])
        else:
            # Clear any stale stuck value so re-injection captures fresh
            stuck_values.pop(subject, None)

            if subject == "location_fix":
                lat_noise = random.gauss(0, settings.location_noise_sigma_m / 111_320)
                lng_noise = random.gauss(
                    0,
                    settings.location_noise_sigma_m
                    / (111_320 * math.cos(math.radians(frame.lat))),
                )
                noisy_lat = frame.lat + lat_noise
                noisy_lng = frame.lng + lng_noise
                payload = encode_location_fix(noisy_lat, noisy_lng)
            else:
                payload = encode_fn(value)

        key = make_key(cfg, subject, sc.source_id)
        publisher.publish(key, payload)


HEALTH_SUBJECT = "entity_health"
HEALTH_SOURCE_ID = "system/0"
HEALTH_RATE_HZ = 1.0

# Subsystems that the ghost drone reports health for.
_SUBSYSTEMS = ("position", "heading", "speed")


def _publish_health(
    publisher: ZenohPublisher,
    cfg: AppConfig,
    sim: SimGlobals,
    is_playing: bool,
) -> None:
    """Publish an EntityHealth message at a throttled rate."""
    if not sim.throttle.should_publish(HEALTH_SUBJECT, HEALTH_RATE_HZ):
        return

    if is_playing:
        level = HEALTH_NOMINAL
        operation_mode = MODE_AUTONOMOUS
        subsystems = [(name, HEALTH_NOMINAL, "") for name in _SUBSYSTEMS]
    else:
        level = HEALTH_INACTIVE
        operation_mode = MODE_IDLE
        subsystems = [(name, HEALTH_INACTIVE, "") for name in _SUBSYSTEMS]

    telemetry_expectations = [
        (subject, sc.source_id, sc.rate_hz)
        for subject, sc in sim.settings.subjects.items()
    ]

    key = make_key(cfg, HEALTH_SUBJECT, HEALTH_SOURCE_ID)
    publisher.publish(
        key,
        encode_entity_health(
            level, HEALTH_RATE_HZ, operation_mode, "", subsystems, telemetry_expectations,
        ),
    )


def _publish_sim_frame(
    publisher: ZenohPublisher,
    cfg: AppConfig,
    frame_dict: dict,
) -> None:
    """Publish the sim_frame JSON to the browser via zenoh pub/sub."""
    key = f"{cfg.keelson_prefix}/pubsub/sim_frame/engine/0"
    publisher.publish(key, json.dumps(frame_dict).encode())


# ---------------------------------------------------------------------------
# Tick loop (daemon thread)
# ---------------------------------------------------------------------------

def _tick_loop(
    publisher: ZenohPublisher,
    cfg: AppConfig,
    sim: SimGlobals,
    stop_event: threading.Event,
) -> None:
    """Daemon thread body: advance simulation at TICK_HZ, publish frames."""
    dt = 1.0 / TICK_HZ
    prev_state = None
    stuck_values: dict = {}

    while not stop_event.is_set():
        frame = sim.engine.tick(dt, cruise_speed_mps=sim.cruise_speed_mps)
        roll, pitch = sim.roll_pitch.tick(dt, frame.state)

        # Reset roll/pitch elapsed time and throttle on STOPPED transition
        if frame.state == SimState.STOPPED and prev_state != SimState.STOPPED:
            sim.roll_pitch.reset()
            sim.throttle.reset()
        prev_state = frame.state

        # Publish keelson telemetry only when PLAYING
        if frame.state == SimState.PLAYING:
            _publish_telemetry(publisher, cfg, frame, roll, pitch, sim, stuck_values)

        # Health is always published (so subscribers know inactive vs nominal)
        _publish_health(publisher, cfg, sim, frame.state == SimState.PLAYING)

        # Always publish sim_frame for the browser UI
        frame_dict = frame.to_dict()
        frame_dict["roll"] = roll
        frame_dict["pitch"] = pitch
        _publish_sim_frame(publisher, cfg, frame_dict)

        time.sleep(dt)


# ---------------------------------------------------------------------------
# Simulator handle (returned by start_simulator)
# ---------------------------------------------------------------------------

class SimHandle:
    """Holds references to the running simulator components."""

    __slots__ = ("publisher", "sim", "cfg")

    def __init__(self, publisher: ZenohPublisher, sim: SimGlobals, cfg: AppConfig):
        self.publisher = publisher
        self.sim = sim
        self.cfg = cfg


# ---------------------------------------------------------------------------
# Context manager for starting/stopping the simulator
# ---------------------------------------------------------------------------

@contextlib.contextmanager
def start_simulator(cfg: AppConfig):
    """Start the simulator (publisher + tick loop), yield a SimHandle, then clean up.

    Used by tests and by run() for CLI invocation.
    """
    sim = SimGlobals()

    def on_session_ready(session):
        sim.control_handles = register_control_handlers(session, cfg, sim)

    pub = ZenohPublisher(
        endpoint=cfg.zenoh_endpoint,
        on_session_ready=on_session_ready,
    )
    pub.start()

    tick_stop = threading.Event()
    tick_thread = threading.Thread(
        target=_tick_loop, args=(pub, cfg, sim, tick_stop),
        name="tick-loop", daemon=True,
    )
    tick_thread.start()

    try:
        yield SimHandle(publisher=pub, sim=sim, cfg=cfg)
    finally:
        tick_stop.set()
        tick_thread.join(timeout=2.0)
        pub.stop()


# ---------------------------------------------------------------------------
# Blocking entry point for CLI
# ---------------------------------------------------------------------------

def run(cfg: AppConfig) -> None:
    """Start the simulator and block until interrupted (Ctrl+C)."""
    stop = threading.Event()

    def _on_signal(signum, frame):
        stop.set()

    signal.signal(signal.SIGINT, _on_signal)
    signal.signal(signal.SIGTERM, _on_signal)

    with start_simulator(cfg):
        print("Simulator running. Press Ctrl+C to stop.")
        stop.wait()

    print("\nSimulator stopped.")
