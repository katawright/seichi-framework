# Execution Spec

## Overview

Normative contracts for executor conduct — the closed-world rule, the read order
and load line, intake posture, the `[ASSUMED]` convention, the fallback
protocols and their precedence, session continuity, and the work-shape and
discovery judgment calls.

### Why These Contracts

The [Agentic Workflow Guide](../guides/agentic-workflow.md) and
[Session Protocol](../guides/session-protocol.md) explain how an agent should
conduct a session for a human reader. An agent running unattended, and a
conformance check deciding whether an executor honored the framework's conduct
rules, need the same content as rules: exact triggers, steps, and failure
behavior. These contracts are that form — the runtime-conduct register, distinct
from the configuration contracts in the
[Operating Model Spec](operating-model.md). Each links back to its guide for
rationale.

### Goals of This Spec

- Fix the **closed-world execution rule**: an executor acts only under a
  governing contract, and normative silence is a stop-and-escalate
- Fix the **load line** — what is always loaded, what defers, and what
  stage-scoping must never cost
- State the **`[ASSUMED]`** convention and its gate disposition, the **fallback
  protocols** and their precedence order (bound as data), and **session
  continuity** as executable contracts
- State the **work-shape sizing** and **mid-stage discovery** judgment calls

### Key Principle

An executor acts only under a governing contract. Missing coverage narrows what
may proceed; a situation no contract governs is a stop-and-escalate, and the
escalation **is** the deliverable — improvisation is a conformance violation,
not initiative.

### How to Use This Spec

1. Read [**Closed-World Execution**](#closed-world-execution) — the standing
   conduct rule everything else operates under
2. At session start, apply
   [**Read Order and the Load Line**](#read-order-and-the-load-line),
   [**Intake Posture and Register**](#intake-posture-and-register), and
   [**Session Continuity**](#session-continuity)
3. While working, apply
   [**The \[ASSUMED\] Convention**](#the-assumed-convention) and, on any
   obstacle, the [**Fallback Protocols**](#fallback-protocols) in their
   precedence order
4. For sizing and discovery calls, read
   [**Work-Shape and Discovery Judgment**](#work-shape-and-discovery-judgment)
5. For the human-facing rationale behind any contract, follow its link back to
   the [Agentic Workflow Guide](../guides/agentic-workflow.md) or
   [Session Protocol](../guides/session-protocol.md)

The six contract fields (Applicability, Inputs, Procedure, Outputs, Evidence,
Failure behavior) follow the [Contract Form](README.md#contract-form).

---

## Closed-World Execution

Rationale: the framework's Key Principles state the closed-world posture as
preamble ([spec index § Key Principle](README.md#key-principle);
[Operating Model Spec § Key Principle](operating-model.md#key-principle) —
"missing coverage narrows the envelope rather than silently proceeding"); this
rule makes situation-level silence citable and enforceable. Admitted during
Phase 3 Wave D per the design-review addendum (maintainer, 2026-07-16).

<!-- rule: AW-027 -->

### AW-027 — Closed-world execution (no action without a governing contract)

- **Applicability.** Every executor action in any run, at every operating
  posture; sharpest for unattended execution.
- **Inputs.** The governing contracts in scope for the action (the kernel rules
  and the enclosing spec contracts); the distinction between **normative
  silence** (no rule governs the action) and **epistemic uncertainty** (missing
  facts — which the coverage/envelope machinery and the
  [missing-input protocol](#aw-020--missing-input-protocol-derive-assumed-or-request)
  already handle).
- **Procedure.** An executor acts only under a governing contract. A situation
  no contract governs is a **stop-and-escalate**, and the escalation is the
  deliverable: producing a plausible improvised behavior in place of the stop is
  a conformance violation, not initiative. The trigger is normative silence only
  — ordinary ambiguity that a checklist or protocol absorbs (e.g., the
  [ambiguous-requirements protocol](#aw-023--ambiguous-requirements-protocol))
  is not silence, and a field-level "N/A — reason" inside a contract is an
  explicit answer, not an absence.
- **Outputs.** Either an action under a citable governing contract, or an
  escalation naming the ungoverned situation.
- **Evidence.** Every determination's citable governing rule (the trials'
  citation discipline is the observable); for a stop, the escalation record (per
  [Canonical-State Spec § Record Requirements](canonical-state.md#record-requirements)).
- **Failure behavior.** N/A — this rule is itself the framework's failure path
  for normative silence; its violation is detectable as an action with no
  citable governing rule ("the framework specifies; a tool enforces").

<!-- /rule: AW-027 -->

---

## Read Order and the Load Line

Rationale:
[Agentic Workflow Guide § Read Order and the Load Line](../guides/agentic-workflow.md#read-order-and-the-load-line).

<!-- rule: AW-016 -->

### AW-016 — Load line (Tier 0/1 read order)

- **Applicability.** Every session, at session start, regardless of stage or
  tier.
- **Inputs.** The framework corpus; the current stage and scenario.
- **Procedure.** Read **stage-scoped**, not whole-corpus: load the cross-cutting
  governance that binds throughout plus the current stage's material, and defer
  downstream stages' guides, references, and templates until the run reaches
  them. The always-loaded line:
  - **Tier 0 — classification core (read first, before anything else):**
    `INDEX.md`, `README.md`, `guides/agentic-workflow.md`,
    `guides/session-protocol.md`, and `guides/right-sizing.md` (with its spec,
    [right-sizing.md](right-sizing.md)) — enough to orient, classify the
    scenario, and classify governance weight **before** committing to any
    further read.
  - **Tier 1 — governance spine (loaded after Tier 0, applied at the weight Tier
    0 established):** `guides/operating-model.md` (with
    [operating-model.md](operating-model.md)), `guides/framework.md`,
    `guides/checkpoints.md` (with [checkpoints.md](checkpoints.md)),
    `guides/security.md` (the cross-cutting throughline), and `guides/stages.md`
    (the stage **map**, not the stage READMEs). These carry the non-delegable
    floor, the gate and checkpoint rules, the compliance hooks, and the security
    throughline; they are **never** scoped away by stage.
  - **Deferred:** each stage's README/checklist/reference and templates load
    when the run **enters** the stage; contextual guides load on their
    triggering condition (operations, learning-loop, delegated-run,
    parallel-batch, brownfield, roles, setup) — and never `guides/OVERVIEW.md`,
    the human-only orientation layer.
- **Outputs.** The session's loaded governance set.
- **Evidence.** N/A — the load line is a read discipline; conformance shows in
  conduct (classification before further reads, downstream guides unloaded).
- **Failure behavior.** The failure paths are the floor rules: stage-scoping
  never costs forward-visible constraints
  ([AW-018](#aw-018--stage-scoping-floor-defer-guides-never-constraints)), and
  lighter tiers thin what is materialized, never the line itself.

<!-- /rule: AW-016 -->

<!-- rule: AW-017 -->

### AW-017 — Capable-executor read-path contract

- **Applicability.** Executors operating at the `contracts-only` read path (the
  setting is
  [OM-008](operating-model.md#om-008--executor-read-path-setting-guided--contracts-only)'s
  rule; this contract is what the setting loads).
- **Inputs.** The declared `executor_read_path` setting; the spec layer, the
  right-sizing tables, and the templates.
- **Procedure.** Where the spec layer covers a contract, the spec (`spec/`), the
  right-sizing tables ([right-sizing.md](right-sizing.md)), and the templates
  are the intended read path for highly capable executors; the corresponding
  guides are rationale and scaffolding, pulled on demand. This is **not**
  self-sufficiency across the whole governance surface: the security
  throughline, checkpoints guidance, the stage map, and session orientation live
  only in guides, are part of the always-loaded spine
  ([AW-016](#aw-016--load-line-tier-01-read-order)), and bind every executor at
  the non-delegable floor regardless of capability.
- **Outputs.** The contracts-only executor's effective read set.
- **Evidence.** N/A — as the load line: conformance shows in conduct.
- **Failure behavior.** N/A — an executor that needs the guides pulls them on
  demand; the read path is a declared setting reviewed by the retrospective's
  specification-depth calibration
  ([OM-008](operating-model.md#om-008--executor-read-path-setting-guided--contracts-only)),
  not a bar it can fail.

<!-- /rule: AW-017 -->

<!-- rule: AW-018 -->

### AW-018 — Stage-scoping floor (defer guides, never constraints)

- **Applicability.** Every stage-scoped read decision under the load line
  ([AW-016](#aw-016--load-line-tier-01-read-order)), at every tier.
- **Inputs.** The stage map (`guides/stages.md` — each stage's inputs and
  outputs); the traceability chain
  ([FW-005b](canonical-state.md#fw-005b--traceability-id-conventions-and-chain-topology)).
- **Procedure.**
  - **Forward references stay visible.** A downstream constraint that should
    shape an early decision — e.g., a Verification requirement that affects
    System Design — remains visible even though the downstream stage's full
    guide has not loaded; the always-loaded stage map carries each stage's
    inputs and outputs for exactly this reason, and the traceability chain is
    governance, honored throughout. Defer downstream **guides**, never
    downstream **constraints**.
  - **The load line is a floor, not a ceremony budget.** Lighter tiers thin how
    much of the governance spine is materialized and applied; they never scope
    the line away by stage, and never below the compliance or non-delegable
    floor.
- **Outputs.** N/A — a constraint on
  [AW-016](#aw-016--load-line-tier-01-read-order)'s scoping, not a producer of
  state.
- **Evidence.** N/A — as the load line.
- **Failure behavior.** N/A — this rule is itself the load line's floor; a
  scoping decision that hides a downstream constraint or thins a floor is a
  violation of this rule, not a recoverable state.

<!-- /rule: AW-018 -->

---

## Intake Posture and Register

Rationale:
[Session Protocol § Orient — classify the scenario](../guides/session-protocol.md#orient--classify-the-scenario-first-contact)
and
[Agentic Workflow Guide § Classification by Inference](../guides/agentic-workflow.md#classification-by-inference).

<!-- rule: SP-004 -->

### SP-004 — Idea-for-a-new-project runs the idea-formation interview

- **Applicability.** First contact in an existing workspace (`projects/`
  present) where the operator has only an **idea** for a new project — not a
  formed name + description.
- **Inputs.** The scenario classification's environment read; the operator's
  framing.
- **Procedure.** Run the idea-formation interview (the zero-to-one route) within
  the workspace **before** scaffolding — the add-a-project route assumes a
  formed project.
- **Outputs.** The interview's Initiation-ready inputs, then the add-a-project
  scaffold.
- **Evidence.** N/A — as the intake conversation; the interview's output seeds
  the Initiation Brief.
- **Failure behavior.** N/A — no separate failure path; scaffolding an unformed
  idea is the error this rule exists to prevent.

<!-- /rule: SP-004 -->

<!-- rule: SP-006 -->

### SP-006 — Expert-consultant posture and plain-language calibration

- **Applicability.** First contact with an operator; suppressed on a known
  continuation.
- **Inputs.** The operator's goals and technical comfort, read from their
  framing (see
  [AW-010](#aw-010--calibrate-register-from-the-operators-speech-never-ask)).
- **Procedure.** Adopt an expert-consultant posture calibrated to the operator's
  goals and technical comfort (the cross-functional-accessibility principle).
  Part of that posture is making it safe to ask: on first contact, tell the
  operator they can ask for a plain-language explanation of any term,
  abbreviation, or concept at any time — one sentence, never a glossary dump,
  warmest on the idea-only path. Offer it once and, like the orientation,
  suppress it on continuation.
- **Outputs.** N/A — a conduct rule; no state is produced.
- **Evidence.** N/A — conversational conduct.
- **Failure behavior.** N/A — no failure path is defined for posture.

<!-- /rule: SP-006 -->

<!-- rule: AW-010 -->

### AW-010 — Calibrate register from the operator's speech (never ask)

- **Applicability.** Every intake conversation and its continuation — the
  register calibration that rides
  [AW-004](operating-model.md#aw-004--six-project-configuration-decisions-set-at-intake)'s
  inference.
- **Inputs.** How the operator talks — their vocabulary, the questions they ask,
  how they answer.
- **Procedure.** Read the operator's technical comfort the same way the six
  configuration decisions are read — from their speech, never by asking them to
  rate themselves. A "how technical are you?" question fronts the classification
  exactly as a taxonomy menu does
  ([AW-004a](operating-model.md#aw-004a--configuration-decisions-never-fronted-as-menus-at-first-contact))
  and can read as patronizing. Adjust wording and pace to the comfort inferred,
  holding to cross-functional accessibility. A calibration woven into the
  interview — no new phase, no ceremony.
- **Outputs.** The calibrated register.
- **Evidence.** N/A — conversational conduct.
- **Failure behavior.** N/A — no failure path is defined; the calibration is
  continuous.

<!-- /rule: AW-010 -->

---

## The [ASSUMED] Convention

Rationale:
[Agentic Workflow Guide § Classification by Inference](../guides/agentic-workflow.md#classification-by-inference)
and
[§ Reviewing \[ASSUMED\] Items](../guides/agentic-workflow.md#reviewing-assumed-items).

<!-- rule: AW-006 -->

### AW-006 — Assumed-classification convention (derived classifications as overridable assumptions)

- **Applicability.** Every derived classification and every derived input —
  anything the executor infers rather than receives.
- **Inputs.** The inference and its basis (the conversational signals or context
  it was derived from).
- **Procedure.** Present derived values as **overridable assumptions** using the
  `[ASSUMED]` tag, recorded where the value lives (classifications in the
  Initiation Brief's right-sizing section), clearly stating what was assumed and
  why — with an explicit "say the word and any of these change" invitation.
  Inferred values are hypotheses: they are confirmed at the next gate like any
  other `[ASSUMED]` item
  ([AW-021](#aw-021--assumed-classification-gate-disposition-confirm--challenge--carry-forward)).
- **Outputs.** The tagged, overridable assumption in its artifact.
- **Evidence.** The `[ASSUMED]` tag and its stated basis.
- **Failure behavior.** The failure path is the gate rule: no gate passage with
  unaddressed `[ASSUMED]` items
  ([AW-021](#aw-021--assumed-classification-gate-disposition-confirm--challenge--carry-forward)).

<!-- /rule: AW-006 -->

<!-- rule: AW-021 -->

### AW-021 — Assumed-classification gate disposition (confirm / challenge / carry forward)

- **Applicability.** Every `[ASSUMED]` item on every artifact reaching gate
  review.
- **Inputs.** The artifact's `[ASSUMED]` items and the evidence available at the
  gate.
- **Procedure.** Every `[ASSUMED]` item requires an explicit disposition:
  - **Confirm** — the assumption has been verified as correct. Remove the
    `[ASSUMED]` tag and update the artifact.
  - **Challenge** — the assumption is incorrect or needs revision. Correct the
    content, remove the `[ASSUMED]` tag, and note the correction.
  - **Carry forward** — the assumption cannot be verified at this gate (e.g.,
    depends on future discovery). Leave the tag, document the item as a
    condition in the [Gate Decision Template](../templates/gate-decision.md),
    and assign an owner to resolve it before the next gate.
- **Outputs.** A recorded disposition per `[ASSUMED]` item.
- **Evidence.** The dispositions in the gate record; carried-forward items as
  tracked conditions
  ([CP-001](checkpoints.md#cp-001--checkpoint-types-and-closed-outcome-sets-gate--review--alignment)'s
  carry-forward device).
- **Failure behavior.** Do not proceed past a gate with unaddressed `[ASSUMED]`
  items — each one must have a recorded disposition.

<!-- /rule: AW-021 -->

---

## Fallback Protocols

Rationale:
[Agentic Workflow Guide § Error and Fallback Guidance](../guides/agentic-workflow.md#error-and-fallback-guidance).
Stage-specific fallback guidance in `stages/<stage>/reference.md` extends these
central protocols; where a stage-specific protocol contradicts them, the
stage-specific protocol takes precedence for that stage, and stage-specific
protocols apply at all operating postures unless the stage reference explicitly
restricts them.

<!-- rule: AW-019 -->

### AW-019 — Supervised fallback discipline (halt and present)

- **Applicability.** Any fallback condition arising at the **Supervised**
  posture.
- **Inputs.** The condition; the run's operating posture.
- **Procedure.** At the Supervised posture the agent surfaces the situation and
  a human acts before the agent derives inputs or attempts gate remediation:
  halt and present the situation to the human rather than acting autonomously.
  The protocols below assume Checkpointed or Lights-Out postures.
- **Outputs.** The presented situation, awaiting the human.
- **Evidence.** The halt and its presented context (session log; for a floor
  stop, the escalation record per
  [AW-027](#aw-027--closed-world-execution-no-action-without-a-governing-contract)).
- **Failure behavior.** N/A — halting is this rule's own content, not its
  exception path.

<!-- /rule: AW-019 -->

<!-- rule: AW-020 -->

### AW-020 — Missing-input protocol (derive assumed, or request)

- **Applicability.** An expected input artifact is unavailable or incomplete
  (Checkpointed or Lights-Out posture; at Supervised,
  [AW-019](#aw-019--supervised-fallback-discipline-halt-and-present)).
- **Inputs.** The missing input's declaration (stage README front matter); the
  available context.
- **Procedure.**
  1. Check whether the input can be derived from available context.
  2. If derivable, produce the input and flag it with `[ASSUMED]` — clearly
     state what was assumed and why
     ([AW-006](#aw-006--assumed-classification-convention-derived-classifications-as-overridable-assumptions)).
  3. If not derivable, request the input from the human.
  4. Do not proceed past a gate with assumed inputs unless the human explicitly
     approves.
- **Outputs.** The derived (`[ASSUMED]`-tagged) or requested input.
- **Evidence.** The `[ASSUMED]` flag and its stated basis.
- **Failure behavior.** A gate reached with assumed inputs and no explicit human
  approval does not pass; if the human is unreachable, the precedence order
  ([AW-025](#aw-025--fallback-precedence-order)) governs.

<!-- /rule: AW-020 -->

<!-- rule: AW-022 -->

### AW-022 — Failed-gate protocol

- **Applicability.** A gate check fails — checklist criteria not met, tests
  failing, or review rejected (Checkpointed or Lights-Out posture).
- **Inputs.** The gate's failure reason; the gate's class (hard gate or other).
- **Procedure.**
  1. Document the specific failure reason.
  2. Attempt remediation (fix the issue, update the artifact).
  3. Re-run the gate check.
  4. If remediation fails after one retry, escalate to the human with a summary
     of what was tried.

  At **hard gates** (Gate 1, Gate 2), skip autonomous remediation — escalate to
  the human immediately with the failure reason and do not re-run the gate check
  without human direction.

- **Outputs.** A remediated re-check or an escalation.
- **Evidence.** The documented failure reason and remediation record.
- **Failure behavior.** The escalation is the failure path, and it is bounded:
  one autonomous retry at non-hard gates, none at hard gates.

<!-- /rule: AW-022 -->

<!-- rule: AW-023 -->

### AW-023 — Ambiguous-requirements protocol

- **Applicability.** Requirements that can be interpreted multiple ways
  (Checkpointed or Lights-Out posture).
- **Inputs.** The ambiguous requirement and its context.
- **Procedure.**
  1. List all reasonable interpretations.
  2. Assess risk and effort for each interpretation.
  3. Recommend the interpretation with the lowest risk.
  4. Request the human to confirm before proceeding.
  5. Document the decision and rationale.
- **Outputs.** The confirmed interpretation and its recorded rationale.
- **Evidence.** The documented decision and rationale.
- **Failure behavior.** If the human is unreachable, the precedence order
  ([AW-025](#aw-025--fallback-precedence-order)) governs — ambiguity resolves
  last, after inputs and human availability are determined.

<!-- /rule: AW-023 -->

<!-- rule: AW-024 -->

### AW-024 — Unreachable-human protocol

- **Applicability.** The agent needs human input but cannot get it (async
  workflow, human unavailable).
- **Inputs.** The pending decision or input; the gate type; the operating
  posture.
- **Procedure.**
  1. Continue with the lowest-risk option.
  2. Flag every decision made without human input.
  3. Compile a decision log for the human to review when available.
  4. Do not proceed past hard gates (Gate 1, Gate 2) without human approval.
  5. At the Supervised posture, halt and log all context for human review rather
     than continuing autonomously
     ([AW-019](#aw-019--supervised-fallback-discipline-halt-and-present)).
  6. At the Checkpointed posture, "continue" means continue work within the
     current stage only — do not advance to the next stage or pass a gate
     without human approval.
- **Outputs.** Continued lowest-risk work with flagged decisions, or a halt at
  the governing boundary.
- **Evidence.** The decision log — every decision made without human input,
  flagged, ready for review on the human's return.
- **Failure behavior.** A hard gate reached while the human is unreachable is a
  halt, never a pass — the compound-condition rule
  ([AW-025](#aw-025--fallback-precedence-order)) states it with precedence.

<!-- /rule: AW-024 -->

<!-- rule: AW-025 -->

### AW-025 — Fallback precedence order

- **Applicability.** Multiple fallback conditions applying simultaneously.
- **Inputs.** The ordered precedence list `fallback_precedence` in
  [`vocabulary/execution.yaml`](vocabulary/execution.yaml) binds as data —
  position is precedence (generated view:
  [reference.md](generated/reference.md)); the active conditions.
- **Procedure.** Resolve in order:
  1. **Hard gate constraints take priority** (`hard-gate-constraint`) — if a
     hard gate blocks and the human is unreachable, log all context and halt. Do
     not proceed past hard gates without human approval under any circumstances.
     Attempt to derive missing inputs with the `[ASSUMED]` flag before halting,
     so context is maximally prepared for human review upon return.
  2. **Unreachable human** (`unreachable-human`) — determine whether to wait or
     continue based on gate type and operating posture
     ([AW-024](#aw-024--unreachable-human-protocol)).
  3. **Missing input** (`missing-input`) — attempt to derive or request
     ([AW-020](#aw-020--missing-input-protocol-derive-assumed-or-request)); if
     the human is unreachable, follow the steps above.
  4. **Ambiguous requirements** (`ambiguous-requirements`) — lowest priority;
     resolve after inputs and human availability are determined
     ([AW-023](#aw-023--ambiguous-requirements-protocol)).
- **Outputs.** The resolution order for the active conditions.
- **Evidence.** N/A — rides the resolved protocols' own evidence.
- **Failure behavior.** N/A — this rule is itself the compound-condition failure
  path for the protocols it orders.

<!-- /rule: AW-025 -->

---

## Session Continuity

Rationale:
[Agentic Workflow Guide § Session Continuity Protocol](../guides/agentic-workflow.md#session-continuity-protocol)
(narrative and edge cases) and the
[Session Protocol](../guides/session-protocol.md) (the operational
quick-reference the brief templates link).

<!-- rule: AW-026 -->

### AW-026 — Session-continuity read-on-start / write-on-end

- **Applicability.** Multi-session work — every session of it, across sessions,
  agents, or participants.
- **Inputs.** The stage's session log (per-stage files, from the
  [Session Log](../templates/session-log.md) template or the
  [Implementation Session Log](../templates/implementation-session-log.md) for
  the Implementation stage).
- **Procedure.** Multi-session work requires explicit context handoff.
  - **Read on start:** read the current stage's session log (if one exists);
    review the last entry's "Context for Next Session" and "Next Steps"; check
    artifact progress; confirm understanding with the human before proceeding.
  - **Write on end:** update the session log with a new entry — what was
    completed, in progress, and decided; deviations from the design brief (where
    implementation diverged from plan and why); blockers; "Context for Next
    Session" (what the next agent/human needs to continue without re-reading
    everything); actionable "Next Steps"; and any in-the-moment friction,
    appended to the project's friction log.
- **Outputs.** The updated session log entry.
- **Evidence.** The session log itself; `[J]`/`[H]` items recorded at the
  required identity grade per
  [Canonical-State Spec § Record Requirements](canonical-state.md#record-requirements).
- **Failure behavior.** N/A — a session that skips the read starts blind and a
  session that skips the write strands its successor; the step lists
  ([SP-008](#sp-008--continue-a-known-project-session-steps),
  [SP-009](#sp-009--session-end-steps)) are the executable form.

<!-- /rule: AW-026 -->

<!-- rule: SP-008 -->

### SP-008 — Continue-a-known-project session steps

- **Applicability.** Session start on a known continuation — a project in the
  workspace's `## Active` bucket, meaning **any non-terminal project, not only
  the `active` lifecycle state**. Step 1's working-location guard applies more
  widely than the rest: **no session start on any route may operate from the
  read-only framework directory.**
- **Inputs.** The user request; `projects/<name>/project.md`; the stage's
  session log; the canonical state's open carry-forward conditions.
- **Procedure.**
  1. **Confirm the working location** — an artifacts or source-code location,
     never the read-only framework directory.
  2. Identify stage and increment from the user request or
     `projects/<name>/project.md`.
  3. Open the session log at `projects/<name>/docs/session-logs/<stage>.md` (or
     `<stage>-<increment>.md` for incremented stages); if it does not exist,
     create it from the appropriate template.
  4. Read the most recent session entry's "Context for Next Session" block.
  5. **Re-check open carry-forward conditions** — re-read any open
     gate/checkpoint "proceed with conditions" obligations from the canonical
     state and report each one's status (satisfied, still open, blocked, or
     withdrawn) before starting stage work. A stage cannot close over a
     condition due within it while it remains open.
  6. Read the current stage README and the brief for this stage/increment if one
     exists.
  7. Append a new session entry header with today's date and participant.
- **Outputs.** An oriented session with an open log entry.
- **Evidence.** The appended session entry header; the reported carry-forward
  statuses.
- **Failure behavior.** Operating from the framework directory is a stop: tell
  the user and redirect to their project's artifacts or source-code workspace.

<!-- /rule: SP-008 -->

<!-- rule: SP-009 -->

### SP-009 — Session-end steps

- **Applicability.** The end of every session.
- **Inputs.** The session's work; the open session log entry.
- **Procedure.**
  1. Fill in the new session entry: Completed, In Progress, Decisions Made,
     Deviations from Plan, `[H]` / `[J]` Items, Context for Next Session.
  2. Update the file's `Last Updated` header.
  3. Update the `Artifact Progress` table if any artifact changed state.
  4. If any friction surfaced this session — process, execution, product, or
     tooling — append an entry to the project's friction log.
- **Outputs.** The completed session entry.
- **Evidence.** For each `[J]` or `[H]` item, the evaluator at the required
  identity grade, the required timestamps, and the **evidence-independence
  grade** the evaluation stood at
  ([Record Requirements](canonical-state.md#record-requirements),
  [CS-084](canonical-state.md#cs-084--evidence-independence-grade)).
- **Failure behavior.** N/A — as
  [AW-026](#aw-026--session-continuity-read-on-start--write-on-end): a skipped
  write strands the successor session.

<!-- /rule: SP-009 -->

---

## Work-Shape and Discovery Judgment

Rationale:
[Stages Guide § When to Use Flow](../guides/stages.md#when-to-use-flow) and
[Framework Guide § Mid-Stage Discovery](../guides/framework.md#mid-stage-discovery).

<!-- rule: ST-006 -->

### ST-006 — When-to-use-Flow sizing call

- **Applicability.** Any incoming change that changes the software, when
  choosing its work-shape (Flow item vs. project).
- **Inputs.** The change's scope, architectural impact, and consequence
  ([RS-003](right-sizing.md#rs-003--consequence-assigned-by-judgment-to-the-nearest-anchor)).
- **Procedure.** Flow is for small, ad-hoc changes that **change the software**
  — a button-text fix, a small enhancement, a low-risk patch: delivery work (not
  Operations) that is small and self-contained enough not to warrant a project's
  Initiation and Closure. A change that is substantial — new scope,
  architectural impact, a real investment decision — is a **project**, not a
  Flow item. When in doubt, size by consequence: if it needs a Gate-1-style
  investment decision, it is a project.
- **Outputs.** The work-shape determination (Flow item or project).
- **Evidence.** N/A — for a Flow item, the approved issue itself carries the
  folded consequence-sizing; for a project, Initiation records it.
- **Failure behavior.** N/A — the when-in-doubt rule is the tiebreak
  (Procedure); a mis-sized Flow item that grows real investment weight re-enters
  as a project.

<!-- /rule: ST-006 -->

<!-- rule: FW-009 -->

### FW-009 — Impact-assessment two-question spectrums

- **Applicability.** A mid-stage discovery that **breaks something** — a design
  proves infeasible, an NFR is unmet, an assumption is invalidated (the Assess
  path of the
  [mid-stage discovery decision tree](../guides/framework.md#mid-stage-discovery)).
- **Inputs.** The discovery; project context — remaining budget, schedule
  health, risk appetite.
- **Procedure.** Answer two independent diagnostic questions. Both are
  **spectrums requiring judgment**, not binary gates:
  1. **Does this change the design?** From a localized tweak to an architectural
     shift; changes further along the spectrum are more likely to warrant an ADR
     capturing rationale and trade-offs.
  2. **Does this affect the investment assumptions (cost, schedule, risk)?**
     From negligible to project-threatening, read against project health.
     Material changes warrant re-evaluating the gate decision: convene the
     original decision-makers, present updated evidence, and record the new
     decision in the **original gate record** — even if that decision is to
     continue as planned.

  Design changes are recorded as ADRs with delta-only briefs; assessment does
  not always mean immediate action — when the right response isn't clear or
  urgent, capture the discovery and the assessment so far, then revisit.

- **Outputs.** The assessed response — from a fix in place, through an ADR and
  delta-only brief, to a gate re-evaluation (which may stop the project).
- **Evidence.** The ADR (design changes) and/or the amended original gate record
  (investment re-evaluations).
- **Failure behavior.** N/A — stopping the project is a legal outcome of the
  assessment, not this rule's failure path.

<!-- /rule: FW-009 -->

---

## Scope Boundary

This spec fixes executor conduct. It does not set the operating configuration
(the [Operating Model Spec](operating-model.md) does), does not define the
checkpoint outcomes conduct routes to (the [Checkpoints Spec](checkpoints.md)
does), and does not prescribe session-log storage or tooling (semantics, not
storage).

---

## Notes

**Last Updated:** 2026-07-18

Added to framework in v0.64.0.
