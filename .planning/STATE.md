# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-18)

**Core value:** Draw a route, hit play, get a fully keelson-compatible drone publishing telemetry and video — no hardware required.
**Current focus:** Phase 2 — Simulation and Map UI

## Current Position

Phase: 3 of 4 (Telemetry Publishing)
Plan: 2 of 3 in current phase (03-02 complete)
Status: Phase 03 in progress — plan 03-02 complete
Last activity: 2026-02-19 — Executed plan 03-02

Progress: [███████░░░] 67%

## Performance Metrics

**Velocity:**
- Total plans completed: 3
- Average duration: ~3 min
- Total execution time: ~0.1 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 1. Foundation | 2/2 | ~6 min | ~3 min |
| 2. Simulation and Map UI | 3/3 | ~9 min | ~3 min |
| 3. Telemetry Publishing | 2/3 | ~6 min | ~3 min |

**Recent Trend:**
- Last 5 plans: 01-01 (4 min), 01-02 (2 min), 02-01 (2 min), 02-02 (4 min)
- Trend: Fast and consistent

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- Python stack, FastAPI + uvicorn, zenoh daemon thread pattern (all pre-roadmap — see PROJECT.md)
- keelson 0.5.0a9 must be pinned to a specific GitHub commit SHA (alpha SDK, API may shift)
- zenoh-python is sync-only (dropped async in v0.6); all publishing must go through a daemon thread + queue.Queue
- keelson pinned to git SHA e47e52fd (dev branch HEAD, 2026-02-19) — plan 01-01
- keelson dev branch does NOT commit pre-generated _pb2.py files; run scripts/generate_keelson_protos.sh after uv sync on fresh clone — plan 01-01
- zenoh probe uses 3000ms open_timeout (vs default ~10s) to fail fast — plan 01-01
- STATIC_DIR is package-relative (Path(__file__).parent.parent/static) not CWD-relative — plan 01-01
- Subject validation is warning-only in startup banner (not hard exit); user decision overrides roadmap criterion 4 — plan 01-01
- Float32 proto value assertions require tolerance >= 1e-3 (not 1e-6) — TimestampedFloat.value is 32-bit — plan 01-02
- CI uses uv sync --locked --all-extras to ensure pytest and protoc tools are installed — plan 01-02
- Simulation noise applied to output TelemetryFrame only — internal state stays clean, noise cannot accumulate — plan 02-01
- Heading lag uses discrete first-order filter (alpha = dt / (HEADING_TAU + dt), TAU=3s) for stable smooth turns — plan 02-01
- Position interpolated with linear lat/lng lerp per segment (not spherical) — negligible error for drone-scale distances — plan 02-01
- Simulation helper functions kept at module level (not static methods) for easier isolated unit testing — plan 02-01
- [Phase 02-02]: Pause speed test uses < 10x SPEED_NOISE_SIGMA_MPS threshold — engine applies Gaussian noise even when paused, exact-zero assertion is flawed — plan 02-02
- [Phase 02-03]: Play re-enables after Pause via canPlay including simState==='paused'; engine.play() resumes mid-route without route reload — plan 02-03
- [Phase 02-03]: isZooming flag (zoomstart/zoomend) suppresses panTo during zoom animations to eliminate map shake at 20 Hz update rate — plan 02-03
- [Phase 02-03]: Waypoint draggability gated on drawModeActive && simState==='stopped'; updateWaypointDraggability() called on every state change — plan 02-03
- [Phase 02-03]: Default map center is Lindholmen, Gothenburg: [57.7069, 11.9381] zoom 15 — operational area for maritime simulation — plan 02-03
- [Phase 03-01]: RollPitchModel noise applied to tick() output only — elapsed_s internal state stays clean so noise cannot accumulate across ticks — plan 03-01
- [Phase 03-01]: SubjectThrottle uses time.monotonic() for rate limiting (immune to wall-clock jumps or NTP adjustments) — plan 03-01
- [Phase 03-01]: encode_timestamped_float uses proto float32 (TimestampedFloat.value is 32-bit); test assertions use 1e-3 tolerance — plan 03-01
- [Phase 03-02]: ZenohPublisher is lifespan-global (one per app); PublishSettings, RollPitchModel, SubjectThrottle are connection-local — plan 03-02
- [Phase 03-02]: prev_state pattern for one-time reset on STOPPED transition — roll_pitch.reset() and throttle.reset() called exactly once per stop — plan 03-02
- [Phase 03-02]: Location noise applied in _publish_telemetry using settings.location_noise_sigma_m (user-configurable); SimEngine noise and publish noise kept separate — plan 03-02

### Pending Todos

None yet.

### Blockers/Concerns

- keelson protobuf stubs must be manually generated on fresh clone (scripts/generate_keelson_protos.sh)
- keelson SHA should be re-verified if >30 days pass before Phase 2 starts (pinned 2026-02-19)
- Webcam availability: no synthetic fallback in v1; target environment must have a connected webcam

## Session Continuity

Last session: 2026-02-19
Stopped at: Completed 03-02-PLAN.md — server.py wired with create_app factory, ZenohPublisher lifespan, extended tick loop with roll/pitch publishing
Resume file: None
