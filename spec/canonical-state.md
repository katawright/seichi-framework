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
- Establish that briefs, checklists, packages, and reports are **rendered
  views**, not parallel sources
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
2. Read [**Artifacts as Views**](#artifacts-as-views) and
   [**Markdown Self-Sufficiency**](#markdown-self-sufficiency) for the
   source-of-truth and lossless-rendering rules
3. Read [**Record Requirements**](#record-requirements) and
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

- The framework MUST define a minimum canonical structured project state that
  can include: goals and success criteria; requirements and acceptance criteria;
  assumptions and risks; architecture and decisions; increment plans, batches,
  and dependencies; operating configuration; governance profile and approved
  deviations; assurance requirements, achieved independence, evidence, and
  conclusions; decision rights, delegated authority, and authorization records;
  required operating functions, capability coverage, and function separations;
  effective operating-envelope state; runs, directives, events, and continuation
  state; checkpoint decisions, escalations, and resolutions; carried-forward
  gate and checkpoint conditions (each with an owner, the discharging stage or
  increment, and a satisfied or blocked status); folded-stage state and
  unfolding triggers; and evidence, provenance, and traceability relationships.
- This canonical state MUST be the single source for project-level facts. Any
  other representation of these facts is a [view](#artifacts-as-views), not a
  second source.
- The **Authorization** subset a delegated run reads — the approved objective
  and scope, the operating envelope, the escalation and stop conditions, and the
  resource and time limits — is part of this canonical state. A run references
  it; it MUST NOT be restated as a separate source (single-source rule).
- **Carry-forward obligations are tracked state.** A "proceed with conditions"
  gate or checkpoint outcome records each condition as an open item — owner,
  discharging stage or increment, and satisfied/blocked status. Subsequent
  stages re-read these at entry, and a stage MUST disposition each condition due
  within it (satisfy, re-own with a new discharge point, or escalate) before it
  closes. They are canonical state, not a gate-record footnote.

**Outputs.** The canonical project state and its Authorization subset.

**Evidence.** The state itself is the record; each element carries provenance
per [Record Requirements](#record-requirements).

**Failure behavior.** A project-level fact that exists only inside a run's
private state, or only in a rendered document, violates the single-source rule
and MUST be reconciled into the canonical state.

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
  not a second definition. The completion **contract** is canonical in the
  delegated-run spec; the close-out renders it.
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

**Applicability.** The whole v0.49 normative layer — binds the framework and the
spec authors (meta-conformance, enforced at authoring time), not every tool.

**Inputs.** The minimum canonical project state; every normative rule, required
state element, procedure, and evidence artifact in v0.49.

**Procedure.**

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
  accountability demands, plus the **timestamp** of evaluation. Below that tier
  (mechanical, unmarked items) recording is OPTIONAL but RECOMMENDED — it is
  near-free under agent execution. The timestamp is always recorded.
- **Two identity grades**, each the _minimum that suffices_, not a cap on what
  is recorded:
  - **`[J]` — qualification-identity.** The evaluator's _kind_: for an agent,
    vendor / model / version; for a human, name + role. A type suffices, because
    a judgment item asks only that a qualified evaluator confirmed it.
  - **`[H]` — party-identity.** A _unique authorized party_: for a human, name +
    a stable identifier; for an `[H]`·policy clearance, the policy's **author**
    (the accountable party) together with the evaluating agent's
    qualification-identity and the timestamp. A type never suffices at the floor
    — it cannot answer for an outcome. _Which_ parties are authorized is the
    [Authorized Parties for Floor Decisions](#authorized-parties-for-floor-decisions)
    contract.
- The framework states the **grade required + the timestamp**; the platform owns
  the field schema (names, storage, binding to accounts). An agent MUST be able
  to read and satisfy the grade requirement from Markdown alone.

**Outputs.** Records meeting the required semantics.

**Evidence.** Provenance, attribution, and correction history attached to each
record.

**Failure behavior.** A record lacking a required property (e.g. no provenance,
no correction history) caps the assurance or audit level its evidence can
support (see
[Operating Model Spec § Function Separation](operating-model.md#function-separation),
evidence row). A `[J]`-or-above act recorded without its required identity grade
or timestamp is not a satisfied record and caps the level the same way.

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
- Folding MUST change what is seen, never the independence required of the work.
  A folded self-assurance is still performed with **fresh eyes**, not by the
  producing context confirming itself (see
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

**Last Updated:** 2026-06-28

Added to framework in v0.49.0. Authored from the v0.49 progressive-governance
and structured-state detail doc. The run-level state and the rendered-snapshot
fidelity floor that consume this canonical state live in the
[Delegated-Run Spec](delegated-run.md); the human-facing rationale for the
operating model lives in the
[Operating Model Guide](../guides/operating-model.md). Recording-grade
attribution (identity grades + obligation) and the Authorized Parties for Floor
Decisions contract added in v0.52.0 (CL-3/CL-4), lifting two slices out of the
`[Reserved]` actor-identity/membership line.
