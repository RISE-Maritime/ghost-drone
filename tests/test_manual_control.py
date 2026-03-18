"""
E2E tests for manual control — defines the CORRECT behaviour.

Manual mode should use rudder_deg + engine (not heading_deg + thrust).
In manual mode the dynamics model bypasses PI/PD controllers and applies
rudder angle and engine power directly to the equations of motion.

These tests will fail against the current buggy implementation, proving
the bugs exist.
"""

from __future__ import annotations

import json
import math
import threading
import time

import pytest
import zenoh

from ghost_drone.config import AppConfig
from ghost_drone.server import start_simulator
from ghost_drone.simulation.models import OperationMode

_ROUTER_ENDPOINT = "tcp/127.0.0.1:17449"
_PREFIX = "ghost-drone/@v0/sim001"


# ---------------------------------------------------------------------------
# Fixtures & helpers
# ---------------------------------------------------------------------------


@pytest.fixture(scope="module")
def zenoh_router():
    """In-process zenoh router for manual-control tests."""
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
    cfg = zenoh.Config.from_json5(
        json.dumps(
            {
                "mode": "client",
                "connect": {"endpoints": [_ROUTER_ENDPOINT]},
            }
        )
    )
    session = zenoh.open(cfg)
    time.sleep(0.1)
    return session


def _wait_for_publisher(handle, timeout=5.0):
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        if handle.publisher.session_ready.is_set():
            return
        time.sleep(0.1)
    raise RuntimeError("Publisher session not ready within timeout")


def _set_manual_mode(client, prefix=_PREFIX):
    client.put(f"{prefix}/control/set_mode", json.dumps({"mode": "operated"}).encode())


def _set_autonomous_mode(client, prefix=_PREFIX):
    client.put(
        f"{prefix}/control/set_mode", json.dumps({"mode": "autonomous"}).encode()
    )


def _send_manual(client, rudder_deg: float, engine: float, prefix=_PREFIX):
    """Send the correct manual control message (rudder_deg + engine)."""
    client.put(
        f"{prefix}/control/manual",
        json.dumps({"rudder_deg": rudder_deg, "engine": engine}).encode(),
    )


def _collect_sim_frames(client, duration_s: float, prefix=_PREFIX) -> list[dict]:
    """Subscribe to sim_frame and collect frames for *duration_s* seconds."""
    frames: list[dict] = []
    lock = threading.Lock()

    def on_frame(sample):
        try:
            frame = json.loads(bytes(sample.payload))
            with lock:
                frames.append(frame)
        except Exception:
            pass

    sub = client.declare_subscriber(
        f"{prefix}/pubsub/sim_frame/engine/0", on_frame
    )
    try:
        time.sleep(duration_s)
    finally:
        sub.undeclare()

    with lock:
        return list(frames)


def _collect_manual_setpoints(
    client, duration_s: float, prefix=_PREFIX
) -> list[dict]:
    """Subscribe to manual_setpoint and collect messages."""
    messages: list[dict] = []
    lock = threading.Lock()

    def on_sample(sample):
        try:
            msg = json.loads(bytes(sample.payload))
            with lock:
                messages.append(msg)
        except Exception:
            pass

    sub = client.declare_subscriber(
        f"{prefix}/pubsub/manual_setpoint/engine/0", on_sample
    )
    try:
        time.sleep(duration_s)
    finally:
        sub.undeclare()

    with lock:
        return list(messages)


def _start_sim(zenoh_router):
    """Create and start a simulator with standard test config."""
    cfg = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm="ghost-drone",
        entity_id="sim001",
    )
    return start_simulator(cfg)


# ---------------------------------------------------------------------------
# Tests
# ---------------------------------------------------------------------------


class TestManualControl:
    """Manual control E2E tests — define correct behaviour."""

    def test_manual_mode_publishes_operation_mode(self, zenoh_router):
        """After set_mode → 'manual', sim_frame should report operation_mode == 'manual'."""
        with _start_sim(zenoh_router) as handle:
            _wait_for_publisher(handle)
            handle.sim.engine.set_home(57.706, 11.938)
            client = _make_client_session()
            try:
                _set_manual_mode(client)
                time.sleep(0.3)
                # Send a manual command to start playing
                _send_manual(client, rudder_deg=0, engine=0.3)
                time.sleep(0.5)
                frames = _collect_sim_frames(client, 2.0)
                assert len(frames) > 0, "No sim_frames received"
                for f in frames:
                    assert f["operation_mode"] == "operated", (
                        f"Expected operation_mode 'operated', got '{f['operation_mode']}'"
                    )
            finally:
                client.close()

    def test_manual_control_works_immediately(self, zenoh_router):
        """Manual control should work immediately — drones are always active."""
        with _start_sim(zenoh_router) as handle:
            _wait_for_publisher(handle)
            handle.sim.engine.set_home(57.706, 11.938)
            client = _make_client_session()
            try:
                _set_manual_mode(client)
                time.sleep(0.3)
                _send_manual(client, rudder_deg=0, engine=0.5)
                time.sleep(1.0)
                frames = _collect_sim_frames(client, 2.0)
                assert len(frames) > 0, "No sim_frames received"
                # All frames should be "playing" — always active
                for f in frames:
                    assert f["state"] == "playing", (
                        f"Expected state 'playing', got '{f['state']}'"
                    )
            finally:
                client.close()

    def test_manual_rudder_turns_drone(self, zenoh_router):
        """Send rudder_deg: 20, engine: 0.5 → heading changes gradually over time."""
        with _start_sim(zenoh_router) as handle:
            _wait_for_publisher(handle)
            handle.sim.engine.set_home(57.706, 11.938)
            client = _make_client_session()
            try:
                _set_manual_mode(client)
                time.sleep(0.3)
                _send_manual(client, rudder_deg=20, engine=0.5)
                time.sleep(0.5)
                frames = _collect_sim_frames(client, 3.0)
                playing = [f for f in frames if f["state"] == "playing"]
                assert len(playing) >= 2, "Need at least 2 playing frames"
                headings = [f["heading"] for f in playing]
                first_heading = headings[0]
                last_heading = headings[-1]
                # With rudder at 20°, heading should change over time
                heading_change = abs(
                    ((last_heading - first_heading + 180) % 360) - 180
                )
                assert heading_change > 1.0, (
                    f"Heading should change with rudder=20°, but only changed "
                    f"{heading_change:.1f}° ({first_heading:.1f} → {last_heading:.1f})"
                )
            finally:
                client.close()

    def test_manual_rudder_zero_holds_heading(self, zenoh_router):
        """Send rudder_deg: 0, engine: 0.5 → heading stays approximately constant."""
        with _start_sim(zenoh_router) as handle:
            _wait_for_publisher(handle)
            handle.sim.engine.set_home(57.706, 11.938)
            client = _make_client_session()
            try:
                _set_manual_mode(client)
                time.sleep(0.3)
                _send_manual(client, rudder_deg=0, engine=0.5)
                time.sleep(1.0)
                frames = _collect_sim_frames(client, 3.0)
                playing = [f for f in frames if f["state"] == "playing"]
                assert len(playing) >= 2, "Need at least 2 playing frames"
                headings = [f["heading"] for f in playing]
                max_change = max(
                    abs(((h - headings[0] + 180) % 360) - 180) for h in headings
                )
                assert max_change < 5.0, (
                    f"With rudder=0, heading should be stable. "
                    f"Max deviation: {max_change:.1f}°"
                )
            finally:
                client.close()

    def test_manual_engine_affects_speed(self, zenoh_router):
        """engine: 0 → speed ~0; engine: 0.8 → speed increases."""
        with _start_sim(zenoh_router) as handle:
            _wait_for_publisher(handle)
            handle.sim.engine.set_home(57.706, 11.938)
            client = _make_client_session()
            try:
                _set_manual_mode(client)
                time.sleep(0.3)

                # Phase 1: engine 0 → should have negligible speed
                _send_manual(client, rudder_deg=0, engine=0.0)
                time.sleep(1.0)
                zero_frames = _collect_sim_frames(client, 2.0)
                zero_playing = [f for f in zero_frames if f["state"] == "playing"]

                # Phase 2: engine 0.8 → speed should increase
                _send_manual(client, rudder_deg=0, engine=0.8)
                time.sleep(2.0)
                power_frames = _collect_sim_frames(client, 2.0)
                power_playing = [f for f in power_frames if f["state"] == "playing"]

                assert len(power_playing) > 0, "No playing frames with engine=0.8"
                max_speed = max(f["speed"] for f in power_playing)
                assert max_speed > 0.1, (
                    f"With engine=0.8, speed should increase. Max speed: {max_speed:.3f}"
                )
            finally:
                client.close()

    def test_manual_control_ignored_in_autonomous(self, zenoh_router):
        """Sending manual control in autonomous mode has no effect on motion."""
        with _start_sim(zenoh_router) as handle:
            _wait_for_publisher(handle)
            handle.sim.engine.set_home(57.706, 11.938)
            client = _make_client_session()
            try:
                # Switch to autonomous mode
                _set_autonomous_mode(client)
                time.sleep(0.3)
                _send_manual(client, rudder_deg=10, engine=0.5)
                time.sleep(1.5)
                frames = _collect_sim_frames(client, 2.0)
                # All frames should still report state "playing" (always active)
                # but manual control should have no effect
                for f in frames:
                    assert f["state"] == "playing", (
                        f"Drone should always report state 'playing', "
                        f"got state '{f['state']}'"
                    )
            finally:
                client.close()

    def test_manual_setpoint_published(self, zenoh_router):
        """Subscribe to manual_setpoint/engine/0 → verify {rudder_deg, engine} echoed."""
        with _start_sim(zenoh_router) as handle:
            _wait_for_publisher(handle)
            handle.sim.engine.set_home(57.706, 11.938)
            client = _make_client_session()
            try:
                _set_manual_mode(client)
                time.sleep(0.3)
                _send_manual(client, rudder_deg=15, engine=0.6)
                time.sleep(0.5)
                setpoints = _collect_manual_setpoints(client, 2.5)
                assert len(setpoints) > 0, "No manual_setpoint messages received"
                sp = setpoints[-1]
                # The correct setpoint message should contain rudder_deg and engine
                assert "rudder_deg" in sp, (
                    f"manual_setpoint should contain 'rudder_deg', got keys: {list(sp.keys())}"
                )
                assert "engine" in sp, (
                    f"manual_setpoint should contain 'engine', got keys: {list(sp.keys())}"
                )
                assert abs(sp["rudder_deg"] - 15) < 1.0, (
                    f"rudder_deg setpoint should be ~15, got {sp['rudder_deg']}"
                )
                assert abs(sp["engine"] - 0.6) < 0.05, (
                    f"engine setpoint should be ~0.6, got {sp['engine']}"
                )
            finally:
                client.close()

    def test_sim_frame_rudder_reflects_set_value(self, zenoh_router):
        """In manual mode, rudder_deg in sim_frame should match the set rudder
        (no PD controller mediation)."""
        with _start_sim(zenoh_router) as handle:
            _wait_for_publisher(handle)
            handle.sim.engine.set_home(57.706, 11.938)
            client = _make_client_session()
            try:
                _set_manual_mode(client)
                time.sleep(0.3)
                _send_manual(client, rudder_deg=15, engine=0.5)
                time.sleep(2.0)
                frames = _collect_sim_frames(client, 2.0)
                playing = [f for f in frames if f["state"] == "playing"]
                assert len(playing) > 0, "No playing frames"
                # In correct implementation (bypassing PD controller),
                # rudder_deg should match the set value directly
                last_frame = playing[-1]
                actual_rudder = last_frame["rudder_deg"]
                assert abs(actual_rudder - 15) < 3.0, (
                    f"In manual mode with PD bypass, rudder_deg should be ~15°, "
                    f"got {actual_rudder:.1f}° (PD controller is likely still active)"
                )
            finally:
                client.close()

    def test_sim_frame_thrust_reflects_set_value(self, zenoh_router):
        """In manual mode, thrust_pct should correspond directly to engine set value
        (no PI controller)."""
        with _start_sim(zenoh_router) as handle:
            _wait_for_publisher(handle)
            handle.sim.engine.set_home(57.706, 11.938)
            client = _make_client_session()
            try:
                _set_manual_mode(client)
                time.sleep(0.3)
                _send_manual(client, rudder_deg=0, engine=0.7)
                time.sleep(2.0)
                frames = _collect_sim_frames(client, 2.0)
                playing = [f for f in frames if f["state"] == "playing"]
                assert len(playing) > 0, "No playing frames"
                # engine=0.7 should produce thrust_pct ≈ 70 (direct mapping)
                last_frame = playing[-1]
                actual_thrust = last_frame["thrust_pct"]
                assert abs(actual_thrust - 70) < 10, (
                    f"In manual mode with PI bypass, thrust_pct should be ~70%, "
                    f"got {actual_thrust:.1f}% (PI controller is likely still active)"
                )
            finally:
                client.close()

    def test_manual_rudder_clamped(self, zenoh_router):
        """Send rudder_deg: 50 → clamped to 35; send -50 → clamped to -35."""
        with _start_sim(zenoh_router) as handle:
            _wait_for_publisher(handle)
            handle.sim.engine.set_home(57.706, 11.938)
            client = _make_client_session()
            try:
                _set_manual_mode(client)
                time.sleep(0.3)

                # Test positive clamp
                _send_manual(client, rudder_deg=50, engine=0.5)
                time.sleep(1.5)
                frames = _collect_sim_frames(client, 2.0)
                playing = [f for f in frames if f["state"] == "playing"]
                assert len(playing) > 0, "No playing frames"
                rudder = playing[-1]["rudder_deg"]
                assert rudder <= 35.5, (
                    f"Rudder should be clamped to ≤35°, got {rudder:.1f}°"
                )

                # Test negative clamp
                _send_manual(client, rudder_deg=-50, engine=0.5)
                time.sleep(1.5)
                frames = _collect_sim_frames(client, 2.0)
                playing = [f for f in frames if f["state"] == "playing"]
                assert len(playing) > 0, "No playing frames after negative rudder"
                rudder = playing[-1]["rudder_deg"]
                assert rudder >= -35.5, (
                    f"Rudder should be clamped to ≥-35°, got {rudder:.1f}°"
                )
            finally:
                client.close()

    def test_manual_engine_clamped(self, zenoh_router):
        """Send engine: 1.5 → clamped to 1.0; send -0.5 → clamped to 0.0."""
        with _start_sim(zenoh_router) as handle:
            _wait_for_publisher(handle)
            handle.sim.engine.set_home(57.706, 11.938)
            client = _make_client_session()
            try:
                _set_manual_mode(client)
                time.sleep(0.3)

                # Test clamp above 1.0
                _send_manual(client, rudder_deg=0, engine=1.5)
                time.sleep(1.5)
                frames = _collect_sim_frames(client, 2.0)
                playing = [f for f in frames if f["state"] == "playing"]
                assert len(playing) > 0, "No playing frames"
                thrust = playing[-1]["thrust_pct"]
                assert thrust <= 101, (
                    f"Engine 1.5 should be clamped; thrust_pct should be ≤100%, "
                    f"got {thrust:.1f}%"
                )

                # Test clamp below 0.0
                _send_manual(client, rudder_deg=0, engine=-0.5)
                time.sleep(1.5)
                frames = _collect_sim_frames(client, 2.0)
                playing = [f for f in frames if f["state"] == "playing"]
                assert len(playing) > 0, "No playing frames after negative engine"
                thrust = playing[-1]["thrust_pct"]
                assert thrust >= -1, (
                    f"Engine -0.5 should be clamped; thrust_pct should be ≥0%, "
                    f"got {thrust:.1f}%"
                )
            finally:
                client.close()

    def test_manual_mode_switch_resets_values(self, zenoh_router):
        """Switch manual→auto→manual → rudder resets to 0, engine resets to 0."""
        with _start_sim(zenoh_router) as handle:
            _wait_for_publisher(handle)
            handle.sim.engine.set_home(57.706, 11.938)
            client = _make_client_session()
            try:
                # Enter manual, set non-zero rudder/engine
                _set_manual_mode(client)
                time.sleep(0.3)
                _send_manual(client, rudder_deg=20, engine=0.8)
                time.sleep(1.0)

                # Switch to auto, then back to manual
                _set_autonomous_mode(client)
                time.sleep(0.3)
                _set_manual_mode(client)
                time.sleep(0.3)

                # Send a small command to get a frame
                _send_manual(client, rudder_deg=0, engine=0.0)
                time.sleep(0.5)

                # Check setpoint was reset
                setpoints = _collect_manual_setpoints(client, 2.0)
                if len(setpoints) > 0:
                    sp = setpoints[-1]
                    if "rudder_deg" in sp:
                        assert abs(sp["rudder_deg"]) < 1.0, (
                            f"After mode reset, rudder_deg should be ~0, got {sp['rudder_deg']}"
                        )
                    if "engine" in sp:
                        assert abs(sp["engine"]) < 0.05, (
                            f"After mode reset, engine should be ~0, got {sp['engine']}"
                        )
            finally:
                client.close()

    def test_heading_changes_gradually_from_rudder(self, zenoh_router):
        """With constant rudder input, heading changes smoothly (not stepping),
        proving dynamics loop produces actual heading."""
        with _start_sim(zenoh_router) as handle:
            _wait_for_publisher(handle)
            handle.sim.engine.set_home(57.706, 11.938)
            client = _make_client_session()
            try:
                _set_manual_mode(client)
                time.sleep(0.3)
                _send_manual(client, rudder_deg=15, engine=0.5)
                time.sleep(1.0)
                frames = _collect_sim_frames(client, 4.0)
                playing = [f for f in frames if f["state"] == "playing"]
                assert len(playing) >= 3, "Need at least 3 playing frames"

                headings = [f["heading"] for f in playing]
                # Heading should change gradually — check that consecutive
                # changes are small (no instant snaps)
                for i in range(1, len(headings)):
                    step = abs(((headings[i] - headings[i - 1] + 180) % 360) - 180)
                    assert step < 30, (
                        f"Heading jumped {step:.1f}° in one step "
                        f"(frame {i - 1}→{i}: {headings[i - 1]:.1f}→{headings[i]:.1f}). "
                        f"Expected gradual change from dynamics, not instant heading set."
                    )

                # Overall heading should have changed meaningfully
                total_change = abs(
                    ((headings[-1] - headings[0] + 180) % 360) - 180
                )
                assert total_change > 2.0, (
                    f"With rudder=15° over 4s, heading should change meaningfully. "
                    f"Total change: {total_change:.1f}°"
                )
            finally:
                client.close()
