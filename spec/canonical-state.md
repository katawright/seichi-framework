# Canonical-State Spec

## Overview

Normative contracts for the project's canonical structured state — the single
source of project-level facts that every artifact renders, every run reads and
writes, and a Markdown rendering must reproduce without loss.

### Why These Contracts

The operating-model and delegated-run contracts both reference "the project
state." That state needs one definition, one source-of-truth rule, and one
guarantee that it survives as Markdown — otherwise a run operating against an
exported snapshot cannot know whether it has the whole picture. This spec fixes
the state semantics: what the canonical state contains, that documents are views
over it, and that it has a complete, lossless Markdown rendering.

### Goals of This Spec

- Define the minimum canonical project state and mark the subset a run
  authorizes against
- Define the normative **project lifecycle** — states, reasons, overlays, and
  transitions — the **project-level completion contract** that rides it, and the
  **terminal-integrity contract** that binds its terminals to the open child
  graph
- Fix normative, closed **status vocabularies** for the canonical record
  families that lack their own lifecycle contract
- Establish that briefs, checklists, packages, and reports are **rendered
  views**, not parallel sources
- Name the two operating modes — **file mode** and **platform mode** — and the
  binding record that makes the mode discoverable
- Fix Markdown **self-sufficiency**: no required state element may be
  expressible only through live structured access
- State implementation-neutral record requirements and the folding rule that
  scales presentation without dropping required concerns

### Key Principle

**Capture once as structured project state; present progressively; render formal
documents on demand.** Required concerns are preserved; their presentation and
interaction cost scale. There is no "off" setting — structure persists at every
consequence level; only ceremony and decision rights scale down.

### How to Use This Spec

1. Read [**Minimum Canonical Project State**](#minimum-canonical-project-state)
   for what the state contains and which facts a run authorizes against
2. Read [**Project Lifecycle**](#project-lifecycle) and
   [**Project-Level Completion**](#project-level-completion) for the project's
   state model and what "done" means,
   [**Terminal Integrity**](#terminal-integrity) for what its terminals require
   of the open child records under them, and
   [**Record-Family Status Vocabularies**](#record-family-status-vocabularies)
   for the closed status sets of the remaining stateful families
3. Read [**Artifacts as Views**](#artifacts-as-views),
   [**Markdown Self-Sufficiency**](#markdown-self-sufficiency), and
   [**Mode Binding and Discovery**](#mode-binding-and-discovery) for the
   source-of-truth, operating-mode, and lossless-rendering rules
4. Read [**Record Requirements**](#record-requirements) and
   [**Progressive Governance and Folding**](#progressive-governance-and-folding)
   for the durability and folding contracts

The contract form (the six fields used below) is defined in the
[spec index](README.md#contract-form). The run-level state that references this
state lives in the [Delegated-Run Spec](delegated-run.md).

---

## Minimum Canonical Project State

Rationale: progressive-governance detail (Artifacts as Views).

**Applicability.** Every project. This is the single source for
**project-level** facts; run-execution facts are defined in the
[Delegated-Run Spec § Minimum Durable Run State](delegated-run.md#minimum-durable-run-state)
and reference this state rather than restating it.

**Inputs.** The project's goals, requirements, design, plan, governance profile,
operating configuration, and the records produced as work proceeds.

**Procedure.**

- The framework MUST define a minimum canonical structured project state; the
  state MUST be able to represent, at minimum: the
  [project lifecycle state](#project-lifecycle) with its status reason and any
  overlays; goals and success criteria; requirements and acceptance criteria;
  assumptions and risks; architecture and decisions; increment plans, batches,
  and dependencies; operating configuration; governance profile and approved
  deviations; assurance requirements, achieved independence, evidence, and
  conclusions; decision rights, delegated authority, and authorization records;
  required operating functions, capability coverage, and function separations;
  effective operating-envelope state; runs, directives, events, and continuation
  state; checkpoint decisions, escalations, and resolutions; carried-forward
  gate and checkpoint conditions (each with an owner, the discharging stage or
  increment, and an Open / Satisfied / Blocked / Withdrawn status); folded-stage
  state and unfolding triggers; and evidence, provenance, and traceability
  relationships.
- This canonical state MUST be the single source for project-level facts. Any
  other representation of these facts is a [view](#artifacts-as-views), not a
  second source.
- The **Authorization** subset a delegated run reads — the approved objective
  and scope, the operating envelope, the escalation and stop conditions, and the
  resource and time limits — is part of this canonical state. A run references
  it; it MUST NOT be restated as a separate source (single-source rule).
- **State versioning (ratified v0.58).** The canonical state carries a
  **per-project monotonic state version**, incremented by every admitted
  canonical-state write; it identifies a point in the project's total write
  order, and equal versions imply identical canonical state. Every
  [view](#artifacts-as-views), export, and rendered snapshot MUST carry the
  state version it was rendered from as its as-of marker. A run's Authorization
  reference is **version-pinned**: it names the state version current at run
  approval, and the Authorization subset is read as-of that pin. A mid-run
  change to the Authorization subset MUST be detectable as any subset record
  whose last-write version exceeds the pin — the trigger for the envelope-change
  stop in [Controlled Replanning](delegated-run.md#controlled-replanning) — and
  a conforming platform MUST expose that determination cheaply. Re-authorization
  records a new pin.
- **Carry-forward obligations are tracked state.** A "proceed with conditions"
  gate or checkpoint outcome records each condition as a tracked item — owner,
  discharging stage or increment, and an Open / Satisfied / Blocked / Withdrawn
  status. Withdrawn — no longer applicable — carries an attribution and a
  recorded reason from a closed set: `party-withdrawn` (a party's own act — the
  condition no longer applies) · `project-canceled` (the cascade,
  [Terminal Integrity](#terminal-integrity)); free prose belongs in a detail
  field, never in the reason. Subsequent stages re-read these at entry, and a
  stage MUST disposition each condition due within it (satisfy, withdraw with a
  recorded reason, re-own with a new discharge point, or escalate) before it
  closes. Re-owning supersedes the tracked item with a successor rather than
  mutating it, preserving the original's provenance. They are canonical state,
  not a gate-record footnote.

**Outputs.** The canonical project state and its Authorization subset.

**Evidence.** The state itself is the record; each element carries provenance
per [Record Requirements](#record-requirements).

**Failure behavior.** Stray facts are reconciled —
[CS-006](#cs-006--stray-fact-reconciliation-single-source-detection), below.

<!-- rule: CS-006 -->

### CS-006 — Stray-fact reconciliation (single-source detection)

- **Applicability.** Every project-level fact, wherever it surfaces.
- **Inputs.** The canonical project state (the enclosing contract); the stray
  representation.
- **Procedure.** A project-level fact that exists only inside a run's private
  state, or only in a rendered document, violates the single-source rule and
  MUST be reconciled into the canonical state.
- **Outputs.** The fact, reconciled into the canonical state.
- **Evidence.** The reconciling write, attributed per
  [Record Requirements](#record-requirements).
- **Failure behavior.** N/A — this rule is itself the enclosing contract's
  failure path.

<!-- /rule: CS-006 -->

---

## Canonical Record Families

Rationale: the
[Minimum Canonical Project State](#minimum-canonical-project-state) enumerates
the kinds of facts the state must represent, and the
[Framework Guide's traceability chain](../guides/framework.md#the-traceability-chain)
explains the typed links that connect them. The contracts below ratify those
kinds and verbs as closed identifier sets — the traceability identity level —
and fix the chain's topology and id conventions.

<!-- rule: FW-005a -->

### FW-005a — Traceability-chain identity level (record families + typed links)

- **Applicability.** Every project; every conforming record store; every typed
  traceability link.
- **Inputs.** Two closed identifier sets in
  [`vocabulary/traceability.yaml`](vocabulary/traceability.yaml) bind as data
  (generated view: [reference.md](generated/reference.md)): `record_family` —
  the 30 kebab-case family slugs, each naming a canonical kind of record the
  state may hold — and `trace_link_type` — the seven link-type verbs (`realizes`
  | `verifies` | `discharges` | `corrects` | `renders` | `evidences` |
  `supersedes`).
- **Procedure.**
  - Each family maps to a phrase in the minimum-canonical-state enumeration or
    to a named family contract in this spec. Ratifying a family identifier
    declares a canonical record **kind** that a typed reference may point at; it
    does **not** restate the family's record **requirements**, which remain
    their own constructs (for example the status vocabularies in
    [Record-Family Status Vocabularies](#record-family-status-vocabularies) and
    the shape rules in [Record Requirements](#record-requirements)).
  - Three families are named explicitly because each is easy to fold into a
    neighbor and must not be:
    - **`roster-entry`** — a change to the
      [authorized-party roster](#authorized-parties-for-floor-decisions) is
      itself a durable, attributed record, distinct from the parties it lists.
      The roster stays optional (a project MAY declare one); ratifying the
      family does not mandate it.
    - **`risk-acceptance`** — the risk-acceptance decision recorded when a
      consequence floor is dropped (see
      [Operating-Model Spec § Governance Floors and Capability Ceilings](operating-model.md#governance-floors-and-capability-ceilings))
      is a distinct governance record, **not** the `accepted` posture of the
      `risk` family's status.
    - **`rendered-view`** — the **rendering-provenance** record for a
      [view](#artifacts-as-views): its kind, the state version it was rendered
      from, and attribution — never the rendered content itself. Views remain
      non-sources; this family names the record that keeps a rendering traceable
      to the canonical state, not a second source of the facts it renders.
  - **`stage` is not a canonical record family.** Stage identity is the
    kernel-canonical catalog (the stage pipeline in
    [Stages Guide](../guides/stages.md) front matter), and stage progress is
    reconstructible from gate and checkpoint decisions; the framework requires
    no durable per-project stage-instance record. A conforming store MAY
    implement a project-stage entity, but is not required to — it is
    consumer-side substrate, not a ratified family. (Falsifier: a framework
    clause requiring durable per-project stage-entry facts would flip `stage` to
    a ratified family.)
  - A **typed traceability link** is a directed relationship from one record to
    another, written `from-family / from-id —(type)→ to-family / to-id`. The
    endpoints are the ratified families; each verb names a relationship the
    framework owns:
    - **`realizes`** — the construction-branch edge: a functional requirement
      realizes the goal it was chosen to serve.
    - **`verifies`** — the measurement/verification edge: a success criterion
      verifies a goal, an acceptance criterion verifies a requirement, a test
      verifies an acceptance criterion.
    - **`discharges`** — a carry-forward condition is discharged by the stage or
      increment that satisfies it (and a governance floor by the evidence that
      clears it).
    - **`corrects`** — an append-only correction edge: a record corrects an
      earlier one (decision and run-event corrections carry their history this
      way).
    - **`renders`** — a rendered view renders the canonical records it presents
      — its provenance edge back to the state version it was rendered from.
    - **`evidences`** — an evidence record evidences the claim, requirement, or
      conclusion it supports.
    - **`supersedes`** — the append-only supersession edge: a successor record
      supersedes its predecessor, chaining provenance.
  - Three relationships a consumer might reach for are deliberately **not**
    framework link types: a generic `relates-to` (a link should name its
    relationship, not gesture at one), a bare `blocks` between work items (the
    richer forcing-dependency records own that fact — see
    [Parallel-Batch Spec](parallel-batch.md)), and a standalone `derives-from`
    (the framework states no derivation edge left to name: chained provenance is
    `supersedes` and a view's derivation is `renders` — a future construct that
    states a genuine derivation edge ratifies a new type then).
- **Outputs.** The closed record-family and link-type identifier sets.
- **Evidence.** Each record carries its family and provenance per
  [Record Requirements](#record-requirements); each typed link names its type
  and its two endpoints.
- **Failure behavior.** A record whose family is outside the closed set — or a
  fact recorded under no family to dodge the set — violates the closure, and a
  link typed outside the closed verb set is not a valid typed link. A kind the
  families cannot name is a **missing family** and a relationship the seven
  verbs cannot name is a **missing link type**: a framework change, never a
  free-text label.

<!-- /rule: FW-005a -->

<!-- rule: FW-005b -->

### FW-005b — Traceability id conventions and chain topology

- **Applicability.** The outcome-chain records — goals, success criteria,
  functional requirements, acceptance criteria — and the typed links among them,
  in every project.
- **Inputs.** The record-family and link-type sets
  ([FW-005a](#fw-005a--traceability-chain-identity-level-record-families--typed-links));
  the project's goals (the chain's anchor).
- **Procedure.**
  - **Topology.** The goal is the **join point**: from it the chain forks into a
    measurement branch and a construction branch. A success criterion
    **verifies** the goal; a functional requirement **realizes** it; an
    acceptance criterion **verifies** the requirement; a test **verifies** the
    acceptance criterion. Success criteria and requirements are siblings —
    projections of the same goal — not a sequence. Security and compliance NFRs
    descend from the Initiation Brief's Data Sensitivity and Compliance section,
    so the framework has **two roots**: the outcome chain (business case → goals
    → criteria/requirements) and the constraint chain.
  - **Id conventions.** Chain records carry stable, family-scoped ids — `G-N`
    (goals), `SC-NN` (success criteria), `FR-N` (functional requirements),
    `AC-N.N` (acceptance criteria, scoped to their requirement) — and chain
    references are by bare id, never by path.
- **Outputs.** The project's traceability chain: typed links over stable ids.
- **Evidence.** The typed links and the ids they reference, preserved in
  canonical state.
- **Failure behavior.** N/A — no failure path is defined for the chain shape
  itself: the chain guarantees coverage and alignment, and a coverage gap (an
  unchecked goal, an unowned criterion) is a finding for the checkpoint that
  consumes the chain, not a defined failure state.

<!-- /rule: FW-005b -->

---

## Project Lifecycle

Rationale: the run lifecycle solved this problem once (see
[Delegated-Run Spec § Run Lifecycle](delegated-run.md#run-lifecycle) and
[§ Honest Incomplete Outcomes](delegated-run.md#honest-incomplete-outcomes));
this contract ports that discipline to the project: a small closed state set,
reason codes over states rather than parallel states, overlays off the axis, and
requested distinguished from confirmed.

**Applicability.** Every project, at every tier, consequence level, autonomy
posture, and operating mode. This is the **project-level** lifecycle; a run has
its own lifecycle
([Delegated-Run Spec § Run Lifecycle](delegated-run.md#run-lifecycle)) and
neither substitutes for the other.

**Inputs.** Recorded lifecycle transitions and their reasons; the
[completion contract](#project-level-completion); the acceptance decision.

**Procedure.**

<!-- rule: CS-007 -->

### CS-007 — Project lifecycle machine

- **Applicability.** Every project, at every tier, consequence level, autonomy
  posture, and operating mode.
- **Inputs.** The `project_lifecycle` machine in
  [`vocabulary/statuses.yaml`](vocabulary/statuses.yaml) — the closed state set
  (six states), edges, and two absorbing terminals bind as data (generated view:
  [reference.md](generated/reference.md)).
- **Procedure.**
  - **Terminals are absorbing.** `closed` and `canceled` are the only terminal
    states; no transition leaves either. The terminal meanings are
    **delivery-based**: `closed` means the approved scope was delivered and
    verified and the closure decision is recorded; `canceled` has one
    unambiguous meaning — **no verified delivery**. A verified-but-declined
    project is `closed` with reason `acceptance-declined`, never `canceled`.
  - **A refuted completion claim returns to `active`** — not to `paused`, and
    not to a terminal. An unmet contract element **blocks** the claim:
    identified work exists, and identified work is `active`. This is a
    deliberate asymmetry with the run lifecycle, where `failed-verification`
    routes to the `failed` terminal — correct for a run, whose authorized span
    is over; wrong for a project, which simply has work left.
  - **`paused` is the single non-terminal suspension state**, reachable from
    `active` only. It suspends the project awaiting something external; it is
    not where refuted claims or identified work go. A stalled verification waits
    in `completion-claimed`, which is already a waiting state.
  - **No pre-`active` state.** A project performs authorized work (Initiation)
    before Gate 1 — Gate 1 authorizes the plan, not the project's existence — so
    a project is `active` from bootstrap.
  - **Two terminals, not five.** A run is an operational span that can exhaust a
    budget or fail a deployment; a project is a governance object, and those
    endings all reduce to _stopped, for a reason_. The richness lives in the
    reason codes — the run spec's own rule.
  - **Overlays sit off the axis** — determinations that overlay a state without
    being one:
    - **`stale`** — an observer-inferred staleness determination over a
      non-terminal state: the project's expected attention has lapsed with no
      recorded transition and nobody present to record one. The project-level
      analog of the run's `unresponsive`. Staleness is never recorded as a
      lifecycle state — when someone finally looks, they resume the project or
      record `canceled` with reason `lapsed`.
    - **`archived`** — an administrator-assigned visibility determination
      overlaying a terminal. It sets independently of the lifecycle (e.g. an
      archived-at fact); it never overwrites _which_ terminal the project
      reached, and terminals stay absorbing.
  - The lifecycle MUST distinguish requested from confirmed state: a completion
    claim is not a verification, a verification is not the acceptance decision,
    and an intention to stop is not a recorded terminal.
- **Outputs.** The project's current lifecycle state and any overlays.
- **Evidence.** As the enclosing contract — a durable, attributed record for
  every transition.
- **Failure behavior.** A write attempting a transition outside the defined set
  — including any exit from a terminal — MUST be rejected. A staleness
  observation never mutates lifecycle state; it awaits a human record.

<!-- /rule: CS-007 -->

<!-- rule: CS-009 -->

### CS-009 — Project lifecycle reason codes (per-state, iff-required)

- **Applicability.** Every project-lifecycle state entry.
- **Inputs.** The `project_lifecycle` reason sets in
  [`vocabulary/reasons.yaml`](vocabulary/reasons.yaml) — the closed per-state
  code sets and the reason-required states bind as data (generated view:
  [reference.md](generated/reference.md)).
- **Procedure.** **Reason codes are normative** — fixed, closed sets per state —
  and a reason is present **iff** the state requires one. `active` and
  `completion-claimed` carry no reason. Free prose belongs in a separate detail
  field, never in the reason. A situation no code fits is a **missing code** — a
  framework change, not a free-text escape hatch.
- **Outputs.** The state's reason, where the state requires one.
- **Evidence.** Entries into a required-reason state carry their reason
  (enclosing contract).
- **Failure behavior.** A required-reason state recorded without a reason, or
  with a code not defined for that state, is not a satisfied record.

<!-- /rule: CS-009 -->

- **The completion ladder sits on this axis.** `completion-claimed` and
  `completion-verified` are lifecycle states — the run lifecycle's own ladder,
  with acceptance appended as the decision that gates entry to `closed`, because
  acceptance is a project-level human decision a run cannot make (see
  [Project-Level Completion](#project-level-completion)). There is no separate
  completion-status axis.
- **Acceptance is a decision, not a state.** Entry to `closed` is gated by the
  required, human-owned acceptance decision being **made and recorded — not by
  the decision being positive**: `acceptance-declined` also enters `closed`. The
  decision's outcome rides as `closed`'s reason — `accepted`,
  `acceptance-declined`, or `acceptance-lapsed`, the last recorded by an
  administrator when it is determined that no decision will come (an owner
  departed, a client gone silent); recording the lapse is itself a human act.
  The acceptance decision is an **`[H]` floor act at every consequence level**:
  human-owned, discharged by an interactive human **or** by pre-authorized
  policy (the human deciding ahead of time), **never a delegated agent**, and
  interactive-only at Critical (see
  [Operating Model Spec § Authority](operating-model.md#authority-and-decision-resolution)).
  **An agent can drive `completion-claimed` and `completion-verified`; it can
  never reach `closed` on its own authority.** It MAY execute a
  policy-discharged closure — the normal Lights-Out mechanism — where the
  decision is the policy **author's**, recorded against the policy and its
  author per [Record Requirements](#record-requirements). The altitude this
  floor binds is [CS-012](#cs-012--project-vs-work-product-acceptance-altitude),
  below.
- **Terminals bind the open child graph** (see
  [Terminal Integrity](#terminal-integrity)): entry to `closed` carries a second
  MUST precondition alongside the acceptance decision — the quiescence set is
  dispositioned; entry to `canceled` disposes every open child record by
  cascade, chained to the cancellation's attribution.
- **Closure-stage work happens inside `completion-verified`**, made visible by
  its reason (`awaiting-acceptance` → `closure-in-progress`). Handoff,
  production-ownership transfer, the retrospective, and the close-out summary
  are stage work, not lifecycle states.

<!-- rule: CS-012 -->

### CS-012 — Project vs work-product acceptance altitude

- **Applicability.** Every acceptance decision — project acceptance and bounded
  work-product acceptance.
- **Inputs.** The decision's altitude: the project's delivered scope, or a
  bounded work product within it.
- **Procedure.** The `[H]` acceptance floor binds the **project** acceptance
  decision; bounded **work-product** acceptance (e.g. whether a component design
  is acceptable to build) is a different altitude and MAY be delegated at low
  consequence per the
  [governance floors](operating-model.md#governance-floors-and-capability-ceilings).
  The two rungs differ in kind: `completion-verified` is epistemic — does the
  evidence support the claim, checked against **requirements**; acceptance is an
  authority act — do we take delivery, checked against **intent**.
- **Outputs.** The altitude determination: which floor, if any, binds the
  decision.
- **Evidence.** N/A — the discharged decision's record carries its altitude
  through what it accepts (enclosing contract).
- **Failure behavior.** N/A — a project acceptance delegated as if it were
  work-product acceptance is an unauthorized floor act
  ([Authorized Parties for Floor Decisions](#authorized-parties-for-floor-decisions)).

<!-- /rule: CS-012 -->

**Outputs.** The project's current lifecycle state, its reason where the state
requires one, and any overlays.

**Evidence.** A durable, attributed record for every transition (per
[Record Requirements](#record-requirements)); entries into a required-reason
state carry their reason. Entry to `closed` is discharged at the `[H]` grade
against the [authorized-party roster](#authorized-parties-for-floor-decisions);
`closed`'s reason is the only record of the acceptance outcome — including that
none came. A transition into either terminal, and the acceptance decision, are
**governance-class writes**
([Mode Binding and Discovery](#mode-binding-and-discovery)) — in a bound project
they are never recorded only-locally and never offline-queued.

**Failure behavior.** A write attempting a transition outside the defined set —
including any exit from a terminal — MUST be rejected. A required-reason state
recorded without a reason, or with a code not defined for that state, is not a
satisfied record. A staleness observation never mutates lifecycle state; it
awaits a human record. An entry to `closed` over an undispositioned quiescence
set, or a `canceled` recorded without its cascade, violates
[Terminal Integrity](#terminal-integrity).

---

## Project-Level Completion

Rationale: a completion claim is earned against a contract, never assumed
because agents stopped or tests passed. The contract is evaluated **across** a
project's runs — cross-run by construction — and binds every project at every
tier and autonomy posture; a supervised project with no runs at all still honors
it. This contract is the **canonical definition of project closure**; the
Closure stage's close-out checklist and summary are its rendered view (see
[Artifacts as Views](#artifacts-as-views)).

**Applicability.** Any project or delegated objective claimed complete.

**Inputs.** The approved scope; requirements and success criteria;
batch/increment outcomes; verification, assurance, and deployment results; the
operating envelope; acceptance and authorization decisions.

**Procedure.**

- A project-completion claim MUST NOT be permitted merely because agents
  stopped, tasks were marked complete, tests passed, or deployment succeeded. It
  is permitted only when **all** hold: every approved in-scope requirement has
  an explicit disposition (discharged at the acceptance-criterion grain —
  [CS-097](#cs-097--acceptance-criterion-disposition-set-met--descoped--deferred));
  every success criterion is explicitly accounted for — `met` with evidence,
  measured unmet (`not-met` — an honest finding, not a claim blocker), carried
  by an explicit post-release measurement plan (which lands its outcome status
  when it reports, per
  [Planning-Family Status Sets](#planning-family-status-sets)), or honestly
  retired (`dropped`); required decisions and constraints remain satisfied or
  approved deviations are recorded; all batches and increments have explicit
  outcomes; parallel work is integrated; required whole-system verification and
  assurance pass; deployment and post-deployment verification pass when
  applicable; required operational readiness, handoff, and cleanup are complete;
  known defects, deviations, unresolved risks, and limitations are disclosed;
  the final result remains inside the approved operating envelope; and required
  acceptance and authorization decisions are resolved.
- **Post-deployment verification verifies the deploy.** Its referent is
  production health — and, for an increment deployed dark behind a feature flag,
  the dark behavior. User visibility is a separate fact off this axis (see
  [Deployment Stage § Release Disposition](../stages/deployment/README.md#release-disposition)):
  user-outcome evidence arrives after the flip and is carried by the
  post-release measurement plan. **User visibility does not gate `closed`** — a
  fully implemented, verified, dark-deployed project closes; a pending flip is
  recorded at close-out as a handoff obligation with an owner and a trigger.
- The claim ladder rides the [project lifecycle](#project-lifecycle): completion
  **claimed** and **verified** are the lifecycle states `completion-claimed` and
  `completion-verified`; **acceptance** is the required human-owned recorded
  decision gating entry to `closed` — a decision made and recorded, not
  necessarily positive; **`closed`** is the terminal. These MAY coincide in time
  for a low-risk solo project but remain distinct acts. The claim is
  project-level and evaluated **across** a project's runs; a single run reaching
  `completion-verified` means only **its** authorized objective slice is done
  and verified.

<!-- rule: CS-097 -->

### CS-097 — Acceptance-criterion disposition set (met · descoped · deferred)

- **Applicability.** Every acceptance criterion of every approved in-scope
  requirement, at the completion claim's evaluation; any earlier reconciliation
  that dispositions an acceptance criterion.
- **Inputs.** The `acceptance_criterion_disposition` set (`met` / `descoped` /
  `deferred`) in [`vocabulary/dispositions.yaml`](vocabulary/dispositions.yaml)
  — binds as data (generated view: [reference.md](generated/reference.md)); the
  traceability chain (an acceptance criterion **verifies** its requirement).
- **Procedure.**
  - **Grain.** The enclosing contract's "every approved in-scope requirement has
    an explicit disposition" is discharged at the **acceptance-criterion
    grain**: every acceptance criterion of every approved in-scope requirement
    carries exactly one disposition; a requirement's disposition is derivable
    from its criteria and MUST NOT be recorded as a second source.
  - **The values are decisions, not verdicts.** `met` — the criterion is
    satisfied, with verification evidence. `descoped` — a **governed scope
    decision** removed the criterion from scope, and the record cites that
    decision; a criterion is never retroactively "not in scope" without one.
    `deferred` — the obligation moves to an **explicit future** (an idea-backlog
    entry or carry-forward condition, cited in the record); a deferral promises
    a future, and a criterion with no future MUST NOT hide in it — it is
    descoped, honestly.
  - **Deliberately no `unmet` value.** An in-scope unmet acceptance criterion
    refutes the completion claim (the enclosing contract's verification
    conjunct) rather than resting in a disposition; `met` / `descoped` /
    `deferred` are the three exits from that refutation. Contrast success
    criteria, where measured-unmet (`not-met`) is an honest finding, not a claim
    blocker: outcome risk closes honestly; spec risk blocks the claim. A
    situation no listed value fits is a gap to raise, not a value to invent.
- **Outputs.** A recorded disposition per acceptance criterion; the
  requirement-level disposition as a derived view.
- **Evidence.** The dispositions ride the
  [Completion Evidence Package](delegated-run.md#completion-evidence-package),
  rendered at close-out as the acceptance-criterion table.
- **Failure behavior.** An undispositioned acceptance criterion on an approved
  in-scope requirement blocks the completion claim (the enclosing contract's
  failure behavior).

<!-- /rule: CS-097 -->

**Outputs.** A completion determination on the project lifecycle: claimed →
verified → closed, with the acceptance decision recorded.

**Evidence.** The
[Completion Evidence Package](delegated-run.md#completion-evidence-package).

**Failure behavior.** Any unmet element blocks the completion claim: the project
returns to `active` (identified work exists), and a run that ends without
completing its slice records an
[honest incomplete outcome](delegated-run.md#honest-incomplete-outcomes).

---

## Terminal Integrity

Rationale: the [lifecycle contract](#project-lifecycle) makes the terminals
absorbing and honest about the project's own row; the families under it — runs,
batches, escalations, directives, deviations, carry-forward conditions, decision
records, planning records — each keep their own status. Without a contract over
that child graph at the moment a terminal is recorded, the terminals stop being
honest: `closed` could assert completeness over still-open work, and a canceled
project's children would stay open forever — the trail-off dishonesty the
lifecycle exists to kill.

**Applicability.** Every transition into a project terminal (`closed` /
`canceled`), at every tier, consequence level, autonomy posture, and operating
mode; transitively, every run terminal (the run → directive hop).

**Inputs.** The open child records under the project; the terminal transition
being recorded, with its reason and attribution.

**Procedure.**

- The two terminals make opposite claims, so they bind the child graph in
opposite directions: `closed` asserts completeness — open children falsify the
assertion, so the transition is **refused** until they are dispositioned;
`canceled` asserts abandonment — nobody hand-closes an abandoned project's child
graph, so the transition **disposes** it.
<!-- rule: CS-028 -->

### CS-028 — Quiescence set (closed, direct children)

- **Applicability.** Every transition into project `closed`.
- **Inputs.** The **quiescence set** — `terminal_integrity.quiescence_set` in
  [`vocabulary/statuses.yaml`](vocabulary/statuses.yaml): the closed member set,
  per-family conditions, and the approved-deviation exemption bind as data
  (generated view: [reference.md](generated/reference.md)).
- **Procedure.**
  - Entry to `closed` carries a MUST precondition alongside the acceptance
    decision: the quiescence set is dispositioned.
  - The set names the project's **direct** children once; transitivity carries
    the rest (a terminal run has already dispositioned its directives — see
    [CS-030](#cs-030--cascade-landing-table)), so each family has exactly one
    enforcement point.
  - **Approved deviations are the deliberate exemption:** a deviation records a
    condition the delivery was accepted under; it attaches to the delivered
    result, survives `closed` as part of what was accepted (disclosed per the
    [completion contract](#project-level-completion)), and moves through its own
    lifecycle independently of the project's.
  - The completion contract demands most of this quiescence at **claim** time;
    this precondition binds the same determination to the transition itself —
    closure-stage work happens after the claim, and the completeness assertion
    is recorded over the child graph at entry to `closed`, not at claim time.
    Planning outcome statuses are the other sanctioned post-`closed` motion —
    [CS-029](#cs-029--post-terminal-sanction-set-closed), below.
- **Outputs.** At `closed`, a quiescent child graph under the completeness
  claim.
- **Evidence.** The terminal transition record (enclosing contract).
- **Failure behavior.** An entry to `closed` while the quiescence set holds an
  undispositioned member MUST be rejected — the same rejection class as a
  transition outside the defined set.

<!-- /rule: CS-028 -->

<!-- rule: CS-029 -->

### CS-029 — Post-terminal sanction set (closed)

- **Applicability.** Every status write against a record of a project that has
  entered a terminal.
- **Inputs.** The closed sanction set —
  `terminal_integrity.post_terminal_sanctions` in
  [`vocabulary/statuses.yaml`](vocabulary/statuses.yaml): the sanctioned
  post-`closed` landings (and the empty post-`canceled` set) bind as data
  (generated view: [reference.md](generated/reference.md)).
- **Procedure.** **Post-terminal motion is sanctioned exactly where the
  terminal's assertion deliberately awaits evidence on the world's clock.**
  `closed` asserts completeness of the delivered work while deliberately
  awaiting outcome evidence, so its sanctioned set — closed, and the only
  post-terminal status motion of a planning or child record — is the data's
  post-`closed` landings (see
  [Planning-Family Status Sets](#planning-family-status-sets) for the status
  semantics). `canceled` asserts abandonment, and abandonment awaits nothing —
  no acceptance, disclosure, or completeness claim exists for later evidence to
  falsify: no planning record moves after `canceled`, and post-abandonment
  operational facts belong to the operations record, not the project's.
- **Outputs.** The sanction determination for a proposed post-terminal write.
- **Evidence.** A sanctioned landing chains to the evidence that produced it
  (the post-release measurement plan; the materialization record).
- **Failure behavior.** A post-terminal status write outside the sanctioned set
  MUST be rejected.

<!-- /rule: CS-029 -->

<!-- rule: CS-030 -->

### CS-030 — Cascade landing table

- **Applicability.** Every transition into project `canceled`; transitively,
  every run terminal (the run → directive hop).
- **Inputs.** The cascade landing table — `terminal_integrity.cascade_landing`
  in [`vocabulary/statuses.yaml`](vocabulary/statuses.yaml): each stateful child
  family's parent-caused disposition (resting status + parent-caused reason)
  binds as data, rendered as a generated view in
  [reference.md](generated/reference.md) — the manifest's landing table is that
  view, never a hand-maintained copy.
- **Procedure.**
  - **`canceled` cascades.** Recording `canceled` MUST disposition every open
    child record, transitively down the containment graph — project → run →
    directive, project → batch, and likewise for escalations, approved
    deviations, carry-forward conditions, decision records, and planning
    records. Each family lands in its parent-caused disposition per the data: a
    resting status plus a parent-caused reason code — `project-canceled` at the
    project hop, `run-terminal` at the run hop — so a cascaded ending is never
    conflated with an ending the child's own parties chose.
  - **The run → directive hop is the same cascade one level down.** A run
    reaching any terminal — its own or cascaded — MUST leave no directive
    non-terminal; its non-terminal directives take the directive family's
    parent-caused disposition (see
    [Delegated-Run Spec § Idempotency Substrate](delegated-run.md#idempotency-substrate)).
  - **A cascaded disposition never impersonates a party's own act.** A family
    MAY land cascaded endings on a status it shares with party-initiated endings
    only when its reason vocabulary distinguishes the parent-caused ending; the
    reason code, not the status name, records who ended the child and why.
  - **The cascade preserves realized extent.** A force-dispositioned child
    records what had actually happened when the parent ended — the run model's
    realized-extent rule
    ([Honest Incomplete Outcomes](delegated-run.md#honest-incomplete-outcomes));
    the cascade never erases or inflates it.
  - **One attributed act.** The cancellation is a single attributed governance
    write; every cascaded disposition chains its provenance to that transition
    record ([Record Requirements](#record-requirements)) and is never
    re-attributed to the child's own parties. The cascaded dispositions are part
    of the terminal transition's governance-class write
    ([Mode Binding and Discovery](#mode-binding-and-discovery)).
  - **A partially canceled project is not representable.** The cascade is part
    of the terminal transition, not follow-up work: at any admitted state
    version a reader sees either the project non-terminal with its children as
    they were, or the project terminal with every child dispositioned. In file
    mode the transition and its cascade land as one write-back.
  - **Records, not operations.** The cascade dispositions **governance
    records**; it commands nothing operational. Cancellation does not un-deploy,
    stop a production system, or alter release or flag state — a canceled
    project can leave a live system in production, and changing that system is
    product-altitude work outside this contract. For an in-flight run the
    cascaded terminal withdraws authorization — the record that
    [stop enforcement](operating-model.md#stop-enforcement) acts on; the cascade
    records the end, enforcement effects it.
- **Outputs.** At `canceled`, a fully dispositioned child graph, every cascaded
  record carrying its parent-caused reason.
- **Evidence.** The cascaded disposition records, each chaining provenance to
  the transition (enclosing contract).
- **Failure behavior.** A `canceled` observed with a child still open is an
  incomplete write, not a tolerable intermediate state: the missing cascade
  dispositions MUST be applied, chained to the original transition.

<!-- /rule: CS-030 -->

- **`paused` does not couple.** Pausing a project constrains no child record:
  runs continue under their own authorization, and pausing them is modeled where
  it always was — a `pause-requested` directive per run. The two axes are
  deliberately uncoupled; the non-coupling is designed, not an omission.
- **Stage state rests; bindings persist.** At either terminal, folded-stage
  state and unfolding triggers
  ([Progressive Governance and Folding](#progressive-governance-and-folding))
  are preserved as records as-of the terminal, and no unfolding trigger fires
  after it — nothing remains to govern. A
  [mode binding](#mode-binding-and-discovery) is not deleted by a terminal: the
  binding record persists as a durable pointer (discovery still resolves the
  mode, through which the terminal is readable); what ends is the binding
  **obligation** — unbinding afterward is an administrative act, never required
  for the terminal to be honest.
- **Standing grants and standing configuration are not open work.** The
  Authorization subset's records (authorization records, the effective operating
  envelope, capability coverage, function separations), the
  [authorized-party roster](#authorized-parties-for-floor-decisions), and
  [pre-authorized policies](#pre-authorized-policy-lifecycle) are dispositioned
  by neither terminal — the mode-binding rule, generalized. Their **force** ends
  with the project: a terminal project admits no decision for a policy to clear
  and no work for an authorization to cover; the records persist as history of
  what stood at the end. The cascade does not rewrite them — `revoked` and its
  siblings record a party's decision about the grant itself, and cancellation
  decides nothing about any grant. Post-terminal housekeeping on this class is
  administrative, never required for the terminal to be honest.

**Outputs.** At `closed`, a quiescent child graph under the completeness claim
([CS-028](#cs-028--quiescence-set-closed-direct-children)); at `canceled`, a
fully dispositioned child graph ([CS-030](#cs-030--cascade-landing-table)).

**Evidence.** The terminal transition record plus, for `canceled`, the cascaded
disposition records, each chaining provenance to the transition (per
[Record Requirements](#record-requirements)).

**Failure behavior.** Per the marked contracts above: the `closed` rejection is
[CS-028](#cs-028--quiescence-set-closed-direct-children)'s; the incomplete
cascade is [CS-030](#cs-030--cascade-landing-table)'s; the post-terminal
rejection is [CS-029](#cs-029--post-terminal-sanction-set-closed)'s.

---

## Record-Family Status Vocabularies

Rationale: the stateful families with execution semantics carry their own
lifecycle contracts — the [project](#project-lifecycle), the
[run](delegated-run.md#run-lifecycle), the
[batch](parallel-batch.md#batch-lifecycle), the
[directive](delegated-run.md#idempotency-substrate), the
[carry-forward condition](#minimum-canonical-project-state). The remaining
canonical record families had no normative status model at all, leaving a
conforming implementation to invent vocabularies the framework never ratified —
the precondition the [project-lifecycle](#project-lifecycle) contract was
written to eliminate. This contract closes the class for status-bearing
families: every canonical record family that carries a status or disposition
axis has its set ratified normatively — here, in the family's own contract, or
(for the acceptance-criterion closure disposition) in
[CS-097](#cs-097--acceptance-criterion-disposition-set-met--descoped--deferred).
Families whose records are immutable facts (evidence items, run events, and
their kin) carry no status axis, deliberately.

**Applicability.** Escalations; approved deviations; decision records (gate and
checkpoint decisions; architecture decision records); pre-authorized policies;
the planning families (goals, success criteria, requirements, assumptions,
risks).

**Inputs.** Recorded status changes and their reasons; for cascaded
dispositions, the parent terminal per [Terminal Integrity](#terminal-integrity).

**Procedure.**

- **Status sets are normative and closed** — the lifecycle discipline applied to
  every family: a situation no status fits is a **missing status**, a framework
  change, never a free-text escape hatch; free prose belongs in a detail field.
  Where a status requires a reason, the reason codes are a closed set too.
- **Resting statuses are absorbing at the record** — the partition rule,
  [CS-058](#cs-058--standingresting-partition-over-planning-statuses), below.
- **Parent-caused endings ride [Terminal Integrity](#terminal-integrity):** the
  cascade lands each family in its resting status with the parent-caused reason,
  never impersonating a party's own act
  ([CS-030](#cs-030--cascade-landing-table)).

### Escalation Lifecycle

An escalation is the canonical record of an unresolved decision routed to
authority
([Operating Model Spec § Authority](operating-model.md#authority-and-decision-resolution)):
the affected action stops, the unresolved decision and its evidence are
recorded, the target authority is identified, state is preserved.

<!-- rule: CS-044 -->

#### CS-044 — Escalation lifecycle machine and closed withdrawn-reason set

- **Applicability.** Every escalation record.
- **Inputs.** The `escalation_lifecycle` machine and its withdrawn-reason set in
  [`vocabulary/statuses.yaml`](vocabulary/statuses.yaml) /
  [`vocabulary/reasons.yaml`](vocabulary/reasons.yaml) — states, edges,
  terminals, and the closed reason set bind as data (generated view:
  [reference.md](generated/reference.md)).
- **Procedure.**
  - **`open`** — awaiting the target authority. The escalation is not itself a
    resolution; it waits for one.
  - **`resolved`** — the routed decision was made and recorded; the escalation
    links its resolution. Carries no reason — the resolution record is the
    content.
  - **`withdrawn`** — ended without a resolution: `raiser-withdrawn` (the
    raising party no longer needs the decision) · `obsolete` (the triggering
    condition resolved itself — obsolescence is a reason, not a fifth state) ·
    `project-canceled` (the cascade). The reason code records who ended it; the
    status name is shared honestly because the reason disambiguates.
  - **`lapsed`** — the determination that no decision will come (the
    `acceptance-lapsed` device, ported). Recording the lapse is a human act —
    interactive, or pre-authorized policy as the policy author's act — never a
    bare timeout. The decision-overdue path
    ([DR-022](delegated-run.md#dr-022--decision-overdue-escalates-and-never-changes-run-state))
    is a producer: a pre-authorized auto-abandon past the longer bound records
    the run's `decision-lapsed` ending and the escalation's `lapsed` as the same
    determination.
  - Terminals are absorbing: a resolved, withdrawn, or lapsed escalation is
    never reopened — a recurring need is a new escalation chaining provenance to
    the old one.
- **Outputs.** The escalation's current status and, on `withdrawn`, its reason.
- **Evidence.** As the enclosing contract — a durable, attributed record per
  status change.
- **Failure behavior.** As the enclosing contract — a status or reason outside
  the defined sets is not a satisfied record.

<!-- /rule: CS-044 -->

### Deviation Lifecycle

An approved deviation records a condition the work proceeds under — a governance
requirement waived or altered, attributed to its approver. The grant is
revisitable by construction:
[Controlled Replanning](delegated-run.md#controlled-replanning) holds that
completed work MUST NOT remain implicitly accepted when its supporting
assumptions have materially changed, and a deviation is exactly such an
acceptance.

<!-- rule: CS-045 -->

#### CS-045 — Deviation lifecycle machine and closed revoked-reason set

- **Applicability.** Every approved-deviation record.
- **Inputs.** The `deviation_lifecycle` machine and its revoked-reason set in
  [`vocabulary/statuses.yaml`](vocabulary/statuses.yaml) /
  [`vocabulary/reasons.yaml`](vocabulary/reasons.yaml) — states, edges,
  terminals, and the closed reason set bind as data (generated view:
  [reference.md](generated/reference.md)).
- **Procedure.**
  - **`active`** — the grant holds.
  - **`expired`** — the grant's **optional granted-until bound** passed. Expiry
    is mechanical: the bound was the approver's decision, recorded at grant
    time, so no new decision attends its arrival. Carries no reason. The bound
    stays optional — a mandatory bound on every deviation invites ritual dates,
    not governance.
  - **`revoked`** — an attributed governance write ending the grant before any
    bound: `assumptions-changed` (the condition it was granted against no longer
    holds) · `superseded` (replaced by a new grant chaining provenance) ·
    `project-canceled` (the cascade).
  - **Work MUST NOT rely on an expired or revoked deviation.** Continued need is
    a new deviation request, decided on current facts — never a quiet extension
    of the dead grant.
  - **A deviation survives project `closed`** — the deliberate exemption in
    [Terminal Integrity](#terminal-integrity)'s quiescence set: it attaches to
    the delivered result as part of what was accepted, disclosed per the
    [completion contract](#project-level-completion), and moves through this
    lifecycle on its own clock afterward. On project `canceled` it is cascaded
    to `revoked` with reason `project-canceled`.
  - Terminals are absorbing: re-granting is a new record chaining provenance,
    never a reactivation.
- **Outputs.** The deviation's current status and, on `revoked`, its reason.
- **Evidence.** As the enclosing contract — a durable, attributed record per
  status change.
- **Failure behavior.** As the enclosing contract — a status or reason outside
  the defined sets is not a satisfied record.

<!-- /rule: CS-045 -->

### Decision Lifecycle

Two decision kinds share one correction discipline — the carry-forward re-owning
rule ([Minimum Canonical Project State](#minimum-canonical-project-state)),
applied to the records where it was implied but never stated:

- **Decision records are append-only.** A re-decision or correction supersedes
  the prior record with a successor chaining provenance
  ([Record Requirements](#record-requirements)) — never a mutation. Exactly one
  **live** decision exists per subject — per gate or checkpoint for
  gate/checkpoint decisions, per decision key for architecture decision records
  — and "current" is **derived from the chain, never stored beside it**. The
  superseding record's rationale is the content; no reason vocabulary attends
  supersession (the escalation `resolved` device).
- **Gate and checkpoint decisions carry no status axis.** The record carries its
outcome, rationale, and attribution; superseded-ness is structural (the chain),
and a status column beside the chain would be a second source for the same fact.
An **unmade** decision is not an open decision record — it is an
[escalation](#escalation-lifecycle), already covered.
<!-- rule: CS-050 -->

#### CS-050 — ADR status machine (closed statuses, no required reasons)

- **Applicability.** Every architecture decision record.
- **Inputs.** The `adr_lifecycle` machine in
  [`vocabulary/statuses.yaml`](vocabulary/statuses.yaml) — the closed status
  set, edges, and terminals bind as data (generated view:
  [reference.md](generated/reference.md)).
- **Procedure.**
  - **`rejected` and `withdrawn` are different stories** (the `resolved` /
    `raiser-withdrawn` distinction, ported): `rejected` — the deciding authority
    decided against the proposal; `withdrawn` — retracted before a decision, the
    retraction attributed on the record: the author's own act, a collaborator's
    superseding successor, or the cancellation cascade. A durable record store
    cannot delete a pulled draft, and without `withdrawn` it would have to lie
    as `rejected`.
  - **`deprecated` and `superseded` are different endings for an accepted
    decision:** `deprecated` — still on the record, now discouraged, no specific
    successor; `superseded` — replaced, and the chain names the successor.
  - `proposed` is the open status; `accepted` is a standing posture that may
    later move to `deprecated` or `superseded`; the other four are resting.
    Statuses carry no required reason — rationale rides the record.
  - **`proposed` asserts decision-readiness.** Drafting precedes the record: an
    ADR enters the record when it is ready for the authority's act — the same
    kind of attributed claim as `completion-claimed` — and a working draft
    belongs outside the record (a document, branch, or review), never parked in
    `proposed`.
  - **Correcting a still-`proposed` ADR is a supersession** — a successor record
    chaining provenance, the predecessor resting `withdrawn` with the retraction
    attributed on the record. Left `proposed`, the dead draft would promise a
    decision no one will make — a record resting in an open status forever is
    the trail-off this vocabulary exists to kill.
  - **Cascade landing:** the [Terminal Integrity](#terminal-integrity) cascade
    lands an open (`proposed`) ADR at `withdrawn`, the parent-caused reason
    riding the cascade record (the planning-family device). Gate and checkpoint
    decisions need no landing — a made decision is a fact, and the unmade one is
    its escalation. ADRs do not join the `closed` quiescence set: the
    [completion contract](#project-level-completion)'s resolved-decisions
    element already covers the honest case.
- **Outputs.** The ADR's current status.
- **Evidence.** As the enclosing contract — the supersession chain carries the
  history.
- **Failure behavior.** As the enclosing contract — a status outside the defined
  set, or a mutation of a resting record, is not a satisfied record.

<!-- /rule: CS-050 -->

### Pre-Authorized Policy Lifecycle

A pre-authorized policy is a human-authored, discretion-free rule discharging a
floor decision as its author's act
([Operating Model Spec § Authority](operating-model.md#authority-and-decision-resolution));
its validity is bound to the author's roster presence by the temporal-validity
rule in
[Authorized Parties for Floor Decisions](#authorized-parties-for-floor-decisions).
This is that rule's record-level statement — the status set the behavior already
implies.

<!-- rule: CS-054 -->

#### CS-054 — Pre-authorized policy lifecycle machine

- **Applicability.** Every pre-authorized policy record.
- **Inputs.** The `policy_lifecycle` machine in
  [`vocabulary/statuses.yaml`](vocabulary/statuses.yaml) — the closed status
  set, edges, and terminals bind as data (generated view:
  [reference.md](generated/reference.md)).
- **Procedure.**
  - **`active`** — the rule may discharge decisions in its class, its author
    roster-current.
  - **`orphaned`** — the author left the roster. The policy is unusable from the
    removal forward — each affected gate falls back to interactive resolution —
    and its history stands: every decision it discharged while valid remains
    attributed to it. The removal act identifies the policies it orphans (the
    existing rule, unchanged).
  - **`superseded`** — an `active` policy replaced by a new policy chaining
    provenance. Re-owning a departed author's policy reuses the same mechanism —
    a **new** policy authored by the adopting roster member, chaining provenance
    to the orphaned one — but the predecessor rests `orphaned`, not
    `superseded`: only an `active` policy lands here, and accountability never
    transfers mechanically.
  - **`revoked`** — an attributed governance write ending the rule with no
    replacement. Carries no reason set — the revocation is itself the recorded
    act, and rationale rides the record (the decision-record device).
  - Terminals are absorbing: a returning author re-grants with a new policy
    chaining provenance, never by reactivating the orphaned one.
  - Project terminals do not disposition policies — a policy is a standing
    grant, outside the cascade (see [Terminal Integrity](#terminal-integrity)).
- **Outputs.** The policy's current status.
- **Evidence.** As the enclosing contract — a durable, attributed record per
  status change.
- **Failure behavior.** As the enclosing contract — a status outside the defined
  set, or a discharge by a non-`active` policy, is not a satisfied record.

<!-- /rule: CS-054 -->

### Planning-Family Status Sets

The planning families carry statuses, not transition machines: what each set
must distinguish is an honest resting place for every way the record's story can
end — including the ways nobody plans for.

<!-- rule: CS-055 -->

#### CS-055 — Planning-family closed status sets

- **Applicability.** Every goal, success criterion, requirement, assumption, and
  risk record.
- **Inputs.** The `planning_families` status sets in
  [`vocabulary/statuses.yaml`](vocabulary/statuses.yaml) — the closed per-family
  sets bind as data (generated view: [reference.md](generated/reference.md)).
- **Procedure.**
  - **A success criterion can be honestly retired.** `dropped` is the resting
    status for a criterion that will not be pursued; `revised` and `deferred`
    both promise a future, and a criterion with no future MUST NOT hide in
    either.
  - **Delivered-but-unmet has a word.** `not-achieved` (goal) and `not-met`
    (success criterion) are the resting statuses for an outcome pursued to
    delivery and measured unmet — typically by the post-release measurement plan
    the [completion contract](#project-level-completion) carries. They differ in
    kind from `dropped`: `dropped` records a decision not to pursue;
    `not-achieved` and `not-met` record a measured result. A goal whose project
    delivered and whose measurement came back negative MUST NOT hide in `active`
    (a promise nobody will keep), in `dropped` (a retirement that never
    happened), or in any status that promises a future. A failed outcome is a
    finding, not a defect in the record — the honest word is what makes the
    learning citable.
  - **A risk that materializes has a word.** `realized` records the outcome —
    the risk happened — distinct from `closed` (the threat ended without
    materializing) and from `mitigated`/`accepted` (standing postures).
    Collapsing a realized risk into `closed` destroys the outcome distinction
    the project terminals preserve. The reason-and-detail record suffices; a
    linked consequence record is product altitude, not required here. Prior
    posture is preserved by history-walking, not new vocabulary:
    `open → mitigated → realized` keeps mitigated-but-happened-anyway
    distinguishable one hop back in the chain. Risk `closed` is the resting
    case: it asserts the threat ended without materializing — a completed
    determination awaiting nothing. Before the project terminal, a wrong call is
    corrected by supersession (the resting-status rule); after project `closed`,
    a materialization of a `closed` risk is an operations-record fact — no
    status write, and no new planning record, lands in a closed project's state.
  - **Risks are dispositioned at close, not merely disclosed.** At entry to
    project `closed`, no risk rests `open`
    ([CS-028](#cs-028--quiescence-set-closed-direct-children)): each is
    `mitigated`, `accepted`, `realized`, or `closed` — an explicit resting
    posture someone answers for, recorded under
    [Record Requirements](#record-requirements).
  - **Planning-family statuses carry no required reason.** The cascade is the
    exception in effect, not in form: a cascaded landing carries the
    parent-caused reason on the cascade record, and lands each family in its
    retirement status per the
    [cascade landing table](#cs-030--cascade-landing-table)'s data.
  - **Outcome statuses may resolve after project `closed`** — the sanctioned
    post-`closed` motions are
    [CS-029](#cs-029--post-terminal-sanction-set-closed)'s closed set; after
    `canceled`, no planning record moves.
- **Outputs.** Each record's current status.
- **Evidence.** As the enclosing contract — a durable, attributed record per
  status change.
- **Failure behavior.** As the enclosing contract — a status outside the
  family's defined set is not a satisfied record.

<!-- /rule: CS-055 -->

<!-- rule: CS-058 -->

#### CS-058 — Standing/resting partition over planning statuses

- **Applicability.** Every planning-family status write, before and after the
  project's terminals.
- **Inputs.** The `standing_resting_partition` in
  [`vocabulary/statuses.yaml`](vocabulary/statuses.yaml) — the ratified
  partitions (risk, assumption) bind as data; each partition exactly covers its
  family's status set.
- **Procedure.**
  - **Statuses split into standing postures and resting statuses.** A **standing
    posture** awaits the world's evidence; a **resting status** is absorbing at
    the record.
  - **Resting statuses are absorbing at the record.** Reversing one is a
    supersession — a successor record chaining provenance to the original —
    never a mutation of the resting record (the carry-forward re-owning device,
    generalized).
  - For assumptions, only `open` is standing — `validated` · `invalidated` ·
    `retired` all rest, which is why a post-`closed` invalidation of a validated
    assumption is not a sanctioned landing: it would be motion out of a resting
    status, which the terminal's assertion never awaited.
  - The remaining families' partitions are not ratified; the closed sanction set
    ([CS-029](#cs-029--post-terminal-sanction-set-closed)) answers the
    post-terminal question for them.
- **Outputs.** The standing-or-resting determination for a status.
- **Evidence.** N/A — the partition is consumed by supersession discipline and
  the post-terminal sanction rule.
- **Failure behavior.** A status write that mutates a resting record instead of
  superseding it forks the record's history and MUST be rejected.

<!-- /rule: CS-058 -->

**Outputs.** Each record's current status, with its reason where the status
requires one.

**Evidence.** A durable, attributed record per status change
([Record Requirements](#record-requirements)); cascaded dispositions chain
provenance per [Terminal Integrity](#terminal-integrity).

**Failure behavior.** A status outside the family's defined set — or a
required-reason status without a reason, or with a code not defined for it — is
not a satisfied record. Mutation of a resting record is rejected per
[CS-058](#cs-058--standingresting-partition-over-planning-statuses).

---

## Artifacts as Views

Rationale: progressive-governance detail (Artifacts as Views); dev/ops split
(close-out as a rendered view).

**Applicability.** Every brief, checklist, gate package, completion package,
status report, and compliance export.

**Inputs.** The [canonical project state](#minimum-canonical-project-state).

**Procedure.**

- Briefs, checklists, gate packages, completion packages, status reports, and
  compliance exports MUST be treated as rendered **views** over the canonical
  state, not as independent sources of truth.
- The Closure stage's close-out **Summary** MUST be the human-cadence rendered
  view of the
  [Completion Evidence Package](delegated-run.md#completion-evidence-package) —
  not a second definition. The completion **contract** is canonical in this spec
  ([Project-Level Completion](#project-level-completion)); the close-out renders
  it.
- A supporting tool MAY generate or synchronize Markdown views without making
  each document a separate source of truth.

**Outputs.** Rendered documents traceable to the canonical state.

**Evidence.** Each view records the state version it was rendered from.

**Failure behavior.** A document maintained independently of the canonical state
is a drift source; the canonical state remains authoritative and the document
MUST be re-derived from it.

---

## Markdown Self-Sufficiency

Rationale: progressive-governance detail (D8 self-sufficiency). This is the
clause that keeps the framework operable in rendered-snapshot mode and the North
Star true.

**Applicability.** The whole v0.49 normative layer. At **authoring time** it
binds the framework and the spec authors (meta-conformance): every required
state element and normative operation must remain expressible as Markdown — not
every tool. At **runtime** it binds **file mode** only; platform mode owes the
export obligation instead (both modes defined in the Procedure below).

**Inputs.** The minimum canonical project state; every normative rule, required
state element, procedure, and evidence artifact in v0.49.

**Procedure.**

- Canonical state operates in exactly one of **two first-class operating modes**
  at a time; the modes are exclusive per project:
  - **File mode** — the Markdown rendering **is** the canonical state, held as
    durable files meeting [Record Requirements](#record-requirements) (in
    practice, version control; the mechanism is an implementation choice).
    Self-sufficiency binds in full at runtime. File mode is the default, and the
    fallback whenever no binding record (see
    [Mode Binding and Discovery](#mode-binding-and-discovery)) declares
    otherwise.
  - **Platform mode** — a conforming tool holds canonical state in its own
    structured store; Markdown artifacts are rendered
    [views](#artifacts-as-views), never a second source. Self-sufficiency binds
    platform mode at authoring time only: every contract remains _expressible_
    as Markdown (so file mode stays possible for whoever wants it), but the tool
    is NOT required to operate through Markdown at runtime.
- Platform mode owes portability through **complete, neutral, exercised
  export**, not files-as-source-of-truth:
  - **Complete** — the export covers the full governance state (the
    [Minimum Canonical Project State](#minimum-canonical-project-state)), not
    artifacts alone.
  - **Neutral** — usable by a consumer other than the producing tool. The bar is
    **round-trip (ratified v0.58)**: the export MUST be re-ingestable by another
    conforming tool, not merely inspectable for audit. Round-trip rides
    structure the substrate already requires — stable record identities,
    explicit supersession chains, and the as-of state version on the export —
    and the platform→file exit path in
    [Mode Binding and Discovery](#mode-binding-and-discovery) depends on it. The
    export carries the **full append-only event record**, corrections preserved,
    not only the minimum event set — a partial event history would make
    re-ingestion lossy (see the event record's
    [scope discipline](delegated-run.md#observable-run-event-model)).
    **`[Reserved]`** The field-level export enumeration is resolved with the
    machine-facing interface layer.
  - **Exercised** — a never-run export path rots; the protection is an export
    that is actually run and verified, not a clause.
- The minimum canonical project state MUST have a complete, lossless Markdown
  rendering. No required state element may be expressible **only** through live
  structured access.
- Every normative operation over run state MUST be expressible as a read plus an
  attributable, reconcilable write over that rendering.
- No v0.49 normative rule, required state element, procedure, or evidence
  artifact may be expressible only through live structured access.

**Outputs.** A self-sufficient Markdown rendering of the canonical state.

**Evidence.** The rendering itself, with freshness/version marking (see the
[rendered-snapshot fidelity floor](delegated-run.md#project-state-access)).

**Failure behavior.** The authoring-time-defect rule —
[CS-071](#cs-071--live-only-element-is-an-authoring-time-defect), below.

<!-- rule: CS-071 -->

### CS-071 — Live-only element is an authoring-time defect

- **Applicability.** Every normative rule, required state element, procedure,
  and evidence artifact in the normative layer (meta-conformance — it binds the
  framework and spec authors).
- **Inputs.** The normative layer's elements; their Markdown expressibility.
- **Procedure.** A normative element expressible only through live structured
  access is an authoring-time defect and MUST be corrected; it does not narrow a
  specific run's envelope (it would silently break Markdown operability for all
  snapshot runs). A specific deployment with no Markdown path simply lacks the
  snapshot mode — the coverage-narrows-the-envelope rule supplies that
  consequence, and this self-sufficiency rule is **not** a per-implementation
  feature mandate.
- **Outputs.** The corrected, Markdown-expressible element.
- **Evidence.** N/A — meta-conformance; the correction is its own record.
- **Failure behavior.** N/A — this rule is itself the enclosing contract's
  failure path.

<!-- /rule: CS-071 -->

---

## Mode Binding and Discovery

Rationale: a mode nobody can detect is not a mode. File mode is the correct
default and fallback; the binding record is the explicit, discoverable state
that overrides it.

**Applicability.** Every project operating in platform mode, and every agent's
session-start orientation (the mode determination precedes any other read of
project state).

**Inputs.** The workspace; the binding record, if present.

**Procedure.**

- A platform-mode project MUST carry a committed **binding record** in the
  workspace: a durable pointer declaring at minimum the operating mode, the
  platform identity, the project identity, and the pinned framework version. The
  record is a _pointer to_ the canonical state, not part of it; it is committed
  so it survives re-clones. It is **provisioned** by the platform at project
  creation or workspace attachment, never improvised by an agent. The ratified
  minimum field set (v0.58): operating mode; platform identity (stable id + base
  URL); project identity (platform project id + slug); workspace identity
  (repository + the workspace's declared role); pinned framework version; the
  binding record's own schema version; provisioning timestamp; and a
  **platform-derived verification token** over the identity fields, keyed by a
  platform secret. The token is what makes "provisioned, never improvised"
  enforceable: the platform can verify any presented record was platform-issued,
  and an agent cannot mint one. A platform MAY extend the set. Binding records
  are **per-workspace pointers, N:1 onto a project** — several workspaces may
  bind the same project, each with its own record.
- **Discovery.** At session start an agent MUST check for the binding record
  before treating local Markdown as canonical. Record found → the project
  operates in platform mode, and local Markdown artifacts are
  [views](#artifacts-as-views). Record absent → file mode.
- **Precedence.** The binding record, not transport presence, determines the
  mode. A reachable platform (e.g., a connected MCP server) without a binding
  record proves **capability**, not **binding**; an unreachable platform with a
  binding record does not return the project to file mode.
- **Default-closed degraded mode.** Bound but unreachable: **governance writes**
  MUST NOT be recorded only-locally; the agent escalates instead (the same
  default-closed discipline as
  [Operating Model Spec § Stop Enforcement](operating-model.md#stop-enforcement)).
  There is never a second source of truth. Which writes are governance-class is
  [CS-075](#cs-075--write-classes-governance-class-iff-class-carried-per-write),
  below.

<!-- rule: CS-075 -->

### CS-075 — Write classes (governance-class iff; class carried per write)

- **Applicability.** Every canonical-state write, in every operating mode.
- **Inputs.** The two-valued `write_class` set (`governance` / `non-governance`)
  in [`vocabulary/grades.yaml`](vocabulary/grades.yaml) — binds as data.
- **Procedure.** **A write is governance-class iff** it discharges or reverses a
  `[J]`-or-above item; records or changes a gate or checkpoint decision; records
  a [project-lifecycle](#project-lifecycle) transition into a terminal (`closed`
  / `canceled`) or the acceptance decision; changes the Authorization subset,
  operating envelope, governance profile, authorized-party roster, or operating
  mode; or records a risk acceptance or accepted limitation. All other writes
  are non-governance by default, and the write class is carried explicitly on
  every write.
- **Outputs.** Each write's class, carried on the write.
- **Evidence.** The class on the write record (enclosing contract).
- **Failure behavior.** A write whose class cannot be established MUST be
  treated as governance-class (default-closed — the enclosing contract's offline
  rule).

<!-- /rule: CS-075 -->

- **Offline non-governance work: queue-and-reconcile (ratified v0.58).** While
  bound-but-unreachable, non-governance writes MAY queue locally and reconcile
  on reconnect, under all of the following: each queued write carries a stable
  id, its (non-governance) write class, its full attribution record, and the
  state version it was prepared against; the claimed-evaluation timestamp is set
  at evaluation and the platform-receipt timestamp at reconciliation — the
  offline gap stays visible in the record; on reconnect the queue submits
  through the ordinary
  [write-admission rule](delegated-run.md#idempotency-substrate) (idempotent
  replay by stable id; version-conditional admission; rejects re-evaluated,
  never silently merged), and the reconciliation outcome is recorded. The queue
  is client-held; the platform never holds a second source of truth. A write
  whose class cannot be established offline MUST be treated as governance-class
  (default-closed).
- **Mode switching (ratified v0.58).** A mode transition in either direction is
  itself a **recorded governance decision** — it changes where truth lives.
  **File → platform adoption:** the workspace files are the source of truth at
  adoption — they are canonical in file mode; any pre-existing structured
  metadata is a hint, never the winner. Ingest MUST carry provenance on every
  ingested record (source repository, path, and revision); attribution on
  ingested history is bounded at client-claimed
  ([Record Requirements](#record-requirements)), with claimed timestamps taken
  from the sources and receipt timestamps set at ingest; source facts that
  cannot be resolved are recorded as **explicit ingest gaps**, never silently
  dropped. Adoption is complete only when the binding record is provisioned and
  local Markdown is demoted to [views](#artifacts-as-views). **Platform → file
  exit:** a complete export at the round-trip bar
  ([Markdown Self-Sufficiency](#markdown-self-sufficiency)), then unbind.

**Outputs.** The project's operating mode, determined from the binding record or
its absence.

**Evidence.** The binding record; the session's recorded mode determination.

**Failure behavior.** An agent that writes governance state only-locally in a
bound project has forked the source of truth: the platform record remains
authoritative, the local write is not a discharge of anything, and it MUST be
reconciled or discarded.

---

## Record Requirements

Rationale: progressive-governance detail (Artifact Requirements).

**Applicability.** All project records.

**Inputs.** The facts, decisions, evidence, and outcomes produced across the
project.

**Procedure.**

<!-- rule: CS-079 -->

### CS-079 — Record requirements (implementation-neutral record-property list)

- **Applicability.** All project records.
- **Inputs.** The `record_requirements` property list in
  [`vocabulary/grades.yaml`](vocabulary/grades.yaml) — the closed property list
  binds as data (generated view: [reference.md](generated/reference.md)).
- **Procedure.**
  - The framework MUST define implementation-neutral requirements for project
    records — the data's property list: durability through appropriate
    immutability or correction history.
  - Specific storage, synchronization, and agent-access mechanisms are
    implementation choices; the Markdown MUST still specify the required record
    semantics and access properties sufficiently for an agent to operate them.
- **Outputs.** Records meeting the required semantics.
- **Evidence.** Provenance, attribution, and correction history attached to each
  record.
- **Failure behavior.** A record lacking a required property (e.g. no
  provenance, no correction history) caps the assurance or audit level its
  evidence can support (see
  [Operating Model Spec § Function Separation](operating-model.md#function-separation),
  evidence row).

<!-- /rule: CS-079 -->

<!-- rule: CS-080 -->

### CS-080 — Smallest-sufficient record set (anti-bloat)

- **Applicability.** Every project's record set and rendered artifacts.
- **Inputs.** The facts, decisions, relationships, evidence, deviations, and
  outcomes the project produces.
- **Procedure.** The target is the **smallest sufficient set** of facts,
  decisions, relationships, evidence, deviations, and outcomes. Automation MUST
  NOT justify generating every full document; formal artifacts are rendered when
  their audience or governance profile requires them.
- **Outputs.** The smallest sufficient record set.
- **Evidence.** N/A — the discipline shows in what is not generated.
- **Failure behavior.** N/A — no failure path is defined; over-generation is a
  quality defect, not a conformance violation.

<!-- /rule: CS-080 -->

<!-- rule: CS-082 -->

### CS-082 — Judgment-tier attribution with two timestamps

- **Applicability.** Any item whose checklist marker or governance profile
  places it at the judgment tier (`[J]`) or above.
- **Inputs.** The item's tier; the discharging actor; the claimed evaluation and
  platform receipt times.
- **Procedure.** The record MUST capture _who or what discharged it_ at the
  grade the item's accountability demands, plus **two timestamps (ratified
  v0.58)** — the claimed evaluation time and the platform receipt time (in file
  mode, the receipt time is the moment the write lands in the durable store — in
  practice, the commit timestamp); ordering never derives from either (the
  [state version](#minimum-canonical-project-state) orders writes). Below that
  tier (mechanical, unmarked items) recording is OPTIONAL but RECOMMENDED — it
  is near-free under agent execution. The timestamps are always recorded.
- **Outputs.** The attributed, twice-timestamped discharge record.
- **Evidence.** The record itself (enclosing contract).
- **Failure behavior.** A `[J]`-or-above act recorded without its required
  attribution or timestamps is not a satisfied record and caps the assurance
  level (enclosing contract's failure rule).

<!-- /rule: CS-082 -->

<!-- rule: CS-083 -->

### CS-083 — Two identity grades (qualification / party)

- **Applicability.** Every attributed `[J]`-or-above act.
- **Inputs.** The `identity_grade` set (`j-qualification` / `h-party`) in
  [`vocabulary/grades.yaml`](vocabulary/grades.yaml) — binds as data.
- **Procedure.** **Two identity grades**, each the _minimum that suffices_, not
  a cap on what is recorded:
  - **`[J]` — qualification-identity.** The evaluator's _kind_: for an agent,
    vendor / model / version; for a human, name + role. A type suffices, because
    a judgment item asks only that a qualified evaluator confirmed it.
  - **`[H]` — party-identity.** A _unique authorized party_: for a human, name
    - a stable identifier; for an `[H]`·policy clearance, the policy's
      **author** (the accountable party) together with the evaluating agent's
      qualification-identity and the required timestamps. A type never suffices
      at the floor — it cannot answer for an outcome. _Which_ parties are
      authorized is the
      [Authorized Parties for Floor Decisions](#authorized-parties-for-floor-decisions)
      contract.
- **Outputs.** The act's identity grade and the identity recorded at it.
- **Evidence.** The record itself (enclosing contract).
- **Failure behavior.** An act recorded below the grade its accountability
  demands is not a satisfied record and caps the level (enclosing contract's
  failure rule).

<!-- /rule: CS-083 -->

<!-- rule: CS-084 -->

### CS-084 — Evidence-independence grade

- **Applicability.** Every `[J]`-or-above discharge.
- **Inputs.** The `independence_grade` set (`self-asserted` /
  `context-independent` / `organizationally-independent`) in
  [`vocabulary/grades.yaml`](vocabulary/grades.yaml) — binds as data.
- **Procedure.** The record MUST capture how the evaluation stood **relative to
  the producing context**, reusing the
  [independence axes](operating-model.md#evaluator-independence) — no new
  vocabulary: **self-asserted** (the producing context) ·
  **context-independent** (the evaluator does not inherit the producing context)
  · **organizationally-independent** (an organizationally or externally
  independent evaluator).
- **Outputs.** The act's recorded evidence-independence grade.
- **Evidence.** The record itself (enclosing contract).
- **Failure behavior.** An absent grade on a `[J]`-or-above act caps the record
  ([CS-086](#cs-086--self-asserted-floor-discharge-rule-grade-capping)).

<!-- /rule: CS-084 -->

<!-- rule: CS-085 -->

### CS-085 — Attribution-source grade (platform-verified / client-claimed)

- **Applicability.** Every attributed `[J]`-or-above act (ratified v0.58).
- **Inputs.** The `attribution_source` set (`platform-verified` /
  `client-claimed`) in [`vocabulary/grades.yaml`](vocabulary/grades.yaml) —
  binds as data.
- **Procedure.** The record MUST capture how the identity was established:
  **platform-verified** (the recording platform authenticated the acting
  identity) or **client-claimed** (self-reported by the acting client —
  including an agent's vendor / model / version, which a platform cannot
  verify). An identity claim is bounded by the verification achieved — the
  record MUST NOT present a client-claimed identity as verified, the same
  discipline as
  [Operating Model Spec § Evaluator Independence](operating-model.md#evaluator-independence)
  (claims MUST NOT exceed what was achieved).
- **Outputs.** The act's recorded attribution-source grade.
- **Evidence.** The record itself (enclosing contract).
- **Failure behavior.** A client-claimed identity presented as verified is an
  unsupported claim; the record caps at what was achieved.

<!-- /rule: CS-085 -->

<!-- rule: CS-086 -->

### CS-086 — Self-asserted floor-discharge rule (grade-capping)

- **Applicability.** Every `[J]`-or-above floor item; every recorded or absent
  independence grade.
- **Inputs.** The act's recorded grades
  ([CS-083](#cs-083--two-identity-grades-qualification--party),
  [CS-084](#cs-084--evidence-independence-grade),
  [CS-085](#cs-085--attribution-source-grade-platform-verified--client-claimed)).
- **Procedure.** A `[J]`-or-above **floor item discharged self-asserted is not a
  cleared floor**: it supports mechanical conformance only — the record-level
  form of
  [Operating Model Spec § Function Separation](operating-model.md#function-separation)
  row 1. Identity answers _who_; the
  [authorized-party roster](#authorized-parties-for-floor-decisions) answers
  _whether authorized_; this grade answers _how independently evaluated_ — the
  third leg. A recorded self-asserted grade is not a defect (it is the honest
  solo default at `[J]` below the consequence floor); an **absent** grade on a
  `[J]`-or-above act caps the record the same way a missing identity grade does.
  **Recording granularity (ratified v0.58):** the grade is recorded **per
  discharging act — per checklist item**. A gate or checkpoint decision is
  itself an attributable act carrying its own grade; per-decision granularity is
  a derived, coarser view (the minimum grade across the acts it aggregates),
  never the stored grain — coarser storage would be lossy and unrecoverable, and
  finer recording is near-free under agent execution.
- **Outputs.** The floor-clearance determination for the act.
- **Evidence.** The per-act grades (enclosing contract).
- **Failure behavior.** N/A — the cap is the rule's own consequence; the
  uncleared floor routes as an unresolved authorization decision where a floor
  demanded more.

<!-- /rule: CS-086 -->

- The framework states the **grades required + the timestamps**; the platform
  owns the field schema (names, storage, binding to accounts). An agent MUST be
  able to read and satisfy the grade requirement from Markdown alone.

**Outputs.** Records meeting the required semantics.

**Evidence.** Provenance, attribution, and correction history attached to each
record.

**Failure behavior.** Per the marked contracts above: missing properties cap per
[CS-079](#cs-079--record-requirements-implementation-neutral-record-property-list);
missing grades or timestamps cap per
[CS-082](#cs-082--judgment-tier-attribution-with-two-timestamps) –
[CS-086](#cs-086--self-asserted-floor-discharge-rule-grade-capping).

---

## Authorized Parties for Floor Decisions

Rationale: progressive-governance detail (the authorization half of the
non-delegable floor; see
[Operating Model Spec § Authority](operating-model.md#authority-and-decision-resolution)).

**Applicability.** Every non-delegable floor decision — the `[H]` acceptance,
authorization, sign-off, and ownership acts, plus the investment gates. Not
judgment (`[J]`) or mechanical items.

**Inputs.** The floor decisions the governance profile requires; the consequence
and compliance floors; the Accountable (**A**) role RACI assigns each decision
([Roles Guide](../guides/roles.md#raci-matrix)).

**Procedure.**

- A project MAY declare an **authorized-party roster**: for each floor decision
  — or each _class_ of floor decisions — the set of identified parties (unique
  identifiers, not bare names or roles) permitted to discharge it. The roster
  binds concrete identities to the **Accountable (A)** position RACI assigns by
  role: the role is the _qualification_ (which function is accountable); the
  roster names _which parties_ fill it for floor acts.
- At `[H]`·interactive the decider MUST be on the roster for that decision; at
  `[H]`·policy the policy **author** MUST be on it. Recording the act is the
  [Record Requirements](#record-requirements) half; this contract is the
  authorization half.
- **Temporal validity.** Roster membership binds at two points: the policy
  author MUST be on the roster for the decision class **at authoring**, and a
  pre-authorized policy remains usable **only while its author remains on the
  roster** for that class. When an author is removed, each affected gate falls
  back to **interactive human** resolution until its policy is explicitly
  **re-owned** — a new recorded `[H]`·policy authorization by an adopting author
  on the roster, never a mechanical transfer of accountability. The removal act
  MUST identify the policies it orphans, recorded under
  [Record Requirements](#record-requirements), so the fallback is visible at
  removal time, not discovered at the next gate. Roster changes are themselves
  durable, attributed records; in platform mode they are governance writes (see
  [Mode Binding and Discovery](#mode-binding-and-discovery)). **`[Reserved]`**
  Co-authored policies — multiple jointly-and-severally accountable authors,
  with fallback to interactive only when no author remains authorized — are
  deferred with the shared multi-actor scope (see
  [Scope Boundary](#scope-boundary)).
- **Default rule (absent a declaration):** the project's executor/owner is the
  authorized party for every floor act. A Negligible or Minimal solo project
  therefore carries an _implicit_ roster — the lone owner approves everything —
  with zero ceremony; a Standard project declares the roster at the
  role/function level; a Critical or formal-compliance project declares an
  explicit, tight roster (e.g. only named identifiers may clear the compliance
  gate).
- **Granularity.** Rosters are declared **per class** with an optional
  **per-decision override** (e.g. "all compliance sign-offs → {ids},"
  overridable for a specific gate).
- **Boundary.** The framework states the **structure + the default rule**; the
  platform owns the roster **schema** (fields, storage, binding to user
  accounts). An agent MUST be able to read "this decision's authorized parties
  are {ids}" and enforce membership from Markdown alone.

**Outputs.** The authorized-party set — explicit or the default — for each floor
decision the project requires.

**Evidence.** The declared roster (or the recorded default), and, per floor act,
the discharging party checked against it (recorded under
[Record Requirements](#record-requirements)).

**Failure behavior.** A floor act discharged by a party not in the authorized
set (and not the default owner) is **not authorized**; the contract MUST treat
it as an unresolved authorization decision and escalate (see
[Operating Model Spec § Authority](operating-model.md#authority-and-decision-resolution),
escalation outcome).

---

## Progressive Governance and Folding

Rationale: progressive-governance detail (Folded Stages).

**Applicability.** Any stage presented below its full ceremony (folded into a
conversation, another stage, or an automated workflow).

**Inputs.** The stage's required concerns; the current consequence and
obligations; the available capability and function separation.

**Procedure.**

<!-- rule: CS-094 -->

### CS-094 — Fold only while requirements stay satisfied

- **Applicability.** Any stage presented below its full ceremony.
- **Inputs.** The stage's required concerns; the current consequence and
  obligations.
- **Procedure.** Stage folding is a presentation and interaction choice, MUST
  NOT be the omission of a stage's required work. A stage MAY be folded only
  when all applicable requirements remain satisfied: stage concerns and
  practices, assurance and evidence obligations, acceptance and authorization
  decisions, traceability and decision records, governance controls and
  authority boundaries, and escalation rules.
- **Outputs.** A folded presentation that preserves every required concern.
- **Evidence.** Folded-stage state, recorded in the canonical state (enclosing
  contract).
- **Failure behavior.** A folding that drops a required concern is invalid; the
  stage MUST unfold (enclosing contract's trigger rule).

<!-- /rule: CS-094 -->

- Folding thins **presentation and decision-rights, never durability**. Even the
fully collapsed **Negligible folded path**
([Right-Sizing](../guides/right-sizing.md#the-negligible-folded-path)) is
**bound by the
[rendered-snapshot fidelity floor](delegated-run.md#project-state-access), not
exempt from it**: its minimum canonical state — the paragraph-brief and the
decision trace behind it — MUST be a durable, attributable write-down (a file,
e.g. a root `DECISIONS.md`), not conversation text that vanishes with the
transcript. "One conversation" is a presentation choice; it never waives the
durable write-back the floor requires.
<!-- rule: CS-096 -->

### CS-096 — Folding never changes required independence

- **Applicability.** Every folded stage's assurance and evaluation work.
- **Inputs.** The independence the governance profile requires; the folded
  presentation.
- **Procedure.** Folding MUST change what is seen, never the independence
  required of the work. A folded self-assurance is still performed
  **context-independently**, not by the producing context confirming itself (see
  [Operating Model Spec § Function Separation](operating-model.md#function-separation)).
- **Outputs.** Folded work at the unreduced independence.
- **Evidence.** The independence grade on the discharging act
  ([CS-084](#cs-084--evidence-independence-grade)).
- **Failure behavior.** A folding that drops a required independence floor is
  invalid (enclosing contract).

<!-- /rule: CS-096 -->

- A folded stage MUST unfold or expose interaction on defined triggers:
  increased consequences or obligations, missing evidence, unavailable required
  capability, unresolved decisions, failed assurance, lost function separation,
  exceeded authority, context drift, or explicit request for review.

**Outputs.** A folded presentation that preserves every required concern.

**Evidence.** Folded-stage state and the unfolding triggers, recorded in the
canonical state.

**Failure behavior.** When a trigger fires, the stage MUST unfold or expose the
interaction; a folding that drops a required concern or independence floor is
invalid.

---

## Scope Boundary

This spec defines the canonical-state **semantics** required by the v0.49
operating, batch, and delegated-run models. It does **not** require a complete
normalized database schema, a specific storage or synchronization mechanism,
team or organization administration, RBAC/SSO/SCIM or enterprise policy tooling,
compliance mappings for specific regulations, formal audit-export
implementations, or the elimination of existing Markdown artifacts.
**`[Reserved]`** Shared multi-actor project state, full membership and roles
(org/team administration, RBAC/SSO/SCIM, enterprise policy tooling), and
audit-export contracts scale on this same model but are deferred to a later,
deliberate expansion of this layer. Two slices are **lifted** from this
reservation in v0.52: **actor identity** at the recording grades for `[J]`+ acts
(see [Record Requirements](#record-requirements)) and the **authorized-party
set** for floor decisions (see
[Authorized Parties for Floor Decisions](#authorized-parties-for-floor-decisions));
the broader identity, membership, and audit-export surface stays reserved.

---

## Notes

**Last Updated:** 2026-07-18

Added to framework in v0.49.0.
