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

const healthLevelEl = document.getElementById("health-level")!;
const healthSubsystemsEl = document.getElementById("health-subsystems")!;

function updateHealthDisplay(health: HealthSummary | undefined): void {
  if (!health) {
    healthLevelEl.textContent = "\u2014";
    healthLevelEl.removeAttribute("data-level");
    healthSubsystemsEl.innerHTML = "";
    return;
  }

  healthLevelEl.textContent = health.level.toUpperCase();
  healthLevelEl.setAttribute("data-level", health.level);

  const rows = health.subsystems.map((sub) => {
    const detail = sub.detail ? ` (${sub.detail})` : "";
    return `<div class="health-sub-row">
      <span class="health-sub-name">${sub.name}</span>
      <span class="health-sub-level" data-level="${sub.level}">${sub.level.toUpperCase()}${detail}</span>
    </div>`;
  });
  healthSubsystemsEl.innerHTML = rows.join("");
}

export function onTelemetryFrame(frame: SimFrame): void {
  updateHealthDisplay(frame.health);

  if (frame.state === "stopped") {
    for (const k of Object.keys(history)) history[k] = [];
    for (const k of Object.keys(gaugeEls) as (keyof typeof gaugeEls)[]) {
      gaugeEls[k].textContent = "\u2014";
    }
    return;
  }

  if (frame.state === "playing") {
    const values: Record<string, number> = {
      heading: frame.heading,
      speed: frame.speed * 1.94384,
      roll: frame.roll,
      pitch: frame.pitch,
    };
    for (const key of Object.keys(history)) {
      history[key].push(values[key]);
      if (history[key].length > HISTORY_SAMPLES) history[key].shift();
    }
    gaugeEls.heading.textContent = frame.heading.toFixed(1);
    gaugeEls.speed.textContent = (frame.speed * 1.94384).toFixed(2);
    gaugeEls.roll.textContent = frame.roll.toFixed(2);
    gaugeEls.pitch.textContent = frame.pitch.toFixed(2);
  }

  const sparkColor = cssVar("--instrument-enhanced-primary-color") || "#5a84bf";
  for (const key of Object.keys(svgEls) as (keyof typeof svgEls)[]) {
    if (history[key].length > 1) {
      svgEls[key].style.stroke = sparkColor;
      sparkline(svgEls[key], history[key]);
    }
  }
}
