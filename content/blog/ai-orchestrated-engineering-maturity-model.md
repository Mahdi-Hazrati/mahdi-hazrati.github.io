---
title: "Are You Orchestrating or Vibing? A Maturity Model for AI-Assisted Engineering"
description: "A five-level, self-scoring checklist to find out   honestly   whether your AI-assisted workflow is AI-Orchestrated Engineering or vibe coding with extra steps."
date: "2026-07-26"
tags: ["AI Engineering", "Engineering Philosophy", "Software Quality"]
featured: false
published: true
thumbnail: "/blog/thumbnails/aioe-maturity-model.svg"
---

Closing part of the [AI-Orchestrated Engineering](/blog/ai-orchestrated-engineering-manifesto) series. The [manifesto](/blog/ai-orchestrated-engineering-manifesto) named the discipline, the [five layers](/blog/five-layers-ai-orchestrated-engineering) framed the process, [orchestration patterns](/blog/orchestration-patterns-for-engineers) gave the mechanics. This is the mirror: a maturity model to check where a given workflow   yours, your team's   actually sits, level by level.

Score each level honestly. You're not done with a level until every item is true *most of the time*, not on your best day.

## Level 0   Pure vibe coding

- [ ] Prompt → paste → run → if it crashes, paste the error back
- [ ] No step exists whose job is to say "no"
- [ ] "It ran" is the definition of done
- [ ] You couldn't describe the system's architecture without rereading the code

If this is you, you're not orchestrating anything   you're gambling with a very fast dealer. Nothing wrong with using it to throw away a prototype. Everything wrong with shipping it.

## Level 1   Supervised generation

- [ ] You read every diff before accepting it
- [ ] You know *what* you asked for and can tell if the output matches
- [ ] You still have no explicit spec   correctness is "looks right to me"
- [ ] Verification is a single human glance, not a check that can fail

This is most people's honest starting point. It's real progress over Level 0   a human is in the loop   but "looks right to me" doesn't scale past the size of code one person can hold in their head, and it catches nothing subtle.

## Level 2   Specified delegation

- [ ] Before delegating, you write down what "correct" means for this unit (Layer 1: Intent)
- [ ] The problem is broken into units small enough to verify independently (Layer 2: Decomposition)
- [ ] You deliberately choose what to delegate vs. keep human-only (Layer 3: Delegation)
- [ ] Every unit has *some* check beyond "I looked at it"   a test, at minimum

This is the threshold of AI-Orchestrated Engineering. It's not fully mature yet, but the structural difference from vibe coding already exists: there's a step whose job is to catch a wrong answer.

## Level 3   Adversarial verification

- [ ] Verification actively tries to refute the output, not just confirm it looks fine
- [ ] High-stakes units get more than one independent check
- [ ] You can point to a specific defect your process caught *before* it shipped, in the last month
- [ ] Synthesis is a real step   you check the integrated whole, not just the sum of verified parts (Layer 5)

Most teams that think they're "doing AI engineering well" plateau here, and it's a genuinely good place to be. The gap to Level 4 is about process, not effort.

## Level 4   Orchestrated at scale

- [ ] Independent units run in parallel by design (fan-out/fan-in or pipeline), not by accident
- [ ] Discovery work (bugs, edge cases, missing coverage) runs until it demonstrably stops finding new things, not until you get bored
- [ ] The process is repeatable by someone other than you   it's documented as a process, not tacit knowledge in your head
- [ ] You can scale scope 10x by running the same process more, not by working harder per prompt

Level 4 is where "AI-Orchestrated Engineering" stops being a philosophy and becomes an operating model   the same rigor at any scope, because the rigor lives in the process instead of in how carefully you happened to read one diff.

## Using this honestly

The point of a maturity model isn't the score   it's the next unchecked box. If you're at Level 1, the highest-leverage move is writing down what "correct" means *before* you prompt (Level 2's first item), not jumping straight to parallel fan-out patterns you don't have the verification discipline to support yet.

Vibe coding is what happens when none of these boxes are checked and nobody notices. AI-Orchestrated Engineering is what happens when you check them on purpose, in order, every time the scope gets big enough to tempt you not to.
