# ghost-drone

Simulated drone companion computer in a Docker container. Runs an [ArduPilot SITL](https://ardupilot.org/dev/docs/sitl-simulator-software-in-the-loop.html) flight controller and bridges its telemetry into a [Zenoh](https://zenoh.io) network via [Keelson](https://github.com/RISE-Maritime/keelson) connectors.

There is no built-in UI — [Crowsnest](https://github.com/RISE-Maritime/crowsnest-dev) is the frontend. It ships a ready-made **"Ghost Drone (SITL)"** platform that matches this container's defaults, so the drone appears as a selectable vessel with live telemetry and working MAVLink controls. See [Viewing the drone](#viewing-the-drone).

## Prerequisites

- Docker with Compose
- A Zenoh router reachable from the host (default: `tcp/localhost:7447`)

## Quick start

```bash
# Build the image (first build compiles .proto files and downloads SITL binaries — takes a few minutes)
docker compose build

# Run with defaults (motorboat, entity drone-sim-01)
docker compose up
```

The container connects to the Zenoh router on the host and starts publishing telemetry under the configured realm and entity ID.

## Viewing the drone

[Crowsnest](https://github.com/RISE-Maritime/crowsnest-dev) is the frontend for this container. Its platform registry already contains a `drone_sim_01` entry — **"Ghost Drone (SITL)"** — wired to 39 data streams and 20 RPC procedures. The defaults in this repo (`ENTITY_ID=drone-sim-01`, `SOURCE_ID=mavlink`) are chosen to match it, so no extra flags are needed.

### Startup order

Order matters — the drone cannot publish before the router is listening.

1. **Zenoh router**, from the [keelson-router](https://github.com/RISE-Maritime/keelson-router) repo:

   ```bash
   docker compose -f docker-compose.keelson-router-rise.yml up -d
   ```

   Exposes `7447` (TCP — what this container connects to), `8000` (REST), and `10000` (`remote_api` websocket — what the browser connects to).

2. **The drone**, from this repo:

   ```bash
   docker compose up
   ```

3. **Crowsnest**:

   ```bash
   npm start   # serves on http://localhost:5177
   ```

Then in Crowsnest go to **OS Config → Platforms** and select **"Ghost Drone (SITL)"**.

### If the MAVLink panel is greyed out

Two `localStorage` keys silently override the platform selection, and when they are stale the entire MAVLink panel sits disabled behind its liveness probe **with no error shown**:

- `remote_control_target_override_v1` — entity ID
- `mavlink_connector_target_v1` — source ID

Clear both (or point them at `drone-sim-01` / `mavlink`) and reload.

### Do not set `VITE_ZENOH_BASE_KEYEXP`

It is defined in Crowsnest's `src/config/env.js` but has no importers — setting it does nothing. Its default value (`rise/v0/...`) is also wrong: real keelson keys use a literal `@v0` segment, as in `rise/@v0/drone-sim-01/pubsub/location_fix/mavlink`.

> **Heads-up:** the default router bridges to the shared RISE network. A running ghost-drone puts a fake vessel in front of every other Crowsnest user. Stop it when you are finished.

### Known gaps

Not bugs — just things that do not exist yet, listed so nobody debugs them:

- **Simulation controls are not in the UI.** `sim_control.py` serves `SimulationControl/start|pause|stop` and `VehicleSimulatorControl/set_initial_pose`, but Crowsnest has no client for them. `simulation_status` decodes on the wire (it is in keelson's `subjects.yaml`) yet nothing renders it. Drive start/pause/stop outside the UI.
- **Some conning fields stay blank.** Crowsnest's conning app expects `speed_through_water_knots`, `depth_m`, `rudder_angle_deg`, `engine_rate_rpm` and wind subjects. `mavlink2keelson` publishes none of them.
- **The platform and entity-health connectors always skip.** No `platform.json` or `entity_health.json` exists for any vehicle type, so both are skipped with a `WARN` on every boot. Crowsnest *does* decode `entity_health`, so adding `ghost-drone/config/motorboat/entity_health.json` would light up its health panel — see [Optional connectors](#optional-connectors).

## Configuration

All options are set via environment variables — either in a `.env` file or passed directly.

| Variable | Default | Description |
|---|---|---|
| `VEHICLE_TYPE` | `motorboat` | Vehicle to simulate (see table below) |
| `ZENOH_CONNECT` | `tcp/localhost:7447` | Zenoh router endpoint |
| `REALM` | `rise` | Keelson realm |
| `ENTITY_ID` | `drone-sim-01` | Keelson entity ID — matches Crowsnest's registry |
| `SOURCE_ID` | `mavlink` | Keelson source ID — matches Crowsnest's registry |
| `SITL_HOME` | `57.7089,11.9746,0,270` | SITL start position: `lat,lon,alt,heading` |
| `MAVLINK_URL` | `tcp:localhost:5760` | pymavlink connection string to SITL |
| `TARGET_SYSTEM` | `1` | MAVLink system ID of the autopilot |

Keys are published as `{REALM}/@v0/{ENTITY_ID}/pubsub/{subject}/{SOURCE_ID}`.

### Supported vehicle types

| `VEHICLE_TYPE` | ArduPilot binary | SITL frame |
|---|---|---|
| `motorboat` / `boat` | ardurover | motorboat (default) |
| `rover` | ardurover | rover |
| `sailboat` | ardurover | sailboat |
| `copter` | arducopter | + (quadcopter) |
| `plane` | arduplane | plane |
| `sub` | ardusub | vectored |

### Example: run two drones at once

Changing `ENTITY_ID` means Crowsnest will not find the vessel unless you add a matching platform-registry entry.

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

Monitors Zenoh publication rates and reports entity health. Crowsnest consumes the `entity_health` subject.

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

### Checking telemetry without the UI

Query the router's REST port directly:

```bash
curl -s 'http://localhost:8000/rise/@v0/drone-sim-01/pubsub/**' | head
```
