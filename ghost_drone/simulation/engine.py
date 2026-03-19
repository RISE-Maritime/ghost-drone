"""
Simulation engine for ghost_drone.

Provides SimEngine: a pure-Python state machine that advances a drone
along a waypoint route using 3-DOF USV dynamics with PI speed and PD
heading controllers.

No external dependencies — stdlib only (math, random, dataclasses).
"""

from __future__ import annotations

import math

from .dynamics import USVDynamics
from .models import GeofenceAction, OperationMode, TelemetryFrame

# ---------------------------------------------------------------------------
# Module-level constants
# ---------------------------------------------------------------------------

TICK_HZ = 20                      # nominal tick rate (plan 02-03 drives actual dt)
WP_ACCEPT_RADIUS_M = 5.0          # waypoint acceptance radius in metres

# LOS guidance
LOS_LOOKAHEAD_M = 20.0            # lookahead distance along path for LOS guidance
LOS_MIN_LOOKAHEAD_M = 12.0        # minimum lookahead (clamped near waypoints)

# Turn-anticipation speed control
TURN_DECEL_DISTANCE_M = 30.0      # start decelerating this far from a turn
TURN_MIN_SPEED_FRAC = 0.35        # minimum speed fraction at sharpest turns (180°)


# ---------------------------------------------------------------------------
# Module-level helper functions (testable in isolation)
# ---------------------------------------------------------------------------

def _bearing(lat1: float, lng1: float, lat2: float, lng2: float) -> float:
    """Return initial bearing in degrees [0, 360) from point 1 to point 2.

    Uses the forward-azimuth formula for WGS-84 spherical approximation.
    """
    dLng = math.radians(lng2 - lng1)
    lat1r = math.radians(lat1)
    lat2r = math.radians(lat2)
    x = math.sin(dLng) * math.cos(lat2r)
    y = (math.cos(lat1r) * math.sin(lat2r)
         - math.sin(lat1r) * math.cos(lat2r) * math.cos(dLng))
    return (math.degrees(math.atan2(x, y)) + 360) % 360


def _angle_diff(target: float, current: float) -> float:
    """Shortest signed angular difference in degrees. Range [-180, 180].

    Positive means target is clockwise from current.
    """
    return (target - current + 180) % 360 - 180


def _haversine_m(lat1: float, lng1: float, lat2: float, lng2: float) -> float:
    """Great-circle distance in metres between two WGS-84 points."""
    R = 6_371_000
    dlat = math.radians(lat2 - lat1)
    dlng = math.radians(lng2 - lng1)
    a = (math.sin(dlat / 2) ** 2
         + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2))
         * math.sin(dlng / 2) ** 2)
    return R * 2 * math.asin(math.sqrt(a))


def _crosstrack_and_along(
    lat: float, lng: float,
    wp_a: tuple[float, float], wp_b: tuple[float, float],
) -> tuple[float, float]:
    """Return (crosstrack_error_m, along_track_m) for a position relative to segment A→B.

    crosstrack_error is positive when the vessel is to starboard of the path.
    along_track is distance from A along the A→B line (can exceed segment length).
    Uses a local-frame approximation which is accurate for short segments.
    """
    cos_lat = math.cos(math.radians(lat)) or 1e-9
    # Convert to local metres relative to wp_a
    dx = (lng - wp_a[1]) * 111_320 * cos_lat
    dy = (lat - wp_a[0]) * 111_320
    seg_dx = (wp_b[1] - wp_a[1]) * 111_320 * cos_lat
    seg_dy = (wp_b[0] - wp_a[0]) * 111_320
    seg_len = math.sqrt(seg_dx ** 2 + seg_dy ** 2) or 1e-9
    # Unit vector along segment
    ux, uy = seg_dx / seg_len, seg_dy / seg_len
    along = dx * ux + dy * uy
    cross = dx * uy - dy * ux  # positive = starboard of path
    return cross, along


def _los_heading(
    lat: float, lng: float,
    wp_a: tuple[float, float], wp_b: tuple[float, float],
) -> float:
    """LOS (Line-of-Sight) guidance heading in degrees [0, 360).

    Projects the vessel onto the A→B path and places a lookahead point
    along the path ahead of the projection.  Returns the bearing from
    the current position to that lookahead point, which naturally
    corrects crosstrack error.
    """
    cross, along = _crosstrack_and_along(lat, lng, wp_a, wp_b)
    cos_lat = math.cos(math.radians(lat)) or 1e-9
    seg_dx = (wp_b[1] - wp_a[1]) * 111_320 * cos_lat
    seg_dy = (wp_b[0] - wp_a[0]) * 111_320
    seg_len = math.sqrt(seg_dx ** 2 + seg_dy ** 2) or 1e-9

    # Adaptive lookahead: shrinks gently when crosstrack error is large
    lookahead = max(LOS_MIN_LOOKAHEAD_M, LOS_LOOKAHEAD_M - 0.3 * abs(cross))

    # Clamp lookahead point to not overshoot the waypoint
    target_along = min(along + lookahead, seg_len)

    # Convert lookahead point back to lat/lng
    ux, uy = seg_dx / seg_len, seg_dy / seg_len
    target_lat = wp_a[0] + (uy * target_along) / 111_320
    target_lng = wp_a[1] + (ux * target_along) / (111_320 * cos_lat)

    return _bearing(lat, lng, target_lat, target_lng)


def _turn_angle_deg(
    waypoints: list[tuple[float, float]], wp_idx: int,
) -> float:
    """Angle of the turn at waypoint wp_idx, in degrees [0, 180].

    Returns 0 if there is no turn (final waypoint or straight continuation).
    """
    if wp_idx <= 0 or wp_idx >= len(waypoints) - 1:
        return 0.0
    brg_in = _bearing(
        waypoints[wp_idx - 1][0], waypoints[wp_idx - 1][1],
        waypoints[wp_idx][0], waypoints[wp_idx][1],
    )
    brg_out = _bearing(
        waypoints[wp_idx][0], waypoints[wp_idx][1],
        waypoints[wp_idx + 1][0], waypoints[wp_idx + 1][1],
    )
    return abs(_angle_diff(brg_out, brg_in))


def _turn_speed(
    lat: float, lng: float,
    waypoints: list[tuple[float, float]], next_wp_idx: int,
    cruise_speed: float,
) -> float:
    """Desired speed considering upcoming turn severity.

    Reduces speed proportionally to the turn angle when within
    TURN_DECEL_DISTANCE_M of the next waypoint.
    """
    turn_deg = _turn_angle_deg(waypoints, next_wp_idx)
    if turn_deg < 10.0:
        return cruise_speed  # negligible turn, no deceleration

    dist = _haversine_m(lat, lng, waypoints[next_wp_idx][0], waypoints[next_wp_idx][1])
    if dist > TURN_DECEL_DISTANCE_M:
        return cruise_speed

    # Interpolate: at TURN_DECEL_DISTANCE_M → full speed, at 0 → reduced speed
    turn_frac = min(turn_deg / 180.0, 1.0)  # 0 for straight, 1 for U-turn
    min_speed = cruise_speed * (1.0 - turn_frac * (1.0 - TURN_MIN_SPEED_FRAC))
    blend = dist / TURN_DECEL_DISTANCE_M  # 1.0 far away, 0.0 at waypoint
    return min_speed + (cruise_speed - min_speed) * blend


def _point_in_polygon(
    lat: float, lng: float, polygon: list[tuple[float, float]],
) -> bool:
    """Ray-casting algorithm to test if a point is inside a polygon.

    Args:
        lat: Latitude of the test point.
        lng: Longitude of the test point.
        polygon: List of (lat, lng) vertices defining the polygon.

    Returns:
        True if the point is inside the polygon.
    """
    n = len(polygon)
    inside = False
    j = n - 1
    for i in range(n):
        yi, xi = polygon[i]
        yj, xj = polygon[j]
        if ((yi > lat) != (yj > lat)) and (lng < (xj - xi) * (lat - yi) / (yj - yi) + xi):
            inside = not inside
        j = i
    return inside


# ---------------------------------------------------------------------------
# SimEngine
# ---------------------------------------------------------------------------

class SimEngine:
    """Pure-Python drone simulation state machine.

    Usage::

        engine = SimEngine()
        engine.load_route([(57.0, 11.0), (57.01, 11.01)])
        engine.play()
        for _ in range(100):
            frame = engine.tick(0.05, cruise_speed_mps=1.5)
            print(frame.to_dict())
    """

    def __init__(self) -> None:
        self._waypoints: list[tuple[float, float]] = []  # active navigation waypoints
        self._route_waypoints: list[tuple[float, float]] = []  # original route
        self._lat: float = 0.0
        self._lng: float = 0.0
        self._heading: float = 0.0           # current heading deg
        self._speed: float = 0.0             # current speed m/s
        self._seg_idx: int = 0               # index of current segment start waypoint
        self._remote_heading: float | None = None  # remote heading override
        self._dynamics = USVDynamics()
        self._dynamics.reset(0, 0, 0)
        self._roll: float = 0.0
        self._pitch: float = 0.0
        self._rudder_deg: float = 0.0
        self._thrust_pct: float = 0.0
        self._operation_mode: OperationMode = OperationMode.OPERATED
        self._manual_rudder: float = 0.0     # commanded rudder angle in OPERATED mode, degrees [-35, +35]
        self._manual_engine: float = 0.0     # commanded engine power in OPERATED mode, [0, 1]
        self._route_complete: bool = False
        self._geofence_polygon: list[tuple[float, float]] | None = None
        self._geofence_action: GeofenceAction = GeofenceAction.COAST
        self._geofence_active: bool = False  # True = breach enforcement in progress

    # ------------------------------------------------------------------
    # Public route / lifecycle API
    # ------------------------------------------------------------------

    def load_route(self, waypoints: list[tuple[float, float]]) -> None:
        """Set waypoints without moving the drone.

        The drone stays at its current position.  When play() is called,
        the current position is prepended as an extra waypoint so the
        drone navigates to the route start before following the route.

        Args:
            waypoints: Sequence of (lat, lng) tuples in route order.

        Raises:
            ValueError: If fewer than 2 waypoints are provided.
        """
        if len(waypoints) < 2:
            raise ValueError("Route requires at least 2 waypoints")
        self._route_waypoints = list(waypoints)
        self._waypoints = list(waypoints)
        self._route_complete = False
        self._seg_idx = 0
        self._speed = 0.0
        self._remote_heading = None

    def play(self) -> None:
        """Switch to AUTONOMOUS mode and start following the loaded route.

        Prepends the drone's current position as waypoint 0 if it is not
        already near the route start, so the existing LOS guidance navigates
        the drone to the route before following it.

        No-op if no route is loaded.
        """
        if not self._waypoints:
            return
        self._waypoints = list(self._route_waypoints)
        first_wp = self._waypoints[0]
        dist = _haversine_m(
            self._lat, self._lng, first_wp[0], first_wp[1],
        )
        if dist > WP_ACCEPT_RADIUS_M:
            self._waypoints.insert(0, (self._lat, self._lng))
        self._seg_idx = 0
        self._route_complete = False
        # Keep current heading — LOS guidance will steer toward the route
        self._dynamics.reset(self._lat, self._lng, self._heading)
        self._operation_mode = OperationMode.AUTONOMOUS
        self._manual_rudder = 0.0
        self._manual_engine = 0.0

    def stop(self) -> None:
        """Switch to OPERATED mode, zero motion, stay in place."""
        self._remote_heading = None
        self._operation_mode = OperationMode.OPERATED
        self._manual_rudder = 0.0
        self._manual_engine = 0.0
        self._speed = 0.0
        self._roll = 0.0
        self._pitch = 0.0
        self._rudder_deg = 0.0
        self._thrust_pct = 0.0
        self._waypoints = list(self._route_waypoints)

    def remote_move(self, heading_deg: float) -> None:
        """Override autonomous heading with a remote command.

        The drone will turn toward the given heading instead of following
        the waypoint route. Only effective while PLAYING.
        """
        self._remote_heading = heading_deg % 360

    def cancel_remote(self) -> None:
        """Clear the remote heading override, resuming autonomous navigation."""
        self._remote_heading = None

    def set_mode(self, mode: OperationMode) -> None:
        """Switch between AUTONOMOUS and OPERATED operation modes.

        Switching to OPERATED while PLAYING in autonomous mode stops
        autonomous playback (pauses) so the user takes over.
        Switching to AUTONOMOUS clears operated-mode commands.
        """
        if mode == self._operation_mode:
            return
        self._operation_mode = mode
        if mode == OperationMode.OPERATED:
            # Reset operated-mode controls to neutral
            self._manual_rudder = 0.0
            self._manual_engine = 0.0
            self._remote_heading = None
        else:
            # Switching back to autonomous
            self._manual_rudder = 0.0
            self._manual_engine = 0.0

    def manual_control(self, rudder_deg: float, engine: float) -> None:
        """Set manual rudder angle and engine power. Only effective in OPERATED mode.

        Args:
            rudder_deg: Rudder angle in degrees, clamped to [-35, +35].
            engine: Engine power fraction, clamped to [0, 1].
        """
        if self._operation_mode != OperationMode.OPERATED:
            return
        self._manual_rudder = max(-35.0, min(35.0, rudder_deg))
        self._manual_engine = max(0.0, min(1.0, engine))

    def set_home(self, lat: float, lng: float) -> None:
        """Set the drone's home position while in OPERATED mode.

        This allows repositioning a drone when not autonomously navigating.
        Clears any previously loaded route so the drone can be re-routed
        from the new location. No-op if mode is not OPERATED.
        """
        if self._operation_mode == OperationMode.OPERATED:
            self._lat = lat
            self._lng = lng
            self._waypoints = []
            self._route_waypoints = []
            self._seg_idx = 0
            self._dynamics.reset(lat, lng, self._heading)

    def set_geofence(
        self,
        polygon: list[tuple[float, float]],
        action: GeofenceAction,
    ) -> None:
        """Set the geofence polygon and breach action."""
        self._geofence_polygon = list(polygon)
        self._geofence_action = action
        self._geofence_active = False

    def clear_geofence(self) -> None:
        """Remove the geofence."""
        self._geofence_polygon = None
        self._geofence_active = False

    @property
    def geofence_breached(self) -> bool:
        """True when geofence breach enforcement is in progress."""
        return self._geofence_active

    @property
    def is_remote(self) -> bool:
        """True when a remote heading override is active."""
        return self._remote_heading is not None

    # ------------------------------------------------------------------
    # Internal helpers
    # ------------------------------------------------------------------

    def _reset_to_start(self) -> None:
        """Place drone at first waypoint, zero progress, heading toward second waypoint."""
        self._remote_heading = None
        if not self._waypoints:
            return
        lat0, lng0 = self._waypoints[0]
        self._lat = lat0
        self._lng = lng0
        self._seg_idx = 0
        self._speed = 0.0
        self._roll = 0.0
        self._pitch = 0.0
        self._rudder_deg = 0.0
        self._thrust_pct = 0.0
        if len(self._waypoints) >= 2:
            lat1, lng1 = self._waypoints[1]
            self._heading = _bearing(lat0, lng0, lat1, lng1)
        else:
            self._heading = 0.0
        self._dynamics.reset(lat0, lng0, self._heading)

    # ------------------------------------------------------------------
    # Tick
    # ------------------------------------------------------------------

    def tick(self, dt: float, cruise_speed_mps: float = 1.5) -> TelemetryFrame:
        """Advance simulation by *dt* seconds and return a TelemetryFrame.

        Always advances — drones are active from spawn.
        In OPERATED mode with zero input, dynamics naturally produce no movement.
        When route is complete and AUTONOMOUS, hold position.
        """
        if not (self._route_complete and self._operation_mode == OperationMode.AUTONOMOUS):
            self._advance(dt, cruise_speed_mps)

        return TelemetryFrame(
            lat=self._lat,
            lng=self._lng,
            heading=self._heading % 360,
            speed=max(0.0, self._speed),
            roll=self._roll,
            pitch=self._pitch,
            rudder_deg=self._rudder_deg,
            thrust_pct=self._thrust_pct,
            operation_mode=self._operation_mode,
            geofence_breached=self._geofence_active,
        )

    def _advance(self, dt: float, cruise_speed_mps: float) -> None:
        """Move the drone forward *dt* seconds at *cruise_speed_mps*.

        Called only when state is PLAYING.  Uses LOS guidance for crosstrack
        correction, turn-anticipation speed control, and smooth waypoint
        transitions.
        """
        # --- Geofence enforcement ---
        if self._geofence_polygon is not None and not self._geofence_active:
            if not _point_in_polygon(self._lat, self._lng, self._geofence_polygon):
                self._geofence_active = True

        if self._geofence_active:
            if self._geofence_action == GeofenceAction.BRAKE:
                out = self._dynamics.step_brake(dt, 0.0)
            else:
                out = self._dynamics.step_manual(dt, 0.0, 0.0)
            self._lat = out.lat
            self._lng = out.lng
            self._heading = out.heading_deg
            self._speed = out.speed_mps
            self._roll = out.roll_deg
            self._pitch = out.pitch_deg
            self._rudder_deg = out.rudder_deg
            self._thrust_pct = out.thrust_pct
            if self._speed < 0.01:
                self._speed = 0.0
                self._operation_mode = OperationMode.OPERATED
                self._geofence_active = False
                self._manual_rudder = 0.0
                self._manual_engine = 0.0
            return

        # --- Determine control inputs and step dynamics ---
        if self._operation_mode == OperationMode.OPERATED or not self._waypoints:
            # Operated mode (or no waypoints): apply rudder and engine directly
            out = self._dynamics.step_manual(
                dt, self._manual_rudder, self._manual_engine,
            )
        else:
            if self._remote_heading is not None:
                target_heading = self._remote_heading
                desired_speed = cruise_speed_mps
            else:
                next_wp_idx = min(self._seg_idx + 1, len(self._waypoints) - 1)
                wp_a = self._waypoints[self._seg_idx]
                wp_b = self._waypoints[next_wp_idx]
                target_heading = _los_heading(
                    self._lat, self._lng, wp_a, wp_b,
                )
                desired_speed = _turn_speed(
                    self._lat, self._lng,
                    self._waypoints, next_wp_idx,
                    cruise_speed_mps,
                )
            out = self._dynamics.step(dt, desired_speed, target_heading)

        # Update engine state from dynamics
        self._lat = out.lat
        self._lng = out.lng
        self._heading = out.heading_deg
        self._speed = out.speed_mps
        self._roll = out.roll_deg
        self._pitch = out.pitch_deg
        self._rudder_deg = out.rudder_deg
        self._thrust_pct = out.thrust_pct

        # --- Waypoint tracking (acceptance radius) ---
        if self._operation_mode == OperationMode.OPERATED or not self._waypoints:
            return  # No waypoint tracking in operated mode or without waypoints
        if self._remote_heading is None:
            next_wp_idx = min(self._seg_idx + 1, len(self._waypoints) - 1)
            dist = _haversine_m(
                self._lat, self._lng,
                self._waypoints[next_wp_idx][0],
                self._waypoints[next_wp_idx][1],
            )
            if dist < WP_ACCEPT_RADIUS_M:
                self._seg_idx += 1
                if self._seg_idx >= len(self._waypoints) - 1:
                    # Route complete — hold position at final waypoint, stay AUTONOMOUS
                    self._lat, self._lng = self._waypoints[-1]
                    self._route_complete = True
                    self._remote_heading = None
                    self._seg_idx = len(self._waypoints) - 2  # clamp
                    self._speed = 0.0
                    self._roll = 0.0
                    self._pitch = 0.0
                    self._rudder_deg = 0.0
                    self._thrust_pct = 0.0
                    self._manual_rudder = 0.0
                    self._manual_engine = 0.0

    # ------------------------------------------------------------------
    # Properties
    # ------------------------------------------------------------------

    @property
    def operation_mode(self) -> OperationMode:
        """Current operation mode."""
        return self._operation_mode

    @property
    def position(self) -> tuple[float, float]:
        """Current (lat, lng) position of the drone."""
        return (self._lat, self._lng)

    @property
    def heading(self) -> float:
        """Current heading in degrees [0, 360)."""
        return self._heading

    @property
    def waypoints(self) -> list[tuple[float, float]]:
        """Copy of the loaded waypoints (read-only view)."""
        return list(self._waypoints)
