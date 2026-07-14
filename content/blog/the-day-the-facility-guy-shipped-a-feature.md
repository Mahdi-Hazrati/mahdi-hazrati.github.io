---
title: "The Day the Facility Guy Shipped a Feature to My App"
description: "I taught our building's maintenance guy how to vibe code for fun. Twenty minutes later he'd chatted his way into a working feature inside one of my real apps. Here's what actually happened, and why it didn't disprove anything I've written in this series."
date: "2026-07-29"
tags: ["AI Engineering", "Vibe Coding", "Engineering Philosophy"]
featured: false
published: true
thumbnail: "/blog/thumbnails/facility-guy-feature.svg"
---

True story, no exaggeration for effect. I've spent this whole series arguing that vibe coding is structurally unreliable. Then a guy whose entire job is fixing elevators and AC units sat down next to me, chatted with an AI for twenty minutes, and shipped a real feature into one of my apps. I want to tell you exactly what happened, because the honest version is more interesting than either "vibe coding is magic" or "vibe coding is fake."

## The setup

He handles facility stuff around the office, elevators, AC, the badge readers, that kind of thing, and he's curious by nature. He kept seeing me typing full sentences into a chat window instead of "real code" and asked what I was actually doing. So one afternoon, half as a joke, I opened the dashboard for one of my own side projects and said: describe a feature you wish this had, in plain words, like you're explaining it to me.

He didn't know a single line of JavaScript. He'd never opened a terminal. That was the whole point of the experiment.

## What he asked for

He wanted a small checklist view, something to log which floors he'd already inspected that day, with a timestamp and a checkbox, nothing fancier than that. He typed it out like he'd type a text message: "add a page where I can see a list of floors and click one when I'm done with it and it saves the time."

The model asked him two clarifying questions. He answered both in the same casual tone. It generated a component. He pasted it in where I pointed, ran the dev server, and there it was: a checklist, floor numbers, checkboxes, timestamps on click.

He was thrilled. Genuinely, contagiously thrilled, in a way that made me remember why any of this is exciting in the first place.

## Why it actually worked

Here's the part that matters, and it's the part that would've gotten lost if I'd just posted "AI let a non-programmer ship code" and left it there.

It worked because of everything surrounding the fifteen seconds of generation, not because of the generation itself:

- **The scope was tiny and self-contained.** One component, no shared state, nothing another part of the app depended on. A bad output here couldn't cascade anywhere.
- **I picked the sandbox.** He wasn't let loose on the real codebase. He was working in a side project of mine, in a branch I could throw away without consequence.
- **I read the diff before it touched anything real.** Not him, me. I checked what the component actually rendered, whether the timestamp logic was sane, whether it touched anything outside its own file. It did not.
- **The feedback loop was immediate and visual.** He could see instantly whether the checklist looked like what he meant. A logic bug in a background job wouldn't have been catchable this way, and we both would have had no idea.

Take away any one of those four things and the story ends differently. Let him touch the production repo directly, and I'm debugging a merge conflict at 6pm. Skip my review, and a subtly wrong timestamp calculation ships silently, because he has no way to know what "wrong" would even look like. Give him a task with cross-file consequences, and there's no amount of enthusiasm that fixes it.

## The uncomfortable, useful realization

What actually happened that afternoon wasn't "vibe coding works now." It was AI-Orchestrated Engineering with the orchestrator role played by me, invisibly, while he got to experience the fun part. He supplied intent. The model supplied a first draft. I supplied the two things vibe coding always skips: scope containment and verification.

He'll tell people the AI wrote his feature, and in the sense that matters to him, that's true and it should feel like magic. But if you ask what made it *safe* to ship, the answer isn't the model. It's that someone who could tell good code from bad was standing right there, deciding what was allowed to matter.

That's the whole argument of this series in miniature: the AI doing the typing was never the risky part. The risky part is always whoever, or whatever, decides what happens to the output next. That afternoon, it happened to be me, and I didn't even think of it as "orchestration" until I sat down to write this post. Which is probably the most honest thing I can tell you about how naturally this discipline shows up once you're actually paying attention.

He's since asked me to teach him another feature. I'm saying yes, same sandbox, same review, same rules. Vibe coding got him in the door. Something else entirely is what let the feature stay.
