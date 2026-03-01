# Requirements Reference

## Overview

Detailed definitions, examples, and format guidance for requirements terminology
and brownfield constraints.

### Why Requirements Terminology

Ambiguous terms like "requirement," "acceptance criteria," and "non-functional
requirement" mean different things to different teams. Shared definitions
prevent miscommunication during elicitation, review, and handoff to System
Design.

### Purpose

- Define key requirements terms (FR, AC, NFR) with format guidance and examples
- Provide brownfield constraint categories with NFR templates
- Give practitioners concrete starting points for AI-assisted requirements work

### Key Principle

Every term definition includes good and bad examples — use the examples to
calibrate your own requirements before moving to System Design.

### How to Use This Reference

1. Look up terms in [**Requirements Terminology**](#requirements-terminology)
   when writing or reviewing FRs, ACs, or NFRs
2. Use [**Brownfield Constraint Categories**](#brownfield-constraint-categories)
   to identify existing system constraints for brownfield projects
3. Copy the [**Constraint NFR Template**](#constraint-nfr-template) as a
   starting point for documenting constraints as NFRs

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
> criteria for [describe your feature and user personas]."_

---

## Brownfield Constraint Categories

For **brownfield projects** (extending existing systems), requirements must
capture **existing system constraints** as NFRs. These define the boundaries
within which new work must operate.

See
[Framework Guide: Greenfield vs. Brownfield](../../guides/framework.md#greenfield-vs-brownfield-projects)
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

Document constraints across these categories as **Non-Functional Requirements
(NFRs)** in your Requirements Document:

### 1. Performance Constraints

Existing SLAs and performance targets that new work must maintain or improve.

**Examples:**

- "All API endpoints must respond in <1 second (p95)"
- "Database query latency must not exceed 200ms (p99)"
- "System must support 10,000 concurrent users"

**Document as NFR:** "NFR-Performance-1: New search feature must not degrade
existing API response times; all endpoints must maintain p95 <1s under current
load."

### 2. Security Policies

Authentication, authorization, encryption, and audit requirements already
enforced.

**Examples:**

- "All requests must use OAuth 2.0 with JWT tokens"
- "PII must be encrypted at rest using AES-256"
- "All admin actions must be logged to audit trail"

**Document as NFR:** "NFR-Security-1: New endpoints must use existing OAuth 2.0
authentication; all admin operations must write to existing audit log table."

### 3. API Contracts

Existing API interfaces and integration contracts that must remain compatible.

**Examples:**

- "Public API v1 endpoints must maintain backward compatibility"
- "Webhook payloads must follow existing JSON schema"
- "Breaking changes require new major version"

**Document as NFR:** "NFR-Integration-1: New user fields must be added to
existing GET /api/v1/users response without breaking existing clients."

### 4. Data Schemas and Constraints

Existing database schemas, data formats, validation rules, and referential
integrity.

**Examples:**

- "User table has unique constraint on email field"
- "Customer records must maintain foreign key to account table"
- "Phone numbers stored in E.164 format"

**Document as NFR:** "NFR-Data-1: New customer fields must be added to existing
customer table; must not violate existing foreign key constraints."

### 5. Compliance Requirements

Regulatory, legal, and audit requirements already enforced.

**Examples:**

- "GDPR: Users must be able to request data deletion within 30 days"
- "HIPAA: PHI must be encrypted and access logged"
- "PCI DSS: Credit card data must not be stored in application database"

**Document as NFR:** "NFR-Compliance-1: New features handling user data must
support existing GDPR data deletion workflow."

### 6. Architectural Constraints

Technology stack, frameworks, patterns, and coding standards already in use.

**Examples:**

- "Backend services use Python 3.11 with FastAPI"
- "All services must be containerized via Kubernetes"
- "Code must pass existing ESLint and Black linting"

**Document as NFR:** "NFR-Architecture-1: New backend features must use existing
FastAPI framework and follow established service patterns."

### 7. Operational Constraints

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

```
## Non-Functional Requirements (NFRs)

### Performance Constraints (Existing System)

**NFR-Perf-1: API Response Time SLA**

**Constraint:** All API endpoints must maintain p95 response
time <1 second under production load.
**Rationale:** Contractual SLA with enterprise customers.
**Impact on new work:** New search feature may require
caching or async processing.
**Validation:** Load testing; p95 latency monitoring.

### Integration Constraints (Existing System)

**NFR-Integration-1: Public API Compatibility**

**Constraint:** GET /api/v1/users endpoint must maintain
backward compatibility.
**Rationale:** 50+ external integrations depend on current
API contract.
**Impact on new work:** New user attributes must be added as
optional fields; response schema extension only.
**Validation:** API contract tests; schema validation.
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
> [describe your brownfield project and existing system architecture]."_

---

## Notes

**Last Updated:** 2026-02-27

Added to framework in v0.12.0.
