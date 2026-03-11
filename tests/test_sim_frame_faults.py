"""
End-to-end test: sim_frame includes active fault state.

Verifies SPEC behavior:
- sim_frame exposes current fault state so the browser UI can display
  fault injection toggles reactively.
- Faults are controllable via zenoh queryable and reflected in sim_frame.
"""

import json
import time
import threading

import pytest
import zenoh

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


def test_sim_frame_includes_faults_field(zenoh_router):
    """
    sim_frame should include a 'faults' field showing the active fault state
    so the browser UI can display fault injection toggles reactively.
    """
    cfg = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm="ghost-drone",
        entity_id="sim001",
    )

    frames_no_fault: list[dict] = []
    frames_with_fault: list[dict] = []
    frames_cleared: list[dict] = []
    active_list = [None]
    lock = threading.Lock()

    client_session = _make_client_session()

    def on_frame(sample):
        key = str(sample.key_expr)
        if "sim_frame" not in key:
            return
        try:
            frame = json.loads(bytes(sample.payload))
        except Exception:
            return
        with lock:
            target = active_list[0]
            if target is not None:
                target.append(frame)

    subscriber = client_session.declare_subscriber("ghost-drone/@v0/**", on_frame)

    try:
        with start_simulator(cfg) as handle:
            _wait_for_publisher(handle)
            _start_playing(client_session)

            # Phase 1: No faults active — sim_frame should have empty faults
            time.sleep(1.0)
            active_list[0] = frames_no_fault
            time.sleep(1.0)
            active_list[0] = None

            # Phase 2: Inject a fault — sim_frame should reflect it
            result = _inject_fault(client_session, "heading_true_north_deg", "stuck")
            assert result is not None and result["ok"] is True

            time.sleep(0.5)
            active_list[0] = frames_with_fault
            time.sleep(1.0)
            active_list[0] = None

            # Phase 3: Clear the fault — sim_frame should show no faults
            result = _clear_fault(client_session, "heading_true_north_deg", "stuck")
            assert result is not None and result["ok"] is True

            time.sleep(0.5)
            active_list[0] = frames_cleared
            time.sleep(1.0)
            active_list[0] = None

            client_session.put(f"{_PREFIX}/control/stop", "")
            time.sleep(0.2)
    finally:
        subscriber.undeclare()
        client_session.close()

    # --- Assertions ---

    # sim_frame must include a 'faults' field
    assert len(frames_no_fault) >= 5, (
        f"Expected >=5 sim_frames without fault, got {len(frames_no_fault)}"
    )
    sample = frames_no_fault[-1]
    assert "faults" in sample, (
        f"sim_frame should include 'faults' field, got keys: {list(sample.keys())}"
    )

    # Without faults: faults dict should be empty or have empty lists
    faults_clean = sample["faults"]
    assert isinstance(faults_clean, dict), (
        f"faults should be a dict, got {type(faults_clean)}"
    )
    # All values should be empty lists (no active faults)
    for subject, fault_list in faults_clean.items():
        assert fault_list == [], (
            f"No faults should be active, but {subject} has {fault_list}"
        )

    # With fault: heading_true_north_deg should show 'stuck'
    assert len(frames_with_fault) >= 5, (
        f"Expected >=5 sim_frames during fault, got {len(frames_with_fault)}"
    )
    faults_active = frames_with_fault[-1]["faults"]
    assert "stuck" in faults_active.get("heading_true_north_deg", []), (
        f"Expected 'stuck' in heading faults, got {faults_active}"
    )

    # After clearing: heading should have no faults again
    assert len(frames_cleared) >= 5, (
        f"Expected >=5 sim_frames after clearing, got {len(frames_cleared)}"
    )
    faults_after = frames_cleared[-1]["faults"]
    assert "stuck" not in faults_after.get("heading_true_north_deg", []), (
        f"Expected no 'stuck' fault after clearing, got {faults_after}"
    )
