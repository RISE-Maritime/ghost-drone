var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { d as uu, C as lu, o as hu, __tla as __tla_0 } from "./config-B9ykmmDk.js";
Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  function cu() {
    const V = document.getElementById("top-bar-clock");
    function M() {
      V.textContent = (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      });
    }
    M(), setInterval(M, 1e3);
  }
  function ze(V) {
    return getComputedStyle(document.documentElement).getPropertyValue(V).trim();
  }
  function du(V) {
    document.getElementById("theme-select").addEventListener("change", function() {
      document.documentElement.setAttribute("data-obc-theme", this.value), V();
    });
  }
  var Os = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
  function pu(V) {
    return V && V.__esModule && Object.prototype.hasOwnProperty.call(V, "default") ? V.default : V;
  }
  var mr = {
    exports: {}
  };
  var fu = mr.exports, eo;
  function _u() {
    return eo || (eo = 1, (function(V, M) {
      (function(v, T) {
        T(M);
      })(fu, (function(v) {
        var T = "1.9.4";
        function j(t) {
          var n, a, l, d;
          for (a = 1, l = arguments.length; a < l; a++) {
            d = arguments[a];
            for (n in d) t[n] = d[n];
          }
          return t;
        }
        var $ = Object.create || /* @__PURE__ */ (function() {
          function t() {
          }
          return function(n) {
            return t.prototype = n, new t();
          };
        })();
        function A(t, n) {
          var a = Array.prototype.slice;
          if (t.bind) return t.bind.apply(t, a.call(arguments, 1));
          var l = a.call(arguments, 2);
          return function() {
            return t.apply(n, l.length ? l.concat(a.call(arguments)) : arguments);
          };
        }
        var ut = 0;
        function et(t) {
          return "_leaflet_id" in t || (t._leaflet_id = ++ut), t._leaflet_id;
        }
        function St(t, n, a) {
          var l, d, _, w;
          return w = function() {
            l = false, d && (_.apply(a, d), d = false);
          }, _ = function() {
            l ? d = arguments : (t.apply(a, arguments), setTimeout(w, n), l = true);
          }, _;
        }
        function Lt(t, n, a) {
          var l = n[1], d = n[0], _ = l - d;
          return t === l && a ? t : ((t - d) % _ + _) % _ + d;
        }
        function pt() {
          return false;
        }
        function Ot(t, n) {
          if (n === false) return t;
          var a = Math.pow(10, n === void 0 ? 6 : n);
          return Math.round(t * a) / a;
        }
        function ve(t) {
          return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
        }
        function ue(t) {
          return ve(t).split(/\s+/);
        }
        function Bt(t, n) {
          Object.prototype.hasOwnProperty.call(t, "options") || (t.options = t.options ? $(t.options) : {});
          for (var a in n) t.options[a] = n[a];
          return t.options;
        }
        function ke(t, n, a) {
          var l = [];
          for (var d in t) l.push(encodeURIComponent(a ? d.toUpperCase() : d) + "=" + encodeURIComponent(t[d]));
          return (!n || n.indexOf("?") === -1 ? "?" : "&") + l.join("&");
        }
        var ni = /\{ *([\w_ -]+) *\}/g;
        function tn(t, n) {
          return t.replace(ni, function(a, l) {
            var d = n[l];
            if (d === void 0) throw new Error("No value provided for variable " + a);
            return typeof d == "function" && (d = d(n)), d;
          });
        }
        var Xt = Array.isArray || function(t) {
          return Object.prototype.toString.call(t) === "[object Array]";
        };
        function Ri(t, n) {
          for (var a = 0; a < t.length; a++) if (t[a] === n) return a;
          return -1;
        }
        var we = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
        function Ee(t) {
          return window["webkit" + t] || window["moz" + t] || window["ms" + t];
        }
        var Ne = 0;
        function Fi(t) {
          var n = +/* @__PURE__ */ new Date(), a = Math.max(0, 16 - (n - Ne));
          return Ne = n + a, window.setTimeout(t, a);
        }
        var mi = window.requestAnimationFrame || Ee("RequestAnimationFrame") || Fi, ne = window.cancelAnimationFrame || Ee("CancelAnimationFrame") || Ee("CancelRequestAnimationFrame") || function(t) {
          window.clearTimeout(t);
        };
        function At(t, n, a) {
          if (a && mi === Fi) t.call(n);
          else return mi.call(window, A(t, n));
        }
        function qt(t) {
          t && ne.call(window, t);
        }
        var ri = {
          __proto__: null,
          extend: j,
          create: $,
          bind: A,
          get lastId() {
            return ut;
          },
          stamp: et,
          throttle: St,
          wrapNum: Lt,
          falseFn: pt,
          formatNum: Ot,
          trim: ve,
          splitWords: ue,
          setOptions: Bt,
          getParamString: ke,
          template: tn,
          isArray: Xt,
          indexOf: Ri,
          emptyImageUrl: we,
          requestFn: mi,
          cancelFn: ne,
          requestAnimFrame: At,
          cancelAnimFrame: qt
        };
        function Le() {
        }
        Le.extend = function(t) {
          var n = function() {
            Bt(this), this.initialize && this.initialize.apply(this, arguments), this.callInitHooks();
          }, a = n.__super__ = this.prototype, l = $(a);
          l.constructor = n, n.prototype = l;
          for (var d in this) Object.prototype.hasOwnProperty.call(this, d) && d !== "prototype" && d !== "__super__" && (n[d] = this[d]);
          return t.statics && j(n, t.statics), t.includes && (Ii(t.includes), j.apply(null, [
            l
          ].concat(t.includes))), j(l, t), delete l.statics, delete l.includes, l.options && (l.options = a.options ? $(a.options) : {}, j(l.options, t.options)), l._initHooks = [], l.callInitHooks = function() {
            if (!this._initHooksCalled) {
              a.callInitHooks && a.callInitHooks.call(this), this._initHooksCalled = true;
              for (var _ = 0, w = l._initHooks.length; _ < w; _++) l._initHooks[_].call(this);
            }
          }, n;
        }, Le.include = function(t) {
          var n = this.prototype.options;
          return j(this.prototype, t), t.options && (this.prototype.options = n, this.mergeOptions(t.options)), this;
        }, Le.mergeOptions = function(t) {
          return j(this.prototype.options, t), this;
        }, Le.addInitHook = function(t) {
          var n = Array.prototype.slice.call(arguments, 1), a = typeof t == "function" ? t : function() {
            this[t].apply(this, n);
          };
          return this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(a), this;
        };
        function Ii(t) {
          if (!(typeof L > "u" || !L || !L.Mixin)) {
            t = Xt(t) ? t : [
              t
            ];
            for (var n = 0; n < t.length; n++) t[n] === L.Mixin.Events && console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", new Error().stack);
          }
        }
        var $t = {
          on: function(t, n, a) {
            if (typeof t == "object") for (var l in t) this._on(l, t[l], n);
            else {
              t = ue(t);
              for (var d = 0, _ = t.length; d < _; d++) this._on(t[d], n, a);
            }
            return this;
          },
          off: function(t, n, a) {
            if (!arguments.length) delete this._events;
            else if (typeof t == "object") for (var l in t) this._off(l, t[l], n);
            else {
              t = ue(t);
              for (var d = arguments.length === 1, _ = 0, w = t.length; _ < w; _++) d ? this._off(t[_]) : this._off(t[_], n, a);
            }
            return this;
          },
          _on: function(t, n, a, l) {
            if (typeof n != "function") {
              console.warn("wrong listener type: " + typeof n);
              return;
            }
            if (this._listens(t, n, a) === false) {
              a === this && (a = void 0);
              var d = {
                fn: n,
                ctx: a
              };
              l && (d.once = true), this._events = this._events || {}, this._events[t] = this._events[t] || [], this._events[t].push(d);
            }
          },
          _off: function(t, n, a) {
            var l, d, _;
            if (this._events && (l = this._events[t], !!l)) {
              if (arguments.length === 1) {
                if (this._firingCount) for (d = 0, _ = l.length; d < _; d++) l[d].fn = pt;
                delete this._events[t];
                return;
              }
              if (typeof n != "function") {
                console.warn("wrong listener type: " + typeof n);
                return;
              }
              var w = this._listens(t, n, a);
              if (w !== false) {
                var I = l[w];
                this._firingCount && (I.fn = pt, this._events[t] = l = l.slice()), l.splice(w, 1);
              }
            }
          },
          fire: function(t, n, a) {
            if (!this.listens(t, a)) return this;
            var l = j({}, n, {
              type: t,
              target: this,
              sourceTarget: n && n.sourceTarget || this
            });
            if (this._events) {
              var d = this._events[t];
              if (d) {
                this._firingCount = this._firingCount + 1 || 1;
                for (var _ = 0, w = d.length; _ < w; _++) {
                  var I = d[_], G = I.fn;
                  I.once && this.off(t, G, I.ctx), G.call(I.ctx || this, l);
                }
                this._firingCount--;
              }
            }
            return a && this._propagateEvent(l), this;
          },
          listens: function(t, n, a, l) {
            typeof t != "string" && console.warn('"string" type argument expected');
            var d = n;
            typeof n != "function" && (l = !!n, d = void 0, a = void 0);
            var _ = this._events && this._events[t];
            if (_ && _.length && this._listens(t, d, a) !== false) return true;
            if (l) {
              for (var w in this._eventParents) if (this._eventParents[w].listens(t, n, a, l)) return true;
            }
            return false;
          },
          _listens: function(t, n, a) {
            if (!this._events) return false;
            var l = this._events[t] || [];
            if (!n) return !!l.length;
            a === this && (a = void 0);
            for (var d = 0, _ = l.length; d < _; d++) if (l[d].fn === n && l[d].ctx === a) return d;
            return false;
          },
          once: function(t, n, a) {
            if (typeof t == "object") for (var l in t) this._on(l, t[l], n, true);
            else {
              t = ue(t);
              for (var d = 0, _ = t.length; d < _; d++) this._on(t[d], n, a, true);
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
            for (var n in this._eventParents) this._eventParents[n].fire(t.type, j({
              layer: t.target,
              propagatedFrom: t.target
            }, t), true);
          }
        };
        $t.addEventListener = $t.on, $t.removeEventListener = $t.clearAllEventListeners = $t.off, $t.addOneTimeEventListener = $t.once, $t.fireEvent = $t.fire, $t.hasEventListeners = $t.listens;
        var si = Le.extend($t);
        function at(t, n, a) {
          this.x = a ? Math.round(t) : t, this.y = a ? Math.round(n) : n;
        }
        var Ke = Math.trunc || function(t) {
          return t > 0 ? Math.floor(t) : Math.ceil(t);
        };
        at.prototype = {
          clone: function() {
            return new at(this.x, this.y);
          },
          add: function(t) {
            return this.clone()._add(st(t));
          },
          _add: function(t) {
            return this.x += t.x, this.y += t.y, this;
          },
          subtract: function(t) {
            return this.clone()._subtract(st(t));
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
            return new at(this.x * t.x, this.y * t.y);
          },
          unscaleBy: function(t) {
            return new at(this.x / t.x, this.y / t.y);
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
            return this.x = Ke(this.x), this.y = Ke(this.y), this;
          },
          distanceTo: function(t) {
            t = st(t);
            var n = t.x - this.x, a = t.y - this.y;
            return Math.sqrt(n * n + a * a);
          },
          equals: function(t) {
            return t = st(t), t.x === this.x && t.y === this.y;
          },
          contains: function(t) {
            return t = st(t), Math.abs(t.x) <= Math.abs(this.x) && Math.abs(t.y) <= Math.abs(this.y);
          },
          toString: function() {
            return "Point(" + Ot(this.x) + ", " + Ot(this.y) + ")";
          }
        };
        function st(t, n, a) {
          return t instanceof at ? t : Xt(t) ? new at(t[0], t[1]) : t == null ? t : typeof t == "object" && "x" in t && "y" in t ? new at(t.x, t.y) : new at(t, n, a);
        }
        function gt(t, n) {
          if (t) for (var a = n ? [
            t,
            n
          ] : t, l = 0, d = a.length; l < d; l++) this.extend(a[l]);
        }
        gt.prototype = {
          extend: function(t) {
            var n, a;
            if (!t) return this;
            if (t instanceof at || typeof t[0] == "number" || "x" in t) n = a = st(t);
            else if (t = Ft(t), n = t.min, a = t.max, !n || !a) return this;
            return !this.min && !this.max ? (this.min = n.clone(), this.max = a.clone()) : (this.min.x = Math.min(n.x, this.min.x), this.max.x = Math.max(a.x, this.max.x), this.min.y = Math.min(n.y, this.min.y), this.max.y = Math.max(a.y, this.max.y)), this;
          },
          getCenter: function(t) {
            return st((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2, t);
          },
          getBottomLeft: function() {
            return st(this.min.x, this.max.y);
          },
          getTopRight: function() {
            return st(this.max.x, this.min.y);
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
            return typeof t[0] == "number" || t instanceof at ? t = st(t) : t = Ft(t), t instanceof gt ? (n = t.min, a = t.max) : n = a = t, n.x >= this.min.x && a.x <= this.max.x && n.y >= this.min.y && a.y <= this.max.y;
          },
          intersects: function(t) {
            t = Ft(t);
            var n = this.min, a = this.max, l = t.min, d = t.max, _ = d.x >= n.x && l.x <= a.x, w = d.y >= n.y && l.y <= a.y;
            return _ && w;
          },
          overlaps: function(t) {
            t = Ft(t);
            var n = this.min, a = this.max, l = t.min, d = t.max, _ = d.x > n.x && l.x < a.x, w = d.y > n.y && l.y < a.y;
            return _ && w;
          },
          isValid: function() {
            return !!(this.min && this.max);
          },
          pad: function(t) {
            var n = this.min, a = this.max, l = Math.abs(n.x - a.x) * t, d = Math.abs(n.y - a.y) * t;
            return Ft(st(n.x - l, n.y - d), st(a.x + l, a.y + d));
          },
          equals: function(t) {
            return t ? (t = Ft(t), this.min.equals(t.getTopLeft()) && this.max.equals(t.getBottomRight())) : false;
          }
        };
        function Ft(t, n) {
          return !t || t instanceof gt ? t : new gt(t, n);
        }
        function Dt(t, n) {
          if (t) for (var a = n ? [
            t,
            n
          ] : t, l = 0, d = a.length; l < d; l++) this.extend(a[l]);
        }
        Dt.prototype = {
          extend: function(t) {
            var n = this._southWest, a = this._northEast, l, d;
            if (t instanceof bt) l = t, d = t;
            else if (t instanceof Dt) {
              if (l = t._southWest, d = t._northEast, !l || !d) return this;
            } else return t ? this.extend(_t(t) || Et(t)) : this;
            return !n && !a ? (this._southWest = new bt(l.lat, l.lng), this._northEast = new bt(d.lat, d.lng)) : (n.lat = Math.min(l.lat, n.lat), n.lng = Math.min(l.lng, n.lng), a.lat = Math.max(d.lat, a.lat), a.lng = Math.max(d.lng, a.lng)), this;
          },
          pad: function(t) {
            var n = this._southWest, a = this._northEast, l = Math.abs(n.lat - a.lat) * t, d = Math.abs(n.lng - a.lng) * t;
            return new Dt(new bt(n.lat - l, n.lng - d), new bt(a.lat + l, a.lng + d));
          },
          getCenter: function() {
            return new bt((this._southWest.lat + this._northEast.lat) / 2, (this._southWest.lng + this._northEast.lng) / 2);
          },
          getSouthWest: function() {
            return this._southWest;
          },
          getNorthEast: function() {
            return this._northEast;
          },
          getNorthWest: function() {
            return new bt(this.getNorth(), this.getWest());
          },
          getSouthEast: function() {
            return new bt(this.getSouth(), this.getEast());
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
            typeof t[0] == "number" || t instanceof bt || "lat" in t ? t = _t(t) : t = Et(t);
            var n = this._southWest, a = this._northEast, l, d;
            return t instanceof Dt ? (l = t.getSouthWest(), d = t.getNorthEast()) : l = d = t, l.lat >= n.lat && d.lat <= a.lat && l.lng >= n.lng && d.lng <= a.lng;
          },
          intersects: function(t) {
            t = Et(t);
            var n = this._southWest, a = this._northEast, l = t.getSouthWest(), d = t.getNorthEast(), _ = d.lat >= n.lat && l.lat <= a.lat, w = d.lng >= n.lng && l.lng <= a.lng;
            return _ && w;
          },
          overlaps: function(t) {
            t = Et(t);
            var n = this._southWest, a = this._northEast, l = t.getSouthWest(), d = t.getNorthEast(), _ = d.lat > n.lat && l.lat < a.lat, w = d.lng > n.lng && l.lng < a.lng;
            return _ && w;
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
            return t ? (t = Et(t), this._southWest.equals(t.getSouthWest(), n) && this._northEast.equals(t.getNorthEast(), n)) : false;
          },
          isValid: function() {
            return !!(this._southWest && this._northEast);
          }
        };
        function Et(t, n) {
          return t instanceof Dt ? t : new Dt(t, n);
        }
        function bt(t, n, a) {
          if (isNaN(t) || isNaN(n)) throw new Error("Invalid LatLng object: (" + t + ", " + n + ")");
          this.lat = +t, this.lng = +n, a !== void 0 && (this.alt = +a);
        }
        bt.prototype = {
          equals: function(t, n) {
            if (!t) return false;
            t = _t(t);
            var a = Math.max(Math.abs(this.lat - t.lat), Math.abs(this.lng - t.lng));
            return a <= (n === void 0 ? 1e-9 : n);
          },
          toString: function(t) {
            return "LatLng(" + Ot(this.lat, t) + ", " + Ot(this.lng, t) + ")";
          },
          distanceTo: function(t) {
            return Be.distance(this, _t(t));
          },
          wrap: function() {
            return Be.wrapLatLng(this);
          },
          toBounds: function(t) {
            var n = 180 * t / 40075017, a = n / Math.cos(Math.PI / 180 * this.lat);
            return Et([
              this.lat - n,
              this.lng - a
            ], [
              this.lat + n,
              this.lng + a
            ]);
          },
          clone: function() {
            return new bt(this.lat, this.lng, this.alt);
          }
        };
        function _t(t, n, a) {
          return t instanceof bt ? t : Xt(t) && typeof t[0] != "object" ? t.length === 3 ? new bt(t[0], t[1], t[2]) : t.length === 2 ? new bt(t[0], t[1]) : null : t == null ? t : typeof t == "object" && "lat" in t ? new bt(t.lat, "lng" in t ? t.lng : t.lon, t.alt) : n === void 0 ? null : new bt(t, n, a);
        }
        var be = {
          latLngToPoint: function(t, n) {
            var a = this.projection.project(t), l = this.scale(n);
            return this.transformation._transform(a, l);
          },
          pointToLatLng: function(t, n) {
            var a = this.scale(n), l = this.transformation.untransform(t, a);
            return this.projection.unproject(l);
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
            var n = this.projection.bounds, a = this.scale(t), l = this.transformation.transform(n.min, a), d = this.transformation.transform(n.max, a);
            return new gt(l, d);
          },
          infinite: false,
          wrapLatLng: function(t) {
            var n = this.wrapLng ? Lt(t.lng, this.wrapLng, true) : t.lng, a = this.wrapLat ? Lt(t.lat, this.wrapLat, true) : t.lat, l = t.alt;
            return new bt(a, n, l);
          },
          wrapLatLngBounds: function(t) {
            var n = t.getCenter(), a = this.wrapLatLng(n), l = n.lat - a.lat, d = n.lng - a.lng;
            if (l === 0 && d === 0) return t;
            var _ = t.getSouthWest(), w = t.getNorthEast(), I = new bt(_.lat - l, _.lng - d), G = new bt(w.lat - l, w.lng - d);
            return new Dt(I, G);
          }
        }, Be = j({}, be, {
          wrapLng: [
            -180,
            180
          ],
          R: 6371e3,
          distance: function(t, n) {
            var a = Math.PI / 180, l = t.lat * a, d = n.lat * a, _ = Math.sin((n.lat - t.lat) * a / 2), w = Math.sin((n.lng - t.lng) * a / 2), I = _ * _ + Math.cos(l) * Math.cos(d) * w * w, G = 2 * Math.atan2(Math.sqrt(I), Math.sqrt(1 - I));
            return this.R * G;
          }
        }), zi = 6378137, wn = {
          R: zi,
          MAX_LATITUDE: 85.0511287798,
          project: function(t) {
            var n = Math.PI / 180, a = this.MAX_LATITUDE, l = Math.max(Math.min(a, t.lat), -a), d = Math.sin(l * n);
            return new at(this.R * t.lng * n, this.R * Math.log((1 + d) / (1 - d)) / 2);
          },
          unproject: function(t) {
            var n = 180 / Math.PI;
            return new bt((2 * Math.atan(Math.exp(t.y / this.R)) - Math.PI / 2) * n, t.x * n / this.R);
          },
          bounds: (function() {
            var t = zi * Math.PI;
            return new gt([
              -t,
              -t
            ], [
              t,
              t
            ]);
          })()
        };
        function En(t, n, a, l) {
          if (Xt(t)) {
            this._a = t[0], this._b = t[1], this._c = t[2], this._d = t[3];
            return;
          }
          this._a = t, this._b = n, this._c = a, this._d = l;
        }
        En.prototype = {
          transform: function(t, n) {
            return this._transform(t.clone(), n);
          },
          _transform: function(t, n) {
            return n = n || 1, t.x = n * (this._a * t.x + this._b), t.y = n * (this._c * t.y + this._d), t;
          },
          untransform: function(t, n) {
            return n = n || 1, new at((t.x / n - this._b) / this._a, (t.y / n - this._d) / this._c);
          }
        };
        function Ni(t, n, a, l) {
          return new En(t, n, a, l);
        }
        var Bn = j({}, Be, {
          code: "EPSG:3857",
          projection: wn,
          transformation: (function() {
            var t = 0.5 / (Math.PI * wn.R);
            return Ni(t, 0.5, -t, 0.5);
          })()
        }), vr = j({}, Bn, {
          code: "EPSG:900913"
        });
        function Lr(t) {
          return document.createElementNS("http://www.w3.org/2000/svg", t);
        }
        function br(t, n) {
          var a = "", l, d, _, w, I, G;
          for (l = 0, _ = t.length; l < _; l++) {
            for (I = t[l], d = 0, w = I.length; d < w; d++) G = I[d], a += (d ? "L" : "M") + G.x + " " + G.y;
            a += n ? rt.svg ? "z" : "x" : "";
          }
          return a || "M0 0";
        }
        var en = document.documentElement.style, gi = "ActiveXObject" in window, xr = gi && !document.addEventListener, Cr = "msLaunchUri" in navigator && !("documentMode" in document), Pn = xe("webkit"), Mr = xe("android"), kr = xe("android 2") || xe("android 3"), js = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10), Zs = Mr && xe("Google") && js < 537 && !("AudioNode" in window), Sn = !!window.opera, wr = !Cr && xe("chrome"), Er = xe("gecko") && !Pn && !Sn && !gi, Br = !wr && xe("safari"), Dn = xe("phantom"), Pr = "OTransition" in en, yi = navigator.platform.indexOf("Win") === 0, Sr = gi && "transition" in en, nn = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !kr, vi = "MozPerspective" in en, Dr = !window.L_DISABLE_3D && (Sr || nn || vi) && !Pr && !Dn, ai = typeof orientation < "u" || xe("mobile"), Us = ai && Pn, Vs = ai && nn, An = !window.PointerEvent && window.MSPointerEvent, Ar = !!(window.PointerEvent || An), Tr = "ontouchstart" in window || !!window.TouchEvent, Hs = !window.L_NO_TOUCH && (Tr || Ar), Ks = ai && Sn, Or = ai && Er, Rr = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1, qs = (function() {
          var t = false;
          try {
            var n = Object.defineProperty({}, "passive", {
              get: function() {
                t = true;
              }
            });
            window.addEventListener("testPassiveEventSupport", pt, n), window.removeEventListener("testPassiveEventSupport", pt, n);
          } catch {
          }
          return t;
        })(), Ws = (function() {
          return !!document.createElement("canvas").getContext;
        })(), Tn = !!(document.createElementNS && Lr("svg").createSVGRect), Fr = !!Tn && (function() {
          var t = document.createElement("div");
          return t.innerHTML = "<svg/>", (t.firstChild && t.firstChild.namespaceURI) === "http://www.w3.org/2000/svg";
        })(), Js = !Tn && (function() {
          try {
            var t = document.createElement("div");
            t.innerHTML = '<v:shape adj="1"/>';
            var n = t.firstChild;
            return n.style.behavior = "url(#default#VML)", n && typeof n.adj == "object";
          } catch {
            return false;
          }
        })(), Ys = navigator.platform.indexOf("Mac") === 0, Xs = navigator.platform.indexOf("Linux") === 0;
        function xe(t) {
          return navigator.userAgent.toLowerCase().indexOf(t) >= 0;
        }
        var rt = {
          ie: gi,
          ielt9: xr,
          edge: Cr,
          webkit: Pn,
          android: Mr,
          android23: kr,
          androidStock: Zs,
          opera: Sn,
          chrome: wr,
          gecko: Er,
          safari: Br,
          phantom: Dn,
          opera12: Pr,
          win: yi,
          ie3d: Sr,
          webkit3d: nn,
          gecko3d: vi,
          any3d: Dr,
          mobile: ai,
          mobileWebkit: Us,
          mobileWebkit3d: Vs,
          msPointer: An,
          pointer: Ar,
          touch: Hs,
          touchNative: Tr,
          mobileOpera: Ks,
          mobileGecko: Or,
          retina: Rr,
          passiveEvents: qs,
          canvas: Ws,
          svg: Tn,
          vml: Js,
          inlineSvg: Fr,
          mac: Ys,
          linux: Xs
        }, Ir = rt.msPointer ? "MSPointerDown" : "pointerdown", zr = rt.msPointer ? "MSPointerMove" : "pointermove", On = rt.msPointer ? "MSPointerUp" : "pointerup", Nr = rt.msPointer ? "MSPointerCancel" : "pointercancel", Rn = {
          touchstart: Ir,
          touchmove: zr,
          touchend: On,
          touchcancel: Nr
        }, Gr = {
          touchstart: ia,
          touchmove: sn,
          touchend: sn,
          touchcancel: sn
        }, Li = {}, jr = false;
        function $s(t, n, a) {
          return n === "touchstart" && Fn(), Gr[n] ? (a = Gr[n].bind(this, a), t.addEventListener(Rn[n], a, false), a) : (console.warn("wrong event specified:", n), pt);
        }
        function Qs(t, n, a) {
          if (!Rn[n]) {
            console.warn("wrong event specified:", n);
            return;
          }
          t.removeEventListener(Rn[n], a, false);
        }
        function ta(t) {
          Li[t.pointerId] = t;
        }
        function ea(t) {
          Li[t.pointerId] && (Li[t.pointerId] = t);
        }
        function rn(t) {
          delete Li[t.pointerId];
        }
        function Fn() {
          jr || (document.addEventListener(Ir, ta, true), document.addEventListener(zr, ea, true), document.addEventListener(On, rn, true), document.addEventListener(Nr, rn, true), jr = true);
        }
        function sn(t, n) {
          if (n.pointerType !== (n.MSPOINTER_TYPE_MOUSE || "mouse")) {
            n.touches = [];
            for (var a in Li) n.touches.push(Li[a]);
            n.changedTouches = [
              n
            ], t(n);
          }
        }
        function ia(t, n) {
          n.MSPOINTER_TYPE_TOUCH && n.pointerType === n.MSPOINTER_TYPE_TOUCH && Ht(n), sn(t, n);
        }
        function na(t) {
          var n = {}, a, l;
          for (l in t) a = t[l], n[l] = a && a.bind ? a.bind(t) : a;
          return t = n, n.type = "dblclick", n.detail = 2, n.isTrusted = false, n._simulated = true, n;
        }
        var ra = 200;
        function sa(t, n) {
          t.addEventListener("dblclick", n);
          var a = 0, l;
          function d(_) {
            if (_.detail !== 1) {
              l = _.detail;
              return;
            }
            if (!(_.pointerType === "mouse" || _.sourceCapabilities && !_.sourceCapabilities.firesTouchEvents)) {
              var w = Kr(_);
              if (!(w.some(function(G) {
                return G instanceof HTMLLabelElement && G.attributes.for;
              }) && !w.some(function(G) {
                return G instanceof HTMLInputElement || G instanceof HTMLSelectElement;
              }))) {
                var I = Date.now();
                I - a <= ra ? (l++, l === 2 && n(na(_))) : l = 1, a = I;
              }
            }
          }
          return t.addEventListener("click", d), {
            dblclick: n,
            simDblclick: d
          };
        }
        function aa(t, n) {
          t.removeEventListener("dblclick", n.dblclick), t.removeEventListener("click", n.simDblclick);
        }
        var In = on([
          "transform",
          "webkitTransform",
          "OTransform",
          "MozTransform",
          "msTransform"
        ]), Gi = on([
          "webkitTransition",
          "transition",
          "OTransition",
          "MozTransition",
          "msTransition"
        ]), Zr = Gi === "webkitTransition" || Gi === "OTransition" ? Gi + "End" : "transitionend";
        function Ur(t) {
          return typeof t == "string" ? document.getElementById(t) : t;
        }
        function qe(t, n) {
          var a = t.style[n] || t.currentStyle && t.currentStyle[n];
          if ((!a || a === "auto") && document.defaultView) {
            var l = document.defaultView.getComputedStyle(t, null);
            a = l ? l[n] : null;
          }
          return a === "auto" ? null : a;
        }
        function xt(t, n, a) {
          var l = document.createElement(t);
          return l.className = n || "", a && a.appendChild(l), l;
        }
        function Tt(t) {
          var n = t.parentNode;
          n && n.removeChild(t);
        }
        function ji(t) {
          for (; t.firstChild; ) t.removeChild(t.firstChild);
        }
        function bi(t) {
          var n = t.parentNode;
          n && n.lastChild !== t && n.appendChild(t);
        }
        function xi(t) {
          var n = t.parentNode;
          n && n.firstChild !== t && n.insertBefore(t, n.firstChild);
        }
        function zn(t, n) {
          if (t.classList !== void 0) return t.classList.contains(n);
          var a = an(t);
          return a.length > 0 && new RegExp("(^|\\s)" + n + "(\\s|$)").test(a);
        }
        function ft(t, n) {
          if (t.classList !== void 0) for (var a = ue(n), l = 0, d = a.length; l < d; l++) t.classList.add(a[l]);
          else if (!zn(t, n)) {
            var _ = an(t);
            Nn(t, (_ ? _ + " " : "") + n);
          }
        }
        function It(t, n) {
          t.classList !== void 0 ? t.classList.remove(n) : Nn(t, ve((" " + an(t) + " ").replace(" " + n + " ", " ")));
        }
        function Nn(t, n) {
          t.className.baseVal === void 0 ? t.className = n : t.className.baseVal = n;
        }
        function an(t) {
          return t.correspondingElement && (t = t.correspondingElement), t.className.baseVal === void 0 ? t.className : t.className.baseVal;
        }
        function de(t, n) {
          "opacity" in t.style ? t.style.opacity = n : "filter" in t.style && oa(t, n);
        }
        function oa(t, n) {
          var a = false, l = "DXImageTransform.Microsoft.Alpha";
          try {
            a = t.filters.item(l);
          } catch {
            if (n === 1) return;
          }
          n = Math.round(n * 100), a ? (a.Enabled = n !== 100, a.Opacity = n) : t.style.filter += " progid:" + l + "(opacity=" + n + ")";
        }
        function on(t) {
          for (var n = document.documentElement.style, a = 0; a < t.length; a++) if (t[a] in n) return t[a];
          return false;
        }
        function oi(t, n, a) {
          var l = n || new at(0, 0);
          t.style[In] = (rt.ie3d ? "translate(" + l.x + "px," + l.y + "px)" : "translate3d(" + l.x + "px," + l.y + "px,0)") + (a ? " scale(" + a + ")" : "");
        }
        function Nt(t, n) {
          t._leaflet_pos = n, rt.any3d ? oi(t, n) : (t.style.left = n.x + "px", t.style.top = n.y + "px");
        }
        function We(t) {
          return t._leaflet_pos || new at(0, 0);
        }
        var Zi, Ui, Gn;
        if ("onselectstart" in document) Zi = function() {
          ht(window, "selectstart", Ht);
        }, Ui = function() {
          Mt(window, "selectstart", Ht);
        };
        else {
          var Vi = on([
            "userSelect",
            "WebkitUserSelect",
            "OUserSelect",
            "MozUserSelect",
            "msUserSelect"
          ]);
          Zi = function() {
            if (Vi) {
              var t = document.documentElement.style;
              Gn = t[Vi], t[Vi] = "none";
            }
          }, Ui = function() {
            Vi && (document.documentElement.style[Vi] = Gn, Gn = void 0);
          };
        }
        function jn() {
          ht(window, "dragstart", Ht);
        }
        function Zn() {
          Mt(window, "dragstart", Ht);
        }
        var un, Un;
        function Vn(t) {
          for (; t.tabIndex === -1; ) t = t.parentNode;
          t.style && (ln(), un = t, Un = t.style.outlineStyle, t.style.outlineStyle = "none", ht(window, "keydown", ln));
        }
        function ln() {
          un && (un.style.outlineStyle = Un, un = void 0, Un = void 0, Mt(window, "keydown", ln));
        }
        function Vr(t) {
          do
            t = t.parentNode;
          while ((!t.offsetWidth || !t.offsetHeight) && t !== document.body);
          return t;
        }
        function Hn(t) {
          var n = t.getBoundingClientRect();
          return {
            x: n.width / t.offsetWidth || 1,
            y: n.height / t.offsetHeight || 1,
            boundingClientRect: n
          };
        }
        var ua = {
          __proto__: null,
          TRANSFORM: In,
          TRANSITION: Gi,
          TRANSITION_END: Zr,
          get: Ur,
          getStyle: qe,
          create: xt,
          remove: Tt,
          empty: ji,
          toFront: bi,
          toBack: xi,
          hasClass: zn,
          addClass: ft,
          removeClass: It,
          setClass: Nn,
          getClass: an,
          setOpacity: de,
          testProp: on,
          setTransform: oi,
          setPosition: Nt,
          getPosition: We,
          get disableTextSelection() {
            return Zi;
          },
          get enableTextSelection() {
            return Ui;
          },
          disableImageDrag: jn,
          enableImageDrag: Zn,
          preventOutline: Vn,
          restoreOutline: ln,
          getSizedParentNode: Vr,
          getScale: Hn
        };
        function ht(t, n, a, l) {
          if (n && typeof n == "object") for (var d in n) qn(t, d, n[d], a);
          else {
            n = ue(n);
            for (var _ = 0, w = n.length; _ < w; _++) qn(t, n[_], a, l);
          }
          return this;
        }
        var Pe = "_leaflet_events";
        function Mt(t, n, a, l) {
          if (arguments.length === 1) Hr(t), delete t[Pe];
          else if (n && typeof n == "object") for (var d in n) Wn(t, d, n[d], a);
          else if (n = ue(n), arguments.length === 2) Hr(t, function(I) {
            return Ri(n, I) !== -1;
          });
          else for (var _ = 0, w = n.length; _ < w; _++) Wn(t, n[_], a, l);
          return this;
        }
        function Hr(t, n) {
          for (var a in t[Pe]) {
            var l = a.split(/\d/)[0];
            (!n || n(l)) && Wn(t, l, null, null, a);
          }
        }
        var Kn = {
          mouseenter: "mouseover",
          mouseleave: "mouseout",
          wheel: !("onwheel" in window) && "mousewheel"
        };
        function qn(t, n, a, l) {
          var d = n + et(a) + (l ? "_" + et(l) : "");
          if (t[Pe] && t[Pe][d]) return this;
          var _ = function(I) {
            return a.call(l || t, I || window.event);
          }, w = _;
          !rt.touchNative && rt.pointer && n.indexOf("touch") === 0 ? _ = $s(t, n, _) : rt.touch && n === "dblclick" ? _ = sa(t, _) : "addEventListener" in t ? n === "touchstart" || n === "touchmove" || n === "wheel" || n === "mousewheel" ? t.addEventListener(Kn[n] || n, _, rt.passiveEvents ? {
            passive: false
          } : false) : n === "mouseenter" || n === "mouseleave" ? (_ = function(I) {
            I = I || window.event, hn(t, I) && w(I);
          }, t.addEventListener(Kn[n], _, false)) : t.addEventListener(n, w, false) : t.attachEvent("on" + n, _), t[Pe] = t[Pe] || {}, t[Pe][d] = _;
        }
        function Wn(t, n, a, l, d) {
          d = d || n + et(a) + (l ? "_" + et(l) : "");
          var _ = t[Pe] && t[Pe][d];
          if (!_) return this;
          !rt.touchNative && rt.pointer && n.indexOf("touch") === 0 ? Qs(t, n, _) : rt.touch && n === "dblclick" ? aa(t, _) : "removeEventListener" in t ? t.removeEventListener(Kn[n] || n, _, false) : t.detachEvent("on" + n, _), t[Pe][d] = null;
        }
        function ui(t) {
          return t.stopPropagation ? t.stopPropagation() : t.originalEvent ? t.originalEvent._stopped = true : t.cancelBubble = true, this;
        }
        function Jn(t) {
          return qn(t, "wheel", ui), this;
        }
        function Hi(t) {
          return ht(t, "mousedown touchstart dblclick contextmenu", ui), t._leaflet_disable_click = true, this;
        }
        function Ht(t) {
          return t.preventDefault ? t.preventDefault() : t.returnValue = false, this;
        }
        function li(t) {
          return Ht(t), ui(t), this;
        }
        function Kr(t) {
          if (t.composedPath) return t.composedPath();
          for (var n = [], a = t.target; a; ) n.push(a), a = a.parentNode;
          return n;
        }
        function Ki(t, n) {
          if (!n) return new at(t.clientX, t.clientY);
          var a = Hn(n), l = a.boundingClientRect;
          return new at((t.clientX - l.left) / a.x - n.clientLeft, (t.clientY - l.top) / a.y - n.clientTop);
        }
        var la = rt.linux && rt.chrome ? window.devicePixelRatio : rt.mac ? window.devicePixelRatio * 3 : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
        function qr(t) {
          return rt.edge ? t.wheelDeltaY / 2 : t.deltaY && t.deltaMode === 0 ? -t.deltaY / la : t.deltaY && t.deltaMode === 1 ? -t.deltaY * 20 : t.deltaY && t.deltaMode === 2 ? -t.deltaY * 60 : t.deltaX || t.deltaZ ? 0 : t.wheelDelta ? (t.wheelDeltaY || t.wheelDelta) / 2 : t.detail && Math.abs(t.detail) < 32765 ? -t.detail * 20 : t.detail ? t.detail / -32765 * 60 : 0;
        }
        function hn(t, n) {
          var a = n.relatedTarget;
          if (!a) return true;
          try {
            for (; a && a !== t; ) a = a.parentNode;
          } catch {
            return false;
          }
          return a !== t;
        }
        var vt = {
          __proto__: null,
          on: ht,
          off: Mt,
          stopPropagation: ui,
          disableScrollPropagation: Jn,
          disableClickPropagation: Hi,
          preventDefault: Ht,
          stop: li,
          getPropagationPath: Kr,
          getMousePosition: Ki,
          getWheelDelta: qr,
          isExternalTarget: hn,
          addListener: ht,
          removeListener: Mt
        }, Wr = si.extend({
          run: function(t, n, a, l) {
            this.stop(), this._el = t, this._inProgress = true, this._duration = a || 0.25, this._easeOutPower = 1 / Math.max(l || 0.5, 0.2), this._startPos = We(t), this._offset = n.subtract(this._startPos), this._startTime = +/* @__PURE__ */ new Date(), this.fire("start"), this._animate();
          },
          stop: function() {
            this._inProgress && (this._step(true), this._complete());
          },
          _animate: function() {
            this._animId = At(this._animate, this), this._step();
          },
          _step: function(t) {
            var n = +/* @__PURE__ */ new Date() - this._startTime, a = this._duration * 1e3;
            n < a ? this._runFrame(this._easeOut(n / a), t) : (this._runFrame(1), this._complete());
          },
          _runFrame: function(t, n) {
            var a = this._startPos.add(this._offset.multiplyBy(t));
            n && a._round(), Nt(this._el, a), this.fire("step");
          },
          _complete: function() {
            qt(this._animId), this._inProgress = false, this.fire("end");
          },
          _easeOut: function(t) {
            return 1 - Math.pow(1 - t, this._easeOutPower);
          }
        }), yt = si.extend({
          options: {
            crs: Bn,
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
            n = Bt(this, n), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._sizeChanged = true, this._initContainer(t), this._initLayout(), this._onResize = A(this._onResize, this), this._initEvents(), n.maxBounds && this.setMaxBounds(n.maxBounds), n.zoom !== void 0 && (this._zoom = this._limitZoom(n.zoom)), n.center && n.zoom !== void 0 && this.setView(_t(n.center), n.zoom, {
              reset: true
            }), this.callInitHooks(), this._zoomAnimated = Gi && rt.any3d && !rt.mobileOpera && this.options.zoomAnimation, this._zoomAnimated && (this._createAnimProxy(), ht(this._proxy, Zr, this._catchTransitionEnd, this)), this._addLayers(this.options.layers);
          },
          setView: function(t, n, a) {
            if (n = n === void 0 ? this._zoom : this._limitZoom(n), t = this._limitCenter(_t(t), n, this.options.maxBounds), a = a || {}, this._stop(), this._loaded && !a.reset && a !== true) {
              a.animate !== void 0 && (a.zoom = j({
                animate: a.animate
              }, a.zoom), a.pan = j({
                animate: a.animate,
                duration: a.duration
              }, a.pan));
              var l = this._zoom !== n ? this._tryAnimatedZoom && this._tryAnimatedZoom(t, n, a.zoom) : this._tryAnimatedPan(t, a.pan);
              if (l) return clearTimeout(this._sizeTimer), this;
            }
            return this._resetView(t, n, a.pan && a.pan.noMoveStart), this;
          },
          setZoom: function(t, n) {
            return this._loaded ? this.setView(this.getCenter(), t, {
              zoom: n
            }) : (this._zoom = t, this);
          },
          zoomIn: function(t, n) {
            return t = t || (rt.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom + t, n);
          },
          zoomOut: function(t, n) {
            return t = t || (rt.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom - t, n);
          },
          setZoomAround: function(t, n, a) {
            var l = this.getZoomScale(n), d = this.getSize().divideBy(2), _ = t instanceof at ? t : this.latLngToContainerPoint(t), w = _.subtract(d).multiplyBy(1 - 1 / l), I = this.containerPointToLatLng(d.add(w));
            return this.setView(I, n, {
              zoom: a
            });
          },
          _getBoundsCenterZoom: function(t, n) {
            n = n || {}, t = t.getBounds ? t.getBounds() : Et(t);
            var a = st(n.paddingTopLeft || n.padding || [
              0,
              0
            ]), l = st(n.paddingBottomRight || n.padding || [
              0,
              0
            ]), d = this.getBoundsZoom(t, false, a.add(l));
            if (d = typeof n.maxZoom == "number" ? Math.min(n.maxZoom, d) : d, d === 1 / 0) return {
              center: t.getCenter(),
              zoom: d
            };
            var _ = l.subtract(a).divideBy(2), w = this.project(t.getSouthWest(), d), I = this.project(t.getNorthEast(), d), G = this.unproject(w.add(I).divideBy(2).add(_), d);
            return {
              center: G,
              zoom: d
            };
          },
          fitBounds: function(t, n) {
            if (t = Et(t), !t.isValid()) throw new Error("Bounds are not valid.");
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
            if (t = st(t).round(), n = n || {}, !t.x && !t.y) return this.fire("moveend");
            if (n.animate !== true && !this.getSize().contains(t)) return this._resetView(this.unproject(this.project(this.getCenter()).add(t)), this.getZoom()), this;
            if (this._panAnim || (this._panAnim = new Wr(), this._panAnim.on({
              step: this._onPanTransitionStep,
              end: this._onPanTransitionEnd
            }, this)), n.noMoveStart || this.fire("movestart"), n.animate !== false) {
              ft(this._mapPane, "leaflet-pan-anim");
              var a = this._getMapPanePos().subtract(t).round();
              this._panAnim.run(this._mapPane, a, n.duration || 0.25, n.easeLinearity);
            } else this._rawPanBy(t), this.fire("move").fire("moveend");
            return this;
          },
          flyTo: function(t, n, a) {
            if (a = a || {}, a.animate === false || !rt.any3d) return this.setView(t, n, a);
            this._stop();
            var l = this.project(this.getCenter()), d = this.project(t), _ = this.getSize(), w = this._zoom;
            t = _t(t), n = n === void 0 ? w : n;
            var I = Math.max(_.x, _.y), G = I * this.getZoomScale(w, n), q = d.distanceTo(l) || 1, tt = 1.42, ot = tt * tt;
            function mt(Rt) {
              var ie = Rt ? -1 : 1, ae = Rt ? G : I, xs = G * G - I * I + ie * ot * ot * q * q, Me = 2 * ae * ot * q, lt = xs / Me, xn = Math.sqrt(lt * lt + 1) - lt, cr = xn < 1e-9 ? -18 : Math.log(xn);
              return cr;
            }
            function ee(Rt) {
              return (Math.exp(Rt) - Math.exp(-Rt)) / 2;
            }
            function Vt(Rt) {
              return (Math.exp(Rt) + Math.exp(-Rt)) / 2;
            }
            function ge(Rt) {
              return ee(Rt) / Vt(Rt);
            }
            var se = mt(0);
            function Qe(Rt) {
              return I * (Vt(se) / Vt(se + tt * Rt));
            }
            function vs(Rt) {
              return I * (Vt(se) * ge(se + tt * Rt) - ee(se)) / ot;
            }
            function hr(Rt) {
              return 1 - Math.pow(1 - Rt, 1.5);
            }
            var Ea = Date.now(), Ls = (mt(1) - se) / tt, Ba = a.duration ? 1e3 * a.duration : 1e3 * Ls * 0.8;
            function bs() {
              var Rt = (Date.now() - Ea) / Ba, ie = hr(Rt) * Ls;
              Rt <= 1 ? (this._flyToFrame = At(bs, this), this._move(this.unproject(l.add(d.subtract(l).multiplyBy(vs(ie) / q)), w), this.getScaleZoom(I / Qe(ie), w), {
                flyTo: true
              })) : this._move(t, n)._moveEnd(true);
            }
            return this._moveStart(true, a.noMoveStart), bs.call(this), this;
          },
          flyToBounds: function(t, n) {
            var a = this._getBoundsCenterZoom(t, n);
            return this.flyTo(a.center, a.zoom, n);
          },
          setMaxBounds: function(t) {
            return t = Et(t), this.listens("moveend", this._panInsideMaxBounds) && this.off("moveend", this._panInsideMaxBounds), t.isValid() ? (this.options.maxBounds = t, this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds)) : (this.options.maxBounds = null, this);
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
            var a = this.getCenter(), l = this._limitCenter(a, this._zoom, Et(t));
            return a.equals(l) || this.panTo(l, n), this._enforcingBounds = false, this;
          },
          panInside: function(t, n) {
            n = n || {};
            var a = st(n.paddingTopLeft || n.padding || [
              0,
              0
            ]), l = st(n.paddingBottomRight || n.padding || [
              0,
              0
            ]), d = this.project(this.getCenter()), _ = this.project(t), w = this.getPixelBounds(), I = Ft([
              w.min.add(a),
              w.max.subtract(l)
            ]), G = I.getSize();
            if (!I.contains(_)) {
              this._enforcingBounds = true;
              var q = _.subtract(I.getCenter()), tt = I.extend(_).getSize().subtract(G);
              d.x += q.x < 0 ? -tt.x : tt.x, d.y += q.y < 0 ? -tt.y : tt.y, this.panTo(this.unproject(d), n), this._enforcingBounds = false;
            }
            return this;
          },
          invalidateSize: function(t) {
            if (!this._loaded) return this;
            t = j({
              animate: false,
              pan: true
            }, t === true ? {
              animate: true
            } : t);
            var n = this.getSize();
            this._sizeChanged = true, this._lastCenter = null;
            var a = this.getSize(), l = n.divideBy(2).round(), d = a.divideBy(2).round(), _ = l.subtract(d);
            return !_.x && !_.y ? this : (t.animate && t.pan ? this.panBy(_) : (t.pan && this._rawPanBy(_), this.fire("move"), t.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(A(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
              oldSize: n,
              newSize: a
            }));
          },
          stop: function() {
            return this.setZoom(this._limitZoom(this._zoom)), this.options.zoomSnap || this.fire("viewreset"), this._stop();
          },
          locate: function(t) {
            if (t = this._locateOptions = j({
              timeout: 1e4,
              watch: false
            }, t), !("geolocation" in navigator)) return this._handleGeolocationError({
              code: 0,
              message: "Geolocation not supported."
            }), this;
            var n = A(this._handleGeolocationResponse, this), a = A(this._handleGeolocationError, this);
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
              var n = t.coords.latitude, a = t.coords.longitude, l = new bt(n, a), d = l.toBounds(t.coords.accuracy * 2), _ = this._locateOptions;
              if (_.setView) {
                var w = this.getBoundsZoom(d);
                this.setView(l, _.maxZoom ? Math.min(w, _.maxZoom) : w);
              }
              var I = {
                latlng: l,
                bounds: d,
                timestamp: t.timestamp
              };
              for (var G in t.coords) typeof t.coords[G] == "number" && (I[G] = t.coords[G]);
              this.fire("locationfound", I);
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
            this._locationWatchId !== void 0 && this.stopLocate(), this._stop(), Tt(this._mapPane), this._clearControlPos && this._clearControlPos(), this._resizeRequest && (qt(this._resizeRequest), this._resizeRequest = null), this._clearHandlers(), this._loaded && this.fire("unload");
            var t;
            for (t in this._layers) this._layers[t].remove();
            for (t in this._panes) Tt(this._panes[t]);
            return this._layers = [], this._panes = [], delete this._mapPane, delete this._renderer, this;
          },
          createPane: function(t, n) {
            var a = "leaflet-pane" + (t ? " leaflet-" + t.replace("Pane", "") + "-pane" : ""), l = xt("div", a, n || this._mapPane);
            return t && (this._panes[t] = l), l;
          },
          getCenter: function() {
            return this._checkIfLoaded(), this._lastCenter && !this._moved() ? this._lastCenter.clone() : this.layerPointToLatLng(this._getCenterLayerPoint());
          },
          getZoom: function() {
            return this._zoom;
          },
          getBounds: function() {
            var t = this.getPixelBounds(), n = this.unproject(t.getBottomLeft()), a = this.unproject(t.getTopRight());
            return new Dt(n, a);
          },
          getMinZoom: function() {
            return this.options.minZoom === void 0 ? this._layersMinZoom || 0 : this.options.minZoom;
          },
          getMaxZoom: function() {
            return this.options.maxZoom === void 0 ? this._layersMaxZoom === void 0 ? 1 / 0 : this._layersMaxZoom : this.options.maxZoom;
          },
          getBoundsZoom: function(t, n, a) {
            t = Et(t), a = st(a || [
              0,
              0
            ]);
            var l = this.getZoom() || 0, d = this.getMinZoom(), _ = this.getMaxZoom(), w = t.getNorthWest(), I = t.getSouthEast(), G = this.getSize().subtract(a), q = Ft(this.project(I, l), this.project(w, l)).getSize(), tt = rt.any3d ? this.options.zoomSnap : 1, ot = G.x / q.x, mt = G.y / q.y, ee = n ? Math.max(ot, mt) : Math.min(ot, mt);
            return l = this.getScaleZoom(ee, l), tt && (l = Math.round(l / (tt / 100)) * (tt / 100), l = n ? Math.ceil(l / tt) * tt : Math.floor(l / tt) * tt), Math.max(d, Math.min(_, l));
          },
          getSize: function() {
            return (!this._size || this._sizeChanged) && (this._size = new at(this._container.clientWidth || 0, this._container.clientHeight || 0), this._sizeChanged = false), this._size.clone();
          },
          getPixelBounds: function(t, n) {
            var a = this._getTopLeftPoint(t, n);
            return new gt(a, a.add(this.getSize()));
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
            var l = a.zoom(t * a.scale(n));
            return isNaN(l) ? 1 / 0 : l;
          },
          project: function(t, n) {
            return n = n === void 0 ? this._zoom : n, this.options.crs.latLngToPoint(_t(t), n);
          },
          unproject: function(t, n) {
            return n = n === void 0 ? this._zoom : n, this.options.crs.pointToLatLng(st(t), n);
          },
          layerPointToLatLng: function(t) {
            var n = st(t).add(this.getPixelOrigin());
            return this.unproject(n);
          },
          latLngToLayerPoint: function(t) {
            var n = this.project(_t(t))._round();
            return n._subtract(this.getPixelOrigin());
          },
          wrapLatLng: function(t) {
            return this.options.crs.wrapLatLng(_t(t));
          },
          wrapLatLngBounds: function(t) {
            return this.options.crs.wrapLatLngBounds(Et(t));
          },
          distance: function(t, n) {
            return this.options.crs.distance(_t(t), _t(n));
          },
          containerPointToLayerPoint: function(t) {
            return st(t).subtract(this._getMapPanePos());
          },
          layerPointToContainerPoint: function(t) {
            return st(t).add(this._getMapPanePos());
          },
          containerPointToLatLng: function(t) {
            var n = this.containerPointToLayerPoint(st(t));
            return this.layerPointToLatLng(n);
          },
          latLngToContainerPoint: function(t) {
            return this.layerPointToContainerPoint(this.latLngToLayerPoint(_t(t)));
          },
          mouseEventToContainerPoint: function(t) {
            return Ki(t, this._container);
          },
          mouseEventToLayerPoint: function(t) {
            return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t));
          },
          mouseEventToLatLng: function(t) {
            return this.layerPointToLatLng(this.mouseEventToLayerPoint(t));
          },
          _initContainer: function(t) {
            var n = this._container = Ur(t);
            if (n) {
              if (n._leaflet_id) throw new Error("Map container is already initialized.");
            } else throw new Error("Map container not found.");
            ht(n, "scroll", this._onScroll, this), this._containerId = et(n);
          },
          _initLayout: function() {
            var t = this._container;
            this._fadeAnimated = this.options.fadeAnimation && rt.any3d, ft(t, "leaflet-container" + (rt.touch ? " leaflet-touch" : "") + (rt.retina ? " leaflet-retina" : "") + (rt.ielt9 ? " leaflet-oldie" : "") + (rt.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
            var n = qe(t, "position");
            n !== "absolute" && n !== "relative" && n !== "fixed" && n !== "sticky" && (t.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos();
          },
          _initPanes: function() {
            var t = this._panes = {};
            this._paneRenderers = {}, this._mapPane = this.createPane("mapPane", this._container), Nt(this._mapPane, new at(0, 0)), this.createPane("tilePane"), this.createPane("overlayPane"), this.createPane("shadowPane"), this.createPane("markerPane"), this.createPane("tooltipPane"), this.createPane("popupPane"), this.options.markerZoomAnimation || (ft(t.markerPane, "leaflet-zoom-hide"), ft(t.shadowPane, "leaflet-zoom-hide"));
          },
          _resetView: function(t, n, a) {
            Nt(this._mapPane, new at(0, 0));
            var l = !this._loaded;
            this._loaded = true, n = this._limitZoom(n), this.fire("viewprereset");
            var d = this._zoom !== n;
            this._moveStart(d, a)._move(t, n)._moveEnd(d), this.fire("viewreset"), l && this.fire("load");
          },
          _moveStart: function(t, n) {
            return t && this.fire("zoomstart"), n || this.fire("movestart"), this;
          },
          _move: function(t, n, a, l) {
            n === void 0 && (n = this._zoom);
            var d = this._zoom !== n;
            return this._zoom = n, this._lastCenter = t, this._pixelOrigin = this._getNewPixelOrigin(t), l ? a && a.pinch && this.fire("zoom", a) : ((d || a && a.pinch) && this.fire("zoom", a), this.fire("move", a)), this;
          },
          _moveEnd: function(t) {
            return t && this.fire("zoomend"), this.fire("moveend");
          },
          _stop: function() {
            return qt(this._flyToFrame), this._panAnim && this._panAnim.stop(), this;
          },
          _rawPanBy: function(t) {
            Nt(this._mapPane, this._getMapPanePos().subtract(t));
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
            var n = t ? Mt : ht;
            n(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this), this.options.trackResize && n(window, "resize", this._onResize, this), rt.any3d && this.options.transform3DLimit && (t ? this.off : this.on).call(this, "moveend", this._onMoveEnd);
          },
          _onResize: function() {
            qt(this._resizeRequest), this._resizeRequest = At(function() {
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
            for (var a = [], l, d = n === "mouseout" || n === "mouseover", _ = t.target || t.srcElement, w = false; _; ) {
              if (l = this._targets[et(_)], l && (n === "click" || n === "preclick") && this._draggableMoved(l)) {
                w = true;
                break;
              }
              if (l && l.listens(n, true) && (d && !hn(_, t) || (a.push(l), d)) || _ === this._container) break;
              _ = _.parentNode;
            }
            return !a.length && !w && !d && this.listens(n, true) && (a = [
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
              a === "mousedown" && Vn(n), this._fireDOMEvent(t, a);
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
              var l = j({}, t);
              l.type = "preclick", this._fireDOMEvent(l, l.type, a);
            }
            var d = this._findEventTargets(t, n);
            if (a) {
              for (var _ = [], w = 0; w < a.length; w++) a[w].listens(n, true) && _.push(a[w]);
              d = _.concat(d);
            }
            if (d.length) {
              n === "contextmenu" && Ht(t);
              var I = d[0], G = {
                originalEvent: t
              };
              if (t.type !== "keypress" && t.type !== "keydown" && t.type !== "keyup") {
                var q = I.getLatLng && (!I._radius || I._radius <= 10);
                G.containerPoint = q ? this.latLngToContainerPoint(I.getLatLng()) : this.mouseEventToContainerPoint(t), G.layerPoint = this.containerPointToLayerPoint(G.containerPoint), G.latlng = q ? I.getLatLng() : this.layerPointToLatLng(G.layerPoint);
              }
              for (w = 0; w < d.length; w++) if (d[w].fire(n, G, true), G.originalEvent._stopped || d[w].options.bubblingMouseEvents === false && Ri(this._mouseEvents, n) !== -1) return;
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
            return We(this._mapPane) || new at(0, 0);
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
            var l = this._getNewPixelOrigin(a, n);
            return this.project(t, n)._subtract(l);
          },
          _latLngBoundsToNewLayerBounds: function(t, n, a) {
            var l = this._getNewPixelOrigin(a, n);
            return Ft([
              this.project(t.getSouthWest(), n)._subtract(l),
              this.project(t.getNorthWest(), n)._subtract(l),
              this.project(t.getSouthEast(), n)._subtract(l),
              this.project(t.getNorthEast(), n)._subtract(l)
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
            var l = this.project(t, n), d = this.getSize().divideBy(2), _ = new gt(l.subtract(d), l.add(d)), w = this._getBoundsOffset(_, a, n);
            return Math.abs(w.x) <= 1 && Math.abs(w.y) <= 1 ? t : this.unproject(l.add(w), n);
          },
          _limitOffset: function(t, n) {
            if (!n) return t;
            var a = this.getPixelBounds(), l = new gt(a.min.add(t), a.max.add(t));
            return t.add(this._getBoundsOffset(l, n));
          },
          _getBoundsOffset: function(t, n, a) {
            var l = Ft(this.project(n.getNorthEast(), a), this.project(n.getSouthWest(), a)), d = l.min.subtract(t.min), _ = l.max.subtract(t.max), w = this._rebound(d.x, -_.x), I = this._rebound(d.y, -_.y);
            return new at(w, I);
          },
          _rebound: function(t, n) {
            return t + n > 0 ? Math.round(t - n) / 2 : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(n));
          },
          _limitZoom: function(t) {
            var n = this.getMinZoom(), a = this.getMaxZoom(), l = rt.any3d ? this.options.zoomSnap : 1;
            return l && (t = Math.round(t / l) * l), Math.max(n, Math.min(a, t));
          },
          _onPanTransitionStep: function() {
            this.fire("move");
          },
          _onPanTransitionEnd: function() {
            It(this._mapPane, "leaflet-pan-anim"), this.fire("moveend");
          },
          _tryAnimatedPan: function(t, n) {
            var a = this._getCenterOffset(t)._trunc();
            return (n && n.animate) !== true && !this.getSize().contains(a) ? false : (this.panBy(a, n), true);
          },
          _createAnimProxy: function() {
            var t = this._proxy = xt("div", "leaflet-proxy leaflet-zoom-animated");
            this._panes.mapPane.appendChild(t), this.on("zoomanim", function(n) {
              var a = In, l = this._proxy.style[a];
              oi(this._proxy, this.project(n.center, n.zoom), this.getZoomScale(n.zoom, 1)), l === this._proxy.style[a] && this._animatingZoom && this._onZoomTransitionEnd();
            }, this), this.on("load moveend", this._animMoveEnd, this), this._on("unload", this._destroyAnimProxy, this);
          },
          _destroyAnimProxy: function() {
            Tt(this._proxy), this.off("load moveend", this._animMoveEnd, this), delete this._proxy;
          },
          _animMoveEnd: function() {
            var t = this.getCenter(), n = this.getZoom();
            oi(this._proxy, this.project(t, n), this.getZoomScale(n, 1));
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
            var l = this.getZoomScale(n), d = this._getCenterOffset(t)._divideBy(1 - 1 / l);
            return a.animate !== true && !this.getSize().contains(d) ? false : (At(function() {
              this._moveStart(true, a.noMoveStart || false)._animateZoom(t, n, true);
            }, this), true);
          },
          _animateZoom: function(t, n, a, l) {
            this._mapPane && (a && (this._animatingZoom = true, this._animateToCenter = t, this._animateToZoom = n, ft(this._mapPane, "leaflet-zoom-anim")), this.fire("zoomanim", {
              center: t,
              zoom: n,
              noUpdate: l
            }), this._tempFireZoomEvent || (this._tempFireZoomEvent = this._zoom !== this._animateToZoom), this._move(this._animateToCenter, this._animateToZoom, void 0, true), setTimeout(A(this._onZoomTransitionEnd, this), 250));
          },
          _onZoomTransitionEnd: function() {
            this._animatingZoom && (this._mapPane && It(this._mapPane, "leaflet-zoom-anim"), this._animatingZoom = false, this._move(this._animateToCenter, this._animateToZoom, void 0, true), this._tempFireZoomEvent && this.fire("zoom"), delete this._tempFireZoomEvent, this.fire("move"), this._moveEnd(true));
          }
        });
        function cn(t, n) {
          return new yt(t, n);
        }
        var Ce = Le.extend({
          options: {
            position: "topright"
          },
          initialize: function(t) {
            Bt(this, t);
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
            var n = this._container = this.onAdd(t), a = this.getPosition(), l = t._controlCorners[a];
            return ft(n, "leaflet-control"), a.indexOf("bottom") !== -1 ? l.insertBefore(n, l.firstChild) : l.appendChild(n), this._map.on("unload", this.remove, this), this;
          },
          remove: function() {
            return this._map ? (Tt(this._container), this.onRemove && this.onRemove(this._map), this._map.off("unload", this.remove, this), this._map = null, this) : this;
          },
          _refocusOnMap: function(t) {
            this._map && t && t.screenX > 0 && t.screenY > 0 && this._map.getContainer().focus();
          }
        }), Ci = function(t) {
          return new Ce(t);
        };
        yt.include({
          addControl: function(t) {
            return t.addTo(this), this;
          },
          removeControl: function(t) {
            return t.remove(), this;
          },
          _initControlPos: function() {
            var t = this._controlCorners = {}, n = "leaflet-", a = this._controlContainer = xt("div", n + "control-container", this._container);
            function l(d, _) {
              var w = n + d + " " + n + _;
              t[d + _] = xt("div", w, a);
            }
            l("top", "left"), l("top", "right"), l("bottom", "left"), l("bottom", "right");
          },
          _clearControlPos: function() {
            for (var t in this._controlCorners) Tt(this._controlCorners[t]);
            Tt(this._controlContainer), delete this._controlCorners, delete this._controlContainer;
          }
        });
        var Jr = Ce.extend({
          options: {
            collapsed: true,
            position: "topright",
            autoZIndex: true,
            hideSingleBase: false,
            sortLayers: false,
            sortFunction: function(t, n, a, l) {
              return a < l ? -1 : l < a ? 1 : 0;
            }
          },
          initialize: function(t, n, a) {
            Bt(this, a), this._layerControlInputs = [], this._layers = [], this._lastZIndex = 0, this._handlingClick = false, this._preventClick = false;
            for (var l in t) this._addLayer(t[l], l);
            for (l in n) this._addLayer(n[l], l, true);
          },
          onAdd: function(t) {
            this._initLayout(), this._update(), this._map = t, t.on("zoomend", this._checkDisabledLayers, this);
            for (var n = 0; n < this._layers.length; n++) this._layers[n].layer.on("add remove", this._onLayerChange, this);
            return this._container;
          },
          addTo: function(t) {
            return Ce.prototype.addTo.call(this, t), this._expandIfNotCollapsed();
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
            ft(this._container, "leaflet-control-layers-expanded"), this._section.style.height = null;
            var t = this._map.getSize().y - (this._container.offsetTop + 50);
            return t < this._section.clientHeight ? (ft(this._section, "leaflet-control-layers-scrollbar"), this._section.style.height = t + "px") : It(this._section, "leaflet-control-layers-scrollbar"), this._checkDisabledLayers(), this;
          },
          collapse: function() {
            return It(this._container, "leaflet-control-layers-expanded"), this;
          },
          _initLayout: function() {
            var t = "leaflet-control-layers", n = this._container = xt("div", t), a = this.options.collapsed;
            n.setAttribute("aria-haspopup", true), Hi(n), Jn(n);
            var l = this._section = xt("section", t + "-list");
            a && (this._map.on("click", this.collapse, this), ht(n, {
              mouseenter: this._expandSafely,
              mouseleave: this.collapse
            }, this));
            var d = this._layersLink = xt("a", t + "-toggle", n);
            d.href = "#", d.title = "Layers", d.setAttribute("role", "button"), ht(d, {
              keydown: function(_) {
                _.keyCode === 13 && this._expandSafely();
              },
              click: function(_) {
                Ht(_), this._expandSafely();
              }
            }, this), a || this.expand(), this._baseLayersList = xt("div", t + "-base", l), this._separator = xt("div", t + "-separator", l), this._overlaysList = xt("div", t + "-overlays", l), n.appendChild(l);
          },
          _getLayer: function(t) {
            for (var n = 0; n < this._layers.length; n++) if (this._layers[n] && et(this._layers[n].layer) === t) return this._layers[n];
          },
          _addLayer: function(t, n, a) {
            this._map && t.on("add remove", this._onLayerChange, this), this._layers.push({
              layer: t,
              name: n,
              overlay: a
            }), this.options.sortLayers && this._layers.sort(A(function(l, d) {
              return this.options.sortFunction(l.layer, d.layer, l.name, d.name);
            }, this)), this.options.autoZIndex && t.setZIndex && (this._lastZIndex++, t.setZIndex(this._lastZIndex)), this._expandIfNotCollapsed();
          },
          _update: function() {
            if (!this._container) return this;
            ji(this._baseLayersList), ji(this._overlaysList), this._layerControlInputs = [];
            var t, n, a, l, d = 0;
            for (a = 0; a < this._layers.length; a++) l = this._layers[a], this._addItem(l), n = n || l.overlay, t = t || !l.overlay, d += l.overlay ? 0 : 1;
            return this.options.hideSingleBase && (t = t && d > 1, this._baseLayersList.style.display = t ? "" : "none"), this._separator.style.display = n && t ? "" : "none", this;
          },
          _onLayerChange: function(t) {
            this._handlingClick || this._update();
            var n = this._getLayer(et(t.target)), a = n.overlay ? t.type === "add" ? "overlayadd" : "overlayremove" : t.type === "add" ? "baselayerchange" : null;
            a && this._map.fire(a, n);
          },
          _createRadioElement: function(t, n) {
            var a = '<input type="radio" class="leaflet-control-layers-selector" name="' + t + '"' + (n ? ' checked="checked"' : "") + "/>", l = document.createElement("div");
            return l.innerHTML = a, l.firstChild;
          },
          _addItem: function(t) {
            var n = document.createElement("label"), a = this._map.hasLayer(t.layer), l;
            t.overlay ? (l = document.createElement("input"), l.type = "checkbox", l.className = "leaflet-control-layers-selector", l.defaultChecked = a) : l = this._createRadioElement("leaflet-base-layers_" + et(this), a), this._layerControlInputs.push(l), l.layerId = et(t.layer), ht(l, "click", this._onInputClick, this);
            var d = document.createElement("span");
            d.innerHTML = " " + t.name;
            var _ = document.createElement("span");
            n.appendChild(_), _.appendChild(l), _.appendChild(d);
            var w = t.overlay ? this._overlaysList : this._baseLayersList;
            return w.appendChild(n), this._checkDisabledLayers(), n;
          },
          _onInputClick: function() {
            if (!this._preventClick) {
              var t = this._layerControlInputs, n, a, l = [], d = [];
              this._handlingClick = true;
              for (var _ = t.length - 1; _ >= 0; _--) n = t[_], a = this._getLayer(n.layerId).layer, n.checked ? l.push(a) : n.checked || d.push(a);
              for (_ = 0; _ < d.length; _++) this._map.hasLayer(d[_]) && this._map.removeLayer(d[_]);
              for (_ = 0; _ < l.length; _++) this._map.hasLayer(l[_]) || this._map.addLayer(l[_]);
              this._handlingClick = false, this._refocusOnMap();
            }
          },
          _checkDisabledLayers: function() {
            for (var t = this._layerControlInputs, n, a, l = this._map.getZoom(), d = t.length - 1; d >= 0; d--) n = t[d], a = this._getLayer(n.layerId).layer, n.disabled = a.options.minZoom !== void 0 && l < a.options.minZoom || a.options.maxZoom !== void 0 && l > a.options.maxZoom;
          },
          _expandIfNotCollapsed: function() {
            return this._map && !this.options.collapsed && this.expand(), this;
          },
          _expandSafely: function() {
            var t = this._section;
            this._preventClick = true, ht(t, "click", Ht), this.expand();
            var n = this;
            setTimeout(function() {
              Mt(t, "click", Ht), n._preventClick = false;
            });
          }
        }), Yn = function(t, n, a) {
          return new Jr(t, n, a);
        }, Mi = Ce.extend({
          options: {
            position: "topleft",
            zoomInText: '<span aria-hidden="true">+</span>',
            zoomInTitle: "Zoom in",
            zoomOutText: '<span aria-hidden="true">&#x2212;</span>',
            zoomOutTitle: "Zoom out"
          },
          onAdd: function(t) {
            var n = "leaflet-control-zoom", a = xt("div", n + " leaflet-bar"), l = this.options;
            return this._zoomInButton = this._createButton(l.zoomInText, l.zoomInTitle, n + "-in", a, this._zoomIn), this._zoomOutButton = this._createButton(l.zoomOutText, l.zoomOutTitle, n + "-out", a, this._zoomOut), this._updateDisabled(), t.on("zoomend zoomlevelschange", this._updateDisabled, this), a;
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
          _createButton: function(t, n, a, l, d) {
            var _ = xt("a", a, l);
            return _.innerHTML = t, _.href = "#", _.title = n, _.setAttribute("role", "button"), _.setAttribute("aria-label", n), Hi(_), ht(_, "click", li), ht(_, "click", d, this), ht(_, "click", this._refocusOnMap, this), _;
          },
          _updateDisabled: function() {
            var t = this._map, n = "leaflet-disabled";
            It(this._zoomInButton, n), It(this._zoomOutButton, n), this._zoomInButton.setAttribute("aria-disabled", "false"), this._zoomOutButton.setAttribute("aria-disabled", "false"), (this._disabled || t._zoom === t.getMinZoom()) && (ft(this._zoomOutButton, n), this._zoomOutButton.setAttribute("aria-disabled", "true")), (this._disabled || t._zoom === t.getMaxZoom()) && (ft(this._zoomInButton, n), this._zoomInButton.setAttribute("aria-disabled", "true"));
          }
        });
        yt.mergeOptions({
          zoomControl: true
        }), yt.addInitHook(function() {
          this.options.zoomControl && (this.zoomControl = new Mi(), this.addControl(this.zoomControl));
        });
        var ha = function(t) {
          return new Mi(t);
        }, Ge = Ce.extend({
          options: {
            position: "bottomleft",
            maxWidth: 100,
            metric: true,
            imperial: true
          },
          onAdd: function(t) {
            var n = "leaflet-control-scale", a = xt("div", n), l = this.options;
            return this._addScales(l, n + "-line", a), t.on(l.updateWhenIdle ? "moveend" : "move", this._update, this), t.whenReady(this._update, this), a;
          },
          onRemove: function(t) {
            t.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this);
          },
          _addScales: function(t, n, a) {
            t.metric && (this._mScale = xt("div", n, a)), t.imperial && (this._iScale = xt("div", n, a));
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
            var n = t * 3.2808399, a, l, d;
            n > 5280 ? (a = n / 5280, l = this._getRoundNum(a), this._updateScale(this._iScale, l + " mi", l / a)) : (d = this._getRoundNum(n), this._updateScale(this._iScale, d + " ft", d / n));
          },
          _updateScale: function(t, n, a) {
            t.style.width = Math.round(this.options.maxWidth * a) + "px", t.innerHTML = n;
          },
          _getRoundNum: function(t) {
            var n = Math.pow(10, (Math.floor(t) + "").length - 1), a = t / n;
            return a = a >= 10 ? 10 : a >= 5 ? 5 : a >= 3 ? 3 : a >= 2 ? 2 : 1, n * a;
          }
        }), Yr = function(t) {
          return new Ge(t);
        }, ki = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>', Xn = Ce.extend({
          options: {
            position: "bottomright",
            prefix: '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' + (rt.inlineSvg ? ki + " " : "") + "Leaflet</a>"
          },
          initialize: function(t) {
            Bt(this, t), this._attributions = {};
          },
          onAdd: function(t) {
            t.attributionControl = this, this._container = xt("div", "leaflet-control-attribution"), Hi(this._container);
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
        yt.mergeOptions({
          attributionControl: true
        }), yt.addInitHook(function() {
          this.options.attributionControl && new Xn().addTo(this);
        });
        var ca = function(t) {
          return new Xn(t);
        };
        Ce.Layers = Jr, Ce.Zoom = Mi, Ce.Scale = Ge, Ce.Attribution = Xn, Ci.layers = Yn, Ci.zoom = ha, Ci.scale = Yr, Ci.attribution = ca;
        var Se = Le.extend({
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
        Se.addTo = function(t, n) {
          return t.addHandler(n, this), this;
        };
        var da = {
          Events: $t
        }, Xr = rt.touch ? "touchstart mousedown" : "mousedown", Je = si.extend({
          options: {
            clickTolerance: 3
          },
          initialize: function(t, n, a, l) {
            Bt(this, l), this._element = t, this._dragStartTarget = n || t, this._preventOutline = a;
          },
          enable: function() {
            this._enabled || (ht(this._dragStartTarget, Xr, this._onDown, this), this._enabled = true);
          },
          disable: function() {
            this._enabled && (Je._dragging === this && this.finishDrag(true), Mt(this._dragStartTarget, Xr, this._onDown, this), this._enabled = false, this._moved = false);
          },
          _onDown: function(t) {
            if (this._enabled && (this._moved = false, !zn(this._element, "leaflet-zoom-anim"))) {
              if (t.touches && t.touches.length !== 1) {
                Je._dragging === this && this.finishDrag();
                return;
              }
              if (!(Je._dragging || t.shiftKey || t.which !== 1 && t.button !== 1 && !t.touches) && (Je._dragging = this, this._preventOutline && Vn(this._element), jn(), Zi(), !this._moving)) {
                this.fire("down");
                var n = t.touches ? t.touches[0] : t, a = Vr(this._element);
                this._startPoint = new at(n.clientX, n.clientY), this._startPos = We(this._element), this._parentScale = Hn(a);
                var l = t.type === "mousedown";
                ht(document, l ? "mousemove" : "touchmove", this._onMove, this), ht(document, l ? "mouseup" : "touchend touchcancel", this._onUp, this);
              }
            }
          },
          _onMove: function(t) {
            if (this._enabled) {
              if (t.touches && t.touches.length > 1) {
                this._moved = true;
                return;
              }
              var n = t.touches && t.touches.length === 1 ? t.touches[0] : t, a = new at(n.clientX, n.clientY)._subtract(this._startPoint);
              !a.x && !a.y || Math.abs(a.x) + Math.abs(a.y) < this.options.clickTolerance || (a.x /= this._parentScale.x, a.y /= this._parentScale.y, Ht(t), this._moved || (this.fire("dragstart"), this._moved = true, ft(document.body, "leaflet-dragging"), this._lastTarget = t.target || t.srcElement, window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement), ft(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(a), this._moving = true, this._lastEvent = t, this._updatePosition());
            }
          },
          _updatePosition: function() {
            var t = {
              originalEvent: this._lastEvent
            };
            this.fire("predrag", t), Nt(this._element, this._newPos), this.fire("drag", t);
          },
          _onUp: function() {
            this._enabled && this.finishDrag();
          },
          finishDrag: function(t) {
            It(document.body, "leaflet-dragging"), this._lastTarget && (It(this._lastTarget, "leaflet-drag-target"), this._lastTarget = null), Mt(document, "mousemove touchmove", this._onMove, this), Mt(document, "mouseup touchend touchcancel", this._onUp, this), Zn(), Ui();
            var n = this._moved && this._moving;
            this._moving = false, Je._dragging = false, n && this.fire("dragend", {
              noInertia: t,
              distance: this._newPos.distanceTo(this._startPos)
            });
          }
        });
        function $r(t, n, a) {
          var l, d = [
            1,
            4,
            2,
            8
          ], _, w, I, G, q, tt, ot, mt;
          for (_ = 0, tt = t.length; _ < tt; _++) t[_]._code = Ye(t[_], n);
          for (I = 0; I < 4; I++) {
            for (ot = d[I], l = [], _ = 0, tt = t.length, w = tt - 1; _ < tt; w = _++) G = t[_], q = t[w], G._code & ot ? q._code & ot || (mt = dn(q, G, ot, n, a), mt._code = Ye(mt, n), l.push(mt)) : (q._code & ot && (mt = dn(q, G, ot, n, a), mt._code = Ye(mt, n), l.push(mt)), l.push(G));
            t = l;
          }
          return t;
        }
        function Qr(t, n) {
          var a, l, d, _, w, I, G, q, tt;
          if (!t || t.length === 0) throw new Error("latlngs not passed");
          fe(t) || (console.warn("latlngs are not flat! Only the first ring will be used"), t = t[0]);
          var ot = _t([
            0,
            0
          ]), mt = Et(t), ee = mt.getNorthWest().distanceTo(mt.getSouthWest()) * mt.getNorthEast().distanceTo(mt.getNorthWest());
          ee < 1700 && (ot = $n(t));
          var Vt = t.length, ge = [];
          for (a = 0; a < Vt; a++) {
            var se = _t(t[a]);
            ge.push(n.project(_t([
              se.lat - ot.lat,
              se.lng - ot.lng
            ])));
          }
          for (I = G = q = 0, a = 0, l = Vt - 1; a < Vt; l = a++) d = ge[a], _ = ge[l], w = d.y * _.x - _.y * d.x, G += (d.x + _.x) * w, q += (d.y + _.y) * w, I += w * 3;
          I === 0 ? tt = ge[0] : tt = [
            G / I,
            q / I
          ];
          var Qe = n.unproject(st(tt));
          return _t([
            Qe.lat + ot.lat,
            Qe.lng + ot.lng
          ]);
        }
        function $n(t) {
          for (var n = 0, a = 0, l = 0, d = 0; d < t.length; d++) {
            var _ = _t(t[d]);
            n += _.lat, a += _.lng, l++;
          }
          return _t([
            n / l,
            a / l
          ]);
        }
        var ts = {
          __proto__: null,
          clipPolygon: $r,
          polygonCenter: Qr,
          centroid: $n
        };
        function es(t, n) {
          if (!n || !t.length) return t.slice();
          var a = n * n;
          return t = wi(t, a), t = pa(t, a), t;
        }
        function Ut(t, n, a) {
          return Math.sqrt(Bi(t, n, a, true));
        }
        function le(t, n, a) {
          return Bi(t, n, a);
        }
        function pa(t, n) {
          var a = t.length, l = typeof Uint8Array < "u" ? Uint8Array : Array, d = new l(a);
          d[0] = d[a - 1] = 1, De(t, d, n, 0, a - 1);
          var _, w = [];
          for (_ = 0; _ < a; _++) d[_] && w.push(t[_]);
          return w;
        }
        function De(t, n, a, l, d) {
          var _ = 0, w, I, G;
          for (I = l + 1; I <= d - 1; I++) G = Bi(t[I], t[l], t[d], true), G > _ && (w = I, _ = G);
          _ > a && (n[w] = 1, De(t, n, a, l, w), De(t, n, a, w, d));
        }
        function wi(t, n) {
          for (var a = [
            t[0]
          ], l = 1, d = 0, _ = t.length; l < _; l++) Ei(t[l], t[d]) > n && (a.push(t[l]), d = l);
          return d < _ - 1 && a.push(t[_ - 1]), a;
        }
        var qi;
        function pe(t, n, a, l, d) {
          var _ = l ? qi : Ye(t, a), w = Ye(n, a), I, G, q;
          for (qi = w; ; ) {
            if (!(_ | w)) return [
              t,
              n
            ];
            if (_ & w) return false;
            I = _ || w, G = dn(t, n, I, a, d), q = Ye(G, a), I === _ ? (t = G, _ = q) : (n = G, w = q);
          }
        }
        function dn(t, n, a, l, d) {
          var _ = n.x - t.x, w = n.y - t.y, I = l.min, G = l.max, q, tt;
          return a & 8 ? (q = t.x + _ * (G.y - t.y) / w, tt = G.y) : a & 4 ? (q = t.x + _ * (I.y - t.y) / w, tt = I.y) : a & 2 ? (q = G.x, tt = t.y + w * (G.x - t.x) / _) : a & 1 && (q = I.x, tt = t.y + w * (I.x - t.x) / _), new at(q, tt, d);
        }
        function Ye(t, n) {
          var a = 0;
          return t.x < n.min.x ? a |= 1 : t.x > n.max.x && (a |= 2), t.y < n.min.y ? a |= 4 : t.y > n.max.y && (a |= 8), a;
        }
        function Ei(t, n) {
          var a = n.x - t.x, l = n.y - t.y;
          return a * a + l * l;
        }
        function Bi(t, n, a, l) {
          var d = n.x, _ = n.y, w = a.x - d, I = a.y - _, G = w * w + I * I, q;
          return G > 0 && (q = ((t.x - d) * w + (t.y - _) * I) / G, q > 1 ? (d = a.x, _ = a.y) : q > 0 && (d += w * q, _ += I * q)), w = t.x - d, I = t.y - _, l ? w * w + I * I : new at(d, _);
        }
        function fe(t) {
          return !Xt(t[0]) || typeof t[0][0] != "object" && typeof t[0][0] < "u";
        }
        function is(t) {
          return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."), fe(t);
        }
        function ns(t, n) {
          var a, l, d, _, w, I, G, q;
          if (!t || t.length === 0) throw new Error("latlngs not passed");
          fe(t) || (console.warn("latlngs are not flat! Only the first ring will be used"), t = t[0]);
          var tt = _t([
            0,
            0
          ]), ot = Et(t), mt = ot.getNorthWest().distanceTo(ot.getSouthWest()) * ot.getNorthEast().distanceTo(ot.getNorthWest());
          mt < 1700 && (tt = $n(t));
          var ee = t.length, Vt = [];
          for (a = 0; a < ee; a++) {
            var ge = _t(t[a]);
            Vt.push(n.project(_t([
              ge.lat - tt.lat,
              ge.lng - tt.lng
            ])));
          }
          for (a = 0, l = 0; a < ee - 1; a++) l += Vt[a].distanceTo(Vt[a + 1]) / 2;
          if (l === 0) q = Vt[0];
          else for (a = 0, _ = 0; a < ee - 1; a++) if (w = Vt[a], I = Vt[a + 1], d = w.distanceTo(I), _ += d, _ > l) {
            G = (_ - l) / d, q = [
              I.x - G * (I.x - w.x),
              I.y - G * (I.y - w.y)
            ];
            break;
          }
          var se = n.unproject(st(q));
          return _t([
            se.lat + tt.lat,
            se.lng + tt.lng
          ]);
        }
        var pn = {
          __proto__: null,
          simplify: es,
          pointToSegmentDistance: Ut,
          closestPointOnSegment: le,
          clipSegment: pe,
          _getEdgeIntersection: dn,
          _getBitCode: Ye,
          _sqClosestPointOnSegment: Bi,
          isFlat: fe,
          _flat: is,
          polylineCenter: ns
        }, fn = {
          project: function(t) {
            return new at(t.lng, t.lat);
          },
          unproject: function(t) {
            return new bt(t.y, t.x);
          },
          bounds: new gt([
            -180,
            -90
          ], [
            180,
            90
          ])
        }, Qn = {
          R: 6378137,
          R_MINOR: 6356752314245179e-9,
          bounds: new gt([
            -2003750834279e-5,
            -1549657073972e-5
          ], [
            2003750834279e-5,
            1876465623138e-5
          ]),
          project: function(t) {
            var n = Math.PI / 180, a = this.R, l = t.lat * n, d = this.R_MINOR / a, _ = Math.sqrt(1 - d * d), w = _ * Math.sin(l), I = Math.tan(Math.PI / 4 - l / 2) / Math.pow((1 - w) / (1 + w), _ / 2);
            return l = -a * Math.log(Math.max(I, 1e-10)), new at(t.lng * n * a, l);
          },
          unproject: function(t) {
            for (var n = 180 / Math.PI, a = this.R, l = this.R_MINOR / a, d = Math.sqrt(1 - l * l), _ = Math.exp(-t.y / a), w = Math.PI / 2 - 2 * Math.atan(_), I = 0, G = 0.1, q; I < 15 && Math.abs(G) > 1e-7; I++) q = d * Math.sin(w), q = Math.pow((1 - q) / (1 + q), d / 2), G = Math.PI / 2 - 2 * Math.atan(_ * q) - w, w += G;
            return new bt(w * n, t.x * n / a);
          }
        }, rs = {
          __proto__: null,
          LonLat: fn,
          Mercator: Qn,
          SphericalMercator: wn
        }, fa = j({}, Be, {
          code: "EPSG:3395",
          projection: Qn,
          transformation: (function() {
            var t = 0.5 / (Math.PI * Qn.R);
            return Ni(t, 0.5, -t, 0.5);
          })()
        }), tr = j({}, Be, {
          code: "EPSG:4326",
          projection: fn,
          transformation: Ni(1 / 180, 1, -1 / 180, 0.5)
        }), _a = j({}, be, {
          projection: fn,
          transformation: Ni(1, 0, -1, 0),
          scale: function(t) {
            return Math.pow(2, t);
          },
          zoom: function(t) {
            return Math.log(t) / Math.LN2;
          },
          distance: function(t, n) {
            var a = n.lng - t.lng, l = n.lat - t.lat;
            return Math.sqrt(a * a + l * l);
          },
          infinite: true
        });
        be.Earth = Be, be.EPSG3395 = fa, be.EPSG3857 = Bn, be.EPSG900913 = vr, be.EPSG4326 = tr, be.Simple = _a;
        var re = si.extend({
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
        yt.include({
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
            t = t ? Xt(t) ? t : [
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
            for (var l in this._zoomBoundLayers) {
              var d = this._zoomBoundLayers[l].options;
              t = d.minZoom === void 0 ? t : Math.min(t, d.minZoom), n = d.maxZoom === void 0 ? n : Math.max(n, d.maxZoom);
            }
            this._layersMaxZoom = n === -1 / 0 ? void 0 : n, this._layersMinZoom = t === 1 / 0 ? void 0 : t, a !== this._getZoomSpan() && this.fire("zoomlevelschange"), this.options.maxZoom === void 0 && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom && this.setZoom(this._layersMaxZoom), this.options.minZoom === void 0 && this._layersMinZoom && this.getZoom() < this._layersMinZoom && this.setZoom(this._layersMinZoom);
          }
        });
        var je = re.extend({
          initialize: function(t, n) {
            Bt(this, n), this._layers = {};
            var a, l;
            if (t) for (a = 0, l = t.length; a < l; a++) this.addLayer(t[a]);
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
            var n = Array.prototype.slice.call(arguments, 1), a, l;
            for (a in this._layers) l = this._layers[a], l[t] && l[t].apply(l, n);
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
        }), _n = function(t, n) {
          return new je(t, n);
        }, Ae = je.extend({
          addLayer: function(t) {
            return this.hasLayer(t) ? this : (t.addEventParent(this), je.prototype.addLayer.call(this, t), this.fire("layeradd", {
              layer: t
            }));
          },
          removeLayer: function(t) {
            return this.hasLayer(t) ? (t in this._layers && (t = this._layers[t]), t.removeEventParent(this), je.prototype.removeLayer.call(this, t), this.fire("layerremove", {
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
            var t = new Dt();
            for (var n in this._layers) {
              var a = this._layers[n];
              t.extend(a.getBounds ? a.getBounds() : a.getLatLng());
            }
            return t;
          }
        }), ma = function(t, n) {
          return new Ae(t, n);
        }, Pi = Le.extend({
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
            Bt(this, t);
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
            var l = this._createImg(a, n && n.tagName === "IMG" ? n : null);
            return this._setIconStyles(l, t), (this.options.crossOrigin || this.options.crossOrigin === "") && (l.crossOrigin = this.options.crossOrigin === true ? "" : this.options.crossOrigin), l;
          },
          _setIconStyles: function(t, n) {
            var a = this.options, l = a[n + "Size"];
            typeof l == "number" && (l = [
              l,
              l
            ]);
            var d = st(l), _ = st(n === "shadow" && a.shadowAnchor || a.iconAnchor || d && d.divideBy(2, true));
            t.className = "leaflet-marker-" + n + " " + (a.className || ""), _ && (t.style.marginLeft = -_.x + "px", t.style.marginTop = -_.y + "px"), d && (t.style.width = d.x + "px", t.style.height = d.y + "px");
          },
          _createImg: function(t, n) {
            return n = n || document.createElement("img"), n.src = t, n;
          },
          _getIconUrl: function(t) {
            return rt.retina && this.options[t + "RetinaUrl"] || this.options[t + "Url"];
          }
        });
        function ga(t) {
          return new Pi(t);
        }
        var Wi = Pi.extend({
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
            return typeof Wi.imagePath != "string" && (Wi.imagePath = this._detectIconPath()), (this.options.imagePath || Wi.imagePath) + Pi.prototype._getIconUrl.call(this, t);
          },
          _stripUrl: function(t) {
            var n = function(a, l, d) {
              var _ = l.exec(a);
              return _ && _[d];
            };
            return t = n(t, /^url\((['"])?(.+)\1\)$/, 2), t && n(t, /^(.*)marker-icon\.png$/, 1);
          },
          _detectIconPath: function() {
            var t = xt("div", "leaflet-default-icon-path", document.body), n = qe(t, "background-image") || qe(t, "backgroundImage");
            if (document.body.removeChild(t), n = this._stripUrl(n), n) return n;
            var a = document.querySelector('link[href$="leaflet.css"]');
            return a ? a.href.substring(0, a.href.length - 11 - 1) : "";
          }
        }), ss = Se.extend({
          initialize: function(t) {
            this._marker = t;
          },
          addHooks: function() {
            var t = this._marker._icon;
            this._draggable || (this._draggable = new Je(t, t, true)), this._draggable.on({
              dragstart: this._onDragStart,
              predrag: this._onPreDrag,
              drag: this._onDrag,
              dragend: this._onDragEnd
            }, this).enable(), ft(t, "leaflet-marker-draggable");
          },
          removeHooks: function() {
            this._draggable.off({
              dragstart: this._onDragStart,
              predrag: this._onPreDrag,
              drag: this._onDrag,
              dragend: this._onDragEnd
            }, this).disable(), this._marker._icon && It(this._marker._icon, "leaflet-marker-draggable");
          },
          moved: function() {
            return this._draggable && this._draggable._moved;
          },
          _adjustPan: function(t) {
            var n = this._marker, a = n._map, l = this._marker.options.autoPanSpeed, d = this._marker.options.autoPanPadding, _ = We(n._icon), w = a.getPixelBounds(), I = a.getPixelOrigin(), G = Ft(w.min._subtract(I).add(d), w.max._subtract(I).subtract(d));
            if (!G.contains(_)) {
              var q = st((Math.max(G.max.x, _.x) - G.max.x) / (w.max.x - G.max.x) - (Math.min(G.min.x, _.x) - G.min.x) / (w.min.x - G.min.x), (Math.max(G.max.y, _.y) - G.max.y) / (w.max.y - G.max.y) - (Math.min(G.min.y, _.y) - G.min.y) / (w.min.y - G.min.y)).multiplyBy(l);
              a.panBy(q, {
                animate: false
              }), this._draggable._newPos._add(q), this._draggable._startPos._add(q), Nt(n._icon, this._draggable._newPos), this._onDrag(t), this._panRequest = At(this._adjustPan.bind(this, t));
            }
          },
          _onDragStart: function() {
            this._oldLatLng = this._marker.getLatLng(), this._marker.closePopup && this._marker.closePopup(), this._marker.fire("movestart").fire("dragstart");
          },
          _onPreDrag: function(t) {
            this._marker.options.autoPan && (qt(this._panRequest), this._panRequest = At(this._adjustPan.bind(this, t)));
          },
          _onDrag: function(t) {
            var n = this._marker, a = n._shadow, l = We(n._icon), d = n._map.layerPointToLatLng(l);
            a && Nt(a, l), n._latlng = d, t.latlng = d, t.oldLatLng = this._oldLatLng, n.fire("move", t).fire("drag", t);
          },
          _onDragEnd: function(t) {
            qt(this._panRequest), delete this._oldLatLng, this._marker.fire("moveend").fire("dragend", t);
          }
        }), mn = re.extend({
          options: {
            icon: new Wi(),
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
            Bt(this, n), this._latlng = _t(t);
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
            return this._latlng = _t(t), this.update(), this.fire("move", {
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
            var t = this.options, n = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide"), a = t.icon.createIcon(this._icon), l = false;
            a !== this._icon && (this._icon && this._removeIcon(), l = true, t.title && (a.title = t.title), a.tagName === "IMG" && (a.alt = t.alt || "")), ft(a, n), t.keyboard && (a.tabIndex = "0", a.setAttribute("role", "button")), this._icon = a, t.riseOnHover && this.on({
              mouseover: this._bringToFront,
              mouseout: this._resetZIndex
            }), this.options.autoPanOnFocus && ht(a, "focus", this._panOnFocus, this);
            var d = t.icon.createShadow(this._shadow), _ = false;
            d !== this._shadow && (this._removeShadow(), _ = true), d && (ft(d, n), d.alt = ""), this._shadow = d, t.opacity < 1 && this._updateOpacity(), l && this.getPane().appendChild(this._icon), this._initInteraction(), d && _ && this.getPane(t.shadowPane).appendChild(this._shadow);
          },
          _removeIcon: function() {
            this.options.riseOnHover && this.off({
              mouseover: this._bringToFront,
              mouseout: this._resetZIndex
            }), this.options.autoPanOnFocus && Mt(this._icon, "focus", this._panOnFocus, this), Tt(this._icon), this.removeInteractiveTarget(this._icon), this._icon = null;
          },
          _removeShadow: function() {
            this._shadow && Tt(this._shadow), this._shadow = null;
          },
          _setPos: function(t) {
            this._icon && Nt(this._icon, t), this._shadow && Nt(this._shadow, t), this._zIndex = t.y + this.options.zIndexOffset, this._resetZIndex();
          },
          _updateZIndex: function(t) {
            this._icon && (this._icon.style.zIndex = this._zIndex + t);
          },
          _animateZoom: function(t) {
            var n = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center).round();
            this._setPos(n);
          },
          _initInteraction: function() {
            if (this.options.interactive && (ft(this._icon, "leaflet-interactive"), this.addInteractiveTarget(this._icon), ss)) {
              var t = this.options.draggable;
              this.dragging && (t = this.dragging.enabled(), this.dragging.disable()), this.dragging = new ss(this), t && this.dragging.enable();
            }
          },
          setOpacity: function(t) {
            return this.options.opacity = t, this._map && this._updateOpacity(), this;
          },
          _updateOpacity: function() {
            var t = this.options.opacity;
            this._icon && de(this._icon, t), this._shadow && de(this._shadow, t);
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
              var n = this.options.icon.options, a = n.iconSize ? st(n.iconSize) : st(0, 0), l = n.iconAnchor ? st(n.iconAnchor) : st(0, 0);
              t.panInside(this._latlng, {
                paddingTopLeft: l,
                paddingBottomRight: a.subtract(l)
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
        function as(t, n) {
          return new mn(t, n);
        }
        var _e = re.extend({
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
            return Bt(this, t), this._renderer && (this._renderer._updateStyle(this), this.options.stroke && t && Object.prototype.hasOwnProperty.call(t, "weight") && this._updateBounds()), this;
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
        }), gn = _e.extend({
          options: {
            fill: true,
            radius: 10
          },
          initialize: function(t, n) {
            Bt(this, n), this._latlng = _t(t), this._radius = this.options.radius;
          },
          setLatLng: function(t) {
            var n = this._latlng;
            return this._latlng = _t(t), this.redraw(), this.fire("move", {
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
            return _e.prototype.setStyle.call(this, t), this.setRadius(n), this;
          },
          _project: function() {
            this._point = this._map.latLngToLayerPoint(this._latlng), this._updateBounds();
          },
          _updateBounds: function() {
            var t = this._radius, n = this._radiusY || t, a = this._clickTolerance(), l = [
              t + a,
              n + a
            ];
            this._pxBounds = new gt(this._point.subtract(l), this._point.add(l));
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
        function er(t, n) {
          return new gn(t, n);
        }
        var Si = gn.extend({
          initialize: function(t, n, a) {
            if (typeof n == "number" && (n = j({}, a, {
              radius: n
            })), Bt(this, n), this._latlng = _t(t), isNaN(this.options.radius)) throw new Error("Circle radius cannot be NaN");
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
            return new Dt(this._map.layerPointToLatLng(this._point.subtract(t)), this._map.layerPointToLatLng(this._point.add(t)));
          },
          setStyle: _e.prototype.setStyle,
          _project: function() {
            var t = this._latlng.lng, n = this._latlng.lat, a = this._map, l = a.options.crs;
            if (l.distance === Be.distance) {
              var d = Math.PI / 180, _ = this._mRadius / Be.R / d, w = a.project([
                n + _,
                t
              ]), I = a.project([
                n - _,
                t
              ]), G = w.add(I).divideBy(2), q = a.unproject(G).lat, tt = Math.acos((Math.cos(_ * d) - Math.sin(n * d) * Math.sin(q * d)) / (Math.cos(n * d) * Math.cos(q * d))) / d;
              (isNaN(tt) || tt === 0) && (tt = _ / Math.cos(Math.PI / 180 * n)), this._point = G.subtract(a.getPixelOrigin()), this._radius = isNaN(tt) ? 0 : G.x - a.project([
                q,
                t - tt
              ]).x, this._radiusY = G.y - w.y;
            } else {
              var ot = l.unproject(l.project(this._latlng).subtract([
                this._mRadius,
                0
              ]));
              this._point = a.latLngToLayerPoint(this._latlng), this._radius = this._point.x - a.latLngToLayerPoint(ot).x;
            }
            this._updateBounds();
          }
        });
        function ya(t, n, a) {
          return new Si(t, n, a);
        }
        var Ze = _e.extend({
          options: {
            smoothFactor: 1,
            noClip: false
          },
          initialize: function(t, n) {
            Bt(this, n), this._setLatLngs(t);
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
            for (var n = 1 / 0, a = null, l = Bi, d, _, w = 0, I = this._parts.length; w < I; w++) for (var G = this._parts[w], q = 1, tt = G.length; q < tt; q++) {
              d = G[q - 1], _ = G[q];
              var ot = l(t, d, _, true);
              ot < n && (n = ot, a = l(t, d, _));
            }
            return a && (a.distance = Math.sqrt(n)), a;
          },
          getCenter: function() {
            if (!this._map) throw new Error("Must add layer to map before using getCenter()");
            return ns(this._defaultShape(), this._map.options.crs);
          },
          getBounds: function() {
            return this._bounds;
          },
          addLatLng: function(t, n) {
            return n = n || this._defaultShape(), t = _t(t), n.push(t), this._bounds.extend(t), this.redraw();
          },
          _setLatLngs: function(t) {
            this._bounds = new Dt(), this._latlngs = this._convertLatLngs(t);
          },
          _defaultShape: function() {
            return fe(this._latlngs) ? this._latlngs : this._latlngs[0];
          },
          _convertLatLngs: function(t) {
            for (var n = [], a = fe(t), l = 0, d = t.length; l < d; l++) a ? (n[l] = _t(t[l]), this._bounds.extend(n[l])) : n[l] = this._convertLatLngs(t[l]);
            return n;
          },
          _project: function() {
            var t = new gt();
            this._rings = [], this._projectLatlngs(this._latlngs, this._rings, t), this._bounds.isValid() && t.isValid() && (this._rawPxBounds = t, this._updateBounds());
          },
          _updateBounds: function() {
            var t = this._clickTolerance(), n = new at(t, t);
            this._rawPxBounds && (this._pxBounds = new gt([
              this._rawPxBounds.min.subtract(n),
              this._rawPxBounds.max.add(n)
            ]));
          },
          _projectLatlngs: function(t, n, a) {
            var l = t[0] instanceof bt, d = t.length, _, w;
            if (l) {
              for (w = [], _ = 0; _ < d; _++) w[_] = this._map.latLngToLayerPoint(t[_]), a.extend(w[_]);
              n.push(w);
            } else for (_ = 0; _ < d; _++) this._projectLatlngs(t[_], n, a);
          },
          _clipPoints: function() {
            var t = this._renderer._bounds;
            if (this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(t))) {
              if (this.options.noClip) {
                this._parts = this._rings;
                return;
              }
              var n = this._parts, a, l, d, _, w, I, G;
              for (a = 0, d = 0, _ = this._rings.length; a < _; a++) for (G = this._rings[a], l = 0, w = G.length; l < w - 1; l++) I = pe(G[l], G[l + 1], t, l, true), I && (n[d] = n[d] || [], n[d].push(I[0]), (I[1] !== G[l + 1] || l === w - 2) && (n[d].push(I[1]), d++));
            }
          },
          _simplifyPoints: function() {
            for (var t = this._parts, n = this.options.smoothFactor, a = 0, l = t.length; a < l; a++) t[a] = es(t[a], n);
          },
          _update: function() {
            this._map && (this._clipPoints(), this._simplifyPoints(), this._updatePath());
          },
          _updatePath: function() {
            this._renderer._updatePoly(this);
          },
          _containsPoint: function(t, n) {
            var a, l, d, _, w, I, G = this._clickTolerance();
            if (!this._pxBounds || !this._pxBounds.contains(t)) return false;
            for (a = 0, _ = this._parts.length; a < _; a++) for (I = this._parts[a], l = 0, w = I.length, d = w - 1; l < w; d = l++) if (!(!n && l === 0) && Ut(t, I[d], I[l]) <= G) return true;
            return false;
          }
        });
        function ir(t, n) {
          return new Ze(t, n);
        }
        Ze._flat = is;
        var Qt = Ze.extend({
          options: {
            fill: true
          },
          isEmpty: function() {
            return !this._latlngs.length || !this._latlngs[0].length;
          },
          getCenter: function() {
            if (!this._map) throw new Error("Must add layer to map before using getCenter()");
            return Qr(this._defaultShape(), this._map.options.crs);
          },
          _convertLatLngs: function(t) {
            var n = Ze.prototype._convertLatLngs.call(this, t), a = n.length;
            return a >= 2 && n[0] instanceof bt && n[0].equals(n[a - 1]) && n.pop(), n;
          },
          _setLatLngs: function(t) {
            Ze.prototype._setLatLngs.call(this, t), fe(this._latlngs) && (this._latlngs = [
              this._latlngs
            ]);
          },
          _defaultShape: function() {
            return fe(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
          },
          _clipPoints: function() {
            var t = this._renderer._bounds, n = this.options.weight, a = new at(n, n);
            if (t = new gt(t.min.subtract(a), t.max.add(a)), this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(t))) {
              if (this.options.noClip) {
                this._parts = this._rings;
                return;
              }
              for (var l = 0, d = this._rings.length, _; l < d; l++) _ = $r(this._rings[l], t, true), _.length && this._parts.push(_);
            }
          },
          _updatePath: function() {
            this._renderer._updatePoly(this, true);
          },
          _containsPoint: function(t) {
            var n = false, a, l, d, _, w, I, G, q;
            if (!this._pxBounds || !this._pxBounds.contains(t)) return false;
            for (_ = 0, G = this._parts.length; _ < G; _++) for (a = this._parts[_], w = 0, q = a.length, I = q - 1; w < q; I = w++) l = a[w], d = a[I], l.y > t.y != d.y > t.y && t.x < (d.x - l.x) * (t.y - l.y) / (d.y - l.y) + l.x && (n = !n);
            return n || Ze.prototype._containsPoint.call(this, t, true);
          }
        });
        function nr(t, n) {
          return new Qt(t, n);
        }
        var Ue = Ae.extend({
          initialize: function(t, n) {
            Bt(this, n), this._layers = {}, t && this.addData(t);
          },
          addData: function(t) {
            var n = Xt(t) ? t : t.features, a, l, d;
            if (n) {
              for (a = 0, l = n.length; a < l; a++) d = n[a], (d.geometries || d.geometry || d.features || d.coordinates) && this.addData(d);
              return this;
            }
            var _ = this.options;
            if (_.filter && !_.filter(t)) return this;
            var w = Ji(t, _);
            return w ? (w.feature = yn(t), w.defaultOptions = w.options, this.resetStyle(w), _.onEachFeature && _.onEachFeature(t, w), this.addLayer(w)) : this;
          },
          resetStyle: function(t) {
            return t === void 0 ? this.eachLayer(this.resetStyle, this) : (t.options = j({}, t.defaultOptions), this._setLayerStyle(t, this.options.style), this);
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
        function Ji(t, n) {
          var a = t.type === "Feature" ? t.geometry : t, l = a ? a.coordinates : null, d = [], _ = n && n.pointToLayer, w = n && n.coordsToLatLng || rr, I, G, q, tt;
          if (!l && !a) return null;
          switch (a.type) {
            case "Point":
              return I = w(l), os(_, t, I, n);
            case "MultiPoint":
              for (q = 0, tt = l.length; q < tt; q++) I = w(l[q]), d.push(os(_, t, I, n));
              return new Ae(d);
            case "LineString":
            case "MultiLineString":
              return G = he(l, a.type === "LineString" ? 0 : 1, w), new Ze(G, n);
            case "Polygon":
            case "MultiPolygon":
              return G = he(l, a.type === "Polygon" ? 1 : 2, w), new Qt(G, n);
            case "GeometryCollection":
              for (q = 0, tt = a.geometries.length; q < tt; q++) {
                var ot = Ji({
                  geometry: a.geometries[q],
                  type: "Feature",
                  properties: t.properties
                }, n);
                ot && d.push(ot);
              }
              return new Ae(d);
            case "FeatureCollection":
              for (q = 0, tt = a.features.length; q < tt; q++) {
                var mt = Ji(a.features[q], n);
                mt && d.push(mt);
              }
              return new Ae(d);
            default:
              throw new Error("Invalid GeoJSON object.");
          }
        }
        function os(t, n, a, l) {
          return t ? t(n, a) : new mn(a, l && l.markersInheritOptions && l);
        }
        function rr(t) {
          return new bt(t[1], t[0], t[2]);
        }
        function he(t, n, a) {
          for (var l = [], d = 0, _ = t.length, w; d < _; d++) w = n ? he(t[d], n - 1, a) : (a || rr)(t[d]), l.push(w);
          return l;
        }
        function Ve(t, n) {
          return t = _t(t), t.alt !== void 0 ? [
            Ot(t.lng, n),
            Ot(t.lat, n),
            Ot(t.alt, n)
          ] : [
            Ot(t.lng, n),
            Ot(t.lat, n)
          ];
        }
        function hi(t, n, a, l) {
          for (var d = [], _ = 0, w = t.length; _ < w; _++) d.push(n ? hi(t[_], fe(t[_]) ? 0 : n - 1, a, l) : Ve(t[_], l));
          return !n && a && d.length > 0 && d.push(d[0].slice()), d;
        }
        function ci(t, n) {
          return t.feature ? j({}, t.feature, {
            geometry: n
          }) : yn(n);
        }
        function yn(t) {
          return t.type === "Feature" || t.type === "FeatureCollection" ? t : {
            type: "Feature",
            properties: {},
            geometry: t
          };
        }
        var sr = {
          toGeoJSON: function(t) {
            return ci(this, {
              type: "Point",
              coordinates: Ve(this.getLatLng(), t)
            });
          }
        };
        mn.include(sr), Si.include(sr), gn.include(sr), Ze.include({
          toGeoJSON: function(t) {
            var n = !fe(this._latlngs), a = hi(this._latlngs, n ? 1 : 0, false, t);
            return ci(this, {
              type: (n ? "Multi" : "") + "LineString",
              coordinates: a
            });
          }
        }), Qt.include({
          toGeoJSON: function(t) {
            var n = !fe(this._latlngs), a = n && !fe(this._latlngs[0]), l = hi(this._latlngs, a ? 2 : n ? 1 : 0, true, t);
            return n || (l = [
              l
            ]), ci(this, {
              type: (a ? "Multi" : "") + "Polygon",
              coordinates: l
            });
          }
        }), je.include({
          toMultiPoint: function(t) {
            var n = [];
            return this.eachLayer(function(a) {
              n.push(a.toGeoJSON(t).geometry.coordinates);
            }), ci(this, {
              type: "MultiPoint",
              coordinates: n
            });
          },
          toGeoJSON: function(t) {
            var n = this.feature && this.feature.geometry && this.feature.geometry.type;
            if (n === "MultiPoint") return this.toMultiPoint(t);
            var a = n === "GeometryCollection", l = [];
            return this.eachLayer(function(d) {
              if (d.toGeoJSON) {
                var _ = d.toGeoJSON(t);
                if (a) l.push(_.geometry);
                else {
                  var w = yn(_);
                  w.type === "FeatureCollection" ? l.push.apply(l, w.features) : l.push(w);
                }
              }
            }), a ? ci(this, {
              geometries: l,
              type: "GeometryCollection"
            }) : {
              type: "FeatureCollection",
              features: l
            };
          }
        });
        function us(t, n) {
          return new Ue(t, n);
        }
        var va = us, Di = re.extend({
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
            this._url = t, this._bounds = Et(n), Bt(this, a);
          },
          onAdd: function() {
            this._image || (this._initImage(), this.options.opacity < 1 && this._updateOpacity()), this.options.interactive && (ft(this._image, "leaflet-interactive"), this.addInteractiveTarget(this._image)), this.getPane().appendChild(this._image), this._reset();
          },
          onRemove: function() {
            Tt(this._image), this.options.interactive && this.removeInteractiveTarget(this._image);
          },
          setOpacity: function(t) {
            return this.options.opacity = t, this._image && this._updateOpacity(), this;
          },
          setStyle: function(t) {
            return t.opacity && this.setOpacity(t.opacity), this;
          },
          bringToFront: function() {
            return this._map && bi(this._image), this;
          },
          bringToBack: function() {
            return this._map && xi(this._image), this;
          },
          setUrl: function(t) {
            return this._url = t, this._image && (this._image.src = t), this;
          },
          setBounds: function(t) {
            return this._bounds = Et(t), this._map && this._reset(), this;
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
            var t = this._url.tagName === "IMG", n = this._image = t ? this._url : xt("img");
            if (ft(n, "leaflet-image-layer"), this._zoomAnimated && ft(n, "leaflet-zoom-animated"), this.options.className && ft(n, this.options.className), n.onselectstart = pt, n.onmousemove = pt, n.onload = A(this.fire, this, "load"), n.onerror = A(this._overlayOnError, this, "error"), (this.options.crossOrigin || this.options.crossOrigin === "") && (n.crossOrigin = this.options.crossOrigin === true ? "" : this.options.crossOrigin), this.options.zIndex && this._updateZIndex(), t) {
              this._url = n.src;
              return;
            }
            n.src = this._url, n.alt = this.options.alt;
          },
          _animateZoom: function(t) {
            var n = this._map.getZoomScale(t.zoom), a = this._map._latLngBoundsToNewLayerBounds(this._bounds, t.zoom, t.center).min;
            oi(this._image, a, n);
          },
          _reset: function() {
            var t = this._image, n = new gt(this._map.latLngToLayerPoint(this._bounds.getNorthWest()), this._map.latLngToLayerPoint(this._bounds.getSouthEast())), a = n.getSize();
            Nt(t, n.min), t.style.width = a.x + "px", t.style.height = a.y + "px";
          },
          _updateOpacity: function() {
            de(this._image, this.options.opacity);
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
        }), La = function(t, n, a) {
          return new Di(t, n, a);
        }, ls = Di.extend({
          options: {
            autoplay: true,
            loop: true,
            keepAspectRatio: true,
            muted: false,
            playsInline: true
          },
          _initImage: function() {
            var t = this._url.tagName === "VIDEO", n = this._image = t ? this._url : xt("video");
            if (ft(n, "leaflet-image-layer"), this._zoomAnimated && ft(n, "leaflet-zoom-animated"), this.options.className && ft(n, this.options.className), n.onselectstart = pt, n.onmousemove = pt, n.onloadeddata = A(this.fire, this, "load"), t) {
              for (var a = n.getElementsByTagName("source"), l = [], d = 0; d < a.length; d++) l.push(a[d].src);
              this._url = a.length > 0 ? l : [
                n.src
              ];
              return;
            }
            Xt(this._url) || (this._url = [
              this._url
            ]), !this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(n.style, "objectFit") && (n.style.objectFit = "fill"), n.autoplay = !!this.options.autoplay, n.loop = !!this.options.loop, n.muted = !!this.options.muted, n.playsInline = !!this.options.playsInline;
            for (var _ = 0; _ < this._url.length; _++) {
              var w = xt("source");
              w.src = this._url[_], n.appendChild(w);
            }
          }
        });
        function ba(t, n, a) {
          return new ls(t, n, a);
        }
        var ar = Di.extend({
          _initImage: function() {
            var t = this._image = this._url;
            ft(t, "leaflet-image-layer"), this._zoomAnimated && ft(t, "leaflet-zoom-animated"), this.options.className && ft(t, this.options.className), t.onselectstart = pt, t.onmousemove = pt;
          }
        });
        function xa(t, n, a) {
          return new ar(t, n, a);
        }
        var Te = re.extend({
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
            t && (t instanceof bt || Xt(t)) ? (this._latlng = _t(t), Bt(this, n)) : (Bt(this, t), this._source = n), this.options.content && (this._content = this.options.content);
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
            this._zoomAnimated = t._zoomAnimated, this._container || this._initLayout(), t._fadeAnimated && de(this._container, 0), clearTimeout(this._removeTimeout), this.getPane().appendChild(this._container), this.update(), t._fadeAnimated && de(this._container, 1), this.bringToFront(), this.options.interactive && (ft(this._container, "leaflet-interactive"), this.addInteractiveTarget(this._container));
          },
          onRemove: function(t) {
            t._fadeAnimated ? (de(this._container, 0), this._removeTimeout = setTimeout(A(Tt, void 0, this._container), 200)) : Tt(this._container), this.options.interactive && (It(this._container, "leaflet-interactive"), this.removeInteractiveTarget(this._container));
          },
          getLatLng: function() {
            return this._latlng;
          },
          setLatLng: function(t) {
            return this._latlng = _t(t), this._map && (this._updatePosition(), this._adjustPan()), this;
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
            return this._map && bi(this._container), this;
          },
          bringToBack: function() {
            return this._map && xi(this._container), this;
          },
          _prepareOpen: function(t) {
            var n = this._source;
            if (!n._map) return false;
            if (n instanceof Ae) {
              n = null;
              var a = this._source._layers;
              for (var l in a) if (a[l]._map) {
                n = a[l];
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
              var t = this._map.latLngToLayerPoint(this._latlng), n = st(this.options.offset), a = this._getAnchor();
              this._zoomAnimated ? Nt(this._container, t.add(a)) : n = n.add(t).add(a);
              var l = this._containerBottom = -n.y, d = this._containerLeft = -Math.round(this._containerWidth / 2) + n.x;
              this._container.style.bottom = l + "px", this._container.style.left = d + "px";
            }
          },
          _getAnchor: function() {
            return [
              0,
              0
            ];
          }
        });
        yt.include({
          _initOverlay: function(t, n, a, l) {
            var d = n;
            return d instanceof t || (d = new t(l).setContent(n)), a && d.setLatLng(a), d;
          }
        }), re.include({
          _initOverlay: function(t, n, a, l) {
            var d = a;
            return d instanceof t ? (Bt(d, l), d._source = this) : (d = n && !l ? n : new t(l, this), d.setContent(a)), d;
          }
        });
        var Yi = Te.extend({
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
            return t = arguments.length ? t : this._source._map, !t.hasLayer(this) && t._popup && t._popup.options.autoClose && t.removeLayer(t._popup), t._popup = this, Te.prototype.openOn.call(this, t);
          },
          onAdd: function(t) {
            Te.prototype.onAdd.call(this, t), t.fire("popupopen", {
              popup: this
            }), this._source && (this._source.fire("popupopen", {
              popup: this
            }, true), this._source instanceof _e || this._source.on("preclick", ui));
          },
          onRemove: function(t) {
            Te.prototype.onRemove.call(this, t), t.fire("popupclose", {
              popup: this
            }), this._source && (this._source.fire("popupclose", {
              popup: this
            }, true), this._source instanceof _e || this._source.off("preclick", ui));
          },
          getEvents: function() {
            var t = Te.prototype.getEvents.call(this);
            return (this.options.closeOnClick !== void 0 ? this.options.closeOnClick : this._map.options.closePopupOnClick) && (t.preclick = this.close), this.options.keepInView && (t.moveend = this._adjustPan), t;
          },
          _initLayout: function() {
            var t = "leaflet-popup", n = this._container = xt("div", t + " " + (this.options.className || "") + " leaflet-zoom-animated"), a = this._wrapper = xt("div", t + "-content-wrapper", n);
            if (this._contentNode = xt("div", t + "-content", a), Hi(n), Jn(this._contentNode), ht(n, "contextmenu", ui), this._tipContainer = xt("div", t + "-tip-container", n), this._tip = xt("div", t + "-tip", this._tipContainer), this.options.closeButton) {
              var l = this._closeButton = xt("a", t + "-close-button", n);
              l.setAttribute("role", "button"), l.setAttribute("aria-label", "Close popup"), l.href = "#close", l.innerHTML = '<span aria-hidden="true">&#215;</span>', ht(l, "click", function(d) {
                Ht(d), this.close();
              }, this);
            }
          },
          _updateLayout: function() {
            var t = this._contentNode, n = t.style;
            n.width = "", n.whiteSpace = "nowrap";
            var a = t.offsetWidth;
            a = Math.min(a, this.options.maxWidth), a = Math.max(a, this.options.minWidth), n.width = a + 1 + "px", n.whiteSpace = "", n.height = "";
            var l = t.offsetHeight, d = this.options.maxHeight, _ = "leaflet-popup-scrolled";
            d && l > d ? (n.height = d + "px", ft(t, _)) : It(t, _), this._containerWidth = this._container.offsetWidth;
          },
          _animateZoom: function(t) {
            var n = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center), a = this._getAnchor();
            Nt(this._container, n.add(a));
          },
          _adjustPan: function() {
            if (this.options.autoPan) {
              if (this._map._panAnim && this._map._panAnim.stop(), this._autopanning) {
                this._autopanning = false;
                return;
              }
              var t = this._map, n = parseInt(qe(this._container, "marginBottom"), 10) || 0, a = this._container.offsetHeight + n, l = this._containerWidth, d = new at(this._containerLeft, -a - this._containerBottom);
              d._add(We(this._container));
              var _ = t.layerPointToContainerPoint(d), w = st(this.options.autoPanPadding), I = st(this.options.autoPanPaddingTopLeft || w), G = st(this.options.autoPanPaddingBottomRight || w), q = t.getSize(), tt = 0, ot = 0;
              _.x + l + G.x > q.x && (tt = _.x + l - q.x + G.x), _.x - tt - I.x < 0 && (tt = _.x - I.x), _.y + a + G.y > q.y && (ot = _.y + a - q.y + G.y), _.y - ot - I.y < 0 && (ot = _.y - I.y), (tt || ot) && (this.options.keepInView && (this._autopanning = true), t.fire("autopanstart").panBy([
                tt,
                ot
              ]));
            }
          },
          _getAnchor: function() {
            return st(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [
              0,
              0
            ]);
          }
        }), Ca = function(t, n) {
          return new Yi(t, n);
        };
        yt.mergeOptions({
          closePopupOnClick: true
        }), yt.include({
          openPopup: function(t, n, a) {
            return this._initOverlay(Yi, t, n, a).openOn(this), this;
          },
          closePopup: function(t) {
            return t = arguments.length ? t : this._popup, t && t.close(), this;
          }
        }), re.include({
          bindPopup: function(t, n) {
            return this._popup = this._initOverlay(Yi, this._popup, t, n), this._popupHandlersAdded || (this.on({
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
            return this._popup && (this instanceof Ae || (this._popup._source = this), this._popup._prepareOpen(t || this._latlng) && this._popup.openOn(this._map)), this;
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
              li(t);
              var n = t.layer || t.target;
              if (this._popup._source === n && !(n instanceof _e)) {
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
        var vn = Te.extend({
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
            Te.prototype.onAdd.call(this, t), this.setOpacity(this.options.opacity), t.fire("tooltipopen", {
              tooltip: this
            }), this._source && (this.addEventParent(this._source), this._source.fire("tooltipopen", {
              tooltip: this
            }, true));
          },
          onRemove: function(t) {
            Te.prototype.onRemove.call(this, t), t.fire("tooltipclose", {
              tooltip: this
            }), this._source && (this.removeEventParent(this._source), this._source.fire("tooltipclose", {
              tooltip: this
            }, true));
          },
          getEvents: function() {
            var t = Te.prototype.getEvents.call(this);
            return this.options.permanent || (t.preclick = this.close), t;
          },
          _initLayout: function() {
            var t = "leaflet-tooltip", n = t + " " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
            this._contentNode = this._container = xt("div", n), this._container.setAttribute("role", "tooltip"), this._container.setAttribute("id", "leaflet-tooltip-" + et(this));
          },
          _updateLayout: function() {
          },
          _adjustPan: function() {
          },
          _setPosition: function(t) {
            var n, a, l = this._map, d = this._container, _ = l.latLngToContainerPoint(l.getCenter()), w = l.layerPointToContainerPoint(t), I = this.options.direction, G = d.offsetWidth, q = d.offsetHeight, tt = st(this.options.offset), ot = this._getAnchor();
            I === "top" ? (n = G / 2, a = q) : I === "bottom" ? (n = G / 2, a = 0) : I === "center" ? (n = G / 2, a = q / 2) : I === "right" ? (n = 0, a = q / 2) : I === "left" ? (n = G, a = q / 2) : w.x < _.x ? (I = "right", n = 0, a = q / 2) : (I = "left", n = G + (tt.x + ot.x) * 2, a = q / 2), t = t.subtract(st(n, a, true)).add(tt).add(ot), It(d, "leaflet-tooltip-right"), It(d, "leaflet-tooltip-left"), It(d, "leaflet-tooltip-top"), It(d, "leaflet-tooltip-bottom"), ft(d, "leaflet-tooltip-" + I), Nt(d, t);
          },
          _updatePosition: function() {
            var t = this._map.latLngToLayerPoint(this._latlng);
            this._setPosition(t);
          },
          setOpacity: function(t) {
            this.options.opacity = t, this._container && de(this._container, t);
          },
          _animateZoom: function(t) {
            var n = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center);
            this._setPosition(n);
          },
          _getAnchor: function() {
            return st(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [
              0,
              0
            ]);
          }
        }), Ma = function(t, n) {
          return new vn(t, n);
        };
        yt.include({
          openTooltip: function(t, n, a) {
            return this._initOverlay(vn, t, n, a).openOn(this), this;
          },
          closeTooltip: function(t) {
            return t.close(), this;
          }
        }), re.include({
          bindTooltip: function(t, n) {
            return this._tooltip && this.isTooltipOpen() && this.unbindTooltip(), this._tooltip = this._initOverlay(vn, this._tooltip, t, n), this._initTooltipInteractions(), this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(), this;
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
            return this._tooltip && (this instanceof Ae || (this._tooltip._source = this), this._tooltip._prepareOpen(t) && (this._tooltip.openOn(this._map), this.getElement ? this._setAriaDescribedByOnLayer(this) : this.eachLayer && this.eachLayer(this._setAriaDescribedByOnLayer, this))), this;
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
            n && (ht(n, "focus", function() {
              this._tooltip._source = t, this.openTooltip();
            }, this), ht(n, "blur", this.closeTooltip, this));
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
            var n = t.latlng, a, l;
            this._tooltip.options.sticky && t.originalEvent && (a = this._map.mouseEventToContainerPoint(t.originalEvent), l = this._map.containerPointToLayerPoint(a), n = this._map.layerPointToLatLng(l)), this._tooltip.setLatLng(n);
          }
        });
        var Xe = Pi.extend({
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
            if (a.html instanceof Element ? (ji(n), n.appendChild(a.html)) : n.innerHTML = a.html !== false ? a.html : "", a.bgPos) {
              var l = st(a.bgPos);
              n.style.backgroundPosition = -l.x + "px " + -l.y + "px";
            }
            return this._setIconStyles(n, "icon"), n;
          },
          createShadow: function() {
            return null;
          }
        });
        function Xi(t) {
          return new Xe(t);
        }
        Pi.Default = Wi;
        var $i = re.extend({
          options: {
            tileSize: 256,
            opacity: 1,
            updateWhenIdle: rt.mobile,
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
            Bt(this, t);
          },
          onAdd: function() {
            this._initContainer(), this._levels = {}, this._tiles = {}, this._resetView();
          },
          beforeAdd: function(t) {
            t._addZoomLimit(this);
          },
          onRemove: function(t) {
            this._removeAllTiles(), Tt(this._container), t._removeZoomLimit(this), this._container = null, this._tileZoom = void 0;
          },
          bringToFront: function() {
            return this._map && (bi(this._container), this._setAutoZIndex(Math.max)), this;
          },
          bringToBack: function() {
            return this._map && (xi(this._container), this._setAutoZIndex(Math.min)), this;
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
            return this.options.updateWhenIdle || (this._onMove || (this._onMove = St(this._onMoveEnd, this.options.updateInterval, this)), t.move = this._onMove), this._zoomAnimated && (t.zoomanim = this._animateZoom), t;
          },
          createTile: function() {
            return document.createElement("div");
          },
          getTileSize: function() {
            var t = this.options.tileSize;
            return t instanceof at ? t : new at(t, t);
          },
          _updateZIndex: function() {
            this._container && this.options.zIndex !== void 0 && this.options.zIndex !== null && (this._container.style.zIndex = this.options.zIndex);
          },
          _setAutoZIndex: function(t) {
            for (var n = this.getPane().children, a = -t(-1 / 0, 1 / 0), l = 0, d = n.length, _; l < d; l++) _ = n[l].style.zIndex, n[l] !== this._container && _ && (a = t(a, +_));
            isFinite(a) && (this.options.zIndex = a + t(-1, 1), this._updateZIndex());
          },
          _updateOpacity: function() {
            if (this._map && !rt.ielt9) {
              de(this._container, this.options.opacity);
              var t = +/* @__PURE__ */ new Date(), n = false, a = false;
              for (var l in this._tiles) {
                var d = this._tiles[l];
                if (!(!d.current || !d.loaded)) {
                  var _ = Math.min(1, (t - d.loaded) / 200);
                  de(d.el, _), _ < 1 ? n = true : (d.active ? a = true : this._onOpaqueTile(d), d.active = true);
                }
              }
              a && !this._noPrune && this._pruneTiles(), n && (qt(this._fadeFrame), this._fadeFrame = At(this._updateOpacity, this));
            }
          },
          _onOpaqueTile: pt,
          _initContainer: function() {
            this._container || (this._container = xt("div", "leaflet-layer " + (this.options.className || "")), this._updateZIndex(), this.options.opacity < 1 && this._updateOpacity(), this.getPane().appendChild(this._container));
          },
          _updateLevels: function() {
            var t = this._tileZoom, n = this.options.maxZoom;
            if (t !== void 0) {
              for (var a in this._levels) a = Number(a), this._levels[a].el.children.length || a === t ? (this._levels[a].el.style.zIndex = n - Math.abs(t - a), this._onUpdateLevel(a)) : (Tt(this._levels[a].el), this._removeTilesAtZoom(a), this._onRemoveLevel(a), delete this._levels[a]);
              var l = this._levels[t], d = this._map;
              return l || (l = this._levels[t] = {}, l.el = xt("div", "leaflet-tile-container leaflet-zoom-animated", this._container), l.el.style.zIndex = n, l.origin = d.project(d.unproject(d.getPixelOrigin()), t).round(), l.zoom = t, this._setZoomTransform(l, d.getCenter(), d.getZoom()), pt(l.el.offsetWidth), this._onCreateLevel(l)), this._level = l, l;
            }
          },
          _onUpdateLevel: pt,
          _onRemoveLevel: pt,
          _onCreateLevel: pt,
          _pruneTiles: function() {
            if (this._map) {
              var t, n, a = this._map.getZoom();
              if (a > this.options.maxZoom || a < this.options.minZoom) {
                this._removeAllTiles();
                return;
              }
              for (t in this._tiles) n = this._tiles[t], n.retain = n.current;
              for (t in this._tiles) if (n = this._tiles[t], n.current && !n.active) {
                var l = n.coords;
                this._retainParent(l.x, l.y, l.z, l.z - 5) || this._retainChildren(l.x, l.y, l.z, l.z + 2);
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
            for (var t in this._levels) Tt(this._levels[t].el), this._onRemoveLevel(Number(t)), delete this._levels[t];
            this._removeAllTiles(), this._tileZoom = void 0;
          },
          _retainParent: function(t, n, a, l) {
            var d = Math.floor(t / 2), _ = Math.floor(n / 2), w = a - 1, I = new at(+d, +_);
            I.z = +w;
            var G = this._tileCoordsToKey(I), q = this._tiles[G];
            return q && q.active ? (q.retain = true, true) : (q && q.loaded && (q.retain = true), w > l ? this._retainParent(d, _, w, l) : false);
          },
          _retainChildren: function(t, n, a, l) {
            for (var d = 2 * t; d < 2 * t + 2; d++) for (var _ = 2 * n; _ < 2 * n + 2; _++) {
              var w = new at(d, _);
              w.z = a + 1;
              var I = this._tileCoordsToKey(w), G = this._tiles[I];
              if (G && G.active) {
                G.retain = true;
                continue;
              } else G && G.loaded && (G.retain = true);
              a + 1 < l && this._retainChildren(d, _, a + 1, l);
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
          _setView: function(t, n, a, l) {
            var d = Math.round(n);
            this.options.maxZoom !== void 0 && d > this.options.maxZoom || this.options.minZoom !== void 0 && d < this.options.minZoom ? d = void 0 : d = this._clampZoom(d);
            var _ = this.options.updateWhenZooming && d !== this._tileZoom;
            (!l || _) && (this._tileZoom = d, this._abortLoading && this._abortLoading(), this._updateLevels(), this._resetGrid(), d !== void 0 && this._update(t), a || this._pruneTiles(), this._noPrune = !!a), this._setZoomTransforms(t, n);
          },
          _setZoomTransforms: function(t, n) {
            for (var a in this._levels) this._setZoomTransform(this._levels[a], t, n);
          },
          _setZoomTransform: function(t, n, a) {
            var l = this._map.getZoomScale(a, t.zoom), d = t.origin.multiplyBy(l).subtract(this._map._getNewPixelOrigin(n, a)).round();
            rt.any3d ? oi(t.el, d, l) : Nt(t.el, d);
          },
          _resetGrid: function() {
            var t = this._map, n = t.options.crs, a = this._tileSize = this.getTileSize(), l = this._tileZoom, d = this._map.getPixelWorldBounds(this._tileZoom);
            d && (this._globalTileRange = this._pxBoundsToTileRange(d)), this._wrapX = n.wrapLng && !this.options.noWrap && [
              Math.floor(t.project([
                0,
                n.wrapLng[0]
              ], l).x / a.x),
              Math.ceil(t.project([
                0,
                n.wrapLng[1]
              ], l).x / a.y)
            ], this._wrapY = n.wrapLat && !this.options.noWrap && [
              Math.floor(t.project([
                n.wrapLat[0],
                0
              ], l).y / a.x),
              Math.ceil(t.project([
                n.wrapLat[1],
                0
              ], l).y / a.y)
            ];
          },
          _onMoveEnd: function() {
            !this._map || this._map._animatingZoom || this._update();
          },
          _getTiledPixelBounds: function(t) {
            var n = this._map, a = n._animatingZoom ? Math.max(n._animateToZoom, n.getZoom()) : n.getZoom(), l = n.getZoomScale(a, this._tileZoom), d = n.project(t, this._tileZoom).floor(), _ = n.getSize().divideBy(l * 2);
            return new gt(d.subtract(_), d.add(_));
          },
          _update: function(t) {
            var n = this._map;
            if (n) {
              var a = this._clampZoom(n.getZoom());
              if (t === void 0 && (t = n.getCenter()), this._tileZoom !== void 0) {
                var l = this._getTiledPixelBounds(t), d = this._pxBoundsToTileRange(l), _ = d.getCenter(), w = [], I = this.options.keepBuffer, G = new gt(d.getBottomLeft().subtract([
                  I,
                  -I
                ]), d.getTopRight().add([
                  I,
                  -I
                ]));
                if (!(isFinite(d.min.x) && isFinite(d.min.y) && isFinite(d.max.x) && isFinite(d.max.y))) throw new Error("Attempted to load an infinite number of tiles");
                for (var q in this._tiles) {
                  var tt = this._tiles[q].coords;
                  (tt.z !== this._tileZoom || !G.contains(new at(tt.x, tt.y))) && (this._tiles[q].current = false);
                }
                if (Math.abs(a - this._tileZoom) > 1) {
                  this._setView(t, a);
                  return;
                }
                for (var ot = d.min.y; ot <= d.max.y; ot++) for (var mt = d.min.x; mt <= d.max.x; mt++) {
                  var ee = new at(mt, ot);
                  if (ee.z = this._tileZoom, !!this._isValidTile(ee)) {
                    var Vt = this._tiles[this._tileCoordsToKey(ee)];
                    Vt ? Vt.current = true : w.push(ee);
                  }
                }
                if (w.sort(function(se, Qe) {
                  return se.distanceTo(_) - Qe.distanceTo(_);
                }), w.length !== 0) {
                  this._loading || (this._loading = true, this.fire("loading"));
                  var ge = document.createDocumentFragment();
                  for (mt = 0; mt < w.length; mt++) this._addTile(w[mt], ge);
                  this._level.el.appendChild(ge);
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
            var l = this._tileCoordsToBounds(t);
            return Et(this.options.bounds).overlaps(l);
          },
          _keyToBounds: function(t) {
            return this._tileCoordsToBounds(this._keyToTileCoords(t));
          },
          _tileCoordsToNwSe: function(t) {
            var n = this._map, a = this.getTileSize(), l = t.scaleBy(a), d = l.add(a), _ = n.unproject(l, t.z), w = n.unproject(d, t.z);
            return [
              _,
              w
            ];
          },
          _tileCoordsToBounds: function(t) {
            var n = this._tileCoordsToNwSe(t), a = new Dt(n[0], n[1]);
            return this.options.noWrap || (a = this._map.wrapLatLngBounds(a)), a;
          },
          _tileCoordsToKey: function(t) {
            return t.x + ":" + t.y + ":" + t.z;
          },
          _keyToTileCoords: function(t) {
            var n = t.split(":"), a = new at(+n[0], +n[1]);
            return a.z = +n[2], a;
          },
          _removeTile: function(t) {
            var n = this._tiles[t];
            n && (Tt(n.el), delete this._tiles[t], this.fire("tileunload", {
              tile: n.el,
              coords: this._keyToTileCoords(t)
            }));
          },
          _initTile: function(t) {
            ft(t, "leaflet-tile");
            var n = this.getTileSize();
            t.style.width = n.x + "px", t.style.height = n.y + "px", t.onselectstart = pt, t.onmousemove = pt, rt.ielt9 && this.options.opacity < 1 && de(t, this.options.opacity);
          },
          _addTile: function(t, n) {
            var a = this._getTilePos(t), l = this._tileCoordsToKey(t), d = this.createTile(this._wrapCoords(t), A(this._tileReady, this, t));
            this._initTile(d), this.createTile.length < 2 && At(A(this._tileReady, this, t, null, d)), Nt(d, a), this._tiles[l] = {
              el: d,
              coords: t,
              current: true
            }, n.appendChild(d), this.fire("tileloadstart", {
              tile: d,
              coords: t
            });
          },
          _tileReady: function(t, n, a) {
            n && this.fire("tileerror", {
              error: n,
              tile: a,
              coords: t
            });
            var l = this._tileCoordsToKey(t);
            a = this._tiles[l], a && (a.loaded = +/* @__PURE__ */ new Date(), this._map._fadeAnimated ? (de(a.el, 0), qt(this._fadeFrame), this._fadeFrame = At(this._updateOpacity, this)) : (a.active = true, this._pruneTiles()), n || (ft(a.el, "leaflet-tile-loaded"), this.fire("tileload", {
              tile: a.el,
              coords: t
            })), this._noTilesToLoad() && (this._loading = false, this.fire("load"), rt.ielt9 || !this._map._fadeAnimated ? At(this._pruneTiles, this) : setTimeout(A(this._pruneTiles, this), 250)));
          },
          _getTilePos: function(t) {
            return t.scaleBy(this.getTileSize()).subtract(this._level.origin);
          },
          _wrapCoords: function(t) {
            var n = new at(this._wrapX ? Lt(t.x, this._wrapX) : t.x, this._wrapY ? Lt(t.y, this._wrapY) : t.y);
            return n.z = t.z, n;
          },
          _pxBoundsToTileRange: function(t) {
            var n = this.getTileSize();
            return new gt(t.min.unscaleBy(n).floor(), t.max.unscaleBy(n).ceil().subtract([
              1,
              1
            ]));
          },
          _noTilesToLoad: function() {
            for (var t in this._tiles) if (!this._tiles[t].loaded) return false;
            return true;
          }
        });
        function hs(t) {
          return new $i(t);
        }
        var $e = $i.extend({
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
            this._url = t, n = Bt(this, n), n.detectRetina && rt.retina && n.maxZoom > 0 ? (n.tileSize = Math.floor(n.tileSize / 2), n.zoomReverse ? (n.zoomOffset--, n.minZoom = Math.min(n.maxZoom, n.minZoom + 1)) : (n.zoomOffset++, n.maxZoom = Math.max(n.minZoom, n.maxZoom - 1)), n.minZoom = Math.max(0, n.minZoom)) : n.zoomReverse ? n.minZoom = Math.min(n.maxZoom, n.minZoom) : n.maxZoom = Math.max(n.minZoom, n.maxZoom), typeof n.subdomains == "string" && (n.subdomains = n.subdomains.split("")), this.on("tileunload", this._onTileRemove);
          },
          setUrl: function(t, n) {
            return this._url === t && n === void 0 && (n = true), this._url = t, n || this.redraw(), this;
          },
          createTile: function(t, n) {
            var a = document.createElement("img");
            return ht(a, "load", A(this._tileOnLoad, this, n, a)), ht(a, "error", A(this._tileOnError, this, n, a)), (this.options.crossOrigin || this.options.crossOrigin === "") && (a.crossOrigin = this.options.crossOrigin === true ? "" : this.options.crossOrigin), typeof this.options.referrerPolicy == "string" && (a.referrerPolicy = this.options.referrerPolicy), a.alt = "", a.src = this.getTileUrl(t), a;
          },
          getTileUrl: function(t) {
            var n = {
              r: rt.retina ? "@2x" : "",
              s: this._getSubdomain(t),
              x: t.x,
              y: t.y,
              z: this._getZoomForUrl()
            };
            if (this._map && !this._map.options.crs.infinite) {
              var a = this._globalTileRange.max.y - t.y;
              this.options.tms && (n.y = a), n["-y"] = a;
            }
            return tn(this._url, j(n, this.options));
          },
          _tileOnLoad: function(t, n) {
            rt.ielt9 ? setTimeout(A(t, this, null, n), 0) : t(null, n);
          },
          _tileOnError: function(t, n, a) {
            var l = this.options.errorTileUrl;
            l && n.getAttribute("src") !== l && (n.src = l), t(a, n);
          },
          _onTileRemove: function(t) {
            t.tile.onload = null;
          },
          _getZoomForUrl: function() {
            var t = this._tileZoom, n = this.options.maxZoom, a = this.options.zoomReverse, l = this.options.zoomOffset;
            return a && (t = n - t), t + l;
          },
          _getSubdomain: function(t) {
            var n = Math.abs(t.x + t.y) % this.options.subdomains.length;
            return this.options.subdomains[n];
          },
          _abortLoading: function() {
            var t, n;
            for (t in this._tiles) if (this._tiles[t].coords.z !== this._tileZoom && (n = this._tiles[t].el, n.onload = pt, n.onerror = pt, !n.complete)) {
              n.src = we;
              var a = this._tiles[t].coords;
              Tt(n), delete this._tiles[t], this.fire("tileabort", {
                tile: n,
                coords: a
              });
            }
          },
          _removeTile: function(t) {
            var n = this._tiles[t];
            if (n) return n.el.setAttribute("src", we), $i.prototype._removeTile.call(this, t);
          },
          _tileReady: function(t, n, a) {
            if (!(!this._map || a && a.getAttribute("src") === we)) return $i.prototype._tileReady.call(this, t, n, a);
          }
        });
        function cs(t, n) {
          return new $e(t, n);
        }
        var ds = $e.extend({
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
            var a = j({}, this.defaultWmsParams);
            for (var l in n) l in this.options || (a[l] = n[l]);
            n = Bt(this, n);
            var d = n.detectRetina && rt.retina ? 2 : 1, _ = this.getTileSize();
            a.width = _.x * d, a.height = _.y * d, this.wmsParams = a;
          },
          onAdd: function(t) {
            this._crs = this.options.crs || t.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
            var n = this._wmsVersion >= 1.3 ? "crs" : "srs";
            this.wmsParams[n] = this._crs.code, $e.prototype.onAdd.call(this, t);
          },
          getTileUrl: function(t) {
            var n = this._tileCoordsToNwSe(t), a = this._crs, l = Ft(a.project(n[0]), a.project(n[1])), d = l.min, _ = l.max, w = (this._wmsVersion >= 1.3 && this._crs === tr ? [
              d.y,
              d.x,
              _.y,
              _.x
            ] : [
              d.x,
              d.y,
              _.x,
              _.y
            ]).join(","), I = $e.prototype.getTileUrl.call(this, t);
            return I + ke(this.wmsParams, I, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + w;
          },
          setParams: function(t, n) {
            return j(this.wmsParams, t), n || this.redraw(), this;
          }
        });
        function ps(t, n) {
          return new ds(t, n);
        }
        $e.WMS = ds, cs.wms = ps;
        var Oe = re.extend({
          options: {
            padding: 0.1
          },
          initialize: function(t) {
            Bt(this, t), et(this), this._layers = this._layers || {};
          },
          onAdd: function() {
            this._container || (this._initContainer(), ft(this._container, "leaflet-zoom-animated")), this.getPane().appendChild(this._container), this._update(), this.on("update", this._updatePaths, this);
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
            var a = this._map.getZoomScale(n, this._zoom), l = this._map.getSize().multiplyBy(0.5 + this.options.padding), d = this._map.project(this._center, n), _ = l.multiplyBy(-a).add(d).subtract(this._map._getNewPixelOrigin(t, n));
            rt.any3d ? oi(this._container, _, a) : Nt(this._container, _);
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
            this._bounds = new gt(a, a.add(n.multiplyBy(1 + t * 2)).round()), this._center = this._map.getCenter(), this._zoom = this._map.getZoom();
          }
        }), Ln = Oe.extend({
          options: {
            tolerance: 0
          },
          getEvents: function() {
            var t = Oe.prototype.getEvents.call(this);
            return t.viewprereset = this._onViewPreReset, t;
          },
          _onViewPreReset: function() {
            this._postponeUpdatePaths = true;
          },
          onAdd: function() {
            Oe.prototype.onAdd.call(this), this._draw();
          },
          _initContainer: function() {
            var t = this._container = document.createElement("canvas");
            ht(t, "mousemove", this._onMouseMove, this), ht(t, "click dblclick mousedown mouseup contextmenu", this._onClick, this), ht(t, "mouseout", this._handleMouseOut, this), t._leaflet_disable_events = true, this._ctx = t.getContext("2d");
          },
          _destroyContainer: function() {
            qt(this._redrawRequest), delete this._ctx, Tt(this._container), Mt(this._container), delete this._container;
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
              Oe.prototype._update.call(this);
              var t = this._bounds, n = this._container, a = t.getSize(), l = rt.retina ? 2 : 1;
              Nt(n, t.min), n.width = l * a.x, n.height = l * a.y, n.style.width = a.x + "px", n.style.height = a.y + "px", rt.retina && this._ctx.scale(2, 2), this._ctx.translate(-t.min.x, -t.min.y), this.fire("update");
            }
          },
          _reset: function() {
            Oe.prototype._reset.call(this), this._postponeUpdatePaths && (this._postponeUpdatePaths = false, this._updatePaths());
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
            var n = t._order, a = n.next, l = n.prev;
            a ? a.prev = l : this._drawLast = l, l ? l.next = a : this._drawFirst = a, delete t._order, delete this._layers[et(t)], this._requestRedraw(t);
          },
          _updatePath: function(t) {
            this._extendRedrawBounds(t), t._project(), t._update(), this._requestRedraw(t);
          },
          _updateStyle: function(t) {
            this._updateDashArray(t), this._requestRedraw(t);
          },
          _updateDashArray: function(t) {
            if (typeof t.options.dashArray == "string") {
              var n = t.options.dashArray.split(/[, ]+/), a = [], l, d;
              for (d = 0; d < n.length; d++) {
                if (l = Number(n[d]), isNaN(l)) return;
                a.push(l);
              }
              t.options._dashArray = a;
            } else t.options._dashArray = t.options.dashArray;
          },
          _requestRedraw: function(t) {
            this._map && (this._extendRedrawBounds(t), this._redrawRequest = this._redrawRequest || At(this._redraw, this));
          },
          _extendRedrawBounds: function(t) {
            if (t._pxBounds) {
              var n = (t.options.weight || 0) + 1;
              this._redrawBounds = this._redrawBounds || new gt(), this._redrawBounds.extend(t._pxBounds.min.subtract([
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
            for (var l = this._drawFirst; l; l = l.next) t = l.layer, (!n || t._pxBounds && t._pxBounds.intersects(n)) && t._updatePath();
            this._drawing = false, this._ctx.restore();
          },
          _updatePoly: function(t, n) {
            if (this._drawing) {
              var a, l, d, _, w = t._parts, I = w.length, G = this._ctx;
              if (I) {
                for (G.beginPath(), a = 0; a < I; a++) {
                  for (l = 0, d = w[a].length; l < d; l++) _ = w[a][l], G[l ? "lineTo" : "moveTo"](_.x, _.y);
                  n && G.closePath();
                }
                this._fillStroke(G, t);
              }
            }
          },
          _updateCircle: function(t) {
            if (!(!this._drawing || t._empty())) {
              var n = t._point, a = this._ctx, l = Math.max(Math.round(t._radius), 1), d = (Math.max(Math.round(t._radiusY), 1) || l) / l;
              d !== 1 && (a.save(), a.scale(1, d)), a.beginPath(), a.arc(n.x, n.y / d, l, 0, Math.PI * 2, false), d !== 1 && a.restore(), this._fillStroke(a, t);
            }
          },
          _fillStroke: function(t, n) {
            var a = n.options;
            a.fill && (t.globalAlpha = a.fillOpacity, t.fillStyle = a.fillColor || a.color, t.fill(a.fillRule || "evenodd")), a.stroke && a.weight !== 0 && (t.setLineDash && t.setLineDash(n.options && n.options._dashArray || []), t.globalAlpha = a.opacity, t.lineWidth = a.weight, t.strokeStyle = a.color, t.lineCap = a.lineCap, t.lineJoin = a.lineJoin, t.stroke());
          },
          _onClick: function(t) {
            for (var n = this._map.mouseEventToLayerPoint(t), a, l, d = this._drawFirst; d; d = d.next) a = d.layer, a.options.interactive && a._containsPoint(n) && (!(t.type === "click" || t.type === "preclick") || !this._map._draggableMoved(a)) && (l = a);
            this._fireEvent(l ? [
              l
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
            n && (It(this._container, "leaflet-interactive"), this._fireEvent([
              n
            ], t, "mouseout"), this._hoveredLayer = null, this._mouseHoverThrottled = false);
          },
          _handleMouseHover: function(t, n) {
            if (!this._mouseHoverThrottled) {
              for (var a, l, d = this._drawFirst; d; d = d.next) a = d.layer, a.options.interactive && a._containsPoint(n) && (l = a);
              l !== this._hoveredLayer && (this._handleMouseOut(t), l && (ft(this._container, "leaflet-interactive"), this._fireEvent([
                l
              ], t, "mouseover"), this._hoveredLayer = l)), this._fireEvent(this._hoveredLayer ? [
                this._hoveredLayer
              ] : false, t), this._mouseHoverThrottled = true, setTimeout(A(function() {
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
              var a = n.next, l = n.prev;
              if (a) a.prev = l;
              else return;
              l ? l.next = a : a && (this._drawFirst = a), n.prev = this._drawLast, this._drawLast.next = n, n.next = null, this._drawLast = n, this._requestRedraw(t);
            }
          },
          _bringToBack: function(t) {
            var n = t._order;
            if (n) {
              var a = n.next, l = n.prev;
              if (l) l.next = a;
              else return;
              a ? a.prev = l : l && (this._drawLast = l), n.prev = null, n.next = this._drawFirst, this._drawFirst.prev = n, this._drawFirst = n, this._requestRedraw(t);
            }
          }
        });
        function or(t) {
          return rt.canvas ? new Ln(t) : null;
        }
        var di = (function() {
          try {
            return document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"), function(t) {
              return document.createElement("<lvml:" + t + ' class="lvml">');
            };
          } catch {
          }
          return function(t) {
            return document.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
          };
        })(), ka = {
          _initContainer: function() {
            this._container = xt("div", "leaflet-vml-container");
          },
          _update: function() {
            this._map._animatingZoom || (Oe.prototype._update.call(this), this.fire("update"));
          },
          _initPath: function(t) {
            var n = t._container = di("shape");
            ft(n, "leaflet-vml-shape " + (this.options.className || "")), n.coordsize = "1 1", t._path = di("path"), n.appendChild(t._path), this._updateStyle(t), this._layers[et(t)] = t;
          },
          _addPath: function(t) {
            var n = t._container;
            this._container.appendChild(n), t.options.interactive && t.addInteractiveTarget(n);
          },
          _removePath: function(t) {
            var n = t._container;
            Tt(n), t.removeInteractiveTarget(n), delete this._layers[et(t)];
          },
          _updateStyle: function(t) {
            var n = t._stroke, a = t._fill, l = t.options, d = t._container;
            d.stroked = !!l.stroke, d.filled = !!l.fill, l.stroke ? (n || (n = t._stroke = di("stroke")), d.appendChild(n), n.weight = l.weight + "px", n.color = l.color, n.opacity = l.opacity, l.dashArray ? n.dashStyle = Xt(l.dashArray) ? l.dashArray.join(" ") : l.dashArray.replace(/( *, *)/g, " ") : n.dashStyle = "", n.endcap = l.lineCap.replace("butt", "flat"), n.joinstyle = l.lineJoin) : n && (d.removeChild(n), t._stroke = null), l.fill ? (a || (a = t._fill = di("fill")), d.appendChild(a), a.color = l.fillColor || l.color, a.opacity = l.fillOpacity) : a && (d.removeChild(a), t._fill = null);
          },
          _updateCircle: function(t) {
            var n = t._point.round(), a = Math.round(t._radius), l = Math.round(t._radiusY || a);
            this._setPath(t, t._empty() ? "M0 0" : "AL " + n.x + "," + n.y + " " + a + "," + l + " 0," + 65535 * 360);
          },
          _setPath: function(t, n) {
            t._path.v = n;
          },
          _bringToFront: function(t) {
            bi(t._container);
          },
          _bringToBack: function(t) {
            xi(t._container);
          }
        }, me = rt.vml ? di : Lr, Gt = Oe.extend({
          _initContainer: function() {
            this._container = me("svg"), this._container.setAttribute("pointer-events", "none"), this._rootGroup = me("g"), this._container.appendChild(this._rootGroup);
          },
          _destroyContainer: function() {
            Tt(this._container), Mt(this._container), delete this._container, delete this._rootGroup, delete this._svgSize;
          },
          _update: function() {
            if (!(this._map._animatingZoom && this._bounds)) {
              Oe.prototype._update.call(this);
              var t = this._bounds, n = t.getSize(), a = this._container;
              (!this._svgSize || !this._svgSize.equals(n)) && (this._svgSize = n, a.setAttribute("width", n.x), a.setAttribute("height", n.y)), Nt(a, t.min), a.setAttribute("viewBox", [
                t.min.x,
                t.min.y,
                n.x,
                n.y
              ].join(" ")), this.fire("update");
            }
          },
          _initPath: function(t) {
            var n = t._path = me("path");
            t.options.className && ft(n, t.options.className), t.options.interactive && ft(n, "leaflet-interactive"), this._updateStyle(t), this._layers[et(t)] = t;
          },
          _addPath: function(t) {
            this._rootGroup || this._initContainer(), this._rootGroup.appendChild(t._path), t.addInteractiveTarget(t._path);
          },
          _removePath: function(t) {
            Tt(t._path), t.removeInteractiveTarget(t._path), delete this._layers[et(t)];
          },
          _updatePath: function(t) {
            t._project(), t._update();
          },
          _updateStyle: function(t) {
            var n = t._path, a = t.options;
            n && (a.stroke ? (n.setAttribute("stroke", a.color), n.setAttribute("stroke-opacity", a.opacity), n.setAttribute("stroke-width", a.weight), n.setAttribute("stroke-linecap", a.lineCap), n.setAttribute("stroke-linejoin", a.lineJoin), a.dashArray ? n.setAttribute("stroke-dasharray", a.dashArray) : n.removeAttribute("stroke-dasharray"), a.dashOffset ? n.setAttribute("stroke-dashoffset", a.dashOffset) : n.removeAttribute("stroke-dashoffset")) : n.setAttribute("stroke", "none"), a.fill ? (n.setAttribute("fill", a.fillColor || a.color), n.setAttribute("fill-opacity", a.fillOpacity), n.setAttribute("fill-rule", a.fillRule || "evenodd")) : n.setAttribute("fill", "none"));
          },
          _updatePoly: function(t, n) {
            this._setPath(t, br(t._parts, n));
          },
          _updateCircle: function(t) {
            var n = t._point, a = Math.max(Math.round(t._radius), 1), l = Math.max(Math.round(t._radiusY), 1) || a, d = "a" + a + "," + l + " 0 1,0 ", _ = t._empty() ? "M0 0" : "M" + (n.x - a) + "," + n.y + d + a * 2 + ",0 " + d + -a * 2 + ",0 ";
            this._setPath(t, _);
          },
          _setPath: function(t, n) {
            t._path.setAttribute("d", n);
          },
          _bringToFront: function(t) {
            bi(t._path);
          },
          _bringToBack: function(t) {
            xi(t._path);
          }
        });
        rt.vml && Gt.include(ka);
        function fs(t) {
          return rt.svg || rt.vml ? new Gt(t) : null;
        }
        yt.include({
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
            return this.options.preferCanvas && or(t) || fs(t);
          }
        });
        var bn = Qt.extend({
          initialize: function(t, n) {
            Qt.prototype.initialize.call(this, this._boundsToLatLngs(t), n);
          },
          setBounds: function(t) {
            return this.setLatLngs(this._boundsToLatLngs(t));
          },
          _boundsToLatLngs: function(t) {
            return t = Et(t), [
              t.getSouthWest(),
              t.getNorthWest(),
              t.getNorthEast(),
              t.getSouthEast()
            ];
          }
        });
        function wa(t, n) {
          return new bn(t, n);
        }
        Gt.create = me, Gt.pointsToPath = br, Ue.geometryToLayer = Ji, Ue.coordsToLatLng = rr, Ue.coordsToLatLngs = he, Ue.latLngToCoords = Ve, Ue.latLngsToCoords = hi, Ue.getFeature = ci, Ue.asFeature = yn, yt.mergeOptions({
          boxZoom: true
        });
        var Ai = Se.extend({
          initialize: function(t) {
            this._map = t, this._container = t._container, this._pane = t._panes.overlayPane, this._resetStateTimeout = 0, t.on("unload", this._destroy, this);
          },
          addHooks: function() {
            ht(this._container, "mousedown", this._onMouseDown, this);
          },
          removeHooks: function() {
            Mt(this._container, "mousedown", this._onMouseDown, this);
          },
          moved: function() {
            return this._moved;
          },
          _destroy: function() {
            Tt(this._pane), delete this._pane;
          },
          _resetState: function() {
            this._resetStateTimeout = 0, this._moved = false;
          },
          _clearDeferredResetState: function() {
            this._resetStateTimeout !== 0 && (clearTimeout(this._resetStateTimeout), this._resetStateTimeout = 0);
          },
          _onMouseDown: function(t) {
            if (!t.shiftKey || t.which !== 1 && t.button !== 1) return false;
            this._clearDeferredResetState(), this._resetState(), Zi(), jn(), this._startPoint = this._map.mouseEventToContainerPoint(t), ht(document, {
              contextmenu: li,
              mousemove: this._onMouseMove,
              mouseup: this._onMouseUp,
              keydown: this._onKeyDown
            }, this);
          },
          _onMouseMove: function(t) {
            this._moved || (this._moved = true, this._box = xt("div", "leaflet-zoom-box", this._container), ft(this._container, "leaflet-crosshair"), this._map.fire("boxzoomstart")), this._point = this._map.mouseEventToContainerPoint(t);
            var n = new gt(this._point, this._startPoint), a = n.getSize();
            Nt(this._box, n.min), this._box.style.width = a.x + "px", this._box.style.height = a.y + "px";
          },
          _finish: function() {
            this._moved && (Tt(this._box), It(this._container, "leaflet-crosshair")), Ui(), Zn(), Mt(document, {
              contextmenu: li,
              mousemove: this._onMouseMove,
              mouseup: this._onMouseUp,
              keydown: this._onKeyDown
            }, this);
          },
          _onMouseUp: function(t) {
            if (!(t.which !== 1 && t.button !== 1) && (this._finish(), !!this._moved)) {
              this._clearDeferredResetState(), this._resetStateTimeout = setTimeout(A(this._resetState, this), 0);
              var n = new Dt(this._map.containerPointToLatLng(this._startPoint), this._map.containerPointToLatLng(this._point));
              this._map.fitBounds(n).fire("boxzoomend", {
                boxZoomBounds: n
              });
            }
          },
          _onKeyDown: function(t) {
            t.keyCode === 27 && (this._finish(), this._clearDeferredResetState(), this._resetState());
          }
        });
        yt.addInitHook("addHandler", "boxZoom", Ai), yt.mergeOptions({
          doubleClickZoom: true
        });
        var _s = Se.extend({
          addHooks: function() {
            this._map.on("dblclick", this._onDoubleClick, this);
          },
          removeHooks: function() {
            this._map.off("dblclick", this._onDoubleClick, this);
          },
          _onDoubleClick: function(t) {
            var n = this._map, a = n.getZoom(), l = n.options.zoomDelta, d = t.originalEvent.shiftKey ? a - l : a + l;
            n.options.doubleClickZoom === "center" ? n.setZoom(d) : n.setZoomAround(t.containerPoint, d);
          }
        });
        yt.addInitHook("addHandler", "doubleClickZoom", _s), yt.mergeOptions({
          dragging: true,
          inertia: true,
          inertiaDeceleration: 3400,
          inertiaMaxSpeed: 1 / 0,
          easeLinearity: 0.2,
          worldCopyJump: false,
          maxBoundsViscosity: 0
        });
        var ms = Se.extend({
          addHooks: function() {
            if (!this._draggable) {
              var t = this._map;
              this._draggable = new Je(t._mapPane, t._container), this._draggable.on({
                dragstart: this._onDragStart,
                drag: this._onDrag,
                dragend: this._onDragEnd
              }, this), this._draggable.on("predrag", this._onPreDragLimit, this), t.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this), t.on("zoomend", this._onZoomEnd, this), t.whenReady(this._onZoomEnd, this));
            }
            ft(this._map._container, "leaflet-grab leaflet-touch-drag"), this._draggable.enable(), this._positions = [], this._times = [];
          },
          removeHooks: function() {
            It(this._map._container, "leaflet-grab"), It(this._map._container, "leaflet-touch-drag"), this._draggable.disable();
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
              var n = Et(this._map.options.maxBounds);
              this._offsetLimit = Ft(this._map.latLngToContainerPoint(n.getNorthWest()).multiplyBy(-1), this._map.latLngToContainerPoint(n.getSouthEast()).multiplyBy(-1).add(this._map.getSize())), this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity));
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
            var t = this._worldWidth, n = Math.round(t / 2), a = this._initialWorldOffset, l = this._draggable._newPos.x, d = (l - n + a) % t + n - a, _ = (l + n + a) % t - n - a, w = Math.abs(d + a) < Math.abs(_ + a) ? d : _;
            this._draggable._absPos = this._draggable._newPos.clone(), this._draggable._newPos.x = w;
          },
          _onDragEnd: function(t) {
            var n = this._map, a = n.options, l = !a.inertia || t.noInertia || this._times.length < 2;
            if (n.fire("dragend", t), l) n.fire("moveend");
            else {
              this._prunePositions(+/* @__PURE__ */ new Date());
              var d = this._lastPos.subtract(this._positions[0]), _ = (this._lastTime - this._times[0]) / 1e3, w = a.easeLinearity, I = d.multiplyBy(w / _), G = I.distanceTo([
                0,
                0
              ]), q = Math.min(a.inertiaMaxSpeed, G), tt = I.multiplyBy(q / G), ot = q / (a.inertiaDeceleration * w), mt = tt.multiplyBy(-ot / 2).round();
              !mt.x && !mt.y ? n.fire("moveend") : (mt = n._limitOffset(mt, n.options.maxBounds), At(function() {
                n.panBy(mt, {
                  duration: ot,
                  easeLinearity: w,
                  noMoveStart: true,
                  animate: true
                });
              }));
            }
          }
        });
        yt.addInitHook("addHandler", "dragging", ms), yt.mergeOptions({
          keyboard: true,
          keyboardPanDelta: 80
        });
        var gs = Se.extend({
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
            t.tabIndex <= 0 && (t.tabIndex = "0"), ht(t, {
              focus: this._onFocus,
              blur: this._onBlur,
              mousedown: this._onMouseDown
            }, this), this._map.on({
              focus: this._addHooks,
              blur: this._removeHooks
            }, this);
          },
          removeHooks: function() {
            this._removeHooks(), Mt(this._map._container, {
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
              var t = document.body, n = document.documentElement, a = t.scrollTop || n.scrollTop, l = t.scrollLeft || n.scrollLeft;
              this._map._container.focus(), window.scrollTo(l, a);
            }
          },
          _onFocus: function() {
            this._focused = true, this._map.fire("focus");
          },
          _onBlur: function() {
            this._focused = false, this._map.fire("blur");
          },
          _setPanDelta: function(t) {
            var n = this._panKeys = {}, a = this.keyCodes, l, d;
            for (l = 0, d = a.left.length; l < d; l++) n[a.left[l]] = [
              -1 * t,
              0
            ];
            for (l = 0, d = a.right.length; l < d; l++) n[a.right[l]] = [
              t,
              0
            ];
            for (l = 0, d = a.down.length; l < d; l++) n[a.down[l]] = [
              0,
              t
            ];
            for (l = 0, d = a.up.length; l < d; l++) n[a.up[l]] = [
              0,
              -1 * t
            ];
          },
          _setZoomDelta: function(t) {
            var n = this._zoomKeys = {}, a = this.keyCodes, l, d;
            for (l = 0, d = a.zoomIn.length; l < d; l++) n[a.zoomIn[l]] = t;
            for (l = 0, d = a.zoomOut.length; l < d; l++) n[a.zoomOut[l]] = -t;
          },
          _addHooks: function() {
            ht(document, "keydown", this._onKeyDown, this);
          },
          _removeHooks: function() {
            Mt(document, "keydown", this._onKeyDown, this);
          },
          _onKeyDown: function(t) {
            if (!(t.altKey || t.ctrlKey || t.metaKey)) {
              var n = t.keyCode, a = this._map, l;
              if (n in this._panKeys) {
                if (!a._panAnim || !a._panAnim._inProgress) if (l = this._panKeys[n], t.shiftKey && (l = st(l).multiplyBy(3)), a.options.maxBounds && (l = a._limitOffset(st(l), a.options.maxBounds)), a.options.worldCopyJump) {
                  var d = a.wrapLatLng(a.unproject(a.project(a.getCenter()).add(l)));
                  a.panTo(d);
                } else a.panBy(l);
              } else if (n in this._zoomKeys) a.setZoom(a.getZoom() + (t.shiftKey ? 3 : 1) * this._zoomKeys[n]);
              else if (n === 27 && a._popup && a._popup.options.closeOnEscapeKey) a.closePopup();
              else return;
              li(t);
            }
          }
        });
        yt.addInitHook("addHandler", "keyboard", gs), yt.mergeOptions({
          scrollWheelZoom: true,
          wheelDebounceTime: 40,
          wheelPxPerZoomLevel: 60
        });
        var pi = Se.extend({
          addHooks: function() {
            ht(this._map._container, "wheel", this._onWheelScroll, this), this._delta = 0;
          },
          removeHooks: function() {
            Mt(this._map._container, "wheel", this._onWheelScroll, this);
          },
          _onWheelScroll: function(t) {
            var n = qr(t), a = this._map.options.wheelDebounceTime;
            this._delta += n, this._lastMousePos = this._map.mouseEventToContainerPoint(t), this._startTime || (this._startTime = +/* @__PURE__ */ new Date());
            var l = Math.max(a - (+/* @__PURE__ */ new Date() - this._startTime), 0);
            clearTimeout(this._timer), this._timer = setTimeout(A(this._performZoom, this), l), li(t);
          },
          _performZoom: function() {
            var t = this._map, n = t.getZoom(), a = this._map.options.zoomSnap || 0;
            t._stop();
            var l = this._delta / (this._map.options.wheelPxPerZoomLevel * 4), d = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(l)))) / Math.LN2, _ = a ? Math.ceil(d / a) * a : d, w = t._limitZoom(n + (this._delta > 0 ? _ : -_)) - n;
            this._delta = 0, this._startTime = null, w && (t.options.scrollWheelZoom === "center" ? t.setZoom(n + w) : t.setZoomAround(this._lastMousePos, n + w));
          }
        });
        yt.addInitHook("addHandler", "scrollWheelZoom", pi);
        var ys = 600;
        yt.mergeOptions({
          tapHold: rt.touchNative && rt.safari && rt.mobile,
          tapTolerance: 15
        });
        var ur = Se.extend({
          addHooks: function() {
            ht(this._map._container, "touchstart", this._onDown, this);
          },
          removeHooks: function() {
            Mt(this._map._container, "touchstart", this._onDown, this);
          },
          _onDown: function(t) {
            if (clearTimeout(this._holdTimeout), t.touches.length === 1) {
              var n = t.touches[0];
              this._startPos = this._newPos = new at(n.clientX, n.clientY), this._holdTimeout = setTimeout(A(function() {
                this._cancel(), this._isTapValid() && (ht(document, "touchend", Ht), ht(document, "touchend touchcancel", this._cancelClickPrevent), this._simulateEvent("contextmenu", n));
              }, this), ys), ht(document, "touchend touchcancel contextmenu", this._cancel, this), ht(document, "touchmove", this._onMove, this);
            }
          },
          _cancelClickPrevent: function t() {
            Mt(document, "touchend", Ht), Mt(document, "touchend touchcancel", t);
          },
          _cancel: function() {
            clearTimeout(this._holdTimeout), Mt(document, "touchend touchcancel contextmenu", this._cancel, this), Mt(document, "touchmove", this._onMove, this);
          },
          _onMove: function(t) {
            var n = t.touches[0];
            this._newPos = new at(n.clientX, n.clientY);
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
        yt.addInitHook("addHandler", "tapHold", ur), yt.mergeOptions({
          touchZoom: rt.touch,
          bounceAtZoomLimits: true
        });
        var lr = Se.extend({
          addHooks: function() {
            ft(this._map._container, "leaflet-touch-zoom"), ht(this._map._container, "touchstart", this._onTouchStart, this);
          },
          removeHooks: function() {
            It(this._map._container, "leaflet-touch-zoom"), Mt(this._map._container, "touchstart", this._onTouchStart, this);
          },
          _onTouchStart: function(t) {
            var n = this._map;
            if (!(!t.touches || t.touches.length !== 2 || n._animatingZoom || this._zooming)) {
              var a = n.mouseEventToContainerPoint(t.touches[0]), l = n.mouseEventToContainerPoint(t.touches[1]);
              this._centerPoint = n.getSize()._divideBy(2), this._startLatLng = n.containerPointToLatLng(this._centerPoint), n.options.touchZoom !== "center" && (this._pinchStartLatLng = n.containerPointToLatLng(a.add(l)._divideBy(2))), this._startDist = a.distanceTo(l), this._startZoom = n.getZoom(), this._moved = false, this._zooming = true, n._stop(), ht(document, "touchmove", this._onTouchMove, this), ht(document, "touchend touchcancel", this._onTouchEnd, this), Ht(t);
            }
          },
          _onTouchMove: function(t) {
            if (!(!t.touches || t.touches.length !== 2 || !this._zooming)) {
              var n = this._map, a = n.mouseEventToContainerPoint(t.touches[0]), l = n.mouseEventToContainerPoint(t.touches[1]), d = a.distanceTo(l) / this._startDist;
              if (this._zoom = n.getScaleZoom(d, this._startZoom), !n.options.bounceAtZoomLimits && (this._zoom < n.getMinZoom() && d < 1 || this._zoom > n.getMaxZoom() && d > 1) && (this._zoom = n._limitZoom(this._zoom)), n.options.touchZoom === "center") {
                if (this._center = this._startLatLng, d === 1) return;
              } else {
                var _ = a._add(l)._divideBy(2)._subtract(this._centerPoint);
                if (d === 1 && _.x === 0 && _.y === 0) return;
                this._center = n.unproject(n.project(this._pinchStartLatLng, this._zoom).subtract(_), this._zoom);
              }
              this._moved || (n._moveStart(true, false), this._moved = true), qt(this._animRequest);
              var w = A(n._move, n, this._center, this._zoom, {
                pinch: true,
                round: false
              }, void 0);
              this._animRequest = At(w, this, true), Ht(t);
            }
          },
          _onTouchEnd: function() {
            if (!this._moved || !this._zooming) {
              this._zooming = false;
              return;
            }
            this._zooming = false, qt(this._animRequest), Mt(document, "touchmove", this._onTouchMove, this), Mt(document, "touchend touchcancel", this._onTouchEnd, this), this._map.options.zoomAnimation ? this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), true, this._map.options.zoomSnap) : this._map._resetView(this._center, this._map._limitZoom(this._zoom));
          }
        });
        yt.addInitHook("addHandler", "touchZoom", lr), yt.BoxZoom = Ai, yt.DoubleClickZoom = _s, yt.Drag = ms, yt.Keyboard = gs, yt.ScrollWheelZoom = pi, yt.TapHold = ur, yt.TouchZoom = lr, v.Bounds = gt, v.Browser = rt, v.CRS = be, v.Canvas = Ln, v.Circle = Si, v.CircleMarker = gn, v.Class = Le, v.Control = Ce, v.DivIcon = Xe, v.DivOverlay = Te, v.DomEvent = vt, v.DomUtil = ua, v.Draggable = Je, v.Evented = si, v.FeatureGroup = Ae, v.GeoJSON = Ue, v.GridLayer = $i, v.Handler = Se, v.Icon = Pi, v.ImageOverlay = Di, v.LatLng = bt, v.LatLngBounds = Dt, v.Layer = re, v.LayerGroup = je, v.LineUtil = pn, v.Map = yt, v.Marker = mn, v.Mixin = da, v.Path = _e, v.Point = at, v.PolyUtil = ts, v.Polygon = Qt, v.Polyline = Ze, v.Popup = Yi, v.PosAnimation = Wr, v.Projection = rs, v.Rectangle = bn, v.Renderer = Oe, v.SVG = Gt, v.SVGOverlay = ar, v.TileLayer = $e, v.Tooltip = vn, v.Transformation = En, v.Util = ri, v.VideoOverlay = ls, v.bind = A, v.bounds = Ft, v.canvas = or, v.circle = ya, v.circleMarker = er, v.control = Ci, v.divIcon = Xi, v.extend = j, v.featureGroup = ma, v.geoJSON = us, v.geoJson = va, v.gridLayer = hs, v.icon = ga, v.imageOverlay = La, v.latLng = _t, v.latLngBounds = Et, v.layerGroup = _n, v.map = cn, v.marker = as, v.point = st, v.polygon = nr, v.polyline = ir, v.popup = Ca, v.rectangle = wa, v.setOptions = Bt, v.stamp = et, v.svg = fs, v.svgOverlay = xa, v.tileLayer = cs, v.tooltip = Ma, v.transformation = Ni, v.version = T, v.videoOverlay = ba;
        var te = window.L;
        v.noConflict = function() {
          return window.L = te, this;
        }, window.L = v;
      }));
    })(mr, mr.exports)), mr.exports;
  }
  var mu = _u();
  const ye = pu(mu);
  var io = {}, no;
  function gu() {
    return no || (no = 1, (() => {
      var _a2, _b;
      var V = Object.create, M = Object.defineProperty, v = Object.getOwnPropertyDescriptor, T = Object.getOwnPropertyNames, j = Object.getPrototypeOf, $ = Object.prototype.hasOwnProperty, A = (e, i) => () => (i || e((i = {
        exports: {}
      }).exports, i), i.exports), ut = (e, i, r, s) => {
        if (i && typeof i == "object" || typeof i == "function") for (let o of T(i)) !$.call(e, o) && o !== r && M(e, o, {
          get: () => i[o],
          enumerable: !(s = v(i, o)) || s.enumerable
        });
        return e;
      }, et = (e, i, r) => (r = e != null ? V(j(e)) : {}, ut(i || !e || !e.__esModule ? M(r, "default", {
        value: e,
        enumerable: true
      }) : r, e)), St = A((e, i) => {
        function r() {
          this.__data__ = [], this.size = 0;
        }
        i.exports = r;
      }), Lt = A((e, i) => {
        function r(s, o) {
          return s === o || s !== s && o !== o;
        }
        i.exports = r;
      }), pt = A((e, i) => {
        var r = Lt();
        function s(o, u) {
          for (var h = o.length; h--; ) if (r(o[h][0], u)) return h;
          return -1;
        }
        i.exports = s;
      }), Ot = A((e, i) => {
        var r = pt(), s = Array.prototype, o = s.splice;
        function u(h) {
          var c = this.__data__, p = r(c, h);
          if (p < 0) return false;
          var f = c.length - 1;
          return p == f ? c.pop() : o.call(c, p, 1), --this.size, true;
        }
        i.exports = u;
      }), ve = A((e, i) => {
        var r = pt();
        function s(o) {
          var u = this.__data__, h = r(u, o);
          return h < 0 ? void 0 : u[h][1];
        }
        i.exports = s;
      }), ue = A((e, i) => {
        var r = pt();
        function s(o) {
          return r(this.__data__, o) > -1;
        }
        i.exports = s;
      }), Bt = A((e, i) => {
        var r = pt();
        function s(o, u) {
          var h = this.__data__, c = r(h, o);
          return c < 0 ? (++this.size, h.push([
            o,
            u
          ])) : h[c][1] = u, this;
        }
        i.exports = s;
      }), ke = A((e, i) => {
        var r = St(), s = Ot(), o = ve(), u = ue(), h = Bt();
        function c(p) {
          var f = -1, C = p == null ? 0 : p.length;
          for (this.clear(); ++f < C; ) {
            var y = p[f];
            this.set(y[0], y[1]);
          }
        }
        c.prototype.clear = r, c.prototype.delete = s, c.prototype.get = o, c.prototype.has = u, c.prototype.set = h, i.exports = c;
      }), ni = A((e, i) => {
        var r = ke();
        function s() {
          this.__data__ = new r(), this.size = 0;
        }
        i.exports = s;
      }), tn = A((e, i) => {
        function r(s) {
          var o = this.__data__, u = o.delete(s);
          return this.size = o.size, u;
        }
        i.exports = r;
      }), Xt = A((e, i) => {
        function r(s) {
          return this.__data__.get(s);
        }
        i.exports = r;
      }), Ri = A((e, i) => {
        function r(s) {
          return this.__data__.has(s);
        }
        i.exports = r;
      }), we = A((e, i) => {
        var r = typeof Os == "object" && Os && Os.Object === Object && Os;
        i.exports = r;
      }), Ee = A((e, i) => {
        var r = we(), s = typeof self == "object" && self && self.Object === Object && self, o = r || s || Function("return this")();
        i.exports = o;
      }), Ne = A((e, i) => {
        var r = Ee(), s = r.Symbol;
        i.exports = s;
      }), Fi = A((e, i) => {
        var r = Ne(), s = Object.prototype, o = s.hasOwnProperty, u = s.toString, h = r ? r.toStringTag : void 0;
        function c(p) {
          var f = o.call(p, h), C = p[h];
          try {
            p[h] = void 0;
            var y = true;
          } catch {
          }
          var S = u.call(p);
          return y && (f ? p[h] = C : delete p[h]), S;
        }
        i.exports = c;
      }), mi = A((e, i) => {
        var r = Object.prototype, s = r.toString;
        function o(u) {
          return s.call(u);
        }
        i.exports = o;
      }), ne = A((e, i) => {
        var r = Ne(), s = Fi(), o = mi(), u = "[object Null]", h = "[object Undefined]", c = r ? r.toStringTag : void 0;
        function p(f) {
          return f == null ? f === void 0 ? h : u : c && c in Object(f) ? s(f) : o(f);
        }
        i.exports = p;
      }), At = A((e, i) => {
        function r(s) {
          var o = typeof s;
          return s != null && (o == "object" || o == "function");
        }
        i.exports = r;
      }), qt = A((e, i) => {
        var r = ne(), s = At(), o = "[object AsyncFunction]", u = "[object Function]", h = "[object GeneratorFunction]", c = "[object Proxy]";
        function p(f) {
          if (!s(f)) return false;
          var C = r(f);
          return C == u || C == h || C == o || C == c;
        }
        i.exports = p;
      }), ri = A((e, i) => {
        var r = Ee(), s = r["__core-js_shared__"];
        i.exports = s;
      }), Le = A((e, i) => {
        var r = ri(), s = (function() {
          var u = /[^.]+$/.exec(r && r.keys && r.keys.IE_PROTO || "");
          return u ? "Symbol(src)_1." + u : "";
        })();
        function o(u) {
          return !!s && s in u;
        }
        i.exports = o;
      }), Ii = A((e, i) => {
        var r = Function.prototype, s = r.toString;
        function o(u) {
          if (u != null) {
            try {
              return s.call(u);
            } catch {
            }
            try {
              return u + "";
            } catch {
            }
          }
          return "";
        }
        i.exports = o;
      }), $t = A((e, i) => {
        var r = qt(), s = Le(), o = At(), u = Ii(), h = /[\\^$.*+?()[\]{}|]/g, c = /^\[object .+?Constructor\]$/, p = Function.prototype, f = Object.prototype, C = p.toString, y = f.hasOwnProperty, S = RegExp("^" + C.call(y).replace(h, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
        function D(U) {
          if (!o(U) || s(U)) return false;
          var H = r(U) ? S : c;
          return H.test(u(U));
        }
        i.exports = D;
      }), si = A((e, i) => {
        function r(s, o) {
          return s == null ? void 0 : s[o];
        }
        i.exports = r;
      }), at = A((e, i) => {
        var r = $t(), s = si();
        function o(u, h) {
          var c = s(u, h);
          return r(c) ? c : void 0;
        }
        i.exports = o;
      }), Ke = A((e, i) => {
        var r = at(), s = Ee(), o = r(s, "Map");
        i.exports = o;
      }), st = A((e, i) => {
        var r = at(), s = r(Object, "create");
        i.exports = s;
      }), gt = A((e, i) => {
        var r = st();
        function s() {
          this.__data__ = r ? r(null) : {}, this.size = 0;
        }
        i.exports = s;
      }), Ft = A((e, i) => {
        function r(s) {
          var o = this.has(s) && delete this.__data__[s];
          return this.size -= o ? 1 : 0, o;
        }
        i.exports = r;
      }), Dt = A((e, i) => {
        var r = st(), s = "__lodash_hash_undefined__", o = Object.prototype, u = o.hasOwnProperty;
        function h(c) {
          var p = this.__data__;
          if (r) {
            var f = p[c];
            return f === s ? void 0 : f;
          }
          return u.call(p, c) ? p[c] : void 0;
        }
        i.exports = h;
      }), Et = A((e, i) => {
        var r = st(), s = Object.prototype, o = s.hasOwnProperty;
        function u(h) {
          var c = this.__data__;
          return r ? c[h] !== void 0 : o.call(c, h);
        }
        i.exports = u;
      }), bt = A((e, i) => {
        var r = st(), s = "__lodash_hash_undefined__";
        function o(u, h) {
          var c = this.__data__;
          return this.size += this.has(u) ? 0 : 1, c[u] = r && h === void 0 ? s : h, this;
        }
        i.exports = o;
      }), _t = A((e, i) => {
        var r = gt(), s = Ft(), o = Dt(), u = Et(), h = bt();
        function c(p) {
          var f = -1, C = p == null ? 0 : p.length;
          for (this.clear(); ++f < C; ) {
            var y = p[f];
            this.set(y[0], y[1]);
          }
        }
        c.prototype.clear = r, c.prototype.delete = s, c.prototype.get = o, c.prototype.has = u, c.prototype.set = h, i.exports = c;
      }), be = A((e, i) => {
        var r = _t(), s = ke(), o = Ke();
        function u() {
          this.size = 0, this.__data__ = {
            hash: new r(),
            map: new (o || s)(),
            string: new r()
          };
        }
        i.exports = u;
      }), Be = A((e, i) => {
        function r(s) {
          var o = typeof s;
          return o == "string" || o == "number" || o == "symbol" || o == "boolean" ? s !== "__proto__" : s === null;
        }
        i.exports = r;
      }), zi = A((e, i) => {
        var r = Be();
        function s(o, u) {
          var h = o.__data__;
          return r(u) ? h[typeof u == "string" ? "string" : "hash"] : h.map;
        }
        i.exports = s;
      }), wn = A((e, i) => {
        var r = zi();
        function s(o) {
          var u = r(this, o).delete(o);
          return this.size -= u ? 1 : 0, u;
        }
        i.exports = s;
      }), En = A((e, i) => {
        var r = zi();
        function s(o) {
          return r(this, o).get(o);
        }
        i.exports = s;
      }), Ni = A((e, i) => {
        var r = zi();
        function s(o) {
          return r(this, o).has(o);
        }
        i.exports = s;
      }), Bn = A((e, i) => {
        var r = zi();
        function s(o, u) {
          var h = r(this, o), c = h.size;
          return h.set(o, u), this.size += h.size == c ? 0 : 1, this;
        }
        i.exports = s;
      }), vr = A((e, i) => {
        var r = be(), s = wn(), o = En(), u = Ni(), h = Bn();
        function c(p) {
          var f = -1, C = p == null ? 0 : p.length;
          for (this.clear(); ++f < C; ) {
            var y = p[f];
            this.set(y[0], y[1]);
          }
        }
        c.prototype.clear = r, c.prototype.delete = s, c.prototype.get = o, c.prototype.has = u, c.prototype.set = h, i.exports = c;
      }), Lr = A((e, i) => {
        var r = ke(), s = Ke(), o = vr(), u = 200;
        function h(c, p) {
          var f = this.__data__;
          if (f instanceof r) {
            var C = f.__data__;
            if (!s || C.length < u - 1) return C.push([
              c,
              p
            ]), this.size = ++f.size, this;
            f = this.__data__ = new o(C);
          }
          return f.set(c, p), this.size = f.size, this;
        }
        i.exports = h;
      }), br = A((e, i) => {
        var r = ke(), s = ni(), o = tn(), u = Xt(), h = Ri(), c = Lr();
        function p(f) {
          var C = this.__data__ = new r(f);
          this.size = C.size;
        }
        p.prototype.clear = s, p.prototype.delete = o, p.prototype.get = u, p.prototype.has = h, p.prototype.set = c, i.exports = p;
      }), en = A((e, i) => {
        var r = at(), s = (function() {
          try {
            var o = r(Object, "defineProperty");
            return o({}, "", {}), o;
          } catch {
          }
        })();
        i.exports = s;
      }), gi = A((e, i) => {
        var r = en();
        function s(o, u, h) {
          u == "__proto__" && r ? r(o, u, {
            configurable: true,
            enumerable: true,
            value: h,
            writable: true
          }) : o[u] = h;
        }
        i.exports = s;
      }), xr = A((e, i) => {
        var r = gi(), s = Lt();
        function o(u, h, c) {
          (c !== void 0 && !s(u[h], c) || c === void 0 && !(h in u)) && r(u, h, c);
        }
        i.exports = o;
      }), Cr = A((e, i) => {
        function r(s) {
          return function(o, u, h) {
            for (var c = -1, p = Object(o), f = h(o), C = f.length; C--; ) {
              var y = f[s ? C : ++c];
              if (u(p[y], y, p) === false) break;
            }
            return o;
          };
        }
        i.exports = r;
      }), Pn = A((e, i) => {
        var r = Cr(), s = r();
        i.exports = s;
      }), Mr = A((e, i) => {
        var r = Ee(), s = typeof e == "object" && e && !e.nodeType && e, o = s && typeof i == "object" && i && !i.nodeType && i, u = o && o.exports === s, h = u ? r.Buffer : void 0, c = h ? h.allocUnsafe : void 0;
        function p(f, C) {
          if (C) return f.slice();
          var y = f.length, S = c ? c(y) : new f.constructor(y);
          return f.copy(S), S;
        }
        i.exports = p;
      }), kr = A((e, i) => {
        var r = Ee(), s = r.Uint8Array;
        i.exports = s;
      }), js = A((e, i) => {
        var r = kr();
        function s(o) {
          var u = new o.constructor(o.byteLength);
          return new r(u).set(new r(o)), u;
        }
        i.exports = s;
      }), Zs = A((e, i) => {
        var r = js();
        function s(o, u) {
          var h = u ? r(o.buffer) : o.buffer;
          return new o.constructor(h, o.byteOffset, o.length);
        }
        i.exports = s;
      }), Sn = A((e, i) => {
        function r(s, o) {
          var u = -1, h = s.length;
          for (o || (o = Array(h)); ++u < h; ) o[u] = s[u];
          return o;
        }
        i.exports = r;
      }), wr = A((e, i) => {
        var r = At(), s = Object.create, o = /* @__PURE__ */ (function() {
          function u() {
          }
          return function(h) {
            if (!r(h)) return {};
            if (s) return s(h);
            u.prototype = h;
            var c = new u();
            return u.prototype = void 0, c;
          };
        })();
        i.exports = o;
      }), Er = A((e, i) => {
        function r(s, o) {
          return function(u) {
            return s(o(u));
          };
        }
        i.exports = r;
      }), Br = A((e, i) => {
        var r = Er(), s = r(Object.getPrototypeOf, Object);
        i.exports = s;
      }), Dn = A((e, i) => {
        var r = Object.prototype;
        function s(o) {
          var u = o && o.constructor, h = typeof u == "function" && u.prototype || r;
          return o === h;
        }
        i.exports = s;
      }), Pr = A((e, i) => {
        var r = wr(), s = Br(), o = Dn();
        function u(h) {
          return typeof h.constructor == "function" && !o(h) ? r(s(h)) : {};
        }
        i.exports = u;
      }), yi = A((e, i) => {
        function r(s) {
          return s != null && typeof s == "object";
        }
        i.exports = r;
      }), Sr = A((e, i) => {
        var r = ne(), s = yi(), o = "[object Arguments]";
        function u(h) {
          return s(h) && r(h) == o;
        }
        i.exports = u;
      }), nn = A((e, i) => {
        var r = Sr(), s = yi(), o = Object.prototype, u = o.hasOwnProperty, h = o.propertyIsEnumerable, c = r(/* @__PURE__ */ (function() {
          return arguments;
        })()) ? r : function(p) {
          return s(p) && u.call(p, "callee") && !h.call(p, "callee");
        };
        i.exports = c;
      }), vi = A((e, i) => {
        var r = Array.isArray;
        i.exports = r;
      }), Dr = A((e, i) => {
        var r = 9007199254740991;
        function s(o) {
          return typeof o == "number" && o > -1 && o % 1 == 0 && o <= r;
        }
        i.exports = s;
      }), ai = A((e, i) => {
        var r = qt(), s = Dr();
        function o(u) {
          return u != null && s(u.length) && !r(u);
        }
        i.exports = o;
      }), Us = A((e, i) => {
        var r = ai(), s = yi();
        function o(u) {
          return s(u) && r(u);
        }
        i.exports = o;
      }), Vs = A((e, i) => {
        function r() {
          return false;
        }
        i.exports = r;
      }), An = A((e, i) => {
        var r = Ee(), s = Vs(), o = typeof e == "object" && e && !e.nodeType && e, u = o && typeof i == "object" && i && !i.nodeType && i, h = u && u.exports === o, c = h ? r.Buffer : void 0, p = c ? c.isBuffer : void 0, f = p || s;
        i.exports = f;
      }), Ar = A((e, i) => {
        var r = ne(), s = Br(), o = yi(), u = "[object Object]", h = Function.prototype, c = Object.prototype, p = h.toString, f = c.hasOwnProperty, C = p.call(Object);
        function y(S) {
          if (!o(S) || r(S) != u) return false;
          var D = s(S);
          if (D === null) return true;
          var U = f.call(D, "constructor") && D.constructor;
          return typeof U == "function" && U instanceof U && p.call(U) == C;
        }
        i.exports = y;
      }), Tr = A((e, i) => {
        var r = ne(), s = Dr(), o = yi(), u = "[object Arguments]", h = "[object Array]", c = "[object Boolean]", p = "[object Date]", f = "[object Error]", C = "[object Function]", y = "[object Map]", S = "[object Number]", D = "[object Object]", U = "[object RegExp]", H = "[object Set]", X = "[object String]", Q = "[object WeakMap]", x = "[object ArrayBuffer]", R = "[object DataView]", Z = "[object Float32Array]", Y = "[object Float64Array]", W = "[object Int8Array]", J = "[object Int16Array]", m = "[object Int32Array]", g = "[object Uint8Array]", b = "[object Uint8ClampedArray]", B = "[object Uint16Array]", E = "[object Uint32Array]", k = {};
        k[Z] = k[Y] = k[W] = k[J] = k[m] = k[g] = k[b] = k[B] = k[E] = true, k[u] = k[h] = k[x] = k[c] = k[R] = k[p] = k[f] = k[C] = k[y] = k[S] = k[D] = k[U] = k[H] = k[X] = k[Q] = false;
        function F(P) {
          return o(P) && s(P.length) && !!k[r(P)];
        }
        i.exports = F;
      }), Hs = A((e, i) => {
        function r(s) {
          return function(o) {
            return s(o);
          };
        }
        i.exports = r;
      }), Ks = A((e, i) => {
        var r = we(), s = typeof e == "object" && e && !e.nodeType && e, o = s && typeof i == "object" && i && !i.nodeType && i, u = o && o.exports === s, h = u && r.process, c = (function() {
          try {
            var p = o && o.require && o.require("util").types;
            return p || h && h.binding && h.binding("util");
          } catch {
          }
        })();
        i.exports = c;
      }), Or = A((e, i) => {
        var r = Tr(), s = Hs(), o = Ks(), u = o && o.isTypedArray, h = u ? s(u) : r;
        i.exports = h;
      }), Rr = A((e, i) => {
        function r(s, o) {
          if (!(o === "constructor" && typeof s[o] == "function") && o != "__proto__") return s[o];
        }
        i.exports = r;
      }), qs = A((e, i) => {
        var r = gi(), s = Lt(), o = Object.prototype, u = o.hasOwnProperty;
        function h(c, p, f) {
          var C = c[p];
          (!(u.call(c, p) && s(C, f)) || f === void 0 && !(p in c)) && r(c, p, f);
        }
        i.exports = h;
      }), Ws = A((e, i) => {
        var r = qs(), s = gi();
        function o(u, h, c, p) {
          var f = !c;
          c || (c = {});
          for (var C = -1, y = h.length; ++C < y; ) {
            var S = h[C], D = p ? p(c[S], u[S], S, c, u) : void 0;
            D === void 0 && (D = u[S]), f ? s(c, S, D) : r(c, S, D);
          }
          return c;
        }
        i.exports = o;
      }), Tn = A((e, i) => {
        function r(s, o) {
          for (var u = -1, h = Array(s); ++u < s; ) h[u] = o(u);
          return h;
        }
        i.exports = r;
      }), Fr = A((e, i) => {
        var r = 9007199254740991, s = /^(?:0|[1-9]\d*)$/;
        function o(u, h) {
          var c = typeof u;
          return h = h ?? r, !!h && (c == "number" || c != "symbol" && s.test(u)) && u > -1 && u % 1 == 0 && u < h;
        }
        i.exports = o;
      }), Js = A((e, i) => {
        var r = Tn(), s = nn(), o = vi(), u = An(), h = Fr(), c = Or(), p = Object.prototype, f = p.hasOwnProperty;
        function C(y, S) {
          var D = o(y), U = !D && s(y), H = !D && !U && u(y), X = !D && !U && !H && c(y), Q = D || U || H || X, x = Q ? r(y.length, String) : [], R = x.length;
          for (var Z in y) (S || f.call(y, Z)) && !(Q && (Z == "length" || H && (Z == "offset" || Z == "parent") || X && (Z == "buffer" || Z == "byteLength" || Z == "byteOffset") || h(Z, R))) && x.push(Z);
          return x;
        }
        i.exports = C;
      }), Ys = A((e, i) => {
        function r(s) {
          var o = [];
          if (s != null) for (var u in Object(s)) o.push(u);
          return o;
        }
        i.exports = r;
      }), Xs = A((e, i) => {
        var r = At(), s = Dn(), o = Ys(), u = Object.prototype, h = u.hasOwnProperty;
        function c(p) {
          if (!r(p)) return o(p);
          var f = s(p), C = [];
          for (var y in p) y == "constructor" && (f || !h.call(p, y)) || C.push(y);
          return C;
        }
        i.exports = c;
      }), xe = A((e, i) => {
        var r = Js(), s = Xs(), o = ai();
        function u(h) {
          return o(h) ? r(h, true) : s(h);
        }
        i.exports = u;
      }), rt = A((e, i) => {
        var r = Ws(), s = xe();
        function o(u) {
          return r(u, s(u));
        }
        i.exports = o;
      }), Ir = A((e, i) => {
        var r = xr(), s = Mr(), o = Zs(), u = Sn(), h = Pr(), c = nn(), p = vi(), f = Us(), C = An(), y = qt(), S = At(), D = Ar(), U = Or(), H = Rr(), X = rt();
        function Q(x, R, Z, Y, W, J, m) {
          var g = H(x, Z), b = H(R, Z), B = m.get(b);
          if (B) {
            r(x, Z, B);
            return;
          }
          var E = J ? J(g, b, Z + "", x, R, m) : void 0, k = E === void 0;
          if (k) {
            var F = p(b), P = !F && C(b), O = !F && !P && U(b);
            E = b, F || P || O ? p(g) ? E = g : f(g) ? E = u(g) : P ? (k = false, E = s(b, true)) : O ? (k = false, E = o(b, true)) : E = [] : D(b) || c(b) ? (E = g, c(g) ? E = X(g) : (!S(g) || y(g)) && (E = h(b))) : k = false;
          }
          k && (m.set(b, E), W(E, b, Y, J, m), m.delete(b)), r(x, Z, E);
        }
        i.exports = Q;
      }), zr = A((e, i) => {
        var r = br(), s = xr(), o = Pn(), u = Ir(), h = At(), c = xe(), p = Rr();
        function f(C, y, S, D, U) {
          C !== y && o(y, function(H, X) {
            if (U || (U = new r()), h(H)) u(C, y, X, S, f, D, U);
            else {
              var Q = D ? D(p(C, X), H, X + "", C, y, U) : void 0;
              Q === void 0 && (Q = H), s(C, X, Q);
            }
          }, c);
        }
        i.exports = f;
      }), On = A((e, i) => {
        function r(s) {
          return s;
        }
        i.exports = r;
      }), Nr = A((e, i) => {
        function r(s, o, u) {
          switch (u.length) {
            case 0:
              return s.call(o);
            case 1:
              return s.call(o, u[0]);
            case 2:
              return s.call(o, u[0], u[1]);
            case 3:
              return s.call(o, u[0], u[1], u[2]);
          }
          return s.apply(o, u);
        }
        i.exports = r;
      }), Rn = A((e, i) => {
        var r = Nr(), s = Math.max;
        function o(u, h, c) {
          return h = s(h === void 0 ? u.length - 1 : h, 0), function() {
            for (var p = arguments, f = -1, C = s(p.length - h, 0), y = Array(C); ++f < C; ) y[f] = p[h + f];
            f = -1;
            for (var S = Array(h + 1); ++f < h; ) S[f] = p[f];
            return S[h] = c(y), r(u, this, S);
          };
        }
        i.exports = o;
      }), Gr = A((e, i) => {
        function r(s) {
          return function() {
            return s;
          };
        }
        i.exports = r;
      }), Li = A((e, i) => {
        var r = Gr(), s = en(), o = On(), u = s ? function(h, c) {
          return s(h, "toString", {
            configurable: true,
            enumerable: false,
            value: r(c),
            writable: true
          });
        } : o;
        i.exports = u;
      }), jr = A((e, i) => {
        var r = 800, s = 16, o = Date.now;
        function u(h) {
          var c = 0, p = 0;
          return function() {
            var f = o(), C = s - (f - p);
            if (p = f, C > 0) {
              if (++c >= r) return arguments[0];
            } else c = 0;
            return h.apply(void 0, arguments);
          };
        }
        i.exports = u;
      }), $s = A((e, i) => {
        var r = Li(), s = jr(), o = s(r);
        i.exports = o;
      }), Qs = A((e, i) => {
        var r = On(), s = Rn(), o = $s();
        function u(h, c) {
          return o(s(h, c, r), h + "");
        }
        i.exports = u;
      }), ta = A((e, i) => {
        var r = Lt(), s = ai(), o = Fr(), u = At();
        function h(c, p, f) {
          if (!u(f)) return false;
          var C = typeof p;
          return (C == "number" ? s(f) && o(p, f.length) : C == "string" && p in f) ? r(f[p], c) : false;
        }
        i.exports = h;
      }), ea = A((e, i) => {
        var r = Qs(), s = ta();
        function o(u) {
          return r(function(h, c) {
            var p = -1, f = c.length, C = f > 1 ? c[f - 1] : void 0, y = f > 2 ? c[2] : void 0;
            for (C = u.length > 3 && typeof C == "function" ? (f--, C) : void 0, y && s(c[0], c[1], y) && (C = f < 3 ? void 0 : C, f = 1), h = Object(h); ++p < f; ) {
              var S = c[p];
              S && u(h, S, p, C);
            }
            return h;
          });
        }
        i.exports = o;
      }), rn = A((e, i) => {
        var r = zr(), s = ea(), o = s(function(u, h, c) {
          r(u, h, c);
        });
        i.exports = o;
      }), Fn = A((e, i) => {
        var r = ne(), s = yi(), o = "[object Symbol]";
        function u(h) {
          return typeof h == "symbol" || s(h) && r(h) == o;
        }
        i.exports = u;
      }), sn = A((e, i) => {
        var r = vi(), s = Fn(), o = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, u = /^\w*$/;
        function h(c, p) {
          if (r(c)) return false;
          var f = typeof c;
          return f == "number" || f == "symbol" || f == "boolean" || c == null || s(c) ? true : u.test(c) || !o.test(c) || p != null && c in Object(p);
        }
        i.exports = h;
      }), ia = A((e, i) => {
        var r = vr(), s = "Expected a function";
        function o(u, h) {
          if (typeof u != "function" || h != null && typeof h != "function") throw new TypeError(s);
          var c = function() {
            var p = arguments, f = h ? h.apply(this, p) : p[0], C = c.cache;
            if (C.has(f)) return C.get(f);
            var y = u.apply(this, p);
            return c.cache = C.set(f, y) || C, y;
          };
          return c.cache = new (o.Cache || r)(), c;
        }
        o.Cache = r, i.exports = o;
      }), na = A((e, i) => {
        var r = ia(), s = 500;
        function o(u) {
          var h = r(u, function(p) {
            return c.size === s && c.clear(), p;
          }), c = h.cache;
          return h;
        }
        i.exports = o;
      }), ra = A((e, i) => {
        var r = na(), s = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, o = /\\(\\)?/g, u = r(function(h) {
          var c = [];
          return h.charCodeAt(0) === 46 && c.push(""), h.replace(s, function(p, f, C, y) {
            c.push(C ? y.replace(o, "$1") : f || p);
          }), c;
        });
        i.exports = u;
      }), sa = A((e, i) => {
        function r(s, o) {
          for (var u = -1, h = s == null ? 0 : s.length, c = Array(h); ++u < h; ) c[u] = o(s[u], u, s);
          return c;
        }
        i.exports = r;
      }), aa = A((e, i) => {
        var r = Ne(), s = sa(), o = vi(), u = Fn(), h = r ? r.prototype : void 0, c = h ? h.toString : void 0;
        function p(f) {
          if (typeof f == "string") return f;
          if (o(f)) return s(f, p) + "";
          if (u(f)) return c ? c.call(f) : "";
          var C = f + "";
          return C == "0" && 1 / f == -1 / 0 ? "-0" : C;
        }
        i.exports = p;
      }), In = A((e, i) => {
        var r = aa();
        function s(o) {
          return o == null ? "" : r(o);
        }
        i.exports = s;
      }), Gi = A((e, i) => {
        var r = vi(), s = sn(), o = ra(), u = In();
        function h(c, p) {
          return r(c) ? c : s(c, p) ? [
            c
          ] : o(u(c));
        }
        i.exports = h;
      }), Zr = A((e, i) => {
        var r = Fn();
        function s(o) {
          if (typeof o == "string" || r(o)) return o;
          var u = o + "";
          return u == "0" && 1 / o == -1 / 0 ? "-0" : u;
        }
        i.exports = s;
      }), Ur = A((e, i) => {
        var r = Gi(), s = Zr();
        function o(u, h) {
          h = r(h, u);
          for (var c = 0, p = h.length; u != null && c < p; ) u = u[s(h[c++])];
          return c && c == p ? u : void 0;
        }
        i.exports = o;
      }), qe = A((e, i) => {
        var r = Ur();
        function s(o, u, h) {
          var c = o == null ? void 0 : r(o, u);
          return c === void 0 ? h : c;
        }
        i.exports = s;
      }), xt = A((e, i) => {
        (function(r, s) {
          typeof e == "object" && typeof i < "u" ? i.exports = s() : (r = r || self).RBush = s();
        })(e, function() {
          function r(x, R, Z, Y, W) {
            (function J(m, g, b, B, E) {
              for (; B > b; ) {
                if (B - b > 600) {
                  var k = B - b + 1, F = g - b + 1, P = Math.log(k), O = 0.5 * Math.exp(2 * P / 3), N = 0.5 * Math.sqrt(P * O * (k - O) / k) * (F - k / 2 < 0 ? -1 : 1), z = Math.max(b, Math.floor(g - F * O / k + N)), K = Math.min(B, Math.floor(g + (k - F) * O / k + N));
                  J(m, g, z, K, E);
                }
                var it = m[g], nt = b, ct = B;
                for (s(m, b, g), E(m[B], it) > 0 && s(m, b, B); nt < ct; ) {
                  for (s(m, nt, ct), nt++, ct--; E(m[nt], it) < 0; ) nt++;
                  for (; E(m[ct], it) > 0; ) ct--;
                }
                E(m[b], it) === 0 ? s(m, b, ct) : s(m, ++ct, B), ct <= g && (b = ct + 1), g <= ct && (B = ct - 1);
              }
            })(x, R, Z || 0, Y || x.length - 1, W || o);
          }
          function s(x, R, Z) {
            var Y = x[R];
            x[R] = x[Z], x[Z] = Y;
          }
          function o(x, R) {
            return x < R ? -1 : x > R ? 1 : 0;
          }
          var u = function(x) {
            x === void 0 && (x = 9), this._maxEntries = Math.max(4, x), this._minEntries = Math.max(2, Math.ceil(0.4 * this._maxEntries)), this.clear();
          };
          function h(x, R, Z) {
            if (!Z) return R.indexOf(x);
            for (var Y = 0; Y < R.length; Y++) if (Z(x, R[Y])) return Y;
            return -1;
          }
          function c(x, R) {
            p(x, 0, x.children.length, R, x);
          }
          function p(x, R, Z, Y, W) {
            W || (W = X(null)), W.minX = 1 / 0, W.minY = 1 / 0, W.maxX = -1 / 0, W.maxY = -1 / 0;
            for (var J = R; J < Z; J++) {
              var m = x.children[J];
              f(W, x.leaf ? Y(m) : m);
            }
            return W;
          }
          function f(x, R) {
            return x.minX = Math.min(x.minX, R.minX), x.minY = Math.min(x.minY, R.minY), x.maxX = Math.max(x.maxX, R.maxX), x.maxY = Math.max(x.maxY, R.maxY), x;
          }
          function C(x, R) {
            return x.minX - R.minX;
          }
          function y(x, R) {
            return x.minY - R.minY;
          }
          function S(x) {
            return (x.maxX - x.minX) * (x.maxY - x.minY);
          }
          function D(x) {
            return x.maxX - x.minX + (x.maxY - x.minY);
          }
          function U(x, R) {
            return x.minX <= R.minX && x.minY <= R.minY && R.maxX <= x.maxX && R.maxY <= x.maxY;
          }
          function H(x, R) {
            return R.minX <= x.maxX && R.minY <= x.maxY && R.maxX >= x.minX && R.maxY >= x.minY;
          }
          function X(x) {
            return {
              children: x,
              height: 1,
              leaf: true,
              minX: 1 / 0,
              minY: 1 / 0,
              maxX: -1 / 0,
              maxY: -1 / 0
            };
          }
          function Q(x, R, Z, Y, W) {
            for (var J = [
              R,
              Z
            ]; J.length; ) if (!((Z = J.pop()) - (R = J.pop()) <= Y)) {
              var m = R + Math.ceil((Z - R) / Y / 2) * Y;
              r(x, m, R, Z, W), J.push(R, m, m, Z);
            }
          }
          return u.prototype.all = function() {
            return this._all(this.data, []);
          }, u.prototype.search = function(x) {
            var R = this.data, Z = [];
            if (!H(x, R)) return Z;
            for (var Y = this.toBBox, W = []; R; ) {
              for (var J = 0; J < R.children.length; J++) {
                var m = R.children[J], g = R.leaf ? Y(m) : m;
                H(x, g) && (R.leaf ? Z.push(m) : U(x, g) ? this._all(m, Z) : W.push(m));
              }
              R = W.pop();
            }
            return Z;
          }, u.prototype.collides = function(x) {
            var R = this.data;
            if (!H(x, R)) return false;
            for (var Z = []; R; ) {
              for (var Y = 0; Y < R.children.length; Y++) {
                var W = R.children[Y], J = R.leaf ? this.toBBox(W) : W;
                if (H(x, J)) {
                  if (R.leaf || U(x, J)) return true;
                  Z.push(W);
                }
              }
              R = Z.pop();
            }
            return false;
          }, u.prototype.load = function(x) {
            if (!x || !x.length) return this;
            if (x.length < this._minEntries) {
              for (var R = 0; R < x.length; R++) this.insert(x[R]);
              return this;
            }
            var Z = this._build(x.slice(), 0, x.length - 1, 0);
            if (this.data.children.length) if (this.data.height === Z.height) this._splitRoot(this.data, Z);
            else {
              if (this.data.height < Z.height) {
                var Y = this.data;
                this.data = Z, Z = Y;
              }
              this._insert(Z, this.data.height - Z.height - 1, true);
            }
            else this.data = Z;
            return this;
          }, u.prototype.insert = function(x) {
            return x && this._insert(x, this.data.height - 1), this;
          }, u.prototype.clear = function() {
            return this.data = X([]), this;
          }, u.prototype.remove = function(x, R) {
            if (!x) return this;
            for (var Z, Y, W, J = this.data, m = this.toBBox(x), g = [], b = []; J || g.length; ) {
              if (J || (J = g.pop(), Y = g[g.length - 1], Z = b.pop(), W = true), J.leaf) {
                var B = h(x, J.children, R);
                if (B !== -1) return J.children.splice(B, 1), g.push(J), this._condense(g), this;
              }
              W || J.leaf || !U(J, m) ? Y ? (Z++, J = Y.children[Z], W = false) : J = null : (g.push(J), b.push(Z), Z = 0, Y = J, J = J.children[0]);
            }
            return this;
          }, u.prototype.toBBox = function(x) {
            return x;
          }, u.prototype.compareMinX = function(x, R) {
            return x.minX - R.minX;
          }, u.prototype.compareMinY = function(x, R) {
            return x.minY - R.minY;
          }, u.prototype.toJSON = function() {
            return this.data;
          }, u.prototype.fromJSON = function(x) {
            return this.data = x, this;
          }, u.prototype._all = function(x, R) {
            for (var Z = []; x; ) x.leaf ? R.push.apply(R, x.children) : Z.push.apply(Z, x.children), x = Z.pop();
            return R;
          }, u.prototype._build = function(x, R, Z, Y) {
            var W, J = Z - R + 1, m = this._maxEntries;
            if (J <= m) return c(W = X(x.slice(R, Z + 1)), this.toBBox), W;
            Y || (Y = Math.ceil(Math.log(J) / Math.log(m)), m = Math.ceil(J / Math.pow(m, Y - 1))), (W = X([])).leaf = false, W.height = Y;
            var g = Math.ceil(J / m), b = g * Math.ceil(Math.sqrt(m));
            Q(x, R, Z, b, this.compareMinX);
            for (var B = R; B <= Z; B += b) {
              var E = Math.min(B + b - 1, Z);
              Q(x, B, E, g, this.compareMinY);
              for (var k = B; k <= E; k += g) {
                var F = Math.min(k + g - 1, E);
                W.children.push(this._build(x, k, F, Y - 1));
              }
            }
            return c(W, this.toBBox), W;
          }, u.prototype._chooseSubtree = function(x, R, Z, Y) {
            for (; Y.push(R), !R.leaf && Y.length - 1 !== Z; ) {
              for (var W = 1 / 0, J = 1 / 0, m = void 0, g = 0; g < R.children.length; g++) {
                var b = R.children[g], B = S(b), E = (k = x, F = b, (Math.max(F.maxX, k.maxX) - Math.min(F.minX, k.minX)) * (Math.max(F.maxY, k.maxY) - Math.min(F.minY, k.minY)) - B);
                E < J ? (J = E, W = B < W ? B : W, m = b) : E === J && B < W && (W = B, m = b);
              }
              R = m || R.children[0];
            }
            var k, F;
            return R;
          }, u.prototype._insert = function(x, R, Z) {
            var Y = Z ? x : this.toBBox(x), W = [], J = this._chooseSubtree(Y, this.data, R, W);
            for (J.children.push(x), f(J, Y); R >= 0 && W[R].children.length > this._maxEntries; ) this._split(W, R), R--;
            this._adjustParentBBoxes(Y, W, R);
          }, u.prototype._split = function(x, R) {
            var Z = x[R], Y = Z.children.length, W = this._minEntries;
            this._chooseSplitAxis(Z, W, Y);
            var J = this._chooseSplitIndex(Z, W, Y), m = X(Z.children.splice(J, Z.children.length - J));
            m.height = Z.height, m.leaf = Z.leaf, c(Z, this.toBBox), c(m, this.toBBox), R ? x[R - 1].children.push(m) : this._splitRoot(Z, m);
          }, u.prototype._splitRoot = function(x, R) {
            this.data = X([
              x,
              R
            ]), this.data.height = x.height + 1, this.data.leaf = false, c(this.data, this.toBBox);
          }, u.prototype._chooseSplitIndex = function(x, R, Z) {
            for (var Y, W, J, m, g, b, B, E = 1 / 0, k = 1 / 0, F = R; F <= Z - R; F++) {
              var P = p(x, 0, F, this.toBBox), O = p(x, F, Z, this.toBBox), N = (W = P, J = O, m = void 0, g = void 0, b = void 0, B = void 0, m = Math.max(W.minX, J.minX), g = Math.max(W.minY, J.minY), b = Math.min(W.maxX, J.maxX), B = Math.min(W.maxY, J.maxY), Math.max(0, b - m) * Math.max(0, B - g)), z = S(P) + S(O);
              N < E ? (E = N, Y = F, k = z < k ? z : k) : N === E && z < k && (k = z, Y = F);
            }
            return Y || Z - R;
          }, u.prototype._chooseSplitAxis = function(x, R, Z) {
            var Y = x.leaf ? this.compareMinX : C, W = x.leaf ? this.compareMinY : y;
            this._allDistMargin(x, R, Z, Y) < this._allDistMargin(x, R, Z, W) && x.children.sort(Y);
          }, u.prototype._allDistMargin = function(x, R, Z, Y) {
            x.children.sort(Y);
            for (var W = this.toBBox, J = p(x, 0, R, W), m = p(x, Z - R, Z, W), g = D(J) + D(m), b = R; b < Z - R; b++) {
              var B = x.children[b];
              f(J, x.leaf ? W(B) : B), g += D(J);
            }
            for (var E = Z - R - 1; E >= R; E--) {
              var k = x.children[E];
              f(m, x.leaf ? W(k) : k), g += D(m);
            }
            return g;
          }, u.prototype._adjustParentBBoxes = function(x, R, Z) {
            for (var Y = Z; Y >= 0; Y--) f(R[Y], x);
          }, u.prototype._condense = function(x) {
            for (var R = x.length - 1, Z = void 0; R >= 0; R--) x[R].children.length === 0 ? R > 0 ? (Z = x[R - 1].children).splice(Z.indexOf(x[R]), 1) : this.clear() : c(x[R], this.toBBox);
          }, u;
        });
      });
      Array.prototype.findIndex = Array.prototype.findIndex || function(e) {
        if (this === null) throw new TypeError("Array.prototype.findIndex called on null or undefined");
        if (typeof e != "function") throw new TypeError("callback must be a function");
        for (var i = Object(this), r = i.length >>> 0, s = arguments[1], o = 0; o < r; o++) if (e.call(s, i[o], o, i)) return o;
        return -1;
      }, Array.prototype.find = Array.prototype.find || function(e) {
        if (this === null) throw new TypeError("Array.prototype.find called on null or undefined");
        if (typeof e != "function") throw new TypeError("callback must be a function");
        for (var i = Object(this), r = i.length >>> 0, s = arguments[1], o = 0; o < r; o++) {
          var u = i[o];
          if (e.call(s, u, o, i)) return u;
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
          var o = i | 0, u = Math.max(o >= 0 ? o : s - Math.abs(o), 0);
          function h(c, p) {
            return c === p || typeof c == "number" && typeof p == "number" && isNaN(c) && isNaN(p);
          }
          for (; u < s; ) {
            if (h(r[u], e)) return true;
            u++;
          }
          return false;
        }
      });
      var Tt = {
        version: "2.19.2"
      }, ji = et(rn()), bi = {
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
      }, xi = {
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
      }, zn = {
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
      }, ft = {
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
      }, It = {
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
      }, Nn = {
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
      }, an = {
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
      }, de = {
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
      }, oa = {
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
      }, on = {
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
      }, oi = {
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
      }, Nt = {
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
      }, We = {
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
      }, Zi = {
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
      }, Ui = {
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
      }, Gn = {
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
      }, Vi = {
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
      }, jn = {
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
      }, Zn = {
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
      }, un = {
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
      }, Un = {
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
      }, Vn = {
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
      }, ln = {
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
      }, Vr = {
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
      }, Hn = {
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
      }, ua = {
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
      }, ht = {
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
      }, Pe = We, Mt = {
        en: bi,
        de: xi,
        it: zn,
        id: ft,
        ro: It,
        ru: Nn,
        es: an,
        nl: de,
        fr: oa,
        pt: Pe,
        pt_br: Nt,
        pt_pt: We,
        zh: on,
        zh_tw: oi,
        pl: Zi,
        sv: Ui,
        el: Gn,
        hu: Vi,
        da: jn,
        no: Zn,
        fa: un,
        ua: Un,
        tr: Vn,
        cz: ln,
        ja: Vr,
        fi: Hn,
        ko: ua,
        ky: ht
      }, Hr = {
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
      }, Kn = Hr, qn = {
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
      }, Wn = qn, ui = {
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
      }, Jn = ui, Hi = {
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
      }, Ht = Hi, li = et(rn()), Kr = {
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
        _fireCut(e, i, r, s = "Draw", o = {}) {
          this.__fire(e, "pm:cut", {
            shape: this._shape,
            layer: i,
            originalLayer: r
          }, s, o);
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
        _fireMarkerDragEnd(e, i = void 0, r = void 0, s = "Edit", o = {}) {
          this.__fire(this._layer, "pm:markerdragend", {
            layer: this._layer,
            markerEvent: e,
            shape: this.getShape(),
            indexPath: i,
            intersectionReset: r
          }, s, o);
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
        _fireVertexAdded(e, i, r, s = "Edit", o = {}) {
          this.__fire(this._layer, "pm:vertexadded", {
            layer: this._layer,
            workingLayer: this._layer,
            marker: e,
            indexPath: i,
            latlng: r,
            shape: this.getShape()
          }, s, o);
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
        _fireRotation(e, i, r, s = this._rotationLayer, o = "Rotation", u = {}) {
          this.__fire(e, "pm:rotate", {
            layer: s,
            helpLayer: this._layer,
            startAngle: this._startAngle,
            angle: s.pm.getAngle(),
            angleDiff: i,
            oldLatLngs: r,
            newLatLngs: s.getLatLngs()
          }, o, u);
        },
        _fireRotationEnd(e, i, r, s = "Rotation", o = {}) {
          this.__fire(e, "pm:rotateend", {
            layer: this._rotationLayer,
            helpLayer: this._layer,
            startAngle: i,
            angle: this._rotationLayer.pm.getAngle(),
            originLatLngs: r,
            newLatLngs: this._rotationLayer.getLatLngs()
          }, s, o);
        },
        _fireActionClick(e, i, r, s = "Toolbar", o = {}) {
          this.__fire(this._map, "pm:actionclick", {
            text: e.text,
            action: e,
            btnName: i,
            button: r
          }, s, o);
        },
        _fireButtonClick(e, i, r = "Toolbar", s = {}) {
          this.__fire(this._map, "pm:buttonclick", {
            btnName: e,
            button: i
          }, r, s);
        },
        _fireLangChange(e, i, r, s, o = "Global", u = {}) {
          this.__fire(this.map, "pm:langchange", {
            oldLang: e,
            activeLang: i,
            fallback: r,
            translations: s
          }, o, u);
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
        _fireKeyeventEvent(e, i, r, s = "Global", o = {}) {
          this.__fire(this.map, "pm:keyevent", {
            event: e,
            eventType: i,
            focusOn: r
          }, s, o);
        },
        __fire(e, i, r, s, o = {}) {
          r = (0, li.default)(r, o, {
            source: s
          }), L.PM.Utils._fireEvent(e, i, r);
        }
      }, Ki = Kr, la = () => ({
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
      }), qr = la, hn = et(qe());
      function vt(e) {
        let i = L.PM.activeLang;
        return (0, hn.default)(Mt[i], e) || (0, hn.default)(Mt.en, e) || e;
      }
      function Wr() {
        return window.matchMedia ? !window.matchMedia("(pointer: coarse)").matches : true;
      }
      function yt(e) {
        for (let i = 0; i < e.length; i += 1) {
          let r = e[i];
          if (Array.isArray(r)) {
            if (yt(r)) return true;
          } else if (r != null && r !== "") return true;
        }
        return false;
      }
      function cn(e) {
        return e.reduce((i, r) => {
          if (r.length !== 0) {
            let s = Array.isArray(r) ? cn(r) : r;
            Array.isArray(s) ? s.length !== 0 && i.push(s) : i.push(s);
          }
          return i;
        }, []);
      }
      function Ce(e, i, r) {
        let s = {
          a: L.CRS.Earth.R,
          b: 63567523142e-4,
          f: 0.0033528106647474805
        }, { a: o, b: u, f: h } = s, c = e.lng, p = e.lat, f = r, C = Math.PI, y = i * C / 180, S = Math.sin(y), D = Math.cos(y), U = (1 - h) * Math.tan(p * C / 180), H = 1 / Math.sqrt(1 + U * U), X = U * H, Q = Math.atan2(U, D), x = H * S, R = 1 - x * x, Z = R * (o * o - u * u) / (u * u), Y = 1 + Z / 16384 * (4096 + Z * (-768 + Z * (320 - 175 * Z))), W = Z / 1024 * (256 + Z * (-128 + Z * (74 - 47 * Z))), J = f / (u * Y), m = 2 * Math.PI, g, b, B;
        for (; Math.abs(J - m) > 1e-12; ) {
          g = Math.cos(2 * Q + J), b = Math.sin(J), B = Math.cos(J);
          let K = W * b * (g + W / 4 * (B * (-1 + 2 * g * g) - W / 6 * g * (-3 + 4 * b * b) * (-3 + 4 * g * g)));
          m = J, J = f / (u * Y) + K;
        }
        let E = X * b - H * B * D, k = Math.atan2(X * B + H * b * D, (1 - h) * Math.sqrt(x * x + E * E)), F = Math.atan2(b * S, H * B - X * b * D), P = h / 16 * R * (4 + h * (4 - 3 * R)), O = F - (1 - P) * h * x * (J + P * b * (g + P * B * (-1 + 2 * g * g))), N = c + O * 180 / C, z = k * 180 / C;
        return L.latLng(N, z);
      }
      function Ci(e, i, r, s, o = true) {
        let u, h, c, p = [];
        for (let f = 0; f < r; f += 1) {
          if (o) u = f * 360 / r + s, h = Ce(e, u, i), c = L.latLng(h.lng, h.lat);
          else {
            let C = e.lat + Math.cos(2 * f * Math.PI / r) * i, y = e.lng + Math.sin(2 * f * Math.PI / r) * i;
            c = L.latLng(C, y);
          }
          p.push(c);
        }
        return p;
      }
      function Jr(e, i, r) {
        i = (i + 360) % 360;
        let s = Math.PI / 180, o = 180 / Math.PI, { R: u } = L.CRS.Earth, h = e.lng * s, c = e.lat * s, p = i * s, f = Math.sin(c), C = Math.cos(c), y = Math.cos(r / u), S = Math.sin(r / u), D = Math.asin(f * y + C * S * Math.cos(p)), U = h + Math.atan2(Math.sin(p) * S * C, y - f * Math.sin(D));
        U *= o;
        let H = U - 360, X = U < -180 ? U + 360 : U;
        return U = U > 180 ? H : X, L.latLng([
          D * o,
          U
        ]);
      }
      function Yn(e, i, r) {
        let s = e.latLngToContainerPoint(i), o = e.latLngToContainerPoint(r), u = Math.atan2(o.y - s.y, o.x - s.x) * 180 / Math.PI + 90;
        return u += u < 0 ? 360 : 0, u;
      }
      function Mi(e, i, r, s) {
        let o = Yn(e, i, r);
        return Jr(i, o, s);
      }
      function ha(e, i, r = "asc") {
        if (!i || Object.keys(i).length === 0) return (p, f) => p - f;
        let s = Object.keys(i), o, u = s.length - 1, h = {};
        for (; u >= 0; ) o = s[u], h[o.toLowerCase()] = i[o], u -= 1;
        function c(p) {
          if (p instanceof L.Marker) return "Marker";
          if (p instanceof L.Circle) return "Circle";
          if (p instanceof L.CircleMarker) return "CircleMarker";
          if (p instanceof L.Rectangle) return "Rectangle";
          if (p instanceof L.Polygon) return "Polygon";
          if (p instanceof L.Polyline) return "Line";
        }
        return (p, f) => {
          let C, y;
          if (C = c(p.layer).toLowerCase(), y = c(f.layer).toLowerCase(), !C || !y) return 0;
          let S = C in h ? h[C] : Number.MAX_SAFE_INTEGER, D = y in h ? h[y] : Number.MAX_SAFE_INTEGER, U = 0;
          return S < D ? U = -1 : S > D && (U = 1), r === "desc" ? U * -1 : U;
        };
      }
      function Ge(e, i = e.getLatLngs()) {
        return e instanceof L.Polygon ? L.polygon(i).getLatLngs() : L.polyline(i).getLatLngs();
      }
      function Yr(e, i) {
        var _a3, _b2, _c, _d;
        if ((_b2 = (_a3 = i.options.crs) == null ? void 0 : _a3.projection) == null ? void 0 : _b2.MAX_LATITUDE) {
          let r = (_d = (_c = i.options.crs) == null ? void 0 : _c.projection) == null ? void 0 : _d.MAX_LATITUDE;
          e.lat = Math.max(Math.min(r, e.lat), -r);
        }
        return e;
      }
      function ki(e) {
        return e.options.renderer || e._map && (e._map._getPaneRenderer(e.options.pane) || e._map.options.renderer || e._map._renderer) || e._renderer;
      }
      function Xn(e, i) {
        if (e = e.trim().toLowerCase(), i[e]) return e;
        let r = e.replace(/[-_\s]/g, "_").match(/^([a-z]{2,3})(?:_([a-z]{2,3}))?$/);
        if (r) {
          let s = [];
          r[2] && s.push(`${r[1]}_${r[2]}`), s.push(r[1]);
          for (let o of s) if (i[o]) return o;
        }
        return e;
      }
      var ca = L.Class.extend({
        includes: [
          Kn,
          Wn,
          Jn,
          Ht,
          Ki
        ],
        initialize(e) {
          this.map = e, this.Draw = new L.PM.Draw(e), this.Toolbar = new L.PM.Toolbar(e), this.Keyboard = qr(), this.globalOptions = {
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
          e = Xn(e, Mt);
          let s = L.PM.activeLang;
          i && (Mt[e] = (0, ji.default)(Mt[r], i)), L.PM.activeLang = e, this.map.pm.Toolbar.reinit(), this._fireLangChange(s, e, r, Mt[e]);
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
          this.map.pm.Draw.shapes.forEach((o) => {
            r.indexOf(o) === -1 && this.map.pm.Draw[o].setPathOptions(e, s);
          });
        },
        getGlobalOptions() {
          return this.globalOptions;
        },
        setGlobalOptions(e) {
          let i = (0, ji.default)(this.globalOptions, e);
          i.editable && (i.resizeableCircleMarker = i.editable, delete i.editable);
          let r = false;
          this.map.pm.Draw.CircleMarker.enabled() && !!this.map.pm.Draw.CircleMarker.options.resizeableCircleMarker != !!i.resizeableCircleMarker && (this.map.pm.Draw.CircleMarker.disable(), r = true);
          let s = false;
          this.map.pm.Draw.Circle.enabled() && !!this.map.pm.Draw.Circle.options.resizeableCircle != !!i.resizeableCircle && (this.map.pm.Draw.Circle.disable(), s = true), this.map.pm.Draw.shapes.forEach((o) => {
            this.map.pm.Draw[o].setOptions(i);
          }), r && this.map.pm.Draw.CircleMarker.enable(), s && this.map.pm.Draw.Circle.enable(), L.PM.Utils.findLayers(this.map).forEach((o) => {
            o.pm.setOptions(i);
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
          ki(this.map)._onMouseMove(this._createMouseEvent("mousemove", e));
        },
        _canvasTouchClick(e) {
          let i = "";
          e.type === "touchstart" || e.type === "pointerdown" ? i = "mousedown" : (e.type === "touchend" || e.type === "pointerup" || e.type === "touchcancel" || e.type === "pointercancel") && (i = "mouseup"), i && ki(this.map)._onClick(this._createMouseEvent(i, e));
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
      }), Se = ca, da = L.Control.extend({
        includes: [
          Ki
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
          let o = L.DomUtil.create("div", `leaflet-pm-actions-container ${i}`, r), u = e.actions, h = {
            cancel: {
              text: vt("actions.cancel"),
              title: vt("actions.cancel"),
              onClick() {
                this._triggerClick();
              }
            },
            finishMode: {
              text: vt("actions.finish"),
              title: vt("actions.finish"),
              onClick() {
                this._triggerClick();
              }
            },
            removeLastVertex: {
              text: vt("actions.removeLastVertex"),
              title: vt("actions.removeLastVertex"),
              onClick() {
                this._map.pm.Draw[e.jsClass]._removeLastVertex();
              }
            },
            finish: {
              text: vt("actions.finish"),
              title: vt("actions.finish"),
              onClick(p) {
                this._map.pm.Draw[e.jsClass]._finishShape(p);
              }
            }
          };
          e._preparedActions = u.map((p) => {
            let f = typeof p == "string" ? p : p.name, C;
            if (h[f]) C = h[f];
            else if (p.text) C = p;
            else return C;
            let y = L.DomUtil.create("a", `leaflet-pm-action ${i} action-${f}`, o);
            if (y.setAttribute("role", "button"), y.setAttribute("tabindex", "0"), y.href = "#", C.title && (y.title = C.title), y.innerHTML = C.text, L.DomEvent.disableClickPropagation(y), L.DomEvent.on(y, "click", L.DomEvent.stop), C._node = y, !e.disabled && C.onClick) {
              let S = (D) => {
                D.preventDefault();
                let U = "", { buttons: H } = this._map.pm.Toolbar;
                for (let X in H) if (H[X]._button === e) {
                  U = X;
                  break;
                }
                this._fireActionClick(C, U, e);
              };
              L.DomEvent.addListener(y, "click", S, this), L.DomEvent.addListener(y, "click", C.onClick, this), L.DomEvent.addListener(y, "click", () => this._updateActiveAction(e));
            }
            return C;
          }), this._updateActiveAction(e), e.toggleStatus && L.DomUtil.addClass(r, "active");
          let c = L.DomUtil.create("div", "control-icon", s);
          return e.iconUrl && c.setAttribute("src", e.iconUrl), e.className && L.DomUtil.addClass(c, e.className), L.DomEvent.disableClickPropagation(s), L.DomEvent.on(s, "click", L.DomEvent.stop), e.disabled || (L.DomEvent.addListener(s, "click", this._onBtnClick, this), L.DomEvent.addListener(s, "click", this._triggerClick, this)), e.disabled && (L.DomUtil.addClass(s, "pm-disabled"), s.setAttribute("aria-disabled", "true")), r;
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
      }), Xr = da;
      L.Control.PMButton = Xr;
      var Je = L.Class.extend({
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
            title: vt("buttonTitles.drawMarkerButton"),
            jsClass: "Marker",
            onClick: () => {
            },
            afterClick: (S, D) => {
              this.map.pm.Draw[D.button._button.jsClass].toggle();
            },
            doToggle: true,
            toggleStatus: false,
            disableOtherButtons: true,
            position: this.options.position,
            actions: [
              "cancel"
            ]
          }, i = {
            title: vt("buttonTitles.drawPolyButton"),
            className: "control-icon leaflet-pm-icon-polygon",
            jsClass: "Polygon",
            onClick: () => {
            },
            afterClick: (S, D) => {
              this.map.pm.Draw[D.button._button.jsClass].toggle();
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
            title: vt("buttonTitles.drawLineButton"),
            jsClass: "Line",
            onClick: () => {
            },
            afterClick: (S, D) => {
              this.map.pm.Draw[D.button._button.jsClass].toggle();
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
            title: vt("buttonTitles.drawCircleButton"),
            className: "control-icon leaflet-pm-icon-circle",
            jsClass: "Circle",
            onClick: () => {
            },
            afterClick: (S, D) => {
              this.map.pm.Draw[D.button._button.jsClass].toggle();
            },
            doToggle: true,
            toggleStatus: false,
            disableOtherButtons: true,
            position: this.options.position,
            actions: [
              "cancel"
            ]
          }, o = {
            title: vt("buttonTitles.drawCircleMarkerButton"),
            className: "control-icon leaflet-pm-icon-circle-marker",
            jsClass: "CircleMarker",
            onClick: () => {
            },
            afterClick: (S, D) => {
              this.map.pm.Draw[D.button._button.jsClass].toggle();
            },
            doToggle: true,
            toggleStatus: false,
            disableOtherButtons: true,
            position: this.options.position,
            actions: [
              "cancel"
            ]
          }, u = {
            title: vt("buttonTitles.drawRectButton"),
            className: "control-icon leaflet-pm-icon-rectangle",
            jsClass: "Rectangle",
            onClick: () => {
            },
            afterClick: (S, D) => {
              this.map.pm.Draw[D.button._button.jsClass].toggle();
            },
            doToggle: true,
            toggleStatus: false,
            disableOtherButtons: true,
            position: this.options.position,
            actions: [
              "cancel"
            ]
          }, h = {
            title: vt("buttonTitles.editButton"),
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
          }, c = {
            title: vt("buttonTitles.dragButton"),
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
          }, p = {
            title: vt("buttonTitles.cutButton"),
            className: "control-icon leaflet-pm-icon-cut",
            jsClass: "Cut",
            onClick: () => {
            },
            afterClick: (S, D) => {
              this.map.pm.Draw[D.button._button.jsClass].toggle({
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
          }, f = {
            title: vt("buttonTitles.deleteButton"),
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
          }, C = {
            title: vt("buttonTitles.rotateButton"),
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
          }, y = {
            className: "control-icon leaflet-pm-icon-text",
            title: vt("buttonTitles.drawTextButton"),
            jsClass: "Text",
            onClick: () => {
            },
            afterClick: (S, D) => {
              this.map.pm.Draw[D.button._button.jsClass].toggle();
            },
            doToggle: true,
            toggleStatus: false,
            disableOtherButtons: true,
            position: this.options.position,
            actions: [
              "cancel"
            ]
          };
          this._addButton("drawMarker", new L.Control.PMButton(e)), this._addButton("drawPolyline", new L.Control.PMButton(r)), this._addButton("drawRectangle", new L.Control.PMButton(u)), this._addButton("drawPolygon", new L.Control.PMButton(i)), this._addButton("drawCircle", new L.Control.PMButton(s)), this._addButton("drawCircleMarker", new L.Control.PMButton(o)), this._addButton("drawText", new L.Control.PMButton(y)), this._addButton("editMode", new L.Control.PMButton(h)), this._addButton("dragMode", new L.Control.PMButton(c)), this._addButton("cutPolygon", new L.Control.PMButton(p)), this._addButton("removalMode", new L.Control.PMButton(f)), this._addButton("rotateMode", new L.Control.PMButton(C));
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
          let o = this.createCustomControl(i);
          return {
            drawInstance: s,
            control: o
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
          e.forEach((u) => {
            i[u] ? r.push(i[u]) : r.push(u);
          });
          let s = this.getButtons(), o = {};
          r.forEach((u) => {
            s[u] && (o[u] = s[u]);
          }), Object.keys(s).filter((u) => !s[u]._button.tool || s[u]._button.tool === "draw").forEach((u) => {
            r.indexOf(u) === -1 && (o[u] = s[u]);
          }), Object.keys(s).filter((u) => s[u]._button.tool === "edit").forEach((u) => {
            r.indexOf(u) === -1 && (o[u] = s[u]);
          }), Object.keys(s).filter((u) => s[u]._button.tool === "options").forEach((u) => {
            r.indexOf(u) === -1 && (o[u] = s[u]);
          }), Object.keys(s).filter((u) => s[u]._button.tool === "custom").forEach((u) => {
            r.indexOf(u) === -1 && (o[u] = s[u]);
          }), Object.keys(s).forEach((u) => {
            r.indexOf(u) === -1 && (o[u] = s[u]);
          }), this.map.pm.Toolbar.buttons = o, this._showHideButtons();
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
      }), $r = Je, Qr = et(rn()), $n = {
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
          var _a3, _b2, _c;
          let r = e.target;
          if (r._snapped = false, this.throttledList || (this.throttledList = L.Util.throttle(this._handleThrottleSnapping, 100, this)), ((_a3 = e == null ? void 0 : e.originalEvent) == null ? void 0 : _a3.altKey) || ((_c = (_b2 = this._map) == null ? void 0 : _b2.pm) == null ? void 0 : _c.Keyboard.isAltKeyPressed())) return false;
          let s;
          if (i) {
            if (!this._otherSnapLayers || this._otherSnapLayers.length === 0) return false;
            s = this._otherSnapLayers;
          } else this._snapList === void 0 && (this._createSnapList(), this._map.off("layeradd", this.throttledList, this), this._map.on("layeradd", this.throttledList, this)), s = this._snapList;
          if (s.length <= 0) return false;
          let o = this._calcClosestLayer(r.getLatLng(), s);
          if (Object.keys(o).length === 0) return false;
          let u = o.layer instanceof L.Marker || o.layer instanceof L.CircleMarker || !this.options.snapSegment, h;
          u ? h = o.latlng : h = this._checkPrioritiySnapping(o);
          let c = this.options.snapDistance, p = {
            marker: r,
            shape: this._shape,
            snapLatLng: h,
            segment: o.segment,
            layer: this._layer,
            workingLayer: this._layer,
            layerInteractedWith: o.layer,
            distance: o.distance
          };
          if (this._fireSnapDrag(p.marker, p), this._fireSnapDrag(this._layer, p), o.distance < c) {
            r._orgLatLng = r.getLatLng(), r.setLatLng(h), r._snapped = true, r._snapInfo = p;
            let f = () => {
              this._snapLatLng = h, this._fireSnap(r, p), this._fireSnap(this._layer, p);
            }, C = this._snapLatLng || {}, y = h || {};
            (C.lat !== y.lat || C.lng !== y.lng) && f();
          } else this._snapLatLng && (this._unsnap(p), r._snapped = false, r._snapInfo = void 0, this._fireUnsnap(p.marker, p), this._fireUnsnap(this._layer, p));
          return true;
        },
        _createSnapList() {
          let e = [], i = [], r = this._map;
          r.off("layerremove", this._handleSnapLayerRemoval, this), r.on("layerremove", this._handleSnapLayerRemoval, this), r.eachLayer((s) => {
            if ((s instanceof L.Polyline || s instanceof L.Marker || s instanceof L.CircleMarker || s instanceof L.ImageOverlay) && s.options.snapIgnore !== true) {
              if (s.options.snapIgnore === void 0 && (!L.PM.optIn && s.options.pmIgnore === true || L.PM.optIn && s.options.pmIgnore !== false)) return;
              (s instanceof L.Circle || s instanceof L.CircleMarker) && s.pm && s.pm._hiddenPolyCircle ? e.push(s.pm._hiddenPolyCircle) : s instanceof L.ImageOverlay && (s = L.rectangle(s.getBounds())), e.push(s);
              let o = L.polyline([], {
                color: "red",
                pmIgnore: true
              });
              o._pmTempLayer = true, i.push(o), (s instanceof L.Circle || s instanceof L.CircleMarker) && i.push(o);
            }
          }), e = e.filter((s) => this._layer !== s), e = e.filter((s) => s._latlng || s._latlngs && yt(s._latlngs)), e = e.filter((s) => !s._pmTempLayer), this._otherSnapLayers ? (this._otherSnapLayers.forEach(() => {
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
          let s = [], o = {};
          i.forEach((h, c) => {
            var _a3;
            if (h._parentCopy && h._parentCopy === this._layer || ((_a3 = h.getLatLngs) == null ? void 0 : _a3.call(h).flat(5).length) < 2) return;
            let p = this._calcLayerDistances(e, h);
            if (p.distance = Math.floor(p.distance), this.debugIndicatorLines) {
              if (!this.debugIndicatorLines[c]) {
                let f = L.polyline([], {
                  color: "red",
                  pmIgnore: true
                });
                f._pmTempLayer = true, this.debugIndicatorLines[c] = f;
              }
              this.debugIndicatorLines[c].setLatLngs([
                e,
                p.latlng
              ]);
            }
            r === 1 && (o.distance === void 0 || p.distance - 5 <= o.distance) ? (p.distance + 5 < o.distance && (s = []), o = p, o.layer = h, s.push(o)) : r !== 1 && (o = {}, o = p, o.layer = h, s.push(o));
          }), r !== 1 && (s = s.sort((h, c) => h.distance - c.distance)), r === -1 && (r = s.length);
          let u = this._getClosestLayerByPriority(s, r);
          return L.Util.isArray(u) ? u : [
            u
          ];
        },
        _calcLayerDistances(e, i) {
          let r = this._map, s = i instanceof L.Marker || i instanceof L.CircleMarker, o = i instanceof L.Polygon, u = e;
          if (s) {
            let h = i.getLatLng();
            return {
              latlng: {
                ...h
              },
              distance: this._getDistance(r, h, u)
            };
          }
          return this._calcLatLngDistances(u, i.getLatLngs(), r, o);
        },
        _calcLatLngDistances(e, i, r, s = false) {
          let o, u, h, c = (p) => {
            p.forEach((f, C) => {
              if (Array.isArray(f)) {
                c(f);
                return;
              }
              if (this.options.snapSegment) {
                let y = f, S;
                s ? S = C + 1 === p.length ? 0 : C + 1 : S = C + 1 === p.length ? void 0 : C + 1;
                let D = p[S];
                if (D) {
                  let U = this._getDistanceToSegment(r, e, y, D);
                  (u === void 0 || U < u) && (u = U, h = [
                    y,
                    D
                  ]);
                }
              } else {
                let y = this._getDistance(r, e, f);
                (u === void 0 || y < u) && (u = y, o = f);
              }
            });
          };
          return c(i), this.options.snapSegment ? {
            latlng: {
              ...this._getClosestPointOnSegment(r, e, h[0], h[1])
            },
            segment: h,
            distance: u
          } : {
            latlng: o,
            distance: u
          };
        },
        _getClosestLayerByPriority(e, i = 1) {
          e = e.sort((h, c) => h._leaflet_id - c._leaflet_id);
          let r = [
            "Marker",
            "CircleMarker",
            "Circle",
            "Line",
            "Polygon",
            "Rectangle"
          ], s = this._map.pm.globalOptions.snappingOrder || [], o = 0, u = {};
          return s.concat(r).forEach((h) => {
            u[h] || (o += 1, u[h] = o);
          }), e.sort(ha("instanceofShape", u)), i === 1 ? e[0] || {} : e.slice(0, i);
        },
        _checkPrioritiySnapping(e) {
          let i = this._map, r = e.segment[0], s = e.segment[1], o = e.latlng, u = o;
          if (this.options.snapVertex) {
            let h = this._getDistance(i, r, o), c = this._getDistance(i, s, o), p = h < c ? r : s, f = h < c ? h : c;
            if (this.options.snapMiddle) {
              let y = L.PM.Utils.calcMiddleLatLng(i, r, s), S = this._getDistance(i, y, o);
              S < h && S < c && (p = y, f = S);
            }
            let C = this.options.snapDistance;
            f < C && (u = p);
          }
          return {
            ...u
          };
        },
        _unsnap() {
          delete this._snapLatLng;
        },
        _getClosestPointOnSegment(e, i, r, s) {
          let o = e.getMaxZoom();
          o === 1 / 0 && (o = e.getZoom());
          let u = e.project(i, o), h = e.project(r, o), c = e.project(s, o), p = L.LineUtil.closestPointOnSegment(u, h, c);
          return e.unproject(p, o);
        },
        _getDistanceToSegment(e, i, r, s) {
          let o = e.latLngToContainerPoint(i), u = e.latLngToContainerPoint(r), h = e.latLngToContainerPoint(s);
          return L.LineUtil.pointToSegmentDistance(o, u, h);
        },
        _getDistance(e, i, r) {
          return e.latLngToContainerPoint(i).distanceTo(e.latLngToContainerPoint(r));
        }
      }, ts = $n, es = L.Class.extend({
        includes: [
          ts,
          Ki
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
          i ? this.options.pathOptions = (0, Qr.default)(this.options.pathOptions, e) : this.options.pathOptions = e;
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
      }), Ut = es;
      Ut.Marker = Ut.extend({
        initialize(e) {
          this._map = e, this._shape = "Marker", this.toolbarButtonName = "drawMarker", this._layerIsDragging = false;
        },
        enable(e) {
          L.Util.setOptions(this, e), this._enabled = true, this._isTouchDevice = !Wr(), this._map.getContainer().classList.add("geoman-draw-cursor"), this._map.on("click", this._createMarker, this), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, true), this._isTouchDevice ? (this._createTouchHint(), this._hintMarker = L.marker(this._map.getCenter(), {
            ...this.options.markerStyle,
            opacity: 0,
            interactive: false
          }), this._setPane(this._hintMarker, "markerPane"), this._hintMarker._pmTempLayer = true) : (this._hintMarker = L.marker(this._map.getCenter(), this.options.markerStyle), this._setPane(this._hintMarker, "markerPane"), this._hintMarker._pmTempLayer = true, this._hintMarker.addTo(this._map), this.options.tooltips && this._hintMarker.bindTooltip(vt("tooltips.placeMarker"), {
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
          this.options.tooltips && (this._touchHint = L.DomUtil.create("div", "leaflet-pm-touch-hint"), this._touchHint.textContent = vt("tooltips.placeMarkerTouch"), this._map.getContainer().appendChild(this._touchHint));
        },
        _removeTouchHint() {
          this._touchHint && this._touchHint.parentNode && (this._touchHint.parentNode.removeChild(this._touchHint), this._touchHint = null);
        }
      });
      var le = 63710088e-1, pa = {
        centimeters: le * 100,
        centimetres: le * 100,
        degrees: 360 / (2 * Math.PI),
        feet: le * 3.28084,
        inches: le * 39.37,
        kilometers: le / 1e3,
        kilometres: le / 1e3,
        meters: le,
        metres: le,
        miles: le / 1609.344,
        millimeters: le * 1e3,
        millimetres: le * 1e3,
        nauticalmiles: le / 1852,
        radians: 1,
        yards: le * 1.0936
      };
      function De(e, i, r = {}) {
        let s = {
          type: "Feature"
        };
        return (r.id === 0 || r.id) && (s.id = r.id), r.bbox && (s.bbox = r.bbox), s.properties = i || {}, s.geometry = e, s;
      }
      function wi(e, i, r = {}) {
        if (!e) throw new Error("coordinates is required");
        if (!Array.isArray(e)) throw new Error("coordinates must be an Array");
        if (e.length < 2) throw new Error("coordinates must be at least 2 numbers long");
        if (!Bi(e[0]) || !Bi(e[1])) throw new Error("coordinates must contain numbers");
        return De({
          type: "Point",
          coordinates: e
        }, i, r);
      }
      function qi(e, i, r = {}) {
        if (e.length < 2) throw new Error("coordinates must be an array of two or more positions");
        return De({
          type: "LineString",
          coordinates: e
        }, i, r);
      }
      function pe(e, i = {}) {
        let r = {
          type: "FeatureCollection"
        };
        return i.id && (r.id = i.id), i.bbox && (r.bbox = i.bbox), r.features = e, r;
      }
      function dn(e, i = "kilometers") {
        let r = pa[i];
        if (!r) throw new Error(i + " units is invalid");
        return e * r;
      }
      function Ye(e) {
        return e % (2 * Math.PI) * 180 / Math.PI;
      }
      function Ei(e) {
        return e % 360 * Math.PI / 180;
      }
      function Bi(e) {
        return !isNaN(e) && e !== null && !Array.isArray(e);
      }
      function fe(e) {
        return e !== null && typeof e == "object" && !Array.isArray(e);
      }
      function is(e) {
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
        return i.forEach((o) => {
          i.forEach((u) => {
            for (let h = 0; h < o.length - 1; h++) for (let c = h; c < u.length - 1; c++) {
              if (o === u && (Math.abs(h - c) === 1 || h === 0 && c === o.length - 2 && o[h][0] === o[o.length - 1][0] && o[h][1] === o[o.length - 1][1])) continue;
              let p = ns(o[h][0], o[h][1], o[h + 1][0], o[h + 1][1], u[c][0], u[c][1], u[c + 1][0], u[c + 1][1]);
              p && s.features.push(wi([
                p[0],
                p[1]
              ]));
            }
          });
        }), s;
      }
      function ns(e, i, r, s, o, u, h, c) {
        let p, f, C, y, S, D = {
          x: null,
          y: null,
          onLine1: false,
          onLine2: false
        };
        return p = (c - u) * (r - e) - (h - o) * (s - i), p === 0 ? D.x !== null && D.y !== null ? D : false : (f = i - u, C = e - o, y = (h - o) * f - (c - u) * C, S = (r - e) * f - (s - i) * C, f = y / p, C = S / p, D.x = e + f * (r - e), D.y = i + f * (s - i), f >= 0 && f <= 1 && (D.onLine1 = true), C >= 0 && C <= 1 && (D.onLine2 = true), D.onLine1 && D.onLine2 ? [
          D.x,
          D.y
        ] : false);
      }
      var pn = is;
      Ut.Line = Ut.extend({
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
          }), this._setPane(this._hintMarker, "vertexPane"), this._hintMarker._pmTempLayer = true, this._layerGroup.addLayer(this._hintMarker), this.options.cursorMarker && L.DomUtil.addClass(this._hintMarker._icon, "visible"), this.options.tooltips && this._hintMarker.bindTooltip(vt("tooltips.firstVertex"), {
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
          return pn(this._layer.toGeoJSON(15)).features.length > 0;
        },
        _handleSelfIntersection(e, i) {
          let r = L.polyline(this._layer.getLatLngs());
          e && (i || (i = this._hintMarker.getLatLng()), r.addLatLng(i));
          let s = pn(r.toGeoJSON(15));
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
          let o = this._createMarker(i);
          this._setTooltipText(), this._setHintLineAfterNewVertex(i), this._fireVertexAdded(o, void 0, i, "Draw"), this._change(this._layer.getLatLngs()), this.options.finishOn === "snap" && this._hintMarker._snapped && this._finishShape(e);
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
          let o = e[e.length - 1], u = i.indexOf(o.getLatLng());
          i = i.slice(0, u + 1), this._layer.setLatLngs(i), this._layer._latlngInfo.pop(), this._syncHintLine(), this._setTooltipText(), this._fireVertexRemoved(r, s, "Draw"), this._change(this._layer.getLatLngs());
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
          e <= 1 ? i = vt("tooltips.continueLine") : i = vt("tooltips.finishLine"), this._hintMarker.setTooltipContent(i);
        },
        _change(e) {
          this._fireChange(e, "Draw");
        },
        setStyle() {
          var _a3, _b2;
          (_a3 = this._layer) == null ? void 0 : _a3.setStyle(this.options.templineStyle), (_b2 = this._hintline) == null ? void 0 : _b2.setStyle(this.options.hintlineStyle);
        }
      }), Ut.Polygon = Ut.Line.extend({
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
          e <= 2 ? i = vt("tooltips.continueLine") : i = vt("tooltips.finishPoly"), this._hintMarker.setTooltipContent(i);
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
      }), Ut.Rectangle = Ut.extend({
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
          }), this._setPane(this._hintMarker, "vertexPane"), this._hintMarker._pmTempLayer = true, this._layerGroup.addLayer(this._hintMarker), this.options.cursorMarker && L.DomUtil.addClass(this._hintMarker._icon, "visible"), this.options.tooltips && this._hintMarker.bindTooltip(vt("tooltips.firstVertex"), {
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
          }), this._map.off("click", this._placeStartingMarkers, this), this._map.on("click", this._finishShape, this), this._hintMarker.setTooltipContent(vt("tooltips.finishRect")), this._setRectangleOrigin();
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
          let e = Yr(this._startMarker.getLatLng(), this._map), i = Yr(this._hintMarker.getLatLng(), this._map), r = L.PM.Utils._getRotatedRectangle(e, i, this.options.rectangleAngle || 0, this._map);
          if (this._layer.setLatLngs(r), this.options.cursorMarker && this._styleMarkers) {
            let s = [];
            r.forEach((o) => {
              !o.equals(e, 1e-8) && !o.equals(i, 1e-8) && s.push(o);
            }), s.forEach((o, u) => {
              try {
                this._styleMarkers[u].setLatLng(o);
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
            let u = L.PM.Utils._getRotatedRectangle(r, i, this.options.rectangleAngle || 0, this._map);
            s.setLatLngs(u), s.pm && s.pm._setAngle(this.options.rectangleAngle || 0);
          }
          this._setPane(s, "layerPane"), this._finishLayer(s), s.addTo(this._map.pm._getContainingLayer()), this._fireCreate(s);
          let o = this._hintMarker.getLatLng();
          this.disable(), this.options.continueDrawing && (this.enable(), this._hintMarker.setLatLng(o));
        },
        setStyle() {
          var _a3;
          (_a3 = this._layer) == null ? void 0 : _a3.setStyle(this.options.pathOptions);
        }
      }), Ut.CircleMarker = Ut.extend({
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
            }), this._setPane(this._hintMarker, "vertexPane"), this._hintMarker._pmTempLayer = true, this._layerGroup.addLayer(this._hintMarker), this.options.cursorMarker && L.DomUtil.addClass(this._hintMarker._icon, "visible"), this.options.tooltips && this._hintMarker.bindTooltip(vt("tooltips.startCircle"), {
              permanent: true,
              offset: L.point(0, 10),
              direction: "bottom",
              opacity: 0.8
            }).openTooltip(), this._hintline = L.polyline([], this.options.hintlineStyle), this._setPane(this._hintline, "layerPane"), this._hintline._pmTempLayer = true, this._layerGroup.addLayer(this._hintline), this._map.on("click", this._placeCenterMarker, this);
          } else this._map.on("click", this._createMarker, this), this._hintMarker = new this._BaseCircleClass(this._map.getCenter(), {
            radius: this._defaultRadius,
            ...this.options.templineStyle
          }), this._setPane(this._hintMarker, "layerPane"), this._hintMarker._pmTempLayer = true, this._hintMarker.addTo(this._map), this._layer = this._hintMarker, this.options.tooltips && this._hintMarker.bindTooltip(vt("tooltips.placeCircleMarker"), {
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
          e && (this._layer.setLatLng(e), this._hintMarker.on("move", this._syncHintLine, this), this._hintMarker.on("move", this._syncCircleRadius, this), this._hintMarker.setTooltipContent(vt("tooltips.finishCircle")), this._fireCenterPlaced(), this._fireChange(this._layer.getLatLng(), "Draw"));
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
            let h = this._hintMarker.getLatLng();
            r = this._distanceCalculation(i, h), this.options[this._minRadiusOption] && r < this.options[this._minRadiusOption] ? r = this.options[this._minRadiusOption] : this.options[this._maxRadiusOption] && r > this.options[this._maxRadiusOption] && (r = this.options[this._maxRadiusOption]);
          }
          let s = {
            ...this.options.pathOptions,
            radius: r
          }, o = new this._BaseCircleClass(i, s);
          this._setPane(o, "layerPane"), this._finishLayer(o), o.addTo(this._map.pm._getContainingLayer()), o.pm && o.pm._updateHiddenPolyCircle(), this._fireCreate(o);
          let u = this._hintMarker.getLatLng();
          this.disable(), this.options.continueDrawing && (this.enable(), this._hintMarker.setLatLng(u));
        },
        _getNewDestinationOfHintMarker() {
          let e = this._hintMarker.getLatLng();
          if (this.options[this._editableOption]) {
            if (!this._layerGroup.hasLayer(this._centerMarker)) return e;
            let i = this._centerMarker.getLatLng(), r = this._distanceCalculation(i, e);
            this.options[this._minRadiusOption] && r < this.options[this._minRadiusOption] ? e = Mi(this._map, i, e, this._getMinDistanceInMeter()) : this.options[this._maxRadiusOption] && r > this.options[this._maxRadiusOption] && (e = Mi(this._map, i, e, this._getMaxDistanceInMeter()));
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
      }), Ut.Circle = Ut.CircleMarker.extend({
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
      var fn = class {
        constructor(e = [], i = Qn) {
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
            let o = e - 1 >> 1, u = i[o];
            if (r(s, u) >= 0) break;
            i[e] = u, e = o;
          }
          i[e] = s;
        }
        _down(e) {
          let { data: i, compare: r } = this, s = this.length >> 1, o = i[e];
          for (; e < s; ) {
            let u = (e << 1) + 1, h = i[u], c = u + 1;
            if (c < this.length && r(i[c], h) < 0 && (u = c, h = i[c]), r(h, o) >= 0) break;
            i[e] = h, e = u;
          }
          i[e] = o;
        }
      };
      function Qn(e, i) {
        return e < i ? -1 : e > i ? 1 : 0;
      }
      function rs(e, i) {
        return e.p.x > i.p.x ? 1 : e.p.x < i.p.x ? -1 : e.p.y !== i.p.y ? e.p.y > i.p.y ? 1 : -1 : 1;
      }
      function fa(e, i) {
        return e.rightSweepEvent.p.x > i.rightSweepEvent.p.x ? 1 : e.rightSweepEvent.p.x < i.rightSweepEvent.p.x ? -1 : e.rightSweepEvent.p.y !== i.rightSweepEvent.p.y ? e.rightSweepEvent.p.y < i.rightSweepEvent.p.y ? 1 : -1 : 1;
      }
      var tr = class {
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
      function _a(e, i) {
        if (e.type === "FeatureCollection") {
          let r = e.features;
          for (let s = 0; s < r.length; s++) Ae(r[s], i);
        } else Ae(e, i);
      }
      var re = 0, je = 0, _n = 0;
      function Ae(e, i) {
        let r = e.type === "Feature" ? e.geometry : e, s = r.coordinates;
        (r.type === "Polygon" || r.type === "MultiLineString") && (s = [
          s
        ]), r.type === "LineString" && (s = [
          [
            s
          ]
        ]);
        for (let o = 0; o < s.length; o++) for (let u = 0; u < s[o].length; u++) {
          let h = s[o][u][0], c = null;
          je = je + 1;
          for (let p = 0; p < s[o][u].length - 1; p++) {
            c = s[o][u][p + 1];
            let f = new tr(h, re, je, _n), C = new tr(c, re, je, _n + 1);
            f.otherEvent = C, C.otherEvent = f, rs(f, C) > 0 ? (C.isLeftEndpoint = true, f.isLeftEndpoint = false) : (f.isLeftEndpoint = true, C.isLeftEndpoint = false), i.push(f), i.push(C), h = c, _n = _n + 1;
          }
        }
        re = re + 1;
      }
      var ma = class {
        constructor(e) {
          this.leftSweepEvent = e, this.rightSweepEvent = e.otherEvent;
        }
      };
      function Pi(e, i) {
        if (e === null || i === null || e.leftSweepEvent.ringId === i.leftSweepEvent.ringId && (e.rightSweepEvent.isSamePoint(i.leftSweepEvent) || e.rightSweepEvent.isSamePoint(i.leftSweepEvent) || e.rightSweepEvent.isSamePoint(i.rightSweepEvent) || e.leftSweepEvent.isSamePoint(i.leftSweepEvent) || e.leftSweepEvent.isSamePoint(i.rightSweepEvent))) return false;
        let r = e.leftSweepEvent.p.x, s = e.leftSweepEvent.p.y, o = e.rightSweepEvent.p.x, u = e.rightSweepEvent.p.y, h = i.leftSweepEvent.p.x, c = i.leftSweepEvent.p.y, p = i.rightSweepEvent.p.x, f = i.rightSweepEvent.p.y, C = (f - c) * (o - r) - (p - h) * (u - s), y = (p - h) * (s - c) - (f - c) * (r - h), S = (o - r) * (s - c) - (u - s) * (r - h);
        if (C === 0) return false;
        let D = y / C, U = S / C;
        if (D >= 0 && D <= 1 && U >= 0 && U <= 1) {
          let H = r + D * (o - r), X = s + D * (u - s);
          return [
            H,
            X
          ];
        }
        return false;
      }
      function ga(e, i) {
        i = i || false;
        let r = [], s = new fn([], fa);
        for (; e.length; ) {
          let o = e.pop();
          if (o.isLeftEndpoint) {
            let u = new ma(o);
            for (let h = 0; h < s.data.length; h++) {
              let c = s.data[h];
              if (i && c.leftSweepEvent.featureId === o.featureId) continue;
              let p = Pi(u, c);
              p !== false && r.push(p);
            }
            s.push(u);
          } else o.isLeftEndpoint === false && s.pop();
        }
        return r;
      }
      function Wi(e, i) {
        let r = new fn([], rs);
        return _a(e, r), ga(r, i);
      }
      var ss = Wi, mn = ss;
      function as(e, i, r = {}) {
        let { removeDuplicates: s = true, ignoreSelfIntersections: o = true } = r, u = [];
        e.type === "FeatureCollection" ? u = u.concat(e.features) : e.type === "Feature" ? u.push(e) : (e.type === "LineString" || e.type === "Polygon" || e.type === "MultiLineString" || e.type === "MultiPolygon") && u.push(De(e)), i.type === "FeatureCollection" ? u = u.concat(i.features) : i.type === "Feature" ? u.push(i) : (i.type === "LineString" || i.type === "Polygon" || i.type === "MultiLineString" || i.type === "MultiPolygon") && u.push(De(i));
        let h = mn(pe(u), o), c = [];
        if (s) {
          let p = {};
          h.forEach((f) => {
            let C = f.join(",");
            p[C] || (p[C] = true, c.push(f));
          });
        } else c = h;
        return pe(c.map((p) => wi(p)));
      }
      var _e = as, gn = et(xt(), 1);
      function er(e, i, r) {
        if (e !== null) for (var s, o, u, h, c, p, f, C = 0, y = 0, S, D = e.type, U = D === "FeatureCollection", H = D === "Feature", X = U ? e.features.length : 1, Q = 0; Q < X; Q++) {
          f = U ? e.features[Q].geometry : H ? e.geometry : e, S = f ? f.type === "GeometryCollection" : false, c = S ? f.geometries.length : 1;
          for (var x = 0; x < c; x++) {
            var R = 0, Z = 0;
            if (h = S ? f.geometries[x] : f, h !== null) {
              p = h.coordinates;
              var Y = h.type;
              switch (C = 0, Y) {
                case null:
                  break;
                case "Point":
                  if (i(p, y, Q, R, Z) === false) return false;
                  y++, R++;
                  break;
                case "LineString":
                case "MultiPoint":
                  for (s = 0; s < p.length; s++) {
                    if (i(p[s], y, Q, R, Z) === false) return false;
                    y++, Y === "MultiPoint" && R++;
                  }
                  Y === "LineString" && R++;
                  break;
                case "Polygon":
                case "MultiLineString":
                  for (s = 0; s < p.length; s++) {
                    for (o = 0; o < p[s].length - C; o++) {
                      if (i(p[s][o], y, Q, R, Z) === false) return false;
                      y++;
                    }
                    Y === "MultiLineString" && R++, Y === "Polygon" && Z++;
                  }
                  Y === "Polygon" && R++;
                  break;
                case "MultiPolygon":
                  for (s = 0; s < p.length; s++) {
                    for (Z = 0, o = 0; o < p[s].length; o++) {
                      for (u = 0; u < p[s][o].length - C; u++) {
                        if (i(p[s][o][u], y, Q, R, Z) === false) return false;
                        y++;
                      }
                      Z++;
                    }
                    R++;
                  }
                  break;
                case "GeometryCollection":
                  for (s = 0; s < h.geometries.length; s++) if (er(h.geometries[s], i) === false) return false;
                  break;
                default:
                  throw new Error("Unknown Geometry Type");
              }
            }
          }
        }
      }
      function Si(e, i) {
        if (e.type === "Feature") i(e, 0);
        else if (e.type === "FeatureCollection") for (var r = 0; r < e.features.length && i(e.features[r], r) !== false; r++) ;
      }
      function ya(e, i, r) {
        var s = r;
        return Si(e, function(o, u) {
          u === 0 && r === void 0 ? s = o : s = i(s, o, u);
        }), s;
      }
      function Ze(e, i) {
        var r, s, o, u, h, c, p, f, C, y, S = 0, D = e.type === "FeatureCollection", U = e.type === "Feature", H = D ? e.features.length : 1;
        for (r = 0; r < H; r++) {
          for (c = D ? e.features[r].geometry : U ? e.geometry : e, f = D ? e.features[r].properties : U ? e.properties : {}, C = D ? e.features[r].bbox : U ? e.bbox : void 0, y = D ? e.features[r].id : U ? e.id : void 0, p = c ? c.type === "GeometryCollection" : false, h = p ? c.geometries.length : 1, o = 0; o < h; o++) {
            if (u = p ? c.geometries[o] : c, u === null) {
              if (i(null, S, f, C, y) === false) return false;
              continue;
            }
            switch (u.type) {
              case "Point":
              case "LineString":
              case "MultiPoint":
              case "Polygon":
              case "MultiLineString":
              case "MultiPolygon": {
                if (i(u, S, f, C, y) === false) return false;
                break;
              }
              case "GeometryCollection": {
                for (s = 0; s < u.geometries.length; s++) if (i(u.geometries[s], S, f, C, y) === false) return false;
                break;
              }
              default:
                throw new Error("Unknown Geometry Type");
            }
          }
          S++;
        }
      }
      function ir(e, i) {
        Ze(e, function(r, s, o, u, h) {
          var c = r === null ? null : r.type;
          switch (c) {
            case null:
            case "Point":
            case "LineString":
            case "Polygon":
              return i(De(r, o, {
                bbox: u,
                id: h
              }), s, 0) === false ? false : void 0;
          }
          var p;
          switch (c) {
            case "MultiPoint":
              p = "Point";
              break;
            case "MultiLineString":
              p = "LineString";
              break;
            case "MultiPolygon":
              p = "Polygon";
              break;
          }
          for (var f = 0; f < r.coordinates.length; f++) {
            var C = r.coordinates[f], y = {
              type: p,
              coordinates: C
            };
            if (i(De(y, o), s, f) === false) return false;
          }
        });
      }
      function Qt(e, i = {}) {
        if (e.bbox != null && i.recompute !== true) return e.bbox;
        let r = [
          1 / 0,
          1 / 0,
          -1 / 0,
          -1 / 0
        ];
        return er(e, (s) => {
          r[0] > s[0] && (r[0] = s[0]), r[1] > s[1] && (r[1] = s[1]), r[2] < s[0] && (r[2] = s[0]), r[3] < s[1] && (r[3] = s[1]);
        }), r;
      }
      function nr(e) {
        var i;
        if (e.bbox) i = e.bbox;
        else if (Array.isArray(e) && e.length === 4) i = e;
        else if (Array.isArray(e) && e.length === 6) i = [
          e[0],
          e[1],
          e[3],
          e[4]
        ];
        else if (e.type === "Feature") i = Qt(e);
        else if (e.type === "FeatureCollection") i = Qt(e);
        else throw new Error("invalid geojson");
        return {
          minX: i[0],
          minY: i[1],
          maxX: i[2],
          maxY: i[3]
        };
      }
      var Ue = class {
        constructor(e = 9) {
          this.tree = new gn.default(e), this.tree.toBBox = nr;
        }
        insert(e) {
          if (e.type !== "Feature") throw new Error("invalid feature");
          return e.bbox = e.bbox ? e.bbox : Qt(e), this.tree.insert(e), this;
        }
        load(e) {
          var i = [];
          return Array.isArray(e) ? e.forEach(function(r) {
            if (r.type !== "Feature") throw new Error("invalid features");
            r.bbox = r.bbox ? r.bbox : Qt(r), i.push(r);
          }) : Si(e, function(r) {
            if (r.type !== "Feature") throw new Error("invalid features");
            r.bbox = r.bbox ? r.bbox : Qt(r), i.push(r);
          }), this.tree.load(i), this;
        }
        remove(e, i) {
          if (e.type !== "Feature") throw new Error("invalid feature");
          return e.bbox = e.bbox ? e.bbox : Qt(e), this.tree.remove(e, i), this;
        }
        clear() {
          return this.tree.clear(), this;
        }
        search(e) {
          var i = this.tree.search(nr(e));
          return pe(i);
        }
        collides(e) {
          return this.tree.collides(nr(e));
        }
        all() {
          let e = this.tree.all();
          return pe(e);
        }
        toJSON() {
          return this.tree.toJSON();
        }
        fromJSON(e) {
          return this.tree.fromJSON(e), this;
        }
      };
      function Ji(e) {
        return new Ue(e);
      }
      function os(e, i) {
        if (i = i ?? {}, !fe(i)) throw new Error("options is invalid");
        var r = i.precision, s = i.coordinates, o = i.mutate;
        if (r = r == null || isNaN(r) ? 6 : r, s = s == null || isNaN(s) ? 3 : s, !e) throw new Error("<geojson> is required");
        if (typeof r != "number") throw new Error("<precision> must be a number");
        if (typeof s != "number") throw new Error("<coordinates> must be a number");
        (o === false || o === void 0) && (e = JSON.parse(JSON.stringify(e)));
        var u = Math.pow(10, r);
        return er(e, function(h) {
          rr(h, u, s);
        }), e;
      }
      function rr(e, i, r) {
        e.length > r && e.splice(r, e.length);
        for (var s = 0; s < e.length; s++) e[s] = Math.round(e[s] * i) / i;
        return e;
      }
      function he(e) {
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
      function Ve(e) {
        if (Array.isArray(e)) return e;
        if (e.type === "Feature") {
          if (e.geometry !== null) return e.geometry.coordinates;
        } else if (e.coordinates) return e.coordinates;
        throw new Error("coords must be GeoJSON Feature, Geometry Object or an Array");
      }
      function hi(e) {
        return e.type === "Feature" ? e.geometry : e;
      }
      function ci(e, i) {
        return e.type === "FeatureCollection" ? "FeatureCollection" : e.type === "GeometryCollection" ? "GeometryCollection" : e.type === "Feature" && e.geometry !== null ? e.geometry.type : e.type;
      }
      function yn(e) {
        if (!e) throw new Error("geojson is required");
        let i = [];
        return ir(e, (r) => {
          sr(r, i);
        }), pe(i);
      }
      function sr(e, i) {
        let r = [], s = e.geometry;
        if (s !== null) {
          switch (s.type) {
            case "Polygon":
              r = Ve(s);
              break;
            case "LineString":
              r = [
                Ve(s)
              ];
          }
          r.forEach((o) => {
            us(o, e.properties).forEach((u) => {
              u.id = i.length, i.push(u);
            });
          });
        }
      }
      function us(e, i) {
        let r = [];
        return e.reduce((s, o) => {
          let u = qi([
            s,
            o
          ], i);
          return u.bbox = va(s, o), r.push(u), o;
        }), r;
      }
      function va(e, i) {
        let r = e[0], s = e[1], o = i[0], u = i[1], h = r < o ? r : o, c = s < u ? s : u, p = r > o ? r : o, f = s > u ? s : u;
        return [
          h,
          c,
          p,
          f
        ];
      }
      function Di(e, i, r = {}) {
        var s = he(e), o = he(i), u = Ei(o[1] - s[1]), h = Ei(o[0] - s[0]), c = Ei(s[1]), p = Ei(o[1]), f = Math.pow(Math.sin(u / 2), 2) + Math.pow(Math.sin(h / 2), 2) * Math.cos(c) * Math.cos(p);
        return dn(2 * Math.atan2(Math.sqrt(f), Math.sqrt(1 - f)), r.units);
      }
      var La = Object.defineProperty, ls = Object.defineProperties, ba = Object.getOwnPropertyDescriptors, ar = Object.getOwnPropertySymbols, xa = Object.prototype.hasOwnProperty, Te = Object.prototype.propertyIsEnumerable, Yi = (e, i, r) => i in e ? La(e, i, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: r
      }) : e[i] = r, Ca = (e, i) => {
        for (var r in i || (i = {})) xa.call(i, r) && Yi(e, r, i[r]);
        if (ar) for (var r of ar(i)) Te.call(i, r) && Yi(e, r, i[r]);
        return e;
      }, vn = (e, i) => ls(e, ba(i));
      function Ma(e, i, r = {}) {
        if (!e || !i) throw new Error("lines and inputPoint are required arguments");
        let s = he(i), o = wi([
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
        }), u = 0, h = 0, c = -1;
        return ir(e, function(p, f, C) {
          c !== C && (c = C, h = 0);
          let y = Ve(p), S = y.length - 2;
          for (let D = 0; D < y.length - 1; D++) {
            let U = wi(y[D]), H = he(U), X = wi(y[D + 1]), Q = he(X), x = Di(U, X, r), R, Z;
            Q[0] === s[0] && Q[1] === s[1] ? [R, Z] = [
              Q,
              true
            ] : H[0] === s[0] && H[1] === s[1] ? [R, Z] = [
              H,
              false
            ] : [R, Z] = ds(H, Q, s);
            let Y = Di(i, R, r);
            if (Y < o.properties.pointDistance) {
              let W = Di(U, R, r);
              o = wi(R, {
                lineStringIndex: C,
                segmentIndex: Z && D + 1 <= S ? D + 1 : D,
                totalDistance: u + W,
                lineDistance: h + W,
                segmentDistance: W,
                pointDistance: Y,
                multiFeatureIndex: -1,
                index: -1,
                location: -1,
                dist: 1 / 0
              }), o.properties = vn(Ca({}, o.properties), {
                multiFeatureIndex: o.properties.lineStringIndex,
                index: o.properties.segmentIndex,
                location: o.properties.totalDistance,
                dist: o.properties.pointDistance
              });
            }
            u += x, h += x;
          }
        }), o;
      }
      function Xe(e, i) {
        let [r, s, o] = e, [u, h, c] = i;
        return r * u + s * h + o * c;
      }
      function Xi(e, i) {
        let [r, s, o] = e, [u, h, c] = i;
        return [
          s * c - o * h,
          o * u - r * c,
          r * h - s * u
        ];
      }
      function $i(e) {
        return Math.sqrt(Math.pow(e[0], 2) + Math.pow(e[1], 2) + Math.pow(e[2], 2));
      }
      function hs(e) {
        let i = $i(e);
        return [
          e[0] / i,
          e[1] / i,
          e[2] / i
        ];
      }
      function $e(e) {
        let i = Ei(e[1]), r = Ei(e[0]);
        return [
          Math.cos(i) * Math.cos(r),
          Math.cos(i) * Math.sin(r),
          Math.sin(i)
        ];
      }
      function cs(e) {
        let [i, r, s] = e, o = Math.min(Math.max(s, -1), 1), u = Ye(Math.asin(o));
        return [
          Ye(Math.atan2(r, i)),
          u
        ];
      }
      function ds(e, i, r) {
        let s = $e(e), o = $e(i), u = $e(r), h = Xi(s, o);
        if (h[0] === 0 && h[1] === 0 && h[2] === 0) return Xe(s, o) > 0 ? [
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
        let c = Xi(h, u);
        if (c[0] === 0 && c[1] === 0 && c[2] === 0) return [
          [
            ...i
          ],
          true
        ];
        let p = Xi(c, h), f = hs(p), C = [
          -f[0],
          -f[1],
          -f[2]
        ], y = Xe(u, f) > Xe(u, C) ? f : C, S = hs(h), D = Xe(Xi(s, y), S), U = Xe(Xi(y, o), S);
        return D >= 0 && U >= 0 ? [
          cs(y),
          false
        ] : Xe(s, u) > Xe(o, u) ? [
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
      function ps(e, i) {
        if (!e) throw new Error("line is required");
        if (!i) throw new Error("splitter is required");
        let r = ci(e), s = ci(i);
        if (r !== "LineString") throw new Error("line must be LineString");
        if (s === "FeatureCollection") throw new Error("splitter cannot be a FeatureCollection");
        if (s === "GeometryCollection") throw new Error("splitter cannot be a GeometryCollection");
        var o = os(i, {
          precision: 7
        });
        switch (e.type !== "Feature" && (e = De(e)), s) {
          case "Point":
            return Ln(e, o);
          case "MultiPoint":
            return Oe(e, o);
          case "LineString":
          case "MultiLineString":
          case "Polygon":
          case "MultiPolygon":
            return Oe(e, as(e, o, {
              ignoreSelfIntersections: true
            }));
        }
      }
      function Oe(e, i) {
        var r = [], s = Ji();
        return ir(i, function(o) {
          if (r.forEach(function(c, p) {
            c.id = p;
          }), !r.length) r = Ln(e, o).features, s.load(pe(r));
          else {
            var u = s.search(o);
            if (u.features.length) {
              var h = or(o, u);
              r = r.filter(function(c) {
                return c.id !== h.id;
              }), s.remove(h), Si(Ln(h, o), function(c) {
                r.push(c), s.insert(c);
              });
            }
          }
        }), pe(r);
      }
      function Ln(e, i) {
        var r = [], s = Ve(e)[0], o = Ve(e)[e.geometry.coordinates.length - 1];
        if (di(s, he(i)) || di(o, he(i))) return pe([
          e
        ]);
        var u = Ji(), h = yn(e);
        u.load(h);
        var c = u.search(i);
        if (!c.features.length) return pe([
          e
        ]);
        var p = or(i, c), f = [
          s
        ], C = ya(h, function(y, S, D) {
          var U = Ve(S)[1], H = he(i);
          return D === p.id ? (y.push(H), r.push(qi(y)), di(H, U) ? [
            H
          ] : [
            H,
            U
          ]) : (y.push(U), y);
        }, f);
        return C.length > 1 && r.push(qi(C)), pe(r);
      }
      function or(e, i) {
        if (!i.features.length) throw new Error("lines must contain features");
        if (i.features.length === 1) return i.features[0];
        var r, s = 1 / 0;
        return Si(i, function(o) {
          var u = Ma(o, e), h = u.properties.dist;
          h < s && (r = o, s = h);
        }), r;
      }
      function di(e, i) {
        return e[0] === i[0] && e[1] === i[1];
      }
      var ka = ps, me = 11102230246251565e-32, Gt = 134217729, fs = (3 + 8 * me) * me;
      function bn(e, i, r, s, o) {
        let u, h, c, p, f = i[0], C = s[0], y = 0, S = 0;
        C > f == C > -f ? (u = f, f = i[++y]) : (u = C, C = s[++S]);
        let D = 0;
        if (y < e && S < r) for (C > f == C > -f ? (h = f + u, c = u - (h - f), f = i[++y]) : (h = C + u, c = u - (h - C), C = s[++S]), u = h, c !== 0 && (o[D++] = c); y < e && S < r; ) C > f == C > -f ? (h = u + f, p = h - u, c = u - (h - p) + (f - p), f = i[++y]) : (h = u + C, p = h - u, c = u - (h - p) + (C - p), C = s[++S]), u = h, c !== 0 && (o[D++] = c);
        for (; y < e; ) h = u + f, p = h - u, c = u - (h - p) + (f - p), f = i[++y], u = h, c !== 0 && (o[D++] = c);
        for (; S < r; ) h = u + C, p = h - u, c = u - (h - p) + (C - p), C = s[++S], u = h, c !== 0 && (o[D++] = c);
        return (u !== 0 || D === 0) && (o[D++] = u), D;
      }
      function wa(e, i) {
        let r = i[0];
        for (let s = 1; s < e; s++) r += i[s];
        return r;
      }
      function Ai(e) {
        return new Float64Array(e);
      }
      var _s = (3 + 16 * me) * me, ms = (2 + 12 * me) * me, gs = (9 + 64 * me) * me * me, pi = Ai(4), ys = Ai(8), ur = Ai(12), lr = Ai(16), te = Ai(4);
      function t(e, i, r, s, o, u, h) {
        let c, p, f, C, y, S, D, U, H, X, Q, x, R, Z, Y, W, J, m, g = e - o, b = r - o, B = i - u, E = s - u;
        Z = g * E, S = Gt * g, D = S - (S - g), U = g - D, S = Gt * E, H = S - (S - E), X = E - H, Y = U * X - (Z - D * H - U * H - D * X), W = B * b, S = Gt * B, D = S - (S - B), U = B - D, S = Gt * b, H = S - (S - b), X = b - H, J = U * X - (W - D * H - U * H - D * X), Q = Y - J, y = Y - Q, pi[0] = Y - (Q + y) + (y - J), x = Z + Q, y = x - Z, R = Z - (x - y) + (Q - y), Q = R - W, y = R - Q, pi[1] = R - (Q + y) + (y - W), m = x + Q, y = m - x, pi[2] = x - (m - y) + (Q - y), pi[3] = m;
        let k = wa(4, pi), F = ms * h;
        if (k >= F || -k >= F || (y = e - g, c = e - (g + y) + (y - o), y = r - b, f = r - (b + y) + (y - o), y = i - B, p = i - (B + y) + (y - u), y = s - E, C = s - (E + y) + (y - u), c === 0 && p === 0 && f === 0 && C === 0) || (F = gs * h + fs * Math.abs(k), k += g * C + E * c - (B * f + b * p), k >= F || -k >= F)) return k;
        Z = c * E, S = Gt * c, D = S - (S - c), U = c - D, S = Gt * E, H = S - (S - E), X = E - H, Y = U * X - (Z - D * H - U * H - D * X), W = p * b, S = Gt * p, D = S - (S - p), U = p - D, S = Gt * b, H = S - (S - b), X = b - H, J = U * X - (W - D * H - U * H - D * X), Q = Y - J, y = Y - Q, te[0] = Y - (Q + y) + (y - J), x = Z + Q, y = x - Z, R = Z - (x - y) + (Q - y), Q = R - W, y = R - Q, te[1] = R - (Q + y) + (y - W), m = x + Q, y = m - x, te[2] = x - (m - y) + (Q - y), te[3] = m;
        let P = bn(4, pi, 4, te, ys);
        Z = g * C, S = Gt * g, D = S - (S - g), U = g - D, S = Gt * C, H = S - (S - C), X = C - H, Y = U * X - (Z - D * H - U * H - D * X), W = B * f, S = Gt * B, D = S - (S - B), U = B - D, S = Gt * f, H = S - (S - f), X = f - H, J = U * X - (W - D * H - U * H - D * X), Q = Y - J, y = Y - Q, te[0] = Y - (Q + y) + (y - J), x = Z + Q, y = x - Z, R = Z - (x - y) + (Q - y), Q = R - W, y = R - Q, te[1] = R - (Q + y) + (y - W), m = x + Q, y = m - x, te[2] = x - (m - y) + (Q - y), te[3] = m;
        let O = bn(P, ys, 4, te, ur);
        Z = c * C, S = Gt * c, D = S - (S - c), U = c - D, S = Gt * C, H = S - (S - C), X = C - H, Y = U * X - (Z - D * H - U * H - D * X), W = p * f, S = Gt * p, D = S - (S - p), U = p - D, S = Gt * f, H = S - (S - f), X = f - H, J = U * X - (W - D * H - U * H - D * X), Q = Y - J, y = Y - Q, te[0] = Y - (Q + y) + (y - J), x = Z + Q, y = x - Z, R = Z - (x - y) + (Q - y), Q = R - W, y = R - Q, te[1] = R - (Q + y) + (y - W), m = x + Q, y = m - x, te[2] = x - (m - y) + (Q - y), te[3] = m;
        let N = bn(O, ur, 4, te, lr);
        return lr[N - 1];
      }
      function n(e, i, r, s, o, u) {
        let h = (i - u) * (r - o), c = (e - o) * (s - u), p = h - c, f = Math.abs(h + c);
        return Math.abs(p) >= _s * f ? p : -t(e, i, r, s, o, u, f);
      }
      function a(e, i) {
        var r, s, o = 0, u, h, c, p, f, C, y, S = e[0], D = e[1], U = i.length;
        for (r = 0; r < U; r++) {
          s = 0;
          var H = i[r], X = H.length - 1;
          if (C = H[0], C[0] !== H[X][0] && C[1] !== H[X][1]) throw new Error("First and last coordinates in a ring must be the same");
          for (h = C[0] - S, c = C[1] - D, s; s < X; s++) {
            if (y = H[s + 1], p = y[0] - S, f = y[1] - D, c === 0 && f === 0) {
              if (p <= 0 && h >= 0 || h <= 0 && p >= 0) return 0;
            } else if (f >= 0 && c <= 0 || f <= 0 && c >= 0) {
              if (u = n(h, p, c, f, 0, 0), u === 0) return 0;
              (u > 0 && f > 0 && c <= 0 || u < 0 && f <= 0 && c > 0) && o++;
            }
            C = y, c = f, h = p;
          }
        }
        return o % 2 !== 0;
      }
      function l(e, i, r = {}) {
        if (!e) throw new Error("point is required");
        if (!i) throw new Error("polygon is required");
        let s = he(e), o = hi(i), u = o.type, h = i.bbox, c = o.coordinates;
        if (h && d(s, h) === false) return false;
        u === "Polygon" && (c = [
          c
        ]);
        let p = false;
        for (var f = 0; f < c.length; ++f) {
          let C = a(s, c[f]);
          if (C === 0) return !r.ignoreBoundary;
          C && (p = true);
        }
        return p;
      }
      function d(e, i) {
        return i[0] <= e[0] && i[1] <= e[1] && i[2] >= e[0] && i[3] >= e[1];
      }
      function _(e, i, r = {}) {
        let s = he(e), o = Ve(i);
        for (let u = 0; u < o.length - 1; u++) {
          let h = false;
          if (r.ignoreEndVertices && (u === 0 && (h = "start"), u === o.length - 2 && (h = "end"), u === 0 && u + 1 === o.length - 1 && (h = "both")), w(o[u], o[u + 1], s, h, typeof r.epsilon > "u" ? null : r.epsilon)) return true;
        }
        return false;
      }
      function w(e, i, r, s, o) {
        let u = r[0], h = r[1], c = e[0], p = e[1], f = i[0], C = i[1], y = r[0] - c, S = r[1] - p, D = f - c, U = C - p, H = y * U - S * D;
        if (o !== null) {
          if (Math.abs(H) > o) return false;
        } else if (H !== 0) return false;
        if (Math.abs(D) === Math.abs(U) && Math.abs(D) === 0) return s ? false : r[0] === e[0] && r[1] === e[1];
        if (s) {
          if (s === "start") return Math.abs(D) >= Math.abs(U) ? D > 0 ? c < u && u <= f : f <= u && u < c : U > 0 ? p < h && h <= C : C <= h && h < p;
          if (s === "end") return Math.abs(D) >= Math.abs(U) ? D > 0 ? c <= u && u < f : f < u && u <= c : U > 0 ? p <= h && h < C : C < h && h <= p;
          if (s === "both") return Math.abs(D) >= Math.abs(U) ? D > 0 ? c < u && u < f : f < u && u < c : U > 0 ? p < h && h < C : C < h && h < p;
        } else return Math.abs(D) >= Math.abs(U) ? D > 0 ? c <= u && u <= f : f <= u && u <= c : U > 0 ? p <= h && h <= C : C <= h && h <= p;
        return false;
      }
      function I(e, i) {
        let r = hi(e), s = hi(i), o = r.type, u = s.type, h = r.coordinates, c = s.coordinates;
        switch (o) {
          case "Point":
            if (u === "Point") return hr(h, c);
            throw new Error("feature2 " + u + " geometry not supported");
          case "MultiPoint":
            switch (u) {
              case "Point":
                return tt(r, s);
              case "MultiPoint":
                return ot(r, s);
              default:
                throw new Error("feature2 " + u + " geometry not supported");
            }
          case "LineString":
            switch (u) {
              case "Point":
                return _(s, r, {
                  ignoreEndVertices: true
                });
              case "LineString":
                return Vt(r, s);
              case "MultiPoint":
                return mt(r, s);
              default:
                throw new Error("feature2 " + u + " geometry not supported");
            }
          case "Polygon":
            switch (u) {
              case "Point":
                return l(s, r, {
                  ignoreBoundary: true
                });
              case "LineString":
                return se(r, s);
              case "Polygon":
                return Qe(r, s);
              case "MultiPoint":
                return ee(r, s);
              case "MultiPolygon":
                return q(r, s);
              default:
                throw new Error("feature2 " + u + " geometry not supported");
            }
          case "MultiPolygon":
            if (u === "Polygon") return G(r, s);
            throw new Error("feature2 " + u + " geometry not supported");
          default:
            throw new Error("feature1 " + o + " geometry not supported");
        }
      }
      function G(e, i) {
        return e.coordinates.some((r) => Qe({
          type: "Polygon",
          coordinates: r
        }, i));
      }
      function q(e, i) {
        return i.coordinates.every((r) => Qe(e, {
          type: "Polygon",
          coordinates: r
        }));
      }
      function tt(e, i) {
        let r, s = false;
        for (r = 0; r < e.coordinates.length; r++) if (hr(e.coordinates[r], i.coordinates)) {
          s = true;
          break;
        }
        return s;
      }
      function ot(e, i) {
        for (let r of i.coordinates) {
          let s = false;
          for (let o of e.coordinates) if (hr(r, o)) {
            s = true;
            break;
          }
          if (!s) return false;
        }
        return true;
      }
      function mt(e, i) {
        let r = false;
        for (let s of i.coordinates) if (_(s, e, {
          ignoreEndVertices: true
        }) && (r = true), !_(s, e)) return false;
        return !!r;
      }
      function ee(e, i) {
        for (let r of i.coordinates) if (!l(r, e, {
          ignoreBoundary: true
        })) return false;
        return true;
      }
      function Vt(e, i) {
        let r = false;
        for (let s of i.coordinates) if (_({
          type: "Point",
          coordinates: s
        }, e, {
          ignoreEndVertices: true
        }) && (r = true), !_({
          type: "Point",
          coordinates: s
        }, e, {
          ignoreEndVertices: false
        })) return false;
        return r;
      }
      function ge(e, i) {
        let r = e.coordinates, s = [];
        for (let o = 0; o < r.length - 1; o++) {
          let u = qi([
            r[o],
            r[o + 1]
          ]), h = ps(u, De(i));
          h.features.length === 0 ? s.push(u) : s.push(...h.features);
        }
        return pe(s);
      }
      function se(e, i) {
        let r = Qt(e), s = Qt(i);
        if (!vs(r, s)) return false;
        for (let h of i.coordinates) if (!l(h, e)) return false;
        let o = false, u = ge(i, e);
        for (let h of u.features) {
          let c = Ea(h.geometry.coordinates[0], h.geometry.coordinates[1]);
          if (!l(c, e)) return false;
          !o && l(c, e, {
            ignoreBoundary: true
          }) && (o = true);
        }
        return o;
      }
      function Qe(e, i) {
        if (e.type === "Feature" && e.geometry === null || i.type === "Feature" && i.geometry === null) return false;
        let r = Qt(e), s = Qt(i);
        if (!vs(r, s)) return false;
        let o = hi(i).coordinates;
        for (let u of o) for (let h of u) if (!l(h, e)) return false;
        return true;
      }
      function vs(e, i) {
        return !(e[0] > i[0] || e[2] < i[2] || e[1] > i[1] || e[3] < i[3]);
      }
      function hr(e, i) {
        return e[0] === i[0] && e[1] === i[1];
      }
      function Ea(e, i) {
        return [
          (e[0] + i[0]) / 2,
          (e[1] + i[1]) / 2
        ];
      }
      var Ls = I, Ba = et(qe()), bs = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, Rt = Math.ceil, ie = Math.floor, ae = "[BigNumber Error] ", xs = ae + "Number primitive has more than 15 significant digits: ", Me = 1e14, lt = 14, xn = 9007199254740991, cr = [
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
      ], Ti = 1e7, Wt = 1e9;
      function ja(e) {
        var i, r, s, o = x.prototype = {
          constructor: x,
          toString: null,
          valueOf: null
        }, u = new x(1), h = 20, c = 4, p = -7, f = 21, C = -1e7, y = 1e7, S = false, D = 1, U = 0, H = {
          prefix: "",
          groupSize: 3,
          secondaryGroupSize: 0,
          groupSeparator: ",",
          decimalSeparator: ".",
          fractionGroupSize: 0,
          fractionGroupSeparator: "\xA0",
          suffix: ""
        }, X = "0123456789abcdefghijklmnopqrstuvwxyz", Q = true;
        function x(m, g) {
          var b, B, E, k, F, P, O, N, z = this;
          if (!(z instanceof x)) return new x(m, g);
          if (g == null) {
            if (m && m._isBigNumber === true) {
              z.s = m.s, !m.c || m.e > y ? z.c = z.e = null : m.e < C ? z.c = [
                z.e = 0
              ] : (z.e = m.e, z.c = m.c.slice());
              return;
            }
            if ((P = typeof m == "number") && m * 0 == 0) {
              if (z.s = 1 / m < 0 ? (m = -m, -1) : 1, m === ~~m) {
                for (k = 0, F = m; F >= 10; F /= 10, k++) ;
                k > y ? z.c = z.e = null : (z.e = k, z.c = [
                  m
                ]);
                return;
              }
              N = String(m);
            } else {
              if (!bs.test(N = String(m))) return s(z, N, P);
              z.s = N.charCodeAt(0) == 45 ? (N = N.slice(1), -1) : 1;
            }
            (k = N.indexOf(".")) > -1 && (N = N.replace(".", "")), (F = N.search(/e/i)) > 0 ? (k < 0 && (k = F), k += +N.slice(F + 1), N = N.substring(0, F)) : k < 0 && (k = N.length);
          } else {
            if (zt(g, 2, X.length, "Base"), g == 10 && Q) return z = new x(m), W(z, h + z.e + 1, c);
            if (N = String(m), P = typeof m == "number") {
              if (m * 0 != 0) return s(z, N, P, g);
              if (z.s = 1 / m < 0 ? (N = N.slice(1), -1) : 1, x.DEBUG && N.replace(/^0\.0*|\./, "").length > 15) throw Error(xs + m);
            } else z.s = N.charCodeAt(0) === 45 ? (N = N.slice(1), -1) : 1;
            for (b = X.slice(0, g), k = F = 0, O = N.length; F < O; F++) if (b.indexOf(B = N.charAt(F)) < 0) {
              if (B == ".") {
                if (F > k) {
                  k = O;
                  continue;
                }
              } else if (!E && (N == N.toUpperCase() && (N = N.toLowerCase()) || N == N.toLowerCase() && (N = N.toUpperCase()))) {
                E = true, F = -1, k = 0;
                continue;
              }
              return s(z, String(m), P, g);
            }
            P = false, N = r(N, g, 10, z.s), (k = N.indexOf(".")) > -1 ? N = N.replace(".", "") : k = N.length;
          }
          for (F = 0; N.charCodeAt(F) === 48; F++) ;
          for (O = N.length; N.charCodeAt(--O) === 48; ) ;
          if (N = N.slice(F, ++O)) {
            if (O -= F, P && x.DEBUG && O > 15 && (m > xn || m !== ie(m))) throw Error(xs + z.s * m);
            if ((k = k - F - 1) > y) z.c = z.e = null;
            else if (k < C) z.c = [
              z.e = 0
            ];
            else {
              if (z.e = k, z.c = [], F = (k + 1) % lt, k < 0 && (F += lt), F < O) {
                for (F && z.c.push(+N.slice(0, F)), O -= lt; F < O; ) z.c.push(+N.slice(F, F += lt));
                F = lt - (N = N.slice(F)).length;
              } else F -= O;
              for (; F--; N += "0") ;
              z.c.push(+N);
            }
          } else z.c = [
            z.e = 0
          ];
        }
        x.clone = ja, x.ROUND_UP = 0, x.ROUND_DOWN = 1, x.ROUND_CEIL = 2, x.ROUND_FLOOR = 3, x.ROUND_HALF_UP = 4, x.ROUND_HALF_DOWN = 5, x.ROUND_HALF_EVEN = 6, x.ROUND_HALF_CEIL = 7, x.ROUND_HALF_FLOOR = 8, x.EUCLID = 9, x.config = x.set = function(m) {
          var g, b;
          if (m != null) if (typeof m == "object") {
            if (m.hasOwnProperty(g = "DECIMAL_PLACES") && (b = m[g], zt(b, 0, Wt, g), h = b), m.hasOwnProperty(g = "ROUNDING_MODE") && (b = m[g], zt(b, 0, 8, g), c = b), m.hasOwnProperty(g = "EXPONENTIAL_AT") && (b = m[g], b && b.pop ? (zt(b[0], -Wt, 0, g), zt(b[1], 0, Wt, g), p = b[0], f = b[1]) : (zt(b, -Wt, Wt, g), p = -(f = b < 0 ? -b : b))), m.hasOwnProperty(g = "RANGE")) if (b = m[g], b && b.pop) zt(b[0], -Wt, -1, g), zt(b[1], 1, Wt, g), C = b[0], y = b[1];
            else if (zt(b, -Wt, Wt, g), b) C = -(y = b < 0 ? -b : b);
            else throw Error(ae + g + " cannot be zero: " + b);
            if (m.hasOwnProperty(g = "CRYPTO")) if (b = m[g], b === !!b) if (b) if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes)) S = b;
            else throw S = !b, Error(ae + "crypto unavailable");
            else S = b;
            else throw Error(ae + g + " not true or false: " + b);
            if (m.hasOwnProperty(g = "MODULO_MODE") && (b = m[g], zt(b, 0, 9, g), D = b), m.hasOwnProperty(g = "POW_PRECISION") && (b = m[g], zt(b, 0, Wt, g), U = b), m.hasOwnProperty(g = "FORMAT")) if (b = m[g], typeof b == "object") H = b;
            else throw Error(ae + g + " not an object: " + b);
            if (m.hasOwnProperty(g = "ALPHABET")) if (b = m[g], typeof b == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(b)) Q = b.slice(0, 10) == "0123456789", X = b;
            else throw Error(ae + g + " invalid: " + b);
          } else throw Error(ae + "Object expected: " + m);
          return {
            DECIMAL_PLACES: h,
            ROUNDING_MODE: c,
            EXPONENTIAL_AT: [
              p,
              f
            ],
            RANGE: [
              C,
              y
            ],
            CRYPTO: S,
            MODULO_MODE: D,
            POW_PRECISION: U,
            FORMAT: H,
            ALPHABET: X
          };
        }, x.isBigNumber = function(m) {
          if (!m || m._isBigNumber !== true) return false;
          if (!x.DEBUG) return true;
          var g, b, B = m.c, E = m.e, k = m.s;
          t: if ({}.toString.call(B) == "[object Array]") {
            if ((k === 1 || k === -1) && E >= -Wt && E <= Wt && E === ie(E)) {
              if (B[0] === 0) {
                if (E === 0 && B.length === 1) return true;
                break t;
              }
              if (g = (E + 1) % lt, g < 1 && (g += lt), String(B[0]).length == g) {
                for (g = 0; g < B.length; g++) if (b = B[g], b < 0 || b >= Me || b !== ie(b)) break t;
                if (b !== 0) return true;
              }
            }
          } else if (B === null && E === null && (k === null || k === 1 || k === -1)) return true;
          throw Error(ae + "Invalid BigNumber: " + m);
        }, x.maximum = x.max = function() {
          return Z(arguments, -1);
        }, x.minimum = x.min = function() {
          return Z(arguments, 1);
        }, x.random = (function() {
          var m = 9007199254740992, g = Math.random() * m & 2097151 ? function() {
            return ie(Math.random() * m);
          } : function() {
            return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0);
          };
          return function(b) {
            var B, E, k, F, P, O = 0, N = [], z = new x(u);
            if (b == null ? b = h : zt(b, 0, Wt), F = Rt(b / lt), S) if (crypto.getRandomValues) {
              for (B = crypto.getRandomValues(new Uint32Array(F *= 2)); O < F; ) P = B[O] * 131072 + (B[O + 1] >>> 11), P >= 9e15 ? (E = crypto.getRandomValues(new Uint32Array(2)), B[O] = E[0], B[O + 1] = E[1]) : (N.push(P % 1e14), O += 2);
              O = F / 2;
            } else if (crypto.randomBytes) {
              for (B = crypto.randomBytes(F *= 7); O < F; ) P = (B[O] & 31) * 281474976710656 + B[O + 1] * 1099511627776 + B[O + 2] * 4294967296 + B[O + 3] * 16777216 + (B[O + 4] << 16) + (B[O + 5] << 8) + B[O + 6], P >= 9e15 ? crypto.randomBytes(7).copy(B, O) : (N.push(P % 1e14), O += 7);
              O = F / 7;
            } else throw S = false, Error(ae + "crypto unavailable");
            if (!S) for (; O < F; ) P = g(), P < 9e15 && (N[O++] = P % 1e14);
            for (F = N[--O], b %= lt, F && b && (P = cr[lt - b], N[O] = ie(F / P) * P); N[O] === 0; N.pop(), O--) ;
            if (O < 0) N = [
              k = 0
            ];
            else {
              for (k = -1; N[0] === 0; N.splice(0, 1), k -= lt) ;
              for (O = 1, P = N[0]; P >= 10; P /= 10, O++) ;
              O < lt && (k -= lt - O);
            }
            return z.e = k, z.c = N, z;
          };
        })(), x.sum = function() {
          for (var m = 1, g = arguments, b = new x(g[0]); m < g.length; ) b = b.plus(g[m++]);
          return b;
        }, r = /* @__PURE__ */ (function() {
          var m = "0123456789";
          function g(b, B, E, k) {
            for (var F, P = [
              0
            ], O, N = 0, z = b.length; N < z; ) {
              for (O = P.length; O--; P[O] *= B) ;
              for (P[0] += k.indexOf(b.charAt(N++)), F = 0; F < P.length; F++) P[F] > E - 1 && (P[F + 1] == null && (P[F + 1] = 0), P[F + 1] += P[F] / E | 0, P[F] %= E);
            }
            return P.reverse();
          }
          return function(b, B, E, k, F) {
            var P, O, N, z, K, it, nt, ct, jt = b.indexOf("."), Kt = h, kt = c;
            for (jt >= 0 && (z = U, U = 0, b = b.replace(".", ""), ct = new x(B), it = ct.pow(b.length - jt), U = z, ct.c = g(fi(Fe(it.c), it.e, "0"), 10, E, m), ct.e = ct.c.length), nt = g(b, B, E, F ? (P = X, m) : (P = m, X)), N = z = nt.length; nt[--z] == 0; nt.pop()) ;
            if (!nt[0]) return P.charAt(0);
            if (jt < 0 ? --N : (it.c = nt, it.e = N, it.s = k, it = i(it, ct, Kt, kt, E), nt = it.c, K = it.r, N = it.e), O = N + Kt + 1, jt = nt[O], z = E / 2, K = K || O < 0 || nt[O + 1] != null, K = kt < 4 ? (jt != null || K) && (kt == 0 || kt == (it.s < 0 ? 3 : 2)) : jt > z || jt == z && (kt == 4 || K || kt == 6 && nt[O - 1] & 1 || kt == (it.s < 0 ? 8 : 7)), O < 1 || !nt[0]) b = K ? fi(P.charAt(1), -Kt, P.charAt(0)) : P.charAt(0);
            else {
              if (nt.length = O, K) for (--E; ++nt[--O] > E; ) nt[O] = 0, O || (++N, nt = [
                1
              ].concat(nt));
              for (z = nt.length; !nt[--z]; ) ;
              for (jt = 0, b = ""; jt <= z; b += P.charAt(nt[jt++])) ;
              b = fi(b, N, P.charAt(0));
            }
            return b;
          };
        })(), i = /* @__PURE__ */ (function() {
          function m(B, E, k) {
            var F, P, O, N, z = 0, K = B.length, it = E % Ti, nt = E / Ti | 0;
            for (B = B.slice(); K--; ) O = B[K] % Ti, N = B[K] / Ti | 0, F = nt * O + N * it, P = it * O + F % Ti * Ti + z, z = (P / k | 0) + (F / Ti | 0) + nt * N, B[K] = P % k;
            return z && (B = [
              z
            ].concat(B)), B;
          }
          function g(B, E, k, F) {
            var P, O;
            if (k != F) O = k > F ? 1 : -1;
            else for (P = O = 0; P < k; P++) if (B[P] != E[P]) {
              O = B[P] > E[P] ? 1 : -1;
              break;
            }
            return O;
          }
          function b(B, E, k, F) {
            for (var P = 0; k--; ) B[k] -= P, P = B[k] < E[k] ? 1 : 0, B[k] = P * F + B[k] - E[k];
            for (; !B[0] && B.length > 1; B.splice(0, 1)) ;
          }
          return function(B, E, k, F, P) {
            var O, N, z, K, it, nt, ct, jt, Kt, kt, Pt, oe, Ts, Ta, Oa, ii, _r, Ie = B.s == E.s ? 1 : -1, ce = B.c, Zt = E.c;
            if (!ce || !ce[0] || !Zt || !Zt[0]) return new x(!B.s || !E.s || (ce ? Zt && ce[0] == Zt[0] : !Zt) ? NaN : ce && ce[0] == 0 || !Zt ? Ie * 0 : Ie / 0);
            for (jt = new x(Ie), Kt = jt.c = [], N = B.e - E.e, Ie = k + N + 1, P || (P = Me, N = Re(B.e / lt) - Re(E.e / lt), Ie = Ie / lt | 0), z = 0; Zt[z] == (ce[z] || 0); z++) ;
            if (Zt[z] > (ce[z] || 0) && N--, Ie < 0) Kt.push(1), K = true;
            else {
              for (Ta = ce.length, ii = Zt.length, z = 0, Ie += 2, it = ie(P / (Zt[0] + 1)), it > 1 && (Zt = m(Zt, it, P), ce = m(ce, it, P), ii = Zt.length, Ta = ce.length), Ts = ii, kt = ce.slice(0, ii), Pt = kt.length; Pt < ii; kt[Pt++] = 0) ;
              _r = Zt.slice(), _r = [
                0
              ].concat(_r), Oa = Zt[0], Zt[1] >= P / 2 && Oa++;
              do {
                if (it = 0, O = g(Zt, kt, ii, Pt), O < 0) {
                  if (oe = kt[0], ii != Pt && (oe = oe * P + (kt[1] || 0)), it = ie(oe / Oa), it > 1) for (it >= P && (it = P - 1), nt = m(Zt, it, P), ct = nt.length, Pt = kt.length; g(nt, kt, ct, Pt) == 1; ) it--, b(nt, ii < ct ? _r : Zt, ct, P), ct = nt.length, O = 1;
                  else it == 0 && (O = it = 1), nt = Zt.slice(), ct = nt.length;
                  if (ct < Pt && (nt = [
                    0
                  ].concat(nt)), b(kt, nt, Pt, P), Pt = kt.length, O == -1) for (; g(Zt, kt, ii, Pt) < 1; ) it++, b(kt, ii < Pt ? _r : Zt, Pt, P), Pt = kt.length;
                } else O === 0 && (it++, kt = [
                  0
                ]);
                Kt[z++] = it, kt[0] ? kt[Pt++] = ce[Ts] || 0 : (kt = [
                  ce[Ts]
                ], Pt = 1);
              } while ((Ts++ < Ta || kt[0] != null) && Ie--);
              K = kt[0] != null, Kt[0] || Kt.splice(0, 1);
            }
            if (P == Me) {
              for (z = 1, Ie = Kt[0]; Ie >= 10; Ie /= 10, z++) ;
              W(jt, k + (jt.e = z + N * lt - 1) + 1, F, K);
            } else jt.e = N, jt.r = +K;
            return jt;
          };
        })();
        function R(m, g, b, B) {
          var E, k, F, P, O;
          if (b == null ? b = c : zt(b, 0, 8), !m.c) return m.toString();
          if (E = m.c[0], F = m.e, g == null) O = Fe(m.c), O = B == 1 || B == 2 && (F <= p || F >= f) ? Ms(O, F) : fi(O, F, "0");
          else if (m = W(new x(m), g, b), k = m.e, O = Fe(m.c), P = O.length, B == 1 || B == 2 && (g <= k || k <= p)) {
            for (; P < g; O += "0", P++) ;
            O = Ms(O, k);
          } else if (g -= F + (B === 2 && k > F), O = fi(O, k, "0"), k + 1 > P) {
            if (--g > 0) for (O += "."; g--; O += "0") ;
          } else if (g += k - P, g > 0) for (k + 1 == P && (O += "."); g--; O += "0") ;
          return m.s < 0 && E ? "-" + O : O;
        }
        function Z(m, g) {
          for (var b, B, E = 1, k = new x(m[0]); E < m.length; E++) B = new x(m[E]), (!B.s || (b = Qi(k, B)) === g || b === 0 && k.s === g) && (k = B);
          return k;
        }
        function Y(m, g, b) {
          for (var B = 1, E = g.length; !g[--E]; g.pop()) ;
          for (E = g[0]; E >= 10; E /= 10, B++) ;
          return (b = B + b * lt - 1) > y ? m.c = m.e = null : b < C ? m.c = [
            m.e = 0
          ] : (m.e = b, m.c = g), m;
        }
        s = /* @__PURE__ */ (function() {
          var m = /^(-?)0([xbo])(?=\w[\w.]*$)/i, g = /^([^.]+)\.$/, b = /^\.([^.]+)$/, B = /^-?(Infinity|NaN)$/, E = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
          return function(k, F, P, O) {
            var N, z = P ? F : F.replace(E, "");
            if (B.test(z)) k.s = isNaN(z) ? null : z < 0 ? -1 : 1;
            else {
              if (!P && (z = z.replace(m, function(K, it, nt) {
                return N = (nt = nt.toLowerCase()) == "x" ? 16 : nt == "b" ? 2 : 8, !O || O == N ? it : K;
              }), O && (N = O, z = z.replace(g, "$1").replace(b, "0.$1")), F != z)) return new x(z, N);
              if (x.DEBUG) throw Error(ae + "Not a" + (O ? " base " + O : "") + " number: " + F);
              k.s = null;
            }
            k.c = k.e = null;
          };
        })();
        function W(m, g, b, B) {
          var E, k, F, P, O, N, z, K = m.c, it = cr;
          if (K) {
            t: {
              for (E = 1, P = K[0]; P >= 10; P /= 10, E++) ;
              if (k = g - E, k < 0) k += lt, F = g, O = K[N = 0], z = ie(O / it[E - F - 1] % 10);
              else if (N = Rt((k + 1) / lt), N >= K.length) if (B) {
                for (; K.length <= N; K.push(0)) ;
                O = z = 0, E = 1, k %= lt, F = k - lt + 1;
              } else break t;
              else {
                for (O = P = K[N], E = 1; P >= 10; P /= 10, E++) ;
                k %= lt, F = k - lt + E, z = F < 0 ? 0 : ie(O / it[E - F - 1] % 10);
              }
              if (B = B || g < 0 || K[N + 1] != null || (F < 0 ? O : O % it[E - F - 1]), B = b < 4 ? (z || B) && (b == 0 || b == (m.s < 0 ? 3 : 2)) : z > 5 || z == 5 && (b == 4 || B || b == 6 && (k > 0 ? F > 0 ? O / it[E - F] : 0 : K[N - 1]) % 10 & 1 || b == (m.s < 0 ? 8 : 7)), g < 1 || !K[0]) return K.length = 0, B ? (g -= m.e + 1, K[0] = it[(lt - g % lt) % lt], m.e = -g || 0) : K[0] = m.e = 0, m;
              if (k == 0 ? (K.length = N, P = 1, N--) : (K.length = N + 1, P = it[lt - k], K[N] = F > 0 ? ie(O / it[E - F] % it[F]) * P : 0), B) for (; ; ) if (N == 0) {
                for (k = 1, F = K[0]; F >= 10; F /= 10, k++) ;
                for (F = K[0] += P, P = 1; F >= 10; F /= 10, P++) ;
                k != P && (m.e++, K[0] == Me && (K[0] = 1));
                break;
              } else {
                if (K[N] += P, K[N] != Me) break;
                K[N--] = 0, P = 1;
              }
              for (k = K.length; K[--k] === 0; K.pop()) ;
            }
            m.e > y ? m.c = m.e = null : m.e < C && (m.c = [
              m.e = 0
            ]);
          }
          return m;
        }
        function J(m) {
          var g, b = m.e;
          return b === null ? m.toString() : (g = Fe(m.c), g = b <= p || b >= f ? Ms(g, b) : fi(g, b, "0"), m.s < 0 ? "-" + g : g);
        }
        return o.absoluteValue = o.abs = function() {
          var m = new x(this);
          return m.s < 0 && (m.s = 1), m;
        }, o.comparedTo = function(m, g) {
          return Qi(this, new x(m, g));
        }, o.decimalPlaces = o.dp = function(m, g) {
          var b, B, E, k = this;
          if (m != null) return zt(m, 0, Wt), g == null ? g = c : zt(g, 0, 8), W(new x(k), m + k.e + 1, g);
          if (!(b = k.c)) return null;
          if (B = ((E = b.length - 1) - Re(this.e / lt)) * lt, E = b[E]) for (; E % 10 == 0; E /= 10, B--) ;
          return B < 0 && (B = 0), B;
        }, o.dividedBy = o.div = function(m, g) {
          return i(this, new x(m, g), h, c);
        }, o.dividedToIntegerBy = o.idiv = function(m, g) {
          return i(this, new x(m, g), 0, 1);
        }, o.exponentiatedBy = o.pow = function(m, g) {
          var b, B, E, k, F, P, O, N, z, K = this;
          if (m = new x(m), m.c && !m.isInteger()) throw Error(ae + "Exponent not an integer: " + J(m));
          if (g != null && (g = new x(g)), P = m.e > 14, !K.c || !K.c[0] || K.c[0] == 1 && !K.e && K.c.length == 1 || !m.c || !m.c[0]) return z = new x(Math.pow(+J(K), P ? m.s * (2 - Cs(m)) : +J(m))), g ? z.mod(g) : z;
          if (O = m.s < 0, g) {
            if (g.c ? !g.c[0] : !g.s) return new x(NaN);
            B = !O && K.isInteger() && g.isInteger(), B && (K = K.mod(g));
          } else {
            if (m.e > 9 && (K.e > 0 || K.e < -1 || (K.e == 0 ? K.c[0] > 1 || P && K.c[1] >= 24e7 : K.c[0] < 8e13 || P && K.c[0] <= 9999975e7))) return k = K.s < 0 && Cs(m) ? -0 : 0, K.e > -1 && (k = 1 / k), new x(O ? 1 / k : k);
            U && (k = Rt(U / lt + 2));
          }
          for (P ? (b = new x(0.5), O && (m.s = 1), N = Cs(m)) : (E = Math.abs(+J(m)), N = E % 2), z = new x(u); ; ) {
            if (N) {
              if (z = z.times(K), !z.c) break;
              k ? z.c.length > k && (z.c.length = k) : B && (z = z.mod(g));
            }
            if (E) {
              if (E = ie(E / 2), E === 0) break;
              N = E % 2;
            } else if (m = m.times(b), W(m, m.e + 1, 1), m.e > 14) N = Cs(m);
            else {
              if (E = +J(m), E === 0) break;
              N = E % 2;
            }
            K = K.times(K), k ? K.c && K.c.length > k && (K.c.length = k) : B && (K = K.mod(g));
          }
          return B ? z : (O && (z = u.div(z)), g ? z.mod(g) : k ? W(z, U, c, F) : z);
        }, o.integerValue = function(m) {
          var g = new x(this);
          return m == null ? m = c : zt(m, 0, 8), W(g, g.e + 1, m);
        }, o.isEqualTo = o.eq = function(m, g) {
          return Qi(this, new x(m, g)) === 0;
        }, o.isFinite = function() {
          return !!this.c;
        }, o.isGreaterThan = o.gt = function(m, g) {
          return Qi(this, new x(m, g)) > 0;
        }, o.isGreaterThanOrEqualTo = o.gte = function(m, g) {
          return (g = Qi(this, new x(m, g))) === 1 || g === 0;
        }, o.isInteger = function() {
          return !!this.c && Re(this.e / lt) > this.c.length - 2;
        }, o.isLessThan = o.lt = function(m, g) {
          return Qi(this, new x(m, g)) < 0;
        }, o.isLessThanOrEqualTo = o.lte = function(m, g) {
          return (g = Qi(this, new x(m, g))) === -1 || g === 0;
        }, o.isNaN = function() {
          return !this.s;
        }, o.isNegative = function() {
          return this.s < 0;
        }, o.isPositive = function() {
          return this.s > 0;
        }, o.isZero = function() {
          return !!this.c && this.c[0] == 0;
        }, o.minus = function(m, g) {
          var b, B, E, k, F = this, P = F.s;
          if (m = new x(m, g), g = m.s, !P || !g) return new x(NaN);
          if (P != g) return m.s = -g, F.plus(m);
          var O = F.e / lt, N = m.e / lt, z = F.c, K = m.c;
          if (!O || !N) {
            if (!z || !K) return z ? (m.s = -g, m) : new x(K ? F : NaN);
            if (!z[0] || !K[0]) return K[0] ? (m.s = -g, m) : new x(z[0] ? F : c == 3 ? -0 : 0);
          }
          if (O = Re(O), N = Re(N), z = z.slice(), P = O - N) {
            for ((k = P < 0) ? (P = -P, E = z) : (N = O, E = K), E.reverse(), g = P; g--; E.push(0)) ;
            E.reverse();
          } else for (B = (k = (P = z.length) < (g = K.length)) ? P : g, P = g = 0; g < B; g++) if (z[g] != K[g]) {
            k = z[g] < K[g];
            break;
          }
          if (k && (E = z, z = K, K = E, m.s = -m.s), g = (B = K.length) - (b = z.length), g > 0) for (; g--; z[b++] = 0) ;
          for (g = Me - 1; B > P; ) {
            if (z[--B] < K[B]) {
              for (b = B; b && !z[--b]; z[b] = g) ;
              --z[b], z[B] += Me;
            }
            z[B] -= K[B];
          }
          for (; z[0] == 0; z.splice(0, 1), --N) ;
          return z[0] ? Y(m, z, N) : (m.s = c == 3 ? -1 : 1, m.c = [
            m.e = 0
          ], m);
        }, o.modulo = o.mod = function(m, g) {
          var b, B, E = this;
          return m = new x(m, g), !E.c || !m.s || m.c && !m.c[0] ? new x(NaN) : !m.c || E.c && !E.c[0] ? new x(E) : (D == 9 ? (B = m.s, m.s = 1, b = i(E, m, 0, 3), m.s = B, b.s *= B) : b = i(E, m, 0, D), m = E.minus(b.times(m)), !m.c[0] && D == 1 && (m.s = E.s), m);
        }, o.multipliedBy = o.times = function(m, g) {
          var b, B, E, k, F, P, O, N, z, K, it, nt, ct, jt, Kt, kt = this, Pt = kt.c, oe = (m = new x(m, g)).c;
          if (!Pt || !oe || !Pt[0] || !oe[0]) return !kt.s || !m.s || Pt && !Pt[0] && !oe || oe && !oe[0] && !Pt ? m.c = m.e = m.s = null : (m.s *= kt.s, !Pt || !oe ? m.c = m.e = null : (m.c = [
            0
          ], m.e = 0)), m;
          for (B = Re(kt.e / lt) + Re(m.e / lt), m.s *= kt.s, O = Pt.length, K = oe.length, O < K && (ct = Pt, Pt = oe, oe = ct, E = O, O = K, K = E), E = O + K, ct = []; E--; ct.push(0)) ;
          for (jt = Me, Kt = Ti, E = K; --E >= 0; ) {
            for (b = 0, it = oe[E] % Kt, nt = oe[E] / Kt | 0, F = O, k = E + F; k > E; ) N = Pt[--F] % Kt, z = Pt[F] / Kt | 0, P = nt * N + z * it, N = it * N + P % Kt * Kt + ct[k] + b, b = (N / jt | 0) + (P / Kt | 0) + nt * z, ct[k--] = N % jt;
            ct[k] = b;
          }
          return b ? ++B : ct.splice(0, 1), Y(m, ct, B);
        }, o.negated = function() {
          var m = new x(this);
          return m.s = -m.s || null, m;
        }, o.plus = function(m, g) {
          var b, B = this, E = B.s;
          if (m = new x(m, g), g = m.s, !E || !g) return new x(NaN);
          if (E != g) return m.s = -g, B.minus(m);
          var k = B.e / lt, F = m.e / lt, P = B.c, O = m.c;
          if (!k || !F) {
            if (!P || !O) return new x(E / 0);
            if (!P[0] || !O[0]) return O[0] ? m : new x(P[0] ? B : E * 0);
          }
          if (k = Re(k), F = Re(F), P = P.slice(), E = k - F) {
            for (E > 0 ? (F = k, b = O) : (E = -E, b = P), b.reverse(); E--; b.push(0)) ;
            b.reverse();
          }
          for (E = P.length, g = O.length, E - g < 0 && (b = O, O = P, P = b, g = E), E = 0; g; ) E = (P[--g] = P[g] + O[g] + E) / Me | 0, P[g] = Me === P[g] ? 0 : P[g] % Me;
          return E && (P = [
            E
          ].concat(P), ++F), Y(m, P, F);
        }, o.precision = o.sd = function(m, g) {
          var b, B, E, k = this;
          if (m != null && m !== !!m) return zt(m, 1, Wt), g == null ? g = c : zt(g, 0, 8), W(new x(k), m, g);
          if (!(b = k.c)) return null;
          if (E = b.length - 1, B = E * lt + 1, E = b[E]) {
            for (; E % 10 == 0; E /= 10, B--) ;
            for (E = b[0]; E >= 10; E /= 10, B++) ;
          }
          return m && k.e + 1 > B && (B = k.e + 1), B;
        }, o.shiftedBy = function(m) {
          return zt(m, -xn, xn), this.times("1e" + m);
        }, o.squareRoot = o.sqrt = function() {
          var m, g, b, B, E, k = this, F = k.c, P = k.s, O = k.e, N = h + 4, z = new x("0.5");
          if (P !== 1 || !F || !F[0]) return new x(!P || P < 0 && (!F || F[0]) ? NaN : F ? k : 1 / 0);
          if (P = Math.sqrt(+J(k)), P == 0 || P == 1 / 0 ? (g = Fe(F), (g.length + O) % 2 == 0 && (g += "0"), P = Math.sqrt(+g), O = Re((O + 1) / 2) - (O < 0 || O % 2), P == 1 / 0 ? g = "5e" + O : (g = P.toExponential(), g = g.slice(0, g.indexOf("e") + 1) + O), b = new x(g)) : b = new x(P + ""), b.c[0]) {
            for (O = b.e, P = O + N, P < 3 && (P = 0); ; ) if (E = b, b = z.times(E.plus(i(k, E, N, 1))), Fe(E.c).slice(0, P) === (g = Fe(b.c)).slice(0, P)) if (b.e < O && --P, g = g.slice(P - 3, P + 1), g == "9999" || !B && g == "4999") {
              if (!B && (W(E, E.e + h + 2, 0), E.times(E).eq(k))) {
                b = E;
                break;
              }
              N += 4, P += 4, B = 1;
            } else {
              (!+g || !+g.slice(1) && g.charAt(0) == "5") && (W(b, b.e + h + 2, 1), m = !b.times(b).eq(k));
              break;
            }
          }
          return W(b, b.e + h + 1, c, m);
        }, o.toExponential = function(m, g) {
          return m != null && (zt(m, 0, Wt), m++), R(this, m, g, 1);
        }, o.toFixed = function(m, g) {
          return m != null && (zt(m, 0, Wt), m = m + this.e + 1), R(this, m, g);
        }, o.toFormat = function(m, g, b) {
          var B, E = this;
          if (b == null) m != null && g && typeof g == "object" ? (b = g, g = null) : m && typeof m == "object" ? (b = m, m = g = null) : b = H;
          else if (typeof b != "object") throw Error(ae + "Argument not an object: " + b);
          if (B = E.toFixed(m, g), E.c) {
            var k, F = B.split("."), P = +b.groupSize, O = +b.secondaryGroupSize, N = b.groupSeparator || "", z = F[0], K = F[1], it = E.s < 0, nt = it ? z.slice(1) : z, ct = nt.length;
            if (O && (k = P, P = O, O = k, ct -= k), P > 0 && ct > 0) {
              for (k = ct % P || P, z = nt.substr(0, k); k < ct; k += P) z += N + nt.substr(k, P);
              O > 0 && (z += N + nt.slice(k)), it && (z = "-" + z);
            }
            B = K ? z + (b.decimalSeparator || "") + ((O = +b.fractionGroupSize) ? K.replace(new RegExp("\\d{" + O + "}\\B", "g"), "$&" + (b.fractionGroupSeparator || "")) : K) : z;
          }
          return (b.prefix || "") + B + (b.suffix || "");
        }, o.toFraction = function(m) {
          var g, b, B, E, k, F, P, O, N, z, K, it, nt = this, ct = nt.c;
          if (m != null && (P = new x(m), !P.isInteger() && (P.c || P.s !== 1) || P.lt(u))) throw Error(ae + "Argument " + (P.isInteger() ? "out of range: " : "not an integer: ") + J(P));
          if (!ct) return new x(nt);
          for (g = new x(u), N = b = new x(u), B = O = new x(u), it = Fe(ct), k = g.e = it.length - nt.e - 1, g.c[0] = cr[(F = k % lt) < 0 ? lt + F : F], m = !m || P.comparedTo(g) > 0 ? k > 0 ? g : N : P, F = y, y = 1 / 0, P = new x(it), O.c[0] = 0; z = i(P, g, 0, 1), E = b.plus(z.times(B)), E.comparedTo(m) != 1; ) b = B, B = E, N = O.plus(z.times(E = N)), O = E, g = P.minus(z.times(E = g)), P = E;
          return E = i(m.minus(b), B, 0, 1), O = O.plus(E.times(N)), b = b.plus(E.times(B)), O.s = N.s = nt.s, k = k * 2, K = i(N, B, k, c).minus(nt).abs().comparedTo(i(O, b, k, c).minus(nt).abs()) < 1 ? [
            N,
            B
          ] : [
            O,
            b
          ], y = F, K;
        }, o.toNumber = function() {
          return +J(this);
        }, o.toPrecision = function(m, g) {
          return m != null && zt(m, 1, Wt), R(this, m, g, 2);
        }, o.toString = function(m) {
          var g, b = this, B = b.s, E = b.e;
          return E === null ? B ? (g = "Infinity", B < 0 && (g = "-" + g)) : g = "NaN" : (m == null ? g = E <= p || E >= f ? Ms(Fe(b.c), E) : fi(Fe(b.c), E, "0") : m === 10 && Q ? (b = W(new x(b), h + E + 1, c), g = fi(Fe(b.c), b.e, "0")) : (zt(m, 2, X.length, "Base"), g = r(fi(Fe(b.c), E, "0"), 10, m, B, true)), B < 0 && b.c[0] && (g = "-" + g)), g;
        }, o.valueOf = o.toJSON = function() {
          return J(this);
        }, o._isBigNumber = true, o[Symbol.toStringTag] = "BigNumber", o[Symbol.for("nodejs.util.inspect.custom")] = o.valueOf, e != null && x.set(e), x;
      }
      function Re(e) {
        var i = e | 0;
        return e > 0 || e === i ? i : i - 1;
      }
      function Fe(e) {
        for (var i, r, s = 1, o = e.length, u = e[0] + ""; s < o; ) {
          for (i = e[s++] + "", r = lt - i.length; r--; i = "0" + i) ;
          u += i;
        }
        for (o = u.length; u.charCodeAt(--o) === 48; ) ;
        return u.slice(0, o + 1 || 1);
      }
      function Qi(e, i) {
        var r, s, o = e.c, u = i.c, h = e.s, c = i.s, p = e.e, f = i.e;
        if (!h || !c) return null;
        if (r = o && !o[0], s = u && !u[0], r || s) return r ? s ? 0 : -c : h;
        if (h != c) return h;
        if (r = h < 0, s = p == f, !o || !u) return s ? 0 : !o ^ r ? 1 : -1;
        if (!s) return p > f ^ r ? 1 : -1;
        for (c = (p = o.length) < (f = u.length) ? p : f, h = 0; h < c; h++) if (o[h] != u[h]) return o[h] > u[h] ^ r ? 1 : -1;
        return p == f ? 0 : p > f ^ r ? 1 : -1;
      }
      function zt(e, i, r, s) {
        if (e < i || e > r || e !== ie(e)) throw Error(ae + (s || "Argument") + (typeof e == "number" ? e < i || e > r ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(e));
      }
      function Cs(e) {
        var i = e.c.length - 1;
        return Re(e.e / lt) == i && e.c[i] % 2 != 0;
      }
      function Ms(e, i) {
        return (e.length > 1 ? e.charAt(0) + "." + e.slice(1) : e) + (i < 0 ? "e" : "e+") + i;
      }
      function fi(e, i, r) {
        var s, o;
        if (i < 0) {
          for (o = r + "."; ++i; o += r) ;
          e = o + e;
        } else if (s = e.length, ++i > s) {
          for (o = r, i -= s; --i; o += r) ;
          e += o;
        } else i < s && (e = e.slice(0, i) + "." + e.slice(i));
        return e;
      }
      var ko = ja(), ti = ko, wo = class {
        constructor(e) {
          __publicField(this, "key");
          __publicField(this, "left", null);
          __publicField(this, "right", null);
          this.key = e;
        }
      }, dr = class extends wo {
        constructor(e) {
          super(e);
        }
      }, Eo = class {
        constructor() {
          __publicField(this, "size", 0);
          __publicField(this, "modificationCount", 0);
          __publicField(this, "splayCount", 0);
        }
        splay(e) {
          let i = this.root;
          if (i == null) return this.compare(e, e), -1;
          let r = null, s = null, o = null, u = null, h = i, c = this.compare, p;
          for (; ; ) if (p = c(h.key, e), p > 0) {
            let f = h.left;
            if (f == null || (p = c(f.key, e), p > 0 && (h.left = f.right, f.right = h, h = f, f = h.left, f == null))) break;
            r == null ? s = h : r.left = h, r = h, h = f;
          } else if (p < 0) {
            let f = h.right;
            if (f == null || (p = c(f.key, e), p < 0 && (h.right = f.left, f.left = h, h = f, f = h.right, f == null))) break;
            o == null ? u = h : o.right = h, o = h, h = f;
          } else break;
          return o != null && (o.right = h.left, h.left = u), r != null && (r.left = h.right, h.right = s), this.root !== h && (this.root = h, this.splayCount++), p;
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
            let o = i.right;
            i = this.splayMax(s), i.right = o, this.root = i;
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
      }, ks = class gr extends Eo {
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
          return r != 0 && this.addNewRoot(new dr(i), r), this;
        }
        addAndReturn(i) {
          let r = this.splay(i);
          return r != 0 && this.addNewRoot(new dr(i), r), this.root.key;
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
          let r = new gr(this.compare, this.validKey), s = this.modificationCount;
          for (let o of i) {
            if (s != this.modificationCount) throw "Concurrent modification during iteration.";
            this.validKey(o) && this.splay(o) == 0 && r.add(this.root.key);
          }
          r.size != this.size && (this.root = r.root, this.size = r.size, this.modificationCount++);
        }
        lookup(i) {
          return !this.validKey(i) || this.splay(i) != 0 ? null : this.root.key;
        }
        intersection(i) {
          let r = new gr(this.compare, this.validKey);
          for (let s of this) i.has(s) && r.add(s);
          return r;
        }
        difference(i) {
          let r = new gr(this.compare, this.validKey);
          for (let s of this) i.has(s) || r.add(s);
          return r;
        }
        union(i) {
          let r = this.clone();
          return r.addAll(i), r;
        }
        clone() {
          let i = new gr(this.compare, this.validKey);
          return i.size = this.size, i.root = this.copyNode(this.root), i;
        }
        copyNode(i) {
          if (i == null) return null;
          function r(o, u) {
            let h, c;
            do {
              if (h = o.left, c = o.right, h != null) {
                let p = new dr(h.key);
                u.left = p, r(h, p);
              }
              if (c != null) {
                let p = new dr(c.key);
                u.right = p, o = c, u = p;
              }
            } while (c != null);
          }
          let s = new dr(i.key);
          return r(i, s), s;
        }
        toSet() {
          return this.clone();
        }
        entries() {
          return new Po(this.wrap());
        }
        keys() {
          return this[Symbol.iterator]();
        }
        values() {
          return this[Symbol.iterator]();
        }
        [(_b = Symbol.iterator, _a2 = Symbol.toStringTag, _b)]() {
          return new Bo(this.wrap());
        }
      }, Za = class {
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
      }, Bo = class extends Za {
        getValue(e) {
          return e.key;
        }
      }, Po = class extends Za {
        getValue(e) {
          return [
            e.key,
            e.key
          ];
        }
      }, Ua = (e) => () => e, Pa = (e) => {
        let i = e ? (r, s) => s.minus(r).abs().isLessThanOrEqualTo(e) : Ua(false);
        return (r, s) => i(r, s) ? 0 : r.comparedTo(s);
      };
      function So(e) {
        let i = e ? (r, s, o, u, h) => r.exponentiatedBy(2).isLessThanOrEqualTo(u.minus(s).exponentiatedBy(2).plus(h.minus(o).exponentiatedBy(2)).times(e)) : Ua(false);
        return (r, s, o) => {
          let u = r.x, h = r.y, c = o.x, p = o.y, f = h.minus(p).times(s.x.minus(c)).minus(u.minus(c).times(s.y.minus(p)));
          return i(f, u, h, c, p) ? 0 : f.comparedTo(0);
        };
      }
      var Do = (e) => e, Ao = (e) => {
        if (e) {
          let i = new ks(Pa(e)), r = new ks(Pa(e)), s = (u, h) => h.addAndReturn(u), o = (u) => ({
            x: s(u.x, i),
            y: s(u.y, r)
          });
          return o({
            x: new ti(0),
            y: new ti(0)
          }), o;
        }
        return Do;
      }, Sa = (e) => ({
        set: (i) => {
          _i = Sa(i);
        },
        reset: () => Sa(e),
        compare: Pa(e),
        snap: Ao(e),
        orient: So(e)
      }), _i = Sa(), pr = (e, i) => e.ll.x.isLessThanOrEqualTo(i.x) && i.x.isLessThanOrEqualTo(e.ur.x) && e.ll.y.isLessThanOrEqualTo(i.y) && i.y.isLessThanOrEqualTo(e.ur.y), Da = (e, i) => {
        if (i.ur.x.isLessThan(e.ll.x) || e.ur.x.isLessThan(i.ll.x) || i.ur.y.isLessThan(e.ll.y) || e.ur.y.isLessThan(i.ll.y)) return null;
        let r = e.ll.x.isLessThan(i.ll.x) ? i.ll.x : e.ll.x, s = e.ur.x.isLessThan(i.ur.x) ? e.ur.x : i.ur.x, o = e.ll.y.isLessThan(i.ll.y) ? i.ll.y : e.ll.y, u = e.ur.y.isLessThan(i.ur.y) ? e.ur.y : i.ur.y;
        return {
          ll: {
            x: r,
            y: o
          },
          ur: {
            x: s,
            y: u
          }
        };
      }, ws = (e, i) => e.x.times(i.y).minus(e.y.times(i.x)), Va = (e, i) => e.x.times(i.x).plus(e.y.times(i.y)), Es = (e) => Va(e, e).sqrt(), To = (e, i, r) => {
        let s = {
          x: i.x.minus(e.x),
          y: i.y.minus(e.y)
        }, o = {
          x: r.x.minus(e.x),
          y: r.y.minus(e.y)
        };
        return ws(o, s).div(Es(o)).div(Es(s));
      }, Oo = (e, i, r) => {
        let s = {
          x: i.x.minus(e.x),
          y: i.y.minus(e.y)
        }, o = {
          x: r.x.minus(e.x),
          y: r.y.minus(e.y)
        };
        return Va(o, s).div(Es(o)).div(Es(s));
      }, Ha = (e, i, r) => i.y.isZero() ? null : {
        x: e.x.plus(i.x.div(i.y).times(r.minus(e.y))),
        y: r
      }, Ka = (e, i, r) => i.x.isZero() ? null : {
        x: r,
        y: e.y.plus(i.y.div(i.x).times(r.minus(e.x)))
      }, Ro = (e, i, r, s) => {
        if (i.x.isZero()) return Ka(r, s, e.x);
        if (s.x.isZero()) return Ka(e, i, r.x);
        if (i.y.isZero()) return Ha(r, s, e.y);
        if (s.y.isZero()) return Ha(e, i, r.y);
        let o = ws(i, s);
        if (o.isZero()) return null;
        let u = {
          x: r.x.minus(e.x),
          y: r.y.minus(e.y)
        }, h = ws(u, i).div(o), c = ws(u, s).div(o), p = e.x.plus(c.times(i.x)), f = r.x.plus(h.times(s.x)), C = e.y.plus(c.times(i.y)), y = r.y.plus(h.times(s.y)), S = p.plus(f).div(2), D = C.plus(y).div(2);
        return {
          x: S,
          y: D
        };
      }, ei = class ho {
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
          let s = ho.comparePoints(i.point, r.point);
          return s !== 0 ? s : (i.point !== r.point && i.link(r), i.isLeft !== r.isLeft ? i.isLeft ? 1 : -1 : Ps.compare(i.segment, r.segment));
        }
        static comparePoints(i, r) {
          return i.x.isLessThan(r.x) ? -1 : i.x.isGreaterThan(r.x) ? 1 : i.y.isLessThan(r.y) ? -1 : i.y.isGreaterThan(r.y) ? 1 : 0;
        }
        link(i) {
          if (i.point === this.point) throw new Error("Tried to link already linked events");
          let r = i.point.events;
          for (let s = 0, o = r.length; s < o; s++) {
            let u = r[s];
            this.point.events.push(u), u.point = this.point;
          }
          this.checkForConsuming();
        }
        checkForConsuming() {
          let i = this.point.events.length;
          for (let r = 0; r < i; r++) {
            let s = this.point.events[r];
            if (s.segment.consumedBy === void 0) for (let o = r + 1; o < i; o++) {
              let u = this.point.events[o];
              u.consumedBy === void 0 && s.otherSE.point.events === u.otherSE.point.events && s.segment.consume(u.segment);
            }
          }
        }
        getAvailableLinkedEvents() {
          let i = [];
          for (let r = 0, s = this.point.events.length; r < s; r++) {
            let o = this.point.events[r];
            o !== this && !o.segment.ringOut && o.segment.isInResult() && i.push(o);
          }
          return i;
        }
        getLeftmostComparator(i) {
          let r = /* @__PURE__ */ new Map(), s = (o) => {
            let u = o.otherSE;
            r.set(o, {
              sine: To(this.point, i.point, u.point),
              cosine: Oo(this.point, i.point, u.point)
            });
          };
          return (o, u) => {
            r.has(o) || s(o), r.has(u) || s(u);
            let { sine: h, cosine: c } = r.get(o), { sine: p, cosine: f } = r.get(u);
            return h.isGreaterThanOrEqualTo(0) && p.isGreaterThanOrEqualTo(0) ? c.isLessThan(f) ? 1 : c.isGreaterThan(f) ? -1 : 0 : h.isLessThan(0) && p.isLessThan(0) ? c.isLessThan(f) ? -1 : c.isGreaterThan(f) ? 1 : 0 : p.isLessThan(h) ? -1 : p.isGreaterThan(h) ? 1 : 0;
          };
        }
      }, Fo = class Ia {
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
          for (let s = 0, o = i.length; s < o; s++) {
            let u = i[s];
            if (!u.isInResult() || u.ringOut) continue;
            let h = null, c = u.leftSE, p = u.rightSE, f = [
              c
            ], C = c.point, y = [];
            for (; h = c, c = p, f.push(c), c.point !== C; ) for (; ; ) {
              let S = c.getAvailableLinkedEvents();
              if (S.length === 0) {
                let H = f[0].point, X = f[f.length - 1].point;
                throw new Error(`Unable to complete output ring starting at [${H.x}, ${H.y}]. Last matching segment found ends at [${X.x}, ${X.y}].`);
              }
              if (S.length === 1) {
                p = S[0].otherSE;
                break;
              }
              let D = null;
              for (let H = 0, X = y.length; H < X; H++) if (y[H].point === c.point) {
                D = H;
                break;
              }
              if (D !== null) {
                let H = y.splice(D)[0], X = f.splice(H.index);
                X.unshift(X[0].otherSE), r.push(new Ia(X.reverse()));
                continue;
              }
              y.push({
                index: f.length,
                point: c.point
              });
              let U = c.getLeftmostComparator(h);
              p = S.sort(U)[0].otherSE;
              break;
            }
            r.push(new Ia(f));
          }
          return r;
        }
        getGeom() {
          let i = this.events[0].point, r = [
            i
          ];
          for (let f = 1, C = this.events.length - 1; f < C; f++) {
            let y = this.events[f].point, S = this.events[f + 1].point;
            _i.orient(y, i, S) !== 0 && (r.push(y), i = y);
          }
          if (r.length === 1) return null;
          let s = r[0], o = r[1];
          _i.orient(s, i, o) === 0 && r.shift(), r.push(r[0]);
          let u = this.isExteriorRing() ? 1 : -1, h = this.isExteriorRing() ? 0 : r.length - 1, c = this.isExteriorRing() ? r.length : -1, p = [];
          for (let f = h; f != c; f += u) p.push([
            r[f].x.toNumber(),
            r[f].y.toNumber()
          ]);
          return p;
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
          for (let o = 1, u = this.events.length; o < u; o++) {
            let h = this.events[o];
            ei.compare(i, h) > 0 && (i = h);
          }
          let r = i.segment.prevInResult(), s = r ? r.prevInResult() : null;
          for (; ; ) {
            if (!r) return null;
            if (!s) return r.ringOut;
            if (s.ringOut !== r.ringOut) return ((_a3 = s.ringOut) == null ? void 0 : _a3.enclosingRing()) !== r.ringOut ? r.ringOut : (_b2 = r.ringOut) == null ? void 0 : _b2.enclosingRing();
            r = s.prevInResult(), s = r ? r.prevInResult() : null;
          }
        }
      }, qa = class {
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
            let o = this.interiorRings[r].getGeom();
            o !== null && i.push(o);
          }
          return i;
        }
      }, Io = class {
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
            let o = e[r];
            if (!o.poly) if (o.isExteriorRing()) i.push(new qa(o));
            else {
              let u = o.enclosingRing();
              (u == null ? void 0 : u.poly) || i.push(new qa(u)), (_a3 = u == null ? void 0 : u.poly) == null ? void 0 : _a3.addInterior(o);
            }
          }
          return i;
        }
      }, zo = class {
        constructor(e, i = Ps.compare) {
          __publicField(this, "queue");
          __publicField(this, "tree");
          __publicField(this, "segments");
          this.queue = e, this.tree = new ks(i), this.segments = [];
        }
        process(e) {
          let i = e.segment, r = [];
          if (e.consumedBy) return e.isLeft ? this.queue.delete(e.otherSE) : this.tree.delete(i), r;
          e.isLeft && this.tree.add(i);
          let s = i, o = i;
          do
            s = this.tree.lastBefore(s);
          while (s != null && s.consumedBy != null);
          do
            o = this.tree.firstAfter(o);
          while (o != null && o.consumedBy != null);
          if (e.isLeft) {
            let u = null;
            if (s) {
              let c = s.getIntersection(i);
              if (c !== null && (i.isAnEndpoint(c) || (u = c), !s.isAnEndpoint(c))) {
                let p = this._splitSafely(s, c);
                for (let f = 0, C = p.length; f < C; f++) r.push(p[f]);
              }
            }
            let h = null;
            if (o) {
              let c = o.getIntersection(i);
              if (c !== null && (i.isAnEndpoint(c) || (h = c), !o.isAnEndpoint(c))) {
                let p = this._splitSafely(o, c);
                for (let f = 0, C = p.length; f < C; f++) r.push(p[f]);
              }
            }
            if (u !== null || h !== null) {
              let c = null;
              u === null ? c = h : h === null ? c = u : c = ei.comparePoints(u, h) <= 0 ? u : h, this.queue.delete(i.rightSE), r.push(i.rightSE);
              let p = i.split(c);
              for (let f = 0, C = p.length; f < C; f++) r.push(p[f]);
            }
            r.length > 0 ? (this.tree.delete(i), r.push(e)) : (this.segments.push(i), i.prev = s);
          } else {
            if (s && o) {
              let u = s.getIntersection(o);
              if (u !== null) {
                if (!s.isAnEndpoint(u)) {
                  let h = this._splitSafely(s, u);
                  for (let c = 0, p = h.length; c < p; c++) r.push(h[c]);
                }
                if (!o.isAnEndpoint(u)) {
                  let h = this._splitSafely(o, u);
                  for (let c = 0, p = h.length; c < p; c++) r.push(h[c]);
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
      }, No = class {
        constructor() {
          __publicField(this, "type");
          __publicField(this, "numMultiPolys");
        }
        run(e, i, r) {
          fr.type = e;
          let s = [
            new Ja(i, true)
          ];
          for (let p = 0, f = r.length; p < f; p++) s.push(new Ja(r[p], false));
          if (fr.numMultiPolys = s.length, fr.type === "difference") {
            let p = s[0], f = 1;
            for (; f < s.length; ) Da(s[f].bbox, p.bbox) !== null ? f++ : s.splice(f, 1);
          }
          if (fr.type === "intersection") for (let p = 0, f = s.length; p < f; p++) {
            let C = s[p];
            for (let y = p + 1, S = s.length; y < S; y++) if (Da(C.bbox, s[y].bbox) === null) return [];
          }
          let o = new ks(ei.compare);
          for (let p = 0, f = s.length; p < f; p++) {
            let C = s[p].getSweepEvents();
            for (let y = 0, S = C.length; y < S; y++) o.add(C[y]);
          }
          let u = new zo(o), h = null;
          for (o.size != 0 && (h = o.first(), o.delete(h)); h; ) {
            let p = u.process(h);
            for (let f = 0, C = p.length; f < C; f++) {
              let y = p[f];
              y.consumedBy === void 0 && o.add(y);
            }
            o.size != 0 ? (h = o.first(), o.delete(h)) : h = null;
          }
          _i.reset();
          let c = Fo.factory(u.segments);
          return new Io(c).getGeom();
        }
      }, fr = new No(), Bs = fr, Go = 0, Ps = class Is {
        constructor(i, r, s, o) {
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
          this.id = ++Go, this.leftSE = i, i.segment = this, i.otherSE = r, this.rightSE = r, r.segment = this, r.otherSE = i, this.rings = s, this.windings = o;
        }
        static compare(i, r) {
          let s = i.leftSE.point.x, o = r.leftSE.point.x, u = i.rightSE.point.x, h = r.rightSE.point.x;
          if (h.isLessThan(s)) return 1;
          if (u.isLessThan(o)) return -1;
          let c = i.leftSE.point.y, p = r.leftSE.point.y, f = i.rightSE.point.y, C = r.rightSE.point.y;
          if (s.isLessThan(o)) {
            if (p.isLessThan(c) && p.isLessThan(f)) return 1;
            if (p.isGreaterThan(c) && p.isGreaterThan(f)) return -1;
            let y = i.comparePoint(r.leftSE.point);
            if (y < 0) return 1;
            if (y > 0) return -1;
            let S = r.comparePoint(i.rightSE.point);
            return S !== 0 ? S : -1;
          }
          if (s.isGreaterThan(o)) {
            if (c.isLessThan(p) && c.isLessThan(C)) return -1;
            if (c.isGreaterThan(p) && c.isGreaterThan(C)) return 1;
            let y = r.comparePoint(i.leftSE.point);
            if (y !== 0) return y;
            let S = i.comparePoint(r.rightSE.point);
            return S < 0 ? 1 : S > 0 ? -1 : 1;
          }
          if (c.isLessThan(p)) return -1;
          if (c.isGreaterThan(p)) return 1;
          if (u.isLessThan(h)) {
            let y = r.comparePoint(i.rightSE.point);
            if (y !== 0) return y;
          }
          if (u.isGreaterThan(h)) {
            let y = i.comparePoint(r.rightSE.point);
            if (y < 0) return 1;
            if (y > 0) return -1;
          }
          if (!u.eq(h)) {
            let y = f.minus(c), S = u.minus(s), D = C.minus(p), U = h.minus(o);
            if (y.isGreaterThan(S) && D.isLessThan(U)) return 1;
            if (y.isLessThan(S) && D.isGreaterThan(U)) return -1;
          }
          return u.isGreaterThan(h) ? 1 : u.isLessThan(h) || f.isLessThan(C) ? -1 : f.isGreaterThan(C) ? 1 : i.id < r.id ? -1 : i.id > r.id ? 1 : 0;
        }
        static fromRing(i, r, s) {
          let o, u, h, c = ei.comparePoints(i, r);
          if (c < 0) o = i, u = r, h = 1;
          else if (c > 0) o = r, u = i, h = -1;
          else throw new Error(`Tried to create degenerate segment at [${i.x}, ${i.y}]`);
          let p = new ei(o, true), f = new ei(u, false);
          return new Is(p, f, [
            s
          ], [
            h
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
          return _i.orient(this.leftSE.point, i, this.rightSE.point);
        }
        getIntersection(i) {
          let r = this.bbox(), s = i.bbox(), o = Da(r, s);
          if (o === null) return null;
          let u = this.leftSE.point, h = this.rightSE.point, c = i.leftSE.point, p = i.rightSE.point, f = pr(r, c) && this.comparePoint(c) === 0, C = pr(s, u) && i.comparePoint(u) === 0, y = pr(r, p) && this.comparePoint(p) === 0, S = pr(s, h) && i.comparePoint(h) === 0;
          if (C && f) return S && !y ? h : !S && y ? p : null;
          if (C) return y && u.x.eq(p.x) && u.y.eq(p.y) ? null : u;
          if (f) return S && h.x.eq(c.x) && h.y.eq(c.y) ? null : c;
          if (S && y) return null;
          if (S) return h;
          if (y) return p;
          let D = Ro(u, this.vector(), c, i.vector());
          return D === null || !pr(o, D) ? null : _i.snap(D);
        }
        split(i) {
          let r = [], s = i.events !== void 0, o = new ei(i, true), u = new ei(i, false), h = this.rightSE;
          this.replaceRightSE(u), r.push(u), r.push(o);
          let c = new Is(o, h, this.rings.slice(), this.windings.slice());
          return ei.comparePoints(c.leftSE.point, c.rightSE.point) > 0 && c.swapEvents(), ei.comparePoints(this.leftSE.point, this.rightSE.point) > 0 && this.swapEvents(), s && (o.checkForConsuming(), u.checkForConsuming()), r;
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
          let o = Is.compare(r, s);
          if (o !== 0) {
            if (o > 0) {
              let u = r;
              r = s, s = u;
            }
            if (r.prev === s) {
              let u = r;
              r = s, s = u;
            }
            for (let u = 0, h = s.rings.length; u < h; u++) {
              let c = s.rings[u], p = s.windings[u], f = r.rings.indexOf(c);
              f === -1 ? (r.rings.push(c), r.windings.push(p)) : r.windings[f] += p;
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
          let r = this._afterState.rings, s = this._afterState.windings, o = this._afterState.multiPolys;
          for (let c = 0, p = this.rings.length; c < p; c++) {
            let f = this.rings[c], C = this.windings[c], y = r.indexOf(f);
            y === -1 ? (r.push(f), s.push(C)) : s[y] += C;
          }
          let u = [], h = [];
          for (let c = 0, p = r.length; c < p; c++) {
            if (s[c] === 0) continue;
            let f = r[c], C = f.poly;
            if (h.indexOf(C) === -1) if (f.isExterior) u.push(C);
            else {
              h.indexOf(C) === -1 && h.push(C);
              let y = u.indexOf(f.poly);
              y !== -1 && u.splice(y, 1);
            }
          }
          for (let c = 0, p = u.length; c < p; c++) {
            let f = u[c].multiPoly;
            o.indexOf(f) === -1 && o.push(f);
          }
          return this._afterState;
        }
        isInResult() {
          if (this.consumedBy) return false;
          if (this._isInResult !== void 0) return this._isInResult;
          let i = this.beforeState().multiPolys, r = this.afterState().multiPolys;
          switch (Bs.type) {
            case "union": {
              let s = i.length === 0, o = r.length === 0;
              this._isInResult = s !== o;
              break;
            }
            case "intersection": {
              let s, o;
              i.length < r.length ? (s = i.length, o = r.length) : (s = r.length, o = i.length), this._isInResult = o === Bs.numMultiPolys && s < o;
              break;
            }
            case "xor": {
              let s = Math.abs(i.length - r.length);
              this._isInResult = s % 2 === 1;
              break;
            }
            case "difference": {
              let s = (o) => o.length === 1 && o[0].isSubject;
              this._isInResult = s(i) !== s(r);
              break;
            }
          }
          return this._isInResult;
        }
      }, Wa = class {
        constructor(e, i, r) {
          __publicField(this, "poly");
          __publicField(this, "isExterior");
          __publicField(this, "segments");
          __publicField(this, "bbox");
          if (!Array.isArray(e) || e.length === 0) throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
          if (this.poly = i, this.isExterior = r, this.segments = [], typeof e[0][0] != "number" || typeof e[0][1] != "number") throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
          let s = _i.snap({
            x: new ti(e[0][0]),
            y: new ti(e[0][1])
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
          let o = s;
          for (let u = 1, h = e.length; u < h; u++) {
            if (typeof e[u][0] != "number" || typeof e[u][1] != "number") throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
            let c = _i.snap({
              x: new ti(e[u][0]),
              y: new ti(e[u][1])
            });
            c.x.eq(o.x) && c.y.eq(o.y) || (this.segments.push(Ps.fromRing(o, c, this)), c.x.isLessThan(this.bbox.ll.x) && (this.bbox.ll.x = c.x), c.y.isLessThan(this.bbox.ll.y) && (this.bbox.ll.y = c.y), c.x.isGreaterThan(this.bbox.ur.x) && (this.bbox.ur.x = c.x), c.y.isGreaterThan(this.bbox.ur.y) && (this.bbox.ur.y = c.y), o = c);
          }
          (!s.x.eq(o.x) || !s.y.eq(o.y)) && this.segments.push(Ps.fromRing(o, s, this));
        }
        getSweepEvents() {
          let e = [];
          for (let i = 0, r = this.segments.length; i < r; i++) {
            let s = this.segments[i];
            e.push(s.leftSE), e.push(s.rightSE);
          }
          return e;
        }
      }, jo = class {
        constructor(e, i) {
          __publicField(this, "multiPoly");
          __publicField(this, "exteriorRing");
          __publicField(this, "interiorRings");
          __publicField(this, "bbox");
          if (!Array.isArray(e)) throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
          this.exteriorRing = new Wa(e[0], this, true), this.bbox = {
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
            let o = new Wa(e[r], this, false);
            o.bbox.ll.x.isLessThan(this.bbox.ll.x) && (this.bbox.ll.x = o.bbox.ll.x), o.bbox.ll.y.isLessThan(this.bbox.ll.y) && (this.bbox.ll.y = o.bbox.ll.y), o.bbox.ur.x.isGreaterThan(this.bbox.ur.x) && (this.bbox.ur.x = o.bbox.ur.x), o.bbox.ur.y.isGreaterThan(this.bbox.ur.y) && (this.bbox.ur.y = o.bbox.ur.y), this.interiorRings.push(o);
          }
          this.multiPoly = i;
        }
        getSweepEvents() {
          let e = this.exteriorRing.getSweepEvents();
          for (let i = 0, r = this.interiorRings.length; i < r; i++) {
            let s = this.interiorRings[i].getSweepEvents();
            for (let o = 0, u = s.length; o < u; o++) e.push(s[o]);
          }
          return e;
        }
      }, Ja = class {
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
              x: new ti(Number.POSITIVE_INFINITY),
              y: new ti(Number.POSITIVE_INFINITY)
            },
            ur: {
              x: new ti(Number.NEGATIVE_INFINITY),
              y: new ti(Number.NEGATIVE_INFINITY)
            }
          };
          for (let r = 0, s = e.length; r < s; r++) {
            let o = new jo(e[r], this);
            o.bbox.ll.x.isLessThan(this.bbox.ll.x) && (this.bbox.ll.x = o.bbox.ll.x), o.bbox.ll.y.isLessThan(this.bbox.ll.y) && (this.bbox.ll.y = o.bbox.ll.y), o.bbox.ur.x.isGreaterThan(this.bbox.ur.x) && (this.bbox.ur.x = o.bbox.ur.x), o.bbox.ur.y.isGreaterThan(this.bbox.ur.y) && (this.bbox.ur.y = o.bbox.ur.y), this.polys.push(o);
          }
          this.isSubject = i;
        }
        getSweepEvents() {
          let e = [];
          for (let i = 0, r = this.polys.length; i < r; i++) {
            let s = this.polys[i].getSweepEvents();
            for (let o = 0, u = s.length; o < u; o++) e.push(s[o]);
          }
          return e;
        }
      }, Zo = (e, ...i) => Bs.run("intersection", e, i), Uo = (e, ...i) => Bs.run("difference", e, i);
      _i.set;
      function Ss(e) {
        let i = {
          type: "Feature"
        };
        return i.geometry = e, i;
      }
      function Ds(e) {
        return e.type === "Feature" ? e.geometry : e;
      }
      function Ya(e) {
        return e && e.geometry && e.geometry.coordinates ? e.geometry.coordinates : e;
      }
      function Vo(e) {
        return Ss({
          type: "LineString",
          coordinates: e
        });
      }
      function Ho(e) {
        return Ss({
          type: "MultiLineString",
          coordinates: e
        });
      }
      function Xa(e) {
        return Ss({
          type: "Polygon",
          coordinates: e
        });
      }
      function $a(e) {
        return Ss({
          type: "MultiPolygon",
          coordinates: e
        });
      }
      function Ko(e, i) {
        let r = Ds(e), s = Ds(i), o = Zo(r.coordinates, s.coordinates);
        return o.length === 0 ? null : o.length === 1 ? Xa(o[0]) : $a(o);
      }
      function qo(e, i) {
        let r = Ds(e), s = Ds(i), o = Uo(r.coordinates, s.coordinates);
        return o.length === 0 ? null : o.length === 1 ? Xa(o[0]) : $a(o);
      }
      function Qa(e) {
        return Array.isArray(e) ? 1 + Qa(e[0]) : -1;
      }
      function Wo(e) {
        e instanceof L.Polyline && (e = e.toGeoJSON(15));
        let i = Ya(e), r = Qa(i), s = [];
        return r > 1 ? i.forEach((o) => {
          s.push(Vo(o));
        }) : s.push(e), s;
      }
      function Jo(e) {
        let i = [];
        return e.eachLayer((r) => {
          i.push(Ya(r.toGeoJSON(15)));
        }), Ho(i);
      }
      Ut.Cut = Ut.Polygon.extend({
        initialize(e) {
          this._map = e, this._shape = "Cut", this.toolbarButtonName = "cutPolygon";
        },
        _finishShape() {
          if (this._editedLayers = [], !this.options.allowSelfIntersection && (this._handleSelfIntersection(true, this._layer.getLatLngs()[0]), this._doesSelfIntersect) || this.options.requireSnapToFinish && !this._hintMarker._snapped && !this._isFirstLayer()) return;
          let e = this._layer.getLatLngs();
          if (e.length <= 2) return;
          let i = L.polygon(e, this.options.pathOptions);
          i._latlngInfos = this._layer._latlngInfo, this.cut(i), this._cleanupSnapping(), this._otherSnapLayers.splice(this._tempSnapLayerIndex, 1), delete this._tempSnapLayerIndex, this._editedLayers.forEach(({ layer: s, originalLayer: o }) => {
            this._fireCut(o, s, o), this._fireCut(this._map, s, o), o.pm._fireEdit();
          }), this._editedLayers = [];
          let r = this._hintMarker.getLatLng();
          this.disable(), this.options.continueDrawing && (this.enable(), this._hintMarker.setLatLng(r));
        },
        cut(e) {
          let i = this._map._layers, r = e._latlngInfos || [];
          Object.keys(i).map((s) => i[s]).filter((s) => s.pm).filter((s) => !s._pmTempLayer).filter((s) => !L.PM.optIn && !s.options.pmIgnore || L.PM.optIn && s.options.pmIgnore === false).filter((s) => s instanceof L.Polyline).filter((s) => s !== e).filter((s) => s.pm.options.allowCutting).filter((s) => this.options.layersToCut && L.Util.isArray(this.options.layersToCut) && this.options.layersToCut.length > 0 ? this.options.layersToCut.indexOf(s) > -1 : true).filter((s) => !this._layerGroup.hasLayer(s)).filter((s) => {
            try {
              let o = !!_e(e.toGeoJSON(15), s.toGeoJSON(15)).features.length > 0;
              return o || s instanceof L.Polyline && !(s instanceof L.Polygon) ? o : !!Ko(e.toGeoJSON(15), s.toGeoJSON(15));
            } catch {
              return s instanceof L.Polygon && console.error("You can't cut polygons with self-intersections"), false;
            }
          }).forEach((s) => {
            let o;
            if (s instanceof L.Polygon) {
              o = L.polygon(s.getLatLngs());
              let p = o.getLatLngs();
              r.forEach((f) => {
                if (f && f.snapInfo) {
                  let { latlng: C } = f, y = this._calcClosestLayer(C, [
                    o
                  ]);
                  if (y && y.segment && y.distance < this.options.snapDistance) {
                    let { segment: S } = y;
                    if (S && S.length === 2) {
                      let { indexPath: D, parentPath: U, newIndex: H } = L.PM.Utils._getIndexFromSegment(p, S);
                      (D.length > 1 ? (0, Ba.default)(p, U) : p).splice(H, 0, C);
                    }
                  }
                }
              });
            } else o = s;
            let u = this._cutLayer(e, o), h = L.geoJSON(u, s.options);
            h.getLayers().length === 1 && ([h] = h.getLayers()), this._setPane(h, "layerPane");
            let c = h.addTo(this._map.pm._getContainingLayer());
            if (c.pm.enable(s.pm.options), c.pm.disable(), s._pmTempLayer = true, e._pmTempLayer = true, s.remove(), s.removeFrom(this._map.pm._getContainingLayer()), e.remove(), e.removeFrom(this._map.pm._getContainingLayer()), c.getLayers && c.getLayers().length === 0 && this._map.pm.removeLayer({
              target: c
            }), c instanceof L.LayerGroup ? (c.eachLayer((p) => {
              this._addDrawnLayerProp(p);
            }), this._addDrawnLayerProp(c)) : this._addDrawnLayerProp(c), this.options.layersToCut && L.Util.isArray(this.options.layersToCut) && this.options.layersToCut.length > 0) {
              let p = this.options.layersToCut.indexOf(s);
              p > -1 && this.options.layersToCut.splice(p, 1);
            }
            this._editedLayers.push({
              layer: c,
              originalLayer: s
            });
          });
        },
        _cutLayer(e, i) {
          let r = L.geoJSON(), s;
          if (i instanceof L.Polygon) s = qo(i.toGeoJSON(15), e.toGeoJSON(15));
          else {
            let o = Wo(i);
            o.forEach((u) => {
              let h = ka(u, e.toGeoJSON(15)), c;
              h && h.features.length > 0 ? c = L.geoJSON(h) : c = L.geoJSON(u), c.getLayers().forEach((p) => {
                Ls(e.toGeoJSON(15), p.toGeoJSON(15)) || p.addTo(r);
              });
            }), o.length > 1 ? s = Jo(r) : s = r.toGeoJSON(15);
          }
          return s;
        },
        _change: L.Util.falseFn
      }), Ut.Text = Ut.extend({
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
          }), this._setPane(this._hintMarker, "vertexPane"), this._hintMarker._pmTempLayer = true, this._hintMarker.addTo(this._map), this.options.cursorMarker && L.DomUtil.addClass(this._hintMarker._icon, "visible"), this.options.tooltips && this._hintMarker.bindTooltip(vt("tooltips.placeText"), {
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
          var _a3, _b2, _c, _d;
          if (!e.latlng || this.options.requireSnapToFinish && !this._hintMarker._snapped && !this._isFirstLayer()) return;
          this._hintMarker._snapped || this._hintMarker.setLatLng(e.latlng);
          let i = this._hintMarker.getLatLng();
          if (this.textArea = this._createTextArea(), (_a3 = this.options.textOptions) == null ? void 0 : _a3.className) {
            let o = this.options.textOptions.className.split(" ");
            this.textArea.classList.add(...o);
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
            let o = ((_c = this.options.textOptions) == null ? void 0 : _c.focusAfterDraw) ?? true;
            s.pm._createTextMarker(o), ((_d = this.options.textOptions) == null ? void 0 : _d.text) && s.pm.setText(this.options.textOptions.text);
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
      var Yo = {
        enableLayerDrag() {
          if (!this.options.draggable || !this._layer._map) return;
          this.disable(), this._layerDragEnabled = true, this._map || (this._map = this._layer._map), (this._layer instanceof L.Marker || this._layer instanceof L.ImageOverlay) && L.DomEvent.on(this._getDOMElem(), "dragstart", this._stopDOMImageDrag), this._layer.dragging && this._layer.dragging.disable(), this._tempDragCoord = null, ki(this._layer) instanceof L.Canvas ? (this._layer.on("mouseout", this.removeDraggingClass, this), this._layer.on("mouseover", this.addDraggingClass, this)) : this.addDraggingClass(), this._originalMapDragState = this._layer._map.dragging._enabled, this._safeToCacheDragState = true;
          let e = this._getDOMElem();
          e && (ki(this._layer) instanceof L.Canvas ? (this._layer.on("touchstart mousedown", this._dragMixinOnMouseDown, this), this._map.pm._addTouchEvents(e)) : L.DomEvent.on(e, "touchstart mousedown", this._simulateMouseDownEvent, this)), this._fireDragEnable();
        },
        disableLayerDrag() {
          this._layerDragEnabled = false, ki(this._layer) instanceof L.Canvas ? (this._layer.off("mouseout", this.removeDraggingClass, this), this._layer.off("mouseover", this.addDraggingClass, this)) : this.removeDraggingClass(), this._originalMapDragState && this._dragging && this._map.dragging.enable(), this._safeToCacheDragState = false, this._layer.dragging && this._layer.dragging.disable();
          let e = this._getDOMElem();
          e && (ki(this._layer) instanceof L.Canvas ? (this._layer.off("touchstart mousedown", this._dragMixinOnMouseDown, this), this._map.pm._removeTouchEvents(e)) : L.DomEvent.off(e, "touchstart mousedown", this._simulateMouseDownEvent, this)), this._layerDragged && this._fireUpdate(), this._layerDragged = false, this._fireDragDisable();
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
          }, s = (o) => o.map((u) => {
            if (Array.isArray(u)) return s(u);
            let h = {
              lat: u.lat + r.lat,
              lng: u.lng + r.lng
            };
            return (u.alt || u.alt === 0) && (h.alt = u.alt), h;
          });
          if (this._layer instanceof L.Circle && this._layer.options.resizeableCircle || this._layer instanceof L.CircleMarker && this._layer.options.resizeableCircleMarker) {
            let o = s([
              this._layer.getLatLng()
            ]);
            this._layer.setLatLng(o[0]), this._fireChange(this._layer.getLatLng(), "Edit");
          } else if (this._layer instanceof L.CircleMarker || this._layer instanceof L.Marker) {
            let o = this._layer.getLatLng();
            this._layer._snapped && (o = this._layer._orgLatLng);
            let u = s([
              o
            ]);
            this._layer.setLatLng(u[0]), this._fireChange(this._layer.getLatLng(), "Edit");
          } else if (this._layer instanceof L.ImageOverlay) {
            let o = s([
              this._layer.getBounds().getNorthWest(),
              this._layer.getBounds().getSouthEast()
            ]);
            this._layer.setBounds(o), this._fireChange(this._layer.getBounds(), "Edit");
          } else {
            let o = s(this._layer.getLatLngs());
            this._layer.setLatLngs(o), this._fireChange(this._layer.getLatLngs(), "Edit");
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
              let o = this._parentLayerGroup[s];
              o.pm && (r = o.pm.getLayers(true));
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
      }, Xo = Yo, $o = et(qe());
      function Qo(e, i, r, s) {
        return r.unproject(i.transform(r.project(e, s)), s);
      }
      function to(e, i, r) {
        let s = r.getMaxZoom();
        if (s === 1 / 0 && (s = r.getZoom()), L.Util.isArray(e)) {
          let o = [];
          return e.forEach((u) => {
            o.push(to(u, i, r));
          }), o;
        }
        return e instanceof L.LatLng ? Qo(e, i, r, s) : null;
      }
      function Cn(e, i) {
        i instanceof L.Layer && (i = i.getLatLng());
        let r = e.getMaxZoom();
        return r === 1 / 0 && (r = e.getZoom()), e.project(i, r);
      }
      function As(e, i) {
        let r = e.getMaxZoom();
        return r === 1 / 0 && (r = e.getZoom()), e.unproject(i, r);
      }
      var tu = {
        _onRotateStart(e) {
          this._preventRenderingMarkers(true), this._rotationOriginLatLng = this._getRotationCenter().clone(), this._rotationOriginPoint = Cn(this._map, this._rotationOriginLatLng), this._rotationStartPoint = Cn(this._map, e.target.getLatLng()), this._initialRotateLatLng = Ge(this._layer), this._startAngle = this.getAngle();
          let i = Ge(this._rotationLayer, this._rotationLayer.pm._rotateOrgLatLng);
          this._fireRotationStart(this._rotationLayer, i), this._fireRotationStart(this._map, i);
        },
        _onRotate(e) {
          let i = Cn(this._map, e.target.getLatLng()), r = this._rotationStartPoint, s = this._rotationOriginPoint, o = Math.atan2(i.y - s.y, i.x - s.x) - Math.atan2(r.y - s.y, r.x - s.x);
          this._layer.setLatLngs(this._rotateLayer(o, this._initialRotateLatLng, this._rotationOriginLatLng, L.PM.Matrix.init(), this._map));
          let u = this;
          function h(C, y = [], S = -1) {
            if (S > -1 && y.push(S), L.Util.isArray(C[0])) C.forEach((D, U) => h(D, y.slice(), U));
            else {
              let D = y.length > 0 ? (0, $o.default)(u._markers, y) : u._markers[0];
              C.forEach((U, H) => {
                D[H].setLatLng(U);
              });
            }
          }
          h(this._layer.getLatLngs());
          let c = Ge(this._rotationLayer);
          this._rotationLayer.setLatLngs(this._rotateLayer(o, this._rotationLayer.pm._rotateOrgLatLng, this._rotationOriginLatLng, L.PM.Matrix.init(), this._map));
          let p = o * 180 / Math.PI;
          p = p < 0 ? p + 360 : p;
          let f = p + this._startAngle;
          this._setAngle(f), this._rotationLayer.pm._setAngle(f), this._fireRotation(this._rotationLayer, p, c), this._fireRotation(this._map, p, c), this._rotationLayer.pm._fireChange(this._rotationLayer.getLatLngs(), "Rotation");
        },
        _onRotateEnd() {
          let e = this._startAngle;
          delete this._rotationOriginLatLng, delete this._rotationOriginPoint, delete this._rotationStartPoint, delete this._initialRotateLatLng, delete this._startAngle;
          let i = Ge(this._rotationLayer, this._rotationLayer.pm._rotateOrgLatLng);
          this._rotationLayer.pm._rotateOrgLatLng = Ge(this._rotationLayer), this._fireRotationEnd(this._rotationLayer, e, i), this._fireRotationEnd(this._map, e, i), this._rotationLayer.pm._fireEdit(this._rotationLayer, "Rotation"), this._preventRenderingMarkers(false), this._layerRotated = true;
        },
        _rotateLayer(e, i, r, s, o) {
          let u = Cn(o, r);
          return this._matrix = s.clone().rotate(e, u).flip(), to(i, this._matrix, o);
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
          this.rotateEnabled() && this.disableRotate(), this._layer instanceof L.Rectangle && this._angle === void 0 && this.setInitAngle(Yn(this._layer._map, this._layer.getLatLngs()[0][0], this._layer.getLatLngs()[0][1]) || 0);
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
          }), this._rotatePoly.pm._rotationLayer = this._layer, this._rotatePoly.pm.enable(), this._rotateOrgLatLng = Ge(this._layer), this._rotateEnabled = true, this._layer.on("remove", this.disableRotate, this), this._fireRotationEnable(this._layer), this._fireRotationEnable(this._layer._map);
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
          let o = this.getAngle() - i;
          o = o < 0 ? o + 360 : o, this._startAngle = i, this._fireRotation(this._layer, o, r, this._layer), this._fireRotation(this._map || this._layer._map, o, r, this._layer), delete this._startAngle, this._fireChange(this._layer.getLatLngs(), "Rotation");
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
      }, eu = tu, iu = L.Class.extend({
        includes: [
          Xo,
          ts,
          eu,
          Ki
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
          }, o = "";
          return e === "move" ? o = "moveVertexValidation" : e === "add" ? o = "addVertexValidation" : e === "remove" && (o = "removeVertexValidation"), this.options[o] && typeof this.options[o] == "function" && !this.options[o](s) ? (e === "move" && (r._cancelDragEventChain = r.getLatLng()), false) : (r._cancelDragEventChain = null, true);
        },
        _vertexValidationDrag(e) {
          return e._cancelDragEventChain ? (e._latlng = e._cancelDragEventChain, e.update(), false) : true;
        },
        _vertexValidationDragEnd(e) {
          return e._cancelDragEventChain ? (e._cancelDragEventChain = null, false) : true;
        }
      }), Jt = iu;
      Jt.LayerGroup = L.Class.extend({
        initialize(e) {
          this._layerGroup = e, this._layers = this.getLayers(), this._getMap(), this._layers.forEach((s) => this._initLayer(s));
          let i = (s) => {
            if (s.layer._pmTempLayer) return;
            this._layers = this.getLayers();
            let o = this._layers.filter((u) => !u.pm._parentLayerGroup || !(this._layerGroup._leaflet_id in u.pm._parentLayerGroup));
            o.forEach((u) => {
              this._initLayer(u);
            }), o.length > 0 && this._getMap() && this._getMap().pm.globalEditModeEnabled() && this.enabled() && this.enable(this.getOptions());
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
          let o = [];
          return e ? this._layerGroup.getLayers().forEach((u) => {
            o.push(u), u instanceof L.LayerGroup && s.indexOf(u._leaflet_id) === -1 && (s.push(u._leaflet_id), o = o.concat(u.pm.getLayers(true, true, true, s)));
          }) : o = this._layerGroup.getLayers(), r && (o = o.filter((u) => !(u instanceof L.LayerGroup))), i && (o = o.filter((u) => !!u.pm), o = o.filter((u) => !u._pmTempLayer), o = o.filter((u) => !L.PM.optIn && !u.options.pmIgnore || L.PM.optIn && u.options.pmIgnore === false)), o;
        },
        setOptions(e, i = []) {
          i.length === 0 && (this._layers = this.getLayers()), this.options = e, this._layers.forEach((r) => {
            r.pm && (r instanceof L.LayerGroup ? i.indexOf(r._leaflet_id) === -1 && (i.push(r._leaflet_id), r.pm.setOptions(e, i)) : r.pm.setOptions(e));
          });
        }
      }), Jt.Marker = Jt.extend({
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
      var Oi = et(qe()), nu = {
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
          return r === -1 ? i : (i.sort((s, o) => {
            let u = s._latlng.distanceTo(e), h = o._latlng.distanceTo(e);
            return u - h;
          }), i.filter((s, o) => r > -1 ? o < r : true));
        },
        _preventRenderMarkers: false,
        _preventRenderingMarkers(e) {
          this._preventRenderMarkers = !!e;
        }
      }, ru = nu;
      Jt.Line = Jt.extend({
        includes: [
          ru
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
            let o = s.map(this._createMarker, this);
            return this.options.hideMiddleMarkers !== true && s.map((u, h) => {
              let c = this.isPolygon() ? (h + 1) % s.length : h + 1;
              return this._createMiddleMarker(o[h], o[c]);
            }), o;
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
          let r = L.PM.Utils.calcMiddleLatLng(this._map, e.getLatLng(), i.getLatLng()), s = this._createMarker(r), o = L.divIcon({
            className: "marker-icon marker-icon-middle"
          });
          return s.setIcon(o), s.leftM = e, s.rightM = i, e._middleMarkerNext = s, i._middleMarkerPrev = s, s.on(this.options.addVertexOn, this._onMiddleMarkerClick, this), s.on("movestart", this._onMiddleMarkerMoveStart, this), s;
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
          let s = e.getLatLng(), o = this._layer._latlngs;
          delete e.leftM, delete e.rightM;
          let { indexPath: u, index: h, parentPath: c } = L.PM.Utils.findDeepMarkerIndex(this._markers, i), p = u.length > 1 ? (0, Oi.default)(o, c) : o, f = u.length > 1 ? (0, Oi.default)(this._markers, c) : this._markers;
          p.splice(h + 1, 0, s), f.splice(h + 1, 0, e), this._layer.setLatLngs(o), this.options.hideMiddleMarkers !== true && (this._createMiddleMarker(i, e), this._createMiddleMarker(e, r)), this._fireEdit(), this._layerEdited = true, this._fireChange(this._layer.getLatLngs(), "Edit"), this._fireVertexAdded(e, L.PM.Utils.findDeepMarkerIndex(this._markers, e).indexPath, s), this.options.snappable && this._initSnappableMarkers();
        },
        hasSelfIntersection() {
          return pn(this._layer.toGeoJSON(15)).features.length > 0;
        },
        _handleSelfIntersectionOnVertexRemoval() {
          this._handleLayerStyle(true) && (this._layer.setLatLngs(this._coordsBeforeEdit), this._coordsBeforeEdit = null, this._initMarkers());
        },
        _handleLayerStyle(e) {
          let i = this._layer, r, s;
          if (this.options.allowSelfIntersection ? r = false : (s = pn(this._layer.toGeoJSON(15)), r = s.features.length > 0), r) {
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
          this.options.allowSelfIntersection || (this._coordsBeforeEdit = Ge(this._layer, this._layer.getLatLngs()));
          let r = this._layer.getLatLngs(), { indexPath: s, index: o, parentPath: u } = L.PM.Utils.findDeepMarkerIndex(this._markers, i);
          if (!s) return;
          let h = s.length > 1 ? (0, Oi.default)(r, u) : r, c = s.length > 1 ? (0, Oi.default)(this._markers, u) : this._markers, p = u[u.length - 1] > 0 && this._layer instanceof L.Polygon;
          if (!this.options.removeLayerBelowMinVertexCount && !p && (h.length <= 2 || this.isPolygon() && h.length <= 3)) {
            this._flashLayer();
            return;
          }
          h.splice(o, 1), this._layer.setLatLngs(r), this.isPolygon() && h.length <= 2 && h.splice(0, h.length);
          let f = false;
          if (h.length <= 1 && (h.splice(0, h.length), u.length > 1 && s.length > 1 && (r = cn(r)), this._layer.setLatLngs(r), this._initMarkers(), f = true), yt(r) || this._layer.remove(), r = cn(r), this._layer.setLatLngs(r), this._markers = cn(this._markers), !f && (c = s.length > 1 ? (0, Oi.default)(this._markers, u) : this._markers, i._middleMarkerPrev && (this._markerGroup.removeLayer(i._middleMarkerPrev), this._removeFromCache(i._middleMarkerPrev)), i._middleMarkerNext && (this._markerGroup.removeLayer(i._middleMarkerNext), this._removeFromCache(i._middleMarkerNext)), this._markerGroup.removeLayer(i), this._removeFromCache(i), c)) {
            let C, y;
            if (this.isPolygon() ? (C = (o + 1) % c.length, y = (o + (c.length - 1)) % c.length) : (y = o - 1 < 0 ? void 0 : o - 1, C = o + 1 >= c.length ? void 0 : o + 1), C !== y) {
              let S = c[y], D = c[C];
              this.options.hideMiddleMarkers !== true && this._createMiddleMarker(S, D);
            }
            c.splice(o, 1);
          }
          this._fireEdit(), this._layerEdited = true, this._fireVertexRemoved(i, s), this._fireChange(this._layer.getLatLngs(), "Edit");
        },
        updatePolygonCoordsFromMarkerDrag(e) {
          let i = this._layer.getLatLngs(), r = e.getLatLng(), { indexPath: s, index: o, parentPath: u } = L.PM.Utils.findDeepMarkerIndex(this._markers, e), h = s.length > 1 ? (0, Oi.default)(i, u) : i;
          r.alt = h[o].alt, h.splice(o, 1, r), this._layer.setLatLngs(i);
        },
        _getNeighborMarkers(e) {
          let { indexPath: i, index: r, parentPath: s } = L.PM.Utils.findDeepMarkerIndex(this._markers, e), o = i.length > 1 ? (0, Oi.default)(this._markers, s) : this._markers, u = (r + 1) % o.length, h = (r + (o.length - 1)) % o.length, c = o[h], p = o[u];
          return {
            prevMarker: c,
            nextMarker: p
          };
        },
        _checkMarkerAllowedToDrag(e) {
          let { prevMarker: i, nextMarker: r } = this._getNeighborMarkers(e), s = L.polyline([
            i.getLatLng(),
            e.getLatLng()
          ]), o = L.polyline([
            e.getLatLng(),
            r.getLatLng()
          ]), u = _e(this._layer.toGeoJSON(15), s.toGeoJSON(15)).features.filter((c) => {
            let p = c.geometry.coordinates, f = L.latLng(p[1], p[0]);
            return !f.equals(i.getLatLng()) && !f.equals(e.getLatLng());
          }).length, h = _e(this._layer.toGeoJSON(15), o.toGeoJSON(15)).features.filter((c) => {
            let p = c.geometry.coordinates, f = L.latLng(p[1], p[0]);
            return !f.equals(r.getLatLng()) && !f.equals(e.getLatLng());
          }).length;
          return !(u < 1 && h < 1);
        },
        _onMarkerDragStart(e) {
          let i = e.target;
          if (this._preventRenderingMarkers(true), this.cachedColor || (this.cachedColor = this._layer.options.color), !this._vertexValidation("move", e)) return;
          let { indexPath: r } = L.PM.Utils.findDeepMarkerIndex(this._markers, i);
          this._fireMarkerDragStart(e, r), this.options.allowSelfIntersection || (this._coordsBeforeEdit = Ge(this._layer, this._layer.getLatLngs())), !this.options.allowSelfIntersection && this.options.allowSelfIntersectionEdit && this.hasSelfIntersection() ? this._markerAllowedToDrag = this._checkMarkerAllowedToDrag(i) : this._markerAllowedToDrag = null;
        },
        _onMarkerDrag(e) {
          let i = e.target;
          if (!this._vertexValidationDrag(i)) return;
          let { indexPath: r, index: s, parentPath: o } = L.PM.Utils.findDeepMarkerIndex(this._markers, i);
          if (!r) return;
          if (!this.options.allowSelfIntersection && this.options.allowSelfIntersectionEdit && this.hasSelfIntersection() && this._markerAllowedToDrag === false) {
            this._layer.setLatLngs(this._coordsBeforeEdit), this._initMarkers(), this._handleLayerStyle();
            return;
          }
          this.updatePolygonCoordsFromMarkerDrag(i);
          let u = r.length > 1 ? (0, Oi.default)(this._markers, o) : this._markers, h = (s + 1) % u.length, c = (s + (u.length - 1)) % u.length, p = i.getLatLng(), f = u[c].getLatLng(), C = u[h].getLatLng();
          if (i._middleMarkerNext) {
            let y = L.PM.Utils.calcMiddleLatLng(this._map, p, C);
            i._middleMarkerNext.setLatLng(y);
          }
          if (i._middleMarkerPrev) {
            let y = L.PM.Utils.calcMiddleLatLng(this._map, p, f);
            i._middleMarkerPrev.setLatLng(y);
          }
          this.options.allowSelfIntersection || this._handleLayerStyle(), this._fireMarkerDrag(e, r), this._fireChange(this._layer.getLatLngs(), "Edit");
        },
        _onMarkerDragEnd(e) {
          let i = e.target;
          if (this._preventRenderingMarkers(false), !this._vertexValidationDragEnd(i)) return;
          let { indexPath: r } = L.PM.Utils.findDeepMarkerIndex(this._markers, i), s = !this.options.allowSelfIntersection && this.hasSelfIntersection();
          s && this.options.allowSelfIntersectionEdit && this._markerAllowedToDrag && (s = false);
          let o = !this.options.allowSelfIntersection && s;
          if (this._fireMarkerDragEnd(e, r, o), o) {
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
      }), Jt.Polygon = Jt.Line.extend({
        _shape: "Polygon",
        _checkMarkerAllowedToDrag(e) {
          let { prevMarker: i, nextMarker: r } = this._getNeighborMarkers(e), s = L.polyline([
            i.getLatLng(),
            e.getLatLng()
          ]), o = L.polyline([
            e.getLatLng(),
            r.getLatLng()
          ]), u = _e(this._layer.toGeoJSON(15), s.toGeoJSON(15)).features.filter((c) => {
            let p = c.geometry.coordinates, f = L.latLng(p[1], p[0]);
            return !f.equals(i.getLatLng()) && !f.equals(e.getLatLng());
          }).length, h = _e(this._layer.toGeoJSON(15), o.toGeoJSON(15)).features.filter((c) => {
            let p = c.geometry.coordinates, f = L.latLng(p[1], p[0]);
            return !f.equals(r.getLatLng()) && !f.equals(e.getLatLng());
          }).length;
          return !(u < 1 && h < 1);
        }
      }), Jt.Rectangle = Jt.Polygon.extend({
        _shape: "Rectangle",
        _initMarkers() {
          let e = this._map, i = this._findCorners();
          this._markerGroup && this._markerGroup.clearLayers(), this._markerGroup = new L.FeatureGroup(), this._markerGroup._pmTempLayer = true, e.addLayer(this._markerGroup), this._markers = [], this._markers[0] = i.map(this._createMarker, this), [this._cornerMarkers] = this._markers, this._layer.getLatLngs()[0].forEach((r, s) => {
            let o = this._cornerMarkers.find((u) => u._index === s);
            o && o.setLatLng(r);
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
          i._oppositeCornerLatLng = r.find((o) => o._index === (i._index + 2) % 4).getLatLng(), i._snapped = false;
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
          this._angle === void 0 && this.setInitAngle(Yn(this._map, this._layer.getLatLngs()[0][0], this._layer.getLatLngs()[0][1]) || 0);
          let e = this._layer.getLatLngs()[0];
          return L.PM.Utils._getRotatedRectangle(e[0], e[2], this.getAngle(), this._map || this);
        }
      }), Jt.CircleMarker = Jt.extend({
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
          return this.options[this._minRadiusOption] && r < this.options[this._minRadiusOption] ? i = Mi(this._map, e, i, this._getMinDistanceInMeter(e)) : this.options[this._maxRadiusOption] && r > this.options[this._maxRadiusOption] && (i = Mi(this._map, e, i, this._getMaxDistanceInMeter(e))), i;
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
      }), Jt.Circle = Jt.CircleMarker.extend({
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
      }), Jt.ImageOverlay = Jt.extend({
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
          let e = this._layer.getBounds(), i = e.getNorthWest(), r = e.getNorthEast(), s = e.getSouthEast(), o = e.getSouthWest();
          return [
            i,
            r,
            s,
            o
          ];
        }
      }), Jt.Text = Jt.extend({
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
      var Aa = function(e, i, r, s, o, u) {
        this._matrix = [
          e,
          i,
          r,
          s,
          o,
          u
        ];
      };
      Aa.init = () => new L.PM.Matrix(1, 0, 0, 1, 0, 0), Aa.prototype = {
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
        _add(e, i, r, s, o, u) {
          let h = [
            [],
            [],
            []
          ], c = this._matrix, p = [
            [
              c[0],
              c[2],
              c[4]
            ],
            [
              c[1],
              c[3],
              c[5]
            ],
            [
              0,
              0,
              1
            ]
          ], f = [
            [
              e,
              r,
              o
            ],
            [
              i,
              s,
              u
            ],
            [
              0,
              0,
              1
            ]
          ], C;
          e && e instanceof L.PM.Matrix && (c = e._matrix, f = [
            [
              c[0],
              c[2],
              c[4]
            ],
            [
              c[1],
              c[3],
              c[5]
            ],
            [
              0,
              0,
              1
            ]
          ]);
          for (let y = 0; y < 3; y += 1) for (let S = 0; S < 3; S += 1) {
            C = 0;
            for (let D = 0; D < 3; D += 1) C += p[y][D] * f[D][S];
            h[y][S] = C;
          }
          return this._matrix = [
            h[0][0],
            h[1][0],
            h[0][1],
            h[1][1],
            h[0][2],
            h[1][2]
          ], this;
        }
      };
      var su = Aa, au = {
        calcMiddleLatLng(e, i, r) {
          let s = e.project(i), o = e.project(r);
          return e.unproject(s._add(o)._divideBy(2));
        },
        findLayers(e) {
          let i = [];
          return e.eachLayer((r) => {
            (r instanceof L.Polyline || r instanceof L.Marker || r instanceof L.Circle || r instanceof L.CircleMarker || r instanceof L.ImageOverlay) && i.push(r);
          }), i = i.filter((r) => !!r.pm), i = i.filter((r) => !r._pmTempLayer), i = i.filter((r) => !L.PM.optIn && !r.options.pmIgnore || L.PM.optIn && r.options.pmIgnore === false), i;
        },
        circleToPolygon(e, i = 60, r = true) {
          let s = e.getLatLng(), o = e.getRadius(), u = Ci(s, o, i, 0, r), h = [];
          for (let c = 0; c < u.length; c += 1) {
            let p = [
              u[c].lat,
              u[c].lng
            ];
            h.push(p);
          }
          return L.polygon(h, e.options);
        },
        disablePopup(e) {
          e.getPopup() && (e._tempPopupCopy = e.getPopup(), e.unbindPopup());
        },
        enablePopup(e) {
          e._tempPopupCopy && (e.bindPopup(e._tempPopupCopy), delete e._tempPopupCopy);
        },
        _fireEvent(e, i, r, s = false) {
          e.fire(i, r, s);
          let { groups: o } = this.getAllParentGroups(e);
          o.forEach((u) => {
            u.fire(i, r, s);
          });
        },
        getAllParentGroups(e) {
          let i = [], r = [], s = (o) => {
            for (let u in o._eventParents) if (i.indexOf(u) === -1) {
              i.push(u);
              let h = o._eventParents[u];
              r.push(h), s(h);
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
        createGeodesicPolygon: Ci,
        getTranslation: vt,
        findDeepCoordIndex(e, i, r = true) {
          let s, o = (h) => (c, p) => {
            let f = h.concat(p);
            if (r) {
              if (c.lat && c.lat === i.lat && c.lng === i.lng) return s = f, true;
            } else if (c.lat && L.latLng(c).equals(i)) return s = f, true;
            return Array.isArray(c) && c.some(o(f));
          };
          e.some(o([]));
          let u = {};
          return s && (u = {
            indexPath: s,
            index: s[s.length - 1],
            parentPath: s.slice(0, s.length - 1)
          }), u;
        },
        findDeepMarkerIndex(e, i) {
          let r, s = (u) => (h, c) => {
            let p = u.concat(c);
            return h._leaflet_id === i._leaflet_id ? (r = p, true) : Array.isArray(h) && h.some(s(p));
          };
          e.some(s([]));
          let o = {};
          return r && (o = {
            indexPath: r,
            index: r[r.length - 1],
            parentPath: r.slice(0, r.length - 1)
          }), o;
        },
        _getIndexFromSegment(e, i) {
          if (i && i.length === 2) {
            let r = this.findDeepCoordIndex(e, i[0]), s = this.findDeepCoordIndex(e, i[1]), o = Math.max(r.index, s.index);
            return (r.index === 0 || s.index === 0) && o !== 1 && (o += 1), {
              indexA: r,
              indexB: s,
              newIndex: o,
              indexPath: r.indexPath,
              parentPath: r.parentPath
            };
          }
          return null;
        },
        _getRotatedRectangle(e, i, r, s) {
          let o = Cn(s, e), u = Cn(s, i), h = r * Math.PI / 180, c = Math.cos(h), p = Math.sin(h), f = (u.x - o.x) * c + (u.y - o.y) * p, C = (u.y - o.y) * c - (u.x - o.x) * p, y = f * c + o.x, S = f * p + o.y, D = -C * p + o.x, U = C * c + o.y, H = As(s, o), X = As(s, {
            x: y,
            y: S
          }), Q = As(s, u), x = As(s, {
            x: D,
            y: U
          });
          return [
            H,
            X,
            Q,
            x
          ];
        },
        pxRadiusToMeterRadius(e, i, r) {
          let s = i.project(r), o = L.point(s.x + e, s.y);
          return i.distance(i.unproject(o), r);
        }
      }, ou = au;
      L.PM = L.PM || {
        version: Tt.version,
        Map: Se,
        Toolbar: $r,
        Draw: Ut,
        Edit: Jt,
        Utils: ou,
        Matrix: su,
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
          function o() {
            this.pm = void 0, L.PM.optIn ? this.options.pmIgnore === false && (this.pm = new L.PM.Edit.Line(this)) : this.options.pmIgnore || (this.pm = new L.PM.Edit.Line(this));
          }
          L.Polyline.addInitHook(o);
          function u() {
            this.pm = void 0, L.PM.optIn ? this.options.pmIgnore === false && (this.pm = new L.PM.Edit.Polygon(this)) : this.options.pmIgnore || (this.pm = new L.PM.Edit.Polygon(this));
          }
          L.Polygon.addInitHook(u);
          function h() {
            this.pm = void 0, L.PM.optIn ? this.options.pmIgnore === false && (this.pm = new L.PM.Edit.Rectangle(this)) : this.options.pmIgnore || (this.pm = new L.PM.Edit.Rectangle(this));
          }
          L.Rectangle.addInitHook(h);
          function c() {
            this.pm = void 0, L.PM.optIn ? this.options.pmIgnore === false && (this.pm = new L.PM.Edit.Circle(this)) : this.options.pmIgnore || (this.pm = new L.PM.Edit.Circle(this));
          }
          L.Circle.addInitHook(c);
          function p() {
            this.pm = void 0, L.PM.optIn ? this.options.pmIgnore === false && (this.pm = new L.PM.Edit.ImageOverlay(this)) : this.options.pmIgnore || (this.pm = new L.PM.Edit.ImageOverlay(this));
          }
          L.ImageOverlay.addInitHook(p);
        },
        reInitLayer(e) {
          e instanceof L.LayerGroup && e.eachLayer((i) => {
            this.reInitLayer(i);
          }), e.pm || L.PM.optIn && e.options.pmIgnore !== false || e.options.pmIgnore || (e instanceof L.Map ? e.pm = new L.PM.Map(e) : e instanceof L.Marker ? e.options.textMarker ? (e.pm = new L.PM.Edit.Text(e), e.pm._initTextMarker(), e.pm._createTextMarker(false)) : e.pm = new L.PM.Edit.Marker(e) : e instanceof L.Circle ? e.pm = new L.PM.Edit.Circle(e) : e instanceof L.CircleMarker ? e.pm = new L.PM.Edit.CircleMarker(e) : e instanceof L.Rectangle ? e.pm = new L.PM.Edit.Rectangle(e) : e instanceof L.Polygon ? e.pm = new L.PM.Edit.Polygon(e) : e instanceof L.Polyline ? e.pm = new L.PM.Edit.Line(e) : e instanceof L.LayerGroup ? e.pm = new L.PM.Edit.LayerGroup(e) : e instanceof L.ImageOverlay && (e.pm = new L.PM.Edit.ImageOverlay(e)));
        }
      }, L.version === "1.7.1" && L.Canvas.include({
        _onClick(e) {
          let i = this._map.mouseEventToLayerPoint(e), r, s;
          for (let o = this._drawFirst; o; o = o.next) r = o.layer, r.options.interactive && r._containsPoint(i) && (!(e.type === "click" || e.type === "preclick") || !this._map._draggableMoved(r)) && (s = r);
          s && (L.DomEvent.fakeStop(e), this._fireEvent([
            s
          ], e));
        }
      }), L.PM.initialize();
    })()), io;
  }
  gu();
  class yu {
    constructor() {
      this.waypoints = [], this.droneRoutes = /* @__PURE__ */ new Map(), this.wpMarkers = [], this.routeLayer = null, this.droneMarkers = /* @__PURE__ */ new Map(), this.droneOpacities = /* @__PURE__ */ new Map(), this.isZooming = false, this.isProgrammaticMove = false, this.following = false, this.drawModeActive = false, this.spawnModeActive = false, this.geofenceModeActive = false, this.selectedDroneId = null, this.geofenceVertices = [], this.droneGeofences = /* @__PURE__ */ new Map(), this.geofenceMarkers = [], this.geofenceLayer = null, this.onWaypointsChanged = () => {
      }, this.onGeofenceChanged = () => {
      }, this.onSpawnClick = null, this.onDroneSelected = null, this.onDroneDragged = null, this.droneStates = /* @__PURE__ */ new Map(), this.droneFrozenUntil = /* @__PURE__ */ new Map(), this.getOperationMode = () => "operated", this.onGeofenceClick = (v) => {
        this.geofenceModeActive && (this.geofenceVertices.push({
          lat: v.latlng.lat,
          lng: v.latlng.lng
        }), this.saveCurrentGeofence(), this.refreshGeofence(), this.onGeofenceChanged());
      }, this.onMapClick = (v) => {
        this.drawModeActive && (this.waypoints.push({
          lat: v.latlng.lat,
          lng: v.latlng.lng
        }), this.saveCurrentRoute(), this.refreshRoute(), this.onWaypointsChanged());
      }, this.map = ye.map("map", {
        zoomAnimation: true
      }).setView([
        57.7069,
        11.9381
      ], 15), ye.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
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
      }), this.map.on("zoomstart", () => {
        this.isZooming = true;
      }), this.map.on("zoomend", () => {
        this.isZooming = false;
      }), this.map.on("dragstart", () => {
        this.isProgrammaticMove || this.setFollowing(false);
      });
      const M = ye.Control.extend({
        options: {
          position: "topright"
        },
        onAdd: () => {
          const v = ye.DomUtil.create("button", "leaflet-follow-btn");
          return v.type = "button", v.title = "Follow selected drone", v.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>', ye.DomEvent.disableClickPropagation(v), v.addEventListener("click", () => {
            this.setFollowing(!this.following), this.following && this.panToSelectedDrone();
          }), this.followBtn = v, v;
        }
      });
      new M().addTo(this.map), this.map.on("click", (v) => {
        this.spawnModeActive && this.onSpawnClick && this.onSpawnClick(v.latlng.lat, v.latlng.lng);
      });
    }
    createWpIcon(M) {
      const v = ze("--alert-caution-color") || "rgb(233,195,0)", T = ze("--on-caution-color") || "#000", j = ze("--container-section-color") || "#121212";
      return ye.divIcon({
        className: "",
        html: `<div style="
        width:24px;height:24px;border-radius:50%;
        background:${v};color:${T};
        font-weight:700;font-size:11px;
        font-family:'Noto Sans',sans-serif;
        display:flex;align-items:center;justify-content:center;
        border:2px solid ${j};
        box-shadow:0 1px 4px rgba(0,0,0,.55)">${M}</div>`,
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
    createDroneIcon(M, v) {
      const T = v ? ze("--alert-running-color") || "rgb(0,200,120)" : ze("--instrument-enhanced-primary-color") || "rgb(90,132,191)", j = ze("--container-backdrop-color") || "rgb(3,3,3)", $ = v ? `border: 2px solid ${T}; border-radius: 50%; padding: 2px;` : "", A = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
      <path d="M20,3 L30,14 L28,34 Q20,38 12,34 L10,14 Z"
            fill="${T}" stroke="${j}" stroke-width="1.5" stroke-linejoin="round"/>
      <line x1="20" y1="7" x2="20" y2="30"
            stroke="${j}" stroke-width="1.2" opacity="0.5"/>
      <rect x="15" y="18" width="10" height="8" rx="2"
            fill="${j}" opacity="0.7"/>
      <polygon points="20,3 17,10 23,10" fill="white" opacity="0.4"/>
    </svg>`, ut = v ? 48 : 40, et = ut / 2;
      return ye.divIcon({
        className: "",
        html: `<div class="drone-icon-inner" style="
        width:${ut}px;height:${ut}px;opacity:${M};
        transform-origin:center;
        transition:opacity 0.3s;${$}">${A}</div>`,
        iconSize: [
          ut,
          ut
        ],
        iconAnchor: [
          et,
          et
        ]
      });
    }
    setFollowing(M) {
      this.following = M, this.followBtn && this.followBtn.classList.toggle("active", M);
    }
    panToSelectedDrone() {
      if (!this.selectedDroneId) return;
      const M = this.droneMarkers.get(this.selectedDroneId);
      M && (this.isProgrammaticMove = true, this.map.panTo(M.getLatLng(), {
        animate: true,
        duration: 0.3
      }), this.map.once("moveend", () => {
        this.isProgrammaticMove = false;
      }));
    }
    refreshRoute() {
      for (const T of this.wpMarkers) T.remove();
      if (this.wpMarkers = [], this.routeLayer && (this.routeLayer.remove(), this.routeLayer = null), this.waypoints.length === 0) return;
      const M = this.drawModeActive;
      for (let T = 0; T < this.waypoints.length; T++) {
        const j = this.waypoints[T], $ = ye.marker([
          j.lat,
          j.lng
        ], {
          icon: this.createWpIcon(T + 1),
          draggable: M
        }).addTo(this.map);
        ((A) => {
          $.on("dragend", () => {
            const ut = $.getLatLng();
            this.waypoints[A] = {
              lat: ut.lat,
              lng: ut.lng
            }, this.saveCurrentRoute(), this.refreshRoute(), this.onWaypointsChanged();
          }), $.on("contextmenu", () => {
            this.waypoints.splice(A, 1), this.saveCurrentRoute(), this.refreshRoute(), this.onWaypointsChanged();
          });
        })(T), this.wpMarkers.push($);
      }
      const v = ze("--instrument-enhanced-primary-color") || "#5a84bf";
      this.routeLayer = ye.polyline(this.waypoints.map((T) => [
        T.lat,
        T.lng
      ]), {
        color: v,
        weight: 3,
        opacity: 0.85
      }).addTo(this.map);
    }
    updateWaypointDraggability() {
      const M = this.drawModeActive;
      for (const v of this.wpMarkers) M ? v.dragging.enable() : v.dragging.disable();
    }
    toggleGeofenceMode() {
      this.geofenceModeActive = !this.geofenceModeActive, this.geofenceModeActive ? (this.drawModeActive && (this.drawModeActive = false, this.map.off("click", this.onMapClick), this.updateWaypointDraggability()), this.spawnModeActive = false, this.map.on("click", this.onGeofenceClick)) : this.map.off("click", this.onGeofenceClick), this.refreshGeofence();
    }
    disableGeofenceMode() {
      this.geofenceModeActive = false, this.map.off("click", this.onGeofenceClick);
    }
    refreshGeofence() {
      for (const T of this.geofenceMarkers) T.remove();
      if (this.geofenceMarkers = [], this.geofenceLayer && (this.geofenceLayer.remove(), this.geofenceLayer = null), this.geofenceVertices.length === 0) return;
      const M = ze("--alert-alarm-color") || "rgb(220,53,69)", v = this.geofenceModeActive;
      for (let T = 0; T < this.geofenceVertices.length; T++) {
        const j = this.geofenceVertices[T], $ = ye.marker([
          j.lat,
          j.lng
        ], {
          icon: this.createGeofenceIcon(T + 1),
          draggable: v
        }).addTo(this.map);
        ((A) => {
          $.on("dragend", () => {
            const ut = $.getLatLng();
            this.geofenceVertices[A] = {
              lat: ut.lat,
              lng: ut.lng
            }, this.saveCurrentGeofence(), this.refreshGeofence(), this.onGeofenceChanged();
          }), $.on("contextmenu", () => {
            this.geofenceVertices.splice(A, 1), this.saveCurrentGeofence(), this.refreshGeofence(), this.onGeofenceChanged();
          });
        })(T), this.geofenceMarkers.push($);
      }
      this.geofenceVertices.length >= 3 && (this.geofenceLayer = ye.polygon(this.geofenceVertices.map((T) => [
        T.lat,
        T.lng
      ]), {
        color: M,
        weight: 2,
        dashArray: "6, 4",
        fillColor: M,
        fillOpacity: 0.08
      }).addTo(this.map));
    }
    createGeofenceIcon(M) {
      const v = ze("--alert-alarm-color") || "rgb(220,53,69)", T = "#fff", j = ze("--container-section-color") || "#121212";
      return ye.divIcon({
        className: "",
        html: `<div style="
        width:20px;height:20px;border-radius:50%;
        background:${v};color:${T};
        font-weight:700;font-size:9px;
        font-family:'Noto Sans',sans-serif;
        display:flex;align-items:center;justify-content:center;
        border:2px solid ${j};
        box-shadow:0 1px 4px rgba(0,0,0,.55)">${M}</div>`,
        iconSize: [
          20,
          20
        ],
        iconAnchor: [
          10,
          10
        ]
      });
    }
    clearGeofence() {
      this.geofenceVertices = [], this.selectedDroneId && this.droneGeofences.set(this.selectedDroneId, []);
      for (const M of this.geofenceMarkers) M.remove();
      this.geofenceMarkers = [], this.geofenceLayer && (this.geofenceLayer.remove(), this.geofenceLayer = null);
    }
    setGeofenceBreached(M) {
      if (!this.geofenceLayer) return;
      const v = ze("--alert-alarm-color") || "rgb(220,53,69)";
      M ? this.geofenceLayer.setStyle({
        dashArray: void 0,
        weight: 3,
        fillOpacity: 0.18,
        color: v,
        fillColor: v
      }) : this.geofenceLayer.setStyle({
        dashArray: "6, 4",
        weight: 2,
        fillOpacity: 0.08,
        color: v,
        fillColor: v
      });
    }
    saveCurrentGeofence() {
      this.selectedDroneId && this.droneGeofences.set(this.selectedDroneId, [
        ...this.geofenceVertices
      ]);
    }
    saveCurrentRoute() {
      this.selectedDroneId && this.droneRoutes.set(this.selectedDroneId, [
        ...this.waypoints
      ]);
    }
    toggleSpawnMode() {
      this.spawnModeActive = !this.spawnModeActive, this.spawnModeActive && this.drawModeActive && (this.drawModeActive = false, this.map.off("click", this.onMapClick), this.updateWaypointDraggability());
    }
    toggleDrawMode() {
      this.drawModeActive = !this.drawModeActive, this.drawModeActive ? (this.spawnModeActive = false, this.map.on("click", this.onMapClick)) : this.map.off("click", this.onMapClick), this.updateWaypointDraggability();
    }
    disableDrawMode() {
      this.drawModeActive = false, this.map.off("click", this.onMapClick);
    }
    updateDronePosition(M, v, T, j, $) {
      if (Math.abs(v) < 0.01 && Math.abs(T) < 0.01) return;
      const A = ye.latLng(v, T), ut = 1, et = M === this.selectedDroneId, St = this.droneStates.get(M);
      this.droneStates.set(M, $);
      let Lt = this.droneMarkers.get(M);
      Lt || (Lt = ye.marker(A, {
        icon: this.createDroneIcon(ut, et),
        zIndexOffset: et ? 1e3 : 500,
        draggable: $ === "operated"
      }).addTo(this.map), Lt.on("click", () => {
        this.onDroneSelected && this.onDroneSelected(M);
      }), Lt.on("dragstart", () => {
        this.droneFrozenUntil.set(M, 1 / 0);
      }), Lt.on("dragend", () => {
        this.droneFrozenUntil.set(M, Date.now() + 1e3);
        const ue = Lt.getLatLng();
        this.onDroneDragged && this.onDroneDragged(M, ue.lat, ue.lng);
      }), this.droneMarkers.set(M, Lt));
      const pt = this.droneFrozenUntil.get(M) ?? 0;
      Date.now() >= pt && (Lt.setLatLng(A), this.droneFrozenUntil.delete(M)), this.droneOpacities.set(M, ut), St !== $ && ($ === "operated" ? Lt.dragging.enable() : Lt.dragging.disable()), et && this.following && !this.isZooming && (this.isProgrammaticMove = true, this.map.panTo(A, {
        animate: true,
        duration: 0.1
      }), this.map.once("moveend", () => {
        this.isProgrammaticMove = false;
      }));
      const Ot = Lt.getElement(), ve = Ot && Ot.querySelector(".drone-icon-inner");
      ve && (ve.style.transform = `rotate(${j}deg)`, ve.style.opacity = String(ut));
    }
    selectDrone(M) {
      const v = this.selectedDroneId;
      v && (this.droneRoutes.set(v, [
        ...this.waypoints
      ]), this.droneGeofences.set(v, [
        ...this.geofenceVertices
      ])), this.selectedDroneId = M, this.waypoints = [
        ...this.droneRoutes.get(M) ?? []
      ], this.refreshRoute(), this.onWaypointsChanged(), this.geofenceVertices = [
        ...this.droneGeofences.get(M) ?? []
      ], this.refreshGeofence(), this.onGeofenceChanged(), v && v !== M && this.refreshMarkerIcon(v), this.refreshMarkerIcon(M), this.setFollowing(true);
      const T = this.droneMarkers.get(M);
      T && (this.isProgrammaticMove = true, this.map.panTo(T.getLatLng(), {
        animate: true,
        duration: 0.3
      }), this.map.once("moveend", () => {
        this.isProgrammaticMove = false;
      }));
    }
    refreshMarkerIcon(M) {
      const v = this.droneMarkers.get(M);
      if (!v) return;
      const T = this.droneOpacities.get(M) ?? 0.4, j = M === this.selectedDroneId;
      v.setIcon(this.createDroneIcon(T, j)), v.setZIndexOffset(j ? 1e3 : 500);
    }
    removeDrone(M) {
      const v = this.droneMarkers.get(M);
      v && (v.remove(), this.droneMarkers.delete(M), this.droneOpacities.delete(M));
    }
    refreshDroneIcon() {
      for (const [M] of this.droneMarkers) this.refreshMarkerIcon(M);
    }
    clearWaypoints() {
      this.waypoints = [], this.selectedDroneId && this.droneRoutes.set(this.selectedDroneId, []);
      for (const M of this.wpMarkers) M.remove();
      this.wpMarkers = [], this.routeLayer && (this.routeLayer.remove(), this.routeLayer = null);
    }
  }
  class vu {
    constructor(M) {
      this.callbacks = M, this.btnDraw = document.getElementById("btn-draw"), this.btnPlay = document.getElementById("btn-play"), this.btnStop = document.getElementById("btn-stop"), this.btnClear = document.getElementById("btn-clear"), this.speedInput = document.getElementById("speed-input"), this.btnSpawn = document.getElementById("btn-spawn"), this.btnDeleteDrone = document.getElementById("btn-delete-drone"), this.btnSettings = document.getElementById("btn-settings"), this.btnRouteSet = document.getElementById("btn-route-set"), this.btnGeofence = document.getElementById("btn-geofence"), this.btnGeofenceSet = document.getElementById("btn-geofence-set"), this.btnGeofenceClear = document.getElementById("btn-geofence-clear"), this.geofenceAction = document.getElementById("geofence-action"), this.simStatusBadge = document.getElementById("sim-status-badge"), this.simStatusText = document.getElementById("sim-status-text"), this.droneSelect = document.getElementById("drone-select"), this.simState = "playing", this.operationMode = "operated", this.selectedDroneId = null, this.drawModeActive = false, this.spawnModeActive = false, this.geofenceModeActive = false, this.routeSetForDrone = /* @__PURE__ */ new Set(), this.manualRudder = 0, this.manualEngine = 0, this.keysDown = /* @__PURE__ */ new Set(), this.onDroneSelected = null, this.btnPlay.addEventListener("click", () => M.onPlay()), this.btnStop.addEventListener("click", () => M.onStop()), this.btnClear.addEventListener("click", () => M.onClear()), this.btnDraw.addEventListener("click", () => M.onDrawToggle()), this.btnSpawn.addEventListener("click", () => M.onSpawnToggle()), this.btnDeleteDrone.addEventListener("click", () => M.onDeleteDrone()), this.btnSettings.addEventListener("click", () => M.onSettingsOpen()), this.btnRouteSet.addEventListener("click", () => M.onRouteSet()), this.btnGeofence.addEventListener("click", () => M.onGeofenceToggle()), this.btnGeofenceSet.addEventListener("click", () => M.onGeofenceSet()), this.btnGeofenceClear.addEventListener("click", () => M.onGeofenceClear()), this.speedInput.addEventListener("change", () => {
        M.onSpeedChange(parseFloat(this.speedInput.value));
      }), window.addEventListener("keydown", (v) => {
        if (this.operationMode !== "operated") return;
        const T = v.target.tagName;
        if (T === "INPUT" || T === "SELECT" || T === "TEXTAREA") return;
        const j = v.key;
        [
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight"
        ].includes(j) && (v.preventDefault(), this.keysDown.has(j) || (this.keysDown.add(j), this.updateManualFromKeys()));
      }), window.addEventListener("keyup", (v) => {
        if (this.operationMode !== "operated") return;
        const T = v.key;
        this.keysDown.has(T) && (this.keysDown.delete(T), this.updateManualFromKeys());
      }), this.droneSelect.addEventListener("change", () => {
        const v = this.droneSelect.value;
        v && this.onDroneSelected && this.onDroneSelected(v);
      });
    }
    updateManualFromKeys() {
      const M = this.keysDown.has("ArrowLeft"), v = this.keysDown.has("ArrowRight");
      M && !v ? this.manualRudder = Math.max(-35, this.manualRudder - 1) : v && !M && (this.manualRudder = Math.min(35, this.manualRudder + 1));
      const T = this.keysDown.has("ArrowUp"), j = this.keysDown.has("ArrowDown");
      T && !j ? this.manualEngine = Math.min(1, this.manualEngine + 0.1) : j && !T && (this.manualEngine = Math.max(0, this.manualEngine - 0.1)), this.callbacks.onManualControl(this.manualRudder, this.manualEngine);
    }
    setOperationMode(M, v) {
      const T = this.operationMode === "operated";
      this.operationMode = M, M === "operated" && (T || (this.manualRudder = 0, this.manualEngine = 0));
    }
    setDrawModeActive(M) {
      this.drawModeActive = M, this.btnDraw.classList.toggle("active", M), M && this.setSpawnModeActive(false);
    }
    setSpawnModeActive(M) {
      this.spawnModeActive = M, this.btnSpawn.classList.toggle("active", M), M && this.drawModeActive && (this.drawModeActive = false, this.btnDraw.classList.remove("active")), M && this.geofenceModeActive && (this.geofenceModeActive = false, this.btnGeofence.classList.remove("active"));
    }
    setGeofenceModeActive(M) {
      this.geofenceModeActive = M, this.btnGeofence.classList.toggle("active", M), M && (this.setDrawModeActive(false), this.setSpawnModeActive(false));
    }
    getGeofenceAction() {
      return this.geofenceAction.value;
    }
    flashConfirm(M) {
      const v = M.textContent;
      M.textContent = "\u2713", M.classList.add("active"), setTimeout(() => {
        M.textContent = v, M.classList.remove("active");
      }, 800);
    }
    flashRouteSetConfirm() {
      this.flashConfirm(this.btnRouteSet);
    }
    flashGeofenceSetConfirm() {
      this.flashConfirm(this.btnGeofenceSet);
    }
    markRouteSet(M) {
      this.routeSetForDrone.add(M);
    }
    clearRouteSet(M) {
      this.routeSetForDrone.delete(M);
    }
    get isRouteSet() {
      return !!this.selectedDroneId && this.routeSetForDrone.has(this.selectedDroneId);
    }
    updateDroneList(M) {
      const v = this.droneSelect.value;
      if (this.droneSelect.innerHTML = "", M.length === 0) {
        const T = document.createElement("option");
        T.value = "", T.textContent = "No drones", this.droneSelect.appendChild(T);
        return;
      }
      for (const T of M) {
        const j = document.createElement("option");
        j.value = T.entity_id, j.textContent = `${T.entity_id} (${T.operation_mode ?? T.state})`, this.droneSelect.appendChild(j);
      }
      this.selectedDroneId && M.some((T) => T.entity_id === this.selectedDroneId) ? this.droneSelect.value = this.selectedDroneId : v && M.some((T) => T.entity_id === v) && (this.droneSelect.value = v);
    }
    setSelectedDrone(M) {
      this.selectedDroneId = M, this.droneSelect.value = M;
    }
    updateControlStates(M) {
      const v = this.operationMode === "operated", T = v && this.isRouteSet;
      this.btnPlay.disabled = !T, this.btnPlay.title = !T && v ? "Draw a route and press Set first" : "", this.btnStop.disabled = this.operationMode !== "autonomous", this.btnClear.disabled = !v, this.btnDraw.disabled = !v, this.btnRouteSet.disabled = !v, this.btnGeofence.disabled = !v, this.btnGeofenceSet.disabled = !v, this.btnGeofenceClear.disabled = !v, this.geofenceAction.disabled = !v, this.simStatusBadge.classList.add("visible"), this.simStatusText.textContent = this.operationMode === "autonomous" ? "Autonomous" : "Operated";
    }
  }
  var Ra, ro;
  function Lu() {
    return ro || (ro = 1, Ra = (function(V) {
      var M = {};
      function v(T) {
        if (M[T]) return M[T].exports;
        var j = M[T] = {
          i: T,
          l: false,
          exports: {}
        };
        return V[T].call(j.exports, j, j.exports, v), j.l = true, j.exports;
      }
      return v.m = V, v.c = M, v.d = function(T, j, $) {
        v.o(T, j) || Object.defineProperty(T, j, {
          enumerable: true,
          get: $
        });
      }, v.r = function(T) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(T, Symbol.toStringTag, {
          value: "Module"
        }), Object.defineProperty(T, "__esModule", {
          value: true
        });
      }, v.t = function(T, j) {
        if (1 & j && (T = v(T)), 8 & j || 4 & j && typeof T == "object" && T && T.__esModule) return T;
        var $ = /* @__PURE__ */ Object.create(null);
        if (v.r($), Object.defineProperty($, "default", {
          enumerable: true,
          value: T
        }), 2 & j && typeof T != "string") for (var A in T) v.d($, A, (function(ut) {
          return T[ut];
        }).bind(null, A));
        return $;
      }, v.n = function(T) {
        var j = T && T.__esModule ? function() {
          return T.default;
        } : function() {
          return T;
        };
        return v.d(j, "a", j), j;
      }, v.o = function(T, j) {
        return Object.prototype.hasOwnProperty.call(T, j);
      }, v.p = "", v(v.s = 1);
    })([
      function(V, M, v) {
        var T = v(2), j = v(3), $ = v(4);
        V.exports = function(A) {
          return T(A) || j(A) || $();
        };
      },
      function(V, M, v) {
        v.r(M), v.d(M, "sparkline", function() {
          return et;
        });
        var T = v(0), j = v.n(T);
        function $(St, Lt, pt, Ot) {
          return parseFloat((Lt - Ot * Lt / St + pt).toFixed(2));
        }
        function A(St) {
          return St.value;
        }
        function ut(St, Lt) {
          var pt = document.createElementNS("http://www.w3.org/2000/svg", St);
          for (var Ot in Lt) pt.setAttribute(Ot, Lt[Ot]);
          return pt;
        }
        function et(St, Lt, pt) {
          var Ot;
          if (Ot = St, j()(Ot.querySelectorAll("*")).forEach(function(gt) {
            return Ot.removeChild(gt);
          }), !(Lt.length <= 1)) {
            pt = pt || {}, typeof Lt[0] == "number" && (Lt = Lt.map(function(gt) {
              return {
                value: gt
              };
            }));
            var ve = pt.onmousemove, ue = pt.onmouseout, Bt = "interactive" in pt ? pt.interactive : !!ve, ke = pt.spotRadius || 2, ni = 2 * ke, tn = pt.cursorWidth || 2, Xt = parseFloat(St.attributes["stroke-width"].value), Ri = pt.fetch || A, we = Lt.map(function(gt) {
              return Ri(gt);
            }), Ee = parseFloat(St.attributes.width.value) - 2 * ni, Ne = parseFloat(St.attributes.height.value), Fi = Ne - 2 * Xt - ni, mi = Math.max.apply(Math, j()(we)), ne = -1e3, At = we.length - 1, qt = Ee / At, ri = [], Le = $(mi, Fi, Xt + ke, we[0]), Ii = "M".concat(ni, " ").concat(Le);
            we.forEach(function(gt, Ft) {
              var Dt = Ft * qt + ni, Et = $(mi, Fi, Xt + ke, gt);
              ri.push(Object.assign({}, Lt[Ft], {
                index: Ft,
                x: Dt,
                y: Et
              })), Ii += " L ".concat(Dt, " ").concat(Et);
            });
            var $t = ut("path", {
              class: "sparkline--line",
              d: Ii,
              fill: "none"
            }), si = ut("path", {
              class: "sparkline--fill",
              d: "".concat(Ii, " V ").concat(Ne, " L ").concat(ni, " ").concat(Ne, " Z"),
              stroke: "none"
            });
            if (St.appendChild(si), St.appendChild($t), Bt) {
              var at = ut("line", {
                class: "sparkline--cursor",
                x1: ne,
                x2: ne,
                y1: 0,
                y2: Ne,
                "stroke-width": tn
              }), Ke = ut("circle", {
                class: "sparkline--spot",
                cx: ne,
                cy: ne,
                r: ke
              });
              St.appendChild(at), St.appendChild(Ke);
              var st = ut("rect", {
                width: St.attributes.width.value,
                height: St.attributes.height.value,
                style: "fill: transparent; stroke: transparent",
                class: "sparkline--interaction-layer"
              });
              St.appendChild(st), st.addEventListener("mouseout", function(gt) {
                at.setAttribute("x1", ne), at.setAttribute("x2", ne), Ke.setAttribute("cx", ne), ue && ue(gt);
              }), st.addEventListener("mousemove", function(gt) {
                var Ft = gt.offsetX, Dt = ri.find(function(Be) {
                  return Be.x >= Ft;
                });
                Dt || (Dt = ri[At]);
                var Et, bt = ri[ri.indexOf(Dt) - 1], _t = (Et = bt ? bt.x + (Dt.x - bt.x) / 2 <= Ft ? Dt : bt : Dt).x, be = Et.y;
                Ke.setAttribute("cx", _t), Ke.setAttribute("cy", be), at.setAttribute("x1", _t), at.setAttribute("x2", _t), ve && ve(gt, Et);
              });
            }
          }
        }
        M.default = et;
      },
      function(V, M) {
        V.exports = function(v) {
          if (Array.isArray(v)) {
            for (var T = 0, j = new Array(v.length); T < v.length; T++) j[T] = v[T];
            return j;
          }
        };
      },
      function(V, M) {
        V.exports = function(v) {
          if (Symbol.iterator in Object(v) || Object.prototype.toString.call(v) === "[object Arguments]") return Array.from(v);
        };
      },
      function(V, M) {
        V.exports = function() {
          throw new TypeError("Invalid attempt to spread non-iterable instance");
        };
      }
    ])), Ra;
  }
  var bu = Lu();
  const xu = 600, Mn = {
    heading: [],
    speed: [],
    roll: [],
    pitch: []
  }, Rs = {
    heading: document.getElementById("gauge-heading"),
    speed: document.getElementById("gauge-speed"),
    roll: document.getElementById("gauge-roll"),
    pitch: document.getElementById("gauge-pitch")
  }, Fa = {
    heading: document.getElementById("spark-heading"),
    speed: document.getElementById("spark-speed"),
    roll: document.getElementById("spark-roll"),
    pitch: document.getElementById("spark-pitch")
  }, Cu = document.getElementById("gauge-rudder"), Mu = document.getElementById("gauge-thrust"), ku = document.getElementById("rudder-needle"), za = document.getElementById("rudder-needle-set"), wu = document.getElementById("thrust-bar-fill"), Na = document.getElementById("thrust-set-marker"), co = document.getElementById("gauge-rudder-set"), po = document.getElementById("gauge-thrust-set"), fo = document.getElementById("rudder-set-row"), _o = document.getElementById("thrust-set-row"), mo = document.getElementById("heading-set-row"), go = document.getElementById("gauge-heading-set");
  let yo = "autonomous", yr = null, zs = null;
  const Fs = document.getElementById("health-level"), so = document.getElementById("health-subsystems");
  function Eu(V) {
    if (!V) {
      Fs.textContent = "\u2014", Fs.removeAttribute("data-level"), so.innerHTML = "";
      const T = document.getElementById("health-panel");
      T && T.removeAttribute("data-health");
      return;
    }
    Fs.textContent = V.level.toUpperCase(), Fs.setAttribute("data-level", V.level);
    const M = document.getElementById("health-panel");
    M && M.setAttribute("data-health", V.level);
    const v = V.subsystems.map((T) => {
      const j = T.detail ? ` (${T.detail})` : "";
      return `<div class="health-sub-row">
      <span class="health-sub-name">${T.name}</span>
      <span class="health-sub-level" data-level="${T.level}">${T.level.toUpperCase()}${j}</span>
    </div>`;
    });
    so.innerHTML = v.join("");
  }
  function Bu(V) {
    yo = V, V !== "operated" && vo();
  }
  function Pu(V, M) {
    yr = V, zs = M, Lo();
  }
  function vo() {
    yr = null, zs = null, za.setAttribute("opacity", "0"), Na.style.opacity = "0", fo.classList.remove("visible"), _o.classList.remove("visible"), mo.classList.remove("visible"), co.textContent = "\u2014", po.textContent = "\u2014", go.textContent = "\u2014";
  }
  function Lo() {
    if (yo !== "operated" || yr === null || zs === null) {
      vo();
      return;
    }
    fo.classList.add("visible"), _o.classList.add("visible"), mo.classList.add("visible"), go.textContent = "\u2014", co.textContent = yr.toFixed(1);
    const M = Math.max(-35, Math.min(35, yr)) / 35 * 90;
    za.setAttribute("transform", `rotate(${M}, 60, 60)`), za.setAttribute("opacity", "0.85");
    const v = Math.max(0, Math.min(100, zs * 100));
    po.textContent = v.toFixed(0), Na.style.opacity = "0.9", Na.style.bottom = `${v}%`;
  }
  function Su(V) {
    Eu(V.health), V.heading;
    const M = {
      heading: V.heading,
      speed: V.speed * 1.94384,
      roll: V.roll,
      pitch: V.pitch
    };
    for (const et of Object.keys(Mn)) {
      const St = M[et];
      Mn[et].push(Number.isFinite(St) ? St : 0), Mn[et].length > xu && Mn[et].shift();
    }
    Rs.heading.textContent = V.heading.toFixed(1), Rs.speed.textContent = (V.speed * 1.94384).toFixed(2), Rs.roll.textContent = V.roll.toFixed(2), Rs.pitch.textContent = V.pitch.toFixed(2);
    const v = V.rudder_deg ?? 0, T = V.thrust_pct ?? 0;
    Cu.textContent = v.toFixed(1), Mu.textContent = T.toFixed(0);
    const $ = Math.max(-35, Math.min(35, v)) / 35 * 90;
    ku.setAttribute("transform", `rotate(${$}, 60, 60)`);
    const A = Math.max(0, Math.min(100, T));
    wu.style.height = `${A}%`, Lo();
    const ut = ze("--instrument-enhanced-primary-color") || "#5a84bf";
    for (const et of Object.keys(Fa)) Mn[et].length > 1 && (Fa[et].style.stroke = ut, bu.sparkline(Fa[et], Mn[et]));
  }
  const bo = [
    "location_fix",
    "heading_true_north_deg",
    "speed_over_ground_knots",
    "roll_deg",
    "pitch_deg"
  ], Du = [
    [
      "sl-loc-noise",
      "lbl-loc-noise"
    ]
  ];
  function Au() {
    const V = document.getElementById("subject-rows");
    V.innerHTML = "";
    const M = {
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
    for (const v of bo) {
      const T = M[v], j = document.createElement("tr");
      j.innerHTML = `
      <td>${v}</td>
      <td><input type="number" class="settings-input" data-subj="${v}" data-field="rate_hz"
          value="${T.rate_hz}" min="0.1" max="10" step="0.1" style="width:58px"></td>
      <td><input type="text" class="settings-input" data-subj="${v}" data-field="source_id"
          value="${T.source_id}" style="width:80px"></td>`, V.appendChild(j);
    }
  }
  function xo(V) {
    for (const v of bo) {
      const T = V.subjects[v];
      if (!T) continue;
      const j = document.querySelector(`#subject-rows input[data-subj="${v}"][data-field="rate_hz"]`), $ = document.querySelector(`#subject-rows input[data-subj="${v}"][data-field="source_id"]`);
      j && (j.value = String(T.rate_hz)), $ && ($.value = T.source_id);
    }
    const M = {
      location_noise_sigma_m: [
        "sl-loc-noise",
        "lbl-loc-noise"
      ]
    };
    for (const [v, [T, j]] of Object.entries(M)) {
      const $ = V[v];
      $ !== void 0 && (document.getElementById(T).value = String($), document.getElementById(j).textContent = String($));
    }
  }
  function Tu(V) {
    for (const [M, v] of Du) document.getElementById(M).addEventListener("input", function() {
      document.getElementById(v).textContent = this.value;
    });
    document.getElementById("btn-settings").addEventListener("click", () => {
      document.getElementById("settings-overlay").style.display = "flex";
    }), document.getElementById("btn-settings-close").addEventListener("click", () => {
      document.getElementById("settings-overlay").style.display = "none";
    }), document.getElementById("settings-overlay").addEventListener("click", function(M) {
      M.target === this && (this.style.display = "none");
    }), document.getElementById("btn-settings-save").addEventListener("click", () => {
      const M = {};
      for (const T of document.querySelectorAll("#subject-rows input")) {
        const j = T.dataset.subj, $ = T.dataset.field;
        M[j] || (M[j] = {
          rate_hz: 1,
          source_id: ""
        }), $ === "rate_hz" ? M[j].rate_hz = parseFloat(T.value) : M[j].source_id = T.value;
      }
      const v = {
        subjects: M,
        location_noise_sigma_m: parseFloat(document.getElementById("sl-loc-noise").value)
      };
      V(v), document.getElementById("settings-overlay").style.display = "none";
    });
  }
  const Ou = [
    "location_fix",
    "heading_true_north_deg",
    "speed_over_ground_knots",
    "roll_deg",
    "pitch_deg"
  ], Ru = [
    "drop",
    "stuck",
    "nan",
    "wrong_rate"
  ], ao = {
    drop: "Drop",
    stuck: "Stuck",
    nan: "NaN",
    wrong_rate: "2x Rate"
  }, oo = {
    location_fix: "Position",
    heading_true_north_deg: "Heading",
    speed_over_ground_knots: "Speed",
    roll_deg: "Roll",
    pitch_deg: "Pitch"
  };
  let uo = () => {
  };
  function Fu(V) {
    uo = V;
    const M = document.getElementById("fault-rows");
    M.innerHTML = "";
    for (const v of Ou) {
      const T = document.createElement("tr"), j = document.createElement("td");
      j.textContent = oo[v] ?? v, T.appendChild(j);
      for (const $ of Ru) {
        const A = document.createElement("td");
        A.style.textAlign = "center";
        const ut = document.createElement("button");
        ut.className = "fault-toggle", ut.dataset.subject = v, ut.dataset.faultType = $, ut.textContent = ao[$], ut.title = `${ao[$]} fault on ${oo[v]}`, ut.addEventListener("click", () => {
          const et = ut.classList.contains("active");
          uo(v, $, !et);
        }), A.appendChild(ut), T.appendChild(A);
      }
      M.appendChild(T);
    }
  }
  function Iu(V) {
    if (!V) return;
    const M = document.querySelectorAll(".fault-toggle");
    for (const v of M) {
      const T = v.dataset.subject, j = v.dataset.faultType, A = (V[T] ?? []).includes(j);
      A && !v.classList.contains("active") ? v.classList.add("active") : !A && v.classList.contains("active") && v.classList.remove("active");
    }
  }
  const kn = "v0", He = uu.Duration.milliseconds.of(5e3);
  class zu {
    constructor(M) {
      this.session = null, this.reconnectTimer = null, this.realm = M.realm, this.entityId = M.entityId, this.remoteApiUrl = M.remoteApiUrl, this.onFrame = M.onFrame, this.onManualSetpoint = M.onManualSetpoint ?? null;
    }
    prefix(M) {
      return `${this.realm}/@${kn}/${M ?? this.entityId}`;
    }
    async connect() {
      this.reconnectTimer && (clearTimeout(this.reconnectTimer), this.reconnectTimer = null);
      try {
        const M = new lu(this.remoteApiUrl);
        this.session = await hu(M), console.log("[zenoh] session opened to", this.remoteApiUrl), await this.subscribeSimFrame(), await this.subscribeManualSetpoint();
      } catch (M) {
        console.error("[zenoh] connection failed, retrying in 2s:", M), this.scheduleReconnect();
      }
    }
    scheduleReconnect() {
      this.reconnectTimer = setTimeout(() => this.connect(), 2e3);
    }
    async subscribeSimFrame() {
      if (!this.session) return;
      const M = `${this.realm}/@${kn}/*/pubsub/sim_frame/engine/0`;
      await this.session.declareSubscriber(M, {
        handler: (v) => {
          try {
            const T = v.payload().toString(), j = JSON.parse(T);
            this.onFrame(j);
          } catch (T) {
            console.warn("[zenoh] bad sim_frame payload:", T);
          }
        }
      }), console.log("[zenoh] subscribed to sim_frame (wildcard)");
    }
    async subscribeManualSetpoint() {
      if (!this.session || !this.onManualSetpoint) return;
      const M = `${this.realm}/@${kn}/*/pubsub/manual_setpoint/engine/0`, v = this.onManualSetpoint;
      await this.session.declareSubscriber(M, {
        handler: (T) => {
          try {
            const j = T.payload().toString(), $ = JSON.parse(j), ut = T.keyexpr().toString().split("/")[2] ?? "";
            v(ut, $);
          } catch (j) {
            console.warn("[zenoh] bad manual_setpoint payload:", j);
          }
        }
      }), console.log("[zenoh] subscribed to manual_setpoint (wildcard)");
    }
    async playFor(M) {
      var _a;
      await ((_a = this.session) == null ? void 0 : _a.put(`${this.prefix(M)}/control/play`, ""));
    }
    async pauseFor(M) {
      var _a;
      await ((_a = this.session) == null ? void 0 : _a.put(`${this.prefix(M)}/control/pause`, ""));
    }
    async stopFor(M) {
      var _a;
      await ((_a = this.session) == null ? void 0 : _a.put(`${this.prefix(M)}/control/stop`, ""));
    }
    async setSpeedFor(M, v) {
      var _a;
      await ((_a = this.session) == null ? void 0 : _a.put(`${this.prefix(M)}/control/set_speed`, JSON.stringify({
        value: v
      })));
    }
    async setModeFor(M, v) {
      var _a;
      await ((_a = this.session) == null ? void 0 : _a.put(`${this.prefix(M)}/control/set_mode`, JSON.stringify({
        mode: v
      })));
    }
    async manualControlFor(M, v, T) {
      var _a;
      await ((_a = this.session) == null ? void 0 : _a.put(`${this.prefix(M)}/control/manual`, JSON.stringify({
        rudder_deg: v,
        engine: T
      })));
    }
    async play() {
      return this.playFor(this.entityId);
    }
    async pause() {
      return this.pauseFor(this.entityId);
    }
    async stop() {
      return this.stopFor(this.entityId);
    }
    async setSpeed(M) {
      return this.setSpeedFor(this.entityId, M);
    }
    isSample(M) {
      return typeof M.keyexpr == "function";
    }
    async setHomeFor(M, v, T) {
      if (!this.session) return {
        ok: false,
        error: "not connected"
      };
      const j = await this.session.get(`${this.prefix(M)}/service/set_home`, {
        payload: JSON.stringify({
          lat: v,
          lng: T
        }),
        timeout: He
      });
      if (!j) return {
        ok: false,
        error: "no reply channel"
      };
      try {
        const A = (await j.receive()).result();
        if (this.isSample(A)) {
          const ut = A.payload().toString();
          return JSON.parse(ut);
        } else return {
          ok: false,
          error: A.payload().toString()
        };
      } catch {
        return {
          ok: false,
          error: "query timeout"
        };
      }
    }
    async loadRouteFor(M, v) {
      if (!this.session) return {
        ok: false,
        error: "not connected"
      };
      const T = await this.session.get(`${this.prefix(M)}/service/load_route`, {
        payload: JSON.stringify({
          waypoints: v
        }),
        timeout: He
      });
      if (!T) return {
        ok: false,
        error: "no reply channel"
      };
      try {
        const $ = (await T.receive()).result();
        if (this.isSample($)) {
          const A = $.payload().toString();
          return JSON.parse(A);
        } else return {
          ok: false,
          error: $.payload().toString()
        };
      } catch {
        return {
          ok: false,
          error: "query timeout"
        };
      }
    }
    async loadRoute(M) {
      return this.loadRouteFor(this.entityId, M);
    }
    async setGeofenceFor(M, v, T) {
      if (!this.session) return {
        ok: false,
        error: "not connected"
      };
      const j = await this.session.get(`${this.prefix(M)}/service/set_geofence`, {
        payload: JSON.stringify({
          polygon: v,
          action: T
        }),
        timeout: He
      });
      if (!j) return {
        ok: false,
        error: "no reply channel"
      };
      try {
        const A = (await j.receive()).result();
        if (this.isSample(A)) {
          const ut = A.payload().toString();
          return JSON.parse(ut);
        } else return {
          ok: false,
          error: A.payload().toString()
        };
      } catch {
        return {
          ok: false,
          error: "query timeout"
        };
      }
    }
    async clearGeofenceFor(M) {
      if (!this.session) return {
        ok: false,
        error: "not connected"
      };
      const v = await this.session.get(`${this.prefix(M)}/service/set_geofence`, {
        timeout: He
      });
      if (!v) return {
        ok: false,
        error: "no reply channel"
      };
      try {
        const j = (await v.receive()).result();
        if (this.isSample(j)) {
          const $ = j.payload().toString();
          return JSON.parse($);
        } else return {
          ok: false,
          error: j.payload().toString()
        };
      } catch {
        return {
          ok: false,
          error: "query timeout"
        };
      }
    }
    async spawnDrone(M, v) {
      if (!this.session) return {
        ok: false,
        error: "not connected"
      };
      const T = await this.session.get(`${this.realm}/@${kn}/service/spawn_drone`, {
        payload: JSON.stringify({
          lat: M,
          lng: v
        }),
        timeout: He
      });
      if (!T) return {
        ok: false,
        error: "no reply channel"
      };
      try {
        const $ = (await T.receive()).result();
        if (this.isSample($)) {
          const A = $.payload().toString();
          return JSON.parse(A);
        } else return {
          ok: false,
          error: $.payload().toString()
        };
      } catch {
        return {
          ok: false,
          error: "query timeout"
        };
      }
    }
    async deleteDrone(M) {
      if (!this.session) return {
        ok: false,
        error: "not connected"
      };
      const v = await this.session.get(`${this.realm}/@${kn}/service/delete_drone`, {
        payload: JSON.stringify({
          entity_id: M
        }),
        timeout: He
      });
      if (!v) return {
        ok: false,
        error: "no reply channel"
      };
      try {
        const j = (await v.receive()).result();
        if (this.isSample(j)) {
          const $ = j.payload().toString();
          return JSON.parse($);
        } else return {
          ok: false,
          error: j.payload().toString()
        };
      } catch {
        return {
          ok: false,
          error: "query timeout"
        };
      }
    }
    async listDrones() {
      if (!this.session) return {
        ok: false,
        error: "not connected"
      };
      const M = await this.session.get(`${this.realm}/@${kn}/service/list_drones`, {
        timeout: He
      });
      if (!M) return {
        ok: false,
        error: "no reply channel"
      };
      try {
        const T = (await M.receive()).result();
        if (this.isSample(T)) {
          const j = T.payload().toString();
          return JSON.parse(j);
        } else return {
          ok: false,
          error: T.payload().toString()
        };
      } catch {
        return {
          ok: false,
          error: "query timeout"
        };
      }
    }
    async getSettingsFor(M) {
      if (!this.session) return null;
      const v = await this.session.get(`${this.prefix(M)}/service/settings`, {
        timeout: He
      });
      if (!v) return null;
      try {
        const j = (await v.receive()).result();
        if (this.isSample(j)) {
          const $ = j.payload().toString();
          return JSON.parse($);
        }
        return null;
      } catch {
        return null;
      }
    }
    async getSettings() {
      return this.getSettingsFor(this.entityId);
    }
    async injectFaultFor(M, v, T) {
      if (!this.session) return false;
      const j = await this.session.get(`${this.prefix(M)}/service/fault`, {
        payload: JSON.stringify({
          action: "inject",
          subject: v,
          fault_type: T
        }),
        timeout: He
      });
      if (!j) return false;
      try {
        const A = (await j.receive()).result();
        return this.isSample(A) ? JSON.parse(A.payload().toString()).ok === true : false;
      } catch {
        return false;
      }
    }
    async injectFault(M, v) {
      return this.injectFaultFor(this.entityId, M, v);
    }
    async clearFaultFor(M, v, T) {
      if (!this.session) return false;
      const j = await this.session.get(`${this.prefix(M)}/service/fault`, {
        payload: JSON.stringify({
          action: "clear",
          subject: v,
          fault_type: T
        }),
        timeout: He
      });
      if (!j) return false;
      try {
        const A = (await j.receive()).result();
        return this.isSample(A) ? JSON.parse(A.payload().toString()).ok === true : false;
      } catch {
        return false;
      }
    }
    async clearFault(M, v) {
      return this.clearFaultFor(this.entityId, M, v);
    }
    async updateSettingsFor(M, v) {
      if (!this.session) return null;
      const T = await this.session.get(`${this.prefix(M)}/service/settings`, {
        payload: JSON.stringify(v),
        timeout: He
      });
      if (!T) return null;
      try {
        const $ = (await T.receive()).result();
        if (this.isSample($)) {
          const A = $.payload().toString();
          return JSON.parse(A);
        }
        return null;
      } catch {
        return null;
      }
    }
    async updateSettings(M) {
      return this.updateSettingsFor(this.entityId, M);
    }
  }
  const Ga = new URLSearchParams(window.location.search), Nu = Ga.get("realm") ?? "rise", Co = Ga.get("entity_id") ?? "ghost-drone", Gu = [
    "localhost",
    "127.0.0.1"
  ].includes(window.location.hostname) ? "localhost" : window.location.hostname, ju = Ga.get("remote_api") ?? `ws://${Gu}:10001`;
  let Ct = Co;
  const Mo = /* @__PURE__ */ new Set();
  let lo = null;
  const dt = new yu();
  dt.selectedDroneId = Ct;
  let Yt;
  const wt = new vu({
    onPlay: async () => {
      Ct && await Yt.playFor(Ct);
    },
    onStop: () => {
      Ct && (Yt.stopFor(Ct), wt.clearRouteSet(Ct));
    },
    onSpeedChange: (V) => {
      Ct && Yt.setSpeedFor(Ct, V);
    },
    onClear: () => {
      wt.operationMode === "operated" && (dt.clearWaypoints(), Ct && wt.clearRouteSet(Ct), wt.updateControlStates(0));
    },
    onDrawToggle: () => {
      dt.toggleDrawMode(), wt.setDrawModeActive(dt.drawModeActive), wt.setSpawnModeActive(dt.spawnModeActive), dt.updateWaypointDraggability();
    },
    onSpawnToggle: () => {
      dt.toggleSpawnMode(), wt.setSpawnModeActive(dt.spawnModeActive), wt.setDrawModeActive(dt.drawModeActive);
    },
    onDeleteDrone: async () => {
      if (!Ct) return;
      const V = await Yt.deleteDrone(Ct);
      if (V.ok) {
        Mo.add(Ct), wt.clearRouteSet(Ct), dt.removeDrone(Ct), dt.clearWaypoints(), await Gs();
        const M = await Yt.listDrones();
        M.ok && M.drones && M.drones.length > 0 ? Ns(M.drones[0].entity_id) : (Ct = "", dt.selectedDroneId = null, wt.simState = "playing", wt.updateControlStates(0));
      } else console.error("[delete]", V.error);
    },
    onSettingsOpen: () => {
      document.getElementById("settings-overlay").style.display = "flex";
    },
    onManualControl: (V, M) => {
      Ct && Yt.manualControlFor(Ct, V, M);
    },
    onRouteSet: async () => {
      if (!Ct || dt.waypoints.length < 2) return;
      const V = dt.waypoints.map((v) => [
        v.lat,
        v.lng
      ]), M = await Yt.loadRouteFor(Ct, V);
      if (!M.ok) {
        console.error("[loadRoute]", M.error);
        return;
      }
      wt.markRouteSet(Ct), wt.flashRouteSetConfirm(), dt.drawModeActive && (dt.toggleDrawMode(), wt.setDrawModeActive(false)), wt.updateControlStates(dt.waypoints.length);
    },
    onGeofenceToggle: () => {
      dt.toggleGeofenceMode(), wt.setGeofenceModeActive(dt.geofenceModeActive), wt.setSpawnModeActive(dt.spawnModeActive), wt.setDrawModeActive(dt.drawModeActive);
    },
    onGeofenceSet: async () => {
      if (!Ct || dt.geofenceVertices.length < 3) return;
      const V = dt.geofenceVertices.map((T) => [
        T.lat,
        T.lng
      ]), M = wt.getGeofenceAction(), v = await Yt.setGeofenceFor(Ct, V, M);
      if (!v.ok) {
        console.error("[setGeofence]", v.error);
        return;
      }
      wt.flashGeofenceSetConfirm(), dt.geofenceModeActive && (dt.toggleGeofenceMode(), wt.setGeofenceModeActive(false));
    },
    onGeofenceClear: async () => {
      if (!Ct) return;
      const V = await Yt.clearGeofenceFor(Ct);
      V.ok || console.error("[clearGeofence]", V.error), dt.clearGeofence();
    }
  });
  function Ns(V) {
    Ct = V, dt.selectDrone(V), wt.setSelectedDrone(V);
  }
  wt.onDroneSelected = (V) => Ns(V);
  dt.onDroneSelected = (V) => Ns(V);
  dt.onDroneDragged = async (V, M, v) => {
    const T = await Yt.setHomeFor(V, M, v);
    T.ok || console.error("[set_home]", T.error);
  };
  dt.getOperationMode = () => wt.operationMode;
  dt.onWaypointsChanged = () => wt.updateControlStates(dt.waypoints.length);
  Yt = new zu({
    realm: Nu,
    entityId: Co,
    remoteApiUrl: ju,
    onManualSetpoint: (V, M) => {
      V === Ct && Pu(M.rudder_deg, M.engine);
    },
    onFrame: (V) => {
      if (Math.abs(V.lat) < 0.01 && Math.abs(V.lng) < 0.01) return;
      const M = V.entity_id;
      Mo.has(M) || (dt.updateDronePosition(M, V.lat, V.lng, V.heading, V.operation_mode ?? "operated"), M === Ct && (V.heading, wt.simState = V.state, V.operation_mode && V.operation_mode !== lo && (lo = V.operation_mode, wt.setOperationMode(V.operation_mode, V.heading), Bu(V.operation_mode), V.operation_mode === "autonomous" && dt.drawModeActive && (dt.disableDrawMode(), wt.setDrawModeActive(false)), V.operation_mode === "autonomous" && dt.geofenceModeActive && (dt.disableGeofenceMode(), wt.setGeofenceModeActive(false)), dt.updateWaypointDraggability()), wt.updateControlStates(dt.waypoints.length), Su(V), Iu(V.faults), dt.setGeofenceBreached(V.geofence_breached ?? false)));
    }
  });
  dt.onSpawnClick = async (V, M) => {
    const v = await Yt.spawnDrone(V, M);
    v.ok && v.entity_id ? (dt.spawnModeActive = false, wt.setSpawnModeActive(false), Ns(v.entity_id), Gs()) : console.error("[spawn]", v.error);
  };
  async function Gs() {
    const V = await Yt.listDrones();
    V.ok && V.drones && wt.updateDroneList(V.drones);
  }
  Fu((V, M, v) => {
    Ct && (v ? Yt.injectFaultFor(Ct, V, M) : Yt.clearFaultFor(Ct, V, M));
  });
  Au();
  Tu(async (V) => {
    if (!Ct) return;
    const M = await Yt.updateSettingsFor(Ct, V);
    M && xo(M);
  });
  du(() => {
    dt.refreshRoute(), dt.refreshDroneIcon();
  });
  cu();
  wt.updateControlStates(0);
  Yt.connect().then(async () => {
    const V = await Yt.getSettingsFor(Ct);
    V && xo(V), await Gs();
  });
  setInterval(Gs, 5e3);
});
