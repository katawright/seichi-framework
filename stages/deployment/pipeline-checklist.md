# Deployment Pipeline Checklist

**Purpose:** Quick verification that deployment infrastructure is ready before
your first increment deployment or after major infrastructure changes.

**Usage:** Complete the relevant section (greenfield or brownfield) during
Increment 0. For per-increment deployment readiness, use the
[Deployment Checklist](checklist.md) instead.

For detailed setup guidance, see the [Deployment Setup Guide](setup.md).

---

> **Markers.** _Unmarked_ — mechanical; an agent verifies directly. **[J]** —
> needs judgment, but whether a human, a delegated agent, or pre-authorized
> policy provides it is an operating-model choice. **[H]** — the non-delegable
> floor: **human-owned** regardless of operating model, discharged either
> interactively **or** by pre-authorized policy, never a delegated agent
> (interactive-only at Critical). The marker says only _whether an agent may
> discharge the item_; whether an **[H]** item clears interactively or by policy
> is resolved per project by the consequence + compliance floor (see the
> [Operating Model Guide](../../guides/operating-model.md)), not by the marker.

> Not every item applies at every scale — mark items N/A with justification when
> they don't fit your project's tier. See
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
8. [ ] **[J] On-call rotation and escalation path defined** (contacts and
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
4. [ ] **[J] Tribal knowledge captured and documented** (workarounds and gotchas
       documented for whoever maintains the system)
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
- [Seichi Framework Stages](../../guides/stages.md)

---

## Notes

**Last Updated:** 2026-07-05

Added to framework in v0.12.0.
