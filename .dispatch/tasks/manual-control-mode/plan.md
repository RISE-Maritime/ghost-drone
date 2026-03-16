# Add manual keypad control mode (autonomous vs manual)

Add two operation modes for each drone:
- **Autonomous mode**: The existing behaviour — draw a route, press play, drone follows it via LOS guidance.
- **Manual mode**: User controls the drone directly with keyboard keys (arrow keys or WASD). No route, no waypoints — direct heading/thrust control.

The UI should let the user switch between modes. In manual mode, keypad input sends heading/thrust commands to the backend. In autonomous mode, the existing route-drawing and play/pause/stop controls work as before.

## Plan

- [x] **Add operation mode to backend** — Added OperationMode enum, manual_control() method, set_mode() in SimEngine: Add an `OperationMode` enum (`AUTONOMOUS`, `MANUAL`) to `models.py`. Update `SimEngine` to track the current mode. In MANUAL mode, `tick()` should use heading/thrust from manual commands (via `remote_move()` or a new method) instead of LOS guidance. In AUTONOMOUS mode, existing behaviour is unchanged.

- [x] **Add zenoh endpoints for manual control** — Added set_mode and manual_control subscribers: In `zenoh_bridge/control.py`, add a `set_mode` endpoint to switch between AUTONOMOUS and MANUAL. Add a `manual_control` endpoint that accepts heading and thrust commands (or reuse `remote_move`). Ensure mode switching stops autonomous playback if switching to MANUAL while playing.

- [x] **Add frontend keyboard controls** — WASD/arrow keys in controls.ts, sends via zenoh

- [x] **Add mode toggle UI** — AUTO/MANUAL toggle button in bottom bar, keyboard hint shown in manual mode

- [x] **Update frontend state management** — OperationMode type in types.ts, mode tracked from sim_frame, synced via zenoh

- [x] **Build frontend** (`cd frontend && npm run build`) and run tests (`uv run pytest`). All unit tests pass; zenoh integration tests have pre-existing port-conflict errors unrelated to changes.

- [x] Write summary of changes to .dispatch/tasks/manual-control-mode/output.md
