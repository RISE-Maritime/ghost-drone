# Phase 1: Foundation - Research

**Researched:** 2026-02-18
**Domain:** Python project scaffold — FastAPI + uvicorn, TOML config, zenoh/keelson publish helper, pytest CI
**Confidence:** HIGH (all major findings verified via official docs or keelson source)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

#### Configuration design
- Format: TOML (`ghost_drone.toml`)
- Location: Fixed path — current working directory (CWD) where `python -m ghost_drone` is run
- Required keys: `zenoh_endpoint`, `keelson_realm`, `entity_id` — nothing else for Phase 1
- Missing or invalid config: hard exit with a clear, human-readable error message explaining what is wrong or missing

#### Startup behavior
- On success: print a summary block showing loaded config values (zenoh endpoint, realm, entity ID) and the server URL
- Server binds to a configurable host:port; default `0.0.0.0:8000`
- Host/port configurable (how — file vs flag — Claude's discretion)
- Auto-open the browser at the bound URL when the server starts
- Zenoh connectivity probed at startup; if zenoh is unreachable, hard exit with a clear error (do not start the server)

#### Test scope & environment
- Round-trip test is a pure unit test: no live zenoh session required
- Tests only the keelson `enclose()` / `uncover()` round-trip in-process
- Test runner: pytest
- CI: GitHub Actions on push/PR — runs pytest automatically
- Target Python version: 3.11

#### Subject validation
- Behavior: log a visible warning in the startup summary block (not a hard exit)
- ⚠️ CONFLICT WITH ROADMAP: Roadmap success criterion 4 requires hard exit for unrecognised subjects; user has overridden this to warning + continue. Planner should surface this conflict before finalising tasks.
- Subject list source: queried from the keelson SDK at runtime (not hardcoded)
- Warning format: included in the startup summary banner so it cannot be missed

### Claude's Discretion
- Exact warning message wording
- How host:port is made configurable (CLI flag vs config file key vs env var)
- Which keelson subject(s) are needed for the Phase 1 round-trip test helper
- Compression, packaging, and dependency management details

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SETUP-01 | User can configure the zenoh endpoint and keelson key prefix (realm, entity ID) before starting the simulation | TOML parsing via `tomllib` (stdlib, Python 3.11+); required keys documented; hard-exit validation pattern with `sys.exit(1)` and readable messages |
| SETUP-02 | Application serves the web UI directly from the Python backend with no separate frontend build step | FastAPI `StaticFiles` mount with `html=True`; single `static/index.html` served at `/`; `aiofiles` required dependency |
</phase_requirements>

---

## Summary

Phase 1 builds the runnable skeleton: a FastAPI server that reads a TOML config file, validates zenoh connectivity, and exposes a static HTML page — no simulation, no real telemetry. The zenoh/keelson publish helper is scaffolded and covered by a pure unit test that exercises the `enclose()`/`uncover()` round-trip in-process with no live zenoh session.

Python 3.11's `tomllib` is stdlib — no extra dependency needed to read `ghost_drone.toml`. The FastAPI + uvicorn combination handles both static file serving and future WebSocket endpoints in one process. Zenoh connectivity is probed by attempting `zenoh.open()` with the configured endpoint before starting uvicorn; failure exits immediately with a human-readable error. The browser auto-open uses `webbrowser.open()` called from inside the FastAPI lifespan handler after the server is confirmed listening.

The keelson SDK's `_SUBJECTS` dict is loaded automatically at import time from a bundled `subjects.yaml`. Subject validation uses `keelson.is_subject_well_known(subject)` — there is no public `list_subjects()` function. For Phase 1, only the subjects needed for the round-trip test helper need checking; all warnings appear in the startup banner.

**Primary recommendation:** Use `argparse` CLI flags for `--host` and `--port` (defaulting to `0.0.0.0` and `8000`), with the three identity keys coming exclusively from `ghost_drone.toml`. This keeps the config file clean and follows the convention of runtime tunables as flags.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Python | 3.11 | Runtime | keelson SDK requires `>=3.11`; `tomllib` stdlib is 3.11+ only |
| tomllib | stdlib (3.11+) | Read `ghost_drone.toml` | No extra dependency; built-in TOML 1.0 parser; raises `TOMLDecodeError` (subclass of `ValueError`) on bad syntax |
| FastAPI | 0.129.0 | HTTP server + future WebSocket/REST | Async-native; serves static files; works in same event loop as simulation |
| uvicorn[standard] | 0.41.0 | ASGI runner | Standard FastAPI pairing; `uvicorn[standard]` adds uvloop + httptools |
| eclipse-zenoh | 1.7.2 | Zenoh session for connectivity probe + daemon publisher thread | Official Python binding; 1.x rewrote API to Rust-backed PyO3 |
| keelson | 0.5.0a9 (pinned SHA) | `enclose()`/`uncover()`, `construct_pubsub_key()`, `is_subject_well_known()` | Only correct way to produce keelson-compatible envelopes |
| protobuf | >=5.29.1 | Serialize keelson payloads | Required by keelson SDK; use `google.protobuf`, NOT betterproto |
| aiofiles | >=23.0 | Async static file serving | Required by FastAPI `StaticFiles` |

### Supporting (Phase 1)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| pyyaml | >=6.0 | Loaded internally by keelson | Transitive dep — keelson reads `subjects.yaml` at import |
| parse | >=1.19 | Key expression parsing | Transitive dep — keelson SDK |
| pytest | >=8.0 | Test runner | CI and local test runs |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `argparse` for --host/--port | Config file keys or env vars | Config file mixes identity (stable) with tunables (per-run); env vars are hidden from help output. CLI flags are self-documenting and override-friendly. Use `argparse`. |
| `tomllib` (stdlib) | `tomlkit`, `tomli` | No reason to add a dependency for read-only parsing on Python 3.11. Use stdlib. |
| `webbrowser.open()` in lifespan | `subprocess.Popen(["open", url])` | `webbrowser` is stdlib and cross-platform. Use it. |

### Installation

```bash
# Using uv (recommended)
uv init ghost-drone --package
uv add fastapi "uvicorn[standard]" aiofiles
uv add "eclipse-zenoh==1.7.2"
uv add "protobuf>=5.29.1" pyyaml parse
uv add --optional dev pytest

# keelson — pinned to a specific commit SHA (alpha SDK, API may shift)
# Find the current HEAD SHA of the dev branch and pin it:
uv add "keelson @ git+https://github.com/RISE-Maritime/keelson.git@<SHA>#subdirectory=sdks/python"
```

**Note on keelson + uv:** The `#subdirectory` parameter bug in uv ≤0.5.7 is fixed in current versions. Install with uv using the syntax above. If uv still fails, fall back to `pip install` for the keelson dependency only and document it.

---

## Architecture Patterns

### Recommended Project Structure

```
ghost-drone/
├── ghost_drone/
│   ├── __init__.py
│   ├── __main__.py          # Entry point: argparse, config load, startup sequence
│   ├── config.py            # load_config(), validate_config(), AppConfig dataclass
│   ├── startup.py           # probe_zenoh(), print_startup_banner(), open_browser()
│   ├── server.py            # FastAPI app factory, lifespan, StaticFiles mount
│   └── zenoh_bridge/
│       ├── __init__.py
│       └── publisher.py     # ZenohPublisher (daemon thread + queue) — scaffold only in Phase 1
├── static/
│   └── index.html           # Placeholder web UI — "ghost-drone is running" page
├── tests/
│   └── test_keelson_roundtrip.py   # Pure unit test: enclose/uncover
├── ghost_drone.toml         # Sample config (not committed — .gitignore)
├── ghost_drone.toml.example # Committed example config
├── pyproject.toml
├── .python-version          # "3.11"
├── uv.lock
└── .github/
    └── workflows/
        └── ci.yml           # pytest on push/PR
```

### Pattern 1: Startup Sequence in `__main__.py`

**What:** All startup logic runs sequentially before `uvicorn.run()` is called. Any failure exits with `sys.exit(1)` and a human-readable message before the server ever binds.

**When to use:** Phase 1 entrypoint — this is the enforced order.

```python
# ghost_drone/__main__.py
import argparse
import sys
import webbrowser
import threading
import uvicorn
from ghost_drone.config import load_config
from ghost_drone.startup import probe_zenoh, print_startup_banner

def main():
    parser = argparse.ArgumentParser(description="ghost-drone simulator")
    parser.add_argument("--host", default="0.0.0.0", help="Bind host (default: 0.0.0.0)")
    parser.add_argument("--port", type=int, default=8000, help="Bind port (default: 8000)")
    args = parser.parse_args()

    # 1. Load and validate config — hard exit on failure
    cfg = load_config()  # reads ghost_drone.toml from CWD; exits on error

    # 2. Validate keelson subjects — warning only, continues
    # (done inside load_config or startup banner)

    # 3. Probe zenoh — hard exit if unreachable
    probe_zenoh(cfg.zenoh_endpoint)  # exits on failure

    # 4. Print startup banner
    print_startup_banner(cfg, args.host, args.port)

    # 5. Open browser after brief delay (server needs a moment to bind)
    url = f"http://{args.host if args.host != '0.0.0.0' else '127.0.0.1'}:{args.port}"
    threading.Timer(1.0, lambda: webbrowser.open(url)).start()

    # 6. Start server
    from ghost_drone.server import app
    uvicorn.run(app, host=args.host, port=args.port)

if __name__ == "__main__":
    main()
```

### Pattern 2: TOML Config Loading with Hard Exit

**What:** `tomllib` reads the config file in binary mode. Missing file and missing keys each produce a distinct, human-readable error message before `sys.exit(1)`.

```python
# ghost_drone/config.py
import sys
import tomllib
from dataclasses import dataclass
from pathlib import Path

CONFIG_PATH = Path("ghost_drone.toml")
REQUIRED_KEYS = ("zenoh_endpoint", "keelson_realm", "entity_id")

@dataclass
class AppConfig:
    zenoh_endpoint: str
    keelson_realm: str
    entity_id: str

def load_config() -> AppConfig:
    if not CONFIG_PATH.exists():
        sys.exit(
            f"ERROR: Configuration file not found: {CONFIG_PATH.resolve()}\n"
            f"Create ghost_drone.toml in the current directory.\n"
            f"See ghost_drone.toml.example for the required format."
        )
    try:
        with CONFIG_PATH.open("rb") as f:
            raw = tomllib.load(f)
    except tomllib.TOMLDecodeError as e:
        sys.exit(f"ERROR: ghost_drone.toml is not valid TOML:\n  {e}")

    missing = [k for k in REQUIRED_KEYS if k not in raw]
    if missing:
        sys.exit(
            f"ERROR: ghost_drone.toml is missing required keys: {', '.join(missing)}\n"
            f"Required keys: {', '.join(REQUIRED_KEYS)}"
        )

    return AppConfig(
        zenoh_endpoint=raw["zenoh_endpoint"],
        keelson_realm=raw["keelson_realm"],
        entity_id=raw["entity_id"],
    )
```

### Pattern 3: Zenoh Connectivity Probe

**What:** Attempt to open a zenoh session with the configured endpoint and a short timeout. If it raises, exit hard. If it succeeds, close it immediately — the real publisher thread opens its own session later.

**Caveat (MEDIUM confidence):** `zenoh.open()` in client mode targeting an unreachable endpoint may block for a transport-level timeout (default ~10s for `transport.unicast.open_timeout`). The session can be configured with a JSON5 string to set a shorter timeout, but the exact behavior on failure (exception vs. silent return) is not clearly documented in the 1.x Python API reference. The safe implementation catches any exception from `zenoh.open()`.

```python
# ghost_drone/startup.py
import sys
import zenoh

def probe_zenoh(endpoint: str) -> None:
    """Attempt to open a zenoh session. Hard exit if unreachable."""
    conf_str = f'{{"connect": {{"endpoints": ["{endpoint}"]}}}}'
    try:
        conf = zenoh.Config.from_json5(conf_str)
        with zenoh.open(conf):
            pass  # Session opened and immediately closed
    except Exception as e:
        sys.exit(
            f"ERROR: Cannot reach zenoh endpoint '{endpoint}'\n"
            f"  {type(e).__name__}: {e}\n"
            f"Is the zenoh router running? Check the zenoh_endpoint in ghost_drone.toml."
        )
```

### Pattern 4: FastAPI App with StaticFiles

**What:** Static HTML served from `static/` directory at root with `html=True` so `index.html` is served at `/`. This satisfies SETUP-02.

```python
# ghost_drone/server.py
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pathlib import Path

STATIC_DIR = Path(__file__).parent.parent / "static"

app = FastAPI(title="ghost-drone")
app.mount("/", StaticFiles(directory=STATIC_DIR, html=True), name="static")
```

**Note:** `html=True` on `StaticFiles` serves `index.html` at `/` automatically. Requires `aiofiles` to be installed. Static files must exist at the time `uvicorn.run()` is called.

### Pattern 5: Keelson Enclose/Uncover Round-Trip

**What:** Pure in-process test. No zenoh session required. Uses a real protobuf message type from the keelson SDK.

```python
# tests/test_keelson_roundtrip.py
import keelson
from keelson.payloads.Primitives_pb2 import TimestampedFloat

def test_enclose_uncover_timestamped_float():
    subject = "heading_true_north_deg"  # well-known subject

    # Build a protobuf payload
    msg = TimestampedFloat()
    msg.value = 42.7
    msg.timestamp.GetCurrentTime()
    payload_bytes = msg.SerializeToString()

    # Wrap in keelson envelope
    envelope_bytes = keelson.enclose(payload_bytes)

    # Unwrap
    received_at, enclosed_at, recovered_bytes = keelson.uncover(envelope_bytes)

    assert recovered_bytes == payload_bytes
    assert received_at >= enclosed_at > 0

    # Verify payload decodes to original value
    recovered_msg = TimestampedFloat()
    recovered_msg.ParseFromString(recovered_bytes)
    assert abs(recovered_msg.value - 42.7) < 1e-6

def test_subject_is_well_known():
    assert keelson.is_subject_well_known("heading_true_north_deg")
    assert not keelson.is_subject_well_known("random_mumbo_jumbo")
```

### Pattern 6: Subject Validation Warning in Startup Banner

**What:** Check each subject the project will use against `keelson.is_subject_well_known()`. Print warnings in the startup banner. Since there is no public `list_subjects()` function, enumerate subjects explicitly in one place.

```python
# ghost_drone/startup.py (continued)
import keelson

# Phase 1 subjects — expand in later phases
PHASE_SUBJECTS = [
    "heading_true_north_deg",  # used in round-trip test helper
]

def print_startup_banner(cfg, host: str, port: str) -> None:
    display_host = "127.0.0.1" if host == "0.0.0.0" else host
    url = f"http://{display_host}:{port}"

    subject_warnings = [
        s for s in PHASE_SUBJECTS if not keelson.is_subject_well_known(s)
    ]

    print("=" * 60)
    print("  ghost-drone")
    print("=" * 60)
    print(f"  Zenoh endpoint : {cfg.zenoh_endpoint}")
    print(f"  Realm          : {cfg.keelson_realm}")
    print(f"  Entity ID      : {cfg.entity_id}")
    print(f"  Server URL     : {url}")
    if subject_warnings:
        print()
        print("  WARNINGS:")
        for s in subject_warnings:
            print(f"    [UNKNOWN SUBJECT] '{s}' is not in the keelson subject registry.")
            print(f"    Publishing will proceed but this subject may be unrecognised")
            print(f"    by keelson consumers. Check subjects.yaml for valid names.")
    print("=" * 60)
```

### Pattern 7: GitHub Actions CI Workflow

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install uv
        uses: astral-sh/setup-uv@v7
        with:
          enable-cache: true

      - name: Set Python version
        run: uv python install 3.11

      - name: Install dependencies
        run: uv sync --locked --all-extras

      - name: Run tests
        run: uv run pytest tests/ -v
```

### Anti-Patterns to Avoid

- **Calling `webbrowser.open()` at module import time:** The server is not listening yet. Call it from a `threading.Timer` after `uvicorn.run()` is invoked, or at the end of the startup sequence with a 1-second delay.
- **Calling `uvicorn.run()` before all validation passes:** Any startup failure (config, zenoh probe) must exit before the server ever binds.
- **Calling zenoh API from a callback:** All zenoh publishing must go through a `queue.Queue` + daemon thread, never from an asyncio callback or subscriber handler.
- **Mounting `StaticFiles` without `html=True`:** Without this flag, `GET /` returns 404 instead of serving `index.html`.
- **Reading TOML in text mode:** `tomllib.load()` requires binary mode (`"rb"`). Text mode raises `TypeError`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| TOML parsing | Custom regex/string parser | `tomllib` (stdlib) | Handles TOML 1.0 spec edge cases (multi-line strings, inline tables, dates) |
| Static file serving with 404 fallback | Manual route for each static file | `StaticFiles(html=True)` | Handles MIME types, caching headers, directory traversal protection |
| Zenoh Config with endpoint | Manually editing JSON config dicts | `zenoh.Config.from_json5(str)` | The Config object is opaque; `from_json5` is the official way to programmatically set properties |
| Protobuf timestamp | `int(time.time())` | `msg.timestamp.GetCurrentTime()` | Zenoh/keelson uses nanoseconds; protobuf Timestamp is in seconds + nanos; `GetCurrentTime()` handles precision correctly |
| Keelson envelope format | Custom bytes framing | `keelson.enclose()` / `keelson.uncover()` | Envelope is a protobuf `Envelope` message with `enclosed_at` Timestamp field; hand-rolling breaks compatibility with all other keelson consumers |

**Key insight:** The keelson SDK is thin but must not be bypassed. Any custom wrapping breaks compatibility with keelson subscribers, dashboards, and loggers.

---

## Common Pitfalls

### Pitfall 1: `zenoh.open()` Blocking Indefinitely on Unreachable Endpoint

**What goes wrong:** When configured to connect to a specific endpoint (client mode) and that endpoint is unreachable, `zenoh.open()` may block for a long time (default `transport.unicast.open_timeout`) before failing, making the startup probe feel frozen.

**Why it happens:** Zenoh's transport layer retries connection attempts. In peer mode (default, no connect endpoint), `zenoh.open()` returns immediately. In client mode with an explicit endpoint, it retries until timeout.

**How to avoid:** Set `transport.unicast.open_timeout` in the JSON5 config string to a short value (e.g., 3000ms). Wrap the probe in a thread with `threading.Timer` timeout as a last resort.

**Warning signs:** `probe_zenoh()` takes more than 2 seconds when the endpoint is known to be down.

```python
# Shorter timeout variant
conf_str = (
    f'{{"connect": {{"endpoints": ["{endpoint}"]}}, '
    f'"transport": {{"unicast": {{"open_timeout": 3000}}}}}}'
)
```

### Pitfall 2: `StaticFiles` Mount Shadowing API Routes

**What goes wrong:** If `StaticFiles` is mounted at `/` before FastAPI routes are declared, it intercepts all requests including future API calls.

**Why it happens:** Mounts are evaluated in declaration order; a catch-all `/` mount catches everything.

**How to avoid:** Mount `StaticFiles` at `/` LAST, after all other routes and WebSocket endpoints are registered. Or mount at `/ui` and add a redirect from `/` to `/ui/`.

**Warning signs:** POST to `/api/route` returns a 405 Method Not Allowed or serves `index.html` instead of hitting the FastAPI handler.

### Pitfall 3: Keelson Package Install Fails via uv with `#subdirectory`

**What goes wrong:** `uv add "keelson @ git+...#subdirectory=sdks/python"` may fail on older uv versions (≤0.5.7) with a metadata name mismatch error.

**Why it happens:** uv bug in reading metadata from monorepo subdirectory packages (fixed in uv post-0.5.7).

**How to avoid:** Ensure uv is current (run `uv self update`). If still broken, fall back to `pip install` for the keelson dep and document it. As a workaround, use `pip install` within the uv-managed venv: `uv run pip install "git+...#subdirectory=sdks/python"`.

**Warning signs:** Error message: "Package metadata name `keelson` does not match given name."

### Pitfall 4: `tomllib` Requires Binary File Mode

**What goes wrong:** `tomllib.load(open("config.toml"))` raises `TypeError: expected a binary file; got TextIOWrapper`.

**Why it happens:** TOML spec requires UTF-8; `tomllib` enforces binary mode to control encoding handling.

**How to avoid:** Always: `with CONFIG_PATH.open("rb") as f: tomllib.load(f)`

### Pitfall 5: `webbrowser.open()` Called Before Server Is Listening

**What goes wrong:** Browser opens, gets "connection refused", user sees an error page.

**Why it happens:** `uvicorn.run()` is blocking — code after it doesn't run until the server stops. `webbrowser.open()` must be called before `uvicorn.run()` but with a delay so the server has time to bind.

**How to avoid:** Use `threading.Timer(1.0, lambda: webbrowser.open(url)).start()` immediately before `uvicorn.run()`. The 1-second delay is sufficient for uvicorn to bind.

### Pitfall 6: `sys.exit()` with a String Prints to stdout, Not stderr

**What goes wrong:** `sys.exit("ERROR: ...")` actually prints the message to **stderr** (correct behavior) but returns exit code 1. This is correct Python behavior but worth noting — don't use `print()` + `sys.exit(1)` separately; just use `sys.exit(message_string)`.

---

## Code Examples

Verified patterns from official sources:

### tomllib TOML Load (stdlib, Python 3.11+)
```python
# Source: https://docs.python.org/3.11/library/tomllib.html
import tomllib

with open("ghost_drone.toml", "rb") as f:
    config = tomllib.load(f)
# Raises tomllib.TOMLDecodeError (subclass of ValueError) on invalid TOML
```

### Zenoh Config with Endpoint (from zenoh.io docs)
```python
# Source: https://zenoh.io/docs/manual/configuration/
import zenoh

conf = zenoh.Config.from_json5(
    '{"connect": {"endpoints": ["tcp/127.0.0.1:7447"]}}'
)
with zenoh.open(conf) as session:
    session.put("demo/example/hello", b"Hello")
```

### Keelson enclose/uncover (from keelson SDK source)
```python
# Source: https://github.com/RISE-Maritime/keelson/blob/dev/sdks/python/keelson/__init__.py
import keelson

# enclose(payload: bytes, enclosed_at: int = None) -> bytes
envelope_bytes = keelson.enclose(payload_bytes)

# uncover(message) -> Tuple[received_at: int, enclosed_at: int, payload: bytes]
received_at, enclosed_at, payload = keelson.uncover(envelope_bytes)
```

### Keelson Subject Check (from keelson SDK source)
```python
# Source: https://github.com/RISE-Maritime/keelson/blob/dev/sdks/python/keelson/__init__.py
import keelson

keelson.is_subject_well_known("heading_true_north_deg")  # True
keelson.is_subject_well_known("random_mumbo_jumbo")      # False

# There is NO public list_subjects() function.
# _SUBJECTS is loaded from subjects.yaml at module import time.
# Enumerate the subjects your project uses explicitly in code.
```

### Keelson construct_pubsub_key (from keelson SDK source)
```python
# KEELSON_PUB_SUB_KEY_FORMAT = "{base_path}/@v0/{entity_id}/pubsub/{subject}/{source_id}"
key = keelson.construct_pubsub_key(
    base_path="ghost-drone",   # = keelson_realm
    entity_id="sim001",        # = entity_id
    subject="heading_true_north_deg",
    source_id="sim",
)
# -> "ghost-drone/@v0/sim001/pubsub/heading_true_north_deg/sim"
```

### FastAPI StaticFiles Mount (from FastAPI official docs)
```python
# Source: https://fastapi.tiangolo.com/tutorial/static-files/
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()
# Mount AFTER all other routes to avoid shadowing
app.mount("/", StaticFiles(directory="static", html=True), name="static")
```

### GitHub Actions CI with uv (from astral.sh/uv docs)
```yaml
# Source: https://docs.astral.sh/uv/guides/integration/github/
- name: Install uv
  uses: astral-sh/setup-uv@v7
  with:
    enable-cache: true
- name: Install dependencies
  run: uv sync --locked --all-extras
- name: Run tests
  run: uv run pytest tests/ -v
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `pip` + `requirements.txt` | `uv` + `pyproject.toml` + `uv.lock` | 2023-2024 | Faster installs, reproducible lockfile, single tool for venv + deps |
| `tomli` (third-party) | `tomllib` (stdlib Python 3.11+) | Python 3.11 (Oct 2022) | Zero extra dependency for TOML reading |
| `zenoh-python` 0.x async API | `eclipse-zenoh` 1.x sync-only (Rust-backed) | v1.0 (2024) | async was dropped; all publishing through daemon thread + queue |
| `Leaflet.draw` | `@geoman-io/leaflet-geoman-free` | ~2022 | Leaflet.draw unmaintained; Geoman is the active replacement |

**Deprecated/outdated:**
- `zenoh-python` 0.x: `Value`, `Sample.payload`, async session — all removed in 1.x. Do not use pre-1.0 examples.
- `betterproto`: Incompatible with keelson's `google.protobuf`-based generated stubs. Do not use.

---

## Open Questions

1. **Zenoh probe timeout behavior**
   - What we know: `zenoh.open()` in client mode with unreachable endpoint may block; `transport.unicast.open_timeout` is configurable via JSON5 config string.
   - What's unclear: Whether `zenoh.open()` raises a specific exception type vs. a generic `RuntimeError` when the timeout expires. The 1.x Python API reference does not document this clearly.
   - Recommendation: Catch `Exception` broadly in `probe_zenoh()`. Add a warning comment: `# TODO: narrow exception type once confirmed from zenoh source or issue tracker`. Consider wrapping the probe in `concurrent.futures.ThreadPoolExecutor` with a hard deadline if blocking is unacceptable.

2. **keelson install — correct commit SHA to pin**
   - What we know: The package is on the `dev` branch at version `0.5.0a9`. The prior research says to pin to a specific commit SHA.
   - What's unclear: Which specific SHA to use — this depends on the state of the repo at implementation time.
   - Recommendation: At implementation time, run `git ls-remote https://github.com/RISE-Maritime/keelson.git dev` to get the current HEAD SHA, pin to that SHA in `pyproject.toml`.

3. **Placeholder static UI for Phase 1**
   - What we know: Phase 1 success criterion 1 says the server "serves the web UI in the browser" — but there is no actual UI yet (that's Phase 2).
   - What's unclear: What constitutes "serves the web UI" for Phase 1's minimal placeholder.
   - Recommendation: A single `static/index.html` with `<h1>ghost-drone is running</h1>` and the configuration values injected via a `/api/status` JSON endpoint or baked in as static text. The criterion is satisfied as long as the browser opens and shows something from the server — not necessarily a functional map.

---

## Sources

### Primary (HIGH confidence)
- `tomllib` official docs — https://docs.python.org/3.11/library/tomllib.html — API, error types, binary mode requirement
- keelson SDK source `__init__.py` (fetched raw) — `enclose()`, `uncover()`, `is_subject_well_known()`, `construct_pubsub_key()`, `KEELSON_PUB_SUB_KEY_FORMAT`, `_SUBJECTS` loading
- keelson `pyproject.toml` (fetched raw) — version 0.5.0a9, deps: `eclipse-zenoh>=1.2.1`, `protobuf>=5.29.1`, `pyyaml`, `parse`, Python `>=3.11`
- keelson `tests/test_sdk.py` (fetched via WebFetch) — confirmed test subjects: `heading_true_north_deg`, `location_fix`, `speed_over_ground_knots`; confirmed `TimestampedFloat` as the test payload type
- FastAPI official docs — https://fastapi.tiangolo.com/tutorial/static-files/ — `StaticFiles` mount, `html=True` behavior
- uv GitHub Actions guide — https://docs.astral.sh/uv/guides/integration/github/ — `astral-sh/setup-uv@v7`, `uv sync --locked`, `uv run pytest`
- zenoh.io configuration docs — https://zenoh.io/docs/manual/configuration/ — `Config.from_json5()`, connect endpoints JSON5 format

### Secondary (MEDIUM confidence)
- zenoh-python readthedocs 1.7.2 — concepts page — `zenoh.open()` uses context manager; session creation pattern; `transport.unicast.open_timeout` configurable
- Project-level STACK.md and ARCHITECTURE.md — prior research confirms daemon thread pattern for zenoh publishing, `eclipse-zenoh==1.7.2`, keelson API patterns — all consistent with Phase 1 findings
- uv issue #9743 — `#subdirectory` bug fixed in versions after 0.5.7; current uv should work

### Tertiary (LOW confidence — flag for validation)
- WebSearch: zenoh probe behavior when unreachable — unclear whether exception type is documented; implementation should catch broadly

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — versions verified from official PyPI and keelson source
- TOML parsing: HIGH — stdlib, official docs reviewed
- Keelson API: HIGH — source code fetched and read directly
- Architecture: HIGH — consistent with existing project-level ARCHITECTURE.md research
- Zenoh connectivity probe: MEDIUM — timeout/exception behavior not clearly documented in 1.x Python API reference
- Pitfalls: HIGH — most verified from official sources or keelson source; zenoh probe pitfall is MEDIUM

**Research date:** 2026-02-18
**Valid until:** 2026-03-20 (keelson is pre-v1 alpha — re-verify if more than 30 days pass before implementation)
