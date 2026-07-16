# Operating Model Spec

## Overview

Normative contracts for the operating model — the functions a run engages, the
coverage and independence they require, and the floors, ceilings, separations,
and stop conditions that bound what may proceed without a human.

### Why These Contracts

The [Operating Model Guide](../guides/operating-model.md) explains the operating
model for a human operator. An agent running a bounded span unattended, and a
conformance check deciding whether a tool honors the framework, need the same
model as rules: exact applicability, procedure, and failure behavior. These
contracts are that form. Each links back to the guide for rationale.

### Goals of This Spec

- Fix the eight operating functions and which are configured versus standing
- Define capability coverage, the effective operating envelope, and the
  floors/ceilings that clamp configured settings
- Define Lights-Out eligibility, authority resolution and the non-delegable
  floor, function separation, evaluator independence, and stop enforcement as
  binding contracts

### Key Principle

The achievable operating posture is the operator's **intent, clamped** between a
**governance floor** (consequence and compliance push the demand-side settings
up) and a **capability ceiling** (coverage pushes all four down). A required
function with no qualified, available, sufficiently independent provider
**narrows the envelope** — it does not silently proceed.

### How to Use This Spec

1. Read [**Operating Functions**](#operating-functions) for the function set a
   run engages
2. Read [**Capability Coverage**](#capability-coverage) and
   [**Effective Operating Envelope**](#effective-operating-envelope) for how
   settings become achievable actions
3. Read
   [**Governance Floors and Capability Ceilings**](#governance-floors-and-capability-ceilings)
   and [**Lights-Out Eligibility**](#lights-out-eligibility) for the consequence
   and compliance clamps
4. Read
   [**Authority and Decision Resolution**](#authority-and-decision-resolution),
   [**Function Separation**](#function-separation),
   [**Evaluator Independence**](#evaluator-independence), and
   [**Stop Enforcement**](#stop-enforcement) for the per-decision and
   per-function contracts

The contract form (the six fields used below) is defined in the
[spec index](README.md#contract-form).

---

## Operating Functions

Rationale:
[Operating Model Guide § Operating Functions](../guides/operating-model.md#operating-functions).

**Applicability.** Every run. Which functions a run **engages** depends on the
run: an attended, sequential increment engages fewer than an unattended,
parallel, delegated batch.

**Inputs.** The four configurable-function settings (Work Execution, Workflow
Automation, Required Assurance, Authority); the run shape (attended/unattended,
sequential/parallel, delegated or not).

**Procedure.**

- The operating model MUST be defined over the eight **operating functions**,
  not abstract axes:
  - **Configurable functions** (operator sets a setting): work execution;
    workflow administration; assurance / verification; governance decision
    resolution (Authority).
  - **Standing functions** (no setting): evidence capture; escalation and stop
    enforcement; [batch orchestration and integration](parallel-batch.md); run
    continuity, status reporting, and completion evaluation.
- Evidence capture and stop enforcement MUST always be treated as required.
  Orchestration and integration are required only when parallel execution
  applies; run continuity and completion are required only when delegated runs
  apply.
- A delivery or record system MUST NOT be credited with supplying an active
  function merely by storing or displaying its state. A function is covered only
  by a provider that performs it.

**Outputs.** The set of required functions for the run.

**Evidence.** The configured settings and the engaged-function set are recorded
as part of [canonical state](canonical-state.md).

**Failure behavior.** A required function with no qualified, available provider
is a coverage gap; see [Capability Coverage](#capability-coverage) and
[Effective Operating Envelope](#effective-operating-envelope) for the
consequence.

---

## Capability Coverage

Rationale:
[Operating Model Guide § Capability Coverage](../guides/operating-model.md#capability-coverage).

**Applicability.** All eight functions a run requires — including the four the
operator configured (a setting is intent; coverage is feasibility).

**Inputs.** The required-function set; the available providers (humans, agents,
deterministic controls or policy engines, external systems, external
evaluators).

**Procedure.**

- Coverage MUST map each required function to one or more providers, recording
  provider scope, qualification or capability evidence, independence where
  required, current availability, and known limitations.
- The clamp is **not 1:1**: one setting MAY be bounded by the coverage of
  several functions (e.g. Agents Work Execution is bounded by both
  work-execution and assurance/verification coverage).
- Capability MUST NOT grant authority. Missing or inadequate capability narrows
  the envelope even when an action is authorized.
- Capability has a second, symmetric effect beyond the ceiling: it sets how much
**implementation scaffolding** stage artifacts carry for the executor. Contract
and verification detail — interfaces, acceptance criteria, test intent,
boundaries, and governance hooks — MUST NOT be reduced on capability grounds at
any capability level. Implementation scaffolding — component structure, file
layout, enumerated test cases, pre-worked logic — MAY be scaled to the executor,
and is the only specification detail capability adjusts.
<!-- rule: OM-008 -->

### OM-008 — Executor read path setting (guided / contracts-only)

- **Applicability.** Every project operating configuration; the scaffolding
  scale the enclosing contract adjusts.
- **Inputs.** The closed value set `executor_read_path` in
  [`vocabulary/config.yaml`](vocabulary/config.yaml) — `guided` |
  `contracts-only` — binds as data.
- **Procedure.** The scaffolding scale is declared, not inferred per session:
  the **executor read path** setting is recorded in the project operating
  configuration alongside tier and posture, surfaced as an overridable
  `[ASSUMED]` default when inferred (see
  [Classification by Inference](../guides/agentic-workflow.md#classification-by-inference)).
  The setting MUST be keyed to observed executor behavior, never to a model name
  or version. When the executor is unknown or weak, the default is `guided`; the
  retrospective's specification-depth calibration reviews the setting each
  increment, and the setting MUST be re-evaluated after a material change to the
  executor configuration — provider, model, reasoning effort, or task domain.
  **[Informative]** At first encounter, the setting follows the qualification
  evidence held for the executor configuration — evidence classes and the trial
  mechanism in
  [Operating Model Guide § Read-Path Starting Points](../guides/operating-model.md#read-path-starting-points);
  absent evidence, the `guided` default applies.
- **Outputs.** The declared executor read path setting in the operating
  configuration.
- **Evidence.** The declared setting, recorded with the coverage map (enclosing
  contract).
- **Failure behavior.** N/A — no failure path is defined for the setting itself:
  absent a declaration or evidence, the `guided` default applies (Procedure).

<!-- /rule: OM-008 -->

**Outputs.** The coverage map over the required functions.

**Evidence.** The coverage map, with each provider's recorded properties, and
the declared executor read path setting.

**Failure behavior.** An uncovered required function removes its dependent
actions from the [envelope](#effective-operating-envelope). Distinguish:

- **Hard capability gap** — a function the _work_ needs is uncovered → blocks
  regardless of stakes.
- **Assurance gap** — an _evaluation_ function is uncovered → blocks only at
  stakes that require it (an unverified action MAY be inside the envelope at low
  consequence as an accepted limitation, outside it at high).

---

## Effective Operating Envelope

Rationale:
[Operating Model Guide § The Operating Envelope](../guides/operating-model.md#the-operating-envelope).

**Applicability.** Every action or transition a run attempts.

**Inputs.** Approved authority and governance constraints; the
[coverage map](#capability-coverage).

**Procedure.**

- The effective operating envelope MUST contain only actions and transitions
  that are **both** permitted by approved authority and governance constraints
  **and** backed by demonstrated, available coverage for every required
  function.
- The envelope MUST be re-evaluated when authority, context, capability,
  availability, assurance requirements, or provider configuration changes —
  **including mid-run**.

**Outputs.** The set of in-envelope actions for the current state.

**Evidence.** Envelope state and the triggers that caused each re-evaluation.

**Failure behavior.** An action outside the envelope MUST stop or escalate
rather than proceed. If a required capability disappears mid-run, the envelope
narrows and affected work stops or escalates.

---

## Governance Floors and Capability Ceilings

Rationale:
[Operating Model Guide § The Operating Envelope](../guides/operating-model.md#the-operating-envelope).
The Layer-A anchor definitions (Consequence, Compliance, Stakeholder Reach) are
maintained in the [Right-Sizing Guide](../guides/right-sizing.md); this contract
is the normative source for the floor mapping those anchors feed.

**Applicability.** The achievable setting for each configurable function.

**Inputs.** Operator intent per function; the **consequence** anchor (Negligible
→ Critical); the active **compliance** obligation set; the
[coverage map](#capability-coverage).

**Procedure.**

- The achievable setting MUST equal intent clamped between a **governance
  floor** (consequence and compliance push the demand-side settings up) and a
  **capability ceiling** (coverage pushes all four down).
- Consequence MUST floor only the demand-side settings — Required Assurance and
  Authority. Capability ceilings apply to all four.
- Floors are minimums. Exceeding a floor is always permitted. Going **below** a
  consequence floor MUST record a risk-acceptance decision (who accepted, why,
  scope). Compliance floors are hard and MUST NOT be waived here.
- **Consequence saturates at Internal.** Consequence magnitude alone MUST NOT
  floor Required Assurance above Internal and MUST NOT turn Lights-Out off. An
  **External** assurance floor MUST arise only from compliance or
  cross-organization Stakeholder Reach; an outright **Lights-Out prohibition**
  MUST arise only from compliance or a capability gap — never from consequence
  alone.
- The consequence-to-floor mapping (cells are minimums):

| Consequence | Assurance floor (min)                                         | Authority floor (min)                                                                                                          | Lights-Out                                                                 | Governance-weight preset    |
| ----------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- | --------------------------- |
| Negligible  | None                                                          | adds nothing beyond the standing non-delegable floor                                                                           | eligible (glance-and-go)                                                   | off-grid (below Minimal)    |
| Low         | Self                                                          | adds nothing beyond the standing floor; work-product acceptance delegable                                                      | eligible                                                                   | Minimal                     |
| Moderate    | Internal _if an independent provider is available_, else Self | gate decisions human-or-policy                                                                                                 | eligible, bounded pauses                                                   | Standard                    |
| High        | Internal (required)                                           | gate decisions non-delegable                                                                                                   | eligible; gated at irreversible transitions                                | Enterprise                  |
| Critical    | Internal (required)                                           | all gate decisions non-delegable, interactive-only (no pre-authorized policy) + independent stop-enforcement coverage required | eligible up to non-delegable gates; no _delegated_ irreversible transition | off-grid (above Enterprise) |

- The Authority cells state only what **consequence adds**. The categorical
  non-delegable floor of
  [Authority and Decision Resolution](#authority-and-decision-resolution) —
  investment gates, compliance sign-off, and the project acceptance decision —
  binds at **every** row, including Negligible.
- At the highest consequence, the additional weight lands on Authority (gate
  density and non-delegability) and required standing-function coverage (stop
  enforcement) — both insert **bounded pauses**; neither switches Lights-Out off
  (see [Lights-Out Eligibility](#lights-out-eligibility)).
- A consequence floor a run cannot reach because coverage is absent (e.g. the
  Moderate **Internal** assurance floor with no independent provider) falls back
  to the highest coverable rung below it (here, **Self**), recorded as an
  accepted limitation per [Capability Coverage](#capability-coverage) — not
  waived.

**Outputs.** The clamped, achievable setting for each configurable function.

**Evidence.** The floor and ceiling determination per function, and any recorded
risk-acceptance.

**Failure behavior.** Intent above the ceiling is clamped down (the envelope
narrows). Intent below a consequence floor without a recorded risk-acceptance
MUST NOT be permitted; a setting below a compliance floor MUST NOT be permitted
at all.

---

## Lights-Out Eligibility

Rationale:
[Operating Model Guide § Lights-Out](../guides/operating-model.md#lights-out-the-far-end-of-the-spectrum).

**Applicability.** Any span intended to proceed without routine human
involvement (a bounded delegated run; see
[Delegated-Run Spec](delegated-run.md)).

**Inputs.** The configured settings; the [coverage map](#capability-coverage);
the consequence and compliance
[floors](#governance-floors-and-capability-ceilings); the run's required
functions.

**Procedure.**

- A span is Lights-Out-eligible only if, **during** the delegated run, all of
  the following hold: Agents Work Execution; Automated workflow administration;
  satisfaction of assurance obligations due during the run; resolvable routine
  acceptance and authorization decisions; complete demonstrated and available
  capability coverage for the functions the run requires; automatic evidence and
  provenance capture; and reliable escalation and stop enforcement.
- No assurance **level** precludes Lights-Out. A required evaluation inserts a
  **bounded pause** for an evaluator — automatable for None and Self, and for
  Internal where an independent automated provider exists, usually human for
  External. A pause bounds a run without making it non-Lights-Out.
- What narrows the envelope is an **uncovered required function** (verifiability
  is the most common such gap).
- Lights-Out is an operating intent **realized to a degree**, not a zero-pause
  category. An exception pause (an escalation condition trips) MUST NOT
  reclassify the run as "not Lights-Out"; the run stays live until
  resolve-and-continue or cancel (see
  [Delegated-Run Spec § Lifecycle](delegated-run.md#run-lifecycle)).
- A run MUST NOT treat Lights-Out as any of: a project-wide classification; a
  level above Automated workflow; the same thing as Agents Work Execution;
  unlimited authority; or an absence of assurance, evidence, or governance.

**Outputs.** The Lights-Out eligibility determination for the span (and the
bounded pauses its floors force).

**Evidence.** The eligibility determination and the preflight conditions checked
(see
[Delegated-Run Spec § Operational Readiness](delegated-run.md#operational-readiness-preflight)).

**Failure behavior.** A required function uncovered, or a floor forcing a
non-delegable gate with no resolving authority available, makes the span
ineligible for unattended execution (or inserts a bounded pause). An outright
Lights-Out prohibition arises from compliance or a capability gap.

---

## Authority and Decision Resolution

Rationale:
[Operating Model Guide § Authority](../guides/operating-model.md#authority--who-may-decide).

**Applicability.** Every governance **checkpoint** decision — acceptance,
authorization, gate, sign-off — defined by the governance profile. Not the
micro-choices made while executing (those are Work Execution).

**Inputs.** The checkpoint; the Authority setting; the consequence and
compliance floors; coverage (is a qualified delegate available? are the policy's
conditions evaluable by a covered function?).

**Procedure.**

- Each checkpoint decision MUST have exactly one valid resolution mechanism:
  **interactive human**, **pre-authorized policy** (human-owned rule, evaluated
  without discretion), or **delegated agent** (agent decides within explicitly
  delegated, bounded authority).
- Gates keep human-owned authority. A gate MAY be cleared by an interactive
  human decision **or** by pre-authorized conditional policy — both are the
  human exercising owned authority. This is the normal Lights-Out mechanism.
- A **two-level nested clamp** governs gate authority:
  - **Level 1** — the floors select the permitted resolution mode (non-delegable
    decisions, driven by consequence + compliance) and the ceiling (coverage)
    decides whether the permitted mode is achievable.
  - **Level 2** — within that latitude, the operator authors the policy's
    escalate-if conditions. The policy MUST NOT be more permissive than Level 1
    allows.
- A policy is usable only if its conditions are evaluable by a covered function;
  otherwise the gate MUST fall back to interactive human regardless of intent.
- The **non-delegable floor** (human-owned) MUST include investment gates,
  compliance sign-off, the project acceptance decision (which gates entry to the
  [project lifecycle](canonical-state.md#project-lifecycle)'s `closed` terminal
  — an acceptance is a Review checkpoint, not a gate), and — at high or critical
  consequence — gate decisions at irreversible or high-blast-radius transitions.
  At **Critical** consequence (severe-harm irreversible transitions) the floor
  tightens further to **interactive-only**: a human decides in the moment, and
  pre-authorized policy does not qualify — the call cannot be reduced to
  discretion-free conditions ahead of time (the reducibility rule above).
- **`[Reserved]`** Whether gate **judgment** may ever be delegated to agent
  discretion (the strict delegated-agent path, distinct from policy) is
  deferred; the Lights-Out path is policy, not delegation, so v0.49 does not
  resolve it.
- When no valid mechanism can resolve a decision, the contract MUST produce an
  escalation/routing outcome: stop the affected action or transition; record the
  unresolved decision and available evidence; identify the reason and target
  authority; preserve state for eventual resolution. Escalation does not itself
  resolve the decision.

**Outputs.** The resolved decision (accept/proceed/release/stop) or an
escalation.

**Evidence.** The decision, the resolution mode, the evidence considered, and
the authorization record.

**Failure behavior.** Any routine human involvement pauses or exits a Lights-Out
run until the condition is resolved and the effective operating envelope is
re-established.

---

## Function Separation

Rationale:
[Operating Model Guide § Required Assurance](../guides/operating-model.md#required-assurance--how-independently-work-is-evaluated).
Coverage asks "is each function covered?"; separation asks "are the functions
that must stay apart actually apart?" Both gate the envelope.

**Applicability.** Stated over operating functions, not agents or personas.
Unless a requirement separates two functions, one provider MAY cover any
combination.

**Inputs.** The required separations; the achieved independence of the providers
or contexts covering the separated functions.

**Procedure.**

- Co-location is the default; separation is the named exception. A persona
  labeled "reviewer" satisfies a separation only through its **achieved
  independence**, never its name.
- Required separations are a floor a profile MAY strengthen and MUST NOT relax.
  A separation records the functions separated, the minimum required
  independence (using the [independence axes](#evaluator-independence)), when it
  applies, and the consequence if co-located.
- Required separations:

| Separated functions                                                                      | Minimum required independence                                                                                     | Applies when                                                                                       | Consequence if co-located                                                                             |
| ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Work execution ↔ assurance of that same work                                             | Context independence at minimum; foundational-context to claim premise validation; model independence recorded    | Any required assurance above None                                                                  | Claim capped at achieved independence; a same-context self-check supports mechanical conformance only |
| Work execution ↔ governance decision resolution for consequential/non-delegable outcomes | Authority human-owned or pre-authorized; the actor may resolve only explicitly delegated, bounded-scope decisions | Any acceptance/authorization decision; strictest for consequential, irreversible, or non-delegable | The decision and the action it gates leave the envelope; the run escalates                            |
| Acting agent ↔ escalation and stop enforcement for machine-evaluable conditions          | Independent of the actor; default-closed; evaluable without the actor's cooperation                               | Always for machine-evaluable stop conditions; required for any Lights-Out run                      | Stop cannot be relied upon; the run is not Lights-Out-eligible within the affected scope              |
| Evidence capture ↔ custody and integrity of that evidence                                | Durable, independently held record with correction history                                                        | Strength scales with required assurance, retention, and auditability                               | Evidence may not support the claimed assurance or audit level; higher-tier claims are capped          |

- Row 1's floor is satisfiable by context separation within a single provider
  (the context-independent grade); the higher rungs require a separate,
  organizationally or externally independent provider.
- Row 1's cap is **carried in the record**: a `[J]`-or-above discharge records
  its evidence-independence grade under
  [Canonical-State Spec § Record Requirements](canonical-state.md#record-requirements),
  so an enforcing tool can **read** — not infer — whether a floor item was
  self-asserted.
- **`[Reserved]`** The organizationally or externally independent rungs — Row
  1's org or external independence for Internal/External Assurance, and Row 4's
  tamper-evidence and external custody scaling with retention and audit
  obligations — are deferred beyond v0.49's solo Lights-Out scope; an enterprise
  profile raises these same separations toward them (see Failure behavior).

**Outputs.** The separation-conformance determination per required separation.

**Evidence.** For each separation: the functions separated, the achieved
independence, when it applied, and the recorded consequence on any violation.

**Failure behavior.** A violating co-location does not by itself fail the
project; it narrows the envelope — the affected action or claim falls outside
what may proceed, the assurance claim is capped, or the run becomes
Lights-Out-ineligible within the affected scope. Where the violation concerns
stop enforcement, the default-closed rule applies: the action does not proceed
unattended until independent enforcement is restored. **`[Reserved]`** An
enterprise profile raises these same separations toward organizational or
external independence — stronger independence on the same boundaries, no new
SDLC concerns.

---

## Evaluator Independence

Rationale:
[Operating Model Guide § Required Assurance](../guides/operating-model.md#required-assurance--how-independently-work-is-evaluated).

**Applicability.** Any required assurance above None, and any provider supplying
a required function (provider qualification).

**Inputs.** The independence axes; the provider's qualification evidence.

**Procedure.**

- Assurance claims MUST NOT exceed the independence actually achieved.
  Independence is modeled as axes, each a required property:
  - **Context independence** — the evaluator does not inherit the producer's
    in-session reasoning or working state.
  - **Foundational-context independence** — the evaluator does not inherit
    incorrect premises from shared standing context.
  - **Model independence** — an independent training lineage (typically a
    different vendor, not a different size of the same family); the evaluator
    MUST be no less capable than the producer.
  - **Organizational or external independence** — the evaluator is independent
    of aligned organizational incentives.
- The evaluator MUST receive the specification, rubric, and artifact, but NOT
  the producer's reasoning or justification. The achieved configuration MUST be
  recorded with the evidence so the claim is bounded by what was achieved.
- **Provider qualification.** A provider may supply a required function only to
  the extent its capability is demonstrated, scoped to the task domain and
  configuration, matched to the consequence level, and re-established after
  material provider, configuration, or domain change. Qualification and
  independence each separately cap the claim.
  - **Self-Assurance** rests on light qualification: a current, capable model
    performing adversarial evaluation against an explicit rubric.
  - **Internal Assurance** requires evidence that the provider reliably detects
    the defect classes it is credited with catching, including false-negative
    behavior.
  - **`[Reserved]` External or regulated Assurance** requires calibration
    against known-good and known-bad cases, independence evidence, and an
    examinable qualification record.
- **`[Informative]`** Where stronger axes are impractical, directing the
  evaluator to refute rather than confirm decorrelates evaluation stance under a
  shared model; it supplements rather than replaces model independence.

**Outputs.** The achieved-independence record that bounds the assurance claim.

**Evidence.** The achieved independence configuration, recorded with the
assurance evidence.

**Failure behavior.** A claim exceeding the achieved independence is invalid;
the envelope narrows for the affected scope, and the claim is capped at the
achieved level.

---

## Stop Enforcement

Rationale:
[Operating Model Guide § The Operating Envelope](../guides/operating-model.md#the-operating-envelope).
The normative stop-enforcement set below is binding but **validated against the
Primary Validation Scenario (WS5)** before it is treated as complete.

**Applicability.** Any Lights-Out run; the machine-evaluable conditions that
bound it.

**Inputs.** The declared stop conditions; the actor being bounded; the required
capability and evidence the conditions depend on.

**Procedure.**

- Stop enforcement MUST NOT depend on the acting agent's self-assessment. For
  machine-evaluable conditions it MUST be independent of the actor it bounds,
  default-closed when required capability or evidence is unavailable, and
  triggered by conditions evaluable without the actor's cooperation.
- Machine-evaluable conditions include: exceeded budget or resource ceiling;
  crossed authority boundary; unavailable required capability; failed
  verification; violated declared invariant.
- Stop enforcement is itself a required operating function: it MUST be shown to
  fire under its declared conditions and remain available throughout the run.

<!-- rule: OM-046 -->

### OM-046 — Semantic drift is not reliably machine-evaluable (bound blast radius)

- **Applicability.** Any Lights-Out run (as the enclosing contract); every claim
  about what stop enforcement can evaluate.
- **Inputs.** The declared stop conditions; the consequential failure modes of
  the work in scope.
- **Procedure.** **Semantic drift** — work technically in scope but no longer
  serving intent — is NOT reliably machine-evaluable, and the framework MUST NOT
  claim otherwise. Where consequential semantic failure cannot be detected, the
  run MUST bound blast radius: prefer reversible actions, constrain scope and
  effects, and require a checkpoint before any consequential or irreversible
  action.
- **Outputs.** Blast-radius bounds on the affected work; a required checkpoint
  before any consequential or irreversible action.
- **Evidence.** N/A — rides the enclosing contract's evidence (stop-condition
  definitions and firings).
- **Failure behavior.** N/A — as the enclosing contract: default-closed when
  required capability or evidence is unavailable.

<!-- /rule: OM-046 -->

<!-- rule: OM-047 -->

### OM-047 — Feasibility ceiling (bounded blast radius, else checkpoint)

- **Applicability.** Any run, or any action within a run, proposed to proceed
  unattended.
- **Inputs.** The machine-evaluability of the action's consequential failure
  modes; the blast-radius bounds in effect
  ([OM-046](#om-046--semantic-drift-is-not-reliably-machine-evaluable-bound-blast-radius)).
- **Procedure.** A run MAY proceed unattended only where its consequential
  failure modes are machine-evaluable or its blast radius is bounded; otherwise
  the affected actions MUST route to a checkpoint regardless of agent
  capability.
- **Outputs.** The unattended-eligibility determination for the affected
  actions.
- **Evidence.** N/A — rides the enclosing contract's evidence.
- **Failure behavior.** N/A — the checkpoint routing is the rule's own
  consequence (Procedure); no separate failure path is defined.

<!-- /rule: OM-047 -->

**Outputs.** Enforced stops and routed checkpoints.

**Evidence.** The stop-condition definitions; each firing; and evidence that
enforcement remained available throughout the run.

**Failure behavior.** When required capability or evidence is unavailable,
enforcement is default-closed: the action does not proceed unattended. Loss of
stop enforcement mid-run collapses the envelope that authorizes the run — the
affected scope is no longer Lights-Out-eligible.

---

## Scope Boundary

This spec defines the conceptual model and framework contracts. It does **not**
prescribe or require a policy engine, automated evaluator-qualification tooling,
an execution sandbox, an external stop-enforcement service, enterprise
compliance certification, or a complete implementation-specific Lights-Out
runtime. It fixes the semantics those implementations must satisfy, not their
storage or mechanism.

---

## Notes

**Last Updated:** 2026-07-16

Added to framework in v0.49.0.
