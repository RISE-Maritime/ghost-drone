# CLAUDE.md

## What is ghost-drone

Simulated surface water drone that publishes keelson-compatible telemetry to a zenoh network. Used for testing keelson consumers and stakeholder demos without physical hardware. All frontend-backend communication goes through zenoh (no direct HTTP API).

## Tech Stack

- **Backend**: Python 3.11+, managed with `uv` and `hatchling`
- **Frontend**: TypeScript + Vite
- **Messaging**: zenoh pub/sub and queryable/get via zenoh-bridge-remote-api (WebSocket)
- **Serialization**: Protobuf (keelson subjects)

## Layout

- `ghost_drone/` — Python backend
- `frontend/` — Vite + TypeScript frontend (builds to `static/`)

## Commands

```bash
# Install
uv sync
cd frontend && npm install

# Run backend
uv run ghost-drone

# Frontend dev server (hot reload)
cd frontend && npm run dev

# Build frontend to static/
cd frontend && npm run build

# Tests
uv sync --all-extras
uv run pytest
```

## Prerequisites

- Python 3.11+, uv, Node.js 18+
- Running zenohd router (default: `tcp/127.0.0.1:7447`)
- zenoh-bridge-remote-api (default: `ws://localhost:10001`)
- Config: copy `ghost_drone.toml.example` to `ghost_drone.toml` and edit
