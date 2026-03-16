"""
End-to-end test: route auto-completion clears remote heading override.

Verifies that when a drone is in remote-control mode and the route
auto-completes (drone reaches the final waypoint), the remote heading
override is cleared.  A subsequent play should start in AUTONOMOUS mode,
not REMOTE.

SPEC (Control): "A drone can be remote-controlled: movement commands
sent via zenoh override autonomous navigation."

This tests the edge case that auto-stop (route completion) resets remote
mode, just like an explicit stop() does.
"""

import json
import time
import threading

import pytest
import zenoh
import keelson

from ghost_drone.config import AppConfig
from ghost_drone.proto.entity_health_pb2 import (
    EntityHealth,
    MODE_AUTONOMOUS,
    MODE_REMOTE,
)
from ghost_drone.server import start_simulator

_ROUTER_ENDPOINT = "tcp/127.0.0.1:17447"
_PREFIX = "ghost-drone/@v0/sim001"

# Two waypoints ~1 metre apart so the route auto-completes almost instantly.
_SHORT_ROUTE = [[57.7069, 11.9381], [57.70691, 11.93811]]

# A normal-length route for the second play.
_ROUTE = [[57.7069, 11.9381], [57.7100, 11.9420]]


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


def _decode_entity_health(payload_bytes: bytes) -> EntityHealth:
    _recv_at, _enclosed_at, proto_bytes = keelson.uncover(payload_bytes)
    msg = EntityHealth()
    msg.ParseFromString(proto_bytes)
    return msg


def test_auto_stop_clears_remote_mode(zenoh_router):
    """
    1. Load a very short route and play.
    2. Send a remote_move command (enters remote mode).
    3. Wait for the route to auto-complete (auto-stop).
    4. Load a new route and play again.
    5. Assert entity_health reports AUTONOMOUS, NOT REMOTE.
    """
    cfg = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm="ghost-drone",
        entity_id="sim001",
    )

    health_after_replay: list[EntityHealth] = []
    collecting = [False]
    lock = threading.Lock()

    client_session = _make_client_session()

    def on_sample(sample):
        if "entity_health" not in str(sample.key_expr):
            return
        try:
            msg = _decode_entity_health(bytes(sample.payload))
        except Exception:
            return
        with lock:
            if collecting[0]:
                health_after_replay.append(msg)

    subscriber = client_session.declare_subscriber("ghost-drone/@v0/**", on_sample)

    try:
        with start_simulator(cfg) as handle:
            _wait_for_publisher(handle)
            handle.sim.engine.set_home(_SHORT_ROUTE[0][0], _SHORT_ROUTE[0][1])

            # Step 1: Load a very short route and play
            replies = client_session.get(
                f"{_PREFIX}/service/load_route",
                payload=json.dumps({"waypoints": _SHORT_ROUTE}).encode(),
                timeout=5,
            )
            for reply in replies:
                pass
            client_session.put(f"{_PREFIX}/control/play", "")
            time.sleep(0.3)  # let it start playing

            # Step 2: Send remote_move to enter remote mode
            client_session.put(
                f"{_PREFIX}/control/move",
                json.dumps({"heading_deg": 90.0}),
            )
            time.sleep(0.3)

            # Step 3: Wait for the short route to auto-complete
            # With 2 waypoints ~1m apart at 10 m/s, this completes in ~0.1s
            time.sleep(1.5)  # generous wait for auto-stop

            # Step 4: Load a new (longer) route and play again
            replies = client_session.get(
                f"{_PREFIX}/service/load_route",
                payload=json.dumps({"waypoints": _ROUTE}).encode(),
                timeout=5,
            )
            for reply in replies:
                pass
            client_session.put(f"{_PREFIX}/control/play", "")

            # Step 5: Collect health messages during the second play
            time.sleep(1.5)  # let it stabilize in PLAYING
            collecting[0] = True
            time.sleep(2.0)
            collecting[0] = False

            client_session.put(f"{_PREFIX}/control/stop", "")
            time.sleep(0.2)
    finally:
        subscriber.undeclare()
        client_session.close()

    # --- Assertions ---
    assert len(health_after_replay) >= 1, (
        f"Expected >=1 health messages after second play, "
        f"got {len(health_after_replay)}"
    )

    last = health_after_replay[-1]
    assert last.operation_mode == MODE_AUTONOMOUS, (
        f"After route auto-completion and replay, operation_mode should be "
        f"AUTONOMOUS ({MODE_AUTONOMOUS}), but got {last.operation_mode} "
        f"(REMOTE={MODE_REMOTE}). Remote heading was not cleared on auto-stop."
    )
