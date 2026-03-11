import type { FaultType, FaultState } from "./types";

const SUBJECTS = [
  "location_fix",
  "heading_true_north_deg",
  "speed_over_ground_knots",
  "roll_deg",
  "pitch_deg",
];

const FAULT_TYPES: FaultType[] = ["drop", "stuck", "nan", "wrong_rate"];

const FAULT_LABELS: Record<FaultType, string> = {
  drop: "Drop",
  stuck: "Stuck",
  nan: "NaN",
  wrong_rate: "2x Rate",
};

const SHORT_NAMES: Record<string, string> = {
  location_fix: "Position",
  heading_true_north_deg: "Heading",
  speed_over_ground_knots: "Speed",
  roll_deg: "Roll",
  pitch_deg: "Pitch",
};

type FaultCallback = (subject: string, faultType: FaultType, active: boolean) => void;

let onToggle: FaultCallback = () => {};

export function initFaultPanel(callback: FaultCallback): void {
  onToggle = callback;

  const container = document.getElementById("fault-rows")!;
  container.innerHTML = "";

  for (const subject of SUBJECTS) {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = SHORT_NAMES[subject] ?? subject;
    row.appendChild(nameCell);

    for (const ft of FAULT_TYPES) {
      const cell = document.createElement("td");
      cell.style.textAlign = "center";

      const btn = document.createElement("button");
      btn.className = "fault-toggle";
      btn.dataset.subject = subject;
      btn.dataset.faultType = ft;
      btn.textContent = FAULT_LABELS[ft];
      btn.title = `${FAULT_LABELS[ft]} fault on ${SHORT_NAMES[subject]}`;
      btn.addEventListener("click", () => {
        const isActive = btn.classList.contains("active");
        onToggle(subject, ft, !isActive);
      });

      cell.appendChild(btn);
      row.appendChild(cell);
    }

    container.appendChild(row);
  }
}

export function updateFaultPanel(faults: FaultState | undefined): void {
  if (!faults) return;

  const buttons = document.querySelectorAll<HTMLButtonElement>(".fault-toggle");
  for (const btn of buttons) {
    const subject = btn.dataset.subject!;
    const ft = btn.dataset.faultType as FaultType;
    const activeFaults = faults[subject] ?? [];
    const isActive = activeFaults.includes(ft);

    if (isActive && !btn.classList.contains("active")) {
      btn.classList.add("active");
    } else if (!isActive && btn.classList.contains("active")) {
      btn.classList.remove("active");
    }
  }
}
