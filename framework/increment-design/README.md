# AI-Assisted SDLC: Increment Design Stage

**Stage:** 4 of 8 (Increment Design)

**Primary Audience:** Engineers

**Execution Pattern:** Iterative (per increment)

For cross-cutting framework concepts, see
[Framework Guide](../framework-guide.md).

## Starting Point

**To begin, you need:**

- Completed System Design (architecture, technology decisions, increment plan)
- Current increment identified from increment plan
- Foundational conventions established (API patterns, data access, error
  handling)

**The Increment Design process helps you:**

- Create detailed component designs for the current increment
- Specify API endpoints and data model changes
- Define test strategy for Verification stage
- Document implementation guidance for engineers

## Artifacts

| File                                 | Description                                            |
| ------------------------------------ | ------------------------------------------------------ |
| `increment-design-guide.md`          | Stage-specific guidance and rationale                  |
| `increment-design-brief-template.md` | Template for increment-level design                    |
| `increment-design-checklist.md`      | 60-90 second readiness checklist                       |
| `increment-design-reference.md`      | Detailed practices and examples for deeper exploration |
| `adr/`                               | Directory for increment-level ADR files                |

## Suggested Workflow

1. Review increment plan for current increment scope
2. Use the [Manual Process Guide](../framework-manual-process.md) to engage AI
   assistant in detailing component designs
3. Fill out increment design brief
4. Specify APIs, data models, component interactions
5. Define test strategy for Verification stage
6. Run `increment-design-checklist.md`
7. Proceed to Implementation stage

## Stage Outputs

Detailed component designs, API specs, data model changes, test strategy for
Verification stage, implementation notes.

**Handoff:** Implementation stage receives detailed design specs, API specs,
data models, and test strategy.

---

## Notes

**Framework Version:** 0.11.0

**Last Updated:** 2026-02-16

Added to framework in v0.12.0.
