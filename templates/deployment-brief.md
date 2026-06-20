<!-- For guidance on completing this brief, see ../stages/deployment/README.md -->

# Deployment Brief

> **Before starting a session on this brief:** follow the steps in
> [Session Protocol](../guides/session-protocol.md). Check it at session start
> so nothing is missed as the protocol evolves.

> **Stage guide:** [Deployment](../stages/deployment/README.md)
>
> **Need an example?** See
> [Worked Example: Deployment](../guides/worked-example.md#stage-7-deployment)

> **Convention:** Flag unverified assumptions with `[ASSUMED]` throughout the
> brief for gate reviewers to audit. During review, each `[ASSUMED]` item should
> be **confirmed** (verified — remove tag), **challenged** (incorrect — update
> and remove tag), or **carried forward** (unverifiable now — leave tag and note
> as a gate condition).

**Last Updated:** YYYY-MM-DD **Increment:** [Increment name/ID] **Deployment
Date:** YYYY-MM-DD **Deployment Engineer:** [Name] **Status:** [Planning / Ready
/ In Progress / Completed / Deferred / Rolled Back]

---

## Increment Overview

**Purpose:** [Brief description of what this increment delivers]

**Requirements Implemented:**

- [REQ-001]: [Requirement summary]
- [REQ-002]: [Requirement summary]

**Verification Status:**

- Unit Tests: [✅ Passed / ❌ Failed] - [Coverage %]
- Integration Tests: [✅ Passed / ❌ Failed]
- UAT: [✅ Approved / ❌ Rejected / ⏳ Pending]
- Performance: [✅ Acceptable / ❌ Issues / ⏳ Not Tested]
- Security: [✅ Approved / ❌ Issues / ⏳ Pending]

**UAT Sign-Off:**

- Approved by: [Name, Title]
- Date: YYYY-MM-DD
- Notes: [Any conditions or caveats]

---

## Release Details

<!-- If the disposition is Deferred, record the deferral rationale and
     integration-risk note here, and complete the release fields below when the
     release fires. See ../stages/deployment/README.md#release-disposition. -->

- **Release Disposition:** [Released / Deferred]
- **Release Version:** [e.g., v1.2.0]
- **Previous Version:** [Currently deployed version]
- **Build/Package ID:** [CI/CD build number or artifact]
- **Git Commit/Tag:** [Commit hash or release tag]
- **Branch:** [e.g., main, release/1.2.0]

**Deployment Strategy:** [Blue/Green / Canary / Rolling / Feature Flag / Big
Bang]

**Rationale:** [Why this strategy was chosen]

**Deployment Window:** [Start time] – [End time] [Timezone]

**Target Environment:** [Production / Staging / Pre-Prod] **Region(s):** [e.g.,
US-East, EU-Central, Global] **Infrastructure:** [e.g., AWS ECS, Kubernetes, VM
fleet]

<!-- Pre-deployment readiness: use checklist.md -->

---

## Release Notes

<!-- Stakeholder-facing summary of what this release delivers. -->

**Audience:** [e.g., End users, Internal teams, API consumers]

**Summary of Changes:**

- [Feature/fix 1]
- [Feature/fix 2]

**Known Limitations:** [Any caveats or temporary limitations in this release]

---

## Deployment Steps

| Phase                | Duration | Responsible | Rollback Point |
| -------------------- | -------- | ----------- | -------------- |
| [Pre-Deployment]     | [X min]  | [Role]      | [Y/N]          |
| [Data/State Changes] | [X min]  | [Role]      | [Y/N]          |
| [Application Deploy] | [X min]  | [Role]      | [Y/N]          |
| [Traffic Switch]     | [X min]  | [Role]      | [Y/N]          |
| [Validation]         | [X min]  | [Role]      | [Y/N]          |

<!-- For detailed phased deployment steps, see ../stages/deployment/reference.md -->

---

## Data and State Changes

### Database Migrations

**Schema Changes:** [Yes / No / N/A] **Data Changes:** [Yes / No / N/A]
**Migration Type:** [Additive / Backward-Compatible / Breaking / N/A]

**Migration Scripts:**

- [migration file]: [description]

**Migration Testing:**

- [ ] Tested in staging with production-like data
- [ ] Rollback tested and validated
- [ ] Performance impact assessed

### Cache and Index Updates

**Cache Invalidation Required:** [Yes / No / N/A] **Strategy:** [Versioned keys
/ Warm-then-switch / Flush / N/A]

**Search Index Updates Required:** [Yes / No / N/A] **Reindex Approach:**
[Background / Pre-deploy / Post-deploy / N/A]

### Feature Flag State

| Flag Name | Current State | Target State | Rollback Action |
| --------- | ------------- | ------------ | --------------- |
| [flag]    | [on/off]      | [on/off]     | [toggle off]    |

### Other State Changes

- [Describe any other state changes not covered above]

---

## Configuration Changes

### Environment Variables

| Variable | Previous | New     | Impact   |
| -------- | -------- | ------- | -------- |
| [VAR]    | [value]  | [value] | [impact] |

### Secrets Management

- [ ] New secrets added to secret manager
- [ ] Old secrets rotated (if applicable)
- [ ] Secret access permissions validated

---

## Release Security

<!-- Security throughline: verify release integrity before deployment.
     See guides/security.md. -->

- [ ] **No new critical CVEs** since last dependency scan
- [ ] **SBOM generated** for this release (attach or link)
- [ ] **Artifact integrity verified** (checksums match CI build output)
- [ ] **No secrets embedded** in build artifacts or container images
- [ ] **Security scan results reviewed** (all critical/high findings resolved or
      accepted with justification)

**SBOM location:** [Link or path to SBOM file]

**Security sign-off:** [Name, date — or N/A for Minimal tier]

---

## Rollback Plan

**Example triggers (adjust to your baseline):**

- Critical bug blocking users
- Error rate >5% sustained for >5 minutes
- Response time >2x baseline
- Data corruption or integrity issues
- Security vulnerability discovered

**Decision Authority:** [Name, Role] **Escalation:** [Who to contact if
unavailable]

**Rollback Steps:**

> **Order matters:** revert application code before reverting schema changes.
> Reversing this order can cause runtime errors if the running code references
> columns or tables that a premature migration rollback removed.

1. [ ] Revert application code to previous version
2. [ ] Revert configuration and environment variables
3. [ ] Roll back database migrations (if applicable)
4. [ ] Invalidate or reset caches to match reverted state
5. [ ] Validate reverted system health and run smoke tests

<!-- For detailed rollback procedures, see ../stages/deployment/reference.md -->

**Post-Rollback Actions:**

- [ ] Document rollback reason and timeline
- [ ] Preserve logs and metrics for analysis
- [ ] Schedule retrospective
- [ ] Update deployment brief with details

<!-- For detailed rollback procedures, see ../stages/deployment/reference.md -->

---

## Post-Deployment Validation

**Smoke Tests:**

- [ ] Automated smoke tests passed
- [ ] Critical user paths manually verified
- [ ] API health checks returning expected responses

**Production Health:** [✅ Healthy / ⚠️ Issues / ❌ Down]

- Error Rate: [Current: X%, Expected: <Y%]
- Response Time (p95): [Current: Xms, Expected: <Yms]
- Throughput: [Current: X req/s, Expected: Y-Z req/s]

**Dashboard Links:**

- Production dashboard: [URL]
- Error tracking: [URL]
- Infrastructure monitoring: [URL]

---

## Success Criteria Baselines

**Date/Time:** [YYYY-MM-DD HH:MM UTC]

**Success Criterion 1:** [From Initiation]

- Baseline: [measurement]
- Method: [how to track]
- Dashboard: [link]
- Next measurement: [when]

**Success Criterion 2:** [From Initiation]

- Baseline:
- Method:
- Dashboard:
- Next measurement:

**Instrumentation:**

- [ ] Analytics events firing correctly
- [ ] Custom metrics appearing in dashboards
- [ ] Alerts configured for metric thresholds

---

## Known Production Issues

### Issue 1: [Brief Description]

**Severity:** [Critical / High / Medium / Low] **Impact:** [Who is affected and
how] **Workaround:** [Temporary solution if available] **Resolution Plan:** [Fix
in next release / Hotfix / Accepted limitation] **Tracking:** [Link to issue
tracker]

---

## Handoff to Operations

- [ ] Deployment brief shared with Operations team
- [ ] Success criteria baselines documented
- [ ] Monitoring dashboards accessible to Operations
- [ ] Operations runbook created or updated
- [ ] Known issues documented with workarounds
- [ ] Escalation contacts updated

<!-- For operations handoff details, see ../stages/deployment/reference.md -->

---

> For full readiness verification before accepting production ownership, see the
> [Operations Guide](../guides/operations.md).

## Production Ownership Transfer

<!-- Complete when production responsibility transfers to the accepting team.
     For Minimal-tier projects where the same team deploys and supports,
     a lightweight acknowledgment is sufficient. -->

| Field              | Value                                              |
| ------------------ | -------------------------------------------------- |
| System / Increment | [What is being transferred]                        |
| Transfer date/time | YYYY-MM-DD HH:MM [TZ]                              |
| Accepting team     | [Team or role name]                                |
| Operations tier    | [Minimal / Standard / Enterprise]                  |
| Escalation contact | [Deployment engineer, available until: YYYY-MM-DD] |

**Accepting team confirms:**

- [ ] Runbooks received and reviewed
- [ ] Monitoring dashboards accessible
- [ ] Alerting verified and routed to on-call
- [ ] Rollback procedure known and tested
- [ ] Known issues and workarounds understood
- [ ] Escalation path and contacts documented

**Sign-off:**

| Role                | Name   | Date       |
| ------------------- | ------ | ---------- |
| Deploying team lead | [Name] | YYYY-MM-DD |
| Accepting team lead | [Name] | YYYY-MM-DD |

---

## Incident Response Procedures

<!-- Minimal tier: document procedures here. Standard+ tiers may reference a
     standalone incident response document instead. -->

**Escalation path:**

| Severity                | Response time | Escalation contact |
| ----------------------- | ------------- | ------------------ |
| Critical (service down) | [target]      | [contact]          |
| High (degraded)         | [target]      | [contact]          |
| Low (cosmetic)          | [target]      | [contact]          |

**Rollback authority:** [Who can authorize rollback]

**Communication plan:** [How users/stakeholders are notified during incidents]

---

## Retrospective

> Complete the retrospective at each increment boundary using the
> [Retrospective Template](retrospective.md).

**Retrospective link:** [path or link to completed retrospective]

**Key action items carried forward:**

1. [Action item from retrospective]

---

## Sign-Off

**Deployment Status:** [✅ Success / ⚠️ Partial / ❌ Rolled Back]

**Deployment Engineer:**

- Name: [Engineer Name]
- Date: YYYY-MM-DD
- Notes: [Any final comments]

**DevOps Lead:**

- Name: [Lead Name]
- Date: YYYY-MM-DD
- Notes:

**Project Manager:**

- Name: [PjM Name]
- Date: YYYY-MM-DD
- Notes: [Release coordination, dependency, and schedule confirmation]

**Product Manager:**

- Name: [PM Name]
- Date: YYYY-MM-DD
- Notes:

---

**Next Steps:**

1. Monitor production for next 24 hours
2. Track success criteria baselines vs. targets
3. Address any minor issues discovered
4. Hand off toward Closure and Operations

---

## Self-Validation Against Deployment Checklist

<!-- Before submitting for gate review, self-assess against the Deployment
     Checklist. This catches issues before formal review and improves
     first-pass quality. -->

- [ ] Pre-filled [Deployment Checklist](../stages/deployment/checklist.md) with
      self-assessment and evidence for each item
- **Items needing attention:** [List any items that don't fully pass]

<!-- Template Last Updated: 2026-06-20 | Added in v0.7.0. Session protocol preamble added in v0.44.0. Release disposition field added in v0.45.0. v0.49 vocabulary/dev-ops-split sweep. -->
