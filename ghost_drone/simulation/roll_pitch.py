"""
ghost_drone/simulation/roll_pitch.py

Sinusoidal roll/pitch oscillator for simulated drone telemetry.

RollPitchModel produces roll and pitch angles (degrees) based on elapsed
simulation time. When the simulation is PLAYING, time advances each tick.
When PAUSED or STOPPED, elapsed time freezes so the last oscillation point
is held.

No cross-package dependencies — stdlib only (math, random).
"""

from __future__ import annotations

import math
import random

from ghost_drone.simulation.models import SimState


class RollPitchModel:
    """Sinusoidal roll and pitch oscillator with Gaussian noise.

    All five amplitude/period/noise attributes are mutable so the server
    wiring plan (03-02) can update them live from browser settings.
    """

    def __init__(self) -> None:
        self.roll_amplitude_deg: float = 5.0
        self.roll_period_s: float = 10.0
        self.pitch_amplitude_deg: float = 3.0
        self.pitch_period_s: float = 8.0
        self.noise_sigma_deg: float = 0.5
        self._elapsed_s: float = 0.0

    def reset(self) -> None:
        """Zero elapsed time. Call when the simulation stops."""
        self._elapsed_s = 0.0

    def tick(self, dt: float, state: SimState) -> tuple[float, float]:
        """Advance the oscillator and return (roll_deg, pitch_deg).

        Elapsed time advances only when state is PLAYING. When PAUSED or
        STOPPED the oscillator is frozen at the last computed phase, so the
        returned values remain consistent between ticks.

        Args:
            dt: Time step in seconds.
            state: Current simulation state.

        Returns:
            Tuple of (roll_deg, pitch_deg) both in degrees.
        """
        if state is SimState.PLAYING:
            self._elapsed_s += dt

        roll_deg = (
            self.roll_amplitude_deg
            * math.sin(2 * math.pi * self._elapsed_s / self.roll_period_s)
            + random.gauss(0, self.noise_sigma_deg)
        )
        pitch_deg = (
            self.pitch_amplitude_deg
            * math.sin(2 * math.pi * self._elapsed_s / self.pitch_period_s)
            + random.gauss(0, self.noise_sigma_deg)
        )
        return roll_deg, pitch_deg
