"""
Pure unit tests for the keelson enclose/uncover round-trip.
No live zenoh session required.
"""
import keelson
from keelson.payloads.Primitives_pb2 import TimestampedFloat


def test_enclose_uncover_recovers_original_bytes():
    """
    Wrapping bytes with keelson.enclose() then keelson.uncover()
    must recover the exact original bytes.
    """
    msg = TimestampedFloat()
    msg.value = 42.7
    msg.timestamp.GetCurrentTime()
    payload_bytes = msg.SerializeToString()

    envelope_bytes = keelson.enclose(payload_bytes)

    received_at, enclosed_at, recovered_bytes = keelson.uncover(envelope_bytes)

    assert recovered_bytes == payload_bytes


def test_enclose_uncover_timestamps_are_ordered():
    """
    received_at must be >= enclosed_at, and enclosed_at must be > 0
    (nanosecond integer timestamps).
    """
    msg = TimestampedFloat()
    msg.value = 0.0
    msg.timestamp.GetCurrentTime()
    payload_bytes = msg.SerializeToString()

    envelope_bytes = keelson.enclose(payload_bytes)
    received_at, enclosed_at, recovered_bytes = keelson.uncover(envelope_bytes)

    assert enclosed_at > 0, "enclosed_at timestamp must be a positive nanosecond integer"
    assert received_at >= enclosed_at, "received_at must not precede enclosed_at"


def test_enclose_uncover_payload_value_survives():
    """
    The payload value must decode correctly after the enclose/uncover round-trip.
    """
    msg = TimestampedFloat()
    msg.value = 123.456
    msg.timestamp.GetCurrentTime()
    payload_bytes = msg.SerializeToString()

    envelope_bytes = keelson.enclose(payload_bytes)
    _, _, recovered_bytes = keelson.uncover(envelope_bytes)

    recovered_msg = TimestampedFloat()
    recovered_msg.ParseFromString(recovered_bytes)
    assert abs(recovered_msg.value - 123.456) < 1e-3


def test_known_subject_is_well_known():
    """heading_true_north_deg is used in the Phase 1 test helper — must be well-known."""
    assert keelson.is_subject_well_known("heading_true_north_deg"), (
        "heading_true_north_deg should be a well-known keelson subject. "
        "If this fails, the keelson subjects.yaml may have changed — "
        "update PHASE_SUBJECTS in ghost_drone/startup.py accordingly."
    )


def test_unknown_subject_is_not_well_known():
    """Arbitrary strings must not pass subject validation."""
    assert not keelson.is_subject_well_known("random_mumbo_jumbo_xyz")
