---
title: "B-Trees: Why Every Database Index Looks the Same"
description: "The data structure behind PostgreSQL, SQLite, and MySQL indexes   balanced trees, page alignment, and why O(log n) isn't enough."
date: "2025-05-16"
tags: ["Databases", "Algorithms", "Backend"]
featured: false
published: true
thumbnail: "/blog/thumbnails/b-trees.svg"
---

Hash maps give O(1) lookup   why don't databases use them for indexes? Because **disk I/O dominates**, and B-trees minimize reads by matching storage page size.

## B-tree basics

A B-tree is a self-balancing tree where:

- Every node holds many keys (not just one like BST)
- All leaves sit at the same depth
- Internal nodes route searches; leaves hold data or pointers

```
         [ 30 | 60 ]
        /    |     \
  [10|20] [40|50] [70|80|90]
```

Each node sized to fit one **disk page** (typically 4–16 KB). One read = one node = thousands of keys.

## Why not binary trees?

Binary trees are deep. A million rows → ~20 levels → ~20 random disk seeks. B-trees with 500 keys/node → ~3 levels → **3 seeks**.

| Structure | Nodes for 1M rows | Typical disk reads |
| --- | --- | --- |
| Binary tree | ~20 | ~20 |
| B-tree (500 fanout) | ~3 | ~3 |

## Clustered vs secondary indexes

- **Clustered**   leaf nodes store row data (InnoDB PK)
- **Secondary**   leaf nodes store PK pointers → extra hop

That's why `SELECT *` through a secondary index costs more than covering index queries.

## Write amplification

Inserts split nodes when full. Deletes merge or redistribute. B-trees trade write overhead for read predictability   the right bet for OLTP workloads.

## When indexes hurt

- Low-cardinality columns (boolean gender flags)
- Write-heavy tables with many indexes
- Functions on indexed columns (`WHERE YEAR(created_at)`)

> [!TIP]
> `EXPLAIN ANALYZE` before adding indexes. Measure seeks, not assumptions.

## Takeaway

B-trees aren't trendy   they're **engineered for spinning disks and SSD page reads**. Understanding fanout and page alignment explains more production query slowness than Big-O notation alone.
