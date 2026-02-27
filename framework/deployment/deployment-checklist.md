# Deployment Checklist

**Purpose:** Pre-handoff readiness review for deployment execution and
successful completion.

**Usage:** Review before, during, and after deployment.

---

> Items marked **[H]** require human judgment. Other items can be verified or
> assisted by AI.

## Pre-Deployment Readiness

> This section confirms Verification stage outputs are complete. It does not
> repeat testing — it verifies that testing was done and results are acceptable.

- [ ] All Verification stage tests passing
- [ ] **[H]** UAT sign-off obtained from business stakeholders
- [ ] **[H]** Known issues reviewed and accepted
- [ ] Deployment strategy selected and steps documented
- [ ] Rollback procedure documented and tested
- [ ] Environment health verified and backups completed
- [ ] Infrastructure capacity validated
- [ ] Monitoring dashboards and alerting configured
- [ ] Success criteria instrumentation verified (Verification tested it works;
      confirm it will be active in production)
- [ ] **[H]** Configuration and secrets reviewed
- [ ] **[H]** Stakeholders notified of deployment schedule
- [ ] Deployment team available and on communication channel

**Gate:** All items checked → Proceed to deployment

---

## Deployment Execution

- [ ] Deployment package version and checksum validated
- [ ] Data and state changes applied (if applicable)
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

- [ ] **[H]** Support team briefed on deployment outcome
- [ ] **[H]** Known issues and workarounds documented
- [ ] Production monitoring access verified
- [ ] Support runbook created or updated
- [ ] **[H]** On-call rotation and escalation path updated
- [ ] First-week monitoring schedule defined

**Gate:** Support team ready to own production system

---

## Sign-Off

- [ ] **[H]** Deployment engineer signs off on success
- [ ] **[H]** DevOps lead reviews and approves outcome
- [ ] **[H]** Product manager acknowledges completion
- [ ] 24-hour monitoring plan clear
- [ ] Follow-up issues logged in backlog

**Final Gate:** All sign-offs obtained → Hand off to Support stage. Record the
deployment decision using the
[Checkpoint Decision Template](../templates/checkpoint-decision-template.md).

---

> For decision trees, red flags, strategy-specific checklists, and detailed
> procedures, see the [Deployment Reference](deployment-reference.md).

> **AI suggestion:** _"Walk me through this checklist for [describe your
> deployment] and flag any items that need extra attention."_

---

**Last Updated:** 2026-02-21

_Added to framework in v0.7.0_
