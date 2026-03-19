"""
Simulation data models for ghost_drone.

Provides TelemetryFrame and OperationMode for the simulation engine.
No external dependencies — stdlib only (enum, dataclasses).
"""

from __future__ import annotations

import enum
from dataclasses import dataclass


class OperationMode(enum.Enum):
    """Drone operation mode."""
    AUTONOMOUS = "autonomous"  # follow loaded route via LOS guidance
    OPERATED   = "operated"    # direct keyboard heading/thrust control


class GeofenceAction(enum.Enum):
    """Action to take when a drone breaches the geofence boundary."""
    COAST = "coast"
    BRAKE = "brake"


@dataclass
class TelemetryFrame:
    """A single telemetry snapshot from the simulation engine.

    All position/motion fields include Gaussian noise injected by the engine.
    """
    lat: float      # degrees WGS-84
    lng: float      # degrees WGS-84
    heading: float  # degrees, true north, [0, 360)
    speed: float    # m/s
    roll: float = 0.0   # degrees (positive = starboard down)
    pitch: float = 0.0  # degrees (positive = bow down)
    rudder_deg: float = 0.0   # rudder angle, degrees (positive = starboard)
    thrust_pct: float = 0.0   # engine thrust, percentage of max [0, 100]
    operation_mode: OperationMode = OperationMode.OPERATED
    geofence_breached: bool = False

    def to_dict(self) -> dict:
        """Return a JSON-serialisable dict (state hardcoded for backward compat)."""
        return {
            "lat":     self.lat,
            "lng":     self.lng,
            "heading": self.heading,
            "speed":   self.speed,
            "state":   "playing",
            "roll":    self.roll,
            "pitch":   self.pitch,
            "rudder_deg":  self.rudder_deg,
            "thrust_pct":  self.thrust_pct,
            "operation_mode": self.operation_mode.value,
            "geofence_breached": self.geofence_breached,
        }
