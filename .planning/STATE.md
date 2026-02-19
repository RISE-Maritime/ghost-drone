# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-18)

**Core value:** Draw a route, hit play, get a fully keelson-compatible drone publishing telemetry and video — no hardware required.
**Current focus:** Phase 1 — Foundation (COMPLETE)

## Current Position

Phase: 1 of 4 (Foundation)
Plan: 2 of 2 in current phase (01-02 complete — phase done)
Status: Phase 1 complete, ready for Phase 2
Last activity: 2026-02-19 — Executed plan 01-02

Progress: [██░░░░░░░░] 20%

## Performance Metrics

**Velocity:**
- Total plans completed: 2
- Average duration: ~3 min
- Total execution time: ~0.1 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 1. Foundation | 2/2 | ~6 min | ~3 min |

**Recent Trend:**
- Last 5 plans: 01-01 (4 min), 01-02 (2 min)
- Trend: Fast (foundation work complete)

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- Python stack, FastAPI + uvicorn, zenoh daemon thread pattern (all pre-roadmap — see PROJECT.md)
- keelson 0.5.0a9 must be pinned to a specific GitHub commit SHA (alpha SDK, API may shift)
- zenoh-python is sync-only (dropped async in v0.6); all publishing must go through a daemon thread + queue.Queue
- keelson pinned to git SHA e47e52fd (dev branch HEAD, 2026-02-19) — plan 01-01
- keelson dev branch does NOT commit pre-generated _pb2.py files; run scripts/generate_keelson_protos.sh after uv sync on fresh clone — plan 01-01
- zenoh probe uses 3000ms open_timeout (vs default ~10s) to fail fast — plan 01-01
- STATIC_DIR is package-relative (Path(__file__).parent.parent/static) not CWD-relative — plan 01-01
- Subject validation is warning-only in startup banner (not hard exit); user decision overrides roadmap criterion 4 — plan 01-01
- Float32 proto value assertions require tolerance >= 1e-3 (not 1e-6) — TimestampedFloat.value is 32-bit — plan 01-02
- CI uses uv sync --locked --all-extras to ensure pytest and protoc tools are installed — plan 01-02

### Pending Todos

None yet.

### Blockers/Concerns

- keelson protobuf stubs must be manually generated on fresh clone (scripts/generate_keelson_protos.sh)
- keelson SHA should be re-verified if >30 days pass before Phase 2 starts (pinned 2026-02-19)
- Webcam availability: no synthetic fallback in v1; target environment must have a connected webcam

## Session Continuity

Last session: 2026-02-19
Stopped at: Completed 01-02-PLAN.md — round-trip tests + ZenohPublisher scaffold + CI pipeline all working
Resume file: None
