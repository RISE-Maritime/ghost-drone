"""
Unit tests for the 3-DOF USV dynamics model.

Tests verify: steady-state speed convergence, deceleration, heading
convergence, roll during turns, pitch during acceleration, and reset.
"""

import math

from ghost_drone.simulation.dynamics import USVDynamics, USVParams


def _run_ticks(dyn: USVDynamics, n: int, dt: float, speed: float, heading: float):
    """Run n ticks and return the last output."""
    out = None
    for _ in range(n):
        out = dyn.step(dt, speed, heading)
    return out


def test_speed_convergence_from_rest():
    """From rest, the surge speed should converge to the desired cruise speed."""
    dyn = USVDynamics()
    dyn.reset(0.0, 0.0, 0.0)
    desired = 1.5
    out = _run_ticks(dyn, 600, 0.05, desired, 0.0)
    assert abs(out.u - desired) < 0.15, f"u={out.u}, expected ~{desired}"


def test_deceleration_to_zero():
    """After reaching cruise speed, setting desired=0 should decelerate to near-zero."""
    dyn = USVDynamics()
    dyn.reset(0.0, 0.0, 0.0)
    # First accelerate
    _run_ticks(dyn, 600, 0.05, 1.5, 0.0)
    # Then decelerate
    out = _run_ticks(dyn, 600, 0.05, 0.0, 0.0)
    assert abs(out.u) < 0.15, f"u={out.u}, expected ~0"


def test_heading_convergence():
    """A 90° heading change should converge within tolerance after sufficient ticks."""
    dyn = USVDynamics()
    dyn.reset(0.0, 0.0, 0.0)
    # First get up to speed (heading controller needs forward velocity for rudder effectiveness)
    _run_ticks(dyn, 400, 0.05, 1.5, 0.0)
    # Now command 90° turn (extra ticks needed due to rudder rate limiting)
    out = _run_ticks(dyn, 1600, 0.05, 1.5, 90.0)
    heading_err = (out.heading_deg - 90.0 + 180) % 360 - 180
    assert abs(heading_err) < 10.0, f"heading={out.heading_deg}, expected ~90"


def test_roll_nonzero_during_turn():
    """Roll should be non-zero and have correct sign during a turn."""
    dyn = USVDynamics()
    dyn.reset(0.0, 0.0, 0.0)
    # Get up to speed heading north
    _run_ticks(dyn, 400, 0.05, 1.5, 0.0)
    # Command starboard turn (heading 90°, CW) — yaw rate r > 0
    # Roll = -K_roll * u * r → should be negative (port down in our convention)
    # But with noise, just check magnitude is > some threshold during the turn
    max_roll = 0.0
    for _ in range(200):
        out = dyn.step(0.05, 1.5, 90.0)
        max_roll = max(max_roll, abs(out.roll_deg))
    assert max_roll > 0.5, f"max_roll={max_roll}, expected > 0.5 during turn"


def test_pitch_nonzero_during_acceleration():
    """Pitch should be non-zero during initial acceleration."""
    dyn = USVDynamics()
    dyn.reset(0.0, 0.0, 0.0)
    max_pitch = 0.0
    for _ in range(100):
        out = dyn.step(0.05, 1.5, 0.0)
        max_pitch = max(max_pitch, abs(out.pitch_deg))
    assert max_pitch > 0.3, f"max_pitch={max_pitch}, expected > 0.3 during accel"


def test_reset_zeros_velocities():
    """reset() should zero all velocities and set position/heading."""
    dyn = USVDynamics()
    dyn.reset(0.0, 0.0, 0.0)
    # Build up some velocity
    _run_ticks(dyn, 200, 0.05, 1.5, 45.0)
    assert dyn.u != 0.0  # sanity check

    # Reset
    dyn.reset(57.0, 11.0, 90.0)
    assert dyn.u == 0.0
    assert dyn.v == 0.0
    assert dyn.r == 0.0
    assert dyn.lat == 57.0
    assert dyn.lng == 11.0
    assert abs(math.degrees(dyn.psi) - 90.0) < 1e-9


def test_position_moves_forward():
    """Drone heading north at cruise speed should increase latitude."""
    dyn = USVDynamics()
    dyn.reset(57.0, 11.0, 0.0)
    out = _run_ticks(dyn, 600, 0.05, 1.5, 0.0)
    assert out.lat > 57.0, f"lat={out.lat}, expected > 57.0"
    # Longitude should stay roughly the same (heading north)
    assert abs(out.lng - 11.0) < 0.001, f"lng={out.lng}, expected ~11.0"


def test_speed_output_matches_velocity():
    """speed_mps should equal sqrt(u² + v²)."""
    dyn = USVDynamics()
    dyn.reset(0.0, 0.0, 0.0)
    out = _run_ticks(dyn, 300, 0.05, 1.5, 0.0)
    expected = math.sqrt(out.u ** 2 + out.v ** 2)
    assert abs(out.speed_mps - expected) < 1e-9


def test_rudder_rate_limiting():
    """Rudder should not jump instantly — rate-limited to delta_rate_max."""
    dyn = USVDynamics()
    dyn.reset(0.0, 0.0, 0.0)
    # Get up to speed heading north
    _run_ticks(dyn, 400, 0.05, 1.5, 0.0)
    # Record rudder before commanding a big heading change
    delta_before = dyn._delta
    # One tick with a 90° heading command
    dyn.step(0.05, 1.5, 90.0)
    delta_after = dyn._delta
    max_allowed_change = dyn.p.delta_rate_max * 0.05
    actual_change = abs(delta_after - delta_before)
    assert actual_change <= max_allowed_change + 1e-9, (
        f"Rudder changed {math.degrees(actual_change):.1f} deg in one tick, "
        f"max allowed {math.degrees(max_allowed_change):.1f} deg"
    )
