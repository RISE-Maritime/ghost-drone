---
phase: 02-simulation-and-map-ui
plan: "01"
subsystem: simulation
tags: [python, simulation, state-machine, telemetry, dataclass, enum, stdlib]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: ghost_drone Python package structure (FastAPI app, zenoh bridge scaffold)
provides:
  - "ghost_drone/simulation/ package with SimEngine state machine"
  - "TelemetryFrame dataclass — JSON-serialisable telemetry snapshot"
  - "SimState enum (STOPPED/PLAYING/PAUSED)"
  - "Pure-Python waypoint interpolation with haversine distance, first-order heading lag, Gaussian noise"
affects: [02-02-map-ui, 02-03-websocket-wiring, 03-zenoh-publishing]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Noise applied to output frame only (internal state stays clean — noise does not accumulate)"
    - "Module-level helper functions (_bearing, _angle_diff, _haversine_m) kept outside class for testability"
    - "Discrete first-order heading lag: alpha = dt / (HEADING_TAU + dt)"
    - "Segment-advance while-loop with haversine segment lengths for accurate great-circle interpolation"

key-files:
  created:
    - ghost_drone/simulation/__init__.py
    - ghost_drone/simulation/models.py
    - ghost_drone/simulation/engine.py
  modified: []

key-decisions:
  - "Noise is applied to output TelemetryFrame only — internal lat/lng/heading remain noise-free so noise does not drift over long sessions"
  - "Heading lag uses discrete first-order filter (alpha = dt / (HEADING_TAU + dt)) with TAU=3s — smooth turn behaviour without instability"
  - "Position interpolation uses linear lat/lng lerp within each segment (not spherical) — error negligible for drone-scale distances"
  - "Module-level helper functions instead of static methods — easier to unit-test in isolation"

patterns-established:
  - "Simulation internal state: clean (no noise). Output frame: noisy. Never mix."
  - "Segment-advance loop subtracts segment lengths until progress fits within current segment — handles variable-length segments correctly"

requirements-completed: [SIM-01, SIM-02, SIM-03]

# Metrics
duration: 2min
completed: 2026-02-19
---

# Phase 2 Plan 01: Simulation Engine Summary

**Pure-Python SimEngine state machine with waypoint interpolation, discrete first-order heading lag (TAU=3s), and per-tick Gaussian noise — zero external dependencies**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-02-19T06:14:26Z
- **Completed:** 2026-02-19T06:16:06Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- ghost_drone/simulation/ package with SimEngine and TelemetryFrame ready for WebSocket wiring in plan 02-03
- SimEngine state machine with correct STOPPED/PLAYING/PAUSED lifecycle transitions and auto-stop at route completion
- First-order heading lag (discrete, TAU=3s) so drone smoothly turns rather than snapping to bearing
- Gaussian noise injected into output frame only — internal state stays clean, noise cannot accumulate over long sessions
- Haversine-based segment advance with linear lat/lng interpolation for accurate polyline following

## Task Commits

Each task was committed atomically:

1. **Task 1: Simulation models — TelemetryFrame and SimState** - `aa69a65` (feat)
2. **Task 2: Simulation engine — SimEngine with tick loop, heading lag, noise** - `286687b` (feat)

## Files Created/Modified
- `ghost_drone/simulation/__init__.py` - Package marker
- `ghost_drone/simulation/models.py` - TelemetryFrame dataclass + SimState enum with to_dict()
- `ghost_drone/simulation/engine.py` - SimEngine class with tick(), play(), pause(), stop(), load_route(); module-level _bearing(), _angle_diff(), _haversine_m() helpers

## Decisions Made
- Noise applied to output TelemetryFrame only — internal lat/lng/heading stay clean so noise does not drift or accumulate over long simulation sessions
- Heading lag uses discrete first-order filter (alpha = dt / (HEADING_TAU + dt)) rather than continuous ODE — stable at any dt, no integration needed
- Position interpolated with linear lat/lng lerp within each segment — error is negligible for drone-scale distances (< 2km segments)
- Helper functions kept at module level (not static methods) for easier isolated unit testing

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Self-Check: PASSED

All files confirmed on disk. All commits confirmed in git log.

## Next Phase Readiness
- ghost_drone/simulation/ package is importable and fully functional
- SimEngine.tick() returns TelemetryFrame.to_dict()-ready data for WebSocket broadcasting in plan 02-03
- No blockers; Phase 3 zenoh publishing can attach to the tick loop without restructuring

---
*Phase: 02-simulation-and-map-ui*
*Completed: 2026-02-19*
