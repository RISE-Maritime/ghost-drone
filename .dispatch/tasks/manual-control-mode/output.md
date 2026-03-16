# Manual Control Mode — Implementation Summary

## Overview
Added two operation modes for each drone: **AUTONOMOUS** (existing route-following with LOS guidance) and **MANUAL** (direct keyboard control via WASD/arrow keys). The UI has a mode toggle button in the bottom bar.

## Backend Changes

### `ghost_drone/simulation/models.py`
- Added `OperationMode` enum with `AUTONOMOUS` and `MANUAL` values
- Added `operation_mode` field to `TelemetryFrame` dataclass
- Updated `TelemetryFrame.to_dict()` to include `operation_mode`

### `ghost_drone/simulation/engine.py`
- Added `_operation_mode`, `_manual_heading`, `_manual_thrust` state fields to `SimEngine`
- Added `set_mode(mode)` — switches between AUTONOMOUS and MANUAL; captures current heading when entering manual
- Added `manual_control(heading_deg, thrust)` — sets manual heading/thrust; auto-starts PLAYING if stopped/paused
- Updated `_advance()` to use manual heading/thrust when in MANUAL mode (prioritized over remote_heading and LOS guidance)
- Skips waypoint tracking in MANUAL mode (no auto-stop at waypoints)
- Added `operation_mode` property
- Updated `tick()` to include `operation_mode` in returned `TelemetryFrame`

### `ghost_drone/zenoh_bridge/control.py`
- Added `control/set_mode` subscriber — accepts `{"mode": "autonomous"|"manual"}`
- Added `control/manual` subscriber — accepts `{"heading_deg": float, "thrust": float}`

## Frontend Changes

### `frontend/src/types.ts`
- Added `OperationMode` type (`"autonomous" | "manual"`)
- Added `operation_mode` field to `SimFrame` interface

### `frontend/src/zenoh-client.ts`
- Added `setModeFor(entityId, mode)` — publishes mode change via zenoh
- Added `manualControlFor(entityId, headingDeg, thrust)` — publishes manual commands via zenoh

### `frontend/src/controls.ts`
- Added `onModeToggle` and `onManualControl` callbacks
- Added keyboard event listeners for WASD/arrow keys (only active in MANUAL mode, ignored when input elements are focused)
- W/Up = increase thrust, S/Down = decrease thrust, A/Left = turn left (-5deg), D/Right = turn right (+5deg)
- Added `setOperationMode()` — updates button text/style and manual hint visibility
- Added `syncManualHeading()` — syncs manual heading from telemetry when no keys are pressed
- Updated `updateControlStates()` — disables route/play/pause/stop controls in MANUAL mode

### `frontend/index.html`
- Added AUTO/MANUAL toggle button (`#btn-mode`) to bottom bar
- Added keyboard hint text (`#manual-hint`) showing "W/S: thrust · A/D: heading"
- Added CSS for manual mode button styling (caution color when MANUAL active)

### `frontend/src/main.ts`
- Wired mode toggle to send `setModeFor()` via zenoh
- Wired manual control callback to send `manualControlFor()` via zenoh
- Updated frame handler to track `operation_mode` from sim_frame and sync heading

## How It Works
1. User clicks the **AUTO** button → it toggles to **MANUAL** mode
2. Button changes to yellow "MANUAL" label, route/play controls are disabled, keyboard hint appears
3. User presses WASD/arrow keys → heading and thrust commands sent to backend at key event rate
4. Backend `manual_control()` auto-starts PLAYING and uses manual heading/thrust in `_advance()`
5. Drone moves according to keyboard input without following any route
6. Click **MANUAL** button again → returns to **AUTO** mode, normal route controls re-enabled
