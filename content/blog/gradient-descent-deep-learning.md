---
title: "Gradient Descent: The Hill-Climbing Algorithm Behind Deep Learning"
description: "Loss surfaces, learning rates, momentum, and Adam — the optimization loop that makes neural networks actually learn."
date: "2025-05-04"
tags: ["ML", "Math", "Deep Learning"]
featured: true
published: true
thumbnail: "/blog/thumbnails/gradient-descent.svg"
---

Neural networks are function approximators. Gradient descent is how they **find** those functions — by rolling downhill on a loss surface in million-dimensional space.

## The loop

1. Forward pass — compute predictions
2. Loss function — measure error (`MSE`, cross-entropy)
3. Backprop — compute gradients via chain rule
4. Update — nudge weights opposite the gradient

```python
for epoch in range(epochs):
    loss = compute_loss(model, batch)
    grads = autograd(loss, model.params)
    for param, grad in zip(model.params, grads):
        param -= learning_rate * grad
```

Repeat until loss plateaus or your cloud bill explodes.

## Learning rate matters

Too high → oscillation or divergence. Too low → weeks of training.

| Strategy | Idea |
| --- | --- |
| Fixed LR | Simple, fragile |
| Step decay | Drop LR at milestones |
| Cosine annealing | Smooth decay curve |
| Warmup | Small LR early, stabilize |

## Momentum

SGD with momentum accumulates velocity — overshoots small local minima, accelerates through flat regions:

```
v = β * v + gradient
param -= lr * v
```

Think ball rolling downhill, gaining inertia.

## Adam and friends

**Adam** adapts per-parameter learning rates using running averages of gradient and squared gradient. Default optimizer for most deep learning — not always optimal, rarely catastrophic.

## Local minima myth

In high dimensions, saddle points outnumber true local minima. Modern networks are **overparameterized** — many global or near-global solutions exist. The hard part is finding them fast, not escaping traps.

## Takeaway

Every LLM, every classifier, every diffusion model — same core loop. Master gradient descent and backprop, and the rest of deep learning is architecture choices stacked on top.
