"""
Unit tests for EntityHealth encoding/decoding round-trip and keelson registration.
"""

import keelson

from ghost_drone.proto import register_custom_subjects
from ghost_drone.proto.entity_health_pb2 import (
    EntityHealth,
    HEALTH_CRITICAL,
    HEALTH_DEGRADED,
    HEALTH_INACTIVE,
    HEALTH_NOMINAL,
    HEALTH_UNKNOWN,
    MODE_AUTONOMOUS,
    MODE_DELEGATED,
    MODE_DIRECTED,
    MODE_MANNED_ON_BOARD,
    MODE_MONITORED,
    MODE_OPERATED,
)
from ghost_drone.zenoh_bridge.telemetry import encode_entity_health

register_custom_subjects()

_SAMPLE_TELEMETRY = [
    ("heading_true_north_deg", "imu/0", 1.0),
    ("speed_over_ground_knots", "imu/0", 2.0),
    ("location_fix", "gnss/0", 1.0),
]


def _decode(payload: bytes) -> EntityHealth:
    _, _, proto_bytes = keelson.uncover(payload)
    msg = EntityHealth()
    msg.ParseFromString(proto_bytes)
    return msg


def test_entity_health_is_well_known():
    assert keelson.is_subject_well_known("entity_health")
    assert keelson.get_subject_schema("entity_health") == "ghost_drone.EntityHealth"


def test_encode_decode_round_trip_nominal():
    subsystems = [
        ("position", HEALTH_NOMINAL, ""),
        ("heading", HEALTH_NOMINAL, ""),
        ("speed", HEALTH_NOMINAL, ""),
    ]
    payload = encode_entity_health(
        HEALTH_NOMINAL, 1.0, MODE_AUTONOMOUS, "", subsystems, _SAMPLE_TELEMETRY,
    )
    msg = _decode(payload)

    assert msg.level == HEALTH_NOMINAL
    assert msg.rate_hz == 1.0
    assert msg.operation_mode == MODE_AUTONOMOUS
    assert msg.operator == ""
    assert len(msg.subsystems) == 3
    assert msg.subsystems[0].name == "position"
    assert msg.subsystems[0].level == HEALTH_NOMINAL


def test_encode_decode_round_trip_degraded():
    subsystems = [
        ("position", HEALTH_NOMINAL, ""),
        ("heading", HEALTH_CRITICAL, "sensor timeout"),
        ("speed", HEALTH_NOMINAL, ""),
    ]
    payload = encode_entity_health(
        HEALTH_DEGRADED, 1.0, MODE_AUTONOMOUS, "", subsystems, _SAMPLE_TELEMETRY,
    )
    msg = _decode(payload)

    assert msg.level == HEALTH_DEGRADED
    assert msg.subsystems[1].name == "heading"
    assert msg.subsystems[1].level == HEALTH_CRITICAL
    assert msg.subsystems[1].detail == "sensor timeout"


def test_encode_decode_round_trip_inactive():
    payload = encode_entity_health(HEALTH_INACTIVE, 1.0, MODE_MANNED_ON_BOARD, "", [], [])
    msg = _decode(payload)

    assert msg.level == HEALTH_INACTIVE
    assert msg.operation_mode == MODE_MANNED_ON_BOARD
    assert len(msg.subsystems) == 0
    assert len(msg.telemetry_expectations) == 0


def test_timestamp_is_set():
    payload = encode_entity_health(HEALTH_NOMINAL, 1.0, MODE_MANNED_ON_BOARD, "", [], [])
    msg = _decode(payload)

    assert msg.timestamp.seconds > 0


def test_health_levels_have_expected_values():
    assert HEALTH_UNKNOWN == 0
    assert HEALTH_INACTIVE == 1
    assert HEALTH_CRITICAL == 2
    assert HEALTH_DEGRADED == 3
    assert HEALTH_NOMINAL == 4


def test_operation_modes_have_expected_values():
    assert MODE_MANNED_ON_BOARD == 0
    assert MODE_OPERATED == 1
    assert MODE_DIRECTED == 2
    assert MODE_DELEGATED == 3
    assert MODE_MONITORED == 4
    assert MODE_AUTONOMOUS == 5


def test_telemetry_expectations_round_trip():
    payload = encode_entity_health(
        HEALTH_NOMINAL, 1.0, MODE_AUTONOMOUS, "", [], _SAMPLE_TELEMETRY,
    )
    msg = _decode(payload)

    assert len(msg.telemetry_expectations) == 3

    exp = msg.telemetry_expectations[0]
    assert exp.subject == "heading_true_north_deg"
    assert exp.default_source_id == "imu/0"
    assert exp.rate_hz == 1.0

    exp2 = msg.telemetry_expectations[1]
    assert exp2.subject == "speed_over_ground_knots"
    assert exp2.rate_hz == 2.0


def test_rate_hz_on_health_message():
    payload = encode_entity_health(HEALTH_NOMINAL, 0.5, MODE_MANNED_ON_BOARD, "", [], [])
    msg = _decode(payload)

    assert msg.rate_hz == 0.5


def test_directed_mode_with_operator():
    payload = encode_entity_health(
        HEALTH_NOMINAL, 1.0, MODE_DIRECTED, "roc/operator-1", [], [],
    )
    msg = _decode(payload)

    assert msg.operation_mode == MODE_DIRECTED
    assert msg.operator == "roc/operator-1"
