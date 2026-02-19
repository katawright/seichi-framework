# Right-Sizing Guide

> Framework-level guidance for scaling practices to your project. For
> cross-cutting framework concepts, see [Framework Guide](framework-guide.md).

---

## Why Right-Size?

Not every project needs every practice described in this framework. A prototype
for five internal users doesn't need contractual SLAs, and a regulated financial
platform shouldn't rely on informal monitoring. Right-sizing prevents two common
failures:

- **Over-engineering** — heavyweight processes that slow down small projects and
  frustrate teams
- **Under-engineering** — skipping critical practices that would have caught
  production failures early

The goal is to match your process investment to your project's actual risk and
team context.

---

## The Two Dimensions

Right-sizing has two independent dimensions:

### Project Risk → _What_ Practices

Project risk determines which practices you adopt at each stage. This framework
defines three tiers:

| Tier           | Risk Profile                                                                                  |
| -------------- | --------------------------------------------------------------------------------------------- |
| **Minimal**    | Low risk — MVPs, prototypes, experiments, internal tools with few users, low downtime cost    |
| **Standard**   | Moderate risk — production apps, broad internal adoption, services other teams depend on      |
| **Enterprise** | High risk — mission-critical, regulated, SLA-bound, PII/financial data, safety considerations |

### Team Size → _How Formal_

Team size determines how formally you apply those practices. A solo developer
running a Standard-tier project still does code review — but it might be a
self-review checklist rather than a pull request with two approvers.

See
[Framework Guide: Team Size Adaptation](framework-guide.md#team-size-adaptation)
for detailed guidance on solo, small-team, and large-team formality adjustments.

### How the Dimensions Interact

|                | Solo / Small Team                                                                             | Large Team                                                                             |
| -------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **Minimal**    | Lightest process — checklists, informal check-ins, minimal docs                               | Light process but with coordination — brief standups, shared checklists                |
| **Standard**   | Solid practices, lighter ceremony — self-review or pair review, internal SLOs, basic runbooks | Full ceremony — PR reviews, documented SLOs, on-call rotation, runbooks                |
| **Enterprise** | All required practices, adapted for small scale — one person may fill multiple roles          | Full formality — dedicated roles, formal gates, audit trails, compliance documentation |

**Key insight:** Tier determines _what_ you do. Team size determines _how much
ceremony_ surrounds it. A solo developer on an Enterprise project still needs
security reviews and compliance checks — they just don't need a change advisory
board.

---

## Choosing Your Tier

### Minimal

Choose Minimal when:

- Building an MVP, prototype, or experiment
- Internal tool with fewer than ~10 users
- Downtime cost is low (hours of outage are inconvenient, not costly)
- No regulatory or compliance requirements
- No external users or contractual obligations

**Examples:** Hackathon project, internal dashboard, proof of concept, team
utility script, design spike.

### Standard

Choose Standard when:

- Application serves real users in production
- Internal tool with broad adoption across the organization
- Other teams or services depend on your system
- Downtime has meaningful business impact
- Basic security and data protection matter

**Examples:** Internal CRM, customer-facing web app, shared microservice, data
pipeline feeding reports.

### Enterprise

Choose Enterprise when:

- System is mission-critical (downtime has financial or safety consequences)
- Regulated environment (healthcare, finance, government)
- Contractual SLAs with external customers
- Handles PII, financial data, or other sensitive information
- Compliance audits are expected

**Examples:** Payment processing, healthcare records system, customer-facing
SaaS with SLAs, trading platform.

---

## Your Tier Can Change

Projects evolve, and your tier should evolve with them. Common transitions:

- **Minimal → Standard:** Prototype gains traction and real users
- **Standard → Enterprise:** Product signs contractual SLAs or enters a
  regulated market

Reassess your tier at major milestones — particularly after Initiation and
Requirements, where expansion triggers signal that your project may need more
rigor:

- [Initiation Guide: When to Expand Beyond Minimal](initiation/initiation-guide.md#when-to-expand-beyond-minimal)
- [Requirements Guide: When to Expand Beyond Minimal](requirements/requirements-guide.md#when-to-expand-beyond-minimal)

---

## Cross-Stage Overview

This table summarizes what each tier looks like across all eight stages. See
each stage guide's Right-Sizing section for full details.

| Stage                                                              | Minimal                                             | Standard                                                           | Enterprise                                                                       |
| ------------------------------------------------------------------ | --------------------------------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| **[Initiation](initiation/initiation-guide.md)**                   | Brief problem statement, informal stakeholders      | Structured brief, identified stakeholders and risks                | Formal brief, governance structure, compliance scope                             |
| **[Requirements](requirements/requirements-guide.md)**             | Core user stories, basic acceptance criteria        | Prioritized backlog, NFRs, edge cases documented                   | Full requirements spec, compliance requirements, formal sign-off                 |
| **[System Design](system-design/system-design-guide.md)**          | Informal architecture notes, key technology choices | Architecture document, ADRs for major decisions, security baseline | Formal architecture review, comprehensive ADRs, security and compliance design   |
| **[Increment Design](increment-design/increment-design-guide.md)** | Task list with key decisions noted                  | Component specs, interface contracts, test strategy                | Detailed design docs, formal interface specs, risk assessment                    |
| **[Implementation](implementation/implementation-guide.md)**       | Self-review, basic tests, working code              | PR reviews, unit test coverage targets, instrumentation            | Formal code review, security scanning, audit trail, comprehensive tests          |
| **[Verification](verification/verification-guide.md)**             | Manual testing, basic smoke tests                   | Integration + functional tests, performance baseline, UAT          | Full test suite, security + accessibility + performance testing, formal go/no-go |
| **[Deployment](deployment/deployment-guide.md)**                   | Manual or scripted deploy, basic monitoring         | CI/CD pipeline, staging environment, rollback plan                 | Multi-environment promotion, canary/blue-green, change management                |
| **[Support](support/support-guide.md)**                            | Basic health checks, informal response              | APM + alerting, on-call rotation, runbooks                         | Full observability, 24x7 coverage, SLAs, incident management                     |

---

## Stage-Specific Right-Sizing

Each stage guide contains a detailed Right-Sizing section with a comparison
table showing exactly what each tier involves for that stage:

- [System Design Guide: Right-Sizing](system-design/system-design-guide.md#right-sizing-system-design)
- [Increment Design Guide: Right-Sizing](increment-design/increment-design-guide.md#right-sizing-increment-design)
- [Implementation Guide: Right-Sizing](implementation/implementation-guide.md#right-sizing-implementation)
- [Verification Guide: Right-Sizing](verification/verification-guide.md#right-sizing-verification)
- [Deployment Guide: Right-Sizing](deployment/deployment-guide.md#right-sizing-deployment)
- [Deployment Setup Guide: Right-Sizing](deployment/deployment-setup-guide.md#right-sizing-deployment-setup)
- [Support Guide: Right-Sizing](support/support-guide.md#right-sizing-support)

For Initiation and Requirements, see the "When to Expand Beyond Minimal"
sections which serve as right-sizing triggers:

- [Initiation Guide: When to Expand Beyond Minimal](initiation/initiation-guide.md#when-to-expand-beyond-minimal)
- [Requirements Guide: When to Expand Beyond Minimal](requirements/requirements-guide.md#when-to-expand-beyond-minimal)

---

## Notes

**Last Updated:** 2026-02-19

Added to framework in v0.13.0.
