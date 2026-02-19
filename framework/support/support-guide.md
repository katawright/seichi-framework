# Support Guide

> Stage-specific guidance for Support. For cross-cutting framework concepts, see
> [Framework Guide](../framework-guide.md).

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

**AI assistance:** High assistance for monitoring + human escalation — see
[Framework Guide: AI Assistance](../framework-guide.md#ai-assistance-overview)

---

## Right-Sizing Support

Not every project needs the full support infrastructure described in this guide.
MVPs, experiments, and small internal tools may only need basic monitoring and
an informal response plan. Before diving into the sections below, see the
[Support Operations Guide](support-operations-guide.md) to choose the right
support level (Minimal, Standard, or Enterprise) for your project.

> **First-time setup?** If you are establishing support operations for a new
> project or formalizing support for an existing one, start with the
> [Support Operations Guide](support-operations-guide.md). It covers one-time
> strategic decisions (support level, incident response process, on-call
> structure, SLAs). This guide covers ongoing per-increment operations.

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

Monitoring **infrastructure and tooling** (dashboards, APM, log aggregation) is
set up during deployment — see the
[Deployment Planning Guide](../deployment/deployment-planning-guide.md). This
section covers the **operational practices** for using that infrastructure
day-to-day.

**What to monitor:**

- **Application health** — error rate, response time, throughput, success rate
- **Infrastructure** — CPU, memory, disk, network, database connections
- **Business metrics** — success criteria defined in Initiation (engagement,
  conversion, revenue, performance)

**Alerting principles:**

- Every alert must be actionable
- Route by severity (critical → page, warning → Slack, info → email)
- Alert on symptoms, not causes
- Tune thresholds continuously to prevent fatigue

For specific thresholds, baselines, and alerting design patterns, see
[Support Reference: Monitoring](support-reference.md#monitoring-thresholds-and-baselines)
and [Alerting Design](support-reference.md#alerting-design), or use AI to
suggest thresholds tuned to your traffic patterns and SLAs.

---

## Incident Response

Incidents are unexpected events that degrade or disrupt service. A clear
response process minimizes impact and prevents recurrence.

### Severity Levels

| Level | Impact                         | Response | Post-Mortem  |
| ----- | ------------------------------ | -------- | ------------ |
| P0    | All users, data loss, security | 15 min   | Required 24h |
| P1    | Major feature, >10% users      | 30 min   | Required 48h |
| P2    | Minor feature, <10% users      | 2 hours  | Optional     |
| P3    | Cosmetic, no functional impact | Next day | Not required |

### Response Overview

1. **Detect** — alert or user report triggers response
2. **Assess** — check dashboards, logs, recent deployments
3. **Communicate** — notify stakeholders per severity
4. **Resolve** — rollback, hotfix, workaround, or config fix
5. **Validate** — confirm metrics return to baseline
6. **Close** — update tracker, schedule post-mortem if needed

### Post-Incident Reviews

Required for P0/P1. Focus on systems and processes, not individuals (blameless
culture). Action items must be specific, assigned, and tracked to completion.

For the detailed six-phase response process, escalation tiers, incident metrics
(MTTD/MTTA/MTTR), and post-mortem templates, see
[Support Reference: Incident Response](support-reference.md#incident-response-process).

---

## Bug Management and Hotfixes

### Bug Triage

Assess three dimensions for every production bug:

1. **Severity** (technical impact): Critical → Low
2. **User impact** (business impact): High → Minimal
3. **Urgency** (time sensitivity): Immediate → Low

**Hotfix when:** Critical severity AND high user impact AND no workaround AND
fix is low-risk.

**Otherwise:** Add to backlog with severity tag, prioritize in sprint planning,
follow full SDLC process.

For the full decision matrix and hotfix workflow, see
[Support Reference: Bug Triage](support-reference.md#bug-triage-decision-matrix).

---

## Enhancement Management

Enhancements come from user feedback, success criteria gaps, and technical
improvements. Use a prioritization framework (RICE, Value vs. Effort, or your
team's approach) to evaluate objectively.

**Workflow:** Request logged → PM reviews → engineering estimates → prioritize →
approved items become new increments starting at Initiation → full SDLC →
monitor impact after delivery.

For prioritization framework details, see
[Support Reference: Enhancement Prioritization](support-reference.md#enhancement-prioritization).

---

## Success Criteria Tracking

Support closes the measurement loop established in Initiation. See
[Framework Guide: Measurement Throughline](../framework-guide.md#measurement-throughline).

### Measurement Cadence

- **Daily** — high-priority metrics (revenue, critical errors); address
  anomalies same day
- **Weekly** — standard metrics (conversion, engagement); team review of trends
- **Monthly** — strategic metrics (progress toward targets); stakeholder report
- **Quarterly** — business reviews (overall achievement, strategic planning)

### Trend and Variance Analysis

Track whether metrics are improving, declining, or flat:

- **Improving** — continue monitoring, share wins
- **Declining** — investigate root cause urgently, check recent changes
- **Flat** — identify interventions needed

When metrics deviate, ask: What changed recently? Are all segments affected? Is
this correlation or causation? What do qualitative signals (feedback, tickets)
say?

### Reporting

Monthly success criteria reports to stakeholders covering: status per criterion,
baseline vs. target vs. current, trends, analysis, and planned actions.

For report templates, see
[Support Reference: Report Template](support-reference.md#success-criteria-report-template).

---

## User Support

Provide support through synchronous channels (chat, phone), asynchronous
channels (email, help desk), and self-service (docs, FAQ, knowledge base).

**Key metrics to track:** First response time (<4h), resolution time (<24h),
CSAT (>90%), first contact resolution (>70%).

Maintain FAQ and knowledge base covering getting started, account management,
feature usage, troubleshooting, and integrations. Update after feature releases
and recurring questions.

---

## System Maintenance

- **Dependencies** — scan weekly, patch critical/high within 7 days, medium
  within 30 days, test in staging first
- **Infrastructure** — apply security patches monthly, database maintenance,
  backup validation
- **Certificates** — alert 30 days before expiration, automate renewal

---

## On-Call and Knowledge Management

Fair, sustainable on-call and documented knowledge prevent burnout and tribal
knowledge problems.

**On-call:** Establish rotation structure appropriate to team size, ensure fair
distribution, provide clear escalation paths and runbooks. For initial on-call
setup (choosing rotation type, defining escalation tiers), see the
[Support Operations Guide](support-operations-guide.md).

**Knowledge:** Maintain runbooks, troubleshooting guides, architecture docs, and
user documentation. Keep updated after incidents and releases. For initial
knowledge management setup (choosing tools, creating first runbooks), see the
[Support Operations Guide](support-operations-guide.md).

For rotation structures, burnout prevention strategies, and documentation best
practices, see
[Support Reference: On-Call](support-reference.md#on-call-operations) and
[Knowledge Management](support-reference.md#knowledge-management).

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

- **Incident response ineffective** — high MTTR, recurring incidents, poor
  communication
- **Alerts not actionable** — alert fatigue, missing context, team ignoring
  alerts
- **Success criteria not being met** — consistently missing objectives, no
  action on gaps
- **Team overwhelmed** — on-call burnout, ticket backlog, only reactive work
- **User satisfaction declining** — CSAT/NPS dropping, increasing tickets
- **Architecture or team changes** — new infrastructure, tools, team members

---

## Related Documents

- [Support Operations Guide](support-operations-guide.md)
- [Support Readiness Checklist](support-readiness-checklist.md)
- [Support Brief Template](support-brief-template.md)
- [Support Checklist](support-checklist.md)
- [Support Reference](support-reference.md)
- [AI-Assisted SDLC Stages](../framework-stages.md)

---

## Notes

**Last Updated:** 2026-02-19

Added to framework in v0.8.0.
