# Checkpoint Taxonomy

> **New here?** See [Framework Overview](OVERVIEW.md#checkpoint-taxonomy) for
> what this guide is, why it exists, and how to use it. This file is the
> operational reference.

## Key Principle

Not every checkpoint is a gate. Gates ask "should we continue?" Reviews ask
"does this meet the bar?" Alignments ask "are we on the same page?" Matching the
checkpoint type to the question prevents both rubber-stamping and decision
fatigue.

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
  clears the data-handling approach"). Each condition becomes a **tracked
  carry-forward obligation** in the canonical state — with an owner, the
  stage/increment that discharges it, and an Open / Satisfied / Blocked /
  Withdrawn status (see
  [Canonical-State Spec § Minimum Canonical Project State](../spec/canonical-state.md#minimum-canonical-project-state)).
  It is not merely minuted at the gate: every later stage entry re-reads the
  open conditions and reports their status, and a stage cannot close over a
  condition due within it while it stays open. If the next checkpoint is skipped
  (e.g., collapsed tiers at Minimal), resolve conditions in the first artifact
  produced after the gate — document evidence inline and note which gate
  condition it satisfies.

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

**AI validation:** Validating AI-generated work products against the relevant
criteria is critical — code, tests, documentation, deployment plans, and
compliance artifacts. _Who_ validates (a human, a delegated agent, or
pre-authorized policy) follows the project's Authority setting; see the
[Operating Model Guide](operating-model.md).

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

**Gate decisions keep human-owned authority** — a human either validates in the
moment **or** has pre-authorized the decision as policy (the normal Lights-Out
path), never a delegated agent (interactive-only at Critical). **Review and
alignment decisions follow the project's Authority setting** and may be
delegated to an agent within bounds — **except those carrying an `[H]` floor
sign-off**: the acceptance, authorization, stakeholder-alignment, and
ownership-transfer acts (Architecture Review stakeholder sign-off, Production
Deployment Approval, Compliance Approval, Production Ownership Transfer, Project
Closure), which stay human-owned. The
[Operating Model Guide](operating-model.md) sets which applies per checkpoint,
sizing how independently agents may work at each stage and where human oversight
is required.

> **Enterprise extensions:** Organizations with additional governance needs can
> insert additional reviews or alignments as checkpoints within stages rather
> than adding new stages.

---

## Notes

**Last Updated:** 2026-07-07

Added to framework in v0.42.0.
