# Deployment Guide

> Stage-specific guidance for Deployment. For cross-cutting framework concepts,
> see [Framework Guide](../framework-guide.md).

---

## Quick Reference

**Purpose:** Transform verified code into live, operational systems that deliver
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
- Database migrations tested and backward-compatible
- Success criteria instrumentation confirmed working
- Rollback plan tested before deployment

**Common pitfalls:**

- No rollback plan or untested rollback
- Database migrations not backward-compatible
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

## Core Principles

1. **Reversibility** — every deployment must be easily reversible through
   rollback
2. **Observability** — monitor deployments closely to detect issues immediately
3. **Incrementality** — deploy small, frequent changes rather than large, risky
   batches
4. **Automation** — automate deployment processes to reduce human error
5. **Communication** — keep stakeholders informed throughout
6. **Validation** — verify production health before and after deployment

---

## Deployment Strategies

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

---

## Database Migrations

Database migrations are often the riskiest part of deployment. Plan carefully.

**Migration types:** Additive (safest), backward-compatible (safe), breaking
(risky — requires coordinated deployment).

**Key principle:** Use the expand-contract strategy for zero-downtime migrations
— add new structures first, migrate data, then remove old structures after all
code is updated.

> For migration details, expand-contract walkthrough, and common pitfalls, see
> [Deployment Reference: Database Migrations](deployment-reference.md#database-migrations).

---

## Rollback Procedures

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

> For detailed rollback procedures, database rollback considerations, and
> post-rollback actions, see
> [Deployment Reference: Rollback Procedures](deployment-reference.md#rollback-procedures).

---

## Monitoring and Observability

Monitor application health, infrastructure health, database metrics, and
business metrics during and after every deployment.

**Cadence:** Active monitoring for first 2 hours, dashboard checks every 2 hours
for first 24 hours, daily review for first week.

> For specific thresholds, alert configuration, and health check details, see
> [Deployment Reference: Monitoring Thresholds](deployment-reference.md#monitoring-thresholds-and-cadence).

---

## Communication

Overcommunicate during deployments. Stakeholders prefer too much information to
being surprised.

**Timeline:** Notify 24-48h before, at deployment start, every 30 min during
long deployments, at completion, and immediately on rollback.

> For notification templates and channel guidance, see
> [Deployment Reference: Communication](deployment-reference.md#communication-templates).

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

## Additional Topics

The [Deployment Reference](deployment-reference.md) covers these topics in
depth:

- **Environment management** — pipeline, parity, Infrastructure as Code
- **Configuration and secrets** — externalization principles, secrets management
  tools
- **Deployment patterns** — hotfix workflow, scheduled maintenance
- **CI/CD pipeline** — automation structure and best practices
- **Security** — pre- and post-deployment security checks
- **Decision trees** — before, during, and after deployment
- **Red flags** — stop-and-address signals at each phase

---

## Measurement Validation

Deployment validates that measurement systems work in production. See
[Framework Guide: Measurement Throughline](../framework-guide.md#measurement-throughline).

**Deployment activities:**

- Confirm logging and metrics flow correctly in production
- Validate dashboards show real production data
- Verify alerts fire correctly (test alert)
- Capture baseline metrics for post-deployment comparison
- Confirm success criteria measurement working

---

## AI Assistance

**AI excels at:**

- Generating deployment scripts and runbooks
- Creating monitoring dashboards and alert configs
- Writing rollback procedures
- Drafting stakeholder communications
- Analyzing deployment metrics

**Human responsibilities:**

- Approve deployment plan and timing
- Make go/no-go and rollback decisions
- Own stakeholder communication
- Manage production access and security
- Sign off on deployment success

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

- [Deployment Brief Template](deployment-brief-template.md)
- [Deployment Checklist](deployment-checklist.md)
- [Deployment Reference](deployment-reference.md)
- [AI-Assisted SDLC Stages](../framework-stages.md)

---

## Notes

**Last Updated:** 2026-02-16

Added to framework in v0.7.0.
