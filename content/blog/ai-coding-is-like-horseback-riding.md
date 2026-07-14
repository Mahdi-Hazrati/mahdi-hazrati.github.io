---
title: "AI Coding Is Like Horseback Riding: the Horse Runs, You Still Get Tired"
description: "The horse is doing the running. You're still the one who has to stay balanced, read the terrain, and not fall off. That's the whole difference between vibe coding and actually directing the thing."
date: "2026-08-02"
tags: ["AI Engineering", "Vibe Coding", "Engineering Philosophy"]
featured: false
published: true
thumbnail: "/blog/thumbnails/horseback-riding-ai.svg"
---

Someone said this to me half as a joke, and I haven't stopped thinking about it since: using AI for coding is like horseback riding. Sure, the horse is doing the running. You still get tired.

It's a better model of what this work actually feels like than almost anything else I've read, including things I've written myself.

## Where the fatigue actually comes from

Nobody who's ridden a horse for an afternoon describes it as "I sat there while the horse did the work." Your legs are gripping. Your core is bracing for the next stride. You're reading the ground two seconds ahead so you're not surprised by a hole or a low branch. You're constantly making tiny corrections the horse can't make for itself, because the horse doesn't know where you're trying to go or what's about to go wrong.

Directing an AI through a real coding task has the same shape. The model generates the tokens, the equivalent of the horse's legs doing the running. But you're still the one holding:

- **Direction.** The horse can run beautifully in entirely the wrong direction. So can a model. Neither one course-corrects on its own.
- **Terrain-reading.** You're the one who notices the edge case coming up, the auth check that's about to get skipped, the abstraction that's about to fight the rest of the codebase. The model doesn't see two strides ahead. It sees the current prompt.
- **Balance.** Too passive and you get thrown, code ships that nobody actually understood before it merged. Too tense, second-guessing every token, and you've just made typing slower without adding any judgment. The skill is calibrating how much weight to put in the stirrups, not zero, not all of it.

That's real work. It's just a different kind of tired than typing every character yourself. Vibe coding is the story where you tell people the horse did the whole ride. Anyone who's actually held the reins for a full day knows better.

## The tell that separates the two

Here's a way to check which one you're actually doing, cheaper than any framework I've written in this series: at the end of the session, are your legs sore?

If you spent the whole time glancing at outputs and accepting them, you weren't riding, you were watching a horse run around a paddock without you on it. That's fine as a spectacle. It is not the same activity, and it does not get you anywhere you chose to go.

If you finished the session and you're tired in the specific way that comes from constant small corrections, re-reading a diff for the third time because something about it nagged at you, redirecting the model after the second wrong turn, holding the actual destination in your head the whole time, that's the ride. That's the version where the horse's speed becomes your speed, instead of the horse's randomness becoming your risk.

## Why the metaphor holds up better than "co-pilot"

"Co-pilot" implies two people with equal judgment splitting the controls. That's not what this is, and pretending otherwise is exactly how you end up vibe coding by accident. A horse has no opinion about where you're going. It has enormous capability and zero destination of its own. That's a much more honest description of what a model brings to a coding session: raw capacity, aimed entirely by whoever's holding the reins.

Which means the fatigue isn't a bug in the workflow. It's the actual work. The moment riding stops being tiring is the moment you've stopped steering, and a horse without a rider making decisions is just running. Sometimes toward something good. Increasingly often, in my experience, not.

You don't get to skip being tired. You only get to choose whether you're tired from doing the job, or tired from cleaning up after the horse ran off without you.
