"""
ghost_drone/zenoh_bridge/telemetry.py

keelson encoding pipeline and rate throttle for telemetry subjects.

Provides:
- MPS_TO_KNOTS: unit conversion constant
- encode_timestamped_float(): build a keelson-enclosed TimestampedFloat payload
- encode_location_fix(): build a keelson-enclosed LocationFix payload
- make_key(): construct a keelson pubsub key expression from AppConfig
- SubjectThrottle: per-subject rate limiter for publish decisions

This module only builds bytes and key expressions.  ZenohPublisher.publish()
is called by the server (03-02). Do NOT call zenoh directly here.
"""

from __future__ import annotations

import time

import keelson
from keelson.payloads.Primitives_pb2 import TimestampedFloat
from keelson.payloads.foxglove.LocationFix_pb2 import LocationFix

from ghost_drone.config import AppConfig

# SimEngine produces speed in m/s; speed_over_ground_knots subject expects knots.
MPS_TO_KNOTS: float = 1.94384


def encode_timestamped_float(value: float) -> bytes:
    """Encode a float value as a keelson-enclosed TimestampedFloat.

    Args:
        value: The float value to encode. Note that TimestampedFloat uses
               proto float32, so round-trip precision is ~1e-3.

    Returns:
        Bytes of the keelson envelope containing the serialised proto.
    """
    msg = TimestampedFloat()
    msg.timestamp.FromNanoseconds(time.time_ns())
    msg.value = value
    return keelson.enclose(msg.SerializeToString())


def encode_location_fix(lat: float, lng: float) -> bytes:
    """Encode a lat/lng position as a keelson-enclosed LocationFix.

    Args:
        lat: Latitude in decimal degrees (WGS-84).
        lng: Longitude in decimal degrees (WGS-84).

    Returns:
        Bytes of the keelson envelope containing the serialised proto.
    """
    msg = LocationFix()
    msg.timestamp.FromNanoseconds(time.time_ns())
    msg.latitude = lat
    msg.longitude = lng
    msg.altitude = 0.0
    return keelson.enclose(msg.SerializeToString())


def make_key(cfg: AppConfig, subject: str, source_id: str) -> str:
    """Construct a keelson pubsub key expression.

    Args:
        cfg: Application configuration providing realm and entity_id.
        subject: The telemetry subject name (e.g. 'heading_true_north_deg').
        source_id: The source identifier (e.g. 'imu/0').

    Returns:
        The full keelson key expression string.
    """
    return f"{cfg.keelson_realm}/@v1/{cfg.entity_id}/pubsub/{subject}/{source_id}"


class SubjectThrottle:
    """Per-subject rate limiter for telemetry publish decisions.

    Tracks the last publish time for each subject and gates publishing
    to a configured rate in Hz.

    Example:
        throttle = SubjectThrottle()
        if throttle.should_publish('heading', 10.0):
            publisher.publish(key, payload)
    """

    def __init__(self) -> None:
        self._last: dict[str, float] = {}

    def should_publish(self, subject: str, rate_hz: float) -> bool:
        """Return True if enough time has elapsed to publish at rate_hz.

        Args:
            subject: The telemetry subject name (used as the tracking key).
            rate_hz: Maximum publish rate in Hz. Returns False if <= 0.

        Returns:
            True if the subject may be published now; False otherwise.
        """
        if rate_hz <= 0:
            return False
        period_s = 1.0 / rate_hz
        now = time.monotonic()
        if now - self._last.get(subject, 0.0) >= period_s:
            self._last[subject] = now
            return True
        return False

    def reset(self) -> None:
        """Clear all subject timestamps. Call on simulation stop."""
        self._last.clear()
