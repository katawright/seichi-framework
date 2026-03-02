# Deployment Pipeline Checklist

**Purpose:** Quick verification that deployment infrastructure is ready before
your first increment deployment or after major infrastructure changes.

**Usage:** Complete the relevant section (greenfield or brownfield) during
Increment 0. For per-increment deployment readiness, use the
[Deployment Checklist](checklist.md) instead.

For detailed setup guidance, see the [Deployment Setup Guide](setup.md).

---

> Items marked **[H]** require human judgment. Other items can be verified or
> assisted by AI.

> Not every item applies at every scale — mark items N/A with justification when
> they don't fit your project's risk tier. See
> [Right-Sizing Guide](../../guides/right-sizing.md).

## Greenfield: New Infrastructure

1. [ ] **CI/CD pipeline operational** (build, test, package, deploy stages
       working)
2. [ ] **All environments provisioned** (dev, staging, production at minimum)
3. [ ] **Infrastructure as Code set up and version-controlled** (Terraform,
       CloudFormation, or equivalent)
4. [ ] **Environment parity validated** (staging matches production
       architecture)
5. [ ] **Secrets management configured** (no secrets in code or config files)
6. [ ] **Configuration externalized per environment** (environment-specific
       values)
7. [ ] **Monitoring and alerting operational** (APM, logs, dashboards, alerts)
8. [ ] **[H] On-call rotation and escalation path defined** (contacts and
       procedures documented)
9. [ ] **Skeleton application deployed end-to-end through pipeline** (walking
       skeleton validated)
10. [ ] **Rollback procedure tested successfully** (previous version restored
        and verified)
11. [ ] **Deployment scripts idempotent** (safe to re-run without side effects)
12. [ ] **Pipeline stages documented for team reference** (runbook or wiki)

**Gate:** All items checked → ready for first increment deployment.

---

## Brownfield: Existing Infrastructure

1. [ ] **Current deployment process documented end-to-end** (no undocumented
       steps)
2. [ ] **All environments inventoried** (with access and configuration details)
3. [ ] **Manual steps identified and documented** (automation candidates
       flagged)
4. [ ] **[H] Tribal knowledge captured from experienced team members**
       (workarounds and gotchas recorded)
5. [ ] **Secrets management practices reviewed** (no secrets in code, rotation
       policies checked)
6. [ ] **Monitoring coverage assessed** (gaps identified and prioritized)
7. [ ] **Gap analysis completed against greenfield checklist** (improvement
       areas identified)
8. [ ] **High-priority improvements addressed** (critical gaps resolved)
9. [ ] **Improvement backlog created and prioritized** (lower-priority items
       tracked)
10. [ ] **Rollback capability verified** (tested or documented)

**Gate:** Process documented and critical gaps addressed → ready for first
increment deployment.

---

## Related Documents

- [Deployment Setup Guide](setup.md)
- [Deployment Stage Guide](README.md)
- [Deployment Checklist](checklist.md)
- [Deployment Reference](reference.md)

---

## Notes

**Last Updated:** 2026-02-28

Added to framework in v0.12.0.
