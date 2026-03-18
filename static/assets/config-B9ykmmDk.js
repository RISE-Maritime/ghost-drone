var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
let Ui, ge, Ei;
let __tla = (async () => {
  (function() {
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload")) return;
    for (const s of document.querySelectorAll('link[rel="modulepreload"]')) i(s);
    new MutationObserver((s) => {
      for (const n of s) if (n.type === "childList") for (const l of n.addedNodes) l.tagName === "LINK" && l.rel === "modulepreload" && i(l);
    }).observe(document, {
      childList: true,
      subtree: true
    });
    function r(s) {
      const n = {};
      return s.integrity && (n.integrity = s.integrity), s.referrerPolicy && (n.referrerPolicy = s.referrerPolicy), s.crossOrigin === "use-credentials" ? n.credentials = "include" : s.crossOrigin === "anonymous" ? n.credentials = "omit" : n.credentials = "same-origin", n;
    }
    function i(s) {
      if (s.ep) return;
      s.ep = true;
      const n = r(s);
      fetch(s.href, n);
    }
  })();
  const wt = "/assets/zenoh_keyexpr_wrapper_bg-Dc8Z_9zx.wasm", _t = async (t = {}, e) => {
    let r;
    if (e.startsWith("data:")) {
      const i = e.replace(/^data:.*?base64,/, "");
      let s;
      if (typeof Buffer == "function" && typeof Buffer.from == "function") s = Buffer.from(i, "base64");
      else if (typeof atob == "function") {
        const n = atob(i);
        s = new Uint8Array(n.length);
        for (let l = 0; l < n.length; l++) s[l] = n.charCodeAt(l);
      } else throw new Error("Cannot decode base64-encoded data URL");
      r = await WebAssembly.instantiate(s, t);
    } else {
      const i = await fetch(e), s = i.headers.get("Content-Type") || "";
      if ("instantiateStreaming" in WebAssembly && s.startsWith("application/wasm")) r = await WebAssembly.instantiateStreaming(i, t);
      else {
        const n = await i.arrayBuffer();
        r = await WebAssembly.instantiate(n, t);
      }
    }
    return r.instance.exports;
  };
  let w;
  function bt(t) {
    w = t;
  }
  const It = typeof TextDecoder > "u" ? (0, module.require)("util").TextDecoder : TextDecoder;
  let $e = new It("utf-8", {
    ignoreBOM: true,
    fatal: true
  });
  $e.decode();
  let oe = null;
  function he() {
    return (oe === null || oe.byteLength === 0) && (oe = new Uint8Array(w.memory.buffer)), oe;
  }
  function ue(t, e) {
    return t = t >>> 0, $e.decode(he().subarray(t, t + e));
  }
  let R = 0;
  const pt = typeof TextEncoder > "u" ? (0, module.require)("util").TextEncoder : TextEncoder;
  let fe = new pt("utf-8");
  const Tt = typeof fe.encodeInto == "function" ? function(t, e) {
    return fe.encodeInto(t, e);
  } : function(t, e) {
    const r = fe.encode(t);
    return e.set(r), {
      read: t.length,
      written: r.length
    };
  };
  function F(t, e, r) {
    if (r === void 0) {
      const c = fe.encode(t), A = e(c.length, 1) >>> 0;
      return he().subarray(A, A + c.length).set(c), R = c.length, A;
    }
    let i = t.length, s = e(i, 1) >>> 0;
    const n = he();
    let l = 0;
    for (; l < i; l++) {
      const c = t.charCodeAt(l);
      if (c > 127) break;
      n[s + l] = c;
    }
    if (l !== i) {
      l !== 0 && (t = t.slice(l)), s = r(s, i, i = l + t.length * 3, 1) >>> 0;
      const c = he().subarray(s + l, s + i), A = Tt(t, c);
      l += A.written, s = r(s, i, l, 1) >>> 0;
    }
    return R = l, s;
  }
  function ee(t) {
    const e = w.__wbindgen_export_0.get(t);
    return w.__externref_table_dealloc(t), e;
  }
  function St(t) {
    const e = F(t, w.__wbindgen_malloc, w.__wbindgen_realloc), r = R, i = w.new_key_expr(e, r);
    if (i[1]) throw ee(i[0]);
  }
  function Lt(t, e) {
    let r, i;
    try {
      const l = F(t, w.__wbindgen_malloc, w.__wbindgen_realloc), c = R, A = F(e, w.__wbindgen_malloc, w.__wbindgen_realloc), T = R, m = w.join(l, c, A, T);
      var s = m[0], n = m[1];
      if (m[3]) throw s = 0, n = 0, ee(m[2]);
      return r = s, i = n, ue(s, n);
    } finally {
      w.__wbindgen_free(r, i, 1);
    }
  }
  function gt(t, e) {
    let r, i;
    try {
      const l = F(t, w.__wbindgen_malloc, w.__wbindgen_realloc), c = R, A = F(e, w.__wbindgen_malloc, w.__wbindgen_realloc), T = R, m = w.concat(l, c, A, T);
      var s = m[0], n = m[1];
      if (m[3]) throw s = 0, n = 0, ee(m[2]);
      return r = s, i = n, ue(s, n);
    } finally {
      w.__wbindgen_free(r, i, 1);
    }
  }
  function Et(t, e) {
    const r = F(t, w.__wbindgen_malloc, w.__wbindgen_realloc), i = R, s = F(e, w.__wbindgen_malloc, w.__wbindgen_realloc), n = R, l = w.includes(r, i, s, n);
    if (l[2]) throw ee(l[1]);
    return l[0] !== 0;
  }
  function Ut(t, e) {
    const r = F(t, w.__wbindgen_malloc, w.__wbindgen_realloc), i = R, s = F(e, w.__wbindgen_malloc, w.__wbindgen_realloc), n = R, l = w.intersects(r, i, s, n);
    if (l[2]) throw ee(l[1]);
    return l[0] !== 0;
  }
  function mt(t) {
    let e, r;
    try {
      const n = F(t, w.__wbindgen_malloc, w.__wbindgen_realloc), l = R, c = w.autocanonize(n, l);
      var i = c[0], s = c[1];
      if (c[3]) throw i = 0, s = 0, ee(c[2]);
      return e = i, r = s, ue(i, s);
    } finally {
      w.__wbindgen_free(e, r, 1);
    }
  }
  function Nt() {
    const t = w.__wbindgen_export_0, e = t.grow(4);
    t.set(0, void 0), t.set(e + 0, void 0), t.set(e + 1, null), t.set(e + 2, true), t.set(e + 3, false);
  }
  function Ot(t, e) {
    return ue(t, e);
  }
  function Dt(t, e) {
    throw new Error(ue(t, e));
  }
  URL = globalThis.URL;
  const M = await _t({
    "./zenoh_keyexpr_wrapper_bg.js": {
      __wbindgen_string_new: Ot,
      __wbindgen_throw: Dt,
      __wbindgen_init_externref_table: Nt
    }
  }, wt), zt = M.memory, Ct = M.new_key_expr, vt = M.join, Pt = M.concat, Bt = M.includes, Mt = M.intersects, Rt = M.autocanonize, kt = M.__wbindgen_export_0, Ft = M.__wbindgen_malloc, qt = M.__wbindgen_realloc, Gt = M.__externref_table_dealloc, Qt = M.__wbindgen_free, et = M.__wbindgen_start, xt = Object.freeze(Object.defineProperty({
    __proto__: null,
    __externref_table_dealloc: Gt,
    __wbindgen_export_0: kt,
    __wbindgen_free: Qt,
    __wbindgen_malloc: Ft,
    __wbindgen_realloc: qt,
    __wbindgen_start: et,
    autocanonize: Rt,
    concat: Pt,
    includes: Bt,
    intersects: Mt,
    join: vt,
    memory: zt,
    new_key_expr: Ct
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  bt(xt);
  et();
  class b {
    constructor(e) {
      __publicField(this, "inner_");
      let r;
      if (e instanceof b) {
        this.inner_ = e.inner_;
        return;
      } else e instanceof String ? r = e.toString() : r = e;
      St(r), this.inner_ = r;
    }
    toString() {
      return this.inner_;
    }
    join(e) {
      const r = Lt(this.inner_, b.intoString(e));
      return new b(r);
    }
    concat(e) {
      const r = gt(this.inner_, b.intoString(e));
      return new b(r);
    }
    includes(e) {
      return Et(this.inner_, b.intoString(e));
    }
    intersects(e) {
      return Ut(this.inner_, b.intoString(e));
    }
    static autocanonize(e) {
      const r = mt(b.intoString(e));
      return new b(r);
    }
    static intoString(e) {
      return e instanceof b ? e.inner_ : e instanceof String ? e.toString() : e;
    }
  }
  class g {
    constructor(e) {
      __publicField(this, "buffer_");
      if (e instanceof g) this.buffer_ = e.buffer_;
      else if (e instanceof String || typeof e == "string") {
        const i = new TextEncoder().encode(e.toString());
        this.buffer_ = i;
      } else this.buffer_ = Uint8Array.from(e);
    }
    len() {
      return this.buffer_.length;
    }
    isEmpty() {
      return this.buffer_.length == 0;
    }
    empty() {
      return new g(new Uint8Array());
    }
    toBytes() {
      return this.buffer_;
    }
    toString() {
      return new TextDecoder().decode(this.buffer_);
    }
  }
  var S;
  (function(t) {
    t[t.REAL_TIME = 1] = "REAL_TIME", t[t.INTERACTIVE_HIGH = 2] = "INTERACTIVE_HIGH", t[t.INTERACTIVE_LOW = 3] = "INTERACTIVE_LOW", t[t.DATA_HIGH = 4] = "DATA_HIGH", t[t.DATA = 5] = "DATA", t[t.DATA_LOW = 6] = "DATA_LOW", t[t.BACKGROUND = 7] = "BACKGROUND", t[t.DEFAULT = 5] = "DEFAULT";
  })(S || (S = {}));
  var P;
  (function(t) {
    t[t.DROP = 0] = "DROP", t[t.BLOCK = 1] = "BLOCK", t[t.DEFAULT_PUSH = 0] = "DEFAULT_PUSH", t[t.DEFAULT_REQUEST = 1] = "DEFAULT_REQUEST", t[t.DEFAULT_RESPONSE = 1] = "DEFAULT_RESPONSE";
  })(P || (P = {}));
  var B;
  (function(t) {
    t[t.BEST_EFFORT = 0] = "BEST_EFFORT", t[t.RELIABLE = 1] = "RELIABLE", t[t.DEFAULT = 1] = "DEFAULT";
  })(B || (B = {}));
  var U;
  (function(t) {
    t[t.SESSION_LOCAL = 0] = "SESSION_LOCAL", t[t.REMOTE = 1] = "REMOTE", t[t.ANY = 2] = "ANY", t[t.DEFAULT = 2] = "DEFAULT";
  })(U || (U = {}));
  var Z;
  (function(t) {
    t[t.PUT = 0] = "PUT", t[t.DELETE = 1] = "DELETE";
  })(Z || (Z = {}));
  var Ae;
  (function(t) {
    t[t.BEST_MATCHING = 0] = "BEST_MATCHING", t[t.ALL = 1] = "ALL", t[t.ALL_COMPLETE = 2] = "ALL_COMPLETE", t[t.DEFAULT = 0] = "DEFAULT";
  })(Ae || (Ae = {}));
  var de;
  (function(t) {
    t[t.AUTO = 0] = "AUTO", t[t.NONE = 1] = "NONE", t[t.MONOTONIC = 2] = "MONOTONIC", t[t.LATEST = 3] = "LATEST", t[t.DEFAULT = 0] = "DEFAULT";
  })(de || (de = {}));
  var G;
  (function(t) {
    t[t.ANY = 0] = "ANY", t[t.MATCHING_QUERY = 1] = "MATCHING_QUERY", t[t.DEFAULT = 1] = "DEFAULT";
  })(G || (G = {}));
  class Wt {
    constructor(e, r, i, s, n, l, c, A, T) {
      __publicField(this, "keyexpr_");
      __publicField(this, "payload_");
      __publicField(this, "kind_");
      __publicField(this, "encoding_");
      __publicField(this, "attachment_");
      __publicField(this, "timestamp_");
      __publicField(this, "priority_");
      __publicField(this, "congestionControl_");
      __publicField(this, "express_");
      this.keyexpr_ = e, this.payload_ = r, this.kind_ = i, this.encoding_ = s, this.attachment_ = n, this.timestamp_ = l, this.priority_ = c, this.congestionControl_ = A, this.express_ = T;
    }
    keyexpr() {
      return this.keyexpr_;
    }
    payload() {
      return this.payload_;
    }
    kind() {
      return this.kind_;
    }
    encoding() {
      return this.encoding_;
    }
    timestamp() {
      return this.timestamp_;
    }
    congestionControl() {
      return this.congestionControl_;
    }
    priority() {
      return this.priority_;
    }
    express() {
      return this.express_;
    }
    attachment() {
      return this.attachment_;
    }
  }
  class Vt {
    constructor(e, r) {
      __publicField(this, "zid");
      __publicField(this, "ntp64");
      this.zid = e, this.ntp64 = r;
    }
    getId() {
      return this.zid;
    }
    getNtp64() {
      return this.ntp64;
    }
    getMsSinceUnixEpoch() {
      const e = Number(this.ntp64 >> 32n), i = Number(this.ntp64 & 0xffffffffn) * 1e3 / 4294967296;
      return e * 1e3 + i;
    }
    asDate() {
      return new Date(this.getMsSinceUnixEpoch());
    }
  }
  const _ye = class _ye {
    constructor(e) {
      __publicField(this, "zid");
      if (this.zid = e, e.length != 16) throw new Error("Zid should contain exactly 16 bytes");
    }
    toString() {
      let e = "";
      for (let r = this.zid.length - 1; r >= 0; --r) {
        let i = this.zid[r];
        e += _ye.KEY[i >> 4], e += _ye.KEY[i & 15];
      }
      return e;
    }
    toLeBytes() {
      return this.zid;
    }
  };
  __publicField(_ye, "KEY", "0123456789abcdef");
  let ye = _ye;
  var h;
  (function(t) {
    t[t.ZENOH_BYTES = 0] = "ZENOH_BYTES", t[t.ZENOH_STRING = 1] = "ZENOH_STRING", t[t.ZENOH_SERIALIZED = 2] = "ZENOH_SERIALIZED", t[t.APPLICATION_OCTET_STREAM = 3] = "APPLICATION_OCTET_STREAM", t[t.TEXT_PLAIN = 4] = "TEXT_PLAIN", t[t.APPLICATION_JSON = 5] = "APPLICATION_JSON", t[t.TEXT_JSON = 6] = "TEXT_JSON", t[t.APPLICATION_CDR = 7] = "APPLICATION_CDR", t[t.APPLICATION_CBOR = 8] = "APPLICATION_CBOR", t[t.APPLICATION_YAML = 9] = "APPLICATION_YAML", t[t.TEXT_YAML = 10] = "TEXT_YAML", t[t.TEXT_JSON5 = 11] = "TEXT_JSON5", t[t.APPLICATION_PYTHON_SERIALIZED_OBJECT = 12] = "APPLICATION_PYTHON_SERIALIZED_OBJECT", t[t.APPLICATION_PROTOBUF = 13] = "APPLICATION_PROTOBUF", t[t.APPLICATION_JAVA_SERIALIZED_OBJECT = 14] = "APPLICATION_JAVA_SERIALIZED_OBJECT", t[t.APPLICATION_OPENMETRICS_TEXT = 15] = "APPLICATION_OPENMETRICS_TEXT", t[t.IMAGE_PNG = 16] = "IMAGE_PNG", t[t.IMAGE_JPEG = 17] = "IMAGE_JPEG", t[t.IMAGE_GIF = 18] = "IMAGE_GIF", t[t.IMAGE_BMP = 19] = "IMAGE_BMP", t[t.IMAGE_WEBP = 20] = "IMAGE_WEBP", t[t.APPLICATION_XML = 21] = "APPLICATION_XML", t[t.APPLICATION_X_WWW_FORM_URLENCODED = 22] = "APPLICATION_X_WWW_FORM_URLENCODED", t[t.TEXT_HTML = 23] = "TEXT_HTML", t[t.TEXT_XML = 24] = "TEXT_XML", t[t.TEXT_CSS = 25] = "TEXT_CSS", t[t.TEXT_JAVASCRIPT = 26] = "TEXT_JAVASCRIPT", t[t.TEXT_MARKDOWN = 27] = "TEXT_MARKDOWN", t[t.TEXT_CSV = 28] = "TEXT_CSV", t[t.APPLICATION_SQL = 29] = "APPLICATION_SQL", t[t.APPLICATION_COAP_PAYLOAD = 30] = "APPLICATION_COAP_PAYLOAD", t[t.APPLICATION_JSON_PATCH_JSON = 31] = "APPLICATION_JSON_PATCH_JSON", t[t.APPLICATION_JSON_SEQ = 32] = "APPLICATION_JSON_SEQ", t[t.APPLICATION_JSONPATH = 33] = "APPLICATION_JSONPATH", t[t.APPLICATION_JWT = 34] = "APPLICATION_JWT", t[t.APPLICATION_MP4 = 35] = "APPLICATION_MP4", t[t.APPLICATION_SOAP_XML = 36] = "APPLICATION_SOAP_XML", t[t.APPLICATION_YANG = 37] = "APPLICATION_YANG", t[t.AUDIO_AAC = 38] = "AUDIO_AAC", t[t.AUDIO_FLAC = 39] = "AUDIO_FLAC", t[t.AUDIO_MP4 = 40] = "AUDIO_MP4", t[t.AUDIO_OGG = 41] = "AUDIO_OGG", t[t.AUDIO_VORBIS = 42] = "AUDIO_VORBIS", t[t.VIDEO_H261 = 43] = "VIDEO_H261", t[t.VIDEO_H263 = 44] = "VIDEO_H263", t[t.VIDEO_H264 = 45] = "VIDEO_H264", t[t.VIDEO_H265 = 46] = "VIDEO_H265", t[t.VIDEO_H266 = 47] = "VIDEO_H266", t[t.VIDEO_MP4 = 48] = "VIDEO_MP4", t[t.VIDEO_OGG = 49] = "VIDEO_OGG", t[t.VIDEO_RAW = 50] = "VIDEO_RAW", t[t.VIDEO_VP8 = 51] = "VIDEO_VP8", t[t.VIDEO_VP9 = 52] = "VIDEO_VP9", t[t.CUSTOM = 65535] = "CUSTOM";
  })(h || (h = {}));
  function tt(t) {
    switch (t) {
      case h.APPLICATION_OCTET_STREAM:
        return "application/octet-stream";
      case h.APPLICATION_PYTHON_SERIALIZED_OBJECT:
        return "application/python-serialized-object";
      case h.APPLICATION_JAVA_SERIALIZED_OBJECT:
        return "application/java-serialized-object";
      case h.APPLICATION_OPENMETRICS_TEXT:
        return "application/openmetrics-text";
      case h.APPLICATION_X_WWW_FORM_URLENCODED:
        return "application/x-www-form-urlencoded";
      case h.APPLICATION_COAP_PAYLOAD:
        return "application/coap-payload";
      case h.APPLICATION_JSON_PATCH_JSON:
        return "application/json-patch+json";
      case h.APPLICATION_JSON_SEQ:
        return "application/json-seq";
      case h.APPLICATION_SOAP_XML:
        return "application/soap+xml";
      default:
        return h[t].toLocaleLowerCase().replaceAll("_", "/");
    }
  }
  function Ht() {
    let t = /* @__PURE__ */ new Map();
    for (let e in h) {
      let r = Number(e);
      !isNaN(r) && r != h.CUSTOM && t.set(r, tt(r));
    }
    return t;
  }
  function Xt() {
    let t = /* @__PURE__ */ new Map();
    for (let e in h) {
      let r = Number(e);
      !isNaN(r) && r != h.CUSTOM && t.set(tt(r), r);
    }
    return t;
  }
  const _o = class _o {
    constructor(e, r) {
      __publicField(this, "id");
      __publicField(this, "schema");
      this.id = e, this.schema = r;
    }
    withSchema(e) {
      if (this.id != h.CUSTOM || this.schema == null) return new _o(this.id, e);
      {
        const r = this.schema.indexOf(_o.SEP);
        return r == -1 ? new _o(this.id, this.schema + ";" + e) : new _o(this.id, this.schema.substring(0, r) + ";" + e);
      }
    }
    static default() {
      return new _o(h.ZENOH_BYTES);
    }
    toString() {
      let e = "";
      return this.id != h.CUSTOM && (e += _o.ID_TO_ENCODING.get(this.id)), this.schema != null && (this.id != h.CUSTOM && (e += ";"), e += this.schema), e;
    }
    static fromString(e) {
      if (e.length == 0) return new _o(h.ZENOH_BYTES, void 0);
      const r = e.indexOf(_o.SEP);
      let i, s;
      r == -1 ? i = e : (i = e.substring(0, r), s = e.substring(r + 1));
      const n = _o.ENCODING_TO_ID.get(i) ?? h.CUSTOM;
      return n == h.CUSTOM && (s = s ? i + ";" + s : i), new _o(n, s);
    }
    static from(e) {
      return e instanceof _o ? e : _o.fromString(e.toString());
    }
    toIdSchema() {
      return [
        this.id,
        this.schema
      ];
    }
  };
  __publicField(_o, "ID_TO_ENCODING", Ht());
  __publicField(_o, "ENCODING_TO_ID", Xt());
  __publicField(_o, "SEP", ";");
  __publicField(_o, "ZENOH_BYTES", new _o(h.ZENOH_BYTES));
  __publicField(_o, "ZENOH_STRING", new _o(h.ZENOH_STRING));
  __publicField(_o, "ZENOH_SERIALIZED", new _o(h.ZENOH_SERIALIZED));
  __publicField(_o, "APPLICATION_OCTET_STREAM", new _o(h.APPLICATION_OCTET_STREAM));
  __publicField(_o, "TEXT_PLAIN", new _o(h.TEXT_PLAIN));
  __publicField(_o, "APPLICATION_JSON", new _o(h.APPLICATION_JSON));
  __publicField(_o, "TEXT_JSON", new _o(h.TEXT_JSON));
  __publicField(_o, "APPLICATION_CDR", new _o(h.APPLICATION_CDR));
  __publicField(_o, "APPLICATION_CBOR", new _o(h.APPLICATION_CBOR));
  __publicField(_o, "APPLICATION_YAML", new _o(h.APPLICATION_YAML));
  __publicField(_o, "TEXT_YAML", new _o(h.TEXT_YAML));
  __publicField(_o, "TEXT_JSON5", new _o(h.TEXT_JSON5));
  __publicField(_o, "APPLICATION_PROTOBUF", new _o(h.APPLICATION_PROTOBUF));
  __publicField(_o, "APPLICATION_PYTHON_SERIALIZED_OBJECT", new _o(h.APPLICATION_PYTHON_SERIALIZED_OBJECT));
  __publicField(_o, "APPLICATION_JAVA_SERIALIZED_OBJECT", new _o(h.APPLICATION_JAVA_SERIALIZED_OBJECT));
  __publicField(_o, "APPLICATION_OPENMETRICS_TEXT", new _o(h.APPLICATION_OPENMETRICS_TEXT));
  __publicField(_o, "IMAGE_PNG", new _o(h.IMAGE_PNG));
  __publicField(_o, "IMAGE_JPEG", new _o(h.IMAGE_JPEG));
  __publicField(_o, "IMAGE_GIF", new _o(h.IMAGE_GIF));
  __publicField(_o, "IMAGE_BMP", new _o(h.IMAGE_BMP));
  __publicField(_o, "IMAGE_WEBP", new _o(h.IMAGE_WEBP));
  __publicField(_o, "APPLICATION_XML", new _o(h.APPLICATION_XML));
  __publicField(_o, "APPLICATION_X_WWW_FORM_URLENCODED", new _o(h.APPLICATION_X_WWW_FORM_URLENCODED));
  __publicField(_o, "TEXT_HTML", new _o(h.TEXT_HTML));
  __publicField(_o, "TEXT_XML", new _o(h.TEXT_XML));
  __publicField(_o, "TEXT_CSS", new _o(h.TEXT_CSS));
  __publicField(_o, "TEXT_JAVASCRIPT", new _o(h.TEXT_JAVASCRIPT));
  __publicField(_o, "TEXT_MARKDOWN", new _o(h.TEXT_MARKDOWN));
  __publicField(_o, "TEXT_CSV", new _o(h.TEXT_CSV));
  __publicField(_o, "APPLICATION_SQL", new _o(h.APPLICATION_SQL));
  __publicField(_o, "APPLICATION_COAP_PAYLOAD", new _o(h.APPLICATION_COAP_PAYLOAD));
  __publicField(_o, "APPLICATION_JSON_PATCH_JSON", new _o(h.APPLICATION_JSON_PATCH_JSON));
  __publicField(_o, "APPLICATION_JSON_SEQ", new _o(h.APPLICATION_JSON_SEQ));
  __publicField(_o, "APPLICATION_JSONPATH", new _o(h.APPLICATION_JSONPATH));
  __publicField(_o, "APPLICATION_JWT", new _o(h.APPLICATION_JWT));
  __publicField(_o, "APPLICATION_MP4", new _o(h.APPLICATION_MP4));
  __publicField(_o, "APPLICATION_SOAP_XML", new _o(h.APPLICATION_SOAP_XML));
  __publicField(_o, "APPLICATION_YANG", new _o(h.APPLICATION_YANG));
  __publicField(_o, "AUDIO_AAC", new _o(h.AUDIO_AAC));
  __publicField(_o, "AUDIO_FLAC", new _o(h.AUDIO_FLAC));
  __publicField(_o, "AUDIO_MP4", new _o(h.AUDIO_MP4));
  __publicField(_o, "AUDIO_OGG", new _o(h.AUDIO_OGG));
  __publicField(_o, "AUDIO_VORBIS", new _o(h.AUDIO_VORBIS));
  __publicField(_o, "VIDEO_H261", new _o(h.VIDEO_H261));
  __publicField(_o, "VIDEO_H263", new _o(h.VIDEO_H263));
  __publicField(_o, "VIDEO_H264", new _o(h.VIDEO_H264));
  __publicField(_o, "VIDEO_H265", new _o(h.VIDEO_H265));
  __publicField(_o, "VIDEO_H266", new _o(h.VIDEO_H266));
  __publicField(_o, "VIDEO_MP4", new _o(h.VIDEO_MP4));
  __publicField(_o, "VIDEO_OGG", new _o(h.VIDEO_OGG));
  __publicField(_o, "VIDEO_RAW", new _o(h.VIDEO_RAW));
  __publicField(_o, "VIDEO_VP8", new _o(h.VIDEO_VP8));
  __publicField(_o, "VIDEO_VP9", new _o(h.VIDEO_VP9));
  let o = _o;
  var pe = {}, Te = {}, Qe;
  function Yt() {
    return Qe || (Qe = 1, (function(t) {
      Object.defineProperty(t, "__esModule", {
        value: true
      }), t.MultiReceiverChannel = t.SimpleChannel = t.TryReceivedKind = t.State = void 0;
      var e;
      (function(n) {
        n.empty = "empty", n.receiver = "receiver", n.data = "data", n.close = "close";
      })(e = t.State || (t.State = {}));
      var r;
      (function(n) {
        n.value = "value", n.notReceived = "no", n.close = "close";
      })(r = t.TryReceivedKind || (t.TryReceivedKind = {}));
      class i {
        constructor() {
          this.receivers = [], this.data = [], this._state = e.empty;
        }
        get state() {
          return this._state;
        }
        tryReceive() {
          if (this._state == e.data) {
            const l = this.data.shift();
            return l === null ? (this._state = e.close, {
              kind: r.close
            }) : (this.data.length === 0 && (this._state = e.empty), {
              kind: r.value,
              value: l
            });
          } else return {
            kind: r.notReceived
          };
        }
        receive() {
          if (this._state === e.close) return Promise.reject();
          if (this._state === e.data) {
            const l = this.data.shift();
            return l === null ? (this._state = e.close, Promise.reject()) : (this.data.length === 0 && (this._state = e.empty), Promise.resolve(l));
          } else return new Promise((l, c) => {
            this.receivers.push([
              l,
              c
            ]), this._state = e.receiver;
          });
        }
        send(l) {
          if (this._state === e.close) throw "sending on closed channel";
          if (this._state !== e.receiver) this.data.push(l), this._state = e.data;
          else {
            const [c] = this.receivers.shift();
            c(l), this.receivers.length === 0 && (this._state = e.empty);
          }
        }
        close() {
          if (this._state !== e.close) if (this._state !== e.receiver) this.data.push(null), this._state = e.data;
          else {
            const [, l] = this.receivers.shift();
            l(), this.receivers.length === 0 && (this._state = e.close);
          }
        }
        async *[Symbol.asyncIterator]() {
          try {
            for (; ; ) yield await this.receive();
          } catch {
          }
        }
      }
      t.SimpleChannel = i;
      class s {
        constructor() {
          this.chan = /* @__PURE__ */ new Set();
        }
        send(l) {
          for (const c of this.chan) c.send(l);
        }
        close() {
          for (const l of this.chan) l.close();
        }
        receiver() {
          const l = new i();
          return this.chan.add(l), l;
        }
        removeReceiver(l) {
          this.chan.delete(l);
        }
      }
      t.MultiReceiverChannel = s;
    })(Te)), Te;
  }
  var ne = {}, xe;
  function Jt() {
    if (xe) return ne;
    xe = 1, Object.defineProperty(ne, "__esModule", {
      value: true
    }), ne.observe = void 0;
    const t = rt();
    return ne.observe = (e) => (Object.defineProperties(e, {
      chan: {
        value: new t.MultiReceiverChannel()
      },
      notify: {
        value: function() {
          this.chan.send(this);
        }
      },
      receiver: {
        value: function() {
          return this.chan.receiver();
        }
      },
      removeReceiver: {
        value: function(r) {
          r.close(), this.chan.removeReceiver(r);
        }
      }
    }), e), ne;
  }
  var J = {}, We;
  function Zt() {
    if (We) return J;
    We = 1, Object.defineProperty(J, "__esModule", {
      value: true
    }), J.Guard = J.Mutex = void 0;
    class t {
      constructor() {
        this.resolveList = [], this.locked = [
          false
        ];
      }
      acquire() {
        return new Promise((i) => {
          if (this.locked[0]) this.resolveList.push(i);
          else {
            this.locked[0] = true;
            const s = new e(this.resolveList, this.locked);
            i(s);
          }
        });
      }
    }
    J.Mutex = t;
    class e {
      constructor(i, s) {
        this.resolveList = i, this.locked = s;
      }
      release() {
        const i = this.resolveList.shift();
        i ? i(this) : this.locked[0] = false;
      }
    }
    return J.Guard = e, J;
  }
  var Ve;
  function rt() {
    return Ve || (Ve = 1, (function(t) {
      Object.defineProperty(t, "__esModule", {
        value: true
      });
      var e = Yt();
      Object.defineProperty(t, "SimpleChannel", {
        enumerable: true,
        get: function() {
          return e.SimpleChannel;
        }
      }), Object.defineProperty(t, "ChannelState", {
        enumerable: true,
        get: function() {
          return e.State;
        }
      }), Object.defineProperty(t, "MultiReceiverChannel", {
        enumerable: true,
        get: function() {
          return e.MultiReceiverChannel;
        }
      }), Object.defineProperty(t, "TryReceivedKind", {
        enumerable: true,
        get: function() {
          return e.TryReceivedKind;
        }
      });
      var r = Jt();
      Object.defineProperty(t, "observe", {
        enumerable: true,
        get: function() {
          return r.observe;
        }
      });
      var i = Zt();
      Object.defineProperty(t, "Mutex", {
        enumerable: true,
        get: function() {
          return i.Mutex;
        }
      }), Object.defineProperty(t, "Guard", {
        enumerable: true,
        get: function() {
          return i.Guard;
        }
      });
    })(pe)), pe;
  }
  var He = rt();
  function jt(t) {
    return t.intoSenderReceiverPair != null;
  }
  function V(t) {
    if (jt(t)) {
      let [e, r] = t.intoSenderReceiverPair();
      return [
        (n) => {
          e.send(n);
        },
        () => {
          e.close();
        },
        r
      ];
    } else return Array.isArray(t) ? [
      t[0],
      t[1],
      void 0
    ] : [
      t,
      () => {
      },
      void 0
    ];
  }
  class H {
    constructor(e) {
      __publicField(this, "chan");
      __publicField(this, "capacity");
      __publicField(this, "size");
      this.capacity = e, this.size = 0, this.chan = new He.SimpleChannel();
    }
    send(e) {
      this.size != this.capacity && (this.chan.send(e), this.size++);
    }
    state() {
      return this.chan.state;
    }
    tryReceive() {
      let e = this.chan.tryReceive();
      return e.kind == He.TryReceivedKind.value && this.size--, e;
    }
    async receive() {
      let e = await this.chan.receive();
      return this.size--, e;
    }
    close() {
      this.chan.close();
    }
    async *[Symbol.asyncIterator]() {
      try {
        for (; ; ) yield await this.receive();
      } catch {
      }
    }
    intoSenderReceiverPair() {
      return [
        this,
        this
      ];
    }
  }
  const Kt = () => typeof self < "u" && typeof self.WebAssembly < "u" || typeof global < "u" && typeof global.WebAssembly < "u", it = (t, e = (r) => r !== void 0 ? ": " + r : "") => class extends Error {
    constructor(r) {
      super(t(r) + e(r));
      __publicField(this, "origMessage");
      this.origMessage = r !== void 0 ? String(r) : "";
    }
  }, $t = it(() => "index out of bounds"), er = (t) => {
    throw new $t(t);
  }, tr = (t, e, r) => (t < e || t >= r) && er(t), rr = it(() => "unsupported operation"), ir = (t) => {
    throw new rr(t);
  }, sr = "AGFzbQEAAAABCgJgAX4Bf2AAAX4DBQQAAQABBQMBABEGEQJ/AUGAgMAAC38AQYCAwAALB1gGBm1lbW9yeQIAD2xlYjEyOEVuY29kZVU2NAAAA2J1ZgMBD2xlYjEyOERlY29kZVU2NAABD2xlYjEyOEVuY29kZUk2NAACD2xlYjEyOERlY29kZUk2NAADCoYEBFsBAn8CQCAAQoABWgRAA0AgAUGAgEBrIACnQf8AcSAAQv8AVkEHdHI6AAAgAUEBaiEBIABCgAFUIABCB4ghAEUNAAsMAQtBgIDAACAAPAAAQQEhAQsgAUH/AXELdwIEfwF+IwBBEGsiACQAIABBADoADwNAAkAgACAALQAPIgJBB2pBP3E6AA8gAUGAgEBrLAAAIgNB/wBxrSACQT9xrYYgBIQhBCABQQFqIQIgAUEISw0AIAIhASADQQBIDQELC0GAgMAAIAI6AAAgAEEQaiQAIAQLkQEBA38CQCAAQkB9QoABWgRAQQEhAgNAIAJBAXFFDQIgAUGAgEBrQQBBgH8gAKciAkHAAHEiA0UgAEKAAVRxIANBBnYgAEIHhyIAQn9RcXIiAxsgAkH/AHFyOgAAIANFIQIgAUEBaiEBDAALAAtBgIDAACAAQjmIp0HAAHEgAKdBP3FyOgAAQQEhAQsgAUH/AXELnAECAX4EfyMAQRBrIgEkACABQQA6AA9BfyECA0ACQCABIAEtAA8iA0EHakE/cToADyACQYGAwABqLQAAIgRB/wBxrSADQT9xrYYgAIQhACAEwCEDIAJBAWoiAkEISw0AIANBAEgNAQsLIANBwABxRSACQQhLckUEQEJ/IAExAA+GIACEIQALQYCAwAAgAkEBajoAACABQRBqJAAgAAs=";
  let $, we;
  Kt() && ($ = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([
    ...atob(sr)
  ].map((e) => e.charCodeAt(0))))).exports, we = new Uint8Array($.memory.buffer, $.buf, 16));
  const st = () => !$ && ir("WASM module unavailable"), nr = (t, e) => (r, i, s = 0) => {
    st();
    const n = BigInt.asIntN(64, BigInt(i)), l = $[t](n);
    return tr(s, 0, r.length - l + 1), r.set(we.subarray(0, l), s), l;
  }, ar = (t, e) => (r, i = 0) => {
    st(), we.set(r.subarray(i, Math.min(i + 10, r.length)), 0);
    const s = $[t](0, 0);
    return [
      e ? BigInt.asIntN(64, s) : BigInt.asUintN(64, s),
      we[0]
    ];
  }, lr = ar("leb128DecodeU64", false), ur = nr("leb128EncodeU64");
  function cr(t) {
    return t instanceof Uint8Array;
  }
  function or(t) {
    return t instanceof Uint16Array;
  }
  function hr(t) {
    return t instanceof Uint32Array;
  }
  function fr(t) {
    return t instanceof BigUint64Array;
  }
  function Ar(t) {
    return t instanceof Int8Array;
  }
  function dr(t) {
    return t instanceof Int16Array;
  }
  function yr(t) {
    return t instanceof Int32Array;
  }
  function wr(t) {
    return t instanceof BigInt64Array;
  }
  function _r(t) {
    return t instanceof Float32Array;
  }
  function br(t) {
    return t instanceof Float64Array;
  }
  const v = new Uint32Array(new Uint8Array([
    1,
    2,
    3,
    4
  ]).buffer)[0] === 67305985;
  function Ir(t) {
    return t.serializeWithZSerializer !== void 0;
  }
  const _j = class _j {
    constructor() {
      __publicField(this, "buffer");
      __publicField(this, "bufferLen");
      __publicField(this, "data");
      __publicField(this, "len");
      this.data = new Array(), this.len = 0, this.buffer = new Uint8Array(_j.DEFAULT_BUFFER_SIZE), this.bufferLen = 0;
    }
    resetBuffer(e) {
      e < _j.DEFAULT_BUFFER_SIZE && (e = _j.DEFAULT_BUFFER_SIZE), this.buffer = new Uint8Array(e), this.bufferLen = 0;
    }
    ensureBuffer(e) {
      return this.bufferLen + e >= this.buffer.length && this.resetBuffer(e), this.bufferLen += e, this.buffer.subarray(this.bufferLen - e, this.bufferLen);
    }
    append(e) {
      this.data.push(e), this.len += e.length;
    }
    writeSequenceLength(e) {
      if (e <= _j.MAX_SEQUENCE_LENGTH_TO_FIT_IN_SINGLE_BYTE) {
        this.serializeNumberUint8(e);
        return;
      }
      let r = this.ensureBuffer(10), i = ur(r, e);
      r = r.subarray(0, i), this.bufferLen -= 10 - i, this.append(r);
    }
    serializeString(e) {
      if (e.length == 0) this.writeSequenceLength(0);
      else {
        const i = new TextEncoder().encode(e);
        this.writeSequenceLength(i.length), this.append(i);
      }
    }
    serializeUint8Array(e) {
      this.writeSequenceLength(e.length), this.append(e);
    }
    serializeUint16Array(e) {
      this.writeSequenceLength(e.length), v ? this.append(new Uint8Array(e.buffer)) : e.forEach((r) => this.serializeNumberUint16(r));
    }
    serializeUint32Array(e) {
      this.writeSequenceLength(e.length), v ? this.append(new Uint8Array(e.buffer)) : e.forEach((r) => this.serializeNumberUint32(r));
    }
    serializeBiguint64Array(e) {
      this.writeSequenceLength(e.length), v ? this.append(new Uint8Array(e.buffer)) : e.forEach((r) => this.serializeBigintUint64(r));
    }
    serializeInt8Array(e) {
      this.writeSequenceLength(e.length), this.append(new Uint8Array(e.buffer));
    }
    serializeInt16Array(e) {
      this.writeSequenceLength(e.length), v ? this.append(new Uint8Array(e.buffer)) : e.forEach((r) => this.serializeNumberInt16(r));
    }
    serializeInt32Array(e) {
      this.writeSequenceLength(e.length), v ? this.append(new Uint8Array(e.buffer)) : e.forEach((r) => this.serializeNumberInt32(r));
    }
    serializeBigint64Array(e) {
      this.writeSequenceLength(e.length), v ? this.append(new Uint8Array(e.buffer)) : e.forEach((r) => this.serializeBigintInt64(r));
    }
    serializeFloat32Array(e) {
      this.writeSequenceLength(e.length), v ? this.append(new Uint8Array(e.buffer)) : e.forEach((r) => this.serializeNumberFloat32(r));
    }
    serializeFloat64Array(e) {
      this.writeSequenceLength(e.length), v ? this.append(new Uint8Array(e.buffer)) : e.forEach((r) => this.serializeNumberFloat64(r));
    }
    serializeBigintInt64(e) {
      let r = this.ensureBuffer(8);
      new DataView(r.buffer, r.byteOffset, r.byteLength).setBigInt64(0, e, true), this.append(r);
    }
    serializeBigintUint64(e) {
      let r = this.ensureBuffer(8);
      new DataView(r.buffer, r.byteOffset, r.byteLength).setBigUint64(0, e, true), this.append(r);
    }
    serializeNumberFloat64(e) {
      let r = this.ensureBuffer(8);
      new DataView(r.buffer, r.byteOffset, r.byteLength).setFloat64(0, e, true), this.append(r);
    }
    serializeNumberFloat32(e) {
      let r = this.ensureBuffer(4);
      new DataView(r.buffer, r.byteOffset, r.byteLength).setFloat32(0, e, true), this.append(r);
    }
    serializeNumberInt64(e) {
      let r = BigInt(e);
      this.serializeBigintInt64(r);
    }
    serializeNumberUint64(e) {
      let r = BigInt(e);
      this.serializeBigintUint64(r);
    }
    serializeNumberInt32(e) {
      let r = this.ensureBuffer(4);
      new DataView(r.buffer, r.byteOffset, r.byteLength).setInt32(0, e, true), this.append(r);
    }
    serializeNumberUint32(e) {
      let r = this.ensureBuffer(4);
      new DataView(r.buffer, r.byteOffset, r.byteLength).setUint32(0, e, true), this.append(r);
    }
    serializeNumberInt16(e) {
      let r = this.ensureBuffer(2);
      new DataView(r.buffer, r.byteOffset, r.byteLength).setInt16(0, e, true), this.append(r);
    }
    serializeNumberUint16(e) {
      let r = this.ensureBuffer(2);
      new DataView(r.buffer, r.byteOffset, r.byteLength).setUint16(0, e, true), this.append(r);
    }
    serializeNumberInt8(e) {
      let r = this.ensureBuffer(1);
      new DataView(r.buffer, r.byteOffset, r.byteLength).setInt8(0, e), this.append(r);
    }
    serializeNumberUint8(e) {
      let r = this.ensureBuffer(1);
      r[0] = e, this.append(r);
    }
    serializeBoolean(e) {
      this.serializeNumberUint8(e === true ? 1 : 0);
    }
    serializeArray(e, r) {
      this.writeSequenceLength(e.length), e.length > 0 && r === void 0 && (r = this.getDefaultSerializationTag(e[0])), e.forEach((i) => r.serialize(this, i));
    }
    serializeMap(e, r, i) {
      if (this.writeSequenceLength(e.size), e.size > 0) {
        let s = e.entries().next();
        if (s !== void 0) {
          let n = s.value;
          n !== void 0 && (r ?? (r = this.getDefaultSerializationTag(n[0])), i ?? (i = this.getDefaultSerializationTag(n[1])));
        }
      }
      e.forEach((s, n) => {
        r.serialize(this, n), i.serialize(this, s);
      });
    }
    getDefaultSerializationTag(e) {
      if (Ir(e)) return E.object();
      if (typeof e == "number") return E.number();
      if (typeof e == "bigint") return E.bigint();
      if (typeof e == "string") return E.string();
      if (typeof e == "boolean") return E.boolean();
      if (cr(e)) return E.uint8array();
      if (or(e)) return E.uint16array();
      if (hr(e)) return E.uint32array();
      if (fr(e)) return E.biguint64array();
      if (Ar(e)) return E.int8array();
      if (dr(e)) return E.int16array();
      if (yr(e)) return E.int32array();
      if (wr(e)) return E.bigint64array();
      if (_r(e)) return E.float32array();
      if (br(e)) return E.float64array();
      if (Array.isArray(e)) {
        let r;
        return e.length > 0 && (r = this.getDefaultSerializationTag(e[0])), E.array(r);
      } else if (e instanceof Map) {
        let r, i, s = e.entries().next();
        if (s !== void 0) {
          let n = s.value;
          n !== void 0 && (r = this.getDefaultSerializationTag(n[0]), i = this.getDefaultSerializationTag(n[1]));
        }
        return E.map(r, i);
      } else throw new Error("Non-ZSerializeable type");
    }
    serialize(e, r) {
      r === void 0 ? this.getDefaultSerializationTag(e).serialize(this, e) : r.serialize(this, e);
    }
    finish() {
      const e = new g(this.toBytes());
      return this.data = new Array(), this.len = 0, this.bufferLen = 0, e;
    }
    toBytes() {
      if (this.data.length == 0) return new Uint8Array(0);
      if (this.data.length == 1) return this.data[0];
      {
        let e = new Uint8Array(this.len), r = 0;
        for (let i of this.data) e.set(i, r), r += i.length;
        return e;
      }
    }
  };
  __publicField(_j, "DEFAULT_BUFFER_SIZE", 256);
  __publicField(_j, "MAX_SEQUENCE_LENGTH_TO_FIT_IN_SINGLE_BYTE", 127);
  let j = _j;
  var L;
  (function(t) {
    t[t.Float64 = 1] = "Float64", t[t.Float32 = 2] = "Float32", t[t.Int64 = 3] = "Int64", t[t.Uint64 = 4] = "Uint64", t[t.Int32 = 5] = "Int32", t[t.Uint32 = 6] = "Uint32", t[t.Int16 = 7] = "Int16", t[t.Uint16 = 8] = "Uint16", t[t.Int8 = 9] = "Int8", t[t.Uint8 = 10] = "Uint8";
  })(L || (L = {}));
  var X;
  (function(t) {
    t[t.Int64 = 1] = "Int64", t[t.Uint64 = 2] = "Uint64";
  })(X || (X = {}));
  class I {
    constructor(e) {
      __publicField(this, "deserialize_");
      this.deserialize_ = e;
    }
    deserialize(e) {
      return this.deserialize_(e);
    }
  }
  class p {
    constructor(e) {
      __publicField(this, "serialize_");
      this.serialize_ = e;
    }
    serialize(e, r) {
      this.serialize_(e, r);
    }
  }
  var _e;
  (function(t) {
    function e(u = L.Float64) {
      switch (u) {
        case L.Float64:
          return new I((f) => f.deserializeNumberFloat64());
        case L.Float32:
          return new I((f) => f.deserializeNumberFloat32());
        case L.Int64:
          return new I((f) => f.deserializeNumberInt64());
        case L.Uint64:
          return new I((f) => f.deserializeNumberUint64());
        case L.Int32:
          return new I((f) => f.deserializeNumberInt32());
        case L.Uint32:
          return new I((f) => f.deserializeNumberUint32());
        case L.Int16:
          return new I((f) => f.deserializeNumberInt16());
        case L.Uint16:
          return new I((f) => f.deserializeNumberUint16());
        case L.Int8:
          return new I((f) => f.deserializeNumberInt8());
        case L.Uint8:
          return new I((f) => f.deserializeNumberUint8());
      }
    }
    t.number = e;
    function r(u = X.Int64) {
      switch (u) {
        case X.Int64:
          return new I((f) => f.deserializeBigintInt64());
        case X.Uint64:
          return new I((f) => f.deserializeBigintUint64());
      }
    }
    t.bigint = r;
    function i() {
      return new I((u) => u.deserializeString());
    }
    t.string = i;
    function s() {
      return new I((u) => u.deserializeBoolean());
    }
    t.boolean = s;
    function n() {
      return new I((u) => u.deserializeUint8Array());
    }
    t.uint8array = n;
    function l() {
      return new I((u) => u.deserializeUint16Array());
    }
    t.uint16array = l;
    function c() {
      return new I((u) => u.deserializeUint32Array());
    }
    t.uint32array = c;
    function A() {
      return new I((u) => u.deserializeBiguint64Array());
    }
    t.biguint64array = A;
    function T() {
      return new I((u) => u.deserializeInt8Array());
    }
    t.int8array = T;
    function m() {
      return new I((u) => u.deserializeInt16Array());
    }
    t.int16array = m;
    function D() {
      return new I((u) => u.deserializeInt32Array());
    }
    t.int32array = D;
    function re() {
      return new I((u) => u.deserializeBigint64Array());
    }
    t.bigint64array = re;
    function k() {
      return new I((u) => u.deserializeFloat32Array());
    }
    t.float32array = k;
    function Y() {
      return new I((u) => u.deserializeFloat64Array());
    }
    t.float64array = Y;
    function z(u) {
      return new I((f) => f.deserializeObject(u));
    }
    t.object = z;
    function ie(u) {
      return new I((f) => u(f));
    }
    t.objectStatic = ie;
    function C(u) {
      return new I((f) => f.deserializeArray(u));
    }
    t.array = C;
    function y(u, f) {
      return new I((se) => se.deserializeMap(u, f));
    }
    t.map = y;
  })(_e || (_e = {}));
  var E;
  (function(t) {
    function e(y = L.Float64) {
      switch (y) {
        case L.Float64:
          return new p((u, f) => {
            u.serializeNumberFloat64(f);
          });
        case L.Float32:
          return new p((u, f) => {
            u.serializeNumberFloat32(f);
          });
        case L.Int64:
          return new p((u, f) => {
            u.serializeNumberInt64(f);
          });
        case L.Uint64:
          return new p((u, f) => {
            u.serializeNumberUint64(f);
          });
        case L.Int32:
          return new p((u, f) => {
            u.serializeNumberInt32(f);
          });
        case L.Uint32:
          return new p((u, f) => {
            u.serializeNumberUint32(f);
          });
        case L.Int16:
          return new p((u, f) => {
            u.serializeNumberInt16(f);
          });
        case L.Uint16:
          return new p((u, f) => {
            u.serializeNumberUint16(f);
          });
        case L.Int8:
          return new p((u, f) => {
            u.serializeNumberInt8(f);
          });
        case L.Uint8:
          return new p((u, f) => {
            u.serializeNumberUint8(f);
          });
      }
    }
    t.number = e;
    function r(y = X.Int64) {
      switch (y) {
        case X.Int64:
          return new p((u, f) => {
            u.serializeBigintInt64(f);
          });
        case X.Uint64:
          return new p((u, f) => {
            u.serializeBigintUint64(f);
          });
      }
    }
    t.bigint = r;
    function i() {
      return new p((y, u) => {
        y.serializeString(u);
      });
    }
    t.string = i;
    function s() {
      return new p((y, u) => {
        y.serializeBoolean(u);
      });
    }
    t.boolean = s;
    function n() {
      return new p((y, u) => {
        y.serializeUint8Array(u);
      });
    }
    t.uint8array = n;
    function l() {
      return new p((y, u) => {
        y.serializeUint16Array(u);
      });
    }
    t.uint16array = l;
    function c() {
      return new p((y, u) => {
        y.serializeUint32Array(u);
      });
    }
    t.uint32array = c;
    function A() {
      return new p((y, u) => {
        y.serializeBiguint64Array(u);
      });
    }
    t.biguint64array = A;
    function T() {
      return new p((y, u) => {
        y.serializeInt8Array(u);
      });
    }
    t.int8array = T;
    function m() {
      return new p((y, u) => {
        y.serializeInt16Array(u);
      });
    }
    t.int16array = m;
    function D() {
      return new p((y, u) => {
        y.serializeInt32Array(u);
      });
    }
    t.int32array = D;
    function re() {
      return new p((y, u) => {
        y.serializeBigint64Array(u);
      });
    }
    t.bigint64array = re;
    function k() {
      return new p((y, u) => {
        y.serializeFloat32Array(u);
      });
    }
    t.float32array = k;
    function Y() {
      return new p((y, u) => {
        y.serializeFloat64Array(u);
      });
    }
    t.float64array = Y;
    function z() {
      return new p((y, u) => {
        u.serializeWithZSerializer(y);
      });
    }
    t.object = z;
    function ie(y) {
      return new p((u, f) => {
        u.serializeArray(f, y);
      });
    }
    t.array = ie;
    function C(y, u) {
      return new p((f, se) => {
        f.serializeMap(se, y, u);
      });
    }
    t.map = C;
  })(E || (E = {}));
  const _Ne = class _Ne {
    constructor(e) {
      __publicField(this, "buffer_");
      __publicField(this, "idx_");
      e instanceof g ? this.buffer_ = e.toBytes() : this.buffer_ = e, this.idx_ = 0;
    }
    readSlice(e) {
      const r = this.buffer_.subarray(this.idx_, this.idx_ + e);
      if (r.length < e) throw new Error(`Array index is out of bounds: ${this.idx_ + e} / ${this.buffer_.length}`);
      return this.idx_ += e, r;
    }
    readByte() {
      if (this.idx_ >= this.buffer_.length) throw new Error(`Array index is out of bounds: ${this.idx_ + 1} / ${this.buffer_.length}`);
      const e = this.buffer_[this.idx_];
      return this.idx_ += 1, e;
    }
    peekByte() {
      return this.buffer_[this.idx_];
    }
    readSequenceLength() {
      const e = this.peekByte();
      if (e != null && (e & _Ne.LEB128_CONTINUATION_MASK) == 0) return this.idx_ += 1, e;
      let [r, i] = lr(this.buffer_, this.idx_);
      if (this.idx_ += i, r > Number.MAX_SAFE_INTEGER) throw new Error(`Array length overflow: ${r}`);
      return new Number(r).valueOf();
    }
    deserializeString() {
      let e = this.readSequenceLength();
      return e == 0 ? "" : new TextDecoder().decode(this.readSlice(e));
    }
    deserializeUint8Array() {
      let e = this.readSequenceLength();
      return this.readSlice(e);
    }
    deserializeUint16Array() {
      let e = this.readSequenceLength();
      if (v) {
        let r = this.readSlice(e * 2);
        return r.byteOffset % 2 != 0 && (r = r.slice()), new Uint16Array(r.buffer, r.byteOffset, e);
      } else {
        let r = new Uint16Array(e);
        for (let i = 0; i < e; i++) r[i] = this.deserializeNumberUint16();
        return r;
      }
    }
    deserializeUint32Array() {
      let e = this.readSequenceLength();
      if (v) {
        let r = this.readSlice(e * 4);
        return r.byteOffset % 4 != 0 && (r = r.slice()), new Uint32Array(r.buffer, r.byteOffset, e);
      } else {
        let r = new Uint32Array(e);
        for (let i = 0; i < e; i++) r[i] = this.deserializeNumberUint32();
        return r;
      }
    }
    deserializeBiguint64Array() {
      let e = this.readSequenceLength();
      if (v) {
        let r = this.readSlice(e * 8);
        return r.byteOffset % 8 != 0 && (r = r.slice()), new BigUint64Array(r.buffer, r.byteOffset, e);
      } else {
        let r = new BigUint64Array(e);
        for (let i = 0; i < e; i++) r[i] = this.deserializeBigintUint64();
        return r;
      }
    }
    deserializeInt8Array() {
      let e = this.readSequenceLength();
      const r = this.readSlice(e);
      return new Int8Array(r.buffer, r.byteOffset, e);
    }
    deserializeInt16Array() {
      let e = this.readSequenceLength();
      if (v) {
        let r = this.readSlice(e * 2);
        return r.byteOffset % 2 != 0 && (r = r.slice()), new Int16Array(r.buffer, r.byteOffset, e);
      } else {
        let r = new Int16Array(e);
        for (let i = 0; i < e; i++) r[i] = this.deserializeNumberInt16();
        return r;
      }
    }
    deserializeInt32Array() {
      let e = this.readSequenceLength();
      if (v) {
        let r = this.readSlice(e * 4);
        return r.byteOffset % 4 != 0 && (r = r.slice()), new Int32Array(r.buffer, r.byteOffset, e);
      } else {
        let r = new Int32Array(e);
        for (let i = 0; i < e; i++) r[i] = this.deserializeNumberInt32();
        return r;
      }
    }
    deserializeBigint64Array() {
      let e = this.readSequenceLength();
      if (v) {
        let r = this.readSlice(e * 8);
        return r.byteOffset % 8 != 0 && (r = r.slice()), new BigInt64Array(r.buffer, r.byteOffset, e);
      } else {
        let r = new BigInt64Array(e);
        for (let i = 0; i < e; i++) r[i] = this.deserializeBigintInt64();
        return r;
      }
    }
    deserializeFloat32Array() {
      let e = this.readSequenceLength();
      if (v) {
        let r = this.readSlice(e * 4);
        return r.byteOffset % 4 != 0 && (r = r.slice()), new Float32Array(r.buffer, r.byteOffset, e);
      } else {
        let r = new Float32Array(e);
        for (let i = 0; i < e; i++) r[i] = this.deserializeNumberFloat32();
        return r;
      }
    }
    deserializeFloat64Array() {
      let e = this.readSequenceLength();
      if (v) {
        let r = this.readSlice(e * 8);
        return r.byteOffset % 8 != 0 && (r = r.slice()), new Float64Array(r.buffer, r.byteOffset, e);
      } else {
        let r = new Float64Array(e);
        for (let i = 0; i < e; i++) r[i] = this.deserializeNumberFloat64();
        return r;
      }
    }
    deserializeBigintInt64() {
      let e = this.readSlice(8);
      return new DataView(e.buffer, e.byteOffset, e.byteLength).getBigInt64(0, true);
    }
    deserializeBigintUint64() {
      let e = this.readSlice(8);
      return new DataView(e.buffer, e.byteOffset, e.byteLength).getBigUint64(0, true);
    }
    deserializeNumberFloat64() {
      let e = this.readSlice(8);
      return new DataView(e.buffer, e.byteOffset, e.byteLength).getFloat64(0, true);
    }
    deserializeNumberFloat32() {
      let e = this.readSlice(4);
      return new DataView(e.buffer, e.byteOffset, e.byteLength).getFloat32(0, true);
    }
    deserializeNumberInt64() {
      let e = this.deserializeBigintInt64();
      if (e > Number.MAX_SAFE_INTEGER || e < Number.MIN_SAFE_INTEGER) throw new Error(`Integer value ${e} exceeds the safe range for JavaScript numbers`);
      return Number(e);
    }
    deserializeNumberUint64() {
      let e = this.deserializeBigintUint64();
      if (e > Number.MAX_SAFE_INTEGER) throw new Error(`Integer value ${e} exceeds the safe range for JavaScript numbers`);
      return Number(e);
    }
    deserializeNumberInt32() {
      let e = this.readSlice(4);
      return new DataView(e.buffer, e.byteOffset, e.byteLength).getInt32(0, true);
    }
    deserializeNumberUint32() {
      let e = this.readSlice(4);
      return new DataView(e.buffer, e.byteOffset, e.byteLength).getUint32(0, true);
    }
    deserializeNumberInt16() {
      let e = this.readSlice(2);
      return new DataView(e.buffer, e.byteOffset, e.byteLength).getInt16(0, true);
    }
    deserializeNumberUint16() {
      let e = this.readSlice(2);
      return new DataView(e.buffer, e.byteOffset, e.byteLength).getUint16(0, true);
    }
    deserializeNumberInt8() {
      let e = this.readSlice(1);
      return new DataView(e.buffer, e.byteOffset, e.byteLength).getInt8(0);
    }
    deserializeNumberUint8() {
      return this.readByte();
    }
    deserializeBoolean() {
      const e = this.readByte();
      if (e == 1) return true;
      if (e == 0) return false;
      throw new Error(`Unexpected boolean value: ${e}`);
    }
    deserializeArray(e) {
      const r = this.readSequenceLength();
      let i = new Array(r);
      for (let s = 0; s < r; s++) i[s] = e.deserialize(this);
      return i;
    }
    deserializeMap(e, r) {
      const i = this.readSequenceLength();
      let s = /* @__PURE__ */ new Map();
      for (let n = 0; n < i; n++) {
        const l = e.deserialize(this), c = r.deserialize(this);
        s.set(l, c);
      }
      return s;
    }
    deserializeObject(e) {
      let r = new e();
      return r.deserializeWithZDeserializer(this), r;
    }
    deserialize(e) {
      return e.deserialize(this);
    }
    isDone() {
      return this.buffer_.length == this.idx_;
    }
  };
  __publicField(_Ne, "LEB128_CONTINUATION_MASK", 128);
  let Ne = _Ne;
  class pr {
    constructor(e, r, i, s) {
      __publicField(this, "session");
      __publicField(this, "id");
      __publicField(this, "keyExpr_");
      __publicField(this, "receiver_");
      this.session = e, this.id = r, this.keyExpr_ = i, this.receiver_ = s;
    }
    async [Symbol.asyncDispose]() {
      await this.undeclare();
    }
    keyExpr() {
      return this.keyExpr_;
    }
    receiver() {
      return this.receiver_;
    }
    async undeclare() {
      await this.session.undeclareQueryable(this.id);
    }
  }
  class Tr {
    constructor(e, r, i, s, n, l, c) {
      __publicField(this, "queryId");
      __publicField(this, "keyexpr_");
      __publicField(this, "parameters_");
      __publicField(this, "payload_");
      __publicField(this, "encoding_");
      __publicField(this, "attachment_");
      __publicField(this, "replyKeyExpr_");
      this.queryId = e, this.keyexpr_ = r, this.parameters_ = i, this.payload_ = s, this.encoding_ = n, this.attachment_ = l, this.replyKeyExpr_ = c;
    }
  }
  class Sr {
    constructor(e, r) {
      __publicField(this, "session");
      __publicField(this, "inner");
      this.session = e, this.inner = r;
    }
    selector() {
      return new x(this.inner.keyexpr_, this.inner.parameters_);
    }
    keyExpr() {
      return this.inner.keyexpr_;
    }
    parameters() {
      return this.inner.parameters_;
    }
    payload() {
      return this.inner.payload_;
    }
    encoding() {
      return this.inner.encoding_;
    }
    attachment() {
      return this.inner.attachment_;
    }
    async reply(e, r, i) {
      await this.session.replyOk(new oi(this.inner.queryId, new b(e), new g(r), (i == null ? void 0 : i.encoding) ? o.from(i.encoding) : o.default(), (i == null ? void 0 : i.attachment) ? new g(i.attachment) : void 0, i == null ? void 0 : i.timestamp, new W((i == null ? void 0 : i.priority) ?? S.DEFAULT, (i == null ? void 0 : i.congestionControl) ?? P.DEFAULT_RESPONSE, (i == null ? void 0 : i.express) ?? false, B.DEFAULT, U.DEFAULT)));
    }
    async replyErr(e, r) {
      await this.session.replyErr(new fi(this.inner.queryId, new g(e), (r == null ? void 0 : r.encoding) ? o.from(r.encoding) : o.default()));
    }
    async replyDel(e, r) {
      await this.session.replyDel(new hi(this.inner.queryId, new b(e), (r == null ? void 0 : r.attachment) ? new g(r.attachment) : void 0, r == null ? void 0 : r.timestamp, new W((r == null ? void 0 : r.priority) ?? S.DEFAULT, (r == null ? void 0 : r.congestionControl) ?? P.DEFAULT_RESPONSE, (r == null ? void 0 : r.express) ?? false, B.DEFAULT, U.DEFAULT)));
    }
    async finalize() {
      this.session.sendResponseFinal(this.inner.queryId);
    }
    toString() {
      return this.selector().toString();
    }
    async [Symbol.asyncDispose]() {
      await this.finalize();
    }
  }
  class Q {
    constructor(e) {
      __publicField(this, "source");
      e instanceof Q ? this.source = e.source : e instanceof Map ? this.source = Array.from(e.entries()).map(([r, i]) => i ? `${r}=${i}` : r).join(";") : this.source = e.toString();
    }
    *iterByKeyValuePos() {
      if (this.source.length === 0) return;
      let e = 0;
      for (; e < this.source.length; ) {
        for (; e < this.source.length && this.source[e] === ";"; ) e++;
        if (e >= this.source.length) break;
        const r = e;
        for (; e < this.source.length && this.source[e] !== ";" && this.source[e] !== "="; ) e++;
        const i = e - r;
        if (i === 0) continue;
        let s = -1, n = 0;
        if (e < this.source.length && this.source[e] === "=") {
          for (e++, s = e; e < this.source.length && this.source[e] !== ";"; ) e++;
          n = e - s;
        }
        yield [
          r,
          i,
          s,
          n
        ], e++;
      }
    }
    static empty() {
      return new Q("");
    }
    remove(e) {
      let r = false, i = "", s = 0;
      for (const [n, l, c, A] of this.iterByKeyValuePos()) this.source.slice(n, n + l) == e && (i += this.source.slice(s, n), s = c >= 0 ? c + A + 1 : n + l + 1, r = true);
      return r && (i += this.source.slice(s), this.source = i.replace(/;+/g, ";").replace(/^;|;$/g, "")), r;
    }
    *iter() {
      for (const [e, r, i, s] of this.iterByKeyValuePos()) {
        let n = this.source.slice(e, e + r), l = i >= 0 ? this.source.slice(i, i + s) : "";
        yield [
          n,
          l
        ];
      }
    }
    *values(e) {
      let r = this.get(e);
      if (r != null) {
        let i = r.split("|");
        for (const s of i) yield s;
      }
    }
    isEmpty() {
      if (!this.source) return true;
      for (const e of this.iterByKeyValuePos()) return false;
      return true;
    }
    containsKey(e) {
      for (const [r, i] of this.iterByKeyValuePos()) if (this.source.slice(r, r + i) === e) return true;
      return false;
    }
    get(e) {
      for (const [r, i, s, n] of this.iterByKeyValuePos()) if (this.source.slice(r, r + i) === e) return s >= 0 ? this.source.slice(s, s + n) : "";
    }
    insert(e, r) {
      this.remove(e), this.source && !this.source.endsWith(";") && this.source.length > 0 && (this.source += ";"), this.source += `${e}=${r}`;
    }
    extend(e) {
      const r = new Q(e);
      for (const [i, s, n, l] of r.iterByKeyValuePos()) {
        const c = r.source.slice(i, i + s), A = n >= 0 ? r.source.slice(n, n + l) : "";
        this.insert(c, A);
      }
    }
    toString() {
      return this.source;
    }
  }
  class Lr {
    constructor(e, r) {
      __publicField(this, "payload_");
      __publicField(this, "encoding_");
      this.payload_ = e, this.encoding_ = r;
    }
    payload() {
      return this.payload_;
    }
    encoding() {
      return this.encoding_;
    }
  }
  class Xe {
    constructor(e) {
      __publicField(this, "result_");
      this.result_ = e;
    }
    result() {
      return this.result_;
    }
  }
  class x {
    constructor(e, r) {
      __publicField(this, "keyExpr_");
      __publicField(this, "parameters_");
      this.keyExpr_ = new b(e), r == null ? this.parameters_ = new Q("") : this.parameters_ = new Q(r);
    }
    keyExpr() {
      return this.keyExpr_;
    }
    parameters() {
      return this.parameters_;
    }
    toString() {
      return this.parameters_.isEmpty() ? this.keyExpr_.toString() : this.keyExpr_.toString() + "?" + this.parameters_.toString();
    }
    static from(e) {
      if (e instanceof x) return e;
      if (e instanceof b) return new x(e, void 0);
      if (Array.isArray(e)) return new x(e[0], e[1]);
      {
        let r = e.indexOf("?");
        if (r == -1) return new x(new b(e));
        {
          let i = e.substring(0, r), s = e.substring(r + 1);
          return new x(new b(i), new Q(s));
        }
      }
    }
  }
  var ae = {}, Se = {}, Ye;
  function gr() {
    return Ye || (Ye = 1, (function(t) {
      Object.defineProperty(t, "__esModule", {
        value: true
      }), t.daysFrom = t.hoursFrom = t.minutesFrom = t.secondsFrom = t.millisecondsFrom = t.numberFrom = t.daysOf = t.hoursOf = t.minutesOf = t.millisecondsOf = t.secondsOf = t.valueOf = t.valueFrom = t.isTypedDuration = void 0;
      const e = (a) => typeof a == "object" && (a == null ? void 0 : a.valueType) === "TYPED_DURATION";
      t.isTypedDuration = e;
      const r = (a) => (0, t.isTypedDuration)(a) ? a.value : a;
      t.valueFrom = r;
      const i = (a, yt = "") => `${(0, t.valueFrom)(a)}${(0, t.isTypedDuration)(a) ? a.unit : yt}`;
      t.valueOf = i;
      const s = (a) => (0, t.isTypedDuration)(a) && a.type === "SECONDS", n = (a) => (0, t.isTypedDuration)(a) && a.type === "MILLISECONDS", l = (a) => (0, t.isTypedDuration)(a) && a.type === "MINUTES", c = (a) => (0, t.isTypedDuration)(a) && a.type === "HOURS", A = (a) => (0, t.isTypedDuration)(a) && a.type === "DAYS", T = (a) => typeof a == "number", m = (a) => ({
        type: "SECONDS",
        value: a,
        valueType: "TYPED_DURATION",
        unit: "s"
      });
      function D(a) {
        return s(a) ? a : T(a) ? m(a) : n(a) ? D(a.value / 1e3) : l(a) ? D(a.value * 60) : c(a) ? D(z(a)) : A(a) ? D(z(C(a))) : a;
      }
      t.secondsOf = D;
      const re = (a) => ({
        type: "MILLISECONDS",
        value: a,
        valueType: "TYPED_DURATION",
        unit: "ms"
      });
      function k(a) {
        return n(a) ? a : T(a) ? re(a) : s(a) ? k(a.value * 1e3) : l(a) ? k(D(a)) : c(a) ? k(D(z(a))) : A(a) ? k(D(z(C(a)))) : a;
      }
      t.millisecondsOf = k;
      const Y = (a) => ({
        type: "MINUTES",
        value: a,
        valueType: "TYPED_DURATION",
        unit: "m"
      });
      function z(a) {
        return l(a) ? a : T(a) ? Y(a) : n(a) ? z(D(a)) : s(a) ? Y(a.value / 60) : c(a) ? Y(a.value * 60) : A(a) ? z(C(a)) : a;
      }
      t.minutesOf = z;
      const ie = (a) => ({
        type: "HOURS",
        value: a,
        valueType: "TYPED_DURATION",
        unit: "h"
      });
      function C(a) {
        return c(a) ? a : T(a) ? ie(a) : n(a) ? C(z(D(a))) : s(a) ? C(z(a)) : l(a) ? C(a.value / 60) : A(a) ? C(a.value * 24) : a;
      }
      t.hoursOf = C;
      const y = (a) => ({
        type: "DAYS",
        value: a,
        valueType: "TYPED_DURATION",
        unit: "d"
      });
      function u(a) {
        return A(a) ? a : T(a) ? y(a) : n(a) ? u(C(z(D(a)))) : s(a) ? u(C(z(a))) : l(a) ? u(C(a)) : c(a) ? u(a.value / 24) : a;
      }
      t.daysOf = u;
      const f = (a) => (0, t.isTypedDuration)(a) ? a.value : a;
      t.numberFrom = f;
      const se = (a) => T(a) ? a : n(a) ? (0, t.numberFrom)(a) : (0, t.millisecondsFrom)(k(a));
      t.millisecondsFrom = se;
      const ht = (a) => T(a) ? a : s(a) ? (0, t.numberFrom)(a) : (0, t.secondsFrom)(D(a));
      t.secondsFrom = ht;
      const ft = (a) => T(a) ? a : l(a) ? (0, t.numberFrom)(a) : (0, t.minutesFrom)(z(a));
      t.minutesFrom = ft;
      const At = (a) => T(a) ? a : c(a) ? (0, t.numberFrom)(a) : (0, t.hoursFrom)(C(a));
      t.hoursFrom = At;
      const dt = (a) => T(a) ? a : A(a) ? (0, t.numberFrom)(a) : (0, t.daysFrom)(u(a));
      t.daysFrom = dt;
    })(Se)), Se;
  }
  var Je;
  function Er() {
    if (Je) return ae;
    Je = 1, Object.defineProperty(ae, "__esModule", {
      value: true
    }), ae.Duration = void 0;
    const t = gr();
    return ae.Duration = {
      milliseconds: {
        of: t.millisecondsOf,
        from: t.millisecondsFrom
      },
      seconds: {
        of: t.secondsOf,
        from: t.secondsFrom
      },
      minutes: {
        of: t.minutesOf,
        from: t.minutesFrom
      },
      hours: {
        of: t.hoursOf,
        from: t.hoursFrom
      },
      days: {
        of: t.daysOf,
        from: t.daysFrom
      },
      value: {
        from: t.valueFrom,
        of: t.valueOf
      },
      isTypedDuration: t.isTypedDuration
    }, ae;
  }
  ge = Er();
  class Ur {
    constructor(e) {
      __publicField(this, "session");
      this.session = e;
    }
    async declareToken(e) {
      let r = await this.session.declareLivelinessToken(new b(e));
      return new mr(this.session, r);
    }
    async declareSubscriber(e, r) {
      let i = (r == null ? void 0 : r.handler) ?? new H(256), [s, n, l] = V(i), c = new b(e), A = await this.session.declareLivelinessSubscriber({
        keyexpr: c,
        history: (r == null ? void 0 : r.history) ?? false
      }, {
        callback: s,
        drop: n
      });
      return new ot(this.session, le.LivelinessSubscriber, A, c, l);
    }
    async get(e, r) {
      let i = (r == null ? void 0 : r.handler) ?? new H(256), [s, n, l] = V(i), c = r == null ? void 0 : r.cancellationToken;
      if ((c == null ? void 0 : c.isCancelled()) ?? false) return n(), l;
      let A = await this.session.livelinessGet({
        keyexpr: new b(e),
        timeoutMs: (r == null ? void 0 : r.timeout) ? ge.Duration.milliseconds.from(r.timeout) : Ee
      }, {
        callback: s,
        drop: n
      });
      return c == null ? void 0 : c.addCancelAction(() => this.session.cancelQuery(A)), l;
    }
  }
  class mr {
    constructor(e, r) {
      __publicField(this, "session");
      __publicField(this, "id");
      this.session = e, this.id = r;
    }
    async undeclare() {
      await this.session.undeclareLivelinessToken(this.id);
    }
    async [Symbol.asyncDispose]() {
      await this.undeclare();
    }
  }
  class Le {
    constructor(e) {
      __publicField(this, "matching_");
      this.matching_ = e;
    }
    matching() {
      return this.matching_;
    }
  }
  class nt {
    constructor(e, r, i) {
      __publicField(this, "session");
      __publicField(this, "id");
      __publicField(this, "receiver_");
      this.session = e, this.id = r, this.receiver_ = i;
    }
    async [Symbol.asyncDispose]() {
      await this.undeclare();
    }
    receiver() {
      return this.receiver_;
    }
    async undeclare() {
      await this.session.undeclareMatchingListener(this.id);
    }
  }
  class Nr {
    constructor(e, r, i, s, n, l) {
      __publicField(this, "session");
      __publicField(this, "querierId");
      __publicField(this, "keyExpr_");
      __publicField(this, "congestionControl_");
      __publicField(this, "priority_");
      __publicField(this, "acceptReplies_");
      this.session = e, this.querierId = r, this.keyExpr_ = i, this.congestionControl_ = s, this.priority_ = n, this.acceptReplies_ = l;
    }
    async [Symbol.asyncDispose]() {
      await this.undeclare();
    }
    async undeclare() {
      await this.session.undeclareQuerier(this.querierId);
    }
    keyExpr() {
      return this.keyExpr_;
    }
    congestionControl() {
      return this.congestionControl_;
    }
    priority() {
      return this.priority_;
    }
    acceptReplies() {
      return this.acceptReplies_;
    }
    async get(e) {
      let r = (e == null ? void 0 : e.handler) ?? new H(256), [i, s, n] = V(r), l = e == null ? void 0 : e.cancellationToken;
      if ((l == null ? void 0 : l.isCancelled()) ?? false) return s(), n;
      let c = await this.session.querierGet({
        querierId: this.querierId,
        parameters: (e == null ? void 0 : e.parameters) ? new Q(e.parameters).toString() : "",
        payload: (e == null ? void 0 : e.payload) ? new g(e.payload) : void 0,
        encoding: (e == null ? void 0 : e.encoding) ? o.from(e.encoding) : void 0,
        attachment: (e == null ? void 0 : e.attachment) ? new g(e.attachment) : void 0
      }, {
        callback: i,
        drop: s
      });
      return l == null ? void 0 : l.addCancelAction(() => this.session.cancelQuery(c)), n;
    }
    async matchingListener(e) {
      const r = (e == null ? void 0 : e.handler) ?? new H(256);
      let [i, s, n] = V(r);
      const l = await this.session.querierDeclareMatchingListener(this.querierId, {
        callback: i,
        drop: s
      });
      return new nt(this.session, l, n);
    }
    async matchingStatus() {
      return await this.session.querierGetMatchingStatus(this.querierId);
    }
  }
  const Ee = 1e4;
  class Oe {
    constructor(e) {
      __publicField(this, "inner");
      this.inner = e;
    }
    async [Symbol.asyncDispose]() {
      await this.close();
    }
    static async open(e) {
      let r = await Ge.open(e.locator, e.messageResponseTimeoutMs);
      return new Oe(r);
    }
    async close() {
      this.inner.close();
    }
    isClosed() {
      return this.inner.isClosed();
    }
    async put(e, r, i) {
      await this.inner.put(new ii(new b(e), new g(r), (i == null ? void 0 : i.encoding) ? o.from(i.encoding) : o.default(), (i == null ? void 0 : i.attachment) ? new g(i.attachment) : void 0, i == null ? void 0 : i.timestamp, new W((i == null ? void 0 : i.priority) ?? S.DEFAULT, (i == null ? void 0 : i.congestionControl) ?? P.DEFAULT_PUSH, (i == null ? void 0 : i.express) ?? false, (i == null ? void 0 : i.reliability) ?? B.DEFAULT, (i == null ? void 0 : i.allowedDestination) ?? U.DEFAULT)));
    }
    declareKeyexpr(e) {
      return new b(e);
    }
    async info() {
      return await this.inner.getSessionInfo();
    }
    async delete(e, r) {
      await this.inner.delete(new si(new b(e), (r == null ? void 0 : r.attachment) ? new g(r.attachment) : void 0, r == null ? void 0 : r.timestamp, new W((r == null ? void 0 : r.priority) ?? S.DEFAULT, (r == null ? void 0 : r.congestionControl) ?? P.DEFAULT_PUSH, (r == null ? void 0 : r.express) ?? false, (r == null ? void 0 : r.reliability) ?? B.DEFAULT, (r == null ? void 0 : r.allowedDestination) ?? U.DEFAULT)));
    }
    async get(e, r) {
      let i = (r == null ? void 0 : r.handler) ?? new H(256), [s, n, l] = V(i), c = x.from(e), A = r == null ? void 0 : r.cancellationToken;
      if ((A == null ? void 0 : A.isCancelled()) ?? false) return n(), l;
      let T = await this.inner.get({
        keyexpr: c.keyExpr(),
        parameters: c.parameters().toString(),
        payload: (r == null ? void 0 : r.payload) ? new g(r.payload) : void 0,
        encoding: (r == null ? void 0 : r.encoding) ? o.from(r.encoding) : void 0,
        attachment: (r == null ? void 0 : r.attachment) ? new g(r.attachment) : void 0,
        qos: new W((r == null ? void 0 : r.priority) ?? S.DEFAULT, (r == null ? void 0 : r.congestionControl) ?? P.DEFAULT_REQUEST, (r == null ? void 0 : r.express) ?? false, B.DEFAULT, (r == null ? void 0 : r.allowedDestination) ?? U.DEFAULT),
        querySettings: new Ze((r == null ? void 0 : r.target) ?? Ae.DEFAULT, (r == null ? void 0 : r.consolidation) ?? de.DEFAULT, (r == null ? void 0 : r.acceptReplies) ?? G.DEFAULT),
        timeoutMs: (r == null ? void 0 : r.timeout) ? ge.Duration.milliseconds.from(r.timeout) : Ee
      }, {
        callback: s,
        drop: n
      });
      return A == null ? void 0 : A.addCancelAction(() => this.inner.cancelQuery(T)), l;
    }
    async declareSubscriber(e, r) {
      const i = (r == null ? void 0 : r.handler) ?? new H(256), s = new b(e);
      let [n, l, c] = V(i);
      const A = await this.inner.declareSubscriber({
        keyexpr: s,
        allowedOrigin: (r == null ? void 0 : r.allowedOrigin) ?? U.DEFAULT
      }, {
        callback: n,
        drop: l
      });
      return new ot(this.inner, le.Subscriber, A, s, c);
    }
    liveliness() {
      return new Ur(this.inner);
    }
    async newTimestamp() {
      return await this.inner.getTimestamp();
    }
    async declareQueryable(e, r) {
      const i = new b(e), s = (r == null ? void 0 : r.handler) ?? new H(256), [n, l, c] = V(s), A = await this.inner.declareQueryable({
        keyexpr: i,
        complete: (r == null ? void 0 : r.complete) ?? false,
        allowedOrigin: (r == null ? void 0 : r.allowedOrigin) ?? U.DEFAULT
      }, {
        callback: n,
        drop: l
      });
      return new pr(this.inner, A, i, c);
    }
    async declarePublisher(e, r) {
      let i = {
        keyexpr: new b(e),
        encoding: (r == null ? void 0 : r.encoding) ? o.from(r.encoding) : o.default(),
        qos: new W((r == null ? void 0 : r.priority) ?? S.DEFAULT, (r == null ? void 0 : r.congestionControl) ?? P.DEFAULT_PUSH, (r == null ? void 0 : r.express) ?? false, (r == null ? void 0 : r.reliability) ?? B.DEFAULT, (r == null ? void 0 : r.allowedDestination) ?? U.DEFAULT)
      };
      const s = await this.inner.declarePublisher(i);
      return new gi(this.inner, s, i);
    }
    async declareQuerier(e, r) {
      const i = {
        keyexpr: new b(e),
        qos: new W((r == null ? void 0 : r.priority) ?? S.DEFAULT, (r == null ? void 0 : r.congestionControl) ?? P.DEFAULT_REQUEST, (r == null ? void 0 : r.express) ?? false, B.DEFAULT, (r == null ? void 0 : r.allowedDestination) ?? U.DEFAULT),
        querySettings: new Ze((r == null ? void 0 : r.target) ?? Ae.DEFAULT, (r == null ? void 0 : r.consolidation) ?? de.DEFAULT, (r == null ? void 0 : r.acceptReplies) ?? G.DEFAULT),
        timeoutMs: (r == null ? void 0 : r.timeout) ? ge.Duration.milliseconds.from(r.timeout) : Ee
      };
      let s = await this.inner.declareQuerier(i);
      return new Nr(this.inner, s, i.keyexpr, i.qos.congestionControl, i.qos.priority, i.querySettings.replyKeyExpr);
    }
  }
  Ei = async function(t) {
    return await Oe.open(t);
  };
  class Or {
    constructor(e, r, i) {
      __publicField(this, "zid_");
      __publicField(this, "peers_");
      __publicField(this, "routers_");
      this.zid_ = e, this.peers_ = r, this.routers_ = i;
    }
    zid() {
      return this.zid_;
    }
    routersZid() {
      return this.routers_;
    }
    peersZid() {
      return this.peers_;
    }
  }
  function Dr(t) {
    switch (t) {
      case Z.PUT:
        return Z.PUT;
      case Z.DELETE:
        return Z.DELETE;
      default:
        return console.warn(`Unsupported SampleKind value ${t}`), Z.PUT;
    }
  }
  function zr(t) {
    switch (t) {
      case S.REAL_TIME:
        return S.REAL_TIME;
      case S.INTERACTIVE_HIGH:
        return S.INTERACTIVE_HIGH;
      case S.INTERACTIVE_LOW:
        return S.INTERACTIVE_LOW;
      case S.DATA_HIGH:
        return S.DATA_HIGH;
      case S.DATA:
        return S.DATA;
      case S.DATA_LOW:
        return S.DATA_LOW;
      case S.BACKGROUND:
        return S.BACKGROUND;
      default:
        return console.warn(`Unsupported Priority value ${t}`), S.DEFAULT;
    }
  }
  function Cr(t) {
    switch (t) {
      case P.DROP:
        return P.DROP;
      case P.BLOCK:
        return P.BLOCK;
      default:
        return console.warn(`Unsupported CongestionControl value ${t}`), P.DEFAULT_PUSH;
    }
  }
  function vr(t) {
    switch (t) {
      case B.BEST_EFFORT:
        return B.BEST_EFFORT;
      case B.RELIABLE:
        return B.RELIABLE;
      default:
        return console.warn(`Unsupported Reliability value ${t}`), B.DEFAULT;
    }
  }
  function Pr(t) {
    switch (t) {
      case U.SESSION_LOCAL:
        return U.SESSION_LOCAL;
      case U.REMOTE:
        return U.REMOTE;
      case U.ANY:
        return U.ANY;
      default:
        return console.warn(`Unsupported Locality value ${t}`), U.DEFAULT;
    }
  }
  class W {
    constructor(e, r, i, s, n) {
      __publicField(this, "priority");
      __publicField(this, "congestionControl");
      __publicField(this, "express");
      __publicField(this, "reliability");
      __publicField(this, "locality");
      this.priority = e, this.congestionControl = r, this.express = i, this.reliability = s, this.locality = n;
    }
  }
  function K(t) {
    let e = t.express ? 1 : 0;
    return t.priority | t.congestionControl << 3 | e << 4 | t.reliability << 5 | t.locality << 6;
  }
  function Br(t) {
    let e = t & 7, r = t >> 3 & 1, i = t >> 4 & 1, s = t >> 5 & 1, n = t >> 6 & 3;
    return new W(zr(e), Cr(r), i != 0, vr(s), Pr(n));
  }
  function Mr(t) {
    switch (t) {
      case G.ANY:
        return G.ANY;
      case G.MATCHING_QUERY:
        return G.MATCHING_QUERY;
      default:
        return console.warn(`Unsupported ReplyKeyExpr value ${t}`), G.DEFAULT;
    }
  }
  function ce(t, e) {
    let [r, i] = t.toIdSchema();
    e.serializeNumberUint16(r), e.serializeString(i ?? "");
  }
  function De(t, e) {
    t == null ? e.serializeBoolean(false) : (e.serializeBoolean(true), ce(t, e));
  }
  function ze(t) {
    let e = t.deserializeNumberUint16(), r = t.deserializeString();
    return r.length == 0 && (r = void 0), new o(e, r);
  }
  function Rr(t) {
    if (t.deserializeBoolean()) return ze(t);
  }
  class Ze {
    constructor(e, r, i) {
      __publicField(this, "target");
      __publicField(this, "consolidation");
      __publicField(this, "replyKeyExpr");
      this.target = e, this.consolidation = r, this.replyKeyExpr = i;
    }
  }
  function at(t) {
    return t.target | t.consolidation << 2 | t.replyKeyExpr << 4;
  }
  function Ue(t) {
    return new ye(t.deserializeUint8Array());
  }
  function kr(t, e) {
    e.serializeUint8Array(t.toLeBytes());
  }
  function Fr(t, e) {
    e.serializeBigintUint64(t.getNtp64()), kr(t.getId(), e);
  }
  function te(t, e) {
    t == null ? e.serializeBoolean(false) : (e.serializeBoolean(true), Fr(t, e));
  }
  function lt(t) {
    let e = t.deserializeBigintUint64(), r = Ue(t);
    return new Vt(r, e);
  }
  function qr(t) {
    if (t.deserializeBoolean()) return lt(t);
  }
  function q(t, e) {
    t == null ? e.serialize(false) : (e.serialize(true), e.serializeUint8Array(t.toBytes()));
  }
  function me(t) {
    if (t.deserializeBoolean()) return new g(t.deserializeUint8Array());
  }
  function ut(t) {
    let e = new b(t.deserializeString()), r = new g(t.deserializeUint8Array()), i = Dr(t.deserializeNumberUint8()), s = ze(t), n = me(t), l = qr(t), c = Br(t.deserializeNumberUint8());
    return new Wt(e, r, i, s, n, l, c.priority, c.congestionControl, c.express);
  }
  function Gr(t) {
    if (t.deserializeBoolean()) return new Xe(ut(t));
    {
      let e = new g(t.deserializeUint8Array()), r = ze(t);
      return new Xe(new Lr(e, r));
    }
  }
  function Qr(t) {
    let e = t.deserializeNumberUint32(), r = new b(t.deserializeString()), i = new Q(t.deserializeString()), s = me(t), n = Rr(t), l = me(t), c = Mr(t.deserializeNumberUint8());
    return new Tr(e, r, i, s, n, l, c);
  }
  var _;
  (function(t) {
    t[t.DeclarePublisher = 0] = "DeclarePublisher", t[t.UndeclarePublisher = 1] = "UndeclarePublisher", t[t.DeclareSubscriber = 2] = "DeclareSubscriber", t[t.UndeclareSubscriber = 3] = "UndeclareSubscriber", t[t.DeclareQueryable = 4] = "DeclareQueryable", t[t.UndeclareQueryable = 5] = "UndeclareQueryable", t[t.DeclareQuerier = 6] = "DeclareQuerier", t[t.UndeclareQuerier = 7] = "UndeclareQuerier", t[t.DeclareLivelinessToken = 8] = "DeclareLivelinessToken", t[t.UndeclareLivelinessToken = 9] = "UndeclareLivelinessToken", t[t.DeclareLivelinessSubscriber = 10] = "DeclareLivelinessSubscriber", t[t.UndeclareLivelinessSubscriber = 11] = "UndeclareLivelinessSubscriber", t[t.GetSessionInfo = 12] = "GetSessionInfo", t[t.GetTimestamp = 13] = "GetTimestamp", t[t.Put = 14] = "Put", t[t.Delete = 15] = "Delete", t[t.PublisherPut = 16] = "PublisherPut", t[t.PublisherDelete = 17] = "PublisherDelete", t[t.Get = 18] = "Get", t[t.QuerierGet = 19] = "QuerierGet", t[t.LivelinessGet = 20] = "LivelinessGet", t[t.ReplyOk = 21] = "ReplyOk", t[t.ReplyDel = 22] = "ReplyDel", t[t.ReplyErr = 23] = "ReplyErr", t[t.QueryResponseFinal = 24] = "QueryResponseFinal", t[t.Ping = 25] = "Ping", t[t.PublisherDeclareMatchingListener = 26] = "PublisherDeclareMatchingListener", t[t.UndeclareMatchingListener = 27] = "UndeclareMatchingListener", t[t.PublisherGetMatchingStatus = 28] = "PublisherGetMatchingStatus", t[t.QuerierDeclareMatchingListener = 29] = "QuerierDeclareMatchingListener", t[t.QuerierGetMatchingStatus = 30] = "QuerierGetMatchingStatus";
  })(_ || (_ = {}));
  class xr {
    constructor(e, r) {
      __publicField(this, "id");
      __publicField(this, "properties");
      __publicField(this, "outMessageId", _.DeclarePublisher);
      this.id = e, this.properties = r;
    }
    serializeWithZSerializer(e) {
      e.serializeNumberUint32(this.id), e.serializeString(this.properties.keyexpr.toString()), ce(this.properties.encoding, e), e.serializeNumberUint8(K(this.properties.qos));
    }
  }
  class Wr {
    constructor(e) {
      __publicField(this, "id");
      __publicField(this, "outMessageId", _.UndeclarePublisher);
      this.id = e;
    }
    serializeWithZSerializer(e) {
      e.serializeNumberUint32(this.id);
    }
  }
  class Vr {
    constructor(e, r) {
      __publicField(this, "id");
      __publicField(this, "properties");
      __publicField(this, "outMessageId", _.DeclareSubscriber);
      this.id = e, this.properties = r;
    }
    serializeWithZSerializer(e) {
      e.serializeNumberUint32(this.id), e.serializeString(this.properties.keyexpr.toString()), e.serializeNumberUint8(this.properties.allowedOrigin);
    }
  }
  class Hr {
    constructor(e) {
      __publicField(this, "id");
      __publicField(this, "outMessageId", _.UndeclareSubscriber);
      this.id = e;
    }
    serializeWithZSerializer(e) {
      e.serializeNumberUint32(this.id);
    }
  }
  class Xr {
    constructor(e, r) {
      __publicField(this, "id");
      __publicField(this, "properties");
      __publicField(this, "outMessageId", _.DeclareQueryable);
      this.id = e, this.properties = r;
    }
    serializeWithZSerializer(e) {
      e.serializeNumberUint32(this.id), e.serializeString(this.properties.keyexpr.toString()), e.serializeBoolean(this.properties.complete), e.serializeNumberUint8(this.properties.allowedOrigin);
    }
  }
  class Yr {
    constructor(e) {
      __publicField(this, "id");
      __publicField(this, "outMessageId", _.UndeclareQueryable);
      this.id = e;
    }
    serializeWithZSerializer(e) {
      e.serializeNumberUint32(this.id);
    }
  }
  class Jr {
    constructor(e, r) {
      __publicField(this, "id");
      __publicField(this, "properties");
      __publicField(this, "outMessageId", _.DeclareQuerier);
      this.id = e, this.properties = r;
    }
    serializeWithZSerializer(e) {
      e.serializeNumberUint32(this.id), e.serializeString(this.properties.keyexpr.toString()), e.serializeNumberUint8(K(this.properties.qos)), e.serializeNumberUint8(at(this.properties.querySettings)), e.serializeNumberUint32(this.properties.timeoutMs);
    }
  }
  class Zr {
    constructor(e) {
      __publicField(this, "id");
      __publicField(this, "outMessageId", _.UndeclareQuerier);
      this.id = e;
    }
    serializeWithZSerializer(e) {
      e.serializeNumberUint32(this.id);
    }
  }
  class jr {
    constructor(e, r) {
      __publicField(this, "id");
      __publicField(this, "keyexpr");
      __publicField(this, "outMessageId", _.DeclareLivelinessToken);
      this.id = e, this.keyexpr = r;
    }
    serializeWithZSerializer(e) {
      e.serializeNumberUint32(this.id), e.serializeString(this.keyexpr.toString());
    }
  }
  class Kr {
    constructor(e) {
      __publicField(this, "id");
      __publicField(this, "outMessageId", _.UndeclareLivelinessToken);
      this.id = e;
    }
    serializeWithZSerializer(e) {
      e.serializeNumberUint32(this.id);
    }
  }
  class $r {
    constructor(e, r) {
      __publicField(this, "id");
      __publicField(this, "properties");
      __publicField(this, "outMessageId", _.DeclareLivelinessSubscriber);
      this.id = e, this.properties = r;
    }
    serializeWithZSerializer(e) {
      e.serializeNumberUint32(this.id), e.serializeString(this.properties.keyexpr.toString()), e.serializeBoolean(this.properties.history);
    }
  }
  class ei {
    constructor(e) {
      __publicField(this, "id");
      __publicField(this, "outMessageId", _.UndeclareLivelinessSubscriber);
      this.id = e;
    }
    serializeWithZSerializer(e) {
      e.serializeNumberUint32(this.id);
    }
  }
  class ti {
    constructor() {
      __publicField(this, "outMessageId", _.GetSessionInfo);
    }
    serializeWithZSerializer(e) {
    }
  }
  class ri {
    constructor() {
      __publicField(this, "outMessageId", _.GetTimestamp);
    }
    serializeWithZSerializer(e) {
    }
  }
  class ii {
    constructor(e, r, i, s, n, l) {
      __publicField(this, "keyexpr");
      __publicField(this, "payload");
      __publicField(this, "encoding");
      __publicField(this, "attachment");
      __publicField(this, "timestamp");
      __publicField(this, "qos");
      __publicField(this, "outMessageId", _.Put);
      this.keyexpr = e, this.payload = r, this.encoding = i, this.attachment = s, this.timestamp = n, this.qos = l;
    }
    serializeWithZSerializer(e) {
      e.serializeString(this.keyexpr.toString()), e.serializeUint8Array(this.payload.toBytes()), ce(this.encoding, e), q(this.attachment, e), te(this.timestamp, e), e.serializeNumberUint8(K(this.qos));
    }
  }
  class si {
    constructor(e, r, i, s) {
      __publicField(this, "keyexpr");
      __publicField(this, "attachment");
      __publicField(this, "timestamp");
      __publicField(this, "qos");
      __publicField(this, "outMessageId", _.Delete);
      this.keyexpr = e, this.attachment = r, this.timestamp = i, this.qos = s;
    }
    serializeWithZSerializer(e) {
      e.serializeString(this.keyexpr.toString()), q(this.attachment, e), te(this.timestamp, e), e.serializeNumberUint8(K(this.qos));
    }
  }
  class ni {
    constructor(e, r, i, s, n) {
      __publicField(this, "publisherId");
      __publicField(this, "payload");
      __publicField(this, "encoding");
      __publicField(this, "attachment");
      __publicField(this, "timestamp");
      __publicField(this, "outMessageId", _.PublisherPut);
      this.publisherId = e, this.payload = r, this.encoding = i, this.attachment = s, this.timestamp = n;
    }
    serializeWithZSerializer(e) {
      e.serializeNumberUint32(this.publisherId), e.serializeUint8Array(this.payload.toBytes()), De(this.encoding, e), q(this.attachment, e), te(this.timestamp, e);
    }
  }
  class ai {
    constructor(e, r, i) {
      __publicField(this, "publisherId");
      __publicField(this, "attachment");
      __publicField(this, "timestamp");
      __publicField(this, "outMessageId", _.PublisherDelete);
      this.publisherId = e, this.attachment = r, this.timestamp = i;
    }
    serializeWithZSerializer(e) {
      e.serializeNumberUint32(this.publisherId), q(this.attachment, e), te(this.timestamp, e);
    }
  }
  class li {
    constructor(e, r) {
      __publicField(this, "id");
      __publicField(this, "properties");
      __publicField(this, "outMessageId", _.Get);
      this.id = e, this.properties = r;
    }
    serializeWithZSerializer(e) {
      e.serializeNumberUint32(this.id), e.serializeString(this.properties.keyexpr.toString()), e.serializeString(this.properties.parameters), q(this.properties.payload, e), De(this.properties.encoding, e), q(this.properties.attachment, e), e.serializeNumberUint8(K(this.properties.qos)), e.serializeNumberUint8(at(this.properties.querySettings)), e.serializeNumberUint32(this.properties.timeoutMs);
    }
  }
  class ui {
    constructor(e, r) {
      __publicField(this, "id");
      __publicField(this, "properties");
      __publicField(this, "outMessageId", _.QuerierGet);
      this.id = e, this.properties = r;
    }
    serializeWithZSerializer(e) {
      e.serializeNumberUint32(this.id), e.serializeNumberUint32(this.properties.querierId), e.serializeString(this.properties.parameters), q(this.properties.payload, e), De(this.properties.encoding, e), q(this.properties.attachment, e);
    }
  }
  class ci {
    constructor(e, r) {
      __publicField(this, "id");
      __publicField(this, "properties");
      __publicField(this, "outMessageId", _.LivelinessGet);
      this.id = e, this.properties = r;
    }
    serializeWithZSerializer(e) {
      e.serializeNumberUint32(this.id), e.serializeString(this.properties.keyexpr.toString()), e.serializeNumberUint32(this.properties.timeoutMs);
    }
  }
  class oi {
    constructor(e, r, i, s, n, l, c) {
      __publicField(this, "queryId");
      __publicField(this, "keyexpr");
      __publicField(this, "payload");
      __publicField(this, "encoding");
      __publicField(this, "attachment");
      __publicField(this, "timestamp");
      __publicField(this, "qos");
      __publicField(this, "outMessageId", _.ReplyOk);
      this.queryId = e, this.keyexpr = r, this.payload = i, this.encoding = s, this.attachment = n, this.timestamp = l, this.qos = c;
    }
    serializeWithZSerializer(e) {
      e.serializeNumberUint32(this.queryId), e.serializeString(this.keyexpr.toString()), e.serializeUint8Array(this.payload.toBytes()), ce(this.encoding, e), q(this.attachment, e), te(this.timestamp, e), e.serializeNumberUint8(K(this.qos));
    }
  }
  class hi {
    constructor(e, r, i, s, n) {
      __publicField(this, "queryId");
      __publicField(this, "keyexpr");
      __publicField(this, "attachment");
      __publicField(this, "timestamp");
      __publicField(this, "qos");
      __publicField(this, "outMessageId", _.ReplyDel);
      this.queryId = e, this.keyexpr = r, this.attachment = i, this.timestamp = s, this.qos = n;
    }
    serializeWithZSerializer(e) {
      e.serializeNumberUint32(this.queryId), e.serializeString(this.keyexpr.toString()), q(this.attachment, e), te(this.timestamp, e), e.serializeNumberUint8(K(this.qos));
    }
  }
  class fi {
    constructor(e, r, i) {
      __publicField(this, "queryId");
      __publicField(this, "payload");
      __publicField(this, "encoding");
      __publicField(this, "outMessageId", _.ReplyErr);
      this.queryId = e, this.payload = r, this.encoding = i;
    }
    serializeWithZSerializer(e) {
      e.serializeNumberUint32(this.queryId), e.serializeUint8Array(this.payload.toBytes()), ce(this.encoding, e);
    }
  }
  class be {
    constructor(e) {
      __publicField(this, "queryId");
      __publicField(this, "outMessageId", _.QueryResponseFinal);
      __publicField(this, "inMessageId", d.QueryResponseFinal);
      this.queryId = e;
    }
    serializeWithZSerializer(e) {
      e.serializeNumberUint32(this.queryId);
    }
    static deserialize(e) {
      let r = e.deserializeNumberUint32();
      return new be(r);
    }
  }
  class Ai {
    constructor() {
      __publicField(this, "outMessageId", _.Ping);
    }
    serializeWithZSerializer(e) {
    }
  }
  class di {
    constructor(e, r) {
      __publicField(this, "id");
      __publicField(this, "publisherId");
      __publicField(this, "outMessageId", _.PublisherDeclareMatchingListener);
      this.id = e, this.publisherId = r;
    }
    serializeWithZSerializer(e) {
      e.serializeNumberUint32(this.id), e.serializeNumberUint32(this.publisherId);
    }
  }
  class yi {
    constructor(e) {
      __publicField(this, "id");
      __publicField(this, "outMessageId", _.UndeclareMatchingListener);
      this.id = e;
    }
    serializeWithZSerializer(e) {
      e.serializeNumberUint32(this.id);
    }
  }
  class wi {
    constructor(e) {
      __publicField(this, "publisherId");
      __publicField(this, "outMessageId", _.PublisherGetMatchingStatus);
      this.publisherId = e;
    }
    serializeWithZSerializer(e) {
      e.serializeNumberUint32(this.publisherId);
    }
  }
  class _i {
    constructor(e, r) {
      __publicField(this, "id");
      __publicField(this, "querierId");
      __publicField(this, "outMessageId", _.QuerierDeclareMatchingListener);
      this.id = e, this.querierId = r;
    }
    serializeWithZSerializer(e) {
      e.serializeNumberUint32(this.id), e.serializeNumberUint32(this.querierId);
    }
  }
  class bi {
    constructor(e) {
      __publicField(this, "querierId");
      __publicField(this, "outMessageId", _.QuerierGetMatchingStatus);
      this.querierId = e;
    }
    serializeWithZSerializer(e) {
      e.serializeNumberUint32(this.querierId);
    }
  }
  var d;
  (function(t) {
    t[t.ResponsePing = 0] = "ResponsePing", t[t.ResponseOk = 1] = "ResponseOk", t[t.ResponseError = 2] = "ResponseError", t[t.ResponseTimestamp = 3] = "ResponseTimestamp", t[t.ResponseSessionInfo = 4] = "ResponseSessionInfo", t[t.InSample = 5] = "InSample", t[t.InQuery = 6] = "InQuery", t[t.InReply = 7] = "InReply", t[t.QueryResponseFinal = 8] = "QueryResponseFinal", t[t.ResponseMatchingStatus = 9] = "ResponseMatchingStatus", t[t.MatchingStatusUpdate = 10] = "MatchingStatusUpdate";
  })(d || (d = {}));
  class Ce {
    constructor(e) {
      __publicField(this, "uuid");
      __publicField(this, "inMessageId", d.ResponsePing);
      this.uuid = e;
    }
    static deserialize(e) {
      let r = e.deserializeString();
      return new Ce(r);
    }
  }
  class N {
    constructor(e) {
      __publicField(this, "contentId");
      __publicField(this, "inMessageId", d.ResponseOk);
      this.contentId = e;
    }
    static deserialize(e) {
      let r = e.deserializeNumberUint8();
      return new N(r);
    }
  }
  class ve {
    constructor(e) {
      __publicField(this, "error");
      __publicField(this, "inMessageId", d.ResponseError);
      this.error = e;
    }
    static deserialize(e) {
      let r = e.deserializeString();
      return new ve(r);
    }
  }
  class Pe {
    constructor(e) {
      __publicField(this, "timestamp");
      __publicField(this, "inMessageId", d.ResponseTimestamp);
      this.timestamp = e;
    }
    static deserialize(e) {
      return new Pe(lt(e));
    }
  }
  class Be {
    constructor(e) {
      __publicField(this, "info");
      __publicField(this, "inMessageId", d.ResponseSessionInfo);
      this.info = e;
    }
    static deserialize(e) {
      let r = Ue(e), i = _e.array(_e.objectStatic(Ue)), s = e.deserialize(i), n = e.deserialize(i);
      return new Be(new Or(r, n, s));
    }
  }
  class Me {
    constructor(e, r) {
      __publicField(this, "subscriberId");
      __publicField(this, "sample");
      __publicField(this, "inMessageId", d.InSample);
      this.subscriberId = e, this.sample = r;
    }
    static deserialize(e) {
      let r = e.deserializeNumberUint32(), i = ut(e);
      return new Me(r, i);
    }
  }
  class Re {
    constructor(e, r) {
      __publicField(this, "queryableId");
      __publicField(this, "query");
      __publicField(this, "inMessageId", d.InQuery);
      this.queryableId = e, this.query = r;
    }
    static deserialize(e) {
      let r = e.deserializeNumberUint32(), i = Qr(e);
      return new Re(r, i);
    }
  }
  class ke {
    constructor(e, r) {
      __publicField(this, "queryId");
      __publicField(this, "reply");
      __publicField(this, "inMessageId", d.InReply);
      this.queryId = e, this.reply = r;
    }
    static deserialize(e) {
      let r = e.deserializeNumberUint32(), i = Gr(e);
      return new ke(r, i);
    }
  }
  class Ie {
    constructor(e) {
      __publicField(this, "matching");
      __publicField(this, "inMessageId", d.ResponseMatchingStatus);
      this.matching = e;
    }
    static deserialize(e) {
      let r = e.deserializeBoolean();
      return new Ie(r);
    }
  }
  class Fe {
    constructor(e, r) {
      __publicField(this, "matchingListenerId");
      __publicField(this, "matching");
      __publicField(this, "inMessageId", d.MatchingStatusUpdate);
      this.matchingListenerId = e, this.matching = r;
    }
    static deserialize(e) {
      let r = e.deserializeNumberUint32(), i = e.deserializeBoolean();
      return new Fe(r, i);
    }
  }
  const ct = 128, Ii = 127;
  function pi(t) {
    let e = t.deserializeNumberUint8();
    if ((e & ct) == 0) return [
      e,
      void 0
    ];
    {
      e = e & Ii;
      const r = t.deserializeNumberUint32();
      return [
        e,
        r
      ];
    }
  }
  function Ti(t, e) {
    t[1] == null ? e.serializeNumberUint8(t[0]) : (e.serializeNumberUint8(t[0] | ct), e.serializeNumberUint32(t[1]));
  }
  const Si = 2 * 1024 * 1024, Li = 2e3, je = 10;
  class qe {
    constructor(e) {
      __publicField(this, "ws");
      this.ws = e, this.ws = e;
    }
    static async new(e) {
      let r = this.parseZenohLocator(e), i = 0, s = Li;
      for (; i < je; ) {
        let n = new WebSocket(r);
        n.binaryType = "arraybuffer", n.onerror = function(c) {
          console.warn("WebSocket error: ", c);
        }, n.onclose = function(c) {
          console.warn(`WebSocket has been disconnected from remote-api-plugin: ${c.code}`);
        };
        let l = 0;
        for (; n.readyState != 1; ) if (await Ke(100), l += 100, l > s) {
          n.close(), s *= 2;
          break;
        }
        if (n.readyState == 1) return console.warn("Connected to", r), new qe(n);
        n = new WebSocket(r), console.warn("Restart connection");
      }
      throw new Error(`Failed to connect to locator endpoint: ${e} after ${je}`);
    }
    onmessage(e) {
      this.ws.onmessage = function(r) {
        e(new Uint8Array(r.data));
      };
    }
    async send(e) {
      if (!this.isOk) throw new Error("WebSocket is closed");
      for (; this.ws.bufferedAmount > Si; ) if (await Ke(10), !this.isOk) throw new Error("WebSocket is closed");
      this.ws.send(e);
    }
    isOk() {
      return this.ws.readyState == WebSocket.OPEN;
    }
    async close() {
      this.ws.onmessage = null, !(this.ws.readyState === WebSocket.CLOSED || this.ws.readyState === WebSocket.CLOSING) && await new Promise((e, r) => {
        this.ws.onclose = () => {
          this.ws.onclose = null, this.ws.onerror = null, e();
        }, this.ws.onerror = () => {
          this.ws.onclose = null, this.ws.onerror = null, r(new Error("WebSocket error during close"));
        }, this.ws.close();
      });
    }
    static parseZenohLocator(e) {
      let r = e.split("/", 2);
      if (r.length != 2) return e;
      let i = r[0], s = r[1];
      return i != "ws" && i != "wss" ? e : `${i}://${s}`;
    }
  }
  function Ke(t) {
    return new Promise((e) => setTimeout(e, t));
  }
  var le;
  (function(t) {
    t[t.Subscriber = 0] = "Subscriber", t[t.LivelinessSubscriber = 1] = "LivelinessSubscriber";
  })(le || (le = {}));
  const _O = class _O {
    static get() {
      const e = _O.current;
      return _O.current == _O.MAX ? _O.current = 0 : _O.current++, e;
    }
  };
  __publicField(_O, "MAX", 1 << 31);
  __publicField(_O, "current", 0);
  let O = _O;
  class Ge {
    constructor(e, r) {
      __publicField(this, "isClosed_", false);
      __publicField(this, "link");
      __publicField(this, "id", "");
      __publicField(this, "subscribers", /* @__PURE__ */ new Map());
      __publicField(this, "queryables", /* @__PURE__ */ new Map());
      __publicField(this, "gets", /* @__PURE__ */ new Map());
      __publicField(this, "matchingListeners", /* @__PURE__ */ new Map());
      __publicField(this, "pendingMessageResponses", /* @__PURE__ */ new Map());
      __publicField(this, "nextMessageId", 0);
      __publicField(this, "messageResponseTimeoutMs");
      this.link = e, this.messageResponseTimeoutMs = r, this.link.onmessage((i) => {
        try {
          this.onMessageReceived(i);
        } catch (s) {
          console.warn(s);
        }
      });
    }
    onMessageReceived(e) {
      let r = new Ne(e), [i, s] = pi(r);
      if (s != null) {
        let n = this.pendingMessageResponses.get(s);
        n == null ? console.warn(`Received unexpected response ${i}:${s}`) : (n([
          i,
          r
        ]), this.pendingMessageResponses.delete(s));
      } else switch (i) {
        case d.InQuery: {
          const n = Re.deserialize(r);
          let l = this.queryables.get(n.queryableId);
          l == null ? console.warn(`Received query for inexistant queryable ${n.queryableId}`) : l.callback(new Sr(this, n.query));
          break;
        }
        case d.InReply: {
          const n = ke.deserialize(r);
          let l = this.gets.get(n.queryId);
          l == null ? console.warn(`Received reply for inexistant query ${n.queryId}`) : l.callback(n.reply);
          break;
        }
        case d.InSample: {
          const n = Me.deserialize(r);
          let l = this.subscribers.get(n.subscriberId);
          l == null ? console.warn(`Received sample for inexistant subscriber ${n.subscriberId}`) : l.callback(n.sample);
          break;
        }
        case d.QueryResponseFinal: {
          const n = be.deserialize(r);
          let l = this.gets.get(n.queryId);
          l == null ? console.warn(`Received responseFinal for inexistant get ${n.queryId}`) : (this.gets.delete(n.queryId), l.drop());
          break;
        }
        case d.MatchingStatusUpdate: {
          const n = Fe.deserialize(r);
          let l = this.matchingListeners.get(n.matchingListenerId);
          l == null ? console.warn(`Received matching status update for inexistant matching listener ${n.matchingListenerId}`) : l.callback(new Le(n.matching));
          break;
        }
        default:
          throw new Error(`Received unexpected message type ${i}`);
      }
    }
    async sendMessage(e) {
      let r = new j();
      return r.serializeNumberUint8(e.outMessageId), e.serializeWithZSerializer(r), await this.link.send(r.toBytes());
    }
    async sendRequest(e, r, i) {
      let s = new j();
      const n = this.nextMessageId;
      this.nextMessageId = (this.nextMessageId + 1) % (1 << 31), Ti([
        e.outMessageId,
        n
      ], s), e.serializeWithZSerializer(s);
      const l = new Promise((c, A) => {
        let T = setTimeout(() => A(), this.messageResponseTimeoutMs);
        this.pendingMessageResponses.set(n, (m) => {
          clearTimeout(T), c(m);
        });
      });
      return await this.link.send(s.finish().toBytes()), await l.then((c) => {
        switch (c[0]) {
          case r:
            return i(c[1]);
          case d.ResponseError: {
            const A = ve.deserialize(c[1]);
            throw new Error(A.error);
          }
          default:
            throw new Error(`Unexpected InRemoteMessageId ${c[0]}`);
        }
      }, () => {
        throw this.pendingMessageResponses.delete(n), new Error("Remote api request timeout");
      });
    }
    async ping() {
      return await this.sendRequest(new Ai(), d.ResponsePing, Ce.deserialize);
    }
    static async open(e, r) {
      let i = await qe.new(e), s = new Ge(i, r);
      return s.id = (await s.ping()).uuid, console.log(`Successfully opened session with id: ${s.id}`), s;
    }
    async declarePublisher(e) {
      let r = O.get();
      return await this.sendRequest(new xr(r, e), d.ResponseOk, N.deserialize), r;
    }
    async undeclarePublisher(e) {
      await this.sendRequest(new Wr(e), d.ResponseOk, N.deserialize);
    }
    async declareSubscriber(e, r) {
      let i = O.get();
      this.subscribers.set(i, r);
      try {
        await this.sendRequest(new Vr(i, e), d.ResponseOk, N.deserialize);
      } catch (s) {
        throw this.subscribers.delete(i), s;
      }
      return i;
    }
    async undeclareSubscriber(e) {
      const r = this.subscribers.get(e);
      r == null || (this.subscribers.delete(e), r.drop()), await this.sendRequest(new Hr(e), d.ResponseOk, N.deserialize);
    }
    async declareQueryable(e, r) {
      let i = O.get();
      return await this.sendRequest(new Xr(i, e), d.ResponseOk, N.deserialize), this.queryables.set(i, r), i;
    }
    async undeclareQueryable(e) {
      const r = this.queryables.get(e);
      r == null || (this.queryables.delete(e), r.drop()), await this.sendRequest(new Yr(e), d.ResponseOk, N.deserialize);
    }
    async declareQuerier(e) {
      let r = O.get();
      return await this.sendRequest(new Jr(r, e), d.ResponseOk, N.deserialize), r;
    }
    async undeclareQuerier(e) {
      await this.sendRequest(new Zr(e), d.ResponseOk, N.deserialize);
    }
    async declareLivelinessToken(e) {
      let r = O.get();
      return await this.sendRequest(new jr(r, e), d.ResponseOk, N.deserialize), r;
    }
    async undeclareLivelinessToken(e) {
      await this.sendRequest(new Kr(e), d.ResponseOk, N.deserialize);
    }
    async declareLivelinessSubscriber(e, r) {
      let i = O.get();
      this.subscribers.set(i, r);
      try {
        await this.sendRequest(new $r(i, e), d.ResponseOk, N.deserialize);
      } catch (s) {
        throw this.subscribers.delete(i), s;
      }
      return i;
    }
    async undeclareLivelinessSubscriber(e) {
      const r = this.subscribers.get(e);
      r == null || (this.subscribers.delete(e), r.drop()), await this.sendRequest(new ei(e), d.ResponseOk, N.deserialize);
    }
    async getSessionInfo() {
      return await this.sendRequest(new ti(), d.ResponseSessionInfo, Be.deserialize).then((e) => e.info);
    }
    async getTimestamp() {
      return await this.sendRequest(new ri(), d.ResponseTimestamp, Pe.deserialize).then((e) => e.timestamp);
    }
    async put(e) {
      return await this.sendMessage(e);
    }
    async delete(e) {
      return await this.sendMessage(e);
    }
    async publisherPut(e) {
      return await this.sendMessage(e);
    }
    async publisherDelete(e) {
      return await this.sendMessage(e);
    }
    async get(e, r) {
      let i = O.get();
      this.gets.set(i, r);
      try {
        return await this.sendMessage(new li(i, e)), i;
      } catch (s) {
        throw this.gets.delete(i), s;
      }
    }
    async querierGet(e, r) {
      let i = O.get();
      this.gets.set(i, r);
      try {
        return await this.sendMessage(new ui(i, e)), i;
      } catch (s) {
        throw this.gets.delete(i), s;
      }
    }
    async livelinessGet(e, r) {
      let i = O.get();
      this.gets.set(i, r);
      try {
        return await this.sendMessage(new ci(i, e)), i;
      } catch (s) {
        throw this.gets.delete(i), s;
      }
    }
    async replyOk(e) {
      await this.sendMessage(e);
    }
    async replyDel(e) {
      await this.sendMessage(e);
    }
    async replyErr(e) {
      await this.sendMessage(e);
    }
    async sendResponseFinal(e) {
      await this.sendMessage(new be(e));
    }
    async publisherDeclareMatchingListener(e, r) {
      let i = O.get();
      this.matchingListeners.set(i, r);
      try {
        await this.sendRequest(new di(i, e), d.ResponseOk, N.deserialize);
      } catch (s) {
        throw this.matchingListeners.delete(i), s;
      }
      return i;
    }
    async undeclareMatchingListener(e) {
      const r = this.matchingListeners.get(e);
      r == null || (this.matchingListeners.delete(e), r.drop()), await this.sendRequest(new yi(e), d.ResponseOk, N.deserialize);
    }
    async publisherGetMatchingStatus(e) {
      return await this.sendRequest(new wi(e), d.ResponseMatchingStatus, Ie.deserialize).then((r) => new Le(r.matching));
    }
    async querierDeclareMatchingListener(e, r) {
      let i = O.get();
      this.matchingListeners.set(i, r);
      try {
        await this.sendRequest(new _i(i, e), d.ResponseOk, N.deserialize);
      } catch (s) {
        throw this.matchingListeners.delete(i), s;
      }
      return i;
    }
    async querierGetMatchingStatus(e) {
      return await this.sendRequest(new bi(e), d.ResponseMatchingStatus, Ie.deserialize).then((r) => new Le(r.matching));
    }
    async close() {
      await this.link.close();
      for (let e of this.subscribers) e[1].drop();
      this.subscribers.clear();
      for (let e of this.gets) e[1].drop();
      this.gets.clear();
      for (let e of this.queryables) e[1].drop();
      this.queryables.clear();
      for (let e of this.matchingListeners) e[1].drop();
      this.matchingListeners.clear(), this.isClosed_ = true;
    }
    isClosed() {
      return this.isClosed_;
    }
    cancelQuery(e) {
      let r = this.gets.get(e);
      r != null && (this.gets.delete(e), r.drop());
    }
  }
  class ot {
    constructor(e, r, i, s, n) {
      __publicField(this, "session");
      __publicField(this, "kind");
      __publicField(this, "id");
      __publicField(this, "keyExpr_");
      __publicField(this, "receiver_");
      this.session = e, this.kind = r, this.id = i, this.keyExpr_ = s, this.receiver_ = n;
    }
    async [Symbol.asyncDispose]() {
      await this.undeclare();
    }
    keyExpr() {
      return this.keyExpr_;
    }
    receiver() {
      return this.receiver_;
    }
    async undeclare() {
      this.kind === le.Subscriber ? await this.session.undeclareSubscriber(this.id) : await this.session.undeclareLivelinessSubscriber(this.id);
    }
  }
  class gi {
    constructor(e, r, i) {
      __publicField(this, "session");
      __publicField(this, "publisherId");
      __publicField(this, "properties");
      this.session = e, this.publisherId = r, this.properties = i;
    }
    async [Symbol.asyncDispose]() {
      await this.undeclare();
    }
    keyExpr() {
      return this.properties.keyexpr;
    }
    async put(e, r) {
      await this.session.publisherPut(new ni(this.publisherId, new g(e), (r == null ? void 0 : r.encoding) ? o.from(r.encoding) : void 0, (r == null ? void 0 : r.attachment) ? new g(r.attachment) : void 0, r == null ? void 0 : r.timestamp));
    }
    encoding() {
      return this.properties.encoding;
    }
    priority() {
      return this.properties.qos.priority;
    }
    reliability() {
      return this.properties.qos.reliability;
    }
    congestionControl() {
      return this.properties.qos.congestionControl;
    }
    async delete(e) {
      await this.session.publisherDelete(new ai(this.publisherId, (e == null ? void 0 : e.attachment) ? new g(e.attachment) : void 0, e == null ? void 0 : e.timestamp));
    }
    async matchingListener(e) {
      const r = (e == null ? void 0 : e.handler) ?? new H(256);
      let [i, s, n] = V(r);
      const l = await this.session.publisherDeclareMatchingListener(this.publisherId, {
        callback: i,
        drop: s
      });
      return new nt(this.session, l, n);
    }
    async matchingStatus() {
      return await this.session.publisherGetMatchingStatus(this.publisherId);
    }
    async undeclare() {
      await this.session.undeclarePublisher(this.publisherId);
    }
  }
  Ui = class {
    constructor(e, r = 500) {
      __publicField(this, "locator");
      __publicField(this, "messageResponseTimeoutMs");
      this.locator = e, this.messageResponseTimeoutMs = r;
    }
  };
})();
export {
  Ui as C,
  __tla,
  ge as d,
  Ei as o
};
