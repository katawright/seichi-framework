# Support Readiness Checklist

**Purpose:** Quick verification that support operations are ready before the
team accepts production ownership or after major support process changes.

**Usage:** Complete the section matching your support level during initial
setup. For ongoing operational readiness, use the
[Support Checklist](support-checklist.md) instead.

For detailed setup guidance, see the
[Support Operations Guide](support-operations-guide.md).

---

## Minimal Level

For MVPs, experiments, prototypes, and small internal tools.

- [ ] Team knows who to contact when something goes wrong
- [ ] Basic monitoring active (health checks, error tracking)
- [ ] Error notifications reaching the team (email or chat channel)
- [ ] Known issues and limitations documented
- [ ] Rollback procedure understood by at least one team member
- [ ] Success criteria identified (even if tracked informally)

**Ready when:** All items checked — team can respond to basic production issues.

---

## Standard Level

For production applications with real users. Includes all Minimal items plus:

- [ ] On-call rotation defined with backup identified
- [ ] Incident response process documented with severity levels
- [ ] Severity-based alerting configured (page / Slack / email)
- [ ] Runbooks created for common operational tasks
- [ ] User support channel established (ticketing, help desk, or dedicated
      contact)
- [ ] Success criteria tracking cadence defined (weekly review, monthly report)
- [ ] Support Brief completed and reviewed

**Ready when:** All Minimal and Standard items checked — team is prepared for
structured production ownership.

---

## Enterprise Level

For mission-critical and regulated systems. Includes all Standard items plus:

- [ ] SLA/SLO targets documented and agreed with stakeholders
- [ ] 24x7 on-call coverage established (follow-the-sun or shift-based)
- [ ] Automated escalation configured (alert → page → escalate if
      unacknowledged)
- [ ] Comprehensive knowledge base operational (runbooks, FAQs, troubleshooting
      guides)
- [ ] Disaster recovery procedure tested
- [ ] Support metrics dashboards operational (MTTD, MTTR, SLA compliance)

**Ready when:** All Minimal, Standard, and Enterprise items checked — team is
prepared for mission-critical production ownership.

---

> **AI suggestion:** _"Walk me through this checklist for [describe your project, support level, and team] and flag any items that need extra attention."_

---

**Last Updated:** 2026-02-19

_Added to framework in v0.12.0_
