# Roles and Responsibilities

## Overview

Canonical role definitions, the cross-stage RACI matrix, and protocols governing
how roles collaborate during each stage.

### Why Roles

Software projects fail more often from coordination gaps than from technical
mistakes. When responsibilities are ambiguous — who decides, who reviews, who
gets informed — work stalls, decisions get revisited, and accountability
dissolves. Explicit role definitions and a shared RACI matrix give every
participant a clear answer to "what is expected of me at this stage?"

### Goals of This Guide

- Define the canonical set of roles used across all framework stages
- Assign Responsible, Accountable, Consulted, and Informed designations per
  stage
- Establish protocols for consultation and information distribution
- Provide expanded guidance for cross-cutting roles (PjM, AppSec)

### Key Principle

Roles describe functions, not headcount. In smaller teams one person may hold
multiple roles (e.g., PM and PjM); in larger organizations a single role may be
staffed by a team. What matters is that every function has a clear owner.

### How to Use This Guide

1. Read [**Role Definitions**](#role-definitions) to understand the canonical
   roles and their scope
2. Use the [**RACI Matrix**](#raci-matrix) to determine who is involved at each
   stage and in what capacity
3. Follow the [**Consultation Protocol**](#consultation-protocol) and
   [**Information Protocol**](#information-protocol) when collaborating across
   roles
4. See the [**Project Manager (PjM)**](#project-manager-pjm) and
   [**Application Security (AppSec)**](#application-security-appsec) sections
   for expanded cross-cutting role guidance

---

## Role Definitions

The framework uses eight canonical roles. These identifiers appear in stage
front matter, the RACI matrix, and checkpoint decision-rights assignments.

| ID          | Role                 | Scope                                                        | Common Mappings                               |
| ----------- | -------------------- | ------------------------------------------------------------ | --------------------------------------------- |
| `pm`        | Product Manager      | Business vision, requirements, stakeholder alignment         | Business Analyst in orgs that split the role  |
| `engineer`  | Engineer             | Design, build, and test code within increments               | Developer, Software Engineer                  |
| `architect` | Architect            | System design, ADRs, technical standards                     | Tech Lead, Principal Engineer                 |
| `qa`        | QA Engineer          | Test strategy, execution, and coverage assessment            | SDET, Test Engineer                           |
| `devops`    | DevOps Engineer      | CI/CD, infrastructure, deployment, and production operations | Platform Engineer, SRE                        |
| `appsec`    | Application Security | Security testing, compliance, and risk assessment            | Security Engineer                             |
| `pjm`       | Project Manager      | Delivery coordination, scheduling, and gate facilitation     | Scrum Master, Delivery Lead, TPM, Eng Manager |
| `exec`      | Executive            | Investment decisions and strategic oversight                 | VP Engineering, CTO, Program Director         |

> **Note:** This table represents the most common role assignments. Adapt to
> your team structure — in smaller teams, one person may hold multiple roles
> (e.g., one person may hold both PM and PjM). PjM maps to Scrum Master,
> Delivery Lead, TPM, or Engineering Manager depending on methodology.

---

## RACI Matrix

This matrix shows who is Responsible, Accountable, Consulted, and Informed for
key activities at each stage. It consolidates the Primary and Supporting Role
designations from each stage guide into a single cross-stage view. This matrix
covers stage-level role assignments. For checkpoint-level decision rights (who
prepares evidence, who decides), see the
[Decision-Rights Matrix](checkpoints.md#decision-rights-matrix).

**Legend:** **R** = Responsible (does the work), **A** = Accountable
(approves/owns the outcome), **C** = Consulted (provides input), **I** =
Informed (kept in the loop), **-** = Not involved (no role at this stage)

| Activity / Stage     | PM  | Engineers | Architect | QA  | DevOps | AppSec | Exec | PjM |
| -------------------- | --- | --------- | --------- | --- | ------ | ------ | ---- | --- |
| **Initiation**       | R/A | C         | C         | -   | -      | C      | I    | C‡  |
| Gate 1 decision†     | R   | -         | -         | -   | -      | C      | A    | C   |
| **Requirements**     | R/A | C         | C         | C   | -      | C      | I    | C   |
| **System Design**    | C   | C         | R/A       | C   | C      | C      | I    | C   |
| Gate 2 decision†     | C   | C         | R         | C   | C      | R      | A    | C   |
| **Increment Design** | C   | R/A       | C         | C   | -      | C      | -    | C   |
| **Implementation**   | -   | R/A       | C         | C   | C      | C      | -    | I   |
| **Verification**     | C   | R         | C         | R/A | -      | R      | -    | I   |
| **Deployment**       | I   | C         | C         | C   | R/A    | C      | I    | C   |
| **Support**          | I   | C         | C         | -   | R/A    | C      | I    | I§  |
| Deployment Approval  | I   | C         | C         | C   | R/A    | C      | I    | C   |
| Compliance Approval  | C   | -         | C         | -   | C      | R/A    | I    | C   |

§ **PjM at Support:** PjM is Informed at stage level but owns the Production
Ownership Decision per the
[Decision-Rights Matrix](checkpoints.md#decision-rights-matrix).

**Verification responsibility split:** Engineers (R) fix defects found during
testing, complete unit test gaps, and support integration test debugging. QA
(R/A) owns test execution, coverage assessment, UAT coordination, and the
verification brief. AppSec (R) owns security-specific testing (dependency scans,
SAST review, penetration testing at Enterprise tier).

**Consultation focus by C-role:** QA consultation focuses on testability of
acceptance criteria (Requirements), test strategy alignment (Increment Design),
and test gap identification (Implementation). AppSec focuses on security
implications of requirements, design decisions, and implementation changes.
Architect focuses on ADR compliance and architecture alignment when consulted at
Increment Design, design conformance when consulted at Implementation (see
[Decision Scope Test](#decision-scope-test) below), and infrastructure plan
conformance when consulted at Deployment. AppSec consultation at Implementation
is triggered by new authentication flows, cryptographic usage, external API
integrations, or changes to data handling patterns. PM consultation focuses on
requirements clarification and priority trade-offs (System Design, Increment
Design) and acceptance criteria interpretation (Verification). PjM consultation
focuses on schedule impact and cross-stage dependency assessment; PjM also
facilitates Gate 1 and Gate 2 reviews (scheduling, convening participants,
capturing decisions in the gate decision template). At Enterprise tier,
organizations may elevate Exec from Informed to Consulted or Accountable at
Deployment Approval for production-impacting changes.

† PjM's C designation at Gate 1 and Gate 2 includes gate facilitation
responsibility (see [Gate Review Facilitation](#gate-review-facilitation)
below).

‡ PjM's C designation at Initiation includes gate facilitation — see the PjM
Activity Table below for full responsibilities.

### Decision Scope Test

A decision during Implementation requires Architect consultation if it (a)
changes a component boundary, API contract, or data flow established in the
System Design Brief, (b) is hard to reverse after deployment, or (c) conflicts
with an accepted ADR. Decisions that do not meet any of these criteria are
within Engineer scope.

### Consultation Protocol

When a stage requires input from a Consulted (C) role:

1. **Request.** The Responsible role adds the question to the stage artifact's
   open-questions section, tagging the consulted role.
2. **Response.** The Consulted role responds inline in the open-questions
   section or attaches a referenced addendum to the artifact. Addendums follow
   the parent artifact's location conventions with the naming pattern
   `{parent}-{role}-addendum` (e.g., `system-design-brief-appsec-addendum`).
3. **Resolution.** The Responsible role records the decision and rationale in
   the artifact, noting the consulted role's input.

R-roles should consult all C-roles before the stage's checkpoint or gate review
to ensure cross-functional input is captured before decisions are made.

For time-sensitive consultations, the Responsible role may proceed with the
lowest-risk option and flag the decision for review, following the
unreachable-human fallback protocol.

### Information Protocol

When a stage completes its checkpoint, the Responsible role distributes the
checkpoint decision artifact (gate-decision or checkpoint-decision) to all
Informed (I) roles. I-roles receive completed artifacts for awareness — no
response or action is required unless they identify a concern, in which case
they raise it with the Accountable role. Additionally, all checkpoint decisions
are distributed to PjM for scheduling and coordination purposes, regardless of
PjM's RACI designation at that stage. The implementation-brief is also
distributed to PM when finalized, so that PM has current context for
Verification consultations.

> **Note:** For security and compliance accountability at checkpoint level, see
> the
> [accountability table](framework.md#compliance-and-regulatory-considerations).

---

## Project Manager (PjM)

**PjM** owns delivery coordination across the lifecycle — schedule management,
gate facilitation, cross-increment coordination, dependency tracking, and
progress reporting. PjM is Consulted at stages where active coordination input
is needed (foundational stages, gates, increment design, deployment) and
Informed where it passively tracks progress (implementation, verification,
support). The following cross-cutting activities give PjM clear R/A
accountability:

| Activity                               | PjM | PM  | Engineers | Architect | QA  | DevOps | Exec |
| -------------------------------------- | --- | --- | --------- | --------- | --- | ------ | ---- |
| Delivery schedule & progress reporting | R/A | I   | C         | -         | -   | -      | I    |
| Gate facilitation                      | R   | -   | -         | -         | -   | -      | A    |
| Cross-increment coordination           | R   | A   | C         | C         | -   | -      | I    |
| Dependency & blocker management        | R/A | C   | C         | C         | -   | -      | -    |

### Gate Review Facilitation

PjM facilitates gate reviews to keep decisions timely and well-documented.

**Pre-read expectations.** Distribute gate artifacts to all reviewers at least
two business days before the scheduled review. Artifacts should be final drafts,
not works in progress.

**Suggested agenda:**

1. Context recap — 5 min
2. Criteria walkthrough (checklist + evidence) — 10–15 min
3. Discussion and open questions — 15–30 min
4. Decision and next steps — 5 min

**Time-boxing guidelines:**

| Gate   | Recommended Duration |
| ------ | -------------------- |
| Gate 1 | 30–60 min            |
| Gate 2 | 45–90 min            |

**Scope.** PjM facilitates Gate 1 and Gate 2 — the two investment-decision
gates. Non-investment checkpoints (Reviews and Alignments) are owned and run by
the stage's Responsible role; PjM tracks their completion for scheduling
purposes but does not facilitate them. See the
[Decision-Rights Matrix](checkpoints.md#decision-rights-matrix) for
per-checkpoint roles.

**Decision recording.** Capture the outcome using
[`templates/gate-decision.md`](../templates/gate-decision.md). Record the
decision (Proceed / Proceed with conditions / Revise / Stop), conditions, and
accountable owners for any follow-up actions.

---

## Application Security (AppSec)

**AppSec** provides security and compliance input across the lifecycle. AppSec
is Consulted at most stages (reviewing artifacts for security implications) and
Responsible at Verification (security testing), Gate 2 (risk posture input), and
Compliance Approval. For details on security activities by stage, see the
[Security Guide](security.md).

| Stage / Checkpoint   | RACI | AppSec Activity                                                 |
| -------------------- | ---- | --------------------------------------------------------------- |
| **Initiation**       | C    | Review data sensitivity classification and compliance scope     |
| Gate 1               | C    | Confirm risk and policy exposure is captured                    |
| **Requirements**     | C    | Review security NFRs for completeness                           |
| **System Design**    | C    | Review threat model and security architecture                   |
| Gate 2               | R    | Provide risk posture assessment for investment decision         |
| **Increment Design** | C    | Flag security-relevant changes (auth, data, API surface)        |
| **Implementation**   | C    | Review security scan results; advise on findings                |
| **Verification**     | R    | Own security testing (dependency scans, SAST, pen testing at E) |
| **Deployment**       | C    | Verify SBOM, artifact integrity, pre-deployment security checks |
| **Support**          | C    | Advise on CVE prioritization and incident response              |
| Compliance Approval  | R/A  | Own compliance sign-off for regulated releases                  |

### Security Escalation Protocol

When AppSec identifies a security finding during any stage, the severity
determines the orchestration response. AppSec has unilateral authority to pause
any stage for a Critical finding; the stage's Responsible role must resolve the
finding before work resumes.

| Severity     | Orchestration Response                                                    |
| ------------ | ------------------------------------------------------------------------- |
| **Critical** | Halt stage; finding must be resolved before proceeding to next checkpoint |
| **High**     | Conditional proceed; finding tracked with fix deadline before deployment  |
| **Medium**   | Track in defect backlog; fix targeted for current or next increment       |
| **Low**      | Log in backlog; address opportunistically                                 |

Severity classification follows the project's defect management definitions (see
[Verification Reference: Defect Management](../stages/verification/reference.md#defect-management)).
For security findings, classify based on exploitability and blast radius:
Critical = exploitable with no authentication or user interaction required and
broad blast radius (e.g., RCE, auth bypass, mass data exposure); High =
exploitable but requires authentication or has limited blast radius. At
Enterprise tier, Critical and High findings require documented fix/accept/defer
decisions with AppSec sign-off.

**Halt communication:** When AppSec halts a stage for a Critical finding, they
produce a defect report using the standard defect format (see Verification
reference) with the `{parent}-appsec-addendum` naming convention (see
[Consultation Protocol](#consultation-protocol)). The defect report names the
specific finding, affected scope, and resolution criteria. The stage's
Responsible role logs the defect, assigns the fix, and verifies resolution
before the stage resumes.

---

## Notes

**Last Updated:** 2026-03-25

Added to framework in v0.10.0.
