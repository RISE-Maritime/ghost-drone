"""
Simulation data models for ghost_drone.

Provides TelemetryFrame and SimState for the simulation engine.
No external dependencies — stdlib only (enum, dataclasses).
"""

from __future__ import annotations

import enum
from dataclasses import dataclass


class SimState(enum.Enum):
    """Drone simulation lifecycle states."""
    STOPPED = "stopped"   # drone at first waypoint, route editable
    PLAYING = "playing"   # drone advancing along route
    PAUSED  = "paused"    # drone frozen mid-route, route locked


@dataclass
class TelemetryFrame:
    """A single telemetry snapshot from the simulation engine.

    All position/motion fields include Gaussian noise injected by the engine.
    """
    lat: float      # degrees WGS-84
    lng: float      # degrees WGS-84
    heading: float  # degrees, true north, [0, 360)
    speed: float    # m/s
    state: SimState # current engine state

    def to_dict(self) -> dict:
        """Return a JSON-serialisable dict (state is the enum .value string)."""
        return {
            "lat":     self.lat,
            "lng":     self.lng,
            "heading": self.heading,
            "speed":   self.speed,
            "state":   self.state.value,
        }
