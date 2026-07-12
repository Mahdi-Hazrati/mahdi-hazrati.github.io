---
title: "Concurrent React: Suspense, Transitions, and Time Slicing"
description: "How React 18 schedules updates, keeps the UI responsive during heavy renders, and what useTransition actually buys you."
date: "2025-05-20"
tags: ["React", "Performance", "Frontend"]
featured: false
published: true
thumbnail: "/blog/thumbnails/concurrent-react.svg"
---

React 18 didn't add features   it added **scheduling**. The same components, but the renderer can pause, resume, and prioritize work. That's concurrent React.

## The problem it solves

A large list re-render blocks the main thread. Input feels laggy. Animations stutter. Classic React was synchronous   one update finished before the next started.

Concurrent mode lets React **interrupt** low-priority renders when something urgent arrives (a keystroke, a click).

## Transitions

Mark updates as non-urgent:

```tsx
const [isPending, startTransition] = useTransition();
const [filter, setFilter] = useState("");

function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  setFilter(e.target.value); // urgent   input stays snappy
  startTransition(() => {
    setResults(search(e.target.value)); // non-urgent   can be interrupted
  });
}
```

`isPending` drives loading states without blocking typing.

## Suspense for data

Suspense boundaries declare *"show fallback until ready"*:

```tsx
<Suspense fallback={<Skeleton />}>
  <BlogPost slug={slug} />
</Suspense>
```

With RSC and streaming, HTML arrives incrementally   shell first, content when resolved.

## Automatic batching

React 18 batches all state updates   timeouts, promises, native events   into one render. Fewer layout thrashes, fewer paint cycles.

## Mental model

| API | Priority | Use when |
| --- | --- | --- |
| `setState` | Urgent | Input, clicks |
| `startTransition` | Transition | Filtering, tab switches |
| `useDeferredValue` | Transition | Defer expensive derived data |
| `Suspense` |   | Async component trees |

## Takeaway

Concurrent React isn't about parallelism   it's about **interruption and prioritization**. Your job: tell React what's urgent. React's job: keep the UI responsive while heavy work catches up.
