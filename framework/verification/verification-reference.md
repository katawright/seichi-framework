# Verification Stage Reference

**Last Updated:** 2026-02-12

## Table of Contents

1. [What is Verification?](#what-is-verification)
2. [Verification vs. Validation](#verification-vs-validation)
3. [Testing Pyramid](#testing-pyramid)
4. [Test Types](#test-types)
5. [Integration Testing](#integration-testing)
6. [Functional Testing](#functional-testing)
7. [User Acceptance Testing (UAT)](#user-acceptance-testing-uat)
8. [Performance Testing](#performance-testing)
9. [Security Testing](#security-testing)
10. [Accessibility Testing](#accessibility-testing)
11. [Test Data Management](#test-data-management)
12. [Defect Management](#defect-management)
13. [Production Readiness](#production-readiness)
14. [When to Revisit Verification](#when-to-revisit-verification)

---

## What is Verification?

In this framework, **Verification** is the stage where we prove that an
increment works correctly before deploying it to production. This stage
answers two critical questions:

1. **Verification:** Did we build it correctly? (Meets technical specs)
2. **Validation:** Did we build the right thing? (Meets business needs)

### Purpose

The Verification stage serves multiple purposes:

**Quality Assurance:**
- Catch defects before production
- Validate requirements are met
- Ensure NFRs are satisfied
- Verify acceptance criteria

**Risk Reduction:**
- Test edge cases and error conditions
- Validate security and performance
- Prove system reliability
- Identify integration issues

**Stakeholder Confidence:**
- Demonstrate working functionality
- Validate business value delivered
- Obtain sign-off from business users
- Prove production readiness

**Measurement Validation:**
- Verify instrumentation works
- Confirm success criteria are measurable
- Test monitoring and alerting
- Validate dashboards and reporting

### Verification in the SDLC

**Execution Pattern:** Iterative (per increment)

Verification executes once per increment, after Implementation and before
Deployment. Unlike unit testing (which happens during Implementation),
Verification focuses on integration, system-level testing, and business
validation.

**Inputs from Implementation:**
- Working code on branch/environment
- Unit test results (already passing)
- Implementation brief
- Code review approvals

**Outputs to Deployment:**
- Verified code ready for release
- Comprehensive test results
- UAT approval from business
- Production readiness assessment
- Deployment checklist

---

## Verification vs. Validation

These terms are often used interchangeably, but they have distinct meanings:

### Verification: "Are we building it correctly?"

**Focus:** Technical correctness
**Question:** Does the system behave according to specifications?
**Activities:**
- Integration testing
- Functional testing against acceptance criteria
- Performance testing against NFRs
- Security testing

**Stakeholders:** Engineers, QA Engineers

**Example verification questions:**
- Do all API endpoints return correct status codes?
- Does the system handle 1000 concurrent users?
- Are all edge cases covered?
- Does error handling work as designed?

### Validation: "Are we building the right thing?"

**Focus:** Business value
**Question:** Does the system solve the user's problem?
**Activities:**
- User Acceptance Testing (UAT)
- Business workflow validation
- Usability testing
- Success criteria validation

**Stakeholders:** Product Managers, Business Analysts, End Users

**Example validation questions:**
- Can users complete their tasks efficiently?
- Does the feature solve the business problem?
- Is the user experience acceptable?
- Will this achieve the success criteria?

### Both in Verification Stage

The Verification stage encompasses **both verification and validation**. We
test technical correctness AND business value before deployment.

---

## Testing Pyramid

The testing pyramid is a strategy for balancing different types of tests.
It shows the ideal distribution of testing effort:

```
                      /\
                     /  \
                    /E2E \              ← Few, slow, expensive
                   /------\
                  /        \
                 /          \
                /Integration \         ← Some, moderate speed/cost
               /--------------\
              /                \
             /                  \
            /    Unit Tests      \    ← Many, fast, cheap
           /----------------------\
```

### Unit Tests (Base of Pyramid)

**Scope:** Individual functions, methods, classes
**Speed:** Very fast (milliseconds)
**Cost:** Low (easy to write and maintain)
**Executed:** During Implementation stage
**Coverage:** 70-90% code coverage

**Characteristics:**
- Test single units in isolation
- Mock external dependencies
- Fast execution (entire suite in seconds)
- High volume (hundreds or thousands)

**Already done:** Unit tests are written and passing during Implementation.
Verification stage focuses on higher-level testing.

### Integration Tests (Middle of Pyramid)

**Scope:** Component interactions, API contracts, data flow
**Speed:** Moderate (seconds to minutes)
**Cost:** Moderate (setup requires test environments/data)
**Executed:** During Verification stage
**Coverage:** Key integration points and contracts

**Characteristics:**
- Test components working together
- Real or mocked external dependencies
- Moderate execution time (minutes)
- Moderate volume (dozens to hundreds)

**Focus:** Verify components integrate correctly and data flows end-to-end.

### End-to-End (E2E) Tests (Top of Pyramid)

**Scope:** Complete user workflows, system-wide scenarios
**Speed:** Slow (minutes to hours)
**Cost:** High (brittle, complex to maintain)
**Executed:** During Verification stage
**Coverage:** Critical user paths only

**Characteristics:**
- Test entire system as a user would
- Real system, real data, real dependencies
- Slow execution (hours for full suite)
- Low volume (a few critical paths)

**Focus:** Validate critical business workflows work end-to-end.

### Why This Shape?

**More unit tests because:**
- Fast feedback during development
- Easy to write and maintain
- Pinpoint exact failures
- Enable rapid iteration

**Fewer E2E tests because:**
- Slow to run (bottleneck in CI/CD)
- Brittle (break often, hard to diagnose)
- Expensive to maintain
- Overlap with lower-level tests

**Strategy:** Push testing down the pyramid. Test at the lowest level that
provides confidence.

---

## Test Types

The Verification stage includes multiple test types, each serving a
different purpose:

### Integration Testing

**Purpose:** Verify components work together correctly

**What to test:**
- API contract compliance
- Component interactions
- Database integration
- Message queue integration
- Third-party service integration

**Tools:**
- API testing: Postman, REST Assured, Supertest
- Database: TestContainers, in-memory databases
- Messaging: Embedded brokers, test fixtures

**See:** [Integration Testing](#integration-testing) section below

### Functional Testing

**Purpose:** Verify acceptance criteria and business rules

**What to test:**
- Each acceptance criterion
- Business logic and workflows
- Input validation and error handling
- Edge cases and boundary conditions

**Tools:**
- Test frameworks: JUnit, pytest, Jest, RSpec
- BDD tools: Cucumber, SpecFlow, Behave

**See:** [Functional Testing](#functional-testing) section below

### User Acceptance Testing (UAT)

**Purpose:** Validate business stakeholders can use the system

**What to test:**
- End-to-end business workflows
- Real-world scenarios
- User experience and usability
- Business value delivery

**Participants:** Product Managers, Business Analysts, End Users

**See:** [User Acceptance Testing](#user-acceptance-testing-uat) section
below

### Performance Testing

**Purpose:** Validate system meets performance NFRs

**What to test:**
- Response time under load
- Throughput capacity
- Resource utilization
- Scalability limits

**Types:**
- Load testing: Expected production load
- Stress testing: Beyond expected load
- Spike testing: Sudden traffic increases
- Soak testing: Sustained load over time

**See:** [Performance Testing](#performance-testing) section below

### Security Testing

**Purpose:** Identify vulnerabilities and validate security controls

**What to test:**
- Known vulnerabilities (SAST, DAST)
- Authentication and authorization
- Input validation and injection attacks
- Data protection and encryption

**Types:**
- Static analysis (SAST)
- Dynamic analysis (DAST)
- Dependency scanning
- Penetration testing

**See:** [Security Testing](#security-testing) section below

### Accessibility Testing

**Purpose:** Ensure system is usable by people with disabilities

**What to test:**
- WCAG compliance (A, AA, AAA)
- Keyboard navigation
- Screen reader compatibility
- Color contrast and visual design

**Tools:** axe, WAVE, Lighthouse, NVDA, JAWS

**See:** [Accessibility Testing](#accessibility-testing) section below

### Regression Testing

**Purpose:** Ensure new changes don't break existing functionality

**What to test:**
- Previously working features
- Core user workflows
- High-risk areas

**Strategy:** Automated test suites from previous iterations

**When:** After bug fixes, before deployment

---

## Integration Testing

Integration testing verifies that components work together correctly. This
is distinct from unit testing (single components in isolation) and E2E
testing (entire system).

### What to Test

**API Contracts:**
- Request/response formats match specification
- Status codes correct (200, 404, 500, etc.)
- Headers and authentication tokens
- Error responses well-formed

**Component Interactions:**
- Service A → Service B communication works
- Data passed correctly between components
- Error handling across boundaries
- Timeouts and retry logic

**Database Integration:**
- ORM mappings correct
- Queries return expected data
- Transactions work correctly
- Constraints enforced (foreign keys, unique, not null)

**Third-Party Integrations:**
- External API calls work
- Authentication flows (OAuth, API keys)
- Webhook handling
- Graceful degradation when services unavailable

### Integration Testing Strategies

**Strategy 1: Component Pairs (Incremental Integration)**
- Test A → B
- Test B → C
- Test A → B → C

**Pros:** Isolates integration issues to specific boundaries
**Cons:** May miss system-level issues

**Strategy 2: Vertical Slice (Feature-Based)**
- Test entire feature flow (API → Service → Database)
- One feature at a time

**Pros:** Tests realistic scenarios
**Cons:** Harder to isolate failures

**Strategy 3: Critical Path (Risk-Based)**
- Test high-risk integration points first
- Focus on external dependencies

**Pros:** Finds most important issues fast
**Cons:** May miss edge cases

### Best Practices

**Use Test Containers:**
- Spin up real databases, message brokers
- Avoids mocking complex interactions
- More realistic than in-memory alternatives

**Example (Java + Testcontainers):**
```java
@Container
PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:14");

@Test
void testDatabaseIntegration() {
    // Test against real Postgres
    DataSource ds = createDataSource(postgres.getJdbcUrl());
    // ... test code
}
```

**Mock External Services:**
- Use WireMock, MockServer, or similar
- Avoid hitting real third-party APIs in tests
- Test error scenarios (500s, timeouts)

**Test Error Paths:**
- What happens if database connection fails?
- What if third-party API returns 500?
- How do timeouts and retries behave?

**Verify Idempotency:**
- Can you retry requests safely?
- Do duplicate messages cause issues?

### Integration Test Example (REST API)

**Scenario:** Test user registration flow (API → Service → Database)

```python
def test_user_registration_integration():
    # Arrange: Prepare test data
    new_user = {
        "username": "testuser",
        "email": "test@example.com",
        "password": "SecurePass123!"
    }

    # Act: Call API endpoint
    response = requests.post(
        "http://api.test/users/register",
        json=new_user
    )

    # Assert: Verify response
    assert response.status_code == 201
    assert "userId" in response.json()

    # Assert: Verify database persistence
    user_id = response.json()["userId"]
    db_user = db.query("SELECT * FROM users WHERE id = ?", user_id)
    assert db_user["username"] == "testuser"
    assert db_user["email"] == "test@example.com"
    assert db_user["password"] != "SecurePass123!"  # Should be hashed
```

**What this tests:**
- API contract (201 status, userId in response)
- Service layer (user creation logic)
- Database integration (user persisted correctly)
- Security (password hashed, not stored plaintext)

---

## Functional Testing

Functional testing validates that the system meets functional requirements
and acceptance criteria. This is where you prove the system does what the
business needs.

### What to Test

**Acceptance Criteria:**
- Every acceptance criterion from Requirements stage
- Happy path scenarios
- Alternative flows
- Edge cases

**Business Rules:**
- Domain logic and calculations
- Workflow state transitions
- Authorization and permissions
- Data validation rules

**User Workflows:**
- Complete user journeys
- Multi-step processes
- Role-based scenarios

### Test Design Strategies

**Strategy 1: Equivalence Partitioning**

Divide input space into equivalence classes and test one from each class.

**Example:** Age validation (must be 18-65)
- Valid: 25 (one test from 18-65)
- Invalid low: 10 (one test from 0-17)
- Invalid high: 70 (one test from 66+)
- Invalid: -5, "abc" (invalid types)

**Strategy 2: Boundary Value Analysis**

Test at boundaries where bugs often lurk.

**Example:** Age validation (18-65)
- Boundaries: 17, 18, 65, 66
- Minimize interior tests

**Strategy 3: Decision Table Testing**

For complex business rules with multiple conditions.

**Example:** Loan approval (income, credit score, employment)

| Income | Credit | Employment | Approved? |
|--------|--------|------------|-----------|
| High   | Good   | Stable     | ✅ Yes    |
| High   | Poor   | Stable     | ❌ No     |
| Low    | Good   | Stable     | ⚠️ Review |
| ...    | ...    | ...        | ...       |

Test each row as a scenario.

**Strategy 4: State Transition Testing**

For workflows with states (e.g., order: draft → submitted → approved →
fulfilled).

**Test:**
- Valid transitions
- Invalid transitions
- State-specific actions

### Behavior-Driven Development (BDD)

BDD tools (Cucumber, SpecFlow) express tests in natural language tied to
acceptance criteria.

**Example (Gherkin syntax):**
```gherkin
Feature: User Registration

  Scenario: Successful registration with valid data
    Given I am on the registration page
    When I enter username "john_doe"
    And I enter email "john@example.com"
    And I enter password "SecurePass123!"
    And I click "Register"
    Then I should see "Registration successful"
    And I should receive a confirmation email
    And I should be logged in
```

**Benefits:**
- Tests are readable by non-technical stakeholders
- Direct mapping to acceptance criteria
- Living documentation

**When to use BDD:**
- Stakeholders want visibility into test scenarios
- Acceptance criteria are clearly written
- Team values documentation as tests

### Best Practices

**Map Tests to Acceptance Criteria:**

Every acceptance criterion should have at least one test.

**Traceability matrix:**
| AC ID | Acceptance Criterion | Test ID | Status |
|-------|---------------------|---------|--------|
| AC-1  | User can register   | TC-001  | ✅ Pass |
| AC-2  | Email confirmation  | TC-002  | ✅ Pass |

**Test Happy Paths and Error Paths:**
- Happy path: Everything works as expected
- Error paths: Validation failures, business rule violations, timeouts

**Use Realistic Data:**
- Avoid "foo", "bar", "test@test.com"
- Use realistic names, emails, addresses
- Helps catch real-world issues

**Keep Tests Independent:**
- Each test should set up and tear down its own data
- Tests should not depend on execution order
- Enables parallel execution

**Verify, Don't Just Exercise:**
- **Bad:** Call API, check it doesn't crash
- **Good:** Call API, verify exact response structure and values

---

## User Acceptance Testing (UAT)

User Acceptance Testing is where business stakeholders validate that the
system meets their needs and is ready for production use.

### Purpose of UAT

**Business Validation:**
- Confirm system solves the business problem
- Validate workflows match real-world usage
- Ensure user experience is acceptable
- Verify business value is delivered

**Final Quality Gate:**
- Last chance to catch issues before production
- Business stakeholders own the go/no-go decision
- Formal sign-off required

**Confidence Building:**
- Stakeholders see the system working
- Users feel ownership of the solution
- Reduces post-deployment surprises

### UAT vs Other Testing

**UAT is NOT:**
- Functional testing (that's QA's job)
- Bug finding (most bugs should be found earlier)
- Exploratory testing (though that may happen)

**UAT IS:**
- Business process validation
- Usability assessment
- Real-world scenario confirmation
- Business sign-off

### UAT Process

**1. UAT Planning**

**Identify UAT participants:**
- Product Managers
- Business Analysts
- Power users or subject matter experts
- End users (if possible)

**Define UAT scenarios:**
- Based on key business workflows
- Represent real-world usage
- Cover critical features in this increment

**Prepare UAT environment:**
- Should mimic production
- Realistic data (anonymized if needed)
- Access for all UAT participants

**2. UAT Preparation**

**Create UAT scripts:**
- Step-by-step instructions
- Expected outcomes clearly stated
- Space for notes and feedback

**Example UAT script:**
```
Scenario: Process a customer order

1. Navigate to Orders → New Order
   Expected: New order form displays

2. Search for customer "Acme Corp"
   Expected: Customer appears in search results

3. Select customer and add items:
   - Product: Widget A, Quantity: 10
   - Product: Widget B, Quantity: 5
   Expected: Items added to order with correct pricing

4. Apply discount code "SUMMER2024"
   Expected: 10% discount applied to total

5. Submit order
   Expected: Order confirmation displays with order number

6. Verify order email sent to customer
   Expected: Email received within 2 minutes

Pass? ✅ Yes | ❌ No
Notes: _____________________________________________
```

**Provide UAT training:**
- Walk through UAT process
- Show how to use UAT environment
- Explain how to provide feedback

**3. UAT Execution**

**Business users test scenarios:**
- Follow UAT scripts
- Try real-world workflows
- Note any issues or concerns

**QA observes and supports:**
- Answer questions
- Help troubleshoot
- Document feedback

**Log UAT feedback:**
- Issues discovered
- Usability concerns
- Enhancement requests

**4. UAT Resolution**

**Triage UAT feedback:**
- **Must fix:** Blocks business use, must resolve before deployment
- **Should fix:** Important but workarounds exist
- **Nice to have:** Enhancement for future iteration

**Fix must-fix issues:**
- Return to Implementation if needed
- Retest after fixes
- Re-run UAT scenarios

**Document decisions:**
- What was fixed
- What was deferred
- What was accepted as-is

**5. UAT Sign-Off**

**Obtain formal approval:**
- Business stakeholder reviews UAT results
- Confirms system is acceptable for production
- Signs off on deployment

**Sign-off includes:**
- Approver name and title
- Date of approval
- Any conditions or caveats
- Outstanding known issues

**Example:**
```
UAT Sign-Off

Approved by: Jane Smith, VP Product
Date: 2024-02-12
Status: ✅ Approved for deployment

Conditions:
- Known issue with export to PDF (workaround documented)
- Mobile view enhancement deferred to v1.2

Comments: System meets business requirements. Ready for production.
```

### UAT Best Practices

**Involve Real Users:**
- Not just QA pretending to be users
- Actual business stakeholders who will use the system

**Focus on Business Value:**
- Can users accomplish their goals?
- Is the workflow efficient?
- Does it solve the problem?

**Realistic Scenarios:**
- Based on real business processes
- Use realistic data
- Test in production-like environment

**Time-Box UAT:**
- Set clear UAT period (e.g., 3 days)
- Avoid indefinite testing
- Balance thoroughness with timeline

**Document Everything:**
- UAT scenarios
- Test results
- Feedback and resolutions
- Formal sign-off

**Manage Scope Creep:**
- UAT will surface new ideas
- Document for future iterations
- Don't expand scope mid-UAT

### Common UAT Challenges

**Challenge: Stakeholders too busy**
- Solution: Schedule dedicated UAT time, align with business cycles

**Challenge: UAT becomes feature requests**
- Solution: Clear scope definition, defer enhancements to backlog

**Challenge: Unrealistic expectations**
- Solution: Set expectations early, review acceptance criteria

**Challenge: No clear sign-off owner**
- Solution: Identify approver during Requirements stage

**Challenge: UAT environment doesn't match production**
- Solution: Invest in production-like staging environment

---

## Performance Testing

Performance testing validates that the system meets non-functional
requirements for speed, scalability, and reliability under load.

### Why Performance Testing Matters

**User Experience:**
- Slow systems frustrate users
- Latency impacts conversion rates
- Performance is a feature

**Cost Management:**
- Identify resource bottlenecks before production
- Right-size infrastructure
- Avoid over-provisioning

**Risk Mitigation:**
- Discover scalability limits
- Understand failure modes under stress
- Plan capacity for growth

### Types of Performance Tests

**Load Testing:**
- **Purpose:** Validate system under expected production load
- **Scenario:** Simulate typical user traffic
- **Example:** 1000 concurrent users, 100 requests/second
- **Pass Criteria:** Response time <200ms (p95), error rate <0.1%

**Stress Testing:**
- **Purpose:** Find breaking point and failure modes
- **Scenario:** Gradually increase load until system fails
- **Example:** Ramp from 0 to 10,000 users over 30 minutes
- **Pass Criteria:** Graceful degradation, no data corruption

**Spike Testing:**
- **Purpose:** Validate handling of sudden traffic increases
- **Scenario:** Sudden jump in load (e.g., Black Friday sale)
- **Example:** 100 users → 5000 users in 10 seconds
- **Pass Criteria:** Auto-scaling kicks in, no failures

**Soak Testing (Endurance):**
- **Purpose:** Detect memory leaks and resource exhaustion
- **Scenario:** Sustained load over extended period
- **Example:** 500 users continuously for 24 hours
- **Pass Criteria:** No degradation over time, no memory leaks

### Performance Testing Process

**1. Define Performance NFRs**

From Requirements and Design stages:
- Response time targets (p50, p95, p99)
- Throughput requirements (requests/sec)
- Concurrent user capacity
- Resource limits (CPU, memory, database connections)

**Example NFRs:**
- 95th percentile response time < 200ms
- Support 10,000 concurrent users
- API throughput > 1000 req/sec
- Database query time < 50ms

**2. Select Test Scenarios**

**User-centric scenarios:**
- Login and authentication
- Search and browse
- Create/update/delete operations
- Checkout or critical workflows

**System-centric scenarios:**
- API endpoints under load
- Database query performance
- Cache effectiveness
- Resource utilization

**3. Prepare Test Environment**

**Environment should:**
- Match production configuration
- Use production-like data volume
- Include all dependencies (databases, caches, services)

**Don't test against:**
- Developer laptops
- Shared staging with other tests running
- Environments with different configs than production

**4. Create Test Scripts**

**Tools:**
- **JMeter:** Java-based, open source, full-featured
- **Gatling:** Scala-based, developer-friendly, code-as-tests
- **k6:** JavaScript-based, modern, cloud-native
- **Locust:** Python-based, easy scripting, distributed load

**Example (k6 script):**
```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 100 },  // Ramp up to 100 users
    { duration: '5m', target: 100 },  // Stay at 100 users
    { duration: '2m', target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<200'], // 95% of requests < 200ms
    http_req_failed: ['rate<0.01'],   // <1% error rate
  },
};

export default function () {
  let response = http.get('https://api.test/users/123');

  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200,
  });

  sleep(1);
}
```

**5. Execute Performance Tests**

**Run tests multiple times:**
- Warm-up runs (let caches populate)
- Baseline runs (establish normal performance)
- Load/stress runs (push the limits)

**Monitor during tests:**
- Application metrics (response time, error rate)
- System metrics (CPU, memory, disk I/O)
- Database metrics (query time, connection pool, slow queries)

**6. Analyze Results**

**Key metrics to analyze:**

**Response Time:**
- Median (p50): Typical user experience
- 95th percentile (p95): Worse-case for most users
- 99th percentile (p99): Outliers

**Throughput:**
- Requests per second sustained
- Peak throughput achieved

**Error Rate:**
- Percentage of failed requests
- Types of errors (timeouts, 500s, connection failures)

**Resource Utilization:**
- CPU usage (should be <80% sustained)
- Memory usage (watch for leaks)
- Database connections (not saturating pool)

**Identify bottlenecks:**
- Slow database queries
- Un-indexed tables
- N+1 query problems
- Missing caching
- Inefficient algorithms

**7. Optimize and Retest**

Common optimizations:
- Add database indexes
- Implement caching (Redis, Memcached)
- Optimize queries (reduce JOINs, add LIMIT)
- Enable HTTP compression
- Use CDN for static assets
- Horizontal scaling (add more instances)

Retest after optimizations to verify improvements.

### Performance Testing Best Practices

**Define Clear Pass/Fail Criteria:**
- Based on NFRs from Requirements stage
- Measurable thresholds
- Document before testing

**Test Realistic Scenarios:**
- Mimic actual user behavior
- Include think time (users pause between actions)
- Vary request patterns

**Use Production-Like Data:**
- Data volume matters (1000 vs 1,000,000 records)
- Data distribution affects query performance
- Seed databases with representative data

**Isolate Tests:**
- No other activity on test environment
- Consistent starting state
- Control variables

**Monitor Everything:**
- Application logs and metrics
- System resources
- Database performance
- Network latency

**Test Early and Often:**
- Don't wait until the end
- Performance test each increment
- Catch regressions early

---

## Security Testing

Security testing identifies vulnerabilities and validates that security
controls are properly implemented.

### Why Security Testing Matters

**Risk Management:**
- Prevent data breaches
- Protect user privacy
- Maintain trust
- Avoid regulatory fines

**Cost of Breaches:**
- Data breach costs average $4.45M (IBM 2023)
- Regulatory fines (GDPR, CCPA)
- Reputation damage
- Customer churn

**Compliance:**
- Many industries require security testing (healthcare, finance)
- Regulations mandate protection of sensitive data

### Types of Security Testing

**Static Application Security Testing (SAST):**
- **What:** Analyze source code for vulnerabilities
- **When:** During Implementation and Verification
- **Tools:** SonarQube, Checkmarx, Fortify, Semgrep
- **Finds:** SQL injection, XSS, hardcoded secrets, insecure crypto

**Dynamic Application Security Testing (DAST):**
- **What:** Test running application for vulnerabilities
- **When:** During Verification (integration/staging environments)
- **Tools:** OWASP ZAP, Burp Suite, Acunetix
- **Finds:** Auth bypass, injection attacks, misconfigurations

**Dependency Scanning:**
- **What:** Check third-party libraries for known vulnerabilities
- **When:** Continuously (CI/CD), during Verification
- **Tools:** Snyk, npm audit, OWASP Dependency-Check, Dependabot
- **Finds:** CVEs in dependencies

**Penetration Testing:**
- **What:** Simulated attack by security professionals
- **When:** Major releases, annually, after significant changes
- **Performed by:** External security firm or internal red team
- **Finds:** Real-world attack vectors, chained vulnerabilities

### Security Testing Checklist

**Authentication:**
- [ ] Passwords stored securely (bcrypt, Argon2)
- [ ] Password strength requirements enforced
- [ ] Account lockout after failed attempts
- [ ] Multi-factor authentication (if required)
- [ ] Session tokens secure (HttpOnly, Secure, SameSite)
- [ ] Password reset flows secure (token expiration, no user enumeration)

**Authorization:**
- [ ] Access controls enforced server-side
- [ ] Principle of least privilege
- [ ] No horizontal privilege escalation (user A can't access user B's data)
- [ ] No vertical privilege escalation (user can't access admin functions)
- [ ] Direct object reference protected (e.g., /api/users/123 requires
  ownership check)

**Input Validation:**
- [ ] All user input validated
- [ ] Input sanitized before use
- [ ] File uploads restricted (type, size, content validation)
- [ ] No SQL injection (parameterized queries)
- [ ] No XSS (output escaping)
- [ ] No command injection
- [ ] No path traversal (e.g., ../../etc/passwd)

**Data Protection:**
- [ ] Sensitive data encrypted in transit (HTTPS/TLS)
- [ ] Sensitive data encrypted at rest (database, backups)
- [ ] PII protected (GDPR, CCPA compliance)
- [ ] Secrets management (no hardcoded keys, use secret managers)
- [ ] Secure key storage (AWS KMS, HashiCorp Vault)

**API Security:**
- [ ] Authentication required for all endpoints
- [ ] Rate limiting to prevent abuse
- [ ] Input validation on all parameters
- [ ] CORS configured correctly
- [ ] API keys rotated regularly
- [ ] No sensitive data in URLs or logs

**Security Headers:**
- [ ] Content-Security-Policy (CSP)
- [ ] X-Content-Type-Options: nosniff
- [ ] X-Frame-Options: DENY or SAMEORIGIN
- [ ] Strict-Transport-Security (HSTS)
- [ ] X-XSS-Protection (legacy browsers)

### Common Vulnerabilities (OWASP Top 10 2021)

**1. Broken Access Control**
- Users can access resources they shouldn't
- **Test:** Try accessing other users' data

**2. Cryptographic Failures**
- Weak encryption or missing encryption
- **Test:** Check TLS config, data at rest encryption

**3. Injection**
- SQL, NoSQL, command injection
- **Test:** Try malicious input ('; DROP TABLE users; --)

**4. Insecure Design**
- Fundamental security flaws in design
- **Test:** Threat modeling, security reviews

**5. Security Misconfiguration**
- Default credentials, unnecessary features enabled
- **Test:** Check for default passwords, debug modes

**6. Vulnerable and Outdated Components**
- Using libraries with known CVEs
- **Test:** Dependency scanning (npm audit, Snyk)

**7. Identification and Authentication Failures**
- Weak password policies, session management
- **Test:** Try brute force, session fixation

**8. Software and Data Integrity Failures**
- Insecure CI/CD, unsigned updates
- **Test:** Verify signatures, check CI/CD security

**9. Security Logging and Monitoring Failures**
- Not logging security events, not monitoring
- **Test:** Verify security events are logged and alerted

**10. Server-Side Request Forgery (SSRF)**
- Attacker can make server request arbitrary URLs
- **Test:** Try making server request internal/external URLs

### Security Testing Tools

**SAST (Static Analysis):**
- **SonarQube:** Code quality + security
- **Semgrep:** Fast, customizable rules
- **Bandit:** Python security linter
- **Brakeman:** Ruby on Rails security scanner

**DAST (Dynamic Analysis):**
- **OWASP ZAP:** Open source, full-featured
- **Burp Suite:** Professional pentesting tool
- **Nuclei:** Fast vulnerability scanner

**Dependency Scanning:**
- **Snyk:** Commercial, great UX
- **npm audit / yarn audit:** Built-in for JavaScript
- **OWASP Dependency-Check:** Multi-language, open source
- **Dependabot:** GitHub-integrated, auto-PRs

**Secret Scanning:**
- **TruffleHog:** Find secrets in git history
- **git-secrets:** Prevent committing secrets
- **GitHub Secret Scanning:** Built-in for GitHub repos

### Security Testing in CI/CD

**Shift-left security:** Find vulnerabilities early in development.

**CI/CD integration:**
```yaml
# Example GitHub Actions workflow
- name: SAST scan
  run: semgrep scan --config=auto

- name: Dependency scan
  run: npm audit --audit-level=high

- name: Secret scan
  run: trufflehog filesystem .

- name: DAST scan
  run: zap-baseline.py -t https://staging.api.test
```

**Fail builds on critical issues:**
- Critical or high-severity vulnerabilities block deployment
- Medium/low logged for triage

### Handling Vulnerabilities

**1. Triage**

Assess severity using CVSS (Common Vulnerability Scoring System):
- **Critical (9.0-10.0):** Immediate action required
- **High (7.0-8.9):** Fix before deployment
- **Medium (4.0-6.9):** Fix or document accepted risk
- **Low (0.1-3.9):** Fix when convenient

**2. Remediate**

- **Patch:** Update vulnerable dependency
- **Workaround:** Change code to avoid vulnerability
- **Mitigate:** Add controls (WAF, rate limiting)
- **Accept risk:** Document and get approval (for low-severity only)

**3. Retest**

- Verify fix resolves vulnerability
- Check for regressions
- Rescan with same tool

**4. Document**

- Vulnerability details (CVE, description)
- Severity and impact
- Remediation steps
- Retest results

---

## Accessibility Testing

Accessibility testing ensures that people with disabilities can use your
system. This is both a legal requirement (ADA, Section 508) and a moral
imperative.

### Why Accessibility Matters

**Legal Compliance:**
- ADA (Americans with Disabilities Act)
- Section 508 (US federal agencies)
- European Accessibility Act
- Lawsuits and fines for non-compliance

**Market Reach:**
- 15% of global population has some disability (WHO)
- Aging populations (declining vision, motor skills)
- Temporary disabilities (broken arm, eye surgery)

**Better UX for Everyone:**
- Keyboard navigation helps power users
- High contrast helps in bright sunlight
- Captions help in noisy environments

### WCAG Standards

**Web Content Accessibility Guidelines (WCAG) 2.1**

**Three levels:**
- **Level A:** Minimum (basic accessibility)
- **Level AA:** Mid-range (target for most sites)
- **Level AAA:** Highest (not always achievable)

**Most organizations target Level AA.**

**Four principles (POUR):**

**1. Perceivable**
- Information must be presentable in ways users can perceive
- Examples: Alt text for images, captions for videos, color contrast

**2. Operable**
- UI components must be operable
- Examples: Keyboard navigation, no time limits, no seizure-inducing
  content

**3. Understandable**
- Information and operation must be understandable
- Examples: Readable text, predictable behavior, input assistance

**4. Robust**
- Content must work with current and future technologies
- Examples: Valid HTML, semantic markup, ARIA labels

### Common Accessibility Issues

**Missing Alt Text:**
- Screen readers can't describe images
- **Fix:** Add alt attribute to all images

**Poor Color Contrast:**
- Low vision users can't read text
- **Fix:** Ensure 4.5:1 contrast ratio for normal text, 3:1 for large text

**No Keyboard Navigation:**
- Users can't navigate without mouse
- **Fix:** Ensure all interactive elements are keyboard-accessible (Tab,
  Enter, Space)

**Missing Labels:**
- Screen readers can't identify form fields
- **Fix:** Use <label> elements or aria-label

**Inaccessible Forms:**
- No error messages or validation feedback
- **Fix:** Associate error messages with fields, provide clear instructions

**Broken Heading Structure:**
- Screen readers rely on headings for page structure
- **Fix:** Use h1, h2, h3 in logical order (no skipping levels)

**Inaccessible Modals/Dialogs:**
- Focus not trapped, can't close with keyboard
- **Fix:** Trap focus within modal, allow Esc to close

### Accessibility Testing Tools

**Automated Scanners:**
- **axe DevTools:** Browser extension, catches ~30% of issues
- **WAVE:** Visual feedback on page
- **Lighthouse:** Built into Chrome DevTools
- **Pa11y:** Command-line tool, CI integration

**Limitations:** Automated tools catch 30-40% of issues. Manual testing
required.

**Manual Testing:**
- **Keyboard navigation:** Can you use the entire site with just keyboard?
- **Screen reader testing:** NVDA (Windows, free), JAWS (Windows, paid),
  VoiceOver (Mac, built-in)
- **Zoom testing:** Can you zoom to 200% without breaking layout?
- **Color contrast:** Use tools to measure contrast ratios

**Browser Extensions:**
- **axe DevTools:** Comprehensive WCAG checker
- **WAVE:** Visual overlay showing issues
- **Color Contrast Analyzer:** Check text contrast

### Accessibility Testing Process

**1. Automated Scan**

Run automated tools to catch obvious issues:
```bash
# Run axe scan
axe https://staging.app.test --tags wcag2aa

# Run Pa11y
pa11y https://staging.app.test --standard WCAG2AA
```

**2. Keyboard Navigation Test**

- [ ] Tab through all interactive elements
- [ ] All elements reachable
- [ ] Focus indicator visible
- [ ] Tab order logical
- [ ] Can activate buttons/links with Enter/Space
- [ ] Can close modals with Esc
- [ ] No keyboard traps

**3. Screen Reader Test**

- [ ] All images have alt text
- [ ] Headings structure is logical
- [ ] Form labels announced correctly
- [ ] Error messages announced
- [ ] Dynamic content changes announced (ARIA live regions)
- [ ] Links have descriptive text (not "click here")

**4. Visual Test**

- [ ] Color contrast meets WCAG AA (4.5:1 normal, 3:1 large)
- [ ] Information not conveyed by color alone
- [ ] Text resizable to 200% without breaking layout
- [ ] Page usable at 400% zoom (WCAG 2.1 reflow)

**5. Document Findings**

| Issue | WCAG Criterion | Severity | Impact | Fix |
|-------|---------------|----------|--------|-----|
| Missing alt text on logo | 1.1.1 | High | Screen reader users don't know it's logo | Add alt="Company Logo" |
| Low contrast on buttons | 1.4.3 | High | Low vision users can't read text | Increase contrast to 4.5:1 |

### Accessibility Best Practices

**Use Semantic HTML:**
- `<button>` not `<div onclick>`
- `<nav>`, `<main>`, `<aside>` for landmarks
- `<label>` for form fields

**Provide Text Alternatives:**
- Alt text for images
- Captions for videos
- Transcripts for audio

**Ensure Keyboard Accessibility:**
- All interactive elements keyboard-accessible
- Visible focus indicators
- Logical tab order

**Design for Sufficient Contrast:**
- 4.5:1 for normal text
- 3:1 for large text (18pt+ or 14pt+ bold)

**Test with Real Users:**
- Automated tools and developers miss issues
- Users with disabilities provide invaluable feedback

---

## Test Data Management

Test data is critical for realistic, repeatable testing. Poor test data
leads to flaky tests and missed bugs.

### Test Data Strategies

**Strategy 1: Production Data (Anonymized)**

**Pros:**
- Realistic data distribution
- Edge cases from real world
- Large data volumes

**Cons:**
- Privacy concerns (must anonymize PII)
- Data drift (production changes over time)
- Large datasets slow tests

**When to use:** Performance testing, realistic integration tests

**How to anonymize:**
- Hash or encrypt PII
- Replace names with fake data
- Mask email addresses
- Zero out financial data

**Strategy 2: Synthetic Data**

**Pros:**
- Full control over data
- No privacy concerns
- Can create edge cases

**Cons:**
- May not reflect production patterns
- Effort to generate realistic data

**When to use:** Functional testing, UAT

**Tools:**
- **Faker** (Python, JavaScript, Ruby): Generate fake names, addresses,
  emails
- **Factory patterns:** Define data factories with defaults and overrides

**Example (Python with Faker):**
```python
from faker import Faker
fake = Faker()

def create_test_user():
    return {
        "username": fake.user_name(),
        "email": fake.email(),
        "first_name": fake.first_name(),
        "last_name": fake.last_name(),
        "address": fake.address(),
    }
```

**Strategy 3: Fixture Files**

**Pros:**
- Consistent test data
- Version controlled
- Easy to share

**Cons:**
- Manual maintenance
- Can become stale

**When to use:** Small datasets, specific test scenarios

**Example (JSON fixture):**
```json
{
  "users": [
    {"id": 1, "username": "testuser1", "email": "test1@example.com"},
    {"id": 2, "username": "testuser2", "email": "test2@example.com"}
  ]
}
```

**Strategy 4: Builders/Factories**

**Pros:**
- Flexible (override defaults as needed)
- Type-safe (compile-time checks)
- Reusable across tests

**Cons:**
- Upfront effort to create factories

**When to use:** Unit and integration tests

**Example (Java with Factory):**
```java
User user = UserFactory.builder()
    .username("testuser")
    .email("test@example.com")
    .role(Role.ADMIN)
    .build();
```

### Test Data Best Practices

**Isolate Test Data:**
- Each test creates its own data
- No shared data between tests
- Tests don't depend on execution order

**Clean Up After Tests:**
- Delete test data after test completes
- Use database transactions (rollback after test)
- Use test containers (destroy after test)

**Version Control Fixtures:**
- Check fixture files into git
- Treat as code (review changes)
- Document fixture purpose

**Automate Data Generation:**
- Use data generation tools
- Scripts to populate test databases
- CI/CD integration

**Separate Test Databases:**
- Don't test against production database
- Use dedicated test database
- Or use in-memory databases for speed

---

## Defect Management

Defect management is the process of tracking, prioritizing, and resolving
issues discovered during testing.

### Defect Lifecycle

```
[New] → [Triaged] → [Assigned] → [In Progress] → [Fixed] → [Verified] →
[Closed]
                ↓
             [Deferred] → [Backlog]
                ↓
             [Won't Fix]
```

**New:** Defect reported, not yet reviewed
**Triaged:** Severity and priority assigned
**Assigned:** Developer assigned to fix
**In Progress:** Developer actively fixing
**Fixed:** Developer claims fixed, awaiting verification
**Verified:** QA confirms fix, issue resolved
**Closed:** Final state, defect resolved
**Deferred:** Will fix in future iteration
**Won't Fix:** Not a defect, or not worth fixing

### Severity vs. Priority

**Severity:** Impact of the defect (technical)
**Priority:** Urgency of fix (business)

**Severity Levels:**
- **Critical:** System unusable, data loss, security breach
- **High:** Major functionality broken, no workaround
- **Medium:** Functionality impaired, workaround exists
- **Low:** Minor issue, cosmetic, edge case

**Priority Levels:**
- **P0:** Fix immediately, blocks deployment
- **P1:** Fix before deployment
- **P2:** Fix soon, but can deploy
- **P3:** Fix when convenient

**Examples:**
| Defect | Severity | Priority | Rationale |
|--------|----------|----------|-----------|
| Production database deleted | Critical | P0 | Data loss, immediate fix required |
| Admin can't access logs | High | P1 | Blocks admin work, fix before deploy |
| Typo in footer | Low | P3 | Cosmetic, fix when convenient |
| Edge case crashes app | High | P2 | Rare, but severe; workaround exists |

### Writing Good Defect Reports

**A good defect report includes:**

**1. Summary**
- Clear, concise description
- **Good:** "Login fails with special characters in password"
- **Bad:** "Login broken"

**2. Steps to Reproduce**
- Detailed, step-by-step
- Anyone should be able to reproduce

**Example:**
```
Steps to Reproduce:
1. Navigate to /login
2. Enter username: testuser
3. Enter password: P@$$w0rd! (note special characters)
4. Click "Login" button

Expected Result: User logged in successfully
Actual Result: Error message "Invalid password format"
```

**3. Environment Details**
- OS, browser, version
- Test environment URL
- Any relevant configuration

**4. Severity and Priority**
- Assess impact and urgency
- Use consistent definitions

**5. Screenshots/Logs**
- Visual evidence
- Error logs or stack traces
- Network requests (HAR files)

**6. Additional Context**
- Related defects
- Acceptance criteria violated
- Requirements impacted

### Defect Triage Process

**Daily or weekly triage meetings:**
- Review new defects
- Assign severity and priority
- Assign to developers
- Set target fix version

**Triage decisions:**
- **Fix now:** Blocks deployment, must resolve
- **Fix before deployment:** High priority, schedule in sprint
- **Defer:** Not blocking, add to backlog for future iteration
- **Won't fix:** Not a defect, or cost > benefit

**Triage criteria:**
- Severity and priority
- Impact on users
- Effort to fix
- Risk of regression
- Business value

### Defect Tracking Tools

**Jira:**
- Most common in enterprises
- Integrates with Confluence, Bitbucket
- Customizable workflows

**GitHub Issues:**
- Simple, integrated with code
- Good for open source
- Less structured than Jira

**Azure DevOps:**
- Full ALM platform
- Good for Microsoft shops
- Tight integration with repos and CI/CD

**Linear:**
- Modern, fast UI
- Developer-focused
- Good for startups

### Defect Metrics

**Track to understand quality:**

**Defect Density:**
- Defects per 1000 lines of code
- Lower is better

**Defect Leakage:**
- Defects found in production (should have been caught in Verification)
- Lower is better

**Defect Resolution Time:**
- Time from reported to fixed
- Shorter is better

**Defect Reopen Rate:**
- Percentage of defects reopened after fix
- Lower is better (indicates quality of fixes)

**Use metrics to improve process, not to blame individuals.**

---

## Production Readiness

Production readiness is the final assessment before deployment. It answers
the question: "Is this increment safe and ready to deploy?"

### Production Readiness Checklist

**Testing Complete:**
- [ ] All test types executed (integration, functional, UAT, performance,
  security)
- [ ] 100% of acceptance criteria verified
- [ ] No critical or high-severity defects
- [ ] Performance meets NFRs
- [ ] Security vulnerabilities addressed
- [ ] UAT approved by business stakeholders

**Quality Gates Passed:**
- [ ] All automated tests green
- [ ] Code review approved
- [ ] Code coverage meets thresholds
- [ ] Linting and formatting checks pass
- [ ] No critical static analysis issues

**Deployment Artifacts Ready:**
- [ ] Code tagged and versioned
- [ ] Deployment runbook created
- [ ] Rollback plan documented
- [ ] Database migrations tested
- [ ] Configuration changes documented

**Monitoring and Observability:**
- [ ] Logging verified
- [ ] Metrics collection tested
- [ ] Dashboards created
- [ ] Alerts configured
- [ ] Success criteria measurement working

**Documentation Complete:**
- [ ] Implementation brief updated
- [ ] Verification brief completed
- [ ] Known issues documented
- [ ] Runbooks updated
- [ ] User documentation (if applicable)

**Sign-Offs Obtained:**
- [ ] QA Lead sign-off
- [ ] Tech Lead sign-off
- [ ] Product Owner sign-off
- [ ] Security sign-off (if applicable)

### Go/No-Go Decision

**Go Criteria:**
- All critical quality gates passed
- UAT approved
- No critical defects
- Rollback plan exists
- Monitoring in place

**No-Go Criteria:**
- Critical defects unresolved
- UAT not approved
- Performance significantly below NFRs
- Critical security vulnerabilities
- Monitoring not working

**Conditional Go:**
- Minor issues accepted with workarounds
- Deferred defects documented
- Known limitations communicated
- Risk accepted by stakeholders

### Risk Assessment

**Deployment Risks:**
- What could go wrong during deployment?
- What is the blast radius if it fails?
- Do we have a rollback plan?

**Example Risk Matrix:**
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Database migration fails | Low | High | Test migration in staging; have rollback script |
| Performance degradation | Medium | Medium | Canary deployment; monitor closely |
| Third-party API down | Low | High | Circuit breaker; graceful degradation |

### Deployment Readiness Meeting

**Participants:**
- QA Lead
- Tech Lead
- Product Owner
- DevOps/SRE
- On-call engineer

**Agenda:**
1. Review test results
2. Review defects and resolutions
3. Review deployment plan
4. Review rollback plan
5. Review monitoring strategy
6. Go/no-go decision

**Outcome:**
- **Go:** Proceed to deployment
- **No-go:** Resolve blockers, reschedule
- **Conditional go:** Deploy with conditions

---

## When to Revisit Verification

Verification may need to be revisited in several scenarios:

### During Current Iteration

**New Defects Discovered:**
- UAT reveals issues
- Integration tests fail after code changes
- Performance regression detected

**Action:** Fix defects, retest affected areas

**Requirements Changed:**
- Stakeholders change acceptance criteria
- New edge cases identified

**Action:** Update test cases, retest

**Design Changes:**
- Architecture modified
- API contracts changed

**Action:** Update integration tests, retest

### After Deployment

**Production Incidents:**
- Bugs found by users in production
- Performance issues under real load
- Security vulnerabilities discovered

**Action:** Add regression tests, improve test coverage

**Test Gaps Identified:**
- Real-world usage reveals untested scenarios
- Edge cases missed during testing

**Action:** Expand test suite for future iterations

**Monitoring Reveals Issues:**
- Success criteria not measurable
- Instrumentation missing
- Metrics incorrect

**Action:** Return to Implementation to fix instrumentation, retest

### For Future Iterations

**Test Strategy Updates:**
- Based on production learnings
- New test types needed (e.g., chaos testing)

**Action:** Update verification approach for next increment

**Tool Changes:**
- Adopt new testing tools or frameworks
- Improve CI/CD pipeline

**Action:** Migrate tests, validate new tools

**Process Improvements:**
- UAT process needs refinement
- Defect triage process inefficient

**Action:** Update processes, train team

---

## Related Documents

- **[verification-brief-template.md](verification-brief-template.md)** -
  Template for documenting test results
- **[verification-checklist.md](verification-checklist.md)** - Quick
  readiness validation
- **[verification-ai-agent-prompt.md](verification-ai-agent-prompt.md)** -
  AI assistance for testing
- **[STAGES.md](../../STAGES.md)** - Verification stage definition
- **[AI_AUTONOMY_SCORECARD.md](../../AI_AUTONOMY_SCORECARD.md)** - AI
  autonomy guidance

---

**Version Notes**

Added to framework in v0.6.0
