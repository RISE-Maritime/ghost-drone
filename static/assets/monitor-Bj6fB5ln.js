import { C as G, o as Q, __tla as __tla_0 } from "./config-B9ykmmDk.js";
Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const R = "v0", z = [
    "location_fix",
    "heading_true_north_deg",
    "speed_over_ground_knots",
    "roll_deg",
    "pitch_deg"
  ], C = {
    0: "unknown",
    1: "inactive",
    2: "critical",
    3: "degraded",
    4: "nominal"
  }, X = {
    0: "manned_on_board",
    1: "operated",
    2: "directed",
    3: "delegated",
    4: "monitored",
    5: "autonomous"
  };
  function T(t, n) {
    let e = 0, s = 0, a = n;
    for (; a < t.length; ) {
      const l = t[a];
      if (e |= (l & 127) << s, a++, (l & 128) === 0) break;
      s += 7;
    }
    return [
      e >>> 0,
      a
    ];
  }
  function y(t) {
    const n = [];
    let e = 0;
    for (; e < t.length; ) {
      const [s, a] = T(t, e);
      e = a;
      const l = s >>> 3, o = s & 7;
      if (o === 0) {
        const [u, f] = T(t, e);
        e = f, n.push({
          fieldNumber: l,
          wireType: o,
          value: u
        });
      } else if (o === 2) {
        const [u, f] = T(t, e);
        e = f, n.push({
          fieldNumber: l,
          wireType: o,
          value: t.slice(e, e + u)
        }), e += u;
      } else if (o === 5) n.push({
        fieldNumber: l,
        wireType: o,
        value: t.slice(e, e + 4)
      }), e += 4;
      else if (o === 1) n.push({
        fieldNumber: l,
        wireType: o,
        value: t.slice(e, e + 8)
      }), e += 8;
      else break;
    }
    return n;
  }
  function O(t, n) {
    const e = t.find((s) => s.fieldNumber === n && s.wireType === 2);
    return e ? e.value : null;
  }
  function $(t, n) {
    const e = t.find((s) => s.fieldNumber === n && s.wireType === 0);
    return e !== void 0 ? e.value : null;
  }
  function N(t, n) {
    const e = t.find((a) => a.fieldNumber === n && a.wireType === 5);
    return e ? new DataView(e.value.buffer, e.value.byteOffset, 4).getFloat32(0, true) : null;
  }
  function g(t, n) {
    const e = O(t, n);
    return e ? new TextDecoder().decode(e) : "";
  }
  function _(t, n) {
    return t.filter((e) => e.fieldNumber === n);
  }
  function ee(t) {
    try {
      const n = y(t), e = O(n, 2);
      if (!e) return null;
      const s = y(e), a = C[$(s, 2) ?? 0] ?? "unknown", l = N(s, 3) ?? 0, o = X[$(s, 4) ?? 0] ?? "unknown", u = g(s, 5), f = [];
      for (const i of _(s, 6)) {
        const r = y(i.value);
        f.push({
          name: g(r, 1),
          level: C[$(r, 2) ?? 0] ?? "unknown",
          detail: g(r, 3)
        });
      }
      const p = [];
      for (const i of _(s, 7)) {
        const r = y(i.value);
        p.push({
          subject: g(r, 1),
          sourceId: g(r, 2),
          rateHz: N(r, 3) ?? 0
        });
      }
      return {
        level: a,
        rateHz: l,
        operationMode: o,
        operator: u,
        subsystems: f,
        telemetryExpectations: p
      };
    } catch (n) {
      return console.warn("[monitor] failed to decode health message:", n), null;
    }
  }
  const F = new URLSearchParams(window.location.search), P = F.get("realm") ?? "rise", te = F.get("remote_api") ?? "ws://localhost:10001", d = /* @__PURE__ */ new Map();
  let c = null, v = null;
  const k = document.getElementById("drone-tabs"), S = document.getElementById("no-drones-msg"), V = document.getElementById("drone-panel"), b = document.getElementById("health-overall"), B = document.getElementById("health-mode"), A = document.getElementById("health-rate-hz"), H = document.getElementById("subsystems-container"), I = document.getElementById("faults-container"), ne = document.getElementById("rate-table-body"), se = document.getElementById("health-log"), E = document.getElementById("connection-status");
  function K(t) {
    return d.has(t) || (d.set(t, {
      entityId: t,
      lastHealth: null,
      receivedTimestamps: {},
      actualRates: {},
      lastKeyExprs: {},
      healthLog: []
    }), j(), c || J(t)), d.get(t);
  }
  function oe(t) {
    return t.toTimeString().slice(0, 8);
  }
  async function U() {
    try {
      const t = new G(te);
      v = await Q(t), console.log("[monitor] zenoh session opened"), E.textContent = "CONNECTED", E.className = "connected", await ae(), await le();
    } catch (t) {
      console.error("[monitor] connection failed, retrying in 2s:", t), E.textContent = "DISCONNECTED", E.className = "disconnected", setTimeout(U, 2e3);
    }
  }
  async function ae() {
    if (v) for (const t of z) {
      const n = `${P}/@${R}/*/pubsub/${t}/**`;
      await v.declareSubscriber(n, {
        handler: (e) => {
          const s = e.keyexpr().toString(), l = s.split("/")[2] ?? "";
          l && W(l, t, s);
        }
      });
    }
  }
  async function le() {
    if (!v) return;
    const t = `${P}/@${R}/*/pubsub/entity_health/**`;
    await v.declareSubscriber(t, {
      handler: (n) => {
        const e = n.keyexpr().toString(), a = e.split("/")[2] ?? "";
        if (!a) return;
        W(a, "entity_health", e);
        const l = n.payload().toBytes(), o = ee(new Uint8Array(l));
        o && re(a, o);
      }
    });
  }
  const D = 5e3;
  function W(t, n, e) {
    const s = K(t), a = performance.now();
    s.receivedTimestamps[n] || (s.receivedTimestamps[n] = []), s.receivedTimestamps[n].push(a), e && (s.lastKeyExprs[n] = e);
    const l = a - D, o = s.receivedTimestamps[n];
    for (; o.length > 0 && o[0] < l; ) o.shift();
    s.actualRates[n] = o.length / (D / 1e3);
  }
  function re(t, n) {
    var _a;
    const e = K(t), s = (_a = e.lastHealth) == null ? void 0 : _a.level;
    e.lastHealth = n, e.healthLog.unshift({
      time: /* @__PURE__ */ new Date(),
      msg: n
    }), e.healthLog.length > 200 && e.healthLog.pop(), t === c && (Y(), Z(), (n.level !== s || e.healthLog.length <= 3) && x());
  }
  function j() {
    if (k.innerHTML = "", d.size === 0) {
      S.style.display = "", V.style.display = "none";
      return;
    }
    S.style.display = "none";
    for (const t of d.keys()) {
      const n = document.createElement("button");
      n.className = "drone-tab" + (t === c ? " active" : ""), n.textContent = t, n.addEventListener("click", () => J(t)), k.appendChild(n);
    }
  }
  function J(t) {
    c = t, V.style.display = "", j(), ce();
  }
  function ce() {
    Y(), Z(), q(), x();
  }
  function Y() {
    var _a;
    if (!c) return;
    const n = (_a = d.get(c)) == null ? void 0 : _a.lastHealth;
    if (!n) {
      b.textContent = "--", b.className = "health-badge unknown", B.textContent = "--", A.textContent = "--", H.innerHTML = "";
      return;
    }
    b.textContent = n.level, b.className = `health-badge ${n.level}`, B.textContent = n.operationMode, A.textContent = n.rateHz.toFixed(1) + " Hz", H.innerHTML = "";
    for (const e of n.subsystems) {
      const s = document.createElement("div");
      s.className = "health-row", s.innerHTML = `
      <span class="health-label">${e.name}</span>
      <span class="health-badge ${e.level}">${e.level}</span>
      ${e.detail ? `<span class="health-detail">${e.detail}</span>` : ""}
    `, H.appendChild(s);
    }
  }
  function Z() {
    var _a;
    if (!c) return;
    const n = (_a = d.get(c)) == null ? void 0 : _a.lastHealth;
    if (!n) {
      I.innerHTML = '<span class="no-faults">No health data yet</span>';
      return;
    }
    let e = "", s = false;
    for (const a of n.subsystems) {
      if (!a.detail) continue;
      const l = a.detail.split(",").map((o) => o.trim()).filter(Boolean);
      for (const o of l) s = true, e += `<span class="fault-chip">${a.name}: ${o}</span>`;
    }
    I.innerHTML = s ? e : '<span class="no-faults">No active faults</span>';
  }
  function q() {
    var _a;
    if (!c) return;
    const t = d.get(c);
    if (!t) return;
    const n = {};
    if (t.lastHealth) for (const a of t.lastHealth.telemetryExpectations) n[a.subject] = a.rateHz;
    const e = [
      ...z,
      "entity_health"
    ];
    let s = "";
    for (const a of e) {
      const l = a === "entity_health" ? ((_a = t.lastHealth) == null ? void 0 : _a.rateHz) ?? null : n[a] ?? null, o = t.actualRates[a] ?? 0, u = l !== null ? l.toFixed(1) : "--", f = o.toFixed(1);
      let p = "--", i = "deviation-ok", r = "rate-none", h = 0, m = "#555";
      if (l !== null && l > 0) {
        const w = (o - l) / l * 100;
        p = (w >= 0 ? "+" : "") + w.toFixed(0) + "%";
        const M = Math.abs(w);
        o === 0 ? (r = "rate-bad", i = "deviation-bad", m = "#d33", h = 0) : M <= 15 ? (r = "rate-ok", i = "deviation-ok", m = "#0b0", h = Math.min(100, o / l * 100)) : M <= 50 ? (r = "rate-warn", i = "deviation-warn", m = "#da0", h = Math.min(100, o / l * 100)) : (r = "rate-bad", i = "deviation-bad", m = "#d33", h = Math.min(100, o / l * 100));
      } else o > 0 && (r = "rate-ok", h = 50, m = "#0b0");
      const L = t.lastKeyExprs[a] ?? "--";
      s += `<tr>
      <td>${a}</td>
      <td class="keyexpr-cell" title="${L}">${L}</td>
      <td class="rate-cell">${u}</td>
      <td class="rate-cell ${r}">${f}</td>
      <td class="deviation-cell ${i}">${p}</td>
      <td>
        <div class="rate-bar-container">
          <div class="rate-bar-fill" style="width:${h}%;background:${m}"></div>
        </div>
      </td>
    </tr>`;
    }
    ne.innerHTML = s;
  }
  function x() {
    if (!c) return;
    const t = d.get(c);
    if (!t) return;
    let n = "";
    for (const e of t.healthLog.slice(0, 50)) {
      const s = e.msg, a = s.level === "nominal" ? "rate-ok" : s.level === "degraded" ? "rate-warn" : s.level === "critical" ? "rate-bad" : "rate-none", l = s.subsystems.map((o) => `${o.name}:${o.level}${o.detail ? `(${o.detail})` : ""}`).join(", ");
      n += `<div class="log-entry">
      <span class="log-time">${oe(e.time)}</span>
      <span class="log-level ${a}">${s.level}</span>
      <span class="log-msg">mode=${s.operationMode} | ${l}</span>
    </div>`;
    }
    se.innerHTML = n || '<span class="no-faults">No health messages yet</span>';
  }
  setInterval(() => {
    c && q(), c && x();
  }, 1e3);
  document.getElementById("theme-select").addEventListener("change", function() {
    document.documentElement.setAttribute("data-obc-theme", this.value);
  });
  U();
});
