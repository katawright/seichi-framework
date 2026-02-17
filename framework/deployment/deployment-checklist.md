# Deployment Checklist

**Purpose:** Quick verification (60-90 seconds) that deployment is ready,
executing correctly, and completed successfully.

**Usage:** Review before, during, and after deployment.

---

## Pre-Deployment Readiness

- [ ] All Verification stage tests passing
- [ ] UAT sign-off obtained from business stakeholders
- [ ] Known issues reviewed and accepted
- [ ] Deployment strategy selected and steps documented
- [ ] Rollback procedure documented and tested
- [ ] Environment health verified and backups completed
- [ ] Infrastructure capacity validated
- [ ] Monitoring dashboards and alerting configured
- [ ] Success criteria instrumentation verified
- [ ] Configuration and secrets reviewed
- [ ] Stakeholders notified of deployment schedule
- [ ] Deployment team available and on communication channel

**Gate:** All items checked → Proceed to deployment

---

## Deployment Execution

- [ ] Deployment package version and checksum validated
- [ ] Database migrations applied successfully (if applicable)
- [ ] Each deployment phase completed and validated
- [ ] Application deployed and health checks passing
- [ ] Configuration and secrets applied correctly
- [ ] Traffic routed to new version (if applicable)

**Gate:** All steps completed → Validate production

---

## Post-Deployment Validation

- [ ] Smoke tests executed and passed (automated + critical paths)
- [ ] Error rates at baseline levels
- [ ] Response times within acceptable range
- [ ] All instances/services running and healthy
- [ ] No critical or warning alerts firing
- [ ] Success criteria instrumentation working
- [ ] Baseline measurements captured

**Gate:** All checks passing → Monitor and stabilize

---

## Handoff to Support

- [ ] Support team briefed on deployment outcome
- [ ] Known issues and workarounds documented
- [ ] Production monitoring access verified
- [ ] Support runbook created or updated
- [ ] On-call rotation and escalation path updated
- [ ] First-week monitoring schedule defined

**Gate:** Support team ready to own production system

---

## Sign-Off

- [ ] Deployment engineer signs off on success
- [ ] DevOps lead reviews and approves outcome
- [ ] Product manager acknowledges completion
- [ ] 24-hour monitoring plan clear
- [ ] Follow-up issues logged in backlog

**Final Gate:** All sign-offs obtained → Hand off to Support stage

---

> For decision trees, red flags, strategy-specific checklists, and detailed
> procedures, see the [Deployment Reference](deployment-reference.md).

> **AI suggestion:** _"Walk me through this checklist for [describe your
> deployment] and flag any items that need extra attention."_

---

**Last Updated:** 2026-02-16

_Added to framework in v0.7.0_
