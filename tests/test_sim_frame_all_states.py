"""
E2E test: sim_frame is published at ~20 Hz — always active from spawn.

SPEC: "sim_frame is published at ~20 Hz for the browser UI."

Drones are always active, so sim_frame should arrive immediately after spawn
with state == "playing".
"""

import json
import time
import threading

import pytest
import zenoh

from ghost_drone.config import AppConfig
from ghost_drone.server import start_simulator

_ROUTER_ENDPOINT = "tcp/127.0.0.1:17447"
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


def test_sim_frame_published_immediately(zenoh_router):
    """sim_frame should arrive immediately — drones are always active."""
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
            # Do NOT load a route or play — drone is active from spawn
            time.sleep(1.0)
    finally:
        subscriber.undeclare()
        client_session.close()

    playing_frames = [f for f in frames if f.get("state") == "playing"]
    assert (
        len(playing_frames) >= 10
    ), f"Expected >=10 sim_frames, got {len(playing_frames)}"

    # Validate frame structure
    for f in playing_frames[:3]:
        assert "lat" in f
        assert "lng" in f
        assert "heading" in f
        assert "state" in f
        assert f["state"] == "playing"
