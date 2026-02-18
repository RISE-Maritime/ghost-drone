# Phase 1: Foundation - Context

**Gathered:** 2026-02-18
**Status:** Ready for planning

<domain>
## Phase Boundary

Project scaffold with a runnable FastAPI server, configurable identity (zenoh endpoint, keelson realm, entity ID), a validated zenoh/keelson publish helper, and round-trip unit tests. No simulation, no map UI, no telemetry publishing — those are later phases.

</domain>

<decisions>
## Implementation Decisions

### Configuration design
- Format: TOML (`ghost_drone.toml`)
- Location: Fixed path — current working directory (CWD) where `python -m ghost_drone` is run
- Required keys: `zenoh_endpoint`, `keelson_realm`, `entity_id` — nothing else for Phase 1
- Missing or invalid config: hard exit with a clear, human-readable error message explaining what is wrong or missing

### Startup behavior
- On success: print a summary block showing loaded config values (zenoh endpoint, realm, entity ID) and the server URL
- Server binds to a configurable host:port; default `0.0.0.0:8000`
- Host/port configurable (how — file vs flag — Claude's discretion)
- Auto-open the browser at the bound URL when the server starts
- Zenoh connectivity probed at startup; if zenoh is unreachable, hard exit with a clear error (do not start the server)

### Test scope & environment
- Round-trip test is a pure unit test: no live zenoh session required
- Tests only the keelson `enclose()` / `uncover()` round-trip in-process
- Test runner: pytest
- CI: GitHub Actions on push/PR — runs pytest automatically
- Target Python version: 3.11

### Subject validation
- Behavior: log a visible warning in the startup summary block (not a hard exit)
- ⚠️ CONFLICT WITH ROADMAP: Roadmap success criterion 4 requires hard exit for unrecognised subjects; user has overridden this to warning + continue. Planner should surface this conflict before finalising tasks.
- Subject list source: queried from the keelson SDK at runtime (not hardcoded)
- Scope: validate only subjects needed for the current phase — Claude determines which subjects are required at each phase boundary
- Warning format: included in the startup summary banner so it cannot be missed

### Claude's Discretion
- Exact warning message wording
- How host:port is made configurable (CLI flag vs config file key vs env var)
- Which keelson subject(s) are needed for the Phase 1 round-trip test helper
- Compression, packaging, and dependency management details

</decisions>

<specifics>
## Specific Ideas

No specific UI/UX references — this is infrastructure. Standard Python tooling conventions apply.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-02-18*
