export interface ControlCallbacks {
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onSpeedChange: (speed: number) => void;
  onClear: () => void;
  onDrawToggle: () => void;
  onSettingsOpen: () => void;
}

export class ControlsManager {
  private btnDraw = document.getElementById("btn-draw") as HTMLButtonElement;
  private btnPlay = document.getElementById("btn-play") as HTMLButtonElement;
  private btnPause = document.getElementById("btn-pause") as HTMLButtonElement;
  private btnStop = document.getElementById("btn-stop") as HTMLButtonElement;
  private btnClear = document.getElementById("btn-clear") as HTMLButtonElement;
  private speedInput = document.getElementById("speed-input") as HTMLInputElement;
  private btnSettings = document.getElementById("btn-settings") as HTMLButtonElement;
  private simStatusBadge = document.getElementById("sim-status-badge")!;
  private simStatusText = document.getElementById("sim-status-text")!;
  private droneSelect = document.getElementById("drone-select") as HTMLSelectElement;

  simState: string = "stopped";
  selectedDroneId: string | null = null;
  private drawModeActive = false;

  /** External callback when user picks a drone from the selector */
  onDroneSelected: ((entityId: string) => void) | null = null;

  constructor(private callbacks: ControlCallbacks) {
    this.btnPlay.addEventListener("click", () => callbacks.onPlay());
    this.btnPause.addEventListener("click", () => callbacks.onPause());
    this.btnStop.addEventListener("click", () => callbacks.onStop());
    this.btnClear.addEventListener("click", () => callbacks.onClear());
    this.btnDraw.addEventListener("click", () => callbacks.onDrawToggle());
    this.btnSettings.addEventListener("click", () => callbacks.onSettingsOpen());
    this.speedInput.addEventListener("change", () => {
      callbacks.onSpeedChange(parseFloat(this.speedInput.value));
    });

    this.droneSelect.addEventListener("change", () => {
      const id = this.droneSelect.value;
      if (id && this.onDroneSelected) {
        this.onDroneSelected(id);
      }
    });
  }

  setDrawModeActive(active: boolean): void {
    this.drawModeActive = active;
    this.btnDraw.classList.toggle("active", active);
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
    const canEdit = this.simState === "stopped";
    const canPlay = (canEdit && waypointCount >= 2) || this.simState === "paused";

    this.btnPlay.disabled = !canPlay;
    this.btnPause.disabled = this.simState !== "playing";
    this.btnStop.disabled = this.simState === "stopped";
    this.btnClear.disabled = !canEdit;
    this.btnDraw.disabled = !canEdit;

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
