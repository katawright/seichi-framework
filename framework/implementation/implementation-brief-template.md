# Implementation Brief: [Increment Name]

**Last Updated:** YYYY-MM-DD

---

## Metadata

| Field                | Value                                  |
| -------------------- | -------------------------------------- |
| **Project**          | [Project Name]                         |
| **Increment**        | [Increment Number/Name]                |
| **Sprint/Iteration** | [Sprint number or date range]          |
| **Engineers**        | [Names of implementing engineers]      |
| **Start Date**       | YYYY-MM-DD                             |
| **Completion Date**  | YYYY-MM-DD                             |
| **Status**           | [In Progress / Code Review / Complete] |

---

## Progress Log

**Purpose:** Track progress across multiple sessions or engineers. Update this
after each work session.

### Session 1 (YYYY-MM-DD, [Engineer Name])

**Duration:** [Hours worked]

**Completed:**

- [What was finished this session]
- [Component/feature completed]
- [Tests written]

**In Progress:**

- [What's partially done]
- [What needs completion]

**Next Steps:**

- [What should be done next session]
- [Priority order for remaining work]

**Blockers:**

- [Issues preventing progress]
- [Questions needing answers]
- [Dependencies on other teams/work]

**Notes:**

- [Any important decisions or context]
- [Things the next person should know]

### Session 2 (YYYY-MM-DD, [Engineer Name])

**Duration:** [Hours worked]

**Completed:**

- [What was finished this session]

**In Progress:**

- [What's partially done]

**Next Steps:**

- [What should be done next session]

**Blockers:**

- [Current blockers]

**Notes:**

- [Important context]

_Add more session entries as needed_

---

## Current Status Summary

**Overall Progress:** [X%] complete

**Completed Components:**

- ✅ [Component 1] - Fully implemented and tested
- ✅ [Component 2] - Code review approved

**In Progress:**

- 🔄 [Component 3] - 60% complete, tests pending
- 🔄 [Component 4] - Started, needs error handling

**Not Started:**

- ⏳ [Component 5] - Blocked by [reason]
- ⏳ [Component 6] - Planned for next session

**Open Questions:**

- ❓ [Question 1 needing product/stakeholder input]
- ❓ [Question 2 needing architectural decision]

---

## Pull Requests

**Branching Strategy:** [Trunk-based / Increment branch / Other - see AGENTS.md]
**Target Branch:** [main / develop / feature/increment-name] **PR Size
Guideline:** [Team's target, e.g., <400 lines]

### PR Breakdown

_For small increments with a single PR, this section can be simplified to just
list the one PR. For larger increments, list all PRs._

| PR # | Description                   | Lines Changed | Status       | Link           |
| ---- | ----------------------------- | ------------- | ------------ | -------------- |
| #123 | Data models and migrations    | ~150          | ✅ Merged    | [PR #123](url) |
| #124 | Business logic and validation | ~280          | ✅ Merged    | [PR #124](url) |
| #125 | API endpoints and serializers | ~320          | 🔄 In Review | [PR #125](url) |
| #126 | Calculation service           | ~220          | 📝 Draft     | [PR #126](url) |

**Status Legend:**

- ✅ Merged - PR approved and merged to target branch
- 🔄 In Review - Submitted, awaiting approval
- 📝 Draft - Work in progress, not ready for review
- ⏳ Planned - Not yet started

**Testing Requirements:**

- [ ] All PRs have passing unit tests before merge
- [ ] Pre-commit hooks enforced (if applicable)
- [ ] CI/CD checks passing for all merged PRs

**Notes:**

- All PRs must be merged before proceeding to Verification stage
- For trunk-based: PRs merge to `main`, feature flags hide incomplete work
- For increment branch: PRs merge to increment branch, then to `main` after
  Verification

---

## Increment Overview

### Requirements Implemented

List the requirements from the Requirements Brief that this increment
implements:

| Requirement ID | Description         | Acceptance Criteria Met |
| -------------- | ------------------- | ----------------------- |
| FR-X           | [Brief description] | ✅ / ⚠️ / ❌            |
| FR-Y           | [Brief description] | ✅ / ⚠️ / ❌            |
| NFR-Z          | [Brief description] | ✅ / ⚠️ / ❌            |

**Legend:**

- ✅ Fully implemented and tested
- ⚠️ Partially implemented or known limitations
- ❌ Not implemented (deferred or descoped)

### Scope Summary

**What was built:**

- [Key feature/component 1]
- [Key feature/component 2]
- [Key feature/component 3]

**What was NOT built (if relevant):**

- [Descoped item 1 with reason]
- [Deferred item 2 with reason]

---

## Implementation Approach

### Overall Strategy

Describe the high-level approach to implementing this increment:

- How did you approach the implementation?
- What was the implementation order (which components first)?
- Were there any significant deviations from the design?

### Key Implementation Decisions

Document important decisions made during implementation. Use the "reasonable
engineer test": if a reasonable engineer might later ask "why this approach
instead of alternatives?", create an ADR.

**Decision documentation approach:**

- **Significant decisions with trade-offs** → Create ADR and link from table
  below
- **Minor, obvious, or standard practice decisions** → Document inline below

**Significant Decisions (ADRs):**

| #   | Decision         | Type                                 | ADR Link                                | Date       |
| --- | ---------------- | ------------------------------------ | --------------------------------------- | ---------- |
| 1   | [Decision title] | [Pattern/Architecture/Algorithm/etc] | [ADR-001](adr/ADR-001-decision-slug.md) | YYYY-MM-DD |
| 2   | [Decision title] | [Type]                               | [ADR-002](adr/ADR-002-decision-slug.md) | YYYY-MM-DD |

_If no significant decisions required separate ADRs, note "No separate ADRs
created for this increment."_

**Minor Decisions (inline documentation):**

- [Decision 1]: [Brief explanation - e.g., "Used factory pattern for test
  fixtures (standard team practice)"]
- [Decision 2]: [Brief explanation - e.g., "Set connection pool to 20 (team
  default for this tier)"]
- [Decision 3]: [Brief explanation]

_If all decisions required ADRs, note "All significant decisions documented in
ADRs above."_

**ADR Creation Guideline:** Create an ADR when:

- Multiple viable approaches were considered
- Trade-offs were weighed between options
- A reasonable engineer might ask: "Why this instead of option A or B?"
- Decision has non-obvious consequences
- You want to prevent future debates about re-doing the decision
- **Decision:**
- **Rationale:**
- **Alternatives Considered:**
- **Trade-offs:**

_Add more decisions as needed_

---

## Code Structure and Organization

### New Files/Modules Created

List significant new files, modules, or components:

| File/Module               | Purpose   | Lines of Code (approx) |
| ------------------------- | --------- | ---------------------- |
| `src/module/component.py` | [Purpose] | ~XXX                   |
| `src/module/service.py`   | [Purpose] | ~XXX                   |
| `tests/test_component.py` | [Purpose] | ~XXX                   |

### Modified Files

List files significantly modified (not every file, just major changes):

| File/Module              | Changes Made             | Reason        |
| ------------------------ | ------------------------ | ------------- |
| `src/existing/module.py` | [Description of changes] | [Why changed] |
| `config/settings.py`     | [Description of changes] | [Why changed] |

### Component Architecture

Describe how the code is organized:

- What are the main components or modules?
- How do they interact?
- Are there any new abstractions or layers?

```
[Optional: ASCII diagram or description of component relationships]

Example:
Controller → Service → Repository → Database
     ↓
  Validator
```

---

## Unit Testing Strategy

### Test Coverage

| Metric                     | Value | Target | Status       |
| -------------------------- | ----- | ------ | ------------ |
| **Overall Coverage**       | XX%   | 80%+   | ✅ / ⚠️ / ❌ |
| **Branch Coverage**        | XX%   | 75%+   | ✅ / ⚠️ / ❌ |
| **Critical Path Coverage** | XX%   | 100%   | ✅ / ⚠️ / ❌ |

**Coverage Report:** [Link to coverage report or attach screenshot]

### Test Organization

Describe how tests are organized:

- Unit test structure (per file, per class, per feature?)
- Test file naming convention
- Test data/fixtures approach
- Mock strategy for external dependencies

### Key Test Scenarios

List the main categories of tests written:

1. **Happy path tests**
   - [Scenario 1]
   - [Scenario 2]

2. **Edge case tests**
   - [Edge case 1]
   - [Edge case 2]

3. **Error handling tests**
   - [Error scenario 1]
   - [Error scenario 2]

4. **Integration points**
   - [Integration test 1]
   - [Integration test 2]

### Test Gaps (if any)

**Areas not fully covered by unit tests:**

- [Gap 1 with reason: e.g., requires full integration environment]
- [Gap 2 with reason: e.g., will be covered in E2E tests]

**Plan to address:**

- How will these gaps be covered? (Integration tests, manual testing, future
  work)

---

## Instrumentation and Observability

### Logging Implemented

**Log Levels Used:**

- **ERROR:** [What triggers error logs?]
- **WARN:** [What triggers warning logs?]
- **INFO:** [What informational logs are captured?]
- **DEBUG:** [What debug logs are available?]

**Key Log Events:** | Event | Log Message Format | Purpose |
|-------|-------------------|---------| | User action |
`User {id} performed {action}` | Audit trail | | Error condition |
`Failed to {operation}: {error}` | Debugging | | Performance |
`Operation {name} took {duration}ms` | Monitoring |

### Metrics Collected

**Custom Metrics Implemented:** | Metric Name | Type | Purpose | Related Success
Criteria | |-------------|------|---------|------------------------| |
`api_request_duration` | Histogram | Track response times | NFR-3 (performance)
| | `feature_usage_count` | Counter | Track feature adoption | Success metric:
user engagement | | `error_rate` | Counter | Monitor failures | Success metric:
reduce errors by 30% |

### Monitoring and Alerts

**Dashboards:**

- [Link to dashboard 1: e.g., Performance dashboard]
- [Link to dashboard 2: e.g., Error tracking dashboard]

**Alerts Configured:**

- [Alert 1: e.g., Error rate exceeds threshold]
- [Alert 2: e.g., Response time SLA breach]

### Success Criteria Instrumentation

**How success criteria from Initiation are measured:**

| Success Criteria | Measurement Approach | Implementation Details |
| ---------------- | -------------------- | ---------------------- |
| [Criterion 1]    | [How measured]       | [What was implemented] |
| [Criterion 2]    | [How measured]       | [What was implemented] |

---

## Code Review

### Review Process

- **Reviewers:** [Names of reviewers]
- **Review Date(s):** YYYY-MM-DD
- **Review Tool:** [GitHub PR, GitLab MR, etc.]
- **Review Link:** [Link to PR/MR]

### Review Outcomes

**Approval Status:**

- ✅ Approved by [Reviewer 1] on YYYY-MM-DD
- ✅ Approved by [Reviewer 2] on YYYY-MM-DD

### Key Feedback and Actions

**Significant feedback from code review:**

1. **[Feedback topic 1]**
   - **Comment:** [What was the feedback?]
   - **Action Taken:** [How was it addressed?]
   - **Status:** Resolved / Deferred / Documented as tech debt

2. **[Feedback topic 2]**
   - **Comment:**
   - **Action Taken:**
   - **Status:**

### Code Quality Checks

| Check                | Status  | Notes                                |
| -------------------- | ------- | ------------------------------------ |
| **Linting**          | ✅ / ❌ | [Tool: ESLint, Pylint, etc.]         |
| **Formatting**       | ✅ / ❌ | [Tool: Prettier, Black, etc.]        |
| **Static Analysis**  | ✅ / ❌ | [Tool: SonarQube, CodeClimate, etc.] |
| **Security Scan**    | ✅ / ❌ | [Tool: Snyk, Checkmarx, etc.]        |
| **Dependency Check** | ✅ / ❌ | [Tool: npm audit, safety, etc.]      |

---

## Known Issues and Limitations

### Known Bugs

**Critical/High Priority:**

- [Bug 1 description]
  - **Impact:** [How does it affect functionality?]
  - **Workaround:** [Is there a workaround?]
  - **Plan:** [When/how will it be fixed?]

**Medium/Low Priority:**

- [Bug 2 description]
  - **Impact:**
  - **Plan:**

### Limitations

**Functional Limitations:**

- [Limitation 1: e.g., Feature X only supports scenario Y, not Z]
  - **Reason:** [Why is this limited?]
  - **Future Plan:** [Will this be addressed later?]

**Performance Limitations:**

- [Limitation 2: e.g., Performs well for N users, may need optimization for 10N]
  - **Current Performance:** [What are the numbers?]
  - **Threshold:** [When does it become a problem?]

### Technical Debt Incurred

**Deliberate Technical Debt:** | Debt Item | Reason Incurred | Impact | Paydown
Plan | |-----------|----------------|--------|--------------| | [Debt 1] | [Why
we took this shortcut] | [What's the cost?] | [When/how to fix] | | [Debt 2] |
[Reason] | [Impact] | [Plan] |

**Accidental Technical Debt:**

- [Item discovered during implementation that needs refactoring]
  - **Why it's debt:** [Explanation]
  - **Priority:** High / Medium / Low
  - **Plan:** [When to address]

---

## Dependencies and Integration Points

### External Dependencies

**New dependencies added:**

| Dependency     | Version | Purpose     | License        | Security Review |
| -------------- | ------- | ----------- | -------------- | --------------- |
| [package-name] | vX.Y.Z  | [Why added] | [License type] | ✅ / ⚠️ / ❌    |

**Dependency Concerns:**

- [Any security vulnerabilities, maintenance concerns, or license issues?]

### Integration Points

**External APIs/Services:** | Service | Integration Type | Authentication |
Error Handling | |---------|-----------------|----------------|----------------|
| [Service 1] | REST API | API Key | Retry with exponential backoff | | [Service
2] | Message queue | OAuth 2.0 | Dead letter queue |

**Internal Service Dependencies:**

- [Service/component 1] - [How is it used?]
- [Service/component 2] - [How is it used?]

---

## Documentation

### Code Documentation

**Documentation completed:**

- ✅ / ❌ API documentation (docstrings, JSDoc, etc.)
- ✅ / ❌ README updates for new components
- ✅ / ❌ Architecture diagram updates (if applicable)
- ✅ / ❌ Configuration documentation
- ✅ / ❌ Deployment notes

**Documentation Locations:**

- API docs: [Link or location]
- Component READMEs: [Link or location]
- Other: [Link or location]

### Developer Notes

**Important information for future developers:**

- [Note 1: e.g., Why a particular approach was used]
- [Note 2: e.g., Known gotchas or quirks]
- [Note 3: e.g., Configuration requirements]

---

## Performance and Security

### Performance Considerations

**Performance tested?**

- ✅ / ❌ / ⚠️ Load tested (basic)
- ✅ / ❌ / ⚠️ Profiled for bottlenecks
- ✅ / ❌ / ⚠️ Optimized critical paths

**Performance Results (if measured):** | Operation | Metric | Result | Target |
Status | |-----------|--------|--------|--------|--------| | [Operation 1] |
Response time | XXms | <YYms | ✅ / ⚠️ / ❌ | | [Operation 2] | Throughput | XX
req/sec | >YY req/sec | ✅ / ⚠️ / ❌ |

**Performance Concerns:**

- [Any known performance issues or areas needing optimization?]

### Security Considerations

**Security review checklist:**

- ✅ / ❌ Input validation implemented
- ✅ / ❌ Authentication/authorization checked
- ✅ / ❌ No SQL injection vulnerabilities
- ✅ / ❌ No XSS vulnerabilities
- ✅ / ❌ No sensitive data in logs
- ✅ / ❌ Secrets stored securely (not hardcoded)
- ✅ / ❌ HTTPS/TLS enforced where needed

**Security Concerns:**

- [Any security considerations or risks identified?]

**Security Scan Results:**

- Tool used: [e.g., Snyk, Checkmarx]
- Critical vulnerabilities: [Count or "None"]
- High vulnerabilities: [Count or "None"]
- Action plan: [How are vulnerabilities being addressed?]

---

## Handoff to Verification Stage

### What's Ready for Testing

**Completed and ready for integration testing:**

- ✅ [Feature/component 1]
- ✅ [Feature/component 2]
- ✅ [Feature/component 3]

**Partially completed (if any):**

- ⚠️ [Component X] - [What's incomplete and why]

### Testing Guidance

**Key test scenarios for Verification team:**

1. **[Test scenario 1]**
   - **How to test:** [Steps or approach]
   - **Expected result:** [What should happen]
   - **Known issues:** [Any quirks or limitations]

2. **[Test scenario 2]**
   - **How to test:**
   - **Expected result:**
   - **Known issues:**

### Environment Setup

**How to set up test environment:**

- [Step 1: e.g., Database migrations to run]
- [Step 2: e.g., Configuration changes needed]
- [Step 3: e.g., Test data to load]

**Environment-specific notes:**

- [Any special considerations for dev/staging/test environments]

### Test Data Requirements

**Test data needed for verification:**

- [Data set 1: e.g., Sample user accounts]
- [Data set 2: e.g., Test transactions]
- [Data location: Where test data is stored or how to generate it]

---

## Acceptance Criteria Verification

### Requirements Traceability

Map each requirement to its implementation and tests:

| Requirement ID | Implementation                     | Unit Tests                          | Ready for Verification? |
| -------------- | ---------------------------------- | ----------------------------------- | ----------------------- |
| FR-X           | `module/component.py` (line XX-YY) | `test_component.py::test_feature_x` | ✅                      |
| FR-Y           | `module/service.py` (line XX-YY)   | `test_service.py::test_feature_y`   | ✅                      |
| NFR-Z          | [Implementation approach]          | [Test approach]                     | ✅                      |

### Acceptance Criteria Sign-off

**Self-assessment by implementation team:**

For each requirement, confirm acceptance criteria are met:

**FR-X: [Requirement Description]**

- AC1: [Criterion 1] - ✅ / ⚠️ / ❌
- AC2: [Criterion 2] - ✅ / ⚠️ / ❌
- **Notes:** [Any clarifications or limitations]

**FR-Y: [Requirement Description]**

- AC1: [Criterion 1] - ✅ / ⚠️ / ❌
- AC2: [Criterion 2] - ✅ / ⚠️ / ❌
- **Notes:**

---

## Lessons Learned

### What Went Well

- [Success 1: e.g., AI code generation accelerated boilerplate development]
- [Success 2: e.g., Design was clear and easy to implement]
- [Success 3: e.g., Pair programming caught issues early]

### What Could Be Improved

- [Challenge 1: e.g., Design didn't account for edge case X]
- [Challenge 2: e.g., Testing took longer than expected]
- [Challenge 3: e.g., Dependencies had undocumented breaking changes]

### Recommendations for Future Increments

- [Recommendation 1: e.g., Add more design detail for complex interactions]
- [Recommendation 2: e.g., Allocate more time for dependency investigation]
- [Recommendation 3: e.g., Set up test data earlier in the process]

---

## Sign-off

### Implementation Team

| Role              | Name   | Sign-off Date | Signature            |
| ----------------- | ------ | ------------- | -------------------- |
| **Lead Engineer** | [Name] | YYYY-MM-DD    | [Initials/Signature] |
| **Engineer**      | [Name] | YYYY-MM-DD    | [Initials/Signature] |
| **Code Reviewer** | [Name] | YYYY-MM-DD    | [Initials/Signature] |

### Readiness Declaration

**The implementation team declares:**

- ✅ All requirements for this increment are implemented
- ✅ Unit tests are written and passing
- ✅ Code review is complete and approved
- ✅ Code quality standards are met
- ✅ Documentation is complete
- ✅ Code is ready for integration testing in the Verification stage

**Date:** YYYY-MM-DD

---

## Appendices

### Appendix A: Git Commit History

**Branch name:** [feature/increment-name]

**Key commits:**

- [Commit SHA] - [Commit message]
- [Commit SHA] - [Commit message]

**Merge commit:** [SHA and date merged to main/develop]

### Appendix B: Deployment Notes

**Special deployment considerations:**

- [Database migrations required]
- [Configuration changes needed]
- [Environment variables to set]
- [Feature flags to enable/disable]

### Appendix C: Rollback Plan

**How to roll back this increment if issues found in production:**

1. [Step 1: e.g., Disable feature flag X]
2. [Step 2: e.g., Revert to previous deployment]
3. [Step 3: e.g., Run rollback migration]

---

**Version History:**

- vX.X.X (YYYY-MM-DD) - [Brief description of major changes to this brief]

---

**Template Last Updated:** 2026-02-14

_Added to framework in v0.5.0_
