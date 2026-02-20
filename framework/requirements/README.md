# AI-Assisted SDLC: Requirements Stage

**Stage:** 2 of 8 (Requirements) **Primary Audience:** Business Analysts,
Product Managers **Execution Pattern:** Foundational (once per project,
revisitable)

For cross-cutting framework concepts, see
[Framework Guide](../framework-guide.md).

## Starting Point

**To begin, you need:**

- A completed and approved Initiation Brief (Stage 1 / Gate 1)
- Stakeholder availability for requirements elicitation
- Subject-matter experts (business domain for FRs, technical domain for NFRs)
- Defined success metrics to inform requirements
- Business context from Initiation (problem, goals, constraints)
- Existing system context for brownfield projects (see
  [Requirements Guide: Brownfield Projects](requirements-guide.md#brownfield-projects))

**The Requirements process helps you:**

- Convert business objectives into functional requirements (FRs)
- Define objective acceptance criteria (ACs)
- Identify non-functional requirements (NFRs)
- Prioritize for incremental delivery (MoSCoW — see
  [Framework Guide](../framework-guide.md#moscow-prioritization))

## How AI Helps

- **Interview-based drafting:** Share the Initiation Brief with AI — it asks
  structured questions, interviews you about user needs and edge cases, and
  produces a draft requirements document
- **Template review:** Fill out the template yourself, then ask AI to review for
  completeness, testability, and ambiguity
- **Completeness checking:** AI runs through the checklist and flags gaps in
  your requirements
- **Edge case and NFR generation:** AI identifies gaps, suggests NFRs from
  success metrics, and surfaces edge cases you may not have considered

For assistance level details, see the
[AI Assistance Scorecard](../framework-ai-assistance.md).

## Artifacts

| File                             | Description                                            |
| -------------------------------- | ------------------------------------------------------ |
| `requirements-brief-template.md` | Template for your requirements document                |
| `requirements-guide.md`          | Stage-specific guidance and rationale                  |
| `requirements-checklist.md`      | 60-90 second readiness checklist                       |
| `requirements-reference.md`      | Detailed practices and examples for deeper exploration |

## Suggested Workflow

1. **Draft:** Use `requirements-brief-template.md` as structure. AI can help in
   two ways: conduct stakeholder interviews based on the Initiation Brief to
   draft requirements, or review a human-authored draft for completeness and
   testability. See the [Manual Process Guide](../framework-manual-process.md)
   for setup
2. **Elicit & validate:** Conduct stakeholder alignment reviews to refine
   requirements
3. **Validate AI output:** Edit for correctness — you own the final content
4. **Check readiness:** Run `requirements-checklist.md` before declaring ready
   for System Design
5. **Reference:** Consult `requirements-guide.md` for deeper guidance
6. **Handoff:** Provide Requirements Document to System Design stage

## Stage Outputs

- **Requirements Document** containing: FRs with unique identifiers, ACs for
  each FR, NFRs (including observability), MoSCoW prioritization, data/
  integration constraints, edge cases, open questions

> Requirements ensures the **measurement throughline** by translating success
> metrics from Initiation into NFRs with observability and instrumentation
> targets. See
> [Framework Guide: Measurement Throughline](../framework-guide.md#measurement-throughline).

**Handoff:** System Design stage uses your Requirements Document as its starting
point.

---

## Notes

**Framework Version:** 0.15.0

**Last Updated:** 2026-02-16

Added to framework in v0.3.0.
