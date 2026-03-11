"""
End-to-end test: sim_frame includes entity_health information.

Verifies SPEC behaviors:
- The UI displays each drone's entity_health status (nominal/degraded/critical/inactive).
- The UI shows per-subsystem health breakdown (position, heading, speed).
- Health display updates live as the drone state or faults change.

The frontend consumes sim_frame JSON for rendering.  For the UI to display
health, sim_frame must carry health data (level + per-subsystem breakdown).
"""

import json
import time
import threading

import pytest
import zenoh

from ghost_drone.config import AppConfig
from ghost_drone.server import start_simulator

_ROUTER_ENDPOINT = "tcp/127.0.0.1:17447"
_ROUTE = [[57.7069, 11.9381], [57.7200, 11.9500]]
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


def test_sim_frame_includes_health_when_playing(zenoh_router):
    """
    While playing, sim_frame must include a 'health' object with:
      - 'level': one of 'nominal', 'degraded', 'critical', 'inactive'
      - 'subsystems': list of {name, level, detail} for position/heading/speed
    """
    cfg = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm="ghost-drone",
        entity_id="sim001",
    )

    frames: list[dict] = []
    lock = threading.Lock()

    client_session = _make_client_session()

    def on_frame(sample):
        try:
            frame = json.loads(bytes(sample.payload))
            with lock:
                frames.append(frame)
        except Exception:
            pass

    subscriber = client_session.declare_subscriber(
        f"{_PREFIX}/pubsub/sim_frame/engine/0", on_frame
    )

    try:
        with start_simulator(cfg) as handle:
            _wait_for_publisher(handle)

            # Load route and play
            replies = client_session.get(
                f"{_PREFIX}/service/load_route",
                payload=json.dumps({"waypoints": _ROUTE}).encode(),
                timeout=5,
            )
            for reply in replies:
                pass

            client_session.put(f"{_PREFIX}/control/play", "")
            time.sleep(1.5)
            client_session.put(f"{_PREFIX}/control/stop", "")
            time.sleep(0.2)
    finally:
        subscriber.undeclare()
        client_session.close()

    playing_frames = [f for f in frames if f.get("state") == "playing"]
    assert len(playing_frames) >= 5, f"Expected >=5 playing frames, got {len(playing_frames)}"

    # Every playing frame must contain health info
    for f in playing_frames[:5]:
        assert "health" in f, f"sim_frame missing 'health' field: {f.keys()}"
        health = f["health"]
        assert "level" in health, f"health missing 'level': {health}"
        assert health["level"] == "nominal", f"Expected nominal health, got {health['level']}"
        assert "subsystems" in health, f"health missing 'subsystems': {health}"

        subs = health["subsystems"]
        sub_names = {s["name"] for s in subs}
        assert {"position", "heading", "speed"} == sub_names, f"Unexpected subsystems: {sub_names}"
        for s in subs:
            assert s["level"] == "nominal", f"Subsystem {s['name']} not nominal: {s['level']}"


def test_sim_frame_health_reflects_faults(zenoh_router):
    """
    When a fault is active, the health in sim_frame must reflect it.
    Injecting a 'drop' fault on heading should make the heading subsystem CRITICAL.
    """
    cfg = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm="ghost-drone",
        entity_id="sim001",
    )

    frames: list[dict] = []
    lock = threading.Lock()
    phase = [None]  # mutable reference: 'before_fault', 'during_fault', 'after_clear'

    client_session = _make_client_session()

    def on_frame(sample):
        try:
            frame = json.loads(bytes(sample.payload))
            with lock:
                if phase[0] is not None:
                    frame["_phase"] = phase[0]
                    frames.append(frame)
        except Exception:
            pass

    subscriber = client_session.declare_subscriber(
        f"{_PREFIX}/pubsub/sim_frame/engine/0", on_frame
    )

    try:
        with start_simulator(cfg) as handle:
            _wait_for_publisher(handle)

            replies = client_session.get(
                f"{_PREFIX}/service/load_route",
                payload=json.dumps({"waypoints": _ROUTE}).encode(),
                timeout=5,
            )
            for reply in replies:
                pass

            client_session.put(f"{_PREFIX}/control/play", "")
            time.sleep(1.0)

            # Phase 1: collect frames before fault
            with lock:
                phase[0] = "before_fault"
            time.sleep(0.5)

            # Inject drop fault on heading
            with lock:
                phase[0] = None
            _inject_fault(client_session, "heading_true_north_deg", "drop")

            # Phase 2: collect frames during fault
            with lock:
                phase[0] = "during_fault"
            time.sleep(0.5)

            # Clear fault
            with lock:
                phase[0] = None
            _clear_fault(client_session, "heading_true_north_deg", "drop")

            # Phase 3: collect frames after clearing
            with lock:
                phase[0] = "after_clear"
            time.sleep(0.5)

            client_session.put(f"{_PREFIX}/control/stop", "")
            time.sleep(0.2)
    finally:
        subscriber.undeclare()
        client_session.close()

    # Check frames during fault: heading subsystem should be critical
    fault_frames = [f for f in frames if f.get("_phase") == "during_fault" and f.get("state") == "playing"]
    assert len(fault_frames) >= 3, f"Expected >=3 fault frames, got {len(fault_frames)}"

    for f in fault_frames[:3]:
        assert "health" in f, "sim_frame missing 'health' during fault"
        health = f["health"]
        heading_sub = next((s for s in health["subsystems"] if s["name"] == "heading"), None)
        assert heading_sub is not None, "Missing heading subsystem"
        assert heading_sub["level"] == "critical", f"Expected critical, got {heading_sub['level']}"

    # Check overall health is degraded or critical (not nominal)
    for f in fault_frames[:3]:
        assert f["health"]["level"] in ("degraded", "critical"), \
            f"Expected degraded/critical overall, got {f['health']['level']}"

    # After clearing: heading should be back to nominal
    clear_frames = [f for f in frames if f.get("_phase") == "after_clear" and f.get("state") == "playing"]
    assert len(clear_frames) >= 3, f"Expected >=3 clear frames, got {len(clear_frames)}"
    for f in clear_frames[:3]:
        heading_sub = next((s for s in f["health"]["subsystems"] if s["name"] == "heading"), None)
        assert heading_sub["level"] == "nominal", f"Expected nominal after clear, got {heading_sub['level']}"


def test_sim_frame_health_inactive_when_stopped(zenoh_router):
    """
    When stopped, sim_frame health level should be 'inactive'.
    """
    cfg = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm="ghost-drone",
        entity_id="sim001",
    )

    frames: list[dict] = []
    lock = threading.Lock()

    client_session = _make_client_session()

    def on_frame(sample):
        try:
            frame = json.loads(bytes(sample.payload))
            with lock:
                frames.append(frame)
        except Exception:
            pass

    subscriber = client_session.declare_subscriber(
        f"{_PREFIX}/pubsub/sim_frame/engine/0", on_frame
    )

    try:
        with start_simulator(cfg) as handle:
            _wait_for_publisher(handle)
            # Stay stopped, just collect frames
            time.sleep(1.0)
    finally:
        subscriber.undeclare()
        client_session.close()

    stopped_frames = [f for f in frames if f.get("state") == "stopped"]
    assert len(stopped_frames) >= 5, f"Expected >=5 stopped frames, got {len(stopped_frames)}"

    for f in stopped_frames[:5]:
        assert "health" in f, f"sim_frame missing 'health' when stopped: {f.keys()}"
        assert f["health"]["level"] == "inactive", \
            f"Expected inactive health when stopped, got {f['health']['level']}"
