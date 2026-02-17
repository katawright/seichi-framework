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

**The System Design process helps you:**

- Establish system architecture and major components
- Select technology stack with justified decisions (ADRs)
- Plan infrastructure (CI/CD, deployment, monitoring)
- Create increment plan mapping priorities to increments
- Address cross-cutting concerns (security, observability, performance)
- Prepare Gate 2 Decision Package

## Artifacts

| File                              | Description                                            |
| --------------------------------- | ------------------------------------------------------ |
| `system-design-guide.md`          | Stage-specific guidance and rationale                  |
| `system-design-brief-template.md` | Template for architecture and system design            |
| `system-design-checklist.md`      | 60-90 second readiness checklist                       |
| `system-design-reference.md`      | Detailed practices and examples for deeper exploration |
| `../adr-template.md`              | Architecture Decision Record template                  |
| `adr/`                            | Directory for project ADR files                        |

## Suggested Workflow

1. Review Requirements Document and all FRs/NFRs
2. Use the [Manual Process Guide](../framework-manual-process.md) to engage AI
   assistant in brainstorming architecture
3. Fill out system design brief
4. Create increment plan mapping MoSCoW to increments
5. Create ADRs for significant technology decisions
6. Run `system-design-checklist.md`
7. Conduct alignment review with stakeholders
8. Proceed to Gate 2 decision

## Stage Outputs

Architecture diagrams, technology stack with ADRs, data/API architecture,
security approach, observability strategy, increment plan, Gate 2 Decision
Package.

**Handoff:** Increment Design stage receives architecture, increment plan, and
foundational conventions.

---

## Notes

**Framework Version:** 0.11.0

**Last Updated:** 2026-02-16

Added to framework in v0.12.0.
