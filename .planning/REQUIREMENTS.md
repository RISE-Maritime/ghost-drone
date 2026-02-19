# Requirements: ghost-drone

**Defined:** 2026-02-18
**Core Value:** A developer or demo operator can draw a route on a map, hit play, and have a fully keelson-compatible drone instantly publishing telemetry and video — no physical hardware required.

## v1 Requirements

### Setup & Configuration

- [x] **SETUP-01**: User can configure the zenoh endpoint and keelson key prefix (realm, entity ID) before starting the simulation
- [x] **SETUP-02**: Application serves the web UI directly from the Python backend with no separate frontend build step

### Simulation Engine

- [x] **SIM-01**: Drone follows the drawn waypoint route with smooth motion using a first-order lag heading model at a configurable cruise speed
- [x] **SIM-02**: Drone telemetry includes Gaussian noise on position, heading, and speed to simulate realistic sensor imperfection
- [x] **SIM-03**: Drone starts at the first waypoint of the drawn route when the simulation is played

### Web UI

- [x] **UI-01**: User can draw a route on an interactive map by placing waypoints (polyline) in the browser
- [x] **UI-02**: Drone position is shown as an animated marker on the map that updates in real time during simulation
- [x] **UI-03**: User can play, pause, and stop the simulation from the web UI
- [ ] **UI-04**: User can view the host webcam feed embedded in the web UI
- [x] **UI-05**: Web UI displays real-time plots of published telemetry values (heading, speed, roll, pitch) updating live during simulation

### Telemetry Publishing

- [x] **TELEM-01**: Drone publishes position (`location_fix`, foxglove.LocationFix) to zenoh using keelson envelope encoding at the configured key expression
- [x] **TELEM-02**: Drone publishes heading (`heading_true_north_deg`, TimestampedFloat) to zenoh using keelson envelope encoding
- [x] **TELEM-03**: Drone publishes speed (`speed_over_ground_knots`, TimestampedFloat) to zenoh using keelson envelope encoding
- [x] **TELEM-04**: Drone publishes attitude (`roll_deg` and `pitch_deg`, TimestampedFloat each) to zenoh using keelson envelope encoding

### Camera

- [ ] **CAM-01**: Host webcam frames are captured and streamed as MJPEG to the web UI browser page
- [ ] **CAM-02**: Host webcam frames are published as `image_compressed` to zenoh using keelson envelope encoding

## v2 Requirements

### Simulation Controls

- **CTRL-01**: User can run the simulation at a configurable speed multiplier (1x, 2x, 5x)
- **CTRL-02**: User can manually override drone heading and speed from the browser while the simulation is running

### Additional Telemetry

- **TELEM-05**: Drone publishes orientation quaternion (`orientation_quaternion`) to zenoh using keelson envelope encoding
- **TELEM-06**: Drone publishes simulation state as `simulation_status` topic so consumers can detect sim vs. real data

### Route Management

- **ROUTE-01**: User can save and reload drawn routes between sessions

## Out of Scope

| Feature | Reason |
|---------|--------|
| Multiple simultaneous drones | Single drone is sufficient for v1 testing and demos; adds orchestration complexity |
| Synthetic/generated video fallback | Real webcam adds authenticity; synthetic adds complexity without clear v1 value |
| GPX/GeoJSON route import | Draw-on-map is the primary UX; import is a v2 convenience |
| 3D environment / hydrodynamic physics | Overkill for keelson consumer testing; Gaussian noise provides sufficient realism |
| Mobile app | Web browser is sufficient; responsive desktop UI is the target |
| Authentication / multi-user | Single-operator local tool for v1 |
| Route replay from recorded data | Out of initial scope; separate tool concern |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| SETUP-01 | Phase 1 | Complete (plan 01-01) |
| SETUP-02 | Phase 1 | Complete (plan 01-01) |
| SIM-01 | Phase 2 | Complete |
| SIM-02 | Phase 2 | Complete |
| SIM-03 | Phase 2 | Complete |
| UI-01 | Phase 2 | Complete |
| UI-02 | Phase 2 | Complete |
| UI-03 | Phase 2 | Complete |
| UI-04 | Phase 4 | Pending |
| UI-05 | Phase 3 | Complete |
| TELEM-01 | Phase 3 | Complete |
| TELEM-02 | Phase 3 | Complete |
| TELEM-03 | Phase 3 | Complete |
| TELEM-04 | Phase 3 | Complete |
| CAM-01 | Phase 4 | Pending |
| CAM-02 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 16 total
- Mapped to phases: 16
- Unmapped: 0

---
*Requirements defined: 2026-02-18*
*Last updated: 2026-02-19 after plan 01-01 — SETUP-01, SETUP-02 complete*
