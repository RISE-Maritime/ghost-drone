"""
Simulation engine for ghost_drone.

Provides SimEngine: a pure-Python state machine that advances a drone
along a waypoint route with first-order heading lag and Gaussian noise
on every telemetry tick.

No external dependencies — stdlib only (math, random, dataclasses).
"""

from __future__ import annotations

import math
import random

from .models import SimState, TelemetryFrame

# ---------------------------------------------------------------------------
# Module-level constants
# ---------------------------------------------------------------------------

TICK_HZ = 20                      # nominal tick rate (plan 02-03 drives actual dt)
HEADING_TAU = 3.0                 # heading lag time constant in seconds
POS_NOISE_SIGMA_M = 0.5           # position noise standard deviation in metres
HEADING_NOISE_SIGMA_DEG = 0.3     # heading noise std-dev in degrees
SPEED_NOISE_SIGMA_MPS = 0.05      # speed noise std-dev in m/s


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
            frame = engine.tick(0.05, cruise_speed_mps=10.0)
            print(frame.to_dict())
    """

    def __init__(self) -> None:
        self._state: SimState = SimState.STOPPED
        self._waypoints: list[tuple[float, float]] = []  # list of (lat, lng)
        self._lat: float = 0.0
        self._lng: float = 0.0
        self._heading: float = 0.0           # current heading deg, with lag
        self._speed: float = 0.0             # current speed m/s
        self._seg_idx: int = 0               # index of current segment start waypoint
        self._seg_progress_m: float = 0.0   # metres travelled into current segment
        self._remote_heading: float | None = None  # remote heading override

    # ------------------------------------------------------------------
    # Public route / lifecycle API
    # ------------------------------------------------------------------

    def load_route(self, waypoints: list[tuple[float, float]]) -> None:
        """Set waypoints and reset to STOPPED at first waypoint.

        Args:
            waypoints: Sequence of (lat, lng) tuples in route order.

        Raises:
            ValueError: If fewer than 2 waypoints are provided.
        """
        if len(waypoints) < 2:
            raise ValueError("Route requires at least 2 waypoints")
        self._waypoints = list(waypoints)
        self._state = SimState.STOPPED
        self._reset_to_start()

    def play(self) -> None:
        """Transition STOPPED -> PLAYING or PAUSED -> PLAYING.

        No-op if already PLAYING or if no route is loaded.
        """
        if self._state in (SimState.STOPPED, SimState.PAUSED) and self._waypoints:
            self._state = SimState.PLAYING

    def pause(self) -> None:
        """Transition PLAYING -> PAUSED. No-op otherwise."""
        if self._state == SimState.PLAYING:
            self._state = SimState.PAUSED

    def stop(self) -> None:
        """Transition any state -> STOPPED and reset drone to first waypoint."""
        self._state = SimState.STOPPED
        self._remote_heading = None
        self._reset_to_start()

    def remote_move(self, heading_deg: float) -> None:
        """Override autonomous heading with a remote command.

        The drone will turn toward the given heading instead of following
        the waypoint route. Only effective while PLAYING.
        """
        self._remote_heading = heading_deg % 360

    def cancel_remote(self) -> None:
        """Clear the remote heading override, resuming autonomous navigation."""
        self._remote_heading = None

    def set_home(self, lat: float, lng: float) -> None:
        """Set the drone's home position while STOPPED and without a route.

        This allows spawning a drone at a specific location before any route
        is loaded. No-op if a route is already loaded or state is not STOPPED.
        """
        if self._state == SimState.STOPPED and not self._waypoints:
            self._lat = lat
            self._lng = lng

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
        self._seg_progress_m = 0.0
        self._speed = 0.0
        if len(self._waypoints) >= 2:
            lat1, lng1 = self._waypoints[1]
            self._heading = _bearing(lat0, lng0, lat1, lng1)
        else:
            self._heading = 0.0

    # ------------------------------------------------------------------
    # Tick
    # ------------------------------------------------------------------

    def tick(self, dt: float, cruise_speed_mps: float = 10.0) -> TelemetryFrame:
        """Advance simulation by *dt* seconds and return a TelemetryFrame.

        - STOPPED/PAUSED: returns current position with zero speed (no movement).
        - PLAYING: advances drone along route, applies heading lag, applies noise.

        Heading uses a discrete first-order lag so the drone smoothly turns
        rather than snapping instantly to the target bearing.

        Gaussian noise is applied to the *output frame only* — internal state
        remains clean so noise does not accumulate over time.
        """
        if self._state == SimState.PLAYING:
            self._advance(dt, cruise_speed_mps)

        # Gaussian noise applied to frame only (internal state stays clean)
        lat_noise = random.gauss(0, POS_NOISE_SIGMA_M / 111_320)
        cos_lat = math.cos(math.radians(self._lat)) or 1e-9  # guard zero
        lng_noise = random.gauss(0, POS_NOISE_SIGMA_M / (111_320 * cos_lat))
        heading_noise = random.gauss(0, HEADING_NOISE_SIGMA_DEG)
        speed_noise = random.gauss(0, SPEED_NOISE_SIGMA_MPS)

        effective_speed = cruise_speed_mps if self._state == SimState.PLAYING else 0.0

        return TelemetryFrame(
            lat=self._lat + lat_noise,
            lng=self._lng + lng_noise,
            heading=(self._heading + heading_noise) % 360,
            speed=max(0.0, effective_speed + speed_noise),
            state=self._state,
        )

    def _advance(self, dt: float, cruise_speed_mps: float) -> None:
        """Move the drone forward *dt* seconds at *cruise_speed_mps*.

        Called only when state is PLAYING.
        """
        # --- Heading lag (first-order discrete) ---
        if self._remote_heading is not None:
            target_heading = self._remote_heading
        else:
            next_wp_idx = min(self._seg_idx + 1, len(self._waypoints) - 1)
            target_heading = _bearing(
                self._lat, self._lng,
                self._waypoints[next_wp_idx][0],
                self._waypoints[next_wp_idx][1],
            )
        alpha = dt / (HEADING_TAU + dt)
        self._heading += alpha * _angle_diff(target_heading, self._heading)
        self._heading = self._heading % 360

        # --- Segment advance ---
        distance_m = cruise_speed_mps * dt
        self._seg_progress_m += distance_m

        while self._seg_progress_m >= 0:
            wp_a = self._waypoints[self._seg_idx]
            wp_b = self._waypoints[self._seg_idx + 1]
            seg_len = _haversine_m(*wp_a, *wp_b)

            if seg_len <= 0 or self._seg_progress_m < seg_len:
                # Still within this segment — interpolate position
                frac = self._seg_progress_m / seg_len if seg_len > 0 else 0.0
                frac = min(frac, 1.0)
                self._lat = wp_a[0] + frac * (wp_b[0] - wp_a[0])
                self._lng = wp_a[1] + frac * (wp_b[1] - wp_a[1])
                break

            # Consumed this segment — move to next
            self._seg_progress_m -= seg_len
            self._seg_idx += 1

            if self._seg_idx >= len(self._waypoints) - 1:
                # Route complete — stop at final waypoint
                self._lat, self._lng = self._waypoints[-1]
                self._state = SimState.STOPPED
                self._remote_heading = None
                self._seg_idx = len(self._waypoints) - 2  # clamp
                self._seg_progress_m = 0.0
                break

    # ------------------------------------------------------------------
    # Properties
    # ------------------------------------------------------------------

    @property
    def state(self) -> SimState:
        """Current simulation state."""
        return self._state

    @property
    def position(self) -> tuple[float, float]:
        """Current (lat, lng) position of the drone."""
        return (self._lat, self._lng)

    @property
    def waypoints(self) -> list[tuple[float, float]]:
        """Copy of the loaded waypoints (read-only view)."""
        return list(self._waypoints)
