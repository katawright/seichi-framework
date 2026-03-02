# Support Operations Guide

## Overview

Strategic guidance for establishing support operations before accepting
production ownership.

### Why Support Operations Setup

Support processes fail when they are informal, undocumented, or inconsistent.
Teams that skip structured setup end up reactive — scrambling during incidents
without clear escalation paths, losing tribal knowledge when people leave, and
missing business objectives because nobody is tracking success criteria. A
deliberate setup process prevents these failures whether you are building
support from scratch or formalizing what already exists.

### Purpose

- Guide greenfield projects through first-time support infrastructure setup
- Help brownfield projects discover, document, and improve existing processes
- Right-size support operations to project risk and team context
- Validate readiness before accepting production ownership

### Key Principle

Prove support readiness before accepting production ownership. The cost of
structured setup is small compared to the cost of an unplanned outage with no
runbooks, no escalation path, and no on-call rotation.

### How to Use This Guide

1. Review Right-Sizing via the
   [Support Stage Guide](README.md#right-sizing-support) to choose your tier
2. Follow the [**Greenfield Path**](#greenfield-path) or
   [**Brownfield Path**](#brownfield-path) below
3. Complete the [Support Readiness Checklist](readiness-checklist.md) to verify
   readiness
4. For ongoing per-increment operations, see the
   [Support Stage Guide](README.md)

---

## When to Use This Guide

- **Greenfield project:** No support infrastructure exists yet. Choose the right
  level and build what you need.
- **Brownfield project:** Support processes exist but may be informal,
  undocumented, or inconsistent. Discover, document, and improve.
- **Major change:** New team structure, significant user growth, or compliance
  requirements that change your support needs.

---

## Choosing Your Support Level

For tier definitions (Minimal, Standard, Enterprise) and criteria for choosing,
see the [Right-Sizing Guide](../../guides/right-sizing.md). For a detailed
comparison of what each tier looks like for Support specifically, see
[Support Stage Guide: Right-Sizing Support](README.md#right-sizing-support).

The greenfield and brownfield paths below include per-step guidance for each
tier — follow the tier that matches your project.

---

## Relationship to Other Guides

The [Deployment Setup Guide](../deployment/setup.md) sets up monitoring and
alerting **infrastructure and tooling** — the dashboards, log aggregation, APM,
and alert routing that make observability possible.

This guide configures the **operational processes** that use that infrastructure
— who responds to alerts, how incidents are managed, and what gets reported to
stakeholders.

| Responsibility         | Deployment Setup Guide                        | Support Operations Guide                         |
| ---------------------- | --------------------------------------------- | ------------------------------------------------ |
| Monitoring tools       | Select and configure APM, logging, dashboards | Define what to watch and review cadence          |
| Alert routing          | Set up channels (PagerDuty, Slack, email)     | Define severity levels and response expectations |
| On-call tooling        | Configure rotation tool                       | Define rotation structure and escalation process |
| Runbook infrastructure | N/A                                           | Create and maintain operational runbooks         |
| Incident tracking      | N/A                                           | Define incident response process                 |
| Success criteria       | Capture baseline measurements at deployment   | Track, analyze, and report on metrics            |

If you are setting up both deployment infrastructure and support operations for
the first time, complete the [Deployment Setup Guide](../deployment/setup.md)
first — support processes depend on the infrastructure being in place.

---

## Greenfield Path

Build support operations from scratch. Complete these activities before
accepting production ownership for your first increment.

### 1. Choose Your Support Level

Review the right-sizing table above and select Minimal, Standard, or Enterprise.
Document your choice in the [Support Brief](../../templates/support-brief.md).

Consider:

- How many users depend on this system?
- What is the cost of downtime (financial, reputational, safety)?
- What is your team size and availability?
- Are there compliance or contractual requirements?

### 2. Define Incident Response Process

Even Minimal projects need a basic plan for when things go wrong.

**Minimal:** Document who to contact and how to rollback. Keep it to a single
page.

**Standard:** Define severity levels (P0-P3), response times, and escalation
contacts. See
[Support Reference: Incident Response](reference.md#incident-response-process)
for templates.

**Enterprise:** Formal incident commander role, communication templates, war
room procedures, and post-incident review process.

### 3. Establish On-Call or Monitoring Responsibility

**Minimal:** Assign a team member to check dashboards daily during work hours.
No formal on-call needed.

**Standard:** Set up an on-call rotation with at least one backup. Document
escalation paths. See
[Support Reference: On-Call](reference.md#on-call-operations).

**Enterprise:** 24x7 coverage with follow-the-sun or shift-based rotation.
Automated escalation if on-call does not acknowledge within SLA.

#### On-Call Expectations

| Expectation                 | Standard             | Enterprise           |
| --------------------------- | -------------------- | -------------------- |
| Alert acknowledgment SLA    | Within 15 minutes    | Within 5 minutes     |
| Connectivity during on-call | Available by phone   | Available and online |
| Escalation trigger          | No ack after 15 min  | No ack after 5 min   |
| Handoff process             | Slack summary at EOD | Brief call + ticket  |

Handoff: At rotation change, brief incoming on-call on all active incidents,
known instabilities, and any elevated alert states.

### 4. Set Up User Support Channels

**Minimal:** Publish a contact email or Slack channel. Set expectations that
response is best-effort during business hours.

**Standard:** Set up a ticketing system or help desk. Define first response and
resolution time targets.

**Enterprise:** Tiered support (L1 triage, L2 engineering, L3 specialists).
SLA-backed response times. Self-service knowledge base.

### 5. Define SLAs and SLOs (if Applicable)

**Minimal:** Skip — best-effort support is appropriate.

**Standard:** Set internal SLOs (e.g., 99.5% uptime, P0 response <30 min). Track
but do not penalize.

**Enterprise:** Formal SLAs with contractual commitments. Monitoring dashboards
that track compliance. Escalation when SLA breach is imminent.

### 6. Create Initial Runbooks

Document procedures the team will need:

**Minimal:** How to check system health, how to rollback a deployment, who to
contact for help.

**Standard:** Add runbooks for common incidents, database maintenance,
dependency updates, and scaling procedures. Use the
[Runbook Template](../../templates/runbook.md) as a starting point. See
[Support Reference: Runbook Examples](reference.md#operational-runbook-examples)
for example content.

**Enterprise:** Comprehensive runbook library covering all operational
scenarios, regularly tested and updated. Use the
[Runbook Template](../../templates/runbook.md) for consistent formatting.

### 7. Establish Success Criteria Tracking

**Minimal:** Informal check-ins — review metrics when convenient, act on obvious
problems.

**Standard:** Monthly reports to stakeholders with trend analysis. See
[Support Reference: Report Template](reference.md#success-criteria-report-template).

**Enterprise:** Automated dashboards with real-time tracking. Defined escalation
when metrics deviate from targets.

<!-- prettier-ignore -->
> **AI exploration:** _"Help me set up support operations for
> [describe your project, team size, user base, and risk tier].
> Suggest the right support level and what to prioritize first."_

---

## Brownfield Path

Improve support for a system already in production.

### 1. Discover Existing Processes

Map what exists today:

- How are incidents currently handled? Who gets called?
- What monitoring is in place? What gaps exist?
- How are bugs triaged and resolved?
- What documentation exists (runbooks, architecture docs, FAQs)?
- How are success criteria tracked (if at all)?

### 2. Capture Tribal Knowledge

Interview team members who support the system:

- Undocumented procedures and workarounds
- Known fragile points ("this service crashes if...")
- Historical incidents and what was learned
- Manual interventions that happen regularly
- Institutional knowledge that only one person holds

### 3. Assess Current Level

Compare your current state against the right-sizing table. You may find that
your team operates at different levels across dimensions — strong monitoring but
weak incident response, for example.

### 4. Gap Analysis

Identify the differences between your current state and your target level:

| Dimension         | Current State       | Target Level | Gap                            |
| ----------------- | ------------------- | ------------ | ------------------------------ |
| Monitoring        | Basic health checks | Standard     | Need APM and custom dashboards |
| Incident response | Ad hoc              | Standard     | Need documented process        |
| ...               | ...                 | ...          | ...                            |

### 5. Improvement Backlog

Prioritize improvements based on risk and effort:

| Improvement               | Risk Reduced | Effort | Priority |
| ------------------------- | ------------ | ------ | -------- |
| Document incident process | High         | Low    | High     |
| Create runbooks           | Medium       | Medium | High     |
| Set up on-call rotation   | High         | Medium | Medium   |
| ...                       | ...          | ...    | ...      |

Address high-priority items immediately. Lower-priority items become backlog for
continuous improvement.

> **AI exploration:** _"Review our current support operations [describe them]
> and suggest improvements prioritized by risk reduction."_

---

## Readiness Decision

Support does not have a numbered gate, but the team should make a deliberate
decision to accept production ownership. Use the
[Checkpoint Decision Template](../../templates/checkpoint-decision.md) to record
this decision when the team confirms readiness.

**Key question:** Is the team prepared to own this system in production?

**Decision inputs:**

- Support level chosen and documented
- Incident response process defined (appropriate to level)
- Monitoring and alerting reviewed (infrastructure from Deployment)
- On-call or monitoring responsibility assigned
- Runbooks created for critical operations
- Success criteria tracking cadence defined

For a quick verification, use the
[Support Readiness Checklist](readiness-checklist.md).

---

## Related Documents

- [Support Stage Guide](README.md)
- [Support Readiness Checklist](readiness-checklist.md)
- [Support Brief Template](../../templates/support-brief.md)
- [Support Reference](reference.md)
- [Deployment Setup Guide](../deployment/setup.md)
- [Checkpoint Decision Template](../../templates/checkpoint-decision.md)

---

## Notes

**Last Updated:** 2026-02-28

Added to framework in v0.12.0.
