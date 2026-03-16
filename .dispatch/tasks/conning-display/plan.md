# Add conning display for rudder angle and engine setting

Add a conning display panel in the frontend showing the selected drone's rudder angle and engine setting (thrust), updated in real-time via zenoh telemetry.

## Plan

- [x] **Publish rudder and thrust in telemetry** — added rudder_deg/thrust_pct to DynamicsOutput, TelemetryFrame, engine tick(): The backend dynamics model already tracks rudder angle (`_delta`) and thrust. Add these fields to `TelemetryFrame` in `models.py` and populate them in `engine.py`'s `tick()`. Publish them as part of the existing zenoh telemetry frame so no new zenoh topic is needed.

- [x] **Create conning display UI component** — added rudder arc gauge and thrust bar to sidebar HTML/CSS: Add a conning display panel to the frontend. Show a rudder angle indicator (graphical arc or gauge showing port/starboard deflection in degrees) and an engine setting indicator (thrust bar or gauge, 0–100%). Style it to look like a maritime conning display.

- [x] **Subscribe to telemetry and update display** — telemetry.ts reads rudder_deg/thrust_pct and updates conning gauges: Parse the rudder angle and engine/thrust fields from the zenoh telemetry messages in the frontend. Update the conning display on each frame for the selected drone.

- [x] **Build frontend** (`cd frontend && npm run build`) and run backend tests (`uv run pytest`). Fix any failures. — build OK, 24/24 sim tests pass, 66 zenoh integration errors are pre-existing (no router)
