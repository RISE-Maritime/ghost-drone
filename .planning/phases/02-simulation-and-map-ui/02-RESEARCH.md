# Phase 2: Simulation and Map UI - Research

**Researched:** 2026-02-19
**Domain:** Leaflet.js interactive map + Python asyncio simulation engine + FastAPI WebSocket
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

#### Map interaction
- Drawing requires an explicit "draw mode" toggle — accidental clicks don't place waypoints
- In draw mode, each click places the next waypoint in sequence
- Waypoints are editable: drag to reposition, click to delete individual ones
- Minimum 2 waypoints required before Play is enabled
- **Pause**: drone freezes mid-route, route is locked (non-editable)
- **Stop**: drone "returns" to start waypoint, route unlocks for editing
- A dedicated **Clear** button (available when stopped) wipes all waypoints and the polyline
- Route persists after Stop — user can replay or redraw; no auto-clear on stop
- Editing is locked during simulation (both playing and paused states)

#### Drone marker & animation
- Drone marker is a top-down **drone SVG icon** that rotates to show heading
- Map **follows (pans to) the drone** as it moves — continuous centering
- **Subtle visual cue** on state: marker dims (opacity/color change) when paused or stopped
- Drone marker is **visible at the start waypoint** when stopped (not hidden)

#### Simulation controls
- Controls live in a **bottom bar** below the map
- Bottom bar contains: draw mode toggle, play/pause/stop buttons, speed input, clear button
- Cruise speed is **adjustable in the bottom bar** at runtime (not config-only)
- Bottom bar is **clean and minimal** — no status text or telemetry readout in this phase
- Draw mode toggle placement in bottom bar vs map corner: **Claude's discretion**

#### Route & waypoint display
- Waypoints displayed as **numbered circles** (1, 2, 3...) showing sequence order
- Route polyline and waypoint markers remain **visible during playback** — not hidden
- Polyline is a **single uniform color** throughout playback (no flown-vs-remaining split)
- Polyline style: **bright accent color** (e.g., orange or green) for high contrast against map tiles

### Claude's Discretion
- Draw mode toggle placement: bottom bar or map corner — whichever is cleaner UX
- Exact drone SVG icon design
- Specific accent color for polyline (orange vs green vs other)
- Exact opacity/color values for paused/stopped drone state visual cue
- Leaflet plugin choices for drag-to-move waypoints

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SIM-01 | Drone follows the drawn waypoint route with smooth motion using a first-order lag heading model at a configurable cruise speed | First-order lag formula `heading += alpha * (target - heading)` per tick; bearing calculation via `math.atan2`; segment-by-segment waypoint traversal in Python asyncio loop |
| SIM-02 | Drone telemetry includes Gaussian noise on position, heading, and speed to simulate realistic sensor imperfection | `random.gauss(mu, sigma)` from Python stdlib — no numpy required; applied per tick before sending via WebSocket |
| SIM-03 | Drone starts at the first waypoint of the drawn route when the simulation is played | Sim state machine resets to waypoints[0] on Play command; drone marker visible at start when stopped |
| UI-01 | User can draw a route on an interactive map by placing waypoints (polyline) in the browser | Leaflet 1.9.4 + leaflet-geoman-free 2.19.0; draw mode enabled via `map.pm.enableDraw("Line")`; `pm:create` event provides the finished polyline layer; waypoints extracted from layer latlngs |
| UI-02 | Drone position is shown as an animated marker on the map that updates in real time during simulation | `L.divIcon` with inline SVG drone icon; `marker.setLatLng()` + CSS `transform: rotate()` on each WebSocket message; `map.panTo()` for continuous centering |
| UI-03 | User can play, pause, and stop the simulation from the web UI | Bottom bar with Play/Pause/Stop buttons; commands sent to Python sim via WebSocket JSON messages; server manages sim state machine |
</phase_requirements>

---

## Summary

Phase 2 adds two major systems on top of the Phase 1 scaffold: a Python server-side simulation engine and a browser-side Leaflet interactive map UI. The simulation runs as an `asyncio` loop in the FastAPI server and communicates with the browser over a WebSocket — the browser sends control commands (play/pause/stop/speed/waypoints) and receives telemetry updates (lat, lng, heading, state). This architecture is deliberate: locating the simulation in Python means Phase 3 can add zenoh publishing to the existing loop without restructuring anything.

The browser UI is a single enhanced `static/index.html` — no build step, no npm. Leaflet 1.9.4 handles the interactive map, and `@geoman-io/leaflet-geoman-free` 2.19.0 (CDN) provides the draw-mode and vertex-drag-edit capabilities locked in the user decisions. Waypoint markers are rendered as numbered `L.divIcon` circles (CSS + inline HTML). The drone marker is a `L.divIcon` with an inline SVG quad-rotor shape whose CSS `transform: rotate()` is updated each tick to show heading. No additional JavaScript libraries are needed.

The simulation engine is pure Python stdlib: `math` for bearing calculations, `random.gauss()` for Gaussian noise, and `asyncio.sleep()` for the tick loop. No numpy is needed. The first-order lag for heading uses the standard discrete-time formula: `heading += alpha * (target_bearing - heading)` per tick where `alpha = dt / (tau + dt)`. A state machine with three states (STOPPED, PLAYING, PAUSED) governs what the loop does each tick and determines which UI controls are enabled.

**Primary recommendation:** Run the simulation server-side in Python asyncio, send telemetry to the browser via FastAPI WebSocket at ~20 Hz, and keep all JavaScript purely for rendering — zero simulation logic in the browser.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Leaflet | 1.9.4 | Interactive map in browser | Stable LTS, no build step required, CDN available with integrity hashes |
| @geoman-io/leaflet-geoman-free | 2.19.0 | Draw mode + vertex drag edit | Active maintained replacement for unmaintained Leaflet.draw; supports line draw, vertex drag, vertex delete via right-click |
| FastAPI WebSocket | (already in stack) | Bidirectional browser ↔ server communication | Built into FastAPI/Starlette; `send_json` / `receive_json` avoid serialization boilerplate |
| Python `math` | stdlib | Bearing calculation between lat/lng waypoints | `math.atan2`, `math.sin`, `math.cos`, `math.degrees` — no extra dep |
| Python `random` | stdlib | Gaussian noise generation | `random.gauss(mu, sigma)` — no numpy needed |
| Python `asyncio` | stdlib | Simulation tick loop at configurable Hz | `asyncio.sleep(dt)` inside WebSocket handler; cooperatively yields to other coroutines |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| OpenStreetMap tiles | (free, no key) | Default map tile layer | `L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {...})` |
| Python `dataclasses` | stdlib | SimState and TelemetryFrame value objects | Cleaner than dicts for simulation state |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| leaflet-geoman-free | Leaflet.draw | Leaflet.draw is unmaintained (last commit 2017); geoman is the active community replacement. Use geoman. |
| leaflet-geoman-free | Custom click handler for waypoints | Would need to hand-roll drag-to-reposition, right-click-to-delete, snap, etc. Geoman provides all of this. Use geoman. |
| Server-side Python simulation | Browser-side JavaScript simulation | JS-only sim would need to be duplicated or restructured in Phase 3 when zenoh publishing is added. Keep sim in Python. |
| `random.gauss()` | `numpy.random.normal()` | numpy is not in the project deps; `random.gauss()` is stdlib and sufficient for scalar noise. Do not add numpy. |
| `asyncio.sleep()` loop | `threading.Timer` or `schedule` | Asyncio loop in the WebSocket handler cooperates naturally with FastAPI's event loop. No extra thread needed. |

### Installation

No new Python dependencies are needed — all simulation code uses stdlib (`math`, `random`, `asyncio`, `dataclasses`). WebSocket support is already in FastAPI/Starlette.

For the browser, libraries are loaded from CDN in `static/index.html`:

```html
<!-- Leaflet 1.9.4 -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>

<!-- Leaflet-Geoman 2.19.0 -->
<link rel="stylesheet" href="https://unpkg.com/@geoman-io/leaflet-geoman-free@2.19.0/dist/leaflet-geoman.css"/>
<script src="https://unpkg.com/@geoman-io/leaflet-geoman-free@2.19.0/dist/leaflet-geoman.js"></script>
```

---

## Architecture Patterns

### Recommended Project Structure

```
ghost_drone/
├── __main__.py          # (Phase 1 — unchanged)
├── config.py            # (Phase 1 — unchanged)
├── server.py            # Add WebSocket route ABOVE StaticFiles mount
├── startup.py           # (Phase 1 — unchanged)
├── simulation/
│   ├── __init__.py
│   ├── engine.py        # SimEngine: state machine, tick(), bearing calc, noise
│   └── models.py        # SimState dataclass, TelemetryFrame dataclass
└── zenoh_bridge/
    └── publisher.py     # (Phase 1 scaffold — unused in Phase 2)
static/
└── index.html           # Replace placeholder; all UI in one file
tests/
├── test_keelson_roundtrip.py   # (Phase 1 — unchanged)
├── test_sim_engine.py          # New: unit tests for engine.py
└── test_sim_noise.py           # New: statistical test for Gaussian noise
```

### Pattern 1: FastAPI WebSocket Endpoint for Simulation Control

**What:** The WebSocket at `/ws` is the single bidirectional channel. The browser sends JSON commands; the server runs the sim loop and sends JSON telemetry back. The loop runs inside the WebSocket handler using `asyncio`.

**When to use:** All sim ↔ browser communication goes through this endpoint.

```python
# ghost_drone/server.py
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from ghost_drone.simulation.engine import SimEngine

STATIC_DIR = Path(__file__).parent.parent / "static"

app = FastAPI(title="ghost-drone")

# WebSocket MUST be declared BEFORE the StaticFiles catch-all mount
@app.websocket("/ws")
async def sim_websocket(websocket: WebSocket):
    await websocket.accept()
    engine = SimEngine()
    try:
        async for command in engine.run(websocket):
            pass  # engine.run() drives both receive and send
    except WebSocketDisconnect:
        engine.stop()

# StaticFiles mount LAST — must not shadow /ws
app.mount("/", StaticFiles(directory=STATIC_DIR, html=True), name="static")
```

### Pattern 2: Simulation Engine State Machine

**What:** `SimEngine` owns the simulation state and implements the tick loop as an async generator or coroutine. It receives commands from the WebSocket and sends telemetry at a fixed tick rate.

**State machine:**
- `STOPPED`: drone at waypoints[0], editing unlocked
- `PLAYING`: sim loop running, drone advancing, editing locked
- `PAUSED`: drone frozen in place, editing locked

**Transitions:**
- STOPPED + Play → PLAYING (requires ≥2 waypoints)
- PLAYING + Pause → PAUSED
- PAUSED + Play → PLAYING (resume from current position)
- PLAYING or PAUSED + Stop → STOPPED (drone returns to waypoints[0])

```python
# ghost_drone/simulation/engine.py
import asyncio
import math
import random
from dataclasses import dataclass, field
from enum import Enum
from typing import Optional
from fastapi import WebSocket

TICK_HZ = 20          # simulation ticks per second
TICK_DT = 1.0 / TICK_HZ  # seconds per tick
HEADING_TAU = 2.0     # time constant for first-order heading lag (seconds)
ALPHA = TICK_DT / (HEADING_TAU + TICK_DT)  # discrete filter coefficient

# Noise sigmas (applied per tick to noisy telemetry)
POS_NOISE_M   = 0.5   # metres — converted to degrees below
HEADING_NOISE = 1.0   # degrees
SPEED_NOISE   = 0.05  # m/s

class SimState(Enum):
    STOPPED = "stopped"
    PLAYING = "playing"
    PAUSED  = "paused"

@dataclass
class DroneState:
    lat: float = 0.0
    lng: float = 0.0
    heading: float = 0.0      # current smoothed heading (degrees, 0=N)
    speed: float = 0.0        # cruise speed m/s
    waypoints: list = field(default_factory=list)
    wp_index: int = 0         # current target waypoint index
    seg_progress: float = 0.0 # metres travelled along current segment


class SimEngine:
    def __init__(self):
        self._state = SimState.STOPPED
        self._drone = DroneState()
        self._stop_event = asyncio.Event()

    async def run(self, websocket: WebSocket):
        """Drive the sim loop. Handles both incoming commands and outgoing telemetry."""
        async def receive_loop():
            async for msg in websocket.iter_json():
                self._handle_command(msg)

        async def tick_loop():
            while True:
                if self._state == SimState.PLAYING:
                    self._tick()
                    await websocket.send_json(self._telemetry())
                await asyncio.sleep(TICK_DT)

        receive_task = asyncio.create_task(receive_loop())
        tick_task    = asyncio.create_task(tick_loop())
        try:
            await asyncio.gather(receive_task, tick_task)
        finally:
            receive_task.cancel()
            tick_task.cancel()

    def _handle_command(self, msg: dict):
        cmd = msg.get("cmd")
        if cmd == "play":
            if len(self._drone.waypoints) >= 2:
                if self._state == SimState.STOPPED:
                    # reset to start
                    self._drone.lat = self._drone.waypoints[0][0]
                    self._drone.lng = self._drone.waypoints[0][1]
                    self._drone.wp_index = 1
                    self._drone.seg_progress = 0.0
                self._state = SimState.PLAYING
        elif cmd == "pause":
            if self._state == SimState.PLAYING:
                self._state = SimState.PAUSED
        elif cmd == "stop":
            self._state = SimState.STOPPED
            self._drone.lat = self._drone.waypoints[0][0]
            self._drone.lng = self._drone.waypoints[0][1]
            self._drone.heading = 0.0
            self._drone.wp_index = 1
            self._drone.seg_progress = 0.0
        elif cmd == "set_waypoints":
            self._drone.waypoints = msg.get("waypoints", [])
        elif cmd == "set_speed":
            self._drone.speed = float(msg.get("speed", 5.0))

    def _tick(self):
        """Advance simulation by one TICK_DT."""
        wp = self._drone.waypoints
        if not wp or self._drone.wp_index >= len(wp):
            self._state = SimState.STOPPED
            return

        target = wp[self._drone.wp_index]
        target_bearing = _bearing(self._drone.lat, self._drone.lng,
                                   target[0], target[1])

        # First-order lag on heading
        diff = _angle_diff(target_bearing, self._drone.heading)
        self._drone.heading += ALPHA * diff
        self._drone.heading %= 360

        # Advance along route
        dist = self._drone.speed * TICK_DT   # metres per tick
        seg_dist = _haversine_m(self._drone.lat, self._drone.lng,
                                 target[0], target[1])
        if dist >= seg_dist:
            # Arrived at waypoint
            self._drone.lat = target[0]
            self._drone.lng = target[1]
            self._drone.wp_index += 1
            self._drone.seg_progress = 0.0
            if self._drone.wp_index >= len(wp):
                self._state = SimState.STOPPED
        else:
            # Move towards target
            frac = dist / seg_dist
            self._drone.lat += frac * (target[0] - self._drone.lat)
            self._drone.lng += frac * (target[1] - self._drone.lng)

    def _telemetry(self) -> dict:
        """Return noisy telemetry snapshot."""
        lat_noise = random.gauss(0, POS_NOISE_M / 111_320)
        lng_noise = random.gauss(0, POS_NOISE_M / (111_320 * abs(math.cos(math.radians(self._drone.lat))) + 1e-9))
        return {
            "type": "telemetry",
            "state": self._state.value,
            "lat": self._drone.lat + lat_noise,
            "lng": self._drone.lng + lng_noise,
            "heading": (self._drone.heading + random.gauss(0, HEADING_NOISE)) % 360,
            "speed": max(0.0, self._drone.speed + random.gauss(0, SPEED_NOISE)),
        }

    def stop(self):
        self._state = SimState.STOPPED


def _bearing(lat1, lng1, lat2, lng2) -> float:
    """True bearing in degrees (0=N, 90=E) from point 1 to point 2."""
    lat1, lng1, lat2, lng2 = map(math.radians, [lat1, lng1, lat2, lng2])
    dlng = lng2 - lng1
    x = math.sin(dlng) * math.cos(lat2)
    y = math.cos(lat1) * math.sin(lat2) - math.sin(lat1) * math.cos(lat2) * math.cos(dlng)
    return (math.degrees(math.atan2(x, y)) + 360) % 360


def _angle_diff(target, current) -> float:
    """Shortest signed angular difference from current to target, in degrees."""
    diff = (target - current + 180) % 360 - 180
    return diff


def _haversine_m(lat1, lng1, lat2, lng2) -> float:
    """Distance in metres between two lat/lng points (Haversine formula)."""
    R = 6_371_000
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    dphi = phi2 - phi1
    dlam = math.radians(lng2 - lng1)
    a = math.sin(dphi/2)**2 + math.cos(phi1) * math.cos(phi2) * math.sin(dlam/2)**2
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
```

### Pattern 3: Leaflet Map + Geoman Draw Mode

**What:** Geoman's `enableDraw("Line")` captures sequential vertex clicks. On `pm:create`, the finished polyline's latlngs are extracted as waypoints and sent to the server. Existing waypoints are replaced, not appended.

**Key events:**
- `pm:create` — user finishes drawing; payload has `e.layer` (the polyline)
- `pm:markerdragend` — vertex repositioned during edit mode

```javascript
// Source: https://geoman.io/docs/leaflet/modes/draw-mode
// Initialize map
const map = L.map('map').setView([57.7, 11.97], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Route polyline (accent color: #ff6b00 — bright orange)
let routeLayer = null;
let waypointMarkers = [];

// Enable draw mode for a line
function startDrawMode() {
  // Remove existing route before drawing new one
  if (routeLayer) { map.removeLayer(routeLayer); routeLayer = null; }
  waypointMarkers.forEach(m => map.removeLayer(m));
  waypointMarkers = [];

  map.pm.enableDraw("Line", { snappable: false });
}

// When drawing completes
map.on("pm:create", (e) => {
  routeLayer = e.layer;
  map.pm.disableDraw();
  const latlngs = routeLayer.getLatLngs();
  renderWaypointMarkers(latlngs);
  sendToServer({ cmd: "set_waypoints", waypoints: latlngs.map(p => [p.lat, p.lng]) });
  updatePlayButtonState();
  // Enable geoman edit mode so vertices are draggable
  routeLayer.pm.enable({ preventMarkerRemoval: false });
});

// Vertex drag — re-sync waypoints with server after drag
routeLayer && routeLayer.on("pm:markerdragend", () => {
  const latlngs = routeLayer.getLatLngs();
  renderWaypointMarkers(latlngs);
  sendToServer({ cmd: "set_waypoints", waypoints: latlngs.map(p => [p.lat, p.lng]) });
});
```

### Pattern 4: Numbered Waypoint Markers (L.divIcon)

**What:** Each waypoint is shown as a numbered circle using `L.divIcon` with inline HTML/CSS. Numbers show sequence order.

```javascript
function makeWaypointIcon(n) {
  return L.divIcon({
    className: '',   // suppress leaflet default white box
    html: `<div style="
      width:24px; height:24px; border-radius:50%;
      background:#ff6b00; color:#fff;
      display:flex; align-items:center; justify-content:center;
      font-size:12px; font-weight:bold; font-family:sans-serif;
      border:2px solid #fff; box-shadow:0 1px 4px rgba(0,0,0,.4);
    ">${n}</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

function renderWaypointMarkers(latlngs) {
  waypointMarkers.forEach(m => map.removeLayer(m));
  waypointMarkers = latlngs.map((latlng, i) =>
    L.marker(latlng, { icon: makeWaypointIcon(i + 1), pmIgnore: true }).addTo(map)
  );
}
```

**Note:** `pmIgnore: true` prevents geoman from treating waypoint number markers as editable layers — they are display-only overlays.

### Pattern 5: Drone SVG Marker with Heading Rotation

**What:** The drone is shown as a top-down SVG quad-rotor shape. Heading is reflected by CSS `transform: rotate()` applied to the icon's container div. Opacity dims to 0.4 when paused or stopped.

```javascript
// Source: Leaflet L.divIcon API — https://leafletjs.com/reference.html
const DRONE_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
  <!-- Body -->
  <circle cx="20" cy="20" r="5" fill="#1a1a2e"/>
  <!-- Arms -->
  <line x1="20" y1="20" x2="6" y2="6"  stroke="#1a1a2e" stroke-width="2.5"/>
  <line x1="20" y1="20" x2="34" y2="6"  stroke="#1a1a2e" stroke-width="2.5"/>
  <line x1="20" y1="20" x2="6" y2="34"  stroke="#1a1a2e" stroke-width="2.5"/>
  <line x1="20" y1="20" x2="34" y2="34" stroke="#1a1a2e" stroke-width="2.5"/>
  <!-- Rotors -->
  <circle cx="6"  cy="6"  r="5" fill="none" stroke="#4a90d9" stroke-width="2"/>
  <circle cx="34" cy="6"  r="5" fill="none" stroke="#4a90d9" stroke-width="2"/>
  <circle cx="6"  cy="34" r="5" fill="none" stroke="#4a90d9" stroke-width="2"/>
  <circle cx="34" cy="34" r="5" fill="none" stroke="#4a90d9" stroke-width="2"/>
  <!-- Heading indicator: small triangle at top (north = 0 deg) -->
  <polygon points="20,2 17,10 23,10" fill="#ff6b00"/>
</svg>`;

const droneIcon = L.divIcon({
  className: '',
  html: `<div id="drone-icon" style="transition:opacity 0.3s">${DRONE_SVG}</div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const droneMarker = L.marker([0, 0], { icon: droneIcon, zIndexOffset: 1000 }).addTo(map);

function updateDroneMarker(lat, lng, heading, state) {
  droneMarker.setLatLng([lat, lng]);
  const el = droneMarker.getElement();
  if (el) {
    el.style.transform += ` rotate(${heading}deg)`;  // Note: combine with Leaflet's translate
    el.style.opacity = (state === 'playing') ? '1.0' : '0.4';
  }
  map.panTo([lat, lng], { animate: true, duration: TICK_DT });
}
```

**Important:** Leaflet applies its own `transform: translate(...)` to position the marker element. The heading rotation must be applied to the *inner* div (the icon container), not the outer Leaflet wrapper element. Get the inner div via `droneMarker.getElement().querySelector('#drone-icon')` or set `transform-origin: center` and rotate the wrapping element carefully to avoid fighting Leaflet's positioning transforms.

### Pattern 6: WebSocket Client in Browser

**What:** Plain JavaScript WebSocket. Sends JSON commands to server, receives JSON telemetry and renders updates.

```javascript
// Source: FastAPI WebSocket docs — https://fastapi.tiangolo.com/advanced/websockets/
const ws = new WebSocket(`ws://${location.host}/ws`);

ws.onopen = () => console.log("Connected to ghost-drone sim");

ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  if (msg.type === "telemetry") {
    updateDroneMarker(msg.lat, msg.lng, msg.heading, msg.state);
    updateControlState(msg.state);
  }
};

ws.onclose = () => console.log("WebSocket closed");

function sendToServer(obj) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(obj));
  }
}

// Control buttons
document.getElementById("btn-play").onclick  = () => sendToServer({ cmd: "play" });
document.getElementById("btn-pause").onclick = () => sendToServer({ cmd: "pause" });
document.getElementById("btn-stop").onclick  = () => sendToServer({ cmd: "stop" });
document.getElementById("btn-clear").onclick = () => {
  if (routeLayer) { map.removeLayer(routeLayer); routeLayer = null; }
  waypointMarkers.forEach(m => map.removeLayer(m));
  waypointMarkers = [];
  sendToServer({ cmd: "set_waypoints", waypoints: [] });
};
document.getElementById("speed-input").oninput = (e) => {
  sendToServer({ cmd: "set_speed", speed: parseFloat(e.target.value) });
};
```

### Anti-Patterns to Avoid

- **Running the simulation loop in the browser:** The sim must be in Python so Phase 3 can add zenoh publishing to the same loop. Do not duplicate the sim in JavaScript.
- **Declaring the `/ws` WebSocket route after the StaticFiles mount:** StaticFiles mounted at `/` is a catch-all; it would intercept `/ws` if declared after. Declare `/ws` first.
- **Using `asyncio.sleep(0)` with no real sleep:** This starves the event loop. Use `asyncio.sleep(TICK_DT)` (at least ~0.05s / 20 Hz) to yield cooperatively.
- **Directly modifying Leaflet's outer wrapper element transform:** Leaflet uses `transform: translate(X, Y)` on the marker element for positioning. Rotating this element causes the marker to orbit around the map origin. Apply `rotate()` only to the inner div/SVG element.
- **Creating new `L.marker` instances each tick:** This is expensive. Create the drone marker once; call `marker.setLatLng()` each tick.
- **Attaching `pm:markerdragend` before `pm:create` fires:** The `routeLayer` doesn't exist until after the user finishes drawing. Attach the drag event listener inside the `pm:create` handler.
- **Forgetting `pmIgnore: true` on waypoint number markers:** Geoman will treat them as editable layers, adding confusing edit handles to the numbered circles.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Draw-mode waypoint placement | Custom `map.on("click")` handler | `map.pm.enableDraw("Line")` | Hand-rolled click placement requires custom undo, snap-to-vertex, Escape key handling, and finish-detection logic — geoman provides all of this |
| Vertex drag-to-reposition | Custom `L.Marker` draggable + polyline re-sync | `routeLayer.pm.enable()` | Geoman handles vertex marker positioning, drag snapping, and polyline re-render synchronously |
| Bearing calculation | Euclidean atan2 on lat/lng differences | `_bearing()` using spherical formula | Simple 2D atan2 is wrong for geographic coordinates; heading error grows with distance and latitude |
| Shortest-angle heading interpolation | `new_heading = target` (snap) | `_angle_diff()` + first-order filter | Without angle wrapping, heading at 359° → 1° would rotate 358° the wrong way |
| Distance along route | Pythagorean on lat/lng differences | `_haversine_m()` | lat/lng degree distances vary with latitude — 1° of longitude ≠ 111km at all latitudes |

**Key insight:** Geographic math has non-obvious edge cases (angle wrapping, sphere vs. plane). Implement the helper functions correctly once in `engine.py` and test them in isolation.

---

## Common Pitfalls

### Pitfall 1: Heading Rotation Applied to Wrong DOM Element

**What goes wrong:** Drone marker spins around a distant origin point or disappears off the map instead of rotating in place.

**Why it happens:** Leaflet positions markers by applying `transform: translate(X, Y)` to the marker's DOM element. If you add `rotate(Hdeg)` to the same element's `style.transform`, CSS evaluates transforms left-to-right: `translate(X, Y) rotate(H)` — the rotation happens around the element's current position. But if Leaflet later sets `transform` again (on map pan), it overwrites your rotation. The safe approach is to rotate only the *inner* SVG/div element, which Leaflet never touches.

**How to avoid:** Structure the icon HTML as two nested elements: outer div (Leaflet moves this) + inner div (you rotate this). Apply rotation only to the inner div.

**Warning signs:** Marker visibly jumps to a wrong position when heading changes, or rotation resets to 0 on every pan event.

```javascript
// Safe pattern: rotate inner div only
const inner = droneMarker.getElement()?.querySelector('.drone-inner');
if (inner) inner.style.transform = `rotate(${heading}deg)`;
```

### Pitfall 2: asyncio WebSocket Loop Blocking on Receive

**What goes wrong:** The sim loop stops sending telemetry updates while waiting for the next browser command.

**Why it happens:** `await websocket.receive_json()` blocks until the browser sends a message. If you put receive and tick in the same coroutine linearly, the tick only runs when the user clicks a button.

**How to avoid:** Use two separate `asyncio.create_task()` coroutines inside the WebSocket handler — one for receiving commands, one for the tick loop — and `asyncio.gather()` them. Cancel both tasks on disconnect.

**Warning signs:** Drone animation freezes after the browser sends no commands for one tick interval.

### Pitfall 3: WebSocket Route Shadowed by StaticFiles Mount

**What goes wrong:** `GET /ws` (WebSocket upgrade) returns a 404 or serves `index.html` instead of upgrading.

**Why it happens:** `StaticFiles(directory=..., html=True)` mounted at `/` intercepts all paths including `/ws` if it is declared after the mount.

**How to avoid:** Always declare `@app.websocket("/ws")` (and any future API routes) BEFORE `app.mount("/", StaticFiles(...))`. There is a comment in the existing `server.py` to this effect — respect it.

**Warning signs:** Browser WebSocket connects briefly then immediately closes; server logs show no websocket handler called.

### Pitfall 4: Geoman Edit Mode Active During Playback

**What goes wrong:** User drags a waypoint vertex while the drone is mid-flight, causing the route to update and the sim to skip or jump.

**Why it happens:** Geoman edit mode remains active unless explicitly disabled. The locked UI decisions require editing to be disabled during PLAYING and PAUSED states.

**How to avoid:** Call `routeLayer.pm.disable()` when transitioning to PLAYING or PAUSED state. Call `routeLayer.pm.enable()` only when transitioning back to STOPPED.

**Warning signs:** Edit vertex handles (small square markers) are visible on the route during playback.

### Pitfall 5: Angle Wrapping in Heading Lag

**What goes wrong:** Heading rotates the long way around (e.g., from 350° to 10° goes through 180° backward instead of forward 20°).

**Why it happens:** Simple `heading += alpha * (target - heading)` fails when the angle difference crosses the 0/360 boundary.

**How to avoid:** Use `_angle_diff(target, current)` to compute the shortest signed difference, then apply: `heading += alpha * diff`. The `_angle_diff` function normalizes the result to (-180, +180].

**Warning signs:** Drone marker spins wildly in the wrong direction when crossing north (0°/360°).

### Pitfall 6: Simulation Continues After WebSocket Disconnect

**What goes wrong:** Python asyncio tasks keep running (consuming CPU) after the browser tab is closed or refreshed.

**Why it happens:** `asyncio.gather()` keeps both tasks alive indefinitely. When the WebSocket disconnects, `WebSocketDisconnect` is raised but only in the receive coroutine — the tick coroutine keeps looping.

**How to avoid:** In the `finally` block of `engine.run()`, cancel both tasks explicitly. The `WebSocketDisconnect` exception propagates through `iter_json()`; use it as the signal to clean up.

**Warning signs:** CPU stays at a non-zero baseline after closing the browser tab; server process memory grows over time.

---

## Code Examples

Verified patterns from official sources:

### First-Order Lag Heading Filter (discrete time)

```python
# Source: standard signal processing formula — alpha = dt / (tau + dt)
# tau is the time constant in seconds (higher tau = slower response)
TICK_DT = 0.05       # 20 Hz
HEADING_TAU = 2.0    # 2 second heading lag
ALPHA = TICK_DT / (HEADING_TAU + TICK_DT)  # ~0.024

def _angle_diff(target: float, current: float) -> float:
    """Shortest signed difference, normalised to (-180, +180]."""
    return (target - current + 180) % 360 - 180

# Per tick:
diff = _angle_diff(target_bearing, current_heading)
current_heading = (current_heading + ALPHA * diff) % 360
```

### Gaussian Noise (stdlib — no numpy)

```python
# Source: https://docs.python.org/3/library/random.html#random.gauss
import random

# Position noise: convert metres to degrees
LAT_DEG_PER_M = 1 / 111_320
lat_noisy = true_lat + random.gauss(0, 0.5 * LAT_DEG_PER_M)   # 0.5m sigma
lng_noisy = true_lng + random.gauss(0, 0.5 * LAT_DEG_PER_M)   # simplified; exact uses cos(lat)

# Heading noise
heading_noisy = (true_heading + random.gauss(0, 1.0)) % 360    # 1 deg sigma

# Speed noise
speed_noisy = max(0.0, true_speed + random.gauss(0, 0.05))     # 0.05 m/s sigma
```

### Bearing Between Two Lat/Lng Points (stdlib math)

```python
# Source: https://mapscaping.com/how-to-calculate-bearing-between-two-coordinates/
import math

def bearing(lat1: float, lng1: float, lat2: float, lng2: float) -> float:
    """True bearing from (lat1,lng1) to (lat2,lng2), degrees 0=N, 90=E."""
    lat1, lng1, lat2, lng2 = map(math.radians, [lat1, lng1, lat2, lng2])
    dlng = lng2 - lng1
    x = math.sin(dlng) * math.cos(lat2)
    y = math.cos(lat1)*math.sin(lat2) - math.sin(lat1)*math.cos(lat2)*math.cos(dlng)
    return (math.degrees(math.atan2(x, y)) + 360) % 360
```

### Leaflet Map Initialization with OpenStreetMap Tiles

```javascript
// Source: https://leafletjs.com/examples/quick-start/
const map = L.map('map').setView([57.7, 11.97], 13);  // Gothenburg default
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 19,
}).addTo(map);
```

### Geoman Draw Line Mode

```javascript
// Source: https://geoman.io/docs/leaflet/modes/draw-mode
map.pm.enableDraw("Line", { snappable: false });

map.on("pm:create", (e) => {
  const layer = e.layer;
  map.pm.disableDraw();
  // e.layer.getLatLngs() returns array of L.LatLng objects
  const waypoints = layer.getLatLngs().map(p => [p.lat, p.lng]);
  console.log("Route waypoints:", waypoints);
});
```

### Geoman Vertex Edit Mode (drag waypoints)

```javascript
// Source: https://geoman.io/docs/leaflet/modes/edit-mode
// Enable after pm:create fires
routeLayer.pm.enable({ preventMarkerRemoval: false });

routeLayer.on("pm:markerdragend", () => {
  const updatedWaypoints = routeLayer.getLatLngs().map(p => [p.lat, p.lng]);
  sendToServer({ cmd: "set_waypoints", waypoints: updatedWaypoints });
  renderWaypointMarkers(routeLayer.getLatLngs());
});
```

### FastAPI WebSocket with JSON

```python
# Source: https://fastapi.tiangolo.com/advanced/websockets/
from fastapi import FastAPI, WebSocket, WebSocketDisconnect

app = FastAPI()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_json()
            await websocket.send_json({"echo": data})
    except WebSocketDisconnect:
        print("Client disconnected")
```

### Drone Heading Rotation (inner div pattern)

```javascript
// Apply heading rotation to inner element only — never to the Leaflet wrapper
function setDroneHeading(heading) {
  const inner = droneMarker.getElement()?.querySelector('.drone-inner');
  if (inner) {
    inner.style.transformOrigin = 'center';
    inner.style.transform = `rotate(${heading}deg)`;
  }
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Leaflet.draw | @geoman-io/leaflet-geoman-free | ~2018 (geoman) | Leaflet.draw is unmaintained (last meaningful commit 2017); geoman is the maintained replacement |
| `npm install` + webpack | CDN links in HTML | Always available | No build step needed for a single-file HTML UI; Leaflet + geoman work fine from unpkg |
| `setInterval()` for game loop | `requestAnimationFrame` in browser | ~2012 | rAF is better for pure browser rendering; but here the "loop" is server-side Python asyncio — this is not applicable |
| zenoh-python async | zenoh-python sync-only | v1.0 (2024) | Already handled in Phase 1 via daemon thread pattern; Phase 2 does not publish to zenoh |

**Deprecated/outdated:**
- `Leaflet.draw` (npm: `leaflet-draw`): Do not use. Package is archived/unmaintained. Use `@geoman-io/leaflet-geoman-free`.
- `L.Marker` with `draggable: true` for vertex editing: Setting individual markers as draggable requires hand-rolling polyline sync. Use geoman edit mode instead.

---

## Open Questions

1. **Haversine vs. linear interpolation accuracy for short routes**
   - What we know: For routes under ~10 km, linear interpolation of lat/lng is reasonably accurate (error < 0.1%). The Haversine formula is needed for distance calculation, but moving along a segment can use linear fraction for typical flight sim routes.
   - What's unclear: Whether the phase requires geodesic accuracy or whether simple linear is acceptable.
   - Recommendation: Use Haversine for distance calculation (segment length check), linear interpolation for position update — acceptable at drone-route scales.

2. **Geoman vertex deletion behavior**
   - What we know: `preventMarkerRemoval: false` allows right-click on a vertex to delete it. After deletion, the polyline updates automatically.
   - What's unclear: Whether deleting a vertex sends any event we need to hook to sync waypoints to the server and re-render numbered markers.
   - Recommendation: Listen on `routeLayer` for `pm:edit` (fires after any geoman edit including deletion) or check if `pm:markerdragend` also fires on deletion. Implement a `pm:edit` handler as a catch-all to re-sync waypoints after any geoman modification.

3. **Single WebSocket connection vs. reconnect strategy**
   - What we know: The browser creates one WebSocket on page load. FastAPI handles it in a single coroutine pair.
   - What's unclear: What happens if the user refreshes mid-simulation — does the server clean up correctly?
   - Recommendation: The `WebSocketDisconnect` exception path in `engine.run()` cancels both tasks and resets state. This is sufficient for Phase 2. A reconnect protocol is deferred.

4. **Default map center coordinates**
   - What we know: The map needs a default center to show on load. The project has no configured geographic area.
   - What's unclear: Is a specific default requested?
   - Recommendation: Default to Gothenburg harbor (57.7°N, 11.97°E) as a relevant maritime area, zoom level 13. This is Claude's discretion.

---

## Sources

### Primary (HIGH confidence)
- Leaflet 1.9.4 official download page — https://leafletjs.com/download.html — verified CDN URLs and integrity hashes
- Leaflet API reference — https://leafletjs.com/reference.html — `L.divIcon`, `marker.setLatLng()`, `map.panTo()`, `L.polyline`, `polyline.setLatLngs()`
- Geoman docs: Draw Mode — https://geoman.io/docs/leaflet/modes/draw-mode — `map.pm.enableDraw("Line")`, `map.pm.disableDraw()`, `pm:create` event, `pm:vertexadded` event
- Geoman docs: Edit Mode — https://geoman.io/docs/leaflet/modes/edit-mode — `layer.pm.enable()`, `layer.pm.disable()`, `pm:markerdragend` event
- Geoman changelog — https://geoman.io/docs/leaflet/changelog/free — confirmed current version is 2.19.0 (released 2025-12-12)
- FastAPI WebSocket docs — https://fastapi.tiangolo.com/advanced/websockets/ — `@app.websocket()`, `websocket.accept()`, `websocket.send_json()`, `WebSocketDisconnect`
- Python `random.gauss` docs — https://docs.python.org/3/library/random.html — confirmed stdlib, no numpy needed
- Bearing formula — https://mapscaping.com/how-to-calculate-bearing-between-two-coordinates/ — `atan2` spherical bearing formula

### Secondary (MEDIUM confidence)
- Geoman getting started — https://geoman.io/docs/leaflet/getting-started/free-version — CDN URLs, `pm:create` event pattern
- Geoman UNPKG files listing — https://app.unpkg.com/@geoman-io/leaflet-geoman-free@2.19.0/files/dist — confirmed filename `leaflet-geoman.min.js` and `leaflet-geoman.css`
- First-order lag discrete formula — https://controlsystemsacademy.com/0020/0020.html — `alpha = dt/(tau+dt)`, `y += alpha*(x-y)` pattern
- FastAPI WebSocket + asyncio background task pattern — multiple community guides consistent with official docs pattern

### Tertiary (LOW confidence — flag for validation)
- Geoman `pm:edit` event for catch-all edit sync — referenced in geoman docs but exact payload shape not confirmed; validate at implementation time
- Leaflet marker rotation inner-div pattern — derived from understanding of Leaflet DOM structure; should be verified against browser dev tools at implementation time

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — Leaflet 1.9.4 and geoman 2.19.0 versions verified; CDN URLs fetched from official sources; no new Python deps needed (confirmed stdlib sufficiency)
- Simulation algorithm: HIGH — first-order lag formula and Haversine are well-established; `random.gauss` is stdlib
- Leaflet API patterns: HIGH — verified against official Leaflet reference docs
- Geoman API patterns: HIGH — verified against official geoman docs
- WebSocket architecture: HIGH — verified against FastAPI official docs
- Drone rotation DOM pattern: MEDIUM — derived from Leaflet DOM structure understanding; needs validation at implementation
- Geoman `pm:edit` event for deletion sync: LOW — not directly verified; needs implementation-time check

**Research date:** 2026-02-19
**Valid until:** 2026-03-21 (30 days; geoman and Leaflet are stable; re-verify if keelson or zenoh deps change)
