---
title: "Git Internals: Objects, Refs, and the DAG Under the Hood"
description: "Git isn't a filesystem with history — it's a content-addressed object database with labels. Once you see the DAG, everything clicks."
date: "2025-04-24"
tags: ["Git", "Tools", "DevOps"]
featured: false
published: true
thumbnail: "/blog/thumbnails/git-internals.svg"
---

`git commit` feels like saving a file. Under the hood, Git stores **snapshots as hashed objects** in `.git/objects/` — a Merkle DAG where branches are just movable pointers.

## Four object types

| Type | Contains |
| --- | --- |
| **blob** | File contents |
| **tree** | Directory listing (names → blob/tree hashes) |
| **commit** | Tree hash + parent + author + message |
| **tag** | Annotated pointer to commit |

Everything keyed by SHA-1 (or SHA-256 in newer repos):

```
blob a1b2c3... → "console.log('hi')"
tree d4e5f6... → { "README.md": blob_a1b2, "src/": tree_789 }
commit 789abc... → { tree: d4e5f6, parent: 456def, msg: "init" }
```

## Refs are labels

- `refs/heads/main` → latest commit on main
- `refs/remotes/origin/main` → last fetched remote tip
- `HEAD` → usually `ref: refs/heads/main`

Branches aren't folders. They're **40-character filenames** containing one hash.

```bash
# Peek under the hood
git cat-file -p HEAD
git ls-tree HEAD
git rev-parse main
```

## The DAG

Commits form a directed acyclic graph. Merge commits have **two parents**. Rebase rewires parent pointers — same patches, new commit hashes.

```
    A---B---C  main
         \
          D---E  feature
```

`git merge feature` creates commit F with parents C and E.

## Staging area (index)

The index is a **tree snapshot** of your next commit — between working directory and repository. `git add` updates index entries; `git commit` freezes index into a tree object.

## Why this matters

- **Reflog** — orphaned commits survive until GC
- **Cherry-pick** — applies patch, new commit hash
- **Shallow clone** — truncates history, not objects
- **Partial clone** — lazy-fetches missing blobs

> [!TIP]
> `git gc` packs loose objects. Nothing is truly deleted until unreachable and garbage-collected.

## Takeaway

Git is a **content-addressed snapshot store** with cheap branching. Files are blobs. Directories are trees. History is a DAG. Everything else — rebase, merge, stash — is pointer manipulation on that graph.
