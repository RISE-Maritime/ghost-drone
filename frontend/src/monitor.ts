/**
 * monitor.ts — Telemetry & health monitor page.
 *
 * Connects to zenoh and subscribes ONLY to raw keelson messages:
 * - entity_health protobuf → decoded for health status, subsystems,
 *   operation mode, and telemetry_expectations (expected rates)
 * - telemetry subjects → counted to measure actual receive rates
 *
 * Does NOT use sim_frame or any other convenience channel.
 */

import { Config, Session, open, Duration, type Sample } from "@eclipse-zenoh/zenoh-ts";

const KEELSON_VERSION = "v0";

// Telemetry subjects we monitor for rate measurement
const TELEMETRY_SUBJECTS = [
  "location_fix",
  "heading_true_north_deg",
  "speed_over_ground_knots",
  "roll_deg",
  "pitch_deg",
];

const HEALTH_LEVEL_NAMES: Record<number, string> = {
  0: "unknown",
  1: "inactive",
  2: "critical",
  3: "degraded",
  4: "nominal",
};

const OPERATION_MODE_NAMES: Record<number, string> = {
  0: "manned_on_board",
  1: "operated",
  2: "directed",
  3: "delegated",
  4: "monitored",
  5: "autonomous",
};

// ---- Minimal protobuf wire-format decoder ----
// Handles the subset needed: varint, length-delimited, fixed32, fixed64.

interface ProtoField {
  fieldNumber: number;
  wireType: number;
  value: Uint8Array | number | bigint;
}

function decodeVarint(buf: Uint8Array, offset: number): [number, number] {
  let result = 0;
  let shift = 0;
  let pos = offset;
  while (pos < buf.length) {
    const b = buf[pos];
    result |= (b & 0x7f) << shift;
    pos++;
    if ((b & 0x80) === 0) break;
    shift += 7;
  }
  return [result >>> 0, pos];
}

function decodeProtoFields(buf: Uint8Array): ProtoField[] {
  const fields: ProtoField[] = [];
  let pos = 0;
  while (pos < buf.length) {
    const [tag, nextPos] = decodeVarint(buf, pos);
    pos = nextPos;
    const fieldNumber = tag >>> 3;
    const wireType = tag & 0x7;

    if (wireType === 0) {
      // Varint
      const [value, np] = decodeVarint(buf, pos);
      pos = np;
      fields.push({ fieldNumber, wireType, value });
    } else if (wireType === 2) {
      // Length-delimited
      const [len, np] = decodeVarint(buf, pos);
      pos = np;
      fields.push({ fieldNumber, wireType, value: buf.slice(pos, pos + len) });
      pos += len;
    } else if (wireType === 5) {
      // Fixed32 (float)
      fields.push({ fieldNumber, wireType, value: buf.slice(pos, pos + 4) });
      pos += 4;
    } else if (wireType === 1) {
      // Fixed64
      fields.push({ fieldNumber, wireType, value: buf.slice(pos, pos + 8) });
      pos += 8;
    } else {
      break; // Unknown wire type, stop
    }
  }
  return fields;
}

function fieldAsBytes(fields: ProtoField[], num: number): Uint8Array | null {
  const f = fields.find(f => f.fieldNumber === num && f.wireType === 2);
  return f ? f.value as Uint8Array : null;
}

function fieldAsVarint(fields: ProtoField[], num: number): number | null {
  const f = fields.find(f => f.fieldNumber === num && f.wireType === 0);
  return f !== undefined ? f.value as number : null;
}

function fieldAsFloat32(fields: ProtoField[], num: number): number | null {
  const f = fields.find(f => f.fieldNumber === num && f.wireType === 5);
  if (!f) return null;
  const dv = new DataView((f.value as Uint8Array).buffer, (f.value as Uint8Array).byteOffset, 4);
  return dv.getFloat32(0, true);
}

function fieldAsString(fields: ProtoField[], num: number): string {
  const b = fieldAsBytes(fields, num);
  return b ? new TextDecoder().decode(b) : "";
}

function fieldsAll(fields: ProtoField[], num: number): ProtoField[] {
  return fields.filter(f => f.fieldNumber === num);
}

// ---- Decoded health types ----

interface SubsystemHealth {
  name: string;
  level: string;
  detail: string;
}

interface TelemetryExpectation {
  subject: string;
  sourceId: string;
  rateHz: number;
}

interface HealthMessage {
  level: string;
  rateHz: number;
  operationMode: string;
  operator: string;
  subsystems: SubsystemHealth[];
  telemetryExpectations: TelemetryExpectation[];
}

/**
 * Decode a keelson-enclosed EntityHealth message from raw bytes.
 *
 * Wire layout:
 *   Keelson Envelope { field 1: Timestamp, field 2: payload (bytes) }
 *   payload = EntityHealth protobuf
 */
function decodeHealthMessage(raw: Uint8Array): HealthMessage | null {
  try {
    // 1. Unwrap keelson envelope: field 2 = payload bytes
    const envFields = decodeProtoFields(raw);
    const payload = fieldAsBytes(envFields, 2);
    if (!payload) return null;

    // 2. Decode EntityHealth
    const hf = decodeProtoFields(payload);

    const level = HEALTH_LEVEL_NAMES[fieldAsVarint(hf, 2) ?? 0] ?? "unknown";
    const rateHz = fieldAsFloat32(hf, 3) ?? 0;
    const operationMode = OPERATION_MODE_NAMES[fieldAsVarint(hf, 4) ?? 0] ?? "unknown";
    const operator = fieldAsString(hf, 5);

    // Repeated SubsystemHealth (field 6)
    const subsystems: SubsystemHealth[] = [];
    for (const sf of fieldsAll(hf, 6)) {
      const sub = decodeProtoFields(sf.value as Uint8Array);
      subsystems.push({
        name: fieldAsString(sub, 1),
        level: HEALTH_LEVEL_NAMES[fieldAsVarint(sub, 2) ?? 0] ?? "unknown",
        detail: fieldAsString(sub, 3),
      });
    }

    // Repeated TelemetryExpectation (field 7)
    const telemetryExpectations: TelemetryExpectation[] = [];
    for (const tf of fieldsAll(hf, 7)) {
      const te = decodeProtoFields(tf.value as Uint8Array);
      telemetryExpectations.push({
        subject: fieldAsString(te, 1),
        sourceId: fieldAsString(te, 2),
        rateHz: fieldAsFloat32(te, 3) ?? 0,
      });
    }

    return { level, rateHz, operationMode, operator, subsystems, telemetryExpectations };
  } catch (e) {
    console.warn("[monitor] failed to decode health message:", e);
    return null;
  }
}

// ---- URL params ----
const params = new URLSearchParams(window.location.search);
const realm = params.get("realm") ?? "rise";
const remoteApiUrl = params.get("remote_api") ?? "ws://localhost:10001";

// ---- State ----
interface DroneState {
  entityId: string;
  lastHealth: HealthMessage | null;
  receivedTimestamps: Record<string, number[]>; // subject → receive times (ms)
  actualRates: Record<string, number>;          // subject → measured Hz
  healthLog: { time: Date; msg: HealthMessage }[];
}

const drones = new Map<string, DroneState>();
let selectedDrone: string | null = null;
let session: Session | null = null;

// ---- DOM refs ----
const droneTabs = document.getElementById("drone-tabs")!;
const noDronesMsg = document.getElementById("no-drones-msg")!;
const dronePanel = document.getElementById("drone-panel")!;
const healthOverall = document.getElementById("health-overall")!;
const healthMode = document.getElementById("health-mode")!;
const healthRateHz = document.getElementById("health-rate-hz")!;
const subsystemsContainer = document.getElementById("subsystems-container")!;
const faultsContainer = document.getElementById("faults-container")!;
const rateTableBody = document.getElementById("rate-table-body")!;
const healthLogEl = document.getElementById("health-log")!;
const connectionStatus = document.getElementById("connection-status")!;

// ---- Helpers ----

function ensureDrone(entityId: string): DroneState {
  if (!drones.has(entityId)) {
    drones.set(entityId, {
      entityId,
      lastHealth: null,
      receivedTimestamps: {},
      actualRates: {},
      healthLog: [],
    });
    refreshTabs();
    if (!selectedDrone) selectDrone(entityId);
  }
  return drones.get(entityId)!;
}

function formatTime(d: Date): string {
  return d.toTimeString().slice(0, 8);
}

// ---- Zenoh connection ----

async function connectZenoh(): Promise<void> {
  try {
    const config = new Config(remoteApiUrl);
    session = await open(config);
    console.log("[monitor] zenoh session opened");
    connectionStatus.textContent = "CONNECTED";
    connectionStatus.className = "connected";

    await subscribeTelemetry();
    await subscribeHealth();
  } catch (err) {
    console.error("[monitor] connection failed, retrying in 2s:", err);
    connectionStatus.textContent = "DISCONNECTED";
    connectionStatus.className = "disconnected";
    setTimeout(connectZenoh, 2000);
  }
}

async function subscribeTelemetry(): Promise<void> {
  if (!session) return;
  for (const subject of TELEMETRY_SUBJECTS) {
    const keyExpr = `${realm}/@${KEELSON_VERSION}/*/pubsub/${subject}/**`;
    await session.declareSubscriber(keyExpr, {
      handler: (sample: Sample) => {
        const parts = sample.keyexpr().toString().split("/");
        const entityId = parts[2] ?? "";
        if (!entityId) return;
        recordTelemetryHit(entityId, subject);
      },
    });
  }
}

async function subscribeHealth(): Promise<void> {
  if (!session) return;
  const keyExpr = `${realm}/@${KEELSON_VERSION}/*/pubsub/entity_health/**`;
  await session.declareSubscriber(keyExpr, {
    handler: (sample: Sample) => {
      const parts = sample.keyexpr().toString().split("/");
      const entityId = parts[2] ?? "";
      if (!entityId) return;

      // Count for rate measurement
      recordTelemetryHit(entityId, "entity_health");

      // Decode protobuf
      const raw = sample.payload().toBytes();
      const msg = decodeHealthMessage(new Uint8Array(raw));
      if (msg) handleHealthMessage(entityId, msg);
    },
  });
}

// ---- Data handling ----

const RATE_WINDOW_MS = 5000;

function recordTelemetryHit(entityId: string, subject: string): void {
  const drone = ensureDrone(entityId);
  const now = performance.now();
  if (!drone.receivedTimestamps[subject]) {
    drone.receivedTimestamps[subject] = [];
  }
  drone.receivedTimestamps[subject].push(now);

  const cutoff = now - RATE_WINDOW_MS;
  const stamps = drone.receivedTimestamps[subject];
  while (stamps.length > 0 && stamps[0] < cutoff) {
    stamps.shift();
  }
  drone.actualRates[subject] = stamps.length / (RATE_WINDOW_MS / 1000);
}

function handleHealthMessage(entityId: string, msg: HealthMessage): void {
  const drone = ensureDrone(entityId);
  const prevLevel = drone.lastHealth?.level;
  drone.lastHealth = msg;

  // Always log every health message (keep last 200)
  drone.healthLog.unshift({ time: new Date(), msg });
  if (drone.healthLog.length > 200) drone.healthLog.pop();

  if (entityId === selectedDrone) {
    renderHealth();
    renderFaults();
    // Only re-render log if level changed or it's the first few messages
    if (msg.level !== prevLevel || drone.healthLog.length <= 3) {
      renderHealthLog();
    }
  }
}

// ---- UI Rendering ----

function refreshTabs(): void {
  droneTabs.innerHTML = "";
  if (drones.size === 0) {
    noDronesMsg.style.display = "";
    dronePanel.style.display = "none";
    return;
  }
  noDronesMsg.style.display = "none";

  for (const eid of drones.keys()) {
    const btn = document.createElement("button");
    btn.className = "drone-tab" + (eid === selectedDrone ? " active" : "");
    btn.textContent = eid;
    btn.addEventListener("click", () => selectDrone(eid));
    droneTabs.appendChild(btn);
  }
}

function selectDrone(entityId: string): void {
  selectedDrone = entityId;
  dronePanel.style.display = "";
  refreshTabs();
  renderAll();
}

function renderAll(): void {
  renderHealth();
  renderFaults();
  renderRateTable();
  renderHealthLog();
}

function renderHealth(): void {
  if (!selectedDrone) return;
  const drone = drones.get(selectedDrone);
  const h = drone?.lastHealth;
  if (!h) {
    healthOverall.textContent = "--";
    healthOverall.className = "health-badge unknown";
    healthMode.textContent = "--";
    healthRateHz.textContent = "--";
    subsystemsContainer.innerHTML = "";
    return;
  }

  healthOverall.textContent = h.level;
  healthOverall.className = `health-badge ${h.level}`;
  healthMode.textContent = h.operationMode;
  healthRateHz.textContent = h.rateHz.toFixed(1) + " Hz";

  subsystemsContainer.innerHTML = "";
  for (const sub of h.subsystems) {
    const row = document.createElement("div");
    row.className = "health-row";
    row.innerHTML = `
      <span class="health-label">${sub.name}</span>
      <span class="health-badge ${sub.level}">${sub.level}</span>
      ${sub.detail ? `<span class="health-detail">${sub.detail}</span>` : ""}
    `;
    subsystemsContainer.appendChild(row);
  }
}

function renderFaults(): void {
  if (!selectedDrone) return;
  const drone = drones.get(selectedDrone);
  const h = drone?.lastHealth;
  if (!h) {
    faultsContainer.innerHTML = '<span class="no-faults">No health data yet</span>';
    return;
  }

  // Infer faults from subsystem details (detail field contains fault names like "drop, nan")
  let html = "";
  let hasAny = false;
  for (const sub of h.subsystems) {
    if (!sub.detail) continue;
    const faults = sub.detail.split(",").map(s => s.trim()).filter(Boolean);
    for (const fault of faults) {
      hasAny = true;
      html += `<span class="fault-chip">${sub.name}: ${fault}</span>`;
    }
  }
  faultsContainer.innerHTML = hasAny ? html : '<span class="no-faults">No active faults</span>';
}

function renderRateTable(): void {
  if (!selectedDrone) return;
  const drone = drones.get(selectedDrone);
  if (!drone) return;

  // Build expected rates from the latest health message's telemetry_expectations
  const expectedRates: Record<string, number> = {};
  if (drone.lastHealth) {
    for (const te of drone.lastHealth.telemetryExpectations) {
      expectedRates[te.subject] = te.rateHz;
    }
  }

  const allSubjects = [...TELEMETRY_SUBJECTS, "entity_health"];
  let html = "";

  for (const subject of allSubjects) {
    const expected = subject === "entity_health"
      ? (drone.lastHealth?.rateHz ?? null)
      : (expectedRates[subject] ?? null);
    const actual = drone.actualRates[subject] ?? 0;
    const expectedStr = expected !== null ? expected.toFixed(1) : "--";
    const actualStr = actual.toFixed(1);

    let devStr = "--";
    let devClass = "deviation-ok";
    let rateClass = "rate-none";
    let barPct = 0;
    let barColor = "#555";

    if (expected !== null && expected > 0) {
      const devPct = ((actual - expected) / expected) * 100;
      devStr = (devPct >= 0 ? "+" : "") + devPct.toFixed(0) + "%";

      const absDev = Math.abs(devPct);
      if (actual === 0) {
        rateClass = "rate-bad";
        devClass = "deviation-bad";
        barColor = "#d33";
        barPct = 0;
      } else if (absDev <= 15) {
        rateClass = "rate-ok";
        devClass = "deviation-ok";
        barColor = "#0b0";
        barPct = Math.min(100, (actual / expected) * 100);
      } else if (absDev <= 50) {
        rateClass = "rate-warn";
        devClass = "deviation-warn";
        barColor = "#da0";
        barPct = Math.min(100, (actual / expected) * 100);
      } else {
        rateClass = "rate-bad";
        devClass = "deviation-bad";
        barColor = "#d33";
        barPct = Math.min(100, (actual / expected) * 100);
      }
    } else if (actual > 0) {
      rateClass = "rate-ok";
      barPct = 50;
      barColor = "#0b0";
    }

    html += `<tr>
      <td>${subject}</td>
      <td class="rate-cell">${expectedStr}</td>
      <td class="rate-cell ${rateClass}">${actualStr}</td>
      <td class="deviation-cell ${devClass}">${devStr}</td>
      <td>
        <div class="rate-bar-container">
          <div class="rate-bar-fill" style="width:${barPct}%;background:${barColor}"></div>
        </div>
      </td>
    </tr>`;
  }

  rateTableBody.innerHTML = html;
}

function renderHealthLog(): void {
  if (!selectedDrone) return;
  const drone = drones.get(selectedDrone);
  if (!drone) return;

  let html = "";
  for (const entry of drone.healthLog.slice(0, 50)) {
    const m = entry.msg;
    const levelClass = m.level === "nominal" ? "rate-ok"
      : m.level === "degraded" ? "rate-warn"
      : m.level === "critical" ? "rate-bad"
      : "rate-none";

    const subsDesc = m.subsystems
      .map(s => `${s.name}:${s.level}${s.detail ? `(${s.detail})` : ""}`)
      .join(", ");

    html += `<div class="log-entry">
      <span class="log-time">${formatTime(entry.time)}</span>
      <span class="log-level ${levelClass}">${m.level}</span>
      <span class="log-msg">mode=${m.operationMode} | ${subsDesc}</span>
    </div>`;
  }

  healthLogEl.innerHTML = html || '<span class="no-faults">No health messages yet</span>';
}

// ---- Periodic UI refresh for rates ----

setInterval(() => {
  if (selectedDrone) {
    renderRateTable();
  }
  // Also refresh the health log periodically to show all messages
  if (selectedDrone) {
    renderHealthLog();
  }
}, 1000);

// ---- Theme ----

document.getElementById("theme-select")!.addEventListener("change", function (this: HTMLSelectElement) {
  document.documentElement.setAttribute("data-obc-theme", this.value);
});

// ---- Boot ----

connectZenoh();
