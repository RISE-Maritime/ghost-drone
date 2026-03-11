"""
End-to-end test: pause holds position and resume continues movement.

Verifies SPEC behavior:
- When a drone is paused, it holds its current position.
- When resumed, it continues from where it stopped.
"""

import json
import math
import time
import threading

import pytest
import zenoh

from ghost_drone.config import AppConfig
from ghost_drone.server import start_simulator

# Non-standard port to avoid colliding with a real zenoh instance.
_ROUTER_ENDPOINT = "tcp/127.0.0.1:17447"

# Two waypoints forming a route with enough distance to avoid auto-stop.
_ROUTE = [[57.7069, 11.9381], [57.7200, 11.9500]]

# Key expression prefix matching the AppConfig below
_PREFIX = "ghost-drone/@v0/sim001"


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
    time.sleep(0.2)
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


def _start_playing(client_session):
    """Load a route and start playing."""
    replies = client_session.get(
        f"{_PREFIX}/service/load_route",
        payload=json.dumps({"waypoints": _ROUTE}).encode(),
        timeout=5,
    )
    for reply in replies:
        pass
    client_session.put(f"{_PREFIX}/control/play", "")


def _haversine_m(lat1, lng1, lat2, lng2):
    """Great-circle distance in metres between two points."""
    R = 6_371_000
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlam = math.radians(lng2 - lng1)
    a = math.sin(dphi / 2) ** 2 + math.cos(phi1) * math.cos(phi2) * math.sin(dlam / 2) ** 2
    return 2 * R * math.atan2(math.sqrt(a), math.sqrt(1 - a))


def test_pause_holds_position_resume_continues(zenoh_router):
    """
    Plays the drone, pauses it, verifies position holds, then resumes and
    verifies the drone continues moving from the paused position.

    SPEC: "When a drone is paused, it holds its current position.
           When resumed, it continues from where it stopped."
    """
    cfg = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm="ghost-drone",
        entity_id="sim001",
    )

    # Collect sim_frame positions in each phase
    frames_playing: list[dict] = []
    frames_paused: list[dict] = []
    frames_resumed: list[dict] = []
    phase = [None]  # "playing" | "paused" | "resumed" | None
    lock = threading.Lock()

    client_session = _make_client_session()

    def on_sample(sample):
        key = str(sample.key_expr)
        if "sim_frame" not in key:
            return
        try:
            frame = json.loads(bytes(sample.payload))
        except Exception:
            return
        with lock:
            if phase[0] == "playing":
                frames_playing.append(frame)
            elif phase[0] == "paused":
                frames_paused.append(frame)
            elif phase[0] == "resumed":
                frames_resumed.append(frame)

    subscriber = client_session.declare_subscriber("ghost-drone/@v0/**", on_sample)

    try:
        with start_simulator(cfg) as handle:
            _wait_for_publisher(handle)
            _start_playing(client_session)

            # Phase 1: Let the drone move for a bit
            time.sleep(2.0)
            phase[0] = "playing"
            time.sleep(1.0)
            phase[0] = None

            # Phase 2: Pause the drone
            client_session.put(f"{_PREFIX}/control/pause", "")
            time.sleep(0.5)  # let pause take effect
            phase[0] = "paused"
            time.sleep(2.0)
            phase[0] = None

            # Phase 3: Resume the drone
            client_session.put(f"{_PREFIX}/control/play", "")
            time.sleep(0.5)  # let resume take effect
            phase[0] = "resumed"
            time.sleep(1.5)
            phase[0] = None

            client_session.put(f"{_PREFIX}/control/stop", "")
            time.sleep(0.2)
    finally:
        subscriber.undeclare()
        client_session.close()

    # --- Assertions ---

    # Phase 1: Should have frames showing movement (playing state)
    assert len(frames_playing) >= 10, (
        f"Expected >=10 sim_frames during playing, got {len(frames_playing)}"
    )
    playing_states = {f["state"] for f in frames_playing}
    assert "playing" in playing_states, (
        f"Expected 'playing' state in frames, got states: {playing_states}"
    )

    # Phase 2: While paused, position should be stable (not moving)
    assert len(frames_paused) >= 10, (
        f"Expected >=10 sim_frames during pause, got {len(frames_paused)}"
    )
    paused_states = {f["state"] for f in frames_paused}
    assert "paused" in paused_states, (
        f"Expected 'paused' state in frames, got states: {paused_states}"
    )

    # All paused positions should be very close to each other (within noise)
    paused_lats = [f["lat"] for f in frames_paused]
    paused_lngs = [f["lng"] for f in frames_paused]
    lat_spread = max(paused_lats) - min(paused_lats)
    lng_spread = max(paused_lngs) - min(paused_lngs)
    # Noise is applied by the engine (~1e-6 degree sigma), so spread should be tiny
    assert lat_spread < 0.001, (
        f"Paused lat spread too large: {lat_spread:.6f} degrees"
    )
    assert lng_spread < 0.001, (
        f"Paused lng spread too large: {lng_spread:.6f} degrees"
    )

    # Phase 3: After resume, drone should be moving again
    assert len(frames_resumed) >= 10, (
        f"Expected >=10 sim_frames after resume, got {len(frames_resumed)}"
    )
    resumed_states = {f["state"] for f in frames_resumed}
    assert "playing" in resumed_states, (
        f"Expected 'playing' state after resume, got states: {resumed_states}"
    )

    # Resumed position should start near the paused position (continuity)
    first_resumed = frames_resumed[0]
    last_paused = frames_paused[-1]
    gap_m = _haversine_m(
        last_paused["lat"], last_paused["lng"],
        first_resumed["lat"], first_resumed["lng"],
    )
    # Should be very close — within a few metres at most (one tick of movement + noise)
    assert gap_m < 50, (
        f"Gap between paused and resumed position is {gap_m:.1f}m, expected <50m"
    )

    # Resumed drone should actually be moving: last resumed frame should be
    # noticeably further along the route than the paused position.
    last_resumed = frames_resumed[-1]
    distance_after_resume = _haversine_m(
        last_paused["lat"], last_paused["lng"],
        last_resumed["lat"], last_resumed["lng"],
    )
    assert distance_after_resume > 1.0, (
        f"Drone did not move after resume: only {distance_after_resume:.2f}m from paused position"
    )
