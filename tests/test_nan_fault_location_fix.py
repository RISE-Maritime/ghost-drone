"""
End-to-end test: NaN fault on location_fix subject.

Verifies SPEC behavior:
- "A fault can be injected on any subject of any drone."
- "NaN: the published payload contains NaN."

The location_fix subject uses encode_location_fix() (LocationFix protobuf)
rather than encode_timestamped_float() (TimestampedFloat protobuf), so NaN
handling follows a different code path than the other 4 subjects.
"""

import json
import math
import time
import threading

import keelson
import pytest
import zenoh
from keelson.payloads.foxglove.LocationFix_pb2 import LocationFix

from ghost_drone.config import AppConfig
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


def _decode_location_fix(payload_bytes: bytes) -> LocationFix:
    _recv_at, _enclosed_at, proto_bytes = keelson.uncover(payload_bytes)
    msg = LocationFix()
    msg.ParseFromString(proto_bytes)
    return msg


def test_nan_fault_on_location_fix(zenoh_router):
    """
    Injecting a NaN fault on location_fix should cause published lat/lng to
    be NaN. After clearing, values return to normal coordinates.

    This exercises the location_fix-specific NaN code path which uses
    encode_location_fix(NaN, NaN) rather than encode_timestamped_float(NaN).
    """
    cfg = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm="ghost-drone",
        entity_id="sim001",
    )

    fixes_before: list[LocationFix] = []
    fixes_during: list[LocationFix] = []
    fixes_after: list[LocationFix] = []
    active_list = [None]
    lock = threading.Lock()

    client_session = _make_client_session()

    def on_sample(sample):
        key = str(sample.key_expr)
        if "location_fix" not in key:
            return
        try:
            msg = _decode_location_fix(bytes(sample.payload))
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
            handle.sim.engine.set_home(_ROUTE[0][0], _ROUTE[0][1])
            _start_playing(client_session)

            # Phase 1: Baseline — collect normal location_fix values
            time.sleep(1.5)
            active_list[0] = fixes_before
            time.sleep(3.0)
            active_list[0] = None

            # Phase 2: Inject NaN fault on location_fix
            result = _inject_fault(client_session, "location_fix", "nan")
            assert result is not None, "No reply from fault queryable"
            assert result["ok"] is True, f"Fault injection failed: {result}"

            time.sleep(0.5)
            active_list[0] = fixes_during
            time.sleep(3.0)
            active_list[0] = None

            # Phase 3: Clear the fault
            result = _clear_fault(client_session, "location_fix", "nan")
            assert result is not None, "No reply from fault clear"
            assert result["ok"] is True, f"Fault clear failed: {result}"

            active_list[0] = fixes_after
            time.sleep(3.0)
            active_list[0] = None

            client_session.put(f"{_PREFIX}/control/stop", "")
            time.sleep(0.2)
    finally:
        subscriber.undeclare()
        client_session.close()

    # --- Assertions ---

    # Before fault: should have valid (non-NaN) coordinates
    assert len(fixes_before) >= 2, (
        f"Expected >=2 location_fix messages before fault, got {len(fixes_before)}"
    )
    for fix in fixes_before:
        assert not math.isnan(fix.latitude), (
            f"Latitude should not be NaN before fault, got {fix.latitude}"
        )
        assert not math.isnan(fix.longitude), (
            f"Longitude should not be NaN before fault, got {fix.longitude}"
        )

    # During fault: ALL lat/lng values should be NaN
    assert len(fixes_during) >= 2, (
        f"Expected >=2 location_fix messages during NaN fault, got {len(fixes_during)}"
    )
    for fix in fixes_during:
        assert math.isnan(fix.latitude), (
            f"Latitude should be NaN during fault, got {fix.latitude}"
        )
        assert math.isnan(fix.longitude), (
            f"Longitude should be NaN during fault, got {fix.longitude}"
        )

    # After clearing: values should be normal again (near Gothenburg)
    assert len(fixes_after) >= 2, (
        f"Expected >=2 location_fix messages after clearing, got {len(fixes_after)}"
    )
    for fix in fixes_after:
        assert not math.isnan(fix.latitude), (
            f"Latitude should not be NaN after clearing, got {fix.latitude}"
        )
        assert 57.0 < fix.latitude < 58.0, (
            f"Latitude should be near Gothenburg after clearing, got {fix.latitude}"
        )
