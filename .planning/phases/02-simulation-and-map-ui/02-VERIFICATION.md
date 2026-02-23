---
phase: 02-simulation-and-map-ui
verified: 2026-02-19T00:00:00Z
status: human_needed
score: 19/19 automated must-haves verified
re_verification: false
human_verification:
  - test: "Draw route and animate drone in browser"
    expected: "Click Draw Mode, place 3+ waypoints on map (numbered orange circles appear connected by orange polyline), click Play, drone marker animates along route from first waypoint with correct heading rotation, map pans to follow"
    why_human: "Leaflet map rendering, WebSocket real-time animation, and CSS transform rotation cannot be verified programmatically without a browser"
  - test: "Pause and resume mid-route"
    expected: "Click Pause during playback — drone freezes, marker dims to 0.4 opacity, Draw Mode button disables. Click Play again — drone resumes from paused position (does not restart from waypoint 1)"
    why_human: "Browser state and visual opacity change requires live interaction"
  - test: "Stop resets drone to first waypoint"
    expected: "Click Stop — drone marker jumps back to first waypoint, dims to 0.4 opacity, Draw Mode and Clear buttons re-enable"
    why_human: "Requires browser observation"
  - test: "Speed input changes cruise speed"
    expected: "Change speed input to 50 m/s, click Play — drone visibly traverses route faster than at default 10 m/s"
    why_human: "Speed perception requires visual comparison in browser"
  - test: "Auto-stop at route end"
    expected: "When drone reaches the last waypoint it stops automatically, marker dims, controls return to stopped state"
    why_human: "Requires watching the full route playback in browser"
---

# Phase 2: Simulation and Map UI Verification Report

**Phase Goal:** A user can draw a waypoint route on the browser map, hit play, and watch an animated drone marker follow the route with realistic motion
**Verified:** 2026-02-19
**Status:** human_needed — all automated checks pass; 5 items require browser verification
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | SimEngine accepts (lat,lng) waypoints and cruise_speed_mps | VERIFIED | `engine.py` load_route() accepts list of tuples; tick() takes cruise_speed_mps param |
| 2 | tick(dt) on PLAYING engine advances drone position along polyline | VERIFIED | 100-tick test confirms >1 unique lat values; `_advance()` haversine segment logic confirmed |
| 3 | Drone heading smoothly lags toward target bearing (first-order lag) | VERIFIED | alpha = dt/(HEADING_TAU+dt) in `_advance()`; heading after 5 ticks on east route = 89.96 deg (not instant snap) |
| 4 | Position, heading, and speed include Gaussian noise on every tick | VERIFIED | `random.gauss` called 4x per tick; test_noise_is_nonzero_across_ticks PASSED; test_noise_values_vary_between_runs PASSED |
| 5 | SimEngine supports PLAYING, PAUSED, STOPPED with correct transitions | VERIFIED | All 3 state tests pass; play/pause/stop methods confirmed in engine.py |
| 6 | In STOPPED state, drone position is first waypoint (not None) | VERIFIED | _reset_to_start() sets _lat/_lng to waypoints[0]; to_dict() produces valid coords immediately after load_route |
| 7 | Unit tests confirm heading lag, noise, route advance, stop/reset, ValueError | VERIFIED | 12/12 tests pass (uv run pytest tests/test_sim_engine.py tests/test_sim_noise.py) |
| 8 | FastAPI /ws WebSocket route drives SimEngine at 20 Hz | VERIFIED | /ws in app.routes; tick_loop calls asyncio.sleep(1/TICK_HZ); receive_loop handles all 5 message types |
| 9 | WebSocket handler owns SimEngine instance and dispatches all commands | VERIFIED | engine = SimEngine() inside websocket_endpoint; load_route/play/pause/stop/set_speed all handled |
| 10 | Browser connects to /ws and sends route + play command on Play click | VERIFIED | `new WebSocket('ws://'+location.host+'/ws')` confirmed; btnPlay sends load_route then play messages |
| 11 | Drone marker position updates on each telemetry frame | VERIFIED | `droneMarker.setLatLng(latlng)` in ws.onmessage handler |
| 12 | Drone SVG heading indicator rotates to match heading from telemetry | VERIFIED | `inner.style.transform = rotate(${heading}deg)` in setDroneHeading(); called on every frame |
| 13 | Map pans to follow drone during playback | VERIFIED | `map.panTo(latlng)` called when `frame.state === 'playing' && !isZooming` |
| 14 | Drone marker dims (opacity 0.4) when paused/stopped, full when playing | VERIFIED | `const opacity = frame.state === 'playing' ? 1.0 : 0.4` in ws.onmessage; applied to inner div |
| 15 | Draw Mode places numbered waypoints on map click | VERIFIED | onMapClick pushes to waypoints[], calls refreshRoute(); createWpIcon(i+1) creates numbered circles |
| 16 | Waypoints connected by bright polyline, draggable in draw mode | VERIFIED | L.polyline color '#e67e22' in refreshRoute(); isDraggable = drawModeActive && simState==='stopped' |
| 17 | Play disabled until 2+ waypoints; Pause/Stop/Clear gated on sim state | VERIFIED | updateControlStates() logic: canPlay = (stopped && wps>=2) || paused; confirmed in code |
| 18 | Speed input changes cruise_speed_mps via set_speed WebSocket message | VERIFIED | speedInput change handler sends {type:'set_speed', value}; server updates cruise_speed_mps |
| 19 | Full test suite (17 tests) passes with no regressions | VERIFIED | uv run pytest tests/ — 17 passed in 0.08s |

**Score:** 19/19 automated truths verified

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `ghost_drone/simulation/__init__.py` | Package marker | VERIFIED | Exists (1 line, empty package marker) |
| `ghost_drone/simulation/models.py` | TelemetryFrame dataclass with to_dict(); SimState enum | VERIFIED | 42 lines; SimState.STOPPED/PLAYING/PAUSED; to_dict() returns state as string value |
| `ghost_drone/simulation/engine.py` | SimEngine with tick/play/pause/stop/load_route; helpers; noise | VERIFIED | 243 lines; all methods implemented; constants confirmed; noise via random.gauss on 4 fields |
| `tests/test_sim_engine.py` | 10 deterministic engine tests | VERIFIED | 145 lines; 10 test functions; all pass |
| `tests/test_sim_noise.py` | 2 statistical noise tests | VERIFIED | 67 lines; 2 test functions; both pass |
| `ghost_drone/server.py` | FastAPI app with /ws WebSocket before StaticFiles | VERIFIED | 75 lines; /ws at char 761, StaticFiles at char 2218; correct order confirmed |
| `static/index.html` | Full Leaflet + Geoman UI with all controls and drone marker | VERIFIED | 429 lines; all 13 UI patterns confirmed present |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `engine.py` | `models.py` | `from .models import SimState, TelemetryFrame` | WIRED | Line 16 of engine.py: `from .models import SimState, TelemetryFrame` |
| `engine.py` | `math.atan2` / `math.degrees` | bearing calculation | WIRED | `_bearing()` uses math.sin/cos/atan2/degrees; confirmed in code |
| `engine.py` | `random.gauss` | Gaussian noise per tick | WIRED | 4 calls to `random.gauss` in tick() method; confirmed |
| `tests/test_sim_engine.py` | `ghost_drone.simulation.engine` | imports SimEngine, helpers | WIRED | Line 11-16 imports SimEngine, _bearing, _angle_diff, _haversine_m |
| `tests/test_sim_noise.py` | `ghost_drone.simulation.engine` | SimEngine statistical testing | WIRED | Line 10 imports SimEngine |
| `server.py` | `ghost_drone.simulation.engine` | SimEngine instance in websocket handler | WIRED | Line 20: `from ghost_drone.simulation.engine import SimEngine, TICK_HZ`; engine = SimEngine() inside handler |
| `server.py` | `asyncio.sleep` | tick loop at 20 Hz | WIRED | `await asyncio.sleep(dt)` inside tick_loop; dt = 1.0/TICK_HZ |
| `index.html` WebSocket | `/ws` endpoint | `new WebSocket('ws://'+location.host+'/ws')` | WIRED | Line 341 of index.html confirmed |
| `index.html` drone marker | TelemetryFrame heading | `rotate(${heading}deg)` CSS transform | WIRED | setDroneHeading() applies rotate transform; called in ws.onmessage |

---

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| SIM-01 | 02-01, 02-02 | Drone follows waypoint route with smooth motion, first-order lag heading, configurable cruise speed | SATISFIED | SimEngine._advance() with alpha=dt/(HEADING_TAU+dt); cruise_speed_mps param on tick(); test_heading_lag_converges PASSED |
| SIM-02 | 02-01, 02-02 | Drone telemetry includes Gaussian noise on position, heading, and speed | SATISFIED | random.gauss on lat, lng, heading, speed in tick(); test_noise_is_nonzero_across_ticks PASSED |
| SIM-03 | 02-01, 02-02 | Drone starts at first waypoint when simulation is played | SATISFIED | _reset_to_start() sets position to waypoints[0] on load_route and stop(); confirmed by test_stop_resets_to_first_waypoint |
| UI-01 | 02-03 | User can draw a route on interactive map by placing waypoints | SATISFIED | Draw Mode button, onMapClick adds waypoints, refreshRoute() renders numbered circles + polyline |
| UI-02 | 02-03 | Drone position shown as animated marker updating in real time | SATISFIED | droneMarker.setLatLng() + setDroneHeading() on every ws.onmessage (20 Hz); map.panTo() during playback |
| UI-03 | 02-03 | User can play, pause, and stop the simulation from web UI | SATISFIED | btnPlay/btnPause/btnStop with WebSocket commands; updateControlStates() gates buttons correctly |

**Orphaned requirements check:** No additional requirements mapped to Phase 2 in REQUIREMENTS.md beyond SIM-01, SIM-02, SIM-03, UI-01, UI-02, UI-03. All 6 accounted for.

---

### Anti-Patterns Found

No anti-patterns detected across any phase 2 files:
- No TODO/FIXME/HACK/PLACEHOLDER comments in any modified file
- No empty return stubs (return null / return {} / return [])
- No placeholder console.log-only handlers
- No unconnected/orphaned artifacts

---

### Human Verification Required

The following 5 scenarios require browser testing. All server-side and static analysis checks have passed.

#### 1. Draw Route and Animate Drone

**Test:** Start server (`uvicorn ghost_drone.server:app --port 8000`), open http://localhost:8000, click Draw Mode (button turns orange), click 3 points on the map, then click Play.
**Expected:** Numbered orange circles (1, 2, 3) appear connected by orange polyline. On Play, drone marker appears at waypoint 1 and begins moving along the route. Drone rotates to face direction of travel. Map pans to keep drone centered.
**Why human:** Leaflet map rendering, real-time WebSocket animation, and CSS rotate transform on SVG marker cannot be verified without a browser.

#### 2. Pause and Resume Mid-Route

**Test:** During playback, click Pause.
**Expected:** Drone marker freezes mid-route. Marker dims to ~40% opacity. Pause button disables, Play button re-enables. Click Play — drone resumes from paused position (does NOT restart from waypoint 1).
**Why human:** Visual opacity change and positional resume behavior require live browser observation.

#### 3. Stop Resets to First Waypoint

**Test:** During playback or pause, click Stop.
**Expected:** Drone marker jumps back to waypoint 1, dims to 40% opacity. Draw Mode and Clear buttons re-enable. Route remains visible.
**Why human:** Requires watching marker position reset in browser.

#### 4. Speed Input Changes Animation Rate

**Test:** Place 2 waypoints, change speed input to 50 m/s, click Play. Then repeat with default 10 m/s.
**Expected:** At 50 m/s the drone visibly traverses the route approximately 5x faster than at 10 m/s.
**Why human:** Speed perception requires visual comparison across runs.

#### 5. Auto-Stop at Route Completion

**Test:** Draw a short route (2 waypoints close together), set speed to 30+ m/s, click Play, wait for route to complete.
**Expected:** Drone stops at the final waypoint automatically, marker dims, controls return to stopped-state (Play re-enables if 2+ waypoints still present, Stop disables).
**Why human:** Requires watching the end-of-route state transition in the browser.

---

### Gaps Summary

None. All automated checks passed. The phase goal is technically achieved in code — the only open items are visual/real-time behaviors that require browser confirmation.

---

_Verified: 2026-02-19_
_Verifier: Claude (gsd-verifier)_
