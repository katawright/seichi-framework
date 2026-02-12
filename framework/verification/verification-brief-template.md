# Verification Brief: [Increment Name]

**Last Updated:** YYYY-MM-DD
**Increment ID:** [e.g., INC-001, Epic-42, Sprint-5-Deliverable]
**QA Lead:** [Name]
**Test Environment:** [e.g., staging.example.com, test-env-v2]

---

## Increment Overview

### Scope
**What is being verified:**
[Brief description of the increment functionality being tested]

**Requirements being validated:**
- [REQ-001: Requirement description]
- [REQ-002: Requirement description]
- [REQ-003: Requirement description]

**Acceptance Criteria (from Requirements):**
- [ ] [AC-1: Specific testable criterion]
- [ ] [AC-2: Specific testable criterion]
- [ ] [AC-3: Specific testable criterion]

### Success Criteria Being Validated
**From Initiation stage:**
- [Success criterion #1 that this increment contributes to]
  - How measured: [metric/instrumentation being validated]
- [Success criterion #2 that this increment contributes to]
  - How measured: [metric/instrumentation being validated]

---

## Test Strategy

### Test Types Selected
- [x] Integration Testing - Component interactions and API contracts
- [x] Functional Testing - Acceptance criteria validation
- [x] User Acceptance Testing (UAT) - Business stakeholder validation
- [ ] Performance Testing - Load, stress, response time (if applicable)
- [ ] Security Testing - Vulnerabilities, auth/authz (if applicable)
- [ ] Accessibility Testing - WCAG compliance (if applicable)
- [x] Monitoring Validation - Logging, metrics, alerts

**Rationale for test type selection:**
[Why these test types? Why skip others?]

### Test Coverage Approach
**What is in scope:**
- [Area 1: e.g., User authentication flows]
- [Area 2: e.g., Data persistence and retrieval]
- [Area 3: e.g., API contract compliance]

**What is out of scope:**
- [Area 1: e.g., Third-party integrations (tested separately)]
- [Area 2: e.g., UI visual design (not part of this increment)]

**Coverage targets:**
- Integration test coverage: [X% or "all public APIs"]
- Functional test coverage: [X% or "all acceptance criteria"]
- Acceptance criteria coverage: [100%]

---

## Test Environment Setup

### Environment Details
**Test environments used:**
| Environment | Purpose | URL/Access | Status |
|-------------|---------|------------|--------|
| Integration | Integration tests | [URL] | ✅ Ready |
| Staging | Functional + UAT | [URL] | ✅ Ready |
| Performance | Load testing | [URL] | ⏸ N/A |

**Configuration:**
- Database: [e.g., PostgreSQL 14, test data loaded from fixtures]
- Dependencies: [e.g., Auth service v2.1, Payment API (mocked)]
- Feature flags: [Any flags enabled/disabled for testing]

### Test Data
**Data sources:**
- [Source 1: e.g., Anonymized production snapshot from 2024-01-15]
- [Source 2: e.g., Synthetic data generated with Faker library]
- [Source 3: e.g., Edge case data manually created]

**Data preparation:**
- [How data was loaded, seeded, or generated]
- [Any data cleanup or anonymization performed]

---

## Test Execution Results

### Integration Tests
**Scope:** [What is being tested - component interactions, API contracts,
etc.]

**Test Suite:** [Name/location of test suite, e.g.,
tests/integration/user_auth_test.py]

**Results:**
- Tests executed: [X]
- Tests passed: [X]
- Tests failed: [X]
- Tests skipped: [X]
- Pass rate: [XX%]

**Status:** ✅ Passed | ⚠️ Passed with issues | ❌ Failed

**Issues identified:**
- [INT-001: Description of issue, severity, status]
- [INT-002: Description of issue, severity, status]

**Evidence:**
- Test report: [Link to CI/CD test results or saved report]
- Logs: [Location of test execution logs]

---

### Functional Tests

**Scope:** [What is being tested - acceptance criteria, business rules,
workflows]

**Test Cases:**
| Test ID | Acceptance Criterion | Test Scenario | Result | Notes |
|---------|---------------------|---------------|--------|-------|
| TC-001 | AC-1 | [Happy path scenario] | ✅ Pass | |
| TC-002 | AC-1 | [Edge case scenario] | ✅ Pass | |
| TC-003 | AC-2 | [Error handling] | ❌ Fail | See DEF-005 |
| TC-004 | AC-3 | [Boundary condition] | ✅ Pass | |

**Results Summary:**
- Tests executed: [X]
- Tests passed: [X]
- Tests failed: [X]
- Pass rate: [XX%]

**Status:** ✅ Passed | ⚠️ Passed with issues | ❌ Failed

**Issues identified:**
- [FUNC-001: Description, severity, status]
- [FUNC-002: Description, severity, status]

**Evidence:**
- Test execution log: [Link or location]
- Screenshots: [Location of test evidence]

---

### Performance Tests

**Scope:** [What is being tested - load capacity, response times, resource
usage]

**Test Scenarios:**
| Scenario | Load | Target | Actual | Result | Notes |
|----------|------|--------|--------|--------|-------|
| Baseline load | 100 req/s | <200ms p95 | 145ms | ✅ Pass | |
| Peak load | 500 req/s | <500ms p95 | 480ms | ✅ Pass | |
| Stress test | 1000 req/s | Graceful degrade | ⚠️ Some 503s | See notes |

**Results Summary:**
- Response time (p50): [Xms]
- Response time (p95): [Xms]
- Response time (p99): [Xms]
- Throughput: [X req/s]
- Error rate: [X%]

**Status:** ✅ Passed | ⚠️ Passed with issues | ❌ Failed | ⏸ Not Executed

**NFR Validation:**
- [NFR-PERF-001: Response time <200ms]: ✅ Met (145ms p95)
- [NFR-PERF-002: Support 500 concurrent users]: ✅ Met

**Issues identified:**
- [PERF-001: Description, impact, status]

**Evidence:**
- Performance test report: [Link to load testing tool results]
- Metrics: [Link to monitoring dashboard during test]

---

### Security Tests

**Scope:** [What is being tested - vulnerabilities, auth, data protection]

**Test Types Executed:**
- [ ] SAST (Static Analysis): [Tool: e.g., SonarQube, Snyk]
- [ ] DAST (Dynamic Analysis): [Tool: e.g., OWASP ZAP, Burp Suite]
- [ ] Dependency Scan: [Tool: e.g., npm audit, Dependabot]
- [ ] Penetration Testing: [Manual or tool-based]
- [ ] Authentication/Authorization Tests: [Manual test cases]

**Vulnerability Scan Results:**
| Severity | Count | Status |
|----------|-------|--------|
| Critical | [X] | [All resolved/deferred] |
| High | [X] | [All resolved/deferred] |
| Medium | [X] | [X resolved, X deferred] |
| Low | [X] | [X resolved, X deferred] |

**Status:** ✅ Passed | ⚠️ Passed with accepted risk | ❌ Failed | ⏸ Not
Executed

**NFR Validation:**
- [NFR-SEC-001: No critical vulnerabilities]: ✅ Met
- [NFR-SEC-002: Authentication required for all endpoints]: ✅ Met

**Issues identified:**
- [SEC-001: Description, CVE if applicable, severity, remediation status]
- [SEC-002: Description, severity, remediation status]

**Accepted risks:**
- [Risk description, justification, mitigation plan]

**Evidence:**
- Security scan report: [Link or location]
- Penetration test report: [Link or location]

---

### Accessibility Tests

**Scope:** [What is being tested - WCAG compliance, screen reader
compatibility]

**Standards Validated:**
- [ ] WCAG 2.1 Level A
- [ ] WCAG 2.1 Level AA
- [ ] WCAG 2.1 Level AAA
- [ ] Keyboard navigation
- [ ] Screen reader compatibility

**Test Results:**
| Test Area | Standard | Result | Issues |
|-----------|----------|--------|--------|
| Keyboard nav | WCAG 2.1.1 | ✅ Pass | None |
| Color contrast | WCAG 1.4.3 | ❌ Fail | 3 issues |
| Alt text | WCAG 1.1.1 | ✅ Pass | None |

**Status:** ✅ Passed | ⚠️ Passed with issues | ❌ Failed | ⏸ Not
Executed

**Issues identified:**
- [A11Y-001: Description, WCAG criterion, severity, status]

**Evidence:**
- Accessibility report: [Tool used: e.g., axe, WAVE]

---

### Monitoring & Instrumentation Validation

**Scope:** Verify logging, metrics, alerts, and dashboards work correctly

**Logging Validation:**
- [ ] Application logs capture key events
- [ ] Error logs include stack traces and context
- [ ] Log levels configured correctly (INFO, WARN, ERROR)
- [ ] Logs include correlation IDs for request tracing
- [ ] PII/sensitive data not logged

**Metrics Validation:**
- [ ] Success criteria metrics collected
- [ ] Performance metrics captured (response time, throughput)
- [ ] Error rates and failure modes tracked
- [ ] Resource utilization metrics available (CPU, memory, DB connections)

**Dashboard Validation:**
- [ ] Success criteria dashboards display correctly
- [ ] Real-time metrics update as expected
- [ ] Historical trends visible

**Alerting Validation:**
- [ ] Critical alerts trigger correctly
- [ ] Alert notifications delivered (email, Slack, PagerDuty)
- [ ] Alert thresholds appropriate
- [ ] Runbook links included in alerts

**Status:** ✅ Passed | ⚠️ Passed with issues | ❌ Failed

**Issues identified:**
- [MON-001: Description, impact, status]

**Evidence:**
- Sample logs: [Location or screenshots]
- Metrics screenshots: [Location]
- Alert test results: [Documentation of triggered test alerts]

---

## User Acceptance Testing (UAT)

### UAT Planning
**Business stakeholders involved:**
- [Name, Role, Availability]
- [Name, Role, Availability]

**UAT environment:** [URL and access details]

**UAT scenarios:** [X scenarios covering key business workflows]

### UAT Execution
**Test Scenarios:**
| Scenario | Business Workflow | Tester | Result | Notes |
|----------|------------------|--------|--------|-------|
| UAT-001 | [End-to-end user registration] | [Name] | ✅ Pass | |
| UAT-002 | [Login and profile update] | [Name] | ✅ Pass | |
| UAT-003 | [Error handling for invalid input] | [Name] | ❌ Fail | See feedback |

**UAT Feedback:**
- [Feedback item 1: Description, priority, disposition]
- [Feedback item 2: Description, priority, disposition]

### UAT Sign-Off
**Status:** ✅ Approved | ⚠️ Approved with conditions | ❌ Not Approved

**Sign-off details:**
- **Approver:** [Name, Role]
- **Date:** [YYYY-MM-DD]
- **Conditions (if any):** [List any conditions or caveats]
- **Comments:** [Any additional context]

**Evidence:**
- UAT test log: [Link or location]
- Sign-off email/document: [Link or location]

---

## Defect Tracking

### Defects Discovered
| ID | Description | Severity | Priority | Test Type | Status | Assignee |
|----|-------------|----------|----------|-----------|--------|----------|
| DEF-001 | [Issue description] | Critical | P0 | Functional | ✅ Fixed | [Name] |
| DEF-002 | [Issue description] | High | P1 | Integration | ✅ Fixed | [Name] |
| DEF-003 | [Issue description] | Medium | P2 | UAT | 🔄 In Progress | [Name] |
| DEF-004 | [Issue description] | Low | P3 | Security | ⏸ Deferred | [Name] |

**Severity Definitions:**
- **Critical:** Blocks core functionality, data loss, security breach
- **High:** Major functionality broken, no workaround
- **Medium:** Functionality impaired, workaround available
- **Low:** Minor issue, cosmetic, edge case

**Defect Status Summary:**
- Total defects: [X]
- Critical: [X - all fixed]
- High: [X - all fixed]
- Medium: [X fixed, X deferred]
- Low: [X fixed, X deferred]

### Deferred Defects
**Defects deferred to future iterations:**
| ID | Description | Reason for Deferral | Target Fix |
|----|-------------|-------------------|------------|
| DEF-004 | [Low-priority cosmetic issue] | Does not block deployment | v1.2 |

**Justification:** [Why is it acceptable to deploy with these deferred
defects?]

---

## Production Readiness Assessment

### Quality Gate Status
| Gate | Criteria | Status | Notes |
|------|----------|--------|-------|
| Integration Tests | All tests pass | ✅ Pass | |
| Functional Tests | All AC verified | ✅ Pass | |
| Performance Tests | NFRs met | ✅ Pass | |
| Security Tests | No critical vulns | ✅ Pass | |
| UAT | Business approval | ✅ Pass | |
| Monitoring | Instrumentation verified | ✅ Pass | |
| Defects | No critical/high open | ✅ Pass | |

**Overall Readiness:** ✅ Ready | ⚠️ Ready with conditions | ❌ Not Ready

### Known Issues and Limitations
**Known issues being deployed:**
- [Issue 1: Description, workaround, mitigation]
- [Issue 2: Description, workaround, mitigation]

**Limitations of this increment:**
- [Limitation 1: What is NOT included in this increment]
- [Limitation 2: What will come in future iterations]

### Risk Assessment
**Deployment risks:**
- [Risk 1: Description, likelihood, impact, mitigation]
- [Risk 2: Description, likelihood, impact, mitigation]

**Rollback plan:**
- [How to rollback if issues are discovered in production]
- [Rollback testing: Tested? Verified?]

---

## Handoff to Deployment Stage

### Deployment Checklist
- [ ] All tests passed or issues documented/deferred
- [ ] UAT approved by business stakeholders
- [ ] Production environment prepared
- [ ] Deployment runbook reviewed
- [ ] Rollback plan documented and tested
- [ ] Monitoring and alerting configured
- [ ] On-call support identified
- [ ] Stakeholders notified of deployment plan

### Deployment Prerequisites
**Required before deployment:**
- [Prerequisite 1: e.g., Database migration script reviewed]
- [Prerequisite 2: e.g., Feature flags configured]
- [Prerequisite 3: e.g., Third-party API keys in production env]

### Deployment Notes
**Important information for deployment team:**
- [Note 1: e.g., Deployment order - database first, then app]
- [Note 2: e.g., Expected downtime: 5 minutes]
- [Note 3: e.g., Post-deployment smoke tests to run]

### Success Validation Post-Deployment
**How to verify deployment success:**
- [ ] Health check endpoint returns 200: [URL]
- [ ] Smoke test suite passes: [Test suite location]
- [ ] No error spikes in logs
- [ ] Metrics show normal operation
- [ ] Success criteria measurements available in dashboard

**Monitoring focus areas:**
- [Metric 1 to watch: e.g., Response time should remain <200ms]
- [Metric 2 to watch: e.g., Error rate should be <0.1%]
- [Metric 3 to watch: e.g., Success criterion X should start collecting
  data]

---

## Sign-Off

### QA Sign-Off
- **QA Lead:** [Name]
- **Date:** [YYYY-MM-DD]
- **Status:** ✅ Approved for deployment | ⚠️ Approved with conditions | ❌
  Not approved
- **Comments:** [Any additional context or concerns]

### Technical Lead Sign-Off
- **Tech Lead:** [Name]
- **Date:** [YYYY-MM-DD]
- **Status:** ✅ Approved for deployment | ⚠️ Approved with conditions | ❌
  Not approved
- **Comments:** [Any additional context or concerns]

### Product Owner Sign-Off
- **Product Owner:** [Name]
- **Date:** [YYYY-MM-DD]
- **Status:** ✅ Approved for deployment | ⚠️ Approved with conditions | ❌
  Not approved
- **Comments:** [Any additional context or concerns]

---

## Appendix

### Test Artifacts
- Integration test report: [Link]
- Functional test report: [Link]
- Performance test report: [Link]
- Security scan report: [Link]
- UAT execution log: [Link]
- Defect tracking: [Link to Jira/GitHub/etc.]

### Test Code Location
- Integration tests: [Repository path]
- Functional tests: [Repository path]
- Performance tests: [Repository path]
- Test data/fixtures: [Repository path]

### Related Documents
- Implementation Brief: [Link to implementation-brief.md]
- Requirements Document: [Link to requirements-brief.md]
- Design Document: [Link to design-brief.md]
- Deployment Runbook: [To be created by Deployment team]

---

**Version Notes**

Added to framework in v0.6.0
