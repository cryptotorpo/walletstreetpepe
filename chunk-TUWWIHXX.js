import {
  a as zt,
  b as fn,
  d as Ct,
  e as ln,
  f as mn,
  i as Rt,
  j as jt,
  k as yn,
  m as bn,
  n as hn,
  o as xn,
} from "./chunk-5VG4SAOU.js";
import { a as h, b as v, d as z, l as B } from "./chunk-QE6IBIJD.js";
var gn = "1.0.8";
var w = class e extends Error {
  constructor(t, n = {}) {
    let r =
        n.cause instanceof e
          ? n.cause.details
          : n.cause?.message
          ? n.cause.message
          : n.details,
      o = (n.cause instanceof e && n.cause.docsPath) || n.docsPath,
      i = [
        t || "An error occurred.",
        "",
        ...(n.metaMessages ? [...n.metaMessages, ""] : []),
        ...(o ? [`Docs: https://abitype.dev${o}`] : []),
        ...(r ? [`Details: ${r}`] : []),
        `Version: abitype@${gn}`,
      ].join(`
`);
    super(i),
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
function A(e, t) {
  return e.exec(t)?.groups;
}
var Ut = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/,
  Ft =
    /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/,
  ke = /^\(.+?\).*?$/;
var wn = /^tuple(?<array>(\[(\d*)\])*)$/;
function Oe(e) {
  let t = e.type;
  if (wn.test(e.type) && "components" in e) {
    t = "(";
    let n = e.components.length;
    for (let o = 0; o < n; o++) {
      let i = e.components[o];
      (t += Oe(i)), o < n - 1 && (t += ", ");
    }
    let r = A(wn, e.type);
    return (t += `)${r?.array ?? ""}`), Oe(v(h({}, e), { type: t }));
  }
  return (
    "indexed" in e && e.indexed && (t = `${t} indexed`),
    e.name ? `${t} ${e.name}` : t
  );
}
function J(e) {
  let t = "",
    n = e.length;
  for (let r = 0; r < n; r++) {
    let o = e[r];
    (t += Oe(o)), r !== n - 1 && (t += ", ");
  }
  return t;
}
function Lt(e) {
  return e.type === "function"
    ? `function ${e.name}(${J(e.inputs)})${
        e.stateMutability && e.stateMutability !== "nonpayable"
          ? ` ${e.stateMutability}`
          : ""
      }${e.outputs?.length ? ` returns (${J(e.outputs)})` : ""}`
    : e.type === "event"
    ? `event ${e.name}(${J(e.inputs)})`
    : e.type === "error"
    ? `error ${e.name}(${J(e.inputs)})`
    : e.type === "constructor"
    ? `constructor(${J(e.inputs)})${
        e.stateMutability === "payable" ? " payable" : ""
      }`
    : e.type === "fallback"
    ? `fallback() external${e.stateMutability === "payable" ? " payable" : ""}`
    : "receive() external payable";
}
var vn = /^error (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
function $n(e) {
  return vn.test(e);
}
function An(e) {
  return A(vn, e);
}
var Pn = /^event (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
function In(e) {
  return Pn.test(e);
}
function Sn(e) {
  return A(Pn, e);
}
var Mn =
  /^function (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)(?: (?<scope>external|public{1}))?(?: (?<stateMutability>pure|view|nonpayable|payable{1}))?(?: returns\s?\((?<returns>.*?)\))?$/;
function En(e) {
  return Mn.test(e);
}
function Tn(e) {
  return A(Mn, e);
}
var Bn = /^struct (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*) \{(?<properties>.*?)\}$/;
function ze(e) {
  return Bn.test(e);
}
function kn(e) {
  return A(Bn, e);
}
var On =
  /^constructor\((?<parameters>.*?)\)(?:\s(?<stateMutability>payable{1}))?$/;
function zn(e) {
  return On.test(e);
}
function Cn(e) {
  return A(On, e);
}
var Rn = /^fallback\(\) external(?:\s(?<stateMutability>payable{1}))?$/;
function jn(e) {
  return Rn.test(e);
}
function Un(e) {
  return A(Rn, e);
}
var Qr = /^receive\(\) external payable$/;
function Fn(e) {
  return Qr.test(e);
}
var Ln = new Set(["indexed"]),
  Ce = new Set(["calldata", "memory", "storage"]);
var Re = class extends w {
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
  je = class extends w {
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
var Ue = class extends w {
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
  Fe = class extends w {
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
  Le = class extends w {
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
  De = class extends w {
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
  Ne = class extends w {
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
var k = class extends w {
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
  He = class extends w {
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
  _e = class extends w {
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
var Ge = class extends w {
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
var Ve = class extends w {
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
function Dn(e, t, n) {
  let r = "";
  if (n)
    for (let o of Object.entries(n)) {
      if (!o) continue;
      let i = "";
      for (let s of o[1]) i += `[${s.type}${s.name ? `:${s.name}` : ""}]`;
      r += `(${o[0]}{${i}})`;
    }
  return t ? `${t}:${e}${r}` : e;
}
var We = new Map([
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
function Nn(e, t = {}) {
  if (En(e)) return eo(e, t);
  if (In(e)) return to(e, t);
  if ($n(e)) return no(e, t);
  if (zn(e)) return ro(e, t);
  if (jn(e)) return oo(e);
  if (Fn(e)) return { type: "receive", stateMutability: "payable" };
  throw new He({ signature: e });
}
function eo(e, t = {}) {
  let n = Tn(e);
  if (!n) throw new k({ signature: e, type: "function" });
  let r = E(n.parameters),
    o = [],
    i = r.length;
  for (let a = 0; a < i; a++)
    o.push(D(r[a], { modifiers: Ce, structs: t, type: "function" }));
  let s = [];
  if (n.returns) {
    let a = E(n.returns),
      c = a.length;
    for (let p = 0; p < c; p++)
      s.push(D(a[p], { modifiers: Ce, structs: t, type: "function" }));
  }
  return {
    name: n.name,
    type: "function",
    stateMutability: n.stateMutability ?? "nonpayable",
    inputs: o,
    outputs: s,
  };
}
function to(e, t = {}) {
  let n = Sn(e);
  if (!n) throw new k({ signature: e, type: "event" });
  let r = E(n.parameters),
    o = [],
    i = r.length;
  for (let s = 0; s < i; s++)
    o.push(D(r[s], { modifiers: Ln, structs: t, type: "event" }));
  return { name: n.name, type: "event", inputs: o };
}
function no(e, t = {}) {
  let n = An(e);
  if (!n) throw new k({ signature: e, type: "error" });
  let r = E(n.parameters),
    o = [],
    i = r.length;
  for (let s = 0; s < i; s++) o.push(D(r[s], { structs: t, type: "error" }));
  return { name: n.name, type: "error", inputs: o };
}
function ro(e, t = {}) {
  let n = Cn(e);
  if (!n) throw new k({ signature: e, type: "constructor" });
  let r = E(n.parameters),
    o = [],
    i = r.length;
  for (let s = 0; s < i; s++)
    o.push(D(r[s], { structs: t, type: "constructor" }));
  return {
    type: "constructor",
    stateMutability: n.stateMutability ?? "nonpayable",
    inputs: o,
  };
}
function oo(e) {
  let t = Un(e);
  if (!t) throw new k({ signature: e, type: "fallback" });
  return {
    type: "fallback",
    stateMutability: t.stateMutability ?? "nonpayable",
  };
}
var so =
    /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/,
  io =
    /^\((?<type>.+?)\)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/,
  ao = /^u?int$/;
function D(e, t) {
  let n = Dn(e, t?.type, t?.structs);
  if (We.has(n)) return We.get(n);
  let r = ke.test(e),
    o = A(r ? io : so, e);
  if (!o) throw new Ue({ param: e });
  if (o.name && co(o.name)) throw new Fe({ param: e, name: o.name });
  let i = o.name ? { name: o.name } : {},
    s = o.modifier === "indexed" ? { indexed: !0 } : {},
    a = t?.structs ?? {},
    c,
    p = {};
  if (r) {
    c = "tuple";
    let f = E(o.type),
      y = [],
      l = f.length;
    for (let m = 0; m < l; m++) y.push(D(f[m], { structs: a }));
    p = { components: y };
  } else if (o.type in a) (c = "tuple"), (p = { components: a[o.type] });
  else if (ao.test(o.type)) c = `${o.type}256`;
  else if (((c = o.type), t?.type !== "struct" && !Dt(c)))
    throw new je({ type: c });
  if (o.modifier) {
    if (!t?.modifiers?.has?.(o.modifier))
      throw new Le({ param: e, type: t?.type, modifier: o.modifier });
    if (Ce.has(o.modifier) && !po(c, !!o.array))
      throw new De({ param: e, type: t?.type, modifier: o.modifier });
  }
  let d = h(h(h({ type: `${c}${o.array ?? ""}` }, i), s), p);
  return We.set(n, d), d;
}
function E(e, t = [], n = "", r = 0) {
  let o = e.trim().length;
  for (let i = 0; i < o; i++) {
    let s = e[i],
      a = e.slice(i + 1);
    switch (s) {
      case ",":
        return r === 0 ? E(a, [...t, n.trim()]) : E(a, t, `${n}${s}`, r);
      case "(":
        return E(a, t, `${n}${s}`, r + 1);
      case ")":
        return E(a, t, `${n}${s}`, r - 1);
      default:
        return E(a, t, `${n}${s}`, r);
    }
  }
  if (n === "") return t;
  if (r !== 0) throw new Ve({ current: n, depth: r });
  return t.push(n.trim()), t;
}
function Dt(e) {
  return (
    e === "address" ||
    e === "bool" ||
    e === "function" ||
    e === "string" ||
    Ut.test(e) ||
    Ft.test(e)
  );
}
var uo =
  /^(?:after|alias|anonymous|apply|auto|byte|calldata|case|catch|constant|copyof|default|defined|error|event|external|false|final|function|immutable|implements|in|indexed|inline|internal|let|mapping|match|memory|mutable|null|of|override|partial|private|promise|public|pure|reference|relocatable|return|returns|sizeof|static|storage|struct|super|supports|switch|this|true|try|typedef|typeof|var|view|virtual)$/;
function co(e) {
  return (
    e === "address" ||
    e === "bool" ||
    e === "function" ||
    e === "string" ||
    e === "tuple" ||
    Ut.test(e) ||
    Ft.test(e) ||
    uo.test(e)
  );
}
function po(e, t) {
  return t || e === "bytes" || e === "string" || e === "tuple";
}
function Hn(e) {
  let t = {},
    n = e.length;
  for (let s = 0; s < n; s++) {
    let a = e[s];
    if (!ze(a)) continue;
    let c = kn(a);
    if (!c) throw new k({ signature: a, type: "struct" });
    let p = c.properties.split(";"),
      d = [],
      f = p.length;
    for (let y = 0; y < f; y++) {
      let m = p[y].trim();
      if (!m) continue;
      let x = D(m, { type: "struct" });
      d.push(x);
    }
    if (!d.length) throw new _e({ signature: a });
    t[c.name] = d;
  }
  let r = {},
    o = Object.entries(t),
    i = o.length;
  for (let s = 0; s < i; s++) {
    let [a, c] = o[s];
    r[a] = _n(c, t);
  }
  return r;
}
var fo = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*)(?<array>(?:\[\d*?\])+?)?$/;
function _n(e, t, n = new Set()) {
  let r = [],
    o = e.length;
  for (let i = 0; i < o; i++) {
    let s = e[i];
    if (ke.test(s.type)) r.push(s);
    else {
      let c = A(fo, s.type);
      if (!c?.type) throw new Ne({ abiParameter: s });
      let { array: p, type: d } = c;
      if (d in t) {
        if (n.has(d)) throw new Ge({ type: d });
        r.push(
          v(h({}, s), {
            type: `tuple${p ?? ""}`,
            components: _n(t[d] ?? [], t, new Set([...n, d])),
          })
        );
      } else if (Dt(d)) r.push(s);
      else throw new Re({ type: d });
    }
  }
  return r;
}
function Ze(e) {
  let t = Hn(e),
    n = [],
    r = e.length;
  for (let o = 0; o < r; o++) {
    let i = e[o];
    ze(i) || n.push(Nn(i, t));
  }
  return n;
}
function Y(e) {
  return typeof e == "string" ? { address: e, type: "json-rpc" } : e;
}
var Nt = [
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
  ],
  Gn = [
    { inputs: [], name: "ResolverNotFound", type: "error" },
    { inputs: [], name: "ResolverWildcardNotSupported", type: "error" },
    { inputs: [], name: "ResolverNotContract", type: "error" },
    {
      inputs: [{ name: "returnData", type: "bytes" }],
      name: "ResolverError",
      type: "error",
    },
    {
      inputs: [
        {
          components: [
            { name: "status", type: "uint16" },
            { name: "message", type: "string" },
          ],
          name: "errors",
          type: "tuple[]",
        },
      ],
      name: "HttpError",
      type: "error",
    },
  ],
  ni = [
    ...Gn,
    {
      name: "resolve",
      type: "function",
      stateMutability: "view",
      inputs: [
        { name: "name", type: "bytes" },
        { name: "data", type: "bytes" },
      ],
      outputs: [
        { name: "", type: "bytes" },
        { name: "address", type: "address" },
      ],
    },
    {
      name: "resolve",
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
  ri = [
    ...Gn,
    {
      name: "reverse",
      type: "function",
      stateMutability: "view",
      inputs: [{ type: "bytes", name: "reverseName" }],
      outputs: [
        { type: "string", name: "resolvedName" },
        { type: "address", name: "resolvedAddress" },
        { type: "address", name: "reverseResolver" },
        { type: "address", name: "resolver" },
      ],
    },
    {
      name: "reverse",
      type: "function",
      stateMutability: "view",
      inputs: [
        { type: "bytes", name: "reverseName" },
        { type: "string[]", name: "gateways" },
      ],
      outputs: [
        { type: "string", name: "resolvedName" },
        { type: "address", name: "resolvedAddress" },
        { type: "address", name: "reverseResolver" },
        { type: "address", name: "resolver" },
      ],
    },
  ];
var Vn = "0x82ad56cb";
var Wn =
    "0x608060405234801561001057600080fd5b5060405161018e38038061018e83398101604081905261002f91610124565b6000808351602085016000f59050803b61004857600080fd5b6000808351602085016000855af16040513d6000823e81610067573d81fd5b3d81f35b634e487b7160e01b600052604160045260246000fd5b600082601f83011261009257600080fd5b81516001600160401b038111156100ab576100ab61006b565b604051601f8201601f19908116603f011681016001600160401b03811182821017156100d9576100d961006b565b6040528181528382016020018510156100f157600080fd5b60005b82811015610110576020818601810151838301820152016100f4565b506000918101602001919091529392505050565b6000806040838503121561013757600080fd5b82516001600160401b0381111561014d57600080fd5b61015985828601610081565b602085015190935090506001600160401b0381111561017757600080fd5b61018385828601610081565b915050925092905056fe",
  Zn =
    "0x608060405234801561001057600080fd5b506040516102c03803806102c083398101604081905261002f916101e6565b836001600160a01b03163b6000036100e457600080836001600160a01b03168360405161005c9190610270565b6000604051808303816000865af19150503d8060008114610099576040519150601f19603f3d011682016040523d82523d6000602084013e61009e565b606091505b50915091508115806100b857506001600160a01b0386163b155b156100e1578060405163101bb98d60e01b81526004016100d8919061028c565b60405180910390fd5b50505b6000808451602086016000885af16040513d6000823e81610103573d81fd5b3d81f35b80516001600160a01b038116811461011e57600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b60005b8381101561015457818101518382015260200161013c565b50506000910152565b600082601f83011261016e57600080fd5b81516001600160401b0381111561018757610187610123565b604051601f8201601f19908116603f011681016001600160401b03811182821017156101b5576101b5610123565b6040528181528382016020018510156101cd57600080fd5b6101de826020830160208701610139565b949350505050565b600080600080608085870312156101fc57600080fd5b61020585610107565b60208601519094506001600160401b0381111561022157600080fd5b61022d8782880161015d565b93505061023c60408601610107565b60608601519092506001600160401b0381111561025857600080fd5b6102648782880161015d565b91505092959194509250565b60008251610282818460208701610139565b9190910192915050565b60208152600082518060208401526102ab816040850160208701610139565b601f01601f1916919091016040019291505056fe";
var Ht = "2.23.2";
var _t = {
  getDocsUrl: ({ docsBaseUrl: e, docsPath: t = "", docsSlug: n }) =>
    t ? `${e ?? "https://viem.sh"}${t}${n ? `#${n}` : ""}` : void 0,
  version: `viem@${Ht}`,
};
var u = class e extends Error {
  constructor(t, n = {}) {
    let r =
        n.cause instanceof e
          ? n.cause.details
          : n.cause?.message
          ? n.cause.message
          : n.details,
      o = (n.cause instanceof e && n.cause.docsPath) || n.docsPath,
      i = _t.getDocsUrl?.(v(h({}, n), { docsPath: o })),
      s = [
        t || "An error occurred.",
        "",
        ...(n.metaMessages ? [...n.metaMessages, ""] : []),
        ...(i ? [`Docs: ${i}`] : []),
        ...(r ? [`Details: ${r}`] : []),
        ...(_t.version ? [`Version: ${_t.version}`] : []),
      ].join(`
`);
    super(s, n.cause ? { cause: n.cause } : void 0),
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
      (this.version = Ht);
  }
  walk(t) {
    return Kn(this, t);
  }
};
function Kn(e, t) {
  return t?.(e)
    ? e
    : e && typeof e == "object" && "cause" in e && e.cause !== void 0
    ? Kn(e.cause, t)
    : t
    ? null
    : e;
}
var W = class extends u {
  constructor({ blockNumber: t, chain: n, contract: r }) {
    super(`Chain "${n.name}" does not support contract "${r.name}".`, {
      metaMessages: [
        "This could be due to any of the following:",
        ...(t && r.blockCreated && r.blockCreated > t
          ? [
              `- The contract "${r.name}" was not deployed until block ${r.blockCreated} (current block ${t}).`,
            ]
          : [`- The chain does not have the contract "${r.name}" configured.`]),
      ],
      name: "ChainDoesNotSupportContract",
    });
  }
};
var be = class extends u {
  constructor() {
    super("No chain was provided to the Client.", {
      name: "ClientChainNotConfiguredError",
    });
  }
};
var Xn = {
    inputs: [{ name: "message", type: "string" }],
    name: "Error",
    type: "error",
  },
  Jn = {
    inputs: [{ name: "reason", type: "uint256" }],
    name: "Panic",
    type: "error",
  };
function Z(e, { includeName: t = !1 } = {}) {
  if (e.type !== "function" && e.type !== "event" && e.type !== "error")
    throw new Xe(e.type);
  return `${e.name}(${Ke(e.inputs, { includeName: t })})`;
}
function Ke(e, { includeName: t = !1 } = {}) {
  return e ? e.map((n) => lo(n, { includeName: t })).join(t ? ", " : ",") : "";
}
function lo(e, { includeName: t }) {
  return e.type.startsWith("tuple")
    ? `(${Ke(e.components, { includeName: t })})${e.type.slice(5)}`
    : e.type + (t && e.name ? ` ${e.name}` : "");
}
function I(e, { strict: t = !0 } = {}) {
  return !e || typeof e != "string"
    ? !1
    : t
    ? /^0x[0-9a-fA-F]*$/.test(e)
    : e.startsWith("0x");
}
function g(e) {
  return I(e, { strict: !1 }) ? Math.ceil((e.length - 2) / 2) : e.length;
}
var Je = class extends u {
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
  he = class extends u {
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
var Ye = class extends u {
    constructor({ data: t, params: n, size: r }) {
      super(
        [`Data size of ${r} bytes is too small for given parameters.`].join(`
`),
        {
          metaMessages: [
            `Params: (${Ke(n, { includeName: !0 })})`,
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
  q = class extends u {
    constructor() {
      super('Cannot decode zero data ("0x") with ABI parameters.', {
        name: "AbiDecodingZeroDataError",
      });
    }
  },
  qe = class extends u {
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
  Qe = class extends u {
    constructor({ expectedSize: t, value: n }) {
      super(
        `Size of bytes "${n}" (bytes${g(
          n
        )}) does not match expected size (bytes${t}).`,
        { name: "AbiEncodingBytesSizeMismatchError" }
      );
    }
  },
  et = class extends u {
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
  };
var tt = class extends u {
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
var N = class extends u {
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
  nt = class extends u {
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
  };
var rt = class extends u {
  constructor(t, n) {
    super("Found ambiguous types in overloaded ABI items.", {
      metaMessages: [
        `\`${t.type}\` in \`${Z(t.abiItem)}\`, and`,
        `\`${n.type}\` in \`${Z(n.abiItem)}\``,
        "",
        "These types encode differently and cannot be distinguished at runtime.",
        "Remove one of the ambiguous items in the ABI.",
      ],
      name: "AbiItemAmbiguityError",
    });
  }
};
var ot = class extends u {
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
  st = class extends u {
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
  it = class extends u {
    constructor(t) {
      super(
        [`Value "${t}" is not a valid array.`].join(`
`),
        { name: "InvalidArrayError" }
      );
    }
  },
  Xe = class extends u {
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
var xe = class extends u {
    constructor({ offset: t, position: n, size: r }) {
      super(
        `Slice ${
          n === "start" ? "starting" : "ending"
        } at offset "${t}" is out-of-bounds (size: ${r}).`,
        { name: "SliceOffsetOutOfBoundsError" }
      );
    }
  },
  ge = class extends u {
    constructor({ size: t, targetSize: n, type: r }) {
      super(
        `${r.charAt(0).toUpperCase()}${r
          .slice(1)
          .toLowerCase()} size (${t}) exceeds padding size (${n}).`,
        { name: "SizeExceedsPaddingSizeError" }
      );
    }
  },
  we = class extends u {
    constructor({ size: t, targetSize: n, type: r }) {
      super(
        `${r.charAt(0).toUpperCase()}${r
          .slice(1)
          .toLowerCase()} is expected to be ${n} ${r} long, but is ${t} ${r} long.`,
        { name: "InvalidBytesLengthError" }
      );
    }
  };
function K(e, t, n, { strict: r } = {}) {
  return I(e, { strict: !1 })
    ? mo(e, t, n, { strict: r })
    : Gt(e, t, n, { strict: r });
}
function Yn(e, t) {
  if (typeof t == "number" && t > 0 && t > g(e) - 1)
    throw new xe({ offset: t, position: "start", size: g(e) });
}
function qn(e, t, n) {
  if (typeof t == "number" && typeof n == "number" && g(e) !== n - t)
    throw new xe({ offset: n, position: "end", size: g(e) });
}
function Gt(e, t, n, { strict: r } = {}) {
  Yn(e, t);
  let o = e.slice(t, n);
  return r && qn(o, t, n), o;
}
function mo(e, t, n, { strict: r } = {}) {
  Yn(e, t);
  let o = `0x${e.replace("0x", "").slice((t ?? 0) * 2, (n ?? e.length) * 2)}`;
  return r && qn(o, t, n), o;
}
function H(e, { dir: t, size: n = 32 } = {}) {
  return typeof e == "string"
    ? C(e, { dir: t, size: n })
    : yo(e, { dir: t, size: n });
}
function C(e, { dir: t, size: n = 32 } = {}) {
  if (n === null) return e;
  let r = e.replace("0x", "");
  if (r.length > n * 2)
    throw new ge({ size: Math.ceil(r.length / 2), targetSize: n, type: "hex" });
  return `0x${r[t === "right" ? "padEnd" : "padStart"](n * 2, "0")}`;
}
function yo(e, { dir: t, size: n = 32 } = {}) {
  if (n === null) return e;
  if (e.length > n)
    throw new ge({ size: e.length, targetSize: n, type: "bytes" });
  let r = new Uint8Array(n);
  for (let o = 0; o < n; o++) {
    let i = t === "right";
    r[i ? o : n - o - 1] = e[i ? o : e.length - o - 1];
  }
  return r;
}
var Q = class extends u {
    constructor({ max: t, min: n, signed: r, size: o, value: i }) {
      super(
        `Number "${i}" is not in safe ${
          o ? `${o * 8}-bit ${r ? "signed" : "unsigned"} ` : ""
        }integer range ${t ? `(${n} to ${t})` : `(above ${n})`}`,
        { name: "IntegerOutOfRangeError" }
      );
    }
  },
  at = class extends u {
    constructor(t) {
      super(
        `Bytes value "${t}" is not a valid boolean. The bytes array must contain a single byte of either a 0 or 1 value.`,
        { name: "InvalidBytesBooleanError" }
      );
    }
  };
var ut = class extends u {
  constructor({ givenSize: t, maxSize: n }) {
    super(`Size cannot exceed ${n} bytes. Given size: ${t} bytes.`, {
      name: "SizeOverflowError",
    });
  }
};
function ve(e, { dir: t = "left" } = {}) {
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
function P(e, { size: t }) {
  if (g(e) > t) throw new ut({ givenSize: g(e), maxSize: t });
}
function Vt(e, t = {}) {
  let { signed: n } = t;
  t.size && P(e, { size: t.size });
  let r = BigInt(e);
  if (!n) return r;
  let o = (e.length - 2) / 2,
    i = (1n << (BigInt(o) * 8n - 1n)) - 1n;
  return r <= i ? r : r - BigInt(`0x${"f".padStart(o * 2, "f")}`) - 1n;
}
function Qn(e, t = {}) {
  return Number(Vt(e, t));
}
var bo = Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function er(e, t = {}) {
  return typeof e == "number" || typeof e == "bigint"
    ? b(e, t)
    : typeof e == "string"
    ? Zt(e, t)
    : typeof e == "boolean"
    ? Wt(e, t)
    : S(e, t);
}
function Wt(e, t = {}) {
  let n = `0x${Number(e)}`;
  return typeof t.size == "number"
    ? (P(n, { size: t.size }), H(n, { size: t.size }))
    : n;
}
function S(e, t = {}) {
  let n = "";
  for (let o = 0; o < e.length; o++) n += bo[e[o]];
  let r = `0x${n}`;
  return typeof t.size == "number"
    ? (P(r, { size: t.size }), H(r, { dir: "right", size: t.size }))
    : r;
}
function b(e, t = {}) {
  let { signed: n, size: r } = t,
    o = BigInt(e),
    i;
  r
    ? n
      ? (i = (1n << (BigInt(r) * 8n - 1n)) - 1n)
      : (i = 2n ** (BigInt(r) * 8n) - 1n)
    : typeof e == "number" && (i = BigInt(Number.MAX_SAFE_INTEGER));
  let s = typeof i == "bigint" && n ? -i - 1n : 0;
  if ((i && o > i) || o < s) {
    let c = typeof e == "bigint" ? "n" : "";
    throw new Q({
      max: i ? `${i}${c}` : void 0,
      min: `${s}${c}`,
      signed: n,
      size: r,
      value: `${e}${c}`,
    });
  }
  let a = `0x${(n && o < 0 ? (1n << BigInt(r * 8)) + BigInt(o) : o).toString(
    16
  )}`;
  return r ? H(a, { size: r }) : a;
}
var ho = new TextEncoder();
function Zt(e, t = {}) {
  let n = ho.encode(e);
  return S(n, t);
}
var xo = new TextEncoder();
function ct(e, t = {}) {
  return typeof e == "number" || typeof e == "bigint"
    ? wo(e, t)
    : typeof e == "boolean"
    ? go(e, t)
    : I(e)
    ? pt(e, t)
    : Kt(e, t);
}
function go(e, t = {}) {
  let n = new Uint8Array(1);
  return (
    (n[0] = Number(e)),
    typeof t.size == "number"
      ? (P(n, { size: t.size }), H(n, { size: t.size }))
      : n
  );
}
var R = { zero: 48, nine: 57, A: 65, F: 70, a: 97, f: 102 };
function tr(e) {
  if (e >= R.zero && e <= R.nine) return e - R.zero;
  if (e >= R.A && e <= R.F) return e - (R.A - 10);
  if (e >= R.a && e <= R.f) return e - (R.a - 10);
}
function pt(e, t = {}) {
  let n = e;
  t.size &&
    (P(n, { size: t.size }), (n = H(n, { dir: "right", size: t.size })));
  let r = n.slice(2);
  r.length % 2 && (r = `0${r}`);
  let o = r.length / 2,
    i = new Uint8Array(o);
  for (let s = 0, a = 0; s < o; s++) {
    let c = tr(r.charCodeAt(a++)),
      p = tr(r.charCodeAt(a++));
    if (c === void 0 || p === void 0)
      throw new u(
        `Invalid byte sequence ("${r[a - 2]}${r[a - 1]}" in "${r}").`
      );
    i[s] = c * 16 + p;
  }
  return i;
}
function wo(e, t) {
  let n = b(e, t);
  return pt(n);
}
function Kt(e, t = {}) {
  let n = xo.encode(e);
  return typeof t.size == "number"
    ? (P(n, { size: t.size }), H(n, { dir: "right", size: t.size }))
    : n;
}
var dt = BigInt(4294967295),
  nr = BigInt(32);
function vo(e, t = !1) {
  return t
    ? { h: Number(e & dt), l: Number((e >> nr) & dt) }
    : { h: Number((e >> nr) & dt) | 0, l: Number(e & dt) | 0 };
}
function rr(e, t = !1) {
  let n = new Uint32Array(e.length),
    r = new Uint32Array(e.length);
  for (let o = 0; o < e.length; o++) {
    let { h: i, l: s } = vo(e[o], t);
    [n[o], r[o]] = [i, s];
  }
  return [n, r];
}
var or = (e, t, n) => (e << n) | (t >>> (32 - n)),
  sr = (e, t, n) => (t << n) | (e >>> (32 - n)),
  ir = (e, t, n) => (t << (n - 32)) | (e >>> (64 - n)),
  ar = (e, t, n) => (e << (n - 32)) | (t >>> (64 - n));
var pr = [],
  dr = [],
  fr = [],
  $o = BigInt(0),
  $e = BigInt(1),
  Ao = BigInt(2),
  Po = BigInt(7),
  Io = BigInt(256),
  So = BigInt(113);
for (let e = 0, t = $e, n = 1, r = 0; e < 24; e++) {
  ([n, r] = [r, (2 * n + 3 * r) % 5]),
    pr.push(2 * (5 * r + n)),
    dr.push((((e + 1) * (e + 2)) / 2) % 64);
  let o = $o;
  for (let i = 0; i < 7; i++)
    (t = ((t << $e) ^ ((t >> Po) * So)) % Io),
      t & Ao && (o ^= $e << (($e << BigInt(i)) - $e));
  fr.push(o);
}
var [Mo, Eo] = rr(fr, !0),
  ur = (e, t, n) => (n > 32 ? ir(e, t, n) : or(e, t, n)),
  cr = (e, t, n) => (n > 32 ? ar(e, t, n) : sr(e, t, n));
function To(e, t = 24) {
  let n = new Uint32Array(10);
  for (let r = 24 - t; r < 24; r++) {
    for (let s = 0; s < 10; s++)
      n[s] = e[s] ^ e[s + 10] ^ e[s + 20] ^ e[s + 30] ^ e[s + 40];
    for (let s = 0; s < 10; s += 2) {
      let a = (s + 8) % 10,
        c = (s + 2) % 10,
        p = n[c],
        d = n[c + 1],
        f = ur(p, d, 1) ^ n[a],
        y = cr(p, d, 1) ^ n[a + 1];
      for (let l = 0; l < 50; l += 10) (e[s + l] ^= f), (e[s + l + 1] ^= y);
    }
    let o = e[2],
      i = e[3];
    for (let s = 0; s < 24; s++) {
      let a = dr[s],
        c = ur(o, i, a),
        p = cr(o, i, a),
        d = pr[s];
      (o = e[d]), (i = e[d + 1]), (e[d] = c), (e[d + 1] = p);
    }
    for (let s = 0; s < 50; s += 10) {
      for (let a = 0; a < 10; a++) n[a] = e[s + a];
      for (let a = 0; a < 10; a++)
        e[s + a] ^= ~n[(a + 2) % 10] & n[(a + 4) % 10];
    }
    (e[0] ^= Mo[r]), (e[1] ^= Eo[r]);
  }
  n.fill(0);
}
var ft = class e extends bn {
    constructor(t, n, r, o = !1, i = 24) {
      if (
        (super(),
        (this.blockLen = t),
        (this.suffix = n),
        (this.outputLen = r),
        (this.enableXOF = o),
        (this.rounds = i),
        (this.pos = 0),
        (this.posOut = 0),
        (this.finished = !1),
        (this.destroyed = !1),
        zt(r),
        0 >= this.blockLen || this.blockLen >= 200)
      )
        throw new Error("Sha3 supports only keccak-f1600 function");
      (this.state = new Uint8Array(200)), (this.state32 = mn(this.state));
    }
    keccak() {
      Rt || jt(this.state32),
        To(this.state32, this.rounds),
        Rt || jt(this.state32),
        (this.posOut = 0),
        (this.pos = 0);
    }
    update(t) {
      Ct(this);
      let { blockLen: n, state: r } = this;
      t = yn(t);
      let o = t.length;
      for (let i = 0; i < o; ) {
        let s = Math.min(n - this.pos, o - i);
        for (let a = 0; a < s; a++) r[this.pos++] ^= t[i++];
        this.pos === n && this.keccak();
      }
      return this;
    }
    finish() {
      if (this.finished) return;
      this.finished = !0;
      let { state: t, suffix: n, pos: r, blockLen: o } = this;
      (t[r] ^= n),
        n & 128 && r === o - 1 && this.keccak(),
        (t[o - 1] ^= 128),
        this.keccak();
    }
    writeInto(t) {
      Ct(this, !1), fn(t), this.finish();
      let n = this.state,
        { blockLen: r } = this;
      for (let o = 0, i = t.length; o < i; ) {
        this.posOut >= r && this.keccak();
        let s = Math.min(r - this.posOut, i - o);
        t.set(n.subarray(this.posOut, this.posOut + s), o),
          (this.posOut += s),
          (o += s);
      }
      return t;
    }
    xofInto(t) {
      if (!this.enableXOF)
        throw new Error("XOF is not possible for this instance");
      return this.writeInto(t);
    }
    xof(t) {
      return zt(t), this.xofInto(new Uint8Array(t));
    }
    digestInto(t) {
      if ((ln(t, this), this.finished))
        throw new Error("digest() was already called");
      return this.writeInto(t), this.destroy(), t;
    }
    digest() {
      return this.digestInto(new Uint8Array(this.outputLen));
    }
    destroy() {
      (this.destroyed = !0), this.state.fill(0);
    }
    _cloneInto(t) {
      let {
        blockLen: n,
        suffix: r,
        outputLen: o,
        rounds: i,
        enableXOF: s,
      } = this;
      return (
        t || (t = new e(n, r, o, s, i)),
        t.state32.set(this.state32),
        (t.pos = this.pos),
        (t.posOut = this.posOut),
        (t.finished = this.finished),
        (t.rounds = i),
        (t.suffix = r),
        (t.outputLen = o),
        (t.enableXOF = s),
        (t.destroyed = this.destroyed),
        t
      );
    }
  },
  _ = (e, t, n) => hn(() => new ft(t, e, n)),
  qi = _(6, 144, 224 / 8),
  Qi = _(6, 136, 256 / 8),
  ea = _(6, 104, 384 / 8),
  ta = _(6, 72, 512 / 8),
  na = _(1, 144, 224 / 8),
  lr = _(1, 136, 256 / 8),
  ra = _(1, 104, 384 / 8),
  oa = _(1, 72, 512 / 8),
  mr = (e, t, n) =>
    xn((r = {}) => new ft(t, e, r.dkLen === void 0 ? n : r.dkLen, !0)),
  sa = mr(31, 168, 128 / 8),
  ia = mr(31, 136, 256 / 8);
function lt(e, t) {
  let n = t || "hex",
    r = lr(I(e, { strict: !1 }) ? ct(e) : e);
  return n === "bytes" ? r : er(r);
}
var Bo = (e) => lt(ct(e));
function yr(e) {
  return Bo(e);
}
function br(e) {
  let t = !0,
    n = "",
    r = 0,
    o = "",
    i = !1;
  for (let s = 0; s < e.length; s++) {
    let a = e[s];
    if (
      (["(", ")", ","].includes(a) && (t = !0),
      a === "(" && r++,
      a === ")" && r--,
      !!t)
    ) {
      if (r === 0) {
        if (a === " " && ["event", "function", ""].includes(o)) o = "";
        else if (((o += a), a === ")")) {
          i = !0;
          break;
        }
        continue;
      }
      if (a === " ") {
        e[s - 1] !== "," && n !== "," && n !== ",(" && ((n = ""), (t = !1));
        continue;
      }
      (o += a), (n += a);
    }
  }
  if (!i) throw new u("Unable to normalize signature.");
  return o;
}
var hr = (e) => {
  let t = typeof e == "string" ? e : Lt(e);
  return br(t);
};
function mt(e) {
  return yr(hr(e));
}
var ee = (e) => K(mt(e), 0, 4);
var M = class extends u {
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
var te = class extends Map {
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
var ko = /^0x[a-fA-F0-9]{40}$/,
  Xt = new te(8192);
function $(e, t) {
  let { strict: n = !0 } = t ?? {},
    r = `${e}.${n}`;
  if (Xt.has(r)) return Xt.get(r);
  let o = ko.test(e) ? (e.toLowerCase() === e ? !0 : n ? yt(e) === e : !0) : !1;
  return Xt.set(r, o), o;
}
var Jt = new te(8192);
function yt(e, t) {
  if (Jt.has(`${e}.${t}`)) return Jt.get(`${e}.${t}`);
  let n = t ? `${t}${e.toLowerCase()}` : e.substring(2).toLowerCase(),
    r = lt(Kt(n), "bytes"),
    o = (t ? n.substring(`${t}0x`.length) : n).split("");
  for (let s = 0; s < 40; s += 2)
    r[s >> 1] >> 4 >= 8 && o[s] && (o[s] = o[s].toUpperCase()),
      (r[s >> 1] & 15) >= 8 && o[s + 1] && (o[s + 1] = o[s + 1].toUpperCase());
  let i = `0x${o.join("")}`;
  return Jt.set(`${e}.${t}`, i), i;
}
var Ae = class extends u {
    constructor({ offset: t }) {
      super(`Offset \`${t}\` cannot be negative.`, {
        name: "NegativeOffsetError",
      });
    }
  },
  bt = class extends u {
    constructor({ length: t, position: n }) {
      super(`Position \`${n}\` is out of bounds (\`0 < position < ${t}\`).`, {
        name: "PositionOutOfBoundsError",
      });
    }
  },
  ht = class extends u {
    constructor({ count: t, limit: n }) {
      super(
        `Recursive read limit of \`${n}\` exceeded (recursive read count: \`${t}\`).`,
        { name: "RecursiveReadLimitExceededError" }
      );
    }
  };
var Oo = {
  bytes: new Uint8Array(),
  dataView: new DataView(new ArrayBuffer(0)),
  position: 0,
  positionReadCount: new Map(),
  recursiveReadCount: 0,
  recursiveReadLimit: Number.POSITIVE_INFINITY,
  assertReadLimit() {
    if (this.recursiveReadCount >= this.recursiveReadLimit)
      throw new ht({
        count: this.recursiveReadCount + 1,
        limit: this.recursiveReadLimit,
      });
  },
  assertPosition(e) {
    if (e < 0 || e > this.bytes.length - 1)
      throw new bt({ length: this.bytes.length, position: e });
  },
  decrementPosition(e) {
    if (e < 0) throw new Ae({ offset: e });
    let t = this.position - e;
    this.assertPosition(t), (this.position = t);
  },
  getReadCount(e) {
    return this.positionReadCount.get(e || this.position) || 0;
  },
  incrementPosition(e) {
    if (e < 0) throw new Ae({ offset: e });
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
function xr(e, { recursiveReadLimit: t = 8192 } = {}) {
  let n = Object.create(Oo);
  return (
    (n.bytes = e),
    (n.dataView = new DataView(e.buffer, e.byteOffset, e.byteLength)),
    (n.positionReadCount = new Map()),
    (n.recursiveReadLimit = t),
    n
  );
}
function gr(e, t = {}) {
  typeof t.size < "u" && P(e, { size: t.size });
  let n = S(e, t);
  return Vt(n, t);
}
function wr(e, t = {}) {
  let n = e;
  if (
    (typeof t.size < "u" && (P(n, { size: t.size }), (n = ve(n))),
    n.length > 1 || n[0] > 1)
  )
    throw new at(n);
  return !!n[0];
}
function O(e, t = {}) {
  typeof t.size < "u" && P(e, { size: t.size });
  let n = S(e, t);
  return Qn(n, t);
}
function vr(e, t = {}) {
  let n = e;
  return (
    typeof t.size < "u" &&
      (P(n, { size: t.size }), (n = ve(n, { dir: "right" }))),
    new TextDecoder().decode(n)
  );
}
function j(e) {
  return typeof e[0] == "string" ? Pe(e) : zo(e);
}
function zo(e) {
  let t = 0;
  for (let o of e) t += o.length;
  let n = new Uint8Array(t),
    r = 0;
  for (let o of e) n.set(o, r), (r += o.length);
  return n;
}
function Pe(e) {
  return `0x${e.reduce((t, n) => t + n.replace("0x", ""), "")}`;
}
var $r =
  /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
function ne(e, t) {
  if (e.length !== t.length)
    throw new et({ expectedLength: e.length, givenLength: t.length });
  let n = Co({ params: e, values: t }),
    r = qt(n);
  return r.length === 0 ? "0x" : r;
}
function Co({ params: e, values: t }) {
  let n = [];
  for (let r = 0; r < e.length; r++) n.push(Yt({ param: e[r], value: t[r] }));
  return n;
}
function Yt({ param: e, value: t }) {
  let n = xt(e.type);
  if (n) {
    let [r, o] = n;
    return jo(t, { length: r, param: v(h({}, e), { type: o }) });
  }
  if (e.type === "tuple") return No(t, { param: e });
  if (e.type === "address") return Ro(t);
  if (e.type === "bool") return Fo(t);
  if (e.type.startsWith("uint") || e.type.startsWith("int")) {
    let r = e.type.startsWith("int"),
      [, , o = "256"] = $r.exec(e.type) ?? [];
    return Lo(t, { signed: r, size: Number(o) });
  }
  if (e.type.startsWith("bytes")) return Uo(t, { param: e });
  if (e.type === "string") return Do(t);
  throw new ot(e.type, { docsPath: "/docs/contract/encodeAbiParameters" });
}
function qt(e) {
  let t = 0;
  for (let i = 0; i < e.length; i++) {
    let { dynamic: s, encoded: a } = e[i];
    s ? (t += 32) : (t += g(a));
  }
  let n = [],
    r = [],
    o = 0;
  for (let i = 0; i < e.length; i++) {
    let { dynamic: s, encoded: a } = e[i];
    s ? (n.push(b(t + o, { size: 32 })), r.push(a), (o += g(a))) : n.push(a);
  }
  return j([...n, ...r]);
}
function Ro(e) {
  if (!$(e)) throw new M({ address: e });
  return { dynamic: !1, encoded: C(e.toLowerCase()) };
}
function jo(e, { length: t, param: n }) {
  let r = t === null;
  if (!Array.isArray(e)) throw new it(e);
  if (!r && e.length !== t)
    throw new qe({
      expectedLength: t,
      givenLength: e.length,
      type: `${n.type}[${t}]`,
    });
  let o = !1,
    i = [];
  for (let s = 0; s < e.length; s++) {
    let a = Yt({ param: n, value: e[s] });
    a.dynamic && (o = !0), i.push(a);
  }
  if (r || o) {
    let s = qt(i);
    if (r) {
      let a = b(i.length, { size: 32 });
      return { dynamic: !0, encoded: i.length > 0 ? j([a, s]) : a };
    }
    if (o) return { dynamic: !0, encoded: s };
  }
  return { dynamic: !1, encoded: j(i.map(({ encoded: s }) => s)) };
}
function Uo(e, { param: t }) {
  let [, n] = t.type.split("bytes"),
    r = g(e);
  if (!n) {
    let o = e;
    return (
      r % 32 !== 0 &&
        (o = C(o, {
          dir: "right",
          size: Math.ceil((e.length - 2) / 2 / 32) * 32,
        })),
      { dynamic: !0, encoded: j([C(b(r, { size: 32 })), o]) }
    );
  }
  if (r !== Number.parseInt(n))
    throw new Qe({ expectedSize: Number.parseInt(n), value: e });
  return { dynamic: !1, encoded: C(e, { dir: "right" }) };
}
function Fo(e) {
  if (typeof e != "boolean")
    throw new u(
      `Invalid boolean value: "${e}" (type: ${typeof e}). Expected: \`true\` or \`false\`.`
    );
  return { dynamic: !1, encoded: C(Wt(e)) };
}
function Lo(e, { signed: t, size: n = 256 }) {
  if (typeof n == "number") {
    let r = 2n ** (BigInt(n) - (t ? 1n : 0n)) - 1n,
      o = t ? -r - 1n : 0n;
    if (e > r || e < o)
      throw new Q({
        max: r.toString(),
        min: o.toString(),
        signed: t,
        size: n / 8,
        value: e.toString(),
      });
  }
  return { dynamic: !1, encoded: b(e, { size: 32, signed: t }) };
}
function Do(e) {
  let t = Zt(e),
    n = Math.ceil(g(t) / 32),
    r = [];
  for (let o = 0; o < n; o++)
    r.push(C(K(t, o * 32, (o + 1) * 32), { dir: "right" }));
  return { dynamic: !0, encoded: j([C(b(g(t), { size: 32 })), ...r]) };
}
function No(e, { param: t }) {
  let n = !1,
    r = [];
  for (let o = 0; o < t.components.length; o++) {
    let i = t.components[o],
      s = Array.isArray(e) ? o : i.name,
      a = Yt({ param: i, value: e[s] });
    r.push(a), a.dynamic && (n = !0);
  }
  return { dynamic: n, encoded: n ? qt(r) : j(r.map(({ encoded: o }) => o)) };
}
function xt(e) {
  let t = e.match(/^(.*)\[(\d+)?\]$/);
  return t ? [t[2] ? Number(t[2]) : null, t[1]] : void 0;
}
function gt(e, t) {
  let n = typeof t == "string" ? pt(t) : t,
    r = xr(n);
  if (g(n) === 0 && e.length > 0) throw new q();
  if (g(t) && g(t) < 32)
    throw new Ye({
      data: typeof t == "string" ? t : S(t),
      params: e,
      size: g(t),
    });
  let o = 0,
    i = [];
  for (let s = 0; s < e.length; ++s) {
    let a = e[s];
    r.setPosition(o);
    let [c, p] = re(r, a, { staticPosition: 0 });
    (o += p), i.push(c);
  }
  return i;
}
function re(e, t, { staticPosition: n }) {
  let r = xt(t.type);
  if (r) {
    let [o, i] = r;
    return _o(e, v(h({}, t), { type: i }), { length: o, staticPosition: n });
  }
  if (t.type === "tuple") return Zo(e, t, { staticPosition: n });
  if (t.type === "address") return Ho(e);
  if (t.type === "bool") return Go(e);
  if (t.type.startsWith("bytes")) return Vo(e, t, { staticPosition: n });
  if (t.type.startsWith("uint") || t.type.startsWith("int")) return Wo(e, t);
  if (t.type === "string") return Ko(e, { staticPosition: n });
  throw new st(t.type, { docsPath: "/docs/contract/decodeAbiParameters" });
}
var Ar = 32,
  Qt = 32;
function Ho(e) {
  let t = e.readBytes(32);
  return [yt(S(Gt(t, -20))), 32];
}
function _o(e, t, { length: n, staticPosition: r }) {
  if (!n) {
    let s = O(e.readBytes(Qt)),
      a = r + s,
      c = a + Ar;
    e.setPosition(a);
    let p = O(e.readBytes(Ar)),
      d = Ie(t),
      f = 0,
      y = [];
    for (let l = 0; l < p; ++l) {
      e.setPosition(c + (d ? l * 32 : f));
      let [m, x] = re(e, t, { staticPosition: c });
      (f += x), y.push(m);
    }
    return e.setPosition(r + 32), [y, 32];
  }
  if (Ie(t)) {
    let s = O(e.readBytes(Qt)),
      a = r + s,
      c = [];
    for (let p = 0; p < n; ++p) {
      e.setPosition(a + p * 32);
      let [d] = re(e, t, { staticPosition: a });
      c.push(d);
    }
    return e.setPosition(r + 32), [c, 32];
  }
  let o = 0,
    i = [];
  for (let s = 0; s < n; ++s) {
    let [a, c] = re(e, t, { staticPosition: r + o });
    (o += c), i.push(a);
  }
  return [i, o];
}
function Go(e) {
  return [wr(e.readBytes(32), { size: 32 }), 32];
}
function Vo(e, t, { staticPosition: n }) {
  let [r, o] = t.type.split("bytes");
  if (!o) {
    let s = O(e.readBytes(32));
    e.setPosition(n + s);
    let a = O(e.readBytes(32));
    if (a === 0) return e.setPosition(n + 32), ["0x", 32];
    let c = e.readBytes(a);
    return e.setPosition(n + 32), [S(c), 32];
  }
  return [S(e.readBytes(Number.parseInt(o), 32)), 32];
}
function Wo(e, t) {
  let n = t.type.startsWith("int"),
    r = Number.parseInt(t.type.split("int")[1] || "256"),
    o = e.readBytes(32);
  return [r > 48 ? gr(o, { signed: n }) : O(o, { signed: n }), 32];
}
function Zo(e, t, { staticPosition: n }) {
  let r = t.components.length === 0 || t.components.some(({ name: s }) => !s),
    o = r ? [] : {},
    i = 0;
  if (Ie(t)) {
    let s = O(e.readBytes(Qt)),
      a = n + s;
    for (let c = 0; c < t.components.length; ++c) {
      let p = t.components[c];
      e.setPosition(a + i);
      let [d, f] = re(e, p, { staticPosition: a });
      (i += f), (o[r ? c : p?.name] = d);
    }
    return e.setPosition(n + 32), [o, 32];
  }
  for (let s = 0; s < t.components.length; ++s) {
    let a = t.components[s],
      [c, p] = re(e, a, { staticPosition: n });
    (o[r ? s : a?.name] = c), (i += p);
  }
  return [o, i];
}
function Ko(e, { staticPosition: t }) {
  let n = O(e.readBytes(32)),
    r = t + n;
  e.setPosition(r);
  let o = O(e.readBytes(32));
  if (o === 0) return e.setPosition(t + 32), ["", 32];
  let i = e.readBytes(o, 32),
    s = vr(ve(i));
  return e.setPosition(t + 32), [s, 32];
}
function Ie(e) {
  let { type: t } = e;
  if (t === "string" || t === "bytes" || t.endsWith("[]")) return !0;
  if (t === "tuple") return e.components?.some(Ie);
  let n = xt(e.type);
  return !!(n && Ie(v(h({}, e), { type: n[1] })));
}
function Pr(e) {
  let { abi: t, data: n } = e,
    r = K(n, 0, 4);
  if (r === "0x") throw new q();
  let i = [...(t || []), Xn, Jn].find(
    (s) => s.type === "error" && r === ee(Z(s))
  );
  if (!i) throw new tt(r, { docsPath: "/docs/contract/decodeErrorResult" });
  return {
    abiItem: i,
    args:
      "inputs" in i && i.inputs && i.inputs.length > 0
        ? gt(i.inputs, K(n, 4))
        : void 0,
    errorName: i.name,
  };
}
var oe = (e, t, n) =>
  JSON.stringify(
    e,
    (r, o) => {
      let i = typeof o == "bigint" ? o.toString() : o;
      return typeof t == "function" ? t(r, i) : i;
    },
    n
  );
var Ir = mt;
function wt(e) {
  let { abi: t, args: n = [], name: r } = e,
    o = I(r, { strict: !1 }),
    i = t.filter((a) =>
      o
        ? a.type === "function"
          ? ee(a) === r
          : a.type === "event"
          ? Ir(a) === r
          : !1
        : "name" in a && a.name === r
    );
  if (i.length === 0) return;
  if (i.length === 1) return i[0];
  let s;
  for (let a of i) {
    if (!("inputs" in a)) continue;
    if (!n || n.length === 0) {
      if (!a.inputs || a.inputs.length === 0) return a;
      continue;
    }
    if (!a.inputs || a.inputs.length === 0 || a.inputs.length !== n.length)
      continue;
    if (
      n.every((p, d) => {
        let f = "inputs" in a && a.inputs[d];
        return f ? en(p, f) : !1;
      })
    ) {
      if (s && "inputs" in s && s.inputs) {
        let p = Sr(a.inputs, s.inputs, n);
        if (p)
          throw new rt({ abiItem: a, type: p[0] }, { abiItem: s, type: p[1] });
      }
      s = a;
    }
  }
  return s || i[0];
}
function en(e, t) {
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
        ? Object.values(t.components).every((o, i) =>
            en(Object.values(e)[i], o)
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
            en(o, v(h({}, t), { type: r.replace(/(\[[0-9]{0,}\])$/, "") }))
          )
        : !1;
  }
}
function Sr(e, t, n) {
  for (let r in e) {
    let o = e[r],
      i = t[r];
    if (
      o.type === "tuple" &&
      i.type === "tuple" &&
      "components" in o &&
      "components" in i
    )
      return Sr(o.components, i.components, n[r]);
    let s = [o.type, i.type];
    if (
      s.includes("address") && s.includes("bytes20")
        ? !0
        : s.includes("address") && s.includes("string")
        ? $(n[r], { strict: !1 })
        : s.includes("address") && s.includes("bytes")
        ? $(n[r], { strict: !1 })
        : !1
    )
      return s;
  }
}
var Mr = { gwei: 9, wei: 18 },
  Er = { ether: -9, wei: 9 };
function vt(e, t) {
  let n = e.toString(),
    r = n.startsWith("-");
  r && (n = n.slice(1)), (n = n.padStart(t, "0"));
  let [o, i] = [n.slice(0, n.length - t), n.slice(n.length - t)];
  return (
    (i = i.replace(/(0+)$/, "")),
    `${r ? "-" : ""}${o || "0"}${i ? `.${i}` : ""}`
  );
}
function Tr(e, t = "wei") {
  return vt(e, Mr[t]);
}
function U(e, t = "wei") {
  return vt(e, Er[t]);
}
var $t = class extends u {
    constructor({ address: t }) {
      super(`State for account "${t}" is set multiple times.`, {
        name: "AccountStateConflictError",
      });
    }
  },
  At = class extends u {
    constructor() {
      super("state and stateDiff are set on the same account.", {
        name: "StateAssignmentConflictError",
      });
    }
  };
function Br(e) {
  return e.reduce(
    (t, { slot: n, value: r }) => `${t}        ${n}: ${r}
`,
    ""
  );
}
function kr(e) {
  return e
    .reduce(
      (t, o) => {
        var i = o,
          { address: n } = i,
          r = z(i, ["address"]);
        let s = `${t}    ${n}:
`;
        return (
          r.nonce &&
            (s += `      nonce: ${r.nonce}
`),
          r.balance &&
            (s += `      balance: ${r.balance}
`),
          r.code &&
            (s += `      code: ${r.code}
`),
          r.state &&
            ((s += `      state:
`),
            (s += Br(r.state))),
          r.stateDiff &&
            ((s += `      stateDiff:
`),
            (s += Br(r.stateDiff))),
          s
        );
      },
      `  State Override:
`
    )
    .slice(0, -1);
}
function Or(e) {
  let t = Object.entries(e)
      .map(([r, o]) => (o === void 0 || o === !1 ? null : [r, o]))
      .filter(Boolean),
    n = t.reduce((r, [o]) => Math.max(r, o.length), 0);
  return t.map(([r, o]) => `  ${`${r}:`.padEnd(n + 1)}  ${o}`).join(`
`);
}
var Pt = class extends u {
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
var Se = (e) => e;
var It = class extends u {
  constructor(
    t,
    {
      account: n,
      docsPath: r,
      chain: o,
      data: i,
      gas: s,
      gasPrice: a,
      maxFeePerGas: c,
      maxPriorityFeePerGas: p,
      nonce: d,
      to: f,
      value: y,
      stateOverride: l,
    }
  ) {
    let m = n ? Y(n) : void 0,
      x = Or({
        from: m?.address,
        to: f,
        value:
          typeof y < "u" && `${Tr(y)} ${o?.nativeCurrency?.symbol || "ETH"}`,
        data: i,
        gas: s,
        gasPrice: typeof a < "u" && `${U(a)} gwei`,
        maxFeePerGas: typeof c < "u" && `${U(c)} gwei`,
        maxPriorityFeePerGas: typeof p < "u" && `${U(p)} gwei`,
        nonce: d,
      });
    l &&
      (x += `
${kr(l)}`),
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
};
var St = class extends u {
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
  Mt = class extends u {
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
var tn = "/docs/contract/decodeFunctionResult";
function zr(e) {
  let { abi: t, args: n, functionName: r, data: o } = e,
    i = t[0];
  if (r) {
    let a = wt({ abi: t, args: n, name: r });
    if (!a) throw new N(r, { docsPath: tn });
    i = a;
  }
  if (i.type !== "function") throw new N(void 0, { docsPath: tn });
  if (!i.outputs) throw new nt(i.name, { docsPath: tn });
  let s = gt(i.outputs, o);
  if (s && s.length > 1) return s;
  if (s && s.length === 1) return s[0];
}
var nn = "/docs/contract/encodeDeployData";
function rn(e) {
  let { abi: t, args: n, bytecode: r } = e;
  if (!n || n.length === 0) return r;
  let o = t.find((s) => "type" in s && s.type === "constructor");
  if (!o) throw new Je({ docsPath: nn });
  if (!("inputs" in o)) throw new he({ docsPath: nn });
  if (!o.inputs || o.inputs.length === 0) throw new he({ docsPath: nn });
  let i = ne(o.inputs, n);
  return Pe([r, i]);
}
var Cr = "/docs/contract/encodeFunctionData";
function Rr(e) {
  let { abi: t, args: n, functionName: r } = e,
    o = t[0];
  if (r) {
    let i = wt({ abi: t, args: n, name: r });
    if (!i) throw new N(r, { docsPath: Cr });
    o = i;
  }
  if (o.type !== "function") throw new N(void 0, { docsPath: Cr });
  return { abi: [o], functionName: ee(Z(o)) };
}
function jr(e) {
  let { args: t } = e,
    { abi: n, functionName: r } =
      e.abi.length === 1 && e.functionName?.startsWith("0x") ? e : Rr(e),
    o = n[0],
    i = r,
    s = "inputs" in o && o.inputs ? ne(o.inputs, t ?? []) : void 0;
  return Pe([i, s ?? "0x"]);
}
function Ur({ blockNumber: e, chain: t, contract: n }) {
  let r = t?.contracts?.[n];
  if (!r) throw new W({ chain: t, contract: { name: n } });
  if (e && r.blockCreated && r.blockCreated > e)
    throw new W({
      blockNumber: e,
      chain: t,
      contract: { name: n, blockCreated: r.blockCreated },
    });
  return r.address;
}
var F = class extends u {
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
Object.defineProperty(F, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 3,
});
Object.defineProperty(F, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /execution reverted/,
});
var G = class extends u {
  constructor({ cause: t, maxFeePerGas: n } = {}) {
    super(
      `The fee cap (\`maxFeePerGas\`${
        n ? ` = ${U(n)} gwei` : ""
      }) cannot be higher than the maximum allowed value (2^256-1).`,
      { cause: t, name: "FeeCapTooHighError" }
    );
  }
};
Object.defineProperty(G, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /max fee per gas higher than 2\^256-1|fee cap higher than 2\^256-1/,
});
var se = class extends u {
  constructor({ cause: t, maxFeePerGas: n } = {}) {
    super(
      `The fee cap (\`maxFeePerGas\`${
        n ? ` = ${U(n)}` : ""
      } gwei) cannot be lower than the block base fee.`,
      { cause: t, name: "FeeCapTooLowError" }
    );
  }
};
Object.defineProperty(se, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value:
    /max fee per gas less than block base fee|fee cap less than block base fee|transaction is outdated/,
});
var ie = class extends u {
  constructor({ cause: t, nonce: n } = {}) {
    super(
      `Nonce provided for the transaction ${
        n ? `(${n}) ` : ""
      }is higher than the next one expected.`,
      { cause: t, name: "NonceTooHighError" }
    );
  }
};
Object.defineProperty(ie, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /nonce too high/,
});
var ae = class extends u {
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
Object.defineProperty(ae, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /nonce too low|transaction already imported|already known/,
});
var ue = class extends u {
  constructor({ cause: t, nonce: n } = {}) {
    super(
      `Nonce provided for the transaction ${
        n ? `(${n}) ` : ""
      }exceeds the maximum allowed nonce.`,
      { cause: t, name: "NonceMaxValueError" }
    );
  }
};
Object.defineProperty(ue, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /nonce has max value/,
});
var ce = class extends u {
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
Object.defineProperty(ce, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /insufficient funds|exceeds transaction sender account balance/,
});
var pe = class extends u {
  constructor({ cause: t, gas: n } = {}) {
    super(
      `The amount of gas ${
        n ? `(${n}) ` : ""
      }provided for the transaction exceeds the limit allowed for the block.`,
      { cause: t, name: "IntrinsicGasTooHighError" }
    );
  }
};
Object.defineProperty(pe, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /intrinsic gas too high|gas limit reached/,
});
var de = class extends u {
  constructor({ cause: t, gas: n } = {}) {
    super(
      `The amount of gas ${
        n ? `(${n}) ` : ""
      }provided for the transaction is too low.`,
      { cause: t, name: "IntrinsicGasTooLowError" }
    );
  }
};
Object.defineProperty(de, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /intrinsic gas too low/,
});
var fe = class extends u {
  constructor({ cause: t }) {
    super("The transaction type is not supported for this chain.", {
      cause: t,
      name: "TransactionTypeNotSupportedError",
    });
  }
};
Object.defineProperty(fe, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /transaction type not valid/,
});
var V = class extends u {
  constructor({ cause: t, maxPriorityFeePerGas: n, maxFeePerGas: r } = {}) {
    super(
      [
        `The provided tip (\`maxPriorityFeePerGas\`${
          n ? ` = ${U(n)} gwei` : ""
        }) cannot be higher than the fee cap (\`maxFeePerGas\`${
          r ? ` = ${U(r)} gwei` : ""
        }).`,
      ].join(`
`),
      { cause: t, name: "TipAboveFeeCapError" }
    );
  }
};
Object.defineProperty(V, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value:
    /max priority fee per gas higher than max fee per gas|tip higher than fee cap/,
});
var le = class extends u {
  constructor({ cause: t }) {
    super(`An error occurred while executing: ${t?.shortMessage}`, {
      cause: t,
      name: "UnknownNodeError",
    });
  }
};
var Me = class extends u {
  constructor({
    body: t,
    cause: n,
    details: r,
    headers: o,
    status: i,
    url: s,
  }) {
    super("HTTP request failed.", {
      cause: n,
      details: r,
      metaMessages: [
        i && `Status: ${i}`,
        `URL: ${Se(s)}`,
        t && `Request body: ${oe(t)}`,
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
      (this.status = i),
      (this.url = s);
  }
};
function Fr(e, t) {
  let n = (e.details || "").toLowerCase(),
    r = e instanceof u ? e.walk((o) => o?.code === F.code) : e;
  return r instanceof u
    ? new F({ cause: e, message: r.details })
    : F.nodeMessage.test(n)
    ? new F({ cause: e, message: e.details })
    : G.nodeMessage.test(n)
    ? new G({ cause: e, maxFeePerGas: t?.maxFeePerGas })
    : se.nodeMessage.test(n)
    ? new se({ cause: e, maxFeePerGas: t?.maxFeePerGas })
    : ie.nodeMessage.test(n)
    ? new ie({ cause: e, nonce: t?.nonce })
    : ae.nodeMessage.test(n)
    ? new ae({ cause: e, nonce: t?.nonce })
    : ue.nodeMessage.test(n)
    ? new ue({ cause: e, nonce: t?.nonce })
    : ce.nodeMessage.test(n)
    ? new ce({ cause: e })
    : pe.nodeMessage.test(n)
    ? new pe({ cause: e, gas: t?.gas })
    : de.nodeMessage.test(n)
    ? new de({ cause: e, gas: t?.gas })
    : fe.nodeMessage.test(n)
    ? new fe({ cause: e })
    : V.nodeMessage.test(n)
    ? new V({
        cause: e,
        maxFeePerGas: t?.maxFeePerGas,
        maxPriorityFeePerGas: t?.maxPriorityFeePerGas,
      })
    : new le({ cause: e });
}
function Lr(e, r) {
  var o = r,
    { docsPath: t } = o,
    n = z(o, ["docsPath"]);
  let i = (() => {
    let s = Fr(e, n);
    return s instanceof le ? e : s;
  })();
  return new It(i, h({ docsPath: t }, n));
}
function Dr(e, { format: t }) {
  if (!t) return {};
  let n = {};
  function r(i) {
    let s = Object.keys(i);
    for (let a of s)
      a in e && (n[a] = e[a]),
        i[a] && typeof i[a] == "object" && !Array.isArray(i[a]) && r(i[a]);
  }
  let o = t(e || {});
  return r(o), n;
}
var Xo = {
  legacy: "0x0",
  eip2930: "0x1",
  eip1559: "0x2",
  eip4844: "0x3",
  eip7702: "0x4",
};
function Nr(e) {
  let t = {};
  return (
    typeof e.authorizationList < "u" &&
      (t.authorizationList = Jo(e.authorizationList)),
    typeof e.accessList < "u" && (t.accessList = e.accessList),
    typeof e.blobVersionedHashes < "u" &&
      (t.blobVersionedHashes = e.blobVersionedHashes),
    typeof e.blobs < "u" &&
      (typeof e.blobs[0] != "string"
        ? (t.blobs = e.blobs.map((n) => S(n)))
        : (t.blobs = e.blobs)),
    typeof e.data < "u" && (t.data = e.data),
    typeof e.from < "u" && (t.from = e.from),
    typeof e.gas < "u" && (t.gas = b(e.gas)),
    typeof e.gasPrice < "u" && (t.gasPrice = b(e.gasPrice)),
    typeof e.maxFeePerBlobGas < "u" &&
      (t.maxFeePerBlobGas = b(e.maxFeePerBlobGas)),
    typeof e.maxFeePerGas < "u" && (t.maxFeePerGas = b(e.maxFeePerGas)),
    typeof e.maxPriorityFeePerGas < "u" &&
      (t.maxPriorityFeePerGas = b(e.maxPriorityFeePerGas)),
    typeof e.nonce < "u" && (t.nonce = b(e.nonce)),
    typeof e.to < "u" && (t.to = e.to),
    typeof e.type < "u" && (t.type = Xo[e.type]),
    typeof e.value < "u" && (t.value = b(e.value)),
    t
  );
}
function Jo(e) {
  return e.map((t) =>
    h(
      h(
        {
          address: t.contractAddress,
          r: t.r,
          s: t.s,
          chainId: b(t.chainId),
          nonce: b(t.nonce),
        },
        typeof t.yParity < "u" ? { yParity: b(t.yParity) } : {}
      ),
      typeof t.v < "u" && typeof t.yParity > "u" ? { v: b(t.v) } : {}
    )
  );
}
function Hr() {
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
var on = new Map();
function _r({ fn: e, id: t, shouldSplitBatch: n, wait: r = 0, sort: o }) {
  let i = () =>
      B(this, null, function* () {
        let f = c();
        s();
        let y = f.map(({ args: l }) => l);
        y.length !== 0 &&
          e(y)
            .then((l) => {
              o && Array.isArray(l) && l.sort(o);
              for (let m = 0; m < f.length; m++) {
                let { resolve: x } = f[m];
                x?.([l[m], l]);
              }
            })
            .catch((l) => {
              for (let m = 0; m < f.length; m++) {
                let { reject: x } = f[m];
                x?.(l);
              }
            });
      }),
    s = () => on.delete(t),
    a = () => c().map(({ args: f }) => f),
    c = () => on.get(t) || [],
    p = (f) => on.set(t, [...c(), f]);
  return {
    flush: s,
    schedule(f) {
      return B(this, null, function* () {
        let { promise: y, resolve: l, reject: m } = Hr();
        return (
          n?.([...a(), f]) && i(),
          c().length > 0
            ? (p({ args: f, resolve: l, reject: m }), y)
            : (p({ args: f, resolve: l, reject: m }), setTimeout(i, r), y)
        );
      });
    },
  };
}
function Gr(e) {
  if (!(!e || e.length === 0))
    return e.reduce((t, { slot: n, value: r }) => {
      if (n.length !== 66)
        throw new we({ size: n.length, targetSize: 66, type: "hex" });
      if (r.length !== 66)
        throw new we({ size: r.length, targetSize: 66, type: "hex" });
      return (t[n] = r), t;
    }, {});
}
function Yo(e) {
  let { balance: t, nonce: n, state: r, stateDiff: o, code: i } = e,
    s = {};
  if (
    (i !== void 0 && (s.code = i),
    t !== void 0 && (s.balance = b(t)),
    n !== void 0 && (s.nonce = b(n)),
    r !== void 0 && (s.state = Gr(r)),
    o !== void 0)
  ) {
    if (s.state) throw new At();
    s.stateDiff = Gr(o);
  }
  return s;
}
function Vr(e) {
  if (!e) return;
  let t = {};
  for (let n of e) {
    let r = n,
      { address: o } = r,
      i = z(r, ["address"]);
    if (!$(o, { strict: !1 })) throw new M({ address: o });
    if (t[o]) throw new $t({ address: o });
    t[o] = Yo(i);
  }
  return t;
}
var qc = 2n ** (8n - 1n) - 1n,
  Qc = 2n ** (16n - 1n) - 1n,
  ep = 2n ** (24n - 1n) - 1n,
  tp = 2n ** (32n - 1n) - 1n,
  np = 2n ** (40n - 1n) - 1n,
  rp = 2n ** (48n - 1n) - 1n,
  op = 2n ** (56n - 1n) - 1n,
  sp = 2n ** (64n - 1n) - 1n,
  ip = 2n ** (72n - 1n) - 1n,
  ap = 2n ** (80n - 1n) - 1n,
  up = 2n ** (88n - 1n) - 1n,
  cp = 2n ** (96n - 1n) - 1n,
  pp = 2n ** (104n - 1n) - 1n,
  dp = 2n ** (112n - 1n) - 1n,
  fp = 2n ** (120n - 1n) - 1n,
  lp = 2n ** (128n - 1n) - 1n,
  mp = 2n ** (136n - 1n) - 1n,
  yp = 2n ** (144n - 1n) - 1n,
  bp = 2n ** (152n - 1n) - 1n,
  hp = 2n ** (160n - 1n) - 1n,
  xp = 2n ** (168n - 1n) - 1n,
  gp = 2n ** (176n - 1n) - 1n,
  wp = 2n ** (184n - 1n) - 1n,
  vp = 2n ** (192n - 1n) - 1n,
  $p = 2n ** (200n - 1n) - 1n,
  Ap = 2n ** (208n - 1n) - 1n,
  Pp = 2n ** (216n - 1n) - 1n,
  Ip = 2n ** (224n - 1n) - 1n,
  Sp = 2n ** (232n - 1n) - 1n,
  Mp = 2n ** (240n - 1n) - 1n,
  Ep = 2n ** (248n - 1n) - 1n,
  Tp = 2n ** (256n - 1n) - 1n,
  Bp = -(2n ** (8n - 1n)),
  kp = -(2n ** (16n - 1n)),
  Op = -(2n ** (24n - 1n)),
  zp = -(2n ** (32n - 1n)),
  Cp = -(2n ** (40n - 1n)),
  Rp = -(2n ** (48n - 1n)),
  jp = -(2n ** (56n - 1n)),
  Up = -(2n ** (64n - 1n)),
  Fp = -(2n ** (72n - 1n)),
  Lp = -(2n ** (80n - 1n)),
  Dp = -(2n ** (88n - 1n)),
  Np = -(2n ** (96n - 1n)),
  Hp = -(2n ** (104n - 1n)),
  _p = -(2n ** (112n - 1n)),
  Gp = -(2n ** (120n - 1n)),
  Vp = -(2n ** (128n - 1n)),
  Wp = -(2n ** (136n - 1n)),
  Zp = -(2n ** (144n - 1n)),
  Kp = -(2n ** (152n - 1n)),
  Xp = -(2n ** (160n - 1n)),
  Jp = -(2n ** (168n - 1n)),
  Yp = -(2n ** (176n - 1n)),
  qp = -(2n ** (184n - 1n)),
  Qp = -(2n ** (192n - 1n)),
  e0 = -(2n ** (200n - 1n)),
  t0 = -(2n ** (208n - 1n)),
  n0 = -(2n ** (216n - 1n)),
  r0 = -(2n ** (224n - 1n)),
  o0 = -(2n ** (232n - 1n)),
  s0 = -(2n ** (240n - 1n)),
  i0 = -(2n ** (248n - 1n)),
  a0 = -(2n ** (256n - 1n)),
  u0 = 2n ** 8n - 1n,
  c0 = 2n ** 16n - 1n,
  p0 = 2n ** 24n - 1n,
  d0 = 2n ** 32n - 1n,
  f0 = 2n ** 40n - 1n,
  l0 = 2n ** 48n - 1n,
  m0 = 2n ** 56n - 1n,
  y0 = 2n ** 64n - 1n,
  b0 = 2n ** 72n - 1n,
  h0 = 2n ** 80n - 1n,
  x0 = 2n ** 88n - 1n,
  g0 = 2n ** 96n - 1n,
  w0 = 2n ** 104n - 1n,
  v0 = 2n ** 112n - 1n,
  $0 = 2n ** 120n - 1n,
  A0 = 2n ** 128n - 1n,
  P0 = 2n ** 136n - 1n,
  I0 = 2n ** 144n - 1n,
  S0 = 2n ** 152n - 1n,
  M0 = 2n ** 160n - 1n,
  E0 = 2n ** 168n - 1n,
  T0 = 2n ** 176n - 1n,
  B0 = 2n ** 184n - 1n,
  k0 = 2n ** 192n - 1n,
  O0 = 2n ** 200n - 1n,
  z0 = 2n ** 208n - 1n,
  C0 = 2n ** 216n - 1n,
  R0 = 2n ** 224n - 1n,
  j0 = 2n ** 232n - 1n,
  U0 = 2n ** 240n - 1n,
  F0 = 2n ** 248n - 1n,
  Wr = 2n ** 256n - 1n;
function Zr(e) {
  let {
      account: t,
      gasPrice: n,
      maxFeePerGas: r,
      maxPriorityFeePerGas: o,
      to: i,
    } = e,
    s = t ? Y(t) : void 0;
  if (s && !$(s.address)) throw new M({ address: s.address });
  if (i && !$(i)) throw new M({ address: i });
  if (typeof n < "u" && (typeof r < "u" || typeof o < "u")) throw new Pt();
  if (r && r > Wr) throw new G({ maxFeePerGas: r });
  if (o && r && o > r)
    throw new V({ maxFeePerGas: r, maxPriorityFeePerGas: o });
}
function Kr(e, t) {
  return B(this, null, function* () {
    let pn = t,
      {
        account: n = e.account,
        batch: r = !!e.batch?.multicall,
        blockNumber: o,
        blockTag: i = "latest",
        accessList: s,
        blobs: a,
        code: c,
        data: p,
        factory: d,
        factoryData: f,
        gas: y,
        gasPrice: l,
        maxFeePerBlobGas: m,
        maxFeePerGas: x,
        maxPriorityFeePerGas: L,
        nonce: me,
        to: T,
        value: Ee,
        stateOverride: Jr,
      } = pn,
      Yr = z(pn, [
        "account",
        "batch",
        "blockNumber",
        "blockTag",
        "accessList",
        "blobs",
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
      sn = n ? Y(n) : void 0;
    if (c && (d || f))
      throw new u(
        "Cannot provide both `code` & `factory`/`factoryData` as parameters."
      );
    if (c && T) throw new u("Cannot provide both `code` & `to` as parameters.");
    let an = c && p,
      un = d && f && T && p,
      cn = an || un,
      qr = an
        ? es({ code: c, data: p })
        : un
        ? ts({ data: p, factory: d, factoryData: f, to: T })
        : p;
    try {
      Zr(t);
      let X = (o ? b(o) : void 0) || i,
        ye = Vr(Jr),
        Te = e.chain?.formatters?.transactionRequest?.format,
        Be = (Te || Nr)(
          v(h({}, Dr(Yr, { format: Te })), {
            from: sn?.address,
            accessList: s,
            blobs: a,
            data: qr,
            gas: y,
            gasPrice: l,
            maxFeePerBlobGas: m,
            maxFeePerGas: x,
            maxPriorityFeePerGas: L,
            nonce: me,
            to: cn ? void 0 : T,
            value: Ee,
          })
        );
      if (r && qo({ request: Be }) && !ye)
        try {
          return yield Qo(e, v(h({}, Be), { blockNumber: o, blockTag: i }));
        } catch (Ot) {
          if (!(Ot instanceof be) && !(Ot instanceof W)) throw Ot;
        }
      let dn = yield e.request({
        method: "eth_call",
        params: ye ? [Be, X, ye] : [Be, X],
      });
      return dn === "0x" ? { data: void 0 } : { data: dn };
    } catch (kt) {
      let X = ns(kt),
        { offchainLookup: ye, offchainLookupSignature: Te } = yield import(
          "./chunk-XYFPSTQF.js"
        );
      if (e.ccipRead !== !1 && X?.slice(0, 10) === Te && T)
        return { data: yield ye(e, { data: X, to: T }) };
      throw cn && X?.slice(0, 10) === "0x101bb98d"
        ? new St({ factory: d })
        : Lr(kt, v(h({}, t), { account: sn, chain: e.chain }));
    }
  });
}
function qo({ request: e }) {
  let o = e,
    { data: t, to: n } = o,
    r = z(o, ["data", "to"]);
  return !(
    !t ||
    t.startsWith(Vn) ||
    !n ||
    Object.values(r).filter((i) => typeof i < "u").length > 0
  );
}
function Qo(e, t) {
  return B(this, null, function* () {
    let { batchSize: n = 1024, wait: r = 0 } =
        typeof e.batch?.multicall == "object" ? e.batch.multicall : {},
      {
        blockNumber: o,
        blockTag: i = "latest",
        data: s,
        multicallAddress: a,
        to: c,
      } = t,
      p = a;
    if (!p) {
      if (!e.chain) throw new be();
      p = Ur({ blockNumber: o, chain: e.chain, contract: "multicall3" });
    }
    let f = (o ? b(o) : void 0) || i,
      { schedule: y } = _r({
        id: `${e.uid}.${f}`,
        wait: r,
        shouldSplitBatch(x) {
          return x.reduce((me, { data: T }) => me + (T.length - 2), 0) > n * 2;
        },
        fn: (x) =>
          B(this, null, function* () {
            let L = x.map((Ee) => ({
                allowFailure: !0,
                callData: Ee.data,
                target: Ee.to,
              })),
              me = jr({ abi: Nt, args: [L], functionName: "aggregate3" }),
              T = yield e.request({
                method: "eth_call",
                params: [{ data: me, to: p }, f],
              });
            return zr({
              abi: Nt,
              args: [L],
              functionName: "aggregate3",
              data: T || "0x",
            });
          }),
      }),
      [{ returnData: l, success: m }] = yield y({ data: s, to: c });
    if (!m) throw new Mt({ data: l });
    return l === "0x" ? { data: void 0 } : { data: l };
  });
}
function es(e) {
  let { code: t, data: n } = e;
  return rn({
    abi: Ze(["constructor(bytes, bytes)"]),
    bytecode: Wn,
    args: [t, n],
  });
}
function ts(e) {
  let { data: t, factory: n, factoryData: r, to: o } = e;
  return rn({
    abi: Ze(["constructor(address, bytes, address, bytes)"]),
    bytecode: Zn,
    args: [o, t, n, r],
  });
}
function ns(e) {
  if (!(e instanceof u)) return;
  let t = e.walk();
  return typeof t?.data == "object" ? t.data?.data : t.data;
}
var Et = class extends u {
    constructor({
      callbackSelector: t,
      cause: n,
      data: r,
      extraData: o,
      sender: i,
      urls: s,
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
            s && ["  Gateway URL(s):", ...s.map((a) => `    ${Se(a)}`)],
            `  Sender: ${i}`,
            `  Data: ${r}`,
            `  Callback selector: ${t}`,
            `  Extra data: ${o}`,
          ].flat(),
          name: "OffchainLookupError",
        }
      );
    }
  },
  Tt = class extends u {
    constructor({ result: t, url: n }) {
      super(
        "Offchain gateway response is malformed. Response data must be a hex value.",
        {
          metaMessages: [`Gateway URL: ${Se(n)}`, `Response: ${oe(t)}`],
          name: "OffchainLookupResponseMalformedError",
        }
      );
    }
  },
  Bt = class extends u {
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
function Xr(e, t) {
  if (!$(e, { strict: !1 })) throw new M({ address: e });
  if (!$(t, { strict: !1 })) throw new M({ address: t });
  return e.toLowerCase() === t.toLowerCase();
}
var Bd = "0x556f1830",
  rs = {
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
function kd(i, s) {
  return B(
    this,
    arguments,
    function* (e, { blockNumber: t, blockTag: n, data: r, to: o }) {
      let { args: a } = Pr({ data: r, abi: [rs] }),
        [c, p, d, f, y] = a,
        { ccipRead: l } = e,
        m = l && typeof l?.request == "function" ? l.request : os;
      try {
        if (!Xr(o, c)) throw new Bt({ sender: c, to: o });
        let x = yield m({ data: d, sender: c, urls: p }),
          { data: L } = yield Kr(e, {
            blockNumber: t,
            blockTag: n,
            data: j([f, ne([{ type: "bytes" }, { type: "bytes" }], [x, y])]),
            to: o,
          });
        return L;
      } catch (x) {
        throw new Et({
          callbackSelector: f,
          cause: x,
          data: r,
          extraData: y,
          sender: c,
          urls: p,
        });
      }
    }
  );
}
function os(r) {
  return B(this, arguments, function* ({ data: e, sender: t, urls: n }) {
    let o = new Error("An unknown error occurred.");
    for (let i = 0; i < n.length; i++) {
      let s = n[i],
        a = s.includes("{data}") ? "GET" : "POST",
        c = a === "POST" ? { data: e, sender: t } : void 0,
        p = a === "POST" ? { "Content-Type": "application/json" } : {};
      try {
        let d = yield fetch(s.replace("{sender}", t).replace("{data}", e), {
            body: JSON.stringify(c),
            headers: p,
            method: a,
          }),
          f;
        if (
          (d.headers.get("Content-Type")?.startsWith("application/json")
            ? (f = (yield d.json()).data)
            : (f = yield d.text()),
          !d.ok)
        ) {
          o = new Me({
            body: c,
            details: f?.error ? oe(f.error) : d.statusText,
            headers: d.headers,
            status: d.status,
            url: s,
          });
          continue;
        }
        if (!I(f)) {
          o = new Tt({ result: f, url: s });
          continue;
        }
        return f;
      } catch (d) {
        o = new Me({ body: c, details: d.message, url: s });
      }
    }
    throw o;
  });
}
export {
  I as a,
  Vt as b,
  Qn as c,
  er as d,
  lt as e,
  yt as f,
  Bd as g,
  rs as h,
  kd as i,
  os as j,
};
