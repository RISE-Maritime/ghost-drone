"""
ghost_drone/server.py

FastAPI application definition.

STATIC_DIR resolves relative to this file so it works whether the package is
installed in a venv or run in-place from the project root.

API routes (including /ws WebSocket) are declared before the static mount
so they are not shadowed. The static mount at "/" is added last.
With html=True, GET / serves static/index.html automatically.

The app is created via create_app(cfg: AppConfig) which wires in the
ZenohPublisher via a FastAPI lifespan context manager (Phase 3).
"""

import asyncio
import contextlib
import dataclasses
import json
import math
import random
import time  # noqa: F401 — used transitively via SubjectThrottle/telemetry
from pathlib import Path
from typing import Dict

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.staticfiles import StaticFiles

from ghost_drone.config import AppConfig
from ghost_drone.simulation.engine import SimEngine, TICK_HZ
from ghost_drone.simulation.models import SimState
from ghost_drone.simulation.roll_pitch import RollPitchModel
from ghost_drone.zenoh_bridge.publisher import ZenohPublisher
from ghost_drone.zenoh_bridge.telemetry import (
    MPS_TO_KNOTS,
    SubjectThrottle,
    encode_location_fix,
    encode_timestamped_float,
    make_key,
)

# Resolves to <project-root>/static/ regardless of where the process is invoked from.
STATIC_DIR = Path(__file__).parent.parent / "static"


# ---------------------------------------------------------------------------
# Publish settings dataclasses
# ---------------------------------------------------------------------------

@dataclasses.dataclass
class SubjectConfig:
    rate_hz: float = 1.0
    source_id: str = "imu/0"


@dataclasses.dataclass
class PublishSettings:
    subjects: Dict[str, SubjectConfig] = dataclasses.field(
        default_factory=lambda: {
            "location_fix":            SubjectConfig(rate_hz=1.0, source_id="gnss/0"),
            "heading_true_north_deg":  SubjectConfig(rate_hz=1.0, source_id="imu/0"),
            "speed_over_ground_knots": SubjectConfig(rate_hz=1.0, source_id="imu/0"),
            "roll_deg":                SubjectConfig(rate_hz=1.0, source_id="imu/0"),
            "pitch_deg":               SubjectConfig(rate_hz=1.0, source_id="imu/0"),
        }
    )
    roll_amplitude_deg: float = 5.0
    roll_period_s: float = 10.0
    pitch_amplitude_deg: float = 3.0
    pitch_period_s: float = 8.0
    location_noise_sigma_m: float = 0.5


# ---------------------------------------------------------------------------
# Telemetry publish helper
# ---------------------------------------------------------------------------

def _publish_telemetry(
    publisher: ZenohPublisher,
    cfg: AppConfig,
    frame,
    roll: float,
    pitch: float,
    settings: PublishSettings,
    throttle: SubjectThrottle,
) -> None:
    """Publish all 5 subjects if their throttle interval has elapsed.

    Called only when the simulation is PLAYING. Applies user-configured
    Gaussian noise to lat/lng before encoding the location_fix payload.
    """
    for subject, encode_fn, value in [
        ("location_fix",            None,                     None),
        ("heading_true_north_deg",  encode_timestamped_float, frame.heading),
        ("speed_over_ground_knots", encode_timestamped_float, frame.speed * MPS_TO_KNOTS),
        ("roll_deg",                encode_timestamped_float, roll),
        ("pitch_deg",               encode_timestamped_float, pitch),
    ]:
        sc = settings.subjects[subject]
        if not throttle.should_publish(subject, sc.rate_hz):
            continue
        key = make_key(cfg, subject, sc.source_id)
        if subject == "location_fix":
            # Apply user-configured Gaussian noise to lat/lng at publish time.
            # Noise is added here (not in SimEngine) so it is connection-local
            # and configurable via update_settings without touching internal state.
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
        publisher.publish(key, payload)


# ---------------------------------------------------------------------------
# App factory
# ---------------------------------------------------------------------------

def create_app(cfg: AppConfig) -> FastAPI:
    """Create and return the FastAPI application wired to the given config.

    The ZenohPublisher daemon is started at app startup and stopped on shutdown
    via the FastAPI lifespan context manager. The publisher is attached to
    app.state.publisher so websocket handlers can access it.
    """

    @contextlib.asynccontextmanager
    async def lifespan(app: FastAPI):
        pub = ZenohPublisher(endpoint=cfg.zenoh_endpoint)
        pub.start()
        app.state.cfg = cfg
        app.state.publisher = pub
        yield
        pub.stop()

    app = FastAPI(title="ghost-drone", lifespan=lifespan)

    @app.websocket("/ws")
    async def websocket_endpoint(websocket: WebSocket):
        await websocket.accept()
        engine = SimEngine()
        cruise_speed_mps = 10.0  # default, updated by set_speed messages

        # Per-connection publish state (connection-local as per spec)
        settings = PublishSettings()
        roll_pitch = RollPitchModel()
        throttle = SubjectThrottle()

        async def receive_loop():
            nonlocal cruise_speed_mps
            try:
                async for text in websocket.iter_text():
                    msg = json.loads(text)
                    t = msg.get("type")
                    if t == "load_route":
                        wps = [tuple(p) for p in msg["waypoints"]]
                        try:
                            engine.load_route(wps)
                        except ValueError:
                            pass  # fewer than 2 waypoints — ignore
                    elif t == "play":
                        engine.play()
                    elif t == "pause":
                        engine.pause()
                    elif t == "stop":
                        engine.stop()
                    elif t == "set_speed":
                        cruise_speed_mps = float(msg.get("value", cruise_speed_mps))
                    elif t == "update_settings":
                        # Per-subject config updates
                        for subj, sc_data in msg.get("subjects", {}).items():
                            if subj in settings.subjects:
                                if "rate_hz" in sc_data:
                                    settings.subjects[subj].rate_hz = float(sc_data["rate_hz"])
                                if "source_id" in sc_data:
                                    settings.subjects[subj].source_id = str(sc_data["source_id"])
                        # Global oscillation + noise params
                        if "roll_amplitude_deg" in msg:
                            settings.roll_amplitude_deg = float(msg["roll_amplitude_deg"])
                        if "roll_period_s" in msg:
                            settings.roll_period_s = float(msg["roll_period_s"])
                        if "pitch_amplitude_deg" in msg:
                            settings.pitch_amplitude_deg = float(msg["pitch_amplitude_deg"])
                        if "pitch_period_s" in msg:
                            settings.pitch_period_s = float(msg["pitch_period_s"])
                        if "location_noise_sigma_m" in msg:
                            settings.location_noise_sigma_m = float(msg["location_noise_sigma_m"])
                        # Apply updated oscillation params to the live roll/pitch model
                        roll_pitch.roll_amplitude_deg = settings.roll_amplitude_deg
                        roll_pitch.roll_period_s = settings.roll_period_s
                        roll_pitch.pitch_amplitude_deg = settings.pitch_amplitude_deg
                        roll_pitch.pitch_period_s = settings.pitch_period_s
            except WebSocketDisconnect:
                pass

        async def tick_loop():
            dt = 1.0 / TICK_HZ
            prev_state = None
            try:
                while True:
                    frame = engine.tick(dt, cruise_speed_mps=cruise_speed_mps)
                    roll, pitch = roll_pitch.tick(dt, frame.state)

                    # Reset roll/pitch elapsed time and throttle on STOPPED transition
                    # (only on the first tick of the STOPPED state, not every tick)
                    if frame.state == SimState.STOPPED and prev_state != SimState.STOPPED:
                        roll_pitch.reset()
                        throttle.reset()
                    prev_state = frame.state

                    # Publish to zenoh ONLY when PLAYING
                    if frame.state == SimState.PLAYING:
                        publisher = websocket.app.state.publisher
                        _publish_telemetry(publisher, cfg, frame, roll, pitch, settings, throttle)

                    # Send extended frame to browser (always includes roll + pitch)
                    frame_dict = frame.to_dict()
                    frame_dict["roll"] = roll
                    frame_dict["pitch"] = pitch
                    await websocket.send_text(json.dumps(frame_dict))
                    await asyncio.sleep(dt)
            except (WebSocketDisconnect, Exception):
                pass

        await asyncio.gather(receive_loop(), tick_loop())

    # StaticFiles mount LAST — declared here so the /ws route above is not shadowed.
    # html=True makes GET / serve static/index.html automatically.
    app.mount("/", StaticFiles(directory=STATIC_DIR, html=True), name="static")

    return app
