"""
End-to-end test: entity_health reflects PAUSED state correctly.

Verifies SPEC behaviors:
- Each drone publishes entity_health at a steady rate regardless of its state.
- A paused drone is mid-mission (not idle/stopped), so health should remain
  NOMINAL / AUTONOMOUS rather than falling back to INACTIVE / IDLE.
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
    HEALTH_INACTIVE,
    HEALTH_NOMINAL,
    MODE_IDLE,
    MODE_AUTONOMOUS,
)
from ghost_drone.server import start_simulator

_ROUTER_ENDPOINT = "tcp/127.0.0.1:17447"
_ROUTE = [[57.7069, 11.9381], [57.7100, 11.9420]]
_PREFIX = "ghost-drone/@v0/sim-paused"


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


def _start_playing(client_session):
    replies = client_session.get(
        f"{_PREFIX}/service/load_route",
        payload=json.dumps({"waypoints": _ROUTE}).encode(),
        timeout=5,
    )
    for reply in replies:
        pass
    client_session.put(f"{_PREFIX}/control/play", "")


def test_paused_health_is_nominal_autonomous(zenoh_router):
    """
    While paused, entity_health should report NOMINAL level and AUTONOMOUS
    operation mode — not INACTIVE/IDLE, since the drone is mid-mission.

    SPEC: "Each drone publishes entity_health at a steady rate regardless of
           its state."
    SPEC: "When idle/stopped, health level is INACTIVE and operation mode is
           IDLE." (paused is NOT idle/stopped)
    """
    cfg = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm="ghost-drone",
        entity_id="sim-paused",
    )

    health_msgs: list[EntityHealth] = []
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
                health_msgs.append(msg)

    subscriber = client_session.declare_subscriber(
        "ghost-drone/@v0/sim-paused/**", on_sample
    )

    try:
        with start_simulator(cfg) as handle:
            _wait_for_publisher(handle)

            # Start playing, let it stabilize
            _start_playing(client_session)
            time.sleep(1.5)

            # Pause the drone
            client_session.put(f"{_PREFIX}/control/pause", "")
            time.sleep(0.5)  # let pause take effect

            # Collect health messages while paused
            collecting[0] = True
            time.sleep(2.5)
            collecting[0] = False

            client_session.put(f"{_PREFIX}/control/stop", "")
            time.sleep(0.2)
    finally:
        subscriber.undeclare()
        client_session.close()

    # Should have received health messages while paused
    assert len(health_msgs) >= 1, (
        f"Expected >=1 health messages while paused, got {len(health_msgs)}"
    )

    last = health_msgs[-1]

    # Paused is NOT idle/stopped — it should report NOMINAL, not INACTIVE
    assert last.level == HEALTH_NOMINAL, (
        f"Expected NOMINAL ({HEALTH_NOMINAL}) while paused, got {last.level}"
    )
    assert last.operation_mode == MODE_AUTONOMOUS, (
        f"Expected AUTONOMOUS ({MODE_AUTONOMOUS}) while paused, got {last.operation_mode}"
    )

    # All subsystems should be NOMINAL (no faults injected)
    assert len(last.subsystems) >= 1, "Expected at least one subsystem in health"
    for sub in last.subsystems:
        assert sub.level == HEALTH_NOMINAL, (
            f"Subsystem '{sub.name}' should be NOMINAL while paused, got {sub.level}"
        )
