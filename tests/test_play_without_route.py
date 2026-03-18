"""
E2E test: playing without a loaded route should not crash the simulator.

SPEC: "When a route is loaded and autonomous mode enabled, the drone moves
to the start of the route and follows it."

This implies a route must be loaded before playing. If play is issued
without a route, the simulator should handle it gracefully (either ignore
the command or stay stopped) — NOT crash the tick loop.
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


def test_play_without_route_does_not_crash(zenoh_router):
    """
    Sending a play command without first loading a route should not crash
    the tick loop. The simulator should continue publishing sim_frame.
    """
    cfg = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm="ghost-drone",
        entity_id="sim001",
    )

    frames_before_play: list[dict] = []
    frames_after_play: list[dict] = []
    lock = threading.Lock()
    phase = ["before"]

    client = _make_client_session()

    def on_frame(sample):
        try:
            frame = json.loads(bytes(sample.payload))
        except Exception:
            return
        with lock:
            if phase[0] == "before":
                frames_before_play.append(frame)
            elif phase[0] == "after":
                frames_after_play.append(frame)

    subscriber = client.declare_subscriber(
        f"{_PREFIX}/pubsub/sim_frame/engine/0", on_frame
    )

    try:
        with start_simulator(cfg) as handle:
            _wait_for_publisher(handle)

            # Collect some sim_frames to prove the tick loop is alive
            time.sleep(1.0)

            with lock:
                phase[0] = "none"

            # Play WITHOUT loading a route first
            client.put(f"{_PREFIX}/control/play", "")

            # Give the tick loop a moment — if it crashes, sim_frame stops
            time.sleep(1.0)

            # Collect frames after the play command
            with lock:
                phase[0] = "after"

            time.sleep(1.0)

            with lock:
                phase[0] = "none"
    finally:
        subscriber.undeclare()
        client.close()

    # The tick loop should have been alive before play
    assert len(frames_before_play) >= 5, (
        f"Expected >=5 sim_frames before play, got {len(frames_before_play)}"
    )

    # After play without a route, the tick loop MUST still be alive
    assert len(frames_after_play) >= 5, (
        f"Expected >=5 sim_frames after play (no route), got {len(frames_after_play)}. "
        "The tick loop likely crashed."
    )

    # The drone should remain active (state always "playing") but in OPERATED mode
    for f in frames_after_play:
        assert f["state"] == "playing", (
            f"Expected state 'playing' (always active), got '{f['state']}'"
        )
