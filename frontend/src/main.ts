import { initClock } from "./clock";
import { initTheme } from "./theme";
import { MapController } from "./map";
import { ControlsManager } from "./controls";
import { onTelemetryFrame } from "./telemetry";
import {
  buildSubjectRows,
  initSettingsModal,
  applySettingsToUI,
} from "./settings";
import { initFaultPanel, updateFaultPanel } from "./faults";
import { ZenohClient } from "./zenoh-client";
import type { SimFrame, SettingsPayload } from "./types";

// --- Parse config from URL params or use defaults ---
const params = new URLSearchParams(window.location.search);
const realm = params.get("realm") ?? "rise";
const entityId = params.get("entity_id") ?? "ghost-drone";
const wsHost = ["localhost", "127.0.0.1"].includes(window.location.hostname)
  ? "localhost"
  : window.location.hostname;
const remoteApi = params.get("remote_api") ?? `ws://${wsHost}:10001`;

// --- Map ---
const mapCtrl = new MapController();

// --- Controls (wired below after zenoh client is created) ---
let zenoh: ZenohClient;

const controls = new ControlsManager({
  onPlay: async () => {
    if (mapCtrl.waypoints.length < 2) return;
    if (controls.simState === "stopped") {
      const wps: [number, number][] = mapCtrl.waypoints.map((w) => [
        w.lat,
        w.lng,
      ]);
      const result = await zenoh.loadRoute(wps);
      if (!result.ok) {
        console.error("[loadRoute]", result.error);
        return;
      }
    }
    await zenoh.play();
  },
  onPause: () => zenoh.pause(),
  onStop: () => zenoh.stop(),
  onSpeedChange: (speed) => zenoh.setSpeed(speed),
  onClear: () => {
    if (controls.simState !== "stopped") return;
    mapCtrl.clearWaypoints();
    controls.updateControlStates(0);
  },
  onDrawToggle: () => {
    mapCtrl.toggleDrawMode();
    controls.setDrawModeActive(mapCtrl.drawModeActive);
    mapCtrl.updateWaypointDraggability();
  },
  onSettingsOpen: () => {
    document.getElementById("settings-overlay")!.style.display = "flex";
  },
});

// Wire map -> controls state sync
mapCtrl.getSimState = () => controls.simState;
mapCtrl.onWaypointsChanged = () =>
  controls.updateControlStates(mapCtrl.waypoints.length);

// --- Zenoh client ---
zenoh = new ZenohClient({
  realm,
  entityId,
  remoteApiUrl: remoteApi,
  onFrame: (frame: SimFrame) => {
    controls.simState = frame.state;
    mapCtrl.updateDronePosition(
      frame.lat,
      frame.lng,
      frame.heading,
      frame.state,
    );
    controls.updateControlStates(mapCtrl.waypoints.length);
    onTelemetryFrame(frame);
    updateFaultPanel(frame.faults);
  },
});

// --- Fault injection panel ---
initFaultPanel((subject, faultType, active) => {
  if (active) {
    zenoh.injectFault(subject, faultType);
  } else {
    zenoh.clearFault(subject, faultType);
  }
});

// --- Settings ---
buildSubjectRows();
initSettingsModal(async (payload: SettingsPayload) => {
  const result = await zenoh.updateSettings(payload);
  if (result) applySettingsToUI(result);
});

// --- Theme ---
initTheme(() => {
  mapCtrl.refreshRoute();
  mapCtrl.refreshDroneIcon();
});

// --- Clock ---
initClock();

// --- Init ---
controls.updateControlStates(0);

// Connect and fetch initial settings
zenoh.connect().then(async () => {
  const settings = await zenoh.getSettings();
  if (settings) applySettingsToUI(settings);
});
