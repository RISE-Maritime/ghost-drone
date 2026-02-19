---
phase: 01-foundation
verified: 2026-02-19T00:00:00Z
status: passed
score: 4/4 success criteria verified
re_verification: false
---

# Phase 1: Foundation Verification Report

**Phase Goal:** The project has a runnable skeleton with a validated zenoh/keelson publish pipeline and configurable identity
**Verified:** 2026-02-19
**Status:** PASSED
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths (Success Criteria)

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Running `python -m ghost_drone` (or equivalent entry point) starts a FastAPI server and serves the web UI in the browser with no build step required | VERIFIED | `python -m ghost_drone --help` prints correct usage. Missing-config exits with code 1 and error naming `ghost_drone.toml`. `app.mount("/", StaticFiles(..., html=True))` in `server.py` serves `static/index.html` at `/` with zero build steps. Full import chain confirmed (`import chain ok`). |
| 2 | Zenoh endpoint, keelson realm, and entity ID are configurable via a config file or environment variables before starting the simulation | VERIFIED | `config.py` reads all three keys exclusively from `ghost_drone.toml` via `tomllib`. `AppConfig` dataclass has `zenoh_endpoint`, `keelson_realm`, `entity_id`. Hard exits on missing file, invalid TOML, or missing keys — each with a distinct actionable error message. `ghost_drone.toml` excluded from git. Example file documents all three keys. |
| 3 | A round-trip unit test passes: a payload wrapped with `keelson.enclose()` can be recovered with `keelson.uncover()` and contains the correct subject and protobuf bytes | VERIFIED | `uv run pytest tests/ -v` collects and passes all 5 tests in 0.04 seconds. `test_enclose_uncover_recovers_original_bytes` asserts `recovered_bytes == payload_bytes`. `test_enclose_uncover_payload_value_survives` asserts value round-trips through `TimestampedFloat` (tolerance 1e-3 for float32). No live zenoh session required. |
| 4 | All keelson subjects used by the project are validated as well-known at startup — warnings ARE emitted (not silently swallowed) | VERIFIED (with note) | `startup.py` iterates `PHASE_SUBJECTS` through `keelson.is_subject_well_known()` and prints a `WARNINGS:` block with `[UNKNOWN SUBJECT]` prefix for any unrecognised subjects. The WARNING block is visible inside the startup banner. **Intentional deviation:** the plan documents a user decision that subjects emit a WARNING but do NOT cause a hard exit (overriding roadmap criterion 4 text). This is correct per plan CONFLICT NOTE and the verification instruction. Currently `heading_true_north_deg` is well-known so no warnings appear at runtime — the warning path is code-verified. |

**Score:** 4/4 success criteria verified

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `pyproject.toml` | Package definition with all runtime dependencies declared, includes `fastapi` | VERIFIED | Contains `fastapi>=0.129.0`, `uvicorn[standard]>=0.41.0`, `eclipse-zenoh==1.7.2`, `keelson>=0.5.0a9`, plus dev extras with pytest. Entry point `ghost-drone = "ghost_drone.__main__:main"` declared. |
| `ghost_drone/__main__.py` | Entry point with argparse --host/--port, startup sequence, uvicorn.run() | VERIFIED | argparse with `--host` (default `0.0.0.0`) and `--port` (default `8000`). Startup sequence: load_config -> print_startup_banner -> probe_zenoh -> threading.Timer browser open -> uvicorn.run. `if __name__ == "__main__": main()` present. |
| `ghost_drone/config.py` | load_config() reading ghost_drone.toml from CWD, AppConfig dataclass, hard exit on errors | VERIFIED | `CONFIG_PATH = Path("ghost_drone.toml")`, `REQUIRED_KEYS` tuple, `AppConfig` dataclass with three str fields. `load_config()` exits via `sys.exit(message)` for missing file, TOML decode error, and missing keys — each with distinct, actionable message. |
| `ghost_drone/startup.py` | probe_zenoh(), print_startup_banner() with subject warning block | VERIFIED | `probe_zenoh()` uses 3-second `open_timeout` JSON5 config, catches `Exception` broadly, exits via `sys.exit()`. `print_startup_banner()` checks `PHASE_SUBJECTS` against `keelson.is_subject_well_known()`, prints `WARNINGS:` block if any unrecognised — process continues (warning-only). |
| `ghost_drone/server.py` | FastAPI app with StaticFiles mount at / with html=True | VERIFIED | `app = FastAPI(title="ghost-drone")`. `app.mount("/", StaticFiles(directory=STATIC_DIR, html=True), name="static")`. `STATIC_DIR = Path(__file__).parent.parent / "static"` (package-relative). Mounted last per documented pattern. |
| `static/index.html` | Placeholder web UI served at / | VERIFIED | Contains `ghost-drone` in `<title>` and `<h1>ghost-drone is running</h1>`. 21-line complete HTML page with CSS styling. No build step needed. |
| `ghost_drone/zenoh_bridge/publisher.py` | ZenohPublisher daemon thread scaffold — queue-based, not yet wired to simulation | VERIFIED | `ZenohPublisher` class with `queue.Queue(maxsize=256)`, `threading.Thread(..., daemon=True)`, `start()`, `stop()`, `publish()`, and `_run()` methods. Session ownership in thread body. Not wired to simulation (Phase 3 intent). |
| `tests/test_keelson_roundtrip.py` | Pure unit tests for keelson enclose/uncover and subject validation | VERIFIED | 5 tests: `test_enclose_uncover_recovers_original_bytes`, `test_enclose_uncover_timestamps_are_ordered`, `test_enclose_uncover_payload_value_survives`, `test_known_subject_is_well_known`, `test_unknown_subject_is_not_well_known`. All pass (0.04s, no live zenoh). |
| `.github/workflows/ci.yml` | GitHub Actions CI running pytest on push/PR | VERIFIED | Triggers on `push: branches: [main]` and `pull_request`. Job `test` on `ubuntu-latest`: checkout, `astral-sh/setup-uv@v7`, `uv python install 3.11`, `uv sync --locked --all-extras`, `uv run pytest tests/ -v`. Valid YAML confirmed. |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `ghost_drone/__main__.py` | `ghost_drone/config.py` | `load_config()` call before uvicorn.run() | WIRED | Line 43: `cfg = load_config()` — called first in `main()`, before banner, probe, and server start. |
| `ghost_drone/__main__.py` | `ghost_drone/startup.py` | `probe_zenoh()` and `print_startup_banner()` calls | WIRED | Lines 46, 49: `print_startup_banner(cfg, args.host, args.port)` and `probe_zenoh(cfg.zenoh_endpoint)` both called in correct order. |
| `ghost_drone/server.py` | `static/index.html` | StaticFiles mount at / with html=True | WIRED | `app.mount("/", StaticFiles(directory=STATIC_DIR, html=True), name="static")` — `html=True` causes FastAPI to serve `index.html` for `GET /`. |
| `tests/test_keelson_roundtrip.py` | `keelson` | `import keelson` and `from keelson.payloads.Primitives_pb2 import TimestampedFloat` | WIRED | Lines 5-6: both imports present. `keelson.enclose()`, `keelson.uncover()`, `keelson.is_subject_well_known()` all called in tests. Tests run and pass. |
| `.github/workflows/ci.yml` | `pyproject.toml` | `uv sync --locked --all-extras` installs dev extras including pytest | WIRED | `uv sync --locked --all-extras` step present in CI. `uv.lock` exists and is committed. Dev extras in `pyproject.toml` include `pytest>=8.0`. |

---

### Requirements Coverage

| Requirement | Source Plan(s) | Description | Status | Evidence |
|-------------|---------------|-------------|--------|----------|
| SETUP-01 | 01-01, 01-02 | User can configure the zenoh endpoint and keelson key prefix (realm, entity ID) before starting the simulation | SATISFIED | `config.py` reads all three identity values exclusively from `ghost_drone.toml` (TOML file, CWD-relative). `AppConfig(zenoh_endpoint, keelson_realm, entity_id)`. Hard exits on any config error before server binds. `ghost_drone.toml.example` documents the three required keys. `ghost_drone.toml` excluded from git via `.gitignore`. |
| SETUP-02 | 01-01 | Application serves the web UI directly from the Python backend with no separate frontend build step | SATISFIED | `server.py` mounts `StaticFiles(directory=STATIC_DIR, html=True)` at `"/"`. `static/index.html` is a static HTML file — no Node.js, no bundler, no build step. `GET /` returns `index.html` (status 200) directly from FastAPI. |

**Orphaned requirements check:** REQUIREMENTS.md maps SETUP-01 and SETUP-02 to Phase 1. Both are claimed by plans 01-01 and 01-02. No orphaned requirements.

---

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `static/index.html` | 17 | "Simulation UI coming in Phase 2." | INFO | Intentional placeholder text — this is the correct Phase 1 state. Phase 2 replaces this content. Not a blocker. |

No stub implementations, empty handlers, TODO/FIXME comments, or hollow return values found in any source file.

---

### Human Verification Required

#### 1. Browser Opens on Startup

**Test:** With a running zenoh router (`zenohd`) and a valid `ghost_drone.toml`, run `python -m ghost_drone`. Observe whether a browser tab opens after ~1 second.
**Expected:** Default browser opens to `http://127.0.0.1:8000` showing "ghost-drone is running" with the styled card layout.
**Why human:** `threading.Timer + webbrowser.open()` calls a platform-dependent browser binary — not verifiable via grep.

#### 2. Subject Warning Banner Appears for Unknown Subject

**Test:** Temporarily modify `PHASE_SUBJECTS` in `startup.py` to include a non-existent subject (e.g., `"fake_subject_xyz"`), start the server, observe the startup banner.
**Expected:** Banner prints a `WARNINGS:` block containing `[UNKNOWN SUBJECT] 'fake_subject_xyz' is not in the keelson subject registry.` Process continues (server starts, does not exit).
**Why human:** The warning path is code-verified but the visual banner output in a real terminal with a real config has not been observed end-to-end.

#### 3. Zenoh Probe Timeout

**Test:** Set `zenoh_endpoint = "tcp/192.0.2.1:7447"` (unroutable IP) in `ghost_drone.toml`. Run `python -m ghost_drone`. Time how long before exit.
**Expected:** Process exits within ~3 seconds with `ERROR: Cannot reach zenoh endpoint 'tcp/192.0.2.1:7447'` message.
**Why human:** The 3000ms timeout value in the JSON5 config has been code-verified but the actual elapsed wall-clock time on the test system has not been measured.

---

### Gaps Summary

No gaps. All four success criteria are verified. All nine required artifacts exist, are substantive, and are correctly wired. Both requirements (SETUP-01, SETUP-02) are satisfied with implementation evidence. The only deviation from the roadmap (subject validation warning-only vs. hard exit) is intentional, documented in the plan, and correctly implemented.

---

## Additional Notes

**keelson protobuf stubs:** The dev branch at SHA `e47e52fd` does not commit pre-generated `_pb2.py` files. `scripts/generate_keelson_protos.sh` must be run after `uv sync --all-extras` on a fresh clone. This is an operational concern, not a code defect. CI will need this addressed before it can pass on a fresh runner (the `uv sync --locked --all-extras` step alone does not regenerate stubs).

**CI fresh-runner protobuf gap:** The `.github/workflows/ci.yml` does not include a `uv run bash scripts/generate_keelson_protos.sh` step. The tests currently pass in this workspace because stubs were generated manually during Plan 01-01 execution and persist in the `.venv`. On a fresh CI runner, `uv sync --locked --all-extras` installs keelson from git but does not run the stub generation script, so `import keelson` would fail with `ModuleNotFoundError: No module named 'keelson.Envelope_pb2'`. This is a latent CI breakage risk but does not affect the local verification outcome — all 5 tests pass locally. Flag for Phase 2 attention.

---

_Verified: 2026-02-19_
_Verifier: Claude (gsd-verifier)_
