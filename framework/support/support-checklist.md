# Support Checklist

**Last Updated:** 2026-02-12

**Purpose:** Quick verification (60-90 seconds) that support operations are
ready and functioning effectively.

**Usage:** Review regularly (weekly) to ensure support processes are healthy and
production systems are well-maintained.

---

## Section 1: Support Readiness (Initial Setup)

### Team and Access

- [ ] Support team identified and roles assigned
- [ ] On-call rotation established and current
- [ ] Production access granted to support team members
- [ ] VPN and authentication configured (MFA enabled)
- [ ] Credentials documented and accessible (password manager, vault)
- [ ] Escalation contacts identified and documented

### Documentation

- [ ] Support brief completed and up to date
- [ ] Runbooks created for common operational tasks
- [ ] Troubleshooting guides available for known issues
- [ ] Deployment history documented
- [ ] Architecture documentation accessible
- [ ] User documentation exists and is current

### Knowledge Transfer

- [ ] Handoff from deployment team completed
- [ ] Support team trained on system architecture
- [ ] Runbooks reviewed and understood
- [ ] On-call engineers know escalation procedures
- [ ] Team has completed onboarding checklist

**🚦 Quality Gate:** Support team ready to own production system **❌ Red
Flags:** No runbooks, unclear escalation, team lacks production access

---

## Section 2: Monitoring and Observability

### Dashboards and Metrics

- [ ] Production monitoring dashboard configured and accessible
- [ ] Success criteria dashboard configured (business metrics)
- [ ] Infrastructure monitoring active (CPU, memory, disk, network)
- [ ] Application performance monitoring configured (APM)
- [ ] Error tracking configured (Sentry, Rollbar, etc.)
- [ ] Log aggregation configured (ELK, Splunk, etc.)

### Alerting

- [ ] Critical alerts configured (error rate, downtime, performance)
- [ ] Warning alerts configured (degradation, resource usage)
- [ ] Alerts routing to correct channels (PagerDuty, Slack, email)
- [ ] Alert thresholds tested and tuned (not too noisy, not too quiet)
- [ ] On-call engineer receiving alerts correctly
- [ ] Alert runbooks available (what to do when alert fires)

### Success Criteria Tracking

- [ ] Success criteria from Initiation stage documented
- [ ] Baseline measurements captured at deployment
- [ ] Measurement method defined (how to track each metric)
- [ ] Dashboards or reports show current success criteria values
- [ ] Measurement schedule defined (daily, weekly, monthly)
- [ ] Stakeholder reporting process established

**🚦 Quality Gate:** Monitoring active, alerts functional, success criteria
tracked **❌ Red Flags:** No alerts configured, dashboards inaccessible, success
criteria not tracked

---

## Section 3: Incident Response Preparedness

### Incident Management

- [ ] Incident response procedure documented
- [ ] Severity levels defined (P0, P1, P2, P3)
- [ ] Response time targets defined per severity
- [ ] Incident tracking system configured (PagerDuty, Jira, etc.)
- [ ] Incident communication channels established (Slack, email)
- [ ] Post-incident review process defined

### On-Call Readiness

- [ ] Current on-call engineer identified
- [ ] Backup on-call engineer identified
- [ ] On-call schedule published and accessible
- [ ] On-call engineers have production access and credentials
- [ ] On-call engineers familiar with runbooks and escalation procedures
- [ ] On-call handoff process defined

### Rollback and Recovery

- [ ] Rollback procedure documented and tested
- [ ] Database backup schedule active and verified
- [ ] Disaster recovery plan exists
- [ ] Hotfix deployment process documented
- [ ] Incident response runbooks available

**🚦 Quality Gate:** Incident response process ready, on-call rotation
established **❌ Red Flags:** No on-call schedule, unclear incident procedure,
no rollback plan

---

## Section 4: Bug and Enhancement Management

### Bug Tracking

- [ ] Issue tracker configured (Jira, GitHub Issues, etc.)
- [ ] Bug triage process defined
- [ ] Severity and priority criteria documented
- [ ] Bug workflow defined (New → Triaged → In Progress → Fixed → Verified)
- [ ] Hotfix criteria and process documented
- [ ] Bug backlog reviewed regularly (daily or weekly)

### Enhancement Management

- [ ] Enhancement backlog exists and is maintained
- [ ] Prioritization framework defined (MoSCoW, RICE, etc.)
- [ ] Product manager or owner identified for prioritization
- [ ] Enhancement request process documented
- [ ] Approved enhancements feed back to Initiation stage

**🚦 Quality Gate:** Bug and enhancement processes established **❌ Red Flags:**
No bug triage process, unclear prioritization, backlog not maintained

---

## Section 5: Production Health Monitoring (Ongoing)

### Daily Checks

- [ ] Monitoring dashboards reviewed for anomalies
- [ ] Error tracking checked for new or recurring issues
- [ ] Recent deployments reviewed (any issues post-deployment?)
- [ ] Critical alerts reviewed and addressed
- [ ] Support tickets triaged

### System Health Indicators

- [ ] Error rate at baseline (<1-2%)
- [ ] Response time within target (p95 <target)
- [ ] Uptime target met (e.g., >99%)
- [ ] Infrastructure resources healthy (CPU <80%, Memory <80%)
- [ ] Database performance normal (query time, connection pool)
- [ ] No critical alerts firing

### User Impact

- [ ] No user reports of major issues
- [ ] Support ticket volume normal (not spiking)
- [ ] User-facing features working as expected
- [ ] Third-party integrations operational

**🚦 Quality Gate:** Production healthy, no critical issues **❌ Red Flags:**
Error rate spike, critical alerts firing, user reports of issues

---

## Section 6: Success Criteria Progress (Regular Intervals)

### Measurement Execution

- [ ] Success criteria metrics measured per schedule (daily, weekly, monthly)
- [ ] Current values compared to baseline and target
- [ ] Trends analyzed (improving, declining, stable)
- [ ] Variance from target understood (why ahead or behind?)

### Reporting

- [ ] Success criteria reports generated per schedule
- [ ] Reports distributed to stakeholders
- [ ] Progress discussed in team meetings
- [ ] Action items identified if metrics behind target

### Actions Based on Data

- [ ] If on track: Continue monitoring, share wins
- [ ] If behind: Root cause analysis, plan interventions
- [ ] If target achieved: Validate, celebrate, consider new targets
- [ ] Enhancements planned to support success criteria (if needed)

**🚦 Quality Gate:** Success criteria tracked and reported regularly **❌ Red
Flags:** Metrics not measured, reports not shared, no action on missed targets

---

## Section 7: Incident Response (When Incidents Occur)

### Detection and Acknowledgment

- [ ] Incident detected (alert or user report)
- [ ] On-call engineer acknowledged within target time
- [ ] Incident severity assigned (P0, P1, P2, P3)
- [ ] Incident tracking record created

### Response and Communication

- [ ] Incident Slack channel created (for P0/P1)
- [ ] Stakeholders notified based on severity
- [ ] Initial status update posted
- [ ] Escalation initiated if needed

### Resolution

- [ ] Root cause diagnosed
- [ ] Fix implemented (hotfix, rollback, configuration change)
- [ ] Fix validated in production
- [ ] Monitoring shows issue resolved
- [ ] Resolution communicated to stakeholders

### Post-Incident

- [ ] Post-incident review scheduled (within 24-48 hours for P0/P1)
- [ ] Incident timeline documented
- [ ] Root cause identified
- [ ] Action items to prevent recurrence created
- [ ] Runbooks updated based on learnings

**🚦 Quality Gate:** Incident resolved, post-mortem completed, actions
identified **❌ Red Flags:** Incident unresolved >4 hours, no post-mortem,
recurring incidents

---

## Section 8: Bug Fixes and Hotfixes

### Bug Triage

- [ ] New bugs reviewed and triaged (daily or per process)
- [ ] Severity assigned (Critical, High, Medium, Low)
- [ ] User impact assessed (how many users, what functionality)
- [ ] Urgency determined (hotfix vs. backlog)
- [ ] Workarounds identified and documented (if available)

### Hotfix Deployment

- [ ] Hotfix criteria met (critical severity, no workaround, significant impact)
- [ ] Hotfix branch created from production tag
- [ ] Minimal fix implemented (only changes needed)
- [ ] Tested in staging environment
- [ ] Approved by engineering lead or on-call
- [ ] Deployed to production
- [ ] Monitored closely for 1-2 hours post-deployment
- [ ] Merged back to main branch

### Regular Bug Fixes

- [ ] Non-critical bugs added to backlog
- [ ] Prioritized in sprint planning
- [ ] Follow full SDLC process (Design → Implementation → Verification →
      Deployment)
- [ ] Included in next regular release

**🚦 Quality Gate:** Bugs triaged and addressed per severity **❌ Red Flags:**
Critical bugs not hotfixed, bugs piling up in backlog, unclear triage

---

## Section 9: Enhancements and Continuous Improvement

### Enhancement Requests

- [ ] User feedback and feature requests collected
- [ ] Enhancement backlog maintained and reviewed
- [ ] Enhancements prioritized using defined framework
- [ ] High-priority enhancements approved and planned

### Enhancement Workflow

- [ ] Approved enhancements start at Initiation stage (new increment)
- [ ] Follow full SDLC process through Deployment
- [ ] Return to Support stage after deployment
- [ ] Monitor enhancement impact on success criteria

### Technical Debt Management

- [ ] Technical debt identified and tracked
- [ ] Debt prioritized with features and bug fixes
- [ ] Time allocated for debt paydown (e.g., 20% of sprint capacity)
- [ ] Debt not accumulating uncontrollably

**🚦 Quality Gate:** Enhancements planned and delivered, debt managed **❌ Red
Flags:** No enhancement process, user feedback ignored, debt accumulating

---

## Section 10: System Maintenance

### Dependency Management

- [ ] Dependency scanning configured (Dependabot, Snyk, etc.)
- [ ] Security vulnerabilities identified and tracked
- [ ] Critical vulnerabilities patched within 7 days
- [ ] Dependencies updated regularly (monthly or quarterly)
- [ ] Updates tested in staging before production

### Infrastructure Maintenance

- [ ] Security patches applied to infrastructure
- [ ] Infrastructure scaled to meet demand
- [ ] Resource utilization optimized (cost efficiency)
- [ ] Database maintenance performed (vacuum, reindex, backups validated)
- [ ] SSL/TLS certificates renewed before expiration

### Documentation Maintenance

- [ ] Runbooks updated after incidents or process changes
- [ ] Architecture diagrams reflect current state
- [ ] User documentation updated after feature releases
- [ ] Onboarding materials current

**🚦 Quality Gate:** System maintained, dependencies updated, docs current **❌
Red Flags:** Unpatched vulnerabilities, outdated docs, infrastructure neglected

---

## Section 11: User Support

### Support Operations

- [ ] Support channels monitored (email, help desk, Slack)
- [ ] User questions responded to within target time (e.g., <4 hours)
- [ ] Support tickets resolved within target time (e.g., <24 hours)
- [ ] User satisfaction tracked (CSAT surveys)

### Support Metrics

- [ ] Ticket volume tracked (tickets per week)
- [ ] Response time tracked (avg time to first response)
- [ ] Resolution time tracked (avg time to close ticket)
- [ ] Common issues identified (top 5 frequent tickets)
- [ ] Trends analyzed (volume increasing or decreasing?)

### Support Improvements

- [ ] Frequently asked questions documented
- [ ] User documentation updated to reduce common tickets
- [ ] Product improvements planned to address user pain points
- [ ] Training materials updated

**🚦 Quality Gate:** Users supported effectively, metrics tracked **❌ Red
Flags:** Slow response times, low CSAT, no documentation

---

## Section 12: Team Health and Sustainability

### On-Call Sustainability

- [ ] On-call rotation fair and balanced (not same person always)
- [ ] On-call engineers not burning out (reasonable alert volume)
- [ ] On-call compensation or time-off policy in place
- [ ] Escalation used appropriately (on-call not solving everything alone)

### Knowledge Sharing

- [ ] Team meetings held regularly (standup, retrospectives)
- [ ] Knowledge shared across team (not siloed)
- [ ] Cross-training conducted (multiple people can handle issues)
- [ ] New team members onboarded effectively

### Process Improvement

- [ ] Post-incident reviews conducted and actions tracked
- [ ] Retrospectives held to improve processes
- [ ] Alert tuning to reduce noise and false positives
- [ ] Runbooks improved based on learnings

**🚦 Quality Gate:** Team healthy, sustainable on-call, continuous improvement
**❌ Red Flags:** On-call burnout, tribal knowledge, no process improvement

---

## Quick Decision Trees

### Production Health Check (Daily)

```
Are critical alerts firing?
  → Yes: Investigate immediately, assess severity
  → No: Continue

Is error rate >2x baseline?
  → Yes: Investigate logs, check recent deployments
  → No: Continue

Are success criteria metrics on track?
  → Yes: All good, continue monitoring
  → No: Analyze trends, plan interventions
```

### Bug Triage Decision

```
Is this a critical bug (P0/P1)?
  → Yes: Does it need immediate hotfix?
    → Yes: Deploy hotfix today
    → No: Plan for next sprint
  → No: Add to backlog, prioritize normally
```

### Incident Severity Assessment

```
Is production down or data being lost?
  → Yes: P0 - All hands, immediate response
  → No: Continue

Is major functionality broken (checkout, login)?
  → Yes: P1 - Urgent response, notify stakeholders
  → No: Continue

Is minor functionality broken?
  → Yes: P2 - Standard response, log in tracker
  → No: P3 - Low priority, schedule for later
```

---

## Common Red Flags (Address Immediately)

### Production Health

- ❌ Error rate >5% sustained for >10 minutes
- ❌ Critical alerts ignored or not acknowledged
- ❌ Production deployment failed with no rollback
- ❌ Database backup failed or backups not tested
- ❌ Security vulnerability unpatched for >7 days

### Monitoring and Alerting

- ❌ Monitoring dashboards down or inaccessible
- ❌ Alerts not routing to on-call (missed incidents)
- ❌ Alert fatigue (team ignoring alerts due to noise)
- ❌ Success criteria not measured for >1 month

### Incident Response

- ❌ P0/P1 incident unresolved for >4 hours with no progress
- ❌ No post-incident review conducted after critical incident
- ❌ Same incident recurring (no prevention actions implemented)
- ❌ On-call engineer unreachable or unresponsive

### Bug and Enhancement Management

- ❌ Critical bugs sitting in backlog without hotfix
- ❌ User feedback and requests not reviewed or prioritized
- ❌ Technical debt accumulating with no paydown plan
- ❌ Enhancement backlog not maintained

### Team Health

- ❌ On-call engineers burning out (too many incidents, unfair rotation)
- ❌ Tribal knowledge (only one person can fix certain issues)
- ❌ No knowledge transfer or cross-training
- ❌ Team demoralized or disengaged

**Action:** If any red flag present, escalate and address immediately. These
indicate unsustainable or risky support operations.

---

## Appendix: Support Maturity Levels

### Level 1: Reactive Fire-Fighting

- No proactive monitoring, only react to user reports
- Tribal knowledge, undocumented procedures
- Frequent incidents, no post-mortems
- **Goal:** Establish basic monitoring and runbooks

### Level 2: Basic Operations

- Monitoring and alerting configured
- Runbooks for common issues
- On-call rotation established
- Incidents documented
- **Goal:** Proactive monitoring and incident prevention

### Level 3: Proactive Support

- Proactive monitoring and trend analysis
- Regular post-incident reviews and action items
- Bug triage and prioritization process
- Success criteria tracked
- **Goal:** Continuous improvement and optimization

### Level 4: Optimized Support

- Automated incident detection and response
- Comprehensive observability and instrumentation
- Data-driven decision making (success criteria inform priorities)
- Sustainable on-call (low burnout, fair rotation)
- Continuous feedback loop (user feedback drives enhancements)
- **Goal:** Maintain excellence

---

_Added to framework in v0.8.0_
