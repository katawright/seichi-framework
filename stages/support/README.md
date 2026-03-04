---
id: support
stage_number: 8
execution_pattern: continuous
inputs:
  - deployed-system
  - monitoring-dashboards
  - updated-runbooks
  - success-criteria-register
  - incident-response-procedures
outputs:
  - artifact: system-availability-metrics
    template: templates/support-brief.md
  - artifact: success-criteria-reports
  - artifact: incident-reports
  - artifact: enhancement-backlog
gates:
  - type: human-approval
    name: "Production Ownership Decision"
feeds_into:
  [requirements, system-design, increment-design, implementation, initiation]
checklist: stages/support/checklist.md
reference: stages/support/reference.md
---

# AI-Assisted SDLC: Support Stage

## Overview

Operational guidance for maintaining production health, supporting users, and
tracking business outcomes through continuous monitoring and improvement.

### Why Support

Support ensures production health, user satisfaction, and business objectives
through continuous monitoring and improvement. It closes the feedback loop from
delivery back to development. Without structured support, teams fall into
reactive fire-fighting — incidents repeat because root causes aren't fixed,
success criteria go untracked, and production knowledge lives only in the heads
of whoever happened to be on-call last night.

Effective support serves five purposes: monitoring systems and responding to
incidents to maintain production health, helping users succeed with the system,
tracking success criteria and reporting progress toward business objectives,
feeding production insights into new increments for continuous improvement, and
keeping dependencies, infrastructure, and documentation current through ongoing
system maintenance.

### Purpose

- Ensure production systems remain healthy and observable
- Provide structured incident response and bug management
- Track success criteria defined in Initiation against real production data
- Route enhancements and feedback back into the appropriate SDLC stage
- Right-size support operations to project risk and team context

### Key Principle

Production health and feedback loops reinforce each other. Monitoring catches
problems early, incident response resolves them quickly, and post-incident
learning feeds improvements back into the system — closing the loop between
delivery and development.

### Starting Point

A deployed increment live in production, baseline measurements captured at
deployment, and production monitoring dashboards active.

### How to Use This Guide

1. Read [**How AI Helps**](#how-ai-helps) to determine your AI autonomy level
2. Read [**Right-Sizing Support**](#right-sizing-support) to match effort to
   your project's risk tier
3. Fill out the [Support Brief Template](../../templates/support-brief.md) for
   your support plan and operations
4. Operate using the [**Support Workflow**](#support-workflow)
5. Run the [Support Checklist](checklist.md) regularly (weekly recommended)
6. Record the ownership decision using the
   [Checkpoint Decision Template](../../templates/checkpoint-decision.md)

> **First time setting up support?** Start with the
> [Support Operations Guide](operations.md) to choose your support level and
> establish one-time infrastructure (incident response, on-call, runbooks). Use
> the [Support Readiness Checklist](readiness-checklist.md) to verify readiness
> before accepting production ownership.

For cross-cutting framework concepts, see
[Framework Guide](../../guides/framework.md).

---

## How AI Helps

### AI Autonomy Spectrum

Match AI's role to your team's autonomy comfort level. Gate requirements always
apply regardless of tier. See the
[AI Assistance Scorecard: AI Autonomy Spectrum](../../guides/ai-assistance.md#ai-autonomy-spectrum)
for full tier definitions.

| Human-Led                          | Collaborative                                     | AI-Led                                                              |
| ---------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------- |
| Engineer triages; AI surfaces data | AI triages and drafts responses; engineer decides | AI monitors and identifies patterns proactively; engineer validates |

At the AI-Led tier, oversight intensity can be tuned from Active to Minimal —
see
[AI Assistance Scorecard: Oversight Intensity](../../guides/ai-assistance.md#oversight-intensity).
For detailed AI-Led patterns, see
[Stage Reference](reference.md#ai-led-patterns).

### AI Assistance Patterns

- **Operations setup:** AI helps draft incident response procedures, on-call
  rotation plans, and SLA definitions based on your project context
- **Incident response:** AI analyzes logs and metrics during incidents, suggests
  root causes, and drafts post-mortem reports
- **Runbook generation:** Describe your infrastructure and AI generates
  operational runbooks tailored to your stack
- **Success criteria reporting:** AI drafts progress reports from your metrics
  data, highlighting trends and recommending actions

For assistance level details, see the
[AI Assistance Scorecard](../../guides/ai-assistance.md).

> **Required gates:** Human approval — Support involves production-impacting
> decisions requiring domain expertise and real-time judgment for escalation and
> prioritization. AI triages and drafts; humans decide.

---

## Right-Sizing Support

Not every project needs the full support infrastructure described in this guide.
Match your ongoing support effort to your project's risk tier.

| Dimension             | Minimal                                    | Standard                                        | Enterprise                                       |
| --------------------- | ------------------------------------------ | ----------------------------------------------- | ------------------------------------------------ |
| **Monitoring**        | Basic health checks, error tracking        | APM, log aggregation, custom dashboards         | Full observability, distributed tracing          |
| **Alerting**          | Error notifications to team channel        | Severity-based routing (page / Slack / email)   | Automated escalation, multi-channel              |
| **On-call**           | Informal — team monitors during work hours | Rotation with backup, documented escalation     | 24x7 coverage, follow-the-sun                    |
| **Incident response** | Investigate when notified, fix or rollback | Documented severity levels and response process | Formal incident commander, war rooms             |
| **SLA/SLO**           | None — best effort                         | Internal targets (e.g., 99.5% uptime)           | Contractual SLAs with penalties                  |
| **User support**      | Direct contact (email, Slack)              | Help desk or ticketing system                   | Tiered support (L1/L2/L3), knowledge base        |
| **Knowledge mgmt**    | README and inline comments                 | Runbooks for common operations                  | Comprehensive knowledge base, training program   |
| **Success criteria**  | Informal check-ins                         | Monthly reports to stakeholders                 | Dashboards with automated reporting              |
| **Security**          | Scan weekly, patch critical in 7 days      | CVE monitoring, patch per severity SLA          | Continuous monitoring, formal vulnerability mgmt |

Expand Support only when needed:

- **High availability / SLA commitments:** Add 24x7 on-call, automated
  escalation, contractual SLA tracking
- **Large or growing user base:** Add tiered support (L1/L2/L3), help desk
  system, knowledge base
- **Regulated / compliance-heavy:** Add formal incident documentation, audit
  trail, compliance reporting
- **Complex distributed systems:** Add full observability (distributed tracing,
  APM), formal incident commander process
- **Business-critical metrics:** Add automated dashboards, real-time alerting on
  success criteria

Otherwise, keep support lightweight and scale as the system matures.

> These triggers help you decide when to move from Minimal to Standard or
> Enterprise. For full tier definitions and choosing criteria, see the
> [Right-Sizing Guide](../../guides/right-sizing.md).

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
    team retrospective (see templates/retrospective.md)
 7. Monthly: Success criteria report to
    stakeholders, dependency updates
 8. Quarterly: Business review, strategic
    planning, process improvement

-- FEEDBACK LOOP --

 9. Production insights feed into new
    increments (route by scope)
```

---

## Support Guidance

### Core Responsibilities

- **Monitor** — watch system health and success criteria
- **Respond** — quickly resolve production incidents
- **Fix** — address bugs discovered in production
- **Enhance** — deliver incremental improvements
- **Support** — help users succeed with the system
- **Measure** — track progress toward business objectives
- **Maintain** — keep systems secure, updated, and optimized

### Production Monitoring

Effective monitoring enables teams to detect issues before users report them and
track progress toward business objectives.

Monitoring **infrastructure and tooling** (dashboards, APM, log aggregation) is
set up during deployment — see the
[Deployment Setup Guide](../deployment/setup.md). This section covers the
**operational practices** for using that infrastructure day-to-day.

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
[Support Reference: Monitoring](reference.md#monitoring-thresholds-and-baselines)
and [Alerting Design](reference.md#alerting-design), or use AI to suggest
thresholds tuned to your traffic patterns and SLAs.

### Incident Response

Incidents are unexpected events that degrade or disrupt service. A clear
response process minimizes impact and prevents recurrence.

#### Severity Levels

| Level | Impact                         | Response | Post-Mortem  |
| ----- | ------------------------------ | -------- | ------------ |
| P0    | All users, data loss, security | 15 min   | Required 24h |
| P1    | Major feature, >10% users      | 30 min   | Required 48h |
| P2    | Minor feature, <10% users      | 2 hours  | Optional     |
| P3    | Cosmetic, no functional impact | Next day | Not required |

#### Response Overview

1. **Detect** — alert or user report triggers response
2. **Assess** — check dashboards, logs, recent deployments
3. **Communicate** — notify stakeholders per severity
4. **Resolve** — rollback, hotfix, workaround, or config fix
5. **Validate** — confirm metrics return to baseline
6. **Close** — update tracker, schedule post-mortem if needed

#### Post-Incident Reviews

Required for P0/P1. Focus on systems and processes, not individuals (blameless
culture). Action items must be specific, assigned, and tracked to completion.

For the detailed six-phase response process, escalation tiers, incident metrics
(MTTD/MTTA/MTTR), and post-mortem templates, see
[Support Reference: Incident Response](reference.md#incident-response-process).

### Bug Management and Hotfixes

#### Bug Triage

Assess three dimensions for every production bug:

1. **Severity** (technical impact): Critical → Low
2. **User impact** (business impact): High → Minimal
3. **Urgency** (time sensitivity): Immediate → Low

**Hotfix when:** Critical severity AND high user impact AND no workaround AND
fix is low-risk.

**Low-risk patch fast path:** For clearly low-risk, scoped patches, teams may
route directly to Implementation. Record the rationale, rollback approach, and
approver using the
[Checkpoint Decision Template](../../templates/checkpoint-decision.md).

**Otherwise:** Add to backlog with severity tag, prioritize in increment
planning, and follow the appropriate SDLC stage path.

For the full decision matrix and hotfix workflow, see
[Support Reference: Bug Triage](reference.md#bug-triage-decision-matrix).

### Enhancement Management

Enhancements come from user feedback, success criteria gaps, and technical
improvements. Use a prioritization framework (RICE, Value vs. Effort, or your
team's approach) to evaluate objectively.

**Workflow:** Request logged → PM reviews → engineering estimates → prioritize →
approved items route by scope:

- Implementation (clearly low-risk patch; requires documented checkpoint
  decision and rollback approach)
- Increment Design (scoped enhancement in existing boundaries)
- Requirements (new/changed requirements)
- System Design (architectural/infrastructure impact)
- Initiation (only if objectives or business case change materially)

Then execute through the appropriate SDLC stages and monitor impact after
delivery.

For prioritization framework details, see
[Support Reference: Enhancement Prioritization](reference.md#enhancement-prioritization).

### Success Criteria Tracking

Support closes the measurement loop established in Initiation. Use the
[Success Criteria Register](../../templates/success-criteria-register.md) as the
input for outcomes review — compare actuals against the baselines and targets
defined during Initiation. See
[Framework Guide: Measurement Throughline](../../guides/framework.md#measurement-throughline).

#### Measurement Cadence

- **Daily** — high-priority metrics (revenue, critical errors); address
  anomalies same day
- **Weekly** — standard metrics (conversion, engagement); team review of trends
- **Monthly** — strategic metrics (progress toward targets); stakeholder report
- **Quarterly** — business reviews (overall achievement, strategic planning)

#### Trend and Variance Analysis

Track whether metrics are improving, declining, or flat:

- **Improving** — continue monitoring, share wins
- **Declining** — investigate root cause urgently, check recent changes
- **Flat** — identify interventions needed

When metrics deviate, ask: What changed recently? Are all segments affected? Is
this correlation or causation? What do qualitative signals (feedback, tickets)
say?

#### Reporting

Monthly success criteria reports to stakeholders covering: status per criterion,
baseline vs. target vs. current, trends, analysis, and planned actions.

For report templates, see
[Support Reference: Report Template](reference.md#success-criteria-report-template).

### User Support

Provide support through synchronous channels (chat, phone), asynchronous
channels (email, help desk), and self-service (docs, FAQ, knowledge base).

**Key metrics to track:** First response time (<4h), resolution time (<24h),
CSAT (>90%), first contact resolution (>70%).

Maintain FAQ and knowledge base covering getting started, account management,
feature usage, troubleshooting, and integrations. Update after feature releases
and recurring questions.

### System Maintenance

- **Dependencies** — scan weekly, patch critical/high within 7 days, medium
  within 30 days, test in staging first
- **Infrastructure** — apply security patches monthly, database maintenance,
  backup validation
- **Certificates** — alert 30 days before expiration, automate renewal

### On-Call and Knowledge Management

Fair, sustainable on-call and documented knowledge prevent burnout and tribal
knowledge problems.

**On-call:** Establish rotation structure appropriate to team size, ensure fair
distribution, provide clear escalation paths and runbooks. For initial on-call
setup (choosing rotation type, defining escalation tiers), see the
[Support Operations Guide](operations.md).

**Knowledge:** Maintain runbooks, troubleshooting guides, architecture docs, and
user documentation. Keep updated after incidents and releases. For initial
knowledge management setup (choosing tools, creating first runbooks), see the
[Support Operations Guide](operations.md).

For rotation structures, burnout prevention strategies, and documentation best
practices, see [Support Reference: On-Call](reference.md#on-call-operations) and
[Knowledge Management](reference.md#knowledge-management).

---

## Stage Outputs

- Production health reports
- Success criteria progress reports
- Incident post-mortems
- Bug fixes and enhancement releases
- Enhancement requests for new increments

> Support closes the **measurement throughline** — success criteria defined in
> Initiation are tracked against real production data here. See
> [Framework Guide: Measurement Throughline](../../guides/framework.md#measurement-throughline).

> Support closes the **learning throughline** — ongoing retrospectives surface
> systemic patterns from production and feed improvements back into planning.
> Use the [Retrospective Template](../../templates/retrospective.md). See
> [Framework Guide: Learning Throughline](../../guides/framework.md#learning-throughline).

> Support closes the **security throughline** — monitoring CVE feeds, patching
> vulnerabilities per SLA, and maintaining incident response readiness for
> security events. See [Security Guide](../../guides/security.md).

### Readiness Decision

Support does not have a numbered gate, but the team should make a deliberate
decision to accept production ownership. Use the
[Checkpoint Decision Template](../../templates/checkpoint-decision.md) to record
when the team confirms readiness to own the system in production.

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

## Notes

**Last Updated:** 2026-03-03

Added to framework in v0.8.0.
