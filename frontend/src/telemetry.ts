import { sparkline } from "@fnando/sparkline";
import { cssVar } from "./theme";
import type { SimFrame, HealthSummary } from "./types";

const HISTORY_SAMPLES = 30 * 20;

const history: Record<string, number[]> = {
  heading: [], speed: [], roll: [], pitch: [],
};

const gaugeEls = {
  heading: document.getElementById("gauge-heading")!,
  speed: document.getElementById("gauge-speed")!,
  roll: document.getElementById("gauge-roll")!,
  pitch: document.getElementById("gauge-pitch")!,
};

const svgEls = {
  heading: document.getElementById("spark-heading") as unknown as SVGSVGElement,
  speed: document.getElementById("spark-speed") as unknown as SVGSVGElement,
  roll: document.getElementById("spark-roll") as unknown as SVGSVGElement,
  pitch: document.getElementById("spark-pitch") as unknown as SVGSVGElement,
};

const gaugeRudder = document.getElementById("gauge-rudder")!;
const gaugeThrust = document.getElementById("gauge-thrust")!;
const rudderNeedle = document.getElementById("rudder-needle")!;
const rudderNeedleSet = document.getElementById("rudder-needle-set")!;
const thrustBarFill = document.getElementById("thrust-bar-fill")!;
const thrustSetMarker = document.getElementById("thrust-set-marker")!;
const gaugeRudderSet = document.getElementById("gauge-rudder-set")!;
const gaugeThrustSet = document.getElementById("gauge-thrust-set")!;
const rudderSetRow = document.getElementById("rudder-set-row")!;
const thrustSetRow = document.getElementById("thrust-set-row")!;
const headingSetRow = document.getElementById("heading-set-row")!;
const gaugeHeadingSet = document.getElementById("gauge-heading-set")!;

let currentOperationMode: string = "autonomous";
let setpointRudder: number | null = null;
let setpointEngine: number | null = null;
let lastActualHeading: number = 0;

const healthLevelEl = document.getElementById("health-level")!;
const healthSubsystemsEl = document.getElementById("health-subsystems")!;

function updateHealthDisplay(health: HealthSummary | undefined): void {
  if (!health) {
    healthLevelEl.textContent = "\u2014";
    healthLevelEl.removeAttribute("data-level");
    healthSubsystemsEl.innerHTML = "";
    const healthPanel = document.getElementById("health-panel");
    if (healthPanel) healthPanel.removeAttribute("data-health");
    return;
  }

  healthLevelEl.textContent = health.level.toUpperCase();
  healthLevelEl.setAttribute("data-level", health.level);

  // Update health panel border glow to reflect overall state
  const healthPanel = document.getElementById("health-panel");
  if (healthPanel) healthPanel.setAttribute("data-health", health.level);

  const rows = health.subsystems.map((sub) => {
    const detail = sub.detail ? ` (${sub.detail})` : "";
    return `<div class="health-sub-row">
      <span class="health-sub-name">${sub.name}</span>
      <span class="health-sub-level" data-level="${sub.level}">${sub.level.toUpperCase()}${detail}</span>
    </div>`;
  });
  healthSubsystemsEl.innerHTML = rows.join("");
}

export function setOperationMode(mode: string): void {
  currentOperationMode = mode;
  if (mode !== "operated") {
    clearSetpointIndicators();
  }
}

export function onManualSetpoint(rudderDeg: number, engine: number): void {
  setpointRudder = rudderDeg;
  setpointEngine = engine;
  updateSetpointIndicators();
}

function clearSetpointIndicators(): void {
  setpointRudder = null;
  setpointEngine = null;
  rudderNeedleSet.setAttribute("opacity", "0");
  thrustSetMarker.style.opacity = "0";
  rudderSetRow.classList.remove("visible");
  thrustSetRow.classList.remove("visible");
  headingSetRow.classList.remove("visible");
  gaugeRudderSet.textContent = "\u2014";
  gaugeThrustSet.textContent = "\u2014";
  gaugeHeadingSet.textContent = "\u2014";
}

function updateSetpointIndicators(): void {
  if (currentOperationMode !== "operated" || setpointRudder === null || setpointEngine === null) {
    clearSetpointIndicators();
    return;
  }

  // Show set-value rows
  rudderSetRow.classList.add("visible");
  thrustSetRow.classList.add("visible");
  headingSetRow.classList.add("visible");
  gaugeHeadingSet.textContent = "\u2014";

  // Rudder set needle: shows the directly commanded rudder angle
  gaugeRudderSet.textContent = setpointRudder.toFixed(1);
  const clampedRudder = Math.max(-35, Math.min(35, setpointRudder));
  const setAngle = (clampedRudder / 35) * 90;
  rudderNeedleSet.setAttribute("transform", `rotate(${setAngle}, 60, 60)`);
  rudderNeedleSet.setAttribute("opacity", "0.85");

  // Thrust set marker
  const setPct = Math.max(0, Math.min(100, setpointEngine * 100));
  gaugeThrustSet.textContent = setPct.toFixed(0);
  thrustSetMarker.style.opacity = "0.9";
  thrustSetMarker.style.bottom = `${setPct}%`;
}

export function onTelemetryFrame(frame: SimFrame): void {
  updateHealthDisplay(frame.health);

  lastActualHeading = frame.heading;

  const values: Record<string, number> = {
    heading: frame.heading,
    speed: frame.speed * 1.94384,
    roll: frame.roll,
    pitch: frame.pitch,
  };
  for (const key of Object.keys(history)) {
    const v = values[key];
    history[key].push(Number.isFinite(v) ? v : 0);
    if (history[key].length > HISTORY_SAMPLES) history[key].shift();
  }
  gaugeEls.heading.textContent = frame.heading.toFixed(1);
  gaugeEls.speed.textContent = (frame.speed * 1.94384).toFixed(2);
  gaugeEls.roll.textContent = frame.roll.toFixed(2);
  gaugeEls.pitch.textContent = frame.pitch.toFixed(2);

  // Conning display — always shows actual values
  const rudder = frame.rudder_deg ?? 0;
  const thrust = frame.thrust_pct ?? 0;
  gaugeRudder.textContent = rudder.toFixed(1);
  gaugeThrust.textContent = thrust.toFixed(0);
  // Rudder needle: map [-35, +35] degrees to arc rotation.
  const clampedRudder = Math.max(-35, Math.min(35, rudder));
  const needleAngle = (clampedRudder / 35) * 90;
  rudderNeedle.setAttribute("transform", `rotate(${needleAngle}, 60, 60)`);
  // Thrust bar
  const clampedThrust = Math.max(0, Math.min(100, thrust));
  thrustBarFill.style.height = `${clampedThrust}%`;

  updateSetpointIndicators();

  const sparkColor = cssVar("--instrument-enhanced-primary-color") || "#5a84bf";
  for (const key of Object.keys(svgEls) as (keyof typeof svgEls)[]) {
    if (history[key].length > 1) {
      svgEls[key].style.stroke = sparkColor;
      sparkline(svgEls[key], history[key]);
    }
  }
}
