# Phase 3: Telemetry Publishing - Context

**Gathered:** 2026-02-19
**Status:** Ready for planning

<domain>
## Phase Boundary

Publish SimEngine telemetry output to the zenoh network as keelson-wrapped messages, and display live-updating gauges + sparklines in the browser UI. Roll and pitch are added as new simulated signals. A settings modal lets users configure simulation parameters and publishing behaviour. Creating new keelson subjects, changing the simulation engine core, or adding camera feeds are out of scope.

</domain>

<decisions>
## Implementation Decisions

### Live plot design
- Gauges + sparklines (not line charts): each signal gets a numeric gauge for the current value and a small sparkline showing recent history
- 4 signals: heading, speed, roll, pitch — position is already on the map marker, no lat/lng gauge needed
- Rolling 30-second window for sparklines
- Sidebar panel on the right side of the map, open by default on page load
- Plots and settings are separate: sidebar for plots, modal/drawer for settings (accessed via a settings button)

### Roll & pitch simulation
- Sinusoidal wave oscillation model (not pure Gaussian noise) — realistic feel for a surface water drone
- Independent controls for roll and pitch: separate amplitude and period sliders for each
- Amplitude is user-configurable in the settings modal (no hardcoded default override)
- Gaussian noise for location (lat/lng) is also user-configurable in the settings modal

### Publish rate
- Configurable in the settings modal — not hardcoded
- Per-subject publish rates: each keelson subject has its own rate setting
- Per-subject source name: each subject has a free-text field for the source segment of the keelson key-expression (e.g., `gnss/0`, `gnss/1`, `imu/0`) — this controls how the zenoh key-expression is constructed
- Source field is free-text (not a dropdown) to match any keelson setup

### Plot behavior on state change
- Paused: plots freeze on the last received value — no visual indicator, no clearing
- Stopped: all plots and sparkline history are cleared — clean slate for the next run
- Sidebar is open by default on page load

### Claude's Discretion
- Exact slider ranges for amplitude, period, and publish rate — pick sensible defaults and min/max bounds
- Sparkline charting library choice (must be lightweight, no build step)
- Settings modal design and layout (must fit with existing Leaflet UI style)
- How the SimEngine tick loop integrates with per-subject rate throttling (implementation detail)

</decisions>

<specifics>
## Specific Ideas

- The zenoh key-expression must include the source segment per keelson conventions — e.g., `{realm}/{entity_id}/{source}/{subject}`. The source is user-defined per subject in the settings modal.
- User explicitly wants to be able to assign `gnss/0` vs `gnss/1` to subjects like latitude/longitude independently.
- Settings modal should include: per-subject publish rate, per-subject source name, roll amplitude/period, pitch amplitude/period, location Gaussian noise level.

</specifics>

<deferred>
## Deferred Ideas

- None — discussion stayed within phase scope.

</deferred>

---

*Phase: 03-telemetry-publishing*
*Context gathered: 2026-02-19*
