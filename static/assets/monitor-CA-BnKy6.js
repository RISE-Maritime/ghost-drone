import { C as q, o as G, __tla as __tla_0 } from "./config-B9ykmmDk.js";
Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const D = "v0", R = [
    "location_fix",
    "heading_true_north_deg",
    "speed_over_ground_knots",
    "roll_deg",
    "pitch_deg"
  ], M = {
    0: "unknown",
    1: "inactive",
    2: "critical",
    3: "degraded",
    4: "nominal"
  }, Q = {
    0: "manned_on_board",
    1: "operated",
    2: "directed",
    3: "delegated",
    4: "monitored",
    5: "autonomous"
  };
  function T(t, n) {
    let e = 0, s = 0, o = n;
    for (; o < t.length; ) {
      const a = t[o];
      if (e |= (a & 127) << s, o++, (a & 128) === 0) break;
      s += 7;
    }
    return [
      e >>> 0,
      o
    ];
  }
  function y(t) {
    const n = [];
    let e = 0;
    for (; e < t.length; ) {
      const [s, o] = T(t, e);
      e = o;
      const a = s >>> 3, l = s & 7;
      if (l === 0) {
        const [u, h] = T(t, e);
        e = h, n.push({
          fieldNumber: a,
          wireType: l,
          value: u
        });
      } else if (l === 2) {
        const [u, h] = T(t, e);
        e = h, n.push({
          fieldNumber: a,
          wireType: l,
          value: t.slice(e, e + u)
        }), e += u;
      } else if (l === 5) n.push({
        fieldNumber: a,
        wireType: l,
        value: t.slice(e, e + 4)
      }), e += 4;
      else if (l === 1) n.push({
        fieldNumber: a,
        wireType: l,
        value: t.slice(e, e + 8)
      }), e += 8;
      else break;
    }
    return n;
  }
  function z(t, n) {
    const e = t.find((s) => s.fieldNumber === n && s.wireType === 2);
    return e ? e.value : null;
  }
  function H(t, n) {
    const e = t.find((s) => s.fieldNumber === n && s.wireType === 0);
    return e !== void 0 ? e.value : null;
  }
  function C(t, n) {
    const e = t.find((o) => o.fieldNumber === n && o.wireType === 5);
    return e ? new DataView(e.value.buffer, e.value.byteOffset, 4).getFloat32(0, true) : null;
  }
  function g(t, n) {
    const e = z(t, n);
    return e ? new TextDecoder().decode(e) : "";
  }
  function N(t, n) {
    return t.filter((e) => e.fieldNumber === n);
  }
  function X(t) {
    try {
      const n = y(t), e = z(n, 2);
      if (!e) return null;
      const s = y(e), o = M[H(s, 2) ?? 0] ?? "unknown", a = C(s, 3) ?? 0, l = Q[H(s, 4) ?? 0] ?? "unknown", u = g(s, 5), h = [];
      for (const i of N(s, 6)) {
        const r = y(i.value);
        h.push({
          name: g(r, 1),
          level: M[H(r, 2) ?? 0] ?? "unknown",
          detail: g(r, 3)
        });
      }
      const p = [];
      for (const i of N(s, 7)) {
        const r = y(i.value);
        p.push({
          subject: g(r, 1),
          sourceId: g(r, 2),
          rateHz: C(r, 3) ?? 0
        });
      }
      return {
        level: o,
        rateHz: a,
        operationMode: l,
        operator: u,
        subsystems: h,
        telemetryExpectations: p
      };
    } catch (n) {
      return console.warn("[monitor] failed to decode health message:", n), null;
    }
  }
  const O = new URLSearchParams(window.location.search), F = O.get("realm") ?? "rise", ee = O.get("remote_api") ?? "ws://localhost:10001", d = /* @__PURE__ */ new Map();
  let c = null, v = null;
  const _ = document.getElementById("drone-tabs"), k = document.getElementById("no-drones-msg"), P = document.getElementById("drone-panel"), b = document.getElementById("health-overall"), S = document.getElementById("health-mode"), B = document.getElementById("health-rate-hz"), $ = document.getElementById("subsystems-container"), A = document.getElementById("faults-container"), te = document.getElementById("rate-table-body"), ne = document.getElementById("health-log"), E = document.getElementById("connection-status");
  function V(t) {
    return d.has(t) || (d.set(t, {
      entityId: t,
      lastHealth: null,
      receivedTimestamps: {},
      actualRates: {},
      healthLog: []
    }), W(), c || J(t)), d.get(t);
  }
  function se(t) {
    return t.toTimeString().slice(0, 8);
  }
  async function U() {
    try {
      const t = new q(ee);
      v = await G(t), console.log("[monitor] zenoh session opened"), E.textContent = "CONNECTED", E.className = "connected", await oe(), await ae();
    } catch (t) {
      console.error("[monitor] connection failed, retrying in 2s:", t), E.textContent = "DISCONNECTED", E.className = "disconnected", setTimeout(U, 2e3);
    }
  }
  async function oe() {
    if (v) for (const t of R) {
      const n = `${F}/@${D}/*/pubsub/${t}/**`;
      await v.declareSubscriber(n, {
        handler: (e) => {
          const o = e.keyexpr().toString().split("/")[2] ?? "";
          o && j(o, t);
        }
      });
    }
  }
  async function ae() {
    if (!v) return;
    const t = `${F}/@${D}/*/pubsub/entity_health/**`;
    await v.declareSubscriber(t, {
      handler: (n) => {
        const s = n.keyexpr().toString().split("/")[2] ?? "";
        if (!s) return;
        j(s, "entity_health");
        const o = n.payload().toBytes(), a = X(new Uint8Array(o));
        a && le(s, a);
      }
    });
  }
  const I = 5e3;
  function j(t, n) {
    const e = V(t), s = performance.now();
    e.receivedTimestamps[n] || (e.receivedTimestamps[n] = []), e.receivedTimestamps[n].push(s);
    const o = s - I, a = e.receivedTimestamps[n];
    for (; a.length > 0 && a[0] < o; ) a.shift();
    e.actualRates[n] = a.length / (I / 1e3);
  }
  function le(t, n) {
    var _a;
    const e = V(t), s = (_a = e.lastHealth) == null ? void 0 : _a.level;
    e.lastHealth = n, e.healthLog.unshift({
      time: /* @__PURE__ */ new Date(),
      msg: n
    }), e.healthLog.length > 200 && e.healthLog.pop(), t === c && (K(), Y(), (n.level !== s || e.healthLog.length <= 3) && x());
  }
  function W() {
    if (_.innerHTML = "", d.size === 0) {
      k.style.display = "", P.style.display = "none";
      return;
    }
    k.style.display = "none";
    for (const t of d.keys()) {
      const n = document.createElement("button");
      n.className = "drone-tab" + (t === c ? " active" : ""), n.textContent = t, n.addEventListener("click", () => J(t)), _.appendChild(n);
    }
  }
  function J(t) {
    c = t, P.style.display = "", W(), re();
  }
  function re() {
    K(), Y(), Z(), x();
  }
  function K() {
    var _a;
    if (!c) return;
    const n = (_a = d.get(c)) == null ? void 0 : _a.lastHealth;
    if (!n) {
      b.textContent = "--", b.className = "health-badge unknown", S.textContent = "--", B.textContent = "--", $.innerHTML = "";
      return;
    }
    b.textContent = n.level, b.className = `health-badge ${n.level}`, S.textContent = n.operationMode, B.textContent = n.rateHz.toFixed(1) + " Hz", $.innerHTML = "";
    for (const e of n.subsystems) {
      const s = document.createElement("div");
      s.className = "health-row", s.innerHTML = `
      <span class="health-label">${e.name}</span>
      <span class="health-badge ${e.level}">${e.level}</span>
      ${e.detail ? `<span class="health-detail">${e.detail}</span>` : ""}
    `, $.appendChild(s);
    }
  }
  function Y() {
    var _a;
    if (!c) return;
    const n = (_a = d.get(c)) == null ? void 0 : _a.lastHealth;
    if (!n) {
      A.innerHTML = '<span class="no-faults">No health data yet</span>';
      return;
    }
    let e = "", s = false;
    for (const o of n.subsystems) {
      if (!o.detail) continue;
      const a = o.detail.split(",").map((l) => l.trim()).filter(Boolean);
      for (const l of a) s = true, e += `<span class="fault-chip">${o.name}: ${l}</span>`;
    }
    A.innerHTML = s ? e : '<span class="no-faults">No active faults</span>';
  }
  function Z() {
    var _a;
    if (!c) return;
    const t = d.get(c);
    if (!t) return;
    const n = {};
    if (t.lastHealth) for (const o of t.lastHealth.telemetryExpectations) n[o.subject] = o.rateHz;
    const e = [
      ...R,
      "entity_health"
    ];
    let s = "";
    for (const o of e) {
      const a = o === "entity_health" ? ((_a = t.lastHealth) == null ? void 0 : _a.rateHz) ?? null : n[o] ?? null, l = t.actualRates[o] ?? 0, u = a !== null ? a.toFixed(1) : "--", h = l.toFixed(1);
      let p = "--", i = "deviation-ok", r = "rate-none", f = 0, m = "#555";
      if (a !== null && a > 0) {
        const w = (l - a) / a * 100;
        p = (w >= 0 ? "+" : "") + w.toFixed(0) + "%";
        const L = Math.abs(w);
        l === 0 ? (r = "rate-bad", i = "deviation-bad", m = "#d33", f = 0) : L <= 15 ? (r = "rate-ok", i = "deviation-ok", m = "#0b0", f = Math.min(100, l / a * 100)) : L <= 50 ? (r = "rate-warn", i = "deviation-warn", m = "#da0", f = Math.min(100, l / a * 100)) : (r = "rate-bad", i = "deviation-bad", m = "#d33", f = Math.min(100, l / a * 100));
      } else l > 0 && (r = "rate-ok", f = 50, m = "#0b0");
      s += `<tr>
      <td>${o}</td>
      <td class="rate-cell">${u}</td>
      <td class="rate-cell ${r}">${h}</td>
      <td class="deviation-cell ${i}">${p}</td>
      <td>
        <div class="rate-bar-container">
          <div class="rate-bar-fill" style="width:${f}%;background:${m}"></div>
        </div>
      </td>
    </tr>`;
    }
    te.innerHTML = s;
  }
  function x() {
    if (!c) return;
    const t = d.get(c);
    if (!t) return;
    let n = "";
    for (const e of t.healthLog.slice(0, 50)) {
      const s = e.msg, o = s.level === "nominal" ? "rate-ok" : s.level === "degraded" ? "rate-warn" : s.level === "critical" ? "rate-bad" : "rate-none", a = s.subsystems.map((l) => `${l.name}:${l.level}${l.detail ? `(${l.detail})` : ""}`).join(", ");
      n += `<div class="log-entry">
      <span class="log-time">${se(e.time)}</span>
      <span class="log-level ${o}">${s.level}</span>
      <span class="log-msg">mode=${s.operationMode} | ${a}</span>
    </div>`;
    }
    ne.innerHTML = n || '<span class="no-faults">No health messages yet</span>';
  }
  setInterval(() => {
    c && Z(), c && x();
  }, 1e3);
  document.getElementById("theme-select").addEventListener("change", function() {
    document.documentElement.setAttribute("data-obc-theme", this.value);
  });
  U();
});
