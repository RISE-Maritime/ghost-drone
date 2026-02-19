# Roadmap: ghost-drone

## Overview

ghost-drone builds in four phases driven by the dependency tree: validated zenoh/keelson publishing infrastructure must exist before the simulation can publish anything; the simulation engine and interactive map must exist before telemetry can be observed; all core telemetry must work before adding the camera as a parallel output. Each phase delivers a coherent, independently-verifiable capability on the way to a fully keelson-compatible drone that requires no physical hardware.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Project scaffold, configuration, and a validated zenoh/keelson publish helper with round-trip tests (2/2 plans complete)
- [ ] **Phase 2: Simulation and Map UI** - Drone simulation engine with route following and noise, wired to an interactive browser map with play/pause/stop controls
- [ ] **Phase 3: Telemetry Publishing** - Simulation output published to zenoh as keelson-wrapped messages; browser shows live telemetry plots
- [ ] **Phase 4: Camera Integration** - Host webcam streamed to browser and published as keelson image_compressed to zenoh

## Phase Details

### Phase 1: Foundation
**Goal**: The project has a runnable skeleton with a validated zenoh/keelson publish pipeline and configurable identity
**Depends on**: Nothing (first phase)
**Requirements**: SETUP-01, SETUP-02
**Success Criteria** (what must be TRUE):
  1. Running `python -m ghost_drone` (or equivalent entry point) starts a FastAPI server and serves the web UI in the browser with no build step required
  2. Zenoh endpoint, keelson realm, and entity ID are configurable via a config file or environment variables before starting the simulation
  3. A round-trip unit test passes: a payload wrapped with `keelson.enclose()` can be recovered with `keelson.uncover()` and contains the correct subject and protobuf bytes
  4. All keelson subjects used by the project are validated as well-known at startup and the process exits with a clear error if any subject is unrecognised
**Plans**: 2 plans

Plans:
- [x] 01-01-PLAN.md — Project scaffold, config loader, FastAPI server, startup sequence, placeholder UI
- [x] 01-02-PLAN.md — ZenohPublisher daemon thread scaffold, keelson round-trip tests, GitHub Actions CI

### Phase 2: Simulation and Map UI
**Goal**: A user can draw a waypoint route on the browser map, hit play, and watch an animated drone marker follow the route with realistic motion
**Depends on**: Phase 1
**Requirements**: SIM-01, SIM-02, SIM-03, UI-01, UI-02, UI-03
**Success Criteria** (what must be TRUE):
  1. User can place waypoints on the Leaflet map in the browser to define a polyline route
  2. Clicking Play starts the simulation; the drone marker animates along the drawn route from the first waypoint at a configurable cruise speed
  3. Pause halts the drone marker mid-route; Play resumes from the paused position; Stop returns the drone to idle with no marker movement
  4. Drone heading changes smoothly using a first-order lag model rather than snapping instantly between waypoints
  5. Published position, heading, and speed values show Gaussian noise visible in logged output (values are not perfectly deterministic across identical runs)
**Plans**: TBD

### Phase 3: Telemetry Publishing
**Goal**: Every keelson telemetry subject is published to the zenoh network during simulation, and the browser displays live plots of the published values
**Depends on**: Phase 2
**Requirements**: TELEM-01, TELEM-02, TELEM-03, TELEM-04, UI-05
**Success Criteria** (what must be TRUE):
  1. A zenoh subscriber (e.g., zenoh-cli `z_sub`) receives `location_fix`, `heading_true_north_deg`, `speed_over_ground_knots`, `roll_deg`, and `pitch_deg` messages while the simulation is playing
  2. Each received message decodes correctly as a keelson envelope containing the expected protobuf payload type with a non-zero timestamp
  3. The browser UI shows live-updating plots of heading, speed, roll, and pitch that change in real time during simulation and freeze when paused
  4. No telemetry messages are published while the simulation is stopped or paused
**Plans**: TBD

### Phase 4: Camera Integration
**Goal**: The host webcam feed is visible in the browser and published as keelson image_compressed to the zenoh network
**Depends on**: Phase 3
**Requirements**: CAM-01, CAM-02, UI-04
**Success Criteria** (what must be TRUE):
  1. The browser UI shows a live webcam feed from the host machine that updates in real time without requiring any browser plugin or separate server
  2. A zenoh subscriber receives `image_compressed` messages while the webcam is active, and each message decodes as a keelson envelope containing JPEG bytes that form a valid image
  3. The JPEG frame is encoded once and delivered to both the browser MJPEG stream and the zenoh publisher without a second encode pass
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 2/2 | Complete   | 2026-02-19 |
| 2. Simulation and Map UI | 0/TBD | Not started | - |
| 3. Telemetry Publishing | 0/TBD | Not started | - |
| 4. Camera Integration | 0/TBD | Not started | - |
