# Parallel-Batch Spec

## Overview

Normative contracts for parallel-increment execution — how a dependency-aware
increment plan is classified into parallel-safe **batches**, and how those
batches run concurrently to an integrated, conserved result without one
increment silently invalidating another.

### Why These Contracts

The [Parallel Scheduling Guide](../guides/parallel-scheduling.md) and
[Parallel Execution Guide](../guides/parallel-execution.md) explain _why_ and
_how_ for a human planner and orchestrator. An agent that composes batches at
planning time, or runs them unattended, needs the same model as rules: when
classification is required, what makes a batch safe to open, what must hold
while it runs, and when it may close. These contracts are that form. The
[Operating Model Spec](operating-model.md) names **batch orchestration and
integration** as a standing operating function; this spec fixes what that
function must do.

### Goals of This Spec

- Fix the **forcing-dependency taxonomy** and the parallel-safety classification
  a plan MUST satisfy before increments share a batch
- Define the **batch** as the fixed, ordered unit the scheduling layer produces
  and the execution layer consumes
- Give the batch a normative **lifecycle** — states, reasons, absorbing
  terminals — so abnormal endings are honest, not stranded
- State the **preflight, execution-invariant, and close/transition** contracts a
  conforming orchestrator MUST honor
- Define **work conservation** — the evidence that integrating concurrent work
  dropped nothing valid — as the bar for batch close
- Apply the operating model's **capability-coverage** rule to concurrent work so
  a parallel run is Lights-Out only where every required function is covered

### Key Principle

A batch closes only when its work is **integrated and demonstrably conserved**,
never merely because its workers stopped. Parallelism is a scheduling decision
constrained by forcing dependencies; when parallel safety cannot be established
with confidence, the framework **sequences**.

### How to Use This Spec

1. Read the [**Forcing-Dependency Taxonomy**](#forcing-dependency-taxonomy) —
   the shared vocabulary the contracts reference
2. At planning time, apply
   [**Parallel-Safety Classification**](#parallel-safety-classification) and
   [**Batch Composition and Ordering**](#batch-composition-and-ordering)
3. Read the [**Batch Lifecycle**](#batch-lifecycle) for the states a batch moves
   through from composition to a terminal
4. At run time, apply [**Batch Preflight**](#batch-preflight), the
   [**Concurrent Execution Invariants**](#concurrent-execution-invariants), and
   [**Batch Close and Transition**](#batch-close-and-transition)
5. For unattended runs, apply
   [**Parallel Lights-Out Eligibility**](#parallel-lights-out-eligibility)
6. For the human-facing rationale behind any contract, follow its link back to
   the scheduling and execution guides

The six contract fields (Applicability, Inputs, Procedure, Outputs, Evidence,
Failure behavior) follow the [Contract Form](README.md#contract-form).

---

## Forcing-Dependency Taxonomy

A **forcing dependency** is any relationship that prevents two increments from
executing safely and independently in the same batch.

<!-- rule: PB-001 -->

### PB-001 — Six-category forcing-dependency taxonomy

- **Applicability.** Every parallel-safety evaluation
  ([PB-004](#parallel-safety-classification)) and every scheduling contract that
  references the taxonomy.
- **Inputs.** The closed category identifier set `forcing_dependency` in
  [`vocabulary/concurrency.yaml`](vocabulary/concurrency.yaml) binds as data
  (generated view: [reference.md](generated/reference.md)).
- **Procedure.** The normative category semantics — each identifier fires when:

  | Category (identifier)                                           | Fires when                                                                                                       |
  | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
  | **Foundation dependency** (`foundation`)                        | One increment needs infrastructure, code, schema, a contract, or another output another increment introduces     |
  | **Shared mutable boundary** (`shared-mutable-boundary`)         | Increments may write the same design-defined component, module, schema object, resource, configuration, or state |
  | **Shared contract change** (`shared-contract`)                  | Increments change the same public interface, or make mutually dependent producer/consumer changes                |
  | **Non-isolated verification** (`non-isolated-verification`)     | Tests or verification share mutable state that cannot run concurrently                                           |
  | **Integration-order dependency** (`integration-order`)          | One increment MUST integrate or deploy before another                                                            |
  | **Authority or capability dependency** (`authority-capability`) | One increment depends on authority, access, or capability coverage another establishes                           |

  A project or tool MAY extend the taxonomy with domain-specific categories; it
  MUST NOT narrow it. Classification runs at the coarsest boundary the design
  already defines (components, schemas, contracts), so it applies before any
  code exists; file-level disjointness is a refinement applied once files are
  known, never a prerequisite.

- **Outputs.** N/A — the taxonomy is a vocabulary; determinations are produced
  by the classification that consumes it
  ([PB-004](#parallel-safety-classification)).
- **Evidence.** N/A — evidence attaches to the classification record
  ([PB-004](#parallel-safety-classification)).
- **Failure behavior.** A classification evaluated against a narrowed taxonomy
  is not a valid classification; domain-specific extensions ride alongside the
  closed set, never in place of it.

<!-- /rule: PB-001 -->

---

## Parallel-Safety Classification

Rationale:
[Parallel Scheduling Guide § Parallel-Safety Classification](../guides/parallel-scheduling.md#parallel-safety-classification).

<!-- rule: PB-004 -->

### PB-004 — Per-pair parallel-safety classification record

- **Applicability.** Any increment plan that proposes running two or more
  increments concurrently (a batch of size greater than one). A fully sequential
  plan — every batch of size one — is the reduction and requires no
  classification.
- **Inputs.** The dependency-aware increment plan (a System Design output); the
  forcing-dependency taxonomy ([PB-001](#forcing-dependency-taxonomy)); the
  design artifacts that define increment boundaries. The closed conclusion set
  `safety_conclusion` (`safe` / `unsafe`) in
  [`vocabulary/concurrency.yaml`](vocabulary/concurrency.yaml) binds as data.
- **Procedure.**
  - For every intra-batch pair of increments, the planner MUST evaluate the pair
    against the forcing-dependency taxonomy and record: the increments
    evaluated; the shared boundaries and dependencies considered; a **safe /
    unsafe** conclusion; assumptions and required conditions; and, when unsafe,
    the forcing dependency that fired and the required order.
  - The classification is an execution-planning record. It MUST NOT be treated
    as an architecture decision record and MUST NOT gate on one.
- **Outputs.** A parallel-safety determination per evaluated pair, with the
  firing forcing dependency named for every unsafe pair.
- **Evidence.** The classification record is preserved as part of the increment
  plan in [canonical state](canonical-state.md); every cross-batch placement is
  traceable to a named forcing dependency.
- **Failure behavior.** N/A — the failure path of an evaluation that cannot
  reach a confident conclusion is
  [PB-005](#pb-005--insufficient-confidence-classifies-unsafe-and-sequences)'s
  rule.

<!-- /rule: PB-004 -->

<!-- rule: PB-005 -->

### PB-005 — Insufficient confidence classifies unsafe and sequences

- **Applicability.** Every pair evaluation under
  [PB-004](#pb-004--per-pair-parallel-safety-classification-record).
- **Inputs.** The pair's boundary evidence — both sides of the boundary, read.
- **Procedure.** When a pair's parallel safety cannot be established with
  sufficient confidence, the planner MUST classify it **unsafe** and sequence
  it. Confidence MUST derive from reading both sides of the boundary, not from
  increment descriptions.
- **Outputs.** The pair's `unsafe` conclusion and its sequencing.
- **Evidence.** N/A — recorded on the
  [PB-004](#pb-004--per-pair-parallel-safety-classification-record)
  classification record.
- **Failure behavior.** Unestablished disjointness is **unsafe**: a pair that
  cannot be confidently classified is sequenced, never parallelized by default.

<!-- /rule: PB-005 -->

---

## Batch Composition and Ordering

Rationale:
[Parallel Scheduling Guide § Composing and Sequencing Batches](../guides/parallel-scheduling.md#composing-and-sequencing-batches).

**Applicability.** Planning time, after classification, for any plan that
composes more than one increment into a batch.

**Inputs.** The parallel-safety classification; the dependency-aware increment
plan and its transition conditions.

**Procedure.**

- Increments grouped into one batch MUST have **no unresolved forcing
  dependency** between any pair.
- Batches MUST be **ordered** so each batch's prerequisites — foundations,
  contracts, integration order, established authority or capability — are
  satisfied by an earlier batch.
- Any increment whose safety is uncertain MUST be placed in its own batch.
- Batch **membership MUST be fixed before execution begins.** Changing
  membership after a batch opens is a replanning event that MUST re-evaluate
  parallel safety, not an in-flight edit.

**Outputs.** An ordered list of fixed, classified batches — the schedule the
execution layer consumes. A batch of one is the valid limiting case.

**Evidence.** The ordered batch list, with membership and ordering rationale, is
recorded in the increment plan in [canonical state](canonical-state.md).

**Failure behavior.** If prerequisites cannot be ordered into a valid sequence,
the plan is not schedulable as composed and MUST return to increment planning.

---

## Batch Lifecycle

Rationale: the project and run lifecycles fix the same discipline
([Canonical-State Spec § Project Lifecycle](canonical-state.md#project-lifecycle),
[Delegated-Run Spec § Run Lifecycle](delegated-run.md#run-lifecycle)) — a small
closed state set, reason codes over states, absorbing terminals, honest abnormal
endings. The batch is the remaining stateful execution unit; without an abnormal
terminal, a batch that will never close has nowhere legal to go: its own close
contract strands it at adjudication, and a canceled project's open batches would
stay open forever.

<!-- rule: PB-013 -->

### PB-013 — Batch lifecycle machine

- **Applicability.** Every batch, from composition to a terminal.
- **Inputs.** The `batch_lifecycle` machine in
  [`vocabulary/statuses.yaml`](vocabulary/statuses.yaml) — the closed state set,
  edges, and absorbing terminals bind as data (generated view:
  [reference.md](generated/reference.md)). Recorded batch transitions; the
  preflight determination; the close record; the project's lifecycle state (a
  cascade input, per
  [Canonical-State Spec § Terminal Integrity](canonical-state.md#terminal-integrity)).
- **Procedure.**
  - `planned` is the composed batch
    ([Batch Composition and Ordering](#batch-composition-and-ordering)):
    membership fixed, not yet opened. [Batch Preflight](#batch-preflight) admits
    `planned → open`; the [close contract](#batch-close-and-transition) admits
    `open → closed`.
  - **Terminals are absorbing.** `closed`, `canceled`, and `abandoned` are
    terminal; no transition leaves any of them.
  - **Two abnormal terminals, split on whether work may exist.** `canceled` ends
    a batch that never opened — no work was authorized under it, so there is
    nothing to conserve. `abandoned` ends an opened batch that will not close —
    work may exist, and the **realized extent** is recorded (the run model's
    device,
    [Honest Incomplete Outcomes](delegated-run.md#honest-incomplete-outcomes)):
    each member increment's disposition as it stood, and the
    integrated-or-excluded determination as far as it was established.
    Abandonment never erases or inflates what happened.
  - **A blocked member increment does not move the batch.** The batch stays
    `open` with the increment's disposition explicit
    ([Concurrent Execution Invariants](#concurrent-execution-invariants)); "the
    workers stopped" is never a batch state.
- **Outputs.** The batch's current lifecycle state.
- **Evidence.** A durable, attributed record per transition (per
  [Canonical-State Spec § Record Requirements](canonical-state.md#record-requirements));
  an `abandoned` record preserves the realized extent.
- **Failure behavior.** A transition outside the defined set — including any
  exit from a terminal — MUST be rejected.

<!-- /rule: PB-013 -->

<!-- rule: PB-016 -->

### PB-016 — Batch closed reason codes (per-state)

- **Applicability.** Every batch transition into `canceled` or `abandoned`.
- **Inputs.** The `batch_lifecycle` reason sets in
  [`vocabulary/reasons.yaml`](vocabulary/reasons.yaml) — the closed per-state
  code sets and the reason-required states bind as data (generated view:
  [reference.md](generated/reference.md)).
- **Procedure.**
  - **Reason codes are normative** — fixed, closed sets per state — and a reason
    is present **iff** the state requires one. `planned`, `open`, and `closed`
    carry no reason — the close record already carries the conservation
    determination. Free prose belongs in a separate detail field, never in the
    reason. A situation no code fits is a **missing code** — a framework change,
    not a free-text escape hatch.
  - `conservation-unresolved` is the resting state for the close contract's
    failure path: adjudication determined that work conservation cannot be
    established and will not be (see
    [Batch Close and Transition](#batch-close-and-transition)).
  - `superseded-by-replanning` records a batch replanned away. Membership is
    fixed, so a replanning event that dissolves or recomposes a batch ends the
    old batch and schedules successors; successor batches chain provenance to
    the replanning event.
  - `project-canceled` is the parent-caused disposition
    ([Canonical-State Spec § Terminal Integrity](canonical-state.md#terminal-integrity)):
    the project's cancellation cascades to `planned` batches as `canceled` and
    to `open` batches as `abandoned`, chained to the cancellation's attribution.
    At project `closed`, the quiescence precondition requires every batch at a
    terminal.
- **Outputs.** On `canceled` or `abandoned`, the batch's reason.
- **Evidence.** The reason rides the transition record
  ([PB-013](#pb-013--batch-lifecycle-machine)).
- **Failure behavior.** A required-reason terminal recorded without a reason, or
  with a code not defined for that state, is not a satisfied record.

<!-- /rule: PB-016 -->

---

## Batch Preflight

Rationale:
[Parallel Execution Guide § Batch Preflight](../guides/parallel-execution.md#batch-preflight).

<!-- rule: PB-022 -->

### PB-022 — Batch preflight conditions

- **Applicability.** Before any batch opens for execution.
- **Inputs.** The scheduled batch; prior-batch outcomes; available workers,
  tools, environments, access, and verification capabilities; workspace
  isolation guarantees.
- **Procedure.** Before opening a batch, the orchestrator MUST establish that:
  - every member increment is **authorized to begin**;
  - prior batches and hard dependencies are **complete**;
  - the **parallel-safety classification is current and accepted** (preflight
    validates it; it MUST NOT re-decide it);
  - required workers, tools, environments, access, and verification capabilities
    are **available**;
  - workspaces are **isolated or concurrency-safe**;
  - scope, acceptance criteria, and stop conditions are **explicit** per
    increment;
  - required integration and close-out verification **can be performed**; and
  - **no unresolved prior-batch state** makes execution unsafe.
- **Outputs.** A determination to open the batch, or a refusal naming the
  unsatisfied condition.
- **Evidence.** The preflight result and the conditions checked are recorded for
  the batch.
- **Failure behavior.** On any unsatisfied condition the orchestrator MUST NOT
  open the batch; it surfaces the named remediation. Missing required coverage
  narrows the envelope per
  [Parallel Lights-Out Eligibility](#parallel-lights-out-eligibility).

<!-- /rule: PB-022 -->

---

## Concurrent Execution Invariants

Rationale:
[Parallel Execution Guide § Concurrent Execution Invariants](../guides/parallel-execution.md#concurrent-execution-invariants).

**Applicability.** Continuously, while a batch is open.

**Inputs.** The open batch; worker assignments (identity, scope, authority,
acceptance criteria, stop conditions); shared project state.

**Procedure.** While a batch runs, the following MUST hold continuously:

- every action, artifact, decision, and evidence item is **attributable** to the
  correct increment and actor;
- workers remain **within assigned scope and authority**;
- one increment **cannot silently overwrite or invalidate** another's work;
  shared resources that cannot be isolated MUST be coordinated — concurrent
  writes to canonical project state go through the version-conditional
  [write-admission model](delegated-run.md#idempotency-substrate)
  (project-scoped single-writer, ordered by the project state version), never an
  ad-hoc merge;
- **blocked, failed, or unresponsive** increments are explicit, not inferred
  from silence; an independent sibling MAY continue when its validity is
  unaffected;
- a **newly discovered forcing dependency** MUST route back to the scheduling
  layer for serialization or replanning — never a quiet best-effort merge; and
- **shared-contract or shared-assumption changes** are made visible to the
  affected workers.

**Outputs.** A per-increment running disposition (active, blocked, failed,
complete) maintained throughout the batch.

**Evidence.** Attributable per-increment action and evidence trails; recorded
escalations for any newly discovered forcing dependency.

**Failure behavior.** A violated invariant pauses or escalates the affected
work; a blocked increment does not fail the batch, but it MUST NOT be masked as
complete.

---

## Batch Close and Transition

Rationale:
[Parallel Execution Guide § Batch Close and Transition](../guides/parallel-execution.md#batch-close-and-transition).

<!-- rule: PB-028 -->

### PB-028 — Batch close and next-batch-open conditions

- **Applicability.** When a batch is proposed for close, before the next batch
  opens.
- **Inputs.** Per-increment outcomes; the integrated result; whole-batch
  verification and assurance results.
- **Procedure.** A batch MAY close only when **every member increment has an
  explicit terminal or transition-eligible disposition** — one of the
  [delegated-run terminal states](delegated-run.md) with its reason code, not
  the mere fact that every worker stopped. Before the next batch opens:
  - completed work is **integrated or explicitly excluded**, never silently
    dropped;
  - conflicts and inconsistencies are **resolved**;
  - required **whole-batch verification and assurance** pass on the integrated
    result, not only per increment;
  - **work-conservation evidence** establishes that integration did not silently
    lose valid work;
  - failed, stopped, deferred, or rejected outcomes are **recorded honestly**;
  - **downstream dependencies are re-evaluated** against the actual outcomes;
    and
  - required **cleanup and state preservation** are complete.
- **Outputs.** A batch close record: each increment's disposition and
  integration outcome, the whole-batch verification result, and the
  work-conservation determination.
- **Evidence.** The **minimum work-conservation evidence** is a determination —
  attributable and reproducible — that every member increment's valid output is
  either integrated or explicitly excluded with a recorded reason, and that
  integration dropped no function, test, or file that any increment delivered.
- **Failure behavior.** If work conservation cannot be established, the batch
  MUST NOT close; the discrepancy is surfaced for adjudication. Adjudication has
  two honest outcomes: the discrepancy is resolved — the missing work recovered
  or explicitly excluded with a recorded reason — and the batch closes, or
  conservation is determined unestablishable and the batch is **`abandoned`**
  with reason `conservation-unresolved` ([Batch Lifecycle](#batch-lifecycle));
  an open batch is never adjudication's resting state. Batch transition is a
  close-out gate, **not** a new checkpoint type — it introduces no checkpoint
  beyond those in [the checkpoint taxonomy](../guides/checkpoints.md).

<!-- /rule: PB-028 -->

---

## Parallel Lights-Out Eligibility

Rationale:
[Parallel Execution Guide § Parallel and Lights-Out](../guides/parallel-execution.md#parallel-and-lights-out).

**Applicability.** Any batch proposed to run unattended.

**Inputs.** The required-function set for the batch (orchestration, worker
execution, integration, assurance, evidence capture, independent stop
enforcement); available provider coverage.

**Procedure.**

- Parallel execution and Lights-Out are **independent properties**: a parallel
  batch MAY run attended, and a Lights-Out run MAY execute a single increment.
- A batch is Lights-Out **only when every required function has demonstrated,
  available automated coverage.** If any required coverage is missing or lost
  mid-batch, the batch is not Lights-Out for the affected scope: it pauses or
  escalates even where some workers could technically continue.

**Outputs.** A Lights-Out eligibility determination for the batch, per
[Operating Model Spec § Capability Coverage](operating-model.md#capability-coverage).

**Evidence.** The required-function set and its coverage are recorded as part of
[canonical state](canonical-state.md).

**Failure behavior.** Lost coverage **narrows the envelope** — it pauses or
exits the affected work; it does not fail the project. The framework defines
when a batch is Lights-Out-eligible; a conforming tool detects lost coverage
mid-batch and holds the affected work.

---

## Representation in Canonical State

Batches are not a separate store. The ordered, classified batch list — each
batch's membership, order, prerequisites, transition criteria,
[lifecycle state](#batch-lifecycle) with its reason, and per-increment
disposition — is part of the **increment plan** in
[canonical state](canonical-state.md), and the current batch/increment is part
of a delegated run's [position](delegated-run.md). A conforming implementation
chooses the storage; this spec fixes only what must be representable.

---

## Notes

**Last Updated:** 2026-07-16

Added to framework in v0.49.0.
