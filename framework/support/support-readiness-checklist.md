# Support Readiness Checklist

**Purpose:** Verify support operations are ready before accepting production
ownership.

**Usage:** Complete the section matching your support level during initial
setup. For ongoing operational readiness, use the
[Support Checklist](support-checklist.md) instead.

---

> Items marked **[H]** require human judgment. Other items can be verified or
> assisted by AI.

## Minimal Level

For MVPs, experiments, prototypes, and small internal tools.

1. [ ] **Team knows who to contact when something goes wrong** (contact list
       documented and accessible)
2. [ ] **Basic monitoring active** (health checks, error tracking)
3. [ ] **Error notifications reaching the team** (email or chat)
4. [ ] **Known issues and limitations documented** (shared with team)
5. [ ] **[H] Rollback procedure understood** (at least one team member can
       execute)
6. [ ] **Success criteria identified** (even if tracked informally)

**Gate:** All items checked → team can respond to basic production issues.

---

## Standard Level

For production applications with real users. Includes all Minimal items plus:

1. [ ] **On-call rotation defined with backup identified** (schedule published)
2. [ ] **Incident response process documented** (severity levels and response
       times)
3. [ ] **Severity-based alerting configured** (page / Slack / email)
4. [ ] **Runbooks created for common operational tasks** (deploy, rollback,
       scale)
5. [ ] **User support channel established** (ticketing, help desk, or dedicated
       contact)
6. [ ] **[H] Success criteria tracking cadence defined** (weekly review, monthly
       report)
7. [ ] **Support Brief completed and reviewed** (team has read it)

**Gate:** All Minimal and Standard items checked → team is prepared for
structured production ownership.

---

## Enterprise Level

For mission-critical and regulated systems. Includes all Standard items plus:

1. [ ] **SLA/SLO targets documented and agreed with stakeholders** (contractual
       or internal)
2. [ ] **24x7 on-call coverage established** (follow-the-sun or shift-based)
3. [ ] **Automated escalation configured** (alert → page → escalate if
       unacknowledged)
4. [ ] **Comprehensive knowledge base operational** (runbooks, FAQs,
       troubleshooting guides)
5. [ ] **[H] Disaster recovery procedure tested** (restore within RTO/RPO
       targets)
6. [ ] **Support metrics dashboards operational** (MTTD, MTTR, SLA compliance)

**Gate:** All Minimal, Standard, and Enterprise items checked → team is prepared
for mission-critical production ownership.

---

> **AI suggestion:** _"Walk me through this checklist for [describe your
> project, support level, and team] and flag any items that need extra
> attention."_

---

## Related Documents

- [Support Operations Guide](support-operations-guide.md)
- [Support Stage Guide](README.md)
- [Support Checklist](support-checklist.md)

---

## Notes

**Last Updated:** 2026-02-28

Added to framework in v0.12.0.
