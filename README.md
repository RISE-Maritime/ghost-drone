# ghost-drone

Simulated drone companion computer in a Docker container. Runs an [ArduPilot SITL](https://ardupilot.org/dev/docs/sitl-simulator-software-in-the-loop.html) flight controller and bridges its telemetry into a [Zenoh](https://zenoh.io) network via [Keelson](https://github.com/RISE-Maritime/keelson) connectors.

## Prerequisites

- Docker with Compose
- A Zenoh router reachable from the host (default: `tcp/localhost:7447`)

## Quick start

```bash
# Build the image (first build compiles .proto files and downloads SITL binaries — takes a few minutes)
docker compose build

# Run a motorboat simulation
VEHICLE_TYPE=motorboat docker compose up
```

The container connects to the Zenoh router on the host and starts publishing telemetry under the configured realm and entity ID.

## Configuration

All options are set via environment variables — either in a `.env` file or passed directly.

| Variable | Default | Description |
|---|---|---|
| `VEHICLE_TYPE` | `rover` | Vehicle to simulate (see table below) |
| `ZENOH_CONNECT` | `tcp/localhost:7447` | Zenoh router endpoint |
| `REALM` | `rise` | Keelson realm |
| `ENTITY_ID` | `drone-01` | Keelson entity ID for this drone |
| `SOURCE_ID` | `sitl` | Keelson source ID |
| `SITL_HOME` | `57.7089,11.9746,0,270` | SITL start position: `lat,lon,alt,heading` |
| `MAVLINK_URL` | `tcp:localhost:5760` | pymavlink connection string to SITL |

### Supported vehicle types

| `VEHICLE_TYPE` | ArduPilot binary | SITL frame |
|---|---|---|
| `rover` | ardurover | rover |
| `motorboat` / `boat` | ardurover | motorboat |
| `sailboat` | ardurover | sailboat |
| `copter` | arducopter | + (quadcopter) |
| `plane` | arduplane | plane |
| `sub` | ardusub | vectored |

### Example: run two drones at once

```bash
VEHICLE_TYPE=motorboat ENTITY_ID=boat-01 MAVLINK_URL=tcp:localhost:5760 docker compose up -d
VEHICLE_TYPE=copter    ENTITY_ID=uav-01  MAVLINK_URL=tcp:localhost:5770 docker compose up -d
```

## Optional connectors

Two connectors start automatically when their config file is present.

### keelson-connector-platform

Publishes static platform geometry (hull dimensions, sensor positions).

Create `ghost-drone/config/<VEHICLE_TYPE>/platform.json` — see [`keelson/connectors/platform/example-config.json`](https://github.com/RISE-Maritime/keelson/blob/main/connectors/platform/example-config.json) for the schema.

### keelson-connector-entity-health

Monitors Zenoh publication rates and reports entity health.

Create `ghost-drone/config/<VEHICLE_TYPE>/entity_health.json` — see [`keelson/connectors/entity_health/example-config.json`](https://github.com/RISE-Maritime/keelson/blob/main/connectors/entity_health/example-config.json) for the schema.

## Pinning the Keelson version

The Dockerfile clones Keelson from `main` by default. To pin to a specific release or commit:

```bash
docker compose build --build-arg KEELSON_REF=v0.5.3
```

## Development

This repo includes a VS Code devcontainer. The devcontainer runs with `--network=host` so it shares the host's network stack — the same Zenoh router the drone container connects to is visible from inside the devcontainer at `localhost`.

The devcontainer also mounts the Docker socket, so you can build and run the `ghost-drone` container from the terminal inside VS Code:

```bash
docker compose build
docker compose up
```
