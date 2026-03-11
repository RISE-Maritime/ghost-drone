"""
End-to-end test: remote control via zenoh.

Verifies SPEC behavior:
- A drone can be remote-controlled: movement commands sent via zenoh
  override autonomous navigation.
"""

import json
import math
import time
import threading

import pytest
import zenoh

from ghost_drone.config import AppConfig
from ghost_drone.server import start_simulator

# Non-standard port to avoid colliding with a real zenoh instance.
_ROUTER_ENDPOINT = "tcp/127.0.0.1:17447"

# Two waypoints forming a north-east route (~30-40° heading).
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


def test_remote_move_overrides_autonomous_heading(zenoh_router):
    """
    Sending a move command via zenoh overrides autonomous navigation.
    The drone's heading should converge toward the commanded heading (180°/south)
    instead of following the NE route (~30-40°).

    SPEC: "A drone can be remote-controlled: movement commands sent via zenoh
           override autonomous navigation."
    """
    cfg = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm="ghost-drone",
        entity_id="sim001",
    )

    # Collect sim_frame headings in each phase
    headings_autonomous: list[float] = []
    headings_remote: list[float] = []
    phase = [None]  # "autonomous" | "remote" | None
    lock = threading.Lock()

    client_session = _make_client_session()

    def on_sample(sample):
        key = str(sample.key_expr)
        if "sim_frame" not in key:
            return
        try:
            frame = json.loads(bytes(sample.payload))
            heading = frame["heading"]
        except Exception:
            return
        with lock:
            if phase[0] == "autonomous":
                headings_autonomous.append(heading)
            elif phase[0] == "remote":
                headings_remote.append(heading)

    subscriber = client_session.declare_subscriber("ghost-drone/@v0/**", on_sample)

    try:
        with start_simulator(cfg) as handle:
            _wait_for_publisher(handle)
            _start_playing(client_session)

            # Phase 1: Let autonomous navigation establish heading (NE route)
            time.sleep(3.0)  # heading lag needs time to converge
            phase[0] = "autonomous"
            time.sleep(2.0)
            phase[0] = None

            # Phase 2: Send remote move command — heading 180° (due south)
            client_session.put(
                f"{_PREFIX}/control/move",
                json.dumps({"heading_deg": 180.0}).encode(),
            )

            # Wait for heading to converge toward 180°
            time.sleep(5.0)
            phase[0] = "remote"
            time.sleep(2.0)
            phase[0] = None

            client_session.put(f"{_PREFIX}/control/stop", "")
            time.sleep(0.2)
    finally:
        subscriber.undeclare()
        client_session.close()

    # --- Assertions ---

    # Autonomous phase: heading should be NE-ish (< 90°)
    assert len(headings_autonomous) >= 10, (
        f"Expected >=10 sim_frame headings during autonomous, got {len(headings_autonomous)}"
    )
    avg_auto = sum(headings_autonomous) / len(headings_autonomous)
    assert avg_auto < 90, (
        f"Autonomous heading should be NE (<90°), got avg={avg_auto:.1f}°"
    )

    # Remote phase: heading should have shifted toward 180° (south)
    assert len(headings_remote) >= 10, (
        f"Expected >=10 sim_frame headings during remote, got {len(headings_remote)}"
    )
    avg_remote = sum(headings_remote) / len(headings_remote)
    assert avg_remote > 120, (
        f"Remote heading should trend toward 180° (>120°), got avg={avg_remote:.1f}°"
    )
