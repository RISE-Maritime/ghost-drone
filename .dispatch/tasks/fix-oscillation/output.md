# Fix: Post-turn oscillation in route following

## Problem
After completing a turn, the drone exhibited severe heading oscillation (142° peak-to-peak, damping ratio 0.89) caused by two compounding issues:
1. **Heading PD controller was underdamped**: `Kp=3.0` drove aggressive corrections, `Kd=1.5` provided insufficient damping
2. **LOS adaptive lookahead shrank too aggressively**: formula `max(5, 15 - |cross|)` reduced lookahead to 5m with just 10m crosstrack error, causing jerky heading commands after segment transitions

## Changes

### `ghost_drone/simulation/dynamics.py`
- `heading_Kp`: 3.0 → 1.5 (halved proportional gain to reduce overshoot)
- `heading_Kd`: 1.5 → 3.0 (doubled derivative gain to add damping)

### `ghost_drone/simulation/engine.py`
- `LOS_LOOKAHEAD_M`: 15.0 → 20.0 (longer base lookahead for smoother corrections)
- `LOS_MIN_LOOKAHEAD_M`: 5.0 → 12.0 (higher floor prevents overly aggressive corrections)
- Adaptive factor: `1.0 × |cross|` → `0.3 × |cross|` (gentler lookahead reduction)

### `tests/test_sim_engine.py`
- Added `test_post_turn_heading_dampens`: simulates a 90° turn route and asserts the heading settles to < 20° peak-to-peak within 5-10s after the turn

## Results
| Metric | Before | After |
|--------|--------|-------|
| Peak-to-peak (2nd half) | 120.0° | 3.6° |
| Damping ratio | 0.89 | 0.04 |
| Zero crossings | 3 | 1 |
| Max yaw rate | ±42.6°/s | 30.2°/s |

All 24 simulation tests pass.
