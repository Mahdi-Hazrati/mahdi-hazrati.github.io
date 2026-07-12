---
title: "The Vibe Coding Trap: Why 'Just Let the AI Do It' Fails at Scale"
description: "Vibe coding feels fast because it defers all its cost to later. A field guide to the five failure modes I see over and over — and why they're structural, not incidental."
date: "2026-07-15"
tags: ["AI Engineering", "Engineering Philosophy", "Software Quality"]
featured: false
published: true
thumbnail: "/blog/thumbnails/vibe-coding-trap.svg"
---

Part 2 of the [AI-Orchestrated Engineering](/blog/ai-orchestrated-engineering-manifesto) series.

Vibe coding isn't bad because AI is bad at writing code. Modern models write code well. It's bad because of what the *practice* systematically removes: the moment where a human decides whether the output is actually correct. Remove that moment enough times in a row and you get one of five failure modes, reliably.

## 1. Silent scope drift

You ask for a fix. The model also "improves" three adjacent things you didn't ask about. Vibe coding accepts the diff wholesale because reading it carefully defeats the purpose of not thinking. Six prompts later, the codebase has drifted somewhere nobody chose.

**Why it's structural:** nothing in the loop distinguishes "requested change" from "opportunistic change." Without a reviewer holding scope, scope isn't held.

## 2. Confidently wrong abstractions

Ask an LLM to add a feature to an unfamiliar codebase and it will often invent a plausible-looking abstraction that doesn't match the codebase's actual conventions — a new state pattern next to three existing ones, a bespoke error type next to a shared one. It compiles. It works. It also fragments the system a little more with every prompt.

**Why it's structural:** the model is optimizing for "this instance passes," not "this fits the system." Fit is an architectural judgment, and vibe coding has no step where architectural judgment gets applied.

## 3. Verification theater

"It ran without errors" gets treated as proof of correctness. It isn't. It's proof the happy path didn't crash. Edge cases, concurrency, malformed input, the error branch nobody tested — all invisible to "it ran."

**Why it's structural:** vibe coding's feedback loop is the terminal, not a spec. A terminal that doesn't complain is not the same as a system that's correct.

## 4. Compounding technical debt with no debtor

Normal technical debt has an owner who knows it's there and can pay it down. Vibe-coded debt is invisible even to the person who "wrote" it — they never held the whole shape in their head to begin with. It compounds silently until a change in an unrelated file breaks something nobody remembers building.

**Why it's structural:** debt requires a mental model to track against. If no one ever built the mental model, there's no ledger — just surprise.

## 5. The skill atrophy spiral

The more you outsource the *thinking* (not the typing) to the model, the worse you get at catching its mistakes, which makes you more dependent on it being right, which means you review its output even less carefully next time. It's a ratchet, and it only turns one way.

**Why it's structural:** judgment is a muscle. Vibe coding is specifically the practice of not exercising it.

## The tell

None of these five failures are about model capability. GPT-5-class and Claude-5-class models are entirely capable of producing code that avoids every one of them — *if* something in the process demands it. Vibe coding is defined by the absence of that demand, not by which model you're using.

That's the actual diagnostic question, and it's the same question in every one of these five cases: **is there a step in your process whose job is to catch this before it ships?**

If the honest answer is "no, I just trust the output," you're vibe coding, regardless of how sophisticated your prompts are.

The next post in this series lays out what replaces that missing step: [The Five Layers of AI-Orchestrated Engineering](/blog/five-layers-ai-orchestrated-engineering).
