# System Design Guide

> Stage-specific guidance for System Design. For cross-cutting framework
> concepts, see [Framework Guide](../framework-guide.md).

---

## Quick Reference

**Purpose:** Establish system architecture, technology choices, infrastructure
plan, and increment roadmap that will guide all implementation work.

**Primary roles:** Engineers, Solutions Architects

**Execution pattern:** Foundational (once per project, revisitable)

**Key inputs:** Requirements Document (FRs, ACs, NFRs, MoSCoW priorities)

**Key outputs:**

- System architecture and technology decisions (ADRs)
- Infrastructure architecture and planning (CI/CD, deployment, observability)
- Increment plan mapping priorities to increments
- Gate 2 Decision Package

**What good looks like:**

- Architecture addresses all requirements and NFRs
- Technology choices justified in ADRs with cost analysis
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
build it" (Implementation). It establishes the foundational architecture and
technical approach for the entire project.

**Purpose:**

1. **Technical planning** — determine how the system will be structured
2. **Risk reduction** — identify technical challenges before coding
3. **Architecture alignment** — ensure components work together coherently
4. **Increment sequencing** — create a realistic delivery roadmap
5. **Quality foundation** — build testability, security, and performance into
   the architecture
6. **Cost estimation** — refine estimates for Gate 2 decision

---

## Architecture Principles

Follow established principles — SOLID, Separation of Concerns, DRY, YAGNI, KISS
— when making design decisions. Consult your team's standards or ask your AI
agent for guidance.

**Key design decisions to document:**

- Component boundaries and responsibilities
- Layering strategy (presentation, business logic, data access)
- Dependency direction (depend on abstractions)
- Where to apply patterns vs. keep things simple

---

## Technology Selection

Evaluate team skills, organizational standards, requirements fit, ecosystem
maturity, maintainability, performance/scalability, and security/compliance when
choosing technologies.

**Cost research is mandatory** — research pricing BEFORE selecting technology.
Document costs in ADRs.

> For detailed evaluation criteria, cost research guidance, and common
> trade-offs, see
> [System Design Reference: Technology Selection](system-design-reference.md#technology-selection-details).

---

## Creating Increment Plans

The increment plan is a **key output of System Design**. It maps MoSCoW
priorities from Requirements to specific, deliverable increments. See
[Framework Guide: MoSCoW](../framework-guide.md#moscow-prioritization) for
priority definitions.

### Planning Best Practices

- **Use range-based estimates:** Express duration and effort as ranges (e.g.,
  1.5-2.5 weeks), not single points
- **Deliver value incrementally:** each increment ships something usable
- **Build foundations first:** auth, database, API framework before features
- **De-risk early:** technically uncertain work in early increments
- **Allow for discovery:** don't over-plan distant increments
- **Make Could Haves truly optional:** don't commit in timelines

### Planning Process

1. **Review requirements** — all FRs, NFRs, MoSCoW priorities, acceptance
   criteria
2. **Identify dependencies** — which requirements depend on others?
3. **Assess risk and complexity** — uncertain items first
4. **Group into increments** — Must Haves first, delivering testable value
5. **Sequence increments** — dependencies first, then risk/value balance
6. **Map Should Haves** — assign to later increments
7. **Handle Could Haves** — mark as opportunistic
8. **Document Won't Haves** — explicitly list exclusions
9. **Estimate duration and effort as ranges**
10. **Calculate cost range for Gate 2** — effort x blended rate, compare to
    Initiation estimates

> For increment sizing guidance, estimation techniques, and methodology-specific
> examples, see
> [System Design Reference: Increment Sizing](system-design-reference.md#increment-sizing-guidance)
> and [Estimation](system-design-reference.md#increment-estimation-guidance).

---

## Infrastructure Planning

Infrastructure planning is a **required output** of System Design. The goal is
to ensure working development, testing, deployment, and monitoring
infrastructure exists before feature delivery begins.

**Greenfield projects:** Infrastructure must be created. Increment 1 becomes a
**Bootstrap** increment establishing CI/CD, environments, monitoring, and
deployment automation.

**Brownfield projects (first AI-assisted):** Increment 1 focuses on **discovery
and documentation** — capturing existing architecture, infrastructure, and
conventions for effective AI assistance.

**Brownfield projects (subsequent):** Increment 1 proceeds to **feature
delivery**, using and updating existing documentation. Infrastructure
adaptations are included within feature increments.

Infrastructure decisions are architectural decisions and must be documented in
ADRs.

> For detailed greenfield/brownfield planning outputs, discovery approach,
> infrastructure ADR examples, and anti-patterns, see
> [System Design Reference: Infrastructure Planning](system-design-reference.md#infrastructure-planning).

---

## Design Documentation

### What to Document

- **Architecture diagrams:** System context, container, component (C4 model
  recommended)
- **Technology decisions:** Stack choices with justification (ADRs)
- **Data and API architecture:** ER diagrams, API conventions, integration
  patterns
- **Increment plan:** Increment definitions with requirements mapping

### Documentation Principles

- Keep docs in version control alongside code
- Document architecture and key decisions; code should be self-explanatory
- Use diagrams-as-code (Mermaid, PlantUML) when possible
- Update docs during code reviews
- Document "why" not "what" — clean code explains what

---

## Architecture Decision Records (ADRs)

ADRs document significant decisions and reasoning. They are **separate files**
stored in `docs/adr/`.

**Create for decisions that are:**

- **Significant:** Impact multiple components
- **Hard to reverse:** Changing later is costly
- **Contested:** Multiple viable options with trade-offs

Key sections: Context, options considered (with cost analysis), decision and
rationale, consequences, alternatives.

**File naming:** `ADR-NNN-short-description.md` **Template:**
`../../adr-template.md`

**Critical:** ADRs must include cost research to prevent budget surprises.

---

## Additional Topics

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

---

## AI Assistance in System Design

**AI excels at:**

- Generating architecture options
- Analyzing trade-offs between approaches
- Suggesting design patterns for common scenarios
- Creating boilerplate (data models, ADRs)
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

## When to Revisit System Design

### Triggers

- Architecture proves infeasible during implementation
- NFRs can't be met (performance, scalability, security)
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

---

## Related Documents

- [System Design Brief Template](system-design-brief-template.md)
- [System Design Checklist](system-design-checklist.md)
- [System Design Reference](system-design-reference.md)
- [ADR Template](../adr-template.md)
- [AI-Assisted SDLC Stages](../framework-stages.md)

---

## Notes

**Last Updated:** 2026-02-16

Added to framework in v0.12.0.
