# Improve Drone Route-Following Realism

The drone's route-following behaviour is unrealistic. Key issues to fix:
- Drone aims directly at each waypoint (pure pursuit with no crosstrack correction) causing corner-cutting and zigzag on straight segments
- No speed reduction before turns — drone overshoots sharp waypoints at full cruise speed
- Instantaneous rudder changes (no actuator rate limit / servo lag)
- Abrupt waypoint switching at 5m acceptance radius with no path smoothing

## Plan

- [x] **Implement LOS (Line-of-Sight) guidance** in `engine.py`: Added `_crosstrack_and_along()` and `_los_heading()` functions. LOS uses adaptive lookahead (15m default, shrinks with crosstrack error) along the path segment, naturally correcting crosstrack error.

- [x] **Add turn-anticipation speed control**: Added `_turn_angle_deg()` and `_turn_speed()` functions. Speed reduces proportionally to turn severity starting 30m before the waypoint, down to 35% for U-turns.

- [x] **Add rudder rate limiting** in `dynamics.py`: Added `delta_rate_max` param (25 deg/s) and `_delta` state. Rudder angle is rate-limited per tick via clamped delta change.

- [x] **Smooth waypoint transitions**: LOS guidance naturally handles this — the lookahead point clamps to segment end, and the adaptive lookahead means the drone starts tracking the next segment's bearing smoothly rather than snapping.

- [x] **Update tests**: Added `test_rudder_rate_limiting` in test_dynamics.py, `test_los_converges_on_straight_segment` and `test_turn_speed_reduces_before_sharp_turn` in test_sim_engine.py. Updated heading convergence test tick count for rate-limited rudder.

- [x] **Run full test suite** (`uv run pytest`) and fix any failures. All 107 tests pass.

- [x] Write summary of changes to .dispatch/tasks/realistic-route-follow/output.md
