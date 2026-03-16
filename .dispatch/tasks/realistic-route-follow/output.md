# Route-Following Realism Improvements — Summary

## Changes

### 1. LOS (Line-of-Sight) Guidance (`engine.py`)
Replaced the naive "bearing to next waypoint" with LOS guidance that tracks the path segment between waypoints:
- `_crosstrack_and_along()` — computes crosstrack error and along-track distance from the current path segment
- `_los_heading()` — places a lookahead point along the path ahead of the vessel's projection, returning the bearing to that point. Adaptive lookahead (15m default) shrinks when crosstrack error is large, providing stronger correction when off-track.

**Effect**: Drone stays on the line between waypoints instead of cutting corners. Crosstrack errors are corrected smoothly.

### 2. Turn-Anticipation Speed Control (`engine.py`)
- `_turn_angle_deg()` — computes the turn angle at a waypoint from incoming/outgoing bearings
- `_turn_speed()` — reduces desired speed proportionally to turn severity when within 30m of the waypoint. Speed scales down to 35% of cruise for 180° turns.

**Effect**: Drone decelerates before sharp turns, reducing overshoot. Straight segments maintain full cruise speed.

### 3. Rudder Rate Limiting (`dynamics.py`)
- Added `delta_rate_max` parameter (25 deg/s) to `USVParams`
- Added `_delta` state variable tracking current rudder angle
- Rudder angle change per tick is clamped to `delta_rate_max * dt`

**Effect**: Rudder moves smoothly instead of jumping, creating more realistic turn dynamics with visible yaw lag.

### 4. Smooth Waypoint Transitions
The LOS guidance naturally handles smooth transitions — the lookahead point clamps to the segment endpoint, and the 5m acceptance radius switching combined with LOS on the next segment creates a smooth curve through waypoints rather than an abrupt heading snap.

## Files Modified
- `ghost_drone/simulation/engine.py` — LOS guidance functions, turn-speed functions, updated `_advance()`
- `ghost_drone/simulation/dynamics.py` — rudder rate limiting (parameter + state + step logic)
- `tests/test_dynamics.py` — added `test_rudder_rate_limiting`, updated tick count in `test_heading_convergence`
- `tests/test_sim_engine.py` — added `test_los_converges_on_straight_segment`, `test_turn_speed_reduces_before_sharp_turn`

## Test Results
All 107 tests pass (104 existing + 3 new).
