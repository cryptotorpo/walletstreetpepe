import { a as Qn, b as Wo } from "./chunk-LF4CW3EE.js";
import { a as m, b as v, d as G, l as T } from "./chunk-QE6IBIJD.js";
var er = "1.1.0";
var w = class e extends Error {
  constructor(t, n = {}) {
    let r =
        n.cause instanceof e
          ? n.cause.details
          : n.cause?.message
          ? n.cause.message
          : n.details,
      o = (n.cause instanceof e && n.cause.docsPath) || n.docsPath,
      s = [
        t || "An error occurred.",
        "",
        ...(n.metaMessages ? [...n.metaMessages, ""] : []),
        ...(o ? [`Docs: https://abitype.dev${o}`] : []),
        ...(r ? [`Details: ${r}`] : []),
        `Version: abitype@${er}`,
      ].join(`
`);
    super(s),
      Object.defineProperty(this, "details", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "docsPath", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "metaMessages", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "shortMessage", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiTypeError",
      }),
      n.cause && (this.cause = n.cause),
      (this.details = r),
      (this.docsPath = o),
      (this.metaMessages = n.metaMessages),
      (this.shortMessage = t);
  }
};
function S(e, t) {
  return e.exec(t)?.groups;
}
var Vt = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/,
  Wt =
    /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/,
  Ge = /^\(.+?\).*?$/;
var tr = /^tuple(?<array>(\[(\d*)\])*)$/;
function Ve(e) {
  let t = e.type;
  if (tr.test(e.type) && "components" in e) {
    t = "(";
    let n = e.components.length;
    for (let o = 0; o < n; o++) {
      let s = e.components[o];
      (t += Ve(s)), o < n - 1 && (t += ", ");
    }
    let r = S(tr, e.type);
    return (t += `)${r?.array ?? ""}`), Ve(v(m({}, e), { type: t }));
  }
  return (
    "indexed" in e && e.indexed && (t = `${t} indexed`),
    e.name ? `${t} ${e.name}` : t
  );
}
function ue(e) {
  let t = "",
    n = e.length;
  for (let r = 0; r < n; r++) {
    let o = e[r];
    (t += Ve(o)), r !== n - 1 && (t += ", ");
  }
  return t;
}
function qt(e) {
  return e.type === "function"
    ? `function ${e.name}(${ue(e.inputs)})${
        e.stateMutability && e.stateMutability !== "nonpayable"
          ? ` ${e.stateMutability}`
          : ""
      }${e.outputs?.length ? ` returns (${ue(e.outputs)})` : ""}`
    : e.type === "event"
    ? `event ${e.name}(${ue(e.inputs)})`
    : e.type === "error"
    ? `error ${e.name}(${ue(e.inputs)})`
    : e.type === "constructor"
    ? `constructor(${ue(e.inputs)})${
        e.stateMutability === "payable" ? " payable" : ""
      }`
    : e.type === "fallback"
    ? `fallback() external${e.stateMutability === "payable" ? " payable" : ""}`
    : "receive() external payable";
}
var nr = /^error (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
function rr(e) {
  return nr.test(e);
}
function or(e) {
  return S(nr, e);
}
var sr = /^event (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
function ir(e) {
  return sr.test(e);
}
function ar(e) {
  return S(sr, e);
}
var ur =
  /^function (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)(?: (?<scope>external|public{1}))?(?: (?<stateMutability>pure|view|nonpayable|payable{1}))?(?: returns\s?\((?<returns>.*?)\))?$/;
function cr(e) {
  return ur.test(e);
}
function fr(e) {
  return S(ur, e);
}
var pr = /^struct (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*) \{(?<properties>.*?)\}$/;
function We(e) {
  return pr.test(e);
}
function dr(e) {
  return S(pr, e);
}
var lr =
  /^constructor\((?<parameters>.*?)\)(?:\s(?<stateMutability>payable{1}))?$/;
function mr(e) {
  return lr.test(e);
}
function br(e) {
  return S(lr, e);
}
var yr = /^fallback\(\) external(?:\s(?<stateMutability>payable{1}))?$/;
function hr(e) {
  return yr.test(e);
}
function xr(e) {
  return S(yr, e);
}
var qo = /^receive\(\) external payable$/;
function gr(e) {
  return qo.test(e);
}
var wr = new Set(["indexed"]),
  qe = new Set(["calldata", "memory", "storage"]);
var _e = class extends w {
    constructor({ type: t }) {
      super("Unknown type.", {
        metaMessages: [
          `Type "${t}" is not a valid ABI type. Perhaps you forgot to include a struct signature?`,
        ],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "UnknownTypeError",
        });
    }
  },
  Ze = class extends w {
    constructor({ type: t }) {
      super("Unknown type.", {
        metaMessages: [`Type "${t}" is not a valid ABI type.`],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "UnknownSolidityTypeError",
        });
    }
  };
var Je = class extends w {
    constructor({ param: t }) {
      super("Invalid ABI parameter.", { details: t }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "InvalidParameterError",
        });
    }
  },
  Ke = class extends w {
    constructor({ param: t, name: n }) {
      super("Invalid ABI parameter.", {
        details: t,
        metaMessages: [
          `"${n}" is a protected Solidity keyword. More info: https://docs.soliditylang.org/en/latest/cheatsheet.html`,
        ],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "SolidityProtectedKeywordError",
        });
    }
  },
  Ye = class extends w {
    constructor({ param: t, type: n, modifier: r }) {
      super("Invalid ABI parameter.", {
        details: t,
        metaMessages: [
          `Modifier "${r}" not allowed${n ? ` in "${n}" type` : ""}.`,
        ],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "InvalidModifierError",
        });
    }
  },
  Xe = class extends w {
    constructor({ param: t, type: n, modifier: r }) {
      super("Invalid ABI parameter.", {
        details: t,
        metaMessages: [
          `Modifier "${r}" not allowed${n ? ` in "${n}" type` : ""}.`,
          `Data location can only be specified for array, struct, or mapping types, but "${r}" was given.`,
        ],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "InvalidFunctionModifierError",
        });
    }
  },
  Qe = class extends w {
    constructor({ abiParameter: t }) {
      super("Invalid ABI parameter.", {
        details: JSON.stringify(t, null, 2),
        metaMessages: ["ABI parameter type is invalid."],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "InvalidAbiTypeParameterError",
        });
    }
  };
var F = class extends w {
    constructor({ signature: t, type: n }) {
      super(`Invalid ${n} signature.`, { details: t }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "InvalidSignatureError",
        });
    }
  },
  et = class extends w {
    constructor({ signature: t }) {
      super("Unknown signature.", { details: t }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "UnknownSignatureError",
        });
    }
  },
  tt = class extends w {
    constructor({ signature: t }) {
      super("Invalid struct signature.", {
        details: t,
        metaMessages: ["No properties exist."],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "InvalidStructSignatureError",
        });
    }
  };
var nt = class extends w {
  constructor({ type: t }) {
    super("Circular reference detected.", {
      metaMessages: [`Struct "${t}" is a circular reference.`],
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "CircularReferenceError",
      });
  }
};
var rt = class extends w {
  constructor({ current: t, depth: n }) {
    super("Unbalanced parentheses.", {
      metaMessages: [
        `"${t.trim()}" has too many ${
          n > 0 ? "opening" : "closing"
        } parentheses.`,
      ],
      details: `Depth "${n}"`,
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "InvalidParenthesisError",
      });
  }
};
function vr(e, t, n) {
  let r = "";
  if (n)
    for (let o of Object.entries(n)) {
      if (!o) continue;
      let s = "";
      for (let i of o[1]) s += `[${i.type}${i.name ? `:${i.name}` : ""}]`;
      r += `(${o[0]}{${s}})`;
    }
  return t ? `${t}:${e}${r}` : e;
}
var ot = new Map([
  ["address", { type: "address" }],
  ["bool", { type: "bool" }],
  ["bytes", { type: "bytes" }],
  ["bytes32", { type: "bytes32" }],
  ["int", { type: "int256" }],
  ["int256", { type: "int256" }],
  ["string", { type: "string" }],
  ["uint", { type: "uint256" }],
  ["uint8", { type: "uint8" }],
  ["uint16", { type: "uint16" }],
  ["uint24", { type: "uint24" }],
  ["uint32", { type: "uint32" }],
  ["uint64", { type: "uint64" }],
  ["uint96", { type: "uint96" }],
  ["uint112", { type: "uint112" }],
  ["uint160", { type: "uint160" }],
  ["uint192", { type: "uint192" }],
  ["uint256", { type: "uint256" }],
  ["address owner", { type: "address", name: "owner" }],
  ["address to", { type: "address", name: "to" }],
  ["bool approved", { type: "bool", name: "approved" }],
  ["bytes _data", { type: "bytes", name: "_data" }],
  ["bytes data", { type: "bytes", name: "data" }],
  ["bytes signature", { type: "bytes", name: "signature" }],
  ["bytes32 hash", { type: "bytes32", name: "hash" }],
  ["bytes32 r", { type: "bytes32", name: "r" }],
  ["bytes32 root", { type: "bytes32", name: "root" }],
  ["bytes32 s", { type: "bytes32", name: "s" }],
  ["string name", { type: "string", name: "name" }],
  ["string symbol", { type: "string", name: "symbol" }],
  ["string tokenURI", { type: "string", name: "tokenURI" }],
  ["uint tokenId", { type: "uint256", name: "tokenId" }],
  ["uint8 v", { type: "uint8", name: "v" }],
  ["uint256 balance", { type: "uint256", name: "balance" }],
  ["uint256 tokenId", { type: "uint256", name: "tokenId" }],
  ["uint256 value", { type: "uint256", name: "value" }],
  [
    "event:address indexed from",
    { type: "address", name: "from", indexed: !0 },
  ],
  ["event:address indexed to", { type: "address", name: "to", indexed: !0 }],
  [
    "event:uint indexed tokenId",
    { type: "uint256", name: "tokenId", indexed: !0 },
  ],
  [
    "event:uint256 indexed tokenId",
    { type: "uint256", name: "tokenId", indexed: !0 },
  ],
]);
function $r(e, t = {}) {
  if (cr(e)) return _o(e, t);
  if (ir(e)) return Zo(e, t);
  if (rr(e)) return Jo(e, t);
  if (mr(e)) return Ko(e, t);
  if (hr(e)) return Yo(e);
  if (gr(e)) return { type: "receive", stateMutability: "payable" };
  throw new et({ signature: e });
}
function _o(e, t = {}) {
  let n = fr(e);
  if (!n) throw new F({ signature: e, type: "function" });
  let r = z(n.parameters),
    o = [],
    s = r.length;
  for (let a = 0; a < s; a++)
    o.push(K(r[a], { modifiers: qe, structs: t, type: "function" }));
  let i = [];
  if (n.returns) {
    let a = z(n.returns),
      u = a.length;
    for (let f = 0; f < u; f++)
      i.push(K(a[f], { modifiers: qe, structs: t, type: "function" }));
  }
  return {
    name: n.name,
    type: "function",
    stateMutability: n.stateMutability ?? "nonpayable",
    inputs: o,
    outputs: i,
  };
}
function Zo(e, t = {}) {
  let n = ar(e);
  if (!n) throw new F({ signature: e, type: "event" });
  let r = z(n.parameters),
    o = [],
    s = r.length;
  for (let i = 0; i < s; i++)
    o.push(K(r[i], { modifiers: wr, structs: t, type: "event" }));
  return { name: n.name, type: "event", inputs: o };
}
function Jo(e, t = {}) {
  let n = or(e);
  if (!n) throw new F({ signature: e, type: "error" });
  let r = z(n.parameters),
    o = [],
    s = r.length;
  for (let i = 0; i < s; i++) o.push(K(r[i], { structs: t, type: "error" }));
  return { name: n.name, type: "error", inputs: o };
}
function Ko(e, t = {}) {
  let n = br(e);
  if (!n) throw new F({ signature: e, type: "constructor" });
  let r = z(n.parameters),
    o = [],
    s = r.length;
  for (let i = 0; i < s; i++)
    o.push(K(r[i], { structs: t, type: "constructor" }));
  return {
    type: "constructor",
    stateMutability: n.stateMutability ?? "nonpayable",
    inputs: o,
  };
}
function Yo(e) {
  let t = xr(e);
  if (!t) throw new F({ signature: e, type: "fallback" });
  return {
    type: "fallback",
    stateMutability: t.stateMutability ?? "nonpayable",
  };
}
var Xo =
    /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*(?:\spayable)?)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/,
  Qo =
    /^\((?<type>.+?)\)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/,
  es = /^u?int$/;
function K(e, t) {
  let n = vr(e, t?.type, t?.structs);
  if (ot.has(n)) return ot.get(n);
  let r = Ge.test(e),
    o = S(r ? Qo : Xo, e);
  if (!o) throw new Je({ param: e });
  if (o.name && ns(o.name)) throw new Ke({ param: e, name: o.name });
  let s = o.name ? { name: o.name } : {},
    i = o.modifier === "indexed" ? { indexed: !0 } : {},
    a = t?.structs ?? {},
    u,
    f = {};
  if (r) {
    u = "tuple";
    let p = z(o.type),
      b = [],
      l = p.length;
    for (let y = 0; y < l; y++) b.push(K(p[y], { structs: a }));
    f = { components: b };
  } else if (o.type in a) (u = "tuple"), (f = { components: a[o.type] });
  else if (es.test(o.type)) u = `${o.type}256`;
  else if (o.type === "address payable") u = "address";
  else if (((u = o.type), t?.type !== "struct" && !_t(u)))
    throw new Ze({ type: u });
  if (o.modifier) {
    if (!t?.modifiers?.has?.(o.modifier))
      throw new Ye({ param: e, type: t?.type, modifier: o.modifier });
    if (qe.has(o.modifier) && !rs(u, !!o.array))
      throw new Xe({ param: e, type: t?.type, modifier: o.modifier });
  }
  let d = m(m(m({ type: `${u}${o.array ?? ""}` }, s), i), f);
  return ot.set(n, d), d;
}
function z(e, t = [], n = "", r = 0) {
  let o = e.trim().length;
  for (let s = 0; s < o; s++) {
    let i = e[s],
      a = e.slice(s + 1);
    switch (i) {
      case ",":
        return r === 0 ? z(a, [...t, n.trim()]) : z(a, t, `${n}${i}`, r);
      case "(":
        return z(a, t, `${n}${i}`, r + 1);
      case ")":
        return z(a, t, `${n}${i}`, r - 1);
      default:
        return z(a, t, `${n}${i}`, r);
    }
  }
  if (n === "") return t;
  if (r !== 0) throw new rt({ current: n, depth: r });
  return t.push(n.trim()), t;
}
function _t(e) {
  return (
    e === "address" ||
    e === "bool" ||
    e === "function" ||
    e === "string" ||
    Vt.test(e) ||
    Wt.test(e)
  );
}
var ts =
  /^(?:after|alias|anonymous|apply|auto|byte|calldata|case|catch|constant|copyof|default|defined|error|event|external|false|final|function|immutable|implements|in|indexed|inline|internal|let|mapping|match|memory|mutable|null|of|override|partial|private|promise|public|pure|reference|relocatable|return|returns|sizeof|static|storage|struct|super|supports|switch|this|true|try|typedef|typeof|var|view|virtual)$/;
function ns(e) {
  return (
    e === "address" ||
    e === "bool" ||
    e === "function" ||
    e === "string" ||
    e === "tuple" ||
    Vt.test(e) ||
    Wt.test(e) ||
    ts.test(e)
  );
}
function rs(e, t) {
  return t || e === "bytes" || e === "string" || e === "tuple";
}
function Pr(e) {
  let t = {},
    n = e.length;
  for (let i = 0; i < n; i++) {
    let a = e[i];
    if (!We(a)) continue;
    let u = dr(a);
    if (!u) throw new F({ signature: a, type: "struct" });
    let f = u.properties.split(";"),
      d = [],
      p = f.length;
    for (let b = 0; b < p; b++) {
      let y = f[b].trim();
      if (!y) continue;
      let x = K(y, { type: "struct" });
      d.push(x);
    }
    if (!d.length) throw new tt({ signature: a });
    t[u.name] = d;
  }
  let r = {},
    o = Object.entries(t),
    s = o.length;
  for (let i = 0; i < s; i++) {
    let [a, u] = o[i];
    r[a] = Ar(u, t);
  }
  return r;
}
var os = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*)(?<array>(?:\[\d*?\])+?)?$/;
function Ar(e, t, n = new Set()) {
  let r = [],
    o = e.length;
  for (let s = 0; s < o; s++) {
    let i = e[s];
    if (Ge.test(i.type)) r.push(i);
    else {
      let u = S(os, i.type);
      if (!u?.type) throw new Qe({ abiParameter: i });
      let { array: f, type: d } = u;
      if (d in t) {
        if (n.has(d)) throw new nt({ type: d });
        r.push(
          v(m({}, i), {
            type: `tuple${f ?? ""}`,
            components: Ar(t[d] ?? [], t, new Set([...n, d])),
          })
        );
      } else if (_t(d)) r.push(i);
      else throw new _e({ type: d });
    }
  }
  return r;
}
function st(e) {
  let t = Pr(e),
    n = [],
    r = e.length;
  for (let o = 0; o < r; o++) {
    let s = e[o];
    We(s) || n.push($r(s, t));
  }
  return n;
}
var Mr = "0.1.1";
function Er() {
  return Mr;
}
var Be = class e extends Error {
  constructor(t, n = {}) {
    let r = (() => {
        if (n.cause instanceof e) {
          if (n.cause.details) return n.cause.details;
          if (n.cause.shortMessage) return n.cause.shortMessage;
        }
        return n.cause &&
          "details" in n.cause &&
          typeof n.cause.details == "string"
          ? n.cause.details
          : n.cause?.message
          ? n.cause.message
          : n.details;
      })(),
      o = (n.cause instanceof e && n.cause.docsPath) || n.docsPath,
      i = `https://oxlib.sh${o ?? ""}`,
      a = [
        t || "An error occurred.",
        ...(n.metaMessages ? ["", ...n.metaMessages] : []),
        ...(r || o
          ? ["", r ? `Details: ${r}` : void 0, o ? `See: ${i}` : void 0]
          : []),
      ].filter((u) => typeof u == "string").join(`
`);
    super(a, n.cause ? { cause: n.cause } : void 0),
      Object.defineProperty(this, "details", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "docs", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "docsPath", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "shortMessage", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "cause", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "BaseError",
      }),
      Object.defineProperty(this, "version", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: `ox@${Er()}`,
      }),
      (this.cause = n.cause),
      (this.details = r),
      (this.docs = i),
      (this.docsPath = o),
      (this.shortMessage = t);
  }
  walk(t) {
    return Ir(this, t);
  }
};
function Ir(e, t) {
  return t?.(e)
    ? e
    : e && typeof e == "object" && "cause" in e && e.cause
    ? Ir(e.cause, t)
    : t
    ? null
    : e;
}
function Tr(e, t = {}) {
  let { dir: n, size: r = 32 } = t;
  if (r === 0) return e;
  let o = e.replace("0x", "");
  if (o.length > r * 2)
    throw new it({ size: Math.ceil(o.length / 2), targetSize: r, type: "Hex" });
  return `0x${o[n === "right" ? "padEnd" : "padStart"](r * 2, "0")}`;
}
function O(e, t = {}) {
  let { signed: n, size: r } = t,
    o = BigInt(e),
    s;
  r
    ? n
      ? (s = (1n << (BigInt(r) * 8n - 1n)) - 1n)
      : (s = 2n ** (BigInt(r) * 8n) - 1n)
    : typeof e == "number" && (s = BigInt(Number.MAX_SAFE_INTEGER));
  let i = typeof s == "bigint" && n ? -s - 1n : 0;
  if ((s && o > s) || o < i) {
    let f = typeof e == "bigint" ? "n" : "";
    throw new Jt({
      max: s ? `${s}${f}` : void 0,
      min: `${i}${f}`,
      signed: n,
      size: r,
      value: `${e}${f}`,
    });
  }
  let u = `0x${(n && o < 0 ? (1n << BigInt(r * 8)) + BigInt(o) : o).toString(
    16
  )}`;
  return r ? as(u, r) : u;
}
function as(e, t) {
  return Tr(e, { dir: "left", size: t });
}
var Jt = class extends Be {
  constructor({ max: t, min: n, signed: r, size: o, value: s }) {
    super(
      `Number \`${s}\` is not in safe${o ? ` ${o * 8}-bit` : ""}${
        r ? " signed" : " unsigned"
      } integer range ${t ? `(\`${n}\` to \`${t}\`)` : `(above \`${n}\`)`}`
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "Hex.IntegerOutOfRangeError",
      });
  }
};
var it = class extends Be {
  constructor({ size: t, targetSize: n, type: r }) {
    super(
      `${r.charAt(0).toUpperCase()}${r
        .slice(1)
        .toLowerCase()} size (\`${t}\`) exceeds padding size (\`${n}\`).`
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "Hex.SizeExceedsPaddingSizeError",
      });
  }
};
function Sr(e) {
  return {
    address: e.address,
    amount: O(e.amount),
    index: O(e.index),
    validatorIndex: O(e.validatorIndex),
  };
}
function Br(e) {
  return m(
    m(
      m(
        m(
          m(
            m(
              m(
                m(
                  {},
                  typeof e.baseFeePerGas == "bigint" && {
                    baseFeePerGas: O(e.baseFeePerGas),
                  }
                ),
                typeof e.blobBaseFee == "bigint" && {
                  blobBaseFee: O(e.blobBaseFee),
                }
              ),
              typeof e.feeRecipient == "string" && {
                feeRecipient: e.feeRecipient,
              }
            ),
            typeof e.gasLimit == "bigint" && { gasLimit: O(e.gasLimit) }
          ),
          typeof e.number == "bigint" && { number: O(e.number) }
        ),
        typeof e.prevRandao == "bigint" && { prevRandao: O(e.prevRandao) }
      ),
      typeof e.time == "bigint" && { time: O(e.time) }
    ),
    e.withdrawals && { withdrawals: e.withdrawals.map(Sr) }
  );
}
function ce(e) {
  return typeof e == "string" ? { address: e, type: "json-rpc" } : e;
}
var Kt = [
    {
      inputs: [
        {
          components: [
            { name: "target", type: "address" },
            { name: "allowFailure", type: "bool" },
            { name: "callData", type: "bytes" },
          ],
          name: "calls",
          type: "tuple[]",
        },
      ],
      name: "aggregate3",
      outputs: [
        {
          components: [
            { name: "success", type: "bool" },
            { name: "returnData", type: "bytes" },
          ],
          name: "returnData",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getCurrentBlockTimestamp",
      outputs: [
        { internalType: "uint256", name: "timestamp", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
  at = [
    {
      name: "query",
      type: "function",
      stateMutability: "view",
      inputs: [
        {
          type: "tuple[]",
          name: "queries",
          components: [
            { type: "address", name: "sender" },
            { type: "string[]", name: "urls" },
            { type: "bytes", name: "data" },
          ],
        },
      ],
      outputs: [
        { type: "bool[]", name: "failures" },
        { type: "bytes[]", name: "responses" },
      ],
    },
    {
      name: "HttpError",
      type: "error",
      inputs: [
        { type: "uint16", name: "status" },
        { type: "string", name: "message" },
      ],
    },
  ],
  jr = [
    {
      inputs: [{ name: "dns", type: "bytes" }],
      name: "DNSDecodingFailed",
      type: "error",
    },
    {
      inputs: [{ name: "ens", type: "string" }],
      name: "DNSEncodingFailed",
      type: "error",
    },
    { inputs: [], name: "EmptyAddress", type: "error" },
    {
      inputs: [
        { name: "status", type: "uint16" },
        { name: "message", type: "string" },
      ],
      name: "HttpError",
      type: "error",
    },
    { inputs: [], name: "InvalidBatchGatewayResponse", type: "error" },
    {
      inputs: [{ name: "errorData", type: "bytes" }],
      name: "ResolverError",
      type: "error",
    },
    {
      inputs: [
        { name: "name", type: "bytes" },
        { name: "resolver", type: "address" },
      ],
      name: "ResolverNotContract",
      type: "error",
    },
    {
      inputs: [{ name: "name", type: "bytes" }],
      name: "ResolverNotFound",
      type: "error",
    },
    {
      inputs: [
        { name: "primary", type: "string" },
        { name: "primaryAddress", type: "bytes" },
      ],
      name: "ReverseAddressMismatch",
      type: "error",
    },
    {
      inputs: [{ internalType: "bytes4", name: "selector", type: "bytes4" }],
      name: "UnsupportedResolverProfile",
      type: "error",
    },
  ],
  si = [
    ...jr,
    {
      name: "resolveWithGateways",
      type: "function",
      stateMutability: "view",
      inputs: [
        { name: "name", type: "bytes" },
        { name: "data", type: "bytes" },
        { name: "gateways", type: "string[]" },
      ],
      outputs: [
        { name: "", type: "bytes" },
        { name: "address", type: "address" },
      ],
    },
  ],
  ii = [
    ...jr,
    {
      name: "reverseWithGateways",
      type: "function",
      stateMutability: "view",
      inputs: [
        { type: "bytes", name: "reverseName" },
        { type: "uint256", name: "coinType" },
        { type: "string[]", name: "gateways" },
      ],
      outputs: [
        { type: "string", name: "resolvedName" },
        { type: "address", name: "resolver" },
        { type: "address", name: "reverseResolver" },
      ],
    },
  ];
var Rr = "0x82ad56cb";
var zr =
    "0x608060405234801561001057600080fd5b5060405161018e38038061018e83398101604081905261002f91610124565b6000808351602085016000f59050803b61004857600080fd5b6000808351602085016000855af16040513d6000823e81610067573d81fd5b3d81f35b634e487b7160e01b600052604160045260246000fd5b600082601f83011261009257600080fd5b81516001600160401b038111156100ab576100ab61006b565b604051601f8201601f19908116603f011681016001600160401b03811182821017156100d9576100d961006b565b6040528181528382016020018510156100f157600080fd5b60005b82811015610110576020818601810151838301820152016100f4565b506000918101602001919091529392505050565b6000806040838503121561013757600080fd5b82516001600160401b0381111561014d57600080fd5b61015985828601610081565b602085015190935090506001600160401b0381111561017757600080fd5b61018385828601610081565b915050925092905056fe",
  Or =
    "0x608060405234801561001057600080fd5b506040516102c03803806102c083398101604081905261002f916101e6565b836001600160a01b03163b6000036100e457600080836001600160a01b03168360405161005c9190610270565b6000604051808303816000865af19150503d8060008114610099576040519150601f19603f3d011682016040523d82523d6000602084013e61009e565b606091505b50915091508115806100b857506001600160a01b0386163b155b156100e1578060405163101bb98d60e01b81526004016100d8919061028c565b60405180910390fd5b50505b6000808451602086016000885af16040513d6000823e81610103573d81fd5b3d81f35b80516001600160a01b038116811461011e57600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b60005b8381101561015457818101518382015260200161013c565b50506000910152565b600082601f83011261016e57600080fd5b81516001600160401b0381111561018757610187610123565b604051601f8201601f19908116603f011681016001600160401b03811182821017156101b5576101b5610123565b6040528181528382016020018510156101cd57600080fd5b6101de826020830160208701610139565b949350505050565b600080600080608085870312156101fc57600080fd5b61020585610107565b60208601519094506001600160401b0381111561022157600080fd5b61022d8782880161015d565b93505061023c60408601610107565b60608601519092506001600160401b0381111561025857600080fd5b6102648782880161015d565b91505092959194509250565b60008251610282818460208701610139565b9190910192915050565b60208152600082518060208401526102ab816040850160208701610139565b601f01601f1916919091016040019291505056fe";
var Cr =
  "0x608060405234801561001057600080fd5b506115b9806100206000396000f3fe6080604052600436106100f35760003560e01c80634d2301cc1161008a578063a8b0574e11610059578063a8b0574e14610325578063bce38bd714610350578063c3077fa914610380578063ee82ac5e146103b2576100f3565b80634d2301cc1461026257806372425d9d1461029f57806382ad56cb146102ca57806386d516e8146102fa576100f3565b80633408e470116100c65780633408e470146101af578063399542e9146101da5780633e64a6961461020c57806342cbb15c14610237576100f3565b80630f28c97d146100f8578063174dea7114610123578063252dba421461015357806327e86d6e14610184575b600080fd5b34801561010457600080fd5b5061010d6103ef565b60405161011a9190610c0a565b60405180910390f35b61013d60048036038101906101389190610c94565b6103f7565b60405161014a9190610e94565b60405180910390f35b61016d60048036038101906101689190610f0c565b610615565b60405161017b92919061101b565b60405180910390f35b34801561019057600080fd5b506101996107ab565b6040516101a69190611064565b60405180910390f35b3480156101bb57600080fd5b506101c46107b7565b6040516101d19190610c0a565b60405180910390f35b6101f460048036038101906101ef91906110ab565b6107bf565b6040516102039392919061110b565b60405180910390f35b34801561021857600080fd5b506102216107e1565b60405161022e9190610c0a565b60405180910390f35b34801561024357600080fd5b5061024c6107e9565b6040516102599190610c0a565b60405180910390f35b34801561026e57600080fd5b50610289600480360381019061028491906111a7565b6107f1565b6040516102969190610c0a565b60405180910390f35b3480156102ab57600080fd5b506102b4610812565b6040516102c19190610c0a565b60405180910390f35b6102e460048036038101906102df919061122a565b61081a565b6040516102f19190610e94565b60405180910390f35b34801561030657600080fd5b5061030f6109e4565b60405161031c9190610c0a565b60405180910390f35b34801561033157600080fd5b5061033a6109ec565b6040516103479190611286565b60405180910390f35b61036a600480360381019061036591906110ab565b6109f4565b6040516103779190610e94565b60405180910390f35b61039a60048036038101906103959190610f0c565b610ba6565b6040516103a99392919061110b565b60405180910390f35b3480156103be57600080fd5b506103d960048036038101906103d491906112cd565b610bca565b6040516103e69190611064565b60405180910390f35b600042905090565b60606000808484905090508067ffffffffffffffff81111561041c5761041b6112fa565b5b60405190808252806020026020018201604052801561045557816020015b610442610bd5565b81526020019060019003908161043a5790505b5092503660005b828110156105c957600085828151811061047957610478611329565b5b6020026020010151905087878381811061049657610495611329565b5b90506020028101906104a89190611367565b925060008360400135905080860195508360000160208101906104cb91906111a7565b73ffffffffffffffffffffffffffffffffffffffff16818580606001906104f2919061138f565b604051610500929190611431565b60006040518083038185875af1925050503d806000811461053d576040519150601f19603f3d011682016040523d82523d6000602084013e610542565b606091505b5083600001846020018290528215151515815250505081516020850135176105bc577f08c379a000000000000000000000000000000000000000000000000000000000600052602060045260176024527f4d756c746963616c6c333a2063616c6c206661696c656400000000000000000060445260846000fd5b826001019250505061045c565b5082341461060c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610603906114a7565b60405180910390fd5b50505092915050565b6000606043915060008484905090508067ffffffffffffffff81111561063e5761063d6112fa565b5b60405190808252806020026020018201604052801561067157816020015b606081526020019060019003908161065c5790505b5091503660005b828110156107a157600087878381811061069557610694611329565b5b90506020028101906106a791906114c7565b92508260000160208101906106bc91906111a7565b73ffffffffffffffffffffffffffffffffffffffff168380602001906106e2919061138f565b6040516106f0929190611431565b6000604051808303816000865af19150503d806000811461072d576040519150601f19603f3d011682016040523d82523d6000602084013e610732565b606091505b5086848151811061074657610745611329565b5b60200260200101819052819250505080610795576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161078c9061153b565b60405180910390fd5b81600101915050610678565b5050509250929050565b60006001430340905090565b600046905090565b6000806060439250434091506107d68686866109f4565b905093509350939050565b600048905090565b600043905090565b60008173ffffffffffffffffffffffffffffffffffffffff16319050919050565b600044905090565b606060008383905090508067ffffffffffffffff81111561083e5761083d6112fa565b5b60405190808252806020026020018201604052801561087757816020015b610864610bd5565b81526020019060019003908161085c5790505b5091503660005b828110156109db57600084828151811061089b5761089a611329565b5b602002602001015190508686838181106108b8576108b7611329565b5b90506020028101906108ca919061155b565b92508260000160208101906108df91906111a7565b73ffffffffffffffffffffffffffffffffffffffff16838060400190610905919061138f565b604051610913929190611431565b6000604051808303816000865af19150503d8060008114610950576040519150601f19603f3d011682016040523d82523d6000602084013e610955565b606091505b5082600001836020018290528215151515815250505080516020840135176109cf577f08c379a000000000000000000000000000000000000000000000000000000000600052602060045260176024527f4d756c746963616c6c333a2063616c6c206661696c656400000000000000000060445260646000fd5b8160010191505061087e565b50505092915050565b600045905090565b600041905090565b606060008383905090508067ffffffffffffffff811115610a1857610a176112fa565b5b604051908082528060200260200182016040528015610a5157816020015b610a3e610bd5565b815260200190600190039081610a365790505b5091503660005b82811015610b9c576000848281518110610a7557610a74611329565b5b60200260200101519050868683818110610a9257610a91611329565b5b9050602002810190610aa491906114c7565b9250826000016020810190610ab991906111a7565b73ffffffffffffffffffffffffffffffffffffffff16838060200190610adf919061138f565b604051610aed929190611431565b6000604051808303816000865af19150503d8060008114610b2a576040519150601f19603f3d011682016040523d82523d6000602084013e610b2f565b606091505b508260000183602001829052821515151581525050508715610b90578060000151610b8f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b869061153b565b60405180910390fd5b5b81600101915050610a58565b5050509392505050565b6000806060610bb7600186866107bf565b8093508194508295505050509250925092565b600081409050919050565b6040518060400160405280600015158152602001606081525090565b6000819050919050565b610c0481610bf1565b82525050565b6000602082019050610c1f6000830184610bfb565b92915050565b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b60008083601f840112610c5457610c53610c2f565b5b8235905067ffffffffffffffff811115610c7157610c70610c34565b5b602083019150836020820283011115610c8d57610c8c610c39565b5b9250929050565b60008060208385031215610cab57610caa610c25565b5b600083013567ffffffffffffffff811115610cc957610cc8610c2a565b5b610cd585828601610c3e565b92509250509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b60008115159050919050565b610d2281610d0d565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610d62578082015181840152602081019050610d47565b83811115610d71576000848401525b50505050565b6000601f19601f8301169050919050565b6000610d9382610d28565b610d9d8185610d33565b9350610dad818560208601610d44565b610db681610d77565b840191505092915050565b6000604083016000830151610dd96000860182610d19565b5060208301518482036020860152610df18282610d88565b9150508091505092915050565b6000610e0a8383610dc1565b905092915050565b6000602082019050919050565b6000610e2a82610ce1565b610e348185610cec565b935083602082028501610e4685610cfd565b8060005b85811015610e825784840389528151610e638582610dfe565b9450610e6e83610e12565b925060208a01995050600181019050610e4a565b50829750879550505050505092915050565b60006020820190508181036000830152610eae8184610e1f565b905092915050565b60008083601f840112610ecc57610ecb610c2f565b5b8235905067ffffffffffffffff811115610ee957610ee8610c34565b5b602083019150836020820283011115610f0557610f04610c39565b5b9250929050565b60008060208385031215610f2357610f22610c25565b5b600083013567ffffffffffffffff811115610f4157610f40610c2a565b5b610f4d85828601610eb6565b92509250509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6000610f918383610d88565b905092915050565b6000602082019050919050565b6000610fb182610f59565b610fbb8185610f64565b935083602082028501610fcd85610f75565b8060005b858110156110095784840389528151610fea8582610f85565b9450610ff583610f99565b925060208a01995050600181019050610fd1565b50829750879550505050505092915050565b60006040820190506110306000830185610bfb565b81810360208301526110428184610fa6565b90509392505050565b6000819050919050565b61105e8161104b565b82525050565b60006020820190506110796000830184611055565b92915050565b61108881610d0d565b811461109357600080fd5b50565b6000813590506110a58161107f565b92915050565b6000806000604084860312156110c4576110c3610c25565b5b60006110d286828701611096565b935050602084013567ffffffffffffffff8111156110f3576110f2610c2a565b5b6110ff86828701610eb6565b92509250509250925092565b60006060820190506111206000830186610bfb565b61112d6020830185611055565b818103604083015261113f8184610e1f565b9050949350505050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061117482611149565b9050919050565b61118481611169565b811461118f57600080fd5b50565b6000813590506111a18161117b565b92915050565b6000602082840312156111bd576111bc610c25565b5b60006111cb84828501611192565b91505092915050565b60008083601f8401126111ea576111e9610c2f565b5b8235905067ffffffffffffffff81111561120757611206610c34565b5b60208301915083602082028301111561122357611222610c39565b5b9250929050565b6000806020838503121561124157611240610c25565b5b600083013567ffffffffffffffff81111561125f5761125e610c2a565b5b61126b858286016111d4565b92509250509250929050565b61128081611169565b82525050565b600060208201905061129b6000830184611277565b92915050565b6112aa81610bf1565b81146112b557600080fd5b50565b6000813590506112c7816112a1565b92915050565b6000602082840312156112e3576112e2610c25565b5b60006112f1848285016112b8565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600080fd5b600080fd5b600080fd5b60008235600160800383360303811261138357611382611358565b5b80830191505092915050565b600080833560016020038436030381126113ac576113ab611358565b5b80840192508235915067ffffffffffffffff8211156113ce576113cd61135d565b5b6020830192506001820236038313156113ea576113e9611362565b5b509250929050565b600081905092915050565b82818337600083830152505050565b600061141883856113f2565b93506114258385846113fd565b82840190509392505050565b600061143e82848661140c565b91508190509392505050565b600082825260208201905092915050565b7f4d756c746963616c6c333a2076616c7565206d69736d61746368000000000000600082015250565b6000611491601a8361144a565b915061149c8261145b565b602082019050919050565b600060208201905081810360008301526114c081611484565b9050919050565b6000823560016040038336030381126114e3576114e2611358565b5b80830191505092915050565b7f4d756c746963616c6c333a2063616c6c206661696c6564000000000000000000600082015250565b600061152560178361144a565b9150611530826114ef565b602082019050919050565b6000602082019050818103600083015261155481611518565b9050919050565b60008235600160600383360303811261157757611576611358565b5b8083019150509291505056fea264697066735822122020c1bc9aacf8e4a6507193432a895a8e77094f45a1395583f07b24e860ef06cd64736f6c634300080c0033";
var Yt = "2.37.6";
var Xt = {
  getDocsUrl: ({ docsBaseUrl: e, docsPath: t = "", docsSlug: n }) =>
    t ? `${e ?? "https://viem.sh"}${t}${n ? `#${n}` : ""}` : void 0,
  version: `viem@${Yt}`,
};
var c = class e extends Error {
  constructor(t, n = {}) {
    let r =
        n.cause instanceof e
          ? n.cause.details
          : n.cause?.message
          ? n.cause.message
          : n.details,
      o = (n.cause instanceof e && n.cause.docsPath) || n.docsPath,
      s = Xt.getDocsUrl?.(v(m({}, n), { docsPath: o })),
      i = [
        t || "An error occurred.",
        "",
        ...(n.metaMessages ? [...n.metaMessages, ""] : []),
        ...(s ? [`Docs: ${s}`] : []),
        ...(r ? [`Details: ${r}`] : []),
        ...(Xt.version ? [`Version: ${Xt.version}`] : []),
      ].join(`
`);
    super(i, n.cause ? { cause: n.cause } : void 0),
      Object.defineProperty(this, "details", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "docsPath", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "metaMessages", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "shortMessage", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "version", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "BaseError",
      }),
      (this.details = r),
      (this.docsPath = o),
      (this.metaMessages = n.metaMessages),
      (this.name = n.name ?? this.name),
      (this.shortMessage = t),
      (this.version = Yt);
  }
  walk(t) {
    return Fr(this, t);
  }
};
function Fr(e, t) {
  return t?.(e)
    ? e
    : e && typeof e == "object" && "cause" in e && e.cause !== void 0
    ? Fr(e.cause, t)
    : t
    ? null
    : e;
}
var ne = class extends c {
    constructor({ blockNumber: t, chain: n, contract: r }) {
      super(`Chain "${n.name}" does not support contract "${r.name}".`, {
        metaMessages: [
          "This could be due to any of the following:",
          ...(t && r.blockCreated && r.blockCreated > t
            ? [
                `- The contract "${r.name}" was not deployed until block ${r.blockCreated} (current block ${t}).`,
              ]
            : [
                `- The chain does not have the contract "${r.name}" configured.`,
              ]),
        ],
        name: "ChainDoesNotSupportContract",
      });
    }
  },
  kr = class extends c {
    constructor({ chain: t, currentChainId: n }) {
      super(
        `The current chain of the wallet (id: ${n}) does not match the target chain for the transaction (id: ${t.id} \u2013 ${t.name}).`,
        {
          metaMessages: [
            `Current Chain ID:  ${n}`,
            `Expected Chain ID: ${t.id} \u2013 ${t.name}`,
          ],
          name: "ChainMismatchError",
        }
      );
    }
  },
  Ur = class extends c {
    constructor() {
      super(
        [
          "No chain was provided to the request.",
          "Please provide a chain with the `chain` argument on the Action, or by supplying a `chain` to WalletClient.",
        ].join(`
`),
        { name: "ChainNotFoundError" }
      );
    }
  },
  je = class extends c {
    constructor() {
      super("No chain was provided to the Client.", {
        name: "ClientChainNotConfiguredError",
      });
    }
  };
var Nr = {
    1: "An `assert` condition failed.",
    17: "Arithmetic operation resulted in underflow or overflow.",
    18: "Division or modulo by zero (e.g. `5 / 0` or `23 % 0`).",
    33: "Attempted to convert to an invalid type.",
    34: "Attempted to access a storage byte array that is incorrectly encoded.",
    49: "Performed `.pop()` on an empty array",
    50: "Array index is out of bounds.",
    65: "Allocated too much memory or created an array which is too large.",
    81: "Attempted to call a zero-initialized variable of internal function type.",
  },
  ut = {
    inputs: [{ name: "message", type: "string" }],
    name: "Error",
    type: "error",
  },
  Hr = {
    inputs: [{ name: "reason", type: "uint256" }],
    name: "Panic",
    type: "error",
  };
function M(e, { includeName: t = !1 } = {}) {
  if (e.type !== "function" && e.type !== "event" && e.type !== "error")
    throw new ft(e.type);
  return `${e.name}(${ct(e.inputs, { includeName: t })})`;
}
function ct(e, { includeName: t = !1 } = {}) {
  return e ? e.map((n) => fs(n, { includeName: t })).join(t ? ", " : ",") : "";
}
function fs(e, { includeName: t }) {
  return e.type.startsWith("tuple")
    ? `(${ct(e.components, { includeName: t })})${e.type.slice(5)}`
    : e.type + (t && e.name ? ` ${e.name}` : "");
}
function j(e, { strict: t = !0 } = {}) {
  return !e || typeof e != "string"
    ? !1
    : t
    ? /^0x[0-9a-fA-F]*$/.test(e)
    : e.startsWith("0x");
}
function g(e) {
  return j(e, { strict: !1 }) ? Math.ceil((e.length - 2) / 2) : e.length;
}
var pt = class extends c {
    constructor({ docsPath: t }) {
      super(
        [
          "A constructor was not found on the ABI.",
          "Make sure you are using the correct ABI and that the constructor exists on it.",
        ].join(`
`),
        { docsPath: t, name: "AbiConstructorNotFoundError" }
      );
    }
  },
  Re = class extends c {
    constructor({ docsPath: t }) {
      super(
        [
          "Constructor arguments were provided (`args`), but a constructor parameters (`inputs`) were not found on the ABI.",
          "Make sure you are using the correct ABI, and that the `inputs` attribute on the constructor exists.",
        ].join(`
`),
        { docsPath: t, name: "AbiConstructorParamsNotFoundError" }
      );
    }
  };
var dt = class extends c {
    constructor({ data: t, params: n, size: r }) {
      super(
        [`Data size of ${r} bytes is too small for given parameters.`].join(`
`),
        {
          metaMessages: [
            `Params: (${ct(n, { includeName: !0 })})`,
            `Data:   ${t} (${r} bytes)`,
          ],
          name: "AbiDecodingDataSizeTooSmallError",
        }
      ),
        Object.defineProperty(this, "data", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "params", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "size", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        (this.data = t),
        (this.params = n),
        (this.size = r);
    }
  },
  fe = class extends c {
    constructor() {
      super('Cannot decode zero data ("0x") with ABI parameters.', {
        name: "AbiDecodingZeroDataError",
      });
    }
  },
  lt = class extends c {
    constructor({ expectedLength: t, givenLength: n, type: r }) {
      super(
        [
          `ABI encoding array length mismatch for type ${r}.`,
          `Expected length: ${t}`,
          `Given length: ${n}`,
        ].join(`
`),
        { name: "AbiEncodingArrayLengthMismatchError" }
      );
    }
  },
  mt = class extends c {
    constructor({ expectedSize: t, value: n }) {
      super(
        `Size of bytes "${n}" (bytes${g(
          n
        )}) does not match expected size (bytes${t}).`,
        { name: "AbiEncodingBytesSizeMismatchError" }
      );
    }
  },
  bt = class extends c {
    constructor({ expectedLength: t, givenLength: n }) {
      super(
        [
          "ABI encoding params/values length mismatch.",
          `Expected length (params): ${t}`,
          `Given length (values): ${n}`,
        ].join(`
`),
        { name: "AbiEncodingLengthMismatchError" }
      );
    }
  },
  yt = class extends c {
    constructor(t, { docsPath: n }) {
      super(
        [
          `Arguments (\`args\`) were provided to "${t}", but "${t}" on the ABI does not contain any parameters (\`inputs\`).`,
          "Cannot encode error result without knowing what the parameter types are.",
          "Make sure you are using the correct ABI and that the inputs exist on it.",
        ].join(`
`),
        { docsPath: n, name: "AbiErrorInputsNotFoundError" }
      );
    }
  },
  ze = class extends c {
    constructor(t, { docsPath: n } = {}) {
      super(
        [
          `Error ${t ? `"${t}" ` : ""}not found on ABI.`,
          "Make sure you are using the correct ABI and that the error exists on it.",
        ].join(`
`),
        { docsPath: n, name: "AbiErrorNotFoundError" }
      );
    }
  },
  pe = class extends c {
    constructor(t, { docsPath: n }) {
      super(
        [
          `Encoded error signature "${t}" not found on ABI.`,
          "Make sure you are using the correct ABI and that the error exists on it.",
          `You can look up the decoded signature here: https://openchain.xyz/signatures?query=${t}.`,
        ].join(`
`),
        { docsPath: n, name: "AbiErrorSignatureNotFoundError" }
      ),
        Object.defineProperty(this, "signature", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        (this.signature = t);
    }
  };
var C = class extends c {
    constructor(t, { docsPath: n } = {}) {
      super(
        [
          `Function ${t ? `"${t}" ` : ""}not found on ABI.`,
          "Make sure you are using the correct ABI and that the function exists on it.",
        ].join(`
`),
        { docsPath: n, name: "AbiFunctionNotFoundError" }
      );
    }
  },
  de = class extends c {
    constructor(t, { docsPath: n }) {
      super(
        [
          `Function "${t}" does not contain any \`outputs\` on ABI.`,
          "Cannot decode function result without knowing what the parameter types are.",
          "Make sure you are using the correct ABI and that the function exists on it.",
        ].join(`
`),
        { docsPath: n, name: "AbiFunctionOutputsNotFoundError" }
      );
    }
  },
  ht = class extends c {
    constructor(t, { docsPath: n }) {
      super(
        [
          `Encoded function signature "${t}" not found on ABI.`,
          "Make sure you are using the correct ABI and that the function exists on it.",
          `You can look up the signature here: https://openchain.xyz/signatures?query=${t}.`,
        ].join(`
`),
        { docsPath: n, name: "AbiFunctionSignatureNotFoundError" }
      );
    }
  },
  xt = class extends c {
    constructor(t, n) {
      super("Found ambiguous types in overloaded ABI items.", {
        metaMessages: [
          `\`${t.type}\` in \`${M(t.abiItem)}\`, and`,
          `\`${n.type}\` in \`${M(n.abiItem)}\``,
          "",
          "These types encode differently and cannot be distinguished at runtime.",
          "Remove one of the ambiguous items in the ABI.",
        ],
        name: "AbiItemAmbiguityError",
      });
    }
  },
  Dr = class extends c {
    constructor({ expectedSize: t, givenSize: n }) {
      super(`Expected bytes${t}, got bytes${n}.`, {
        name: "BytesSizeMismatchError",
      });
    }
  };
var gt = class extends c {
    constructor(t, { docsPath: n }) {
      super(
        [
          `Type "${t}" is not a valid encoding type.`,
          "Please provide a valid ABI type.",
        ].join(`
`),
        { docsPath: n, name: "InvalidAbiEncodingType" }
      );
    }
  },
  wt = class extends c {
    constructor(t, { docsPath: n }) {
      super(
        [
          `Type "${t}" is not a valid decoding type.`,
          "Please provide a valid ABI type.",
        ].join(`
`),
        { docsPath: n, name: "InvalidAbiDecodingType" }
      );
    }
  },
  le = class extends c {
    constructor(t) {
      super(
        [`Value "${t}" is not a valid array.`].join(`
`),
        { name: "InvalidArrayError" }
      );
    }
  },
  ft = class extends c {
    constructor(t) {
      super(
        [
          `"${t}" is not a valid definition type.`,
          'Valid types: "function", "event", "error"',
        ].join(`
`),
        { name: "InvalidDefinitionTypeError" }
      );
    }
  };
var Oe = class extends c {
    constructor({ offset: t, position: n, size: r }) {
      super(
        `Slice ${
          n === "start" ? "starting" : "ending"
        } at offset "${t}" is out-of-bounds (size: ${r}).`,
        { name: "SliceOffsetOutOfBoundsError" }
      );
    }
  },
  Ce = class extends c {
    constructor({ size: t, targetSize: n, type: r }) {
      super(
        `${r.charAt(0).toUpperCase()}${r
          .slice(1)
          .toLowerCase()} size (${t}) exceeds padding size (${n}).`,
        { name: "SizeExceedsPaddingSizeError" }
      );
    }
  },
  Fe = class extends c {
    constructor({ size: t, targetSize: n, type: r }) {
      super(
        `${r.charAt(0).toUpperCase()}${r
          .slice(1)
          .toLowerCase()} is expected to be ${n} ${r} long, but is ${t} ${r} long.`,
        { name: "InvalidBytesLengthError" }
      );
    }
  };
function k(e, t, n, { strict: r } = {}) {
  return j(e, { strict: !1 })
    ? ps(e, t, n, { strict: r })
    : Qt(e, t, n, { strict: r });
}
function Lr(e, t) {
  if (typeof t == "number" && t > 0 && t > g(e) - 1)
    throw new Oe({ offset: t, position: "start", size: g(e) });
}
function Gr(e, t, n) {
  if (typeof t == "number" && typeof n == "number" && g(e) !== n - t)
    throw new Oe({ offset: n, position: "end", size: g(e) });
}
function Qt(e, t, n, { strict: r } = {}) {
  Lr(e, t);
  let o = e.slice(t, n);
  return r && Gr(o, t, n), o;
}
function ps(e, t, n, { strict: r } = {}) {
  Lr(e, t);
  let o = `0x${e.replace("0x", "").slice((t ?? 0) * 2, (n ?? e.length) * 2)}`;
  return r && Gr(o, t, n), o;
}
function Y(e, { dir: t, size: n = 32 } = {}) {
  return typeof e == "string"
    ? V(e, { dir: t, size: n })
    : ds(e, { dir: t, size: n });
}
function V(e, { dir: t, size: n = 32 } = {}) {
  if (n === null) return e;
  let r = e.replace("0x", "");
  if (r.length > n * 2)
    throw new Ce({ size: Math.ceil(r.length / 2), targetSize: n, type: "hex" });
  return `0x${r[t === "right" ? "padEnd" : "padStart"](n * 2, "0")}`;
}
function ds(e, { dir: t, size: n = 32 } = {}) {
  if (n === null) return e;
  if (e.length > n)
    throw new Ce({ size: e.length, targetSize: n, type: "bytes" });
  let r = new Uint8Array(n);
  for (let o = 0; o < n; o++) {
    let s = t === "right";
    r[s ? o : n - o - 1] = e[s ? o : e.length - o - 1];
  }
  return r;
}
var me = class extends c {
    constructor({ max: t, min: n, signed: r, size: o, value: s }) {
      super(
        `Number "${s}" is not in safe ${
          o ? `${o * 8}-bit ${r ? "signed" : "unsigned"} ` : ""
        }integer range ${t ? `(${n} to ${t})` : `(above ${n})`}`,
        { name: "IntegerOutOfRangeError" }
      );
    }
  },
  vt = class extends c {
    constructor(t) {
      super(
        `Bytes value "${t}" is not a valid boolean. The bytes array must contain a single byte of either a 0 or 1 value.`,
        { name: "InvalidBytesBooleanError" }
      );
    }
  };
var $t = class extends c {
  constructor({ givenSize: t, maxSize: n }) {
    super(`Size cannot exceed ${n} bytes. Given size: ${t} bytes.`, {
      name: "SizeOverflowError",
    });
  }
};
function re(e, { dir: t = "left" } = {}) {
  let n = typeof e == "string" ? e.replace("0x", "") : e,
    r = 0;
  for (
    let o = 0;
    o < n.length - 1 &&
    n[t === "left" ? o : n.length - o - 1].toString() === "0";
    o++
  )
    r++;
  return (
    (n = t === "left" ? n.slice(r) : n.slice(0, n.length - r)),
    typeof e == "string"
      ? (n.length === 1 && t === "right" && (n = `${n}0`),
        `0x${n.length % 2 === 1 ? `0${n}` : n}`)
      : n
  );
}
function E(e, { size: t }) {
  if (g(e) > t) throw new $t({ givenSize: g(e), maxSize: t });
}
function en(e, t = {}) {
  let { signed: n } = t;
  t.size && E(e, { size: t.size });
  let r = BigInt(e);
  if (!n) return r;
  let o = (e.length - 2) / 2,
    s = (1n << (BigInt(o) * 8n - 1n)) - 1n;
  return r <= s ? r : r - BigInt(`0x${"f".padStart(o * 2, "f")}`) - 1n;
}
function Vr(e, t = {}) {
  return Number(en(e, t));
}
function Li(e, t = {}) {
  let n = be(e);
  return (
    t.size && (E(n, { size: t.size }), (n = re(n, { dir: "right" }))),
    new TextDecoder().decode(n)
  );
}
var ls = Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function Wr(e, t = {}) {
  return typeof e == "number" || typeof e == "bigint"
    ? h(e, t)
    : typeof e == "string"
    ? nn(e, t)
    : typeof e == "boolean"
    ? tn(e, t)
    : R(e, t);
}
function tn(e, t = {}) {
  let n = `0x${Number(e)}`;
  return typeof t.size == "number"
    ? (E(n, { size: t.size }), Y(n, { size: t.size }))
    : n;
}
function R(e, t = {}) {
  let n = "";
  for (let o = 0; o < e.length; o++) n += ls[e[o]];
  let r = `0x${n}`;
  return typeof t.size == "number"
    ? (E(r, { size: t.size }), Y(r, { dir: "right", size: t.size }))
    : r;
}
function h(e, t = {}) {
  let { signed: n, size: r } = t,
    o = BigInt(e),
    s;
  r
    ? n
      ? (s = (1n << (BigInt(r) * 8n - 1n)) - 1n)
      : (s = 2n ** (BigInt(r) * 8n) - 1n)
    : typeof e == "number" && (s = BigInt(Number.MAX_SAFE_INTEGER));
  let i = typeof s == "bigint" && n ? -s - 1n : 0;
  if ((s && o > s) || o < i) {
    let u = typeof e == "bigint" ? "n" : "";
    throw new me({
      max: s ? `${s}${u}` : void 0,
      min: `${i}${u}`,
      signed: n,
      size: r,
      value: `${e}${u}`,
    });
  }
  let a = `0x${(n && o < 0 ? (1n << BigInt(r * 8)) + BigInt(o) : o).toString(
    16
  )}`;
  return r ? Y(a, { size: r }) : a;
}
var ms = new TextEncoder();
function nn(e, t = {}) {
  let n = ms.encode(e);
  return R(n, t);
}
var bs = new TextEncoder();
function Pt(e, t = {}) {
  return typeof e == "number" || typeof e == "bigint"
    ? hs(e, t)
    : typeof e == "boolean"
    ? ys(e, t)
    : j(e)
    ? be(e, t)
    : rn(e, t);
}
function ys(e, t = {}) {
  let n = new Uint8Array(1);
  return (
    (n[0] = Number(e)),
    typeof t.size == "number"
      ? (E(n, { size: t.size }), Y(n, { size: t.size }))
      : n
  );
}
var W = { zero: 48, nine: 57, A: 65, F: 70, a: 97, f: 102 };
function qr(e) {
  if (e >= W.zero && e <= W.nine) return e - W.zero;
  if (e >= W.A && e <= W.F) return e - (W.A - 10);
  if (e >= W.a && e <= W.f) return e - (W.a - 10);
}
function be(e, t = {}) {
  let n = e;
  t.size &&
    (E(n, { size: t.size }), (n = Y(n, { dir: "right", size: t.size })));
  let r = n.slice(2);
  r.length % 2 && (r = `0${r}`);
  let o = r.length / 2,
    s = new Uint8Array(o);
  for (let i = 0, a = 0; i < o; i++) {
    let u = qr(r.charCodeAt(a++)),
      f = qr(r.charCodeAt(a++));
    if (u === void 0 || f === void 0)
      throw new c(
        `Invalid byte sequence ("${r[a - 2]}${r[a - 1]}" in "${r}").`
      );
    s[i] = u * 16 + f;
  }
  return s;
}
function hs(e, t) {
  let n = h(e, t);
  return be(n);
}
function rn(e, t = {}) {
  let n = bs.encode(e);
  return typeof t.size == "number"
    ? (E(n, { size: t.size }), Y(n, { dir: "right", size: t.size }))
    : n;
}
Wo();
function At(e, t) {
  let n = t || "hex",
    r = Qn(j(e, { strict: !1 }) ? Pt(e) : e);
  return n === "bytes" ? r : Wr(r);
}
var xs = (e) => At(Pt(e));
function _r(e) {
  return xs(e);
}
function Zr(e) {
  let t = !0,
    n = "",
    r = 0,
    o = "",
    s = !1;
  for (let i = 0; i < e.length; i++) {
    let a = e[i];
    if (
      (["(", ")", ","].includes(a) && (t = !0),
      a === "(" && r++,
      a === ")" && r--,
      !!t)
    ) {
      if (r === 0) {
        if (a === " " && ["event", "function", ""].includes(o)) o = "";
        else if (((o += a), a === ")")) {
          s = !0;
          break;
        }
        continue;
      }
      if (a === " ") {
        e[i - 1] !== "," && n !== "," && n !== ",(" && ((n = ""), (t = !1));
        continue;
      }
      (o += a), (n += a);
    }
  }
  if (!s) throw new c("Unable to normalize signature.");
  return o;
}
var Jr = (e) => {
  let t = typeof e == "string" ? e : qt(e);
  return Zr(t);
};
function Mt(e) {
  return _r(Jr(e));
}
var U = (e) => k(Mt(e), 0, 4);
var I = class extends c {
  constructor({ address: t }) {
    super(`Address "${t}" is invalid.`, {
      metaMessages: [
        "- Address must be a hex value of 20 bytes (40 hex characters).",
        "- Address must match its checksum counterpart.",
      ],
      name: "InvalidAddressError",
    });
  }
};
var ye = class extends Map {
  constructor(t) {
    super(),
      Object.defineProperty(this, "maxSize", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.maxSize = t);
  }
  get(t) {
    let n = super.get(t);
    return super.has(t) && n !== void 0 && (this.delete(t), super.set(t, n)), n;
  }
  set(t, n) {
    if ((super.set(t, n), this.maxSize && this.size > this.maxSize)) {
      let r = this.keys().next().value;
      r && this.delete(r);
    }
    return this;
  }
};
var gs = /^0x[a-fA-F0-9]{40}$/,
  on = new ye(8192);
function $(e, t) {
  let { strict: n = !0 } = t ?? {},
    r = `${e}.${n}`;
  if (on.has(r)) return on.get(r);
  let o = gs.test(e) ? (e.toLowerCase() === e ? !0 : n ? ke(e) === e : !0) : !1;
  return on.set(r, o), o;
}
var sn = new ye(8192);
function ke(e, t) {
  if (sn.has(`${e}.${t}`)) return sn.get(`${e}.${t}`);
  let n = t ? `${t}${e.toLowerCase()}` : e.substring(2).toLowerCase(),
    r = At(rn(n), "bytes"),
    o = (t ? n.substring(`${t}0x`.length) : n).split("");
  for (let i = 0; i < 40; i += 2)
    r[i >> 1] >> 4 >= 8 && o[i] && (o[i] = o[i].toUpperCase()),
      (r[i >> 1] & 15) >= 8 && o[i + 1] && (o[i + 1] = o[i + 1].toUpperCase());
  let s = `0x${o.join("")}`;
  return sn.set(`${e}.${t}`, s), s;
}
function Ba(e, t) {
  if (!$(e, { strict: !1 })) throw new I({ address: e });
  return ke(e, t);
}
var Ue = class extends c {
    constructor({ offset: t }) {
      super(`Offset \`${t}\` cannot be negative.`, {
        name: "NegativeOffsetError",
      });
    }
  },
  Et = class extends c {
    constructor({ length: t, position: n }) {
      super(`Position \`${n}\` is out of bounds (\`0 < position < ${t}\`).`, {
        name: "PositionOutOfBoundsError",
      });
    }
  },
  It = class extends c {
    constructor({ count: t, limit: n }) {
      super(
        `Recursive read limit of \`${n}\` exceeded (recursive read count: \`${t}\`).`,
        { name: "RecursiveReadLimitExceededError" }
      );
    }
  };
var ws = {
  bytes: new Uint8Array(),
  dataView: new DataView(new ArrayBuffer(0)),
  position: 0,
  positionReadCount: new Map(),
  recursiveReadCount: 0,
  recursiveReadLimit: Number.POSITIVE_INFINITY,
  assertReadLimit() {
    if (this.recursiveReadCount >= this.recursiveReadLimit)
      throw new It({
        count: this.recursiveReadCount + 1,
        limit: this.recursiveReadLimit,
      });
  },
  assertPosition(e) {
    if (e < 0 || e > this.bytes.length - 1)
      throw new Et({ length: this.bytes.length, position: e });
  },
  decrementPosition(e) {
    if (e < 0) throw new Ue({ offset: e });
    let t = this.position - e;
    this.assertPosition(t), (this.position = t);
  },
  getReadCount(e) {
    return this.positionReadCount.get(e || this.position) || 0;
  },
  incrementPosition(e) {
    if (e < 0) throw new Ue({ offset: e });
    let t = this.position + e;
    this.assertPosition(t), (this.position = t);
  },
  inspectByte(e) {
    let t = e ?? this.position;
    return this.assertPosition(t), this.bytes[t];
  },
  inspectBytes(e, t) {
    let n = t ?? this.position;
    return this.assertPosition(n + e - 1), this.bytes.subarray(n, n + e);
  },
  inspectUint8(e) {
    let t = e ?? this.position;
    return this.assertPosition(t), this.bytes[t];
  },
  inspectUint16(e) {
    let t = e ?? this.position;
    return this.assertPosition(t + 1), this.dataView.getUint16(t);
  },
  inspectUint24(e) {
    let t = e ?? this.position;
    return (
      this.assertPosition(t + 2),
      (this.dataView.getUint16(t) << 8) + this.dataView.getUint8(t + 2)
    );
  },
  inspectUint32(e) {
    let t = e ?? this.position;
    return this.assertPosition(t + 3), this.dataView.getUint32(t);
  },
  pushByte(e) {
    this.assertPosition(this.position),
      (this.bytes[this.position] = e),
      this.position++;
  },
  pushBytes(e) {
    this.assertPosition(this.position + e.length - 1),
      this.bytes.set(e, this.position),
      (this.position += e.length);
  },
  pushUint8(e) {
    this.assertPosition(this.position),
      (this.bytes[this.position] = e),
      this.position++;
  },
  pushUint16(e) {
    this.assertPosition(this.position + 1),
      this.dataView.setUint16(this.position, e),
      (this.position += 2);
  },
  pushUint24(e) {
    this.assertPosition(this.position + 2),
      this.dataView.setUint16(this.position, e >> 8),
      this.dataView.setUint8(this.position + 2, e & 255),
      (this.position += 3);
  },
  pushUint32(e) {
    this.assertPosition(this.position + 3),
      this.dataView.setUint32(this.position, e),
      (this.position += 4);
  },
  readByte() {
    this.assertReadLimit(), this._touch();
    let e = this.inspectByte();
    return this.position++, e;
  },
  readBytes(e, t) {
    this.assertReadLimit(), this._touch();
    let n = this.inspectBytes(e);
    return (this.position += t ?? e), n;
  },
  readUint8() {
    this.assertReadLimit(), this._touch();
    let e = this.inspectUint8();
    return (this.position += 1), e;
  },
  readUint16() {
    this.assertReadLimit(), this._touch();
    let e = this.inspectUint16();
    return (this.position += 2), e;
  },
  readUint24() {
    this.assertReadLimit(), this._touch();
    let e = this.inspectUint24();
    return (this.position += 3), e;
  },
  readUint32() {
    this.assertReadLimit(), this._touch();
    let e = this.inspectUint32();
    return (this.position += 4), e;
  },
  get remaining() {
    return this.bytes.length - this.position;
  },
  setPosition(e) {
    let t = this.position;
    return (
      this.assertPosition(e), (this.position = e), () => (this.position = t)
    );
  },
  _touch() {
    if (this.recursiveReadLimit === Number.POSITIVE_INFINITY) return;
    let e = this.getReadCount();
    this.positionReadCount.set(this.position, e + 1),
      e > 0 && this.recursiveReadCount++;
  },
};
function Kr(e, { recursiveReadLimit: t = 8192 } = {}) {
  let n = Object.create(ws);
  return (
    (n.bytes = e),
    (n.dataView = new DataView(e.buffer, e.byteOffset, e.byteLength)),
    (n.positionReadCount = new Map()),
    (n.recursiveReadLimit = t),
    n
  );
}
function Yr(e, t = {}) {
  typeof t.size < "u" && E(e, { size: t.size });
  let n = R(e, t);
  return en(n, t);
}
function Xr(e, t = {}) {
  let n = e;
  if (
    (typeof t.size < "u" && (E(n, { size: t.size }), (n = re(n))),
    n.length > 1 || n[0] > 1)
  )
    throw new vt(n);
  return !!n[0];
}
function N(e, t = {}) {
  typeof t.size < "u" && E(e, { size: t.size });
  let n = R(e, t);
  return Vr(n, t);
}
function Qr(e, t = {}) {
  let n = e;
  return (
    typeof t.size < "u" &&
      (E(n, { size: t.size }), (n = re(n, { dir: "right" }))),
    new TextDecoder().decode(n)
  );
}
function q(e) {
  return typeof e[0] == "string" ? oe(e) : vs(e);
}
function vs(e) {
  let t = 0;
  for (let o of e) t += o.length;
  let n = new Uint8Array(t),
    r = 0;
  for (let o of e) n.set(o, r), (r += o.length);
  return n;
}
function oe(e) {
  return `0x${e.reduce((t, n) => t + n.replace("0x", ""), "")}`;
}
var La = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/,
  eo =
    /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
function H(e, t) {
  if (e.length !== t.length)
    throw new bt({ expectedLength: e.length, givenLength: t.length });
  let n = $s({ params: e, values: t }),
    r = un(n);
  return r.length === 0 ? "0x" : r;
}
function $s({ params: e, values: t }) {
  let n = [];
  for (let r = 0; r < e.length; r++) n.push(an({ param: e[r], value: t[r] }));
  return n;
}
function an({ param: e, value: t }) {
  let n = Tt(e.type);
  if (n) {
    let [r, o] = n;
    return As(t, { length: r, param: v(m({}, e), { type: o }) });
  }
  if (e.type === "tuple") return Ss(t, { param: e });
  if (e.type === "address") return Ps(t);
  if (e.type === "bool") return Es(t);
  if (e.type.startsWith("uint") || e.type.startsWith("int")) {
    let r = e.type.startsWith("int"),
      [, , o = "256"] = eo.exec(e.type) ?? [];
    return Is(t, { signed: r, size: Number(o) });
  }
  if (e.type.startsWith("bytes")) return Ms(t, { param: e });
  if (e.type === "string") return Ts(t);
  throw new gt(e.type, { docsPath: "/docs/contract/encodeAbiParameters" });
}
function un(e) {
  let t = 0;
  for (let s = 0; s < e.length; s++) {
    let { dynamic: i, encoded: a } = e[s];
    i ? (t += 32) : (t += g(a));
  }
  let n = [],
    r = [],
    o = 0;
  for (let s = 0; s < e.length; s++) {
    let { dynamic: i, encoded: a } = e[s];
    i ? (n.push(h(t + o, { size: 32 })), r.push(a), (o += g(a))) : n.push(a);
  }
  return q([...n, ...r]);
}
function Ps(e) {
  if (!$(e)) throw new I({ address: e });
  return { dynamic: !1, encoded: V(e.toLowerCase()) };
}
function As(e, { length: t, param: n }) {
  let r = t === null;
  if (!Array.isArray(e)) throw new le(e);
  if (!r && e.length !== t)
    throw new lt({
      expectedLength: t,
      givenLength: e.length,
      type: `${n.type}[${t}]`,
    });
  let o = !1,
    s = [];
  for (let i = 0; i < e.length; i++) {
    let a = an({ param: n, value: e[i] });
    a.dynamic && (o = !0), s.push(a);
  }
  if (r || o) {
    let i = un(s);
    if (r) {
      let a = h(s.length, { size: 32 });
      return { dynamic: !0, encoded: s.length > 0 ? q([a, i]) : a };
    }
    if (o) return { dynamic: !0, encoded: i };
  }
  return { dynamic: !1, encoded: q(s.map(({ encoded: i }) => i)) };
}
function Ms(e, { param: t }) {
  let [, n] = t.type.split("bytes"),
    r = g(e);
  if (!n) {
    let o = e;
    return (
      r % 32 !== 0 &&
        (o = V(o, {
          dir: "right",
          size: Math.ceil((e.length - 2) / 2 / 32) * 32,
        })),
      { dynamic: !0, encoded: q([V(h(r, { size: 32 })), o]) }
    );
  }
  if (r !== Number.parseInt(n, 10))
    throw new mt({ expectedSize: Number.parseInt(n, 10), value: e });
  return { dynamic: !1, encoded: V(e, { dir: "right" }) };
}
function Es(e) {
  if (typeof e != "boolean")
    throw new c(
      `Invalid boolean value: "${e}" (type: ${typeof e}). Expected: \`true\` or \`false\`.`
    );
  return { dynamic: !1, encoded: V(tn(e)) };
}
function Is(e, { signed: t, size: n = 256 }) {
  if (typeof n == "number") {
    let r = 2n ** (BigInt(n) - (t ? 1n : 0n)) - 1n,
      o = t ? -r - 1n : 0n;
    if (e > r || e < o)
      throw new me({
        max: r.toString(),
        min: o.toString(),
        signed: t,
        size: n / 8,
        value: e.toString(),
      });
  }
  return { dynamic: !1, encoded: h(e, { size: 32, signed: t }) };
}
function Ts(e) {
  let t = nn(e),
    n = Math.ceil(g(t) / 32),
    r = [];
  for (let o = 0; o < n; o++)
    r.push(V(k(t, o * 32, (o + 1) * 32), { dir: "right" }));
  return { dynamic: !0, encoded: q([V(h(g(t), { size: 32 })), ...r]) };
}
function Ss(e, { param: t }) {
  let n = !1,
    r = [];
  for (let o = 0; o < t.components.length; o++) {
    let s = t.components[o],
      i = Array.isArray(e) ? o : s.name,
      a = an({ param: s, value: e[i] });
    r.push(a), a.dynamic && (n = !0);
  }
  return { dynamic: n, encoded: n ? un(r) : q(r.map(({ encoded: o }) => o)) };
}
function Tt(e) {
  let t = e.match(/^(.*)\[(\d+)?\]$/);
  return t ? [t[2] ? Number(t[2]) : null, t[1]] : void 0;
}
function xe(e, t) {
  let n = typeof t == "string" ? be(t) : t,
    r = Kr(n);
  if (g(n) === 0 && e.length > 0) throw new fe();
  if (g(t) && g(t) < 32)
    throw new dt({
      data: typeof t == "string" ? t : R(t),
      params: e,
      size: g(t),
    });
  let o = 0,
    s = [];
  for (let i = 0; i < e.length; ++i) {
    let a = e[i];
    r.setPosition(o);
    let [u, f] = he(r, a, { staticPosition: 0 });
    (o += f), s.push(u);
  }
  return s;
}
function he(e, t, { staticPosition: n }) {
  let r = Tt(t.type);
  if (r) {
    let [o, s] = r;
    return js(e, v(m({}, t), { type: s }), { length: o, staticPosition: n });
  }
  if (t.type === "tuple") return Cs(e, t, { staticPosition: n });
  if (t.type === "address") return Bs(e);
  if (t.type === "bool") return Rs(e);
  if (t.type.startsWith("bytes")) return zs(e, t, { staticPosition: n });
  if (t.type.startsWith("uint") || t.type.startsWith("int")) return Os(e, t);
  if (t.type === "string") return Fs(e, { staticPosition: n });
  throw new wt(t.type, { docsPath: "/docs/contract/decodeAbiParameters" });
}
var to = 32,
  cn = 32;
function Bs(e) {
  let t = e.readBytes(32);
  return [ke(R(Qt(t, -20))), 32];
}
function js(e, t, { length: n, staticPosition: r }) {
  if (!n) {
    let i = N(e.readBytes(cn)),
      a = r + i,
      u = a + to;
    e.setPosition(a);
    let f = N(e.readBytes(to)),
      d = Ne(t),
      p = 0,
      b = [];
    for (let l = 0; l < f; ++l) {
      e.setPosition(u + (d ? l * 32 : p));
      let [y, x] = he(e, t, { staticPosition: u });
      (p += x), b.push(y);
    }
    return e.setPosition(r + 32), [b, 32];
  }
  if (Ne(t)) {
    let i = N(e.readBytes(cn)),
      a = r + i,
      u = [];
    for (let f = 0; f < n; ++f) {
      e.setPosition(a + f * 32);
      let [d] = he(e, t, { staticPosition: a });
      u.push(d);
    }
    return e.setPosition(r + 32), [u, 32];
  }
  let o = 0,
    s = [];
  for (let i = 0; i < n; ++i) {
    let [a, u] = he(e, t, { staticPosition: r + o });
    (o += u), s.push(a);
  }
  return [s, o];
}
function Rs(e) {
  return [Xr(e.readBytes(32), { size: 32 }), 32];
}
function zs(e, t, { staticPosition: n }) {
  let [r, o] = t.type.split("bytes");
  if (!o) {
    let i = N(e.readBytes(32));
    e.setPosition(n + i);
    let a = N(e.readBytes(32));
    if (a === 0) return e.setPosition(n + 32), ["0x", 32];
    let u = e.readBytes(a);
    return e.setPosition(n + 32), [R(u), 32];
  }
  return [R(e.readBytes(Number.parseInt(o, 10), 32)), 32];
}
function Os(e, t) {
  let n = t.type.startsWith("int"),
    r = Number.parseInt(t.type.split("int")[1] || "256", 10),
    o = e.readBytes(32);
  return [r > 48 ? Yr(o, { signed: n }) : N(o, { signed: n }), 32];
}
function Cs(e, t, { staticPosition: n }) {
  let r = t.components.length === 0 || t.components.some(({ name: i }) => !i),
    o = r ? [] : {},
    s = 0;
  if (Ne(t)) {
    let i = N(e.readBytes(cn)),
      a = n + i;
    for (let u = 0; u < t.components.length; ++u) {
      let f = t.components[u];
      e.setPosition(a + s);
      let [d, p] = he(e, f, { staticPosition: a });
      (s += p), (o[r ? u : f?.name] = d);
    }
    return e.setPosition(n + 32), [o, 32];
  }
  for (let i = 0; i < t.components.length; ++i) {
    let a = t.components[i],
      [u, f] = he(e, a, { staticPosition: n });
    (o[r ? i : a?.name] = u), (s += f);
  }
  return [o, s];
}
function Fs(e, { staticPosition: t }) {
  let n = N(e.readBytes(32)),
    r = t + n;
  e.setPosition(r);
  let o = N(e.readBytes(32));
  if (o === 0) return e.setPosition(t + 32), ["", 32];
  let s = e.readBytes(o, 32),
    i = Qr(re(s));
  return e.setPosition(t + 32), [i, 32];
}
function Ne(e) {
  let { type: t } = e;
  if (t === "string" || t === "bytes" || t.endsWith("[]")) return !0;
  if (t === "tuple") return e.components?.some(Ne);
  let n = Tt(e.type);
  return !!(n && Ne(v(m({}, e), { type: n[1] })));
}
function St(e) {
  let { abi: t, data: n } = e,
    r = k(n, 0, 4);
  if (r === "0x") throw new fe();
  let s = [...(t || []), ut, Hr].find(
    (i) => i.type === "error" && r === U(M(i))
  );
  if (!s) throw new pe(r, { docsPath: "/docs/contract/decodeErrorResult" });
  return {
    abiItem: s,
    args:
      "inputs" in s && s.inputs && s.inputs.length > 0
        ? xe(s.inputs, k(n, 4))
        : void 0,
    errorName: s.name,
  };
}
var D = (e, t, n) =>
  JSON.stringify(
    e,
    (r, o) => {
      let s = typeof o == "bigint" ? o.toString() : o;
      return typeof t == "function" ? t(r, s) : s;
    },
    n
  );
function fn({
  abiItem: e,
  args: t,
  includeFunctionName: n = !0,
  includeName: r = !1,
}) {
  if ("name" in e && "inputs" in e && e.inputs)
    return `${n ? e.name : ""}(${e.inputs
      .map(
        (o, s) =>
          `${r && o.name ? `${o.name}: ` : ""}${
            typeof t[s] == "object" ? D(t[s]) : t[s]
          }`
      )
      .join(", ")})`;
}
var no = Mt;
function L(e) {
  let { abi: t, args: n = [], name: r } = e,
    o = j(r, { strict: !1 }),
    s = t.filter((a) =>
      o
        ? a.type === "function"
          ? U(a) === r
          : a.type === "event"
          ? no(a) === r
          : !1
        : "name" in a && a.name === r
    );
  if (s.length === 0) return;
  if (s.length === 1) return s[0];
  let i;
  for (let a of s) {
    if (!("inputs" in a)) continue;
    if (!n || n.length === 0) {
      if (!a.inputs || a.inputs.length === 0) return a;
      continue;
    }
    if (!a.inputs || a.inputs.length === 0 || a.inputs.length !== n.length)
      continue;
    if (
      n.every((f, d) => {
        let p = "inputs" in a && a.inputs[d];
        return p ? pn(f, p) : !1;
      })
    ) {
      if (i && "inputs" in i && i.inputs) {
        let f = ro(a.inputs, i.inputs, n);
        if (f)
          throw new xt({ abiItem: a, type: f[0] }, { abiItem: i, type: f[1] });
      }
      i = a;
    }
  }
  return i || s[0];
}
function pn(e, t) {
  let n = typeof e,
    r = t.type;
  switch (r) {
    case "address":
      return $(e, { strict: !1 });
    case "bool":
      return n === "boolean";
    case "function":
      return n === "string";
    case "string":
      return n === "string";
    default:
      return r === "tuple" && "components" in t
        ? Object.values(t.components).every((o, s) =>
            pn(Object.values(e)[s], o)
          )
        : /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/.test(
            r
          )
        ? n === "number" || n === "bigint"
        : /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/.test(r)
        ? n === "string" || e instanceof Uint8Array
        : /[a-z]+[1-9]{0,3}(\[[0-9]{0,}\])+$/.test(r)
        ? Array.isArray(e) &&
          e.every((o) =>
            pn(o, v(m({}, t), { type: r.replace(/(\[[0-9]{0,}\])$/, "") }))
          )
        : !1;
  }
}
function ro(e, t, n) {
  for (let r in e) {
    let o = e[r],
      s = t[r];
    if (
      o.type === "tuple" &&
      s.type === "tuple" &&
      "components" in o &&
      "components" in s
    )
      return ro(o.components, s.components, n[r]);
    let i = [o.type, s.type];
    if (
      i.includes("address") && i.includes("bytes20")
        ? !0
        : i.includes("address") && i.includes("string")
        ? $(n[r], { strict: !1 })
        : i.includes("address") && i.includes("bytes")
        ? $(n[r], { strict: !1 })
        : !1
    )
      return i;
  }
}
var oo = { gwei: 9, wei: 18 },
  so = { ether: -9, wei: 9 },
  Ou = { ether: -18, gwei: -9 };
function Bt(e, t) {
  let n = e.toString(),
    r = n.startsWith("-");
  r && (n = n.slice(1)), (n = n.padStart(t, "0"));
  let [o, s] = [n.slice(0, n.length - t), n.slice(n.length - t)];
  return (
    (s = s.replace(/(0+)$/, "")),
    `${r ? "-" : ""}${o || "0"}${s ? `.${s}` : ""}`
  );
}
function jt(e, t = "wei") {
  return Bt(e, oo[t]);
}
function B(e, t = "wei") {
  return Bt(e, so[t]);
}
var Rt = class extends c {
    constructor({ address: t }) {
      super(`State for account "${t}" is set multiple times.`, {
        name: "AccountStateConflictError",
      });
    }
  },
  zt = class extends c {
    constructor() {
      super("state and stateDiff are set on the same account.", {
        name: "StateAssignmentConflictError",
      });
    }
  };
function io(e) {
  return e.reduce(
    (t, { slot: n, value: r }) => `${t}        ${n}: ${r}
`,
    ""
  );
}
function ao(e) {
  return e
    .reduce(
      (t, o) => {
        var s = o,
          { address: n } = s,
          r = G(s, ["address"]);
        let i = `${t}    ${n}:
`;
        return (
          r.nonce &&
            (i += `      nonce: ${r.nonce}
`),
          r.balance &&
            (i += `      balance: ${r.balance}
`),
          r.code &&
            (i += `      code: ${r.code}
`),
          r.state &&
            ((i += `      state:
`),
            (i += io(r.state))),
          r.stateDiff &&
            ((i += `      stateDiff:
`),
            (i += io(r.stateDiff))),
          i
        );
      },
      `  State Override:
`
    )
    .slice(0, -1);
}
function He(e) {
  let t = Object.entries(e)
      .map(([r, o]) => (o === void 0 || o === !1 ? null : [r, o]))
      .filter(Boolean),
    n = t.reduce((r, [o]) => Math.max(r, o.length), 0);
  return t.map(([r, o]) => `  ${`${r}:`.padEnd(n + 1)}  ${o}`).join(`
`);
}
var Ot = class extends c {
  constructor() {
    super(
      [
        "Cannot specify both a `gasPrice` and a `maxFeePerGas`/`maxPriorityFeePerGas`.",
        "Use `maxFeePerGas`/`maxPriorityFeePerGas` for EIP-1559 compatible networks, and `gasPrice` for others.",
      ].join(`
`),
      { name: "FeeConflictError" }
    );
  }
};
var uo = class extends c {
  constructor({ transaction: t }) {
    super("Cannot infer a transaction type from provided transaction.", {
      metaMessages: [
        "Provided Transaction:",
        "{",
        He(t),
        "}",
        "",
        "To infer the type, either provide:",
        "- a `type` to the Transaction, or",
        "- an EIP-1559 Transaction with `maxFeePerGas`, or",
        "- an EIP-2930 Transaction with `gasPrice` & `accessList`, or",
        "- an EIP-4844 Transaction with `blobs`, `blobVersionedHashes`, `sidecars`, or",
        "- an EIP-7702 Transaction with `authorizationList`, or",
        "- a Legacy Transaction with `gasPrice`",
      ],
      name: "InvalidSerializableTransactionError",
    });
  }
};
var co = class extends c {
    constructor(
      t,
      {
        account: n,
        docsPath: r,
        chain: o,
        data: s,
        gas: i,
        gasPrice: a,
        maxFeePerGas: u,
        maxPriorityFeePerGas: f,
        nonce: d,
        to: p,
        value: b,
      }
    ) {
      let l = He({
        chain: o && `${o?.name} (id: ${o?.id})`,
        from: n?.address,
        to: p,
        value:
          typeof b < "u" && `${jt(b)} ${o?.nativeCurrency?.symbol || "ETH"}`,
        data: s,
        gas: i,
        gasPrice: typeof a < "u" && `${B(a)} gwei`,
        maxFeePerGas: typeof u < "u" && `${B(u)} gwei`,
        maxPriorityFeePerGas: typeof f < "u" && `${B(f)} gwei`,
        nonce: d,
      });
      super(t.shortMessage, {
        cause: t,
        docsPath: r,
        metaMessages: [
          ...(t.metaMessages ? [...t.metaMessages, " "] : []),
          "Request Arguments:",
          l,
        ].filter(Boolean),
        name: "TransactionExecutionError",
      }),
        Object.defineProperty(this, "cause", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        (this.cause = t);
    }
  },
  fo = class extends c {
    constructor({
      blockHash: t,
      blockNumber: n,
      blockTag: r,
      hash: o,
      index: s,
    }) {
      let i = "Transaction";
      r &&
        s !== void 0 &&
        (i = `Transaction at block time "${r}" at index "${s}"`),
        t &&
          s !== void 0 &&
          (i = `Transaction at block hash "${t}" at index "${s}"`),
        n &&
          s !== void 0 &&
          (i = `Transaction at block number "${n}" at index "${s}"`),
        o && (i = `Transaction with hash "${o}"`),
        super(`${i} could not be found.`, { name: "TransactionNotFoundError" });
    }
  },
  po = class extends c {
    constructor({ hash: t }) {
      super(
        `Transaction receipt with hash "${t}" could not be found. The Transaction may not be processed on a block yet.`,
        { name: "TransactionReceiptNotFoundError" }
      );
    }
  },
  lo = class extends c {
    constructor({ hash: t }) {
      super(
        `Timed out while waiting for transaction with hash "${t}" to be confirmed.`,
        { name: "WaitForTransactionReceiptTimeoutError" }
      );
    }
  };
var mo = (e) => e,
  se = (e) => e;
var Ct = class extends c {
    constructor(
      t,
      {
        account: n,
        docsPath: r,
        chain: o,
        data: s,
        gas: i,
        gasPrice: a,
        maxFeePerGas: u,
        maxPriorityFeePerGas: f,
        nonce: d,
        to: p,
        value: b,
        stateOverride: l,
      }
    ) {
      let y = n ? ce(n) : void 0,
        x = He({
          from: y?.address,
          to: p,
          value:
            typeof b < "u" && `${jt(b)} ${o?.nativeCurrency?.symbol || "ETH"}`,
          data: s,
          gas: i,
          gasPrice: typeof a < "u" && `${B(a)} gwei`,
          maxFeePerGas: typeof u < "u" && `${B(u)} gwei`,
          maxPriorityFeePerGas: typeof f < "u" && `${B(f)} gwei`,
          nonce: d,
        });
      l &&
        (x += `
${ao(l)}`),
        super(t.shortMessage, {
          cause: t,
          docsPath: r,
          metaMessages: [
            ...(t.metaMessages ? [...t.metaMessages, " "] : []),
            "Raw Call Arguments:",
            x,
          ].filter(Boolean),
          name: "CallExecutionError",
        }),
        Object.defineProperty(this, "cause", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        (this.cause = t);
    }
  },
  bo = class extends c {
    constructor(
      t,
      {
        abi: n,
        args: r,
        contractAddress: o,
        docsPath: s,
        functionName: i,
        sender: a,
      }
    ) {
      let u = L({ abi: n, args: r, name: i }),
        f = u
          ? fn({
              abiItem: u,
              args: r,
              includeFunctionName: !1,
              includeName: !1,
            })
          : void 0,
        d = u ? M(u, { includeName: !0 }) : void 0,
        p = He({
          address: o && mo(o),
          function: d,
          args:
            f &&
            f !== "()" &&
            `${[...Array(i?.length ?? 0).keys()].map(() => " ").join("")}${f}`,
          sender: a,
        });
      super(
        t.shortMessage ||
          `An unknown error occurred while executing the contract function "${i}".`,
        {
          cause: t,
          docsPath: s,
          metaMessages: [
            ...(t.metaMessages ? [...t.metaMessages, " "] : []),
            p && "Contract Call:",
            p,
          ].filter(Boolean),
          name: "ContractFunctionExecutionError",
        }
      ),
        Object.defineProperty(this, "abi", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "args", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "cause", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "contractAddress", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "formattedArgs", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "functionName", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "sender", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        (this.abi = n),
        (this.args = r),
        (this.cause = t),
        (this.contractAddress = o),
        (this.functionName = i),
        (this.sender = a);
    }
  },
  yo = class extends c {
    constructor({ abi: t, data: n, functionName: r, message: o }) {
      let s, i, a, u;
      if (n && n !== "0x")
        try {
          i = St({ abi: t, data: n });
          let { abiItem: d, errorName: p, args: b } = i;
          if (p === "Error") u = b[0];
          else if (p === "Panic") {
            let [l] = b;
            u = Nr[l];
          } else {
            let l = d ? M(d, { includeName: !0 }) : void 0,
              y =
                d && b
                  ? fn({
                      abiItem: d,
                      args: b,
                      includeFunctionName: !1,
                      includeName: !1,
                    })
                  : void 0;
            a = [
              l ? `Error: ${l}` : "",
              y && y !== "()"
                ? `       ${[...Array(p?.length ?? 0).keys()]
                    .map(() => " ")
                    .join("")}${y}`
                : "",
            ];
          }
        } catch (d) {
          s = d;
        }
      else o && (u = o);
      let f;
      s instanceof pe &&
        ((f = s.signature),
        (a = [
          `Unable to decode signature "${f}" as it was not found on the provided ABI.`,
          "Make sure you are using the correct ABI and that the error exists on it.",
          `You can look up the decoded signature here: https://openchain.xyz/signatures?query=${f}.`,
        ])),
        super(
          (u && u !== "execution reverted") || f
            ? [
                `The contract function "${r}" reverted with the following ${
                  f ? "signature" : "reason"
                }:`,
                u || f,
              ].join(`
`)
            : `The contract function "${r}" reverted.`,
          { cause: s, metaMessages: a, name: "ContractFunctionRevertedError" }
        ),
        Object.defineProperty(this, "data", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "raw", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "reason", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "signature", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        (this.data = i),
        (this.raw = n),
        (this.reason = u),
        (this.signature = f);
    }
  },
  ho = class extends c {
    constructor({ functionName: t }) {
      super(`The contract function "${t}" returned no data ("0x").`, {
        metaMessages: [
          "This could be due to any of the following:",
          `  - The contract does not have the function "${t}",`,
          "  - The parameters passed to the contract function may be invalid, or",
          "  - The address is not a contract.",
        ],
        name: "ContractFunctionZeroDataError",
      });
    }
  },
  Ft = class extends c {
    constructor({ factory: t }) {
      super(
        `Deployment for counterfactual contract call failed${
          t ? ` for factory "${t}".` : ""
        }`,
        {
          metaMessages: [
            "Please ensure:",
            "- The `factory` is a valid contract deployment factory (ie. Create2 Factory, ERC-4337 Factory, etc).",
            "- The `factoryData` is a valid encoded function call for contract deployment function on the factory.",
          ],
          name: "CounterfactualDeploymentFailedError",
        }
      );
    }
  },
  kt = class extends c {
    constructor({ data: t, message: n }) {
      super(n || "", { name: "RawContractError" }),
        Object.defineProperty(this, "code", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: 3,
        }),
        Object.defineProperty(this, "data", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        (this.data = t);
    }
  };
var dn = "/docs/contract/decodeFunctionResult";
function xo(e) {
  let { abi: t, args: n, functionName: r, data: o } = e,
    s = t[0];
  if (r) {
    let a = L({ abi: t, args: n, name: r });
    if (!a) throw new C(r, { docsPath: dn });
    s = a;
  }
  if (s.type !== "function") throw new C(void 0, { docsPath: dn });
  if (!s.outputs) throw new de(s.name, { docsPath: dn });
  let i = xe(s.outputs, o);
  if (i && i.length > 1) return i;
  if (i && i.length === 1) return i[0];
}
var ln = "/docs/contract/encodeDeployData";
function mn(e) {
  let { abi: t, args: n, bytecode: r } = e;
  if (!n || n.length === 0) return r;
  let o = t.find((i) => "type" in i && i.type === "constructor");
  if (!o) throw new pt({ docsPath: ln });
  if (!("inputs" in o)) throw new Re({ docsPath: ln });
  if (!o.inputs || o.inputs.length === 0) throw new Re({ docsPath: ln });
  let s = H(o.inputs, n);
  return oe([r, s]);
}
var go = "/docs/contract/encodeFunctionData";
function wo(e) {
  let { abi: t, args: n, functionName: r } = e,
    o = t[0];
  if (r) {
    let s = L({ abi: t, args: n, name: r });
    if (!s) throw new C(r, { docsPath: go });
    o = s;
  }
  if (o.type !== "function") throw new C(void 0, { docsPath: go });
  return { abi: [o], functionName: U(M(o)) };
}
function vo(e) {
  let { args: t } = e,
    { abi: n, functionName: r } =
      e.abi.length === 1 && e.functionName?.startsWith("0x") ? e : wo(e),
    o = n[0],
    s = r,
    i = "inputs" in o && o.inputs ? H(o.inputs, t ?? []) : void 0;
  return oe([s, i ?? "0x"]);
}
function $o({ blockNumber: e, chain: t, contract: n }) {
  let r = t?.contracts?.[n];
  if (!r) throw new ne({ chain: t, contract: { name: n } });
  if (e && r.blockCreated && r.blockCreated > e)
    throw new ne({
      blockNumber: e,
      chain: t,
      contract: { name: n, blockCreated: r.blockCreated },
    });
  return r.address;
}
var _ = class extends c {
  constructor({ cause: t, message: n } = {}) {
    let r = n
      ?.replace("execution reverted: ", "")
      ?.replace("execution reverted", "");
    super(
      `Execution reverted ${
        r ? `with reason: ${r}` : "for an unknown reason"
      }.`,
      { cause: t, name: "ExecutionRevertedError" }
    );
  }
};
Object.defineProperty(_, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 3,
});
Object.defineProperty(_, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /execution reverted/,
});
var X = class extends c {
  constructor({ cause: t, maxFeePerGas: n } = {}) {
    super(
      `The fee cap (\`maxFeePerGas\`${
        n ? ` = ${B(n)} gwei` : ""
      }) cannot be higher than the maximum allowed value (2^256-1).`,
      { cause: t, name: "FeeCapTooHighError" }
    );
  }
};
Object.defineProperty(X, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /max fee per gas higher than 2\^256-1|fee cap higher than 2\^256-1/,
});
var ge = class extends c {
  constructor({ cause: t, maxFeePerGas: n } = {}) {
    super(
      `The fee cap (\`maxFeePerGas\`${
        n ? ` = ${B(n)}` : ""
      } gwei) cannot be lower than the block base fee.`,
      { cause: t, name: "FeeCapTooLowError" }
    );
  }
};
Object.defineProperty(ge, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value:
    /max fee per gas less than block base fee|fee cap less than block base fee|transaction is outdated/,
});
var we = class extends c {
  constructor({ cause: t, nonce: n } = {}) {
    super(
      `Nonce provided for the transaction ${
        n ? `(${n}) ` : ""
      }is higher than the next one expected.`,
      { cause: t, name: "NonceTooHighError" }
    );
  }
};
Object.defineProperty(we, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /nonce too high/,
});
var ve = class extends c {
  constructor({ cause: t, nonce: n } = {}) {
    super(
      [
        `Nonce provided for the transaction ${
          n ? `(${n}) ` : ""
        }is lower than the current nonce of the account.`,
        "Try increasing the nonce or find the latest nonce with `getTransactionCount`.",
      ].join(`
`),
      { cause: t, name: "NonceTooLowError" }
    );
  }
};
Object.defineProperty(ve, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /nonce too low|transaction already imported|already known/,
});
var $e = class extends c {
  constructor({ cause: t, nonce: n } = {}) {
    super(
      `Nonce provided for the transaction ${
        n ? `(${n}) ` : ""
      }exceeds the maximum allowed nonce.`,
      { cause: t, name: "NonceMaxValueError" }
    );
  }
};
Object.defineProperty($e, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /nonce has max value/,
});
var Pe = class extends c {
  constructor({ cause: t } = {}) {
    super(
      [
        "The total cost (gas * gas fee + value) of executing this transaction exceeds the balance of the account.",
      ].join(`
`),
      {
        cause: t,
        metaMessages: [
          "This error could arise when the account does not have enough funds to:",
          " - pay for the total gas fee,",
          " - pay for the value to send.",
          " ",
          "The cost of the transaction is calculated as `gas * gas fee + value`, where:",
          " - `gas` is the amount of gas needed for transaction to execute,",
          " - `gas fee` is the gas fee,",
          " - `value` is the amount of ether to send to the recipient.",
        ],
        name: "InsufficientFundsError",
      }
    );
  }
};
Object.defineProperty(Pe, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /insufficient funds|exceeds transaction sender account balance/,
});
var Ae = class extends c {
  constructor({ cause: t, gas: n } = {}) {
    super(
      `The amount of gas ${
        n ? `(${n}) ` : ""
      }provided for the transaction exceeds the limit allowed for the block.`,
      { cause: t, name: "IntrinsicGasTooHighError" }
    );
  }
};
Object.defineProperty(Ae, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /intrinsic gas too high|gas limit reached/,
});
var Me = class extends c {
  constructor({ cause: t, gas: n } = {}) {
    super(
      `The amount of gas ${
        n ? `(${n}) ` : ""
      }provided for the transaction is too low.`,
      { cause: t, name: "IntrinsicGasTooLowError" }
    );
  }
};
Object.defineProperty(Me, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /intrinsic gas too low/,
});
var Ee = class extends c {
  constructor({ cause: t }) {
    super("The transaction type is not supported for this chain.", {
      cause: t,
      name: "TransactionTypeNotSupportedError",
    });
  }
};
Object.defineProperty(Ee, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /transaction type not valid/,
});
var Q = class extends c {
  constructor({ cause: t, maxPriorityFeePerGas: n, maxFeePerGas: r } = {}) {
    super(
      [
        `The provided tip (\`maxPriorityFeePerGas\`${
          n ? ` = ${B(n)} gwei` : ""
        }) cannot be higher than the fee cap (\`maxFeePerGas\`${
          r ? ` = ${B(r)} gwei` : ""
        }).`,
      ].join(`
`),
      { cause: t, name: "TipAboveFeeCapError" }
    );
  }
};
Object.defineProperty(Q, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value:
    /max priority fee per gas higher than max fee per gas|tip higher than fee cap/,
});
var Ie = class extends c {
  constructor({ cause: t }) {
    super(`An error occurred while executing: ${t?.shortMessage}`, {
      cause: t,
      name: "UnknownNodeError",
    });
  }
};
var De = class extends c {
  constructor({
    body: t,
    cause: n,
    details: r,
    headers: o,
    status: s,
    url: i,
  }) {
    super("HTTP request failed.", {
      cause: n,
      details: r,
      metaMessages: [
        s && `Status: ${s}`,
        `URL: ${se(i)}`,
        t && `Request body: ${D(t)}`,
      ].filter(Boolean),
      name: "HttpRequestError",
    }),
      Object.defineProperty(this, "body", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "headers", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "status", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "url", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.body = t),
      (this.headers = o),
      (this.status = s),
      (this.url = i);
  }
};
var Ut = class extends c {
  constructor({ body: t, error: n, url: r }) {
    super("RPC Request failed.", {
      cause: n,
      details: n.message,
      metaMessages: [`URL: ${se(r)}`, `Request body: ${D(t)}`],
      name: "RpcRequestError",
    }),
      Object.defineProperty(this, "code", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "data", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.code = n.code),
      (this.data = n.data);
  }
};
var Po = class extends c {
  constructor({ body: t, url: n }) {
    super("The request took too long to respond.", {
      details: "The request timed out.",
      metaMessages: [`URL: ${se(n)}`, `Request body: ${D(t)}`],
      name: "TimeoutError",
    });
  }
};
var ks = -1,
  P = class extends c {
    constructor(
      t,
      { code: n, docsPath: r, metaMessages: o, name: s, shortMessage: i }
    ) {
      super(i, {
        cause: t,
        docsPath: r,
        metaMessages: o || t?.metaMessages,
        name: s || "RpcError",
      }),
        Object.defineProperty(this, "code", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        (this.name = s || t.name),
        (this.code = t instanceof Ut ? t.code : n ?? ks);
    }
  },
  A = class extends P {
    constructor(t, n) {
      super(t, n),
        Object.defineProperty(this, "data", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        (this.data = n.data);
    }
  },
  bn = class e extends P {
    constructor(t) {
      super(t, {
        code: e.code,
        name: "ParseRpcError",
        shortMessage:
          "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.",
      });
    }
  };
Object.defineProperty(bn, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32700,
});
var yn = class e extends P {
  constructor(t) {
    super(t, {
      code: e.code,
      name: "InvalidRequestRpcError",
      shortMessage: "JSON is not a valid request object.",
    });
  }
};
Object.defineProperty(yn, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32600,
});
var hn = class e extends P {
  constructor(t, { method: n } = {}) {
    super(t, {
      code: e.code,
      name: "MethodNotFoundRpcError",
      shortMessage: `The method${
        n ? ` "${n}"` : ""
      } does not exist / is not available.`,
    });
  }
};
Object.defineProperty(hn, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32601,
});
var xn = class e extends P {
  constructor(t) {
    super(t, {
      code: e.code,
      name: "InvalidParamsRpcError",
      shortMessage: [
        "Invalid parameters were provided to the RPC method.",
        "Double check you have provided the correct parameters.",
      ].join(`
`),
    });
  }
};
Object.defineProperty(xn, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32602,
});
var gn = class e extends P {
  constructor(t) {
    super(t, {
      code: e.code,
      name: "InternalRpcError",
      shortMessage: "An internal error was received.",
    });
  }
};
Object.defineProperty(gn, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32603,
});
var wn = class e extends P {
  constructor(t) {
    super(t, {
      code: e.code,
      name: "InvalidInputRpcError",
      shortMessage: [
        "Missing or invalid parameters.",
        "Double check you have provided the correct parameters.",
      ].join(`
`),
    });
  }
};
Object.defineProperty(wn, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32e3,
});
var vn = class e extends P {
  constructor(t) {
    super(t, {
      code: e.code,
      name: "ResourceNotFoundRpcError",
      shortMessage: "Requested resource not found.",
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "ResourceNotFoundRpcError",
      });
  }
};
Object.defineProperty(vn, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32001,
});
var $n = class e extends P {
  constructor(t) {
    super(t, {
      code: e.code,
      name: "ResourceUnavailableRpcError",
      shortMessage: "Requested resource not available.",
    });
  }
};
Object.defineProperty($n, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32002,
});
var Pn = class e extends P {
  constructor(t) {
    super(t, {
      code: e.code,
      name: "TransactionRejectedRpcError",
      shortMessage: "Transaction creation failed.",
    });
  }
};
Object.defineProperty(Pn, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32003,
});
var An = class e extends P {
  constructor(t, { method: n } = {}) {
    super(t, {
      code: e.code,
      name: "MethodNotSupportedRpcError",
      shortMessage: `Method${n ? ` "${n}"` : ""} is not supported.`,
    });
  }
};
Object.defineProperty(An, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32004,
});
var Mn = class e extends P {
  constructor(t) {
    super(t, {
      code: e.code,
      name: "LimitExceededRpcError",
      shortMessage: "Request exceeds defined limit.",
    });
  }
};
Object.defineProperty(Mn, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32005,
});
var En = class e extends P {
  constructor(t) {
    super(t, {
      code: e.code,
      name: "JsonRpcVersionUnsupportedError",
      shortMessage: "Version of JSON-RPC protocol is not supported.",
    });
  }
};
Object.defineProperty(En, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32006,
});
var In = class e extends A {
  constructor(t) {
    super(t, {
      code: e.code,
      name: "UserRejectedRequestError",
      shortMessage: "User rejected the request.",
    });
  }
};
Object.defineProperty(In, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 4001,
});
var Tn = class e extends A {
  constructor(t) {
    super(t, {
      code: e.code,
      name: "UnauthorizedProviderError",
      shortMessage:
        "The requested method and/or account has not been authorized by the user.",
    });
  }
};
Object.defineProperty(Tn, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 4100,
});
var Sn = class e extends A {
  constructor(t, { method: n } = {}) {
    super(t, {
      code: e.code,
      name: "UnsupportedProviderMethodError",
      shortMessage: `The Provider does not support the requested method${
        n ? ` " ${n}"` : ""
      }.`,
    });
  }
};
Object.defineProperty(Sn, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 4200,
});
var Bn = class e extends A {
  constructor(t) {
    super(t, {
      code: e.code,
      name: "ProviderDisconnectedError",
      shortMessage: "The Provider is disconnected from all chains.",
    });
  }
};
Object.defineProperty(Bn, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 4900,
});
var jn = class e extends A {
  constructor(t) {
    super(t, {
      code: e.code,
      name: "ChainDisconnectedError",
      shortMessage: "The Provider is not connected to the requested chain.",
    });
  }
};
Object.defineProperty(jn, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 4901,
});
var Rn = class e extends A {
  constructor(t) {
    super(t, {
      code: e.code,
      name: "SwitchChainError",
      shortMessage: "An error occurred when attempting to switch chain.",
    });
  }
};
Object.defineProperty(Rn, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 4902,
});
var zn = class e extends A {
  constructor(t) {
    super(t, {
      code: e.code,
      name: "UnsupportedNonOptionalCapabilityError",
      shortMessage:
        "This Wallet does not support a capability that was not marked as optional.",
    });
  }
};
Object.defineProperty(zn, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 5700,
});
var On = class e extends A {
  constructor(t) {
    super(t, {
      code: e.code,
      name: "UnsupportedChainIdError",
      shortMessage: "This Wallet does not support the requested chain ID.",
    });
  }
};
Object.defineProperty(On, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 5710,
});
var Cn = class e extends A {
  constructor(t) {
    super(t, {
      code: e.code,
      name: "DuplicateIdError",
      shortMessage: "There is already a bundle submitted with this ID.",
    });
  }
};
Object.defineProperty(Cn, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 5720,
});
var Fn = class e extends A {
  constructor(t) {
    super(t, {
      code: e.code,
      name: "UnknownBundleIdError",
      shortMessage: "This bundle id is unknown / has not been submitted",
    });
  }
};
Object.defineProperty(Fn, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 5730,
});
var kn = class e extends A {
  constructor(t) {
    super(t, {
      code: e.code,
      name: "BundleTooLargeError",
      shortMessage: "The call bundle is too large for the Wallet to process.",
    });
  }
};
Object.defineProperty(kn, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 5740,
});
var Un = class e extends A {
  constructor(t) {
    super(t, {
      code: e.code,
      name: "AtomicReadyWalletRejectedUpgradeError",
      shortMessage:
        "The Wallet can support atomicity after an upgrade, but the user rejected the upgrade.",
    });
  }
};
Object.defineProperty(Un, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 5750,
});
var Nn = class e extends A {
  constructor(t) {
    super(t, {
      code: e.code,
      name: "AtomicityNotSupportedError",
      shortMessage:
        "The wallet does not support atomic execution but the request requires it.",
    });
  }
};
Object.defineProperty(Nn, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 5760,
});
var Ao = class extends P {
  constructor(t) {
    super(t, {
      name: "UnknownRpcError",
      shortMessage: "An unknown RPC error occurred.",
    });
  }
};
function Mo(e, t) {
  let n = (e.details || "").toLowerCase(),
    r = e instanceof c ? e.walk((o) => o?.code === _.code) : e;
  return r instanceof c
    ? new _({ cause: e, message: r.details })
    : _.nodeMessage.test(n)
    ? new _({ cause: e, message: e.details })
    : X.nodeMessage.test(n)
    ? new X({ cause: e, maxFeePerGas: t?.maxFeePerGas })
    : ge.nodeMessage.test(n)
    ? new ge({ cause: e, maxFeePerGas: t?.maxFeePerGas })
    : we.nodeMessage.test(n)
    ? new we({ cause: e, nonce: t?.nonce })
    : ve.nodeMessage.test(n)
    ? new ve({ cause: e, nonce: t?.nonce })
    : $e.nodeMessage.test(n)
    ? new $e({ cause: e, nonce: t?.nonce })
    : Pe.nodeMessage.test(n)
    ? new Pe({ cause: e })
    : Ae.nodeMessage.test(n)
    ? new Ae({ cause: e, gas: t?.gas })
    : Me.nodeMessage.test(n)
    ? new Me({ cause: e, gas: t?.gas })
    : Ee.nodeMessage.test(n)
    ? new Ee({ cause: e })
    : Q.nodeMessage.test(n)
    ? new Q({
        cause: e,
        maxFeePerGas: t?.maxFeePerGas,
        maxPriorityFeePerGas: t?.maxPriorityFeePerGas,
      })
    : new Ie({ cause: e });
}
function Eo(e, r) {
  var o = r,
    { docsPath: t } = o,
    n = G(o, ["docsPath"]);
  let s = (() => {
    let i = Mo(e, n);
    return i instanceof Ie ? e : i;
  })();
  return new Ct(s, m({ docsPath: t }, n));
}
function Io(e, { format: t }) {
  if (!t) return {};
  let n = {};
  function r(s) {
    let i = Object.keys(s);
    for (let a of i)
      a in e && (n[a] = e[a]),
        s[a] && typeof s[a] == "object" && !Array.isArray(s[a]) && r(s[a]);
  }
  let o = t(e || {});
  return r(o), n;
}
var Us = {
  legacy: "0x0",
  eip2930: "0x1",
  eip1559: "0x2",
  eip4844: "0x3",
  eip7702: "0x4",
};
function To(e) {
  let t = {};
  return (
    typeof e.authorizationList < "u" &&
      (t.authorizationList = Ns(e.authorizationList)),
    typeof e.accessList < "u" && (t.accessList = e.accessList),
    typeof e.blobVersionedHashes < "u" &&
      (t.blobVersionedHashes = e.blobVersionedHashes),
    typeof e.blobs < "u" &&
      (typeof e.blobs[0] != "string"
        ? (t.blobs = e.blobs.map((n) => R(n)))
        : (t.blobs = e.blobs)),
    typeof e.data < "u" && (t.data = e.data),
    typeof e.from < "u" && (t.from = e.from),
    typeof e.gas < "u" && (t.gas = h(e.gas)),
    typeof e.gasPrice < "u" && (t.gasPrice = h(e.gasPrice)),
    typeof e.maxFeePerBlobGas < "u" &&
      (t.maxFeePerBlobGas = h(e.maxFeePerBlobGas)),
    typeof e.maxFeePerGas < "u" && (t.maxFeePerGas = h(e.maxFeePerGas)),
    typeof e.maxPriorityFeePerGas < "u" &&
      (t.maxPriorityFeePerGas = h(e.maxPriorityFeePerGas)),
    typeof e.nonce < "u" && (t.nonce = h(e.nonce)),
    typeof e.to < "u" && (t.to = e.to),
    typeof e.type < "u" && (t.type = Us[e.type]),
    typeof e.value < "u" && (t.value = h(e.value)),
    t
  );
}
function Ns(e) {
  return e.map((t) =>
    m(
      m(
        {
          address: t.address,
          r: t.r ? h(BigInt(t.r)) : t.r,
          s: t.s ? h(BigInt(t.s)) : t.s,
          chainId: h(t.chainId),
          nonce: h(t.nonce),
        },
        typeof t.yParity < "u" ? { yParity: h(t.yParity) } : {}
      ),
      typeof t.v < "u" && typeof t.yParity > "u" ? { v: h(t.v) } : {}
    )
  );
}
function So() {
  let e = () => {},
    t = () => {};
  return {
    promise: new Promise((r, o) => {
      (e = r), (t = o);
    }),
    resolve: e,
    reject: t,
  };
}
var Hn = new Map();
function Bo({ fn: e, id: t, shouldSplitBatch: n, wait: r = 0, sort: o }) {
  let s = () =>
      T(this, null, function* () {
        let p = u();
        i();
        let b = p.map(({ args: l }) => l);
        b.length !== 0 &&
          e(b)
            .then((l) => {
              o && Array.isArray(l) && l.sort(o);
              for (let y = 0; y < p.length; y++) {
                let { resolve: x } = p[y];
                x?.([l[y], l]);
              }
            })
            .catch((l) => {
              for (let y = 0; y < p.length; y++) {
                let { reject: x } = p[y];
                x?.(l);
              }
            });
      }),
    i = () => Hn.delete(t),
    a = () => u().map(({ args: p }) => p),
    u = () => Hn.get(t) || [],
    f = (p) => Hn.set(t, [...u(), p]);
  return {
    flush: i,
    schedule(p) {
      return T(this, null, function* () {
        let { promise: b, resolve: l, reject: y } = So();
        return (
          n?.([...a(), p]) && s(),
          u().length > 0
            ? (f({ args: p, resolve: l, reject: y }), b)
            : (f({ args: p, resolve: l, reject: y }), setTimeout(s, r), b)
        );
      });
    },
  };
}
function jo(e) {
  if (!(!e || e.length === 0))
    return e.reduce((t, { slot: n, value: r }) => {
      if (n.length !== 66)
        throw new Fe({ size: n.length, targetSize: 66, type: "hex" });
      if (r.length !== 66)
        throw new Fe({ size: r.length, targetSize: 66, type: "hex" });
      return (t[n] = r), t;
    }, {});
}
function Hs(e) {
  let { balance: t, nonce: n, state: r, stateDiff: o, code: s } = e,
    i = {};
  if (
    (s !== void 0 && (i.code = s),
    t !== void 0 && (i.balance = h(t)),
    n !== void 0 && (i.nonce = h(n)),
    r !== void 0 && (i.state = jo(r)),
    o !== void 0)
  ) {
    if (i.state) throw new zt();
    i.stateDiff = jo(o);
  }
  return i;
}
function Ro(e) {
  if (!e) return;
  let t = {};
  for (let n of e) {
    let r = n,
      { address: o } = r,
      s = G(r, ["address"]);
    if (!$(o, { strict: !1 })) throw new I({ address: o });
    if (t[o]) throw new Rt({ address: o });
    t[o] = Hs(s);
  }
  return t;
}
var ff = 2n ** (8n - 1n) - 1n,
  pf = 2n ** (16n - 1n) - 1n,
  df = 2n ** (24n - 1n) - 1n,
  lf = 2n ** (32n - 1n) - 1n,
  mf = 2n ** (40n - 1n) - 1n,
  bf = 2n ** (48n - 1n) - 1n,
  yf = 2n ** (56n - 1n) - 1n,
  hf = 2n ** (64n - 1n) - 1n,
  xf = 2n ** (72n - 1n) - 1n,
  gf = 2n ** (80n - 1n) - 1n,
  wf = 2n ** (88n - 1n) - 1n,
  vf = 2n ** (96n - 1n) - 1n,
  $f = 2n ** (104n - 1n) - 1n,
  Pf = 2n ** (112n - 1n) - 1n,
  Af = 2n ** (120n - 1n) - 1n,
  Mf = 2n ** (128n - 1n) - 1n,
  Ef = 2n ** (136n - 1n) - 1n,
  If = 2n ** (144n - 1n) - 1n,
  Tf = 2n ** (152n - 1n) - 1n,
  Sf = 2n ** (160n - 1n) - 1n,
  Bf = 2n ** (168n - 1n) - 1n,
  jf = 2n ** (176n - 1n) - 1n,
  Rf = 2n ** (184n - 1n) - 1n,
  zf = 2n ** (192n - 1n) - 1n,
  Of = 2n ** (200n - 1n) - 1n,
  Cf = 2n ** (208n - 1n) - 1n,
  Ff = 2n ** (216n - 1n) - 1n,
  kf = 2n ** (224n - 1n) - 1n,
  Uf = 2n ** (232n - 1n) - 1n,
  Nf = 2n ** (240n - 1n) - 1n,
  Hf = 2n ** (248n - 1n) - 1n,
  Df = 2n ** (256n - 1n) - 1n,
  Lf = -(2n ** (8n - 1n)),
  Gf = -(2n ** (16n - 1n)),
  Vf = -(2n ** (24n - 1n)),
  Wf = -(2n ** (32n - 1n)),
  qf = -(2n ** (40n - 1n)),
  _f = -(2n ** (48n - 1n)),
  Zf = -(2n ** (56n - 1n)),
  Jf = -(2n ** (64n - 1n)),
  Kf = -(2n ** (72n - 1n)),
  Yf = -(2n ** (80n - 1n)),
  Xf = -(2n ** (88n - 1n)),
  Qf = -(2n ** (96n - 1n)),
  e1 = -(2n ** (104n - 1n)),
  t1 = -(2n ** (112n - 1n)),
  n1 = -(2n ** (120n - 1n)),
  r1 = -(2n ** (128n - 1n)),
  o1 = -(2n ** (136n - 1n)),
  s1 = -(2n ** (144n - 1n)),
  i1 = -(2n ** (152n - 1n)),
  a1 = -(2n ** (160n - 1n)),
  u1 = -(2n ** (168n - 1n)),
  c1 = -(2n ** (176n - 1n)),
  f1 = -(2n ** (184n - 1n)),
  p1 = -(2n ** (192n - 1n)),
  d1 = -(2n ** (200n - 1n)),
  l1 = -(2n ** (208n - 1n)),
  m1 = -(2n ** (216n - 1n)),
  b1 = -(2n ** (224n - 1n)),
  y1 = -(2n ** (232n - 1n)),
  h1 = -(2n ** (240n - 1n)),
  x1 = -(2n ** (248n - 1n)),
  g1 = -(2n ** (256n - 1n)),
  w1 = 2n ** 8n - 1n,
  v1 = 2n ** 16n - 1n,
  $1 = 2n ** 24n - 1n,
  P1 = 2n ** 32n - 1n,
  A1 = 2n ** 40n - 1n,
  M1 = 2n ** 48n - 1n,
  E1 = 2n ** 56n - 1n,
  I1 = 2n ** 64n - 1n,
  T1 = 2n ** 72n - 1n,
  S1 = 2n ** 80n - 1n,
  B1 = 2n ** 88n - 1n,
  j1 = 2n ** 96n - 1n,
  R1 = 2n ** 104n - 1n,
  z1 = 2n ** 112n - 1n,
  O1 = 2n ** 120n - 1n,
  C1 = 2n ** 128n - 1n,
  F1 = 2n ** 136n - 1n,
  k1 = 2n ** 144n - 1n,
  U1 = 2n ** 152n - 1n,
  N1 = 2n ** 160n - 1n,
  H1 = 2n ** 168n - 1n,
  D1 = 2n ** 176n - 1n,
  L1 = 2n ** 184n - 1n,
  G1 = 2n ** 192n - 1n,
  V1 = 2n ** 200n - 1n,
  W1 = 2n ** 208n - 1n,
  q1 = 2n ** 216n - 1n,
  _1 = 2n ** 224n - 1n,
  Z1 = 2n ** 232n - 1n,
  J1 = 2n ** 240n - 1n,
  K1 = 2n ** 248n - 1n,
  zo = 2n ** 256n - 1n;
function Oo(e) {
  let {
      account: t,
      gasPrice: n,
      maxFeePerGas: r,
      maxPriorityFeePerGas: o,
      to: s,
    } = e,
    i = t ? ce(t) : void 0;
  if (i && !$(i.address)) throw new I({ address: i.address });
  if (s && !$(s)) throw new I({ address: s });
  if (typeof n < "u" && (typeof r < "u" || typeof o < "u")) throw new Ot();
  if (r && r > zo) throw new X({ maxFeePerGas: r });
  if (o && r && o > r)
    throw new Q({ maxFeePerGas: r, maxPriorityFeePerGas: o });
}
function Co(e, t) {
  return T(this, null, function* () {
    let Kn = t,
      {
        account: n = e.account,
        authorizationList: r,
        batch: o = !!e.batch?.multicall,
        blockNumber: s,
        blockTag: i = e.experimental_blockTag ?? "latest",
        accessList: a,
        blobs: u,
        blockOverrides: f,
        code: d,
        data: p,
        factory: b,
        factoryData: l,
        gas: y,
        gasPrice: x,
        maxFeePerBlobGas: Z,
        maxFeePerGas: ie,
        maxPriorityFeePerGas: Te,
        nonce: Le,
        to: ae,
        value: Ho,
        stateOverride: Do,
      } = Kn,
      Lo = G(Kn, [
        "account",
        "authorizationList",
        "batch",
        "blockNumber",
        "blockTag",
        "accessList",
        "blobs",
        "blockOverrides",
        "code",
        "data",
        "factory",
        "factoryData",
        "gas",
        "gasPrice",
        "maxFeePerBlobGas",
        "maxFeePerGas",
        "maxPriorityFeePerGas",
        "nonce",
        "to",
        "value",
        "stateOverride",
      ]),
      qn = n ? ce(n) : void 0;
    if (d && (b || l))
      throw new c(
        "Cannot provide both `code` & `factory`/`factoryData` as parameters."
      );
    if (d && ae)
      throw new c("Cannot provide both `code` & `to` as parameters.");
    let _n = d && p,
      Zn = b && l && ae && p,
      Jn = _n || Zn,
      Go = _n
        ? Fo({ code: d, data: p })
        : Zn
        ? Gs({ data: p, factory: b, factoryData: l, to: ae })
        : p;
    try {
      Oo(t);
      let Se = (typeof s == "bigint" ? h(s) : void 0) || i,
        ee = f ? Br(f) : void 0,
        te = Ro(Do),
        Yn = e.chain?.formatters?.transactionRequest?.format,
        Gt = (Yn || To)(
          v(m({}, Io(Lo, { format: Yn })), {
            from: qn?.address,
            accessList: a,
            authorizationList: r,
            blobs: u,
            data: Go,
            gas: y,
            gasPrice: x,
            maxFeePerBlobGas: Z,
            maxFeePerGas: ie,
            maxPriorityFeePerGas: Te,
            nonce: Le,
            to: Jn ? void 0 : ae,
            value: Ho,
          })
        );
      if (o && Ds({ request: Gt }) && !te && !ee)
        try {
          return yield Ls(e, v(m({}, Gt), { blockNumber: s, blockTag: i }));
        } catch (J) {
          if (!(J instanceof je) && !(J instanceof ne)) throw J;
        }
      let Vo = (() => {
          let J = [Gt, Se];
          return te && ee
            ? [...J, te, ee]
            : te
            ? [...J, te]
            : ee
            ? [...J, {}, ee]
            : J;
        })(),
        Xn = yield e.request({ method: "eth_call", params: Vo });
      return Xn === "0x" ? { data: void 0 } : { data: Xn };
    } catch (Lt) {
      let Se = Vs(Lt),
        { offchainLookup: ee, offchainLookupSignature: te } = yield import(
          "./chunk-3QBJOCE2.js"
        );
      if (e.ccipRead !== !1 && Se?.slice(0, 10) === te && ae)
        return { data: yield ee(e, { data: Se, to: ae }) };
      throw Jn && Se?.slice(0, 10) === "0x101bb98d"
        ? new Ft({ factory: b })
        : Eo(Lt, v(m({}, t), { account: qn, chain: e.chain }));
    }
  });
}
function Ds({ request: e }) {
  let o = e,
    { data: t, to: n } = o,
    r = G(o, ["data", "to"]);
  return !(
    !t ||
    t.startsWith(Rr) ||
    !n ||
    Object.values(r).filter((s) => typeof s < "u").length > 0
  );
}
function Ls(e, t) {
  return T(this, null, function* () {
    let {
        batchSize: n = 1024,
        deployless: r = !1,
        wait: o = 0,
      } = typeof e.batch?.multicall == "object" ? e.batch.multicall : {},
      {
        blockNumber: s,
        blockTag: i = e.experimental_blockTag ?? "latest",
        data: a,
        to: u,
      } = t,
      f = (() => {
        if (r) return null;
        if (t.multicallAddress) return t.multicallAddress;
        if (e.chain)
          return $o({ blockNumber: s, chain: e.chain, contract: "multicall3" });
        throw new je();
      })(),
      p = (typeof s == "bigint" ? h(s) : void 0) || i,
      { schedule: b } = Bo({
        id: `${e.uid}.${p}`,
        wait: o,
        shouldSplitBatch(x) {
          return (
            x.reduce((ie, { data: Te }) => ie + (Te.length - 2), 0) > n * 2
          );
        },
        fn: (x) =>
          T(this, null, function* () {
            let Z = x.map((Le) => ({
                allowFailure: !0,
                callData: Le.data,
                target: Le.to,
              })),
              ie = vo({ abi: Kt, args: [Z], functionName: "aggregate3" }),
              Te = yield e.request({
                method: "eth_call",
                params: [
                  m(
                    {},
                    f === null
                      ? { data: Fo({ code: Cr, data: ie }) }
                      : { to: f, data: ie }
                  ),
                  p,
                ],
              });
            return xo({
              abi: Kt,
              args: [Z],
              functionName: "aggregate3",
              data: Te || "0x",
            });
          }),
      }),
      [{ returnData: l, success: y }] = yield b({ data: a, to: u });
    if (!y) throw new kt({ data: l });
    return l === "0x" ? { data: void 0 } : { data: l };
  });
}
function Fo(e) {
  let { code: t, data: n } = e;
  return mn({
    abi: st(["constructor(bytes, bytes)"]),
    bytecode: zr,
    args: [t, n],
  });
}
function Gs(e) {
  let { data: t, factory: n, factoryData: r, to: o } = e;
  return mn({
    abi: st(["constructor(address, bytes, address, bytes)"]),
    bytecode: Or,
    args: [o, t, n, r],
  });
}
function Vs(e) {
  if (!(e instanceof c)) return;
  let t = e.walk();
  return typeof t?.data == "object" ? t.data?.data : t.data;
}
var Nt = class extends c {
    constructor({
      callbackSelector: t,
      cause: n,
      data: r,
      extraData: o,
      sender: s,
      urls: i,
    }) {
      super(
        n.shortMessage ||
          "An error occurred while fetching for an offchain result.",
        {
          cause: n,
          metaMessages: [
            ...(n.metaMessages || []),
            n.metaMessages?.length ? "" : [],
            "Offchain Gateway Call:",
            i && ["  Gateway URL(s):", ...i.map((a) => `    ${se(a)}`)],
            `  Sender: ${s}`,
            `  Data: ${r}`,
            `  Callback selector: ${t}`,
            `  Extra data: ${o}`,
          ].flat(),
          name: "OffchainLookupError",
        }
      );
    }
  },
  Ht = class extends c {
    constructor({ result: t, url: n }) {
      super(
        "Offchain gateway response is malformed. Response data must be a hex value.",
        {
          metaMessages: [`Gateway URL: ${se(n)}`, `Response: ${D(t)}`],
          name: "OffchainLookupResponseMalformedError",
        }
      );
    }
  },
  Dt = class extends c {
    constructor({ sender: t, to: n }) {
      super(
        "Reverted sender address does not match target contract address (`to`).",
        {
          metaMessages: [
            `Contract address: ${n}`,
            `OffchainLookup sender address: ${t}`,
          ],
          name: "OffchainLookupSenderMismatchError",
        }
      );
    }
  };
function ko(e, t) {
  if (!$(e, { strict: !1 })) throw new I({ address: e });
  if (!$(t, { strict: !1 })) throw new I({ address: t });
  return e.toLowerCase() === t.toLowerCase();
}
function Uo(e) {
  let { abi: t, data: n } = e,
    r = k(n, 0, 4),
    o = t.find((s) => s.type === "function" && r === U(M(s)));
  if (!o) throw new ht(r, { docsPath: "/docs/contract/decodeFunctionData" });
  return {
    functionName: o.name,
    args:
      "inputs" in o && o.inputs && o.inputs.length > 0
        ? xe(o.inputs, k(n, 4))
        : void 0,
  };
}
var Dn = "/docs/contract/encodeErrorResult";
function Ln(e) {
  let { abi: t, errorName: n, args: r } = e,
    o = t[0];
  if (n) {
    let u = L({ abi: t, args: r, name: n });
    if (!u) throw new ze(n, { docsPath: Dn });
    o = u;
  }
  if (o.type !== "error") throw new ze(void 0, { docsPath: Dn });
  let s = M(o),
    i = U(s),
    a = "0x";
  if (r && r.length > 0) {
    if (!o.inputs) throw new yt(o.name, { docsPath: Dn });
    a = H(o.inputs, r);
  }
  return oe([i, a]);
}
var Gn = "/docs/contract/encodeFunctionResult";
function No(e) {
  let { abi: t, functionName: n, result: r } = e,
    o = t[0];
  if (n) {
    let i = L({ abi: t, name: n });
    if (!i) throw new C(n, { docsPath: Gn });
    o = i;
  }
  if (o.type !== "function") throw new C(void 0, { docsPath: Gn });
  if (!o.outputs) throw new de(o.name, { docsPath: Gn });
  let s = (() => {
    if (o.outputs.length === 0) return [];
    if (o.outputs.length === 1) return [r];
    if (Array.isArray(r)) return r;
    throw new le(r);
  })();
  return H(o.outputs, s);
}
var Vn = "x-batch-gateway:true";
function Wn(e) {
  return T(this, null, function* () {
    let { data: t, ccipRequest: n } = e,
      {
        args: [r],
      } = Uo({ abi: at, data: t }),
      o = [],
      s = [];
    return (
      yield Promise.all(
        r.map((i, a) =>
          T(this, null, function* () {
            try {
              (s[a] = i.urls.includes(Vn)
                ? yield Wn({ data: i.data, ccipRequest: n })
                : yield n(i)),
                (o[a] = !1);
            } catch (u) {
              (o[a] = !0), (s[a] = Ws(u));
            }
          })
        )
      ),
      No({ abi: at, functionName: "query", result: [o, s] })
    );
  });
}
function Ws(e) {
  return e.name === "HttpRequestError" && e.status
    ? Ln({ abi: at, errorName: "HttpError", args: [e.status, e.shortMessage] })
    : Ln({
        abi: [ut],
        errorName: "Error",
        args: ["shortMessage" in e ? e.shortMessage : e.message],
      });
}
var ld = "0x556f1830",
  qs = {
    name: "OffchainLookup",
    type: "error",
    inputs: [
      { name: "sender", type: "address" },
      { name: "urls", type: "string[]" },
      { name: "callData", type: "bytes" },
      { name: "callbackFunction", type: "bytes4" },
      { name: "extraData", type: "bytes" },
    ],
  };
function md(s, i) {
  return T(
    this,
    arguments,
    function* (e, { blockNumber: t, blockTag: n, data: r, to: o }) {
      let { args: a } = St({ data: r, abi: [qs] }),
        [u, f, d, p, b] = a,
        { ccipRead: l } = e,
        y = l && typeof l?.request == "function" ? l.request : _s;
      try {
        if (!ko(o, u)) throw new Dt({ sender: u, to: o });
        let x = f.includes(Vn)
            ? yield Wn({ data: d, ccipRequest: y })
            : yield y({ data: d, sender: u, urls: f }),
          { data: Z } = yield Co(e, {
            blockNumber: t,
            blockTag: n,
            data: q([p, H([{ type: "bytes" }, { type: "bytes" }], [x, b])]),
            to: o,
          });
        return Z;
      } catch (x) {
        throw new Nt({
          callbackSelector: p,
          cause: x,
          data: r,
          extraData: b,
          sender: u,
          urls: f,
        });
      }
    }
  );
}
function _s(r) {
  return T(this, arguments, function* ({ data: e, sender: t, urls: n }) {
    let o = new Error("An unknown error occurred.");
    for (let s = 0; s < n.length; s++) {
      let i = n[s],
        a = i.includes("{data}") ? "GET" : "POST",
        u = a === "POST" ? { data: e, sender: t } : void 0,
        f = a === "POST" ? { "Content-Type": "application/json" } : {};
      try {
        let d = yield fetch(
            i.replace("{sender}", t.toLowerCase()).replace("{data}", e),
            { body: JSON.stringify(u), headers: f, method: a }
          ),
          p;
        if (
          (d.headers.get("Content-Type")?.startsWith("application/json")
            ? (p = (yield d.json()).data)
            : (p = yield d.text()),
          !d.ok)
        ) {
          o = new De({
            body: u,
            details: p?.error ? D(p.error) : d.statusText,
            headers: d.headers,
            status: d.status,
            url: i,
          });
          continue;
        }
        if (!j(p)) {
          o = new Ht({ result: p, url: i });
          continue;
        }
        return p;
      } catch (d) {
        o = new De({ body: u, details: d.message, url: i });
      }
    }
    throw o;
  });
}
export {
  Kt as a,
  j as b,
  g as c,
  c as d,
  fe as e,
  Dr as f,
  I as g,
  re as h,
  en as i,
  Vr as j,
  Li as k,
  Wr as l,
  R as m,
  h as n,
  nn as o,
  Pt as p,
  be as q,
  At as r,
  ye as s,
  $ as t,
  ke as u,
  Ba as v,
  Kr as w,
  q as x,
  oe as y,
  La as z,
  eo as A,
  H as B,
  xo as C,
  vo as D,
  kr as E,
  Ur as F,
  $o as G,
  ce as H,
  D as I,
  oo as J,
  Ou as K,
  Bt as L,
  jt as M,
  B as N,
  He as O,
  uo as P,
  co as Q,
  fo as R,
  po as S,
  lo as T,
  bo as U,
  yo as V,
  ho as W,
  kt as X,
  De as Y,
  Ut as Z,
  Po as _,
  bn as $,
  yn as aa,
  hn as ba,
  xn as ca,
  gn as da,
  wn as ea,
  vn as fa,
  $n as ga,
  Pn as ha,
  An as ia,
  Mn as ja,
  En as ka,
  In as la,
  Tn as ma,
  Sn as na,
  Bn as oa,
  jn as pa,
  Rn as qa,
  zn as ra,
  On as sa,
  Cn as ta,
  Fn as ua,
  kn as va,
  Un as wa,
  Nn as xa,
  Ao as ya,
  Cr as za,
  _ as Aa,
  Ie as Ba,
  Mo as Ca,
  Io as Da,
  To as Ea,
  So as Fa,
  Bo as Ga,
  Ro as Ha,
  Oo as Ia,
  ld as Ja,
  qs as Ka,
  md as La,
  _s as Ma,
  Co as Na,
};
