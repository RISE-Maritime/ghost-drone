---
phase: 01-foundation
plan: "02"
subsystem: testing
tags: [pytest, keelson, zenoh, github-actions, ci, uv, protobuf]

# Dependency graph
requires:
  - phase: 01-01
    provides: "keelson installed and importable (SHA e47e52fd), protobuf stubs generated, ghost_drone/zenoh_bridge/__init__.py scaffold present"
provides:
  - "5-test keelson round-trip pytest suite verifying enclose/uncover in-process with no live zenoh session"
  - "ZenohPublisher daemon thread + queue.Queue scaffold ready for Phase 3 wiring"
  - "GitHub Actions CI running pytest on push to main and all PRs"
  - "uv.lock committed so CI uv sync --locked succeeds deterministically"
affects:
  - 02-simulation
  - 03-telemetry
  - 04-camera

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Pure unit tests with no external services — keelson enclose/uncover tested entirely in-process"
    - "ZenohPublisher: queue.Queue + daemon thread pattern established for Phase 3 async-safe publishing"
    - "CI: astral-sh/setup-uv@v7 with enable-cache:true + uv sync --locked --all-extras + uv run pytest"
    - "Float32 tolerance: TimestampedFloat stores value as float32; use 1e-3 tolerance (not 1e-6) for value assertions"

key-files:
  created:
    - ghost_drone/zenoh_bridge/publisher.py
    - tests/__init__.py
    - tests/test_keelson_roundtrip.py
    - .github/workflows/ci.yml
  modified:
    - uv.lock

key-decisions:
  - "Float32 tolerance 1e-3 in test_enclose_uncover_payload_value_survives: TimestampedFloat.value is proto float (32-bit); 1e-6 tolerance is tighter than float32 precision allows"
  - "uv.lock regenerated but no packages changed (35 packages, Resolved in 1ms)"
  - "CI uses uv sync --locked --all-extras to ensure dev extras (pytest, protoc-wheel-0, grpcio-tools) are installed in CI"

patterns-established:
  - "Pattern: Float32 proto value assertions require tolerance >= 1e-3 (not 1e-6)"
  - "Pattern: ZenohPublisher._run() owns the zenoh session for its full lifetime — one session per thread"

requirements-completed: [SETUP-01]

# Metrics
duration: 2min
completed: 2026-02-19
---

# Phase 1 Plan 02: Keelson Round-Trip Tests and CI Summary

**5 pytest tests proving keelson enclose/uncover in-process correctness + ZenohPublisher daemon thread scaffold + GitHub Actions CI gating every push and PR**

## Performance

- **Duration:** ~2 minutes
- **Started:** 2026-02-19T04:52:51Z
- **Completed:** 2026-02-19T04:54:27Z
- **Tasks:** 2
- **Files created/modified:** 5

## Accomplishments

- 5 pure unit tests in `tests/test_keelson_roundtrip.py` covering bytes recovery, timestamp ordering, value round-trip, and subject validation — all pass with no live zenoh session
- `ZenohPublisher` class in `ghost_drone/zenoh_bridge/publisher.py` provides the daemon thread + `queue.Queue` scaffold ready for Phase 3 wiring
- `.github/workflows/ci.yml` triggers on push to `main` and all pull requests; runs `uv run pytest tests/ -v` after `uv sync --locked --all-extras`
- `uv.lock` verified up-to-date and committed (35 packages, no changes from Plan 01)
- `heading_true_north_deg` confirmed as a well-known keelson subject via `keelson.is_subject_well_known()`

## Task Commits

Each task was committed atomically:

1. **Task 1: ZenohPublisher scaffold and keelson round-trip tests** - `1a2158a` (feat)
2. **Task 2: GitHub Actions CI workflow and updated lockfile** - `a387bac` (chore)

**Plan metadata:** (docs commit, see below)

## Files Created/Modified

- `ghost_drone/zenoh_bridge/publisher.py` - ZenohPublisher: daemon thread + queue.Queue scaffold, not wired to simulation until Phase 3
- `tests/__init__.py` - Empty package marker for pytest discovery
- `tests/test_keelson_roundtrip.py` - 5 pure unit tests for keelson enclose/uncover round-trip and subject validation
- `.github/workflows/ci.yml` - GitHub Actions CI: triggers on push/main and pull_request; job `test` runs pytest via uv
- `uv.lock` - Regenerated (no package changes; 35 packages resolved in 1ms)

## Decisions Made

1. **Float32 tolerance fix**: `TimestampedFloat.value` is a proto `float` field (32-bit IEEE 754). Python `float` is 64-bit, so assigning `123.456` and reading it back yields `123.45600128...`. Tolerance `1e-6` fails; `1e-3` is correct for float32 assertions.

2. **uv.lock unchanged**: The `uv lock` command resolved in 1ms with no package changes — lockfile was already current from Plan 01.

3. **CI all-extras flag**: `uv sync --locked --all-extras` is required in CI to install the `dev` extras group (pytest, protoc-wheel-0, grpcio-tools). Without `--all-extras`, pytest would not be installed and `uv run pytest` would fail.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Float32 precision tolerance too tight in test_enclose_uncover_payload_value_survives**
- **Found during:** Task 1 (test execution)
- **Issue:** `assert abs(recovered_msg.value - 123.456) < 1e-6` failed because `TimestampedFloat.value` is a protobuf `float` (32-bit), not `double`. Round-trip through float32 gives `123.45600128173828`, which differs by ~1.28e-6 — just over the 1e-6 threshold.
- **Fix:** Changed tolerance to `1e-3` which is appropriate for float32 precision (~7 significant decimal digits).
- **Files modified:** `tests/test_keelson_roundtrip.py`
- **Verification:** All 5 tests pass with `uv run pytest tests/ -v`
- **Committed in:** `1a2158a` (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Essential correctness fix — the tolerance mismatch would have caused CI to fail on every run. No scope creep.

## Issues Encountered

None — after the float32 tolerance fix, all tests passed immediately. No import errors, no dependency issues.

## User Setup Required

None — no external service configuration required. CI is configured to run automatically on push/PR once the workflow file is committed.

**Note for fresh clone:** After `uv sync --all-extras`, run `uv run bash scripts/generate_keelson_protos.sh` to compile the keelson protobuf stubs (required by both the app and the tests). This is unchanged from Plan 01.

## Next Phase Readiness

- Phase 2 (simulation) can proceed immediately — the zenoh_bridge scaffold is in place and the keelson API is proven working
- CI will gate every merge going forward
- No blockers. The one concern from Plan 01 remains: re-verify keelson SHA if >30 days pass before Phase 2 executes.

## Self-Check: PASSED

All created files found on disk. All task commits verified in git history.

- FOUND: ghost_drone/zenoh_bridge/publisher.py
- FOUND: tests/__init__.py
- FOUND: tests/test_keelson_roundtrip.py
- FOUND: .github/workflows/ci.yml
- FOUND: uv.lock
- FOUND: .planning/phases/01-foundation/01-02-SUMMARY.md
- COMMIT 1a2158a: verified (feat(01-02): ZenohPublisher scaffold and keelson round-trip tests)
- COMMIT a387bac: verified (chore(01-02): GitHub Actions CI workflow and updated lockfile)
- COMMIT 5672675: verified (docs(01-02): complete keelson round-trip tests and CI plan)

---
*Phase: 01-foundation*
*Completed: 2026-02-19*
