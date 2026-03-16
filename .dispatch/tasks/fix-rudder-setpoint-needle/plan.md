# Fix: Rudder SET needle returns to 0 and actual rudder never reaches set heading

Two related issues in the conning display when in manual mode:

## Background

The conning display has a RUDDER gauge. Rudder angle is a *control surface* — it deflects to turn the vessel, then returns to 0° once heading error is small. This is correct physics. But the SET needle currently shows the heading *difference* (setpoint - actual), which also converges to 0 as the vessel turns toward the setpoint. The result: both needles sit at 0 most of the time, making the conning display useless in manual mode.

The user expects: pressing D to turn right should produce a persistent visual indicator of the commanded heading direction that stays put, with the actual indicator visibly lagging/catching up.

## Plan

- [x] Read `frontend/src/telemetry.ts` to understand the current setpoint indicator logic, then redesign the rudder SET needle to show the *absolute commanded heading* mapped to the rudder arc (not the heading difference). — Skipped: item 2 (heading gauge SET readout) is the better approach; rudder SET needle correctly shows heading error which converges to 0 (useful physics info).
- [x] Alternatively (and likely better): change what the SET indicators represent. Instead of trying to make the rudder SET needle meaningful, add heading SET indicators to the **main heading gauge** in the sidebar. Show the setpoint heading value in the heading gauge block (e.g., a "SET 045.0°" label below the actual heading value). The rudder SET needle can remain showing heading error (which correctly converges to 0), but the heading gauge gives the user a persistent readout of what they commanded. Update the heading gauge display in `onTelemetryFrame` to show setpoint when in manual mode. — Done: added `gauge-set-row` with SET label to heading gauge block in index.html, wired up in telemetry.ts via `headingSetRow` and `gaugeHeadingSet` elements.
- [x] Build frontend (`cd frontend && npm run build`) — no errors — Build succeeded.
