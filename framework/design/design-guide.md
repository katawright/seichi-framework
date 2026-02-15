# Design Guide

**Last Updated:** 2026-02-14

> Stage-specific guidance for Design. For cross-cutting framework concepts, see
> [framework-guide.md](../framework-guide.md).

---

## Quick Reference

**Purpose:** Translate requirements into implementable technical solutions —
architecture, technology choices, and an iteration plan for incremental
delivery.

**Primary roles:** Engineers, Solutions Architects

**Execution pattern:** Foundational (once for system architecture) + Iterative
(per increment for detailed design)

**Key inputs:** Requirements Document (FRs, ACs, NFRs, MoSCoW priorities)

**Key outputs:**

- System architecture and technology decisions (ADRs)
- Iteration plan mapping priorities to increments
- Detailed component designs per increment

**What good looks like:**

- Architecture addresses all requirements and NFRs
- Technology choices justified in ADRs with cost analysis
- Iteration plan sequences Must Haves first, with clear dependencies
- Each increment delivers testable value
- Security, performance, and observability designed in
- Instrumentation planned for success criteria

**Common pitfalls:**

- Over-designing future increments (YAGNI)
- No iteration plan — jumping straight to coding
- Technology chosen without cost research
- Security/performance considered as afterthoughts
- No ADRs for significant decisions
- Analysis paralysis — endless design, no code

**Checkpoint:** Alignment Review + Gate 2 — see
[Framework Guide: Checkpoints](../framework-guide.md#checkpoint-taxonomy)

**AI autonomy:** AI agent + strong gates — see
[Framework Guide: AI Autonomy](../framework-guide.md#ai-autonomy-overview)

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
- Cross-cutting concerns (security, observability, performance approach)
- Iteration planning (mapping MoSCoW priorities to increments)

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

Foundational design creates the iteration plan; iterative design executes it:

- Foundational: "Increment 1 includes FR-1, FR-2, FR-3"
- Iterative: "Detailed design for user registration (FR-1)"

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

## Creating Iteration Plans

The iteration plan is a **key output of foundational design**. It maps MoSCoW
priorities from Requirements to specific, deliverable increments. See
[Framework Guide: MoSCoW](../framework-guide.md#moscow-prioritization) for
priority definitions.

### Planning Process

1. **Review requirements** — all FRs, NFRs, MoSCoW priorities, acceptance
   criteria
2. **Identify dependencies** — which requirements depend on others?
3. **Assess risk and complexity** — technically uncertain items first
4. **Group into increments** — Must Haves first, 1-3 weeks each, delivering
   testable value
5. **Sequence increments** — dependencies first, then risk/value balance
6. **Map Should Haves** — assign to later increments based on dependencies and
   value
7. **Handle Could Haves** — mark as opportunistic, "build if easy, skip if hard"
8. **Document Won't Haves** — explicitly list exclusions
9. **Estimate effort** — person-weeks per increment (team size x duration)
10. **Calculate cost for Gate 2** — effort x blended rate, compare to Initiation
    estimates

### Iteration Plan Format

```markdown
## Iteration Plan

### Increment 1: [Name] (Must Have - Foundation)

**Goal:** [What this increment delivers] **Requirements:** FR-1, FR-2, NFR-1,
NFR-2 **Duration:** 2 weeks **Team:** 2 engineers, 1 architect (25%) **Effort:**
4.5 person-weeks **Dependencies:** None

### Increment 2: [Name] (Must Have - Core)

**Requirements:** FR-3, FR-4, FR-5 **Duration:** 2 weeks **Dependencies:**
Increment 1

### Could Have (Opportunistic)

- FR-9: Build if easy during Increment 2

### Won't Have (Out of Scope)

- FR-11, FR-12: Deferred to Phase 2

### Gate 2 Cost Calculation

Total effort × blended rate = project cost Compare to Initiation estimates
```

### Best Practices

- **Right-size increments:** 1-3 weeks, 3-7 requirements each
- **Deliver value incrementally:** each increment ships something usable
- **Build foundations first:** auth, database, API framework before features
- **De-risk early:** technically uncertain work in early increments
- **Allow for discovery:** don't over-plan distant increments
- **Make Could Haves truly optional:** don't commit in timelines

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
6. Update iteration plan and downstream work

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

**Using the AI agent prompt:** See `design-ai-agent-prompt.md` for a modular
prompt that references these artifacts by name.

---

## Related Documents

- [Design Brief Template](design-brief-template.md)
- [Design Checklist](design-checklist.md)
- [Design AI Agent Prompt](design-ai-agent-prompt.md)
- [ADR Template](../adr-template.md)
- [STAGES.md](../../STAGES.md)

---

## Notes

Added to framework in v0.4.0.
