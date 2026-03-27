# System Design Reference

## Overview

Optional deep-dive companion to the [System Design Stage Guide](README.md),
[System Design Brief Template](../../templates/system-design-brief.md), and
[System Design Checklist](checklist.md). Consult when you need specifics or a
starting point for AI-assisted exploration.

### Why System Design Practices

System design decisions — infrastructure topology, technology selection,
security architecture, performance targets — are the hardest to change later.
This reference provides evaluation frameworks, worked examples, and
anti-patterns so that design choices are deliberate rather than defaulted.

### Goals of This Reference

- Provide detailed examples and format guidance for the System Design Brief
- Cover infrastructure planning, increment sizing, estimation, and technology
  selection in depth
- Document security, performance, observability design patterns, and common
  anti-patterns
- Supply checklist troubleshooting when items fail

### Key Principle

Design for the constraints you have, not the scale you imagine. Every
architectural decision should trace to a concrete requirement or risk.

### How to Use This Reference

1. Start with the [**System Design Stage Guide**](README.md) for workflow and
   rationale
2. Use this reference when you need specifics — detailed examples, evaluation
   criteria, or troubleshooting guidance
3. Follow **AI exploration** prompts in each section to get AI-assisted help
   with that topic

---

## Infrastructure Planning

Infrastructure planning is a **required output** of System Design for both
greenfield and brownfield projects. The goal is to ensure working development,
testing, deployment, and monitoring infrastructure exists before feature
delivery begins.

See
[Framework Guide: Greenfield vs. Brownfield](../../guides/framework.md#greenfield-vs-brownfield-projects)
for conceptual overview.

### Why Infrastructure Planning Matters

**Without infrastructure:**

- No way to deploy code for testing or production
- No automated testing in CI pipeline
- No visibility into system health or performance
- Manual, error-prone deployment processes
- Cannot measure success criteria

**With infrastructure:**

- Automated build, test, and deployment pipelines
- Consistent environments (dev, staging, production)
- Monitoring and observability from day one
- Repeatable, low-risk deployments
- Success criteria tracked automatically

### Greenfield Infrastructure Planning

For **new projects built from scratch**, infrastructure must be created. System
Design outputs an infrastructure plan that becomes **Increment 0: Bootstrap** —
establishing the foundation before feature work begins.

**Required infrastructure planning outputs:**

1. **Version Control and Code Organization**
   - Repository structure and branching strategy
   - Code organization conventions (monorepo vs. multi-repo)
   - Commit and PR standards
   - **ADR:** Document repository and branching strategy

2. **CI/CD Pipeline Design**
   - Build automation (compilation, dependencies)
   - Test automation stages (unit, integration, e2e)
   - Quality gates (coverage, linting, security scans)
   - Deployment automation (environments, approvals)
   - **ADR:** Document CI/CD tool selection and design

3. **Environment Strategy**
   - Development environment (local dev, shared dev)
   - Staging environment (production-like)
   - Production environment (live system)
   - Environment parity strategy
   - **ADR:** Document environment architecture

4. **Deployment Strategy**
   - Deployment pattern (blue-green, canary, rolling)
   - Rollback procedures and automation
   - Database migration strategy
   - Configuration management (env vars, secrets)
   - **ADR:** Document deployment strategy

5. **Monitoring and Observability Architecture**
   - Logging infrastructure (structured logs, aggregation, retention)
   - Metrics collection (RED/USE, business metrics)
   - Tracing and profiling capabilities
   - Alerting rules and on-call procedures
   - Success criteria instrumentation
   - **ADR:** Document observability stack

6. **Security and Compliance Infrastructure**
   - Secret management (API keys, credentials)
   - Security scanning (SAST, DAST, dependency)
   - Access controls (deploy permissions, production access)
   - Compliance automation (audit logs, retention)
   - **ADR:** Document security tooling

7. **Increment Plan Update**
   - **Increment 0: Bootstrap** — establish all above
   - Increment 1+: Feature delivery using established infrastructure
   - Success criteria: "Deploy hello world app through full pipeline to
     production"

**Bootstrap Increment 0 execution:**

The bootstrap increment goes through the standard Increment Design ->
Implementation -> Verification -> Deployment cycle:

- **Increment Design:** Detailed infrastructure specifications
- **Implementation:** Build pipelines, configure environments, implement
  monitoring
- **Verification:** Test pipelines work, validate deployments, verify monitoring
- **Deployment:** Deploy a "hello world" app through the full pipeline to
  production

**Outcome:** Working infrastructure ready for feature delivery in Increment 1+.

### Brownfield Infrastructure Planning

For **projects extending existing systems**, infrastructure already exists but
the approach differs based on whether AI context has been established.

**Two brownfield scenarios:**

1. **First AI-assisted project** — No documented AI context. Increment 0 focuses
   on **discovery and documentation**.

2. **Subsequent AI-assisted projects** — AI context exists from prior work. No
   Increment 0 is needed; Increment 1 proceeds to **feature delivery**, using
   and updating existing documentation.

This distinction is **surfaced during Initiation/Requirements** when the team
identifies project type.

#### First AI-Assisted Project (Discovery)

When AI assistance is first introduced to a brownfield project, existing
architecture and conventions are typically **not documented in a format AI can
use**.

**What to document:**

**Essential (blocks effective AI assistance):**

- System architecture overview (components, boundaries, data flow, integration
  points)
- Technology stack (languages, frameworks, databases, major libraries, versions)
- Key constraints (performance SLAs, security policies, API contracts, data
  schemas)

**Important (significantly improves AI effectiveness):**

- Infrastructure setup (CI/CD, deployment, environments, monitoring)
- Coding conventions and patterns (naming, organization, practices)
- Critical business logic areas (authentication, payments, core workflows)
- Database-layer logic (stored procedures, triggers, views containing business
  rules)

**Nice-to-have (add iteratively):**

- Retroactive ADRs for historical decisions
- Detailed component internals
- Full dependency mapping, including cross-repository dependencies and
  database-to-application data flows

**Discovery approach:**

**AI can auto-discover much of this context** using tools like Claude Code's
`/init` command:

- Programming languages and frameworks
- Project structure and organization
- Dependencies and libraries
- Coding patterns and conventions
- Configuration and environment variables

**Team experts verify AI discoveries and supplement:**

- Confirm AI findings are accurate
- Add business context AI cannot infer
- Document constraints and historical decisions
- Explain architectural choices and trade-offs
- Identify critical areas requiring special handling

**Documentation structure:**

**Use existing project structure if present** (e.g., `docs/`, `docs/adr/`,
`ARCHITECTURE.md`). Consistency with existing conventions reduces friction.

**Suggest structure if none exists:**

- `AGENTS.md` — Tool-agnostic AI context file
- `docs/architecture/` — Architecture diagrams
- `docs/adr/` — Architecture Decision Records
- `CONTRIBUTING.md` — Coding standards
- `docs/infrastructure/` — Deployment, CI/CD, monitoring

**Impact on increment planning:**

If discovery reveals minimal gaps, Increment 2+ proceeds with feature work as
planned. If discovery reveals significant infrastructure gaps (missing CI/CD,
monitoring, security), findings may trigger:

- Return to Requirements stage to adjust scope
- Revised increment plan addressing gaps
- Updated risk assessment and Gate 2 decision
- Extended Increment 0 for critical gaps

#### Subsequent Projects (Existing AI Context)

For brownfield projects where **AI context already exists**, System Design
outputs an **assessment and adaptation plan**.

**Required outputs:**

1. **Infrastructure Assessment** — Existing capabilities, limitations, gaps vs.
   project needs
2. **Integration and Adaptation Plan** — How new code integrates with existing
   pipelines, extensions needed
3. **Constraint Documentation** — Deployment windows, tech constraints,
   compliance requirements
4. **Context Usage and Updates** — Use existing docs as AI context, update based
   on changes
5. **Increment Plan Update** — No Increment 0 needed; Increment 1 is first
   feature increment (infrastructure exists)

### Infrastructure ADRs

Infrastructure decisions are **architectural decisions** and must be documented
in ADRs. Use the framework's [ADR template](../../templates/adr.md).

**Common infrastructure ADRs:**

- CI/CD Platform Selection
- Cloud Provider and Deployment Model
- Database Hosting Strategy
- Monitoring and Observability Stack
- Secret Management Approach
- Deployment Strategy

**Critical:** Include **cost analysis** in infrastructure ADRs — cloud costs
scale with usage.

### Infrastructure vs. Application Architecture

**Infrastructure architecture** (covered here):

- How code gets built, tested, deployed, and monitored
- Environments, pipelines, observability systems
- Enables software delivery

**Application architecture** (covered in other sections):

- How the software is structured internally
- Components, APIs, data models, technology stack
- Defines what gets delivered

### Minimal Infrastructure

Even the smallest projects need:

- Version control (GitHub/GitLab)
- Basic CI (run tests on PR)
- Simple deployment (git push, serverless function)
- Basic monitoring (uptime checks, error alerts)

### Common Infrastructure Anti-Patterns

- **"We'll add CI/CD later"** — results in manual, error-prone deployments
- **"Production is the test environment"** — leads to outages and poor UX
- **"No monitoring until it breaks"** — reactive firefighting
- **"Developers don't need staging"** — increases production incidents
- **"Infrastructure isn't architecture"** — poor tooling becomes expensive tech
  debt

<!-- prettier-ignore -->
> **AI exploration:** _"Design an infrastructure plan for
> [describe your project type, team size, and deployment requirements]."_

---

## Increment Sizing Guidance

Well-sized increments deliver testable value while fitting your team's cadence.

**Characteristics of well-sized increments:**

- Delivers testable, demonstrable functionality
- Can be deployed independently or builds on prior increments
- Fits within deployment cadence and feedback cycle
- Balances value delivery with deployment overhead

**Methodology examples:**

- **Scrum:** Align to sprint length (commonly 2 weeks); 1 increment per sprint
- **Kanban:** Size for frequent deployment (3-7 day cycles); focus on WIP limits
- **SAFe:** Fit increments within Program Increments; break large features into
  chunks
- **Waterfall:** Use milestones as increments (architecture, MVP, etc.)

**Context considerations:**

- **Team size:** Solo developers favor smaller increments (3-7 days); larger
  teams can tackle 2-3 weeks or parallelize
- **Deployment maturity:** Mature CI/CD enables smaller increments; manual
  processes favor larger batches
- **Domain complexity:** Complex/uncertain domains benefit from smaller
  increments

**Warning signs — increments too large:**

- Cannot deliver within planned timeframe
- Long gaps between deployments or user feedback
- High risk if increment needs to be cut

**Warning signs — increments too small:**

- Deployment overhead exceeds value delivered
- Partial features that cannot be tested independently
- Excessive coordination between coupled increments

**Research backing:** DORA State of DevOps reports show smaller batch sizes and
frequent deployment correlate with higher performance.

<!-- prettier-ignore -->
> **AI exploration:** _"Help me size increments for
> [describe your team size, methodology, and deployment maturity]."_

---

## Increment Estimation Guidance

Software estimation is probabilistic, not deterministic. Research shows even
"good" estimates vary significantly.

**The 25/75 standard:**

Conte, Dunsmore, and Shen (1986) established that "good" software estimates fall
within **+/-25% of actual effort 75% of the time**. Single-point estimates
create false precision — ranges communicate realistic confidence levels.

**Citation:** Conte, S. D., Dunsmore, H. E., & Shen, V. Y. (1986). _Software
Engineering Metrics and Models_. Benjamin/Cummings Publishing Company.

**Duration vs. Effort:**

- **Duration:** Calendar time to complete (e.g., 1.5-2.5 weeks) — affects
  timeline
- **Effort:** Total person-time required (e.g., 4-5 person-weeks) — affects cost
- Both should be expressed as ranges

**Range-based estimates:**

**Good:**

- Duration: 1.5-2.5 weeks (estimate)
- Effort: 8-12 person-days (estimate)
- Cost: $40K-$60K (estimate)

**Avoid:**

- Duration: 2 weeks
- Effort: 10 person-days
- Cost: $50K

**Estimation techniques:**

**Expert judgment with historical data:** Individual estimates calibrated
against past similar work. Fast and common; validate with team review.

**Planning Poker (team-based):** Team collaboratively estimates using relative
sizing. Based on Wideband Delphi method. Builds consensus and surfaces
assumptions.

**Three-point estimation:** Estimate optimistic, most likely, and pessimistic
scenarios. Use optimistic-pessimistic as your range, or calculate weighted
average: (O + 4M + P) / 6.

**Decomposition:** Break increment into tasks, estimate individually, sum with
contingency. More accurate for detailed design.

**No single technique is "best."** The key is using ranges, acknowledging
uncertainty, and refining as more information emerges.

> **AI exploration:** _"Help me estimate [describe your increment scope] using
> [estimation technique]."_

---

## Technology Selection Details

### Key Considerations

When choosing technologies, evaluate:

1. **Team skills** — learning curve, hiring availability
2. **Organizational standards** — approved tech, existing infrastructure
3. **Requirements fit** — solves the specific problem?
4. **Ecosystem maturity** — community, libraries, tools
5. **Long-term maintainability** — upgrade path, support
6. **Performance/scalability** — meets NFRs?
7. **Security/compliance** — vulnerabilities, regulatory fit

### Cost Research (Mandatory)

**Research pricing BEFORE selecting technology:**

- **One-time costs:** Licenses, setup, migration, training
- **Recurring costs:** Subscriptions, per-usage, infrastructure
- **Scaling costs:** How does cost change at 10x/100x?
- **Hidden costs:** Support contracts, integration, professional services

Document costs in ADRs and include in Gate 2 decision package.

### Common Trade-offs

**Monolith vs. Microservices:** Start with modular monolith; split only when
scaling or team org requires it.

**SQL vs. NoSQL:** Use relational for structured, transactional data; NoSQL for
unstructured, high-scale, or document-centric data.

**REST vs. GraphQL:** REST for simple CRUD; GraphQL for complex data with varied
client needs.

Document significant technology choices as ADRs.

<!-- prettier-ignore -->
> **AI exploration:** _"Compare [technology options] for
> [describe your use case, team skills, and NFRs]."_

---

## Security and Compliance Design

Security must be designed into the system from the start, not retrofitted.

### Key Security Areas

- **Authentication:** Use proven libraries (OAuth, JWT). Never store passwords
  in plaintext.
- **Authorization:** RBAC or ABAC with least-privilege. Validate server-side.
- **Data encryption:** TLS 1.3 in transit, AES-256 at rest. Secure key
  management.
- **Input validation:** Server-side validation and sanitization. Parameterized
  queries.
- **OWASP Top 10:** Address during design — consult
  [OWASP](https://owasp.org/Top10/) for guidance.

### Compliance

Identify applicable regulations (GDPR, HIPAA, SOC 2) early and map requirements
to design decisions:

- Data residency and retention
- Access controls and audit trails
- Consent tracking and right-to-deletion
- Encryption and key management

<!-- prettier-ignore -->
> **AI exploration:** _"Design a security architecture for
> [describe your application, data sensitivity, and compliance requirements]."_

---

## Performance and Scalability Design

### Measurable Targets

Use percentiles (p95, p99) rather than averages — averages hide outliers. Derive
targets from NFRs.

### Key Design Considerations

- **Caching strategy:** What to cache, where (CDN, application, database), TTL
  policies
- **Database optimization:** Indexes, query optimization, connection pooling,
  N+1 prevention
- **Async processing:** Offload slow operations to background jobs
- **Scaling approach:** Horizontal (add servers, stateless design) vs. vertical
  (bigger servers)
- **Database scaling:** Read replicas, sharding, instance sizing

Design for your actual NFRs — don't optimize prematurely, but don't ignore
performance either.

> **AI exploration:** _"Design a performance and scalability strategy for
> [describe your NFRs, expected load, and technology stack]."_

---

## Observability and Monitoring Design

Design instrumentation that captures success criteria from Initiation. See
[Framework Guide: Measurement Throughline](../../guides/framework.md#measurement-throughline).

### Instrumentation Strategy

**What to log:**

- Errors and exceptions (with stack traces)
- Authentication events
- Critical business events
- Security events

**What NOT to log:** Passwords, API keys, PII.

**Metrics to collect:**

- RED: Requests, Errors, Duration (p50/p95/p99)
- USE: Utilization, Saturation, Errors
- Business metrics tied to success criteria

**Alerting design:**

- Critical -> page on-call (system down, data loss)
- Warning -> email/Slack (high error rate, resources)
- Actionable alerts only — avoid alert fatigue

### Success Criteria Instrumentation

Map each success criterion to metrics, instrumentation, and dashboards:

| Success Criterion | Metric   | Instrumentation     |
| ----------------- | -------- | ------------------- |
| [Criterion]       | [Metric] | [Collection method] |

<!-- prettier-ignore -->
> **AI exploration:** _"Design an observability strategy for
> [describe your application, success criteria, and monitoring requirements]."_

---

## Common Design Anti-Patterns

- **Big Ball of Mud** — no clear architecture, tight coupling. Fix: separate
  concerns, define boundaries.
- **God Object** — single class does too much. Fix: Single Responsibility
  Principle.
- **Premature Optimization** — optimizing without profiling. Fix: build simple
  first, optimize bottlenecks.
- **Analysis Paralysis** — endless design, never coding. Fix: design enough to
  start, iterate.
- **Tight Coupling** — components depend on internals. Fix: depend on
  interfaces, use DI.
- **Golden Hammer** — same tech for everything. Fix: evaluate options per
  problem.

<!-- prettier-ignore -->
> **AI exploration:** _"Review this design for anti-patterns:
> [describe your architecture and component structure]."_

---

## Design Brief Examples

This section provides detailed examples for the
[System Design Brief Template](../../templates/system-design-brief.md). Use as a
reference when filling out your project's brief.

### System Context Example

```
Actors:
- End Users: Access via web browser
- Administrators: Manage system via admin portal
- Payment Service: External Stripe API for payments
- Email Service: SendGrid for transactional emails

External Systems:
- Authentication: Auth0 for user identity
- Analytics: Google Analytics for usage tracking
```

### System Architecture Example

```
Architecture Style: Three-tier web application

Components:
1. Frontend (React SPA)
   - User interface, client-side routing, API client

2. Backend API (Node.js/Express)
   - REST API endpoints, business logic,
     authentication/authorization, data access layer

3. Database (PostgreSQL)
   - Relational data storage (users, content,
     transactions)

4. Cache (Redis)
   - Session storage, API response caching

5. Background Jobs (Bull/Redis)
   - Async processing (emails, reports)
```

### Technology Stack Example

| Category     | Choice               | Justification             | ADR      |
| ------------ | -------------------- | ------------------------- | -------- |
| **Frontend** | React 18             | Team expertise, ecosystem | ADR-D004 |
| **Backend**  | Node.js 20 + Express | JS full-stack             | ADR-D005 |
| **Database** | PostgreSQL 15        | ACID, relational          | ADR-D001 |
| **Cache**    | Redis 7              | In-memory, pub/sub        | ADR-D006 |
| **Auth**     | JWT tokens           | Stateless, standard       | ADR-D003 |
| **Hosting**  | Cloud managed        | Scalability, reduced ops  | ADR-D007 |
| **CI/CD**    | GitHub Actions       | Integrated, free tier     | -        |

### ADR List Example

| ADR      | Title                           | Status   | Cost Impact |
| -------- | ------------------------------- | -------- | ----------- |
| ADR-D001 | Database Selection (PostgreSQL) | Accepted | ~$3-6K/yr   |
| ADR-D002 | File Upload (Presigned URLs)    | Accepted | ~$60-180/yr |
| ADR-D003 | Authentication (JWT)            | Accepted | Minimal     |
| ADR-D004 | Frontend Framework (React)      | Accepted | Free (OSS)  |

### Data Model Example

```
Core Entities:
- User: id, email, name, role, created_at
- Post: id, user_id, title, content, status, created_at
- Comment: id, post_id, user_id, content, created_at
- Tag: id, name

Relationships:
- User has many Posts (one-to-many)
- Post has many Comments (one-to-many)
- Post has many Tags (many-to-many via post_tags)
```

### Integration Points Example

| Integration | Purpose   | Pattern         | Error Handling         |
| ----------- | --------- | --------------- | ---------------------- |
| Auth0       | User auth | OAuth 2.0       | Fallback to local auth |
| Stripe      | Payments  | REST + webhooks | Retry with backoff     |
| SendGrid    | Email     | REST API        | Queue for retry        |

### Increment Plan Example

> **Note:** This example shows feature increments (Increment 1+). If your
> project requires an Increment 0 (bootstrap for greenfield or discovery for
> brownfield first AI-assisted), it would precede these increments. See
> [System Design Stage Guide: Infrastructure Planning](README.md#infrastructure-planning).

#### Increment 1: Foundation (Must Have)

**Goal:** Establish authentication, database, and core API infrastructure

**Value Delivered:** Secure user accounts and API access — enables all
user-facing features

**Requirements:** FR-1, FR-2, NFR-1, NFR-2, NFR-3 **Duration:** 1.5-2.5 weeks
(estimate) **Team:** 2 engineers + 0.25 architect **Effort:** 3.5-5.5
person-weeks (estimate) **Dependencies:** None

**Why first:** Foundation for all user-facing features, de-risks authentication
early, establishes development patterns.

#### Increment 2: Core Features (Must Have)

**Goal:** Deliver primary user-facing functionality

**Value Delivered:** Users can create and manage content — core product
experience is usable

**Requirements:** FR-3, FR-4, FR-5, NFR-4 **Duration:** 1.5-2.5 weeks (estimate)
**Team:** 2 engineers + 0.5 QA **Effort:** 4-6 person-weeks (estimate)
**Dependencies:** Increment 1

**Why second:** Core value proposition, enables UAT, tests performance.

#### Increment 3: Enhancements (Should Have)

**Goal:** Add search, filtering, and notification capabilities

**Value Delivered:** Improved content discoverability and user engagement

**Requirements:** FR-6, FR-7, FR-8, NFR-5 **Duration:** 1.5-2.5 weeks (estimate)
**Dependencies:** Increment 2

#### Increment 4: Advanced Features (Should Have)

**Goal:** Add analytics dashboard and bulk operations

**Value Delivered:** Admin visibility into usage patterns and efficient content
management

**Requirements:** FR-9, FR-10, NFR-6 **Duration:** 1.5-2.5 weeks (estimate)
**Dependencies:** Increment 3

#### Could Have (Opportunistic)

- FR-11: Dark mode — evaluate in Increment 2
- FR-12: Real-time comments (WebSockets) — evaluate in Increment 3
- FR-13: Keyboard shortcuts — evaluate in Increment 2

#### Won't Have (Out of Scope)

- FR-14: Mobile native apps — Phase 2
- FR-15: Multi-language (i18n) — English-only launch
- FR-16: Video/image upload — too complex
- FR-17: Social media integration — low priority

#### Increment Plan Summary Table

| Inc | Type        | Value Delivered        | Requirements      | Duration      | Effort     | Dependencies |
| --- | ----------- | ---------------------- | ----------------- | ------------- | ---------- | ------------ |
| 1   | Must Have   | Auth + API foundation  | FR-1,2, NFR-1,2,3 | 1.5-2.5 wk    | 3.5-5.5 pw | None         |
| 2   | Must Have   | Core content mgmt      | FR-3,4,5, NFR-4   | 1.5-2.5 wk    | 4-6 pw     | Inc 1        |
| 3   | Should Have | Search + notifications | FR-6,7,8, NFR-5   | 1.5-2.5 wk    | 4-6 pw     | Inc 2        |
| 4   | Should Have | Analytics + bulk ops   | FR-9,10, NFR-6    | 1.5-2.5 wk    | 4.5-6.5 pw | Inc 3        |
| -   | Could Have  | -                      | FR-11,12,13       | Opportunistic | TBD        | Varies       |
| -   | Won't Have  | -                      | FR-14,15,16,17    | Out of scope  | N/A        | -            |

### Gate 2 Cost Calculation Example

**Cost Calculation:**

1. Determine blended rate (salary + benefits + overhead)
2. Calculate: effort range x hours/week x blended rate

| Blended Rate | Cost Range (estimate) |
| ------------ | --------------------- |
| $100/hour    | $64,000-$96,000       |
| $150/hour    | $96,000-$144,000      |
| $200/hour    | $128,000-$192,000     |

**Infrastructure Costs Example (moderate web app):**

- Hosting: $200/month
- Database: $300/month (managed PostgreSQL with HA)
- Storage: $20/month
- CDN: $50/month
- Monitoring: $100/month
- Email: $30/month
- **Total: ~$700/month (~$8,400/year)**

---

## Checklist Troubleshooting

**Common issues and solutions:**

- **Architecture doesn't address all requirements** -> Review
  requirements-brief, revisit architecture
- **Technology choices not justified** -> Document trade-offs in ADRs
- **Increment plan missing or unclear** -> Map MoSCoW priorities to increments
  with dependencies
- **Security/performance not addressed** -> Add sections to design brief
- **Infrastructure not planned** -> Define CI/CD, environments, monitoring,
  deployment strategy
- **Major unknowns remain** -> Prototype or spike risky areas before proceeding

<!-- prettier-ignore -->
> **AI exploration:** _"Help me troubleshoot
> [describe the checklist item that's failing and your current design state]."_

---

## AI-Led Patterns

### What AI Drives

At the AI-Led tier, AI takes ownership of the architecture exploration and
documentation process rather than waiting for human direction. Concretely, this
includes:

- Proposing multiple architecture options with explicit trade-off analysis —
  presenting options rather than a single recommendation, so humans choose
- Drafting interface and API designs based on requirements, including data
  contracts and error handling patterns
- Producing initial data model drafts with entity relationships and constraint
  analysis
- Generating threat-model checklists covering OWASP Top 10 and infrastructure
  attack surfaces relevant to the project context
- Drafting Architecture Decision Records (ADRs) for significant technology
  choices, including cost analysis
- Planning infrastructure across environments (CI/CD, monitoring, deployment
  strategy) and flagging gaps against requirements
- Proposing increment sizing based on the requirements set and project
  complexity

### What Humans Validate

System Design has the highest blast radius of the foundational stages —
foundational decisions are difficult and expensive to reverse. Human validation
is non-negotiable in the following areas:

- **Architecture decisions:** Require alignment — architecture council or tech
  lead sign-off. AI proposes; humans decide.
- **Security model and data flow:** No security-critical decision should be
  finalized without human review. This includes authentication architecture,
  authorization model, data residency, and encryption choices.
- **Rollback and migration plans:** AI drafts these, but humans must verify that
  they are executable against the actual production environment and team
  capabilities.
- **Technology selections with organizational fit:** AI evaluates technologies
  against stated requirements, but cannot assess organizational politics,
  existing vendor relationships, team hiring pipelines, or undocumented
  constraints.
- **Gate 2 (Investment Decision):** Requires thorough human approval — this gate
  commits the organization to a specific architecture and investment level.

### Oversight Intensity at This Stage

**Active oversight is strongly recommended for System Design.** System Design
produces foundational decisions that are difficult and expensive to reverse —
architecture, data model, security model, and infrastructure choices all have
downstream consequences across every subsequent stage.

Active oversight (human reviews every gate thoroughly) should be the default
unless the following conditions are both true:

- The design follows well-established organizational patterns — the team has
  built multiple systems using the same stack, and the architecture is a
  well-understood variation of prior work
- A tech lead or architect is engaged throughout the process, not just at gates

Passive oversight (human reviews at hard gates only) is appropriate only when
both conditions above are met. Even then, the Gate 2 investment decision
requires active review regardless of tier.

**Minimal oversight is not appropriate for System Design** under any
circumstances — the blast radius of a flawed architecture or missed security
concern is too high.

### Common Failure Modes

- **Over-engineering:** Adding architectural complexity for hypothetical future
  needs that are not grounded in stated requirements — microservices for a
  two-person team, event sourcing for a simple CRUD application. Mitigation:
  anchor every architectural element to a specific requirement or stated NFR; if
  no requirement motivates the complexity, remove it.
- **Ignoring operational constraints:** Designing a system that meets functional
  requirements but cannot be deployed, monitored, or supported given actual team
  capacity, deployment windows, or infrastructure budget. Mitigation: review the
  design against the operational constraints section of the brief before
  finalizing.
- **Resume-driven architecture:** Choosing technologies for novelty or prestige
  rather than fit — the team's tool preferences, not the project's requirements,
  drive the stack. Mitigation: every technology selection must trace to a
  specific requirement, NFR, or organizational standard documented in an ADR.
- **Insufficient attention to data migration and rollback:** AI focuses on the
  happy-path architecture and omits migration complexity, rollback procedures,
  and backward compatibility constraints. Mitigation: require explicit migration
  and rollback sections in the design brief before Gate 2.

### Session Handoff Notes

When handing off between AI sessions during System Design, capture the following
state so the next session can continue without re-deriving context:

- Key ADRs drafted and their current status — Proposed, Accepted, or Needs
  Review — and which decisions are still open
- Unresolved trade-offs between architecture options where a human decision is
  required before the session can proceed
- Pending specialized reviews — which ADRs or design sections are awaiting
  architecture council, security review, or tech lead sign-off
- Infrastructure decisions that affect downstream stages — CI/CD choices,
  environment strategy, deployment patterns — so that Increment Design and
  Implementation can build on confirmed decisions rather than assumed ones

---

## Fallback Protocol

These protocols apply at all autonomy tiers, not only AI-Led. See [Agentic Workflow Guide: Error and Fallback Guidance](../../guides/agentic-workflow.md#error-and-fallback-guidance) for the central fallback protocols.

**Extends:** Missing Input, Ambiguous Requirements. **Overrides:** none.

When AI-generated content is uncertain or potentially incorrect:

- Present multiple architecture options with explicit trade-off tables rather
  than committing to a single approach — this preserves the human decision
  rather than encoding AI preference into the artifact
- Escalate to the architecture council when uncertain about trade-offs between
  non-trivial options; do not resolve architectural ambiguity through AI
  inference alone
- Document all design assumptions in ADRs with an explicit "Assumed" status —
  treat assumed constraints as open questions until verified by relevant
  stakeholders
- Never finalize security-critical decisions (authentication architecture, data
  flow for PII, encryption choices) without human review, regardless of
  confidence level

---

## Related Documents

- [System Design Stage Guide](README.md)
- [System Design Checklist](checklist.md)
- [System Design Brief Template](../../templates/system-design-brief.md)
- [ADR Template](../../templates/adr.md)

---

## Notes

**Last Updated:** 2026-03-25

Added to framework in v0.12.0.
