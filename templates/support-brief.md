<!-- For guidance on completing this brief, see ../support/README.md -->

# Support Brief

> **Convention:** Flag unverified assumptions with `[ASSUMED]` throughout the
> brief for gate reviewers to audit. During review, each `[ASSUMED]` item should
> be **confirmed** (verified — remove tag), **challenged** (incorrect — update
> and remove tag), or **carried forward** (unverifiable now — leave tag and note
> as a gate condition).

**Last Updated:** YYYY-MM-DD **Project:** [Project name] **Support Team:** [Team
name or members] **Status:** [Active / Maintenance Mode / End of Life]

---

## Project Overview

**Purpose:** [Brief description of what this system does and why it exists]

**Support Level:** [Minimal / Standard / Enterprise]

<!-- See Support Operations Guide (../stages/support/operations.md) for level definitions -->

**Current Version:** [v1.2.0 or release identifier] **Deployed:** [Date of most
recent production deployment]

**Success Criteria (from Initiation):**

- [Success criterion 1 with target metric]
- [Success criterion 2 with target metric]
- [Success criterion 3 with target metric]

---

## Production Environment

**URLs:**

- Production: [https://app.example.com]
- API: [https://api.example.com]
- Admin: [https://admin.example.com]

**Infrastructure:**

- Provider: [AWS / Azure / GCP / On-premises]
- Orchestration: [Kubernetes / ECS / VMs / etc.]
- Regions: [us-east-1, eu-west-1, etc.]

**Database:**

- Type and hosting: [PostgreSQL on RDS / etc.]
- Backup schedule: [Daily at 2 AM UTC, 30-day retention]

**Key Dependencies:**

- [Service 1]: [Purpose, SLA]
- [Service 2]: [Purpose, SLA]

**Access:**

- VPN/MFA: [Yes / No]
- Credentials: [Password manager / secret manager location]

---

## Monitoring Setup

<!-- All levels — scope to your support level -->

**Primary Dashboard:** [Link]

- Error rate, response time, throughput, infrastructure health

**Success Criteria Dashboard:** [Link]

- [Metric 1]: Baseline [X] → Target [Y]
- [Metric 2]: Baseline [X] → Target [Y]
- [Metric 3]: Baseline [X] → Target [Y]

**Other Dashboards:**

- Error tracking: [Link — Sentry, Rollbar, etc.]
- Log aggregation: [Link — ELK, Splunk, etc.]
- APM: [Link — New Relic, Datadog, etc.]

**Alerting Summary:**

- Critical (page on-call): [Error rate >5%, health checks failing, deployment
  failed]
- Warning (Slack): [Error rate >2%, high CPU/memory, response time degraded]
- Info (email): [Deployment completed, job queue backlog]
- Channels: Critical → [PagerDuty], Warning → [#alerts], Info → [email list]

<!-- For detailed threshold tables, see Support Reference: Monitoring Thresholds (../stages/support/reference.md#monitoring-thresholds-and-baselines) -->

---

## On-Call and Escalation

<!-- Standard and Enterprise levels — Minimal projects may use informal contact list instead -->

**Current On-Call:** [Name, contact, Slack handle] **Backup On-Call:** [Name,
contact, Slack handle] **Rotation:** [Weekly / daily, rotation day]

**Severity Summary:**

| Level | Impact               | Response | Post-Mortem  |
| ----- | -------------------- | -------- | ------------ |
| P0    | All users, data loss | 15 min   | Required 24h |
| P1    | Major feature, >10%  | 30 min   | Required 48h |
| P2    | Minor feature, <10%  | 2 hours  | Optional     |
| P3    | Cosmetic, no impact  | Next day | Not required |

<!-- For detailed severity descriptions and incident response procedures, see Support Reference (../stages/support/reference.md#severity-level-details) -->

**Escalation Contacts:**

- L1 On-call: [Name, contact]
- L2 Engineering lead: [Name, contact]
- L3 VP Engineering: [Name, contact]
- External: [Cloud provider support, vendor contacts]

---

## Bug and Enhancement Tracking

**Issue Tracker:** [Jira / GitHub Issues / Linear] **Bug Workflow:** New →
Triaged → In Progress → Fixed → Verified → Closed

**Enhancement Backlog:** [Location / tool] **Enhancement Owner:** [Product
manager name]

---

## Success Criteria Tracking

<!-- All levels — Minimal projects may track informally -->

**Success Criterion 1:** [Description]

- Baseline: [value] → Target: [value]
- Current: [value] — Status: [On track / Behind / At risk]
- Measurement: [Method and dashboard link]

**Success Criterion 2:** [Description]

- Baseline: [value] → Target: [value]
- Current: [value] — Status: [On track / Behind / At risk]
- Measurement: [Method and dashboard link]

**Success Criterion 3:** [Description]

- Baseline: [value] → Target: [value]
- Current: [value] — Status: [On track / Behind / At risk]
- Measurement: [Method and dashboard link]

**Measurement Schedule:**

- Daily: [High-priority metrics, e.g., revenue, errors]
- Weekly: [Standard metrics, e.g., conversion, engagement] — Review: [Day/time,
  attendees]
- Monthly: [Comprehensive report to stakeholders]

<!-- For report templates, see Support Reference (../stages/support/reference.md#success-criteria-report-template) -->

---

## Vulnerability Management

<!-- Security throughline: monitor and patch vulnerabilities per SLA.
     See guides/security.md. -->

**Scanning tool:** [Dependabot / Snyk / Trivy / Other: ___]

**Scan frequency:** [Continuous / Daily / Weekly]

**Patch SLAs:**

| Severity | Patch deadline        |
| -------- | --------------------- |
| Critical | Within 7 days         |
| High     | Within 14 days        |
| Medium   | Within 30 days        |
| Low      | Next scheduled update |

**Current open vulnerabilities:** [Count — or link to dashboard]

**SBOM location:** [Link or path to latest SBOM]

---

## Maintenance Schedule

<!-- Standard and Enterprise levels -->

**Weekly:** Dependency vulnerability scan, alert tuning, runbook review

**Monthly:** Success criteria report, infrastructure cost review, database
maintenance, documentation review

**Quarterly:** Major dependency updates, performance review, tech debt
assessment, disaster recovery drill

---

## Handoff Notes

**Last Deployment:** [Date, version, what changed] **Recent Incidents:** [Date,
severity, resolution, follow-up] **Ongoing Issues:** [Open bugs, known
limitations]

**Current Focus Areas:**

- [Area 1, e.g., "Monitoring conversion after new checkout"]
- [Area 2, e.g., "Performance optimization for slow APIs"]

**Upcoming Work:**

- [Enhancement/maintenance 1]: [Timeline]
- [Enhancement/maintenance 2]: [Timeline]

---

## Sign-Off

**Support Team Lead:**

- Name: [Lead name] — Date: YYYY-MM-DD
- Notes: [Any comments or concerns]

**Project Manager:**

- Name: [PjM name] — Date: YYYY-MM-DD
- Notes: [Delivery handoff acknowledgment and schedule closure]

**Product Manager:**

- Name: [PM name] — Date: YYYY-MM-DD
- Notes: [Acknowledgment of support approach and tracking]

---

**Brief Status:** [Active / Needs Update / Under Review] **Next Review Date:**
[YYYY-MM-DD — quarterly recommended]

---

## Self-Validation Against Support Checklist

<!-- Before submitting for gate review, self-assess against the Support
     Checklist. This catches issues before formal review and improves
     first-pass quality. -->

- [ ] Pre-filled [Support Checklist](../stages/support/checklist.md) with
      self-assessment and evidence for each item
- **Items needing attention:** [List any items that don't fully pass]

<!-- Template Last Updated: 2026-03-04 | Added in v0.8.0 -->
