"""
Statistical unit tests for SimEngine noise behaviour.

Tests verify that noise is non-zero (variance > 0) and non-deterministic
(two independent runs produce different sequences).
"""

import statistics

from ghost_drone.simulation.engine import SimEngine
from ghost_drone.simulation.models import SimState


ROUTE = [(57.0, 11.0), (57.1, 11.1)]


def _collect_lat_frames(n_ticks: int = 200, dt: float = 0.05) -> list[float]:
    """Return lat values from *n_ticks* PLAYING frames."""
    engine = SimEngine()
    engine.load_route(ROUTE)
    engine.play()

    lats = []
    for _ in range(n_ticks):
        frame = engine.tick(dt)
        if frame.state == SimState.PLAYING:
            lats.append(frame.lat)
    return lats


def test_noise_is_nonzero_across_ticks():
    """Output lat values should show non-zero but small variance (noise is active)."""
    lats = _collect_lat_frames()
    assert len(lats) > 0, "Expected PLAYING frames to be collected"

    std_dev = statistics.stdev(lats)
    assert std_dev > 0, "Noise std-dev should be > 0 (noise must be applied)"
    assert std_dev < 0.001, f"Noise std-dev {std_dev} is too large — sigma too big"


def test_noise_values_vary_between_runs():
    """Two independent SimEngine instances with the same route produce different heading sequences."""
    route = [(57.0, 11.0), (57.01, 11.01)]
    n_ticks = 50
    dt = 0.05

    def collect_headings(engine: SimEngine) -> list[float]:
        engine.load_route(route)
        engine.play()
        headings = []
        for _ in range(n_ticks):
            frame = engine.tick(dt)
            if frame.state == SimState.PLAYING:
                headings.append(frame.heading)
        return headings

    engine_a = SimEngine()
    engine_b = SimEngine()

    headings_a = collect_headings(engine_a)
    headings_b = collect_headings(engine_b)

    # The two sequences must differ — identical sequences would indicate no noise
    assert headings_a != headings_b, (
        "Two independent runs produced identical heading sequences — noise is not random"
    )
