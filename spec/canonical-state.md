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
  status (Withdrawn — no longer applicable — carries a recorded reason and
  attribution). Subsequent stages re-read these at entry, and a stage MUST
  disposition each condition due within it (satisfy, withdraw with a recorded
  reason, re-own with a new discharge point, or escalate) before it closes.
  Re-owning supersedes the tracked item with a successor rather than mutating
  it, preserving the original's provenance. They are canonical state, not a
  gate-record footnote.

**Outputs.** The canonical project state and its Authorization subset.

**Evidence.** The state itself is the record; each element carries provenance
per [Record Requirements](#record-requirements).

**Failure behavior.** A project-level fact that exists only inside a run's
private state, or only in a rendered document, violates the single-source rule
and MUST be reconciled into the canonical state.

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

- The normative lifecycle — six states, two terminals:

```text
active <-> paused                                     (paused carries a reason)
active  -> completion-claimed -> completion-verified -> closed
completion-claimed -> active                          (claim refuted)
active | paused | completion-claimed -> canceled
```

- **Terminals are absorbing.** `closed` and `canceled` are the only terminal
  states; no transition leaves either. The terminal meanings are
  **delivery-based**: `closed` means the approved scope was delivered and
  verified and the closure decision is recorded; `canceled` has one unambiguous
  meaning — **no verified delivery**. A verified-but-declined project is
  `closed` with reason `acceptance-declined`, never `canceled`.
- **Reason codes are normative** — fixed, closed sets per state — and a reason
  is present **iff** the state requires one:

| State                 | Reason codes (closed set)                                        |
| --------------------- | ---------------------------------------------------------------- |
| `paused`              | `blocked` · `awaiting-decision` · `owner-hold`                   |
| `completion-verified` | `awaiting-acceptance` (default on entry) · `closure-in-progress` |
| `closed`              | `accepted` · `acceptance-declined` · `acceptance-lapsed`         |
| `canceled`            | `stopped-by-owner` · `superseded` · `lapsed` · `limit-reached`   |

`active` and `completion-claimed` carry no reason. Free prose belongs in a
separate detail field, never in the reason. A situation no code fits is a
**missing code** — a framework change, not a free-text escape hatch.

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
  author per [Record Requirements](#record-requirements). This floor binds the
  **project** acceptance decision; bounded **work-product** acceptance (e.g.
  whether a component design is acceptable to build) is a different altitude and
  MAY be delegated at low consequence per the
  [governance floors](operating-model.md#governance-floors-and-capability-ceilings).
  The two rungs differ in kind: `completion-verified` is epistemic — does the
  evidence support the claim, checked against **requirements**; acceptance is an
  authority act — do we take delivery, checked against **intent**.
- **Terminals bind the open child graph** (see
  [Terminal Integrity](#terminal-integrity)): entry to `closed` carries a second
  MUST precondition alongside the acceptance decision — the quiescence set is
  dispositioned; entry to `canceled` disposes every open child record by
  cascade, chained to the cancellation's attribution.
- **A refuted completion claim returns to `active`** — not to `paused`, and not
  to a terminal. An unmet contract element **blocks** the claim: identified work
  exists, and identified work is `active`. This is a deliberate asymmetry with
  the run lifecycle, where `failed-verification` routes to the `failed` terminal
  — correct for a run, whose authorized span is over; wrong for a project, which
  simply has work left.
- **Closure-stage work happens inside `completion-verified`**, made visible by
  its reason (`awaiting-acceptance` → `closure-in-progress`). Handoff,
  production-ownership transfer, the retrospective, and the close-out summary
  are stage work, not lifecycle states.
- **`paused` is the single non-terminal suspension state**, reachable from
  `active` only. It suspends the project awaiting something external; it is not
  where refuted claims or identified work go. A stalled verification waits in
  `completion-claimed`, which is already a waiting state.
- **No pre-`active` state.** A project performs authorized work (Initiation)
  before Gate 1 — Gate 1 authorizes the plan, not the project's existence — so a
  project is `active` from bootstrap.
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
    archived-at fact); it never overwrites _which_ terminal the project reached,
    and terminals stay absorbing.
- The lifecycle MUST distinguish requested from confirmed state: a completion
  claim is not a verification, a verification is not the acceptance decision,
  and an intention to stop is not a recorded terminal.

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
batches, escalations, directives, deviations, carry-forward conditions, planning
records — each keep their own status. Without a contract over that child graph
at the moment a terminal is recorded, the terminals stop being honest: `closed`
could assert completeness over still-open work, and a canceled project's
children would stay open forever — the trail-off dishonesty the lifecycle exists
to kill.

**Applicability.** Every transition into a project terminal (`closed` /
`canceled`), at every tier, consequence level, autonomy posture, and operating
mode; transitively, every run terminal (the run → directive hop).

**Inputs.** The open child records under the project; the terminal transition
being recorded, with its reason and attribution.

**Procedure.**

- The two terminals make opposite claims, so they bind the child graph in
  opposite directions: `closed` asserts completeness — open children falsify the
  assertion, so the transition is **refused** until they are dispositioned;
  `canceled` asserts abandonment — nobody hand-closes an abandoned project's
  child graph, so the transition **disposes** it.
- **`closed` is quiescence-gated.** Entry to `closed` carries a MUST
  precondition alongside the acceptance decision: the **quiescence set** is
  dispositioned —
  - every run is at a terminal state;
  - every batch is at a terminal state;
  - no escalation is open;
  - every carry-forward condition is Satisfied or Withdrawn, none Open or
    Blocked;
  - no risk rests open — each carries an explicit disposition, not merely a
    disclosure.

  The set names the project's **direct** children once; transitivity carries the
  rest (a terminal run has already dispositioned its directives, below), so each
  family has exactly one enforcement point. **Approved deviations are the
  deliberate exemption:** a deviation records a condition the delivery was
  accepted under; it attaches to the delivered result, survives `closed` as part
  of what was accepted (disclosed per the
  [completion contract](#project-level-completion)), and moves through its own
  lifecycle independently of the project's. The completion contract demands most
  of this quiescence at **claim** time; this precondition binds the same
  determination to the transition itself — closure-stage work happens after the
  claim, and the completeness assertion is recorded over the child graph at
  entry to `closed`, not at claim time.

- **`canceled` cascades.** Recording `canceled` MUST disposition every open
  child record, transitively down the containment graph — project → run →
  directive, project → batch, and likewise for escalations, approved deviations,
  carry-forward conditions, and planning records. Each stateful child family's
  vocabulary defines the **parent-caused disposition** the cascade lands it in:
  a resting status plus a parent-caused reason code — `project-canceled` at the
  project hop, `run-terminal` at the run hop — so a cascaded ending is never
  conflated with an ending the child's own parties chose.
- **The run → directive hop is the same cascade one level down.** A run reaching
  any terminal — its own or cascaded — MUST leave no directive non-terminal; its
  non-terminal directives take the directive family's parent-caused disposition
  (see
  [Delegated-Run Spec § Idempotency Substrate](delegated-run.md#idempotency-substrate)).
- **A cascaded disposition never impersonates a party's own act.** A family MAY
  land cascaded endings on a status it shares with party-initiated endings only
  when its reason vocabulary distinguishes the parent-caused ending; the reason
  code, not the status name, records who ended the child and why.
- **The cascade preserves realized extent.** A force-dispositioned child records
  what had actually happened when the parent ended — the run model's
  realized-extent rule
  ([Honest Incomplete Outcomes](delegated-run.md#honest-incomplete-outcomes));
  the cascade never erases or inflates it.
- **One attributed act.** The cancellation is a single attributed governance
  write; every cascaded disposition chains its provenance to that transition
  record ([Record Requirements](#record-requirements)) and is never
  re-attributed to the child's own parties. The cascaded dispositions are part
  of the terminal transition's governance-class write
  ([Mode Binding and Discovery](#mode-binding-and-discovery)).
- **A partially canceled project is not representable.** The cascade is part of
  the terminal transition, not follow-up work: at any admitted state version a
  reader sees either the project non-terminal with its children as they were, or
  the project terminal with every child dispositioned. In file mode the
  transition and its cascade land as one write-back.
- **Records, not operations.** The cascade dispositions **governance records**;
  it commands nothing operational. Cancellation does not un-deploy, stop a
  production system, or alter release or flag state — a canceled project can
  leave a live system in production, and changing that system is
  product-altitude work outside this contract. For an in-flight run the cascaded
  terminal withdraws authorization — the record that
  [stop enforcement](operating-model.md#stop-enforcement) acts on; the cascade
  records the end, enforcement effects it.
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

**Outputs.** At `closed`, a quiescent child graph under the completeness claim;
at `canceled`, a fully dispositioned child graph, every cascaded record carrying
its parent-caused reason.

**Evidence.** The terminal transition record plus, for `canceled`, the cascaded
disposition records, each chaining provenance to the transition (per
[Record Requirements](#record-requirements)).

**Failure behavior.** An entry to `closed` while the quiescence set holds an
undispositioned member MUST be rejected — the same rejection class as a
transition outside the defined set. A `canceled` observed with a child still
open is an incomplete write, not a tolerable intermediate state: the missing
cascade dispositions MUST be applied, chained to the original transition.

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
written to eliminate. This contract closes the class: every canonical record
family's status set is normative, here or in the family's own contract.

**Applicability.** Escalations; approved deviations; the planning families
(goals, success criteria, requirements, assumptions, risks).

**Inputs.** Recorded status changes and their reasons; for cascaded
dispositions, the parent terminal per [Terminal Integrity](#terminal-integrity).

**Procedure.**

- **Status sets are normative and closed** — the lifecycle discipline applied to
  every family: a situation no status fits is a **missing status**, a framework
  change, never a free-text escape hatch; free prose belongs in a detail field.
  Where a status requires a reason, the reason codes are a closed set too.
- **Resting statuses are absorbing at the record.** Reversing one is a
  supersession — a successor record chaining provenance to the original — never
  a mutation of the resting record (the carry-forward re-owning device,
  generalized).
- **Parent-caused endings ride [Terminal Integrity](#terminal-integrity):** the
  cascade lands each family in the resting status named below with the
  parent-caused reason, never impersonating a party's own act.

### Escalation Lifecycle

An escalation is the canonical record of an unresolved decision routed to
authority
([Operating Model Spec § Authority](operating-model.md#authority-and-decision-resolution)):
the affected action stops, the unresolved decision and its evidence are
recorded, the target authority is identified, state is preserved. The record's
own lifecycle:

```text
open -> resolved | withdrawn | lapsed
```

- **`open`** — awaiting the target authority. The escalation is not itself a
  resolution; it waits for one.
- **`resolved`** — the routed decision was made and recorded; the escalation
  links its resolution. Carries no reason — the resolution record is the
  content.
- **`withdrawn`** — ended without a resolution. Reasons (closed set):
  `raiser-withdrawn` (the raising party no longer needs the decision) · `moot`
  (the triggering condition resolved itself — moot is a reason, not a fifth
  state) · `project-canceled` (the cascade). The reason code records who ended
  it; the status name is shared honestly because the reason disambiguates.
- **`lapsed`** — the determination that no decision will come (the
  `acceptance-lapsed` device, ported). Recording the lapse is a human act —
  interactive, or pre-authorized policy as the policy author's act — never a
  bare timeout. The
  [decision-overdue path](delegated-run.md#progress-liveness-and-unresponsive-state)
  is a producer: a pre-authorized auto-abandon past the longer bound records the
  run's `decision-lapsed` ending and the escalation's `lapsed` as the same
  determination.
- Terminals are absorbing: a resolved, withdrawn, or lapsed escalation is never
  reopened — a recurring need is a new escalation chaining provenance to the old
  one.

### Deviation Lifecycle

An approved deviation records a condition the work proceeds under — a governance
requirement waived or altered, attributed to its approver. The grant is
revisitable by construction:
[Controlled Replanning](delegated-run.md#controlled-replanning) holds that
completed work MUST NOT remain implicitly accepted when its supporting
assumptions have materially changed, and a deviation is exactly such an
acceptance. Its lifecycle:

```text
active -> expired | revoked
```

- **`active`** — the grant holds.
- **`expired`** — the grant's **optional granted-until bound** passed. Expiry is
  mechanical: the bound was the approver's decision, recorded at grant time, so
  no new decision attends its arrival. Carries no reason. The bound stays
  optional — a mandatory bound on every deviation invites ritual dates, not
  governance.
- **`revoked`** — an attributed governance write ending the grant before any
  bound. Reasons (closed set): `assumptions-changed` (the condition it was
  granted against no longer holds) · `superseded` (replaced by a new grant
  chaining provenance) · `project-canceled` (the cascade).
- **Work MUST NOT rely on an expired or revoked deviation.** Continued need is a
  new deviation request, decided on current facts — never a quiet extension of
  the dead grant.
- **A deviation survives project `closed`** — the deliberate exemption in
  [Terminal Integrity](#terminal-integrity)'s quiescence set: it attaches to the
  delivered result as part of what was accepted, disclosed per the
  [completion contract](#project-level-completion), and moves through this
  lifecycle on its own clock afterward. On project `canceled` it is cascaded to
  `revoked` with reason `project-canceled`.
- Terminals are absorbing: re-granting is a new record chaining provenance,
  never a reactivation.

### Planning-Family Status Sets

The planning families carry statuses, not transition machines: what each set
must distinguish is an honest resting place for every way the record's story can
end — including the ways nobody plans for. The normative closed sets:

| Family            | Status set (closed)                                                                      |
| ----------------- | ---------------------------------------------------------------------------------------- |
| Goal              | `active` · `achieved` · `dropped`                                                        |
| Success criterion | `not-started` · `met` · `met-synthetic` · `deferred` · `blocked` · `revised` · `dropped` |
| Requirement       | `proposed` · `approved` · `implemented` · `verified` · `deferred` · `dropped`            |
| Assumption        | `open` · `validated` · `invalidated` · `retired`                                         |
| Risk              | `open` · `mitigated` · `accepted` · `realized` · `closed`                                |

- **A success criterion can be honestly retired.** `dropped` is the resting
  status for a criterion that will not be pursued; `revised` and `deferred` both
  promise a future, and a criterion with no future MUST NOT hide in either.
- **A risk that materializes has a word.** `realized` records the outcome — the
  risk happened — distinct from `closed` (the threat ended without
  materializing) and from `mitigated`/`accepted` (live postures). Collapsing a
  realized risk into `closed` destroys the outcome distinction the project
  terminals preserve. The reason-and-detail record suffices; a linked
  consequence record is product altitude, not required here.
- **Risks are dispositioned at close, not merely disclosed.** At entry to
  project `closed`, no risk rests `open`
  ([Terminal Integrity](#terminal-integrity)'s quiescence set): each is
  `mitigated`, `accepted`, `realized`, or `closed` — an explicit resting posture
  someone answers for, recorded under
  [Record Requirements](#record-requirements).
- **Planning-family statuses carry no required reason.** The cascade is the
  exception in effect, not in form: a cascaded landing carries the parent-caused
  reason on the cascade record per [Terminal Integrity](#terminal-integrity).
  The cascade lands each family in its retirement status: goals, success
  criteria, and requirements at `dropped`; assumptions at `retired`; risks at
  `closed` — each chained to the cancellation with reason `project-canceled`.

**Outputs.** Each record's current status, with its reason where the status
requires one.

**Evidence.** A durable, attributed record per status change
([Record Requirements](#record-requirements)); cascaded dispositions chain
provenance per [Terminal Integrity](#terminal-integrity).

**Failure behavior.** A status outside the family's defined set — or a
required-reason status without a reason, or with a code not defined for it — is
not a satisfied record. A status write that mutates a resting record instead of
superseding it forks the record's history and MUST be rejected.

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

**Failure behavior.** A normative element expressible only through live
structured access is an authoring-time defect and MUST be corrected; it does not
narrow a specific run's envelope (it would silently break Markdown operability
for all snapshot runs). Note: a specific deployment with no Markdown path simply
lacks the snapshot mode — the coverage-narrows-the-envelope rule supplies that
consequence, and this self-sufficiency rule is **not** a per-implementation
feature mandate.

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
  There is never a second source of truth. **A write is governance-class iff**
  it discharges or reverses a `[J]`-or-above item; records or changes a gate or
  checkpoint decision; records a [project-lifecycle](#project-lifecycle)
  transition into a terminal (`closed` / `canceled`) or the acceptance decision;
  changes the Authorization subset, operating envelope, governance profile,
  authorized-party roster, or operating mode; or records a risk acceptance or
  accepted limitation. All other writes are non-governance by default, and the
  write class is carried explicitly on every write.
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

- The framework MUST define implementation-neutral requirements for project
  records: durability, revision history, provenance, traceability, attribution,
  accessibility, portability, retention, auditability, and appropriate
  immutability or correction history.
- The target is the **smallest sufficient set** of facts, decisions,
  relationships, evidence, deviations, and outcomes. Automation MUST NOT justify
  generating every full document; formal artifacts are rendered when their
  audience or governance profile requires them.
- Specific storage, synchronization, and agent-access mechanisms are
  implementation choices; the Markdown MUST still specify the required record
  semantics and access properties sufficiently for an agent to operate them.
- **Attribution carries an accountability grade.** For any item whose checklist
  marker or governance profile places it at the judgment tier (`[J]`) or above,
  the record MUST capture _who or what discharged it_ at the grade the item's
  accountability demands, plus **two timestamps (ratified v0.58)** — the claimed
  evaluation time and the platform receipt time (in file mode, the receipt time
  is the moment the write lands in the durable store — in practice, the commit
  timestamp); ordering never derives from either (the
  [state version](#minimum-canonical-project-state) orders writes). Below that
  tier (mechanical, unmarked items) recording is OPTIONAL but RECOMMENDED — it
  is near-free under agent execution. The timestamps are always recorded.
- **Two identity grades**, each the _minimum that suffices_, not a cap on what
  is recorded:
  - **`[J]` — qualification-identity.** The evaluator's _kind_: for an agent,
    vendor / model / version; for a human, name + role. A type suffices, because
    a judgment item asks only that a qualified evaluator confirmed it.
  - **`[H]` — party-identity.** A _unique authorized party_: for a human, name +
    a stable identifier; for an `[H]`·policy clearance, the policy's **author**
    (the accountable party) together with the evaluating agent's
    qualification-identity and the required timestamps. A type never suffices at
    the floor — it cannot answer for an outcome. _Which_ parties are authorized
    is the
    [Authorized Parties for Floor Decisions](#authorized-parties-for-floor-decisions)
    contract.
- **Attribution also carries an evidence-independence grade.** For any
  `[J]`-or-above discharge, the record MUST capture how the evaluation stood
  **relative to the producing context**, reusing the
  [independence axes](operating-model.md#evaluator-independence) — no new
  vocabulary. Minimum value set: **self-asserted** (the producing context) ·
  **context-independent** (the evaluator does not inherit the producing context)
  · **organizationally-independent** (an organizationally or externally
  independent evaluator).
- **Attribution also carries an attribution-source grade (ratified v0.58).** For
  any attributed `[J]`-or-above act the record MUST capture how the identity was
  established: **platform-verified** (the recording platform authenticated the
  acting identity) or **client-claimed** (self-reported by the acting client —
  including an agent's vendor / model / version, which a platform cannot
  verify). An identity claim is bounded by the verification achieved — the
  record MUST NOT present a client-claimed identity as verified, the same
  discipline as
  [Operating Model Spec § Evaluator Independence](operating-model.md#evaluator-independence)
  (claims MUST NOT exceed what was achieved).
- A `[J]`-or-above **floor item discharged self-asserted is not a cleared
  floor**: it supports mechanical conformance only — the record-level form of
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
- The framework states the **grades required + the timestamps**; the platform
  owns the field schema (names, storage, binding to accounts). An agent MUST be
  able to read and satisfy the grade requirement from Markdown alone.

**Outputs.** Records meeting the required semantics.

**Evidence.** Provenance, attribution, and correction history attached to each
record.

**Failure behavior.** A record lacking a required property (e.g. no provenance,
no correction history) caps the assurance or audit level its evidence can
support (see
[Operating Model Spec § Function Separation](operating-model.md#function-separation),
evidence row). A `[J]`-or-above act recorded without its required identity
grade, its evidence-independence grade, its attribution-source grade, or its
timestamps is not a satisfied record and caps the level the same way.

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

- Stage folding is a presentation and interaction choice, MUST NOT be the
  omission of a stage's required work. A stage MAY be folded only when all
  applicable requirements remain satisfied: stage concerns and practices,
  assurance and evidence obligations, acceptance and authorization decisions,
  traceability and decision records, governance controls and authority
  boundaries, and escalation rules.
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
- Folding MUST change what is seen, never the independence required of the work.
  A folded self-assurance is still performed **context-independently**, not by
  the producing context confirming itself (see
  [Operating Model Spec § Function Separation](operating-model.md#function-separation)).
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

**Last Updated:** 2026-07-10

Added to framework in v0.49.0.
