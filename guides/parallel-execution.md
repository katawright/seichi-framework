# Parallel Execution Guide

## Overview

Practical guidance for running a parallel-safe batch — keeping concurrent work
attributable, isolated, integrated, and conserved, so a batch that finishes has
actually delivered every increment's work and lost none of it. Deciding _what_
may run concurrently is the [Parallel Scheduling Guide](parallel-scheduling.md);
the normative contracts behind both are in the
[Parallel-Batch Spec](../spec/parallel-batch.md).

### Why Execution Needs Its Own Controls

A sequential run gets safety for free: one actor, one workspace, one change at a
time. Concurrency removes all three guarantees at once, and that is where
parallel runs silently fail — two workers edit the same file and one overwrite
wins; a batch is declared done because every worker stopped, when a function was
dropped during the merge; a run keeps going unattended after the one capability
that made it safe disappeared. Execution is the set of run-time controls —
isolation, coordination, integration, conservation, stop enforcement — that put
those guarantees back. Parallelism does not change _what_ the process requires;
it changes _how easily independent work collides_, and these controls are what
keep it from colliding.

### Goals of This Guide

- Run a batch with **isolation and coordination** so workers cannot corrupt each
  other
- Keep concurrent work **attributable** and within scope throughout the run
- **Integrate** finished work and prove, via **work conservation**, that nothing
  valid was lost
- **Close** a batch honestly and transition to the next
- Establish when a parallel batch may run **unattended** (Lights-Out)

### Key Principle

> A batch closes only when its work is **integrated and demonstrably conserved**
> — never merely because its workers stopped.

Isolation keeps concurrent work from colliding while it runs; conservation
proves the merge that follows did not drop any of it. Together they are what a
sequential run never has to think about and a parallel run must.

### How to Use This Guide

1. Start from a **scheduled plan** — an ordered set of parallel-safe batches
   from the [Parallel Scheduling Guide](parallel-scheduling.md). Execution
   assumes the parallel-safety analysis is already done and accepted
2. Assign the [**Roles**](#execution-roles) for the batch
3. Run [**Batch Preflight**](#batch-preflight) before opening the batch
4. Open the batch and run workers under
   [**Isolation and Concurrency-Safety**](#isolation-and-concurrency-safety) and
   the [**Execution Invariants**](#concurrent-execution-invariants)
5. At close, run
   [**Integration and Work Conservation**](#integration-and-work-conservation)
   and [**Close and Transition**](#batch-close-and-transition)
6. If the run is unattended, read
   [**Parallel and Lights-Out**](#parallel-and-lights-out)

---

## The Input: A Scheduled Plan

Execution begins where scheduling ends: an **ordered list of batches**, each a
fixed, classified set of increments with no unresolved forcing dependency
between its members. A quick recap of the unit (full definition in the
[Scheduling Guide](parallel-scheduling.md#the-batch-model)):

- A **batch** is one or more increments authorized to run **concurrently**.
- Batches are **ordered** — a batch opens only after its prerequisite batches
  close.
- A **batch of one is the sequential reduction** — running it is the process you
  already run.
- Batch **membership is fixed**. A discovery mid-run that two members are
  actually coupled is a replanning event handled by escalation, not an in-flight
  edit.

Execution does **not** re-decide parallel safety; it trusts the accepted
classification and runs. (If execution surfaces a forcing dependency scheduling
missed, that routes back to scheduling — see the
[execution invariants](#concurrent-execution-invariants).)

---

## Execution Roles

Running a batch is provider-neutral but needs three responsibilities covered.
One provider may cover several; the names are roles, not required separate
actors.

| Role                              | Responsibility                                                                                                                                                             |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Orchestrator**                  | Administers the batch: runs preflight, opens the batch, launches the workers, collects their results, and runs close-out (integration, conservation, cleanup, transition). |
| **Worker**                        | Executes one increment end-to-end within its assigned scope, identity, and operating envelope; reports evidence and outcome.                                               |
| **Reviewer / assurance provider** | Evaluates work to the independence the governance profile requires.                                                                                                        |

Each worker must receive, explicitly: its **increment identity**; scope and
expected outputs; inputs and dependencies; authority and operating envelope;
acceptance and verification criteria; reporting and evidence obligations; and
stop and escalation conditions. A worker stays inside its assigned scope and
never reaches into a sibling's workspace, even to read.

> **Example.** A common shape: the project-lead session is the orchestrator, one
> worker covers each increment, and the orchestrator — not the workers — spawns
> the reviewers. Agent harnesses often forbid deep recursion, so workers cannot
> spawn their own reviewers; routing review through the orchestrator keeps the
> same separation without it.

---

## Batch Preflight

Before a batch opens, the orchestrator establishes that the batch _can_ run. On
any failure, it refuses to open the batch and surfaces the named remediation.
Preflight confirms:

- every member increment is **authorized to begin**;
- prior batches and hard dependencies are **complete**;
- the **parallel-safety classification is current and accepted** (produced by
  scheduling — preflight checks it is still valid, it does not redo it);
- required workers, tools, environments, access, and verification capabilities
  are **available**;
- workspaces are **isolated or concurrency-safe**;
- scope, acceptance criteria, and stop conditions are **explicit**;
- required integration and close-out verification **can be performed**;
- and **no unresolved prior-batch state** makes execution unsafe.

> **Example.** Make opening a batch a single **atomic, idempotent** operation
> that creates the batch and all its increments together and returns their
> identities — a retrying orchestrator that re-opens the same batch gets the
> existing identities back instead of duplicates. Pair it with a pre-flight
> check (clean working trees, no stale per-increment workspaces, no orphaned
> coordination lease) so "run batch N" is a safe single command instead of a
> roll of the dice.

---

## Isolation and Concurrency-Safety

Concurrent workers must operate in **sufficiently isolated or concurrency-safe
workspaces** so one increment's work cannot silently overwrite or invalidate
another's. The framework requires the _property_; it does not prescribe
worktrees, branches, or containers.

What isolation must guarantee:

- each worker has a workspace where its changes do not corrupt a sibling's;
- shared resources that cannot be isolated are instead **coordinated**
  (serialized access) — and a heavily contended shared resource is itself a
  forcing dependency that should have split the batch at scheduling time;
- writes to shared project state are **attributable** and **non-overwriting**.

> **Example.** Run each worker in its own isolated workspace (for instance, a
> separate working tree on a per-increment branch) for filesystem isolation by
> construction, and serialize writes to shared governance state through a
> short-lived lease — acquire, write, release per block. Workspace isolation and
> state coordination are two different mechanisms solving two halves of the same
> property; sustained lease contention is the signal the batch should have been
> split.

---

## Concurrent Execution Invariants

While a batch runs, these must hold continuously:

- every action, artifact, decision, and evidence item is **attributable** to the
  correct increment and actor;
- workers remain **within assigned scope and authority**;
- one increment **cannot silently overwrite or invalidate** another's work;
- **blocked, failed, or unresponsive** increments are explicit, not inferred
  from silence;
- **independent siblings may continue** when their validity is unaffected by a
  sibling's trouble;
- a **newly discovered forcing dependency** routes back to scheduling for
  serialization or replanning — never a quiet best-effort merge;
- and **shared-contract or shared-assumption changes** are made visible to the
  affected workers.

> **One blocked increment does not fail the batch.** A worker that escalates
> returns a structured "blocked" result; its siblings keep going and may still
> ship. The orchestrator surfaces the blocker rather than masking it.

---

## Integration and Work Conservation

As workers finish, their work is integrated — and integration is where parallel
runs silently lose work. The defining requirement of a batch close is **work
conservation**: evidence that integrating concurrent work did not drop any valid
output.

Integration must establish that:

- completed work is **integrated or explicitly excluded** (never silently
  dropped);
- conflicts and inconsistencies are **resolved**;
- required **whole-batch verification and assurance** pass on the integrated
  result, not just per-increment;
- and **work-conservation evidence** shows nothing valid was lost in the merge.

> **Example.** At close-out, a conservation check diffs the batch base against
> the integrated head and flags dropped functions, tests, or files; a clean
> result is required before cleanup is marked complete, and findings block until
> a human adjudicates whether each drop was an intentional refactor or a
> regression. The check is the machine-verifiable form of "nothing valid was
> lost."

---

## Batch Close and Transition

A batch may close only when **every member increment has an explicit terminal or
transition-eligible disposition** — not merely because every worker stopped.
Before the next batch opens:

- completed work is **integrated or explicitly excluded**;
- conflicts are **resolved**;
- required **whole-batch verification and assurance** are complete;
- **work-conservation evidence** is recorded;
- **failed, stopped, deferred, or rejected** outcomes are recorded honestly;
- **downstream dependencies are re-evaluated** against the actual outcomes (a
  deferred increment may invalidate a later batch's assumption);
- and required **cleanup and state preservation** are complete.

> **A batch is not complete because its workers stopped.** Completion is an
> explicit, evidenced disposition per increment plus a conserved, integrated,
> verified whole — the same honesty bar the framework sets for project-level
> completion, applied at the batch. Batch transition is a close-out gate, not a
> new checkpoint type.

> **Example.** A batch auto-closes when the last increment's deployment gate
> records a terminal release disposition; an explicit cleanup step (conservation
> check → mark cleanup complete) must then run before the next batch may open.
> Skipping cleanup leaves the next batch blocked — a deliberate gate, not a bug.

---

## Parallel and Lights-Out

Parallel execution and unattended (**Lights-Out**) execution are **independent
properties**:

- A **parallel batch may run attended** — humans review at each checkpoint while
  several increments progress concurrently.
- A **Lights-Out run may be sequential** — a single increment executing
  unattended.

A parallel batch is **Lights-Out only when every required function** —
orchestration, worker execution, integration, assurance, evidence capture, and
**independent stop enforcement** — has demonstrated, available automated
coverage. If any required coverage is missing or lost mid-run, the batch is not
Lights-Out for the affected scope: it pauses or escalates even where some
workers could technically continue. This is the operating model's
[capability-coverage rule](operating-model.md) applied to concurrent work —
losing coverage **narrows the envelope**, it does not fail the project.

> The framework _defines_ when a batch is Lights-Out-eligible; a tool that
> operationalizes the framework is what _detects_ a lost capability mid-batch
> and holds the affected work for a human.

---

## Worked Example

Continuing the example from the
[Scheduling Guide](parallel-scheduling.md#worked-example) — a scheduled plan of
two batches, `[{A, D}, {B, C}]`:

1. **Execute Batch 1 = {A, D}.** Preflight passes; the orchestrator opens the
   batch and launches two workers in isolated workspaces. Each drives its
   increment to a terminal disposition. The orchestrator integrates both, runs
   the work-conservation check, and closes the batch only when A and D are both
   terminal and conserved.
2. **Transition.** Downstream dependencies are re-evaluated against the actual
   outcomes; Batch 2's assumptions still hold.
3. **Execute Batch 2 = {B, C}.** B and C run concurrently against the now-stable
   foundation (A) and contract (D); integrate; conserve; close.

If a worker in Batch 1 had escalated `blocked`, its sibling would have continued
and the orchestrator would have surfaced the blocker rather than declaring the
batch done.

---

## Notes

**Last Updated:** 2026-06-20

Added to the framework in v0.49.0. Consumes the schedule produced by the
[Parallel Scheduling Guide](parallel-scheduling.md); companion to the
[Operating Model Guide](operating-model.md) for the Lights-Out coverage rule.
The normative contracts behind this guide — batch preflight/close contracts,
isolation and work-conservation requirements, and Lights-Out coverage — are in
the [Parallel-Batch Spec](../spec/parallel-batch.md).
