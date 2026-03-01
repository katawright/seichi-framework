<!-- For guidance on completing this brief, see deployment/README.md -->

# Deployment Brief

**Last Updated:** YYYY-MM-DD **Increment:** [Increment name/ID] **Deployment
Date:** YYYY-MM-DD **Deployment Engineer:** [Name] **Status:** [Planning / Ready
/ In Progress / Completed / Rolled Back]

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

## Handoff to Support

- [ ] Deployment brief shared with Support team
- [ ] Success criteria baselines documented
- [ ] Monitoring dashboards accessible to Support
- [ ] Support runbook created or updated
- [ ] Known issues documented with workarounds
- [ ] Escalation contacts updated

<!-- For support handoff details, see ../stages/deployment/reference.md -->

---

## Production Ownership Transfer

<!-- Complete when production responsibility transfers to the accepting team.
     For Minimal-tier projects where the same team deploys and supports,
     a lightweight acknowledgment is sufficient. -->

| Field              | Value                                              |
| ------------------ | -------------------------------------------------- |
| System / Increment | [What is being transferred]                        |
| Transfer date/time | YYYY-MM-DD HH:MM [TZ]                              |
| Accepting team     | [Team or role name]                                |
| Support tier       | [Minimal / Standard / Enterprise]                  |
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

**Product Manager:**

- Name: [PM Name]
- Date: YYYY-MM-DD
- Notes:

---

**Next Steps:**

1. Monitor production for next 24 hours
2. Track success criteria baselines vs. targets
3. Address any minor issues discovered
4. Hand off to Support stage

---

<!-- Template Last Updated: 2026-02-28 | Added in v0.7.0 -->
