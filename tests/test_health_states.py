"""
End-to-end test: entity_health reflects simulation state and telemetry expectations.

Verifies SPEC behaviors:
- When idle/stopped, health level is INACTIVE and operation mode is IDLE.
- When playing autonomously, health level is NOMINAL and operation mode is AUTONOMOUS.
- telemetry_expectations in the health message match the drone's current settings
  (subjects, rates, source_ids).
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


def test_stopped_health_is_inactive_idle(zenoh_router):
    """
    While stopped, entity_health should report INACTIVE level, IDLE operation
    mode, and all subsystems as INACTIVE.

    SPEC: "When idle/stopped, health level is INACTIVE and operation mode is IDLE."
    """
    cfg = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm="ghost-drone",
        entity_id="sim001",
    )

    health_msgs: list[EntityHealth] = []
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
            health_msgs.append(msg)

    subscriber = client_session.declare_subscriber("ghost-drone/@v0/**", on_sample)

    try:
        with start_simulator(cfg) as handle:
            _wait_for_publisher(handle)

            # Stay stopped — do NOT play. Wait for health messages.
            time.sleep(2.5)

            client_session.put(f"{_PREFIX}/control/stop", "")
            time.sleep(0.2)
    finally:
        subscriber.undeclare()
        client_session.close()

    # Should have received health messages while stopped
    assert len(health_msgs) >= 1, (
        f"Expected >=1 health messages while stopped, got {len(health_msgs)}"
    )

    last = health_msgs[-1]
    assert last.level == HEALTH_INACTIVE, (
        f"Expected INACTIVE ({HEALTH_INACTIVE}) while stopped, got {last.level}"
    )
    assert last.operation_mode == MODE_IDLE, (
        f"Expected IDLE ({MODE_IDLE}) while stopped, got {last.operation_mode}"
    )

    # All subsystems should be INACTIVE
    assert len(last.subsystems) >= 1, "Expected at least one subsystem in health"
    for sub in last.subsystems:
        assert sub.level == HEALTH_INACTIVE, (
            f"Subsystem '{sub.name}' should be INACTIVE while stopped, got {sub.level}"
        )


def test_playing_health_is_nominal_autonomous(zenoh_router):
    """
    While playing autonomously, entity_health should report NOMINAL level
    and AUTONOMOUS operation mode with all subsystems NOMINAL.

    SPEC: "When playing autonomously, health level is NOMINAL and operation
           mode is AUTONOMOUS."
    """
    cfg = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm="ghost-drone",
        entity_id="sim001",
    )

    health_msgs: list[EntityHealth] = []
    active = [False]
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
            if active[0]:
                health_msgs.append(msg)

    subscriber = client_session.declare_subscriber("ghost-drone/@v0/**", on_sample)

    try:
        with start_simulator(cfg) as handle:
            _wait_for_publisher(handle)
            _start_playing(client_session)

            # Let it run and collect health messages during PLAYING
            time.sleep(1.5)
            active[0] = True
            time.sleep(2.0)
            active[0] = False

            client_session.put(f"{_PREFIX}/control/stop", "")
            time.sleep(0.2)
    finally:
        subscriber.undeclare()
        client_session.close()

    assert len(health_msgs) >= 1, (
        f"Expected >=1 health messages while playing, got {len(health_msgs)}"
    )

    last = health_msgs[-1]
    assert last.level == HEALTH_NOMINAL, (
        f"Expected NOMINAL ({HEALTH_NOMINAL}) while playing, got {last.level}"
    )
    assert last.operation_mode == MODE_AUTONOMOUS, (
        f"Expected AUTONOMOUS ({MODE_AUTONOMOUS}) while playing, got {last.operation_mode}"
    )

    # All subsystems should be NOMINAL (no faults injected)
    assert len(last.subsystems) >= 1, "Expected at least one subsystem in health"
    for sub in last.subsystems:
        assert sub.level == HEALTH_NOMINAL, (
            f"Subsystem '{sub.name}' should be NOMINAL while playing, got {sub.level}"
        )


def test_health_telemetry_expectations_match_settings(zenoh_router):
    """
    The telemetry_expectations field in entity_health should match the drone's
    current publish settings (subject names, source_ids, rate_hz).

    SPEC: "telemetry_expectations in the health message match the drone's
           current settings (subjects, rates, source_ids)."
    """
    cfg = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm="ghost-drone",
        entity_id="sim001",
    )

    health_msgs: list[EntityHealth] = []
    active = [False]
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
            if active[0]:
                health_msgs.append(msg)

    subscriber = client_session.declare_subscriber("ghost-drone/@v0/**", on_sample)

    try:
        with start_simulator(cfg) as handle:
            _wait_for_publisher(handle)
            _start_playing(client_session)

            # Collect health messages during PLAYING
            time.sleep(1.5)
            active[0] = True
            time.sleep(2.0)
            active[0] = False

            # Also fetch current settings for comparison
            replies = client_session.get(
                f"{_PREFIX}/service/settings",
                timeout=5,
            )
            settings = None
            for reply in replies:
                if reply.ok is not None:
                    settings = json.loads(bytes(reply.ok.payload))

            client_session.put(f"{_PREFIX}/control/stop", "")
            time.sleep(0.2)
    finally:
        subscriber.undeclare()
        client_session.close()

    assert settings is not None, "Failed to fetch settings from queryable"
    assert len(health_msgs) >= 1, "Expected >=1 health messages"

    last = health_msgs[-1]

    # Build expected set from settings
    expected_subjects = set(settings["subjects"].keys())
    expected_map = {
        subj: (cfg_val["source_id"], cfg_val["rate_hz"])
        for subj, cfg_val in settings["subjects"].items()
    }

    # Build actual set from health message
    actual_subjects = set()
    actual_map = {}
    for exp in last.telemetry_expectations:
        actual_subjects.add(exp.subject)
        actual_map[exp.subject] = (exp.default_source_id, exp.rate_hz)

    assert actual_subjects == expected_subjects, (
        f"telemetry_expectations subjects mismatch: "
        f"expected {expected_subjects}, got {actual_subjects}"
    )

    for subj in expected_subjects:
        exp_source, exp_rate = expected_map[subj]
        act_source, act_rate = actual_map[subj]
        assert act_source == exp_source, (
            f"{subj}: expected source_id '{exp_source}', got '{act_source}'"
        )
        assert abs(act_rate - exp_rate) < 0.01, (
            f"{subj}: expected rate_hz {exp_rate}, got {act_rate}"
        )
