# Delegated-Run Spec

## Overview

Normative contracts for a delegated (Lights-Out) run — the authorized span of
unattended execution, its lifecycle and liveness, the durable state it carries,
the events it emits, how it replans within authority, and how project-level
completion is proven across runs.

### Why These Contracts

A bounded run that proceeds without routine human involvement needs its
operational rules stated precisely enough to execute from the Markdown: when it
is live, when it is merely quiet, when it has stopped, what state survives a
handoff, what an inbound directive does, and what "done" means. These contracts
are the operational bridge between an approved plan and a result a human can
inspect and trust.

### Goals of This Spec

- Define the run as an authorized span, its three-layer lifecycle/liveness/event
  model, and its five terminal states
- Fix one minimum durable run state, the idempotency substrate, and the
  rendered-snapshot fidelity floor that keeps a run operable from Markdown
- Define operational-readiness preflight, controlled replanning, the
  learning-loop delegation boundary, and project-level completion

### Key Principle

A **delegated run is one authorized span** of unattended execution, bounded by
its authorization — not by a structural unit. **Absence of a stop is never
evidence of liveness**: past the authorized interval with no signal, a run is
presumed unresponsive, not active. A project-completion claim is earned against
an explicit contract, never assumed because agents stopped or tests passed.

### How to Use This Spec

1. Read [**Run Definition**](#run-definition) and
   [**Run Lifecycle**](#run-lifecycle) for what a run is and the states it moves
   through
2. Read
   [**Progress, Liveness, and Unresponsive State**](#progress-liveness-and-unresponsive-state)
   and [**Minimum Durable Run State**](#minimum-durable-run-state) for
   observation and continuity
3. Read [**Idempotency Substrate**](#idempotency-substrate),
   [**Operational Readiness Preflight**](#operational-readiness-preflight),
   [**Project-State Access**](#project-state-access), and
   [**Observable Run Event Model**](#observable-run-event-model) for the
   execution substrate
4. Read [**Controlled Replanning**](#controlled-replanning),
   [**Learning-Loop Delegation Boundary**](#learning-loop-delegation-boundary),
   [**Project-Level Completion**](#project-level-completion),
   [**Completion Evidence Package**](#completion-evidence-package), and
   [**Honest Incomplete Outcomes**](#honest-incomplete-outcomes) for adaptation
   and closure

The contract form is defined in the [spec index](README.md#contract-form).
Eligibility to run unattended at all is governed by the
[Operating Model Spec § Lights-Out Eligibility](operating-model.md#lights-out-eligibility).

---

## Run Definition

Rationale:
[Operating Model Guide § Lights-Out](../guides/operating-model.md#lights-out-the-far-end-of-the-spectrum).

**Applicability.** Any span of unattended execution.

**Inputs.** The authorization: an objective slice, operating envelope,
escalation and stop conditions, and resource/time limits.

**Procedure.**

- A delegated run MUST be defined as **one authorized span**, bounded by its
  authorization — not by a structural unit (increment, batch, or stage). Its
  scope MAY be a single increment, a batch, several batches, or the whole
  remaining project; the authorization sets the boundary.
- A project MUST be deliverable by **one or more runs**. The lifecycle is
  therefore **per-run**; project-level completion is the distinct claim
  evaluated across runs (see
  [Project-Level Completion](#project-level-completion)).
- **Authorized scope** is what a run may attempt; **realized extent** is what it
  actually completes. The two diverge whenever a run halts early — a partial
  increment is a realized extent (an honest incomplete outcome), not a smaller
  authorized scope.

**Outputs.** A bounded, authorized run.

**Evidence.** The authorization record (single-sourced from the
[canonical state's Authorization subset](canonical-state.md#minimum-canonical-project-state)).

**Failure behavior.** Work beyond the authorized span is an operating-envelope
change and MUST stop until validly re-authorized (see
[Controlled Replanning](#controlled-replanning)).

---

## Run Lifecycle

Rationale: the run's lifecycle, observed liveness, and event record are three
distinct layers and MUST NOT be conflated — lifecycle is what the run is
**authorized to be doing** (run-owned); liveness is what an observer can
**currently confirm** (observer-derived); events are the append-only record both
are observed through.

**Applicability.** Every run, throughout its life.

**Inputs.** Authorization; directives; the run's own progress.

**Procedure.**

- The minimum normative lifecycle:

```text
proposed -> approved -> active
active   <->  paused                       (pause is non-terminal; resolve-and-continue -> active)
active|paused -> completion-claimed -> completion-verified
active|paused -> failed | cancelled | abandoned | authorization-exhausted
```

- `proposed` is an optional pre-authorization state; **`approved` is the minimum
  entry.** The lifecycle MUST distinguish requested from confirmed state.
- **`paused` is the single non-terminal suspension state.** A pause suspends a
  run; it does not end it. On an escalation/decision condition the run enters
  `paused`, stays live, and awaits **resolve-and-continue** (→ `active`) or
  **cancel** (→ terminal). A pause MUST NOT split one run into two. `blocked`
  and `awaiting-decision` are status **reasons** on `paused`, not separate
  states. `pause-requested` is a directive state, not a run state; the run
  becomes `paused` only when that directive is `applied`.
- **`unresponsive` is not a lifecycle state** — it is an observer-assigned
  liveness determination overlaying `active`/`paused` (see
  [Progress, Liveness, and Unresponsive State](#progress-liveness-and-unresponsive-state)).
- **Five terminal states, each carrying an outcome reason:**
  `completion-verified`, `failed`, `cancelled`, `abandoned`,
  `authorization-exhausted`. A run ends only at a terminal.
- The lifecycle MUST distinguish requested from confirmed state,
  no-recent-report from confirmed stop, completion claimed from completion
  verified, and blocked-and-resumable (`paused`) from terminal.

**Outputs.** The run's current lifecycle state and status reason.

**Evidence.** A run-lifecycle event on every transition (see
[Observable Run Event Model](#observable-run-event-model)).

**Failure behavior.** An unrecoverable condition routes to the appropriate
terminal with its outcome reason; evidence and continuation state are preserved.

---

## Progress, Liveness, and Unresponsive State

Rationale: without a local runner there is no process to "be up"; liveness is
defined against an **authorized reporting cadence** and judged by an observer,
not a daemon.

**Applicability.** Every run an observer is monitoring.

**Inputs.** The authorized reporting cadence (declared at authorization, checked
at preflight); the separate decision-response window; emitted events;
last-known-activity.

**Procedure.**

- Four liveness states: **Progressing** (progress reports arriving);
  **Working-but-quiet** (a liveness signal but no new progress — liveness is not
  progress); **Paused** (alive by design, with a recorded reason — a paused run
  is NOT unresponsive); **Unresponsive** (the expected interval lapsed with no
  signal and no recorded pause or terminal).
- **Absence of a stop is never evidence of liveness.** Past the interval with no
  signal, a run MUST be presumed unresponsive, not active (fail-safe: unknown →
  not-progressing, reconfirmed before trusted).
- **Detection regime follows the access mode.** Live structured access supports
  near-real-time unresponsive detection; rendered-snapshot mode determines
  unresponsive **at inspection time** by comparing last-known-activity against
  the cadence — an accepted limitation that narrows a snapshot run's eligibility
  for long or high-consequence spans.
- A run whose environment cannot meet the cadence its consequence requires is
  **not Lights-Out-eligible** for that span (cadence is a preflight check).
- Two "stalled" signals with distinct owners: **Unresponsive** (the agent went
  dark; threshold = reporting cadence; exceeded ⇒ presumed unresponsive) and
  **Decision-overdue** (a paused run's human has not answered; threshold = the
  decision-response window). Exceeding the decision-response window **escalates;
  it MUST NOT change the run's state** — the run stays paused/alive. What the
  escalation does (re-notify, route to a backup decider, or a pre-authorized
  auto-cancel/auto-abandon after a longer bound) is itself governed by
  pre-authorized policy.

**Outputs.** The observer-derived liveness determination.

**Evidence.** Liveness signals, progress reports, and the recorded
unresponsive/decision-overdue determinations.

**Failure behavior.** Presumed-unresponsive work MUST be reconfirmed before
being trusted or continued; the fail-safe presumption is not-progressing.

---

## Minimum Durable Run State

Rationale: continuity has two scales — intra-run (session/context/agent handoff)
and inter-run (the next run resumes from durable project state) — but both are
fed by one durable state.

**Applicability.** Every run, before any pause, exit, context-crossing, or
handoff.

**Inputs.** The run's identity, position, work, decisions, external-world state,
and observability.

**Procedure.**

- The minimum durable run state MUST carry:

| Group                 | Fields                                                                                           | Source                                                            |
| --------------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| Identity & version    | run id; run version; execution-plan version; framework version                                   | run-level                                                         |
| Authorization         | approved objective & scope; operating envelope; escalation/stop conditions; resource/time limits | [canonical state](canonical-state.md) (reference, do not restate) |
| Position              | current batch/increment/stage/work item; lifecycle state + status reason; active actor/provider  | run-level                                                         |
| Work ledger           | completed work + evidence; work in progress; remaining work                                      | run-level                                                         |
| Open items            | outstanding decisions, blockers, questions, directives; current assumptions & recorded decisions | run-level                                                         |
| External-world state  | repository/workspace/branch; deployment; external-system state                                   | run-level                                                         |
| Continuation          | resumption context (no private conversational state); in-flight ops + retry class                | run-level                                                         |
| Observability         | last progress report; last known activity; reporting cadence + decision-response window          | run-level                                                         |
| Evidence & completion | evidence-package state; completion claim/verify/accept status                                    | run-level                                                         |
| Timestamps            | relevant lifecycle timestamps                                                                    | run-level                                                         |

- **Single-source split.** The Authorization group MUST be the run-scoped read
  of the
  [canonical project state](canonical-state.md#minimum-canonical-project-state)
  — referenced, not restated. A run's "complete readable state" is the canonical
  project state plus the run-execution groups, viewed for the run.
- **Boundary-currency.** The state MUST be complete and current before any
  pause, exit, context-crossing, or handoff.
- **Resume contract.** A compatible new actor MUST resume from this state
  **without the prior actor's private conversational context**. The handoff
  concepts _safe next action_, _must-not-repeat_, and _safe-to-retry_ are the
  idempotency classification on in-flight operations (see
  [Idempotency Substrate](#idempotency-substrate)), referenced here, not
  restated.

**Outputs.** A durable, resumable run state.

**Evidence.** The state itself, with provenance and timestamps.

**Failure behavior.** If boundary-currency cannot be established before a
handoff, the run MUST pause rather than cross the boundary.

---

## Idempotency Substrate

Rationale: operation retry and directive ordering are the same concern —
exactly-once **effect** under duplication, retry, and reordering — over two
object types.

**Applicability.** Every report, evidence item, decision, directive, and ack;
every operation with side effects.

**Inputs.** The object's stable id; the monotonic per-run sequence; current run
state.

**Procedure.**

- **Stable identity.** Every report, evidence item, decision, directive, and ack
  MUST carry a stable id. Re-processing the same id MUST be a no-op or a
  deterministic merge, never a fork.
- **Monotonic per-run sequence.** Directives and state writes MUST order by a
  monotonic run-scoped sequence/version, not wall-clock. An item referencing a
  stale run-version is re-evaluated against current state (and may be moot).
- **Deterministic conflict resolution.** Duplicate/out-of-order items MUST
  reconcile deterministically (merge-by-identity for evidence/reports;
  last-by-sequence for directives) under single-writer-for-scope; never a silent
  fork.
- **Operation retry classes** (over the substrate): safe to retry; safe only
  after confirming current state; unsafe to retry automatically; requires
  authorization before retry.
- **Directive lifecycle, ordering, and supersession:**

```text
draft -> queued -> received -> acknowledged -> applied | rejected | superseded
```

- **Intent vs. effect** — `queued`/`received`/`acknowledged` is intent; **only
  `applied` mutates run state.** `pause-requested` lives entirely in the
  directive lifecycle; the run transitions to `paused` only at `applied`, which
  emits a normative directive event.
- **Supersession** — a later same-scope/same-type directive supersedes an
  earlier un-applied one; the superseded directive goes to `superseded` and MUST
  NOT also apply. Exactly-once across the supersession chain.

**Outputs.** Exactly-once effects under duplication and reordering.

**Evidence.** The id-keyed records, the sequence, and the directive state
transitions.

**Failure behavior.** A duplicate or out-of-order item reconciles
deterministically; it MUST NOT create contradictory state or a fork.

---

## Operational Readiness Preflight

Rationale: operational readiness establishes whether **this specific run** can
proceed unattended; it complements capability coverage (whether required
providers exist in principle).

**Applicability.** Before any unattended run begins.

**Inputs.** The run's plan, envelope, channels, repositories, tools, deployment
targets, credentials, and resource/policy limits.

**Procedure.** Preflight MUST cover: agent and coordination (state/plan access;
progress, evidence, blocker, completion reporting; working channels); repository
and workspace (reachable, valid, permissioned; integration strategy; concurrent
workspaces when required); development/verification/assurance (tools, builds,
tests, fixtures, verification targets, assurance providers); deployment and
external services (targets exist; authorized access; verification and rollback
paths; consequential actions have required checkpoints); credentials and
security (exist in the user-controlled environment; scope matches the envelope;
secrets not exposed through artifacts or events); resource and policy limits
(budget/time/usage/ concurrency known; provider-exhaustion behavior understood;
stop and escalation conditions configured).

**Outputs.** One of: ready; ready with accepted limitations; blocked pending
remediation; not eligible for Lights-Out execution.

**Evidence.** Each failed or limited check identifies the remediation or
consequence.

**Failure behavior.** Failed preflight blocks unattended execution; a limited
preflight narrows the envelope to the accepted limitations.

---

## Project-State Access

Rationale: a delegated run can proceed only if the acting agent can both read
the project state it needs and durably write its outputs. Governed by the
[coverage-narrows-the-envelope rule](operating-model.md#capability-coverage),
not a separate concept.

**Applicability.** Every run's reads and writes of mutable run state.

**Inputs.** The system of record; the run's required reads and writes.

**Procedure.**

- Required access properties: **readable state** (objective, approved plan,
  governance profile, operating envelope, current batch/increment state, open
  decisions, continuation context); **durable, attributable writes**; **a
  consistent working view**; **concurrency-safe write-back** when more than one
  actor may write; **idempotent writes**; **freshness signaling**.
- Two satisfaction modes — **live structured access** (queries plus leases or
  transactions; required for parallel batches, multi-actor coordination, live
  directives, high-consequence work) and **rendered-snapshot access** (operate
  against a point-in-time rendering and reconcile back; for sequential,
  single-actor, low-consequence runs). The mode is determined by the run, not
  chosen for convenience. Loss of a live provider mid-run falls back to
  snapshot, or **pauses** when the snapshot is insufficient.
- **Rendered-snapshot fidelity floor.** A snapshot is Lights-Out-eligible only
  if it preserves: (1) complete readable state for the authorized scope; (2)
  explicit freshness signaling (an as-of version/timestamp); (3) a durable,
  attributable, reconcilable write-back path; (4) single-writer for the scope it
  touches; (5) stable record identity. A snapshot MAY lack near-real-time
  freshness, multi-writer safety, and real-time liveness/stop — which is why
  snapshot mode is confined to single-actor, sequential, low-consequence runs.
- **Normative scope.** Rendered-snapshot access is normatively required at the
  framework/spec level (it binds the framework and spec authors, not every
  tool): the mode is a valid satisfaction mode, and Markdown self-sufficiency
  (see [Canonical-State Spec](canonical-state.md#markdown-self-sufficiency)) is
  its bite. An implementation satisfies project-state access through **some**
  valid mode; a live-only tool is conformant. An implementation MAY claim
  Markdown-operationalizability/vendor-independence only if it actually provides
  a fidelity-floor-meeting rendering and write-back path (claims-conditioned,
  not a blanket portability mandate).

**Outputs.** A valid project-state-access mode for the run.

**Evidence.** The access mode in use and its freshness markers.

**Failure behavior.** When only a lower-capability mode than the run requires is
available, the envelope narrows or the run becomes Lights-Out-ineligible for the
affected scope; an insufficient snapshot **pauses** the run.

---

## Observable Run Event Model

Rationale: an append-oriented, provider-neutral event model is the only channel
through which lifecycle and liveness are observed.

**Applicability.** Every meaningful run event.

**Inputs.** The run's transitions, progress, decisions, verifications,
integrations, deployments, and directives.

**Procedure.**

- Every event MUST identify: identity and type;
  project/run/batch/increment/stage/ work-item scope; actor or provider;
  timestamp; prior and resulting state where applicable; trigger and outcome;
  related decisions, directives, artifacts, and evidence; causation or
  correlation; and a human-readable summary.
- **The minimum event set ⊇ the minimum lifecycle.** Normative **always**: a
  run-lifecycle event on every lifecycle transition (enter approved/active;
  enter/exit paused with reason; completion-claimed; completion-verified; each
  terminal with outcome reason). Normative **when the thing happens**: progress
  events at the authorized cadence; decision/escalation events at a
  pause-for-decision; verification/assurance events when assurance runs;
  integration/deployment events when they occur; directive/acknowledgement
  events on directive processing; plan-revision/deviation events on replanning.
- Sub-events below the minimum are optional/foldable; user-facing views MAY fold
  low-level events while retaining drill-down.
- `unresponsive` is observer-derived, not run-emitted (live mode:
  interval-exceeded flag; snapshot mode: computed at inspection).
- Events MUST preserve corrections rather than overwrite history; **event
  absence MUST NOT be read as successful activity.**

**Outputs.** The append-only event record.

**Evidence.** The events themselves.

**Failure behavior.** A missing required event leaves the lifecycle
unobservable; the fail-safe liveness rule applies (absence is not activity).

---

## Controlled Replanning

Rationale: which changes an agent may absorb autonomously is bounded by the
operating preset, floored by consequence/compliance.

**Applicability.** Any change discovered mid-run.

**Inputs.** The change class; the operating preset; the consequence/compliance
floors; the delegated authority and capability coverage.

**Procedure.**

- Change classes and expected handling:

| Change Class                 | Expected Handling                                                                                     |
| ---------------------------- | ----------------------------------------------------------------------------------------------------- |
| Within-plan execution choice | Proceed autonomously; record when material.                                                           |
| Recorded design deviation    | Proceed when delegated; record rationale; update verification.                                        |
| Execution-plan revision      | Re-evaluate dependencies, batches, safety, downstream work; proceed autonomously only when delegated. |
| Foundational change          | Resolve through an authorized decision mechanism.                                                     |
| Operating-envelope change    | Stop until the envelope is validly changed.                                                           |

- The highest class an agent MAY resolve autonomously is set by the preset:

| Operating preset | Highest class resolved autonomously                                                    |
| ---------------- | -------------------------------------------------------------------------------------- |
| Supervised       | Within-plan execution choice only                                                      |
| Checkpointed     | + Recorded design deviation (plan revisions wait for the next checkpoint)              |
| Lights-Out       | + Execution-plan revision, _when delegated authority and capability coverage cover it_ |

- **Hard-floor invariants at every preset:** foundational changes MUST require
  an authorized decision; operating-envelope changes MUST stop until validly
  re-authorized.
- **Consequence/compliance pulls the ceiling down** regardless of preset (e.g.
  at high consequence or under a compliance flag, execution-plan revisions
  escalate even in Lights-Out).
- Material replanning MUST re-evaluate requirements and success-criteria
  coverage; increment scope and completion criteria; dependencies,
  [batches and parallel safety](parallel-batch.md); downstream work validity;
  required functions and capability coverage; authority and effective operating
  envelope; assurance and verification; and budget, schedule, and deployment
  effects — and MUST explicitly identify work that remains valid, requires
  re-verification, requires modification, or is invalidated. Completed work MUST
  NOT remain implicitly accepted when its supporting assumptions have materially
  changed.

**Outputs.** A revised, re-validated plan or an escalation.

**Evidence.** Plan-revision/deviation events with rationale and the
work-validity classification.

**Failure behavior.** A foundational or operating-envelope change escalates or
stops; it MUST NOT be silently absorbed.

---

## Learning-Loop Delegation Boundary

Rationale: agent-operated learning is permitted within authority; autonomous
factory or methodology self-modification is not.

**Applicability.** Any learning-loop activity during or after a run.

**Inputs.** Captured friction and observations; the governance profile's named
decision mechanism for each candidate class.

**Procedure.**

- Within approved authority a run MAY: capture friction and observations,
  conduct a retrospective, classify/deduplicate/route improvement candidates,
  and prepare proposed issues or backlog entries. It MAY file issues or initiate
  improvement work **only when explicitly authorized.**
- Without a separately approved decision mechanism, agents MUST NOT:
  autonomously prioritize and initiate factory-improvement work; modify the
  framework, factory, or agent configuration; modify governance controls,
  evaluation criteria, assurance requirements, or stop conditions; expand or
  redefine their own operating envelope; or apply proposed governing changes to
  the active run.
- **Routing is by class, not by tracker.** Candidates MUST be classified
  (methodology-improvement vs. product/delivery) and routed to the decision
  mechanism the **governance profile** names for that class. The concrete
  tracker is project configuration, not framework-normative.
- Proposed changes MUST be durable, attributable, and routed to an authorized
  decision mechanism; when approved they are versioned, independently verified
  where required, reversible, and normally take effect in a subsequent run.

**Outputs.** Prepared, routed improvement candidates (not applied changes).

**Evidence.** The proposed candidates with classification and routing.

**Failure behavior.** An attempt to self-modify without authorization MUST be
refused and recorded.

---

## Project-Level Completion

Rationale: a completion claim is earned against a contract, evaluated across a
project's runs. This contract is the **canonical definition of project
closure**; the Closure stage's close-out checklist and summary are its rendered
view (see
[Canonical-State Spec § Artifacts as Views](canonical-state.md#artifacts-as-views)).

**Applicability.** Any project or delegated objective claimed complete.

**Inputs.** The approved scope; requirements and success criteria;
batch/increment outcomes; verification, assurance, and deployment results; the
operating envelope; acceptance and authorization decisions.

**Procedure.**

- A project-completion claim MUST NOT be permitted merely because agents
  stopped, tasks were marked complete, tests passed, or deployment succeeded. It
  is permitted only when **all** hold: every approved in-scope requirement has
  an explicit disposition; applicable success criteria have evidence or an
  explicit post-release measurement plan; required decisions and constraints
  remain satisfied or approved deviations are recorded; all batches and
  increments have explicit outcomes; parallel work is integrated; required
  whole-system verification and assurance pass; deployment and post-deployment
  verification pass when applicable; required operational readiness, handoff,
  and cleanup are complete; known defects, deviations, unresolved risks, and
  limitations are disclosed; the final result remains inside the approved
  operating envelope; and required acceptance and authorization decisions are
  resolved.
- The contract MUST distinguish completion **claimed**, **verified**,
  **accepted**, and **closed**. These MAY coincide for a low-risk solo project
  but remain distinct. This four-step claim is project-level and is evaluated
  **across** a project's runs; a single run reaching `completion-verified` means
  only **its** authorized objective slice is done and verified.

**Outputs.** A claimed → verified → accepted → closed determination.

**Evidence.** The [Completion Evidence Package](#completion-evidence-package).

**Failure behavior.** Any unmet element blocks the completion claim; the run
records an [honest incomplete outcome](#honest-incomplete-outcomes) instead.

---

## Completion Evidence Package

Rationale: a concise rendered view over structured state — not a separate
maintained source — that folds with the governance preset.

**Applicability.** Any completion claim.

**Inputs.** The canonical state at completion.

**Procedure.**

- At the Minimal preset the package MUST fold to **six irreducible elements**
  that never drop at any preset:
  1. Approved objective and scope.
  2. Final delivered result.
  3. Requirements / success-criteria disposition — compact, but **every in-scope
     requirement explicitly disposed**.
  4. Assurance result at the required level — recorded even when the required
     level is None/Self.
  5. Honest defects, risks, limitations, deferred work.
  6. The acceptance decision (may coincide with the completion claim, but
     recorded).
- Conditional elements MUST be included only when material/applicable:
  significant decisions/deviations; per-increment/batch outcomes (only if
  parallel batches ran); deployment/operational evidence (only if it deploys);
  cost/duration/intervention summary.
- **The honesty floor never folds at any preset:** explicit disposition of every
  in-scope requirement, plus disclosure of known defects and limitations.

**Outputs.** The completion evidence package (rendered as the close-out Summary
at human cadence).

**Evidence.** The package is the evidence; it renders over canonical state.

**Failure behavior.** A package missing an irreducible element or the honesty
floor is invalid and MUST NOT support a completion claim.

---

## Honest Incomplete Outcomes

Rationale: a run may finish without completing the objective; the taxonomy is
reason codes over the five terminal states, not parallel states.

**Applicability.** Any run that ends without a verified completion of its
objective.

**Inputs.** The terminal state reached; the reason it ended.

**Procedure.**

- The honest-incomplete taxonomy MUST be **reason codes over the five terminal
  states**, not parallel states:
  - failed-verification / failed-deployment → `failed`;
  - stopped-by-user / stopped-by-policy / superseded-by-replanning →
    `cancelled`;
  - **partially-complete is the realized extent** at any terminal, not a state;
  - `blocked` is a `paused` reason, not a terminal.
- Each terminal MUST carry its outcome reason and preserve evidence and
  continuation state.

**Outputs.** A terminal state with an outcome reason and preserved state.

**Evidence.** The terminal event with its outcome reason; preserved evidence and
continuation state.

**Failure behavior.** A run MUST NOT represent a partial or failed result as
complete; the realized extent is recorded honestly.

---

## Framework and Runtime Responsibilities

The Markdown defines lifecycle semantics, required continuity state, honest
status distinctions, readiness categories, event requirements, change classes,
and completion contracts. A capable agent environment and independent runtime
providers perform the active functions — orchestration, progress and liveness
reporting, directive acknowledgement and application, preflight, continuation
and resumption, and verification, assurance, and independent stop enforcement.
**`[Reserved]`** An optional implementation may deliver the framework; durably
record run state, events, directives, evidence, and decisions; exchange
messages; and present status, notifications, stale-run observations, and
completion views. Recording or displaying these does not perform their active
functions.

---

## Scope Boundary

This spec does **not** require automatic agent restart, a local runner, a
general-purpose scheduler, a full automated replanning policy engine, autonomous
factory or methodology self-modification, managed execution infrastructure,
provider-specific credential management, universal agent compatibility, or
automated recovery from every runtime failure. Scale scenarios and deep
operations are `[Reserved]`.

---

## Notes

**Last Updated:** 2026-06-21

Added to framework in v0.49.0. Authored from the v0.49 delegated-run-operations
detail doc; the canonical state these contracts read and write is single-sourced
from the [Canonical-State Spec](canonical-state.md), and eligibility to run
unattended is governed by the [Operating Model Spec](operating-model.md).
Human-facing rationale lives in the
[Operating Model Guide](../guides/operating-model.md).
