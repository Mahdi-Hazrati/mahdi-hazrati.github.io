---
title: "Raft Consensus: Leader Election Without the PhD"
description: "How distributed systems agree on a log when nodes fail — terms, heartbeats, and why Paxos stayed in papers while Raft got textbooks."
date: "2025-05-08"
tags: ["Distributed Systems", "Algorithms", "Backend"]
featured: false
published: true
thumbnail: "/blog/thumbnails/raft.svg"
---

Multiple servers. Network partitions. Crashes mid-write. How does anyone agree on **what happened**? Consensus algorithms answer that — and Raft made it teachable.

## The problem

Replicated state machines: every node runs the same commands in the same order. If leader says "set x=5" then "set x=7", all followers must apply both — identically.

## Raft roles

- **Leader** — accepts client writes, replicates log entries
- **Followers** — passive, respond to leader heartbeats
- **Candidate** — temporary state during elections

Only the leader handles writes. One writer eliminates conflicts.

## Leader election

Time divided into **terms** (monotonic counters):

1. Follower misses heartbeat → becomes candidate
2. Candidate votes for itself, requests votes from peers
3. Majority wins → new leader; minority revert to follower

```go
// Simplified election trigger
if time.Since(lastHeartbeat) > electionTimeout {
    becomeCandidate()
    currentTerm++
    requestVotes()
}
```

Randomized election timeouts reduce split-vote storms.

## Log replication

Client sends command to leader. Leader:

1. Appends to local log
2. Replicates to followers (parallel RPC)
3. Commits once **majority** acknowledges
4. Applies to state machine, responds to client

Followers never commit uncommitted entries — consistency over availability during partitions.

## vs Paxos

Paxos is proven minimal but notoriously opaque. Raft sacrifices some generality for **understandability** — same safety guarantees, clearer decomposition.

> [!NOTE]
> etcd, Consul, and CockroachDB all use Raft variants in production.

## Failure modes

| Event | Behavior |
| --- | --- |
| Leader crash | Election, new leader |
| Follower crash | Leader continues with remaining quorum |
| Network partition | Minority partition stops accepting writes |

## Takeaway

Raft is the algorithm you reach for when one database isn't enough. Terms, votes, and append-entries RPCs — boring on purpose, reliable by design.
