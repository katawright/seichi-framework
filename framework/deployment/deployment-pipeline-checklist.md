# Deployment Pipeline Checklist

**Purpose:** Quick verification that deployment infrastructure is ready before
your first increment deployment or after major infrastructure changes.

**Usage:** Complete the relevant section (greenfield or brownfield) during
iteration 0. For per-increment deployment readiness, use the
[Deployment Checklist](deployment-checklist.md) instead.

For detailed setup guidance, see the
[Deployment Planning Guide](deployment-planning-guide.md).

---

## Greenfield: New Infrastructure

- [ ] CI/CD pipeline operational (build, test, package, deploy)
- [ ] All environments provisioned (dev, staging, production at minimum)
- [ ] Infrastructure as Code set up and version-controlled
- [ ] Environment parity validated (staging matches production architecture)
- [ ] Secrets management configured (no secrets in code or config files)
- [ ] Configuration externalized per environment
- [ ] Monitoring and alerting operational
- [ ] On-call rotation and escalation path defined
- [ ] Skeleton application deployed end-to-end through pipeline
- [ ] Rollback procedure tested successfully
- [ ] Deployment scripts idempotent (safe to re-run)
- [ ] Pipeline stages documented for team reference

**Gate:** All items checked → Ready for first increment deployment

---

## Brownfield: Existing Infrastructure

- [ ] Current deployment process documented end-to-end
- [ ] All environments inventoried with access and configuration details
- [ ] Manual steps identified and documented
- [ ] Tribal knowledge captured from experienced team members
- [ ] Secrets management practices reviewed
- [ ] Monitoring coverage assessed
- [ ] Gap analysis completed against greenfield checklist
- [ ] High-priority improvements addressed
- [ ] Improvement backlog created and prioritized
- [ ] Rollback capability verified

**Gate:** Process documented and critical gaps addressed → Ready for first
increment deployment

---

> **AI suggestion:** _"Walk me through this checklist for [describe your
> project and infrastructure] and flag any items that need extra attention."_

---

**Last Updated:** 2026-02-19

_Added to framework in v0.12.0_
