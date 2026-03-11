"""
E2E test: sim_frame is published at ~20 Hz regardless of play state.

SPEC: "sim_frame is published at ~20 Hz for the browser UI regardless of play state."

The existing test_sim_frame_published_during_playing only covers the PLAYING
state.  This test verifies that sim_frame also arrives while STOPPED and PAUSED.
"""

import json
import time
import threading

import pytest
import zenoh

from ghost_drone.config import AppConfig
from ghost_drone.server import start_simulator

_ROUTER_ENDPOINT = "tcp/127.0.0.1:17447"
_ROUTE = [[57.7069, 11.9381], [57.7100, 11.9420]]
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


def test_sim_frame_published_while_stopped(zenoh_router):
    """sim_frame should arrive even when no route is loaded (STOPPED state)."""
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
            # Do NOT load a route or play — stay in STOPPED.
            time.sleep(1.0)
    finally:
        subscriber.undeclare()
        client_session.close()

    stopped_frames = [f for f in frames if f.get("state") == "stopped"]
    assert (
        len(stopped_frames) >= 10
    ), f"Expected >=10 sim_frames while STOPPED, got {len(stopped_frames)}"

    # Validate frame structure
    for f in stopped_frames[:3]:
        assert "lat" in f
        assert "lng" in f
        assert "heading" in f
        assert "state" in f
        assert f["state"] == "stopped"


def test_sim_frame_published_while_paused(zenoh_router):
    """sim_frame should continue arriving after the drone is paused."""
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

            # Load route and play briefly
            replies = client_session.get(
                f"{_PREFIX}/service/load_route",
                payload=json.dumps({"waypoints": _ROUTE}).encode(),
                timeout=5,
            )
            for reply in replies:
                pass

            client_session.put(f"{_PREFIX}/control/play", "")
            time.sleep(0.5)

            # Pause and clear collected frames so we only measure paused frames
            client_session.put(f"{_PREFIX}/control/pause", "")
            time.sleep(0.2)
            with lock:
                frames.clear()

            # Collect frames during PAUSED state
            time.sleep(1.0)
    finally:
        subscriber.undeclare()
        client_session.close()

    paused_frames = [f for f in frames if f.get("state") == "paused"]
    assert (
        len(paused_frames) >= 10
    ), f"Expected >=10 sim_frames while PAUSED, got {len(paused_frames)}"

    for f in paused_frames[:3]:
        assert "lat" in f
        assert "lng" in f
        assert "heading" in f
        assert "state" in f
        assert f["state"] == "paused"
