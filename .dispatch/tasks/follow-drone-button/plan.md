# Add "follow drone" map button

Add a button on the map that centers and follows the selected drone. When enabled, the map continuously pans to keep the drone in the center. When the user pans the map manually, following is automatically disabled. Clicking the button re-enables it.

## Plan

- [x] **Add follow-drone toggle to the map UI**: Added Leaflet custom control with crosshair SVG icon, `following` boolean, `setFollowing()` method, and `panToSelectedDrone()` helper.

- [x] **Auto-center on telemetry updates**: Updated `updateDronePosition` to check `this.following` flag before panning. Uses `panTo` with short animation to avoid jitter.

- [x] **Disable following on manual pan**: Added `dragstart` listener with `isProgrammaticMove` guard to distinguish user drags from programmatic pans. Sets `following = false` on user drag.

- [x] **Button visual feedback**: Added `.leaflet-follow-btn` CSS with `.active` state using `--instrument-enhanced-primary-color` for active, `--element-inactive-color` for inactive. Hover states included.

- [x] **Build frontend** (`cd frontend && npm run build`) — built successfully, no errors.
