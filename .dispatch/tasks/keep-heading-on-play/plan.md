# Keep drone heading unchanged when pressing play

When play() is called, the drone's heading should not be snapped to point toward the first waypoint. The drone should keep its current heading and let the PD heading controller and LOS guidance naturally turn it toward the route. This makes the behaviour more realistic — a real vessel doesn't instantly rotate when you press go.

## Plan

- [x] **Remove heading reset in play()**: Removed the 4-line bearing computation in `play()` that snapped `self._heading` toward the next waypoint. `dynamics.reset()` now uses the drone's current heading. LOS guidance + PD controller handle turning naturally.

- [x] **Update tests**: All 24 sim engine and dynamics tests pass. No tests depended on the heading snap — no changes needed. (66 errors in full suite are pre-existing zenoh connection errors.)
