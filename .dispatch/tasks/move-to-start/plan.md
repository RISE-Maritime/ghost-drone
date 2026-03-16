# Move drone to route start instead of teleporting

When the user presses Play, the drone currently teleports to the first waypoint of the loaded route. Instead, it should navigate from its current position to the route start, then follow the route normally.

## Plan

- [x] **Modify `load_route()` in `engine.py`**: Stop resetting the drone position to the first waypoint. Store the route waypoints but keep the drone at its current position. Also clears remote heading override.

- [x] **Prepend current position as waypoint**: When `play()` is called from STOPPED, if the drone is not already within `WP_ACCEPT_RADIUS_M` of the first waypoint, prepend the drone's current position as waypoint 0. Sets heading toward the next waypoint and resets dynamics.

- [x] **Handle edge cases**: If the drone is already at/near the first waypoint, no redundant waypoint is prepended. `stop()` restores original route waypoints before resetting. `set_home()` also clears `_route_waypoints`. Heading is set toward the first segment on play.

- [x] **Update tests**: Added `test_play_navigates_to_route_start` and `test_play_no_prepend_when_near_start`. Fixed existing tests that depended on `load_route` teleporting (positioned drone explicitly at route start). Fixed 4 e2e tests with `set_home` calls.

- [x] **Run full test suite** (`uv run pytest`) and fix any failures. — 109 passed, 1 pre-existing failure (`test_noise_values_vary_between_runs` — noise was previously removed from engine).

- [x] Write summary of changes to .dispatch/tasks/move-to-start/output.md
