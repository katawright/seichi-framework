# AI-Assisted SDLC: System Design Stage

**Stage:** 3 of 8 (System Design)

**Primary Audience:** Engineers, Solutions Architects

**Execution Pattern:** Foundational (once per project, revisitable)

For cross-cutting framework concepts, see
[Framework Guide](../framework-guide.md).

## Starting Point

**To begin, you need:**

- Completed Requirements Document with MoSCoW priorities
- Non-functional requirements (performance, security, etc.)
- Success criteria requiring instrumentation

For brownfield first AI-assisted projects, also gather:

- Existing architecture documentation and diagrams
- Architecture Decision Records (ADRs) or tribal knowledge of past decisions
- Infrastructure configuration (CI/CD, deployment, monitoring)
- Known technical debt and constraints

For subsequent brownfield projects, this context should already be documented
from prior discovery — review and update as needed.

**The System Design process helps you:**

- Establish or assess system architecture and major components
- Select technology stack with justified decisions (ADRs)
- Plan or assess infrastructure (CI/CD, deployment, monitoring)
- Create increment plan mapping priorities to increments
- Address cross-cutting concerns (security, observability, performance)
- Prepare Gate 2 Decision Package

## How AI Helps

- **Architecture exploration:** Describe your requirements and constraints — AI
  generates multiple architecture options with trade-off analysis
- **Technology evaluation:** AI researches pricing, compares frameworks, and
  drafts ADRs with cost analysis
- **Diagram generation:** AI produces diagram-as-code (Mermaid, PlantUML) as
  first drafts — layout and details typically need human refinement before
  publication
- **Increment planning:** AI maps MoSCoW priorities to increments, identifies
  dependencies, and estimates effort ranges

For assistance level details, see the
[AI Assistance Scorecard](../framework-ai-assistance.md).

## Artifacts

| File                                                            | Description                                            |
| --------------------------------------------------------------- | ------------------------------------------------------ |
| [System Design Guide](system-design-guide.md)                   | Stage-specific guidance and rationale                  |
| [System Design Brief Template](system-design-brief-template.md) | Template for architecture and system design            |
| [System Design Checklist](system-design-checklist.md)           | 60-90 second readiness checklist                       |
| [System Design Reference](system-design-reference.md)           | Detailed practices and examples for deeper exploration |
| [ADR Template](../adr-template.md)                              | Architecture Decision Record template                  |
| `adr/`                                                          | Directory for project ADR files                        |

## Suggested Workflow

1. Review Requirements Document and all FRs/NFRs
2. Use the [Manual Process Guide](../framework-manual-process.md) to engage AI
   assistant in brainstorming architecture
3. Fill out system design brief
4. Create increment plan mapping MoSCoW to increments
5. Create ADRs for significant technology decisions
6. Run `system-design-checklist.md`
7. Conduct alignment review with stakeholders
8. Proceed to Gate 2 decision; record using the
   [Gate Decision Template](../gate-decision-template.md)

## Stage Outputs

Architecture diagrams, technology stack with ADRs, data/API architecture,
security approach, observability strategy, increment plan, Gate 2 Decision
Package.

> System Design ensures the **measurement throughline** by designing analytics
> infrastructure, instrumenting success criteria into observability systems, and
> validating that NFR targets are architecturally achievable. See
> [Framework Guide: Measurement Throughline](../framework-guide.md#measurement-throughline).

**Handoff:** Increment Design stage receives architecture, increment plan, and
foundational conventions.

---

## Notes

**Framework Version:** 0.13.0

**Last Updated:** 2026-02-18
