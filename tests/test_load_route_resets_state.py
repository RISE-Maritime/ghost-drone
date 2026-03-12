"""
End-to-end test: loading a route resets the drone to STOPPED state.

Verifies SPEC behavior:
- "When a route is loaded and autonomous mode is enabled, the drone moves to
   the start of the route and follows it."

Loading a route should always reset the drone to STOPPED, regardless of the
current state.  The user must explicitly call play() to begin following the
new route.  This test checks the case where a new route is loaded while the
drone is already PLAYING — the drone should transition to STOPPED.
"""

import json
import time
import threading

import pytest
import zenoh

from ghost_drone.config import AppConfig
from ghost_drone.server import start_simulator

_ROUTER_ENDPOINT = "tcp/127.0.0.1:17447"
_ROUTE_A = [[57.7069, 11.9381], [57.7100, 11.9420]]
_ROUTE_B = [[57.7200, 11.9500], [57.7250, 11.9550]]
_PREFIX = "ghost-drone/@v0/sim001"


@pytest.fixture(scope="module")
def zenoh_router():
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
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        if handle.publisher.session_ready.is_set():
            return
        time.sleep(0.1)
    raise RuntimeError("Publisher session not ready within timeout")


def test_load_route_while_playing_resets_to_stopped(zenoh_router):
    """
    Loading a new route while the drone is PLAYING should transition the
    drone back to STOPPED.  The user must send play() again to follow the
    new route.

    SPEC: "When a route is loaded and autonomous mode is enabled, the drone
           moves to the start of the route and follows it."
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

            # Load route A and play
            replies = client_session.get(
                f"{_PREFIX}/service/load_route",
                payload=json.dumps({"waypoints": _ROUTE_A}).encode(),
                timeout=5,
            )
            for reply in replies:
                pass
            client_session.put(f"{_PREFIX}/control/play", "")
            time.sleep(1.0)

            # Verify we are PLAYING
            with lock:
                playing_frames = [f for f in frames if f.get("state") == "playing"]
            assert len(playing_frames) >= 5, (
                f"Expected drone to be playing, got {len(playing_frames)} playing frames"
            )

            # Now load route B while still playing
            with lock:
                frames.clear()
            replies = client_session.get(
                f"{_PREFIX}/service/load_route",
                payload=json.dumps({"waypoints": _ROUTE_B}).encode(),
                timeout=5,
            )
            for reply in replies:
                result = json.loads(bytes(reply.ok.payload))
                assert result["ok"], f"load_route B failed: {result}"

            # Wait for sim_frame to reflect the new state
            time.sleep(0.5)

            # After loading a new route, the drone should be STOPPED
            with lock:
                recent = list(frames)
            stopped_frames = [f for f in recent if f.get("state") == "stopped"]
            assert len(stopped_frames) > 0, (
                f"Expected drone to be stopped after loading new route, "
                f"but got states: {[f.get('state') for f in recent[-5:]]}"
            )

            client_session.put(f"{_PREFIX}/control/stop", "")
            time.sleep(0.2)
    finally:
        subscriber.undeclare()
        client_session.close()
