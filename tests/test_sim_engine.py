"""
Deterministic unit tests for the SimEngine simulation state machine.

Tests verify: state transitions, heading lag convergence, route advancement,
stop/reset behaviour, and the module-level helper functions (_bearing,
_angle_diff, _haversine_m).
"""

import pytest

from ghost_drone.simulation.engine import (
    SimEngine,
    _bearing,
    _angle_diff,
    _haversine_m,
)
from ghost_drone.simulation.models import SimState


# ---------------------------------------------------------------------------
# State-transition tests
# ---------------------------------------------------------------------------


def test_load_route_sets_stopped_state():
    """load_route should always end with engine in STOPPED state."""
    engine = SimEngine()
    engine.load_route([(57.0, 11.0), (57.01, 11.01)])
    assert engine.state == SimState.STOPPED


def test_load_route_too_few_waypoints_raises():
    """load_route with a single waypoint should raise ValueError."""
    engine = SimEngine()
    with pytest.raises(ValueError):
        engine.load_route([(57.0, 11.0)])


def test_play_transitions_to_playing():
    """play() should transition engine from STOPPED to PLAYING."""
    engine = SimEngine()
    engine.load_route([(57.0, 11.0), (57.01, 11.01)])
    engine.play()
    assert engine.state == SimState.PLAYING


def test_pause_freezes_position():
    """pause() should freeze drone — subsequent ticks should return PAUSED frames.

    Speed may include a small Gaussian noise component even when paused, but
    it should be within the noise sigma (SPEED_NOISE_SIGMA_MPS = 0.05 m/s).
    We verify state is PAUSED and speed is near zero (< 0.5 m/s, well within noise).
    """
    from ghost_drone.simulation.engine import SPEED_NOISE_SIGMA_MPS

    engine = SimEngine()
    engine.load_route([(57.0, 11.0), (57.01, 11.01)])
    engine.play()

    # Advance a bit so the drone has moved
    for _ in range(20):
        engine.tick(0.05)

    engine.pause()

    frame_a = engine.tick(0.05)
    frame_b = engine.tick(0.05)

    assert frame_a.state == SimState.PAUSED
    assert frame_b.state == SimState.PAUSED
    # Speed is noise-only (no cruise component) — must be close to zero
    assert frame_a.speed < SPEED_NOISE_SIGMA_MPS * 10
    assert frame_b.speed < SPEED_NOISE_SIGMA_MPS * 10


def test_stop_resets_to_first_waypoint():
    """stop() should reset internal position to the first waypoint."""
    engine = SimEngine()
    engine.load_route([(57.0, 11.0), (57.01, 11.01)])
    engine.play()

    # Advance drone well into the route
    for _ in range(50):
        engine.tick(0.05)

    engine.stop()

    assert engine._lat == pytest.approx(57.0, abs=1e-9)
    assert engine._lng == pytest.approx(11.0, abs=1e-9)


# ---------------------------------------------------------------------------
# Convergence / physics tests
# ---------------------------------------------------------------------------


def test_heading_lag_converges():
    """After many ticks on a pure-east route the heading should converge to ~90 degrees."""
    engine = SimEngine()
    # Pure-east route: constant latitude, increasing longitude
    engine.load_route([(57.0, 11.0), (57.0, 11.1)])
    engine.play()

    for _ in range(200):
        engine.tick(0.05)

    # Internal heading (no noise) should be within 5 degrees of east
    assert abs(_angle_diff(90.0, engine._heading)) < 5.0


def test_route_completes_auto_stops():
    """A very short route at high speed should auto-stop on completion."""
    engine = SimEngine()
    # Tiny segment — will be consumed very quickly at cruise_speed=100 m/s
    engine.load_route([(57.0, 11.0), (57.000001, 11.000001)])
    engine.play()

    for _ in range(500):
        engine.tick(0.05, cruise_speed_mps=100.0)

    assert engine.state == SimState.STOPPED


# ---------------------------------------------------------------------------
# Helper-function unit tests
# ---------------------------------------------------------------------------


def test_bearing_helper_east():
    """_bearing from origin heading east should return ~90 degrees."""
    result = _bearing(0, 0, 0, 1)
    assert abs(result - 90.0) < 1.0


def test_angle_diff_wraps_correctly():
    """_angle_diff should compute the shortest signed arc, crossing the 0/360 boundary."""
    assert _angle_diff(10, 350) == pytest.approx(20.0, abs=1e-9)
    assert _angle_diff(350, 10) == pytest.approx(-20.0, abs=1e-9)


def test_haversine_known_distance():
    """_haversine_m for 1 degree of longitude at equator should be ~111,195 m."""
    result = _haversine_m(0, 0, 0, 1)
    assert abs(result - 111_195) < 500
