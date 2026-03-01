---
id: security
type: guide
concerns: [security-throughline, ssdf-mapping, ai-security-automation]
---

# Security Guide

## Overview

Cross-cutting security guidance that defines security activities per stage,
shows how AI automation makes security nearly free at the Minimal tier, and
provides lightweight NIST SSDF traceability for organizations that need it.

### Why Security

Security defects found late cost 6-15x more to fix than those caught during
design. Yet teams consistently deprioritize security for delivery speed — not
because they don't care, but because security work feels like overhead layered
on top of "real" work. The result: security is treated as a gate at the end
rather than a quality layer woven through development.

### Purpose

- Define security activities at each SDLC stage, scaled by project risk tier
- Show how AI agents automate the majority of security work
- Provide a security throughline paralleling the measurement and learning
  throughlines
- Enable lightweight NIST Secure Software Development Framework (SSDF, SP
  800-218) traceability without requiring familiarity with the standard

> **Why SSDF?** Several secure development frameworks exist — OWASP SAMM
> (maturity-model focused), BSIMM (benchmarking against industry peers), and
> Microsoft SDL (prescriptive process). SSDF was chosen because it is
> practice-based rather than maturity-based, maps cleanly to SDLC stages rather
> than requiring a separate assessment process, and is increasingly referenced
> in US federal procurement and supply chain requirements (Executive Order
> 14028). If your organization already uses SAMM or BSIMM, the stage-by-stage
> activities in this guide still apply — only the traceability column changes.

### Key Principle

AI makes security nearly free at the Minimal tier. Dependency scanning, SAST,
secrets detection, and SBOM generation run automatically — teams get baseline
security coverage with zero additional effort beyond what AI does as part of
normal development.

### How to Use This Guide

1. Review the [**Security Throughline**](#security-throughline) table to see
   security activities across all 8 stages
2. Read [**How AI Makes Security Cheap**](#how-ai-makes-security-cheap) to
   understand what's automated vs. what needs human judgment
3. Drill into [**Security Activities by Stage**](#security-activities-by-stage)
   for your current stage
4. See [**SSDF Practice Mapping**](#ssdf-practice-mapping) only if your
   organization requires NIST SSDF traceability

---

## Security Throughline

Security activities flow through every stage, from data classification in
Initiation through vulnerability management in Support. Each stage builds on the
prior stage's security outputs.

The SSDF group column maps each activity to a NIST SSDF practice group: **PO** =
Prepare the Organization, **PS** = Protect the Software, **PW** = Produce
Well-Secured Software, **RV** = Respond to Vulnerabilities. See
[SSDF Practice Mapping](#ssdf-practice-mapping) for details — you can ignore
this column if SSDF traceability isn't relevant to your project.

| Stage                | Security activity                                           | AI automation                                      | SSDF group |
| -------------------- | ----------------------------------------------------------- | -------------------------------------------------- | ---------- |
| **Initiation**       | Classify data sensitivity and compliance scope              | AI suggests classification from project context    | PO         |
| **Requirements**     | Define security NFRs from sensitivity classification        | AI drafts security NFRs, flags gaps                | PO/PW      |
| **System Design**    | Design security architecture; threat model at tier level    | AI generates threat model draft, suggests controls | PW         |
| **Increment Design** | Assess security implications; flag auth/data/API changes    | AI flags security-relevant changes in design       | PW         |
| **Implementation**   | Secure coding + AI-automated scanning (SAST, deps, secrets) | SAST, dependency scan, secrets detection run in CI | PW         |
| **Verification**     | Validate security controls (dep scan through pen testing)   | AI runs security test suites, triages findings     | RV         |
| **Deployment**       | Verify release integrity; SBOM; pre-deployment checks       | AI generates SBOM, validates artifact integrity    | PS/RV      |
| **Support**          | Monitor CVEs; patch per SLA; incident response              | AI monitors CVE feeds, prioritizes vulnerabilities | RV         |

The throughline ensures security decisions compound rather than repeat. Data
sensitivity classified in Initiation drives NFRs in Requirements, which drive
architecture in System Design, which drives scanning in Implementation. No stage
starts from scratch.

---

## How AI Makes Security Cheap

Security work falls into three automation tiers. At the Minimal project risk
tier, Tier 1 activities run automatically with zero additional effort — making
baseline security coverage effectively free.

### Tier 1: Fully Automated

AI handles these without human intervention. They run as part of CI/CD or agent
workflows:

- **Dependency scanning** — flag known vulnerabilities in third-party packages
- **SAST (Static Application Security Testing)** — detect common vulnerability
  patterns in source code
- **Secrets detection** — prevent credentials, API keys, and tokens from
  entering version control
- **SBOM generation** — produce Software Bill of Materials at build time
- **CVE monitoring** — watch vulnerability databases for newly disclosed issues
  in project dependencies

### Tier 2: AI-Drafted, Human-Reviewed

AI produces the first draft; a human reviews for accuracy and completeness:

- **Threat models** — AI generates threat model from architecture description;
  human validates assumptions and prioritization
- **Security NFRs** — AI drafts requirements from data classification and
  compliance context; human confirms coverage
- **Vulnerability prioritization** — AI triages scan results by exploitability
  and blast radius; human makes fix/accept/defer decisions
- **Security test cases** — AI generates test scenarios from threat model; human
  reviews coverage

### Tier 3: Human-Led, AI-Assisted

Humans drive these activities; AI provides research and drafting support:

- **Security architecture decisions** — human decides authentication model,
  encryption strategy, trust boundaries; AI researches options
- **Compliance decisions** — human determines regulatory applicability; AI maps
  controls to requirements
- **Penetration test interpretation** — human contextualizes findings; AI helps
  draft remediation plans
- **Incident response** — human leads investigation and decisions; AI correlates
  logs and suggests root causes

### What This Means by Tier

| Project risk tier | Security effort                                                            |
| ----------------- | -------------------------------------------------------------------------- |
| **Minimal**       | Zero additional effort — Tier 1 activities run automatically via CI/AI     |
| **Standard**      | Tier 1 automatic + Tier 2 reviews during design and verification           |
| **Enterprise**    | All tiers active + formal compliance mapping, pen testing, security review |

---

## Security Activities by Stage

### Initiation

Classify data sensitivity and compliance scope so downstream stages know the
security posture required.

**What to do:**

| Minimal                                | Standard                                                               | Enterprise                                         |
| -------------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------- |
| Note if project handles sensitive data | Classify data sensitivity (public, internal, confidential, restricted) | Formal data classification with compliance mapping |

**How AI helps:** AI suggests data classification based on project description
and identifies likely compliance regimes (GDPR, HIPAA, SOC 2, PCI-DSS) from
context.

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

**How AI helps:** AI drafts security NFRs from the data sensitivity
classification — authentication, authorization, encryption, audit logging, data
retention. AI flags gaps where sensitivity level implies requirements not yet
captured.

**Security gate criteria:** Security NFRs captured with verification criteria;
reviewed by engineering (and security team for Enterprise tier).

**SSDF reference:** PO/PW (Prepare the Organization / Produce Well-Secured
Software) — define security requirements.

### System Design

Design the security architecture and create a threat model scaled to project
risk tier.

**What to do:**

| Minimal                  | Standard                                      | Enterprise                                     |
| ------------------------ | --------------------------------------------- | ---------------------------------------------- |
| Basic security awareness | Threat model for key areas, security baseline | Comprehensive threat model, compliance mapping |

**How AI helps:** AI generates a threat model draft from architecture
descriptions using STRIDE or similar methodology. AI suggests security controls
(authentication, encryption, input validation, rate limiting) mapped to
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

**How AI helps:** AI reviews increment scope against the threat model and flags
security-relevant changes — new API endpoints, data model changes,
authentication flow changes, third-party integrations. AI suggests security test
cases for the Verification stage.

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
- **Standard+:** AI reviews code changes for OWASP Top 10 patterns (injection,
  XSS, broken auth, sensitive data exposure)
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

**How AI helps:** AI runs security test suites, triages findings by severity and
exploitability, and generates remediation guidance. At Standard+ tiers, AI
validates that security NFRs from Requirements are covered by test results.

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

**How AI helps:** AI generates SBOM automatically at build time, validates
artifact checksums, and runs pre-deployment security checks (no new critical
CVEs since last scan, secrets not embedded in artifacts, configuration
reviewed).

**Security gate criteria:** SBOM generated; artifact integrity verified;
pre-deployment security checks passed.

**SSDF reference:** PS/RV (Protect the Software / Respond to Vulnerabilities) —
protect released software and verify integrity.

### Support

Monitor for new vulnerabilities, patch per SLA, and maintain incident response
readiness.

**What to do:**

| Minimal                               | Standard                               | Enterprise                                       |
| ------------------------------------- | -------------------------------------- | ------------------------------------------------ |
| Scan weekly, patch critical in 7 days | CVE monitoring, patch per severity SLA | Continuous monitoring, formal vulnerability mgmt |

**How AI helps:** AI monitors CVE feeds for dependencies in the project's SBOM,
prioritizes vulnerabilities by exploitability and blast radius, and drafts patch
plans. AI assists with security incident investigation by correlating logs and
suggesting root causes.

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
| **RV**     | Respond to Vulnerabilities    | Identify, triage, and remediate vulnerabilities in released software | Verification, Deployment, Support                                           |

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

**Last Updated:** 2026-03-01

Added to framework in v0.25.0.
