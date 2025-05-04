import { u as useNavigate, r as reactExports, j as jsxRuntimeExports, b as api } from "./index-Chp7mPQo.js";
import { B as ButonGrande } from "./ButtonGrande-B2aAx_Si.js";
/* empty css               */
/* empty css                        */
import { L as LabelInput } from "./LabelInput-CGY0_ZeZ.js";
import { r as registerVersion, L as Logger, _ as _registerComponent, C as Component, a as _isFirebaseServerApp, F as FirebaseError, b as LogLevel, g as getApp, c as _getProvider, d as getDefaultEmulatorHostnameAndPort, e as deepEqual, f as createMockUserToken, S as SDK_VERSION, i as initializeApp, h as getAuth, s as setPersistence, j as debugErrorMap, G as GoogleAuthProvider, k as FacebookAuthProvider, l as browserSessionPersistence, m as signInWithEmailAndPassword } from "./index-e84cf44d-BHhhIDao.js";
var name = "firebase";
var version = "11.4.0";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
registerVersion(name, version, "app");
var commonjsGlobal$1 = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/
var Integer;
(function() {
  var h;
  /** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  */
  function k(f, a) {
    function c() {
    }
    c.prototype = a.prototype;
    f.D = a.prototype;
    f.prototype = new c();
    f.prototype.constructor = f;
    f.C = function(d, e, g) {
      for (var b2 = Array(arguments.length - 2), r = 2; r < arguments.length; r++) b2[r - 2] = arguments[r];
      return a.prototype[e].apply(d, b2);
    };
  }
  function l() {
    this.blockSize = -1;
  }
  function m() {
    this.blockSize = -1;
    this.blockSize = 64;
    this.g = Array(4);
    this.B = Array(this.blockSize);
    this.o = this.h = 0;
    this.s();
  }
  k(m, l);
  m.prototype.s = function() {
    this.g[0] = 1732584193;
    this.g[1] = 4023233417;
    this.g[2] = 2562383102;
    this.g[3] = 271733878;
    this.o = this.h = 0;
  };
  function n(f, a, c) {
    c || (c = 0);
    var d = Array(16);
    if ("string" === typeof a) for (var e = 0; 16 > e; ++e) d[e] = a.charCodeAt(c++) | a.charCodeAt(c++) << 8 | a.charCodeAt(c++) << 16 | a.charCodeAt(c++) << 24;
    else for (e = 0; 16 > e; ++e) d[e] = a[c++] | a[c++] << 8 | a[c++] << 16 | a[c++] << 24;
    a = f.g[0];
    c = f.g[1];
    e = f.g[2];
    var g = f.g[3];
    var b2 = a + (g ^ c & (e ^ g)) + d[0] + 3614090360 & 4294967295;
    a = c + (b2 << 7 & 4294967295 | b2 >>> 25);
    b2 = g + (e ^ a & (c ^ e)) + d[1] + 3905402710 & 4294967295;
    g = a + (b2 << 12 & 4294967295 | b2 >>> 20);
    b2 = e + (c ^ g & (a ^ c)) + d[2] + 606105819 & 4294967295;
    e = g + (b2 << 17 & 4294967295 | b2 >>> 15);
    b2 = c + (a ^ e & (g ^ a)) + d[3] + 3250441966 & 4294967295;
    c = e + (b2 << 22 & 4294967295 | b2 >>> 10);
    b2 = a + (g ^ c & (e ^ g)) + d[4] + 4118548399 & 4294967295;
    a = c + (b2 << 7 & 4294967295 | b2 >>> 25);
    b2 = g + (e ^ a & (c ^ e)) + d[5] + 1200080426 & 4294967295;
    g = a + (b2 << 12 & 4294967295 | b2 >>> 20);
    b2 = e + (c ^ g & (a ^ c)) + d[6] + 2821735955 & 4294967295;
    e = g + (b2 << 17 & 4294967295 | b2 >>> 15);
    b2 = c + (a ^ e & (g ^ a)) + d[7] + 4249261313 & 4294967295;
    c = e + (b2 << 22 & 4294967295 | b2 >>> 10);
    b2 = a + (g ^ c & (e ^ g)) + d[8] + 1770035416 & 4294967295;
    a = c + (b2 << 7 & 4294967295 | b2 >>> 25);
    b2 = g + (e ^ a & (c ^ e)) + d[9] + 2336552879 & 4294967295;
    g = a + (b2 << 12 & 4294967295 | b2 >>> 20);
    b2 = e + (c ^ g & (a ^ c)) + d[10] + 4294925233 & 4294967295;
    e = g + (b2 << 17 & 4294967295 | b2 >>> 15);
    b2 = c + (a ^ e & (g ^ a)) + d[11] + 2304563134 & 4294967295;
    c = e + (b2 << 22 & 4294967295 | b2 >>> 10);
    b2 = a + (g ^ c & (e ^ g)) + d[12] + 1804603682 & 4294967295;
    a = c + (b2 << 7 & 4294967295 | b2 >>> 25);
    b2 = g + (e ^ a & (c ^ e)) + d[13] + 4254626195 & 4294967295;
    g = a + (b2 << 12 & 4294967295 | b2 >>> 20);
    b2 = e + (c ^ g & (a ^ c)) + d[14] + 2792965006 & 4294967295;
    e = g + (b2 << 17 & 4294967295 | b2 >>> 15);
    b2 = c + (a ^ e & (g ^ a)) + d[15] + 1236535329 & 4294967295;
    c = e + (b2 << 22 & 4294967295 | b2 >>> 10);
    b2 = a + (e ^ g & (c ^ e)) + d[1] + 4129170786 & 4294967295;
    a = c + (b2 << 5 & 4294967295 | b2 >>> 27);
    b2 = g + (c ^ e & (a ^ c)) + d[6] + 3225465664 & 4294967295;
    g = a + (b2 << 9 & 4294967295 | b2 >>> 23);
    b2 = e + (a ^ c & (g ^ a)) + d[11] + 643717713 & 4294967295;
    e = g + (b2 << 14 & 4294967295 | b2 >>> 18);
    b2 = c + (g ^ a & (e ^ g)) + d[0] + 3921069994 & 4294967295;
    c = e + (b2 << 20 & 4294967295 | b2 >>> 12);
    b2 = a + (e ^ g & (c ^ e)) + d[5] + 3593408605 & 4294967295;
    a = c + (b2 << 5 & 4294967295 | b2 >>> 27);
    b2 = g + (c ^ e & (a ^ c)) + d[10] + 38016083 & 4294967295;
    g = a + (b2 << 9 & 4294967295 | b2 >>> 23);
    b2 = e + (a ^ c & (g ^ a)) + d[15] + 3634488961 & 4294967295;
    e = g + (b2 << 14 & 4294967295 | b2 >>> 18);
    b2 = c + (g ^ a & (e ^ g)) + d[4] + 3889429448 & 4294967295;
    c = e + (b2 << 20 & 4294967295 | b2 >>> 12);
    b2 = a + (e ^ g & (c ^ e)) + d[9] + 568446438 & 4294967295;
    a = c + (b2 << 5 & 4294967295 | b2 >>> 27);
    b2 = g + (c ^ e & (a ^ c)) + d[14] + 3275163606 & 4294967295;
    g = a + (b2 << 9 & 4294967295 | b2 >>> 23);
    b2 = e + (a ^ c & (g ^ a)) + d[3] + 4107603335 & 4294967295;
    e = g + (b2 << 14 & 4294967295 | b2 >>> 18);
    b2 = c + (g ^ a & (e ^ g)) + d[8] + 1163531501 & 4294967295;
    c = e + (b2 << 20 & 4294967295 | b2 >>> 12);
    b2 = a + (e ^ g & (c ^ e)) + d[13] + 2850285829 & 4294967295;
    a = c + (b2 << 5 & 4294967295 | b2 >>> 27);
    b2 = g + (c ^ e & (a ^ c)) + d[2] + 4243563512 & 4294967295;
    g = a + (b2 << 9 & 4294967295 | b2 >>> 23);
    b2 = e + (a ^ c & (g ^ a)) + d[7] + 1735328473 & 4294967295;
    e = g + (b2 << 14 & 4294967295 | b2 >>> 18);
    b2 = c + (g ^ a & (e ^ g)) + d[12] + 2368359562 & 4294967295;
    c = e + (b2 << 20 & 4294967295 | b2 >>> 12);
    b2 = a + (c ^ e ^ g) + d[5] + 4294588738 & 4294967295;
    a = c + (b2 << 4 & 4294967295 | b2 >>> 28);
    b2 = g + (a ^ c ^ e) + d[8] + 2272392833 & 4294967295;
    g = a + (b2 << 11 & 4294967295 | b2 >>> 21);
    b2 = e + (g ^ a ^ c) + d[11] + 1839030562 & 4294967295;
    e = g + (b2 << 16 & 4294967295 | b2 >>> 16);
    b2 = c + (e ^ g ^ a) + d[14] + 4259657740 & 4294967295;
    c = e + (b2 << 23 & 4294967295 | b2 >>> 9);
    b2 = a + (c ^ e ^ g) + d[1] + 2763975236 & 4294967295;
    a = c + (b2 << 4 & 4294967295 | b2 >>> 28);
    b2 = g + (a ^ c ^ e) + d[4] + 1272893353 & 4294967295;
    g = a + (b2 << 11 & 4294967295 | b2 >>> 21);
    b2 = e + (g ^ a ^ c) + d[7] + 4139469664 & 4294967295;
    e = g + (b2 << 16 & 4294967295 | b2 >>> 16);
    b2 = c + (e ^ g ^ a) + d[10] + 3200236656 & 4294967295;
    c = e + (b2 << 23 & 4294967295 | b2 >>> 9);
    b2 = a + (c ^ e ^ g) + d[13] + 681279174 & 4294967295;
    a = c + (b2 << 4 & 4294967295 | b2 >>> 28);
    b2 = g + (a ^ c ^ e) + d[0] + 3936430074 & 4294967295;
    g = a + (b2 << 11 & 4294967295 | b2 >>> 21);
    b2 = e + (g ^ a ^ c) + d[3] + 3572445317 & 4294967295;
    e = g + (b2 << 16 & 4294967295 | b2 >>> 16);
    b2 = c + (e ^ g ^ a) + d[6] + 76029189 & 4294967295;
    c = e + (b2 << 23 & 4294967295 | b2 >>> 9);
    b2 = a + (c ^ e ^ g) + d[9] + 3654602809 & 4294967295;
    a = c + (b2 << 4 & 4294967295 | b2 >>> 28);
    b2 = g + (a ^ c ^ e) + d[12] + 3873151461 & 4294967295;
    g = a + (b2 << 11 & 4294967295 | b2 >>> 21);
    b2 = e + (g ^ a ^ c) + d[15] + 530742520 & 4294967295;
    e = g + (b2 << 16 & 4294967295 | b2 >>> 16);
    b2 = c + (e ^ g ^ a) + d[2] + 3299628645 & 4294967295;
    c = e + (b2 << 23 & 4294967295 | b2 >>> 9);
    b2 = a + (e ^ (c | ~g)) + d[0] + 4096336452 & 4294967295;
    a = c + (b2 << 6 & 4294967295 | b2 >>> 26);
    b2 = g + (c ^ (a | ~e)) + d[7] + 1126891415 & 4294967295;
    g = a + (b2 << 10 & 4294967295 | b2 >>> 22);
    b2 = e + (a ^ (g | ~c)) + d[14] + 2878612391 & 4294967295;
    e = g + (b2 << 15 & 4294967295 | b2 >>> 17);
    b2 = c + (g ^ (e | ~a)) + d[5] + 4237533241 & 4294967295;
    c = e + (b2 << 21 & 4294967295 | b2 >>> 11);
    b2 = a + (e ^ (c | ~g)) + d[12] + 1700485571 & 4294967295;
    a = c + (b2 << 6 & 4294967295 | b2 >>> 26);
    b2 = g + (c ^ (a | ~e)) + d[3] + 2399980690 & 4294967295;
    g = a + (b2 << 10 & 4294967295 | b2 >>> 22);
    b2 = e + (a ^ (g | ~c)) + d[10] + 4293915773 & 4294967295;
    e = g + (b2 << 15 & 4294967295 | b2 >>> 17);
    b2 = c + (g ^ (e | ~a)) + d[1] + 2240044497 & 4294967295;
    c = e + (b2 << 21 & 4294967295 | b2 >>> 11);
    b2 = a + (e ^ (c | ~g)) + d[8] + 1873313359 & 4294967295;
    a = c + (b2 << 6 & 4294967295 | b2 >>> 26);
    b2 = g + (c ^ (a | ~e)) + d[15] + 4264355552 & 4294967295;
    g = a + (b2 << 10 & 4294967295 | b2 >>> 22);
    b2 = e + (a ^ (g | ~c)) + d[6] + 2734768916 & 4294967295;
    e = g + (b2 << 15 & 4294967295 | b2 >>> 17);
    b2 = c + (g ^ (e | ~a)) + d[13] + 1309151649 & 4294967295;
    c = e + (b2 << 21 & 4294967295 | b2 >>> 11);
    b2 = a + (e ^ (c | ~g)) + d[4] + 4149444226 & 4294967295;
    a = c + (b2 << 6 & 4294967295 | b2 >>> 26);
    b2 = g + (c ^ (a | ~e)) + d[11] + 3174756917 & 4294967295;
    g = a + (b2 << 10 & 4294967295 | b2 >>> 22);
    b2 = e + (a ^ (g | ~c)) + d[2] + 718787259 & 4294967295;
    e = g + (b2 << 15 & 4294967295 | b2 >>> 17);
    b2 = c + (g ^ (e | ~a)) + d[9] + 3951481745 & 4294967295;
    f.g[0] = f.g[0] + a & 4294967295;
    f.g[1] = f.g[1] + (e + (b2 << 21 & 4294967295 | b2 >>> 11)) & 4294967295;
    f.g[2] = f.g[2] + e & 4294967295;
    f.g[3] = f.g[3] + g & 4294967295;
  }
  m.prototype.u = function(f, a) {
    void 0 === a && (a = f.length);
    for (var c = a - this.blockSize, d = this.B, e = this.h, g = 0; g < a; ) {
      if (0 == e) for (; g <= c; ) n(this, f, g), g += this.blockSize;
      if ("string" === typeof f) for (; g < a; ) {
        if (d[e++] = f.charCodeAt(g++), e == this.blockSize) {
          n(this, d);
          e = 0;
          break;
        }
      }
      else for (; g < a; ) if (d[e++] = f[g++], e == this.blockSize) {
        n(this, d);
        e = 0;
        break;
      }
    }
    this.h = e;
    this.o += a;
  };
  m.prototype.v = function() {
    var f = Array((56 > this.h ? this.blockSize : 2 * this.blockSize) - this.h);
    f[0] = 128;
    for (var a = 1; a < f.length - 8; ++a) f[a] = 0;
    var c = 8 * this.o;
    for (a = f.length - 8; a < f.length; ++a) f[a] = c & 255, c /= 256;
    this.u(f);
    f = Array(16);
    for (a = c = 0; 4 > a; ++a) for (var d = 0; 32 > d; d += 8) f[c++] = this.g[a] >>> d & 255;
    return f;
  };
  function p(f, a) {
    var c = q;
    return Object.prototype.hasOwnProperty.call(c, f) ? c[f] : c[f] = a(f);
  }
  function t(f, a) {
    this.h = a;
    for (var c = [], d = true, e = f.length - 1; 0 <= e; e--) {
      var g = f[e] | 0;
      d && g == a || (c[e] = g, d = false);
    }
    this.g = c;
  }
  var q = {};
  function u(f) {
    return -128 <= f && 128 > f ? p(f, function(a) {
      return new t([a | 0], 0 > a ? -1 : 0);
    }) : new t([f | 0], 0 > f ? -1 : 0);
  }
  function v2(f) {
    if (isNaN(f) || !isFinite(f)) return w;
    if (0 > f) return x(v2(-f));
    for (var a = [], c = 1, d = 0; f >= c; d++) a[d] = f / c | 0, c *= 4294967296;
    return new t(a, 0);
  }
  function y(f, a) {
    if (0 == f.length) throw Error("number format error: empty string");
    a = a || 10;
    if (2 > a || 36 < a) throw Error("radix out of range: " + a);
    if ("-" == f.charAt(0)) return x(y(f.substring(1), a));
    if (0 <= f.indexOf("-")) throw Error('number format error: interior "-" character');
    for (var c = v2(Math.pow(a, 8)), d = w, e = 0; e < f.length; e += 8) {
      var g = Math.min(8, f.length - e), b2 = parseInt(f.substring(e, e + g), a);
      8 > g ? (g = v2(Math.pow(a, g)), d = d.j(g).add(v2(b2))) : (d = d.j(c), d = d.add(v2(b2)));
    }
    return d;
  }
  var w = u(0), z = u(1), A = u(16777216);
  h = t.prototype;
  h.m = function() {
    if (B(this)) return -x(this).m();
    for (var f = 0, a = 1, c = 0; c < this.g.length; c++) {
      var d = this.i(c);
      f += (0 <= d ? d : 4294967296 + d) * a;
      a *= 4294967296;
    }
    return f;
  };
  h.toString = function(f) {
    f = f || 10;
    if (2 > f || 36 < f) throw Error("radix out of range: " + f);
    if (C2(this)) return "0";
    if (B(this)) return "-" + x(this).toString(f);
    for (var a = v2(Math.pow(f, 6)), c = this, d = ""; ; ) {
      var e = D2(c, a).g;
      c = F(c, e.j(a));
      var g = ((0 < c.g.length ? c.g[0] : c.h) >>> 0).toString(f);
      c = e;
      if (C2(c)) return g + d;
      for (; 6 > g.length; ) g = "0" + g;
      d = g + d;
    }
  };
  h.i = function(f) {
    return 0 > f ? 0 : f < this.g.length ? this.g[f] : this.h;
  };
  function C2(f) {
    if (0 != f.h) return false;
    for (var a = 0; a < f.g.length; a++) if (0 != f.g[a]) return false;
    return true;
  }
  function B(f) {
    return -1 == f.h;
  }
  h.l = function(f) {
    f = F(this, f);
    return B(f) ? -1 : C2(f) ? 0 : 1;
  };
  function x(f) {
    for (var a = f.g.length, c = [], d = 0; d < a; d++) c[d] = ~f.g[d];
    return new t(c, ~f.h).add(z);
  }
  h.abs = function() {
    return B(this) ? x(this) : this;
  };
  h.add = function(f) {
    for (var a = Math.max(this.g.length, f.g.length), c = [], d = 0, e = 0; e <= a; e++) {
      var g = d + (this.i(e) & 65535) + (f.i(e) & 65535), b2 = (g >>> 16) + (this.i(e) >>> 16) + (f.i(e) >>> 16);
      d = b2 >>> 16;
      g &= 65535;
      b2 &= 65535;
      c[e] = b2 << 16 | g;
    }
    return new t(c, c[c.length - 1] & -2147483648 ? -1 : 0);
  };
  function F(f, a) {
    return f.add(x(a));
  }
  h.j = function(f) {
    if (C2(this) || C2(f)) return w;
    if (B(this)) return B(f) ? x(this).j(x(f)) : x(x(this).j(f));
    if (B(f)) return x(this.j(x(f)));
    if (0 > this.l(A) && 0 > f.l(A)) return v2(this.m() * f.m());
    for (var a = this.g.length + f.g.length, c = [], d = 0; d < 2 * a; d++) c[d] = 0;
    for (d = 0; d < this.g.length; d++) for (var e = 0; e < f.g.length; e++) {
      var g = this.i(d) >>> 16, b2 = this.i(d) & 65535, r = f.i(e) >>> 16, E = f.i(e) & 65535;
      c[2 * d + 2 * e] += b2 * E;
      G(c, 2 * d + 2 * e);
      c[2 * d + 2 * e + 1] += g * E;
      G(c, 2 * d + 2 * e + 1);
      c[2 * d + 2 * e + 1] += b2 * r;
      G(c, 2 * d + 2 * e + 1);
      c[2 * d + 2 * e + 2] += g * r;
      G(c, 2 * d + 2 * e + 2);
    }
    for (d = 0; d < a; d++) c[d] = c[2 * d + 1] << 16 | c[2 * d];
    for (d = a; d < 2 * a; d++) c[d] = 0;
    return new t(c, 0);
  };
  function G(f, a) {
    for (; (f[a] & 65535) != f[a]; ) f[a + 1] += f[a] >>> 16, f[a] &= 65535, a++;
  }
  function H(f, a) {
    this.g = f;
    this.h = a;
  }
  function D2(f, a) {
    if (C2(a)) throw Error("division by zero");
    if (C2(f)) return new H(w, w);
    if (B(f)) return a = D2(x(f), a), new H(x(a.g), x(a.h));
    if (B(a)) return a = D2(f, x(a)), new H(x(a.g), a.h);
    if (30 < f.g.length) {
      if (B(f) || B(a)) throw Error("slowDivide_ only works with positive integers.");
      for (var c = z, d = a; 0 >= d.l(f); ) c = I(c), d = I(d);
      var e = J(c, 1), g = J(d, 1);
      d = J(d, 2);
      for (c = J(c, 2); !C2(d); ) {
        var b2 = g.add(d);
        0 >= b2.l(f) && (e = e.add(c), g = b2);
        d = J(d, 1);
        c = J(c, 1);
      }
      a = F(f, e.j(a));
      return new H(e, a);
    }
    for (e = w; 0 <= f.l(a); ) {
      c = Math.max(1, Math.floor(f.m() / a.m()));
      d = Math.ceil(Math.log(c) / Math.LN2);
      d = 48 >= d ? 1 : Math.pow(2, d - 48);
      g = v2(c);
      for (b2 = g.j(a); B(b2) || 0 < b2.l(f); ) c -= d, g = v2(c), b2 = g.j(a);
      C2(g) && (g = z);
      e = e.add(g);
      f = F(f, b2);
    }
    return new H(e, f);
  }
  h.A = function(f) {
    return D2(this, f).h;
  };
  h.and = function(f) {
    for (var a = Math.max(this.g.length, f.g.length), c = [], d = 0; d < a; d++) c[d] = this.i(d) & f.i(d);
    return new t(c, this.h & f.h);
  };
  h.or = function(f) {
    for (var a = Math.max(this.g.length, f.g.length), c = [], d = 0; d < a; d++) c[d] = this.i(d) | f.i(d);
    return new t(c, this.h | f.h);
  };
  h.xor = function(f) {
    for (var a = Math.max(this.g.length, f.g.length), c = [], d = 0; d < a; d++) c[d] = this.i(d) ^ f.i(d);
    return new t(c, this.h ^ f.h);
  };
  function I(f) {
    for (var a = f.g.length + 1, c = [], d = 0; d < a; d++) c[d] = f.i(d) << 1 | f.i(d - 1) >>> 31;
    return new t(c, f.h);
  }
  function J(f, a) {
    var c = a >> 5;
    a %= 32;
    for (var d = f.g.length - c, e = [], g = 0; g < d; g++) e[g] = 0 < a ? f.i(g + c) >>> a | f.i(g + c + 1) << 32 - a : f.i(g + c);
    return new t(e, f.h);
  }
  m.prototype.digest = m.prototype.v;
  m.prototype.reset = m.prototype.s;
  m.prototype.update = m.prototype.u;
  t.prototype.add = t.prototype.add;
  t.prototype.multiply = t.prototype.j;
  t.prototype.modulo = t.prototype.A;
  t.prototype.compare = t.prototype.l;
  t.prototype.toNumber = t.prototype.m;
  t.prototype.toString = t.prototype.toString;
  t.prototype.getBits = t.prototype.i;
  t.fromNumber = v2;
  t.fromString = y;
  Integer = t;
}).apply(typeof commonjsGlobal$1 !== "undefined" ? commonjsGlobal$1 : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
(function() {
  var h, aa = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b2, c) {
    if (a == Array.prototype || a == Object.prototype) return a;
    a[b2] = c.value;
    return a;
  };
  function ba(a) {
    a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof commonjsGlobal && commonjsGlobal];
    for (var b2 = 0; b2 < a.length; ++b2) {
      var c = a[b2];
      if (c && c.Math == Math) return c;
    }
    throw Error("Cannot find global object");
  }
  var ca = ba(this);
  function da(a, b2) {
    if (b2) a: {
      var c = ca;
      a = a.split(".");
      for (var d = 0; d < a.length - 1; d++) {
        var e = a[d];
        if (!(e in c)) break a;
        c = c[e];
      }
      a = a[a.length - 1];
      d = c[a];
      b2 = b2(d);
      b2 != d && null != b2 && aa(c, a, { configurable: true, writable: true, value: b2 });
    }
  }
  function ea(a, b2) {
    a instanceof String && (a += "");
    var c = 0, d = false, e = { next: function() {
      if (!d && c < a.length) {
        var f = c++;
        return { value: b2(f, a[f]), done: false };
      }
      d = true;
      return { done: true, value: void 0 };
    } };
    e[Symbol.iterator] = function() {
      return e;
    };
    return e;
  }
  da("Array.prototype.values", function(a) {
    return a ? a : function() {
      return ea(this, function(b2, c) {
        return c;
      });
    };
  });
  /** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  */
  var fa = fa || {}, k = this || self;
  function ha(a) {
    var b2 = typeof a;
    b2 = "object" != b2 ? b2 : a ? Array.isArray(a) ? "array" : b2 : "null";
    return "array" == b2 || "object" == b2 && "number" == typeof a.length;
  }
  function n(a) {
    var b2 = typeof a;
    return "object" == b2 && null != a || "function" == b2;
  }
  function ia(a, b2, c) {
    return a.call.apply(a.bind, arguments);
  }
  function ja(a, b2, c) {
    if (!a) throw Error();
    if (2 < arguments.length) {
      var d = Array.prototype.slice.call(arguments, 2);
      return function() {
        var e = Array.prototype.slice.call(arguments);
        Array.prototype.unshift.apply(e, d);
        return a.apply(b2, e);
      };
    }
    return function() {
      return a.apply(b2, arguments);
    };
  }
  function p(a, b2, c) {
    p = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ia : ja;
    return p.apply(null, arguments);
  }
  function ka(a, b2) {
    var c = Array.prototype.slice.call(arguments, 1);
    return function() {
      var d = c.slice();
      d.push.apply(d, arguments);
      return a.apply(this, d);
    };
  }
  function r(a, b2) {
    function c() {
    }
    c.prototype = b2.prototype;
    a.aa = b2.prototype;
    a.prototype = new c();
    a.prototype.constructor = a;
    a.Qb = function(d, e, f) {
      for (var g = Array(arguments.length - 2), m = 2; m < arguments.length; m++) g[m - 2] = arguments[m];
      return b2.prototype[e].apply(d, g);
    };
  }
  function la(a) {
    const b2 = a.length;
    if (0 < b2) {
      const c = Array(b2);
      for (let d = 0; d < b2; d++) c[d] = a[d];
      return c;
    }
    return [];
  }
  function ma(a, b2) {
    for (let c = 1; c < arguments.length; c++) {
      const d = arguments[c];
      if (ha(d)) {
        const e = a.length || 0, f = d.length || 0;
        a.length = e + f;
        for (let g = 0; g < f; g++) a[e + g] = d[g];
      } else a.push(d);
    }
  }
  class na {
    constructor(a, b2) {
      this.i = a;
      this.j = b2;
      this.h = 0;
      this.g = null;
    }
    get() {
      let a;
      0 < this.h ? (this.h--, a = this.g, this.g = a.next, a.next = null) : a = this.i();
      return a;
    }
  }
  function t(a) {
    return /^[\s\xa0]*$/.test(a);
  }
  function u() {
    var a = k.navigator;
    return a && (a = a.userAgent) ? a : "";
  }
  function oa(a) {
    oa[" "](a);
    return a;
  }
  oa[" "] = function() {
  };
  var pa = -1 != u().indexOf("Gecko") && !(-1 != u().toLowerCase().indexOf("webkit") && -1 == u().indexOf("Edge")) && !(-1 != u().indexOf("Trident") || -1 != u().indexOf("MSIE")) && -1 == u().indexOf("Edge");
  function qa(a, b2, c) {
    for (const d in a) b2.call(c, a[d], d, a);
  }
  function ra(a, b2) {
    for (const c in a) b2.call(void 0, a[c], c, a);
  }
  function sa(a) {
    const b2 = {};
    for (const c in a) b2[c] = a[c];
    return b2;
  }
  const ta = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
  function ua(a, b2) {
    let c, d;
    for (let e = 1; e < arguments.length; e++) {
      d = arguments[e];
      for (c in d) a[c] = d[c];
      for (let f = 0; f < ta.length; f++) c = ta[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
    }
  }
  function va(a) {
    var b2 = 1;
    a = a.split(":");
    const c = [];
    for (; 0 < b2 && a.length; ) c.push(a.shift()), b2--;
    a.length && c.push(a.join(":"));
    return c;
  }
  function wa(a) {
    k.setTimeout(() => {
      throw a;
    }, 0);
  }
  function xa() {
    var a = za;
    let b2 = null;
    a.g && (b2 = a.g, a.g = a.g.next, a.g || (a.h = null), b2.next = null);
    return b2;
  }
  class Aa {
    constructor() {
      this.h = this.g = null;
    }
    add(a, b2) {
      const c = Ba.get();
      c.set(a, b2);
      this.h ? this.h.next = c : this.g = c;
      this.h = c;
    }
  }
  var Ba = new na(() => new Ca(), (a) => a.reset());
  class Ca {
    constructor() {
      this.next = this.g = this.h = null;
    }
    set(a, b2) {
      this.h = a;
      this.g = b2;
      this.next = null;
    }
    reset() {
      this.next = this.g = this.h = null;
    }
  }
  let x, y = false, za = new Aa(), Ea = () => {
    const a = k.Promise.resolve(void 0);
    x = () => {
      a.then(Da);
    };
  };
  var Da = () => {
    for (var a; a = xa(); ) {
      try {
        a.h.call(a.g);
      } catch (c) {
        wa(c);
      }
      var b2 = Ba;
      b2.j(a);
      100 > b2.h && (b2.h++, a.next = b2.g, b2.g = a);
    }
    y = false;
  };
  function z() {
    this.s = this.s;
    this.C = this.C;
  }
  z.prototype.s = false;
  z.prototype.ma = function() {
    this.s || (this.s = true, this.N());
  };
  z.prototype.N = function() {
    if (this.C) for (; this.C.length; ) this.C.shift()();
  };
  function A(a, b2) {
    this.type = a;
    this.g = this.target = b2;
    this.defaultPrevented = false;
  }
  A.prototype.h = function() {
    this.defaultPrevented = true;
  };
  var Fa = function() {
    if (!k.addEventListener || !Object.defineProperty) return false;
    var a = false, b2 = Object.defineProperty({}, "passive", { get: function() {
      a = true;
    } });
    try {
      const c = () => {
      };
      k.addEventListener("test", c, b2);
      k.removeEventListener("test", c, b2);
    } catch (c) {
    }
    return a;
  }();
  function C2(a, b2) {
    A.call(this, a ? a.type : "");
    this.relatedTarget = this.g = this.target = null;
    this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
    this.key = "";
    this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = false;
    this.state = null;
    this.pointerId = 0;
    this.pointerType = "";
    this.i = null;
    if (a) {
      var c = this.type = a.type, d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
      this.target = a.target || a.srcElement;
      this.g = b2;
      if (b2 = a.relatedTarget) {
        if (pa) {
          a: {
            try {
              oa(b2.nodeName);
              var e = true;
              break a;
            } catch (f) {
            }
            e = false;
          }
          e || (b2 = null);
        }
      } else "mouseover" == c ? b2 = a.fromElement : "mouseout" == c && (b2 = a.toElement);
      this.relatedTarget = b2;
      d ? (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0) : (this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0);
      this.button = a.button;
      this.key = a.key || "";
      this.ctrlKey = a.ctrlKey;
      this.altKey = a.altKey;
      this.shiftKey = a.shiftKey;
      this.metaKey = a.metaKey;
      this.pointerId = a.pointerId || 0;
      this.pointerType = "string" === typeof a.pointerType ? a.pointerType : Ga[a.pointerType] || "";
      this.state = a.state;
      this.i = a;
      a.defaultPrevented && C2.aa.h.call(this);
    }
  }
  r(C2, A);
  var Ga = { 2: "touch", 3: "pen", 4: "mouse" };
  C2.prototype.h = function() {
    C2.aa.h.call(this);
    var a = this.i;
    a.preventDefault ? a.preventDefault() : a.returnValue = false;
  };
  var D2 = "closure_listenable_" + (1e6 * Math.random() | 0);
  var Ha = 0;
  function Ia(a, b2, c, d, e) {
    this.listener = a;
    this.proxy = null;
    this.src = b2;
    this.type = c;
    this.capture = !!d;
    this.ha = e;
    this.key = ++Ha;
    this.da = this.fa = false;
  }
  function Ja(a) {
    a.da = true;
    a.listener = null;
    a.proxy = null;
    a.src = null;
    a.ha = null;
  }
  function Ka(a) {
    this.src = a;
    this.g = {};
    this.h = 0;
  }
  Ka.prototype.add = function(a, b2, c, d, e) {
    var f = a.toString();
    a = this.g[f];
    a || (a = this.g[f] = [], this.h++);
    var g = La(a, b2, d, e);
    -1 < g ? (b2 = a[g], c || (b2.fa = false)) : (b2 = new Ia(b2, this.src, f, !!d, e), b2.fa = c, a.push(b2));
    return b2;
  };
  function Ma(a, b2) {
    var c = b2.type;
    if (c in a.g) {
      var d = a.g[c], e = Array.prototype.indexOf.call(d, b2, void 0), f;
      (f = 0 <= e) && Array.prototype.splice.call(d, e, 1);
      f && (Ja(b2), 0 == a.g[c].length && (delete a.g[c], a.h--));
    }
  }
  function La(a, b2, c, d) {
    for (var e = 0; e < a.length; ++e) {
      var f = a[e];
      if (!f.da && f.listener == b2 && f.capture == !!c && f.ha == d) return e;
    }
    return -1;
  }
  var Na = "closure_lm_" + (1e6 * Math.random() | 0), Oa = {};
  function Qa(a, b2, c, d, e) {
    if (Array.isArray(b2)) {
      for (var f = 0; f < b2.length; f++) Qa(a, b2[f], c, d, e);
      return null;
    }
    c = Sa(c);
    return a && a[D2] ? a.K(b2, c, n(d) ? !!d.capture : false, e) : Ta(a, b2, c, false, d, e);
  }
  function Ta(a, b2, c, d, e, f) {
    if (!b2) throw Error("Invalid event type");
    var g = n(e) ? !!e.capture : !!e, m = Ua(a);
    m || (a[Na] = m = new Ka(a));
    c = m.add(b2, c, d, g, f);
    if (c.proxy) return c;
    d = Va();
    c.proxy = d;
    d.src = a;
    d.listener = c;
    if (a.addEventListener) Fa || (e = g), void 0 === e && (e = false), a.addEventListener(b2.toString(), d, e);
    else if (a.attachEvent) a.attachEvent(Wa(b2.toString()), d);
    else if (a.addListener && a.removeListener) a.addListener(d);
    else throw Error("addEventListener and attachEvent are unavailable.");
    return c;
  }
  function Va() {
    function a(c) {
      return b2.call(a.src, a.listener, c);
    }
    const b2 = Xa;
    return a;
  }
  function Ya(a, b2, c, d, e) {
    if (Array.isArray(b2)) for (var f = 0; f < b2.length; f++) Ya(a, b2[f], c, d, e);
    else (d = n(d) ? !!d.capture : !!d, c = Sa(c), a && a[D2]) ? (a = a.i, b2 = String(b2).toString(), b2 in a.g && (f = a.g[b2], c = La(f, c, d, e), -1 < c && (Ja(f[c]), Array.prototype.splice.call(f, c, 1), 0 == f.length && (delete a.g[b2], a.h--)))) : a && (a = Ua(a)) && (b2 = a.g[b2.toString()], a = -1, b2 && (a = La(b2, c, d, e)), (c = -1 < a ? b2[a] : null) && Za(c));
  }
  function Za(a) {
    if ("number" !== typeof a && a && !a.da) {
      var b2 = a.src;
      if (b2 && b2[D2]) Ma(b2.i, a);
      else {
        var c = a.type, d = a.proxy;
        b2.removeEventListener ? b2.removeEventListener(c, d, a.capture) : b2.detachEvent ? b2.detachEvent(Wa(c), d) : b2.addListener && b2.removeListener && b2.removeListener(d);
        (c = Ua(b2)) ? (Ma(c, a), 0 == c.h && (c.src = null, b2[Na] = null)) : Ja(a);
      }
    }
  }
  function Wa(a) {
    return a in Oa ? Oa[a] : Oa[a] = "on" + a;
  }
  function Xa(a, b2) {
    if (a.da) a = true;
    else {
      b2 = new C2(b2, this);
      var c = a.listener, d = a.ha || a.src;
      a.fa && Za(a);
      a = c.call(d, b2);
    }
    return a;
  }
  function Ua(a) {
    a = a[Na];
    return a instanceof Ka ? a : null;
  }
  var $a = "__closure_events_fn_" + (1e9 * Math.random() >>> 0);
  function Sa(a) {
    if ("function" === typeof a) return a;
    a[$a] || (a[$a] = function(b2) {
      return a.handleEvent(b2);
    });
    return a[$a];
  }
  function E() {
    z.call(this);
    this.i = new Ka(this);
    this.M = this;
    this.F = null;
  }
  r(E, z);
  E.prototype[D2] = true;
  E.prototype.removeEventListener = function(a, b2, c, d) {
    Ya(this, a, b2, c, d);
  };
  function F(a, b2) {
    var c, d = a.F;
    if (d) for (c = []; d; d = d.F) c.push(d);
    a = a.M;
    d = b2.type || b2;
    if ("string" === typeof b2) b2 = new A(b2, a);
    else if (b2 instanceof A) b2.target = b2.target || a;
    else {
      var e = b2;
      b2 = new A(d, a);
      ua(b2, e);
    }
    e = true;
    if (c) for (var f = c.length - 1; 0 <= f; f--) {
      var g = b2.g = c[f];
      e = ab(g, d, true, b2) && e;
    }
    g = b2.g = a;
    e = ab(g, d, true, b2) && e;
    e = ab(g, d, false, b2) && e;
    if (c) for (f = 0; f < c.length; f++) g = b2.g = c[f], e = ab(g, d, false, b2) && e;
  }
  E.prototype.N = function() {
    E.aa.N.call(this);
    if (this.i) {
      var a = this.i, c;
      for (c in a.g) {
        for (var d = a.g[c], e = 0; e < d.length; e++) Ja(d[e]);
        delete a.g[c];
        a.h--;
      }
    }
    this.F = null;
  };
  E.prototype.K = function(a, b2, c, d) {
    return this.i.add(String(a), b2, false, c, d);
  };
  E.prototype.L = function(a, b2, c, d) {
    return this.i.add(String(a), b2, true, c, d);
  };
  function ab(a, b2, c, d) {
    b2 = a.i.g[String(b2)];
    if (!b2) return true;
    b2 = b2.concat();
    for (var e = true, f = 0; f < b2.length; ++f) {
      var g = b2[f];
      if (g && !g.da && g.capture == c) {
        var m = g.listener, q = g.ha || g.src;
        g.fa && Ma(a.i, g);
        e = false !== m.call(q, d) && e;
      }
    }
    return e && !d.defaultPrevented;
  }
  function bb(a, b2, c) {
    if ("function" === typeof a) c && (a = p(a, c));
    else if (a && "function" == typeof a.handleEvent) a = p(a.handleEvent, a);
    else throw Error("Invalid listener argument");
    return 2147483647 < Number(b2) ? -1 : k.setTimeout(a, b2 || 0);
  }
  function cb(a) {
    a.g = bb(() => {
      a.g = null;
      a.i && (a.i = false, cb(a));
    }, a.l);
    const b2 = a.h;
    a.h = null;
    a.m.apply(null, b2);
  }
  class eb extends z {
    constructor(a, b2) {
      super();
      this.m = a;
      this.l = b2;
      this.h = null;
      this.i = false;
      this.g = null;
    }
    j(a) {
      this.h = arguments;
      this.g ? this.i = true : cb(this);
    }
    N() {
      super.N();
      this.g && (k.clearTimeout(this.g), this.g = null, this.i = false, this.h = null);
    }
  }
  function G(a) {
    z.call(this);
    this.h = a;
    this.g = {};
  }
  r(G, z);
  var fb = [];
  function gb(a) {
    qa(a.g, function(b2, c) {
      this.g.hasOwnProperty(c) && Za(b2);
    }, a);
    a.g = {};
  }
  G.prototype.N = function() {
    G.aa.N.call(this);
    gb(this);
  };
  G.prototype.handleEvent = function() {
    throw Error("EventHandler.handleEvent not implemented");
  };
  var hb = k.JSON.stringify;
  var ib = k.JSON.parse;
  var jb = class {
    stringify(a) {
      return k.JSON.stringify(a, void 0);
    }
    parse(a) {
      return k.JSON.parse(a, void 0);
    }
  };
  function kb() {
  }
  kb.prototype.h = null;
  function lb(a) {
    return a.h || (a.h = a.i());
  }
  function mb() {
  }
  var H = { OPEN: "a", kb: "b", Ja: "c", wb: "d" };
  function nb() {
    A.call(this, "d");
  }
  r(nb, A);
  function ob() {
    A.call(this, "c");
  }
  r(ob, A);
  var I = {}, pb = null;
  function qb() {
    return pb = pb || new E();
  }
  I.La = "serverreachability";
  function rb(a) {
    A.call(this, I.La, a);
  }
  r(rb, A);
  function J(a) {
    const b2 = qb();
    F(b2, new rb(b2));
  }
  I.STAT_EVENT = "statevent";
  function sb(a, b2) {
    A.call(this, I.STAT_EVENT, a);
    this.stat = b2;
  }
  r(sb, A);
  function K(a) {
    const b2 = qb();
    F(b2, new sb(b2, a));
  }
  I.Ma = "timingevent";
  function tb(a, b2) {
    A.call(this, I.Ma, a);
    this.size = b2;
  }
  r(tb, A);
  function ub(a, b2) {
    if ("function" !== typeof a) throw Error("Fn must not be null and must be a function");
    return k.setTimeout(function() {
      a();
    }, b2);
  }
  function vb() {
    this.g = true;
  }
  vb.prototype.xa = function() {
    this.g = false;
  };
  function wb(a, b2, c, d, e, f) {
    a.info(function() {
      if (a.g) if (f) {
        var g = "";
        for (var m = f.split("&"), q = 0; q < m.length; q++) {
          var l = m[q].split("=");
          if (1 < l.length) {
            var v2 = l[0];
            l = l[1];
            var w = v2.split("_");
            g = 2 <= w.length && "type" == w[1] ? g + (v2 + "=" + l + "&") : g + (v2 + "=redacted&");
          }
        }
      } else g = null;
      else g = f;
      return "XMLHTTP REQ (" + d + ") [attempt " + e + "]: " + b2 + "\n" + c + "\n" + g;
    });
  }
  function xb(a, b2, c, d, e, f, g) {
    a.info(function() {
      return "XMLHTTP RESP (" + d + ") [ attempt " + e + "]: " + b2 + "\n" + c + "\n" + f + " " + g;
    });
  }
  function L(a, b2, c, d) {
    a.info(function() {
      return "XMLHTTP TEXT (" + b2 + "): " + yb(a, c) + (d ? " " + d : "");
    });
  }
  function zb(a, b2) {
    a.info(function() {
      return "TIMEOUT: " + b2;
    });
  }
  vb.prototype.info = function() {
  };
  function yb(a, b2) {
    if (!a.g) return b2;
    if (!b2) return null;
    try {
      var c = JSON.parse(b2);
      if (c) {
        for (a = 0; a < c.length; a++) if (Array.isArray(c[a])) {
          var d = c[a];
          if (!(2 > d.length)) {
            var e = d[1];
            if (Array.isArray(e) && !(1 > e.length)) {
              var f = e[0];
              if ("noop" != f && "stop" != f && "close" != f) for (var g = 1; g < e.length; g++) e[g] = "";
            }
          }
        }
      }
      return hb(c);
    } catch (m) {
      return b2;
    }
  }
  var Ab = { NO_ERROR: 0, TIMEOUT: 8 };
  var Bb = {};
  var Cb;
  function Db() {
  }
  r(Db, kb);
  Db.prototype.g = function() {
    return new XMLHttpRequest();
  };
  Db.prototype.i = function() {
    return {};
  };
  Cb = new Db();
  function M(a, b2, c, d) {
    this.j = a;
    this.i = b2;
    this.l = c;
    this.R = d || 1;
    this.U = new G(this);
    this.I = 45e3;
    this.H = null;
    this.o = false;
    this.m = this.A = this.v = this.L = this.F = this.S = this.B = null;
    this.D = [];
    this.g = null;
    this.C = 0;
    this.s = this.u = null;
    this.X = -1;
    this.J = false;
    this.O = 0;
    this.M = null;
    this.W = this.K = this.T = this.P = false;
    this.h = new Eb();
  }
  function Eb() {
    this.i = null;
    this.g = "";
    this.h = false;
  }
  var Fb = {}, Gb = {};
  function Hb(a, b2, c) {
    a.L = 1;
    a.v = Ib(N(b2));
    a.m = c;
    a.P = true;
    Jb(a, null);
  }
  function Jb(a, b2) {
    a.F = Date.now();
    Kb(a);
    a.A = N(a.v);
    var c = a.A, d = a.R;
    Array.isArray(d) || (d = [String(d)]);
    Lb(c.i, "t", d);
    a.C = 0;
    c = a.j.J;
    a.h = new Eb();
    a.g = Mb(a.j, c ? b2 : null, !a.m);
    0 < a.O && (a.M = new eb(p(a.Y, a, a.g), a.O));
    b2 = a.U;
    c = a.g;
    d = a.ca;
    var e = "readystatechange";
    Array.isArray(e) || (e && (fb[0] = e.toString()), e = fb);
    for (var f = 0; f < e.length; f++) {
      var g = Qa(c, e[f], d || b2.handleEvent, false, b2.h || b2);
      if (!g) break;
      b2.g[g.key] = g;
    }
    b2 = a.H ? sa(a.H) : {};
    a.m ? (a.u || (a.u = "POST"), b2["Content-Type"] = "application/x-www-form-urlencoded", a.g.ea(
      a.A,
      a.u,
      a.m,
      b2
    )) : (a.u = "GET", a.g.ea(a.A, a.u, null, b2));
    J();
    wb(a.i, a.u, a.A, a.l, a.R, a.m);
  }
  M.prototype.ca = function(a) {
    a = a.target;
    const b2 = this.M;
    b2 && 3 == P(a) ? b2.j() : this.Y(a);
  };
  M.prototype.Y = function(a) {
    try {
      if (a == this.g) a: {
        const w = P(this.g);
        var b2 = this.g.Ba();
        const O = this.g.Z();
        if (!(3 > w) && (3 != w || this.g && (this.h.h || this.g.oa() || Nb(this.g)))) {
          this.J || 4 != w || 7 == b2 || (8 == b2 || 0 >= O ? J(3) : J(2));
          Ob(this);
          var c = this.g.Z();
          this.X = c;
          b: if (Pb(this)) {
            var d = Nb(this.g);
            a = "";
            var e = d.length, f = 4 == P(this.g);
            if (!this.h.i) {
              if ("undefined" === typeof TextDecoder) {
                Q(this);
                Qb(this);
                var g = "";
                break b;
              }
              this.h.i = new k.TextDecoder();
            }
            for (b2 = 0; b2 < e; b2++) this.h.h = true, a += this.h.i.decode(d[b2], { stream: !(f && b2 == e - 1) });
            d.length = 0;
            this.h.g += a;
            this.C = 0;
            g = this.h.g;
          } else g = this.g.oa();
          this.o = 200 == c;
          xb(this.i, this.u, this.A, this.l, this.R, w, c);
          if (this.o) {
            if (this.T && !this.K) {
              b: {
                if (this.g) {
                  var m, q = this.g;
                  if ((m = q.g ? q.g.getResponseHeader("X-HTTP-Initial-Response") : null) && !t(m)) {
                    var l = m;
                    break b;
                  }
                }
                l = null;
              }
              if (c = l) L(this.i, this.l, c, "Initial handshake response via X-HTTP-Initial-Response"), this.K = true, Rb(this, c);
              else {
                this.o = false;
                this.s = 3;
                K(12);
                Q(this);
                Qb(this);
                break a;
              }
            }
            if (this.P) {
              c = true;
              let B;
              for (; !this.J && this.C < g.length; ) if (B = Sb(this, g), B == Gb) {
                4 == w && (this.s = 4, K(14), c = false);
                L(this.i, this.l, null, "[Incomplete Response]");
                break;
              } else if (B == Fb) {
                this.s = 4;
                K(15);
                L(this.i, this.l, g, "[Invalid Chunk]");
                c = false;
                break;
              } else L(this.i, this.l, B, null), Rb(this, B);
              Pb(this) && 0 != this.C && (this.h.g = this.h.g.slice(this.C), this.C = 0);
              4 != w || 0 != g.length || this.h.h || (this.s = 1, K(16), c = false);
              this.o = this.o && c;
              if (!c) L(this.i, this.l, g, "[Invalid Chunked Response]"), Q(this), Qb(this);
              else if (0 < g.length && !this.W) {
                this.W = true;
                var v2 = this.j;
                v2.g == this && v2.ba && !v2.M && (v2.j.info("Great, no buffering proxy detected. Bytes received: " + g.length), Tb(v2), v2.M = true, K(11));
              }
            } else L(this.i, this.l, g, null), Rb(this, g);
            4 == w && Q(this);
            this.o && !this.J && (4 == w ? Ub(this.j, this) : (this.o = false, Kb(this)));
          } else Vb(this.g), 400 == c && 0 < g.indexOf("Unknown SID") ? (this.s = 3, K(12)) : (this.s = 0, K(13)), Q(this), Qb(this);
        }
      }
    } catch (w) {
    } finally {
    }
  };
  function Pb(a) {
    return a.g ? "GET" == a.u && 2 != a.L && a.j.Ca : false;
  }
  function Sb(a, b2) {
    var c = a.C, d = b2.indexOf("\n", c);
    if (-1 == d) return Gb;
    c = Number(b2.substring(c, d));
    if (isNaN(c)) return Fb;
    d += 1;
    if (d + c > b2.length) return Gb;
    b2 = b2.slice(d, d + c);
    a.C = d + c;
    return b2;
  }
  M.prototype.cancel = function() {
    this.J = true;
    Q(this);
  };
  function Kb(a) {
    a.S = Date.now() + a.I;
    Wb(a, a.I);
  }
  function Wb(a, b2) {
    if (null != a.B) throw Error("WatchDog timer not null");
    a.B = ub(p(a.ba, a), b2);
  }
  function Ob(a) {
    a.B && (k.clearTimeout(a.B), a.B = null);
  }
  M.prototype.ba = function() {
    this.B = null;
    const a = Date.now();
    0 <= a - this.S ? (zb(this.i, this.A), 2 != this.L && (J(), K(17)), Q(this), this.s = 2, Qb(this)) : Wb(this, this.S - a);
  };
  function Qb(a) {
    0 == a.j.G || a.J || Ub(a.j, a);
  }
  function Q(a) {
    Ob(a);
    var b2 = a.M;
    b2 && "function" == typeof b2.ma && b2.ma();
    a.M = null;
    gb(a.U);
    a.g && (b2 = a.g, a.g = null, b2.abort(), b2.ma());
  }
  function Rb(a, b2) {
    try {
      var c = a.j;
      if (0 != c.G && (c.g == a || Xb(c.h, a))) {
        if (!a.K && Xb(c.h, a) && 3 == c.G) {
          try {
            var d = c.Da.g.parse(b2);
          } catch (l) {
            d = null;
          }
          if (Array.isArray(d) && 3 == d.length) {
            var e = d;
            if (0 == e[0]) a: {
              if (!c.u) {
                if (c.g) if (c.g.F + 3e3 < a.F) Yb(c), Zb(c);
                else break a;
                $b(c);
                K(18);
              }
            }
            else c.za = e[1], 0 < c.za - c.T && 37500 > e[2] && c.F && 0 == c.v && !c.C && (c.C = ub(p(c.Za, c), 6e3));
            if (1 >= ac(c.h) && c.ca) {
              try {
                c.ca();
              } catch (l) {
              }
              c.ca = void 0;
            }
          } else R(c, 11);
        } else if ((a.K || c.g == a) && Yb(c), !t(b2)) for (e = c.Da.g.parse(b2), b2 = 0; b2 < e.length; b2++) {
          let l = e[b2];
          c.T = l[0];
          l = l[1];
          if (2 == c.G) if ("c" == l[0]) {
            c.K = l[1];
            c.ia = l[2];
            const v2 = l[3];
            null != v2 && (c.la = v2, c.j.info("VER=" + c.la));
            const w = l[4];
            null != w && (c.Aa = w, c.j.info("SVER=" + c.Aa));
            const O = l[5];
            null != O && "number" === typeof O && 0 < O && (d = 1.5 * O, c.L = d, c.j.info("backChannelRequestTimeoutMs_=" + d));
            d = c;
            const B = a.g;
            if (B) {
              const ya = B.g ? B.g.getResponseHeader("X-Client-Wire-Protocol") : null;
              if (ya) {
                var f = d.h;
                f.g || -1 == ya.indexOf("spdy") && -1 == ya.indexOf("quic") && -1 == ya.indexOf("h2") || (f.j = f.l, f.g = /* @__PURE__ */ new Set(), f.h && (bc(f, f.h), f.h = null));
              }
              if (d.D) {
                const db = B.g ? B.g.getResponseHeader("X-HTTP-Session-Id") : null;
                db && (d.ya = db, S2(d.I, d.D, db));
              }
            }
            c.G = 3;
            c.l && c.l.ua();
            c.ba && (c.R = Date.now() - a.F, c.j.info("Handshake RTT: " + c.R + "ms"));
            d = c;
            var g = a;
            d.qa = cc(d, d.J ? d.ia : null, d.W);
            if (g.K) {
              dc(d.h, g);
              var m = g, q = d.L;
              q && (m.I = q);
              m.B && (Ob(m), Kb(m));
              d.g = g;
            } else ec(d);
            0 < c.i.length && fc(c);
          } else "stop" != l[0] && "close" != l[0] || R(c, 7);
          else 3 == c.G && ("stop" == l[0] || "close" == l[0] ? "stop" == l[0] ? R(c, 7) : gc(c) : "noop" != l[0] && c.l && c.l.ta(l), c.v = 0);
        }
      }
      J(4);
    } catch (l) {
    }
  }
  var hc = class {
    constructor(a, b2) {
      this.g = a;
      this.map = b2;
    }
  };
  function ic(a) {
    this.l = a || 10;
    k.PerformanceNavigationTiming ? (a = k.performance.getEntriesByType("navigation"), a = 0 < a.length && ("hq" == a[0].nextHopProtocol || "h2" == a[0].nextHopProtocol)) : a = !!(k.chrome && k.chrome.loadTimes && k.chrome.loadTimes() && k.chrome.loadTimes().wasFetchedViaSpdy);
    this.j = a ? this.l : 1;
    this.g = null;
    1 < this.j && (this.g = /* @__PURE__ */ new Set());
    this.h = null;
    this.i = [];
  }
  function jc(a) {
    return a.h ? true : a.g ? a.g.size >= a.j : false;
  }
  function ac(a) {
    return a.h ? 1 : a.g ? a.g.size : 0;
  }
  function Xb(a, b2) {
    return a.h ? a.h == b2 : a.g ? a.g.has(b2) : false;
  }
  function bc(a, b2) {
    a.g ? a.g.add(b2) : a.h = b2;
  }
  function dc(a, b2) {
    a.h && a.h == b2 ? a.h = null : a.g && a.g.has(b2) && a.g.delete(b2);
  }
  ic.prototype.cancel = function() {
    this.i = kc(this);
    if (this.h) this.h.cancel(), this.h = null;
    else if (this.g && 0 !== this.g.size) {
      for (const a of this.g.values()) a.cancel();
      this.g.clear();
    }
  };
  function kc(a) {
    if (null != a.h) return a.i.concat(a.h.D);
    if (null != a.g && 0 !== a.g.size) {
      let b2 = a.i;
      for (const c of a.g.values()) b2 = b2.concat(c.D);
      return b2;
    }
    return la(a.i);
  }
  function lc(a) {
    if (a.V && "function" == typeof a.V) return a.V();
    if ("undefined" !== typeof Map && a instanceof Map || "undefined" !== typeof Set && a instanceof Set) return Array.from(a.values());
    if ("string" === typeof a) return a.split("");
    if (ha(a)) {
      for (var b2 = [], c = a.length, d = 0; d < c; d++) b2.push(a[d]);
      return b2;
    }
    b2 = [];
    c = 0;
    for (d in a) b2[c++] = a[d];
    return b2;
  }
  function mc(a) {
    if (a.na && "function" == typeof a.na) return a.na();
    if (!a.V || "function" != typeof a.V) {
      if ("undefined" !== typeof Map && a instanceof Map) return Array.from(a.keys());
      if (!("undefined" !== typeof Set && a instanceof Set)) {
        if (ha(a) || "string" === typeof a) {
          var b2 = [];
          a = a.length;
          for (var c = 0; c < a; c++) b2.push(c);
          return b2;
        }
        b2 = [];
        c = 0;
        for (const d in a) b2[c++] = d;
        return b2;
      }
    }
  }
  function nc(a, b2) {
    if (a.forEach && "function" == typeof a.forEach) a.forEach(b2, void 0);
    else if (ha(a) || "string" === typeof a) Array.prototype.forEach.call(a, b2, void 0);
    else for (var c = mc(a), d = lc(a), e = d.length, f = 0; f < e; f++) b2.call(void 0, d[f], c && c[f], a);
  }
  var oc = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");
  function pc(a, b2) {
    if (a) {
      a = a.split("&");
      for (var c = 0; c < a.length; c++) {
        var d = a[c].indexOf("="), e = null;
        if (0 <= d) {
          var f = a[c].substring(0, d);
          e = a[c].substring(d + 1);
        } else f = a[c];
        b2(f, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "");
      }
    }
  }
  function T(a) {
    this.g = this.o = this.j = "";
    this.s = null;
    this.m = this.l = "";
    this.h = false;
    if (a instanceof T) {
      this.h = a.h;
      qc(this, a.j);
      this.o = a.o;
      this.g = a.g;
      rc(this, a.s);
      this.l = a.l;
      var b2 = a.i;
      var c = new sc();
      c.i = b2.i;
      b2.g && (c.g = new Map(b2.g), c.h = b2.h);
      tc(this, c);
      this.m = a.m;
    } else a && (b2 = String(a).match(oc)) ? (this.h = false, qc(this, b2[1] || "", true), this.o = uc(b2[2] || ""), this.g = uc(b2[3] || "", true), rc(this, b2[4]), this.l = uc(b2[5] || "", true), tc(this, b2[6] || "", true), this.m = uc(b2[7] || "")) : (this.h = false, this.i = new sc(null, this.h));
  }
  T.prototype.toString = function() {
    var a = [], b2 = this.j;
    b2 && a.push(vc(b2, wc, true), ":");
    var c = this.g;
    if (c || "file" == b2) a.push("//"), (b2 = this.o) && a.push(vc(b2, wc, true), "@"), a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), c = this.s, null != c && a.push(":", String(c));
    if (c = this.l) this.g && "/" != c.charAt(0) && a.push("/"), a.push(vc(c, "/" == c.charAt(0) ? xc : yc, true));
    (c = this.i.toString()) && a.push("?", c);
    (c = this.m) && a.push("#", vc(c, zc));
    return a.join("");
  };
  function N(a) {
    return new T(a);
  }
  function qc(a, b2, c) {
    a.j = c ? uc(b2, true) : b2;
    a.j && (a.j = a.j.replace(/:$/, ""));
  }
  function rc(a, b2) {
    if (b2) {
      b2 = Number(b2);
      if (isNaN(b2) || 0 > b2) throw Error("Bad port number " + b2);
      a.s = b2;
    } else a.s = null;
  }
  function tc(a, b2, c) {
    b2 instanceof sc ? (a.i = b2, Ac(a.i, a.h)) : (c || (b2 = vc(b2, Bc)), a.i = new sc(b2, a.h));
  }
  function S2(a, b2, c) {
    a.i.set(b2, c);
  }
  function Ib(a) {
    S2(a, "zx", Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ Date.now()).toString(36));
    return a;
  }
  function uc(a, b2) {
    return a ? b2 ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : "";
  }
  function vc(a, b2, c) {
    return "string" === typeof a ? (a = encodeURI(a).replace(b2, Cc), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null;
  }
  function Cc(a) {
    a = a.charCodeAt(0);
    return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16);
  }
  var wc = /[#\/\?@]/g, yc = /[#\?:]/g, xc = /[#\?]/g, Bc = /[#\?@]/g, zc = /#/g;
  function sc(a, b2) {
    this.h = this.g = null;
    this.i = a || null;
    this.j = !!b2;
  }
  function U(a) {
    a.g || (a.g = /* @__PURE__ */ new Map(), a.h = 0, a.i && pc(a.i, function(b2, c) {
      a.add(decodeURIComponent(b2.replace(/\+/g, " ")), c);
    }));
  }
  h = sc.prototype;
  h.add = function(a, b2) {
    U(this);
    this.i = null;
    a = V(this, a);
    var c = this.g.get(a);
    c || this.g.set(a, c = []);
    c.push(b2);
    this.h += 1;
    return this;
  };
  function Dc(a, b2) {
    U(a);
    b2 = V(a, b2);
    a.g.has(b2) && (a.i = null, a.h -= a.g.get(b2).length, a.g.delete(b2));
  }
  function Ec(a, b2) {
    U(a);
    b2 = V(a, b2);
    return a.g.has(b2);
  }
  h.forEach = function(a, b2) {
    U(this);
    this.g.forEach(function(c, d) {
      c.forEach(function(e) {
        a.call(b2, e, d, this);
      }, this);
    }, this);
  };
  h.na = function() {
    U(this);
    const a = Array.from(this.g.values()), b2 = Array.from(this.g.keys()), c = [];
    for (let d = 0; d < b2.length; d++) {
      const e = a[d];
      for (let f = 0; f < e.length; f++) c.push(b2[d]);
    }
    return c;
  };
  h.V = function(a) {
    U(this);
    let b2 = [];
    if ("string" === typeof a) Ec(this, a) && (b2 = b2.concat(this.g.get(V(this, a))));
    else {
      a = Array.from(this.g.values());
      for (let c = 0; c < a.length; c++) b2 = b2.concat(a[c]);
    }
    return b2;
  };
  h.set = function(a, b2) {
    U(this);
    this.i = null;
    a = V(this, a);
    Ec(this, a) && (this.h -= this.g.get(a).length);
    this.g.set(a, [b2]);
    this.h += 1;
    return this;
  };
  h.get = function(a, b2) {
    if (!a) return b2;
    a = this.V(a);
    return 0 < a.length ? String(a[0]) : b2;
  };
  function Lb(a, b2, c) {
    Dc(a, b2);
    0 < c.length && (a.i = null, a.g.set(V(a, b2), la(c)), a.h += c.length);
  }
  h.toString = function() {
    if (this.i) return this.i;
    if (!this.g) return "";
    const a = [], b2 = Array.from(this.g.keys());
    for (var c = 0; c < b2.length; c++) {
      var d = b2[c];
      const f = encodeURIComponent(String(d)), g = this.V(d);
      for (d = 0; d < g.length; d++) {
        var e = f;
        "" !== g[d] && (e += "=" + encodeURIComponent(String(g[d])));
        a.push(e);
      }
    }
    return this.i = a.join("&");
  };
  function V(a, b2) {
    b2 = String(b2);
    a.j && (b2 = b2.toLowerCase());
    return b2;
  }
  function Ac(a, b2) {
    b2 && !a.j && (U(a), a.i = null, a.g.forEach(function(c, d) {
      var e = d.toLowerCase();
      d != e && (Dc(this, d), Lb(this, e, c));
    }, a));
    a.j = b2;
  }
  function Fc(a, b2) {
    const c = new vb();
    if (k.Image) {
      const d = new Image();
      d.onload = ka(W, c, "TestLoadImage: loaded", true, b2, d);
      d.onerror = ka(W, c, "TestLoadImage: error", false, b2, d);
      d.onabort = ka(W, c, "TestLoadImage: abort", false, b2, d);
      d.ontimeout = ka(W, c, "TestLoadImage: timeout", false, b2, d);
      k.setTimeout(function() {
        if (d.ontimeout) d.ontimeout();
      }, 1e4);
      d.src = a;
    } else b2(false);
  }
  function Gc(a, b2) {
    const c = new vb(), d = new AbortController(), e = setTimeout(() => {
      d.abort();
      W(c, "TestPingServer: timeout", false, b2);
    }, 1e4);
    fetch(a, { signal: d.signal }).then((f) => {
      clearTimeout(e);
      f.ok ? W(c, "TestPingServer: ok", true, b2) : W(c, "TestPingServer: server error", false, b2);
    }).catch(() => {
      clearTimeout(e);
      W(c, "TestPingServer: error", false, b2);
    });
  }
  function W(a, b2, c, d, e) {
    try {
      e && (e.onload = null, e.onerror = null, e.onabort = null, e.ontimeout = null), d(c);
    } catch (f) {
    }
  }
  function Hc() {
    this.g = new jb();
  }
  function Ic(a, b2, c) {
    const d = c || "";
    try {
      nc(a, function(e, f) {
        let g = e;
        n(e) && (g = hb(e));
        b2.push(d + f + "=" + encodeURIComponent(g));
      });
    } catch (e) {
      throw b2.push(d + "type=" + encodeURIComponent("_badmap")), e;
    }
  }
  function Jc(a) {
    this.l = a.Ub || null;
    this.j = a.eb || false;
  }
  r(Jc, kb);
  Jc.prototype.g = function() {
    return new Kc(this.l, this.j);
  };
  Jc.prototype.i = /* @__PURE__ */ function(a) {
    return function() {
      return a;
    };
  }({});
  function Kc(a, b2) {
    E.call(this);
    this.D = a;
    this.o = b2;
    this.m = void 0;
    this.status = this.readyState = 0;
    this.responseType = this.responseText = this.response = this.statusText = "";
    this.onreadystatechange = null;
    this.u = new Headers();
    this.h = null;
    this.B = "GET";
    this.A = "";
    this.g = false;
    this.v = this.j = this.l = null;
  }
  r(Kc, E);
  h = Kc.prototype;
  h.open = function(a, b2) {
    if (0 != this.readyState) throw this.abort(), Error("Error reopening a connection");
    this.B = a;
    this.A = b2;
    this.readyState = 1;
    Lc(this);
  };
  h.send = function(a) {
    if (1 != this.readyState) throw this.abort(), Error("need to call open() first. ");
    this.g = true;
    const b2 = { headers: this.u, method: this.B, credentials: this.m, cache: void 0 };
    a && (b2.body = a);
    (this.D || k).fetch(new Request(this.A, b2)).then(this.Sa.bind(this), this.ga.bind(this));
  };
  h.abort = function() {
    this.response = this.responseText = "";
    this.u = new Headers();
    this.status = 0;
    this.j && this.j.cancel("Request was aborted.").catch(() => {
    });
    1 <= this.readyState && this.g && 4 != this.readyState && (this.g = false, Mc(this));
    this.readyState = 0;
  };
  h.Sa = function(a) {
    if (this.g && (this.l = a, this.h || (this.status = this.l.status, this.statusText = this.l.statusText, this.h = a.headers, this.readyState = 2, Lc(this)), this.g && (this.readyState = 3, Lc(this), this.g))) if ("arraybuffer" === this.responseType) a.arrayBuffer().then(this.Qa.bind(this), this.ga.bind(this));
    else if ("undefined" !== typeof k.ReadableStream && "body" in a) {
      this.j = a.body.getReader();
      if (this.o) {
        if (this.responseType) throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');
        this.response = [];
      } else this.response = this.responseText = "", this.v = new TextDecoder();
      Nc(this);
    } else a.text().then(this.Ra.bind(this), this.ga.bind(this));
  };
  function Nc(a) {
    a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a));
  }
  h.Pa = function(a) {
    if (this.g) {
      if (this.o && a.value) this.response.push(a.value);
      else if (!this.o) {
        var b2 = a.value ? a.value : new Uint8Array(0);
        if (b2 = this.v.decode(b2, { stream: !a.done })) this.response = this.responseText += b2;
      }
      a.done ? Mc(this) : Lc(this);
      3 == this.readyState && Nc(this);
    }
  };
  h.Ra = function(a) {
    this.g && (this.response = this.responseText = a, Mc(this));
  };
  h.Qa = function(a) {
    this.g && (this.response = a, Mc(this));
  };
  h.ga = function() {
    this.g && Mc(this);
  };
  function Mc(a) {
    a.readyState = 4;
    a.l = null;
    a.j = null;
    a.v = null;
    Lc(a);
  }
  h.setRequestHeader = function(a, b2) {
    this.u.append(a, b2);
  };
  h.getResponseHeader = function(a) {
    return this.h ? this.h.get(a.toLowerCase()) || "" : "";
  };
  h.getAllResponseHeaders = function() {
    if (!this.h) return "";
    const a = [], b2 = this.h.entries();
    for (var c = b2.next(); !c.done; ) c = c.value, a.push(c[0] + ": " + c[1]), c = b2.next();
    return a.join("\r\n");
  };
  function Lc(a) {
    a.onreadystatechange && a.onreadystatechange.call(a);
  }
  Object.defineProperty(Kc.prototype, "withCredentials", { get: function() {
    return "include" === this.m;
  }, set: function(a) {
    this.m = a ? "include" : "same-origin";
  } });
  function Oc(a) {
    let b2 = "";
    qa(a, function(c, d) {
      b2 += d;
      b2 += ":";
      b2 += c;
      b2 += "\r\n";
    });
    return b2;
  }
  function Pc(a, b2, c) {
    a: {
      for (d in c) {
        var d = false;
        break a;
      }
      d = true;
    }
    d || (c = Oc(c), "string" === typeof a ? null != c && encodeURIComponent(String(c)) : S2(a, b2, c));
  }
  function X(a) {
    E.call(this);
    this.headers = /* @__PURE__ */ new Map();
    this.o = a || null;
    this.h = false;
    this.v = this.g = null;
    this.D = "";
    this.m = 0;
    this.l = "";
    this.j = this.B = this.u = this.A = false;
    this.I = null;
    this.H = "";
    this.J = false;
  }
  r(X, E);
  var Qc = /^https?$/i, Rc = ["POST", "PUT"];
  h = X.prototype;
  h.Ha = function(a) {
    this.J = a;
  };
  h.ea = function(a, b2, c, d) {
    if (this.g) throw Error("[goog.net.XhrIo] Object is active with another request=" + this.D + "; newUri=" + a);
    b2 = b2 ? b2.toUpperCase() : "GET";
    this.D = a;
    this.l = "";
    this.m = 0;
    this.A = false;
    this.h = true;
    this.g = this.o ? this.o.g() : Cb.g();
    this.v = this.o ? lb(this.o) : lb(Cb);
    this.g.onreadystatechange = p(this.Ea, this);
    try {
      this.B = true, this.g.open(b2, String(a), true), this.B = false;
    } catch (f) {
      Sc(this, f);
      return;
    }
    a = c || "";
    c = new Map(this.headers);
    if (d) if (Object.getPrototypeOf(d) === Object.prototype) for (var e in d) c.set(e, d[e]);
    else if ("function" === typeof d.keys && "function" === typeof d.get) for (const f of d.keys()) c.set(f, d.get(f));
    else throw Error("Unknown input type for opt_headers: " + String(d));
    d = Array.from(c.keys()).find((f) => "content-type" == f.toLowerCase());
    e = k.FormData && a instanceof k.FormData;
    !(0 <= Array.prototype.indexOf.call(Rc, b2, void 0)) || d || e || c.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
    for (const [f, g] of c) this.g.setRequestHeader(f, g);
    this.H && (this.g.responseType = this.H);
    "withCredentials" in this.g && this.g.withCredentials !== this.J && (this.g.withCredentials = this.J);
    try {
      Tc(this), this.u = true, this.g.send(a), this.u = false;
    } catch (f) {
      Sc(this, f);
    }
  };
  function Sc(a, b2) {
    a.h = false;
    a.g && (a.j = true, a.g.abort(), a.j = false);
    a.l = b2;
    a.m = 5;
    Uc(a);
    Vc(a);
  }
  function Uc(a) {
    a.A || (a.A = true, F(a, "complete"), F(a, "error"));
  }
  h.abort = function(a) {
    this.g && this.h && (this.h = false, this.j = true, this.g.abort(), this.j = false, this.m = a || 7, F(this, "complete"), F(this, "abort"), Vc(this));
  };
  h.N = function() {
    this.g && (this.h && (this.h = false, this.j = true, this.g.abort(), this.j = false), Vc(this, true));
    X.aa.N.call(this);
  };
  h.Ea = function() {
    this.s || (this.B || this.u || this.j ? Wc(this) : this.bb());
  };
  h.bb = function() {
    Wc(this);
  };
  function Wc(a) {
    if (a.h && "undefined" != typeof fa && (!a.v[1] || 4 != P(a) || 2 != a.Z())) {
      if (a.u && 4 == P(a)) bb(a.Ea, 0, a);
      else if (F(a, "readystatechange"), 4 == P(a)) {
        a.h = false;
        try {
          const g = a.Z();
          a: switch (g) {
            case 200:
            case 201:
            case 202:
            case 204:
            case 206:
            case 304:
            case 1223:
              var b2 = true;
              break a;
            default:
              b2 = false;
          }
          var c;
          if (!(c = b2)) {
            var d;
            if (d = 0 === g) {
              var e = String(a.D).match(oc)[1] || null;
              !e && k.self && k.self.location && (e = k.self.location.protocol.slice(0, -1));
              d = !Qc.test(e ? e.toLowerCase() : "");
            }
            c = d;
          }
          if (c) F(a, "complete"), F(a, "success");
          else {
            a.m = 6;
            try {
              var f = 2 < P(a) ? a.g.statusText : "";
            } catch (m) {
              f = "";
            }
            a.l = f + " [" + a.Z() + "]";
            Uc(a);
          }
        } finally {
          Vc(a);
        }
      }
    }
  }
  function Vc(a, b2) {
    if (a.g) {
      Tc(a);
      const c = a.g, d = a.v[0] ? () => {
      } : null;
      a.g = null;
      a.v = null;
      b2 || F(a, "ready");
      try {
        c.onreadystatechange = d;
      } catch (e) {
      }
    }
  }
  function Tc(a) {
    a.I && (k.clearTimeout(a.I), a.I = null);
  }
  h.isActive = function() {
    return !!this.g;
  };
  function P(a) {
    return a.g ? a.g.readyState : 0;
  }
  h.Z = function() {
    try {
      return 2 < P(this) ? this.g.status : -1;
    } catch (a) {
      return -1;
    }
  };
  h.oa = function() {
    try {
      return this.g ? this.g.responseText : "";
    } catch (a) {
      return "";
    }
  };
  h.Oa = function(a) {
    if (this.g) {
      var b2 = this.g.responseText;
      a && 0 == b2.indexOf(a) && (b2 = b2.substring(a.length));
      return ib(b2);
    }
  };
  function Nb(a) {
    try {
      if (!a.g) return null;
      if ("response" in a.g) return a.g.response;
      switch (a.H) {
        case "":
        case "text":
          return a.g.responseText;
        case "arraybuffer":
          if ("mozResponseArrayBuffer" in a.g) return a.g.mozResponseArrayBuffer;
      }
      return null;
    } catch (b2) {
      return null;
    }
  }
  function Vb(a) {
    const b2 = {};
    a = (a.g && 2 <= P(a) ? a.g.getAllResponseHeaders() || "" : "").split("\r\n");
    for (let d = 0; d < a.length; d++) {
      if (t(a[d])) continue;
      var c = va(a[d]);
      const e = c[0];
      c = c[1];
      if ("string" !== typeof c) continue;
      c = c.trim();
      const f = b2[e] || [];
      b2[e] = f;
      f.push(c);
    }
    ra(b2, function(d) {
      return d.join(", ");
    });
  }
  h.Ba = function() {
    return this.m;
  };
  h.Ka = function() {
    return "string" === typeof this.l ? this.l : String(this.l);
  };
  function Xc(a, b2, c) {
    return c && c.internalChannelParams ? c.internalChannelParams[a] || b2 : b2;
  }
  function Yc(a) {
    this.Aa = 0;
    this.i = [];
    this.j = new vb();
    this.ia = this.qa = this.I = this.W = this.g = this.ya = this.D = this.H = this.m = this.S = this.o = null;
    this.Ya = this.U = 0;
    this.Va = Xc("failFast", false, a);
    this.F = this.C = this.u = this.s = this.l = null;
    this.X = true;
    this.za = this.T = -1;
    this.Y = this.v = this.B = 0;
    this.Ta = Xc("baseRetryDelayMs", 5e3, a);
    this.cb = Xc("retryDelaySeedMs", 1e4, a);
    this.Wa = Xc("forwardChannelMaxRetries", 2, a);
    this.wa = Xc("forwardChannelRequestTimeoutMs", 2e4, a);
    this.pa = a && a.xmlHttpFactory || void 0;
    this.Xa = a && a.Tb || void 0;
    this.Ca = a && a.useFetchStreams || false;
    this.L = void 0;
    this.J = a && a.supportsCrossDomainXhr || false;
    this.K = "";
    this.h = new ic(a && a.concurrentRequestLimit);
    this.Da = new Hc();
    this.P = a && a.fastHandshake || false;
    this.O = a && a.encodeInitMessageHeaders || false;
    this.P && this.O && (this.O = false);
    this.Ua = a && a.Rb || false;
    a && a.xa && this.j.xa();
    a && a.forceLongPolling && (this.X = false);
    this.ba = !this.P && this.X && a && a.detectBufferingProxy || false;
    this.ja = void 0;
    a && a.longPollingTimeout && 0 < a.longPollingTimeout && (this.ja = a.longPollingTimeout);
    this.ca = void 0;
    this.R = 0;
    this.M = false;
    this.ka = this.A = null;
  }
  h = Yc.prototype;
  h.la = 8;
  h.G = 1;
  h.connect = function(a, b2, c, d) {
    K(0);
    this.W = a;
    this.H = b2 || {};
    c && void 0 !== d && (this.H.OSID = c, this.H.OAID = d);
    this.F = this.X;
    this.I = cc(this, null, this.W);
    fc(this);
  };
  function gc(a) {
    Zc(a);
    if (3 == a.G) {
      var b2 = a.U++, c = N(a.I);
      S2(c, "SID", a.K);
      S2(c, "RID", b2);
      S2(c, "TYPE", "terminate");
      $c(a, c);
      b2 = new M(a, a.j, b2);
      b2.L = 2;
      b2.v = Ib(N(c));
      c = false;
      if (k.navigator && k.navigator.sendBeacon) try {
        c = k.navigator.sendBeacon(b2.v.toString(), "");
      } catch (d) {
      }
      !c && k.Image && (new Image().src = b2.v, c = true);
      c || (b2.g = Mb(b2.j, null), b2.g.ea(b2.v));
      b2.F = Date.now();
      Kb(b2);
    }
    ad(a);
  }
  function Zb(a) {
    a.g && (Tb(a), a.g.cancel(), a.g = null);
  }
  function Zc(a) {
    Zb(a);
    a.u && (k.clearTimeout(a.u), a.u = null);
    Yb(a);
    a.h.cancel();
    a.s && ("number" === typeof a.s && k.clearTimeout(a.s), a.s = null);
  }
  function fc(a) {
    if (!jc(a.h) && !a.s) {
      a.s = true;
      var b2 = a.Ga;
      x || Ea();
      y || (x(), y = true);
      za.add(b2, a);
      a.B = 0;
    }
  }
  function bd(a, b2) {
    if (ac(a.h) >= a.h.j - (a.s ? 1 : 0)) return false;
    if (a.s) return a.i = b2.D.concat(a.i), true;
    if (1 == a.G || 2 == a.G || a.B >= (a.Va ? 0 : a.Wa)) return false;
    a.s = ub(p(a.Ga, a, b2), cd(a, a.B));
    a.B++;
    return true;
  }
  h.Ga = function(a) {
    if (this.s) if (this.s = null, 1 == this.G) {
      if (!a) {
        this.U = Math.floor(1e5 * Math.random());
        a = this.U++;
        const e = new M(this, this.j, a);
        let f = this.o;
        this.S && (f ? (f = sa(f), ua(f, this.S)) : f = this.S);
        null !== this.m || this.O || (e.H = f, f = null);
        if (this.P) a: {
          var b2 = 0;
          for (var c = 0; c < this.i.length; c++) {
            b: {
              var d = this.i[c];
              if ("__data__" in d.map && (d = d.map.__data__, "string" === typeof d)) {
                d = d.length;
                break b;
              }
              d = void 0;
            }
            if (void 0 === d) break;
            b2 += d;
            if (4096 < b2) {
              b2 = c;
              break a;
            }
            if (4096 === b2 || c === this.i.length - 1) {
              b2 = c + 1;
              break a;
            }
          }
          b2 = 1e3;
        }
        else b2 = 1e3;
        b2 = dd(this, e, b2);
        c = N(this.I);
        S2(c, "RID", a);
        S2(c, "CVER", 22);
        this.D && S2(c, "X-HTTP-Session-Id", this.D);
        $c(this, c);
        f && (this.O ? b2 = "headers=" + encodeURIComponent(String(Oc(f))) + "&" + b2 : this.m && Pc(c, this.m, f));
        bc(this.h, e);
        this.Ua && S2(c, "TYPE", "init");
        this.P ? (S2(c, "$req", b2), S2(c, "SID", "null"), e.T = true, Hb(e, c, null)) : Hb(e, c, b2);
        this.G = 2;
      }
    } else 3 == this.G && (a ? ed(this, a) : 0 == this.i.length || jc(this.h) || ed(this));
  };
  function ed(a, b2) {
    var c;
    b2 ? c = b2.l : c = a.U++;
    const d = N(a.I);
    S2(d, "SID", a.K);
    S2(d, "RID", c);
    S2(d, "AID", a.T);
    $c(a, d);
    a.m && a.o && Pc(d, a.m, a.o);
    c = new M(a, a.j, c, a.B + 1);
    null === a.m && (c.H = a.o);
    b2 && (a.i = b2.D.concat(a.i));
    b2 = dd(a, c, 1e3);
    c.I = Math.round(0.5 * a.wa) + Math.round(0.5 * a.wa * Math.random());
    bc(a.h, c);
    Hb(c, d, b2);
  }
  function $c(a, b2) {
    a.H && qa(a.H, function(c, d) {
      S2(b2, d, c);
    });
    a.l && nc({}, function(c, d) {
      S2(b2, d, c);
    });
  }
  function dd(a, b2, c) {
    c = Math.min(a.i.length, c);
    var d = a.l ? p(a.l.Na, a.l, a) : null;
    a: {
      var e = a.i;
      let f = -1;
      for (; ; ) {
        const g = ["count=" + c];
        -1 == f ? 0 < c ? (f = e[0].g, g.push("ofs=" + f)) : f = 0 : g.push("ofs=" + f);
        let m = true;
        for (let q = 0; q < c; q++) {
          let l = e[q].g;
          const v2 = e[q].map;
          l -= f;
          if (0 > l) f = Math.max(0, e[q].g - 100), m = false;
          else try {
            Ic(v2, g, "req" + l + "_");
          } catch (w) {
            d && d(v2);
          }
        }
        if (m) {
          d = g.join("&");
          break a;
        }
      }
    }
    a = a.i.splice(0, c);
    b2.D = a;
    return d;
  }
  function ec(a) {
    if (!a.g && !a.u) {
      a.Y = 1;
      var b2 = a.Fa;
      x || Ea();
      y || (x(), y = true);
      za.add(b2, a);
      a.v = 0;
    }
  }
  function $b(a) {
    if (a.g || a.u || 3 <= a.v) return false;
    a.Y++;
    a.u = ub(p(a.Fa, a), cd(a, a.v));
    a.v++;
    return true;
  }
  h.Fa = function() {
    this.u = null;
    fd(this);
    if (this.ba && !(this.M || null == this.g || 0 >= this.R)) {
      var a = 2 * this.R;
      this.j.info("BP detection timer enabled: " + a);
      this.A = ub(p(this.ab, this), a);
    }
  };
  h.ab = function() {
    this.A && (this.A = null, this.j.info("BP detection timeout reached."), this.j.info("Buffering proxy detected and switch to long-polling!"), this.F = false, this.M = true, K(10), Zb(this), fd(this));
  };
  function Tb(a) {
    null != a.A && (k.clearTimeout(a.A), a.A = null);
  }
  function fd(a) {
    a.g = new M(a, a.j, "rpc", a.Y);
    null === a.m && (a.g.H = a.o);
    a.g.O = 0;
    var b2 = N(a.qa);
    S2(b2, "RID", "rpc");
    S2(b2, "SID", a.K);
    S2(b2, "AID", a.T);
    S2(b2, "CI", a.F ? "0" : "1");
    !a.F && a.ja && S2(b2, "TO", a.ja);
    S2(b2, "TYPE", "xmlhttp");
    $c(a, b2);
    a.m && a.o && Pc(b2, a.m, a.o);
    a.L && (a.g.I = a.L);
    var c = a.g;
    a = a.ia;
    c.L = 1;
    c.v = Ib(N(b2));
    c.m = null;
    c.P = true;
    Jb(c, a);
  }
  h.Za = function() {
    null != this.C && (this.C = null, Zb(this), $b(this), K(19));
  };
  function Yb(a) {
    null != a.C && (k.clearTimeout(a.C), a.C = null);
  }
  function Ub(a, b2) {
    var c = null;
    if (a.g == b2) {
      Yb(a);
      Tb(a);
      a.g = null;
      var d = 2;
    } else if (Xb(a.h, b2)) c = b2.D, dc(a.h, b2), d = 1;
    else return;
    if (0 != a.G) {
      if (b2.o) if (1 == d) {
        c = b2.m ? b2.m.length : 0;
        b2 = Date.now() - b2.F;
        var e = a.B;
        d = qb();
        F(d, new tb(d, c));
        fc(a);
      } else ec(a);
      else if (e = b2.s, 3 == e || 0 == e && 0 < b2.X || !(1 == d && bd(a, b2) || 2 == d && $b(a))) switch (c && 0 < c.length && (b2 = a.h, b2.i = b2.i.concat(c)), e) {
        case 1:
          R(a, 5);
          break;
        case 4:
          R(a, 10);
          break;
        case 3:
          R(a, 6);
          break;
        default:
          R(a, 2);
      }
    }
  }
  function cd(a, b2) {
    let c = a.Ta + Math.floor(Math.random() * a.cb);
    a.isActive() || (c *= 2);
    return c * b2;
  }
  function R(a, b2) {
    a.j.info("Error code " + b2);
    if (2 == b2) {
      var c = p(a.fb, a), d = a.Xa;
      const e = !d;
      d = new T(d || "//www.google.com/images/cleardot.gif");
      k.location && "http" == k.location.protocol || qc(d, "https");
      Ib(d);
      e ? Fc(d.toString(), c) : Gc(d.toString(), c);
    } else K(2);
    a.G = 0;
    a.l && a.l.sa(b2);
    ad(a);
    Zc(a);
  }
  h.fb = function(a) {
    a ? (this.j.info("Successfully pinged google.com"), K(2)) : (this.j.info("Failed to ping google.com"), K(1));
  };
  function ad(a) {
    a.G = 0;
    a.ka = [];
    if (a.l) {
      const b2 = kc(a.h);
      if (0 != b2.length || 0 != a.i.length) ma(a.ka, b2), ma(a.ka, a.i), a.h.i.length = 0, la(a.i), a.i.length = 0;
      a.l.ra();
    }
  }
  function cc(a, b2, c) {
    var d = c instanceof T ? N(c) : new T(c);
    if ("" != d.g) b2 && (d.g = b2 + "." + d.g), rc(d, d.s);
    else {
      var e = k.location;
      d = e.protocol;
      b2 = b2 ? b2 + "." + e.hostname : e.hostname;
      e = +e.port;
      var f = new T(null);
      d && qc(f, d);
      b2 && (f.g = b2);
      e && rc(f, e);
      c && (f.l = c);
      d = f;
    }
    c = a.D;
    b2 = a.ya;
    c && b2 && S2(d, c, b2);
    S2(d, "VER", a.la);
    $c(a, d);
    return d;
  }
  function Mb(a, b2, c) {
    if (b2 && !a.J) throw Error("Can't create secondary domain capable XhrIo object.");
    b2 = a.Ca && !a.pa ? new X(new Jc({ eb: c })) : new X(a.pa);
    b2.Ha(a.J);
    return b2;
  }
  h.isActive = function() {
    return !!this.l && this.l.isActive(this);
  };
  function gd() {
  }
  h = gd.prototype;
  h.ua = function() {
  };
  h.ta = function() {
  };
  h.sa = function() {
  };
  h.ra = function() {
  };
  h.isActive = function() {
    return true;
  };
  h.Na = function() {
  };
  function Y(a, b2) {
    E.call(this);
    this.g = new Yc(b2);
    this.l = a;
    this.h = b2 && b2.messageUrlParams || null;
    a = b2 && b2.messageHeaders || null;
    b2 && b2.clientProtocolHeaderRequired && (a ? a["X-Client-Protocol"] = "webchannel" : a = { "X-Client-Protocol": "webchannel" });
    this.g.o = a;
    a = b2 && b2.initMessageHeaders || null;
    b2 && b2.messageContentType && (a ? a["X-WebChannel-Content-Type"] = b2.messageContentType : a = { "X-WebChannel-Content-Type": b2.messageContentType });
    b2 && b2.va && (a ? a["X-WebChannel-Client-Profile"] = b2.va : a = { "X-WebChannel-Client-Profile": b2.va });
    this.g.S = a;
    (a = b2 && b2.Sb) && !t(a) && (this.g.m = a);
    this.v = b2 && b2.supportsCrossDomainXhr || false;
    this.u = b2 && b2.sendRawJson || false;
    (b2 = b2 && b2.httpSessionIdParam) && !t(b2) && (this.g.D = b2, a = this.h, null !== a && b2 in a && (a = this.h, b2 in a && delete a[b2]));
    this.j = new Z(this);
  }
  r(Y, E);
  Y.prototype.m = function() {
    this.g.l = this.j;
    this.v && (this.g.J = true);
    this.g.connect(this.l, this.h || void 0);
  };
  Y.prototype.close = function() {
    gc(this.g);
  };
  Y.prototype.o = function(a) {
    var b2 = this.g;
    if ("string" === typeof a) {
      var c = {};
      c.__data__ = a;
      a = c;
    } else this.u && (c = {}, c.__data__ = hb(a), a = c);
    b2.i.push(new hc(b2.Ya++, a));
    3 == b2.G && fc(b2);
  };
  Y.prototype.N = function() {
    this.g.l = null;
    delete this.j;
    gc(this.g);
    delete this.g;
    Y.aa.N.call(this);
  };
  function id(a) {
    nb.call(this);
    a.__headers__ && (this.headers = a.__headers__, this.statusCode = a.__status__, delete a.__headers__, delete a.__status__);
    var b2 = a.__sm__;
    if (b2) {
      a: {
        for (const c in b2) {
          a = c;
          break a;
        }
        a = void 0;
      }
      if (this.i = a) a = this.i, b2 = null !== b2 && a in b2 ? b2[a] : void 0;
      this.data = b2;
    } else this.data = a;
  }
  r(id, nb);
  function jd() {
    ob.call(this);
    this.status = 1;
  }
  r(jd, ob);
  function Z(a) {
    this.g = a;
  }
  r(Z, gd);
  Z.prototype.ua = function() {
    F(this.g, "a");
  };
  Z.prototype.ta = function(a) {
    F(this.g, new id(a));
  };
  Z.prototype.sa = function(a) {
    F(this.g, new jd());
  };
  Z.prototype.ra = function() {
    F(this.g, "b");
  };
  Y.prototype.send = Y.prototype.o;
  Y.prototype.open = Y.prototype.m;
  Y.prototype.close = Y.prototype.close;
  Ab.NO_ERROR = 0;
  Ab.TIMEOUT = 8;
  Ab.HTTP_ERROR = 6;
  Bb.COMPLETE = "complete";
  mb.EventType = H;
  H.OPEN = "a";
  H.CLOSE = "b";
  H.ERROR = "c";
  H.MESSAGE = "d";
  E.prototype.listen = E.prototype.K;
  X.prototype.listenOnce = X.prototype.L;
  X.prototype.getLastError = X.prototype.Ka;
  X.prototype.getLastErrorCode = X.prototype.Ba;
  X.prototype.getStatus = X.prototype.Z;
  X.prototype.getResponseJson = X.prototype.Oa;
  X.prototype.getResponseText = X.prototype.oa;
  X.prototype.send = X.prototype.ea;
  X.prototype.setWithCredentials = X.prototype.Ha;
}).apply(typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
const b = "@firebase/firestore", S = "4.7.9";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class User {
  constructor(e) {
    this.uid = e;
  }
  isAuthenticated() {
    return null != this.uid;
  }
  /**
   * Returns a key representing this user, suitable for inclusion in a
   * dictionary.
   */
  toKey() {
    return this.isAuthenticated() ? "uid:" + this.uid : "anonymous-user";
  }
  isEqual(e) {
    return e.uid === this.uid;
  }
}
User.UNAUTHENTICATED = new User(null), // TODO(mikelehen): Look into getting a proper uid-equivalent for
// non-FirebaseAuth providers.
User.GOOGLE_CREDENTIALS = new User("google-credentials-uid"), User.FIRST_PARTY = new User("first-party-uid"), User.MOCK_USER = new User("mock-user");
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let D = "11.4.0";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const v = new Logger("@firebase/firestore");
function __PRIVATE_logDebug(e, ...t) {
  if (v.logLevel <= LogLevel.DEBUG) {
    const n = t.map(__PRIVATE_argToString);
    v.debug(`Firestore (${D}): ${e}`, ...n);
  }
}
function __PRIVATE_logError(e, ...t) {
  if (v.logLevel <= LogLevel.ERROR) {
    const n = t.map(__PRIVATE_argToString);
    v.error(`Firestore (${D}): ${e}`, ...n);
  }
}
function __PRIVATE_logWarn(e, ...t) {
  if (v.logLevel <= LogLevel.WARN) {
    const n = t.map(__PRIVATE_argToString);
    v.warn(`Firestore (${D}): ${e}`, ...n);
  }
}
function __PRIVATE_argToString(e) {
  if ("string" == typeof e) return e;
  try {
    /**
    * @license
    * Copyright 2020 Google LLC
    *
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    *   http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    */
    return function __PRIVATE_formatJSON(e2) {
      return JSON.stringify(e2);
    }(e);
  } catch (t) {
    return e;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function fail(e = "Unexpected state") {
  const t = `FIRESTORE (${D}) INTERNAL ASSERTION FAILED: ` + e;
  throw __PRIVATE_logError(t), new Error(t);
}
function __PRIVATE_hardAssert(e, t) {
  e || fail();
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const C = {
  /** The operation was cancelled (typically by the caller). */
  CANCELLED: "cancelled",
  /**
   * Client specified an invalid argument. Note that this differs from
   * FAILED_PRECONDITION. INVALID_ARGUMENT indicates arguments that are
   * problematic regardless of the state of the system (e.g., a malformed file
   * name).
   */
  INVALID_ARGUMENT: "invalid-argument",
  /**
   * Operation was rejected because the system is not in a state required for
   * the operation's execution. For example, directory to be deleted may be
   * non-empty, an rmdir operation is applied to a non-directory, etc.
   *
   * A litmus test that may help a service implementor in deciding
   * between FAILED_PRECONDITION, ABORTED, and UNAVAILABLE:
   *  (a) Use UNAVAILABLE if the client can retry just the failing call.
   *  (b) Use ABORTED if the client should retry at a higher-level
   *      (e.g., restarting a read-modify-write sequence).
   *  (c) Use FAILED_PRECONDITION if the client should not retry until
   *      the system state has been explicitly fixed. E.g., if an "rmdir"
   *      fails because the directory is non-empty, FAILED_PRECONDITION
   *      should be returned since the client should not retry unless
   *      they have first fixed up the directory by deleting files from it.
   *  (d) Use FAILED_PRECONDITION if the client performs conditional
   *      REST Get/Update/Delete on a resource and the resource on the
   *      server does not match the condition. E.g., conflicting
   *      read-modify-write on the same resource.
   */
  FAILED_PRECONDITION: "failed-precondition"
};
class FirestoreError extends FirebaseError {
  /** @hideconstructor */
  constructor(e, t) {
    super(e, t), this.code = e, this.message = t, // HACK: We write a toString property directly because Error is not a real
    // class and so inheritance does not work correctly. We could alternatively
    // do the same "back-door inheritance" trick that FirebaseError does.
    this.toString = () => `${this.name}: [code=${this.code}]: ${this.message}`;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class __PRIVATE_Deferred {
  constructor() {
    this.promise = new Promise((e, t) => {
      this.resolve = e, this.reject = t;
    });
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class __PRIVATE_OAuthToken {
  constructor(e, t) {
    this.user = t, this.type = "OAuth", this.headers = /* @__PURE__ */ new Map(), this.headers.set("Authorization", `Bearer ${e}`);
  }
}
class __PRIVATE_EmptyAuthCredentialsProvider {
  getToken() {
    return Promise.resolve(null);
  }
  invalidateToken() {
  }
  start(e, t) {
    e.enqueueRetryable(() => t(User.UNAUTHENTICATED));
  }
  shutdown() {
  }
}
class __PRIVATE_EmulatorAuthCredentialsProvider {
  constructor(e) {
    this.token = e, /**
     * Stores the listener registered with setChangeListener()
     * This isn't actually necessary since the UID never changes, but we use this
     * to verify the listen contract is adhered to in tests.
     */
    this.changeListener = null;
  }
  getToken() {
    return Promise.resolve(this.token);
  }
  invalidateToken() {
  }
  start(e, t) {
    this.changeListener = t, // Fire with initial user.
    e.enqueueRetryable(() => t(this.token.user));
  }
  shutdown() {
    this.changeListener = null;
  }
}
class __PRIVATE_FirebaseAuthCredentialsProvider {
  constructor(e) {
    this.t = e, /** Tracks the current User. */
    this.currentUser = User.UNAUTHENTICATED, /**
     * Counter used to detect if the token changed while a getToken request was
     * outstanding.
     */
    this.i = 0, this.forceRefresh = false, this.auth = null;
  }
  start(e, t) {
    __PRIVATE_hardAssert(void 0 === this.o);
    let n = this.i;
    const __PRIVATE_guardedChangeListener = (e2) => this.i !== n ? (n = this.i, t(e2)) : Promise.resolve();
    let r = new __PRIVATE_Deferred();
    this.o = () => {
      this.i++, this.currentUser = this.u(), r.resolve(), r = new __PRIVATE_Deferred(), e.enqueueRetryable(() => __PRIVATE_guardedChangeListener(this.currentUser));
    };
    const __PRIVATE_awaitNextToken = () => {
      const t2 = r;
      e.enqueueRetryable(async () => {
        await t2.promise, await __PRIVATE_guardedChangeListener(this.currentUser);
      });
    }, __PRIVATE_registerAuth = (e2) => {
      __PRIVATE_logDebug("FirebaseAuthCredentialsProvider", "Auth detected"), this.auth = e2, this.o && (this.auth.addAuthTokenListener(this.o), __PRIVATE_awaitNextToken());
    };
    this.t.onInit((e2) => __PRIVATE_registerAuth(e2)), // Our users can initialize Auth right after Firestore, so we give it
    // a chance to register itself with the component framework before we
    // determine whether to start up in unauthenticated mode.
    setTimeout(() => {
      if (!this.auth) {
        const e2 = this.t.getImmediate({
          optional: true
        });
        e2 ? __PRIVATE_registerAuth(e2) : (
          // If auth is still not available, proceed with `null` user
          (__PRIVATE_logDebug("FirebaseAuthCredentialsProvider", "Auth not yet detected"), r.resolve(), r = new __PRIVATE_Deferred())
        );
      }
    }, 0), __PRIVATE_awaitNextToken();
  }
  getToken() {
    const e = this.i, t = this.forceRefresh;
    return this.forceRefresh = false, this.auth ? this.auth.getToken(t).then((t2) => (
      // Cancel the request since the token changed while the request was
      // outstanding so the response is potentially for a previous user (which
      // user, we can't be sure).
      this.i !== e ? (__PRIVATE_logDebug("FirebaseAuthCredentialsProvider", "getToken aborted due to token change."), this.getToken()) : t2 ? (__PRIVATE_hardAssert("string" == typeof t2.accessToken), new __PRIVATE_OAuthToken(t2.accessToken, this.currentUser)) : null
    )) : Promise.resolve(null);
  }
  invalidateToken() {
    this.forceRefresh = true;
  }
  shutdown() {
    this.auth && this.o && this.auth.removeAuthTokenListener(this.o), this.o = void 0;
  }
  // Auth.getUid() can return null even with a user logged in. It is because
  // getUid() is synchronous, but the auth code populating Uid is asynchronous.
  // This method should only be called in the AuthTokenListener callback
  // to guarantee to get the actual user.
  u() {
    const e = this.auth && this.auth.getUid();
    return __PRIVATE_hardAssert(null === e || "string" == typeof e), new User(e);
  }
}
class __PRIVATE_FirstPartyToken {
  constructor(e, t, n) {
    this.l = e, this.h = t, this.P = n, this.type = "FirstParty", this.user = User.FIRST_PARTY, this.T = /* @__PURE__ */ new Map();
  }
  /**
   * Gets an authorization token, using a provided factory function, or return
   * null.
   */
  I() {
    return this.P ? this.P() : null;
  }
  get headers() {
    this.T.set("X-Goog-AuthUser", this.l);
    const e = this.I();
    return e && this.T.set("Authorization", e), this.h && this.T.set("X-Goog-Iam-Authorization-Token", this.h), this.T;
  }
}
class __PRIVATE_FirstPartyAuthCredentialsProvider {
  constructor(e, t, n) {
    this.l = e, this.h = t, this.P = n;
  }
  getToken() {
    return Promise.resolve(new __PRIVATE_FirstPartyToken(this.l, this.h, this.P));
  }
  start(e, t) {
    e.enqueueRetryable(() => t(User.FIRST_PARTY));
  }
  shutdown() {
  }
  invalidateToken() {
  }
}
class AppCheckToken {
  constructor(e) {
    this.value = e, this.type = "AppCheck", this.headers = /* @__PURE__ */ new Map(), e && e.length > 0 && this.headers.set("x-firebase-appcheck", this.value);
  }
}
class __PRIVATE_FirebaseAppCheckTokenProvider {
  constructor(t, n) {
    this.A = n, this.forceRefresh = false, this.appCheck = null, this.R = null, this.V = null, _isFirebaseServerApp(t) && t.settings.appCheckToken && (this.V = t.settings.appCheckToken);
  }
  start(e, t) {
    __PRIVATE_hardAssert(void 0 === this.o);
    const onTokenChanged = (e2) => {
      null != e2.error && __PRIVATE_logDebug("FirebaseAppCheckTokenProvider", `Error getting App Check token; using placeholder token instead. Error: ${e2.error.message}`);
      const n = e2.token !== this.R;
      return this.R = e2.token, __PRIVATE_logDebug("FirebaseAppCheckTokenProvider", `Received ${n ? "new" : "existing"} token.`), n ? t(e2.token) : Promise.resolve();
    };
    this.o = (t2) => {
      e.enqueueRetryable(() => onTokenChanged(t2));
    };
    const __PRIVATE_registerAppCheck = (e2) => {
      __PRIVATE_logDebug("FirebaseAppCheckTokenProvider", "AppCheck detected"), this.appCheck = e2, this.o && this.appCheck.addTokenListener(this.o);
    };
    this.A.onInit((e2) => __PRIVATE_registerAppCheck(e2)), // Our users can initialize AppCheck after Firestore, so we give it
    // a chance to register itself with the component framework.
    setTimeout(() => {
      if (!this.appCheck) {
        const e2 = this.A.getImmediate({
          optional: true
        });
        e2 ? __PRIVATE_registerAppCheck(e2) : (
          // If AppCheck is still not available, proceed without it.
          __PRIVATE_logDebug("FirebaseAppCheckTokenProvider", "AppCheck not yet detected")
        );
      }
    }, 0);
  }
  getToken() {
    if (this.V) return Promise.resolve(new AppCheckToken(this.V));
    const e = this.forceRefresh;
    return this.forceRefresh = false, this.appCheck ? this.appCheck.getToken(e).then((e2) => e2 ? (__PRIVATE_hardAssert("string" == typeof e2.token), this.R = e2.token, new AppCheckToken(e2.token)) : null) : Promise.resolve(null);
  }
  invalidateToken() {
    this.forceRefresh = true;
  }
  shutdown() {
    this.appCheck && this.o && this.appCheck.removeTokenListener(this.o), this.o = void 0;
  }
}
function __PRIVATE_isIndexedDbTransactionError(e) {
  return "IndexedDbTransactionError" === e.name;
}
const rt = "(default)";
class DatabaseId {
  constructor(e, t) {
    this.projectId = e, this.database = t || rt;
  }
  static empty() {
    return new DatabaseId("", "");
  }
  get isDefaultDatabase() {
    return this.database === rt;
  }
  isEqual(e) {
    return e instanceof DatabaseId && e.projectId === this.projectId && e.database === this.database;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Et, dt;
(dt = Et || (Et = {}))[dt.OK = 0] = "OK", dt[dt.CANCELLED = 1] = "CANCELLED", dt[dt.UNKNOWN = 2] = "UNKNOWN", dt[dt.INVALID_ARGUMENT = 3] = "INVALID_ARGUMENT", dt[dt.DEADLINE_EXCEEDED = 4] = "DEADLINE_EXCEEDED", dt[dt.NOT_FOUND = 5] = "NOT_FOUND", dt[dt.ALREADY_EXISTS = 6] = "ALREADY_EXISTS", dt[dt.PERMISSION_DENIED = 7] = "PERMISSION_DENIED", dt[dt.UNAUTHENTICATED = 16] = "UNAUTHENTICATED", dt[dt.RESOURCE_EXHAUSTED = 8] = "RESOURCE_EXHAUSTED", dt[dt.FAILED_PRECONDITION = 9] = "FAILED_PRECONDITION", dt[dt.ABORTED = 10] = "ABORTED", dt[dt.OUT_OF_RANGE = 11] = "OUT_OF_RANGE", dt[dt.UNIMPLEMENTED = 12] = "UNIMPLEMENTED", dt[dt.INTERNAL = 13] = "INTERNAL", dt[dt.UNAVAILABLE = 14] = "UNAVAILABLE", dt[dt.DATA_LOSS = 15] = "DATA_LOSS";
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
new Integer([4294967295, 4294967295], 0);
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const bt = 41943040;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Dt = 1048576;
function getDocument() {
  return "undefined" != typeof document ? document : null;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class __PRIVATE_ExponentialBackoff {
  constructor(e, t, n = 1e3, r = 1.5, i = 6e4) {
    this.Ti = e, this.timerId = t, this.Go = n, this.zo = r, this.jo = i, this.Ho = 0, this.Jo = null, /** The last backoff attempt, as epoch milliseconds. */
    this.Yo = Date.now(), this.reset();
  }
  /**
   * Resets the backoff delay.
   *
   * The very next backoffAndWait() will have no delay. If it is called again
   * (i.e. due to an error), initialDelayMs (plus jitter) will be used, and
   * subsequent ones will increase according to the backoffFactor.
   */
  reset() {
    this.Ho = 0;
  }
  /**
   * Resets the backoff delay to the maximum delay (e.g. for use after a
   * RESOURCE_EXHAUSTED error).
   */
  Zo() {
    this.Ho = this.jo;
  }
  /**
   * Returns a promise that resolves after currentDelayMs, and increases the
   * delay for any subsequent attempts. If there was a pending backoff operation
   * already, it will be canceled.
   */
  Xo(e) {
    this.cancel();
    const t = Math.floor(this.Ho + this.e_()), n = Math.max(0, Date.now() - this.Yo), r = Math.max(0, t - n);
    r > 0 && __PRIVATE_logDebug("ExponentialBackoff", `Backing off for ${r} ms (base delay: ${this.Ho} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`), this.Jo = this.Ti.enqueueAfterDelay(this.timerId, r, () => (this.Yo = Date.now(), e())), // Apply backoff factor to determine next delay and ensure it is within
    // bounds.
    this.Ho *= this.zo, this.Ho < this.Go && (this.Ho = this.Go), this.Ho > this.jo && (this.Ho = this.jo);
  }
  t_() {
    null !== this.Jo && (this.Jo.skipDelay(), this.Jo = null);
  }
  cancel() {
    null !== this.Jo && (this.Jo.cancel(), this.Jo = null);
  }
  /** Returns a random value in the range [-currentBaseMs/2, currentBaseMs/2] */
  e_() {
    return (Math.random() - 0.5) * this.Ho;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class DelayedOperation {
  constructor(e, t, n, r, i) {
    this.asyncQueue = e, this.timerId = t, this.targetTimeMs = n, this.op = r, this.removalCallback = i, this.deferred = new __PRIVATE_Deferred(), this.then = this.deferred.promise.then.bind(this.deferred.promise), // It's normal for the deferred promise to be canceled (due to cancellation)
    // and so we attach a dummy catch callback to avoid
    // 'UnhandledPromiseRejectionWarning' log spam.
    this.deferred.promise.catch((e2) => {
    });
  }
  get promise() {
    return this.deferred.promise;
  }
  /**
   * Creates and returns a DelayedOperation that has been scheduled to be
   * executed on the provided asyncQueue after the provided delayMs.
   *
   * @param asyncQueue - The queue to schedule the operation on.
   * @param id - A Timer ID identifying the type of operation this is.
   * @param delayMs - The delay (ms) before the operation should be scheduled.
   * @param op - The operation to run.
   * @param removalCallback - A callback to be called synchronously once the
   *   operation is executed or canceled, notifying the AsyncQueue to remove it
   *   from its delayedOperations list.
   *   PORTING NOTE: This exists to prevent making removeDelayedOperation() and
   *   the DelayedOperation class public.
   */
  static createAndSchedule(e, t, n, r, i) {
    const s = Date.now() + n, o = new DelayedOperation(e, t, s, r, i);
    return o.start(n), o;
  }
  /**
   * Starts the timer. This is called immediately after construction by
   * createAndSchedule().
   */
  start(e) {
    this.timerHandle = setTimeout(() => this.handleDelayElapsed(), e);
  }
  /**
   * Queues the operation to run immediately (if it hasn't already been run or
   * canceled).
   */
  skipDelay() {
    return this.handleDelayElapsed();
  }
  /**
   * Cancels the operation if it hasn't already been executed or canceled. The
   * promise will be rejected.
   *
   * As long as the operation has not yet been run, calling cancel() provides a
   * guarantee that the operation will not be run.
   */
  cancel(e) {
    null !== this.timerHandle && (this.clearTimeout(), this.deferred.reject(new FirestoreError(C.CANCELLED, "Operation cancelled" + (e ? ": " + e : ""))));
  }
  handleDelayElapsed() {
    this.asyncQueue.enqueueAndForget(() => null !== this.timerHandle ? (this.clearTimeout(), this.op().then((e) => this.deferred.resolve(e))) : Promise.resolve());
  }
  clearTimeout() {
    null !== this.timerHandle && (this.removalCallback(this), clearTimeout(this.timerHandle), this.timerHandle = null);
  }
}
var jt, Ht;
(Ht = jt || (jt = {}))._a = "default", /** Listen to changes in cache only */
Ht.Cache = "cache";
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function __PRIVATE_cloneLongPollingOptions(e) {
  const t = {};
  return void 0 !== e.timeoutSeconds && (t.timeoutSeconds = e.timeoutSeconds), t;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Zt = /* @__PURE__ */ new Map();
function __PRIVATE_validateIsNotUsedTogether(e, t, n, r) {
  if (true === t && true === r) throw new FirestoreError(C.INVALID_ARGUMENT, `${e} and ${n} cannot be used together.`);
}
function __PRIVATE_valueDescription(e) {
  if (void 0 === e) return "undefined";
  if (null === e) return "null";
  if ("string" == typeof e) return e.length > 20 && (e = `${e.substring(0, 20)}...`), JSON.stringify(e);
  if ("number" == typeof e || "boolean" == typeof e) return "" + e;
  if ("object" == typeof e) {
    if (e instanceof Array) return "an array";
    {
      const t = (
        /** try to get the constructor name for an object. */
        function __PRIVATE_tryGetCustomObjectType(e2) {
          if (e2.constructor) return e2.constructor.name;
          return null;
        }(e)
      );
      return t ? `a custom ${t} object` : "an object";
    }
  }
  return "function" == typeof e ? "a function" : fail();
}
function __PRIVATE_cast(e, t) {
  if ("_delegate" in e && // Unwrap Compat types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (e = e._delegate), !(e instanceof t)) {
    if (t.name === e.constructor.name) throw new FirestoreError(C.INVALID_ARGUMENT, "Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");
    {
      const n = __PRIVATE_valueDescription(e);
      throw new FirestoreError(C.INVALID_ARGUMENT, `Expected type '${t.name}', but it was: ${n}`);
    }
  }
  return e;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Xt = "firestore.googleapis.com", en = true;
class FirestoreSettingsImpl {
  constructor(e) {
    var t, n;
    if (void 0 === e.host) {
      if (void 0 !== e.ssl) throw new FirestoreError(C.INVALID_ARGUMENT, "Can't provide ssl option if host option is not set");
      this.host = Xt, this.ssl = en;
    } else this.host = e.host, this.ssl = null !== (t = e.ssl) && void 0 !== t ? t : en;
    if (this.credentials = e.credentials, this.ignoreUndefinedProperties = !!e.ignoreUndefinedProperties, this.localCache = e.localCache, void 0 === e.cacheSizeBytes) this.cacheSizeBytes = bt;
    else {
      if (-1 !== e.cacheSizeBytes && e.cacheSizeBytes < Dt) throw new FirestoreError(C.INVALID_ARGUMENT, "cacheSizeBytes must be at least 1048576");
      this.cacheSizeBytes = e.cacheSizeBytes;
    }
    __PRIVATE_validateIsNotUsedTogether("experimentalForceLongPolling", e.experimentalForceLongPolling, "experimentalAutoDetectLongPolling", e.experimentalAutoDetectLongPolling), this.experimentalForceLongPolling = !!e.experimentalForceLongPolling, this.experimentalForceLongPolling ? this.experimentalAutoDetectLongPolling = false : void 0 === e.experimentalAutoDetectLongPolling ? this.experimentalAutoDetectLongPolling = true : (
      // For backwards compatibility, coerce the value to boolean even though
      // the TypeScript compiler has narrowed the type to boolean already.
      // noinspection PointlessBooleanExpressionJS
      this.experimentalAutoDetectLongPolling = !!e.experimentalAutoDetectLongPolling
    ), this.experimentalLongPollingOptions = __PRIVATE_cloneLongPollingOptions(null !== (n = e.experimentalLongPollingOptions) && void 0 !== n ? n : {}), function __PRIVATE_validateLongPollingOptions(e2) {
      if (void 0 !== e2.timeoutSeconds) {
        if (isNaN(e2.timeoutSeconds)) throw new FirestoreError(C.INVALID_ARGUMENT, `invalid long polling timeout: ${e2.timeoutSeconds} (must not be NaN)`);
        if (e2.timeoutSeconds < 5) throw new FirestoreError(C.INVALID_ARGUMENT, `invalid long polling timeout: ${e2.timeoutSeconds} (minimum allowed value is 5)`);
        if (e2.timeoutSeconds > 30) throw new FirestoreError(C.INVALID_ARGUMENT, `invalid long polling timeout: ${e2.timeoutSeconds} (maximum allowed value is 30)`);
      }
    }(this.experimentalLongPollingOptions), this.useFetchStreams = !!e.useFetchStreams;
  }
  isEqual(e) {
    return this.host === e.host && this.ssl === e.ssl && this.credentials === e.credentials && this.cacheSizeBytes === e.cacheSizeBytes && this.experimentalForceLongPolling === e.experimentalForceLongPolling && this.experimentalAutoDetectLongPolling === e.experimentalAutoDetectLongPolling && function __PRIVATE_longPollingOptionsEqual(e2, t) {
      return e2.timeoutSeconds === t.timeoutSeconds;
    }(this.experimentalLongPollingOptions, e.experimentalLongPollingOptions) && this.ignoreUndefinedProperties === e.ignoreUndefinedProperties && this.useFetchStreams === e.useFetchStreams;
  }
}
class Firestore$1 {
  /** @hideconstructor */
  constructor(e, t, n, r) {
    this._authCredentials = e, this._appCheckCredentials = t, this._databaseId = n, this._app = r, /**
     * Whether it's a Firestore or Firestore Lite instance.
     */
    this.type = "firestore-lite", this._persistenceKey = "(lite)", this._settings = new FirestoreSettingsImpl({}), this._settingsFrozen = false, this._emulatorOptions = {}, // A task that is assigned when the terminate() is invoked and resolved when
    // all components have shut down. Otherwise, Firestore is not terminated,
    // which can mean either the FirestoreClient is in the process of starting,
    // or restarting.
    this._terminateTask = "notTerminated";
  }
  /**
   * The {@link @firebase/app#FirebaseApp} associated with this `Firestore` service
   * instance.
   */
  get app() {
    if (!this._app) throw new FirestoreError(C.FAILED_PRECONDITION, "Firestore was not initialized using the Firebase SDK. 'app' is not available");
    return this._app;
  }
  get _initialized() {
    return this._settingsFrozen;
  }
  get _terminated() {
    return "notTerminated" !== this._terminateTask;
  }
  _setSettings(e) {
    if (this._settingsFrozen) throw new FirestoreError(C.FAILED_PRECONDITION, "Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");
    this._settings = new FirestoreSettingsImpl(e), this._emulatorOptions = e.emulatorOptions || {}, void 0 !== e.credentials && (this._authCredentials = function __PRIVATE_makeAuthCredentialsProvider(e2) {
      if (!e2) return new __PRIVATE_EmptyAuthCredentialsProvider();
      switch (e2.type) {
        case "firstParty":
          return new __PRIVATE_FirstPartyAuthCredentialsProvider(e2.sessionIndex || "0", e2.iamToken || null, e2.authTokenFactory || null);
        case "provider":
          return e2.client;
        default:
          throw new FirestoreError(C.INVALID_ARGUMENT, "makeAuthCredentialsProvider failed due to invalid credential type");
      }
    }(e.credentials));
  }
  _getSettings() {
    return this._settings;
  }
  _getEmulatorOptions() {
    return this._emulatorOptions;
  }
  _freezeSettings() {
    return this._settingsFrozen = true, this._settings;
  }
  _delete() {
    return "notTerminated" === this._terminateTask && (this._terminateTask = this._terminate()), this._terminateTask;
  }
  async _restart() {
    "notTerminated" === this._terminateTask ? await this._terminate() : this._terminateTask = "notTerminated";
  }
  /** Returns a JSON-serializable representation of this `Firestore` instance. */
  toJSON() {
    return {
      app: this._app,
      databaseId: this._databaseId,
      settings: this._settings
    };
  }
  /**
   * Terminates all components used by this client. Subclasses can override
   * this method to clean up their own dependencies, but must also call this
   * method.
   *
   * Only ever called once.
   */
  _terminate() {
    return function __PRIVATE_removeComponents(e) {
      const t = Zt.get(e);
      t && (__PRIVATE_logDebug("ComponentProvider", "Removing Datastore"), Zt.delete(e), t.terminate());
    }(this), Promise.resolve();
  }
}
function connectFirestoreEmulator(e, t, n, r = {}) {
  var i;
  const s = (e = __PRIVATE_cast(e, Firestore$1))._getSettings(), o = Object.assign(Object.assign({}, s), {
    emulatorOptions: e._getEmulatorOptions()
  }), _ = `${t}:${n}`;
  s.host !== Xt && s.host !== _ && __PRIVATE_logWarn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");
  const a = Object.assign(Object.assign({}, s), {
    host: _,
    ssl: false,
    emulatorOptions: r
  });
  if (!deepEqual(a, o) && (e._setSettings(a), r.mockUserToken)) {
    let t2, n2;
    if ("string" == typeof r.mockUserToken) t2 = r.mockUserToken, n2 = User.MOCK_USER;
    else {
      t2 = createMockUserToken(r.mockUserToken, null === (i = e._app) || void 0 === i ? void 0 : i.options.projectId);
      const s2 = r.mockUserToken.sub || r.mockUserToken.user_id;
      if (!s2) throw new FirestoreError(C.INVALID_ARGUMENT, "mockUserToken must contain 'sub' or 'user_id' field!");
      n2 = new User(s2);
    }
    e._authCredentials = new __PRIVATE_EmulatorAuthCredentialsProvider(new __PRIVATE_OAuthToken(t2, n2));
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const tn = "AsyncQueue";
class __PRIVATE_AsyncQueueImpl {
  constructor(e = Promise.resolve()) {
    this.Vu = [], // Is this AsyncQueue being shut down? Once it is set to true, it will not
    // be changed again.
    this.mu = false, // Operations scheduled to be queued in the future. Operations are
    // automatically removed after they are run or canceled.
    this.fu = [], // visible for testing
    this.gu = null, // Flag set while there's an outstanding AsyncQueue operation, used for
    // assertion sanity-checks.
    this.pu = false, // Enabled during shutdown on Safari to prevent future access to IndexedDB.
    this.yu = false, // List of TimerIds to fast-forward delays for.
    this.wu = [], // Backoff timer used to schedule retries for retryable operations
    this.a_ = new __PRIVATE_ExponentialBackoff(
      this,
      "async_queue_retry"
      /* TimerId.AsyncQueueRetry */
    ), // Visibility handler that triggers an immediate retry of all retryable
    // operations. Meant to speed up recovery when we regain file system access
    // after page comes into foreground.
    this.bu = () => {
      const e2 = getDocument();
      e2 && __PRIVATE_logDebug(tn, "Visibility state changed to " + e2.visibilityState), this.a_.t_();
    }, this.Su = e;
    const t = getDocument();
    t && "function" == typeof t.addEventListener && t.addEventListener("visibilitychange", this.bu);
  }
  get isShuttingDown() {
    return this.mu;
  }
  /**
   * Adds a new operation to the queue without waiting for it to complete (i.e.
   * we ignore the Promise result).
   */
  enqueueAndForget(e) {
    this.enqueue(e);
  }
  enqueueAndForgetEvenWhileRestricted(e) {
    this.Du(), // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.vu(e);
  }
  enterRestrictedMode(e) {
    if (!this.mu) {
      this.mu = true, this.yu = e || false;
      const t = getDocument();
      t && "function" == typeof t.removeEventListener && t.removeEventListener("visibilitychange", this.bu);
    }
  }
  enqueue(e) {
    if (this.Du(), this.mu)
      return new Promise(() => {
      });
    const t = new __PRIVATE_Deferred();
    return this.vu(() => this.mu && this.yu ? Promise.resolve() : (e().then(t.resolve, t.reject), t.promise)).then(() => t.promise);
  }
  enqueueRetryable(e) {
    this.enqueueAndForget(() => (this.Vu.push(e), this.Cu()));
  }
  /**
   * Runs the next operation from the retryable queue. If the operation fails,
   * reschedules with backoff.
   */
  async Cu() {
    if (0 !== this.Vu.length) {
      try {
        await this.Vu[0](), this.Vu.shift(), this.a_.reset();
      } catch (e) {
        if (!__PRIVATE_isIndexedDbTransactionError(e)) throw e;
        __PRIVATE_logDebug(tn, "Operation failed with retryable error: " + e);
      }
      this.Vu.length > 0 && // If there are additional operations, we re-schedule `retryNextOp()`.
      // This is necessary to run retryable operations that failed during
      // their initial attempt since we don't know whether they are already
      // enqueued. If, for example, `op1`, `op2`, `op3` are enqueued and `op1`
      // needs to  be re-run, we will run `op1`, `op1`, `op2` using the
      // already enqueued calls to `retryNextOp()`. `op3()` will then run in the
      // call scheduled here.
      // Since `backoffAndRun()` cancels an existing backoff and schedules a
      // new backoff on every call, there is only ever a single additional
      // operation in the queue.
      this.a_.Xo(() => this.Cu());
    }
  }
  vu(e) {
    const t = this.Su.then(() => (this.pu = true, e().catch((e2) => {
      this.gu = e2, this.pu = false;
      const t2 = (
        /**
        * Chrome includes Error.message in Error.stack. Other browsers do not.
        * This returns expected output of message + stack when available.
        * @param error - Error or FirestoreError
        */
        function __PRIVATE_getMessageOrStack(e3) {
          let t3 = e3.message || "";
          e3.stack && (t3 = e3.stack.includes(e3.message) ? e3.stack : e3.message + "\n" + e3.stack);
          return t3;
        }(e2)
      );
      throw __PRIVATE_logError("INTERNAL UNHANDLED ERROR: ", t2), e2;
    }).then((e2) => (this.pu = false, e2))));
    return this.Su = t, t;
  }
  enqueueAfterDelay(e, t, n) {
    this.Du(), // Fast-forward delays for timerIds that have been overridden.
    this.wu.indexOf(e) > -1 && (t = 0);
    const r = DelayedOperation.createAndSchedule(this, e, t, n, (e2) => this.Fu(e2));
    return this.fu.push(r), r;
  }
  Du() {
    this.gu && fail();
  }
  verifyOperationInProgress() {
  }
  /**
   * Waits until all currently queued tasks are finished executing. Delayed
   * operations are not run.
   */
  async Mu() {
    let e;
    do {
      e = this.Su, await e;
    } while (e !== this.Su);
  }
  /**
   * For Tests: Determine if a delayed operation with a particular TimerId
   * exists.
   */
  xu(e) {
    for (const t of this.fu) if (t.timerId === e) return true;
    return false;
  }
  /**
   * For Tests: Runs some or all delayed operations early.
   *
   * @param lastTimerId - Delayed operations up to and including this TimerId
   * will be drained. Pass TimerId.All to run all delayed operations.
   * @returns a Promise that resolves once all operations have been run.
   */
  Ou(e) {
    return this.Mu().then(() => {
      this.fu.sort((e2, t) => e2.targetTimeMs - t.targetTimeMs);
      for (const t of this.fu) if (t.skipDelay(), "all" !== e && t.timerId === e) break;
      return this.Mu();
    });
  }
  /**
   * For Tests: Skip all subsequent delays for a timer id.
   */
  Nu(e) {
    this.wu.push(e);
  }
  /** Called once a DelayedOperation is run or canceled. */
  Fu(e) {
    const t = this.fu.indexOf(e);
    this.fu.splice(t, 1);
  }
}
class Firestore extends Firestore$1 {
  /** @hideconstructor */
  constructor(e, t, n, r) {
    super(e, t, n, r), /**
     * Whether it's a {@link Firestore} or Firestore Lite instance.
     */
    this.type = "firestore", this._queue = new __PRIVATE_AsyncQueueImpl(), this._persistenceKey = (null == r ? void 0 : r.name) || "[DEFAULT]";
  }
  async _terminate() {
    if (this._firestoreClient) {
      const e = this._firestoreClient.terminate();
      this._queue = new __PRIVATE_AsyncQueueImpl(e), this._firestoreClient = void 0, await e;
    }
  }
}
function getFirestore(e, n) {
  const r = "object" == typeof e ? e : getApp(), i = "string" == typeof e ? e : rt, s = _getProvider(r, "firestore").getImmediate({
    identifier: i
  });
  if (!s._initialized) {
    const e2 = getDefaultEmulatorHostnameAndPort("firestore");
    e2 && connectFirestoreEmulator(s, ...e2);
  }
  return s;
}
!function __PRIVATE_registerFirestore(e, t = true) {
  !function __PRIVATE_setSDKVersion(e2) {
    D = e2;
  }(SDK_VERSION), _registerComponent(new Component("firestore", (e2, { instanceIdentifier: n, options: r }) => {
    const i = e2.getProvider("app").getImmediate(), s = new Firestore(new __PRIVATE_FirebaseAuthCredentialsProvider(e2.getProvider("auth-internal")), new __PRIVATE_FirebaseAppCheckTokenProvider(i, e2.getProvider("app-check-internal")), function __PRIVATE_databaseIdFromApp(e3, t2) {
      if (!Object.prototype.hasOwnProperty.apply(e3.options, ["projectId"])) throw new FirestoreError(C.INVALID_ARGUMENT, '"projectId" not provided in firebase.initializeApp.');
      return new DatabaseId(e3.options.projectId, t2);
    }(i, n), i);
    return r = Object.assign({
      useFetchStreams: t
    }, r), s._setSettings(r), s;
  }, "PUBLIC").setMultipleInstances(true)), registerVersion(b, S, e), // BUILD_TARGET will be replaced by values like esm2017, cjs2017, etc during the compilation
  registerVersion(b, S, "esm2017");
}();
const firebaseConfig = {
  apiKey: "AIzaSyDyiNPlmLubRg-9-ohK8YUW_KY1BguU7_Y",
  // Chave de API
  authDomain: "role-eventos-itinerantes.firebaseapp.com",
  projectId: "role-eventos-itinerantes",
  storageBucket: "role-eventos-itinerantes.firebasestorage.app",
  messagingSenderId: "121433088564",
  appId: "1:121433088564:web:440d1cd77d6c544cbe2061",
  measurementId: "G-0Y1GS7Y1WR"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, browserSessionPersistence).then(() => {
  console.log("Firebase Auth configurado para usar sessionStorage.");
}).catch((error) => {
  console.error("Erro ao configurar persistência:", error);
});
auth.errorMap = debugErrorMap;
auth.useDeviceLanguage();
new GoogleAuthProvider();
new FacebookAuthProvider();
getFirestore(app);
console.log("Firebase Client SDK inicializado com sucesso.");
function AuthEmailPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const handleEmailLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then((result) => {
      api.set("authToken", result.user.accessToken);
      navigate("/usuarios");
    }).catch((error) => {
      console.error(error);
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "paginaCadastro", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "tituloLogin", children: "Login" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LabelInput, { label: "E-mail: ", type: "text", placeholder: "nome@email.com", value: email, onChange: (e) => setEmail(e.target.value) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LabelInput, { label: "Senha: ", type: "password", placeholder: "**********", value: password, onChange: (e) => setPassword(e.target.value) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ButonGrande, { onClick: handleEmailLogin, className: "invertido", children: "Login" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ButonGrande, { onClick: () => navigate("/cadastro/registrarusuario"), className: "invertido", children: "Cadastrar Usuário" })
  ] });
}
export {
  AuthEmailPassword as default
};
