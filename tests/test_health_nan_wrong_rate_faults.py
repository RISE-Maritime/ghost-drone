"""
End-to-end test: entity_health reflects nan and wrong_rate faults.

Completes coverage for the SPEC behavior:
  "When a fault is active, the affected subsystem's health reflects it
   (DEGRADED or CRITICAL)."

Existing tests cover drop → CRITICAL and stuck → DEGRADED.
This file covers:
  - nan → CRITICAL (total data loss — values are NaN)
  - wrong_rate → DEGRADED (data present but at wrong frequency)
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
    HEALTH_NOMINAL,
    HEALTH_DEGRADED,
    HEALTH_CRITICAL,
)
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


def _inject_fault(client_session, subject, fault_type):
    replies = client_session.get(
        f"{_PREFIX}/service/fault",
        payload=json.dumps({
            "action": "inject",
            "subject": subject,
            "fault_type": fault_type,
        }).encode(),
        timeout=5,
    )
    result = None
    for reply in replies:
        if reply.ok is not None:
            result = json.loads(bytes(reply.ok.payload))
    return result


def _clear_fault(client_session, subject, fault_type):
    replies = client_session.get(
        f"{_PREFIX}/service/fault",
        payload=json.dumps({
            "action": "clear",
            "subject": subject,
            "fault_type": fault_type,
        }).encode(),
        timeout=5,
    )
    result = None
    for reply in replies:
        if reply.ok is not None:
            result = json.loads(bytes(reply.ok.payload))
    return result


def _start_playing(client_session):
    replies = client_session.get(
        f"{_PREFIX}/service/load_route",
        payload=json.dumps({"waypoints": _ROUTE}).encode(),
        timeout=5,
    )
    for reply in replies:
        pass
    client_session.put(f"{_PREFIX}/control/play", "")


def _decode_entity_health(payload_bytes: bytes) -> EntityHealth:
    _recv_at, _enclosed_at, proto_bytes = keelson.uncover(payload_bytes)
    msg = EntityHealth()
    msg.ParseFromString(proto_bytes)
    return msg


def test_nan_fault_makes_subsystem_critical(zenoh_router):
    """
    Injecting a 'nan' fault on location_fix should cause the 'position'
    subsystem in entity_health to report CRITICAL (NaN = total data loss).
    After clearing, it should return to NOMINAL.

    SPEC: "When a fault is active, the affected subsystem's health reflects it
           (DEGRADED or CRITICAL)."
    """
    cfg = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm="ghost-drone",
        entity_id="sim001",
    )

    health_before: list[EntityHealth] = []
    health_during: list[EntityHealth] = []
    health_after: list[EntityHealth] = []
    active_list = [None]
    lock = threading.Lock()

    client_session = _make_client_session()

    def on_sample(sample):
        key = str(sample.key_expr)
        if "entity_health" not in key:
            return
        try:
            msg = _decode_entity_health(bytes(sample.payload))
        except Exception:
            return
        with lock:
            target = active_list[0]
            if target is not None:
                target.append(msg)

    subscriber = client_session.declare_subscriber("ghost-drone/@v0/**", on_sample)

    try:
        with start_simulator(cfg) as handle:
            _wait_for_publisher(handle)
            _start_playing(client_session)

            # Phase 1: Baseline — collect health while playing normally
            time.sleep(1.5)
            active_list[0] = health_before
            time.sleep(2.0)
            active_list[0] = None

            # Phase 2: Inject nan fault on location_fix
            result = _inject_fault(client_session, "location_fix", "nan")
            assert result is not None, "No reply from fault queryable"
            assert result["ok"] is True, f"Fault injection failed: {result}"

            time.sleep(0.5)
            active_list[0] = health_during
            time.sleep(2.0)
            active_list[0] = None

            # Phase 3: Clear the fault
            result = _clear_fault(client_session, "location_fix", "nan")
            assert result is not None, "No reply from fault clear"
            assert result["ok"] is True, f"Fault clear failed: {result}"

            time.sleep(0.5)
            active_list[0] = health_after
            time.sleep(2.0)
            active_list[0] = None

            client_session.put(f"{_PREFIX}/control/stop", "")
            time.sleep(0.2)
    finally:
        subscriber.undeclare()
        client_session.close()

    # Phase 1: position subsystem should be NOMINAL before fault
    assert len(health_before) >= 1, (
        f"Expected >=1 health messages before fault, got {len(health_before)}"
    )
    last_before = health_before[-1]
    pos_sub = [s for s in last_before.subsystems if s.name == "position"]
    assert len(pos_sub) == 1
    assert pos_sub[0].level == HEALTH_NOMINAL, (
        f"Position should be NOMINAL before fault, got {pos_sub[0].level}"
    )

    # Phase 2: position subsystem should be CRITICAL during nan fault
    assert len(health_during) >= 1, (
        f"Expected >=1 health messages during fault, got {len(health_during)}"
    )
    last_during = health_during[-1]
    pos_sub = [s for s in last_during.subsystems if s.name == "position"]
    assert len(pos_sub) == 1
    assert pos_sub[0].level == HEALTH_CRITICAL, (
        f"Position should be CRITICAL during nan fault, got {pos_sub[0].level}"
    )

    # Phase 3: position subsystem should return to NOMINAL after clearing
    assert len(health_after) >= 1, (
        f"Expected >=1 health messages after clearing, got {len(health_after)}"
    )
    last_after = health_after[-1]
    pos_sub = [s for s in last_after.subsystems if s.name == "position"]
    assert len(pos_sub) == 1
    assert pos_sub[0].level == HEALTH_NOMINAL, (
        f"Position should return to NOMINAL after clearing, got {pos_sub[0].level}"
    )


def test_wrong_rate_fault_makes_subsystem_degraded(zenoh_router):
    """
    Injecting a 'wrong_rate' fault on speed_over_ground_knots should cause
    the 'speed' subsystem to report DEGRADED (data present but at wrong rate).
    After clearing, it should return to NOMINAL.

    SPEC: "When a fault is active, the affected subsystem's health reflects it
           (DEGRADED or CRITICAL)."
    """
    cfg = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm="ghost-drone",
        entity_id="sim001",
    )

    health_during: list[EntityHealth] = []
    health_after: list[EntityHealth] = []
    active_list = [None]
    lock = threading.Lock()

    client_session = _make_client_session()

    def on_sample(sample):
        key = str(sample.key_expr)
        if "entity_health" not in key:
            return
        try:
            msg = _decode_entity_health(bytes(sample.payload))
        except Exception:
            return
        with lock:
            target = active_list[0]
            if target is not None:
                target.append(msg)

    subscriber = client_session.declare_subscriber("ghost-drone/@v0/**", on_sample)

    try:
        with start_simulator(cfg) as handle:
            _wait_for_publisher(handle)
            _start_playing(client_session)
            time.sleep(1.5)

            # Inject wrong_rate fault on speed subject
            result = _inject_fault(client_session, "speed_over_ground_knots", "wrong_rate")
            assert result is not None
            assert result["ok"] is True

            time.sleep(0.5)
            active_list[0] = health_during
            time.sleep(2.0)
            active_list[0] = None

            # Clear the fault
            result = _clear_fault(client_session, "speed_over_ground_knots", "wrong_rate")
            assert result is not None
            assert result["ok"] is True

            time.sleep(0.5)
            active_list[0] = health_after
            time.sleep(2.0)
            active_list[0] = None

            client_session.put(f"{_PREFIX}/control/stop", "")
            time.sleep(0.2)
    finally:
        subscriber.undeclare()
        client_session.close()

    # Speed subsystem should be DEGRADED during wrong_rate fault
    assert len(health_during) >= 1
    last_during = health_during[-1]
    speed_sub = [s for s in last_during.subsystems if s.name == "speed"]
    assert len(speed_sub) == 1
    assert speed_sub[0].level == HEALTH_DEGRADED, (
        f"Speed should be DEGRADED during wrong_rate fault, got {speed_sub[0].level}"
    )

    # Speed subsystem should return to NOMINAL after clearing
    assert len(health_after) >= 1
    last_after = health_after[-1]
    speed_sub = [s for s in last_after.subsystems if s.name == "speed"]
    assert len(speed_sub) == 1
    assert speed_sub[0].level == HEALTH_NOMINAL, (
        f"Speed should return to NOMINAL after clearing, got {speed_sub[0].level}"
    )
