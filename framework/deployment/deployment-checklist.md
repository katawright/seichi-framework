# Deployment Checklist

**Purpose:** Quick verification (60-90 seconds) that deployment is ready to
execute and has completed successfully.

**Usage:** Review before, during, and after deployment to ensure quality gates
are met.

---

## Section 1: Pre-Deployment Readiness (Before Starting)

### Verification Readiness

- [ ] All Verification stage tests passing (unit, integration, E2E)
- [ ] UAT sign-off obtained from business stakeholders
- [ ] Production readiness checklist from Verification stage complete
- [ ] Known issues reviewed and accepted by stakeholders

### Deployment Planning

- [ ] Deployment strategy selected and documented (blue/green, canary, rolling,
      feature flag)
- [ ] Deployment steps documented with expected results and validation
- [ ] Deployment risks assessed and mitigation plans in place
- [ ] Deployment window scheduled (if applicable) and communicated

### Environment Preparation

- [ ] Production environment health verified (infrastructure, database, services
      running)
- [ ] Database backups completed and verified (restoration tested)
- [ ] Rollback procedure documented and tested in non-production environment
- [ ] Infrastructure capacity validated (can handle expected load + headroom)

### Monitoring and Alerting

- [ ] Production monitoring dashboards configured and accessible
- [ ] Alerting rules defined, tested, and active
- [ ] Success criteria instrumentation verified in staging/pre-prod
- [ ] Error tracking configured (Sentry, Rollbar, etc.)

### Communication

- [ ] Stakeholders notified of deployment schedule and expected impact
- [ ] Support team briefed on new functionality and known issues
- [ ] Deployment team available (engineer, on-call, stakeholders)
- [ ] Communication channels ready (Slack, email, status page)

### Configuration and Secrets

- [ ] Environment-specific configuration reviewed and validated
- [ ] Secrets added to secret manager (not hardcoded)
- [ ] Configuration changes documented in deployment brief
- [ ] Feature flags configured (if using feature flag deployment)

**🚦 Quality Gate:** All items checked → Proceed to deployment **❌ Red Flags:**
UAT not signed off, no rollback plan, monitoring not configured

---

## Section 2: Deployment Package Validation

### Artifact Verification

- [ ] Deployment package version matches planned release
- [ ] Package checksum/hash validated against CI/CD build
- [ ] Git commit/tag verified in version control
- [ ] Dependencies and libraries included in package (no runtime downloads)

### Database Migrations (if applicable)

- [ ] Migration scripts tested in staging with production-like data
- [ ] Migration rollback scripts tested and validated
- [ ] Migration performance impact assessed (duration, locks, downtime)
- [ ] Data backup completed before migration execution

**🚦 Quality Gate:** All items checked → Package ready for deployment **❌ Red
Flags:** Version mismatch, untested migrations, checksum failure

---

## Section 3: Deployment Execution

### Pre-Execution Checks

- [ ] Deployment plan reviewed one final time
- [ ] Team ready and on communication channel
- [ ] Deployment window started (if scheduled downtime)
- [ ] Production traffic baseline captured (for comparison)

### Deployment Process

- [ ] Each deployment phase completed successfully
- [ ] Phase validation performed before proceeding to next phase
- [ ] Database migrations applied successfully (if applicable)
- [ ] Application deployed and health checks passing
- [ ] Configuration and secrets applied correctly

### Traffic Management (if applicable)

- [ ] Traffic switched to new version (blue/green) or routed incrementally
      (canary)
- [ ] Load balancer routing verified
- [ ] User traffic flowing to intended version

**🚦 Quality Gate:** All deployment steps completed successfully **❌ Red
Flags:** Health checks failing, migration errors, traffic routing issues

---

## Section 4: Post-Deployment Validation

### Smoke Tests

- [ ] Automated smoke tests executed and passed
- [ ] Critical user paths manually verified (login, core features)
- [ ] API health checks returning expected responses
- [ ] Integration points with external systems working

### Production Health

- [ ] All instances/pods/services running and healthy
- [ ] Error rates at baseline levels (<1-2%)
- [ ] Response times within acceptable range (p95 < target)
- [ ] Database connections established and performant
- [ ] Application logs show normal operation (no unexpected errors)

### Monitoring Validation

- [ ] Production dashboards showing healthy metrics
- [ ] No critical or warning alerts firing
- [ ] Success criteria instrumentation working (metrics appearing in dashboards)
- [ ] Error tracking showing no new critical issues

### Baseline Measurements

- [ ] Success criteria baseline captured (pre-deployment state for comparison)
- [ ] Measurement method documented (how to track progress)
- [ ] Dashboard or report links documented for Support team
- [ ] Next measurement schedule defined

**🚦 Quality Gate:** All validation checks passing → Deployment successful **❌
Red Flags:** Smoke tests failing, error rate spike, critical alerts,
instrumentation broken

---

## Section 5: Rollback Readiness

### Rollback Trigger Assessment

**Review these conditions - if ANY are true, consider rollback:**

- [ ] Critical bug discovered (functionality broken, blocking users)
- [ ] Error rate >5% sustained for >5 minutes
- [ ] Response time degradation >2x baseline
- [ ] Data corruption or integrity issues detected
- [ ] Security vulnerability discovered in production
- [ ] Third-party dependency failure (external API unavailable)

### Rollback Procedure

- [ ] Rollback decision authority identified (who can authorize rollback)
- [ ] Rollback steps documented and tested
- [ ] Rollback duration estimated (< X minutes)
- [ ] Data loss risk assessed and accepted (if applicable)
- [ ] Team ready to execute rollback if needed

**🚦 Decision Point:** If any rollback trigger is true → Execute rollback
procedure **✅ If Stable:** No rollback needed → Continue monitoring

---

## Section 6: Monitoring and Stabilization

### Active Monitoring (First 2 Hours)

- [ ] Deployment engineer actively monitoring dashboards
- [ ] Dashboards checked every 15 minutes
- [ ] Error logs reviewed for anomalies
- [ ] On-call engineer on standby
- [ ] No critical issues detected

### Stabilization Period (First 24 Hours)

- [ ] Dashboard reviews every 2 hours
- [ ] Error rates remain at baseline
- [ ] Performance metrics stable
- [ ] No user-reported issues or escalations
- [ ] Success criteria metrics showing expected trend

**🚦 Quality Gate:** 24 hours stable → Deployment considered successful **❌ Red
Flags:** Increasing error rates, user reports of issues, metric anomalies

---

## Section 7: Communication

### Deployment Notifications

- [ ] Pre-deployment notification sent to stakeholders
- [ ] Deployment start notification sent
- [ ] Status updates provided during deployment (if multi-phase or long
      duration)
- [ ] Deployment completion notification sent

### Completion Communication

- [ ] Deployment status communicated (success / partial / rolled back)
- [ ] New features or changes summarized
- [ ] Known issues documented and shared
- [ ] Support contact information provided
- [ ] Release notes or documentation links shared

**🚦 Quality Gate:** All stakeholders informed of deployment outcome **❌ Red
Flags:** Stakeholders unaware of deployment or rollback

---

## Section 8: Documentation

### Deployment Brief

- [ ] Deployment brief template filled out
- [ ] Deployment timeline logged (phases, durations, issues)
- [ ] Issues encountered documented with resolutions
- [ ] Rollback execution documented (if rolled back)
- [ ] Success criteria baseline measurements recorded

### Support Handoff Documentation

- [ ] Support runbook created or updated
- [ ] Known issues documented with workarounds
- [ ] Production access details provided to Support team
- [ ] Monitoring dashboard links shared
- [ ] Escalation contacts updated

**🚦 Quality Gate:** Documentation complete and accessible **❌ Red Flags:**
Deployment undocumented, Support team unprepared

---

## Section 9: Production Access and Security

### Access Control

- [ ] Support team granted necessary production access
- [ ] Access permissions follow principle of least privilege
- [ ] Production credentials stored in secure location (password manager, vault)
- [ ] Admin/privileged access properly secured

### Security Validation

- [ ] No secrets or credentials exposed in logs or error messages
- [ ] Authentication and authorization working correctly
- [ ] Security headers configured (CSP, HSTS, etc.)
- [ ] SSL/TLS certificates valid and properly configured
- [ ] No new security vulnerabilities introduced (verified in Verification
      stage)

**🚦 Quality Gate:** Security controls verified and access properly managed **❌
Red Flags:** Exposed secrets, auth bypasses, security misconfigurations

---

## Section 10: Database and Data Integrity

### Database Health (if migrations applied)

- [ ] Database schema version correct
- [ ] Migration completed without errors
- [ ] Data integrity checks passed (foreign keys, constraints)
- [ ] Database performance metrics normal (query time, connection pool)
- [ ] Indexes created successfully (if applicable)

### Data Validation

- [ ] No data loss detected
- [ ] Data transformations applied correctly (if applicable)
- [ ] Foreign key relationships intact
- [ ] Critical data spot-checked for correctness

**🚦 Quality Gate:** Database healthy and data integrity verified **❌ Red
Flags:** Missing data, schema corruption, performance degradation

---

## Section 11: Handoff to Support Stage

### Support Readiness

- [ ] Support team briefed on deployment outcome
- [ ] Success criteria tracking approach explained
- [ ] Known issues and workarounds documented
- [ ] Production monitoring access verified
- [ ] On-call rotation updated (if applicable)
- [ ] Escalation path clear (who to contact for deployment-related issues)

### Ongoing Monitoring Plan

- [ ] First-week monitoring schedule defined
- [ ] Success criteria check-in schedule established (when to measure progress)
- [ ] Issue triage process agreed upon (who handles production bugs)
- [ ] Enhancement backlog reviewed (what improvements are planned)

**🚦 Quality Gate:** Support team ready to own production system **❌ Red
Flags:** Support unprepared, monitoring not configured, unclear ownership

---

## Section 12: Sign-Off

### Approval and Acknowledgment

- [ ] Deployment engineer signs off on successful deployment
- [ ] DevOps lead reviews and approves deployment outcome
- [ ] Product manager acknowledges deployment completion
- [ ] Support team accepts handoff

### Next Steps Identified

- [ ] Next 24-hour monitoring plan clear
- [ ] Success criteria tracking schedule defined
- [ ] Any follow-up issues logged in backlog
- [ ] Retrospective scheduled (if issues encountered)

**🚦 Final Gate:** All sign-offs obtained → Hand off to Support stage **❌ Red
Flags:** Missing approvals, unclear next steps

---

## Quick Decision Tree

**Before deployment:**

```
All Pre-Deployment items checked?
  → Yes: Proceed to deployment
  → No: Stop and address gaps
```

**During deployment:**

```
Each phase completed successfully?
  → Yes: Proceed to next phase
  → No: Stop and troubleshoot or roll back
```

**After deployment:**

```
All Post-Deployment validation passed?
  → Yes: Monitor and stabilize
  → No: Assess if rollback needed

Any rollback triggers present?
  → Yes: Execute rollback immediately
  → No: Continue monitoring

Stable for 24 hours?
  → Yes: Deployment successful, hand off to Support
  → No: Continue monitoring and troubleshooting
```

---

## Common Red Flags (Stop and Address)

### Pre-Deployment

- ❌ UAT not signed off or stakeholder approval missing
- ❌ Rollback procedure not documented or tested
- ❌ Database migrations not tested in staging
- ❌ Monitoring or alerting not configured
- ❌ No deployment plan or unclear steps
- ❌ Team not available or on-call engineer not identified

### During Deployment

- ❌ Health checks failing after deployment
- ❌ Database migration errors or timeouts
- ❌ Configuration errors causing application crashes
- ❌ Traffic not routing correctly to new version
- ❌ Critical alerts firing immediately after deployment

### Post-Deployment

- ❌ Error rate >5% sustained
- ❌ Response time >2x baseline
- ❌ Critical user paths broken (login, checkout, etc.)
- ❌ Data corruption or integrity issues
- ❌ Security vulnerability discovered
- ❌ Success criteria instrumentation not working

**Action:** If any red flag present, STOP and address immediately. Consider
rollback if critical.

---

## Appendix: Deployment Strategy Quick Reference

### Blue/Green Deployment Checklist

- [ ] Blue and Green environments identical
- [ ] Deploy to inactive environment (Green)
- [ ] Validate Green environment thoroughly
- [ ] Switch traffic from Blue to Green
- [ ] Keep Blue running as rollback option for 24-48 hours

### Canary Deployment Checklist

- [ ] Deploy to canary subset (5-10% of instances/users)
- [ ] Monitor canary metrics for 15-30 minutes
- [ ] Gradually increase canary percentage (25% → 50% → 100%)
- [ ] Roll back if canary shows issues

### Rolling Deployment Checklist

- [ ] Update instances/pods one at a time or in small batches
- [ ] Validate each batch before proceeding
- [ ] Monitor for issues after each batch
- [ ] Continue until all instances updated

### Feature Flag Deployment Checklist

- [ ] Deploy code with features disabled
- [ ] Validate deployment successful
- [ ] Enable features for internal users first
- [ ] Gradually roll out to users (percentage-based or user segments)
- [ ] Toggle features on/off without redeployment

---

**Last Updated:** 2026-02-14

_Added to framework in v0.7.0_
