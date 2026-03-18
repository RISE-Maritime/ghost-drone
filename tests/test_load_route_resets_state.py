"""
End-to-end test: loading a route stores waypoints for the next play().

Drones are always active — load_route no longer changes state.
The user must explicitly call play() to begin following the new route.
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


def test_load_route_stores_waypoints(zenoh_router):
    """
    Loading a route should store waypoints. The drone stays active
    (state always "playing") and the user must call play() to follow
    the new route.
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

            # Load route A — drone stays active
            replies = client_session.get(
                f"{_PREFIX}/service/load_route",
                payload=json.dumps({"waypoints": _ROUTE_A}).encode(),
                timeout=5,
            )
            for reply in replies:
                result = json.loads(bytes(reply.ok.payload))
                assert result["ok"], f"load_route A failed: {result}"

            time.sleep(0.5)

            # Verify drone is still active (state = "playing")
            with lock:
                recent = list(frames)
            assert len(recent) > 0, "No sim_frames received"
            for f in recent[-3:]:
                assert f.get("state") == "playing", (
                    f"Expected state 'playing', got '{f.get('state')}'"
                )

            # Load route B — should succeed and store new waypoints
            replies = client_session.get(
                f"{_PREFIX}/service/load_route",
                payload=json.dumps({"waypoints": _ROUTE_B}).encode(),
                timeout=5,
            )
            for reply in replies:
                result = json.loads(bytes(reply.ok.payload))
                assert result["ok"], f"load_route B failed: {result}"

            # Verify the engine has the new waypoints
            wps = handle.sim.engine.waypoints
            assert len(wps) >= 2, "Expected waypoints to be stored"

            client_session.put(f"{_PREFIX}/control/stop", "")
            time.sleep(0.2)
    finally:
        subscriber.undeclare()
        client_session.close()
