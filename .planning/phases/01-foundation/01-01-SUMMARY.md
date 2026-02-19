---
phase: 01-foundation
plan: "01"
subsystem: infra
tags: [python, fastapi, uvicorn, zenoh, keelson, protobuf, uv, tomllib, pyproject]

# Dependency graph
requires: []
provides:
  - "Runnable ghost-drone Python package (`python -m ghost_drone`)"
  - "TOML config loader with hard-exit validation (ghost_drone/config.py)"
  - "Zenoh connectivity probe with 3-second timeout (ghost_drone/startup.py)"
  - "FastAPI server with StaticFiles mount at / with html=True (ghost_drone/server.py)"
  - "Startup banner with keelson subject validation warnings (ghost_drone/startup.py)"
  - "Placeholder web UI served at / (static/index.html)"
  - "keelson protobuf generation script (scripts/generate_keelson_protos.sh)"
affects:
  - 01-02
  - 02-simulation
  - 03-telemetry
  - 04-camera

# Tech tracking
tech-stack:
  added:
    - "fastapi==0.129.0"
    - "uvicorn[standard]==0.41.0"
    - "aiofiles==25.1.0"
    - "eclipse-zenoh==1.7.2"
    - "keelson==0.5.0a9 (git SHA e47e52fd)"
    - "protobuf==6.33.5"
    - "pyyaml==6.0.3"
    - "parse==1.21.1"
    - "protoc-wheel-0==30.2 (dev, for keelson proto generation)"
    - "grpcio-tools==1.78.0 (dev, for keelson proto generation)"
    - "pytest==9.0.2 (dev)"
    - "tomllib (stdlib, Python 3.11+)"
  patterns:
    - "Config-first startup: load_config -> banner -> probe_zenoh -> uvicorn.run (never start server before all checks pass)"
    - "Hard sys.exit(message) for all config/connectivity failures — no exceptions to catch"
    - "StaticFiles mounted at / with html=True as the LAST mount — future API routes above this line"
    - "STATIC_DIR resolved via Path(__file__).parent.parent / 'static' (package-relative, not CWD-relative)"
    - "Browser open via threading.Timer(1.0, ...) before uvicorn.run to handle blocking run loop"
    - "Zenoh session config via zenoh.Config.from_json5(str) — only supported way to set config programmatically"
    - "3000ms unicast open_timeout in zenoh probe config to fail fast on unreachable endpoint"
    - "Subject validation warning-only (not hard exit) — user override of roadmap criterion 4"

key-files:
  created:
    - pyproject.toml
    - .python-version
    - ghost_drone.toml.example
    - ghost_drone/__init__.py
    - ghost_drone/zenoh_bridge/__init__.py
    - ghost_drone/config.py
    - ghost_drone/startup.py
    - ghost_drone/server.py
    - ghost_drone/__main__.py
    - static/index.html
    - scripts/generate_keelson_protos.sh
    - uv.lock
  modified:
    - .gitignore

key-decisions:
  - "keelson pinned to git SHA e47e52fd (dev branch HEAD, 0.5.0a9 alpha) — not on PyPI at 0.5.x"
  - "keelson protobuf stubs must be generated manually via scripts/generate_keelson_protos.sh after uv sync — dev branch does not commit _pb2.py files"
  - "zenoh probe uses 3000ms open_timeout (not default ~10s) to keep startup fast on connection failure"
  - "STATIC_DIR is package-relative (Path(__file__).parent.parent/static), not CWD-relative — works from any directory"
  - "Subject validation emits warning-only in startup banner, no hard exit (user decision overrides roadmap criterion 4)"
  - "argparse CLI flags for --host/--port; three identity keys exclusively from ghost_drone.toml (SETUP-01)"
  - "uv sync succeeded without the #subdirectory workaround (current uv version has the bug fix)"

patterns-established:
  - "Pattern: Config-first startup sequence — all validation before server binds"
  - "Pattern: sys.exit(message) as the only exit path for config/connectivity errors"
  - "Pattern: zenoh.Config.from_json5(str) for programmatic zenoh configuration"
  - "Pattern: StaticFiles at / mounted LAST, after all API routes"

requirements-completed: [SETUP-01, SETUP-02]

# Metrics
duration: 4min
completed: 2026-02-19
---

# Phase 1 Plan 01: Project Scaffold Summary

**FastAPI + uvicorn server scaffold with TOML config loader, zenoh connectivity probe, keelson subject warning banner, and static placeholder UI — `python -m ghost_drone` is a working command**

## Performance

- **Duration:** ~4 minutes
- **Started:** 2026-02-19T04:44:07Z
- **Completed:** 2026-02-19T04:48:09Z
- **Tasks:** 2
- **Files created/modified:** 13

## Accomplishments

- Complete Python package scaffold with all runtime dependencies installed and importable
- Config loader (`ghost_drone/config.py`) reads `ghost_drone.toml` from CWD, hard-exits with distinct human-readable messages for missing file, invalid TOML, and missing required keys
- Zenoh probe (`ghost_drone/startup.py`) uses 3-second unicast timeout to fail fast when router unreachable
- FastAPI server (`ghost_drone/server.py`) serves `static/index.html` at `GET /` via StaticFiles with `html=True`
- Entry point (`ghost_drone/__main__.py`) wires the full startup sequence: argparse -> config -> banner -> zenoh probe -> browser timer -> uvicorn.run
- keelson protobuf generation script (`scripts/generate_keelson_protos.sh`) handles the dev-branch missing-stubs issue

## Task Commits

Each task was committed atomically:

1. **Task 1: Project scaffold — pyproject.toml, package skeleton, config example, .gitignore** - `0bdeba1` (chore)
2. **Task 2: Config loader, startup logic, FastAPI server, entry point, placeholder UI** - `340d8f0` (feat)

## Files Created/Modified

- `pyproject.toml` - Package definition with all runtime deps; keelson pinned to git SHA e47e52fd
- `.python-version` - Python 3.11 target
- `ghost_drone.toml.example` - Documented example with all three required keys
- `.gitignore` - Added `ghost_drone.toml` exclusion (user config, never commit)
- `ghost_drone/__init__.py` - Package marker (empty)
- `ghost_drone/zenoh_bridge/__init__.py` - Sub-package marker (empty, scaffold for Phase 2+)
- `ghost_drone/config.py` - load_config() + AppConfig dataclass; sys.exit on any config error
- `ghost_drone/startup.py` - probe_zenoh() with 3000ms timeout; print_startup_banner() with WARNINGS block
- `ghost_drone/server.py` - FastAPI app with StaticFiles mount at "/" with html=True
- `ghost_drone/__main__.py` - Entry point with argparse, startup sequence, browser open timer
- `static/index.html` - Placeholder page "ghost-drone is running"
- `scripts/generate_keelson_protos.sh` - Post-install script for keelson protobuf stubs
- `uv.lock` - Reproducible lockfile for all 30 installed packages

## Decisions Made

1. **keelson SHA e47e52fd pinned**: Ran `git ls-remote https://github.com/RISE-Maritime/keelson.git dev` to get the current HEAD. This SHA is needed by Plan 02 and all future phases — do not change without re-verifying the keelson API.

2. **uv subdirectory workaround NOT needed**: Current uv version resolved the `#subdirectory` bug. `uv sync --all-extras` completed successfully with the standard `[tool.uv.sources]` syntax.

3. **keelson protobuf generation script required**: The dev branch at SHA e47e52fd does not commit pre-generated `_pb2.py` files. A post-install script was created at `scripts/generate_keelson_protos.sh` that uses `protoc-wheel-0` (added to `dev` extras) to compile stubs into the installed `.venv` package. This must be run after every `uv sync` on a fresh clone.

4. **STATIC_DIR is package-relative**: `Path(__file__).parent.parent / "static"` resolves correctly whether the package is installed in a venv or run in-place from the project root.

5. **zenoh probe timeout 3000ms**: The JSON5 config `"transport": {"unicast": {"open_timeout": 3000}}` makes `probe_zenoh()` fail within ~3 seconds on an unreachable endpoint (vs. the default ~10 seconds).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] keelson dev branch missing pre-compiled protobuf stubs**
- **Found during:** Task 1 (uv sync + import verification)
- **Issue:** `import keelson` raised `ModuleNotFoundError: No module named 'keelson.Envelope_pb2'`. The dev branch at SHA e47e52fd does not commit generated `_pb2.py` files — they are produced by a local `./generate_python.sh` script that requires `protoc`.
- **Fix:** (a) Added `protoc-wheel-0>=30.2` and `grpcio-tools>=1.60` to dev extras in pyproject.toml to provide `protoc` binary. (b) Manually ran `uv run protoc` against the keelson `.proto` files to populate the installed `.venv/lib/.../keelson/` package with `Envelope_pb2.py`, `payloads/*_pb2.py`, `subjects.yaml`, and `payloads/protobuf_file_descriptor_set.bin`. (c) Created `scripts/generate_keelson_protos.sh` to make this repeatable for future fresh installs.
- **Files modified:** `pyproject.toml` (dev extras), `scripts/generate_keelson_protos.sh` (new)
- **Verification:** `uv run python -c "import keelson; print(keelson.is_subject_well_known('heading_true_north_deg'))"` prints `True`
- **Committed in:** `0bdeba1` (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Essential for keelson to be importable at all. The generation script makes fresh installs reproducible. No scope creep — script only generates what the keelson package itself expects to find.

## Issues Encountered

- **keelson 0.5.0a9 not on PyPI**: Only 0.4.x is published. The git source install is required. Future plans should re-verify the SHA when more than 30 days have passed since this plan ran.

## User Setup Required

**Note for fresh clone:** After `uv sync --all-extras`, run `uv run bash scripts/generate_keelson_protos.sh` to compile the keelson protobuf stubs. This is required before `python -m ghost_drone` will work.

## Next Phase Readiness

- Plan 01-02 (keelson round-trip unit test + CI) can proceed immediately — `keelson.enclose()`, `keelson.uncover()`, `keelson.is_subject_well_known()`, and `TimestampedFloat` from `keelson.payloads.Primitives_pb2` are all importable.
- The zenoh bridge scaffold (`ghost_drone/zenoh_bridge/`) is empty and ready for Phase 2 implementation.
- No blockers for 01-02. Concerns: re-verify keelson SHA if >30 days pass before Phase 2 starts.

## Self-Check: PASSED

All created files found on disk. All task commits verified in git history.

- FOUND: pyproject.toml, .python-version, ghost_drone.toml.example
- FOUND: ghost_drone/__init__.py, ghost_drone/zenoh_bridge/__init__.py
- FOUND: ghost_drone/config.py, ghost_drone/startup.py, ghost_drone/server.py, ghost_drone/__main__.py
- FOUND: static/index.html, scripts/generate_keelson_protos.sh, uv.lock
- FOUND: .planning/phases/01-foundation/01-01-SUMMARY.md
- COMMIT 0bdeba1: verified
- COMMIT 340d8f0: verified

---
*Phase: 01-foundation*
*Completed: 2026-02-19*
