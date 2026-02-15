# AI-Assisted SDLC: Requirements Stage

**Framework Version:** 0.8.0 **Last Updated:** 2026-02-14

**Stage:** 2 of 7 (Requirements) **Primary Audience:** Business Analysts,
Product Managers **Execution Pattern:** Foundational (once per project,
revisitable)

For cross-cutting framework concepts, see
[framework-guide.md](../framework-guide.md).

## Starting Point

**To begin, you need:**

- A completed and approved Initiation Brief (Stage 1)
- Stakeholder availability for requirements elicitation
- Defined success metrics to inform requirements

**The Requirements process helps you:**

- Convert business objectives into functional requirements (FRs)
- Define objective acceptance criteria (ACs)
- Identify non-functional requirements (NFRs)
- Prioritize for incremental delivery (MoSCoW — see
  [Framework Guide](../framework-guide.md#moscow-prioritization))

## Artifacts

| File                              | Description                             |
| --------------------------------- | --------------------------------------- |
| `requirements-brief-template.md`  | Template for your requirements document |
| `requirements-guide.md`           | Stage-specific guidance and rationale   |
| `requirements-checklist.md`       | 60-90 second readiness checklist        |
| `requirements-ai-agent-prompt.md` | AI prompt for drafting requirements     |

## Suggested Workflow

1. **Draft:** Use `requirements-brief-template.md` as structure. Use AI prompt +
   Initiation Brief + stakeholder input
2. **Elicit & validate:** Conduct stakeholder alignment reviews to refine
   requirements
3. **Validate AI output:** Edit for correctness — you own the final content
4. **Check readiness:** Run `requirements-checklist.md` before declaring ready
   for Design
5. **Reference:** Consult `requirements-guide.md` for deeper guidance
6. **Handoff:** Provide Requirements Document to Design stage

## Stage Outputs

- **Requirements Document** containing: FRs with unique identifiers, ACs for
  each FR, NFRs (including observability), MoSCoW prioritization, data/
  integration constraints, edge cases, open questions

**Handoff:** Design stage uses your Requirements Document as its starting point.

---

## Notes

Added to framework in v0.3.0.
