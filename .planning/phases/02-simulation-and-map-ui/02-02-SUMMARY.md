---
phase: 02-simulation-and-map-ui
plan: "02"
subsystem: testing
tags: [pytest, simulation, unit-tests, tdd, ghost_drone]

# Dependency graph
requires:
  - phase: 02-01
    provides: SimEngine, TelemetryFrame, SimState — pure-Python simulation state machine
provides:
  - "12 pytest unit tests locking in SimEngine behavioural contract"
  - "tests/test_sim_engine.py — 10 deterministic tests for state transitions, heading lag, helpers"
  - "tests/test_sim_noise.py — 2 statistical tests for noise non-determinism"
affects: [02-03, ci]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Direct import of module-level helper functions for isolated unit testing"
    - "Statistical tests using statistics.stdev to verify noise is active without seeding"
    - "Internal-state assertions (_lat, _lng) used alongside frame assertions to bypass output noise"

key-files:
  created:
    - tests/test_sim_engine.py
    - tests/test_sim_noise.py
  modified: []

key-decisions:
  - "Pause speed test uses < 10x SPEED_NOISE_SIGMA_MPS threshold rather than == 0.0 — engine applies Gaussian noise even when paused, so exact-zero assertion is flawed"

patterns-established:
  - "Speed assertions in paused/stopped states must account for Gaussian noise floor (max 0.0, gauss + noise)"

requirements-completed: [SIM-01, SIM-02, SIM-03]

# Metrics
duration: 4min
completed: 2026-02-19
---

# Phase 2 Plan 02: Simulation Engine Unit Tests Summary

**12-test pytest suite locking in SimEngine contract: state transitions, heading lag convergence, route auto-stop, helper function correctness, and statistical noise non-determinism**

## Performance

- **Duration:** ~4 min
- **Started:** 2026-02-19T06:18:00Z
- **Completed:** 2026-02-19T06:22:00Z
- **Tasks:** 1 (TDD: write tests + green pass)
- **Files modified:** 2

## Accomplishments

- 10 deterministic tests in `tests/test_sim_engine.py` covering: load_route state, ValueError on <2 waypoints, play/pause/stop transitions, heading lag convergence to ~90 deg on east route, route auto-stop on completion, and _bearing/_angle_diff/_haversine_m helpers
- 2 statistical tests in `tests/test_sim_noise.py` confirming noise std-dev > 0 and < 0.001, and that two independent runs produce different heading sequences
- Full suite (17 tests total, including Phase 1 round-trip tests) passes with zero failures

## Task Commits

Each task was committed atomically:

1. **Task 1: Write and verify test suites** - `0ead654` (test)

**Plan metadata:** (to follow in final commit)

_Note: TDD plan — tests written first, then verified GREEN against existing engine implementation_

## Files Created/Modified

- `/workspace/tests/test_sim_engine.py` - 10 deterministic SimEngine tests
- `/workspace/tests/test_sim_noise.py` - 2 statistical noise tests

## Decisions Made

- Pause speed assertion uses `< SPEED_NOISE_SIGMA_MPS * 10` rather than `== 0.0`: the engine applies `max(0.0, gauss(0, sigma) + effective_speed)` in all states. When paused, effective_speed is 0 but positive noise samples produce non-zero output. An exact-zero assertion fails non-deterministically.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed incorrect pause speed assertion**
- **Found during:** Task 1 (test_pause_freezes_position)
- **Issue:** Plan spec said `assert frame.speed == 0.0` but engine applies `max(0.0, speed_noise)` even when paused — Gaussian noise with sigma=0.05 m/s produces positive values non-deterministically
- **Fix:** Changed assertion to `frame.speed < SPEED_NOISE_SIGMA_MPS * 10` (0.5 m/s threshold — far above noise floor, far below cruise speed)
- **Files modified:** tests/test_sim_engine.py
- **Verification:** All 12 tests pass consistently; threshold verified against sigma value imported from engine
- **Committed in:** 0ead654 (task commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 — test assertion corrected to match engine design)
**Impact on plan:** Necessary correctness fix — assertion was incompatible with stated engine design (noise on all outputs). No scope creep.

## Issues Encountered

None — the engine implementation from 02-01 was complete and all tests passed after the pause assertion fix.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- SimEngine contract is fully locked in with regression-catching tests
- Ready for 02-03: WebSocket tick broadcaster (engine -> FastAPI -> browser)
- All 17 tests will serve as CI regression guard during UI integration work

---
*Phase: 02-simulation-and-map-ui*
*Completed: 2026-02-19*

## Self-Check: PASSED

- tests/test_sim_engine.py: FOUND
- tests/test_sim_noise.py: FOUND
- 02-02-SUMMARY.md: FOUND
- commit 0ead654: FOUND
