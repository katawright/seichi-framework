# Support Guide

**Last Updated:** 2026-02-14

> Stage-specific guidance for Support. For cross-cutting framework concepts, see
> [framework-guide.md](../framework-guide.md).

---

## Quick Reference

**Purpose:** Ensure production systems remain healthy, users are supported, and
business objectives are achieved through continuous monitoring, improvement, and
measurement.

**Primary roles:** DevOps Engineers, Support Engineers, Engineers

**Execution pattern:** Continuous (ongoing)

**Key inputs:** Live production system, deployment brief, success criteria from
Initiation, monitoring baselines

**Key outputs:** Incident reports, success criteria progress reports,
enhancement requests, system health metrics

**What good looks like:**

- Proactive monitoring catches issues before users
- Incidents resolved quickly with blameless post-mortems
- Success criteria tracked and reported regularly
- Enhancement requests feed back into new increments
- On-call rotation is fair and sustainable
- Knowledge documented and discoverable

**Common pitfalls:**

- Alert fatigue from too many low-value alerts
- Same incidents recurring (no root cause fixes)
- Success criteria defined but never tracked
- Tribal knowledge (single points of failure)
- On-call burnout from constant firefighting
- No feedback loop from production to development

**Checkpoint:** Continuous monitoring + escalation gates — see
[Framework Guide: Checkpoints](../framework-guide.md#checkpoint-taxonomy)

**AI autonomy:** High autonomy for monitoring + human escalation — see
[Framework Guide: AI Autonomy](../framework-guide.md#ai-autonomy-overview)

---

## Core Responsibilities

- **Monitor** — watch system health and success criteria
- **Respond** — quickly resolve production incidents
- **Fix** — address bugs discovered in production
- **Enhance** — deliver incremental improvements
- **Support** — help users succeed with the system
- **Measure** — track progress toward business objectives
- **Maintain** — keep systems secure, updated, and optimized

---

## Production Monitoring

Effective monitoring enables teams to detect issues before users report them and
track progress toward business objectives.

### Key Metrics

**Application health:**

- **Error rate** — <1% baseline; warning >2%, critical
  > 5%
- **Response time** — p50/p95/p99; warning >1.5x baseline, critical >2x
- **Throughput** — requests/sec; warning <80% baseline, critical <50%
- **Success rate** — >99% baseline; warning <98%, critical <95%

**Infrastructure health:**

- CPU (<70% baseline), memory (<80%), disk (<70%), network I/O

**Database metrics:**

- Connection pool (<80% of pool size), query time, deadlocks (target: 0),
  replication lag (<1s)

**Business metrics (success criteria):**

- Track metrics defined in Initiation: user engagement, conversion, revenue,
  performance as applicable

### Alerting

**Design principles:**

1. Alerts must be actionable
2. Include context (runbook link, dashboard, affected service)
3. Severity-appropriate routing (critical → page, warning → Slack)
4. Alert on symptoms, not causes
5. Tune thresholds continuously

**Preventing alert fatigue:**

- Eliminate low-value alerts
- Group related alerts
- Use appropriate thresholds
- Review and adjust weekly

**Routing by severity:**

- **Critical (P0)** — page on-call, 15-min response
- **Warning (P1/P2)** — Slack/email, 30-min to 2-hour response
- **Info** — dashboard/email digest, next business day

---

## Incident Response

Incidents are unexpected events that degrade or disrupt service.

### Severity Levels

| Level       | Impact                           | Response | Post-Mortem  |
| ----------- | -------------------------------- | -------- | ------------ |
| P0 Critical | All users, data loss, security   | 15 min   | Required 24h |
| P1 High     | Major feature broken, >10% users | 30 min   | Required 48h |
| P2 Medium   | Minor feature, <10% users        | 2 hours  | Optional     |
| P3 Low      | Cosmetic, no functional impact   | Next day | Not required |

### Response Process

**Phase 1: Detection (0-5 min)**

- Monitoring alert, user report, or health check failure
- Acknowledge alert, assign severity, note detection time

**Phase 2: Assessment (5-15 min)**

- Check dashboards, logs, deployment history, third-party status
- Decision point: rollback if recent deployment correlates

**Phase 3: Communication (within 15 min)**

- Create incident channel (#incident-YYYY-MM-DD) for P0/P1
- Post initial status, notify stakeholders per severity
- Update cadence: P0 every 15-30 min, P1 every 30-60 min

**Phase 4: Diagnosis and Resolution**

- Log analysis, metric comparison, recent changes review, dependency
  verification
- Resolution options: rollback, hotfix, workaround, configuration fix

**Phase 5: Validation (post-fix)**

- Metrics returned to baseline, smoke tests pass, errors stopped
- Monitor closely: P0/P1 for 2-4 hours, P2/P3 for 30-60 min

**Phase 6: Closure**

- Post resolution update, update incident tracker, archive channel

### Post-Incident Review

**Required for P0/P1 incidents, within 24-48 hours.**

**Key sections:** Summary, impact, timeline, root cause, what went well, what
went wrong, action items.

**Blameless culture:** Focus on systems and processes, not individuals. "The
deployment process allowed untested code to reach production" — not "Alice
deployed buggy code."

**Action items must be:** Specific, assigned with due date, tracked to
completion, prioritized.

### Incident Metrics

- **MTTD** (Mean Time to Detect) — goal: <5 min for critical
- **MTTA** (Mean Time to Acknowledge) — goal: <15 min for P0/P1
- **MTTR** (Mean Time to Resolve) — goal: <1 hour for P1
- **Incident frequency** — trending downward
- **Recurrence** — goal: 0% (incidents should not repeat)

---

## Bug Management and Hotfixes

### Bug Triage

Assess three dimensions:

1. **Severity** (technical impact): Critical → Low
2. **User impact** (business impact): High → Minimal
3. **Urgency** (time sensitivity): Immediate → Low

**Decision guide:**

- Critical + High impact → hotfix today
- Critical + Low impact → hotfix within 48h
- High + High impact → hotfix today
- High + Medium impact → next sprint
- Medium/Low → backlog, prioritize normally

### Hotfix Process

**When to hotfix:** Critical severity AND high user impact AND no workaround AND
fix is low-risk.

**Workflow:**

1. Branch from production tag (not main)
2. Implement minimal fix only (no bundled changes)
3. Test in staging (regression + fix validation)
4. Get approval (engineering lead + product manager)
5. Deploy to production, monitor closely
6. Merge hotfix back to main

### Regular Bug Fixes

For non-critical bugs: add to backlog with severity tag, prioritize in sprint
planning, follow full SDLC process, include in release notes.

---

## Enhancement Management

### Sources

- User feedback (feature requests, support tickets, surveys)
- Success criteria gaps (metrics not meeting targets)
- Technical improvements (performance, tech debt, developer experience)

### Prioritization

Use a prioritization framework (RICE or Value vs. Effort) to objectively
evaluate enhancements. Consult your team's product management practices.

### Enhancement Workflow

1. Enhancement request logged
2. Product manager reviews (weekly)
3. Engineering estimates effort
4. Prioritization (monthly/quarterly)
5. Approved enhancements become new increments (start at Initiation stage)
6. Follow full SDLC process
7. Monitor impact on success criteria after delivery

---

## Success Criteria Tracking

Support closes the measurement loop established in Initiation. See
[Framework Guide: Measurement Throughline](../framework-guide.md#measurement-throughline).

### Measurement Cadence

- **Daily** — high-priority metrics (revenue, critical errors, user-facing
  performance); address anomalies same day
- **Weekly** — standard metrics (conversion, engagement, adoption); team review
  of trends
- **Monthly** — strategic metrics (progress toward targets, satisfaction,
  reliability); stakeholder report
- **Quarterly** — business reviews (overall achievement, retrospective,
  strategic planning)

### Trend Analysis

Track whether metrics are improving, declining, or flat relative to targets:

- **Improving** — continue monitoring, share wins
- **Declining** — investigate root cause urgently, check recent changes, review
  analytics
- **Flat/stable** — identify intervention needed (new features, optimization)

### Variance Analysis

When metrics deviate from target, understand why:

- What changed recently? (deployments, campaigns, external events)
- Are all user segments affected equally?
- Is this correlation or causation?
- What do qualitative signals say? (feedback, tickets)

### Reporting

Monthly success criteria reports to stakeholders:

- Status per criterion (on track / behind / at risk)
- Baseline, target, current, trend
- Analysis and planned actions
- Key insights and upcoming actions

---

## User Support

### Support Channels

- **Synchronous** — live chat, phone, video calls
- **Asynchronous** — email, help desk/ticketing, community forums
- **Self-service** — user guides, FAQ, knowledge base, in-app help

### Support Metrics

**Volume:** Total tickets, new tickets/day, open backlog, trend direction.

**Speed:** First response time (target: <4h business hours), resolution time
(target: <24h P2, <48h P3).

**Quality:** CSAT (target: >90%), NPS (target: >50), first contact resolution
(target: >70%).

**Efficiency:** Tickets per agent, escalation rate, reopened tickets.

### Common Issue Documentation

Maintain FAQ and knowledge base covering:

- Getting started and onboarding
- Account management
- Feature usage
- Troubleshooting common issues
- API and integrations

Update after feature releases, add articles for recurring support questions,
review quarterly.

---

## System Maintenance

### Dependency Management

- Run vulnerability scanning weekly (or per PR)
- Triage by severity: Critical/High within 7 days, Medium within 30 days, Low in
  next regular update
- Always test updates in staging before production

### Infrastructure Maintenance

- **OS patches** — apply security patches monthly, test in staging first
- **Database maintenance** — vacuum/analyze, reindex, monitor size
- **Backup validation** — test restoration monthly, verify completion daily,
  geographic redundancy
- **SSL/TLS certificates** — alert 30 days before expiration, automate renewal

---

## On-Call Operations

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

---

## Knowledge Management

### Documentation Types

- **Runbooks** — operational procedures (deploy, rollback, scale, restore,
  incident handling)
- **Troubleshooting guides** — common issues, diagnostic steps, log locations
- **Architecture documentation** — system design, data flow, integrations
- **User documentation** — guides, API docs, FAQ

### Best Practices

- **Keep updated** — after incidents and releases, review quarterly
- **Make discoverable** — centralized location, search, clear navigation
- **Make actionable** — step-by-step procedures, copy-pasteable commands,
  expected results

---

## Support Workflow

```
-- CONTINUOUS OPERATIONS --

 1. Monitor production health dashboards
 2. Respond to alerts and incidents
    [Escalation gates per severity]
 3. Triage and resolve bugs
    [Human decides: hotfix vs. backlog]
 4. Track success criteria metrics
    [Weekly review, monthly report]
 5. Process enhancement requests
    [Human prioritization]

-- PERIODIC ACTIVITIES --

 6. Weekly: Review alerts, tune thresholds,
    team retrospective
 7. Monthly: Success criteria report to
    stakeholders, dependency updates
 8. Quarterly: Business review, strategic
    planning, process improvement

-- FEEDBACK LOOP --

 9. Production insights feed into new
    increments (back to Initiation)
```

---

## AI Assistance

**AI excels at:**

- Monitoring and anomaly detection
- Log analysis and pattern identification
- Generating incident reports and post-mortems
- Drafting success criteria reports
- Suggesting alert thresholds and tuning
- Creating runbooks and documentation

**Human responsibilities:**

- Make escalation and severity decisions
- Own stakeholder communication during incidents
- Prioritize bugs and enhancements
- Decide go/no-go for hotfixes
- Interpret business metrics and drive actions
- Manage on-call rotation and team health

---

## When to Revisit Support

**Incident response ineffective:**

- High MTTR, recurring incidents, poor communication
- Action: improve runbooks, process, post-mortem follow-through

**Alerts not actionable:**

- Alert fatigue, missing context, team ignoring alerts
- Action: tune thresholds, add context, eliminate low-value alerts

**Success criteria not being met:**

- Consistently missing objectives, no action on gaps
- Action: review definitions, plan interventions

**Team overwhelmed:**

- On-call burnout, ticket backlog, only reactive work
- Action: assess workload, automate, improve processes

**User satisfaction declining:**

- CSAT/NPS dropping, increasing tickets
- Action: gather feedback, prioritize fixes

**Architecture or team changes:**

- New infrastructure, tools, team members
- Action: update runbooks, monitoring, conduct training

---

## Related Documents

- [Support Brief Template](support-brief-template.md)
- [Support Checklist](support-checklist.md)
- [Support AI Agent Prompt](support-ai-agent-prompt.md)
- [STAGES.md](../../STAGES.md)

---

## Notes

Added to framework in v0.8.0.
