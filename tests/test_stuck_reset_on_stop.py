"""
End-to-end test: stuck fault values are reset when the drone is stopped.

Verifies SPEC behavior:
- "stuck: the published value freezes at its current reading."
- "When a drone is stopped, it resets to idle."

When a stuck fault persists across a stop/replay cycle the frozen value
must be captured fresh from the new session, not reused from the old one.
"""

import json
import math
import time
import threading

import pytest
import zenoh
import keelson
from keelson.payloads.Primitives_pb2 import TimestampedFloat

from ghost_drone.config import AppConfig
from ghost_drone.server import start_simulator

_ROUTER_ENDPOINT = "tcp/127.0.0.1:17447"
_PREFIX = "ghost-drone/@v0/sim001"

# Route A heads north (~0°).  Route B heads east (~90°).
_NORTH_ROUTE = [[57.7000, 11.9300], [57.7200, 11.9300]]
_EAST_ROUTE = [[57.7000, 11.9300], [57.7000, 11.9500]]


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
        payload=json.dumps(
            {"action": "inject", "subject": subject, "fault_type": fault_type}
        ).encode(),
        timeout=5,
    )
    for reply in replies:
        result = json.loads(bytes(reply.ok.payload))
        assert result["ok"], f"inject fault failed: {result}"


def _clear_fault(client_session, subject, fault_type):
    replies = client_session.get(
        f"{_PREFIX}/service/fault",
        payload=json.dumps(
            {"action": "clear", "subject": subject, "fault_type": fault_type}
        ).encode(),
        timeout=5,
    )
    for reply in replies:
        result = json.loads(bytes(reply.ok.payload))
        assert result["ok"], f"clear fault failed: {result}"


def _load_route(client_session, waypoints):
    replies = client_session.get(
        f"{_PREFIX}/service/load_route",
        payload=json.dumps({"waypoints": waypoints}).encode(),
        timeout=5,
    )
    for reply in replies:
        result = json.loads(bytes(reply.ok.payload))
        assert result["ok"], f"load_route failed: {result}"


def _normalize_heading(deg):
    """Normalize heading to [0, 360)."""
    return deg % 360


def test_stuck_values_reset_on_stop(zenoh_router):
    """
    When a stuck fault persists across stop/replay with a different route,
    the frozen heading must be captured fresh — not reused from the old route.

    Phase 1: North route → stuck heading ~0°
    Phase 2: Stop, load east route, replay → stuck heading should be ~90°
             (bug: would still be ~0° if stuck_values not cleared on stop)
    """
    cfg = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm="ghost-drone",
        entity_id="sim001",
    )

    heading_values: dict[str, list[float]] = {"phase1": [], "phase2": []}
    phase = [None]
    lock = threading.Lock()

    client_session = _make_client_session()

    def on_heading(sample):
        key = str(sample.key_expr)
        if "heading_true_north_deg" not in key:
            return
        try:
            _, _, proto_bytes = keelson.uncover(bytes(sample.payload))
            msg = TimestampedFloat()
            msg.ParseFromString(proto_bytes)
            value = msg.value
        except Exception:
            return
        if math.isnan(value):
            return
        with lock:
            p = phase[0]
            if p is not None:
                heading_values[p].append(value)

    subscriber = client_session.declare_subscriber("ghost-drone/@v0/**", on_heading)

    try:
        with start_simulator(cfg) as handle:
            _wait_for_publisher(handle)
            handle.sim.engine.set_home(_NORTH_ROUTE[0][0], _NORTH_ROUTE[0][1])

            # --- Phase 1: North route, inject stuck ---
            _load_route(client_session, _NORTH_ROUTE)
            client_session.put(f"{_PREFIX}/control/play", "")
            time.sleep(1.5)  # heading converges toward ~0° (north)

            _inject_fault(client_session, "heading_true_north_deg", "stuck")
            time.sleep(0.3)

            phase[0] = "phase1"
            time.sleep(2.5)  # collect frozen heading values at 1 Hz
            phase[0] = None

            # --- Stop and load a different route ---
            client_session.put(f"{_PREFIX}/control/stop", "")
            time.sleep(0.5)

            # --- Phase 2: East route, replay (stuck fault still active) ---
            _load_route(client_session, _EAST_ROUTE)
            client_session.put(f"{_PREFIX}/control/play", "")
            time.sleep(1.5)  # heading should be ~90° (east) on fresh capture

            phase[0] = "phase2"
            time.sleep(2.5)  # collect frozen heading values
            phase[0] = None

            # Cleanup
            _clear_fault(client_session, "heading_true_north_deg", "stuck")
            client_session.put(f"{_PREFIX}/control/stop", "")
            time.sleep(0.2)
    finally:
        subscriber.undeclare()
        client_session.close()

    # --- Assertions ---
    assert len(heading_values["phase1"]) >= 1, (
        f"Expected >=1 heading values in phase 1, got {len(heading_values['phase1'])}"
    )
    assert len(heading_values["phase2"]) >= 1, (
        f"Expected >=1 heading values in phase 2, got {len(heading_values['phase2'])}"
    )

    # Phase 1: heading should be stuck near 0° (north).
    # Normalize to handle wrap-around (e.g. 359° is near 0°).
    avg_p1 = _normalize_heading(heading_values["phase1"][0])
    assert avg_p1 < 45 or avg_p1 > 315, (
        f"Phase 1 stuck heading should be ~0° (north), got {avg_p1:.1f}°"
    )

    # Phase 2: heading should be stuck near 90° (east) — freshly captured.
    # With the bug, this would still be ~0° (old stuck value).
    avg_p2 = _normalize_heading(heading_values["phase2"][0])
    assert 45 < avg_p2 < 135, (
        f"Phase 2 stuck heading should be ~90° (east), got {avg_p2:.1f}°. "
        f"If near 0° the stuck value was not reset on stop."
    )
