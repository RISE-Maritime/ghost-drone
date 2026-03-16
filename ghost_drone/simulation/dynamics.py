"""
3-DOF USV dynamic model for ghost_drone.

Simplified Fossen-style body-frame dynamics (surge, sway, yaw) for a
small (~3m, ~50kg) surface drone.  Provides realistic inertia, drift in
turns, and dynamics-coupled roll/pitch instead of pure kinematics.

No external dependencies — stdlib only (math, random, dataclasses).
"""

from __future__ import annotations

import math
import random
from dataclasses import dataclass


# ---------------------------------------------------------------------------
# Parameters
# ---------------------------------------------------------------------------

@dataclass
class USVParams:
    """Hydrodynamic coefficients and controller gains for a small USV.

    Defaults are tuned for a ~3m hull, ~50kg displacement, cruise ~1.5 m/s
    (~3 knots), max ~2.5 m/s (~5 knots).
    """

    # Mass / inertia
    mass: float = 50.0            # kg
    Iz: float = 15.0              # yaw moment of inertia, kg·m²

    # Added mass
    X_udot: float = 5.0           # surge added mass, kg
    Y_vdot: float = 30.0          # sway added mass, kg
    N_rdot: float = 3.0           # yaw added inertia, kg·m²

    # Linear drag
    X_u: float = -8.0             # surge linear drag, N/(m/s)
    Y_v: float = -40.0            # sway linear drag, N/(m/s)
    N_r: float = -6.0             # yaw linear drag, N·m/(rad/s)

    # Quadratic drag
    X_uu: float = -15.0           # surge quadratic drag, N/(m/s)²
    Y_vv: float = -80.0           # sway quadratic drag, N/(m/s)²
    N_rr: float = -3.0            # yaw quadratic drag, N·m/(rad/s)²

    # Cross-coupling
    Y_r: float = 5.0              # sway force from yaw rate, N/(rad/s)
    N_v: float = -3.0             # yaw moment from sway velocity, N·m/(m/s)

    # Rudder effectiveness
    N_delta: float = 15.0         # yaw moment per radian of rudder

    # Thrust
    T_max: float = 60.0           # max thrust, N

    # Speed controller (PI)
    speed_Kp: float = 2.0
    speed_Ki: float = 0.3

    # Heading controller (PD)
    heading_Kp: float = 1.5
    heading_Kd: float = 3.0
    delta_max: float = math.radians(35)  # max rudder angle, rad

    # Rudder rate limit
    delta_rate_max: float = math.radians(25)  # max rudder rate, rad/s (25 deg/s)

    # Roll/pitch coupling
    K_roll: float = 8.0           # roll = -K_roll * u * r  (deg)
    K_pitch: float = 3.0          # pitch = -K_pitch * u_dot  (deg)

    # Output noise
    roll_noise_sigma_deg: float = 0.3
    pitch_noise_sigma_deg: float = 0.2


# ---------------------------------------------------------------------------
# Output
# ---------------------------------------------------------------------------

@dataclass
class DynamicsOutput:
    """Result of a single dynamics step."""

    lat: float
    lng: float
    heading_deg: float   # [0, 360)
    speed_mps: float     # total speed = sqrt(u² + v²)
    roll_deg: float
    pitch_deg: float
    u: float             # surge velocity, m/s
    v: float             # sway velocity, m/s
    r: float             # yaw rate, rad/s
    rudder_deg: float    # rudder angle, degrees (positive = starboard)
    thrust_pct: float    # thrust as percentage of T_max [0, 100]


# ---------------------------------------------------------------------------
# Earth radius (metres)
# ---------------------------------------------------------------------------

_R_EARTH = 6_371_000.0


# ---------------------------------------------------------------------------
# USV Dynamics
# ---------------------------------------------------------------------------

class USVDynamics:
    """3-DOF body-frame dynamics for a small USV.

    Call ``step(dt, desired_speed, desired_heading_deg)`` each tick to
    advance the equations of motion.  Call ``reset(lat, lng, heading_deg)``
    to zero all velocities and place the vessel.
    """

    def __init__(self, params: USVParams | None = None) -> None:
        self.p = params or USVParams()

        # State
        self.u: float = 0.0      # surge velocity, m/s (body-frame forward)
        self.v: float = 0.0      # sway velocity, m/s (body-frame starboard)
        self.r: float = 0.0      # yaw rate, rad/s
        self.psi: float = 0.0    # heading, rad (world-frame, 0=north, CW positive)
        self.lat: float = 0.0
        self.lng: float = 0.0

        # Controller state
        self._speed_integral: float = 0.0
        self._prev_u_dot: float = 0.0
        self._delta: float = 0.0      # current rudder angle, rad (rate-limited)

    def reset(self, lat: float, lng: float, heading_deg: float) -> None:
        """Zero all velocities and place the vessel at a given position/heading."""
        self.u = 0.0
        self.v = 0.0
        self.r = 0.0
        self.psi = math.radians(heading_deg)
        self.lat = lat
        self.lng = lng
        self._speed_integral = 0.0
        self._prev_u_dot = 0.0
        self._delta = 0.0

    def step(
        self,
        dt: float,
        desired_speed: float,
        desired_heading_deg: float,
    ) -> DynamicsOutput:
        """Advance the dynamics by *dt* seconds.

        Args:
            dt: Time step in seconds (should be ~0.05 for 20 Hz).
            desired_speed: Target surge speed in m/s.
            desired_heading_deg: Target heading in degrees [0, 360).

        Returns:
            A DynamicsOutput with the new state.
        """
        p = self.p

        # --- Speed controller (PI) ---
        thrust = self._speed_controller(dt, desired_speed)

        # --- Heading controller (PD) with rudder rate limiting ---
        delta_cmd = self._heading_controller(desired_heading_deg)
        max_change = p.delta_rate_max * dt
        delta_diff = delta_cmd - self._delta
        delta_diff = max(-max_change, min(max_change, delta_diff))
        self._delta += delta_diff
        delta = self._delta

        # --- Equations of motion ---
        # Surge: (m + X_udot) · u̇ = X_u·u + X_uu·u·|u| + thrust
        u_dot = (
            p.X_u * self.u
            + p.X_uu * self.u * abs(self.u)
            + thrust
        ) / (p.mass + p.X_udot)

        # Sway: (m + Y_vdot) · v̇ = Y_v·v + Y_vv·v·|v| + Y_r·r
        v_dot = (
            p.Y_v * self.v
            + p.Y_vv * self.v * abs(self.v)
            + p.Y_r * self.r
        ) / (p.mass + p.Y_vdot)

        # Yaw: (Iz + N_rdot) · ṙ = N_r·r + N_rr·r·|r| + N_v·v + N_delta·δ
        r_dot = (
            p.N_r * self.r
            + p.N_rr * self.r * abs(self.r)
            + p.N_v * self.v
            + p.N_delta * delta
        ) / (p.Iz + p.N_rdot)

        # --- Euler integration ---
        self.u += u_dot * dt
        self.v += v_dot * dt
        self.r += r_dot * dt
        self.psi += self.r * dt

        # Normalise heading to [0, 2π)
        self.psi = self.psi % (2 * math.pi)

        # --- Kinematic update (world frame) ---
        # Body→world velocity
        cos_psi = math.cos(self.psi)
        sin_psi = math.sin(self.psi)
        # NED convention: psi=0 is north, positive CW
        v_north = self.u * cos_psi - self.v * sin_psi
        v_east = self.u * sin_psi + self.v * cos_psi

        # Position update via small-angle lat/lng approximation
        self.lat += math.degrees(v_north * dt / _R_EARTH)
        cos_lat = math.cos(math.radians(self.lat)) or 1e-9
        self.lng += math.degrees(v_east * dt / (_R_EARTH * cos_lat))

        # --- Roll / pitch from dynamics ---
        raw_roll = -p.K_roll * self.u * self.r
        raw_pitch = -p.K_pitch * u_dot
        roll_deg = raw_roll + random.gauss(0, p.roll_noise_sigma_deg)
        pitch_deg = raw_pitch + random.gauss(0, p.pitch_noise_sigma_deg)

        self._prev_u_dot = u_dot

        speed = math.sqrt(self.u ** 2 + self.v ** 2)
        heading_deg = math.degrees(self.psi) % 360

        return DynamicsOutput(
            lat=self.lat,
            lng=self.lng,
            heading_deg=heading_deg,
            speed_mps=speed,
            roll_deg=roll_deg,
            pitch_deg=pitch_deg,
            u=self.u,
            v=self.v,
            r=self.r,
            rudder_deg=math.degrees(self._delta),
            thrust_pct=abs(thrust) / p.T_max * 100.0,
        )

    def step_manual(
        self,
        dt: float,
        rudder_deg: float,
        engine: float,
    ) -> DynamicsOutput:
        """Advance dynamics with direct rudder and engine inputs (no controllers).

        Used in MANUAL mode to bypass PI speed and PD heading controllers.

        Args:
            dt: Time step in seconds.
            rudder_deg: Rudder angle in degrees, clamped to [-35, +35].
            engine: Engine power fraction [0, 1].

        Returns:
            A DynamicsOutput with the new state.
        """
        p = self.p

        # --- Direct rudder (rate-limited) ---
        delta_cmd = math.radians(max(-35.0, min(35.0, rudder_deg)))
        max_change = p.delta_rate_max * dt
        delta_diff = delta_cmd - self._delta
        delta_diff = max(-max_change, min(max_change, delta_diff))
        self._delta += delta_diff
        delta = self._delta

        # --- Direct thrust from engine fraction ---
        thrust = max(0.0, min(1.0, engine)) * p.T_max

        # --- Equations of motion (same as step()) ---
        u_dot = (
            p.X_u * self.u
            + p.X_uu * self.u * abs(self.u)
            + thrust
        ) / (p.mass + p.X_udot)

        v_dot = (
            p.Y_v * self.v
            + p.Y_vv * self.v * abs(self.v)
            + p.Y_r * self.r
        ) / (p.mass + p.Y_vdot)

        r_dot = (
            p.N_r * self.r
            + p.N_rr * self.r * abs(self.r)
            + p.N_v * self.v
            + p.N_delta * delta
        ) / (p.Iz + p.N_rdot)

        # --- Euler integration ---
        self.u += u_dot * dt
        self.v += v_dot * dt
        self.r += r_dot * dt
        self.psi += self.r * dt

        self.psi = self.psi % (2 * math.pi)

        # --- Kinematic update (world frame) ---
        cos_psi = math.cos(self.psi)
        sin_psi = math.sin(self.psi)
        v_north = self.u * cos_psi - self.v * sin_psi
        v_east = self.u * sin_psi + self.v * cos_psi

        self.lat += math.degrees(v_north * dt / _R_EARTH)
        cos_lat = math.cos(math.radians(self.lat)) or 1e-9
        self.lng += math.degrees(v_east * dt / (_R_EARTH * cos_lat))

        # --- Roll / pitch from dynamics ---
        raw_roll = -p.K_roll * self.u * self.r
        raw_pitch = -p.K_pitch * u_dot
        roll_deg = raw_roll + random.gauss(0, p.roll_noise_sigma_deg)
        pitch_deg = raw_pitch + random.gauss(0, p.pitch_noise_sigma_deg)

        self._prev_u_dot = u_dot

        speed = math.sqrt(self.u ** 2 + self.v ** 2)
        heading_deg = math.degrees(self.psi) % 360

        return DynamicsOutput(
            lat=self.lat,
            lng=self.lng,
            heading_deg=heading_deg,
            speed_mps=speed,
            roll_deg=roll_deg,
            pitch_deg=pitch_deg,
            u=self.u,
            v=self.v,
            r=self.r,
            rudder_deg=math.degrees(self._delta),
            thrust_pct=engine * 100.0,
        )

    # ------------------------------------------------------------------
    # Internal controllers
    # ------------------------------------------------------------------

    def _speed_controller(self, dt: float, desired_speed: float) -> float:
        """PI speed controller → thrust force (N)."""
        p = self.p
        error = desired_speed - self.u
        self._speed_integral += error * dt
        # Anti-windup: clamp integral
        max_integral = p.T_max / (p.speed_Ki + 1e-9)
        self._speed_integral = max(-max_integral, min(max_integral, self._speed_integral))
        command = p.speed_Kp * error + p.speed_Ki * self._speed_integral
        return p.T_max * max(-1.0, min(1.0, command))

    def _heading_controller(self, desired_heading_deg: float) -> float:
        """PD heading controller → rudder angle δ (rad)."""
        p = self.p
        desired_rad = math.radians(desired_heading_deg)
        # Shortest signed heading error
        err = (desired_rad - self.psi + math.pi) % (2 * math.pi) - math.pi
        command = p.heading_Kp * err - p.heading_Kd * self.r
        return max(-p.delta_max, min(p.delta_max, command))
