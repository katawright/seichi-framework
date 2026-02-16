# Design Guide

> Stage-specific guidance for Design. For cross-cutting framework concepts, see
> [Framework Guide](../framework-guide.md).

---

## Quick Reference

**Purpose:** Translate requirements into implementable technical solutions —
architecture, technology choices, and an increment plan for incremental
delivery.

**Primary roles:** Engineers, Solutions Architects

**Execution pattern:** Foundational (once for system architecture) + Iterative
(per increment for detailed design)

**Key inputs:** Requirements Document (FRs, ACs, NFRs, MoSCoW priorities)

**Key outputs:**

- System architecture and technology decisions (ADRs)
- Infrastructure architecture and planning (CI/CD, deployment,
  observability)
- Increment plan mapping priorities to increments
- Detailed component designs per increment
- **Test strategy for Verification stage** (what to test, how to test,
  coverage targets)

**What good looks like:**

- Architecture addresses all requirements and NFRs
- Technology choices justified in ADRs with cost analysis
- Increment plan sequences Must Haves first, with clear dependencies
- Each increment delivers testable value
- Security, performance, and observability designed in
- Instrumentation planned for success criteria
- **Test strategy detailed enough for Verification to execute** (prevents
  rework)

**Common pitfalls:**

- Over-designing future increments (YAGNI)
- No increment plan — jumping straight to coding
- Technology chosen without cost research
- Security/performance considered as afterthoughts
- No ADRs for significant decisions
- Analysis paralysis — endless design, no code

**Checkpoint:** Alignment Review + Gate 2 — see
[Framework Guide: Checkpoints](../framework-guide.md#checkpoint-taxonomy)

**AI assistance:** AI agent + strong gates — see
[Framework Guide: AI Assistance](../framework-guide.md#ai-assistance-overview)

---

## What Is Design?

Design bridges "what we need to build" (Requirements) and "how we'll build it"
(Implementation).

**Purpose:**

1. **Technical planning** — determine how requirements will be implemented
2. **Risk reduction** — identify technical challenges before coding
3. **Architecture alignment** — ensure components work together coherently
4. **Implementation guidance** — clear specifications for engineers
5. **Increment sequencing** — create a realistic delivery roadmap
6. **Quality foundation** — build testability, security, and performance into
   the design

**Foundational design outputs:**

- System architecture diagrams
- Technology stack selections with justification (ADRs)
- Infrastructure architecture (CI/CD, deployment, environments, monitoring)
- Data and API architecture
- Security and compliance approach
- Observability and monitoring strategy
- Iteration plan for incremental delivery

**Iterative design outputs (per increment):**

- Detailed component specifications
- API endpoint designs
- Data model changes and migrations
- Test strategies
- Implementation notes

---

## Foundational vs. Iterative Design

The Design stage has a unique **dual execution pattern**.

### Foundational Design (Once per Project)

**When:** After Requirements stage, before first increment

**Scope:**

- System-wide decisions (architecture, technology, data model, API conventions)
- Infrastructure planning (CI/CD pipelines, deployment, environments,
  monitoring)
- Cross-cutting concerns (security, observability, performance approach)
- Increment planning (mapping MoSCoW priorities to increments)

**Key principle:** Make decisions that are expensive to change later.

**Checkpoint:** Alignment Review, then Gate 2 (build/no-build decision)

### Iterative Design (Per Increment)

**When:** Before implementing each increment

**Scope:**

- Increment-specific components and interactions
- API endpoint specifications
- Data model changes for this increment
- Test strategy for this increment

**Key principle:** Just enough design to implement confidently — avoid
over-designing future increments.

**Checkpoint:** Optional Quality Checkpoint for complex increments

### How They Interact

Foundational design creates the rules; iterative design applies them:

- Foundational: "We use REST APIs with JWT auth"
- Iterative: "POST /api/v1/posts with Bearer token"

Foundational design creates the increment plan; iterative design executes it:

- Foundational: "Increment 1 includes FR-1, FR-2, FR-3"
- Iterative: "Detailed design for user registration (FR-1)"

Iterative design creates test strategy; Verification stage executes it:

- Design (iterative): "Integration tests for POST /api/v1/auth/register: valid
  input → 201, duplicate email → 409"
- Verification: Executes planned tests, adapts as needed, validates acceptance
  criteria

Foundational design is revisited rarely; iterative design is adjusted based on
implementation feedback.

---

## Architecture Principles

Follow established principles — SOLID, Separation of Concerns, DRY, YAGNI, KISS
— when making design decisions. These are well-documented in standard
engineering references; consult your team's standards or ask your AI agent for
guidance on applying them to specific design problems.

**Key design decisions to document:**

- Component boundaries and responsibilities
- Layering strategy (presentation, business logic, data access)
- Dependency direction (depend on abstractions)
- Where to apply patterns vs. keep things simple

---

## Technology Selection

### Key Considerations

When choosing technologies, evaluate:

1. **Team skills** — learning curve, hiring availability
2. **Organizational standards** — approved tech, existing infrastructure
3. **Requirements fit** — does it solve the specific problem?
4. **Ecosystem maturity** — community, libraries, tools
5. **Long-term maintainability** — upgrade path, support horizon
6. **Performance/scalability** — meets NFRs?
7. **Security/compliance** — vulnerabilities, regulatory fit

### Cost Research (Mandatory)

**Research pricing BEFORE selecting technology:**

- **One-time costs:** Licenses, setup, migration, training
- **Recurring costs:** Subscriptions, per-usage fees, infrastructure
- **Scaling costs:** How does cost change at 10x/100x?
- **Hidden costs:** Support contracts, integration, professional services

Document costs in ADRs and include in Gate 2 decision package. A cheap solution
at low volume may become expensive at scale.

### Common Trade-offs

**Monolith vs. Microservices:** Start with modular monolith; split only when
scaling or team org requires it.

**SQL vs. NoSQL:** Use relational for structured, transactional data; NoSQL for
unstructured, high-scale, or document-centric data.

**REST vs. GraphQL:** REST for simple CRUD; GraphQL for complex data with varied
client needs.

Document significant technology choices as ADRs.

---

## Creating Increment Plans

The increment plan is a **key output of foundational design**. It maps MoSCoW
priorities from Requirements to specific, deliverable increments. See
[Framework Guide: MoSCoW](../framework-guide.md#moscow-prioritization) for
priority definitions.

### Planning Best Practices

- **Use range-based estimates:** Express duration and effort as ranges (e.g.,
  1.5-2.5 weeks), not single points, to acknowledge inherent uncertainty
- **Deliver value incrementally:** each increment ships something usable
- **Build foundations first:** auth, database, API framework before features
- **De-risk early:** technically uncertain work in early increments
- **Allow for discovery:** don't over-plan distant increments
- **Make Could Haves truly optional:** don't commit in timelines

### Planning Process

1. **Review requirements** — all FRs, NFRs, MoSCoW priorities, acceptance
   criteria
2. **Identify dependencies** — which requirements depend on others?
3. **Assess risk and complexity** — technically uncertain items first
4. **Group into increments** — Must Haves first, delivering testable value
5. **Sequence increments** — dependencies first, then risk/value balance
6. **Map Should Haves** — assign to later increments based on dependencies and
   value
7. **Handle Could Haves** — mark as opportunistic, "build if easy, skip if hard"
8. **Document Won't Haves** — explicitly list exclusions
9. **Estimate duration and effort as ranges** — duration (calendar time to
   complete, e.g., 1.5-2.5 weeks) and effort (person-weeks, e.g., 4-5
   person-weeks) for each increment
10. **Calculate cost range for Gate 2** — effort range x blended rate, compare
    to Initiation estimates

### Increment Plan Format

```markdown
## Increment Plan

### Increment 1: [Name] (Must Have - Foundation)

**Goal:** [What this increment delivers] **Requirements:** FR-1, FR-2, NFR-1,
NFR-2 **Duration:** 1.5-2.5 weeks (estimate) **Team:** 2 engineers, 1 architect
(25%) **Effort:** 4-5 person-weeks (estimate) **Dependencies:** None

### Increment 2: [Name] (Must Have - Core)

**Requirements:** FR-3, FR-4, FR-5 **Duration:** 1.5-2.5 weeks (estimate)
**Dependencies:** Increment 1

### Could Have (Opportunistic)

- FR-9: Build if easy during Increment 2

### Won't Have (Out of Scope)

- FR-11, FR-12: Deferred to Phase 2

### Gate 2 Cost Calculation

Total effort range × blended rate = project cost range Compare to Initiation
estimates
```

### Increment Sizing Guidance

Well-sized increments deliver testable value while fitting your team's cadence.

**Characteristics of well-sized increments:**

- Delivers testable, demonstrable functionality (not partial features)
- Can be deployed independently or builds on prior increments
- Fits within your deployment cadence and stakeholder feedback cycle
- Balances value delivery with deployment/validation overhead

**Methodology examples:**

- **Scrum:** Align to sprint length (commonly 2 weeks per Scrum Guide); deliver
  1 increment per sprint
- **Kanban/Continuous Flow:** Size for frequent deployment (3-7 day cycle
  times); focus on WIP limits
- **SAFe:** Fit increments within Program Increments; break large features into
  smaller chunks
- **Waterfall:** Use milestones as increments (architecture milestone, MVP
  milestone, etc.)

**Context considerations:**

- **Team size:** Solo developers favor smaller increments (3-7 days); larger
  teams can tackle 2-3 weeks or parallelize
- **Deployment maturity:** Mature CI/CD enables smaller increments; manual
  processes favor larger batches
- **Domain complexity:** Complex/uncertain domains benefit from smaller
  increments to manage risk

**Warning signs - increments too large:**

- Cannot deliver within planned timeframe
- Long gaps between deployments or user feedback
- High risk if increment needs to be cut

**Warning signs - increments too small:**

- Deployment overhead exceeds value delivered
- Increments deliver partial features that cannot be tested independently
- Excessive coordination between tightly-coupled increments

**Research backing:** DORA State of DevOps reports show smaller batch sizes and
frequent deployment correlate with higher performance. Lean manufacturing
principles support minimizing work-in-progress and batch size.

### Increment Estimation Guidance

Software estimation is probabilistic, not deterministic. Research shows that even
"good" estimates vary significantly from actuals.

**The 25/75 standard:**

Conte, Dunsmore, and Shen (1986) established that "good" software estimates fall
within **±25% of actual effort 75% of the time**. This demonstrates that
single-point estimates create false precision — uncertainty is inherent in
software work, and ranges communicate realistic confidence levels.

**Citation:** Conte, S. D., Dunsmore, H. E., & Shen, V. Y. (1986). *Software
Engineering Metrics and Models*. Benjamin/Cummings Publishing Company.

**Duration vs. Effort:**

- **Duration:** Calendar time to complete the increment (e.g., 1.5-2.5 weeks) —
  affects project timeline and stakeholder expectations
- **Effort:** Total person-time required (e.g., 4-5 person-weeks) — affects cost
  and staffing decisions
- Both should be expressed as ranges to acknowledge uncertainty

**Use range-based estimates:**

**Good:**

- Duration: 1.5-2.5 weeks (estimate)
- Effort: 8-12 person-days (estimate)
- Cost: $40K-$60K (estimate)

**Avoid:**

- Duration: 2 weeks
- Effort: 10 person-days
- Cost: $50K

**Estimation techniques:**

Multiple techniques exist for estimating software work. Choose based on your
team's context, or combine techniques for better accuracy:

**Expert judgment with historical data:** Individual or lead engineer estimates
based on experience, calibrated against past similar work. Fast and common, but
validate with team review.

**Planning Poker (team-based):** Team collaboratively estimates using relative
sizing (story points). Based on Wideband Delphi method. Builds consensus and
surfaces assumptions. Time-consuming but valuable for complex or uncertain work.

**Three-point estimation:** Estimate optimistic (best case), most likely, and
pessimistic (worst case) scenarios. Use optimistic-pessimistic as your range
(e.g., 6-14 days), or calculate weighted average: (O + 4M + P) / 6.

**Decomposition:** Break increment into tasks, estimate tasks individually, sum
with contingency. More accurate for detailed design, but time-intensive.

**No single technique is "best."** The key is using ranges, acknowledging
uncertainty, and refining estimates as more information emerges.

---

## Infrastructure Planning

Infrastructure planning is a **required output** of foundational design for both
greenfield and brownfield projects. The goal is to ensure working development,
testing, deployment, and monitoring infrastructure exists before feature
delivery begins.

See
[Framework Guide: Greenfield vs. Brownfield](../framework-guide.md#greenfield-vs-brownfield-projects)
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

For **new projects built from scratch**, infrastructure must be created.
Foundational design outputs an infrastructure plan that becomes **Increment 1:
Bootstrap** — establishing the foundation before feature work begins.

**Required infrastructure planning outputs:**

1. **Version Control and Code Organization**
   - Repository structure and branching strategy (trunk-based, GitFlow, etc.)
   - Code organization conventions (monorepo vs. multi-repo)
   - Commit and PR standards
   - **ADR:** Document repository and branching strategy decisions

2. **CI/CD Pipeline Design**
   - Build automation (compilation, dependency management)
   - Test automation stages (unit, integration, e2e)
   - Quality gates (test coverage thresholds, linting, security scans)
   - Deployment automation (environments, approval workflows)
   - **ADR:** Document CI/CD tool selection and pipeline design

3. **Environment Strategy**
   - Development environment (local dev setup, shared dev environment)
   - Staging environment (production-like for pre-release testing)
   - Production environment (live system serving users)
   - Environment parity strategy (minimize differences)
   - **ADR:** Document environment architecture and hosting decisions

4. **Deployment Strategy**
   - Deployment pattern (blue-green, canary, rolling, recreate)
   - Rollback procedures and automation
   - Database migration strategy
   - Configuration management (environment variables, secrets)
   - **ADR:** Document deployment strategy and tooling

5. **Monitoring and Observability Architecture**
   - Logging infrastructure (structured logs, aggregation, retention)
   - Metrics collection (RED/USE metrics, custom business metrics)
   - Tracing and profiling capabilities
   - Alerting rules and on-call procedures
   - Success criteria instrumentation (from Initiation stage)
   - **ADR:** Document observability stack selection

6. **Security and Compliance Infrastructure**
   - Secret management (API keys, credentials, certificates)
   - Security scanning (SAST, DAST, dependency scanning)
   - Access controls (who can deploy, who can access production)
   - Compliance automation (audit logs, data retention policies)
   - **ADR:** Document security tooling and policies

7. **Increment Plan Update**
   - **Increment 1: Bootstrap** — establish all infrastructure above
   - Increment 2+: Feature delivery using established infrastructure
   - Success criteria: "Deploy hello world app through full pipeline to
     production"

**Bootstrap Increment 1 execution:**

The bootstrap increment goes through the standard Design → Implementation →
Verification → Deployment cycle:

- **Design (iterative):** Detailed infrastructure specifications
- **Implementation:** Build pipelines, configure environments, implement
  monitoring
- **Verification:** Test that pipelines work, validate deployments, verify
  monitoring
- **Deployment:** Deploy a simple "hello world" application through the full
  pipeline to production

**Outcome:** Working infrastructure ready for feature delivery in Increment 2+.

### Brownfield Infrastructure Planning

For **projects extending existing systems**, infrastructure already exists but
the approach differs based on whether AI context has been established.

**Two brownfield scenarios:**

1. **First AI-assisted project** — Existing system has no documented AI context
   (architecture, infrastructure, conventions). Increment 1 focuses on
   **discovery and documentation** to enable effective AI assistance.

2. **Subsequent AI-assisted projects** — AI context exists from prior work.
   Increment 1 proceeds directly to **feature delivery**, using and updating
   existing documentation.

This distinction is **surfaced during Initiation/Requirements** when the team
identifies project type.

---

#### First AI-Assisted Project (Discovery)

When AI assistance is first introduced to a brownfield project, existing
architecture, infrastructure, and conventions are typically **not documented in
a format AI can use**. Future AI assistance relies on this context being
captured.

**This discovery need is surfaced during Initiation/Requirements** when the team
identifies: "This is a brownfield project without existing AI context
documentation."

**Discovery work happens in Increment 1**, similar to how greenfield projects
establish infrastructure in Increment 1. Subsequent AI-assisted projects on the
same system use and update this existing documentation.

**What to document:**

**Essential (blocks effective AI assistance):**

- System architecture overview (components, boundaries, data flow, integration
  points)
- Technology stack (languages, frameworks, databases, major libraries, versions)
- Key constraints (performance SLAs, security policies, API contracts, data
  schemas)

**Important (significantly improves AI effectiveness):**

- Infrastructure setup (CI/CD pipelines, deployment processes, environments,
  monitoring)
- Coding conventions and patterns (naming standards, code organization,
  established practices)
- Critical business logic areas (authentication, payment processing, core
  workflows)

**Nice-to-have (add iteratively as needed):**

- Retroactive ADRs documenting historical decisions and rationale
- Detailed component internals
- Full dependency mapping and integration details

**Discovery approach:**

**AI can auto-discover much of this context** using tools like Claude Code's
`/init` command or similar capabilities:

- Programming languages and frameworks
- Project structure and organization
- Dependencies and libraries
- Coding patterns and conventions
- Configuration and environment variables

**Team experts verify AI discoveries and supplement:**

- Confirm AI findings are accurate and complete
- Add business context AI cannot infer
- Document constraints and historical decisions
- Explain architectural choices and trade-offs
- Identify critical areas requiring special handling

**Documentation structure:**

**Use existing project structure if present:**

- If the project has `docs/`, `docs/adr/`, `ARCHITECTURE.md`, etc., use that
  structure
- Consistency with existing conventions reduces friction

**Suggest structure if none exists:**

- `AGENTS.md` — Tool-agnostic AI context file (project overview, key concepts,
  conventions)
- `docs/architecture/` — Architecture diagrams and system overview
- `docs/adr/` — Architecture Decision Records
- `CONTRIBUTING.md` or `CONVENTIONS.md` — Coding standards and practices
- `docs/infrastructure/` — Deployment, CI/CD, monitoring documentation

**Allow customization:** Teams can organize documentation differently based on
their preferences. The goal is capturing context, not enforcing structure.

**Increment 1: Discovery execution:**

The discovery increment follows the standard Design → Implementation →
Verification → Deployment cycle:

- **Design (iterative):** Plan what to document and how to structure it
- **Implementation:** Use AI tools to discover context, experts verify and
  document
- **Verification:** Review documentation for completeness and accuracy
- **Deployment:** Commit documentation to version control, make available for
  future AI sessions

**Impact on increment planning:**

**If discovery reveals minimal gaps:**

- Increment 1 completes discovery and documentation
- Increment 2+ proceeds with feature work as planned

**If discovery reveals significant infrastructure gaps:**

- Missing CI/CD pipelines, monitoring, or security tooling
- Major technical debt or compliance issues
- Undocumented critical systems or integrations

**These findings may trigger:**

- Return to Requirements stage to adjust scope based on newly-understood
  constraints
- Revised increment plan addressing infrastructure gaps before feature work
- Updated risk assessment and Gate 2 decision with infrastructure investment
  costs
- Extended Increment 1 to address critical gaps

**Outcome:** Documented architecture, infrastructure, and conventions that
enable effective AI assistance on future work. Team has baseline understanding
of system state and risks.

---

#### Subsequent Projects (Existing AI Context)

For brownfield projects where **AI context already exists** from prior work,
foundational design outputs an **assessment and adaptation plan** rather than
building from scratch or rediscovering existing architecture.

**Required infrastructure planning outputs:**

1. **Infrastructure Assessment**
   - Existing CI/CD capabilities and limitations
   - Current deployment processes and frequency
   - Available environments and their configurations
   - Monitoring and observability coverage
   - Security and compliance tooling in place
   - Gaps between existing infrastructure and project needs

2. **Integration and Adaptation Plan**
   - How new code integrates with existing pipelines
   - Required pipeline extensions or modifications
   - Environment provisioning needs (new services, databases, etc.)
   - Monitoring extensions (new metrics, dashboards, alerts)
   - Security scanning updates for new technologies
   - **ADRs:** Document significant infrastructure changes

3. **Constraint Documentation**
   - Deployment windows and approval processes
   - Technology and tooling constraints
   - Environment access and permissions
   - Compliance and security requirements
   - Performance and reliability SLAs to maintain

4. **Context Usage and Updates**
   - Use existing documentation (AGENTS.md, architecture docs, ADRs) as AI
     context
   - Update documentation based on changes made in this project
   - Add new ADRs for new decisions
   - Refine conventions and patterns as needed

5. **Increment Plan Update**
   - **Increment 1:** First feature increment (infrastructure exists, context
     documented)
   - Include infrastructure adaptations in relevant increments (e.g., "Add Redis
     to staging in Increment 2")

**Increment 1 execution:**

Increment 1 proceeds directly to feature delivery because infrastructure already
exists and AI context is documented. Any infrastructure adaptations are included
as tasks within the increment alongside feature work.

**Outcome:** First feature increment delivered using existing infrastructure
(possibly with minor adaptations), with updated documentation for future
projects.

---

### Infrastructure ADRs

Infrastructure decisions are **architectural decisions** and must be documented
in ADRs. Use the framework's [ADR template](../adr-template.md).

**Common infrastructure ADRs:**

- ADR-001: CI/CD Platform Selection (GitHub Actions vs. GitLab CI vs. Jenkins)
- ADR-002: Cloud Provider and Deployment Model (AWS/Azure/GCP, serverless vs.
  containers vs. VMs)
- ADR-003: Database Hosting Strategy (managed vs. self-hosted)
- ADR-004: Monitoring and Observability Stack (Datadog vs. New Relic vs.
  Prometheus/Grafana)
- ADR-005: Secret Management Approach (AWS Secrets Manager vs. HashiCorp Vault)
- ADR-006: Deployment Strategy (blue-green vs. canary vs. rolling)

**Critical:** Include **cost analysis** in infrastructure ADRs — cloud
infrastructure costs scale with usage and can become a significant budget item.

### Infrastructure vs. Application Architecture

**Infrastructure architecture** (covered here):

- How code gets built, tested, deployed, and monitored
- Environments, pipelines, observability systems
- Enables software delivery

**Application architecture** (covered in other sections):

- How the software is structured internally
- Components, APIs, data models, technology stack
- Defines what gets delivered

Both are designed in the foundational design stage, but they serve different
purposes.

### When Infrastructure Planning is Skipped

**Never skip infrastructure planning.** Even for the smallest projects, you need
a way to deploy and monitor the system.

**Minimal infrastructure** for small projects:

- Version control (GitHub/GitLab)
- Basic CI (run tests on PR)
- Simple deployment (git push to production, serverless function)
- Basic monitoring (uptime checks, error alerts)

As projects grow, infrastructure sophistication increases, but the foundation
must exist from the start.

### Common Infrastructure Anti-Patterns

- **"We'll add CI/CD later"** — results in manual, error-prone deployments and
  delays delivery
- **"Production is the test environment"** — leads to outages and poor user
  experience
- **"No monitoring until it breaks"** — reactive firefighting instead of
  proactive management
- **"Developers don't need staging"** — increases production incidents and
  rollback frequency
- **"Infrastructure isn't architecture"** — poor tooling choices become
  expensive technical debt

---

## Design Documentation

### What to Document

- **Architecture diagrams:** System context, container diagram, component
  diagram (C4 model recommended)
- **Technology decisions:** Stack choices with justification (ADRs)
- **Data and API architecture:** ER diagrams, API conventions, integration
  patterns
- **Iteration plan:** Increment definitions with requirements mapping
- **Per-increment designs:** Component specs, API endpoint details, data model
  changes, test strategies

### Documentation Principles

- Keep docs in version control alongside code
- Document architecture and key decisions; code should be self-explanatory
- Use diagrams-as-code (Mermaid, PlantUML) when possible
- Update docs during code reviews
- Document "why" not "what" — clean code explains what

---

## Architecture Decision Records (ADRs)

ADRs document significant decisions and reasoning. They are **separate files**
stored in `docs/adr/`, not embedded in the design brief.

### When to Create an ADR

Create for decisions that are:

- **Significant:** Impact multiple components
- **Hard to reverse:** Changing later is costly
- **Contested:** Multiple viable options with trade-offs

Examples: database selection, architecture style, authentication approach, key
technology choices.

Don't ADR: trivial decisions, obvious choices, easily-changed decisions.

### ADR Format

Use the framework's ADR template: `../../adr-template.md`

Key sections:

- Context and problem statement
- Options considered (with cost analysis)
- Decision and rationale
- Consequences (positive, negative, cost)
- Alternatives and why not chosen

**File naming:** `ADR-NNN-short-description.md`

**Critical:** ADRs must include cost research (one-time, recurring, scaling
costs) to prevent budget surprises.

---

## Security and Compliance Design

Security must be designed into the system from the start, not retrofitted later.

### Key Security Areas

- **Authentication:** Use proven libraries (OAuth, JWT). Never store passwords
  in plaintext.
- **Authorization:** RBAC or ABAC with least-privilege. Validate server-side.
- **Data encryption:** TLS 1.3 in transit, AES-256 at rest. Secure key
  management.
- **Input validation:** Server-side validation and sanitization. Parameterized
  queries to prevent injection.
- **OWASP Top 10:** Address during design — consult
  [OWASP](https://owasp.org/Top10/) for current guidance.

### Compliance

Identify applicable regulations (GDPR, HIPAA, SOC 2, etc.) early and map
requirements to design decisions:

- Data residency and retention
- Access controls and audit trails
- Consent tracking and right-to-deletion
- Encryption and key management

---

## Performance and Scalability Design

### Define Measurable Targets (from NFRs)

Use percentiles (p95, p99) rather than averages — averages hide outliers.

### Key Design Considerations

- **Caching strategy:** What to cache, where (CDN, application, database), TTL
  policies
- **Database optimization:** Indexes, query optimization, connection pooling,
  N+1 prevention
- **Async processing:** Offload slow operations to background jobs
- **Scaling approach:** Horizontal (add servers, requires stateless design) vs.
  vertical (bigger servers)
- **Database scaling:** Read replicas, sharding, instance sizing

Design for your actual NFRs — don't optimize prematurely, but don't ignore
performance either.

---

## Observability and Monitoring Design

Design instrumentation that captures success criteria from Initiation. See
[Framework Guide: Measurement Throughline](../framework-guide.md#measurement-throughline).

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

- Critical → page on-call (system down, data loss)
- Warning → email/Slack (high error rate, resources)
- Actionable alerts only — avoid alert fatigue

### Success Criteria Instrumentation

Map each success criterion to metrics, instrumentation, and dashboards:

| Success Criterion           | Metric        | Instrumentation      |
| --------------------------- | ------------- | -------------------- |
| Example: reduce tickets 30% | Ticket count  | Webhook to analytics |
| Example: load time <2s      | Page load p95 | RUM monitoring       |

---

## When to Revisit Design

### Revisit Foundational Design When:

- Architecture proves infeasible during implementation
- NFRs can't be met (performance, scalability, security)
- Technology choice doesn't support needed capabilities
- Major requirements change or new constraints emerge
- Production issues reveal architectural problems

### Revisit Iterative Design When:

- Implementation is blocked by design gaps
- Code review reveals unhandled edge cases
- Testing fails due to design issues
- Requirements are clarified during implementation

### Revision Process

1. Identify trigger (what new information?)
2. Assess impact (which components/increments affected?)
3. Update design artifacts
4. Create ADR documenting the change
5. Communicate to affected teams
6. Update increment plan and downstream work

---

## Common Design Anti-Patterns

- **Big Ball of Mud** — no clear architecture, tight coupling everywhere. Fix:
  separate concerns, define component boundaries.
- **God Object** — single class does too much. Fix: apply Single Responsibility
  Principle.
- **Premature Optimization** — optimizing without profiling. Fix: build simple
  first, then optimize bottlenecks.
- **Analysis Paralysis** — endless design, never coding. Fix: design enough to
  start, iterate.
- **Tight Coupling** — components depend on internals. Fix: depend on
  interfaces, use dependency injection.
- **Golden Hammer** — same tech for everything. Fix: evaluate options
  objectively per problem.

---

## AI Assistance in Design

**AI excels at:**

- Generating architecture options
- Analyzing trade-offs between approaches
- Suggesting design patterns for common scenarios
- Creating boilerplate (API specs, data models, ADRs)
- Identifying edge cases and security concerns

**AI struggles with:**

- Organizational context (team skills, infrastructure)
- Business priorities and long-term maintainability
- Subtle security nuances

**Best practices:**

1. Use AI for exploration — generate multiple options
2. Human makes final decisions based on context
3. Validate AI suggestions with experienced engineers
4. Iterate with AI based on review feedback
5. Document decisions in ADRs (note AI assistance)

---

## Related Documents

- [Design Brief Template](design-brief-template.md)
- [Design Checklist](design-checklist.md)
- [ADR Template](../adr-template.md)
- [AI-Assisted SDLC Stages](../framework-stages.md)

---

## Notes

**Last Updated:** 2026-02-15

Added to framework in v0.4.0.
