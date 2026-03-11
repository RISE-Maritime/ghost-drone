"""
End-to-end test: fault injection via zenoh queryable.

Verifies SPEC behaviors:
- A fault can be injected on any subject of any drone (drop type).
- When a fault is cleared, the subject returns to normal behavior.
- Faults are controllable via zenoh queryable.
"""

import json
import time
import threading

import pytest
import zenoh

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


def test_drop_fault_stops_subject_publishing(zenoh_router):
    """
    Injecting a 'drop' fault on a subject stops it from publishing.
    Other subjects continue publishing normally.
    Clearing the fault restores publishing.
    """
    cfg = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm="ghost-drone",
        entity_id="sim001",
    )

    # Track per-subject message counts in time windows
    counts_before: dict[str, int] = {}
    counts_during: dict[str, int] = {}
    counts_after: dict[str, int] = {}
    active_counter = [None]  # mutable reference to current counter dict
    lock = threading.Lock()

    client_session = _make_client_session()

    def on_sample(sample):
        parts = str(sample.key_expr).split("/")
        if len(parts) >= 5:
            subject = parts[4]
            # Only count the 5 keelson telemetry subjects
            if subject in (
                "heading_true_north_deg",
                "speed_over_ground_knots",
                "roll_deg",
                "pitch_deg",
                "location_fix",
            ):
                with lock:
                    counter = active_counter[0]
                    if counter is not None:
                        counter[subject] = counter.get(subject, 0) + 1

    subscriber = client_session.declare_subscriber("ghost-drone/@v0/**", on_sample)

    try:
        with start_simulator(cfg) as handle:
            _wait_for_publisher(handle)
            _start_playing(client_session)

            # Phase 1: Collect baseline counts (no faults)
            time.sleep(1.5)  # let subjects start publishing
            active_counter[0] = counts_before
            time.sleep(2.0)
            active_counter[0] = None

            # Phase 2: Inject drop fault on heading_true_north_deg
            result = _inject_fault(client_session, "heading_true_north_deg", "drop")
            assert result is not None, "No reply from fault queryable"
            assert result["ok"] is True, f"Fault injection failed: {result}"

            active_counter[0] = counts_during
            time.sleep(2.0)
            active_counter[0] = None

            # Phase 3: Clear the fault
            result = _clear_fault(client_session, "heading_true_north_deg", "drop")
            assert result is not None, "No reply from fault clear"
            assert result["ok"] is True, f"Fault clear failed: {result}"

            active_counter[0] = counts_after
            time.sleep(2.0)
            active_counter[0] = None

            client_session.put(f"{_PREFIX}/control/stop", "")
            time.sleep(0.2)
    finally:
        subscriber.undeclare()
        client_session.close()

    # --- Assertions ---

    # Before fault: heading should be publishing (at 1Hz, expect >= 1 in 2s)
    assert counts_before.get("heading_true_north_deg", 0) >= 1, (
        f"heading should publish before fault, got {counts_before}"
    )

    # During fault: heading should NOT publish
    assert counts_during.get("heading_true_north_deg", 0) == 0, (
        f"heading should be dropped during fault, got {counts_during}"
    )

    # During fault: other subjects should still publish
    assert counts_during.get("speed_over_ground_knots", 0) >= 1, (
        f"speed should still publish during heading fault, got {counts_during}"
    )

    # After clearing: heading should resume
    assert counts_after.get("heading_true_north_deg", 0) >= 1, (
        f"heading should resume after clearing fault, got {counts_after}"
    )


def test_stuck_fault_freezes_published_value(zenoh_router):
    """
    Injecting a 'stuck' fault on a subject freezes the published value.
    All messages during the fault carry the same value.
    After clearing, values change again.

    SPEC: "stuck: the published value freezes at its current reading."
    """
    cfg = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm="ghost-drone",
        entity_id="sim001",
    )

    # Collect decoded heading values in each phase
    values_before: list[float] = []
    values_during: list[float] = []
    values_after: list[float] = []
    active_list = [None]  # mutable ref to current collection list
    lock = threading.Lock()

    client_session = _make_client_session()

    def on_sample(sample):
        key = str(sample.key_expr)
        if "heading_true_north_deg" not in key:
            return
        try:
            import keelson as _keelson
            from keelson.payloads.Primitives_pb2 import TimestampedFloat

            _recv_at, _enclosed_at, proto_bytes = _keelson.uncover(
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

            # Phase 1: Baseline — collect varying heading values
            time.sleep(1.5)  # let it start publishing
            active_list[0] = values_before
            time.sleep(3.0)
            active_list[0] = None

            # Phase 2: Inject stuck fault
            result = _inject_fault(client_session, "heading_true_north_deg", "stuck")
            assert result is not None, "No reply from fault queryable"
            assert result["ok"] is True, f"Fault injection failed: {result}"

            time.sleep(0.5)  # let the stuck value latch
            active_list[0] = values_during
            time.sleep(3.0)
            active_list[0] = None

            # Phase 3: Clear the fault
            result = _clear_fault(client_session, "heading_true_north_deg", "stuck")
            assert result is not None, "No reply from fault clear"
            assert result["ok"] is True, f"Fault clear failed: {result}"

            active_list[0] = values_after
            time.sleep(3.0)
            active_list[0] = None

            client_session.put(f"{_PREFIX}/control/stop", "")
            time.sleep(0.2)
    finally:
        subscriber.undeclare()
        client_session.close()

    # --- Assertions ---

    # Before fault: should have received multiple values
    assert len(values_before) >= 2, (
        f"Expected >=2 heading values before fault, got {len(values_before)}"
    )

    # During fault: should have received multiple values, ALL identical
    assert len(values_during) >= 2, (
        f"Expected >=2 heading values during stuck fault, got {len(values_during)}"
    )
    stuck_value = values_during[0]
    assert all(v == stuck_value for v in values_during), (
        f"All values during stuck fault should be identical, got {values_during}"
    )

    # After clearing: should have received values that vary (not all identical)
    assert len(values_after) >= 2, (
        f"Expected >=2 heading values after clearing, got {len(values_after)}"
    )


def test_wrong_rate_fault_changes_publish_rate(zenoh_router):
    """
    Injecting a 'wrong_rate' fault on a subject causes it to publish at a
    different rate than configured. After clearing, the rate returns to normal.

    SPEC: "wrong rate: the subject publishes at a rate different from its configured Hz."
    """
    cfg = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm="ghost-drone",
        entity_id="sim001",
    )

    counts_before: list[int] = [0]
    counts_during: list[int] = [0]
    counts_after: list[int] = [0]
    active_counter = [None]  # mutable ref to current counter list
    lock = threading.Lock()

    client_session = _make_client_session()

    def on_sample(sample):
        key = str(sample.key_expr)
        if "heading_true_north_deg" not in key:
            return
        with lock:
            target = active_counter[0]
            if target is not None:
                target[0] += 1

    subscriber = client_session.declare_subscriber("ghost-drone/@v0/**", on_sample)

    try:
        with start_simulator(cfg) as handle:
            _wait_for_publisher(handle)
            _start_playing(client_session)

            # Phase 1: Baseline — count heading messages at normal rate (1 Hz)
            time.sleep(1.5)  # let it stabilise
            active_counter[0] = counts_before
            time.sleep(4.0)
            active_counter[0] = None

            # Phase 2: Inject wrong_rate fault — rate should change
            result = _inject_fault(client_session, "heading_true_north_deg", "wrong_rate")
            assert result is not None, "No reply from fault queryable"
            assert result["ok"] is True, f"Fault injection failed: {result}"

            time.sleep(0.5)  # let the new rate take effect
            active_counter[0] = counts_during
            time.sleep(4.0)
            active_counter[0] = None

            # Phase 3: Clear the fault — rate should return to normal
            result = _clear_fault(client_session, "heading_true_north_deg", "wrong_rate")
            assert result is not None, "No reply from fault clear"
            assert result["ok"] is True, f"Fault clear failed: {result}"

            time.sleep(0.5)
            active_counter[0] = counts_after
            time.sleep(4.0)
            active_counter[0] = None

            client_session.put(f"{_PREFIX}/control/stop", "")
            time.sleep(0.2)
    finally:
        subscriber.undeclare()
        client_session.close()

    # --- Assertions ---

    # At 1 Hz over 4s, expect ~4 messages baseline
    assert counts_before[0] >= 2, (
        f"Expected >=2 heading messages before fault, got {counts_before[0]}"
    )

    # During wrong_rate fault, expect significantly more messages than baseline.
    # The fault doubles the rate (2 Hz), so we expect roughly 2x messages.
    assert counts_during[0] > counts_before[0] * 1.5, (
        f"Expected wrong_rate fault to increase message count significantly. "
        f"Before: {counts_before[0]}, During: {counts_during[0]}"
    )

    # After clearing, rate should return to baseline levels
    # (should not be significantly more than baseline)
    assert counts_after[0] <= counts_before[0] * 1.5, (
        f"Expected rate to return to normal after clearing. "
        f"Before: {counts_before[0]}, After: {counts_after[0]}"
    )


def test_nan_fault_publishes_nan_values(zenoh_router):
    """
    Injecting a 'nan' fault on a subject causes published values to be NaN.
    After clearing, values return to normal (non-NaN).

    SPEC: "NaN: the published payload contains NaN."
    """
    cfg = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm="ghost-drone",
        entity_id="sim001",
    )

    import math

    values_before: list[float] = []
    values_during: list[float] = []
    values_after: list[float] = []
    active_list = [None]
    lock = threading.Lock()

    client_session = _make_client_session()

    def on_sample(sample):
        key = str(sample.key_expr)
        if "heading_true_north_deg" not in key:
            return
        try:
            import keelson as _keelson
            from keelson.payloads.Primitives_pb2 import TimestampedFloat

            _recv_at, _enclosed_at, proto_bytes = _keelson.uncover(
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

            # Phase 1: Baseline — collect normal heading values
            time.sleep(1.5)
            active_list[0] = values_before
            time.sleep(3.0)
            active_list[0] = None

            # Phase 2: Inject NaN fault
            result = _inject_fault(client_session, "heading_true_north_deg", "nan")
            assert result is not None, "No reply from fault queryable"
            assert result["ok"] is True, f"Fault injection failed: {result}"

            time.sleep(0.5)
            active_list[0] = values_during
            time.sleep(3.0)
            active_list[0] = None

            # Phase 3: Clear the fault
            result = _clear_fault(client_session, "heading_true_north_deg", "nan")
            assert result is not None, "No reply from fault clear"
            assert result["ok"] is True, f"Fault clear failed: {result}"

            active_list[0] = values_after
            time.sleep(3.0)
            active_list[0] = None

            client_session.put(f"{_PREFIX}/control/stop", "")
            time.sleep(0.2)
    finally:
        subscriber.undeclare()
        client_session.close()

    # --- Assertions ---

    # Before fault: should have non-NaN values
    assert len(values_before) >= 2, (
        f"Expected >=2 heading values before fault, got {len(values_before)}"
    )
    assert all(not math.isnan(v) for v in values_before), (
        f"Values before fault should not be NaN, got {values_before}"
    )

    # During fault: ALL values should be NaN
    assert len(values_during) >= 2, (
        f"Expected >=2 heading values during NaN fault, got {len(values_during)}"
    )
    assert all(math.isnan(v) for v in values_during), (
        f"All values during NaN fault should be NaN, got {values_during}"
    )

    # After clearing: values should be normal (not NaN)
    assert len(values_after) >= 2, (
        f"Expected >=2 heading values after clearing, got {len(values_after)}"
    )
    assert all(not math.isnan(v) for v in values_after), (
        f"Values after clearing NaN fault should not be NaN, got {values_after}"
    )
