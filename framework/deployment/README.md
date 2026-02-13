# Deployment Stage

**Framework Version:** 0.8.0
**Last Updated:** 2026-02-12

---

## Overview

The Deployment stage releases verified increments to production environments,
making new functionality available to end users. This stage transforms tested
code into live, operational systems through controlled release processes that
minimize risk and ensure rapid rollback capability if issues arise.

**Execution Pattern:** Iterative (per increment)
**Primary Role:** DevOps Engineers / Engineers
**Supporting Roles:** Product Managers, QA Engineers, Technical Support,
Stakeholders

---

## Purpose

Deploy verified increments to production with:
- **Controlled release processes** that minimize service disruption
- **Rollback capability** to quickly revert problematic deployments
- **Production monitoring** to detect issues immediately
- **Baseline measurements** capturing pre-deployment state for success
  criteria validation
- **Clear communication** keeping stakeholders informed of release status
- **Environment validation** ensuring production readiness
- **Configuration management** maintaining environment-specific settings

**Key principle:** Every deployment should be reversible and monitorable.

---

## Artifacts

1. **deployment-brief-template.md** - Deployment plan documenting release
   strategy, steps, validation, and rollback procedures
2. **deployment-checklist.md** - Quick verification (60-90 seconds) ensuring
   deployment readiness
3. **deployment-reference.md** - Comprehensive deployment guidance covering
   strategies, environments, monitoring, and best practices
4. **deployment-ai-agent-prompt.md** - AI assistant prompt for deployment
   planning and execution support

---

## Inputs (from Verification Stage)

### Required Deliverables
- ✅ **Verified increment** - All tests passing (unit, integration, E2E,
  performance, security)
- ✅ **UAT sign-off** - Business stakeholders approved functionality
- ✅ **Production readiness checklist** - All quality gates passed
- ✅ **Test results documentation** - Evidence of successful verification
- ✅ **Known issues log** - Documented limitations or edge cases
- ✅ **Performance baseline** - Acceptable performance metrics established

### Supporting Context
- Implementation brief with architecture and technical decisions
- Design documentation (foundational architecture + increment design)
- Requirements with acceptance criteria
- Success criteria from Initiation (for baseline capture)

---

## Key Activities

### 1. Deployment Planning
- Select deployment strategy (blue/green, canary, rolling, feature flags)
- Define deployment steps and sequence
- Identify configuration changes and environment-specific settings
- Plan database migrations and data updates
- Assess risks and plan mitigations
- Schedule deployment window (if needed)

### 2. Pre-Deployment Preparation
- Validate deployment package/artifacts
- Review and approve deployment plan
- Prepare production environment
- Back up databases and critical data
- Configure monitoring and alerting
- Notify stakeholders of upcoming deployment
- Verify rollback procedures are ready

### 3. Deployment Execution
- Execute deployment steps in planned sequence
- Monitor deployment progress and system health
- Validate each deployment phase before proceeding
- Apply database migrations (if applicable)
- Update configuration and environment variables
- Deploy monitoring and instrumentation updates

### 4. Post-Deployment Validation
- Run smoke tests to verify core functionality
- Check production monitoring dashboards
- Validate success criteria instrumentation is working
- **Capture baseline measurements** for success criteria from Initiation
- Verify no critical errors or performance degradation
- Confirm user-facing features work as expected
- Check integration points and external dependencies

### 5. Monitoring and Stabilization
- Monitor production metrics (errors, latency, throughput)
- Watch for anomalies or unexpected behavior
- Respond to alerts and incidents
- Communicate deployment status to stakeholders
- Document any issues discovered post-deployment

### 6. Rollback (If Needed)
- Detect issues requiring rollback (critical bugs, performance problems,
  data corruption)
- Execute rollback procedure
- Validate system returns to previous stable state
- Notify stakeholders of rollback
- Document root cause for future prevention

---

## Outputs (Handoff to Support Stage)

### Deployment Deliverables
- ✅ **Deployed increment** - Live in production environment
- ✅ **Deployment brief** - Documented deployment plan, execution, and results
- ✅ **Baseline measurements** - Pre-deployment metrics captured for success
  criteria validation
- ✅ **Post-deployment validation results** - Smoke tests and health checks
  passed
- ✅ **Production monitoring dashboards** - Active monitoring in place
- ✅ **Rollback procedure** - Documented and tested rollback steps
- ✅ **Known production issues** - Any limitations or edge cases in production

### Handoff Documentation
- Production environment details (URLs, credentials, access)
- Monitoring and alerting setup
- Success criteria measurement approach (how to track goals from Initiation)
- Support runbook (troubleshooting, common issues, escalation)
- On-call rotation and incident response procedures
- Database migration history (if applicable)

---

## Workflow

### Phase 1: Planning (AI-Assisted)
**Human-AI Collaboration:**
1. 🤖 **AI:** Review increment scope, requirements, and architecture
2. 👤 **Human:** Provide environment details and deployment constraints
3. 🤖 **AI:** Suggest deployment strategy based on risk and requirements
4. 👤 **Human:** Select strategy and approve approach
5. 🤖 **AI:** Generate deployment steps and checklist
6. 👤 **Human:** Review and customize deployment plan

**Quality Gate:** Deployment plan reviewed and approved by DevOps/Engineering
lead

---

### Phase 2: Preparation (Human-Led, AI-Supported)
**Human-AI Collaboration:**
7. 👤 **Human:** Validate deployment artifacts and packages
8. 🤖 **AI:** Generate environment-specific configuration
9. 👤 **Human:** Review configuration and secrets management
10. 🤖 **AI:** Create pre-deployment checklist
11. 👤 **Human:** Execute pre-deployment checklist
12. 👤 **Human:** Back up production data and prepare rollback

**Quality Gate:** All pre-deployment checks pass, stakeholders notified

---

### Phase 3: Execution (Human-Led, AI-Monitored)
**Human-AI Collaboration:**
13. 👤 **Human:** Execute deployment steps
14. 🤖 **AI:** Monitor logs and metrics for anomalies
15. 👤 **Human:** Validate each deployment phase
16. 👤 **Human:** Apply database migrations (if applicable)
17. 🤖 **AI:** Run automated smoke tests
18. 👤 **Human:** Review smoke test results and production health

**Quality Gate:** Deployment successful, smoke tests pass, no critical errors

---

### Phase 4: Validation and Handoff (Human-Led, AI-Supported)
**Human-AI Collaboration:**
19. 👤 **Human:** Run post-deployment validation
20. 🤖 **AI:** Check monitoring dashboards for anomalies
21. 👤 **Human:** Capture baseline measurements for success criteria
22. 👤 **Human:** Monitor production for initial stabilization period
23. 🤖 **AI:** Generate support runbook and documentation
24. 👤 **Human:** Complete deployment brief and handoff to Support

**Quality Gate:** Production stable, baseline captured, Support team ready

---

## Deployment Strategies

### Blue/Green Deployment
- Maintain two identical environments (Blue = current, Green = new)
- Deploy to Green environment while Blue serves traffic
- Switch traffic to Green after validation
- Keep Blue as instant rollback option
- **Best for:** Zero-downtime deployments, easy rollback

### Canary Deployment
- Deploy to small subset of production (5-10% of users)
- Monitor canary metrics closely
- Gradually increase traffic to new version
- Roll back if canary shows problems
- **Best for:** High-risk changes, large user bases

### Rolling Deployment
- Gradually update instances one at a time or in small batches
- Monitor each batch before proceeding
- Continue until all instances updated
- **Best for:** Distributed systems, incremental risk

### Feature Flags
- Deploy code to production but keep features disabled
- Enable features for specific users or percentages
- Toggle features on/off without redeployment
- **Best for:** Decoupling deployment from release, A/B testing

---

## AI Autonomy Level

**Level:** Medium (Assists with Planning and Monitoring)

**AI can autonomously:**
- Generate deployment plans and checklists
- Suggest deployment strategies based on risk assessment
- Create environment-specific configuration templates
- Monitor logs and metrics for anomalies during deployment
- Run automated smoke tests and validation
- Generate support documentation and runbooks

**Human approval required for:**
- ✋ **Selecting deployment strategy** - Human chooses approach
- ✋ **Approving deployment plan** - Human reviews before execution
- ✋ **Executing deployment** - Human triggers deployment
- ✋ **Applying database migrations** - Human approves schema changes
- ✋ **Switching production traffic** - Human controls traffic routing
- ✋ **Initiating rollback** - Human decides when to roll back
- ✋ **Capturing baseline measurements** - Human validates instrumentation
- ✋ **Signing off on deployment** - Human confirms production readiness

**Reasoning:** Deployment to production carries significant risk (downtime,
data loss, customer impact). AI assists with planning, monitoring, and
documentation, but humans must control critical decision points and execution.

See [AI_AUTONOMY_SCORECARD.md](../../AI_AUTONOMY_SCORECARD.md) for detailed
autonomy definitions.

---

## Measurement Throughline Integration

The Deployment stage plays a critical role in establishing baseline
measurements for success criteria validation:

**Deployment Stage Activities:**
- **Validate instrumentation** - Ensure metrics collection works in production
- **Capture baseline measurements** - Record pre-deployment state for
  comparison
  - Example: Current conversion rate before new checkout flow
  - Example: Existing latency metrics before performance optimization
  - Example: User engagement before new feature launch
- **Configure monitoring dashboards** - Set up real-time success criteria
  tracking
- **Enable alerting** - Get notified if metrics deviate from expected ranges
- **Document measurement approach** - How Support team will track success

**Example Flow:**
```
Initiation: "Increase checkout conversion rate from 45% to 55%"
    ↓
Design: Design A/B testing framework and analytics events
    ↓
Implementation: Implement conversion tracking and experiment framework
    ↓
Verification: Test analytics events fire correctly
    ↓
Deployment: Capture baseline (current 45% conversion), enable A/B test at 10%
    ↓
Support: Monitor conversion rate, gradually increase experiment %
```

**Key Output:** Baseline measurements documented in deployment brief for
Support stage to track progress.

---

## Common Deployment Pitfalls

### ❌ No Rollback Plan
**Problem:** Deployment fails, but no way to quickly revert
**Solution:** Document and test rollback procedure before deploying

### ❌ Insufficient Monitoring
**Problem:** Issues go undetected until users report problems
**Solution:** Configure monitoring and alerting before deployment

### ❌ Database Migrations Not Tested
**Problem:** Migration fails or causes data corruption in production
**Solution:** Test migrations in staging environment with production-like data

### ❌ Missing Configuration
**Problem:** Environment-specific settings not configured, causing failures
**Solution:** Use configuration management and environment variable validation

### ❌ No Communication Plan
**Problem:** Stakeholders surprised by deployment or unaware of issues
**Solution:** Notify stakeholders before, during, and after deployment

### ❌ Deploying During Peak Traffic
**Problem:** Deployment disrupts service during high-usage periods
**Solution:** Schedule deployments during low-traffic windows when possible

### ❌ Skipping Smoke Tests
**Problem:** Critical functionality broken but not caught immediately
**Solution:** Run automated smoke tests after every deployment

---

## When to Revisit Deployment

Deployment plans may need updates when:
- **Deployment fails or requires rollback** - Review what went wrong and update
  procedures
- **Performance issues discovered post-deployment** - May need phased rollout
  instead
- **Configuration errors cause production incidents** - Improve configuration
  validation
- **Rollback procedure doesn't work as expected** - Test and refine rollback
  steps
- **New infrastructure or environments added** - Update deployment pipeline
- **Compliance or security requirements change** - Adjust deployment controls
- **Deployment strategy proves too risky or slow** - Consider alternative
  approaches

---

## Success Criteria

The Deployment stage succeeds when:
1. ✅ Increment deployed to production successfully
2. ✅ Zero or minimal service disruption during deployment
3. ✅ Post-deployment validation passes (smoke tests, health checks)
4. ✅ Production monitoring active and alerting configured
5. ✅ Baseline measurements captured for success criteria tracking
6. ✅ Rollback procedure documented and tested
7. ✅ Support team prepared with runbooks and access
8. ✅ Stakeholders notified of deployment status
9. ✅ No critical bugs or performance degradation detected
10. ✅ Deployment brief completed and handed off to Support

---

## Next Stage

**→ Support Stage** - Monitor production systems, track success criteria,
respond to incidents, fix bugs, and deliver enhancements.

---

*Added to framework in v0.7.0*
