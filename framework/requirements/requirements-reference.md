# Requirements Reference

Optional deep-dive companion to the [Requirements Guide](requirements-guide.md),
[Requirements Brief Template](requirements-brief-template.md), and
[Requirements Checklist](requirements-checklist.md). Consult when you need
specifics or a starting point for AI-assisted exploration.

---

## Requirements Terminology

### Functional Requirement (FR)

**Definition:** A statement of required system behavior describing what the
system must do.

**Format:** "The system shall..." or "As a <user>, I can <action> so that
<value>."

**Key characteristics:**

- Testable (can be validated in Verification stage)
- Behavior-focused (what, not how)
- Unambiguous (single interpretation)
- Traceable (unique identifier like FR-1, FR-2)

**Good examples:**

- "The system shall allow support agents to search by customer phone number and
  display conversation history within 2 seconds."
- "As a support agent, I can filter conversation history by date range so that I
  can focus on recent interactions."

**Bad examples (and why):**

- "Add a search page." — Too vague, not testable
- "Make search fast." — Not measurable, subjective
- "Use React for the UI." — Implementation detail

### Acceptance Criteria (AC)

**Definition:** Objective, observable criteria that define "done" for a
requirement.

**Format:** Often uses "Given/When/Then" structure or specifies measurable
conditions.

**Key characteristics:**

- Objective (no subjective judgments)
- Observable (can be detected/measured)
- Testable (can validate pass/fail)
- Complete (covers normal and edge cases)

**Good examples:**

- "Given an agent enters a valid 10-digit phone number, when they submit the
  search, then the system returns results within 2 seconds and displays the most
  recent message timestamp."
- "Given Tool B API is unavailable, when an agent searches, then the system
  displays Tool A data only with a 'Tool B temporarily unavailable' banner."

**Bad examples (and why):**

- "Search works well." — Subjective, not observable
- "Users are happy with performance." — Not measurable
- "The system is fast." — No specific threshold

### Non-Functional Requirement (NFR)

**Definition:** A quality attribute or constraint that shapes design, testing,
and user experience but doesn't describe specific functionality.

**Categories:**

- **Performance:** Latency, throughput, response time
- **Reliability:** Availability, error budgets, fault tolerance
- **Security:** Authentication, authorization, data protection, audit
- **Scalability:** Load capacity, growth projections, concurrency
- **Usability:** Accessibility, learnability, error recovery
- **Observability:** Logging, metrics, traces, SLOs
- **Compliance:** Regulatory requirements, data retention, privacy

**Key principle:** Include only NFRs that materially affect architecture
decisions, testing plans, or risk.

**Good examples:**

- "Search results: p95 < 2s, p99 < 5s under 500 req/min load."
- "99.9% uptime during business hours (8am-8pm ET)."
- "Agent must be authenticated; PII redacted in logs; access audit trail
  retained for 90 days."

**Bad examples (and why):**

- "The system should be fast." — Not measurable
- "Code should be maintainable." — Implementation concern
- "Use microservices architecture." — Design decision

> **AI exploration:** _"Help me write testable requirements and acceptance
> criteria for [describe > your feature and user personas]."_

---

## Brownfield Constraint Categories

For **brownfield projects** (extending existing systems), requirements must
capture **existing system constraints** as NFRs. These define the boundaries
within which new work must operate.

See
[Framework Guide: Greenfield vs. Brownfield](../framework-guide.md#greenfield-vs-brownfield-projects)
for conceptual overview.

### Why Existing Constraints Matter

**New work must fit within existing system boundaries:**

- Cannot break existing functionality or integrations
- Must meet established performance and reliability standards
- Must comply with existing security and compliance policies
- Must integrate with existing data models and API contracts
- Must operate within existing deployment constraints

**Failing to capture constraints early leads to:** late-stage design changes,
performance regressions, breaking changes, security/compliance violations, and
deployment failures.

### Constraint Categories

Document constraints across these categories as **Non-Functional Requirements
(NFRs)** in your Requirements Document:

#### 1. Performance Constraints

Existing SLAs and performance targets that new work must maintain or improve.

**Examples:**

- "All API endpoints must respond in <1 second (p95)"
- "Database query latency must not exceed 200ms (p99)"
- "System must support 10,000 concurrent users"

**Document as NFR:** "NFR-Performance-1: New search feature must not degrade
existing API response times; all endpoints must maintain p95 <1s under current
load."

#### 2. Security Policies

Authentication, authorization, encryption, and audit requirements already
enforced.

**Examples:**

- "All requests must use OAuth 2.0 with JWT tokens"
- "PII must be encrypted at rest using AES-256"
- "All admin actions must be logged to audit trail"

**Document as NFR:** "NFR-Security-1: New endpoints must use existing OAuth 2.0
authentication; all admin operations must write to existing audit log table."

#### 3. API Contracts

Existing API interfaces and integration contracts that must remain compatible.

**Examples:**

- "Public API v1 endpoints must maintain backward compatibility"
- "Webhook payloads must follow existing JSON schema"
- "Breaking changes require new major version"

**Document as NFR:** "NFR-Integration-1: New user fields must be added to
existing GET /api/v1/users response without breaking existing clients."

#### 4. Data Schemas and Constraints

Existing database schemas, data formats, validation rules, and referential
integrity.

**Examples:**

- "User table has unique constraint on email field"
- "Customer records must maintain foreign key to account table"
- "Phone numbers stored in E.164 format"

**Document as NFR:** "NFR-Data-1: New customer fields must be added to existing
customer table; must not violate existing foreign key constraints."

#### 5. Compliance Requirements

Regulatory, legal, and audit requirements already enforced.

**Examples:**

- "GDPR: Users must be able to request data deletion within 30 days"
- "HIPAA: PHI must be encrypted and access logged"
- "PCI DSS: Credit card data must not be stored in application database"

**Document as NFR:** "NFR-Compliance-1: New features handling user data must
support existing GDPR data deletion workflow."

#### 6. Architectural Constraints

Technology stack, frameworks, patterns, and coding standards already in use.

**Examples:**

- "Backend services use Python 3.11 with FastAPI"
- "All services must be containerized via Kubernetes"
- "Code must pass existing ESLint and Black linting"

**Document as NFR:** "NFR-Architecture-1: New backend features must use existing
FastAPI framework and follow established service patterns."

#### 7. Operational Constraints

Deployment windows, rollback procedures, monitoring standards, and on-call
processes.

**Examples:**

- "Deployments allowed only during change windows"
- "All changes must support zero-downtime rollback"
- "New services must integrate with existing monitoring"

**Document as NFR:** "NFR-Operations-1: New features must deploy within existing
change windows; database schema changes must be backward-compatible."

### Constraint NFR Template

```markdown
### NFR-[Category]-[Number]: [Short description]

**Constraint:** [Existing requirement to maintain]

**Rationale:** [Why this constraint exists]

**Impact on new work:** [How this constrains design]

**Validation:** [How to verify compliance]
```

### Brownfield Constraint Examples

```markdown
## Non-Functional Requirements (NFRs)

### Performance Constraints (Existing System)

**NFR-Perf-1: API Response Time SLA** Constraint: All API endpoints must
maintain p95 response time <1 second under production load. Rationale:
Contractual SLA with enterprise customers. Impact: New search feature may
require caching or async processing. Validation: Load testing; p95 latency
monitoring.

### Integration Constraints (Existing System)

**NFR-Integration-1: Public API Compatibility** Constraint: GET /api/v1/users
endpoint must maintain backward compatibility. Rationale: 50+ external
integrations depend on current API contract. Impact: New user attributes must be
added as optional fields; response schema extension only. Validation: API
contract tests; schema validation.
```

### How to Capture Existing Constraints

1. **Review existing documentation** — architecture docs, API specs, compliance
   policies, runbooks
2. **Interview engineering teams** — developers, DevOps, security, compliance
3. **Examine existing codebase** — data models, API contracts, configuration
4. **Identify integration points** — other systems, teams, or partners that
   depend on this system
5. **Document as NFRs** — capture in Non-Functional Requirements section
6. **Validate with stakeholders** — alignment review with engineering and
   operations

### Greenfield vs. Brownfield Comparison

| Aspect         | Greenfield               | Brownfield                           |
| -------------- | ------------------------ | ------------------------------------ |
| Constraints    | Business/regulatory only | + Existing system (SLAs, APIs, data) |
| NFR complexity | Define new standards     | Align with existing standards        |
| Integration    | From scratch             | Must integrate with existing systems |
| Performance    | No existing SLAs         | Must maintain existing SLAs          |
| Data models    | Design from scratch      | Extend existing schemas              |
| API contracts  | No backward compat       | Must maintain compatibility          |
| Risk           | Building wrong thing     | + Breaking existing functionality    |

### Common Mistakes

- **"We'll figure it out in System Design"** — Constraints discovered late cause
  architecture rework
- **"Existing system doesn't matter"** — Results in breaking changes,
  performance regressions
- **"Just add it to the database"** — Ignores schema constraints, referential
  integrity
- **"The API can change"** — Breaking changes disrupt partners
- **"Performance will be fine"** — New work degrades existing SLAs

> **AI exploration:** _"Help me identify existing system constraints for
> [describe your brownfield > project and existing system architecture]."_

---

## Why Each Requirements Section Matters

This section explains the rationale behind each section of the
[Requirements Brief Template](requirements-brief-template.md).

**Context (Section 1):** Provides quick orientation — what triggered this work,
where it sits in the roadmap.

**Users/Personas (Section 2):** Keeps requirements user-centered and helps
identify different needs.

**Problem (Section 3):** Prevents solution-first bias and provides context for
why requirements exist.

**Goals/Metrics (Section 4):** Success metrics from Initiation establish the
measurement throughline (see
[Framework Guide](../framework-guide.md#measurement-throughline)). Your role:
translate metrics into NFRs.

**Scope Baseline (Section 5):** MoSCoW prevents scope creep and enables faster
trade-off decisions.

**Functional Requirements (Section 6):** FRs define what the system must do.
Testable FRs enable objective validation. Each FR should pass the "testability
test."

**Acceptance Criteria (Section 7):** ACs define "done" and prevent subjective
debates during testing.

**NFRs (Section 8):** Shape architecture, testing, and user experience.
Observability is critical — translate success metrics into instrumentation
requirements.

**Data/Integrations (Section 9):** Many schedule slips come from unexamined
constraints (rate limits, SLAs, data ownership).

**Edge Cases (Section 10):** Often drive significant design complexity. Document
expected behavior early.

**Open Questions (Section 11):** Unresolved questions block System Design. Flag
blockers vs. nice-to-know.

**Requirements Readiness (Section 12):** Quality checkpoint confirming readiness
for System Design.

**Gate 2 Planning (Section 13):** Helps plan what System Design should produce
for the build/no-build decision.

> **AI exploration:** _"Review my requirements document for completeness and
> flag any missing sections or weak areas: [paste your requirements brief]."_

---

## Checklist Reference

### Exit Criteria Alignment

This checklist validates the Requirements stage exit criteria from
[AI-Assisted SDLC Stages](../framework-stages.md#stage-2-requirements):

- All high-priority requirements have acceptance criteria (Items 5-6)
- Requirements reviewed and approved by stakeholders (Item 12)
- NFRs include measurement/instrumentation needs (Item 7)
- Requirements are testable and unambiguous (Items 5-6)

### Critical Items

If items 5-7 and 11-12 are weak, requirements aren't ready for System Design:

- **Item 5 (Testable FRs):** System Design can't architect for vague
  requirements
- **Item 6 (Objective ACs):** System Design needs clear "done" definition for
  test planning
- **Item 7 (Key NFRs):** Architecture depends on performance, security,
  scalability requirements
- **Item 11 (Prioritization):** System Design needs focus for foundational pass
- **Item 12 (Review):** Prevents rework from misalignment

---

**Last Updated:** 2026-02-16

_Added to framework in v0.12.0_
