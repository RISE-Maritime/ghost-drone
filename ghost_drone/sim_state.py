"""
ghost_drone/sim_state.py

Global simulation state container. Holds the single SimEngine instance and
all publish-related configuration that was previously per-WebSocket-connection.

Thread safety: control commands arrive on the zenoh daemon thread; the tick
loop runs on asyncio. SimEngine methods do simple attribute assignments
protected by the GIL. Adequate for single-operator tool.
"""

import dataclasses
import threading
from typing import Dict, Set

from ghost_drone.simulation.engine import SimEngine
from ghost_drone.zenoh_bridge.telemetry import SubjectThrottle

# Supported fault types
FAULT_TYPES = {"drop", "stuck", "nan", "wrong_rate"}


class FaultState:
    """Tracks active faults per subject. Thread-safe."""

    def __init__(self) -> None:
        self._lock = threading.Lock()
        self._faults: Dict[str, Set[str]] = {}

    def inject(self, subject: str, fault_type: str) -> None:
        with self._lock:
            self._faults.setdefault(subject, set()).add(fault_type)

    def clear(self, subject: str, fault_type: str) -> None:
        with self._lock:
            if subject in self._faults:
                self._faults[subject].discard(fault_type)
                if not self._faults[subject]:
                    del self._faults[subject]

    def has_fault(self, subject: str, fault_type: str) -> bool:
        with self._lock:
            return fault_type in self._faults.get(subject, set())

    def active_faults(self, subject: str) -> Set[str]:
        with self._lock:
            return set(self._faults.get(subject, set()))

    def all_faults(self) -> Dict[str, list]:
        with self._lock:
            return {s: sorted(f) for s, f in self._faults.items()}


@dataclasses.dataclass
class SubjectConfig:
    rate_hz: float = 1.0
    source_id: str = "imu/0"


@dataclasses.dataclass
class PublishSettings:
    subjects: Dict[str, SubjectConfig] = dataclasses.field(
        default_factory=lambda: {
            "location_fix":            SubjectConfig(rate_hz=1.0, source_id="gnss/0"),
            "heading_true_north_deg":  SubjectConfig(rate_hz=1.0, source_id="imu/0"),
            "speed_over_ground_knots": SubjectConfig(rate_hz=1.0, source_id="imu/0"),
            "roll_deg":                SubjectConfig(rate_hz=1.0, source_id="imu/0"),
            "pitch_deg":               SubjectConfig(rate_hz=1.0, source_id="imu/0"),
        }
    )
    location_noise_sigma_m: float = 0.5

    def to_dict(self) -> dict:
        """Serialise to a JSON-friendly dict for queryable replies."""
        return {
            "subjects": {
                k: {"rate_hz": v.rate_hz, "source_id": v.source_id}
                for k, v in self.subjects.items()
            },
            "location_noise_sigma_m": self.location_noise_sigma_m,
        }


class SimGlobals:
    """Single global instance holding all simulation state."""

    def __init__(self) -> None:
        self.engine = SimEngine()
        self.cruise_speed_mps: float = 1.5
        self.settings = PublishSettings()
        self.throttle = SubjectThrottle()
        self.faults = FaultState()

    def apply_settings(self, msg: dict) -> None:
        """Apply a settings update dict (from frontend or zenoh query)."""
        for subj, sc_data in msg.get("subjects", {}).items():
            if subj in self.settings.subjects:
                if "rate_hz" in sc_data:
                    self.settings.subjects[subj].rate_hz = float(sc_data["rate_hz"])
                if "source_id" in sc_data:
                    self.settings.subjects[subj].source_id = str(sc_data["source_id"])
        if "location_noise_sigma_m" in msg:
            self.settings.location_noise_sigma_m = float(msg["location_noise_sigma_m"])
