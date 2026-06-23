---
id: deployment
inputs:
  - verified-code
  - uat-sign-off
  - production-readiness-assessment
  - infrastructure-plan
  - implementation-brief
outputs:
  - artifact: deployment-brief
    template: templates/deployment-brief.md
  - artifact: deployed-system
  - artifact: deployment-log
  - artifact: updated-runbooks
  - artifact: release-notes
  - artifact: baseline-measurements
  - artifact: monitoring-dashboards
  - artifact: incident-response-procedures
  - artifact: rollback-procedure
  - artifact: retrospective
    template: templates/retrospective.md
  - artifact: retrospective-action-items
    embedded_in: retrospective
checkpoints:
  - type: review
    protocol: human-approval
    name: "Production Deployment Approval"
    responsible_roles: [devops, appsec]
  - type: review
    protocol: human-approval
    name: "Compliance Approval"
    responsible_roles: [pm, appsec]
    condition: compliance # Standard/Enterprise tier with compliance requirements
checklist: stages/deployment/checklist.md
reference: stages/deployment/reference.md
working_location: artifacts
session_log_template: templates/session-log.md
raci_roles:
  { R: [devops], A: [devops], C: [arch, eng, qa, appsec, pjm], I: [pm, exec] }
---

# AI-Assisted SDLC: Deployment Stage

## Overview

Operational guidance for releasing verified increments to production safely and
reliably — and for deciding when a release happens.

### Why Deployment

Software projects fail at the last mile when deployment is treated as an
afterthought — untested rollbacks, missing monitoring, poor communication, and
"big bang" releases that put everything at risk. Deployment bridges the gap
between "code works in testing" and "code delivers value to users" by delivering
production releases incrementally with rollback capability, confirming
production health and instrumentation, keeping stakeholders informed throughout,
and capturing monitoring baselines for ongoing operations. Whether a given
increment ships now or defers to a later release is an elective, human-owned
decision this stage owns.

### Goals of This Guide

- Provide stage-specific guidance and rationale for Deployment
- Describe how AI assists at each activity
- Explain right-sizing Deployment effort to project complexity
- Guide practitioners from verified increment to production handoff
- Clarify when an increment releases versus defers, and who owns that decision

### Key Principle

Every deployment must be reversible and observable. If you can't roll back
quickly and you can't see what's happening, you aren't ready to deploy.

### Starting Point

When this increment's Deployment slot resolves as **Released** (see
[Release Disposition](#release-disposition)), the starting point is a verified
increment with all tests passing, UAT sign-off from business stakeholders,
production readiness assessment passed (the Production Readiness section of the
[Verification Brief](../../templates/verification-brief.md); covers test
results, security scan results, and performance validation; infrastructure
readiness is validated separately via the
[Deployment Pipeline Checklist](pipeline-checklist.md)),
[infrastructure plan from System Design](../system-design/README.md#infrastructure-planning),
implementation brief documenting what was built, and test results and known
issues documented.

> This stage operates from the **artifacts location**. See
> [Working Locations](../../guides/framework.md#working-locations).

### How to Use This Guide

> **First time deploying this project?** If deployment infrastructure doesn't
> exist yet (or isn't documented), start with the
> [Deployment Setup Guide](setup.md) and
> [Deployment Pipeline Checklist](pipeline-checklist.md) before using this
> guide. This guide covers per-increment deployment execution.

> **DevOps and Platform Engineers:** For pipeline setup, release patterns, and
> CI/CD integration across the full lifecycle, see the
> [DevOps Integration Guide](../../guides/devops-integration.md).

> **Execution authority:** Deployment preparation (steps 1-4: brief, runbook,
> environment prep) may use collaborative or agent work execution. The release
> decision (steps 5-8: production release, monitoring, rollback) is human-owned
> — made synchronously or pre-positioned via a pre-authorized automated path
> that the pipeline then executes. Gate requirements always apply.

1. Read [**How AI Helps**](#how-ai-helps) to determine your operating posture
   (see the Operating Model Guide)
2. Read [**Right-Sizing Deployment**](#right-sizing-deployment) to match effort
   to your project's tier
3. Fill out the [Deployment Brief Template](../../templates/deployment-brief.md)
   for this increment's deployment plan
4. Deploy using the [**Deployment Workflow**](#deployment-workflow)
5. Run the [Deployment Checklist](checklist.md) before, during, and after
   deployment
6. Record the deployment decision using the
   [Checkpoint Decision Template](../../templates/checkpoint-decision.md)

For cross-cutting framework concepts, see
[Framework Guide](../../guides/framework.md).

---

## Release Disposition

Deployment is an iterative stage — every increment has a Deployment slot — but a
production release is an **elective action**, not an automatic one. Each
increment's Deployment slot resolves one of two ways:

- **Released** — this increment ships to production.
- **Deferred** — the increment is verified (and, where applicable, staged), but
  its production release is rolled into a later increment's release. Record the
  deferral and its rationale with the
  [Checkpoint Decision Template](../../templates/checkpoint-decision.md).

### The Release Decision Is Always Human-Owned

What varies is the decision's _locus_, not whether a human makes it:

- **Synchronous** — a human approves the release at deploy time (a manual
  production gate).
- **Pre-positioned** — the human encoded the decision earlier: opening the pull
  request, enabling automerge, or setting a "verification green → promote"
  pipeline policy. The pipeline then executes a decision a human already made.

A fully automated CD pipeline is the pre-positioned case — it does not remove
the human decision, it relocates it. See
[Recording an Automated (Pre-Positioned) Release](#recording-an-automated-pre-positioned-release).

### Verification Precedes a Release

A full Verification pass normally precedes every production release — so a
project's release cadence drives its full-verification cadence. Releasing
without a full pass (an emergency hotfix, for example) is permitted, but it is
an explicit, recorded risk-acceptance decision: who authorized it, what
verification was skipped, why, and what compensating checks (smoke tests,
heightened monitoring, a tested rollback) are in place. See the
[hotfix workflow](reference.md#hotfix-deployment).

### Release Cadence and the Project-End Guarantee

Release cadence is a delivery choice:

- **Release per increment** — every increment's slot resolves as Released.
- **Release at the end** — intermediate increments defer; the release fires in
  the final increment's Deployment slot, covering the accumulated work. A thin,
  dedicated "release increment" is an optional variant.

Whatever the cadence, a project with a deployment target reaches **at least one
production release by project end**. The only case where Deployment does not
apply at all is a project with no deployment target — a local-only tool, spike,
or library — see
[When You Don't Need This Guide](setup.md#when-you-dont-need-this-guide).

---

## How AI Helps

AI can assist with Deployment at whatever operating posture your team is
comfortable with — from generating scripts to monitoring pipelines.

How autonomously this stage runs — who performs the work and who decides — is an
operating-model choice, not a fixed property of the stage. It is set per project
along two functions: **Work Execution** (Humans · Collaborative · Agents) and
**Authority** (interactive human · pre-authorized policy · delegated agent).
Gate requirements always apply regardless. See the
[Operating Model Guide](../../guides/operating-model.md).

### AI Assistance Patterns

- **Deployment script generation:** Describe your infrastructure and an agent
  produces deployment scripts, rollback procedures, and runbooks
- **Pre-deployment review:** An agent walks through the checklist and flags gaps
  or risks in your deployment plan
- **Communication drafting:** An agent drafts stakeholder notifications for each
  deployment phase
- **Monitoring configuration:** An agent suggests alert thresholds, dashboard
  layouts, and health check endpoints for your stack

For assistance level details, see the
[Operating Model Guide](../../guides/operating-model.md).

> **Required gates:** Human-owned release decision + runbook — production
> actions have high blast radius and require real-time context, so the release
> decision is human-owned (made synchronously or pre-positioned); AI drafts,
> executes within the pre-authorized path, and monitors, while humans own the
> release authority.

---

## Right-Sizing Deployment

Not every project needs multi-environment promotion or canary deploys. Match
your per-increment deployment effort to your project's tier.

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

Otherwise, keep deployment straightforward and hand off to Closure.

> These triggers help you decide when to move from Minimal to Standard or
> Enterprise. For full tier definitions and choosing criteria, see the
> [Right-Sizing Guide](../../guides/right-sizing.md).

### CD Projects: Minimal Deployment

For CD projects, each merged slice is **released to production via a
pre-authorized automated path** — the release decision was pre-positioned (pull
request, automerge, and a green-pipeline policy) and the pipeline executes it,
so the slot still resolves as Released. The full per-increment deployment
checklist is designed for discrete deployment events — most items are satisfied
by the CD pipeline on every merge. Use the per-merge checklist below for each
slice; reserve the full checklist for increment-level review.

**Per-merge deployment checklist (~5 items):**

1. **Pipeline green** — CI/CD passed for this merge
2. **Health check passing** — post-deploy health endpoint returns healthy
3. **Monitoring stable** — no new alerts triggered within observation window
4. **Rollback path exists** — automated rollback or revert-merge available
5. **Release noted** — commit message or changelog entry describes the change

**Increment-level deployment review:** At increment boundaries, confirm:

- All slices deployed successfully with no unresolved rollbacks
- Monitoring baselines captured across the full increment
- No lingering deployment-related issues
- Retrospective completed

**Using the full checklist with CD:** Mark items that the CD pipeline handles as
"Satisfied by CD pipeline" rather than N/A — this preserves traceability while
acknowledging automated coverage. Focus manual review on the Handoff to Closure
and Final Decision sections.

> **CD does not exempt human judgment concerns.** Breaking database migrations,
> cross-service deployment ordering, and infrastructure changes still require
> manual coordination — even with a fully automated pipeline.

### Recording an Automated (Pre-Positioned) Release

A fully automated CD pipeline does not make the Deployment stage "not
applicable" — the deployment still happens and a release still ships. What
changed is the _locus_ of the release decision: it was **pre-positioned**
(encoded in the pull request, automerge, and pipeline-gate policy) rather than
made synchronously at deploy time. The slot still resolves as **Released**.

Record a pre-positioned release lightly using the per-merge deployment checklist
above (~5 items). Reserve the full checklist and a
[Checkpoint Decision Template](../../templates/checkpoint-decision.md) entry for
the increment-level review; that entry should capture:

- **What the pipeline automates** and what standing policy the green-pipeline
  gate encodes
- **Re-evaluation triggers** — conditions that would require reinstating a
  synchronous gate (e.g., breaking DB migration, cross-service ordering, new
  infrastructure)

If an increment's slot resolves as **Deferred** instead, record that disposition
and its integration-risk note — see [Release Disposition](#release-disposition).

The only case where Deployment is genuinely **not applicable** is project-level:
a project with no deployment target at all — a local-only tool, spike, or
library. See
[Deployment Setup Guide: When You Don't Need This Guide](setup.md#when-you-dont-need-this-guide).

For the full CD model, see
[Framework Guide: CD Workflow Adaptations](../../guides/framework.md#cd-workflow-adaptations).

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

HANDOFF TO CLOSURE
```

> Steps 5–8 vary by deployment strategy — see
> [Deployment Reference: Strategy-Specific Checklists](reference.md#deployment-strategies)
> for per-strategy details.

---

## Why These Deployment Elements Matter

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

### Brownfield Database Deployment

Brownfield systems often have database deployment challenges that don't exist in
greenfield projects. This section covers common situations; adapt to your
system's specifics.

#### Bootstrapping a Migration Framework

When no migration history exists — schema changes have been applied manually or
via ad hoc scripts — bootstrapping a migration framework is a preparation
activity, not a feature activity.

- **Baseline capture:** Capture the current schema as the initial migration
  (e.g., V001). This migration is never run against the existing database — it
  documents the starting point. All subsequent migrations apply forward from
  this baseline.
- **First production use:** The migration framework itself is untested in
  production. Validate the framework in staging before the first production run.
  Take a schema backup immediately before the first migration.
- **Forward-only migrations:** When the migration tool lacks undo support (e.g.,
  Flyway Community Edition), co-locate manual rollback scripts alongside forward
  migrations. Establish the convention early — e.g., a `rollback/` directory
  with scripts numbered to match their forward counterparts. Test rollback
  scripts in staging before production use.

#### DBA-Mediated Deployment Steps

When database changes require DBA intervention — stored procedure deployment,
manual migration execution, maintenance window coordination — treat database
deployment as a **separate phase** from application deployment.

- **Lead time:** DBA teams often require 1-2 weeks notice for production
  changes. Factor this into increment planning, not just deployment planning.
- **Maintenance windows:** Database changes that require locks or downtime need
  scheduled maintenance windows. Coordinate timing between DBA and DevOps.
- **Rollback duration:** Manual DBA rollback (executing rollback scripts,
  restoring stored procedures) may take hours, not minutes. Document estimated
  rollback duration for each DBA-mediated step.
- **Handoff clarity:** Document exactly what the DBA executes, in what order,
  and what success looks like for each step. The DBA may not have project
  context — the deployment brief should be self-contained for their steps.

#### Heterogeneous Rollback

When different deployment components have different rollback timelines, document
the rollback sequence with per-phase timelines and mechanisms:

| Component         | Rollback mechanism  | Estimated time | Automation |
| ----------------- | ------------------- | -------------- | ---------- |
| Feature flags     | Disable in config   | Instant        | Automated  |
| Application       | Redeploy previous   | Minutes        | Automated  |
| Schema migration  | Run rollback script | Minutes-hours  | Manual     |
| Stored procedures | DBA executes script | Hours          | Manual     |

**Partial rollback as first response:** Disabling feature flags without rolling
back database changes may restore a safe state at minimal cost. Consider whether
partial rollback is sufficient before initiating full rollback — especially when
database rollback is manual and time-consuming.

**Rollback ordering when phases are interdependent:** If application code
depends on schema changes, roll back application code before rolling back
schema. If feature flags gate traffic to new code paths, disable flags first.
Document the ordering in the deployment brief.

#### Multi-Service Deployment Ordering

When deploying changes across multiple services with dependencies, determine
deployment order based on the
[cross-repo dependency graph](../../guides/brownfield-readiness.md#discovery-cross-repo-dependency-graph):

- **Producer before consumer** — deploy the service that provides data or events
  before the service that consumes them
- **Database before application** — apply schema changes before deploying code
  that depends on them
- **Application before feature activation** — deploy code before enabling flags
  that route traffic to new paths
- **Verification between phases** — confirm service A is healthy before
  deploying service B. Define health check criteria for each phase in the
  deployment brief.

**Rollback ordering:** Generally the reverse of deployment order. If service B
depends on service A's new endpoint, roll back service B before rolling back
service A. Document exceptions — feature flags may roll back independently of
service deployment order.

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
> [Brownfield Readiness Guide](../../guides/brownfield-readiness.md#readiness-tiers)
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

- **Deployment Brief** — primary container document for this stage's outputs
  (see [template](../../templates/deployment-brief.md))
- **Deployed System** — live production release
- **Deployment Log** — execution details, timing, and issues encountered
- **Updated Runbooks** — operational procedures reflecting current deployment
- **Release Notes** — summary of changes for stakeholders
- **Baseline Measurements** — initial production metrics for post-deployment
  comparison
- **Monitoring Dashboards** — configured and validated production dashboards
- **Incident Response Procedures** — escalation paths and response playbooks
  (Minimal: section in deployment brief; Standard+: standalone document) (see
  [Operations Guide](../../guides/operations.md#respond))
- **Rollback Procedure** — tested and documented rollback steps (section in
  Deployment Brief or standalone runbook)
- **Retrospective** — increment retrospective capturing what went well, what
  didn't, and action items (see
  [Retrospective Template](../../templates/retrospective.md))
- **Retrospective Action Items** — improvement items from deployment
  retrospective (embedded in Retrospective)

> Deployment confirms that success criteria instrumentation is **active in
> production** and captures initial baselines. This is where the measurement
> throughline transitions from "tested in staging" to "live in production." See
> [Framework Guide: Measurement Throughline](../../guides/framework.md#measurement-throughline).

> Deployment is the point to run the increment retrospective (or project
> retrospective at wrap-up). Triage the typed entries from the project's
> friction log into the retrospective's analysis sections. Use the
> [Retrospective Template](../../templates/retrospective.md). See
> [The Learning Loop](../../guides/learning-loop.md).

> Deployment continues the **security throughline** by verifying release
> integrity, generating an SBOM, and running pre-deployment security checks. See
> [Security Guide](../../guides/security.md).

**Handoff:** Closure stage receives the deployed system, monitoring dashboards,
updated runbooks, incident response procedures, rollback procedure, baseline
measurements, release notes, and success criteria register (the raw material for
the operational handoff record); the running system then hands off to Operations
(see [Operations Guide](../../guides/operations.md)). Originating from
Initiation, verify the handoff team has access to the success criteria register
during handoff. Retrospective action items feed into the next Increment Design
cycle (see
[Deployment Checklist — Closure Handoff](checklist.md#handoff-to-operations-and-closure)).
When the same role owns both Deployment and Closure, apply the handoff checklist
as a self-review rather than a cross-team transfer. Distribute checkpoint or
gate decision artifacts to all Informed roles per the
[Information Protocol](../../guides/roles.md#information-protocol). Record the
deployment decision using the
[Checkpoint Decision Template](../../templates/checkpoint-decision.md).

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
> decision tree to determine whether to assess, amend, or defer.

---

## Notes

**Last Updated:** 2026-06-22

Added to framework in v0.7.0. Shadow Mode and Gradual Rollout added in v0.39.0.
Brownfield Database Deployment section added in v0.42.0. Compliance Approval
`condition` checkpoint metadata added in v0.45.0. Release Disposition section
and the elective-release model added in v0.45.0. v0.49: autonomy vocabulary
repointed to the operating model; Support→Closure/Operations refs updated.
