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

### Goals of This Guide

- Prevent over-engineering on low-risk projects and under-engineering on
  high-risk ones
- Provide a consistent model for scaling practices across all 8 stages
- Help teams choose the right tier and evolve it as their project grows

For cross-cutting framework concepts, see [Framework Guide](framework.md).

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

| Stage                                                        | Minimal                                             | Standard                                                           | Enterprise                                                                       |
| ------------------------------------------------------------ | --------------------------------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| **[Initiation](../stages/initiation/README.md)**             | Brief problem statement, informal stakeholders      | Structured brief, identified stakeholders and risks                | Formal brief, governance structure, compliance scope                             |
| **[Requirements](../stages/requirements/README.md)**         | Core user stories, basic acceptance criteria        | Prioritized backlog, NFRs, edge cases documented                   | Full requirements spec, compliance requirements, formal sign-off                 |
| **[System Design](../stages/system-design/README.md)**       | Informal architecture notes, key technology choices | Architecture document, ADRs for major decisions, security baseline | Formal architecture review, comprehensive ADRs, security and compliance design   |
| **[Increment Design](../stages/increment-design/README.md)** | Task list with key decisions noted                  | Component specs, interface contracts, test strategy                | Detailed design docs, formal interface specs, risk assessment                    |
| **[Implementation](../stages/implementation/README.md)**     | Self-review, basic tests, working code              | PR reviews, unit test coverage targets, instrumentation            | Formal code review, security scanning, audit trail, comprehensive tests          |
| **[Verification](../stages/verification/README.md)**         | Manual testing, basic smoke tests                   | Integration + functional tests, performance baseline, UAT          | Full test suite, security + accessibility + performance testing, formal go/no-go |
| **[Deployment](../stages/deployment/README.md)**             | Manual or scripted deploy, basic monitoring         | CI/CD pipeline, staging environment, rollback plan                 | Multi-environment promotion, canary/blue-green, change management                |
| **[Support](../stages/support/README.md)**                   | Basic health checks, informal response              | APM + alerting, on-call rotation, runbooks                         | Full observability, 24x7 coverage, SLAs, incident management                     |

### Minimum Viable Artifacts

Which templates to produce at each tier. **Required** = must complete before the
stage gate. **Recommended** = high value, skip only with justification.
**Optional** = use when the tier-specific guidance calls for it.

| Template                                                               | Stage            | Minimal     | Standard    | Enterprise  |
| ---------------------------------------------------------------------- | ---------------- | ----------- | ----------- | ----------- |
| [Initiation Brief](../templates/initiation-brief.md)                   | Initiation       | Required    | Required    | Required    |
| [Gate Decision](../templates/gate-decision.md)                         | Initiation       | Optional    | Required    | Required    |
| [Success Criteria Register](../templates/success-criteria-register.md) | Initiation       | Optional    | Recommended | Required    |
| [Requirements Brief](../templates/requirements-brief.md)               | Requirements     | Recommended | Required    | Required    |
| [System Design Brief](../templates/system-design-brief.md)             | System Design    | Optional    | Required    | Required    |
| [ADR](../templates/adr.md)                                             | System Design    | Optional    | Recommended | Required    |
| [Increment Design Brief](../templates/increment-design-brief.md)       | Increment Design | Optional    | Required    | Required    |
| [Implementation Brief](../templates/implementation-brief.md)           | Implementation   | Optional    | Required    | Required    |
| [Session Log](../templates/session-log.md)                             | Implementation   | Optional    | Recommended | Required    |
| [Verification Brief](../templates/verification-brief.md)               | Verification     | Optional    | Required    | Required    |
| [Deployment Brief](../templates/deployment-brief.md)                   | Deployment       | Optional    | Required    | Required    |
| [Runbook](../templates/runbook.md)                                     | Deployment       | Optional    | Recommended | Required    |
| [Support Brief](../templates/support-brief.md)                         | Support          | Optional    | Required    | Required    |
| [Retrospective](../templates/retrospective.md)                         | Deployment       | Recommended | Recommended | Required    |
| [Checkpoint Decision](../templates/checkpoint-decision.md)             | Any              | Optional    | Optional    | Recommended |

> **Minimal tier:** The Initiation Brief is the only universally required
> artifact. Everything else scales with risk. A Minimal project that never
> deploys may skip Deployment, Support, and their artifacts entirely. If your
> team already does informal code review, writes tests for critical paths, and
> has basic CI — you are roughly operating at the Minimal tier. The framework
> names and organizes these practices; it does not add new activities at this
> tier.

> **Standard and Enterprise tiers:** AI drafts most artifacts from project
> context — your primary effort is review and refinement, not authoring from
> scratch. See each stage's "How AI Helps" section for the full model.

> **CD projects:** Verification Brief, Deployment Brief, and Support Brief
> remain applicable but shift to increment-close summaries. See each stage's CD
> subsection for what to include.

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
[Framework Guide: Right-Sizing Your Process](framework.md#right-sizing-your-process)
for detailed guidance on solo, small-team, and large-team formality adjustments.

### AI Autonomy → _How Much AI Drives_

AI autonomy determines how independently AI operates within each stage's gate
requirements. The [AI Assistance Scorecard](ai-assistance.md) defines three
tiers:

| Tier              | Philosophy                 | AI Role                                                                                                     |
| ----------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Human-Led**     | Humans drive, AI assists   | AI produces drafts and options on request; humans direct every step and make every decision                 |
| **Collaborative** | Shared work with gates     | AI executes tasks within human-set agenda; humans review and approve at defined gates                       |
| **AI-Led**        | AI drives, humans validate | AI drives the process — setting agendas, identifying gaps, iterating proactively; humans steer and validate |

Your autonomy tier can vary by stage — a team might be AI-Led for Implementation
but Human-Led for Deployment. Tiers evolve as teams build confidence with AI
tooling.

Within the AI-Led tier, teams also tune **oversight intensity** — from Active
(review every gate thoroughly) to Minimal (review summary only). See
[AI Assistance Scorecard: Oversight Intensity](ai-assistance.md#oversight-intensity)
for the full model and risk-tier mapping.

For detailed tier definitions, cross-stage summary, and choosing guidance, see
the
[AI Assistance Scorecard: AI Autonomy Spectrum](ai-assistance.md#ai-autonomy-spectrum).
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

> **Project type is a separate dimension.** Greenfield and brownfield projects
> use the same tiers but differ in foundation work and stage emphasis. See
> [Framework Guide: Greenfield vs. Brownfield Projects](framework.md#greenfield-vs-brownfield-projects).

### CD as a Delivery Practice Modifier

CD (Continuous Deployment) is orthogonal to risk tiers — it changes _when_
iterative stage activities happen, not _whether_ they happen. A project can be
Minimal+CD or Enterprise+CD.

| Stage          | Without CD (batch)              | With CD (per-slice)                        |
| -------------- | ------------------------------- | ------------------------------------------ |
| Implementation | All slices, then increment gate | Per-slice gate (PR + CI); summary at close |
| Verification   | Batch verification after code   | Per-slice CI; increment-close summary      |
| Deployment     | Discrete deployment event       | Per-merge automated pipeline               |
| Support        | Handoff after deployment        | Monitoring active from first deploy        |

For the full model, see
[Framework Guide: CD Workflow Adaptations](framework.md#cd-workflow-adaptations).
For stage-specific CD guidance:

- [Implementation: Per-Slice Gates](../stages/implementation/README.md#cd-projects-per-slice-gates)
- [Verification: Lightweight Verification](../stages/verification/README.md#cd-projects-lightweight-verification)
- [Deployment: Minimal Deployment](../stages/deployment/README.md#cd-projects-minimal-deployment)
- [Support: Minimal Support](../stages/support/README.md#cd-projects-minimal-support)

### Time-Cost Estimates by Stage

Rough time ranges per stage, assuming a small team (2–5 people) at Standard
tier. Actual time depends on project scope, team experience, and AI maturity.
Minimal-tier projects trend toward the low end; Enterprise toward the high end
or beyond.

| Stage            | Typical Duration | Primary Cost Driver                       |
| ---------------- | ---------------- | ----------------------------------------- |
| Initiation       | 1–3 days         | Stakeholder alignment, scope clarity      |
| Requirements     | 3–10 days        | Elicitation breadth, domain complexity    |
| System Design    | 3–10 days        | Architecture complexity, unknowns         |
| Increment Design | 1–3 days         | Increment scope, interface complexity     |
| Implementation   | 1–4 weeks        | Feature scope, technical complexity       |
| Verification     | 2–5 days         | Test coverage requirements, NFR targets   |
| Deployment       | 1–3 days         | Infrastructure maturity, rollout strategy |
| Support          | Ongoing          | Incident volume, SLA commitments          |

> These estimates cover stage activities, not elapsed calendar time (which
> includes review cycles, stakeholder availability, and parallel work).
> Foundation work (greenfield bootstrap or brownfield discovery) adds 1–4 weeks
> depending on scope. See the [Project Foundation Guide](project-foundation.md)
> for details.

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

> **Greenfield Minimal projects** typically merge Increment 0 (bootstrap) and
> Increment 1 into a single increment, since the infrastructure setup is trivial
> enough to bundle with the first feature delivery.

> **Not every stage applies.** Some Minimal projects (console tools, spikes,
> experiments) run locally and never deploy to shared infrastructure. If your
> project has no deployment target, the Deployment and Support stages may not
> apply — or may be deferred until the project grows. See
> [Deployment Setup Guide](../stages/deployment/setup.md#when-you-dont-need-this-guide).

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
- **Local-only → deployed:** Project that started without deployment
  infrastructure gains users or moves to production. Introduce deployment using
  the [Deployment Setup Guide](../stages/deployment/setup.md) and
  [Project Foundation Guide](project-foundation.md) — treat it as foundation
  work for the deployment dimension.

Reassess your tier at major milestones — particularly after Initiation and
Requirements, where expansion triggers signal that your project may need more
rigor:

- [Initiation Guide: Right-Sizing Initiation](../stages/initiation/README.md#right-sizing-initiation)
- [Requirements Stage Guide: Right-Sizing Requirements](../stages/requirements/README.md#right-sizing-requirements)

---

## Notes

**Last Updated:** 2026-03-25

Added to framework in v0.13.0.
