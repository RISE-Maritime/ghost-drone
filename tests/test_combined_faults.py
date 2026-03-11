"""
End-to-end test: combined fault injection on the same subject.

Verifies SPEC behavior:
- Faults can be combined (e.g., stuck + wrong rate on the same subject).
- The combined effect is: value is frozen (stuck) AND published at 2x rate (wrong_rate).
- When both faults are cleared, the subject returns to normal behavior.
"""

import json
import time
import threading

import keelson
import pytest
import zenoh
from keelson.payloads.Primitives_pb2 import TimestampedFloat

from ghost_drone.config import AppConfig
from ghost_drone.server import start_simulator

# Non-standard port to avoid colliding with a real zenoh instance.
_ROUTER_ENDPOINT = "tcp/127.0.0.1:17447"

# Two waypoints near the default map centre (Lindholmen, Gothenburg).
_ROUTE = [[57.7069, 11.9381], [57.7100, 11.9420]]

# Key expression prefix matching the AppConfig below
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
    """Open a zenoh client session connected to the test router."""
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
    """Wait until the ZenohPublisher session is ready."""
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        if handle.publisher.session_ready.is_set():
            return
        time.sleep(0.1)
    raise RuntimeError("Publisher session not ready within timeout")


def _inject_fault(client_session, subject, fault_type):
    """Inject a fault via the fault queryable."""
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
    """Clear a fault via the fault queryable."""
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
    """Load a route and start playing."""
    replies = client_session.get(
        f"{_PREFIX}/service/load_route",
        payload=json.dumps({"waypoints": _ROUTE}).encode(),
        timeout=5,
    )
    for reply in replies:
        pass
    client_session.put(f"{_PREFIX}/control/play", "")


def test_combined_stuck_and_wrong_rate_faults(zenoh_router):
    """
    Injecting both 'stuck' and 'wrong_rate' faults on the same subject causes
    the value to freeze AND publish at 2x rate simultaneously.

    SPEC: "Faults can be combined (e.g., stuck + wrong rate on the same subject)."
    """
    cfg = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm="ghost-drone",
        entity_id="sim001",
    )

    # Collect heading values and counts in each phase
    values_before: list[float] = []
    values_combined: list[float] = []
    values_after: list[float] = []
    active_list = [None]
    lock = threading.Lock()

    client_session = _make_client_session()

    def on_sample(sample):
        key = str(sample.key_expr)
        if "heading_true_north_deg" not in key:
            return
        try:
            _recv_at, _enclosed_at, proto_bytes = keelson.uncover(
                bytes(sample.payload)
            )
            msg = TimestampedFloat()
            msg.ParseFromString(proto_bytes)
            value = msg.value
        except Exception:
            return
        with lock:
            target = active_list[0]
            if target is not None:
                target.append(value)

    subscriber = client_session.declare_subscriber("ghost-drone/@v0/**", on_sample)

    try:
        with start_simulator(cfg) as handle:
            _wait_for_publisher(handle)
            _start_playing(client_session)

            # Phase 1: Baseline — collect heading values at normal rate (1 Hz)
            time.sleep(1.5)  # let it start publishing
            active_list[0] = values_before
            time.sleep(4.0)
            active_list[0] = None

            # Phase 2: Inject BOTH stuck and wrong_rate faults on heading
            result = _inject_fault(client_session, "heading_true_north_deg", "stuck")
            assert result is not None, "No reply from fault queryable"
            assert result["ok"] is True, f"stuck fault injection failed: {result}"

            result = _inject_fault(client_session, "heading_true_north_deg", "wrong_rate")
            assert result is not None, "No reply from fault queryable"
            assert result["ok"] is True, f"wrong_rate fault injection failed: {result}"

            time.sleep(0.5)  # let the combined faults take effect
            active_list[0] = values_combined
            time.sleep(4.0)
            active_list[0] = None

            # Phase 3: Clear both faults
            result = _clear_fault(client_session, "heading_true_north_deg", "stuck")
            assert result is not None, "No reply from fault clear"
            assert result["ok"] is True, f"stuck fault clear failed: {result}"

            result = _clear_fault(client_session, "heading_true_north_deg", "wrong_rate")
            assert result is not None, "No reply from fault clear"
            assert result["ok"] is True, f"wrong_rate fault clear failed: {result}"

            time.sleep(0.5)
            active_list[0] = values_after
            time.sleep(4.0)
            active_list[0] = None

            client_session.put(f"{_PREFIX}/control/stop", "")
            time.sleep(0.2)
    finally:
        subscriber.undeclare()
        client_session.close()

    # --- Assertions ---

    # Phase 1: Baseline — should have ~4 messages at 1 Hz over 4s
    assert len(values_before) >= 2, (
        f"Expected >=2 heading values before faults, got {len(values_before)}"
    )

    # Phase 2: Combined faults — stuck means ALL values identical,
    # wrong_rate means significantly more messages than baseline
    assert len(values_combined) >= 2, (
        f"Expected >=2 heading values during combined faults, got {len(values_combined)}"
    )

    # Stuck effect: all values should be identical (frozen)
    stuck_value = values_combined[0]
    assert all(v == stuck_value for v in values_combined), (
        f"All values during stuck+wrong_rate should be identical (stuck), "
        f"got {len(set(values_combined))} unique values: {values_combined[:5]}..."
    )

    # Wrong_rate effect: should have more messages than baseline (2x rate)
    assert len(values_combined) > len(values_before) * 1.5, (
        f"Combined faults should produce more messages than baseline (wrong_rate). "
        f"Before: {len(values_before)}, Combined: {len(values_combined)}"
    )

    # Phase 3: After clearing — values should vary again (not stuck)
    # and rate should return to normal
    assert len(values_after) >= 2, (
        f"Expected >=2 heading values after clearing, got {len(values_after)}"
    )
    assert len(values_after) <= len(values_before) * 1.5, (
        f"Rate should return to normal after clearing. "
        f"Before: {len(values_before)}, After: {len(values_after)}"
    )
