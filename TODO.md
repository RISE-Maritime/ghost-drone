# ghost-drone TODO

Single source of truth for **pending** work, as a checklist. Completed items are pruned — `git log` has the record.

## Start here

The order to work in. Everything below this section is real but genuinely deferred.

- [ ] **The devcontainer cannot build** → [Devcontainer](#devcontainer). It `COPY`s `init-firewall.sh`, deleted in `49f58e0`, so the README's claim that this repo ships a working devcontainer is currently false. The smallest genuinely-broken thing left.

- [ ] **`release.yml` can publish `latest` backwards, and pins no architecture** → [CI & testing](#ci--testing) and [Reproducibility & supply chain](#reproducibility--supply-chain). A patch release of an old minor overwrites `latest`, and with no `platforms:` the published image's arch follows whatever the runner happens to be — which matters because the SITL binaries are x86_64-only. Both live in one file and are one change.

- [ ] **No `LICENSE`** → [Project hygiene](#project-hygiene). The image publishes to a public registry with no license terms at all. Sibling RISE-Maritime repos are Apache-2.0; this is a one-file fix that should not wait behind engineering work.

- [ ] **`sim_control` declares no liveliness token** → [sim_control correctness](#sim_control-correctness). It shares `SOURCE_ID` with `mavlink2keelson`, so if it dies alone Crowsnest still shows the source alive and leaves its panels enabled. Now that the health connector has its own `--source-id`, this is the last process whose liveness is somebody else's.

## sim_control correctness

- [ ] **ArduRover answers `MAV_CMD_DO_REPOSITION` with `MAV_RESULT_UNSUPPORTED`, so the vehicle cannot be repositioned at all** — **verified against SITL:** `set_initial_pose` returns `IO_FAILURE` and the vessel does not move; `stop` halts but logs that it could not reset to the initial pose. `DO_REPOSITION` is a Copter/Plane command; the rover firmware does not implement it.

  **This was invisible until the acks were checked.** The old code ignored `ack.result`, so both RPCs reported success while doing nothing. Two related defects were hidden behind it and are now fixed: `Coordinate` has `latitude_deg`/`longitude_deg` and no altitude at all, so the previous `pose.position.latitude` would have raised `AttributeError` on any call that got that far — meaning `set_initial_pose` could never have worked even had the command been supported.

  **Needs a different mechanism.** Options worth investigating: restarting SITL with a new `--home` (heavy-handed but certainly works), the SITL-specific `SIM_` parameter surface, or `MAV_CMD_DO_SET_HOME` combined with something that actually moves the body. Until then `set_initial_pose` correctly reports failure rather than lying, and the `--home` seeding in place for `stop` is inert.

- [ ] **`pause` produces a flatline where the contract requires a gap** — `SimulationControl.proto` is explicit that a paused entity "simply stops publishing" and that "the only visible effect is a gap in the data, which is honest". This implementation sets `SIM_SPEEDUP = 0.0` on the autopilot, but `mavlink2keelson` is a separate process on a separate link and keeps publishing the frozen values at full rate. Consumers see a flatline — exactly the dishonest signal the interface was designed to avoid.

  **`SIM_SPEEDUP=0` is now confirmed to be accepted** — `_set_param` verifies the read-back value, and `pause` returns success against SITL, so the autopilot does take it. That half of the old doubt is resolved.

  **The remaining half is not fixable here.** The flatline comes from `mavlink2keelson`, a separate process on its own link that sim_control cannot silence. An honest gap needs that connector stopped and restarted around the pause, which means coordinating through the entrypoint or the eventual compose split — not a change to this file. Do not re-read this entry as a small fix.

- [ ] **`sim_control.py` still bypasses most of the keelson scaffolding** — `GracefulShutdown` is now in place, but there is no `declare_liveliness_token`, logging is a raw `logging.basicConfig` rather than `setup_logging`, and the publisher is a raw `session.declare_publisher` rather than `declare_publisher_for_subject`, so `simulation_status` publishes without the well-known-subject QoS profile.

  **The liveliness gap has a concrete consequence.** `sim_control` shares `SOURCE_ID=mavlink` with `mavlink2keelson`, so its liveness is implied by a *different process's* token. If `sim_control` dies while the connector lives, Crowsnest still reads the source as alive and its panels stay enabled. A distinct `--source-id` (e.g. `sim`) plus its own token would make the two independently observable.

## Reproducibility & supply chain

- [ ] **Four unverified executables are fetched over the network at build time** — [Dockerfile:35-44](ghost-drone/Dockerfile#L35-L44) pulls the ArduPilot `/stable/` channel, which moves under you, with no `sha256sum -c`. The `pip install` at [Dockerfile:62](ghost-drone/Dockerfile#L62) has no lockfile or hashes, so transitive dependencies resolve at build time too. There is also no `.dockerignore` anywhere in the repo.

- [ ] **The `sed` patch of an upstream script can fail open, and the quiet failure is the dangerous one** — [Dockerfile:54-55](ghost-drone/Dockerfile#L54-L55) rewrites `uv run protoc` to `protoc` in keelson's `generate_python.sh`. It works today: upstream has exactly three such invocations.

  **The loud case is fine.** If upstream changes the command to something like `uv run --frozen protoc`, the substitution no-ops and the build then fails on missing `uv`. Visible, immediate.

  **The quiet case is narrower than it was.** If upstream adds a *fourth* generation step under a different invocation, or splits interface generation into a new script, generation partially succeeds and the image builds green. The build assertion at the end of the Dockerfile now catches that for anything `sim_control` or the three connectors import — but a proto used by neither would still slip through silently. The script also relies on unguarded `**/*.proto` globs without `shopt -s globstar`, which works only by accident for the single-level `foxglove/` nesting.

  **Preferred fix** is to install `uv` in the image and drop the patch entirely. Failing that, guard with `grep -q 'uv run protoc' … || exit 1` before the `sed`, so a no-op substitution fails loudly instead of relying on the downstream assertion to notice.

- [ ] **Architecture is pinned in neither the build nor the release** — **verified:** the locally built image is `arm64` while all four SITL binaries are `SITL_x86_64_linux_gnu`. It runs today on Docker Desktop, which registers qemu binfmt handlers VM-wide — the Crowsnest rig was verified underway at 7.8 kn this way — so this is a portability gap, not a present breakage. But the same image will fail with `exec format error` on a bare arm64 Linux host, and [release.yml](.github/workflows/release.yml) declares no `platforms:`, so the published image's architecture silently follows whatever the runner happens to be. Fix with `FROM --platform=linux/amd64` and an explicit `platforms: linux/amd64` in the workflow.

## CI & testing

- [ ] **CI has never actually run** — [ci.yml](.github/workflows/ci.yml) was written and statically checked (actionlint clean, all six action refs resolve, every step reproduced by hand locally), but GitHub Actions cannot be executed locally, so the first genuine run happens on the first PR. Expect to iterate once on runner-specific details: `--network host` behaviour, GHA cache warm-up, and whether 45 s is enough for SITL to boot on a cold runner.

- [ ] **`release.yml` will let an old release overwrite `latest`** — [release.yml:36](.github/workflows/release.yml#L36) sets `type=raw,value=latest` unconditionally, so a patch release of an older minor, or a prerelease, republishes `latest` pointing backwards. Guard with `enable=${{ !github.event.release.prerelease }}` and a version condition. There is also no `concurrency:` group, so two near-simultaneous releases race on the tag.

- [ ] **There is still no unit-level testing — only the end-to-end smoke test** — [tests/smoke_test.py](tests/smoke_test.py) now covers the shape the deleted `test_e2e_zenoh.py` had (router up, assert subjects arrive and decode), but everything it checks needs a full container and ~90 s. Nothing exercises a single function in isolation.

  **The two worth writing:** a `sim_control` state-machine test against a fake MAVLink endpoint (start/pause/stop/set_initial_pose plus `INVALID_STATE` on illegal edges, and the ack-matching paths, which the smoke test only touches via one pause/start round-trip); and a `bats` test of the entrypoint's `VEHICLE_TYPE` → binary/model/param-file mapping, which would catch the `boat` alias bug under Vehicle coverage immediately. The deleted `test_keelson_roundtrip.py` is also still worth porting — pure `enclose`/`uncover` byte-identity and ordering assertions, no Zenoh needed.

## Vehicle coverage

- [ ] **The motorboat has no wind or waves, where ArduPilot's own SITL defaults do** — upstream's `Tools/autotest/default_params/motorboat.parm` sets `SIM_WIND_SPD 3`, `SIM_WIND_T 1` and `SIM_WAVE_ENABLE 1`; [config/motorboat/defaults.parm](ghost-drone/config/motorboat/defaults.parm) sets only `FRAME_CLASS`. Adopting them would make the default vehicle behave more like a boat at sea. Deliberately not done alongside the sailboat work: it changes the motion of the vehicle that Crowsnest's verified rig and every check in `tests/smoke_test.py` run against, so it deserves its own change and its own re-verification.

- [ ] **Only `motorboat` has `platform.json` and `entity_health.json`** — every other vehicle type still skips both connectors with a `WARN` at [entrypoint.sh:144-173](ghost-drone/entrypoint.sh#L144-L173). The motorboat pair is a working template, but `entity_health.json` is not portable as-is: its rate bands are pinned to the ~1 Hz that ArduRover happens to stream, and a copter or plane streams differently. Measure before copying.

- [ ] **The health config covers 8 of the 39 published subjects, and nothing says so** — Crowsnest renders `EntityHealth.sources` verbatim with no "unmonitored" indication, so a green panel means "the 8 configured subjects are fine", not "the vessel is fine". Widening it is not free: `battery_voltage_v` is deliberately excluded because SITL never streams `BATTERY_STATUS`, and a subject that is never published reports `INACTIVE`, which outranks CRITICAL in `worst()` and would drag the whole entity grey. Sub-qualified sources (`mavlink/gps_raw`, `sensor_status/mavlink/*`) need `require_liveliness: false`, because the liveliness token `pubsub/*/mavlink` matches only one chunk and would leave them `UNKNOWN` forever.

- [ ] **The drone reports CRITICAL for its first ~6 seconds after every boot** — verified: the simulated GPS publishes `fix_type=FIX_NO` until it acquires, and that sits in the CRITICAL band. This is an accurate report rather than a tuning fault, and softening it would understate a real mid-mission loss of fix, so it is left alone. Worth knowing before someone reads the transient as a defect. The rate check is *not* the cause — its `DEGRADED` floor of 0.1 Hz deliberately absorbs the sliding-window warm-up, and it was observed doing so.

## sf18 sensor parity

Parity with `keelson-platforms/platforms/sf18` is a *sensor-surface* goal and strictly additive. sf18 declares 14 streams and no MAVLink surface at all; this drone declares 39 streams and 20 RPCs, so it is already the richer platform for control and attitude. Nothing may be dropped to "match" sf18 or Remote Control, missions, params and geofence all go dark. The gap is six subjects: `image_compressed` ×4, `point_cloud`, `radar_spoke`, `nav_status`, `operational_authority`, `roc_status`.

- [ ] **`bino` supplies the synthetic sensors, and this drone already satisfies its pose contract for free** — `RISE-Maritime/bino` is a maritime perception sensor emulator that synthesizes camera, lidar and radar from externally injected vessel poses. Its ADR-002 fixes its role on the bus: pose injection in, sensor data out, nothing else. It publishes no poses, no `location_fix`, no ground truth and no transforms.

  **The pose half costs nothing.** Bino's `keelson_nav` pose source subscribes to exactly `location_fix` + `heading_true_north_deg`, optionally `pitch_deg` and `roll_deg` — all four of which `mavlink2keelson` already publishes under `source_id=mavlink`. A scenario with `entity_id: drone-sim-01`, `source_id: mavlink` resolves straight onto keys this container emits today, with no change here at all:

  ```text
  # bino pose input — already published by ghost-drone
  rise/@v0/drone-sim-01/pubsub/location_fix/mavlink
  rise/@v0/drone-sim-01/pubsub/heading_true_north_deg/mavlink
  rise/@v0/drone-sim-01/pubsub/pitch_deg/mavlink
  rise/@v0/drone-sim-01/pubsub/roll_deg/mavlink

  # bino sensor output — new
  rise/@v0/drone-sim-01/pubsub/image_raw/camera-axis-1
  rise/@v0/drone-sim-01/pubsub/point_cloud/lidar-os
  rise/@v0/drone-sim-01/pubsub/radar_sweep/radar-1201
  ```

  **Practicalities.** Bino is a private repo needing a sibling checkout; it is TypeScript/pnpm with Rust/WASM kernels for the lidar and radar, publishes GHCR images, and the headless `bino-node` image runs anywhere on software GL. Scenes are declared in a YAML scenario with `vessels[].pose_source` and `vessels[].sensors[]` blocks.

- [ ] **Bino's output subjects do not match what sf18 declares or what Crowsnest consumes** — three mismatches, and only one of them is trivial.

  **Camera.** Bino emits `image_raw` carrying `foxglove.RawImage`. sf18 declares `image_compressed`, and Crowsnest's camera enumeration hard-requires it — the key parser tests `segments[4] === "image_compressed"` before a camera is registered at all. Raw frames will not populate the camera strip no matter how good they are.

  **Radar.** Bino emits `radar_sweep` carrying `keelson.RadarSweep`; sf18 declares `radar_spoke`. Worth knowing that `radar_spoke` currently has zero consumers anywhere in Crowsnest, so this mismatch costs nothing today beyond a data-flow row.

  **Lidar.** `point_cloud` matches on subject, but not on key expression — see the hardcoded lidar bridge under Deferred / external.

  Resolving this is a decision rather than a task: a transcode step, a Crowsnest change, or accepting a different-but-honest subject set.

- [ ] **`scenario.keelson.base_path` has no default and must be chosen deliberately** — bino makes it mandatory precisely so synthetic data cannot silently collide with, or be mistaken for, real data on a shared bus. Setting it to `rise` is what makes Crowsnest render the synthetic sensors as part of the same platform — and is also exactly the shared-network pollution the README already warns about, now with camera and radar volume behind it. A separate realm is safe but invisible to the drone's Crowsnest platform. Pick per use: inject-mode parity wants one realm, everyday development probably does not.

- [ ] **The single container has to become an sf18-style compose stack** — sf18 is roughly twenty compose files, one per sensor group, each with its own `source_id` and each startable and stoppable independently. That independence is the substance, not the packaging: it is what makes per-sensor failure injection possible, which one `entrypoint.sh` running four background jobs cannot do. Note the entrypoint now supervises its children properly and exits non-zero when one dies, so this is no longer a fix for a broken supervisor — it is about per-service isolation, and the restructure would hand that supervision to Docker rather than replace something missing.

- [ ] **Per-device `source_id` conventions, not one flat `mavlink` for everything** — sf18 names its sources after the devices that produce them: `ardusimple/GGA`, `ardusimple/UNIHEADINGA`, `lidar-os`, `camera-axis-1` through `-4`, `radar-aptiv`, `battery_12v_bow`, `battery_12v_stern`, `battery_36v_engine`. This drone uses `mavlink` for all 39 streams. Crowsnest supports multi-segment source ids, so the convention is available; adopting it is what makes the drone a structurally realistic stand-in rather than one connector in a costume. The LabJack analogue is cheap and worth doing early — sf18's battery voltages are just named analog channels, which SITL battery state could feed directly.

- [ ] **`platform.json` becomes a prerequisite rather than a nice-to-have, and sf18's own copy is a trap** — extends the config entry under [Vehicle coverage](#vehicle-coverage). Bino publishes **no** transforms by design (ADR-002), so static sensor-mount geometry has to come from this repo's own `platform` connector. Without it the synthetic sensors have no declared position on the hull.

  **Do not copy `keelson-platforms/platforms/sf18/config.json`.** It is the old array-based `translation`/`rotation` schema with no `sensor_type` and no `ccrp_m`, and the current `platform-geometry2keelson.py` validates against `config-schema.json` and would reject it outright. Copy `keelson/connectors/platform/example-config.json` instead — it is already an SSRS18/sf18 model at 1.8 m LOA with four Axis cameras, an Ouster lidar and a RUTX GNSS antenna, in the schema the connector actually accepts.

## Crowsnest simulator convergence

Crowsnest carries simulation machinery that belongs in a simulation backend, and this repo already holds that role. Today the two codebases run two disconnected simulation surfaces: a browser that fabricates telemetry with no control RPCs, and a container that serves control RPCs with no client.

- [ ] **`SimulatorPublisher.jsx` is a Keelson connector wearing a UI costume** — it reads the physics tick and publishes 13 fabricated subjects at roughly 10 Hz to `crowsnest/@v0/simulator/pubsub/<subject>/sim-physics`: `location_fix`, `speed_over_ground_knots`, `course_over_ground_deg`, `heading_true_north_deg`, `yaw_rate_degps`, `depth_m`, `rudder_angle_deg`, `speed_through_water_knots`, `apparent_wind_speed_mps`, `apparent_wind_angle_deg`, `surge_velocity_mps`, `sway_velocity_mps`, `thruster_power_pct`. It is mounted globally in `crowsnest-dev/src/base-elements/BasePage.jsx:96`, so it runs on every page of the app whenever the sim is running.

  **The registry entry admits what it is.** `crowsnest/@v0/simulator` declares `liveliness: false` on all 13 streams and `"queryables": []` — a real connector declares liveliness tokens and a browser tab cannot.

  **Moving it closes a gap already recorded in this file.** That subject list is very nearly the conning gap under [Deferred / external](#deferred--external) — `speed_through_water_knots`, `depth_m`, `rudder_angle_deg`, `thruster_power_pct`, plus the `surge_velocity_mps`/`sway_velocity_mps` velocities `mavlink2keelson` does not publish. The two entries are one problem seen from opposite ends. Coupling is low: Jotai reads plus `encloseFromTypeName` protobuf encoding, no DOM.

- [ ] **The physics kernels are portable, validated, and homeless** — roughly 2,000 lines across `sim3dof/` (683 lines implementing the MMG standard method, every derivative estimated from hull form per Yoshimura & Masumoto, *JASNAOE* Vol. 14, 2011), `sim_planing/` (Savitsky 1964), `simple_simulator.js`, `trackKeepingController.js`, and a 430-line model registry.

  **The validation is real and worth preserving.** All seven MMG hydro models meet every IMO Res. MSC.137(76) criterion — 35° turning circle advance 3.05–3.37 L against a 4.5 L limit, tactical diameter 3.15–3.60 L against 5.0 L, 10°/10° first overshoot 5.4–8.9°, 20°/20° first overshoot 11.5–18.3°, with 43–60 % speed retention. The planing engine's longitudinal half reproduces OpenPlaning to −2.7 % on trim and +2.2 % on wetted length; its steering half is explicitly calibrated rather than validated, because no estimate-from-particulars regression exists for planing manoeuvring.

  **The kernels are already headless.** Pure ESM, `Math` only — no DOM, no Jotai, no Zenoh, no geodesy. The documented re-validation recipe copies the directory to a scratch dir and runs it under plain node after a two-import `sed` for extensionless imports. That `sed` is the entire porting cost of the kernel itself; everything app-specific already lives in a separate adapter.

  **But it cannot merge into SITL, and there is no committed harness.** ArduPilot models a rover or boat; these model merchant ships and planing hulls, so this is a *second* simulation service rather than a merge. And the validation exists only as a manual procedure — no `tests/` directory and no test runner in Crowsnest's `package.json` — including the SR108 anchor that caught a sign error in the source paper's eq (4.5). Three ways forward, all real: port to Python and re-incur the calibration work; ship a sibling Node service and keep the validated JS as-is; or extract the kernels as a shared versioned package with the harness attached and let both the browser and a backend consume it. Decide before starting, not during.

- [ ] **Two simulation control surfaces should converge on one** — this container serves `SimulationControl/{start,pause,stop}` and `VehicleSimulatorControl/set_initial_pose` with no client anywhere, while Crowsnest's simulator has a full config UI whose start, stop and reset are *local Jotai state* — invisible to any other station, so no second operator can see or control the sim.

  **The precedent already exists in Crowsnest.** `crowsnest-dev/src/services/mcapReplayRpc.js` is a thin RPC client to a backend replay daemon: the browser sends commands and subscribes to status, the daemon owns the loop. The simulator should take that shape, with the OS Config panel becoming an RPC client rather than a local-atom writer. Pairs directly with the Deferred entry about Crowsnest having no `SimulationControl` client — same convergence, opposite end.

## Multi-drone support

- [ ] **The README's "run two drones at once" example cannot work** — three independent reasons, any one of which is fatal.

  **Both SITLs bind the same port.** `MAVLINK_URL` only changes what the *client* dials. [entrypoint.sh:89](ghost-drone/entrypoint.sh#L89) builds `SITL_ARGS` with no `--serial0` and no `-I<instance>`, so both instances bind ArduPilot's default TCP 5760 and collide under `network_mode: host`.

  **`sim_control` would target the wrong drone anyway** — it is hardcoded to `tcp:localhost:5762` at [entrypoint.sh:134](ghost-drone/entrypoint.sh#L134) regardless of `MAVLINK_URL`, so instance 2 would drive instance 1's control port even if the bind succeeded.

  **Compose replaces rather than adds.** `docker compose up -d` twice in the same project recreates the `ghost-drone` service; a second instance needs `-p <project>` or a second service. Either thread an `SITL_INSTANCE` through the entrypoint properly, or delete the section.

- [ ] **The SITL readiness probe has no failure path and cannot see UDP** — [entrypoint.sh:99-109](ghost-drone/entrypoint.sh#L99-L109).

  **No `else` on loop exhaustion.** If SITL never binds within 30 s the loop just falls through and the connectors start against a dead port — no "timed out" message, no non-zero exit. Only the *process died* branch at [entrypoint.sh:105](ghost-drone/entrypoint.sh#L105) is handled.

  **`ss -tlnH` is TCP-listen only**, but [entrypoint.sh:12](ghost-drone/entrypoint.sh#L12) documents `udpin:0.0.0.0:PORT` as a valid `MAVLINK_URL` form. With a `udpin:` URL the probe can never match, so it burns the full 30 s and proceeds regardless. `${MAVLINK_URL##*:}` also yields garbage for any URL without a trailing `:port`, which `ss` then rejects into `2>/dev/null`.

- [ ] **`sim_control`'s MAVLink URL is hardcoded and undocumented** — every other endpoint is env-overridable; port 5762 is not, and it appears nowhere in the README's configuration table. Add `SIM_CONTROL_MAVLINK_URL`, defaulting to `MAVLINK_URL`'s port + 2.

## Devcontainer

- [ ] **The devcontainer cannot build — it `COPY`s a file the cleanup deleted** — **verified:** [.devcontainer/Dockerfile:148](.devcontainer/Dockerfile#L148) is `COPY init-firewall.sh /usr/local/bin/`, but `.devcontainer/` contains only `Dockerfile` and `devcontainer.json`. `git show 49f58e0 --stat` confirms the 121-line script was deleted while the `COPY`, the `chmod` and the sudoers rule at lines 150-151 were left behind. The README's claim that "This repo includes a VS Code devcontainer" is currently false. Secondary point: nothing invokes the script even if restored — there is no `postCreateCommand` — which makes the `NET_ADMIN`/`NET_RAW` capabilities dead weight.

- [ ] **Roughly two thirds of the devcontainer is boilerplate irrelevant to a Docker + Python repo** — it is a verbatim "Claude Sandbox" template. `FROM node:20` for a repo with zero JS since the frontend deletion; `--gpus=all`, which *errors out* on any machine without the nvidia runtime, including this one; an X11 `DISPLAY` mount for a project with no GUI; SDL/freetype/portmidi pygame dependencies; ~16 Chromium runtime packages retained even though the Playwright install is commented out; `postgresql-client` and `pgcli` with no database anywhere; `agent-browser` for a UI that now lives in Crowsnest; eslint/prettier extensions with prettier as the default formatter.

  **Worth keeping:** python3.11, `docker.io` plus the socket mount (the README's workflow depends on it), `--network=host` (needed so the devcontainer sees the same Zenoh router), `iproute2` (the entrypoint's `ss` probe), and the standalone zenoh installs. **Worth adding:** `shellcheck`, `hadolint`, `ruff`, `pymavlink` for local `sim_control.py` iteration.

## Project hygiene

- [ ] **Runtime defaults live in three places and have already drifted** — [Dockerfile:18-23](ghost-drone/Dockerfile#L18-L23) defines six `ENV`s and is **already missing** `MAVLINK_URL` and `TARGET_SYSTEM`, both of which [entrypoint.sh:5-15](ghost-drone/entrypoint.sh#L5-L15) and [docker-compose.yml](docker-compose.yml) do define. Keep one source of truth — the entrypoint's `${VAR:-default}` block — and drop the `ENV` defaults.

- [ ] **`docker-compose.yml` has no supervision, no health signal and no path to the published image** — no `restart:` policy, so a crashed connector is never recovered; no `healthcheck`, so nothing distinguishes "publishing" from "alive but mute"; no `init: true`, so PID 1 is bash with no zombie reaping. `image: ghost-drone` does not reference `ghcr.io/rise-maritime/ghost-drone`, so `docker compose pull` is impossible and every user must run the multi-minute build. There is no `build.args:`, so `KEELSON_REF` cannot be driven from `.env`. `stdin_open`/`tty` look vestigial and mangle log collection. The container also runs as root — no `USER` directive.

- [ ] **No `.env.example`** — the README states options can go "either in a `.env` file or passed directly" and `.gitignore` ignores `.env`, but there is no template to copy. All eight variables from the configuration table belong in one.

- [ ] **No `LICENSE`** — the image is published to `ghcr.io/rise-maritime/ghost-drone` with no license terms attached. Sibling RISE-Maritime repos are Apache-2.0.

- [ ] **No `CLAUDE.md`** — the deleted one describes the v1 `uv` + Vite frontend architecture (`uv sync`, `uv run ghost-drone`, `ghost_drone.toml.example`, `zenoh-bridge-remote-api` on `ws://localhost:10001`) and would be actively misleading if restored. It needs a rewrite for the container layout, the `docker compose` commands, the Keelson-ref story, and the SITL port map: 5760 telemetry, 5762 control.

## Deferred / external

Cross-repo items — these cannot be closed from this repo alone. Mirrors the convention in `crowsnest-dev/TODO.md`.

- [ ] **Crowsnest has no client for `SimulationControl` / `VehicleSimulatorControl`** — all four RPCs this container serves are unreachable from the UI. `simulation_status` decodes on the wire, since it is a well-known subject in keelson's `subjects.yaml`, but nothing renders it. Start, pause and stop have to be driven outside Crowsnest entirely.

- [ ] **`entity_health2keelson` installs no signal handler, so it always dies dirty** — unlike `mavlink2keelson`, which uses `GracefulShutdown` correctly, the entity-health connector has no `GracefulShutdown` and no `signal.signal` call anywhere; its loop is a bare `while True` with no exit condition. Its only handling is `except KeyboardInterrupt`, which is SIGINT-only, so on SIGTERM it dies without undeclaring its liveliness token and subscribers keep seeing a stale-alive source until the router times it out. This container's entrypoint now forwards SIGTERM correctly, so nothing further can be done here — the fix is upstream in keelson.

  Related, and milder: `platform-geometry2keelson` does use `GracefulShutdown` but blocks in `time.sleep(--interval)` rather than `shutdown.wait(...)`, so it only notices the signal when the current sleep ends. The default interval is 10 s, exactly Docker's default grace period, which is why this repo's compose sets `stop_grace_period: 30s`.

- [ ] **`ASSIGNED` has no wire value, and two docstrings in this repo disagree because of it** — `VehicleSimulatorControl.proto` says `set_initial_pose` moves the entity to `ASSIGNED` and that `start` accepts `STOPPED | ASSIGNED | PAUSED`, but `SimulationStatus.proto`'s enum is only `{UNKNOWN, STOPPED, RUNNING, PAUSED}`. `sim_control.py`'s module docstring says the entity "remains in STOPPED". This is an upstream keelson inconsistency — file it there rather than papering over it locally.

- [ ] **Several MAVLink slices remain unexercised against this rig** — mission upload/download, geofence upload, and param snapshot diff. `arm` needs force because of pre-arm checks, and `set_param`/`get_param` on `ARMING_CHECK` hit the connector's 2 s confirmation window. Carried over from the ghost-drone entry in `crowsnest-dev/TODO.md`, which owns the Crowsnest half of the work.

- [ ] **Conning fields Crowsnest expects that `mavlink2keelson` never publishes** — `speed_through_water_knots`, `depth_m`, `rudder_angle_deg`, `engine_rate_rpm`, `propeller_pitch_pct`, `thruster_power_pct` and every wind subject. The connector also publishes `surge_m`/`sway_m` as displacements rather than the `surge_velocity_mps`/`sway_velocity_mps` velocities the conning app reads, so those gauges stay blank on the drone.

- [ ] **Crowsnest hardcodes the lidar key expression to sf18, so drone point clouds can never render** — `LIDAR_KEY_EXPR` in `crowsnest-dev/src/base-elements/KeelsonLidarBridge.jsx:28` is the literal string `rise/@v0/sf18/pubsub/point_cloud/**`. Point clouds published under `drone-sim-01` will not appear on the chart no matter how correct they are. Blocks the lidar half of [sf18 sensor parity](#sf18-sensor-parity); needs a Crowsnest change deriving the expression from the active platform.

- [ ] **`get_config` can never resolve for the drone, so Own Ship config is permanently offline** — `crowsnest-dev/src/apps/os_config/index.jsx` builds the RPC key as `${platform.realm}/@v0/${key}/@rpc/get_config/connector_platform`, which mismatches on **two** independent counts. The registry key is `drone_sim_01` with underscores while the entity is `drone-sim-01` with hyphens; and the responder is hardcoded `connector_platform` while the platform connector runs under `--source-id ${SOURCE_ID}`, i.e. `mavlink`. It actually serves `rise/@v0/drone-sim-01/@rpc/get_config/mavlink`. sf18 works only because its registry key equals its entity id *and* it runs the connector under a matching source id.

- [ ] **Crowsnest reads none of the platform connector's wire output** — `length_over_all_m`, `breadth_over_all_m`, `frame_transform` and `configuration_json` are all published and all ignored; `keelsonWorker.js` has no handler for any of them. Geometry reaches the chart only through the static `platform_registry.json`, and even a *successful* `get_config` merge copies just identity and dimensions — never `ccrp_m`, `frame_transforms` or `vessel_outlines`. So the `frame_transforms` and `vessel_outlines` now in `config/motorboat/platform.json` are groundwork for bino and for MCAP recording, not something visible in the UI. Making them render means adding them to the registry too.

  **The dead panel is not the worst of it.** That RPC also drives the live-versus-declared stream merge, which is what preserves declared camera streams — so it blocks the camera work too. Fix is either renaming the registry key to `drone-sim-01` or serving a `connector_platform` responder under the underscore entity; either way it is a Crowsnest change.

- [ ] **Crowsnest can publish synthetic data into a real vessel's key space** — `crowsnest-dev/src/apps/os_config/components/Simulator/SimSourceSelector.jsx:100` offers a "platform" source mode that rebuilds every simulator key as `${realm}/@v0/${key}/pubsub/${subject}/sim` from *any* entry in the platform registry. Select sf18 and a browser tab publishes synthetic position, heading and rudder into `rise/@v0/sf18/pubsub/...` on the shared RISE network, distinguished from ground truth only by a trailing `/sim` source id.

  **This repo's own design already answered the question.** bino makes `scenario.keelson.base_path` mandatory with no default — see [sf18 sensor parity](#sf18-sensor-parity) — precisely so synthetic data cannot silently collide with, or be mistaken for, real data on a shared bus. The fix belongs in Crowsnest as mandatory explicit realm scoping, but it is worth recording here because the precedent is here.

- [ ] **The drone's registry metadata is thinner than sf18's in four ways that all degrade quietly** — `liveliness: false` on all 39 streams where sf18 sets `true` on all 14, which weakens presence reconciliation in data-flow; `expected_hz` a flat `1`/`3` against sf18's real 1–25 values, which makes the staleness basis wrong; empty `camera_calibrations[]` and `frame_transforms[]`; and no `vessel_outlines` key at all, so kinematic prediction and distance measurement fall back to a rectangle derived from LOA and BOA. All of it is JSON in `crowsnest-dev/src/DB/platform_registry.json` — no publishing required.
