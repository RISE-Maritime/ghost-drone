# Project Research Summary

**Project:** ghost-drone
**Domain:** Simulated surface water drone — Python backend with zenoh/keelson telemetry, browser map UI, and webcam passthrough
**Researched:** 2026-02-18
**Confidence:** MEDIUM-HIGH

## Executive Summary

ghost-drone is a developer testing and stakeholder demo tool, not a high-fidelity physics simulator. Its defining value proposition is the combination of zero-install browser UI, real webcam passthrough, and native keelson/zenoh telemetry — a combination that no existing simulator (AirSim, Gazebo, SIMNET) delivers. The correct build approach is a single Python process running FastAPI with uvicorn, hosting two daemon threads (zenoh publisher, OpenCV camera capture) and several asyncio coroutines (simulation loop, WebSocket broadcast, video relay). The entire frontend is a static HTML page with Leaflet and Geoman loaded from CDN — no build step, no npm.

The recommended stack is well-verified for all components except keelson, which is a pre-v1.0 alpha SDK (0.5.0a9) installed directly from GitHub. All other libraries are stable releases with confirmed compatibility. The core architectural constraint that everything flows from is that zenoh-python dropped async support in v0.6 and is synchronous-only; this forces the daemon thread pattern for publishing. Everything else — simulation math in asyncio, camera capture in a thread, WebSocket broadcast in asyncio — follows cleanly from that constraint.

The highest-risk pitfalls are all keelson/zenoh protocol correctness issues concentrated in the earliest build phase: wrong subject names, missing envelope wrapping, wrong protobuf timestamp API, and multiple sessions. These are silent failures — the publisher runs without errors but consumers receive garbage. The mitigation is to build and validate a single publish helper function with round-trip tests before writing any application logic that calls it. Get that right first and everything downstream is straightforward.

---

## Key Findings

### Recommended Stack

The stack is Python 3.11+ (required by keelson), FastAPI 0.129.0 with uvicorn 0.41.0 as the ASGI server, eclipse-zenoh 1.7.2 with the keelson 0.5.0a9 SDK for telemetry, and opencv-python 4.13.0.92 for webcam capture and MJPEG encoding. The browser frontend uses Leaflet 1.9.4 and Geoman 2.19.2 (both via CDN). No build toolchain is needed.

The keelson SDK is installed directly from the `dev` branch on GitHub (not PyPI) and requires pinning to a specific commit SHA for reproducibility. All other dependencies are published stable releases. The version compatibility matrix is verified: eclipse-zenoh 1.7.2 satisfies keelson's `>=1.2.1` constraint, protobuf `>=5.29.1` satisfies keelson's constraint, and Geoman 2.19.2 is tested against Leaflet 1.9.x.

**Core technologies:**
- **Python 3.11+**: Runtime — keelson SDK minimum requirement; asyncio mature at this version
- **eclipse-zenoh 1.7.2**: Pub/sub transport — only official Python binding; 1.x API is a full rewrite from 0.x
- **keelson 0.5.0a9**: Envelope wrapping, key construction, subject registry — only correct way to follow keelson conventions
- **protobuf >=5.29.1**: Payload serialization — must use google.protobuf (not betterproto); keelson ships pre-generated stubs
- **FastAPI 0.129.0 + uvicorn 0.41.0**: HTTP server, WebSocket endpoints, MJPEG streaming — async-native, shares event loop with simulation
- **opencv-python 4.13.0.92**: Webcam capture and JPEG encoding — universal cross-platform API via `cv2.VideoCapture`
- **Leaflet 1.9.4 + Geoman 2.19.2**: Browser map and route drawing — CDN-served, no build step; Geoman supersedes unmaintained Leaflet.draw

**Hard avoids:** betterproto (incompatible with keelson stubs), zenoh-python 0.x (API removed), Leaflet.draw (unmaintained), Flask (no native asyncio), multiprocessing for simulation (zenoh sessions not fork-safe), npm/webpack build step (project constraint).

### Expected Features

The feature set divides cleanly into a v1 MVP and post-validation additions. The MVP is fully defined by the dependency tree: map and route drawing must come first because everything else depends on a route. The simulation loop is the core, and zenoh telemetry publishing is the primary output of that loop.

**Must have for launch (v1):**
- Interactive map with polyline route drawing — core interaction without which nothing works
- Drone marker animating along route with smooth motion model — the observable output
- Play / Pause / Stop controls with simulation speed multiplier — every simulation tool requires transport controls
- Publish `location_fix`, `heading_true_north_deg`, `course_over_ground_deg`, `speed_over_ground_knots` to zenoh — minimum position telemetry
- Publish `roll_deg`, `pitch_deg`, `yaw_deg` to zenoh — attitude data required by most keelson consumers
- Configurable Gaussian sensor noise applied to all published values — required for consumer integration testing
- Webcam feed streamed as `image_compressed` zenoh topic — stated requirement; demo anchor
- Manual override of heading and speed — enables edge-case testing without redrawing routes

**Should have (add post-validation, v1.x):**
- Route persistence (save/load GeoJSON) — eliminates the redraw problem for recurring demos
- `simulation_status` zenoh topic — lets consumers react to sim state without screen access
- Configurable zenoh key prefix — needed when multiple teams share a bus
- Drone telemetry dashboard panel — developer visibility into what is actually being published

**Defer (v2+):**
- Shareable simulation URL — useful but not blocking any current use case
- Per-channel noise presets — Gaussian defaults are sufficient for v1
- Multi-drone support — premature until single-drone consumer patterns are validated

**Firm anti-features (never):** 3D environment, full hydrodynamic physics, user authentication, mission scripting, in-app video recording, log replay.

### Architecture Approach

The architecture is a single Python process with asyncio as the coordination spine. FastAPI/uvicorn runs natively in the event loop alongside a simulation coroutine (10 Hz fixed-rate loop) and a WebSocket broadcast coroutine. Two daemon threads handle the blocking I/O that cannot be made async: a zenoh publisher thread (because zenoh-python is sync-only) and an OpenCV capture thread (because `cv2.VideoCapture.read()` blocks). The asyncio and thread worlds communicate exclusively through stdlib `queue.Queue` objects — asyncio.Queue is not thread-safe and must never cross thread boundaries.

State ownership is clear: `DroneState` is owned by the asyncio event loop and mutated only by the simulation coroutine. Threads receive serialized bytes through queues, never Python objects owned by the loop. This eliminates locking requirements within asyncio and prevents torn reads from threads.

**Major components:**
1. **FastAPI app (main.py)**: HTTP server, WebSocket endpoints `/ws/control` and `/ws/telemetry`, MJPEG `/video/mjpeg` endpoint, static UI serving; lifespan manages all task/thread lifecycle
2. **SimulationEngine (simulation/engine.py)**: Fixed-rate asyncio coroutine; owns `DroneState`; drives dynamics, noise, and state distribution to WebSocket and zenoh queues
3. **ZenohPublisher (zenoh_bridge/publisher.py)**: Daemon thread; single zenoh session; declares all publishers on startup; consumes from stdlib queue; wraps payloads with `keelson.enclose()`
4. **CameraCapture (camera/capture.py)**: Daemon thread; continuously reads and discards frames keeping only the latest; JPEG-encodes in the capture thread; distributes bytes to browser MJPEG and zenoh queues
5. **ConnectionManager (web/connection_manager.py)**: Manages WebSocket client set; broadcasts telemetry JSON per simulation tick using per-client asyncio queues
6. **Browser UI (static/)**: Leaflet map with Geoman route drawing; WebSocket client for control commands and telemetry; `<img>` tag for MJPEG camera feed; no build step

**Build order from ARCHITECTURE.md (verified dependency-driven):**
1. DroneState model + simulation engine (pure math, unit-testable, no I/O)
2. FastAPI skeleton + static UI (map loads, no WebSocket yet)
3. WebSocket layer (control commands + telemetry broadcast to browser)
4. Zenoh publisher thread (keelson-wrapped messages to zenoh network)
5. Camera capture + MJPEG browser stream
6. Camera to zenoh publishing

### Critical Pitfalls

All critical pitfalls are either keelson/zenoh correctness issues (Phase 1 risks) or asyncio/threading anti-patterns (Phase 2 risks). Silent failures dominate — code runs without errors but produces wrong results.

1. **Missing keelson envelope** — Publishing raw protobuf bytes instead of `keelson.enclose(payload.SerializeToString())` produces data that looks valid to zenoh but breaks every keelson consumer. Write a single validated publish helper with a round-trip unit test (`enclose` then `uncover`) before wiring up any publisher.

2. **Wrong keelson subject names** — Subjects must exactly match the well-known registry (e.g., `location_fix`, not `gps_position`). The SDK warns but does not error; consumers on wildcard subscriptions receive data they cannot decode. Validate every subject with `keelson.is_subject_well_known()` at startup and add assertions.

3. **Protobuf timestamp API misuse** — `data.timestamp = time.time()` silently produces zero timestamps. Always use `data.timestamp.FromNanoseconds(time.time_ns())`. Zero timestamps break all time-series consumers and visualizations.

4. **zenoh-python in asyncio event loop** — Calling `pub.put()` directly from an async coroutine blocks the entire event loop. All WebSocket clients stall until the zenoh call returns. Enforce the daemon thread + `queue.Queue` pattern from project start; recovery requires an architecture change.

5. **Simulation loop blocking with `time.sleep()`** — `time.sleep(dt)` in an async function blocks the event loop for the full sleep duration. Use `await asyncio.sleep(dt)` for the asyncio simulation task, and use the accumulator pattern (`next_tick += dt; sleep_time = next_tick - monotonic()`) to prevent drift accumulation over long missions.

6. **OpenCV frame buffer lag** — `cv2.VideoCapture.read()` returns the oldest buffered frame. A dedicated capture thread that continuously reads and discards frames, storing only the latest, is required for real-time freshness. Always `.copy()` the frame before queuing — OpenCV's default copy is shallow and the data changes under you.

---

## Implications for Roadmap

Based on the combined research, the architecture's build order maps directly to a 4-phase roadmap. The dependency tree from FEATURES.md and the suggested build order from ARCHITECTURE.md agree on the sequencing. All critical pitfalls cluster in Phase 1 (keelson/zenoh correctness) and Phase 2 (asyncio simulation loop) — which validates putting foundational plumbing before any visible features.

### Phase 1: Zenoh and Keelson Foundation

**Rationale:** All critical pitfalls are keelson/zenoh correctness issues (wrong subjects, missing envelope, wrong timestamp). Establishing a single validated publish helper with round-trip tests before any application logic prevents silent corruption that is expensive to diagnose after the fact. zenoh session lifecycle and single-session discipline must also be locked in here.

**Delivers:** A working, validated zenoh publishing pipeline that correctly wraps keelson envelopes, uses only well-known subjects, and exits cleanly. Verifiable with zenoh-cli or a subscriber without any UI.

**Implements:**
- `zenoh_bridge/publisher.py`: single session, daemon thread, queue consumer
- `models.py`: `DroneState` and `RouteWaypoint` dataclasses
- Startup subject validation (`keelson.is_subject_well_known()` assertions)
- Round-trip unit test for `enclose`/`uncover`
- Protobuf timestamp helper enforced in publish utility

**Avoids:** Pitfalls 1-6 (all keelson/zenoh correctness issues); establishes patterns that prevent silent protocol failures throughout the project.

**Research flag:** SKIP — keelson SDK source, zenoh docs, and the PITFALLS research are comprehensive. Patterns are well-defined. No additional research needed.

---

### Phase 2: Simulation Loop and FastAPI Skeleton

**Rationale:** The simulation engine is the core of everything — route following, dynamics, noise — and it must be testable in isolation before any I/O is added. The asyncio event loop structure must also be established here (lifespan pattern, `asyncio.create_task`, correct sleep pattern) because the architecture is difficult to retrofit later if blocking calls are introduced. This phase proves the simulation math is correct before any telemetry is published.

**Delivers:** A running FastAPI server with a 10 Hz simulation loop that advances a drone along a waypoint list, applies Gaussian noise, and serves a static map UI in the browser (no WebSocket yet). Drone position verified in logs.

**Implements:**
- `simulation/dynamics.py`: heading/speed first-order lag integration
- `simulation/noise.py`: Gaussian noise generators
- `simulation/route.py`: waypoint sequencing, Haversine bearing, arrival detection
- `simulation/engine.py`: 10 Hz asyncio task, state machine (IDLE/PLAYING/PAUSED), accumulator timing pattern
- `main.py`: FastAPI lifespan, static file serving
- `static/index.html + app.js`: Leaflet map with Geoman route drawing (no WebSocket yet)

**Avoids:** Simulation loop blocking the event loop (Pitfall 7); timing drift from naive `time.sleep()` (Pitfall 10).

**Research flag:** SKIP — asyncio patterns and simulation dynamics are well-documented standard patterns.

---

### Phase 3: WebSocket Real-Time Layer and Zenoh Telemetry

**Rationale:** With a working simulation engine and validated zenoh publisher, connecting them produces the primary product value: a drone that moves on a map and publishes real keelson telemetry. This phase wires the three components together — simulation engine → WebSocket broadcast → browser map animation, and simulation engine → zenoh queue → zenoh network.

**Delivers:** Full end-to-end real-time telemetry. Browser shows drone moving along drawn route. zenoh subscribers receive correctly-wrapped keelson messages for `location_fix`, `heading_true_north_deg`, `course_over_ground_deg`, `speed_over_ground_knots`, `roll_deg`, `pitch_deg`, `yaw_deg`. Play/Pause/Stop controls work. Simulation speed multiplier works.

**Implements:**
- `web/connection_manager.py`: per-client asyncio queues, broadcast to all connected clients with disconnect handling
- `web/router.py`: `/ws/control` (commands in), `/ws/telemetry` (telemetry out)
- Browser WebSocket client in `app.js`: receives telemetry JSON, updates Leaflet marker with smooth animation
- Wire `SimulationEngine` → `ZenohPublisher` queue for all telemetry subjects
- Manual heading/speed override inputs in browser UI

**Avoids:** Slow-client WebSocket blocking (use `asyncio.wait_for` with timeout per client); Leaflet marker jitter (CSS transition or Leaflet animation on `setLatLng`); asyncio.Queue across thread boundaries (use stdlib queue for thread bridge).

**Research flag:** SKIP — WebSocket broadcast patterns and Leaflet marker animation are standard, well-documented approaches.

---

### Phase 4: Webcam Integration and Camera Telemetry

**Rationale:** Camera integration is independent of the simulation loop and is therefore correctly deferred until the core telemetry path is validated. Camera introduces the two remaining high-risk pitfalls (frame buffer lag, dual JPEG encode). Isolating camera work in its own phase keeps risk contained.

**Delivers:** Live webcam feed visible in browser via `<img>` MJPEG tag. Same JPEG bytes published to zenoh as `image_compressed` keelson topic. Single encode shared between both outputs.

**Implements:**
- `camera/capture.py`: `LatestFrameCapture` daemon thread with continuous read-discard, single latest frame in `queue.Queue(maxsize=1)`, mandatory `.copy()` on frame retrieval
- `/video/mjpeg` MJPEG `StreamingResponse` endpoint in FastAPI
- Video broadcast coroutine: reads frame queue, encodes JPEG once, yields to browser and puts to zenoh queue simultaneously
- `image_compressed` subject publishing via `ZenohPublisher`

**Avoids:** Frame buffer lag (continuous read-discard thread pattern); dual JPEG encode (encode once, share bytes to both outputs); CORS issues (camera endpoint served from same origin as UI).

**Research flag:** SKIP — OpenCV capture thread pattern and MJPEG streaming are well-established. The specific patterns are fully specified in PITFALLS.md and ARCHITECTURE.md.

---

### Phase 5: Polish and Post-Validation Features (v1.x)

**Rationale:** After the core is validated in at least one real demo or developer testing session, add the quality-of-life features that reduce friction for recurring use. These are all low-complexity additions that build directly on Phase 3 infrastructure.

**Delivers:** Route save/load as GeoJSON (eliminates redrawing for demos), `simulation_status` zenoh topic (consumers can track sim state), configurable zenoh key prefix (multi-team bus support), telemetry dashboard panel (developer visibility into published values).

**Implements:**
- Route persistence: localStorage save/load or GeoJSON file download/upload; `waypoint_geojson` keelson subject for route format
- `simulation_status` topic: publish on play/pause/stop state transitions
- Zenoh key prefix config: single config field mapped to keelson key expression `realm` parameter
- Telemetry dashboard: side panel reading last-published values from motion model state

**Avoids:** Feature creep into v2 territory (multi-drone, shareable URLs, per-channel noise presets are all explicitly deferred).

**Research flag:** SKIP — all features are straightforward extensions of Phase 3/4 infrastructure.

---

### Phase Ordering Rationale

- **Pitfall clustering drives Phase 1 first:** Six of ten critical pitfalls are keelson/zenoh correctness issues. All are silent failures. Establishing validated publish infrastructure before any application logic is the highest-leverage investment.
- **Dependency tree drives Phase 2 before Phase 3:** The simulation engine must produce correct state before any WebSocket or zenoh consumer can use it. Testing the engine in isolation (no I/O) makes bugs cheaper to find.
- **Architecture independence drives Phase 4 last:** Camera capture is architecturally independent — it adds a thread and a queue but does not touch the simulation or WebSocket layer. Deferring it keeps each phase's scope tight.
- **Feature dependencies from FEATURES.md confirm this order:** Interactive map → smooth motion model → play/pause controls → zenoh telemetry is the explicit dependency chain. Webcam is listed as independent of the motion model.

### Research Flags

Phases likely needing deeper research during planning:
- **None identified.** All four phases use well-documented patterns with verified source material. The keelson SDK source, zenoh-python docs, FastAPI docs, and OpenCV community patterns collectively cover every technical decision.

Phases with standard patterns (skip research-phase):
- **Phase 1:** zenoh and keelson patterns fully specified in STACK.md and PITFALLS.md with SDK source verification.
- **Phase 2:** asyncio simulation loop and FastAPI lifespan patterns are FastAPI official documentation.
- **Phase 3:** WebSocket broadcast and Leaflet integration are standard patterns with multiple verified sources.
- **Phase 4:** OpenCV capture thread and MJPEG streaming patterns fully specified in PITFALLS.md and ARCHITECTURE.md.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | MEDIUM-HIGH | All except keelson verified via PyPI and official docs. keelson is pre-v1.0 alpha — API may shift between 0.5.0a9 and a future release. Pin to commit SHA. |
| Features | MEDIUM | Keelson subject names verified HIGH against subjects.yaml. Feature prioritization drawn from analogous tools and domain experience — reasonable but not externally validated. |
| Architecture | HIGH | Concurrency model verified against zenoh-python issue #95 (async support dropped). FastAPI lifespan and asyncio patterns from official docs. Daemon thread + queue pattern is maintainer-recommended. |
| Pitfalls | MEDIUM-HIGH | Keelson/zenoh pitfalls verified from SDK source and official issue tracker. Simulation timing and OpenCV pitfalls from widely-cited community sources. |

**Overall confidence:** MEDIUM-HIGH

### Gaps to Address

- **keelson alpha API stability:** The keelson SDK is 0.5.0a9 and installed from GitHub dev branch. The envelope API (`enclose`/`uncover`) and key construction API are verified from source, but any keelson update during development could break them. Mitigation: pin to a specific commit SHA in `pyproject.toml`; add a CI check that runs the round-trip unit test.

- **Webcam device availability:** STACK.md documents a fallback for machines without a webcam (`cv2.VideoCapture("path/to/video.mp4")` or synthesized numpy frames), but the FEATURES.md MVP list assumes a real webcam. Clarify during requirements whether a webcam is guaranteed in the target environment, and implement the fallback if not.

- **zenoh network mode:** Default peer mode works on localhost with no router. If the zenoh bus spans multiple machines (e.g., drone hardware + developer laptop), a zenoh router is required and the session config must specify `ZENOH_ROUTER_CONNECT`. This is a deployment concern, not a development concern, but should be confirmed with stakeholders.

- **Keelson `image_compressed` subject:** FEATURES.md lists `image_compressed` as the camera zenoh subject. The subjects.yaml verification in ARCHITECTURE.md shows this subject but it should be explicitly validated with `keelson.is_subject_well_known("image_compressed")` in Phase 1 alongside other subjects, before Phase 4 wires up camera publishing.

---

## Sources

### Primary (HIGH confidence)
- keelson GitHub dev branch (SDK source, pyproject.toml, subjects.yaml, Envelope.proto, test_sdk.py) — https://github.com/RISE-Maritime/keelson/tree/dev
- keelson Protocol Specification — https://rise-maritime.github.io/keelson/protocol-specification/
- zenoh-python GitHub issue #95 (async support dropped, May 2024) — https://github.com/eclipse-zenoh/zenoh-python/issues/95
- zenoh-python publisher examples (z_pub.py) — https://github.com/eclipse-zenoh/zenoh-python
- FastAPI official docs (WebSockets, lifespan, async) — https://fastapi.tiangolo.com/
- zenoh.io Python 1.0 migration guide — https://zenoh.io/docs/migration_1.0/python/
- Fix Your Timestep (simulation timing canonical reference) — https://gafferongames.com/post/fix_your_timestep/

### Secondary (MEDIUM confidence)
- PyPI eclipse-zenoh 1.7.2 — https://pypi.org/project/eclipse-zenoh/
- PyPI fastapi 0.129.0 — https://pypi.org/project/fastapi/
- PyPI uvicorn 0.41.0 — https://pypi.org/project/uvicorn/
- PyPI opencv-python 4.13.0.92 — https://pypi.org/project/opencv-python/
- npm @geoman-io/leaflet-geoman-free 2.19.2 — https://www.npmjs.com/package/@geoman-io/leaflet-geoman-free
- zenoh GitHub issue #1560 (callback deadlock) — https://github.com/eclipse-zenoh/zenoh/issues/1560
- PyImageSearch: Faster video FPS with OpenCV threading — https://pyimagesearch.com/2017/02/06/faster-video-file-fps-with-cv2-videocapture-and-opencv/
- FastAPI WebSocket + Leaflet real-time GPS tracking — https://araz.me/2025/02/17/real-time-gps-tracking-on-a-web-map-using-fastapi-leaflet/
- BBC Cloud Fit asyncio + threading patterns — https://bbc.github.io/cloudfit-public-docs/asyncio/asyncio-part-5.html
- OpenCV MJPEG streaming with FastAPI — https://github.com/god233012yamil/Building-a-FastAPI-Web-Server-to-Stream-Video-from-Camera

### Tertiary (LOW confidence)
- Drone flight simulator guide (UAV Coach 2025) — general simulator feature expectations; used for anti-feature reasoning only
- WebSocket vs SSE performance comparison (metatech.dev 2025) — single source; not relied upon for any decisions

---
*Research completed: 2026-02-18*
*Ready for roadmap: yes*
