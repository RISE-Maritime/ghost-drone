import type { OperationMode } from "./types";

export interface ControlCallbacks {
  onPlay: () => void;
  onStop: () => void;
  onSpeedChange: (speed: number) => void;
  onClear: () => void;
  onDrawToggle: () => void;
  onSpawnToggle: () => void;
  onDeleteDrone: () => void;
  onSettingsOpen: () => void;
  onManualControl: (rudderDeg: number, engine: number) => void;
  onRouteSet: () => void;
  onGeofenceToggle: () => void;
  onGeofenceSet: () => void;
  onGeofenceClear: () => void;
}

export class ControlsManager {
  private btnDraw = document.getElementById("btn-draw") as HTMLButtonElement;
  private btnPlay = document.getElementById("btn-play") as HTMLButtonElement;
  private btnStop = document.getElementById("btn-stop") as HTMLButtonElement;
  private btnClear = document.getElementById("btn-clear") as HTMLButtonElement;
  private speedInput = document.getElementById("speed-input") as HTMLInputElement;
  private btnSpawn = document.getElementById("btn-spawn") as HTMLButtonElement;
  private btnDeleteDrone = document.getElementById("btn-delete-drone") as HTMLButtonElement;
  private btnSettings = document.getElementById("btn-settings") as HTMLButtonElement;
  private btnRouteSet = document.getElementById("btn-route-set") as HTMLButtonElement;
  private btnGeofence = document.getElementById("btn-geofence") as HTMLButtonElement;
  private btnGeofenceSet = document.getElementById("btn-geofence-set") as HTMLButtonElement;
  private btnGeofenceClear = document.getElementById("btn-geofence-clear") as HTMLButtonElement;
  private geofenceAction = document.getElementById("geofence-action") as HTMLSelectElement;
  private simStatusBadge = document.getElementById("sim-status-badge")!;
  private simStatusText = document.getElementById("sim-status-text")!;
  private droneSelect = document.getElementById("drone-select") as HTMLSelectElement;

  simState: string = "playing";
  operationMode: OperationMode = "operated";
  selectedDroneId: string | null = null;
  private drawModeActive = false;
  private spawnModeActive = false;
  private geofenceModeActive = false;
  private routeSetForDrone: Set<string> = new Set();
  private manualRudder = 0;
  private manualEngine = 0;
  private keysDown = new Set<string>();

  /** External callback when user picks a drone from the selector */
  onDroneSelected: ((entityId: string) => void) | null = null;

  constructor(private callbacks: ControlCallbacks) {
    this.btnPlay.addEventListener("click", () => callbacks.onPlay());
    this.btnStop.addEventListener("click", () => callbacks.onStop());
    this.btnClear.addEventListener("click", () => callbacks.onClear());
    this.btnDraw.addEventListener("click", () => callbacks.onDrawToggle());
    this.btnSpawn.addEventListener("click", () => callbacks.onSpawnToggle());
    this.btnDeleteDrone.addEventListener("click", () => callbacks.onDeleteDrone());
    this.btnSettings.addEventListener("click", () => callbacks.onSettingsOpen());
    this.btnRouteSet.addEventListener("click", () => callbacks.onRouteSet());
    this.btnGeofence.addEventListener("click", () => callbacks.onGeofenceToggle());
    this.btnGeofenceSet.addEventListener("click", () => callbacks.onGeofenceSet());
    this.btnGeofenceClear.addEventListener("click", () => callbacks.onGeofenceClear());
    this.speedInput.addEventListener("change", () => {
      callbacks.onSpeedChange(parseFloat(this.speedInput.value));
    });

    // Keyboard controls for manual mode — arrow keys only
    window.addEventListener("keydown", (e) => {
      if (this.operationMode !== "operated") return;
      // Ignore if focus is in an input/select/textarea
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") return;
      const key = e.key;
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(key)) {
        e.preventDefault();
        if (!this.keysDown.has(key)) {
          this.keysDown.add(key);
          this.updateManualFromKeys();
        }
      }
    });

    window.addEventListener("keyup", (e) => {
      if (this.operationMode !== "operated") return;
      const key = e.key;
      if (this.keysDown.has(key)) {
        this.keysDown.delete(key);
        this.updateManualFromKeys();
      }
    });

    this.droneSelect.addEventListener("change", () => {
      const id = this.droneSelect.value;
      if (id && this.onDroneSelected) {
        this.onDroneSelected(id);
      }
    });
  }

  private updateManualFromKeys(): void {
    // Rudder: Left = port (-1°/press), Right = starboard (+1°/press), clamped [-35, +35]
    const left = this.keysDown.has("ArrowLeft");
    const right = this.keysDown.has("ArrowRight");
    if (left && !right) {
      this.manualRudder = Math.max(-35, this.manualRudder - 1);
    } else if (right && !left) {
      this.manualRudder = Math.min(35, this.manualRudder + 1);
    }

    // Engine: Up = increase (+0.1/press), Down = decrease (-0.1/press), clamped [0, 1]
    const up = this.keysDown.has("ArrowUp");
    const down = this.keysDown.has("ArrowDown");
    if (up && !down) {
      this.manualEngine = Math.min(1.0, this.manualEngine + 0.1);
    } else if (down && !up) {
      this.manualEngine = Math.max(0.0, this.manualEngine - 0.1);
    }

    this.callbacks.onManualControl(this.manualRudder, this.manualEngine);
  }

  setOperationMode(mode: OperationMode, _currentHeading?: number): void {
    const wasManual = this.operationMode === "operated";
    this.operationMode = mode;
    if (mode === "operated") {
      if (!wasManual) {
        this.manualRudder = 0;
        this.manualEngine = 0;
      }
    }
  }

  setDrawModeActive(active: boolean): void {
    this.drawModeActive = active;
    this.btnDraw.classList.toggle("active", active);
    // Deactivate spawn mode when entering draw mode
    if (active) this.setSpawnModeActive(false);
  }

  setSpawnModeActive(active: boolean): void {
    this.spawnModeActive = active;
    this.btnSpawn.classList.toggle("active", active);
    // Deactivate draw mode when entering spawn mode
    if (active && this.drawModeActive) {
      this.drawModeActive = false;
      this.btnDraw.classList.remove("active");
    }
    if (active && this.geofenceModeActive) {
      this.geofenceModeActive = false;
      this.btnGeofence.classList.remove("active");
    }
  }

  setGeofenceModeActive(active: boolean): void {
    this.geofenceModeActive = active;
    this.btnGeofence.classList.toggle("active", active);
    // Mutual exclusion with draw and spawn
    if (active) {
      this.setDrawModeActive(false);
      this.setSpawnModeActive(false);
    }
  }

  getGeofenceAction(): "coast" | "brake" {
    return this.geofenceAction.value as "coast" | "brake";
  }

  /** Briefly replace a button's text with a checkmark to confirm success. */
  flashConfirm(btn: HTMLButtonElement): void {
    const original = btn.textContent;
    btn.textContent = "\u2713";
    btn.classList.add("active");
    setTimeout(() => {
      btn.textContent = original;
      btn.classList.remove("active");
    }, 800);
  }

  flashRouteSetConfirm(): void { this.flashConfirm(this.btnRouteSet); }
  flashGeofenceSetConfirm(): void { this.flashConfirm(this.btnGeofenceSet); }

  markRouteSet(entityId: string): void {
    this.routeSetForDrone.add(entityId);
  }

  clearRouteSet(entityId: string): void {
    this.routeSetForDrone.delete(entityId);
  }

  get isRouteSet(): boolean {
    return !!this.selectedDroneId && this.routeSetForDrone.has(this.selectedDroneId);
  }

  updateDroneList(drones: { entity_id: string; state: string; operation_mode?: string }[]): void {
    const currentValue = this.droneSelect.value;
    this.droneSelect.innerHTML = "";
    if (drones.length === 0) {
      const opt = document.createElement("option");
      opt.value = "";
      opt.textContent = "No drones";
      this.droneSelect.appendChild(opt);
      return;
    }
    for (const d of drones) {
      const opt = document.createElement("option");
      opt.value = d.entity_id;
      opt.textContent = `${d.entity_id} (${d.operation_mode ?? d.state})`;
      this.droneSelect.appendChild(opt);
    }
    // Restore selection if still in list
    if (this.selectedDroneId && drones.some(d => d.entity_id === this.selectedDroneId)) {
      this.droneSelect.value = this.selectedDroneId;
    } else if (currentValue && drones.some(d => d.entity_id === currentValue)) {
      this.droneSelect.value = currentValue;
    }
  }

  setSelectedDrone(entityId: string): void {
    this.selectedDroneId = entityId;
    this.droneSelect.value = entityId;
  }

  updateControlStates(waypointCount: number): void {
    const canEdit = this.operationMode === "operated";
    const canPlay = canEdit && this.isRouteSet;

    this.btnPlay.disabled = !canPlay;
    this.btnPlay.title = !canPlay && canEdit
      ? "Draw a route and press Set first"
      : "";
    this.btnStop.disabled = this.operationMode !== "autonomous";
    this.btnClear.disabled = !canEdit;
    this.btnDraw.disabled = !canEdit;
    this.btnRouteSet.disabled = !canEdit;
    this.btnGeofence.disabled = !canEdit;
    this.btnGeofenceSet.disabled = !canEdit;
    this.btnGeofenceClear.disabled = !canEdit;
    this.geofenceAction.disabled = !canEdit;

    // Status badge
    this.simStatusBadge.classList.add("visible");
    this.simStatusText.textContent = this.operationMode === "autonomous" ? "Autonomous" : "Operated";
  }
}
