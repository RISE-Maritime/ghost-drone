---
phase: 03-telemetry-publishing
plan: 02
subsystem: api
tags: [fastapi, zenoh, websocket, keelson, telemetry, lifespan]

# Dependency graph
requires:
  - phase: 03-01
    provides: RollPitchModel oscillator, SubjectThrottle rate limiter, encode_timestamped_float, encode_location_fix, make_key, ZenohPublisher

provides:
  - create_app(cfg: AppConfig) factory that wires ZenohPublisher into FastAPI lifespan
  - PublishSettings and SubjectConfig dataclasses for per-connection publish configuration
  - _publish_telemetry() helper that publishes all 5 subjects via SubjectThrottle with Gaussian lat/lng noise
  - Extended WebSocket tick loop: every frame includes roll and pitch fields
  - update_settings WS message handler for live per-subject and oscillation param updates
  - __main__.py updated to use create_app(cfg) so the real zenoh endpoint is used at startup

affects:
  - 03-03 (browser UI — depends on roll/pitch in WS frame)
  - 04-video-streaming (imports app via create_app pattern)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - FastAPI lifespan context manager for daemon thread lifecycle (ZenohPublisher start/stop)
    - App factory pattern: create_app(cfg) allows cfg to be passed before lifespan runs
    - Per-connection publish state: PublishSettings, RollPitchModel, SubjectThrottle are connection-local
    - websocket.app.state.publisher accesses lifespan-injected publisher from inside WS handler

key-files:
  created: []
  modified:
    - ghost_drone/server.py
    - ghost_drone/__main__.py

key-decisions:
  - "ZenohPublisher is started once at app startup and stopped on shutdown via FastAPI lifespan — not per-connection"
  - "PublishSettings, RollPitchModel, SubjectThrottle are connection-local (instantiated per WebSocket connection)"
  - "roll_pitch.reset() and throttle.reset() called on STOPPED transition only (prev_state check prevents repeated resets)"
  - "Location noise is applied in _publish_telemetry at publish time using settings.location_noise_sigma_m (user-configurable, not from SimEngine)"
  - "update_settings applies oscillation params to the live RollPitchModel immediately so changes take effect within the same connection"

patterns-established:
  - "Lifespan pattern: app.state.publisher is the single ZenohPublisher instance shared across connections"
  - "Factory pattern: create_app(cfg) called in __main__.py after probe_zenoh so cfg is valid before lifespan"
  - "Transition detection: prev_state pattern for one-time actions on state entry"

requirements-completed: [TELEM-01, TELEM-02, TELEM-03, TELEM-04]

# Metrics
duration: 2min
completed: 2026-02-19
---

# Phase 3 Plan 02: Server Wiring Summary

**FastAPI create_app factory with ZenohPublisher lifespan, PublishSettings, and extended WebSocket frame publishing all 5 telemetry subjects with per-subject rate throttling and user-configurable Gaussian location noise**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-19T10:23:57Z
- **Completed:** 2026-02-19T10:25:38Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- `create_app(cfg: AppConfig)` factory wires `ZenohPublisher` into FastAPI lifespan so the daemon starts once at app startup and stops cleanly on shutdown
- Extended tick loop sends `roll` and `pitch` in every WebSocket frame; publishes all 5 subjects to zenoh only when `SimState.PLAYING`
- `update_settings` WS message handler allows live per-subject rate_hz/source_id and global oscillation/noise parameter updates from the browser
- `__main__.py` updated to the `create_app(cfg)` pattern so the real zenoh endpoint from `ghost_drone.toml` is used at startup
- All 17 existing pytest tests continue to pass

## Task Commits

1. **Task 1: PublishSettings dataclass and create_app factory** - `7fc06cd` (feat)
2. **Task 2: Extended tick loop + update_settings handler + __main__.py update** - `5d61ee5` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified

- `ghost_drone/server.py` — Replaced with create_app factory, PublishSettings/SubjectConfig dataclasses, _publish_telemetry helper, extended tick_loop with roll/pitch, update_settings handler
- `ghost_drone/__main__.py` — Updated server import from `app` to `create_app(cfg)` factory call

## Decisions Made

- `ZenohPublisher` is connection-global (lifespan), while `PublishSettings`, `RollPitchModel`, and `SubjectThrottle` are connection-local — this allows per-client settings without a shared zenoh session per connection
- `prev_state` pattern used for one-time reset on STOPPED transition so `roll_pitch.reset()` and `throttle.reset()` are called exactly once per stop, not on every STOPPED tick
- Location noise applied in `_publish_telemetry` using `settings.location_noise_sigma_m` — keeps SimEngine noise and publish noise separate and independently configurable

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Server now emits `roll` and `pitch` in every WebSocket frame — 03-03 browser UI plan can display these values
- All 5 subjects publish to zenoh during PLAYING state with per-subject throttling
- `update_settings` handler ready for browser UI controls in 03-03

---
*Phase: 03-telemetry-publishing*
*Completed: 2026-02-19*
