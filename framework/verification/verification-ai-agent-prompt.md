# AI Agent Prompt: Verification Stage

**Last Updated:** 2026-02-12

## Purpose

This prompt helps QA engineers and testers leverage AI assistance during
the Verification stage. Use this with your AI tool (ChatGPT, Claude, etc.)
to accelerate test planning, test generation, and test analysis.

**Target Audience:** QA Engineers, Test Engineers, SDETs
**Stage:** Verification (Stage 5 of 7)
**AI Autonomy Level:** High with CI gates (can iterate until tests pass;
humans validate test quality)

---

## How to Use This Prompt

**Step 1:** Copy the relevant phase prompt below and paste into your AI
tool

**Step 2:** Provide the requested context (requirements, design docs, code)

**Step 3:** Review and refine AI-generated test cases, scripts, or analysis

**Step 4:** Validate test quality (not just quantity)

**Step 5:** Execute tests and use AI to analyze results

**⚠️ Important:** AI can generate tests quickly, but humans must validate
that tests are meaningful, comprehensive, and actually verify requirements.

---

## Phase 1: Test Planning

**Objective:** Define test strategy and approach for the increment

### Prompt for AI

```
I need help planning testing for an increment. Here's the context:

**Increment:** [Brief description]

**Requirements:** [Paste requirements document or link]

**Acceptance Criteria:**
- [AC-1: Description]
- [AC-2: Description]
- [AC-3: Description]

**Non-Functional Requirements:**
- [NFR-1: Performance - response time <200ms]
- [NFR-2: Security - no critical vulnerabilities]
- [NFR-3: Scalability - support 1000 concurrent users]

**Design/Architecture:** [Paste design brief or describe architecture]

Please help me:
1. Recommend appropriate test types for this increment (integration,
   functional, performance, security, etc.)
2. Identify what should be tested vs. what can be skipped
3. Suggest test coverage approach
4. Identify potential edge cases and boundary conditions
5. Create a test matrix mapping requirements to test cases

Provide a test strategy document I can use to guide my testing effort.
```

### What AI Should Provide

**Test Strategy:**
- Recommended test types with justification
- Coverage approach and targets
- Test environment requirements
- Test data needs
- Risk areas to focus on

**Test Matrix:**
| Requirement | Test Type | Priority | Complexity | Notes |
|-------------|-----------|----------|------------|-------|
| AC-1 | Functional | High | Medium | Happy path + edge cases |
| NFR-1 | Performance | High | High | Load test required |

**Edge Cases and Boundary Conditions:**
- Input boundaries (min/max values)
- Null/empty/missing data scenarios
- Concurrency and race conditions
- Error conditions

### Example AI Interaction

**User:**
```
Increment: User Registration

Requirements:
- AC-1: Users can register with email and password
- AC-2: Email must be unique (no duplicates)
- AC-3: Password must be 8+ chars with special character
- NFR-1: Response time <200ms
- NFR-2: Passwords must be hashed (bcrypt)

Help me plan testing.
```

**AI:**
```
Test Strategy for User Registration Increment:

1. TEST TYPES RECOMMENDED:

   a) Functional Testing (HIGH PRIORITY)
      - Verify acceptance criteria AC-1, AC-2, AC-3
      - Test input validation
      - Test error messages
      - Test successful registration flow

   b) Integration Testing (HIGH PRIORITY)
      - Verify API endpoint contract
      - Test database persistence
      - Test email validation logic
      - Test password hashing integration

   c) Security Testing (HIGH PRIORITY)
      - Verify password hashing (bcrypt)
      - Test for SQL injection
      - Test for weak passwords
      - Verify no password leakage in logs/responses

   d) Performance Testing (MEDIUM PRIORITY)
      - Measure response time (target <200ms)
      - Load test: 100 concurrent registrations

   e) UAT (MEDIUM PRIORITY)
      - Business stakeholder validates flow
      - Usability of registration form

2. TEST COVERAGE APPROACH:

   Functional: 100% of acceptance criteria
   Integration: All API endpoints and database operations
   Security: OWASP Top 10 relevant items
   Performance: Critical path (registration endpoint)

3. EDGE CASES & BOUNDARY CONDITIONS:

   Email validation:
   - Empty email
   - Invalid format (no @, no domain)
   - Very long email (>255 chars)
   - Duplicate email (AC-2)
   - Email with special characters

   Password validation:
   - Empty password
   - 7 chars (below minimum)
   - 8 chars (minimum boundary)
   - Password without special char
   - Very long password (>1000 chars)
   - Password with spaces

   Error handling:
   - Database connection failure
   - Hashing function failure
   - Duplicate email concurrent requests

4. TEST MATRIX:

   [See table above]

5. TEST ENVIRONMENT NEEDS:

   - Integration environment with test database
   - Test email service (or mocked)
   - Test data: 10-20 sample users

Next steps: Generate specific test cases?
```

---

## Phase 2: Functional Test Generation

**Objective:** Generate test cases from acceptance criteria

### Prompt for AI

```
I need to generate functional test cases from acceptance criteria.

**Acceptance Criterion:**
[AC-1: Paste full acceptance criterion]

**Additional Context:**
- Input fields: [List fields]
- Expected behavior: [Describe happy path]
- Error scenarios: [Describe error cases]

Please generate:
1. Happy path test case
2. Edge case test cases
3. Error condition test cases
4. Test cases in [Gherkin/Given-When-Then/Table format]

For each test case, provide:
- Test ID
- Test scenario description
- Preconditions
- Test steps
- Expected results
- Actual results (blank)
```

### What AI Should Provide

**Test Cases in Structured Format:**

**Example (Gherkin BDD format):**
```gherkin
Feature: User Registration

  Scenario: Successful registration with valid data
    Given I am on the registration page
    When I enter email "user@example.com"
    And I enter password "SecureP@ss123"
    And I click "Register"
    Then I should see "Registration successful"
    And I should be logged in
    And I should receive a confirmation email

  Scenario: Registration fails with duplicate email
    Given a user exists with email "existing@example.com"
    When I attempt to register with email "existing@example.com"
    Then I should see error "Email already registered"
    And registration should fail

  Scenario: Registration fails with weak password
    Given I am on the registration page
    When I enter email "user@example.com"
    And I enter password "weak"
    And I click "Register"
    Then I should see error "Password must be 8+ characters with special
character"
    And registration should fail
```

**Example (Table format):**
| Test ID | Scenario | Input | Expected Result | Actual | Status |
|---------|----------|-------|-----------------|--------|--------|
| TC-001 | Valid registration | email: user@ex.com, pass: SecureP@ss | 201 Created, userId returned | | |
| TC-002 | Duplicate email | email: existing@ex.com | 409 Conflict, error message | | |
| TC-003 | Weak password | pass: "weak" | 400 Bad Request, validation error | | |

### Example AI Interaction

**User:**
```
Generate test cases for:
AC-1: Users can register with email and password
AC-2: Email must be unique
AC-3: Password must be 8+ chars with special char

Use table format.
```

**AI:**
```
[Provides comprehensive test case table with happy paths, edge cases, error
conditions]
```

---

## Phase 3: Integration Test Generation

**Objective:** Generate integration test code

### Prompt for AI

```
I need integration tests for the following API endpoint:

**Endpoint:** [e.g., POST /api/users/register]

**Request Format:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response Format (Success - 201):**
```json
{
  "userId": "string",
  "message": "Registration successful"
}
```

**Response Format (Error - 400):**
```json
{
  "error": "Validation error message"
}
```

**Technology Stack:** [e.g., Python + pytest + requests, JavaScript + Jest
+ Supertest]

**What to Test:**
- Happy path (valid input → 201)
- Invalid email → 400
- Weak password → 400
- Duplicate email → 409
- Database persistence verification

Please generate integration test code that:
1. Tests all scenarios above
2. Verifies request/response contracts
3. Checks database state after API call
4. Uses appropriate assertions
5. Follows AAA pattern (Arrange-Act-Assert)
```

### What AI Should Provide

**Integration Test Code:**

**Example (Python + pytest):**
```python
import pytest
import requests

API_BASE = "http://localhost:8080/api"

def test_successful_registration():
    # Arrange
    new_user = {
        "email": "newuser@example.com",
        "password": "SecureP@ss123"
    }

    # Act
    response = requests.post(f"{API_BASE}/users/register", json=new_user)

    # Assert
    assert response.status_code == 201
    assert "userId" in response.json()
    assert response.json()["message"] == "Registration successful"

    # Verify database persistence
    user_id = response.json()["userId"]
    db_user = get_user_from_db(user_id)
    assert db_user["email"] == "newuser@example.com"
    assert db_user["password"] != "SecureP@ss123"  # Should be hashed

def test_registration_with_duplicate_email():
    # Arrange: Create existing user
    create_user("existing@example.com", "Pass123!")

    # Act: Attempt registration with same email
    response = requests.post(
        f"{API_BASE}/users/register",
        json={"email": "existing@example.com", "password": "NewPass123!"}
    )

    # Assert
    assert response.status_code == 409
    assert "Email already registered" in response.json()["error"]

def test_registration_with_weak_password():
    # Arrange
    weak_password_user = {
        "email": "user@example.com",
        "password": "weak"
    }

    # Act
    response = requests.post(f"{API_BASE}/users/register",
json=weak_password_user)

    # Assert
    assert response.status_code == 400
    assert "Password must be 8+ characters" in response.json()["error"]

# ... more test cases
```

---

## Phase 4: Performance Test Generation

**Objective:** Generate performance test scripts

### Prompt for AI

```
I need a performance test script for:

**Endpoint:** [e.g., POST /api/users/register]

**NFRs:**
- Response time p95 < 200ms
- Throughput > 100 requests/second
- Support 1000 concurrent users

**Load Testing Tool:** [e.g., k6, JMeter, Gatling, Locust]

**Test Scenarios:**
1. Baseline load: 100 users for 5 minutes
2. Peak load: 1000 users for 5 minutes
3. Stress test: Ramp from 0 to 2000 users over 10 minutes

Please generate a load test script that:
- Simulates realistic user behavior
- Measures response time (p50, p95, p99)
- Tracks error rate
- Validates performance against NFRs
- Includes thresholds that fail test if NFRs not met
```

### What AI Should Provide

**Performance Test Script:**

**Example (k6):**
```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  scenarios: {
    baseline: {
      executor: 'constant-vus',
      vus: 100,
      duration: '5m',
    },
    peak: {
      executor: 'constant-vus',
      vus: 1000,
      duration: '5m',
      startTime: '6m',
    },
    stress: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '10m', target: 2000 },
      ],
      startTime: '12m',
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<200'],  // 95th percentile < 200ms
    http_req_failed: ['rate<0.01'],    // Error rate < 1%
    http_reqs: ['rate>100'],           // Throughput > 100 req/s
  },
};

export default function () {
  const url = 'http://api.test/users/register';

  const payload = JSON.stringify({
    email: `user${__VU}${__ITER}@example.com`,  // Unique per iteration
    password: 'SecureP@ss123!',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = http.post(url, payload, params);

  check(response, {
    'status is 201': (r) => r.status === 201,
    'response time < 200ms': (r) => r.timings.duration < 200,
    'userId returned': (r) => r.json('userId') !== undefined,
  });

  sleep(1);  // Think time between requests
}
```

---

## Phase 5: Security Test Generation

**Objective:** Generate security test scenarios

### Prompt for AI

```
I need security test scenarios for:

**Endpoint:** [e.g., POST /api/users/register]

**Security Requirements:**
- No SQL injection vulnerabilities
- No XSS vulnerabilities
- Passwords must be hashed
- No password leakage in responses or logs
- Input validation on all fields

**Technology Stack:** [e.g., Node.js + Express + PostgreSQL]

Please generate:
1. SQL injection test cases
2. XSS test cases
3. Input validation bypass attempts
4. Password security validation
5. OWASP ZAP or manual test scenarios

For each test, provide:
- Attack scenario
- Malicious payload
- Expected secure behavior
- How to verify
```

### What AI Should Provide

**Security Test Scenarios:**

```markdown
SECURITY TEST SCENARIOS: User Registration Endpoint

1. SQL INJECTION TESTS

   Test 1: SQL Injection in Email Field
   - Payload: "admin@example.com' OR '1'='1"
   - Expected: Input rejected with validation error
   - Verify: Database query uses parameterized queries, not string
concatenation
   - Command:
     curl -X POST http://api.test/users/register \
       -d '{"email": "admin@ex.com'\'' OR '\''1'\''='\''1", "password":
"Pass123!"}'

   Test 2: SQL Injection in Password Field
   - Payload: "'; DROP TABLE users; --"
   - Expected: Input accepted but treated as literal string, hashed
   - Verify: Database still exists after test

2. XSS TESTS

   Test 3: XSS in Email Field
   - Payload: "<script>alert('XSS')</script>@example.com"
   - Expected: Input rejected or sanitized
   - Verify: Response does not reflect script tag unescaped

3. PASSWORD SECURITY TESTS

   Test 4: Password Hashing Verification
   - Action: Register user, check database
   - Verify: Password field contains bcrypt hash (starts with $2b$),
not plaintext
   - SQL: SELECT password FROM users WHERE email = 'test@example.com';

   Test 5: Password Not in Response
   - Action: Register user, inspect response body
   - Verify: Response does not contain password (plaintext or hashed)

   Test 6: Password Not in Logs
   - Action: Register user, check application logs
   - Verify: Logs do not contain password

4. INPUT VALIDATION BYPASS

   Test 7: Extremely Long Email
   - Payload: "a" * 10000 + "@example.com"
   - Expected: Rejected with validation error (likely email too long)

   Test 8: Null/Missing Fields
   - Payload: {"email": null, "password": "Pass123!"}
   - Expected: 400 Bad Request with validation error

5. AUTHENTICATION BYPASS

   Test 9: Register with Existing Admin Email
   - Payload: "admin@internal.com"
   - Expected: Either rejected or creates regular user (not admin)
   - Verify: New user does not have admin privileges

RECOMMENDED TOOLS:

- OWASP ZAP: Automated vulnerability scan
- Burp Suite: Manual penetration testing
- sqlmap: SQL injection testing
- npm audit / Snyk: Dependency vulnerability scan
```

---

## Phase 6: UAT Script Generation

**Objective:** Generate user acceptance testing scripts

### Prompt for AI

```
I need UAT scripts for business stakeholders to validate:

**Increment:** [Brief description]

**Key Business Workflows:**
1. [Workflow 1 description]
2. [Workflow 2 description]

**Acceptance Criteria:**
- [AC-1]
- [AC-2]

**UAT Environment:** [URL and access details]

Please generate:
- Step-by-step UAT test scripts
- Expected outcomes at each step
- Space for notes and feedback
- Non-technical language (for business users)
- Real-world business scenarios

Format: Simple checklist-style scripts that business users can follow.
```

### What AI Should Provide

**UAT Test Scripts:**

```markdown
UAT TEST SCRIPT: User Registration Flow

Tester: _______________  Date: _______________

SCENARIO 1: New User Registration (Happy Path)

Business Goal: Verify that new customers can register for an account

Prerequisites:
- UAT environment access: https://uat.example.com
- Test email access: [Provide test email credentials]

Steps:

1. Navigate to homepage
   - Open browser and go to: https://uat.example.com
   - Expected: Homepage loads with "Register" button visible
   - Result: ☐ Pass  ☐ Fail
   - Notes: _____________________________________________

2. Click "Register" button
   - Expected: Registration form displays with email and password fields
   - Result: ☐ Pass  ☐ Fail

3. Enter your information:
   - Email: [Use your UAT test email]
   - Password: SecurePassword123!
   - Click "Register"
   - Expected: "Registration successful" message appears
   - Result: ☐ Pass  ☐ Fail

4. Check confirmation email
   - Open your test email inbox
   - Expected: Confirmation email received within 2 minutes
   - Email subject: "Welcome to [Product]"
   - Result: ☐ Pass  ☐ Fail

5. Verify you're logged in
   - Expected: You see your account dashboard or homepage as logged-in
user
   - Expected: Your email displayed in top-right corner
   - Result: ☐ Pass  ☐ Fail

Overall Scenario Result: ☐ Pass  ☐ Fail
Comments: ________________________________________________

---

SCENARIO 2: Duplicate Email Registration (Error Handling)

Business Goal: Verify system prevents duplicate account creation

Steps:

1. Attempt to register again with same email
   - Use same email from Scenario 1
   - Password: DifferentPassword456!
   - Click "Register"
   - Expected: Error message "Email already registered"
   - Expected: Registration does NOT succeed
   - Result: ☐ Pass  ☐ Fail

2. Verify you're NOT logged in as new account
   - Expected: Still logged in as original account
   - Result: ☐ Pass  ☐ Fail

Overall Scenario Result: ☐ Pass  ☐ Fail

---

SCENARIO 3: Weak Password Rejection (Security)

Business Goal: Verify system enforces strong passwords

Steps:

1. Logout from current session
   - Click "Logout"
   - Expected: Return to homepage, not logged in

2. Attempt to register with weak password
   - Email: newuser@example.com
   - Password: weak
   - Click "Register"
   - Expected: Error message about password requirements
   - Expected: Registration does NOT succeed
   - Result: ☐ Pass  ☐ Fail

Overall Scenario Result: ☐ Pass  ☐ Fail

---

UAT SIGN-OFF

All scenarios tested:  ☐ Yes  ☐ No

Overall assessment:
☐ Approve for production - System works as expected
☐ Approve with conditions - Minor issues noted below
☐ Do not approve - Critical issues must be fixed

Critical Issues Found:
_____________________________________________________________

Minor Issues/Enhancements:
_____________________________________________________________

Approver Signature: _________________  Date: _____________
```

---

## Phase 7: Test Results Analysis

**Objective:** Analyze test results and identify patterns

### Prompt for AI

```
I need help analyzing test results. Here's the data:

**Test Execution Summary:**
- Total tests: [X]
- Passed: [X]
- Failed: [X]
- Skipped: [X]

**Failed Tests:**
[Paste list of failed test names and error messages]

**Performance Test Results:**
[Paste performance metrics]

**Security Scan Results:**
[Paste vulnerability scan output]

Please help me:
1. Identify patterns in test failures (common root causes)
2. Prioritize failures by severity
3. Suggest likely root causes
4. Recommend next steps for resolution
5. Identify test coverage gaps
```

### What AI Should Provide

**Test Analysis Report:**

```markdown
TEST RESULTS ANALYSIS

SUMMARY:
- Pass Rate: 85% (170/200 tests)
- Failure Rate: 15% (30 tests)
- Critical Failures: 5
- Moderate Failures: 10
- Low-Impact Failures: 15

FAILURE PATTERN ANALYSIS:

Pattern 1: Database Connection Timeouts (12 failures)
- Affected Tests: All integration tests involving order processing
- Root Cause (likely): Database connection pool exhausted
- Evidence: Error messages show "connection timeout after 5000ms"
- Priority: HIGH
- Recommendation: Increase connection pool size or optimize queries

Pattern 2: Null Pointer Exceptions (8 failures)
- Affected Tests: User profile update scenarios
- Root Cause (likely): Missing null checks for optional fields
- Evidence: NPE on line 145 in UserService.java
- Priority: MEDIUM
- Recommendation: Add null checks or use Optional<T>

Pattern 3: Flaky Tests (10 failures)
- Affected Tests: UI automation tests
- Root Cause (likely): Race conditions, timing issues
- Evidence: Tests pass on retry
- Priority: LOW (but needs fixing)
- Recommendation: Add explicit waits, fix test stability

PRIORITIZED ACTION ITEMS:

1. CRITICAL: Fix database connection pool (blocks 12 tests)
2. HIGH: Add null checks for optional fields (blocks 8 tests)
3. MEDIUM: Investigate remaining 10 failures individually
4. LOW: Improve flaky test stability

PERFORMANCE ISSUES:

- Response time p95: 450ms (target: 200ms) - FAILED NFR
- Bottleneck: Database query on line 67 (taking 300ms)
- Recommendation: Add index on user_id column

SECURITY ISSUES:

- 2 High-severity vulnerabilities in dependencies
- 5 Medium-severity vulnerabilities
- Recommendation: Update dependencies, review medium issues

NEXT STEPS:

1. Create Jira tickets for top 3 critical issues
2. Assign database connection pool fix to [Developer]
3. Rerun tests after fixes
4. Schedule performance optimization session
```

---

## Phase 8: Defect Report Generation

**Objective:** Draft clear defect reports

### Prompt for AI

```
I found a defect during testing. Help me write a clear defect report.

**What I Observed:**
[Describe what happened]

**What I Expected:**
[Describe expected behavior]

**Steps I Took:**
[List steps to reproduce]

**Environment:**
- Test environment: [URL]
- Browser: [Chrome, Firefox, etc.]
- OS: [Windows, Mac, Linux]

**Additional Context:**
- Acceptance Criterion affected: [AC-X]
- Test case: [TC-XXX]

Please generate a defect report with:
- Clear summary
- Detailed steps to reproduce
- Expected vs actual results
- Suggested severity and priority
- Screenshots or logs (if I provide them)
```

### What AI Should Provide

**Defect Report Template:**

```markdown
DEFECT REPORT

Summary: [Clear one-line description]

Severity: [Critical / High / Medium / Low]
Priority: [P0 / P1 / P2 / P3]

DESCRIPTION:
[Detailed description of the issue]

STEPS TO REPRODUCE:
1. [Step 1]
2. [Step 2]
3. [Step 3]

EXPECTED RESULT:
[What should happen]

ACTUAL RESULT:
[What actually happened]

ENVIRONMENT:
- Test Environment: [URL]
- Browser: [Browser + version]
- OS: [Operating system]
- Test Data: [If applicable]

ACCEPTANCE CRITERION VIOLATED:
[AC-X: Description]

IMPACT:
- Users affected: [Who is impacted?]
- Workaround: [Is there a workaround?]

ADDITIONAL INFORMATION:
- Screenshots: [Attach or link]
- Logs: [Attach or link]
- Related defects: [DEF-XXX]

SUGGESTED ROOT CAUSE:
[If you have a hypothesis]
```

---

## AI Behavior Guidelines

### DO:

✅ **Generate comprehensive test cases**
- Cover happy paths, edge cases, and error conditions
- Map test cases to acceptance criteria
- Include boundary value analysis

✅ **Create realistic test data**
- Use Faker or similar for synthetic data
- Generate edge case data (nulls, empty strings, very long strings)
- Consider data diversity (different formats, locales)

✅ **Identify test coverage gaps**
- Compare acceptance criteria to test cases
- Highlight untested scenarios
- Suggest additional test types

✅ **Analyze test failures for patterns**
- Group related failures
- Identify root causes
- Prioritize by impact

✅ **Generate test code following best practices**
- Use AAA pattern (Arrange-Act-Assert)
- Clear test names
- Independent tests (no shared state)
- Proper assertions

✅ **Suggest performance optimizations**
- Identify bottlenecks in test results
- Recommend indexing, caching, query optimization
- Provide code examples

✅ **Draft security test scenarios**
- OWASP Top 10 coverage
- SQL injection, XSS, auth bypass
- Suggest remediation

### DON'T:

❌ **Don't skip edge cases**
- Generate only happy path tests
- Assume "it probably works" without testing

❌ **Don't generate meaningless tests**
- Tests that don't actually verify requirements
- Tests with no assertions
- Tests that exercise code but don't validate correctness

❌ **Don't make production readiness decisions**
- Only humans can decide go/no-go for deployment
- AI can analyze data, but humans assess risk

❌ **Don't ignore NFRs**
- Functional tests alone are insufficient
- Performance, security, accessibility must be validated

❌ **Don't generate flaky tests**
- Tests with hardcoded sleeps
- Tests dependent on execution order
- Tests with race conditions

❌ **Don't trivialize security**
- "This is probably fine" without validation
- Skip security testing because "it's just a test environment"

---

## AI Quality Checklist

Before accepting AI-generated tests, verify:

**Test Quality:**
- [ ] Tests actually verify requirements (not just exercise code)
- [ ] Tests have meaningful assertions (not just "didn't crash")
- [ ] Tests are independent (no shared state between tests)
- [ ] Tests have clear names describing what they verify
- [ ] Tests follow AAA pattern (Arrange-Act-Assert)

**Test Coverage:**
- [ ] Happy path scenarios covered
- [ ] Edge cases and boundary conditions tested
- [ ] Error conditions validated
- [ ] All acceptance criteria have corresponding tests

**Test Data:**
- [ ] Realistic test data used
- [ ] Edge case data included (nulls, empty, very long)
- [ ] No hardcoded production data or PII
- [ ] Test data cleanup handled

**Code Quality:**
- [ ] Tests are readable and maintainable
- [ ] No code duplication (use helpers/fixtures)
- [ ] Proper error handling in tests
- [ ] Tests run quickly (no unnecessary delays)

**Security:**
- [ ] Security tests cover OWASP Top 10
- [ ] Injection attacks tested
- [ ] Authentication/authorization validated
- [ ] Sensitive data protection verified

---

## Example End-to-End Interaction

**User:**
```
I need to verify the User Registration increment.

Requirements:
- AC-1: Users can register with email and password
- AC-2: Email must be unique
- AC-3: Password must be 8+ chars with special char
- NFR-1: Response time <200ms (p95)
- NFR-2: Passwords hashed with bcrypt

I need:
1. Test strategy
2. Functional test cases (Gherkin format)
3. Integration test code (Python + pytest)
4. Performance test script (k6)
5. Security test scenarios
```

**AI:**
```
[Provides comprehensive test strategy]

[Generates Gherkin BDD test scenarios]

[Creates Python pytest integration tests]

[Writes k6 performance test script]

[Outlines security test scenarios for SQL injection, XSS, password
hashing]

[Provides test execution plan and success criteria]
```

**User reviews, refines, and executes tests**

---

## Related Documents

- **[verification-brief-template.md](verification-brief-template.md)** -
  Document test results
- **[verification-checklist.md](verification-checklist.md)** - Quick
  validation before deployment
- **[verification-reference.md](verification-reference.md)** - Testing best
  practices
- **[STAGES.md](../../STAGES.md)** - Verification stage definition
- **[AI_AUTONOMY_SCORECARD.md](../../AI_AUTONOMY_SCORECARD.md)** - AI
  autonomy guidance

---

**Version Notes**

Added to framework in v0.6.0
