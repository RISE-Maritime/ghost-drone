# Architecture Research

**Domain:** Python drone simulator with web UI and zenoh/keelson telemetry publishing
**Researched:** 2026-02-18
**Confidence:** HIGH (keelson subjects verified from source; zenoh-python async constraints verified from GitHub issue #95; FastAPI/asyncio patterns verified from official docs)

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser (Web UI)                         │
│  ┌──────────────────────┐   ┌──────────────────────────────┐    │
│  │  Leaflet/MapLibre    │   │  Control Panel               │    │
│  │  (route drawing,     │   │  (play/pause/stop buttons,   │    │
│  │   drone position)    │   │   telemetry readouts,        │    │
│  │                      │   │   camera feed <img> tag)     │    │
│  └──────────┬───────────┘   └──────────────┬───────────────┘    │
│             │ WebSocket (JSON commands)     │                    │
│             │ WebSocket (JSON telemetry)    │                    │
└─────────────┼─────────────────────────────-┼────────────────────┘
              │                              │
┌─────────────┴──────────────────────────────┴────────────────────┐
│                       Python Process                             │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │              asyncio Event Loop (main thread)            │    │
│  │                                                          │    │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │    │
│  │  │ FastAPI      │  │ Simulation   │  │ Video        │  │    │
│  │  │ HTTP + WS    │  │ Coroutine    │  │ Broadcast    │  │    │
│  │  │ server       │  │ (asyncio     │  │ Coroutine    │  │    │
│  │  │ (Uvicorn)    │  │  task, 10Hz) │  │ (asyncio     │  │    │
│  │  └──────┬───────┘  └──────┬───────┘  │  task)       │  │    │
│  │         │                 │          └──────┬───────┘  │    │
│  │         │         asyncio.Queue             │          │    │
│  │         │         (telemetry events)         │          │    │
│  └─────────┼─────────────────┼─────────────────┼──────────┘    │
│            │                 │                 │                │
│  ┌─────────┼─────────────────┼─────────────────┼──────────┐    │
│  │  Daemon Thread (zenoh publisher)             │          │    │
│  │         │                 │                 │          │    │
│  │  ┌──────┴─────────────────┴─────────────────┴──────┐   │    │
│  │  │  zenoh Session (blocking, sync API)              │   │    │
│  │  │  Reads from thread-safe queue; calls pub.put()  │   │    │
│  │  └─────────────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Daemon Thread (OpenCV frame capture)                     │  │
│  │  cv2.VideoCapture(0) → JPEG encode → frame queue          │  │
│  └───────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
              │
              ▼ zenoh pub/sub
┌─────────────────────────────────────┐
│  Zenoh Network                      │
│  Keelson key expressions:           │
│  {realm}/@v0/{entity_id}/pubsub/... │
└─────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| FastAPI app | HTTP server for static UI files; WebSocket endpoints for commands in and telemetry out; MJPEG endpoint for camera | `fastapi` + `uvicorn`, `StaticFiles` mount |
| Simulation coroutine | Fixed-rate update loop (10 Hz); advances drone position along route; applies dynamics and noise; owns drone state | `asyncio.create_task()`, plain `async def` loop with `asyncio.sleep()` |
| State store | Single source of truth for drone state (lat/lon/heading/speed/attitude); mutated by simulation; read by WS broadcast and zenoh publisher | Plain Python dataclass or dict, accessed only from asyncio tasks (no lock needed within event loop) |
| WebSocket manager | Maintains set of connected browser clients; broadcasts telemetry JSON each simulation tick | `ConnectionManager` class with `asyncio.Queue` per client |
| Command handler | WebSocket endpoint that receives route waypoints, play/pause/stop commands and delivers them to simulation state | FastAPI `@app.websocket("/ws/control")` |
| OpenCV capture thread | Runs `cv2.VideoCapture` in a daemon thread (blocking); JPEG-encodes each frame; places bytes into a thread-safe queue | `threading.Thread`, `queue.Queue` (stdlib, not asyncio) |
| Video broadcast coroutine | Reads frames from the frame queue; serves MJPEG via `StreamingResponse`; copies bytes into zenoh publish queue | `asyncio.to_thread` or direct queue polling with `asyncio.sleep(0)` |
| Zenoh publisher thread | Daemon thread with zenoh session; reads from a `queue.Queue`; calls `publisher.put(payload)` for each message type | `threading.Thread`, stdlib `queue.Queue`, zenoh sync API |
| keelson envelope helper | Wraps protobuf-serialized payload in `Envelope` with `enclosed_at` timestamp; returns bytes ready for `pub.put()` | `keelson.enclose()` (library function) |

## Recommended Project Structure

```
ghost-drone/
├── ghost_drone/
│   ├── __init__.py
│   ├── main.py               # FastAPI app, lifespan, uvicorn entrypoint
│   ├── simulation/
│   │   ├── __init__.py
│   │   ├── engine.py         # SimulationEngine: update loop, state transitions
│   │   ├── dynamics.py       # Physics: heading interpolation, speed damping
│   │   ├── noise.py          # Sensor noise generators (Gaussian, random walk)
│   │   └── route.py          # Route parsing, waypoint sequencing, cross-track error
│   ├── web/
│   │   ├── __init__.py
│   │   ├── router.py         # FastAPI routes: /ws/control, /ws/telemetry, /video
│   │   └── connection_manager.py  # WebSocket broadcast manager
│   ├── zenoh_bridge/
│   │   ├── __init__.py
│   │   └── publisher.py      # ZenohPublisher thread, queue consumer, keelson wrapping
│   ├── camera/
│   │   ├── __init__.py
│   │   └── capture.py        # OpenCV capture thread, frame queue
│   └── models.py             # DroneState, RouteWaypoint dataclasses
├── static/
│   ├── index.html            # Map UI entry point
│   ├── app.js                # Leaflet/MapLibre, WebSocket client, control panel
│   └── style.css
├── pyproject.toml
└── README.md
```

### Structure Rationale

- **simulation/:** Self-contained physics engine with no I/O dependencies, testable in isolation.
- **web/:** All FastAPI concerns isolated; knows about DroneState but does not mutate it directly.
- **zenoh_bridge/:** All blocking zenoh calls live here; never touches the asyncio event loop directly.
- **camera/:** Blocking OpenCV I/O isolated from async code; communicates only through a `queue.Queue`.
- **static/:** Served as static files; no build step required (plain JS, no bundler).

## Architectural Patterns

### Pattern 1: Asyncio Tasks for Concurrent Coroutines

**What:** Run simulation loop, WebSocket broadcast, and video relay as concurrent `asyncio.Task` objects within the single event loop. Each yields control via `await asyncio.sleep(...)`.

**When to use:** Any pure-Python logic that is I/O-bound or can cooperatively yield. The simulation math is fast (microseconds), so it safely runs inside the event loop without blocking.

**Trade-offs:** Simple, no locking needed for shared state within the event loop. Breaks down if simulation math becomes CPU-heavy (>1ms per tick with many clients).

**Example:**
```python
# main.py lifespan
from contextlib import asynccontextmanager
from fastapi import FastAPI
import asyncio
from ghost_drone.simulation.engine import SimulationEngine
from ghost_drone.web.connection_manager import ConnectionManager

manager = ConnectionManager()
engine = SimulationEngine(manager)

@asynccontextmanager
async def lifespan(app: FastAPI):
    sim_task = asyncio.create_task(engine.run())
    yield
    sim_task.cancel()
    await asyncio.gather(sim_task, return_exceptions=True)

app = FastAPI(lifespan=lifespan)
```

### Pattern 2: Daemon Thread + stdlib Queue for Zenoh Publishing

**What:** zenoh-python's API is synchronous-only (async support was dropped in v0.6, per GitHub issue #95). Run zenoh in a daemon thread. The asyncio tasks post messages to a `queue.Queue`; the zenoh thread consumes and calls `pub.put()`.

**When to use:** Any blocking third-party library that cannot be made async. This is the official recommendation from zenoh maintainers.

**Trade-offs:** Thread boundary introduces a copy cost and slight latency (acceptable for 10Hz telemetry). Queue depth acts as a natural back-pressure buffer. Thread is a daemon so it exits cleanly with the main process.

**Example:**
```python
# zenoh_bridge/publisher.py
import queue
import threading
import zenoh
import keelson

class ZenohPublisher:
    def __init__(self, realm: str, entity_id: str):
        self._queue: queue.Queue = queue.Queue(maxsize=100)
        self._thread = threading.Thread(target=self._run, args=(realm, entity_id), daemon=True)

    def start(self):
        self._thread.start()

    def publish(self, subject: str, payload_bytes: bytes):
        """Called from asyncio tasks — thread-safe, non-blocking."""
        try:
            self._queue.put_nowait((subject, payload_bytes))
        except queue.Full:
            pass  # drop on back-pressure; telemetry is lossy by design

    def _run(self, realm: str, entity_id: str):
        conf = keelson.create_zenoh_config()
        with zenoh.open(conf) as session:
            publishers = {}
            while True:
                subject, payload_bytes = self._queue.get()
                if subject not in publishers:
                    key = keelson.construct_pubsub_key(realm, entity_id, subject, "sim/0")
                    publishers[subject] = session.declare_publisher(key)
                envelope = keelson.enclose(payload_bytes)
                publishers[subject].put(envelope)
```

### Pattern 3: Daemon Thread for OpenCV Frame Capture

**What:** `cv2.VideoCapture.read()` blocks until a frame arrives. Run it in a dedicated daemon thread. Store the latest JPEG-encoded frame in a `queue.Queue(maxsize=1)` (replace semantics: get + put). The asyncio video coroutine reads from this queue.

**When to use:** Any blocking hardware I/O (camera, serial port).

**Trade-offs:** Decouples capture rate from serve rate. Browser MJPEG and zenoh image publishing both read from the same frame queue.

**Example:**
```python
# camera/capture.py
import threading
import queue
import cv2

class CameraCapture:
    def __init__(self, device_index: int = 0):
        self._frame_queue: queue.Queue = queue.Queue(maxsize=1)
        self._thread = threading.Thread(target=self._run, args=(device_index,), daemon=True)

    def start(self):
        self._thread.start()

    def latest_frame(self) -> bytes | None:
        """Called from asyncio — non-blocking."""
        try:
            return self._frame_queue.get_nowait()
        except queue.Empty:
            return None

    def _run(self, device_index: int):
        cap = cv2.VideoCapture(device_index)
        while True:
            ret, frame = cap.read()
            if not ret:
                continue
            _, jpeg = cv2.imencode(".jpg", frame, [cv2.IMWRITE_JPEG_QUALITY, 80])
            try:
                self._frame_queue.get_nowait()  # discard stale frame
            except queue.Empty:
                pass
            self._frame_queue.put(jpeg.tobytes())
```

### Pattern 4: Simulation Engine as Async Coroutine with Fixed-Rate Loop

**What:** The simulation loop runs as an `asyncio.Task`. Each tick: (1) compute delta-time, (2) update drone dynamics, (3) apply sensor noise, (4) push state to WebSocket broadcast queue, (5) push to zenoh publish queue, (6) sleep until next tick.

**When to use:** Simulation is numerically simple (basic heading/position integration). 10 Hz update rate gives 100ms per tick — far more than needed for the math.

**Trade-offs:** If simulation logic grows (pathfinding, physics engine), move it to `asyncio.to_thread()` or `ProcessPoolExecutor`. Start simple.

**Example:**
```python
# simulation/engine.py
import asyncio
import time
from ghost_drone.models import DroneState

TICK_RATE_HZ = 10

class SimulationEngine:
    def __init__(self, connection_manager, zenoh_publisher):
        self.state = DroneState()
        self._cm = connection_manager
        self._zenoh = zenoh_publisher
        self._running = False

    async def run(self):
        self._running = True
        interval = 1.0 / TICK_RATE_HZ
        last_tick = time.monotonic()
        while self._running:
            now = time.monotonic()
            dt = now - last_tick
            last_tick = now
            self._update(dt)
            await self._cm.broadcast(self.state.to_json())
            self._zenoh.publish("location_fix", self.state.to_location_fix_bytes())
            await asyncio.sleep(max(0, interval - (time.monotonic() - now)))

    def _update(self, dt: float):
        # pure math: no I/O, no awaits, runs in microseconds
        pass
```

## Data Flow

### Simulation Tick Flow

```
asyncio Task: SimulationEngine.run()  [10 Hz]
    │
    ├─► _update(dt) — pure math, updates DroneState in place
    │       DroneState fields: lat, lon, heading_deg, speed_kn,
    │       roll_deg, pitch_deg, altitude_m
    │
    ├─► ConnectionManager.broadcast(telemetry_json)
    │       → asyncio.Queue per WebSocket client
    │           → WebSocket send to browser
    │
    └─► ZenohPublisher.publish(subject, bytes)
            → queue.Queue (thread-safe)
                → Zenoh daemon thread → pub.put(keelson_envelope)
                    → zenoh network
```

### Command Flow (Browser → Simulation)

```
Browser JS: sendMessage(JSON)
    → WebSocket /ws/control
        → FastAPI endpoint receives text
            → parse JSON command
                → if "set_route": engine.set_route(waypoints)
                → if "play":  engine.play()
                → if "pause": engine.pause()
                → if "stop":  engine.stop()
```

### Camera Feed Flow

```
OpenCV daemon thread
    → cv2.VideoCapture.read()  [blocking]
        → JPEG encode
            → queue.Queue(maxsize=1) [latest frame only]
                ├─► HTTP GET /video/mjpeg  (MJPEG StreamingResponse)
                │       → multipart/x-mixed-replace to browser <img>
                └─► Video broadcast coroutine
                        → ZenohPublisher.publish("image_compressed", bytes)
                            → zenoh network
```

### Keelson Subject Mapping

| Drone Telemetry | Keelson Subject | Protobuf Type | Notes |
|-----------------|-----------------|---------------|-------|
| GPS position | `location_fix` | `foxglove.LocationFix` | lat/lon/alt |
| Horizontal accuracy | `location_fix_accuracy_horizontal_m` | `keelson.TimestampedFloat` | simulated noise sigma |
| Speed over ground | `speed_over_ground_knots` | `keelson.TimestampedFloat` | |
| Heading | `heading_true_north_deg` | `keelson.TimestampedFloat` | degrees from true north |
| Course over ground | `course_over_ground_deg` | `keelson.TimestampedFloat` | |
| Roll | `roll_deg` | `keelson.TimestampedFloat` | simulated heel |
| Pitch | `pitch_deg` | `keelson.TimestampedFloat` | simulated trim |
| Full orientation | `orientation_quaternion` | `keelson.TimestampedQuaternion` | derived from roll/pitch/heading |
| Camera frame | `image_compressed` | `foxglove.CompressedImage` | JPEG bytes, 10–30 Hz |

**Full zenoh key expression pattern:**
```
{realm}/@v0/{entity_id}/pubsub/{subject}/{source_id}
# Example:
rise/@v0/ghost_drone/pubsub/location_fix/gnss/0
rise/@v0/ghost_drone/pubsub/heading_true_north_deg/compass/0
rise/@v0/ghost_drone/pubsub/image_compressed/camera/0
```

## Concurrency Model

**Decision: asyncio event loop + 2 daemon threads**

| Concern | Approach | Rationale |
|---------|----------|-----------|
| Simulation loop | `asyncio.Task` | Pure math, cooperative, <1ms/tick, no I/O |
| HTTP + WebSocket serving | `asyncio.Task` (uvicorn) | Native async, shares event loop |
| WebSocket broadcast | `asyncio.Task` | I/O-bound, cooperative |
| zenoh publishing | Daemon thread + `queue.Queue` | zenoh-python is sync-only; cannot run in event loop |
| Camera frame capture | Daemon thread + `queue.Queue` | `cv2.VideoCapture.read()` is blocking |
| State mutation | No locks needed for asyncio tasks | Only one coroutine runs at a time in asyncio; threads only write to queues |

**Why not threads-only?**
- FastAPI/uvicorn is built on asyncio. Mixing threads for the main server adds complexity without benefit.

**Why not processes?**
- Simulation math is lightweight (not CPU-bound). Shared state across processes requires IPC overhead. Overkill.

**Why not zenoh async?**
- zenoh-python dropped async support in v0.6 (GitHub issue #95, confirmed May 2024). No timeline for reintroduction. Daemon thread pattern is the maintainer-recommended workaround.

## Simulation Engine Design

### State Machine

```
IDLE → PLAYING → PAUSED → PLAYING
  └──────────────────────────► IDLE  (stop command or route complete)
```

| State | Behavior |
|-------|----------|
| IDLE | No movement; simulation loop still runs at 10Hz but state unchanged |
| PLAYING | Advance drone along route each tick; publish telemetry |
| PAUSED | Drone frozen; telemetry still published (frozen values) |

### Route Following Algorithm

1. Maintain ordered list of `(lat, lon)` waypoints.
2. Each tick: compute bearing to next waypoint using Haversine/great-circle math.
3. Apply heading interpolation: `heading += clamp(bearing_error, -max_turn_rate * dt, +max_turn_rate * dt)` — produces smooth turning without overshooting.
4. Advance position along current heading at current speed.
5. If distance to next waypoint < arrival_threshold: advance to next waypoint.
6. When last waypoint reached: transition to IDLE.

### Dynamics Model

Keep it simple: first-order lag on heading and speed.

```
heading += (target_heading - heading) * (1 - exp(-dt / heading_tau))
speed   += (target_speed - speed)     * (1 - exp(-dt / speed_tau))
```

- `heading_tau = 3.0s` — realistic turn response for a surface drone
- `speed_tau = 5.0s` — speed ramp-up/ramp-down
- Add Gaussian noise to published values (not to internal state) to simulate sensor inaccuracy.

## Anti-Patterns

### Anti-Pattern 1: Running zenoh inside asyncio event loop

**What people do:** Call `zenoh.open()` and `pub.put()` directly from an `async def` coroutine or FastAPI endpoint.
**Why it's wrong:** zenoh-python is synchronous. Blocking calls in the event loop freeze all WebSocket clients until the call returns. Under load or on slow networks, this causes visible stutter.
**Do this instead:** Daemon thread + `queue.Queue` as described in Pattern 2. The asyncio task does a non-blocking `queue.put_nowait()`.

### Anti-Pattern 2: Sharing asyncio.Queue with threads

**What people do:** Use `asyncio.Queue` as the bridge between the zenoh thread and the simulation coroutine.
**Why it's wrong:** `asyncio.Queue` is not thread-safe. Putting from a thread while the event loop reads causes race conditions and silent data corruption.
**Do this instead:** Use `queue.Queue` (stdlib) for thread↔asyncio boundaries. Inside asyncio, use `asyncio.Queue` for coroutine↔coroutine.

### Anti-Pattern 3: Blocking simulation loop with time.sleep()

**What people do:** `while True: update(); time.sleep(0.1)` in an async function.
**Why it's wrong:** `time.sleep()` blocks the entire event loop thread. WebSocket sends, HTTP requests, and all other coroutines freeze for 100ms per tick.
**Do this instead:** `await asyncio.sleep(0.1)` — yields control back to the event loop between ticks.

### Anti-Pattern 4: Serving camera frames via WebSocket as base64

**What people do:** Encode each frame as base64 JSON and send over WebSocket.
**Why it's wrong:** Base64 inflates frame size by 33%. WebSocket framing adds overhead. Browser needs JS to decode and set `src`. MJPEG via HTTP is simpler, natively supported by `<img src="/video/mjpeg">`, and uses multipart streaming the browser already understands.
**Do this instead:** MJPEG `StreamingResponse` on a dedicated HTTP endpoint. Browser renders it with a plain `<img>` tag. No JS decoding needed.

### Anti-Pattern 5: Mutating DroneState from the zenoh thread

**What people do:** Have the zenoh thread read DroneState directly (no queue) to avoid copying.
**Why it's wrong:** DroneState is owned by the asyncio event loop (mutated by the simulation coroutine). Threaded reads without a lock produce torn reads (partial state visible).
**Do this instead:** The simulation coroutine serializes state to bytes before putting it on the zenoh queue. The zenoh thread only handles bytes — it never touches Python objects owned by the event loop.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| zenoh router/peer | zenoh-python sync session in daemon thread | Configure mode (peer/client) via CLI arg; default peer mode works with no router |
| Browser clients | FastAPI WebSocket + MJPEG HTTP | Both served from same uvicorn process; no CORS issues |
| keelson | Python library (`keelson.enclose()`, `keelson.construct_pubsub_key()`) | Handles Envelope wrapping and key construction; install from PyPI or local path |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| SimulationEngine ↔ ZenohPublisher | `queue.Queue` (stdlib) | Thread-safe; asyncio task puts, daemon thread gets |
| SimulationEngine ↔ ConnectionManager | `asyncio.Queue` per client | Both in event loop; no thread safety needed |
| CameraCapture ↔ Video coroutine | `queue.Queue(maxsize=1)` | Latest-frame semantics; old frame discarded on each new capture |
| CameraCapture ↔ ZenohPublisher | `queue.Queue` (stdlib) | Camera thread puts JPEG bytes; zenoh thread consumes independently |
| FastAPI routes ↔ SimulationEngine | Direct method call | Both in event loop; no queue needed for commands |

## Suggested Build Order

Build in this order — each phase has all dependencies satisfied before starting the next:

1. **DroneState model + simulation engine (pure math, no I/O)**
   - `models.py`: `DroneState`, `RouteWaypoint` dataclasses
   - `simulation/dynamics.py`: heading/speed integration, noise
   - `simulation/route.py`: waypoint sequencing, bearing calc
   - `simulation/engine.py`: update loop (unit-testable with no network)

2. **FastAPI skeleton + static UI served**
   - `main.py`: FastAPI app with lifespan, static file mount
   - `static/index.html + app.js`: minimal map (no websocket yet)
   - Verify map loads at `http://localhost:8000`

3. **WebSocket layer (control commands + telemetry broadcast)**
   - `web/connection_manager.py`: broadcast to all connected clients
   - `web/router.py`: `/ws/control` and `/ws/telemetry` endpoints
   - Wire `SimulationEngine` into lifespan; broadcast state each tick
   - Verify browser receives telemetry JSON and drone moves on map

4. **Zenoh publisher thread**
   - `zenoh_bridge/publisher.py`: daemon thread, queue consumer
   - Wire into lifespan; simulation coroutine puts to zenoh queue
   - Verify zenoh subscribers receive keelson-wrapped messages

5. **Camera capture + MJPEG stream**
   - `camera/capture.py`: OpenCV daemon thread, frame queue
   - `/video/mjpeg` MJPEG `StreamingResponse` endpoint
   - Verify browser `<img>` tag shows live camera feed

6. **Camera → zenoh publishing**
   - Video broadcast coroutine reads frame queue, puts to zenoh queue as `image_compressed`
   - Verify zenoh subscribers receive camera frames

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 1 browser client (primary use) | Current architecture is sufficient; no changes needed |
| 5-10 clients | ConnectionManager handles fan-out naturally via per-client queues; no changes needed |
| Many zenoh subscribers | zenoh handles fan-out at the network layer; Python side is unaffected |
| CPU-heavy simulation | Move `_update()` to `asyncio.to_thread()` or `ProcessPoolExecutor`; no architectural change needed |

### Scaling Priorities

1. **First bottleneck:** Camera JPEG encoding speed. Mitigation: reduce resolution or quality, or encode in the capture thread (already the recommended approach).
2. **Second bottleneck:** Many WebSocket clients receiving full telemetry JSON. Mitigation: reduce broadcast frequency for non-primary clients (not relevant for this use case).

## Sources

- keelson subjects.yaml (verified from source): https://github.com/RISE-Maritime/keelson/blob/dev/messages/subjects.yaml
- keelson Envelope.proto (verified from source): https://github.com/RISE-Maritime/keelson/blob/dev/messages/Envelope.proto
- keelson mockup-radar2keelson.py (pattern reference): https://github.com/RISE-Maritime/keelson/blob/dev/connectors/mockups/bin/mockup-radar2keelson.py
- keelson protocol specification: https://RISE-Maritime.github.io/keelson/protocol-specification/
- zenoh-python async support dropped (GitHub issue #95, confirmed May 2024): https://github.com/eclipse-zenoh/zenoh-python/issues/95
- zenoh-python publisher API (z_pub.py): https://github.com/eclipse-zenoh/zenoh-python/blob/main/examples/z_pub.py
- FastAPI WebSockets official docs: https://fastapi.tiangolo.com/advanced/websockets/
- FastAPI background tasks discussion (blocking the event loop): https://github.com/fastapi/fastapi/discussions/11210
- asyncio + threading patterns (BBC Cloud Fit): https://bbc.github.io/cloudfit-public-docs/asyncio/asyncio-part-5.html
- MJPEG streaming with FastAPI + OpenCV: https://github.com/god233012yamil/Building-a-FastAPI-Web-Server-to-Stream-Video-from-Camera

---
*Architecture research for: ghost-drone (Python surface drone simulator)*
*Researched: 2026-02-18*
