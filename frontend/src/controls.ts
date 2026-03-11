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

  simState: string = "stopped";
  private drawModeActive = false;

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
  }

  setDrawModeActive(active: boolean): void {
    this.drawModeActive = active;
    this.btnDraw.classList.toggle("active", active);
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
