---
phase: 03-telemetry-publishing
plan: 01
subsystem: simulation
tags: [keelson, zenoh, protobuf, telemetry, simulation, roll-pitch]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: keelson 0.5.0a9 installed, AppConfig dataclass, proto stubs generated
  - phase: 02-simulation-and-map-ui
    provides: SimState enum, TelemetryFrame dataclass, SimEngine

provides:
  - RollPitchModel sinusoidal oscillator (ghost_drone/simulation/roll_pitch.py)
  - keelson encode pipeline: encode_timestamped_float, encode_location_fix (ghost_drone/zenoh_bridge/telemetry.py)
  - make_key() keelson pubsub key builder (ghost_drone/zenoh_bridge/telemetry.py)
  - SubjectThrottle per-subject rate limiter (ghost_drone/zenoh_bridge/telemetry.py)
  - MPS_TO_KNOTS = 1.94384 unit conversion constant

affects:
  - 03-02 (server wiring — imports these modules directly)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - keelson envelope pattern: enclose(proto.SerializeToString()) for all payloads
    - SubjectThrottle monotonic-clock rate limiter for per-subject Hz gating

key-files:
  created:
    - ghost_drone/simulation/roll_pitch.py
    - ghost_drone/zenoh_bridge/telemetry.py
  modified: []

key-decisions:
  - "RollPitchModel noise applied on tick() output only — elapsed_s stays clean so noise cannot accumulate across ticks"
  - "SubjectThrottle uses time.monotonic() (not time.time()) to avoid wall-clock jumps affecting rate limiting"
  - "encode_timestamped_float uses proto float32 (TimestampedFloat.value) — assertions require 1e-3 tolerance, not 1e-6"

patterns-established:
  - "keelson payload pattern: create proto, set timestamp.FromNanoseconds(time.time_ns()), serialize, enclose"
  - "Throttle pattern: SubjectThrottle.should_publish(subject, rate_hz) gates all telemetry publish decisions"

requirements-completed: [TELEM-01, TELEM-02, TELEM-03, TELEM-04]

# Metrics
duration: 4min
completed: 2026-02-19
---

# Phase 3 Plan 01: Telemetry Backend Modules Summary

**Sinusoidal RollPitchModel oscillator and keelson encode pipeline (TimestampedFloat, LocationFix, make_key, SubjectThrottle) as isolated, testable modules ready for server wiring.**

## Performance

- **Duration:** ~4 min
- **Started:** 2026-02-19T11:01:04Z
- **Completed:** 2026-02-19T11:05:00Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- RollPitchModel produces sinusoidal roll/pitch in degrees with Gaussian noise; elapsed time only advances in PLAYING state; reset() zeroes phase for clean restarts
- encode_timestamped_float() and encode_location_fix() produce keelson-enclosed protobuf bytes; verified with keelson.uncover() round-trip
- make_key() constructs correct keelson pubsub key expressions (`realm/@v0/entity_id/pubsub/subject/source_id` format)
- SubjectThrottle rate-limits correctly: first call within a period returns True, immediate second call returns False
- MPS_TO_KNOTS = 1.94384 constant available for speed unit conversion in server wiring

## Task Commits

Each task was committed atomically:

1. **Task 1: RollPitchModel sinusoidal oscillator** - `3b97653` (feat)
2. **Task 2: keelson encode pipeline and SubjectThrottle** - `d2a0bbc` (feat)

## Files Created/Modified
- `ghost_drone/simulation/roll_pitch.py` - RollPitchModel class with tick()/reset() interface
- `ghost_drone/zenoh_bridge/telemetry.py` - encode_timestamped_float, encode_location_fix, make_key, SubjectThrottle, MPS_TO_KNOTS

## Decisions Made
- RollPitchModel noise applied to tick() output only — elapsed_s internal state stays clean so noise cannot accumulate across ticks
- SubjectThrottle uses time.monotonic() for rate limiting (immune to wall-clock jumps or NTP adjustments)
- encode_timestamped_float uses proto float32 (TimestampedFloat.value is 32-bit); test assertions use 1e-3 tolerance, consistent with prior plan 01-02 decision

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Both modules are importable and verified against live keelson 0.5.0a9 with correct key format `ghost-drone/@v0/sim001/pubsub/heading_true_north_deg/imu/0`
- Server wiring plan (03-02) can import RollPitchModel and all telemetry helpers directly
- No blockers

---
*Phase: 03-telemetry-publishing*
*Completed: 2026-02-19*
