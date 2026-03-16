# Fix post-turn oscillation in route following

The drone oscillates significantly after completing a turn. This is likely caused by the PD heading controller overshooting, the LOS guidance producing rapid heading corrections, or insufficient yaw damping.

## Plan

- [x] **Diagnose the oscillation**: Both PD gains underdamped (Kp=3.0 too high, Kd=1.5 too low) AND adaptive lookahead shrinks from 15m to 5m too aggressively. 142° P2P oscillation, damping ratio 0.89.

- [x] **Tune the heading PD controller**: Adjusted `heading_Kp` 3.0→1.5, `heading_Kd` 1.5→3.0 in `dynamics.py`. Halved proportional gain, doubled derivative (damping) gain.

- [x] **Tune the LOS lookahead**: Increased `LOS_LOOKAHEAD_M` 15→20m, `LOS_MIN_LOOKAHEAD_M` 5→12m, and reduced adaptive factor from 1.0× to 0.3× crosstrack.

- [x] **Verify fix with tests**: All 24 tests pass. Added `test_post_turn_heading_dampens` asserting < 20° P2P after settling. Post-fix result: 3.6° P2P, damping ratio 0.04.

- [x] Write summary of changes to .dispatch/tasks/fix-oscillation/output.md
