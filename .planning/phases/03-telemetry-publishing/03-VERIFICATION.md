---
phase: 03-telemetry-publishing
verified: 2026-02-19T00:00:00Z
status: human_needed
score: 17/17 must-haves verified
re_verification: false
human_verification:
  - test: "Live gauge and sparkline updates during simulation playback"
    expected: "After placing 2+ waypoints and clicking Play, heading/speed/roll/pitch gauges update in real time and sparklines animate within a few seconds of history accumulation"
    why_human: "Requires running the browser UI against a live server — cannot verify DOM updates and canvas rendering programmatically"
  - test: "Gauge freeze on Pause, clear on Stop"
    expected: "Clicking Pause freezes all gauge values and sparklines on their last received state; clicking Stop resets all gauges to 0.0 and clears sparkline history"
    why_human: "Requires observing live state transitions in the browser"
  - test: "Settings modal open/close and Save sends update_settings WS message"
    expected: "Clicking Settings opens a modal with 5-subject table and 5 sliders; Save closes modal and the browser Network/WS tab shows an update_settings message with correct structure"
    why_human: "Requires browser DevTools WS inspection to confirm message payload"
  - test: "Zenoh subjects published only during PLAYING state"
    expected: "Running z_sub --key 'ghost-drone/**' shows messages arriving only while simulation is in Play state, silent during Pause and Stop"
    why_human: "Requires an external zenoh subscriber and a running zenoh router — cannot simulate in unit tests"
---

# Phase 3: Telemetry Publishing Verification Report

**Phase Goal:** Every keelson telemetry subject is published to the zenoh network during simulation, and the browser displays live plots of the published values
**Verified:** 2026-02-19
**Status:** human_needed (all automated checks passed; 4 items require browser/zenoh runtime verification)
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|---------|
| 1 | RollPitchModel.tick() returns (roll_deg, pitch_deg) tuples with sinusoidal shape when state is PLAYING | VERIFIED | Live test: `tick(0.05, PLAYING)` returned `(-0.715, 0.529)` — float tuples. elapsed_s advances only in PLAYING, frozen in PAUSED. |
| 2 | RollPitchModel.reset() zeroes elapsed time so a new run starts at zero phase | VERIFIED | Live test: `m._elapsed_s == 0.0` after reset() confirmed. |
| 3 | encode_timestamped_float() returns bytes that keelson.uncover() can decode into TimestampedFloat with correct value and non-zero timestamp | VERIFIED | Live round-trip: value=42.5 decoded within 1e-3 tolerance; timestamp > 0. |
| 4 | encode_location_fix() returns bytes that keelson.uncover() can decode into LocationFix with correct lat/lng | VERIFIED | Live round-trip: lat=57.7069 decoded within 1e-4 tolerance. |
| 5 | make_key() returns the expected keelson key expression in the form realm/@v0/entity/pubsub/subject/source_id | VERIFIED | Live test: returned `ghost-drone/@v0/sim001/pubsub/heading_true_north_deg/imu/0`. |
| 6 | SubjectThrottle.should_publish() returns False when called more frequently than configured rate | VERIFIED | Live test: first call True, immediate second call False. |
| 7 | ZenohPublisher is started once at app startup and stopped on shutdown via FastAPI lifespan | VERIFIED | `lifespan()` context manager in `create_app()` calls `pub.start()` on enter, `pub.stop()` on exit; `app.state.publisher` set before yield. |
| 8 | tick_loop publishes all 5 subjects to zenoh only when frame.state is PLAYING | VERIFIED | `server.py:219` — `if frame.state == SimState.PLAYING:` guards `_publish_telemetry()`. Loop iterates all 5 subjects via `_publish_telemetry()`. |
| 9 | No zenoh messages are published when frame.state is PAUSED or STOPPED | VERIFIED | Guard at line 219 is exclusive — `_publish_telemetry` is unreachable from PAUSED or STOPPED paths. |
| 10 | Per-subject publish rate is honoured by SubjectThrottle — subjects only publish when their configured interval has elapsed | VERIFIED | `_publish_telemetry()` calls `throttle.should_publish(subject, sc.rate_hz)` and skips via `continue` if False. |
| 11 | Speed published to speed_over_ground_knots is frame.speed * MPS_TO_KNOTS (not raw m/s) | VERIFIED | `server.py:96` — `("speed_over_ground_knots", encode_timestamped_float, frame.speed * MPS_TO_KNOTS)`. |
| 12 | RollPitchModel is reset (elapsed zeroed) when frame.state transitions to STOPPED | VERIFIED | `server.py:213–215` — `if frame.state == STOPPED and prev_state != STOPPED: roll_pitch.reset(); throttle.reset()` — transition-only guard confirmed. |
| 13 | Browser receives extended WS frame including roll and pitch fields on every tick | VERIFIED | `server.py:225–226` — `frame_dict["roll"] = roll` and `frame_dict["pitch"] = pitch` appended to frame before `send_text()`. |
| 14 | Settings are connection-local; update_settings WS message updates per-subject rate_hz, source_id, roll/pitch amplitude/period, location noise | VERIFIED | `server.py:177–199` — update_settings handler updates all 5 subject fields and 5 global params. Settings, RollPitchModel, and SubjectThrottle are instantiated per-connection inside `websocket_endpoint`. |
| 15 | location_fix is published with Gaussian noise from settings.location_noise_sigma_m applied to lat/lng at publish time | VERIFIED | `server.py:108–113` — `random.gauss(0, settings.location_noise_sigma_m / 111_320)` applied before `encode_location_fix()`. |
| 16 | Right sidebar visible with 4 gauge+sparkline pairs; gauges and sparklines update live during Play; freeze on Pause; clear on Stop (UI-05) | VERIFIED (code) / HUMAN NEEDED (runtime) | HTML: `#telemetry-sidebar` with 4 `gauge-block` divs (heading/speed/roll/pitch), 4 SVG sparkline elements, CDN script present. JS: `onTelemetryFrame()` called at end of `ws.onmessage`; playing branch pushes to rolling history and updates gauges; stopped branch clears all; sparklines guarded by `length > 1`. Requires browser to confirm visual behavior. |
| 17 | Settings modal opens with per-subject table and sliders; Save sends update_settings WS message | VERIFIED (code) / HUMAN NEEDED (runtime) | HTML: `#settings-overlay` with 5-subject table and 5 sliders present. JS: Save handler reads all form inputs and calls `ws.send(JSON.stringify({type: 'update_settings', ...}))`. Requires browser/DevTools to confirm. |

**Score:** 17/17 truths verified (automated) | 4 require runtime confirmation

---

## Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `ghost_drone/simulation/roll_pitch.py` | RollPitchModel sinusoidal oscillator | VERIFIED | 69 lines, substantive. Exports `RollPitchModel` with `tick()`, `reset()`, all 5 mutable attributes. |
| `ghost_drone/zenoh_bridge/telemetry.py` | keelson encode pipeline + rate throttle | VERIFIED | 121 lines, substantive. Exports `encode_timestamped_float`, `encode_location_fix`, `make_key`, `SubjectThrottle`, `MPS_TO_KNOTS`. |
| `ghost_drone/server.py` | FastAPI app with lifespan, PublishSettings dataclass, extended tick loop | VERIFIED | 239 lines, substantive. Contains `create_app`, `PublishSettings`, `SubjectConfig`, `_publish_telemetry`, extended tick loop, `update_settings` handler, lifespan context manager. |
| `ghost_drone/__main__.py` | app creation via create_app(cfg) so lifespan has config | VERIFIED | 64 lines. `create_app(cfg)` called after `probe_zenoh(cfg.zenoh_endpoint)` — cfg is always valid before lifespan runs. |
| `static/index.html` | Right sidebar with gauges+sparklines, settings modal, sparkline CDN script | VERIFIED | 681 lines. Contains `spark-heading`, `spark-speed`, `spark-roll`, `spark-pitch` SVG elements; CDN script at line 17; `onTelemetryFrame` function; `update_settings` WS sender; settings modal with 5-subject table and 5 sliders. |

---

## Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `ghost_drone/zenoh_bridge/telemetry.py` | `keelson.enclose()` | `encode_timestamped_float` / `encode_location_fix` | WIRED | `keelson.enclose(msg.SerializeToString())` at lines 44, 62. Round-trip verified live. |
| `ghost_drone/zenoh_bridge/telemetry.py` | `keelson.construct_pubsub_key()` | `make_key()` | WIRED | `keelson.construct_pubsub_key(base_path=..., entity_id=..., subject=..., source_id=...)` at line 76. Verified live key format. |
| `ghost_drone/server.py tick_loop` | `app.state.publisher.publish()` | `_publish_telemetry()` called only when PLAYING | WIRED | `server.py:219-221` — PLAYING guard present; `_publish_telemetry(publisher, cfg, frame, ...)` called with live publisher from `websocket.app.state.publisher`. |
| `ghost_drone/server.py tick_loop` | `roll_pitch.reset()` | `frame.state == SimState.STOPPED` check | WIRED | `server.py:213-215` — transition guard `prev_state != SimState.STOPPED` ensures reset called exactly once per stop event. |
| `ghost_drone/__main__.py` | `ghost_drone/server.py create_app` | `cfg` passed before lifespan runs | WIRED | `__main__.py:57-58` — `from ghost_drone.server import create_app; app = create_app(cfg)` after `probe_zenoh`. |
| `ghost_drone/server.py _publish_telemetry` | `encode_location_fix(noisy_lat, noisy_lng)` | Gaussian noise computed from `settings.location_noise_sigma_m` | WIRED | `server.py:108-116` — `random.gauss(0, settings.location_noise_sigma_m / 111_320)` + cos-correction for lng; passed to `encode_location_fix()`. |
| `static/index.html ws.onmessage` | `onTelemetryFrame(frame)` | called for every WS message; branches on frame.state | WIRED | `index.html:539` — `onTelemetryFrame(frame)` called at end of `ws.onmessage` after marker/button updates. |
| `static/index.html onTelemetryFrame` | `sparkline.sparkline(svgEl, history[key])` | called after pushing to rolling history; guarded by length > 1 | WIRED | `index.html:493-496` — `if (history[key].length > 1) { sparkline.sparkline(svgEls[key], history[key]); }` |
| `static/index.html settings modal save` | `ws.send(JSON.stringify({type: 'update_settings', ...}))` | save button click handler reads all form inputs | WIRED | `index.html:603-622` — Save button reads all `#subject-rows input` data attributes and all 5 slider values; sends complete `update_settings` message. |

---

## Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|---------|
| TELEM-01 | 03-01, 03-02 | Drone publishes `location_fix` (foxglove.LocationFix) to zenoh using keelson envelope encoding | SATISFIED | `encode_location_fix()` in telemetry.py uses `keelson.enclose(LocationFix.SerializeToString())`; published via `_publish_telemetry()` when PLAYING. Round-trip verified. |
| TELEM-02 | 03-01, 03-02 | Drone publishes `heading_true_north_deg` (TimestampedFloat) to zenoh using keelson envelope encoding | SATISFIED | `encode_timestamped_float(frame.heading)` in `_publish_telemetry()`. Round-trip verified. |
| TELEM-03 | 03-01, 03-02 | Drone publishes `speed_over_ground_knots` (TimestampedFloat) to zenoh using keelson envelope encoding | SATISFIED | `encode_timestamped_float(frame.speed * MPS_TO_KNOTS)` in `_publish_telemetry()`. MPS_TO_KNOTS=1.94384 confirmed. |
| TELEM-04 | 03-01, 03-02 | Drone publishes `roll_deg` and `pitch_deg` (TimestampedFloat each) to zenoh using keelson envelope encoding | SATISFIED | Both subjects in `_publish_telemetry()` subject list with `encode_timestamped_float(roll)` and `encode_timestamped_float(pitch)`. |
| UI-05 | 03-03 | Web UI displays real-time plots of published telemetry values (heading, speed, roll, pitch) updating live during simulation | SATISFIED (code) / HUMAN NEEDED (runtime) | sidebar HTML with 4 gauge+sparkline pairs present; `onTelemetryFrame()` pushes values to rolling 600-sample history and redraws sparklines; sparkline CDN integrated at `@fnando/sparkline@0.3.10`. Visual behavior requires human confirmation. |

No orphaned requirements: All 5 requirement IDs (TELEM-01 through TELEM-04, UI-05) appear in plan frontmatter and are accounted for. No additional Phase 3 requirements exist in REQUIREMENTS.md traceability table.

---

## Anti-Patterns Found

No anti-patterns detected. All 4 phase-modified files (`roll_pitch.py`, `telemetry.py`, `server.py`, `index.html`) were scanned for:
- TODO / FIXME / PLACEHOLDER comments
- Empty return values (`return null`, `return {}`, `return []`)
- Stub implementations (placeholder strings, console.log-only handlers)

None found. All implementations are substantive.

---

## Human Verification Required

### 1. Live Gauge and Sparkline Updates

**Test:** Start the app with `uv run python -m ghost_drone`, place 2+ waypoints on the map, click Play, and observe the right sidebar.
**Expected:** Heading, speed, roll, and pitch gauges update in real time with new values each tick. After a few seconds of playback, sparklines appear and animate as the rolling history fills.
**Why human:** DOM updates and canvas/SVG rendering require a live browser — cannot verify text content changes or SVG path mutations programmatically.

### 2. Pause Freezes, Stop Clears

**Test:** During playback, click Pause, then observe the sidebar. Then click Stop.
**Expected:** On Pause, all gauge values and sparklines freeze on the last received values (no further updates). On Stop, all gauges reset to `0.0` and all sparkline SVGs return to empty/blank.
**Why human:** Requires observing live state transitions across multiple browser ticks.

### 3. Settings Modal and update_settings WS Message

**Test:** Click the Settings button in the sidebar header. Verify the modal content. Change the roll amplitude slider to 15. Click Save. Inspect the browser DevTools Network/WS tab.
**Expected:** Modal opens showing 5 subjects (location_fix, heading_true_north_deg, speed_over_ground_knots, roll_deg, pitch_deg) each with rate_hz and source_id inputs, plus 5 sliders. Slider label updates live. Save closes the modal and sends `{"type": "update_settings", "subjects": {...}, "roll_amplitude_deg": 15.0, ...}`.
**Why human:** Requires browser DevTools WS frame inspection to confirm the sent payload structure.

### 4. Zenoh Subject Publishing Gated to PLAYING State

**Test:** With a zenoh router running, start the app, run `z_sub --key 'ghost-drone/**'` in a terminal, place waypoints, then cycle through Play / Pause / Stop.
**Expected:** Messages arrive on the zenoh subscriber only during Play. No messages during Pause. No messages during Stop.
**Why human:** Requires an active zenoh daemon and external subscriber — cannot be verified without a running zenoh network.

---

## Summary

Phase 3 goal is structurally achieved. All 17 observable truths are verified at the code level:

- **Plan 03-01 (backend modules):** `ghost_drone/simulation/roll_pitch.py` and `ghost_drone/zenoh_bridge/telemetry.py` are fully implemented, substantive, and wired. All keelson encoding round-trips confirmed live against the installed keelson 0.5.0a9.
- **Plan 03-02 (server wiring):** `server.py` uses `create_app(cfg)` factory with FastAPI lifespan managing ZenohPublisher. The tick loop publishes all 5 subjects via `_publish_telemetry()` exclusively when PLAYING, resets on STOPPED transition, and sends roll+pitch in every WS frame. `__main__.py` correctly calls `create_app(cfg)` after startup checks.
- **Plan 03-03 (browser UI):** `static/index.html` contains the complete right-side telemetry sidebar with 4 gauge+sparkline pairs, @fnando/sparkline@0.3.10 CDN integration, `onTelemetryFrame()` fully wired to `ws.onmessage`, and a settings modal with per-subject and global parameter controls that sends the correct `update_settings` WS message structure.

The 17 existing pytest tests all pass (no regressions). Four items require human runtime verification to confirm the visual/real-time behavior and zenoh network publishing — the code paths supporting all four are fully wired and substantive.

---

_Verified: 2026-02-19_
_Verifier: Claude (gsd-verifier)_
