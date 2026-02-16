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

### Version Information

- **Release Version:** [e.g., v1.2.0, 2024-02-12-hotfix, sprint-23-release]
- **Previous Version:** [Currently deployed version]
- **Build/Package ID:** [CI/CD build number or artifact identifier]
- **Git Commit/Tag:** [Commit hash or release tag]
- **Branch:** [e.g., main, release/1.2.0]

### Deployment Strategy

**Selected Strategy:** [Blue/Green / Canary / Rolling / Feature Flag / Big Bang]

**Rationale:** [Why this strategy was chosen - risk level, rollback needs,
traffic patterns, etc.]

**Deployment Approach:**

- [Describe specific approach, e.g., "Deploy to Green environment, run smoke
  tests, switch traffic"]
- [Include phases if multi-stage, e.g., "Canary: 5% → 25% → 50% → 100%"]
- [Specify timing between phases, e.g., "Monitor each canary phase for 30
  minutes"]

### Target Environments

- **Environment:** [Production / Staging / Pre-Prod]
- **Region(s):** [e.g., US-East, US-West, EU-Central, Global]
- **Infrastructure:** [e.g., AWS ECS, Kubernetes cluster, VM fleet]
- **Database:** [e.g., PostgreSQL RDS, MongoDB Atlas cluster]

---

## Pre-Deployment Checklist

### Deployment Readiness

- [ ] Deployment plan reviewed and approved by [Lead/Manager]
- [ ] Deployment package validated (version, completeness)
- [ ] All Verification stage tests passing
- [ ] UAT sign-off obtained from business stakeholders
- [ ] Known issues reviewed and accepted
- [ ] Deployment window scheduled (if applicable)
- [ ] Team availability confirmed (engineer, on-call, stakeholders)

### Environment Preparation

- [ ] Production environment health verified
- [ ] Database backups completed and verified
- [ ] Rollback procedure documented and tested
- [ ] Configuration and secrets reviewed
- [ ] Infrastructure capacity validated (can handle expected load)
- [ ] Third-party dependencies checked (APIs available, rate limits OK)

### Monitoring and Observability

- [ ] Production monitoring dashboards configured
- [ ] Alerting rules defined and tested
- [ ] Logging enabled and validated
- [ ] Success criteria instrumentation verified
- [ ] Error tracking configured (e.g., Sentry, Rollbar)

### Communication

- [ ] Stakeholders notified of deployment schedule
- [ ] Support team briefed on new functionality
- [ ] Incident response team on standby (if high-risk deployment)
- [ ] Communication channels ready (Slack, email, status page)

---

## Deployment Steps

### Phase 1: [Phase Name, e.g., "Pre-Deployment"]

**Estimated Duration:** [X minutes] **Responsible:** [Role/Name]

**Steps:**

1. [Specific action, e.g., "Verify deployment package checksum"]
   - Command/Action: [e.g., `sha256sum deployment.tar.gz`]
   - Expected Result: [e.g., "Checksum matches CI/CD build"]
   - Validation: [How to verify success]

2. [Specific action]
   - Command/Action:
   - Expected Result:
   - Validation:

**Rollback Point:** [Can rollback from this phase? Yes/No] **Quality Gate:**
[What must pass to proceed to next phase?]

### Phase 2: [Phase Name, e.g., "Database Migration"]

**Estimated Duration:** [X minutes] **Responsible:** [Role/Name]

**Steps:**

1. [Specific action, e.g., "Run database migration script"]
   - Command/Action: [e.g., `./migrate.sh up`]
   - Expected Result: [e.g., "Schema version updated to v1.2.0"]
   - Validation: [e.g., "Check schema_version table"]

2. [Specific action]
   - Command/Action:
   - Expected Result:
   - Validation:

**Rollback Point:** [Can rollback from this phase? Yes/No. If yes, describe
rollback steps] **Quality Gate:** [What must pass to proceed to next phase?]

### Phase 3: [Phase Name, e.g., "Application Deployment"]

**Estimated Duration:** [X minutes] **Responsible:** [Role/Name]

**Steps:**

1. [Specific action, e.g., "Deploy to Blue environment"]
   - Command/Action: [e.g., `kubectl apply -f deployment.yaml`]
   - Expected Result: [e.g., "All pods running, health checks passing"]
   - Validation: [e.g., `kubectl get pods -n production`]

2. [Specific action]
   - Command/Action:
   - Expected Result:
   - Validation:

**Rollback Point:** [Can rollback from this phase? Yes/No] **Quality Gate:**
[What must pass to proceed to next phase?]

### Phase 4: [Phase Name, e.g., "Traffic Switch"]

**Estimated Duration:** [X minutes] **Responsible:** [Role/Name]

**Steps:**

1. [Specific action, e.g., "Switch load balancer to Blue environment"]
   - Command/Action: [e.g., Update ALB target group]
   - Expected Result: [e.g., "100% traffic routed to new version"]
   - Validation: [e.g., Check ALB metrics, run smoke tests]

2. [Specific action]
   - Command/Action:
   - Expected Result:
   - Validation:

**Rollback Point:** [Can rollback from this phase? Yes/No] **Quality Gate:**
[What must pass to proceed to next phase?]

---

## Database Migrations (if applicable)

### Migration Summary

**Schema Changes:** [Yes / No] **Data Changes:** [Yes / No] **Migration Type:**
[Additive / Backward-Compatible / Breaking]

### Migration Details

**Migration Scripts:**

- `migrations/001_add_user_preferences.sql` - Add user_preferences table
- `migrations/002_update_indexes.sql` - Add index on user_id

**Migration Testing:**

- [ ] Tested in development environment
- [ ] Tested in staging with production-like data
- [ ] Rollback tested and validated
- [ ] Performance impact assessed (migration duration, table locks)

**Migration Execution Plan:**

1. [Step, e.g., "Take database backup"]
2. [Step, e.g., "Run migration script with dry-run flag"]
3. [Step, e.g., "Execute migration"]
4. [Step, e.g., "Verify migration success"]

**Rollback Plan:**

- Rollback script: `migrations/001_rollback.sql`
- Rollback duration: [Estimated time]
- Data loss risk: [None / Acceptable / Significant]

---

## Configuration Changes

### Environment Variables

| Variable            | Previous Value | New Value | Impact                   |
| ------------------- | -------------- | --------- | ------------------------ |
| `FEATURE_X_ENABLED` | `false`        | `true`    | Enables new feature X    |
| `API_TIMEOUT`       | `5000`         | `10000`   | Increases timeout to 10s |

### Configuration Files

| File                     | Changes                  | Reason                    |
| ------------------------ | ------------------------ | ------------------------- |
| `config/production.json` | Add `newFeature` section | New feature configuration |
| `.env.production`        | Add `NEW_API_KEY`        | Third-party integration   |

### Secrets Management

- [ ] New secrets added to secret manager (e.g., AWS Secrets Manager, HashiCorp
      Vault)
- [ ] Old secrets rotated (if applicable)
- [ ] Secret access permissions validated

---

## Rollback Procedure

### Rollback Triggers

Initiate rollback if any of these conditions occur:

- ❌ **Critical bug** - Functionality broken, blocking users
- ❌ **Performance degradation** - Response time >2x baseline, error rate >5%
- ❌ **Data corruption** - Data loss or integrity issues detected
- ❌ **Security vulnerability** - Production security issue discovered
- ❌ **Third-party dependency failure** - External API unavailable or broken

### Rollback Decision Authority

**Decision Maker:** [Name, Role] - Authority to initiate rollback **Escalation
Path:** [Who to contact if decision maker unavailable]

### Rollback Steps

#### Option 1: Traffic Switch (Fastest)

**Duration:** [X minutes] **Use When:** [Blue/Green or Canary deployment]

1. Switch load balancer back to previous version
   - Command: [e.g., Update ALB target group to Green]
   - Validation: [Check traffic metrics, verify users on old version]

2. Monitor rollback impact
   - Check error rates return to baseline
   - Verify functionality restored

3. Notify stakeholders of rollback

#### Option 2: Redeploy Previous Version

**Duration:** [X minutes] **Use When:** [Rolling deployment or no blue/green
available]

1. Deploy previous release package
   - Command: [e.g., `./deploy.sh v1.1.0`]
   - Validation: [Check deployment status]

2. Roll back database migrations (if applicable)
   - Command: [e.g., `./migrate.sh down`]
   - Validation: [Check schema version]

3. Restore configuration to previous state
   - Revert environment variables and config files

4. Validate rollback success
   - Run smoke tests
   - Check monitoring dashboards

5. Notify stakeholders of rollback

### Post-Rollback Actions

- [ ] Document rollback reason and timeline
- [ ] Preserve deployment logs and metrics for analysis
- [ ] Schedule retrospective to identify root cause
- [ ] Create action items to prevent recurrence
- [ ] Update deployment brief with rollback details

---

## Post-Deployment Validation

### Smoke Tests

**Purpose:** Verify core functionality works in production

**Critical Paths to Test:**

1. [Test case, e.g., "User login flow"]
   - Action: [Navigate to login page, enter credentials, submit]
   - Expected: [User logged in, redirected to dashboard]
   - Result: [✅ Passed / ❌ Failed]

2. [Test case, e.g., "API health check"]
   - Action: [Call /health endpoint]
   - Expected: [200 OK, healthy status]
   - Result: [✅ Passed / ❌ Failed]

3. [Test case]
   - Action:
   - Expected:
   - Result: [✅ Passed / ❌ Failed]

**Automated Smoke Tests:**

- Script/Command: [e.g., `npm run smoke-tests:production`]
- Results: [✅ All passed / ❌ X failures]
- Details: [Link to test results or summary]

### Production Health Checks

**Infrastructure:**

- [ ] All instances/pods running and healthy
- [ ] Load balancer routing traffic correctly
- [ ] Database connections established and performant
- [ ] Cache (Redis, Memcached) operational

**Application:**

- [ ] Application logs show normal operation (no errors/exceptions)
- [ ] API response times within acceptable range
- [ ] Error rates at baseline levels (<1%)
- [ ] Memory and CPU usage normal

**Integrations:**

- [ ] Third-party APIs responding normally
- [ ] Message queues processing messages
- [ ] Background jobs running on schedule
- [ ] Webhooks and callbacks working

### Monitoring Dashboards

**Key Metrics to Watch (First 24 Hours):**

- **Error Rate:** [Current: X%, Expected: <Y%]
- **Response Time (p95):** [Current: Xms, Expected: <Yms]
- **Throughput:** [Current: X req/s, Expected: Y-Z req/s]
- **CPU Usage:** [Current: X%, Expected: <Y%]
- **Memory Usage:** [Current: X%, Expected: <Y%]
- **Database Connections:** [Current: X, Expected: <Y]

**Dashboard Links:**

- Production dashboard: [URL]
- Error tracking: [URL]
- Infrastructure monitoring: [URL]

---

## Success Criteria Baseline Measurements

**Purpose:** Capture pre-deployment state to measure success criteria from
Initiation stage

### Baseline Data Captured

**Date/Time:** [YYYY-MM-DD HH:MM UTC]

**Success Criterion 1:** [From Initiation, e.g., "Increase conversion rate from
45% to 55%"]

- **Baseline Measurement:** [e.g., "Current conversion rate: 45.2%"]
- **Measurement Method:** [e.g., "Google Analytics funnel report"]
- **Dashboard/Report:** [Link to monitoring dashboard]
- **Next Measurement:** [When to check progress, e.g., "Weekly for 4 weeks"]

**Success Criterion 2:** [From Initiation, e.g., "Reduce page load time from
3.5s to 2.0s"]

- **Baseline Measurement:** [e.g., "Current p95 load time: 3.4s"]
- **Measurement Method:** [e.g., "New Relic RUM"]
- **Dashboard/Report:** [Link]
- **Next Measurement:** [When to check progress]

**Success Criterion 3:** [From Initiation]

- **Baseline Measurement:**
- **Measurement Method:**
- **Dashboard/Report:**
- **Next Measurement:**

### Instrumentation Validation

- [ ] Analytics events firing correctly in production
- [ ] Custom metrics appearing in monitoring dashboards
- [ ] Success criteria tracking automated (if possible)
- [ ] Alerts configured for metric thresholds

**Notes:** [Any issues with instrumentation or baseline measurement]

---

## Monitoring and Alerting

### Alert Configuration

**Critical Alerts (Immediate Response):**

- Error rate >5% for 5 minutes → Page on-call engineer
- Response time p95 >2000ms for 10 minutes → Page on-call engineer
- Database connection pool >90% for 5 minutes → Page on-call engineer

**Warning Alerts (Monitor Closely):**

- Error rate >2% for 10 minutes → Slack notification
- Response time p95 >1500ms for 15 minutes → Slack notification
- Memory usage >80% for 20 minutes → Slack notification

**Info Alerts (FYI):**

- Deployment completed successfully → Slack notification
- Background job queue backlog >100 → Slack notification

### Monitoring Schedule

**First 2 Hours (Critical Period):**

- Active monitoring by deployment engineer
- Check dashboards every 15 minutes
- On-call engineer on standby

**First 24 Hours (Stabilization Period):**

- Check dashboards every 2 hours
- Review error logs for anomalies
- Monitor success criteria metrics

**First Week (Observation Period):**

- Daily dashboard review
- Track success criteria progress
- Address any minor issues discovered

---

## Communication Plan

### Pre-Deployment Notifications

**Sent:** [Date/Time] **Recipients:** [Stakeholders, Support team, Users (if
applicable)] **Channel:** [Email / Slack / Status Page]

**Message:**

```
Subject: [Upcoming Deployment - Feature X - Feb 12, 2024]

We will be deploying Feature X to production on [Date] at [Time].

Expected impact: [None / Brief downtime / Degraded performance]
Duration: [X minutes]
New functionality: [Brief description]

We will send updates when deployment begins and completes.
```

### During Deployment Updates

**Status Update Frequency:** [Every 30 minutes, or as phases complete]
**Channel:** [Slack channel, Email thread]

**Update Template:**

```
Deployment Status: [In Progress / Completed / Issue Detected]
Phase: [X of Y]
Current Activity: [Brief description]
ETA: [Time]
Issues: [None / Description]
```

### Post-Deployment Notification

**Sent:** [Date/Time] **Recipients:** [Stakeholders, Support team, Users (if
applicable)] **Channel:** [Email / Slack / Status Page]

**Message:**

```
Subject: [Deployment Complete - Feature X]

Deployment completed successfully at [Time].

- Status: [Success / Partial Success / Rolled Back]
- New features: [Brief description]
- Known issues: [None / List]
- Support contact: [Email/Slack]

[Link to release notes or documentation]
```

---

## Known Production Issues

### Issue 1: [Brief Description]

**Severity:** [Critical / High / Medium / Low] **Impact:** [Who is affected and
how] **Workaround:** [Temporary solution if available] **Resolution Plan:** [Fix
in next release / Hotfix scheduled / Accepted limitation] **Tracking:** [Link to
issue tracker]

### Issue 2: [Brief Description]

**Severity:** **Impact:** **Workaround:** **Resolution Plan:** **Tracking:**

---

## Deployment Execution Log

### Deployment Timeline

| Time (UTC) | Phase       | Action                           | Status      | Notes                      |
| ---------- | ----------- | -------------------------------- | ----------- | -------------------------- |
| 14:00      | Pre-Deploy  | Started pre-deployment checklist | ✅ Complete | All checks passed          |
| 14:15      | Migration   | Database backup                  | ✅ Complete | Backup ID: backup-20240212 |
| 14:20      | Migration   | Run migration scripts            | ✅ Complete | Schema v1.2.0              |
| 14:30      | Deploy      | Deploy to Blue environment       | ✅ Complete | All pods healthy           |
| 14:45      | Validation  | Run smoke tests                  | ✅ Complete | All tests passed           |
| 14:50      | Traffic     | Switch to Blue                   | ✅ Complete | 100% traffic on v1.2.0     |
| 15:00      | Post-Deploy | Monitor production               | ✅ Complete | No issues detected         |

### Issues Encountered

**Issue:** [Description of any issues during deployment] **Resolution:** [How
issue was resolved] **Impact:** [Effect on deployment timeline or production]

---

## Handoff to Support Stage

### Support Readiness

- [ ] Deployment brief completed and shared with Support team
- [ ] Success criteria baseline measurements documented
- [ ] Production monitoring dashboards accessible to Support
- [ ] Support runbook created or updated
- [ ] Known issues documented with workarounds
- [ ] On-call rotation updated (if applicable)
- [ ] Incident response procedures reviewed

### Support Documentation

**Support Runbook:** [Link or location] **Troubleshooting Guide:** [Link or
location] **API Documentation:** [Link - if APIs deployed] **User
Documentation:** [Link - if user-facing features]

### Production Access

**Environment URLs:**

- Production: [URL]
- Admin panel: [URL]
- Monitoring dashboard: [URL]

**Access Credentials:**

- Documented in: [Password manager, Wiki, etc.]
- Access granted to: [Support team members]

### Escalation Contacts

**Primary On-Call:** [Name, Contact] **Secondary On-Call:** [Name, Contact]
**Deployment Engineer:** [Name, Contact] - Available for [Duration] after
deployment

---

## Sign-Off

**Deployment Status:** [✅ Success / ⚠️ Partial Success / ❌ Rolled Back]

**Deployment Engineer Approval:**

- Name: [Engineer Name]
- Date: YYYY-MM-DD
- Signature: [Digital signature or "Approved"]
- Notes: [Any final comments or concerns]

**DevOps Lead Approval:**

- Name: [Lead Name]
- Date: YYYY-MM-DD
- Signature: [Digital signature or "Approved"]
- Notes:

**Product Manager Acknowledgment:**

- Name: [PM Name]
- Date: YYYY-MM-DD
- Acknowledgment: [Aware of deployment status]
- Notes:

---

**Next Steps:**

1. [Monitor production for next 24 hours]
2. [Track success criteria baseline vs. targets]
3. [Address any minor issues discovered]
4. [Schedule retrospective if issues encountered]
5. [Hand off to Support stage for ongoing operations]

---

**Template Last Updated:** 2026-02-14

_Added to framework in v0.7.0_
