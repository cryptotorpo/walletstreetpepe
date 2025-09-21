import {
  A,
  B as b,
  C as H,
  D as S,
  L as q,
  b as p,
  c as x,
  e as d,
  f as O,
  g as w,
  h as k,
  k as I,
  n as y,
  p as g,
  q as B,
  s as j,
  t as L,
} from "./chunk-MSTRITJN.js";
import { e as R } from "./chunk-QE6IBIJD.js";
function Q(n, t = 24) {
  let s = new Uint32Array(10);
  for (let o = 24 - t; o < 24; o++) {
    for (let e = 0; e < 10; e++)
      s[e] = n[e] ^ n[e + 10] ^ n[e + 20] ^ n[e + 30] ^ n[e + 40];
    for (let e = 0; e < 10; e += 2) {
      let h = (e + 8) % 10,
        f = (e + 2) % 10,
        u = s[f],
        c = s[f + 1],
        P = T(u, c, 1) ^ s[h],
        M = m(u, c, 1) ^ s[h + 1];
      for (let l = 0; l < 50; l += 10) (n[e + l] ^= P), (n[e + l + 1] ^= M);
    }
    let i = n[2],
      r = n[3];
    for (let e = 0; e < 24; e++) {
      let h = X[e],
        f = T(i, r, h),
        u = m(i, r, h),
        c = F[e];
      (i = n[c]), (r = n[c + 1]), (n[c] = f), (n[c + 1] = u);
    }
    for (let e = 0; e < 50; e += 10) {
      for (let h = 0; h < 10; h++) s[h] = n[e + h];
      for (let h = 0; h < 10; h++)
        n[e + h] ^= ~s[(h + 2) % 10] & s[(h + 4) % 10];
    }
    (n[0] ^= J[o]), (n[1] ^= N[o]);
  }
  k(s);
}
var v,
  a,
  z,
  C,
  D,
  G,
  F,
  X,
  E,
  U,
  J,
  N,
  T,
  m,
  _,
  V,
  K,
  W = R(() => {
    "use strict";
    q();
    j();
    (v = BigInt(0)),
      (a = BigInt(1)),
      (z = BigInt(2)),
      (C = BigInt(7)),
      (D = BigInt(256)),
      (G = BigInt(113)),
      (F = []),
      (X = []),
      (E = []);
    for (let n = 0, t = a, s = 1, o = 0; n < 24; n++) {
      ([s, o] = [o, (2 * s + 3 * o) % 5]),
        F.push(2 * (5 * o + s)),
        X.push((((n + 1) * (n + 2)) / 2) % 64);
      let i = v;
      for (let r = 0; r < 7; r++)
        (t = ((t << a) ^ ((t >> C) * G)) % D),
          t & z && (i ^= a << ((a << BigInt(r)) - a));
      E.push(i);
    }
    (U = L(E, !0)),
      (J = U[0]),
      (N = U[1]),
      (T = (n, t, s) => (s > 32 ? H(n, t, s) : A(n, t, s))),
      (m = (n, t, s) => (s > 32 ? S(n, t, s) : b(n, t, s)));
    (_ = class n extends g {
      constructor(t, s, o, i = !1, r = 24) {
        if (
          (super(),
          (this.pos = 0),
          (this.posOut = 0),
          (this.finished = !1),
          (this.destroyed = !1),
          (this.enableXOF = !1),
          (this.blockLen = t),
          (this.suffix = s),
          (this.outputLen = o),
          (this.enableXOF = i),
          (this.rounds = r),
          p(o),
          !(0 < t && t < 200))
        )
          throw new Error("only keccak-f1600 function is supported");
        (this.state = new Uint8Array(200)), (this.state32 = w(this.state));
      }
      clone() {
        return this._cloneInto();
      }
      keccak() {
        I(this.state32),
          Q(this.state32, this.rounds),
          I(this.state32),
          (this.posOut = 0),
          (this.pos = 0);
      }
      update(t) {
        d(this), (t = y(t)), x(t);
        let { blockLen: s, state: o } = this,
          i = t.length;
        for (let r = 0; r < i; ) {
          let e = Math.min(s - this.pos, i - r);
          for (let h = 0; h < e; h++) o[this.pos++] ^= t[r++];
          this.pos === s && this.keccak();
        }
        return this;
      }
      finish() {
        if (this.finished) return;
        this.finished = !0;
        let { state: t, suffix: s, pos: o, blockLen: i } = this;
        (t[o] ^= s),
          s & 128 && o === i - 1 && this.keccak(),
          (t[i - 1] ^= 128),
          this.keccak();
      }
      writeInto(t) {
        d(this, !1), x(t), this.finish();
        let s = this.state,
          { blockLen: o } = this;
        for (let i = 0, r = t.length; i < r; ) {
          this.posOut >= o && this.keccak();
          let e = Math.min(o - this.posOut, r - i);
          t.set(s.subarray(this.posOut, this.posOut + e), i),
            (this.posOut += e),
            (i += e);
        }
        return t;
      }
      xofInto(t) {
        if (!this.enableXOF)
          throw new Error("XOF is not possible for this instance");
        return this.writeInto(t);
      }
      xof(t) {
        return p(t), this.xofInto(new Uint8Array(t));
      }
      digestInto(t) {
        if ((O(t, this), this.finished))
          throw new Error("digest() was already called");
        return this.writeInto(t), this.destroy(), t;
      }
      digest() {
        return this.digestInto(new Uint8Array(this.outputLen));
      }
      destroy() {
        (this.destroyed = !0), k(this.state);
      }
      _cloneInto(t) {
        let {
          blockLen: s,
          suffix: o,
          outputLen: i,
          rounds: r,
          enableXOF: e,
        } = this;
        return (
          t || (t = new n(s, o, i, e, r)),
          t.state32.set(this.state32),
          (t.pos = this.pos),
          (t.posOut = this.posOut),
          (t.finished = this.finished),
          (t.rounds = r),
          (t.suffix = o),
          (t.outputLen = i),
          (t.enableXOF = e),
          (t.destroyed = this.destroyed),
          t
        );
      }
    }),
      (V = (n, t, s) => B(() => new _(t, n, s))),
      (K = V(1, 136, 256 / 8));
  });
export { K as a, W as b };
