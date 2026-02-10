# Implementation Stage Reference

**Last Updated:** 2026-02-10

---

## Table of Contents

1. [What is Implementation?](#what-is-implementation)
2. [Execution Pattern](#execution-pattern)
3. [Code Quality Principles](#code-quality-principles)
4. [Unit Testing Best Practices](#unit-testing-best-practices)
5. [Code Review Process](#code-review-process)
6. [Documentation Standards](#documentation-standards)
7. [Instrumentation and Observability](#instrumentation-and-observability)
8. [Security Best Practices](#security-best-practices)
9. [Performance Considerations](#performance-considerations)
10. [Technical Debt Management](#technical-debt-management)
11. [Common Anti-Patterns](#common-anti-patterns)
12. [Refactoring Techniques](#refactoring-techniques)
13. [AI-Assisted Implementation](#ai-assisted-implementation)
14. [Multi-Session and Multi-Engineer Implementation](#multi-session-and-multi-engineer-implementation)
15. [When to Revisit Implementation](#when-to-revisit-implementation)

---

## What is Implementation?

### Definition

The Implementation stage is where detailed designs become working, tested code. Engineers translate design specifications into executable software following professional standards and best practices.

### Goals

**Primary goals:**
- Build working code that implements requirements correctly
- Ensure code is maintainable, readable, and well-structured
- Create comprehensive unit tests that verify correctness
- Obtain peer review and approval before integration
- Implement instrumentation for observability and measurement
- Document code for future maintainers

**Success criteria:**
- All requirements for the increment are implemented
- Unit tests pass with adequate coverage
- Code review is approved
- Code meets quality standards (linting, formatting, complexity)
- No critical or high-priority defects
- Ready for integration testing in Verification stage

### Relationship to Other Stages

**Inputs from Design:**
- Detailed design specifications for increment
- API specifications and data models
- Architecture patterns to follow
- Test strategy and approach

**Inputs from Requirements:**
- Requirements with acceptance criteria
- Success criteria requiring measurement
- Non-functional requirements (NFRs)

**Outputs to Verification:**
- Working code in feature branch or test environment
- Unit test results and coverage reports
- Implementation brief with notes
- Code review approval records

---

## Execution Pattern

### Iterative Execution

Implementation executes **once per increment**. Each iteration of the Design → Implementation → Verification → Deployment cycle includes an Implementation pass.

### Typical Timeline

**Per increment (varies by increment size):**
- Small increment: 2-5 days of implementation work
- Medium increment: 1-2 weeks of implementation work
- Large increment: 2-4 weeks of implementation work

**Activities overlap:**
- Coding: 60-70% of time
- Unit testing: 20-30% of time
- Code review: 5-10% of time
- Documentation: 5-10% of time

### Implementation Workflow

```
1. Review Design Brief
   ↓
2. Set Up Development Environment
   ↓
3. Create Feature Branch
   ↓
4. Write Code (with unit tests)
   ↓
5. Implement Instrumentation
   ↓
6. Document Code
   ↓
7. Run Tests Locally
   ↓
8. Fill Out Implementation Brief
   ↓
9. Submit Code for Review
   ↓
10. Address Review Feedback
   ↓
11. Get Approval
   ↓
12. Run Implementation Checklist
   ↓
13. Merge and Hand Off to Verification
```

---

## Code Quality Principles

### SOLID Principles

The SOLID principles are foundational to writing maintainable object-oriented code.

#### S - Single Responsibility Principle (SRP)

**Definition:** A class or module should have one, and only one, reason to change.

**In practice:**
- Each class/module does one thing well
- If you can't describe a class's purpose in one sentence, it's doing too much
- Separate concerns (data access, business logic, presentation)

**Example:**
```python
# BAD: User class does too much
class User:
    def save_to_database(self): ...
    def send_welcome_email(self): ...
    def calculate_permissions(self): ...

# GOOD: Separate concerns
class User:
    # Just data and simple behavior
    pass

class UserRepository:
    def save(self, user): ...

class EmailService:
    def send_welcome_email(self, user): ...

class PermissionService:
    def calculate_permissions(self, user): ...
```

#### O - Open/Closed Principle (OCP)

**Definition:** Software entities should be open for extension but closed for modification.

**In practice:**
- Use interfaces/abstractions to allow new behavior without changing existing code
- Prefer composition over modification
- Use dependency injection

**Example:**
```javascript
// BAD: Must modify class to add new payment methods
class PaymentProcessor {
  processPayment(type, amount) {
    if (type === 'credit_card') { ... }
    else if (type === 'paypal') { ... }
    // Adding new type requires modifying this class
  }
}

// GOOD: Open for extension via strategy pattern
class PaymentProcessor {
  constructor(paymentMethod) {
    this.paymentMethod = paymentMethod;
  }

  process(amount) {
    return this.paymentMethod.process(amount);
  }
}

class CreditCardPayment {
  process(amount) { ... }
}

class PayPalPayment {
  process(amount) { ... }
}
```

#### L - Liskov Substitution Principle (LSP)

**Definition:** Objects of a superclass should be replaceable with objects of its subclasses without breaking the application.

**In practice:**
- Subclasses must honor the contracts of their base classes
- Don't strengthen preconditions or weaken postconditions
- Ensure substitutability

#### I - Interface Segregation Principle (ISP)

**Definition:** No client should be forced to depend on methods it does not use.

**In practice:**
- Create small, focused interfaces
- Don't force implementations to provide methods they don't need
- Split large interfaces into smaller ones

#### D - Dependency Inversion Principle (DIP)

**Definition:** High-level modules should not depend on low-level modules. Both should depend on abstractions.

**In practice:**
- Depend on interfaces/abstractions, not concrete implementations
- Use dependency injection
- Invert the control flow

**Example:**
```java
// BAD: High-level depends on low-level
class OrderService {
    private MySQLOrderRepository repository = new MySQLOrderRepository();
    // Now tightly coupled to MySQL
}

// GOOD: Both depend on abstraction
interface OrderRepository {
    Order save(Order order);
}

class OrderService {
    private OrderRepository repository;

    // Dependency injected
    public OrderService(OrderRepository repository) {
        this.repository = repository;
    }
}
```

### Other Key Principles

#### DRY - Don't Repeat Yourself

**Definition:** Every piece of knowledge should have a single, unambiguous representation.

**In practice:**
- Extract duplicated code into reusable functions/modules
- Use constants for repeated values
- Create abstractions for common patterns

**When to violate:** Early in development when patterns aren't clear yet. Don't prematurely abstract.

#### KISS - Keep It Simple, Stupid

**Definition:** Simplicity should be a key goal; unnecessary complexity should be avoided.

**In practice:**
- Choose the simplest solution that works
- Avoid clever tricks that obscure intent
- Write code for humans to read, not to impress

**Example:**
```python
# BAD: Clever but hard to understand
result = [x for x in data if (lambda y: y % 2)(x)]

# GOOD: Clear and obvious
result = [x for x in data if x % 2 == 0]
```

#### YAGNI - You Aren't Gonna Need It

**Definition:** Don't implement functionality until you actually need it.

**In practice:**
- Don't build for hypothetical future requirements
- Implement only what's in the current increment
- Avoid over-engineering

**Example:**
```javascript
// BAD: Building features we don't need yet
class UserSettings {
  constructor() {
    this.theme = 'default';
    this.language = 'en';
    this.timezone = 'UTC';
    this.currency = 'USD';  // Not in requirements
    this.dateFormat = 'ISO'; // Not in requirements
    this.notifications = {}; // Not in requirements
  }
}

// GOOD: Only what's required now
class UserSettings {
  constructor() {
    this.theme = 'default';
    this.language = 'en';
    this.timezone = 'UTC';
  }
}
```

### Code Readability

#### Naming Conventions

**Variables and functions:** Use descriptive names that reveal intent

```python
# BAD
def calc(d, r):
    return d * r

# GOOD
def calculate_total_price(quantity, unit_price):
    return quantity * unit_price
```

**Boolean variables:** Use is/has/can prefixes

```javascript
// GOOD
const isValid = checkValidation(data);
const hasPermission = user.hasRole('admin');
const canEdit = permissions.includes('edit');
```

**Constants:** Use UPPER_SNAKE_CASE

```java
// GOOD
public static final int MAX_RETRY_ATTEMPTS = 3;
public static final String API_BASE_URL = "https://api.example.com";
```

#### Function Length

**Guideline:** Functions should be short (typically 10-50 lines).

**Rationale:**
- Easier to understand and test
- Single responsibility is more likely
- Less likely to have hidden side effects

**When to break it up:**
- Function does multiple distinct things
- Function has multiple levels of abstraction
- You need comments to explain sections

#### Comment Guidelines

**When to comment:**
- Explain *why*, not *what* (code should explain what)
- Document non-obvious decisions or trade-offs
- Warn about gotchas or edge cases
- Link to external resources (RFCs, specs, tickets)

**When NOT to comment:**
- Don't comment obvious code
- Don't leave commented-out code (use version control)
- Don't use comments to make bad code acceptable (refactor instead)

```python
# BAD: Comment explains what code does
# Loop through users and add them to the list
for user in users:
    user_list.append(user)

# GOOD: Comment explains why
# We must process users in batches to avoid memory issues
# with datasets larger than 10,000 records
batch_size = 1000
for i in range(0, len(users), batch_size):
    process_batch(users[i:i+batch_size])
```

---

## Unit Testing Best Practices

### What is a Unit Test?

A **unit test** verifies the behavior of a single unit of code (function, method, class) in isolation from its dependencies.

**Characteristics:**
- **Fast** - Runs in milliseconds
- **Isolated** - No external dependencies (databases, APIs, files)
- **Repeatable** - Same result every time
- **Self-checking** - Pass/fail is automated
- **Timely** - Written at the same time as code

### Test Coverage Expectations

**Coverage targets:**
- **Overall coverage:** 70-90% (varies by team standards)
- **Branch coverage:** 75-85%
- **Critical path coverage:** 100%

**What to prioritize:**
- Business logic (high value, high complexity)
- Edge cases and boundary conditions
- Error handling paths
- Security-critical code

**What not to worry about:**
- Simple getters/setters
- Framework boilerplate
- Generated code

### Test Structure: Arrange-Act-Assert (AAA)

**Pattern:**
1. **Arrange** - Set up test data and preconditions
2. **Act** - Execute the code under test
3. **Assert** - Verify the outcome

**Example:**
```python
def test_calculate_total_price():
    # Arrange
    cart = ShoppingCart()
    cart.add_item(Product("Widget", price=10.00), quantity=3)

    # Act
    total = cart.calculate_total()

    # Assert
    assert total == 30.00
```

### Test Naming Conventions

**Pattern:** `test_<method>_<scenario>_<expected_result>`

**Examples:**
```python
test_calculate_total_price_with_valid_items_returns_sum()
test_calculate_total_price_with_empty_cart_returns_zero()
test_calculate_total_price_with_discount_applies_discount()
test_calculate_total_price_with_null_item_raises_exception()
```

### What to Test

#### Happy Path

Test the expected, normal usage scenarios.

```python
def test_user_login_with_valid_credentials_succeeds():
    user = authenticate("alice@example.com", "correct_password")
    assert user is not None
    assert user.email == "alice@example.com"
```

#### Edge Cases

Test boundary conditions and unusual inputs.

```python
def test_calculate_discount_at_zero_percent_returns_original_price()
def test_calculate_discount_at_100_percent_returns_zero()
def test_process_list_with_empty_list_returns_empty()
def test_process_list_with_single_item_succeeds()
```

#### Error Conditions

Test that errors are handled correctly.

```python
def test_user_login_with_invalid_password_raises_authentication_error():
    with pytest.raises(AuthenticationError):
        authenticate("alice@example.com", "wrong_password")

def test_divide_by_zero_raises_value_error():
    with pytest.raises(ValueError, match="division by zero"):
        calculator.divide(10, 0)
```

#### Null/None/Undefined

Test behavior with missing or null values.

```python
def test_get_user_name_with_null_user_returns_default()
def test_process_order_with_null_address_raises_exception()
```

### Mocking and Stubbing

**When to mock:**
- External dependencies (databases, APIs, file systems)
- Slow operations
- Non-deterministic behavior (random, time, network)

**Example:**
```python
def test_send_notification_calls_email_service(mocker):
    # Arrange
    email_service = mocker.Mock()
    notifier = NotificationService(email_service)

    # Act
    notifier.send_notification(user, "Welcome!")

    # Assert
    email_service.send_email.assert_called_once_with(
        to=user.email,
        subject="Welcome!",
        body=mocker.ANY
    )
```

### Test Data Management

**Use fixtures for common setup:**
```python
@pytest.fixture
def sample_user():
    return User(id=1, email="test@example.com", name="Test User")

def test_user_has_full_name(sample_user):
    assert sample_user.full_name() == "Test User"
```

**Use factories for flexibility:**
```python
def create_user(email="test@example.com", name="Test"):
    return User(email=email, name=name)

def test_user_email_validation():
    user = create_user(email="invalid")
    assert not user.is_valid()
```

### Anti-Patterns in Testing

**❌ Test padding (testing for coverage, not behavior):**
```python
# BAD: Just calling methods without meaningful assertions
def test_user_methods():
    user = User()
    user.get_name()  # No assertion - meaningless
    user.set_name("Alice")  # No verification
```

**❌ Brittle tests (break when implementation changes):**
```python
# BAD: Testing implementation details
def test_user_save():
    user = User()
    user.save()
    # Asserting on internal state instead of observable behavior
    assert user._dirty_flag == False
```

**❌ Test interdependence (tests affect each other):**
```python
# BAD: Tests share state
shared_list = []

def test_append():
    shared_list.append(1)
    assert len(shared_list) == 1

def test_pop():
    # Depends on test_append running first
    shared_list.pop()
```

---

## Code Review Process

### Purpose of Code Review

**Primary goals:**
- Catch bugs and logic errors before they reach production
- Ensure code quality and maintainability
- Share knowledge across the team
- Enforce coding standards and best practices
- Verify security and performance considerations
- Build collective ownership of the codebase

### Code Review Checklist

**Reviewer should check:**

1. **Correctness**
   - Does the code implement requirements correctly?
   - Do tests cover the logic adequately?
   - Are edge cases handled?

2. **Code Quality**
   - Is the code readable and maintainable?
   - Are naming conventions followed?
   - Is there unnecessary complexity?
   - Are SOLID principles applied?

3. **Security**
   - Are there SQL injection vulnerabilities?
   - Is input validated and sanitized?
   - Are authentication/authorization checks present?
   - Are secrets hardcoded?

4. **Performance**
   - Are there obvious inefficiencies (N+1 queries, O(n²) loops)?
   - Is resource usage reasonable?
   - Are database queries optimized?

5. **Testing**
   - Are tests comprehensive?
   - Do tests actually verify behavior?
   - Is test coverage adequate?

6. **Documentation**
   - Are complex parts explained?
   - Are public APIs documented?
   - Is the implementation brief complete?

### Review Workflow

```
1. Author submits code for review (PR/MR)
   ↓
2. Author adds context and testing notes
   ↓
3. Reviewer(s) assigned or volunteer
   ↓
4. Reviewer reads code and leaves comments
   ↓
5. Author addresses feedback
   ↓
6. Reviewer re-reviews changes
   ↓
7. Reviewer approves or requests more changes
   ↓
8. Code merged after approval(s)
```

### Effective Review Comments

**Be specific and constructive:**

❌ **BAD:** "This is wrong."
✅ **GOOD:** "This validation doesn't handle null values. Consider adding a null check before accessing properties."

❌ **BAD:** "Bad naming."
✅ **GOOD:** "The name `process()` is vague. Consider `processPayment()` to clarify what's being processed."

**Use prefixes to indicate severity:**

- **MUST:** Blocking issue that must be fixed
- **SHOULD:** Strong suggestion that should be addressed
- **CONSIDER:** Optional suggestion worth thinking about
- **NIT:** Minor style/preference issue (non-blocking)
- **QUESTION:** Asking for clarification

**Example:**
```
MUST: This SQL query is vulnerable to injection. Use parameterized queries instead.

SHOULD: Consider extracting this logic into a separate function for reusability.

CONSIDER: Would a factory pattern make this more testable?

NIT: Extra blank line here.

QUESTION: Why is the timeout set to 30 seconds? Is this documented?
```

### Review Etiquette

**For reviewers:**
- Assume positive intent
- Criticize code, not people
- Explain *why*, not just *what*
- Acknowledge good work
- Be timely (review within 24 hours)

**For authors:**
- Don't take feedback personally
- Ask for clarification if feedback is unclear
- Be open to suggestions
- Explain your reasoning when disagreeing
- Thank reviewers for their time

### When to Approve

**Approve when:**
- Code implements requirements correctly
- Tests are comprehensive and pass
- No critical security or performance issues
- Code quality meets team standards
- Documentation is adequate

**Don't approve when:**
- Critical bugs or security issues exist
- Tests are missing or inadequate
- Code is unreadable or unmaintainable
- Requirements are not met

---

## Documentation Standards

### Code Comments

**When to add comments:**
- Explain *why* a non-obvious approach was taken
- Document complex algorithms or business logic
- Warn about gotchas or edge cases
- Link to external references (specs, RFCs, tickets)

**When NOT to add comments:**
- Don't explain *what* the code does (make code self-documenting)
- Don't leave commented-out code (use version control)
- Don't use comments as a crutch for bad code

### API Documentation

**Document public APIs with:**
- Purpose and behavior
- Parameters and return values
- Exceptions thrown
- Usage examples
- Since version (when added)

**Example (Python docstring):**
```python
def calculate_total_price(items: List[CartItem], discount_code: Optional[str] = None) -> Decimal:
    """
    Calculate the total price for a cart with optional discount.

    Args:
        items: List of items in the shopping cart
        discount_code: Optional discount code to apply

    Returns:
        Total price as Decimal with 2 decimal places

    Raises:
        InvalidDiscountError: If discount code is invalid
        EmptyCartError: If items list is empty

    Example:
        >>> items = [CartItem("Widget", 10.00, quantity=2)]
        >>> calculate_total_price(items)
        Decimal('20.00')

    Since: v1.2.0
    """
```

### README Documentation

**Component READMEs should include:**
- Purpose of the component
- How to use it
- Dependencies and setup
- Configuration options
- Examples
- Known limitations

### Implementation Brief

**Complete the implementation brief template:**
- Increment overview and requirements mapping
- Implementation approach and decisions
- Code structure and organization
- Unit testing strategy
- Instrumentation and logging
- Code review notes
- Known issues and technical debt
- Handoff notes to Verification

---

## Instrumentation and Observability

### Logging Best Practices

#### Log Levels

**ERROR** - Something failed that requires attention
- Exceptions and failures
- Data corruption or loss
- Security violations
- Service unavailability

**WARN** - Something unexpected but handled
- Deprecated API usage
- Fallback to default behavior
- Configuration issues (non-fatal)
- Rate limiting triggered

**INFO** - Important business events
- User actions (login, logout, purchase)
- State transitions
- External API calls
- Job completion

**DEBUG** - Detailed diagnostic information
- Variable values at key points
- Control flow decisions
- Detailed timing information

#### Structured Logging

Use structured (JSON) logging for machine readability:

```python
# GOOD: Structured logging
logger.info(
    "User logged in",
    extra={
        "user_id": user.id,
        "user_email": user.email,
        "ip_address": request.remote_addr,
        "user_agent": request.headers.get('User-Agent'),
        "timestamp": datetime.utcnow().isoformat()
    }
)
```

#### What to Log

**Always log:**
- Errors and exceptions with context
- Security events (auth failures, permission denials)
- Important state changes
- External service calls and responses
- Performance metrics for critical operations

**Never log:**
- Passwords or credentials
- Personally Identifiable Information (PII) unless required
- Credit card numbers or financial data
- API keys or secrets
- Full request/response bodies with sensitive data

### Metrics and Telemetry

#### Types of Metrics

**Counters** - Count events
- Number of requests
- Number of errors
- Number of items processed

**Gauges** - Current value at a point in time
- Active connections
- Queue depth
- Memory usage

**Histograms** - Distribution of values
- Request duration
- Response size
- Processing time

**Timers** - Measure duration
- API response time
- Database query time
- External service latency

#### Success Criteria Instrumentation

**Implement measurement for success criteria from Initiation:**

```python
# Success criterion: Reduce customer support tickets by 30%
# Instrumentation:
metrics.increment('support_ticket.created', tags={
    'category': ticket.category,
    'severity': ticket.severity,
    'source': 'self_service' if from_faq else 'manual'
})

# Success criterion: Improve API response time to < 200ms p95
# Instrumentation:
with metrics.timer('api.request.duration', tags={
    'endpoint': endpoint_name,
    'method': request.method
}):
    result = process_request()
```

### Monitoring and Alerts

**Configure alerts for:**
- Error rate thresholds
- Performance degradation (latency, throughput)
- Resource exhaustion (CPU, memory, disk)
- External service failures
- Security events

---

## Security Best Practices

### Input Validation

**Always validate and sanitize input:**

```python
# GOOD: Validate input
def create_user(email, age):
    if not re.match(r'^[^@]+@[^@]+\.[^@]+$', email):
        raise ValueError("Invalid email format")

    if not isinstance(age, int) or age < 0 or age > 150:
        raise ValueError("Invalid age")

    return User(email=email, age=age)
```

### SQL Injection Prevention

**Always use parameterized queries:**

```python
# BAD: SQL injection vulnerability
query = f"SELECT * FROM users WHERE email = '{email}'"

# GOOD: Parameterized query
query = "SELECT * FROM users WHERE email = %s"
cursor.execute(query, (email,))
```

### XSS Prevention

**Escape output in templates:**

```javascript
// BAD: XSS vulnerability
element.innerHTML = userInput;

// GOOD: Escape HTML
element.textContent = userInput;
// OR use a templating library that auto-escapes
```

### Authentication and Authorization

**Check permissions before actions:**

```python
# GOOD: Check authorization
def delete_document(document_id, user):
    document = Document.get(document_id)

    if not user.has_permission('delete', document):
        raise PermissionDenied("User cannot delete this document")

    document.delete()
```

### Secrets Management

**Never hardcode secrets:**

```python
# BAD: Hardcoded secret
API_KEY = "sk_live_abc123xyz789"

# GOOD: Load from environment
API_KEY = os.environ.get('API_KEY')
if not API_KEY:
    raise EnvironmentError("API_KEY not set")
```

---

## Performance Considerations

### Big O Complexity

**Be aware of algorithmic complexity:**

- **O(1)** - Constant time (hash lookups, array access)
- **O(log n)** - Logarithmic (binary search)
- **O(n)** - Linear (single loop through data)
- **O(n log n)** - Efficient sorting
- **O(n²)** - Nested loops (avoid if possible)
- **O(2^n)** - Exponential (avoid!)

### Database Performance

**Avoid N+1 queries:**

```python
# BAD: N+1 query problem
users = User.all()
for user in users:
    # Separate query for each user's orders
    orders = Order.filter(user_id=user.id)

# GOOD: Use joins or eager loading
users = User.all().prefetch_related('orders')
for user in users:
    orders = user.orders  # Already loaded
```

**Use indexes for frequently queried columns:**
```sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_user_id ON orders(user_id);
```

### Caching

**Cache expensive computations:**

```python
from functools import lru_cache

@lru_cache(maxsize=128)
def expensive_calculation(param):
    # Complex computation
    return result
```

### Lazy Loading

**Don't load data until needed:**

```python
# GOOD: Lazy loading
def get_report():
    # Only load large dataset if report is actually generated
    if not should_generate_report():
        return None

    large_dataset = load_large_dataset()
    return generate_report(large_dataset)
```

---

## Technical Debt Management

### What is Technical Debt?

**Technical debt** is the implied cost of rework caused by choosing a quick solution now instead of a better approach that would take longer.

### Types of Technical Debt

**1. Deliberate Debt**
- Conscious decision to go fast now, pay later
- Example: Hardcode configuration to ship MVP faster
- Should be documented and tracked

**2. Accidental Debt**
- Didn't know better at the time
- Example: Using an anti-pattern due to inexperience
- Learn and refactor when discovered

**3. Environmental Debt**
- Dependencies, frameworks, or platforms evolve
- Example: Using deprecated API version
- Plan migration to newer versions

**4. Bit Rot Debt**
- Code degrades over time without maintenance
- Example: Tests become flaky, dependencies outdated
- Regular maintenance prevents accumulation

### When to Incur Debt

**Good reasons:**
- Time-to-market pressure (MVP, deadline)
- Uncertainty (unclear requirements, experimentation)
- Learning (first time with technology)
- Risk mitigation (validate approach before full build)

**Bad reasons:**
- Laziness or cutting corners
- Ignoring standards or best practices
- Skipping tests or code review
- Not understanding requirements

### Managing Technical Debt

**1. Document It**
```python
# TODO: Refactor to use dependency injection (Tech Debt #123)
# Currently tightly coupled to MySQL for MVP speed
repository = MySQLOrderRepository()
```

**2. Track It**
- Add to backlog with "Technical Debt" label
- Link to code location
- Estimate effort to resolve

**3. Prioritize It**
- **High impact:** Blocks new features, causes frequent bugs
- **Medium impact:** Slows development, reduces maintainability
- **Low impact:** Minor annoyance

**4. Pay It Down**
- Schedule refactoring in future increments
- Don't let high-impact debt linger
- Balance new features with debt paydown

**5. Prevent Accumulation**
- Code review catches new debt early
- Set quality standards and enforce them
- Allocate time for refactoring

---

## Common Anti-Patterns

### 1. God Object (God Class)

**Problem:** One class/module does everything.

**Symptoms:**
- Class has 10+ public methods
- Class has many different responsibilities
- Class name is vague (Manager, Helper, Util)

**Solution:** Break into smaller, focused classes following SRP.

### 2. Copy-Paste Programming

**Problem:** Duplicating code instead of abstracting.

**Solution:** Extract shared logic into reusable functions/modules.

### 3. Magic Numbers and Strings

**Problem:** Hard-coded values without explanation.

**Solution:** Use named constants or configuration.

```python
# BAD
if status_code == 429:
    wait_time = 60

# GOOD
HTTP_TOO_MANY_REQUESTS = 429
DEFAULT_RATE_LIMIT_RETRY_SECONDS = 60

if status_code == HTTP_TOO_MANY_REQUESTS:
    wait_time = DEFAULT_RATE_LIMIT_RETRY_SECONDS
```

### 4. Premature Optimization

**Problem:** Optimizing before knowing where bottlenecks are.

**Solution:** Write clear code first, profile, then optimize based on data.

### 5. No Error Handling

**Problem:** Not handling failures or edge cases.

**Solution:** Implement proper error handling and logging.

### 6. Shotgun Surgery

**Problem:** One change requires modifying many unrelated places.

**Cause:** Related functionality is scattered across codebase.

**Solution:** Consolidate related code; improve cohesion.

### 7. Spaghetti Code

**Problem:** Code with complex, tangled control flow.

**Solution:** Refactor into smaller, focused functions; reduce nesting.

---

## Refactoring Techniques

### Extract Method

**When:** Function is too long or does multiple things.

**How:** Extract a block of code into a new, well-named function.

```python
# BEFORE
def process_order(order):
    # Validate
    if not order.items:
        raise ValueError("Empty order")
    if not order.customer:
        raise ValueError("No customer")

    # Calculate total
    total = sum(item.price * item.quantity for item in order.items)
    discount = get_discount(order.customer)
    total = total * (1 - discount)

    # Save
    order.total = total
    order.save()

# AFTER
def process_order(order):
    validate_order(order)
    total = calculate_total_with_discount(order)
    save_order(order, total)
```

### Extract Variable

**When:** Complex expression is hard to understand.

**How:** Assign expression to a well-named variable.

```python
# BEFORE
if (user.age >= 18 and user.has_id and not user.is_banned):
    allow_purchase()

# AFTER
is_adult = user.age >= 18
has_valid_id = user.has_id
is_allowed = is_adult and has_valid_id and not user.is_banned

if is_allowed:
    allow_purchase()
```

### Replace Conditional with Polymorphism

**When:** Complex if/else or switch based on type.

**How:** Use inheritance or strategy pattern.

```python
# BEFORE
def calculate_shipping(order):
    if order.type == 'standard':
        return 5.00
    elif order.type == 'express':
        return 15.00
    elif order.type == 'overnight':
        return 30.00

# AFTER (strategy pattern)
class StandardShipping:
    def calculate(self, order):
        return 5.00

class ExpressShipping:
    def calculate(self, order):
        return 15.00

def calculate_shipping(order, strategy):
    return strategy.calculate(order)
```

---

## AI-Assisted Implementation

### AI Capabilities

**AI excels at:**
- Generating boilerplate code
- Implementing standard patterns (CRUD, validation)
- Writing unit tests
- Converting designs to code
- Documenting code
- Suggesting refactorings

**AI limitations:**
- May not understand full context
- Can introduce security vulnerabilities
- May use outdated patterns or libraries
- Cannot make business decisions
- Requires human review for correctness

### Best Practices for AI-Assisted Coding

**1. Provide Clear Context**
```
Good prompt:
"Generate a Python function that validates email addresses using regex.
Should raise ValueError if invalid. Include unit tests using pytest."

Bad prompt:
"Write email validator."
```

**2. Review AI-Generated Code Carefully**
- Check for security vulnerabilities
- Verify logic correctness
- Ensure code follows team standards
- Test thoroughly

**3. Use AI Iteratively**
- Generate initial code
- Review and refine
- Ask AI to improve based on feedback
- Human makes final decisions

**4. Document AI Usage**
```python
# NOTE: Initial implementation generated by AI, reviewed and modified
# for security (added input sanitization) and performance (added caching)
def process_user_input(data):
    ...
```

### When NOT to Trust AI

- Security-critical code (auth, encryption, payment)
- Complex business logic (requires domain knowledge)
- Performance-sensitive code (requires profiling)
- Architectural decisions (requires full context)

---

## Multi-Session and Multi-Engineer Implementation

### The Reality of Iterative Development

Increment implementation often spans multiple work sessions or involves multiple engineers:
- **Multi-day work** - Large increments take days or weeks to complete
- **Shift handoffs** - Different engineers work different hours or days
- **Parallel work** - Multiple engineers working on different components
- **Context switching** - Engineers work on multiple increments or tasks
- **Interruptions** - Meetings, incidents, or other priorities interrupt flow

**The challenge:** How do engineers communicate status, progress, and context between sessions?

### Standard Practices for Session Handoffs

#### 1. Implementation Brief as Living Document

Use the **implementation-brief-template.md** as a living document throughout the increment:

**Update after each work session:**
- **Progress Log** - Add session entry with what was completed, in progress, next steps, blockers
- **Current Status Summary** - Update component status (completed, in progress, not started)
- **Open Questions** - Track questions needing answers
- **Known Issues** - Document bugs or problems discovered

**Benefits:**
- Single source of truth for increment status
- Clear handoff between engineers
- Context preserved across sessions
- Easy to pick up where someone left off

**Example Progress Log entry:**
```markdown
### Session 3 (2024-02-11, Alice, 3 hours)

**Completed:**
- Implemented payment service integration
- Added unit tests for payment flows (happy path, declined, timeout)
- Fixed validation bug in order total calculation

**In Progress:**
- Error handling for payment failures (50% complete)
- Need to add retry logic with exponential backoff

**Next Steps:**
- Complete error handling and retry logic
- Add logging for payment events
- Update implementation brief with payment flow diagram

**Blockers:**
- Waiting on Stripe API documentation for webhook signatures
- Asked #payments-team in Slack (2024-02-11 10:30am)

**Notes:**
- Payment service uses Builder pattern (see PaymentRequestBuilder)
- Retry logic should max out at 3 attempts with 1s, 2s, 4s delays
- Unit tests mock Stripe client (see conftest.py for fixtures)
```

#### 2. Draft Pull Requests

Create a **Draft PR** early in the increment, even before code is complete:

**PR Description format:**
```markdown
## Increment: Order Creation Feature (FR-5)

**Status:** 🚧 Work in Progress (60% complete)

### Progress Checklist
- [x] Data models (Order, OrderItem)
- [x] Validation logic
- [x] Unit tests for validation
- [ ] Payment service integration (in progress)
- [ ] Error handling
- [ ] Logging and metrics
- [ ] Code review ready

### What's Working
- Order creation with valid inputs
- Validation catches invalid quantities and prices
- Unit tests pass (78% coverage)

### What's Not Done
- Payment integration incomplete
- Error handling needs work
- Logging not yet implemented

### For Next Engineer
- See Session 3 notes in implementation-brief.md
- Stripe API docs at: https://stripe.com/docs/...
- Payment service pattern: Builder pattern (see existing services)

### Questions/Blockers
- Waiting on Stripe webhook signature docs
```

**Benefits:**
- Visual progress tracking
- CI/CD runs on every push
- Easy for team to see status
- Can add reviewers early for feedback

#### 3. Task Tracking System

Use your team's task tracking system (Jira, GitHub Issues, Linear, Azure DevOps):

**Break increment into subtasks:**
```
Epic: Order Creation Feature (FR-5)
  ├─ Task: Implement data models (Done)
  ├─ Task: Add validation logic (Done)
  ├─ Task: Write unit tests (Done)
  ├─ Task: Integrate payment service (In Progress - Alice)
  ├─ Task: Add error handling (To Do)
  ├─ Task: Implement logging (To Do)
  └─ Task: Code review and merge (To Do)
```

**Update task status after each session:**
- Move tasks from To Do → In Progress → Done
- Add comments with progress notes
- Assign tasks to specific engineers
- Link commits/PRs to tasks

#### 4. TODO Comments in Code

Mark incomplete work directly in the code:

```python
def process_payment(order):
    # TODO(alice, 2024-02-11): Add retry logic with exponential backoff
    # Stripe occasionally times out, we should retry 3 times with 1s, 2s, 4s delays
    # See: https://stripe.com/docs/error-handling#retry-logic

    try:
        result = stripe_client.charge(order.total)
        # TODO(alice): Add logging here - log payment attempt with order_id and amount
        return result
    except StripeTimeout:
        # FIXME(alice): Currently just raises, needs retry logic
        raise

# TODO(bob): Implement webhook handler for payment confirmations
# Design doc: docs/payments-webhook.md
def handle_payment_webhook(payload):
    pass  # Not yet implemented
```

**TODO comment format:**
- `TODO(name, date): Description` - Work that needs to be done
- `FIXME(name): Description` - Known bug or issue
- `HACK(name): Description` - Quick fix that needs proper solution
- `NOTE(name): Description` - Important context for future developers

#### 5. WIP Commits

Make frequent "Work in Progress" commits:

```bash
git commit -m "WIP: payment service integration - 50% complete"
git commit -m "WIP: add retry logic (not tested yet)"
git commit -m "WIP: payment tests failing, investigating timeout issue"
```

**Benefits:**
- Progress is saved even if incomplete
- Other engineers can see what's been tried
- Easy to roll back if approach doesn't work
- Shows thought process and evolution

**⚠️ Important:** Squash WIP commits before final merge to keep main branch clean.

#### 6. Session Notes / Standup Updates

Brief written updates for the team:

**In team chat:**
```
End of session update (2024-02-11, Alice):
- ✅ Payment service integration 50% done
- 🔄 Working on retry logic (stripe timeouts)
- 🚧 Blocked waiting on webhook docs from #payments-team
- 📝 Next: Complete retry logic, add logging
- ⏰ Estimate: 3-4 more hours of work
```

**In standup doc:**
```
Yesterday (Alice):
- Implemented payment service integration
- Added unit tests for happy path
- Started retry logic

Today (Alice):
- Complete retry logic and error handling
- Add logging for payment events

Blockers:
- Need Stripe webhook signature verification docs
```

### Best Practices for Multi-Engineer Implementation

#### Clear Work Division

**When multiple engineers work in parallel:**
- Divide by component or feature area
- Minimize overlapping files to reduce merge conflicts
- Agree on interfaces/contracts upfront
- Communicate frequently about changes

**Example division:**
```
Alice:
- Payment service integration (orders/services/payment_service.py)
- Payment-related tests (tests/services/test_payment_service.py)

Bob:
- Order API endpoint (orders/views/order_views.py)
- API integration tests (tests/api/test_order_endpoints.py)

Shared:
- Order model (orders/models/order.py) - coordinate changes
```

#### Communication Channels

**Establish clear communication:**
- **Async updates:** Progress log in implementation brief, draft PR descriptions
- **Sync touchpoints:** Daily standup, pair programming sessions
- **Questions:** Team chat for quick questions, design reviews for bigger decisions
- **Blocking issues:** Tag relevant people immediately, escalate if urgent

#### Session Handoff Checklist

**Before ending your session:**
- [ ] Commit and push all work (even if incomplete)
- [ ] Update Progress Log in implementation brief
- [ ] Update Draft PR description and checklist
- [ ] Mark TODO comments for incomplete work
- [ ] Update task tracking system
- [ ] Post session summary in team chat (if multi-engineer)
- [ ] Document any blockers or questions

**Before starting your session:**
- [ ] Pull latest changes from remote
- [ ] Read latest Progress Log entry
- [ ] Check Draft PR description for status
- [ ] Review task tracking for assigned work
- [ ] Read any team chat updates
- [ ] Identify and address blockers from previous session

### Tools and Conventions

#### Branch Naming

Use descriptive branch names:
```bash
feature/FR-5-order-creation-alice
feature/FR-5-payment-integration
bugfix/order-validation-edge-case
```

#### Commit Messages

Clear commit messages help others understand progress:
```bash
# GOOD - Clear and specific
git commit -m "feat(orders): implement payment service integration"
git commit -m "test(orders): add unit tests for payment retry logic"
git commit -m "fix(orders): handle stripe timeout errors correctly"

# BAD - Vague
git commit -m "working on payments"
git commit -m "updates"
git commit -m "stuff"
```

#### Code Comments

**Add context for the next person:**
```python
# NOTE: Payment processing is async - webhook confirms completion
# If webhook doesn't arrive within 5 minutes, we mark as "pending review"
# and ops team investigates manually. See docs/payment-flows.md

# CONTEXT: We use Builder pattern here because payment requests have
# many optional fields (discount, tax, shipping) and this makes the
# API cleaner than a constructor with 10 parameters.
```

### When to Sync Synchronously

**Schedule synchronous communication when:**
- **Architectural decisions needed** - Don't guess, discuss
- **Multiple approaches possible** - Get team input on trade-offs
- **Blocking issues** - Pair program or screen share to unblock
- **Complex handoffs** - 15-minute call beats 20 async messages
- **Major pivots** - Changing approach mid-increment needs discussion

**Keep async for:**
- Progress updates
- Completed work notifications
- Simple questions with clear answers
- Documentation updates

---

## When to Revisit Implementation

### Triggers for Revisiting

**1. Verification Tests Fail**
- Integration tests reveal bugs
- UAT uncovers misaligned requirements
- Performance tests show inadequate optimization

**Action:** Fix bugs, adjust implementation.

**2. Code Review Feedback**
- Significant design issues identified
- Security vulnerabilities found
- Major refactoring needed

**Action:** Address feedback, resubmit for review.

**3. Requirements Clarified**
- Acceptance criteria become clearer during implementation
- Stakeholders provide additional guidance
- Edge cases are discovered

**Action:** Adjust implementation to match updated understanding.

**4. Design Changed**
- Design updated during implementation
- Better approach identified
- Architecture decision revised

**Action:** Align implementation with updated design.

**5. Technical Debt Identified**
- Code works but needs refactoring
- Performance issues discovered
- Maintainability concerns raised

**Action:** Document debt, plan paydown.

### Revision Process

1. **Identify issue** - What needs to change and why?
2. **Assess impact** - How much rework is required?
3. **Update code and tests** - Make necessary changes
4. **Re-review** - Submit for code review if significant
5. **Update documentation** - Keep implementation brief current
6. **Communicate** - Notify stakeholders if schedule impacted

---

## Summary

### Implementation Checklist

✅ Review design brief and requirements
✅ Write code following design specifications
✅ Create comprehensive unit tests
✅ Implement instrumentation for observability
✅ Perform code review
✅ Address review feedback
✅ Document code and decisions
✅ Fill out implementation brief
✅ Run implementation checklist
✅ Get approval and merge

### Quality Gates

**Before proceeding to Verification:**
- All requirements implemented
- Unit tests pass with adequate coverage
- Code review approved
- Code quality standards met
- Documentation complete
- No critical defects

### Key Principles

- **SOLID, DRY, KISS, YAGNI** - Follow these principles
- **Test thoroughly** - Comprehensive unit tests are non-negotiable
- **Review rigorously** - Code review catches issues early
- **Instrument for observability** - Logging and metrics enable monitoring
- **Document for maintainers** - Future developers will thank you
- **AI accelerates, humans validate** - Use AI but review carefully

---

_Added to framework in v0.5.0_
