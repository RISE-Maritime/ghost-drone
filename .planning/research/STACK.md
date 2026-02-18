# Stack Research

**Domain:** Simulated surface water drone (ghost-drone) — Python backend, zenoh pub/sub, keelson telemetry, browser map UI
**Researched:** 2026-02-18
**Confidence:** MEDIUM-HIGH (keelson is pre-v1.0 alpha; all other components verified via official sources)

---

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Python | 3.11+ | Runtime | keelson SDK requires `>=3.11`; asyncio support is mature at this version |
| eclipse-zenoh | 1.7.2 | Pub/sub transport | The official Python binding for Zenoh; 1.x rewrote the API in Rust-backed PyO3 — context-manager session, ZBytes payload, optional Encoding metadata. Only official zenoh-python option. |
| keelson | 0.5.0a9 | Envelope wrapping, key construction, subject registry | The official RISE-Maritime Python SDK. Provides `enclose()`/`uncover()`, `construct_pubsub_key()`, subject-schema registry (`subjects.yaml`), and protobuf codec helpers. Pre-v1 alpha but the only correct way to follow keelson conventions. |
| protobuf | >=5.29.1 (6.33.5 latest) | Serialise keelson payloads | Required by the keelson SDK directly. The SDK uses `google.protobuf` (not betterproto) — pin to >=5.29.1 to match keelson's own pyproject constraint. keelson ships generated `_pb2.py` stubs so you do not run protoc yourself. |
| FastAPI | 0.129.0 | HTTP + WebSocket server | Serves the map UI, REST endpoints (route upload/download), WebSocket feeds (live telemetry to browser). Requires Python >=3.10; async-native, works in the same event loop as the simulation. |
| uvicorn | 0.41.0 | ASGI server | Standard FastAPI runtime; supports `--reload` for development. Use `uvicorn[standard]` for uvloop + httptools. |
| opencv-python | 4.13.0.92 | Webcam capture + MJPEG encoding | `cv2.VideoCapture(0)` is the universal cross-platform webcam API. JPEG-encode frames with `cv2.imencode(".jpg", frame)` for MJPEG streaming. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| jinja2 | >=3.1 | HTML template rendering | Serve the map page from FastAPI `TemplateResponse`; inlines CDN links for Leaflet + Geoman. No build step required. |
| aiofiles | >=23.0 | Async static-file serving | Required by FastAPI `StaticFiles` for async reads. |
| pyyaml | >=6.0 | subjects.yaml loading | Used internally by keelson SDK; also useful for project config files. |
| parse | >=1.19 | Key expression parsing | Used internally by keelson SDK. |
| numpy | >=1.26 | Simulation state vectors + sensor noise | Clean representation of drone state (position, velocity, heading). Use `np.random.normal()` for Gaussian sensor noise. Also required by opencv-python. |
| scipy | >=1.12 | Smooth dynamics (optional) | `scipy.interpolate.CubicSpline` for smooth waypoint following; `scipy.signal` for low-pass filtering simulated sensor noise. Defer if simulation stays simple. |
| leaflet.js | 1.9.4 (CDN) | Browser map rendering | Lightweight (42 KB), mobile-ready, massive plugin ecosystem. Served via CDN — no npm build step. |
| @geoman-io/leaflet-geoman-free | 2.19.2 (CDN) | Draw/edit routes on map | The most capable Leaflet drawing plugin. Supports Polyline (route path), Marker (waypoints), snapping, edit and delete modes. GeoJSON round-trip. Actively maintained (published Feb 2026). Replaces the unmaintained `Leaflet.draw`. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| uv | Dependency management & venv | Faster pip replacement; `uv sync` installs from `pyproject.toml`. Use `uv add` instead of `pip install`. Preferred over pip+venv in 2025 Python projects. |
| protoc + grpc-tools | Regenerate `_pb2.py` stubs | Only needed if you add new `.proto` definitions. keelson ships pre-generated stubs. Install: `pip install grpcio-tools`. |
| zenoh-cli | Debug/inspect zenoh traffic | Install separately: `cargo install zenoh-cli` or use Docker image. Lets you `zenoh-sub` or `zenoh-pub` from command line to verify topics. |

---

## Installation

```bash
# Create venv
python -m venv .venv && source .venv/bin/activate
# (or: uv venv && source .venv/bin/activate)

# Core runtime
pip install "eclipse-zenoh==1.7.2"
pip install "git+https://github.com/RISE-Maritime/keelson.git@dev#subdirectory=sdks/python"
pip install "protobuf>=5.29.1"
pip install "fastapi==0.129.0"
pip install "uvicorn[standard]==0.41.0"
pip install "opencv-python==4.13.0.92"
pip install "jinja2>=3.1"
pip install "aiofiles>=23.0"
pip install "numpy>=1.26"
pip install "pyyaml>=6.0"
pip install "parse>=1.19"

# Optional simulation helpers
pip install "scipy>=1.12"

# Dev tools
pip install "grpcio-tools"
```

**Note on keelson install:** The package is not published to PyPI under a stable name yet (as of 0.5.0a9). Install directly from the `dev` branch of the GitHub repo using the subdirectory pip syntax above. Pin to a specific commit SHA in production.

---

## Keelson API — Key Patterns

These patterns come from verified SDK source (`sdks/python/keelson/__init__.py` and `tests/test_sdk.py`). Confidence: MEDIUM (pre-v1 alpha; API may shift).

### Publish a telemetry value

```python
import zenoh
import keelson
from keelson.payloads.Primitives_pb2 import TimestampedFloat

# Build key: "ghost-drone/@v0/sim001/pubsub/heading_true_north_deg/sim"
key = keelson.construct_pubsub_key(
    base_path="ghost-drone",
    entity_id="sim001",
    subject="heading_true_north_deg",
    source_id="sim",
)

# Encode payload
msg = TimestampedFloat()
msg.timestamp.GetCurrentTime()
msg.value = 42.7

envelope_bytes = keelson.enclose(msg.SerializeToString())

# Publish
with zenoh.open(zenoh.Config()) as session:
    pub = session.declare_publisher(key)
    pub.put(envelope_bytes)
```

### Publish location (WGS84)

Subject is `location_fix` → type is `foxglove.LocationFix` (imported from foxglove proto stubs bundled in keelson).

### Publish image frame

Subject is `image_raw` → type is `foxglove.RawImage`. Encode the OpenCV frame as JPEG bytes, populate the RawImage message, wrap with `enclose()`.

---

## Map UI — Key Patterns

The UI is a single HTML page served by FastAPI (`TemplateResponse`). No build step.

```html
<!-- In templates/index.html — loaded via CDN -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@geoman-io/leaflet-geoman-free@2.19.2/dist/leaflet-geoman.css"/>
<script src="https://unpkg.com/@geoman-io/leaflet-geoman-free@2.19.2/dist/leaflet-geoman.min.js"></script>
```

Route is drawn as a Polyline. On `pm:create`, extract the layer's LatLng array and POST it as GeoJSON to `/api/route`. FastAPI stores the route; simulation picks it up.

Live position updates from server → browser via **WebSocket** at `/ws/telemetry`. The browser updates a Leaflet Marker in real time.

---

## Webcam Streaming Pattern

MJPEG over HTTP via a FastAPI `StreamingResponse`. Simple, no codec, works in any browser `<img>` tag.

```python
import cv2
from fastapi.responses import StreamingResponse

cap = cv2.VideoCapture(0)

def generate_frames():
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        _, buffer = cv2.imencode(".jpg", frame)
        yield (b"--frame\r\nContent-Type: image/jpeg\r\n\r\n" +
               buffer.tobytes() + b"\r\n")

@app.get("/video")
def video_feed():
    return StreamingResponse(generate_frames(),
                             media_type="multipart/x-mixed-replace; boundary=frame")
```

Run the capture loop in a background thread (`threading.Thread`) so it does not block the asyncio event loop. Use `asyncio.get_event_loop().run_in_executor()` for async bridge if needed.

---

## Simulation Loop Pattern

Run simulation as an asyncio task alongside FastAPI/uvicorn using the `lifespan` pattern:

```python
from contextlib import asynccontextmanager
import asyncio

@asynccontextmanager
async def lifespan(app: FastAPI):
    task = asyncio.create_task(simulation_loop())
    yield
    task.cancel()

app = FastAPI(lifespan=lifespan)

async def simulation_loop():
    dt = 0.1  # 10 Hz
    while True:
        state = advance_dynamics(state, dt)
        await publish_telemetry(state)
        await asyncio.sleep(dt)
```

This keeps everything in one process — no separate daemon or subprocess needed.

---

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| FastAPI + uvicorn | Flask + gevent | Never for this project: Flask lacks native async/await, making it awkward to share the event loop with the simulation and zenoh publisher. |
| FastAPI + uvicorn | aiohttp | aiohttp is a viable alternative if you want minimal dependencies, but FastAPI has better DX for route declaration, WebSocket, and templating. |
| leaflet.js + Geoman | Mapbox GL JS | If you need 3D terrain or vector tiles — not needed here. Mapbox requires an API key. |
| leaflet.js + Geoman | OpenLayers | OpenLayers is more capable but far heavier and complex for this use case. Geoman on Leaflet is sufficient for route drawing. |
| leaflet.js + Geoman | Leaflet.draw | Leaflet.draw is unmaintained (last commit 2021). Geoman supersedes it with the same API surface and active maintenance. |
| opencv-python | imageio / picamera2 | opencv-python is the universal choice for USB/V4L2 webcams. picamera2 is Raspberry Pi specific. imageio lacks MJPEG encode support. |
| MJPEG StreamingResponse | WebRTC | WebRTC is lower latency but requires a signalling server and is overkill for a local demo tool. |
| MJPEG StreamingResponse | HLS/DASH | HLS/DASH requires FFmpeg transcoding pipeline — unnecessary complexity for a simulation tool. |
| protobuf (google) | betterproto | keelson SDK is built against `google.protobuf` (imports `_pb2` stubs). betterproto generates incompatible classes. Do not mix. |
| asyncio simulation loop | threading.Timer | asyncio task is cleaner and integrates with uvicorn's loop. Use threads only for blocking I/O (e.g., `cv2.VideoCapture`). |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Leaflet.draw (`leaflet-draw`) | Unmaintained since 2021; known bugs unresolved; active fork deprecated in favour of Geoman | `@geoman-io/leaflet-geoman-free` |
| betterproto | Generates Python classes incompatible with keelson's `google.protobuf`-based stubs. Mixing causes `AttributeError` at runtime. | `protobuf` (google official) |
| zenoh-python 0.x (pre-1.0 API) | The 1.0 API is a full rewrite — `Value`, `Sample.payload` patterns from 0.x are removed. All keelson 0.5.x connectors target 1.x. | `eclipse-zenoh>=1.2.1` |
| Flask | No native asyncio; running a simulation loop alongside Flask requires either a separate thread or gevent monkey-patching, both of which complicate WebSocket handling. | FastAPI + uvicorn |
| `multiprocessing` for simulation | Zenoh sessions are not safely fork-able. The session must be created in the process that uses it. | `asyncio.create_task()` in the same process |
| npm / node / webpack build step | Project constraint: no separate frontend build step. Serve static HTML with CDN script tags from FastAPI templates. | Jinja2 templates + CDN links |

---

## Stack Patterns by Variant

**If running on a machine without a webcam:**
- Use `cv2.VideoCapture("path/to/video.mp4")` as a test source.
- Or synthesise a fake frame with `numpy` (draw route position onto blank canvas).
- Because the MJPEG route is independent of a real camera.

**If deploying in a Docker container:**
- Pass `--device /dev/video0` to Docker run to expose the webcam.
- Use `opencv-python-headless` instead of `opencv-python` (no GUI dependency).
- Because container has no display server.

**If zenoh router is on a remote host:**
- Set `ZENOH_ROUTER_CONNECT=tcp/<host>:7447` in the zenoh Config before opening session.
- Because default mode is peer-to-peer on localhost; remote requires explicit router address.

---

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| `eclipse-zenoh==1.7.2` | `keelson>=0.5.0a9` (requires `>=1.2.1`) | keelson pyproject pins `eclipse-zenoh>=1.2.1`; 1.7.2 satisfies this. |
| `protobuf>=5.29.1` | `keelson>=0.5.0a9` | keelson pins `protobuf>=5.29.1`. Latest is 6.33.5 — both work. |
| `Python 3.11+` | all listed packages | keelson requires 3.11+. eclipse-zenoh supports 3.8+. FastAPI 0.129 requires 3.10+. 3.11 is the binding constraint. |
| `fastapi==0.129.0` | `uvicorn==0.41.0` | FastAPI 0.129 requires `starlette>=0.40.0,<1.0.0`; uvicorn 0.41 is compatible. |
| `opencv-python==4.13.0.92` | `numpy>=1.26` | OpenCV 4.13 ships numpy array output natively; numpy 2.x is supported. |
| `leaflet@1.9.4` | `@geoman-io/leaflet-geoman-free@2.19.2` | Geoman 2.19.2 is tested against Leaflet 1.9.x. Do not use Leaflet 2.x beta — Geoman compatibility unverified. |

---

## Sources

- PyPI eclipse-zenoh — verified version 1.7.2, released Jan 8, 2026. https://pypi.org/project/eclipse-zenoh/
- zenoh.io Python migration guide — verified 1.x API: ZBytes, context managers, Encoding as optional metadata. https://zenoh.io/docs/migration_1.0/python/
- zenoh-python GitHub — publisher/subscriber examples from `main` branch. https://github.com/eclipse-zenoh/zenoh-python
- keelson GitHub dev branch — SDK functions, envelope API, pyproject.toml (version 0.5.0a9, requires eclipse-zenoh>=1.2.1, protobuf>=5.29.1, Python>=3.11). https://github.com/RISE-Maritime/keelson/tree/dev
- keelson subjects.yaml — full subject registry: location_fix, heading_true_north_deg, roll/pitch/yaw, image_raw, etc. https://github.com/RISE-Maritime/keelson/blob/dev/messages/subjects.yaml
- keelson Primitives.proto — TimestampedFloat, TimestampedBytes, TimestampedQuaternion, etc. https://raw.githubusercontent.com/RISE-Maritime/keelson/dev/messages/payloads/Primitives.proto
- PyPI fastapi — verified version 0.129.0, released Feb 12, 2026. https://pypi.org/project/fastapi/
- PyPI uvicorn — verified version 0.41.0, released Feb 16, 2026. https://pypi.org/project/uvicorn/
- PyPI opencv-python — verified version 4.13.0.92, released Feb 5, 2026. https://pypi.org/project/opencv-python/
- PyPI protobuf — verified version 6.33.5, released Jan 29, 2026; keelson requires >=5.29.1. https://pypi.org/project/protobuf/
- npm @geoman-io/leaflet-geoman-free — verified version 2.19.2, published Feb 2026. https://www.npmjs.com/package/@geoman-io/leaflet-geoman-free
- Leaflet.js — verified version 1.9.4. https://leafletjs.com/
- WebSearch: FastAPI + Leaflet real-time GPS tracking pattern (MEDIUM confidence). https://araz.me/2025/02/17/real-time-gps-tracking-on-a-web-map-using-fastapi-leaflet/
- WebSearch: OpenCV MJPEG streaming with Flask/FastAPI (MEDIUM confidence, well-established pattern). https://pyimagesearch.com/2019/09/02/opencv-stream-video-to-web-browser-html-page/

---

*Stack research for: ghost-drone (simulated surface water drone with keelson/zenoh telemetry)*
*Researched: 2026-02-18*
