# AI-Assisted SDLC: Design Stage

**Framework Version:** 0.9.0 **Last Updated:** 2026-02-15

**Stage:** 3 of 7 (Design) **Primary Audience:** Engineers, Solutions Architects
**Execution Pattern:** Foundational + Iterative

For cross-cutting framework concepts, see
[framework-guide.md](../framework-guide.md).

## Starting Point

Design has a **dual execution pattern:**

**Foundational pass (once per project):**

- Requires: completed Requirements Document with MoSCoW priorities
- Produces: system architecture, technology decisions, increment plan

**Iterative pass (per increment):**

- Requires: foundational architecture + increment from increment plan
- Produces: detailed component designs, API specs, data model changes

## Artifacts

| File                       | Description                                   |
| -------------------------- | --------------------------------------------- |
| `design-brief-template.md` | Template for architecture and detailed design |
| `design-guide.md`          | Stage-specific guidance and rationale         |
| `design-checklist.md`      | 60-90 second readiness checklist              |
| `../adr-template.md`       | Architecture Decision Record template         |
| `adr/`                     | Directory for project ADR files               |

## Suggested Workflow

### Foundational Design

1. Review Requirements Document and all FRs/NFRs
2. Use the [Manual Process Guide](../framework-manual-process.md) to engage AI
   assistant in brainstorming architecture
3. Fill out foundational sections of design brief
4. Create increment plan mapping MoSCoW to increments
5. Create ADRs for significant technology decisions
6. Run `design-checklist.md`
7. Conduct alignment review with stakeholders
8. Proceed to Gate 2 decision

### Iterative Design (Per Increment)

1. Review increment plan for current increment scope
2. Use the [Manual Process Guide](../framework-manual-process.md) to engage AI
   assistant in detailing component designs
3. Fill out iterative sections of design brief
4. Specify APIs, data models, component interactions
5. Run `design-checklist.md` (iterative items)
6. Proceed to Implementation stage

## Stage Outputs

**Foundational:** Architecture diagrams, technology stack with ADRs, data/API
architecture, security approach, observability strategy, increment plan.

**Iterative:** Detailed component designs, API specs, data model changes, test
strategy for increment.

**Handoff:** Implementation stage receives design specs and increment plan.

---

## Notes

Added to framework in v0.4.0.
