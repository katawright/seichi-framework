# Checkpoint Taxonomy

## Overview

Taxonomy of the three checkpoint types used across all stages — gates, reviews,
and alignments — with decision-rights assignments and stage mapping.

### Why Checkpoints

Without distinct checkpoint types, all quality gates feel the same — teams
either rubber-stamp everything or treat every review as a stop/go decision.
Distinguishing gates (investment decisions) from reviews (criteria verification)
and alignments (stakeholder consensus) gives each checkpoint the right weight
and the right decision-maker.

### Goals of This Guide

- Define the three checkpoint types and when each applies
- Assign decision rights (who prepares evidence, who decides, who is informed)
- Map checkpoints to stages so every stage has clear exit criteria

### Key Principle

Not every checkpoint is a gate. Gates ask "should we continue?" Reviews ask
"does this meet the bar?" Alignments ask "are we on the same page?" Matching the
checkpoint type to the question prevents both rubber-stamping and decision
fatigue.

### How to Use This Guide

1. Read [**Gates**](#gates), [**Reviews**](#reviews), and
   [**Alignments**](#alignments) to understand the three types
2. Use the [**Decision-Rights Matrix**](#decision-rights-matrix) to determine
   who prepares evidence and who decides at each checkpoint
3. Refer to [**Checkpoint Mapping by Stage**](#checkpoint-mapping-by-stage) to
   see which checkpoints apply at each stage

---

| Type          | Purpose                                          | Outcome                                           |
| ------------- | ------------------------------------------------ | ------------------------------------------------- |
| **Gate**      | Investment decision — should we continue?        | Proceed / Proceed with conditions / Revise / Stop |
| **Review**    | Criteria verification — does this meet the bar?  | Ready / Not Ready                                 |
| **Alignment** | Stakeholder consensus — are we on the same page? | Aligned / Adjustments Needed                      |

---

## Gates

- **Purpose:** Decide whether to continue investing resources in the project
- **Outcome:** Proceed / Proceed with conditions / Revise / Stop
- **Real stop option:** Yes — these are genuine go/no-go decisions
- **When used:** Early in the project when stopping is still realistic
- **"Proceed with conditions":** The project continues, but named conditions
  must be met before the next stage begins (e.g., "proceed once legal review
  clears the data-handling approach"). Track conditions in the gate decision
  record and verify them at the next checkpoint. If the next checkpoint is
  skipped (e.g., collapsed tiers at Minimal), resolve conditions in the first
  artifact produced after the gate — document evidence inline and note which
  gate condition it satisfies.

**Examples:**

- **Gate 1:** End of Initiation — Approve brief and fund Requirements work?
- **Gate 2:** After Requirements and System Design are both complete — Commit to
  building this?

**AI validation:** Ensure AI-assisted analysis and recommendations are sound;
human owns the investment decision.

**After Gate 2:** The project is funded and team committed. Later checkpoints
focus on "when/how to proceed" rather than "if."

Record gate decisions using the
[Gate Decision Template](../templates/gate-decision.md).

---

## Reviews

- **Purpose:** Verify that criteria are met before proceeding
- **Outcome:** Ready / Not Ready (with remediation needed)
- **Real stop option:** No — fix issues and retry, don't stop the project
- **When used:** Throughout development whenever work products need validation

The specific criteria depend on stage context:

- **Code quality:** Code review approval, test coverage thresholds, security
  scan results (Implementation, Verification)
- **Deployment readiness:** Environment prepared, rollback tested, monitoring
  configured (Deployment)
- **Compliance:** Legal, security, or regulatory sign-off (Deployment — when
  required by tier)

**Examples:**

- Design review (Increment Design)
- PR review + CI validation (Implementation)
- Test execution + coverage review (Verification)
- Production deployment approval (Deployment)
- Compliance approval (Deployment)
- Production ownership transfer (Closure)
- Project closure (Closure)

**AI validation:** Human review of AI-generated work products is critical.
Verify that AI-generated code, tests, documentation, deployment plans, and
compliance artifacts meet the relevant criteria.

Approval authority varies by context — see the
[Decision-Rights Matrix](#decision-rights-matrix) for who prepares evidence and
who decides. Record review decisions using the
[Checkpoint Decision Template](../templates/checkpoint-decision.md).

> **Compliance trigger:** Activate Compliance Approval when the project's tier
> is Standard or Enterprise and regulatory, legal, or security sign-off
> requirements were identified during Initiation or System Design.

---

## Alignments

- **Purpose:** Synchronize stakeholders, gather feedback, ensure consensus
- **Outcome:** Aligned / Adjustments Needed
- **Real stop option:** No — about refinement and convergence
- **When used:** When stakeholder input or team alignment is needed

**Examples:**

- Architecture review (System Design)
- Sprint review/demo
- Requirements walkthrough

**AI validation:** Review AI-generated designs, architectures, and requirements
with the team. Ensure AI recommendations align with stakeholder needs and
constraints.

---

## Decision-Rights Matrix

Each checkpoint has defined roles for who prepares evidence, who decides, and
who is informed. This matrix covers checkpoint-level decision rights. For
stage-level role assignments (R/A/C/I), see the
[RACI Matrix](roles.md#raci-matrix). The `responsible_roles` field in stage
README checkpoint front matter lists the roles from the **Prepares Evidence**
column below. For who decides, see the **Decides** column.

| Checkpoint                       | After Stage      | Type      | Prepares Evidence     | Decides            | Informed      |
| -------------------------------- | ---------------- | --------- | --------------------- | ------------------ | ------------- |
| Gate 1 (Investment Decision)     | Initiation       | Gate      | PM                    | Exec               | All roles\*\* |
| Requirements Readiness           | Requirements     | Review    | PM                    | PM (peer\*)        | PjM           |
| Architecture Review              | System Design    | Alignment | Architect, AppSec     | Architect (peer\*) | PM, PjM       |
| Gate 2 (Investment Decision)     | System Design    | Gate      | PM, Architect, AppSec | Exec               | All roles\*\* |
| Design Review                    | Increment Design | Review    | Engineer              | Architect          | PM, PjM       |
| PR Review + CI                   | Implementation   | Review    | Engineer              | Engineer (peer\*)  | PjM           |
| Test Execution + Coverage Review | Verification     | Review    | QA, AppSec            | QA                 | PjM, PM       |
| Production Deployment Approval   | Deployment       | Review    | DevOps, AppSec        | DevOps             | PM, PjM, Exec |
| Compliance Approval              | Deployment       | Review    | PM, AppSec            | AppSec             | Exec, PjM     |
| Production Ownership Transfer    | Closure          | Review    | DevOps                | DevOps (peer\*)    | PM, PjM, Exec |
| Project Closure                  | Closure          | Review    | PjM                   | PjM (peer\*)       | PM, Exec      |

\* **Peer** — a second person in the same role (or a senior in a related role)
who was not the primary author.

\*\* **All roles** — all roles that have participated up to that point.

**Gate 2 evidence split:** PM prepares business case and requirements coverage.
Architect prepares architecture rationale and ADR summary. AppSec prepares
security risk posture (see
[Security Risk Posture](../templates/gate-decision.md#security-risk-posture)
section in the gate decision template).

---

## Checkpoint Mapping by Stage

Each stage specifies which checkpoint types apply:

- **Initiation:** Gate (Gate 1)
- **Requirements:** Review (Requirements Readiness)
- **System Design:** Alignment (Architecture Review), Gate (Gate 2)
- **Increment Design:** Review (Design Review)
- **Implementation:** Review (PR Review + CI)
- **Verification:** Review (Test Execution + Coverage Review)
- **Deployment:** Review (Production Deployment Approval, Compliance Approval)
- **Closure:** Review (Production Ownership Transfer, Project Closure)

**Human validation of AI output is required at all checkpoint types.** The
[Operating Model Guide](operating-model.md) sizes how independently agents may
work at each stage and where human oversight is required.

> **Enterprise extensions:** Organizations with additional governance needs can
> insert additional reviews or alignments as checkpoints within stages rather
> than adding new stages.

---

## Notes

**Last Updated:** 2026-06-21

Extracted from `guides/stages.md` in v0.42.0. Stale AI Assistance Scorecard
reference repointed to the Operating Model Guide in v0.49.0.
