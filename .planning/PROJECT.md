# ghost-drone

## What This Is

A simulated surface water drone that follows a user-drawn route on a browser-based map and publishes realistic telemetry data to a zenoh network using keelson conventions. It is used both for testing keelson-based consumers (dashboards, loggers, processors) without physical hardware and for stakeholder demonstrations. The host machine's webcam is streamed as the drone's camera feed.

## Core Value

A developer or demo operator can draw a route on a map, hit play, and have a fully keelson-compatible drone instantly publishing telemetry and video — no physical hardware required.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] User can open a web UI in the browser to interact with the simulation
- [ ] User can draw a route on an interactive map by placing waypoints
- [ ] User can play, pause, and stop the simulation
- [ ] User can manually override drone heading and speed while running
- [ ] Drone follows the drawn route with smooth motion (configurable speed, realistic turning radius)
- [ ] Drone telemetry includes position, speed, heading, and attitude with sensor noise
- [ ] Drone publishes telemetry to a zenoh network following keelson subject/payload conventions
- [ ] Host machine webcam is captured and published as the drone's camera feed via zenoh/keelson
- [ ] Drone starts at the first waypoint of the drawn route
- [ ] Simulation is configurable (zenoh endpoint, drone identity, speed, noise parameters)

### Out of Scope

- Mobile app — web-first, responsive desktop browser is sufficient
- Multiple simultaneous drones — single drone simulation for v1
- Synthetic/generated video — real webcam only for v1
- GPX/GeoJSON import — draw-on-map is the primary interaction
- GPS-based host position — starts at first drawn waypoint

## Context

- **Keelson conventions:** The keelson framework (https://github.com/RISE-Maritime/keelson/tree/dev) defines subject naming and protobuf payload structures for maritime sensor data. ghost-drone must publish using these exact conventions to be compatible with other keelson consumers.
- **Zenoh:** A pub/sub middleware used by keelson. Python bindings available via `eclipse-zenoh/zenoh-python`.
- **Surface water drone:** Operates on a 2D plane (no altitude). Attitude will include roll/pitch (small oscillations from wave simulation) and yaw (heading).
- **Greenfield project:** No existing code. Python stack.

## Constraints

- **Stack:** Python — natural fit for zenoh-python, data simulation, and web serving
- **Keelson compatibility:** Must use keelson subject naming and payload encoding exactly as defined in the keelson repo
- **Web UI:** Browser-based, served from the Python backend (no separate frontend build step preferred)
- **Camera:** Requires a connected webcam on the host machine; no synthetic fallback in v1

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Python stack | Best ecosystem fit for zenoh-python, HTTP serving, and simulation | — Pending |
| Web app UI | Accessible, cross-platform, no installation required beyond running the Python server | — Pending |
| Webcam-only camera feed | Real video adds authenticity for demos; synthetic adds complexity for v1 | — Pending |

---
*Last updated: 2026-02-18 after initialization*
