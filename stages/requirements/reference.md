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
(NFRs)** in your Requirements Brief:

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

### Operational NFR Catalog

Design-time targets by right-sizing tier. These define _what to require_ during
requirements elicitation — for runtime monitoring thresholds and alerting rules,
see
[Support Reference — Monitoring Thresholds and Baselines](../stages/support/reference.md#monitoring-thresholds-and-baselines).

| Category           | Minimal         | Standard                        | Enterprise                           |
| ------------------ | --------------- | ------------------------------- | ------------------------------------ |
| Availability       | No formal SLO   | 99.5 % monthly                  | 99.9 %+                              |
| Recovery (RTO/RPO) | Best effort     | < 4 h / < 24 h                  | < 1 h / < 1 h                        |
| Resilience (MTTR)  | Not tracked     | < 2 h                           | < 30 min                             |
| Throughput         | Not specified   | Defined at design               | Load-tested                          |
| Latency            | No SLA          | p95 < 1 s                       | p50 < 200 ms / p95 < 1 s / p99 < 2 s |
| Deployment         | Ad hoc          | Weekly; < 30 min rollback       | Daily+; < 5 min rollback             |
| Observability      | 7-day retention | 30-day; < 30 min alert response | 90-day; < 15 min alert response      |

Use these targets as starting points when writing operational NFRs. Adjust
values to match your domain, contractual obligations, and user expectations.

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

## AI-Led Patterns

### What AI Drives

At the AI-Led tier, AI takes ownership of the requirements drafting process end
to end rather than waiting for human direction. Concretely, this includes:

- Converting Initiation Brief goals into user stories with acceptance criteria
  formatted to the Given/When/Then structure
- Proactively detecting ambiguity across requirements — flagging terms that
  could be interpreted multiple ways and surfacing them for stakeholder
  clarification
- Enumerating edge cases beyond the happy path — boundary conditions, error
  states, concurrent-user scenarios, and data-quality failures
- Prompting for NFRs across all categories (performance, reliability, security,
  scalability, usability, observability, compliance) without being asked
- Generating traceability matrices that map requirements to Initiation Brief
  success criteria
- Flagging contradictions between requirements with both interpretations
  explicit, so stakeholders can choose rather than guess

### What Humans Validate

Domain correctness is the non-delegable human contribution to requirements.
Specifically:

- **Domain correctness:** Whether requirements reflect how the business actually
  works, not just how AI inferred it should work from the brief
- **Business priority and MoSCoW ranking:** AI can draft an initial ranking
  based on brief language, but stakeholders own the final prioritization
- **Stakeholder alignment:** Whether the requirements set reflects consensus
  among all parties consulted during Initiation
- **Acceptance criteria accuracy:** Whether the Given/When/Then criteria
  actually test the right behavior — AI can generate structurally correct
  criteria that test the wrong thing

### Oversight Intensity at This Stage

**Active or Passive oversight is typical for Requirements.** Active oversight is
recommended when:

- The domain is complex or novel and AI lacks reliable context — medical,
  financial, legal, or highly specialized business logic
- Requirements volatility is high — stakeholder alignment is still forming and
  scope is shifting
- The team is new to AI-Led requirements drafting

Passive oversight (human reviews at gates, AI proceeds between them) is
appropriate when:

- Requirements patterns are well-established within the organization — the team
  has done similar work before and the acceptance criteria format is consistent
- Domain expertise is available for fast spot-checks at gates

### Common Failure Modes

- **Missing domain-specific context:** AI generates requirements that are
  structurally correct but wrong for the domain — for example, a requirement
  that makes sense for a generic e-commerce system but conflicts with the
  organization's existing order management rules. Mitigation: domain expert
  review of every requirement before the requirements document is finalized.
- **Over-specifying implementation details:** AI conflates "what the system must
  do" with "how the system should do it" — producing requirements that constrain
  design unnecessarily. Mitigation: review each requirement against the
  behavior/implementation distinction in
  [**Requirements Terminology**](#requirements-terminology).
- **Inconsistent acceptance criteria:** Criteria for related stories use
  different thresholds, formats, or terminology — creating ambiguity during
  Verification. Mitigation: review acceptance criteria across related stories as
  a group, not individually.
- **Plausible but misaligned requirements:** AI generates requirements that
  sound correct based on the brief but do not reflect what stakeholders actually
  want — the brief described what they want to build, not why. Mitigation: trace
  each requirement back to a specific Initiation Brief success criterion.

### Fallback Protocol

When AI-generated content is uncertain or potentially incorrect:

- Flag contradictions explicitly with both interpretations presented, and
  request a stakeholder decision before resolving them — never silently choose
  one interpretation
- Request domain expert review for any requirement set touching unfamiliar
  domains; tag affected requirements with **[NEEDS DOMAIN REVIEW]**
- Default to more conservative scope when ambiguous — requirements that could go
  either way should start narrow and expand based on stakeholder input, not AI
  inference
- When acceptance criteria cannot be made objective, flag the requirement as
  needing a measurability review rather than proceeding with subjective criteria

### Session Handoff Notes

When handing off between AI sessions during Requirements, capture the following
state so the next session can continue without re-eliciting:

- Open requirements questions needing stakeholder input — specific ambiguities
  identified, not just a general note that "some things are unclear"
- Pending domain expert reviews — which requirements are tagged [NEEDS DOMAIN
  REVIEW] and who the relevant expert is
- Current coverage gaps — which Initiation Brief success criteria are not yet
  traced to requirements, which NFR categories have not been addressed
- Traceability status — what percentage of stories have accepted acceptance
  criteria and trace to at least one brief goal

---

## Notes

**Last Updated:** 2026-03-04

Added to framework in v0.12.0.
