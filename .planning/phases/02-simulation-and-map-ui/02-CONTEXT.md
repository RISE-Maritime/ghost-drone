# Phase 2: Simulation and Map UI - Context

**Gathered:** 2026-02-19
**Status:** Ready for planning

<domain>
## Phase Boundary

Let a user draw a waypoint route on the browser Leaflet map, then play/pause/stop an animated drone marker that follows the route with realistic motion (first-order heading lag + Gaussian noise). This phase delivers the simulation engine and interactive UI. Telemetry publishing to zenoh is a separate phase.

</domain>

<decisions>
## Implementation Decisions

### Map interaction
- Drawing requires an explicit "draw mode" toggle — accidental clicks don't place waypoints
- In draw mode, each click places the next waypoint in sequence
- Waypoints are editable: drag to reposition, click to delete individual ones
- Minimum 2 waypoints required before Play is enabled
- **Pause**: drone freezes mid-route, route is locked (non-editable)
- **Stop**: drone "returns" to start waypoint, route unlocks for editing
- A dedicated **Clear** button (available when stopped) wipes all waypoints and the polyline
- Route persists after Stop — user can replay or redraw; no auto-clear on stop
- Editing is locked during simulation (both playing and paused states)

### Drone marker & animation
- Drone marker is a top-down **drone SVG icon** that rotates to show heading
- Map **follows (pans to) the drone** as it moves — continuous centering
- **Subtle visual cue** on state: marker dims (opacity/color change) when paused or stopped
- Drone marker is **visible at the start waypoint** when stopped (not hidden)

### Simulation controls
- Controls live in a **bottom bar** below the map
- Bottom bar contains: draw mode toggle, play/pause/stop buttons, speed input, clear button
- Cruise speed is **adjustable in the bottom bar** at runtime (not config-only)
- Bottom bar is **clean and minimal** — no status text or telemetry readout in this phase
- Draw mode toggle placement in bottom bar vs map corner: **Claude's discretion**

### Route & waypoint display
- Waypoints displayed as **numbered circles** (1, 2, 3...) showing sequence order
- Route polyline and waypoint markers remain **visible during playback** — not hidden
- Polyline is a **single uniform color** throughout playback (no flown-vs-remaining split)
- Polyline style: **bright accent color** (e.g., orange or green) for high contrast against map tiles

### Claude's Discretion
- Draw mode toggle placement: bottom bar or map corner — whichever is cleaner UX
- Exact drone SVG icon design
- Specific accent color for polyline (orange vs green vs other)
- Exact opacity/color values for paused/stopped drone state visual cue
- Leaflet plugin choices for drag-to-move waypoints

</decisions>

<specifics>
## Specific Ideas

- Stop behavior is explicit: drone "sent back" to start, not just a freeze — this is a meaningful state transition
- Pause and Stop are distinct states with distinct UX (pause = frozen in place; stop = reset to origin)
- Route editing is an intentional mode entered by being in draw mode, not passive

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 02-simulation-and-map-ui*
*Context gathered: 2026-02-19*
