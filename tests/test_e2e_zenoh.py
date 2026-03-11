"""
End-to-end test: zenoh telemetry publishing during simulation.

Starts an in-process zenoh router, runs the ghost-drone simulator via
start_simulator(), drives the simulation via zenoh control commands
(put for play/stop, get for load_route/settings), and asserts that all 5
keelson subjects arrive and decode correctly.

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

from ghost_drone.config import AppConfig
from ghost_drone.server import start_simulator

# Non-standard port to avoid colliding with a real zenoh instance.
_ROUTER_ENDPOINT = "tcp/127.0.0.1:17447"

# Two waypoints near the default map centre (Lindholmen, Gothenburg).
_ROUTE = [[57.7069, 11.9381], [57.7100, 11.9420]]

# Key expression prefix for test config
_PREFIX = "rise/@v0/ghost-drone"


@pytest.fixture(scope="module")
def zenoh_router():
    """In-process zenoh router that the ghost-drone publisher connects to."""
    cfg = zenoh.Config.from_json5(
        json.dumps(
            {
                "mode": "router",
                "listen": {"endpoints": [_ROUTER_ENDPOINT]},
                "scouting": {"multicast": {"enabled": False}},
            }
        )
    )
    session = zenoh.open(cfg)
    time.sleep(0.2)  # allow the router to bind before clients connect
    yield session
    session.close()


def _make_client_session():
    """Open a zenoh client session connected to the test router."""
    sub_cfg = zenoh.Config.from_json5(
        json.dumps(
            {
                "mode": "client",
                "connect": {"endpoints": [_ROUTER_ENDPOINT]},
            }
        )
    )
    session = zenoh.open(sub_cfg)
    time.sleep(0.1)
    return session


def _wait_for_publisher(handle, timeout=5.0):
    """Wait until the ZenohPublisher session is ready."""
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        if handle.publisher.session_ready.is_set():
            return
        time.sleep(0.1)
    raise RuntimeError("Publisher session not ready within timeout")


def test_all_five_subjects_published_and_decode(zenoh_router):
    """
    Drives the simulation to PLAYING via zenoh control commands and asserts
    that all 5 keelson subjects are received via zenoh and decode correctly.
    """
    cfg = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm="ghost-drone",
        entity_id="sim001",
    )

    received: dict[str, bytes] = {}
    received_lock = threading.Lock()

    client_session = _make_client_session()

    def on_sample(sample):
        parts = str(sample.key_expr).split("/")
        if len(parts) >= 5:
            subject = parts[4]
            with received_lock:
                received.setdefault(subject, bytes(sample.payload))

    subscriber = client_session.declare_subscriber("ghost-drone/@v1/**", on_sample)

    try:
        with start_simulator(cfg) as handle:
            _wait_for_publisher(handle)

            # Load route via queryable (GET with payload)
            replies = client_session.get(
                f"{_PREFIX}/service/load_route",
                payload=json.dumps({"waypoints": _ROUTE}).encode(),
                timeout=5,
            )
            for reply in replies:
                result = json.loads(bytes(reply.ok.payload))
                assert result["ok"], f"load_route failed: {result}"

            # Play via pub/sub control
            client_session.put(f"{_PREFIX}/control/play", "")

            # Wait for subjects to be published (default rate 1 Hz, need 3s)
            time.sleep(3.5)

            # Stop
            client_session.put(f"{_PREFIX}/control/stop", "")
            time.sleep(0.2)
    finally:
        subscriber.undeclare()
        client_session.close()

    # --- Check all 5 keelson subjects arrived ---
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
    for subject in (
        "heading_true_north_deg",
        "speed_over_ground_knots",
        "roll_deg",
        "pitch_deg",
    ):
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
    assert (
        57.69 < lf.latitude < 57.72
    ), f"location_fix: unexpected latitude {lf.latitude}"


def test_sim_frame_published_during_playing(zenoh_router):
    """
    Asserts that sim_frame JSON publishes at ~20Hz during PLAYING state.
    """
    cfg = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm="ghost-drone",
        entity_id="sim001",
    )

    frames: list[dict] = []
    lock = threading.Lock()

    client_session = _make_client_session()

    def on_frame(sample):
        try:
            frame = json.loads(bytes(sample.payload))
            with lock:
                frames.append(frame)
        except Exception:
            pass

    subscriber = client_session.declare_subscriber(
        f"{_PREFIX}/pubsub/sim_frame/engine/0", on_frame
    )

    try:
        with start_simulator(cfg) as handle:
            _wait_for_publisher(handle)

            # Load route
            replies = client_session.get(
                f"{_PREFIX}/service/load_route",
                payload=json.dumps({"waypoints": _ROUTE}).encode(),
                timeout=5,
            )
            for reply in replies:
                pass  # consume

            # Play for 1 second
            client_session.put(f"{_PREFIX}/control/play", "")
            time.sleep(1.0)
            client_session.put(f"{_PREFIX}/control/stop", "")
            time.sleep(0.2)
    finally:
        subscriber.undeclare()
        client_session.close()

    # Should have received ~20 frames in 1 second (allow some tolerance)
    playing_frames = [f for f in frames if f.get("state") == "playing"]
    assert (
        len(playing_frames) >= 10
    ), f"Expected at least 10 sim_frames during PLAYING, got {len(playing_frames)}"

    # Validate frame structure
    for f in playing_frames[:3]:
        assert "lat" in f
        assert "lng" in f
        assert "heading" in f
        assert "speed" in f
        assert "roll" in f
        assert "pitch" in f
        assert f["state"] == "playing"


def test_settings_queryable_returns_current_values(zenoh_router):
    """
    Asserts that the settings queryable returns current values on GET,
    and accepts updates with a payload.
    """
    cfg = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm="ghost-drone",
        entity_id="sim001",
    )

    client_session = _make_client_session()

    try:
        with start_simulator(cfg) as handle:
            _wait_for_publisher(handle)

            # GET current settings (no payload)
            replies = client_session.get(
                f"{_PREFIX}/service/settings",
                timeout=5,
            )
            settings = None
            for reply in replies:
                settings = json.loads(bytes(reply.ok.payload))

            assert settings is not None, "No reply from settings queryable"
            assert "subjects" in settings
            assert "roll_amplitude_deg" in settings
            assert settings["roll_amplitude_deg"] == 5.0

            # UPDATE settings
            new_settings = dict(settings)
            new_settings["roll_amplitude_deg"] = 12.0
            replies = client_session.get(
                f"{_PREFIX}/service/settings",
                payload=json.dumps(new_settings).encode(),
                timeout=5,
            )
            updated = None
            for reply in replies:
                updated = json.loads(bytes(reply.ok.payload))

            assert updated is not None
            assert updated["roll_amplitude_deg"] == 12.0
    finally:
        client_session.close()


def test_load_route_validates_waypoints(zenoh_router):
    """
    Asserts that load_route rejects fewer than 2 waypoints via queryable reply.
    """
    cfg = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm="ghost-drone",
        entity_id="sim001",
    )

    client_session = _make_client_session()

    try:
        with start_simulator(cfg) as handle:
            _wait_for_publisher(handle)

            # Try loading with only 1 waypoint
            replies = client_session.get(
                f"{_PREFIX}/service/load_route",
                payload=json.dumps({"waypoints": [[57.7, 11.9]]}).encode(),
                timeout=5,
            )
            result = None
            for reply in replies:
                if reply.ok is not None:
                    candidate = json.loads(bytes(reply.ok.payload))
                    # Prefer the actual application reply over stale replies
                    if result is None or "error" in candidate:
                        result = candidate

            assert result is not None
            assert result["ok"] is False
            assert "2 waypoints" in result.get("error", "").lower()
    finally:
        client_session.close()


def test_no_messages_published_when_stopped(zenoh_router):
    """
    Asserts that no keelson zenoh messages are published while stopped.
    """
    cfg = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm="ghost-drone",
        entity_id="sim001",
    )

    keelson_count = 0
    lock = threading.Lock()

    client_session = _make_client_session()

    def on_sample(_sample):
        nonlocal keelson_count
        # Only count keelson subjects, not sim_frame
        key = str(_sample.key_expr)
        if "sim_frame" not in key:
            with lock:
                keelson_count += 1

    subscriber = client_session.declare_subscriber("ghost-drone/@v1/**", on_sample)

    try:
        with start_simulator(cfg) as handle:
            _wait_for_publisher(handle)

            # Load route but do NOT play — stay in STOPPED state.
            replies = client_session.get(
                f"{_PREFIX}/service/load_route",
                payload=json.dumps({"waypoints": _ROUTE}).encode(),
                timeout=5,
            )
            for reply in replies:
                pass  # consume

            # Wait 1.5 seconds (longer than the 1 Hz publish interval).
            time.sleep(1.5)
    finally:
        subscriber.undeclare()
        client_session.close()

    assert (
        keelson_count == 0
    ), f"Expected 0 keelson messages while stopped, got {keelson_count}"
