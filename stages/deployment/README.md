---
id: deployment
stage_number: 7
execution_pattern: iterative
inputs:
  - verified-code
  - uat-sign-off
outputs:
  - artifact: deployed-system
    template: templates/deployment-brief.md
  - artifact: deployment-log
  - artifact: updated-runbooks
  - artifact: release-notes
  - artifact: baseline-measurements
  - artifact: monitoring-dashboards
  - artifact: incident-response-procedures
  - artifact: rollback-procedure
  - artifact: retrospective-action-items
gates:
  - type: human-execution-required
    name: "Production Deployment Approval"
feeds_into: [support, increment-design]
checklist: stages/deployment/checklist.md
reference: stages/deployment/reference.md
---

# AI-Assisted SDLC: Deployment Stage

## Overview

Operational guidance for delivering verified code into live systems safely and
reliably.

### Why Deployment

Software projects fail at the last mile when deployment is treated as an
afterthought — untested rollbacks, missing monitoring, poor communication, and
"big bang" releases that put everything at risk. Deployment bridges the gap
between "code works in testing" and "code delivers value to users" by delivering
production releases incrementally with rollback capability, confirming
production health and instrumentation, keeping stakeholders informed throughout,
and capturing monitoring baselines for ongoing Support.

### Purpose

- Provide stage-specific guidance and rationale for Deployment
- Describe how AI assists at each activity
- Explain right-sizing Deployment effort to project complexity
- Guide practitioners from verified increment to production handoff

### Key Principle

Every deployment must be reversible and observable. If you can't roll back
quickly and you can't see what's happening, you aren't ready to deploy.

### Starting Point

A verified increment with all tests passing, UAT sign-off from business
stakeholders, production readiness checklist passed, and test results and known
issues documented.

> This stage operates from the **artifacts location**. See
> [Working Locations](../../guides/framework.md#working-locations).

### How to Use This Guide

> **First time deploying this project?** If deployment infrastructure doesn't
> exist yet (or isn't documented), start with the
> [Deployment Setup Guide](setup.md) and
> [Deployment Pipeline Checklist](pipeline-checklist.md) before using this
> guide. This guide covers per-increment deployment execution.

> **DevOps and Platform Engineers:** For pipeline setup, environment promotion,
> and release patterns across the full lifecycle, see the
> [DevOps Integration Guide](../../guides/devops-integration.md).

1. Read [**How AI Helps**](#how-ai-helps) to determine your AI autonomy tier
2. Read [**Right-Sizing Deployment**](#right-sizing-deployment) to match effort
   to your project's risk tier
3. Fill out the [Deployment Brief Template](../../templates/deployment-brief.md)
   for this increment's deployment plan
4. Deploy using the [**Deployment Workflow**](#deployment-workflow)
5. Run the [Deployment Checklist](checklist.md) before, during, and after
   deployment
6. Record the deployment decision using the
   [Gate Decision Template](../../templates/gate-decision.md)

For cross-cutting framework concepts, see
[Framework Guide](../../guides/framework.md).

---

## How AI Helps

AI can assist with Deployment at whatever autonomy tier your team is comfortable
with — from generating scripts to monitoring pipelines.

### AI Autonomy Spectrum

Match AI's role to your team's autonomy comfort level. Gate requirements always
apply regardless of tier — even at the AI-Led tier, **humans own all production
approval gates; pipelines execute deployment steps**. See the
[AI Assistance Scorecard: AI Autonomy Spectrum](../../guides/ai-assistance.md#ai-autonomy-spectrum)
for full tier definitions.

| Human-Led                             | Collaborative                       | AI-Led                                                                          |
| ------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------- |
| Engineer writes runbook; AI templates | AI drafts runbook; engineer reviews | AI monitors pipeline, recommends gate decisions with evidence; engineer decides |

At the AI-Led tier, oversight intensity can be tuned from Active to Minimal —
see
[AI Assistance Scorecard: Oversight Intensity](../../guides/ai-assistance.md#oversight-intensity).
For detailed AI-Led patterns, see
[Stage Reference](reference.md#ai-led-patterns).

### AI Assistance Patterns

- **Deployment script generation:** Describe your infrastructure and AI produces
  deployment scripts, rollback procedures, and runbooks
- **Pre-deployment review:** AI walks through the checklist and flags gaps or
  risks in your deployment plan
- **Communication drafting:** AI drafts stakeholder notifications for each
  deployment phase
- **Monitoring configuration:** AI suggests alert thresholds, dashboard layouts,
  and health check endpoints for your stack

For assistance level details, see the
[AI Assistance Scorecard](../../guides/ai-assistance.md).

> **Required gates:** Human execution required + runbook — Production actions
> have high blast radius and require real-time context; AI drafts and monitors,
> humans own all approval gates and execute deployment steps.

---

## Right-Sizing Deployment

Not every project needs multi-environment promotion or canary deploys. Match
your per-increment deployment effort to your project's risk tier.

| Practice               | Minimal                            | Standard                                       | Enterprise                                        |
| ---------------------- | ---------------------------------- | ---------------------------------------------- | ------------------------------------------------- |
| **Deploy method**      | Manual or scripted deploy          | CI/CD pipeline with automated steps            | Multi-stage pipeline with approval gates          |
| **Environments**       | Production only (or prod + local)  | Staging + production                           | Dev → staging → pre-prod → production             |
| **Rollback plan**      | Redeploy previous version manually | Documented rollback steps, tested periodically | Automated rollback triggers, blue-green or canary |
| **Monitoring cadence** | Check health after deploy          | Watch dashboards for 15-30 min post-deploy     | Automated canary analysis, extended observation   |
| **Communication**      | Notify team in chat                | Deployment announcement to stakeholders        | Change management process, scheduled windows      |
| **Data/state changes** | Apply manually if needed           | Migration scripts with rollback                | Versioned migrations, dry-run validation, backups |
| **Security**           | Basic release verification         | SBOM generated, artifact integrity verified    | Full supply chain verification, signed artifacts  |

Expand Deployment only when needed:

- **High availability / zero-downtime required:** Add blue-green or canary
  strategy, automated rollback triggers
- **Database migrations or state changes:** Add versioned migrations, dry-run
  validation, backup verification
- **Regulated / compliance-heavy:** Add change management process, approval
  gates, audit trail
- **Multi-team or shared infrastructure:** Add scheduled deployment windows,
  cross-team coordination
- **Large user base:** Add gradual rollout strategy, extended monitoring, canary
  analysis

Otherwise, keep deployment straightforward and hand off to Support.

> These triggers help you decide when to move from Minimal to Standard or
> Enterprise. For full tier definitions and choosing criteria, see the
> [Right-Sizing Guide](../../guides/right-sizing.md).

---

## Deployment Workflow

```
-- PHASE 1: PREPARATION --

 1. Review production readiness assessment
 2. Verify deployment strategy and rollback plan
    [Human approves deployment plan]
 3. Prepare environment and configuration
 4. Notify stakeholders of deployment schedule

-- PHASE 2: EXECUTION --

 5. Execute deployment per chosen strategy
    [CI/CD gate: automated tests pass]
 6. Run smoke tests and health checks
    [Gate: production health confirmed]
 7. Validate success criteria instrumentation
 8. Monitor stabilization period (30-60 min)

-- PHASE 3: CONFIRMATION --

 9. Confirm deployment success
    [Human sign-off: go/no-go for rollback window close]
 10. Notify stakeholders of completion
 11. Complete deployment brief
 12. Continue monitoring (24-48 hours)

HANDOFF TO SUPPORT
```

> Steps 5–8 vary by deployment strategy — see
> [Deployment Reference: Strategy-Specific Checklists](reference.md#deployment-strategies)
> for per-strategy details.

---

## Deployment Guidance

### Core Principles

1. **Reversibility** — every deployment must be easily reversible through
   rollback
2. **Observability** — monitor deployments closely to detect issues immediately
3. **Incrementality** — deploy small, frequent changes rather than large, risky
   batches
4. **Automation** — automate deployment processes to reduce human error
5. **Communication** — keep stakeholders informed throughout
6. **Validation** — verify production health before and after deployment

### Deployment Strategies

Choose based on risk tolerance, rollback speed needs, infrastructure
capabilities, and deployment frequency.

| Factor          | Blue/Green | Canary | Rolling | Feature Flag |
| --------------- | ---------- | ------ | ------- | ------------ |
| Zero downtime   | Yes        | Yes    | Yes     | Yes          |
| Cost            | High (2x)  | Medium | Low     | Low          |
| Rollback speed  | Instant    | Fast   | Slow    | Instant      |
| Complexity      | Medium     | High   | Low     | High         |
| Gradual rollout | No         | Yes    | Partial | Yes          |

**Recommendation:** Start with rolling deployment, add feature flags as you
mature, use canary for high-risk changes, consider blue/green for
zero-downtime-critical systems.

> For strategy details and strategy-specific checklists, see
> [Deployment Reference: Deployment Strategies](reference.md#deployment-strategies).

### Data and State Changes

Deployments often involve more than code — database migrations, cache
invalidation, search index updates, and feature flag changes may all be part of
a release. Plan these carefully.

**Database migrations** are often the riskiest data change. Migration types:
additive (safest), backward-compatible (safe), breaking (risky — requires
coordinated deployment). Use the expand-contract strategy for zero-downtime
migrations.

**Other data/state changes** to consider: cache invalidation strategy, search
index updates, feature flag state changes.

> For detailed guidance on database migrations, cache invalidation, search index
> updates, and feature flag management, see
> [Deployment Reference: Data and State Changes](reference.md#data-and-state-changes).

### Rollback Procedures

Every deployment must be reversible. Plan rollback before deploying.

**Example triggers (adjust to your baseline):**

- Core functionality broken
- Data corruption or loss
- Security vulnerability discovered
- Error rate >5% sustained for >5 minutes
- Performance collapse (response time >2x baseline)

Define rollback decision authority BEFORE deployment: deployment engineer for
technical issues, DevOps lead for major incidents, product manager for business
impact.

Document authority and escalation contacts in the
[Deployment Brief](../../templates/deployment-brief.md#rollback-plan) before
deployment begins.

> For detailed rollback procedures, data/state rollback considerations, and
> post-rollback actions, see
> [Deployment Reference: Rollback Procedures](reference.md#rollback-procedures).

### Shadow Mode and Gradual Rollout

Shadow mode deploys a feature against real production data with user-visible
effects suppressed. The system processes real inputs through the new code path
but does not execute the final side effect (sending emails, charging payments,
updating user-facing state). This validates behavior under production conditions
before any user impact.

**When to use:**

- High-risk changes where production behavior may differ from test environments
- Brownfield systems where production data volumes, patterns, or edge cases
  exceed what test environments cover
- Changes dependent on production data that cannot be fully replicated in
  staging

**Shadow mode pattern:**

1. **Deploy alongside** — deploy the new code path next to the existing one
2. **Route inputs through both** — production inputs flow through old and new
   paths simultaneously
3. **Compare outputs** — log discrepancies between old and new outputs without
   executing the new path's side effects
4. **Promote after validation** — once discrepancies are understood and
   resolved, promote the new path to active

**Gradual rollout progression:**

| Phase   | Traffic | Duration | Gate                                      |
| ------- | ------: | -------- | ----------------------------------------- |
| Shadow  |    100% | 24-48h   | No unexpected discrepancies in output     |
| Canary  |    1-5% | 2-4h     | Error rate and latency within baseline    |
| Partial |  10-50% | 4-24h    | Business metrics stable at partial volume |
| Full    |    100% | —        | All gates passed                          |

**Relationship to other strategies:** Shadow mode complements feature flags,
canary, and blue-green deployments rather than replacing them. Feature flags
provide the mechanism to route traffic; shadow mode defines the progression from
zero user impact to full rollout. Not every deployment needs shadow mode — use
it when production validation justifies the additional complexity.

> **Brownfield projects:** Shadow mode is especially valuable for T2-T3 projects
> transitioning from preparation to feature work, where test coverage may not
> yet capture all production edge cases. See the
> [Brownfield Readiness Guide](../../guides/brownfield-readiness.md#ai-operating-modes)
> for tier-specific guidance.

### Monitoring and Observability

Monitor application health, infrastructure health, database metrics, and
business metrics during and after every deployment.

**Cadence:** Active monitoring for first 2 hours, dashboard checks every 2 hours
for first 24 hours, daily review for first week.

> For specific thresholds, alert configuration, and health check details, see
> [Deployment Reference: Monitoring Thresholds](reference.md#monitoring-thresholds-and-cadence).

### Communication

Overcommunicate during deployments. Stakeholders prefer too much information to
being surprised.

**Timeline:** Notify 24-48h before, at deployment start, every 30 min during
long deployments, at completion, and immediately on rollback.

> For notification templates and channel guidance, see
> [Deployment Reference: Communication](reference.md#communication-templates).

### Additional Topics

The [Deployment Setup Guide](setup.md) covers project-level setup (do these
once, during Increment 0):

- **CI/CD pipeline** — design, build, and validate your pipeline
- **Environment management** — provisioning, parity, Infrastructure as Code
- **Configuration and secrets** — externalization principles, secrets management
  tools

The [Deployment Reference](reference.md) covers per-increment deep-dive topics:

- **Deployment patterns** — hotfix workflow, scheduled maintenance
- **Security** — pre- and post-deployment security checks
- **Decision trees** — before, during, and after deployment
- **Red flags** — stop-and-address signals at each phase

### Measurement Validation

Deployment validates that measurement systems work in production. See
[Framework Guide: Measurement Throughline](../../guides/framework.md#measurement-throughline).

**Deployment activities:**

- Confirm logging and metrics flow correctly in production
- Validate dashboards show real production data
- Verify alerts fire correctly (test alert)
- Capture baseline metrics for post-deployment comparison
- Confirm success criteria measurement working

---

## Stage Outputs

- **Deployed System** — live production release
- **Deployment Log** — execution details, timing, and issues encountered
- **Updated Runbooks** — operational procedures reflecting current deployment
- **Release Notes** — summary of changes for stakeholders
- **Baseline Measurements** — initial production metrics for post-deployment
  comparison
- **Monitoring Dashboards** — configured and validated production dashboards
- **Incident Response Procedures** — escalation paths and response playbooks
- **Rollback Procedure** — tested and documented rollback steps
- **Retrospective Action Items** — improvement items from deployment
  retrospective

> Deployment confirms that success criteria instrumentation is **active in
> production** and captures initial baselines. This is where the measurement
> throughline transitions from "tested in staging" to "live in production." See
> [Framework Guide: Measurement Throughline](../../guides/framework.md#measurement-throughline).

> Deployment is the point to run the increment retrospective (or project
> retrospective at wrap-up). Triage Captured Feedback entries accumulated during
> the increment into the retrospective's analysis sections. Use the
> [Retrospective Template](../../templates/retrospective.md). See
> [Framework Guide: Learning Throughline](../../guides/framework.md#learning-throughline).

> Deployment continues the **security throughline** by verifying release
> integrity, generating an SBOM, and running pre-deployment security checks. See
> [Security Guide](../../guides/security.md).

**Handoff:** Support stage receives the deployed system, monitoring dashboards,
support runbooks, release notes, baseline measurements, and escalation contacts
(see [Deployment Checklist — Support Handoff](checklist.md)). Record the
deployment decision using the
[Gate Decision Template](../../templates/gate-decision.md).

The Support team should verify readiness using the
[Support Readiness Checklist](../support/readiness-checklist.md) before
accepting ownership.

---

## When to Revisit Deployment

**After deployment failure:**

- Review what went wrong, update procedures
- Add validation steps, improve rollback

**Infrastructure changes:**

- New environments, architecture changes, tool changes

**Process issues:**

- Communication gaps, approval delays, missing validations

**Security concerns:**

- Incidents, new compliance requirements, access control gaps

> **Mid-stage discovery?** If something unexpected surfaces during deployment,
> see the [Mid-Stage Discovery](../../guides/framework.md#mid-stage-discovery)
> decision tree to determine whether to rework, amend scope, or defer.

---

## Notes

**Last Updated:** 2026-03-19

Added to framework in v0.7.0. Shadow Mode and Gradual Rollout added in v0.39.0.
