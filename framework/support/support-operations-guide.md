# Support Operations Guide

Strategic guide for establishing support operations. Use this guide when setting
up support for a new project or improving support for an existing one.

For per-increment support operations, see the [Support Guide](support-guide.md).

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
see the [Right-Sizing Guide](../right-sizing-guide.md). For a detailed
comparison of what each tier looks like for Support specifically, see
[Support Guide: Right-Sizing Support](support-guide.md#right-sizing-support).

The greenfield and brownfield paths below include per-step guidance for each
tier — follow the tier that matches your project.

---

## Relationship to Deployment

The [Deployment Setup Guide](../deployment/deployment-setup-guide.md) sets up
monitoring and alerting **infrastructure and tooling** — the dashboards, log
aggregation, APM, and alert routing that make observability possible.

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
the first time, complete the
[Deployment Setup Guide](../deployment/deployment-setup-guide.md) first —
support processes depend on the infrastructure being in place.

---

## Greenfield Path

Build support operations from scratch. Complete these activities before
accepting production ownership for your first increment.

### 1. Choose Your Support Level

Review the right-sizing table above and select Minimal, Standard, or Enterprise.
Document your choice in the [Support Brief](support-brief-template.md).

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
[Support Reference: Incident Response](support-reference.md#incident-response-process)
for templates.

**Enterprise:** Formal incident commander role, communication templates, war
room procedures, and post-incident review process.

### 3. Establish On-Call or Monitoring Responsibility

**Minimal:** Assign a team member to check dashboards daily during work hours.
No formal on-call needed.

**Standard:** Set up an on-call rotation with at least one backup. Document
escalation paths. See
[Support Reference: On-Call](support-reference.md#on-call-operations).

**Enterprise:** 24x7 coverage with follow-the-sun or shift-based rotation.
Automated escalation if on-call does not acknowledge within SLA.

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
dependency updates, and scaling procedures. See
[Support Reference: Runbook Examples](support-reference.md#operational-runbook-examples).

**Enterprise:** Comprehensive runbook library covering all operational
scenarios, regularly tested and updated.

### 7. Establish Success Criteria Tracking

**Minimal:** Informal check-ins — review metrics when convenient, act on obvious
problems.

**Standard:** Monthly reports to stakeholders with trend analysis. See
[Support Reference: Report Template](support-reference.md#success-criteria-report-template).

**Enterprise:** Automated dashboards with real-time tracking. Defined escalation
when metrics deviate from targets.

> **AI exploration:** _"Help me set up support operations for [describe > your >
> > project, team size, user base, and risk level]. Suggest the right support
> level and what to prioritize first."_

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

> **AI exploration:** _"Review our current support operations [describe > them]
> and suggest improvements prioritized by risk reduction."_

---

## Readiness Decision

Support does not have a numbered gate, but the team should make a deliberate
decision to accept production ownership. Use the
[Gate Decision Template](../gate-decision-template.md) to record this decision
when the team confirms readiness.

**Key question:** Is the team prepared to own this system in production?

**Decision inputs:**

- Support level chosen and documented
- Incident response process defined (appropriate to level)
- Monitoring and alerting reviewed (infrastructure from Deployment)
- On-call or monitoring responsibility assigned
- Runbooks created for critical operations
- Success criteria tracking cadence defined

For a quick verification, use the
[Support Readiness Checklist](support-readiness-checklist.md).

---

## Related Documents

- [Support Guide](support-guide.md)
- [Support Readiness Checklist](support-readiness-checklist.md)
- [Support Brief Template](support-brief-template.md)
- [Support Reference](support-reference.md)
- [Deployment Setup Guide](../deployment/deployment-setup-guide.md)
- [Gate Decision Template](../gate-decision-template.md)

---

**Last Updated:** 2026-02-19

_Added to framework in v0.12.0_
