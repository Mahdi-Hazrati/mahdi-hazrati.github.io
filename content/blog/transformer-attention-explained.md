---
title: "Transformers Explained: Attention, QKV, and Why LLMs Work"
description: "A frontend engineer's guide to the architecture behind GPT — self-attention, positional encoding, and the encoder-decoder split."
date: "2025-05-28"
tags: ["ML", "Transformers", "Deep Learning"]
featured: true
published: true
thumbnail: "/blog/thumbnails/transformers.svg"
---

The 2017 paper [*Attention Is All You Need*](https://arxiv.org/abs/1706.03762) replaced recurrence with **self-attention** — and modern AI was born. No RNN loops. No convolutions over sequences. Just matrices.

## Self-attention in one paragraph

Each token asks every other token: *"How relevant are you to me?"* That relevance is a learned **attention score**, computed from three projections:

- **Query (Q)** — what am I looking for?
- **Key (K)** — what do I contain?
- **Value (V)** — what information do I pass if selected?

```python
# Scaled dot-product attention
scores = (Q @ K.T) / sqrt(d_k)
weights = softmax(scores)
output = weights @ V
```

The `sqrt(d_k)` scaling prevents softmax from saturating when dimensions grow large.

## Multi-head attention

One attention pattern isn't enough. **Multi-head attention** runs parallel attention "heads" — each learning different relationships (syntax, coreference, long-range deps):

```python
MultiHead(Q, K, V) = Concat(head_1, ..., head_h) @ W_O
where head_i = Attention(Q @ W_Qi, K @ W_Ki, V @ W_Vi)
```

## Positional encoding

Attention is permutation-invariant — it doesn't know word order. Transformers inject **positional encodings** (sinusoidal or learned) so "dog bites man" ≠ "man bites dog".

## Encoder vs decoder

| Component | Used in | Masking |
| --- | --- | --- |
| Encoder | BERT, embeddings | Bidirectional |
| Decoder | GPT, generation | Causal (left-to-right) |
| Encoder-decoder | TTS, translation | Cross-attention |

GPT is a **decoder-only** stack: causal masking ensures token `i` never peeks at token `i+1`.

## Why it scales

Attention is `O(n²)` in sequence length — expensive, but **embarrassingly parallel** on GPUs. That parallelism, plus scaling data and parameters, is why trillion-parameter models became feasible.

## Practical intuition

Think of attention as a **dynamic routing table**. Each token broadcasts a query; others respond with keys; values flow proportional to match strength. No explicit graph — the network learns the wiring.

That's the entire revolution in one mechanism.
