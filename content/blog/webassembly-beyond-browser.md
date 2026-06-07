---
title: "WebAssembly Beyond the Browser"
description: "From Figma's design engine to Cloudflare Workers — why WASM is becoming the portable bytecode layer of the web stack."
date: "2025-05-12"
tags: ["WebAssembly", "Systems", "Performance"]
featured: false
published: true
thumbnail: "/blog/thumbnails/wasm.svg"
---

JavaScript won the browser. WASM is winning everything **near** the browser — plugins, edge compute, game engines, and polyglot runtimes that need near-native speed with sandboxing.

## What WASM actually is

WebAssembly is a **binary instruction format** — not a language. You compile Rust, C, C++, Go, or Zig to `.wasm` and run it in a stack-based VM with:

- Linear memory (one big byte array)
- No direct DOM access (without imports)
- Deterministic, sandboxed execution

```rust
// Rust → WASM via wasm-pack
#[wasm_bindgen]
pub fn fibonacci(n: u32) -> u32 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}
```

JavaScript calls it like any module export — but hot loops run at native-ish speed.

## The Component Model

WASI (WebAssembly System Interface) extends WASM beyond browsers — file I/O, sockets, clocks — with capability-based security. The **Component Model** adds typed interfaces between modules, like COM or gRPC but portable.

## Real deployments

| Product | WASM role |
| --- | --- |
| Figma | C++ core in browser |
| Shopify | Ruby/YJIT adjacent, Lua in WASM |
| Cloudflare Workers | V8 isolates + WASM |
| Deno | Rust core, WASM plugins |

## WASM vs JavaScript

| | JS | WASM |
| --- | --- | --- |
| Startup | Fast | Slower (compile) |
| Compute | JIT-dependent | Predictably fast |
| DOM | Native | Via JS glue |
| Ecosystem | Massive | Growing |

Use WASM when profiling shows JS bottlenecks — crypto, codecs, physics, parsing — not by default.

## Takeaway

WASM isn't replacing JavaScript. It's the **shared runtime layer** for code that needs speed and portability — one binary, browsers and servers alike.
