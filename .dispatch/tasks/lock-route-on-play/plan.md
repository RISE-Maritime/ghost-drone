# Lock route from editing when playing

When the user presses Play, the route waypoints should become non-editable (no dragging, adding, or removing waypoints). When the drone is stopped, route editing should be re-enabled. This is a frontend-only change — the backend state (PLAYING/PAUSED/STOPPED) already comes via zenoh telemetry.

## Plan

- [x] **Disable route editing when PLAYING or PAUSED**: In `frontend/src/map.ts`, gated contextmenu (right-click remove) handler on sim state. In `main.ts`, on state transition to playing/paused, auto-disable draw mode and update waypoint draggability. Click-to-add and marker dragging were already gated by `getSimState()`.

- [x] **Re-enable route editing when STOPPED**: `updateWaypointDraggability()` is called on every state transition, re-enabling drag when stopped. Draw mode can be re-toggled by the user once stopped.

- [x] **Build frontend** (`cd frontend && npm run build`) and verify no errors. Build succeeded.
