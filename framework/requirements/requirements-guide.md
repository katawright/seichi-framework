# Requirements Guide

> Stage-specific guidance for Requirements. For cross-cutting framework
> concepts, see [Framework Guide](../framework-guide.md).

---

## Quick Reference

**Purpose:** Convert business objectives from Initiation into testable
requirements that enable coherent design, accurate test planning, and reduced
rework from ambiguity.

**Primary roles:** Business Analysts, Product Managers

**Execution pattern:** Foundational (once per project, revisitable)

**Key inputs:** Initiation Brief (objectives, success metrics, constraints)

**Key outputs:** Requirements Document (FRs, ACs, NFRs, prioritization)

**Handoff:** System Design stage receives Requirements Document

**What good looks like:**

- FRs are behavior-focused and testable
- ACs are objective and observable (Given/When/Then)
- NFRs include observability for success metrics
- Brownfield: Existing system constraints captured
- MoSCoW priorities assigned (see
  [Framework Guide: MoSCoW](../framework-guide.md#moscow-prioritization))
- Edge cases and data constraints documented

**Common pitfalls:**

- Requirements describe UI/implementation, not behavior
- Acceptance criteria are subjective ("works well")
- "Everything is Must Have" — no real prioritization
- NFRs added late, causing architecture rework
- No observability NFRs for success metrics
- Data/integration constraints ignored
- Requirements not reviewed by engineering
- Edge cases discovered during testing

**Checkpoint:** Alignment Reviews throughout; feeds Gate 2 — see
[Framework Guide: Checkpoints](../framework-guide.md#checkpoint-taxonomy)

> **Gate 2 context:** Gate 2 criteria differ from Gate 1 because the decision is
> different. Gate 1 asks "Should we invest in requirements work?" (business
> case). Gate 2 asks "Should we commit to building?" (requirements validated,
> architecture sound, risks mitigated, estimate within budget). Gate 2 occurs at
> the end of Requirements + System Design foundational pass. Record gate
> decisions using the [Gate Decision Template](../gate-decision-template.md).

**AI assistance:** AI agent with human gate — see
[Framework Guide: AI Assistance](../framework-guide.md#ai-assistance-overview)

---

## What Is Requirements?

Requirements converts business objectives from the Initiation Brief into
testable, prioritized specifications that drive design, implementation, and
verification. It answers: _"What exactly must the system do?"_

**Purpose:**

1. **Behavior specification** — define what the system must do in testable terms
2. **Acceptance definition** — establish objective criteria for "done"
3. **Quality attributes** — capture non-functional requirements that shape
   architecture
4. **Prioritization** — enable trade-off decisions with MoSCoW classification
5. **Constraint capture** — document data, integration, and brownfield
   limitations
6. **Measurement bridge** — translate success metrics into observable NFRs

---

## AI Assistance

**Why human gate:** Requirements involve business judgment, stakeholder
alignment, and domain knowledge that AI cannot independently verify.

**Two modes of AI assistance** (matching the Initiation pattern):

- **Interview mode:** AI conducts structured interviews based on the
  [Requirements Brief Template](requirements-brief-template.md) and the
  Initiation Brief. It asks clarifying questions about user needs, edge cases,
  and constraints, then drafts requirements for human review.
- **Review mode:** Human drafts requirements independently, then asks AI to
  review for completeness, testability, ambiguity, and suggest improvements.

**AI's role:**

- Draft requirements from Initiation Brief
- Conduct structured stakeholder interviews to surface requirements
- Suggest acceptance criteria and NFRs
- Simulate stakeholder perspectives to surface edge cases
- Generate NFRs from success metrics (observability, performance)
- Identify gaps in acceptance criteria
- Analyze completeness (run checklist)

**Human's role:**

- Own all decisions
- Validate with stakeholders (alignment reviews)
- Approve outputs
- Ensure accuracy and testability
- Resolve ambiguities and conflicts

---

## Right-Sizing Requirements

Not every project needs comprehensive NFRs or formal stakeholder reviews. Match
your Requirements effort to your project's risk tier.

| Practice                        | Minimal                     | Standard                                     | Enterprise                                        |
| ------------------------------- | --------------------------- | -------------------------------------------- | ------------------------------------------------- |
| **Functional requirements**     | Brief behavior descriptions | Numbered FRs with testable statements        | Formal FRs with traceability matrix               |
| **Acceptance criteria**         | Informal "done" definition  | Given/When/Then for each FR                  | Comprehensive ACs with edge cases documented      |
| **NFRs**                        | Note key quality concerns   | Documented NFRs including observability      | Full NFR catalog with SLOs and compliance mapping |
| **Prioritization**              | Informal must/nice-to-have  | MoSCoW classification for all requirements   | Weighted prioritization with stakeholder input    |
| **Edge cases/data constraints** | Acknowledge known issues    | Document top edge cases and data constraints | Comprehensive edge case analysis, data mapping    |
| **Stakeholder review**          | Informal check-in           | Alignment review with engineering            | Formal review cycles with sign-off                |
| **Compliance**                  | Basic awareness             | Documented compliance requirements           | Full compliance matrix with audit trail           |

Expand Requirements only when needed:

- **Regulated / compliance-heavy:** Add control requirements, compliance
  sign-off
- **Complex data migrations:** Add data mapping, transformation rules
- **Multi-team interface work:** Add interface contracts, cross-team SLAs
- **High availability / performance:** Add detailed SLOs, fault tolerance specs
- **Security-sensitive:** Add threat model, audit requirements

Otherwise, keep Requirements concise and move to System Design.

> These triggers help you decide when to move from Minimal to Standard or
> Enterprise. For full tier definitions and choosing criteria, see the
> [Right-Sizing Guide](../right-sizing-guide.md).

---

## Requirements Workflow

1. **Review Initiation Brief** — understand objectives, success criteria,
   constraints, and non-goals
2. **Draft functional requirements** — convert business objectives into testable
   behavior statements (FR-1, FR-2, etc.)
3. **Define acceptance criteria** — write objective, observable conditions for
   each FR (Given/When/Then format)
4. **Identify non-functional requirements** — capture quality attributes
   including observability NFRs for success metrics
5. **Capture brownfield constraints** — document existing system constraints as
   NFRs (if applicable)
6. **Prioritize with MoSCoW** — classify all requirements as Must Have, Should
   Have, Could Have, or Won't Have
7. **Review with engineering** — conduct alignment review to validate
   feasibility and completeness
8. **Prepare for Gate 2** — compile Requirements Document for the Gate 2
   decision package

---

## Requirements Guidance

### Primary Audience

**Primary roles:** Business Analysts, Product Managers **Supporting roles:**
Engineers, Architects, QA

The language in Requirements artifacts is intentionally **business-focused with
technical precision** — accessible to non-technical stakeholders while rigorous
enough for engineering teams.

### Key Terms

**Functional Requirements (FRs):** Testable statements of required system
behavior. Numbered (FR-1, FR-2) for traceability.

**Acceptance Criteria (ACs):** Objective, observable conditions that define
"done" for a requirement. Given/When/Then format or measurable conditions.

**Non-Functional Requirements (NFRs):** Quality attributes (performance,
reliability, security, observability, compliance) that shape architecture and
testing.

**MoSCoW:** Coarse prioritization method — Must Have, Should Have, Could Have,
Won't Have. See
[Framework Guide: MoSCoW](../framework-guide.md#moscow-prioritization).

> For detailed definitions, good/bad examples, and formatting guidance, see
> [Requirements Reference: Terminology](requirements-reference.md#requirements-terminology).

### Why These Requirements Elements Matter

Each section of the requirements brief serves a specific purpose. Key
highlights:

- **Success metrics** from Initiation establish the measurement throughline —
  translate them into NFRs (see
  [Framework Guide: Measurement Throughline](../framework-guide.md#measurement-throughline))
- **MoSCoW prioritization** prevents scope creep and enables faster trade-off
  decisions
- **FRs + ACs** enable objective validation in Verification stage
- **NFRs** (especially observability) shape architecture decisions and testing
  strategy
- **Data/integration constraints** prevent schedule slips from unexamined
  limitations
- **Edge cases** drive significant design complexity — document expected
  behavior early

> For section-by-section rationale, see
> [Requirements Reference: Section Rationale](requirements-reference.md#why-each-requirements-section-matters).

### Brownfield Projects

For **brownfield projects** (extending existing systems), requirements must
capture **existing system constraints** as NFRs. These define boundaries within
which new work must operate.

**Constraint categories:**

1. Performance constraints (existing SLAs)
2. Security policies (auth, encryption, audit)
3. API contracts (backward compatibility)
4. Data schemas (referential integrity, formats)
5. Compliance requirements (GDPR, HIPAA, etc.)
6. Architectural constraints (tech stack, patterns)
7. Operational constraints (deployment windows, rollback)

**Failing to capture constraints early** leads to late-stage design changes,
performance regressions, breaking changes, and deployment failures.

**How to capture:** Review existing docs, interview engineering teams, examine
codebase, identify integration points, document as NFRs, validate with
stakeholders.

> For detailed constraint categories with examples, NFR templates, and
> greenfield vs. brownfield comparison, see
> [Requirements Reference: Brownfield Constraints](requirements-reference.md#brownfield-constraint-categories).

### Common Pitfalls

- **Requirements describe UI, not behavior** → Rewrite as behavior: "The system
  shall allow agents to search by customer phone number."

- **Acceptance criteria are subjective** → Add observable signals: "Results in
  <2s (p95); displays most recent timestamp."

- **"Everything is Must Have"** → Force prioritization; Must Have is the minimum
  usable set.

- **NFRs added late** → Capture performance, security, scalability NFRs early.

- **No observability NFRs** → Add observability NFRs for each success metric.

- **Data/integration constraints ignored** → Document rate limits, SLAs, data
  ownership early.

- **Requirements not reviewed by engineering** → Conduct alignment reviews with
  engineering.

- **Edge cases discovered during testing** → Document top edge cases early.

---

## When to Revisit Requirements

Requirements is foundational but revisitable:

**Triggers:**

- System Design reveals better approach (pivot decision)
- Business priorities shift or new constraints emerge
- Technical infeasibility discovered
- Stakeholder feedback indicates misalignment
- Compliance or regulatory changes

**Process:**

1. Update Requirements Document with changes
2. Conduct alignment review with stakeholders
3. Re-run requirements-checklist.md
4. Update System Design artifacts to reflect changes
5. Assess impact on schedule/scope/risk

---

## Related Documents

- [Requirements Brief Template](requirements-brief-template.md)
- [Requirements Checklist](requirements-checklist.md)
- [Requirements Reference](requirements-reference.md)
- [AI-Assisted SDLC Stages](../framework-stages.md)

---

## Notes

**Last Updated:** 2026-02-16

Added to framework in v0.3.0.
