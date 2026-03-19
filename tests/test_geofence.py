"""
Tests for geofence enforcement in the simulation engine.

Verifies: point-in-polygon geometry, coast/brake deceleration, mode transitions,
and geofence clear/resume behaviour.
"""

import pytest

from ghost_drone.simulation.engine import SimEngine, _point_in_polygon
from ghost_drone.simulation.models import GeofenceAction, OperationMode


# ---------------------------------------------------------------------------
# Geometry helper
# ---------------------------------------------------------------------------

# Simple square polygon around (57.0, 11.0)
SQUARE = [
    (56.999, 10.999),
    (56.999, 11.001),
    (57.001, 11.001),
    (57.001, 10.999),
]


def test_point_in_polygon_inside():
    """A point clearly inside the polygon should return True."""
    assert _point_in_polygon(57.0, 11.0, SQUARE) is True


def test_point_in_polygon_outside():
    """A point clearly outside the polygon should return False."""
    assert _point_in_polygon(57.1, 11.0, SQUARE) is False


def test_point_in_polygon_triangle():
    """Test with a triangle."""
    triangle = [(0.0, 0.0), (0.0, 2.0), (2.0, 0.0)]
    assert _point_in_polygon(0.5, 0.5, triangle) is True
    assert _point_in_polygon(1.5, 1.5, triangle) is False


# ---------------------------------------------------------------------------
# Helpers to set up a moving drone
# ---------------------------------------------------------------------------

def _make_moving_engine(lat=57.0, lng=11.0, heading=0.0, speed_mps=1.5):
    """Create an engine with a drone moving at given speed."""
    engine = SimEngine()
    engine._lat, engine._lng = lat, lng
    engine._heading = heading
    engine._dynamics.reset(lat, lng, heading)
    # Give it some velocity by ticking in autonomous mode
    engine.load_route([(lat, lng), (lat + 0.01, lng)])
    engine.play()
    for _ in range(100):
        engine.tick(0.05, cruise_speed_mps=speed_mps)
    return engine


# ---------------------------------------------------------------------------
# Coast enforcement
# ---------------------------------------------------------------------------

def test_geofence_coast_decelerates():
    """Setting a geofence with coast action should decelerate the drone over multiple ticks."""
    engine = _make_moving_engine()
    initial_speed = engine._speed
    assert initial_speed > 0.5, "Drone should be moving"

    # Set a geofence that excludes the drone's current position
    # (tiny polygon far from the drone)
    fence = [
        (56.0, 10.0),
        (56.0, 10.001),
        (56.001, 10.001),
        (56.001, 10.0),
    ]
    engine.set_geofence(fence, GeofenceAction.COAST)

    # Tick once — geofence should activate
    engine.tick(0.05)
    assert engine.geofence_breached is True

    # Speed should decrease but not instantly zero
    speed_after_one = engine._speed
    assert speed_after_one > 0, "Coast should not instantly stop"
    assert speed_after_one < initial_speed, "Coast should start slowing"


def test_geofence_no_instant_stop():
    """Speed should be > 0 on the first tick after breach (realistic deceleration)."""
    engine = _make_moving_engine()
    fence = [
        (56.0, 10.0),
        (56.0, 10.001),
        (56.001, 10.001),
        (56.001, 10.0),
    ]
    engine.set_geofence(fence, GeofenceAction.COAST)
    engine.tick(0.05)
    assert engine._speed > 0, "Should not stop instantly on first tick"


# ---------------------------------------------------------------------------
# Brake enforcement
# ---------------------------------------------------------------------------

def test_geofence_brake_stops_faster():
    """Brake action should stop the drone in fewer ticks than coast."""
    # Coast run
    engine_coast = _make_moving_engine()
    fence = [(56.0, 10.0), (56.0, 10.001), (56.001, 10.001), (56.001, 10.0)]
    engine_coast.set_geofence(fence, GeofenceAction.COAST)
    coast_ticks = 0
    for _ in range(2000):
        engine_coast.tick(0.05)
        coast_ticks += 1
        if engine_coast._speed < 0.01:
            break

    # Brake run
    engine_brake = _make_moving_engine()
    engine_brake.set_geofence(fence, GeofenceAction.BRAKE)
    brake_ticks = 0
    for _ in range(2000):
        engine_brake.tick(0.05)
        brake_ticks += 1
        if engine_brake._speed < 0.01:
            break

    assert brake_ticks < coast_ticks, (
        f"Brake ({brake_ticks} ticks) should stop faster than coast ({coast_ticks} ticks)"
    )


# ---------------------------------------------------------------------------
# Mode transition
# ---------------------------------------------------------------------------

def test_geofence_switches_to_operated():
    """After geofence enforcement stops the drone, it should switch to OPERATED mode."""
    engine = _make_moving_engine()
    fence = [(56.0, 10.0), (56.0, 10.001), (56.001, 10.001), (56.001, 10.0)]
    engine.set_geofence(fence, GeofenceAction.BRAKE)

    for _ in range(2000):
        engine.tick(0.05)
        if engine.operation_mode == OperationMode.OPERATED and engine._speed == 0.0:
            break

    assert engine.operation_mode == OperationMode.OPERATED
    assert engine._speed == 0.0
    assert engine.geofence_breached is False  # enforcement complete


# ---------------------------------------------------------------------------
# No effect inside geofence
# ---------------------------------------------------------------------------

def test_inside_geofence_no_effect():
    """A drone inside the geofence polygon should operate normally."""
    engine = SimEngine()
    engine._lat, engine._lng = 57.0, 11.0
    engine._dynamics.reset(57.0, 11.0, 0.0)
    engine.load_route([(57.0, 11.0), (57.0005, 11.0)])
    engine.play()

    # Geofence that includes the entire route
    fence = [
        (56.99, 10.99),
        (56.99, 11.01),
        (57.01, 11.01),
        (57.01, 10.99),
    ]
    engine.set_geofence(fence, GeofenceAction.COAST)

    for _ in range(100):
        engine.tick(0.05, cruise_speed_mps=1.5)

    assert engine.geofence_breached is False
    assert engine.operation_mode == OperationMode.AUTONOMOUS
    assert engine._speed > 0


# ---------------------------------------------------------------------------
# Clear geofence
# ---------------------------------------------------------------------------

def test_clear_geofence_resumes():
    """Clearing the geofence should allow the drone to operate normally again."""
    engine = _make_moving_engine()
    fence = [(56.0, 10.0), (56.0, 10.001), (56.001, 10.001), (56.001, 10.0)]
    engine.set_geofence(fence, GeofenceAction.COAST)
    engine.tick(0.05)
    assert engine.geofence_breached is True

    engine.clear_geofence()
    assert engine.geofence_breached is False

    # Drone can continue operating
    engine.tick(0.05)
    assert engine.geofence_breached is False


# ---------------------------------------------------------------------------
# Validation
# ---------------------------------------------------------------------------

def test_set_geofence_stores_polygon():
    """set_geofence should store the polygon and action."""
    engine = SimEngine()
    polygon = [(0.0, 0.0), (0.0, 1.0), (1.0, 0.0)]
    engine.set_geofence(polygon, GeofenceAction.BRAKE)
    assert engine._geofence_polygon == polygon
    assert engine._geofence_action == GeofenceAction.BRAKE
    assert engine._geofence_active is False


def test_telemetry_frame_includes_geofence_breached():
    """TelemetryFrame.to_dict() should include geofence_breached field."""
    engine = _make_moving_engine()
    fence = [(56.0, 10.0), (56.0, 10.001), (56.001, 10.001), (56.001, 10.0)]
    engine.set_geofence(fence, GeofenceAction.COAST)
    frame = engine.tick(0.05)
    d = frame.to_dict()
    assert "geofence_breached" in d
    assert d["geofence_breached"] is True
