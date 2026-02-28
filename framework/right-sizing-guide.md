# Right-Sizing Guide

## Overview

Practical guidance for scaling framework practices to fit a project's actual
risk and context.

### Why Right-Size

Not every project needs every practice. A prototype for five internal users
doesn't need contractual SLAs, and a regulated financial platform shouldn't rely
on informal monitoring. Without right-sizing, teams fall into one of two traps:
over-engineering (heavyweight processes that slow down small projects and
frustrate teams) or under-engineering (skipping critical practices that would
have caught production failures early).

### Purpose

- Prevent over-engineering on low-risk projects and under-engineering on
  high-risk ones
- Provide a consistent model for scaling practices across all 8 stages
- Help teams choose the right tier and evolve it as their project grows

For cross-cutting framework concepts, see [Framework Guide](framework-guide.md).

### Key Principle

Match your process investment to your project's actual risk and team context.
Risk tier determines _what_ you do, team size determines _how much ceremony_
surrounds it, and AI autonomy determines _how much AI drives_ the work.

### How to Use This Guide

1. Review the [**Cross-Stage Overview**](#cross-stage-overview) table to see
   what each tier looks like across all 8 stages
2. Understand the [**Three Dimensions**](#the-three-dimensions) that shape your
   process choices
3. Use [**Choosing Your Tier**](#choosing-your-tier) to select and evolve your
   tier
4. Drill into individual stage guides for detailed right-sizing tables

---

## Cross-Stage Overview

This table summarizes what each tier looks like across all eight stages. See
each stage guide's Right-Sizing section for full details.

| Stage                                              | Minimal                                             | Standard                                                           | Enterprise                                                                       |
| -------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| **[Initiation](initiation/README.md)**             | Brief problem statement, informal stakeholders      | Structured brief, identified stakeholders and risks                | Formal brief, governance structure, compliance scope                             |
| **[Requirements](requirements/README.md)**         | Core user stories, basic acceptance criteria        | Prioritized backlog, NFRs, edge cases documented                   | Full requirements spec, compliance requirements, formal sign-off                 |
| **[System Design](system-design/README.md)**       | Informal architecture notes, key technology choices | Architecture document, ADRs for major decisions, security baseline | Formal architecture review, comprehensive ADRs, security and compliance design   |
| **[Increment Design](increment-design/README.md)** | Task list with key decisions noted                  | Component specs, interface contracts, test strategy                | Detailed design docs, formal interface specs, risk assessment                    |
| **[Implementation](implementation/README.md)**     | Self-review, basic tests, working code              | PR reviews, unit test coverage targets, instrumentation            | Formal code review, security scanning, audit trail, comprehensive tests          |
| **[Verification](verification/README.md)**         | Manual testing, basic smoke tests                   | Integration + functional tests, performance baseline, UAT          | Full test suite, security + accessibility + performance testing, formal go/no-go |
| **[Deployment](deployment/deployment-guide.md)**   | Manual or scripted deploy, basic monitoring         | CI/CD pipeline, staging environment, rollback plan                 | Multi-environment promotion, canary/blue-green, change management                |
| **[Support](support/support-guide.md)**            | Basic health checks, informal response              | APM + alerting, on-call rotation, runbooks                         | Full observability, 24x7 coverage, SLAs, incident management                     |

---

## The Three Dimensions

Right-sizing has three independent dimensions:

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
[Framework Guide: Right-Sizing Your Process](framework-guide.md#right-sizing-your-process)
for detailed guidance on solo, small-team, and large-team formality adjustments.

### AI Autonomy → _How Much AI Drives_

AI autonomy determines how independently AI operates within each stage's gate
requirements. The [AI Assistance Scorecard](framework-ai-assistance.md) defines
three tiers:

| Tier              | Philosophy                 | AI Role                                                                                                     |
| ----------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Human-Led**     | Humans drive, AI assists   | AI produces drafts and options on request; humans direct every step and make every decision                 |
| **Collaborative** | Shared work with gates     | AI executes tasks within human-set agenda; humans review and approve at defined gates                       |
| **AI-Led**        | AI drives, humans validate | AI drives the process — setting agendas, identifying gaps, iterating proactively; humans steer and validate |

Your autonomy tier can vary by stage — a team might be AI-Led for Implementation
but Human-Led for Deployment. Tiers evolve as teams build confidence with AI
tooling.

For detailed tier definitions, cross-stage summary, and choosing guidance, see
the
[AI Assistance Scorecard: AI Autonomy Spectrum](framework-ai-assistance.md#ai-autonomy-spectrum).
Each stage guide also includes a stage-specific autonomy table in its AI
Assistance section.

### How the Dimensions Interact

|                | Solo / Small Team                                                                             | Large Team                                                                             |
| -------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **Minimal**    | Lightest process — checklists, informal check-ins, minimal docs                               | Light process but with coordination — brief standups, shared checklists                |
| **Standard**   | Solid practices, lighter ceremony — self-review or pair review, internal SLOs, basic runbooks | Full ceremony — PR reviews, documented SLOs, on-call rotation, runbooks                |
| **Enterprise** | All required practices, adapted for small scale — one person may fill multiple roles          | Full formality — dedicated roles, formal gates, audit trails, compliance documentation |

**Key insight:** Risk tier determines _what_ you do. Team size determines _how
much ceremony_ surrounds it. AI autonomy determines _how much AI drives_ the
work. A solo developer on an Enterprise project still needs security reviews and
compliance checks — they just don't need a change advisory board.

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

### Your Tier Can Change

Projects evolve, and your tier should evolve with them. Common transitions:

- **Minimal → Standard:** Prototype gains traction and real users
- **Standard → Enterprise:** Product signs contractual SLAs or enters a
  regulated market

Reassess your tier at major milestones — particularly after Initiation and
Requirements, where expansion triggers signal that your project may need more
rigor:

- [Initiation Guide: Right-Sizing Initiation](initiation/README.md#right-sizing-initiation)
- [Requirements Stage Guide: Right-Sizing Requirements](requirements/README.md#right-sizing-requirements)

---

## Notes

**Last Updated:** 2026-02-27

Added to framework in v0.13.0.
