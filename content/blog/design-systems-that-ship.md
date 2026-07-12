---
title: "Design Systems That Actually Ship"
description: "Lessons from building NPUI   tokens, primitives, and the gap between Figma and production."
date: "2025-04-02"
tags: ["Design Systems", "React", "NPUI"]
featured: true
published: true
thumbnail: "/blog/thumbnails/design-systems-ship.svg"
---

Most design systems die in Storybook. The ones that survive share a pattern: they optimize for **shipping speed**, not documentation completeness.

## Start with tokens, not components

Before Button v47, define:

- Color roles (`accent`, `muted`, `destructive`)   not hex values scattered in JSX
- Spacing scale tied to Tailwind or CSS variables
- Typography pairs (sans for UI, mono for code labels)
- Motion presets (spring configs you reuse everywhere)

NPUI started here. Components came second, and each one had to earn its place in the bundle.

## Primitives over patterns

A `Card` with three variants beats twelve one-off card layouts in product repos. But a `Card` that wraps every possible layout becomes impossible to maintain.

The balance:

| Layer | Purpose | Example |
| --- | --- | --- |
| Tokens | Visual language | `--accent`, `--radius` |
| Primitives | Composable building blocks | `Button`, `Badge`, `Input` |
| Patterns | Product-specific | Checkout form, dashboard shell |

Patterns live in apps. Primitives live in the library.

## Match the design tool to the runtime

Figma auto-layout ≠ CSS flexbox mental model. The fastest teams treat the design system as **the contract** and accept that implementation details differ.

What matters is:

1. Same spacing rhythm in design and code
2. Same interaction states (hover, focus, disabled)
3. Same naming so designers and devs share vocabulary

## Ship the docs you will read

Developers don't read 200-page PDFs. They read:

- One-line install instructions
- Copy-paste examples
- Props tables generated from TypeScript

If your docs aren't the first tab you open when using your own library, rewrite them.

## Closing thought

A design system is a product. Its users are your future self and your teammates. Ship small, iterate in production, and delete what nobody imports.
