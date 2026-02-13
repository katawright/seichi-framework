# AI-Assisted SDLC: Verification Stage Artifacts

**Framework Version:** 0.8.0
**Last Updated:** 2026-02-12

**Stage:** 5 of 7 (Verification)
**Primary Audience:** QA Engineers, Engineers
**Supporting Roles:** Product Manager, Business Analyst, DevOps
**Execution Pattern:** Iterative (per increment)

## Overview

The Verification stage validates that implemented increments work correctly
through comprehensive testing and acceptance. This stage encompasses both
**verification** (did we build it correctly?) and **validation** (did we
build the right thing?).

Verification executes iteratively—once per increment—ensuring that each
deliverable meets requirements, performs as designed, and is ready for
production deployment.

This stage is where quality is proven, not asserted. Comprehensive testing
reveals issues before production, validates that requirements are met, and
provides stakeholders with confidence to proceed.

## Purpose

Validate that the increment is ready for deployment by:
- Confirming all functional requirements are met
- Verifying acceptance criteria are satisfied
- Validating performance against non-functional requirements
- Ensuring security vulnerabilities are addressed
- Obtaining business stakeholder approval through UAT
- Proving the increment is production-ready

## Artifacts

### 1. Verification Brief Template (`verification-brief-template.md`)

A template for documenting test planning, execution, and results for each
increment.

**Sections:**
- Increment overview and scope
- Test strategy and approach
- Test environment and data setup
- Test execution results (all test types)
- Defect tracking and resolution
- UAT results and sign-off
- Production readiness assessment
- Handoff notes to Deployment stage

### 2. Verification Checklist (`verification-checklist.md`)

Quick validation (60-90 seconds) that ensures testing is complete and the
increment is ready for deployment.

**Checklist items:**
- All test types executed (integration, functional, UAT, performance,
  security)
- Acceptance criteria verified
- No critical or high-priority defects
- UAT approved by business stakeholders
- Performance meets NFRs
- Security vulnerabilities addressed
- Test evidence documented
- Deployment checklist prepared

### 3. Verification Reference (`verification-reference.md`)

Comprehensive guidance on testing strategies, approaches, and best
practices.

**Covers:**
- What verification means in this framework
- Testing pyramid and test types
- Integration testing strategies
- Functional testing against acceptance criteria
- User Acceptance Testing (UAT) process
- Performance and load testing approaches
- Security testing practices
- Accessibility testing
- Test data management
- Defect management and triage
- Production readiness criteria
- When to revisit verification

### 4. Verification AI Agent Prompt (`verification-ai-agent-prompt.md`)

An AI assistant prompt tailored for QA engineers and testers to help with
test planning, generation, and execution.

**Helps with:**
- Generating test cases from acceptance criteria
- Creating test matrices for edge cases
- Writing integration and E2E tests
- Generating test data and fixtures
- Identifying test coverage gaps
- Analyzing test results and patterns
- Drafting defect reports
- Creating UAT scripts and checklists

**⚠️ Important:** AI can generate tests and identify gaps, but humans must
validate test quality, approve test strategy, and make production readiness
decisions.

## Workflow

The typical Verification workflow for an increment:

**Legend:**
- 🤖 AI can assist
- ✋ Human approval required
- ✅ Quality gate (automated or manual check)

```
┌─ PHASE 1: TEST PLANNING (Once per increment) ──────────────────
│
│ 1. Review Requirements & Acceptance Criteria
│    - Understand increment scope
│    - Identify testable requirements
│    - Review NFRs and success criteria
│
│ 2. Define Test Strategy
│    - Select appropriate test types
│    - Plan test coverage approach
│    - Define pass/fail criteria
│    🤖 AI assists: Test coverage analysis, gap identification
│    ✋ Human approves: Test strategy and scope
│
│ 3. Prepare Test Environment & Data
│    - Set up test environments (integration, staging, UAT)
│    - Create or generate test data
│    - Configure monitoring and logging
│    🤖 AI assists: Test data generation, env setup scripts
│    ✋ Human validates: Environment readiness
│
└─────────────────────────────────────────────────────────────────
   ↓
┌─ PHASE 2: TEST EXECUTION (Iterative until pass) ───────────────
│
│ 4. Execute Integration Tests
│    - Test component interactions
│    - Validate API contracts
│    - Verify data flow end-to-end
│    🤖 AI assists: Generate/run tests, analyze failures
│    ✅ CI Gate: All integration tests pass
│
│ 5. Execute Functional Tests
│    - Test against acceptance criteria
│    - Verify business rules and workflows
│    - Test happy paths and edge cases
│    🤖 AI assists: Test generation from AC, coverage analysis
│    ✅ Quality Gate: All AC verified
│
│ 6. Execute Performance Tests
│    - Load testing against NFRs
│    - Stress testing for limits
│    - Validate response times and throughput
│    🤖 AI assists: Test script generation, results analysis
│    ✅ Quality Gate: Performance meets NFRs
│
│ 7. Execute Security Tests
│    - Vulnerability scanning (SAST, DAST)
│    - Penetration testing (if applicable)
│    - Authentication/authorization validation
│    🤖 AI assists: Test generation, vulnerability analysis
│    ✅ Quality Gate: No critical vulnerabilities
│
│ 8. Track and Resolve Defects
│    - Log defects with severity/priority
│    - Triage and assign for fixes
│    - Retest after fixes
│    🤖 AI assists: Defect clustering, impact analysis
│    ✋ Human decides: Fix vs defer, severity, priority
│    ↓
│ ↻ Return to Implementation if defects require code changes
│
└─────────────────────────────────────────────────────────────────
   ↓
   All tests passing and defects resolved
   ↓
┌─ PHASE 3: USER ACCEPTANCE & READINESS (Final validation) ──────
│
│ 9. Conduct User Acceptance Testing (UAT)
│    - Business stakeholders test in UAT environment
│    - Validate against business needs and workflows
│    - Confirm success criteria are measurable
│    🤖 AI assists: UAT scripts, test scenarios from requirements
│    ✋ Human approves: Business stakeholder UAT sign-off
│
│ 10. Validate Instrumentation & Monitoring
│     - Verify logging is working
│     - Confirm metrics collection
│     - Test alerts and dashboards
│     🤖 AI assists: Monitoring test scenarios
│     ✅ Quality Gate: Observability verified
│
│ 11. Assess Production Readiness
│     - Review all test results
│     - Confirm all quality gates passed
│     - Validate deployment prerequisites
│     - Document known issues and limitations
│     ✋ Human decides: Go/no-go for deployment
│
│ 12. Complete Verification Brief
│     - Document all test results
│     - Record defect resolution
│     - Capture UAT approval
│     - Create deployment checklist
│     🤖 AI assists: Report generation, documentation
│     ✋ Human reviews: Completeness and accuracy
│
└─────────────────────────────────────────────────────────────────
   ↓
HANDOFF TO DEPLOYMENT
```

**Key Quality Gates:**
- ✅ **CI Gate:** Automated tests pass
- ✅ **Quality Gate:** Manual validation complete
- ✋ **Human Approval:** Production readiness decision

## AI Assistance Guidance

**AI Autonomy Level:** High with CI gates

From the [AI Autonomy Scorecard](../../AI_AUTONOMY_SCORECARD.md):
- **Fit for AI:** Very High - AI excels at test generation and coverage
  analysis
- **Verifiability:** Very High - Tests are self-verifying (pass/fail)
- **Risk if Wrong:** Medium - Missed bugs require rework but not catastrophic
- **Autonomy:** AI can iterate until tests pass; humans validate test
  quality

### Where AI Excels

**Test Generation:**
- Generate integration tests from API contracts
- Create functional tests from acceptance criteria
- Build test matrices for edge cases and boundary conditions
- Generate performance test scripts
- Create security test scenarios

**Test Analysis:**
- Identify coverage gaps
- Analyze test failures and suggest fixes
- Detect test flakiness patterns
- Recommend additional test cases
- Cluster related defects

**Test Data Management:**
- Generate synthetic test data
- Create test fixtures and mocks
- Build data factories for various scenarios

### Human Responsibilities

**Strategic Decisions:**
- Approve test strategy and coverage approach
- Decide go/no-go for production deployment
- Prioritize defect fixes vs deferral
- Sign off on UAT and production readiness

**Quality Validation:**
- Review test quality (not just quantity)
- Validate that tests actually verify requirements
- Ensure security tests are comprehensive
- Confirm UAT scenarios reflect real business use

**Judgment Calls:**
- Assess acceptable risk levels
- Balance test coverage vs timeline
- Determine when testing is "good enough"
- Approve workarounds or known limitations

## Handoff from Implementation Stage

**Receives:**
- Working code on branch/environment
- Implementation brief with decisions and technical debt notes
- Unit test results
- Code review approvals
- Implementation notes

**Validation:**
- Code complete for increment scope
- Unit tests pass
- Code review approved
- Development environment functional

## Handoff to Deployment Stage

**Delivers:**
- Verified code ready for deployment
- Comprehensive test results (all test types)
- UAT approval from business stakeholders
- Defect resolution documentation
- Performance and security validation
- Deployment checklist
- Known issues and limitations documented

**Quality Checkpoint:**
All acceptance criteria met, no critical defects, UAT approved, NFRs
validated, production readiness confirmed.

## Measurement Throughline

The Verification stage validates that measurement systems work correctly:

**From Initiation:**
- Success criteria defined with measurement approach

**Verification Activities:**
- Test logging and metrics collection
- Validate dashboards and monitoring systems
- Confirm alerts trigger correctly
- Verify instrumentation captures required data
- Test success criteria measurement mechanisms

**To Deployment:**
- Verified monitoring ready for production
- Baseline measurement strategy validated
- Instrumentation confirmed working

This ensures that when the increment deploys, the team can actually measure
whether success criteria are being met.

## When to Revisit Verification

Return to Verification when:

**During Current Iteration:**
- New defects discovered during UAT
- Performance tests reveal issues
- Security vulnerabilities found
- Acceptance criteria not met
- Regression in previously passing tests

**After Deployment:**
- Production incidents reveal test gaps
- Users report bugs that tests missed
- Performance degrades under real load
- Security issues discovered in production

**For Future Iterations:**
- Update test strategy based on production learnings
- Expand test coverage for high-risk areas
- Improve test data to match production patterns
- Enhance UAT process based on stakeholder feedback

## Quick Start

1. **Start here:** Review `verification-brief-template.md`
2. **Plan tests:** Use requirements and acceptance criteria
3. **Generate tests:** Use `verification-ai-agent-prompt.md` with your AI
   tool
4. **Execute tests:** Run all test types systematically
5. **Track defects:** Log and resolve issues
6. **Conduct UAT:** Get business stakeholder approval
7. **Validate readiness:** Use `verification-checklist.md`
8. **Document results:** Complete verification brief
9. **Hand off:** Provide deployment checklist and approvals

## Related Documents

- **[STAGES.md](../../STAGES.md)** - Verification stage definition and
  criteria
- **[AI_AUTONOMY_SCORECARD.md](../../AI_AUTONOMY_SCORECARD.md)** - AI
  autonomy guidance for Verification
- **[PROJECT_CONTEXT.md](../../PROJECT_CONTEXT.md)** - Framework overview
  and measurement philosophy

## Version Notes

**Added to framework in v0.6.0** (2026-02-12)
