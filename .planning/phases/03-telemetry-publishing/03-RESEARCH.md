# Phase 3: Telemetry Publishing - Research

**Researched:** 2026-02-19
**Domain:** keelson envelope encoding, zenoh publishing, sinusoidal roll/pitch simulation, browser sparkline gauges
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

#### Live plot design
- Gauges + sparklines (not line charts): each signal gets a numeric gauge for the current value and a small sparkline showing recent history
- 4 signals: heading, speed, roll, pitch — position is already on the map marker, no lat/lng gauge needed
- Rolling 30-second window for sparklines
- Sidebar panel on the right side of the map, open by default on page load
- Plots and settings are separate: sidebar for plots, modal/drawer for settings (accessed via a settings button)

#### Roll & pitch simulation
- Sinusoidal wave oscillation model (not pure Gaussian noise) — realistic feel for a surface water drone
- Independent controls for roll and pitch: separate amplitude and period sliders for each
- Amplitude is user-configurable in the settings modal (no hardcoded default override)
- Gaussian noise for location (lat/lng) is also user-configurable in the settings modal

#### Publish rate
- Configurable in the settings modal — not hardcoded
- Per-subject publish rates: each keelson subject has its own rate setting
- Per-subject source name: each subject has a free-text field for the source segment of the keelson key-expression (e.g., `gnss/0`, `gnss/1`, `imu/0`) — this controls how the zenoh key-expression is constructed
- Source field is free-text (not a dropdown) to match any keelson setup

#### Plot behavior on state change
- Paused: plots freeze on the last received value — no visual indicator, no clearing
- Stopped: all plots and sparkline history are cleared — clean slate for the next run
- Sidebar is open by default on page load

### Claude's Discretion
- Exact slider ranges for amplitude, period, and publish rate — pick sensible defaults and min/max bounds
- Sparkline charting library choice (must be lightweight, no build step)
- Settings modal design and layout (must fit with existing Leaflet UI style)
- How the SimEngine tick loop integrates with per-subject rate throttling (implementation detail)

### Deferred Ideas (OUT OF SCOPE)
- None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| TELEM-01 | Drone publishes position (location_fix, foxglove.LocationFix) to zenoh using keelson envelope encoding at the configured key expression | keelson.construct_pubsub_key + keelson.enclose + ZenohPublisher.publish(); LocationFix protobuf confirmed in venv |
| TELEM-02 | Drone publishes heading (heading_true_north_deg, TimestampedFloat) to zenoh using keelson envelope encoding | Same pipeline; heading_true_north_deg confirmed well-known subject; keelson.TimestampedFloat |
| TELEM-03 | Drone publishes speed (speed_over_ground_knots, TimestampedFloat) to zenoh using keelson envelope encoding | Same pipeline; unit conversion required: engine produces m/s, subject expects knots (1 m/s = 1.94384 knots) |
| TELEM-04 | Drone publishes attitude (roll_deg and pitch_deg, TimestampedFloat each) to zenoh using keelson envelope encoding | roll_deg and pitch_deg are confirmed well-known keelson subjects; sinusoidal model implementation researched |
| UI-05 | Web UI displays real-time plots of published telemetry values (heading, speed, roll, pitch) updating live during simulation and freeze when paused | @fnando/sparkline 0.3.10 (UMD, CDN-loadable); gauge = current value from WS frame; sparkline = rolling 30s history array |
</phase_requirements>

---

## Summary

Phase 3 wires the existing ZenohPublisher daemon thread (Phase 1 scaffold) to the existing SimEngine tick loop (Phase 2) to publish five keelson-wrapped protobuf messages per tick cycle. All five subjects (`location_fix`, `heading_true_north_deg`, `speed_over_ground_knots`, `roll_deg`, `pitch_deg`) are confirmed well-known in the installed keelson 0.5.0a9 subjects registry. The keelson API is fully verified: `keelson.construct_pubsub_key()` builds the zenoh key expression, `keelson.enclose()` wraps the serialized protobuf into an Envelope, and `ZenohPublisher.publish()` queues the bytes to the daemon thread. The ZenohPublisher's `queue.Queue` is thread-safe and may be called from both asyncio coroutines and regular threads without locks.

Roll and pitch are NEW signals not currently in TelemetryFrame or SimEngine. They must be computed separately as sinusoidal oscillations with Gaussian noise, keeping the SimEngine locomotion core untouched (which is explicitly out of scope). The cleanest approach is a small `RollPitchModel` class that tracks elapsed simulation time and produces sinusoidal values, called in the server.py tick loop alongside `engine.tick()`. Settings (per-subject publish rate, per-subject source name, roll/pitch amplitude/period, location noise sigma) flow from browser → server via a new `update_settings` WebSocket message type; these are held in a dataclass in server.py and consulted each tick.

The browser sidebar requires live-updating gauges (current value) and sparklines (rolling 30-second history). The `@fnando/sparkline 0.3.10` library provides a UMD build (3.5 KB) loadable via CDN `<script>` tag with no build step. It draws SVG sparklines by re-calling `sparkline(svgEl, dataArray)` each update. Gauges are plain `<div>` numeric displays styled to match the existing dark theme. All telemetry arrives via the existing WebSocket frame (extended with `roll` and `pitch` fields); the browser does not need a second connection.

**Primary recommendation:** Add a `RollPitchModel` class in `ghost_drone/simulation/`, extend the WS frame dict in `server.py` to include `roll`/`pitch`, wire `ZenohPublisher` via FastAPI lifespan context manager storing it in `app.state`, use per-subject `time.monotonic()` rate-throttle in the tick loop, and use `@fnando/sparkline 0.3.10` for browser sparklines.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| keelson | 0.5.0a9 (git SHA e47e52fd) | Envelope encoding, subject registry, key construction | Already installed; all 5 subjects confirmed well-known |
| eclipse-zenoh | 1.7.2 (pinned) | Transport layer; `session.put(key_expr, bytes)` | Already installed; ZenohPublisher scaffold ready |
| protobuf | >=5.29.1 | Serialize TimestampedFloat, LocationFix payloads | Already installed; stubs generated |
| @fnando/sparkline | 0.3.10 | Browser sparklines via CDN script tag | UMD build, 3.5 KB, zero dependencies, no build step |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `time` (stdlib) | — | `time.time_ns()` for payload timestamps; `time.monotonic()` for rate throttle | Every publish tick |
| `math` (stdlib) | — | `math.sin()` / `math.pi` for sinusoidal roll/pitch | RollPitchModel |
| `random` (stdlib) | — | `random.gauss()` for roll/pitch noise | RollPitchModel |
| `dataclasses` (stdlib) | — | `PublishSettings` dataclass for per-subject config | server.py settings state |
| `contextlib` (stdlib) | — | `@asynccontextmanager` for FastAPI lifespan | server.py ZenohPublisher lifecycle |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| @fnando/sparkline | Chart.js, Plotly | Far heavier (100-500 KB), overkill for sparklines |
| @fnando/sparkline | mitjafelicijan/sparklines | Data-attribute driven, harder to update programmatically each tick |
| @fnando/sparkline | hand-rolled SVG polyline | Viable for this use case; sparkline library saves edge-case handling |
| time.monotonic() rate throttle | asyncio.Queue with rate limiting | Over-engineered; monotonic throttle is 5 lines, zero overhead |
| FastAPI lifespan | app.on_startup/on_shutdown | Deprecated pattern; lifespan is the current FastAPI idiom |

**CDN script tag (no build step):**
```html
<script src="https://cdn.jsdelivr.net/npm/@fnando/sparkline@0.3.10/dist/sparkline.js"></script>
```

---

## Architecture Patterns

### Recommended Project Structure (additions to Phase 2)
```
ghost_drone/
├── simulation/
│   ├── engine.py          # unchanged (locomotion core - out of scope)
│   ├── models.py          # unchanged (TelemetryFrame, SimState)
│   └── roll_pitch.py      # NEW: RollPitchModel sinusoidal oscillator
├── zenoh_bridge/
│   ├── publisher.py       # Phase 1 scaffold — wired in Phase 3
│   └── telemetry.py       # NEW: encode_* functions for each subject
└── server.py              # extended: lifespan, WS settings, publish calls

static/
└── index.html             # extended: sidebar, settings modal, sparklines
```

### Pattern 1: FastAPI Lifespan for ZenohPublisher Lifecycle

**What:** Use `@asynccontextmanager` lifespan to start ZenohPublisher before the first request and stop it on shutdown.

**When to use:** Shared daemon resources that must outlive individual WebSocket connections.

```python
# ghost_drone/server.py
import contextlib
from fastapi import FastAPI, Request
from ghost_drone.zenoh_bridge.publisher import ZenohPublisher

@contextlib.asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: ZenohPublisher starts before any WS connections
    pub = ZenohPublisher(endpoint=app.state.cfg.zenoh_endpoint)
    pub.start()
    app.state.publisher = pub
    yield
    # Shutdown: drain queue, close session
    pub.stop()

app = FastAPI(lifespan=lifespan)
```

The config is set into `app.state` by `__main__.py` BEFORE creating the app, so lifespan can read it:

```python
# ghost_drone/__main__.py  (addition)
from ghost_drone.server import create_app

cfg = load_config()
app = create_app(cfg)  # passes cfg to app.state before lifespan runs
uvicorn.run(app, host=args.host, port=args.port)
```

### Pattern 2: Per-Subject Rate Throttle (monotonic clock)

**What:** Track last-publish time per subject using `time.monotonic()`; skip publish if interval not elapsed.

**When to use:** Each tick (at TICK_HZ=20), decide which subjects to publish at their configured rate.

```python
# ghost_drone/zenoh_bridge/telemetry.py

import time
from typing import Dict

class SubjectThrottle:
    """Track per-subject last-publish time for rate limiting."""

    def __init__(self) -> None:
        self._last: Dict[str, float] = {}

    def should_publish(self, subject: str, rate_hz: float) -> bool:
        """Return True and update timestamp if enough time has elapsed."""
        if rate_hz <= 0:
            return False
        period_s = 1.0 / rate_hz
        now = time.monotonic()
        if now - self._last.get(subject, 0.0) >= period_s:
            self._last[subject] = now
            return True
        return False
```

### Pattern 3: keelson Encode Pipeline

**What:** Build keelson key → serialize protobuf → wrap in envelope → queue to ZenohPublisher.

```python
# ghost_drone/zenoh_bridge/telemetry.py
import time
import keelson
from keelson.payloads.Primitives_pb2 import TimestampedFloat
from keelson.payloads.foxglove.LocationFix_pb2 import LocationFix

MPS_TO_KNOTS = 1.94384  # CRITICAL: keelson subject expects knots, engine produces m/s

def encode_timestamped_float(value: float) -> bytes:
    """Wrap a float in TimestampedFloat + keelson envelope. Returns bytes for session.put()."""
    msg = TimestampedFloat()
    msg.timestamp.FromNanoseconds(time.time_ns())
    msg.value = value
    return keelson.enclose(msg.SerializeToString())

def encode_location_fix(lat: float, lng: float) -> bytes:
    """Wrap lat/lng in foxglove.LocationFix + keelson envelope."""
    msg = LocationFix()
    msg.timestamp.FromNanoseconds(time.time_ns())
    msg.latitude = lat
    msg.longitude = lng
    msg.altitude = 0.0
    return keelson.enclose(msg.SerializeToString())

def make_key(cfg, subject: str, source_id: str) -> str:
    """Construct the zenoh key expression for a subject."""
    return keelson.construct_pubsub_key(
        base_path=cfg.keelson_realm,
        entity_id=cfg.entity_id,
        subject=subject,
        source_id=source_id,
    )
```

### Pattern 4: RollPitchModel (Sinusoidal Oscillator)

**What:** Separate class that tracks elapsed play-time and computes sinusoidal roll/pitch + Gaussian noise.

**When to use:** Called once per tick loop iteration in server.py, independent of SimEngine.

```python
# ghost_drone/simulation/roll_pitch.py
import math
import random
from ghost_drone.simulation.models import SimState

class RollPitchModel:
    """Sinusoidal roll/pitch oscillator for surface water drone motion.

    Tracks elapsed simulation time. Must be reset when simulation stops.
    Parameters are set by user via settings modal and updated at any time.
    """

    def __init__(self) -> None:
        self._elapsed_s: float = 0.0
        # Defaults (overridden by settings modal)
        self.roll_amplitude_deg: float = 5.0
        self.roll_period_s: float = 10.0
        self.pitch_amplitude_deg: float = 3.0
        self.pitch_period_s: float = 8.0
        self.noise_sigma_deg: float = 0.5

    def reset(self) -> None:
        """Reset elapsed time. Call when simulation stops."""
        self._elapsed_s = 0.0

    def tick(self, dt: float, state: SimState) -> tuple[float, float]:
        """Advance by dt seconds. Returns (roll_deg, pitch_deg).

        Advances elapsed time only when PLAYING. Applies noise to output only.
        """
        if state == SimState.PLAYING:
            self._elapsed_s += dt

        roll = (self.roll_amplitude_deg
                * math.sin(2 * math.pi * self._elapsed_s / self.roll_period_s)
                + random.gauss(0, self.noise_sigma_deg))
        pitch = (self.pitch_amplitude_deg
                 * math.sin(2 * math.pi * self._elapsed_s / self.pitch_period_s)
                 + random.gauss(0, self.noise_sigma_deg))
        return roll, pitch
```

### Pattern 5: PublishSettings Dataclass

**What:** Holds per-subject config (rate_hz, source_id) plus global noise/oscillation params. Lives in server.py, updated by `update_settings` WS messages.

```python
# ghost_drone/server.py  (partial)
import dataclasses
from typing import Dict

@dataclasses.dataclass
class SubjectConfig:
    rate_hz: float = 1.0
    source_id: str = "imu/0"

@dataclasses.dataclass
class PublishSettings:
    """Mutable settings updated by the browser settings modal."""
    subjects: Dict[str, SubjectConfig] = dataclasses.field(default_factory=lambda: {
        "location_fix":           SubjectConfig(rate_hz=1.0, source_id="gnss/0"),
        "heading_true_north_deg": SubjectConfig(rate_hz=1.0, source_id="imu/0"),
        "speed_over_ground_knots":SubjectConfig(rate_hz=1.0, source_id="imu/0"),
        "roll_deg":               SubjectConfig(rate_hz=1.0, source_id="imu/0"),
        "pitch_deg":              SubjectConfig(rate_hz=1.0, source_id="imu/0"),
    })
    location_noise_sigma_m: float = 0.5
```

### Pattern 6: Extended WebSocket Tick Loop (server.py)

**What:** Tick loop builds an extended frame dict (adds roll/pitch), publishes to zenoh if playing, sends to browser.

```python
# ghost_drone/server.py  (tick_loop inside websocket_endpoint)
async def tick_loop():
    dt = 1.0 / TICK_HZ
    throttle = SubjectThrottle()
    roll_pitch = RollPitchModel()

    try:
        while True:
            frame = engine.tick(dt, cruise_speed_mps=cruise_speed_mps)
            roll, pitch = roll_pitch.tick(dt, frame.state)

            # Stop: clear sparkline history (signal browser via flag)
            if frame.state == SimState.STOPPED:
                roll_pitch.reset()

            # Publish to zenoh only when PLAYING
            if frame.state == SimState.PLAYING:
                _publish_telemetry(request.app, frame, roll, pitch, settings, throttle)

            # Send extended frame to browser
            frame_dict = frame.to_dict()
            frame_dict["roll"] = roll
            frame_dict["pitch"] = pitch
            await websocket.send_text(json.dumps(frame_dict))
            await asyncio.sleep(dt)
    except (WebSocketDisconnect, Exception):
        pass
```

### Pattern 7: Browser Sparkline Update (no build step)

**What:** Re-call `sparkline(svgEl, dataArray)` each time a new WS frame arrives. Keep a rolling array capped at 30s * TICK_HZ samples.

```javascript
// static/index.html  (partial)
// Load via CDN:
// <script src="https://cdn.jsdelivr.net/npm/@fnando/sparkline@0.3.10/dist/sparkline.js"></script>

const HISTORY_SAMPLES = 30 * 20;  // 30 seconds at 20 Hz = 600 samples
const history = { heading: [], speed: [], roll: [], pitch: [] };
const svgEls = {
  heading: document.getElementById('spark-heading'),
  speed:   document.getElementById('spark-speed'),
  roll:    document.getElementById('spark-roll'),
  pitch:   document.getElementById('spark-pitch'),
};

function onTelemetryFrame(frame) {
  if (frame.state === 'stopped') {
    // Clear all sparkline history
    for (const k of Object.keys(history)) history[k] = [];
    updateGauges({ heading: 0, speed: 0, roll: 0, pitch: 0 });
    return;
  }
  // Only push if playing (paused = freeze = no new data)
  if (frame.state === 'playing') {
    for (const key of ['heading', 'speed', 'roll', 'pitch']) {
      history[key].push(frame[key]);
      if (history[key].length > HISTORY_SAMPLES) history[key].shift();
    }
    updateGauges(frame);
  }
  // Redraw sparklines (even on pause, keeps last state)
  for (const key of ['heading', 'speed', 'roll', 'pitch']) {
    if (history[key].length > 1) {
      sparkline.sparkline(svgEls[key], history[key]);
    }
  }
}
```

### Anti-Patterns to Avoid

- **Calling zenoh from asyncio coroutine directly:** zenoh-python 1.x is sync-only. Always go through `ZenohPublisher.publish()` → `queue.Queue`. The queue is thread-safe from asyncio context.
- **Publishing when paused or stopped:** Check `frame.state == SimState.PLAYING` before calling `_publish_telemetry`. Requirement says no messages during stopped/paused.
- **Module-level ZenohPublisher without lifespan:** Creates a session before uvicorn event loop starts; use FastAPI lifespan to manage lifetime.
- **Publishing speed in m/s:** The subject is `speed_over_ground_knots` — multiply by `1.94384` before encoding.
- **Modifying SimEngine.tick() signature:** The locomotion core is explicitly out of scope. Roll/pitch is computed separately in `RollPitchModel`.
- **Calling `sparkline()` with an empty array:** Guard with `if history[key].length > 1` or it throws.
- **One ZenohPublisher per WebSocket connection:** Publisher is a singleton (one zenoh session). Storing in `app.state` ensures all WS handlers share the same instance.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Protobuf serialization for keelson payloads | Custom binary serializer | `keelson.payloads.Primitives_pb2.TimestampedFloat` + `keelson.payloads.foxglove.LocationFix_pb2.LocationFix` | Pre-generated stubs; must match keelson schema exactly |
| keelson envelope format | Custom header/framing | `keelson.enclose(payload_bytes)` | Envelope spec is versioned and opaque; incorrect framing breaks all consumers |
| keelson key expression builder | String f-string | `keelson.construct_pubsub_key(base_path, entity_id, subject, source_id)` | Key format includes `@v0` version segment; must be exact |
| Subject validity check | Hardcoded string list | `keelson.is_subject_well_known(subject)` | Registry is loaded from subjects.yaml at import time |
| Browser sparklines | `<canvas>` polyline drawing | `@fnando/sparkline` via CDN | Handles scaling, viewBox, min/max normalization; 3.5 KB |

**Key insight:** keelson's envelope format and key expression format are versioned conventions shared with all zenoh subscribers. Deviating from them silently breaks subscribers — they receive bytes but cannot decode them.

---

## Common Pitfalls

### Pitfall 1: Speed Unit Mismatch (m/s vs knots)
**What goes wrong:** SimEngine.tick() returns speed in m/s. Publishing it directly to `speed_over_ground_knots` yields ~51% of the correct knot value.
**Why it happens:** Engine is a physics simulation (SI units); keelson subject is nautical.
**How to avoid:** Apply `MPS_TO_KNOTS = 1.94384` conversion in the publish helper function.
**Warning signs:** A subscriber sees `~10.0` when the cruise speed input shows 10 m/s and expects ~19.4 knots.

### Pitfall 2: Publishing During Paused State
**What goes wrong:** Telemetry messages arrive at zenoh subscribers even when the browser shows "Paused".
**Why it happens:** `frame.state` check missing or checking wrong condition.
**How to avoid:** Gate all `_publish_telemetry()` calls with `if frame.state == SimState.PLAYING:`.
**Warning signs:** `z_sub` shows messages arriving at 1 Hz while browser controls show Paused.

### Pitfall 3: RollPitchModel Not Reset on Stop
**What goes wrong:** After a stop-then-play cycle, roll/pitch start mid-oscillation instead of at zero.
**Why it happens:** `_elapsed_s` not reset when SimEngine transitions to STOPPED.
**How to avoid:** Call `roll_pitch.reset()` when `frame.state == SimState.STOPPED` in the tick loop.
**Warning signs:** First few seconds of a new run show non-zero roll/pitch in gauges immediately.

### Pitfall 4: ZenohPublisher Queue Full Silently Drops
**What goes wrong:** High tick rates + multiple subjects overwhelm the queue (default maxsize=256); messages drop silently.
**Why it happens:** The daemon thread's zenoh session slow or blocked; publish rate set very high.
**How to avoid:** Keep publish rates reasonable (<=10 Hz per subject). Log queue-full warnings (already in publisher.py). Reduce maxsize can also help catch runaway rates.
**Warning signs:** Log shows "ZenohPublisher queue full — dropping message" repeatedly.

### Pitfall 5: sparkline() Called with Empty Array
**What goes wrong:** `sparkline(svgEl, [])` throws a JavaScript error.
**Why it happens:** History array is empty on the first tick or after a stop.
**How to avoid:** Guard with `if (history[key].length > 1)` before calling `sparkline()`.
**Warning signs:** Browser console shows `TypeError` immediately after stop or on first load.

### Pitfall 6: Multiple WS Connections Each Create a ZenohPublisher
**What goes wrong:** Opening multiple browser tabs creates multiple zenoh sessions; messages are published multiple times.
**Why it happens:** ZenohPublisher instantiated inside `websocket_endpoint()` handler instead of at app startup.
**How to avoid:** Store ZenohPublisher in `app.state` via lifespan; access with `request.app.state.publisher` inside handlers.
**Warning signs:** zenoh subscriber receives N × expected message rate (N = open tabs).

### Pitfall 7: Settings Not Thread-Safe Between Multiple WS Connections
**What goes wrong:** Two browser tabs send conflicting `update_settings` messages; race condition on the shared settings object.
**Why it happens:** `PublishSettings` is a mutable dataclass updated from asyncio coroutines.
**How to avoid:** Store settings per-connection (local to `websocket_endpoint()`) OR use asyncio Lock if shared. Simplest: settings are connection-local since only one browser is expected. Store defaults in `app.state`, copy into connection-local variable.
**Warning signs:** Settings changes in one tab affect another tab's publish behavior unexpectedly.

---

## Code Examples

Verified patterns from official keelson source and live inspection:

### Full keelson Encode Round-Trip (verified against installed keelson 0.5.0a9)
```python
# Source: verified via uv run python3 in /workspace
import time, keelson
from keelson.payloads.Primitives_pb2 import TimestampedFloat

# Encode
msg = TimestampedFloat()
msg.timestamp.FromNanoseconds(time.time_ns())
msg.value = 45.2

key = keelson.construct_pubsub_key(
    base_path="ghost-drone",       # from cfg.keelson_realm
    entity_id="sim001",             # from cfg.entity_id
    subject="heading_true_north_deg",
    source_id="imu/0",              # from settings.subjects["heading..."].source_id
)
# -> "ghost-drone/@v0/sim001/pubsub/heading_true_north_deg/imu/0"

envelope_bytes = keelson.enclose(msg.SerializeToString())
# -> bytes ready for session.put(key, envelope_bytes)

# Decode (for testing)
received_at, enclosed_at, raw = keelson.uncover(envelope_bytes)
recovered = TimestampedFloat.FromString(raw)
assert abs(recovered.value - 45.2) < 1e-3
assert recovered.timestamp.ToNanoseconds() > 0
```

### LocationFix Encode (verified)
```python
# Source: verified via uv run python3 in /workspace
import time, keelson
from keelson.payloads.foxglove.LocationFix_pb2 import LocationFix

msg = LocationFix()
msg.timestamp.FromNanoseconds(time.time_ns())
msg.latitude = 57.123    # from frame.lat
msg.longitude = 11.456   # from frame.lng
msg.altitude = 0.0

envelope_bytes = keelson.enclose(msg.SerializeToString())
# len: ~48 bytes
```

### Confirmed Key Expression Format (verified)
```
{keelson_realm}/@v0/{entity_id}/pubsub/{subject}/{source_id}

Examples:
  ghost-drone/@v0/sim001/pubsub/location_fix/gnss/0
  ghost-drone/@v0/sim001/pubsub/heading_true_north_deg/imu/0
  ghost-drone/@v0/sim001/pubsub/speed_over_ground_knots/imu/0
  ghost-drone/@v0/sim001/pubsub/roll_deg/imu/0
  ghost-drone/@v0/sim001/pubsub/pitch_deg/imu/0
```

### @fnando/sparkline Browser Usage (CDN, no build step)
```html
<!-- Source: https://github.com/fnando/sparkline README + verified CDN -->
<script src="https://cdn.jsdelivr.net/npm/@fnando/sparkline@0.3.10/dist/sparkline.js"></script>

<svg id="spark-heading" width="120" height="32" stroke-width="1.5"></svg>

<script>
  // After script loads, sparkline is exposed as sparkline.sparkline() when loaded via UMD
  const svgEl = document.getElementById('spark-heading');
  const data = [1, 5, 2, 4, 8, 3, 7];

  // Initial draw
  sparkline.sparkline(svgEl, data);

  // Update (call again with new data array)
  function update(newData) {
    sparkline.sparkline(svgEl, newData);
  }
</script>
```

Note: When loaded as UMD via CDN script tag, the global is `sparkline` (the module object); call it as `sparkline.sparkline(el, data)`.

### Sensible Slider Ranges for Settings Modal (Claude's Discretion)
```
Roll amplitude:   0.1 deg – 20 deg   (default: 5 deg)
Roll period:      2 s – 30 s         (default: 10 s)
Pitch amplitude:  0.1 deg – 10 deg   (default: 3 deg)
Pitch period:     2 s – 30 s         (default: 8 s)
Location noise:   0 m – 5 m          (default: 0.5 m)
Publish rate:     0.1 Hz – 10 Hz     (default: 1 Hz per subject, step 0.1)
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `app.on_startup` / `app.on_shutdown` | FastAPI `lifespan` context manager | FastAPI 0.93+ | Lifespan is now the only officially recommended pattern |
| zenoh-python async API | zenoh-python 1.x sync-only + daemon thread | zenoh-python 0.6 | Must use queue.Queue; no asyncio.create_task for zenoh calls |
| keelson pre-generated _pb2.py in repo | generated via `scripts/generate_keelson_protos.sh` | keelson dev branch | Must run script after `uv sync --all-extras` before using protobuf classes |

**Deprecated/outdated:**
- `app.on_startup` / `app.on_shutdown`: Still works but FastAPI docs say to use `lifespan`. New code should use lifespan.
- zenoh async Python bindings: Dropped in 0.6. Any tutorial showing `await session.put(...)` is for an old API.

---

## Open Questions

1. **sparkline UMD global name when loaded via CDN script tag**
   - What we know: The dist file at `@fnando/sparkline@0.3.10/dist/sparkline.js` is labeled UMD (3.48 KB). The README states "call `sparkline.sparkline(svg, values)` directly if loading via script without webpack."
   - What's unclear: The exact global name exposed (`window.sparkline` vs `window.Sparkline`) is not tested in a live browser here.
   - Recommendation: The first plan task should include a browser smoke-test verifying `sparkline.sparkline` is callable after CDN load. If not, fall back to hand-rolled SVG polyline (trivial for this use case) or the `mitjafelicijan/sparklines` alternative with its data-attribute update API.

2. **Settings persistence across WebSocket reconnects**
   - What we know: Settings are held in a connection-local dataclass. WS reconnects (page refresh) reset them to defaults.
   - What's unclear: Whether users expect settings to persist across page refreshes.
   - Recommendation: Given no explicit requirement for persistence, connection-local defaults are fine. Do NOT add localStorage or server-side persistence — keep it simple.

3. **Thread safety of PublishSettings when accessed from multiple concurrent WS connections**
   - What we know: CPython's GIL makes simple attribute reads/writes effectively atomic for built-in types. The settings are a dataclass with float/str attributes.
   - What's unclear: Whether multiple simultaneous browser connections racing on settings updates is a real concern.
   - Recommendation: Make settings connection-local (one settings object per WS connection, defaults from app.state). This eliminates the concern entirely and is simpler.

---

## Sources

### Primary (HIGH confidence)
- Installed keelson 0.5.0a9 at `/workspace/.venv/lib/python3.11/site-packages/keelson/` — directly inspected `__init__.py`, `codec.py`, `subjects.yaml`, all protobuf stubs
- Live Python execution (uv run) — verified construct_pubsub_key, enclose/uncover, LocationFix, TimestampedFloat round-trips, all 5 subjects confirmed well-known
- `/workspace/ghost_drone/zenoh_bridge/publisher.py` — ZenohPublisher scaffold confirmed; queue.Queue is thread-safe from asyncio
- `/workspace/pyproject.toml` — confirmed pinned dependencies: eclipse-zenoh 1.7.2, keelson git SHA e47e52fd

### Secondary (MEDIUM confidence)
- `@fnando/sparkline` at https://github.com/fnando/sparkline — README reviewed via WebFetch; UMD dist file confirmed at jsdelivr CDN (3.48 KB); global name pattern from README ("call sparkline.sparkline(svg, values) directly when loading via script tag without webpack")
- FastAPI lifespan pattern — verified via `help(fastapi.FastAPI.__init__)` showing `lifespan` parameter; `app.state` confirmed working

### Tertiary (LOW confidence)
- sparkline global name `sparkline.sparkline` when loaded via CDN: inferred from README, not verified in live browser environment. Mark for smoke-test in first plan task.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all Python-side libraries directly inspected in installed venv; all 5 keelson subjects confirmed well-known; protobuf stubs confirmed generated
- Architecture: HIGH — patterns verified against existing codebase structure (Phase 1 publisher scaffold, Phase 2 tick loop, FastAPI/asyncio patterns confirmed); ZenohPublisher queue thread-safety confirmed by queue.Queue semantics
- Pitfalls: HIGH — speed unit mismatch (m/s vs knots) verified numerically; other pitfalls derived from direct code inspection
- Browser sparklines: MEDIUM — library CDN URL verified, UMD format confirmed, API pattern from README; UMD global name needs browser smoke-test

**Research date:** 2026-02-19
**Valid until:** 2026-03-21 (keelson is alpha; re-verify if SHA is bumped)
