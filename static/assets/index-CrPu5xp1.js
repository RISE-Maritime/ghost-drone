var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var require_stdin = __commonJS({
  "<stdin>"(exports, module) {
    (async () => {
      (function() {
        const o = document.createElement("link").relList;
        if (o && o.supports && o.supports("modulepreload")) return;
        for (const x of document.querySelectorAll('link[rel="modulepreload"]')) g(x);
        new MutationObserver((x) => {
          for (const S of x) if (S.type === "childList") for (const M of S.addedNodes) M.tagName === "LINK" && M.rel === "modulepreload" && g(M);
        }).observe(document, {
          childList: true,
          subtree: true
        });
        function l(x) {
          const S = {};
          return x.integrity && (S.integrity = x.integrity), x.referrerPolicy && (S.referrerPolicy = x.referrerPolicy), x.crossOrigin === "use-credentials" ? S.credentials = "include" : x.crossOrigin === "anonymous" ? S.credentials = "omit" : S.credentials = "same-origin", S;
        }
        function g(x) {
          if (x.ep) return;
          x.ep = true;
          const S = l(x);
          fetch(x.href, S);
        }
      })();
      function kl() {
        const h = document.getElementById("top-bar-clock");
        function o() {
          h.textContent = (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
          });
        }
        o(), setInterval(o, 1e3);
      }
      function Pn(h) {
        return getComputedStyle(document.documentElement).getPropertyValue(h).trim();
      }
      function Al(h) {
        document.getElementById("theme-select").addEventListener("change", function() {
          document.documentElement.setAttribute("data-obc-theme", this.value), h();
        });
      }
      var ya = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
      function Bl(h) {
        return h && h.__esModule && Object.prototype.hasOwnProperty.call(h, "default") ? h.default : h;
      }
      var Qr = {
        exports: {}
      };
      var Pl = Qr.exports, pu;
      function Tl() {
        return pu || (pu = 1, (function(h, o) {
          (function(l, g) {
            g(o);
          })(Pl, (function(l) {
            var g = "1.9.4";
            function x(t) {
              var n, a, d, _;
              for (a = 1, d = arguments.length; a < d; a++) {
                _ = arguments[a];
                for (n in _) t[n] = _[n];
              }
              return t;
            }
            var S = Object.create || /* @__PURE__ */ (function() {
              function t() {
              }
              return function(n) {
                return t.prototype = n, new t();
              };
            })();
            function M(t, n) {
              var a = Array.prototype.slice;
              if (t.bind) return t.bind.apply(t, a.call(arguments, 1));
              var d = a.call(arguments, 2);
              return function() {
                return t.apply(n, d.length ? d.concat(a.call(arguments)) : arguments);
              };
            }
            var J = 0;
            function et(t) {
              return "_leaflet_id" in t || (t._leaflet_id = ++J), t._leaflet_id;
            }
            function _t(t, n, a) {
              var d, _, v, P;
              return P = function() {
                d = false, _ && (v.apply(a, _), _ = false);
              }, v = function() {
                d ? _ = arguments : (t.apply(a, arguments), setTimeout(P, n), d = true);
              }, v;
            }
            function wt(t, n, a) {
              var d = n[1], _ = n[0], v = d - _;
              return t === d && a ? t : ((t - _) % v + v) % v + _;
            }
            function ht() {
              return false;
            }
            function Nt(t, n) {
              if (n === false) return t;
              var a = Math.pow(10, n === void 0 ? 6 : n);
              return Math.round(t * a) / a;
            }
            function ie(t) {
              return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
            }
            function ne(t) {
              return ie(t).split(/\s+/);
            }
            function gt(t, n) {
              Object.prototype.hasOwnProperty.call(t, "options") || (t.options = t.options ? S(t.options) : {});
              for (var a in n) t.options[a] = n[a];
              return t.options;
            }
            function le(t, n, a) {
              var d = [];
              for (var _ in t) d.push(encodeURIComponent(a ? _.toUpperCase() : _) + "=" + encodeURIComponent(t[_]));
              return (!n || n.indexOf("?") === -1 ? "?" : "&") + d.join("&");
            }
            var Zt = /\{ *([\w_ -]+) *\}/g;
            function yt(t, n) {
              return t.replace(Zt, function(a, d) {
                var _ = n[d];
                if (_ === void 0) throw new Error("No value provided for variable " + a);
                return typeof _ == "function" && (_ = _(n)), _;
              });
            }
            var W = Array.isArray || function(t) {
              return Object.prototype.toString.call(t) === "[object Array]";
            };
            function ot(t, n) {
              for (var a = 0; a < t.length; a++) if (t[a] === n) return a;
              return -1;
            }
            var he = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
            function Pe(t) {
              return window["webkit" + t] || window["moz" + t] || window["ms" + t];
            }
            var Ne = 0;
            function Ci(t) {
              var n = +/* @__PURE__ */ new Date(), a = Math.max(0, 16 - (n - Ne));
              return Ne = n + a, window.setTimeout(t, a);
            }
            var li = window.requestAnimationFrame || Pe("RequestAnimationFrame") || Ci, G = window.cancelAnimationFrame || Pe("CancelAnimationFrame") || Pe("CancelRequestAnimationFrame") || function(t) {
              window.clearTimeout(t);
            };
            function Ut(t, n, a) {
              if (a && li === Ci) t.call(n);
              else return li.call(window, M(t, n));
            }
            function ce(t) {
              t && G.call(window, t);
            }
            var xi = {
              __proto__: null,
              extend: x,
              create: S,
              bind: M,
              get lastId() {
                return J;
              },
              stamp: et,
              throttle: _t,
              wrapNum: wt,
              falseFn: ht,
              formatNum: Nt,
              trim: ie,
              splitWords: ne,
              setOptions: gt,
              getParamString: le,
              template: yt,
              isArray: W,
              indexOf: ot,
              emptyImageUrl: he,
              requestFn: li,
              cancelFn: G,
              requestAnimFrame: Ut,
              cancelAnimFrame: ce
            };
            function Ue() {
            }
            Ue.extend = function(t) {
              var n = function() {
                gt(this), this.initialize && this.initialize.apply(this, arguments), this.callInitHooks();
              }, a = n.__super__ = this.prototype, d = S(a);
              d.constructor = n, n.prototype = d;
              for (var _ in this) Object.prototype.hasOwnProperty.call(this, _) && _ !== "prototype" && _ !== "__super__" && (n[_] = this[_]);
              return t.statics && x(n, t.statics), t.includes && (dn(t.includes), x.apply(null, [
                d
              ].concat(t.includes))), x(d, t), delete d.statics, delete d.includes, d.options && (d.options = a.options ? S(a.options) : {}, x(d.options, t.options)), d._initHooks = [], d.callInitHooks = function() {
                if (!this._initHooksCalled) {
                  a.callInitHooks && a.callInitHooks.call(this), this._initHooksCalled = true;
                  for (var v = 0, P = d._initHooks.length; v < P; v++) d._initHooks[v].call(this);
                }
              }, n;
            }, Ue.include = function(t) {
              var n = this.prototype.options;
              return x(this.prototype, t), t.options && (this.prototype.options = n, this.mergeOptions(t.options)), this;
            }, Ue.mergeOptions = function(t) {
              return x(this.prototype.options, t), this;
            }, Ue.addInitHook = function(t) {
              var n = Array.prototype.slice.call(arguments, 1), a = typeof t == "function" ? t : function() {
                this[t].apply(this, n);
              };
              return this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(a), this;
            };
            function dn(t) {
              if (!(typeof L > "u" || !L || !L.Mixin)) {
                t = W(t) ? t : [
                  t
                ];
                for (var n = 0; n < t.length; n++) t[n] === L.Mixin.Events && console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", new Error().stack);
              }
            }
            var _e = {
              on: function(t, n, a) {
                if (typeof t == "object") for (var d in t) this._on(d, t[d], n);
                else {
                  t = ne(t);
                  for (var _ = 0, v = t.length; _ < v; _++) this._on(t[_], n, a);
                }
                return this;
              },
              off: function(t, n, a) {
                if (!arguments.length) delete this._events;
                else if (typeof t == "object") for (var d in t) this._off(d, t[d], n);
                else {
                  t = ne(t);
                  for (var _ = arguments.length === 1, v = 0, P = t.length; v < P; v++) _ ? this._off(t[v]) : this._off(t[v], n, a);
                }
                return this;
              },
              _on: function(t, n, a, d) {
                if (typeof n != "function") {
                  console.warn("wrong listener type: " + typeof n);
                  return;
                }
                if (this._listens(t, n, a) === false) {
                  a === this && (a = void 0);
                  var _ = {
                    fn: n,
                    ctx: a
                  };
                  d && (_.once = true), this._events = this._events || {}, this._events[t] = this._events[t] || [], this._events[t].push(_);
                }
              },
              _off: function(t, n, a) {
                var d, _, v;
                if (this._events && (d = this._events[t], !!d)) {
                  if (arguments.length === 1) {
                    if (this._firingCount) for (_ = 0, v = d.length; _ < v; _++) d[_].fn = ht;
                    delete this._events[t];
                    return;
                  }
                  if (typeof n != "function") {
                    console.warn("wrong listener type: " + typeof n);
                    return;
                  }
                  var P = this._listens(t, n, a);
                  if (P !== false) {
                    var U = d[P];
                    this._firingCount && (U.fn = ht, this._events[t] = d = d.slice()), d.splice(P, 1);
                  }
                }
              },
              fire: function(t, n, a) {
                if (!this.listens(t, a)) return this;
                var d = x({}, n, {
                  type: t,
                  target: this,
                  sourceTarget: n && n.sourceTarget || this
                });
                if (this._events) {
                  var _ = this._events[t];
                  if (_) {
                    this._firingCount = this._firingCount + 1 || 1;
                    for (var v = 0, P = _.length; v < P; v++) {
                      var U = _[v], q = U.fn;
                      U.once && this.off(t, q, U.ctx), q.call(U.ctx || this, d);
                    }
                    this._firingCount--;
                  }
                }
                return a && this._propagateEvent(d), this;
              },
              listens: function(t, n, a, d) {
                typeof t != "string" && console.warn('"string" type argument expected');
                var _ = n;
                typeof n != "function" && (d = !!n, _ = void 0, a = void 0);
                var v = this._events && this._events[t];
                if (v && v.length && this._listens(t, _, a) !== false) return true;
                if (d) {
                  for (var P in this._eventParents) if (this._eventParents[P].listens(t, n, a, d)) return true;
                }
                return false;
              },
              _listens: function(t, n, a) {
                if (!this._events) return false;
                var d = this._events[t] || [];
                if (!n) return !!d.length;
                a === this && (a = void 0);
                for (var _ = 0, v = d.length; _ < v; _++) if (d[_].fn === n && d[_].ctx === a) return _;
                return false;
              },
              once: function(t, n, a) {
                if (typeof t == "object") for (var d in t) this._on(d, t[d], n, true);
                else {
                  t = ne(t);
                  for (var _ = 0, v = t.length; _ < v; _++) this._on(t[_], n, a, true);
                }
                return this;
              },
              addEventParent: function(t) {
                return this._eventParents = this._eventParents || {}, this._eventParents[et(t)] = t, this;
              },
              removeEventParent: function(t) {
                return this._eventParents && delete this._eventParents[et(t)], this;
              },
              _propagateEvent: function(t) {
                for (var n in this._eventParents) this._eventParents[n].fire(t.type, x({
                  layer: t.target,
                  propagatedFrom: t.target
                }, t), true);
              }
            };
            _e.addEventListener = _e.on, _e.removeEventListener = _e.clearAllEventListeners = _e.off, _e.addOneTimeEventListener = _e.once, _e.fireEvent = _e.fire, _e.hasEventListeners = _e.listens;
            var Ei = Ue.extend(_e);
            function pt(t, n, a) {
              this.x = a ? Math.round(t) : t, this.y = a ? Math.round(n) : n;
            }
            var hi = Math.trunc || function(t) {
              return t > 0 ? Math.floor(t) : Math.ceil(t);
            };
            pt.prototype = {
              clone: function() {
                return new pt(this.x, this.y);
              },
              add: function(t) {
                return this.clone()._add(dt(t));
              },
              _add: function(t) {
                return this.x += t.x, this.y += t.y, this;
              },
              subtract: function(t) {
                return this.clone()._subtract(dt(t));
              },
              _subtract: function(t) {
                return this.x -= t.x, this.y -= t.y, this;
              },
              divideBy: function(t) {
                return this.clone()._divideBy(t);
              },
              _divideBy: function(t) {
                return this.x /= t, this.y /= t, this;
              },
              multiplyBy: function(t) {
                return this.clone()._multiplyBy(t);
              },
              _multiplyBy: function(t) {
                return this.x *= t, this.y *= t, this;
              },
              scaleBy: function(t) {
                return new pt(this.x * t.x, this.y * t.y);
              },
              unscaleBy: function(t) {
                return new pt(this.x / t.x, this.y / t.y);
              },
              round: function() {
                return this.clone()._round();
              },
              _round: function() {
                return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
              },
              floor: function() {
                return this.clone()._floor();
              },
              _floor: function() {
                return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
              },
              ceil: function() {
                return this.clone()._ceil();
              },
              _ceil: function() {
                return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
              },
              trunc: function() {
                return this.clone()._trunc();
              },
              _trunc: function() {
                return this.x = hi(this.x), this.y = hi(this.y), this;
              },
              distanceTo: function(t) {
                t = dt(t);
                var n = t.x - this.x, a = t.y - this.y;
                return Math.sqrt(n * n + a * a);
              },
              equals: function(t) {
                return t = dt(t), t.x === this.x && t.y === this.y;
              },
              contains: function(t) {
                return t = dt(t), Math.abs(t.x) <= Math.abs(this.x) && Math.abs(t.y) <= Math.abs(this.y);
              },
              toString: function() {
                return "Point(" + Nt(this.x) + ", " + Nt(this.y) + ")";
              }
            };
            function dt(t, n, a) {
              return t instanceof pt ? t : W(t) ? new pt(t[0], t[1]) : t == null ? t : typeof t == "object" && "x" in t && "y" in t ? new pt(t.x, t.y) : new pt(t, n, a);
            }
            function Mt(t, n) {
              if (t) for (var a = n ? [
                t,
                n
              ] : t, d = 0, _ = a.length; d < _; d++) this.extend(a[d]);
            }
            Mt.prototype = {
              extend: function(t) {
                var n, a;
                if (!t) return this;
                if (t instanceof pt || typeof t[0] == "number" || "x" in t) n = a = dt(t);
                else if (t = Kt(t), n = t.min, a = t.max, !n || !a) return this;
                return !this.min && !this.max ? (this.min = n.clone(), this.max = a.clone()) : (this.min.x = Math.min(n.x, this.min.x), this.max.x = Math.max(a.x, this.max.x), this.min.y = Math.min(n.y, this.min.y), this.max.y = Math.max(a.y, this.max.y)), this;
              },
              getCenter: function(t) {
                return dt((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2, t);
              },
              getBottomLeft: function() {
                return dt(this.min.x, this.max.y);
              },
              getTopRight: function() {
                return dt(this.max.x, this.min.y);
              },
              getTopLeft: function() {
                return this.min;
              },
              getBottomRight: function() {
                return this.max;
              },
              getSize: function() {
                return this.max.subtract(this.min);
              },
              contains: function(t) {
                var n, a;
                return typeof t[0] == "number" || t instanceof pt ? t = dt(t) : t = Kt(t), t instanceof Mt ? (n = t.min, a = t.max) : n = a = t, n.x >= this.min.x && a.x <= this.max.x && n.y >= this.min.y && a.y <= this.max.y;
              },
              intersects: function(t) {
                t = Kt(t);
                var n = this.min, a = this.max, d = t.min, _ = t.max, v = _.x >= n.x && d.x <= a.x, P = _.y >= n.y && d.y <= a.y;
                return v && P;
              },
              overlaps: function(t) {
                t = Kt(t);
                var n = this.min, a = this.max, d = t.min, _ = t.max, v = _.x > n.x && d.x < a.x, P = _.y > n.y && d.y < a.y;
                return v && P;
              },
              isValid: function() {
                return !!(this.min && this.max);
              },
              pad: function(t) {
                var n = this.min, a = this.max, d = Math.abs(n.x - a.x) * t, _ = Math.abs(n.y - a.y) * t;
                return Kt(dt(n.x - d, n.y - _), dt(a.x + d, a.y + _));
              },
              equals: function(t) {
                return t ? (t = Kt(t), this.min.equals(t.getTopLeft()) && this.max.equals(t.getBottomRight())) : false;
              }
            };
            function Kt(t, n) {
              return !t || t instanceof Mt ? t : new Mt(t, n);
            }
            function jt(t, n) {
              if (t) for (var a = n ? [
                t,
                n
              ] : t, d = 0, _ = a.length; d < _; d++) this.extend(a[d]);
            }
            jt.prototype = {
              extend: function(t) {
                var n = this._southWest, a = this._northEast, d, _;
                if (t instanceof Bt) d = t, _ = t;
                else if (t instanceof jt) {
                  if (d = t._southWest, _ = t._northEast, !d || !_) return this;
                } else return t ? this.extend(Ct(t) || Ot(t)) : this;
                return !n && !a ? (this._southWest = new Bt(d.lat, d.lng), this._northEast = new Bt(_.lat, _.lng)) : (n.lat = Math.min(d.lat, n.lat), n.lng = Math.min(d.lng, n.lng), a.lat = Math.max(_.lat, a.lat), a.lng = Math.max(_.lng, a.lng)), this;
              },
              pad: function(t) {
                var n = this._southWest, a = this._northEast, d = Math.abs(n.lat - a.lat) * t, _ = Math.abs(n.lng - a.lng) * t;
                return new jt(new Bt(n.lat - d, n.lng - _), new Bt(a.lat + d, a.lng + _));
              },
              getCenter: function() {
                return new Bt((this._southWest.lat + this._northEast.lat) / 2, (this._southWest.lng + this._northEast.lng) / 2);
              },
              getSouthWest: function() {
                return this._southWest;
              },
              getNorthEast: function() {
                return this._northEast;
              },
              getNorthWest: function() {
                return new Bt(this.getNorth(), this.getWest());
              },
              getSouthEast: function() {
                return new Bt(this.getSouth(), this.getEast());
              },
              getWest: function() {
                return this._southWest.lng;
              },
              getSouth: function() {
                return this._southWest.lat;
              },
              getEast: function() {
                return this._northEast.lng;
              },
              getNorth: function() {
                return this._northEast.lat;
              },
              contains: function(t) {
                typeof t[0] == "number" || t instanceof Bt || "lat" in t ? t = Ct(t) : t = Ot(t);
                var n = this._southWest, a = this._northEast, d, _;
                return t instanceof jt ? (d = t.getSouthWest(), _ = t.getNorthEast()) : d = _ = t, d.lat >= n.lat && _.lat <= a.lat && d.lng >= n.lng && _.lng <= a.lng;
              },
              intersects: function(t) {
                t = Ot(t);
                var n = this._southWest, a = this._northEast, d = t.getSouthWest(), _ = t.getNorthEast(), v = _.lat >= n.lat && d.lat <= a.lat, P = _.lng >= n.lng && d.lng <= a.lng;
                return v && P;
              },
              overlaps: function(t) {
                t = Ot(t);
                var n = this._southWest, a = this._northEast, d = t.getSouthWest(), _ = t.getNorthEast(), v = _.lat > n.lat && d.lat < a.lat, P = _.lng > n.lng && d.lng < a.lng;
                return v && P;
              },
              toBBoxString: function() {
                return [
                  this.getWest(),
                  this.getSouth(),
                  this.getEast(),
                  this.getNorth()
                ].join(",");
              },
              equals: function(t, n) {
                return t ? (t = Ot(t), this._southWest.equals(t.getSouthWest(), n) && this._northEast.equals(t.getNorthEast(), n)) : false;
              },
              isValid: function() {
                return !!(this._southWest && this._northEast);
              }
            };
            function Ot(t, n) {
              return t instanceof jt ? t : new jt(t, n);
            }
            function Bt(t, n, a) {
              if (isNaN(t) || isNaN(n)) throw new Error("Invalid LatLng object: (" + t + ", " + n + ")");
              this.lat = +t, this.lng = +n, a !== void 0 && (this.alt = +a);
            }
            Bt.prototype = {
              equals: function(t, n) {
                if (!t) return false;
                t = Ct(t);
                var a = Math.max(Math.abs(this.lat - t.lat), Math.abs(this.lng - t.lng));
                return a <= (n === void 0 ? 1e-9 : n);
              },
              toString: function(t) {
                return "LatLng(" + Nt(this.lat, t) + ", " + Nt(this.lng, t) + ")";
              },
              distanceTo: function(t) {
                return We.distance(this, Ct(t));
              },
              wrap: function() {
                return We.wrapLatLng(this);
              },
              toBounds: function(t) {
                var n = 180 * t / 40075017, a = n / Math.cos(Math.PI / 180 * this.lat);
                return Ot([
                  this.lat - n,
                  this.lng - a
                ], [
                  this.lat + n,
                  this.lng + a
                ]);
              },
              clone: function() {
                return new Bt(this.lat, this.lng, this.alt);
              }
            };
            function Ct(t, n, a) {
              return t instanceof Bt ? t : W(t) && typeof t[0] != "object" ? t.length === 3 ? new Bt(t[0], t[1], t[2]) : t.length === 2 ? new Bt(t[0], t[1]) : null : t == null ? t : typeof t == "object" && "lat" in t ? new Bt(t.lat, "lng" in t ? t.lng : t.lon, t.alt) : n === void 0 ? null : new Bt(t, n, a);
            }
            var Ge = {
              latLngToPoint: function(t, n) {
                var a = this.projection.project(t), d = this.scale(n);
                return this.transformation._transform(a, d);
              },
              pointToLatLng: function(t, n) {
                var a = this.scale(n), d = this.transformation.untransform(t, a);
                return this.projection.unproject(d);
              },
              project: function(t) {
                return this.projection.project(t);
              },
              unproject: function(t) {
                return this.projection.unproject(t);
              },
              scale: function(t) {
                return 256 * Math.pow(2, t);
              },
              zoom: function(t) {
                return Math.log(t / 256) / Math.LN2;
              },
              getProjectedBounds: function(t) {
                if (this.infinite) return null;
                var n = this.projection.bounds, a = this.scale(t), d = this.transformation.transform(n.min, a), _ = this.transformation.transform(n.max, a);
                return new Mt(d, _);
              },
              infinite: false,
              wrapLatLng: function(t) {
                var n = this.wrapLng ? wt(t.lng, this.wrapLng, true) : t.lng, a = this.wrapLat ? wt(t.lat, this.wrapLat, true) : t.lat, d = t.alt;
                return new Bt(a, n, d);
              },
              wrapLatLngBounds: function(t) {
                var n = t.getCenter(), a = this.wrapLatLng(n), d = n.lat - a.lat, _ = n.lng - a.lng;
                if (d === 0 && _ === 0) return t;
                var v = t.getSouthWest(), P = t.getNorthEast(), U = new Bt(v.lat - d, v.lng - _), q = new Bt(P.lat - d, P.lng - _);
                return new jt(U, q);
              }
            }, We = x({}, Ge, {
              wrapLng: [
                -180,
                180
              ],
              R: 6371e3,
              distance: function(t, n) {
                var a = Math.PI / 180, d = t.lat * a, _ = n.lat * a, v = Math.sin((n.lat - t.lat) * a / 2), P = Math.sin((n.lng - t.lng) * a / 2), U = v * v + Math.cos(d) * Math.cos(_) * P * P, q = 2 * Math.atan2(Math.sqrt(U), Math.sqrt(1 - U));
                return this.R * q;
              }
            }), pn = 6378137, ar = {
              R: pn,
              MAX_LATITUDE: 85.0511287798,
              project: function(t) {
                var n = Math.PI / 180, a = this.MAX_LATITUDE, d = Math.max(Math.min(a, t.lat), -a), _ = Math.sin(d * n);
                return new pt(this.R * t.lng * n, this.R * Math.log((1 + _) / (1 - _)) / 2);
              },
              unproject: function(t) {
                var n = 180 / Math.PI;
                return new Bt((2 * Math.atan(Math.exp(t.y / this.R)) - Math.PI / 2) * n, t.x * n / this.R);
              },
              bounds: (function() {
                var t = pn * Math.PI;
                return new Mt([
                  -t,
                  -t
                ], [
                  t,
                  t
                ]);
              })()
            };
            function or(t, n, a, d) {
              if (W(t)) {
                this._a = t[0], this._b = t[1], this._c = t[2], this._d = t[3];
                return;
              }
              this._a = t, this._b = n, this._c = a, this._d = d;
            }
            or.prototype = {
              transform: function(t, n) {
                return this._transform(t.clone(), n);
              },
              _transform: function(t, n) {
                return n = n || 1, t.x = n * (this._a * t.x + this._b), t.y = n * (this._c * t.y + this._d), t;
              },
              untransform: function(t, n) {
                return n = n || 1, new pt((t.x / n - this._b) / this._a, (t.y / n - this._d) / this._c);
              }
            };
            function fn(t, n, a, d) {
              return new or(t, n, a, d);
            }
            var ur = x({}, We, {
              code: "EPSG:3857",
              projection: ar,
              transformation: (function() {
                var t = 0.5 / (Math.PI * ar.R);
                return fn(t, 0.5, -t, 0.5);
              })()
            }), ns = x({}, ur, {
              code: "EPSG:900913"
            });
            function rs(t) {
              return document.createElementNS("http://www.w3.org/2000/svg", t);
            }
            function ss(t, n) {
              var a = "", d, _, v, P, U, q;
              for (d = 0, v = t.length; d < v; d++) {
                for (U = t[d], _ = 0, P = U.length; _ < P; _++) q = U[_], a += (_ ? "L" : "M") + q.x + " " + q.y;
                a += n ? ct.svg ? "z" : "x" : "";
              }
              return a || "M0 0";
            }
            var In = document.documentElement.style, Ui = "ActiveXObject" in window, as = Ui && !document.addEventListener, os = "msLaunchUri" in navigator && !("documentMode" in document), lr = Ze("webkit"), us = Ze("android"), ls = Ze("android 2") || Ze("android 3"), Sa = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10), Da = us && Ze("Google") && Sa < 537 && !("AudioNode" in window), hr = !!window.opera, hs = !os && Ze("chrome"), cs = Ze("gecko") && !lr && !hr && !Ui, ds = !hs && Ze("safari"), cr = Ze("phantom"), ps = "OTransition" in In, Gi = navigator.platform.indexOf("Win") === 0, fs = Ui && "transition" in In, On = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !ls, Zi = "MozPerspective" in In, _s = !window.L_DISABLE_3D && (fs || On || Zi) && !ps && !cr, Mi = typeof orientation < "u" || Ze("mobile"), Ia = Mi && lr, Oa = Mi && On, dr = !window.PointerEvent && window.MSPointerEvent, ms = !!(window.PointerEvent || dr), gs = "ontouchstart" in window || !!window.TouchEvent, Ra = !window.L_NO_TOUCH && (gs || ms), Fa = Mi && hr, ys = Mi && cs, vs = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1, za = (function() {
              var t = false;
              try {
                var n = Object.defineProperty({}, "passive", {
                  get: function() {
                    t = true;
                  }
                });
                window.addEventListener("testPassiveEventSupport", ht, n), window.removeEventListener("testPassiveEventSupport", ht, n);
              } catch {
              }
              return t;
            })(), Na = (function() {
              return !!document.createElement("canvas").getContext;
            })(), pr = !!(document.createElementNS && rs("svg").createSVGRect), Ls = !!pr && (function() {
              var t = document.createElement("div");
              return t.innerHTML = "<svg/>", (t.firstChild && t.firstChild.namespaceURI) === "http://www.w3.org/2000/svg";
            })(), Ua = !pr && (function() {
              try {
                var t = document.createElement("div");
                t.innerHTML = '<v:shape adj="1"/>';
                var n = t.firstChild;
                return n.style.behavior = "url(#default#VML)", n && typeof n.adj == "object";
              } catch {
                return false;
              }
            })(), Ga = navigator.platform.indexOf("Mac") === 0, Za = navigator.platform.indexOf("Linux") === 0;
            function Ze(t) {
              return navigator.userAgent.toLowerCase().indexOf(t) >= 0;
            }
            var ct = {
              ie: Ui,
              ielt9: as,
              edge: os,
              webkit: lr,
              android: us,
              android23: ls,
              androidStock: Da,
              opera: hr,
              chrome: hs,
              gecko: cs,
              safari: ds,
              phantom: cr,
              opera12: ps,
              win: Gi,
              ie3d: fs,
              webkit3d: On,
              gecko3d: Zi,
              any3d: _s,
              mobile: Mi,
              mobileWebkit: Ia,
              mobileWebkit3d: Oa,
              msPointer: dr,
              pointer: ms,
              touch: Ra,
              touchNative: gs,
              mobileOpera: Fa,
              mobileGecko: ys,
              retina: vs,
              passiveEvents: za,
              canvas: Na,
              svg: pr,
              vml: Ua,
              inlineSvg: Ls,
              mac: Ga,
              linux: Za
            }, bs = ct.msPointer ? "MSPointerDown" : "pointerdown", ws = ct.msPointer ? "MSPointerMove" : "pointermove", fr = ct.msPointer ? "MSPointerUp" : "pointerup", Cs = ct.msPointer ? "MSPointerCancel" : "pointercancel", _r = {
              touchstart: bs,
              touchmove: ws,
              touchend: fr,
              touchcancel: Cs
            }, xs = {
              touchstart: Wa,
              touchmove: Fn,
              touchend: Fn,
              touchcancel: Fn
            }, ji = {}, Es = false;
            function ja(t, n, a) {
              return n === "touchstart" && mr(), xs[n] ? (a = xs[n].bind(this, a), t.addEventListener(_r[n], a, false), a) : (console.warn("wrong event specified:", n), ht);
            }
            function qa(t, n, a) {
              if (!_r[n]) {
                console.warn("wrong event specified:", n);
                return;
              }
              t.removeEventListener(_r[n], a, false);
            }
            function Va(t) {
              ji[t.pointerId] = t;
            }
            function Ha(t) {
              ji[t.pointerId] && (ji[t.pointerId] = t);
            }
            function Rn(t) {
              delete ji[t.pointerId];
            }
            function mr() {
              Es || (document.addEventListener(bs, Va, true), document.addEventListener(ws, Ha, true), document.addEventListener(fr, Rn, true), document.addEventListener(Cs, Rn, true), Es = true);
            }
            function Fn(t, n) {
              if (n.pointerType !== (n.MSPOINTER_TYPE_MOUSE || "mouse")) {
                n.touches = [];
                for (var a in ji) n.touches.push(ji[a]);
                n.changedTouches = [
                  n
                ], t(n);
              }
            }
            function Wa(t, n) {
              n.MSPOINTER_TYPE_TOUCH && n.pointerType === n.MSPOINTER_TYPE_TOUCH && ae(n), Fn(t, n);
            }
            function Ka(t) {
              var n = {}, a, d;
              for (d in t) a = t[d], n[d] = a && a.bind ? a.bind(t) : a;
              return t = n, n.type = "dblclick", n.detail = 2, n.isTrusted = false, n._simulated = true, n;
            }
            var Ya = 200;
            function Xa(t, n) {
              t.addEventListener("dblclick", n);
              var a = 0, d;
              function _(v) {
                if (v.detail !== 1) {
                  d = v.detail;
                  return;
                }
                if (!(v.pointerType === "mouse" || v.sourceCapabilities && !v.sourceCapabilities.firesTouchEvents)) {
                  var P = Ps(v);
                  if (!(P.some(function(q) {
                    return q instanceof HTMLLabelElement && q.attributes.for;
                  }) && !P.some(function(q) {
                    return q instanceof HTMLInputElement || q instanceof HTMLSelectElement;
                  }))) {
                    var U = Date.now();
                    U - a <= Ya ? (d++, d === 2 && n(Ka(v))) : d = 1, a = U;
                  }
                }
              }
              return t.addEventListener("click", _), {
                dblclick: n,
                simDblclick: _
              };
            }
            function Ja(t, n) {
              t.removeEventListener("dblclick", n.dblclick), t.removeEventListener("click", n.simDblclick);
            }
            var gr = Nn([
              "transform",
              "webkitTransform",
              "OTransform",
              "MozTransform",
              "msTransform"
            ]), _n = Nn([
              "webkitTransition",
              "transition",
              "OTransition",
              "MozTransition",
              "msTransition"
            ]), Ms = _n === "webkitTransition" || _n === "OTransition" ? _n + "End" : "transitionend";
            function ks(t) {
              return typeof t == "string" ? document.getElementById(t) : t;
            }
            function ci(t, n) {
              var a = t.style[n] || t.currentStyle && t.currentStyle[n];
              if ((!a || a === "auto") && document.defaultView) {
                var d = document.defaultView.getComputedStyle(t, null);
                a = d ? d[n] : null;
              }
              return a === "auto" ? null : a;
            }
            function Pt(t, n, a) {
              var d = document.createElement(t);
              return d.className = n || "", a && a.appendChild(d), d;
            }
            function qt(t) {
              var n = t.parentNode;
              n && n.removeChild(t);
            }
            function mn(t) {
              for (; t.firstChild; ) t.removeChild(t.firstChild);
            }
            function qi(t) {
              var n = t.parentNode;
              n && n.lastChild !== t && n.appendChild(t);
            }
            function Vi(t) {
              var n = t.parentNode;
              n && n.firstChild !== t && n.insertBefore(t, n.firstChild);
            }
            function yr(t, n) {
              if (t.classList !== void 0) return t.classList.contains(n);
              var a = zn(t);
              return a.length > 0 && new RegExp("(^|\\s)" + n + "(\\s|$)").test(a);
            }
            function bt(t, n) {
              if (t.classList !== void 0) for (var a = ne(n), d = 0, _ = a.length; d < _; d++) t.classList.add(a[d]);
              else if (!yr(t, n)) {
                var v = zn(t);
                vr(t, (v ? v + " " : "") + n);
              }
            }
            function Yt(t, n) {
              t.classList !== void 0 ? t.classList.remove(n) : vr(t, ie((" " + zn(t) + " ").replace(" " + n + " ", " ")));
            }
            function vr(t, n) {
              t.className.baseVal === void 0 ? t.className = n : t.className.baseVal = n;
            }
            function zn(t) {
              return t.correspondingElement && (t = t.correspondingElement), t.className.baseVal === void 0 ? t.className : t.className.baseVal;
            }
            function Te(t, n) {
              "opacity" in t.style ? t.style.opacity = n : "filter" in t.style && Qa(t, n);
            }
            function Qa(t, n) {
              var a = false, d = "DXImageTransform.Microsoft.Alpha";
              try {
                a = t.filters.item(d);
              } catch {
                if (n === 1) return;
              }
              n = Math.round(n * 100), a ? (a.Enabled = n !== 100, a.Opacity = n) : t.style.filter += " progid:" + d + "(opacity=" + n + ")";
            }
            function Nn(t) {
              for (var n = document.documentElement.style, a = 0; a < t.length; a++) if (t[a] in n) return t[a];
              return false;
            }
            function ki(t, n, a) {
              var d = n || new pt(0, 0);
              t.style[gr] = (ct.ie3d ? "translate(" + d.x + "px," + d.y + "px)" : "translate3d(" + d.x + "px," + d.y + "px,0)") + (a ? " scale(" + a + ")" : "");
            }
            function Jt(t, n) {
              t._leaflet_pos = n, ct.any3d ? ki(t, n) : (t.style.left = n.x + "px", t.style.top = n.y + "px");
            }
            function di(t) {
              return t._leaflet_pos || new pt(0, 0);
            }
            var gn, yn, Lr;
            if ("onselectstart" in document) gn = function() {
              vt(window, "selectstart", ae);
            }, yn = function() {
              St(window, "selectstart", ae);
            };
            else {
              var vn = Nn([
                "userSelect",
                "WebkitUserSelect",
                "OUserSelect",
                "MozUserSelect",
                "msUserSelect"
              ]);
              gn = function() {
                if (vn) {
                  var t = document.documentElement.style;
                  Lr = t[vn], t[vn] = "none";
                }
              }, yn = function() {
                vn && (document.documentElement.style[vn] = Lr, Lr = void 0);
              };
            }
            function br() {
              vt(window, "dragstart", ae);
            }
            function wr() {
              St(window, "dragstart", ae);
            }
            var Un, Cr;
            function xr(t) {
              for (; t.tabIndex === -1; ) t = t.parentNode;
              t.style && (Gn(), Un = t, Cr = t.style.outlineStyle, t.style.outlineStyle = "none", vt(window, "keydown", Gn));
            }
            function Gn() {
              Un && (Un.style.outlineStyle = Cr, Un = void 0, Cr = void 0, St(window, "keydown", Gn));
            }
            function As(t) {
              do
                t = t.parentNode;
              while ((!t.offsetWidth || !t.offsetHeight) && t !== document.body);
              return t;
            }
            function Er(t) {
              var n = t.getBoundingClientRect();
              return {
                x: n.width / t.offsetWidth || 1,
                y: n.height / t.offsetHeight || 1,
                boundingClientRect: n
              };
            }
            var $a = {
              __proto__: null,
              TRANSFORM: gr,
              TRANSITION: _n,
              TRANSITION_END: Ms,
              get: ks,
              getStyle: ci,
              create: Pt,
              remove: qt,
              empty: mn,
              toFront: qi,
              toBack: Vi,
              hasClass: yr,
              addClass: bt,
              removeClass: Yt,
              setClass: vr,
              getClass: zn,
              setOpacity: Te,
              testProp: Nn,
              setTransform: ki,
              setPosition: Jt,
              getPosition: di,
              get disableTextSelection() {
                return gn;
              },
              get enableTextSelection() {
                return yn;
              },
              disableImageDrag: br,
              enableImageDrag: wr,
              preventOutline: xr,
              restoreOutline: Gn,
              getSizedParentNode: As,
              getScale: Er
            };
            function vt(t, n, a, d) {
              if (n && typeof n == "object") for (var _ in n) kr(t, _, n[_], a);
              else {
                n = ne(n);
                for (var v = 0, P = n.length; v < P; v++) kr(t, n[v], a, d);
              }
              return this;
            }
            var Ke = "_leaflet_events";
            function St(t, n, a, d) {
              if (arguments.length === 1) Bs(t), delete t[Ke];
              else if (n && typeof n == "object") for (var _ in n) Ar(t, _, n[_], a);
              else if (n = ne(n), arguments.length === 2) Bs(t, function(U) {
                return ot(n, U) !== -1;
              });
              else for (var v = 0, P = n.length; v < P; v++) Ar(t, n[v], a, d);
              return this;
            }
            function Bs(t, n) {
              for (var a in t[Ke]) {
                var d = a.split(/\d/)[0];
                (!n || n(d)) && Ar(t, d, null, null, a);
              }
            }
            var Mr = {
              mouseenter: "mouseover",
              mouseleave: "mouseout",
              wheel: !("onwheel" in window) && "mousewheel"
            };
            function kr(t, n, a, d) {
              var _ = n + et(a) + (d ? "_" + et(d) : "");
              if (t[Ke] && t[Ke][_]) return this;
              var v = function(U) {
                return a.call(d || t, U || window.event);
              }, P = v;
              !ct.touchNative && ct.pointer && n.indexOf("touch") === 0 ? v = ja(t, n, v) : ct.touch && n === "dblclick" ? v = Xa(t, v) : "addEventListener" in t ? n === "touchstart" || n === "touchmove" || n === "wheel" || n === "mousewheel" ? t.addEventListener(Mr[n] || n, v, ct.passiveEvents ? {
                passive: false
              } : false) : n === "mouseenter" || n === "mouseleave" ? (v = function(U) {
                U = U || window.event, Zn(t, U) && P(U);
              }, t.addEventListener(Mr[n], v, false)) : t.addEventListener(n, P, false) : t.attachEvent("on" + n, v), t[Ke] = t[Ke] || {}, t[Ke][_] = v;
            }
            function Ar(t, n, a, d, _) {
              _ = _ || n + et(a) + (d ? "_" + et(d) : "");
              var v = t[Ke] && t[Ke][_];
              if (!v) return this;
              !ct.touchNative && ct.pointer && n.indexOf("touch") === 0 ? qa(t, n, v) : ct.touch && n === "dblclick" ? Ja(t, v) : "removeEventListener" in t ? t.removeEventListener(Mr[n] || n, v, false) : t.detachEvent("on" + n, v), t[Ke][_] = null;
            }
            function Ai(t) {
              return t.stopPropagation ? t.stopPropagation() : t.originalEvent ? t.originalEvent._stopped = true : t.cancelBubble = true, this;
            }
            function Br(t) {
              return kr(t, "wheel", Ai), this;
            }
            function Ln(t) {
              return vt(t, "mousedown touchstart dblclick contextmenu", Ai), t._leaflet_disable_click = true, this;
            }
            function ae(t) {
              return t.preventDefault ? t.preventDefault() : t.returnValue = false, this;
            }
            function Bi(t) {
              return ae(t), Ai(t), this;
            }
            function Ps(t) {
              if (t.composedPath) return t.composedPath();
              for (var n = [], a = t.target; a; ) n.push(a), a = a.parentNode;
              return n;
            }
            function bn(t, n) {
              if (!n) return new pt(t.clientX, t.clientY);
              var a = Er(n), d = a.boundingClientRect;
              return new pt((t.clientX - d.left) / a.x - n.clientLeft, (t.clientY - d.top) / a.y - n.clientTop);
            }
            var to = ct.linux && ct.chrome ? window.devicePixelRatio : ct.mac ? window.devicePixelRatio * 3 : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
            function Ts(t) {
              return ct.edge ? t.wheelDeltaY / 2 : t.deltaY && t.deltaMode === 0 ? -t.deltaY / to : t.deltaY && t.deltaMode === 1 ? -t.deltaY * 20 : t.deltaY && t.deltaMode === 2 ? -t.deltaY * 60 : t.deltaX || t.deltaZ ? 0 : t.wheelDelta ? (t.wheelDeltaY || t.wheelDelta) / 2 : t.detail && Math.abs(t.detail) < 32765 ? -t.detail * 20 : t.detail ? t.detail / -32765 * 60 : 0;
            }
            function Zn(t, n) {
              var a = n.relatedTarget;
              if (!a) return true;
              try {
                for (; a && a !== t; ) a = a.parentNode;
              } catch {
                return false;
              }
              return a !== t;
            }
            var At = {
              __proto__: null,
              on: vt,
              off: St,
              stopPropagation: Ai,
              disableScrollPropagation: Br,
              disableClickPropagation: Ln,
              preventDefault: ae,
              stop: Bi,
              getPropagationPath: Ps,
              getMousePosition: bn,
              getWheelDelta: Ts,
              isExternalTarget: Zn,
              addListener: vt,
              removeListener: St
            }, Ss = Ei.extend({
              run: function(t, n, a, d) {
                this.stop(), this._el = t, this._inProgress = true, this._duration = a || 0.25, this._easeOutPower = 1 / Math.max(d || 0.5, 0.2), this._startPos = di(t), this._offset = n.subtract(this._startPos), this._startTime = +/* @__PURE__ */ new Date(), this.fire("start"), this._animate();
              },
              stop: function() {
                this._inProgress && (this._step(true), this._complete());
              },
              _animate: function() {
                this._animId = Ut(this._animate, this), this._step();
              },
              _step: function(t) {
                var n = +/* @__PURE__ */ new Date() - this._startTime, a = this._duration * 1e3;
                n < a ? this._runFrame(this._easeOut(n / a), t) : (this._runFrame(1), this._complete());
              },
              _runFrame: function(t, n) {
                var a = this._startPos.add(this._offset.multiplyBy(t));
                n && a._round(), Jt(this._el, a), this.fire("step");
              },
              _complete: function() {
                ce(this._animId), this._inProgress = false, this.fire("end");
              },
              _easeOut: function(t) {
                return 1 - Math.pow(1 - t, this._easeOutPower);
              }
            }), kt = Ei.extend({
              options: {
                crs: ur,
                center: void 0,
                zoom: void 0,
                minZoom: void 0,
                maxZoom: void 0,
                layers: [],
                maxBounds: void 0,
                renderer: void 0,
                zoomAnimation: true,
                zoomAnimationThreshold: 4,
                fadeAnimation: true,
                markerZoomAnimation: true,
                transform3DLimit: 8388608,
                zoomSnap: 1,
                zoomDelta: 1,
                trackResize: true
              },
              initialize: function(t, n) {
                n = gt(this, n), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._sizeChanged = true, this._initContainer(t), this._initLayout(), this._onResize = M(this._onResize, this), this._initEvents(), n.maxBounds && this.setMaxBounds(n.maxBounds), n.zoom !== void 0 && (this._zoom = this._limitZoom(n.zoom)), n.center && n.zoom !== void 0 && this.setView(Ct(n.center), n.zoom, {
                  reset: true
                }), this.callInitHooks(), this._zoomAnimated = _n && ct.any3d && !ct.mobileOpera && this.options.zoomAnimation, this._zoomAnimated && (this._createAnimProxy(), vt(this._proxy, Ms, this._catchTransitionEnd, this)), this._addLayers(this.options.layers);
              },
              setView: function(t, n, a) {
                if (n = n === void 0 ? this._zoom : this._limitZoom(n), t = this._limitCenter(Ct(t), n, this.options.maxBounds), a = a || {}, this._stop(), this._loaded && !a.reset && a !== true) {
                  a.animate !== void 0 && (a.zoom = x({
                    animate: a.animate
                  }, a.zoom), a.pan = x({
                    animate: a.animate,
                    duration: a.duration
                  }, a.pan));
                  var d = this._zoom !== n ? this._tryAnimatedZoom && this._tryAnimatedZoom(t, n, a.zoom) : this._tryAnimatedPan(t, a.pan);
                  if (d) return clearTimeout(this._sizeTimer), this;
                }
                return this._resetView(t, n, a.pan && a.pan.noMoveStart), this;
              },
              setZoom: function(t, n) {
                return this._loaded ? this.setView(this.getCenter(), t, {
                  zoom: n
                }) : (this._zoom = t, this);
              },
              zoomIn: function(t, n) {
                return t = t || (ct.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom + t, n);
              },
              zoomOut: function(t, n) {
                return t = t || (ct.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom - t, n);
              },
              setZoomAround: function(t, n, a) {
                var d = this.getZoomScale(n), _ = this.getSize().divideBy(2), v = t instanceof pt ? t : this.latLngToContainerPoint(t), P = v.subtract(_).multiplyBy(1 - 1 / d), U = this.containerPointToLatLng(_.add(P));
                return this.setView(U, n, {
                  zoom: a
                });
              },
              _getBoundsCenterZoom: function(t, n) {
                n = n || {}, t = t.getBounds ? t.getBounds() : Ot(t);
                var a = dt(n.paddingTopLeft || n.padding || [
                  0,
                  0
                ]), d = dt(n.paddingBottomRight || n.padding || [
                  0,
                  0
                ]), _ = this.getBoundsZoom(t, false, a.add(d));
                if (_ = typeof n.maxZoom == "number" ? Math.min(n.maxZoom, _) : _, _ === 1 / 0) return {
                  center: t.getCenter(),
                  zoom: _
                };
                var v = d.subtract(a).divideBy(2), P = this.project(t.getSouthWest(), _), U = this.project(t.getNorthEast(), _), q = this.unproject(P.add(U).divideBy(2).add(v), _);
                return {
                  center: q,
                  zoom: _
                };
              },
              fitBounds: function(t, n) {
                if (t = Ot(t), !t.isValid()) throw new Error("Bounds are not valid.");
                var a = this._getBoundsCenterZoom(t, n);
                return this.setView(a.center, a.zoom, n);
              },
              fitWorld: function(t) {
                return this.fitBounds([
                  [
                    -90,
                    -180
                  ],
                  [
                    90,
                    180
                  ]
                ], t);
              },
              panTo: function(t, n) {
                return this.setView(t, this._zoom, {
                  pan: n
                });
              },
              panBy: function(t, n) {
                if (t = dt(t).round(), n = n || {}, !t.x && !t.y) return this.fire("moveend");
                if (n.animate !== true && !this.getSize().contains(t)) return this._resetView(this.unproject(this.project(this.getCenter()).add(t)), this.getZoom()), this;
                if (this._panAnim || (this._panAnim = new Ss(), this._panAnim.on({
                  step: this._onPanTransitionStep,
                  end: this._onPanTransitionEnd
                }, this)), n.noMoveStart || this.fire("movestart"), n.animate !== false) {
                  bt(this._mapPane, "leaflet-pan-anim");
                  var a = this._getMapPanePos().subtract(t).round();
                  this._panAnim.run(this._mapPane, a, n.duration || 0.25, n.easeLinearity);
                } else this._rawPanBy(t), this.fire("move").fire("moveend");
                return this;
              },
              flyTo: function(t, n, a) {
                if (a = a || {}, a.animate === false || !ct.any3d) return this.setView(t, n, a);
                this._stop();
                var d = this.project(this.getCenter()), _ = this.project(t), v = this.getSize(), P = this._zoom;
                t = Ct(t), n = n === void 0 ? P : n;
                var U = Math.max(v.x, v.y), q = U * this.getZoomScale(P, n), X = _.distanceTo(d) || 1, at = 1.42, ft = at * at;
                function xt(Vt) {
                  var ve = Vt ? -1 : 1, xe = Vt ? q : U, aa = q * q - U * U + ve * ft * ft * X * X, qe = 2 * xe * ft * X, mt = aa / qe, tr = Math.sqrt(mt * mt + 1) - mt, Vr = tr < 1e-9 ? -18 : Math.log(tr);
                  return Vr;
                }
                function ye(Vt) {
                  return (Math.exp(Vt) - Math.exp(-Vt)) / 2;
                }
                function se(Vt) {
                  return (Math.exp(Vt) + Math.exp(-Vt)) / 2;
                }
                function Re(Vt) {
                  return ye(Vt) / se(Vt);
                }
                var Ce = xt(0);
                function gi(Vt) {
                  return U * (se(Ce) / se(Ce + at * Vt));
                }
                function na(Vt) {
                  return U * (se(Ce) * Re(Ce + at * Vt) - ye(Ce)) / ft;
                }
                function qr(Vt) {
                  return 1 - Math.pow(1 - Vt, 1.5);
                }
                var vo = Date.now(), ra = (xt(1) - Ce) / at, Lo = a.duration ? 1e3 * a.duration : 1e3 * ra * 0.8;
                function sa() {
                  var Vt = (Date.now() - vo) / Lo, ve = qr(Vt) * ra;
                  Vt <= 1 ? (this._flyToFrame = Ut(sa, this), this._move(this.unproject(d.add(_.subtract(d).multiplyBy(na(ve) / X)), P), this.getScaleZoom(U / gi(ve), P), {
                    flyTo: true
                  })) : this._move(t, n)._moveEnd(true);
                }
                return this._moveStart(true, a.noMoveStart), sa.call(this), this;
              },
              flyToBounds: function(t, n) {
                var a = this._getBoundsCenterZoom(t, n);
                return this.flyTo(a.center, a.zoom, n);
              },
              setMaxBounds: function(t) {
                return t = Ot(t), this.listens("moveend", this._panInsideMaxBounds) && this.off("moveend", this._panInsideMaxBounds), t.isValid() ? (this.options.maxBounds = t, this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds)) : (this.options.maxBounds = null, this);
              },
              setMinZoom: function(t) {
                var n = this.options.minZoom;
                return this.options.minZoom = t, this._loaded && n !== t && (this.fire("zoomlevelschange"), this.getZoom() < this.options.minZoom) ? this.setZoom(t) : this;
              },
              setMaxZoom: function(t) {
                var n = this.options.maxZoom;
                return this.options.maxZoom = t, this._loaded && n !== t && (this.fire("zoomlevelschange"), this.getZoom() > this.options.maxZoom) ? this.setZoom(t) : this;
              },
              panInsideBounds: function(t, n) {
                this._enforcingBounds = true;
                var a = this.getCenter(), d = this._limitCenter(a, this._zoom, Ot(t));
                return a.equals(d) || this.panTo(d, n), this._enforcingBounds = false, this;
              },
              panInside: function(t, n) {
                n = n || {};
                var a = dt(n.paddingTopLeft || n.padding || [
                  0,
                  0
                ]), d = dt(n.paddingBottomRight || n.padding || [
                  0,
                  0
                ]), _ = this.project(this.getCenter()), v = this.project(t), P = this.getPixelBounds(), U = Kt([
                  P.min.add(a),
                  P.max.subtract(d)
                ]), q = U.getSize();
                if (!U.contains(v)) {
                  this._enforcingBounds = true;
                  var X = v.subtract(U.getCenter()), at = U.extend(v).getSize().subtract(q);
                  _.x += X.x < 0 ? -at.x : at.x, _.y += X.y < 0 ? -at.y : at.y, this.panTo(this.unproject(_), n), this._enforcingBounds = false;
                }
                return this;
              },
              invalidateSize: function(t) {
                if (!this._loaded) return this;
                t = x({
                  animate: false,
                  pan: true
                }, t === true ? {
                  animate: true
                } : t);
                var n = this.getSize();
                this._sizeChanged = true, this._lastCenter = null;
                var a = this.getSize(), d = n.divideBy(2).round(), _ = a.divideBy(2).round(), v = d.subtract(_);
                return !v.x && !v.y ? this : (t.animate && t.pan ? this.panBy(v) : (t.pan && this._rawPanBy(v), this.fire("move"), t.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(M(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
                  oldSize: n,
                  newSize: a
                }));
              },
              stop: function() {
                return this.setZoom(this._limitZoom(this._zoom)), this.options.zoomSnap || this.fire("viewreset"), this._stop();
              },
              locate: function(t) {
                if (t = this._locateOptions = x({
                  timeout: 1e4,
                  watch: false
                }, t), !("geolocation" in navigator)) return this._handleGeolocationError({
                  code: 0,
                  message: "Geolocation not supported."
                }), this;
                var n = M(this._handleGeolocationResponse, this), a = M(this._handleGeolocationError, this);
                return t.watch ? this._locationWatchId = navigator.geolocation.watchPosition(n, a, t) : navigator.geolocation.getCurrentPosition(n, a, t), this;
              },
              stopLocate: function() {
                return navigator.geolocation && navigator.geolocation.clearWatch && navigator.geolocation.clearWatch(this._locationWatchId), this._locateOptions && (this._locateOptions.setView = false), this;
              },
              _handleGeolocationError: function(t) {
                if (this._container._leaflet_id) {
                  var n = t.code, a = t.message || (n === 1 ? "permission denied" : n === 2 ? "position unavailable" : "timeout");
                  this._locateOptions.setView && !this._loaded && this.fitWorld(), this.fire("locationerror", {
                    code: n,
                    message: "Geolocation error: " + a + "."
                  });
                }
              },
              _handleGeolocationResponse: function(t) {
                if (this._container._leaflet_id) {
                  var n = t.coords.latitude, a = t.coords.longitude, d = new Bt(n, a), _ = d.toBounds(t.coords.accuracy * 2), v = this._locateOptions;
                  if (v.setView) {
                    var P = this.getBoundsZoom(_);
                    this.setView(d, v.maxZoom ? Math.min(P, v.maxZoom) : P);
                  }
                  var U = {
                    latlng: d,
                    bounds: _,
                    timestamp: t.timestamp
                  };
                  for (var q in t.coords) typeof t.coords[q] == "number" && (U[q] = t.coords[q]);
                  this.fire("locationfound", U);
                }
              },
              addHandler: function(t, n) {
                if (!n) return this;
                var a = this[t] = new n(this);
                return this._handlers.push(a), this.options[t] && a.enable(), this;
              },
              remove: function() {
                if (this._initEvents(true), this.options.maxBounds && this.off("moveend", this._panInsideMaxBounds), this._containerId !== this._container._leaflet_id) throw new Error("Map container is being reused by another instance");
                try {
                  delete this._container._leaflet_id, delete this._containerId;
                } catch {
                  this._container._leaflet_id = void 0, this._containerId = void 0;
                }
                this._locationWatchId !== void 0 && this.stopLocate(), this._stop(), qt(this._mapPane), this._clearControlPos && this._clearControlPos(), this._resizeRequest && (ce(this._resizeRequest), this._resizeRequest = null), this._clearHandlers(), this._loaded && this.fire("unload");
                var t;
                for (t in this._layers) this._layers[t].remove();
                for (t in this._panes) qt(this._panes[t]);
                return this._layers = [], this._panes = [], delete this._mapPane, delete this._renderer, this;
              },
              createPane: function(t, n) {
                var a = "leaflet-pane" + (t ? " leaflet-" + t.replace("Pane", "") + "-pane" : ""), d = Pt("div", a, n || this._mapPane);
                return t && (this._panes[t] = d), d;
              },
              getCenter: function() {
                return this._checkIfLoaded(), this._lastCenter && !this._moved() ? this._lastCenter.clone() : this.layerPointToLatLng(this._getCenterLayerPoint());
              },
              getZoom: function() {
                return this._zoom;
              },
              getBounds: function() {
                var t = this.getPixelBounds(), n = this.unproject(t.getBottomLeft()), a = this.unproject(t.getTopRight());
                return new jt(n, a);
              },
              getMinZoom: function() {
                return this.options.minZoom === void 0 ? this._layersMinZoom || 0 : this.options.minZoom;
              },
              getMaxZoom: function() {
                return this.options.maxZoom === void 0 ? this._layersMaxZoom === void 0 ? 1 / 0 : this._layersMaxZoom : this.options.maxZoom;
              },
              getBoundsZoom: function(t, n, a) {
                t = Ot(t), a = dt(a || [
                  0,
                  0
                ]);
                var d = this.getZoom() || 0, _ = this.getMinZoom(), v = this.getMaxZoom(), P = t.getNorthWest(), U = t.getSouthEast(), q = this.getSize().subtract(a), X = Kt(this.project(U, d), this.project(P, d)).getSize(), at = ct.any3d ? this.options.zoomSnap : 1, ft = q.x / X.x, xt = q.y / X.y, ye = n ? Math.max(ft, xt) : Math.min(ft, xt);
                return d = this.getScaleZoom(ye, d), at && (d = Math.round(d / (at / 100)) * (at / 100), d = n ? Math.ceil(d / at) * at : Math.floor(d / at) * at), Math.max(_, Math.min(v, d));
              },
              getSize: function() {
                return (!this._size || this._sizeChanged) && (this._size = new pt(this._container.clientWidth || 0, this._container.clientHeight || 0), this._sizeChanged = false), this._size.clone();
              },
              getPixelBounds: function(t, n) {
                var a = this._getTopLeftPoint(t, n);
                return new Mt(a, a.add(this.getSize()));
              },
              getPixelOrigin: function() {
                return this._checkIfLoaded(), this._pixelOrigin;
              },
              getPixelWorldBounds: function(t) {
                return this.options.crs.getProjectedBounds(t === void 0 ? this.getZoom() : t);
              },
              getPane: function(t) {
                return typeof t == "string" ? this._panes[t] : t;
              },
              getPanes: function() {
                return this._panes;
              },
              getContainer: function() {
                return this._container;
              },
              getZoomScale: function(t, n) {
                var a = this.options.crs;
                return n = n === void 0 ? this._zoom : n, a.scale(t) / a.scale(n);
              },
              getScaleZoom: function(t, n) {
                var a = this.options.crs;
                n = n === void 0 ? this._zoom : n;
                var d = a.zoom(t * a.scale(n));
                return isNaN(d) ? 1 / 0 : d;
              },
              project: function(t, n) {
                return n = n === void 0 ? this._zoom : n, this.options.crs.latLngToPoint(Ct(t), n);
              },
              unproject: function(t, n) {
                return n = n === void 0 ? this._zoom : n, this.options.crs.pointToLatLng(dt(t), n);
              },
              layerPointToLatLng: function(t) {
                var n = dt(t).add(this.getPixelOrigin());
                return this.unproject(n);
              },
              latLngToLayerPoint: function(t) {
                var n = this.project(Ct(t))._round();
                return n._subtract(this.getPixelOrigin());
              },
              wrapLatLng: function(t) {
                return this.options.crs.wrapLatLng(Ct(t));
              },
              wrapLatLngBounds: function(t) {
                return this.options.crs.wrapLatLngBounds(Ot(t));
              },
              distance: function(t, n) {
                return this.options.crs.distance(Ct(t), Ct(n));
              },
              containerPointToLayerPoint: function(t) {
                return dt(t).subtract(this._getMapPanePos());
              },
              layerPointToContainerPoint: function(t) {
                return dt(t).add(this._getMapPanePos());
              },
              containerPointToLatLng: function(t) {
                var n = this.containerPointToLayerPoint(dt(t));
                return this.layerPointToLatLng(n);
              },
              latLngToContainerPoint: function(t) {
                return this.layerPointToContainerPoint(this.latLngToLayerPoint(Ct(t)));
              },
              mouseEventToContainerPoint: function(t) {
                return bn(t, this._container);
              },
              mouseEventToLayerPoint: function(t) {
                return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t));
              },
              mouseEventToLatLng: function(t) {
                return this.layerPointToLatLng(this.mouseEventToLayerPoint(t));
              },
              _initContainer: function(t) {
                var n = this._container = ks(t);
                if (n) {
                  if (n._leaflet_id) throw new Error("Map container is already initialized.");
                } else throw new Error("Map container not found.");
                vt(n, "scroll", this._onScroll, this), this._containerId = et(n);
              },
              _initLayout: function() {
                var t = this._container;
                this._fadeAnimated = this.options.fadeAnimation && ct.any3d, bt(t, "leaflet-container" + (ct.touch ? " leaflet-touch" : "") + (ct.retina ? " leaflet-retina" : "") + (ct.ielt9 ? " leaflet-oldie" : "") + (ct.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
                var n = ci(t, "position");
                n !== "absolute" && n !== "relative" && n !== "fixed" && n !== "sticky" && (t.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos();
              },
              _initPanes: function() {
                var t = this._panes = {};
                this._paneRenderers = {}, this._mapPane = this.createPane("mapPane", this._container), Jt(this._mapPane, new pt(0, 0)), this.createPane("tilePane"), this.createPane("overlayPane"), this.createPane("shadowPane"), this.createPane("markerPane"), this.createPane("tooltipPane"), this.createPane("popupPane"), this.options.markerZoomAnimation || (bt(t.markerPane, "leaflet-zoom-hide"), bt(t.shadowPane, "leaflet-zoom-hide"));
              },
              _resetView: function(t, n, a) {
                Jt(this._mapPane, new pt(0, 0));
                var d = !this._loaded;
                this._loaded = true, n = this._limitZoom(n), this.fire("viewprereset");
                var _ = this._zoom !== n;
                this._moveStart(_, a)._move(t, n)._moveEnd(_), this.fire("viewreset"), d && this.fire("load");
              },
              _moveStart: function(t, n) {
                return t && this.fire("zoomstart"), n || this.fire("movestart"), this;
              },
              _move: function(t, n, a, d) {
                n === void 0 && (n = this._zoom);
                var _ = this._zoom !== n;
                return this._zoom = n, this._lastCenter = t, this._pixelOrigin = this._getNewPixelOrigin(t), d ? a && a.pinch && this.fire("zoom", a) : ((_ || a && a.pinch) && this.fire("zoom", a), this.fire("move", a)), this;
              },
              _moveEnd: function(t) {
                return t && this.fire("zoomend"), this.fire("moveend");
              },
              _stop: function() {
                return ce(this._flyToFrame), this._panAnim && this._panAnim.stop(), this;
              },
              _rawPanBy: function(t) {
                Jt(this._mapPane, this._getMapPanePos().subtract(t));
              },
              _getZoomSpan: function() {
                return this.getMaxZoom() - this.getMinZoom();
              },
              _panInsideMaxBounds: function() {
                this._enforcingBounds || this.panInsideBounds(this.options.maxBounds);
              },
              _checkIfLoaded: function() {
                if (!this._loaded) throw new Error("Set map center and zoom first.");
              },
              _initEvents: function(t) {
                this._targets = {}, this._targets[et(this._container)] = this;
                var n = t ? St : vt;
                n(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this), this.options.trackResize && n(window, "resize", this._onResize, this), ct.any3d && this.options.transform3DLimit && (t ? this.off : this.on).call(this, "moveend", this._onMoveEnd);
              },
              _onResize: function() {
                ce(this._resizeRequest), this._resizeRequest = Ut(function() {
                  this.invalidateSize({
                    debounceMoveend: true
                  });
                }, this);
              },
              _onScroll: function() {
                this._container.scrollTop = 0, this._container.scrollLeft = 0;
              },
              _onMoveEnd: function() {
                var t = this._getMapPanePos();
                Math.max(Math.abs(t.x), Math.abs(t.y)) >= this.options.transform3DLimit && this._resetView(this.getCenter(), this.getZoom());
              },
              _findEventTargets: function(t, n) {
                for (var a = [], d, _ = n === "mouseout" || n === "mouseover", v = t.target || t.srcElement, P = false; v; ) {
                  if (d = this._targets[et(v)], d && (n === "click" || n === "preclick") && this._draggableMoved(d)) {
                    P = true;
                    break;
                  }
                  if (d && d.listens(n, true) && (_ && !Zn(v, t) || (a.push(d), _)) || v === this._container) break;
                  v = v.parentNode;
                }
                return !a.length && !P && !_ && this.listens(n, true) && (a = [
                  this
                ]), a;
              },
              _isClickDisabled: function(t) {
                for (; t && t !== this._container; ) {
                  if (t._leaflet_disable_click) return true;
                  t = t.parentNode;
                }
              },
              _handleDOMEvent: function(t) {
                var n = t.target || t.srcElement;
                if (!(!this._loaded || n._leaflet_disable_events || t.type === "click" && this._isClickDisabled(n))) {
                  var a = t.type;
                  a === "mousedown" && xr(n), this._fireDOMEvent(t, a);
                }
              },
              _mouseEvents: [
                "click",
                "dblclick",
                "mouseover",
                "mouseout",
                "contextmenu"
              ],
              _fireDOMEvent: function(t, n, a) {
                if (t.type === "click") {
                  var d = x({}, t);
                  d.type = "preclick", this._fireDOMEvent(d, d.type, a);
                }
                var _ = this._findEventTargets(t, n);
                if (a) {
                  for (var v = [], P = 0; P < a.length; P++) a[P].listens(n, true) && v.push(a[P]);
                  _ = v.concat(_);
                }
                if (_.length) {
                  n === "contextmenu" && ae(t);
                  var U = _[0], q = {
                    originalEvent: t
                  };
                  if (t.type !== "keypress" && t.type !== "keydown" && t.type !== "keyup") {
                    var X = U.getLatLng && (!U._radius || U._radius <= 10);
                    q.containerPoint = X ? this.latLngToContainerPoint(U.getLatLng()) : this.mouseEventToContainerPoint(t), q.layerPoint = this.containerPointToLayerPoint(q.containerPoint), q.latlng = X ? U.getLatLng() : this.layerPointToLatLng(q.layerPoint);
                  }
                  for (P = 0; P < _.length; P++) if (_[P].fire(n, q, true), q.originalEvent._stopped || _[P].options.bubblingMouseEvents === false && ot(this._mouseEvents, n) !== -1) return;
                }
              },
              _draggableMoved: function(t) {
                return t = t.dragging && t.dragging.enabled() ? t : this, t.dragging && t.dragging.moved() || this.boxZoom && this.boxZoom.moved();
              },
              _clearHandlers: function() {
                for (var t = 0, n = this._handlers.length; t < n; t++) this._handlers[t].disable();
              },
              whenReady: function(t, n) {
                return this._loaded ? t.call(n || this, {
                  target: this
                }) : this.on("load", t, n), this;
              },
              _getMapPanePos: function() {
                return di(this._mapPane) || new pt(0, 0);
              },
              _moved: function() {
                var t = this._getMapPanePos();
                return t && !t.equals([
                  0,
                  0
                ]);
              },
              _getTopLeftPoint: function(t, n) {
                var a = t && n !== void 0 ? this._getNewPixelOrigin(t, n) : this.getPixelOrigin();
                return a.subtract(this._getMapPanePos());
              },
              _getNewPixelOrigin: function(t, n) {
                var a = this.getSize()._divideBy(2);
                return this.project(t, n)._subtract(a)._add(this._getMapPanePos())._round();
              },
              _latLngToNewLayerPoint: function(t, n, a) {
                var d = this._getNewPixelOrigin(a, n);
                return this.project(t, n)._subtract(d);
              },
              _latLngBoundsToNewLayerBounds: function(t, n, a) {
                var d = this._getNewPixelOrigin(a, n);
                return Kt([
                  this.project(t.getSouthWest(), n)._subtract(d),
                  this.project(t.getNorthWest(), n)._subtract(d),
                  this.project(t.getSouthEast(), n)._subtract(d),
                  this.project(t.getNorthEast(), n)._subtract(d)
                ]);
              },
              _getCenterLayerPoint: function() {
                return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
              },
              _getCenterOffset: function(t) {
                return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint());
              },
              _limitCenter: function(t, n, a) {
                if (!a) return t;
                var d = this.project(t, n), _ = this.getSize().divideBy(2), v = new Mt(d.subtract(_), d.add(_)), P = this._getBoundsOffset(v, a, n);
                return Math.abs(P.x) <= 1 && Math.abs(P.y) <= 1 ? t : this.unproject(d.add(P), n);
              },
              _limitOffset: function(t, n) {
                if (!n) return t;
                var a = this.getPixelBounds(), d = new Mt(a.min.add(t), a.max.add(t));
                return t.add(this._getBoundsOffset(d, n));
              },
              _getBoundsOffset: function(t, n, a) {
                var d = Kt(this.project(n.getNorthEast(), a), this.project(n.getSouthWest(), a)), _ = d.min.subtract(t.min), v = d.max.subtract(t.max), P = this._rebound(_.x, -v.x), U = this._rebound(_.y, -v.y);
                return new pt(P, U);
              },
              _rebound: function(t, n) {
                return t + n > 0 ? Math.round(t - n) / 2 : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(n));
              },
              _limitZoom: function(t) {
                var n = this.getMinZoom(), a = this.getMaxZoom(), d = ct.any3d ? this.options.zoomSnap : 1;
                return d && (t = Math.round(t / d) * d), Math.max(n, Math.min(a, t));
              },
              _onPanTransitionStep: function() {
                this.fire("move");
              },
              _onPanTransitionEnd: function() {
                Yt(this._mapPane, "leaflet-pan-anim"), this.fire("moveend");
              },
              _tryAnimatedPan: function(t, n) {
                var a = this._getCenterOffset(t)._trunc();
                return (n && n.animate) !== true && !this.getSize().contains(a) ? false : (this.panBy(a, n), true);
              },
              _createAnimProxy: function() {
                var t = this._proxy = Pt("div", "leaflet-proxy leaflet-zoom-animated");
                this._panes.mapPane.appendChild(t), this.on("zoomanim", function(n) {
                  var a = gr, d = this._proxy.style[a];
                  ki(this._proxy, this.project(n.center, n.zoom), this.getZoomScale(n.zoom, 1)), d === this._proxy.style[a] && this._animatingZoom && this._onZoomTransitionEnd();
                }, this), this.on("load moveend", this._animMoveEnd, this), this._on("unload", this._destroyAnimProxy, this);
              },
              _destroyAnimProxy: function() {
                qt(this._proxy), this.off("load moveend", this._animMoveEnd, this), delete this._proxy;
              },
              _animMoveEnd: function() {
                var t = this.getCenter(), n = this.getZoom();
                ki(this._proxy, this.project(t, n), this.getZoomScale(n, 1));
              },
              _catchTransitionEnd: function(t) {
                this._animatingZoom && t.propertyName.indexOf("transform") >= 0 && this._onZoomTransitionEnd();
              },
              _nothingToAnimate: function() {
                return !this._container.getElementsByClassName("leaflet-zoom-animated").length;
              },
              _tryAnimatedZoom: function(t, n, a) {
                if (this._animatingZoom) return true;
                if (a = a || {}, !this._zoomAnimated || a.animate === false || this._nothingToAnimate() || Math.abs(n - this._zoom) > this.options.zoomAnimationThreshold) return false;
                var d = this.getZoomScale(n), _ = this._getCenterOffset(t)._divideBy(1 - 1 / d);
                return a.animate !== true && !this.getSize().contains(_) ? false : (Ut(function() {
                  this._moveStart(true, a.noMoveStart || false)._animateZoom(t, n, true);
                }, this), true);
              },
              _animateZoom: function(t, n, a, d) {
                this._mapPane && (a && (this._animatingZoom = true, this._animateToCenter = t, this._animateToZoom = n, bt(this._mapPane, "leaflet-zoom-anim")), this.fire("zoomanim", {
                  center: t,
                  zoom: n,
                  noUpdate: d
                }), this._tempFireZoomEvent || (this._tempFireZoomEvent = this._zoom !== this._animateToZoom), this._move(this._animateToCenter, this._animateToZoom, void 0, true), setTimeout(M(this._onZoomTransitionEnd, this), 250));
              },
              _onZoomTransitionEnd: function() {
                this._animatingZoom && (this._mapPane && Yt(this._mapPane, "leaflet-zoom-anim"), this._animatingZoom = false, this._move(this._animateToCenter, this._animateToZoom, void 0, true), this._tempFireZoomEvent && this.fire("zoom"), delete this._tempFireZoomEvent, this.fire("move"), this._moveEnd(true));
              }
            });
            function jn(t, n) {
              return new kt(t, n);
            }
            var je = Ue.extend({
              options: {
                position: "topright"
              },
              initialize: function(t) {
                gt(this, t);
              },
              getPosition: function() {
                return this.options.position;
              },
              setPosition: function(t) {
                var n = this._map;
                return n && n.removeControl(this), this.options.position = t, n && n.addControl(this), this;
              },
              getContainer: function() {
                return this._container;
              },
              addTo: function(t) {
                this.remove(), this._map = t;
                var n = this._container = this.onAdd(t), a = this.getPosition(), d = t._controlCorners[a];
                return bt(n, "leaflet-control"), a.indexOf("bottom") !== -1 ? d.insertBefore(n, d.firstChild) : d.appendChild(n), this._map.on("unload", this.remove, this), this;
              },
              remove: function() {
                return this._map ? (qt(this._container), this.onRemove && this.onRemove(this._map), this._map.off("unload", this.remove, this), this._map = null, this) : this;
              },
              _refocusOnMap: function(t) {
                this._map && t && t.screenX > 0 && t.screenY > 0 && this._map.getContainer().focus();
              }
            }), Hi = function(t) {
              return new je(t);
            };
            kt.include({
              addControl: function(t) {
                return t.addTo(this), this;
              },
              removeControl: function(t) {
                return t.remove(), this;
              },
              _initControlPos: function() {
                var t = this._controlCorners = {}, n = "leaflet-", a = this._controlContainer = Pt("div", n + "control-container", this._container);
                function d(_, v) {
                  var P = n + _ + " " + n + v;
                  t[_ + v] = Pt("div", P, a);
                }
                d("top", "left"), d("top", "right"), d("bottom", "left"), d("bottom", "right");
              },
              _clearControlPos: function() {
                for (var t in this._controlCorners) qt(this._controlCorners[t]);
                qt(this._controlContainer), delete this._controlCorners, delete this._controlContainer;
              }
            });
            var Ds = je.extend({
              options: {
                collapsed: true,
                position: "topright",
                autoZIndex: true,
                hideSingleBase: false,
                sortLayers: false,
                sortFunction: function(t, n, a, d) {
                  return a < d ? -1 : d < a ? 1 : 0;
                }
              },
              initialize: function(t, n, a) {
                gt(this, a), this._layerControlInputs = [], this._layers = [], this._lastZIndex = 0, this._handlingClick = false, this._preventClick = false;
                for (var d in t) this._addLayer(t[d], d);
                for (d in n) this._addLayer(n[d], d, true);
              },
              onAdd: function(t) {
                this._initLayout(), this._update(), this._map = t, t.on("zoomend", this._checkDisabledLayers, this);
                for (var n = 0; n < this._layers.length; n++) this._layers[n].layer.on("add remove", this._onLayerChange, this);
                return this._container;
              },
              addTo: function(t) {
                return je.prototype.addTo.call(this, t), this._expandIfNotCollapsed();
              },
              onRemove: function() {
                this._map.off("zoomend", this._checkDisabledLayers, this);
                for (var t = 0; t < this._layers.length; t++) this._layers[t].layer.off("add remove", this._onLayerChange, this);
              },
              addBaseLayer: function(t, n) {
                return this._addLayer(t, n), this._map ? this._update() : this;
              },
              addOverlay: function(t, n) {
                return this._addLayer(t, n, true), this._map ? this._update() : this;
              },
              removeLayer: function(t) {
                t.off("add remove", this._onLayerChange, this);
                var n = this._getLayer(et(t));
                return n && this._layers.splice(this._layers.indexOf(n), 1), this._map ? this._update() : this;
              },
              expand: function() {
                bt(this._container, "leaflet-control-layers-expanded"), this._section.style.height = null;
                var t = this._map.getSize().y - (this._container.offsetTop + 50);
                return t < this._section.clientHeight ? (bt(this._section, "leaflet-control-layers-scrollbar"), this._section.style.height = t + "px") : Yt(this._section, "leaflet-control-layers-scrollbar"), this._checkDisabledLayers(), this;
              },
              collapse: function() {
                return Yt(this._container, "leaflet-control-layers-expanded"), this;
              },
              _initLayout: function() {
                var t = "leaflet-control-layers", n = this._container = Pt("div", t), a = this.options.collapsed;
                n.setAttribute("aria-haspopup", true), Ln(n), Br(n);
                var d = this._section = Pt("section", t + "-list");
                a && (this._map.on("click", this.collapse, this), vt(n, {
                  mouseenter: this._expandSafely,
                  mouseleave: this.collapse
                }, this));
                var _ = this._layersLink = Pt("a", t + "-toggle", n);
                _.href = "#", _.title = "Layers", _.setAttribute("role", "button"), vt(_, {
                  keydown: function(v) {
                    v.keyCode === 13 && this._expandSafely();
                  },
                  click: function(v) {
                    ae(v), this._expandSafely();
                  }
                }, this), a || this.expand(), this._baseLayersList = Pt("div", t + "-base", d), this._separator = Pt("div", t + "-separator", d), this._overlaysList = Pt("div", t + "-overlays", d), n.appendChild(d);
              },
              _getLayer: function(t) {
                for (var n = 0; n < this._layers.length; n++) if (this._layers[n] && et(this._layers[n].layer) === t) return this._layers[n];
              },
              _addLayer: function(t, n, a) {
                this._map && t.on("add remove", this._onLayerChange, this), this._layers.push({
                  layer: t,
                  name: n,
                  overlay: a
                }), this.options.sortLayers && this._layers.sort(M(function(d, _) {
                  return this.options.sortFunction(d.layer, _.layer, d.name, _.name);
                }, this)), this.options.autoZIndex && t.setZIndex && (this._lastZIndex++, t.setZIndex(this._lastZIndex)), this._expandIfNotCollapsed();
              },
              _update: function() {
                if (!this._container) return this;
                mn(this._baseLayersList), mn(this._overlaysList), this._layerControlInputs = [];
                var t, n, a, d, _ = 0;
                for (a = 0; a < this._layers.length; a++) d = this._layers[a], this._addItem(d), n = n || d.overlay, t = t || !d.overlay, _ += d.overlay ? 0 : 1;
                return this.options.hideSingleBase && (t = t && _ > 1, this._baseLayersList.style.display = t ? "" : "none"), this._separator.style.display = n && t ? "" : "none", this;
              },
              _onLayerChange: function(t) {
                this._handlingClick || this._update();
                var n = this._getLayer(et(t.target)), a = n.overlay ? t.type === "add" ? "overlayadd" : "overlayremove" : t.type === "add" ? "baselayerchange" : null;
                a && this._map.fire(a, n);
              },
              _createRadioElement: function(t, n) {
                var a = '<input type="radio" class="leaflet-control-layers-selector" name="' + t + '"' + (n ? ' checked="checked"' : "") + "/>", d = document.createElement("div");
                return d.innerHTML = a, d.firstChild;
              },
              _addItem: function(t) {
                var n = document.createElement("label"), a = this._map.hasLayer(t.layer), d;
                t.overlay ? (d = document.createElement("input"), d.type = "checkbox", d.className = "leaflet-control-layers-selector", d.defaultChecked = a) : d = this._createRadioElement("leaflet-base-layers_" + et(this), a), this._layerControlInputs.push(d), d.layerId = et(t.layer), vt(d, "click", this._onInputClick, this);
                var _ = document.createElement("span");
                _.innerHTML = " " + t.name;
                var v = document.createElement("span");
                n.appendChild(v), v.appendChild(d), v.appendChild(_);
                var P = t.overlay ? this._overlaysList : this._baseLayersList;
                return P.appendChild(n), this._checkDisabledLayers(), n;
              },
              _onInputClick: function() {
                if (!this._preventClick) {
                  var t = this._layerControlInputs, n, a, d = [], _ = [];
                  this._handlingClick = true;
                  for (var v = t.length - 1; v >= 0; v--) n = t[v], a = this._getLayer(n.layerId).layer, n.checked ? d.push(a) : n.checked || _.push(a);
                  for (v = 0; v < _.length; v++) this._map.hasLayer(_[v]) && this._map.removeLayer(_[v]);
                  for (v = 0; v < d.length; v++) this._map.hasLayer(d[v]) || this._map.addLayer(d[v]);
                  this._handlingClick = false, this._refocusOnMap();
                }
              },
              _checkDisabledLayers: function() {
                for (var t = this._layerControlInputs, n, a, d = this._map.getZoom(), _ = t.length - 1; _ >= 0; _--) n = t[_], a = this._getLayer(n.layerId).layer, n.disabled = a.options.minZoom !== void 0 && d < a.options.minZoom || a.options.maxZoom !== void 0 && d > a.options.maxZoom;
              },
              _expandIfNotCollapsed: function() {
                return this._map && !this.options.collapsed && this.expand(), this;
              },
              _expandSafely: function() {
                var t = this._section;
                this._preventClick = true, vt(t, "click", ae), this.expand();
                var n = this;
                setTimeout(function() {
                  St(t, "click", ae), n._preventClick = false;
                });
              }
            }), Pr = function(t, n, a) {
              return new Ds(t, n, a);
            }, Wi = je.extend({
              options: {
                position: "topleft",
                zoomInText: '<span aria-hidden="true">+</span>',
                zoomInTitle: "Zoom in",
                zoomOutText: '<span aria-hidden="true">&#x2212;</span>',
                zoomOutTitle: "Zoom out"
              },
              onAdd: function(t) {
                var n = "leaflet-control-zoom", a = Pt("div", n + " leaflet-bar"), d = this.options;
                return this._zoomInButton = this._createButton(d.zoomInText, d.zoomInTitle, n + "-in", a, this._zoomIn), this._zoomOutButton = this._createButton(d.zoomOutText, d.zoomOutTitle, n + "-out", a, this._zoomOut), this._updateDisabled(), t.on("zoomend zoomlevelschange", this._updateDisabled, this), a;
              },
              onRemove: function(t) {
                t.off("zoomend zoomlevelschange", this._updateDisabled, this);
              },
              disable: function() {
                return this._disabled = true, this._updateDisabled(), this;
              },
              enable: function() {
                return this._disabled = false, this._updateDisabled(), this;
              },
              _zoomIn: function(t) {
                !this._disabled && this._map._zoom < this._map.getMaxZoom() && this._map.zoomIn(this._map.options.zoomDelta * (t.shiftKey ? 3 : 1));
              },
              _zoomOut: function(t) {
                !this._disabled && this._map._zoom > this._map.getMinZoom() && this._map.zoomOut(this._map.options.zoomDelta * (t.shiftKey ? 3 : 1));
              },
              _createButton: function(t, n, a, d, _) {
                var v = Pt("a", a, d);
                return v.innerHTML = t, v.href = "#", v.title = n, v.setAttribute("role", "button"), v.setAttribute("aria-label", n), Ln(v), vt(v, "click", Bi), vt(v, "click", _, this), vt(v, "click", this._refocusOnMap, this), v;
              },
              _updateDisabled: function() {
                var t = this._map, n = "leaflet-disabled";
                Yt(this._zoomInButton, n), Yt(this._zoomOutButton, n), this._zoomInButton.setAttribute("aria-disabled", "false"), this._zoomOutButton.setAttribute("aria-disabled", "false"), (this._disabled || t._zoom === t.getMinZoom()) && (bt(this._zoomOutButton, n), this._zoomOutButton.setAttribute("aria-disabled", "true")), (this._disabled || t._zoom === t.getMaxZoom()) && (bt(this._zoomInButton, n), this._zoomInButton.setAttribute("aria-disabled", "true"));
              }
            });
            kt.mergeOptions({
              zoomControl: true
            }), kt.addInitHook(function() {
              this.options.zoomControl && (this.zoomControl = new Wi(), this.addControl(this.zoomControl));
            });
            var eo = function(t) {
              return new Wi(t);
            }, ri = je.extend({
              options: {
                position: "bottomleft",
                maxWidth: 100,
                metric: true,
                imperial: true
              },
              onAdd: function(t) {
                var n = "leaflet-control-scale", a = Pt("div", n), d = this.options;
                return this._addScales(d, n + "-line", a), t.on(d.updateWhenIdle ? "moveend" : "move", this._update, this), t.whenReady(this._update, this), a;
              },
              onRemove: function(t) {
                t.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this);
              },
              _addScales: function(t, n, a) {
                t.metric && (this._mScale = Pt("div", n, a)), t.imperial && (this._iScale = Pt("div", n, a));
              },
              _update: function() {
                var t = this._map, n = t.getSize().y / 2, a = t.distance(t.containerPointToLatLng([
                  0,
                  n
                ]), t.containerPointToLatLng([
                  this.options.maxWidth,
                  n
                ]));
                this._updateScales(a);
              },
              _updateScales: function(t) {
                this.options.metric && t && this._updateMetric(t), this.options.imperial && t && this._updateImperial(t);
              },
              _updateMetric: function(t) {
                var n = this._getRoundNum(t), a = n < 1e3 ? n + " m" : n / 1e3 + " km";
                this._updateScale(this._mScale, a, n / t);
              },
              _updateImperial: function(t) {
                var n = t * 3.2808399, a, d, _;
                n > 5280 ? (a = n / 5280, d = this._getRoundNum(a), this._updateScale(this._iScale, d + " mi", d / a)) : (_ = this._getRoundNum(n), this._updateScale(this._iScale, _ + " ft", _ / n));
              },
              _updateScale: function(t, n, a) {
                t.style.width = Math.round(this.options.maxWidth * a) + "px", t.innerHTML = n;
              },
              _getRoundNum: function(t) {
                var n = Math.pow(10, (Math.floor(t) + "").length - 1), a = t / n;
                return a = a >= 10 ? 10 : a >= 5 ? 5 : a >= 3 ? 3 : a >= 2 ? 2 : 1, n * a;
              }
            }), Is = function(t) {
              return new ri(t);
            }, Ki = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>', Tr = je.extend({
              options: {
                position: "bottomright",
                prefix: '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' + (ct.inlineSvg ? Ki + " " : "") + "Leaflet</a>"
              },
              initialize: function(t) {
                gt(this, t), this._attributions = {};
              },
              onAdd: function(t) {
                t.attributionControl = this, this._container = Pt("div", "leaflet-control-attribution"), Ln(this._container);
                for (var n in t._layers) t._layers[n].getAttribution && this.addAttribution(t._layers[n].getAttribution());
                return this._update(), t.on("layeradd", this._addAttribution, this), this._container;
              },
              onRemove: function(t) {
                t.off("layeradd", this._addAttribution, this);
              },
              _addAttribution: function(t) {
                t.layer.getAttribution && (this.addAttribution(t.layer.getAttribution()), t.layer.once("remove", function() {
                  this.removeAttribution(t.layer.getAttribution());
                }, this));
              },
              setPrefix: function(t) {
                return this.options.prefix = t, this._update(), this;
              },
              addAttribution: function(t) {
                return t ? (this._attributions[t] || (this._attributions[t] = 0), this._attributions[t]++, this._update(), this) : this;
              },
              removeAttribution: function(t) {
                return t ? (this._attributions[t] && (this._attributions[t]--, this._update()), this) : this;
              },
              _update: function() {
                if (this._map) {
                  var t = [];
                  for (var n in this._attributions) this._attributions[n] && t.push(n);
                  var a = [];
                  this.options.prefix && a.push(this.options.prefix), t.length && a.push(t.join(", ")), this._container.innerHTML = a.join(' <span aria-hidden="true">|</span> ');
                }
              }
            });
            kt.mergeOptions({
              attributionControl: true
            }), kt.addInitHook(function() {
              this.options.attributionControl && new Tr().addTo(this);
            });
            var io = function(t) {
              return new Tr(t);
            };
            je.Layers = Ds, je.Zoom = Wi, je.Scale = ri, je.Attribution = Tr, Hi.layers = Pr, Hi.zoom = eo, Hi.scale = Is, Hi.attribution = io;
            var Ye = Ue.extend({
              initialize: function(t) {
                this._map = t;
              },
              enable: function() {
                return this._enabled ? this : (this._enabled = true, this.addHooks(), this);
              },
              disable: function() {
                return this._enabled ? (this._enabled = false, this.removeHooks(), this) : this;
              },
              enabled: function() {
                return !!this._enabled;
              }
            });
            Ye.addTo = function(t, n) {
              return t.addHandler(n, this), this;
            };
            var no = {
              Events: _e
            }, Os = ct.touch ? "touchstart mousedown" : "mousedown", pi = Ei.extend({
              options: {
                clickTolerance: 3
              },
              initialize: function(t, n, a, d) {
                gt(this, d), this._element = t, this._dragStartTarget = n || t, this._preventOutline = a;
              },
              enable: function() {
                this._enabled || (vt(this._dragStartTarget, Os, this._onDown, this), this._enabled = true);
              },
              disable: function() {
                this._enabled && (pi._dragging === this && this.finishDrag(true), St(this._dragStartTarget, Os, this._onDown, this), this._enabled = false, this._moved = false);
              },
              _onDown: function(t) {
                if (this._enabled && (this._moved = false, !yr(this._element, "leaflet-zoom-anim"))) {
                  if (t.touches && t.touches.length !== 1) {
                    pi._dragging === this && this.finishDrag();
                    return;
                  }
                  if (!(pi._dragging || t.shiftKey || t.which !== 1 && t.button !== 1 && !t.touches) && (pi._dragging = this, this._preventOutline && xr(this._element), br(), gn(), !this._moving)) {
                    this.fire("down");
                    var n = t.touches ? t.touches[0] : t, a = As(this._element);
                    this._startPoint = new pt(n.clientX, n.clientY), this._startPos = di(this._element), this._parentScale = Er(a);
                    var d = t.type === "mousedown";
                    vt(document, d ? "mousemove" : "touchmove", this._onMove, this), vt(document, d ? "mouseup" : "touchend touchcancel", this._onUp, this);
                  }
                }
              },
              _onMove: function(t) {
                if (this._enabled) {
                  if (t.touches && t.touches.length > 1) {
                    this._moved = true;
                    return;
                  }
                  var n = t.touches && t.touches.length === 1 ? t.touches[0] : t, a = new pt(n.clientX, n.clientY)._subtract(this._startPoint);
                  !a.x && !a.y || Math.abs(a.x) + Math.abs(a.y) < this.options.clickTolerance || (a.x /= this._parentScale.x, a.y /= this._parentScale.y, ae(t), this._moved || (this.fire("dragstart"), this._moved = true, bt(document.body, "leaflet-dragging"), this._lastTarget = t.target || t.srcElement, window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement), bt(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(a), this._moving = true, this._lastEvent = t, this._updatePosition());
                }
              },
              _updatePosition: function() {
                var t = {
                  originalEvent: this._lastEvent
                };
                this.fire("predrag", t), Jt(this._element, this._newPos), this.fire("drag", t);
              },
              _onUp: function() {
                this._enabled && this.finishDrag();
              },
              finishDrag: function(t) {
                Yt(document.body, "leaflet-dragging"), this._lastTarget && (Yt(this._lastTarget, "leaflet-drag-target"), this._lastTarget = null), St(document, "mousemove touchmove", this._onMove, this), St(document, "mouseup touchend touchcancel", this._onUp, this), wr(), yn();
                var n = this._moved && this._moving;
                this._moving = false, pi._dragging = false, n && this.fire("dragend", {
                  noInertia: t,
                  distance: this._newPos.distanceTo(this._startPos)
                });
              }
            });
            function Rs(t, n, a) {
              var d, _ = [
                1,
                4,
                2,
                8
              ], v, P, U, q, X, at, ft, xt;
              for (v = 0, at = t.length; v < at; v++) t[v]._code = fi(t[v], n);
              for (U = 0; U < 4; U++) {
                for (ft = _[U], d = [], v = 0, at = t.length, P = at - 1; v < at; P = v++) q = t[v], X = t[P], q._code & ft ? X._code & ft || (xt = qn(X, q, ft, n, a), xt._code = fi(xt, n), d.push(xt)) : (X._code & ft && (xt = qn(X, q, ft, n, a), xt._code = fi(xt, n), d.push(xt)), d.push(q));
                t = d;
              }
              return t;
            }
            function Fs(t, n) {
              var a, d, _, v, P, U, q, X, at;
              if (!t || t.length === 0) throw new Error("latlngs not passed");
              De(t) || (console.warn("latlngs are not flat! Only the first ring will be used"), t = t[0]);
              var ft = Ct([
                0,
                0
              ]), xt = Ot(t), ye = xt.getNorthWest().distanceTo(xt.getSouthWest()) * xt.getNorthEast().distanceTo(xt.getNorthWest());
              ye < 1700 && (ft = Sr(t));
              var se = t.length, Re = [];
              for (a = 0; a < se; a++) {
                var Ce = Ct(t[a]);
                Re.push(n.project(Ct([
                  Ce.lat - ft.lat,
                  Ce.lng - ft.lng
                ])));
              }
              for (U = q = X = 0, a = 0, d = se - 1; a < se; d = a++) _ = Re[a], v = Re[d], P = _.y * v.x - v.y * _.x, q += (_.x + v.x) * P, X += (_.y + v.y) * P, U += P * 3;
              U === 0 ? at = Re[0] : at = [
                q / U,
                X / U
              ];
              var gi = n.unproject(dt(at));
              return Ct([
                gi.lat + ft.lat,
                gi.lng + ft.lng
              ]);
            }
            function Sr(t) {
              for (var n = 0, a = 0, d = 0, _ = 0; _ < t.length; _++) {
                var v = Ct(t[_]);
                n += v.lat, a += v.lng, d++;
              }
              return Ct([
                n / d,
                a / d
              ]);
            }
            var zs = {
              __proto__: null,
              clipPolygon: Rs,
              polygonCenter: Fs,
              centroid: Sr
            };
            function Ns(t, n) {
              if (!n || !t.length) return t.slice();
              var a = n * n;
              return t = Yi(t, a), t = ro(t, a), t;
            }
            function re(t, n, a) {
              return Math.sqrt(Ji(t, n, a, true));
            }
            function ke(t, n, a) {
              return Ji(t, n, a);
            }
            function ro(t, n) {
              var a = t.length, d = typeof Uint8Array < "u" ? Uint8Array : Array, _ = new d(a);
              _[0] = _[a - 1] = 1, Xe(t, _, n, 0, a - 1);
              var v, P = [];
              for (v = 0; v < a; v++) _[v] && P.push(t[v]);
              return P;
            }
            function Xe(t, n, a, d, _) {
              var v = 0, P, U, q;
              for (U = d + 1; U <= _ - 1; U++) q = Ji(t[U], t[d], t[_], true), q > v && (P = U, v = q);
              v > a && (n[P] = 1, Xe(t, n, a, d, P), Xe(t, n, a, P, _));
            }
            function Yi(t, n) {
              for (var a = [
                t[0]
              ], d = 1, _ = 0, v = t.length; d < v; d++) Xi(t[d], t[_]) > n && (a.push(t[d]), _ = d);
              return _ < v - 1 && a.push(t[v - 1]), a;
            }
            var wn;
            function Se(t, n, a, d, _) {
              var v = d ? wn : fi(t, a), P = fi(n, a), U, q, X;
              for (wn = P; ; ) {
                if (!(v | P)) return [
                  t,
                  n
                ];
                if (v & P) return false;
                U = v || P, q = qn(t, n, U, a, _), X = fi(q, a), U === v ? (t = q, v = X) : (n = q, P = X);
              }
            }
            function qn(t, n, a, d, _) {
              var v = n.x - t.x, P = n.y - t.y, U = d.min, q = d.max, X, at;
              return a & 8 ? (X = t.x + v * (q.y - t.y) / P, at = q.y) : a & 4 ? (X = t.x + v * (U.y - t.y) / P, at = U.y) : a & 2 ? (X = q.x, at = t.y + P * (q.x - t.x) / v) : a & 1 && (X = U.x, at = t.y + P * (U.x - t.x) / v), new pt(X, at, _);
            }
            function fi(t, n) {
              var a = 0;
              return t.x < n.min.x ? a |= 1 : t.x > n.max.x && (a |= 2), t.y < n.min.y ? a |= 4 : t.y > n.max.y && (a |= 8), a;
            }
            function Xi(t, n) {
              var a = n.x - t.x, d = n.y - t.y;
              return a * a + d * d;
            }
            function Ji(t, n, a, d) {
              var _ = n.x, v = n.y, P = a.x - _, U = a.y - v, q = P * P + U * U, X;
              return q > 0 && (X = ((t.x - _) * P + (t.y - v) * U) / q, X > 1 ? (_ = a.x, v = a.y) : X > 0 && (_ += P * X, v += U * X)), P = t.x - _, U = t.y - v, d ? P * P + U * U : new pt(_, v);
            }
            function De(t) {
              return !W(t[0]) || typeof t[0][0] != "object" && typeof t[0][0] < "u";
            }
            function Us(t) {
              return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."), De(t);
            }
            function Gs(t, n) {
              var a, d, _, v, P, U, q, X;
              if (!t || t.length === 0) throw new Error("latlngs not passed");
              De(t) || (console.warn("latlngs are not flat! Only the first ring will be used"), t = t[0]);
              var at = Ct([
                0,
                0
              ]), ft = Ot(t), xt = ft.getNorthWest().distanceTo(ft.getSouthWest()) * ft.getNorthEast().distanceTo(ft.getNorthWest());
              xt < 1700 && (at = Sr(t));
              var ye = t.length, se = [];
              for (a = 0; a < ye; a++) {
                var Re = Ct(t[a]);
                se.push(n.project(Ct([
                  Re.lat - at.lat,
                  Re.lng - at.lng
                ])));
              }
              for (a = 0, d = 0; a < ye - 1; a++) d += se[a].distanceTo(se[a + 1]) / 2;
              if (d === 0) X = se[0];
              else for (a = 0, v = 0; a < ye - 1; a++) if (P = se[a], U = se[a + 1], _ = P.distanceTo(U), v += _, v > d) {
                q = (v - d) / _, X = [
                  U.x - q * (U.x - P.x),
                  U.y - q * (U.y - P.y)
                ];
                break;
              }
              var Ce = n.unproject(dt(X));
              return Ct([
                Ce.lat + at.lat,
                Ce.lng + at.lng
              ]);
            }
            var Vn = {
              __proto__: null,
              simplify: Ns,
              pointToSegmentDistance: re,
              closestPointOnSegment: ke,
              clipSegment: Se,
              _getEdgeIntersection: qn,
              _getBitCode: fi,
              _sqClosestPointOnSegment: Ji,
              isFlat: De,
              _flat: Us,
              polylineCenter: Gs
            }, Hn = {
              project: function(t) {
                return new pt(t.lng, t.lat);
              },
              unproject: function(t) {
                return new Bt(t.y, t.x);
              },
              bounds: new Mt([
                -180,
                -90
              ], [
                180,
                90
              ])
            }, Dr = {
              R: 6378137,
              R_MINOR: 6356752314245179e-9,
              bounds: new Mt([
                -2003750834279e-5,
                -1549657073972e-5
              ], [
                2003750834279e-5,
                1876465623138e-5
              ]),
              project: function(t) {
                var n = Math.PI / 180, a = this.R, d = t.lat * n, _ = this.R_MINOR / a, v = Math.sqrt(1 - _ * _), P = v * Math.sin(d), U = Math.tan(Math.PI / 4 - d / 2) / Math.pow((1 - P) / (1 + P), v / 2);
                return d = -a * Math.log(Math.max(U, 1e-10)), new pt(t.lng * n * a, d);
              },
              unproject: function(t) {
                for (var n = 180 / Math.PI, a = this.R, d = this.R_MINOR / a, _ = Math.sqrt(1 - d * d), v = Math.exp(-t.y / a), P = Math.PI / 2 - 2 * Math.atan(v), U = 0, q = 0.1, X; U < 15 && Math.abs(q) > 1e-7; U++) X = _ * Math.sin(P), X = Math.pow((1 - X) / (1 + X), _ / 2), q = Math.PI / 2 - 2 * Math.atan(v * X) - P, P += q;
                return new Bt(P * n, t.x * n / a);
              }
            }, Zs = {
              __proto__: null,
              LonLat: Hn,
              Mercator: Dr,
              SphericalMercator: ar
            }, so = x({}, We, {
              code: "EPSG:3395",
              projection: Dr,
              transformation: (function() {
                var t = 0.5 / (Math.PI * Dr.R);
                return fn(t, 0.5, -t, 0.5);
              })()
            }), Ir = x({}, We, {
              code: "EPSG:4326",
              projection: Hn,
              transformation: fn(1 / 180, 1, -1 / 180, 0.5)
            }), ao = x({}, Ge, {
              projection: Hn,
              transformation: fn(1, 0, -1, 0),
              scale: function(t) {
                return Math.pow(2, t);
              },
              zoom: function(t) {
                return Math.log(t) / Math.LN2;
              },
              distance: function(t, n) {
                var a = n.lng - t.lng, d = n.lat - t.lat;
                return Math.sqrt(a * a + d * d);
              },
              infinite: true
            });
            Ge.Earth = We, Ge.EPSG3395 = so, Ge.EPSG3857 = ur, Ge.EPSG900913 = ns, Ge.EPSG4326 = Ir, Ge.Simple = ao;
            var we = Ei.extend({
              options: {
                pane: "overlayPane",
                attribution: null,
                bubblingMouseEvents: true
              },
              addTo: function(t) {
                return t.addLayer(this), this;
              },
              remove: function() {
                return this.removeFrom(this._map || this._mapToAdd);
              },
              removeFrom: function(t) {
                return t && t.removeLayer(this), this;
              },
              getPane: function(t) {
                return this._map.getPane(t ? this.options[t] || t : this.options.pane);
              },
              addInteractiveTarget: function(t) {
                return this._map._targets[et(t)] = this, this;
              },
              removeInteractiveTarget: function(t) {
                return delete this._map._targets[et(t)], this;
              },
              getAttribution: function() {
                return this.options.attribution;
              },
              _layerAdd: function(t) {
                var n = t.target;
                if (n.hasLayer(this)) {
                  if (this._map = n, this._zoomAnimated = n._zoomAnimated, this.getEvents) {
                    var a = this.getEvents();
                    n.on(a, this), this.once("remove", function() {
                      n.off(a, this);
                    }, this);
                  }
                  this.onAdd(n), this.fire("add"), n.fire("layeradd", {
                    layer: this
                  });
                }
              }
            });
            kt.include({
              addLayer: function(t) {
                if (!t._layerAdd) throw new Error("The provided object is not a Layer.");
                var n = et(t);
                return this._layers[n] ? this : (this._layers[n] = t, t._mapToAdd = this, t.beforeAdd && t.beforeAdd(this), this.whenReady(t._layerAdd, t), this);
              },
              removeLayer: function(t) {
                var n = et(t);
                return this._layers[n] ? (this._loaded && t.onRemove(this), delete this._layers[n], this._loaded && (this.fire("layerremove", {
                  layer: t
                }), t.fire("remove")), t._map = t._mapToAdd = null, this) : this;
              },
              hasLayer: function(t) {
                return et(t) in this._layers;
              },
              eachLayer: function(t, n) {
                for (var a in this._layers) t.call(n, this._layers[a]);
                return this;
              },
              _addLayers: function(t) {
                t = t ? W(t) ? t : [
                  t
                ] : [];
                for (var n = 0, a = t.length; n < a; n++) this.addLayer(t[n]);
              },
              _addZoomLimit: function(t) {
                (!isNaN(t.options.maxZoom) || !isNaN(t.options.minZoom)) && (this._zoomBoundLayers[et(t)] = t, this._updateZoomLevels());
              },
              _removeZoomLimit: function(t) {
                var n = et(t);
                this._zoomBoundLayers[n] && (delete this._zoomBoundLayers[n], this._updateZoomLevels());
              },
              _updateZoomLevels: function() {
                var t = 1 / 0, n = -1 / 0, a = this._getZoomSpan();
                for (var d in this._zoomBoundLayers) {
                  var _ = this._zoomBoundLayers[d].options;
                  t = _.minZoom === void 0 ? t : Math.min(t, _.minZoom), n = _.maxZoom === void 0 ? n : Math.max(n, _.maxZoom);
                }
                this._layersMaxZoom = n === -1 / 0 ? void 0 : n, this._layersMinZoom = t === 1 / 0 ? void 0 : t, a !== this._getZoomSpan() && this.fire("zoomlevelschange"), this.options.maxZoom === void 0 && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom && this.setZoom(this._layersMaxZoom), this.options.minZoom === void 0 && this._layersMinZoom && this.getZoom() < this._layersMinZoom && this.setZoom(this._layersMinZoom);
              }
            });
            var si = we.extend({
              initialize: function(t, n) {
                gt(this, n), this._layers = {};
                var a, d;
                if (t) for (a = 0, d = t.length; a < d; a++) this.addLayer(t[a]);
              },
              addLayer: function(t) {
                var n = this.getLayerId(t);
                return this._layers[n] = t, this._map && this._map.addLayer(t), this;
              },
              removeLayer: function(t) {
                var n = t in this._layers ? t : this.getLayerId(t);
                return this._map && this._layers[n] && this._map.removeLayer(this._layers[n]), delete this._layers[n], this;
              },
              hasLayer: function(t) {
                var n = typeof t == "number" ? t : this.getLayerId(t);
                return n in this._layers;
              },
              clearLayers: function() {
                return this.eachLayer(this.removeLayer, this);
              },
              invoke: function(t) {
                var n = Array.prototype.slice.call(arguments, 1), a, d;
                for (a in this._layers) d = this._layers[a], d[t] && d[t].apply(d, n);
                return this;
              },
              onAdd: function(t) {
                this.eachLayer(t.addLayer, t);
              },
              onRemove: function(t) {
                this.eachLayer(t.removeLayer, t);
              },
              eachLayer: function(t, n) {
                for (var a in this._layers) t.call(n, this._layers[a]);
                return this;
              },
              getLayer: function(t) {
                return this._layers[t];
              },
              getLayers: function() {
                var t = [];
                return this.eachLayer(t.push, t), t;
              },
              setZIndex: function(t) {
                return this.invoke("setZIndex", t);
              },
              getLayerId: function(t) {
                return et(t);
              }
            }), Wn = function(t, n) {
              return new si(t, n);
            }, Je = si.extend({
              addLayer: function(t) {
                return this.hasLayer(t) ? this : (t.addEventParent(this), si.prototype.addLayer.call(this, t), this.fire("layeradd", {
                  layer: t
                }));
              },
              removeLayer: function(t) {
                return this.hasLayer(t) ? (t in this._layers && (t = this._layers[t]), t.removeEventParent(this), si.prototype.removeLayer.call(this, t), this.fire("layerremove", {
                  layer: t
                })) : this;
              },
              setStyle: function(t) {
                return this.invoke("setStyle", t);
              },
              bringToFront: function() {
                return this.invoke("bringToFront");
              },
              bringToBack: function() {
                return this.invoke("bringToBack");
              },
              getBounds: function() {
                var t = new jt();
                for (var n in this._layers) {
                  var a = this._layers[n];
                  t.extend(a.getBounds ? a.getBounds() : a.getLatLng());
                }
                return t;
              }
            }), oo = function(t, n) {
              return new Je(t, n);
            }, Qi = Ue.extend({
              options: {
                popupAnchor: [
                  0,
                  0
                ],
                tooltipAnchor: [
                  0,
                  0
                ],
                crossOrigin: false
              },
              initialize: function(t) {
                gt(this, t);
              },
              createIcon: function(t) {
                return this._createIcon("icon", t);
              },
              createShadow: function(t) {
                return this._createIcon("shadow", t);
              },
              _createIcon: function(t, n) {
                var a = this._getIconUrl(t);
                if (!a) {
                  if (t === "icon") throw new Error("iconUrl not set in Icon options (see the docs).");
                  return null;
                }
                var d = this._createImg(a, n && n.tagName === "IMG" ? n : null);
                return this._setIconStyles(d, t), (this.options.crossOrigin || this.options.crossOrigin === "") && (d.crossOrigin = this.options.crossOrigin === true ? "" : this.options.crossOrigin), d;
              },
              _setIconStyles: function(t, n) {
                var a = this.options, d = a[n + "Size"];
                typeof d == "number" && (d = [
                  d,
                  d
                ]);
                var _ = dt(d), v = dt(n === "shadow" && a.shadowAnchor || a.iconAnchor || _ && _.divideBy(2, true));
                t.className = "leaflet-marker-" + n + " " + (a.className || ""), v && (t.style.marginLeft = -v.x + "px", t.style.marginTop = -v.y + "px"), _ && (t.style.width = _.x + "px", t.style.height = _.y + "px");
              },
              _createImg: function(t, n) {
                return n = n || document.createElement("img"), n.src = t, n;
              },
              _getIconUrl: function(t) {
                return ct.retina && this.options[t + "RetinaUrl"] || this.options[t + "Url"];
              }
            });
            function uo(t) {
              return new Qi(t);
            }
            var Cn = Qi.extend({
              options: {
                iconUrl: "marker-icon.png",
                iconRetinaUrl: "marker-icon-2x.png",
                shadowUrl: "marker-shadow.png",
                iconSize: [
                  25,
                  41
                ],
                iconAnchor: [
                  12,
                  41
                ],
                popupAnchor: [
                  1,
                  -34
                ],
                tooltipAnchor: [
                  16,
                  -28
                ],
                shadowSize: [
                  41,
                  41
                ]
              },
              _getIconUrl: function(t) {
                return typeof Cn.imagePath != "string" && (Cn.imagePath = this._detectIconPath()), (this.options.imagePath || Cn.imagePath) + Qi.prototype._getIconUrl.call(this, t);
              },
              _stripUrl: function(t) {
                var n = function(a, d, _) {
                  var v = d.exec(a);
                  return v && v[_];
                };
                return t = n(t, /^url\((['"])?(.+)\1\)$/, 2), t && n(t, /^(.*)marker-icon\.png$/, 1);
              },
              _detectIconPath: function() {
                var t = Pt("div", "leaflet-default-icon-path", document.body), n = ci(t, "background-image") || ci(t, "backgroundImage");
                if (document.body.removeChild(t), n = this._stripUrl(n), n) return n;
                var a = document.querySelector('link[href$="leaflet.css"]');
                return a ? a.href.substring(0, a.href.length - 11 - 1) : "";
              }
            }), js = Ye.extend({
              initialize: function(t) {
                this._marker = t;
              },
              addHooks: function() {
                var t = this._marker._icon;
                this._draggable || (this._draggable = new pi(t, t, true)), this._draggable.on({
                  dragstart: this._onDragStart,
                  predrag: this._onPreDrag,
                  drag: this._onDrag,
                  dragend: this._onDragEnd
                }, this).enable(), bt(t, "leaflet-marker-draggable");
              },
              removeHooks: function() {
                this._draggable.off({
                  dragstart: this._onDragStart,
                  predrag: this._onPreDrag,
                  drag: this._onDrag,
                  dragend: this._onDragEnd
                }, this).disable(), this._marker._icon && Yt(this._marker._icon, "leaflet-marker-draggable");
              },
              moved: function() {
                return this._draggable && this._draggable._moved;
              },
              _adjustPan: function(t) {
                var n = this._marker, a = n._map, d = this._marker.options.autoPanSpeed, _ = this._marker.options.autoPanPadding, v = di(n._icon), P = a.getPixelBounds(), U = a.getPixelOrigin(), q = Kt(P.min._subtract(U).add(_), P.max._subtract(U).subtract(_));
                if (!q.contains(v)) {
                  var X = dt((Math.max(q.max.x, v.x) - q.max.x) / (P.max.x - q.max.x) - (Math.min(q.min.x, v.x) - q.min.x) / (P.min.x - q.min.x), (Math.max(q.max.y, v.y) - q.max.y) / (P.max.y - q.max.y) - (Math.min(q.min.y, v.y) - q.min.y) / (P.min.y - q.min.y)).multiplyBy(d);
                  a.panBy(X, {
                    animate: false
                  }), this._draggable._newPos._add(X), this._draggable._startPos._add(X), Jt(n._icon, this._draggable._newPos), this._onDrag(t), this._panRequest = Ut(this._adjustPan.bind(this, t));
                }
              },
              _onDragStart: function() {
                this._oldLatLng = this._marker.getLatLng(), this._marker.closePopup && this._marker.closePopup(), this._marker.fire("movestart").fire("dragstart");
              },
              _onPreDrag: function(t) {
                this._marker.options.autoPan && (ce(this._panRequest), this._panRequest = Ut(this._adjustPan.bind(this, t)));
              },
              _onDrag: function(t) {
                var n = this._marker, a = n._shadow, d = di(n._icon), _ = n._map.layerPointToLatLng(d);
                a && Jt(a, d), n._latlng = _, t.latlng = _, t.oldLatLng = this._oldLatLng, n.fire("move", t).fire("drag", t);
              },
              _onDragEnd: function(t) {
                ce(this._panRequest), delete this._oldLatLng, this._marker.fire("moveend").fire("dragend", t);
              }
            }), Kn = we.extend({
              options: {
                icon: new Cn(),
                interactive: true,
                keyboard: true,
                title: "",
                alt: "Marker",
                zIndexOffset: 0,
                opacity: 1,
                riseOnHover: false,
                riseOffset: 250,
                pane: "markerPane",
                shadowPane: "shadowPane",
                bubblingMouseEvents: false,
                autoPanOnFocus: true,
                draggable: false,
                autoPan: false,
                autoPanPadding: [
                  50,
                  50
                ],
                autoPanSpeed: 10
              },
              initialize: function(t, n) {
                gt(this, n), this._latlng = Ct(t);
              },
              onAdd: function(t) {
                this._zoomAnimated = this._zoomAnimated && t.options.markerZoomAnimation, this._zoomAnimated && t.on("zoomanim", this._animateZoom, this), this._initIcon(), this.update();
              },
              onRemove: function(t) {
                this.dragging && this.dragging.enabled() && (this.options.draggable = true, this.dragging.removeHooks()), delete this.dragging, this._zoomAnimated && t.off("zoomanim", this._animateZoom, this), this._removeIcon(), this._removeShadow();
              },
              getEvents: function() {
                return {
                  zoom: this.update,
                  viewreset: this.update
                };
              },
              getLatLng: function() {
                return this._latlng;
              },
              setLatLng: function(t) {
                var n = this._latlng;
                return this._latlng = Ct(t), this.update(), this.fire("move", {
                  oldLatLng: n,
                  latlng: this._latlng
                });
              },
              setZIndexOffset: function(t) {
                return this.options.zIndexOffset = t, this.update();
              },
              getIcon: function() {
                return this.options.icon;
              },
              setIcon: function(t) {
                return this.options.icon = t, this._map && (this._initIcon(), this.update()), this._popup && this.bindPopup(this._popup, this._popup.options), this;
              },
              getElement: function() {
                return this._icon;
              },
              update: function() {
                if (this._icon && this._map) {
                  var t = this._map.latLngToLayerPoint(this._latlng).round();
                  this._setPos(t);
                }
                return this;
              },
              _initIcon: function() {
                var t = this.options, n = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide"), a = t.icon.createIcon(this._icon), d = false;
                a !== this._icon && (this._icon && this._removeIcon(), d = true, t.title && (a.title = t.title), a.tagName === "IMG" && (a.alt = t.alt || "")), bt(a, n), t.keyboard && (a.tabIndex = "0", a.setAttribute("role", "button")), this._icon = a, t.riseOnHover && this.on({
                  mouseover: this._bringToFront,
                  mouseout: this._resetZIndex
                }), this.options.autoPanOnFocus && vt(a, "focus", this._panOnFocus, this);
                var _ = t.icon.createShadow(this._shadow), v = false;
                _ !== this._shadow && (this._removeShadow(), v = true), _ && (bt(_, n), _.alt = ""), this._shadow = _, t.opacity < 1 && this._updateOpacity(), d && this.getPane().appendChild(this._icon), this._initInteraction(), _ && v && this.getPane(t.shadowPane).appendChild(this._shadow);
              },
              _removeIcon: function() {
                this.options.riseOnHover && this.off({
                  mouseover: this._bringToFront,
                  mouseout: this._resetZIndex
                }), this.options.autoPanOnFocus && St(this._icon, "focus", this._panOnFocus, this), qt(this._icon), this.removeInteractiveTarget(this._icon), this._icon = null;
              },
              _removeShadow: function() {
                this._shadow && qt(this._shadow), this._shadow = null;
              },
              _setPos: function(t) {
                this._icon && Jt(this._icon, t), this._shadow && Jt(this._shadow, t), this._zIndex = t.y + this.options.zIndexOffset, this._resetZIndex();
              },
              _updateZIndex: function(t) {
                this._icon && (this._icon.style.zIndex = this._zIndex + t);
              },
              _animateZoom: function(t) {
                var n = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center).round();
                this._setPos(n);
              },
              _initInteraction: function() {
                if (this.options.interactive && (bt(this._icon, "leaflet-interactive"), this.addInteractiveTarget(this._icon), js)) {
                  var t = this.options.draggable;
                  this.dragging && (t = this.dragging.enabled(), this.dragging.disable()), this.dragging = new js(this), t && this.dragging.enable();
                }
              },
              setOpacity: function(t) {
                return this.options.opacity = t, this._map && this._updateOpacity(), this;
              },
              _updateOpacity: function() {
                var t = this.options.opacity;
                this._icon && Te(this._icon, t), this._shadow && Te(this._shadow, t);
              },
              _bringToFront: function() {
                this._updateZIndex(this.options.riseOffset);
              },
              _resetZIndex: function() {
                this._updateZIndex(0);
              },
              _panOnFocus: function() {
                var t = this._map;
                if (t) {
                  var n = this.options.icon.options, a = n.iconSize ? dt(n.iconSize) : dt(0, 0), d = n.iconAnchor ? dt(n.iconAnchor) : dt(0, 0);
                  t.panInside(this._latlng, {
                    paddingTopLeft: d,
                    paddingBottomRight: a.subtract(d)
                  });
                }
              },
              _getPopupAnchor: function() {
                return this.options.icon.options.popupAnchor;
              },
              _getTooltipAnchor: function() {
                return this.options.icon.options.tooltipAnchor;
              }
            });
            function qs(t, n) {
              return new Kn(t, n);
            }
            var Ie = we.extend({
              options: {
                stroke: true,
                color: "#3388ff",
                weight: 3,
                opacity: 1,
                lineCap: "round",
                lineJoin: "round",
                dashArray: null,
                dashOffset: null,
                fill: false,
                fillColor: null,
                fillOpacity: 0.2,
                fillRule: "evenodd",
                interactive: true,
                bubblingMouseEvents: true
              },
              beforeAdd: function(t) {
                this._renderer = t.getRenderer(this);
              },
              onAdd: function() {
                this._renderer._initPath(this), this._reset(), this._renderer._addPath(this);
              },
              onRemove: function() {
                this._renderer._removePath(this);
              },
              redraw: function() {
                return this._map && this._renderer._updatePath(this), this;
              },
              setStyle: function(t) {
                return gt(this, t), this._renderer && (this._renderer._updateStyle(this), this.options.stroke && t && Object.prototype.hasOwnProperty.call(t, "weight") && this._updateBounds()), this;
              },
              bringToFront: function() {
                return this._renderer && this._renderer._bringToFront(this), this;
              },
              bringToBack: function() {
                return this._renderer && this._renderer._bringToBack(this), this;
              },
              getElement: function() {
                return this._path;
              },
              _reset: function() {
                this._project(), this._update();
              },
              _clickTolerance: function() {
                return (this.options.stroke ? this.options.weight / 2 : 0) + (this._renderer.options.tolerance || 0);
              }
            }), Yn = Ie.extend({
              options: {
                fill: true,
                radius: 10
              },
              initialize: function(t, n) {
                gt(this, n), this._latlng = Ct(t), this._radius = this.options.radius;
              },
              setLatLng: function(t) {
                var n = this._latlng;
                return this._latlng = Ct(t), this.redraw(), this.fire("move", {
                  oldLatLng: n,
                  latlng: this._latlng
                });
              },
              getLatLng: function() {
                return this._latlng;
              },
              setRadius: function(t) {
                return this.options.radius = this._radius = t, this.redraw();
              },
              getRadius: function() {
                return this._radius;
              },
              setStyle: function(t) {
                var n = t && t.radius || this._radius;
                return Ie.prototype.setStyle.call(this, t), this.setRadius(n), this;
              },
              _project: function() {
                this._point = this._map.latLngToLayerPoint(this._latlng), this._updateBounds();
              },
              _updateBounds: function() {
                var t = this._radius, n = this._radiusY || t, a = this._clickTolerance(), d = [
                  t + a,
                  n + a
                ];
                this._pxBounds = new Mt(this._point.subtract(d), this._point.add(d));
              },
              _update: function() {
                this._map && this._updatePath();
              },
              _updatePath: function() {
                this._renderer._updateCircle(this);
              },
              _empty: function() {
                return this._radius && !this._renderer._bounds.intersects(this._pxBounds);
              },
              _containsPoint: function(t) {
                return t.distanceTo(this._point) <= this._radius + this._clickTolerance();
              }
            });
            function Or(t, n) {
              return new Yn(t, n);
            }
            var $i = Yn.extend({
              initialize: function(t, n, a) {
                if (typeof n == "number" && (n = x({}, a, {
                  radius: n
                })), gt(this, n), this._latlng = Ct(t), isNaN(this.options.radius)) throw new Error("Circle radius cannot be NaN");
                this._mRadius = this.options.radius;
              },
              setRadius: function(t) {
                return this._mRadius = t, this.redraw();
              },
              getRadius: function() {
                return this._mRadius;
              },
              getBounds: function() {
                var t = [
                  this._radius,
                  this._radiusY || this._radius
                ];
                return new jt(this._map.layerPointToLatLng(this._point.subtract(t)), this._map.layerPointToLatLng(this._point.add(t)));
              },
              setStyle: Ie.prototype.setStyle,
              _project: function() {
                var t = this._latlng.lng, n = this._latlng.lat, a = this._map, d = a.options.crs;
                if (d.distance === We.distance) {
                  var _ = Math.PI / 180, v = this._mRadius / We.R / _, P = a.project([
                    n + v,
                    t
                  ]), U = a.project([
                    n - v,
                    t
                  ]), q = P.add(U).divideBy(2), X = a.unproject(q).lat, at = Math.acos((Math.cos(v * _) - Math.sin(n * _) * Math.sin(X * _)) / (Math.cos(n * _) * Math.cos(X * _))) / _;
                  (isNaN(at) || at === 0) && (at = v / Math.cos(Math.PI / 180 * n)), this._point = q.subtract(a.getPixelOrigin()), this._radius = isNaN(at) ? 0 : q.x - a.project([
                    X,
                    t - at
                  ]).x, this._radiusY = q.y - P.y;
                } else {
                  var ft = d.unproject(d.project(this._latlng).subtract([
                    this._mRadius,
                    0
                  ]));
                  this._point = a.latLngToLayerPoint(this._latlng), this._radius = this._point.x - a.latLngToLayerPoint(ft).x;
                }
                this._updateBounds();
              }
            });
            function lo(t, n, a) {
              return new $i(t, n, a);
            }
            var ai = Ie.extend({
              options: {
                smoothFactor: 1,
                noClip: false
              },
              initialize: function(t, n) {
                gt(this, n), this._setLatLngs(t);
              },
              getLatLngs: function() {
                return this._latlngs;
              },
              setLatLngs: function(t) {
                return this._setLatLngs(t), this.redraw();
              },
              isEmpty: function() {
                return !this._latlngs.length;
              },
              closestLayerPoint: function(t) {
                for (var n = 1 / 0, a = null, d = Ji, _, v, P = 0, U = this._parts.length; P < U; P++) for (var q = this._parts[P], X = 1, at = q.length; X < at; X++) {
                  _ = q[X - 1], v = q[X];
                  var ft = d(t, _, v, true);
                  ft < n && (n = ft, a = d(t, _, v));
                }
                return a && (a.distance = Math.sqrt(n)), a;
              },
              getCenter: function() {
                if (!this._map) throw new Error("Must add layer to map before using getCenter()");
                return Gs(this._defaultShape(), this._map.options.crs);
              },
              getBounds: function() {
                return this._bounds;
              },
              addLatLng: function(t, n) {
                return n = n || this._defaultShape(), t = Ct(t), n.push(t), this._bounds.extend(t), this.redraw();
              },
              _setLatLngs: function(t) {
                this._bounds = new jt(), this._latlngs = this._convertLatLngs(t);
              },
              _defaultShape: function() {
                return De(this._latlngs) ? this._latlngs : this._latlngs[0];
              },
              _convertLatLngs: function(t) {
                for (var n = [], a = De(t), d = 0, _ = t.length; d < _; d++) a ? (n[d] = Ct(t[d]), this._bounds.extend(n[d])) : n[d] = this._convertLatLngs(t[d]);
                return n;
              },
              _project: function() {
                var t = new Mt();
                this._rings = [], this._projectLatlngs(this._latlngs, this._rings, t), this._bounds.isValid() && t.isValid() && (this._rawPxBounds = t, this._updateBounds());
              },
              _updateBounds: function() {
                var t = this._clickTolerance(), n = new pt(t, t);
                this._rawPxBounds && (this._pxBounds = new Mt([
                  this._rawPxBounds.min.subtract(n),
                  this._rawPxBounds.max.add(n)
                ]));
              },
              _projectLatlngs: function(t, n, a) {
                var d = t[0] instanceof Bt, _ = t.length, v, P;
                if (d) {
                  for (P = [], v = 0; v < _; v++) P[v] = this._map.latLngToLayerPoint(t[v]), a.extend(P[v]);
                  n.push(P);
                } else for (v = 0; v < _; v++) this._projectLatlngs(t[v], n, a);
              },
              _clipPoints: function() {
                var t = this._renderer._bounds;
                if (this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(t))) {
                  if (this.options.noClip) {
                    this._parts = this._rings;
                    return;
                  }
                  var n = this._parts, a, d, _, v, P, U, q;
                  for (a = 0, _ = 0, v = this._rings.length; a < v; a++) for (q = this._rings[a], d = 0, P = q.length; d < P - 1; d++) U = Se(q[d], q[d + 1], t, d, true), U && (n[_] = n[_] || [], n[_].push(U[0]), (U[1] !== q[d + 1] || d === P - 2) && (n[_].push(U[1]), _++));
                }
              },
              _simplifyPoints: function() {
                for (var t = this._parts, n = this.options.smoothFactor, a = 0, d = t.length; a < d; a++) t[a] = Ns(t[a], n);
              },
              _update: function() {
                this._map && (this._clipPoints(), this._simplifyPoints(), this._updatePath());
              },
              _updatePath: function() {
                this._renderer._updatePoly(this);
              },
              _containsPoint: function(t, n) {
                var a, d, _, v, P, U, q = this._clickTolerance();
                if (!this._pxBounds || !this._pxBounds.contains(t)) return false;
                for (a = 0, v = this._parts.length; a < v; a++) for (U = this._parts[a], d = 0, P = U.length, _ = P - 1; d < P; _ = d++) if (!(!n && d === 0) && re(t, U[_], U[d]) <= q) return true;
                return false;
              }
            });
            function Rr(t, n) {
              return new ai(t, n);
            }
            ai._flat = Us;
            var me = ai.extend({
              options: {
                fill: true
              },
              isEmpty: function() {
                return !this._latlngs.length || !this._latlngs[0].length;
              },
              getCenter: function() {
                if (!this._map) throw new Error("Must add layer to map before using getCenter()");
                return Fs(this._defaultShape(), this._map.options.crs);
              },
              _convertLatLngs: function(t) {
                var n = ai.prototype._convertLatLngs.call(this, t), a = n.length;
                return a >= 2 && n[0] instanceof Bt && n[0].equals(n[a - 1]) && n.pop(), n;
              },
              _setLatLngs: function(t) {
                ai.prototype._setLatLngs.call(this, t), De(this._latlngs) && (this._latlngs = [
                  this._latlngs
                ]);
              },
              _defaultShape: function() {
                return De(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
              },
              _clipPoints: function() {
                var t = this._renderer._bounds, n = this.options.weight, a = new pt(n, n);
                if (t = new Mt(t.min.subtract(a), t.max.add(a)), this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(t))) {
                  if (this.options.noClip) {
                    this._parts = this._rings;
                    return;
                  }
                  for (var d = 0, _ = this._rings.length, v; d < _; d++) v = Rs(this._rings[d], t, true), v.length && this._parts.push(v);
                }
              },
              _updatePath: function() {
                this._renderer._updatePoly(this, true);
              },
              _containsPoint: function(t) {
                var n = false, a, d, _, v, P, U, q, X;
                if (!this._pxBounds || !this._pxBounds.contains(t)) return false;
                for (v = 0, q = this._parts.length; v < q; v++) for (a = this._parts[v], P = 0, X = a.length, U = X - 1; P < X; U = P++) d = a[P], _ = a[U], d.y > t.y != _.y > t.y && t.x < (_.x - d.x) * (t.y - d.y) / (_.y - d.y) + d.x && (n = !n);
                return n || ai.prototype._containsPoint.call(this, t, true);
              }
            });
            function Fr(t, n) {
              return new me(t, n);
            }
            var oi = Je.extend({
              initialize: function(t, n) {
                gt(this, n), this._layers = {}, t && this.addData(t);
              },
              addData: function(t) {
                var n = W(t) ? t : t.features, a, d, _;
                if (n) {
                  for (a = 0, d = n.length; a < d; a++) _ = n[a], (_.geometries || _.geometry || _.features || _.coordinates) && this.addData(_);
                  return this;
                }
                var v = this.options;
                if (v.filter && !v.filter(t)) return this;
                var P = xn(t, v);
                return P ? (P.feature = Xn(t), P.defaultOptions = P.options, this.resetStyle(P), v.onEachFeature && v.onEachFeature(t, P), this.addLayer(P)) : this;
              },
              resetStyle: function(t) {
                return t === void 0 ? this.eachLayer(this.resetStyle, this) : (t.options = x({}, t.defaultOptions), this._setLayerStyle(t, this.options.style), this);
              },
              setStyle: function(t) {
                return this.eachLayer(function(n) {
                  this._setLayerStyle(n, t);
                }, this);
              },
              _setLayerStyle: function(t, n) {
                t.setStyle && (typeof n == "function" && (n = n(t.feature)), t.setStyle(n));
              }
            });
            function xn(t, n) {
              var a = t.type === "Feature" ? t.geometry : t, d = a ? a.coordinates : null, _ = [], v = n && n.pointToLayer, P = n && n.coordsToLatLng || zr, U, q, X, at;
              if (!d && !a) return null;
              switch (a.type) {
                case "Point":
                  return U = P(d), Vs(v, t, U, n);
                case "MultiPoint":
                  for (X = 0, at = d.length; X < at; X++) U = P(d[X]), _.push(Vs(v, t, U, n));
                  return new Je(_);
                case "LineString":
                case "MultiLineString":
                  return q = Ae(d, a.type === "LineString" ? 0 : 1, P), new ai(q, n);
                case "Polygon":
                case "MultiPolygon":
                  return q = Ae(d, a.type === "Polygon" ? 1 : 2, P), new me(q, n);
                case "GeometryCollection":
                  for (X = 0, at = a.geometries.length; X < at; X++) {
                    var ft = xn({
                      geometry: a.geometries[X],
                      type: "Feature",
                      properties: t.properties
                    }, n);
                    ft && _.push(ft);
                  }
                  return new Je(_);
                case "FeatureCollection":
                  for (X = 0, at = a.features.length; X < at; X++) {
                    var xt = xn(a.features[X], n);
                    xt && _.push(xt);
                  }
                  return new Je(_);
                default:
                  throw new Error("Invalid GeoJSON object.");
              }
            }
            function Vs(t, n, a, d) {
              return t ? t(n, a) : new Kn(a, d && d.markersInheritOptions && d);
            }
            function zr(t) {
              return new Bt(t[1], t[0], t[2]);
            }
            function Ae(t, n, a) {
              for (var d = [], _ = 0, v = t.length, P; _ < v; _++) P = n ? Ae(t[_], n - 1, a) : (a || zr)(t[_]), d.push(P);
              return d;
            }
            function ui(t, n) {
              return t = Ct(t), t.alt !== void 0 ? [
                Nt(t.lng, n),
                Nt(t.lat, n),
                Nt(t.alt, n)
              ] : [
                Nt(t.lng, n),
                Nt(t.lat, n)
              ];
            }
            function Pi(t, n, a, d) {
              for (var _ = [], v = 0, P = t.length; v < P; v++) _.push(n ? Pi(t[v], De(t[v]) ? 0 : n - 1, a, d) : ui(t[v], d));
              return !n && a && _.length > 0 && _.push(_[0].slice()), _;
            }
            function Ti(t, n) {
              return t.feature ? x({}, t.feature, {
                geometry: n
              }) : Xn(n);
            }
            function Xn(t) {
              return t.type === "Feature" || t.type === "FeatureCollection" ? t : {
                type: "Feature",
                properties: {},
                geometry: t
              };
            }
            var Nr = {
              toGeoJSON: function(t) {
                return Ti(this, {
                  type: "Point",
                  coordinates: ui(this.getLatLng(), t)
                });
              }
            };
            Kn.include(Nr), $i.include(Nr), Yn.include(Nr), ai.include({
              toGeoJSON: function(t) {
                var n = !De(this._latlngs), a = Pi(this._latlngs, n ? 1 : 0, false, t);
                return Ti(this, {
                  type: (n ? "Multi" : "") + "LineString",
                  coordinates: a
                });
              }
            }), me.include({
              toGeoJSON: function(t) {
                var n = !De(this._latlngs), a = n && !De(this._latlngs[0]), d = Pi(this._latlngs, a ? 2 : n ? 1 : 0, true, t);
                return n || (d = [
                  d
                ]), Ti(this, {
                  type: (a ? "Multi" : "") + "Polygon",
                  coordinates: d
                });
              }
            }), si.include({
              toMultiPoint: function(t) {
                var n = [];
                return this.eachLayer(function(a) {
                  n.push(a.toGeoJSON(t).geometry.coordinates);
                }), Ti(this, {
                  type: "MultiPoint",
                  coordinates: n
                });
              },
              toGeoJSON: function(t) {
                var n = this.feature && this.feature.geometry && this.feature.geometry.type;
                if (n === "MultiPoint") return this.toMultiPoint(t);
                var a = n === "GeometryCollection", d = [];
                return this.eachLayer(function(_) {
                  if (_.toGeoJSON) {
                    var v = _.toGeoJSON(t);
                    if (a) d.push(v.geometry);
                    else {
                      var P = Xn(v);
                      P.type === "FeatureCollection" ? d.push.apply(d, P.features) : d.push(P);
                    }
                  }
                }), a ? Ti(this, {
                  geometries: d,
                  type: "GeometryCollection"
                }) : {
                  type: "FeatureCollection",
                  features: d
                };
              }
            });
            function Hs(t, n) {
              return new oi(t, n);
            }
            var ho = Hs, tn = we.extend({
              options: {
                opacity: 1,
                alt: "",
                interactive: false,
                crossOrigin: false,
                errorOverlayUrl: "",
                zIndex: 1,
                className: ""
              },
              initialize: function(t, n, a) {
                this._url = t, this._bounds = Ot(n), gt(this, a);
              },
              onAdd: function() {
                this._image || (this._initImage(), this.options.opacity < 1 && this._updateOpacity()), this.options.interactive && (bt(this._image, "leaflet-interactive"), this.addInteractiveTarget(this._image)), this.getPane().appendChild(this._image), this._reset();
              },
              onRemove: function() {
                qt(this._image), this.options.interactive && this.removeInteractiveTarget(this._image);
              },
              setOpacity: function(t) {
                return this.options.opacity = t, this._image && this._updateOpacity(), this;
              },
              setStyle: function(t) {
                return t.opacity && this.setOpacity(t.opacity), this;
              },
              bringToFront: function() {
                return this._map && qi(this._image), this;
              },
              bringToBack: function() {
                return this._map && Vi(this._image), this;
              },
              setUrl: function(t) {
                return this._url = t, this._image && (this._image.src = t), this;
              },
              setBounds: function(t) {
                return this._bounds = Ot(t), this._map && this._reset(), this;
              },
              getEvents: function() {
                var t = {
                  zoom: this._reset,
                  viewreset: this._reset
                };
                return this._zoomAnimated && (t.zoomanim = this._animateZoom), t;
              },
              setZIndex: function(t) {
                return this.options.zIndex = t, this._updateZIndex(), this;
              },
              getBounds: function() {
                return this._bounds;
              },
              getElement: function() {
                return this._image;
              },
              _initImage: function() {
                var t = this._url.tagName === "IMG", n = this._image = t ? this._url : Pt("img");
                if (bt(n, "leaflet-image-layer"), this._zoomAnimated && bt(n, "leaflet-zoom-animated"), this.options.className && bt(n, this.options.className), n.onselectstart = ht, n.onmousemove = ht, n.onload = M(this.fire, this, "load"), n.onerror = M(this._overlayOnError, this, "error"), (this.options.crossOrigin || this.options.crossOrigin === "") && (n.crossOrigin = this.options.crossOrigin === true ? "" : this.options.crossOrigin), this.options.zIndex && this._updateZIndex(), t) {
                  this._url = n.src;
                  return;
                }
                n.src = this._url, n.alt = this.options.alt;
              },
              _animateZoom: function(t) {
                var n = this._map.getZoomScale(t.zoom), a = this._map._latLngBoundsToNewLayerBounds(this._bounds, t.zoom, t.center).min;
                ki(this._image, a, n);
              },
              _reset: function() {
                var t = this._image, n = new Mt(this._map.latLngToLayerPoint(this._bounds.getNorthWest()), this._map.latLngToLayerPoint(this._bounds.getSouthEast())), a = n.getSize();
                Jt(t, n.min), t.style.width = a.x + "px", t.style.height = a.y + "px";
              },
              _updateOpacity: function() {
                Te(this._image, this.options.opacity);
              },
              _updateZIndex: function() {
                this._image && this.options.zIndex !== void 0 && this.options.zIndex !== null && (this._image.style.zIndex = this.options.zIndex);
              },
              _overlayOnError: function() {
                this.fire("error");
                var t = this.options.errorOverlayUrl;
                t && this._url !== t && (this._url = t, this._image.src = t);
              },
              getCenter: function() {
                return this._bounds.getCenter();
              }
            }), co = function(t, n, a) {
              return new tn(t, n, a);
            }, Ws = tn.extend({
              options: {
                autoplay: true,
                loop: true,
                keepAspectRatio: true,
                muted: false,
                playsInline: true
              },
              _initImage: function() {
                var t = this._url.tagName === "VIDEO", n = this._image = t ? this._url : Pt("video");
                if (bt(n, "leaflet-image-layer"), this._zoomAnimated && bt(n, "leaflet-zoom-animated"), this.options.className && bt(n, this.options.className), n.onselectstart = ht, n.onmousemove = ht, n.onloadeddata = M(this.fire, this, "load"), t) {
                  for (var a = n.getElementsByTagName("source"), d = [], _ = 0; _ < a.length; _++) d.push(a[_].src);
                  this._url = a.length > 0 ? d : [
                    n.src
                  ];
                  return;
                }
                W(this._url) || (this._url = [
                  this._url
                ]), !this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(n.style, "objectFit") && (n.style.objectFit = "fill"), n.autoplay = !!this.options.autoplay, n.loop = !!this.options.loop, n.muted = !!this.options.muted, n.playsInline = !!this.options.playsInline;
                for (var v = 0; v < this._url.length; v++) {
                  var P = Pt("source");
                  P.src = this._url[v], n.appendChild(P);
                }
              }
            });
            function po(t, n, a) {
              return new Ws(t, n, a);
            }
            var Ur = tn.extend({
              _initImage: function() {
                var t = this._image = this._url;
                bt(t, "leaflet-image-layer"), this._zoomAnimated && bt(t, "leaflet-zoom-animated"), this.options.className && bt(t, this.options.className), t.onselectstart = ht, t.onmousemove = ht;
              }
            });
            function fo(t, n, a) {
              return new Ur(t, n, a);
            }
            var Qe = we.extend({
              options: {
                interactive: false,
                offset: [
                  0,
                  0
                ],
                className: "",
                pane: void 0,
                content: ""
              },
              initialize: function(t, n) {
                t && (t instanceof Bt || W(t)) ? (this._latlng = Ct(t), gt(this, n)) : (gt(this, t), this._source = n), this.options.content && (this._content = this.options.content);
              },
              openOn: function(t) {
                return t = arguments.length ? t : this._source._map, t.hasLayer(this) || t.addLayer(this), this;
              },
              close: function() {
                return this._map && this._map.removeLayer(this), this;
              },
              toggle: function(t) {
                return this._map ? this.close() : (arguments.length ? this._source = t : t = this._source, this._prepareOpen(), this.openOn(t._map)), this;
              },
              onAdd: function(t) {
                this._zoomAnimated = t._zoomAnimated, this._container || this._initLayout(), t._fadeAnimated && Te(this._container, 0), clearTimeout(this._removeTimeout), this.getPane().appendChild(this._container), this.update(), t._fadeAnimated && Te(this._container, 1), this.bringToFront(), this.options.interactive && (bt(this._container, "leaflet-interactive"), this.addInteractiveTarget(this._container));
              },
              onRemove: function(t) {
                t._fadeAnimated ? (Te(this._container, 0), this._removeTimeout = setTimeout(M(qt, void 0, this._container), 200)) : qt(this._container), this.options.interactive && (Yt(this._container, "leaflet-interactive"), this.removeInteractiveTarget(this._container));
              },
              getLatLng: function() {
                return this._latlng;
              },
              setLatLng: function(t) {
                return this._latlng = Ct(t), this._map && (this._updatePosition(), this._adjustPan()), this;
              },
              getContent: function() {
                return this._content;
              },
              setContent: function(t) {
                return this._content = t, this.update(), this;
              },
              getElement: function() {
                return this._container;
              },
              update: function() {
                this._map && (this._container.style.visibility = "hidden", this._updateContent(), this._updateLayout(), this._updatePosition(), this._container.style.visibility = "", this._adjustPan());
              },
              getEvents: function() {
                var t = {
                  zoom: this._updatePosition,
                  viewreset: this._updatePosition
                };
                return this._zoomAnimated && (t.zoomanim = this._animateZoom), t;
              },
              isOpen: function() {
                return !!this._map && this._map.hasLayer(this);
              },
              bringToFront: function() {
                return this._map && qi(this._container), this;
              },
              bringToBack: function() {
                return this._map && Vi(this._container), this;
              },
              _prepareOpen: function(t) {
                var n = this._source;
                if (!n._map) return false;
                if (n instanceof Je) {
                  n = null;
                  var a = this._source._layers;
                  for (var d in a) if (a[d]._map) {
                    n = a[d];
                    break;
                  }
                  if (!n) return false;
                  this._source = n;
                }
                if (!t) if (n.getCenter) t = n.getCenter();
                else if (n.getLatLng) t = n.getLatLng();
                else if (n.getBounds) t = n.getBounds().getCenter();
                else throw new Error("Unable to get source layer LatLng.");
                return this.setLatLng(t), this._map && this.update(), true;
              },
              _updateContent: function() {
                if (this._content) {
                  var t = this._contentNode, n = typeof this._content == "function" ? this._content(this._source || this) : this._content;
                  if (typeof n == "string") t.innerHTML = n;
                  else {
                    for (; t.hasChildNodes(); ) t.removeChild(t.firstChild);
                    t.appendChild(n);
                  }
                  this.fire("contentupdate");
                }
              },
              _updatePosition: function() {
                if (this._map) {
                  var t = this._map.latLngToLayerPoint(this._latlng), n = dt(this.options.offset), a = this._getAnchor();
                  this._zoomAnimated ? Jt(this._container, t.add(a)) : n = n.add(t).add(a);
                  var d = this._containerBottom = -n.y, _ = this._containerLeft = -Math.round(this._containerWidth / 2) + n.x;
                  this._container.style.bottom = d + "px", this._container.style.left = _ + "px";
                }
              },
              _getAnchor: function() {
                return [
                  0,
                  0
                ];
              }
            });
            kt.include({
              _initOverlay: function(t, n, a, d) {
                var _ = n;
                return _ instanceof t || (_ = new t(d).setContent(n)), a && _.setLatLng(a), _;
              }
            }), we.include({
              _initOverlay: function(t, n, a, d) {
                var _ = a;
                return _ instanceof t ? (gt(_, d), _._source = this) : (_ = n && !d ? n : new t(d, this), _.setContent(a)), _;
              }
            });
            var En = Qe.extend({
              options: {
                pane: "popupPane",
                offset: [
                  0,
                  7
                ],
                maxWidth: 300,
                minWidth: 50,
                maxHeight: null,
                autoPan: true,
                autoPanPaddingTopLeft: null,
                autoPanPaddingBottomRight: null,
                autoPanPadding: [
                  5,
                  5
                ],
                keepInView: false,
                closeButton: true,
                autoClose: true,
                closeOnEscapeKey: true,
                className: ""
              },
              openOn: function(t) {
                return t = arguments.length ? t : this._source._map, !t.hasLayer(this) && t._popup && t._popup.options.autoClose && t.removeLayer(t._popup), t._popup = this, Qe.prototype.openOn.call(this, t);
              },
              onAdd: function(t) {
                Qe.prototype.onAdd.call(this, t), t.fire("popupopen", {
                  popup: this
                }), this._source && (this._source.fire("popupopen", {
                  popup: this
                }, true), this._source instanceof Ie || this._source.on("preclick", Ai));
              },
              onRemove: function(t) {
                Qe.prototype.onRemove.call(this, t), t.fire("popupclose", {
                  popup: this
                }), this._source && (this._source.fire("popupclose", {
                  popup: this
                }, true), this._source instanceof Ie || this._source.off("preclick", Ai));
              },
              getEvents: function() {
                var t = Qe.prototype.getEvents.call(this);
                return (this.options.closeOnClick !== void 0 ? this.options.closeOnClick : this._map.options.closePopupOnClick) && (t.preclick = this.close), this.options.keepInView && (t.moveend = this._adjustPan), t;
              },
              _initLayout: function() {
                var t = "leaflet-popup", n = this._container = Pt("div", t + " " + (this.options.className || "") + " leaflet-zoom-animated"), a = this._wrapper = Pt("div", t + "-content-wrapper", n);
                if (this._contentNode = Pt("div", t + "-content", a), Ln(n), Br(this._contentNode), vt(n, "contextmenu", Ai), this._tipContainer = Pt("div", t + "-tip-container", n), this._tip = Pt("div", t + "-tip", this._tipContainer), this.options.closeButton) {
                  var d = this._closeButton = Pt("a", t + "-close-button", n);
                  d.setAttribute("role", "button"), d.setAttribute("aria-label", "Close popup"), d.href = "#close", d.innerHTML = '<span aria-hidden="true">&#215;</span>', vt(d, "click", function(_) {
                    ae(_), this.close();
                  }, this);
                }
              },
              _updateLayout: function() {
                var t = this._contentNode, n = t.style;
                n.width = "", n.whiteSpace = "nowrap";
                var a = t.offsetWidth;
                a = Math.min(a, this.options.maxWidth), a = Math.max(a, this.options.minWidth), n.width = a + 1 + "px", n.whiteSpace = "", n.height = "";
                var d = t.offsetHeight, _ = this.options.maxHeight, v = "leaflet-popup-scrolled";
                _ && d > _ ? (n.height = _ + "px", bt(t, v)) : Yt(t, v), this._containerWidth = this._container.offsetWidth;
              },
              _animateZoom: function(t) {
                var n = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center), a = this._getAnchor();
                Jt(this._container, n.add(a));
              },
              _adjustPan: function() {
                if (this.options.autoPan) {
                  if (this._map._panAnim && this._map._panAnim.stop(), this._autopanning) {
                    this._autopanning = false;
                    return;
                  }
                  var t = this._map, n = parseInt(ci(this._container, "marginBottom"), 10) || 0, a = this._container.offsetHeight + n, d = this._containerWidth, _ = new pt(this._containerLeft, -a - this._containerBottom);
                  _._add(di(this._container));
                  var v = t.layerPointToContainerPoint(_), P = dt(this.options.autoPanPadding), U = dt(this.options.autoPanPaddingTopLeft || P), q = dt(this.options.autoPanPaddingBottomRight || P), X = t.getSize(), at = 0, ft = 0;
                  v.x + d + q.x > X.x && (at = v.x + d - X.x + q.x), v.x - at - U.x < 0 && (at = v.x - U.x), v.y + a + q.y > X.y && (ft = v.y + a - X.y + q.y), v.y - ft - U.y < 0 && (ft = v.y - U.y), (at || ft) && (this.options.keepInView && (this._autopanning = true), t.fire("autopanstart").panBy([
                    at,
                    ft
                  ]));
                }
              },
              _getAnchor: function() {
                return dt(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [
                  0,
                  0
                ]);
              }
            }), _o = function(t, n) {
              return new En(t, n);
            };
            kt.mergeOptions({
              closePopupOnClick: true
            }), kt.include({
              openPopup: function(t, n, a) {
                return this._initOverlay(En, t, n, a).openOn(this), this;
              },
              closePopup: function(t) {
                return t = arguments.length ? t : this._popup, t && t.close(), this;
              }
            }), we.include({
              bindPopup: function(t, n) {
                return this._popup = this._initOverlay(En, this._popup, t, n), this._popupHandlersAdded || (this.on({
                  click: this._openPopup,
                  keypress: this._onKeyPress,
                  remove: this.closePopup,
                  move: this._movePopup
                }), this._popupHandlersAdded = true), this;
              },
              unbindPopup: function() {
                return this._popup && (this.off({
                  click: this._openPopup,
                  keypress: this._onKeyPress,
                  remove: this.closePopup,
                  move: this._movePopup
                }), this._popupHandlersAdded = false, this._popup = null), this;
              },
              openPopup: function(t) {
                return this._popup && (this instanceof Je || (this._popup._source = this), this._popup._prepareOpen(t || this._latlng) && this._popup.openOn(this._map)), this;
              },
              closePopup: function() {
                return this._popup && this._popup.close(), this;
              },
              togglePopup: function() {
                return this._popup && this._popup.toggle(this), this;
              },
              isPopupOpen: function() {
                return this._popup ? this._popup.isOpen() : false;
              },
              setPopupContent: function(t) {
                return this._popup && this._popup.setContent(t), this;
              },
              getPopup: function() {
                return this._popup;
              },
              _openPopup: function(t) {
                if (!(!this._popup || !this._map)) {
                  Bi(t);
                  var n = t.layer || t.target;
                  if (this._popup._source === n && !(n instanceof Ie)) {
                    this._map.hasLayer(this._popup) ? this.closePopup() : this.openPopup(t.latlng);
                    return;
                  }
                  this._popup._source = n, this.openPopup(t.latlng);
                }
              },
              _movePopup: function(t) {
                this._popup.setLatLng(t.latlng);
              },
              _onKeyPress: function(t) {
                t.originalEvent.keyCode === 13 && this._openPopup(t);
              }
            });
            var Jn = Qe.extend({
              options: {
                pane: "tooltipPane",
                offset: [
                  0,
                  0
                ],
                direction: "auto",
                permanent: false,
                sticky: false,
                opacity: 0.9
              },
              onAdd: function(t) {
                Qe.prototype.onAdd.call(this, t), this.setOpacity(this.options.opacity), t.fire("tooltipopen", {
                  tooltip: this
                }), this._source && (this.addEventParent(this._source), this._source.fire("tooltipopen", {
                  tooltip: this
                }, true));
              },
              onRemove: function(t) {
                Qe.prototype.onRemove.call(this, t), t.fire("tooltipclose", {
                  tooltip: this
                }), this._source && (this.removeEventParent(this._source), this._source.fire("tooltipclose", {
                  tooltip: this
                }, true));
              },
              getEvents: function() {
                var t = Qe.prototype.getEvents.call(this);
                return this.options.permanent || (t.preclick = this.close), t;
              },
              _initLayout: function() {
                var t = "leaflet-tooltip", n = t + " " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
                this._contentNode = this._container = Pt("div", n), this._container.setAttribute("role", "tooltip"), this._container.setAttribute("id", "leaflet-tooltip-" + et(this));
              },
              _updateLayout: function() {
              },
              _adjustPan: function() {
              },
              _setPosition: function(t) {
                var n, a, d = this._map, _ = this._container, v = d.latLngToContainerPoint(d.getCenter()), P = d.layerPointToContainerPoint(t), U = this.options.direction, q = _.offsetWidth, X = _.offsetHeight, at = dt(this.options.offset), ft = this._getAnchor();
                U === "top" ? (n = q / 2, a = X) : U === "bottom" ? (n = q / 2, a = 0) : U === "center" ? (n = q / 2, a = X / 2) : U === "right" ? (n = 0, a = X / 2) : U === "left" ? (n = q, a = X / 2) : P.x < v.x ? (U = "right", n = 0, a = X / 2) : (U = "left", n = q + (at.x + ft.x) * 2, a = X / 2), t = t.subtract(dt(n, a, true)).add(at).add(ft), Yt(_, "leaflet-tooltip-right"), Yt(_, "leaflet-tooltip-left"), Yt(_, "leaflet-tooltip-top"), Yt(_, "leaflet-tooltip-bottom"), bt(_, "leaflet-tooltip-" + U), Jt(_, t);
              },
              _updatePosition: function() {
                var t = this._map.latLngToLayerPoint(this._latlng);
                this._setPosition(t);
              },
              setOpacity: function(t) {
                this.options.opacity = t, this._container && Te(this._container, t);
              },
              _animateZoom: function(t) {
                var n = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center);
                this._setPosition(n);
              },
              _getAnchor: function() {
                return dt(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [
                  0,
                  0
                ]);
              }
            }), mo = function(t, n) {
              return new Jn(t, n);
            };
            kt.include({
              openTooltip: function(t, n, a) {
                return this._initOverlay(Jn, t, n, a).openOn(this), this;
              },
              closeTooltip: function(t) {
                return t.close(), this;
              }
            }), we.include({
              bindTooltip: function(t, n) {
                return this._tooltip && this.isTooltipOpen() && this.unbindTooltip(), this._tooltip = this._initOverlay(Jn, this._tooltip, t, n), this._initTooltipInteractions(), this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(), this;
              },
              unbindTooltip: function() {
                return this._tooltip && (this._initTooltipInteractions(true), this.closeTooltip(), this._tooltip = null), this;
              },
              _initTooltipInteractions: function(t) {
                if (!(!t && this._tooltipHandlersAdded)) {
                  var n = t ? "off" : "on", a = {
                    remove: this.closeTooltip,
                    move: this._moveTooltip
                  };
                  this._tooltip.options.permanent ? a.add = this._openTooltip : (a.mouseover = this._openTooltip, a.mouseout = this.closeTooltip, a.click = this._openTooltip, this._map ? this._addFocusListeners() : a.add = this._addFocusListeners), this._tooltip.options.sticky && (a.mousemove = this._moveTooltip), this[n](a), this._tooltipHandlersAdded = !t;
                }
              },
              openTooltip: function(t) {
                return this._tooltip && (this instanceof Je || (this._tooltip._source = this), this._tooltip._prepareOpen(t) && (this._tooltip.openOn(this._map), this.getElement ? this._setAriaDescribedByOnLayer(this) : this.eachLayer && this.eachLayer(this._setAriaDescribedByOnLayer, this))), this;
              },
              closeTooltip: function() {
                if (this._tooltip) return this._tooltip.close();
              },
              toggleTooltip: function() {
                return this._tooltip && this._tooltip.toggle(this), this;
              },
              isTooltipOpen: function() {
                return this._tooltip.isOpen();
              },
              setTooltipContent: function(t) {
                return this._tooltip && this._tooltip.setContent(t), this;
              },
              getTooltip: function() {
                return this._tooltip;
              },
              _addFocusListeners: function() {
                this.getElement ? this._addFocusListenersOnLayer(this) : this.eachLayer && this.eachLayer(this._addFocusListenersOnLayer, this);
              },
              _addFocusListenersOnLayer: function(t) {
                var n = typeof t.getElement == "function" && t.getElement();
                n && (vt(n, "focus", function() {
                  this._tooltip._source = t, this.openTooltip();
                }, this), vt(n, "blur", this.closeTooltip, this));
              },
              _setAriaDescribedByOnLayer: function(t) {
                var n = typeof t.getElement == "function" && t.getElement();
                n && n.setAttribute("aria-describedby", this._tooltip._container.id);
              },
              _openTooltip: function(t) {
                if (!(!this._tooltip || !this._map)) {
                  if (this._map.dragging && this._map.dragging.moving() && !this._openOnceFlag) {
                    this._openOnceFlag = true;
                    var n = this;
                    this._map.once("moveend", function() {
                      n._openOnceFlag = false, n._openTooltip(t);
                    });
                    return;
                  }
                  this._tooltip._source = t.layer || t.target, this.openTooltip(this._tooltip.options.sticky ? t.latlng : void 0);
                }
              },
              _moveTooltip: function(t) {
                var n = t.latlng, a, d;
                this._tooltip.options.sticky && t.originalEvent && (a = this._map.mouseEventToContainerPoint(t.originalEvent), d = this._map.containerPointToLayerPoint(a), n = this._map.layerPointToLatLng(d)), this._tooltip.setLatLng(n);
              }
            });
            var _i = Qi.extend({
              options: {
                iconSize: [
                  12,
                  12
                ],
                html: false,
                bgPos: null,
                className: "leaflet-div-icon"
              },
              createIcon: function(t) {
                var n = t && t.tagName === "DIV" ? t : document.createElement("div"), a = this.options;
                if (a.html instanceof Element ? (mn(n), n.appendChild(a.html)) : n.innerHTML = a.html !== false ? a.html : "", a.bgPos) {
                  var d = dt(a.bgPos);
                  n.style.backgroundPosition = -d.x + "px " + -d.y + "px";
                }
                return this._setIconStyles(n, "icon"), n;
              },
              createShadow: function() {
                return null;
              }
            });
            function Mn(t) {
              return new _i(t);
            }
            Qi.Default = Cn;
            var kn = we.extend({
              options: {
                tileSize: 256,
                opacity: 1,
                updateWhenIdle: ct.mobile,
                updateWhenZooming: true,
                updateInterval: 200,
                zIndex: 1,
                bounds: null,
                minZoom: 0,
                maxZoom: void 0,
                maxNativeZoom: void 0,
                minNativeZoom: void 0,
                noWrap: false,
                pane: "tilePane",
                className: "",
                keepBuffer: 2
              },
              initialize: function(t) {
                gt(this, t);
              },
              onAdd: function() {
                this._initContainer(), this._levels = {}, this._tiles = {}, this._resetView();
              },
              beforeAdd: function(t) {
                t._addZoomLimit(this);
              },
              onRemove: function(t) {
                this._removeAllTiles(), qt(this._container), t._removeZoomLimit(this), this._container = null, this._tileZoom = void 0;
              },
              bringToFront: function() {
                return this._map && (qi(this._container), this._setAutoZIndex(Math.max)), this;
              },
              bringToBack: function() {
                return this._map && (Vi(this._container), this._setAutoZIndex(Math.min)), this;
              },
              getContainer: function() {
                return this._container;
              },
              setOpacity: function(t) {
                return this.options.opacity = t, this._updateOpacity(), this;
              },
              setZIndex: function(t) {
                return this.options.zIndex = t, this._updateZIndex(), this;
              },
              isLoading: function() {
                return this._loading;
              },
              redraw: function() {
                if (this._map) {
                  this._removeAllTiles();
                  var t = this._clampZoom(this._map.getZoom());
                  t !== this._tileZoom && (this._tileZoom = t, this._updateLevels()), this._update();
                }
                return this;
              },
              getEvents: function() {
                var t = {
                  viewprereset: this._invalidateAll,
                  viewreset: this._resetView,
                  zoom: this._resetView,
                  moveend: this._onMoveEnd
                };
                return this.options.updateWhenIdle || (this._onMove || (this._onMove = _t(this._onMoveEnd, this.options.updateInterval, this)), t.move = this._onMove), this._zoomAnimated && (t.zoomanim = this._animateZoom), t;
              },
              createTile: function() {
                return document.createElement("div");
              },
              getTileSize: function() {
                var t = this.options.tileSize;
                return t instanceof pt ? t : new pt(t, t);
              },
              _updateZIndex: function() {
                this._container && this.options.zIndex !== void 0 && this.options.zIndex !== null && (this._container.style.zIndex = this.options.zIndex);
              },
              _setAutoZIndex: function(t) {
                for (var n = this.getPane().children, a = -t(-1 / 0, 1 / 0), d = 0, _ = n.length, v; d < _; d++) v = n[d].style.zIndex, n[d] !== this._container && v && (a = t(a, +v));
                isFinite(a) && (this.options.zIndex = a + t(-1, 1), this._updateZIndex());
              },
              _updateOpacity: function() {
                if (this._map && !ct.ielt9) {
                  Te(this._container, this.options.opacity);
                  var t = +/* @__PURE__ */ new Date(), n = false, a = false;
                  for (var d in this._tiles) {
                    var _ = this._tiles[d];
                    if (!(!_.current || !_.loaded)) {
                      var v = Math.min(1, (t - _.loaded) / 200);
                      Te(_.el, v), v < 1 ? n = true : (_.active ? a = true : this._onOpaqueTile(_), _.active = true);
                    }
                  }
                  a && !this._noPrune && this._pruneTiles(), n && (ce(this._fadeFrame), this._fadeFrame = Ut(this._updateOpacity, this));
                }
              },
              _onOpaqueTile: ht,
              _initContainer: function() {
                this._container || (this._container = Pt("div", "leaflet-layer " + (this.options.className || "")), this._updateZIndex(), this.options.opacity < 1 && this._updateOpacity(), this.getPane().appendChild(this._container));
              },
              _updateLevels: function() {
                var t = this._tileZoom, n = this.options.maxZoom;
                if (t !== void 0) {
                  for (var a in this._levels) a = Number(a), this._levels[a].el.children.length || a === t ? (this._levels[a].el.style.zIndex = n - Math.abs(t - a), this._onUpdateLevel(a)) : (qt(this._levels[a].el), this._removeTilesAtZoom(a), this._onRemoveLevel(a), delete this._levels[a]);
                  var d = this._levels[t], _ = this._map;
                  return d || (d = this._levels[t] = {}, d.el = Pt("div", "leaflet-tile-container leaflet-zoom-animated", this._container), d.el.style.zIndex = n, d.origin = _.project(_.unproject(_.getPixelOrigin()), t).round(), d.zoom = t, this._setZoomTransform(d, _.getCenter(), _.getZoom()), ht(d.el.offsetWidth), this._onCreateLevel(d)), this._level = d, d;
                }
              },
              _onUpdateLevel: ht,
              _onRemoveLevel: ht,
              _onCreateLevel: ht,
              _pruneTiles: function() {
                if (this._map) {
                  var t, n, a = this._map.getZoom();
                  if (a > this.options.maxZoom || a < this.options.minZoom) {
                    this._removeAllTiles();
                    return;
                  }
                  for (t in this._tiles) n = this._tiles[t], n.retain = n.current;
                  for (t in this._tiles) if (n = this._tiles[t], n.current && !n.active) {
                    var d = n.coords;
                    this._retainParent(d.x, d.y, d.z, d.z - 5) || this._retainChildren(d.x, d.y, d.z, d.z + 2);
                  }
                  for (t in this._tiles) this._tiles[t].retain || this._removeTile(t);
                }
              },
              _removeTilesAtZoom: function(t) {
                for (var n in this._tiles) this._tiles[n].coords.z === t && this._removeTile(n);
              },
              _removeAllTiles: function() {
                for (var t in this._tiles) this._removeTile(t);
              },
              _invalidateAll: function() {
                for (var t in this._levels) qt(this._levels[t].el), this._onRemoveLevel(Number(t)), delete this._levels[t];
                this._removeAllTiles(), this._tileZoom = void 0;
              },
              _retainParent: function(t, n, a, d) {
                var _ = Math.floor(t / 2), v = Math.floor(n / 2), P = a - 1, U = new pt(+_, +v);
                U.z = +P;
                var q = this._tileCoordsToKey(U), X = this._tiles[q];
                return X && X.active ? (X.retain = true, true) : (X && X.loaded && (X.retain = true), P > d ? this._retainParent(_, v, P, d) : false);
              },
              _retainChildren: function(t, n, a, d) {
                for (var _ = 2 * t; _ < 2 * t + 2; _++) for (var v = 2 * n; v < 2 * n + 2; v++) {
                  var P = new pt(_, v);
                  P.z = a + 1;
                  var U = this._tileCoordsToKey(P), q = this._tiles[U];
                  if (q && q.active) {
                    q.retain = true;
                    continue;
                  } else q && q.loaded && (q.retain = true);
                  a + 1 < d && this._retainChildren(_, v, a + 1, d);
                }
              },
              _resetView: function(t) {
                var n = t && (t.pinch || t.flyTo);
                this._setView(this._map.getCenter(), this._map.getZoom(), n, n);
              },
              _animateZoom: function(t) {
                this._setView(t.center, t.zoom, true, t.noUpdate);
              },
              _clampZoom: function(t) {
                var n = this.options;
                return n.minNativeZoom !== void 0 && t < n.minNativeZoom ? n.minNativeZoom : n.maxNativeZoom !== void 0 && n.maxNativeZoom < t ? n.maxNativeZoom : t;
              },
              _setView: function(t, n, a, d) {
                var _ = Math.round(n);
                this.options.maxZoom !== void 0 && _ > this.options.maxZoom || this.options.minZoom !== void 0 && _ < this.options.minZoom ? _ = void 0 : _ = this._clampZoom(_);
                var v = this.options.updateWhenZooming && _ !== this._tileZoom;
                (!d || v) && (this._tileZoom = _, this._abortLoading && this._abortLoading(), this._updateLevels(), this._resetGrid(), _ !== void 0 && this._update(t), a || this._pruneTiles(), this._noPrune = !!a), this._setZoomTransforms(t, n);
              },
              _setZoomTransforms: function(t, n) {
                for (var a in this._levels) this._setZoomTransform(this._levels[a], t, n);
              },
              _setZoomTransform: function(t, n, a) {
                var d = this._map.getZoomScale(a, t.zoom), _ = t.origin.multiplyBy(d).subtract(this._map._getNewPixelOrigin(n, a)).round();
                ct.any3d ? ki(t.el, _, d) : Jt(t.el, _);
              },
              _resetGrid: function() {
                var t = this._map, n = t.options.crs, a = this._tileSize = this.getTileSize(), d = this._tileZoom, _ = this._map.getPixelWorldBounds(this._tileZoom);
                _ && (this._globalTileRange = this._pxBoundsToTileRange(_)), this._wrapX = n.wrapLng && !this.options.noWrap && [
                  Math.floor(t.project([
                    0,
                    n.wrapLng[0]
                  ], d).x / a.x),
                  Math.ceil(t.project([
                    0,
                    n.wrapLng[1]
                  ], d).x / a.y)
                ], this._wrapY = n.wrapLat && !this.options.noWrap && [
                  Math.floor(t.project([
                    n.wrapLat[0],
                    0
                  ], d).y / a.x),
                  Math.ceil(t.project([
                    n.wrapLat[1],
                    0
                  ], d).y / a.y)
                ];
              },
              _onMoveEnd: function() {
                !this._map || this._map._animatingZoom || this._update();
              },
              _getTiledPixelBounds: function(t) {
                var n = this._map, a = n._animatingZoom ? Math.max(n._animateToZoom, n.getZoom()) : n.getZoom(), d = n.getZoomScale(a, this._tileZoom), _ = n.project(t, this._tileZoom).floor(), v = n.getSize().divideBy(d * 2);
                return new Mt(_.subtract(v), _.add(v));
              },
              _update: function(t) {
                var n = this._map;
                if (n) {
                  var a = this._clampZoom(n.getZoom());
                  if (t === void 0 && (t = n.getCenter()), this._tileZoom !== void 0) {
                    var d = this._getTiledPixelBounds(t), _ = this._pxBoundsToTileRange(d), v = _.getCenter(), P = [], U = this.options.keepBuffer, q = new Mt(_.getBottomLeft().subtract([
                      U,
                      -U
                    ]), _.getTopRight().add([
                      U,
                      -U
                    ]));
                    if (!(isFinite(_.min.x) && isFinite(_.min.y) && isFinite(_.max.x) && isFinite(_.max.y))) throw new Error("Attempted to load an infinite number of tiles");
                    for (var X in this._tiles) {
                      var at = this._tiles[X].coords;
                      (at.z !== this._tileZoom || !q.contains(new pt(at.x, at.y))) && (this._tiles[X].current = false);
                    }
                    if (Math.abs(a - this._tileZoom) > 1) {
                      this._setView(t, a);
                      return;
                    }
                    for (var ft = _.min.y; ft <= _.max.y; ft++) for (var xt = _.min.x; xt <= _.max.x; xt++) {
                      var ye = new pt(xt, ft);
                      if (ye.z = this._tileZoom, !!this._isValidTile(ye)) {
                        var se = this._tiles[this._tileCoordsToKey(ye)];
                        se ? se.current = true : P.push(ye);
                      }
                    }
                    if (P.sort(function(Ce, gi) {
                      return Ce.distanceTo(v) - gi.distanceTo(v);
                    }), P.length !== 0) {
                      this._loading || (this._loading = true, this.fire("loading"));
                      var Re = document.createDocumentFragment();
                      for (xt = 0; xt < P.length; xt++) this._addTile(P[xt], Re);
                      this._level.el.appendChild(Re);
                    }
                  }
                }
              },
              _isValidTile: function(t) {
                var n = this._map.options.crs;
                if (!n.infinite) {
                  var a = this._globalTileRange;
                  if (!n.wrapLng && (t.x < a.min.x || t.x > a.max.x) || !n.wrapLat && (t.y < a.min.y || t.y > a.max.y)) return false;
                }
                if (!this.options.bounds) return true;
                var d = this._tileCoordsToBounds(t);
                return Ot(this.options.bounds).overlaps(d);
              },
              _keyToBounds: function(t) {
                return this._tileCoordsToBounds(this._keyToTileCoords(t));
              },
              _tileCoordsToNwSe: function(t) {
                var n = this._map, a = this.getTileSize(), d = t.scaleBy(a), _ = d.add(a), v = n.unproject(d, t.z), P = n.unproject(_, t.z);
                return [
                  v,
                  P
                ];
              },
              _tileCoordsToBounds: function(t) {
                var n = this._tileCoordsToNwSe(t), a = new jt(n[0], n[1]);
                return this.options.noWrap || (a = this._map.wrapLatLngBounds(a)), a;
              },
              _tileCoordsToKey: function(t) {
                return t.x + ":" + t.y + ":" + t.z;
              },
              _keyToTileCoords: function(t) {
                var n = t.split(":"), a = new pt(+n[0], +n[1]);
                return a.z = +n[2], a;
              },
              _removeTile: function(t) {
                var n = this._tiles[t];
                n && (qt(n.el), delete this._tiles[t], this.fire("tileunload", {
                  tile: n.el,
                  coords: this._keyToTileCoords(t)
                }));
              },
              _initTile: function(t) {
                bt(t, "leaflet-tile");
                var n = this.getTileSize();
                t.style.width = n.x + "px", t.style.height = n.y + "px", t.onselectstart = ht, t.onmousemove = ht, ct.ielt9 && this.options.opacity < 1 && Te(t, this.options.opacity);
              },
              _addTile: function(t, n) {
                var a = this._getTilePos(t), d = this._tileCoordsToKey(t), _ = this.createTile(this._wrapCoords(t), M(this._tileReady, this, t));
                this._initTile(_), this.createTile.length < 2 && Ut(M(this._tileReady, this, t, null, _)), Jt(_, a), this._tiles[d] = {
                  el: _,
                  coords: t,
                  current: true
                }, n.appendChild(_), this.fire("tileloadstart", {
                  tile: _,
                  coords: t
                });
              },
              _tileReady: function(t, n, a) {
                n && this.fire("tileerror", {
                  error: n,
                  tile: a,
                  coords: t
                });
                var d = this._tileCoordsToKey(t);
                a = this._tiles[d], a && (a.loaded = +/* @__PURE__ */ new Date(), this._map._fadeAnimated ? (Te(a.el, 0), ce(this._fadeFrame), this._fadeFrame = Ut(this._updateOpacity, this)) : (a.active = true, this._pruneTiles()), n || (bt(a.el, "leaflet-tile-loaded"), this.fire("tileload", {
                  tile: a.el,
                  coords: t
                })), this._noTilesToLoad() && (this._loading = false, this.fire("load"), ct.ielt9 || !this._map._fadeAnimated ? Ut(this._pruneTiles, this) : setTimeout(M(this._pruneTiles, this), 250)));
              },
              _getTilePos: function(t) {
                return t.scaleBy(this.getTileSize()).subtract(this._level.origin);
              },
              _wrapCoords: function(t) {
                var n = new pt(this._wrapX ? wt(t.x, this._wrapX) : t.x, this._wrapY ? wt(t.y, this._wrapY) : t.y);
                return n.z = t.z, n;
              },
              _pxBoundsToTileRange: function(t) {
                var n = this.getTileSize();
                return new Mt(t.min.unscaleBy(n).floor(), t.max.unscaleBy(n).ceil().subtract([
                  1,
                  1
                ]));
              },
              _noTilesToLoad: function() {
                for (var t in this._tiles) if (!this._tiles[t].loaded) return false;
                return true;
              }
            });
            function Ks(t) {
              return new kn(t);
            }
            var mi = kn.extend({
              options: {
                minZoom: 0,
                maxZoom: 18,
                subdomains: "abc",
                errorTileUrl: "",
                zoomOffset: 0,
                tms: false,
                zoomReverse: false,
                detectRetina: false,
                crossOrigin: false,
                referrerPolicy: false
              },
              initialize: function(t, n) {
                this._url = t, n = gt(this, n), n.detectRetina && ct.retina && n.maxZoom > 0 ? (n.tileSize = Math.floor(n.tileSize / 2), n.zoomReverse ? (n.zoomOffset--, n.minZoom = Math.min(n.maxZoom, n.minZoom + 1)) : (n.zoomOffset++, n.maxZoom = Math.max(n.minZoom, n.maxZoom - 1)), n.minZoom = Math.max(0, n.minZoom)) : n.zoomReverse ? n.minZoom = Math.min(n.maxZoom, n.minZoom) : n.maxZoom = Math.max(n.minZoom, n.maxZoom), typeof n.subdomains == "string" && (n.subdomains = n.subdomains.split("")), this.on("tileunload", this._onTileRemove);
              },
              setUrl: function(t, n) {
                return this._url === t && n === void 0 && (n = true), this._url = t, n || this.redraw(), this;
              },
              createTile: function(t, n) {
                var a = document.createElement("img");
                return vt(a, "load", M(this._tileOnLoad, this, n, a)), vt(a, "error", M(this._tileOnError, this, n, a)), (this.options.crossOrigin || this.options.crossOrigin === "") && (a.crossOrigin = this.options.crossOrigin === true ? "" : this.options.crossOrigin), typeof this.options.referrerPolicy == "string" && (a.referrerPolicy = this.options.referrerPolicy), a.alt = "", a.src = this.getTileUrl(t), a;
              },
              getTileUrl: function(t) {
                var n = {
                  r: ct.retina ? "@2x" : "",
                  s: this._getSubdomain(t),
                  x: t.x,
                  y: t.y,
                  z: this._getZoomForUrl()
                };
                if (this._map && !this._map.options.crs.infinite) {
                  var a = this._globalTileRange.max.y - t.y;
                  this.options.tms && (n.y = a), n["-y"] = a;
                }
                return yt(this._url, x(n, this.options));
              },
              _tileOnLoad: function(t, n) {
                ct.ielt9 ? setTimeout(M(t, this, null, n), 0) : t(null, n);
              },
              _tileOnError: function(t, n, a) {
                var d = this.options.errorTileUrl;
                d && n.getAttribute("src") !== d && (n.src = d), t(a, n);
              },
              _onTileRemove: function(t) {
                t.tile.onload = null;
              },
              _getZoomForUrl: function() {
                var t = this._tileZoom, n = this.options.maxZoom, a = this.options.zoomReverse, d = this.options.zoomOffset;
                return a && (t = n - t), t + d;
              },
              _getSubdomain: function(t) {
                var n = Math.abs(t.x + t.y) % this.options.subdomains.length;
                return this.options.subdomains[n];
              },
              _abortLoading: function() {
                var t, n;
                for (t in this._tiles) if (this._tiles[t].coords.z !== this._tileZoom && (n = this._tiles[t].el, n.onload = ht, n.onerror = ht, !n.complete)) {
                  n.src = he;
                  var a = this._tiles[t].coords;
                  qt(n), delete this._tiles[t], this.fire("tileabort", {
                    tile: n,
                    coords: a
                  });
                }
              },
              _removeTile: function(t) {
                var n = this._tiles[t];
                if (n) return n.el.setAttribute("src", he), kn.prototype._removeTile.call(this, t);
              },
              _tileReady: function(t, n, a) {
                if (!(!this._map || a && a.getAttribute("src") === he)) return kn.prototype._tileReady.call(this, t, n, a);
              }
            });
            function Ys(t, n) {
              return new mi(t, n);
            }
            var Xs = mi.extend({
              defaultWmsParams: {
                service: "WMS",
                request: "GetMap",
                layers: "",
                styles: "",
                format: "image/jpeg",
                transparent: false,
                version: "1.1.1"
              },
              options: {
                crs: null,
                uppercase: false
              },
              initialize: function(t, n) {
                this._url = t;
                var a = x({}, this.defaultWmsParams);
                for (var d in n) d in this.options || (a[d] = n[d]);
                n = gt(this, n);
                var _ = n.detectRetina && ct.retina ? 2 : 1, v = this.getTileSize();
                a.width = v.x * _, a.height = v.y * _, this.wmsParams = a;
              },
              onAdd: function(t) {
                this._crs = this.options.crs || t.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
                var n = this._wmsVersion >= 1.3 ? "crs" : "srs";
                this.wmsParams[n] = this._crs.code, mi.prototype.onAdd.call(this, t);
              },
              getTileUrl: function(t) {
                var n = this._tileCoordsToNwSe(t), a = this._crs, d = Kt(a.project(n[0]), a.project(n[1])), _ = d.min, v = d.max, P = (this._wmsVersion >= 1.3 && this._crs === Ir ? [
                  _.y,
                  _.x,
                  v.y,
                  v.x
                ] : [
                  _.x,
                  _.y,
                  v.x,
                  v.y
                ]).join(","), U = mi.prototype.getTileUrl.call(this, t);
                return U + le(this.wmsParams, U, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + P;
              },
              setParams: function(t, n) {
                return x(this.wmsParams, t), n || this.redraw(), this;
              }
            });
            function Js(t, n) {
              return new Xs(t, n);
            }
            mi.WMS = Xs, Ys.wms = Js;
            var $e = we.extend({
              options: {
                padding: 0.1
              },
              initialize: function(t) {
                gt(this, t), et(this), this._layers = this._layers || {};
              },
              onAdd: function() {
                this._container || (this._initContainer(), bt(this._container, "leaflet-zoom-animated")), this.getPane().appendChild(this._container), this._update(), this.on("update", this._updatePaths, this);
              },
              onRemove: function() {
                this.off("update", this._updatePaths, this), this._destroyContainer();
              },
              getEvents: function() {
                var t = {
                  viewreset: this._reset,
                  zoom: this._onZoom,
                  moveend: this._update,
                  zoomend: this._onZoomEnd
                };
                return this._zoomAnimated && (t.zoomanim = this._onAnimZoom), t;
              },
              _onAnimZoom: function(t) {
                this._updateTransform(t.center, t.zoom);
              },
              _onZoom: function() {
                this._updateTransform(this._map.getCenter(), this._map.getZoom());
              },
              _updateTransform: function(t, n) {
                var a = this._map.getZoomScale(n, this._zoom), d = this._map.getSize().multiplyBy(0.5 + this.options.padding), _ = this._map.project(this._center, n), v = d.multiplyBy(-a).add(_).subtract(this._map._getNewPixelOrigin(t, n));
                ct.any3d ? ki(this._container, v, a) : Jt(this._container, v);
              },
              _reset: function() {
                this._update(), this._updateTransform(this._center, this._zoom);
                for (var t in this._layers) this._layers[t]._reset();
              },
              _onZoomEnd: function() {
                for (var t in this._layers) this._layers[t]._project();
              },
              _updatePaths: function() {
                for (var t in this._layers) this._layers[t]._update();
              },
              _update: function() {
                var t = this.options.padding, n = this._map.getSize(), a = this._map.containerPointToLayerPoint(n.multiplyBy(-t)).round();
                this._bounds = new Mt(a, a.add(n.multiplyBy(1 + t * 2)).round()), this._center = this._map.getCenter(), this._zoom = this._map.getZoom();
              }
            }), Qn = $e.extend({
              options: {
                tolerance: 0
              },
              getEvents: function() {
                var t = $e.prototype.getEvents.call(this);
                return t.viewprereset = this._onViewPreReset, t;
              },
              _onViewPreReset: function() {
                this._postponeUpdatePaths = true;
              },
              onAdd: function() {
                $e.prototype.onAdd.call(this), this._draw();
              },
              _initContainer: function() {
                var t = this._container = document.createElement("canvas");
                vt(t, "mousemove", this._onMouseMove, this), vt(t, "click dblclick mousedown mouseup contextmenu", this._onClick, this), vt(t, "mouseout", this._handleMouseOut, this), t._leaflet_disable_events = true, this._ctx = t.getContext("2d");
              },
              _destroyContainer: function() {
                ce(this._redrawRequest), delete this._ctx, qt(this._container), St(this._container), delete this._container;
              },
              _updatePaths: function() {
                if (!this._postponeUpdatePaths) {
                  var t;
                  this._redrawBounds = null;
                  for (var n in this._layers) t = this._layers[n], t._update();
                  this._redraw();
                }
              },
              _update: function() {
                if (!(this._map._animatingZoom && this._bounds)) {
                  $e.prototype._update.call(this);
                  var t = this._bounds, n = this._container, a = t.getSize(), d = ct.retina ? 2 : 1;
                  Jt(n, t.min), n.width = d * a.x, n.height = d * a.y, n.style.width = a.x + "px", n.style.height = a.y + "px", ct.retina && this._ctx.scale(2, 2), this._ctx.translate(-t.min.x, -t.min.y), this.fire("update");
                }
              },
              _reset: function() {
                $e.prototype._reset.call(this), this._postponeUpdatePaths && (this._postponeUpdatePaths = false, this._updatePaths());
              },
              _initPath: function(t) {
                this._updateDashArray(t), this._layers[et(t)] = t;
                var n = t._order = {
                  layer: t,
                  prev: this._drawLast,
                  next: null
                };
                this._drawLast && (this._drawLast.next = n), this._drawLast = n, this._drawFirst = this._drawFirst || this._drawLast;
              },
              _addPath: function(t) {
                this._requestRedraw(t);
              },
              _removePath: function(t) {
                var n = t._order, a = n.next, d = n.prev;
                a ? a.prev = d : this._drawLast = d, d ? d.next = a : this._drawFirst = a, delete t._order, delete this._layers[et(t)], this._requestRedraw(t);
              },
              _updatePath: function(t) {
                this._extendRedrawBounds(t), t._project(), t._update(), this._requestRedraw(t);
              },
              _updateStyle: function(t) {
                this._updateDashArray(t), this._requestRedraw(t);
              },
              _updateDashArray: function(t) {
                if (typeof t.options.dashArray == "string") {
                  var n = t.options.dashArray.split(/[, ]+/), a = [], d, _;
                  for (_ = 0; _ < n.length; _++) {
                    if (d = Number(n[_]), isNaN(d)) return;
                    a.push(d);
                  }
                  t.options._dashArray = a;
                } else t.options._dashArray = t.options.dashArray;
              },
              _requestRedraw: function(t) {
                this._map && (this._extendRedrawBounds(t), this._redrawRequest = this._redrawRequest || Ut(this._redraw, this));
              },
              _extendRedrawBounds: function(t) {
                if (t._pxBounds) {
                  var n = (t.options.weight || 0) + 1;
                  this._redrawBounds = this._redrawBounds || new Mt(), this._redrawBounds.extend(t._pxBounds.min.subtract([
                    n,
                    n
                  ])), this._redrawBounds.extend(t._pxBounds.max.add([
                    n,
                    n
                  ]));
                }
              },
              _redraw: function() {
                this._redrawRequest = null, this._redrawBounds && (this._redrawBounds.min._floor(), this._redrawBounds.max._ceil()), this._clear(), this._draw(), this._redrawBounds = null;
              },
              _clear: function() {
                var t = this._redrawBounds;
                if (t) {
                  var n = t.getSize();
                  this._ctx.clearRect(t.min.x, t.min.y, n.x, n.y);
                } else this._ctx.save(), this._ctx.setTransform(1, 0, 0, 1, 0, 0), this._ctx.clearRect(0, 0, this._container.width, this._container.height), this._ctx.restore();
              },
              _draw: function() {
                var t, n = this._redrawBounds;
                if (this._ctx.save(), n) {
                  var a = n.getSize();
                  this._ctx.beginPath(), this._ctx.rect(n.min.x, n.min.y, a.x, a.y), this._ctx.clip();
                }
                this._drawing = true;
                for (var d = this._drawFirst; d; d = d.next) t = d.layer, (!n || t._pxBounds && t._pxBounds.intersects(n)) && t._updatePath();
                this._drawing = false, this._ctx.restore();
              },
              _updatePoly: function(t, n) {
                if (this._drawing) {
                  var a, d, _, v, P = t._parts, U = P.length, q = this._ctx;
                  if (U) {
                    for (q.beginPath(), a = 0; a < U; a++) {
                      for (d = 0, _ = P[a].length; d < _; d++) v = P[a][d], q[d ? "lineTo" : "moveTo"](v.x, v.y);
                      n && q.closePath();
                    }
                    this._fillStroke(q, t);
                  }
                }
              },
              _updateCircle: function(t) {
                if (!(!this._drawing || t._empty())) {
                  var n = t._point, a = this._ctx, d = Math.max(Math.round(t._radius), 1), _ = (Math.max(Math.round(t._radiusY), 1) || d) / d;
                  _ !== 1 && (a.save(), a.scale(1, _)), a.beginPath(), a.arc(n.x, n.y / _, d, 0, Math.PI * 2, false), _ !== 1 && a.restore(), this._fillStroke(a, t);
                }
              },
              _fillStroke: function(t, n) {
                var a = n.options;
                a.fill && (t.globalAlpha = a.fillOpacity, t.fillStyle = a.fillColor || a.color, t.fill(a.fillRule || "evenodd")), a.stroke && a.weight !== 0 && (t.setLineDash && t.setLineDash(n.options && n.options._dashArray || []), t.globalAlpha = a.opacity, t.lineWidth = a.weight, t.strokeStyle = a.color, t.lineCap = a.lineCap, t.lineJoin = a.lineJoin, t.stroke());
              },
              _onClick: function(t) {
                for (var n = this._map.mouseEventToLayerPoint(t), a, d, _ = this._drawFirst; _; _ = _.next) a = _.layer, a.options.interactive && a._containsPoint(n) && (!(t.type === "click" || t.type === "preclick") || !this._map._draggableMoved(a)) && (d = a);
                this._fireEvent(d ? [
                  d
                ] : false, t);
              },
              _onMouseMove: function(t) {
                if (!(!this._map || this._map.dragging.moving() || this._map._animatingZoom)) {
                  var n = this._map.mouseEventToLayerPoint(t);
                  this._handleMouseHover(t, n);
                }
              },
              _handleMouseOut: function(t) {
                var n = this._hoveredLayer;
                n && (Yt(this._container, "leaflet-interactive"), this._fireEvent([
                  n
                ], t, "mouseout"), this._hoveredLayer = null, this._mouseHoverThrottled = false);
              },
              _handleMouseHover: function(t, n) {
                if (!this._mouseHoverThrottled) {
                  for (var a, d, _ = this._drawFirst; _; _ = _.next) a = _.layer, a.options.interactive && a._containsPoint(n) && (d = a);
                  d !== this._hoveredLayer && (this._handleMouseOut(t), d && (bt(this._container, "leaflet-interactive"), this._fireEvent([
                    d
                  ], t, "mouseover"), this._hoveredLayer = d)), this._fireEvent(this._hoveredLayer ? [
                    this._hoveredLayer
                  ] : false, t), this._mouseHoverThrottled = true, setTimeout(M(function() {
                    this._mouseHoverThrottled = false;
                  }, this), 32);
                }
              },
              _fireEvent: function(t, n, a) {
                this._map._fireDOMEvent(n, a || n.type, t);
              },
              _bringToFront: function(t) {
                var n = t._order;
                if (n) {
                  var a = n.next, d = n.prev;
                  if (a) a.prev = d;
                  else return;
                  d ? d.next = a : a && (this._drawFirst = a), n.prev = this._drawLast, this._drawLast.next = n, n.next = null, this._drawLast = n, this._requestRedraw(t);
                }
              },
              _bringToBack: function(t) {
                var n = t._order;
                if (n) {
                  var a = n.next, d = n.prev;
                  if (d) d.next = a;
                  else return;
                  a ? a.prev = d : d && (this._drawLast = d), n.prev = null, n.next = this._drawFirst, this._drawFirst.prev = n, this._drawFirst = n, this._requestRedraw(t);
                }
              }
            });
            function Gr(t) {
              return ct.canvas ? new Qn(t) : null;
            }
            var Si = (function() {
              try {
                return document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"), function(t) {
                  return document.createElement("<lvml:" + t + ' class="lvml">');
                };
              } catch {
              }
              return function(t) {
                return document.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
              };
            })(), go = {
              _initContainer: function() {
                this._container = Pt("div", "leaflet-vml-container");
              },
              _update: function() {
                this._map._animatingZoom || ($e.prototype._update.call(this), this.fire("update"));
              },
              _initPath: function(t) {
                var n = t._container = Si("shape");
                bt(n, "leaflet-vml-shape " + (this.options.className || "")), n.coordsize = "1 1", t._path = Si("path"), n.appendChild(t._path), this._updateStyle(t), this._layers[et(t)] = t;
              },
              _addPath: function(t) {
                var n = t._container;
                this._container.appendChild(n), t.options.interactive && t.addInteractiveTarget(n);
              },
              _removePath: function(t) {
                var n = t._container;
                qt(n), t.removeInteractiveTarget(n), delete this._layers[et(t)];
              },
              _updateStyle: function(t) {
                var n = t._stroke, a = t._fill, d = t.options, _ = t._container;
                _.stroked = !!d.stroke, _.filled = !!d.fill, d.stroke ? (n || (n = t._stroke = Si("stroke")), _.appendChild(n), n.weight = d.weight + "px", n.color = d.color, n.opacity = d.opacity, d.dashArray ? n.dashStyle = W(d.dashArray) ? d.dashArray.join(" ") : d.dashArray.replace(/( *, *)/g, " ") : n.dashStyle = "", n.endcap = d.lineCap.replace("butt", "flat"), n.joinstyle = d.lineJoin) : n && (_.removeChild(n), t._stroke = null), d.fill ? (a || (a = t._fill = Si("fill")), _.appendChild(a), a.color = d.fillColor || d.color, a.opacity = d.fillOpacity) : a && (_.removeChild(a), t._fill = null);
              },
              _updateCircle: function(t) {
                var n = t._point.round(), a = Math.round(t._radius), d = Math.round(t._radiusY || a);
                this._setPath(t, t._empty() ? "M0 0" : "AL " + n.x + "," + n.y + " " + a + "," + d + " 0," + 65535 * 360);
              },
              _setPath: function(t, n) {
                t._path.v = n;
              },
              _bringToFront: function(t) {
                qi(t._container);
              },
              _bringToBack: function(t) {
                Vi(t._container);
              }
            }, Oe = ct.vml ? Si : rs, Qt = $e.extend({
              _initContainer: function() {
                this._container = Oe("svg"), this._container.setAttribute("pointer-events", "none"), this._rootGroup = Oe("g"), this._container.appendChild(this._rootGroup);
              },
              _destroyContainer: function() {
                qt(this._container), St(this._container), delete this._container, delete this._rootGroup, delete this._svgSize;
              },
              _update: function() {
                if (!(this._map._animatingZoom && this._bounds)) {
                  $e.prototype._update.call(this);
                  var t = this._bounds, n = t.getSize(), a = this._container;
                  (!this._svgSize || !this._svgSize.equals(n)) && (this._svgSize = n, a.setAttribute("width", n.x), a.setAttribute("height", n.y)), Jt(a, t.min), a.setAttribute("viewBox", [
                    t.min.x,
                    t.min.y,
                    n.x,
                    n.y
                  ].join(" ")), this.fire("update");
                }
              },
              _initPath: function(t) {
                var n = t._path = Oe("path");
                t.options.className && bt(n, t.options.className), t.options.interactive && bt(n, "leaflet-interactive"), this._updateStyle(t), this._layers[et(t)] = t;
              },
              _addPath: function(t) {
                this._rootGroup || this._initContainer(), this._rootGroup.appendChild(t._path), t.addInteractiveTarget(t._path);
              },
              _removePath: function(t) {
                qt(t._path), t.removeInteractiveTarget(t._path), delete this._layers[et(t)];
              },
              _updatePath: function(t) {
                t._project(), t._update();
              },
              _updateStyle: function(t) {
                var n = t._path, a = t.options;
                n && (a.stroke ? (n.setAttribute("stroke", a.color), n.setAttribute("stroke-opacity", a.opacity), n.setAttribute("stroke-width", a.weight), n.setAttribute("stroke-linecap", a.lineCap), n.setAttribute("stroke-linejoin", a.lineJoin), a.dashArray ? n.setAttribute("stroke-dasharray", a.dashArray) : n.removeAttribute("stroke-dasharray"), a.dashOffset ? n.setAttribute("stroke-dashoffset", a.dashOffset) : n.removeAttribute("stroke-dashoffset")) : n.setAttribute("stroke", "none"), a.fill ? (n.setAttribute("fill", a.fillColor || a.color), n.setAttribute("fill-opacity", a.fillOpacity), n.setAttribute("fill-rule", a.fillRule || "evenodd")) : n.setAttribute("fill", "none"));
              },
              _updatePoly: function(t, n) {
                this._setPath(t, ss(t._parts, n));
              },
              _updateCircle: function(t) {
                var n = t._point, a = Math.max(Math.round(t._radius), 1), d = Math.max(Math.round(t._radiusY), 1) || a, _ = "a" + a + "," + d + " 0 1,0 ", v = t._empty() ? "M0 0" : "M" + (n.x - a) + "," + n.y + _ + a * 2 + ",0 " + _ + -a * 2 + ",0 ";
                this._setPath(t, v);
              },
              _setPath: function(t, n) {
                t._path.setAttribute("d", n);
              },
              _bringToFront: function(t) {
                qi(t._path);
              },
              _bringToBack: function(t) {
                Vi(t._path);
              }
            });
            ct.vml && Qt.include(go);
            function Qs(t) {
              return ct.svg || ct.vml ? new Qt(t) : null;
            }
            kt.include({
              getRenderer: function(t) {
                var n = t.options.renderer || this._getPaneRenderer(t.options.pane) || this.options.renderer || this._renderer;
                return n || (n = this._renderer = this._createRenderer()), this.hasLayer(n) || this.addLayer(n), n;
              },
              _getPaneRenderer: function(t) {
                if (t === "overlayPane" || t === void 0) return false;
                var n = this._paneRenderers[t];
                return n === void 0 && (n = this._createRenderer({
                  pane: t
                }), this._paneRenderers[t] = n), n;
              },
              _createRenderer: function(t) {
                return this.options.preferCanvas && Gr(t) || Qs(t);
              }
            });
            var $n = me.extend({
              initialize: function(t, n) {
                me.prototype.initialize.call(this, this._boundsToLatLngs(t), n);
              },
              setBounds: function(t) {
                return this.setLatLngs(this._boundsToLatLngs(t));
              },
              _boundsToLatLngs: function(t) {
                return t = Ot(t), [
                  t.getSouthWest(),
                  t.getNorthWest(),
                  t.getNorthEast(),
                  t.getSouthEast()
                ];
              }
            });
            function yo(t, n) {
              return new $n(t, n);
            }
            Qt.create = Oe, Qt.pointsToPath = ss, oi.geometryToLayer = xn, oi.coordsToLatLng = zr, oi.coordsToLatLngs = Ae, oi.latLngToCoords = ui, oi.latLngsToCoords = Pi, oi.getFeature = Ti, oi.asFeature = Xn, kt.mergeOptions({
              boxZoom: true
            });
            var en = Ye.extend({
              initialize: function(t) {
                this._map = t, this._container = t._container, this._pane = t._panes.overlayPane, this._resetStateTimeout = 0, t.on("unload", this._destroy, this);
              },
              addHooks: function() {
                vt(this._container, "mousedown", this._onMouseDown, this);
              },
              removeHooks: function() {
                St(this._container, "mousedown", this._onMouseDown, this);
              },
              moved: function() {
                return this._moved;
              },
              _destroy: function() {
                qt(this._pane), delete this._pane;
              },
              _resetState: function() {
                this._resetStateTimeout = 0, this._moved = false;
              },
              _clearDeferredResetState: function() {
                this._resetStateTimeout !== 0 && (clearTimeout(this._resetStateTimeout), this._resetStateTimeout = 0);
              },
              _onMouseDown: function(t) {
                if (!t.shiftKey || t.which !== 1 && t.button !== 1) return false;
                this._clearDeferredResetState(), this._resetState(), gn(), br(), this._startPoint = this._map.mouseEventToContainerPoint(t), vt(document, {
                  contextmenu: Bi,
                  mousemove: this._onMouseMove,
                  mouseup: this._onMouseUp,
                  keydown: this._onKeyDown
                }, this);
              },
              _onMouseMove: function(t) {
                this._moved || (this._moved = true, this._box = Pt("div", "leaflet-zoom-box", this._container), bt(this._container, "leaflet-crosshair"), this._map.fire("boxzoomstart")), this._point = this._map.mouseEventToContainerPoint(t);
                var n = new Mt(this._point, this._startPoint), a = n.getSize();
                Jt(this._box, n.min), this._box.style.width = a.x + "px", this._box.style.height = a.y + "px";
              },
              _finish: function() {
                this._moved && (qt(this._box), Yt(this._container, "leaflet-crosshair")), yn(), wr(), St(document, {
                  contextmenu: Bi,
                  mousemove: this._onMouseMove,
                  mouseup: this._onMouseUp,
                  keydown: this._onKeyDown
                }, this);
              },
              _onMouseUp: function(t) {
                if (!(t.which !== 1 && t.button !== 1) && (this._finish(), !!this._moved)) {
                  this._clearDeferredResetState(), this._resetStateTimeout = setTimeout(M(this._resetState, this), 0);
                  var n = new jt(this._map.containerPointToLatLng(this._startPoint), this._map.containerPointToLatLng(this._point));
                  this._map.fitBounds(n).fire("boxzoomend", {
                    boxZoomBounds: n
                  });
                }
              },
              _onKeyDown: function(t) {
                t.keyCode === 27 && (this._finish(), this._clearDeferredResetState(), this._resetState());
              }
            });
            kt.addInitHook("addHandler", "boxZoom", en), kt.mergeOptions({
              doubleClickZoom: true
            });
            var $s = Ye.extend({
              addHooks: function() {
                this._map.on("dblclick", this._onDoubleClick, this);
              },
              removeHooks: function() {
                this._map.off("dblclick", this._onDoubleClick, this);
              },
              _onDoubleClick: function(t) {
                var n = this._map, a = n.getZoom(), d = n.options.zoomDelta, _ = t.originalEvent.shiftKey ? a - d : a + d;
                n.options.doubleClickZoom === "center" ? n.setZoom(_) : n.setZoomAround(t.containerPoint, _);
              }
            });
            kt.addInitHook("addHandler", "doubleClickZoom", $s), kt.mergeOptions({
              dragging: true,
              inertia: true,
              inertiaDeceleration: 3400,
              inertiaMaxSpeed: 1 / 0,
              easeLinearity: 0.2,
              worldCopyJump: false,
              maxBoundsViscosity: 0
            });
            var ta = Ye.extend({
              addHooks: function() {
                if (!this._draggable) {
                  var t = this._map;
                  this._draggable = new pi(t._mapPane, t._container), this._draggable.on({
                    dragstart: this._onDragStart,
                    drag: this._onDrag,
                    dragend: this._onDragEnd
                  }, this), this._draggable.on("predrag", this._onPreDragLimit, this), t.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this), t.on("zoomend", this._onZoomEnd, this), t.whenReady(this._onZoomEnd, this));
                }
                bt(this._map._container, "leaflet-grab leaflet-touch-drag"), this._draggable.enable(), this._positions = [], this._times = [];
              },
              removeHooks: function() {
                Yt(this._map._container, "leaflet-grab"), Yt(this._map._container, "leaflet-touch-drag"), this._draggable.disable();
              },
              moved: function() {
                return this._draggable && this._draggable._moved;
              },
              moving: function() {
                return this._draggable && this._draggable._moving;
              },
              _onDragStart: function() {
                var t = this._map;
                if (t._stop(), this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
                  var n = Ot(this._map.options.maxBounds);
                  this._offsetLimit = Kt(this._map.latLngToContainerPoint(n.getNorthWest()).multiplyBy(-1), this._map.latLngToContainerPoint(n.getSouthEast()).multiplyBy(-1).add(this._map.getSize())), this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity));
                } else this._offsetLimit = null;
                t.fire("movestart").fire("dragstart"), t.options.inertia && (this._positions = [], this._times = []);
              },
              _onDrag: function(t) {
                if (this._map.options.inertia) {
                  var n = this._lastTime = +/* @__PURE__ */ new Date(), a = this._lastPos = this._draggable._absPos || this._draggable._newPos;
                  this._positions.push(a), this._times.push(n), this._prunePositions(n);
                }
                this._map.fire("move", t).fire("drag", t);
              },
              _prunePositions: function(t) {
                for (; this._positions.length > 1 && t - this._times[0] > 50; ) this._positions.shift(), this._times.shift();
              },
              _onZoomEnd: function() {
                var t = this._map.getSize().divideBy(2), n = this._map.latLngToLayerPoint([
                  0,
                  0
                ]);
                this._initialWorldOffset = n.subtract(t).x, this._worldWidth = this._map.getPixelWorldBounds().getSize().x;
              },
              _viscousLimit: function(t, n) {
                return t - (t - n) * this._viscosity;
              },
              _onPreDragLimit: function() {
                if (!(!this._viscosity || !this._offsetLimit)) {
                  var t = this._draggable._newPos.subtract(this._draggable._startPos), n = this._offsetLimit;
                  t.x < n.min.x && (t.x = this._viscousLimit(t.x, n.min.x)), t.y < n.min.y && (t.y = this._viscousLimit(t.y, n.min.y)), t.x > n.max.x && (t.x = this._viscousLimit(t.x, n.max.x)), t.y > n.max.y && (t.y = this._viscousLimit(t.y, n.max.y)), this._draggable._newPos = this._draggable._startPos.add(t);
                }
              },
              _onPreDragWrap: function() {
                var t = this._worldWidth, n = Math.round(t / 2), a = this._initialWorldOffset, d = this._draggable._newPos.x, _ = (d - n + a) % t + n - a, v = (d + n + a) % t - n - a, P = Math.abs(_ + a) < Math.abs(v + a) ? _ : v;
                this._draggable._absPos = this._draggable._newPos.clone(), this._draggable._newPos.x = P;
              },
              _onDragEnd: function(t) {
                var n = this._map, a = n.options, d = !a.inertia || t.noInertia || this._times.length < 2;
                if (n.fire("dragend", t), d) n.fire("moveend");
                else {
                  this._prunePositions(+/* @__PURE__ */ new Date());
                  var _ = this._lastPos.subtract(this._positions[0]), v = (this._lastTime - this._times[0]) / 1e3, P = a.easeLinearity, U = _.multiplyBy(P / v), q = U.distanceTo([
                    0,
                    0
                  ]), X = Math.min(a.inertiaMaxSpeed, q), at = U.multiplyBy(X / q), ft = X / (a.inertiaDeceleration * P), xt = at.multiplyBy(-ft / 2).round();
                  !xt.x && !xt.y ? n.fire("moveend") : (xt = n._limitOffset(xt, n.options.maxBounds), Ut(function() {
                    n.panBy(xt, {
                      duration: ft,
                      easeLinearity: P,
                      noMoveStart: true,
                      animate: true
                    });
                  }));
                }
              }
            });
            kt.addInitHook("addHandler", "dragging", ta), kt.mergeOptions({
              keyboard: true,
              keyboardPanDelta: 80
            });
            var ea = Ye.extend({
              keyCodes: {
                left: [
                  37
                ],
                right: [
                  39
                ],
                down: [
                  40
                ],
                up: [
                  38
                ],
                zoomIn: [
                  187,
                  107,
                  61,
                  171
                ],
                zoomOut: [
                  189,
                  109,
                  54,
                  173
                ]
              },
              initialize: function(t) {
                this._map = t, this._setPanDelta(t.options.keyboardPanDelta), this._setZoomDelta(t.options.zoomDelta);
              },
              addHooks: function() {
                var t = this._map._container;
                t.tabIndex <= 0 && (t.tabIndex = "0"), vt(t, {
                  focus: this._onFocus,
                  blur: this._onBlur,
                  mousedown: this._onMouseDown
                }, this), this._map.on({
                  focus: this._addHooks,
                  blur: this._removeHooks
                }, this);
              },
              removeHooks: function() {
                this._removeHooks(), St(this._map._container, {
                  focus: this._onFocus,
                  blur: this._onBlur,
                  mousedown: this._onMouseDown
                }, this), this._map.off({
                  focus: this._addHooks,
                  blur: this._removeHooks
                }, this);
              },
              _onMouseDown: function() {
                if (!this._focused) {
                  var t = document.body, n = document.documentElement, a = t.scrollTop || n.scrollTop, d = t.scrollLeft || n.scrollLeft;
                  this._map._container.focus(), window.scrollTo(d, a);
                }
              },
              _onFocus: function() {
                this._focused = true, this._map.fire("focus");
              },
              _onBlur: function() {
                this._focused = false, this._map.fire("blur");
              },
              _setPanDelta: function(t) {
                var n = this._panKeys = {}, a = this.keyCodes, d, _;
                for (d = 0, _ = a.left.length; d < _; d++) n[a.left[d]] = [
                  -1 * t,
                  0
                ];
                for (d = 0, _ = a.right.length; d < _; d++) n[a.right[d]] = [
                  t,
                  0
                ];
                for (d = 0, _ = a.down.length; d < _; d++) n[a.down[d]] = [
                  0,
                  t
                ];
                for (d = 0, _ = a.up.length; d < _; d++) n[a.up[d]] = [
                  0,
                  -1 * t
                ];
              },
              _setZoomDelta: function(t) {
                var n = this._zoomKeys = {}, a = this.keyCodes, d, _;
                for (d = 0, _ = a.zoomIn.length; d < _; d++) n[a.zoomIn[d]] = t;
                for (d = 0, _ = a.zoomOut.length; d < _; d++) n[a.zoomOut[d]] = -t;
              },
              _addHooks: function() {
                vt(document, "keydown", this._onKeyDown, this);
              },
              _removeHooks: function() {
                St(document, "keydown", this._onKeyDown, this);
              },
              _onKeyDown: function(t) {
                if (!(t.altKey || t.ctrlKey || t.metaKey)) {
                  var n = t.keyCode, a = this._map, d;
                  if (n in this._panKeys) {
                    if (!a._panAnim || !a._panAnim._inProgress) if (d = this._panKeys[n], t.shiftKey && (d = dt(d).multiplyBy(3)), a.options.maxBounds && (d = a._limitOffset(dt(d), a.options.maxBounds)), a.options.worldCopyJump) {
                      var _ = a.wrapLatLng(a.unproject(a.project(a.getCenter()).add(d)));
                      a.panTo(_);
                    } else a.panBy(d);
                  } else if (n in this._zoomKeys) a.setZoom(a.getZoom() + (t.shiftKey ? 3 : 1) * this._zoomKeys[n]);
                  else if (n === 27 && a._popup && a._popup.options.closeOnEscapeKey) a.closePopup();
                  else return;
                  Bi(t);
                }
              }
            });
            kt.addInitHook("addHandler", "keyboard", ea), kt.mergeOptions({
              scrollWheelZoom: true,
              wheelDebounceTime: 40,
              wheelPxPerZoomLevel: 60
            });
            var Di = Ye.extend({
              addHooks: function() {
                vt(this._map._container, "wheel", this._onWheelScroll, this), this._delta = 0;
              },
              removeHooks: function() {
                St(this._map._container, "wheel", this._onWheelScroll, this);
              },
              _onWheelScroll: function(t) {
                var n = Ts(t), a = this._map.options.wheelDebounceTime;
                this._delta += n, this._lastMousePos = this._map.mouseEventToContainerPoint(t), this._startTime || (this._startTime = +/* @__PURE__ */ new Date());
                var d = Math.max(a - (+/* @__PURE__ */ new Date() - this._startTime), 0);
                clearTimeout(this._timer), this._timer = setTimeout(M(this._performZoom, this), d), Bi(t);
              },
              _performZoom: function() {
                var t = this._map, n = t.getZoom(), a = this._map.options.zoomSnap || 0;
                t._stop();
                var d = this._delta / (this._map.options.wheelPxPerZoomLevel * 4), _ = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(d)))) / Math.LN2, v = a ? Math.ceil(_ / a) * a : _, P = t._limitZoom(n + (this._delta > 0 ? v : -v)) - n;
                this._delta = 0, this._startTime = null, P && (t.options.scrollWheelZoom === "center" ? t.setZoom(n + P) : t.setZoomAround(this._lastMousePos, n + P));
              }
            });
            kt.addInitHook("addHandler", "scrollWheelZoom", Di);
            var ia = 600;
            kt.mergeOptions({
              tapHold: ct.touchNative && ct.safari && ct.mobile,
              tapTolerance: 15
            });
            var Zr = Ye.extend({
              addHooks: function() {
                vt(this._map._container, "touchstart", this._onDown, this);
              },
              removeHooks: function() {
                St(this._map._container, "touchstart", this._onDown, this);
              },
              _onDown: function(t) {
                if (clearTimeout(this._holdTimeout), t.touches.length === 1) {
                  var n = t.touches[0];
                  this._startPos = this._newPos = new pt(n.clientX, n.clientY), this._holdTimeout = setTimeout(M(function() {
                    this._cancel(), this._isTapValid() && (vt(document, "touchend", ae), vt(document, "touchend touchcancel", this._cancelClickPrevent), this._simulateEvent("contextmenu", n));
                  }, this), ia), vt(document, "touchend touchcancel contextmenu", this._cancel, this), vt(document, "touchmove", this._onMove, this);
                }
              },
              _cancelClickPrevent: function t() {
                St(document, "touchend", ae), St(document, "touchend touchcancel", t);
              },
              _cancel: function() {
                clearTimeout(this._holdTimeout), St(document, "touchend touchcancel contextmenu", this._cancel, this), St(document, "touchmove", this._onMove, this);
              },
              _onMove: function(t) {
                var n = t.touches[0];
                this._newPos = new pt(n.clientX, n.clientY);
              },
              _isTapValid: function() {
                return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
              },
              _simulateEvent: function(t, n) {
                var a = new MouseEvent(t, {
                  bubbles: true,
                  cancelable: true,
                  view: window,
                  screenX: n.screenX,
                  screenY: n.screenY,
                  clientX: n.clientX,
                  clientY: n.clientY
                });
                a._simulated = true, n.target.dispatchEvent(a);
              }
            });
            kt.addInitHook("addHandler", "tapHold", Zr), kt.mergeOptions({
              touchZoom: ct.touch,
              bounceAtZoomLimits: true
            });
            var jr = Ye.extend({
              addHooks: function() {
                bt(this._map._container, "leaflet-touch-zoom"), vt(this._map._container, "touchstart", this._onTouchStart, this);
              },
              removeHooks: function() {
                Yt(this._map._container, "leaflet-touch-zoom"), St(this._map._container, "touchstart", this._onTouchStart, this);
              },
              _onTouchStart: function(t) {
                var n = this._map;
                if (!(!t.touches || t.touches.length !== 2 || n._animatingZoom || this._zooming)) {
                  var a = n.mouseEventToContainerPoint(t.touches[0]), d = n.mouseEventToContainerPoint(t.touches[1]);
                  this._centerPoint = n.getSize()._divideBy(2), this._startLatLng = n.containerPointToLatLng(this._centerPoint), n.options.touchZoom !== "center" && (this._pinchStartLatLng = n.containerPointToLatLng(a.add(d)._divideBy(2))), this._startDist = a.distanceTo(d), this._startZoom = n.getZoom(), this._moved = false, this._zooming = true, n._stop(), vt(document, "touchmove", this._onTouchMove, this), vt(document, "touchend touchcancel", this._onTouchEnd, this), ae(t);
                }
              },
              _onTouchMove: function(t) {
                if (!(!t.touches || t.touches.length !== 2 || !this._zooming)) {
                  var n = this._map, a = n.mouseEventToContainerPoint(t.touches[0]), d = n.mouseEventToContainerPoint(t.touches[1]), _ = a.distanceTo(d) / this._startDist;
                  if (this._zoom = n.getScaleZoom(_, this._startZoom), !n.options.bounceAtZoomLimits && (this._zoom < n.getMinZoom() && _ < 1 || this._zoom > n.getMaxZoom() && _ > 1) && (this._zoom = n._limitZoom(this._zoom)), n.options.touchZoom === "center") {
                    if (this._center = this._startLatLng, _ === 1) return;
                  } else {
                    var v = a._add(d)._divideBy(2)._subtract(this._centerPoint);
                    if (_ === 1 && v.x === 0 && v.y === 0) return;
                    this._center = n.unproject(n.project(this._pinchStartLatLng, this._zoom).subtract(v), this._zoom);
                  }
                  this._moved || (n._moveStart(true, false), this._moved = true), ce(this._animRequest);
                  var P = M(n._move, n, this._center, this._zoom, {
                    pinch: true,
                    round: false
                  }, void 0);
                  this._animRequest = Ut(P, this, true), ae(t);
                }
              },
              _onTouchEnd: function() {
                if (!this._moved || !this._zooming) {
                  this._zooming = false;
                  return;
                }
                this._zooming = false, ce(this._animRequest), St(document, "touchmove", this._onTouchMove, this), St(document, "touchend touchcancel", this._onTouchEnd, this), this._map.options.zoomAnimation ? this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), true, this._map.options.zoomSnap) : this._map._resetView(this._center, this._map._limitZoom(this._zoom));
              }
            });
            kt.addInitHook("addHandler", "touchZoom", jr), kt.BoxZoom = en, kt.DoubleClickZoom = $s, kt.Drag = ta, kt.Keyboard = ea, kt.ScrollWheelZoom = Di, kt.TapHold = Zr, kt.TouchZoom = jr, l.Bounds = Mt, l.Browser = ct, l.CRS = Ge, l.Canvas = Qn, l.Circle = $i, l.CircleMarker = Yn, l.Class = Ue, l.Control = je, l.DivIcon = _i, l.DivOverlay = Qe, l.DomEvent = At, l.DomUtil = $a, l.Draggable = pi, l.Evented = Ei, l.FeatureGroup = Je, l.GeoJSON = oi, l.GridLayer = kn, l.Handler = Ye, l.Icon = Qi, l.ImageOverlay = tn, l.LatLng = Bt, l.LatLngBounds = jt, l.Layer = we, l.LayerGroup = si, l.LineUtil = Vn, l.Map = kt, l.Marker = Kn, l.Mixin = no, l.Path = Ie, l.Point = pt, l.PolyUtil = zs, l.Polygon = me, l.Polyline = ai, l.Popup = En, l.PosAnimation = Ss, l.Projection = Zs, l.Rectangle = $n, l.Renderer = $e, l.SVG = Qt, l.SVGOverlay = Ur, l.TileLayer = mi, l.Tooltip = Jn, l.Transformation = or, l.Util = xi, l.VideoOverlay = Ws, l.bind = M, l.bounds = Kt, l.canvas = Gr, l.circle = lo, l.circleMarker = Or, l.control = Hi, l.divIcon = Mn, l.extend = x, l.featureGroup = oo, l.geoJSON = Hs, l.geoJson = ho, l.gridLayer = Ks, l.icon = uo, l.imageOverlay = co, l.latLng = Ct, l.latLngBounds = Ot, l.layerGroup = Wn, l.map = jn, l.marker = qs, l.point = dt, l.polygon = Fr, l.polyline = Rr, l.popup = _o, l.rectangle = yo, l.setOptions = gt, l.stamp = et, l.svg = Qs, l.svgOverlay = fo, l.tileLayer = Ys, l.tooltip = mo, l.transformation = fn, l.version = g, l.videoOverlay = po;
            var ge = window.L;
            l.noConflict = function() {
              return window.L = ge, this;
            }, window.L = l;
          }));
        })(Qr, Qr.exports)), Qr.exports;
      }
      var Sl = Tl();
      const sn = Bl(Sl);
      var fu = {}, _u;
      function Dl() {
        return _u || (_u = 1, (() => {
          var _a2, _b;
          var h = Object.create, o = Object.defineProperty, l = Object.getOwnPropertyDescriptor, g = Object.getOwnPropertyNames, x = Object.getPrototypeOf, S = Object.prototype.hasOwnProperty, M = (e, i) => () => (i || e((i = {
            exports: {}
          }).exports, i), i.exports), J = (e, i, r, s) => {
            if (i && typeof i == "object" || typeof i == "function") for (let u of g(i)) !S.call(e, u) && u !== r && o(e, u, {
              get: () => i[u],
              enumerable: !(s = l(i, u)) || s.enumerable
            });
            return e;
          }, et = (e, i, r) => (r = e != null ? h(x(e)) : {}, J(i || !e || !e.__esModule ? o(r, "default", {
            value: e,
            enumerable: true
          }) : r, e)), _t = M((e, i) => {
            function r() {
              this.__data__ = [], this.size = 0;
            }
            i.exports = r;
          }), wt = M((e, i) => {
            function r(s, u) {
              return s === u || s !== s && u !== u;
            }
            i.exports = r;
          }), ht = M((e, i) => {
            var r = wt();
            function s(u, c) {
              for (var p = u.length; p--; ) if (r(u[p][0], c)) return p;
              return -1;
            }
            i.exports = s;
          }), Nt = M((e, i) => {
            var r = ht(), s = Array.prototype, u = s.splice;
            function c(p) {
              var f = this.__data__, m = r(f, p);
              if (m < 0) return false;
              var y = f.length - 1;
              return m == y ? f.pop() : u.call(f, m, 1), --this.size, true;
            }
            i.exports = c;
          }), ie = M((e, i) => {
            var r = ht();
            function s(u) {
              var c = this.__data__, p = r(c, u);
              return p < 0 ? void 0 : c[p][1];
            }
            i.exports = s;
          }), ne = M((e, i) => {
            var r = ht();
            function s(u) {
              return r(this.__data__, u) > -1;
            }
            i.exports = s;
          }), gt = M((e, i) => {
            var r = ht();
            function s(u, c) {
              var p = this.__data__, f = r(p, u);
              return f < 0 ? (++this.size, p.push([
                u,
                c
              ])) : p[f][1] = c, this;
            }
            i.exports = s;
          }), le = M((e, i) => {
            var r = _t(), s = Nt(), u = ie(), c = ne(), p = gt();
            function f(m) {
              var y = -1, A = m == null ? 0 : m.length;
              for (this.clear(); ++y < A; ) {
                var C = m[y];
                this.set(C[0], C[1]);
              }
            }
            f.prototype.clear = r, f.prototype.delete = s, f.prototype.get = u, f.prototype.has = c, f.prototype.set = p, i.exports = f;
          }), Zt = M((e, i) => {
            var r = le();
            function s() {
              this.__data__ = new r(), this.size = 0;
            }
            i.exports = s;
          }), yt = M((e, i) => {
            function r(s) {
              var u = this.__data__, c = u.delete(s);
              return this.size = u.size, c;
            }
            i.exports = r;
          }), W = M((e, i) => {
            function r(s) {
              return this.__data__.get(s);
            }
            i.exports = r;
          }), ot = M((e, i) => {
            function r(s) {
              return this.__data__.has(s);
            }
            i.exports = r;
          }), he = M((e, i) => {
            var r = typeof ya == "object" && ya && ya.Object === Object && ya;
            i.exports = r;
          }), Pe = M((e, i) => {
            var r = he(), s = typeof self == "object" && self && self.Object === Object && self, u = r || s || Function("return this")();
            i.exports = u;
          }), Ne = M((e, i) => {
            var r = Pe(), s = r.Symbol;
            i.exports = s;
          }), Ci = M((e, i) => {
            var r = Ne(), s = Object.prototype, u = s.hasOwnProperty, c = s.toString, p = r ? r.toStringTag : void 0;
            function f(m) {
              var y = u.call(m, p), A = m[p];
              try {
                m[p] = void 0;
                var C = true;
              } catch {
              }
              var O = c.call(m);
              return C && (y ? m[p] = A : delete m[p]), O;
            }
            i.exports = f;
          }), li = M((e, i) => {
            var r = Object.prototype, s = r.toString;
            function u(c) {
              return s.call(c);
            }
            i.exports = u;
          }), G = M((e, i) => {
            var r = Ne(), s = Ci(), u = li(), c = "[object Null]", p = "[object Undefined]", f = r ? r.toStringTag : void 0;
            function m(y) {
              return y == null ? y === void 0 ? p : c : f && f in Object(y) ? s(y) : u(y);
            }
            i.exports = m;
          }), Ut = M((e, i) => {
            function r(s) {
              var u = typeof s;
              return s != null && (u == "object" || u == "function");
            }
            i.exports = r;
          }), ce = M((e, i) => {
            var r = G(), s = Ut(), u = "[object AsyncFunction]", c = "[object Function]", p = "[object GeneratorFunction]", f = "[object Proxy]";
            function m(y) {
              if (!s(y)) return false;
              var A = r(y);
              return A == c || A == p || A == u || A == f;
            }
            i.exports = m;
          }), xi = M((e, i) => {
            var r = Pe(), s = r["__core-js_shared__"];
            i.exports = s;
          }), Ue = M((e, i) => {
            var r = xi(), s = (function() {
              var c = /[^.]+$/.exec(r && r.keys && r.keys.IE_PROTO || "");
              return c ? "Symbol(src)_1." + c : "";
            })();
            function u(c) {
              return !!s && s in c;
            }
            i.exports = u;
          }), dn = M((e, i) => {
            var r = Function.prototype, s = r.toString;
            function u(c) {
              if (c != null) {
                try {
                  return s.call(c);
                } catch {
                }
                try {
                  return c + "";
                } catch {
                }
              }
              return "";
            }
            i.exports = u;
          }), _e = M((e, i) => {
            var r = ce(), s = Ue(), u = Ut(), c = dn(), p = /[\\^$.*+?()[\]{}|]/g, f = /^\[object .+?Constructor\]$/, m = Function.prototype, y = Object.prototype, A = m.toString, C = y.hasOwnProperty, O = RegExp("^" + A.call(C).replace(p, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
            function R(H) {
              if (!u(H) || s(H)) return false;
              var K = r(H) ? O : f;
              return K.test(c(H));
            }
            i.exports = R;
          }), Ei = M((e, i) => {
            function r(s, u) {
              return s == null ? void 0 : s[u];
            }
            i.exports = r;
          }), pt = M((e, i) => {
            var r = _e(), s = Ei();
            function u(c, p) {
              var f = s(c, p);
              return r(f) ? f : void 0;
            }
            i.exports = u;
          }), hi = M((e, i) => {
            var r = pt(), s = Pe(), u = r(s, "Map");
            i.exports = u;
          }), dt = M((e, i) => {
            var r = pt(), s = r(Object, "create");
            i.exports = s;
          }), Mt = M((e, i) => {
            var r = dt();
            function s() {
              this.__data__ = r ? r(null) : {}, this.size = 0;
            }
            i.exports = s;
          }), Kt = M((e, i) => {
            function r(s) {
              var u = this.has(s) && delete this.__data__[s];
              return this.size -= u ? 1 : 0, u;
            }
            i.exports = r;
          }), jt = M((e, i) => {
            var r = dt(), s = "__lodash_hash_undefined__", u = Object.prototype, c = u.hasOwnProperty;
            function p(f) {
              var m = this.__data__;
              if (r) {
                var y = m[f];
                return y === s ? void 0 : y;
              }
              return c.call(m, f) ? m[f] : void 0;
            }
            i.exports = p;
          }), Ot = M((e, i) => {
            var r = dt(), s = Object.prototype, u = s.hasOwnProperty;
            function c(p) {
              var f = this.__data__;
              return r ? f[p] !== void 0 : u.call(f, p);
            }
            i.exports = c;
          }), Bt = M((e, i) => {
            var r = dt(), s = "__lodash_hash_undefined__";
            function u(c, p) {
              var f = this.__data__;
              return this.size += this.has(c) ? 0 : 1, f[c] = r && p === void 0 ? s : p, this;
            }
            i.exports = u;
          }), Ct = M((e, i) => {
            var r = Mt(), s = Kt(), u = jt(), c = Ot(), p = Bt();
            function f(m) {
              var y = -1, A = m == null ? 0 : m.length;
              for (this.clear(); ++y < A; ) {
                var C = m[y];
                this.set(C[0], C[1]);
              }
            }
            f.prototype.clear = r, f.prototype.delete = s, f.prototype.get = u, f.prototype.has = c, f.prototype.set = p, i.exports = f;
          }), Ge = M((e, i) => {
            var r = Ct(), s = le(), u = hi();
            function c() {
              this.size = 0, this.__data__ = {
                hash: new r(),
                map: new (u || s)(),
                string: new r()
              };
            }
            i.exports = c;
          }), We = M((e, i) => {
            function r(s) {
              var u = typeof s;
              return u == "string" || u == "number" || u == "symbol" || u == "boolean" ? s !== "__proto__" : s === null;
            }
            i.exports = r;
          }), pn = M((e, i) => {
            var r = We();
            function s(u, c) {
              var p = u.__data__;
              return r(c) ? p[typeof c == "string" ? "string" : "hash"] : p.map;
            }
            i.exports = s;
          }), ar = M((e, i) => {
            var r = pn();
            function s(u) {
              var c = r(this, u).delete(u);
              return this.size -= c ? 1 : 0, c;
            }
            i.exports = s;
          }), or = M((e, i) => {
            var r = pn();
            function s(u) {
              return r(this, u).get(u);
            }
            i.exports = s;
          }), fn = M((e, i) => {
            var r = pn();
            function s(u) {
              return r(this, u).has(u);
            }
            i.exports = s;
          }), ur = M((e, i) => {
            var r = pn();
            function s(u, c) {
              var p = r(this, u), f = p.size;
              return p.set(u, c), this.size += p.size == f ? 0 : 1, this;
            }
            i.exports = s;
          }), ns = M((e, i) => {
            var r = Ge(), s = ar(), u = or(), c = fn(), p = ur();
            function f(m) {
              var y = -1, A = m == null ? 0 : m.length;
              for (this.clear(); ++y < A; ) {
                var C = m[y];
                this.set(C[0], C[1]);
              }
            }
            f.prototype.clear = r, f.prototype.delete = s, f.prototype.get = u, f.prototype.has = c, f.prototype.set = p, i.exports = f;
          }), rs = M((e, i) => {
            var r = le(), s = hi(), u = ns(), c = 200;
            function p(f, m) {
              var y = this.__data__;
              if (y instanceof r) {
                var A = y.__data__;
                if (!s || A.length < c - 1) return A.push([
                  f,
                  m
                ]), this.size = ++y.size, this;
                y = this.__data__ = new u(A);
              }
              return y.set(f, m), this.size = y.size, this;
            }
            i.exports = p;
          }), ss = M((e, i) => {
            var r = le(), s = Zt(), u = yt(), c = W(), p = ot(), f = rs();
            function m(y) {
              var A = this.__data__ = new r(y);
              this.size = A.size;
            }
            m.prototype.clear = s, m.prototype.delete = u, m.prototype.get = c, m.prototype.has = p, m.prototype.set = f, i.exports = m;
          }), In = M((e, i) => {
            var r = pt(), s = (function() {
              try {
                var u = r(Object, "defineProperty");
                return u({}, "", {}), u;
              } catch {
              }
            })();
            i.exports = s;
          }), Ui = M((e, i) => {
            var r = In();
            function s(u, c, p) {
              c == "__proto__" && r ? r(u, c, {
                configurable: true,
                enumerable: true,
                value: p,
                writable: true
              }) : u[c] = p;
            }
            i.exports = s;
          }), as = M((e, i) => {
            var r = Ui(), s = wt();
            function u(c, p, f) {
              (f !== void 0 && !s(c[p], f) || f === void 0 && !(p in c)) && r(c, p, f);
            }
            i.exports = u;
          }), os = M((e, i) => {
            function r(s) {
              return function(u, c, p) {
                for (var f = -1, m = Object(u), y = p(u), A = y.length; A--; ) {
                  var C = y[s ? A : ++f];
                  if (c(m[C], C, m) === false) break;
                }
                return u;
              };
            }
            i.exports = r;
          }), lr = M((e, i) => {
            var r = os(), s = r();
            i.exports = s;
          }), us = M((e, i) => {
            var r = Pe(), s = typeof e == "object" && e && !e.nodeType && e, u = s && typeof i == "object" && i && !i.nodeType && i, c = u && u.exports === s, p = c ? r.Buffer : void 0, f = p ? p.allocUnsafe : void 0;
            function m(y, A) {
              if (A) return y.slice();
              var C = y.length, O = f ? f(C) : new y.constructor(C);
              return y.copy(O), O;
            }
            i.exports = m;
          }), ls = M((e, i) => {
            var r = Pe(), s = r.Uint8Array;
            i.exports = s;
          }), Sa = M((e, i) => {
            var r = ls();
            function s(u) {
              var c = new u.constructor(u.byteLength);
              return new r(c).set(new r(u)), c;
            }
            i.exports = s;
          }), Da = M((e, i) => {
            var r = Sa();
            function s(u, c) {
              var p = c ? r(u.buffer) : u.buffer;
              return new u.constructor(p, u.byteOffset, u.length);
            }
            i.exports = s;
          }), hr = M((e, i) => {
            function r(s, u) {
              var c = -1, p = s.length;
              for (u || (u = Array(p)); ++c < p; ) u[c] = s[c];
              return u;
            }
            i.exports = r;
          }), hs = M((e, i) => {
            var r = Ut(), s = Object.create, u = /* @__PURE__ */ (function() {
              function c() {
              }
              return function(p) {
                if (!r(p)) return {};
                if (s) return s(p);
                c.prototype = p;
                var f = new c();
                return c.prototype = void 0, f;
              };
            })();
            i.exports = u;
          }), cs = M((e, i) => {
            function r(s, u) {
              return function(c) {
                return s(u(c));
              };
            }
            i.exports = r;
          }), ds = M((e, i) => {
            var r = cs(), s = r(Object.getPrototypeOf, Object);
            i.exports = s;
          }), cr = M((e, i) => {
            var r = Object.prototype;
            function s(u) {
              var c = u && u.constructor, p = typeof c == "function" && c.prototype || r;
              return u === p;
            }
            i.exports = s;
          }), ps = M((e, i) => {
            var r = hs(), s = ds(), u = cr();
            function c(p) {
              return typeof p.constructor == "function" && !u(p) ? r(s(p)) : {};
            }
            i.exports = c;
          }), Gi = M((e, i) => {
            function r(s) {
              return s != null && typeof s == "object";
            }
            i.exports = r;
          }), fs = M((e, i) => {
            var r = G(), s = Gi(), u = "[object Arguments]";
            function c(p) {
              return s(p) && r(p) == u;
            }
            i.exports = c;
          }), On = M((e, i) => {
            var r = fs(), s = Gi(), u = Object.prototype, c = u.hasOwnProperty, p = u.propertyIsEnumerable, f = r(/* @__PURE__ */ (function() {
              return arguments;
            })()) ? r : function(m) {
              return s(m) && c.call(m, "callee") && !p.call(m, "callee");
            };
            i.exports = f;
          }), Zi = M((e, i) => {
            var r = Array.isArray;
            i.exports = r;
          }), _s = M((e, i) => {
            var r = 9007199254740991;
            function s(u) {
              return typeof u == "number" && u > -1 && u % 1 == 0 && u <= r;
            }
            i.exports = s;
          }), Mi = M((e, i) => {
            var r = ce(), s = _s();
            function u(c) {
              return c != null && s(c.length) && !r(c);
            }
            i.exports = u;
          }), Ia = M((e, i) => {
            var r = Mi(), s = Gi();
            function u(c) {
              return s(c) && r(c);
            }
            i.exports = u;
          }), Oa = M((e, i) => {
            function r() {
              return false;
            }
            i.exports = r;
          }), dr = M((e, i) => {
            var r = Pe(), s = Oa(), u = typeof e == "object" && e && !e.nodeType && e, c = u && typeof i == "object" && i && !i.nodeType && i, p = c && c.exports === u, f = p ? r.Buffer : void 0, m = f ? f.isBuffer : void 0, y = m || s;
            i.exports = y;
          }), ms = M((e, i) => {
            var r = G(), s = ds(), u = Gi(), c = "[object Object]", p = Function.prototype, f = Object.prototype, m = p.toString, y = f.hasOwnProperty, A = m.call(Object);
            function C(O) {
              if (!u(O) || r(O) != c) return false;
              var R = s(O);
              if (R === null) return true;
              var H = y.call(R, "constructor") && R.constructor;
              return typeof H == "function" && H instanceof H && m.call(H) == A;
            }
            i.exports = C;
          }), gs = M((e, i) => {
            var r = G(), s = _s(), u = Gi(), c = "[object Arguments]", p = "[object Array]", f = "[object Boolean]", m = "[object Date]", y = "[object Error]", A = "[object Function]", C = "[object Map]", O = "[object Number]", R = "[object Object]", H = "[object RegExp]", K = "[object Set]", it = "[object String]", st = "[object WeakMap]", k = "[object ArrayBuffer]", z = "[object DataView]", V = "[object Float32Array]", tt = "[object Float64Array]", Q = "[object Int8Array]", $ = "[object Int16Array]", b = "[object Int32Array]", w = "[object Uint8Array]", E = "[object Uint8ClampedArray]", D = "[object Uint16Array]", T = "[object Uint32Array]", B = {};
            B[V] = B[tt] = B[Q] = B[$] = B[b] = B[w] = B[E] = B[D] = B[T] = true, B[c] = B[p] = B[k] = B[f] = B[z] = B[m] = B[y] = B[A] = B[C] = B[O] = B[R] = B[H] = B[K] = B[it] = B[st] = false;
            function N(I) {
              return u(I) && s(I.length) && !!B[r(I)];
            }
            i.exports = N;
          }), Ra = M((e, i) => {
            function r(s) {
              return function(u) {
                return s(u);
              };
            }
            i.exports = r;
          }), Fa = M((e, i) => {
            var r = he(), s = typeof e == "object" && e && !e.nodeType && e, u = s && typeof i == "object" && i && !i.nodeType && i, c = u && u.exports === s, p = c && r.process, f = (function() {
              try {
                var m = u && u.require && u.require("util").types;
                return m || p && p.binding && p.binding("util");
              } catch {
              }
            })();
            i.exports = f;
          }), ys = M((e, i) => {
            var r = gs(), s = Ra(), u = Fa(), c = u && u.isTypedArray, p = c ? s(c) : r;
            i.exports = p;
          }), vs = M((e, i) => {
            function r(s, u) {
              if (!(u === "constructor" && typeof s[u] == "function") && u != "__proto__") return s[u];
            }
            i.exports = r;
          }), za = M((e, i) => {
            var r = Ui(), s = wt(), u = Object.prototype, c = u.hasOwnProperty;
            function p(f, m, y) {
              var A = f[m];
              (!(c.call(f, m) && s(A, y)) || y === void 0 && !(m in f)) && r(f, m, y);
            }
            i.exports = p;
          }), Na = M((e, i) => {
            var r = za(), s = Ui();
            function u(c, p, f, m) {
              var y = !f;
              f || (f = {});
              for (var A = -1, C = p.length; ++A < C; ) {
                var O = p[A], R = m ? m(f[O], c[O], O, f, c) : void 0;
                R === void 0 && (R = c[O]), y ? s(f, O, R) : r(f, O, R);
              }
              return f;
            }
            i.exports = u;
          }), pr = M((e, i) => {
            function r(s, u) {
              for (var c = -1, p = Array(s); ++c < s; ) p[c] = u(c);
              return p;
            }
            i.exports = r;
          }), Ls = M((e, i) => {
            var r = 9007199254740991, s = /^(?:0|[1-9]\d*)$/;
            function u(c, p) {
              var f = typeof c;
              return p = p ?? r, !!p && (f == "number" || f != "symbol" && s.test(c)) && c > -1 && c % 1 == 0 && c < p;
            }
            i.exports = u;
          }), Ua = M((e, i) => {
            var r = pr(), s = On(), u = Zi(), c = dr(), p = Ls(), f = ys(), m = Object.prototype, y = m.hasOwnProperty;
            function A(C, O) {
              var R = u(C), H = !R && s(C), K = !R && !H && c(C), it = !R && !H && !K && f(C), st = R || H || K || it, k = st ? r(C.length, String) : [], z = k.length;
              for (var V in C) (O || y.call(C, V)) && !(st && (V == "length" || K && (V == "offset" || V == "parent") || it && (V == "buffer" || V == "byteLength" || V == "byteOffset") || p(V, z))) && k.push(V);
              return k;
            }
            i.exports = A;
          }), Ga = M((e, i) => {
            function r(s) {
              var u = [];
              if (s != null) for (var c in Object(s)) u.push(c);
              return u;
            }
            i.exports = r;
          }), Za = M((e, i) => {
            var r = Ut(), s = cr(), u = Ga(), c = Object.prototype, p = c.hasOwnProperty;
            function f(m) {
              if (!r(m)) return u(m);
              var y = s(m), A = [];
              for (var C in m) C == "constructor" && (y || !p.call(m, C)) || A.push(C);
              return A;
            }
            i.exports = f;
          }), Ze = M((e, i) => {
            var r = Ua(), s = Za(), u = Mi();
            function c(p) {
              return u(p) ? r(p, true) : s(p);
            }
            i.exports = c;
          }), ct = M((e, i) => {
            var r = Na(), s = Ze();
            function u(c) {
              return r(c, s(c));
            }
            i.exports = u;
          }), bs = M((e, i) => {
            var r = as(), s = us(), u = Da(), c = hr(), p = ps(), f = On(), m = Zi(), y = Ia(), A = dr(), C = ce(), O = Ut(), R = ms(), H = ys(), K = vs(), it = ct();
            function st(k, z, V, tt, Q, $, b) {
              var w = K(k, V), E = K(z, V), D = b.get(E);
              if (D) {
                r(k, V, D);
                return;
              }
              var T = $ ? $(w, E, V + "", k, z, b) : void 0, B = T === void 0;
              if (B) {
                var N = m(E), I = !N && A(E), F = !N && !I && H(E);
                T = E, N || I || F ? m(w) ? T = w : y(w) ? T = c(w) : I ? (B = false, T = s(E, true)) : F ? (B = false, T = u(E, true)) : T = [] : R(E) || f(E) ? (T = w, f(w) ? T = it(w) : (!O(w) || C(w)) && (T = p(E))) : B = false;
              }
              B && (b.set(E, T), Q(T, E, tt, $, b), b.delete(E)), r(k, V, T);
            }
            i.exports = st;
          }), ws = M((e, i) => {
            var r = ss(), s = as(), u = lr(), c = bs(), p = Ut(), f = Ze(), m = vs();
            function y(A, C, O, R, H) {
              A !== C && u(C, function(K, it) {
                if (H || (H = new r()), p(K)) c(A, C, it, O, y, R, H);
                else {
                  var st = R ? R(m(A, it), K, it + "", A, C, H) : void 0;
                  st === void 0 && (st = K), s(A, it, st);
                }
              }, f);
            }
            i.exports = y;
          }), fr = M((e, i) => {
            function r(s) {
              return s;
            }
            i.exports = r;
          }), Cs = M((e, i) => {
            function r(s, u, c) {
              switch (c.length) {
                case 0:
                  return s.call(u);
                case 1:
                  return s.call(u, c[0]);
                case 2:
                  return s.call(u, c[0], c[1]);
                case 3:
                  return s.call(u, c[0], c[1], c[2]);
              }
              return s.apply(u, c);
            }
            i.exports = r;
          }), _r = M((e, i) => {
            var r = Cs(), s = Math.max;
            function u(c, p, f) {
              return p = s(p === void 0 ? c.length - 1 : p, 0), function() {
                for (var m = arguments, y = -1, A = s(m.length - p, 0), C = Array(A); ++y < A; ) C[y] = m[p + y];
                y = -1;
                for (var O = Array(p + 1); ++y < p; ) O[y] = m[y];
                return O[p] = f(C), r(c, this, O);
              };
            }
            i.exports = u;
          }), xs = M((e, i) => {
            function r(s) {
              return function() {
                return s;
              };
            }
            i.exports = r;
          }), ji = M((e, i) => {
            var r = xs(), s = In(), u = fr(), c = s ? function(p, f) {
              return s(p, "toString", {
                configurable: true,
                enumerable: false,
                value: r(f),
                writable: true
              });
            } : u;
            i.exports = c;
          }), Es = M((e, i) => {
            var r = 800, s = 16, u = Date.now;
            function c(p) {
              var f = 0, m = 0;
              return function() {
                var y = u(), A = s - (y - m);
                if (m = y, A > 0) {
                  if (++f >= r) return arguments[0];
                } else f = 0;
                return p.apply(void 0, arguments);
              };
            }
            i.exports = c;
          }), ja = M((e, i) => {
            var r = ji(), s = Es(), u = s(r);
            i.exports = u;
          }), qa = M((e, i) => {
            var r = fr(), s = _r(), u = ja();
            function c(p, f) {
              return u(s(p, f, r), p + "");
            }
            i.exports = c;
          }), Va = M((e, i) => {
            var r = wt(), s = Mi(), u = Ls(), c = Ut();
            function p(f, m, y) {
              if (!c(y)) return false;
              var A = typeof m;
              return (A == "number" ? s(y) && u(m, y.length) : A == "string" && m in y) ? r(y[m], f) : false;
            }
            i.exports = p;
          }), Ha = M((e, i) => {
            var r = qa(), s = Va();
            function u(c) {
              return r(function(p, f) {
                var m = -1, y = f.length, A = y > 1 ? f[y - 1] : void 0, C = y > 2 ? f[2] : void 0;
                for (A = c.length > 3 && typeof A == "function" ? (y--, A) : void 0, C && s(f[0], f[1], C) && (A = y < 3 ? void 0 : A, y = 1), p = Object(p); ++m < y; ) {
                  var O = f[m];
                  O && c(p, O, m, A);
                }
                return p;
              });
            }
            i.exports = u;
          }), Rn = M((e, i) => {
            var r = ws(), s = Ha(), u = s(function(c, p, f) {
              r(c, p, f);
            });
            i.exports = u;
          }), mr = M((e, i) => {
            var r = G(), s = Gi(), u = "[object Symbol]";
            function c(p) {
              return typeof p == "symbol" || s(p) && r(p) == u;
            }
            i.exports = c;
          }), Fn = M((e, i) => {
            var r = Zi(), s = mr(), u = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, c = /^\w*$/;
            function p(f, m) {
              if (r(f)) return false;
              var y = typeof f;
              return y == "number" || y == "symbol" || y == "boolean" || f == null || s(f) ? true : c.test(f) || !u.test(f) || m != null && f in Object(m);
            }
            i.exports = p;
          }), Wa = M((e, i) => {
            var r = ns(), s = "Expected a function";
            function u(c, p) {
              if (typeof c != "function" || p != null && typeof p != "function") throw new TypeError(s);
              var f = function() {
                var m = arguments, y = p ? p.apply(this, m) : m[0], A = f.cache;
                if (A.has(y)) return A.get(y);
                var C = c.apply(this, m);
                return f.cache = A.set(y, C) || A, C;
              };
              return f.cache = new (u.Cache || r)(), f;
            }
            u.Cache = r, i.exports = u;
          }), Ka = M((e, i) => {
            var r = Wa(), s = 500;
            function u(c) {
              var p = r(c, function(m) {
                return f.size === s && f.clear(), m;
              }), f = p.cache;
              return p;
            }
            i.exports = u;
          }), Ya = M((e, i) => {
            var r = Ka(), s = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, u = /\\(\\)?/g, c = r(function(p) {
              var f = [];
              return p.charCodeAt(0) === 46 && f.push(""), p.replace(s, function(m, y, A, C) {
                f.push(A ? C.replace(u, "$1") : y || m);
              }), f;
            });
            i.exports = c;
          }), Xa = M((e, i) => {
            function r(s, u) {
              for (var c = -1, p = s == null ? 0 : s.length, f = Array(p); ++c < p; ) f[c] = u(s[c], c, s);
              return f;
            }
            i.exports = r;
          }), Ja = M((e, i) => {
            var r = Ne(), s = Xa(), u = Zi(), c = mr(), p = r ? r.prototype : void 0, f = p ? p.toString : void 0;
            function m(y) {
              if (typeof y == "string") return y;
              if (u(y)) return s(y, m) + "";
              if (c(y)) return f ? f.call(y) : "";
              var A = y + "";
              return A == "0" && 1 / y == -1 / 0 ? "-0" : A;
            }
            i.exports = m;
          }), gr = M((e, i) => {
            var r = Ja();
            function s(u) {
              return u == null ? "" : r(u);
            }
            i.exports = s;
          }), _n = M((e, i) => {
            var r = Zi(), s = Fn(), u = Ya(), c = gr();
            function p(f, m) {
              return r(f) ? f : s(f, m) ? [
                f
              ] : u(c(f));
            }
            i.exports = p;
          }), Ms = M((e, i) => {
            var r = mr();
            function s(u) {
              if (typeof u == "string" || r(u)) return u;
              var c = u + "";
              return c == "0" && 1 / u == -1 / 0 ? "-0" : c;
            }
            i.exports = s;
          }), ks = M((e, i) => {
            var r = _n(), s = Ms();
            function u(c, p) {
              p = r(p, c);
              for (var f = 0, m = p.length; c != null && f < m; ) c = c[s(p[f++])];
              return f && f == m ? c : void 0;
            }
            i.exports = u;
          }), ci = M((e, i) => {
            var r = ks();
            function s(u, c, p) {
              var f = u == null ? void 0 : r(u, c);
              return f === void 0 ? p : f;
            }
            i.exports = s;
          }), Pt = M((e, i) => {
            (function(r, s) {
              typeof e == "object" && typeof i < "u" ? i.exports = s() : (r = r || self).RBush = s();
            })(e, function() {
              function r(k, z, V, tt, Q) {
                (function $(b, w, E, D, T) {
                  for (; D > E; ) {
                    if (D - E > 600) {
                      var B = D - E + 1, N = w - E + 1, I = Math.log(B), F = 0.5 * Math.exp(2 * I / 3), j = 0.5 * Math.sqrt(I * F * (B - F) / B) * (N - B / 2 < 0 ? -1 : 1), Z = Math.max(E, Math.floor(w - N * F / B + j)), Y = Math.min(D, Math.floor(w + (B - N) * F / B + j));
                      $(b, w, Z, Y, T);
                    }
                    var ut = b[w], lt = E, Lt = D;
                    for (s(b, E, w), T(b[D], ut) > 0 && s(b, E, D); lt < Lt; ) {
                      for (s(b, lt, Lt), lt++, Lt--; T(b[lt], ut) < 0; ) lt++;
                      for (; T(b[Lt], ut) > 0; ) Lt--;
                    }
                    T(b[E], ut) === 0 ? s(b, E, Lt) : s(b, ++Lt, D), Lt <= w && (E = Lt + 1), w <= Lt && (D = Lt - 1);
                  }
                })(k, z, V || 0, tt || k.length - 1, Q || u);
              }
              function s(k, z, V) {
                var tt = k[z];
                k[z] = k[V], k[V] = tt;
              }
              function u(k, z) {
                return k < z ? -1 : k > z ? 1 : 0;
              }
              var c = function(k) {
                k === void 0 && (k = 9), this._maxEntries = Math.max(4, k), this._minEntries = Math.max(2, Math.ceil(0.4 * this._maxEntries)), this.clear();
              };
              function p(k, z, V) {
                if (!V) return z.indexOf(k);
                for (var tt = 0; tt < z.length; tt++) if (V(k, z[tt])) return tt;
                return -1;
              }
              function f(k, z) {
                m(k, 0, k.children.length, z, k);
              }
              function m(k, z, V, tt, Q) {
                Q || (Q = it(null)), Q.minX = 1 / 0, Q.minY = 1 / 0, Q.maxX = -1 / 0, Q.maxY = -1 / 0;
                for (var $ = z; $ < V; $++) {
                  var b = k.children[$];
                  y(Q, k.leaf ? tt(b) : b);
                }
                return Q;
              }
              function y(k, z) {
                return k.minX = Math.min(k.minX, z.minX), k.minY = Math.min(k.minY, z.minY), k.maxX = Math.max(k.maxX, z.maxX), k.maxY = Math.max(k.maxY, z.maxY), k;
              }
              function A(k, z) {
                return k.minX - z.minX;
              }
              function C(k, z) {
                return k.minY - z.minY;
              }
              function O(k) {
                return (k.maxX - k.minX) * (k.maxY - k.minY);
              }
              function R(k) {
                return k.maxX - k.minX + (k.maxY - k.minY);
              }
              function H(k, z) {
                return k.minX <= z.minX && k.minY <= z.minY && z.maxX <= k.maxX && z.maxY <= k.maxY;
              }
              function K(k, z) {
                return z.minX <= k.maxX && z.minY <= k.maxY && z.maxX >= k.minX && z.maxY >= k.minY;
              }
              function it(k) {
                return {
                  children: k,
                  height: 1,
                  leaf: true,
                  minX: 1 / 0,
                  minY: 1 / 0,
                  maxX: -1 / 0,
                  maxY: -1 / 0
                };
              }
              function st(k, z, V, tt, Q) {
                for (var $ = [
                  z,
                  V
                ]; $.length; ) if (!((V = $.pop()) - (z = $.pop()) <= tt)) {
                  var b = z + Math.ceil((V - z) / tt / 2) * tt;
                  r(k, b, z, V, Q), $.push(z, b, b, V);
                }
              }
              return c.prototype.all = function() {
                return this._all(this.data, []);
              }, c.prototype.search = function(k) {
                var z = this.data, V = [];
                if (!K(k, z)) return V;
                for (var tt = this.toBBox, Q = []; z; ) {
                  for (var $ = 0; $ < z.children.length; $++) {
                    var b = z.children[$], w = z.leaf ? tt(b) : b;
                    K(k, w) && (z.leaf ? V.push(b) : H(k, w) ? this._all(b, V) : Q.push(b));
                  }
                  z = Q.pop();
                }
                return V;
              }, c.prototype.collides = function(k) {
                var z = this.data;
                if (!K(k, z)) return false;
                for (var V = []; z; ) {
                  for (var tt = 0; tt < z.children.length; tt++) {
                    var Q = z.children[tt], $ = z.leaf ? this.toBBox(Q) : Q;
                    if (K(k, $)) {
                      if (z.leaf || H(k, $)) return true;
                      V.push(Q);
                    }
                  }
                  z = V.pop();
                }
                return false;
              }, c.prototype.load = function(k) {
                if (!k || !k.length) return this;
                if (k.length < this._minEntries) {
                  for (var z = 0; z < k.length; z++) this.insert(k[z]);
                  return this;
                }
                var V = this._build(k.slice(), 0, k.length - 1, 0);
                if (this.data.children.length) if (this.data.height === V.height) this._splitRoot(this.data, V);
                else {
                  if (this.data.height < V.height) {
                    var tt = this.data;
                    this.data = V, V = tt;
                  }
                  this._insert(V, this.data.height - V.height - 1, true);
                }
                else this.data = V;
                return this;
              }, c.prototype.insert = function(k) {
                return k && this._insert(k, this.data.height - 1), this;
              }, c.prototype.clear = function() {
                return this.data = it([]), this;
              }, c.prototype.remove = function(k, z) {
                if (!k) return this;
                for (var V, tt, Q, $ = this.data, b = this.toBBox(k), w = [], E = []; $ || w.length; ) {
                  if ($ || ($ = w.pop(), tt = w[w.length - 1], V = E.pop(), Q = true), $.leaf) {
                    var D = p(k, $.children, z);
                    if (D !== -1) return $.children.splice(D, 1), w.push($), this._condense(w), this;
                  }
                  Q || $.leaf || !H($, b) ? tt ? (V++, $ = tt.children[V], Q = false) : $ = null : (w.push($), E.push(V), V = 0, tt = $, $ = $.children[0]);
                }
                return this;
              }, c.prototype.toBBox = function(k) {
                return k;
              }, c.prototype.compareMinX = function(k, z) {
                return k.minX - z.minX;
              }, c.prototype.compareMinY = function(k, z) {
                return k.minY - z.minY;
              }, c.prototype.toJSON = function() {
                return this.data;
              }, c.prototype.fromJSON = function(k) {
                return this.data = k, this;
              }, c.prototype._all = function(k, z) {
                for (var V = []; k; ) k.leaf ? z.push.apply(z, k.children) : V.push.apply(V, k.children), k = V.pop();
                return z;
              }, c.prototype._build = function(k, z, V, tt) {
                var Q, $ = V - z + 1, b = this._maxEntries;
                if ($ <= b) return f(Q = it(k.slice(z, V + 1)), this.toBBox), Q;
                tt || (tt = Math.ceil(Math.log($) / Math.log(b)), b = Math.ceil($ / Math.pow(b, tt - 1))), (Q = it([])).leaf = false, Q.height = tt;
                var w = Math.ceil($ / b), E = w * Math.ceil(Math.sqrt(b));
                st(k, z, V, E, this.compareMinX);
                for (var D = z; D <= V; D += E) {
                  var T = Math.min(D + E - 1, V);
                  st(k, D, T, w, this.compareMinY);
                  for (var B = D; B <= T; B += w) {
                    var N = Math.min(B + w - 1, T);
                    Q.children.push(this._build(k, B, N, tt - 1));
                  }
                }
                return f(Q, this.toBBox), Q;
              }, c.prototype._chooseSubtree = function(k, z, V, tt) {
                for (; tt.push(z), !z.leaf && tt.length - 1 !== V; ) {
                  for (var Q = 1 / 0, $ = 1 / 0, b = void 0, w = 0; w < z.children.length; w++) {
                    var E = z.children[w], D = O(E), T = (B = k, N = E, (Math.max(N.maxX, B.maxX) - Math.min(N.minX, B.minX)) * (Math.max(N.maxY, B.maxY) - Math.min(N.minY, B.minY)) - D);
                    T < $ ? ($ = T, Q = D < Q ? D : Q, b = E) : T === $ && D < Q && (Q = D, b = E);
                  }
                  z = b || z.children[0];
                }
                var B, N;
                return z;
              }, c.prototype._insert = function(k, z, V) {
                var tt = V ? k : this.toBBox(k), Q = [], $ = this._chooseSubtree(tt, this.data, z, Q);
                for ($.children.push(k), y($, tt); z >= 0 && Q[z].children.length > this._maxEntries; ) this._split(Q, z), z--;
                this._adjustParentBBoxes(tt, Q, z);
              }, c.prototype._split = function(k, z) {
                var V = k[z], tt = V.children.length, Q = this._minEntries;
                this._chooseSplitAxis(V, Q, tt);
                var $ = this._chooseSplitIndex(V, Q, tt), b = it(V.children.splice($, V.children.length - $));
                b.height = V.height, b.leaf = V.leaf, f(V, this.toBBox), f(b, this.toBBox), z ? k[z - 1].children.push(b) : this._splitRoot(V, b);
              }, c.prototype._splitRoot = function(k, z) {
                this.data = it([
                  k,
                  z
                ]), this.data.height = k.height + 1, this.data.leaf = false, f(this.data, this.toBBox);
              }, c.prototype._chooseSplitIndex = function(k, z, V) {
                for (var tt, Q, $, b, w, E, D, T = 1 / 0, B = 1 / 0, N = z; N <= V - z; N++) {
                  var I = m(k, 0, N, this.toBBox), F = m(k, N, V, this.toBBox), j = (Q = I, $ = F, b = void 0, w = void 0, E = void 0, D = void 0, b = Math.max(Q.minX, $.minX), w = Math.max(Q.minY, $.minY), E = Math.min(Q.maxX, $.maxX), D = Math.min(Q.maxY, $.maxY), Math.max(0, E - b) * Math.max(0, D - w)), Z = O(I) + O(F);
                  j < T ? (T = j, tt = N, B = Z < B ? Z : B) : j === T && Z < B && (B = Z, tt = N);
                }
                return tt || V - z;
              }, c.prototype._chooseSplitAxis = function(k, z, V) {
                var tt = k.leaf ? this.compareMinX : A, Q = k.leaf ? this.compareMinY : C;
                this._allDistMargin(k, z, V, tt) < this._allDistMargin(k, z, V, Q) && k.children.sort(tt);
              }, c.prototype._allDistMargin = function(k, z, V, tt) {
                k.children.sort(tt);
                for (var Q = this.toBBox, $ = m(k, 0, z, Q), b = m(k, V - z, V, Q), w = R($) + R(b), E = z; E < V - z; E++) {
                  var D = k.children[E];
                  y($, k.leaf ? Q(D) : D), w += R($);
                }
                for (var T = V - z - 1; T >= z; T--) {
                  var B = k.children[T];
                  y(b, k.leaf ? Q(B) : B), w += R(b);
                }
                return w;
              }, c.prototype._adjustParentBBoxes = function(k, z, V) {
                for (var tt = V; tt >= 0; tt--) y(z[tt], k);
              }, c.prototype._condense = function(k) {
                for (var z = k.length - 1, V = void 0; z >= 0; z--) k[z].children.length === 0 ? z > 0 ? (V = k[z - 1].children).splice(V.indexOf(k[z]), 1) : this.clear() : f(k[z], this.toBBox);
              }, c;
            });
          });
          Array.prototype.findIndex = Array.prototype.findIndex || function(e) {
            if (this === null) throw new TypeError("Array.prototype.findIndex called on null or undefined");
            if (typeof e != "function") throw new TypeError("callback must be a function");
            for (var i = Object(this), r = i.length >>> 0, s = arguments[1], u = 0; u < r; u++) if (e.call(s, i[u], u, i)) return u;
            return -1;
          }, Array.prototype.find = Array.prototype.find || function(e) {
            if (this === null) throw new TypeError("Array.prototype.find called on null or undefined");
            if (typeof e != "function") throw new TypeError("callback must be a function");
            for (var i = Object(this), r = i.length >>> 0, s = arguments[1], u = 0; u < r; u++) {
              var c = i[u];
              if (e.call(s, c, u, i)) return c;
            }
          }, typeof Object.assign != "function" && (Object.assign = function(e) {
            if (e == null) throw new TypeError("Cannot convert undefined or null to object");
            e = Object(e);
            for (var i = 1; i < arguments.length; i++) {
              var r = arguments[i];
              if (r != null) for (var s in r) Object.prototype.hasOwnProperty.call(r, s) && (e[s] = r[s]);
            }
            return e;
          }), (function(e) {
            e.forEach(function(i) {
              i.hasOwnProperty("remove") || Object.defineProperty(i, "remove", {
                configurable: true,
                enumerable: true,
                writable: true,
                value: function() {
                  this.parentNode.removeChild(this);
                }
              });
            });
          })([
            Element.prototype,
            CharacterData.prototype,
            DocumentType.prototype
          ]), Array.prototype.includes || Object.defineProperty(Array.prototype, "includes", {
            value: function(e, i) {
              if (this == null) throw new TypeError('"this" is null or not defined');
              var r = Object(this), s = r.length >>> 0;
              if (s === 0) return false;
              var u = i | 0, c = Math.max(u >= 0 ? u : s - Math.abs(u), 0);
              function p(f, m) {
                return f === m || typeof f == "number" && typeof m == "number" && isNaN(f) && isNaN(m);
              }
              for (; c < s; ) {
                if (p(r[c], e)) return true;
                c++;
              }
              return false;
            }
          });
          var qt = {
            version: "2.19.2"
          }, mn = et(Rn()), qi = {
            tooltips: {
              placeMarker: "Click to place marker",
              placeMarkerTouch: "Tap the map to place a marker",
              firstVertex: "Click to place first vertex",
              continueLine: "Click to continue drawing",
              finishLine: "Click any existing marker to finish",
              finishPoly: "Click first marker to finish",
              finishRect: "Click to finish",
              startCircle: "Click to place circle center",
              finishCircle: "Click to finish circle",
              placeCircleMarker: "Click to place circle marker",
              placeText: "Click to place text",
              selectFirstLayerFor: "Select first layer for {action}",
              selectSecondLayerFor: "Select second layer for {action}"
            },
            actions: {
              finish: "Finish",
              cancel: "Cancel",
              removeLastVertex: "Remove Last Vertex"
            },
            buttonTitles: {
              drawMarkerButton: "Draw Marker",
              drawPolyButton: "Draw Polygons",
              drawLineButton: "Draw Polyline",
              drawCircleButton: "Draw Circle",
              drawRectButton: "Draw Rectangle",
              editButton: "Edit Layers",
              dragButton: "Drag Layers",
              cutButton: "Cut Layers",
              deleteButton: "Remove Layers",
              drawCircleMarkerButton: "Draw Circle Marker",
              snappingButton: "Snap dragged marker to other layers and vertices",
              pinningButton: "Pin shared vertices together",
              rotateButton: "Rotate Layers",
              drawTextButton: "Draw Text",
              scaleButton: "Scale Layers",
              autoTracingButton: "Auto trace Line",
              snapGuidesButton: "Show SnapGuides",
              unionButton: "Union layers",
              differenceButton: "Subtract layers"
            },
            measurements: {
              totalLength: "Length",
              segmentLength: "Segment length",
              area: "Area",
              radius: "Radius",
              perimeter: "Perimeter",
              height: "Height",
              width: "Width",
              coordinates: "Position",
              coordinatesMarker: "Position Marker"
            }
          }, Vi = {
            tooltips: {
              placeMarker: "Platziere den Marker mit Klick",
              placeMarkerTouch: "Tippe auf die Karte, um einen Marker zu platzieren",
              firstVertex: "Platziere den ersten Marker mit Klick",
              continueLine: "Klicke, um weiter zu zeichnen",
              finishLine: "Beende mit Klick auf existierenden Marker",
              finishPoly: "Beende mit Klick auf ersten Marker",
              finishRect: "Beende mit Klick",
              startCircle: "Platziere das Kreiszentrum mit Klick",
              finishCircle: "Beende den Kreis mit Klick",
              placeCircleMarker: "Platziere den Kreismarker mit Klick",
              placeText: "Platziere den Text mit Klick"
            },
            actions: {
              finish: "Beenden",
              cancel: "Abbrechen",
              removeLastVertex: "Letzten Vertex l\xF6schen"
            },
            buttonTitles: {
              drawMarkerButton: "Marker zeichnen",
              drawPolyButton: "Polygon zeichnen",
              drawLineButton: "Polyline zeichnen",
              drawCircleButton: "Kreis zeichnen",
              drawRectButton: "Rechteck zeichnen",
              editButton: "Layer editieren",
              dragButton: "Layer bewegen",
              cutButton: "Layer schneiden",
              deleteButton: "Layer l\xF6schen",
              drawCircleMarkerButton: "Kreismarker zeichnen",
              snappingButton: "Bewegter Layer an andere Layer oder Vertexe einhacken",
              pinningButton: "Vertexe an der gleichen Position verkn\xFCpfen",
              rotateButton: "Layer drehen",
              drawTextButton: "Text zeichnen",
              scaleButton: "Layer skalieren",
              autoTracingButton: "Linie automatisch nachzeichen"
            },
            measurements: {
              totalLength: "L\xE4nge",
              segmentLength: "Segment L\xE4nge",
              area: "Fl\xE4che",
              radius: "Radius",
              perimeter: "Umfang",
              height: "H\xF6he",
              width: "Breite",
              coordinates: "Position",
              coordinatesMarker: "Position Marker"
            }
          }, yr = {
            tooltips: {
              placeMarker: "Clicca per posizionare un Marker",
              placeMarkerTouch: "Tocca la mappa per posizionare un marker",
              firstVertex: "Clicca per posizionare il primo vertice",
              continueLine: "Clicca per continuare a disegnare",
              finishLine: "Clicca qualsiasi marker esistente per terminare",
              finishPoly: "Clicca il primo marker per terminare",
              finishRect: "Clicca per terminare",
              startCircle: "Clicca per posizionare il punto centrale del cerchio",
              finishCircle: "Clicca per terminare il cerchio",
              placeCircleMarker: "Clicca per posizionare un Marker del cherchio"
            },
            actions: {
              finish: "Termina",
              cancel: "Annulla",
              removeLastVertex: "Rimuovi l'ultimo vertice"
            },
            buttonTitles: {
              drawMarkerButton: "Disegna Marker",
              drawPolyButton: "Disegna Poligoni",
              drawLineButton: "Disegna Polilinea",
              drawCircleButton: "Disegna Cerchio",
              drawRectButton: "Disegna Rettangolo",
              editButton: "Modifica Livelli",
              dragButton: "Sposta Livelli",
              cutButton: "Ritaglia Livelli",
              deleteButton: "Elimina Livelli",
              drawCircleMarkerButton: "Disegna Marker del Cerchio",
              snappingButton: "Snap ha trascinato il pennarello su altri strati e vertici",
              pinningButton: "Pin condiviso vertici insieme",
              rotateButton: "Ruota livello"
            }
          }, bt = {
            tooltips: {
              placeMarker: "Klik untuk menempatkan marker",
              placeMarkerTouch: "Ketuk peta untuk menempatkan marker",
              firstVertex: "Klik untuk menempatkan vertex pertama",
              continueLine: "Klik untuk meneruskan digitasi",
              finishLine: "Klik pada sembarang marker yang ada untuk mengakhiri",
              finishPoly: "Klik marker pertama untuk mengakhiri",
              finishRect: "Klik untuk mengakhiri",
              startCircle: "Klik untuk menempatkan titik pusat lingkaran",
              finishCircle: "Klik untuk mengakhiri lingkaran",
              placeCircleMarker: "Klik untuk menempatkan penanda lingkarann"
            },
            actions: {
              finish: "Selesai",
              cancel: "Batal",
              removeLastVertex: "Hilangkan Vertex Terakhir"
            },
            buttonTitles: {
              drawMarkerButton: "Digitasi Marker",
              drawPolyButton: "Digitasi Polygon",
              drawLineButton: "Digitasi Polyline",
              drawCircleButton: "Digitasi Lingkaran",
              drawRectButton: "Digitasi Segi Empat",
              editButton: "Edit Layer",
              dragButton: "Geser Layer",
              cutButton: "Potong Layer",
              deleteButton: "Hilangkan Layer",
              drawCircleMarkerButton: "Digitasi Penanda Lingkaran",
              snappingButton: "Jepretkan penanda yang ditarik ke lapisan dan simpul lain",
              pinningButton: "Sematkan simpul bersama bersama",
              rotateButton: "Putar lapisan"
            }
          }, Yt = {
            tooltips: {
              placeMarker: "Adaug\u0103 un punct",
              placeMarkerTouch: "Atinge\u021Bi harta pentru a plasa un punct",
              firstVertex: "Apas\u0103 aici pentru a ad\u0103uga primul Vertex",
              continueLine: "Apas\u0103 aici pentru a continua desenul",
              finishLine: "Apas\u0103 pe orice obiect pentru a finisa desenul",
              finishPoly: "Apas\u0103 pe primul obiect pentru a finisa",
              finishRect: "Apas\u0103 pentru a finisa",
              startCircle: "Apas\u0103 pentru a desena un cerc",
              finishCircle: "Apas\u0103 pentru a finisa un cerc",
              placeCircleMarker: "Adaug\u0103 un punct"
            },
            actions: {
              finish: "Termin\u0103",
              cancel: "Anuleaz\u0103",
              removeLastVertex: "\u0218terge ultimul Vertex"
            },
            buttonTitles: {
              drawMarkerButton: "Adaug\u0103 o bulin\u0103",
              drawPolyButton: "Deseneaz\u0103 un poligon",
              drawLineButton: "Deseneaz\u0103 o linie",
              drawCircleButton: "Deseneaz\u0103 un cerc",
              drawRectButton: "Deseneaz\u0103 un dreptunghi",
              editButton: "Editeaz\u0103 straturile",
              dragButton: "Mut\u0103 straturile",
              cutButton: "Taie straturile",
              deleteButton: "\u0218terge straturile",
              drawCircleMarkerButton: "Deseneaz\u0103 marcatorul cercului",
              snappingButton: "Fixa\u021Bi marcatorul glisat pe alte straturi \u0219i v\xE2rfuri",
              pinningButton: "Fixa\u021Bi v\xE2rfurile partajate \xEEmpreun\u0103",
              rotateButton: "Roti\u021Bi stratul"
            }
          }, vr = {
            tooltips: {
              placeMarker: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043D\u0430\u043D\u0435\u0441\u0442\u0438 \u043C\u0430\u0440\u043A\u0435\u0440",
              placeMarkerTouch: "\u041A\u043E\u0441\u043D\u0438\u0442\u0435\u0441\u044C \u043A\u0430\u0440\u0442\u044B, \u0447\u0442\u043E\u0431\u044B \u0440\u0430\u0437\u043C\u0435\u0441\u0442\u0438\u0442\u044C \u043C\u0430\u0440\u043A\u0435\u0440",
              firstVertex: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043D\u0430\u043D\u0435\u0441\u0442\u0438 \u043F\u0435\u0440\u0432\u044B\u0439 \u043E\u0431\u044A\u0435\u043A\u0442",
              continueLine: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435",
              finishLine: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043B\u044E\u0431\u043E\u0439 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0439 \u043C\u0430\u0440\u043A\u0435\u0440 \u0434\u043B\u044F \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u044F",
              finishPoly: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0435\u0440\u0432\u0443\u044E \u0442\u043E\u0447\u043A\u0443, \u0447\u0442\u043E\u0431\u044B \u0437\u0430\u043A\u043E\u043D\u0447\u0438\u0442\u044C",
              finishRect: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0437\u0430\u043A\u043E\u043D\u0447\u0438\u0442\u044C",
              startCircle: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0446\u0435\u043D\u0442\u0440 \u043A\u0440\u0443\u0433\u0430",
              finishCircle: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0437\u0430\u0434\u0430\u0442\u044C \u0440\u0430\u0434\u0438\u0443\u0441",
              placeCircleMarker: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043D\u0430\u043D\u0435\u0441\u0442\u0438 \u043A\u0440\u0443\u0433\u043E\u0432\u043E\u0439 \u043C\u0430\u0440\u043A\u0435\u0440"
            },
            actions: {
              finish: "\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044C",
              cancel: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C",
              removeLastVertex: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435"
            },
            buttonTitles: {
              drawMarkerButton: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043C\u0430\u0440\u043A\u0435\u0440",
              drawPolyButton: "\u0420\u0438\u0441\u043E\u0432\u0430\u0442\u044C \u043F\u043E\u043B\u0438\u0433\u043E\u043D",
              drawLineButton: "\u0420\u0438\u0441\u043E\u0432\u0430\u0442\u044C \u043A\u0440\u0438\u0432\u0443\u044E",
              drawCircleButton: "\u0420\u0438\u0441\u043E\u0432\u0430\u0442\u044C \u043A\u0440\u0443\u0433",
              drawRectButton: "\u0420\u0438\u0441\u043E\u0432\u0430\u0442\u044C \u043F\u0440\u044F\u043C\u043E\u0443\u0433\u043E\u043B\u044C\u043D\u0438\u043A",
              editButton: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u043B\u043E\u0439",
              dragButton: "\u041F\u0435\u0440\u0435\u043D\u0435\u0441\u0442\u0438 \u0441\u043B\u043E\u0439",
              cutButton: "\u0412\u044B\u0440\u0435\u0437\u0430\u0442\u044C \u0441\u043B\u043E\u0439",
              deleteButton: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0441\u043B\u043E\u0439",
              drawCircleMarkerButton: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043A\u0440\u0443\u0433\u043E\u0432\u043E\u0439 \u043C\u0430\u0440\u043A\u0435\u0440",
              snappingButton: "\u041F\u0440\u0438\u0432\u044F\u0437\u0430\u0442\u044C \u043F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u0435\u043C\u044B\u0439 \u043C\u0430\u0440\u043A\u0435\u0440 \u043A \u0434\u0440\u0443\u0433\u0438\u043C \u0441\u043B\u043E\u044F\u043C \u0438 \u0432\u0435\u0440\u0448\u0438\u043D\u0430\u043C",
              pinningButton: "\u0421\u0432\u044F\u0437\u0430\u0442\u044C \u043E\u0431\u0449\u0438\u0435 \u0442\u043E\u0447\u043A\u0438 \u0432\u043C\u0435\u0441\u0442\u0435",
              rotateButton: "\u041F\u043E\u0432\u043E\u0440\u043E\u0442 \u0441\u043B\u043E\u044F"
            }
          }, zn = {
            tooltips: {
              placeMarker: "Presiona para colocar un marcador",
              placeMarkerTouch: "Toca el mapa para colocar un marcador",
              firstVertex: "Presiona para colocar el primer v\xE9rtice",
              continueLine: "Presiona para continuar dibujando",
              finishLine: "Presiona cualquier marcador existente para finalizar",
              finishPoly: "Presiona el primer marcador para finalizar",
              finishRect: "Presiona para finalizar",
              startCircle: "Presiona para colocar el centro del c\xEDrculo",
              finishCircle: "Presiona para finalizar el c\xEDrculo",
              placeCircleMarker: "Presiona para colocar un marcador de c\xEDrculo"
            },
            actions: {
              finish: "Finalizar",
              cancel: "Cancelar",
              removeLastVertex: "Eliminar \xFAltimo v\xE9rtice"
            },
            buttonTitles: {
              drawMarkerButton: "Dibujar Marcador",
              drawPolyButton: "Dibujar Pol\xEDgono",
              drawLineButton: "Dibujar L\xEDnea",
              drawCircleButton: "Dibujar C\xEDrculo",
              drawRectButton: "Dibujar Rect\xE1ngulo",
              editButton: "Editar Capas",
              dragButton: "Arrastrar Capas",
              cutButton: "Cortar Capas",
              deleteButton: "Eliminar Capas",
              drawCircleMarkerButton: "Dibujar Marcador de C\xEDrculo",
              snappingButton: "El marcador de Snap arrastrado a otras capas y v\xE9rtices",
              pinningButton: "Fijar juntos los v\xE9rtices compartidos",
              rotateButton: "Rotar capa"
            }
          }, Te = {
            tooltips: {
              placeMarker: "Klik om een marker te plaatsen",
              placeMarkerTouch: "Tik op de kaart om een marker te plaatsen",
              firstVertex: "Klik om het eerste punt te plaatsen",
              continueLine: "Klik om te blijven tekenen",
              finishLine: "Klik op een bestaand punt om te be\xEBindigen",
              finishPoly: "Klik op het eerst punt om te be\xEBindigen",
              finishRect: "Klik om te be\xEBindigen",
              startCircle: "Klik om het middelpunt te plaatsen",
              finishCircle: "Klik om de cirkel te be\xEBindigen",
              placeCircleMarker: "Klik om een marker te plaatsen"
            },
            actions: {
              finish: "Bewaar",
              cancel: "Annuleer",
              removeLastVertex: "Verwijder laatste punt"
            },
            buttonTitles: {
              drawMarkerButton: "Plaats Marker",
              drawPolyButton: "Teken een vlak",
              drawLineButton: "Teken een lijn",
              drawCircleButton: "Teken een cirkel",
              drawRectButton: "Teken een vierkant",
              editButton: "Bewerk",
              dragButton: "Verplaats",
              cutButton: "Knip",
              deleteButton: "Verwijder",
              drawCircleMarkerButton: "Plaats Marker",
              snappingButton: "Snap gesleepte marker naar andere lagen en hoekpunten",
              pinningButton: "Speld gedeelde hoekpunten samen",
              rotateButton: "Laag roteren"
            }
          }, Qa = {
            tooltips: {
              placeMarker: "Cliquez pour placer un marqueur",
              placeMarkerTouch: "Appuyez sur la carte pour placer un marqueur",
              firstVertex: "Cliquez pour placer le premier sommet",
              continueLine: "Cliquez pour continuer \xE0 dessiner",
              finishLine: "Cliquez sur n'importe quel marqueur pour terminer",
              finishPoly: "Cliquez sur le premier marqueur pour terminer",
              finishRect: "Cliquez pour terminer",
              startCircle: "Cliquez pour placer le centre du cercle",
              finishCircle: "Cliquez pour finir le cercle",
              placeCircleMarker: "Cliquez pour placer le marqueur circulaire"
            },
            actions: {
              finish: "Terminer",
              cancel: "Annuler",
              removeLastVertex: "Retirer le dernier sommet"
            },
            buttonTitles: {
              drawMarkerButton: "Placer des marqueurs",
              drawPolyButton: "Dessiner des polygones",
              drawLineButton: "Dessiner des polylignes",
              drawCircleButton: "Dessiner un cercle",
              drawRectButton: "Dessiner un rectangle",
              editButton: "\xC9diter des calques",
              dragButton: "D\xE9placer des calques",
              cutButton: "Couper des calques",
              deleteButton: "Supprimer des calques",
              drawCircleMarkerButton: "Dessiner un marqueur circulaire",
              snappingButton: "Glisser le marqueur vers d'autres couches et sommets",
              pinningButton: "\xC9pingler ensemble les sommets partag\xE9s",
              rotateButton: "Tourner des calques"
            }
          }, Nn = {
            tooltips: {
              placeMarker: "\u5355\u51FB\u653E\u7F6E\u6807\u8BB0",
              placeMarkerTouch: "\u70B9\u51FB\u5730\u56FE\u653E\u7F6E\u6807\u8BB0",
              firstVertex: "\u5355\u51FB\u653E\u7F6E\u9996\u4E2A\u9876\u70B9",
              continueLine: "\u5355\u51FB\u7EE7\u7EED\u7ED8\u5236",
              finishLine: "\u5355\u51FB\u4EFB\u4F55\u5B58\u5728\u7684\u6807\u8BB0\u4EE5\u5B8C\u6210",
              finishPoly: "\u5355\u51FB\u7B2C\u4E00\u4E2A\u6807\u8BB0\u4EE5\u5B8C\u6210",
              finishRect: "\u5355\u51FB\u5B8C\u6210",
              startCircle: "\u5355\u51FB\u653E\u7F6E\u5706\u5FC3",
              finishCircle: "\u5355\u51FB\u5B8C\u6210\u5706\u5F62",
              placeCircleMarker: "\u70B9\u51FB\u653E\u7F6E\u5706\u5F62\u6807\u8BB0"
            },
            actions: {
              finish: "\u5B8C\u6210",
              cancel: "\u53D6\u6D88",
              removeLastVertex: "\u79FB\u9664\u6700\u540E\u7684\u9876\u70B9"
            },
            buttonTitles: {
              drawMarkerButton: "\u7ED8\u5236\u6807\u8BB0",
              drawPolyButton: "\u7ED8\u5236\u591A\u8FB9\u5F62",
              drawLineButton: "\u7ED8\u5236\u7EBF\u6BB5",
              drawCircleButton: "\u7ED8\u5236\u5706\u5F62",
              drawRectButton: "\u7ED8\u5236\u957F\u65B9\u5F62",
              editButton: "\u7F16\u8F91\u56FE\u5C42",
              dragButton: "\u62D6\u62FD\u56FE\u5C42",
              cutButton: "\u526A\u5207\u56FE\u5C42",
              deleteButton: "\u5220\u9664\u56FE\u5C42",
              drawCircleMarkerButton: "\u753B\u5706\u5708\u6807\u8BB0",
              snappingButton: "\u5C06\u62D6\u52A8\u7684\u6807\u8BB0\u6355\u6349\u5230\u5176\u4ED6\u56FE\u5C42\u548C\u9876\u70B9",
              pinningButton: "\u5C06\u5171\u4EAB\u9876\u70B9\u56FA\u5B9A\u5728\u4E00\u8D77",
              rotateButton: "\u65CB\u8F6C\u56FE\u5C42"
            }
          }, ki = {
            tooltips: {
              placeMarker: "\u55AE\u64CA\u653E\u7F6E\u6A19\u8A18",
              placeMarkerTouch: "\u9EDE\u64CA\u5730\u5716\u653E\u7F6E\u6A19\u8A18",
              firstVertex: "\u55AE\u64CA\u653E\u7F6E\u7B2C\u4E00\u500B\u9802\u9EDE",
              continueLine: "\u55AE\u64CA\u7E7C\u7E8C\u7E6A\u88FD",
              finishLine: "\u55AE\u64CA\u4EFB\u4F55\u5B58\u5728\u7684\u6A19\u8A18\u4EE5\u5B8C\u6210",
              finishPoly: "\u55AE\u64CA\u7B2C\u4E00\u500B\u6A19\u8A18\u4EE5\u5B8C\u6210",
              finishRect: "\u55AE\u64CA\u5B8C\u6210",
              startCircle: "\u55AE\u64CA\u653E\u7F6E\u5713\u5FC3",
              finishCircle: "\u55AE\u64CA\u5B8C\u6210\u5713\u5F62",
              placeCircleMarker: "\u9EDE\u64CA\u653E\u7F6E\u5713\u5F62\u6A19\u8A18"
            },
            actions: {
              finish: "\u5B8C\u6210",
              cancel: "\u53D6\u6D88",
              removeLastVertex: "\u79FB\u9664\u6700\u5F8C\u4E00\u500B\u9802\u9EDE"
            },
            buttonTitles: {
              drawMarkerButton: "\u653E\u7F6E\u6A19\u8A18",
              drawPolyButton: "\u7E6A\u88FD\u591A\u908A\u5F62",
              drawLineButton: "\u7E6A\u88FD\u7DDA\u6BB5",
              drawCircleButton: "\u7E6A\u88FD\u5713\u5F62",
              drawRectButton: "\u7E6A\u88FD\u65B9\u5F62",
              editButton: "\u7DE8\u8F2F\u5716\u5F62",
              dragButton: "\u79FB\u52D5\u5716\u5F62",
              cutButton: "\u88C1\u5207\u5716\u5F62",
              deleteButton: "\u522A\u9664\u5716\u5F62",
              drawCircleMarkerButton: "\u756B\u5713\u5708\u6A19\u8A18",
              snappingButton: "\u5C07\u62D6\u52D5\u7684\u6A19\u8A18\u5C0D\u9F4A\u5230\u5176\u4ED6\u5716\u5C64\u548C\u9802\u9EDE",
              pinningButton: "\u5C07\u5171\u4EAB\u9802\u9EDE\u56FA\u5B9A\u5728\u4E00\u8D77",
              rotateButton: "\u65CB\u8F49\u5716\u5F62"
            }
          }, Jt = {
            tooltips: {
              placeMarker: "Clique para posicionar o marcador",
              placeMarkerTouch: "Toque no mapa para posicionar um marcador",
              firstVertex: "Clique para posicionar o primeiro v\xE9rtice",
              continueLine: "Clique para continuar desenhando",
              finishLine: "Clique em qualquer marcador existente para finalizar",
              finishPoly: "Clique no primeiro marcador para finalizar",
              finishRect: "Clique para finalizar",
              startCircle: "Clique para posicionar o centro do c\xEDrculo",
              finishCircle: "Clique para finalizar o c\xEDrculo",
              placeCircleMarker: "Clique para posicionar o marcador circular",
              placeText: "Clique para inserir texto"
            },
            actions: {
              finish: "Finalizar",
              cancel: "Cancelar",
              removeLastVertex: "Remover \xFAltimo v\xE9rtice"
            },
            buttonTitles: {
              drawMarkerButton: "Desenhar Marcador",
              drawPolyButton: "Desenhar Pol\xEDgonos",
              drawLineButton: "Desenhar Linha Poligonal",
              drawCircleButton: "Desenhar C\xEDrculo",
              drawRectButton: "Desenhar Ret\xE2ngulo",
              editButton: "Editar Camadas",
              dragButton: "Arrastar Camadas",
              cutButton: "Recortar Camadas",
              deleteButton: "Remover Camadas",
              drawCircleMarkerButton: "Desenhar Marcador de C\xEDrculo",
              snappingButton: "Ajustar marcador arrastado a outras camadas e v\xE9rtices",
              pinningButton: "Unir v\xE9rtices compartilhados",
              rotateButton: "Rotacionar Camadas",
              drawTextButton: "Desenhar Texto",
              scaleButton: "Redimensionar Camadas",
              autoTracingButton: "Tra\xE7ado Autom\xE1tico de Linha"
            },
            measurements: {
              totalLength: "Comprimento",
              segmentLength: "Comprimento do Segmento",
              area: "\xC1rea",
              radius: "Raio",
              perimeter: "Per\xEDmetro",
              height: "Altura",
              width: "Largura",
              coordinates: "Posi\xE7\xE3o",
              coordinatesMarker: "Marcador de Posi\xE7\xE3o"
            }
          }, di = {
            tooltips: {
              placeMarker: "Clique para colocar marcador",
              placeMarkerTouch: "Toque no mapa para colocar um marcador",
              firstVertex: "Clique para colocar primeiro v\xE9rtice",
              continueLine: "Clique para continuar a desenhar",
              finishLine: "Clique num marcador existente para terminar",
              finishPoly: "Clique no primeiro marcador para terminar",
              finishRect: "Clique para terminar",
              startCircle: "Clique para colocar o centro do c\xEDrculo",
              finishCircle: "Clique para terminar o c\xEDrculo",
              placeCircleMarker: "Clique para colocar marcador de c\xEDrculo",
              placeText: "Clique para colocar texto"
            },
            actions: {
              finish: "Terminar",
              cancel: "Cancelar",
              removeLastVertex: "Remover \xDAltimo V\xE9rtice"
            },
            buttonTitles: {
              drawMarkerButton: "Desenhar Marcador",
              drawPolyButton: "Desenhar Pol\xEDgonos",
              drawLineButton: "Desenhar Polilinha",
              drawCircleButton: "Desenhar C\xEDrculo",
              drawRectButton: "Desenhar Ret\xE2ngulo",
              editButton: "Editar Camadas",
              dragButton: "Arrastar Camadas",
              cutButton: "Cortar Camadas",
              deleteButton: "Remover Camadas",
              drawCircleMarkerButton: "Desenhar Marcador de C\xEDrculo",
              snappingButton: "Ajustar marcador arrastado a outras camadas e v\xE9rtices",
              pinningButton: "Unir v\xE9rtices partilhados",
              rotateButton: "Rodar Camadas",
              drawTextButton: "Desenhar Texto",
              scaleButton: "Escalar Camadas",
              autoTracingButton: "Tra\xE7ado Autom\xE1tico de Linha"
            },
            measurements: {
              totalLength: "Comprimento",
              segmentLength: "Comprimento do Segmento",
              area: "\xC1rea",
              radius: "Raio",
              perimeter: "Per\xEDmetro",
              height: "Altura",
              width: "Largura",
              coordinates: "Posi\xE7\xE3o",
              coordinatesMarker: "Marcador de Posi\xE7\xE3o"
            }
          }, gn = {
            tooltips: {
              placeMarker: "Kliknij, aby umie\u015Bci\u0107 znacznik",
              placeMarkerTouch: "Dotknij map\u0119, aby umie\u015Bci\u0107 znacznik",
              firstVertex: "Kliknij, aby umie\u015Bci\u0107 pierwszy wierzcho\u0142ek",
              continueLine: "Kliknij, aby kontynuowa\u0107 rysowanie",
              finishLine: "Kliknij dowolny istniej\u0105cy znacznik, aby zako\u0144czy\u0107",
              finishPoly: "Kliknij pierwszy znacznik, aby zako\u0144czy\u0107",
              finishRect: "Kliknij, aby zako\u0144czy\u0107",
              startCircle: "Kliknij, aby umie\u015Bci\u0107 \u015Brodek okr\u0119gu",
              finishCircle: "Kliknij, aby zako\u0144czy\u0107 okr\u0105g",
              placeCircleMarker: "Kliknij, aby umie\u015Bci\u0107 znacznik okr\u0119gu",
              placeText: "Kliknij, aby umie\u015Bci\u0107 tekst"
            },
            actions: {
              finish: "Zako\u0144cz",
              cancel: "Anuluj",
              removeLastVertex: "Usu\u0144 ostatni wierzcho\u0142ek"
            },
            buttonTitles: {
              drawMarkerButton: "Rysuj znacznik",
              drawPolyButton: "Rysuj wielok\u0105t",
              drawLineButton: "Rysuj lini\u0119",
              drawCircleButton: "Rysuj okr\u0105g",
              drawRectButton: "Rysuj prostok\u0105t",
              editButton: "Edytuj warstwy",
              dragButton: "Przeci\u0105gnij warstwy",
              cutButton: "Wytnij warstwy",
              deleteButton: "Usu\u0144 warstwy",
              drawCircleMarkerButton: "Rysuj znacznik okr\u0105g\u0142y",
              snappingButton: "Przyci\u0105gnij przenoszony znacznik do innych warstw i wierzcho\u0142k\xF3w",
              pinningButton: "Przypnij wsp\xF3lne wierzcho\u0142ki razem",
              rotateButton: "Obr\xF3\u0107 warstwy",
              drawTextButton: "Rysuj tekst",
              scaleButton: "Skaluj warstwy",
              autoTracingButton: "Automatyczne \u015Bledzenie linii"
            },
            measurements: {
              totalLength: "D\u0142ugo\u015B\u0107",
              segmentLength: "D\u0142ugo\u015B\u0107 odcinka",
              area: "Obszar",
              radius: "Promie\u0144",
              perimeter: "Obw\xF3d",
              height: "Wysoko\u015B\u0107",
              width: "Szeroko\u015B\u0107",
              coordinates: "Pozycja",
              coordinatesMarker: "Znacznik pozycji"
            }
          }, yn = {
            tooltips: {
              placeMarker: "Klicka f\xF6r att placera mark\xF6r",
              placeMarkerTouch: "Tryck p\xE5 kartan f\xF6r att placera en mark\xF6r",
              firstVertex: "Klicka f\xF6r att placera f\xF6rsta h\xF6rnet",
              continueLine: "Klicka f\xF6r att forts\xE4tta rita",
              finishLine: "Klicka p\xE5 en existerande punkt f\xF6r att slutf\xF6ra",
              finishPoly: "Klicka p\xE5 den f\xF6rsta punkten f\xF6r att slutf\xF6ra",
              finishRect: "Klicka f\xF6r att slutf\xF6ra",
              startCircle: "Klicka f\xF6r att placera cirkelns centrum",
              finishCircle: "Klicka f\xF6r att slutf\xF6ra cirkeln",
              placeCircleMarker: "Klicka f\xF6r att placera cirkelmark\xF6r"
            },
            actions: {
              finish: "Slutf\xF6r",
              cancel: "Avbryt",
              removeLastVertex: "Ta bort sista h\xF6rnet"
            },
            buttonTitles: {
              drawMarkerButton: "Rita Mark\xF6r",
              drawPolyButton: "Rita Polygoner",
              drawLineButton: "Rita Linje",
              drawCircleButton: "Rita Cirkel",
              drawRectButton: "Rita Rektangel",
              editButton: "Redigera Lager",
              dragButton: "Dra Lager",
              cutButton: "Klipp i Lager",
              deleteButton: "Ta bort Lager",
              drawCircleMarkerButton: "Rita Cirkelmark\xF6r",
              snappingButton: "Sn\xE4pp dra mark\xF6ren till andra lager och h\xF6rn",
              pinningButton: "F\xE4st delade h\xF6rn tillsammans",
              rotateButton: "Rotera lagret"
            }
          }, Lr = {
            tooltips: {
              placeMarker: "\u039A\u03AC\u03BD\u03C4\u03B5 \u03BA\u03BB\u03B9\u03BA \u03B3\u03B9\u03B1 \u03BD\u03B1 \u03C4\u03BF\u03C0\u03BF\u03B8\u03B5\u03C4\u03AE\u03C3\u03B5\u03C4\u03B5 \u0394\u03B5\u03AF\u03BA\u03C4\u03B7",
              placeMarkerTouch: "\u03A0\u03B1\u03C4\u03AE\u03C3\u03C4\u03B5 \u03C3\u03C4\u03BF \u03C7\u03AC\u03C1\u03C4\u03B7 \u03B3\u03B9\u03B1 \u03BD\u03B1 \u03C4\u03BF\u03C0\u03BF\u03B8\u03B5\u03C4\u03AE\u03C3\u03B5\u03C4\u03B5 \u03B4\u03B5\u03AF\u03BA\u03C4\u03B7",
              firstVertex: "\u039A\u03AC\u03BD\u03C4\u03B5 \u03BA\u03BB\u03B9\u03BA \u03B3\u03B9\u03B1 \u03BD\u03B1 \u03C4\u03BF\u03C0\u03BF\u03B8\u03B5\u03C4\u03AE\u03C3\u03B5\u03C4\u03B5 \u03C4\u03BF \u03C0\u03C1\u03CE\u03C4\u03BF \u03C3\u03B7\u03BC\u03B5\u03AF\u03BF",
              continueLine: "\u039A\u03AC\u03BD\u03C4\u03B5 \u03BA\u03BB\u03B9\u03BA \u03B3\u03B9\u03B1 \u03BD\u03B1 \u03C3\u03C5\u03BD\u03B5\u03C7\u03AF\u03C3\u03B5\u03C4\u03B5 \u03BD\u03B1 \u03C3\u03C7\u03B5\u03B4\u03B9\u03AC\u03B6\u03B5\u03C4\u03B5",
              finishLine: "\u039A\u03AC\u03BD\u03C4\u03B5 \u03BA\u03BB\u03B9\u03BA \u03C3\u03B5 \u03BF\u03C0\u03BF\u03B9\u03BF\u03BD\u03B4\u03AE\u03C0\u03BF\u03C4\u03B5 \u03C5\u03C0\u03AC\u03C1\u03C7\u03BF\u03BD \u03C3\u03B7\u03BC\u03B5\u03AF\u03BF \u03B3\u03B9\u03B1 \u03BD\u03B1 \u03BF\u03BB\u03BF\u03BA\u03BB\u03B7\u03C1\u03C9\u03B8\u03B5\u03AF",
              finishPoly: "\u039A\u03AC\u03BD\u03C4\u03B5 \u03BA\u03BB\u03B9\u03BA \u03C3\u03C4\u03BF \u03C0\u03C1\u03CE\u03C4\u03BF \u03C3\u03B7\u03BC\u03B5\u03AF\u03BF \u03B3\u03B9\u03B1 \u03BD\u03B1 \u03C4\u03B5\u03BB\u03B5\u03B9\u03CE\u03C3\u03B5\u03C4\u03B5",
              finishRect: "\u039A\u03AC\u03BD\u03C4\u03B5 \u03BA\u03BB\u03B9\u03BA \u03B3\u03B9\u03B1 \u03BD\u03B1 \u03C4\u03B5\u03BB\u03B5\u03B9\u03CE\u03C3\u03B5\u03C4\u03B5",
              startCircle: "\u039A\u03AC\u03BD\u03C4\u03B5 \u03BA\u03BB\u03B9\u03BA \u03B3\u03B9\u03B1 \u03BD\u03B1 \u03C4\u03BF\u03C0\u03BF\u03B8\u03B5\u03C4\u03AE\u03C3\u03B5\u03C4\u03B5 \u03BA\u03AD\u03BD\u03C4\u03C1\u03BF \u039A\u03CD\u03BA\u03BB\u03BF\u03C5",
              finishCircle: "\u039A\u03AC\u03BD\u03C4\u03B5 \u03BA\u03BB\u03B9\u03BA \u03B3\u03B9\u03B1 \u03BD\u03B1 \u03BF\u03BB\u03BF\u03BA\u03BB\u03B7\u03C1\u03CE\u03C3\u03B5\u03C4\u03B5 \u03C4\u03BF\u03BD \u039A\u03CD\u03BA\u03BB\u03BF",
              placeCircleMarker: "\u039A\u03AC\u03BD\u03C4\u03B5 \u03BA\u03BB\u03B9\u03BA \u03B3\u03B9\u03B1 \u03BD\u03B1 \u03C4\u03BF\u03C0\u03BF\u03B8\u03B5\u03C4\u03AE\u03C3\u03B5\u03C4\u03B5 \u039A\u03C5\u03BA\u03BB\u03B9\u03BA\u03CC \u0394\u03B5\u03AF\u03BA\u03C4\u03B7"
            },
            actions: {
              finish: "\u03A4\u03AD\u03BB\u03BF\u03C2",
              cancel: "\u0391\u03BA\u03CD\u03C1\u03C9\u03C3\u03B7",
              removeLastVertex: "\u039A\u03B1\u03C4\u03AC\u03C1\u03B3\u03B7\u03C3\u03B7 \u03C4\u03B5\u03BB\u03B5\u03C5\u03C4\u03B1\u03AF\u03BF\u03C5 \u03C3\u03B7\u03BC\u03B5\u03AF\u03BF\u03C5"
            },
            buttonTitles: {
              drawMarkerButton: "\u03A3\u03C7\u03B5\u03B4\u03AF\u03B1\u03C3\u03B7 \u0394\u03B5\u03AF\u03BA\u03C4\u03B7",
              drawPolyButton: "\u03A3\u03C7\u03B5\u03B4\u03AF\u03B1\u03C3\u03B7 \u03A0\u03BF\u03BB\u03C5\u03B3\u03CE\u03BD\u03BF\u03C5",
              drawLineButton: "\u03A3\u03C7\u03B5\u03B4\u03AF\u03B1\u03C3\u03B7 \u0393\u03C1\u03B1\u03BC\u03BC\u03AE\u03C2",
              drawCircleButton: "\u03A3\u03C7\u03B5\u03B4\u03AF\u03B1\u03C3\u03B7 \u039A\u03CD\u03BA\u03BB\u03BF\u03C5",
              drawRectButton: "\u03A3\u03C7\u03B5\u03B4\u03AF\u03B1\u03C3\u03B7 \u039F\u03C1\u03B8\u03BF\u03B3\u03C9\u03BD\u03AF\u03BF\u03C5",
              editButton: "\u0395\u03C0\u03B5\u03BE\u03B5\u03C1\u03B3\u03B1\u03C3\u03AF\u03B1 \u0395\u03C0\u03B9\u03C0\u03AD\u03B4\u03C9\u03BD",
              dragButton: "\u039C\u03B5\u03C4\u03B1\u03C6\u03BF\u03C1\u03AC \u0395\u03C0\u03B9\u03C0\u03AD\u03B4\u03C9\u03BD",
              cutButton: "\u0391\u03C0\u03BF\u03BA\u03BF\u03C0\u03AE \u0395\u03C0\u03B9\u03C0\u03AD\u03B4\u03C9\u03BD",
              deleteButton: "\u039A\u03B1\u03C4\u03AC\u03C1\u03B3\u03B7\u03C3\u03B7 \u0395\u03C0\u03B9\u03C0\u03AD\u03B4\u03C9\u03BD",
              drawCircleMarkerButton: "\u03A3\u03C7\u03B5\u03B4\u03AF\u03B1\u03C3\u03B7 \u039A\u03C5\u03BA\u03BB\u03B9\u03BA\u03BF\u03CD \u0394\u03B5\u03AF\u03BA\u03C4\u03B7",
              snappingButton: "\u03A0\u03C1\u03BF\u03C3\u03BA\u03CC\u03BB\u03BB\u03B7\u03C3\u03B7 \u03C4\u03BF\u03C5 \u0394\u03B5\u03AF\u03BA\u03C4\u03B7 \u03BC\u03B5\u03C4\u03B1\u03C6\u03BF\u03C1\u03AC\u03C2 \u03C3\u03B5 \u03AC\u03BB\u03BB\u03B1 \u0395\u03C0\u03AF\u03C0\u03B5\u03B4\u03B1 \u03BA\u03B1\u03B9 \u039A\u03BF\u03C1\u03C5\u03C6\u03AD\u03C2",
              pinningButton: "\u03A0\u03B5\u03C1\u03B9\u03BA\u03BF\u03C0\u03AE \u03BA\u03BF\u03B9\u03BD\u03CE\u03BD \u03BA\u03BF\u03C1\u03C5\u03C6\u03CE\u03BD \u03BC\u03B1\u03B6\u03AF",
              rotateButton: "\u03A0\u03B5\u03C1\u03B9\u03C3\u03C4\u03C1\u03AD\u03C8\u03C4\u03B5 \u03C4\u03BF \u03C3\u03C4\u03C1\u03CE\u03BC\u03B1"
            }
          }, vn = {
            tooltips: {
              placeMarker: "Kattintson a jel\xF6l\u0151 elhelyez\xE9s\xE9hez",
              placeMarkerTouch: "\xC9rintse meg a t\xE9rk\xE9pet a jel\xF6l\u0151 elhelyez\xE9s\xE9hez",
              firstVertex: "Kattintson az els\u0151 pont elhelyez\xE9s\xE9hez",
              continueLine: "Kattintson a k\xF6vetkez\u0151 pont elhelyez\xE9s\xE9hez",
              finishLine: "A befejez\xE9shez kattintson egy megl\xE9v\u0151 pontra",
              finishPoly: "A befejez\xE9shez kattintson az els\u0151 pontra",
              finishRect: "Kattintson a befejez\xE9shez",
              startCircle: "Kattintson a k\xF6r k\xF6z\xE9ppontj\xE1nak elhelyez\xE9s\xE9hez",
              finishCircle: "Kattintson a k\xF6r befejez\xE9s\xE9hez",
              placeCircleMarker: "Kattintson a k\xF6rjel\xF6l\u0151 elhelyez\xE9s\xE9hez"
            },
            actions: {
              finish: "Befejez\xE9s",
              cancel: "M\xE9gse",
              removeLastVertex: "Utols\xF3 pont elt\xE1vol\xEDt\xE1sa"
            },
            buttonTitles: {
              drawMarkerButton: "Jel\xF6l\u0151 rajzol\xE1sa",
              drawPolyButton: "Poligon rajzol\xE1sa",
              drawLineButton: "Vonal rajzol\xE1sa",
              drawCircleButton: "K\xF6r rajzol\xE1sa",
              drawRectButton: "N\xE9gyzet rajzol\xE1sa",
              editButton: "Elemek szerkeszt\xE9se",
              dragButton: "Elemek mozgat\xE1sa",
              cutButton: "Elemek v\xE1g\xE1sa",
              deleteButton: "Elemek t\xF6rl\xE9se",
              drawCircleMarkerButton: "K\xF6r jel\xF6l\u0151 rajzol\xE1sa",
              snappingButton: "Kapcsolja a jel\xF6lt\u0151t m\xE1sik elemhez vagy ponthoz",
              pinningButton: "K\xF6z\xF6s pontok \xF6sszek\xF6t\xE9se",
              rotateButton: "F\xF3lia elforgat\xE1sa"
            }
          }, br = {
            tooltips: {
              placeMarker: "Tryk for at placere en mark\xF8r",
              placeMarkerTouch: "Tryk p\xE5 kortet for at placere en mark\xF8r",
              firstVertex: "Tryk for at placere det f\xF8rste punkt",
              continueLine: "Tryk for at forts\xE6tte linjen",
              finishLine: "Tryk p\xE5 et eksisterende punkt for at afslutte",
              finishPoly: "Tryk p\xE5 det f\xF8rste punkt for at afslutte",
              finishRect: "Tryk for at afslutte",
              startCircle: "Tryk for at placere cirklens center",
              finishCircle: "Tryk for at afslutte cirklen",
              placeCircleMarker: "Tryk for at placere en cirkelmark\xF8r"
            },
            actions: {
              finish: "Afslut",
              cancel: "Afbryd",
              removeLastVertex: "Fjern sidste punkt"
            },
            buttonTitles: {
              drawMarkerButton: "Placer mark\xF8r",
              drawPolyButton: "Tegn polygon",
              drawLineButton: "Tegn linje",
              drawCircleButton: "Tegn cirkel",
              drawRectButton: "Tegn firkant",
              editButton: "Rediger",
              dragButton: "Tr\xE6k",
              cutButton: "Klip",
              deleteButton: "Fjern",
              drawCircleMarkerButton: "Tegn cirkelmark\xF8r",
              snappingButton: "Fastg\xF8r trukket mark\xF8r til andre elementer",
              pinningButton: "Sammenl\xE6g delte elementer",
              rotateButton: "Roter laget"
            }
          }, wr = {
            tooltips: {
              placeMarker: "Klikk for \xE5 plassere punkt",
              placeMarkerTouch: "Trykk p\xE5 kartet for \xE5 plassere et punkt",
              firstVertex: "Klikk for \xE5 plassere f\xF8rste punkt",
              continueLine: "Klikk for \xE5 tegne videre",
              finishLine: "Klikk p\xE5 et eksisterende punkt for \xE5 fullf\xF8re",
              finishPoly: "Klikk f\xF8rste punkt for \xE5 fullf\xF8re",
              finishRect: "Klikk for \xE5 fullf\xF8re",
              startCircle: "Klikk for \xE5 sette sirkel midtpunkt",
              finishCircle: "Klikk for \xE5 fullf\xF8re sirkel",
              placeCircleMarker: "Klikk for \xE5 plassere sirkel",
              placeText: "Klikk for \xE5 plassere tekst"
            },
            actions: {
              finish: "Fullf\xF8r",
              cancel: "Kanseller",
              removeLastVertex: "Fjern forrige punkt"
            },
            buttonTitles: {
              drawMarkerButton: "Tegn punkt",
              drawPolyButton: "Tegn flate",
              drawLineButton: "Tegn linje",
              drawCircleButton: "Tegn sirkel",
              drawRectButton: "Tegn rektangel",
              editButton: "Rediger objekter",
              dragButton: "Dra objekter",
              cutButton: "Kutt objekter",
              deleteButton: "Fjern objekter",
              drawCircleMarkerButton: "Tegn sirkel-punkt",
              snappingButton: "Fest dratt punkt til andre objekter og punkt",
              pinningButton: "Pin delte punkter sammen",
              rotateButton: "Rot\xE9r objekter",
              drawTextButton: "Tegn tekst",
              scaleButton: "Skal\xE9r objekter",
              autoTracingButton: "Automatisk sporing av linje"
            },
            measurements: {
              totalLength: "Lengde",
              segmentLength: "Segmentlengde",
              area: "Omr\xE5de",
              radius: "Radius",
              perimeter: "Omriss",
              height: "H\xF8yde",
              width: "Bredde",
              coordinates: "Posisjon",
              coordinatesMarker: "Posisjonsmark\xF8r"
            }
          }, Un = {
            tooltips: {
              placeMarker: "\u06A9\u0644\u06CC\u06A9 \u0628\u0631\u0627\u06CC \u062C\u0627\u0646\u0645\u0627\u06CC\u06CC \u0646\u0634\u0627\u0646",
              placeMarkerTouch: "\u0631\u0648\u06CC \u0646\u0642\u0634\u0647 \u0636\u0631\u0628\u0647 \u0628\u0632\u0646\u06CC\u062F \u062A\u0627 \u0646\u0634\u0627\u0646 \u0628\u06AF\u0630\u0627\u0631\u06CC\u062F",
              firstVertex: "\u06A9\u0644\u06CC\u06A9 \u0628\u0631\u0627\u06CC \u0631\u0633\u0645 \u0627\u0648\u0644\u06CC\u0646 \u0631\u0623\u0633",
              continueLine: "\u06A9\u0644\u06CC\u06A9 \u0628\u0631\u0627\u06CC \u0627\u062F\u0627\u0645\u0647 \u0631\u0633\u0645",
              finishLine: "\u06A9\u0644\u06CC\u06A9 \u0631\u0648\u06CC \u0647\u0631 \u0646\u0634\u0627\u0646 \u0645\u0648\u062C\u0648\u062F \u0628\u0631\u0627\u06CC \u067E\u0627\u06CC\u0627\u0646",
              finishPoly: "\u06A9\u0644\u06CC\u06A9 \u0631\u0648\u06CC \u0627\u0648\u0644\u06CC\u0646 \u0646\u0634\u0627\u0646 \u0628\u0631\u0627\u06CC \u067E\u0627\u06CC\u0627\u0646",
              finishRect: "\u06A9\u0644\u06CC\u06A9 \u0628\u0631\u0627\u06CC \u067E\u0627\u06CC\u0627\u0646",
              startCircle: "\u06A9\u0644\u06CC\u06A9 \u0628\u0631\u0627\u06CC \u0631\u0633\u0645 \u0645\u0631\u06A9\u0632 \u062F\u0627\u06CC\u0631\u0647",
              finishCircle: "\u06A9\u0644\u06CC\u06A9 \u0628\u0631\u0627\u06CC \u067E\u0627\u06CC\u0627\u0646 \u0631\u0633\u0645 \u062F\u0627\u06CC\u0631\u0647",
              placeCircleMarker: "\u06A9\u0644\u06CC\u06A9 \u0628\u0631\u0627\u06CC \u0631\u0633\u0645 \u0646\u0634\u0627\u0646 \u062F\u0627\u06CC\u0631\u0647",
              placeText: "\u06A9\u0644\u06CC\u06A9 \u0628\u0631\u0627\u06CC \u0646\u0648\u0634\u062A\u0646 \u0645\u062A\u0646"
            },
            actions: {
              finish: "\u067E\u0627\u06CC\u0627\u0646",
              cancel: "\u0644\u0641\u0648",
              removeLastVertex: "\u062D\u0630\u0641 \u0622\u062E\u0631\u06CC\u0646 \u0631\u0623\u0633"
            },
            buttonTitles: {
              drawMarkerButton: "\u062F\u0631\u062C \u0646\u0634\u0627\u0646",
              drawPolyButton: "\u0631\u0633\u0645 \u0686\u0646\u062F\u0636\u0644\u0639\u06CC",
              drawLineButton: "\u0631\u0633\u0645 \u062E\u0637",
              drawCircleButton: "\u0631\u0633\u0645 \u062F\u0627\u06CC\u0631\u0647",
              drawRectButton: "\u0631\u0633\u0645 \u0686\u0647\u0627\u0631\u0636\u0644\u0639\u06CC",
              editButton: "\u0648\u06CC\u0631\u0627\u06CC\u0634 \u0644\u0627\u06CC\u0647\u200C\u0647\u0627",
              dragButton: "\u062C\u0627\u0628\u062C\u0627\u06CC\u06CC \u0644\u0627\u06CC\u0647\u200C\u0647\u0627",
              cutButton: "\u0628\u0631\u0634 \u0644\u0627\u06CC\u0647\u200C\u0647\u0627",
              deleteButton: "\u062D\u0630\u0641 \u0644\u0627\u06CC\u0647\u200C\u0647\u0627",
              drawCircleMarkerButton: "\u0631\u0633\u0645 \u0646\u0634\u0627\u0646 \u062F\u0627\u06CC\u0631\u0647",
              snappingButton: "\u0646\u0634\u0627\u0646\u06AF\u0631 \u0631\u0627 \u0628\u0647 \u0644\u0627\u06CC\u0647\u200C\u0647\u0627 \u0648 \u0631\u0626\u0648\u0633 \u062F\u06CC\u06AF\u0631 \u0628\u06A9\u0634\u06CC\u062F",
              pinningButton: "\u0631\u0626\u0648\u0633 \u0645\u0634\u062A\u0631\u06A9 \u0631\u0627 \u0628\u0627 \u0647\u0645 \u067E\u06CC\u0646 \u06A9\u0646\u06CC\u062F",
              rotateButton: "\u0686\u0631\u062E\u0634 \u0644\u0627\u06CC\u0647",
              drawTextButton: "\u0631\u0633\u0645 \u0645\u062A\u0646",
              scaleButton: "\u0645\u0642\u06CC\u0627\u0633\u200C\u06AF\u0630\u0627\u0631\u06CC",
              autoTracingButton: "\u0631\u062F\u06CC\u0627\u0628 \u062E\u0648\u062F\u06A9\u0627\u0631"
            },
            measurements: {
              totalLength: "\u0637\u0648\u0644",
              segmentLength: "\u0637\u0648\u0644 \u0628\u062E\u0634",
              area: "\u0646\u0627\u062D\u06CC\u0647",
              radius: "\u0634\u0639\u0627\u0639",
              perimeter: "\u0645\u062D\u06CC\u0637",
              height: "\u0627\u0631\u062A\u0641\u0627\u0639",
              width: "\u0639\u0631\u0636",
              coordinates: "\u0645\u0648\u0642\u0639\u06CC\u062A",
              coordinatesMarker: "\u0645\u0648\u0642\u0639\u06CC\u062A \u0646\u0634\u0627\u0646"
            }
          }, Cr = {
            tooltips: {
              placeMarker: "\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C, \u0449\u043E\u0431 \u043D\u0430\u043D\u0435\u0441\u0442\u0438 \u043C\u0430\u0440\u043A\u0435\u0440",
              placeMarkerTouch: "\u0422\u043E\u0440\u043A\u043D\u0456\u0442\u044C\u0441\u044F \u043A\u0430\u0440\u0442\u0438, \u0449\u043E\u0431 \u0440\u043E\u0437\u043C\u0456\u0441\u0442\u0438\u0442\u0438 \u043C\u0430\u0440\u043A\u0435\u0440",
              firstVertex: "\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C, \u0449\u043E\u0431 \u043D\u0430\u043D\u0435\u0441\u0442\u0438 \u043F\u0435\u0440\u0448\u0443 \u0432\u0435\u0440\u0448\u0438\u043D\u0443",
              continueLine: "\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C, \u0449\u043E\u0431 \u043F\u0440\u043E\u0434\u043E\u0432\u0436\u0438\u0442\u0438 \u043C\u0430\u043B\u044E\u0432\u0430\u0442\u0438",
              finishLine: "\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C \u0431\u0443\u0434\u044C-\u044F\u043A\u0438\u0439 \u0456\u0441\u043D\u0443\u044E\u0447\u0438\u0439 \u043C\u0430\u0440\u043A\u0435\u0440 \u0434\u043B\u044F \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043D\u044F",
              finishPoly: "\u0412\u0438\u0431\u0435\u0440\u0456\u0442\u044C \u043F\u0435\u0440\u0448\u0438\u0439 \u043C\u0430\u0440\u043A\u0435\u0440, \u0449\u043E\u0431 \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u0438",
              finishRect: "\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C, \u0449\u043E\u0431 \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u0438",
              startCircle: "\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C, \u0449\u043E\u0431 \u0434\u043E\u0434\u0430\u0442\u0438 \u0446\u0435\u043D\u0442\u0440 \u043A\u043E\u043B\u0430",
              finishCircle: "\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C, \u0449\u043E\u0431 \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u0438 \u043A\u043E\u043B\u043E",
              placeCircleMarker: "\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C, \u0449\u043E\u0431 \u043D\u0430\u043D\u0435\u0441\u0442\u0438 \u043A\u0440\u0443\u0433\u043E\u0432\u0438\u0439 \u043C\u0430\u0440\u043A\u0435\u0440"
            },
            actions: {
              finish: "\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u0438",
              cancel: "\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438",
              removeLastVertex: "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u043F\u043E\u043F\u0435\u0440\u0435\u0434\u043D\u044E \u0432\u0435\u0440\u0448\u0438\u043D\u0443"
            },
            buttonTitles: {
              drawMarkerButton: "\u041C\u0430\u043B\u044E\u0432\u0430\u0442\u0438 \u043C\u0430\u0440\u043A\u0435\u0440",
              drawPolyButton: "\u041C\u0430\u043B\u044E\u0432\u0430\u0442\u0438 \u043F\u043E\u043B\u0456\u0433\u043E\u043D",
              drawLineButton: "\u041C\u0430\u043B\u044E\u0432\u0430\u0442\u0438 \u043A\u0440\u0438\u0432\u0443",
              drawCircleButton: "\u041C\u0430\u043B\u044E\u0432\u0430\u0442\u0438 \u043A\u043E\u043B\u043E",
              drawRectButton: "\u041C\u0430\u043B\u044E\u0432\u0430\u0442\u0438 \u043F\u0440\u044F\u043C\u043E\u043A\u0443\u0442\u043D\u0438\u043A",
              editButton: "\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438 \u0448\u0430\u0440\u0438",
              dragButton: "\u041F\u0435\u0440\u0435\u043D\u0435\u0441\u0442\u0438 \u0448\u0430\u0440\u0438",
              cutButton: "\u0412\u0438\u0440\u0456\u0437\u0430\u0442\u0438 \u0448\u0430\u0440\u0438",
              deleteButton: "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0448\u0430\u0440\u0438",
              drawCircleMarkerButton: "\u041C\u0430\u043B\u044E\u0432\u0430\u0442\u0438 \u043A\u0440\u0443\u0433\u043E\u0432\u0438\u0439 \u043C\u0430\u0440\u043A\u0435\u0440",
              snappingButton: "\u041F\u0440\u0438\u0432\u2019\u044F\u0437\u0430\u0442\u0438 \u043F\u0435\u0440\u0435\u0442\u044F\u0433\u043D\u0443\u0442\u0438\u0439 \u043C\u0430\u0440\u043A\u0435\u0440 \u0434\u043E \u0456\u043D\u0448\u0438\u0445 \u0448\u0430\u0440\u0456\u0432 \u0442\u0430 \u0432\u0435\u0440\u0448\u0438\u043D",
              pinningButton: "\u0417\u0432'\u044F\u0437\u0430\u0442\u0438 \u0441\u043F\u0456\u043B\u044C\u043D\u0456 \u0432\u0435\u0440\u0448\u0438\u043D\u0438 \u0440\u0430\u0437\u043E\u043C",
              rotateButton: "\u041F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u0438 \u0448\u0430\u0440"
            }
          }, xr = {
            tooltips: {
              placeMarker: "\u0130\u015Faret\xE7i yerle\u015Ftirmek i\xE7in t\u0131klay\u0131n",
              placeMarkerTouch: "\u0130\u015Faret\xE7i yerle\u015Ftirmek i\xE7in haritaya dokunun",
              firstVertex: "\u0130lk tepe noktas\u0131n\u0131 yerle\u015Ftirmek i\xE7in t\u0131klay\u0131n",
              continueLine: "\xC7izime devam etmek i\xE7in t\u0131klay\u0131n",
              finishLine: "Bitirmek i\xE7in mevcut herhangi bir i\u015Faret\xE7iyi t\u0131klay\u0131n",
              finishPoly: "Bitirmek i\xE7in ilk i\u015Faret\xE7iyi t\u0131klay\u0131n",
              finishRect: "Bitirmek i\xE7in t\u0131klay\u0131n",
              startCircle: "Daire merkezine yerle\u015Ftirmek i\xE7in t\u0131klay\u0131n",
              finishCircle: "Daireyi bitirmek i\xE7in t\u0131klay\u0131n",
              placeCircleMarker: "Daire i\u015Faret\xE7isi yerle\u015Ftirmek i\xE7in t\u0131klay\u0131n"
            },
            actions: {
              finish: "Bitir",
              cancel: "\u0130ptal",
              removeLastVertex: "Son k\xF6\u015Feyi kald\u0131r"
            },
            buttonTitles: {
              drawMarkerButton: "\xC7izim \u0130\u015Faret\xE7isi",
              drawPolyButton: "\xC7okgenler \xE7iz",
              drawLineButton: "\xC7oklu \xE7izgi \xE7iz",
              drawCircleButton: "\xC7ember \xE7iz",
              drawRectButton: "Dikd\xF6rtgen \xE7iz",
              editButton: "Katmanlar\u0131 d\xFCzenle",
              dragButton: "Katmanlar\u0131 s\xFCr\xFCkle",
              cutButton: "Katmanlar\u0131 kes",
              deleteButton: "Katmanlar\u0131 kald\u0131r",
              drawCircleMarkerButton: "Daire i\u015Faret\xE7isi \xE7iz",
              snappingButton: "S\xFCr\xFCklenen i\u015Faret\xE7iyi di\u011Fer katmanlara ve k\xF6\u015Felere yap\u0131\u015Ft\u0131r",
              pinningButton: "Payla\u015F\u0131lan k\xF6\u015Feleri birbirine sabitle",
              rotateButton: "Katman\u0131 d\xF6nd\xFCr"
            }
          }, Gn = {
            tooltips: {
              placeMarker: "Kliknut\xEDm vytvo\u0159\xEDte zna\u010Dku",
              placeMarkerTouch: "Klepnut\xEDm na mapu um\xEDst\xEDte zna\u010Dku",
              firstVertex: "Kliknut\xEDm vytvo\u0159\xEDte prvn\xED objekt",
              continueLine: "Kliknut\xEDm pokra\u010Dujte v kreslen\xED",
              finishLine: "Kliknut\xED na libovolnou existuj\xEDc\xED zna\u010Dku pro dokon\u010Den\xED",
              finishPoly: "Vyberte prvn\xED bod pro dokon\u010Den\xED",
              finishRect: "Klikn\u011Bte pro dokon\u010Den\xED",
              startCircle: "Kliknut\xEDm p\u0159idejte st\u0159ed kruhu",
              finishCircle: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0437\u0430\u0434\u0430\u0442\u044C \u0440\u0430\u0434\u0438\u0443\u0441",
              placeCircleMarker: "Kliknut\xEDm nastavte polom\u011Br"
            },
            actions: {
              finish: "Dokon\u010Dit",
              cancel: "Zru\u0161it",
              removeLastVertex: "Zru\u0161it posledn\xED akci"
            },
            buttonTitles: {
              drawMarkerButton: "P\u0159idat zna\u010Dku",
              drawPolyButton: "Nakreslit polygon",
              drawLineButton: "Nakreslit k\u0159ivku",
              drawCircleButton: "Nakreslit kruh",
              drawRectButton: "Nakreslit obd\xE9ln\xEDk",
              editButton: "Upravit vrstvu",
              dragButton: "P\u0159eneste vrstvu",
              cutButton: "Vyjmout vrstvu",
              deleteButton: "Smazat vrstvu",
              drawCircleMarkerButton: "P\u0159idat kruhovou zna\u010Dku",
              snappingButton: "Nav\xE1zat ta\u017Enou zna\u010Dku k dal\u0161\xEDm vrstv\xE1m a vrchol\u016Fm",
              pinningButton: "Spojit spole\u010Dn\xE9 body dohromady",
              rotateButton: "Oto\u010Dte vrstvu"
            }
          }, As = {
            tooltips: {
              placeMarker: "\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u30DE\u30FC\u30AB\u30FC\u3092\u914D\u7F6E",
              placeMarkerTouch: "\u5730\u56F3\u3092\u30BF\u30C3\u30D7\u3057\u3066\u30DE\u30FC\u30AB\u30FC\u3092\u914D\u7F6E",
              firstVertex: "\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u6700\u521D\u306E\u9802\u70B9\u3092\u914D\u7F6E",
              continueLine: "\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u63CF\u753B\u3092\u7D9A\u3051\u308B",
              finishLine: "\u4EFB\u610F\u306E\u30DE\u30FC\u30AB\u30FC\u3092\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u7D42\u4E86",
              finishPoly: "\u6700\u521D\u306E\u30DE\u30FC\u30AB\u30FC\u3092\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u7D42\u4E86",
              finishRect: "\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u7D42\u4E86",
              startCircle: "\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u5186\u306E\u4E2D\u5FC3\u3092\u914D\u7F6E",
              finishCircle: "\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u5186\u306E\u63CF\u753B\u3092\u7D42\u4E86",
              placeCircleMarker: "\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u5186\u30DE\u30FC\u30AB\u30FC\u3092\u914D\u7F6E",
              placeText: "\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u30C6\u30AD\u30B9\u30C8\u3092\u914D\u7F6E"
            },
            actions: {
              finish: "\u7D42\u4E86",
              cancel: "\u30AD\u30E3\u30F3\u30BB\u30EB",
              removeLastVertex: "\u6700\u5F8C\u306E\u9802\u70B9\u3092\u524A\u9664"
            },
            buttonTitles: {
              drawMarkerButton: "\u30DE\u30FC\u30AB\u30FC\u3092\u63CF\u753B",
              drawPolyButton: "\u30DD\u30EA\u30B4\u30F3\u3092\u63CF\u753B",
              drawLineButton: "\u6298\u308C\u7DDA\u3092\u63CF\u753B",
              drawCircleButton: "\u5186\u3092\u63CF\u753B",
              drawRectButton: "\u77E9\u5F62\u3092\u63CF\u753B",
              editButton: "\u30EC\u30A4\u30E4\u30FC\u3092\u7DE8\u96C6",
              dragButton: "\u30EC\u30A4\u30E4\u30FC\u3092\u30C9\u30E9\u30C3\u30B0",
              cutButton: "\u30EC\u30A4\u30E4\u30FC\u3092\u5207\u308A\u53D6\u308A",
              deleteButton: "\u30EC\u30A4\u30E4\u30FC\u3092\u524A\u9664",
              drawCircleMarkerButton: "\u5186\u30DE\u30FC\u30AB\u30FC\u3092\u63CF\u753B",
              snappingButton: "\u30C9\u30E9\u30C3\u30B0\u3057\u305F\u30DE\u30FC\u30AB\u30FC\u3092\u4ED6\u306E\u30EC\u30A4\u30E4\u30FC\u3084\u9802\u70B9\u306B\u30B9\u30CA\u30C3\u30D7\u3059\u308B",
              pinningButton: "\u5171\u6709\u3059\u308B\u9802\u70B9\u3092\u540C\u6642\u306B\u52D5\u304B\u3059",
              rotateButton: "\u30EC\u30A4\u30E4\u30FC\u3092\u56DE\u8EE2",
              drawTextButton: "\u30C6\u30AD\u30B9\u30C8\u3092\u63CF\u753B"
            }
          }, Er = {
            tooltips: {
              placeMarker: "Klikkaa asettaaksesi merkin",
              placeMarkerTouch: "Napauta karttaa asettaaksesi merkin",
              firstVertex: "Klikkaa asettaakseni ensimm\xE4isen osuuden",
              continueLine: "Klikkaa jatkaaksesi piirt\xE4mist\xE4",
              finishLine: "Klikkaa olemassa olevaa merkki\xE4 lopettaaksesi",
              finishPoly: "Klikkaa ensimm\xE4ist\xE4 merkki\xE4 lopettaaksesi",
              finishRect: "Klikkaa lopettaaksesi",
              startCircle: "Klikkaa asettaaksesi ympyr\xE4n keskipisteen",
              finishCircle: "Klikkaa lopettaaksesi ympyr\xE4n",
              placeCircleMarker: "Klikkaa asettaaksesi ympyr\xE4merkin",
              placeText: "Klikkaa asettaaksesi tekstin"
            },
            actions: {
              finish: "Valmis",
              cancel: "Peruuta",
              removeLastVertex: "Poista viimeinen osuus"
            },
            buttonTitles: {
              drawMarkerButton: "Piirr\xE4 merkkej\xE4",
              drawPolyButton: "Piirr\xE4 monikulmioita",
              drawLineButton: "Piirr\xE4 viivoja",
              drawCircleButton: "Piirr\xE4 ympyr\xE4",
              drawRectButton: "Piirr\xE4 neliskulmioita",
              editButton: "Muokkaa",
              dragButton: "Siirr\xE4",
              cutButton: "Leikkaa",
              deleteButton: "Poista",
              drawCircleMarkerButton: "Piirr\xE4 ympyr\xE4merkki",
              snappingButton: "Kiinnit\xE4 siirrett\xE4v\xE4 merkki toisiin muotoihin",
              pinningButton: "Kiinnit\xE4 jaetut muodot yhteen",
              rotateButton: "K\xE4\xE4nn\xE4",
              drawTextButton: "Piirr\xE4 teksti\xE4"
            }
          }, $a = {
            tooltips: {
              placeMarker: "\uB9C8\uCEE4 \uC704\uCE58\uB97C \uD074\uB9AD\uD558\uC138\uC694",
              placeMarkerTouch: "\uC9C0\uB3C4\uB97C \uD0ED\uD558\uC5EC \uB9C8\uCEE4\uB97C \uBC30\uCE58\uD558\uC138\uC694",
              firstVertex: "\uCCAB\uBC88\uC9F8 \uAF2D\uC9C0\uC810 \uC704\uCE58\uC744 \uD074\uB9AD\uD558\uC138\uC694",
              continueLine: "\uACC4\uC18D \uADF8\uB9AC\uB824\uBA74 \uD074\uB9AD\uD558\uC138\uC694",
              finishLine: "\uB05D\uB0B4\uB824\uBA74 \uAE30\uC874 \uB9C8\uCEE4\uB97C \uD074\uB9AD\uD558\uC138\uC694",
              finishPoly: "\uB05D\uB0B4\uB824\uBA74 \uCC98\uC74C \uB9C8\uCEE4\uB97C \uD074\uB9AD\uD558\uC138\uC694",
              finishRect: "\uB05D\uB0B4\uB824\uBA74 \uD074\uB9AD\uD558\uC138\uC694",
              startCircle: "\uC6D0\uC758 \uC911\uC2EC\uC774 \uB420 \uC704\uCE58\uB97C \uD074\uB9AD\uD558\uC138\uC694",
              finishCircle: "\uC6D0\uC744 \uB05D\uB0B4\uB824\uBA74 \uD074\uB9AD\uD558\uC138\uC694",
              placeCircleMarker: "\uC6D0 \uB9C8\uCEE4 \uC704\uCE58\uB97C \uD074\uB9AD\uD558\uC138\uC694",
              placeText: "\uD14D\uC2A4\uD2B8 \uC704\uCE58\uB97C \uD074\uB9AD\uD558\uC138\uC694"
            },
            actions: {
              finish: "\uB05D\uB0B4\uAE30",
              cancel: "\uCDE8\uC18C",
              removeLastVertex: "\uB9C8\uC9C0\uB9C9 \uAF2D\uC9C0\uC810 \uC81C\uAC70"
            },
            buttonTitles: {
              drawMarkerButton: "\uB9C8\uCEE4 \uADF8\uB9AC\uAE30",
              drawPolyButton: "\uB2E4\uAC01\uD615 \uADF8\uB9AC\uAE30",
              drawLineButton: "\uB2E4\uAC01\uC120 \uADF8\uB9AC\uAE30",
              drawCircleButton: "\uC6D0 \uADF8\uB9AC\uAE30",
              drawRectButton: "\uC9C1\uC0AC\uAC01\uD615 \uADF8\uB9AC\uAE30",
              editButton: "\uB808\uC774\uC5B4 \uD3B8\uC9D1\uD558\uAE30",
              dragButton: "\uB808\uC774\uC5B4 \uB04C\uAE30",
              cutButton: "\uB808\uC774\uC5B4 \uC790\uB974\uAE30",
              deleteButton: "\uB808\uC774\uC5B4 \uC81C\uAC70\uD558\uAE30",
              drawCircleMarkerButton: "\uC6D0 \uB9C8\uCEE4 \uADF8\uB9AC\uAE30",
              snappingButton: "\uC7A1\uC544\uB048 \uB9C8\uCEE4\uB97C \uB2E4\uB978 \uB808\uC774\uC5B4 \uBC0F \uAF2D\uC9C0\uC810\uC5D0 \uB4E4\uB7EC\uBD99\uAC8C \uD558\uAE30",
              pinningButton: "\uACF5\uC720 \uAF2D\uC9C0\uC810\uC744 \uD568\uAED8 \uCC0D\uAE30",
              rotateButton: "\uB808\uC774\uC5B4 \uD68C\uC804\uD558\uAE30",
              drawTextButton: "\uD14D\uC2A4\uD2B8 \uADF8\uB9AC\uAE30"
            }
          }, vt = {
            tooltips: {
              placeMarker: "\u041C\u0430\u0440\u043A\u0435\u0440\u0434\u0438 \u0436\u0430\u0439\u0433\u0430\u0448\u0442\u044B\u0440\u0443\u0443 \u04AF\u0447\u04AF\u043D \u0431\u0430\u0441\u044B\u04A3\u044B\u0437",
              placeMarkerTouch: "\u041C\u0430\u0440\u043A\u0435\u0440\u0434\u0438 \u0436\u0430\u0439\u0433\u0430\u0448\u0442\u044B\u0440\u0443\u0443 \u04AF\u0447\u04AF\u043D \u043A\u0430\u0440\u0442\u0430\u0433\u0430 \u0442\u0438\u0439\u0438\u04A3\u0438\u0437",
              firstVertex: "\u0411\u0438\u0440\u0438\u043D\u0447\u0438 \u0447\u043E\u043A\u0443\u043D\u0443 \u0436\u0430\u0439\u0433\u0430\u0448\u0442\u044B\u0440\u0443\u0443\u043D\u0443 \u04AF\u0447\u04AF\u043D \u0431\u0430\u0441\u044B\u04A3\u044B\u0437",
              continueLine: "\u0421\u04AF\u0440\u04E9\u0442 \u0442\u0430\u0440\u0442\u0443\u0443\u043D\u0443 \u0443\u043B\u0430\u043D\u0442\u0443\u0443 \u04AF\u0447\u04AF\u043D \u0431\u0430\u0441\u044B\u04A3\u044B\u0437",
              finishLine: "\u0410\u044F\u043A\u0442\u043E\u043E \u04AF\u0447\u04AF\u043D \u0443\u0447\u0443\u0440\u0434\u0430\u0433\u044B \u043C\u0430\u0440\u043A\u0435\u0440\u0434\u0438 \u0431\u0430\u0441\u044B\u04A3\u044B\u0437",
              finishPoly: "\u0411\u04AF\u0442\u04AF\u0440\u04AF\u04AF \u04AF\u0447\u04AF\u043D \u0431\u0438\u0440\u0438\u043D\u0447\u0438 \u043C\u0430\u0440\u043A\u0435\u0440\u0434\u0438 \u0431\u0430\u0441\u044B\u04A3\u044B\u0437",
              finishRect: "\u0411\u04AF\u0442\u04AF\u0440\u04AF\u04AF \u04AF\u0447\u04AF\u043D \u0431\u0430\u0441\u044B\u04A3\u044B\u0437",
              startCircle: "\u0410\u0439\u043B\u0430\u043D\u0430\u043D\u044B\u043D \u0431\u043E\u0440\u0431\u043E\u0440\u0443\u043D \u0436\u0430\u0439\u0433\u0430\u0448\u0442\u044B\u0440\u0443\u0443\u043D\u0443 \u04AF\u0447\u04AF\u043D \u0431\u0430\u0441\u044B\u04A3\u044B\u0437",
              finishCircle: "\u0410\u0439\u043B\u0430\u043D\u0430\u043D\u044B \u0431\u04AF\u0442\u04AF\u0440\u04AF\u04AF \u04AF\u0447\u04AF\u043D \u0431\u0430\u0441\u044B\u04A3\u044B\u0437",
              placeCircleMarker: "\u0422\u0435\u0433\u0435\u0440\u0435\u043A \u043C\u0430\u0440\u043A\u0435\u0440\u0434\u0438 \u0436\u0430\u0439\u0433\u0430\u0448\u0442\u044B\u0440\u0443\u0443 \u04AF\u0447\u04AF\u043D \u0431\u0430\u0441\u044B\u04A3\u044B\u0437",
              placeText: "\u0422\u0435\u043A\u0441\u0442\u0442\u0438 \u0436\u0430\u0439\u0433\u0430\u0448\u0442\u044B\u0440\u0443\u0443 \u04AF\u0447\u04AF\u043D \u0431\u0430\u0441\u044B\u04A3\u044B\u0437"
            },
            actions: {
              finish: "\u0410\u044F\u0433\u044B",
              cancel: "\u0416\u043E\u043A \u043A\u044B\u043B\u0443\u0443",
              removeLastVertex: "\u0410\u043A\u044B\u0440\u043A\u044B \u0447\u043E\u043A\u0443\u043D\u0443 \u04E9\u0447\u04AF\u0440\u04AF\u04AF"
            },
            buttonTitles: {
              drawMarkerButton: "\u041C\u0430\u0440\u043A\u0435\u0440\u0434\u0438 \u0447\u0438\u0437\u0443\u0443",
              drawPolyButton: "\u041F\u043E\u043B\u0438\u0433\u043E\u043D \u0447\u0438\u0437\u0443\u0443",
              drawLineButton: "\u041F\u043E\u043B\u0438\u043B\u0438\u043D\u0438\u044F \u0447\u0438\u0437\u0443\u0443",
              drawCircleButton: "\u0414\u0430\u0439\u044B\u043D\u0434\u044B \u0447\u0438\u0437\u0443\u0443",
              drawRectButton: "\u041F\u0440\u044F\u043C\u043E\u0443\u0433\u043E\u043B\u044C\u043D\u0438\u043A \u0447\u0438\u0437\u0443\u0443",
              editButton: "\u0421\u043B\u043E\u043E\u043F\u0442\u0443 \u0442\u04AF\u0437\u04E9\u0442\u04AF\u04AF",
              dragButton: "\u0421\u043B\u043E\u043E\u043F\u0442\u0443 \u043A\u0430\u0440\u0430\u043F \u0441\u04AF\u0439\u043B\u04E9\u04AF",
              cutButton: "\u0421\u043B\u043E\u043E\u043F\u0442\u0443\u043D \u0431\u0430\u0448\u044B\u043D \u043A\u0435\u0441\u04AF\u04AF",
              deleteButton: "\u0421\u043B\u043E\u043E\u043F\u0442\u0443\u043D \u04E9\u0447\u04AF\u0440\u04AF\u04AF",
              drawCircleMarkerButton: "\u0414\u0430\u0439\u044B\u043D\u0434\u044B \u043C\u0430\u0440\u043A\u0435\u0440\u0434\u0438 \u0447\u0438\u0437\u0443\u0443",
              snappingButton: "\u0411\u0430\u0448\u043A\u0430 \u0441\u043B\u043E\u043E\u043F\u0442\u043E\u0440\u0434\u0443\u043D \u0436\u0430\u043D\u0430 \u0432\u0435\u0440\u0442\u0435\u043A\u0441\u0442\u0435\u0440\u0434\u0438\u043D \u0430\u0440\u0430\u0441\u044B\u043D\u0430 \u0447\u0435\u043A\u0438\u043B\u0434\u04E9\u04E9",
              pinningButton: "\u0411\u04E9\u043B\u04AF\u0448\u043A\u04E9\u043D \u0432\u0435\u0440\u0442\u0435\u043A\u0441\u0442\u0435\u0440\u0434\u0438 \u0431\u0438\u0440\u0433\u0435 \u0442\u0443\u0442\u0443\u0448\u0442\u0443\u0440\u0443\u0443",
              rotateButton: "\u0421\u043B\u043E\u043E\u043F\u0442\u0443\u043D \u04E9\u0437\u0433\u04E9\u0440\u0442\u04AF\u04AF",
              drawTextButton: "\u0422\u0435\u043A\u0441\u0442 \u0447\u0438\u0437\u0443\u0443",
              scaleButton: "\u0421\u043B\u043E\u043E\u043F\u0442\u0443\u043D \u04E9\u043B\u0447\u04E9\u043C\u04AF\u043D \u04E9\u0437\u0433\u04E9\u0440\u0442\u04AF\u04AF",
              autoTracingButton: "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0442\u044B\u043A \u0442\u0438\u0437\u043C\u0435\u0433\u0438 \u0447\u0438\u0437\u0443\u0443"
            },
            measurements: {
              totalLength: "\u0423\u0437\u0443\u043D\u0434\u0443\u043A",
              segmentLength: "\u0421\u0435\u0433\u043C\u0435\u043D\u0442 \u0443\u0437\u0443\u043D\u0434\u0443\u0433\u0443",
              area: "\u0410\u0439\u043C\u0430\u043A",
              radius: "\u0420\u0430\u0434\u0438\u0443\u0441",
              perimeter: "\u041F\u0435\u0440\u0438\u043C\u0435\u0442\u0440",
              height: "\u0414\u0438\u0430\u043C\u0435\u0442\u0440",
              width: "\u041A\u0435\u043D\u0447\u0438\u043B\u0438\u043A",
              coordinates: "\u041A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u0442\u0430\u0440",
              coordinatesMarker: "\u041C\u0430\u0440\u043A\u0435\u0440\u0434\u0438\u043D \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u0442\u0430\u0440\u044B"
            }
          }, Ke = di, St = {
            en: qi,
            de: Vi,
            it: yr,
            id: bt,
            ro: Yt,
            ru: vr,
            es: zn,
            nl: Te,
            fr: Qa,
            pt: Ke,
            pt_br: Jt,
            pt_pt: di,
            zh: Nn,
            zh_tw: ki,
            pl: gn,
            sv: yn,
            el: Lr,
            hu: vn,
            da: br,
            no: wr,
            fa: Un,
            ua: Cr,
            tr: xr,
            cz: Gn,
            ja: As,
            fi: Er,
            ko: $a,
            ky: vt
          }, Bs = {
            _globalEditModeEnabled: false,
            enableGlobalEditMode(e) {
              let i = {
                ...e
              };
              this._globalEditModeEnabled = true, this.Toolbar.toggleButton("editMode", this.globalEditModeEnabled()), L.PM.Utils.findLayers(this.map).forEach((r) => {
                this._isRelevantForEdit(r) && r.pm.enable(i);
              }), this.throttledReInitEdit || (this.throttledReInitEdit = L.Util.throttle(this.handleLayerAdditionInGlobalEditMode, 100, this)), this._addedLayersEdit = {}, this.map.on("layeradd", this._layerAddedEdit, this), this.map.on("layeradd", this.throttledReInitEdit, this), this._fireGlobalEditModeToggled(true);
            },
            disableGlobalEditMode() {
              this._globalEditModeEnabled = false, L.PM.Utils.findLayers(this.map).forEach((e) => {
                e.pm.disable();
              }), this.map.off("layeradd", this._layerAddedEdit, this), this.map.off("layeradd", this.throttledReInitEdit, this), this.Toolbar.toggleButton("editMode", this.globalEditModeEnabled()), this._fireGlobalEditModeToggled(false);
            },
            globalEditEnabled() {
              return this.globalEditModeEnabled();
            },
            globalEditModeEnabled() {
              return this._globalEditModeEnabled;
            },
            toggleGlobalEditMode(e = this.globalOptions) {
              this.globalEditModeEnabled() ? this.disableGlobalEditMode() : this.enableGlobalEditMode(e);
            },
            handleLayerAdditionInGlobalEditMode() {
              let e = this._addedLayersEdit;
              if (this._addedLayersEdit = {}, this.globalEditModeEnabled()) for (let i in e) {
                let r = e[i];
                this._isRelevantForEdit(r) && r.pm.enable({
                  ...this.globalOptions
                });
              }
            },
            _layerAddedEdit({ layer: e }) {
              this._addedLayersEdit[L.stamp(e)] = e;
            },
            _isRelevantForEdit(e) {
              return e.pm && !(e instanceof L.LayerGroup) && (!L.PM.optIn && !e.options.pmIgnore || L.PM.optIn && e.options.pmIgnore === false) && !e._pmTempLayer && e.pm.options.allowEditing;
            }
          }, Mr = Bs, kr = {
            _globalDragModeEnabled: false,
            enableGlobalDragMode() {
              let e = L.PM.Utils.findLayers(this.map);
              this._globalDragModeEnabled = true, this._addedLayersDrag = {}, e.forEach((i) => {
                this._isRelevantForDrag(i) && i.pm.enableLayerDrag();
              }), this.throttledReInitDrag || (this.throttledReInitDrag = L.Util.throttle(this.reinitGlobalDragMode, 100, this)), this.map.on("layeradd", this._layerAddedDrag, this), this.map.on("layeradd", this.throttledReInitDrag, this), this.Toolbar.toggleButton("dragMode", this.globalDragModeEnabled()), this._fireGlobalDragModeToggled(true);
            },
            disableGlobalDragMode() {
              let e = L.PM.Utils.findLayers(this.map);
              this._globalDragModeEnabled = false, e.forEach((i) => {
                i.pm.disableLayerDrag();
              }), this.map.off("layeradd", this._layerAddedDrag, this), this.map.off("layeradd", this.throttledReInitDrag, this), this.Toolbar.toggleButton("dragMode", this.globalDragModeEnabled()), this._fireGlobalDragModeToggled(false);
            },
            globalDragModeEnabled() {
              return !!this._globalDragModeEnabled;
            },
            toggleGlobalDragMode() {
              this.globalDragModeEnabled() ? this.disableGlobalDragMode() : this.enableGlobalDragMode();
            },
            reinitGlobalDragMode() {
              let e = this._addedLayersDrag;
              if (this._addedLayersDrag = {}, this.globalDragModeEnabled()) for (let i in e) {
                let r = e[i];
                this._isRelevantForDrag(r) && r.pm.enableLayerDrag();
              }
            },
            _layerAddedDrag({ layer: e }) {
              this._addedLayersDrag[L.stamp(e)] = e;
            },
            _isRelevantForDrag(e) {
              return e.pm && !(e instanceof L.LayerGroup) && (!L.PM.optIn && !e.options.pmIgnore || L.PM.optIn && e.options.pmIgnore === false) && !e._pmTempLayer && e.pm.options.draggable;
            }
          }, Ar = kr, Ai = {
            _globalRemovalModeEnabled: false,
            enableGlobalRemovalMode() {
              this._globalRemovalModeEnabled = true, this.map.eachLayer((e) => {
                this._isRelevantForRemoval(e) && (e.pm.enabled() && e.pm.disable(), e.on("click", this.removeLayer, this));
              }), this.throttledReInitRemoval || (this.throttledReInitRemoval = L.Util.throttle(this.handleLayerAdditionInGlobalRemovalMode, 100, this)), this._addedLayersRemoval = {}, this.map.on("layeradd", this._layerAddedRemoval, this), this.map.on("layeradd", this.throttledReInitRemoval, this), this.Toolbar.toggleButton("removalMode", this.globalRemovalModeEnabled()), this._fireGlobalRemovalModeToggled(true);
            },
            disableGlobalRemovalMode() {
              this._globalRemovalModeEnabled = false, this.map.eachLayer((e) => {
                e.off("click", this.removeLayer, this);
              }), this.map.off("layeradd", this._layerAddedRemoval, this), this.map.off("layeradd", this.throttledReInitRemoval, this), this.Toolbar.toggleButton("removalMode", this.globalRemovalModeEnabled()), this._fireGlobalRemovalModeToggled(false);
            },
            globalRemovalEnabled() {
              return this.globalRemovalModeEnabled();
            },
            globalRemovalModeEnabled() {
              return !!this._globalRemovalModeEnabled;
            },
            toggleGlobalRemovalMode() {
              this.globalRemovalModeEnabled() ? this.disableGlobalRemovalMode() : this.enableGlobalRemovalMode();
            },
            removeLayer(e) {
              let i = e.target;
              this._isRelevantForRemoval(i) && !i.pm.dragging() && (i.removeFrom(this.map.pm._getContainingLayer()), i.remove(), i instanceof L.LayerGroup ? (this._fireRemoveLayerGroup(i), this._fireRemoveLayerGroup(this.map, i)) : (i.pm._fireRemove(i), i.pm._fireRemove(this.map, i)));
            },
            _isRelevantForRemoval(e) {
              return e.pm && !(e instanceof L.LayerGroup) && (!L.PM.optIn && !e.options.pmIgnore || L.PM.optIn && e.options.pmIgnore === false) && !e._pmTempLayer && e.pm.options.allowRemoval;
            },
            handleLayerAdditionInGlobalRemovalMode() {
              let e = this._addedLayersRemoval;
              if (this._addedLayersRemoval = {}, this.globalRemovalModeEnabled()) for (let i in e) {
                let r = e[i];
                this._isRelevantForRemoval(r) && (r.pm.enabled() && r.pm.disable(), r.on("click", this.removeLayer, this));
              }
            },
            _layerAddedRemoval({ layer: e }) {
              this._addedLayersRemoval[L.stamp(e)] = e;
            }
          }, Br = Ai, Ln = {
            _globalRotateModeEnabled: false,
            enableGlobalRotateMode() {
              this._globalRotateModeEnabled = true, L.PM.Utils.findLayers(this.map).filter((e) => e instanceof L.Polyline).forEach((e) => {
                this._isRelevantForRotate(e) && e.pm.enableRotate();
              }), this.throttledReInitRotate || (this.throttledReInitRotate = L.Util.throttle(this.handleLayerAdditionInGlobalRotateMode, 100, this)), this._addedLayersRotate = {}, this.map.on("layeradd", this._layerAddedRotate, this), this.map.on("layeradd", this.throttledReInitRotate, this), this.Toolbar.toggleButton("rotateMode", this.globalRotateModeEnabled()), this._fireGlobalRotateModeToggled();
            },
            disableGlobalRotateMode() {
              this._globalRotateModeEnabled = false, L.PM.Utils.findLayers(this.map).filter((e) => e instanceof L.Polyline).forEach((e) => {
                e.pm.disableRotate();
              }), this.map.off("layeradd", this._layerAddedRotate, this), this.map.off("layeradd", this.throttledReInitRotate, this), this.Toolbar.toggleButton("rotateMode", this.globalRotateModeEnabled()), this._fireGlobalRotateModeToggled();
            },
            globalRotateModeEnabled() {
              return !!this._globalRotateModeEnabled;
            },
            toggleGlobalRotateMode() {
              this.globalRotateModeEnabled() ? this.disableGlobalRotateMode() : this.enableGlobalRotateMode();
            },
            _isRelevantForRotate(e) {
              return e.pm && e instanceof L.Polyline && !(e instanceof L.LayerGroup) && (!L.PM.optIn && !e.options.pmIgnore || L.PM.optIn && e.options.pmIgnore === false) && !e._pmTempLayer && e.pm.options.allowRotation;
            },
            handleLayerAdditionInGlobalRotateMode() {
              let e = this._addedLayersRotate;
              if (this._addedLayersRotate = {}, this.globalRotateModeEnabled()) for (let i in e) {
                let r = e[i];
                this._isRelevantForRemoval(r) && r.pm.enableRotate();
              }
            },
            _layerAddedRotate({ layer: e }) {
              this._addedLayersRotate[L.stamp(e)] = e;
            }
          }, ae = Ln, Bi = et(Rn()), Ps = {
            _fireDrawStart(e = "Draw", i = {}) {
              this.__fire(this._map, "pm:drawstart", {
                shape: this._shape,
                workingLayer: this._layer
              }, e, i);
            },
            _fireDrawEnd(e = "Draw", i = {}) {
              this.__fire(this._map, "pm:drawend", {
                shape: this._shape
              }, e, i);
            },
            _fireCreate(e, i = "Draw", r = {}) {
              this.__fire(this._map, "pm:create", {
                shape: this._shape,
                marker: e,
                layer: e
              }, i, r);
            },
            _fireCenterPlaced(e = "Draw", i = {}) {
              let r = e === "Draw" ? this._layer : void 0, s = e !== "Draw" ? this._layer : void 0;
              this.__fire(this._layer, "pm:centerplaced", {
                shape: this._shape,
                workingLayer: r,
                layer: s,
                latlng: this._layer.getLatLng()
              }, e, i);
            },
            _fireCut(e, i, r, s = "Draw", u = {}) {
              this.__fire(e, "pm:cut", {
                shape: this._shape,
                layer: i,
                originalLayer: r
              }, s, u);
            },
            _fireEdit(e = this._layer, i = "Edit", r = {}) {
              this.__fire(e, "pm:edit", {
                layer: this._layer,
                shape: this.getShape()
              }, i, r);
            },
            _fireEnable(e = "Edit", i = {}) {
              this.__fire(this._layer, "pm:enable", {
                layer: this._layer,
                shape: this.getShape()
              }, e, i);
            },
            _fireDisable(e = "Edit", i = {}) {
              this.__fire(this._layer, "pm:disable", {
                layer: this._layer,
                shape: this.getShape()
              }, e, i);
            },
            _fireUpdate(e = "Edit", i = {}) {
              this.__fire(this._layer, "pm:update", {
                layer: this._layer,
                shape: this.getShape()
              }, e, i);
            },
            _fireMarkerDragStart(e, i = void 0, r = "Edit", s = {}) {
              this.__fire(this._layer, "pm:markerdragstart", {
                layer: this._layer,
                markerEvent: e,
                shape: this.getShape(),
                indexPath: i
              }, r, s);
            },
            _fireMarkerDrag(e, i = void 0, r = "Edit", s = {}) {
              this.__fire(this._layer, "pm:markerdrag", {
                layer: this._layer,
                markerEvent: e,
                shape: this.getShape(),
                indexPath: i
              }, r, s);
            },
            _fireMarkerDragEnd(e, i = void 0, r = void 0, s = "Edit", u = {}) {
              this.__fire(this._layer, "pm:markerdragend", {
                layer: this._layer,
                markerEvent: e,
                shape: this.getShape(),
                indexPath: i,
                intersectionReset: r
              }, s, u);
            },
            _fireDragStart(e = "Edit", i = {}) {
              this.__fire(this._layer, "pm:dragstart", {
                layer: this._layer,
                shape: this.getShape()
              }, e, i);
            },
            _fireDrag(e, i = "Edit", r = {}) {
              this.__fire(this._layer, "pm:drag", {
                ...e,
                shape: this.getShape()
              }, i, r);
            },
            _fireDragEnd(e = "Edit", i = {}) {
              this.__fire(this._layer, "pm:dragend", {
                layer: this._layer,
                shape: this.getShape()
              }, e, i);
            },
            _fireDragEnable(e = "Edit", i = {}) {
              this.__fire(this._layer, "pm:dragenable", {
                layer: this._layer,
                shape: this.getShape()
              }, e, i);
            },
            _fireDragDisable(e = "Edit", i = {}) {
              this.__fire(this._layer, "pm:dragdisable", {
                layer: this._layer,
                shape: this.getShape()
              }, e, i);
            },
            _fireRemove(e, i = e, r = "Edit", s = {}) {
              this.__fire(e, "pm:remove", {
                layer: i,
                shape: this.getShape()
              }, r, s);
            },
            _fireVertexAdded(e, i, r, s = "Edit", u = {}) {
              this.__fire(this._layer, "pm:vertexadded", {
                layer: this._layer,
                workingLayer: this._layer,
                marker: e,
                indexPath: i,
                latlng: r,
                shape: this.getShape()
              }, s, u);
            },
            _fireVertexRemoved(e, i, r = "Edit", s = {}) {
              this.__fire(this._layer, "pm:vertexremoved", {
                layer: this._layer,
                marker: e,
                indexPath: i,
                shape: this.getShape()
              }, r, s);
            },
            _fireVertexClick(e, i, r = "Edit", s = {}) {
              this.__fire(this._layer, "pm:vertexclick", {
                layer: this._layer,
                markerEvent: e,
                indexPath: i,
                shape: this.getShape()
              }, r, s);
            },
            _fireIntersect(e, i = this._layer, r = "Edit", s = {}) {
              this.__fire(i, "pm:intersect", {
                layer: this._layer,
                intersection: e,
                shape: this.getShape()
              }, r, s);
            },
            _fireLayerReset(e, i, r = "Edit", s = {}) {
              this.__fire(this._layer, "pm:layerreset", {
                layer: this._layer,
                markerEvent: e,
                indexPath: i,
                shape: this.getShape()
              }, r, s);
            },
            _fireChange(e, i = "Edit", r = {}) {
              this.__fire(this._layer, "pm:change", {
                layer: this._layer,
                latlngs: e,
                shape: this.getShape()
              }, i, r);
            },
            _fireTextChange(e, i = "Edit", r = {}) {
              this.__fire(this._layer, "pm:textchange", {
                layer: this._layer,
                text: e,
                shape: this.getShape()
              }, i, r);
            },
            _fireTextFocus(e = "Edit", i = {}) {
              this.__fire(this._layer, "pm:textfocus", {
                layer: this._layer,
                shape: this.getShape()
              }, e, i);
            },
            _fireTextBlur(e = "Edit", i = {}) {
              this.__fire(this._layer, "pm:textblur", {
                layer: this._layer,
                shape: this.getShape()
              }, e, i);
            },
            _fireSnapDrag(e, i, r = "Snapping", s = {}) {
              this.__fire(e, "pm:snapdrag", i, r, s);
            },
            _fireSnap(e, i, r = "Snapping", s = {}) {
              this.__fire(e, "pm:snap", i, r, s);
            },
            _fireUnsnap(e, i, r = "Snapping", s = {}) {
              this.__fire(e, "pm:unsnap", i, r, s);
            },
            _fireRotationEnable(e, i, r = "Rotation", s = {}) {
              this.__fire(e, "pm:rotateenable", {
                layer: this._layer,
                helpLayer: this._rotatePoly,
                shape: this.getShape()
              }, r, s);
            },
            _fireRotationDisable(e, i = "Rotation", r = {}) {
              this.__fire(e, "pm:rotatedisable", {
                layer: this._layer,
                shape: this.getShape()
              }, i, r);
            },
            _fireRotationStart(e, i, r = "Rotation", s = {}) {
              this.__fire(e, "pm:rotatestart", {
                layer: this._rotationLayer,
                helpLayer: this._layer,
                startAngle: this._startAngle,
                originLatLngs: i
              }, r, s);
            },
            _fireRotation(e, i, r, s = this._rotationLayer, u = "Rotation", c = {}) {
              this.__fire(e, "pm:rotate", {
                layer: s,
                helpLayer: this._layer,
                startAngle: this._startAngle,
                angle: s.pm.getAngle(),
                angleDiff: i,
                oldLatLngs: r,
                newLatLngs: s.getLatLngs()
              }, u, c);
            },
            _fireRotationEnd(e, i, r, s = "Rotation", u = {}) {
              this.__fire(e, "pm:rotateend", {
                layer: this._rotationLayer,
                helpLayer: this._layer,
                startAngle: i,
                angle: this._rotationLayer.pm.getAngle(),
                originLatLngs: r,
                newLatLngs: this._rotationLayer.getLatLngs()
              }, s, u);
            },
            _fireActionClick(e, i, r, s = "Toolbar", u = {}) {
              this.__fire(this._map, "pm:actionclick", {
                text: e.text,
                action: e,
                btnName: i,
                button: r
              }, s, u);
            },
            _fireButtonClick(e, i, r = "Toolbar", s = {}) {
              this.__fire(this._map, "pm:buttonclick", {
                btnName: e,
                button: i
              }, r, s);
            },
            _fireLangChange(e, i, r, s, u = "Global", c = {}) {
              this.__fire(this.map, "pm:langchange", {
                oldLang: e,
                activeLang: i,
                fallback: r,
                translations: s
              }, u, c);
            },
            _fireGlobalDragModeToggled(e, i = "Global", r = {}) {
              this.__fire(this.map, "pm:globaldragmodetoggled", {
                enabled: e,
                map: this.map
              }, i, r);
            },
            _fireGlobalEditModeToggled(e, i = "Global", r = {}) {
              this.__fire(this.map, "pm:globaleditmodetoggled", {
                enabled: e,
                map: this.map
              }, i, r);
            },
            _fireGlobalRemovalModeToggled(e, i = "Global", r = {}) {
              this.__fire(this.map, "pm:globalremovalmodetoggled", {
                enabled: e,
                map: this.map
              }, i, r);
            },
            _fireGlobalCutModeToggled(e = "Global", i = {}) {
              this.__fire(this._map, "pm:globalcutmodetoggled", {
                enabled: !!this._enabled,
                map: this._map
              }, e, i);
            },
            _fireGlobalDrawModeToggled(e = "Global", i = {}) {
              this.__fire(this._map, "pm:globaldrawmodetoggled", {
                enabled: this._enabled,
                shape: this._shape,
                map: this._map
              }, e, i);
            },
            _fireGlobalRotateModeToggled(e = "Global", i = {}) {
              this.__fire(this.map, "pm:globalrotatemodetoggled", {
                enabled: this.globalRotateModeEnabled(),
                map: this.map
              }, e, i);
            },
            _fireRemoveLayerGroup(e, i = e, r = "Edit", s = {}) {
              this.__fire(e, "pm:remove", {
                layer: i,
                shape: void 0
              }, r, s);
            },
            _fireKeyeventEvent(e, i, r, s = "Global", u = {}) {
              this.__fire(this.map, "pm:keyevent", {
                event: e,
                eventType: i,
                focusOn: r
              }, s, u);
            },
            __fire(e, i, r, s, u = {}) {
              r = (0, Bi.default)(r, u, {
                source: s
              }), L.PM.Utils._fireEvent(e, i, r);
            }
          }, bn = Ps, to = () => ({
            _lastEvents: {
              keydown: void 0,
              keyup: void 0,
              current: void 0
            },
            _initKeyListener(e) {
              this.map = e, L.DomEvent.on(document, "keydown keyup", this._onKeyListener, this), L.DomEvent.on(window, "blur", this._onBlur, this), e.once("unload", this._unbindKeyListenerEvents, this);
            },
            _handleEscapeKey(e) {
              let i = this.map.pm;
              return !i.getGlobalOptions().exitModeOnEscape || !(i.globalDrawModeEnabled() || i.globalEditModeEnabled() || i.globalDragModeEnabled() || i.globalRemovalModeEnabled() || i.globalRotateModeEnabled() || i.globalCutModeEnabled()) ? false : (e.preventDefault(), i.globalDrawModeEnabled() && i.disableDraw(), i.globalEditModeEnabled() && i.disableGlobalEditMode(), i.globalDragModeEnabled() && i.disableGlobalDragMode(), i.globalRemovalModeEnabled() && i.disableGlobalRemovalMode(), i.globalRotateModeEnabled() && i.disableGlobalRotateMode(), i.globalCutModeEnabled() && i.disableGlobalCutMode(), true);
            },
            _handleEnterKey(e) {
              let i = this.map.pm;
              if (!i.getGlobalOptions().finishOnEnter) return false;
              let r = i.Draw.getActiveShape();
              if (!r) return false;
              let s = i.Draw[r];
              return !s || !s._finishShape || !this._canFinishShape(s, r) ? false : (e.preventDefault(), s._finishShape(), true);
            },
            _canFinishShape(e, i) {
              var _a3;
              if ([
                "Marker",
                "CircleMarker",
                "Text"
              ].includes(i)) return false;
              if (i === "Rectangle") return e._startMarker !== void 0;
              if (i === "Circle") return e._centerMarker && ((_a3 = e._layerGroup) == null ? void 0 : _a3.hasLayer(e._centerMarker));
              if (e._layer && e._layer.getLatLngs) {
                let r = e._layer.getLatLngs();
                if (i === "Line") return (r.flat ? r.flat() : r).length >= 2;
                if (i === "Polygon" || i === "Cut") return r.length >= 3;
              }
              return false;
            },
            _unbindKeyListenerEvents() {
              L.DomEvent.off(document, "keydown keyup", this._onKeyListener, this), L.DomEvent.off(window, "blur", this._onBlur, this);
            },
            _onKeyListener(e) {
              let i = "document";
              this.map.getContainer().contains(e.target) && (i = "map");
              let r = {
                event: e,
                eventType: e.type,
                focusOn: i
              };
              this._lastEvents[e.type] = r, this._lastEvents.current = r, this.map.pm._fireKeyeventEvent(e, e.type, i), e.type === "keydown" && (e.key === "Escape" && this._handleEscapeKey(e), e.key === "Enter" && this._handleEnterKey(e));
            },
            _onBlur(e) {
              e.altKey = false;
              let i = {
                event: e,
                eventType: e.type,
                focusOn: "document"
              };
              this._lastEvents[e.type] = i, this._lastEvents.current = i;
            },
            getLastKeyEvent(e = "current") {
              return this._lastEvents[e];
            },
            isShiftKeyPressed() {
              var _a3;
              return (_a3 = this._lastEvents.current) == null ? void 0 : _a3.event.shiftKey;
            },
            isAltKeyPressed() {
              var _a3;
              return (_a3 = this._lastEvents.current) == null ? void 0 : _a3.event.altKey;
            },
            isCtrlKeyPressed() {
              var _a3;
              return (_a3 = this._lastEvents.current) == null ? void 0 : _a3.event.ctrlKey;
            },
            isMetaKeyPressed() {
              var _a3;
              return (_a3 = this._lastEvents.current) == null ? void 0 : _a3.event.metaKey;
            },
            getPressedKey() {
              var _a3;
              return (_a3 = this._lastEvents.current) == null ? void 0 : _a3.event.key;
            }
          }), Ts = to, Zn = et(ci());
          function At(e) {
            let i = L.PM.activeLang;
            return (0, Zn.default)(St[i], e) || (0, Zn.default)(St.en, e) || e;
          }
          function Ss() {
            return window.matchMedia ? !window.matchMedia("(pointer: coarse)").matches : true;
          }
          function kt(e) {
            for (let i = 0; i < e.length; i += 1) {
              let r = e[i];
              if (Array.isArray(r)) {
                if (kt(r)) return true;
              } else if (r != null && r !== "") return true;
            }
            return false;
          }
          function jn(e) {
            return e.reduce((i, r) => {
              if (r.length !== 0) {
                let s = Array.isArray(r) ? jn(r) : r;
                Array.isArray(s) ? s.length !== 0 && i.push(s) : i.push(s);
              }
              return i;
            }, []);
          }
          function je(e, i, r) {
            let s = {
              a: L.CRS.Earth.R,
              b: 63567523142e-4,
              f: 0.0033528106647474805
            }, { a: u, b: c, f: p } = s, f = e.lng, m = e.lat, y = r, A = Math.PI, C = i * A / 180, O = Math.sin(C), R = Math.cos(C), H = (1 - p) * Math.tan(m * A / 180), K = 1 / Math.sqrt(1 + H * H), it = H * K, st = Math.atan2(H, R), k = K * O, z = 1 - k * k, V = z * (u * u - c * c) / (c * c), tt = 1 + V / 16384 * (4096 + V * (-768 + V * (320 - 175 * V))), Q = V / 1024 * (256 + V * (-128 + V * (74 - 47 * V))), $ = y / (c * tt), b = 2 * Math.PI, w, E, D;
            for (; Math.abs($ - b) > 1e-12; ) {
              w = Math.cos(2 * st + $), E = Math.sin($), D = Math.cos($);
              let Y = Q * E * (w + Q / 4 * (D * (-1 + 2 * w * w) - Q / 6 * w * (-3 + 4 * E * E) * (-3 + 4 * w * w)));
              b = $, $ = y / (c * tt) + Y;
            }
            let T = it * E - K * D * R, B = Math.atan2(it * D + K * E * R, (1 - p) * Math.sqrt(k * k + T * T)), N = Math.atan2(E * O, K * D - it * E * R), I = p / 16 * z * (4 + p * (4 - 3 * z)), F = N - (1 - I) * p * k * ($ + I * E * (w + I * D * (-1 + 2 * w * w))), j = f + F * 180 / A, Z = B * 180 / A;
            return L.latLng(j, Z);
          }
          function Hi(e, i, r, s, u = true) {
            let c, p, f, m = [];
            for (let y = 0; y < r; y += 1) {
              if (u) c = y * 360 / r + s, p = je(e, c, i), f = L.latLng(p.lng, p.lat);
              else {
                let A = e.lat + Math.cos(2 * y * Math.PI / r) * i, C = e.lng + Math.sin(2 * y * Math.PI / r) * i;
                f = L.latLng(A, C);
              }
              m.push(f);
            }
            return m;
          }
          function Ds(e, i, r) {
            i = (i + 360) % 360;
            let s = Math.PI / 180, u = 180 / Math.PI, { R: c } = L.CRS.Earth, p = e.lng * s, f = e.lat * s, m = i * s, y = Math.sin(f), A = Math.cos(f), C = Math.cos(r / c), O = Math.sin(r / c), R = Math.asin(y * C + A * O * Math.cos(m)), H = p + Math.atan2(Math.sin(m) * O * A, C - y * Math.sin(R));
            H *= u;
            let K = H - 360, it = H < -180 ? H + 360 : H;
            return H = H > 180 ? K : it, L.latLng([
              R * u,
              H
            ]);
          }
          function Pr(e, i, r) {
            let s = e.latLngToContainerPoint(i), u = e.latLngToContainerPoint(r), c = Math.atan2(u.y - s.y, u.x - s.x) * 180 / Math.PI + 90;
            return c += c < 0 ? 360 : 0, c;
          }
          function Wi(e, i, r, s) {
            let u = Pr(e, i, r);
            return Ds(i, u, s);
          }
          function eo(e, i, r = "asc") {
            if (!i || Object.keys(i).length === 0) return (m, y) => m - y;
            let s = Object.keys(i), u, c = s.length - 1, p = {};
            for (; c >= 0; ) u = s[c], p[u.toLowerCase()] = i[u], c -= 1;
            function f(m) {
              if (m instanceof L.Marker) return "Marker";
              if (m instanceof L.Circle) return "Circle";
              if (m instanceof L.CircleMarker) return "CircleMarker";
              if (m instanceof L.Rectangle) return "Rectangle";
              if (m instanceof L.Polygon) return "Polygon";
              if (m instanceof L.Polyline) return "Line";
            }
            return (m, y) => {
              let A, C;
              if (A = f(m.layer).toLowerCase(), C = f(y.layer).toLowerCase(), !A || !C) return 0;
              let O = A in p ? p[A] : Number.MAX_SAFE_INTEGER, R = C in p ? p[C] : Number.MAX_SAFE_INTEGER, H = 0;
              return O < R ? H = -1 : O > R && (H = 1), r === "desc" ? H * -1 : H;
            };
          }
          function ri(e, i = e.getLatLngs()) {
            return e instanceof L.Polygon ? L.polygon(i).getLatLngs() : L.polyline(i).getLatLngs();
          }
          function Is(e, i) {
            var _a3, _b2, _c2, _d;
            if ((_b2 = (_a3 = i.options.crs) == null ? void 0 : _a3.projection) == null ? void 0 : _b2.MAX_LATITUDE) {
              let r = (_d = (_c2 = i.options.crs) == null ? void 0 : _c2.projection) == null ? void 0 : _d.MAX_LATITUDE;
              e.lat = Math.max(Math.min(r, e.lat), -r);
            }
            return e;
          }
          function Ki(e) {
            return e.options.renderer || e._map && (e._map._getPaneRenderer(e.options.pane) || e._map.options.renderer || e._map._renderer) || e._renderer;
          }
          function Tr(e, i) {
            if (e = e.trim().toLowerCase(), i[e]) return e;
            let r = e.replace(/[-_\s]/g, "_").match(/^([a-z]{2,3})(?:_([a-z]{2,3}))?$/);
            if (r) {
              let s = [];
              r[2] && s.push(`${r[1]}_${r[2]}`), s.push(r[1]);
              for (let u of s) if (i[u]) return u;
            }
            return e;
          }
          var io = L.Class.extend({
            includes: [
              Mr,
              Ar,
              Br,
              ae,
              bn
            ],
            initialize(e) {
              this.map = e, this.Draw = new L.PM.Draw(e), this.Toolbar = new L.PM.Toolbar(e), this.Keyboard = Ts(), this.globalOptions = {
                snappable: true,
                layerGroup: void 0,
                snappingOrder: [
                  "Marker",
                  "CircleMarker",
                  "Circle",
                  "Line",
                  "Polygon",
                  "Rectangle"
                ],
                panes: {
                  vertexPane: "markerPane",
                  layerPane: "overlayPane",
                  markerPane: "markerPane"
                },
                draggable: true,
                exitModeOnEscape: false,
                finishOnEnter: false
              }, this.Keyboard._initKeyListener(e);
            },
            setLang(e = "en", i, r = "en") {
              e = Tr(e, St);
              let s = L.PM.activeLang;
              i && (St[e] = (0, mn.default)(St[r], i)), L.PM.activeLang = e, this.map.pm.Toolbar.reinit(), this._fireLangChange(s, e, r, St[e]);
            },
            addControls(e) {
              this.Toolbar.addControls(e);
            },
            removeControls() {
              this.Toolbar.removeControls();
            },
            toggleControls() {
              this.Toolbar.toggleControls();
            },
            controlsVisible() {
              return this.Toolbar.isVisible;
            },
            enableDraw(e = "Polygon", i) {
              e === "Poly" && (e = "Polygon"), this.Draw.enable(e, i);
            },
            disableDraw(e = "Polygon") {
              e === "Poly" && (e = "Polygon"), this.Draw.disable(e);
            },
            setPathOptions(e, i = {}) {
              let r = i.ignoreShapes || [], s = i.merge || false;
              this.map.pm.Draw.shapes.forEach((u) => {
                r.indexOf(u) === -1 && this.map.pm.Draw[u].setPathOptions(e, s);
              });
            },
            getGlobalOptions() {
              return this.globalOptions;
            },
            setGlobalOptions(e) {
              let i = (0, mn.default)(this.globalOptions, e);
              i.editable && (i.resizeableCircleMarker = i.editable, delete i.editable);
              let r = false;
              this.map.pm.Draw.CircleMarker.enabled() && !!this.map.pm.Draw.CircleMarker.options.resizeableCircleMarker != !!i.resizeableCircleMarker && (this.map.pm.Draw.CircleMarker.disable(), r = true);
              let s = false;
              this.map.pm.Draw.Circle.enabled() && !!this.map.pm.Draw.Circle.options.resizeableCircle != !!i.resizeableCircle && (this.map.pm.Draw.Circle.disable(), s = true), this.map.pm.Draw.shapes.forEach((u) => {
                this.map.pm.Draw[u].setOptions(i);
              }), r && this.map.pm.Draw.CircleMarker.enable(), s && this.map.pm.Draw.Circle.enable(), L.PM.Utils.findLayers(this.map).forEach((u) => {
                u.pm.setOptions(i);
              }), this.map.fire("pm:globaloptionschanged"), this.globalOptions = i, this.applyGlobalOptions();
            },
            applyGlobalOptions() {
              L.PM.Utils.findLayers(this.map).forEach((e) => {
                e.pm.enabled() && e.pm.applyOptions();
              });
            },
            globalDrawModeEnabled() {
              return !!this.Draw.getActiveShape();
            },
            globalCutModeEnabled() {
              return !!this.Draw.Cut.enabled();
            },
            enableGlobalCutMode(e) {
              return this.Draw.Cut.enable(e);
            },
            toggleGlobalCutMode(e) {
              return this.Draw.Cut.toggle(e);
            },
            disableGlobalCutMode() {
              return this.Draw.Cut.disable();
            },
            getGeomanLayers(e = false) {
              let i = L.PM.Utils.findLayers(this.map);
              if (!e) return i;
              let r = L.featureGroup();
              return r._pmTempLayer = true, i.forEach((s) => {
                r.addLayer(s);
              }), r;
            },
            getGeomanDrawLayers(e = false) {
              let i = L.PM.Utils.findLayers(this.map).filter((s) => s._drawnByGeoman === true);
              if (!e) return i;
              let r = L.featureGroup();
              return r._pmTempLayer = true, i.forEach((s) => {
                r.addLayer(s);
              }), r;
            },
            _getContainingLayer() {
              return this.globalOptions.layerGroup && this.globalOptions.layerGroup instanceof L.LayerGroup ? this.globalOptions.layerGroup : this.map;
            },
            _isCRSSimple() {
              return this.map.options.crs === L.CRS.Simple;
            },
            _touchEventCounter: 0,
            _addTouchEvents(e) {
              this._touchEventCounter === 0 && (L.DomEvent.on(e, "touchmove", this._canvasTouchMove, this), L.DomEvent.on(e, "touchstart touchend touchcancel", this._canvasTouchClick, this)), this._touchEventCounter += 1;
            },
            _removeTouchEvents(e) {
              this._touchEventCounter === 1 && (L.DomEvent.off(e, "touchmove", this._canvasTouchMove, this), L.DomEvent.off(e, "touchstart touchend touchcancel", this._canvasTouchClick, this)), this._touchEventCounter = this._touchEventCounter <= 1 ? 0 : this._touchEventCounter - 1;
            },
            _canvasTouchMove(e) {
              Ki(this.map)._onMouseMove(this._createMouseEvent("mousemove", e));
            },
            _canvasTouchClick(e) {
              let i = "";
              e.type === "touchstart" || e.type === "pointerdown" ? i = "mousedown" : (e.type === "touchend" || e.type === "pointerup" || e.type === "touchcancel" || e.type === "pointercancel") && (i = "mouseup"), i && Ki(this.map)._onClick(this._createMouseEvent(i, e));
            },
            _createMouseEvent(e, i) {
              let r, s = i.touches[0] || i.changedTouches[0];
              try {
                r = new MouseEvent(e, {
                  bubbles: i.bubbles,
                  cancelable: i.cancelable,
                  view: i.view,
                  detail: s.detail,
                  screenX: s.screenX,
                  screenY: s.screenY,
                  clientX: s.clientX,
                  clientY: s.clientY,
                  ctrlKey: i.ctrlKey,
                  altKey: i.altKey,
                  shiftKey: i.shiftKey,
                  metaKey: i.metaKey,
                  button: i.button,
                  relatedTarget: i.relatedTarget
                });
              } catch {
                r = document.createEvent("MouseEvents"), r.initMouseEvent(e, i.bubbles, i.cancelable, i.view, s.detail, s.screenX, s.screenY, s.clientX, s.clientY, i.ctrlKey, i.altKey, i.shiftKey, i.metaKey, i.button, i.relatedTarget);
              }
              return r;
            }
          }), Ye = io, no = L.Control.extend({
            includes: [
              bn
            ],
            options: {
              position: "topleft",
              disableByOtherButtons: true
            },
            initialize(e) {
              this._button = L.Util.extend({}, this.options, e);
            },
            onAdd(e) {
              return this._map = e, this._map.pm.Toolbar.options.oneBlock ? this._container = this._map.pm.Toolbar._createContainer(this.options.position) : this._button.tool === "edit" ? this._container = this._map.pm.Toolbar.editContainer : this._button.tool === "options" ? this._container = this._map.pm.Toolbar.optionsContainer : this._button.tool === "custom" ? this._container = this._map.pm.Toolbar.customContainer : this._container = this._map.pm.Toolbar.drawContainer, this._renderButton(), this._container;
            },
            _renderButton() {
              let e = this.buttonsDomNode;
              this.buttonsDomNode = this._makeButton(this._button), e ? e.replaceWith(this.buttonsDomNode) : this._container.appendChild(this.buttonsDomNode);
            },
            onRemove() {
              return this.buttonsDomNode.remove(), this._container;
            },
            getText() {
              return this._button.text;
            },
            getIconUrl() {
              return this._button.iconUrl;
            },
            destroy() {
              this._button = {}, this._update();
            },
            toggle(e) {
              return typeof e == "boolean" ? this._button.toggleStatus = e : this._button.toggleStatus = !this._button.toggleStatus, this._applyStyleClasses(), this._updateActiveAction(this._button), this._button.toggleStatus;
            },
            toggled() {
              return this._button.toggleStatus;
            },
            onCreate() {
              this.toggle(false);
            },
            disable() {
              this.toggle(false), this._button.disabled = true, this._updateDisabled();
            },
            enable() {
              this._button.disabled = false, this._updateDisabled(), this._updateActiveAction(this._button);
            },
            _triggerClick(e) {
              e && e.preventDefault(), !this._button.disabled && (this._button.onClick(e, {
                button: this,
                event: e
              }), this._clicked(e), this._button.afterClick(e, {
                button: this,
                event: e
              }));
            },
            _makeButton(e) {
              let i = this.options.position.indexOf("right") > -1 ? "pos-right" : "", r = L.DomUtil.create("div", `button-container  ${i}`, this._container);
              e.title && r.setAttribute("title", e.title);
              let s = L.DomUtil.create("a", "leaflet-buttons-control-button", r);
              s.setAttribute("role", "button"), s.setAttribute("tabindex", "0"), s.href = "#";
              let u = L.DomUtil.create("div", `leaflet-pm-actions-container ${i}`, r), c = e.actions, p = {
                cancel: {
                  text: At("actions.cancel"),
                  title: At("actions.cancel"),
                  onClick() {
                    this._triggerClick();
                  }
                },
                finishMode: {
                  text: At("actions.finish"),
                  title: At("actions.finish"),
                  onClick() {
                    this._triggerClick();
                  }
                },
                removeLastVertex: {
                  text: At("actions.removeLastVertex"),
                  title: At("actions.removeLastVertex"),
                  onClick() {
                    this._map.pm.Draw[e.jsClass]._removeLastVertex();
                  }
                },
                finish: {
                  text: At("actions.finish"),
                  title: At("actions.finish"),
                  onClick(m) {
                    this._map.pm.Draw[e.jsClass]._finishShape(m);
                  }
                }
              };
              e._preparedActions = c.map((m) => {
                let y = typeof m == "string" ? m : m.name, A;
                if (p[y]) A = p[y];
                else if (m.text) A = m;
                else return A;
                let C = L.DomUtil.create("a", `leaflet-pm-action ${i} action-${y}`, u);
                if (C.setAttribute("role", "button"), C.setAttribute("tabindex", "0"), C.href = "#", A.title && (C.title = A.title), C.innerHTML = A.text, L.DomEvent.disableClickPropagation(C), L.DomEvent.on(C, "click", L.DomEvent.stop), A._node = C, !e.disabled && A.onClick) {
                  let O = (R) => {
                    R.preventDefault();
                    let H = "", { buttons: K } = this._map.pm.Toolbar;
                    for (let it in K) if (K[it]._button === e) {
                      H = it;
                      break;
                    }
                    this._fireActionClick(A, H, e);
                  };
                  L.DomEvent.addListener(C, "click", O, this), L.DomEvent.addListener(C, "click", A.onClick, this), L.DomEvent.addListener(C, "click", () => this._updateActiveAction(e));
                }
                return A;
              }), this._updateActiveAction(e), e.toggleStatus && L.DomUtil.addClass(r, "active");
              let f = L.DomUtil.create("div", "control-icon", s);
              return e.iconUrl && f.setAttribute("src", e.iconUrl), e.className && L.DomUtil.addClass(f, e.className), L.DomEvent.disableClickPropagation(s), L.DomEvent.on(s, "click", L.DomEvent.stop), e.disabled || (L.DomEvent.addListener(s, "click", this._onBtnClick, this), L.DomEvent.addListener(s, "click", this._triggerClick, this)), e.disabled && (L.DomUtil.addClass(s, "pm-disabled"), s.setAttribute("aria-disabled", "true")), r;
            },
            _applyStyleClasses() {
              this._container && (!this._button.toggleStatus || this._button.cssToggle === false ? (L.DomUtil.removeClass(this.buttonsDomNode, "active"), L.DomUtil.removeClass(this._container, "activeChild")) : (L.DomUtil.addClass(this.buttonsDomNode, "active"), L.DomUtil.addClass(this._container, "activeChild")));
            },
            _onBtnClick() {
              if (this._button.disabled) return;
              this._button.disableOtherButtons && this._map.pm.Toolbar.triggerClickOnToggledButtons(this);
              let e = "", { buttons: i } = this._map.pm.Toolbar;
              for (let r in i) if (i[r]._button === this._button) {
                e = r;
                break;
              }
              this._fireButtonClick(e, this._button);
            },
            _clicked() {
              this._button.doToggle && this.toggle();
            },
            _updateDisabled() {
              if (!this._container) return;
              let e = "pm-disabled", i = this.buttonsDomNode.children[0];
              this._button.disabled ? (L.DomUtil.addClass(i, e), i.setAttribute("aria-disabled", "true")) : (L.DomUtil.removeClass(i, e), i.setAttribute("aria-disabled", "false"));
            },
            _updateActiveAction(e) {
              var _a3;
              (_a3 = e._preparedActions) == null ? void 0 : _a3.forEach((i) => {
                (i == null ? void 0 : i._node) && (i.isActive && i.isActive.call(this) ? L.DomUtil.addClass(i._node, "active-action") : L.DomUtil.removeClass(i._node, "active-action"));
              });
            }
          }), Os = no;
          L.Control.PMButton = Os;
          var pi = L.Class.extend({
            options: {
              drawMarker: true,
              drawRectangle: true,
              drawPolyline: true,
              drawPolygon: true,
              drawCircle: true,
              drawCircleMarker: true,
              drawText: true,
              editMode: true,
              dragMode: true,
              cutPolygon: true,
              removalMode: true,
              rotateMode: true,
              snappingOption: true,
              drawControls: true,
              editControls: true,
              optionsControls: true,
              customControls: true,
              oneBlock: false,
              position: "topleft",
              positions: {
                draw: "",
                edit: "",
                options: "",
                custom: ""
              }
            },
            customButtons: [],
            initialize(e) {
              this.customButtons = [], this.options.positions = {
                draw: "",
                edit: "",
                options: "",
                custom: ""
              }, this.init(e);
            },
            reinit() {
              let e = this.isVisible;
              this.removeControls(), this._defineButtons(), e && this.addControls();
            },
            init(e) {
              this.map = e, this.buttons = {}, this.isVisible = false, this.drawContainer = L.DomUtil.create("div", "leaflet-pm-toolbar leaflet-pm-draw leaflet-bar leaflet-control"), this.editContainer = L.DomUtil.create("div", "leaflet-pm-toolbar leaflet-pm-edit leaflet-bar leaflet-control"), this.optionsContainer = L.DomUtil.create("div", "leaflet-pm-toolbar leaflet-pm-options leaflet-bar leaflet-control"), this.customContainer = L.DomUtil.create("div", "leaflet-pm-toolbar leaflet-pm-custom leaflet-bar leaflet-control"), this._defineButtons();
            },
            _createContainer(e) {
              let i = `${e}Container`;
              return this[i] || (this[i] = L.DomUtil.create("div", `leaflet-pm-toolbar leaflet-pm-${e} leaflet-bar leaflet-control`)), this[i];
            },
            getButtons() {
              return this.buttons;
            },
            addControls(e = this.options) {
              typeof e.editPolygon < "u" && (e.editMode = e.editPolygon), typeof e.deleteLayer < "u" && (e.removalMode = e.deleteLayer), L.Util.setOptions(this, e), this.applyIconStyle(), this.isVisible = true, this._showHideButtons();
            },
            applyIconStyle() {
              let e = this.getButtons(), i = {
                geomanIcons: {
                  drawMarker: "control-icon leaflet-pm-icon-marker",
                  drawPolyline: "control-icon leaflet-pm-icon-polyline",
                  drawRectangle: "control-icon leaflet-pm-icon-rectangle",
                  drawPolygon: "control-icon leaflet-pm-icon-polygon",
                  drawCircle: "control-icon leaflet-pm-icon-circle",
                  drawCircleMarker: "control-icon leaflet-pm-icon-circle-marker",
                  editMode: "control-icon leaflet-pm-icon-edit",
                  dragMode: "control-icon leaflet-pm-icon-drag",
                  cutPolygon: "control-icon leaflet-pm-icon-cut",
                  removalMode: "control-icon leaflet-pm-icon-delete",
                  drawText: "control-icon leaflet-pm-icon-text"
                }
              };
              for (let r in e) {
                let s = e[r];
                L.Util.setOptions(s, {
                  className: i.geomanIcons[r]
                });
              }
            },
            removeControls() {
              let e = this.getButtons();
              for (let i in e) e[i].remove();
              this.isVisible = false;
            },
            deleteControl(e) {
              let i = this._btnNameMapping(e);
              this.buttons[i] && (this.buttons[i].remove(), delete this.buttons[i]);
            },
            toggleControls(e = this.options) {
              this.isVisible ? this.removeControls() : this.addControls(e);
            },
            _addButton(e, i) {
              return this.buttons[e] = i, this.options[e] = !!this.options[e] || false, this.buttons[e];
            },
            triggerClickOnToggledButtons(e) {
              for (let i in this.buttons) {
                let r = this.buttons[i];
                r._button.disableByOtherButtons && r !== e && r.toggled() && r._triggerClick();
              }
            },
            toggleButton(e, i, r = true) {
              e === "editPolygon" && (e = "editMode"), e === "deleteLayer" && (e = "removalMode");
              let s = e;
              return r && this.triggerClickOnToggledButtons(this.buttons[s]), this.buttons[s] ? this.buttons[s].toggle(i) : false;
            },
            _defineButtons() {
              let e = {
                className: "control-icon leaflet-pm-icon-marker",
                title: At("buttonTitles.drawMarkerButton"),
                jsClass: "Marker",
                onClick: () => {
                },
                afterClick: (O, R) => {
                  this.map.pm.Draw[R.button._button.jsClass].toggle();
                },
                doToggle: true,
                toggleStatus: false,
                disableOtherButtons: true,
                position: this.options.position,
                actions: [
                  "cancel"
                ]
              }, i = {
                title: At("buttonTitles.drawPolyButton"),
                className: "control-icon leaflet-pm-icon-polygon",
                jsClass: "Polygon",
                onClick: () => {
                },
                afterClick: (O, R) => {
                  this.map.pm.Draw[R.button._button.jsClass].toggle();
                },
                doToggle: true,
                toggleStatus: false,
                disableOtherButtons: true,
                position: this.options.position,
                actions: [
                  "finish",
                  "removeLastVertex",
                  "cancel"
                ]
              }, r = {
                className: "control-icon leaflet-pm-icon-polyline",
                title: At("buttonTitles.drawLineButton"),
                jsClass: "Line",
                onClick: () => {
                },
                afterClick: (O, R) => {
                  this.map.pm.Draw[R.button._button.jsClass].toggle();
                },
                doToggle: true,
                toggleStatus: false,
                disableOtherButtons: true,
                position: this.options.position,
                actions: [
                  "finish",
                  "removeLastVertex",
                  "cancel"
                ]
              }, s = {
                title: At("buttonTitles.drawCircleButton"),
                className: "control-icon leaflet-pm-icon-circle",
                jsClass: "Circle",
                onClick: () => {
                },
                afterClick: (O, R) => {
                  this.map.pm.Draw[R.button._button.jsClass].toggle();
                },
                doToggle: true,
                toggleStatus: false,
                disableOtherButtons: true,
                position: this.options.position,
                actions: [
                  "cancel"
                ]
              }, u = {
                title: At("buttonTitles.drawCircleMarkerButton"),
                className: "control-icon leaflet-pm-icon-circle-marker",
                jsClass: "CircleMarker",
                onClick: () => {
                },
                afterClick: (O, R) => {
                  this.map.pm.Draw[R.button._button.jsClass].toggle();
                },
                doToggle: true,
                toggleStatus: false,
                disableOtherButtons: true,
                position: this.options.position,
                actions: [
                  "cancel"
                ]
              }, c = {
                title: At("buttonTitles.drawRectButton"),
                className: "control-icon leaflet-pm-icon-rectangle",
                jsClass: "Rectangle",
                onClick: () => {
                },
                afterClick: (O, R) => {
                  this.map.pm.Draw[R.button._button.jsClass].toggle();
                },
                doToggle: true,
                toggleStatus: false,
                disableOtherButtons: true,
                position: this.options.position,
                actions: [
                  "cancel"
                ]
              }, p = {
                title: At("buttonTitles.editButton"),
                className: "control-icon leaflet-pm-icon-edit",
                onClick: () => {
                },
                afterClick: () => {
                  this.map.pm.toggleGlobalEditMode();
                },
                doToggle: true,
                toggleStatus: false,
                disableOtherButtons: true,
                position: this.options.position,
                tool: "edit",
                actions: [
                  "finishMode"
                ]
              }, f = {
                title: At("buttonTitles.dragButton"),
                className: "control-icon leaflet-pm-icon-drag",
                onClick: () => {
                },
                afterClick: () => {
                  this.map.pm.toggleGlobalDragMode();
                },
                doToggle: true,
                toggleStatus: false,
                disableOtherButtons: true,
                position: this.options.position,
                tool: "edit",
                actions: [
                  "finishMode"
                ]
              }, m = {
                title: At("buttonTitles.cutButton"),
                className: "control-icon leaflet-pm-icon-cut",
                jsClass: "Cut",
                onClick: () => {
                },
                afterClick: (O, R) => {
                  this.map.pm.Draw[R.button._button.jsClass].toggle({
                    snappable: true,
                    cursorMarker: true,
                    allowSelfIntersection: false
                  });
                },
                doToggle: true,
                toggleStatus: false,
                disableOtherButtons: true,
                position: this.options.position,
                tool: "edit",
                actions: [
                  "finish",
                  "removeLastVertex",
                  "cancel"
                ]
              }, y = {
                title: At("buttonTitles.deleteButton"),
                className: "control-icon leaflet-pm-icon-delete",
                onClick: () => {
                },
                afterClick: () => {
                  this.map.pm.toggleGlobalRemovalMode();
                },
                doToggle: true,
                toggleStatus: false,
                disableOtherButtons: true,
                position: this.options.position,
                tool: "edit",
                actions: [
                  "finishMode"
                ]
              }, A = {
                title: At("buttonTitles.rotateButton"),
                className: "control-icon leaflet-pm-icon-rotate",
                onClick: () => {
                },
                afterClick: () => {
                  this.map.pm.toggleGlobalRotateMode();
                },
                doToggle: true,
                toggleStatus: false,
                disableOtherButtons: true,
                position: this.options.position,
                tool: "edit",
                actions: [
                  "finishMode"
                ]
              }, C = {
                className: "control-icon leaflet-pm-icon-text",
                title: At("buttonTitles.drawTextButton"),
                jsClass: "Text",
                onClick: () => {
                },
                afterClick: (O, R) => {
                  this.map.pm.Draw[R.button._button.jsClass].toggle();
                },
                doToggle: true,
                toggleStatus: false,
                disableOtherButtons: true,
                position: this.options.position,
                actions: [
                  "cancel"
                ]
              };
              this._addButton("drawMarker", new L.Control.PMButton(e)), this._addButton("drawPolyline", new L.Control.PMButton(r)), this._addButton("drawRectangle", new L.Control.PMButton(c)), this._addButton("drawPolygon", new L.Control.PMButton(i)), this._addButton("drawCircle", new L.Control.PMButton(s)), this._addButton("drawCircleMarker", new L.Control.PMButton(u)), this._addButton("drawText", new L.Control.PMButton(C)), this._addButton("editMode", new L.Control.PMButton(p)), this._addButton("dragMode", new L.Control.PMButton(f)), this._addButton("cutPolygon", new L.Control.PMButton(m)), this._addButton("removalMode", new L.Control.PMButton(y)), this._addButton("rotateMode", new L.Control.PMButton(A));
            },
            _showHideButtons() {
              if (!this.isVisible) return;
              this.removeControls(), this.isVisible = true;
              let e = this.getButtons(), i = [];
              this.options.drawControls === false && (i = i.concat(Object.keys(e).filter((r) => !e[r]._button.tool))), this.options.editControls === false && (i = i.concat(Object.keys(e).filter((r) => e[r]._button.tool === "edit"))), this.options.optionsControls === false && (i = i.concat(Object.keys(e).filter((r) => e[r]._button.tool === "options"))), this.options.customControls === false && (i = i.concat(Object.keys(e).filter((r) => e[r]._button.tool === "custom")));
              for (let r in e) if (this.options[r] && i.indexOf(r) === -1) {
                let s = e[r]._button.tool;
                s || (s = "draw"), e[r].setPosition(this._getBtnPosition(s)), e[r].addTo(this.map);
              }
            },
            _getBtnPosition(e) {
              return this.options.positions && this.options.positions[e] ? this.options.positions[e] : this.options.position;
            },
            setBlockPosition(e, i) {
              this.options.positions[e] = i, this._showHideButtons(), this.changeControlOrder();
            },
            getBlockPositions() {
              return this.options.positions;
            },
            copyDrawControl(e, i) {
              if (i) typeof i != "object" && (i = {
                name: i
              });
              else throw new TypeError("Button has no name");
              let r = this._btnNameMapping(e);
              if (!i.name) throw new TypeError("Button has no name");
              if (this.buttons[i.name]) throw new TypeError("Button with this name already exists");
              let s = this.map.pm.Draw.createNewDrawInstance(i.name, r);
              i = {
                ...this.buttons[r]._button,
                ...i
              };
              let u = this.createCustomControl(i);
              return {
                drawInstance: s,
                control: u
              };
            },
            createCustomControl(e) {
              if (!e.name) throw new TypeError("Button has no name");
              if (this.buttons[e.name]) throw new TypeError("Button with this name already exists");
              e.onClick || (e.onClick = () => {
              }), e.afterClick || (e.afterClick = () => {
              }), e.toggle !== false && (e.toggle = true), e.block && (e.block = e.block.toLowerCase()), (!e.block || e.block === "draw") && (e.block = ""), e.className ? e.className.indexOf("control-icon") === -1 && (e.className = `control-icon ${e.className}`) : e.className = "control-icon";
              let i = {
                tool: e.block,
                className: e.className,
                title: e.title || "",
                jsClass: e.name,
                onClick: e.onClick,
                afterClick: e.afterClick,
                doToggle: e.toggle,
                toggleStatus: false,
                disableOtherButtons: e.disableOtherButtons ?? true,
                disableByOtherButtons: e.disableByOtherButtons ?? true,
                cssToggle: e.toggle,
                position: this.options.position,
                actions: e.actions || [],
                disabled: !!e.disabled
              };
              this.options[e.name] !== false && (this.options[e.name] = true);
              let r = this._addButton(e.name, new L.Control.PMButton(i));
              return this.changeControlOrder(), r;
            },
            controlExists(e) {
              return !!this.getButton(e);
            },
            getButton(e) {
              return this.getButtons()[e];
            },
            getButtonsInBlock(e) {
              let i = {};
              if (e) for (let r in this.getButtons()) {
                let s = this.getButtons()[r];
                (s._button.tool === e || e === "draw" && !s._button.tool) && (i[r] = s);
              }
              return i;
            },
            changeControlOrder(e = []) {
              let i = this._shapeMapping(), r = [];
              e.forEach((c) => {
                i[c] ? r.push(i[c]) : r.push(c);
              });
              let s = this.getButtons(), u = {};
              r.forEach((c) => {
                s[c] && (u[c] = s[c]);
              }), Object.keys(s).filter((c) => !s[c]._button.tool || s[c]._button.tool === "draw").forEach((c) => {
                r.indexOf(c) === -1 && (u[c] = s[c]);
              }), Object.keys(s).filter((c) => s[c]._button.tool === "edit").forEach((c) => {
                r.indexOf(c) === -1 && (u[c] = s[c]);
              }), Object.keys(s).filter((c) => s[c]._button.tool === "options").forEach((c) => {
                r.indexOf(c) === -1 && (u[c] = s[c]);
              }), Object.keys(s).filter((c) => s[c]._button.tool === "custom").forEach((c) => {
                r.indexOf(c) === -1 && (u[c] = s[c]);
              }), Object.keys(s).forEach((c) => {
                r.indexOf(c) === -1 && (u[c] = s[c]);
              }), this.map.pm.Toolbar.buttons = u, this._showHideButtons();
            },
            getControlOrder() {
              let e = this.getButtons(), i = [];
              for (let r in e) i.push(r);
              return i;
            },
            changeActionsOfControl(e, i) {
              let r = this._btnNameMapping(e);
              if (!r) throw new TypeError("No name passed");
              if (!i) throw new TypeError("No actions passed");
              if (!this.buttons[r]) throw new TypeError("Button with this name not exists");
              this.buttons[r]._button.actions = i, this.changeControlOrder();
            },
            setButtonDisabled(e, i) {
              let r = this._btnNameMapping(e);
              i ? this.buttons[r].disable() : this.buttons[r].enable();
            },
            _shapeMapping() {
              return {
                Marker: "drawMarker",
                Circle: "drawCircle",
                Polygon: "drawPolygon",
                Rectangle: "drawRectangle",
                Polyline: "drawPolyline",
                Line: "drawPolyline",
                CircleMarker: "drawCircleMarker",
                Edit: "editMode",
                Drag: "dragMode",
                Cut: "cutPolygon",
                Removal: "removalMode",
                Rotate: "rotateMode",
                Text: "drawText"
              };
            },
            _btnNameMapping(e) {
              let i = this._shapeMapping();
              return i[e] ? i[e] : e;
            }
          }), Rs = pi, Fs = et(Rn()), Sr = {
            _initSnappableMarkers() {
              this.options.snapDistance = this.options.snapDistance || 30, this.options.snapSegment = this.options.snapSegment === void 0 ? true : this.options.snapSegment, this._assignEvents(this._markers), this._layer.off("pm:dragstart", this._unsnap, this), this._layer.on("pm:dragstart", this._unsnap, this);
            },
            _disableSnapping() {
              this._layer.off("pm:dragstart", this._unsnap, this);
            },
            _assignEvents(e) {
              e.forEach((i) => {
                if (Array.isArray(i)) {
                  this._assignEvents(i);
                  return;
                }
                i.off("drag", this._handleSnapping, this), i.on("drag", this._handleSnapping, this), i.off("dragend", this._cleanupSnapping, this), i.on("dragend", this._cleanupSnapping, this);
              });
            },
            _cleanupSnapping(e) {
              if (e) {
                let i = e.target;
                i._snapped = false;
              }
              delete this._snapList, this.throttledList && (this._map.off("layeradd", this.throttledList, this), this.throttledList = void 0), this._map.off("layerremove", this._handleSnapLayerRemoval, this), this.debugIndicatorLines && this.debugIndicatorLines.forEach((i) => {
                i.remove();
              });
            },
            _handleThrottleSnapping() {
              this.throttledList && this._createSnapList();
            },
            _handleSnapping(e, i = false) {
              var _a3, _b2, _c2;
              let r = e.target;
              if (r._snapped = false, this.throttledList || (this.throttledList = L.Util.throttle(this._handleThrottleSnapping, 100, this)), ((_a3 = e == null ? void 0 : e.originalEvent) == null ? void 0 : _a3.altKey) || ((_c2 = (_b2 = this._map) == null ? void 0 : _b2.pm) == null ? void 0 : _c2.Keyboard.isAltKeyPressed())) return false;
              let s;
              if (i) {
                if (!this._otherSnapLayers || this._otherSnapLayers.length === 0) return false;
                s = this._otherSnapLayers;
              } else this._snapList === void 0 && (this._createSnapList(), this._map.off("layeradd", this.throttledList, this), this._map.on("layeradd", this.throttledList, this)), s = this._snapList;
              if (s.length <= 0) return false;
              let u = this._calcClosestLayer(r.getLatLng(), s);
              if (Object.keys(u).length === 0) return false;
              let c = u.layer instanceof L.Marker || u.layer instanceof L.CircleMarker || !this.options.snapSegment, p;
              c ? p = u.latlng : p = this._checkPrioritiySnapping(u);
              let f = this.options.snapDistance, m = {
                marker: r,
                shape: this._shape,
                snapLatLng: p,
                segment: u.segment,
                layer: this._layer,
                workingLayer: this._layer,
                layerInteractedWith: u.layer,
                distance: u.distance
              };
              if (this._fireSnapDrag(m.marker, m), this._fireSnapDrag(this._layer, m), u.distance < f) {
                r._orgLatLng = r.getLatLng(), r.setLatLng(p), r._snapped = true, r._snapInfo = m;
                let y = () => {
                  this._snapLatLng = p, this._fireSnap(r, m), this._fireSnap(this._layer, m);
                }, A = this._snapLatLng || {}, C = p || {};
                (A.lat !== C.lat || A.lng !== C.lng) && y();
              } else this._snapLatLng && (this._unsnap(m), r._snapped = false, r._snapInfo = void 0, this._fireUnsnap(m.marker, m), this._fireUnsnap(this._layer, m));
              return true;
            },
            _createSnapList() {
              let e = [], i = [], r = this._map;
              r.off("layerremove", this._handleSnapLayerRemoval, this), r.on("layerremove", this._handleSnapLayerRemoval, this), r.eachLayer((s) => {
                if ((s instanceof L.Polyline || s instanceof L.Marker || s instanceof L.CircleMarker || s instanceof L.ImageOverlay) && s.options.snapIgnore !== true) {
                  if (s.options.snapIgnore === void 0 && (!L.PM.optIn && s.options.pmIgnore === true || L.PM.optIn && s.options.pmIgnore !== false)) return;
                  (s instanceof L.Circle || s instanceof L.CircleMarker) && s.pm && s.pm._hiddenPolyCircle ? e.push(s.pm._hiddenPolyCircle) : s instanceof L.ImageOverlay && (s = L.rectangle(s.getBounds())), e.push(s);
                  let u = L.polyline([], {
                    color: "red",
                    pmIgnore: true
                  });
                  u._pmTempLayer = true, i.push(u), (s instanceof L.Circle || s instanceof L.CircleMarker) && i.push(u);
                }
              }), e = e.filter((s) => this._layer !== s), e = e.filter((s) => s._latlng || s._latlngs && kt(s._latlngs)), e = e.filter((s) => !s._pmTempLayer), this._otherSnapLayers ? (this._otherSnapLayers.forEach(() => {
                let s = L.polyline([], {
                  color: "red",
                  pmIgnore: true
                });
                s._pmTempLayer = true, i.push(s);
              }), this._snapList = e.concat(this._otherSnapLayers)) : this._snapList = e, this.debugIndicatorLines = i;
            },
            _handleSnapLayerRemoval({ layer: e }) {
              if (!e._leaflet_id) return;
              let i = this._snapList.findIndex((r) => r._leaflet_id === e._leaflet_id);
              i > -1 && this._snapList.splice(i, 1);
            },
            _calcClosestLayer(e, i) {
              return this._calcClosestLayers(e, i, 1)[0];
            },
            _calcClosestLayers(e, i, r = 1) {
              let s = [], u = {};
              i.forEach((p, f) => {
                var _a3;
                if (p._parentCopy && p._parentCopy === this._layer || ((_a3 = p.getLatLngs) == null ? void 0 : _a3.call(p).flat(5).length) < 2) return;
                let m = this._calcLayerDistances(e, p);
                if (m.distance = Math.floor(m.distance), this.debugIndicatorLines) {
                  if (!this.debugIndicatorLines[f]) {
                    let y = L.polyline([], {
                      color: "red",
                      pmIgnore: true
                    });
                    y._pmTempLayer = true, this.debugIndicatorLines[f] = y;
                  }
                  this.debugIndicatorLines[f].setLatLngs([
                    e,
                    m.latlng
                  ]);
                }
                r === 1 && (u.distance === void 0 || m.distance - 5 <= u.distance) ? (m.distance + 5 < u.distance && (s = []), u = m, u.layer = p, s.push(u)) : r !== 1 && (u = {}, u = m, u.layer = p, s.push(u));
              }), r !== 1 && (s = s.sort((p, f) => p.distance - f.distance)), r === -1 && (r = s.length);
              let c = this._getClosestLayerByPriority(s, r);
              return L.Util.isArray(c) ? c : [
                c
              ];
            },
            _calcLayerDistances(e, i) {
              let r = this._map, s = i instanceof L.Marker || i instanceof L.CircleMarker, u = i instanceof L.Polygon, c = e;
              if (s) {
                let p = i.getLatLng();
                return {
                  latlng: {
                    ...p
                  },
                  distance: this._getDistance(r, p, c)
                };
              }
              return this._calcLatLngDistances(c, i.getLatLngs(), r, u);
            },
            _calcLatLngDistances(e, i, r, s = false) {
              let u, c, p, f = (m) => {
                m.forEach((y, A) => {
                  if (Array.isArray(y)) {
                    f(y);
                    return;
                  }
                  if (this.options.snapSegment) {
                    let C = y, O;
                    s ? O = A + 1 === m.length ? 0 : A + 1 : O = A + 1 === m.length ? void 0 : A + 1;
                    let R = m[O];
                    if (R) {
                      let H = this._getDistanceToSegment(r, e, C, R);
                      (c === void 0 || H < c) && (c = H, p = [
                        C,
                        R
                      ]);
                    }
                  } else {
                    let C = this._getDistance(r, e, y);
                    (c === void 0 || C < c) && (c = C, u = y);
                  }
                });
              };
              return f(i), this.options.snapSegment ? {
                latlng: {
                  ...this._getClosestPointOnSegment(r, e, p[0], p[1])
                },
                segment: p,
                distance: c
              } : {
                latlng: u,
                distance: c
              };
            },
            _getClosestLayerByPriority(e, i = 1) {
              e = e.sort((p, f) => p._leaflet_id - f._leaflet_id);
              let r = [
                "Marker",
                "CircleMarker",
                "Circle",
                "Line",
                "Polygon",
                "Rectangle"
              ], s = this._map.pm.globalOptions.snappingOrder || [], u = 0, c = {};
              return s.concat(r).forEach((p) => {
                c[p] || (u += 1, c[p] = u);
              }), e.sort(eo("instanceofShape", c)), i === 1 ? e[0] || {} : e.slice(0, i);
            },
            _checkPrioritiySnapping(e) {
              let i = this._map, r = e.segment[0], s = e.segment[1], u = e.latlng, c = u;
              if (this.options.snapVertex) {
                let p = this._getDistance(i, r, u), f = this._getDistance(i, s, u), m = p < f ? r : s, y = p < f ? p : f;
                if (this.options.snapMiddle) {
                  let C = L.PM.Utils.calcMiddleLatLng(i, r, s), O = this._getDistance(i, C, u);
                  O < p && O < f && (m = C, y = O);
                }
                let A = this.options.snapDistance;
                y < A && (c = m);
              }
              return {
                ...c
              };
            },
            _unsnap() {
              delete this._snapLatLng;
            },
            _getClosestPointOnSegment(e, i, r, s) {
              let u = e.getMaxZoom();
              u === 1 / 0 && (u = e.getZoom());
              let c = e.project(i, u), p = e.project(r, u), f = e.project(s, u), m = L.LineUtil.closestPointOnSegment(c, p, f);
              return e.unproject(m, u);
            },
            _getDistanceToSegment(e, i, r, s) {
              let u = e.latLngToContainerPoint(i), c = e.latLngToContainerPoint(r), p = e.latLngToContainerPoint(s);
              return L.LineUtil.pointToSegmentDistance(u, c, p);
            },
            _getDistance(e, i, r) {
              return e.latLngToContainerPoint(i).distanceTo(e.latLngToContainerPoint(r));
            }
          }, zs = Sr, Ns = L.Class.extend({
            includes: [
              zs,
              bn
            ],
            options: {
              snappable: true,
              snapDistance: 20,
              snapMiddle: false,
              allowSelfIntersection: true,
              tooltips: true,
              templineStyle: {},
              hintlineStyle: {
                color: "#3388ff",
                dashArray: "5,5"
              },
              pathOptions: null,
              cursorMarker: true,
              finishOn: null,
              markerStyle: {
                draggable: true,
                icon: L.icon()
              },
              hideMiddleMarkers: false,
              minRadiusCircle: null,
              maxRadiusCircle: null,
              minRadiusCircleMarker: null,
              maxRadiusCircleMarker: null,
              resizeableCircleMarker: false,
              resizeableCircle: true,
              markerEditable: true,
              continueDrawing: false,
              snapSegment: true,
              requireSnapToFinish: false,
              rectangleAngle: 0,
              textOptions: {
                text: null,
                focusAfterDraw: null,
                removeIfEmpty: null,
                className: null
              },
              snapVertex: true
            },
            setOptions(e) {
              L.Util.setOptions(this, e), this.setStyle(this.options);
            },
            setStyle() {
            },
            getOptions() {
              return this.options;
            },
            initialize(e) {
              let i = new L.Icon.Default();
              i.options.tooltipAnchor = [
                0,
                0
              ], this.options.markerStyle.icon = i, this._map = e, this.shapes = [
                "Marker",
                "CircleMarker",
                "Line",
                "Polygon",
                "Rectangle",
                "Circle",
                "Cut",
                "Text"
              ], this.shapes.forEach((r) => {
                this[r] = new L.PM.Draw[r](this._map);
              }), this.Marker.setOptions({
                continueDrawing: true
              }), this.CircleMarker.setOptions({
                continueDrawing: true
              });
            },
            setPathOptions(e, i = false) {
              i ? this.options.pathOptions = (0, Fs.default)(this.options.pathOptions, e) : this.options.pathOptions = e;
            },
            getShapes() {
              return this.shapes;
            },
            getShape() {
              return this._shape;
            },
            enable(e, i) {
              if (!e) throw new Error(`Error: Please pass a shape as a parameter. Possible shapes are: ${this.getShapes().join(",")}`);
              this.disable(), this[e].enable(i);
            },
            disable() {
              this.shapes.forEach((e) => {
                this[e].disable();
              });
            },
            addControls() {
              this.shapes.forEach((e) => {
                this[e].addButton();
              });
            },
            getActiveShape() {
              let e;
              return this.shapes.forEach((i) => {
                this[i]._enabled && (e = i);
              }), e;
            },
            _setGlobalDrawMode() {
              this._shape === "Cut" ? this._fireGlobalCutModeToggled() : this._fireGlobalDrawModeToggled();
              let e = [];
              this._map.eachLayer((i) => {
                (i instanceof L.Polyline || i instanceof L.Marker || i instanceof L.Circle || i instanceof L.CircleMarker || i instanceof L.ImageOverlay) && (i._pmTempLayer || e.push(i));
              }), this._enabled ? e.forEach((i) => {
                L.PM.Utils.disablePopup(i);
              }) : e.forEach((i) => {
                L.PM.Utils.enablePopup(i);
              });
            },
            createNewDrawInstance(e, i) {
              let r = this._getShapeFromBtnName(i);
              if (this[e]) throw new TypeError("Draw Type already exists");
              if (!L.PM.Draw[r]) throw new TypeError(`There is no class L.PM.Draw.${r}`);
              return this[e] = new L.PM.Draw[r](this._map), this[e].toolbarButtonName = e, this[e]._shape = e, this.shapes.push(e), this[i] && this[e].setOptions(this[i].options), this[e].setOptions(this[e].options), this[e];
            },
            _getShapeFromBtnName(e) {
              let i = {
                drawMarker: "Marker",
                drawCircle: "Circle",
                drawPolygon: "Polygon",
                drawPolyline: "Line",
                drawRectangle: "Rectangle",
                drawCircleMarker: "CircleMarker",
                editMode: "Edit",
                dragMode: "Drag",
                cutPolygon: "Cut",
                removalMode: "Removal",
                rotateMode: "Rotate",
                drawText: "Text"
              };
              return i[e] ? i[e] : this[e] ? this[e]._shape : e;
            },
            _finishLayer(e) {
              e.pm && (e.pm.setOptions(this.options), e.pm._shape = this._shape, e.pm._map = this._map), this._addDrawnLayerProp(e);
            },
            _addDrawnLayerProp(e) {
              e._drawnByGeoman = true;
            },
            _setPane(e, i) {
              i === "layerPane" ? e.options.pane = this._map.pm.globalOptions.panes && this._map.pm.globalOptions.panes.layerPane || "overlayPane" : i === "vertexPane" ? e.options.pane = this._map.pm.globalOptions.panes && this._map.pm.globalOptions.panes.vertexPane || "markerPane" : i === "markerPane" && (e.options.pane = this._map.pm.globalOptions.panes && this._map.pm.globalOptions.panes.markerPane || "markerPane");
            },
            _isFirstLayer() {
              return (this._map || this._layer._map).pm.getGeomanLayers().length === 0;
            }
          }), re = Ns;
          re.Marker = re.extend({
            initialize(e) {
              this._map = e, this._shape = "Marker", this.toolbarButtonName = "drawMarker", this._layerIsDragging = false;
            },
            enable(e) {
              L.Util.setOptions(this, e), this._enabled = true, this._isTouchDevice = !Ss(), this._map.getContainer().classList.add("geoman-draw-cursor"), this._map.on("click", this._createMarker, this), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, true), this._isTouchDevice ? (this._createTouchHint(), this._hintMarker = L.marker(this._map.getCenter(), {
                ...this.options.markerStyle,
                opacity: 0,
                interactive: false
              }), this._setPane(this._hintMarker, "markerPane"), this._hintMarker._pmTempLayer = true) : (this._hintMarker = L.marker(this._map.getCenter(), this.options.markerStyle), this._setPane(this._hintMarker, "markerPane"), this._hintMarker._pmTempLayer = true, this._hintMarker.addTo(this._map), this.options.tooltips && this._hintMarker.bindTooltip(At("tooltips.placeMarker"), {
                permanent: true,
                offset: L.point(0, 10),
                direction: "bottom",
                opacity: 0.8
              }).openTooltip(), this._map.on("mousemove", this._syncHintMarker, this)), this._layer = this._hintMarker, this.options.markerEditable && this._map.eachLayer((i) => {
                this.isRelevantMarker(i) && i.pm.enable();
              }), this._fireDrawStart(), this._setGlobalDrawMode();
            },
            disable() {
              this._enabled && (this._enabled = false, this._map.getContainer().classList.remove("geoman-draw-cursor"), this._map.off("click", this._createMarker, this), this._isTouchDevice ? (this._removeTouchHint(), this._hintMarker = null) : (this._hintMarker.remove(), this._map.off("mousemove", this._syncHintMarker, this)), this._map.eachLayer((e) => {
                this.isRelevantMarker(e) && e.pm.disable();
              }), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, false), this.options.snappable && this._cleanupSnapping(), this._fireDrawEnd(), this._setGlobalDrawMode());
            },
            enabled() {
              return this._enabled;
            },
            toggle(e) {
              this.enabled() ? this.disable() : this.enable(e);
            },
            isRelevantMarker(e) {
              return e instanceof L.Marker && e.pm && !e._pmTempLayer && !e.pm._initTextMarker;
            },
            _syncHintMarker(e) {
              if (this._hintMarker.setLatLng(e.latlng), this.options.snappable) {
                let i = e;
                i.target = this._hintMarker, this._handleSnapping(i);
              }
              this._fireChange(this._hintMarker.getLatLng(), "Draw");
            },
            _createMarker(e) {
              if (!e.latlng || this._layerIsDragging || this.options.requireSnapToFinish && !this._hintMarker._snapped && !this._isFirstLayer()) return;
              this._hintMarker._snapped || this._hintMarker.setLatLng(e.latlng);
              let i = this._hintMarker.getLatLng(), r = new L.Marker(i, this.options.markerStyle);
              this._setPane(r, "markerPane"), this._finishLayer(r), r.pm || (r.options.draggable = false), r.addTo(this._map.pm._getContainingLayer()), r.pm && this.options.markerEditable ? r.pm.enable() : r.dragging && r.dragging.disable(), this._fireCreate(r), this._cleanupSnapping(), this.options.continueDrawing || this.disable();
            },
            setStyle() {
              var _a3, _b2;
              ((_a3 = this.options.markerStyle) == null ? void 0 : _a3.icon) && ((_b2 = this._hintMarker) == null ? void 0 : _b2.setIcon(this.options.markerStyle.icon));
            },
            _createTouchHint() {
              this.options.tooltips && (this._touchHint = L.DomUtil.create("div", "leaflet-pm-touch-hint"), this._touchHint.textContent = At("tooltips.placeMarkerTouch"), this._map.getContainer().appendChild(this._touchHint));
            },
            _removeTouchHint() {
              this._touchHint && this._touchHint.parentNode && (this._touchHint.parentNode.removeChild(this._touchHint), this._touchHint = null);
            }
          });
          var ke = 63710088e-1, ro = {
            centimeters: ke * 100,
            centimetres: ke * 100,
            degrees: 360 / (2 * Math.PI),
            feet: ke * 3.28084,
            inches: ke * 39.37,
            kilometers: ke / 1e3,
            kilometres: ke / 1e3,
            meters: ke,
            metres: ke,
            miles: ke / 1609.344,
            millimeters: ke * 1e3,
            millimetres: ke * 1e3,
            nauticalmiles: ke / 1852,
            radians: 1,
            yards: ke * 1.0936
          };
          function Xe(e, i, r = {}) {
            let s = {
              type: "Feature"
            };
            return (r.id === 0 || r.id) && (s.id = r.id), r.bbox && (s.bbox = r.bbox), s.properties = i || {}, s.geometry = e, s;
          }
          function Yi(e, i, r = {}) {
            if (!e) throw new Error("coordinates is required");
            if (!Array.isArray(e)) throw new Error("coordinates must be an Array");
            if (e.length < 2) throw new Error("coordinates must be at least 2 numbers long");
            if (!Ji(e[0]) || !Ji(e[1])) throw new Error("coordinates must contain numbers");
            return Xe({
              type: "Point",
              coordinates: e
            }, i, r);
          }
          function wn(e, i, r = {}) {
            if (e.length < 2) throw new Error("coordinates must be an array of two or more positions");
            return Xe({
              type: "LineString",
              coordinates: e
            }, i, r);
          }
          function Se(e, i = {}) {
            let r = {
              type: "FeatureCollection"
            };
            return i.id && (r.id = i.id), i.bbox && (r.bbox = i.bbox), r.features = e, r;
          }
          function qn(e, i = "kilometers") {
            let r = ro[i];
            if (!r) throw new Error(i + " units is invalid");
            return e * r;
          }
          function fi(e) {
            return e % (2 * Math.PI) * 180 / Math.PI;
          }
          function Xi(e) {
            return e % 360 * Math.PI / 180;
          }
          function Ji(e) {
            return !isNaN(e) && e !== null && !Array.isArray(e);
          }
          function De(e) {
            return e !== null && typeof e == "object" && !Array.isArray(e);
          }
          function Us(e) {
            let i, r, s = {
              type: "FeatureCollection",
              features: []
            };
            if (e.type === "Feature" ? r = e.geometry : r = e, r.type === "LineString") i = [
              r.coordinates
            ];
            else if (r.type === "MultiLineString") i = r.coordinates;
            else if (r.type === "MultiPolygon") i = [].concat(...r.coordinates);
            else if (r.type === "Polygon") i = r.coordinates;
            else throw new Error("Input must be a LineString, MultiLineString, Polygon, or MultiPolygon Feature or Geometry");
            return i.forEach((u) => {
              i.forEach((c) => {
                for (let p = 0; p < u.length - 1; p++) for (let f = p; f < c.length - 1; f++) {
                  if (u === c && (Math.abs(p - f) === 1 || p === 0 && f === u.length - 2 && u[p][0] === u[u.length - 1][0] && u[p][1] === u[u.length - 1][1])) continue;
                  let m = Gs(u[p][0], u[p][1], u[p + 1][0], u[p + 1][1], c[f][0], c[f][1], c[f + 1][0], c[f + 1][1]);
                  m && s.features.push(Yi([
                    m[0],
                    m[1]
                  ]));
                }
              });
            }), s;
          }
          function Gs(e, i, r, s, u, c, p, f) {
            let m, y, A, C, O, R = {
              x: null,
              y: null,
              onLine1: false,
              onLine2: false
            };
            return m = (f - c) * (r - e) - (p - u) * (s - i), m === 0 ? R.x !== null && R.y !== null ? R : false : (y = i - c, A = e - u, C = (p - u) * y - (f - c) * A, O = (r - e) * y - (s - i) * A, y = C / m, A = O / m, R.x = e + y * (r - e), R.y = i + y * (s - i), y >= 0 && y <= 1 && (R.onLine1 = true), A >= 0 && A <= 1 && (R.onLine2 = true), R.onLine1 && R.onLine2 ? [
              R.x,
              R.y
            ] : false);
          }
          var Vn = Us;
          re.Line = re.extend({
            initialize(e) {
              this._map = e, this._shape = "Line", this.toolbarButtonName = "drawPolyline", this._doesSelfIntersect = false;
            },
            enable(e) {
              L.Util.setOptions(this, e), this._enabled = true, this._markers = [], this._layerGroup = new L.FeatureGroup(), this._layerGroup._pmTempLayer = true, this._layerGroup.addTo(this._map), this._layer = L.polyline([], {
                ...this.options.templineStyle,
                pmIgnore: false
              }), this._setPane(this._layer, "layerPane"), this._layer._pmTempLayer = true, this._layerGroup.addLayer(this._layer), this._hintline = L.polyline([], this.options.hintlineStyle), this._setPane(this._hintline, "layerPane"), this._hintline._pmTempLayer = true, this._layerGroup.addLayer(this._hintline), this._hintMarker = L.marker(this._map.getCenter(), {
                interactive: false,
                zIndexOffset: 100,
                icon: L.divIcon({
                  className: "marker-icon cursor-marker"
                })
              }), this._setPane(this._hintMarker, "vertexPane"), this._hintMarker._pmTempLayer = true, this._layerGroup.addLayer(this._hintMarker), this.options.cursorMarker && L.DomUtil.addClass(this._hintMarker._icon, "visible"), this.options.tooltips && this._hintMarker.bindTooltip(At("tooltips.firstVertex"), {
                permanent: true,
                offset: L.point(0, 10),
                direction: "bottom",
                opacity: 0.8
              }).openTooltip(), this._map.getContainer().classList.add("geoman-draw-cursor"), this._map.on("click", this._createVertex, this), this.options.finishOn && this.options.finishOn !== "snap" && this._map.on(this.options.finishOn, this._finishShape, this), this.options.finishOn === "dblclick" && (this.tempMapDoubleClickZoomState = this._map.doubleClickZoom._enabled, this.tempMapDoubleClickZoomState && this._map.doubleClickZoom.disable()), this._map.on("mousemove", this._syncHintMarker, this), this._hintMarker.on("move", this._syncHintLine, this), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, true), this._otherSnapLayers = [], this.isRed = false, this._fireDrawStart(), this._setGlobalDrawMode();
            },
            disable() {
              this._enabled && (this._enabled = false, this._map.getContainer().classList.remove("geoman-draw-cursor"), this._map.off("click", this._createVertex, this), this._map.off("mousemove", this._syncHintMarker, this), this.options.finishOn && this.options.finishOn !== "snap" && this._map.off(this.options.finishOn, this._finishShape, this), this.tempMapDoubleClickZoomState && this._map.doubleClickZoom.enable(), this._map.removeLayer(this._layerGroup), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, false), this.options.snappable && this._cleanupSnapping(), this._fireDrawEnd(), this._setGlobalDrawMode());
            },
            enabled() {
              return this._enabled;
            },
            toggle(e) {
              this.enabled() ? this.disable() : this.enable(e);
            },
            _syncHintLine() {
              let e = this._layer.getLatLngs();
              if (e.length > 0) {
                let i = e[e.length - 1];
                this._hintline.setLatLngs([
                  i,
                  this._hintMarker.getLatLng()
                ]);
              }
            },
            _syncHintMarker(e) {
              if (this._hintMarker.setLatLng(e.latlng), this.options.snappable) {
                let r = e;
                r.target = this._hintMarker, this._handleSnapping(r);
              } else if (this._otherSnapLayers && this._otherSnapLayers.length > 0) {
                let r = e;
                r.target = this._hintMarker, this._handleSnapping(r, true);
              }
              this.options.allowSelfIntersection || this._handleSelfIntersection(true, this._hintMarker.getLatLng());
              let i = this._layer._defaultShape().slice();
              i.push(this._hintMarker.getLatLng()), this._change(i);
            },
            hasSelfIntersection() {
              return Vn(this._layer.toGeoJSON(15)).features.length > 0;
            },
            _handleSelfIntersection(e, i) {
              let r = L.polyline(this._layer.getLatLngs());
              e && (i || (i = this._hintMarker.getLatLng()), r.addLatLng(i));
              let s = Vn(r.toGeoJSON(15));
              this._doesSelfIntersect = s.features.length > 0, this._doesSelfIntersect ? this.isRed || (this.isRed = true, this._hintline.setStyle({
                color: "#f00000ff"
              }), this._fireIntersect(s, this._map, "Draw")) : this._hintline.isEmpty() || (this.isRed = false, this._hintline.setStyle(this.options.hintlineStyle));
            },
            _createVertex(e) {
              if (!this.options.allowSelfIntersection && (this._handleSelfIntersection(true, e.latlng), this._doesSelfIntersect)) return;
              this._hintMarker._snapped || this._hintMarker.setLatLng(e.latlng);
              let i = this._hintMarker.getLatLng(), r = this._layer.getLatLngs(), s = r[r.length - 1];
              if (i.equals(r[0]) || r.length > 0 && i.equals(s)) {
                this._finishShape();
                return;
              }
              this._layer._latlngInfo = this._layer._latlngInfo || [], this._layer._latlngInfo.push({
                latlng: i,
                snapInfo: this._hintMarker._snapInfo
              }), this._layer.addLatLng(i);
              let u = this._createMarker(i);
              this._setTooltipText(), this._setHintLineAfterNewVertex(i), this._fireVertexAdded(u, void 0, i, "Draw"), this._change(this._layer.getLatLngs()), this.options.finishOn === "snap" && this._hintMarker._snapped && this._finishShape(e);
            },
            _setHintLineAfterNewVertex(e) {
              this._hintline.setLatLngs([
                e,
                e
              ]);
            },
            _removeLastVertex() {
              let e = this._markers;
              if (e.length <= 1) {
                this.disable();
                return;
              }
              let i = this._layer.getLatLngs(), r = e[e.length - 1], { indexPath: s } = L.PM.Utils.findDeepMarkerIndex(e, r);
              e.pop(), this._layerGroup.removeLayer(r);
              let u = e[e.length - 1], c = i.indexOf(u.getLatLng());
              i = i.slice(0, c + 1), this._layer.setLatLngs(i), this._layer._latlngInfo.pop(), this._syncHintLine(), this._setTooltipText(), this._fireVertexRemoved(r, s, "Draw"), this._change(this._layer.getLatLngs());
            },
            _finishShape() {
              if (!this.options.allowSelfIntersection && (this._handleSelfIntersection(false), this._doesSelfIntersect) || this.options.requireSnapToFinish && !this._hintMarker._snapped && !this._isFirstLayer()) return;
              let e = this._layer.getLatLngs();
              if (e.length <= 1) return;
              let i = L.polyline(e, this.options.pathOptions);
              this._setPane(i, "layerPane"), this._finishLayer(i), i.addTo(this._map.pm._getContainingLayer()), this._fireCreate(i), this.options.snappable && this._cleanupSnapping();
              let r = this._hintMarker.getLatLng();
              this.disable(), this.options.continueDrawing && (this.enable(), this._hintMarker.setLatLng(r));
            },
            _createMarker(e) {
              let i = new L.Marker(e, {
                draggable: false,
                icon: L.divIcon({
                  className: "marker-icon"
                })
              });
              return this._setPane(i, "vertexPane"), i._pmTempLayer = true, this._layerGroup.addLayer(i), this._markers.push(i), i.on("click", this._finishShape, this), i;
            },
            _setTooltipText() {
              let { length: e } = this._layer.getLatLngs().flat(), i = "";
              e <= 1 ? i = At("tooltips.continueLine") : i = At("tooltips.finishLine"), this._hintMarker.setTooltipContent(i);
            },
            _change(e) {
              this._fireChange(e, "Draw");
            },
            setStyle() {
              var _a3, _b2;
              (_a3 = this._layer) == null ? void 0 : _a3.setStyle(this.options.templineStyle), (_b2 = this._hintline) == null ? void 0 : _b2.setStyle(this.options.hintlineStyle);
            }
          }), re.Polygon = re.Line.extend({
            initialize(e) {
              this._map = e, this._shape = "Polygon", this.toolbarButtonName = "drawPolygon";
            },
            enable(e) {
              L.PM.Draw.Line.prototype.enable.call(this, e), this._layer.pm._shape = "Polygon";
            },
            _createMarker(e) {
              let i = new L.Marker(e, {
                draggable: false,
                icon: L.divIcon({
                  className: "marker-icon"
                })
              });
              return this._setPane(i, "vertexPane"), i._pmTempLayer = true, this._layerGroup.addLayer(i), this._markers.push(i), this._layer.getLatLngs().flat().length === 1 ? (i.on("click", this._finishShape, this), this._tempSnapLayerIndex = this._otherSnapLayers.push(i) - 1, this.options.snappable && this._cleanupSnapping()) : i.on("click", () => 1), i;
            },
            _setTooltipText() {
              let { length: e } = this._layer.getLatLngs().flat(), i = "";
              e <= 2 ? i = At("tooltips.continueLine") : i = At("tooltips.finishPoly"), this._hintMarker.setTooltipContent(i);
            },
            _finishShape() {
              if (!this.options.allowSelfIntersection && (this._handleSelfIntersection(true, this._layer.getLatLngs()[0]), this._doesSelfIntersect) || this.options.requireSnapToFinish && !this._hintMarker._snapped && !this._isFirstLayer()) return;
              let e = this._layer.getLatLngs();
              if (e.length <= 2) return;
              let i = L.polygon(e, this.options.pathOptions);
              this._setPane(i, "layerPane"), this._finishLayer(i), i.addTo(this._map.pm._getContainingLayer()), this._fireCreate(i), this._cleanupSnapping(), this._otherSnapLayers.splice(this._tempSnapLayerIndex, 1), delete this._tempSnapLayerIndex;
              let r = this._hintMarker.getLatLng();
              this.disable(), this.options.continueDrawing && (this.enable(), this._hintMarker.setLatLng(r));
            }
          }), re.Rectangle = re.extend({
            initialize(e) {
              this._map = e, this._shape = "Rectangle", this.toolbarButtonName = "drawRectangle";
            },
            enable(e) {
              if (L.Util.setOptions(this, e), this._enabled = true, this._layerGroup = new L.FeatureGroup(), this._layerGroup._pmTempLayer = true, this._layerGroup.addTo(this._map), this._layer = L.rectangle([
                [
                  0,
                  0
                ],
                [
                  0,
                  0
                ]
              ], this.options.pathOptions), this._setPane(this._layer, "layerPane"), this._layer._pmTempLayer = true, this._startMarker = L.marker(this._map.getCenter(), {
                icon: L.divIcon({
                  className: "marker-icon rect-start-marker"
                }),
                draggable: false,
                zIndexOffset: -100,
                opacity: this.options.cursorMarker ? 1 : 0
              }), this._setPane(this._startMarker, "vertexPane"), this._startMarker._pmTempLayer = true, this._layerGroup.addLayer(this._startMarker), this._hintMarker = L.marker(this._map.getCenter(), {
                zIndexOffset: 150,
                icon: L.divIcon({
                  className: "marker-icon cursor-marker"
                })
              }), this._setPane(this._hintMarker, "vertexPane"), this._hintMarker._pmTempLayer = true, this._layerGroup.addLayer(this._hintMarker), this.options.cursorMarker && L.DomUtil.addClass(this._hintMarker._icon, "visible"), this.options.tooltips && this._hintMarker.bindTooltip(At("tooltips.firstVertex"), {
                permanent: true,
                offset: L.point(0, 10),
                direction: "bottom",
                opacity: 0.8
              }).openTooltip(), this.options.cursorMarker) {
                this._styleMarkers = [];
                for (let i = 0; i < 2; i += 1) {
                  let r = L.marker(this._map.getCenter(), {
                    icon: L.divIcon({
                      className: "marker-icon rect-style-marker"
                    }),
                    draggable: false,
                    zIndexOffset: 100
                  });
                  this._setPane(r, "vertexPane"), r._pmTempLayer = true, this._layerGroup.addLayer(r), this._styleMarkers.push(r);
                }
              }
              this._map.getContainer().classList.add("geoman-draw-cursor"), this._map.on("click", this._placeStartingMarkers, this), this._map.on("mousemove", this._syncHintMarker, this), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, true), this._otherSnapLayers = [], this._fireDrawStart(), this._setGlobalDrawMode();
            },
            disable() {
              this._enabled && (this._enabled = false, this._map.getContainer().classList.remove("geoman-draw-cursor"), this._map.off("click", this._finishShape, this), this._map.off("click", this._placeStartingMarkers, this), this._map.off("mousemove", this._syncHintMarker, this), this._map.removeLayer(this._layerGroup), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, false), this.options.snappable && this._cleanupSnapping(), this._fireDrawEnd(), this._setGlobalDrawMode());
            },
            enabled() {
              return this._enabled;
            },
            toggle(e) {
              this.enabled() ? this.disable() : this.enable(e);
            },
            _placeStartingMarkers(e) {
              this._hintMarker._snapped || this._hintMarker.setLatLng(e.latlng);
              let i = this._hintMarker.getLatLng();
              L.DomUtil.addClass(this._startMarker._icon, "visible"), this._startMarker.setLatLng(i), this.options.cursorMarker && this._styleMarkers && this._styleMarkers.forEach((r) => {
                L.DomUtil.addClass(r._icon, "visible"), r.setLatLng(i);
              }), this._map.off("click", this._placeStartingMarkers, this), this._map.on("click", this._finishShape, this), this._hintMarker.setTooltipContent(At("tooltips.finishRect")), this._setRectangleOrigin();
            },
            _setRectangleOrigin() {
              let e = this._startMarker.getLatLng();
              e && (this._layerGroup.addLayer(this._layer), this._layer.setLatLngs([
                e,
                e
              ]), this._hintMarker.on("move", this._syncRectangleSize, this));
            },
            _syncHintMarker(e) {
              if (this._hintMarker.setLatLng(e.latlng), this.options.snappable) {
                let r = e;
                r.target = this._hintMarker, this._handleSnapping(r);
              }
              let i = this._layerGroup && this._layerGroup.hasLayer(this._layer) ? this._layer.getLatLngs() : [
                this._hintMarker.getLatLng()
              ];
              this._fireChange(i, "Draw");
            },
            _syncRectangleSize() {
              let e = Is(this._startMarker.getLatLng(), this._map), i = Is(this._hintMarker.getLatLng(), this._map), r = L.PM.Utils._getRotatedRectangle(e, i, this.options.rectangleAngle || 0, this._map);
              if (this._layer.setLatLngs(r), this.options.cursorMarker && this._styleMarkers) {
                let s = [];
                r.forEach((u) => {
                  !u.equals(e, 1e-8) && !u.equals(i, 1e-8) && s.push(u);
                }), s.forEach((u, c) => {
                  try {
                    this._styleMarkers[c].setLatLng(u);
                  } catch {
                  }
                });
              }
            },
            _findCorners() {
              let e = this._layer.getLatLngs()[0];
              return L.PM.Utils._getRotatedRectangle(e[0], e[2], this.options.rectangleAngle || 0, this._map);
            },
            _finishShape(e) {
              (e == null ? void 0 : e.latlng) && !this._hintMarker._snapped && this._hintMarker.setLatLng(e.latlng);
              let i = this._hintMarker.getLatLng(), r = this._startMarker.getLatLng();
              if (this.options.requireSnapToFinish && !this._hintMarker._snapped && !this._isFirstLayer() || r.equals(i)) return;
              let s = L.rectangle([
                r,
                i
              ], this.options.pathOptions);
              if (this.options.rectangleAngle) {
                let c = L.PM.Utils._getRotatedRectangle(r, i, this.options.rectangleAngle || 0, this._map);
                s.setLatLngs(c), s.pm && s.pm._setAngle(this.options.rectangleAngle || 0);
              }
              this._setPane(s, "layerPane"), this._finishLayer(s), s.addTo(this._map.pm._getContainingLayer()), this._fireCreate(s);
              let u = this._hintMarker.getLatLng();
              this.disable(), this.options.continueDrawing && (this.enable(), this._hintMarker.setLatLng(u));
            },
            setStyle() {
              var _a3;
              (_a3 = this._layer) == null ? void 0 : _a3.setStyle(this.options.pathOptions);
            }
          }), re.CircleMarker = re.extend({
            initialize(e) {
              this._map = e, this._shape = "CircleMarker", this.toolbarButtonName = "drawCircleMarker", this._layerIsDragging = false, this._BaseCircleClass = L.CircleMarker, this._minRadiusOption = "minRadiusCircleMarker", this._maxRadiusOption = "maxRadiusCircleMarker", this._editableOption = "resizeableCircleMarker", this._defaultRadius = 10;
            },
            enable(e) {
              if (L.Util.setOptions(this, e), this.options.editable && (this.options.resizeableCircleMarker = this.options.editable, delete this.options.editable), this._enabled = true, this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, true), this._map.getContainer().classList.add("geoman-draw-cursor"), this.options[this._editableOption]) {
                let i = {};
                L.extend(i, this.options.templineStyle), i.radius = 0, this._layerGroup = new L.FeatureGroup(), this._layerGroup._pmTempLayer = true, this._layerGroup.addTo(this._map), this._layer = new this._BaseCircleClass(this._map.getCenter(), i), this._setPane(this._layer, "layerPane"), this._layer._pmTempLayer = true, this._centerMarker = L.marker(this._map.getCenter(), {
                  icon: L.divIcon({
                    className: "marker-icon"
                  }),
                  draggable: false,
                  zIndexOffset: 100
                }), this._setPane(this._centerMarker, "vertexPane"), this._centerMarker._pmTempLayer = true, this._hintMarker = L.marker(this._map.getCenter(), {
                  zIndexOffset: 110,
                  icon: L.divIcon({
                    className: "marker-icon cursor-marker"
                  })
                }), this._setPane(this._hintMarker, "vertexPane"), this._hintMarker._pmTempLayer = true, this._layerGroup.addLayer(this._hintMarker), this.options.cursorMarker && L.DomUtil.addClass(this._hintMarker._icon, "visible"), this.options.tooltips && this._hintMarker.bindTooltip(At("tooltips.startCircle"), {
                  permanent: true,
                  offset: L.point(0, 10),
                  direction: "bottom",
                  opacity: 0.8
                }).openTooltip(), this._hintline = L.polyline([], this.options.hintlineStyle), this._setPane(this._hintline, "layerPane"), this._hintline._pmTempLayer = true, this._layerGroup.addLayer(this._hintline), this._map.on("click", this._placeCenterMarker, this);
              } else this._map.on("click", this._createMarker, this), this._hintMarker = new this._BaseCircleClass(this._map.getCenter(), {
                radius: this._defaultRadius,
                ...this.options.templineStyle
              }), this._setPane(this._hintMarker, "layerPane"), this._hintMarker._pmTempLayer = true, this._hintMarker.addTo(this._map), this._layer = this._hintMarker, this.options.tooltips && this._hintMarker.bindTooltip(At("tooltips.placeCircleMarker"), {
                permanent: true,
                offset: L.point(0, 10),
                direction: "bottom",
                opacity: 0.8
              }).openTooltip();
              this._map.on("mousemove", this._syncHintMarker, this), this._extendingEnable(), this._otherSnapLayers = [], this._fireDrawStart(), this._setGlobalDrawMode();
            },
            _extendingEnable() {
              !this.options[this._editableOption] && this.options.markerEditable && this._map.eachLayer((e) => {
                this.isRelevantMarker(e) && e.pm.enable();
              }), this._layer.bringToBack();
            },
            disable() {
              this._enabled && (this._enabled = false, this._map.getContainer().classList.remove("geoman-draw-cursor"), this.options[this._editableOption] ? (this._map.off("click", this._finishShape, this), this._map.off("click", this._placeCenterMarker, this), this._map.removeLayer(this._layerGroup)) : (this._map.off("click", this._createMarker, this), this._extendingDisable(), this._hintMarker.remove()), this._map.off("mousemove", this._syncHintMarker, this), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, false), this.options.snappable && this._cleanupSnapping(), this._fireDrawEnd(), this._setGlobalDrawMode());
            },
            _extendingDisable() {
              this._map.eachLayer((e) => {
                this.isRelevantMarker(e) && e.pm.disable();
              });
            },
            enabled() {
              return this._enabled;
            },
            toggle(e) {
              this.enabled() ? this.disable() : this.enable(e);
            },
            _placeCenterMarker(e) {
              this._hintMarker._snapped || this._hintMarker.setLatLng(e.latlng), this._layerGroup.addLayer(this._layer), this._layerGroup.addLayer(this._centerMarker);
              let i = this._hintMarker.getLatLng();
              this._centerMarker.setLatLng(i), this._map.off("click", this._placeCenterMarker, this), this._map.on("click", this._finishShape, this), this._placeCircleCenter();
            },
            _placeCircleCenter() {
              let e = this._centerMarker.getLatLng();
              e && (this._layer.setLatLng(e), this._hintMarker.on("move", this._syncHintLine, this), this._hintMarker.on("move", this._syncCircleRadius, this), this._hintMarker.setTooltipContent(At("tooltips.finishCircle")), this._fireCenterPlaced(), this._fireChange(this._layer.getLatLng(), "Draw"));
            },
            _syncHintLine() {
              let e = this._centerMarker.getLatLng(), i = this._getNewDestinationOfHintMarker();
              this._hintline.setLatLngs([
                e,
                i
              ]);
            },
            _syncCircleRadius() {
              let e = this._centerMarker.getLatLng(), i = this._hintMarker.getLatLng(), r = this._distanceCalculation(e, i);
              this.options[this._minRadiusOption] && r < this.options[this._minRadiusOption] ? this._layer.setRadius(this.options[this._minRadiusOption]) : this.options[this._maxRadiusOption] && r > this.options[this._maxRadiusOption] ? this._layer.setRadius(this.options[this._maxRadiusOption]) : this._layer.setRadius(r);
            },
            _syncHintMarker(e) {
              if (this._hintMarker.setLatLng(e.latlng), this._hintMarker.setLatLng(this._getNewDestinationOfHintMarker()), this.options.snappable) {
                let r = e;
                r.target = this._hintMarker, this._handleSnapping(r);
              }
              this._handleHintMarkerSnapping();
              let i = this._layerGroup && this._layerGroup.hasLayer(this._centerMarker) ? this._centerMarker.getLatLng() : this._hintMarker.getLatLng();
              this._fireChange(i, "Draw");
            },
            isRelevantMarker(e) {
              return e instanceof L.CircleMarker && !(e instanceof L.Circle) && e.pm && !e._pmTempLayer;
            },
            _createMarker(e) {
              if (this.options.requireSnapToFinish && !this._hintMarker._snapped && !this._isFirstLayer() || !e.latlng || this._layerIsDragging) return;
              this._hintMarker._snapped || this._hintMarker.setLatLng(e.latlng);
              let i = this._hintMarker.getLatLng(), r = new this._BaseCircleClass(i, {
                radius: this._defaultRadius,
                ...this.options.pathOptions
              });
              this._setPane(r, "layerPane"), this._finishLayer(r), r.addTo(this._map.pm._getContainingLayer()), this._extendingCreateMarker(r), this._fireCreate(r), this._cleanupSnapping(), this.options.continueDrawing || this.disable();
            },
            _extendingCreateMarker(e) {
              e.pm && this.options.markerEditable && e.pm.enable();
            },
            _finishShape(e) {
              if (this.options.requireSnapToFinish && !this._hintMarker._snapped && !this._isFirstLayer()) return;
              (e == null ? void 0 : e.latlng) && !this._hintMarker._snapped && this._hintMarker.setLatLng(e.latlng);
              let i = this._centerMarker.getLatLng(), r = this._defaultRadius;
              if (this.options[this._editableOption]) {
                let p = this._hintMarker.getLatLng();
                r = this._distanceCalculation(i, p), this.options[this._minRadiusOption] && r < this.options[this._minRadiusOption] ? r = this.options[this._minRadiusOption] : this.options[this._maxRadiusOption] && r > this.options[this._maxRadiusOption] && (r = this.options[this._maxRadiusOption]);
              }
              let s = {
                ...this.options.pathOptions,
                radius: r
              }, u = new this._BaseCircleClass(i, s);
              this._setPane(u, "layerPane"), this._finishLayer(u), u.addTo(this._map.pm._getContainingLayer()), u.pm && u.pm._updateHiddenPolyCircle(), this._fireCreate(u);
              let c = this._hintMarker.getLatLng();
              this.disable(), this.options.continueDrawing && (this.enable(), this._hintMarker.setLatLng(c));
            },
            _getNewDestinationOfHintMarker() {
              let e = this._hintMarker.getLatLng();
              if (this.options[this._editableOption]) {
                if (!this._layerGroup.hasLayer(this._centerMarker)) return e;
                let i = this._centerMarker.getLatLng(), r = this._distanceCalculation(i, e);
                this.options[this._minRadiusOption] && r < this.options[this._minRadiusOption] ? e = Wi(this._map, i, e, this._getMinDistanceInMeter()) : this.options[this._maxRadiusOption] && r > this.options[this._maxRadiusOption] && (e = Wi(this._map, i, e, this._getMaxDistanceInMeter()));
              }
              return e;
            },
            _getMinDistanceInMeter() {
              return L.PM.Utils.pxRadiusToMeterRadius(this.options[this._minRadiusOption], this._map, this._centerMarker.getLatLng());
            },
            _getMaxDistanceInMeter() {
              return L.PM.Utils.pxRadiusToMeterRadius(this.options[this._maxRadiusOption], this._map, this._centerMarker.getLatLng());
            },
            _handleHintMarkerSnapping() {
              if (this.options[this._editableOption]) {
                if (this._hintMarker._snapped) {
                  let e = this._centerMarker.getLatLng(), i = this._hintMarker.getLatLng(), r = this._distanceCalculation(e, i);
                  this._layerGroup.hasLayer(this._centerMarker) && (this.options[this._minRadiusOption] && r < this.options[this._minRadiusOption] ? this._hintMarker.setLatLng(this._hintMarker._orgLatLng) : this.options[this._maxRadiusOption] && r > this.options[this._maxRadiusOption] && this._hintMarker.setLatLng(this._hintMarker._orgLatLng));
                }
                this._hintMarker.setLatLng(this._getNewDestinationOfHintMarker());
              }
            },
            setStyle() {
              var _a3, _b2;
              let e = {};
              L.extend(e, this.options.templineStyle), this.options[this._editableOption] && (e.radius = 0), (_a3 = this._layer) == null ? void 0 : _a3.setStyle(e), (_b2 = this._hintline) == null ? void 0 : _b2.setStyle(this.options.hintlineStyle);
            },
            _distanceCalculation(e, i) {
              return this._map.project(e).distanceTo(this._map.project(i));
            }
          }), re.Circle = re.CircleMarker.extend({
            initialize(e) {
              this._map = e, this._shape = "Circle", this.toolbarButtonName = "drawCircle", this._BaseCircleClass = L.Circle, this._minRadiusOption = "minRadiusCircle", this._maxRadiusOption = "maxRadiusCircle", this._editableOption = "resizeableCircle", this._defaultRadius = 100;
            },
            _extendingEnable() {
            },
            _extendingDisable() {
            },
            _extendingCreateMarker() {
            },
            isRelevantMarker() {
            },
            _getMinDistanceInMeter() {
              return this.options[this._minRadiusOption];
            },
            _getMaxDistanceInMeter() {
              return this.options[this._maxRadiusOption];
            },
            _distanceCalculation(e, i) {
              return this._map.distance(e, i);
            }
          });
          var Hn = class {
            constructor(e = [], i = Dr) {
              if (this.data = e, this.length = this.data.length, this.compare = i, this.length > 0) for (let r = (this.length >> 1) - 1; r >= 0; r--) this._down(r);
            }
            push(e) {
              this.data.push(e), this.length++, this._up(this.length - 1);
            }
            pop() {
              if (this.length === 0) return;
              let e = this.data[0], i = this.data.pop();
              return this.length--, this.length > 0 && (this.data[0] = i, this._down(0)), e;
            }
            peek() {
              return this.data[0];
            }
            _up(e) {
              let { data: i, compare: r } = this, s = i[e];
              for (; e > 0; ) {
                let u = e - 1 >> 1, c = i[u];
                if (r(s, c) >= 0) break;
                i[e] = c, e = u;
              }
              i[e] = s;
            }
            _down(e) {
              let { data: i, compare: r } = this, s = this.length >> 1, u = i[e];
              for (; e < s; ) {
                let c = (e << 1) + 1, p = i[c], f = c + 1;
                if (f < this.length && r(i[f], p) < 0 && (c = f, p = i[f]), r(p, u) >= 0) break;
                i[e] = p, e = c;
              }
              i[e] = u;
            }
          };
          function Dr(e, i) {
            return e < i ? -1 : e > i ? 1 : 0;
          }
          function Zs(e, i) {
            return e.p.x > i.p.x ? 1 : e.p.x < i.p.x ? -1 : e.p.y !== i.p.y ? e.p.y > i.p.y ? 1 : -1 : 1;
          }
          function so(e, i) {
            return e.rightSweepEvent.p.x > i.rightSweepEvent.p.x ? 1 : e.rightSweepEvent.p.x < i.rightSweepEvent.p.x ? -1 : e.rightSweepEvent.p.y !== i.rightSweepEvent.p.y ? e.rightSweepEvent.p.y < i.rightSweepEvent.p.y ? 1 : -1 : 1;
          }
          var Ir = class {
            constructor(e, i, r, s) {
              this.p = {
                x: e[0],
                y: e[1]
              }, this.featureId = i, this.ringId = r, this.eventId = s, this.otherEvent = null, this.isLeftEndpoint = null;
            }
            isSamePoint(e) {
              return this.p.x === e.p.x && this.p.y === e.p.y;
            }
          };
          function ao(e, i) {
            if (e.type === "FeatureCollection") {
              let r = e.features;
              for (let s = 0; s < r.length; s++) Je(r[s], i);
            } else Je(e, i);
          }
          var we = 0, si = 0, Wn = 0;
          function Je(e, i) {
            let r = e.type === "Feature" ? e.geometry : e, s = r.coordinates;
            (r.type === "Polygon" || r.type === "MultiLineString") && (s = [
              s
            ]), r.type === "LineString" && (s = [
              [
                s
              ]
            ]);
            for (let u = 0; u < s.length; u++) for (let c = 0; c < s[u].length; c++) {
              let p = s[u][c][0], f = null;
              si = si + 1;
              for (let m = 0; m < s[u][c].length - 1; m++) {
                f = s[u][c][m + 1];
                let y = new Ir(p, we, si, Wn), A = new Ir(f, we, si, Wn + 1);
                y.otherEvent = A, A.otherEvent = y, Zs(y, A) > 0 ? (A.isLeftEndpoint = true, y.isLeftEndpoint = false) : (y.isLeftEndpoint = true, A.isLeftEndpoint = false), i.push(y), i.push(A), p = f, Wn = Wn + 1;
              }
            }
            we = we + 1;
          }
          var oo = class {
            constructor(e) {
              this.leftSweepEvent = e, this.rightSweepEvent = e.otherEvent;
            }
          };
          function Qi(e, i) {
            if (e === null || i === null || e.leftSweepEvent.ringId === i.leftSweepEvent.ringId && (e.rightSweepEvent.isSamePoint(i.leftSweepEvent) || e.rightSweepEvent.isSamePoint(i.leftSweepEvent) || e.rightSweepEvent.isSamePoint(i.rightSweepEvent) || e.leftSweepEvent.isSamePoint(i.leftSweepEvent) || e.leftSweepEvent.isSamePoint(i.rightSweepEvent))) return false;
            let r = e.leftSweepEvent.p.x, s = e.leftSweepEvent.p.y, u = e.rightSweepEvent.p.x, c = e.rightSweepEvent.p.y, p = i.leftSweepEvent.p.x, f = i.leftSweepEvent.p.y, m = i.rightSweepEvent.p.x, y = i.rightSweepEvent.p.y, A = (y - f) * (u - r) - (m - p) * (c - s), C = (m - p) * (s - f) - (y - f) * (r - p), O = (u - r) * (s - f) - (c - s) * (r - p);
            if (A === 0) return false;
            let R = C / A, H = O / A;
            if (R >= 0 && R <= 1 && H >= 0 && H <= 1) {
              let K = r + R * (u - r), it = s + R * (c - s);
              return [
                K,
                it
              ];
            }
            return false;
          }
          function uo(e, i) {
            i = i || false;
            let r = [], s = new Hn([], so);
            for (; e.length; ) {
              let u = e.pop();
              if (u.isLeftEndpoint) {
                let c = new oo(u);
                for (let p = 0; p < s.data.length; p++) {
                  let f = s.data[p];
                  if (i && f.leftSweepEvent.featureId === u.featureId) continue;
                  let m = Qi(c, f);
                  m !== false && r.push(m);
                }
                s.push(c);
              } else u.isLeftEndpoint === false && s.pop();
            }
            return r;
          }
          function Cn(e, i) {
            let r = new Hn([], Zs);
            return ao(e, r), uo(r, i);
          }
          var js = Cn, Kn = js;
          function qs(e, i, r = {}) {
            let { removeDuplicates: s = true, ignoreSelfIntersections: u = true } = r, c = [];
            e.type === "FeatureCollection" ? c = c.concat(e.features) : e.type === "Feature" ? c.push(e) : (e.type === "LineString" || e.type === "Polygon" || e.type === "MultiLineString" || e.type === "MultiPolygon") && c.push(Xe(e)), i.type === "FeatureCollection" ? c = c.concat(i.features) : i.type === "Feature" ? c.push(i) : (i.type === "LineString" || i.type === "Polygon" || i.type === "MultiLineString" || i.type === "MultiPolygon") && c.push(Xe(i));
            let p = Kn(Se(c), u), f = [];
            if (s) {
              let m = {};
              p.forEach((y) => {
                let A = y.join(",");
                m[A] || (m[A] = true, f.push(y));
              });
            } else f = p;
            return Se(f.map((m) => Yi(m)));
          }
          var Ie = qs, Yn = et(Pt(), 1);
          function Or(e, i, r) {
            if (e !== null) for (var s, u, c, p, f, m, y, A = 0, C = 0, O, R = e.type, H = R === "FeatureCollection", K = R === "Feature", it = H ? e.features.length : 1, st = 0; st < it; st++) {
              y = H ? e.features[st].geometry : K ? e.geometry : e, O = y ? y.type === "GeometryCollection" : false, f = O ? y.geometries.length : 1;
              for (var k = 0; k < f; k++) {
                var z = 0, V = 0;
                if (p = O ? y.geometries[k] : y, p !== null) {
                  m = p.coordinates;
                  var tt = p.type;
                  switch (A = 0, tt) {
                    case null:
                      break;
                    case "Point":
                      if (i(m, C, st, z, V) === false) return false;
                      C++, z++;
                      break;
                    case "LineString":
                    case "MultiPoint":
                      for (s = 0; s < m.length; s++) {
                        if (i(m[s], C, st, z, V) === false) return false;
                        C++, tt === "MultiPoint" && z++;
                      }
                      tt === "LineString" && z++;
                      break;
                    case "Polygon":
                    case "MultiLineString":
                      for (s = 0; s < m.length; s++) {
                        for (u = 0; u < m[s].length - A; u++) {
                          if (i(m[s][u], C, st, z, V) === false) return false;
                          C++;
                        }
                        tt === "MultiLineString" && z++, tt === "Polygon" && V++;
                      }
                      tt === "Polygon" && z++;
                      break;
                    case "MultiPolygon":
                      for (s = 0; s < m.length; s++) {
                        for (V = 0, u = 0; u < m[s].length; u++) {
                          for (c = 0; c < m[s][u].length - A; c++) {
                            if (i(m[s][u][c], C, st, z, V) === false) return false;
                            C++;
                          }
                          V++;
                        }
                        z++;
                      }
                      break;
                    case "GeometryCollection":
                      for (s = 0; s < p.geometries.length; s++) if (Or(p.geometries[s], i) === false) return false;
                      break;
                    default:
                      throw new Error("Unknown Geometry Type");
                  }
                }
              }
            }
          }
          function $i(e, i) {
            if (e.type === "Feature") i(e, 0);
            else if (e.type === "FeatureCollection") for (var r = 0; r < e.features.length && i(e.features[r], r) !== false; r++) ;
          }
          function lo(e, i, r) {
            var s = r;
            return $i(e, function(u, c) {
              c === 0 && r === void 0 ? s = u : s = i(s, u, c);
            }), s;
          }
          function ai(e, i) {
            var r, s, u, c, p, f, m, y, A, C, O = 0, R = e.type === "FeatureCollection", H = e.type === "Feature", K = R ? e.features.length : 1;
            for (r = 0; r < K; r++) {
              for (f = R ? e.features[r].geometry : H ? e.geometry : e, y = R ? e.features[r].properties : H ? e.properties : {}, A = R ? e.features[r].bbox : H ? e.bbox : void 0, C = R ? e.features[r].id : H ? e.id : void 0, m = f ? f.type === "GeometryCollection" : false, p = m ? f.geometries.length : 1, u = 0; u < p; u++) {
                if (c = m ? f.geometries[u] : f, c === null) {
                  if (i(null, O, y, A, C) === false) return false;
                  continue;
                }
                switch (c.type) {
                  case "Point":
                  case "LineString":
                  case "MultiPoint":
                  case "Polygon":
                  case "MultiLineString":
                  case "MultiPolygon": {
                    if (i(c, O, y, A, C) === false) return false;
                    break;
                  }
                  case "GeometryCollection": {
                    for (s = 0; s < c.geometries.length; s++) if (i(c.geometries[s], O, y, A, C) === false) return false;
                    break;
                  }
                  default:
                    throw new Error("Unknown Geometry Type");
                }
              }
              O++;
            }
          }
          function Rr(e, i) {
            ai(e, function(r, s, u, c, p) {
              var f = r === null ? null : r.type;
              switch (f) {
                case null:
                case "Point":
                case "LineString":
                case "Polygon":
                  return i(Xe(r, u, {
                    bbox: c,
                    id: p
                  }), s, 0) === false ? false : void 0;
              }
              var m;
              switch (f) {
                case "MultiPoint":
                  m = "Point";
                  break;
                case "MultiLineString":
                  m = "LineString";
                  break;
                case "MultiPolygon":
                  m = "Polygon";
                  break;
              }
              for (var y = 0; y < r.coordinates.length; y++) {
                var A = r.coordinates[y], C = {
                  type: m,
                  coordinates: A
                };
                if (i(Xe(C, u), s, y) === false) return false;
              }
            });
          }
          function me(e, i = {}) {
            if (e.bbox != null && i.recompute !== true) return e.bbox;
            let r = [
              1 / 0,
              1 / 0,
              -1 / 0,
              -1 / 0
            ];
            return Or(e, (s) => {
              r[0] > s[0] && (r[0] = s[0]), r[1] > s[1] && (r[1] = s[1]), r[2] < s[0] && (r[2] = s[0]), r[3] < s[1] && (r[3] = s[1]);
            }), r;
          }
          function Fr(e) {
            var i;
            if (e.bbox) i = e.bbox;
            else if (Array.isArray(e) && e.length === 4) i = e;
            else if (Array.isArray(e) && e.length === 6) i = [
              e[0],
              e[1],
              e[3],
              e[4]
            ];
            else if (e.type === "Feature") i = me(e);
            else if (e.type === "FeatureCollection") i = me(e);
            else throw new Error("invalid geojson");
            return {
              minX: i[0],
              minY: i[1],
              maxX: i[2],
              maxY: i[3]
            };
          }
          var oi = class {
            constructor(e = 9) {
              this.tree = new Yn.default(e), this.tree.toBBox = Fr;
            }
            insert(e) {
              if (e.type !== "Feature") throw new Error("invalid feature");
              return e.bbox = e.bbox ? e.bbox : me(e), this.tree.insert(e), this;
            }
            load(e) {
              var i = [];
              return Array.isArray(e) ? e.forEach(function(r) {
                if (r.type !== "Feature") throw new Error("invalid features");
                r.bbox = r.bbox ? r.bbox : me(r), i.push(r);
              }) : $i(e, function(r) {
                if (r.type !== "Feature") throw new Error("invalid features");
                r.bbox = r.bbox ? r.bbox : me(r), i.push(r);
              }), this.tree.load(i), this;
            }
            remove(e, i) {
              if (e.type !== "Feature") throw new Error("invalid feature");
              return e.bbox = e.bbox ? e.bbox : me(e), this.tree.remove(e, i), this;
            }
            clear() {
              return this.tree.clear(), this;
            }
            search(e) {
              var i = this.tree.search(Fr(e));
              return Se(i);
            }
            collides(e) {
              return this.tree.collides(Fr(e));
            }
            all() {
              let e = this.tree.all();
              return Se(e);
            }
            toJSON() {
              return this.tree.toJSON();
            }
            fromJSON(e) {
              return this.tree.fromJSON(e), this;
            }
          };
          function xn(e) {
            return new oi(e);
          }
          function Vs(e, i) {
            if (i = i ?? {}, !De(i)) throw new Error("options is invalid");
            var r = i.precision, s = i.coordinates, u = i.mutate;
            if (r = r == null || isNaN(r) ? 6 : r, s = s == null || isNaN(s) ? 3 : s, !e) throw new Error("<geojson> is required");
            if (typeof r != "number") throw new Error("<precision> must be a number");
            if (typeof s != "number") throw new Error("<coordinates> must be a number");
            (u === false || u === void 0) && (e = JSON.parse(JSON.stringify(e)));
            var c = Math.pow(10, r);
            return Or(e, function(p) {
              zr(p, c, s);
            }), e;
          }
          function zr(e, i, r) {
            e.length > r && e.splice(r, e.length);
            for (var s = 0; s < e.length; s++) e[s] = Math.round(e[s] * i) / i;
            return e;
          }
          function Ae(e) {
            if (!e) throw new Error("coord is required");
            if (!Array.isArray(e)) {
              if (e.type === "Feature" && e.geometry !== null && e.geometry.type === "Point") return [
                ...e.geometry.coordinates
              ];
              if (e.type === "Point") return [
                ...e.coordinates
              ];
            }
            if (Array.isArray(e) && e.length >= 2 && !Array.isArray(e[0]) && !Array.isArray(e[1])) return [
              ...e
            ];
            throw new Error("coord must be GeoJSON Point or an Array of numbers");
          }
          function ui(e) {
            if (Array.isArray(e)) return e;
            if (e.type === "Feature") {
              if (e.geometry !== null) return e.geometry.coordinates;
            } else if (e.coordinates) return e.coordinates;
            throw new Error("coords must be GeoJSON Feature, Geometry Object or an Array");
          }
          function Pi(e) {
            return e.type === "Feature" ? e.geometry : e;
          }
          function Ti(e, i) {
            return e.type === "FeatureCollection" ? "FeatureCollection" : e.type === "GeometryCollection" ? "GeometryCollection" : e.type === "Feature" && e.geometry !== null ? e.geometry.type : e.type;
          }
          function Xn(e) {
            if (!e) throw new Error("geojson is required");
            let i = [];
            return Rr(e, (r) => {
              Nr(r, i);
            }), Se(i);
          }
          function Nr(e, i) {
            let r = [], s = e.geometry;
            if (s !== null) {
              switch (s.type) {
                case "Polygon":
                  r = ui(s);
                  break;
                case "LineString":
                  r = [
                    ui(s)
                  ];
              }
              r.forEach((u) => {
                Hs(u, e.properties).forEach((c) => {
                  c.id = i.length, i.push(c);
                });
              });
            }
          }
          function Hs(e, i) {
            let r = [];
            return e.reduce((s, u) => {
              let c = wn([
                s,
                u
              ], i);
              return c.bbox = ho(s, u), r.push(c), u;
            }), r;
          }
          function ho(e, i) {
            let r = e[0], s = e[1], u = i[0], c = i[1], p = r < u ? r : u, f = s < c ? s : c, m = r > u ? r : u, y = s > c ? s : c;
            return [
              p,
              f,
              m,
              y
            ];
          }
          function tn(e, i, r = {}) {
            var s = Ae(e), u = Ae(i), c = Xi(u[1] - s[1]), p = Xi(u[0] - s[0]), f = Xi(s[1]), m = Xi(u[1]), y = Math.pow(Math.sin(c / 2), 2) + Math.pow(Math.sin(p / 2), 2) * Math.cos(f) * Math.cos(m);
            return qn(2 * Math.atan2(Math.sqrt(y), Math.sqrt(1 - y)), r.units);
          }
          var co = Object.defineProperty, Ws = Object.defineProperties, po = Object.getOwnPropertyDescriptors, Ur = Object.getOwnPropertySymbols, fo = Object.prototype.hasOwnProperty, Qe = Object.prototype.propertyIsEnumerable, En = (e, i, r) => i in e ? co(e, i, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: r
          }) : e[i] = r, _o = (e, i) => {
            for (var r in i || (i = {})) fo.call(i, r) && En(e, r, i[r]);
            if (Ur) for (var r of Ur(i)) Qe.call(i, r) && En(e, r, i[r]);
            return e;
          }, Jn = (e, i) => Ws(e, po(i));
          function mo(e, i, r = {}) {
            if (!e || !i) throw new Error("lines and inputPoint are required arguments");
            let s = Ae(i), u = Yi([
              1 / 0,
              1 / 0
            ], {
              lineStringIndex: -1,
              segmentIndex: -1,
              totalDistance: -1,
              lineDistance: -1,
              segmentDistance: -1,
              pointDistance: 1 / 0,
              multiFeatureIndex: -1,
              index: -1,
              location: -1,
              dist: 1 / 0
            }), c = 0, p = 0, f = -1;
            return Rr(e, function(m, y, A) {
              f !== A && (f = A, p = 0);
              let C = ui(m), O = C.length - 2;
              for (let R = 0; R < C.length - 1; R++) {
                let H = Yi(C[R]), K = Ae(H), it = Yi(C[R + 1]), st = Ae(it), k = tn(H, it, r), z, V;
                st[0] === s[0] && st[1] === s[1] ? [z, V] = [
                  st,
                  true
                ] : K[0] === s[0] && K[1] === s[1] ? [z, V] = [
                  K,
                  false
                ] : [z, V] = Xs(K, st, s);
                let tt = tn(i, z, r);
                if (tt < u.properties.pointDistance) {
                  let Q = tn(H, z, r);
                  u = Yi(z, {
                    lineStringIndex: A,
                    segmentIndex: V && R + 1 <= O ? R + 1 : R,
                    totalDistance: c + Q,
                    lineDistance: p + Q,
                    segmentDistance: Q,
                    pointDistance: tt,
                    multiFeatureIndex: -1,
                    index: -1,
                    location: -1,
                    dist: 1 / 0
                  }), u.properties = Jn(_o({}, u.properties), {
                    multiFeatureIndex: u.properties.lineStringIndex,
                    index: u.properties.segmentIndex,
                    location: u.properties.totalDistance,
                    dist: u.properties.pointDistance
                  });
                }
                c += k, p += k;
              }
            }), u;
          }
          function _i(e, i) {
            let [r, s, u] = e, [c, p, f] = i;
            return r * c + s * p + u * f;
          }
          function Mn(e, i) {
            let [r, s, u] = e, [c, p, f] = i;
            return [
              s * f - u * p,
              u * c - r * f,
              r * p - s * c
            ];
          }
          function kn(e) {
            return Math.sqrt(Math.pow(e[0], 2) + Math.pow(e[1], 2) + Math.pow(e[2], 2));
          }
          function Ks(e) {
            let i = kn(e);
            return [
              e[0] / i,
              e[1] / i,
              e[2] / i
            ];
          }
          function mi(e) {
            let i = Xi(e[1]), r = Xi(e[0]);
            return [
              Math.cos(i) * Math.cos(r),
              Math.cos(i) * Math.sin(r),
              Math.sin(i)
            ];
          }
          function Ys(e) {
            let [i, r, s] = e, u = Math.min(Math.max(s, -1), 1), c = fi(Math.asin(u));
            return [
              fi(Math.atan2(r, i)),
              c
            ];
          }
          function Xs(e, i, r) {
            let s = mi(e), u = mi(i), c = mi(r), p = Mn(s, u);
            if (p[0] === 0 && p[1] === 0 && p[2] === 0) return _i(s, u) > 0 ? [
              [
                ...i
              ],
              true
            ] : [
              [
                ...r
              ],
              false
            ];
            let f = Mn(p, c);
            if (f[0] === 0 && f[1] === 0 && f[2] === 0) return [
              [
                ...i
              ],
              true
            ];
            let m = Mn(f, p), y = Ks(m), A = [
              -y[0],
              -y[1],
              -y[2]
            ], C = _i(c, y) > _i(c, A) ? y : A, O = Ks(p), R = _i(Mn(s, C), O), H = _i(Mn(C, u), O);
            return R >= 0 && H >= 0 ? [
              Ys(C),
              false
            ] : _i(s, c) > _i(u, c) ? [
              [
                ...e
              ],
              false
            ] : [
              [
                ...i
              ],
              true
            ];
          }
          function Js(e, i) {
            if (!e) throw new Error("line is required");
            if (!i) throw new Error("splitter is required");
            let r = Ti(e), s = Ti(i);
            if (r !== "LineString") throw new Error("line must be LineString");
            if (s === "FeatureCollection") throw new Error("splitter cannot be a FeatureCollection");
            if (s === "GeometryCollection") throw new Error("splitter cannot be a GeometryCollection");
            var u = Vs(i, {
              precision: 7
            });
            switch (e.type !== "Feature" && (e = Xe(e)), s) {
              case "Point":
                return Qn(e, u);
              case "MultiPoint":
                return $e(e, u);
              case "LineString":
              case "MultiLineString":
              case "Polygon":
              case "MultiPolygon":
                return $e(e, qs(e, u, {
                  ignoreSelfIntersections: true
                }));
            }
          }
          function $e(e, i) {
            var r = [], s = xn();
            return Rr(i, function(u) {
              if (r.forEach(function(f, m) {
                f.id = m;
              }), !r.length) r = Qn(e, u).features, s.load(Se(r));
              else {
                var c = s.search(u);
                if (c.features.length) {
                  var p = Gr(u, c);
                  r = r.filter(function(f) {
                    return f.id !== p.id;
                  }), s.remove(p), $i(Qn(p, u), function(f) {
                    r.push(f), s.insert(f);
                  });
                }
              }
            }), Se(r);
          }
          function Qn(e, i) {
            var r = [], s = ui(e)[0], u = ui(e)[e.geometry.coordinates.length - 1];
            if (Si(s, Ae(i)) || Si(u, Ae(i))) return Se([
              e
            ]);
            var c = xn(), p = Xn(e);
            c.load(p);
            var f = c.search(i);
            if (!f.features.length) return Se([
              e
            ]);
            var m = Gr(i, f), y = [
              s
            ], A = lo(p, function(C, O, R) {
              var H = ui(O)[1], K = Ae(i);
              return R === m.id ? (C.push(K), r.push(wn(C)), Si(K, H) ? [
                K
              ] : [
                K,
                H
              ]) : (C.push(H), C);
            }, y);
            return A.length > 1 && r.push(wn(A)), Se(r);
          }
          function Gr(e, i) {
            if (!i.features.length) throw new Error("lines must contain features");
            if (i.features.length === 1) return i.features[0];
            var r, s = 1 / 0;
            return $i(i, function(u) {
              var c = mo(u, e), p = c.properties.dist;
              p < s && (r = u, s = p);
            }), r;
          }
          function Si(e, i) {
            return e[0] === i[0] && e[1] === i[1];
          }
          var go = Js, Oe = 11102230246251565e-32, Qt = 134217729, Qs = (3 + 8 * Oe) * Oe;
          function $n(e, i, r, s, u) {
            let c, p, f, m, y = i[0], A = s[0], C = 0, O = 0;
            A > y == A > -y ? (c = y, y = i[++C]) : (c = A, A = s[++O]);
            let R = 0;
            if (C < e && O < r) for (A > y == A > -y ? (p = y + c, f = c - (p - y), y = i[++C]) : (p = A + c, f = c - (p - A), A = s[++O]), c = p, f !== 0 && (u[R++] = f); C < e && O < r; ) A > y == A > -y ? (p = c + y, m = p - c, f = c - (p - m) + (y - m), y = i[++C]) : (p = c + A, m = p - c, f = c - (p - m) + (A - m), A = s[++O]), c = p, f !== 0 && (u[R++] = f);
            for (; C < e; ) p = c + y, m = p - c, f = c - (p - m) + (y - m), y = i[++C], c = p, f !== 0 && (u[R++] = f);
            for (; O < r; ) p = c + A, m = p - c, f = c - (p - m) + (A - m), A = s[++O], c = p, f !== 0 && (u[R++] = f);
            return (c !== 0 || R === 0) && (u[R++] = c), R;
          }
          function yo(e, i) {
            let r = i[0];
            for (let s = 1; s < e; s++) r += i[s];
            return r;
          }
          function en(e) {
            return new Float64Array(e);
          }
          var $s = (3 + 16 * Oe) * Oe, ta = (2 + 12 * Oe) * Oe, ea = (9 + 64 * Oe) * Oe * Oe, Di = en(4), ia = en(8), Zr = en(12), jr = en(16), ge = en(4);
          function t(e, i, r, s, u, c, p) {
            let f, m, y, A, C, O, R, H, K, it, st, k, z, V, tt, Q, $, b, w = e - u, E = r - u, D = i - c, T = s - c;
            V = w * T, O = Qt * w, R = O - (O - w), H = w - R, O = Qt * T, K = O - (O - T), it = T - K, tt = H * it - (V - R * K - H * K - R * it), Q = D * E, O = Qt * D, R = O - (O - D), H = D - R, O = Qt * E, K = O - (O - E), it = E - K, $ = H * it - (Q - R * K - H * K - R * it), st = tt - $, C = tt - st, Di[0] = tt - (st + C) + (C - $), k = V + st, C = k - V, z = V - (k - C) + (st - C), st = z - Q, C = z - st, Di[1] = z - (st + C) + (C - Q), b = k + st, C = b - k, Di[2] = k - (b - C) + (st - C), Di[3] = b;
            let B = yo(4, Di), N = ta * p;
            if (B >= N || -B >= N || (C = e - w, f = e - (w + C) + (C - u), C = r - E, y = r - (E + C) + (C - u), C = i - D, m = i - (D + C) + (C - c), C = s - T, A = s - (T + C) + (C - c), f === 0 && m === 0 && y === 0 && A === 0) || (N = ea * p + Qs * Math.abs(B), B += w * A + T * f - (D * y + E * m), B >= N || -B >= N)) return B;
            V = f * T, O = Qt * f, R = O - (O - f), H = f - R, O = Qt * T, K = O - (O - T), it = T - K, tt = H * it - (V - R * K - H * K - R * it), Q = m * E, O = Qt * m, R = O - (O - m), H = m - R, O = Qt * E, K = O - (O - E), it = E - K, $ = H * it - (Q - R * K - H * K - R * it), st = tt - $, C = tt - st, ge[0] = tt - (st + C) + (C - $), k = V + st, C = k - V, z = V - (k - C) + (st - C), st = z - Q, C = z - st, ge[1] = z - (st + C) + (C - Q), b = k + st, C = b - k, ge[2] = k - (b - C) + (st - C), ge[3] = b;
            let I = $n(4, Di, 4, ge, ia);
            V = w * A, O = Qt * w, R = O - (O - w), H = w - R, O = Qt * A, K = O - (O - A), it = A - K, tt = H * it - (V - R * K - H * K - R * it), Q = D * y, O = Qt * D, R = O - (O - D), H = D - R, O = Qt * y, K = O - (O - y), it = y - K, $ = H * it - (Q - R * K - H * K - R * it), st = tt - $, C = tt - st, ge[0] = tt - (st + C) + (C - $), k = V + st, C = k - V, z = V - (k - C) + (st - C), st = z - Q, C = z - st, ge[1] = z - (st + C) + (C - Q), b = k + st, C = b - k, ge[2] = k - (b - C) + (st - C), ge[3] = b;
            let F = $n(I, ia, 4, ge, Zr);
            V = f * A, O = Qt * f, R = O - (O - f), H = f - R, O = Qt * A, K = O - (O - A), it = A - K, tt = H * it - (V - R * K - H * K - R * it), Q = m * y, O = Qt * m, R = O - (O - m), H = m - R, O = Qt * y, K = O - (O - y), it = y - K, $ = H * it - (Q - R * K - H * K - R * it), st = tt - $, C = tt - st, ge[0] = tt - (st + C) + (C - $), k = V + st, C = k - V, z = V - (k - C) + (st - C), st = z - Q, C = z - st, ge[1] = z - (st + C) + (C - Q), b = k + st, C = b - k, ge[2] = k - (b - C) + (st - C), ge[3] = b;
            let j = $n(F, Zr, 4, ge, jr);
            return jr[j - 1];
          }
          function n(e, i, r, s, u, c) {
            let p = (i - c) * (r - u), f = (e - u) * (s - c), m = p - f, y = Math.abs(p + f);
            return Math.abs(m) >= $s * y ? m : -t(e, i, r, s, u, c, y);
          }
          function a(e, i) {
            var r, s, u = 0, c, p, f, m, y, A, C, O = e[0], R = e[1], H = i.length;
            for (r = 0; r < H; r++) {
              s = 0;
              var K = i[r], it = K.length - 1;
              if (A = K[0], A[0] !== K[it][0] && A[1] !== K[it][1]) throw new Error("First and last coordinates in a ring must be the same");
              for (p = A[0] - O, f = A[1] - R, s; s < it; s++) {
                if (C = K[s + 1], m = C[0] - O, y = C[1] - R, f === 0 && y === 0) {
                  if (m <= 0 && p >= 0 || p <= 0 && m >= 0) return 0;
                } else if (y >= 0 && f <= 0 || y <= 0 && f >= 0) {
                  if (c = n(p, m, f, y, 0, 0), c === 0) return 0;
                  (c > 0 && y > 0 && f <= 0 || c < 0 && y <= 0 && f > 0) && u++;
                }
                A = C, f = y, p = m;
              }
            }
            return u % 2 !== 0;
          }
          function d(e, i, r = {}) {
            if (!e) throw new Error("point is required");
            if (!i) throw new Error("polygon is required");
            let s = Ae(e), u = Pi(i), c = u.type, p = i.bbox, f = u.coordinates;
            if (p && _(s, p) === false) return false;
            c === "Polygon" && (f = [
              f
            ]);
            let m = false;
            for (var y = 0; y < f.length; ++y) {
              let A = a(s, f[y]);
              if (A === 0) return !r.ignoreBoundary;
              A && (m = true);
            }
            return m;
          }
          function _(e, i) {
            return i[0] <= e[0] && i[1] <= e[1] && i[2] >= e[0] && i[3] >= e[1];
          }
          function v(e, i, r = {}) {
            let s = Ae(e), u = ui(i);
            for (let c = 0; c < u.length - 1; c++) {
              let p = false;
              if (r.ignoreEndVertices && (c === 0 && (p = "start"), c === u.length - 2 && (p = "end"), c === 0 && c + 1 === u.length - 1 && (p = "both")), P(u[c], u[c + 1], s, p, typeof r.epsilon > "u" ? null : r.epsilon)) return true;
            }
            return false;
          }
          function P(e, i, r, s, u) {
            let c = r[0], p = r[1], f = e[0], m = e[1], y = i[0], A = i[1], C = r[0] - f, O = r[1] - m, R = y - f, H = A - m, K = C * H - O * R;
            if (u !== null) {
              if (Math.abs(K) > u) return false;
            } else if (K !== 0) return false;
            if (Math.abs(R) === Math.abs(H) && Math.abs(R) === 0) return s ? false : r[0] === e[0] && r[1] === e[1];
            if (s) {
              if (s === "start") return Math.abs(R) >= Math.abs(H) ? R > 0 ? f < c && c <= y : y <= c && c < f : H > 0 ? m < p && p <= A : A <= p && p < m;
              if (s === "end") return Math.abs(R) >= Math.abs(H) ? R > 0 ? f <= c && c < y : y < c && c <= f : H > 0 ? m <= p && p < A : A < p && p <= m;
              if (s === "both") return Math.abs(R) >= Math.abs(H) ? R > 0 ? f < c && c < y : y < c && c < f : H > 0 ? m < p && p < A : A < p && p < m;
            } else return Math.abs(R) >= Math.abs(H) ? R > 0 ? f <= c && c <= y : y <= c && c <= f : H > 0 ? m <= p && p <= A : A <= p && p <= m;
            return false;
          }
          function U(e, i) {
            let r = Pi(e), s = Pi(i), u = r.type, c = s.type, p = r.coordinates, f = s.coordinates;
            switch (u) {
              case "Point":
                if (c === "Point") return qr(p, f);
                throw new Error("feature2 " + c + " geometry not supported");
              case "MultiPoint":
                switch (c) {
                  case "Point":
                    return at(r, s);
                  case "MultiPoint":
                    return ft(r, s);
                  default:
                    throw new Error("feature2 " + c + " geometry not supported");
                }
              case "LineString":
                switch (c) {
                  case "Point":
                    return v(s, r, {
                      ignoreEndVertices: true
                    });
                  case "LineString":
                    return se(r, s);
                  case "MultiPoint":
                    return xt(r, s);
                  default:
                    throw new Error("feature2 " + c + " geometry not supported");
                }
              case "Polygon":
                switch (c) {
                  case "Point":
                    return d(s, r, {
                      ignoreBoundary: true
                    });
                  case "LineString":
                    return Ce(r, s);
                  case "Polygon":
                    return gi(r, s);
                  case "MultiPoint":
                    return ye(r, s);
                  case "MultiPolygon":
                    return X(r, s);
                  default:
                    throw new Error("feature2 " + c + " geometry not supported");
                }
              case "MultiPolygon":
                if (c === "Polygon") return q(r, s);
                throw new Error("feature2 " + c + " geometry not supported");
              default:
                throw new Error("feature1 " + u + " geometry not supported");
            }
          }
          function q(e, i) {
            return e.coordinates.some((r) => gi({
              type: "Polygon",
              coordinates: r
            }, i));
          }
          function X(e, i) {
            return i.coordinates.every((r) => gi(e, {
              type: "Polygon",
              coordinates: r
            }));
          }
          function at(e, i) {
            let r, s = false;
            for (r = 0; r < e.coordinates.length; r++) if (qr(e.coordinates[r], i.coordinates)) {
              s = true;
              break;
            }
            return s;
          }
          function ft(e, i) {
            for (let r of i.coordinates) {
              let s = false;
              for (let u of e.coordinates) if (qr(r, u)) {
                s = true;
                break;
              }
              if (!s) return false;
            }
            return true;
          }
          function xt(e, i) {
            let r = false;
            for (let s of i.coordinates) if (v(s, e, {
              ignoreEndVertices: true
            }) && (r = true), !v(s, e)) return false;
            return !!r;
          }
          function ye(e, i) {
            for (let r of i.coordinates) if (!d(r, e, {
              ignoreBoundary: true
            })) return false;
            return true;
          }
          function se(e, i) {
            let r = false;
            for (let s of i.coordinates) if (v({
              type: "Point",
              coordinates: s
            }, e, {
              ignoreEndVertices: true
            }) && (r = true), !v({
              type: "Point",
              coordinates: s
            }, e, {
              ignoreEndVertices: false
            })) return false;
            return r;
          }
          function Re(e, i) {
            let r = e.coordinates, s = [];
            for (let u = 0; u < r.length - 1; u++) {
              let c = wn([
                r[u],
                r[u + 1]
              ]), p = Js(c, Xe(i));
              p.features.length === 0 ? s.push(c) : s.push(...p.features);
            }
            return Se(s);
          }
          function Ce(e, i) {
            let r = me(e), s = me(i);
            if (!na(r, s)) return false;
            for (let p of i.coordinates) if (!d(p, e)) return false;
            let u = false, c = Re(i, e);
            for (let p of c.features) {
              let f = vo(p.geometry.coordinates[0], p.geometry.coordinates[1]);
              if (!d(f, e)) return false;
              !u && d(f, e, {
                ignoreBoundary: true
              }) && (u = true);
            }
            return u;
          }
          function gi(e, i) {
            if (e.type === "Feature" && e.geometry === null || i.type === "Feature" && i.geometry === null) return false;
            let r = me(e), s = me(i);
            if (!na(r, s)) return false;
            let u = Pi(i).coordinates;
            for (let c of u) for (let p of c) if (!d(p, e)) return false;
            return true;
          }
          function na(e, i) {
            return !(e[0] > i[0] || e[2] < i[2] || e[1] > i[1] || e[3] < i[3]);
          }
          function qr(e, i) {
            return e[0] === i[0] && e[1] === i[1];
          }
          function vo(e, i) {
            return [
              (e[0] + i[0]) / 2,
              (e[1] + i[1]) / 2
            ];
          }
          var ra = U, Lo = et(ci()), sa = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, Vt = Math.ceil, ve = Math.floor, xe = "[BigNumber Error] ", aa = xe + "Number primitive has more than 15 significant digits: ", qe = 1e14, mt = 14, tr = 9007199254740991, Vr = [
            1,
            10,
            100,
            1e3,
            1e4,
            1e5,
            1e6,
            1e7,
            1e8,
            1e9,
            1e10,
            1e11,
            1e12,
            1e13
          ], nn = 1e7, de = 1e9;
          function $o(e) {
            var i, r, s, u = k.prototype = {
              constructor: k,
              toString: null,
              valueOf: null
            }, c = new k(1), p = 20, f = 4, m = -7, y = 21, A = -1e7, C = 1e7, O = false, R = 1, H = 0, K = {
              prefix: "",
              groupSize: 3,
              secondaryGroupSize: 0,
              groupSeparator: ",",
              decimalSeparator: ".",
              fractionGroupSize: 0,
              fractionGroupSeparator: "\xA0",
              suffix: ""
            }, it = "0123456789abcdefghijklmnopqrstuvwxyz", st = true;
            function k(b, w) {
              var E, D, T, B, N, I, F, j, Z = this;
              if (!(Z instanceof k)) return new k(b, w);
              if (w == null) {
                if (b && b._isBigNumber === true) {
                  Z.s = b.s, !b.c || b.e > C ? Z.c = Z.e = null : b.e < A ? Z.c = [
                    Z.e = 0
                  ] : (Z.e = b.e, Z.c = b.c.slice());
                  return;
                }
                if ((I = typeof b == "number") && b * 0 == 0) {
                  if (Z.s = 1 / b < 0 ? (b = -b, -1) : 1, b === ~~b) {
                    for (B = 0, N = b; N >= 10; N /= 10, B++) ;
                    B > C ? Z.c = Z.e = null : (Z.e = B, Z.c = [
                      b
                    ]);
                    return;
                  }
                  j = String(b);
                } else {
                  if (!sa.test(j = String(b))) return s(Z, j, I);
                  Z.s = j.charCodeAt(0) == 45 ? (j = j.slice(1), -1) : 1;
                }
                (B = j.indexOf(".")) > -1 && (j = j.replace(".", "")), (N = j.search(/e/i)) > 0 ? (B < 0 && (B = N), B += +j.slice(N + 1), j = j.substring(0, N)) : B < 0 && (B = j.length);
              } else {
                if (Xt(w, 2, it.length, "Base"), w == 10 && st) return Z = new k(b), Q(Z, p + Z.e + 1, f);
                if (j = String(b), I = typeof b == "number") {
                  if (b * 0 != 0) return s(Z, j, I, w);
                  if (Z.s = 1 / b < 0 ? (j = j.slice(1), -1) : 1, k.DEBUG && j.replace(/^0\.0*|\./, "").length > 15) throw Error(aa + b);
                } else Z.s = j.charCodeAt(0) === 45 ? (j = j.slice(1), -1) : 1;
                for (E = it.slice(0, w), B = N = 0, F = j.length; N < F; N++) if (E.indexOf(D = j.charAt(N)) < 0) {
                  if (D == ".") {
                    if (N > B) {
                      B = F;
                      continue;
                    }
                  } else if (!T && (j == j.toUpperCase() && (j = j.toLowerCase()) || j == j.toLowerCase() && (j = j.toUpperCase()))) {
                    T = true, N = -1, B = 0;
                    continue;
                  }
                  return s(Z, String(b), I, w);
                }
                I = false, j = r(j, w, 10, Z.s), (B = j.indexOf(".")) > -1 ? j = j.replace(".", "") : B = j.length;
              }
              for (N = 0; j.charCodeAt(N) === 48; N++) ;
              for (F = j.length; j.charCodeAt(--F) === 48; ) ;
              if (j = j.slice(N, ++F)) {
                if (F -= N, I && k.DEBUG && F > 15 && (b > tr || b !== ve(b))) throw Error(aa + Z.s * b);
                if ((B = B - N - 1) > C) Z.c = Z.e = null;
                else if (B < A) Z.c = [
                  Z.e = 0
                ];
                else {
                  if (Z.e = B, Z.c = [], N = (B + 1) % mt, B < 0 && (N += mt), N < F) {
                    for (N && Z.c.push(+j.slice(0, N)), F -= mt; N < F; ) Z.c.push(+j.slice(N, N += mt));
                    N = mt - (j = j.slice(N)).length;
                  } else N -= F;
                  for (; N--; j += "0") ;
                  Z.c.push(+j);
                }
              } else Z.c = [
                Z.e = 0
              ];
            }
            k.clone = $o, k.ROUND_UP = 0, k.ROUND_DOWN = 1, k.ROUND_CEIL = 2, k.ROUND_FLOOR = 3, k.ROUND_HALF_UP = 4, k.ROUND_HALF_DOWN = 5, k.ROUND_HALF_EVEN = 6, k.ROUND_HALF_CEIL = 7, k.ROUND_HALF_FLOOR = 8, k.EUCLID = 9, k.config = k.set = function(b) {
              var w, E;
              if (b != null) if (typeof b == "object") {
                if (b.hasOwnProperty(w = "DECIMAL_PLACES") && (E = b[w], Xt(E, 0, de, w), p = E), b.hasOwnProperty(w = "ROUNDING_MODE") && (E = b[w], Xt(E, 0, 8, w), f = E), b.hasOwnProperty(w = "EXPONENTIAL_AT") && (E = b[w], E && E.pop ? (Xt(E[0], -de, 0, w), Xt(E[1], 0, de, w), m = E[0], y = E[1]) : (Xt(E, -de, de, w), m = -(y = E < 0 ? -E : E))), b.hasOwnProperty(w = "RANGE")) if (E = b[w], E && E.pop) Xt(E[0], -de, -1, w), Xt(E[1], 1, de, w), A = E[0], C = E[1];
                else if (Xt(E, -de, de, w), E) A = -(C = E < 0 ? -E : E);
                else throw Error(xe + w + " cannot be zero: " + E);
                if (b.hasOwnProperty(w = "CRYPTO")) if (E = b[w], E === !!E) if (E) if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes)) O = E;
                else throw O = !E, Error(xe + "crypto unavailable");
                else O = E;
                else throw Error(xe + w + " not true or false: " + E);
                if (b.hasOwnProperty(w = "MODULO_MODE") && (E = b[w], Xt(E, 0, 9, w), R = E), b.hasOwnProperty(w = "POW_PRECISION") && (E = b[w], Xt(E, 0, de, w), H = E), b.hasOwnProperty(w = "FORMAT")) if (E = b[w], typeof E == "object") K = E;
                else throw Error(xe + w + " not an object: " + E);
                if (b.hasOwnProperty(w = "ALPHABET")) if (E = b[w], typeof E == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(E)) st = E.slice(0, 10) == "0123456789", it = E;
                else throw Error(xe + w + " invalid: " + E);
              } else throw Error(xe + "Object expected: " + b);
              return {
                DECIMAL_PLACES: p,
                ROUNDING_MODE: f,
                EXPONENTIAL_AT: [
                  m,
                  y
                ],
                RANGE: [
                  A,
                  C
                ],
                CRYPTO: O,
                MODULO_MODE: R,
                POW_PRECISION: H,
                FORMAT: K,
                ALPHABET: it
              };
            }, k.isBigNumber = function(b) {
              if (!b || b._isBigNumber !== true) return false;
              if (!k.DEBUG) return true;
              var w, E, D = b.c, T = b.e, B = b.s;
              t: if ({}.toString.call(D) == "[object Array]") {
                if ((B === 1 || B === -1) && T >= -de && T <= de && T === ve(T)) {
                  if (D[0] === 0) {
                    if (T === 0 && D.length === 1) return true;
                    break t;
                  }
                  if (w = (T + 1) % mt, w < 1 && (w += mt), String(D[0]).length == w) {
                    for (w = 0; w < D.length; w++) if (E = D[w], E < 0 || E >= qe || E !== ve(E)) break t;
                    if (E !== 0) return true;
                  }
                }
              } else if (D === null && T === null && (B === null || B === 1 || B === -1)) return true;
              throw Error(xe + "Invalid BigNumber: " + b);
            }, k.maximum = k.max = function() {
              return V(arguments, -1);
            }, k.minimum = k.min = function() {
              return V(arguments, 1);
            }, k.random = (function() {
              var b = 9007199254740992, w = Math.random() * b & 2097151 ? function() {
                return ve(Math.random() * b);
              } : function() {
                return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0);
              };
              return function(E) {
                var D, T, B, N, I, F = 0, j = [], Z = new k(c);
                if (E == null ? E = p : Xt(E, 0, de), N = Vt(E / mt), O) if (crypto.getRandomValues) {
                  for (D = crypto.getRandomValues(new Uint32Array(N *= 2)); F < N; ) I = D[F] * 131072 + (D[F + 1] >>> 11), I >= 9e15 ? (T = crypto.getRandomValues(new Uint32Array(2)), D[F] = T[0], D[F + 1] = T[1]) : (j.push(I % 1e14), F += 2);
                  F = N / 2;
                } else if (crypto.randomBytes) {
                  for (D = crypto.randomBytes(N *= 7); F < N; ) I = (D[F] & 31) * 281474976710656 + D[F + 1] * 1099511627776 + D[F + 2] * 4294967296 + D[F + 3] * 16777216 + (D[F + 4] << 16) + (D[F + 5] << 8) + D[F + 6], I >= 9e15 ? crypto.randomBytes(7).copy(D, F) : (j.push(I % 1e14), F += 7);
                  F = N / 7;
                } else throw O = false, Error(xe + "crypto unavailable");
                if (!O) for (; F < N; ) I = w(), I < 9e15 && (j[F++] = I % 1e14);
                for (N = j[--F], E %= mt, N && E && (I = Vr[mt - E], j[F] = ve(N / I) * I); j[F] === 0; j.pop(), F--) ;
                if (F < 0) j = [
                  B = 0
                ];
                else {
                  for (B = -1; j[0] === 0; j.splice(0, 1), B -= mt) ;
                  for (F = 1, I = j[0]; I >= 10; I /= 10, F++) ;
                  F < mt && (B -= mt - F);
                }
                return Z.e = B, Z.c = j, Z;
              };
            })(), k.sum = function() {
              for (var b = 1, w = arguments, E = new k(w[0]); b < w.length; ) E = E.plus(w[b++]);
              return E;
            }, r = /* @__PURE__ */ (function() {
              var b = "0123456789";
              function w(E, D, T, B) {
                for (var N, I = [
                  0
                ], F, j = 0, Z = E.length; j < Z; ) {
                  for (F = I.length; F--; I[F] *= D) ;
                  for (I[0] += B.indexOf(E.charAt(j++)), N = 0; N < I.length; N++) I[N] > T - 1 && (I[N + 1] == null && (I[N + 1] = 0), I[N + 1] += I[N] / T | 0, I[N] %= T);
                }
                return I.reverse();
              }
              return function(E, D, T, B, N) {
                var I, F, j, Z, Y, ut, lt, Lt, $t = E.indexOf("."), oe = p, Dt = f;
                for ($t >= 0 && (Z = H, H = 0, E = E.replace(".", ""), Lt = new k(D), ut = Lt.pow(E.length - $t), H = Z, Lt.c = w(Ii(ei(ut.c), ut.e, "0"), 10, T, b), Lt.e = Lt.c.length), lt = w(E, D, T, N ? (I = it, b) : (I = b, it)), j = Z = lt.length; lt[--Z] == 0; lt.pop()) ;
                if (!lt[0]) return I.charAt(0);
                if ($t < 0 ? --j : (ut.c = lt, ut.e = j, ut.s = B, ut = i(ut, Lt, oe, Dt, T), lt = ut.c, Y = ut.r, j = ut.e), F = j + oe + 1, $t = lt[F], Z = T / 2, Y = Y || F < 0 || lt[F + 1] != null, Y = Dt < 4 ? ($t != null || Y) && (Dt == 0 || Dt == (ut.s < 0 ? 3 : 2)) : $t > Z || $t == Z && (Dt == 4 || Y || Dt == 6 && lt[F - 1] & 1 || Dt == (ut.s < 0 ? 8 : 7)), F < 1 || !lt[0]) E = Y ? Ii(I.charAt(1), -oe, I.charAt(0)) : I.charAt(0);
                else {
                  if (lt.length = F, Y) for (--T; ++lt[--F] > T; ) lt[F] = 0, F || (++j, lt = [
                    1
                  ].concat(lt));
                  for (Z = lt.length; !lt[--Z]; ) ;
                  for ($t = 0, E = ""; $t <= Z; E += I.charAt(lt[$t++])) ;
                  E = Ii(E, j, I.charAt(0));
                }
                return E;
              };
            })(), i = /* @__PURE__ */ (function() {
              function b(D, T, B) {
                var N, I, F, j, Z = 0, Y = D.length, ut = T % nn, lt = T / nn | 0;
                for (D = D.slice(); Y--; ) F = D[Y] % nn, j = D[Y] / nn | 0, N = lt * F + j * ut, I = ut * F + N % nn * nn + Z, Z = (I / B | 0) + (N / nn | 0) + lt * j, D[Y] = I % B;
                return Z && (D = [
                  Z
                ].concat(D)), D;
              }
              function w(D, T, B, N) {
                var I, F;
                if (B != N) F = B > N ? 1 : -1;
                else for (I = F = 0; I < B; I++) if (D[I] != T[I]) {
                  F = D[I] > T[I] ? 1 : -1;
                  break;
                }
                return F;
              }
              function E(D, T, B, N) {
                for (var I = 0; B--; ) D[B] -= I, I = D[B] < T[B] ? 1 : 0, D[B] = I * N + D[B] - T[B];
                for (; !D[0] && D.length > 1; D.splice(0, 1)) ;
              }
              return function(D, T, B, N, I) {
                var F, j, Z, Y, ut, lt, Lt, $t, oe, Dt, Ft, Ee, ga, Eo, Mo, Li, Yr, ii = D.s == T.s ? 1 : -1, Be = D.c, te = T.c;
                if (!Be || !Be[0] || !te || !te[0]) return new k(!D.s || !T.s || (Be ? te && Be[0] == te[0] : !te) ? NaN : Be && Be[0] == 0 || !te ? ii * 0 : ii / 0);
                for ($t = new k(ii), oe = $t.c = [], j = D.e - T.e, ii = B + j + 1, I || (I = qe, j = ti(D.e / mt) - ti(T.e / mt), ii = ii / mt | 0), Z = 0; te[Z] == (Be[Z] || 0); Z++) ;
                if (te[Z] > (Be[Z] || 0) && j--, ii < 0) oe.push(1), Y = true;
                else {
                  for (Eo = Be.length, Li = te.length, Z = 0, ii += 2, ut = ve(I / (te[0] + 1)), ut > 1 && (te = b(te, ut, I), Be = b(Be, ut, I), Li = te.length, Eo = Be.length), ga = Li, Dt = Be.slice(0, Li), Ft = Dt.length; Ft < Li; Dt[Ft++] = 0) ;
                  Yr = te.slice(), Yr = [
                    0
                  ].concat(Yr), Mo = te[0], te[1] >= I / 2 && Mo++;
                  do {
                    if (ut = 0, F = w(te, Dt, Li, Ft), F < 0) {
                      if (Ee = Dt[0], Li != Ft && (Ee = Ee * I + (Dt[1] || 0)), ut = ve(Ee / Mo), ut > 1) for (ut >= I && (ut = I - 1), lt = b(te, ut, I), Lt = lt.length, Ft = Dt.length; w(lt, Dt, Lt, Ft) == 1; ) ut--, E(lt, Li < Lt ? Yr : te, Lt, I), Lt = lt.length, F = 1;
                      else ut == 0 && (F = ut = 1), lt = te.slice(), Lt = lt.length;
                      if (Lt < Ft && (lt = [
                        0
                      ].concat(lt)), E(Dt, lt, Ft, I), Ft = Dt.length, F == -1) for (; w(te, Dt, Li, Ft) < 1; ) ut++, E(Dt, Li < Ft ? Yr : te, Ft, I), Ft = Dt.length;
                    } else F === 0 && (ut++, Dt = [
                      0
                    ]);
                    oe[Z++] = ut, Dt[0] ? Dt[Ft++] = Be[ga] || 0 : (Dt = [
                      Be[ga]
                    ], Ft = 1);
                  } while ((ga++ < Eo || Dt[0] != null) && ii--);
                  Y = Dt[0] != null, oe[0] || oe.splice(0, 1);
                }
                if (I == qe) {
                  for (Z = 1, ii = oe[0]; ii >= 10; ii /= 10, Z++) ;
                  Q($t, B + ($t.e = Z + j * mt - 1) + 1, N, Y);
                } else $t.e = j, $t.r = +Y;
                return $t;
              };
            })();
            function z(b, w, E, D) {
              var T, B, N, I, F;
              if (E == null ? E = f : Xt(E, 0, 8), !b.c) return b.toString();
              if (T = b.c[0], N = b.e, w == null) F = ei(b.c), F = D == 1 || D == 2 && (N <= m || N >= y) ? ua(F, N) : Ii(F, N, "0");
              else if (b = Q(new k(b), w, E), B = b.e, F = ei(b.c), I = F.length, D == 1 || D == 2 && (w <= B || B <= m)) {
                for (; I < w; F += "0", I++) ;
                F = ua(F, B);
              } else if (w -= N + (D === 2 && B > N), F = Ii(F, B, "0"), B + 1 > I) {
                if (--w > 0) for (F += "."; w--; F += "0") ;
              } else if (w += B - I, w > 0) for (B + 1 == I && (F += "."); w--; F += "0") ;
              return b.s < 0 && T ? "-" + F : F;
            }
            function V(b, w) {
              for (var E, D, T = 1, B = new k(b[0]); T < b.length; T++) D = new k(b[T]), (!D.s || (E = An(B, D)) === w || E === 0 && B.s === w) && (B = D);
              return B;
            }
            function tt(b, w, E) {
              for (var D = 1, T = w.length; !w[--T]; w.pop()) ;
              for (T = w[0]; T >= 10; T /= 10, D++) ;
              return (E = D + E * mt - 1) > C ? b.c = b.e = null : E < A ? b.c = [
                b.e = 0
              ] : (b.e = E, b.c = w), b;
            }
            s = /* @__PURE__ */ (function() {
              var b = /^(-?)0([xbo])(?=\w[\w.]*$)/i, w = /^([^.]+)\.$/, E = /^\.([^.]+)$/, D = /^-?(Infinity|NaN)$/, T = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
              return function(B, N, I, F) {
                var j, Z = I ? N : N.replace(T, "");
                if (D.test(Z)) B.s = isNaN(Z) ? null : Z < 0 ? -1 : 1;
                else {
                  if (!I && (Z = Z.replace(b, function(Y, ut, lt) {
                    return j = (lt = lt.toLowerCase()) == "x" ? 16 : lt == "b" ? 2 : 8, !F || F == j ? ut : Y;
                  }), F && (j = F, Z = Z.replace(w, "$1").replace(E, "0.$1")), N != Z)) return new k(Z, j);
                  if (k.DEBUG) throw Error(xe + "Not a" + (F ? " base " + F : "") + " number: " + N);
                  B.s = null;
                }
                B.c = B.e = null;
              };
            })();
            function Q(b, w, E, D) {
              var T, B, N, I, F, j, Z, Y = b.c, ut = Vr;
              if (Y) {
                t: {
                  for (T = 1, I = Y[0]; I >= 10; I /= 10, T++) ;
                  if (B = w - T, B < 0) B += mt, N = w, F = Y[j = 0], Z = ve(F / ut[T - N - 1] % 10);
                  else if (j = Vt((B + 1) / mt), j >= Y.length) if (D) {
                    for (; Y.length <= j; Y.push(0)) ;
                    F = Z = 0, T = 1, B %= mt, N = B - mt + 1;
                  } else break t;
                  else {
                    for (F = I = Y[j], T = 1; I >= 10; I /= 10, T++) ;
                    B %= mt, N = B - mt + T, Z = N < 0 ? 0 : ve(F / ut[T - N - 1] % 10);
                  }
                  if (D = D || w < 0 || Y[j + 1] != null || (N < 0 ? F : F % ut[T - N - 1]), D = E < 4 ? (Z || D) && (E == 0 || E == (b.s < 0 ? 3 : 2)) : Z > 5 || Z == 5 && (E == 4 || D || E == 6 && (B > 0 ? N > 0 ? F / ut[T - N] : 0 : Y[j - 1]) % 10 & 1 || E == (b.s < 0 ? 8 : 7)), w < 1 || !Y[0]) return Y.length = 0, D ? (w -= b.e + 1, Y[0] = ut[(mt - w % mt) % mt], b.e = -w || 0) : Y[0] = b.e = 0, b;
                  if (B == 0 ? (Y.length = j, I = 1, j--) : (Y.length = j + 1, I = ut[mt - B], Y[j] = N > 0 ? ve(F / ut[T - N] % ut[N]) * I : 0), D) for (; ; ) if (j == 0) {
                    for (B = 1, N = Y[0]; N >= 10; N /= 10, B++) ;
                    for (N = Y[0] += I, I = 1; N >= 10; N /= 10, I++) ;
                    B != I && (b.e++, Y[0] == qe && (Y[0] = 1));
                    break;
                  } else {
                    if (Y[j] += I, Y[j] != qe) break;
                    Y[j--] = 0, I = 1;
                  }
                  for (B = Y.length; Y[--B] === 0; Y.pop()) ;
                }
                b.e > C ? b.c = b.e = null : b.e < A && (b.c = [
                  b.e = 0
                ]);
              }
              return b;
            }
            function $(b) {
              var w, E = b.e;
              return E === null ? b.toString() : (w = ei(b.c), w = E <= m || E >= y ? ua(w, E) : Ii(w, E, "0"), b.s < 0 ? "-" + w : w);
            }
            return u.absoluteValue = u.abs = function() {
              var b = new k(this);
              return b.s < 0 && (b.s = 1), b;
            }, u.comparedTo = function(b, w) {
              return An(this, new k(b, w));
            }, u.decimalPlaces = u.dp = function(b, w) {
              var E, D, T, B = this;
              if (b != null) return Xt(b, 0, de), w == null ? w = f : Xt(w, 0, 8), Q(new k(B), b + B.e + 1, w);
              if (!(E = B.c)) return null;
              if (D = ((T = E.length - 1) - ti(this.e / mt)) * mt, T = E[T]) for (; T % 10 == 0; T /= 10, D--) ;
              return D < 0 && (D = 0), D;
            }, u.dividedBy = u.div = function(b, w) {
              return i(this, new k(b, w), p, f);
            }, u.dividedToIntegerBy = u.idiv = function(b, w) {
              return i(this, new k(b, w), 0, 1);
            }, u.exponentiatedBy = u.pow = function(b, w) {
              var E, D, T, B, N, I, F, j, Z, Y = this;
              if (b = new k(b), b.c && !b.isInteger()) throw Error(xe + "Exponent not an integer: " + $(b));
              if (w != null && (w = new k(w)), I = b.e > 14, !Y.c || !Y.c[0] || Y.c[0] == 1 && !Y.e && Y.c.length == 1 || !b.c || !b.c[0]) return Z = new k(Math.pow(+$(Y), I ? b.s * (2 - oa(b)) : +$(b))), w ? Z.mod(w) : Z;
              if (F = b.s < 0, w) {
                if (w.c ? !w.c[0] : !w.s) return new k(NaN);
                D = !F && Y.isInteger() && w.isInteger(), D && (Y = Y.mod(w));
              } else {
                if (b.e > 9 && (Y.e > 0 || Y.e < -1 || (Y.e == 0 ? Y.c[0] > 1 || I && Y.c[1] >= 24e7 : Y.c[0] < 8e13 || I && Y.c[0] <= 9999975e7))) return B = Y.s < 0 && oa(b) ? -0 : 0, Y.e > -1 && (B = 1 / B), new k(F ? 1 / B : B);
                H && (B = Vt(H / mt + 2));
              }
              for (I ? (E = new k(0.5), F && (b.s = 1), j = oa(b)) : (T = Math.abs(+$(b)), j = T % 2), Z = new k(c); ; ) {
                if (j) {
                  if (Z = Z.times(Y), !Z.c) break;
                  B ? Z.c.length > B && (Z.c.length = B) : D && (Z = Z.mod(w));
                }
                if (T) {
                  if (T = ve(T / 2), T === 0) break;
                  j = T % 2;
                } else if (b = b.times(E), Q(b, b.e + 1, 1), b.e > 14) j = oa(b);
                else {
                  if (T = +$(b), T === 0) break;
                  j = T % 2;
                }
                Y = Y.times(Y), B ? Y.c && Y.c.length > B && (Y.c.length = B) : D && (Y = Y.mod(w));
              }
              return D ? Z : (F && (Z = c.div(Z)), w ? Z.mod(w) : B ? Q(Z, H, f, N) : Z);
            }, u.integerValue = function(b) {
              var w = new k(this);
              return b == null ? b = f : Xt(b, 0, 8), Q(w, w.e + 1, b);
            }, u.isEqualTo = u.eq = function(b, w) {
              return An(this, new k(b, w)) === 0;
            }, u.isFinite = function() {
              return !!this.c;
            }, u.isGreaterThan = u.gt = function(b, w) {
              return An(this, new k(b, w)) > 0;
            }, u.isGreaterThanOrEqualTo = u.gte = function(b, w) {
              return (w = An(this, new k(b, w))) === 1 || w === 0;
            }, u.isInteger = function() {
              return !!this.c && ti(this.e / mt) > this.c.length - 2;
            }, u.isLessThan = u.lt = function(b, w) {
              return An(this, new k(b, w)) < 0;
            }, u.isLessThanOrEqualTo = u.lte = function(b, w) {
              return (w = An(this, new k(b, w))) === -1 || w === 0;
            }, u.isNaN = function() {
              return !this.s;
            }, u.isNegative = function() {
              return this.s < 0;
            }, u.isPositive = function() {
              return this.s > 0;
            }, u.isZero = function() {
              return !!this.c && this.c[0] == 0;
            }, u.minus = function(b, w) {
              var E, D, T, B, N = this, I = N.s;
              if (b = new k(b, w), w = b.s, !I || !w) return new k(NaN);
              if (I != w) return b.s = -w, N.plus(b);
              var F = N.e / mt, j = b.e / mt, Z = N.c, Y = b.c;
              if (!F || !j) {
                if (!Z || !Y) return Z ? (b.s = -w, b) : new k(Y ? N : NaN);
                if (!Z[0] || !Y[0]) return Y[0] ? (b.s = -w, b) : new k(Z[0] ? N : f == 3 ? -0 : 0);
              }
              if (F = ti(F), j = ti(j), Z = Z.slice(), I = F - j) {
                for ((B = I < 0) ? (I = -I, T = Z) : (j = F, T = Y), T.reverse(), w = I; w--; T.push(0)) ;
                T.reverse();
              } else for (D = (B = (I = Z.length) < (w = Y.length)) ? I : w, I = w = 0; w < D; w++) if (Z[w] != Y[w]) {
                B = Z[w] < Y[w];
                break;
              }
              if (B && (T = Z, Z = Y, Y = T, b.s = -b.s), w = (D = Y.length) - (E = Z.length), w > 0) for (; w--; Z[E++] = 0) ;
              for (w = qe - 1; D > I; ) {
                if (Z[--D] < Y[D]) {
                  for (E = D; E && !Z[--E]; Z[E] = w) ;
                  --Z[E], Z[D] += qe;
                }
                Z[D] -= Y[D];
              }
              for (; Z[0] == 0; Z.splice(0, 1), --j) ;
              return Z[0] ? tt(b, Z, j) : (b.s = f == 3 ? -1 : 1, b.c = [
                b.e = 0
              ], b);
            }, u.modulo = u.mod = function(b, w) {
              var E, D, T = this;
              return b = new k(b, w), !T.c || !b.s || b.c && !b.c[0] ? new k(NaN) : !b.c || T.c && !T.c[0] ? new k(T) : (R == 9 ? (D = b.s, b.s = 1, E = i(T, b, 0, 3), b.s = D, E.s *= D) : E = i(T, b, 0, R), b = T.minus(E.times(b)), !b.c[0] && R == 1 && (b.s = T.s), b);
            }, u.multipliedBy = u.times = function(b, w) {
              var E, D, T, B, N, I, F, j, Z, Y, ut, lt, Lt, $t, oe, Dt = this, Ft = Dt.c, Ee = (b = new k(b, w)).c;
              if (!Ft || !Ee || !Ft[0] || !Ee[0]) return !Dt.s || !b.s || Ft && !Ft[0] && !Ee || Ee && !Ee[0] && !Ft ? b.c = b.e = b.s = null : (b.s *= Dt.s, !Ft || !Ee ? b.c = b.e = null : (b.c = [
                0
              ], b.e = 0)), b;
              for (D = ti(Dt.e / mt) + ti(b.e / mt), b.s *= Dt.s, F = Ft.length, Y = Ee.length, F < Y && (Lt = Ft, Ft = Ee, Ee = Lt, T = F, F = Y, Y = T), T = F + Y, Lt = []; T--; Lt.push(0)) ;
              for ($t = qe, oe = nn, T = Y; --T >= 0; ) {
                for (E = 0, ut = Ee[T] % oe, lt = Ee[T] / oe | 0, N = F, B = T + N; B > T; ) j = Ft[--N] % oe, Z = Ft[N] / oe | 0, I = lt * j + Z * ut, j = ut * j + I % oe * oe + Lt[B] + E, E = (j / $t | 0) + (I / oe | 0) + lt * Z, Lt[B--] = j % $t;
                Lt[B] = E;
              }
              return E ? ++D : Lt.splice(0, 1), tt(b, Lt, D);
            }, u.negated = function() {
              var b = new k(this);
              return b.s = -b.s || null, b;
            }, u.plus = function(b, w) {
              var E, D = this, T = D.s;
              if (b = new k(b, w), w = b.s, !T || !w) return new k(NaN);
              if (T != w) return b.s = -w, D.minus(b);
              var B = D.e / mt, N = b.e / mt, I = D.c, F = b.c;
              if (!B || !N) {
                if (!I || !F) return new k(T / 0);
                if (!I[0] || !F[0]) return F[0] ? b : new k(I[0] ? D : T * 0);
              }
              if (B = ti(B), N = ti(N), I = I.slice(), T = B - N) {
                for (T > 0 ? (N = B, E = F) : (T = -T, E = I), E.reverse(); T--; E.push(0)) ;
                E.reverse();
              }
              for (T = I.length, w = F.length, T - w < 0 && (E = F, F = I, I = E, w = T), T = 0; w; ) T = (I[--w] = I[w] + F[w] + T) / qe | 0, I[w] = qe === I[w] ? 0 : I[w] % qe;
              return T && (I = [
                T
              ].concat(I), ++N), tt(b, I, N);
            }, u.precision = u.sd = function(b, w) {
              var E, D, T, B = this;
              if (b != null && b !== !!b) return Xt(b, 1, de), w == null ? w = f : Xt(w, 0, 8), Q(new k(B), b, w);
              if (!(E = B.c)) return null;
              if (T = E.length - 1, D = T * mt + 1, T = E[T]) {
                for (; T % 10 == 0; T /= 10, D--) ;
                for (T = E[0]; T >= 10; T /= 10, D++) ;
              }
              return b && B.e + 1 > D && (D = B.e + 1), D;
            }, u.shiftedBy = function(b) {
              return Xt(b, -tr, tr), this.times("1e" + b);
            }, u.squareRoot = u.sqrt = function() {
              var b, w, E, D, T, B = this, N = B.c, I = B.s, F = B.e, j = p + 4, Z = new k("0.5");
              if (I !== 1 || !N || !N[0]) return new k(!I || I < 0 && (!N || N[0]) ? NaN : N ? B : 1 / 0);
              if (I = Math.sqrt(+$(B)), I == 0 || I == 1 / 0 ? (w = ei(N), (w.length + F) % 2 == 0 && (w += "0"), I = Math.sqrt(+w), F = ti((F + 1) / 2) - (F < 0 || F % 2), I == 1 / 0 ? w = "5e" + F : (w = I.toExponential(), w = w.slice(0, w.indexOf("e") + 1) + F), E = new k(w)) : E = new k(I + ""), E.c[0]) {
                for (F = E.e, I = F + j, I < 3 && (I = 0); ; ) if (T = E, E = Z.times(T.plus(i(B, T, j, 1))), ei(T.c).slice(0, I) === (w = ei(E.c)).slice(0, I)) if (E.e < F && --I, w = w.slice(I - 3, I + 1), w == "9999" || !D && w == "4999") {
                  if (!D && (Q(T, T.e + p + 2, 0), T.times(T).eq(B))) {
                    E = T;
                    break;
                  }
                  j += 4, I += 4, D = 1;
                } else {
                  (!+w || !+w.slice(1) && w.charAt(0) == "5") && (Q(E, E.e + p + 2, 1), b = !E.times(E).eq(B));
                  break;
                }
              }
              return Q(E, E.e + p + 1, f, b);
            }, u.toExponential = function(b, w) {
              return b != null && (Xt(b, 0, de), b++), z(this, b, w, 1);
            }, u.toFixed = function(b, w) {
              return b != null && (Xt(b, 0, de), b = b + this.e + 1), z(this, b, w);
            }, u.toFormat = function(b, w, E) {
              var D, T = this;
              if (E == null) b != null && w && typeof w == "object" ? (E = w, w = null) : b && typeof b == "object" ? (E = b, b = w = null) : E = K;
              else if (typeof E != "object") throw Error(xe + "Argument not an object: " + E);
              if (D = T.toFixed(b, w), T.c) {
                var B, N = D.split("."), I = +E.groupSize, F = +E.secondaryGroupSize, j = E.groupSeparator || "", Z = N[0], Y = N[1], ut = T.s < 0, lt = ut ? Z.slice(1) : Z, Lt = lt.length;
                if (F && (B = I, I = F, F = B, Lt -= B), I > 0 && Lt > 0) {
                  for (B = Lt % I || I, Z = lt.substr(0, B); B < Lt; B += I) Z += j + lt.substr(B, I);
                  F > 0 && (Z += j + lt.slice(B)), ut && (Z = "-" + Z);
                }
                D = Y ? Z + (E.decimalSeparator || "") + ((F = +E.fractionGroupSize) ? Y.replace(new RegExp("\\d{" + F + "}\\B", "g"), "$&" + (E.fractionGroupSeparator || "")) : Y) : Z;
              }
              return (E.prefix || "") + D + (E.suffix || "");
            }, u.toFraction = function(b) {
              var w, E, D, T, B, N, I, F, j, Z, Y, ut, lt = this, Lt = lt.c;
              if (b != null && (I = new k(b), !I.isInteger() && (I.c || I.s !== 1) || I.lt(c))) throw Error(xe + "Argument " + (I.isInteger() ? "out of range: " : "not an integer: ") + $(I));
              if (!Lt) return new k(lt);
              for (w = new k(c), j = E = new k(c), D = F = new k(c), ut = ei(Lt), B = w.e = ut.length - lt.e - 1, w.c[0] = Vr[(N = B % mt) < 0 ? mt + N : N], b = !b || I.comparedTo(w) > 0 ? B > 0 ? w : j : I, N = C, C = 1 / 0, I = new k(ut), F.c[0] = 0; Z = i(I, w, 0, 1), T = E.plus(Z.times(D)), T.comparedTo(b) != 1; ) E = D, D = T, j = F.plus(Z.times(T = j)), F = T, w = I.minus(Z.times(T = w)), I = T;
              return T = i(b.minus(E), D, 0, 1), F = F.plus(T.times(j)), E = E.plus(T.times(D)), F.s = j.s = lt.s, B = B * 2, Y = i(j, D, B, f).minus(lt).abs().comparedTo(i(F, E, B, f).minus(lt).abs()) < 1 ? [
                j,
                D
              ] : [
                F,
                E
              ], C = N, Y;
            }, u.toNumber = function() {
              return +$(this);
            }, u.toPrecision = function(b, w) {
              return b != null && Xt(b, 1, de), z(this, b, w, 2);
            }, u.toString = function(b) {
              var w, E = this, D = E.s, T = E.e;
              return T === null ? D ? (w = "Infinity", D < 0 && (w = "-" + w)) : w = "NaN" : (b == null ? w = T <= m || T >= y ? ua(ei(E.c), T) : Ii(ei(E.c), T, "0") : b === 10 && st ? (E = Q(new k(E), p + T + 1, f), w = Ii(ei(E.c), E.e, "0")) : (Xt(b, 2, it.length, "Base"), w = r(Ii(ei(E.c), T, "0"), 10, b, D, true)), D < 0 && E.c[0] && (w = "-" + w)), w;
            }, u.valueOf = u.toJSON = function() {
              return $(this);
            }, u._isBigNumber = true, u[Symbol.toStringTag] = "BigNumber", u[Symbol.for("nodejs.util.inspect.custom")] = u.valueOf, e != null && k.set(e), k;
          }
          function ti(e) {
            var i = e | 0;
            return e > 0 || e === i ? i : i - 1;
          }
          function ei(e) {
            for (var i, r, s = 1, u = e.length, c = e[0] + ""; s < u; ) {
              for (i = e[s++] + "", r = mt - i.length; r--; i = "0" + i) ;
              c += i;
            }
            for (u = c.length; c.charCodeAt(--u) === 48; ) ;
            return c.slice(0, u + 1 || 1);
          }
          function An(e, i) {
            var r, s, u = e.c, c = i.c, p = e.s, f = i.s, m = e.e, y = i.e;
            if (!p || !f) return null;
            if (r = u && !u[0], s = c && !c[0], r || s) return r ? s ? 0 : -f : p;
            if (p != f) return p;
            if (r = p < 0, s = m == y, !u || !c) return s ? 0 : !u ^ r ? 1 : -1;
            if (!s) return m > y ^ r ? 1 : -1;
            for (f = (m = u.length) < (y = c.length) ? m : y, p = 0; p < f; p++) if (u[p] != c[p]) return u[p] > c[p] ^ r ? 1 : -1;
            return m == y ? 0 : m > y ^ r ? 1 : -1;
          }
          function Xt(e, i, r, s) {
            if (e < i || e > r || e !== ve(e)) throw Error(xe + (s || "Argument") + (typeof e == "number" ? e < i || e > r ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(e));
          }
          function oa(e) {
            var i = e.c.length - 1;
            return ti(e.e / mt) == i && e.c[i] % 2 != 0;
          }
          function ua(e, i) {
            return (e.length > 1 ? e.charAt(0) + "." + e.slice(1) : e) + (i < 0 ? "e" : "e+") + i;
          }
          function Ii(e, i, r) {
            var s, u;
            if (i < 0) {
              for (u = r + "."; ++i; u += r) ;
              e = u + e;
            } else if (s = e.length, ++i > s) {
              for (u = r, i -= s; --i; u += r) ;
              e += u;
            } else i < s && (e = e.slice(0, i) + "." + e.slice(i));
            return e;
          }
          var qu = $o(), yi = qu, Vu = class {
            constructor(e) {
              __publicField(this, "key");
              __publicField(this, "left", null);
              __publicField(this, "right", null);
              this.key = e;
            }
          }, Hr = class extends Vu {
            constructor(e) {
              super(e);
            }
          }, Hu = class {
            constructor() {
              __publicField(this, "size", 0);
              __publicField(this, "modificationCount", 0);
              __publicField(this, "splayCount", 0);
            }
            splay(e) {
              let i = this.root;
              if (i == null) return this.compare(e, e), -1;
              let r = null, s = null, u = null, c = null, p = i, f = this.compare, m;
              for (; ; ) if (m = f(p.key, e), m > 0) {
                let y = p.left;
                if (y == null || (m = f(y.key, e), m > 0 && (p.left = y.right, y.right = p, p = y, y = p.left, y == null))) break;
                r == null ? s = p : r.left = p, r = p, p = y;
              } else if (m < 0) {
                let y = p.right;
                if (y == null || (m = f(y.key, e), m < 0 && (p.right = y.left, y.left = p, p = y, y = p.right, y == null))) break;
                u == null ? c = p : u.right = p, u = p, p = y;
              } else break;
              return u != null && (u.right = p.left, p.left = c), r != null && (r.left = p.right, p.right = s), this.root !== p && (this.root = p, this.splayCount++), m;
            }
            splayMin(e) {
              let i = e, r = i.left;
              for (; r != null; ) {
                let s = r;
                i.left = s.right, s.right = i, i = s, r = i.left;
              }
              return i;
            }
            splayMax(e) {
              let i = e, r = i.right;
              for (; r != null; ) {
                let s = r;
                i.right = s.left, s.left = i, i = s, r = i.right;
              }
              return i;
            }
            _delete(e) {
              if (this.root == null || this.splay(e) != 0) return null;
              let i = this.root, r = i, s = i.left;
              if (this.size--, s == null) this.root = i.right;
              else {
                let u = i.right;
                i = this.splayMax(s), i.right = u, this.root = i;
              }
              return this.modificationCount++, r;
            }
            addNewRoot(e, i) {
              this.size++, this.modificationCount++;
              let r = this.root;
              if (r == null) {
                this.root = e;
                return;
              }
              i < 0 ? (e.left = r, e.right = r.right, r.right = null) : (e.right = r, e.left = r.left, r.left = null), this.root = e;
            }
            _first() {
              let e = this.root;
              return e == null ? null : (this.root = this.splayMin(e), this.root);
            }
            _last() {
              let e = this.root;
              return e == null ? null : (this.root = this.splayMax(e), this.root);
            }
            clear() {
              this.root = null, this.size = 0, this.modificationCount++;
            }
            has(e) {
              return this.validKey(e) && this.splay(e) == 0;
            }
            defaultCompare() {
              return (e, i) => e < i ? -1 : e > i ? 1 : 0;
            }
            wrap() {
              return {
                getRoot: () => this.root,
                setRoot: (e) => {
                  this.root = e;
                },
                getSize: () => this.size,
                getModificationCount: () => this.modificationCount,
                getSplayCount: () => this.splayCount,
                setSplayCount: (e) => {
                  this.splayCount = e;
                },
                splay: (e) => this.splay(e),
                has: (e) => this.has(e)
              };
            }
          }, la = class $r extends Hu {
            constructor(i, r) {
              super();
              __publicField(this, "root", null);
              __publicField(this, "compare");
              __publicField(this, "validKey");
              __publicField(this, _a2, "[object Set]");
              this.compare = i ?? this.defaultCompare(), this.validKey = r ?? ((s) => s != null && s != null);
            }
            delete(i) {
              return this.validKey(i) ? this._delete(i) != null : false;
            }
            deleteAll(i) {
              for (let r of i) this.delete(r);
            }
            forEach(i) {
              let r = this[Symbol.iterator](), s;
              for (; s = r.next(), !s.done; ) i(s.value, s.value, this);
            }
            add(i) {
              let r = this.splay(i);
              return r != 0 && this.addNewRoot(new Hr(i), r), this;
            }
            addAndReturn(i) {
              let r = this.splay(i);
              return r != 0 && this.addNewRoot(new Hr(i), r), this.root.key;
            }
            addAll(i) {
              for (let r of i) this.add(r);
            }
            isEmpty() {
              return this.root == null;
            }
            isNotEmpty() {
              return this.root != null;
            }
            single() {
              if (this.size == 0) throw "Bad state: No element";
              if (this.size > 1) throw "Bad state: Too many element";
              return this.root.key;
            }
            first() {
              if (this.size == 0) throw "Bad state: No element";
              return this._first().key;
            }
            last() {
              if (this.size == 0) throw "Bad state: No element";
              return this._last().key;
            }
            lastBefore(i) {
              if (i == null) throw "Invalid arguments(s)";
              if (this.root == null) return null;
              if (this.splay(i) < 0) return this.root.key;
              let r = this.root.left;
              if (r == null) return null;
              let s = r.right;
              for (; s != null; ) r = s, s = r.right;
              return r.key;
            }
            firstAfter(i) {
              if (i == null) throw "Invalid arguments(s)";
              if (this.root == null) return null;
              if (this.splay(i) > 0) return this.root.key;
              let r = this.root.right;
              if (r == null) return null;
              let s = r.left;
              for (; s != null; ) r = s, s = r.left;
              return r.key;
            }
            retainAll(i) {
              let r = new $r(this.compare, this.validKey), s = this.modificationCount;
              for (let u of i) {
                if (s != this.modificationCount) throw "Concurrent modification during iteration.";
                this.validKey(u) && this.splay(u) == 0 && r.add(this.root.key);
              }
              r.size != this.size && (this.root = r.root, this.size = r.size, this.modificationCount++);
            }
            lookup(i) {
              return !this.validKey(i) || this.splay(i) != 0 ? null : this.root.key;
            }
            intersection(i) {
              let r = new $r(this.compare, this.validKey);
              for (let s of this) i.has(s) && r.add(s);
              return r;
            }
            difference(i) {
              let r = new $r(this.compare, this.validKey);
              for (let s of this) i.has(s) || r.add(s);
              return r;
            }
            union(i) {
              let r = this.clone();
              return r.addAll(i), r;
            }
            clone() {
              let i = new $r(this.compare, this.validKey);
              return i.size = this.size, i.root = this.copyNode(this.root), i;
            }
            copyNode(i) {
              if (i == null) return null;
              function r(u, c) {
                let p, f;
                do {
                  if (p = u.left, f = u.right, p != null) {
                    let m = new Hr(p.key);
                    c.left = m, r(p, m);
                  }
                  if (f != null) {
                    let m = new Hr(f.key);
                    c.right = m, u = f, c = m;
                  }
                } while (f != null);
              }
              let s = new Hr(i.key);
              return r(i, s), s;
            }
            toSet() {
              return this.clone();
            }
            entries() {
              return new Ku(this.wrap());
            }
            keys() {
              return this[Symbol.iterator]();
            }
            values() {
              return this[Symbol.iterator]();
            }
            [(_b = Symbol.iterator, _a2 = Symbol.toStringTag, _b)]() {
              return new Wu(this.wrap());
            }
          }, tu = class {
            constructor(e) {
              __publicField(this, "tree");
              __publicField(this, "path", new Array());
              __publicField(this, "modificationCount", null);
              __publicField(this, "splayCount");
              this.tree = e, this.splayCount = e.getSplayCount();
            }
            [Symbol.iterator]() {
              return this;
            }
            next() {
              return this.moveNext() ? {
                done: false,
                value: this.current()
              } : {
                done: true,
                value: null
              };
            }
            current() {
              if (!this.path.length) return null;
              let e = this.path[this.path.length - 1];
              return this.getValue(e);
            }
            rebuildPath(e) {
              this.path.splice(0, this.path.length), this.tree.splay(e), this.path.push(this.tree.getRoot()), this.splayCount = this.tree.getSplayCount();
            }
            findLeftMostDescendent(e) {
              for (; e != null; ) this.path.push(e), e = e.left;
            }
            moveNext() {
              if (this.modificationCount != this.tree.getModificationCount()) {
                if (this.modificationCount == null) {
                  this.modificationCount = this.tree.getModificationCount();
                  let r = this.tree.getRoot();
                  for (; r != null; ) this.path.push(r), r = r.left;
                  return this.path.length > 0;
                }
                throw "Concurrent modification during iteration.";
              }
              if (!this.path.length) return false;
              this.splayCount != this.tree.getSplayCount() && this.rebuildPath(this.path[this.path.length - 1].key);
              let e = this.path[this.path.length - 1], i = e.right;
              if (i != null) {
                for (; i != null; ) this.path.push(i), i = i.left;
                return true;
              }
              for (this.path.pop(); this.path.length && this.path[this.path.length - 1].right === e; ) e = this.path.pop();
              return this.path.length > 0;
            }
          }, Wu = class extends tu {
            getValue(e) {
              return e.key;
            }
          }, Ku = class extends tu {
            getValue(e) {
              return [
                e.key,
                e.key
              ];
            }
          }, eu = (e) => () => e, bo = (e) => {
            let i = e ? (r, s) => s.minus(r).abs().isLessThanOrEqualTo(e) : eu(false);
            return (r, s) => i(r, s) ? 0 : r.comparedTo(s);
          };
          function Yu(e) {
            let i = e ? (r, s, u, c, p) => r.exponentiatedBy(2).isLessThanOrEqualTo(c.minus(s).exponentiatedBy(2).plus(p.minus(u).exponentiatedBy(2)).times(e)) : eu(false);
            return (r, s, u) => {
              let c = r.x, p = r.y, f = u.x, m = u.y, y = p.minus(m).times(s.x.minus(f)).minus(c.minus(f).times(s.y.minus(m)));
              return i(y, c, p, f, m) ? 0 : y.comparedTo(0);
            };
          }
          var Xu = (e) => e, Ju = (e) => {
            if (e) {
              let i = new la(bo(e)), r = new la(bo(e)), s = (c, p) => p.addAndReturn(c), u = (c) => ({
                x: s(c.x, i),
                y: s(c.y, r)
              });
              return u({
                x: new yi(0),
                y: new yi(0)
              }), u;
            }
            return Xu;
          }, wo = (e) => ({
            set: (i) => {
              Oi = wo(i);
            },
            reset: () => wo(e),
            compare: bo(e),
            snap: Ju(e),
            orient: Yu(e)
          }), Oi = wo(), Wr = (e, i) => e.ll.x.isLessThanOrEqualTo(i.x) && i.x.isLessThanOrEqualTo(e.ur.x) && e.ll.y.isLessThanOrEqualTo(i.y) && i.y.isLessThanOrEqualTo(e.ur.y), Co = (e, i) => {
            if (i.ur.x.isLessThan(e.ll.x) || e.ur.x.isLessThan(i.ll.x) || i.ur.y.isLessThan(e.ll.y) || e.ur.y.isLessThan(i.ll.y)) return null;
            let r = e.ll.x.isLessThan(i.ll.x) ? i.ll.x : e.ll.x, s = e.ur.x.isLessThan(i.ur.x) ? e.ur.x : i.ur.x, u = e.ll.y.isLessThan(i.ll.y) ? i.ll.y : e.ll.y, c = e.ur.y.isLessThan(i.ur.y) ? e.ur.y : i.ur.y;
            return {
              ll: {
                x: r,
                y: u
              },
              ur: {
                x: s,
                y: c
              }
            };
          }, ha = (e, i) => e.x.times(i.y).minus(e.y.times(i.x)), iu = (e, i) => e.x.times(i.x).plus(e.y.times(i.y)), ca = (e) => iu(e, e).sqrt(), Qu = (e, i, r) => {
            let s = {
              x: i.x.minus(e.x),
              y: i.y.minus(e.y)
            }, u = {
              x: r.x.minus(e.x),
              y: r.y.minus(e.y)
            };
            return ha(u, s).div(ca(u)).div(ca(s));
          }, $u = (e, i, r) => {
            let s = {
              x: i.x.minus(e.x),
              y: i.y.minus(e.y)
            }, u = {
              x: r.x.minus(e.x),
              y: r.y.minus(e.y)
            };
            return iu(u, s).div(ca(u)).div(ca(s));
          }, nu = (e, i, r) => i.y.isZero() ? null : {
            x: e.x.plus(i.x.div(i.y).times(r.minus(e.y))),
            y: r
          }, ru = (e, i, r) => i.x.isZero() ? null : {
            x: r,
            y: e.y.plus(i.y.div(i.x).times(r.minus(e.x)))
          }, tl = (e, i, r, s) => {
            if (i.x.isZero()) return ru(r, s, e.x);
            if (s.x.isZero()) return ru(e, i, r.x);
            if (i.y.isZero()) return nu(r, s, e.y);
            if (s.y.isZero()) return nu(e, i, r.y);
            let u = ha(i, s);
            if (u.isZero()) return null;
            let c = {
              x: r.x.minus(e.x),
              y: r.y.minus(e.y)
            }, p = ha(c, i).div(u), f = ha(c, s).div(u), m = e.x.plus(f.times(i.x)), y = r.x.plus(p.times(s.x)), A = e.y.plus(f.times(i.y)), C = r.y.plus(p.times(s.y)), O = m.plus(y).div(2), R = A.plus(C).div(2);
            return {
              x: O,
              y: R
            };
          }, vi = class Bu {
            constructor(i, r) {
              __publicField(this, "point");
              __publicField(this, "isLeft");
              __publicField(this, "segment");
              __publicField(this, "otherSE");
              __publicField(this, "consumedBy");
              i.events === void 0 ? i.events = [
                this
              ] : i.events.push(this), this.point = i, this.isLeft = r;
            }
            static compare(i, r) {
              let s = Bu.comparePoints(i.point, r.point);
              return s !== 0 ? s : (i.point !== r.point && i.link(r), i.isLeft !== r.isLeft ? i.isLeft ? 1 : -1 : pa.compare(i.segment, r.segment));
            }
            static comparePoints(i, r) {
              return i.x.isLessThan(r.x) ? -1 : i.x.isGreaterThan(r.x) ? 1 : i.y.isLessThan(r.y) ? -1 : i.y.isGreaterThan(r.y) ? 1 : 0;
            }
            link(i) {
              if (i.point === this.point) throw new Error("Tried to link already linked events");
              let r = i.point.events;
              for (let s = 0, u = r.length; s < u; s++) {
                let c = r[s];
                this.point.events.push(c), c.point = this.point;
              }
              this.checkForConsuming();
            }
            checkForConsuming() {
              let i = this.point.events.length;
              for (let r = 0; r < i; r++) {
                let s = this.point.events[r];
                if (s.segment.consumedBy === void 0) for (let u = r + 1; u < i; u++) {
                  let c = this.point.events[u];
                  c.consumedBy === void 0 && s.otherSE.point.events === c.otherSE.point.events && s.segment.consume(c.segment);
                }
              }
            }
            getAvailableLinkedEvents() {
              let i = [];
              for (let r = 0, s = this.point.events.length; r < s; r++) {
                let u = this.point.events[r];
                u !== this && !u.segment.ringOut && u.segment.isInResult() && i.push(u);
              }
              return i;
            }
            getLeftmostComparator(i) {
              let r = /* @__PURE__ */ new Map(), s = (u) => {
                let c = u.otherSE;
                r.set(u, {
                  sine: Qu(this.point, i.point, c.point),
                  cosine: $u(this.point, i.point, c.point)
                });
              };
              return (u, c) => {
                r.has(u) || s(u), r.has(c) || s(c);
                let { sine: p, cosine: f } = r.get(u), { sine: m, cosine: y } = r.get(c);
                return p.isGreaterThanOrEqualTo(0) && m.isGreaterThanOrEqualTo(0) ? f.isLessThan(y) ? 1 : f.isGreaterThan(y) ? -1 : 0 : p.isLessThan(0) && m.isLessThan(0) ? f.isLessThan(y) ? -1 : f.isGreaterThan(y) ? 1 : 0 : m.isLessThan(p) ? -1 : m.isGreaterThan(p) ? 1 : 0;
              };
            }
          }, el = class Io {
            constructor(i) {
              __publicField(this, "events");
              __publicField(this, "poly");
              __publicField(this, "_isExteriorRing");
              __publicField(this, "_enclosingRing");
              this.events = i;
              for (let r = 0, s = i.length; r < s; r++) i[r].segment.ringOut = this;
              this.poly = null;
            }
            static factory(i) {
              let r = [];
              for (let s = 0, u = i.length; s < u; s++) {
                let c = i[s];
                if (!c.isInResult() || c.ringOut) continue;
                let p = null, f = c.leftSE, m = c.rightSE, y = [
                  f
                ], A = f.point, C = [];
                for (; p = f, f = m, y.push(f), f.point !== A; ) for (; ; ) {
                  let O = f.getAvailableLinkedEvents();
                  if (O.length === 0) {
                    let K = y[0].point, it = y[y.length - 1].point;
                    throw new Error(`Unable to complete output ring starting at [${K.x}, ${K.y}]. Last matching segment found ends at [${it.x}, ${it.y}].`);
                  }
                  if (O.length === 1) {
                    m = O[0].otherSE;
                    break;
                  }
                  let R = null;
                  for (let K = 0, it = C.length; K < it; K++) if (C[K].point === f.point) {
                    R = K;
                    break;
                  }
                  if (R !== null) {
                    let K = C.splice(R)[0], it = y.splice(K.index);
                    it.unshift(it[0].otherSE), r.push(new Io(it.reverse()));
                    continue;
                  }
                  C.push({
                    index: y.length,
                    point: f.point
                  });
                  let H = f.getLeftmostComparator(p);
                  m = O.sort(H)[0].otherSE;
                  break;
                }
                r.push(new Io(y));
              }
              return r;
            }
            getGeom() {
              let i = this.events[0].point, r = [
                i
              ];
              for (let y = 1, A = this.events.length - 1; y < A; y++) {
                let C = this.events[y].point, O = this.events[y + 1].point;
                Oi.orient(C, i, O) !== 0 && (r.push(C), i = C);
              }
              if (r.length === 1) return null;
              let s = r[0], u = r[1];
              Oi.orient(s, i, u) === 0 && r.shift(), r.push(r[0]);
              let c = this.isExteriorRing() ? 1 : -1, p = this.isExteriorRing() ? 0 : r.length - 1, f = this.isExteriorRing() ? r.length : -1, m = [];
              for (let y = p; y != f; y += c) m.push([
                r[y].x.toNumber(),
                r[y].y.toNumber()
              ]);
              return m;
            }
            isExteriorRing() {
              if (this._isExteriorRing === void 0) {
                let i = this.enclosingRing();
                this._isExteriorRing = i ? !i.isExteriorRing() : true;
              }
              return this._isExteriorRing;
            }
            enclosingRing() {
              return this._enclosingRing === void 0 && (this._enclosingRing = this._calcEnclosingRing()), this._enclosingRing;
            }
            _calcEnclosingRing() {
              var _a3, _b2;
              let i = this.events[0];
              for (let u = 1, c = this.events.length; u < c; u++) {
                let p = this.events[u];
                vi.compare(i, p) > 0 && (i = p);
              }
              let r = i.segment.prevInResult(), s = r ? r.prevInResult() : null;
              for (; ; ) {
                if (!r) return null;
                if (!s) return r.ringOut;
                if (s.ringOut !== r.ringOut) return ((_a3 = s.ringOut) == null ? void 0 : _a3.enclosingRing()) !== r.ringOut ? r.ringOut : (_b2 = r.ringOut) == null ? void 0 : _b2.enclosingRing();
                r = s.prevInResult(), s = r ? r.prevInResult() : null;
              }
            }
          }, su = class {
            constructor(e) {
              __publicField(this, "exteriorRing");
              __publicField(this, "interiorRings");
              this.exteriorRing = e, e.poly = this, this.interiorRings = [];
            }
            addInterior(e) {
              this.interiorRings.push(e), e.poly = this;
            }
            getGeom() {
              let e = this.exteriorRing.getGeom();
              if (e === null) return null;
              let i = [
                e
              ];
              for (let r = 0, s = this.interiorRings.length; r < s; r++) {
                let u = this.interiorRings[r].getGeom();
                u !== null && i.push(u);
              }
              return i;
            }
          }, il = class {
            constructor(e) {
              __publicField(this, "rings");
              __publicField(this, "polys");
              this.rings = e, this.polys = this._composePolys(e);
            }
            getGeom() {
              let e = [];
              for (let i = 0, r = this.polys.length; i < r; i++) {
                let s = this.polys[i].getGeom();
                s !== null && e.push(s);
              }
              return e;
            }
            _composePolys(e) {
              var _a3;
              let i = [];
              for (let r = 0, s = e.length; r < s; r++) {
                let u = e[r];
                if (!u.poly) if (u.isExteriorRing()) i.push(new su(u));
                else {
                  let c = u.enclosingRing();
                  (c == null ? void 0 : c.poly) || i.push(new su(c)), (_a3 = c == null ? void 0 : c.poly) == null ? void 0 : _a3.addInterior(u);
                }
              }
              return i;
            }
          }, nl = class {
            constructor(e, i = pa.compare) {
              __publicField(this, "queue");
              __publicField(this, "tree");
              __publicField(this, "segments");
              this.queue = e, this.tree = new la(i), this.segments = [];
            }
            process(e) {
              let i = e.segment, r = [];
              if (e.consumedBy) return e.isLeft ? this.queue.delete(e.otherSE) : this.tree.delete(i), r;
              e.isLeft && this.tree.add(i);
              let s = i, u = i;
              do
                s = this.tree.lastBefore(s);
              while (s != null && s.consumedBy != null);
              do
                u = this.tree.firstAfter(u);
              while (u != null && u.consumedBy != null);
              if (e.isLeft) {
                let c = null;
                if (s) {
                  let f = s.getIntersection(i);
                  if (f !== null && (i.isAnEndpoint(f) || (c = f), !s.isAnEndpoint(f))) {
                    let m = this._splitSafely(s, f);
                    for (let y = 0, A = m.length; y < A; y++) r.push(m[y]);
                  }
                }
                let p = null;
                if (u) {
                  let f = u.getIntersection(i);
                  if (f !== null && (i.isAnEndpoint(f) || (p = f), !u.isAnEndpoint(f))) {
                    let m = this._splitSafely(u, f);
                    for (let y = 0, A = m.length; y < A; y++) r.push(m[y]);
                  }
                }
                if (c !== null || p !== null) {
                  let f = null;
                  c === null ? f = p : p === null ? f = c : f = vi.comparePoints(c, p) <= 0 ? c : p, this.queue.delete(i.rightSE), r.push(i.rightSE);
                  let m = i.split(f);
                  for (let y = 0, A = m.length; y < A; y++) r.push(m[y]);
                }
                r.length > 0 ? (this.tree.delete(i), r.push(e)) : (this.segments.push(i), i.prev = s);
              } else {
                if (s && u) {
                  let c = s.getIntersection(u);
                  if (c !== null) {
                    if (!s.isAnEndpoint(c)) {
                      let p = this._splitSafely(s, c);
                      for (let f = 0, m = p.length; f < m; f++) r.push(p[f]);
                    }
                    if (!u.isAnEndpoint(c)) {
                      let p = this._splitSafely(u, c);
                      for (let f = 0, m = p.length; f < m; f++) r.push(p[f]);
                    }
                  }
                }
                this.tree.delete(i);
              }
              return r;
            }
            _splitSafely(e, i) {
              this.tree.delete(e);
              let r = e.rightSE;
              this.queue.delete(r);
              let s = e.split(i);
              return s.push(r), e.consumedBy === void 0 && this.tree.add(e), s;
            }
          }, rl = class {
            constructor() {
              __publicField(this, "type");
              __publicField(this, "numMultiPolys");
            }
            run(e, i, r) {
              Kr.type = e;
              let s = [
                new ou(i, true)
              ];
              for (let m = 0, y = r.length; m < y; m++) s.push(new ou(r[m], false));
              if (Kr.numMultiPolys = s.length, Kr.type === "difference") {
                let m = s[0], y = 1;
                for (; y < s.length; ) Co(s[y].bbox, m.bbox) !== null ? y++ : s.splice(y, 1);
              }
              if (Kr.type === "intersection") for (let m = 0, y = s.length; m < y; m++) {
                let A = s[m];
                for (let C = m + 1, O = s.length; C < O; C++) if (Co(A.bbox, s[C].bbox) === null) return [];
              }
              let u = new la(vi.compare);
              for (let m = 0, y = s.length; m < y; m++) {
                let A = s[m].getSweepEvents();
                for (let C = 0, O = A.length; C < O; C++) u.add(A[C]);
              }
              let c = new nl(u), p = null;
              for (u.size != 0 && (p = u.first(), u.delete(p)); p; ) {
                let m = c.process(p);
                for (let y = 0, A = m.length; y < A; y++) {
                  let C = m[y];
                  C.consumedBy === void 0 && u.add(C);
                }
                u.size != 0 ? (p = u.first(), u.delete(p)) : p = null;
              }
              Oi.reset();
              let f = el.factory(c.segments);
              return new il(f).getGeom();
            }
          }, Kr = new rl(), da = Kr, sl = 0, pa = class ba {
            constructor(i, r, s, u) {
              __publicField(this, "id");
              __publicField(this, "leftSE");
              __publicField(this, "rightSE");
              __publicField(this, "rings");
              __publicField(this, "windings");
              __publicField(this, "ringOut");
              __publicField(this, "consumedBy");
              __publicField(this, "prev");
              __publicField(this, "_prevInResult");
              __publicField(this, "_beforeState");
              __publicField(this, "_afterState");
              __publicField(this, "_isInResult");
              this.id = ++sl, this.leftSE = i, i.segment = this, i.otherSE = r, this.rightSE = r, r.segment = this, r.otherSE = i, this.rings = s, this.windings = u;
            }
            static compare(i, r) {
              let s = i.leftSE.point.x, u = r.leftSE.point.x, c = i.rightSE.point.x, p = r.rightSE.point.x;
              if (p.isLessThan(s)) return 1;
              if (c.isLessThan(u)) return -1;
              let f = i.leftSE.point.y, m = r.leftSE.point.y, y = i.rightSE.point.y, A = r.rightSE.point.y;
              if (s.isLessThan(u)) {
                if (m.isLessThan(f) && m.isLessThan(y)) return 1;
                if (m.isGreaterThan(f) && m.isGreaterThan(y)) return -1;
                let C = i.comparePoint(r.leftSE.point);
                if (C < 0) return 1;
                if (C > 0) return -1;
                let O = r.comparePoint(i.rightSE.point);
                return O !== 0 ? O : -1;
              }
              if (s.isGreaterThan(u)) {
                if (f.isLessThan(m) && f.isLessThan(A)) return -1;
                if (f.isGreaterThan(m) && f.isGreaterThan(A)) return 1;
                let C = r.comparePoint(i.leftSE.point);
                if (C !== 0) return C;
                let O = i.comparePoint(r.rightSE.point);
                return O < 0 ? 1 : O > 0 ? -1 : 1;
              }
              if (f.isLessThan(m)) return -1;
              if (f.isGreaterThan(m)) return 1;
              if (c.isLessThan(p)) {
                let C = r.comparePoint(i.rightSE.point);
                if (C !== 0) return C;
              }
              if (c.isGreaterThan(p)) {
                let C = i.comparePoint(r.rightSE.point);
                if (C < 0) return 1;
                if (C > 0) return -1;
              }
              if (!c.eq(p)) {
                let C = y.minus(f), O = c.minus(s), R = A.minus(m), H = p.minus(u);
                if (C.isGreaterThan(O) && R.isLessThan(H)) return 1;
                if (C.isLessThan(O) && R.isGreaterThan(H)) return -1;
              }
              return c.isGreaterThan(p) ? 1 : c.isLessThan(p) || y.isLessThan(A) ? -1 : y.isGreaterThan(A) ? 1 : i.id < r.id ? -1 : i.id > r.id ? 1 : 0;
            }
            static fromRing(i, r, s) {
              let u, c, p, f = vi.comparePoints(i, r);
              if (f < 0) u = i, c = r, p = 1;
              else if (f > 0) u = r, c = i, p = -1;
              else throw new Error(`Tried to create degenerate segment at [${i.x}, ${i.y}]`);
              let m = new vi(u, true), y = new vi(c, false);
              return new ba(m, y, [
                s
              ], [
                p
              ]);
            }
            replaceRightSE(i) {
              this.rightSE = i, this.rightSE.segment = this, this.rightSE.otherSE = this.leftSE, this.leftSE.otherSE = this.rightSE;
            }
            bbox() {
              let i = this.leftSE.point.y, r = this.rightSE.point.y;
              return {
                ll: {
                  x: this.leftSE.point.x,
                  y: i.isLessThan(r) ? i : r
                },
                ur: {
                  x: this.rightSE.point.x,
                  y: i.isGreaterThan(r) ? i : r
                }
              };
            }
            vector() {
              return {
                x: this.rightSE.point.x.minus(this.leftSE.point.x),
                y: this.rightSE.point.y.minus(this.leftSE.point.y)
              };
            }
            isAnEndpoint(i) {
              return i.x.eq(this.leftSE.point.x) && i.y.eq(this.leftSE.point.y) || i.x.eq(this.rightSE.point.x) && i.y.eq(this.rightSE.point.y);
            }
            comparePoint(i) {
              return Oi.orient(this.leftSE.point, i, this.rightSE.point);
            }
            getIntersection(i) {
              let r = this.bbox(), s = i.bbox(), u = Co(r, s);
              if (u === null) return null;
              let c = this.leftSE.point, p = this.rightSE.point, f = i.leftSE.point, m = i.rightSE.point, y = Wr(r, f) && this.comparePoint(f) === 0, A = Wr(s, c) && i.comparePoint(c) === 0, C = Wr(r, m) && this.comparePoint(m) === 0, O = Wr(s, p) && i.comparePoint(p) === 0;
              if (A && y) return O && !C ? p : !O && C ? m : null;
              if (A) return C && c.x.eq(m.x) && c.y.eq(m.y) ? null : c;
              if (y) return O && p.x.eq(f.x) && p.y.eq(f.y) ? null : f;
              if (O && C) return null;
              if (O) return p;
              if (C) return m;
              let R = tl(c, this.vector(), f, i.vector());
              return R === null || !Wr(u, R) ? null : Oi.snap(R);
            }
            split(i) {
              let r = [], s = i.events !== void 0, u = new vi(i, true), c = new vi(i, false), p = this.rightSE;
              this.replaceRightSE(c), r.push(c), r.push(u);
              let f = new ba(u, p, this.rings.slice(), this.windings.slice());
              return vi.comparePoints(f.leftSE.point, f.rightSE.point) > 0 && f.swapEvents(), vi.comparePoints(this.leftSE.point, this.rightSE.point) > 0 && this.swapEvents(), s && (u.checkForConsuming(), c.checkForConsuming()), r;
            }
            swapEvents() {
              let i = this.rightSE;
              this.rightSE = this.leftSE, this.leftSE = i, this.leftSE.isLeft = true, this.rightSE.isLeft = false;
              for (let r = 0, s = this.windings.length; r < s; r++) this.windings[r] *= -1;
            }
            consume(i) {
              let r = this, s = i;
              for (; r.consumedBy; ) r = r.consumedBy;
              for (; s.consumedBy; ) s = s.consumedBy;
              let u = ba.compare(r, s);
              if (u !== 0) {
                if (u > 0) {
                  let c = r;
                  r = s, s = c;
                }
                if (r.prev === s) {
                  let c = r;
                  r = s, s = c;
                }
                for (let c = 0, p = s.rings.length; c < p; c++) {
                  let f = s.rings[c], m = s.windings[c], y = r.rings.indexOf(f);
                  y === -1 ? (r.rings.push(f), r.windings.push(m)) : r.windings[y] += m;
                }
                s.rings = null, s.windings = null, s.consumedBy = r, s.leftSE.consumedBy = r.leftSE, s.rightSE.consumedBy = r.rightSE;
              }
            }
            prevInResult() {
              return this._prevInResult !== void 0 ? this._prevInResult : (this.prev ? this.prev.isInResult() ? this._prevInResult = this.prev : this._prevInResult = this.prev.prevInResult() : this._prevInResult = null, this._prevInResult);
            }
            beforeState() {
              if (this._beforeState !== void 0) return this._beforeState;
              if (!this.prev) this._beforeState = {
                rings: [],
                windings: [],
                multiPolys: []
              };
              else {
                let i = this.prev.consumedBy || this.prev;
                this._beforeState = i.afterState();
              }
              return this._beforeState;
            }
            afterState() {
              if (this._afterState !== void 0) return this._afterState;
              let i = this.beforeState();
              this._afterState = {
                rings: i.rings.slice(0),
                windings: i.windings.slice(0),
                multiPolys: []
              };
              let r = this._afterState.rings, s = this._afterState.windings, u = this._afterState.multiPolys;
              for (let f = 0, m = this.rings.length; f < m; f++) {
                let y = this.rings[f], A = this.windings[f], C = r.indexOf(y);
                C === -1 ? (r.push(y), s.push(A)) : s[C] += A;
              }
              let c = [], p = [];
              for (let f = 0, m = r.length; f < m; f++) {
                if (s[f] === 0) continue;
                let y = r[f], A = y.poly;
                if (p.indexOf(A) === -1) if (y.isExterior) c.push(A);
                else {
                  p.indexOf(A) === -1 && p.push(A);
                  let C = c.indexOf(y.poly);
                  C !== -1 && c.splice(C, 1);
                }
              }
              for (let f = 0, m = c.length; f < m; f++) {
                let y = c[f].multiPoly;
                u.indexOf(y) === -1 && u.push(y);
              }
              return this._afterState;
            }
            isInResult() {
              if (this.consumedBy) return false;
              if (this._isInResult !== void 0) return this._isInResult;
              let i = this.beforeState().multiPolys, r = this.afterState().multiPolys;
              switch (da.type) {
                case "union": {
                  let s = i.length === 0, u = r.length === 0;
                  this._isInResult = s !== u;
                  break;
                }
                case "intersection": {
                  let s, u;
                  i.length < r.length ? (s = i.length, u = r.length) : (s = r.length, u = i.length), this._isInResult = u === da.numMultiPolys && s < u;
                  break;
                }
                case "xor": {
                  let s = Math.abs(i.length - r.length);
                  this._isInResult = s % 2 === 1;
                  break;
                }
                case "difference": {
                  let s = (u) => u.length === 1 && u[0].isSubject;
                  this._isInResult = s(i) !== s(r);
                  break;
                }
              }
              return this._isInResult;
            }
          }, au = class {
            constructor(e, i, r) {
              __publicField(this, "poly");
              __publicField(this, "isExterior");
              __publicField(this, "segments");
              __publicField(this, "bbox");
              if (!Array.isArray(e) || e.length === 0) throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
              if (this.poly = i, this.isExterior = r, this.segments = [], typeof e[0][0] != "number" || typeof e[0][1] != "number") throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
              let s = Oi.snap({
                x: new yi(e[0][0]),
                y: new yi(e[0][1])
              });
              this.bbox = {
                ll: {
                  x: s.x,
                  y: s.y
                },
                ur: {
                  x: s.x,
                  y: s.y
                }
              };
              let u = s;
              for (let c = 1, p = e.length; c < p; c++) {
                if (typeof e[c][0] != "number" || typeof e[c][1] != "number") throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
                let f = Oi.snap({
                  x: new yi(e[c][0]),
                  y: new yi(e[c][1])
                });
                f.x.eq(u.x) && f.y.eq(u.y) || (this.segments.push(pa.fromRing(u, f, this)), f.x.isLessThan(this.bbox.ll.x) && (this.bbox.ll.x = f.x), f.y.isLessThan(this.bbox.ll.y) && (this.bbox.ll.y = f.y), f.x.isGreaterThan(this.bbox.ur.x) && (this.bbox.ur.x = f.x), f.y.isGreaterThan(this.bbox.ur.y) && (this.bbox.ur.y = f.y), u = f);
              }
              (!s.x.eq(u.x) || !s.y.eq(u.y)) && this.segments.push(pa.fromRing(u, s, this));
            }
            getSweepEvents() {
              let e = [];
              for (let i = 0, r = this.segments.length; i < r; i++) {
                let s = this.segments[i];
                e.push(s.leftSE), e.push(s.rightSE);
              }
              return e;
            }
          }, al = class {
            constructor(e, i) {
              __publicField(this, "multiPoly");
              __publicField(this, "exteriorRing");
              __publicField(this, "interiorRings");
              __publicField(this, "bbox");
              if (!Array.isArray(e)) throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
              this.exteriorRing = new au(e[0], this, true), this.bbox = {
                ll: {
                  x: this.exteriorRing.bbox.ll.x,
                  y: this.exteriorRing.bbox.ll.y
                },
                ur: {
                  x: this.exteriorRing.bbox.ur.x,
                  y: this.exteriorRing.bbox.ur.y
                }
              }, this.interiorRings = [];
              for (let r = 1, s = e.length; r < s; r++) {
                let u = new au(e[r], this, false);
                u.bbox.ll.x.isLessThan(this.bbox.ll.x) && (this.bbox.ll.x = u.bbox.ll.x), u.bbox.ll.y.isLessThan(this.bbox.ll.y) && (this.bbox.ll.y = u.bbox.ll.y), u.bbox.ur.x.isGreaterThan(this.bbox.ur.x) && (this.bbox.ur.x = u.bbox.ur.x), u.bbox.ur.y.isGreaterThan(this.bbox.ur.y) && (this.bbox.ur.y = u.bbox.ur.y), this.interiorRings.push(u);
              }
              this.multiPoly = i;
            }
            getSweepEvents() {
              let e = this.exteriorRing.getSweepEvents();
              for (let i = 0, r = this.interiorRings.length; i < r; i++) {
                let s = this.interiorRings[i].getSweepEvents();
                for (let u = 0, c = s.length; u < c; u++) e.push(s[u]);
              }
              return e;
            }
          }, ou = class {
            constructor(e, i) {
              __publicField(this, "isSubject");
              __publicField(this, "polys");
              __publicField(this, "bbox");
              if (!Array.isArray(e)) throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
              try {
                typeof e[0][0][0] == "number" && (e = [
                  e
                ]);
              } catch {
              }
              this.polys = [], this.bbox = {
                ll: {
                  x: new yi(Number.POSITIVE_INFINITY),
                  y: new yi(Number.POSITIVE_INFINITY)
                },
                ur: {
                  x: new yi(Number.NEGATIVE_INFINITY),
                  y: new yi(Number.NEGATIVE_INFINITY)
                }
              };
              for (let r = 0, s = e.length; r < s; r++) {
                let u = new al(e[r], this);
                u.bbox.ll.x.isLessThan(this.bbox.ll.x) && (this.bbox.ll.x = u.bbox.ll.x), u.bbox.ll.y.isLessThan(this.bbox.ll.y) && (this.bbox.ll.y = u.bbox.ll.y), u.bbox.ur.x.isGreaterThan(this.bbox.ur.x) && (this.bbox.ur.x = u.bbox.ur.x), u.bbox.ur.y.isGreaterThan(this.bbox.ur.y) && (this.bbox.ur.y = u.bbox.ur.y), this.polys.push(u);
              }
              this.isSubject = i;
            }
            getSweepEvents() {
              let e = [];
              for (let i = 0, r = this.polys.length; i < r; i++) {
                let s = this.polys[i].getSweepEvents();
                for (let u = 0, c = s.length; u < c; u++) e.push(s[u]);
              }
              return e;
            }
          }, ol = (e, ...i) => da.run("intersection", e, i), ul = (e, ...i) => da.run("difference", e, i);
          Oi.set;
          function fa(e) {
            let i = {
              type: "Feature"
            };
            return i.geometry = e, i;
          }
          function _a(e) {
            return e.type === "Feature" ? e.geometry : e;
          }
          function uu(e) {
            return e && e.geometry && e.geometry.coordinates ? e.geometry.coordinates : e;
          }
          function ll(e) {
            return fa({
              type: "LineString",
              coordinates: e
            });
          }
          function hl(e) {
            return fa({
              type: "MultiLineString",
              coordinates: e
            });
          }
          function lu(e) {
            return fa({
              type: "Polygon",
              coordinates: e
            });
          }
          function hu(e) {
            return fa({
              type: "MultiPolygon",
              coordinates: e
            });
          }
          function cl(e, i) {
            let r = _a(e), s = _a(i), u = ol(r.coordinates, s.coordinates);
            return u.length === 0 ? null : u.length === 1 ? lu(u[0]) : hu(u);
          }
          function dl(e, i) {
            let r = _a(e), s = _a(i), u = ul(r.coordinates, s.coordinates);
            return u.length === 0 ? null : u.length === 1 ? lu(u[0]) : hu(u);
          }
          function cu(e) {
            return Array.isArray(e) ? 1 + cu(e[0]) : -1;
          }
          function pl(e) {
            e instanceof L.Polyline && (e = e.toGeoJSON(15));
            let i = uu(e), r = cu(i), s = [];
            return r > 1 ? i.forEach((u) => {
              s.push(ll(u));
            }) : s.push(e), s;
          }
          function fl(e) {
            let i = [];
            return e.eachLayer((r) => {
              i.push(uu(r.toGeoJSON(15)));
            }), hl(i);
          }
          re.Cut = re.Polygon.extend({
            initialize(e) {
              this._map = e, this._shape = "Cut", this.toolbarButtonName = "cutPolygon";
            },
            _finishShape() {
              if (this._editedLayers = [], !this.options.allowSelfIntersection && (this._handleSelfIntersection(true, this._layer.getLatLngs()[0]), this._doesSelfIntersect) || this.options.requireSnapToFinish && !this._hintMarker._snapped && !this._isFirstLayer()) return;
              let e = this._layer.getLatLngs();
              if (e.length <= 2) return;
              let i = L.polygon(e, this.options.pathOptions);
              i._latlngInfos = this._layer._latlngInfo, this.cut(i), this._cleanupSnapping(), this._otherSnapLayers.splice(this._tempSnapLayerIndex, 1), delete this._tempSnapLayerIndex, this._editedLayers.forEach(({ layer: s, originalLayer: u }) => {
                this._fireCut(u, s, u), this._fireCut(this._map, s, u), u.pm._fireEdit();
              }), this._editedLayers = [];
              let r = this._hintMarker.getLatLng();
              this.disable(), this.options.continueDrawing && (this.enable(), this._hintMarker.setLatLng(r));
            },
            cut(e) {
              let i = this._map._layers, r = e._latlngInfos || [];
              Object.keys(i).map((s) => i[s]).filter((s) => s.pm).filter((s) => !s._pmTempLayer).filter((s) => !L.PM.optIn && !s.options.pmIgnore || L.PM.optIn && s.options.pmIgnore === false).filter((s) => s instanceof L.Polyline).filter((s) => s !== e).filter((s) => s.pm.options.allowCutting).filter((s) => this.options.layersToCut && L.Util.isArray(this.options.layersToCut) && this.options.layersToCut.length > 0 ? this.options.layersToCut.indexOf(s) > -1 : true).filter((s) => !this._layerGroup.hasLayer(s)).filter((s) => {
                try {
                  let u = !!Ie(e.toGeoJSON(15), s.toGeoJSON(15)).features.length > 0;
                  return u || s instanceof L.Polyline && !(s instanceof L.Polygon) ? u : !!cl(e.toGeoJSON(15), s.toGeoJSON(15));
                } catch {
                  return s instanceof L.Polygon && console.error("You can't cut polygons with self-intersections"), false;
                }
              }).forEach((s) => {
                let u;
                if (s instanceof L.Polygon) {
                  u = L.polygon(s.getLatLngs());
                  let m = u.getLatLngs();
                  r.forEach((y) => {
                    if (y && y.snapInfo) {
                      let { latlng: A } = y, C = this._calcClosestLayer(A, [
                        u
                      ]);
                      if (C && C.segment && C.distance < this.options.snapDistance) {
                        let { segment: O } = C;
                        if (O && O.length === 2) {
                          let { indexPath: R, parentPath: H, newIndex: K } = L.PM.Utils._getIndexFromSegment(m, O);
                          (R.length > 1 ? (0, Lo.default)(m, H) : m).splice(K, 0, A);
                        }
                      }
                    }
                  });
                } else u = s;
                let c = this._cutLayer(e, u), p = L.geoJSON(c, s.options);
                p.getLayers().length === 1 && ([p] = p.getLayers()), this._setPane(p, "layerPane");
                let f = p.addTo(this._map.pm._getContainingLayer());
                if (f.pm.enable(s.pm.options), f.pm.disable(), s._pmTempLayer = true, e._pmTempLayer = true, s.remove(), s.removeFrom(this._map.pm._getContainingLayer()), e.remove(), e.removeFrom(this._map.pm._getContainingLayer()), f.getLayers && f.getLayers().length === 0 && this._map.pm.removeLayer({
                  target: f
                }), f instanceof L.LayerGroup ? (f.eachLayer((m) => {
                  this._addDrawnLayerProp(m);
                }), this._addDrawnLayerProp(f)) : this._addDrawnLayerProp(f), this.options.layersToCut && L.Util.isArray(this.options.layersToCut) && this.options.layersToCut.length > 0) {
                  let m = this.options.layersToCut.indexOf(s);
                  m > -1 && this.options.layersToCut.splice(m, 1);
                }
                this._editedLayers.push({
                  layer: f,
                  originalLayer: s
                });
              });
            },
            _cutLayer(e, i) {
              let r = L.geoJSON(), s;
              if (i instanceof L.Polygon) s = dl(i.toGeoJSON(15), e.toGeoJSON(15));
              else {
                let u = pl(i);
                u.forEach((c) => {
                  let p = go(c, e.toGeoJSON(15)), f;
                  p && p.features.length > 0 ? f = L.geoJSON(p) : f = L.geoJSON(c), f.getLayers().forEach((m) => {
                    ra(e.toGeoJSON(15), m.toGeoJSON(15)) || m.addTo(r);
                  });
                }), u.length > 1 ? s = fl(r) : s = r.toGeoJSON(15);
              }
              return s;
            },
            _change: L.Util.falseFn
          }), re.Text = re.extend({
            initialize(e) {
              this._map = e, this._shape = "Text", this.toolbarButtonName = "drawText";
            },
            enable(e) {
              L.Util.setOptions(this, e), this._enabled = true, this._map.on("click", this._createMarker, this), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, true), this._hintMarker = L.marker(this._map.getCenter(), {
                interactive: false,
                zIndexOffset: 100,
                icon: L.divIcon({
                  className: "marker-icon cursor-marker"
                })
              }), this._setPane(this._hintMarker, "vertexPane"), this._hintMarker._pmTempLayer = true, this._hintMarker.addTo(this._map), this.options.cursorMarker && L.DomUtil.addClass(this._hintMarker._icon, "visible"), this.options.tooltips && this._hintMarker.bindTooltip(At("tooltips.placeText"), {
                permanent: true,
                offset: L.point(0, 10),
                direction: "bottom",
                opacity: 0.8
              }).openTooltip(), this._layer = this._hintMarker, this._map.on("mousemove", this._syncHintMarker, this), this._map.getContainer().classList.add("geoman-draw-cursor"), this._fireDrawStart(), this._setGlobalDrawMode();
            },
            disable() {
              var _a3;
              this._enabled && (this._enabled = false, this._map.off("click", this._createMarker, this), (_a3 = this._hintMarker) == null ? void 0 : _a3.remove(), this._map.getContainer().classList.remove("geoman-draw-cursor"), this._map.off("mousemove", this._syncHintMarker, this), this._map.off("mousemove", this._showHintMarkerAfterMoving, this), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, false), this.options.snappable && this._cleanupSnapping(), this._fireDrawEnd(), this._setGlobalDrawMode());
            },
            enabled() {
              return this._enabled;
            },
            toggle(e) {
              this.enabled() ? this.disable() : this.enable(e);
            },
            _syncHintMarker(e) {
              if (this._hintMarker.setLatLng(e.latlng), this.options.snappable) {
                let i = e;
                i.target = this._hintMarker, this._handleSnapping(i);
              }
            },
            _createMarker(e) {
              var _a3, _b2, _c2, _d;
              if (!e.latlng || this.options.requireSnapToFinish && !this._hintMarker._snapped && !this._isFirstLayer()) return;
              this._hintMarker._snapped || this._hintMarker.setLatLng(e.latlng);
              let i = this._hintMarker.getLatLng();
              if (this.textArea = this._createTextArea(), (_a3 = this.options.textOptions) == null ? void 0 : _a3.className) {
                let u = this.options.textOptions.className.split(" ");
                this.textArea.classList.add(...u);
              }
              let r = this._createTextIcon(this.textArea), s = new L.Marker(i, {
                textMarker: true,
                _textMarkerOverPM: true,
                icon: r
              });
              if (this._setPane(s, "markerPane"), this._finishLayer(s), s.pm || (s.options.draggable = false), s.addTo(this._map.pm._getContainingLayer()), s.pm) {
                s.pm.textArea = this.textArea, L.setOptions(s.pm, {
                  removeIfEmpty: ((_b2 = this.options.textOptions) == null ? void 0 : _b2.removeIfEmpty) ?? true
                });
                let u = ((_c2 = this.options.textOptions) == null ? void 0 : _c2.focusAfterDraw) ?? true;
                s.pm._createTextMarker(u), ((_d = this.options.textOptions) == null ? void 0 : _d.text) && s.pm.setText(this.options.textOptions.text);
              }
              this._fireCreate(s), this._cleanupSnapping(), this.disable(), this.options.continueDrawing && this._map.once("mousemove", this._showHintMarkerAfterMoving, this);
            },
            _showHintMarkerAfterMoving(e) {
              this.enable(), this._hintMarker.setLatLng(e.latlng);
            },
            _createTextArea() {
              let e = document.createElement("textarea");
              return e.readOnly = true, e.classList.add("pm-textarea", "pm-disabled"), e;
            },
            _createTextIcon(e) {
              return L.divIcon({
                className: "pm-text-marker",
                html: e
              });
            }
          });
          var _l = {
            enableLayerDrag() {
              if (!this.options.draggable || !this._layer._map) return;
              this.disable(), this._layerDragEnabled = true, this._map || (this._map = this._layer._map), (this._layer instanceof L.Marker || this._layer instanceof L.ImageOverlay) && L.DomEvent.on(this._getDOMElem(), "dragstart", this._stopDOMImageDrag), this._layer.dragging && this._layer.dragging.disable(), this._tempDragCoord = null, Ki(this._layer) instanceof L.Canvas ? (this._layer.on("mouseout", this.removeDraggingClass, this), this._layer.on("mouseover", this.addDraggingClass, this)) : this.addDraggingClass(), this._originalMapDragState = this._layer._map.dragging._enabled, this._safeToCacheDragState = true;
              let e = this._getDOMElem();
              e && (Ki(this._layer) instanceof L.Canvas ? (this._layer.on("touchstart mousedown", this._dragMixinOnMouseDown, this), this._map.pm._addTouchEvents(e)) : L.DomEvent.on(e, "touchstart mousedown", this._simulateMouseDownEvent, this)), this._fireDragEnable();
            },
            disableLayerDrag() {
              this._layerDragEnabled = false, Ki(this._layer) instanceof L.Canvas ? (this._layer.off("mouseout", this.removeDraggingClass, this), this._layer.off("mouseover", this.addDraggingClass, this)) : this.removeDraggingClass(), this._originalMapDragState && this._dragging && this._map.dragging.enable(), this._safeToCacheDragState = false, this._layer.dragging && this._layer.dragging.disable();
              let e = this._getDOMElem();
              e && (Ki(this._layer) instanceof L.Canvas ? (this._layer.off("touchstart mousedown", this._dragMixinOnMouseDown, this), this._map.pm._removeTouchEvents(e)) : L.DomEvent.off(e, "touchstart mousedown", this._simulateMouseDownEvent, this)), this._layerDragged && this._fireUpdate(), this._layerDragged = false, this._fireDragDisable();
            },
            dragging() {
              return this._dragging;
            },
            layerDragEnabled() {
              return !!this._layerDragEnabled;
            },
            _simulateMouseDownEvent(e) {
              let i = e.touches ? e.touches[0] : e, r = {
                originalEvent: i,
                target: this._layer
              };
              return r.containerPoint = this._map.mouseEventToContainerPoint(i), r.latlng = this._map.containerPointToLatLng(r.containerPoint), this._dragMixinOnMouseDown(r), false;
            },
            _simulateMouseMoveEvent(e) {
              let i = e.touches ? e.touches[0] : e, r = {
                originalEvent: i,
                target: this._layer
              };
              return r.containerPoint = this._map.mouseEventToContainerPoint(i), r.latlng = this._map.containerPointToLatLng(r.containerPoint), this._dragMixinOnMouseMove(r), false;
            },
            _simulateMouseUpEvent(e) {
              let i = {
                originalEvent: e.touches ? e.touches[0] : e,
                target: this._layer
              };
              return e.type.indexOf("touch") === -1 && (i.containerPoint = this._map.mouseEventToContainerPoint(e), i.latlng = this._map.containerPointToLatLng(i.containerPoint)), this._dragMixinOnMouseUp(i), false;
            },
            _dragMixinOnMouseDown(e) {
              if (e.originalEvent.button > 0) return;
              this._overwriteEventIfItComesFromMarker(e);
              let i = e._fromLayerSync, r = this._syncLayers("_dragMixinOnMouseDown", e);
              if (this._layer instanceof L.Marker && (this.options.snappable && !i && !r ? this._initSnappableMarkers() : this._disableSnapping()), this._layer instanceof L.CircleMarker) {
                let s = "resizeableCircleMarker";
                this._layer instanceof L.Circle && (s = "resizeableCircle"), this.options.snappable && !i && !r ? this._layer.pm.options[s] || this._initSnappableMarkersDrag() : this._layer.pm.options[s] ? this._layer.pm._disableSnapping() : this._layer.pm._disableSnappingDrag();
              }
              this._safeToCacheDragState && (this._originalMapDragState = this._layer._map.dragging._enabled, this._safeToCacheDragState = false), this._tempDragCoord = e.latlng, L.DomEvent.on(this._map.getContainer(), "touchend mouseup", this._simulateMouseUpEvent, this), L.DomEvent.on(this._map.getContainer(), "touchmove mousemove", this._simulateMouseMoveEvent, this);
            },
            _dragMixinOnMouseMove(e) {
              this._overwriteEventIfItComesFromMarker(e);
              let i = this._getDOMElem();
              this._syncLayers("_dragMixinOnMouseMove", e), this._dragging || (this._dragging = true, L.DomUtil.addClass(i, "leaflet-pm-dragging"), this._layer instanceof L.Marker || this._layer.bringToFront(), this._originalMapDragState && this._map.dragging.disable(), this._fireDragStart()), this._tempDragCoord || (this._tempDragCoord = e.latlng), this._onLayerDrag(e), this._layer instanceof L.CircleMarker && this._layer.pm._updateHiddenPolyCircle();
            },
            _dragMixinOnMouseUp(e) {
              let i = this._getDOMElem();
              return this._syncLayers("_dragMixinOnMouseUp", e), this._originalMapDragState && this._map.dragging.enable(), this._safeToCacheDragState = true, L.DomEvent.off(this._map.getContainer(), "touchmove mousemove", this._simulateMouseMoveEvent, this), L.DomEvent.off(this._map.getContainer(), "touchend mouseup", this._simulateMouseUpEvent, this), this._dragging ? (this._layer instanceof L.CircleMarker && this._layer.pm._updateHiddenPolyCircle(), this._layerDragged = true, window.setTimeout(() => {
                this._dragging = false, i && L.DomUtil.removeClass(i, "leaflet-pm-dragging"), this._fireDragEnd(), this._fireEdit(), this._layerEdited = true;
              }, 10), true) : false;
            },
            _onLayerDrag(e) {
              let { latlng: i } = e, r = {
                lat: i.lat - this._tempDragCoord.lat,
                lng: i.lng - this._tempDragCoord.lng
              }, s = (u) => u.map((c) => {
                if (Array.isArray(c)) return s(c);
                let p = {
                  lat: c.lat + r.lat,
                  lng: c.lng + r.lng
                };
                return (c.alt || c.alt === 0) && (p.alt = c.alt), p;
              });
              if (this._layer instanceof L.Circle && this._layer.options.resizeableCircle || this._layer instanceof L.CircleMarker && this._layer.options.resizeableCircleMarker) {
                let u = s([
                  this._layer.getLatLng()
                ]);
                this._layer.setLatLng(u[0]), this._fireChange(this._layer.getLatLng(), "Edit");
              } else if (this._layer instanceof L.CircleMarker || this._layer instanceof L.Marker) {
                let u = this._layer.getLatLng();
                this._layer._snapped && (u = this._layer._orgLatLng);
                let c = s([
                  u
                ]);
                this._layer.setLatLng(c[0]), this._fireChange(this._layer.getLatLng(), "Edit");
              } else if (this._layer instanceof L.ImageOverlay) {
                let u = s([
                  this._layer.getBounds().getNorthWest(),
                  this._layer.getBounds().getSouthEast()
                ]);
                this._layer.setBounds(u), this._fireChange(this._layer.getBounds(), "Edit");
              } else {
                let u = s(this._layer.getLatLngs());
                this._layer.setLatLngs(u), this._fireChange(this._layer.getLatLngs(), "Edit");
              }
              this._tempDragCoord = i, e.layer = this._layer, this._fireDrag(e);
            },
            addDraggingClass() {
              let e = this._getDOMElem();
              e && L.DomUtil.addClass(e, "leaflet-pm-draggable");
            },
            removeDraggingClass() {
              let e = this._getDOMElem();
              e && L.DomUtil.removeClass(e, "leaflet-pm-draggable");
            },
            _getDOMElem() {
              let e = null;
              return this._layer._path ? e = this._layer._path : this._layer._renderer && this._layer._renderer._container ? e = this._layer._renderer._container : this._layer._image ? e = this._layer._image : this._layer._icon && (e = this._layer._icon), e;
            },
            _overwriteEventIfItComesFromMarker(e) {
              e.target.getLatLng && (!e.target._radius || e.target._radius <= 10) && (e.containerPoint = this._map.mouseEventToContainerPoint(e.originalEvent), e.latlng = this._map.containerPointToLatLng(e.containerPoint));
            },
            _syncLayers(e, i) {
              if (this.enabled()) return false;
              if (!i._fromLayerSync && this._layer === i.target && this.options.syncLayersOnDrag) {
                i._fromLayerSync = true;
                let r = [];
                if (L.Util.isArray(this.options.syncLayersOnDrag)) r = this.options.syncLayersOnDrag, this.options.syncLayersOnDrag.forEach((s) => {
                  s instanceof L.LayerGroup && (r = r.concat(s.pm.getLayers(true)));
                });
                else if (this.options.syncLayersOnDrag === true && this._parentLayerGroup) for (let s in this._parentLayerGroup) {
                  let u = this._parentLayerGroup[s];
                  u.pm && (r = u.pm.getLayers(true));
                }
                return L.Util.isArray(r) && r.length > 0 && (r = r.filter((s) => !!s.pm).filter((s) => !!s.pm.options.draggable), r.forEach((s) => {
                  s !== this._layer && s.pm[e] && (s._snapped = false, s.pm[e](i));
                })), r.length > 0;
              }
              return false;
            },
            _stopDOMImageDrag(e) {
              return e.preventDefault(), false;
            }
          }, ml = _l, gl = et(ci());
          function yl(e, i, r, s) {
            return r.unproject(i.transform(r.project(e, s)), s);
          }
          function du(e, i, r) {
            let s = r.getMaxZoom();
            if (s === 1 / 0 && (s = r.getZoom()), L.Util.isArray(e)) {
              let u = [];
              return e.forEach((c) => {
                u.push(du(c, i, r));
              }), u;
            }
            return e instanceof L.LatLng ? yl(e, i, r, s) : null;
          }
          function er(e, i) {
            i instanceof L.Layer && (i = i.getLatLng());
            let r = e.getMaxZoom();
            return r === 1 / 0 && (r = e.getZoom()), e.project(i, r);
          }
          function ma(e, i) {
            let r = e.getMaxZoom();
            return r === 1 / 0 && (r = e.getZoom()), e.unproject(i, r);
          }
          var vl = {
            _onRotateStart(e) {
              this._preventRenderingMarkers(true), this._rotationOriginLatLng = this._getRotationCenter().clone(), this._rotationOriginPoint = er(this._map, this._rotationOriginLatLng), this._rotationStartPoint = er(this._map, e.target.getLatLng()), this._initialRotateLatLng = ri(this._layer), this._startAngle = this.getAngle();
              let i = ri(this._rotationLayer, this._rotationLayer.pm._rotateOrgLatLng);
              this._fireRotationStart(this._rotationLayer, i), this._fireRotationStart(this._map, i);
            },
            _onRotate(e) {
              let i = er(this._map, e.target.getLatLng()), r = this._rotationStartPoint, s = this._rotationOriginPoint, u = Math.atan2(i.y - s.y, i.x - s.x) - Math.atan2(r.y - s.y, r.x - s.x);
              this._layer.setLatLngs(this._rotateLayer(u, this._initialRotateLatLng, this._rotationOriginLatLng, L.PM.Matrix.init(), this._map));
              let c = this;
              function p(A, C = [], O = -1) {
                if (O > -1 && C.push(O), L.Util.isArray(A[0])) A.forEach((R, H) => p(R, C.slice(), H));
                else {
                  let R = C.length > 0 ? (0, gl.default)(c._markers, C) : c._markers[0];
                  A.forEach((H, K) => {
                    R[K].setLatLng(H);
                  });
                }
              }
              p(this._layer.getLatLngs());
              let f = ri(this._rotationLayer);
              this._rotationLayer.setLatLngs(this._rotateLayer(u, this._rotationLayer.pm._rotateOrgLatLng, this._rotationOriginLatLng, L.PM.Matrix.init(), this._map));
              let m = u * 180 / Math.PI;
              m = m < 0 ? m + 360 : m;
              let y = m + this._startAngle;
              this._setAngle(y), this._rotationLayer.pm._setAngle(y), this._fireRotation(this._rotationLayer, m, f), this._fireRotation(this._map, m, f), this._rotationLayer.pm._fireChange(this._rotationLayer.getLatLngs(), "Rotation");
            },
            _onRotateEnd() {
              let e = this._startAngle;
              delete this._rotationOriginLatLng, delete this._rotationOriginPoint, delete this._rotationStartPoint, delete this._initialRotateLatLng, delete this._startAngle;
              let i = ri(this._rotationLayer, this._rotationLayer.pm._rotateOrgLatLng);
              this._rotationLayer.pm._rotateOrgLatLng = ri(this._rotationLayer), this._fireRotationEnd(this._rotationLayer, e, i), this._fireRotationEnd(this._map, e, i), this._rotationLayer.pm._fireEdit(this._rotationLayer, "Rotation"), this._preventRenderingMarkers(false), this._layerRotated = true;
            },
            _rotateLayer(e, i, r, s, u) {
              let c = er(u, r);
              return this._matrix = s.clone().rotate(e, c).flip(), du(i, this._matrix, u);
            },
            _setAngle(e) {
              e = e < 0 ? e + 360 : e, this._angle = e % 360;
            },
            _getRotationCenter() {
              if (this._rotationCenter) return this._rotationCenter;
              let e = L.polygon(this._layer.getLatLngs(), {
                stroke: false,
                fill: false,
                pmIgnore: true
              }).addTo(this._layer._map), i = e.getCenter();
              return e.removeFrom(this._layer._map), i;
            },
            enableRotate() {
              if (!this.options.allowRotation) {
                this.disableRotate();
                return;
              }
              this.rotateEnabled() && this.disableRotate(), this._layer instanceof L.Rectangle && this._angle === void 0 && this.setInitAngle(Pr(this._layer._map, this._layer.getLatLngs()[0][0], this._layer.getLatLngs()[0][1]) || 0);
              let e = {
                fill: false,
                stroke: false,
                pmIgnore: false,
                snapIgnore: true
              };
              this._rotatePoly = L.polygon(this._layer.getLatLngs(), e), this._rotatePoly._pmTempLayer = true, this._rotatePoly.addTo(this._layer._map), this._rotatePoly.pm._setAngle(this.getAngle()), this._rotatePoly.pm.setRotationCenter(this.getRotationCenter()), this._rotatePoly.pm.setOptions(this._layer._map.pm.getGlobalOptions()), this._rotatePoly.pm.setOptions({
                rotate: true,
                snappable: false,
                hideMiddleMarkers: true
              }), this._rotatePoly.pm._rotationLayer = this._layer, this._rotatePoly.pm.enable(), this._rotateOrgLatLng = ri(this._layer), this._rotateEnabled = true, this._layer.on("remove", this.disableRotate, this), this._fireRotationEnable(this._layer), this._fireRotationEnable(this._layer._map);
            },
            disableRotate() {
              this.rotateEnabled() && (this._rotatePoly.pm._layerRotated && this._fireUpdate(), this._rotatePoly.pm._layerRotated = false, this._rotatePoly.pm.disable(), this._rotatePoly.remove(), this._rotatePoly.pm.setOptions({
                rotate: false
              }), this._rotatePoly = void 0, this._rotateOrgLatLng = void 0, this._layer.off("remove", this.disableRotate, this), this._rotateEnabled = false, this._fireRotationDisable(this._layer), this._fireRotationDisable(this._layer._map));
            },
            rotateEnabled() {
              return !!this._rotateEnabled;
            },
            rotateLayer(e) {
              let i = this.getAngle(), r = this._layer.getLatLngs(), s = e * (Math.PI / 180);
              this._layer.setLatLngs(this._rotateLayer(s, this._layer.getLatLngs(), this._getRotationCenter(), L.PM.Matrix.init(), this._layer._map)), this._rotateOrgLatLng = L.polygon(this._layer.getLatLngs()).getLatLngs(), this._setAngle(this.getAngle() + e), this.rotateEnabled() && this._rotatePoly && this._rotatePoly.pm.enabled() && (this._rotatePoly.setLatLngs(this._rotateLayer(s, this._rotatePoly.getLatLngs(), this._getRotationCenter(), L.PM.Matrix.init(), this._rotatePoly._map)), this._rotatePoly.pm._initMarkers());
              let u = this.getAngle() - i;
              u = u < 0 ? u + 360 : u, this._startAngle = i, this._fireRotation(this._layer, u, r, this._layer), this._fireRotation(this._map || this._layer._map, u, r, this._layer), delete this._startAngle, this._fireChange(this._layer.getLatLngs(), "Rotation");
            },
            rotateLayerToAngle(e) {
              let i = e - this.getAngle();
              this.rotateLayer(i);
            },
            getAngle() {
              return this._angle || 0;
            },
            setInitAngle(e) {
              this._setAngle(e);
            },
            getRotationCenter() {
              return this._getRotationCenter();
            },
            setRotationCenter(e) {
              this._rotationCenter = e, this._rotatePoly && this._rotatePoly.pm.setRotationCenter(e);
            }
          }, Ll = vl, bl = L.Class.extend({
            includes: [
              ml,
              zs,
              Ll,
              bn
            ],
            options: {
              snappable: true,
              snapDistance: 20,
              allowSelfIntersection: true,
              allowSelfIntersectionEdit: false,
              preventMarkerRemoval: false,
              removeLayerBelowMinVertexCount: true,
              limitMarkersToCount: -1,
              hideMiddleMarkers: false,
              snapSegment: true,
              syncLayersOnDrag: false,
              draggable: true,
              allowEditing: true,
              allowRemoval: true,
              allowCutting: true,
              allowRotation: true,
              addVertexOn: "click",
              removeVertexOn: "contextmenu",
              removeVertexValidation: void 0,
              addVertexValidation: void 0,
              moveVertexValidation: void 0,
              resizeableCircleMarker: false,
              resizeableCircle: true,
              snapMiddle: false,
              snapVertex: true
            },
            setOptions(e) {
              L.Util.setOptions(this, e);
            },
            getOptions() {
              return this.options;
            },
            applyOptions() {
            },
            isPolygon() {
              return this._layer instanceof L.Polygon;
            },
            getShape() {
              return this._shape;
            },
            _setPane(e, i) {
              i === "layerPane" ? e.options.pane = this._map.pm.globalOptions.panes && this._map.pm.globalOptions.panes.layerPane || "overlayPane" : i === "vertexPane" ? e.options.pane = this._map.pm.globalOptions.panes && this._map.pm.globalOptions.panes.vertexPane || "markerPane" : i === "markerPane" && (e.options.pane = this._map.pm.globalOptions.panes && this._map.pm.globalOptions.panes.markerPane || "markerPane");
            },
            remove() {
              (this._map || this._layer._map).pm.removeLayer({
                target: this._layer
              });
            },
            _vertexValidation(e, i) {
              let r = i.target, s = {
                layer: this._layer,
                marker: r,
                event: i
              }, u = "";
              return e === "move" ? u = "moveVertexValidation" : e === "add" ? u = "addVertexValidation" : e === "remove" && (u = "removeVertexValidation"), this.options[u] && typeof this.options[u] == "function" && !this.options[u](s) ? (e === "move" && (r._cancelDragEventChain = r.getLatLng()), false) : (r._cancelDragEventChain = null, true);
            },
            _vertexValidationDrag(e) {
              return e._cancelDragEventChain ? (e._latlng = e._cancelDragEventChain, e.update(), false) : true;
            },
            _vertexValidationDragEnd(e) {
              return e._cancelDragEventChain ? (e._cancelDragEventChain = null, false) : true;
            }
          }), pe = bl;
          pe.LayerGroup = L.Class.extend({
            initialize(e) {
              this._layerGroup = e, this._layers = this.getLayers(), this._getMap(), this._layers.forEach((s) => this._initLayer(s));
              let i = (s) => {
                if (s.layer._pmTempLayer) return;
                this._layers = this.getLayers();
                let u = this._layers.filter((c) => !c.pm._parentLayerGroup || !(this._layerGroup._leaflet_id in c.pm._parentLayerGroup));
                u.forEach((c) => {
                  this._initLayer(c);
                }), u.length > 0 && this._getMap() && this._getMap().pm.globalEditModeEnabled() && this.enabled() && this.enable(this.getOptions());
              };
              this._layerGroup.on("layeradd", L.Util.throttle(i, 100, this), this), this._layerGroup.on("layerremove", (s) => {
                this._removeLayerFromGroup(s.target);
              }, this);
              let r = (s) => {
                s.target._pmTempLayer || (this._layers = this.getLayers());
              };
              this._layerGroup.on("layerremove", L.Util.throttle(r, 100, this), this);
            },
            enable(e, i = []) {
              i.length === 0 && (this._layers = this.getLayers()), this._options = e, this._layers.forEach((r) => {
                r instanceof L.LayerGroup ? i.indexOf(r._leaflet_id) === -1 && (i.push(r._leaflet_id), r.pm.enable(e, i)) : r.pm.enable(e);
              });
            },
            disable(e = []) {
              e.length === 0 && (this._layers = this.getLayers()), this._layers.forEach((i) => {
                i instanceof L.LayerGroup ? e.indexOf(i._leaflet_id) === -1 && (e.push(i._leaflet_id), i.pm.disable(e)) : i.pm.disable();
              });
            },
            enabled(e = []) {
              return e.length === 0 && (this._layers = this.getLayers()), !!this._layers.find((i) => i instanceof L.LayerGroup ? e.indexOf(i._leaflet_id) === -1 ? (e.push(i._leaflet_id), i.pm.enabled(e)) : false : i.pm.enabled());
            },
            toggleEdit(e, i = []) {
              i.length === 0 && (this._layers = this.getLayers()), this._options = e, this._layers.forEach((r) => {
                r instanceof L.LayerGroup ? i.indexOf(r._leaflet_id) === -1 && (i.push(r._leaflet_id), r.pm.toggleEdit(e, i)) : r.pm.toggleEdit(e);
              });
            },
            _initLayer(e) {
              let i = L.Util.stamp(this._layerGroup);
              e.pm._parentLayerGroup || (e.pm._parentLayerGroup = {}), e.pm._parentLayerGroup[i] = this._layerGroup;
            },
            _removeLayerFromGroup(e) {
              if (e.pm && e.pm._layerGroup) {
                let i = L.Util.stamp(this._layerGroup);
                delete e.pm._layerGroup[i];
              }
            },
            dragging() {
              return this._layers = this.getLayers(), this._layers ? !!this._layers.find((e) => e.pm.dragging()) : false;
            },
            getOptions() {
              return this.options;
            },
            _getMap() {
              var _a3;
              return this._map || ((_a3 = this._layers.find((e) => !!e._map)) == null ? void 0 : _a3._map) || null;
            },
            getLayers(e = false, i = true, r = true, s = []) {
              let u = [];
              return e ? this._layerGroup.getLayers().forEach((c) => {
                u.push(c), c instanceof L.LayerGroup && s.indexOf(c._leaflet_id) === -1 && (s.push(c._leaflet_id), u = u.concat(c.pm.getLayers(true, true, true, s)));
              }) : u = this._layerGroup.getLayers(), r && (u = u.filter((c) => !(c instanceof L.LayerGroup))), i && (u = u.filter((c) => !!c.pm), u = u.filter((c) => !c._pmTempLayer), u = u.filter((c) => !L.PM.optIn && !c.options.pmIgnore || L.PM.optIn && c.options.pmIgnore === false)), u;
            },
            setOptions(e, i = []) {
              i.length === 0 && (this._layers = this.getLayers()), this.options = e, this._layers.forEach((r) => {
                r.pm && (r instanceof L.LayerGroup ? i.indexOf(r._leaflet_id) === -1 && (i.push(r._leaflet_id), r.pm.setOptions(e, i)) : r.pm.setOptions(e));
              });
            }
          }), pe.Marker = pe.extend({
            _shape: "Marker",
            initialize(e) {
              this._layer = e, this._enabled = false, this._layer.on("dragend", this._onDragEnd, this);
            },
            enable(e = {
              draggable: true
            }) {
              if (L.Util.setOptions(this, e), !this.options.allowEditing || !this._layer._map) {
                this.disable();
                return;
              }
              this._map = this._layer._map, this.enabled() && this.disable(), this.applyOptions(), this._layer.on("remove", this.disable, this), this._enabled = true, this._layer.on("pm:dragstart", this._onDragStart, this), this._layer.on("pm:dragend", this._onMarkerDragEnd, this), this._fireEnable();
            },
            disable() {
              this.enabled() && (this.disableLayerDrag(), this._layer.off("remove", this.disable, this), this._layer.off("contextmenu", this._removeMarker, this), this._layerEdited && this._fireUpdate(), this._layerEdited = false, this._fireDisable(), this._enabled = false);
            },
            enabled() {
              return this._enabled;
            },
            toggleEdit(e) {
              this.enabled() ? this.disable() : this.enable(e);
            },
            applyOptions() {
              this.options.snappable ? this._initSnappableMarkers() : this._disableSnapping(), this.options.draggable ? this.enableLayerDrag() : this.disableLayerDrag(), this.options.preventMarkerRemoval || this._layer.on("contextmenu", this._removeMarker, this);
            },
            _removeMarker(e) {
              let i = e.target;
              i.remove(), this._fireRemove(i), this._fireRemove(this._map, i);
            },
            _onDragStart() {
              this._map.pm.Draw.Marker._layerIsDragging = true;
            },
            _onMarkerDragEnd() {
              this._map.pm.Draw.Marker._layerIsDragging = false;
            },
            _onDragEnd() {
              this._fireEdit(), this._layerEdited = true;
            },
            _initSnappableMarkers() {
              let e = this._layer;
              this.options.snapDistance = this.options.snapDistance || 30, this.options.snapSegment = this.options.snapSegment === void 0 ? true : this.options.snapSegment, e.off("pm:drag", this._handleSnapping, this), e.on("pm:drag", this._handleSnapping, this), e.off("pm:dragend", this._cleanupSnapping, this), e.on("pm:dragend", this._cleanupSnapping, this), e.off("pm:dragstart", this._unsnap, this), e.on("pm:dragstart", this._unsnap, this);
            },
            _disableSnapping() {
              let e = this._layer;
              e.off("pm:drag", this._handleSnapping, this), e.off("pm:dragend", this._cleanupSnapping, this), e.off("pm:dragstart", this._unsnap, this);
            }
          });
          var rn = et(ci()), wl = {
            filterMarkerGroup() {
              this.markerCache = [], this.createCache(), this._layer.on("pm:edit", this.createCache, this), this.applyLimitFilters({}), this.throttledApplyLimitFilters || (this.throttledApplyLimitFilters = L.Util.throttle(this.applyLimitFilters, 100, this)), this._layer.on("pm:disable", this._removeMarkerLimitEvents, this), this._layer.on("remove", this._removeMarkerLimitEvents, this), this.options.limitMarkersToCount > -1 && (this._layer.on("pm:vertexremoved", this._initMarkers, this), this._map.on("mousemove", this.throttledApplyLimitFilters, this));
            },
            _removeMarkerLimitEvents() {
              this._map.off("mousemove", this.throttledApplyLimitFilters, this), this._layer.off("pm:edit", this.createCache, this), this._layer.off("pm:disable", this._removeMarkerLimitEvents, this), this._layer.off("pm:vertexremoved", this._initMarkers, this);
            },
            createCache() {
              let e = [
                ...this._markerGroup.getLayers(),
                ...this.markerCache
              ];
              this.markerCache = e.filter((i, r, s) => s.indexOf(i) === r);
            },
            _removeFromCache(e) {
              let i = this.markerCache.indexOf(e);
              i > -1 && this.markerCache.splice(i, 1);
            },
            renderLimits(e) {
              this.markerCache.forEach((i) => {
                e.includes(i) ? this._markerGroup.addLayer(i) : this._markerGroup.removeLayer(i);
              });
            },
            applyLimitFilters({ latlng: e = {
              lat: 0,
              lng: 0
            } }) {
              if (this._preventRenderMarkers) return;
              let i = [
                ...this._filterClosestMarkers(e)
              ];
              this.renderLimits(i);
            },
            _filterClosestMarkers(e) {
              let i = [
                ...this.markerCache
              ], r = this.options.limitMarkersToCount;
              return r === -1 ? i : (i.sort((s, u) => {
                let c = s._latlng.distanceTo(e), p = u._latlng.distanceTo(e);
                return c - p;
              }), i.filter((s, u) => r > -1 ? u < r : true));
            },
            _preventRenderMarkers: false,
            _preventRenderingMarkers(e) {
              this._preventRenderMarkers = !!e;
            }
          }, Cl = wl;
          pe.Line = pe.extend({
            includes: [
              Cl
            ],
            _shape: "Line",
            initialize(e) {
              this._layer = e, this._enabled = false;
            },
            enable(e) {
              if (L.Util.setOptions(this, e), this._map = this._layer._map, !!this._map) {
                if (!this.options.allowEditing) {
                  this.disable();
                  return;
                }
                this.enabled() && this.disable(), this._enabled = true, this._initMarkers(), this.applyOptions(), this._layer.on("remove", this.disable, this), this.options.allowSelfIntersection || this._layer.on("pm:vertexremoved", this._handleSelfIntersectionOnVertexRemoval, this), this.options.allowSelfIntersection ? this.cachedColor = void 0 : (this._layer.options.color !== "#f00000ff" ? (this.cachedColor = this._layer.options.color, this.isRed = false) : this.isRed = true, this._handleLayerStyle()), this._fireEnable();
              }
            },
            disable() {
              if (!this.enabled() || this._dragging) return;
              this._enabled = false, this._markerGroup.clearLayers(), this._markerGroup.removeFrom(this._map), this._layer.off("remove", this.disable, this), this.options.allowSelfIntersection || this._layer.off("pm:vertexremoved", this._handleSelfIntersectionOnVertexRemoval, this);
              let e = this._layer._path ? this._layer._path : this._layer._renderer._container;
              L.DomUtil.removeClass(e, "leaflet-pm-draggable"), this._layerEdited && this._fireUpdate(), this._layerEdited = false, this._fireDisable();
            },
            enabled() {
              return this._enabled;
            },
            toggleEdit(e) {
              return this.enabled() ? this.disable() : this.enable(e), this.enabled();
            },
            applyOptions() {
              this.options.snappable ? this._initSnappableMarkers() : this._disableSnapping();
            },
            _initMarkers() {
              let e = this._map, i = this._layer.getLatLngs();
              this._markerGroup && (this._markerGroup.removeFrom(e), this._markerGroup.clearLayers()), this._markerGroup = new L.FeatureGroup(), this._markerGroup._pmTempLayer = true;
              let r = (s) => {
                if (Array.isArray(s[0])) return s.map(r, this);
                let u = s.map(this._createMarker, this);
                return this.options.hideMiddleMarkers !== true && s.map((c, p) => {
                  let f = this.isPolygon() ? (p + 1) % s.length : p + 1;
                  return this._createMiddleMarker(u[p], u[f]);
                }), u;
              };
              this._markers = r(i), this.filterMarkerGroup(), e.addLayer(this._markerGroup);
            },
            _createMarker(e) {
              let i = new L.Marker(e, {
                draggable: true,
                icon: L.divIcon({
                  className: "marker-icon"
                })
              });
              return this._setPane(i, "vertexPane"), i._pmTempLayer = true, this.options.rotate ? (i.on("dragstart", this._onRotateStart, this), i.on("drag", this._onRotate, this), i.on("dragend", this._onRotateEnd, this)) : (i.on("click", this._onVertexClick, this), i.on("dragstart", this._onMarkerDragStart, this), i.on("move", this._onMarkerDrag, this), i.on("dragend", this._onMarkerDragEnd, this), this.options.preventMarkerRemoval || i.on(this.options.removeVertexOn, this._removeMarker, this)), this._markerGroup.addLayer(i), i;
            },
            _createMiddleMarker(e, i) {
              if (!e || !i) return false;
              let r = L.PM.Utils.calcMiddleLatLng(this._map, e.getLatLng(), i.getLatLng()), s = this._createMarker(r), u = L.divIcon({
                className: "marker-icon marker-icon-middle"
              });
              return s.setIcon(u), s.leftM = e, s.rightM = i, e._middleMarkerNext = s, i._middleMarkerPrev = s, s.on(this.options.addVertexOn, this._onMiddleMarkerClick, this), s.on("movestart", this._onMiddleMarkerMoveStart, this), s;
            },
            _onMiddleMarkerClick(e) {
              let i = e.target;
              if (!this._vertexValidation("add", e)) return;
              let r = L.divIcon({
                className: "marker-icon"
              });
              i.setIcon(r), this._addMarker(i, i.leftM, i.rightM);
            },
            _onMiddleMarkerMoveStart(e) {
              let i = e.target;
              if (i.on("moveend", this._onMiddleMarkerMoveEnd, this), !this._vertexValidation("add", e)) {
                i.on("move", this._onMiddleMarkerMovePrevent, this);
                return;
              }
              i._dragging = true, this._addMarker(i, i.leftM, i.rightM);
            },
            _onMiddleMarkerMovePrevent(e) {
              let i = e.target;
              this._vertexValidationDrag(i);
            },
            _onMiddleMarkerMoveEnd(e) {
              let i = e.target;
              if (i.off("move", this._onMiddleMarkerMovePrevent, this), i.off("moveend", this._onMiddleMarkerMoveEnd, this), !this._vertexValidationDragEnd(i)) return;
              let r = L.divIcon({
                className: "marker-icon"
              });
              i.setIcon(r), setTimeout(() => {
                delete i._dragging;
              }, 100);
            },
            _addMarker(e, i, r) {
              e.off("movestart", this._onMiddleMarkerMoveStart, this), e.off(this.options.addVertexOn, this._onMiddleMarkerClick, this);
              let s = e.getLatLng(), u = this._layer._latlngs;
              delete e.leftM, delete e.rightM;
              let { indexPath: c, index: p, parentPath: f } = L.PM.Utils.findDeepMarkerIndex(this._markers, i), m = c.length > 1 ? (0, rn.default)(u, f) : u, y = c.length > 1 ? (0, rn.default)(this._markers, f) : this._markers;
              m.splice(p + 1, 0, s), y.splice(p + 1, 0, e), this._layer.setLatLngs(u), this.options.hideMiddleMarkers !== true && (this._createMiddleMarker(i, e), this._createMiddleMarker(e, r)), this._fireEdit(), this._layerEdited = true, this._fireChange(this._layer.getLatLngs(), "Edit"), this._fireVertexAdded(e, L.PM.Utils.findDeepMarkerIndex(this._markers, e).indexPath, s), this.options.snappable && this._initSnappableMarkers();
            },
            hasSelfIntersection() {
              return Vn(this._layer.toGeoJSON(15)).features.length > 0;
            },
            _handleSelfIntersectionOnVertexRemoval() {
              this._handleLayerStyle(true) && (this._layer.setLatLngs(this._coordsBeforeEdit), this._coordsBeforeEdit = null, this._initMarkers());
            },
            _handleLayerStyle(e) {
              let i = this._layer, r, s;
              if (this.options.allowSelfIntersection ? r = false : (s = Vn(this._layer.toGeoJSON(15)), r = s.features.length > 0), r) {
                if (!this.options.allowSelfIntersection && this.options.allowSelfIntersectionEdit && this._updateDisabledMarkerStyle(this._markers, true), this.isRed) return r;
                e ? this._flashLayer() : (i.setStyle({
                  color: "#f00000ff"
                }), this.isRed = true), this._fireIntersect(s);
              } else i.setStyle({
                color: this.cachedColor
              }), this.isRed = false, !this.options.allowSelfIntersection && this.options.allowSelfIntersectionEdit && this._updateDisabledMarkerStyle(this._markers, false);
              return r;
            },
            _flashLayer() {
              this.cachedColor || (this.cachedColor = this._layer.options.color), this._layer.setStyle({
                color: "#f00000ff"
              }), this.isRed = true, window.setTimeout(() => {
                this._layer.setStyle({
                  color: this.cachedColor
                }), this.isRed = false;
              }, 200);
            },
            _updateDisabledMarkerStyle(e, i) {
              e.forEach((r) => {
                Array.isArray(r) ? this._updateDisabledMarkerStyle(r, i) : r._icon && (i && !this._checkMarkerAllowedToDrag(r) ? L.DomUtil.addClass(r._icon, "vertexmarker-disabled") : L.DomUtil.removeClass(r._icon, "vertexmarker-disabled"));
              });
            },
            _removeMarker(e) {
              let i = e.target;
              if (!this._vertexValidation("remove", e)) return;
              this.options.allowSelfIntersection || (this._coordsBeforeEdit = ri(this._layer, this._layer.getLatLngs()));
              let r = this._layer.getLatLngs(), { indexPath: s, index: u, parentPath: c } = L.PM.Utils.findDeepMarkerIndex(this._markers, i);
              if (!s) return;
              let p = s.length > 1 ? (0, rn.default)(r, c) : r, f = s.length > 1 ? (0, rn.default)(this._markers, c) : this._markers, m = c[c.length - 1] > 0 && this._layer instanceof L.Polygon;
              if (!this.options.removeLayerBelowMinVertexCount && !m && (p.length <= 2 || this.isPolygon() && p.length <= 3)) {
                this._flashLayer();
                return;
              }
              p.splice(u, 1), this._layer.setLatLngs(r), this.isPolygon() && p.length <= 2 && p.splice(0, p.length);
              let y = false;
              if (p.length <= 1 && (p.splice(0, p.length), c.length > 1 && s.length > 1 && (r = jn(r)), this._layer.setLatLngs(r), this._initMarkers(), y = true), kt(r) || this._layer.remove(), r = jn(r), this._layer.setLatLngs(r), this._markers = jn(this._markers), !y && (f = s.length > 1 ? (0, rn.default)(this._markers, c) : this._markers, i._middleMarkerPrev && (this._markerGroup.removeLayer(i._middleMarkerPrev), this._removeFromCache(i._middleMarkerPrev)), i._middleMarkerNext && (this._markerGroup.removeLayer(i._middleMarkerNext), this._removeFromCache(i._middleMarkerNext)), this._markerGroup.removeLayer(i), this._removeFromCache(i), f)) {
                let A, C;
                if (this.isPolygon() ? (A = (u + 1) % f.length, C = (u + (f.length - 1)) % f.length) : (C = u - 1 < 0 ? void 0 : u - 1, A = u + 1 >= f.length ? void 0 : u + 1), A !== C) {
                  let O = f[C], R = f[A];
                  this.options.hideMiddleMarkers !== true && this._createMiddleMarker(O, R);
                }
                f.splice(u, 1);
              }
              this._fireEdit(), this._layerEdited = true, this._fireVertexRemoved(i, s), this._fireChange(this._layer.getLatLngs(), "Edit");
            },
            updatePolygonCoordsFromMarkerDrag(e) {
              let i = this._layer.getLatLngs(), r = e.getLatLng(), { indexPath: s, index: u, parentPath: c } = L.PM.Utils.findDeepMarkerIndex(this._markers, e), p = s.length > 1 ? (0, rn.default)(i, c) : i;
              r.alt = p[u].alt, p.splice(u, 1, r), this._layer.setLatLngs(i);
            },
            _getNeighborMarkers(e) {
              let { indexPath: i, index: r, parentPath: s } = L.PM.Utils.findDeepMarkerIndex(this._markers, e), u = i.length > 1 ? (0, rn.default)(this._markers, s) : this._markers, c = (r + 1) % u.length, p = (r + (u.length - 1)) % u.length, f = u[p], m = u[c];
              return {
                prevMarker: f,
                nextMarker: m
              };
            },
            _checkMarkerAllowedToDrag(e) {
              let { prevMarker: i, nextMarker: r } = this._getNeighborMarkers(e), s = L.polyline([
                i.getLatLng(),
                e.getLatLng()
              ]), u = L.polyline([
                e.getLatLng(),
                r.getLatLng()
              ]), c = Ie(this._layer.toGeoJSON(15), s.toGeoJSON(15)).features.filter((f) => {
                let m = f.geometry.coordinates, y = L.latLng(m[1], m[0]);
                return !y.equals(i.getLatLng()) && !y.equals(e.getLatLng());
              }).length, p = Ie(this._layer.toGeoJSON(15), u.toGeoJSON(15)).features.filter((f) => {
                let m = f.geometry.coordinates, y = L.latLng(m[1], m[0]);
                return !y.equals(r.getLatLng()) && !y.equals(e.getLatLng());
              }).length;
              return !(c < 1 && p < 1);
            },
            _onMarkerDragStart(e) {
              let i = e.target;
              if (this._preventRenderingMarkers(true), this.cachedColor || (this.cachedColor = this._layer.options.color), !this._vertexValidation("move", e)) return;
              let { indexPath: r } = L.PM.Utils.findDeepMarkerIndex(this._markers, i);
              this._fireMarkerDragStart(e, r), this.options.allowSelfIntersection || (this._coordsBeforeEdit = ri(this._layer, this._layer.getLatLngs())), !this.options.allowSelfIntersection && this.options.allowSelfIntersectionEdit && this.hasSelfIntersection() ? this._markerAllowedToDrag = this._checkMarkerAllowedToDrag(i) : this._markerAllowedToDrag = null;
            },
            _onMarkerDrag(e) {
              let i = e.target;
              if (!this._vertexValidationDrag(i)) return;
              let { indexPath: r, index: s, parentPath: u } = L.PM.Utils.findDeepMarkerIndex(this._markers, i);
              if (!r) return;
              if (!this.options.allowSelfIntersection && this.options.allowSelfIntersectionEdit && this.hasSelfIntersection() && this._markerAllowedToDrag === false) {
                this._layer.setLatLngs(this._coordsBeforeEdit), this._initMarkers(), this._handleLayerStyle();
                return;
              }
              this.updatePolygonCoordsFromMarkerDrag(i);
              let c = r.length > 1 ? (0, rn.default)(this._markers, u) : this._markers, p = (s + 1) % c.length, f = (s + (c.length - 1)) % c.length, m = i.getLatLng(), y = c[f].getLatLng(), A = c[p].getLatLng();
              if (i._middleMarkerNext) {
                let C = L.PM.Utils.calcMiddleLatLng(this._map, m, A);
                i._middleMarkerNext.setLatLng(C);
              }
              if (i._middleMarkerPrev) {
                let C = L.PM.Utils.calcMiddleLatLng(this._map, m, y);
                i._middleMarkerPrev.setLatLng(C);
              }
              this.options.allowSelfIntersection || this._handleLayerStyle(), this._fireMarkerDrag(e, r), this._fireChange(this._layer.getLatLngs(), "Edit");
            },
            _onMarkerDragEnd(e) {
              let i = e.target;
              if (this._preventRenderingMarkers(false), !this._vertexValidationDragEnd(i)) return;
              let { indexPath: r } = L.PM.Utils.findDeepMarkerIndex(this._markers, i), s = !this.options.allowSelfIntersection && this.hasSelfIntersection();
              s && this.options.allowSelfIntersectionEdit && this._markerAllowedToDrag && (s = false);
              let u = !this.options.allowSelfIntersection && s;
              if (this._fireMarkerDragEnd(e, r, u), u) {
                this._layer.setLatLngs(this._coordsBeforeEdit), this._coordsBeforeEdit = null, this._initMarkers(), this.options.snappable && this._initSnappableMarkers(), this._handleLayerStyle(), this._fireLayerReset(e, r);
                return;
              }
              !this.options.allowSelfIntersection && this.options.allowSelfIntersectionEdit && this._handleLayerStyle(), this._fireEdit(), this._layerEdited = true, this._fireChange(this._layer.getLatLngs(), "Edit");
            },
            _onVertexClick(e) {
              let i = e.target;
              if (i._dragging) return;
              let { indexPath: r } = L.PM.Utils.findDeepMarkerIndex(this._markers, i);
              this._fireVertexClick(e, r);
            }
          }), pe.Polygon = pe.Line.extend({
            _shape: "Polygon",
            _checkMarkerAllowedToDrag(e) {
              let { prevMarker: i, nextMarker: r } = this._getNeighborMarkers(e), s = L.polyline([
                i.getLatLng(),
                e.getLatLng()
              ]), u = L.polyline([
                e.getLatLng(),
                r.getLatLng()
              ]), c = Ie(this._layer.toGeoJSON(15), s.toGeoJSON(15)).features.filter((f) => {
                let m = f.geometry.coordinates, y = L.latLng(m[1], m[0]);
                return !y.equals(i.getLatLng()) && !y.equals(e.getLatLng());
              }).length, p = Ie(this._layer.toGeoJSON(15), u.toGeoJSON(15)).features.filter((f) => {
                let m = f.geometry.coordinates, y = L.latLng(m[1], m[0]);
                return !y.equals(r.getLatLng()) && !y.equals(e.getLatLng());
              }).length;
              return !(c < 1 && p < 1);
            }
          }), pe.Rectangle = pe.Polygon.extend({
            _shape: "Rectangle",
            _initMarkers() {
              let e = this._map, i = this._findCorners();
              this._markerGroup && this._markerGroup.clearLayers(), this._markerGroup = new L.FeatureGroup(), this._markerGroup._pmTempLayer = true, e.addLayer(this._markerGroup), this._markers = [], this._markers[0] = i.map(this._createMarker, this), [this._cornerMarkers] = this._markers, this._layer.getLatLngs()[0].forEach((r, s) => {
                let u = this._cornerMarkers.find((c) => c._index === s);
                u && u.setLatLng(r);
              });
            },
            applyOptions() {
              this.options.snappable ? this._initSnappableMarkers() : this._disableSnapping(), this._addMarkerEvents();
            },
            _createMarker(e, i) {
              let r = new L.Marker(e, {
                draggable: true,
                icon: L.divIcon({
                  className: "marker-icon"
                })
              });
              return this._setPane(r, "vertexPane"), r._origLatLng = e, r._index = i, r._pmTempLayer = true, r.on("click", this._onVertexClick, this), this._markerGroup.addLayer(r), r;
            },
            _addMarkerEvents() {
              this._markers[0].forEach((e) => {
                e.on("dragstart", this._onMarkerDragStart, this), e.on("drag", this._onMarkerDrag, this), e.on("dragend", this._onMarkerDragEnd, this), this.options.preventMarkerRemoval || e.on("contextmenu", this._removeMarker, this);
              });
            },
            _removeMarker() {
              return null;
            },
            _onMarkerDragStart(e) {
              if (!this._vertexValidation("move", e)) return;
              let i = e.target, r = this._cornerMarkers;
              i._oppositeCornerLatLng = r.find((u) => u._index === (i._index + 2) % 4).getLatLng(), i._snapped = false;
              let { indexPath: s } = L.PM.Utils.findDeepMarkerIndex(this._markers, i);
              this._fireMarkerDragStart(e, s);
            },
            _onMarkerDrag(e) {
              let i = e.target;
              if (!this._vertexValidationDrag(i) || i._index === void 0) return;
              this._adjustRectangleForMarkerMove(i);
              let { indexPath: r } = L.PM.Utils.findDeepMarkerIndex(this._markers, i);
              this._fireMarkerDrag(e, r), this._fireChange(this._layer.getLatLngs(), "Edit");
            },
            _onMarkerDragEnd(e) {
              let i = e.target;
              if (!this._vertexValidationDragEnd(i)) return;
              this._cornerMarkers.forEach((s) => {
                delete s._oppositeCornerLatLng;
              });
              let { indexPath: r } = L.PM.Utils.findDeepMarkerIndex(this._markers, i);
              this._fireMarkerDragEnd(e, r), this._fireEdit(), this._layerEdited = true, this._fireChange(this._layer.getLatLngs(), "Edit");
            },
            _adjustRectangleForMarkerMove(e) {
              L.extend(e._origLatLng, e._latlng);
              let i = L.PM.Utils._getRotatedRectangle(e.getLatLng(), e._oppositeCornerLatLng, this.getAngle(), this._map);
              this._layer.setLatLngs(i), this._adjustAllMarkers(e), this._layer.redraw();
            },
            _adjustAllMarkers(e) {
              let i = this._layer.getLatLngs()[0];
              if (i && i.length !== 4 && i.length > 0) i.forEach((r, s) => {
                this._cornerMarkers[s].setLatLng(r);
              }), this._cornerMarkers.slice(i.length).forEach((r) => {
                r.setLatLng(i[0]);
              });
              else if (!i || !i.length) console.error("The layer has no LatLngs");
              else {
                let r = i.findIndex((s) => e.getLatLng().equals(s));
                r > -1 ? (this._cornerMarkers[(e._index + 1) % 4].setLatLng(i[(r + 1) % 4]), this._cornerMarkers[(e._index + 2) % 4].setLatLng(i[(r + 2) % 4]), this._cornerMarkers[(e._index + 3) % 4].setLatLng(i[(r + 3) % 4])) : this._cornerMarkers.forEach((s) => {
                  s.setLatLng(i[s._index]);
                });
              }
            },
            _findCorners() {
              this._angle === void 0 && this.setInitAngle(Pr(this._map, this._layer.getLatLngs()[0][0], this._layer.getLatLngs()[0][1]) || 0);
              let e = this._layer.getLatLngs()[0];
              return L.PM.Utils._getRotatedRectangle(e[0], e[2], this.getAngle(), this._map || this);
            }
          }), pe.CircleMarker = pe.extend({
            _shape: "CircleMarker",
            initialize(e) {
              this._layer = e, this._enabled = false, this._minRadiusOption = "minRadiusCircleMarker", this._maxRadiusOption = "maxRadiusCircleMarker", this._editableOption = "resizeableCircleMarker", this._updateHiddenPolyCircle();
            },
            enable(e = {
              draggable: true,
              snappable: true
            }) {
              if (L.Util.setOptions(this, e), this.options.editable && (this.options.resizeableCircleMarker = this.options.editable, delete this.options.editable), !this.options.allowEditing || !this._layer._map) {
                this.disable();
                return;
              }
              this._map = this._layer._map, this.enabled() && this.disable(), this.applyOptions(), this._layer.on("remove", this.disable, this), this._enabled = true, this._extendingEnable(), this._updateHiddenPolyCircle(), this._fireEnable();
            },
            _extendingEnable() {
              this._layer.on("pm:dragstart", this._onDragStart, this), this._layer.on("pm:drag", this._onMarkerDrag, this), this._layer.on("pm:dragend", this._onMarkerDragEnd, this);
            },
            disable() {
              this.dragging() || (this._map || (this._map = this._layer._map), this._map && this.enabled() && (this.layerDragEnabled() && this.disableLayerDrag(), this._helperLayers && (this._helperLayers.clearLayers(), this._helperLayers.removeFrom(this._map)), this.options[this._editableOption] ? (this._map.off("move", this._syncMarkers, this), this._outerMarker.off("drag", this._handleOuterMarkerSnapping, this)) : this._map.off("move", this._updateHiddenPolyCircle, this), this._extendingDisable(), this._layer.off("remove", this.disable, this), this._layerEdited && this._fireUpdate(), this._layerEdited = false, this._fireDisable(), this._enabled = false));
            },
            _extendingDisable() {
              this._layer.off("contextmenu", this._removeMarker, this);
            },
            enabled() {
              return this._enabled;
            },
            toggleEdit(e) {
              this.enabled() ? this.disable() : this.enable(e);
            },
            applyOptions() {
              this.options[this._editableOption] ? (this._initMarkers(), this._map.on("move", this._syncMarkers, this), this.options.snappable ? (this._initSnappableMarkers(), this._outerMarker.on("drag", this._handleOuterMarkerSnapping, this), this._outerMarker.on("move", this._syncHintLine, this), this._outerMarker.on("move", this._syncCircleRadius, this)) : this._disableSnapping()) : (this.options.draggable && this.enableLayerDrag(), this._map.on("move", this._updateHiddenPolyCircle, this), this.options.snappable ? this._initSnappableMarkersDrag() : this._disableSnappingDrag()), this._extendingApplyOptions();
            },
            _extendingApplyOptions() {
              this.options.preventMarkerRemoval || this._layer.on("contextmenu", this._removeMarker, this);
            },
            _initMarkers() {
              let e = this._map;
              this._helperLayers && (this._helperLayers.removeFrom(e), this._helperLayers.clearLayers()), this._helperLayers = new L.FeatureGroup(), this._helperLayers._pmTempLayer = true, this._helperLayers.addTo(e);
              let i = this._layer.getLatLng(), r = this._layer._radius, s = this._getLatLngOnCircle(i, r);
              this._centerMarker = this._createCenterMarker(i), this._outerMarker = this._createOuterMarker(s), this._markers = [
                this._centerMarker,
                this._outerMarker
              ], this._createHintLine(this._centerMarker, this._outerMarker);
            },
            _getLatLngOnCircle(e, i) {
              let r = this._map.project(e), s = L.point(r.x + i, r.y);
              return this._map.unproject(s);
            },
            _createHintLine(e, i) {
              let r = e.getLatLng(), s = i.getLatLng();
              this._hintline = L.polyline([
                r,
                s
              ], this.options.hintlineStyle), this._setPane(this._hintline, "layerPane"), this._hintline._pmTempLayer = true, this._helperLayers.addLayer(this._hintline);
            },
            _createCenterMarker(e) {
              let i = this._createMarker(e);
              return this.options.draggable ? (L.DomUtil.addClass(i._icon, "leaflet-pm-draggable"), i.on("move", this._moveCircle, this)) : i.dragging.disable(), i;
            },
            _createOuterMarker(e) {
              let i = this._createMarker(e);
              return i.on("drag", this._resizeCircle, this), i;
            },
            _createMarker(e) {
              let i = new L.Marker(e, {
                draggable: true,
                icon: L.divIcon({
                  className: "marker-icon"
                })
              });
              return this._setPane(i, "vertexPane"), i._origLatLng = e, i._pmTempLayer = true, i.on("dragstart", this._onMarkerDragStart, this), i.on("drag", this._onMarkerDrag, this), i.on("dragend", this._onMarkerDragEnd, this), i.on("click", this._onVertexClick, this), this._helperLayers.addLayer(i), i;
            },
            _moveCircle(e) {
              if (e.target._cancelDragEventChain) return;
              let i = this._centerMarker.getLatLng();
              this._layer.setLatLng(i);
              let r = this._layer._radius, s = this._getLatLngOnCircle(i, r);
              this._outerMarker._latlng = s, this._outerMarker.update(), this._syncHintLine(), this._updateHiddenPolyCircle(), this._fireCenterPlaced("Edit"), this._fireChange(this._layer.getLatLng(), "Edit");
            },
            _syncMarkers() {
              let e = this._layer.getLatLng(), i = this._layer._radius, r = this._getLatLngOnCircle(e, i);
              this._outerMarker.setLatLng(r), this._centerMarker.setLatLng(e), this._syncHintLine(), this._updateHiddenPolyCircle();
            },
            _resizeCircle() {
              this._outerMarker.setLatLng(this._getNewDestinationOfOuterMarker()), this._syncHintLine(), this._syncCircleRadius();
            },
            _syncCircleRadius() {
              let e = this._centerMarker.getLatLng(), i = this._outerMarker.getLatLng(), r = this._distanceCalculation(e, i);
              this.options[this._minRadiusOption] && r < this.options[this._minRadiusOption] ? this._layer.setRadius(this.options[this._minRadiusOption]) : this.options[this._maxRadiusOption] && r > this.options[this._maxRadiusOption] ? this._layer.setRadius(this.options[this._maxRadiusOption]) : this._layer.setRadius(r), this._updateHiddenPolyCircle(), this._fireChange(this._layer.getLatLng(), "Edit");
            },
            _syncHintLine() {
              let e = this._centerMarker.getLatLng(), i = this._outerMarker.getLatLng();
              this._hintline.setLatLngs([
                e,
                i
              ]);
            },
            _removeMarker() {
              this.options[this._editableOption] && this.disable(), this._layer.remove(), this._fireRemove(this._layer), this._fireRemove(this._map, this._layer);
            },
            _onDragStart() {
              this._map.pm.Draw.CircleMarker._layerIsDragging = true;
            },
            _onMarkerDragStart(e) {
              this._vertexValidation("move", e) && this._fireMarkerDragStart(e);
            },
            _onMarkerDrag(e) {
              let i = e.target;
              i instanceof L.Marker && !this._vertexValidationDrag(i) || this._fireMarkerDrag(e);
            },
            _onMarkerDragEnd(e) {
              this._extedingMarkerDragEnd();
              let i = e.target;
              this._vertexValidationDragEnd(i) && (this.options[this._editableOption] && (this._fireEdit(), this._layerEdited = true), this._fireMarkerDragEnd(e));
            },
            _extedingMarkerDragEnd() {
              this._map.pm.Draw.CircleMarker._layerIsDragging = false;
            },
            _initSnappableMarkersDrag() {
              let e = this._layer;
              this.options.snapDistance = this.options.snapDistance || 30, this.options.snapSegment = this.options.snapSegment === void 0 ? true : this.options.snapSegment, e.off("pm:drag", this._handleSnapping, this), e.on("pm:drag", this._handleSnapping, this), e.off("pm:dragend", this._cleanupSnapping, this), e.on("pm:dragend", this._cleanupSnapping, this), e.off("pm:dragstart", this._unsnap, this), e.on("pm:dragstart", this._unsnap, this);
            },
            _disableSnappingDrag() {
              let e = this._layer;
              e.off("pm:drag", this._handleSnapping, this), e.off("pm:dragend", this._cleanupSnapping, this), e.off("pm:dragstart", this._unsnap, this);
            },
            _updateHiddenPolyCircle() {
              let e = this._layer._map || this._map;
              if (e) {
                let i = L.PM.Utils.pxRadiusToMeterRadius(this._layer.getRadius(), e, this._layer.getLatLng()), r = L.circle(this._layer.getLatLng(), this._layer.options);
                r.setRadius(i);
                let s = e && e.pm._isCRSSimple();
                this._hiddenPolyCircle ? this._hiddenPolyCircle.setLatLngs(L.PM.Utils.circleToPolygon(r, 200, !s).getLatLngs()) : this._hiddenPolyCircle = L.PM.Utils.circleToPolygon(r, 200, !s), this._hiddenPolyCircle._parentCopy || (this._hiddenPolyCircle._parentCopy = this._layer);
              }
            },
            _getNewDestinationOfOuterMarker() {
              let e = this._centerMarker.getLatLng(), i = this._outerMarker.getLatLng(), r = this._distanceCalculation(e, i);
              return this.options[this._minRadiusOption] && r < this.options[this._minRadiusOption] ? i = Wi(this._map, e, i, this._getMinDistanceInMeter(e)) : this.options[this._maxRadiusOption] && r > this.options[this._maxRadiusOption] && (i = Wi(this._map, e, i, this._getMaxDistanceInMeter(e))), i;
            },
            _handleOuterMarkerSnapping() {
              if (this._outerMarker._snapped) {
                let e = this._centerMarker.getLatLng(), i = this._outerMarker.getLatLng(), r = this._distanceCalculation(e, i);
                this.options[this._minRadiusOption] && r < this.options[this._minRadiusOption] ? this._outerMarker.setLatLng(this._outerMarker._orgLatLng) : this.options[this._maxRadiusOption] && r > this.options[this._maxRadiusOption] && this._outerMarker.setLatLng(this._outerMarker._orgLatLng);
              }
              this._outerMarker.setLatLng(this._getNewDestinationOfOuterMarker());
            },
            _distanceCalculation(e, i) {
              return this._map.project(e).distanceTo(this._map.project(i));
            },
            _getMinDistanceInMeter(e) {
              return L.PM.Utils.pxRadiusToMeterRadius(this.options[this._minRadiusOption], this._map, e);
            },
            _getMaxDistanceInMeter(e) {
              return L.PM.Utils.pxRadiusToMeterRadius(this.options[this._maxRadiusOption], this._map, e);
            },
            _onVertexClick(e) {
              e.target._dragging || this._fireVertexClick(e, void 0);
            }
          }), pe.Circle = pe.CircleMarker.extend({
            _shape: "Circle",
            initialize(e) {
              this._layer = e, this._enabled = false, this._minRadiusOption = "minRadiusCircle", this._maxRadiusOption = "maxRadiusCircle", this._editableOption = "resizeableCircle", this._updateHiddenPolyCircle();
            },
            enable(e) {
              L.PM.Edit.CircleMarker.prototype.enable.call(this, e || {});
            },
            _extendingEnable() {
            },
            _extendingDisable() {
              this._layer.off("remove", this.disable, this);
              let e = this._layer._path ? this._layer._path : this._layer._renderer._container;
              L.DomUtil.removeClass(e, "leaflet-pm-draggable");
            },
            _extendingApplyOptions() {
            },
            _syncMarkers() {
            },
            _removeMarker() {
            },
            _onDragStart() {
            },
            _extedingMarkerDragEnd() {
            },
            _updateHiddenPolyCircle() {
              let e = this._map && this._map.pm._isCRSSimple();
              this._hiddenPolyCircle ? this._hiddenPolyCircle.setLatLngs(L.PM.Utils.circleToPolygon(this._layer, 200, !e).getLatLngs()) : this._hiddenPolyCircle = L.PM.Utils.circleToPolygon(this._layer, 200, !e), this._hiddenPolyCircle._parentCopy || (this._hiddenPolyCircle._parentCopy = this._layer);
            },
            _distanceCalculation(e, i) {
              return this._map.distance(e, i);
            },
            _getMinDistanceInMeter() {
              return this.options[this._minRadiusOption];
            },
            _getMaxDistanceInMeter() {
              return this.options[this._maxRadiusOption];
            },
            _onVertexClick(e) {
              e.target._dragging || this._fireVertexClick(e, void 0);
            }
          }), pe.ImageOverlay = pe.extend({
            _shape: "ImageOverlay",
            initialize(e) {
              this._layer = e, this._enabled = false;
            },
            toggleEdit(e) {
              this.enabled() ? this.disable() : this.enable(e);
            },
            enabled() {
              return this._enabled;
            },
            enable(e = {
              draggable: true,
              snappable: true
            }) {
              if (L.Util.setOptions(this, e), this._map = this._layer._map, !!this._map) {
                if (!this.options.allowEditing) {
                  this.disable();
                  return;
                }
                this.enabled() || this.disable(), this.enableLayerDrag(), this._layer.on("remove", this.disable, this), this._enabled = true, this._otherSnapLayers = this._findCorners(), this._fireEnable();
              }
            },
            disable() {
              this._dragging || (this._map || (this._map = this._layer._map), this.disableLayerDrag(), this._layer.off("remove", this.disable, this), this.enabled() || (this._layerEdited && this._fireUpdate(), this._layerEdited = false, this._fireDisable()), this._enabled = false);
            },
            _findCorners() {
              let e = this._layer.getBounds(), i = e.getNorthWest(), r = e.getNorthEast(), s = e.getSouthEast(), u = e.getSouthWest();
              return [
                i,
                r,
                s,
                u
              ];
            }
          }), pe.Text = pe.extend({
            _shape: "Text",
            initialize(e) {
              this._layer = e, this._enabled = false;
            },
            enable(e) {
              if (L.Util.setOptions(this, e), !!this.textArea) {
                if (!this.options.allowEditing || !this._layer._map) {
                  this.disable();
                  return;
                }
                this._map = this._layer._map, this.enabled() && this.disable(), this.applyOptions(), this._safeToCacheDragState = true, this._focusChange(), this.textArea.readOnly = false, this.textArea.classList.remove("pm-disabled"), this._layer.on("remove", this.disable, this), L.DomEvent.on(this.textArea, "input", this._autoResize, this), L.DomEvent.on(this.textArea, "focus", this._focusChange, this), L.DomEvent.on(this.textArea, "blur", this._focusChange, this), this._layer.on("dblclick", L.DomEvent.stop), L.DomEvent.off(this.textArea, "mousedown", this._preventTextSelection), this._enabled = true, this._fireEnable();
              }
            },
            disable() {
              if (!this.enabled()) return;
              this._layer.off("remove", this.disable, this), L.DomEvent.off(this.textArea, "input", this._autoResize, this), L.DomEvent.off(this.textArea, "focus", this._focusChange, this), L.DomEvent.off(this.textArea, "blur", this._focusChange, this), document.removeEventListener("click", this._documentClickThis, {
                capture: true
              }), this._focusChange(), this.textArea.readOnly = true, this.textArea.classList.add("pm-disabled");
              let e = document.activeElement;
              this.textArea.focus(), this.textArea.selectionStart = 0, this.textArea.selectionEnd = 0, L.DomEvent.on(this.textArea, "mousedown", this._preventTextSelection), e.focus(), this._disableOnBlurActive = false, this._layerEdited && this._fireUpdate(), this._layerEdited = false, this._fireDisable(), this._enabled = false;
            },
            enabled() {
              return this._enabled;
            },
            toggleEdit(e) {
              this.enabled() ? this.disable() : this.enable(e);
            },
            applyOptions() {
              this.options.snappable ? this._initSnappableMarkers() : this._disableSnapping();
            },
            _initSnappableMarkers() {
              let e = this._layer;
              this.options.snapDistance = this.options.snapDistance || 30, this.options.snapSegment = this.options.snapSegment === void 0 ? true : this.options.snapSegment, e.off("pm:drag", this._handleSnapping, this), e.on("pm:drag", this._handleSnapping, this), e.off("pm:dragend", this._cleanupSnapping, this), e.on("pm:dragend", this._cleanupSnapping, this), e.off("pm:dragstart", this._unsnap, this), e.on("pm:dragstart", this._unsnap, this);
            },
            _disableSnapping() {
              let e = this._layer;
              e.off("pm:drag", this._handleSnapping, this), e.off("pm:dragend", this._cleanupSnapping, this), e.off("pm:dragstart", this._unsnap, this);
            },
            _autoResize() {
              this.textArea.style.height = "1px", this.textArea.style.width = "1px";
              let e = this.textArea.scrollHeight > 21 ? this.textArea.scrollHeight : 21, i = this.textArea.scrollWidth > 16 ? this.textArea.scrollWidth : 16;
              this.textArea.style.height = `${e}px`, this.textArea.style.width = `${i}px`, this._layer.options.text = this.getText(), this._fireTextChange(this.getText());
            },
            _disableOnBlur() {
              this._disableOnBlurActive = true, setTimeout(() => {
                this.enabled() && (this._documentClickThis = this._documentClickThis || this._documentClick.bind(this), document.addEventListener("click", this._documentClickThis, {
                  capture: true
                }));
              }, 100);
            },
            _documentClick(e) {
              e.target !== this.textArea && (this.disable(), !this.getText() && this.options.removeIfEmpty && this.remove());
            },
            _focusChange(e = {}) {
              let i = this._hasFocus;
              this._hasFocus = e.type === "focus", !i != !this._hasFocus && (this._hasFocus ? (this._applyFocus(), this._focusText = this.getText(), this._fireTextFocus()) : (this._removeFocus(), this._fireTextBlur(), this._focusText !== this.getText() && (this._fireEdit(), this._layerEdited = true)));
            },
            _applyFocus() {
              this.textArea.classList.add("pm-hasfocus"), this._map.dragging && (this._safeToCacheDragState && (this._originalMapDragState = this._map.dragging._enabled, this._safeToCacheDragState = false), this._map.dragging.disable());
            },
            _removeFocus() {
              this._map.dragging && (this._originalMapDragState && this._map.dragging.enable(), this._safeToCacheDragState = true), this.textArea.classList.remove("pm-hasfocus");
            },
            focus() {
              if (!this.enabled()) throw new TypeError("Layer is not enabled");
              this.textArea.focus();
            },
            blur() {
              if (!this.enabled()) throw new TypeError("Layer is not enabled");
              this.textArea.blur(), this._disableOnBlurActive && this.disable();
            },
            hasFocus() {
              return this._hasFocus;
            },
            getElement() {
              return this.textArea;
            },
            setText(e) {
              e && (this.textArea.value = e), this._autoResize();
            },
            getText() {
              return this.textArea.value;
            },
            _initTextMarker() {
              if (this.textArea = L.PM.Draw.Text.prototype._createTextArea.call(this), this.options.className) {
                let i = this.options.className.split(" ");
                this.textArea.classList.add(...i);
              }
              let e = L.PM.Draw.Text.prototype._createTextIcon.call(this, this.textArea);
              this._layer.setIcon(e), this._layer.once("add", this._createTextMarker, this);
            },
            _createTextMarker(e = false) {
              this._layer.off("add", this._createTextMarker, this), this._layer.getElement().tabIndex = -1, this.textArea.wrap = "off", this.textArea.style.overflow = "hidden", this.textArea.style.height = L.DomUtil.getStyle(this.textArea, "font-size"), this.textArea.style.width = "1px", this._layer.options.text && this.setText(this._layer.options.text), this._autoResize(), e === true && (this.enable(), this.focus(), this._disableOnBlur());
            },
            _preventTextSelection(e) {
              e.preventDefault();
            }
          });
          var xo = function(e, i, r, s, u, c) {
            this._matrix = [
              e,
              i,
              r,
              s,
              u,
              c
            ];
          };
          xo.init = () => new L.PM.Matrix(1, 0, 0, 1, 0, 0), xo.prototype = {
            transform(e) {
              return this._transform(e.clone());
            },
            _transform(e) {
              let i = this._matrix, { x: r, y: s } = e;
              return e.x = i[0] * r + i[1] * s + i[4], e.y = i[2] * r + i[3] * s + i[5], e;
            },
            untransform(e) {
              let i = this._matrix;
              return new L.Point((e.x / i[0] - i[4]) / i[0], (e.y / i[2] - i[5]) / i[2]);
            },
            clone() {
              let e = this._matrix;
              return new L.PM.Matrix(e[0], e[1], e[2], e[3], e[4], e[5]);
            },
            translate(e) {
              if (e === void 0) return new L.Point(this._matrix[4], this._matrix[5]);
              let i, r;
              return typeof e == "number" ? (i = e, r = e) : (i = e.x, r = e.y), this._add(1, 0, 0, 1, i, r);
            },
            scale(e, i) {
              if (e === void 0) return new L.Point(this._matrix[0], this._matrix[3]);
              let r, s;
              return i = i || L.point(0, 0), typeof e == "number" ? (r = e, s = e) : (r = e.x, s = e.y), this._add(r, 0, 0, s, i.x, i.y)._add(1, 0, 0, 1, -i.x, -i.y);
            },
            rotate(e, i) {
              let r = Math.cos(e), s = Math.sin(e);
              return i = i || new L.Point(0, 0), this._add(r, s, -s, r, i.x, i.y)._add(1, 0, 0, 1, -i.x, -i.y);
            },
            flip() {
              return this._matrix[1] *= -1, this._matrix[2] *= -1, this;
            },
            _add(e, i, r, s, u, c) {
              let p = [
                [],
                [],
                []
              ], f = this._matrix, m = [
                [
                  f[0],
                  f[2],
                  f[4]
                ],
                [
                  f[1],
                  f[3],
                  f[5]
                ],
                [
                  0,
                  0,
                  1
                ]
              ], y = [
                [
                  e,
                  r,
                  u
                ],
                [
                  i,
                  s,
                  c
                ],
                [
                  0,
                  0,
                  1
                ]
              ], A;
              e && e instanceof L.PM.Matrix && (f = e._matrix, y = [
                [
                  f[0],
                  f[2],
                  f[4]
                ],
                [
                  f[1],
                  f[3],
                  f[5]
                ],
                [
                  0,
                  0,
                  1
                ]
              ]);
              for (let C = 0; C < 3; C += 1) for (let O = 0; O < 3; O += 1) {
                A = 0;
                for (let R = 0; R < 3; R += 1) A += m[C][R] * y[R][O];
                p[C][O] = A;
              }
              return this._matrix = [
                p[0][0],
                p[1][0],
                p[0][1],
                p[1][1],
                p[0][2],
                p[1][2]
              ], this;
            }
          };
          var xl = xo, El = {
            calcMiddleLatLng(e, i, r) {
              let s = e.project(i), u = e.project(r);
              return e.unproject(s._add(u)._divideBy(2));
            },
            findLayers(e) {
              let i = [];
              return e.eachLayer((r) => {
                (r instanceof L.Polyline || r instanceof L.Marker || r instanceof L.Circle || r instanceof L.CircleMarker || r instanceof L.ImageOverlay) && i.push(r);
              }), i = i.filter((r) => !!r.pm), i = i.filter((r) => !r._pmTempLayer), i = i.filter((r) => !L.PM.optIn && !r.options.pmIgnore || L.PM.optIn && r.options.pmIgnore === false), i;
            },
            circleToPolygon(e, i = 60, r = true) {
              let s = e.getLatLng(), u = e.getRadius(), c = Hi(s, u, i, 0, r), p = [];
              for (let f = 0; f < c.length; f += 1) {
                let m = [
                  c[f].lat,
                  c[f].lng
                ];
                p.push(m);
              }
              return L.polygon(p, e.options);
            },
            disablePopup(e) {
              e.getPopup() && (e._tempPopupCopy = e.getPopup(), e.unbindPopup());
            },
            enablePopup(e) {
              e._tempPopupCopy && (e.bindPopup(e._tempPopupCopy), delete e._tempPopupCopy);
            },
            _fireEvent(e, i, r, s = false) {
              e.fire(i, r, s);
              let { groups: u } = this.getAllParentGroups(e);
              u.forEach((c) => {
                c.fire(i, r, s);
              });
            },
            getAllParentGroups(e) {
              let i = [], r = [], s = (u) => {
                for (let c in u._eventParents) if (i.indexOf(c) === -1) {
                  i.push(c);
                  let p = u._eventParents[c];
                  r.push(p), s(p);
                }
              };
              return !e._pmLastGroupFetch || !e._pmLastGroupFetch.time || (/* @__PURE__ */ new Date()).getTime() - e._pmLastGroupFetch.time > 1e3 ? (s(e), e._pmLastGroupFetch = {
                time: (/* @__PURE__ */ new Date()).getTime(),
                groups: r,
                groupIds: i
              }, {
                groupIds: i,
                groups: r
              }) : {
                groups: e._pmLastGroupFetch.groups,
                groupIds: e._pmLastGroupFetch.groupIds
              };
            },
            createGeodesicPolygon: Hi,
            getTranslation: At,
            findDeepCoordIndex(e, i, r = true) {
              let s, u = (p) => (f, m) => {
                let y = p.concat(m);
                if (r) {
                  if (f.lat && f.lat === i.lat && f.lng === i.lng) return s = y, true;
                } else if (f.lat && L.latLng(f).equals(i)) return s = y, true;
                return Array.isArray(f) && f.some(u(y));
              };
              e.some(u([]));
              let c = {};
              return s && (c = {
                indexPath: s,
                index: s[s.length - 1],
                parentPath: s.slice(0, s.length - 1)
              }), c;
            },
            findDeepMarkerIndex(e, i) {
              let r, s = (c) => (p, f) => {
                let m = c.concat(f);
                return p._leaflet_id === i._leaflet_id ? (r = m, true) : Array.isArray(p) && p.some(s(m));
              };
              e.some(s([]));
              let u = {};
              return r && (u = {
                indexPath: r,
                index: r[r.length - 1],
                parentPath: r.slice(0, r.length - 1)
              }), u;
            },
            _getIndexFromSegment(e, i) {
              if (i && i.length === 2) {
                let r = this.findDeepCoordIndex(e, i[0]), s = this.findDeepCoordIndex(e, i[1]), u = Math.max(r.index, s.index);
                return (r.index === 0 || s.index === 0) && u !== 1 && (u += 1), {
                  indexA: r,
                  indexB: s,
                  newIndex: u,
                  indexPath: r.indexPath,
                  parentPath: r.parentPath
                };
              }
              return null;
            },
            _getRotatedRectangle(e, i, r, s) {
              let u = er(s, e), c = er(s, i), p = r * Math.PI / 180, f = Math.cos(p), m = Math.sin(p), y = (c.x - u.x) * f + (c.y - u.y) * m, A = (c.y - u.y) * f - (c.x - u.x) * m, C = y * f + u.x, O = y * m + u.y, R = -A * m + u.x, H = A * f + u.y, K = ma(s, u), it = ma(s, {
                x: C,
                y: O
              }), st = ma(s, c), k = ma(s, {
                x: R,
                y: H
              });
              return [
                K,
                it,
                st,
                k
              ];
            },
            pxRadiusToMeterRadius(e, i, r) {
              let s = i.project(r), u = L.point(s.x + e, s.y);
              return i.distance(i.unproject(u), r);
            }
          }, Ml = El;
          L.PM = L.PM || {
            version: qt.version,
            Map: Ye,
            Toolbar: Rs,
            Draw: re,
            Edit: pe,
            Utils: Ml,
            Matrix: xl,
            activeLang: "en",
            optIn: false,
            initialize(e) {
              this.addInitHooks(e);
            },
            setOptIn(e) {
              this.optIn = !!e;
            },
            addInitHooks() {
              function e() {
                this.pm = void 0, L.PM.optIn ? this.options.pmIgnore === false && (this.pm = new L.PM.Map(this)) : this.options.pmIgnore || (this.pm = new L.PM.Map(this)), this.pm && this.pm.setGlobalOptions({});
              }
              L.Map.addInitHook(e);
              function i() {
                this.pm = void 0, L.PM.optIn ? this.options.pmIgnore === false && (this.pm = new L.PM.Edit.LayerGroup(this)) : this.options.pmIgnore || (this.pm = new L.PM.Edit.LayerGroup(this));
              }
              L.LayerGroup.addInitHook(i);
              function r() {
                this.pm = void 0, L.PM.optIn ? this.options.pmIgnore === false && (this.options.textMarker ? (this.pm = new L.PM.Edit.Text(this), this.options._textMarkerOverPM || this.pm._initTextMarker(), delete this.options._textMarkerOverPM) : this.pm = new L.PM.Edit.Marker(this)) : this.options.pmIgnore || (this.options.textMarker ? (this.pm = new L.PM.Edit.Text(this), this.options._textMarkerOverPM || this.pm._initTextMarker(), delete this.options._textMarkerOverPM) : this.pm = new L.PM.Edit.Marker(this));
              }
              L.Marker.addInitHook(r);
              function s() {
                this.pm = void 0, L.PM.optIn ? this.options.pmIgnore === false && (this.pm = new L.PM.Edit.CircleMarker(this)) : this.options.pmIgnore || (this.pm = new L.PM.Edit.CircleMarker(this));
              }
              L.CircleMarker.addInitHook(s);
              function u() {
                this.pm = void 0, L.PM.optIn ? this.options.pmIgnore === false && (this.pm = new L.PM.Edit.Line(this)) : this.options.pmIgnore || (this.pm = new L.PM.Edit.Line(this));
              }
              L.Polyline.addInitHook(u);
              function c() {
                this.pm = void 0, L.PM.optIn ? this.options.pmIgnore === false && (this.pm = new L.PM.Edit.Polygon(this)) : this.options.pmIgnore || (this.pm = new L.PM.Edit.Polygon(this));
              }
              L.Polygon.addInitHook(c);
              function p() {
                this.pm = void 0, L.PM.optIn ? this.options.pmIgnore === false && (this.pm = new L.PM.Edit.Rectangle(this)) : this.options.pmIgnore || (this.pm = new L.PM.Edit.Rectangle(this));
              }
              L.Rectangle.addInitHook(p);
              function f() {
                this.pm = void 0, L.PM.optIn ? this.options.pmIgnore === false && (this.pm = new L.PM.Edit.Circle(this)) : this.options.pmIgnore || (this.pm = new L.PM.Edit.Circle(this));
              }
              L.Circle.addInitHook(f);
              function m() {
                this.pm = void 0, L.PM.optIn ? this.options.pmIgnore === false && (this.pm = new L.PM.Edit.ImageOverlay(this)) : this.options.pmIgnore || (this.pm = new L.PM.Edit.ImageOverlay(this));
              }
              L.ImageOverlay.addInitHook(m);
            },
            reInitLayer(e) {
              e instanceof L.LayerGroup && e.eachLayer((i) => {
                this.reInitLayer(i);
              }), e.pm || L.PM.optIn && e.options.pmIgnore !== false || e.options.pmIgnore || (e instanceof L.Map ? e.pm = new L.PM.Map(e) : e instanceof L.Marker ? e.options.textMarker ? (e.pm = new L.PM.Edit.Text(e), e.pm._initTextMarker(), e.pm._createTextMarker(false)) : e.pm = new L.PM.Edit.Marker(e) : e instanceof L.Circle ? e.pm = new L.PM.Edit.Circle(e) : e instanceof L.CircleMarker ? e.pm = new L.PM.Edit.CircleMarker(e) : e instanceof L.Rectangle ? e.pm = new L.PM.Edit.Rectangle(e) : e instanceof L.Polygon ? e.pm = new L.PM.Edit.Polygon(e) : e instanceof L.Polyline ? e.pm = new L.PM.Edit.Line(e) : e instanceof L.LayerGroup ? e.pm = new L.PM.Edit.LayerGroup(e) : e instanceof L.ImageOverlay && (e.pm = new L.PM.Edit.ImageOverlay(e)));
            }
          }, L.version === "1.7.1" && L.Canvas.include({
            _onClick(e) {
              let i = this._map.mouseEventToLayerPoint(e), r, s;
              for (let u = this._drawFirst; u; u = u.next) r = u.layer, r.options.interactive && r._containsPoint(i) && (!(e.type === "click" || e.type === "preclick") || !this._map._draggableMoved(r)) && (s = r);
              s && (L.DomEvent.fakeStop(e), this._fireEvent([
                s
              ], e));
            }
          }), L.PM.initialize();
        })()), fu;
      }
      Dl();
      class Il {
        constructor() {
          this.waypoints = [], this.wpMarkers = [], this.routeLayer = null, this.isZooming = false, this.lastOpacity = 0.4, this.drawModeActive = false, this.onWaypointsChanged = () => {
          }, this.getSimState = () => "stopped", this.onMapClick = (o) => {
            !this.drawModeActive || this.getSimState() !== "stopped" || (this.waypoints.push({
              lat: o.latlng.lat,
              lng: o.latlng.lng
            }), this.refreshRoute(), this.onWaypointsChanged());
          }, this.map = sn.map("map", {
            zoomAnimation: true
          }).setView([
            57.7069,
            11.9381
          ], 15), sn.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: "&copy; OpenStreetMap"
          }).addTo(this.map), this.map.pm.addControls({
            position: "topleft",
            drawMarker: false,
            drawCircle: false,
            drawCircleMarker: false,
            drawPolygon: false,
            drawRectangle: false,
            drawText: false,
            editMode: false,
            dragMode: false,
            cutPolygon: false,
            removalMode: false,
            rotateMode: false,
            drawPolyline: false
          }), this.droneMarker = sn.marker([
            57.7069,
            11.9381
          ], {
            icon: this.createDroneIcon(0.4),
            zIndexOffset: 1e3
          }).addTo(this.map), this.map.on("zoomstart", () => {
            this.isZooming = true;
          }), this.map.on("zoomend", () => {
            this.isZooming = false;
          });
        }
        createWpIcon(o) {
          const l = Pn("--alert-caution-color") || "rgb(233,195,0)", g = Pn("--on-caution-color") || "#000", x = Pn("--container-section-color") || "#121212";
          return sn.divIcon({
            className: "",
            html: `<div style="
        width:24px;height:24px;border-radius:50%;
        background:${l};color:${g};
        font-weight:700;font-size:11px;
        font-family:'Noto Sans',sans-serif;
        display:flex;align-items:center;justify-content:center;
        border:2px solid ${x};
        box-shadow:0 1px 4px rgba(0,0,0,.55)">${o}</div>`,
            iconSize: [
              24,
              24
            ],
            iconAnchor: [
              12,
              12
            ]
          });
        }
        createDroneIcon(o) {
          o === void 0 && (o = 1), this.lastOpacity = o;
          const l = Pn("--instrument-enhanced-primary-color") || "rgb(90,132,191)", g = Pn("--container-backdrop-color") || "rgb(3,3,3)", x = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
      <path d="M20,3 L30,14 L28,34 Q20,38 12,34 L10,14 Z"
            fill="${l}" stroke="${g}" stroke-width="1.5" stroke-linejoin="round"/>
      <line x1="20" y1="7" x2="20" y2="30"
            stroke="${g}" stroke-width="1.2" opacity="0.5"/>
      <rect x="15" y="18" width="10" height="8" rx="2"
            fill="${g}" opacity="0.7"/>
      <polygon points="20,3 17,10 23,10" fill="white" opacity="0.4"/>
    </svg>`;
          return sn.divIcon({
            className: "",
            html: `<div id="drone-icon-inner" style="
        width:40px;height:40px;opacity:${o};
        transform-origin:center;
        transition:opacity 0.3s">${x}</div>`,
            iconSize: [
              40,
              40
            ],
            iconAnchor: [
              20,
              20
            ]
          });
        }
        refreshRoute() {
          for (const g of this.wpMarkers) g.remove();
          if (this.wpMarkers = [], this.routeLayer && (this.routeLayer.remove(), this.routeLayer = null), this.waypoints.length === 0) return;
          const o = this.drawModeActive && this.getSimState() === "stopped";
          for (let g = 0; g < this.waypoints.length; g++) {
            const x = this.waypoints[g], S = sn.marker([
              x.lat,
              x.lng
            ], {
              icon: this.createWpIcon(g + 1),
              draggable: o
            }).addTo(this.map);
            ((M) => {
              S.on("dragend", () => {
                const J = S.getLatLng();
                this.waypoints[M] = {
                  lat: J.lat,
                  lng: J.lng
                }, this.refreshRoute(), this.onWaypointsChanged();
              }), S.on("contextmenu", () => {
                this.waypoints.splice(M, 1), this.refreshRoute(), this.onWaypointsChanged();
              });
            })(g), this.wpMarkers.push(S);
          }
          const l = Pn("--instrument-enhanced-primary-color") || "#5a84bf";
          this.routeLayer = sn.polyline(this.waypoints.map((g) => [
            g.lat,
            g.lng
          ]), {
            color: l,
            weight: 3,
            opacity: 0.85
          }).addTo(this.map);
        }
        updateWaypointDraggability() {
          const o = this.drawModeActive && this.getSimState() === "stopped";
          for (const l of this.wpMarkers) o ? l.dragging.enable() : l.dragging.disable();
        }
        toggleDrawMode() {
          this.getSimState() === "stopped" && (this.drawModeActive = !this.drawModeActive, this.drawModeActive ? this.map.on("click", this.onMapClick) : this.map.off("click", this.onMapClick), this.updateWaypointDraggability());
        }
        disableDrawMode() {
          this.drawModeActive = false, this.map.off("click", this.onMapClick);
        }
        updateDronePosition(o, l, g, x) {
          const S = sn.latLng(o, l);
          this.droneMarker.setLatLng(S), x === "playing" && !this.isZooming && this.map.panTo(S, {
            animate: true,
            duration: 0.1
          });
          const M = this.droneMarker.getElement(), J = M && M.querySelector("#drone-icon-inner");
          J && (J.style.transform = `rotate(${g}deg)`);
          const et = x === "playing" ? 1 : 0.4;
          J && (J.style.opacity = String(et), this.lastOpacity = et);
        }
        refreshDroneIcon() {
          this.droneMarker.setIcon(this.createDroneIcon(this.lastOpacity));
        }
        clearWaypoints() {
          this.waypoints = [];
          for (const o of this.wpMarkers) o.remove();
          this.wpMarkers = [], this.routeLayer && (this.routeLayer.remove(), this.routeLayer = null);
        }
      }
      class Ol {
        constructor(o) {
          this.callbacks = o, this.btnDraw = document.getElementById("btn-draw"), this.btnPlay = document.getElementById("btn-play"), this.btnPause = document.getElementById("btn-pause"), this.btnStop = document.getElementById("btn-stop"), this.btnClear = document.getElementById("btn-clear"), this.speedInput = document.getElementById("speed-input"), this.btnSettings = document.getElementById("btn-settings"), this.simStatusBadge = document.getElementById("sim-status-badge"), this.simStatusText = document.getElementById("sim-status-text"), this.simState = "stopped", this.drawModeActive = false, this.btnPlay.addEventListener("click", () => o.onPlay()), this.btnPause.addEventListener("click", () => o.onPause()), this.btnStop.addEventListener("click", () => o.onStop()), this.btnClear.addEventListener("click", () => o.onClear()), this.btnDraw.addEventListener("click", () => o.onDrawToggle()), this.btnSettings.addEventListener("click", () => o.onSettingsOpen()), this.speedInput.addEventListener("change", () => {
            o.onSpeedChange(parseFloat(this.speedInput.value));
          });
        }
        setDrawModeActive(o) {
          this.drawModeActive = o, this.btnDraw.classList.toggle("active", o);
        }
        updateControlStates(o) {
          const l = this.simState === "stopped", g = l && o >= 2 || this.simState === "paused";
          this.btnPlay.disabled = !g, this.btnPause.disabled = this.simState !== "playing", this.btnStop.disabled = this.simState === "stopped", this.btnClear.disabled = !l, this.btnDraw.disabled = !l, !l && this.drawModeActive && (this.drawModeActive = false, this.btnDraw.classList.remove("active")), this.simState === "playing" ? (this.simStatusBadge.classList.add("visible"), this.simStatusBadge.classList.remove("paused"), this.simStatusText.textContent = "Running") : this.simState === "paused" ? (this.simStatusBadge.classList.add("visible", "paused"), this.simStatusText.textContent = "Paused") : this.simStatusBadge.classList.remove("visible", "paused");
        }
      }
      var ko, mu;
      function Rl() {
        return mu || (mu = 1, ko = (function(h) {
          var o = {};
          function l(g) {
            if (o[g]) return o[g].exports;
            var x = o[g] = {
              i: g,
              l: false,
              exports: {}
            };
            return h[g].call(x.exports, x, x.exports, l), x.l = true, x.exports;
          }
          return l.m = h, l.c = o, l.d = function(g, x, S) {
            l.o(g, x) || Object.defineProperty(g, x, {
              enumerable: true,
              get: S
            });
          }, l.r = function(g) {
            typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(g, Symbol.toStringTag, {
              value: "Module"
            }), Object.defineProperty(g, "__esModule", {
              value: true
            });
          }, l.t = function(g, x) {
            if (1 & x && (g = l(g)), 8 & x || 4 & x && typeof g == "object" && g && g.__esModule) return g;
            var S = /* @__PURE__ */ Object.create(null);
            if (l.r(S), Object.defineProperty(S, "default", {
              enumerable: true,
              value: g
            }), 2 & x && typeof g != "string") for (var M in g) l.d(S, M, (function(J) {
              return g[J];
            }).bind(null, M));
            return S;
          }, l.n = function(g) {
            var x = g && g.__esModule ? function() {
              return g.default;
            } : function() {
              return g;
            };
            return l.d(x, "a", x), x;
          }, l.o = function(g, x) {
            return Object.prototype.hasOwnProperty.call(g, x);
          }, l.p = "", l(l.s = 1);
        })([
          function(h, o, l) {
            var g = l(2), x = l(3), S = l(4);
            h.exports = function(M) {
              return g(M) || x(M) || S();
            };
          },
          function(h, o, l) {
            l.r(o), l.d(o, "sparkline", function() {
              return et;
            });
            var g = l(0), x = l.n(g);
            function S(_t, wt, ht, Nt) {
              return parseFloat((wt - Nt * wt / _t + ht).toFixed(2));
            }
            function M(_t) {
              return _t.value;
            }
            function J(_t, wt) {
              var ht = document.createElementNS("http://www.w3.org/2000/svg", _t);
              for (var Nt in wt) ht.setAttribute(Nt, wt[Nt]);
              return ht;
            }
            function et(_t, wt, ht) {
              var Nt;
              if (Nt = _t, x()(Nt.querySelectorAll("*")).forEach(function(Mt) {
                return Nt.removeChild(Mt);
              }), !(wt.length <= 1)) {
                ht = ht || {}, typeof wt[0] == "number" && (wt = wt.map(function(Mt) {
                  return {
                    value: Mt
                  };
                }));
                var ie = ht.onmousemove, ne = ht.onmouseout, gt = "interactive" in ht ? ht.interactive : !!ie, le = ht.spotRadius || 2, Zt = 2 * le, yt = ht.cursorWidth || 2, W = parseFloat(_t.attributes["stroke-width"].value), ot = ht.fetch || M, he = wt.map(function(Mt) {
                  return ot(Mt);
                }), Pe = parseFloat(_t.attributes.width.value) - 2 * Zt, Ne = parseFloat(_t.attributes.height.value), Ci = Ne - 2 * W - Zt, li = Math.max.apply(Math, x()(he)), G = -1e3, Ut = he.length - 1, ce = Pe / Ut, xi = [], Ue = S(li, Ci, W + le, he[0]), dn = "M".concat(Zt, " ").concat(Ue);
                he.forEach(function(Mt, Kt) {
                  var jt = Kt * ce + Zt, Ot = S(li, Ci, W + le, Mt);
                  xi.push(Object.assign({}, wt[Kt], {
                    index: Kt,
                    x: jt,
                    y: Ot
                  })), dn += " L ".concat(jt, " ").concat(Ot);
                });
                var _e = J("path", {
                  class: "sparkline--line",
                  d: dn,
                  fill: "none"
                }), Ei = J("path", {
                  class: "sparkline--fill",
                  d: "".concat(dn, " V ").concat(Ne, " L ").concat(Zt, " ").concat(Ne, " Z"),
                  stroke: "none"
                });
                if (_t.appendChild(Ei), _t.appendChild(_e), gt) {
                  var pt = J("line", {
                    class: "sparkline--cursor",
                    x1: G,
                    x2: G,
                    y1: 0,
                    y2: Ne,
                    "stroke-width": yt
                  }), hi = J("circle", {
                    class: "sparkline--spot",
                    cx: G,
                    cy: G,
                    r: le
                  });
                  _t.appendChild(pt), _t.appendChild(hi);
                  var dt = J("rect", {
                    width: _t.attributes.width.value,
                    height: _t.attributes.height.value,
                    style: "fill: transparent; stroke: transparent",
                    class: "sparkline--interaction-layer"
                  });
                  _t.appendChild(dt), dt.addEventListener("mouseout", function(Mt) {
                    pt.setAttribute("x1", G), pt.setAttribute("x2", G), hi.setAttribute("cx", G), ne && ne(Mt);
                  }), dt.addEventListener("mousemove", function(Mt) {
                    var Kt = Mt.offsetX, jt = xi.find(function(We) {
                      return We.x >= Kt;
                    });
                    jt || (jt = xi[Ut]);
                    var Ot, Bt = xi[xi.indexOf(jt) - 1], Ct = (Ot = Bt ? Bt.x + (jt.x - Bt.x) / 2 <= Kt ? jt : Bt : jt).x, Ge = Ot.y;
                    hi.setAttribute("cx", Ct), hi.setAttribute("cy", Ge), pt.setAttribute("x1", Ct), pt.setAttribute("x2", Ct), ie && ie(Mt, Ot);
                  });
                }
              }
            }
            o.default = et;
          },
          function(h, o) {
            h.exports = function(l) {
              if (Array.isArray(l)) {
                for (var g = 0, x = new Array(l.length); g < l.length; g++) x[g] = l[g];
                return x;
              }
            };
          },
          function(h, o) {
            h.exports = function(l) {
              if (Symbol.iterator in Object(l) || Object.prototype.toString.call(l) === "[object Arguments]") return Array.from(l);
            };
          },
          function(h, o) {
            h.exports = function() {
              throw new TypeError("Invalid attempt to spread non-iterable instance");
            };
          }
        ])), ko;
      }
      var Fl = Rl();
      const zl = 600, an = {
        heading: [],
        speed: [],
        roll: [],
        pitch: []
      }, ir = {
        heading: document.getElementById("gauge-heading"),
        speed: document.getElementById("gauge-speed"),
        roll: document.getElementById("gauge-roll"),
        pitch: document.getElementById("gauge-pitch")
      }, Ao = {
        heading: document.getElementById("spark-heading"),
        speed: document.getElementById("spark-speed"),
        roll: document.getElementById("spark-roll"),
        pitch: document.getElementById("spark-pitch")
      }, va = document.getElementById("health-level"), gu = document.getElementById("health-subsystems");
      function Nl(h) {
        if (!h) {
          va.textContent = "\u2014", va.removeAttribute("data-level"), gu.innerHTML = "";
          return;
        }
        va.textContent = h.level.toUpperCase(), va.setAttribute("data-level", h.level);
        const o = h.subsystems.map((l) => {
          const g = l.detail ? ` (${l.detail})` : "";
          return `<div class="health-sub-row">
      <span class="health-sub-name">${l.name}</span>
      <span class="health-sub-level" data-level="${l.level}">${l.level.toUpperCase()}${g}</span>
    </div>`;
        });
        gu.innerHTML = o.join("");
      }
      function Ul(h) {
        if (Nl(h.health), h.state === "stopped") {
          for (const l of Object.keys(an)) an[l] = [];
          for (const l of Object.keys(ir)) ir[l].textContent = "\u2014";
          return;
        }
        if (h.state === "playing") {
          const l = {
            heading: h.heading,
            speed: h.speed * 1.94384,
            roll: h.roll,
            pitch: h.pitch
          };
          for (const g of Object.keys(an)) an[g].push(l[g]), an[g].length > zl && an[g].shift();
          ir.heading.textContent = h.heading.toFixed(1), ir.speed.textContent = (h.speed * 1.94384).toFixed(2), ir.roll.textContent = h.roll.toFixed(2), ir.pitch.textContent = h.pitch.toFixed(2);
        }
        const o = Pn("--instrument-enhanced-primary-color") || "#5a84bf";
        for (const l of Object.keys(Ao)) an[l].length > 1 && (Ao[l].style.stroke = o, Fl.sparkline(Ao[l], an[l]));
      }
      const Pu = [
        "location_fix",
        "heading_true_north_deg",
        "speed_over_ground_knots",
        "roll_deg",
        "pitch_deg"
      ], Gl = [
        [
          "sl-roll-amp",
          "lbl-roll-amp"
        ],
        [
          "sl-roll-period",
          "lbl-roll-period"
        ],
        [
          "sl-pitch-amp",
          "lbl-pitch-amp"
        ],
        [
          "sl-pitch-period",
          "lbl-pitch-period"
        ],
        [
          "sl-loc-noise",
          "lbl-loc-noise"
        ]
      ];
      function Zl() {
        const h = document.getElementById("subject-rows");
        h.innerHTML = "";
        const o = {
          location_fix: {
            rate_hz: 1,
            source_id: "gnss/0"
          },
          heading_true_north_deg: {
            rate_hz: 1,
            source_id: "imu/0"
          },
          speed_over_ground_knots: {
            rate_hz: 1,
            source_id: "imu/0"
          },
          roll_deg: {
            rate_hz: 1,
            source_id: "imu/0"
          },
          pitch_deg: {
            rate_hz: 1,
            source_id: "imu/0"
          }
        };
        for (const l of Pu) {
          const g = o[l], x = document.createElement("tr");
          x.innerHTML = `
      <td>${l}</td>
      <td><input type="number" class="settings-input" data-subj="${l}" data-field="rate_hz"
          value="${g.rate_hz}" min="0.1" max="10" step="0.1" style="width:58px"></td>
      <td><input type="text" class="settings-input" data-subj="${l}" data-field="source_id"
          value="${g.source_id}" style="width:80px"></td>`, h.appendChild(x);
        }
      }
      function Tu(h) {
        for (const l of Pu) {
          const g = h.subjects[l];
          if (!g) continue;
          const x = document.querySelector(`#subject-rows input[data-subj="${l}"][data-field="rate_hz"]`), S = document.querySelector(`#subject-rows input[data-subj="${l}"][data-field="source_id"]`);
          x && (x.value = String(g.rate_hz)), S && (S.value = g.source_id);
        }
        const o = {
          roll_amplitude_deg: [
            "sl-roll-amp",
            "lbl-roll-amp"
          ],
          roll_period_s: [
            "sl-roll-period",
            "lbl-roll-period"
          ],
          pitch_amplitude_deg: [
            "sl-pitch-amp",
            "lbl-pitch-amp"
          ],
          pitch_period_s: [
            "sl-pitch-period",
            "lbl-pitch-period"
          ],
          location_noise_sigma_m: [
            "sl-loc-noise",
            "lbl-loc-noise"
          ]
        };
        for (const [l, [g, x]] of Object.entries(o)) {
          const S = h[l];
          S !== void 0 && (document.getElementById(g).value = String(S), document.getElementById(x).textContent = String(S));
        }
      }
      function jl(h) {
        for (const [o, l] of Gl) document.getElementById(o).addEventListener("input", function() {
          document.getElementById(l).textContent = this.value;
        });
        document.getElementById("btn-settings").addEventListener("click", () => {
          document.getElementById("settings-overlay").style.display = "flex";
        }), document.getElementById("btn-settings-close").addEventListener("click", () => {
          document.getElementById("settings-overlay").style.display = "none";
        }), document.getElementById("settings-overlay").addEventListener("click", function(o) {
          o.target === this && (this.style.display = "none");
        }), document.getElementById("btn-settings-save").addEventListener("click", () => {
          const o = {};
          for (const g of document.querySelectorAll("#subject-rows input")) {
            const x = g.dataset.subj, S = g.dataset.field;
            o[x] || (o[x] = {
              rate_hz: 1,
              source_id: ""
            }), S === "rate_hz" ? o[x].rate_hz = parseFloat(g.value) : o[x].source_id = g.value;
          }
          const l = {
            subjects: o,
            roll_amplitude_deg: parseFloat(document.getElementById("sl-roll-amp").value),
            roll_period_s: parseFloat(document.getElementById("sl-roll-period").value),
            pitch_amplitude_deg: parseFloat(document.getElementById("sl-pitch-amp").value),
            pitch_period_s: parseFloat(document.getElementById("sl-pitch-period").value),
            location_noise_sigma_m: parseFloat(document.getElementById("sl-loc-noise").value)
          };
          h(l), document.getElementById("settings-overlay").style.display = "none";
        });
      }
      const ql = "/assets/zenoh_keyexpr_wrapper_bg-Dc8Z_9zx.wasm", Vl = async (h = {}, o) => {
        let l;
        if (o.startsWith("data:")) {
          const g = o.replace(/^data:.*?base64,/, "");
          let x;
          if (typeof Buffer == "function" && typeof Buffer.from == "function") x = Buffer.from(g, "base64");
          else if (typeof atob == "function") {
            const S = atob(g);
            x = new Uint8Array(S.length);
            for (let M = 0; M < S.length; M++) x[M] = S.charCodeAt(M);
          } else throw new Error("Cannot decode base64-encoded data URL");
          l = await WebAssembly.instantiate(x, h);
        } else {
          const g = await fetch(o), x = g.headers.get("Content-Type") || "";
          if ("instantiateStreaming" in WebAssembly && x.startsWith("application/wasm")) l = await WebAssembly.instantiateStreaming(g, h);
          else {
            const S = await g.arrayBuffer();
            l = await WebAssembly.instantiate(S, h);
          }
        }
        return l.instance.exports;
      };
      let Tt;
      function Hl(h) {
        Tt = h;
      }
      const Wl = typeof TextDecoder > "u" ? (0, module.require)("util").TextDecoder : TextDecoder;
      let Su = new Wl("utf-8", {
        ignoreBOM: true,
        fatal: true
      });
      Su.decode();
      let La = null;
      function wa() {
        return (La === null || La.byteLength === 0) && (La = new Uint8Array(Tt.memory.buffer)), La;
      }
      function es(h, o) {
        return h = h >>> 0, Su.decode(wa().subarray(h, h + o));
      }
      let ni = 0;
      const Kl = typeof TextEncoder > "u" ? (0, module.require)("util").TextEncoder : TextEncoder;
      let Ca = new Kl("utf-8");
      const Yl = typeof Ca.encodeInto == "function" ? function(h, o) {
        return Ca.encodeInto(h, o);
      } : function(h, o) {
        const l = Ca.encode(h);
        return o.set(l), {
          read: h.length,
          written: l.length
        };
      };
      function bi(h, o, l) {
        if (l === void 0) {
          const J = Ca.encode(h), et = o(J.length, 1) >>> 0;
          return wa().subarray(et, et + J.length).set(J), ni = J.length, et;
        }
        let g = h.length, x = o(g, 1) >>> 0;
        const S = wa();
        let M = 0;
        for (; M < g; M++) {
          const J = h.charCodeAt(M);
          if (J > 127) break;
          S[x + M] = J;
        }
        if (M !== g) {
          M !== 0 && (h = h.slice(M)), x = l(x, g, g = M + h.length * 3, 1) >>> 0;
          const J = wa().subarray(x + M, x + g), et = Yl(h, J);
          M += et.written, x = l(x, g, M, 1) >>> 0;
        }
        return ni = M, x;
      }
      function rr(h) {
        const o = Tt.__wbindgen_export_0.get(h);
        return Tt.__externref_table_dealloc(h), o;
      }
      function Xl(h) {
        const o = bi(h, Tt.__wbindgen_malloc, Tt.__wbindgen_realloc), l = ni, g = Tt.new_key_expr(o, l);
        if (g[1]) throw rr(g[0]);
      }
      function Jl(h, o) {
        let l, g;
        try {
          const M = bi(h, Tt.__wbindgen_malloc, Tt.__wbindgen_realloc), J = ni, et = bi(o, Tt.__wbindgen_malloc, Tt.__wbindgen_realloc), _t = ni, wt = Tt.join(M, J, et, _t);
          var x = wt[0], S = wt[1];
          if (wt[3]) throw x = 0, S = 0, rr(wt[2]);
          return l = x, g = S, es(x, S);
        } finally {
          Tt.__wbindgen_free(l, g, 1);
        }
      }
      function Ql(h, o) {
        let l, g;
        try {
          const M = bi(h, Tt.__wbindgen_malloc, Tt.__wbindgen_realloc), J = ni, et = bi(o, Tt.__wbindgen_malloc, Tt.__wbindgen_realloc), _t = ni, wt = Tt.concat(M, J, et, _t);
          var x = wt[0], S = wt[1];
          if (wt[3]) throw x = 0, S = 0, rr(wt[2]);
          return l = x, g = S, es(x, S);
        } finally {
          Tt.__wbindgen_free(l, g, 1);
        }
      }
      function $l(h, o) {
        const l = bi(h, Tt.__wbindgen_malloc, Tt.__wbindgen_realloc), g = ni, x = bi(o, Tt.__wbindgen_malloc, Tt.__wbindgen_realloc), S = ni, M = Tt.includes(l, g, x, S);
        if (M[2]) throw rr(M[1]);
        return M[0] !== 0;
      }
      function th(h, o) {
        const l = bi(h, Tt.__wbindgen_malloc, Tt.__wbindgen_realloc), g = ni, x = bi(o, Tt.__wbindgen_malloc, Tt.__wbindgen_realloc), S = ni, M = Tt.intersects(l, g, x, S);
        if (M[2]) throw rr(M[1]);
        return M[0] !== 0;
      }
      function eh(h) {
        let o, l;
        try {
          const S = bi(h, Tt.__wbindgen_malloc, Tt.__wbindgen_realloc), M = ni, J = Tt.autocanonize(S, M);
          var g = J[0], x = J[1];
          if (J[3]) throw g = 0, x = 0, rr(J[2]);
          return o = g, l = x, es(g, x);
        } finally {
          Tt.__wbindgen_free(o, l, 1);
        }
      }
      function ih() {
        const h = Tt.__wbindgen_export_0, o = h.grow(4);
        h.set(0, void 0), h.set(o + 0, void 0), h.set(o + 1, null), h.set(o + 2, true), h.set(o + 3, false);
      }
      function nh(h, o) {
        return es(h, o);
      }
      function rh(h, o) {
        throw new Error(es(h, o));
      }
      URL = globalThis.URL;
      const He = await Vl({
        "./zenoh_keyexpr_wrapper_bg.js": {
          __wbindgen_string_new: nh,
          __wbindgen_throw: rh,
          __wbindgen_init_externref_table: ih
        }
      }, ql), sh = He.memory, ah = He.new_key_expr, oh = He.join, uh = He.concat, lh = He.includes, hh = He.intersects, ch = He.autocanonize, dh = He.__wbindgen_export_0, ph = He.__wbindgen_malloc, fh = He.__wbindgen_realloc, _h = He.__externref_table_dealloc, mh = He.__wbindgen_free, Du = He.__wbindgen_start, gh = Object.freeze(Object.defineProperty({
        __proto__: null,
        __externref_table_dealloc: _h,
        __wbindgen_export_0: dh,
        __wbindgen_free: mh,
        __wbindgen_malloc: ph,
        __wbindgen_realloc: fh,
        __wbindgen_start: Du,
        autocanonize: ch,
        concat: uh,
        includes: lh,
        intersects: hh,
        join: oh,
        memory: sh,
        new_key_expr: ah
      }, Symbol.toStringTag, {
        value: "Module"
      }));
      Hl(gh);
      Du();
      class Rt {
        constructor(o) {
          __publicField(this, "inner_");
          let l;
          if (o instanceof Rt) {
            this.inner_ = o.inner_;
            return;
          } else o instanceof String ? l = o.toString() : l = o;
          Xl(l), this.inner_ = l;
        }
        toString() {
          return this.inner_;
        }
        join(o) {
          const l = Jl(this.inner_, Rt.intoString(o));
          return new Rt(l);
        }
        concat(o) {
          const l = Ql(this.inner_, Rt.intoString(o));
          return new Rt(l);
        }
        includes(o) {
          return $l(this.inner_, Rt.intoString(o));
        }
        intersects(o) {
          return th(this.inner_, Rt.intoString(o));
        }
        static autocanonize(o) {
          const l = eh(Rt.intoString(o));
          return new Rt(l);
        }
        static intoString(o) {
          return o instanceof Rt ? o.inner_ : o instanceof String ? o.toString() : o;
        }
      }
      class ee {
        constructor(o) {
          __publicField(this, "buffer_");
          if (o instanceof ee) this.buffer_ = o.buffer_;
          else if (o instanceof String || typeof o == "string") {
            const g = new TextEncoder().encode(o.toString());
            this.buffer_ = g;
          } else this.buffer_ = Uint8Array.from(o);
        }
        len() {
          return this.buffer_.length;
        }
        isEmpty() {
          return this.buffer_.length == 0;
        }
        empty() {
          return new ee(new Uint8Array());
        }
        toBytes() {
          return this.buffer_;
        }
        toString() {
          return new TextDecoder().decode(this.buffer_);
        }
      }
      var Ht;
      (function(h) {
        h[h.REAL_TIME = 1] = "REAL_TIME", h[h.INTERACTIVE_HIGH = 2] = "INTERACTIVE_HIGH", h[h.INTERACTIVE_LOW = 3] = "INTERACTIVE_LOW", h[h.DATA_HIGH = 4] = "DATA_HIGH", h[h.DATA = 5] = "DATA", h[h.DATA_LOW = 6] = "DATA_LOW", h[h.BACKGROUND = 7] = "BACKGROUND", h[h.DEFAULT = 5] = "DEFAULT";
      })(Ht || (Ht = {}));
      var Fe;
      (function(h) {
        h[h.DROP = 0] = "DROP", h[h.BLOCK = 1] = "BLOCK", h[h.DEFAULT_PUSH = 0] = "DEFAULT_PUSH", h[h.DEFAULT_REQUEST = 1] = "DEFAULT_REQUEST", h[h.DEFAULT_RESPONSE = 1] = "DEFAULT_RESPONSE";
      })(Fe || (Fe = {}));
      var ze;
      (function(h) {
        h[h.BEST_EFFORT = 0] = "BEST_EFFORT", h[h.RELIABLE = 1] = "RELIABLE", h[h.DEFAULT = 1] = "DEFAULT";
      })(ze || (ze = {}));
      var fe;
      (function(h) {
        h[h.SESSION_LOCAL = 0] = "SESSION_LOCAL", h[h.REMOTE = 1] = "REMOTE", h[h.ANY = 2] = "ANY", h[h.DEFAULT = 2] = "DEFAULT";
      })(fe || (fe = {}));
      var Tn;
      (function(h) {
        h[h.PUT = 0] = "PUT", h[h.DELETE = 1] = "DELETE";
      })(Tn || (Tn = {}));
      var xa;
      (function(h) {
        h[h.BEST_MATCHING = 0] = "BEST_MATCHING", h[h.ALL = 1] = "ALL", h[h.ALL_COMPLETE = 2] = "ALL_COMPLETE", h[h.DEFAULT = 0] = "DEFAULT";
      })(xa || (xa = {}));
      var Ea;
      (function(h) {
        h[h.AUTO = 0] = "AUTO", h[h.NONE = 1] = "NONE", h[h.MONOTONIC = 2] = "MONOTONIC", h[h.LATEST = 3] = "LATEST", h[h.DEFAULT = 0] = "DEFAULT";
      })(Ea || (Ea = {}));
      var Ri;
      (function(h) {
        h[h.ANY = 0] = "ANY", h[h.MATCHING_QUERY = 1] = "MATCHING_QUERY", h[h.DEFAULT = 1] = "DEFAULT";
      })(Ri || (Ri = {}));
      class yh {
        constructor(o, l, g, x, S, M, J, et, _t) {
          __publicField(this, "keyexpr_");
          __publicField(this, "payload_");
          __publicField(this, "kind_");
          __publicField(this, "encoding_");
          __publicField(this, "attachment_");
          __publicField(this, "timestamp_");
          __publicField(this, "priority_");
          __publicField(this, "congestionControl_");
          __publicField(this, "express_");
          this.keyexpr_ = o, this.payload_ = l, this.kind_ = g, this.encoding_ = x, this.attachment_ = S, this.timestamp_ = M, this.priority_ = J, this.congestionControl_ = et, this.express_ = _t;
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
      class vh {
        constructor(o, l) {
          __publicField(this, "zid");
          __publicField(this, "ntp64");
          this.zid = o, this.ntp64 = l;
        }
        getId() {
          return this.zid;
        }
        getNtp64() {
          return this.ntp64;
        }
        getMsSinceUnixEpoch() {
          const o = Number(this.ntp64 >> 32n), g = Number(this.ntp64 & 0xffffffffn) * 1e3 / 4294967296;
          return o * 1e3 + g;
        }
        asDate() {
          return new Date(this.getMsSinceUnixEpoch());
        }
      }
      const _Ma = class _Ma {
        constructor(o) {
          __publicField(this, "zid");
          if (this.zid = o, o.length != 16) throw new Error("Zid should contain exactly 16 bytes");
        }
        toString() {
          let o = "";
          for (let l = this.zid.length - 1; l >= 0; --l) {
            let g = this.zid[l];
            o += _Ma.KEY[g >> 4], o += _Ma.KEY[g & 15];
          }
          return o;
        }
        toLeBytes() {
          return this.zid;
        }
      };
      __publicField(_Ma, "KEY", "0123456789abcdef");
      let Ma = _Ma;
      var rt;
      (function(h) {
        h[h.ZENOH_BYTES = 0] = "ZENOH_BYTES", h[h.ZENOH_STRING = 1] = "ZENOH_STRING", h[h.ZENOH_SERIALIZED = 2] = "ZENOH_SERIALIZED", h[h.APPLICATION_OCTET_STREAM = 3] = "APPLICATION_OCTET_STREAM", h[h.TEXT_PLAIN = 4] = "TEXT_PLAIN", h[h.APPLICATION_JSON = 5] = "APPLICATION_JSON", h[h.TEXT_JSON = 6] = "TEXT_JSON", h[h.APPLICATION_CDR = 7] = "APPLICATION_CDR", h[h.APPLICATION_CBOR = 8] = "APPLICATION_CBOR", h[h.APPLICATION_YAML = 9] = "APPLICATION_YAML", h[h.TEXT_YAML = 10] = "TEXT_YAML", h[h.TEXT_JSON5 = 11] = "TEXT_JSON5", h[h.APPLICATION_PYTHON_SERIALIZED_OBJECT = 12] = "APPLICATION_PYTHON_SERIALIZED_OBJECT", h[h.APPLICATION_PROTOBUF = 13] = "APPLICATION_PROTOBUF", h[h.APPLICATION_JAVA_SERIALIZED_OBJECT = 14] = "APPLICATION_JAVA_SERIALIZED_OBJECT", h[h.APPLICATION_OPENMETRICS_TEXT = 15] = "APPLICATION_OPENMETRICS_TEXT", h[h.IMAGE_PNG = 16] = "IMAGE_PNG", h[h.IMAGE_JPEG = 17] = "IMAGE_JPEG", h[h.IMAGE_GIF = 18] = "IMAGE_GIF", h[h.IMAGE_BMP = 19] = "IMAGE_BMP", h[h.IMAGE_WEBP = 20] = "IMAGE_WEBP", h[h.APPLICATION_XML = 21] = "APPLICATION_XML", h[h.APPLICATION_X_WWW_FORM_URLENCODED = 22] = "APPLICATION_X_WWW_FORM_URLENCODED", h[h.TEXT_HTML = 23] = "TEXT_HTML", h[h.TEXT_XML = 24] = "TEXT_XML", h[h.TEXT_CSS = 25] = "TEXT_CSS", h[h.TEXT_JAVASCRIPT = 26] = "TEXT_JAVASCRIPT", h[h.TEXT_MARKDOWN = 27] = "TEXT_MARKDOWN", h[h.TEXT_CSV = 28] = "TEXT_CSV", h[h.APPLICATION_SQL = 29] = "APPLICATION_SQL", h[h.APPLICATION_COAP_PAYLOAD = 30] = "APPLICATION_COAP_PAYLOAD", h[h.APPLICATION_JSON_PATCH_JSON = 31] = "APPLICATION_JSON_PATCH_JSON", h[h.APPLICATION_JSON_SEQ = 32] = "APPLICATION_JSON_SEQ", h[h.APPLICATION_JSONPATH = 33] = "APPLICATION_JSONPATH", h[h.APPLICATION_JWT = 34] = "APPLICATION_JWT", h[h.APPLICATION_MP4 = 35] = "APPLICATION_MP4", h[h.APPLICATION_SOAP_XML = 36] = "APPLICATION_SOAP_XML", h[h.APPLICATION_YANG = 37] = "APPLICATION_YANG", h[h.AUDIO_AAC = 38] = "AUDIO_AAC", h[h.AUDIO_FLAC = 39] = "AUDIO_FLAC", h[h.AUDIO_MP4 = 40] = "AUDIO_MP4", h[h.AUDIO_OGG = 41] = "AUDIO_OGG", h[h.AUDIO_VORBIS = 42] = "AUDIO_VORBIS", h[h.VIDEO_H261 = 43] = "VIDEO_H261", h[h.VIDEO_H263 = 44] = "VIDEO_H263", h[h.VIDEO_H264 = 45] = "VIDEO_H264", h[h.VIDEO_H265 = 46] = "VIDEO_H265", h[h.VIDEO_H266 = 47] = "VIDEO_H266", h[h.VIDEO_MP4 = 48] = "VIDEO_MP4", h[h.VIDEO_OGG = 49] = "VIDEO_OGG", h[h.VIDEO_RAW = 50] = "VIDEO_RAW", h[h.VIDEO_VP8 = 51] = "VIDEO_VP8", h[h.VIDEO_VP9 = 52] = "VIDEO_VP9", h[h.CUSTOM = 65535] = "CUSTOM";
      })(rt || (rt = {}));
      function Iu(h) {
        switch (h) {
          case rt.APPLICATION_OCTET_STREAM:
            return "application/octet-stream";
          case rt.APPLICATION_PYTHON_SERIALIZED_OBJECT:
            return "application/python-serialized-object";
          case rt.APPLICATION_JAVA_SERIALIZED_OBJECT:
            return "application/java-serialized-object";
          case rt.APPLICATION_OPENMETRICS_TEXT:
            return "application/openmetrics-text";
          case rt.APPLICATION_X_WWW_FORM_URLENCODED:
            return "application/x-www-form-urlencoded";
          case rt.APPLICATION_COAP_PAYLOAD:
            return "application/coap-payload";
          case rt.APPLICATION_JSON_PATCH_JSON:
            return "application/json-patch+json";
          case rt.APPLICATION_JSON_SEQ:
            return "application/json-seq";
          case rt.APPLICATION_SOAP_XML:
            return "application/soap+xml";
          default:
            return rt[h].toLocaleLowerCase().replaceAll("_", "/");
        }
      }
      function Lh() {
        let h = /* @__PURE__ */ new Map();
        for (let o in rt) {
          let l = Number(o);
          !isNaN(l) && l != rt.CUSTOM && h.set(l, Iu(l));
        }
        return h;
      }
      function bh() {
        let h = /* @__PURE__ */ new Map();
        for (let o in rt) {
          let l = Number(o);
          !isNaN(l) && l != rt.CUSTOM && h.set(Iu(l), l);
        }
        return h;
      }
      const _nt = class _nt {
        constructor(o, l) {
          __publicField(this, "id");
          __publicField(this, "schema");
          this.id = o, this.schema = l;
        }
        withSchema(o) {
          if (this.id != rt.CUSTOM || this.schema == null) return new _nt(this.id, o);
          {
            const l = this.schema.indexOf(_nt.SEP);
            return l == -1 ? new _nt(this.id, this.schema + ";" + o) : new _nt(this.id, this.schema.substring(0, l) + ";" + o);
          }
        }
        static default() {
          return new _nt(rt.ZENOH_BYTES);
        }
        toString() {
          let o = "";
          return this.id != rt.CUSTOM && (o += _nt.ID_TO_ENCODING.get(this.id)), this.schema != null && (this.id != rt.CUSTOM && (o += ";"), o += this.schema), o;
        }
        static fromString(o) {
          if (o.length == 0) return new _nt(rt.ZENOH_BYTES, void 0);
          const l = o.indexOf(_nt.SEP);
          let g, x;
          l == -1 ? g = o : (g = o.substring(0, l), x = o.substring(l + 1));
          const S = _nt.ENCODING_TO_ID.get(g) ?? rt.CUSTOM;
          return S == rt.CUSTOM && (x = x ? g + ";" + x : g), new _nt(S, x);
        }
        static from(o) {
          return o instanceof _nt ? o : _nt.fromString(o.toString());
        }
        toIdSchema() {
          return [
            this.id,
            this.schema
          ];
        }
      };
      __publicField(_nt, "ID_TO_ENCODING", Lh());
      __publicField(_nt, "ENCODING_TO_ID", bh());
      __publicField(_nt, "SEP", ";");
      __publicField(_nt, "ZENOH_BYTES", new _nt(rt.ZENOH_BYTES));
      __publicField(_nt, "ZENOH_STRING", new _nt(rt.ZENOH_STRING));
      __publicField(_nt, "ZENOH_SERIALIZED", new _nt(rt.ZENOH_SERIALIZED));
      __publicField(_nt, "APPLICATION_OCTET_STREAM", new _nt(rt.APPLICATION_OCTET_STREAM));
      __publicField(_nt, "TEXT_PLAIN", new _nt(rt.TEXT_PLAIN));
      __publicField(_nt, "APPLICATION_JSON", new _nt(rt.APPLICATION_JSON));
      __publicField(_nt, "TEXT_JSON", new _nt(rt.TEXT_JSON));
      __publicField(_nt, "APPLICATION_CDR", new _nt(rt.APPLICATION_CDR));
      __publicField(_nt, "APPLICATION_CBOR", new _nt(rt.APPLICATION_CBOR));
      __publicField(_nt, "APPLICATION_YAML", new _nt(rt.APPLICATION_YAML));
      __publicField(_nt, "TEXT_YAML", new _nt(rt.TEXT_YAML));
      __publicField(_nt, "TEXT_JSON5", new _nt(rt.TEXT_JSON5));
      __publicField(_nt, "APPLICATION_PROTOBUF", new _nt(rt.APPLICATION_PROTOBUF));
      __publicField(_nt, "APPLICATION_PYTHON_SERIALIZED_OBJECT", new _nt(rt.APPLICATION_PYTHON_SERIALIZED_OBJECT));
      __publicField(_nt, "APPLICATION_JAVA_SERIALIZED_OBJECT", new _nt(rt.APPLICATION_JAVA_SERIALIZED_OBJECT));
      __publicField(_nt, "APPLICATION_OPENMETRICS_TEXT", new _nt(rt.APPLICATION_OPENMETRICS_TEXT));
      __publicField(_nt, "IMAGE_PNG", new _nt(rt.IMAGE_PNG));
      __publicField(_nt, "IMAGE_JPEG", new _nt(rt.IMAGE_JPEG));
      __publicField(_nt, "IMAGE_GIF", new _nt(rt.IMAGE_GIF));
      __publicField(_nt, "IMAGE_BMP", new _nt(rt.IMAGE_BMP));
      __publicField(_nt, "IMAGE_WEBP", new _nt(rt.IMAGE_WEBP));
      __publicField(_nt, "APPLICATION_XML", new _nt(rt.APPLICATION_XML));
      __publicField(_nt, "APPLICATION_X_WWW_FORM_URLENCODED", new _nt(rt.APPLICATION_X_WWW_FORM_URLENCODED));
      __publicField(_nt, "TEXT_HTML", new _nt(rt.TEXT_HTML));
      __publicField(_nt, "TEXT_XML", new _nt(rt.TEXT_XML));
      __publicField(_nt, "TEXT_CSS", new _nt(rt.TEXT_CSS));
      __publicField(_nt, "TEXT_JAVASCRIPT", new _nt(rt.TEXT_JAVASCRIPT));
      __publicField(_nt, "TEXT_MARKDOWN", new _nt(rt.TEXT_MARKDOWN));
      __publicField(_nt, "TEXT_CSV", new _nt(rt.TEXT_CSV));
      __publicField(_nt, "APPLICATION_SQL", new _nt(rt.APPLICATION_SQL));
      __publicField(_nt, "APPLICATION_COAP_PAYLOAD", new _nt(rt.APPLICATION_COAP_PAYLOAD));
      __publicField(_nt, "APPLICATION_JSON_PATCH_JSON", new _nt(rt.APPLICATION_JSON_PATCH_JSON));
      __publicField(_nt, "APPLICATION_JSON_SEQ", new _nt(rt.APPLICATION_JSON_SEQ));
      __publicField(_nt, "APPLICATION_JSONPATH", new _nt(rt.APPLICATION_JSONPATH));
      __publicField(_nt, "APPLICATION_JWT", new _nt(rt.APPLICATION_JWT));
      __publicField(_nt, "APPLICATION_MP4", new _nt(rt.APPLICATION_MP4));
      __publicField(_nt, "APPLICATION_SOAP_XML", new _nt(rt.APPLICATION_SOAP_XML));
      __publicField(_nt, "APPLICATION_YANG", new _nt(rt.APPLICATION_YANG));
      __publicField(_nt, "AUDIO_AAC", new _nt(rt.AUDIO_AAC));
      __publicField(_nt, "AUDIO_FLAC", new _nt(rt.AUDIO_FLAC));
      __publicField(_nt, "AUDIO_MP4", new _nt(rt.AUDIO_MP4));
      __publicField(_nt, "AUDIO_OGG", new _nt(rt.AUDIO_OGG));
      __publicField(_nt, "AUDIO_VORBIS", new _nt(rt.AUDIO_VORBIS));
      __publicField(_nt, "VIDEO_H261", new _nt(rt.VIDEO_H261));
      __publicField(_nt, "VIDEO_H263", new _nt(rt.VIDEO_H263));
      __publicField(_nt, "VIDEO_H264", new _nt(rt.VIDEO_H264));
      __publicField(_nt, "VIDEO_H265", new _nt(rt.VIDEO_H265));
      __publicField(_nt, "VIDEO_H266", new _nt(rt.VIDEO_H266));
      __publicField(_nt, "VIDEO_MP4", new _nt(rt.VIDEO_MP4));
      __publicField(_nt, "VIDEO_OGG", new _nt(rt.VIDEO_OGG));
      __publicField(_nt, "VIDEO_RAW", new _nt(rt.VIDEO_RAW));
      __publicField(_nt, "VIDEO_VP8", new _nt(rt.VIDEO_VP8));
      __publicField(_nt, "VIDEO_VP9", new _nt(rt.VIDEO_VP9));
      let nt = _nt;
      var Bo = {}, Po = {}, yu;
      function wh() {
        return yu || (yu = 1, (function(h) {
          Object.defineProperty(h, "__esModule", {
            value: true
          }), h.MultiReceiverChannel = h.SimpleChannel = h.TryReceivedKind = h.State = void 0;
          var o;
          (function(S) {
            S.empty = "empty", S.receiver = "receiver", S.data = "data", S.close = "close";
          })(o = h.State || (h.State = {}));
          var l;
          (function(S) {
            S.value = "value", S.notReceived = "no", S.close = "close";
          })(l = h.TryReceivedKind || (h.TryReceivedKind = {}));
          class g {
            constructor() {
              this.receivers = [], this.data = [], this._state = o.empty;
            }
            get state() {
              return this._state;
            }
            tryReceive() {
              if (this._state == o.data) {
                const M = this.data.shift();
                return M === null ? (this._state = o.close, {
                  kind: l.close
                }) : (this.data.length === 0 && (this._state = o.empty), {
                  kind: l.value,
                  value: M
                });
              } else return {
                kind: l.notReceived
              };
            }
            receive() {
              if (this._state === o.close) return Promise.reject();
              if (this._state === o.data) {
                const M = this.data.shift();
                return M === null ? (this._state = o.close, Promise.reject()) : (this.data.length === 0 && (this._state = o.empty), Promise.resolve(M));
              } else return new Promise((M, J) => {
                this.receivers.push([
                  M,
                  J
                ]), this._state = o.receiver;
              });
            }
            send(M) {
              if (this._state === o.close) throw "sending on closed channel";
              if (this._state !== o.receiver) this.data.push(M), this._state = o.data;
              else {
                const [J] = this.receivers.shift();
                J(M), this.receivers.length === 0 && (this._state = o.empty);
              }
            }
            close() {
              if (this._state !== o.close) if (this._state !== o.receiver) this.data.push(null), this._state = o.data;
              else {
                const [, M] = this.receivers.shift();
                M(), this.receivers.length === 0 && (this._state = o.close);
              }
            }
            async *[Symbol.asyncIterator]() {
              try {
                for (; ; ) yield await this.receive();
              } catch {
              }
            }
          }
          h.SimpleChannel = g;
          class x {
            constructor() {
              this.chan = /* @__PURE__ */ new Set();
            }
            send(M) {
              for (const J of this.chan) J.send(M);
            }
            close() {
              for (const M of this.chan) M.close();
            }
            receiver() {
              const M = new g();
              return this.chan.add(M), M;
            }
            removeReceiver(M) {
              this.chan.delete(M);
            }
          }
          h.MultiReceiverChannel = x;
        })(Po)), Po;
      }
      var Xr = {}, vu;
      function Ch() {
        if (vu) return Xr;
        vu = 1, Object.defineProperty(Xr, "__esModule", {
          value: true
        }), Xr.observe = void 0;
        const h = Ou();
        return Xr.observe = (o) => (Object.defineProperties(o, {
          chan: {
            value: new h.MultiReceiverChannel()
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
            value: function(l) {
              l.close(), this.chan.removeReceiver(l);
            }
          }
        }), o), Xr;
      }
      var Bn = {}, Lu;
      function xh() {
        if (Lu) return Bn;
        Lu = 1, Object.defineProperty(Bn, "__esModule", {
          value: true
        }), Bn.Guard = Bn.Mutex = void 0;
        class h {
          constructor() {
            this.resolveList = [], this.locked = [
              false
            ];
          }
          acquire() {
            return new Promise((g) => {
              if (this.locked[0]) this.resolveList.push(g);
              else {
                this.locked[0] = true;
                const x = new o(this.resolveList, this.locked);
                g(x);
              }
            });
          }
        }
        Bn.Mutex = h;
        class o {
          constructor(g, x) {
            this.resolveList = g, this.locked = x;
          }
          release() {
            const g = this.resolveList.shift();
            g ? g(this) : this.locked[0] = false;
          }
        }
        return Bn.Guard = o, Bn;
      }
      var bu;
      function Ou() {
        return bu || (bu = 1, (function(h) {
          Object.defineProperty(h, "__esModule", {
            value: true
          });
          var o = wh();
          Object.defineProperty(h, "SimpleChannel", {
            enumerable: true,
            get: function() {
              return o.SimpleChannel;
            }
          }), Object.defineProperty(h, "ChannelState", {
            enumerable: true,
            get: function() {
              return o.State;
            }
          }), Object.defineProperty(h, "MultiReceiverChannel", {
            enumerable: true,
            get: function() {
              return o.MultiReceiverChannel;
            }
          }), Object.defineProperty(h, "TryReceivedKind", {
            enumerable: true,
            get: function() {
              return o.TryReceivedKind;
            }
          });
          var l = Ch();
          Object.defineProperty(h, "observe", {
            enumerable: true,
            get: function() {
              return l.observe;
            }
          });
          var g = xh();
          Object.defineProperty(h, "Mutex", {
            enumerable: true,
            get: function() {
              return g.Mutex;
            }
          }), Object.defineProperty(h, "Guard", {
            enumerable: true,
            get: function() {
              return g.Guard;
            }
          });
        })(Bo)), Bo;
      }
      var wu = Ou();
      function Eh(h) {
        return h.intoSenderReceiverPair != null;
      }
      function ln(h) {
        if (Eh(h)) {
          let [o, l] = h.intoSenderReceiverPair();
          return [
            (S) => {
              o.send(S);
            },
            () => {
              o.close();
            },
            l
          ];
        } else return Array.isArray(h) ? [
          h[0],
          h[1],
          void 0
        ] : [
          h,
          () => {
          },
          void 0
        ];
      }
      class hn {
        constructor(o) {
          __publicField(this, "chan");
          __publicField(this, "capacity");
          __publicField(this, "size");
          this.capacity = o, this.size = 0, this.chan = new wu.SimpleChannel();
        }
        send(o) {
          this.size != this.capacity && (this.chan.send(o), this.size++);
        }
        state() {
          return this.chan.state;
        }
        tryReceive() {
          let o = this.chan.tryReceive();
          return o.kind == wu.TryReceivedKind.value && this.size--, o;
        }
        async receive() {
          let o = await this.chan.receive();
          return this.size--, o;
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
      const Mh = () => typeof self < "u" && typeof self.WebAssembly < "u" || typeof global < "u" && typeof global.WebAssembly < "u", Ru = (h, o = (l) => l !== void 0 ? ": " + l : "") => class extends Error {
        constructor(l) {
          super(h(l) + o(l));
          __publicField(this, "origMessage");
          this.origMessage = l !== void 0 ? String(l) : "";
        }
      }, kh = Ru(() => "index out of bounds"), Ah = (h) => {
        throw new kh(h);
      }, Bh = (h, o, l) => (h < o || h >= l) && Ah(h), Ph = Ru(() => "unsupported operation"), Th = (h) => {
        throw new Ph(h);
      }, Sh = "AGFzbQEAAAABCgJgAX4Bf2AAAX4DBQQAAQABBQMBABEGEQJ/AUGAgMAAC38AQYCAwAALB1gGBm1lbW9yeQIAD2xlYjEyOEVuY29kZVU2NAAAA2J1ZgMBD2xlYjEyOERlY29kZVU2NAABD2xlYjEyOEVuY29kZUk2NAACD2xlYjEyOERlY29kZUk2NAADCoYEBFsBAn8CQCAAQoABWgRAA0AgAUGAgEBrIACnQf8AcSAAQv8AVkEHdHI6AAAgAUEBaiEBIABCgAFUIABCB4ghAEUNAAsMAQtBgIDAACAAPAAAQQEhAQsgAUH/AXELdwIEfwF+IwBBEGsiACQAIABBADoADwNAAkAgACAALQAPIgJBB2pBP3E6AA8gAUGAgEBrLAAAIgNB/wBxrSACQT9xrYYgBIQhBCABQQFqIQIgAUEISw0AIAIhASADQQBIDQELC0GAgMAAIAI6AAAgAEEQaiQAIAQLkQEBA38CQCAAQkB9QoABWgRAQQEhAgNAIAJBAXFFDQIgAUGAgEBrQQBBgH8gAKciAkHAAHEiA0UgAEKAAVRxIANBBnYgAEIHhyIAQn9RcXIiAxsgAkH/AHFyOgAAIANFIQIgAUEBaiEBDAALAAtBgIDAACAAQjmIp0HAAHEgAKdBP3FyOgAAQQEhAQsgAUH/AXELnAECAX4EfyMAQRBrIgEkACABQQA6AA9BfyECA0ACQCABIAEtAA8iA0EHakE/cToADyACQYGAwABqLQAAIgRB/wBxrSADQT9xrYYgAIQhACAEwCEDIAJBAWoiAkEISw0AIANBAEgNAQsLIANBwABxRSACQQhLckUEQEJ/IAExAA+GIACEIQALQYCAwAAgAkEBajoAACABQRBqJAAgAAs=";
      let nr, ka;
      Mh() && (nr = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([
        ...atob(Sh)
      ].map((o) => o.charCodeAt(0))))).exports, ka = new Uint8Array(nr.memory.buffer, nr.buf, 16));
      const Fu = () => !nr && Th("WASM module unavailable"), Dh = (h, o) => (l, g, x = 0) => {
        Fu();
        const S = BigInt.asIntN(64, BigInt(g)), M = nr[h](S);
        return Bh(x, 0, l.length - M + 1), l.set(ka.subarray(0, M), x), M;
      }, Ih = (h, o) => (l, g = 0) => {
        Fu(), ka.set(l.subarray(g, Math.min(g + 10, l.length)), 0);
        const x = nr[h](0, 0);
        return [
          o ? BigInt.asIntN(64, x) : BigInt.asUintN(64, x),
          ka[0]
        ];
      }, Oh = Ih("leb128DecodeU64", false), Rh = Dh("leb128EncodeU64");
      function Fh(h) {
        return h instanceof Uint8Array;
      }
      function zh(h) {
        return h instanceof Uint16Array;
      }
      function Nh(h) {
        return h instanceof Uint32Array;
      }
      function Uh(h) {
        return h instanceof BigUint64Array;
      }
      function Gh(h) {
        return h instanceof Int8Array;
      }
      function Zh(h) {
        return h instanceof Int16Array;
      }
      function jh(h) {
        return h instanceof Int32Array;
      }
      function qh(h) {
        return h instanceof BigInt64Array;
      }
      function Vh(h) {
        return h instanceof Float32Array;
      }
      function Hh(h) {
        return h instanceof Float64Array;
      }
      const Me = new Uint32Array(new Uint8Array([
        1,
        2,
        3,
        4
      ]).buffer)[0] === 67305985;
      function Wh(h) {
        return h.serializeWithZSerializer !== void 0;
      }
      const _Sn = class _Sn {
        constructor() {
          __publicField(this, "buffer");
          __publicField(this, "bufferLen");
          __publicField(this, "data");
          __publicField(this, "len");
          this.data = new Array(), this.len = 0, this.buffer = new Uint8Array(_Sn.DEFAULT_BUFFER_SIZE), this.bufferLen = 0;
        }
        resetBuffer(o) {
          o < _Sn.DEFAULT_BUFFER_SIZE && (o = _Sn.DEFAULT_BUFFER_SIZE), this.buffer = new Uint8Array(o), this.bufferLen = 0;
        }
        ensureBuffer(o) {
          return this.bufferLen + o >= this.buffer.length && this.resetBuffer(o), this.bufferLen += o, this.buffer.subarray(this.bufferLen - o, this.bufferLen);
        }
        append(o) {
          this.data.push(o), this.len += o.length;
        }
        writeSequenceLength(o) {
          if (o <= _Sn.MAX_SEQUENCE_LENGTH_TO_FIT_IN_SINGLE_BYTE) {
            this.serializeNumberUint8(o);
            return;
          }
          let l = this.ensureBuffer(10), g = Rh(l, o);
          l = l.subarray(0, g), this.bufferLen -= 10 - g, this.append(l);
        }
        serializeString(o) {
          if (o.length == 0) this.writeSequenceLength(0);
          else {
            const g = new TextEncoder().encode(o);
            this.writeSequenceLength(g.length), this.append(g);
          }
        }
        serializeUint8Array(o) {
          this.writeSequenceLength(o.length), this.append(o);
        }
        serializeUint16Array(o) {
          this.writeSequenceLength(o.length), Me ? this.append(new Uint8Array(o.buffer)) : o.forEach((l) => this.serializeNumberUint16(l));
        }
        serializeUint32Array(o) {
          this.writeSequenceLength(o.length), Me ? this.append(new Uint8Array(o.buffer)) : o.forEach((l) => this.serializeNumberUint32(l));
        }
        serializeBiguint64Array(o) {
          this.writeSequenceLength(o.length), Me ? this.append(new Uint8Array(o.buffer)) : o.forEach((l) => this.serializeBigintUint64(l));
        }
        serializeInt8Array(o) {
          this.writeSequenceLength(o.length), this.append(new Uint8Array(o.buffer));
        }
        serializeInt16Array(o) {
          this.writeSequenceLength(o.length), Me ? this.append(new Uint8Array(o.buffer)) : o.forEach((l) => this.serializeNumberInt16(l));
        }
        serializeInt32Array(o) {
          this.writeSequenceLength(o.length), Me ? this.append(new Uint8Array(o.buffer)) : o.forEach((l) => this.serializeNumberInt32(l));
        }
        serializeBigint64Array(o) {
          this.writeSequenceLength(o.length), Me ? this.append(new Uint8Array(o.buffer)) : o.forEach((l) => this.serializeBigintInt64(l));
        }
        serializeFloat32Array(o) {
          this.writeSequenceLength(o.length), Me ? this.append(new Uint8Array(o.buffer)) : o.forEach((l) => this.serializeNumberFloat32(l));
        }
        serializeFloat64Array(o) {
          this.writeSequenceLength(o.length), Me ? this.append(new Uint8Array(o.buffer)) : o.forEach((l) => this.serializeNumberFloat64(l));
        }
        serializeBigintInt64(o) {
          let l = this.ensureBuffer(8);
          new DataView(l.buffer, l.byteOffset, l.byteLength).setBigInt64(0, o, true), this.append(l);
        }
        serializeBigintUint64(o) {
          let l = this.ensureBuffer(8);
          new DataView(l.buffer, l.byteOffset, l.byteLength).setBigUint64(0, o, true), this.append(l);
        }
        serializeNumberFloat64(o) {
          let l = this.ensureBuffer(8);
          new DataView(l.buffer, l.byteOffset, l.byteLength).setFloat64(0, o, true), this.append(l);
        }
        serializeNumberFloat32(o) {
          let l = this.ensureBuffer(4);
          new DataView(l.buffer, l.byteOffset, l.byteLength).setFloat32(0, o, true), this.append(l);
        }
        serializeNumberInt64(o) {
          let l = BigInt(o);
          this.serializeBigintInt64(l);
        }
        serializeNumberUint64(o) {
          let l = BigInt(o);
          this.serializeBigintUint64(l);
        }
        serializeNumberInt32(o) {
          let l = this.ensureBuffer(4);
          new DataView(l.buffer, l.byteOffset, l.byteLength).setInt32(0, o, true), this.append(l);
        }
        serializeNumberUint32(o) {
          let l = this.ensureBuffer(4);
          new DataView(l.buffer, l.byteOffset, l.byteLength).setUint32(0, o, true), this.append(l);
        }
        serializeNumberInt16(o) {
          let l = this.ensureBuffer(2);
          new DataView(l.buffer, l.byteOffset, l.byteLength).setInt16(0, o, true), this.append(l);
        }
        serializeNumberUint16(o) {
          let l = this.ensureBuffer(2);
          new DataView(l.buffer, l.byteOffset, l.byteLength).setUint16(0, o, true), this.append(l);
        }
        serializeNumberInt8(o) {
          let l = this.ensureBuffer(1);
          new DataView(l.buffer, l.byteOffset, l.byteLength).setInt8(0, o), this.append(l);
        }
        serializeNumberUint8(o) {
          let l = this.ensureBuffer(1);
          l[0] = o, this.append(l);
        }
        serializeBoolean(o) {
          this.serializeNumberUint8(o === true ? 1 : 0);
        }
        serializeArray(o, l) {
          this.writeSequenceLength(o.length), o.length > 0 && l === void 0 && (l = this.getDefaultSerializationTag(o[0])), o.forEach((g) => l.serialize(this, g));
        }
        serializeMap(o, l, g) {
          if (this.writeSequenceLength(o.size), o.size > 0) {
            let x = o.entries().next();
            if (x !== void 0) {
              let S = x.value;
              S !== void 0 && (l ?? (l = this.getDefaultSerializationTag(S[0])), g ?? (g = this.getDefaultSerializationTag(S[1])));
            }
          }
          o.forEach((x, S) => {
            l.serialize(this, S), g.serialize(this, x);
          });
        }
        getDefaultSerializationTag(o) {
          if (Wh(o)) return ue.object();
          if (typeof o == "number") return ue.number();
          if (typeof o == "bigint") return ue.bigint();
          if (typeof o == "string") return ue.string();
          if (typeof o == "boolean") return ue.boolean();
          if (Fh(o)) return ue.uint8array();
          if (zh(o)) return ue.uint16array();
          if (Nh(o)) return ue.uint32array();
          if (Uh(o)) return ue.biguint64array();
          if (Gh(o)) return ue.int8array();
          if (Zh(o)) return ue.int16array();
          if (jh(o)) return ue.int32array();
          if (qh(o)) return ue.bigint64array();
          if (Vh(o)) return ue.float32array();
          if (Hh(o)) return ue.float64array();
          if (Array.isArray(o)) {
            let l;
            return o.length > 0 && (l = this.getDefaultSerializationTag(o[0])), ue.array(l);
          } else if (o instanceof Map) {
            let l, g, x = o.entries().next();
            if (x !== void 0) {
              let S = x.value;
              S !== void 0 && (l = this.getDefaultSerializationTag(S[0]), g = this.getDefaultSerializationTag(S[1]));
            }
            return ue.map(l, g);
          } else throw new Error("Non-ZSerializeable type");
        }
        serialize(o, l) {
          l === void 0 ? this.getDefaultSerializationTag(o).serialize(this, o) : l.serialize(this, o);
        }
        finish() {
          const o = new ee(this.toBytes());
          return this.data = new Array(), this.len = 0, this.bufferLen = 0, o;
        }
        toBytes() {
          if (this.data.length == 0) return new Uint8Array(0);
          if (this.data.length == 1) return this.data[0];
          {
            let o = new Uint8Array(this.len), l = 0;
            for (let g of this.data) o.set(g, l), l += g.length;
            return o;
          }
        }
      };
      __publicField(_Sn, "DEFAULT_BUFFER_SIZE", 256);
      __publicField(_Sn, "MAX_SEQUENCE_LENGTH_TO_FIT_IN_SINGLE_BYTE", 127);
      let Sn = _Sn;
      var Wt;
      (function(h) {
        h[h.Float64 = 1] = "Float64", h[h.Float32 = 2] = "Float32", h[h.Int64 = 3] = "Int64", h[h.Uint64 = 4] = "Uint64", h[h.Int32 = 5] = "Int32", h[h.Uint32 = 6] = "Uint32", h[h.Int16 = 7] = "Int16", h[h.Uint16 = 8] = "Uint16", h[h.Int8 = 9] = "Int8", h[h.Uint8 = 10] = "Uint8";
      })(Wt || (Wt = {}));
      var cn;
      (function(h) {
        h[h.Int64 = 1] = "Int64", h[h.Uint64 = 2] = "Uint64";
      })(cn || (cn = {}));
      class zt {
        constructor(o) {
          __publicField(this, "deserialize_");
          this.deserialize_ = o;
        }
        deserialize(o) {
          return this.deserialize_(o);
        }
      }
      class Gt {
        constructor(o) {
          __publicField(this, "serialize_");
          this.serialize_ = o;
        }
        serialize(o, l) {
          this.serialize_(o, l);
        }
      }
      var Aa;
      (function(h) {
        function o(W = Wt.Float64) {
          switch (W) {
            case Wt.Float64:
              return new zt((ot) => ot.deserializeNumberFloat64());
            case Wt.Float32:
              return new zt((ot) => ot.deserializeNumberFloat32());
            case Wt.Int64:
              return new zt((ot) => ot.deserializeNumberInt64());
            case Wt.Uint64:
              return new zt((ot) => ot.deserializeNumberUint64());
            case Wt.Int32:
              return new zt((ot) => ot.deserializeNumberInt32());
            case Wt.Uint32:
              return new zt((ot) => ot.deserializeNumberUint32());
            case Wt.Int16:
              return new zt((ot) => ot.deserializeNumberInt16());
            case Wt.Uint16:
              return new zt((ot) => ot.deserializeNumberUint16());
            case Wt.Int8:
              return new zt((ot) => ot.deserializeNumberInt8());
            case Wt.Uint8:
              return new zt((ot) => ot.deserializeNumberUint8());
          }
        }
        h.number = o;
        function l(W = cn.Int64) {
          switch (W) {
            case cn.Int64:
              return new zt((ot) => ot.deserializeBigintInt64());
            case cn.Uint64:
              return new zt((ot) => ot.deserializeBigintUint64());
          }
        }
        h.bigint = l;
        function g() {
          return new zt((W) => W.deserializeString());
        }
        h.string = g;
        function x() {
          return new zt((W) => W.deserializeBoolean());
        }
        h.boolean = x;
        function S() {
          return new zt((W) => W.deserializeUint8Array());
        }
        h.uint8array = S;
        function M() {
          return new zt((W) => W.deserializeUint16Array());
        }
        h.uint16array = M;
        function J() {
          return new zt((W) => W.deserializeUint32Array());
        }
        h.uint32array = J;
        function et() {
          return new zt((W) => W.deserializeBiguint64Array());
        }
        h.biguint64array = et;
        function _t() {
          return new zt((W) => W.deserializeInt8Array());
        }
        h.int8array = _t;
        function wt() {
          return new zt((W) => W.deserializeInt16Array());
        }
        h.int16array = wt;
        function ht() {
          return new zt((W) => W.deserializeInt32Array());
        }
        h.int32array = ht;
        function Nt() {
          return new zt((W) => W.deserializeBigint64Array());
        }
        h.bigint64array = Nt;
        function ie() {
          return new zt((W) => W.deserializeFloat32Array());
        }
        h.float32array = ie;
        function ne() {
          return new zt((W) => W.deserializeFloat64Array());
        }
        h.float64array = ne;
        function gt(W) {
          return new zt((ot) => ot.deserializeObject(W));
        }
        h.object = gt;
        function le(W) {
          return new zt((ot) => W(ot));
        }
        h.objectStatic = le;
        function Zt(W) {
          return new zt((ot) => ot.deserializeArray(W));
        }
        h.array = Zt;
        function yt(W, ot) {
          return new zt((he) => he.deserializeMap(W, ot));
        }
        h.map = yt;
      })(Aa || (Aa = {}));
      var ue;
      (function(h) {
        function o(yt = Wt.Float64) {
          switch (yt) {
            case Wt.Float64:
              return new Gt((W, ot) => {
                W.serializeNumberFloat64(ot);
              });
            case Wt.Float32:
              return new Gt((W, ot) => {
                W.serializeNumberFloat32(ot);
              });
            case Wt.Int64:
              return new Gt((W, ot) => {
                W.serializeNumberInt64(ot);
              });
            case Wt.Uint64:
              return new Gt((W, ot) => {
                W.serializeNumberUint64(ot);
              });
            case Wt.Int32:
              return new Gt((W, ot) => {
                W.serializeNumberInt32(ot);
              });
            case Wt.Uint32:
              return new Gt((W, ot) => {
                W.serializeNumberUint32(ot);
              });
            case Wt.Int16:
              return new Gt((W, ot) => {
                W.serializeNumberInt16(ot);
              });
            case Wt.Uint16:
              return new Gt((W, ot) => {
                W.serializeNumberUint16(ot);
              });
            case Wt.Int8:
              return new Gt((W, ot) => {
                W.serializeNumberInt8(ot);
              });
            case Wt.Uint8:
              return new Gt((W, ot) => {
                W.serializeNumberUint8(ot);
              });
          }
        }
        h.number = o;
        function l(yt = cn.Int64) {
          switch (yt) {
            case cn.Int64:
              return new Gt((W, ot) => {
                W.serializeBigintInt64(ot);
              });
            case cn.Uint64:
              return new Gt((W, ot) => {
                W.serializeBigintUint64(ot);
              });
          }
        }
        h.bigint = l;
        function g() {
          return new Gt((yt, W) => {
            yt.serializeString(W);
          });
        }
        h.string = g;
        function x() {
          return new Gt((yt, W) => {
            yt.serializeBoolean(W);
          });
        }
        h.boolean = x;
        function S() {
          return new Gt((yt, W) => {
            yt.serializeUint8Array(W);
          });
        }
        h.uint8array = S;
        function M() {
          return new Gt((yt, W) => {
            yt.serializeUint16Array(W);
          });
        }
        h.uint16array = M;
        function J() {
          return new Gt((yt, W) => {
            yt.serializeUint32Array(W);
          });
        }
        h.uint32array = J;
        function et() {
          return new Gt((yt, W) => {
            yt.serializeBiguint64Array(W);
          });
        }
        h.biguint64array = et;
        function _t() {
          return new Gt((yt, W) => {
            yt.serializeInt8Array(W);
          });
        }
        h.int8array = _t;
        function wt() {
          return new Gt((yt, W) => {
            yt.serializeInt16Array(W);
          });
        }
        h.int16array = wt;
        function ht() {
          return new Gt((yt, W) => {
            yt.serializeInt32Array(W);
          });
        }
        h.int32array = ht;
        function Nt() {
          return new Gt((yt, W) => {
            yt.serializeBigint64Array(W);
          });
        }
        h.bigint64array = Nt;
        function ie() {
          return new Gt((yt, W) => {
            yt.serializeFloat32Array(W);
          });
        }
        h.float32array = ie;
        function ne() {
          return new Gt((yt, W) => {
            yt.serializeFloat64Array(W);
          });
        }
        h.float64array = ne;
        function gt() {
          return new Gt((yt, W) => {
            W.serializeWithZSerializer(yt);
          });
        }
        h.object = gt;
        function le(yt) {
          return new Gt((W, ot) => {
            W.serializeArray(ot, yt);
          });
        }
        h.array = le;
        function Zt(yt, W) {
          return new Gt((ot, he) => {
            ot.serializeMap(he, yt, W);
          });
        }
        h.map = Zt;
      })(ue || (ue = {}));
      const _zo = class _zo {
        constructor(o) {
          __publicField(this, "buffer_");
          __publicField(this, "idx_");
          o instanceof ee ? this.buffer_ = o.toBytes() : this.buffer_ = o, this.idx_ = 0;
        }
        readSlice(o) {
          const l = this.buffer_.subarray(this.idx_, this.idx_ + o);
          if (l.length < o) throw new Error(`Array index is out of bounds: ${this.idx_ + o} / ${this.buffer_.length}`);
          return this.idx_ += o, l;
        }
        readByte() {
          if (this.idx_ >= this.buffer_.length) throw new Error(`Array index is out of bounds: ${this.idx_ + 1} / ${this.buffer_.length}`);
          const o = this.buffer_[this.idx_];
          return this.idx_ += 1, o;
        }
        peekByte() {
          return this.buffer_[this.idx_];
        }
        readSequenceLength() {
          const o = this.peekByte();
          if (o != null && (o & _zo.LEB128_CONTINUATION_MASK) == 0) return this.idx_ += 1, o;
          let [l, g] = Oh(this.buffer_, this.idx_);
          if (this.idx_ += g, l > Number.MAX_SAFE_INTEGER) throw new Error(`Array length overflow: ${l}`);
          return new Number(l).valueOf();
        }
        deserializeString() {
          let o = this.readSequenceLength();
          return o == 0 ? "" : new TextDecoder().decode(this.readSlice(o));
        }
        deserializeUint8Array() {
          let o = this.readSequenceLength();
          return this.readSlice(o);
        }
        deserializeUint16Array() {
          let o = this.readSequenceLength();
          if (Me) {
            let l = this.readSlice(o * 2);
            return l.byteOffset % 2 != 0 && (l = l.slice()), new Uint16Array(l.buffer, l.byteOffset, o);
          } else {
            let l = new Uint16Array(o);
            for (let g = 0; g < o; g++) l[g] = this.deserializeNumberUint16();
            return l;
          }
        }
        deserializeUint32Array() {
          let o = this.readSequenceLength();
          if (Me) {
            let l = this.readSlice(o * 4);
            return l.byteOffset % 4 != 0 && (l = l.slice()), new Uint32Array(l.buffer, l.byteOffset, o);
          } else {
            let l = new Uint32Array(o);
            for (let g = 0; g < o; g++) l[g] = this.deserializeNumberUint32();
            return l;
          }
        }
        deserializeBiguint64Array() {
          let o = this.readSequenceLength();
          if (Me) {
            let l = this.readSlice(o * 8);
            return l.byteOffset % 8 != 0 && (l = l.slice()), new BigUint64Array(l.buffer, l.byteOffset, o);
          } else {
            let l = new BigUint64Array(o);
            for (let g = 0; g < o; g++) l[g] = this.deserializeBigintUint64();
            return l;
          }
        }
        deserializeInt8Array() {
          let o = this.readSequenceLength();
          const l = this.readSlice(o);
          return new Int8Array(l.buffer, l.byteOffset, o);
        }
        deserializeInt16Array() {
          let o = this.readSequenceLength();
          if (Me) {
            let l = this.readSlice(o * 2);
            return l.byteOffset % 2 != 0 && (l = l.slice()), new Int16Array(l.buffer, l.byteOffset, o);
          } else {
            let l = new Int16Array(o);
            for (let g = 0; g < o; g++) l[g] = this.deserializeNumberInt16();
            return l;
          }
        }
        deserializeInt32Array() {
          let o = this.readSequenceLength();
          if (Me) {
            let l = this.readSlice(o * 4);
            return l.byteOffset % 4 != 0 && (l = l.slice()), new Int32Array(l.buffer, l.byteOffset, o);
          } else {
            let l = new Int32Array(o);
            for (let g = 0; g < o; g++) l[g] = this.deserializeNumberInt32();
            return l;
          }
        }
        deserializeBigint64Array() {
          let o = this.readSequenceLength();
          if (Me) {
            let l = this.readSlice(o * 8);
            return l.byteOffset % 8 != 0 && (l = l.slice()), new BigInt64Array(l.buffer, l.byteOffset, o);
          } else {
            let l = new BigInt64Array(o);
            for (let g = 0; g < o; g++) l[g] = this.deserializeBigintInt64();
            return l;
          }
        }
        deserializeFloat32Array() {
          let o = this.readSequenceLength();
          if (Me) {
            let l = this.readSlice(o * 4);
            return l.byteOffset % 4 != 0 && (l = l.slice()), new Float32Array(l.buffer, l.byteOffset, o);
          } else {
            let l = new Float32Array(o);
            for (let g = 0; g < o; g++) l[g] = this.deserializeNumberFloat32();
            return l;
          }
        }
        deserializeFloat64Array() {
          let o = this.readSequenceLength();
          if (Me) {
            let l = this.readSlice(o * 8);
            return l.byteOffset % 8 != 0 && (l = l.slice()), new Float64Array(l.buffer, l.byteOffset, o);
          } else {
            let l = new Float64Array(o);
            for (let g = 0; g < o; g++) l[g] = this.deserializeNumberFloat64();
            return l;
          }
        }
        deserializeBigintInt64() {
          let o = this.readSlice(8);
          return new DataView(o.buffer, o.byteOffset, o.byteLength).getBigInt64(0, true);
        }
        deserializeBigintUint64() {
          let o = this.readSlice(8);
          return new DataView(o.buffer, o.byteOffset, o.byteLength).getBigUint64(0, true);
        }
        deserializeNumberFloat64() {
          let o = this.readSlice(8);
          return new DataView(o.buffer, o.byteOffset, o.byteLength).getFloat64(0, true);
        }
        deserializeNumberFloat32() {
          let o = this.readSlice(4);
          return new DataView(o.buffer, o.byteOffset, o.byteLength).getFloat32(0, true);
        }
        deserializeNumberInt64() {
          let o = this.deserializeBigintInt64();
          if (o > Number.MAX_SAFE_INTEGER || o < Number.MIN_SAFE_INTEGER) throw new Error(`Integer value ${o} exceeds the safe range for JavaScript numbers`);
          return Number(o);
        }
        deserializeNumberUint64() {
          let o = this.deserializeBigintUint64();
          if (o > Number.MAX_SAFE_INTEGER) throw new Error(`Integer value ${o} exceeds the safe range for JavaScript numbers`);
          return Number(o);
        }
        deserializeNumberInt32() {
          let o = this.readSlice(4);
          return new DataView(o.buffer, o.byteOffset, o.byteLength).getInt32(0, true);
        }
        deserializeNumberUint32() {
          let o = this.readSlice(4);
          return new DataView(o.buffer, o.byteOffset, o.byteLength).getUint32(0, true);
        }
        deserializeNumberInt16() {
          let o = this.readSlice(2);
          return new DataView(o.buffer, o.byteOffset, o.byteLength).getInt16(0, true);
        }
        deserializeNumberUint16() {
          let o = this.readSlice(2);
          return new DataView(o.buffer, o.byteOffset, o.byteLength).getUint16(0, true);
        }
        deserializeNumberInt8() {
          let o = this.readSlice(1);
          return new DataView(o.buffer, o.byteOffset, o.byteLength).getInt8(0);
        }
        deserializeNumberUint8() {
          return this.readByte();
        }
        deserializeBoolean() {
          const o = this.readByte();
          if (o == 1) return true;
          if (o == 0) return false;
          throw new Error(`Unexpected boolean value: ${o}`);
        }
        deserializeArray(o) {
          const l = this.readSequenceLength();
          let g = new Array(l);
          for (let x = 0; x < l; x++) g[x] = o.deserialize(this);
          return g;
        }
        deserializeMap(o, l) {
          const g = this.readSequenceLength();
          let x = /* @__PURE__ */ new Map();
          for (let S = 0; S < g; S++) {
            const M = o.deserialize(this), J = l.deserialize(this);
            x.set(M, J);
          }
          return x;
        }
        deserializeObject(o) {
          let l = new o();
          return l.deserializeWithZDeserializer(this), l;
        }
        deserialize(o) {
          return o.deserialize(this);
        }
        isDone() {
          return this.buffer_.length == this.idx_;
        }
      };
      __publicField(_zo, "LEB128_CONTINUATION_MASK", 128);
      let zo = _zo;
      class Kh {
        constructor(o, l, g, x) {
          __publicField(this, "session");
          __publicField(this, "id");
          __publicField(this, "keyExpr_");
          __publicField(this, "receiver_");
          this.session = o, this.id = l, this.keyExpr_ = g, this.receiver_ = x;
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
      class Yh {
        constructor(o, l, g, x, S, M, J) {
          __publicField(this, "queryId");
          __publicField(this, "keyexpr_");
          __publicField(this, "parameters_");
          __publicField(this, "payload_");
          __publicField(this, "encoding_");
          __publicField(this, "attachment_");
          __publicField(this, "replyKeyExpr_");
          this.queryId = o, this.keyexpr_ = l, this.parameters_ = g, this.payload_ = x, this.encoding_ = S, this.attachment_ = M, this.replyKeyExpr_ = J;
        }
      }
      class Xh {
        constructor(o, l) {
          __publicField(this, "session");
          __publicField(this, "inner");
          this.session = o, this.inner = l;
        }
        selector() {
          return new on(this.inner.keyexpr_, this.inner.parameters_);
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
        async reply(o, l, g) {
          await this.session.replyOk(new Nc(this.inner.queryId, new Rt(o), new ee(l), (g == null ? void 0 : g.encoding) ? nt.from(g.encoding) : nt.default(), (g == null ? void 0 : g.attachment) ? new ee(g.attachment) : void 0, g == null ? void 0 : g.timestamp, new un((g == null ? void 0 : g.priority) ?? Ht.DEFAULT, (g == null ? void 0 : g.congestionControl) ?? Fe.DEFAULT_RESPONSE, (g == null ? void 0 : g.express) ?? false, ze.DEFAULT, fe.DEFAULT)));
        }
        async replyErr(o, l) {
          await this.session.replyErr(new Gc(this.inner.queryId, new ee(o), (l == null ? void 0 : l.encoding) ? nt.from(l.encoding) : nt.default()));
        }
        async replyDel(o, l) {
          await this.session.replyDel(new Uc(this.inner.queryId, new Rt(o), (l == null ? void 0 : l.attachment) ? new ee(l.attachment) : void 0, l == null ? void 0 : l.timestamp, new un((l == null ? void 0 : l.priority) ?? Ht.DEFAULT, (l == null ? void 0 : l.congestionControl) ?? Fe.DEFAULT_RESPONSE, (l == null ? void 0 : l.express) ?? false, ze.DEFAULT, fe.DEFAULT)));
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
      class Ni {
        constructor(o) {
          __publicField(this, "source");
          o instanceof Ni ? this.source = o.source : o instanceof Map ? this.source = Array.from(o.entries()).map(([l, g]) => g ? `${l}=${g}` : l).join(";") : this.source = o.toString();
        }
        *iterByKeyValuePos() {
          if (this.source.length === 0) return;
          let o = 0;
          for (; o < this.source.length; ) {
            for (; o < this.source.length && this.source[o] === ";"; ) o++;
            if (o >= this.source.length) break;
            const l = o;
            for (; o < this.source.length && this.source[o] !== ";" && this.source[o] !== "="; ) o++;
            const g = o - l;
            if (g === 0) continue;
            let x = -1, S = 0;
            if (o < this.source.length && this.source[o] === "=") {
              for (o++, x = o; o < this.source.length && this.source[o] !== ";"; ) o++;
              S = o - x;
            }
            yield [
              l,
              g,
              x,
              S
            ], o++;
          }
        }
        static empty() {
          return new Ni("");
        }
        remove(o) {
          let l = false, g = "", x = 0;
          for (const [S, M, J, et] of this.iterByKeyValuePos()) this.source.slice(S, S + M) == o && (g += this.source.slice(x, S), x = J >= 0 ? J + et + 1 : S + M + 1, l = true);
          return l && (g += this.source.slice(x), this.source = g.replace(/;+/g, ";").replace(/^;|;$/g, "")), l;
        }
        *iter() {
          for (const [o, l, g, x] of this.iterByKeyValuePos()) {
            let S = this.source.slice(o, o + l), M = g >= 0 ? this.source.slice(g, g + x) : "";
            yield [
              S,
              M
            ];
          }
        }
        *values(o) {
          let l = this.get(o);
          if (l != null) {
            let g = l.split("|");
            for (const x of g) yield x;
          }
        }
        isEmpty() {
          if (!this.source) return true;
          for (const o of this.iterByKeyValuePos()) return false;
          return true;
        }
        containsKey(o) {
          for (const [l, g] of this.iterByKeyValuePos()) if (this.source.slice(l, l + g) === o) return true;
          return false;
        }
        get(o) {
          for (const [l, g, x, S] of this.iterByKeyValuePos()) if (this.source.slice(l, l + g) === o) return x >= 0 ? this.source.slice(x, x + S) : "";
        }
        insert(o, l) {
          this.remove(o), this.source && !this.source.endsWith(";") && this.source.length > 0 && (this.source += ";"), this.source += `${o}=${l}`;
        }
        extend(o) {
          const l = new Ni(o);
          for (const [g, x, S, M] of l.iterByKeyValuePos()) {
            const J = l.source.slice(g, g + x), et = S >= 0 ? l.source.slice(S, S + M) : "";
            this.insert(J, et);
          }
        }
        toString() {
          return this.source;
        }
      }
      class Jh {
        constructor(o, l) {
          __publicField(this, "payload_");
          __publicField(this, "encoding_");
          this.payload_ = o, this.encoding_ = l;
        }
        payload() {
          return this.payload_;
        }
        encoding() {
          return this.encoding_;
        }
      }
      class Cu {
        constructor(o) {
          __publicField(this, "result_");
          this.result_ = o;
        }
        result() {
          return this.result_;
        }
      }
      class on {
        constructor(o, l) {
          __publicField(this, "keyExpr_");
          __publicField(this, "parameters_");
          this.keyExpr_ = new Rt(o), l == null ? this.parameters_ = new Ni("") : this.parameters_ = new Ni(l);
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
        static from(o) {
          if (o instanceof on) return o;
          if (o instanceof Rt) return new on(o, void 0);
          if (Array.isArray(o)) return new on(o[0], o[1]);
          {
            let l = o.indexOf("?");
            if (l == -1) return new on(new Rt(o));
            {
              let g = o.substring(0, l), x = o.substring(l + 1);
              return new on(new Rt(g), new Ni(x));
            }
          }
        }
      }
      var Jr = {}, To = {}, xu;
      function Qh() {
        return xu || (xu = 1, (function(h) {
          Object.defineProperty(h, "__esModule", {
            value: true
          }), h.daysFrom = h.hoursFrom = h.minutesFrom = h.secondsFrom = h.millisecondsFrom = h.numberFrom = h.daysOf = h.hoursOf = h.minutesOf = h.millisecondsOf = h.secondsOf = h.valueOf = h.valueFrom = h.isTypedDuration = void 0;
          const o = (G) => typeof G == "object" && (G == null ? void 0 : G.valueType) === "TYPED_DURATION";
          h.isTypedDuration = o;
          const l = (G) => (0, h.isTypedDuration)(G) ? G.value : G;
          h.valueFrom = l;
          const g = (G, Ut = "") => `${(0, h.valueFrom)(G)}${(0, h.isTypedDuration)(G) ? G.unit : Ut}`;
          h.valueOf = g;
          const x = (G) => (0, h.isTypedDuration)(G) && G.type === "SECONDS", S = (G) => (0, h.isTypedDuration)(G) && G.type === "MILLISECONDS", M = (G) => (0, h.isTypedDuration)(G) && G.type === "MINUTES", J = (G) => (0, h.isTypedDuration)(G) && G.type === "HOURS", et = (G) => (0, h.isTypedDuration)(G) && G.type === "DAYS", _t = (G) => typeof G == "number", wt = (G) => ({
            type: "SECONDS",
            value: G,
            valueType: "TYPED_DURATION",
            unit: "s"
          });
          function ht(G) {
            return x(G) ? G : _t(G) ? wt(G) : S(G) ? ht(G.value / 1e3) : M(G) ? ht(G.value * 60) : J(G) ? ht(gt(G)) : et(G) ? ht(gt(Zt(G))) : G;
          }
          h.secondsOf = ht;
          const Nt = (G) => ({
            type: "MILLISECONDS",
            value: G,
            valueType: "TYPED_DURATION",
            unit: "ms"
          });
          function ie(G) {
            return S(G) ? G : _t(G) ? Nt(G) : x(G) ? ie(G.value * 1e3) : M(G) ? ie(ht(G)) : J(G) ? ie(ht(gt(G))) : et(G) ? ie(ht(gt(Zt(G)))) : G;
          }
          h.millisecondsOf = ie;
          const ne = (G) => ({
            type: "MINUTES",
            value: G,
            valueType: "TYPED_DURATION",
            unit: "m"
          });
          function gt(G) {
            return M(G) ? G : _t(G) ? ne(G) : S(G) ? gt(ht(G)) : x(G) ? ne(G.value / 60) : J(G) ? ne(G.value * 60) : et(G) ? gt(Zt(G)) : G;
          }
          h.minutesOf = gt;
          const le = (G) => ({
            type: "HOURS",
            value: G,
            valueType: "TYPED_DURATION",
            unit: "h"
          });
          function Zt(G) {
            return J(G) ? G : _t(G) ? le(G) : S(G) ? Zt(gt(ht(G))) : x(G) ? Zt(gt(G)) : M(G) ? Zt(G.value / 60) : et(G) ? Zt(G.value * 24) : G;
          }
          h.hoursOf = Zt;
          const yt = (G) => ({
            type: "DAYS",
            value: G,
            valueType: "TYPED_DURATION",
            unit: "d"
          });
          function W(G) {
            return et(G) ? G : _t(G) ? yt(G) : S(G) ? W(Zt(gt(ht(G)))) : x(G) ? W(Zt(gt(G))) : M(G) ? W(Zt(G)) : J(G) ? W(G.value / 24) : G;
          }
          h.daysOf = W;
          const ot = (G) => (0, h.isTypedDuration)(G) ? G.value : G;
          h.numberFrom = ot;
          const he = (G) => _t(G) ? G : S(G) ? (0, h.numberFrom)(G) : (0, h.millisecondsFrom)(ie(G));
          h.millisecondsFrom = he;
          const Pe = (G) => _t(G) ? G : x(G) ? (0, h.numberFrom)(G) : (0, h.secondsFrom)(ht(G));
          h.secondsFrom = Pe;
          const Ne = (G) => _t(G) ? G : M(G) ? (0, h.numberFrom)(G) : (0, h.minutesFrom)(gt(G));
          h.minutesFrom = Ne;
          const Ci = (G) => _t(G) ? G : J(G) ? (0, h.numberFrom)(G) : (0, h.hoursFrom)(Zt(G));
          h.hoursFrom = Ci;
          const li = (G) => _t(G) ? G : et(G) ? (0, h.numberFrom)(G) : (0, h.daysFrom)(W(G));
          h.daysFrom = li;
        })(To)), To;
      }
      var Eu;
      function $h() {
        if (Eu) return Jr;
        Eu = 1, Object.defineProperty(Jr, "__esModule", {
          value: true
        }), Jr.Duration = void 0;
        const h = Qh();
        return Jr.Duration = {
          milliseconds: {
            of: h.millisecondsOf,
            from: h.millisecondsFrom
          },
          seconds: {
            of: h.secondsOf,
            from: h.secondsFrom
          },
          minutes: {
            of: h.minutesOf,
            from: h.minutesFrom
          },
          hours: {
            of: h.hoursOf,
            from: h.hoursFrom
          },
          days: {
            of: h.daysOf,
            from: h.daysFrom
          },
          value: {
            from: h.valueFrom,
            of: h.valueOf
          },
          isTypedDuration: h.isTypedDuration
        }, Jr;
      }
      var Ba = $h();
      class tc {
        constructor(o) {
          __publicField(this, "session");
          this.session = o;
        }
        async declareToken(o) {
          let l = await this.session.declareLivelinessToken(new Rt(o));
          return new ec(this.session, l);
        }
        async declareSubscriber(o, l) {
          let g = (l == null ? void 0 : l.handler) ?? new hn(256), [x, S, M] = ln(g), J = new Rt(o), et = await this.session.declareLivelinessSubscriber({
            keyexpr: J,
            history: (l == null ? void 0 : l.history) ?? false
          }, {
            callback: x,
            drop: S
          });
          return new ju(this.session, ts.LivelinessSubscriber, et, J, M);
        }
        async get(o, l) {
          let g = (l == null ? void 0 : l.handler) ?? new hn(256), [x, S, M] = ln(g), J = l == null ? void 0 : l.cancellationToken;
          if ((J == null ? void 0 : J.isCancelled()) ?? false) return S(), M;
          let et = await this.session.livelinessGet({
            keyexpr: new Rt(o),
            timeoutMs: (l == null ? void 0 : l.timeout) ? Ba.Duration.milliseconds.from(l.timeout) : Oo
          }, {
            callback: x,
            drop: S
          });
          return J == null ? void 0 : J.addCancelAction(() => this.session.cancelQuery(et)), M;
        }
      }
      class ec {
        constructor(o, l) {
          __publicField(this, "session");
          __publicField(this, "id");
          this.session = o, this.id = l;
        }
        async undeclare() {
          await this.session.undeclareLivelinessToken(this.id);
        }
        async [Symbol.asyncDispose]() {
          await this.undeclare();
        }
      }
      class So {
        constructor(o) {
          __publicField(this, "matching_");
          this.matching_ = o;
        }
        matching() {
          return this.matching_;
        }
      }
      class zu {
        constructor(o, l, g) {
          __publicField(this, "session");
          __publicField(this, "id");
          __publicField(this, "receiver_");
          this.session = o, this.id = l, this.receiver_ = g;
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
      class ic {
        constructor(o, l, g, x, S, M) {
          __publicField(this, "session");
          __publicField(this, "querierId");
          __publicField(this, "keyExpr_");
          __publicField(this, "congestionControl_");
          __publicField(this, "priority_");
          __publicField(this, "acceptReplies_");
          this.session = o, this.querierId = l, this.keyExpr_ = g, this.congestionControl_ = x, this.priority_ = S, this.acceptReplies_ = M;
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
        async get(o) {
          let l = (o == null ? void 0 : o.handler) ?? new hn(256), [g, x, S] = ln(l), M = o == null ? void 0 : o.cancellationToken;
          if ((M == null ? void 0 : M.isCancelled()) ?? false) return x(), S;
          let J = await this.session.querierGet({
            querierId: this.querierId,
            parameters: (o == null ? void 0 : o.parameters) ? new Ni(o.parameters).toString() : "",
            payload: (o == null ? void 0 : o.payload) ? new ee(o.payload) : void 0,
            encoding: (o == null ? void 0 : o.encoding) ? nt.from(o.encoding) : void 0,
            attachment: (o == null ? void 0 : o.attachment) ? new ee(o.attachment) : void 0
          }, {
            callback: g,
            drop: x
          });
          return M == null ? void 0 : M.addCancelAction(() => this.session.cancelQuery(J)), S;
        }
        async matchingListener(o) {
          const l = (o == null ? void 0 : o.handler) ?? new hn(256);
          let [g, x, S] = ln(l);
          const M = await this.session.querierDeclareMatchingListener(this.querierId, {
            callback: g,
            drop: x
          });
          return new zu(this.session, M, S);
        }
        async matchingStatus() {
          return await this.session.querierGetMatchingStatus(this.querierId);
        }
      }
      const Oo = 1e4;
      class No {
        constructor(o) {
          __publicField(this, "inner");
          this.inner = o;
        }
        async [Symbol.asyncDispose]() {
          await this.close();
        }
        static async open(o) {
          let l = await Jo.open(o.locator, o.messageResponseTimeoutMs);
          return new No(l);
        }
        async close() {
          this.inner.close();
        }
        isClosed() {
          return this.inner.isClosed();
        }
        async put(o, l, g) {
          await this.inner.put(new Sc(new Rt(o), new ee(l), (g == null ? void 0 : g.encoding) ? nt.from(g.encoding) : nt.default(), (g == null ? void 0 : g.attachment) ? new ee(g.attachment) : void 0, g == null ? void 0 : g.timestamp, new un((g == null ? void 0 : g.priority) ?? Ht.DEFAULT, (g == null ? void 0 : g.congestionControl) ?? Fe.DEFAULT_PUSH, (g == null ? void 0 : g.express) ?? false, (g == null ? void 0 : g.reliability) ?? ze.DEFAULT, (g == null ? void 0 : g.allowedDestination) ?? fe.DEFAULT)));
        }
        declareKeyexpr(o) {
          return new Rt(o);
        }
        async info() {
          return await this.inner.getSessionInfo();
        }
        async delete(o, l) {
          await this.inner.delete(new Dc(new Rt(o), (l == null ? void 0 : l.attachment) ? new ee(l.attachment) : void 0, l == null ? void 0 : l.timestamp, new un((l == null ? void 0 : l.priority) ?? Ht.DEFAULT, (l == null ? void 0 : l.congestionControl) ?? Fe.DEFAULT_PUSH, (l == null ? void 0 : l.express) ?? false, (l == null ? void 0 : l.reliability) ?? ze.DEFAULT, (l == null ? void 0 : l.allowedDestination) ?? fe.DEFAULT)));
        }
        async get(o, l) {
          let g = (l == null ? void 0 : l.handler) ?? new hn(256), [x, S, M] = ln(g), J = on.from(o), et = l == null ? void 0 : l.cancellationToken;
          if ((et == null ? void 0 : et.isCancelled()) ?? false) return S(), M;
          let _t = await this.inner.get({
            keyexpr: J.keyExpr(),
            parameters: J.parameters().toString(),
            payload: (l == null ? void 0 : l.payload) ? new ee(l.payload) : void 0,
            encoding: (l == null ? void 0 : l.encoding) ? nt.from(l.encoding) : void 0,
            attachment: (l == null ? void 0 : l.attachment) ? new ee(l.attachment) : void 0,
            qos: new un((l == null ? void 0 : l.priority) ?? Ht.DEFAULT, (l == null ? void 0 : l.congestionControl) ?? Fe.DEFAULT_REQUEST, (l == null ? void 0 : l.express) ?? false, ze.DEFAULT, (l == null ? void 0 : l.allowedDestination) ?? fe.DEFAULT),
            querySettings: new Mu((l == null ? void 0 : l.target) ?? xa.DEFAULT, (l == null ? void 0 : l.consolidation) ?? Ea.DEFAULT, (l == null ? void 0 : l.acceptReplies) ?? Ri.DEFAULT),
            timeoutMs: (l == null ? void 0 : l.timeout) ? Ba.Duration.milliseconds.from(l.timeout) : Oo
          }, {
            callback: x,
            drop: S
          });
          return et == null ? void 0 : et.addCancelAction(() => this.inner.cancelQuery(_t)), M;
        }
        async declareSubscriber(o, l) {
          const g = (l == null ? void 0 : l.handler) ?? new hn(256), x = new Rt(o);
          let [S, M, J] = ln(g);
          const et = await this.inner.declareSubscriber({
            keyexpr: x,
            allowedOrigin: (l == null ? void 0 : l.allowedOrigin) ?? fe.DEFAULT
          }, {
            callback: S,
            drop: M
          });
          return new ju(this.inner, ts.Subscriber, et, x, J);
        }
        liveliness() {
          return new tc(this.inner);
        }
        async newTimestamp() {
          return await this.inner.getTimestamp();
        }
        async declareQueryable(o, l) {
          const g = new Rt(o), x = (l == null ? void 0 : l.handler) ?? new hn(256), [S, M, J] = ln(x), et = await this.inner.declareQueryable({
            keyexpr: g,
            complete: (l == null ? void 0 : l.complete) ?? false,
            allowedOrigin: (l == null ? void 0 : l.allowedOrigin) ?? fe.DEFAULT
          }, {
            callback: S,
            drop: M
          });
          return new Kh(this.inner, et, g, J);
        }
        async declarePublisher(o, l) {
          let g = {
            keyexpr: new Rt(o),
            encoding: (l == null ? void 0 : l.encoding) ? nt.from(l.encoding) : nt.default(),
            qos: new un((l == null ? void 0 : l.priority) ?? Ht.DEFAULT, (l == null ? void 0 : l.congestionControl) ?? Fe.DEFAULT_PUSH, (l == null ? void 0 : l.express) ?? false, (l == null ? void 0 : l.reliability) ?? ze.DEFAULT, (l == null ? void 0 : l.allowedDestination) ?? fe.DEFAULT)
          };
          const x = await this.inner.declarePublisher(g);
          return new $c(this.inner, x, g);
        }
        async declareQuerier(o, l) {
          const g = {
            keyexpr: new Rt(o),
            qos: new un((l == null ? void 0 : l.priority) ?? Ht.DEFAULT, (l == null ? void 0 : l.congestionControl) ?? Fe.DEFAULT_REQUEST, (l == null ? void 0 : l.express) ?? false, ze.DEFAULT, (l == null ? void 0 : l.allowedDestination) ?? fe.DEFAULT),
            querySettings: new Mu((l == null ? void 0 : l.target) ?? xa.DEFAULT, (l == null ? void 0 : l.consolidation) ?? Ea.DEFAULT, (l == null ? void 0 : l.acceptReplies) ?? Ri.DEFAULT),
            timeoutMs: (l == null ? void 0 : l.timeout) ? Ba.Duration.milliseconds.from(l.timeout) : Oo
          };
          let x = await this.inner.declareQuerier(g);
          return new ic(this.inner, x, g.keyexpr, g.qos.congestionControl, g.qos.priority, g.querySettings.replyKeyExpr);
        }
      }
      async function nc(h) {
        return await No.open(h);
      }
      class rc {
        constructor(o, l, g) {
          __publicField(this, "zid_");
          __publicField(this, "peers_");
          __publicField(this, "routers_");
          this.zid_ = o, this.peers_ = l, this.routers_ = g;
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
      function sc(h) {
        switch (h) {
          case Tn.PUT:
            return Tn.PUT;
          case Tn.DELETE:
            return Tn.DELETE;
          default:
            return console.warn(`Unsupported SampleKind value ${h}`), Tn.PUT;
        }
      }
      function ac(h) {
        switch (h) {
          case Ht.REAL_TIME:
            return Ht.REAL_TIME;
          case Ht.INTERACTIVE_HIGH:
            return Ht.INTERACTIVE_HIGH;
          case Ht.INTERACTIVE_LOW:
            return Ht.INTERACTIVE_LOW;
          case Ht.DATA_HIGH:
            return Ht.DATA_HIGH;
          case Ht.DATA:
            return Ht.DATA;
          case Ht.DATA_LOW:
            return Ht.DATA_LOW;
          case Ht.BACKGROUND:
            return Ht.BACKGROUND;
          default:
            return console.warn(`Unsupported Priority value ${h}`), Ht.DEFAULT;
        }
      }
      function oc(h) {
        switch (h) {
          case Fe.DROP:
            return Fe.DROP;
          case Fe.BLOCK:
            return Fe.BLOCK;
          default:
            return console.warn(`Unsupported CongestionControl value ${h}`), Fe.DEFAULT_PUSH;
        }
      }
      function uc(h) {
        switch (h) {
          case ze.BEST_EFFORT:
            return ze.BEST_EFFORT;
          case ze.RELIABLE:
            return ze.RELIABLE;
          default:
            return console.warn(`Unsupported Reliability value ${h}`), ze.DEFAULT;
        }
      }
      function lc(h) {
        switch (h) {
          case fe.SESSION_LOCAL:
            return fe.SESSION_LOCAL;
          case fe.REMOTE:
            return fe.REMOTE;
          case fe.ANY:
            return fe.ANY;
          default:
            return console.warn(`Unsupported Locality value ${h}`), fe.DEFAULT;
        }
      }
      class un {
        constructor(o, l, g, x, S) {
          __publicField(this, "priority");
          __publicField(this, "congestionControl");
          __publicField(this, "express");
          __publicField(this, "reliability");
          __publicField(this, "locality");
          this.priority = o, this.congestionControl = l, this.express = g, this.reliability = x, this.locality = S;
        }
      }
      function Dn(h) {
        let o = h.express ? 1 : 0;
        return h.priority | h.congestionControl << 3 | o << 4 | h.reliability << 5 | h.locality << 6;
      }
      function hc(h) {
        let o = h & 7, l = h >> 3 & 1, g = h >> 4 & 1, x = h >> 5 & 1, S = h >> 6 & 3;
        return new un(ac(o), oc(l), g != 0, uc(x), lc(S));
      }
      function cc(h) {
        switch (h) {
          case Ri.ANY:
            return Ri.ANY;
          case Ri.MATCHING_QUERY:
            return Ri.MATCHING_QUERY;
          default:
            return console.warn(`Unsupported ReplyKeyExpr value ${h}`), Ri.DEFAULT;
        }
      }
      function is(h, o) {
        let [l, g] = h.toIdSchema();
        o.serializeNumberUint16(l), o.serializeString(g ?? "");
      }
      function Uo(h, o) {
        h == null ? o.serializeBoolean(false) : (o.serializeBoolean(true), is(h, o));
      }
      function Go(h) {
        let o = h.deserializeNumberUint16(), l = h.deserializeString();
        return l.length == 0 && (l = void 0), new nt(o, l);
      }
      function dc(h) {
        if (h.deserializeBoolean()) return Go(h);
      }
      class Mu {
        constructor(o, l, g) {
          __publicField(this, "target");
          __publicField(this, "consolidation");
          __publicField(this, "replyKeyExpr");
          this.target = o, this.consolidation = l, this.replyKeyExpr = g;
        }
      }
      function Nu(h) {
        return h.target | h.consolidation << 2 | h.replyKeyExpr << 4;
      }
      function Ro(h) {
        return new Ma(h.deserializeUint8Array());
      }
      function pc(h, o) {
        o.serializeUint8Array(h.toLeBytes());
      }
      function fc(h, o) {
        o.serializeBigintUint64(h.getNtp64()), pc(h.getId(), o);
      }
      function sr(h, o) {
        h == null ? o.serializeBoolean(false) : (o.serializeBoolean(true), fc(h, o));
      }
      function Uu(h) {
        let o = h.deserializeBigintUint64(), l = Ro(h);
        return new vh(l, o);
      }
      function _c(h) {
        if (h.deserializeBoolean()) return Uu(h);
      }
      function wi(h, o) {
        h == null ? o.serialize(false) : (o.serialize(true), o.serializeUint8Array(h.toBytes()));
      }
      function Fo(h) {
        if (h.deserializeBoolean()) return new ee(h.deserializeUint8Array());
      }
      function Gu(h) {
        let o = new Rt(h.deserializeString()), l = new ee(h.deserializeUint8Array()), g = sc(h.deserializeNumberUint8()), x = Go(h), S = Fo(h), M = _c(h), J = hc(h.deserializeNumberUint8());
        return new yh(o, l, g, x, S, M, J.priority, J.congestionControl, J.express);
      }
      function mc(h) {
        if (h.deserializeBoolean()) return new Cu(Gu(h));
        {
          let o = new ee(h.deserializeUint8Array()), l = Go(h);
          return new Cu(new Jh(o, l));
        }
      }
      function gc(h) {
        let o = h.deserializeNumberUint32(), l = new Rt(h.deserializeString()), g = new Ni(h.deserializeString()), x = Fo(h), S = dc(h), M = Fo(h), J = cc(h.deserializeNumberUint8());
        return new Yh(o, l, g, x, S, M, J);
      }
      var It;
      (function(h) {
        h[h.DeclarePublisher = 0] = "DeclarePublisher", h[h.UndeclarePublisher = 1] = "UndeclarePublisher", h[h.DeclareSubscriber = 2] = "DeclareSubscriber", h[h.UndeclareSubscriber = 3] = "UndeclareSubscriber", h[h.DeclareQueryable = 4] = "DeclareQueryable", h[h.UndeclareQueryable = 5] = "UndeclareQueryable", h[h.DeclareQuerier = 6] = "DeclareQuerier", h[h.UndeclareQuerier = 7] = "UndeclareQuerier", h[h.DeclareLivelinessToken = 8] = "DeclareLivelinessToken", h[h.UndeclareLivelinessToken = 9] = "UndeclareLivelinessToken", h[h.DeclareLivelinessSubscriber = 10] = "DeclareLivelinessSubscriber", h[h.UndeclareLivelinessSubscriber = 11] = "UndeclareLivelinessSubscriber", h[h.GetSessionInfo = 12] = "GetSessionInfo", h[h.GetTimestamp = 13] = "GetTimestamp", h[h.Put = 14] = "Put", h[h.Delete = 15] = "Delete", h[h.PublisherPut = 16] = "PublisherPut", h[h.PublisherDelete = 17] = "PublisherDelete", h[h.Get = 18] = "Get", h[h.QuerierGet = 19] = "QuerierGet", h[h.LivelinessGet = 20] = "LivelinessGet", h[h.ReplyOk = 21] = "ReplyOk", h[h.ReplyDel = 22] = "ReplyDel", h[h.ReplyErr = 23] = "ReplyErr", h[h.QueryResponseFinal = 24] = "QueryResponseFinal", h[h.Ping = 25] = "Ping", h[h.PublisherDeclareMatchingListener = 26] = "PublisherDeclareMatchingListener", h[h.UndeclareMatchingListener = 27] = "UndeclareMatchingListener", h[h.PublisherGetMatchingStatus = 28] = "PublisherGetMatchingStatus", h[h.QuerierDeclareMatchingListener = 29] = "QuerierDeclareMatchingListener", h[h.QuerierGetMatchingStatus = 30] = "QuerierGetMatchingStatus";
      })(It || (It = {}));
      class yc {
        constructor(o, l) {
          __publicField(this, "id");
          __publicField(this, "properties");
          __publicField(this, "outMessageId", It.DeclarePublisher);
          this.id = o, this.properties = l;
        }
        serializeWithZSerializer(o) {
          o.serializeNumberUint32(this.id), o.serializeString(this.properties.keyexpr.toString()), is(this.properties.encoding, o), o.serializeNumberUint8(Dn(this.properties.qos));
        }
      }
      class vc {
        constructor(o) {
          __publicField(this, "id");
          __publicField(this, "outMessageId", It.UndeclarePublisher);
          this.id = o;
        }
        serializeWithZSerializer(o) {
          o.serializeNumberUint32(this.id);
        }
      }
      class Lc {
        constructor(o, l) {
          __publicField(this, "id");
          __publicField(this, "properties");
          __publicField(this, "outMessageId", It.DeclareSubscriber);
          this.id = o, this.properties = l;
        }
        serializeWithZSerializer(o) {
          o.serializeNumberUint32(this.id), o.serializeString(this.properties.keyexpr.toString()), o.serializeNumberUint8(this.properties.allowedOrigin);
        }
      }
      class bc {
        constructor(o) {
          __publicField(this, "id");
          __publicField(this, "outMessageId", It.UndeclareSubscriber);
          this.id = o;
        }
        serializeWithZSerializer(o) {
          o.serializeNumberUint32(this.id);
        }
      }
      class wc {
        constructor(o, l) {
          __publicField(this, "id");
          __publicField(this, "properties");
          __publicField(this, "outMessageId", It.DeclareQueryable);
          this.id = o, this.properties = l;
        }
        serializeWithZSerializer(o) {
          o.serializeNumberUint32(this.id), o.serializeString(this.properties.keyexpr.toString()), o.serializeBoolean(this.properties.complete), o.serializeNumberUint8(this.properties.allowedOrigin);
        }
      }
      class Cc {
        constructor(o) {
          __publicField(this, "id");
          __publicField(this, "outMessageId", It.UndeclareQueryable);
          this.id = o;
        }
        serializeWithZSerializer(o) {
          o.serializeNumberUint32(this.id);
        }
      }
      class xc {
        constructor(o, l) {
          __publicField(this, "id");
          __publicField(this, "properties");
          __publicField(this, "outMessageId", It.DeclareQuerier);
          this.id = o, this.properties = l;
        }
        serializeWithZSerializer(o) {
          o.serializeNumberUint32(this.id), o.serializeString(this.properties.keyexpr.toString()), o.serializeNumberUint8(Dn(this.properties.qos)), o.serializeNumberUint8(Nu(this.properties.querySettings)), o.serializeNumberUint32(this.properties.timeoutMs);
        }
      }
      class Ec {
        constructor(o) {
          __publicField(this, "id");
          __publicField(this, "outMessageId", It.UndeclareQuerier);
          this.id = o;
        }
        serializeWithZSerializer(o) {
          o.serializeNumberUint32(this.id);
        }
      }
      class Mc {
        constructor(o, l) {
          __publicField(this, "id");
          __publicField(this, "keyexpr");
          __publicField(this, "outMessageId", It.DeclareLivelinessToken);
          this.id = o, this.keyexpr = l;
        }
        serializeWithZSerializer(o) {
          o.serializeNumberUint32(this.id), o.serializeString(this.keyexpr.toString());
        }
      }
      class kc {
        constructor(o) {
          __publicField(this, "id");
          __publicField(this, "outMessageId", It.UndeclareLivelinessToken);
          this.id = o;
        }
        serializeWithZSerializer(o) {
          o.serializeNumberUint32(this.id);
        }
      }
      class Ac {
        constructor(o, l) {
          __publicField(this, "id");
          __publicField(this, "properties");
          __publicField(this, "outMessageId", It.DeclareLivelinessSubscriber);
          this.id = o, this.properties = l;
        }
        serializeWithZSerializer(o) {
          o.serializeNumberUint32(this.id), o.serializeString(this.properties.keyexpr.toString()), o.serializeBoolean(this.properties.history);
        }
      }
      class Bc {
        constructor(o) {
          __publicField(this, "id");
          __publicField(this, "outMessageId", It.UndeclareLivelinessSubscriber);
          this.id = o;
        }
        serializeWithZSerializer(o) {
          o.serializeNumberUint32(this.id);
        }
      }
      class Pc {
        constructor() {
          __publicField(this, "outMessageId", It.GetSessionInfo);
        }
        serializeWithZSerializer(o) {
        }
      }
      class Tc {
        constructor() {
          __publicField(this, "outMessageId", It.GetTimestamp);
        }
        serializeWithZSerializer(o) {
        }
      }
      class Sc {
        constructor(o, l, g, x, S, M) {
          __publicField(this, "keyexpr");
          __publicField(this, "payload");
          __publicField(this, "encoding");
          __publicField(this, "attachment");
          __publicField(this, "timestamp");
          __publicField(this, "qos");
          __publicField(this, "outMessageId", It.Put);
          this.keyexpr = o, this.payload = l, this.encoding = g, this.attachment = x, this.timestamp = S, this.qos = M;
        }
        serializeWithZSerializer(o) {
          o.serializeString(this.keyexpr.toString()), o.serializeUint8Array(this.payload.toBytes()), is(this.encoding, o), wi(this.attachment, o), sr(this.timestamp, o), o.serializeNumberUint8(Dn(this.qos));
        }
      }
      class Dc {
        constructor(o, l, g, x) {
          __publicField(this, "keyexpr");
          __publicField(this, "attachment");
          __publicField(this, "timestamp");
          __publicField(this, "qos");
          __publicField(this, "outMessageId", It.Delete);
          this.keyexpr = o, this.attachment = l, this.timestamp = g, this.qos = x;
        }
        serializeWithZSerializer(o) {
          o.serializeString(this.keyexpr.toString()), wi(this.attachment, o), sr(this.timestamp, o), o.serializeNumberUint8(Dn(this.qos));
        }
      }
      class Ic {
        constructor(o, l, g, x, S) {
          __publicField(this, "publisherId");
          __publicField(this, "payload");
          __publicField(this, "encoding");
          __publicField(this, "attachment");
          __publicField(this, "timestamp");
          __publicField(this, "outMessageId", It.PublisherPut);
          this.publisherId = o, this.payload = l, this.encoding = g, this.attachment = x, this.timestamp = S;
        }
        serializeWithZSerializer(o) {
          o.serializeNumberUint32(this.publisherId), o.serializeUint8Array(this.payload.toBytes()), Uo(this.encoding, o), wi(this.attachment, o), sr(this.timestamp, o);
        }
      }
      class Oc {
        constructor(o, l, g) {
          __publicField(this, "publisherId");
          __publicField(this, "attachment");
          __publicField(this, "timestamp");
          __publicField(this, "outMessageId", It.PublisherDelete);
          this.publisherId = o, this.attachment = l, this.timestamp = g;
        }
        serializeWithZSerializer(o) {
          o.serializeNumberUint32(this.publisherId), wi(this.attachment, o), sr(this.timestamp, o);
        }
      }
      class Rc {
        constructor(o, l) {
          __publicField(this, "id");
          __publicField(this, "properties");
          __publicField(this, "outMessageId", It.Get);
          this.id = o, this.properties = l;
        }
        serializeWithZSerializer(o) {
          o.serializeNumberUint32(this.id), o.serializeString(this.properties.keyexpr.toString()), o.serializeString(this.properties.parameters), wi(this.properties.payload, o), Uo(this.properties.encoding, o), wi(this.properties.attachment, o), o.serializeNumberUint8(Dn(this.properties.qos)), o.serializeNumberUint8(Nu(this.properties.querySettings)), o.serializeNumberUint32(this.properties.timeoutMs);
        }
      }
      class Fc {
        constructor(o, l) {
          __publicField(this, "id");
          __publicField(this, "properties");
          __publicField(this, "outMessageId", It.QuerierGet);
          this.id = o, this.properties = l;
        }
        serializeWithZSerializer(o) {
          o.serializeNumberUint32(this.id), o.serializeNumberUint32(this.properties.querierId), o.serializeString(this.properties.parameters), wi(this.properties.payload, o), Uo(this.properties.encoding, o), wi(this.properties.attachment, o);
        }
      }
      class zc {
        constructor(o, l) {
          __publicField(this, "id");
          __publicField(this, "properties");
          __publicField(this, "outMessageId", It.LivelinessGet);
          this.id = o, this.properties = l;
        }
        serializeWithZSerializer(o) {
          o.serializeNumberUint32(this.id), o.serializeString(this.properties.keyexpr.toString()), o.serializeNumberUint32(this.properties.timeoutMs);
        }
      }
      class Nc {
        constructor(o, l, g, x, S, M, J) {
          __publicField(this, "queryId");
          __publicField(this, "keyexpr");
          __publicField(this, "payload");
          __publicField(this, "encoding");
          __publicField(this, "attachment");
          __publicField(this, "timestamp");
          __publicField(this, "qos");
          __publicField(this, "outMessageId", It.ReplyOk);
          this.queryId = o, this.keyexpr = l, this.payload = g, this.encoding = x, this.attachment = S, this.timestamp = M, this.qos = J;
        }
        serializeWithZSerializer(o) {
          o.serializeNumberUint32(this.queryId), o.serializeString(this.keyexpr.toString()), o.serializeUint8Array(this.payload.toBytes()), is(this.encoding, o), wi(this.attachment, o), sr(this.timestamp, o), o.serializeNumberUint8(Dn(this.qos));
        }
      }
      class Uc {
        constructor(o, l, g, x, S) {
          __publicField(this, "queryId");
          __publicField(this, "keyexpr");
          __publicField(this, "attachment");
          __publicField(this, "timestamp");
          __publicField(this, "qos");
          __publicField(this, "outMessageId", It.ReplyDel);
          this.queryId = o, this.keyexpr = l, this.attachment = g, this.timestamp = x, this.qos = S;
        }
        serializeWithZSerializer(o) {
          o.serializeNumberUint32(this.queryId), o.serializeString(this.keyexpr.toString()), wi(this.attachment, o), sr(this.timestamp, o), o.serializeNumberUint8(Dn(this.qos));
        }
      }
      class Gc {
        constructor(o, l, g) {
          __publicField(this, "queryId");
          __publicField(this, "payload");
          __publicField(this, "encoding");
          __publicField(this, "outMessageId", It.ReplyErr);
          this.queryId = o, this.payload = l, this.encoding = g;
        }
        serializeWithZSerializer(o) {
          o.serializeNumberUint32(this.queryId), o.serializeUint8Array(this.payload.toBytes()), is(this.encoding, o);
        }
      }
      class Pa {
        constructor(o) {
          __publicField(this, "queryId");
          __publicField(this, "outMessageId", It.QueryResponseFinal);
          __publicField(this, "inMessageId", Et.QueryResponseFinal);
          this.queryId = o;
        }
        serializeWithZSerializer(o) {
          o.serializeNumberUint32(this.queryId);
        }
        static deserialize(o) {
          let l = o.deserializeNumberUint32();
          return new Pa(l);
        }
      }
      class Zc {
        constructor() {
          __publicField(this, "outMessageId", It.Ping);
        }
        serializeWithZSerializer(o) {
        }
      }
      class jc {
        constructor(o, l) {
          __publicField(this, "id");
          __publicField(this, "publisherId");
          __publicField(this, "outMessageId", It.PublisherDeclareMatchingListener);
          this.id = o, this.publisherId = l;
        }
        serializeWithZSerializer(o) {
          o.serializeNumberUint32(this.id), o.serializeNumberUint32(this.publisherId);
        }
      }
      class qc {
        constructor(o) {
          __publicField(this, "id");
          __publicField(this, "outMessageId", It.UndeclareMatchingListener);
          this.id = o;
        }
        serializeWithZSerializer(o) {
          o.serializeNumberUint32(this.id);
        }
      }
      class Vc {
        constructor(o) {
          __publicField(this, "publisherId");
          __publicField(this, "outMessageId", It.PublisherGetMatchingStatus);
          this.publisherId = o;
        }
        serializeWithZSerializer(o) {
          o.serializeNumberUint32(this.publisherId);
        }
      }
      class Hc {
        constructor(o, l) {
          __publicField(this, "id");
          __publicField(this, "querierId");
          __publicField(this, "outMessageId", It.QuerierDeclareMatchingListener);
          this.id = o, this.querierId = l;
        }
        serializeWithZSerializer(o) {
          o.serializeNumberUint32(this.id), o.serializeNumberUint32(this.querierId);
        }
      }
      class Wc {
        constructor(o) {
          __publicField(this, "querierId");
          __publicField(this, "outMessageId", It.QuerierGetMatchingStatus);
          this.querierId = o;
        }
        serializeWithZSerializer(o) {
          o.serializeNumberUint32(this.querierId);
        }
      }
      var Et;
      (function(h) {
        h[h.ResponsePing = 0] = "ResponsePing", h[h.ResponseOk = 1] = "ResponseOk", h[h.ResponseError = 2] = "ResponseError", h[h.ResponseTimestamp = 3] = "ResponseTimestamp", h[h.ResponseSessionInfo = 4] = "ResponseSessionInfo", h[h.InSample = 5] = "InSample", h[h.InQuery = 6] = "InQuery", h[h.InReply = 7] = "InReply", h[h.QueryResponseFinal = 8] = "QueryResponseFinal", h[h.ResponseMatchingStatus = 9] = "ResponseMatchingStatus", h[h.MatchingStatusUpdate = 10] = "MatchingStatusUpdate";
      })(Et || (Et = {}));
      class Zo {
        constructor(o) {
          __publicField(this, "uuid");
          __publicField(this, "inMessageId", Et.ResponsePing);
          this.uuid = o;
        }
        static deserialize(o) {
          let l = o.deserializeString();
          return new Zo(l);
        }
      }
      class Le {
        constructor(o) {
          __publicField(this, "contentId");
          __publicField(this, "inMessageId", Et.ResponseOk);
          this.contentId = o;
        }
        static deserialize(o) {
          let l = o.deserializeNumberUint8();
          return new Le(l);
        }
      }
      class jo {
        constructor(o) {
          __publicField(this, "error");
          __publicField(this, "inMessageId", Et.ResponseError);
          this.error = o;
        }
        static deserialize(o) {
          let l = o.deserializeString();
          return new jo(l);
        }
      }
      class qo {
        constructor(o) {
          __publicField(this, "timestamp");
          __publicField(this, "inMessageId", Et.ResponseTimestamp);
          this.timestamp = o;
        }
        static deserialize(o) {
          return new qo(Uu(o));
        }
      }
      class Vo {
        constructor(o) {
          __publicField(this, "info");
          __publicField(this, "inMessageId", Et.ResponseSessionInfo);
          this.info = o;
        }
        static deserialize(o) {
          let l = Ro(o), g = Aa.array(Aa.objectStatic(Ro)), x = o.deserialize(g), S = o.deserialize(g);
          return new Vo(new rc(l, S, x));
        }
      }
      class Ho {
        constructor(o, l) {
          __publicField(this, "subscriberId");
          __publicField(this, "sample");
          __publicField(this, "inMessageId", Et.InSample);
          this.subscriberId = o, this.sample = l;
        }
        static deserialize(o) {
          let l = o.deserializeNumberUint32(), g = Gu(o);
          return new Ho(l, g);
        }
      }
      class Wo {
        constructor(o, l) {
          __publicField(this, "queryableId");
          __publicField(this, "query");
          __publicField(this, "inMessageId", Et.InQuery);
          this.queryableId = o, this.query = l;
        }
        static deserialize(o) {
          let l = o.deserializeNumberUint32(), g = gc(o);
          return new Wo(l, g);
        }
      }
      class Ko {
        constructor(o, l) {
          __publicField(this, "queryId");
          __publicField(this, "reply");
          __publicField(this, "inMessageId", Et.InReply);
          this.queryId = o, this.reply = l;
        }
        static deserialize(o) {
          let l = o.deserializeNumberUint32(), g = mc(o);
          return new Ko(l, g);
        }
      }
      class Ta {
        constructor(o) {
          __publicField(this, "matching");
          __publicField(this, "inMessageId", Et.ResponseMatchingStatus);
          this.matching = o;
        }
        static deserialize(o) {
          let l = o.deserializeBoolean();
          return new Ta(l);
        }
      }
      class Yo {
        constructor(o, l) {
          __publicField(this, "matchingListenerId");
          __publicField(this, "matching");
          __publicField(this, "inMessageId", Et.MatchingStatusUpdate);
          this.matchingListenerId = o, this.matching = l;
        }
        static deserialize(o) {
          let l = o.deserializeNumberUint32(), g = o.deserializeBoolean();
          return new Yo(l, g);
        }
      }
      const Zu = 128, Kc = 127;
      function Yc(h) {
        let o = h.deserializeNumberUint8();
        if ((o & Zu) == 0) return [
          o,
          void 0
        ];
        {
          o = o & Kc;
          const l = h.deserializeNumberUint32();
          return [
            o,
            l
          ];
        }
      }
      function Xc(h, o) {
        h[1] == null ? o.serializeNumberUint8(h[0]) : (o.serializeNumberUint8(h[0] | Zu), o.serializeNumberUint32(h[1]));
      }
      const Jc = 2 * 1024 * 1024, Qc = 2e3, ku = 10;
      class Xo {
        constructor(o) {
          __publicField(this, "ws");
          this.ws = o, this.ws = o;
        }
        static async new(o) {
          let l = this.parseZenohLocator(o), g = 0, x = Qc;
          for (; g < ku; ) {
            let S = new WebSocket(l);
            S.binaryType = "arraybuffer", S.onerror = function(J) {
              console.warn("WebSocket error: ", J);
            }, S.onclose = function(J) {
              console.warn(`WebSocket has been disconnected from remote-api-plugin: ${J.code}`);
            };
            let M = 0;
            for (; S.readyState != 1; ) if (await Au(100), M += 100, M > x) {
              S.close(), x *= 2;
              break;
            }
            if (S.readyState == 1) return console.warn("Connected to", l), new Xo(S);
            S = new WebSocket(l), console.warn("Restart connection");
          }
          throw new Error(`Failed to connect to locator endpoint: ${o} after ${ku}`);
        }
        onmessage(o) {
          this.ws.onmessage = function(l) {
            o(new Uint8Array(l.data));
          };
        }
        async send(o) {
          if (!this.isOk) throw new Error("WebSocket is closed");
          for (; this.ws.bufferedAmount > Jc; ) if (await Au(10), !this.isOk) throw new Error("WebSocket is closed");
          this.ws.send(o);
        }
        isOk() {
          return this.ws.readyState == WebSocket.OPEN;
        }
        async close() {
          this.ws.onmessage = null, !(this.ws.readyState === WebSocket.CLOSED || this.ws.readyState === WebSocket.CLOSING) && await new Promise((o, l) => {
            this.ws.onclose = () => {
              this.ws.onclose = null, this.ws.onerror = null, o();
            }, this.ws.onerror = () => {
              this.ws.onclose = null, this.ws.onerror = null, l(new Error("WebSocket error during close"));
            }, this.ws.close();
          });
        }
        static parseZenohLocator(o) {
          let l = o.split("/", 2);
          if (l.length != 2) return o;
          let g = l[0], x = l[1];
          return g != "ws" && g != "wss" ? o : `${g}://${x}`;
        }
      }
      function Au(h) {
        return new Promise((o) => setTimeout(o, h));
      }
      var ts;
      (function(h) {
        h[h.Subscriber = 0] = "Subscriber", h[h.LivelinessSubscriber = 1] = "LivelinessSubscriber";
      })(ts || (ts = {}));
      const _be = class _be {
        static get() {
          const o = _be.current;
          return _be.current == _be.MAX ? _be.current = 0 : _be.current++, o;
        }
      };
      __publicField(_be, "MAX", 1 << 31);
      __publicField(_be, "current", 0);
      let be = _be;
      class Jo {
        constructor(o, l) {
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
          this.link = o, this.messageResponseTimeoutMs = l, this.link.onmessage((g) => {
            try {
              this.onMessageReceived(g);
            } catch (x) {
              console.warn(x);
            }
          });
        }
        onMessageReceived(o) {
          let l = new zo(o), [g, x] = Yc(l);
          if (x != null) {
            let S = this.pendingMessageResponses.get(x);
            S == null ? console.warn(`Received unexpected response ${g}:${x}`) : (S([
              g,
              l
            ]), this.pendingMessageResponses.delete(x));
          } else switch (g) {
            case Et.InQuery: {
              const S = Wo.deserialize(l);
              let M = this.queryables.get(S.queryableId);
              M == null ? console.warn(`Received query for inexistant queryable ${S.queryableId}`) : M.callback(new Xh(this, S.query));
              break;
            }
            case Et.InReply: {
              const S = Ko.deserialize(l);
              let M = this.gets.get(S.queryId);
              M == null ? console.warn(`Received reply for inexistant query ${S.queryId}`) : M.callback(S.reply);
              break;
            }
            case Et.InSample: {
              const S = Ho.deserialize(l);
              let M = this.subscribers.get(S.subscriberId);
              M == null ? console.warn(`Received sample for inexistant subscriber ${S.subscriberId}`) : M.callback(S.sample);
              break;
            }
            case Et.QueryResponseFinal: {
              const S = Pa.deserialize(l);
              let M = this.gets.get(S.queryId);
              M == null ? console.warn(`Received responseFinal for inexistant get ${S.queryId}`) : (this.gets.delete(S.queryId), M.drop());
              break;
            }
            case Et.MatchingStatusUpdate: {
              const S = Yo.deserialize(l);
              let M = this.matchingListeners.get(S.matchingListenerId);
              M == null ? console.warn(`Received matching status update for inexistant matching listener ${S.matchingListenerId}`) : M.callback(new So(S.matching));
              break;
            }
            default:
              throw new Error(`Received unexpected message type ${g}`);
          }
        }
        async sendMessage(o) {
          let l = new Sn();
          return l.serializeNumberUint8(o.outMessageId), o.serializeWithZSerializer(l), await this.link.send(l.toBytes());
        }
        async sendRequest(o, l, g) {
          let x = new Sn();
          const S = this.nextMessageId;
          this.nextMessageId = (this.nextMessageId + 1) % (1 << 31), Xc([
            o.outMessageId,
            S
          ], x), o.serializeWithZSerializer(x);
          const M = new Promise((J, et) => {
            let _t = setTimeout(() => et(), this.messageResponseTimeoutMs);
            this.pendingMessageResponses.set(S, (wt) => {
              clearTimeout(_t), J(wt);
            });
          });
          return await this.link.send(x.finish().toBytes()), await M.then((J) => {
            switch (J[0]) {
              case l:
                return g(J[1]);
              case Et.ResponseError: {
                const et = jo.deserialize(J[1]);
                throw new Error(et.error);
              }
              default:
                throw new Error(`Unexpected InRemoteMessageId ${J[0]}`);
            }
          }, () => {
            throw this.pendingMessageResponses.delete(S), new Error("Remote api request timeout");
          });
        }
        async ping() {
          return await this.sendRequest(new Zc(), Et.ResponsePing, Zo.deserialize);
        }
        static async open(o, l) {
          let g = await Xo.new(o), x = new Jo(g, l);
          return x.id = (await x.ping()).uuid, console.log(`Successfully opened session with id: ${x.id}`), x;
        }
        async declarePublisher(o) {
          let l = be.get();
          return await this.sendRequest(new yc(l, o), Et.ResponseOk, Le.deserialize), l;
        }
        async undeclarePublisher(o) {
          await this.sendRequest(new vc(o), Et.ResponseOk, Le.deserialize);
        }
        async declareSubscriber(o, l) {
          let g = be.get();
          this.subscribers.set(g, l);
          try {
            await this.sendRequest(new Lc(g, o), Et.ResponseOk, Le.deserialize);
          } catch (x) {
            throw this.subscribers.delete(g), x;
          }
          return g;
        }
        async undeclareSubscriber(o) {
          const l = this.subscribers.get(o);
          l == null || (this.subscribers.delete(o), l.drop()), await this.sendRequest(new bc(o), Et.ResponseOk, Le.deserialize);
        }
        async declareQueryable(o, l) {
          let g = be.get();
          return await this.sendRequest(new wc(g, o), Et.ResponseOk, Le.deserialize), this.queryables.set(g, l), g;
        }
        async undeclareQueryable(o) {
          const l = this.queryables.get(o);
          l == null || (this.queryables.delete(o), l.drop()), await this.sendRequest(new Cc(o), Et.ResponseOk, Le.deserialize);
        }
        async declareQuerier(o) {
          let l = be.get();
          return await this.sendRequest(new xc(l, o), Et.ResponseOk, Le.deserialize), l;
        }
        async undeclareQuerier(o) {
          await this.sendRequest(new Ec(o), Et.ResponseOk, Le.deserialize);
        }
        async declareLivelinessToken(o) {
          let l = be.get();
          return await this.sendRequest(new Mc(l, o), Et.ResponseOk, Le.deserialize), l;
        }
        async undeclareLivelinessToken(o) {
          await this.sendRequest(new kc(o), Et.ResponseOk, Le.deserialize);
        }
        async declareLivelinessSubscriber(o, l) {
          let g = be.get();
          this.subscribers.set(g, l);
          try {
            await this.sendRequest(new Ac(g, o), Et.ResponseOk, Le.deserialize);
          } catch (x) {
            throw this.subscribers.delete(g), x;
          }
          return g;
        }
        async undeclareLivelinessSubscriber(o) {
          const l = this.subscribers.get(o);
          l == null || (this.subscribers.delete(o), l.drop()), await this.sendRequest(new Bc(o), Et.ResponseOk, Le.deserialize);
        }
        async getSessionInfo() {
          return await this.sendRequest(new Pc(), Et.ResponseSessionInfo, Vo.deserialize).then((o) => o.info);
        }
        async getTimestamp() {
          return await this.sendRequest(new Tc(), Et.ResponseTimestamp, qo.deserialize).then((o) => o.timestamp);
        }
        async put(o) {
          return await this.sendMessage(o);
        }
        async delete(o) {
          return await this.sendMessage(o);
        }
        async publisherPut(o) {
          return await this.sendMessage(o);
        }
        async publisherDelete(o) {
          return await this.sendMessage(o);
        }
        async get(o, l) {
          let g = be.get();
          this.gets.set(g, l);
          try {
            return await this.sendMessage(new Rc(g, o)), g;
          } catch (x) {
            throw this.gets.delete(g), x;
          }
        }
        async querierGet(o, l) {
          let g = be.get();
          this.gets.set(g, l);
          try {
            return await this.sendMessage(new Fc(g, o)), g;
          } catch (x) {
            throw this.gets.delete(g), x;
          }
        }
        async livelinessGet(o, l) {
          let g = be.get();
          this.gets.set(g, l);
          try {
            return await this.sendMessage(new zc(g, o)), g;
          } catch (x) {
            throw this.gets.delete(g), x;
          }
        }
        async replyOk(o) {
          await this.sendMessage(o);
        }
        async replyDel(o) {
          await this.sendMessage(o);
        }
        async replyErr(o) {
          await this.sendMessage(o);
        }
        async sendResponseFinal(o) {
          await this.sendMessage(new Pa(o));
        }
        async publisherDeclareMatchingListener(o, l) {
          let g = be.get();
          this.matchingListeners.set(g, l);
          try {
            await this.sendRequest(new jc(g, o), Et.ResponseOk, Le.deserialize);
          } catch (x) {
            throw this.matchingListeners.delete(g), x;
          }
          return g;
        }
        async undeclareMatchingListener(o) {
          const l = this.matchingListeners.get(o);
          l == null || (this.matchingListeners.delete(o), l.drop()), await this.sendRequest(new qc(o), Et.ResponseOk, Le.deserialize);
        }
        async publisherGetMatchingStatus(o) {
          return await this.sendRequest(new Vc(o), Et.ResponseMatchingStatus, Ta.deserialize).then((l) => new So(l.matching));
        }
        async querierDeclareMatchingListener(o, l) {
          let g = be.get();
          this.matchingListeners.set(g, l);
          try {
            await this.sendRequest(new Hc(g, o), Et.ResponseOk, Le.deserialize);
          } catch (x) {
            throw this.matchingListeners.delete(g), x;
          }
          return g;
        }
        async querierGetMatchingStatus(o) {
          return await this.sendRequest(new Wc(o), Et.ResponseMatchingStatus, Ta.deserialize).then((l) => new So(l.matching));
        }
        async close() {
          await this.link.close();
          for (let o of this.subscribers) o[1].drop();
          this.subscribers.clear();
          for (let o of this.gets) o[1].drop();
          this.gets.clear();
          for (let o of this.queryables) o[1].drop();
          this.queryables.clear();
          for (let o of this.matchingListeners) o[1].drop();
          this.matchingListeners.clear(), this.isClosed_ = true;
        }
        isClosed() {
          return this.isClosed_;
        }
        cancelQuery(o) {
          let l = this.gets.get(o);
          l != null && (this.gets.delete(o), l.drop());
        }
      }
      class ju {
        constructor(o, l, g, x, S) {
          __publicField(this, "session");
          __publicField(this, "kind");
          __publicField(this, "id");
          __publicField(this, "keyExpr_");
          __publicField(this, "receiver_");
          this.session = o, this.kind = l, this.id = g, this.keyExpr_ = x, this.receiver_ = S;
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
          this.kind === ts.Subscriber ? await this.session.undeclareSubscriber(this.id) : await this.session.undeclareLivelinessSubscriber(this.id);
        }
      }
      class $c {
        constructor(o, l, g) {
          __publicField(this, "session");
          __publicField(this, "publisherId");
          __publicField(this, "properties");
          this.session = o, this.publisherId = l, this.properties = g;
        }
        async [Symbol.asyncDispose]() {
          await this.undeclare();
        }
        keyExpr() {
          return this.properties.keyexpr;
        }
        async put(o, l) {
          await this.session.publisherPut(new Ic(this.publisherId, new ee(o), (l == null ? void 0 : l.encoding) ? nt.from(l.encoding) : void 0, (l == null ? void 0 : l.attachment) ? new ee(l.attachment) : void 0, l == null ? void 0 : l.timestamp));
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
        async delete(o) {
          await this.session.publisherDelete(new Oc(this.publisherId, (o == null ? void 0 : o.attachment) ? new ee(o.attachment) : void 0, o == null ? void 0 : o.timestamp));
        }
        async matchingListener(o) {
          const l = (o == null ? void 0 : o.handler) ?? new hn(256);
          let [g, x, S] = ln(l);
          const M = await this.session.publisherDeclareMatchingListener(this.publisherId, {
            callback: g,
            drop: x
          });
          return new zu(this.session, M, S);
        }
        async matchingStatus() {
          return await this.session.publisherGetMatchingStatus(this.publisherId);
        }
        async undeclare() {
          await this.session.undeclarePublisher(this.publisherId);
        }
      }
      class td {
        constructor(o, l = 500) {
          __publicField(this, "locator");
          __publicField(this, "messageResponseTimeoutMs");
          this.locator = o, this.messageResponseTimeoutMs = l;
        }
      }
      const ed = "v0", Do = Ba.Duration.milliseconds.of(5e3);
      class id {
        constructor(o) {
          this.session = null, this.reconnectTimer = null, this.realm = o.realm, this.entityId = o.entityId, this.remoteApiUrl = o.remoteApiUrl, this.onFrame = o.onFrame;
        }
        prefix() {
          return `${this.realm}/@${ed}/${this.entityId}`;
        }
        async connect() {
          this.reconnectTimer && (clearTimeout(this.reconnectTimer), this.reconnectTimer = null);
          try {
            const o = new td(this.remoteApiUrl);
            this.session = await nc(o), console.log("[zenoh] session opened to", this.remoteApiUrl), await this.subscribeSimFrame();
          } catch (o) {
            console.error("[zenoh] connection failed, retrying in 2s:", o), this.scheduleReconnect();
          }
        }
        scheduleReconnect() {
          this.reconnectTimer = setTimeout(() => this.connect(), 2e3);
        }
        async subscribeSimFrame() {
          if (!this.session) return;
          const o = `${this.prefix()}/pubsub/sim_frame/engine/0`;
          await this.session.declareSubscriber(o, {
            handler: (l) => {
              try {
                const g = l.payload().toString(), x = JSON.parse(g);
                this.onFrame(x);
              } catch (g) {
                console.warn("[zenoh] bad sim_frame payload:", g);
              }
            }
          }), console.log("[zenoh] subscribed to sim_frame");
        }
        async play() {
          var _a;
          await ((_a = this.session) == null ? void 0 : _a.put(`${this.prefix()}/control/play`, ""));
        }
        async pause() {
          var _a;
          await ((_a = this.session) == null ? void 0 : _a.put(`${this.prefix()}/control/pause`, ""));
        }
        async stop() {
          var _a;
          await ((_a = this.session) == null ? void 0 : _a.put(`${this.prefix()}/control/stop`, ""));
        }
        async setSpeed(o) {
          var _a;
          await ((_a = this.session) == null ? void 0 : _a.put(`${this.prefix()}/control/set_speed`, JSON.stringify({
            value: o
          })));
        }
        isSample(o) {
          return typeof o.keyexpr == "function";
        }
        async loadRoute(o) {
          if (!this.session) return {
            ok: false,
            error: "not connected"
          };
          const l = await this.session.get(`${this.prefix()}/service/load_route`, {
            payload: JSON.stringify({
              waypoints: o
            }),
            timeout: Do
          });
          if (!l) return {
            ok: false,
            error: "no reply channel"
          };
          try {
            const x = (await l.receive()).result();
            if (this.isSample(x)) {
              const S = x.payload().toString();
              return JSON.parse(S);
            } else return {
              ok: false,
              error: x.payload().toString()
            };
          } catch {
            return {
              ok: false,
              error: "query timeout"
            };
          }
        }
        async getSettings() {
          if (!this.session) return null;
          const o = await this.session.get(`${this.prefix()}/service/settings`, {
            timeout: Do
          });
          if (!o) return null;
          try {
            const g = (await o.receive()).result();
            if (this.isSample(g)) {
              const x = g.payload().toString();
              return JSON.parse(x);
            }
            return null;
          } catch {
            return null;
          }
        }
        async updateSettings(o) {
          if (!this.session) return null;
          const l = await this.session.get(`${this.prefix()}/service/settings`, {
            payload: JSON.stringify(o),
            timeout: Do
          });
          if (!l) return null;
          try {
            const x = (await l.receive()).result();
            if (this.isSample(x)) {
              const S = x.payload().toString();
              return JSON.parse(S);
            }
            return null;
          } catch {
            return null;
          }
        }
      }
      const Qo = new URLSearchParams(window.location.search), nd = Qo.get("realm") ?? "rise", rd = Qo.get("entity_id") ?? "ghost-drone", sd = [
        "localhost",
        "127.0.0.1"
      ].includes(window.location.hostname) ? "localhost" : window.location.hostname, ad = Qo.get("remote_api") ?? `ws://${sd}:10001`, Ve = new Il();
      let Fi;
      const zi = new Ol({
        onPlay: async () => {
          if (!(Ve.waypoints.length < 2)) {
            if (zi.simState === "stopped") {
              const h = Ve.waypoints.map((l) => [
                l.lat,
                l.lng
              ]), o = await Fi.loadRoute(h);
              if (!o.ok) {
                console.error("[loadRoute]", o.error);
                return;
              }
            }
            await Fi.play();
          }
        },
        onPause: () => Fi.pause(),
        onStop: () => Fi.stop(),
        onSpeedChange: (h) => Fi.setSpeed(h),
        onClear: () => {
          zi.simState === "stopped" && (Ve.clearWaypoints(), zi.updateControlStates(0));
        },
        onDrawToggle: () => {
          Ve.toggleDrawMode(), zi.setDrawModeActive(Ve.drawModeActive), Ve.updateWaypointDraggability();
        },
        onSettingsOpen: () => {
          document.getElementById("settings-overlay").style.display = "flex";
        }
      });
      Ve.getSimState = () => zi.simState;
      Ve.onWaypointsChanged = () => zi.updateControlStates(Ve.waypoints.length);
      Fi = new id({
        realm: nd,
        entityId: rd,
        remoteApiUrl: ad,
        onFrame: (h) => {
          zi.simState = h.state, Ve.updateDronePosition(h.lat, h.lng, h.heading, h.state), zi.updateControlStates(Ve.waypoints.length), Ul(h);
        }
      });
      Zl();
      jl(async (h) => {
        const o = await Fi.updateSettings(h);
        o && Tu(o);
      });
      Al(() => {
        Ve.refreshRoute(), Ve.refreshDroneIcon();
      });
      kl();
      zi.updateControlStates(0);
      Fi.connect().then(async () => {
        const h = await Fi.getSettings();
        h && Tu(h);
      });
    })();
  }
});
export default require_stdin();
