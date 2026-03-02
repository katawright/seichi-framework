# Support Reference

## Overview

Detailed support practices, operational templates, decision trees, and maturity
guidance — companion to the Support Stage Guide.

### Why This Reference

Stage guides keep guidance concise so practitioners can move quickly. When you
need specific thresholds, response process details, triage matrices, or
operational templates, this reference provides the depth without cluttering the
stage guide.

### Purpose

- Provide monitoring thresholds and baselines for production health
- Detail the incident response process, communication templates, and severity
  levels
- Supply bug triage matrices and enhancement prioritization frameworks
- Document alerting design, on-call operations, and knowledge management
  practices
- Include operational runbook examples, report templates, and decision trees
- Offer a support maturity model and disaster recovery guidance

### Key Principle

Consult this reference when the stage guide summary isn't enough — drill into
the specific section you need rather than reading end to end.

### How to Use This Reference

1. Start with the [Support Stage Guide](README.md) for context and workflow
2. Drill into sections here when you need specific thresholds, templates, or
   decision guidance
3. Use the AI exploration prompts at the end of each section to generate content
   tailored to your project

---

## Monitoring Thresholds and Baselines

### Application Health Thresholds

| Metric        | Baseline | Warning          | Critical        |
| ------------- | -------- | ---------------- | --------------- |
| Error rate    | <1%      | >2% for 10 min   | >5% for 5 min   |
| Response time | p95      | >1.5x for 15 min | >2x for 10 min  |
| Throughput    | normal   | <80% for 20 min  | <50% for 10 min |
| Success rate  | >99%     | <98% for 10 min  | <95% for 5 min  |

### Infrastructure Health Thresholds

| Metric       | Baseline | Warning         | Critical        |
| ------------ | -------- | --------------- | --------------- |
| CPU usage    | <70%     | >85% for 20 min | >95% for 10 min |
| Memory       | <80%     | >90% for 15 min | >95% for 5 min  |
| Disk usage   | <70%     | >85%            | >95%            |
| DB conn pool | <80%     | >90% of pool    | >95% of pool    |

### Database Metrics

- Connection pool utilization (<80% of pool size)
- Query execution time (p95)
- Deadlocks (target: 0)
- Replication lag (<1 second)

> **AI exploration:** _"Given our stack [describe stack], suggest monitoring
> thresholds tuned to our traffic patterns and SLAs."_

### Error Budgets

An error budget is the complement of your SLO availability target:

- 99.9% uptime SLO → 0.1% error budget → ~43 minutes/month
- 99.5% uptime SLO → 0.5% error budget → ~3.6 hours/month

**How to use it:**

- When budget is healthy: prioritize feature work
- When budget is at 50%: increase monitoring attention
- When budget is exhausted: freeze feature work, prioritize reliability

---

## Incident Response Process

For initial incident response setup (defining severity levels, choosing a
process appropriate to your support level), see the
[Support Operations Guide](operations.md).

### Six-Phase Response

**Phase 1 — Detection (0-5 min):** Alert fires or user reports issue. On-call
acknowledges, creates incident record, assigns severity.

**Phase 2 — Assessment (5-15 min):** Check dashboards, logs, recent deployments,
third-party status. Decision point: rollback if recent deployment correlates.

**Phase 3 — Communication (within 15 min):** Create incident channel
(#incident-YYYY-MM-DD) for P0/P1. Post initial status. Update cadence: P0 every
15-30 min, P1 every 30-60 min.

**Phase 4 — Diagnosis and Resolution:** Log analysis, metric comparison, recent
changes review, dependency verification. Resolution options: rollback, hotfix,
workaround, configuration fix.

**Phase 5 — Validation (post-fix):** Metrics returned to baseline, smoke tests
pass, errors stopped. Monitor closely: P0/P1 for 2-4 hours, P2/P3 for 30-60 min.

**Phase 6 — Closure:** Post resolution update, update incident tracker, archive
channel.

### Escalation Tiers

| Tier | Role             | When to Escalate                                   |
| ---- | ---------------- | -------------------------------------------------- |
| L1   | On-call engineer | First responder; can rollback and hotfix           |
| L2   | Engineering lead | On-call unavailable, >2h unresolved, arch decision |
| L3   | VP Eng / CTO     | P0 >4h, major customer impact, data breach         |
| Ext  | Cloud/vendor     | Infrastructure or third-party root cause           |

> **AI exploration:** _"Help me draft an incident response playbook for
> [describe your system and team size]."_

---

## Incident Communication Templates

Ready-made templates for incident communication at each phase. Copy, fill in the
bracketed fields, and send. Adjust update cadence to your severity level: P0
every 15–30 min, P1 every 30–60 min.

### Initial Incident Notification

Send within 15 minutes of P0/P1 declaration.

```
INCIDENT DECLARED — [P0/P1] — [System affected]
Status: Investigating
Impact: [User-facing impact description]
Team: [Names of responders]
Channel: [#incident-YYYY-MM-DD or link]
Next update: [Time]
```

### Ongoing Status Update

P0: every 15–30 min. P1: every 30–60 min.

```
INCIDENT UPDATE — [P0/P1] — [System] — [Time]
Status: [Investigating / Mitigating / Monitoring]
Current findings: [What we know]
Actions taken: [What has been done]
Next steps: [What is happening next]
Next update: [Time]
```

### Resolution Notification

Send when the incident is resolved and systems are stable.

```
INCIDENT RESOLVED — [P0/P1] — [System]
Resolution time: [Duration from declaration to resolution]
Root cause (preliminary): [Brief description]
Customer impact: [What users experienced]
Prevention: [Immediate actions taken to prevent recurrence]
Post-mortem: Scheduled for [Date/Time]
```

### Post-Mortem Summary

Brief version for stakeholder communication, sent after the post-incident review
is complete.

```
POST-MORTEM SUMMARY — [Incident ID] — [Date]
What happened: [2–3 sentences]
Why it happened: [Root cause]
How we fixed it: [Mitigation/resolution]
Prevention: [Key action items with owners and due dates]
```

<!-- prettier-ignore -->
> **AI exploration:** _"Draft incident communication messages
> for [describe the current incident situation]."_

---

## Severity Level Details

**P0 — Critical (15-min response):**

- Production down or completely unavailable
- Data loss or corruption occurring
- Security breach or active attack
- Multiple critical systems failing
- Post-mortem required within 24 hours

**P1 — High (30-min response):**

- Major functionality broken (checkout, login, etc.)
- Significant performance degradation (>2x baseline)
- Single critical system failing
- User-facing errors affecting >10% of users
- Post-mortem required within 48 hours

**P2 — Medium (2-hour response, business hours):**

- Minor functionality broken (non-critical feature)
- Performance degradation (1.5-2x baseline)
- User-facing errors affecting <10% of users
- Post-mortem optional

**P3 — Low (next business day):**

- Cosmetic issues (UI glitches, minor bugs)
- Non-user-facing issues
- Enhancement requests, documentation updates
- Post-mortem not required

<!-- prettier-ignore -->
> **AI exploration:** _"Customize these severity levels for
> [describe your product, user base, and SLA commitments]."_

---

## Post-Incident Review

**Required for P0/P1 incidents, within 24-48 hours.**

**Template sections:**

1. **Summary** — what happened, severity, duration, impact
2. **Timeline** — detection through resolution
3. **Root cause** — technical root cause analysis
4. **What went well** — effective responses
5. **What went wrong** — gaps in process or tooling
6. **Action items** — specific, assigned, with due dates

**Blameless culture:** Focus on systems and processes, not individuals. "The
deployment process allowed untested code to reach production" — not "Alice
deployed buggy code."

### Incident Metrics

- **MTTD** (Mean Time to Detect) — goal: <5 min for critical
- **MTTA** (Mean Time to Acknowledge) — goal: <15 min for P0/P1
- **MTTR** (Mean Time to Resolve) — goal: <1 hour for P1
- **Incident frequency** — trending downward
- **Recurrence** — goal: 0% (incidents should not repeat)

> **AI exploration:** _"Analyze our incident history and suggest process
> improvements to reduce MTTR."_

---

## Bug Triage Decision Matrix

### Triage Dimensions

1. **Severity** (technical impact): Critical → Low
2. **User impact** (business impact): High → Minimal
3. **Urgency** (time sensitivity): Immediate → Low

### Decision Guide

| Severity | User Impact | Action              |
| -------- | ----------- | ------------------- |
| Critical | High        | Hotfix today        |
| Critical | Low         | Hotfix within 48h   |
| High     | High        | Hotfix today        |
| High     | Medium      | Next increment      |
| Medium   | Any         | Backlog, prioritize |
| Low      | Any         | Backlog, prioritize |

### Hotfix Criteria

Deploy hotfix immediately when ALL of these apply:

- Critical severity (P0/P1)
- No workaround available
- Significant user impact (>10% users or revenue)
- Fix is low-risk (minimal code changes)

### Hotfix Workflow

1. Branch from production tag (not main)
2. Implement minimal fix only (no bundled changes)
3. Test in staging (regression + fix validation)
4. Get approval (engineering lead + product manager)
5. Deploy to production, monitor closely for 1-2 hours
6. Merge hotfix back to main

> **AI exploration:** \_"Help me build a bug triage process for [describe > team
>
> > size, product, and release cadence]."\_

---

## Enhancement Prioritization

### Frameworks

**RICE scoring:**

- **Reach** — how many users in a given period?
- **Impact** — how much does it move the needle? (3/2/1/0.5/0.25)
- **Confidence** — how sure are we? (100%/80%/50%)
- **Effort** — person-months

Score = (Reach × Impact × Confidence) / Effort

**Value vs. Effort matrix:** Plot enhancements on a 2×2 grid. Prioritize
high-value / low-effort items first.

### Enhancement Workflow

1. Enhancement request logged
2. Product manager reviews (weekly)
3. Engineering estimates effort
4. Prioritization (monthly/quarterly)
5. Approved enhancements become new increments (start at Initiation stage)
6. Follow full SDLC process
7. Monitor impact on success criteria after delivery

### Sources

- User feedback (feature requests, support tickets, surveys)
- Success criteria gaps (metrics not meeting targets)
- Technical improvements (performance, tech debt, DX)

> **AI exploration:** _"Prioritize our enhancement backlog using RICE scoring
> given [describe your backlog items]."_

---

## Alerting Design

### Design Principles

1. Alerts must be actionable (every alert needs a response)
2. Include context (runbook link, dashboard, affected service)
3. Severity-appropriate routing (critical → page, warning → Slack)
4. Alert on symptoms, not causes
5. Tune thresholds continuously

### Routing by Severity

| Severity | Channel           | Response Time     |
| -------- | ----------------- | ----------------- |
| Critical | PagerDuty / phone | 15 min            |
| Warning  | Slack #alerts     | 30 min - 2h       |
| Info     | Email / dashboard | Next business day |

### Preventing Alert Fatigue

- Eliminate low-value alerts (if nobody acts on it, remove it)
- Group related alerts (one notification, not ten)
- Use appropriate thresholds (tune based on real data)
- Review and adjust weekly
- Track alert-to-incident ratio (healthy: >50%)

> **AI exploration:** _"Review our current alert rules and suggest which to
> consolidate, tune, or remove."_

---

## On-Call Operations

For initial on-call setup (choosing a rotation type, defining escalation tiers
appropriate to your support level), see the
[Support Operations Guide](operations.md).

### Rotation Structures

- **Weekly** (small teams) — predictable, one week per engineer
- **Daily** (larger teams) — spreads burden, rotates daily
- **Follow-the-sun** (global teams) — no one on-call at night

**Considerations:** Fair distribution, advance notice (1+ months), backup
on-call, handoff process.

### On-Call Responsibilities

- Respond to critical alerts within 15 minutes
- Acknowledge incidents in tracking system
- Diagnose and resolve or escalate
- Communicate per incident severity
- Document actions taken
- Conduct post-incident reviews for P0/P1

### Burnout Prevention

**Reduce alert volume:** Tune alerts, fix recurring issues, automate responses.

**Fair distribution:** Rotate fairly, consider compensation, limit consecutive
weeks.

**Support structure:** Clear escalation path, runbooks for common issues, action
items that fix root causes.

**Work-life balance:** Allow shift swaps, time off after stressful incidents,
recognition.

> **AI exploration:** _"Design an on-call rotation for our team of [N] engineers
> that minimizes burnout."_

---

## Knowledge Management

For initial knowledge management setup (choosing tools, creating first runbooks
appropriate to your support level), see the
[Support Operations Guide](operations.md).

### Documentation Types

- **Runbooks** — operational procedures (deploy, rollback, scale, restore,
  incident handling). See the [Runbook Template](../../templates/runbook.md) for
  a fillable starting point.
- **Troubleshooting guides** — common issues, diagnostic steps, log locations
- **Architecture documentation** — system design, data flow, integrations
- **User documentation** — guides, API docs, FAQ

### Best Practices

- **Keep updated** — after incidents and releases, review quarterly
- **Make discoverable** — centralized location, search, clear navigation
- **Make actionable** — step-by-step procedures, copy-pasteable commands,
  expected results

<!-- prettier-ignore -->
> **AI exploration:** _"Generate a runbook template for
> [describe your deployment process and tooling]."_

---

## Operational Runbook Examples

### Deploy Hotfix

1. Create hotfix branch from production tag:
   `git checkout -b hotfix/issue-description v1.2.0`
2. Implement minimal fix (only changes needed)
3. Test in staging: `./deploy.sh staging hotfix/issue-description`
4. Get approval from engineering lead
5. Deploy to production: `./deploy.sh production hotfix/issue-description`
6. Monitor closely for 1 hour post-deployment
7. Merge hotfix to main

### Rollback Deployment

1. Identify previous stable version (deployment history)
2. Execute rollback: `kubectl rollout undo deployment/myapp` or
   `./deploy.sh v1.1.0`
3. Validate: Check dashboards, run smoke tests
4. Notify stakeholders
5. Preserve logs and metrics for analysis
6. Schedule post-incident review

### Scale Infrastructure

1. Assess current resource utilization
2. Determine scale-up needs
3. Update infrastructure config
4. Apply: `terraform apply` or `kubectl scale deployment/myapp --replicas=X`
5. Validate all instances healthy, load distributed
6. Monitor for 30 minutes

### Database Maintenance

1. Schedule maintenance window (low-traffic time)
2. Notify stakeholders 24-48 hours in advance
3. Back up database before maintenance
4. Perform maintenance (vacuum, reindex, etc.)
5. Validate performance post-maintenance
6. Notify stakeholders of completion

> **AI exploration:** _"Generate operational runbooks tailored to our stack:
> [describe your infrastructure, CI/CD pipeline, and deployment tools]."_

---

## Success Criteria Report Template

```markdown
# Success Criteria Progress Report - [Month YYYY]

## Summary

[Overall progress summary - are we meeting objectives?]

## Metric 1: [Name]

- Target: [Value]
- Current: [Value]
- Trend: [Improving / Declining / Stable]
- Analysis: [Why this trend?]
- Actions: [What are we doing about it?]

## Metric 2: [Name]

- [Same structure]

## Key Insights

- [Insight 1]
- [Insight 2]

## Upcoming Actions

- [Action item 1]
- [Action item 2]
```

> **AI exploration:** _"Draft a success criteria report based on these metrics:
> [paste your current data]."_

---

## Support Metrics Reference

### Application Health

| Metric        | Target     | How to Measure                 |
| ------------- | ---------- | ------------------------------ |
| Error rate    | <1%        | APM / error tracking           |
| Response time | <500ms p95 | APM / RUM                      |
| Uptime        | >99.9%     | Health checks / uptime monitor |
| Throughput    | baseline   | Load balancer / APM            |

### User Support

| Metric                   | Target | How to Measure     |
| ------------------------ | ------ | ------------------ |
| First response time      | <4h    | Help desk tool     |
| Resolution time          | <24h   | Help desk tool     |
| CSAT                     | >90%   | Post-ticket survey |
| First contact resolution | >70%   | Help desk tool     |

### Team Health

| Metric              | Target   | How to Measure       |
| ------------------- | -------- | -------------------- |
| Alert-to-incident   | >50%     | Alert tool analytics |
| Pages per on-call   | <10/week | PagerDuty / OpsGenie |
| Recurring incidents | 0%       | Incident tracker     |

> **AI exploration:** _"Suggest support KPIs and targets appropriate for
> [describe your team maturity and product]."_

---

## Decision Trees

### Production Health Check (Daily)

```
Are critical alerts firing?
  → Yes: Investigate immediately, assess severity
  → No: Continue

Is error rate >2x baseline?
  → Yes: Investigate logs, check recent deployments
  → No: Continue

Are success criteria metrics on track?
  → Yes: Continue monitoring
  → No: Analyze trends, plan interventions
```

### Bug Triage Decision

```
Is this a critical bug (P0/P1)?
  → Yes: Does it need immediate hotfix?
    → Yes: Deploy hotfix today
    → No: Plan for next increment
  → No: Add to backlog, prioritize normally
```

### Incident Severity Assessment

```
Is production down or data being lost?
  → Yes: P0 - All hands, immediate response
  → No: Continue

Is major functionality broken?
  → Yes: P1 - Urgent response, notify stakeholders
  → No: Continue

Is minor functionality broken?
  → Yes: P2 - Standard response, log in tracker
  → No: P3 - Low priority, schedule for later
```

> **AI exploration:** _"Create decision trees tailored to our product's critical
> paths and failure modes."_

---

## Red Flags Reference

Address these immediately when observed:

**Production health:** Error rate >5% sustained, critical alerts ignored, failed
deployment with no rollback, backup failures, unpatched security
vulnerabilities >7 days.

**Monitoring:** Dashboards inaccessible, alerts not routing to on-call, alert
fatigue (team ignoring alerts), success criteria unmeasured >1 month.

**Incident response:** P0/P1 unresolved >4 hours without progress, no
post-incident review after critical incident, same incident recurring, on-call
unreachable.

**Bug and enhancement management:** Critical bugs sitting in backlog, user
feedback not reviewed, tech debt accumulating with no plan, enhancement backlog
unmaintained.

**Team health:** On-call burnout, tribal knowledge (single points of failure),
no knowledge transfer, team disengaged.

> **AI exploration:** _"Given our recent incidents, identify which red flags
> apply and suggest remediations."_

---

## Support Maturity Model

The maturity model describes how support operations **grow over time** within a
project — from reactive fire-fighting to optimized operations. This is distinct
from support levels (Minimal, Standard, Enterprise) defined in the
[Support Operations Guide](operations.md), which describe **right-sizing for
project type** — not every project needs to reach Level 4. A Minimal-level
project operating well at Level 2 is a success.

### Level 1: Reactive Fire-Fighting

- No proactive monitoring; react to user reports
- Tribal knowledge, undocumented procedures
- Frequent incidents, no post-mortems
- **Goal:** Establish basic monitoring and runbooks

### Level 2: Basic Operations

- Monitoring and alerting configured
- Runbooks for common issues
- On-call rotation established
- Incidents documented
- **Goal:** Proactive monitoring and incident prevention

### Level 3: Proactive Support

- Proactive monitoring and trend analysis
- Regular post-incident reviews with action items
- Bug triage and prioritization process
- Success criteria tracked
- **Goal:** Continuous improvement and optimization

### Level 4: Optimized Support

- Automated incident detection and response
- Comprehensive observability and instrumentation
- Data-driven decision making
- Sustainable on-call (low burnout, fair rotation)
- Continuous feedback loop driving enhancements
- **Goal:** Maintain excellence

> **AI exploration:** _"Assess our current support maturity level and suggest
> concrete steps to reach the next level."_

---

## Disaster Recovery

Disaster recovery (DR) planning ensures your team can restore service after a
catastrophic failure — hardware loss, data corruption, region outage, or
security breach. Right-size DR to your project tier.

### RTO and RPO

Two metrics define your DR requirements:

- **Recovery Time Objective (RTO):** Maximum acceptable time from failure to
  restored service. "How long can we be down?"
- **Recovery Point Objective (RPO):** Maximum acceptable data loss measured in
  time. "How much data can we lose?"

**Setting RTO and RPO:**

| Question                           | Drives |
| ---------------------------------- | ------ |
| What is the business cost per hour | RTO    |
| of downtime?                       |        |
| How frequently does critical data  | RPO    |
| change?                            |        |
| What do SLAs or contracts require? | Both   |
| What can the backup infrastructure | Both   |
| actually achieve?                  |        |

**Example targets by tier:**

| Tier       | Typical RTO | Typical RPO  |
| ---------- | ----------- | ------------ |
| Minimal    | < 24 hours  | < 24 hours   |
| Standard   | < 4 hours   | < 1 hour     |
| Enterprise | < 1 hour    | < 15 minutes |

### Backup Validation

Backups that haven't been tested are assumptions, not safeguards. Validate
regularly:

- [ ] Backup exists and is current (check timestamp against RPO)
- [ ] Backup is stored separately from primary system (different region,
      provider, or medium)
- [ ] Backup can be restored (test restore to a non-production environment)
- [ ] Restored system passes smoke tests and data integrity checks
- [ ] Restore completes within RTO

**Validation cadence:**

| Tier       | Backup Check | Restore Test |
| ---------- | ------------ | ------------ |
| Minimal    | Monthly      | Annually     |
| Standard   | Weekly       | Quarterly    |
| Enterprise | Daily        | Monthly      |

### DR Drill Cadence

Regular DR drills build confidence and uncover gaps before a real disaster.

| Tier       | Drill Cadence | Drill Scope                       |
| ---------- | ------------- | --------------------------------- |
| Minimal    | Annually      | Restore from backup, verify app   |
| Standard   | Semi-annually | Full failover, restore, verify    |
| Enterprise | Quarterly     | Full failover with timed recovery |

**Drill process:**

1. **Announce:** Schedule the drill, notify stakeholders
2. **Execute:** Follow the DR plan as written — do not improvise
3. **Time it:** Record actual RTO and RPO achieved
4. **Document:** Note what worked, what failed, and what was unclear
5. **Remediate:** Update the DR plan based on findings

### DR Plan Template

```markdown
# Disaster Recovery Plan — [System Name]

**Owner:** [Team or role] **Last Tested:** YYYY-MM-DD **RTO Target:** [X hours]
**RPO Target:** [X hours]

## Scope

[What systems, services, and data are covered by this plan]

## Recovery Steps

1. [Assess the situation — determine scope and severity]
2. [Notify stakeholders using incident communication templates]
3. [Activate backup infrastructure / failover region]
4. [Restore data from most recent backup]
5. [Deploy application to recovery environment]
6. [Run smoke tests and data integrity checks]
7. [Switch DNS / load balancer to recovery environment]
8. [Monitor closely for [X hours] post-recovery]

## Communication Plan

- Incident channel: [How to create/join]
- Stakeholder updates: [Cadence and recipients]
- Customer communication: [Who drafts, who approves, channel]

## Verification

- [ ] Application health check returns 200
- [ ] Core user paths functional (login, primary workflow)
- [ ] Data integrity verified (record counts, checksums)
- [ ] Monitoring and alerting active in recovery environment

## Sign-Off

| Role             | Name   | Date       |
| ---------------- | ------ | ---------- |
| Engineering lead | [Name] | YYYY-MM-DD |
| Operations lead  | [Name] | YYYY-MM-DD |
```

> **AI exploration:** \_"Help me create a disaster recovery plan for [describe >
>
> > your system, infrastructure, and business requirements]."\_

---

## Related Documents

- [Support Stage Guide](README.md)
- [Support Checklist](checklist.md)
- [Support Operations Guide](operations.md)
- [Support Brief Template](../../templates/support-brief.md)
- [Runbook Template](../../templates/runbook.md)

---

## AI-Led Patterns

### What AI Drives

- Log clustering and pattern identification
- Incident triage and severity classification
- Incident communication drafts (status updates, post-mortems)
- Runbook updates based on incident learnings
- Dependency update analysis and risk assessment
- Enhancement backlog grooming
- Success criteria monitoring and reporting
- Proactive anomaly detection

### What Humans Validate

Escalation decisions (when to page on-call, when to escalate severity).
Prioritization of bugs vs. enhancements. All production-impacting actions
(restarts, rollbacks, config changes). Incident severity classification
confirmation. Stakeholder communications before sending.

### Oversight Intensity at This Stage

- **Active:** During incident response or when onboarding new monitoring
- **Passive:** For routine operations (log analysis, report generation, backlog
  grooming)
- **Minimal:** Only for well-instrumented systems with mature runbooks and
  established escalation paths

### Common Failure Modes

- Misclassifying incident severity (especially under-classifying)
- Ignoring cascading failure patterns
- Over-automating incident responses without human judgment
- Alert fatigue from poorly tuned thresholds
- Missing correlations between seemingly unrelated issues

### Fallback Protocol

- Default to higher severity classification when uncertain (easier to downgrade
  than to catch a missed escalation)
- Escalate early rather than late
- Request human triage for any incident affecting customer-facing services
- Compile full incident timeline before recommending root cause

### Session Handoff Notes

Capture these when ending a support session:

- Active incidents and their current status
- Monitoring state and any anomalies under investigation
- Recent changes that could affect system behavior
- Pending post-incident reviews
- Enhancement backlog priorities
- Success criteria measurement status

---

## Notes

**Last Updated:** 2026-03-01

Added to framework in v0.12.0.
