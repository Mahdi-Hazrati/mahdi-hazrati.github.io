---
title: "The Five Layers of AI-Orchestrated Engineering"
description: "Intent, Decomposition, Delegation, Verification, Synthesis   the framework I use to turn 'AI writes code fast' into 'AI-assisted systems are correct.'"
date: "2026-07-18"
tags: ["AI Engineering", "Software Architecture", "Engineering Philosophy"]
featured: false
published: true
thumbnail: "/blog/thumbnails/five-layers-aioe.svg"
---

Part 3 of the [AI-Orchestrated Engineering](/blog/ai-orchestrated-engineering-manifesto) series. If [the manifesto](/blog/ai-orchestrated-engineering-manifesto) makes the case that AIOE is a distinct discipline, this post is the framework   the five layers I actually run, in order, on real work.

## Layer 1   Intent

Before any prompt gets written, the outcome gets specified in terms that don't depend on the AI at all: what correct looks like, what the constraints are, what "done" means. If you can't write this layer down, you're not ready to delegate anything   you're about to gamble.

A useful test: could a competent engineer who's never seen an LLM read your Intent layer and know what "done" means? If not, it's not intent, it's a vibe.

## Layer 2   Decomposition

Break the problem into units small enough that:

- a wrong answer in one unit is cheap to detect, and
- a wrong answer in one unit doesn't silently corrupt another.

This is the layer vibe coding skips entirely   it hands the *whole* problem to the model in one prompt, which means a wrong turn on step one propagates, compounding, through everything downstream. Decomposition is what makes verification (Layer 4) actually tractable instead of a rubber stamp.

Good decomposition looks like the boundaries you'd draw for a human team: modules, interfaces, independent subsystems. The AI doesn't need protection from complexity   you need protection from a defect that's had time to spread.

## Layer 3   Delegation

*Now* the AI enters. Each decomposed unit goes to whichever combination of AI assistance and human effort fits it   some units the model drafts entirely, some it pairs on, some stay fully human (security-critical logic, the parts where "mostly right" isn't good enough). Delegation is a decision, not a default.

This is also where parallelism lives: independent units can be worked simultaneously   by multiple prompts, multiple sessions, multiple agents   precisely *because* Layer 2 made them independent.

## Layer 4   Verification

Every delegated unit is checked against Layer 1's definition of correct before it's trusted   tests, a second independent read, a spec diff, adversarial review. This is not optional and it is not "run it once and see." The check has to be capable of failing, or it isn't a check.

The strongest version of this layer treats verification itself as adversarial: assume the output is wrong and look for the proof, rather than assuming it's right and looking for confirmation. Those produce very different review habits.

## Layer 5   Synthesis

Verified units get integrated back into one coherent system   and this is where architectural judgment does its final pass. Do the pieces actually fit together the way Layer 1 intended? Did decomposition introduce a seam that doesn't belong? Synthesis is the layer that catches "every part passed review, but the whole doesn't hang together"   a failure mode invisible to Layer 4 because no single unit exhibits it.

## Why five, and why in this order

Each layer exists to catch what the previous layer can't. Intent catches "we're solving the wrong problem." Decomposition catches "the problem is too big to verify." Delegation catches "we're using AI where it doesn't belong." Verification catches "the output looks right but isn't." Synthesis catches "every piece is right but the system isn't."

Vibe coding has, at most, layer 3   and a degenerate version of it, where delegation means "everything, always, to the model." Removing layers 1, 2, 4, and 5 is exactly what makes it fast *and* what makes it fail silently. The speed and the fragility come from the same missing structure.

Next: the practical patterns for running Layers 3 and 4 at scale   [Orchestration Patterns: Directing AI Like a Systems Architect](/blog/orchestration-patterns-for-engineers).
