import {
  $ as Q,
  A as ir,
  Aa as ur,
  B as ze,
  E as sr,
  F as ar,
  Ga as fr,
  H as cr,
  I as H,
  J as He,
  M as Me,
  N as q,
  O as mr,
  P as pr,
  U as ke,
  V as Ge,
  W as Le,
  X as $e,
  Y as M,
  Z as Y,
  _ as qe,
  aa as ee,
  b as j,
  ba as re,
  c as U,
  ca as te,
  d as g,
  da as k,
  e as Ye,
  ea as oe,
  f as Qe,
  fa as ne,
  g as er,
  ga as ie,
  ha as _,
  i as J,
  ia as O,
  j as z,
  ja as W,
  ka as se,
  l as F,
  la as G,
  m as B,
  ma as ae,
  n as De,
  na as ce,
  o as $,
  oa as me,
  p as rr,
  pa as pe,
  q as D,
  qa as ue,
  r as S,
  ra as fe,
  s as tr,
  sa as de,
  t as or,
  ta as le,
  u as Ne,
  ua as xe,
  va as he,
  w as Z,
  wa as ye,
  x as X,
  xa as ge,
  ya as _e,
  z as nr,
} from "./chunk-R4OSUMHG.js";
import { a as Xe, b as Or } from "./chunk-RS4KDHKE.js";
import { a as f, b as v, d as Ze, l as y } from "./chunk-QE6IBIJD.js";
var dr = `Ethereum Signed Message:
`;
function lr(e) {
  let r =
      typeof e == "string" ? $(e) : typeof e.raw == "string" ? e.raw : B(e.raw),
    t = $(`${dr}${U(r)}`);
  return X([t, r]);
}
function Vr(e, r) {
  return S(lr(e), r);
}
var be = class extends g {
    constructor({ domain: r }) {
      super(`Invalid domain "${H(r)}".`, {
        metaMessages: ["Must be a valid EIP-712 domain."],
      });
    }
  },
  Ee = class extends g {
    constructor({ primaryType: r, types: t }) {
      super(
        `Invalid primary type \`${r}\` must be one of \`${JSON.stringify(
          Object.keys(t)
        )}\`.`,
        {
          docsPath: "/api/glossary/Errors#typeddatainvalidprimarytypeerror",
          metaMessages: ["Check that the primary type is a key in `types`."],
        }
      );
    }
  },
  Ie = class extends g {
    constructor({ type: r }) {
      super(`Struct type "${r}" is invalid.`, {
        metaMessages: ["Struct type must not be a Solidity type."],
        name: "InvalidStructTypeError",
      });
    }
  };
function xr(e) {
  let { domain: r, message: t, primaryType: o, types: n } = e,
    i = (s, a) => {
      for (let m of s) {
        let { name: l, type: u } = m,
          d = a[l],
          b = u.match(ir);
        if (b && (typeof d == "number" || typeof d == "bigint")) {
          let [x, E, w] = b;
          De(d, { signed: E === "int", size: Number.parseInt(w, 10) / 8 });
        }
        if (u === "address" && typeof d == "string" && !or(d))
          throw new er({ address: d });
        let p = u.match(nr);
        if (p) {
          let [x, E] = p;
          if (E && U(d) !== Number.parseInt(E, 10))
            throw new Qe({
              expectedSize: Number.parseInt(E, 10),
              givenSize: U(d),
            });
        }
        let c = n[u];
        c && (jr(u), i(c, d));
      }
    };
  if (n.EIP712Domain && r) {
    if (typeof r != "object") throw new be({ domain: r });
    i(n.EIP712Domain, r);
  }
  if (o !== "EIP712Domain")
    if (n[o]) i(n[o], t);
    else throw new Ee({ primaryType: o, types: n });
}
function hr({ domain: e }) {
  return [
    typeof e?.name == "string" && { name: "name", type: "string" },
    e?.version && { name: "version", type: "string" },
    (typeof e?.chainId == "number" || typeof e?.chainId == "bigint") && {
      name: "chainId",
      type: "uint256",
    },
    e?.verifyingContract && { name: "verifyingContract", type: "address" },
    e?.salt && { name: "salt", type: "bytes32" },
  ].filter(Boolean);
}
function jr(e) {
  if (
    e === "address" ||
    e === "bool" ||
    e === "string" ||
    e.startsWith("bytes") ||
    e.startsWith("uint") ||
    e.startsWith("int")
  )
    throw new Ie({ type: e });
}
function Wr(e) {
  let { domain: r = {}, message: t, primaryType: o } = e,
    n = f({ EIP712Domain: hr({ domain: r }) }, e.types);
  xr({ domain: r, message: t, primaryType: o, types: n });
  let i = ["0x1901"];
  return (
    r && i.push(yr({ domain: r, types: n })),
    o !== "EIP712Domain" && i.push(Oe({ data: t, primaryType: o, types: n })),
    S(X(i))
  );
}
function yr({ domain: e, types: r }) {
  return Oe({ data: e, primaryType: "EIP712Domain", types: r });
}
function Oe({ data: e, primaryType: r, types: t }) {
  let o = gr({ data: e, primaryType: r, types: t });
  return S(o);
}
function gr({ data: e, primaryType: r, types: t }) {
  let o = [{ type: "bytes32" }],
    n = [Kr({ primaryType: r, types: t })];
  for (let i of t[r]) {
    let [s, a] = Er({ types: t, name: i.name, type: i.type, value: e[i.name] });
    o.push(s), n.push(a);
  }
  return ze(o, n);
}
function Kr({ primaryType: e, types: r }) {
  let t = F(Jr({ primaryType: e, types: r }));
  return S(t);
}
function Jr({ primaryType: e, types: r }) {
  let t = "",
    o = br({ primaryType: e, types: r });
  o.delete(e);
  let n = [e, ...Array.from(o).sort()];
  for (let i of n)
    t += `${i}(${r[i].map(({ name: s, type: a }) => `${a} ${s}`).join(",")})`;
  return t;
}
function br({ primaryType: e, types: r }, t = new Set()) {
  let n = e.match(/^\w*/u)?.[0];
  if (t.has(n) || r[n] === void 0) return t;
  t.add(n);
  for (let i of r[n]) br({ primaryType: i.type, types: r }, t);
  return t;
}
function Er({ types: e, name: r, type: t, value: o }) {
  if (e[t] !== void 0)
    return [{ type: "bytes32" }, S(gr({ data: o, primaryType: t, types: e }))];
  if (t === "bytes")
    return (
      (o = `0x${(o.length % 2 ? "0" : "") + o.slice(2)}`),
      [{ type: "bytes32" }, S(o)]
    );
  if (t === "string") return [{ type: "bytes32" }, S(F(o))];
  if (t.lastIndexOf("]") === t.length - 1) {
    let n = t.slice(0, t.lastIndexOf("[")),
      i = o.map((s) => Er({ name: r, type: n, types: e, value: s }));
    return [
      { type: "bytes32" },
      S(
        ze(
          i.map(([s]) => s),
          i.map(([, s]) => s)
        )
      ),
    ];
  }
  return [{ type: t }, o];
}
var Zr = 3;
function jt(
  e,
  { abi: r, address: t, args: o, docsPath: n, functionName: i, sender: s }
) {
  let a =
      e instanceof $e
        ? e
        : e instanceof g
        ? e.walk((c) => "data" in c) || e.walk()
        : {},
    { code: m, data: l, details: u, message: d, shortMessage: b } = a,
    p =
      e instanceof Ye
        ? new Le({ functionName: i })
        : [Zr, k.code].includes(m) && (l || u || d || b)
        ? new Ge({
            abi: r,
            data: typeof l == "object" ? l.data : l,
            functionName: i,
            message: a instanceof Y ? u : b ?? d,
          })
        : e;
  return new ke(p, {
    abi: r,
    args: o,
    contractAddress: t,
    docsPath: n,
    functionName: i,
    sender: s,
  });
}
function Ir(e) {
  let r = S(`0x${e.substring(4)}`).substring(26);
  return Ne(`0x${r}`);
}
function Tr(t) {
  return y(this, arguments, function* ({ hash: e, signature: r }) {
    let o = j(e) ? e : F(e),
      { secp256k1: n } = yield import("./chunk-UIWPN6JS.js");
    return `0x${(() => {
      if (typeof r == "object" && "r" in r && "s" in r) {
        let { r: u, s: d, v: b, yParity: p } = r,
          c = Number(p ?? b),
          x = wr(c);
        return new n.Signature(J(u), J(d)).addRecoveryBit(x);
      }
      let a = j(r) ? r : F(r);
      if (U(a) !== 65) throw new Error("invalid signature length");
      let m = z(`0x${a.slice(130)}`),
        l = wr(m);
      return n.Signature.fromCompact(a.substring(2, 130)).addRecoveryBit(l);
    })()
      .recoverPublicKey(o.substring(2))
      .toHex(!1)}`;
  });
}
function wr(e) {
  if (e === 0 || e === 1) return e;
  if (e === 27) return 0;
  if (e === 28) return 1;
  throw new Error("Invalid yParityOrV value");
}
function io(t) {
  return y(this, arguments, function* ({ hash: e, signature: r }) {
    return Ir(yield Tr({ hash: e, signature: r }));
  });
}
function fo(e, r = "hex") {
  let t = vr(e),
    o = Z(new Uint8Array(t.length));
  return t.encode(o), r === "hex" ? B(o.bytes) : o.bytes;
}
function vr(e) {
  return Array.isArray(e) ? Xr(e.map((r) => vr(r))) : Yr(e);
}
function Xr(e) {
  let r = e.reduce((n, i) => n + i.length, 0),
    t = Br(r);
  return {
    length: r <= 55 ? 1 + r : 1 + t + r,
    encode(n) {
      r <= 55
        ? n.pushByte(192 + r)
        : (n.pushByte(247 + t),
          t === 1
            ? n.pushUint8(r)
            : t === 2
            ? n.pushUint16(r)
            : t === 3
            ? n.pushUint24(r)
            : n.pushUint32(r));
      for (let { encode: i } of e) i(n);
    },
  };
}
function Yr(e) {
  let r = typeof e == "string" ? D(e) : e,
    t = Br(r.length);
  return {
    length:
      r.length === 1 && r[0] < 128
        ? 1
        : r.length <= 55
        ? 1 + r.length
        : 1 + t + r.length,
    encode(n) {
      r.length === 1 && r[0] < 128
        ? n.pushBytes(r)
        : r.length <= 55
        ? (n.pushByte(128 + r.length), n.pushBytes(r))
        : (n.pushByte(183 + t),
          t === 1
            ? n.pushUint8(r.length)
            : t === 2
            ? n.pushUint16(r.length)
            : t === 3
            ? n.pushUint24(r.length)
            : n.pushUint32(r.length),
          n.pushBytes(r));
    },
  };
}
function Br(e) {
  if (e < 2 ** 8) return 1;
  if (e < 2 ** 16) return 2;
  if (e < 2 ** 24) return 3;
  if (e < 2 ** 32) return 4;
  throw new g("Length is too large.");
}
var Pr = class extends g {
  constructor(
    r,
    {
      account: t,
      docsPath: o,
      chain: n,
      data: i,
      gas: s,
      gasPrice: a,
      maxFeePerGas: m,
      maxPriorityFeePerGas: l,
      nonce: u,
      to: d,
      value: b,
    }
  ) {
    let p = mr({
      from: t?.address,
      to: d,
      value: typeof b < "u" && `${Me(b)} ${n?.nativeCurrency?.symbol || "ETH"}`,
      data: i,
      gas: s,
      gasPrice: typeof a < "u" && `${q(a)} gwei`,
      maxFeePerGas: typeof m < "u" && `${q(m)} gwei`,
      maxPriorityFeePerGas: typeof l < "u" && `${q(l)} gwei`,
      nonce: u,
    });
    super(r.shortMessage, {
      cause: r,
      docsPath: o,
      metaMessages: [
        ...(r.metaMessages ? [...r.metaMessages, " "] : []),
        "Estimate Gas Arguments:",
        p,
      ].filter(Boolean),
      name: "EstimateGasExecutionError",
    }),
      Object.defineProperty(this, "cause", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.cause = r);
  }
};
var Sr = class extends g {
    constructor() {
      super("`baseFeeMultiplier` must be greater than 1.", {
        name: "BaseFeeScalarError",
      });
    }
  },
  Cr = class extends g {
    constructor() {
      super("Chain does not support EIP-1559 fees.", {
        name: "Eip1559FeesNotSupportedError",
      });
    }
  },
  Rr = class extends g {
    constructor({ maxPriorityFeePerGas: r }) {
      super(
        `\`maxFeePerGas\` cannot be less than the \`maxPriorityFeePerGas\` (${q(
          r
        )} gwei).`,
        { name: "MaxFeePerGasTooLowError" }
      );
    }
  };
var Ar = class extends g {
  constructor({ blockHash: r, blockNumber: t }) {
    let o = "Block";
    r && (o = `Block at hash "${r}"`),
      t && (o = `Block at number "${t}"`),
      super(`${o} could not be found.`, { name: "BlockNotFoundError" });
  }
};
var Ve = {
  "0x0": "legacy",
  "0x1": "eip2930",
  "0x2": "eip1559",
  "0x3": "eip4844",
  "0x4": "eip7702",
};
function Ur(e) {
  let r = v(f({}, e), {
    blockHash: e.blockHash ? e.blockHash : null,
    blockNumber: e.blockNumber ? BigInt(e.blockNumber) : null,
    chainId: e.chainId ? z(e.chainId) : void 0,
    gas: e.gas ? BigInt(e.gas) : void 0,
    gasPrice: e.gasPrice ? BigInt(e.gasPrice) : void 0,
    maxFeePerBlobGas: e.maxFeePerBlobGas ? BigInt(e.maxFeePerBlobGas) : void 0,
    maxFeePerGas: e.maxFeePerGas ? BigInt(e.maxFeePerGas) : void 0,
    maxPriorityFeePerGas: e.maxPriorityFeePerGas
      ? BigInt(e.maxPriorityFeePerGas)
      : void 0,
    nonce: e.nonce ? z(e.nonce) : void 0,
    to: e.to ? e.to : null,
    transactionIndex: e.transactionIndex ? Number(e.transactionIndex) : null,
    type: e.type ? Ve[e.type] : void 0,
    typeHex: e.type ? e.type : void 0,
    value: e.value ? BigInt(e.value) : void 0,
    v: e.v ? BigInt(e.v) : void 0,
  });
  return (
    e.authorizationList && (r.authorizationList = Qr(e.authorizationList)),
    (r.yParity = (() => {
      if (e.yParity) return Number(e.yParity);
      if (typeof r.v == "bigint") {
        if (r.v === 0n || r.v === 27n) return 0;
        if (r.v === 1n || r.v === 28n) return 1;
        if (r.v >= 35n) return r.v % 2n === 0n ? 1 : 0;
      }
    })()),
    r.type === "legacy" &&
      (delete r.accessList,
      delete r.maxFeePerBlobGas,
      delete r.maxFeePerGas,
      delete r.maxPriorityFeePerGas,
      delete r.yParity),
    r.type === "eip2930" &&
      (delete r.maxFeePerBlobGas,
      delete r.maxFeePerGas,
      delete r.maxPriorityFeePerGas),
    r.type === "eip1559" && delete r.maxFeePerBlobGas,
    r
  );
}
function Qr(e) {
  return e.map((r) => ({
    address: r.address,
    chainId: Number(r.chainId),
    nonce: Number(r.nonce),
    r: r.r,
    s: r.s,
    yParity: Number(r.yParity),
  }));
}
function Ro(e) {
  let r = (e.transactions ?? []).map((t) => (typeof t == "string" ? t : Ur(t)));
  return v(f({}, e), {
    baseFeePerGas: e.baseFeePerGas ? BigInt(e.baseFeePerGas) : null,
    blobGasUsed: e.blobGasUsed ? BigInt(e.blobGasUsed) : void 0,
    difficulty: e.difficulty ? BigInt(e.difficulty) : void 0,
    excessBlobGas: e.excessBlobGas ? BigInt(e.excessBlobGas) : void 0,
    gasLimit: e.gasLimit ? BigInt(e.gasLimit) : void 0,
    gasUsed: e.gasUsed ? BigInt(e.gasUsed) : void 0,
    hash: e.hash ? e.hash : null,
    logsBloom: e.logsBloom ? e.logsBloom : null,
    nonce: e.nonce ? e.nonce : null,
    number: e.number ? BigInt(e.number) : null,
    size: e.size ? BigInt(e.size) : void 0,
    timestamp: e.timestamp ? BigInt(e.timestamp) : void 0,
    transactions: r,
    totalDifficulty: e.totalDifficulty ? BigInt(e.totalDifficulty) : null,
  });
}
function Fr(e) {
  let { kzg: r } = e,
    t = e.to ?? (typeof e.blobs[0] == "string" ? "hex" : "bytes"),
    o = typeof e.blobs[0] == "string" ? e.blobs.map((i) => D(i)) : e.blobs,
    n = [];
  for (let i of o) n.push(Uint8Array.from(r.blobToKzgCommitment(i)));
  return t === "bytes" ? n : n.map((i) => B(i));
}
function Dr(e) {
  let { kzg: r } = e,
    t = e.to ?? (typeof e.blobs[0] == "string" ? "hex" : "bytes"),
    o = typeof e.blobs[0] == "string" ? e.blobs.map((s) => D(s)) : e.blobs,
    n =
      typeof e.commitments[0] == "string"
        ? e.commitments.map((s) => D(s))
        : e.commitments,
    i = [];
  for (let s = 0; s < o.length; s++) {
    let a = o[s],
      m = n[s];
    i.push(Uint8Array.from(r.computeBlobKzgProof(a, m)));
  }
  return t === "bytes" ? i : i.map((s) => B(s));
}
Or();
function Nr(e, r) {
  let t = r || "hex",
    o = Xe(j(e, { strict: !1 }) ? rr(e) : e);
  return t === "bytes" ? o : F(o);
}
function zr(e) {
  let { commitment: r, version: t = 1 } = e,
    o = e.to ?? (typeof r == "string" ? "hex" : "bytes"),
    n = Nr(r, "bytes");
  return n.set([t], 0), o === "bytes" ? n : B(n);
}
function Wo(e) {
  let { commitments: r, version: t } = e,
    o = e.to ?? (typeof r[0] == "string" ? "hex" : "bytes"),
    n = [];
  for (let i of r) n.push(zr({ commitment: i, to: o, version: t }));
  return n;
}
var we = class extends g {
    constructor({ maxSize: r, size: t }) {
      super("Blob size is too large.", {
        metaMessages: [`Max: ${r} bytes`, `Given: ${t} bytes`],
        name: "BlobSizeTooLargeError",
      });
    }
  },
  Te = class extends g {
    constructor() {
      super("Blob data must not be empty.", { name: "EmptyBlobError" });
    }
  };
function Hr(e) {
  let r = e.to ?? (typeof e.data == "string" ? "hex" : "bytes"),
    t = typeof e.data == "string" ? D(e.data) : e.data,
    o = U(t);
  if (!o) throw new Te();
  if (o > 761855) throw new we({ maxSize: 761855, size: o });
  let n = [],
    i = !0,
    s = 0;
  for (; i; ) {
    let a = Z(new Uint8Array(131072)),
      m = 0;
    for (; m < 4096; ) {
      let l = t.slice(s, s + 31);
      if ((a.pushByte(0), a.pushBytes(l), l.length < 31)) {
        a.pushByte(128), (i = !1);
        break;
      }
      m++, (s += 31);
    }
    n.push(a);
  }
  return r === "bytes" ? n.map((a) => a.bytes) : n.map((a) => B(a.bytes));
}
function pn(e) {
  let { data: r, kzg: t, to: o } = e,
    n = e.blobs ?? Hr({ data: r, to: o }),
    i = e.commitments ?? Fr({ blobs: n, kzg: t, to: o }),
    s = e.proofs ?? Dr({ blobs: n, commitments: i, kzg: t, to: o }),
    a = [];
  for (let m = 0; m < n.length; m++)
    a.push({ blob: n[m], commitment: i[m], proof: s[m] });
  return a;
}
function dn(e) {
  if (e.type) return e.type;
  if (typeof e.authorizationList < "u") return "eip7702";
  if (
    typeof e.blobs < "u" ||
    typeof e.blobVersionedHashes < "u" ||
    typeof e.maxFeePerBlobGas < "u" ||
    typeof e.sidecars < "u"
  )
    return "eip4844";
  if (typeof e.maxFeePerGas < "u" || typeof e.maxPriorityFeePerGas < "u")
    return "eip1559";
  if (typeof e.gasPrice < "u")
    return typeof e.accessList < "u" ? "eip2930" : "legacy";
  throw new pr({ transaction: e });
}
function Mr(e, { args: r, eventName: t } = {}) {
  return f(
    v(f({}, e), {
      blockHash: e.blockHash ? e.blockHash : null,
      blockNumber: e.blockNumber ? BigInt(e.blockNumber) : null,
      logIndex: e.logIndex ? Number(e.logIndex) : null,
      transactionHash: e.transactionHash ? e.transactionHash : null,
      transactionIndex: e.transactionIndex ? Number(e.transactionIndex) : null,
    }),
    t ? { args: r, eventName: t } : {}
  );
}
function ve(e) {
  return y(this, null, function* () {
    return new Promise((r) => setTimeout(r, e));
  });
}
var rt = new Map(),
  tt = new Map();
function ot(e) {
  let r = (n, i) => ({
      clear: () => i.delete(n),
      get: () => i.get(n),
      set: (s) => i.set(n, s),
    }),
    t = r(e, rt),
    o = r(e, tt);
  return {
    clear: () => {
      t.clear(), o.clear();
    },
    promise: t,
    response: o,
  };
}
function bn(o, n) {
  return y(
    this,
    arguments,
    function* (e, { cacheKey: r, cacheTime: t = Number.POSITIVE_INFINITY }) {
      let i = ot(r),
        s = i.response.get();
      if (s && t > 0 && Date.now() - s.created.getTime() < t) return s.data;
      let a = i.promise.get();
      a || ((a = e()), i.promise.set(a));
      try {
        let m = yield a;
        return i.response.set({ created: new Date(), data: m }), m;
      } finally {
        i.promise.clear();
      }
    }
  );
}
function Tn({ chain: e, currentChainId: r }) {
  if (!e) throw new ar();
  if (r !== e.id) throw new sr({ chain: e, currentChainId: r });
}
function je(
  e,
  { delay: r = 100, retryCount: t = 2, shouldRetry: o = () => !0 } = {}
) {
  return new Promise((n, i) => {
    let s = (...m) =>
      y(this, [...m], function* ({ count: a = 0 } = {}) {
        let l = (d) =>
          y(this, [d], function* ({ error: u }) {
            let b = typeof r == "function" ? r({ count: a, error: u }) : r;
            b && (yield ve(b)), s({ count: a + 1 });
          });
        try {
          let u = yield e();
          n(u);
        } catch (u) {
          if (a < t && (yield o({ count: a, error: u })))
            return l({ error: u });
          i(u);
        }
      });
    s();
  });
}
var nt = { "0x0": "reverted", "0x1": "success" };
function Un(e) {
  let r = v(f({}, e), {
    blockNumber: e.blockNumber ? BigInt(e.blockNumber) : null,
    contractAddress: e.contractAddress ? e.contractAddress : null,
    cumulativeGasUsed: e.cumulativeGasUsed ? BigInt(e.cumulativeGasUsed) : null,
    effectiveGasPrice: e.effectiveGasPrice ? BigInt(e.effectiveGasPrice) : null,
    gasUsed: e.gasUsed ? BigInt(e.gasUsed) : null,
    logs: e.logs ? e.logs.map((t) => Mr(t)) : null,
    to: e.to ? e.to : null,
    transactionIndex: e.transactionIndex ? z(e.transactionIndex) : null,
    status: e.status ? nt[e.status] : null,
    type: e.type ? Ve[e.type] || e.type : null,
  });
  return (
    e.blobGasPrice && (r.blobGasPrice = BigInt(e.blobGasPrice)),
    e.blobGasUsed && (r.blobGasUsed = BigInt(e.blobGasUsed)),
    r
  );
}
var Be = 256,
  Pe;
function Se(e = 11) {
  if (!Pe || Be + e > 256 * 2) {
    (Pe = ""), (Be = 0);
    for (let r = 0; r < 256; r++)
      Pe += ((256 + Math.random() * 256) | 0).toString(16).substring(1);
  }
  return Pe.substring(Be, Be++ + e);
}
function it(e) {
  let {
      batch: r,
      chain: t,
      ccipRead: o,
      key: n = "base",
      name: i = "Base Client",
      type: s = "base",
    } = e,
    a =
      e.experimental_blockTag ??
      (typeof t?.experimental_preconfirmationTime == "number"
        ? "pending"
        : void 0),
    m = t?.blockTime ?? 12e3,
    l = Math.min(Math.max(Math.floor(m / 2), 500), 4e3),
    u = e.pollingInterval ?? l,
    d = e.cacheTime ?? u,
    b = e.account ? cr(e.account) : void 0,
    {
      config: p,
      request: c,
      value: x,
    } = e.transport({ chain: t, pollingInterval: u }),
    E = f(f({}, p), x),
    w = f(
      {
        account: b,
        batch: r,
        cacheTime: d,
        ccipRead: o,
        chain: t,
        key: n,
        name: i,
        pollingInterval: u,
        request: c,
        transport: E,
        type: s,
        uid: Se(),
      },
      a ? { experimental_blockTag: a } : {}
    );
  function h(I) {
    return (A) => {
      let C = A(I);
      for (let P in w) delete C[P];
      let T = f(f({}, I), C);
      return Object.assign(T, { extend: h(T) });
    };
  }
  return Object.assign(w, { extend: h(w) });
}
var Ce = new tr(8192);
function kr(e, { enabled: r = !0, id: t }) {
  if (!r || !t) return e();
  if (Ce.get(t)) return Ce.get(t);
  let o = e().finally(() => Ce.delete(t));
  return Ce.set(t, o), o;
}
function Gr(e, r = {}) {
  return (n, ...i) =>
    y(this, [n, ...i], function* (t, o = {}) {
      let {
          dedupe: s = !1,
          methods: a,
          retryDelay: m = 150,
          retryCount: l = 3,
          uid: u,
        } = f(f({}, r), o),
        { method: d } = t;
      if (a?.exclude?.includes(d))
        throw new O(new Error("method not supported"), { method: d });
      if (a?.include && !a.include.includes(d))
        throw new O(new Error("method not supported"), { method: d });
      let b = s ? $(`${u}.${H(t)}`) : void 0;
      return kr(
        () =>
          je(
            () =>
              y(this, null, function* () {
                try {
                  return yield e(t);
                } catch (p) {
                  let c = p;
                  switch (c.code) {
                    case Q.code:
                      throw new Q(c);
                    case ee.code:
                      throw new ee(c);
                    case re.code:
                      throw new re(c, { method: t.method });
                    case te.code:
                      throw new te(c);
                    case k.code:
                      throw new k(c);
                    case oe.code:
                      throw new oe(c);
                    case ne.code:
                      throw new ne(c);
                    case ie.code:
                      throw new ie(c);
                    case _.code:
                      throw new _(c);
                    case O.code:
                      throw new O(c, { method: t.method });
                    case W.code:
                      throw new W(c);
                    case se.code:
                      throw new se(c);
                    case G.code:
                      throw new G(c);
                    case ae.code:
                      throw new ae(c);
                    case ce.code:
                      throw new ce(c);
                    case me.code:
                      throw new me(c);
                    case pe.code:
                      throw new pe(c);
                    case ue.code:
                      throw new ue(c);
                    case fe.code:
                      throw new fe(c);
                    case de.code:
                      throw new de(c);
                    case le.code:
                      throw new le(c);
                    case xe.code:
                      throw new xe(c);
                    case he.code:
                      throw new he(c);
                    case ye.code:
                      throw new ye(c);
                    case ge.code:
                      throw new ge(c);
                    case 5e3:
                      throw new G(c);
                    default:
                      throw p instanceof g ? p : new _e(c);
                  }
                }
              }),
            {
              delay: ({ count: p, error: c }) => {
                if (c && c instanceof M) {
                  let x = c?.headers?.get("Retry-After");
                  if (x?.match(/\d/)) return Number.parseInt(x, 10) * 1e3;
                }
                return ~~(1 << p) * m;
              },
              retryCount: l,
              shouldRetry: ({ error: p }) => st(p),
            }
          ),
        { enabled: s, id: b }
      );
    });
}
function st(e) {
  return "code" in e && typeof e.code == "number"
    ? e.code === -1 || e.code === W.code || e.code === k.code
    : e instanceof M && e.status
    ? e.status === 403 ||
      e.status === 408 ||
      e.status === 413 ||
      e.status === 429 ||
      e.status === 500 ||
      e.status === 502 ||
      e.status === 503 ||
      e.status === 504
    : !0;
}
function Zn(e) {
  return f({ formatters: void 0, fees: void 0, serializers: void 0 }, e);
}
function We(
  e,
  { errorInstance: r = new Error("timed out"), timeout: t, signal: o }
) {
  return new Promise((n, i) => {
    y(this, null, function* () {
      let s;
      try {
        let a = new AbortController();
        t > 0 &&
          (s = setTimeout(() => {
            o ? a.abort() : i(r);
          }, t)),
          n(yield e({ signal: a?.signal || null }));
      } catch (a) {
        a?.name === "AbortError" && i(r), i(a);
      } finally {
        clearTimeout(s);
      }
    });
  });
}
function at() {
  return {
    current: 0,
    take() {
      return this.current++;
    },
    reset() {
      this.current = 0;
    },
  };
}
var Ke = at();
function Lr(e, r = {}) {
  return {
    request(o) {
      return y(this, null, function* () {
        let {
            body: n,
            fetchFn: i = r.fetchFn ?? fetch,
            onRequest: s = r.onRequest,
            onResponse: a = r.onResponse,
            timeout: m = r.timeout ?? 1e4,
          } = o,
          l = f(f({}, r.fetchOptions ?? {}), o.fetchOptions ?? {}),
          { headers: u, method: d, signal: b } = l;
        try {
          let p = yield We(
            (E) =>
              y(this, [E], function* ({ signal: x }) {
                let w = v(f({}, l), {
                    body: Array.isArray(n)
                      ? H(
                          n.map((C) =>
                            f({ jsonrpc: "2.0", id: C.id ?? Ke.take() }, C)
                          )
                        )
                      : H(f({ jsonrpc: "2.0", id: n.id ?? Ke.take() }, n)),
                    headers: f({ "Content-Type": "application/json" }, u),
                    method: d || "POST",
                    signal: b || (m > 0 ? x : null),
                  }),
                  h = new Request(e, w),
                  I = (yield s?.(h, w)) ?? v(f({}, w), { url: e });
                return yield i(I.url ?? e, I);
              }),
            {
              errorInstance: new qe({ body: n, url: e }),
              timeout: m,
              signal: !0,
            }
          );
          a && (yield a(p));
          let c;
          if (p.headers.get("Content-Type")?.startsWith("application/json"))
            c = yield p.json();
          else {
            c = yield p.text();
            try {
              c = JSON.parse(c || "{}");
            } catch (x) {
              if (p.ok) throw x;
              c = { error: c };
            }
          }
          if (!p.ok)
            throw new M({
              body: n,
              details: H(c.error) || p.statusText,
              headers: p.headers,
              status: p.status,
              url: e,
            });
          return c;
        } catch (p) {
          throw p instanceof M || p instanceof qe
            ? p
            : new M({ body: n, cause: p, url: e });
        }
      });
    },
  };
}
var Re = class extends g {
  constructor({ value: r }) {
    super(`Number \`${r}\` is not a valid decimal number.`, {
      name: "InvalidDecimalNumberError",
    });
  }
};
function $r(e, r) {
  if (!/^(-?)([0-9]*)\.?([0-9]*)$/.test(e)) throw new Re({ value: e });
  let [t, o = "0"] = e.split("."),
    n = t.startsWith("-");
  if ((n && (t = t.slice(1)), (o = o.replace(/(0+)$/, "")), r === 0))
    Math.round(+`.${o}`) === 1 && (t = `${BigInt(t) + 1n}`), (o = "");
  else if (o.length > r) {
    let [i, s, a] = [o.slice(0, r - 1), o.slice(r - 1, r), o.slice(r)],
      m = Math.round(+`${s}.${a}`);
    m > 9
      ? (o = `${BigInt(i) + BigInt(1)}0`.padStart(i.length + 1, "0"))
      : (o = `${i}${m}`),
      o.length > r && ((o = o.slice(1)), (t = `${BigInt(t) + 1n}`)),
      (o = o.slice(0, r));
  } else o = o.padEnd(r, "0");
  return BigInt(`${n ? "-" : ""}${t}${o}`);
}
function ct(e, r = "wei") {
  return $r(e, He[r]);
}
function V(
  {
    key: e,
    methods: r,
    name: t,
    request: o,
    retryCount: n = 3,
    retryDelay: i = 150,
    timeout: s,
    type: a,
  },
  m
) {
  let l = Se();
  return {
    config: {
      key: e,
      methods: r,
      name: t,
      request: o,
      retryCount: n,
      retryDelay: i,
      timeout: s,
      type: a,
    },
    request: Gr(o, { methods: r, retryCount: n, retryDelay: i, uid: l }),
    value: m,
  };
}
function mt(e, r = {}) {
  let {
    key: t = "custom",
    methods: o,
    name: n = "Custom Provider",
    retryDelay: i,
  } = r;
  return ({ retryCount: s }) =>
    V({
      key: t,
      methods: o,
      name: n,
      request: e.request.bind(e),
      retryCount: r.retryCount ?? s,
      retryDelay: i,
      type: "custom",
    });
}
function pt(e, r = {}) {
  let {
    key: t = "fallback",
    name: o = "Fallback",
    rank: n = !1,
    shouldThrow: i = qr,
    retryCount: s,
    retryDelay: a,
  } = r;
  return (b) => {
    var p = b,
      { chain: m, pollingInterval: l = 4e3, timeout: u } = p,
      d = Ze(p, ["chain", "pollingInterval", "timeout"]);
    let c = e,
      x = () => {},
      E = V(
        {
          key: t,
          name: o,
          request(A) {
            return y(this, arguments, function* ({ method: h, params: I }) {
              let C,
                T = (P = 0) =>
                  y(this, null, function* () {
                    let Ue = c[P](
                      v(f({}, d), { chain: m, retryCount: 0, timeout: u })
                    );
                    try {
                      let R = yield Ue.request({ method: h, params: I });
                      return (
                        x({
                          method: h,
                          params: I,
                          response: R,
                          transport: Ue,
                          status: "success",
                        }),
                        R
                      );
                    } catch (R) {
                      if (
                        (x({
                          error: R,
                          method: h,
                          params: I,
                          transport: Ue,
                          status: "error",
                        }),
                        i(R) ||
                          P === c.length - 1 ||
                          ((C ??= c.slice(P + 1).some((Fe) => {
                            let { include: K, exclude: L } =
                              Fe({ chain: m }).config.methods || {};
                            return K ? K.includes(h) : L ? !L.includes(h) : !0;
                          })),
                          !C))
                      )
                        throw R;
                      return T(P + 1);
                    }
                  });
              return T();
            });
          },
          retryCount: s,
          retryDelay: a,
          type: "fallback",
        },
        {
          onResponse: (h) => (x = h),
          transports: c.map((h) => h({ chain: m, retryCount: 0 })),
        }
      );
    if (n) {
      let h = typeof n == "object" ? n : {};
      ut({
        chain: m,
        interval: h.interval ?? l,
        onTransports: (I) => (c = I),
        ping: h.ping,
        sampleCount: h.sampleCount,
        timeout: h.timeout,
        transports: c,
        weights: h.weights,
      });
    }
    return E;
  };
}
function qr(e) {
  return !!(
    "code" in e &&
    typeof e.code == "number" &&
    (e.code === _.code ||
      e.code === G.code ||
      ur.nodeMessage.test(e.message) ||
      e.code === 5e3)
  );
}
function ut({
  chain: e,
  interval: r = 4e3,
  onTransports: t,
  ping: o,
  sampleCount: n = 10,
  timeout: i = 1e3,
  transports: s,
  weights: a = {},
}) {
  let { stability: m = 0.7, latency: l = 0.3 } = a,
    u = [],
    d = () =>
      y(this, null, function* () {
        let b = yield Promise.all(
          s.map((x) =>
            y(this, null, function* () {
              let E = x({ chain: e, retryCount: 0, timeout: i }),
                w = Date.now(),
                h,
                I;
              try {
                yield o
                  ? o({ transport: E })
                  : E.request({ method: "net_listening" }),
                  (I = 1);
              } catch {
                I = 0;
              } finally {
                h = Date.now();
              }
              return { latency: h - w, success: I };
            })
          )
        );
        u.push(b), u.length > n && u.shift();
        let p = Math.max(
            ...u.map((x) => Math.max(...x.map(({ latency: E }) => E)))
          ),
          c = s
            .map((x, E) => {
              let w = u.map((T) => T[E].latency),
                I = 1 - w.reduce((T, P) => T + P, 0) / w.length / p,
                A = u.map((T) => T[E].success),
                C = A.reduce((T, P) => T + P, 0) / A.length;
              return C === 0 ? [0, E] : [l * I + m * C, E];
            })
            .sort((x, E) => E[0] - x[0]);
        t(c.map(([, x]) => s[x])), yield ve(r), d();
      });
  d();
}
var Ae = class extends g {
  constructor() {
    super(
      "No URL was provided to the Transport. Please provide a valid RPC URL to the Transport.",
      { docsPath: "/docs/clients/intro", name: "UrlRequiredError" }
    );
  }
};
function ft(e, r = {}) {
  let {
    batch: t,
    fetchFn: o,
    fetchOptions: n,
    key: i = "http",
    methods: s,
    name: a = "HTTP JSON-RPC",
    onFetchRequest: m,
    onFetchResponse: l,
    retryDelay: u,
    raw: d,
  } = r;
  return ({ chain: b, retryCount: p, timeout: c }) => {
    let { batchSize: x = 1e3, wait: E = 0 } = typeof t == "object" ? t : {},
      w = r.retryCount ?? p,
      h = c ?? r.timeout ?? 1e4,
      I = e || b?.rpcUrls.default.http[0];
    if (!I) throw new Ae();
    let A = Lr(I, {
      fetchFn: o,
      fetchOptions: n,
      onRequest: m,
      onResponse: l,
      timeout: h,
    });
    return V(
      {
        key: i,
        methods: s,
        name: a,
        request(Ue) {
          return y(this, arguments, function* ({ method: T, params: P }) {
            let R = { method: T, params: P },
              { schedule: Fe } = fr({
                id: I,
                wait: E,
                shouldSplitBatch(N) {
                  return N.length > x;
                },
                fn: (N) => A.request({ body: N }),
                sort: (N, _r) => N.id - _r.id,
              }),
              K = (N) =>
                y(this, null, function* () {
                  return t ? Fe(N) : [yield A.request({ body: N })];
                }),
              [{ error: L, result: Je }] = yield K(R);
            if (d) return { error: L, result: Je };
            if (L) throw new Y({ body: R, error: L, url: I });
            return Je;
          });
        },
        retryCount: w,
        retryDelay: u,
        timeout: h,
        type: "http",
      },
      { fetchOptions: n, url: I }
    );
  };
}
export {
  jt as a,
  io as b,
  fo as c,
  Pr as d,
  Sr as e,
  Cr as f,
  Rr as g,
  Ar as h,
  Ur as i,
  Ro as j,
  Fr as k,
  Dr as l,
  Wo as m,
  pn as n,
  dn as o,
  bn as p,
  ve as q,
  je as r,
  Tn as s,
  Zn as t,
  Un as u,
  We as v,
  Vr as w,
  Wr as x,
  ct as y,
  it as z,
  mt as A,
  pt as B,
  ft as C,
};
