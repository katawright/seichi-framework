# Verification Checklist

**Last Updated:** 2026-02-12

## Purpose

This checklist provides a quick 60-90 second validation that testing is complete
and the increment is ready for deployment. Use this before handing off to the
Deployment stage.

**Target:** QA Engineers, Test Leads **When to use:** After test execution,
before deployment approval

---

## How to Use This Checklist

1. **Review each section** - Check items systematically
2. **Mark status** - ✅ Complete | ⚠️ Partial/Issues | ❌ Not Done | ⏸ N/A
3. **Note red flags** - Any ❌ requires investigation
4. **Make go/no-go decision** - Ready vs. needs more work

**Completion time:** 60-90 seconds if well-prepared

---

## Section 1: Test Execution Planning ✅

**Design stage test strategy confirmed and adapted:**

- [ ] Test strategy from Design stage (design-brief section 13) reviewed
- [ ] Test types confirmed or adapted based on implementation
- [ ] Test coverage approach confirmed from Design plan
- [ ] Test environments prepared and accessible
- [ ] Test data loaded and validated
- [ ] Acceptance criteria clearly identified

**Red flags:**

- ❌ Design stage test strategy not reviewed
- ❌ Test strategy unclear or missing
- ❌ Test environments not accessible
- ❌ Test data incomplete or incorrect

---

## Section 2: Integration Testing ✅

**Integration tests executed and passing:**

- [ ] All integration tests run successfully
- [ ] Component interactions validated
- [ ] API contracts verified
- [ ] Data flow end-to-end confirmed
- [ ] No critical integration failures

**Test evidence:**

- [ ] Test results documented in verification brief
- [ ] Test logs available for review
- [ ] CI/CD pipeline shows green build

**Red flags:**

- ❌ Integration tests not executed
- ❌ Multiple test failures without resolution
- ❌ No test evidence or documentation

---

## Section 3: Functional Testing ✅

**Functional tests against acceptance criteria:**

- [ ] All acceptance criteria tested
- [ ] Happy path scenarios verified
- [ ] Edge cases and boundary conditions tested
- [ ] Error handling validated
- [ ] Business rules confirmed

**Coverage validation:**

- [ ] 100% of acceptance criteria covered by tests
- [ ] Test cases documented with results
- [ ] Failed tests resolved or deferred with justification

**Red flags:**

- ❌ Acceptance criteria not fully tested
- ❌ Critical functional failures unresolved
- ❌ No test coverage documentation

---

## Section 4: User Acceptance Testing (UAT) ✅

**Business stakeholder validation:**

- [ ] UAT scenarios executed with business users
- [ ] UAT environment reflects production-like conditions
- [ ] Business workflows validated end-to-end
- [ ] UAT feedback documented and addressed
- [ ] Business stakeholder sign-off obtained

**UAT approval:**

- [ ] Formal UAT approval received
- [ ] Approver name and date documented
- [ ] Any conditions or caveats noted

**Red flags:**

- ❌ UAT not conducted
- ❌ No business stakeholder sign-off
- ❌ Critical UAT issues unresolved

---

## Section 5: Performance Testing ✅

**Performance validated against NFRs:**

- [ ] Performance tests executed (or confirmed N/A)
- [ ] Response time meets NFR targets
- [ ] Throughput meets NFR targets
- [ ] Resource utilization acceptable
- [ ] No performance degradation vs. baseline

**Load and stress testing:**

- [ ] System behavior under expected load validated
- [ ] Stress test shows graceful degradation
- [ ] Performance bottlenecks identified and addressed

**Red flags:**

- ❌ Performance NFRs not met
- ❌ Performance tests required but not executed
- ❌ Unresolved performance degradation

---

## Section 6: Security Testing ✅

**Security validated:**

- [ ] Security tests executed (or confirmed N/A)
- [ ] No critical or high-severity vulnerabilities
- [ ] Medium/low vulnerabilities documented and accepted
- [ ] Authentication and authorization tested
- [ ] Input validation and sanitization verified

**Vulnerability scan:**

- [ ] SAST/DAST scans completed
- [ ] Dependency vulnerabilities checked
- [ ] Security scan report available
- [ ] All critical/high vulnerabilities remediated

**Red flags:**

- ❌ Critical or high-severity vulnerabilities unresolved
- ❌ Security tests skipped without justification
- ❌ No security scan evidence

---

## Section 7: Accessibility Testing ✅

**Accessibility validated (if applicable):**

- [ ] Accessibility tests executed (or confirmed N/A)
- [ ] WCAG compliance validated
- [ ] Keyboard navigation tested
- [ ] Screen reader compatibility verified
- [ ] Accessibility issues documented and addressed

**Red flags:**

- ❌ Required accessibility standards not met
- ❌ Accessibility tests skipped without justification

---

## Section 8: Monitoring & Instrumentation ✅

**Observability validated:**

- [ ] Logging implemented and tested
- [ ] Metrics collection verified
- [ ] Dashboards display correctly
- [ ] Alerts trigger as expected
- [ ] Success criteria measurement mechanisms working

**Instrumentation validation:**

- [ ] Application logs capture key events
- [ ] Error logs include context and stack traces
- [ ] No PII or sensitive data in logs
- [ ] Correlation IDs present for request tracing

**Red flags:**

- ❌ Logging or metrics not working
- ❌ Success criteria cannot be measured
- ❌ Critical alerts not configured

---

## Section 9: Defect Management ✅

**Defects tracked and resolved:**

- [ ] All defects logged and tracked
- [ ] No critical defects open
- [ ] No high-severity defects open
- [ ] Medium/low defects resolved or deferred with justification
- [ ] Deferred defects documented with target fix version

**Defect resolution:**

- [ ] Fixed defects retested and verified
- [ ] Regression testing completed
- [ ] Defect status documented in verification brief

**Red flags:**

- ❌ Critical or high-severity defects unresolved
- ❌ Defects not tracked or documented
- ❌ Fixed defects not retested

---

## Section 10: Test Evidence & Documentation ✅

**Test results documented:**

- [ ] Verification brief completed
- [ ] All test results recorded
- [ ] Test evidence available (logs, reports, screenshots)
- [ ] Test code checked into version control
- [ ] Test artifacts linked in verification brief

**Documentation completeness:**

- [ ] Test execution plan documented (execution of Design stage test strategy)
- [ ] Test execution results recorded
- [ ] UAT sign-off captured
- [ ] Defect tracking documented
- [ ] Production readiness assessment completed

**Red flags:**

- ❌ Test results not documented
- ❌ No test evidence available
- ❌ Verification brief incomplete

---

## Section 11: Production Readiness ✅

**Ready for deployment:**

- [ ] All quality gates passed
- [ ] UAT approved
- [ ] No critical or high-severity defects
- [ ] Performance meets NFRs
- [ ] Security vulnerabilities addressed
- [ ] Monitoring and instrumentation verified

**Deployment prerequisites:**

- [ ] Deployment checklist prepared
- [ ] Rollback plan documented
- [ ] Known issues and limitations documented
- [ ] Deployment risks assessed
- [ ] Post-deployment validation plan defined

**Red flags:**

- ❌ Quality gates not passed
- ❌ UAT not approved
- ❌ Deployment checklist not prepared

---

## Section 12: Handoff Readiness ✅

**Ready to hand off to Deployment:**

- [ ] Verification brief completed and reviewed
- [ ] All sign-offs obtained (QA, Tech Lead, Product Owner)
- [ ] Deployment team notified and ready
- [ ] Deployment prerequisites documented
- [ ] Success validation criteria defined

**Handoff artifacts:**

- [ ] Verified code branch/tag identified
- [ ] Test reports available
- [ ] UAT approval documented
- [ ] Deployment checklist provided
- [ ] Monitoring dashboard links shared

**Red flags:**

- ❌ Required sign-offs missing
- ❌ Deployment team not ready
- ❌ Handoff artifacts incomplete

---

## Final Decision

### Overall Status

- [ ] ✅ **READY FOR DEPLOYMENT** - All checks passed, proceed to Deployment
      stage
- [ ] ⚠️ **READY WITH CONDITIONS** - Minor issues acceptable, conditions
      documented
- [ ] ❌ **NOT READY** - Critical issues must be resolved before deployment

### Sign-Off

- **QA Lead:** [Name]
- **Date:** [YYYY-MM-DD]
- **Status:** [✅ Ready | ⚠️ Ready with conditions | ❌ Not ready]
- **Comments:** [Any notes or concerns]

---

## Quick Troubleshooting

### Common Issues and Resolutions

**Issue: Integration tests failing**

- Resolution: Return to Implementation stage to fix code
- Don't proceed until tests are green

**Issue: UAT not approved**

- Resolution: Address UAT feedback, re-test, get re-approval
- Never deploy without business sign-off

**Issue: Performance NFRs not met**

- Resolution: Performance tuning or NFR renegotiation
- Document accepted performance if NFRs relaxed

**Issue: Security vulnerabilities**

- Resolution: Remediate critical/high before deployment
- Document accepted risk for medium/low (with approval)

**Issue: Monitoring not working**

- Resolution: Fix instrumentation before deployment
- Cannot measure success without working monitoring

---

## Appendix: Red Flags Summary

**STOP deployment if any of these are true:**

- ❌ Critical or high-severity defects unresolved
- ❌ UAT not approved by business stakeholders
- ❌ Critical or high-severity security vulnerabilities present
- ❌ Performance NFRs significantly missed without approval
- ❌ Acceptance criteria not fully tested
- ❌ Monitoring/instrumentation not working
- ❌ No rollback plan documented
- ❌ Required sign-offs missing

**Investigate further if any of these are true:**

- ⚠️ Multiple medium-severity defects deferred
- ⚠️ Test coverage below 80% of acceptance criteria
- ⚠️ Performance borderline on NFRs
- ⚠️ Medium-severity security issues accepted
- ⚠️ Limited UAT participation or feedback
- ⚠️ Test evidence sparse or missing
- ⚠️ Deployment prerequisites unclear

**Acceptable to proceed with documentation:**

- ✅ Low-severity defects deferred to future iterations
- ✅ Known limitations documented and communicated
- ✅ Acceptable risks documented with mitigation plans
- ✅ Conditional approval with clear conditions met

---

## Related Documents

- **[verification-brief-template.md](verification-brief-template.md)** - Full
  test results documentation
- **[verification-guide.md](verification-guide.md)** - Testing best practices
  and guidance
- **[STAGES.md](../../STAGES.md)** - Verification stage definition

---

**Version Notes**

Added to framework in v0.6.0
