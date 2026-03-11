import { sparkline } from "@fnando/sparkline";
import { cssVar } from "./theme";
import type { SimFrame } from "./types";

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

export function onTelemetryFrame(frame: SimFrame): void {
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
