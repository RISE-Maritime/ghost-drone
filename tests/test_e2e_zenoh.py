"""
End-to-end test: zenoh telemetry publishing during simulation.

Starts an in-process zenoh router, runs the ghost-drone FastAPI app via
Starlette's TestClient, connects a WebSocket, drives the simulation to
PLAYING, and asserts that all 5 keelson subjects arrive and decode correctly.

No external zenoh daemon or browser required.
"""

import json
import time
import threading

import keelson
import pytest
import zenoh
from keelson.payloads.Primitives_pb2 import TimestampedFloat
from keelson.payloads.foxglove.LocationFix_pb2 import LocationFix
from starlette.testclient import TestClient

from ghost_drone.config import AppConfig
from ghost_drone.server import create_app

# Non-standard port to avoid colliding with a real zenoh instance.
_ROUTER_ENDPOINT = "tcp/127.0.0.1:17447"

# Two waypoints near the default map centre (Lindholmen, Gothenburg).
_ROUTE = [[57.7069, 11.9381], [57.7100, 11.9420]]


@pytest.fixture(scope="module")
def zenoh_router():
    """In-process zenoh router that the ghost-drone publisher connects to."""
    cfg = zenoh.Config.from_json5(json.dumps({
        "mode": "router",
        "listen": {"endpoints": [_ROUTER_ENDPOINT]},
        "scouting": {"multicast": {"enabled": False}},
    }))
    session = zenoh.open(cfg)
    time.sleep(0.2)  # allow the router to bind before clients connect
    yield session
    session.close()


def test_all_five_subjects_published_and_decode(zenoh_router):
    """
    Drives the simulation to PLAYING and asserts that all 5 keelson subjects
    are received via zenoh and decode to valid protobuf messages.
    """
    cfg = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm="ghost-drone",
        entity_id="sim001",
    )
    app = create_app(cfg)

    received: dict[str, bytes] = {}
    received_lock = threading.Lock()

    # Subscriber session — client mode connecting to our in-process router.
    sub_cfg = zenoh.Config.from_json5(json.dumps({
        "mode": "client",
        "connect": {"endpoints": [_ROUTER_ENDPOINT]},
    }))
    sub_session = zenoh.open(sub_cfg)
    time.sleep(0.1)

    def on_sample(sample):
        # Key format: realm/@v1/entity_id/pubsub/<subject>/<source_id>
        parts = str(sample.key_expr).split("/")
        if len(parts) >= 5:
            subject = parts[4]
            with received_lock:
                # Keep the first sample per subject for deterministic decoding.
                received.setdefault(subject, bytes(sample.payload))

    # zenoh treats @ as a special segment separator — "**" does not cross it.
    # The full key pattern is: realm/@v1/entity_id/pubsub/subject/source_id
    subscriber = sub_session.declare_subscriber("ghost-drone/@v1/**", on_sample)

    try:
        with TestClient(app) as client:
            with client.websocket_connect("/ws") as ws:
                ws.send_json({"type": "load_route", "waypoints": _ROUTE})
                ws.send_json({"type": "play"})

                # Drain WS frames for 3 seconds.
                # Default publish rate is 1 Hz per subject; 3 s is enough for
                # every subject to fire at least once.
                deadline = time.monotonic() + 3.0
                while time.monotonic() < deadline:
                    ws.receive_json()  # blocks ~50 ms per tick (20 Hz)

                ws.send_json({"type": "stop"})
    finally:
        subscriber.undeclare()
        sub_session.close()

    # --- Check all 5 subjects arrived ---
    expected = {
        "heading_true_north_deg",
        "speed_over_ground_knots",
        "roll_deg",
        "pitch_deg",
        "location_fix",
    }
    missing = expected - set(received.keys())
    assert not missing, f"Subjects not received within timeout: {missing}"

    # --- Decode TimestampedFloat subjects ---
    for subject in ("heading_true_north_deg", "speed_over_ground_knots", "roll_deg", "pitch_deg"):
        _recv_at, enclosed_at, proto_bytes = keelson.uncover(received[subject])
        msg = TimestampedFloat()
        msg.ParseFromString(proto_bytes)
        assert enclosed_at > 0, f"{subject}: enclosed_at is zero"
        assert msg.timestamp.ToNanoseconds() > 0, f"{subject}: proto timestamp is zero"

    # --- Decode location_fix ---
    _recv_at, enclosed_at, proto_bytes = keelson.uncover(received["location_fix"])
    lf = LocationFix()
    lf.ParseFromString(proto_bytes)
    assert enclosed_at > 0, "location_fix: enclosed_at is zero"
    assert lf.timestamp.ToNanoseconds() > 0, "location_fix: proto timestamp is zero"
    # Latitude should be near the simulated route (57.7 ± 0.01°).
    assert 57.69 < lf.latitude < 57.72, f"location_fix: unexpected latitude {lf.latitude}"


def test_no_messages_published_when_stopped(zenoh_router):
    """
    Asserts that no zenoh messages are published while the simulation is stopped.
    """
    cfg = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm="ghost-drone",
        entity_id="sim001",
    )
    app = create_app(cfg)

    received_count = 0
    lock = threading.Lock()

    sub_cfg = zenoh.Config.from_json5(json.dumps({
        "mode": "client",
        "connect": {"endpoints": [_ROUTER_ENDPOINT]},
    }))
    sub_session = zenoh.open(sub_cfg)
    time.sleep(0.1)

    def on_sample(_sample):
        nonlocal received_count
        with lock:
            received_count += 1

    subscriber = sub_session.declare_subscriber("ghost-drone/@v1/**", on_sample)

    try:
        with TestClient(app) as client:
            with client.websocket_connect("/ws") as ws:
                # Load route but do NOT play — stay in STOPPED state.
                ws.send_json({"type": "load_route", "waypoints": _ROUTE})

                # Wait 1.5 seconds (longer than the 1 Hz publish interval).
                deadline = time.monotonic() + 1.5
                while time.monotonic() < deadline:
                    ws.receive_json()
    finally:
        subscriber.undeclare()
        sub_session.close()

    assert received_count == 0, (
        f"Expected 0 zenoh messages while stopped, got {received_count}"
    )
