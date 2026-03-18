"""
Deterministic unit tests for the SimEngine simulation state machine.

Tests verify: operation mode transitions, heading lag convergence, route advancement,
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
from ghost_drone.simulation.models import OperationMode


# ---------------------------------------------------------------------------
# Operation mode transition tests
# ---------------------------------------------------------------------------


def test_load_route_stores_waypoints():
    """load_route should store waypoints for later play()."""
    engine = SimEngine()
    engine.load_route([(57.0, 11.0), (57.01, 11.01)])
    assert engine.waypoints == [(57.0, 11.0), (57.01, 11.01)]
    assert engine.operation_mode == OperationMode.OPERATED


def test_load_route_too_few_waypoints_raises():
    """load_route with a single waypoint should raise ValueError."""
    engine = SimEngine()
    with pytest.raises(ValueError):
        engine.load_route([(57.0, 11.0)])


def test_play_transitions_to_autonomous():
    """play() should switch to AUTONOMOUS mode."""
    engine = SimEngine()
    engine.load_route([(57.0, 11.0), (57.01, 11.01)])
    engine.play()
    assert engine.operation_mode == OperationMode.AUTONOMOUS


def test_stop_stays_in_place():
    """stop() should NOT teleport — drone stays at its pre-stop position."""
    engine = SimEngine()
    engine.load_route([(57.0, 11.0), (57.01, 11.01)])
    engine._lat, engine._lng = 57.0, 11.0
    engine._dynamics.reset(57.0, 11.0, 0.0)
    engine.play()

    # Advance drone well into the route
    for _ in range(50):
        engine.tick(0.05)

    pre_stop_lat = engine._lat
    pre_stop_lng = engine._lng

    engine.stop()

    # Drone should stay where it was, NOT teleport to first waypoint
    assert engine._lat == pytest.approx(pre_stop_lat, abs=1e-9)
    assert engine._lng == pytest.approx(pre_stop_lng, abs=1e-9)


def test_stop_sets_operated_mode():
    """stop() should switch mode to OPERATED."""
    engine = SimEngine()
    engine.load_route([(57.0, 11.0), (57.01, 11.01)])
    engine._lat, engine._lng = 57.0, 11.0
    engine._dynamics.reset(57.0, 11.0, 0.0)
    engine.play()

    assert engine.operation_mode == OperationMode.AUTONOMOUS

    for _ in range(20):
        engine.tick(0.05)

    engine.stop()

    assert engine.operation_mode == OperationMode.OPERATED


def test_route_completion_stays_autonomous():
    """When a route auto-completes, mode should stay AUTONOMOUS."""
    engine = SimEngine()
    # Waypoints ~5m apart — drone will reach acceptance radius quickly
    engine.load_route([(57.0, 11.0), (57.00005, 11.0)])
    engine._lat, engine._lng = 57.0, 11.0
    engine._dynamics.reset(57.0, 11.0, 0.0)
    engine.play()

    for _ in range(2000):
        engine.tick(0.05, cruise_speed_mps=2.0)

    assert engine.operation_mode == OperationMode.AUTONOMOUS
    assert engine._route_complete is True


# ---------------------------------------------------------------------------
# Convergence / physics tests
# ---------------------------------------------------------------------------


def test_heading_lag_converges():
    """After many ticks on a pure-east route the heading should converge to ~90 degrees."""
    engine = SimEngine()
    # Pure-east route: constant latitude, increasing longitude
    engine.load_route([(57.0, 11.0), (57.0, 11.1)])
    # Position drone at route start so it follows the route immediately
    engine._lat, engine._lng = 57.0, 11.0
    engine._heading = _bearing(57.0, 11.0, 57.0, 11.1)
    engine._dynamics.reset(57.0, 11.0, engine._heading)
    engine.play()

    for _ in range(800):
        engine.tick(0.05)

    # Internal heading (no noise) should be within 10 degrees of east
    assert abs(_angle_diff(90.0, engine._heading)) < 10.0


def test_route_completes_auto_stops_motion():
    """A short route should stop motion when the drone reaches the final waypoint.

    Uses a nearby waypoint within acceptance radius reach and enough ticks
    for the dynamics to accelerate and cover the distance.
    """
    engine = SimEngine()
    # Waypoints ~5m apart — drone will reach acceptance radius quickly
    engine.load_route([(57.0, 11.0), (57.00005, 11.0)])
    # Position drone at route start
    engine._lat, engine._lng = 57.0, 11.0
    engine._dynamics.reset(57.0, 11.0, 0.0)
    engine.play()

    for _ in range(2000):
        engine.tick(0.05, cruise_speed_mps=2.0)

    assert engine._route_complete is True
    assert engine._speed == 0.0


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


# ---------------------------------------------------------------------------
# LOS guidance tests
# ---------------------------------------------------------------------------


def test_los_converges_on_straight_segment():
    """LOS guidance should correct crosstrack error and converge on a straight segment."""
    engine = SimEngine()
    # Route heading east — offset the start slightly north to create crosstrack error
    engine.load_route([(57.0, 11.0), (57.0, 11.01)])
    engine._lat = 57.0001  # ~11m north of the path
    engine._lng = 11.0
    engine._dynamics.reset(57.0001, 11.0, 90.0)
    engine.play()

    for _ in range(1200):
        engine.tick(0.05, cruise_speed_mps=1.5)
        if engine._route_complete:
            break

    # Should have corrected toward the path (lat closer to 57.0)
    crosstrack_m = abs(engine._lat - 57.0) * 111_320
    assert crosstrack_m < 5.0, f"Crosstrack error {crosstrack_m:.1f}m, expected < 5m"


def test_play_navigates_to_route_start():
    """When the drone is away from the route start, play() should prepend
    the current position and the drone should navigate toward the start."""
    engine = SimEngine()
    # Position drone ~55m south of route start
    engine._lat, engine._lng = 57.0, 11.0
    engine._heading = 0.0
    engine._dynamics.reset(57.0, 11.0, 0.0)

    start = (57.0005, 11.0)  # ~55m north
    engine.load_route([start, (57.001, 11.0)])
    engine.play()

    # Current position should have been prepended
    assert engine._waypoints[0] == (57.0, 11.0)
    assert engine._waypoints[1] == start

    # After ticking, drone should move closer to route start
    initial_dist = _haversine_m(57.0, 11.0, start[0], start[1])
    for _ in range(400):
        engine.tick(0.05, cruise_speed_mps=2.0)

    current_dist = _haversine_m(engine._lat, engine._lng, start[0], start[1])
    assert current_dist < initial_dist, "Drone should have moved closer to route start"


def test_play_no_prepend_when_near_start():
    """When the drone is already near the route start, play() should not prepend."""
    engine = SimEngine()
    start = (57.0, 11.0)
    engine._lat, engine._lng = start
    engine._dynamics.reset(start[0], start[1], 0.0)

    engine.load_route([start, (57.001, 11.0)])
    engine.play()

    # No prepend — waypoints should match the original route
    assert len(engine._waypoints) == 2
    assert engine._waypoints[0] == start


def test_turn_speed_reduces_before_sharp_turn():
    """Speed should reduce when approaching a sharp turn waypoint."""
    from ghost_drone.simulation.engine import _turn_speed

    # 3-waypoint route with a 90° turn at waypoint 1
    waypoints = [(57.0, 11.0), (57.001, 11.0), (57.001, 11.001)]
    cruise = 1.5

    # Far from the turn — should be at cruise speed
    speed_far = _turn_speed(57.0, 11.0, waypoints, 1, cruise)
    assert speed_far == pytest.approx(cruise, abs=0.01)

    # Close to the turn waypoint — should be reduced
    speed_near = _turn_speed(57.00095, 11.0, waypoints, 1, cruise)
    assert speed_near < cruise * 0.9, f"speed_near={speed_near}, expected < {cruise * 0.9}"


def test_post_turn_heading_dampens():
    """After a 90° turn, heading oscillation should dampen quickly (no sustained oscillation)."""
    engine = SimEngine()
    # Route: north ~100m then east ~100m (90° turn at wp1)
    wp0 = (57.0, 11.0)
    wp1 = (57.0009, 11.0)
    wp2 = (57.0009, 11.0015)
    engine.load_route([wp0, wp1, wp2])
    engine._lat, engine._lng = wp0
    engine._heading = 0.0
    engine._dynamics.reset(wp0[0], wp0[1], 0.0)
    engine.play()

    dt = 0.05
    seg_indices = []
    headings = []

    for _ in range(4000):
        frame = engine.tick(dt, cruise_speed_mps=1.5)
        seg_indices.append(engine._seg_idx)
        headings.append(frame.heading)
        if engine._route_complete:
            break

    # Find where the drone advances past the turn waypoint
    turn_tick = None
    for i in range(1, len(seg_indices)):
        if seg_indices[i] == 1 and seg_indices[i - 1] == 0:
            turn_tick = i
            break

    assert turn_tick is not None, "Drone never reached the turn waypoint"

    # Analyse the second half of the post-turn window (5-10s after turn)
    # The heading should have settled close to 90° by then
    settle_start = min(turn_tick + 100, len(headings))  # 5s after turn
    settle_end = min(turn_tick + 200, len(headings))    # 10s after turn
    assert settle_end > settle_start, "Not enough ticks after the turn"

    target = 90.0
    errors = [_angle_diff(headings[i], target) for i in range(settle_start, settle_end)]
    peak_to_peak = max(errors) - min(errors)

    assert peak_to_peak < 20.0, (
        f"Post-turn heading oscillation too large: {peak_to_peak:.1f}° peak-to-peak "
        f"(expected < 20°)"
    )


def test_drone_active_from_spawn():
    """A freshly created engine should produce telemetry immediately (always active)."""
    engine = SimEngine()
    engine._dynamics.reset(57.0, 11.0, 0.0)
    engine._lat, engine._lng = 57.0, 11.0
    frame = engine.tick(0.05)
    assert frame.to_dict()["state"] == "playing"
    assert frame.operation_mode == OperationMode.OPERATED
