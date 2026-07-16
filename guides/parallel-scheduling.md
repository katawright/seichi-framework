# Parallel Scheduling Guide

> **New here?** See [Framework Overview](OVERVIEW.md#parallel-scheduling-guide)
> for what this guide is, why it exists, and how to use it. This file is the
> operational reference.

## Key Principle

> Parallelism is a scheduling decision constrained by **forcing dependencies**.
> Two increments may share a batch only when no forcing dependency binds them.

The bias is deliberately conservative. A false split (sequencing work that was
actually independent) costs one batch boundary. A false merge (parallelizing
work that was actually coupled) costs a merge conflict or, worse, a silent
semantic break that ships. The cost asymmetry sets the default: **when parallel
safety cannot be established with confidence, sequence.**

---

## How This Relates to Planning and Execution

Three activities, three questions. Scheduling sits in the middle:

| Activity                               | Question it answers                                    | When / who                                          |
| -------------------------------------- | ------------------------------------------------------ | --------------------------------------------------- |
| **Increment planning**                 | What are the units of work, and what depends on what?  | System Design, by the planner                       |
| **Parallel scheduling** _(this guide)_ | Which units may run at the same time, in what batches? | System Design, by the planner                       |
| **Parallel execution**                 | How do those batches run safely to a conserved result? | Implementation / delegated run, by the orchestrator |

Scheduling **consumes** the dependency-aware increment plan — it does not create
it. The base plan (increments + their dependencies) is a System Design output
and is unchanged in v0.49. What scheduling adds is the parallel-safety layer on
top: the forcing-dependency analysis that decides which of those increments may
share a batch. The **batch** is the unit scheduling produces and the
[execution guide](parallel-execution.md) consumes.

> **If you used the v0.48 framework:** increment planning is unchanged.
> Scheduling is purely additive — it extends the existing dependency sequence
> into batches. Projects that never parallelize keep planning exactly as before,
> because a sequential plan is just a plan of one-increment batches.

---

## The Batch Model

A **batch** is an identifiable set of one or more increments authorized to
execute concurrently.

- Increments within a batch have **no unresolved forcing dependency** between
  them.
- Batches are **ordered** by their dependencies and transition conditions.
- A **batch of one is the sequential reduction** — the same plan you run today.
- Batch **membership is fixed when the batch is scheduled**. Discovering later
  that two batched increments are actually coupled is a **replanning** event,
  not an in-flight edit. Fixed membership is what lets you classify a _fixed_
  composition once and trust it for the run.

> **Example.** Identify each batch and increment by a stable name drawn from the
> plan rather than a positional index, so identity survives plan revisions — if
> a later constraint reorders the batches, the names stay put.

---

## Forcing Dependencies

A **forcing dependency** is any relationship that prevents two increments from
executing safely and independently in the same batch. The taxonomy is normative
(PB-001 in the
[Parallel-Batch Spec](../spec/parallel-batch.md#forcing-dependency-taxonomy));
walk it pair-wise over the candidate increments:

| Forcing dependency                     | Fires when                                                                                                                                            | Resolution                                                                                                                                                    |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Foundation dependency**              | One increment needs infrastructure, code, schema, a contract, or any output another increment introduces.                                             | Sequence the foundation first, in an earlier batch.                                                                                                           |
| **Shared mutable boundary**            | Two increments may write the same **design-defined boundary** — a component, module, schema object, shared resource, configuration, or state element. | Sequence, unless ownership of that boundary is provably disjoint. _File-level_ disjointness is a finer-grained exception available only once files are known. |
| **Shared contract change**             | Increments change the same public interface, or make mutually dependent producer/consumer changes.                                                    | Ship the contract owner first; the consumer follows in a later batch.                                                                                         |
| **Non-isolated verification**          | Tests or verification share mutable state that cannot run concurrently.                                                                               | Sequence, unless each test provisions its own isolated fixtures.                                                                                              |
| **Integration-order dependency**       | One increment must integrate or deploy before another.                                                                                                | Order the batches to match the required integration sequence.                                                                                                 |
| **Authority or capability dependency** | One increment depends on authority, access, or capability coverage that another establishes.                                                          | Sequence the establishing increment first.                                                                                                                    |

A project or tool may **extend** the taxonomy with domain-specific conditions.
The taxonomy is meant to grow by absorbing real incidents: when a parallel run
surfaces a collision the list did not predict, add the new category with the
incident as its worked example.

> **Example — extending the taxonomy.** An adopter's concrete rubric typically
> expands these generic categories into pair-wise entries with worked examples —
> for instance, splitting **shared mutable boundary** into specific entries for
> shared-schema migrations, overlapping file edits, and contention on a shared
> coordination resource. The generic categories above are the core;
> tool-specific entries (e.g. a coordination-lease or a tool-surface conflict)
> are how an adopter extends it.

### Granularity and Timing

**Classify at the coarsest boundary the design already defines.** The analysis
runs over design artifacts — components, schemas, contracts, integration order,
capabilities — not file paths, so it works before any code exists. For
greenfield or large-scope plans, the design's own component decomposition _is_
the boundary you classify against; file-level disjointness is a refinement
applied once files are known, never a prerequisite. Greenfield is in fact the
favorable case: a clean decomposition lets the design assign each increment a
disjoint ownership boundary, designing collisions out rather than predicting
them.

**Fix membership only as firmly as the design is certain.** Where boundaries are
pinned confidently, classify and fix batch membership now. Where they cannot be
— deep greenfield, or scope where downstream increments aren't yet concrete —
classify provisionally at the component level and refine each batch as its
increments sharpen. The conservative default keeps both modes safe:
unestablished disjointness is **unsafe**, so uncertainty costs a sequential
batch, never a silent collision. A forcing dependency discovered mid-run routes
back to scheduling for serialization or replanning, and unaffected siblings may
continue (see
[Parallel Execution: Execution Invariants](parallel-execution.md#concurrent-execution-invariants)).

---

## Parallel-Safety Classification

When a plan proposes running increments concurrently, evaluate **every
intra-batch pair** for forcing dependencies and record the result. The
classification is a System Design planning record — not an architecture decision
record. The binding contracts are PB-004 (the per-pair record) and PB-005 (the
insufficient-confidence rule) in the
[Parallel-Batch Spec](../spec/parallel-batch.md#parallel-safety-classification).

For each unordered pair, record:

- the increments evaluated;
- the shared boundaries and dependencies considered;
- the **safe / unsafe** conclusion;
- assumptions and required conditions;
- and, when unsafe, the **forcing dependency that fired** and the required
  order.

Two rules govern the verdict:

- **Conservative default.** If a pair's parallel safety cannot be established
  with sufficient confidence, classify it **unsafe** and sequence it. Confidence
  comes from actually reading both sides (both migrations, both diffs, both
  fixtures) — not from their descriptions.
- **Document the firing entry.** When a pair is split, name the forcing
  dependency in the increment plan's rationale (e.g., "shared contract change —
  both touch the same public interface"), so a reviewer can audit the call.

> **Audit pattern.** A reviewer verifies the classification two ways: for every
> **cross-batch** placement, confirm a forcing dependency really applies (no
> over-splitting); for every **intra-batch** placement, walk the taxonomy
> pair-wise to confirm none fires (no missed coupling). Findings go back to the
> planner, who revises the plan or extends the taxonomy.

---

## Composing and Sequencing Batches

From a classified plan, compose the schedule:

1. **Group** increments with no forcing dependency between any pair into the
   same batch.
2. **Order** batches so every batch's prerequisites — foundations, contracts,
   integration order, established authority/capability — are satisfied by an
   earlier batch.
3. **Default to sequential.** Any increment whose safety is uncertain becomes
   its own batch. A fully sequential plan is the valid limiting case: every
   batch has size one.
4. **Fix membership** before handing off to execution. Membership changes after
   this point are replanning, not edits.

The output is an ordered list of batches, each with a fixed, classified
membership — the executable schedule the
[execution guide](parallel-execution.md) runs.

---

## Worked Example

A four-increment plan: **A** introduces a new table and repository; **B** and
**C** each add an independent feature reading existing tables; **D** changes a
public API that both B and C consume.

1. **Classify pair-wise.**
   - A↔B, A↔C, A↔D: foundation dependency (all need A's table/repo) → A
     sequences first.
   - B↔C: disjoint components, isolated fixtures → **safe**.
   - D↔B, D↔C: shared contract change (D owns the interface B and C call) → D
     before its consumers.
   - D↔A: independent of the table → no forcing dependency → **safe** together.
2. **Compose and order.**
   - Batch 1 = {A, D} — independent of each other, both foundational.
   - Batch 2 = {B, C} — parallel-safe with each other, both depend on Batch 1.

The sequential reduction of the same plan — Batch 1 {A}, Batch 2 {D}, Batch 3
{B}, Batch 4 {C} — is valid and slower; the scheduling work is what safely
collapses four batches into two. The ordered schedule `[{A, D}, {B, C}]` is what
you hand to the [execution guide](parallel-execution.md).

---

## Notes

**Last Updated:** 2026-07-16

Added to framework in v0.49.0.
