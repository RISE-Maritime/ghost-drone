# Fix manual mode values bouncing back

In manual mode, pressing keys changes the heading/thrust values momentarily but they bounce back. This is likely because the telemetry loop overwrites the frontend's local values with the backend state on every frame, and the manual control commands aren't being persisted properly in the backend — either the engine ignores them in manual mode, or the backend resets the heading/thrust each tick.

## Plan

- [x] **Diagnose the bounce**: The frontend's `syncManualHeading()` (controls.ts:128-132) resets `manualHeading` to the telemetry actual heading (which lags behind the commanded heading due to dynamics inertia) every frame when no keys are held. When the user resumes pressing keys, the next command is based on the lagging actual heading, causing the commanded heading to regress — the "bounce". Backend is fine: `_manual_heading` persists correctly. Note: zenoh key expressions are already properly separated (control/manual vs pubsub/sim_frame).

- [x] **Fix the backend**: No backend fix needed — engine.py already correctly persists `_manual_heading` and `_manual_thrust` between ticks, and `_advance()` correctly branches on `OperationMode.MANUAL` to use them as targets.

- [x] **Fix the frontend if needed**: Removed `syncManualHeading()` which was resetting `manualHeading` to the lagging telemetry heading on every frame. Instead, `manualHeading` is initialized once when transitioning to manual mode (via `setOperationMode(mode, currentHeading)`) and then only modified by keypresses. This ensures commanded heading persists between keypresses without being overwritten by telemetry.

- [x] **Build and test**: Frontend builds clean. All 24 engine/dynamics tests pass. 66 errors are pre-existing zenoh connection errors (no zenohd in this environment), unrelated to changes.

> **Note from dispatcher:** Important architectural requirement from the user: Manual controls must use a **separate zenoh key expression** for set values (desired heading/thrust) — NOT the same keyexpr used for telemetry. The frontend should publish manual commands to a dedicated set-value topic (e.g., `service/manual_control`), and the backend should subscribe to that. The telemetry topic should only carry observed/measured state. This separation prevents the bounce issue and keeps the architecture clean.
