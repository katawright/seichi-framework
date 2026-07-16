# Right-Sizing Spec

## Overview

Normative contracts for right-sizing — the governance-weight scale: the five
consequence anchors and the judgment rule that assigns a project to one, the
per-stage scaling matrices for the three dimensions, and the
minimum-viable-artifacts matrix that decides which template views a project
renders.

### Why These Contracts

The [Right-Sizing Guide](../guides/right-sizing.md) explains the three-dimension
model for a human operator — why consequence, compliance, and stakeholder reach
are separate dials and how to reason about each. An agent classifying a project
at intake, sizing a stage's practices, or deciding which briefs to render — and
a conformance check deciding whether a tool honors the weight a classification
sets — need the same model as rules: exact applicability, inputs, and failure
behavior. These contracts are that form. Each links back to the guide for
rationale.

### Goals of This Spec

- Fix the five **consequence anchors** as a closed scale bound to kernel data,
  and the nearest-anchor judgment rule that assigns a project to one
- State how each dimension — consequence, compliance, stakeholder reach — scales
  every stage, as normative matrices
- Fix the **minimum-viable-artifacts** matrix — which template views are
  rendered as formal artifacts at which consequence level

### Key Principle

Process weight is matched to the project's actual consequence, obligations, and
stakeholder reach — three independent dimensions, set separately and stacked per
stage. Consequence sets soft, graduated floors; compliance sets hard,
categorical ones. The floors these dimensions place on the operating model are
stated in the
[Operating Model Spec](operating-model.md#governance-floors-and-capability-ceilings);
this spec fixes the scale itself and its per-stage consequences.

### How to Use This Spec

1. Classify consequence against the
   [**Consequence Anchors**](#consequence-anchors)
2. Read [**Per-Stage Scaling**](#per-stage-scaling) for what each dimension adds
   at each stage — the three matrices stack
3. Read [**Minimum Viable Artifacts**](#minimum-viable-artifacts) for which
   template views the classification renders
4. For the human-facing rationale behind any contract, follow its link back to
   the [Right-Sizing Guide](../guides/right-sizing.md)

The six contract fields (Applicability, Inputs, Procedure, Outputs, Evidence,
Failure behavior) follow the [Contract Form](README.md#contract-form).

---

## Consequence Anchors

Rationale:
[Right-Sizing Guide § Consequence → What Practices](../guides/right-sizing.md#consequence--_what_-practices).

<!-- rule: RS-002 -->

### RS-002 — Consequence anchors (five-tier harm scale)

- **Applicability.** Every consequence classification — project intake and any
  re-size — and every contract that consumes a consequence level (the floor
  mapping
  [OM-017](operating-model.md#governance-floors-and-capability-ceilings), the
  per-stage matrices below).
- **Inputs.** The closed anchor set `consequence_tier` in
  [`vocabulary/config.yaml`](vocabulary/config.yaml) — `negligible` | `low` |
  `moderate` | `high` | `critical` — binds as data (generated view:
  [reference.md](generated/reference.md)).
- **Procedure.** The normative anchor semantics — consequence is a **magnitude
  of harm**, read along three properties: **blast radius** (who and how much is
  affected if it fails), **reversibility** (how easily a bad outcome is undone),
  and **detectability** (whether a failure would be noticed before it does
  harm). Read together, they place a project against the anchors:

  | Anchor (identifier)           | Harm if it fails                                                                         |
  | ----------------------------- | ---------------------------------------------------------------------------------------- |
  | **Negligible** (`negligible`) | Affects essentially no one beyond the builder; fully reversible — toy, spike, experiment |
  | **Low** (`low`)               | Small known group (a few internal users, a team); inconvenient, easily recovered         |
  | **Moderate** (`moderate`)     | Real users or dependent teams/services; meaningful cost; recoverable with effort         |
  | **High** (`high`)             | Wide-reaching, costly, slow or hard to reverse — serious financial/operational harm      |
  | **Critical** (`critical`)     | Irreversible severe harm — safety, life, catastrophic financial/legal                    |

  The scale measures _harm_, not _governance_: every level keeps the framework's
  structure — "what are we building," goals and requirements, a high-level
  design, an increment plan. What scales is ceremony and decision rights.

- **Outputs.** N/A — the anchors are a vocabulary; a project's classification is
  produced by the assignment rule
  ([RS-003](#rs-003--consequence-assigned-by-judgment-to-the-nearest-anchor)).
- **Evidence.** N/A — evidence attaches to the classification record
  ([RS-003](#rs-003--consequence-assigned-by-judgment-to-the-nearest-anchor)).
- **Failure behavior.** A consequence value outside the closed set is not a
  valid classification. A magnitude the five anchors cannot express is a
  framework gap to raise, not a sixth tier to coin.

<!-- /rule: RS-002 -->

<!-- rule: RS-003 -->

### RS-003 — Consequence assigned by judgment to the nearest anchor

- **Applicability.** Every consequence classification (intake and any re-size).
- **Inputs.** The anchor set
  ([RS-002](#rs-002--consequence-anchors-five-tier-harm-scale)); the project's
  blast radius, reversibility, and detectability, read from context.
- **Procedure.** Consequence is assigned by **judgment, not measurement** — harm
  has no units, so no project lands exactly on an anchor; the classifier matches
  the project to the **nearest** anchor. A coarse scale is enough because what
  consequence drives — which practices run, which decisions stay human — comes
  in steps, not a smooth dial. When a project falls between two anchors, lean to
  the heavier one when a failure would be hard to undo or hit many people, and
  to the lighter one when it is cheap to reverse.
- **Outputs.** The assigned consequence anchor.
- **Evidence.** The recorded classification — surfaced as an overridable
  `[ASSUMED]` default when inferred at intake
  ([AW-004](../guides/agentic-workflow.md#classification-by-inference)).
- **Failure behavior.** The failure path is the intake contract's rule: when
  signals are missing or conflict, the inference defaults conservatively — the
  safer, heavier value, flagged for confirmation
  ([AW-004](../guides/agentic-workflow.md#classification-by-inference)).

<!-- /rule: RS-003 -->

---

## Per-Stage Scaling

Rationale:
[Right-Sizing Guide § How Each Dimension Shapes the Stages](../guides/right-sizing.md#how-each-dimension-shapes-the-stages)
and
[§ Reading the Three Together](../guides/right-sizing.md#reading-the-three-together)
— the three matrices are additive and independent: for any one stage, all three
apply and stack.

<!-- rule: RS-015 -->

### RS-015 — Consequence-by-stage scaling matrix

- **Applicability.** Every stage and the standing
  [Operations](../guides/operations.md) process, at every consequence level;
  read stacked with [RS-016](#rs-016--compliance-by-stage-additions-table) and
  [RS-017](#rs-017--reach-by-stage-formality-matrix).
- **Inputs.** The project's assigned consequence anchor
  ([RS-003](#rs-003--consequence-assigned-by-judgment-to-the-nearest-anchor));
  the closed anchor set is
  [RS-002](#rs-002--consequence-anchors-five-tier-harm-scale)'s
  `consequence_tier` data.
- **Procedure.** Consequence scales **technical rigor and blast-radius control**
  — verification depth, failure handling, and reversibility (verification is the
  steepest). The normative matrix — the columns are the five anchors:

  | Stage / Process                                              | Negligible                             | Low                                     | Moderate                                                | High                                                              | Critical                                                                   |
  | ------------------------------------------------------------ | -------------------------------------- | --------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------- |
  | **[Initiation](../stages/initiation/README.md)**             | Intent stated in a sentence            | One-line problem statement              | Explicit, measurable success criteria                   | Named risks; failure modes pinned down before building            | Failure/hazard analysis; mandatory authorization to proceed                |
  | **[Requirements](../stages/requirements/README.md)**         | Happy path held in conversation        | Core happy-path stories                 | Documented NFRs (performance, reliability, security)    | Edge and failure cases; failure handling becomes a requirement    | Exhaustive spec incl. failure/safety requirements; human sign-off          |
  | **[System Design](../stages/system-design/README.md)**       | A mental model; key choice noted       | Informal notes                          | Documented architecture; ADRs for consequential choices | Explicit failure-mode, recovery, and blast-radius design          | Formal architecture and failure/safety review before build                 |
  | **[Increment Design](../stages/increment-design/README.md)** | Implied next step                      | Task list                               | Component specs, interface contracts                    | Per-increment test and risk strategy                              | Risk-assessed plan; consequential increments gated to a human              |
  | **[Implementation](../stages/implementation/README.md)**     | Working code                           | Working code with smoke tests           | Coverage targets on critical paths                      | Defensive handling and instrumentation                            | Comprehensive coverage; consequential changes reviewed by a human          |
  | **[Verification](../stages/verification/README.md)**         | Does it run?                           | Manual checks                           | Automated integration/functional suites                 | Performance, security, and accessibility testing; formal go/no-go | Independent verification; mandatory (non-waivable) go/no-go                |
  | **[Deployment](../stages/deployment/README.md)**             | Run it locally                         | Manual push                             | CI/CD with staging and rollback                         | Canary/blue-green and progressive rollout                         | Progressive rollout with mandatory approval gates; rehearsed rollback      |
  | **[Closure](../stages/closure/README.md)**                   | Recorded paragraph; nothing to operate | Self-accepted handoff + brief close-out | Handoff record + reconciled close-out summary           | Formal acceptance; complete completion-evidence package           | Non-delegable acceptance of irreversible closure; full evidence + sign-off |
  | **[Operations](../guides/operations.md)** _(process)_        | Notice if it breaks                    | Health check                            | APM, alerting, and on-call                              | Full observability and incident management                        | 24×7 monitoring and incident management; fast detection and recovery       |

  Column readings: **Negligible** keeps the full structure but folds ceremony
  into a conversation and a quick review (the
  [folded path](../guides/right-sizing.md#the-negligible-folded-path));
  **Critical** makes consequential, irreversible actions non-delegable human
  gates — bounded pauses within a run, not a blanket Lights-Out ban (an outright
  ban comes from compliance or a capability gap; the floor mapping is
  [OM-017](operating-model.md#governance-floors-and-capability-ceilings)).

- **Outputs.** The consequence-driven practice set per stage.
- **Evidence.** N/A — the matrix is consumed at planning; its application shows
  in the stage artifacts and gate records it calls for.
- **Failure behavior.** N/A — the matrix defines the scale and has no failure
  path of its own; consequence floors are soft and graduated, and the
  below-floor rule is
  [OM-017](operating-model.md#governance-floors-and-capability-ceilings)'s.

<!-- /rule: RS-015 -->

<!-- rule: RS-016 -->

### RS-016 — Compliance-by-stage additions table

- **Applicability.** Every stage and the standing
  [Operations](../guides/operations.md) process, wherever one or more compliance
  obligations apply (per scope); read stacked with
  [RS-015](#rs-015--consequence-by-stage-scaling-matrix) and
  [RS-017](#rs-017--reach-by-stage-formality-matrix).
- **Inputs.** The project's active compliance obligation set — sources, scopes,
  and payloads
  ([Right-Sizing Guide § Compliance → Mandatory Obligations](../guides/right-sizing.md#compliance--mandatory-obligations)).
- **Procedure.** Compliance is a flag (per scope). Where it applies, it adds
  **mandatory evidence, sign-off, and auditability** — present or absent, with
  the specifics set by the regime (the mapping library), not by a gradient. The
  normative additions:

  | Stage / Process            | What compliance adds when it applies                                                                                                                              |
  | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | **Initiation**             | Identify applicable regimes and obligations; record authorization and compliance scope in the brief.                                                              |
  | **Requirements**           | Capture compliance requirements explicitly and traceably; classify data; obtain documented sign-off.                                                              |
  | **System Design**          | Compliance-by-design (data residency, encryption, access control, privacy); documented security/privacy design review; compliance rationale recorded in ADRs.     |
  | **Increment Design**       | Trace each increment to the compliance requirements it satisfies; risk assessment where the regime mandates it.                                                   |
  | **Implementation**         | Audit trail of changes, separation of duties (author ≠ approver), mandated security scanning, controlled-change records.                                          |
  | **Verification**           | Independent or external assurance; retained, auditable test evidence; regime-specific testing (security pen-test, accessibility conformance).                     |
  | **Deployment**             | Change-management approval records, segregation of duties in release, controlled production access, documented deployment evidence.                               |
  | **Closure**                | Capture persisting compliance obligations in the handoff record; retain the completion-evidence package for audit; non-delegable acceptance of regulated closure. |
  | **Operations** _(process)_ | Audit logging and evidence retention; mandated incident reporting (e.g. breach notification); contractual SLA records.                                            |

- **Outputs.** The mandatory additions per stage for the active obligations.
- **Evidence.** The retained, auditable evidence the additions themselves
  mandate (audit trails, sign-offs, records).
- **Failure behavior.** Compliance floors are hard and categorical: an addition
  the regime mandates is not waivable by consequence or preset
  ([Operating Model Spec § Governance Floors and Capability Ceilings](operating-model.md#governance-floors-and-capability-ceilings)).

<!-- /rule: RS-016 -->

<!-- rule: RS-017 -->

### RS-017 — Reach-by-stage formality matrix

- **Applicability.** Every stage and the standing
  [Operations](../guides/operations.md) process, at the project's
  stakeholder-reach level; read stacked with
  [RS-015](#rs-015--consequence-by-stage-scaling-matrix) and
  [RS-016](#rs-016--compliance-by-stage-additions-table).
- **Inputs.** The project's stakeholder-reach level — the outermost
  accountability boundary the work and its sign-offs must cross: **Solo** /
  **Within-team** / **Cross-team** / **Cross-org**, four ordinal levels with
  Cross-org the ceiling
  ([Right-Sizing Guide § Stakeholder Reach → Coordination & Formality](../guides/right-sizing.md#stakeholder-reach--_coordination--formality_)).
- **Procedure.** Stakeholder reach scales **coordination and communication
  formality** — who reviews, who hands off, and who signs. The normative matrix:

  | Stage / Process            | Solo                  | Within-team                 | Cross-team                                       | Cross-org                                                |
  | -------------------------- | --------------------- | --------------------------- | ------------------------------------------------ | -------------------------------------------------------- |
  | **Initiation**             | Personal note         | Shared brief                | Stakeholders consulted, scope agreed             | Formal kickoff; client sign-off on objectives            |
  | **Requirements**           | Self-captured         | Team review                 | Stakeholder agreement on a shared backlog        | Client requirements sign-off; change process             |
  | **System Design**          | Personal              | Team design review          | Interface contracts published to dependent teams | Architecture approved with the client                    |
  | **Increment Design**       | None                  | Light shared plan           | Cross-team dependency and interface coordination | Client-visible plan and delivery schedule                |
  | **Implementation**         | Self-review           | Peer review (PR + approver) | Cross-team review of shared components           | Deliverable handoff; client-visible progress             |
  | **Verification**           | Self-verify           | Team verification           | Stakeholder UAT, cross-team integration          | Client UAT; formal acceptance sign-off                   |
  | **Deployment**             | Just deploy           | Coordinated team deploy     | Change comms, coordinated windows                | Client-approved deploy; scheduled windows; release notes |
  | **Closure**                | Self-accept + close   | Team close-out review       | Stakeholders sign off on handoff + closure       | Client acceptance; formal handoff sign-off               |
  | **Operations** _(process)_ | Informal self-support | Team rotation               | Defined handoff, internal escalation paths       | External support channels; formal incident communication |

- **Outputs.** The coordination and sign-off formality per stage.
- **Evidence.** N/A — application shows in the review, handoff, and sign-off
  artifacts the matrix names.
- **Failure behavior.** N/A — the matrix defines the scale and has no failure
  path of its own; a coordination need beyond Cross-org is not more of this
  dimension (its weight redistributes to compliance and consequence — the
  guide's ceiling rule).

<!-- /rule: RS-017 -->

---

## Minimum Viable Artifacts

Rationale:
[Right-Sizing Guide § Minimum Viable Artifacts](../guides/right-sizing.md#minimum-viable-artifacts).

<!-- rule: RS-023 -->

### RS-023 — Minimum-viable-artifacts matrix

- **Applicability.** Every project, per stage: which template views are rendered
  as formal artifacts, driven primarily by consequence. Compliance obligations
  force specific artifacts regardless of consequence, and wider stakeholder
  reach adds sign-off artifacts.
- **Inputs.** The assigned consequence anchor
  ([RS-003](#rs-003--consequence-assigned-by-judgment-to-the-nearest-anchor));
  the active compliance obligation set; the stakeholder-reach level; the
  template inventory (`templates/`).
- **Procedure.** The levels: **Required** = must complete before the stage gate;
  **Recommended** = high value, skip only with justification; **Optional** = use
  when the project calls for it. These levels govern when each brief is
  **rendered as a formal view** — the underlying decisions are always captured
  in [canonical state](canonical-state.md) regardless (the single-source rule);
  a lower level folds the view into lighter notes or another brief, it does not
  drop the work. The normative matrix:

  | Template                                                               | Stage            | Low         | Moderate    | High        |
  | ---------------------------------------------------------------------- | ---------------- | ----------- | ----------- | ----------- |
  | [Initiation Brief](../templates/initiation-brief.md)                   | Initiation       | Required    | Required    | Required    |
  | [Gate Decision](../templates/gate-decision.md)                         | Initiation       | Optional    | Required    | Required    |
  | [Success Criteria Register](../templates/success-criteria-register.md) | Initiation       | Recommended | Recommended | Required    |
  | [Requirements Brief](../templates/requirements-brief.md)               | Requirements     | Recommended | Required    | Required    |
  | [System Design Brief](../templates/system-design-brief.md)             | System Design    | Optional    | Required    | Required    |
  | [ADR](../templates/adr.md)                                             | System Design    | Optional    | Recommended | Required    |
  | [Increment Design Brief](../templates/increment-design-brief.md)       | Increment Design | Optional    | Required    | Required    |
  | [Implementation Brief](../templates/implementation-brief.md)           | Implementation   | Optional    | Required    | Required    |
  | [Session Log](../templates/implementation-session-log.md)              | Implementation   | Optional    | Recommended | Required    |
  | [Verification Brief](../templates/verification-brief.md)               | Verification     | Optional    | Required    | Required    |
  | [Deployment Brief](../templates/deployment-brief.md)                   | Deployment       | Optional    | Required    | Required    |
  | [Runbook](../templates/runbook.md)                                     | Deployment       | Optional    | Recommended | Required    |
  | [Operational Handoff](../templates/operational-handoff.md)             | Closure          | Optional    | Required    | Required    |
  | [Project Close-Out](../templates/project-closeout.md)                  | Closure          | Recommended | Required    | Required    |
  | [Retrospective](../templates/retrospective.md)                         | Increment cycle  | Recommended | Recommended | Required    |
  | [Friction Log](../templates/friction-log.md)                           | All stages       | Recommended | Recommended | Required    |
  | [Checkpoint Decision](../templates/checkpoint-decision.md)             | Any              | Optional    | Optional    | Recommended |

  Column readings: at **Negligible**, one artifact remains — a durable
  paragraph-brief, written to a single file (a root `DECISIONS.md` beside the
  code, not just spoken in the conversation) — and everything else folds into
  the conversation, Closure included (the
  [folded path](../guides/right-sizing.md#the-negligible-folded-path)). At
  **Critical**, treat the High column as all-Required with mandatory human
  sign-off. **CD projects:** the Verification Brief, Deployment Brief, and
  Operational Handoff remain applicable but shift to increment-close summaries.

- **Outputs.** The per-template render level for the project.
- **Evidence.** The rendered views themselves.
- **Failure behavior.** A **Required** view not completed before its stage gate
  leaves the gate unsatisfied; folding below a level never drops the underlying
  decisions from canonical state (the single-source rule above).

<!-- /rule: RS-023 -->

---

## Scope Boundary

This spec fixes the governance-weight scale and its per-stage consequences. It
does **not** map named compliance regimes to their obligations (a
compliance-mapping library is outside the framework's scope), does not decide
who or what runs the process — that is the
[Operating Model Spec](operating-model.md) — and does not prescribe storage for
classification records (semantics, not storage).

---

## Notes

**Last Updated:** 2026-07-16

Added to framework in v0.64.0.
