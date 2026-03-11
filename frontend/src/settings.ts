import type { SettingsPayload } from "./types";

const SUBJECTS_LIST = [
  "location_fix",
  "heading_true_north_deg",
  "speed_over_ground_knots",
  "roll_deg",
  "pitch_deg",
];

const SLIDER_PAIRS: [string, string][] = [
  ["sl-roll-amp", "lbl-roll-amp"],
  ["sl-roll-period", "lbl-roll-period"],
  ["sl-pitch-amp", "lbl-pitch-amp"],
  ["sl-pitch-period", "lbl-pitch-period"],
  ["sl-loc-noise", "lbl-loc-noise"],
];

export function buildSubjectRows(): void {
  const tbody = document.getElementById("subject-rows")!;
  tbody.innerHTML = "";
  const defaults: Record<string, { rate_hz: number; source_id: string }> = {
    location_fix: { rate_hz: 1.0, source_id: "gnss/0" },
    heading_true_north_deg: { rate_hz: 1.0, source_id: "imu/0" },
    speed_over_ground_knots: { rate_hz: 1.0, source_id: "imu/0" },
    roll_deg: { rate_hz: 1.0, source_id: "imu/0" },
    pitch_deg: { rate_hz: 1.0, source_id: "imu/0" },
  };
  for (const subj of SUBJECTS_LIST) {
    const d = defaults[subj];
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${subj}</td>
      <td><input type="number" class="settings-input" data-subj="${subj}" data-field="rate_hz"
          value="${d.rate_hz}" min="0.1" max="10" step="0.1" style="width:58px"></td>
      <td><input type="text" class="settings-input" data-subj="${subj}" data-field="source_id"
          value="${d.source_id}" style="width:80px"></td>`;
    tbody.appendChild(tr);
  }
}

/** Apply settings values received from the backend to the UI. */
export function applySettingsToUI(settings: SettingsPayload): void {
  // Subject rows
  for (const subj of SUBJECTS_LIST) {
    const sc = settings.subjects[subj];
    if (!sc) continue;
    const rateInput = document.querySelector(
      `#subject-rows input[data-subj="${subj}"][data-field="rate_hz"]`
    ) as HTMLInputElement | null;
    const sourceInput = document.querySelector(
      `#subject-rows input[data-subj="${subj}"][data-field="source_id"]`
    ) as HTMLInputElement | null;
    if (rateInput) rateInput.value = String(sc.rate_hz);
    if (sourceInput) sourceInput.value = sc.source_id;
  }
  // Sliders
  const sliderMap: Record<string, [string, string]> = {
    roll_amplitude_deg: ["sl-roll-amp", "lbl-roll-amp"],
    roll_period_s: ["sl-roll-period", "lbl-roll-period"],
    pitch_amplitude_deg: ["sl-pitch-amp", "lbl-pitch-amp"],
    pitch_period_s: ["sl-pitch-period", "lbl-pitch-period"],
    location_noise_sigma_m: ["sl-loc-noise", "lbl-loc-noise"],
  };
  for (const [key, [sliderId, lblId]] of Object.entries(sliderMap)) {
    const val = (settings as any)[key];
    if (val !== undefined) {
      (document.getElementById(sliderId) as HTMLInputElement).value = String(val);
      document.getElementById(lblId)!.textContent = String(val);
    }
  }
}

export function initSettingsModal(onSave: (payload: SettingsPayload) => void): void {
  // Slider live labels
  for (const [id, lblId] of SLIDER_PAIRS) {
    document.getElementById(id)!.addEventListener("input", function (this: HTMLInputElement) {
      document.getElementById(lblId)!.textContent = this.value;
    });
  }

  // Open / close
  document.getElementById("btn-settings")!.addEventListener("click", () => {
    document.getElementById("settings-overlay")!.style.display = "flex";
  });
  document.getElementById("btn-settings-close")!.addEventListener("click", () => {
    document.getElementById("settings-overlay")!.style.display = "none";
  });
  document.getElementById("settings-overlay")!.addEventListener("click", function (e) {
    if (e.target === this) this.style.display = "none";
  });

  // Save
  document.getElementById("btn-settings-save")!.addEventListener("click", () => {
    const subjectsPayload: Record<string, { rate_hz: number; source_id: string }> = {};
    for (const inp of document.querySelectorAll("#subject-rows input") as NodeListOf<HTMLInputElement>) {
      const subj = inp.dataset.subj!;
      const field = inp.dataset.field!;
      if (!subjectsPayload[subj]) subjectsPayload[subj] = { rate_hz: 1, source_id: "" };
      if (field === "rate_hz") subjectsPayload[subj].rate_hz = parseFloat(inp.value);
      else subjectsPayload[subj].source_id = inp.value;
    }

    const payload: SettingsPayload = {
      subjects: subjectsPayload,
      roll_amplitude_deg: parseFloat((document.getElementById("sl-roll-amp") as HTMLInputElement).value),
      roll_period_s: parseFloat((document.getElementById("sl-roll-period") as HTMLInputElement).value),
      pitch_amplitude_deg: parseFloat((document.getElementById("sl-pitch-amp") as HTMLInputElement).value),
      pitch_period_s: parseFloat((document.getElementById("sl-pitch-period") as HTMLInputElement).value),
      location_noise_sigma_m: parseFloat((document.getElementById("sl-loc-noise") as HTMLInputElement).value),
    };

    onSave(payload);
    document.getElementById("settings-overlay")!.style.display = "none";
  });
}
