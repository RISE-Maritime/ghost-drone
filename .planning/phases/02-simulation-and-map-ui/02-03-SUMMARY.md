---
phase: 02-simulation-and-map-ui
plan: "03"
subsystem: ui
tags: [leaflet, geoman, websocket, svg, fastapi, simulation]

# Dependency graph
requires:
  - phase: 02-01
    provides: SimEngine simulation engine with TelemetryFrame output
  - phase: 02-02
    provides: SimEngine unit tests validating play/pause/stop/speed behaviour

provides:
  - FastAPI /ws WebSocket route driving SimEngine at 20 Hz
  - Leaflet 1.9.4 + Geoman 2.19.0 interactive map UI in static/index.html
  - Draw mode: click-to-place numbered waypoints, right-click to delete, drag to reposition
  - Play/Pause/Stop/Resume controls wired to simulation engine via WebSocket
  - Boat/surface vessel SVG marker with heading rotation following TelemetryFrame
  - Map auto-pans to follow drone during playback; suppressed during zoom
  - Default map center: Lindholmen, Gothenburg (57.7069, 11.9381, zoom 15)

affects: [03-zenoh-publishing, 04-video-pipeline]

# Tech tracking
tech-stack:
  added: [Leaflet 1.9.4 CDN, leaflet-geoman-free 2.19.0 CDN]
  patterns:
    - WebSocket JSON protocol (client sends commands, server pushes TelemetryFrame at 20 Hz)
    - Leaflet L.divIcon with inner div for CSS transform rotation (heading)
    - isZooming flag (zoomstart/zoomend) to suppress panTo during map zoom animations
    - Waypoint draggability gated on drawModeActive && simState==='stopped'

key-files:
  created: []
  modified:
    - static/index.html
    - ghost_drone/server.py

key-decisions:
  - "Pause->Play resume: canPlay = (stopped && 2+ wps) || paused — engine.play() from paused state resumes mid-route without reloading route"
  - "Boat icon: top-down hull SVG with pointed bow, centreline, bridge block replaces aerial quad-rotor icon (maritime context)"
  - "Waypoint drag gated on Draw Mode: markers created with draggable=false by default; updateWaypointDraggability() enables/disables on mode change"
  - "Zoom shake fix: isZooming flag suppresses panTo calls during zoomstart..zoomend window; panTo only fires during playing state"
  - "panTo only when playing: stopped/paused state does not pan the map (avoids fighting user navigation)"
  - "Fresh play sends route; resume from pause does not resend route (avoids position reset mid-route)"

patterns-established:
  - "isZooming flag pattern: bind zoomstart/zoomend on map; check flag before any programmatic camera movement"
  - "Draggability gate pattern: always pass draggable option at marker creation based on current mode; call dragging.enable/disable on toggle"

requirements-completed: [UI-01, UI-02, UI-03]

# Metrics
duration: 25min
completed: 2026-02-19
---

# Phase 2 Plan 03: Simulation UI Summary

**Interactive Leaflet/WebSocket simulation UI with boat marker, Lindholmen default center, and fixed Pause/Play/zoom/drag behaviour**

## Performance

- **Duration:** ~25 min (including human verification and fix cycle)
- **Started:** 2026-02-19T00:00:00Z
- **Completed:** 2026-02-19
- **Tasks:** 3 (2 auto + 1 human-verify with fix cycle)
- **Files modified:** 2

## Accomplishments

- Full interactive map UI: draw waypoints, animate surface vessel along route via WebSocket
- All 5 user-reported issues fixed atomically in a single fix commit (4448eb0)
- FastAPI /ws WebSocket route driving SimEngine at 20 Hz confirmed working
- Leaflet map defaulted to Lindholmen, Gothenburg — the operational area for the project

## Task Commits

Each task was committed atomically:

1. **Task 1: FastAPI WebSocket route** - `ce002b5` (feat)
2. **Task 2: Browser UI — Leaflet map, Geoman draw, drone marker, bottom bar** - `12b4af1` (feat)
3. **Task 3: UI bug fixes from human verification** - `4448eb0` (fix)

## Files Created/Modified

- `/workspace/ghost_drone/server.py` - FastAPI app with /ws WebSocket endpoint wiring SimEngine at 20 Hz
- `/workspace/static/index.html` - Full interactive Leaflet + Geoman UI with boat marker, draw mode, playback controls

## Decisions Made

- **Pause->Play fix**: `canPlay` condition extended to include `simState === 'paused'`; Play button re-enables after Pause so user can resume. Engine's `play()` method handles resume from paused state natively.
- **Boat icon**: Replaced aerial quad-rotor SVG with a top-down surface vessel hull — bow-pointed shape with centreline and bridge block — appropriate for maritime simulation context.
- **Drag gate**: Waypoint markers created with `draggable` based on `drawModeActive && simState === 'stopped'`; a new `updateWaypointDraggability()` function keeps marker drag state in sync whenever draw mode or sim state changes.
- **Zoom shake**: `isZooming` flag tracked via `zoomstart`/`zoomend` map events; `panTo` is skipped while flag is true, eliminating the visual shaking caused by 20 Hz position updates fighting a zoom animation.
- **panTo scope**: `panTo` now only fires when `frame.state === 'playing'` — the map no longer pans during stopped/paused states, giving users freedom to navigate.

## Deviations from Plan

### Auto-fixed Issues (from human verification)

**1. [Rule 1 - Bug] Pause->Play button state broken**
- **Found during:** Task 3 (human verification)
- **Issue:** `canPlay = canEdit && waypoints.length >= 2` used `canEdit = simState === 'stopped'` so Play was always disabled in paused state
- **Fix:** Extended condition to `(canEdit && waypoints.length >= 2) || simState === 'paused'`
- **Files modified:** static/index.html
- **Committed in:** 4448eb0

**2. [Rule 1 - Bug] Wrong drone icon (aerial quad-rotor instead of surface vessel)**
- **Found during:** Task 3 (human verification)
- **Issue:** SVG showed a flying drone (4 arms + rotors) which is semantically wrong for maritime surface simulation
- **Fix:** Replaced with boat hull SVG: pointed bow path, deck centreline, bridge superstructure block
- **Files modified:** static/index.html
- **Committed in:** 4448eb0

**3. [Rule 1 - Bug] Waypoints draggable outside Draw Mode**
- **Found during:** Task 3 (human verification)
- **Issue:** Markers always created with `draggable: true`; user could accidentally move waypoints when Draw Mode was off
- **Fix:** `isDraggable = drawModeActive && simState === 'stopped'` at marker creation; `updateWaypointDraggability()` called on mode toggle and state change
- **Files modified:** static/index.html
- **Committed in:** 4448eb0

**4. [Rule 1 - Bug] Map shaking/jumping on zoom**
- **Found during:** Task 3 (human verification)
- **Issue:** 20 Hz `map.panTo()` calls conflicted with Leaflet's zoom animation, causing visible shake
- **Fix:** `isZooming` flag set via `zoomstart`/`zoomend` events; `panTo` skipped while `isZooming === true`; `panTo` also restricted to `playing` state only
- **Files modified:** static/index.html
- **Committed in:** 4448eb0

**5. [Rule 1 - Bug] Wrong default map center**
- **Found during:** Task 3 (human verification)
- **Issue:** Map opened at `[57.7, 11.97]` zoom 13 — not centered on the operational area
- **Fix:** Changed to Lindholmen, Gothenburg: `[57.7069, 11.9381]` zoom 15
- **Files modified:** static/index.html
- **Committed in:** 4448eb0

---

**Total deviations:** 5 auto-fixed (all Rule 1 bugs caught during human verification)
**Impact on plan:** All fixes correct behavioural defects in the UI. No scope creep — the plan's must-have truths are now fully met.

## Issues Encountered

None during planned task execution. All issues discovered during the human verification checkpoint and fixed in a single atomic commit.

## User Setup Required

None - no external service configuration required. Server started via `uvicorn ghost_drone.server:app --port 8000`.

## Next Phase Readiness

- Phase 2 complete: simulation engine + browser UI fully functional
- Ready for Phase 3: zenoh publishing (drone telemetry output to keelson/zenoh network)
- The /ws WebSocket and SimEngine are stable; Phase 3 can add a zenoh publisher alongside the existing tick loop

---
*Phase: 02-simulation-and-map-ui*
*Completed: 2026-02-19*

## Self-Check: PASSED

- FOUND: static/index.html
- FOUND: ghost_drone/server.py
- FOUND: .planning/phases/02-simulation-and-map-ui/02-03-SUMMARY.md
- FOUND: ce002b5 (Task 1 commit)
- FOUND: 12b4af1 (Task 2 commit)
- FOUND: 4448eb0 (Task 3 fix commit)
