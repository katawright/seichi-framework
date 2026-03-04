# Deployment Checklist

**Purpose:** Pre-handoff readiness review for deployment execution and
successful completion.

**Usage:** Review before, during, and after deployment.

---

> Items marked **[H]** require human judgment. Other items can be verified or
> assisted by AI.

> Not every item applies at every scale — mark items N/A with justification when
> they don't fit your project's risk tier. See
> [Right-Sizing Guide](../../guides/right-sizing.md).

## Pre-Deployment Readiness

> This section confirms Verification stage outputs are complete. It does not
> repeat testing — it verifies that testing was done and results are acceptable.

1. [ ] **All Verification stage tests passing** (unit, integration, and
       end-to-end)
2. [ ] **[H] UAT sign-off obtained** (from business stakeholders)
3. [ ] **[H] Known issues reviewed and accepted** (documented with workarounds)
4. [ ] **Deployment strategy selected and steps documented** (in deployment
       brief)
5. [ ] **Rollback procedure documented and tested** (verified in staging)
6. [ ] **Environment health verified and backups completed** (pre-deployment
       baseline)
7. [ ] **Infrastructure capacity validated** (resources sufficient for new
       version)
8. [ ] **Monitoring dashboards and alerting configured** (thresholds set)
9. [ ] **Success criteria instrumentation verified** (Verification tested it
       works; confirm it will be active in production)
10. [ ] **Security pre-deployment checks passed** (no new critical CVEs since
        last scan, SBOM generated, artifact integrity verified)
11. [ ] **[H] Configuration and secrets reviewed** (no secrets in code, values
        correct per environment)
12. [ ] **[H] Stakeholders notified of deployment schedule** (timeline and
        expected impact communicated)
13. [ ] **Deployment team available and on communication channel** (on-call
        confirmed)

**Gate:** All items checked → proceed to deployment.

---

## Deployment Execution

1. [ ] **Deployment package validated** (version and checksum match)
2. [ ] **Database backup or snapshot taken** — backup identifier recorded in
       deployment brief (e.g., snapshot name, timestamp, or storage path; N/A if
       no data or state changes)
3. [ ] **Data and state changes applied** (migrations, cache invalidation — if
       applicable)
4. [ ] **Each deployment phase completed and validated** (per chosen strategy)
5. [ ] **Application deployed and health checks passing** (all instances
       healthy)
6. [ ] **Configuration and secrets applied correctly** (environment variables
       verified)
7. [ ] **Traffic routed to new version** (load balancer updated — if applicable)

**Gate:** All steps completed → validate production.

---

## Post-Deployment Validation

1. [ ] **Smoke tests executed and passed** (automated + critical paths)
2. [ ] **Error rates at baseline levels** (<1% or within acceptable range)
3. [ ] **Response times within acceptable range** (p95 within threshold)
4. [ ] **All instances/services running and healthy** (no restarts or crashes)
5. [ ] **No critical or warning alerts firing** (dashboards green)
6. [ ] **Success criteria instrumentation working** (metrics flowing to
       dashboards)
7. [ ] **Baseline measurements captured** (for post-deployment comparison)

**Gate:** All checks passing → monitor and stabilize.

---

## Handoff to Support

1. [ ] **[H] Support team briefed on deployment outcome** (walkthrough
       completed)
2. [ ] **[H] Known issues and workarounds documented** (shared with support
       team)
3. [ ] **Production monitoring access verified** (support team has dashboard
       access)
4. [ ] **Support runbook created or updated** (reflects current deployment)
5. [ ] **[H] On-call rotation and escalation path updated** (contacts current)
6. [ ] **First-week monitoring schedule defined** (observation cadence agreed)

**Gate:** Support team ready to own production system.

---

## Final Decision

**Readiness summary:**

- [ ] All checklist sections above are complete
- [ ] **[H] Deployment engineer signs off on success** (technical validation
      complete)
- [ ] **[H] DevOps lead reviews and approves outcome** (operational readiness
      confirmed)
- [ ] **[H] Project manager confirms release coordination complete** (schedule,
      dependencies, and stakeholder communication verified)
- [ ] **[H] Product manager acknowledges completion** (business acceptance)
- [ ] **24-hour monitoring plan clear** (assigned owner and schedule)
- [ ] **Follow-up issues logged in backlog** (nothing lost)

**Decision:** Ready / Not Ready

**If Ready:** Hand off to Support stage. Record the deployment decision using
the [Checkpoint Decision Template](../../templates/checkpoint-decision.md).

**If Not Ready:** Document blocking items, resolve, and re-run this checklist.

---

## Related Documents

- [Deployment Brief Template](../../templates/deployment-brief.md)
- [Deployment Stage Guide](README.md)
- [Deployment Reference](reference.md)
- [Deployment Pipeline Checklist](pipeline-checklist.md)
- [AI-Assisted SDLC Stages](../../guides/stages.md)

---

## Notes

**Last Updated:** 2026-03-04

Added to framework in v0.7.0.
