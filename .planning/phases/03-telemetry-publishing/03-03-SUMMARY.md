---
phase: 03-telemetry-publishing
plan: "03"
subsystem: ui
tags: [sparkline, websocket, gauges, settings-modal, telemetry-sidebar, html, javascript]

# Dependency graph
requires:
  - phase: 03-02
    provides: Extended WS telemetry frames with roll and pitch fields from server
provides:
  - Right-side telemetry sidebar with 4 gauge+sparkline pairs (heading, speed, roll, pitch)
  - Settings modal with per-subject rate/source table and oscillation/noise sliders
  - update_settings WS message sender from browser to server
affects:
  - 04-video-streaming

# Tech tracking
tech-stack:
  added:
    - "@fnando/sparkline@0.3.10 via CDN (sparkline.sparkline(svgEl, data) UMD API)"
  patterns:
    - "Layout: #app-wrapper > #main-area (#map + #telemetry-sidebar) + #bottom-bar"
    - "Telemetry history rolling window: push+shift, capped at HISTORY_SAMPLES (600)"
    - "onTelemetryFrame() branches on frame.state: stopped clears, playing updates, both redraw sparklines"
    - "Sparkline guarded by history[key].length > 1 to avoid TypeError on empty arrays"
    - "Speed converted m/s to knots (x 1.94384) for gauge display"
    - "Settings modal built by buildSubjectRows() on DOMContentLoaded"
    - "Slider live-label pattern: input event updates adjacent <span>"

key-files:
  created: []
  modified:
    - static/index.html

key-decisions:
  - "@fnando/sparkline UMD global is `sparkline` (module object); call as sparkline.sparkline(el, data) — no fallback needed per confirmed API"
  - "Both Task 1 and Task 2 modify static/index.html; implemented and committed as single atomic change to avoid partial DOM state"
  - "Settings modal placed outside #app-wrapper (direct body child) to ensure fixed overlay covers the full viewport including sidebar"

patterns-established:
  - "Telemetry sidebar pattern: gauge-block > gauge-label + gauge-value + sparkline-svg"
  - "WS frame telemetry dispatch: onTelemetryFrame() called at end of ws.onmessage after marker/button updates"
  - "update_settings message structure: {type, subjects: {subj: {rate_hz, source_id}}, roll/pitch amp/period, location_noise_sigma_m}"

requirements-completed:
  - UI-05

# Metrics
duration: 2min
completed: 2026-02-19
---

# Phase 03 Plan 03: Telemetry Sidebar and Settings Modal Summary

**Right-side telemetry sidebar with 4 live gauge+sparkline pairs and settings modal sending update_settings over WebSocket, completing the browser half of Phase 3**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-19T10:27:25Z
- **Completed:** 2026-02-19T10:29:30Z
- **Tasks:** 2 of 2 auto tasks complete (checkpoint pending human verification)
- **Files modified:** 1

## Accomplishments

- Restructured HTML layout from `body > map + bottom-bar` to `#app-wrapper > #main-area(#map + #telemetry-sidebar) + #bottom-bar`
- Added right-side telemetry sidebar (220px) with 4 gauge+sparkline pairs: heading (deg), speed (kn), roll (deg), pitch (deg)
- Added @fnando/sparkline@0.3.10 CDN integration; sparklines update live during Play, freeze on Pause, clear on Stop
- Added settings modal with 5-subject rate/source table (location_fix, heading, speed, roll, pitch) and sliders for roll/pitch oscillation amplitude/period and location noise
- Save button sends `update_settings` WS message matching server's PublishSettings + RollPitchModel parameters
- All 17 existing tests pass (no regressions)

## Task Commits

Both tasks modify the same file (`static/index.html`) and were implemented atomically:

1. **Task 1+2: Sidebar gauges+sparklines and settings modal** - `375fbc2` (feat)

**Note:** Tasks 1 and 2 share the same file and were written as one atomic change. The sidebar HTML references the Settings button which opens the modal; the JS for both tasks is interleaved. A single commit covers both tasks.

**Plan metadata:** (pending — created at checkpoint, updated after human-verify approval)

## Files Created/Modified

- `static/index.html` - Restructured layout; added telemetry sidebar, sparkline CDN, gauge+sparkline JS, settings modal HTML and JS

## Decisions Made

- `@fnando/sparkline` UMD global is the module object `sparkline`; call signature is `sparkline.sparkline(svgEl, dataArray)` — confirmed API, no fallback needed
- Settings modal is a direct body child (outside `#app-wrapper`) to ensure the fixed overlay covers the full viewport including the sidebar and bottom bar
- Tasks 1 and 2 committed as one unit because the sidebar HTML (Task 1) already contains the Settings button that triggers the modal (Task 2) — splitting would leave the button non-functional

## Deviations from Plan

None - plan executed exactly as written. Both tasks implemented per specification; single commit was a practical necessity due to shared DOM structure.

## Issues Encountered

None. All 17 tests pass. Sparkline CDN API (`sparkline.sparkline(el, data)`) matched the plan's documented confirmed API.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Browser telemetry sidebar and settings modal are complete
- Server (03-02) already publishes all 5 keelson subjects during playback
- Human verification checkpoint pending: user must start the app and confirm live gauge updates, sparkline animation, pause/stop behavior, and settings modal functionality
- Phase 4 (video streaming) can begin after checkpoint approval

---
*Phase: 03-telemetry-publishing*
*Completed: 2026-02-19*
