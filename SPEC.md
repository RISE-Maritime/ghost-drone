# SPEC.md — Behavioral specification

Describes the expected behavior of ghost-drone (see JOBS.md for context).
Each behavior is a testable "when X, then Y" statement.

## Fleet

- When a user clicks on the map, a new drone is spawned at that location with a unique entity_id.
- Each drone publishes telemetry under its own keelson key expressions (scoped by entity_id).
- Multiple drones can run simultaneously without interfering with each other.

## Control

- When a route is loaded and autonomous mode is enabled, the drone moves to the start of the route and follows it.
- When a drone is paused, it holds its current position. When resumed, it continues from where it stopped.
- When a drone is stopped, it resets to idle and publishes no telemetry (except entity_health as INACTIVE).
- A drone can be remote-controlled: movement commands sent via zenoh override autonomous navigation.
- Routes require at least 2 waypoints; loading fewer is rejected with an error.

## Fault injection

- A fault can be injected on any subject of any drone. Supported fault types:
  - **stuck**: the published value freezes at its current reading.
  - **NaN**: the published payload contains NaN.
  - **wrong rate**: the subject publishes at a rate different from its configured Hz.
  - **drop**: the subject stops publishing entirely.
- Faults can be combined (e.g., stuck + wrong rate on the same subject).
- When a fault is cleared, the subject returns to normal behavior.
- Faults are controllable via zenoh queryable (for scripts and automated tests).
- Faults are controllable from the browser UI (fault injection panel per drone, with toggles per fault type per subject).

## Entity health

- Each drone publishes `entity_health` at a steady rate regardless of its state.
- When idle/stopped, health level is INACTIVE and operation mode is IDLE.
- When playing autonomously, health level is NOMINAL and operation mode is AUTONOMOUS.
- When a fault is active, the affected subsystem's health reflects it (DEGRADED or CRITICAL).
- `telemetry_expectations` in the health message match the drone's current settings (subjects, rates, source_ids).

## Browser UI

- Clicking on the map creates a drone at that location.
- A route can be drawn on the map and assigned to a drone.
- All active drones are visible on the map with their current positions.
- The UI displays each drone's `entity_health` status (nominal/degraded/critical/inactive).
- The UI shows per-subsystem health breakdown (position, heading, speed).
- Health display updates live as the drone state or faults change.
- The fault injection panel allows activating and clearing faults per subject, with immediate effect.

## Telemetry

- While playing, the drone publishes all configured keelson subjects (location_fix, heading, speed, roll, pitch) at their configured rates.
- While stopped, no keelson telemetry is published (entity_health excepted).
- sim_frame is published at ~20 Hz for the browser UI regardless of play state.
- Settings (rates, source_ids, noise, roll/pitch amplitude) can be read and updated via zenoh queryable.
