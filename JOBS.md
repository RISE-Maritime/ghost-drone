# JOBS.md — Jobs to be done

ghost-drone exists to develop and test a **drone control and monitoring system**.
The current focus is the **health monitoring** component of that system.

## 1. Simulate a fleet of drones

Run multiple ghost-drone instances (ghost-drone-1, ghost-drone-2, ...), each
publishing independent keelson telemetry on zenoh with its own entity_id,
route, and configuration.

## 2. Control drones via zenoh

Send commands to individual drones through zenoh: execute a route autonomously,
remote-control movement, play/pause/stop. Controllable from the browser UI,
scripts, or any zenoh client.

## 3. Inject simulated sensor faults

Fake failure modes on any drone's telemetry to exercise the health monitor:
- Wrong publish rates (e.g. 2 Hz instead of 1 Hz, or dropped to 0)
- Stuck/frozen values
- NaN payloads
- Any combination per subject

Controllable from the browser UI and scriptable via zenoh for automated testing.

## 4. Provide entity health messages

Each drone publishes `entity_health` describing its own view of its subsystems,
operation mode, and expected telemetry. The health monitor cross-references
these self-reports against the actual telemetry it observes.

## 5. Demo to stakeholders

Browser UI to draw routes on a map, watch drones move, see telemetry, and
trigger faults — all without physical hardware.
