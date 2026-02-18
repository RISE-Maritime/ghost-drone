# Pitfalls Research

**Domain:** Simulated surface drone — Python backend + zenoh/keelson publisher + real-time web UI
**Researched:** 2026-02-18
**Confidence:** MEDIUM (keelson SDK verified from source; zenoh from official docs; motion model and streaming from community sources)

---

## Critical Pitfalls

### Pitfall 1: Calling Zenoh API Inside a Callback

**What goes wrong:**
Zenoh callbacks (subscriber handlers, matching_listener, etc.) are invoked on internal zenoh threads. Any call to the zenoh API — including `publisher.put()` — from inside a callback causes a deadlock or crash. The official docs state this is explicitly disallowed.

**Why it happens:**
The pattern "I received data, so I'll publish a response" seems natural. Developers wire up a subscriber and call `publisher.put()` from the handler, which re-enters zenoh's lock-held codepath and deadlocks.

**How to avoid:**
Never call any zenoh API function from within a callback. Use a `queue.Queue` to pass data out of the callback to the main thread or a dedicated publisher thread. Process the queue in a loop that does the actual publishing.

```python
# WRONG
def on_data(sample):
    publisher.put(process(sample))  # deadlock

# RIGHT
import queue
q = queue.Queue()

def on_data(sample):
    q.put(sample)  # non-blocking, safe

# Main loop pulls from queue and publishes
while True:
    item = q.get()
    publisher.put(process(item))
```

**Warning signs:**
- Script hangs indefinitely with no error on first subscriber message.
- `matching_listener` callback causes freeze when publisher is present.

**Phase to address:** Phase 1 — zenoh/keelson publisher scaffolding. Establish the pattern before any subscriber code is written.

---

### Pitfall 2: zenoh Session Not Closed — Script Hangs on Exit

**What goes wrong:**
If the zenoh session is not explicitly closed (or managed via `with` statement), the script hangs on exit. Object finalizers may run after zenoh's internal library thread has been killed, leaving cleanup in an inconsistent state.

**Why it happens:**
Developers create a session with `session = zenoh.open(config)` and rely on garbage collection at exit. Python's GC order is not guaranteed; the session finalizer races against zenoh's background thread shutdown.

**How to avoid:**
Always use the context manager form:
```python
with zenoh.open(config) as session:
    pub = session.declare_publisher("key/expr")
    # ... rest of app
# session.close() called automatically
```
If a context manager is impractical (e.g., long-lived process), call `session.close()` explicitly in a `finally` block or `atexit` handler.

**Warning signs:**
- Script hangs for several seconds after `Ctrl+C` before dying.
- Process must be force-killed (`kill -9`) after tests.

**Phase to address:** Phase 1 — establish session lifecycle pattern at project foundation.

---

### Pitfall 3: Multiple zenoh Sessions — Network Amplification

**What goes wrong:**
Creating one session per publisher (e.g., one for position, one for heading, one for camera) inflates the zenoh network size significantly. Each session negotiates its own routing graph, making the local zenoh network unstable and preventing locality optimizations.

**Why it happens:**
Developers new to zenoh treat sessions like HTTP connections — create one per "service." The API allows it, so the mistake compiles and runs fine until scale or complexity reveals the issue.

**How to avoid:**
Create exactly one `zenoh.Session` for the entire process. Declare multiple publishers and subscribers on that single session:
```python
with zenoh.open(config) as session:
    pub_position = session.declare_publisher("ghost-drone/@v0/drone01/pubsub/position/sim")
    pub_heading  = session.declare_publisher("ghost-drone/@v0/drone01/pubsub/heading_true_north_deg/sim")
    pub_camera   = session.declare_publisher("ghost-drone/@v0/drone01/pubsub/raw_image/webcam")
```

**Warning signs:**
- Multiple `zenoh.open()` calls anywhere in the codebase.
- Zenoh router logs showing unexpected peer count growth.

**Phase to address:** Phase 1 — enforce single-session pattern in architectural scaffolding.

---

### Pitfall 4: Keelson Subject Names That Don't Match the Registry

**What goes wrong:**
The keelson SDK logs a warning (not an error) when `construct_pubsub_key()` is called with an unregistered subject. The publisher still works, but consumers expecting well-known subjects won't find the data, and the payload type is undefined — breaking interoperability with any other keelson tool.

**Why it happens:**
Subjects must exactly match snake_case versions of protobuf message names or the `<entity>_<property>_<unit>` pattern. Developers guess names like `"position"`, `"gps_position"`, or `"location"` instead of the exact registered name (e.g., `"raw_bytes"`, `"lever_position_pct"`). The warning is easy to miss in a busy log.

**How to avoid:**
Before writing any publisher code, enumerate the exact subject names from the keelson well-known subjects YAML. Verify with:
```python
import keelson
print(keelson.is_subject_well_known("your_subject_name"))  # must return True
```
Use `keelson.get_subject_schema("your_subject_name")` to confirm the expected protobuf type before constructing payloads.

**Warning signs:**
- Keelson SDK logs `WARNING: subject 'X' is not well-known` during startup.
- Consumers using zenoh wildcard subscriptions receive data but fail to decode it.

**Phase to address:** Phase 1 — subject name audit before any publisher is wired up.

---

### Pitfall 5: Incorrect Keelson Envelope Structure — Payload Not Wrapped

**What goes wrong:**
The keelson protocol requires every zenoh `put()` to carry a serialized `Envelope` protobuf, not a raw protobuf payload. Publishing a raw `TimestampedFloat.SerializeToString()` instead of `keelson.enclose(payload.SerializeToString())` produces bytes that look valid to zenoh but are decoded incorrectly by any keelson consumer.

**Why it happens:**
The two-layer wrapping (inner: domain protobuf → outer: Envelope) is not obvious from the zenoh documentation, only from keelson SDK source. Developers familiar with zenoh but new to keelson skip the envelope layer.

**How to avoid:**
Always follow the two-step pattern:
```python
# Step 1: build and serialize the domain message
data = TimestampedFloat()
data.timestamp.FromNanoseconds(time.time_ns())
data.value = 3.14
payload_bytes = data.SerializeToString()

# Step 2: wrap in keelson Envelope
envelope_bytes = keelson.enclose(payload_bytes)

# Step 3: publish the envelope
publisher.put(envelope_bytes)
```

**Warning signs:**
- Consumers receive data but `keelson.uncover()` raises a protobuf decode error.
- zenoh-cli with keelson codec shows garbled or empty payloads.

**Phase to address:** Phase 1 — write a single validated publish helper used everywhere.

---

### Pitfall 6: Protobuf Timestamp Populated Incorrectly

**What goes wrong:**
Keelson `TimestampedX` messages have a `timestamp` field of type `google.protobuf.Timestamp`. Setting `data.timestamp = time.time()` (a float) silently fails in Python protobuf — the field accepts only a `Timestamp` object. The result is a zero timestamp, breaking all time-series consumers.

**Why it happens:**
Python protobuf doesn't raise a type error when assigning a scalar to a message field in some versions; it either silently no-ops or raises a confusing error. `time.time_ns()` and the `FromNanoseconds()` method are the correct path but are not prominently documented.

**How to avoid:**
Always use the protobuf helper method:
```python
import time
data.timestamp.FromNanoseconds(time.time_ns())
```
Never assign `data.timestamp = time.time()` or similar.

**Warning signs:**
- Timestamp field shows epoch (1970-01-01) or zero in decoded messages.
- Time-series visualizations show all data at t=0.

**Phase to address:** Phase 1 — part of the validated publish helper.

---

### Pitfall 7: Simulation Loop Blocking the FastAPI/asyncio Event Loop

**What goes wrong:**
Running a `while True: time.sleep(dt)` simulation loop inside an `async` FastAPI startup handler blocks the entire event loop. All HTTP requests, WebSocket messages, and background tasks stall. The app appears to start but never responds to any client.

**Why it happens:**
`time.sleep()` in an async context is a blocking call — it holds the GIL and prevents the event loop from processing any other coroutine. `async def` does not make blocking calls cooperative.

**How to avoid:**
Run the simulation loop in one of two ways:

**Option A — asyncio task with `asyncio.sleep`:**
```python
async def simulation_loop():
    while True:
        step_simulation(dt=0.1)
        await asyncio.sleep(0.1)  # yields control

@app.on_event("startup")
async def startup():
    asyncio.create_task(simulation_loop())
```

**Option B — dedicated thread (preferred for CPU-bound steps):**
```python
import threading

def simulation_thread():
    while True:
        step_simulation(dt=0.1)
        time.sleep(0.1)

@app.on_event("startup")
async def startup():
    t = threading.Thread(target=simulation_thread, daemon=True)
    t.start()
```
Option B is preferred when the simulation step is CPU-bound (math, numpy), as it releases the GIL during numpy operations and doesn't block asyncio at all.

**Warning signs:**
- FastAPI starts, logs "Uvicorn running", but `GET /` never responds.
- WebSocket clients connect but receive no messages.

**Phase to address:** Phase 2 — simulation loop architecture must be established before adding any real-time features.

---

### Pitfall 8: OpenCV VideoCapture Frame Buffer Lag — Stale Frames to Browser and zenoh

**What goes wrong:**
`cv2.VideoCapture.read()` pulls the oldest frame from an internal buffer (typically 5 frames deep). When processing is slower than capture rate, frames accumulate in the buffer. The webcam stream to both the browser and zenoh carries frames that are several hundred milliseconds old, making the "live" feed misleading in a simulation context.

**Why it happens:**
OpenCV's VideoCapture buffers frames internally. If the consuming loop is slower than the camera's FPS, the buffer fills and the consumer always gets stale data. Most tutorials ignore this because display FPS matches capture FPS in simple demos.

**How to avoid:**
Use a dedicated capture thread that continuously reads and discards frames, keeping only the most recent:
```python
import threading, cv2

class LatestFrameCapture:
    def __init__(self, src=0):
        self.cap = cv2.VideoCapture(src)
        self.frame = None
        self.lock = threading.Lock()
        self._thread = threading.Thread(target=self._run, daemon=True)
        self._thread.start()

    def _run(self):
        while True:
            ret, frame = self.cap.read()
            if ret:
                with self.lock:
                    self.frame = frame.copy()  # must copy, not reference

    def get(self):
        with self.lock:
            return self.frame.copy() if self.frame is not None else None
```
Note: `.copy()` is mandatory — OpenCV's default copy is shallow; without it, the retrieved frame's data changes under you.

**Warning signs:**
- Camera stream in browser is noticeably behind real world.
- Frame timestamps in zenoh are consistently 300-500ms behind wall clock.

**Phase to address:** Phase 3 — webcam integration. Establish LatestFrameCapture pattern before wiring to browser or zenoh.

---

### Pitfall 9: Dual-Output Camera Frame Copies — Bandwidth × 2

**What goes wrong:**
Serving camera frames simultaneously to the browser (MJPEG/WebSocket) and to zenoh requires encoding the JPEG twice per frame — once for each output. At 30fps with a 1080p source, this doubles CPU encode time and can saturate a single core, causing frame drops on both outputs.

**Why it happens:**
The naive implementation encodes frames independently in each output path. The browser path calls `cv2.imencode('.jpg', frame)` and the zenoh path calls it again with no shared result.

**How to avoid:**
Encode once, distribute the bytes:
```python
ret, jpeg = cv2.imencode('.jpg', frame, [cv2.IMWRITE_JPEG_QUALITY, 70])
jpeg_bytes = jpeg.tobytes()

# Send to browser
yield b'--frame\r\nContent-Type: image/jpeg\r\n\r\n' + jpeg_bytes + b'\r\n'

# Publish to zenoh (same bytes)
payload = TimestampedBytes()
payload.timestamp.FromNanoseconds(time.time_ns())
payload.value = jpeg_bytes
publisher.put(keelson.enclose(payload.SerializeToString()))
```
Reduce JPEG quality (60-75) for zenoh to keep payload sizes under 50KB per frame.

**Warning signs:**
- CPU stays pegged at 100% on a single core during camera streaming.
- zenoh publish latency grows when browser has an active video consumer.

**Phase to address:** Phase 3 — camera integration design.

---

### Pitfall 10: Simulation Loop Timing Drift — Variable `time.sleep` Accumulation

**What goes wrong:**
A simulation loop using `time.sleep(dt)` as its timing mechanism accumulates drift. `time.sleep()` sleeps for *at least* `dt` but often longer (OS scheduler jitter, Python GIL contention). After 60 seconds, a 10Hz loop may have executed only 580-590 steps instead of 600, causing the simulated drone to fall behind wall-clock time.

**Why it happens:**
`time.sleep(dt)` doesn't account for the time spent computing the simulation step itself. Each iteration sleeps for `dt` plus compute time. Over thousands of iterations, this drift compounds.

**How to avoid:**
Use the accumulator pattern — track actual elapsed time against target:
```python
import time

TARGET_HZ = 10
dt = 1.0 / TARGET_HZ
next_tick = time.monotonic()

while True:
    step_simulation(dt)
    next_tick += dt
    sleep_time = next_tick - time.monotonic()
    if sleep_time > 0:
        time.sleep(sleep_time)
    # if sleep_time < 0, we're behind — skip sleep, catch up next frame
```

**Warning signs:**
- Simulated drone position diverges from expected position over time.
- A 5-minute mission takes 5:30 in wall-clock time.

**Phase to address:** Phase 2 — establish timing pattern in simulation loop foundation.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Hardcoding zenoh key expression strings | Faster to write | Subject name typos undetected; refactoring breaks all subscribers | Never — always use `keelson.construct_pubsub_key()` |
| Using `time.sleep(dt)` for simulation timing | Simple | Drift accumulates; drone falls behind wall-clock | Only in throwaway prototypes, not in any committed code |
| Encoding JPEG twice per frame | No shared state | CPU bottleneck at >15fps | Never — encode once and distribute bytes |
| Global `VideoCapture` without dedicated thread | Simple code | Stale frame buffering causes lag | Only if camera FPS ≤ processing FPS and no real-time requirement |
| `asyncio.sleep(0)` in tight CPU loop | Cooperative | Doesn't actually yield enough; still starves event loop | Never for CPU-bound simulation steps — use a thread |
| Multiple zenoh sessions | Isolation between publishers | Network amplification, prevents locality optimization | Never — one session per process |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| keelson `enclose()` | Publish raw protobuf bytes directly | Always wrap with `keelson.enclose(payload.SerializeToString())` |
| keelson subject names | Invent descriptive names like `"gps_position"` | Check well-known registry with `keelson.is_subject_well_known()` first |
| zenoh `construct_pubsub_key()` | Skip `@v0` version segment in manually built strings | Always use the SDK function; never hand-build key expressions |
| protobuf Timestamp | Assign `data.timestamp = time.time()` | Use `data.timestamp.FromNanoseconds(time.time_ns())` |
| FastAPI WebSocket broadcast | Loop over clients and `send_text()` without error handling | Wrap in `try/except WebSocketDisconnect` and remove dead connections |
| OpenCV `frame.copy()` | Passing frame reference into queue | Always `.copy()` before queuing; default OpenCV copy is shallow |

---

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| MJPEG to browser at full resolution | Browser tab pegs CPU; stream lags by seconds | Resize to 640x480 before encoding; quality=70 | >720p at >15fps over localhost |
| zenoh payload > 1MB | Publish latency spikes; router memory grows | Downsample or reduce JPEG quality before publishing | Single 1080p uncompressed frame (~6MB) |
| Sending position updates at simulation rate (10Hz) to all WebSocket clients | All clients lag when one slow client exists | Use `asyncio.wait_for()` with timeout per client; SSE is simpler | More than ~5 concurrent browser clients |
| NumPy in asyncio event loop thread | Event loop blocked for milliseconds per step | Run simulation in thread; use `loop.run_in_executor()` for numpy-heavy steps | Simulation steps > 1ms with any concurrent requests |
| Leaflet `setLatLng()` called per zenoh message | Excessive DOM redraws; marker jitter | Throttle updates to 5-10Hz regardless of source rate | >30 position updates/second |

---

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| No feedback when route drawing is complete | User draws route, nothing visible happens — assumes it failed | Show route line on map as user draws; confirm with "Route accepted" state |
| Drone jumps between position updates instead of interpolating | Drone marker teleports on map; looks broken | Interpolate marker position between WebSocket updates using CSS transitions or Leaflet's `setLatLng` with animation |
| No indicator that zenoh is publishing | Developer can't verify data is flowing without external tool | Add a `/health` endpoint or dashboard showing last publish timestamp per topic |
| Camera feed blocked by CORS | Browser loads page but video element shows nothing | Serve camera endpoint from same origin as web UI; avoid cross-origin camera stream |
| Route drawing unavailable during active mission | User wants to modify route mid-flight but controls are locked | Clearly indicate whether route editing is active or locked; provide explicit stop/reset |

---

## "Looks Done But Isn't" Checklist

- [ ] **zenoh publisher:** Verify subjects with `keelson.is_subject_well_known()` — a publisher that publishes to an unregistered subject compiles and runs but produces undecodable data for any keelson consumer.
- [ ] **Keelson envelope:** Verify round-trip with `keelson.uncover()` immediately after `keelson.enclose()` in a unit test — confirms payload bytes survive the wrap/unwrap cycle.
- [ ] **Protobuf timestamps:** Check decoded messages have non-zero `timestamp` fields — zero timestamps indicate `FromNanoseconds()` was not called.
- [ ] **Simulation timing:** Run simulation for 60 seconds and compare step count to expected — drift > 1% indicates sleep accumulation.
- [ ] **Camera frame freshness:** Check that frame timestamp in zenoh payload is within 100ms of wall clock — if not, frame buffer lag is present.
- [ ] **WebSocket broadcast:** Test with one slow client connected — verify other clients still receive updates normally (slow client must not block the broadcast loop).
- [ ] **Browser map:** Verify drone marker moves smoothly when backend publishes at 10Hz — jittery/teleporting marker indicates missing interpolation.

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Multiple zenoh sessions discovered late | MEDIUM | Refactor to singleton session injected via dependency; update all publisher declarations |
| Wrong keelson subject names throughout codebase | MEDIUM | Build subject name constant table; search/replace all hardcoded strings; add `is_subject_well_known()` assertions at startup |
| Simulation loop blocking event loop | HIGH | Architecture change — move simulation to thread; add queue-based state sharing; rewrite all `async def` paths |
| Frame buffer lag in production | LOW | Drop-in replacement of `VideoCapture.read()` calls with `LatestFrameCapture.get()` wrapper |
| JPEG encoded twice per frame | LOW | Extract encode call to single location; pass bytes to both output paths |
| Drift accumulated in simulation | LOW | Replace `time.sleep(dt)` with accumulator pattern; no logic changes required |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| zenoh callback deadlock | Phase 1 — zenoh/keelson scaffolding | Unit test: subscriber callback enqueues, never publishes directly |
| Session not closed / hangs on exit | Phase 1 — zenoh/keelson scaffolding | Integration test: process exits cleanly within 2s after SIGINT |
| Multiple zenoh sessions | Phase 1 — zenoh/keelson scaffolding | Code review: grep for `zenoh.open` — must appear exactly once |
| Keelson subject name mismatch | Phase 1 — zenoh/keelson scaffolding | Startup assertion: `assert keelson.is_subject_well_known(SUBJECT)` for every subject constant |
| Missing keelson envelope | Phase 1 — zenoh/keelson scaffolding | Unit test: publish then uncover; verify payload survives round-trip |
| Wrong protobuf timestamp | Phase 1 — zenoh/keelson scaffolding | Unit test: decoded timestamp must be within 1s of `time.time_ns()` |
| Simulation loop blocking event loop | Phase 2 — simulation loop | Integration test: POST /start-mission returns within 100ms while simulation is running |
| Simulation timing drift | Phase 2 — simulation loop | Timing test: 60s run, step count within 1% of expected |
| OpenCV frame buffer lag | Phase 3 — webcam integration | Frame freshness test: timestamp delta < 100ms |
| Dual JPEG encode | Phase 3 — webcam integration | CPU profiling: encode call count equals frame count, not 2x |
| WebSocket slow-client blocking | Phase 4 — browser real-time UI | Load test: one 1s-latency client must not delay others by > 50ms |
| Leaflet marker jitter | Phase 4 — browser real-time UI | Visual test: smooth movement at 10Hz updates |

---

## Sources

- [zenoh-python Concepts & Session Management](https://zenoh-python.readthedocs.io/en/latest/concepts.html) — MEDIUM confidence; official docs
- [zenoh GitHub Issue #1560: Deadlock in matching_listener callback](https://github.com/eclipse-zenoh/zenoh/issues/1560) — MEDIUM confidence; confirmed bug report
- [keelson Protocol Specification](https://rise-maritime.github.io/keelson/protocol-specification/) — HIGH confidence; official keelson docs
- [keelson Python SDK source (init)](https://raw.githubusercontent.com/RISE-Maritime/keelson/dev/sdks/python/keelson/__init__.py) — HIGH confidence; SDK source code
- [keelson Python SDK test_sdk.py](https://raw.githubusercontent.com/RISE-Maritime/keelson/dev/sdks/python/tests/test_sdk.py) — HIGH confidence; usage examples from tests
- [FastAPI Concurrency and async/await](https://fastapi.tiangolo.com/async/) — HIGH confidence; official FastAPI docs
- [FastAPI GitHub Discussion #8842: Blocking long-running requests](https://github.com/fastapi/fastapi/discussions/8842) — MEDIUM confidence; community-verified
- [OpenCV Q&A: Time delay in VideoCapture due to capture buffer](https://answers.opencv.org/question/74255/time-delay-in-videocapture-opencv-due-to-capture-buffer/) — MEDIUM confidence; multiple sources agree
- [PyImageSearch: Faster video FPS with threading](https://pyimagesearch.com/2017/02/06/faster-video-file-fps-with-cv2-videocapture-and-opencv/) — MEDIUM confidence; widely cited pattern
- [Fix Your Timestep! — Gaffer on Games](https://gafferongames.com/post/fix_your_timestep/) — HIGH confidence; canonical reference for simulation timing
- [WebSocket vs SSE 2025 — metatech.dev](https://www.metatech.dev/blog/2025-05-18-websocket-apis-vs-server-sent-events-performance-battle-2025) — LOW confidence; single source

---
*Pitfalls research for: ghost-drone (simulated surface drone, Python backend + zenoh/keelson + browser map UI)*
*Researched: 2026-02-18*
