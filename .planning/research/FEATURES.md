# Feature Research

**Domain:** Surface Water Drone Simulator (developer testing + stakeholder demo tool)
**Researched:** 2026-02-18
**Confidence:** MEDIUM — core telemetry subjects verified against keelson/subjects.yaml (HIGH); simulator UX patterns drawn from analogous tools (MEDIUM); anti-feature reasoning drawn from domain experience + multiple sources (MEDIUM)

---

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Interactive map with route drawing | Core interaction — without this, there is no simulator | MEDIUM | Leaflet or MapLibre + polyline draw tool; waypoints as draggable markers |
| Drone marker animating along drawn route | The observable output of the simulation; missing it means nothing to show | MEDIUM | Smooth interpolation between waypoints; marker rotates to match heading |
| Play / Pause / Stop controls | Every simulation tool has transport controls; absence is jarring | LOW | Stop resets drone to first waypoint |
| Real-time position + heading published to zenoh | Primary purpose of the tool for keelson consumers; without this the tool is useless for testing | MEDIUM | Publish `location_fix`, `heading_true_north_deg`, `course_over_ground_deg` per keelson subjects |
| Speed over ground published to zenoh | Keelson consumers expect speed; standard telemetry topic | LOW | Publish `speed_over_ground_knots`; derived from motion model |
| Attitude (roll/pitch/yaw) published to zenoh | Keelson platform expects sensor attitude data; testers need it | MEDIUM | Publish `roll_deg`, `pitch_deg`, `yaw_deg`; add configurable Gaussian noise |
| Sensor noise on all published values | Real hardware produces noisy data; consumers must be tested against it | MEDIUM | Gaussian noise with configurable mean/std; applied before publishing |
| Webcam feed streamed as camera topic | Stated requirement; demo audiences expect a live camera view | MEDIUM | MJPEG over HTTP is simplest; publish `image_compressed` or `video_compressed` to zenoh |
| Start simulation at first waypoint | Users draw a route and expect the drone to begin at the start | LOW | Trivial state machine; initial position = waypoints[0] |
| Simulation speed multiplier (e.g. 0.5x – 4x) | Long routes take too long at 1:1 for demos; speed-up is expected | LOW | Scale dt in motion update loop; does not affect published zenoh timestamps |
| Smooth motion model (no teleporting) | Abrupt position jumps look broken and produce unusable telemetry | MEDIUM | Catmull-Rom or linear interpolation + kinematic smoothing between waypoints |
| Web-based UI (no install required) | Stakeholder demos cannot require software installation | LOW | Python backend + browser frontend; already in project context |

### Differentiators (Competitive Advantage)

Features that set the product apart. Not required, but valued.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Manual override of heading and speed | Lets developers test edge cases (sudden direction change, zero speed) without redrawing routes | MEDIUM | Sliders or numeric inputs; override values replace computed values for the publish cycle |
| Configurable sensor noise per channel | Lets developers test consumer robustness to different noise profiles | MEDIUM | Per-subject noise config (mean, std); exposed in UI as presets (low/medium/high noise) |
| `simulation_status` topic on zenoh | Downstream consumers can know when simulation is running, paused, or stopped without screen access | LOW | Publish keelson `simulation_status` on play/pause/stop transitions |
| Route persistence (save/load as GeoJSON) | Testers reuse the same route across sessions; demos have a prepared route ready | LOW | Use keelson `waypoint_geojson` subject for route format; localStorage or file download/upload |
| Shareable simulation URL | Demo presenter can send a URL that loads a pre-drawn route | LOW | Encode route as compressed query param or server-side short URL |
| Configurable zenoh session key prefix | Different teams / projects on the same zenoh bus need namespace isolation | LOW | Single config field; maps to keelson key expression pattern |
| Drone telemetry dashboard panel in UI | Shows published values live (lat, lon, heading, speed, noise) so developers see what consumers see | MEDIUM | Side panel reading from zenoh or from the motion model directly |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| 3D environment / bathymetry rendering | "More realistic demo" | Adds enormous complexity (3D engine, asset pipeline) for zero benefit to keelson testing; scope creep | 2D top-down map is correct for a surface vessel; defer 3D entirely |
| Multi-drone simulation | "What if we have a fleet?" | Multiplies motion model, UI, zenoh namespace complexity; v1 has one consumer pattern to test | Single drone; design key prefix to allow multiple instances by convention |
| Full physics (water currents, wave forces) | "More accurate" | Requires hydrodynamic solver; far exceeds needs of a keelson consumer test tool | Gaussian noise on top of smooth kinematics is sufficient fidelity for integration testing |
| User authentication / login | "Security for demos" | No multi-user data, no private routes; auth adds backend complexity without value | Accept connections on localhost or LAN; no auth |
| Mission scripting / autopilot commands | "Automate test scenarios" | Turns the tool into a full autopilot simulator; out of scope for v1 | Static route + playback covers 95% of testing needs; add later if needed |
| Video recording / export | "Capture demo footage" | Screen recording tools solve this better; in-app recording adds complexity | Tell users to use OBS or OS screen capture |
| Historical playback from logged zenoh data | "Replay real voyages" | Completely different feature — a log replay tool, not a simulator | Separate tool; log replay is a keelson-ecosystem concern, not ghost-drone's |

---

## Feature Dependencies

```
[Interactive map + route drawing]
    └──requires──> [Drone marker animation]
                       └──requires──> [Smooth motion model]
                                          └──requires──> [Play/Pause/Stop controls]

[Smooth motion model]
    └──requires──> [Zenoh telemetry publishing]
                       └──requires──> [Sensor noise]

[Manual override heading/speed]
    └──enhances──> [Smooth motion model]

[Webcam feed]
    └──requires──> [Zenoh telemetry publishing]

[Route persistence (save/load)]
    └──enhances──> [Interactive map + route drawing]

[Configurable zenoh key prefix]
    └──enhances──> [Zenoh telemetry publishing]

[Simulation speed multiplier]
    └──enhances──> [Play/Pause/Stop controls]

[Drone telemetry dashboard]
    └──enhances──> [Zenoh telemetry publishing]

[simulation_status topic]
    └──enhances──> [Play/Pause/Stop controls]
```

### Dependency Notes

- **Smooth motion model requires Play/Pause/Stop controls:** The motion update loop is driven by the play state; the model cannot advance without it.
- **Zenoh telemetry publishing requires smooth motion model:** Published values are derived from the motion model outputs; bogus motion = bogus telemetry.
- **Sensor noise requires zenoh telemetry publishing:** Noise is applied in the publish layer, not the motion model itself, so consumers see realistic imprecision but the motion model stays clean for animation.
- **Manual override enhances smooth motion model:** Overrides inject values into the motion model output; they do not replace the model, so the drone still moves smoothly on the map.
- **Webcam feed is independent of motion model:** Camera streaming runs as a separate process/thread; it does not depend on position data.

---

## MVP Definition

### Launch With (v1)

Minimum viable product — what's needed for the tool to be useful for keelson consumer testing and stakeholder demos.

- [ ] Interactive map with polyline route drawing — core interaction without which the tool cannot be used
- [ ] Drone marker animating along route with smooth motion model — the observable output
- [ ] Play / Pause / Stop controls — basic transport controls every simulation user expects
- [ ] Simulation speed multiplier — long routes are impractical without this for demos
- [ ] Publish `location_fix`, `heading_true_north_deg`, `course_over_ground_deg`, `speed_over_ground_knots` to zenoh — minimum telemetry for a position-aware keelson consumer
- [ ] Publish `roll_deg`, `pitch_deg`, `yaw_deg` to zenoh — attitude data required by most keelson consumers
- [ ] Configurable Gaussian sensor noise applied to all published values — testing fidelity requirement
- [ ] Webcam feed streamed as `image_compressed` / `video_compressed` zenoh topic — stated requirement; demo anchor
- [ ] Manual override of heading and speed — enables edge-case testing without redrawing routes
- [ ] Start simulation at first waypoint — correct initialization behavior

### Add After Validation (v1.x)

Features to add once the core simulation loop is validated and used in at least one demo.

- [ ] Route persistence (save/load GeoJSON) — add when users start complaining about redrawing the same route every session
- [ ] `simulation_status` zenoh topic — add when a keelson consumer needs to react to sim state changes
- [ ] Configurable zenoh key prefix in UI — add when multiple teams share a zenoh bus
- [ ] Drone telemetry dashboard panel — add when developers ask "what is the simulator actually publishing?"

### Future Consideration (v2+)

Features to defer until the v1 use-case is validated.

- [ ] Shareable simulation URL — useful for distributed demo setups; low priority until remote demos are frequent
- [ ] Per-channel noise presets (low/medium/high) — useful refinement; Gaussian defaults are enough for v1
- [ ] Multi-drone support — only relevant once the single-drone consumer pattern is tested and understood

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Interactive map + route drawing | HIGH | MEDIUM | P1 |
| Drone marker animation | HIGH | MEDIUM | P1 |
| Play / Pause / Stop | HIGH | LOW | P1 |
| Smooth motion model | HIGH | MEDIUM | P1 |
| Zenoh telemetry (position/heading/speed) | HIGH | MEDIUM | P1 |
| Attitude publishing (roll/pitch/yaw) | HIGH | MEDIUM | P1 |
| Sensor noise (Gaussian) | HIGH | LOW | P1 |
| Webcam streaming to zenoh | HIGH | MEDIUM | P1 |
| Manual heading/speed override | MEDIUM | MEDIUM | P1 |
| Simulation speed multiplier | MEDIUM | LOW | P1 |
| simulation_status zenoh topic | MEDIUM | LOW | P2 |
| Route persistence (save/load) | MEDIUM | LOW | P2 |
| Configurable zenoh key prefix | MEDIUM | LOW | P2 |
| Drone telemetry dashboard panel | MEDIUM | MEDIUM | P2 |
| Shareable simulation URL | LOW | LOW | P3 |
| Per-channel noise presets | LOW | LOW | P3 |
| Multi-drone support | LOW | HIGH | P3 |

**Priority key:**
- P1: Must have for launch
- P2: Should have, add when possible
- P3: Nice to have, future consideration

---

## Competitor Feature Analysis

| Feature | AirSim / Gazebo (robotics sim) | SIMNET / full flight sim | ghost-drone (our approach) |
|---------|-------------------------------|--------------------------|---------------------------|
| Route drawing | Mission script / waypoint file | 3D flight plan | Draw on 2D web map — simpler, faster |
| Transport controls | Play/stop | Full timeline scrubber | Play/Pause/Stop + speed multiplier |
| Telemetry output | ROS topics | Proprietary protocol | zenoh / keelson convention topics |
| Camera feed | Synthetic rendered | Synthetic rendered | Real webcam passthrough — useful for mixed real/sim testing |
| Motion model | Full physics engine | Full physics engine | Smooth kinematics + Gaussian noise — right level for integration testing |
| Sensor noise | Configurable per sensor | Configurable | Configurable Gaussian per keelson subject |
| Setup complexity | High (Unreal Engine, ROS) | High (dedicated hardware) | Low (Python + browser, no install) |
| Demo suitability | Poor (requires tech setup) | Poor (requires simulation room) | High (browser URL, runs anywhere) |

**Insight:** AirSim and Gazebo are over-engineered for the ghost-drone use case. ghost-drone's value is the combination of zero-install web UI + real webcam + keelson-native telemetry. No existing tool delivers that combination.

---

## Sources

- Keelson subjects.yaml (verified): [RISE-Maritime/keelson subjects.yaml](https://raw.githubusercontent.com/RISE-Maritime/keelson/main/messages/subjects.yaml) — HIGH confidence for all zenoh subject names
- [RISE-Maritime/keelson GitHub](https://github.com/RISE-Maritime/keelson) — project overview and protocol structure
- [Unmanned Surface Vehicle Simulator with Realistic Environmental Disturbances (MDPI Sensors 2019)](https://www.mdpi.com/1424-8220/19/5/1068) — USV simulation feature reference (MEDIUM confidence, older paper)
- [AirSim documentation](https://microsoft.github.io/AirSim/) — simulator feature comparison baseline (MEDIUM confidence)
- [Drone flight simulator guide (UAV Coach 2025)](https://uavcoach.com/drone-flight-simulator/) — general simulator feature expectations (LOW confidence, consumer focus)
- [WebRTC latency comparison (Wowza 2025)](https://www.nanocosmos.net/blog/webrtc-latency/) — camera streaming protocol selection rationale (MEDIUM confidence)
- [Low-latency webcam streaming (kaanlabs)](https://kaanlabs.com/low-latency-webcam-to-browser-streaming-with-rtsp-webrtc/) — MJPEG vs WebRTC tradeoffs (MEDIUM confidence)
- [OPAL-RT robotics simulation guide](https://www.opal-rt.com/blog/an-engineers-guide-to-robotics-simulation-for-research-and-industry/) — general simulator testing feature patterns (MEDIUM confidence)

---
*Feature research for: ghost-drone — simulated surface water drone (keelson ecosystem)*
*Researched: 2026-02-18*
