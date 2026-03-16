import { initClock } from "./clock";
import { initTheme } from "./theme";
import { MapController } from "./map";
import { ControlsManager } from "./controls";
import { onTelemetryFrame, onManualSetpoint, setOperationMode as setTelemetryMode } from "./telemetry";
import {
  buildSubjectRows,
  initSettingsModal,
  applySettingsToUI,
} from "./settings";
import { initFaultPanel, updateFaultPanel } from "./faults";
import { ZenohClient } from "./zenoh-client";
import type { SimFrame, SettingsPayload, OperationMode } from "./types";

// --- Parse config from URL params or use defaults ---
const params = new URLSearchParams(window.location.search);
const realm = params.get("realm") ?? "rise";
const entityId = params.get("entity_id") ?? "ghost-drone";
const wsHost = ["localhost", "127.0.0.1"].includes(window.location.hostname)
  ? "localhost"
  : window.location.hostname;
const remoteApi = params.get("remote_api") ?? `ws://${wsHost}:10001`;

// --- Selected drone tracking ---
let selectedDroneId: string = entityId;
const deletedDrones: Set<string> = new Set();
let lastTelemetryHeading = 0;
let lastOperationMode: OperationMode | null = null;

// --- Map ---
const mapCtrl = new MapController();
mapCtrl.selectedDroneId = selectedDroneId;

// --- Controls (wired below after zenoh client is created) ---
let zenoh: ZenohClient;

const controls = new ControlsManager({
  onPlay: async () => {
    if (!selectedDroneId) return;
    if (mapCtrl.waypoints.length < 2) return;
    if (controls.simState === "stopped") {
      const wps: [number, number][] = mapCtrl.waypoints.map((w) => [
        w.lat,
        w.lng,
      ]);
      const result = await zenoh.loadRouteFor(selectedDroneId, wps);
      if (!result.ok) {
        console.error("[loadRoute]", result.error);
        return;
      }
    }
    await zenoh.playFor(selectedDroneId);
  },
  onPause: () => { if (selectedDroneId) zenoh.pauseFor(selectedDroneId); },
  onStop: () => { if (selectedDroneId) zenoh.stopFor(selectedDroneId); },
  onSpeedChange: (speed) => { if (selectedDroneId) zenoh.setSpeedFor(selectedDroneId, speed); },
  onClear: () => {
    if (controls.simState !== "stopped") return;
    mapCtrl.clearWaypoints();
    controls.updateControlStates(0);
  },
  onDrawToggle: () => {
    mapCtrl.toggleDrawMode();
    controls.setDrawModeActive(mapCtrl.drawModeActive);
    controls.setSpawnModeActive(mapCtrl.spawnModeActive);
    mapCtrl.updateWaypointDraggability();
  },
  onSpawnToggle: () => {
    mapCtrl.toggleSpawnMode();
    controls.setSpawnModeActive(mapCtrl.spawnModeActive);
    controls.setDrawModeActive(mapCtrl.drawModeActive);
  },
  onDeleteDrone: async () => {
    if (!selectedDroneId) return;
    const result = await zenoh.deleteDrone(selectedDroneId);
    if (result.ok) {
      deletedDrones.add(selectedDroneId);
      mapCtrl.removeDrone(selectedDroneId);
      mapCtrl.clearWaypoints();
      await refreshDroneList();
      // Select another drone if available
      const listResult = await zenoh.listDrones();
      if (listResult.ok && listResult.drones && listResult.drones.length > 0) {
        selectDrone(listResult.drones[0].entity_id);
      } else {
        selectedDroneId = "";
        mapCtrl.selectedDroneId = null;
        controls.simState = "stopped";
        controls.updateControlStates(0);
      }
    } else {
      console.error("[delete]", result.error);
    }
  },
  onSettingsOpen: () => {
    document.getElementById("settings-overlay")!.style.display = "flex";
  },
  onModeToggle: () => {
    if (!selectedDroneId) return;
    const newMode: OperationMode = controls.operationMode === "autonomous" ? "manual" : "autonomous";
    controls.setOperationMode(newMode, lastTelemetryHeading);
    setTelemetryMode(newMode);
    zenoh.setModeFor(selectedDroneId, newMode);
    controls.updateControlStates(mapCtrl.waypoints.length);
  },
  onManualControl: (rudderDeg, engine) => {
    if (!selectedDroneId) return;
    zenoh.manualControlFor(selectedDroneId, rudderDeg, engine);
  },
});

// --- Drone selection wiring ---
function selectDrone(id: string): void {
  selectedDroneId = id;
  mapCtrl.selectDrone(id);
  controls.setSelectedDrone(id);
}

controls.onDroneSelected = (id) => selectDrone(id);
mapCtrl.onDroneSelected = (id) => selectDrone(id);
mapCtrl.onDroneDragged = async (id, lat, lng) => {
  const result = await zenoh.setHomeFor(id, lat, lng);
  if (!result.ok) console.error("[set_home]", result.error);
};

// Wire map -> controls state sync
mapCtrl.getSimState = () => controls.simState;
mapCtrl.onWaypointsChanged = () =>
  controls.updateControlStates(mapCtrl.waypoints.length);

// --- Zenoh client ---
zenoh = new ZenohClient({
  realm,
  entityId,
  remoteApiUrl: remoteApi,
  onManualSetpoint: (eid, sp) => {
    if (eid === selectedDroneId) {
      onManualSetpoint(sp.rudder_deg, sp.engine);
    }
  },
  onFrame: (frame: SimFrame) => {
    // Ignore frames near null island (backend race on spawn adds noise)
    if (Math.abs(frame.lat) < 0.01 && Math.abs(frame.lng) < 0.01) return;

    const eid = frame.entity_id;
    // Ignore frames from deleted drones (in-flight messages after delete)
    if (deletedDrones.has(eid)) return;
    mapCtrl.updateDronePosition(
      eid,
      frame.lat,
      frame.lng,
      frame.heading,
      frame.state,
    );

    // Only update sidebar/controls for the selected drone
    if (eid === selectedDroneId) {
      lastTelemetryHeading = frame.heading;
      const prevState = controls.simState;
      controls.simState = frame.state;
      // Only update operation mode on actual transitions to avoid
      // overwriting manual heading/thrust from keypresses every frame
      if (frame.operation_mode && frame.operation_mode !== lastOperationMode) {
        lastOperationMode = frame.operation_mode;
        controls.setOperationMode(frame.operation_mode, frame.heading);
        setTelemetryMode(frame.operation_mode);
      }
      // Lock/unlock route editing on state transitions
      if (prevState !== frame.state) {
        if (frame.state !== "stopped" && mapCtrl.drawModeActive) {
          mapCtrl.disableDrawMode();
          controls.setDrawModeActive(false);
        }
        mapCtrl.updateWaypointDraggability();
      }
      controls.updateControlStates(mapCtrl.waypoints.length);
      onTelemetryFrame(frame);
      updateFaultPanel(frame.faults);
    }
  },
});

// --- Spawn drone on map click ---
mapCtrl.onSpawnClick = async (lat, lng) => {
  const result = await zenoh.spawnDrone(lat, lng);
  if (result.ok && result.entity_id) {
    // Exit spawn mode after successful spawn
    mapCtrl.spawnModeActive = false;
    controls.setSpawnModeActive(false);
    selectDrone(result.entity_id);
    refreshDroneList();
  } else {
    console.error("[spawn]", result.error);
  }
};

// --- Drone list refresh ---
async function refreshDroneList(): Promise<void> {
  const result = await zenoh.listDrones();
  if (result.ok && result.drones) {
    controls.updateDroneList(result.drones);
  }
}

// --- Fault injection panel ---
initFaultPanel((subject, faultType, active) => {
  if (!selectedDroneId) return;
  if (active) {
    zenoh.injectFaultFor(selectedDroneId, subject, faultType);
  } else {
    zenoh.clearFaultFor(selectedDroneId, subject, faultType);
  }
});

// --- Settings ---
buildSubjectRows();
initSettingsModal(async (payload: SettingsPayload) => {
  if (!selectedDroneId) return;
  const result = await zenoh.updateSettingsFor(selectedDroneId, payload);
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

// Connect and fetch initial settings + drone list
zenoh.connect().then(async () => {
  const settings = await zenoh.getSettingsFor(selectedDroneId);
  if (settings) applySettingsToUI(settings);
  await refreshDroneList();
});

// Periodically refresh drone list
setInterval(refreshDroneList, 5000);
