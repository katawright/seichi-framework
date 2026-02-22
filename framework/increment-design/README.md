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
- Foundational conventions established (coding patterns, error handling,
  technology-specific conventions)

**The Increment Design process helps you:**

- Create detailed component designs for the current increment
- Specify interfaces, data/state changes, and integration points
- Define test strategy for Verification stage
- Document implementation guidance for engineers

## How AI Helps

- **Component design generation:** Describe your increment scope and system
  architecture — AI drafts component designs with responsibilities, structure,
  and interactions
- **Interface specification:** AI generates interface contracts (API endpoints,
  component props, event schemas) from requirements and conventions
- **Test strategy creation:** AI suggests test cases across unit, integration,
  and acceptance levels, including edge cases you may miss
- **Design review:** AI walks through the checklist and flags gaps in
  completeness, consistency, or convention adherence

For assistance level details, see the
[AI Assistance Scorecard](../framework-ai-assistance.md).

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
4. Specify interfaces, data/state changes, component interactions
5. Define test strategy for Verification stage
6. Run `increment-design-checklist.md`
7. Obtain design approval — peer review or tech lead sign-off (optional for
   Minimal; recommended for Standard; required for Enterprise — see
   [Right-Sizing Guide](../right-sizing-guide.md))
8. Proceed to Implementation stage

## Stage Outputs

Detailed component designs, interface specifications (if applicable), data/state
changes (if applicable), test strategy for Verification stage, implementation
notes.

> Increment Design continues the **measurement throughline** by translating
> success criteria into testable specifications — defining the test strategy
> that Verification will execute against. See
> [Framework Guide: Measurement Throughline](../framework-guide.md#measurement-throughline).

**Handoff:** Implementation stage receives detailed design specs, interface
contracts, and test strategy.

---

## Notes

**Framework Version:** 0.18.0

**Last Updated:** 2026-02-21

Added to framework in v0.12.0.
