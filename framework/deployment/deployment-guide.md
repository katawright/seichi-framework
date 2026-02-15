# Deployment Guide

**Last Updated:** 2026-02-14

> Stage-specific guidance for Deployment. For cross-cutting framework concepts,
> see [framework-guide.md](../framework-guide.md).

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

**AI autonomy:** Automated execution + human approval gates — see
[Framework Guide: AI Autonomy](../framework-guide.md#ai-autonomy-overview)

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

### Strategy Comparison

| Factor          | Blue/Green | Canary | Rolling | Feature Flag |
| --------------- | ---------- | ------ | ------- | ------------ |
| Zero downtime   | Yes        | Yes    | Yes     | Yes          |
| Cost            | High (2x)  | Medium | Low     | Low          |
| Rollback speed  | Instant    | Fast   | Slow    | Instant      |
| Complexity      | Medium     | High   | Low     | High         |
| Gradual rollout | No         | Yes    | Partial | Yes          |

### Blue/Green Deployment

Two identical environments (Blue = current, Green = new). Deploy to Green,
validate, switch traffic.

- Instant rollback (switch traffic back)
- Requires double infrastructure
- Database migrations must be backward-compatible

### Canary Deployment

Deploy to small subset (5-10%), monitor, gradually increase traffic if healthy.

- Limited blast radius
- Real production validation
- Requires traffic routing and metrics segmentation

### Rolling Deployment

Gradually update instances one at a time or in batches.

- No extra infrastructure needed
- Mixed versions during rollout
- Slower rollback (must redeploy previous version)

**Recommendation:** Start with rolling deployment, add feature flags as you
mature, use canary for high-risk changes, consider blue/green for
zero-downtime-critical systems.

### Feature Flags

Deploy code with features disabled, enable via configuration without
redeployment.

- Decouples deployment from release
- Instant rollback (toggle flag off)
- Adds code complexity; flags must be cleaned up

Consult your team's feature flag tools and practices for implementation
guidance.

---

## Environment Management

### Environment Pipeline

```
Development → Staging/QA → Pre-Production → Production
```

**Key environments:**

- **Development** — engineer testing, synthetic data, continuous deployment
- **Staging/QA** — verification testing, production-like data (anonymized),
  per-increment deployment
- **Pre-Production** (optional) — final validation, production-identical
  infrastructure
- **Production** — live system, real users, controlled monitored releases

### Environment Parity

Differences between staging and production cause "works in staging, fails in
production" issues.

**Achieve parity across:** infrastructure, configuration, data schema,
dependencies, resource allocation.

Use Infrastructure as Code (Terraform, CloudFormation) to maintain consistency.
Document environment-specific differences explicitly.

---

## Database Migrations

Database migrations are often the riskiest part of deployment. Plan carefully.

### Migration Types

- **Additive (safest)** — new tables, columns, indexes; old code ignores new
  structures
- **Backward-compatible (safe)** — modify existing structures compatibly
  (nullable columns, defaults)
- **Breaking (risky)** — remove or fundamentally change structures; requires
  coordinated deployment

### Expand-Contract Strategy (Recommended)

1. **Expand** — add new structures without removing old (both versions work
   simultaneously)
2. **Migrate** — copy data from old to new
3. **Contract** — remove old structures after all code updated

This enables zero-downtime migrations and easy rollback.

### Migration Best Practices

**Before:** Test in staging with production-sized data, estimate duration,
assess lock impact, back up database, write rollback script.

**During:** Monitor progress, check application health, validate incrementally.

**After:** Validate data integrity, check logs for errors, monitor performance,
plan cleanup of old structures.

### Common Pitfalls

- Adding non-nullable column without default (fails on existing rows)
- Creating index without CONCURRENTLY on large tables (locks table)
- Renaming column without expand-contract (breaks old code immediately)

---

## Configuration Management

### Principles

1. Externalize configuration from code
2. Never commit secrets to version control
3. Environment-specific values (dev vs. staging vs. production)
4. Validate on startup (fail fast if config missing)
5. Document expected configuration

### Secrets Management

Use dedicated tools for secrets: AWS Secrets Manager, HashiCorp Vault, Azure Key
Vault, Kubernetes Secrets.

**Never commit:** API keys, passwords, database credentials, private keys, OAuth
tokens.

**Best practices:** Rotate secrets after deployment, use different secrets per
environment, audit secret access.

---

## Rollback Procedures

Every deployment must be reversible. Plan rollback before deploying.

### When to Roll Back

**Critical triggers (roll back immediately):**

- Core functionality broken
- Data corruption or loss
- Security vulnerability discovered
- Error rate >5% sustained for >5 minutes
- Performance collapse (response time >2x baseline)

**Warning signs (investigate, may need rollback):**

- Error rate 2-5% above baseline
- Performance degradation 1.5-2x baseline
- Multiple user reports of same issue

### Rollback Decision Authority

Define decision maker BEFORE deployment:

- Deployment engineer — technical issues
- DevOps lead — major incidents
- Product manager — business impact assessment
- Escalation path documented

### Database Rollback Considerations

- **Additive migrations** — safe to leave after rollback; old code ignores new
  structures
- **Breaking migrations** — require rollback script or database backup
  restoration

### Post-Rollback Actions

1. Notify stakeholders (reason and impact)
2. Preserve evidence (logs, metrics, error reports)
3. Schedule retrospective
4. Fix root cause before redeploying
5. Update deployment brief

---

## Monitoring and Observability

### Key Metrics to Monitor

**Application health:** Error rate (<1% baseline), response time (p50/p95/p99),
throughput, success rate.

**Infrastructure health:** CPU (<70% baseline), memory (<80%), disk (<70%),
network I/O.

**Database metrics:** Connection pool usage, query time, deadlocks, replication
lag.

**Business metrics:** User activity, conversion rate, revenue (if applicable).

### Monitoring Cadence

**Before deployment:** Configure dashboards, define alert thresholds, capture
baseline metrics, verify success criteria instrumentation.

**During deployment:** Monitor dashboards every 5-15 minutes, watch for
anomalies, check logs, validate health checks.

**After deployment:** Continue monitoring 24-48 hours, review logs daily for
first week, track success criteria weekly for first month.

---

## Communication and Stakeholder Management

Overcommunicate during deployments. Stakeholders prefer too much information to
being surprised.

### Notification Timeline

- **Pre-deployment (24-48h)** — all stakeholders: schedule, expected impact, new
  features
- **Deployment start** — technical teams, support: in progress, expected
  duration
- **During (if >30min)** — progress updates every 30 minutes
- **Deployment complete** — all stakeholders: success, new features live, known
  issues
- **If rollback** — all stakeholders immediately: reason, impact, next steps

### Communication Channels

- Dedicated #deployments Slack channel
- Status page (customer-facing, if applicable)
- Email for formal notifications
- Incident channel for issues (#incident-YYYY-MM-DD)

---

## Common Deployment Patterns

### Hotfix Deployment

For critical bugs requiring immediate fix:

1. Branch from production tag (not main)
2. Implement minimal fix only
3. Fast-track testing (regression + fix validation)
4. Deploy with accelerated approval
5. Monitor closely
6. Merge hotfix back to main

**Anti-patterns:** bundling other changes, skipping testing, hotfixing minor
issues.

### Scheduled Maintenance

For breaking changes requiring downtime:

1. Schedule low-traffic maintenance window
2. Notify users 1-2 weeks in advance
3. Display maintenance page
4. Deploy and validate
5. Bring online and notify completion

---

## Deployment Automation

### CI/CD Pipeline

```
Code Push → Build → Tests → Package →
Deploy to Dev → Smoke Tests →
Deploy to Staging → Full Tests →
Manual Approval → Deploy to Production → Monitor
```

**Best practices:**

- Automate deployment to dev/staging
- Require manual approval for production
- Run smoke tests after each deployment
- Automatically roll back if health checks fail
- Deployment scripts must be idempotent
- Log every deployment step

---

## Security Considerations

**Before deployment:**

- No secrets in code or config files
- Dependencies scanned for vulnerabilities
- Access controls reviewed (least privilege)
- Audit logging enabled

**After deployment:**

- No secrets exposed in logs or error messages
- Security headers configured
- SSL/TLS certificates valid
- Authentication and authorization verified

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
- [Deployment AI Agent Prompt](deployment-ai-agent-prompt.md)
- [STAGES.md](../../STAGES.md)

---

## Notes

Added to framework in v0.7.0.
