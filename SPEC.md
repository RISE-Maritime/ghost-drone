# SPEC.md — Behavioral specification

Describes the expected behavior of ghost-drone (see JOBS.md for context).
Each behavior is a testable "when X, then Y" statement.

## Fleet

- When a user clicks on the map, a new drone is spawned at that location with a unique entity_id.
  > **Not implemented.** Map clicks add waypoints to a route, not spawn drones. The frontend has a single `droneMarker` (`frontend/src/map.ts:17`) and `onMapClick` (`map.ts:144-149`) pushes waypoints. There is no drone-creation flow from the UI.
- Each drone publishes telemetry under its own keelson key expressions (scoped by entity_id).
  > **Fully implemented.** `config.py:25-27` builds `keelson_prefix` from `entity_id`; `telemetry.py:124-135` (`make_key`) scopes every subject key; `server.py:122,187,238` uses it for all publications. Frontend reads `entity_id` from URL param (`main.ts:18`) and scopes all pub/sub via `zenoh-client.ts:31-33`. Tested in `test_fleet_isolation.py:73`.
- Multiple drones can run simultaneously without interfering with each other.
  > **Fully implemented (backend).** Each `start_simulator` call (`server.py:307-336`) creates an isolated `SimGlobals`, `ZenohPublisher`, and tick thread with no shared state. Tested in `test_fleet_isolation.py:73,159`. Frontend does not manage multiple drones (single `MapController` instance).

## Control

- When a route is loaded and autonomous mode is enabled, the drone moves to the start of the route and follows it.
  > **Fully implemented.** `engine.py:98-111` (`load_route`) validates and resets to start; `engine.py:153-167` (`_reset_to_start`) places drone at waypoint 0; `engine.py:113-119` (`play`) transitions STOPPED→PLAYING; `engine.py:206-253` (`_advance`) interpolates along segments. Zenoh handler at `control.py:77-108`. Tested in `test_sim_engine.py:25-44`, `test_load_route_resets_state.py:70-152`.
- When a drone is paused, it holds its current position. When resumed, it continues from where it stopped.
  > **Fully implemented.** `engine.py:121-124` (`pause`) transitions PLAYING→PAUSED; `engine.py:186-196` (`tick`) only advances when PLAYING; `play()` also handles PAUSED→PLAYING resume. Tested in `test_pause_resume.py:95-230` (position spread <0.001 while paused, resumed frame within 50m), `test_sim_engine.py:47-73`.
- When a drone is stopped, it resets to idle and publishes no telemetry (except entity_health as INACTIVE).
  > **Fully implemented.** `engine.py:126-130` (`stop`) resets to start; `server.py:268-270` gates `_publish_telemetry` on `PLAYING` only; `server.py:272-275` always publishes health with `HEALTH_INACTIVE`/`MODE_MANNED_ON_BOARD` when stopped (`server.py:177-180`). Tested in `test_health_states.py:93-154`, `test_e2e_zenoh.py:317-364`.
- A drone can be remote-controlled: movement commands sent via zenoh override autonomous navigation.
  > **Fully implemented.** `engine.py:132-138` (`remote_move`) stores override heading; `engine.py:212-222` uses it in `_advance` instead of waypoint bearing; `control.py:55-66` handles `control/move` and `control/cancel_remote`; `server.py:167` reflects `MODE_DIRECTED` in health. Tested in `test_remote_control.py:85-172`, `test_cancel_remote.py:93-176`, `test_health_remote_mode.py:96-182`.
- Routes require at least 2 waypoints; loading fewer is rejected with an error.
  > **Fully implemented.** `engine.py:107-108` raises `ValueError` for `< 2` waypoints; `control.py:98-104` catches and replies `{"ok": false, "error": ...}`; frontend guards at `controls.ts:44` and `main.ts:32`. Tested in `test_sim_engine.py:32-36`, `test_load_route_null_waypoints.py:64-107`, `test_load_route_validation.py:66-101`.

## Fault injection

- A fault can be injected on any subject of any drone. Supported fault types:
  - **stuck**: the published value freezes at its current reading.
  - **NaN**: the published payload contains NaN.
  - **wrong rate**: the subject publishes at a rate different from its configured Hz.
  - **drop**: the subject stops publishing entirely.
  > **Fully implemented.** Fault types defined in `sim_state.py:21`; `FaultState` class (`sim_state.py:24-52`) tracks per-subject fault sets. Applied in `server.py:65-123`: drop skips publish (line 73), wrong_rate doubles rate (line 77), nan publishes NaN (lines 82-89), stuck freezes value (lines 92-107). Tested in `test_fault_injection.py` (all four types).
- Faults can be combined (e.g., stuck + wrong rate on the same subject).
  > **Fully implemented.** `FaultState` uses a `Set[str]` per subject (`sim_state.py:29`); each `has_fault()` check is independent. Priority order: drop > nan > stuck > normal. Tested in `test_combined_faults.py:123`.
- When a fault is cleared, the subject returns to normal behavior.
  > **Fully implemented.** `FaultState.clear()` at `sim_state.py:35-40`; stuck values evicted at `server.py:107`. Clearing assertions in all fault tests (`test_fault_injection.py`, `test_combined_faults.py`, `test_health_reflects_faults.py`).
- Faults are controllable via zenoh queryable (for scripts and automated tests).
  > **Fully implemented.** `control.py:130-175` registers queryable at `{prefix}/service/fault`; supports GET (status), inject, and clear actions with validation. All E2E fault tests drive it directly via `zenoh.get()`.
- Faults are controllable from the browser UI (fault injection panel per drone, with toggles per fault type per subject).
  > **Fully implemented.** `faults.ts:32-66` builds toggle buttons (5 subjects x 4 types); `main.ts:89-95` wires toggles to `zenoh.injectFault()`/`clearFault()`; `faults.ts:68-84` syncs button state from `sim_frame.faults` on every frame. HTML at `index.html:691-709`, CSS at `index.html:311-362`.

## Entity health

- Each drone publishes `entity_health` at a steady rate regardless of its state.
  > **Fully implemented.** `server.py:272-275` calls `_publish_health` unconditionally in the tick loop; rate is `HEALTH_RATE_HZ = 1.0` (`server.py:128`). Tested in `test_health_states.py:93-154` (messages received while stopped), `test_health_paused.py:92-172` (while paused).
- When idle/stopped, health level is INACTIVE and operation mode is IDLE.
  > **Fully implemented.** `server.py:177-180` sets `HEALTH_INACTIVE`/`MODE_MANNED_ON_BOARD` and all subsystems to INACTIVE when not playing. Tested in `test_health_states.py:142-154`, `test_sim_frame_health.py:263-305`.
- When playing autonomously, health level is NOMINAL and operation mode is AUTONOMOUS.
  > **Fully implemented.** `server.py:166-176` computes worst-level from subsystems (all NOMINAL when no faults) and sets `MODE_AUTONOMOUS` when not remote. Tested in `test_health_states.py:212-224`, `test_health_paused.py:160-172`.
- When a fault is active, the affected subsystem's health reflects it (DEGRADED or CRITICAL).
  > **Fully implemented.** `server.py:132-153` maps subsystems to subjects; `_CRITICAL_FAULTS = {"drop", "nan"}`, `_DEGRADED_FAULTS = {"stuck", "wrong_rate"}`; `_subsystem_health()` returns the appropriate level. Overall level is worst-of-all. Tested in `test_health_reflects_faults.py`, `test_health_nan_wrong_rate_faults.py`.
- `telemetry_expectations` in the health message match the drone's current settings (subjects, rates, source_ids).
  > **Fully implemented.** `server.py:182-185` builds expectations from live `sim.settings.subjects`; encoded via `telemetry.py:116-120`. Tested in `test_health_states.py:227-319` (asserts exact match against settings queryable), `test_entity_health.py:114-129` (round-trip).

## Browser UI

- Clicking on the map creates a drone at that location.
  > **Not implemented.** Map clicks add waypoints to a route for the single existing drone (`map.ts:144-149`). There is no drone-spawning mechanism in the UI; only one `droneMarker` exists (`map.ts:17`).
- A route can be drawn on the map and assigned to a drone.
  > **Partially implemented.** Route drawing works fully: click to add waypoints (`map.ts:144-149`), draggable/removable markers (`map.ts:102-121`), polyline rendering (`map.ts:95-131`), sent via `zenoh.loadRoute()` on Play (`main.ts:31-45`, `zenoh-client.ts:99-119`). However, there is no "assign to a drone" step — the route is always sent to the single drone instance. Multi-drone assignment is absent.
- All active drones are visible on the map with their current positions.
  > **Partially implemented.** A single drone's position is shown live via `droneMarker` updated on every sim_frame (`map.ts:164-183`, `main.ts:74-85`). Multi-drone rendering is not implemented — there is only one marker.
- The UI displays each drone's `entity_health` status (nominal/degraded/critical/inactive).
  > **Fully implemented.** `telemetry.ts:25-47` renders `health.level` into `#health-level` with color-coded `data-level` attribute (`index.html:278-282,683-689`). Updated on every sim_frame.
- The UI shows per-subsystem health breakdown (position, heading, speed).
  > **Fully implemented.** `telemetry.ts:39-46` maps `health.subsystems` array into `.health-sub-row` elements showing name, level, and detail (`index.html:284-309,688`).
- Health display updates live as the drone state or faults change.
  > **Fully implemented.** Zenoh subscriber on sim_frame (`zenoh-client.ts:55-70`) fires on every frame (~20 Hz); `telemetry.ts:50` calls `updateHealthDisplay()` unconditionally. No polling needed.
- The fault injection panel allows activating and clearing faults per subject, with immediate effect.
  > **Fully implemented.** `faults.ts:32-66` builds 5x4 toggle grid; clicks immediately call `zenoh.injectFault()`/`clearFault()` (`main.ts:89-95`, `zenoh-client.ts:141-185`); button state reconciled from server on every frame (`faults.ts:68-84`). HTML at `index.html:695-708`.

## Telemetry

- While playing, the drone publishes all configured keelson subjects (location_fix, heading, speed, roll, pitch) at their configured rates.
  > **Fully implemented.** `server.py:65-123` iterates all 5 subjects with per-subject rate throttle (`telemetry.py:138-174`); rates from `settings.subjects[subject].rate_hz`. Tested in `test_e2e_zenoh.py:78-163` (all 5 subjects decoded).
- While stopped, no keelson telemetry is published (entity_health excepted).
  > **Fully implemented.** `server.py:268-270` gates on `SimState.PLAYING`. Tested in `test_e2e_zenoh.py:317-364` (zero non-health, non-sim_frame messages while stopped).
- sim_frame is published at ~20 Hz for the browser UI regardless of play state.
  > **Fully implemented.** Tick loop runs at `TICK_HZ = 20` (`engine.py:22`); `_publish_sim_frame` called unconditionally (`server.py:277-283`). Tested in `test_e2e_zenoh.py:165-228` (≥10 frames/s while playing), `test_sim_frame_all_states.py:65-176` (≥10 frames/s while stopped and paused).
- Settings (rates, source_ids, noise, roll/pitch amplitude) can be read and updated via zenoh queryable.
  > **Fully implemented.** Queryable at `{prefix}/service/settings` (`control.py:110-128`); GET returns current state, payload updates live via `sim.apply_settings()` (`sim_state.py:104-126`) covering `rate_hz`, `source_id`, `roll_amplitude_deg`, `roll_period_s`, `pitch_amplitude_deg`, `pitch_period_s`, `location_noise_sigma_m`. Frontend settings modal at `settings.ts:19-116`. Tested in `test_e2e_zenoh.py:231-277`, `test_settings_rate_change.py:69-170`.
