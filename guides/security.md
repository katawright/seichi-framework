# Security Guide

> **New here?** See [Framework Overview](OVERVIEW.md#security-guide) for what
> this guide is, why it exists, and how to use it. This file is the operational
> reference.

## Key Principle

AI makes security nearly free at the Minimal tier. Dependency scanning, SAST,
secrets detection, and SBOM generation run automatically — teams get baseline
security coverage with zero additional effort beyond what AI does as part of
normal development.

---

## Security Throughline

Security activities flow through every stage and into the Operations process,
from data classification in Initiation through ongoing vulnerability management.
Each stage builds on the prior stage's security outputs.

The SSDF group column maps each activity to a NIST SSDF practice group: **PO** =
Prepare the Organization, **PS** = Protect the Software, **PW** = Produce
Well-Secured Software, **RV** = Respond to Vulnerabilities. See
[SSDF Practice Mapping](#ssdf-practice-mapping) for details — you can ignore
this column if SSDF traceability isn't relevant to your project.

| Stage                      | Security activity                                                                    | AI automation                                                                | SSDF group |
| -------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- | ---------- |
| **Initiation**             | Classify data sensitivity and compliance scope                                       | an agent suggests classification from project context                        | PO         |
| **Requirements**           | Define security NFRs from sensitivity classification                                 | an agent drafts security NFRs, flags gaps                                    | PO/PW      |
| **System Design**          | Design security architecture; threat model at tier level                             | an agent generates a threat model draft, suggests controls                   | PW         |
| **Increment Design**       | Assess security implications; flag auth/data/API changes                             | an agent flags security-relevant changes in design                           | PW         |
| **Implementation**         | Secure coding + AI-automated scanning (SAST, deps, secrets)                          | SAST, dependency scan, secrets detection run in CI                           | PW         |
| **Verification**           | Validate security controls (dep scan through pen testing)                            | an agent runs security test suites, triages findings                         | RV         |
| **Deployment**             | Verify release integrity; SBOM; pre-deployment checks                                | an agent generates the SBOM, validates artifact integrity                    | PS/RV      |
| **Closure**                | Hand off security posture, open findings, and SBOM in the operational handoff record | an agent compiles the security handoff and persisting compliance obligations | RV         |
| **Operations** _(process)_ | Monitor CVEs; patch per SLA; incident response                                       | an agent monitors CVE feeds, prioritizes vulnerabilities                     | RV         |

The throughline ensures security decisions compound rather than repeat. Data
sensitivity classified in Initiation drives NFRs in Requirements, which drive
architecture in System Design, which drives scanning in Implementation. No stage
starts from scratch.

---

## How AI Makes Security Cheap

Security work falls into three automation levels. At the Minimal project tier,
Automated activities run as part of CI with zero additional effort — making
baseline security coverage effectively free. The split below is the **typical
default**, not a fixed floor: which level an activity runs at follows the
project's
[Work Execution setting](operating-model.md#work-execution--who-does-the-work)
(who performs it) and
[Required Assurance](operating-model.md#required-assurance--how-independently-work-is-evaluated)
(whether a human re-checks it) — an Agents-mode project may move activities
toward automation — while who **accepts** the result follows the
[Authority setting](operating-model.md#authority--who-may-decide), and the
**compliance and security sign-off** for a regulated or Critical-consequence
release stays the human-owned floor.

### Fully Automated (CI/Pipeline)

Agents handle these without human intervention. They run as part of CI/CD or
agent workflows:

- **Dependency scanning** — flag known vulnerabilities in third-party packages
- **SAST (Static Application Security Testing)** — detect common vulnerability
  patterns in source code
- **Secrets detection** — prevent credentials, API keys, and tokens from
  entering version control
- **SBOM generation** — produce Software Bill of Materials at build time
- **CVE monitoring** — watch vulnerability databases for newly disclosed issues
  in project dependencies

### AI-Drafted, Human-Reviewed

AI produces the first draft; a human reviews for accuracy and completeness:

- **Threat models** — an agent generates a threat model from the architecture
  description; a human validates assumptions and prioritization
- **Security NFRs** — an agent drafts requirements from data classification and
  compliance context; a human confirms coverage
- **Vulnerability prioritization** — an agent triages scan results by
  exploitability and blast radius; a human makes fix/accept/defer decisions
- **Security test cases** — an agent generates test scenarios from the threat
  model; a human reviews coverage

### Human-Governed, Agent-Assisted

Humans drive these activities; agents provide research and drafting support:

- **Security architecture decisions** — human decides authentication model,
  encryption strategy, trust boundaries; an agent researches options
- **Compliance decisions** — a human determines regulatory applicability; an
  agent maps controls to requirements
- **Penetration test interpretation** — a human contextualizes findings; an
  agent helps draft remediation plans
- **Incident response** — a human leads investigation and decisions; an agent
  correlates logs and suggests root causes

### What This Means by Tier

| Tier           | Security effort                                                             | Key decisions required                                                  |
| -------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **Minimal**    | Zero additional effort — Automated activities run via CI/AI                 | Accept residual risk from reduced security review                       |
| **Standard**   | Automated + AI-Drafted reviews during design and verification               | Staff security reviewer, approve scan tooling budget                    |
| **Enterprise** | All levels active + formal compliance mapping, pen testing, security review | Staff dedicated AppSec, approve compliance audit scope, escalation SLAs |

At all tiers, AppSec follows the
[Security Escalation Protocol](roles.md#security-escalation-protocol) for
severity-based finding response (Critical = halt stage). At every tier, AppSec
is Responsible for security testing, Gate 2 risk posture, and compliance
sign-off — see [RACI matrix](roles.md#raci-matrix). What Enterprise tier adds is
**dedicated** AppSec staffing for those positions, per the table above; the
positions themselves are not tier-conditioned.

---

## Security Activities by Stage

### Initiation

Classify data sensitivity and compliance scope so downstream stages know the
security posture required.

**What to do:**

| Minimal                                | Standard                                                               | Enterprise                                         |
| -------------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------- |
| Note if project handles sensitive data | Classify data sensitivity (public, internal, confidential, restricted) | Formal data classification with compliance mapping |

**How AI helps:** an agent suggests data classification based on the project
description and identifies likely compliance regimes (GDPR, HIPAA, SOC 2,
PCI-DSS) from context.

**Security gate criteria:** Data sensitivity and compliance scope documented in
the Initiation Brief.

**SSDF reference:** PO (Prepare the Organization) — establish security
requirements based on data classification.

### Requirements

Define security NFRs from the sensitivity classification established in
Initiation.

**What to do:**

| Minimal                    | Standard                                 | Enterprise                                                      |
| -------------------------- | ---------------------------------------- | --------------------------------------------------------------- |
| Note key security concerns | Security NFRs with verification criteria | Full security requirements catalog with compliance traceability |

**How AI helps:** an agent drafts security NFRs from the data sensitivity
classification — authentication, authorization, encryption, audit logging, data
retention. An agent flags gaps where sensitivity level implies requirements not
yet captured.

**Security gate criteria:** Security NFRs captured with verification criteria;
reviewed by engineering (and security team for Enterprise tier).

**SSDF reference:** PO/PW (Prepare the Organization / Produce Well-Secured
Software) — define security requirements.

### System Design

Design the security architecture and create a threat model scaled to project
tier.

**What to do:**

| Minimal                  | Standard                                      | Enterprise                                     |
| ------------------------ | --------------------------------------------- | ---------------------------------------------- |
| Basic security awareness | Threat model for key areas, security baseline | Comprehensive threat model, compliance mapping |

**How AI helps:** an agent generates a threat model draft from architecture
descriptions using STRIDE or similar methodology. An agent suggests security
controls (authentication, encryption, input validation, rate limiting) mapped to
identified threats.

**Security gate criteria:** Security approach documented in System Design Brief;
threat model reviewed (scope scales with tier).

**SSDF reference:** PW (Produce Well-Secured Software) — design software to meet
security requirements.

### Increment Design

Assess security implications of the current increment and flag changes to
authentication, authorization, data handling, or API surfaces.

**What to do:**

| Minimal                     | Standard                                       | Enterprise                                 |
| --------------------------- | ---------------------------------------------- | ------------------------------------------ |
| Quick security mental check | Document security-relevant changes and threats | Formal security assessment with test cases |

**How AI helps:** an agent reviews increment scope against the threat model and
flags security-relevant changes — new API endpoints, data model changes,
authentication flow changes, third-party integrations. An agent suggests
security test cases for the Verification stage.

**Security gate criteria:** Security implications assessed in Increment Design
Brief; security-relevant changes identified.

**SSDF reference:** PW (Produce Well-Secured Software) — implement designs for
software with security built in.

### Implementation

Write secure code with AI-automated scanning for vulnerabilities, dependency
issues, and secrets.

**What to do:**

| Minimal                     | Standard                                   | Enterprise                                |
| --------------------------- | ------------------------------------------ | ----------------------------------------- |
| Avoid known vulnerabilities | Dependency scanning, basic security review | SAST/DAST scanning, security review gates |

**How AI helps:**

- **Automated (all tiers):** Dependency scanning in CI, secrets detection in
  pre-commit hooks, basic SAST rules
- **Standard+:** an agent reviews code changes for OWASP Top 10 patterns
  (injection, XSS, broken auth, sensitive data exposure)
- **Enterprise:** Dedicated SAST/DAST tools integrated into CI pipeline with
  automated triage

**Security gate criteria:** No critical/high vulnerabilities in dependency scan;
no secrets in codebase; security review approved (scope scales with tier).

**SSDF reference:** PW (Produce Well-Secured Software) — review and/or analyze
code to identify vulnerabilities and verify compliance.

### Verification

Validate that security controls work correctly, scaled from dependency scanning
to penetration testing.

**What to do:**

| Minimal                       | Standard                                 | Enterprise                                        |
| ----------------------------- | ---------------------------------------- | ------------------------------------------------- |
| Basic vulnerability awareness | Dependency scanning, OWASP Top 10 review | Penetration testing, SAST/DAST, compliance checks |

**How AI helps:** an agent runs security test suites, triages findings by
severity and exploitability, and generates remediation guidance. At Standard+
tiers, an agent validates that security NFRs from Requirements are covered by
test results.

**Security gate criteria:** No critical vulnerabilities; security test results
documented; findings triaged with fix/accept/defer decisions.

**SSDF reference:** RV (Respond to Vulnerabilities) — identify and confirm
vulnerabilities on an ongoing basis.

### Deployment

Verify release integrity, generate SBOM, and run pre-deployment security checks.

**What to do:**

| Minimal                    | Standard                                    | Enterprise                                       |
| -------------------------- | ------------------------------------------- | ------------------------------------------------ |
| Basic release verification | SBOM generated, artifact integrity verified | Full supply chain verification, signed artifacts |

**How AI helps:** an agent generates the SBOM automatically at build time,
validates artifact checksums, and runs pre-deployment security checks (no new
critical CVEs since last scan, secrets not embedded in artifacts, configuration
reviewed).

**Security gate criteria:** SBOM generated; artifact integrity verified;
pre-deployment security checks passed.

**SSDF reference:** PS/RV (Protect the Software / Respond to Vulnerabilities) —
protect released software and verify integrity.

Integrate these checks into your CI/CD pipeline — see
[Pipeline Gate Policy](../stages/deployment/setup.md#2-pipeline-gate-policy) for
tier-specific gate configuration. For security accountability by stage, see the
[RACI matrix](roles.md#raci-matrix). At Standard and Enterprise tiers with
identified compliance requirements, AppSec owns a
[Compliance Approval](../guides/checkpoints.md#reviews) checkpoint at Deployment
— see the
[Decision-Rights Matrix](../guides/checkpoints.md#decision-rights-matrix).

### Closure

At project close-out, hand off the security posture to whoever owns the running
system — open findings, the current SBOM, and any persisting compliance
obligations — recorded in the operational handoff record.

**What to do:**

| Minimal                           | Standard                                | Enterprise                                                                 |
| --------------------------------- | --------------------------------------- | -------------------------------------------------------------------------- |
| Note open findings in the handoff | Hand off findings, SBOM, and patch SLAs | Formal security handoff with compliance obligations and ownership transfer |

**How AI helps:** an agent compiles the security handoff — open findings, the
SBOM, and the compliance obligations that continue after delivery — into the
operational handoff record.

**Security gate criteria:** Open security findings, SBOM, and persisting
compliance obligations recorded in the operational handoff record and accepted
by the receiving owner.

**SSDF reference:** RV (Respond to Vulnerabilities) — transfer ongoing
vulnerability-response ownership at handoff.

### Operations (Standing Process)

Once the system is running, vulnerability management is continuous and belongs
to the [Operations process](operations.md) (Maintain and Respond) rather than an
SDLC stage: monitor for new vulnerabilities, patch per SLA, and maintain
incident response readiness.

**What to do:**

| Minimal                               | Standard                               | Enterprise                                       |
| ------------------------------------- | -------------------------------------- | ------------------------------------------------ |
| Scan weekly, patch critical in 7 days | CVE monitoring, patch per severity SLA | Continuous monitoring, formal vulnerability mgmt |

**How AI helps:** an agent monitors CVE feeds for dependencies in the project's
SBOM, prioritizes vulnerabilities by exploitability and blast radius, and drafts
patch plans. An agent assists with security incident investigation by
correlating logs and suggesting root causes.

**Security gate criteria:** Vulnerability scan results reviewed per SLA; no
critical unpatched vulnerabilities beyond SLA window; incident response
procedures current.

**SSDF reference:** RV (Respond to Vulnerabilities) — analyze and respond to
vulnerabilities on an ongoing basis.

---

## SSDF Practice Mapping

> **This section is for organizations needing NIST SSDF (SP 800-218)
> traceability. You do not need it to use this guide.**

The Secure Software Development Framework organizes practices into four groups.
The table below maps each group to framework stages where those practices are
primarily executed.

| SSDF Group | Full Name                     | Key Practices                                                        | Primary Framework Stage(s)                                                  |
| ---------- | ----------------------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| **PO**     | Prepare the Organization      | Define security requirements, roles, tooling, training               | Initiation, Requirements                                                    |
| **PS**     | Protect the Software          | Protect code, builds, and releases from tampering                    | Implementation, Deployment                                                  |
| **PW**     | Produce Well-Secured Software | Design, code, review, and test software with security built in       | Requirements, System Design, Increment Design, Implementation, Verification |
| **RV**     | Respond to Vulnerabilities    | Identify, triage, and remediate vulnerabilities in released software | Verification, Deployment, Operations                                        |

**How to use this table:**

1. Identify which SSDF practice groups your compliance regime requires
2. Look up the corresponding framework stages
3. Review the stage-specific security activities in
   [Security Activities by Stage](#security-activities-by-stage)
4. Use the SSDF group references (PO/PS/PW/RV) in each stage section to confirm
   coverage

This mapping provides traceability, not certification. Organizations pursuing
formal SSDF compliance should map specific practice tasks (e.g., PW.1.1, RV.2.2)
to their implementation details.

---

## Notes

**Last Updated:** 2026-07-18

Added to framework in v0.25.0.
