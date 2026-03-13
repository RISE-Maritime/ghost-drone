"""
E2E test: telemetry_expectations in entity_health update after settings change.

SPEC behavior tested:
- telemetry_expectations in the health message match the drone's current
  settings (subjects, rates, source_ids).

The existing test (test_health_states.py) verifies that expectations match
the default settings. This test verifies that after updating rate_hz and
source_id via the settings queryable, the expectations in entity_health
reflect the new values — ensuring "current" means post-update too.
"""

import json
import time
import threading

import pytest
import zenoh
import keelson

from ghost_drone.config import AppConfig
from ghost_drone.proto.entity_health_pb2 import EntityHealth
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


def test_expectations_reflect_updated_rate_hz(zenoh_router):
    """
    After updating heading rate_hz from 1.0 to 5.0, the telemetry_expectations
    in entity_health should report rate_hz=5.0 for heading_true_north_deg.
    """
    cfg = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm="ghost-drone",
        entity_id="sim001",
    )

    health_before: list[EntityHealth] = []
    health_after: list[EntityHealth] = []
    active_list = [None]
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
            target = active_list[0]
            if target is not None:
                target.append(msg)

    subscriber = client_session.declare_subscriber("ghost-drone/@v0/**", on_sample)

    try:
        with start_simulator(cfg) as handle:
            _wait_for_publisher(handle)
            _start_playing(client_session)

            # Phase 1: collect health with default settings (rate_hz=1.0)
            time.sleep(1.5)
            active_list[0] = health_before
            time.sleep(2.0)
            active_list[0] = None

            # Update heading rate_hz to 5.0
            replies = client_session.get(
                f"{_PREFIX}/service/settings",
                payload=json.dumps({
                    "subjects": {
                        "heading_true_north_deg": {"rate_hz": 5.0},
                    }
                }).encode(),
                timeout=5,
            )
            for reply in replies:
                updated = json.loads(bytes(reply.ok.payload))
            assert updated["subjects"]["heading_true_north_deg"]["rate_hz"] == 5.0

            # Phase 2: collect health after settings update
            time.sleep(1.5)
            active_list[0] = health_after
            time.sleep(2.0)
            active_list[0] = None

            client_session.put(f"{_PREFIX}/control/stop", "")
            time.sleep(0.2)
    finally:
        subscriber.undeclare()
        client_session.close()

    # Phase 1: default heading rate should be 1.0
    assert len(health_before) >= 1, (
        f"Expected >=1 health messages before update, got {len(health_before)}"
    )
    before_msg = health_before[-1]
    before_expectations = {
        exp.subject: exp.rate_hz for exp in before_msg.telemetry_expectations
    }
    assert "heading_true_north_deg" in before_expectations
    assert abs(before_expectations["heading_true_north_deg"] - 1.0) < 0.01, (
        f"Before update, heading rate_hz should be 1.0, "
        f"got {before_expectations['heading_true_north_deg']}"
    )

    # Phase 2: after update, heading rate should be 5.0
    assert len(health_after) >= 1, (
        f"Expected >=1 health messages after update, got {len(health_after)}"
    )
    after_msg = health_after[-1]
    after_expectations = {
        exp.subject: exp.rate_hz for exp in after_msg.telemetry_expectations
    }
    assert "heading_true_north_deg" in after_expectations
    assert abs(after_expectations["heading_true_north_deg"] - 5.0) < 0.01, (
        f"After update, heading rate_hz should be 5.0, "
        f"got {after_expectations['heading_true_north_deg']}"
    )

    # Other subjects should remain at default 1.0
    for subj in ["location_fix", "speed_over_ground_knots", "roll_deg", "pitch_deg"]:
        assert abs(after_expectations[subj] - 1.0) < 0.01, (
            f"After update, {subj} rate_hz should still be 1.0, "
            f"got {after_expectations[subj]}"
        )


def test_expectations_reflect_updated_source_id(zenoh_router):
    """
    After updating heading source_id from 'imu/0' to 'imu/1', the
    telemetry_expectations in entity_health should report the new source_id.
    """
    cfg = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm="ghost-drone",
        entity_id="sim001",
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

    subscriber = client_session.declare_subscriber("ghost-drone/@v0/**", on_sample)

    try:
        with start_simulator(cfg) as handle:
            _wait_for_publisher(handle)
            _start_playing(client_session)
            time.sleep(1.0)

            # Update heading source_id to 'imu/1'
            replies = client_session.get(
                f"{_PREFIX}/service/settings",
                payload=json.dumps({
                    "subjects": {
                        "heading_true_north_deg": {"source_id": "imu/1"},
                    }
                }).encode(),
                timeout=5,
            )
            for reply in replies:
                updated = json.loads(bytes(reply.ok.payload))
            assert updated["subjects"]["heading_true_north_deg"]["source_id"] == "imu/1"

            # Collect health after update
            time.sleep(0.5)
            collecting[0] = True
            time.sleep(2.0)
            collecting[0] = False

            client_session.put(f"{_PREFIX}/control/stop", "")
            time.sleep(0.2)
    finally:
        subscriber.undeclare()
        client_session.close()

    assert len(health_msgs) >= 1, (
        f"Expected >=1 health messages after source_id update, got {len(health_msgs)}"
    )

    last = health_msgs[-1]
    expectations = {
        exp.subject: exp.default_source_id
        for exp in last.telemetry_expectations
    }
    assert expectations["heading_true_north_deg"] == "imu/1", (
        f"After update, heading source_id should be 'imu/1', "
        f"got '{expectations['heading_true_north_deg']}'"
    )
    # Other subjects should remain at their defaults
    assert expectations["location_fix"] == "gnss/0", (
        f"location_fix source_id should still be 'gnss/0', "
        f"got '{expectations['location_fix']}'"
    )
