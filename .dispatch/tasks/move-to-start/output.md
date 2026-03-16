# Move-to-start: Summary of changes

## Engine changes (`ghost_drone/simulation/engine.py`)

**`__init__`**: Added `_route_waypoints` field to store the original route separately from the active navigation waypoints.

**`load_route()`**: No longer teleports the drone. Stores waypoints in both `_route_waypoints` (original) and `_waypoints` (active). Clears remote heading override. Does NOT call `_reset_to_start()`.

**`play()`**: When transitioning from STOPPED:
1. Restores `_waypoints` from `_route_waypoints`
2. Checks if the drone is within `WP_ACCEPT_RADIUS_M` (5m) of the first waypoint
3. If far away, prepends the current position as waypoint 0
4. Sets heading toward the first segment of the active waypoint list
5. Resets dynamics at the current position

When resuming from PAUSED, no changes — continues where it left off.

**`stop()`**: Restores `_waypoints` from `_route_waypoints` before calling `_reset_to_start()`, ensuring the drone resets to the original route start (not a prepended position).

**`set_home()`**: Also clears `_route_waypoints` (in addition to existing `_waypoints` clear).

## Test changes

**`tests/test_sim_engine.py`**:
- Fixed `test_heading_lag_converges`, `test_route_completes_auto_stops`, `test_los_converges_on_straight_segment` to explicitly position drone at route start before playing
- Added `test_play_navigates_to_route_start`: verifies prepend behavior and drone movement toward route start
- Added `test_play_no_prepend_when_near_start`: verifies no redundant waypoint when drone is already at start

**E2e test fixes** (4 files): Added `set_home()` calls to position the drone at the route start before loading, matching the real-world spawn flow:
- `tests/test_e2e_zenoh.py`
- `tests/test_auto_stop_clears_remote.py`
- `tests/test_nan_fault_location_fix.py`
- `tests/test_stuck_reset_on_stop.py`

## Test results

109 passed, 1 pre-existing failure (`test_noise_values_vary_between_runs` — noise was previously removed from engine).
