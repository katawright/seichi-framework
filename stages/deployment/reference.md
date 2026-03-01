# Deployment Reference

## Overview

Detailed deployment practices, strategy-specific checklists, rollback
procedures, and operational templates — companion to the
[Deployment Stage Guide](README.md).

### Why This Reference

Stage guides keep guidance concise by design. When you need strategy-specific
checklists, rollback procedures, monitoring thresholds, communication templates,
or decision trees, this reference provides the detail.

### Purpose

- Provide detailed deployment strategy comparisons with per-strategy checklists
- Document rollback procedures, triggers, and decision authority
- Supply monitoring thresholds, alert configuration, and health check details
- Offer communication templates and deployment patterns
- Collect security checklists, decision trees, and red flags in one place

### Key Principle

Consult this reference when the stage guide's summary isn't enough — use it as a
starting point for AI-assisted exploration tailored to your stack.

### How to Use This Reference

1. Start with the [**Deployment Stage Guide**](README.md) for workflow and
   guidance summaries
2. Drill into sections here when you need specifics (e.g., strategy-specific
   checklists, rollback steps, monitoring thresholds)
3. Use the AI exploration prompts at the end of each section to generate
   stack-specific guidance

---

## Deployment Strategies

### Blue/Green Deployment

Two identical environments (Blue = current, Green = new). Deploy to Green,
validate, switch traffic.

- Instant rollback (switch traffic back)
- Requires double infrastructure
- Database migrations must be backward-compatible

**Checklist:**

- [ ] Blue and Green environments identical
- [ ] Deploy to inactive environment (Green)
- [ ] Validate Green environment thoroughly
- [ ] Switch traffic from Blue to Green
- [ ] Keep Blue running as rollback option for 24-48 hours

### Canary Deployment

Deploy to small subset (5-10%), monitor, gradually increase traffic if healthy.

- Limited blast radius
- Real production validation
- Requires traffic routing and metrics segmentation

**Checklist:**

- [ ] Deploy to canary subset (5-10% of instances/users)
- [ ] Monitor canary metrics for 15-30 minutes
- [ ] Gradually increase percentage (25% → 50% → 100%)
- [ ] Roll back if canary shows issues

### Rolling Deployment

Gradually update instances one at a time or in batches.

- No extra infrastructure needed
- Mixed versions during rollout
- Slower rollback (must redeploy previous version)

**Checklist:**

- [ ] Update instances/pods one at a time or in batches
- [ ] Validate each batch before proceeding
- [ ] Monitor for issues after each batch
- [ ] Continue until all instances updated

### Feature Flag Deployment

Deploy code with features disabled, enable via configuration without
redeployment.

- Decouples deployment from release
- Instant rollback (toggle flag off)
- Adds code complexity; flags must be cleaned up

**Checklist:**

- [ ] Deploy code with features disabled
- [ ] Validate deployment successful
- [ ] Enable features for internal users first
- [ ] Gradually roll out (percentage or user segments)
- [ ] Toggle features on/off without redeployment

> **AI exploration:** _"Compare deployment strategies for [describe your > >
> system, traffic patterns, and risk tolerance] and recommend an approach."_

---

## Data and State Changes

Deployments often involve more than code changes. This section covers data and
state changes that may accompany a deployment.

### Database Migrations

#### Migration Types

- **Additive (safest)** — new tables, columns, indexes; old code ignores new
  structures
- **Backward-compatible (safe)** — modify existing structures compatibly
  (nullable columns, defaults)
- **Breaking (risky)** — remove or fundamentally change structures; requires
  coordinated deployment

#### Expand-Contract Strategy (Recommended)

1. **Expand** — add new structures without removing old (both versions work
   simultaneously)
2. **Migrate** — copy data from old to new
3. **Contract** — remove old structures after all code updated

This enables zero-downtime migrations and easy rollback.

#### Migration Best Practices

**Before:** Test in staging with production-sized data, estimate duration,
assess lock impact, back up database, write rollback script.

**During:** Monitor progress, check application health, validate incrementally.

**After:** Validate data integrity, check logs for errors, monitor performance,
plan cleanup of old structures.

#### Common Pitfalls

- Adding non-nullable column without default (fails on existing rows)
- Creating index without CONCURRENTLY on large tables (locks table)
- Renaming column without expand-contract (breaks old code immediately)

> **AI exploration:** _"Review our migration plan for [describe schema changes]
> and identify risks or suggest a safer approach."_

### Cache Invalidation

When deployments change data formats, API responses, or business logic, cached
data may become stale or incompatible.

**Strategies:**

- **Versioned cache keys** — include version in cache key so new code reads
  fresh data
- **Warm-then-switch** — populate new cache before switching traffic
- **Gradual expiry** — let old cache expire naturally if compatible
- **Full flush** — clear all caches (last resort; causes temporary performance
  impact)

**Plan for:** Which caches are affected, invalidation strategy per cache,
performance impact of cold cache, rollback implications.

### Search Index Updates

When deployments change data models or search behavior, search indexes may need
updates.

**Considerations:**

- Reindex before or after deployment?
- Can the old index serve queries during reindexing?
- How long does reindexing take? Can it run in the background?
- Does rollback require reverting the index?

### Feature Flag Management

When using feature flags as part of deployment:

- Document which flags are being enabled or disabled
- Confirm flag state in each environment before deployment
- Plan flag cleanup after successful rollout
- Consider flag dependencies (enabling flag A requires flag B)

---

## Rollback Procedures

### Rollback Triggers

**Critical (roll back immediately):**

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

### Option 1: Traffic Switch (Fastest)

**Use when:** Blue/Green or Canary deployment

1. Switch load balancer back to previous version
   - Command: [e.g., Update ALB target group to Green]
   - Validation: Check traffic metrics, verify users on old version
2. Monitor rollback impact
   - Check error rates return to baseline
   - Verify functionality restored
3. Notify stakeholders of rollback

### Option 2: Redeploy Previous Version

**Use when:** Rolling deployment or no blue/green

1. Deploy previous release package
   - Command: [e.g., `./deploy.sh v1.1.0`]
   - Validation: Check deployment status
2. Roll back database migrations (if applicable)
   - Command: [e.g., `./migrate.sh down`]
   - Validation: Check schema version
3. Restore configuration to previous state
4. Validate rollback success (smoke tests, dashboards)
5. Notify stakeholders

### Data/State Rollback Considerations

- **Additive changes** (new tables, columns, cache keys) — safe to leave after
  rollback; old code ignores new structures
- **Breaking changes** — require rollback script, database backup restoration,
  or cache flush
- **Feature flags** — toggle off; no data rollback needed
- **Search indexes** — may need revert if schema changed

### Post-Rollback Actions

1. Notify stakeholders (reason and impact)
2. Preserve evidence (logs, metrics, error reports)
3. Schedule [retrospective](../../templates/retrospective.md)
4. Fix root cause before redeploying
5. Update deployment brief

> **AI exploration:** _"Help me design a rollback procedure for [describe > your
> > deployment strategy and infrastructure]."_

---

## Monitoring Thresholds and Cadence

### Alert Configuration

**Critical Alerts (Immediate Response):**

- Error rate >5% for 5 minutes → Page on-call engineer
- Response time p95 >2000ms for 10 minutes → Page on-call
- DB connection pool >90% for 5 minutes → Page on-call

**Warning Alerts (Monitor Closely):**

- Error rate >2% for 10 minutes → Slack notification
- Response time p95 >1500ms for 15 minutes → Slack
- Memory usage >80% for 20 minutes → Slack notification

**Info Alerts (FYI):**

- Deployment completed successfully → Slack notification
- Background job queue backlog >100 → Slack notification

### Key Metrics

**Application health:** Error rate (<1% baseline), response time (p50/p95/p99),
throughput, success rate.

**Infrastructure health:** CPU (<70% baseline), memory (<80%), disk (<70%),
network I/O.

**Database metrics:** Connection pool usage, query time, deadlocks, replication
lag.

**Business metrics:** User activity, conversion rate, revenue (if applicable).

### Monitoring Schedule

**First 2 Hours (Critical Period):**

- Active monitoring by deployment engineer
- Check dashboards every 15 minutes
- On-call engineer on standby

**First 24 Hours (Stabilization Period):**

- Check dashboards every 2 hours
- Review error logs for anomalies
- Monitor success criteria metrics

**First Week (Observation Period):**

- Daily dashboard review
- Track success criteria progress
- Address any minor issues discovered

### Post-Deployment Health Check Details

**Infrastructure:**

- [ ] All instances/pods running and healthy
- [ ] Load balancer routing traffic correctly
- [ ] Database connections established and performant
- [ ] Cache (Redis, Memcached) operational

**Application:**

- [ ] Application logs show normal operation
- [ ] API response times within acceptable range
- [ ] Error rates at baseline levels (<1%)
- [ ] Memory and CPU usage normal

**Integrations:**

- [ ] Third-party APIs responding normally
- [ ] Message queues processing messages
- [ ] Background jobs running on schedule
- [ ] Webhooks and callbacks working

> **AI exploration:** _"Suggest monitoring thresholds and alert rules tuned to
> [describe your stack, traffic patterns, and SLAs]."_

---

## Communication Templates

### Pre-Deployment Notification

```
Subject: [Upcoming Deployment - Feature X - Date]

We will be deploying Feature X to production on
[Date] at [Time].

Expected impact: [None / Brief downtime / Degraded]
Duration: [X minutes]
New functionality: [Brief description]

We will send updates when deployment begins and
completes.
```

### During Deployment Update

```
Deployment Status: [In Progress / Completed / Issue]
Phase: [X of Y]
Current Activity: [Brief description]
ETA: [Time]
Issues: [None / Description]
```

### Post-Deployment Notification

```
Subject: [Deployment Complete - Feature X]

Deployment completed successfully at [Time].

- Status: [Success / Partial Success / Rolled Back]
- New features: [Brief description]
- Known issues: [None / List]
- Support contact: [Email/Slack]

[Link to release notes or documentation]
```

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

> **AI exploration:** _"Draft deployment communications for [describe your > >
> deployment and audience]."_

---

## Deployment Patterns

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

> **AI exploration:** _"Help me plan a [hotfix / scheduled maintenance]
> deployment for [describe the situation]."_

---

## Security Checklist

**Before deployment:**

- No secrets in code or config files
- Dependencies scanned for vulnerabilities
- Access controls reviewed (least privilege)
- Audit logging enabled

**After deployment:**

- No secrets exposed in logs or error messages
- Security headers configured (CSP, HSTS, etc.)
- SSL/TLS certificates valid
- Authentication and authorization verified

> **AI exploration:** _"Audit our deployment security posture for [describe > >
> your stack and compliance requirements]."_

---

## Deployment Execution Log Template

| Time (UTC) | Phase       | Action   | Status   | Notes   |
| ---------- | ----------- | -------- | -------- | ------- |
| HH:MM      | Pre-Deploy  | [Action] | [Status] | [Notes] |
| HH:MM      | Data/State  | [Action] | [Status] | [Notes] |
| HH:MM      | Deploy      | [Action] | [Status] | [Notes] |
| HH:MM      | Validation  | [Action] | [Status] | [Notes] |
| HH:MM      | Traffic     | [Action] | [Status] | [Notes] |
| HH:MM      | Post-Deploy | [Action] | [Status] | [Notes] |

**Issues Encountered:**

- **Issue:** [Description]
- **Resolution:** [How resolved]
- **Impact:** [Effect on timeline or production]

---

## Decision Trees

### Before Deployment

```
All Pre-Deployment items checked?
  → Yes: Proceed to deployment
  → No: Stop and address gaps
```

### During Deployment

```
Each phase completed successfully?
  → Yes: Proceed to next phase
  → No: Stop and troubleshoot or roll back
```

### After Deployment

```
All Post-Deployment validation passed?
  → Yes: Monitor and stabilize
  → No: Assess if rollback needed

Any rollback triggers present?
  → Yes: Execute rollback immediately
  → No: Continue monitoring

Stable for 24 hours?
  → Yes: Deployment successful, hand off to Support
  → No: Continue monitoring and troubleshooting
```

> **AI exploration:** _"Create deployment decision trees tailored to [describe >
> > your deployment process and risk tolerance]."_

---

## Red Flags Reference

Address these immediately when observed:

**Pre-Deployment:** UAT not signed off, rollback procedure not documented or
tested, data/state changes not tested in staging, monitoring or alerting not
configured, no deployment plan, team not available or on-call not identified.

**During Deployment:** Health checks failing, data/state change errors or
timeouts, configuration errors causing crashes, traffic not routing correctly,
critical alerts firing immediately.

**Post-Deployment:** Error rate >5% sustained, response time >2x baseline,
critical user paths broken, data corruption or integrity issues, security
vulnerability discovered, success criteria instrumentation not working.

**Action:** If any red flag present, STOP and address immediately. Consider
rollback if critical.

> **AI exploration:** _"Given our recent deployment [describe what happened],
> identify which red flags apply and suggest remediations."_

---

## AI-Led Patterns

### What AI Drives

- Drafting release steps and runbook content
- Canary and rollback plan generation
- Release notes drafting
- Monitoring configuration and threshold recommendations
- Deployment checklist preparation
- Pipeline observation and status reporting
- Evidence gathering for gate decisions

### What Humans Validate

ALL production approval gates — humans own every production deployment decision.
Deployment execution and timing. Rollback decisions during incidents. Traffic
management and canary promotion decisions. This is the stage with the highest
risk if wrong (production outages, data loss).

### Oversight Intensity at This Stage

**Active** is strongly recommended — Deployment has "Very High" risk if wrong.
Even at AI-Led tier, the agent's role is primarily drafting and recommending;
humans execute and approve.

- **Active:** Required for all production deployments
- **Passive:** Acceptable only for non-production environments with established
  rollback procedures
- **Minimal:** Not recommended for production deployments

### Common Failure Modes

- Incomplete rollback plans that don't cover all failure scenarios
- Missing monitoring coverage for new features
- Premature deployment recommendations without sufficient evidence
- Underestimating data migration risks
- Incomplete communication to stakeholders

### Fallback Protocol

- Always defer to human for any production decision regardless of oversight
  level
- Present deployment readiness evidence rather than making go/no-go
  recommendations
- Escalate immediately if monitoring shows unexpected behavior post-deployment
- Default to delaying deployment when evidence is insufficient

### Session Handoff Notes

Capture these when ending a deployment session:

- Deployment checklist completion status
- Environment state (which environments have been deployed to)
- Pending approval gates
- Monitoring baseline values
- Rollback plan readiness
- Stakeholder communication status

---

## Notes

**Last Updated:** 2026-03-01

Added to framework in v0.12.0.
