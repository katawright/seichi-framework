# Deployment Checklist

**Purpose:** Pre-handoff readiness review for deployment execution and
successful completion (60-90 seconds).

**Usage:** Review before, during, and after deployment.

---

> Items marked **[H]** require human judgment. Other items can be verified or
> assisted by AI.

> **AI-Led mode:** AI completes the full checklist and presents results to the
> human reviewer. Humans review all items and confirm **[H]** items, which
> require human judgment that AI cannot substitute for. **During interactive
> stage execution, raise [H] items as they arise rather than batching them at
> the end.**

> Not every item applies at every scale — mark items N/A with justification when
> they don't fit your project's risk tier. See
> [Right-Sizing Guide](../../guides/right-sizing.md).

---

## Release Disposition

> **Decide this first.** Every increment has a Deployment slot, but a production
> release is an elective action — see
> [Release Disposition](README.md#release-disposition).

1. [ ] **[H] Release disposition decided and recorded** — this increment's
       Deployment slot resolves as **Released** or **Deferred**; the disposition
       and its rationale are recorded in the deployment brief's Release Details
       section and a
       [Checkpoint Decision](../../templates/checkpoint-decision.md)

> **If Deferred:** the increment was verified (and, where applicable, staged),
> but its production release rolls into a later increment. Record the deferral
> rationale and integration-risk note. The remaining sections of this checklist
> do not apply to this increment — record them as deferred, not failed. Still
> run the increment [Retrospective](../../templates/retrospective.md), which
> triages the project friction log.
>
> **If Released:** continue with Pre-Deployment Readiness below.

**Gate:** Disposition recorded → if Released, proceed; if Deferred, stop here.

---

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
       version; consult [Architect per RACI](../../guides/roles.md#raci-matrix)
       on infrastructure plan conformance)
8. [ ] **Monitoring dashboards and alerting configured** (thresholds set)
9. [ ] **Success criteria instrumentation verified** (Verification tested it
       works; confirm it will be active in production)
10. [ ] **Security pre-deployment checks passed** (no new critical CVEs since
        last scan, SBOM generated, artifact integrity verified; consult
        [AppSec per RACI](../../guides/roles.md#raci-matrix))
11. [ ] **[H] Configuration and secrets reviewed** (no secrets in code, values
        correct per environment)
12. [ ] **[H] Stakeholders notified of deployment schedule** (timeline and
        expected impact communicated)
13. [ ] **Deployment team available and on communication channel** (on-call
        confirmed)
14. [ ] **[H] Cross-repo deployment ordering confirmed** (N/A for single-repo
        projects; multi-repo: verify deployment sequence, per-service validation
        gates, and rollback ordering)
15. [ ] **Database migration steps documented separately from application
        deployment** (DBA coordination confirmed if applicable; rollback scripts
        tested in staging; heterogeneous rollback timelines documented per
        component; N/A for non-database changes)
16. [ ] **Migration scripts reviewed for security** (no privilege escalation via
        CREATE USER or GRANT; rollback scripts reviewed for destructive
        operations; migration credentials separate from application credentials;
        N/A for non-database changes)

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

> When the same role owns both Deployment and Support, apply this section as a
> self-review rather than a cross-team transfer.

1. [ ] **[H] Support team briefed on deployment outcome** (walkthrough
       completed)
2. [ ] **[H] Known issues and workarounds documented** (shared with support
       team)
3. [ ] **Production monitoring access verified** (support team has dashboard
       access)
4. [ ] **Support runbook created or updated** (reflects current deployment)
5. [ ] **[H] On-call rotation and escalation path updated** (contacts current)
6. [ ] **First-week monitoring schedule defined** (observation cadence agreed)
7. [ ] **[H] Support team confirms receipt of all Support stage inputs**
       (deployed system, monitoring dashboards, updated runbooks, incident
       response procedures, rollback procedure, baseline measurements, release
       notes, success criteria register) — confirm by having the support contact
       verify access to each artifact and sign off in the deployment brief or
       checkpoint decision
8. [ ] **[H] Increment retrospective completed or scheduled** (run the
       [Retrospective Template](../../templates/retrospective.md) now or
       schedule within one week; triage friction-log entries; log carry-forward
       items for next Increment Design)
9. [ ] **All required stage outputs produced** (deployment brief, deployment
       log, release notes, updated runbooks — verify against stage README front
       matter)

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

<!-- prettier-ignore -->
> **AI suggestion:** _"Walk me through this deployment checklist for my project and flag items needing attention."_

---

## Related Documents

- [Deployment Brief Template](../../templates/deployment-brief.md)
- [Deployment Stage Guide](README.md)
- [Deployment Reference](reference.md)
- [Deployment Pipeline Checklist](pipeline-checklist.md)
- [AI-Assisted SDLC Stages](../../guides/stages.md)

---

## Notes

**Last Updated:** 2026-05-18

Added to framework in v0.7.0. Database migration and migration security items
added in v0.42.0. Release Disposition section added in v0.45.0.
