"""
End-to-end test: cancel remote control returns drone to autonomous navigation.

Verifies that after activating remote control via control/move, sending
control/cancel_remote returns the drone to autonomous mode — entity_health
operation_mode switches from MODE_REMOTE back to MODE_AUTONOMOUS.

SPEC: "A drone can be remote-controlled: movement commands sent via zenoh
       override autonomous navigation."
(Implies the override is reversible without stopping.)
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
_ROUTE = [[57.7069, 11.9381], [57.7100, 11.9420]]
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


def test_cancel_remote_restores_autonomous_mode(zenoh_router):
    """
    After activating remote control, sending control/cancel_remote should
    return the drone to autonomous navigation. Entity_health operation_mode
    should switch from MODE_REMOTE back to MODE_AUTONOMOUS.
    """
    cfg = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm="ghost-drone",
        entity_id="sim001",
    )

    health_remote: list[EntityHealth] = []
    health_cancelled: list[EntityHealth] = []
    phase = [None]  # "remote" | "cancelled" | None
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
            if phase[0] == "remote":
                health_remote.append(msg)
            elif phase[0] == "cancelled":
                health_cancelled.append(msg)

    subscriber = client_session.declare_subscriber("ghost-drone/@v0/**", on_sample)

    try:
        with start_simulator(cfg) as handle:
            _wait_for_publisher(handle)
            _start_playing(client_session)

            # Phase 1: Activate remote control
            time.sleep(1.5)
            client_session.put(
                f"{_PREFIX}/control/move",
                json.dumps({"heading_deg": 180.0}).encode(),
            )
            time.sleep(1.5)
            phase[0] = "remote"
            time.sleep(2.0)
            phase[0] = None

            # Phase 2: Cancel remote control
            client_session.put(f"{_PREFIX}/control/cancel_remote", "")
            time.sleep(1.5)
            phase[0] = "cancelled"
            time.sleep(2.0)
            phase[0] = None

            client_session.put(f"{_PREFIX}/control/stop", "")
            time.sleep(0.2)
    finally:
        subscriber.undeclare()
        client_session.close()

    # --- Assertions ---

    # During remote phase: operation_mode should be MODE_REMOTE
    assert len(health_remote) >= 1, (
        f"Expected >=1 health messages during remote phase, got {len(health_remote)}"
    )
    for msg in health_remote:
        assert msg.operation_mode == MODE_REMOTE, (
            f"Expected MODE_REMOTE ({MODE_REMOTE}) during remote phase, "
            f"got {msg.operation_mode}"
        )

    # After cancel: operation_mode should return to MODE_AUTONOMOUS
    assert len(health_cancelled) >= 1, (
        f"Expected >=1 health messages after cancel_remote, got {len(health_cancelled)}"
    )
    for msg in health_cancelled:
        assert msg.operation_mode == MODE_AUTONOMOUS, (
            f"Expected MODE_AUTONOMOUS ({MODE_AUTONOMOUS}) after cancel_remote, "
            f"got {msg.operation_mode}"
        )
