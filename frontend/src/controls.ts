import type { OperationMode } from "./types";

export interface ControlCallbacks {
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onSpeedChange: (speed: number) => void;
  onClear: () => void;
  onDrawToggle: () => void;
  onSpawnToggle: () => void;
  onDeleteDrone: () => void;
  onSettingsOpen: () => void;
  onModeToggle: () => void;
  onManualControl: (rudderDeg: number, engine: number) => void;
}

export class ControlsManager {
  private btnDraw = document.getElementById("btn-draw") as HTMLButtonElement;
  private btnPlay = document.getElementById("btn-play") as HTMLButtonElement;
  private btnPause = document.getElementById("btn-pause") as HTMLButtonElement;
  private btnStop = document.getElementById("btn-stop") as HTMLButtonElement;
  private btnClear = document.getElementById("btn-clear") as HTMLButtonElement;
  private speedInput = document.getElementById("speed-input") as HTMLInputElement;
  private btnSpawn = document.getElementById("btn-spawn") as HTMLButtonElement;
  private btnDeleteDrone = document.getElementById("btn-delete-drone") as HTMLButtonElement;
  private btnSettings = document.getElementById("btn-settings") as HTMLButtonElement;
  private btnMode = document.getElementById("btn-mode") as HTMLButtonElement;
  private manualHint = document.getElementById("manual-hint")!;
  private simStatusBadge = document.getElementById("sim-status-badge")!;
  private simStatusText = document.getElementById("sim-status-text")!;
  private droneSelect = document.getElementById("drone-select") as HTMLSelectElement;

  simState: string = "stopped";
  operationMode: OperationMode = "autonomous";
  selectedDroneId: string | null = null;
  private drawModeActive = false;
  private spawnModeActive = false;
  private manualRudder = 0;
  private manualEngine = 0;
  private keysDown = new Set<string>();

  /** External callback when user picks a drone from the selector */
  onDroneSelected: ((entityId: string) => void) | null = null;

  constructor(private callbacks: ControlCallbacks) {
    this.btnPlay.addEventListener("click", () => callbacks.onPlay());
    this.btnPause.addEventListener("click", () => callbacks.onPause());
    this.btnStop.addEventListener("click", () => callbacks.onStop());
    this.btnClear.addEventListener("click", () => callbacks.onClear());
    this.btnDraw.addEventListener("click", () => callbacks.onDrawToggle());
    this.btnSpawn.addEventListener("click", () => callbacks.onSpawnToggle());
    this.btnDeleteDrone.addEventListener("click", () => callbacks.onDeleteDrone());
    this.btnSettings.addEventListener("click", () => callbacks.onSettingsOpen());
    this.btnMode.addEventListener("click", () => callbacks.onModeToggle());
    this.speedInput.addEventListener("change", () => {
      callbacks.onSpeedChange(parseFloat(this.speedInput.value));
    });

    // Keyboard controls for manual mode — arrow keys only
    window.addEventListener("keydown", (e) => {
      if (this.operationMode !== "manual") return;
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
      if (this.operationMode !== "manual") return;
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
    const wasManual = this.operationMode === "manual";
    this.operationMode = mode;
    if (mode === "manual") {
      if (!wasManual) {
        this.manualRudder = 0;
        this.manualEngine = 0;
      }
      this.btnMode.textContent = "MANUAL";
      this.btnMode.classList.add("manual");
      this.manualHint.classList.add("visible");
    } else {
      this.btnMode.textContent = "AUTO";
      this.btnMode.classList.remove("manual");
      this.manualHint.classList.remove("visible");
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
  }

  updateDroneList(drones: { entity_id: string; state: string }[]): void {
    const currentValue = this.droneSelect.value;
    this.droneSelect.innerHTML = "";
    for (const d of drones) {
      const opt = document.createElement("option");
      opt.value = d.entity_id;
      opt.textContent = `${d.entity_id} (${d.state})`;
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
    const isManual = this.operationMode === "manual";
    const canEdit = this.simState === "stopped" && !isManual;
    const canPlay = !isManual && ((canEdit && waypointCount >= 2) || this.simState === "paused");

    this.btnPlay.disabled = !canPlay;
    this.btnPause.disabled = isManual || this.simState !== "playing";
    this.btnStop.disabled = isManual || this.simState === "stopped";
    this.btnClear.disabled = !canEdit;
    this.btnDraw.disabled = !canEdit || isManual;

    if (!canEdit && this.drawModeActive) {
      this.drawModeActive = false;
      this.btnDraw.classList.remove("active");
    }

    // Status badge
    if (this.simState === "playing") {
      this.simStatusBadge.classList.add("visible");
      this.simStatusBadge.classList.remove("paused");
      this.simStatusText.textContent = "Running";
    } else if (this.simState === "paused") {
      this.simStatusBadge.classList.add("visible", "paused");
      this.simStatusText.textContent = "Paused";
    } else {
      this.simStatusBadge.classList.remove("visible", "paused");
    }
  }
}
