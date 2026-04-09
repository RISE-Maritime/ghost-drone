# Zenoh Subjects

All frontend–backend communication goes through zenoh. There are no direct HTTP APIs.

## Key expression format

Per-drone keys use a **keelson prefix**:

```
{realm}/@v0/{entity_id}
```

For example: `rise/@v0/drone-1`

Fleet-level keys use the realm prefix without an entity_id:

```
{realm}/@v0
```

## Pub/Sub — Published by backend

These topics are published by the backend tick loop. The 5 telemetry subjects and `entity_health` are protobuf-encoded inside a keelson envelope. `sim_frame` and `manual_setpoint` are plain JSON.

| Key expression | Format | Default rate | Description |
|---|---|---|---|
| `{prefix}/pubsub/location_fix/{source_id}` | Protobuf (LocationFix) | 1 Hz | Lat/lng position (WGS-84) |
| `{prefix}/pubsub/heading_true_north_deg/{source_id}` | Protobuf (TimestampedFloat) | 1 Hz | Heading in degrees [0, 360) |
| `{prefix}/pubsub/speed_over_ground_knots/{source_id}` | Protobuf (TimestampedFloat) | 1 Hz | Speed in knots |
| `{prefix}/pubsub/roll_deg/{source_id}` | Protobuf (TimestampedFloat) | 1 Hz | Roll angle in degrees |
| `{prefix}/pubsub/pitch_deg/{source_id}` | Protobuf (TimestampedFloat) | 1 Hz | Pitch angle in degrees |
| `{prefix}/pubsub/entity_health/system/0` | Protobuf (EntityHealth) | 1 Hz | Health level, subsystems, operation mode, telemetry expectations |
| `{prefix}/pubsub/sim_frame/engine/0` | JSON | 20 Hz | Full simulation state for the main UI |
| `{prefix}/pubsub/manual_setpoint/engine/0` | JSON | 20 Hz | Rudder/engine setpoint (published only in OPERATED mode) |

### Default source IDs

| Subject | Default source_id |
|---|---|
| `location_fix` | `gnss/0` |
| `heading_true_north_deg` | `imu/0` |
| `speed_over_ground_knots` | `imu/0` |
| `roll_deg` | `imu/0` |
| `pitch_deg` | `imu/0` |

Source IDs and publish rates are configurable at runtime via the `settings` queryable.

### Fault effects on telemetry publishing

| Fault type | Effect |
|---|---|
| `drop` | Subject is not published at all |
| `wrong_rate` | Subject is published at 2x the configured rate |
| `nan` | Published values are replaced with NaN |
| `stuck` | Value is frozen at the first reading after injection |

## Pub/Sub — Control commands (frontend → backend)

Fire-and-forget commands. The backend subscribes to these per-drone keys.

| Key expression | Payload | Description |
|---|---|---|
| `{prefix}/control/play` | (empty) | Start autonomous route following |
| `{prefix}/control/stop` | (empty) | Stop and switch to OPERATED mode |
| `{prefix}/control/set_speed` | `{"value": <float>}` | Set cruise speed in m/s |
| `{prefix}/control/move` | `{"heading_deg": <float>}` | Override heading (remote/directed mode) |
| `{prefix}/control/cancel_remote` | (empty) | Clear remote heading override |
| `{prefix}/control/set_mode` | `{"mode": "operated" \| "autonomous"}` | Switch operation mode |
| `{prefix}/control/manual` | `{"rudder_deg": <float>, "engine": <float>}` | Direct rudder [-35, +35] and engine [0, 1] control |

## Queryables — Per-drone (request/response)

| Key expression | Request | Response | Description |
|---|---|---|---|
| `{prefix}/service/load_route` | `{"waypoints": [[lat, lng], ...]}` | `{"ok": true}` | Load a navigation route (min 2 waypoints) |
| `{prefix}/service/settings` | (empty) for GET, JSON for PUT | `SettingsPayload` | Read or update telemetry rates, source IDs, and location noise |
| `{prefix}/service/fault` | `{"action": "inject" \| "clear", "subject": "...", "fault_type": "..."}` | `{"ok": true, "faults": {...}}` | Inject or clear a fault on a telemetry subject |
| `{prefix}/service/set_home` | `{"lat": <float>, "lng": <float>}` | `{"ok": true}` | Relocate drone position (OPERATED mode only) |
| `{prefix}/service/set_geofence` | `{"polygon": [[lat, lng], ...], "action": "coast" \| "brake"}` | `{"ok": true}` | Set geofence boundary (empty payload clears it) |

### Settings payload format

```json
{
  "subjects": {
    "location_fix": {"rate_hz": 1.0, "source_id": "gnss/0"},
    "heading_true_north_deg": {"rate_hz": 1.0, "source_id": "imu/0"},
    "speed_over_ground_knots": {"rate_hz": 1.0, "source_id": "imu/0"},
    "roll_deg": {"rate_hz": 1.0, "source_id": "imu/0"},
    "pitch_deg": {"rate_hz": 1.0, "source_id": "imu/0"}
  },
  "location_noise_sigma_m": 0.5
}
```

### Fault types

Valid values for `fault_type`: `drop`, `stuck`, `nan`, `wrong_rate`.

Valid values for `subject`: `location_fix`, `heading_true_north_deg`, `speed_over_ground_knots`, `roll_deg`, `pitch_deg`.

## Queryables — Fleet-level

These operate at the realm scope, not scoped to a single drone.

| Key expression | Request | Response | Description |
|---|---|---|---|
| `{realm}/@v0/service/spawn_drone` | `{"lat": <float>, "lng": <float>}` | `{"ok": true, "entity_id": "drone-1"}` | Spawn a new drone at the given position |
| `{realm}/@v0/service/list_drones` | (empty) | `{"ok": true, "drones": [...]}` | List all active drones with position, state, health, faults |
| `{realm}/@v0/service/delete_drone` | `{"entity_id": "drone-1"}` | `{"ok": true}` | Delete a drone and stop its simulator |

### list_drones response format

```json
{
  "ok": true,
  "drones": [
    {
      "entity_id": "drone-1",
      "lat": 57.706,
      "lng": 11.938,
      "heading": 45.0,
      "speed": 1.5,
      "state": "playing",
      "operation_mode": "autonomous",
      "route": [[57.706, 11.938], [57.710, 11.940]],
      "health": {
        "level": "nominal",
        "mode": "autonomous",
        "subsystems": [
          {"name": "position", "level": "nominal", "detail": ""},
          {"name": "heading", "level": "nominal", "detail": ""},
          {"name": "speed", "level": "nominal", "detail": ""}
        ]
      },
      "faults": {}
    }
  ]
}
```
