# ghost-drone

Simulated surface water drone that follows a user-drawn route on a browser-based map and publishes keelson-compatible telemetry to a zenoh network. Used for testing keelson consumers and stakeholder demos without physical hardware.

## Prerequisites

- Python 3.11+
- [uv](https://docs.astral.sh/uv/)
- Node.js 18+ (for building the frontend)
- A running zenoh router (default: `tcp/127.0.0.1:7447`)
- [zenoh-bridge-remote-api](https://github.com/eclipse-zenoh/zenoh-plugin-webserver) running alongside zenohd (provides browser-to-zenoh WebSocket bridge, default: `ws://localhost:10001`)

## Setup

```bash
# Install Python dependencies
uv sync

# Install frontend dependencies and build
cd frontend && npm install && npm run build && cd ..

# Copy and edit the config file
cp ghost_drone.toml.example ghost_drone.toml
```

Edit `ghost_drone.toml`:

```toml
zenoh_endpoint = "tcp/host.docker.internal:7447"  # your zenoh router address
keelson_realm = "ghost-drone"           # realm name
entity_id = "sim001"                    # unique drone identity
```

## Run

1. Start zenohd and zenoh-bridge-remote-api (default port 10001)
2. Start the simulator:

```bash
# Terminal 1: Start the simulator
uv run ghost-drone

# Terminal 2: Serve the frontend
cd frontend && npm run build
cd ../static && python3 -m http.server 8000
```

The simulator connects to zenoh and publishes telemetry — it has no built-in web server. Serve the frontend separately using any static file server.

The frontend connects to the zenoh-bridge-remote-api at `ws://localhost:10001` by default. Override via URL parameters:

```
http://localhost:8000?remote_api=ws://otherhost:10001&realm=my-realm&entity_id=drone42
```

## Architecture

All frontend-backend communication uses zenoh via the zenoh-bridge-remote-api:

- **Pub/Sub** for streaming data: sim frames (20 Hz), play/pause/stop/set_speed controls
- **Queryable/Get** for request-response: load_route (with waypoint validation), settings (GET returns current values, body updates them)
- **Keelson subjects** published when PLAYING: `location_fix`, `heading_true_north_deg`, `speed_over_ground_knots`, `roll_deg`, `pitch_deg`

## Development

```bash
# Python
uv sync --all-extras
uv run pytest

# Frontend (dev server with hot reload)
cd frontend && npm run dev
```

### Frontend build

The frontend is a Vite+TypeScript project in `frontend/` that builds to `static/`. After making changes:

```bash
cd frontend && npm run build
```
