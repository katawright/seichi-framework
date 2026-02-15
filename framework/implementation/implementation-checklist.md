# Implementation Stage Checklist

**Last Updated:** 2026-02-11

**Purpose:** Quick validation (60-90 seconds) that implementation is complete
and ready for the Verification stage.

**How to Use:** Review each item and mark ✅ (complete), ⚠️ (needs attention),
or ❌ (not complete). All items should be ✅ before proceeding to Verification.

---

## Increment: [Increment Name]

**Date:** YYYY-MM-DD **Reviewer:** [Name]

---

## Section 1: Requirements Implementation

**All requirements for this increment are implemented:**

- [ ] All functional requirements (FRs) for this increment are implemented
- [ ] All non-functional requirements (NFRs) for this increment are addressed
- [ ] Acceptance criteria for each requirement are met
- [ ] No critical functionality is missing or incomplete

**Notes/Issues:**

- [Any concerns about completeness]

**Status:** ✅ Ready / ⚠️ Issues to address / ❌ Not ready

---

## Section 2: Code Quality

**Code meets quality standards:**

- [ ] Code follows project/team coding standards and conventions
- [ ] No obvious code smells (duplication, overly complex methods, god objects)
- [ ] Code is readable and well-structured
- [ ] SOLID principles applied where appropriate
- [ ] No hardcoded values (magic numbers/strings) - constants or config used
- [ ] Error handling is implemented for failure scenarios
- [ ] Input validation is present where needed

**Notes/Issues:**

- [Any code quality concerns]

**Status:** ✅ Ready / ⚠️ Issues to address / ❌ Not ready

---

## Section 3: Unit Testing

**Unit tests are comprehensive and passing:**

- [ ] Unit tests are written for all new code
- [ ] Test coverage meets or exceeds team threshold (typically 70-90%)
- [ ] All unit tests pass locally
- [ ] Tests cover happy path scenarios
- [ ] Tests cover edge cases and error conditions
- [ ] Tests are meaningful (not just padding for coverage)
- [ ] Test naming is clear and descriptive
- [ ] Tests are fast and don't require external dependencies (mocked/stubbed)

**Coverage Metrics:**

- Overall coverage: \_\_\_\_%
- Branch coverage: \_\_\_\_%
- Critical path coverage: \_\_\_\_%

**Notes/Issues:**

- [Any testing gaps or concerns]

**Status:** ✅ Ready / ⚠️ Issues to address / ❌ Not ready

---

## Section 4: Code Review

**Code has been reviewed and approved:**

- [ ] All PRs for this increment submitted for review
- [ ] All PRs have been approved by required reviewers
- [ ] Review feedback has been addressed across all PRs
- [ ] No unresolved comments or open threads on any PR
- [ ] Code review checklist completed by reviewer(s) for all PRs

**PR Review Status:** _(list all PRs for this increment)_

- PR #\_\_\_ - Reviewers: [Names] - Status: ✅ Approved / 🔄 In Review / ❌
  Changes Requested
- PR #\_\_\_ - Reviewers: [Names] - Status: ✅ Approved / 🔄 In Review / ❌
  Changes Requested

**Notes/Issues:**

- [Any open review items]

**Status:** ✅ Ready / ⚠️ Issues to address / ❌ Not ready

---

## Section 5: Automated Quality Checks

**All automated checks pass:**

- [ ] Linting passes (no errors) on all PRs
- [ ] Code formatting is consistent across all PRs
- [ ] Static analysis passes (if applicable) on all PRs
- [ ] Build succeeds without errors or warnings
- [ ] CI/CD pipeline passes all checks for all PRs
- [ ] Unit tests pass for all PRs (enforced pre-merge)

**Tool Results:**

- Linter: ✅ / ⚠️ / ❌ - [Tool name]
- Formatter: ✅ / ⚠️ / ❌ - [Tool name]
- Static Analysis: ✅ / ⚠️ / ❌ - [Tool name]
- Build: ✅ / ⚠️ / ❌
- Tests: ✅ / ⚠️ / ❌

**Notes/Issues:**

- [Any failing checks or warnings]
- [Note: Tests must pass before ANY PR is merged, regardless of branching
  strategy]

**Status:** ✅ Ready / ⚠️ Issues to address / ❌ Not ready

---

## Section 6: Security

**Security considerations are addressed:**

- [ ] Input validation prevents injection attacks (SQL, NoSQL, command
      injection)
- [ ] No XSS vulnerabilities (output encoding/escaping)
- [ ] Authentication and authorization are properly implemented
- [ ] Sensitive data is not logged or exposed
- [ ] Secrets are not hardcoded (use config/env variables)
- [ ] Dependencies have no known critical vulnerabilities
- [ ] Security scan passed (if applicable)

**Security Scan Results:**

- Tool: [Snyk, Checkmarx, etc.]
- Critical vulnerabilities: [Count or "None"]
- High vulnerabilities: [Count or "None"]
- Status: ✅ / ⚠️ / ❌

**Notes/Issues:**

- [Any security concerns or findings]

**Status:** ✅ Ready / ⚠️ Issues to address / ❌ Not ready

---

## Section 7: Instrumentation and Observability

**Logging, metrics, and monitoring are implemented:**

- [ ] Appropriate logging is implemented (errors, warnings, important events)
- [ ] Log messages are clear and include necessary context
- [ ] No sensitive data in logs (passwords, PII, tokens)
- [ ] Metrics/telemetry implemented for key operations
- [ ] Success criteria measurement is instrumented (if applicable)
- [ ] Performance monitoring points are in place

**Instrumentation Status:**

- Logging: ✅ / ⚠️ / ❌
- Metrics: ✅ / ⚠️ / ❌
- Success criteria tracking: ✅ / ⚠️ / ❌ / N/A

**Notes/Issues:**

- [Any instrumentation gaps]

**Status:** ✅ Ready / ⚠️ Issues to address / ❌ Not ready

---

## Section 8: Documentation

**Code and implementation are documented:**

- [ ] Code comments explain complex or non-obvious logic
- [ ] Public APIs have documentation (docstrings, JSDoc, etc.)
- [ ] README or component docs are updated (if needed)
- [ ] Implementation brief is complete
- [ ] Configuration changes are documented
- [ ] Developer setup instructions are updated (if changed)

**Documentation Status:**

- Code comments: ✅ / ⚠️ / ❌
- API documentation: ✅ / ⚠️ / ❌ / N/A
- README/docs: ✅ / ⚠️ / ❌ / N/A
- Implementation brief: ✅ / ⚠️ / ❌

**Notes/Issues:**

- [Any documentation gaps]

**Status:** ✅ Ready / ⚠️ Issues to address / ❌ Not ready

---

## Section 9: Dependencies and Integration

**Dependencies and integrations are handled:**

- [ ] New dependencies are justified and approved
- [ ] Dependency versions are pinned or constrained appropriately
- [ ] License compatibility checked for new dependencies
- [ ] External API integrations have error handling and retries
- [ ] External service failures are handled gracefully
- [ ] Integration points are tested (unit tests with mocks)

**New Dependencies:**

- [Dependency 1] - Version: **_ - License: _** - Approved: ✅ / ❌
- [Dependency 2] - Version: **_ - License: _** - Approved: ✅ / ❌

**Notes/Issues:**

- [Any dependency concerns]

**Status:** ✅ Ready / ⚠️ Issues to address / ❌ Not ready

---

## Section 10: Performance

**Performance is acceptable:**

- [ ] No obvious performance issues (O(n²) where O(n) possible, etc.)
- [ ] Database queries are optimized (indexes, no N+1 queries)
- [ ] Resource usage is reasonable (memory, CPU)
- [ ] Large data sets are handled efficiently
- [ ] Performance-critical code paths are profiled (if applicable)

**Performance Notes:**

- [Any performance concerns or measurements]

**Status:** ✅ Ready / ⚠️ Issues to address / ❌ Not ready

---

## Section 11: Error Handling and Resilience

**Errors and edge cases are handled:**

- [ ] All error conditions have appropriate handling
- [ ] User-facing error messages are clear and helpful
- [ ] System errors are logged with sufficient context
- [ ] Edge cases are handled (null values, empty collections, boundary
      conditions)
- [ ] Timeouts are set for external calls
- [ ] Retry logic implemented where appropriate

**Notes/Issues:**

- [Any error handling gaps]

**Status:** ✅ Ready / ⚠️ Issues to address / ❌ Not ready

---

## Section 12: Handoff Readiness

**Ready to hand off to Verification stage:**

- [ ] Implementation brief is filled out and complete
- [ ] All PRs for this increment are listed and tracked
- [ ] All PRs are merged to target branch (per team's branching strategy)
- [ ] Known issues and limitations are documented
- [ ] Test scenarios are documented for Verification team
- [ ] Environment setup instructions are provided
- [ ] Test data requirements are documented

**Branching Strategy Compliance:**

- [ ] Trunk-based: All PRs merged to `main` (feature flags configured if needed)
- [ ] Increment branch: All PRs merged to increment branch, ready to merge to
      `main` after Verification
- [ ] Other: [Describe completion state per team strategy]

**Handoff Documentation:**

- Implementation brief: ✅ / ⚠️ / ❌
- PR tracking: ✅ / ⚠️ / ❌
- Test guidance: ✅ / ⚠️ / ❌
- Environment setup: ✅ / ⚠️ / ❌

**Notes/Issues:**

- [Any handoff concerns]

**Status:** ✅ Ready / ⚠️ Issues to address / ❌ Not ready

---

## Overall Readiness Assessment

### Summary

**Total Sections:** 12 **Sections Ready (✅):** **_ **Sections with Issues
(⚠️):** _** **Sections Not Ready (❌):** \_\_\_

### Critical Issues

**Must be resolved before proceeding to Verification:**

1. [Issue 1 - from Section X]
2. [Issue 2 - from Section Y]

### Non-Critical Issues

**Can be addressed in future increments or documented as technical debt:**

1. [Issue 1]
2. [Issue 2]

---

## Decision

**Is this increment ready to proceed to the Verification stage?**

- [ ] ✅ **YES - Ready to proceed**
  - All critical items complete
  - Minor issues documented and acceptable
  - Team confident in handoff

- [ ] ⚠️ **PROCEED WITH CAUTION**
  - Some issues remain but not blocking
  - Issues documented and mitigation plan in place
  - Verification team aware of limitations

- [ ] ❌ **NO - Not ready**
  - Critical items incomplete
  - Must resolve issues before proceeding
  - Return to implementation

**Rationale:** [Brief explanation of decision]

---

## Sign-off

**Completed By:** [Name] **Role:** [Engineer/Tech Lead] **Date:** YYYY-MM-DD
**Signature:** [Initials]

**Reviewed By:** [Name] _(optional - Tech Lead or Senior Engineer)_ **Date:**
YYYY-MM-DD **Signature:** [Initials]

---

## Next Steps

**If Ready:**

1. Ensure all PRs merged per branching strategy:
   - Trunk-based: All merged to `main`, feature flags set appropriately
   - Increment branch: Merge increment branch to `main` (after Verification)
2. Hand off implementation brief to Verification team
3. Provide access to test environment (or `main` with feature flags)
4. Schedule increment demo (if applicable)
5. Move to Verification stage

**If Not Ready:**

1. Address critical issues identified above
2. Complete any pending PRs
3. Re-run checklist
4. Get sign-off before proceeding

---

## Appendix: Common Red Flags

Watch out for these warning signs during the checklist:

### Code Quality Red Flags

- ⚠️ Methods/functions longer than 50-100 lines
- ⚠️ Classes with more than 10 public methods
- ⚠️ Deeply nested conditionals (>3 levels)
- ⚠️ Copy-pasted code blocks
- ⚠️ Commented-out code (should be removed)

### Testing Red Flags

- ⚠️ Coverage looks good but tests don't assert anything meaningful
- ⚠️ Tests pass in isolation but fail together (test interdependence)
- ⚠️ Tests take a long time to run (should be fast)
- ⚠️ Tests are flaky (sometimes pass, sometimes fail)

### Security Red Flags

- ⚠️ SQL queries built with string concatenation
- ⚠️ User input rendered directly in HTML without escaping
- ⚠️ Authentication bypassed or incomplete
- ⚠️ Secrets visible in code or logs

### Performance Red Flags

- ⚠️ Loops inside loops (O(n²) complexity)
- ⚠️ Database queries inside loops (N+1 problem)
- ⚠️ Loading entire large datasets into memory
- ⚠️ No pagination for large result sets

---

_Added to framework in v0.5.0_
