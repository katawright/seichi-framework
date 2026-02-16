# Requirements Guide

> Stage-specific guidance for Requirements. For cross-cutting framework
> concepts, see [Framework Guide](../framework-guide.md).

---

## Quick Reference

**Purpose:** Convert business objectives from Initiation into testable
requirements that enable coherent design, accurate test planning, and reduced
rework from ambiguity.

**Primary roles:** Business Analysts, Product Managers

**Execution pattern:** Foundational (once per project, revisitable)

**Key inputs:** Initiation Brief (objectives, success metrics, constraints)

**Key outputs:** Requirements Document (FRs, ACs, NFRs, prioritization)

**Handoff:** Design stage receives Requirements Document

**What good looks like:**

- FRs are behavior-focused and testable
- ACs are objective and observable (Given/When/Then)
- NFRs include observability for success metrics
- **Brownfield: Existing system constraints captured (SLAs, API contracts, data
  schemas)**
- MoSCoW priorities assigned (see
  [Framework Guide: MoSCoW](../framework-guide.md#moscow-prioritization))
- Edge cases and data constraints documented

**Common pitfalls:**

- Requirements describe UI/implementation, not behavior
- Acceptance criteria are subjective ("works well")
- "Everything is Must Have" — no real prioritization
- NFRs added late, causing architecture rework
- No observability NFRs for success metrics
- Data/integration constraints ignored
- Requirements not reviewed by engineering
- Edge cases discovered during testing

**Checkpoint:** Alignment Reviews throughout; feeds Gate 2 — see
[Framework Guide: Checkpoints](../framework-guide.md#checkpoint-taxonomy)

**AI assistance:** AI agent with human gate — see
[Framework Guide: AI Assistance](../framework-guide.md#ai-assistance-overview)

---

## Primary Audience

**Primary roles:** Business Analysts, Product Managers **Supporting roles:**
Engineers, Architects, QA Engineers

The language in Requirements artifacts is intentionally **business-focused with
technical precision** — accessible to non-technical stakeholders while rigorous
enough for engineering teams to design and test against.

---

## Terms

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

### MoSCoW Prioritization

This framework uses MoSCoW for coarse prioritization at the Requirements stage.
For full definitions and how priorities map to increments, see
[Framework Guide: MoSCoW Prioritization](../framework-guide.md#moscow-prioritization).

**In practice at Requirements stage:**

- **Must Have** = minimum set for first usable release
- **Should Have** = committed for future releases
- **Could Have** = opportunistic, not committed
- **Won't Have** = explicit exclusions (non-goals)

**Tip:** When in doubt, start with Should Have or Could Have; you can always
promote requirements later.

---

## Why These Requirements Elements Matter

### Context (Section 1)

**Why:** Provides quick orientation — what triggered this work, where it sits in
the roadmap, and how it connects to Initiation.

### Users / personas (Section 2)

**Why:** Keeps requirements user-centered and helps identify different
needs/workflows.

**Tip:** Carry forward from Initiation Brief; add detail about user workflows
and pain points.

### Problem to solve (Section 3)

**Why:** Prevents solution-first bias and provides context for why these
requirements exist. Carried forward from Initiation for traceability.

### Goals and success metrics (Section 4)

**Why:** Success metrics from Initiation establish the measurement throughline
(see
[Framework Guide: Measurement Throughline](../framework-guide.md#measurement-throughline)).

**Your role in Requirements:** Translate success metrics into NFRs:

- Performance target (e.g., "p90 < 30s") → latency NFR
- Outcome metric (e.g., "repeat contacts down 10%") → observability NFR
- Adoption metric (e.g., "80% daily usage") → FR for usage tracking

### Scope baseline (Section 5)

**Why:** Explicit MoSCoW prioritization and out-of-scope boundaries prevent
scope creep, focus design efforts, and enable faster trade-off decisions.

### Functional requirements (Section 6)

**Why:** FRs define **what** the system must do. Testable FRs enable objective
validation in Verification stage.

**Format:** Numbered (FR-1, FR-2) for traceability. **Tip:** Each FR should pass
the "testability test" — can QA write a test case for this?

### Acceptance criteria (Section 7)

**Why:** ACs define "done" for each requirement and prevent subjective debates
during testing.

**Format:** Given/When/Then or measurable conditions. **Common mistake:**
Subjective ACs like "fast" or "works well." Add measurable thresholds instead.

### Non-functional requirements (Section 8)

**Why:** NFRs shape architecture decisions, testing strategy, and user
experience. Capturing them early prevents late surprises.

**Observability is critical:** Translate success metrics into instrumentation
requirements. Example:

- Success metric: "p90 time-to-context < 30s"
- Observability NFR: "Log search latency (p50/p90/p99); alert if p95 exceeds 3s"

### Data and integrations (Section 9)

**Why:** Many schedule slips come from unexamined data/integration constraints
(rate limits, SLAs, data ownership, retention policies).

### Edge cases and error handling (Section 10)

**Why:** Edge cases often drive significant design complexity. Documenting
expected behavior early prevents rework.

### Open questions (Section 11)

**Why:** Unresolved questions block Design work. Flag blockers vs. nice-to-know;
resolve blockers before declaring requirements ready.

### Requirements readiness (Section 12)

**Why:** Quality checkpoint confirming requirements are ready to guide Design
work.

**Ready when:**

- FRs have objective ACs
- NFRs captured (including observability)
- Stakeholders aligned (reviews complete)
- Open questions resolved or mitigated

### Gate 2 planning (Section 13)

**Why:** Helps plan ahead for what Design should produce to enable the
build/no-build decision. See
[Framework Guide: Checkpoints](../framework-guide.md#checkpoint-taxonomy) for
Gate 2 details.

---

## Brownfield Projects: Capturing Existing System Constraints

For **brownfield projects** (extending existing systems), requirements must
capture **existing system constraints** in addition to new functional
requirements. These constraints define the boundaries within which new work must
operate.

See
[Framework Guide: Greenfield vs. Brownfield](../framework-guide.md#greenfield-vs-brownfield-projects)
for conceptual overview.

### Why Existing Constraints Matter

**New work must fit within existing system boundaries:**

- Cannot break existing functionality or integrations
- Must meet established performance and reliability standards
- Must comply with existing security and compliance policies
- Must integrate with existing data models and API contracts
- Must operate within existing deployment and operational constraints

**Failing to capture constraints early leads to:**

- Late-stage design changes when conflicts are discovered
- Performance regressions affecting existing users
- Breaking changes to APIs that other teams depend on
- Security or compliance violations
- Deployment failures due to operational mismatches

**When captured early, constraints:**

- Guide architecture decisions to avoid conflicts
- Enable accurate effort estimates
- Prevent breaking changes
- Ensure smooth integration with existing systems
- Reduce rework and deployment delays

### Categories of Existing System Constraints

Capture constraints across these categories and document them as
**Non-Functional Requirements (NFRs)** in your Requirements Document:

#### 1. Performance Constraints

Existing SLAs and performance targets that new work must maintain or improve.

**Examples:**

- "All API endpoints must respond in <1 second (p95)"
- "Database query latency must not exceed 200ms (p99)"
- "Page load time must remain <2 seconds (p90)"
- "System must support 10,000 concurrent users"
- "Batch processing must complete within 4-hour maintenance window"

**Document as NFR:** "NFR-Performance-1: New search feature must not degrade
existing API response times; all endpoints must maintain p95 <1s under current
load."

#### 2. Security Policies

Authentication, authorization, encryption, and audit requirements already
enforced.

**Examples:**

- "All requests must use OAuth 2.0 with JWT tokens"
- "PII must be encrypted at rest using AES-256"
- "All admin actions must be logged to audit trail with 1-year retention"
- "API access requires API key authentication with rate limiting"
- "Database connections must use TLS 1.3"

**Document as NFR:** "NFR-Security-1: New endpoints must use existing OAuth 2.0
authentication; all admin operations must write to existing audit log table."

#### 3. API Contracts

Existing API interfaces, data formats, and integration contracts that must
remain compatible.

**Examples:**

- "Public API v1 endpoints must maintain backward compatibility"
- "Webhook payloads must follow existing JSON schema"
- "GraphQL schema changes must not break existing queries"
- "REST API versioning policy: breaking changes require new major version"
- "Partner integrations expect XML format with specific schema"

**Document as NFR:** "NFR-Integration-1: New user fields must be added to
existing GET /api/v1/users response without breaking existing clients; response
schema extension only (no removals or type changes)."

#### 4. Data Schemas and Constraints

Existing database schemas, data formats, validation rules, and referential
integrity.

**Examples:**

- "User table has unique constraint on email field"
- "Customer records must maintain foreign key to account table"
- "Status field must be one of: pending, active, suspended, closed"
- "Created_at timestamps stored in UTC; UI displays in user timezone"
- "Phone numbers stored in E.164 format"

**Document as NFR:** "NFR-Data-1: New customer fields must be added to existing
customer table; must not violate existing foreign key constraints or unique
indexes."

#### 5. Compliance Requirements

Regulatory, legal, and audit requirements already enforced by existing system.

**Examples:**

- "GDPR: Users must be able to request data deletion within 30 days"
- "HIPAA: PHI must be encrypted and access logged"
- "SOC 2: All database changes must be auditable"
- "PCI DSS: Credit card data must not be stored in application database"
- "Data residency: EU user data must remain in EU region"

**Document as NFR:** "NFR-Compliance-1: New features handling user data must
support existing GDPR data deletion workflow; all PII access must be logged to
compliance audit table."

#### 6. Architectural Constraints

Technology stack, frameworks, patterns, and coding standards already in use.

**Examples:**

- "Backend services use Python 3.11 with FastAPI framework"
- "Frontend uses React 18 with TypeScript"
- "All services must be containerized and orchestrated via Kubernetes"
- "Database is PostgreSQL 15; no new database technologies"
- "Code must pass existing ESLint and Black linting rules"

**Document as NFR:** "NFR-Architecture-1: New backend features must use existing
FastAPI framework and follow established service patterns; must pass existing
linting and type checking."

#### 7. Operational Constraints

Deployment windows, rollback procedures, monitoring standards, and on-call
processes.

**Examples:**

- "Deployments allowed only during change windows: Tue/Thu 2-4pm ET"
- "All changes must support zero-downtime rollback"
- "New services must integrate with existing Datadog monitoring"
- "Database migrations must be backward-compatible for rollback"
- "On-call team must be trained on new features before production deployment"

**Document as NFR:** "NFR-Operations-1: New features must deploy within existing
change windows; database schema changes must be backward-compatible to support
rollback."

### How to Capture Existing Constraints

**Process:**

1. **Review existing documentation** — architecture docs, API specs, compliance
   policies, operational runbooks
2. **Interview engineering teams** — developers, DevOps, security, compliance
   teams who know the system
3. **Examine existing codebase** — review data models, API contracts,
   configuration
4. **Identify integration points** — what other systems, teams, or external
   partners depend on this system?
5. **Document as NFRs** — capture constraints in Non-Functional Requirements
   section with specific thresholds and formats
6. **Validate with stakeholders** — alignment review with engineering and
   operations teams to confirm accuracy

**Template for documenting constraints as NFRs:**

```markdown
### NFR-[Category]-[Number]: [Short description]

**Constraint:** [Existing requirement that must be maintained]

**Rationale:** [Why this constraint exists — e.g., compliance, partner contract,
performance SLA]

**Impact on new work:** [How this constrains design/implementation]

**Validation:** [How to verify compliance — e.g., test, measurement, review]
```

### Example: Brownfield Requirements NFRs

```markdown
## Non-Functional Requirements (NFRs)

### Performance Constraints (Existing System)

**NFR-Perf-1: API Response Time SLA** Constraint: All API endpoints must
maintain p95 response time <1 second under production load (10k req/min).
Rationale: Contractual SLA with enterprise customers; monitored and reported
monthly. Impact: New search feature must not degrade existing endpoint
performance; may require caching or async processing. Validation: Load testing
against production traffic patterns; p95 latency monitoring.

### Integration Constraints (Existing System)

**NFR-Integration-1: Public API Compatibility** Constraint: GET /api/v1/users
endpoint must maintain backward compatibility; existing fields and response
structure cannot change. Rationale: 50+ external integrations depend on current
API contract; breaking changes require 6-month migration cycle. Impact: New user
attributes must be added as optional fields; response schema extension only.
Validation: API contract tests; schema validation against v1 spec.

### Compliance Constraints (Existing System)

**NFR-Compliance-1: GDPR Data Deletion** Constraint: New features storing user
data must support existing GDPR deletion workflow (30-day SLA). Rationale: GDPR
regulatory requirement; existing compliance process handles deletion requests.
Impact: New tables must include user_id foreign key; deletion service must be
updated to purge new tables. Validation: Test deletion workflow with new data;
verify 30-day SLA met.
```

### Greenfield vs. Brownfield Requirements Differences

| Aspect                    | Greenfield                           | Brownfield                                               |
| ------------------------- | ------------------------------------ | -------------------------------------------------------- |
| **Constraints**           | Only business/regulatory constraints | + Existing system constraints (SLAs, APIs, data schemas) |
| **NFR complexity**        | Define new standards                 | Must align with existing standards                       |
| **Integration**           | New integrations from scratch        | Must integrate with existing systems and APIs            |
| **Performance baselines** | No existing SLAs                     | Must maintain or improve existing SLAs                   |
| **Data models**           | Design from scratch                  | Extend existing schemas; maintain referential integrity  |
| **API contracts**         | No backward compatibility concerns   | Must maintain backward compatibility                     |
| **Deployment**            | Define new deployment process        | Follow existing deployment windows and procedures        |
| **Risk**                  | Risk of building wrong thing         | + Risk of breaking existing functionality                |

### Common Mistakes

- **"We'll figure it out in Design"** — Constraints discovered late cause
  architecture rework
- **"Existing system doesn't matter"** — Results in breaking changes,
  performance regressions, integration failures
- **"Just add it to the database"** — Ignores schema constraints, referential
  integrity, data migration complexity
- **"The API can change"** — Breaking changes disrupt partners, requiring
  extensive coordination
- **"Performance will be fine"** — New work degrades existing SLAs, triggering
  contract penalties

### Integration with Framework

**Design stage** (next) uses these constraints to:

- Make architecture decisions that fit within existing system boundaries
- Plan infrastructure adaptations (see
  [Design Guide: Infrastructure Planning](../design/design-guide.md#infrastructure-planning))
- Identify integration points and compatibility requirements

**Verification stage** must test:

- No regressions to existing functionality
- Constraints still satisfied (performance, security, compatibility)
- Integration tests with existing systems pass

---

## Common Pitfalls (and Fixes)

- **Requirements describe UI, not behavior** "Add a search box in the top-right
  corner." → Rewrite as behavior: "The system shall allow agents to search by
  customer phone number."

- **Acceptance criteria are subjective** "Search is fast and works well." → Add
  observable signals: "Results in <2s (p95); displays most recent timestamp."

- **"Everything is Must Have"** All 30 requirements marked Must Have. → Force
  prioritization; Must Have is the minimum usable set.

- **NFRs added late** Performance requirements discovered in staging. → Capture
  performance, security, scalability NFRs early.

- **No observability NFRs** Success metrics defined but no instrumentation
  requirements. → Add observability NFRs for each success metric.

- **Data/integration constraints ignored** Design discovers API rate limit
  requiring caching. → Document rate limits, SLAs, data ownership early.

- **Requirements not reviewed by engineering** Technical infeasibility
  discovered late. → Conduct alignment reviews with engineering.

- **Edge cases discovered during testing** "Customer has multiple phone numbers"
  — no expected behavior documented. → Document top edge cases early.

---

## When to Expand Beyond Minimal

Expand Requirements only when needed:

- **Regulated / compliance-heavy:** Add control requirements, compliance
  sign-off, regulatory constraints
- **Complex data migrations:** Add data mapping, transformation rules, migration
  success criteria
- **Multi-team interface work:** Add interface contracts, API schemas,
  cross-team SLAs
- **High availability / performance:** Add detailed SLOs, load assumptions,
  fault tolerance specs
- **Security-sensitive:** Add threat model, auth/authz requirements,
  audit/monitoring requirements

Otherwise, keep Requirements concise and move to Design stage.

---

## When to Revisit Requirements

Requirements is a foundational stage but revisitable when circumstances change:

**Triggers:**

- Design reveals better approach (pivot decision)
- Business priorities shift or new constraints emerge
- Technical infeasibility discovered
- Stakeholder feedback indicates misalignment
- Compliance or regulatory changes
- Major architectural or platform change

**Process:**

1. Update Requirements Document with changes
2. Conduct alignment review with stakeholders
3. Re-run requirements-checklist.md to verify readiness
4. Update Design artifacts to reflect changes
5. Assess impact on schedule/scope/risk

---

## AI Assistance Guidance

**Assistance level:** AI agent with human gate — see
[AI Assistance Scorecard](../framework-ai-assistance.md)

**Why:** Requirements involve business judgment, stakeholder alignment, and
domain knowledge that AI cannot independently verify.

**AI's role:**

- Draft requirements from Initiation Brief
- Suggest acceptance criteria and NFRs
- Identify potential edge cases
- Analyze completeness (run checklist)

**Human's role:**

- Own all decisions
- Validate with stakeholders (alignment reviews)
- Approve outputs
- Ensure accuracy and testability
- Resolve ambiguities and conflicts

**Critical validation points:**

1. Do FRs accurately reflect stakeholder needs?
2. Are ACs objective and testable?
3. Did AI identify the right NFRs and constraints?
4. Are priorities aligned with business goals?
5. Are edge cases comprehensive?

---

## Notes

**Last Updated:** 2026-02-14

Added to framework in v0.3.0.
