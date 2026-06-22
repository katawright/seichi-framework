<!-- For guidance on gates and investment decisions, see guides/checkpoints.md#gates -->

# Gate Decision: [Gate N — Short Title]

**Purpose:** Record a Gate 1 or Gate 2 investment decision.

**Usage:** Use this template for investment gates that decide whether a project
proceeds, is revised, or is stopped. For non-investment checkpoints (quality,
deployment, production ownership), use
[checkpoint-decision.md](checkpoint-decision.md) instead. See the
[Checkpoint Taxonomy](../guides/checkpoints.md) for the full decision framework.

**Last Updated:** YYYY-MM-DD

**Date:** YYYY-MM-DD

**Status:** Pending / Proceed / Proceed with conditions / Revise / Stop

**Decision makers:**

- **Decided by:** (names/roles)
- **Facilitated by:** (name/role)
- **Consulted:** (names/roles)

<!-- Verify against RACI matrix (guides/roles.md#raci-matrix) and the
     stakeholder table in the Initiation Brief. Were all C-roles and key
     stakeholders consulted? -->

**Division of labor:** The Responsible role(s) (R) prepare the gate package —
completing Context, Inputs Reviewed, Artifact Completeness, and Criteria
Evaluated with evidence. When multiple roles share R designation (e.g., Gate 2:
PM, Architect, and AppSec), each R-role prepares the sections within their
domain. For Gate 2: PM prepares the business case and requirements coverage;
Architect prepares the architecture rationale and ADR summary; AppSec prepares
the Security Risk Posture. The Accountable role (A) reviews the package, leads
the decision discussion, and records the final Decision and Next Steps. The
Facilitator (PjM) manages agenda and time-boxing per the
[Gate Review Facilitation](../guides/roles.md#gate-review-facilitation)
protocol.

---

## Context

- **Stage completed:** (which stage preceded this gate)
- **Decision being made:** (what is being decided)
- **Stage artifact:** (link to the brief or document being evaluated)

---

## Inputs Reviewed

- (List of artifacts and evidence evaluated)
- _Example (Gate 1):_ "Initiation Brief, stakeholder feedback"
- _Example (Gate 2):_ "Requirements Brief, system design brief, spike results,
  updated estimates"

---

## Artifact Completeness

Verify that all required stage outputs listed in the stage README front matter
`outputs` field have been produced before proceeding.

| Artifact | Status                   | Location       |
| -------- | ------------------------ | -------------- |
| …        | Produced / Missing / N/A | (path or link) |

**Blocking:** Any artifact with status "Missing" blocks the gate decision unless
the gate reviewer explicitly approves the omission with documented rationale.

---

## Criteria Evaluated

Criteria may match or differ from what the preceding stage proposed.

| Criterion | Evidence | Assessment                |
| --------- | -------- | ------------------------- |
| …         | …        | Met / Partially / Not Met |

- _Example (Gate 1):_ "Business case clear, stakeholders aligned, risks
  acceptable, sponsor committed"
- _Example (Gate 2):_ "Requirements validated, architecture sound, risks
  mitigated, estimate within budget"

---

## Security Risk Posture

<!-- Gate 2 only. AppSec prepares this section as part of the evidence package. -->

- **Overall risk assessment:** [Low / Medium / High / Critical]
- **Open security findings:** [count and severity breakdown, or "None"]
- **Mitigations in place:** [list key mitigations for identified risks]
- **Residual risk acceptance:** [risks accepted and rationale]
- **Compliance status:** [applicable standards and current status]
- **AppSec recommendation:** [Proceed / Proceed with conditions / Revise]

---

## Decision: Proceed / Proceed with conditions / Revise / Stop

- **Rationale:** (why this decision was made)
- **Conditions:** (if any — e.g., "proceed but address X first")

---

## Post-Decision Actions

<!-- For Gate 1: N/A. These actions apply only to Gate 2. -->

> **Gate 1 decisions:** N/A — no post-decision publishing actions.

### Gate 2: Publish Draft ADRs

If the decision is Proceed, promote accepted draft ADRs to the workspace ADR
canon. See [ADR Publishing](../guides/framework.md#adr-publishing) for the
canonical procedure.

- [ ] Rename each `ADR-DCC.md` to `ADR-NNNN-CC.md` (project id + draft counter)
- [ ] Move accepted ADRs from the project's `docs/adr/` to the workspace
      top-level `adrs/` canon
- [ ] Update ADR status from `Draft` / `Proposed` → `Accepted`
- [ ] Replace the project's draft copy with a pointer to the promoted id

---

## AI Validation Summary

<!-- Record how AI-assisted work was validated during this stage.
     This section helps gate reviewers assess the quality and reliability
     of AI contributions to stage artifacts. -->

**AI tools/models used:** [List AI tools and models that assisted this stage's
work — e.g., "Claude Sonnet for requirements drafting, GitHub Copilot for code
generation"]

**Validation method:**

- [ ] Human reviewed all AI-generated content for accuracy and completeness
- [ ] AI outputs were cross-checked against source materials (interviews,
      existing docs, data)
- [ ] Domain expert reviewed AI-generated technical recommendations
- [ ] AI-generated artifacts were validated against checklist criteria

**Key findings:** [Note any AI outputs that required significant correction,
areas where AI added unexpected value, or concerns about AI-generated content
quality]

**Reviewer sign-off on AI contributions:**

| Reviewer | Role | AI Contributions Reviewed | Assessment                     |
| -------- | ---- | ------------------------- | ------------------------------ |
| [name]   | …    | [what was reviewed]       | Acceptable / Revised / Flagged |

---

## Next Steps

- (What happens next based on the decision)
- _Example (Gate 1, Proceed):_ "Begin Requirements stage"
- _Example (Gate 1, Revise):_ "Refine problem statement, re-present"
- _Example (Gate 2, Proceed):_ "Begin Increment Design for first increment"
- _Example (Gate 2, Proceed):_ "Publish draft ADRs — promote accepted
  `ADR-DCC.md` files to the workspace `adrs/` canon as `ADR-NNNN-CC.md`; update
  project draft copies with a pointer to the promoted id"
- _Example (Gate 2, Stop):_ "Archive project artifacts, communicate decision to
  stakeholders"
- _Example (Gate 1, Proceed with prep):_ "Proceed — preparation project approved
  as prerequisite. Begin Requirements with preparation scope included."
- _Example (Gate 1, Postpone):_ "Opportunity validated but preparation cost
  exceeds current budget. Revisit when platform modernization completes."

---

<!-- For deployment and closure checkpoints, use checkpoint-decision.md.
     For architecture review decisions, record as an ADR with status "Accepted". -->

<!-- Template Last Updated: 2026-06-22 | Added in v0.13.0. Post-Decision Actions section added in v0.44.0. Gate 2 ADR actions updated to workspace-canon promotion in v0.48.0. v0.49 closure-vocab fix. v0.49 Gate 2 division-of-labor restored PM (business case + requirements coverage) to match checkpoints.md. -->
