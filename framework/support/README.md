# Support Stage

**Framework Version:** 0.8.0
**Last Updated:** 2026-02-12

---

## Overview

The Support stage represents ongoing operations after production deployment,
ensuring systems remain healthy, users are satisfied, and business objectives
are achieved. This continuous stage monitors success criteria, responds to
incidents, fixes bugs, delivers enhancements, and maintains system health.

**Execution Pattern:** Continuous (ongoing after first production deployment)
**Primary Role:** DevOps Engineers, Support Engineers, Engineers
**Supporting Roles:** Product Managers, QA Engineers, Business Analysts

---

## Purpose

Maintain production systems and deliver ongoing value through:
- **Production monitoring** - Track system health and success criteria metrics
- **Incident response** - Quickly identify, diagnose, and resolve production
  issues
- **Bug fixes** - Address defects discovered in production
- **Enhancements** - Deliver incremental improvements and new features
- **User support** - Help users effectively use the system
- **Success criteria tracking** - Measure progress toward business objectives
  from Initiation
- **System maintenance** - Keep infrastructure and dependencies up to date
- **Performance optimization** - Improve system efficiency and user experience

**Key principle:** Support is not just "keeping the lights on" - it's actively
delivering value through monitoring, improvement, and measurement.

---

## Artifacts

1. **support-brief-template.md** - Support plan documenting monitoring,
   incident response, success criteria tracking, and maintenance approach
2. **support-checklist.md** - Quick verification (60-90 seconds) ensuring
   support readiness
3. **support-reference.md** - Comprehensive support guidance covering
   operations, incident management, and optimization
4. **support-ai-agent-prompt.md** - AI assistant prompt for support planning
   and operations

---

## Inputs (from Deployment Stage)

### Required Deliverables
- ✅ **Deployed increment** - Live in production environment
- ✅ **Baseline measurements** - Pre-deployment metrics for success criteria
  validation
- ✅ **Production monitoring dashboards** - Active monitoring configured
- ✅ **Support runbook** - Troubleshooting guide and operational procedures
- ✅ **Known production issues** - Documented limitations or edge cases
- ✅ **Rollback procedure** - Tested rollback steps if issues arise

### Supporting Context
- Success criteria from Initiation (what metrics are we tracking?)
- Requirements with acceptance criteria (what functionality should work?)
- Design documentation (system architecture and technical approach)
- Implementation details (code structure, technical decisions)
- Deployment history (what was deployed, when, by whom)

---

## Key Activities

### 1. Production Monitoring and Observability

**System Health Monitoring:**
- Track application metrics (error rate, response time, throughput)
- Monitor infrastructure health (CPU, memory, disk, network)
- Watch database performance (query time, connections, locks)
- Observe user activity patterns (sessions, conversions, engagement)

**Success Criteria Tracking:**
- Measure progress toward business objectives from Initiation stage
- Compare current metrics to baseline captured at deployment
- Generate regular reports (weekly, monthly) on success criteria
- Identify trends and anomalies requiring attention

**Alerting and Notifications:**
- Configure alerts for critical issues (downtime, errors, performance)
- Set up warning thresholds for degradation
- Route alerts to appropriate teams (on-call, DevOps, product)
- Minimize false positives through alert tuning

### 2. Incident Response and Troubleshooting

**Incident Detection:**
- Monitor alerts and dashboards for anomalies
- Respond to user reports of issues
- Investigate performance degradation
- Identify security concerns

**Incident Management:**
- Triage incidents by severity and impact
- Assemble incident response team
- Communicate status to stakeholders
- Document incident timeline and actions

**Resolution:**
- Diagnose root cause through logs, metrics, and debugging
- Implement fix (hotfix for critical, backlog for minor)
- Validate resolution in production
- Conduct post-incident review (retrospective)

### 3. Bug Fixes and Hotfixes

**Bug Triage:**
- Categorize bugs by severity (critical, high, medium, low)
- Assess user impact (how many users affected?)
- Determine urgency (immediate hotfix vs. next release)
- Prioritize against other work

**Hotfix Process:**
- Create hotfix branch from production tag
- Implement minimal fix (only changes needed to resolve issue)
- Fast-track testing (focus on regression and fix validation)
- Deploy to production with accelerated approval
- Monitor closely after deployment
- Merge hotfix back to main branch

**Bug Fix in Regular Release:**
- Add bug fix to backlog
- Prioritize with other features and enhancements
- Include in next increment planning
- Follow standard SDLC process (Design → Implementation → Verification →
  Deployment)

### 4. Enhancements and Feature Requests

**Enhancement Management:**
- Collect enhancement requests from users and stakeholders
- Evaluate against product roadmap and priorities
- Assess effort vs. value
- Plan enhancements as new increments

**Continuous Improvement:**
- Identify optimization opportunities from monitoring data
- Reduce technical debt incrementally
- Improve developer experience and operational efficiency
- Enhance observability and monitoring

**Feedback Loop:**
- Enhancement requests feed back into Initiation stage for new increments
- Follow full SDLC cycle: Initiation → Requirements → Design →
  Implementation → Verification → Deployment → Support
- Use success criteria data to inform enhancement priorities

### 5. User Support

**User Assistance:**
- Answer user questions and troubleshoot user issues
- Provide guidance on using features effectively
- Create and update user documentation
- Conduct user training (if applicable)

**Feedback Collection:**
- Gather user feedback on features and usability
- Identify pain points and feature requests
- Track user satisfaction metrics (NPS, CSAT, support ticket volume)
- Feed insights back to product and engineering teams

### 6. System Maintenance

**Dependency Management:**
- Monitor for security vulnerabilities in dependencies
- Update libraries and frameworks regularly
- Test updates in staging before production
- Coordinate maintenance windows if downtime required

**Infrastructure Maintenance:**
- Apply security patches to servers and infrastructure
- Scale infrastructure to meet demand
- Optimize resource allocation (cost efficiency)
- Perform database maintenance (vacuum, reindex, backups)

**Documentation Maintenance:**
- Keep runbooks and documentation up to date
- Update architecture diagrams as system evolves
- Maintain incident playbooks and troubleshooting guides
- Document operational procedures and best practices

---

## Outputs (Ongoing)

### Regular Deliverables
- ✅ **Production health reports** - Weekly/monthly system health summaries
- ✅ **Success criteria reports** - Progress toward business objectives
- ✅ **Incident post-mortems** - Root cause analysis and prevention actions
- ✅ **Bug fix releases** - Hotfixes and regular bug fixes
- ✅ **Enhancement increments** - New features and improvements
- ✅ **Updated documentation** - Runbooks, guides, architecture docs

### Feedback to Initiation Stage
When enhancements or new features are prioritized:
- Enhancement request becomes new increment
- Follow Initiation stage to define business case and success criteria
- Progress through full SDLC cycle
- Return to Support stage after deployment

**Support stage creates a continuous feedback loop** - monitoring and user
feedback drive new increments through the SDLC.

---

## Workflow

### Phase 1: Establish Support Operations (Initial Setup)
**Human-AI Collaboration:**
1. 👤 **Human:** Review deployment handoff documentation
2. 🤖 **AI:** Generate support plan from deployment brief and runbooks
3. 👤 **Human:** Configure monitoring dashboards and alerts
4. 🤖 **AI:** Recommend alert thresholds based on baseline metrics
5. 👤 **Human:** Set up on-call rotation and escalation procedures
6. 👤 **Human:** Review success criteria tracking approach

**Quality Gate:** Support team ready to own production system

---

### Phase 2: Monitor and Maintain (Ongoing)
**Human-AI Collaboration:**
7. 👤 **Human:** Monitor production dashboards daily
8. 🤖 **AI:** Alert on anomalies and metric deviations
9. 👤 **Human:** Investigate alerts and potential issues
10. 🤖 **AI:** Assist with log analysis and troubleshooting
11. 👤 **Human:** Track success criteria progress weekly/monthly
12. 🤖 **AI:** Generate success criteria reports and trend analysis

**Quality Gate:** System health maintained, metrics tracking objectives

---

### Phase 3: Respond to Incidents (As Needed)
**Human-AI Collaboration:**
13. 🔔 **Alert:** Critical issue detected (error rate spike, downtime, etc.)
14. 👤 **Human:** Acknowledge alert and assess severity
15. 🤖 **AI:** Suggest diagnosis based on symptoms and logs
16. 👤 **Human:** Investigate root cause with AI assistance
17. 👤 **Human:** Implement fix (hotfix or rollback)
18. 🤖 **AI:** Generate incident timeline and post-mortem template
19. 👤 **Human:** Validate resolution and monitor for recurrence

**Quality Gate:** Incident resolved, root cause documented, prevention actions
identified

---

### Phase 4: Deliver Bug Fixes and Enhancements (Iterative)
**Human-AI Collaboration:**
20. 👤 **Human:** Triage bugs and enhancement requests
21. 🤖 **AI:** Recommend prioritization based on impact and effort
22. 👤 **Human:** Decide what to fix/enhance in next release
23. 🔄 **SDLC Loop:** Follow Design → Implementation → Verification →
    Deployment for fixes/enhancements
24. 👤 **Human:** Deploy to production
25. 👤 **Human:** Monitor impact on success criteria

**Quality Gate:** Fixes/enhancements deployed successfully, monitoring shows
improvement

---

### Phase 5: Track Success Criteria and Report (Regular Intervals)
**Human-AI Collaboration:**
26. 👤 **Human:** Review success criteria metrics (weekly/monthly)
27. 🤖 **AI:** Generate success criteria progress report
28. 👤 **Human:** Analyze trends (are we meeting objectives?)
29. 🤖 **AI:** Identify opportunities for improvement
30. 👤 **Human:** Share results with stakeholders
31. 👤 **Human:** Decide if adjustments needed (new features, optimizations)

**Quality Gate:** Success criteria tracked, stakeholders informed, actions
identified

---

## Success Criteria Tracking (Closing the Loop)

The Support stage completes the measurement throughline established in
Initiation:

**Measurement Flow:**
```
Initiation: Define objectives with measurable success criteria
    ↓
Requirements: Capture instrumentation needs as NFRs
    ↓
Design: Design measurement infrastructure
    ↓
Implementation: Implement metrics collection
    ↓
Verification: Test measurement systems
    ↓
Deployment: Capture baseline measurements
    ↓
Support: Track progress, validate achievement, report results ← YOU ARE HERE
```

**Support Stage Measurement Activities:**

1. **Regular Measurement** - Check metrics weekly/monthly per success criteria
   schedule
2. **Trend Analysis** - Identify patterns (improving, declining, stable)
3. **Variance Analysis** - Compare actual vs. target, understand gaps
4. **Reporting** - Share progress with stakeholders regularly
5. **Action Planning** - If not meeting targets, plan interventions
   (enhancements, optimizations)
6. **Achievement Validation** - When targets met, validate and celebrate

**Example Success Criteria Tracking:**

**Success Criterion:** "Increase checkout conversion rate from 45% to 55%"

**Tracking in Support:**
- **Week 1:** 46% (baseline: 45%) - Slight improvement, continue monitoring
- **Week 2:** 47% - Trending positively
- **Week 3:** 44% - Dip detected, investigate (logs show error in payment flow)
- **Week 4:** Bug fixed, back to 47%
- **Month 2:** 50% - Halfway to target
- **Month 3:** 53% - Close to target
- **Month 4:** 56% - Target achieved! 🎉

**Actions Based on Data:**
- Week 3: Identified bug through success criteria monitoring → Hotfix deployed
- Month 4: Target achieved → Share success with stakeholders, consider new
  target

---

## AI Autonomy Level

**Level:** Medium-Low (Assists with Analysis and Recommendations)

**AI can autonomously:**
- Analyze logs and metrics to suggest diagnosis
- Generate incident timelines and reports
- Recommend bug prioritization based on impact
- Create success criteria progress reports
- Identify trends and anomalies in metrics
- Suggest optimization opportunities
- Draft user documentation and runbooks

**Human approval required for:**
- ✋ **Incident response decisions** - Human assesses severity and chooses
  response
- ✋ **Production changes** - Human approves hotfixes and deployments
- ✋ **Bug prioritization** - Human decides what to fix when
- ✋ **Enhancement decisions** - Human chooses what features to build
- ✋ **Success criteria interpretation** - Human evaluates if targets met
- ✋ **Resource allocation** - Human decides team focus and priorities
- ✋ **Communication to stakeholders** - Human approves messages and reports

**Reasoning:** Support involves critical production systems and business
decisions. AI assists with analysis, diagnosis, and recommendations, but
humans must control production changes, prioritization, and stakeholder
communication.

See [AI_AUTONOMY_SCORECARD.md](../../AI_AUTONOMY_SCORECARD.md) for detailed
autonomy definitions.

---

## Common Support Challenges

### ❌ Reactive Fire-Fighting (No Proactive Monitoring)
**Problem:** Team only responds to incidents, never gets ahead of issues
**Solution:** Establish proactive monitoring, regular health reviews, trend
analysis

### ❌ Alert Fatigue (Too Many False Positives)
**Problem:** Team ignores alerts because most are noise
**Solution:** Tune alert thresholds, eliminate low-value alerts, focus on
actionable alerts

### ❌ Tribal Knowledge (Undocumented Procedures)
**Problem:** Only one person knows how to fix certain issues
**Solution:** Document runbooks, conduct knowledge sharing, cross-train team

### ❌ Technical Debt Accumulation
**Problem:** Quick fixes pile up, system becomes fragile and hard to maintain
**Solution:** Allocate time for debt paydown, track debt in backlog, prevent
new debt

### ❌ Success Criteria Neglect
**Problem:** Team never checks if business objectives are being met
**Solution:** Schedule regular success criteria reviews, share reports with
stakeholders

### ❌ User Feedback Ignored
**Problem:** Enhancement requests and user pain points not acted upon
**Solution:** Regular review of user feedback, prioritize high-impact
improvements

### ❌ No Post-Incident Learning
**Problem:** Same incidents recur because root causes not addressed
**Solution:** Conduct post-mortems, track action items, verify prevention
measures implemented

---

## When to Revisit Support

Support procedures may need updates when:
- **Incident response is slow or ineffective** - Review and improve runbooks,
  automation
- **Alerts are not actionable** - Tune thresholds, add context, eliminate
  noise
- **Team is overwhelmed** - Assess workload, prioritize, consider additional
  resources
- **Success criteria consistently missed** - Investigate root causes, plan
  interventions
- **User satisfaction declining** - Gather feedback, prioritize usability
  improvements
- **System architecture changes** - Update monitoring, runbooks, escalation
  procedures
- **Team composition changes** - Update on-call rotation, retrain, document
  knowledge

---

## Success Criteria

The Support stage succeeds when:
1. ✅ Production systems remain healthy and available (>99% uptime or target)
2. ✅ Incidents detected and resolved quickly (MTTR < target)
3. ✅ Success criteria from Initiation tracked and progress reported regularly
4. ✅ Bug fixes and enhancements delivered iteratively
5. ✅ User satisfaction maintained or improved (measured via NPS, CSAT, etc.)
6. ✅ Team has clear runbooks and documentation for operations
7. ✅ On-call rotation sustainable (not burning out engineers)
8. ✅ Post-incident reviews conducted and action items completed
9. ✅ Technical debt managed (not accumulating uncontrollably)
10. ✅ Feedback loop established (user feedback drives new increments through
    SDLC)

---

## Continuous Feedback Loop

Support stage closes the SDLC loop:

```
         ┌─────────────────────────────────────────┐
         │                                         │
         │  FOUNDATIONAL (Once per project)        │
         │  1. Initiation → 2. Requirements        │
         │     → 3. Design (Architecture)          │
         │                                         │
         └──────────────┬──────────────────────────┘
                        ↓
         ┌─────────────────────────────────────────┐
         │                                         │
    ┌────│  ITERATIVE (Per increment)              │
    │    │  3. Design (Detail) → 4. Implementation │
    │    │     → 5. Verification → 6. Deployment   │
    │    │                                         │
    │    └──────────────┬──────────────────────────┘
    │                   ↓
    │    ┌─────────────────────────────────────────┐
    │    │                                         │
    │    │  CONTINUOUS (Ongoing)                   │
    │    │  7. Support                             │
    │    │                                         │
    │    └──────────────┬──────────────────────────┘
    │                   │
    │                   │ Enhancement Requests
    │                   │ Success Criteria Gaps
    │                   │ New Features Needed
    │                   │
    └───────────────────┘ → Back to Initiation for new increment
```

**Key Insight:** Support is not the end - it's the continuous phase that
identifies new needs and starts the cycle again.

---

## Next Stage

**→ No next stage!** Support is the final, continuous stage. However,
enhancements and new features identified in Support feed back to **Initiation**
to start new increments through the SDLC.

**Framework Complete:** All 7 stages defined. This completes the AI-Assisted
SDLC framework! 🎉

---

*Added to framework in v0.8.0*
