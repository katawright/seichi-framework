# System Design Guide

> Stage-specific guidance for System Design. For cross-cutting framework
> concepts, see [Framework Guide](../framework-guide.md).

---

## Quick Reference

**Purpose:** Establish or assess system architecture, technology choices,
infrastructure plan, and increment roadmap that will guide all implementation
work.

**Primary roles:** Engineers, Solutions Architects

**Execution pattern:** Foundational (once per project, revisitable)

**Key inputs:** Requirements Document (FRs, ACs, NFRs, MoSCoW priorities). For
brownfield first AI-assisted projects: existing architecture docs, ADRs,
infrastructure configuration, known technical debt. For subsequent brownfield
projects: documented context from prior discovery (review and update as needed)

**Key outputs:**

- System architecture with significant decisions documented in ADRs
- Infrastructure architecture and planning (CI/CD, deployment, observability)
- Increment plan mapping priorities to increments
- Gate 2 Decision Package

**What good looks like:**

- Architecture addresses all requirements and NFRs
- Significant decisions justified in ADRs
- Increment plan sequences Must Haves first
- Security, performance, and observability designed in
- Instrumentation planned for success criteria
- Infrastructure plan covers CI/CD, environments, monitoring

**Common pitfalls:**

- No increment plan — jumping straight to coding
- Technology chosen without cost research
- Security/performance considered as afterthoughts
- No ADRs for significant decisions
- Analysis paralysis — endless design, no code
- Infrastructure deferred ("we'll add CI/CD later")

**Checkpoint:** Alignment Review + Gate 2 — see
[Framework Guide: Checkpoints](../framework-guide.md#checkpoint-taxonomy)

**AI assistance:** AI agent + strong gates — see
[Framework Guide: AI Assistance](../framework-guide.md#ai-assistance-overview)

---

## What Is System Design?

System Design bridges "what we need to build" (Requirements) and "how we'll
build it" (Implementation). It establishes or assesses the foundational
architecture and technical approach for the entire project.

**Purpose:**

1. **Technical planning** — determine how the system will be structured or how
   changes integrate into existing architecture
2. **Risk reduction** — identify technical challenges before coding
3. **Architecture alignment** — ensure components work together coherently
4. **Increment sequencing** — create a realistic delivery roadmap
5. **Quality foundation** — build testability, security, and performance into
   the architecture
6. **Cost estimation** — refine estimates for Gate 2 decision

---

## AI Assistance

> **Required gates:** Specialized review — System Design produces foundational
> decisions with high blast radius, requiring architecture council or tech lead
> sign-off, security review, and explicit rollback plans.

### AI Autonomy Spectrum

Match AI's role to your team's autonomy comfort level. Gate requirements always
apply regardless of tier. See the
[AI Assistance Scorecard: AI Autonomy Spectrum](../framework-ai-assistance.md#ai-autonomy-spectrum)
for full tier definitions.

**At a glance:**

| Human-Led                           | Collaborative                           | AI-Led                                                                    |
| ----------------------------------- | --------------------------------------- | ------------------------------------------------------------------------- |
| Human designs; AI suggests patterns | AI proposes architecture; human decides | AI evaluates trade-offs proactively, identifies concerns; human validates |

**By activity:**

| Activity                    | Human-Led                                   | Collaborative                                     | AI-Led                                                                                             |
| --------------------------- | ------------------------------------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **Architecture design**     | Architect designs; AI suggests patterns     | AI proposes options; architect selects            | AI evaluates requirements against patterns, identifies trade-offs proactively; architect validates |
| **Technology selection**    | Architect evaluates; AI provides research   | AI compares options; architect decides            | AI researches options, analyzes cost and fit proactively; architect validates                      |
| **ADR drafting**            | Architect writes; AI suggests structure     | AI drafts ADRs; architect reviews                 | AI identifies decisions needing ADRs, drafts with trade-off analysis; architect validates          |
| **Increment planning**      | Architect plans; AI suggests sequencing     | AI drafts plan from priorities; architect refines | AI analyzes dependencies and risks to propose sequencing; architect validates                      |
| **Security design**         | Architect designs; AI suggests threat model | AI drafts threat model; architect validates       | AI proactively identifies attack surfaces from architecture; architect validates                   |
| **Infrastructure planning** | Architect plans; AI provides templates      | AI drafts plan; architect reviews                 | AI evaluates requirements against infrastructure patterns; architect validates                     |

---

## Right-Sizing System Design

Not every project needs a formal architecture document or comprehensive ADRs.
Match your System Design effort to your project's risk tier.

| Practice                | Minimal                              | Standard                                      | Enterprise                                           |
| ----------------------- | ------------------------------------ | --------------------------------------------- | ---------------------------------------------------- |
| **Architecture docs**   | Informal notes or diagrams           | Architecture document with key diagrams       | Formal architecture review with stakeholder sign-off |
| **ADRs**                | Mental notes or brief chat messages  | ADRs for major technology and design choices  | Comprehensive ADRs with alternatives analysis        |
| **Technology choices**  | Pick what you know, document briefly | Evaluate options, document rationale          | Formal evaluation matrix, proof of concepts          |
| **Security design**     | Basic security awareness             | Threat model for key areas, security baseline | Comprehensive threat model, compliance mapping       |
| **Infrastructure plan** | Simplest viable hosting              | Environment strategy, basic IaC               | Multi-environment, HA design, disaster recovery      |
| **Increment plan**      | Ordered task list                    | Sequenced increments with dependencies        | Formal roadmap with cross-team coordination          |

Expand System Design only when needed:

- **Multi-service architecture:** Add service interaction diagrams, API
  contracts, deployment topology
- **High availability / performance:** Add capacity planning, failover design,
  SLO architecture
- **Security-sensitive / compliance:** Add comprehensive threat model,
  compliance mapping, audit controls
- **Multi-team coordination:** Add cross-team interface contracts, shared
  component ownership
- **Complex data architecture:** Add data flow diagrams, migration strategy,
  consistency models

Otherwise, keep design lightweight and move to Increment Design.

> These triggers help you decide when to move from Minimal to Standard or
> Enterprise. For full tier definitions and choosing criteria, see the
> [Right-Sizing Guide](../right-sizing-guide.md).

---

## System Design Workflow

1. **Review requirements and constraints** — all FRs, NFRs, MoSCoW priorities,
   acceptance criteria, and brownfield constraints
2. **Design or assess architecture** — create system architecture (greenfield)
   or evaluate existing architecture (brownfield)
3. **Evaluate and select technology** — research options, compare trade-offs,
   document costs in ADRs
4. **Plan infrastructure** — CI/CD, environments, monitoring, deployment
   automation (greenfield Increment 0 or brownfield discovery)
5. **Document architecture and ADRs** — architecture diagrams, data models, API
   conventions, and key decision records
6. **Create increment plan** — map MoSCoW priorities to sequenced, deliverable
   increments with range-based estimates
7. **Prepare Gate 2 decision package** — compile architecture, increment plan,
   cost estimates, and risk assessment for proceed/pivot/stop review

---

## System Design Guidance

### Architecture Principles

Follow established principles — SOLID, Separation of Concerns, DRY, YAGNI, KISS
— when making design decisions. Consult your team's standards or ask your AI
agent for guidance.

### Technology Selection

Evaluate team skills, organizational standards, requirements fit, ecosystem
maturity, maintainability, performance/scalability, and security/compliance when
choosing technologies.

**Cost research is mandatory** — research pricing BEFORE selecting technology.
Document costs in ADRs.

> For detailed evaluation criteria, cost research guidance, and common
> trade-offs, see
> [System Design Reference: Technology Selection](system-design-reference.md#technology-selection-details).

### Creating Increment Plans

The increment plan is a **key output of System Design**. It maps MoSCoW
priorities from Requirements to specific, deliverable increments. See
[Framework Guide: MoSCoW](../framework-guide.md#moscow-prioritization) for
priority definitions.

#### Planning Best Practices

- **Use range-based estimates:** Express duration and effort as ranges (e.g.,
  1.5-2.5 weeks), not single points
- **Deliver value incrementally:** each increment ships something usable
- **Build foundations first:** auth, database, API framework before features
- **De-risk early:** technically uncertain work in early increments
- **Allow for discovery:** don't over-plan distant increments
- **Make Could Haves truly optional:** don't commit in timelines

#### Planning Process

1. **Review requirements** — all FRs, NFRs, MoSCoW priorities, acceptance
   criteria
2. **Identify dependencies** — which requirements depend on others?
3. **Determine Increment 0 need** — greenfield projects require a bootstrap
   Increment 0; brownfield first AI-assisted projects require a discovery
   Increment 0; subsequent brownfield projects skip directly to Increment 1
4. **Assess risk and complexity** — uncertain items first
5. **Group into increments** — Must Haves first, delivering testable value
6. **Sequence increments** — dependencies first, then risk/value balance
7. **Map Should Haves** — assign to later increments
8. **Handle Could Haves** — mark as opportunistic
9. **Document Won't Haves** — explicitly list exclusions
10. **Estimate duration and effort as ranges**
11. **Calculate cost range for Gate 2** — effort x blended rate, compare to
    Initiation estimates

> For increment sizing guidance, estimation techniques, and methodology-specific
> examples, see
> [System Design Reference: Increment Sizing](system-design-reference.md#increment-sizing-guidance)
> and [Estimation](system-design-reference.md#increment-estimation-guidance).

> **Gate 2:** The increment plan feeds into the Gate 2 Decision Package in the
> [System Design Brief Template](system-design-brief-template.md#gate-2-decision-package).
> Record the proceed/pivot/stop decision using the
> [Gate Decision Template](../templates/gate-decision-template.md).

### Infrastructure Planning

Infrastructure planning is a **required output** of System Design. The goal is
to ensure working development, testing, deployment, and monitoring
infrastructure exists before feature delivery begins.

**Greenfield projects:** Infrastructure must be created. Increment 0 becomes the
**bootstrap** increment establishing CI/CD, environments, monitoring, and
deployment automation. Feature delivery begins at Increment 1.

**Brownfield projects (first AI-assisted):** Increment 0 focuses on **discovery
and documentation** — capturing existing architecture, infrastructure, and
conventions for effective AI assistance. Feature delivery begins at Increment 1.

**Brownfield projects (subsequent):** No Increment 0 is needed. Increment 1
proceeds to **feature delivery**, using and updating existing documentation.
Infrastructure adaptations are included within feature increments.

Infrastructure decisions are architectural decisions and must be documented in
ADRs.

> For detailed greenfield/brownfield planning outputs, discovery approach,
> infrastructure ADR examples, and anti-patterns, see
> [System Design Reference: Infrastructure Planning](system-design-reference.md#infrastructure-planning).

### Design Documentation

#### What to Document

- **Architecture diagrams:** System context, container, component (C4 model
  recommended)
- **Technology decisions:** Stack choices with justification (ADRs)
- **Data and API architecture:** ER diagrams, API conventions, integration
  patterns
- **Increment plan:** Increment definitions with requirements mapping

**C4 diagram levels and when to use them:**

| Level     | What it shows              | When required                 |
| --------- | -------------------------- | ----------------------------- |
| Context   | System and external actors | Always (all tiers)            |
| Container | Major deployable units     | Standard and Enterprise       |
| Component | Internal structure         | Enterprise or complex systems |
| Code      | Class/function level       | Rarely needed; use sparingly  |

For Minimal-tier projects, a whiteboard context sketch is sufficient. Use
Mermaid or PlantUML for diagram-as-code.

#### Documentation Principles

- Keep docs in version control alongside code
- Document architecture and key decisions; code should be self-explanatory
- Use diagrams-as-code (Mermaid, PlantUML) when possible
- Update docs during code reviews
- Document "why" not "what" — clean code explains what

### Architecture Decision Records (ADRs)

ADRs document significant decisions and reasoning. They are **separate project
files** stored in `docs/adr/` (or a stage-level `adr/` directory if your team
uses scoped ADRs).

**Create for decisions that are:**

- **Significant:** Impact multiple components
- **Hard to reverse:** Changing later is costly
- **Contested:** Multiple viable options with trade-offs

Key sections: Context, options considered (with cost analysis), decision and
rationale, consequences, alternatives.

**File naming:** `ADR-NNN-short-description.md` (e.g.,
`ADR-001-database-selection.md`, `ADR-002-file-upload-mechanism.md`)

**Template:** [ADR Template](../templates/adr-template.md)

**Location:** Use `docs/adr/` as the primary project-level ADR registry.

- `docs/adr/` — canonical location for all ADRs (recommended)
- `system-design/adr/` — alternative for System Design decisions
- `implementation/adr/` — alternative for increment-specific decisions

Use per-stage directories if your team prefers scoped numbering; use `docs/adr/`
for a unified ADR registry.

**Numbering:** Use sequential numbers (001, 002, 003...) per directory. Numbers
are scoped to the directory (`system-design/adr/ADR-001` and
`implementation/adr/ADR-001` can both exist).

**Critical:** ADRs must include cost research to prevent budget surprises.

### ADR Lifecycle

ADRs follow a propose → review → approve → record → evolve lifecycle:

1. **Propose:** Author creates an ADR with status "Proposed" and opens a review
   (PR, design meeting, or async comment thread)
2. **Review:** Right-size the review forum to your tier:
   - Minimal: Self-review or pair discussion
   - Standard: Team review via PR or design meeting
   - Enterprise: Architecture council or tech lead board
3. **Approve:** Reviewers accept; author updates status to "Accepted" and
   records who decided
4. **Record:** ADR is merged to version control alongside code
5. **Evolve:** When a decision is superseded, create a new ADR and set the
   original's status to "Superseded by ADR-XXX"

**Status values:**

- **Proposed:** Decision is under consideration
- **Accepted:** Decision has been approved and will be/is being implemented
- **Deprecated:** Decision is no longer relevant but not superseded
- **Superseded by ADR-XXX:** This decision has been replaced by a newer decision

### Tips for Writing Good ADRs

1. **Be concise but complete** — capture enough context for future engineers to
   understand why
2. **Document alternatives** — show what you considered and why you chose this
   path
3. **Include costs** — research and document infrastructure/tooling costs
4. **Explain trade-offs** — be honest about what you're accepting/rejecting
5. **Update status** — mark as Deprecated or Superseded when decisions change
6. **Link from brief** — reference ADRs from your system-design-brief,
   increment-design-brief, or implementation-brief
7. **Version control** — commit ADRs alongside code; they're part of your
   project history
8. **Use the "reasonable engineer test"** — if a reasonable engineer might ask
   "why this instead of alternatives?", document it

### Referencing ADRs from Briefs

In your `system-design-brief.md` (System Design stage):

```markdown
## Technology Stack

**Database:** PostgreSQL 15 (see [ADR-001](adr/ADR-001-database-selection.md))
**File Upload:** Presigned URLs with object storage (see
[ADR-002](adr/ADR-002-file-upload-mechanism.md)) **Authentication:** JWT tokens
(see [ADR-003](adr/ADR-003-authentication-approach.md))

For detailed rationale, alternatives, and cost analysis, see ADRs in
`system-design/adr/`.
```

In your `implementation-brief.md` (Implementation stage):

```markdown
## Key Implementation Decisions

| #   | Decision                               | Type    | ADR Link                                          | Date       |
| --- | -------------------------------------- | ------- | ------------------------------------------------- | ---------- |
| 1   | Use Builder pattern for PaymentRequest | Pattern | [ADR-001](adr/ADR-001-payment-builder-pattern.md) | 2024-02-10 |
| 2   | Cache user permissions for 5 minutes   | Caching | [ADR-002](adr/ADR-002-permission-caching.md)      | 2024-02-10 |
```

### System-Level Interface Contracts

For multi-service or multi-team architectures, define formal interface contracts
at System Design to enable parallel increment work.

**When contracts are needed:**

- Multiple services communicate over an API boundary
- Multiple teams develop components in parallel
- External parties will consume the API

**Recommended formats:**

- REST APIs: OpenAPI (YAML/JSON)
- Event-driven: AsyncAPI
- RPC: protobuf / gRPC
- Internal schemas: JSON Schema

**Storage and governance:**

- Store contracts in `docs/api/` or alongside the owning service
- Version contracts using semantic versioning
- Treat contract changes as ADR-worthy decisions
- Increment Design contracts are refinements of system-level contracts

### Additional Topics

The [System Design Reference](system-design-reference.md) covers these topics in
depth:

- **Security and compliance design** — authentication, authorization,
  encryption, OWASP, compliance mapping
- **Performance and scalability design** — targets, caching, database
  optimization, scaling approaches
- **Observability and monitoring design** — logging, metrics, alerting, success
  criteria instrumentation
- **Common design anti-patterns** — Big Ball of Mud, God Object, Analysis
  Paralysis, and fixes
- **Design brief examples** — system context, architecture, tech stack,
  increment plans
- **Gate 2 cost calculation** — estimation examples and infrastructure cost
  templates

## Cross-Cutting Concerns

The following concerns apply across all stages. Define your approach at System
Design and trace it through implementation and verification:

| Concern       | Define at           | Verify at            | Framework Reference                                                                            |
| ------------- | ------------------- | -------------------- | ---------------------------------------------------------------------------------------------- |
| Security      | System Design       | Verification         | system-design-brief-template.md (Security section) + verification-checklist.md (security gate) |
| Performance   | System Design       | Verification         | requirements-brief-template.md (NFR section)                                                   |
| Observability | Requirements/Design | Support              | Measurement Throughline                                                                        |
| Accessibility | Requirements        | Verification         | Checklist                                                                                      |
| Resilience    | System Design       | Verification/Support | Rollback and DR sections                                                                       |
| Data privacy  | System Design       | Verification         | Compliance considerations                                                                      |

---

## When to Revisit System Design

### Triggers

- Architecture proves infeasible during implementation
- NFRs can't be met within cost or time constraints
- Technology choice doesn't support needed capabilities
- Major requirements change or new constraints emerge
- Production issues reveal architectural problems

### Revision Process

1. Identify trigger (what new information?)
2. Assess impact (which components/increments?)
3. Update design artifacts
4. Create ADR documenting the change
5. Communicate to affected teams
6. Update increment plan and downstream work

### Proactive Architecture Evolution

In addition to reactive triggers, consider scheduled architecture reviews:

- **Quarterly review:** Assess technical debt backlog and fitness of current
  architecture against current load and team size
- **Tech debt tracking:** Maintain a tech debt backlog category alongside the
  feature backlog; review at each increment planning session
- **Fitness functions:** For long-lived systems, define automated checks that
  validate architectural constraints (e.g., no circular dependencies, response
  time budgets). Run as part of CI.
- **ADR refresh:** When a decision is superseded proactively (not due to
  failure), create a new ADR and mark the original as "Superseded by ADR-XXX"
  with a brief rationale.

---

## Related Documents

- [System Design Brief Template](system-design-brief-template.md)
- [System Design Checklist](system-design-checklist.md)
- [System Design Reference](system-design-reference.md)
- [ADR Template](../templates/adr-template.md)
- [AI-Assisted SDLC Stages](../framework-stages.md)

---

## Notes

**Last Updated:** 2026-02-26

Added to framework in v0.12.0.
