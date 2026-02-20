# Deployment Guide

> Stage-specific guidance for Deployment. For cross-cutting framework concepts,
> see [Framework Guide](../framework-guide.md).

---

## Quick Reference

**Purpose:** Deliver verified code into live, operational systems that deliver
value to end users, balancing speed with safety.

**Primary roles:** DevOps Engineers, Engineers

**Execution pattern:** Iterative (per increment)

**Key inputs:** Verified code, test results, UAT approval, production readiness
assessment, deployment checklist

**Key outputs:** Live production release, deployment brief, monitoring
baselines, rollback confirmation

**What good looks like:**

- Zero-downtime deployment with instant rollback
- Monitoring validates production health post-deploy
- Stakeholders notified at each phase
- Data and state changes tested and backward-compatible
- Success criteria instrumentation confirmed working
- Rollback plan tested before deployment

**Common pitfalls:**

- No rollback plan or untested rollback
- Data/state changes not backward-compatible
- Skipping staging validation
- Poor stakeholder communication during deployment
- Secrets committed to version control
- No post-deployment monitoring period
- Big bang deployments when zero-downtime is possible

**Checkpoint:** Deployment Approval — see
[Framework Guide: Checkpoints](../framework-guide.md#checkpoint-taxonomy)

**AI assistance:** AI assist only + runbook gates — see
[Framework Guide: AI Assistance](../framework-guide.md#ai-assistance-overview)

---

## What Is Deployment?

Deployment delivers verified, tested code to production safely and reliably. It
bridges the gap between "code works in testing" and "code delivers value to
users."

**Purpose:**

1. **Production delivery** — release working software to end users
2. **Risk management** — deploy incrementally with rollback capability
3. **Validation** — confirm production health and instrumentation
4. **Communication** — keep stakeholders informed throughout
5. **Baseline establishment** — capture monitoring baselines for ongoing Support

> **First time deploying this project?** If deployment infrastructure doesn't
> exist yet (or isn't documented), start with the
> [Deployment Setup Guide](deployment-setup-guide.md) and
> [Deployment Pipeline Checklist](deployment-pipeline-checklist.md) before using
> this guide. This guide covers per-increment deployment execution.

---

## AI Assistance

> **Assistance level:**
> [AI assist only + runbook gates](../framework-ai-assistance.md#level-6-ai-assist-only--runbook-gates-production-sensitive)
> — Production actions have high blast radius and require real-time context; AI
> drafts and monitors, humans own approval gates.

### AI Autonomy Spectrum

Match AI's role to your team's autonomy comfort level. The assistance level for
this stage
([Level 6](../framework-ai-assistance.md#level-6-ai-assist-only--runbook-gates-production-sensitive))
sets the ceiling; this spectrum adjusts who drives within that ceiling. Even at
the AI-Led tier, **humans own all production approval gates; pipelines execute
deployment steps**. See the
[AI Assistance Scorecard: AI Autonomy Spectrum](../framework-ai-assistance.md#ai-autonomy-spectrum)
for full tier definitions.

| Activity                | Human-Led                                 | Collaborative                                                          | AI-Led                                                                                              |
| ----------------------- | ----------------------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| **Runbook/playbook**    | Engineer writes; AI provides templates    | AI drafts from infrastructure specs; engineer reviews                  | AI generates and cross-references against recent incidents; engineer validates                      |
| **Release readiness**   | Engineer compiles evidence manually       | AI drafts readiness assessment from pipeline results; engineer decides | AI proactively gathers evidence across stages, flags blockers; engineer decides                     |
| **Gate approval**       | Engineer evaluates and approves promotion | AI summarizes risk and evidence; engineer approves                     | AI recommends with analysis of diff, coverage, and prior incidents; engineer approves               |
| **Pipeline monitoring** | Engineer watches pipeline output          | AI monitors and highlights failures; engineer investigates             | AI monitors, correlates failures with recent changes; engineer validates                            |
| **Rollout analysis**    | Engineer reviews metrics manually         | AI monitors canary metrics and flags anomalies; engineer decides       | AI analyzes metrics against baselines, recommends proceed or rollback; engineer decides             |
| **Rollback decision**   | Engineer decides based on own analysis    | AI recommends with evidence; engineer decides                          | AI monitors health and proactively recommends rollback with root-cause hypothesis; engineer decides |

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
> [Right-Sizing Guide](../right-sizing-guide.md).

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
> [Deployment Reference: Deployment Strategies](deployment-reference.md#deployment-strategies).

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
> [Deployment Reference: Data and State Changes](deployment-reference.md#data-and-state-changes).

### Rollback Procedures

Every deployment must be reversible. Plan rollback before deploying.

**Critical triggers (roll back immediately):**

- Core functionality broken
- Data corruption or loss
- Security vulnerability discovered
- Error rate >5% sustained for >5 minutes
- Performance collapse (response time >2x baseline)

Define rollback decision authority BEFORE deployment: deployment engineer for
technical issues, DevOps lead for major incidents, product manager for business
impact.

> For detailed rollback procedures, data/state rollback considerations, and
> post-rollback actions, see
> [Deployment Reference: Rollback Procedures](deployment-reference.md#rollback-procedures).

### Monitoring and Observability

Monitor application health, infrastructure health, database metrics, and
business metrics during and after every deployment.

**Cadence:** Active monitoring for first 2 hours, dashboard checks every 2 hours
for first 24 hours, daily review for first week.

> For specific thresholds, alert configuration, and health check details, see
> [Deployment Reference: Monitoring Thresholds](deployment-reference.md#monitoring-thresholds-and-cadence).

### Communication

Overcommunicate during deployments. Stakeholders prefer too much information to
being surprised.

**Timeline:** Notify 24-48h before, at deployment start, every 30 min during
long deployments, at completion, and immediately on rollback.

> For notification templates and channel guidance, see
> [Deployment Reference: Communication](deployment-reference.md#communication-templates).

### Additional Topics

The [Deployment Setup Guide](deployment-setup-guide.md) covers project-level
setup (do these once, during iteration 0):

- **CI/CD pipeline** — design, build, and validate your pipeline
- **Environment management** — provisioning, parity, Infrastructure as Code
- **Configuration and secrets** — externalization principles, secrets management
  tools

The [Deployment Reference](deployment-reference.md) covers per-increment
deep-dive topics:

- **Deployment patterns** — hotfix workflow, scheduled maintenance
- **Security** — pre- and post-deployment security checks
- **Decision trees** — before, during, and after deployment
- **Red flags** — stop-and-address signals at each phase

### Measurement Validation

Deployment validates that measurement systems work in production. See
[Framework Guide: Measurement Throughline](../framework-guide.md#measurement-throughline).

**Deployment activities:**

- Confirm logging and metrics flow correctly in production
- Validate dashboards show real production data
- Verify alerts fire correctly (test alert)
- Capture baseline metrics for post-deployment comparison
- Confirm success criteria measurement working

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

---

## Related Documents

- [Deployment Setup Guide](deployment-setup-guide.md)
- [Deployment Pipeline Checklist](deployment-pipeline-checklist.md)
- [Deployment Brief Template](deployment-brief-template.md)
- [Deployment Checklist](deployment-checklist.md)
- [Deployment Reference](deployment-reference.md)
- [AI-Assisted SDLC Stages](../framework-stages.md)

---

## Notes

**Last Updated:** 2026-02-20

Added to framework in v0.7.0.
