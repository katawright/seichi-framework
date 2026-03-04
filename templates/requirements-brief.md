<!-- For guidance on completing this brief, see requirements/README.md -->

# Requirements Brief

> **Convention:** Flag unverified assumptions with `[ASSUMED]` throughout the
> brief for gate reviewers to audit.

## Right-Sizing This Brief

<!-- See requirements/README.md#right-sizing-requirements for the full
     practice table and expansion triggers. -->

**Tier chosen:** [Minimal / Standard / Enterprise]

---

## Context

<!-- For guidance, see requirements/README.md#context -->

- [What triggered this requirements work / where it sits in the roadmap]

---

## Users / Personas

<!-- For guidance, see requirements/README.md#userspersonas -->

- [Primary users and secondary stakeholders with brief context]

---

## Problem to Solve (Summary)

<!-- For guidance, see requirements/README.md#problem-statement -->

- [Problem in problem-first form (no solutions), carried forward from Initiation
  Brief]

---

## Goals and Success Criteria (from Initiation)

<!-- For guidance, see requirements/README.md#goals-and-success-criteria -->
<!-- Measurement throughline: These metrics from the Initiation Brief inform your functional and non-functional requirements. NFRs should include instrumentation to measure these metrics. -->
<!-- For Standard+ tier, add a Measurement Throughline column mapping each
     success criterion to its supporting FR/NFR IDs. This makes the
     FR-to-SC traceability explicit and catches gaps before System Design.
     Example: SC-1 maps to FR-4, FR-6, NFR-OBS-1. -->

- [Measurable success criteria from Initiation Brief (baseline → target)]

---

## Constraints

<!-- Carry forward from Initiation: Review the Initiation Brief for constraints already identified (budget, deadlines, team capacity, compliance, technology restrictions). Capture them here, then add any new constraints discovered during requirements elicitation. -->
<!-- For brownfield projects, see requirements/README.md#constraints -->
<!-- Constraints inform MoSCoW prioritization and shape NFRs. Detailed cost analysis happens during System Design, with Gate 2 as the decision point. -->

### From Initiation Brief

- [Copy relevant constraints from Initiation Brief]

### Discovered During Requirements

- [New constraints surfaced during stakeholder interviews, technical discovery,
  or requirements elicitation]

### Brownfield Constraints (if applicable)

<!-- Include for brownfield projects. These constraints shape System Design
     decisions and increment planning. -->

- **Existing API contracts:** [APIs that must maintain backward compatibility —
  versions, consumers, SLAs]
- **Database schema constraints:** [Schema elements that cannot change or
  require migration strategy — shared tables, stored procedures, triggers]
- **Performance SLAs:** [Existing SLAs that must be maintained during and after
  changes — response times, throughput, availability]
- **Integration dependencies:** [Upstream/downstream systems that constrain
  change scope — shared message queues, event buses, batch jobs]
- **Deployment constraints:** [Deployment windows, blue-green requirements,
  rollback expectations, feature flag infrastructure]

---

## Scope Baseline

<!-- For guidance, see requirements/README.md#scope-baseline-moscow -->
<!-- Minimal: informal must/nice-to-have | Standard: MoSCoW for all requirements | Enterprise: MoSCoW plus weighted scoring with formal input -->

### Must Have (first usable release)

- [Requirements critical for the first usable release]

### Should Have (future releases - committed)

- [Important requirements committed but deferred to future releases]

### Could Have (if time/resources permit - not committed)

- [Desirable requirements, not committed]

### Won't Have (out of scope / non-goals)

- [Explicitly excluded to prevent scope creep]

---

## Functional Requirements and Acceptance Criteria

<!-- For guidance, see requirements/README.md#functional-requirements and
     requirements/README.md#acceptance-criteria -->
<!-- Minimal: brief behavior descriptions with informal "done" definitions |
     Standard: numbered FRs with Given/When/Then ACs |
     Enterprise: formal FRs with comprehensive ACs and edge cases -->

- **FR-1:** [requirement description]
  - **AC-1.1:** [acceptance criterion]

- **FR-2:** [requirement description]
  - **AC-2.1:** [acceptance criterion]

- **FR-3:** [requirement description]
  - **AC-3.1:** [acceptance criterion]

---

## Traceability Summary

| FR ID | Initiation Objective | MoSCoW | ACs    | Success Metric |
| ----- | -------------------- | ------ | ------ | -------------- |
| FR-1  | [objective ref]      | Must   | AC-1.1 | [metric ref]   |
| FR-2  | [objective ref]      | Should | AC-2.1 | [metric ref]   |

---

## Non-Functional Requirements (NFRs) — Minimal Set

<!-- For guidance, see requirements/README.md#non-functional-requirements -->
<!-- Include only NFRs that matter for decisions, testing, or architecture. For each NFR, define measurable pass/fail checks (thresholds, SLOs, instrumentation, or test method). Ensure observability NFRs capture instrumentation needed to measure success metrics. -->

- **Performance:** [NFR] | **Verification criteria:** [how validated]
- **Reliability:** [NFR] | **Verification criteria:** [how validated]
- **Security/Privacy:** [NFR — derive from Initiation data sensitivity
  classification; consider auth, encryption, audit logging, data retention] |
  **Verification criteria:** [how validated]
- **Scalability (if relevant):** [NFR] | **Verification criteria:** [how
  validated]
- **Observability:** [NFR] | **Verification criteria:** [how validated]
- **Compliance (if any):** [NFR] | **Verification criteria:** [how validated]

---

## Data and Integrations (Constraints)

<!-- For guidance, see requirements/README.md#data-and-integrations -->

- [Data sources with ownership, retention, access patterns]
- [External/internal integrations with constraints (rate limits, SLAs, auth)]

---

## Edge Cases and Error Handling

<!-- For guidance, see requirements/README.md#edge-cases -->

- [Top edge cases with expected behavior]
- [edge case]
- [edge case]

---

## Interface Examples (Optional)

<!-- Include representative examples of the primary user interface to help
     downstream stages (System Design, Increment Design) understand the
     expected interaction model.
     - For CLI tools: representative terminal input/output
     - For APIs: example requests and responses
     - For UIs: wireframes, mockups, or annotated screenshots -->

---

## Open Questions / Blockers

<!-- For guidance, see requirements/README.md#open-questions -->

- **Q1:**
- **Q2:**

---

## Requirements Readiness (Ready for System Design)

<!-- For guidance, see requirements/README.md. Use Requirements Checklist for detailed validation. -->

**Ready when:**

- All high-priority FRs have acceptance criteria (objective/observable)
- FRs and FR acceptance criteria reviewed and approved by business and technical
  stakeholders
- Key NFRs captured with verification criteria (performance, reliability,
  security, observability)
- Measurement/instrumentation needs identified (observability NFRs)
- Requirements are testable and unambiguous
- Open questions documented with owners (blockers resolved or mitigated)

**Decision:** Ready for System Design / Revise requirements / Stop

**Next step if ready:** Proceed to System Design stage (foundational pass).
Provide this Requirements Brief to System Design team.

**Review sign-off:**

| Reviewer | Role        | Date       | Status                      |
| -------- | ----------- | ---------- | --------------------------- |
| [name]   | Engineering | YYYY-MM-DD | Approved / Revisions needed |
| [name]   | Product     | YYYY-MM-DD | Approved / Revisions needed |
| [name]   | Security    | YYYY-MM-DD | Approved / Revisions needed |

---

## (Optional) Gate 2 Planning

<!-- Gate 2 (the major build/no-build decision) occurs at the end of Requirements + System Design foundational pass, not at the end of Requirements alone. This section helps plan what outputs to produce during System Design. -->
<!-- Gate 2 differs from Gate 1: Gate 1 asks "Should we invest in requirements work?" (business case). Gate 2 asks "Should we commit to building?" (requirements + design + estimates). Record the actual decision using the Gate Decision Template. -->

**Gate 2 expected outputs** (produced during System Design foundational pass):

- Requirements + FR acceptance criteria reviewed and approved (completed in
  Requirements stage)
- High-level design documented with key trade-offs identified (System Design
  stage)
- Top risks addressed with spikes/prototypes/reviews and mitigations (System
  Design stage)
- Increment plan with dependencies for iterative delivery (System Design stage)
- Updated staffing/timeline estimates with improved confidence (System Design
  stage)
- Recommendation: proceed / pivot / stop (System Design stage)

**For System Design team:** Focus foundational design pass on:

- Architecture trade-offs affecting cost/schedule/risk
- Instrumentation approach for success metrics (observability)
- Technical risks requiring spikes or prototypes
- Dependency ordering for incremental delivery

---

## Change Log

| Date       | Change description            | Sections affected | Impact | Approved by |
| ---------- | ----------------------------- | ----------------- | ------ | ----------- |
| YYYY-MM-DD | Initial requirements document | All               | N/A    | [name]      |

---

## Self-Validation Against Requirements Checklist

<!-- Before submitting for gate review, self-assess against the Requirements
     Checklist. This catches issues before formal review and improves
     first-pass quality. -->

- [ ] Pre-filled [Requirements Checklist](../stages/requirements/checklist.md)
      with self-assessment and evidence for each item
- **Items needing attention:** [List any items that don't fully pass]

<!-- Template Last Updated: 2026-03-03 | Added in v0.3.0 -->
