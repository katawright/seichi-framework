<!-- For guidance on completing this brief, see increment-design/README.md -->

# Increment Design Brief

> **Before starting a session on this brief:** follow the steps in
> [Session Protocol](../guides/session-protocol.md). Check it at session start
> so nothing is missed as the protocol evolves.

> **Stage guide:**
> [Increment Design README](../stages/increment-design/README.md)

> **Convention:** Flag unverified assumptions with `[ASSUMED]` throughout the
> brief for gate reviewers to audit. During review, each `[ASSUMED]` item should
> be **confirmed** (verified — remove tag), **challenged** (incorrect — update
> and remove tag), or **carried forward** (unverifiable now — leave tag and note
> as a gate condition).

> **Tier annotations:** Sections marked
> `<!-- Minimal: skip this section entirely -->` should be omitted in full — do
> not write N/A. Sections marked
> `<!-- Minimal: ... | Standard: ... | Enterprise: ... -->` indicate how to
> adapt the section's content depth for your project tier. Annotations are HTML
> comments and are invisible in rendered output.

**Last Updated:** YYYY-MM-DD

---

**Project Name:** [Project Name] **Increment Number/Name:** [e.g., Increment 1:
Foundation] **Date:** [YYYY-MM-DD] **Author(s):** [Engineering Lead]
**Reviewers:** [Engineering Team, QA Engineers, Project Manager]

---

## Metadata

- **Related Requirements:** [Link to requirements-brief.md]
- **Related System Design:** [Link to system-design-brief.md]
- **Execution Pattern:** Iterative (see
  [AI-Assisted SDLC Stages](../guides/stages.md))
- **Primary Role:** Engineers
- **Supporting Roles:** Architect, QA Engineers, Product Manager, Project
  Manager
- **Checkpoint:** Review (optional for Minimal; recommended for Standard;
  required for Enterprise)
- **Depends On:** [e.g., Increment 0 / None — inter-increment dependencies]
- **Constraining ADRs:** [ADR-0012-01, ADR-0012-03 — list decisions that shape
  this increment's design]

---

## Carry Forward Resolution (if applicable)

<!-- Omit this section entirely for the first increment, or if no retrospective
     was conducted before this increment. Do not write N/A. -->

| Carry-Forward Item | Source       | Disposition in This Increment                    |
| ------------------ | ------------ | ------------------------------------------------ |
| [item]             | [retro file] | [Addressed in FR-X / Deferred with reason / N/A] |

---

## 1. Increment Scope

**Requirements in Scope:**

<!-- For foundation/bootstrap increments (e.g., Increment 0), list
     infrastructure concerns and NFR-IDs rather than FR-IDs. The purpose
     is to define what the increment delivers, regardless of whether
     deliverables map to numbered functional requirements.

     Foundation scope example (discovery increment):
     - D-1: AGENTS.md with project conventions and tech stack
     - D-2: CI/CD pipeline configuration and documentation
     - D-3: Architecture documentation (C4 context + container)
     - D-4: Test coverage baseline with gap analysis -->

- [List requirement IDs from increment plan]

**Acceptance Criteria:**

- [Key ACs from requirements-brief for this increment]

**Out of Scope for This Increment:**

- [What's NOT included to prevent scope creep]

### Foundation Readiness Targets (if applicable)

<!-- Omit this section entirely for standard feature increments. Include only for
     Increment 0 (bootstrap/discovery). Do not write N/A. -->
<!-- Include for foundation/discovery increments (greenfield or brownfield).
     Maps readiness axes to concrete deliverables for this increment. See
     guides/brownfield-readiness.md#readiness-rubric.

     Foundation concern areas to consider:
     1. Code quality tooling — linting, formatting, pre-commit hooks
     2. Testing infrastructure — framework setup, fixture/seed strategy, coverage
     3. Security tooling — SAST, dependency scanning, secrets detection
     4. Local dev environment — devcontainers, Docker Compose, env var management
     5. Documentation tooling — API docs generation, architecture diagrams, changelog
     6. Developer onboarding — PR templates, code review standards, setup runbooks
     See stages/increment-design/README.md#i0-foundation-concerns for tier guidance. -->

| Readiness Axis          | Pre-State       | Target Post-State | Deliverables                        |
| ----------------------- | --------------- | ----------------- | ----------------------------------- |
| [e.g., Verifiability]   | [current state] | [target state]    | [e.g., add tests for auth module]   |
| [e.g., Discoverability] | [current state] | [target state]    | [e.g., AGENTS.md, architecture doc] |

---

## 2. Component Design

### 2.1 Components in This Increment

<!-- Minimal: brief notes per component | Standard: component specs with responsibilities | Enterprise: detailed design docs with review -->

**Component: [Name]**

**Responsibilities:** [What it does]

**Constraining ADRs:** [ADR-NNNN-CC, ADR-NNNN-CC — or "None"]

**Structure:**

```
[Directory/file structure with key functions]
```

**Dependencies:** [Libraries, other components] **State:** [Stateless /
stateful, approach]

### 2.2 Component Interactions

**[Feature Name] Flow:**

```
[Numbered steps showing component interactions]
```

**Error Scenarios:**

- [Error condition] -> [Response] -> [User experience]

---

## 3. Data and State Changes

> **Right-sizing:** Minimal — omit this section entirely if this increment
> introduces no schema changes, new data storage, or state management changes.
> Do not write N/A.

### 3.1 State Management Changes

<!-- Minimal: note what changes | Standard: migration plan, rollback approach | Enterprise: formal data migration plan with validation steps -->

### 3.2 Schema/Storage Changes (if applicable)

**New/Modified Structures:**

```
[Schema definitions, DDL, document structures, or storage formats]
```

**Migration Strategy:** [Migration path/name or approach] **Rollback:**
[Rollback strategy]

### 3.3 Data Access Patterns (if applicable)

- Key queries or data retrieval patterns
- Caching strategy (if applicable)
- Performance considerations (e.g., N+1 prevention, pagination)

---

## 4. Interface Specifications

> **Right-sizing:** Minimal — omit this section entirely if this increment
> introduces no new or changed external interfaces. Do not write N/A.

### 4.1 Interfaces

<!-- Minimal: informal agreements or conventions | Standard: documented API contracts and component props | Enterprise: formal interface specs with versioning strategy -->
<!-- For detailed interface specification examples, see ../stages/increment-design/reference.md#interface-specification-examples -->

**[Interface identifier]**

- **Description:** [What it does]
- **Input:** [Parameters, props, request body, arguments]
- **Output:** [Return value, response, emitted event]
- **Error cases:** [Validation failures, error states]

---

## 5. Testing Strategy for This Increment

### 5.1 Unit Tests

- Key functions to test
- Test cases (happy path, edge cases, errors)
- Coverage targets
- Mock strategy for external dependencies

### 5.2 Integration Tests

- Interface tests (e.g., API request/response, component rendering, event
  handling)
- Data integration tests (if applicable)
- End-to-end flows

### 5.3 Acceptance Testing

<!-- Map each acceptance criterion to its planned test approach. QA uses this
     table as the starting point for the verification brief's AC traceability. -->

| AC ID  | Test Approach        | UAT Required | Notes                     |
| ------ | -------------------- | ------------ | ------------------------- |
| AC-X.Y | [manual / automated] | [Yes / No]   | [scenario or script note] |

### 5.4 Performance Testing (if applicable)

- Load test scenarios validating NFRs
- Tools and approach
- Success criteria

<!-- For detailed testing strategy examples, see ../stages/increment-design/reference.md#testing-strategy-example -->

---

## 6. Implementation Notes

Guidance, tips, and considerations for engineers:

### Security Notes

<!-- Security throughline: assess whether this increment introduces security-relevant
     changes. See guides/security.md. -->

**Security-relevant changes in this increment:**

- [Auth/authz changes, new API surfaces, data model changes, third-party
  integrations, PII handling — or "None"]

**Applicable threats (from threat model):**

- [Reference relevant threats from System Design threat model — or "N/A if no
  threat model"]

**Security test cases for Verification:**

- [Specific security tests needed for this increment — or "Standard scanning
  sufficient"]

### Performance Notes

- [Performance considerations, indexes, optimizations]

### Code Patterns

- [Patterns to follow, conventions, gotchas]

<!-- Before proceeding to Implementation, run the Increment Design Checklist: ../stages/increment-design/checklist.md -->

---

## Open Questions

<!-- Tag each question with the consulted role (e.g., @Architect, @AppSec).
     See guides/roles.md#consultation-protocol -->

- **Q1:** [@Role]
- **Q2:** [@Role]

---

## Self-Validation Against Increment Design Checklist

<!-- Before submitting for gate review, self-assess against the Increment Design
     Checklist. This catches issues before formal review and improves
     first-pass quality. -->

- [ ] Pre-filled
      [Increment Design Checklist](../stages/increment-design/checklist.md) with
      self-assessment and evidence for each item
- **Items needing attention:** [List any items that don't fully pass]

<!-- Template Last Updated: 2026-06-09 | Added in v0.12.0. Depends On and Foundation Concerns prompt added in v0.42.0. Tier annotations added in v0.42.0. Skip-entirely directives elevated to visible blockquotes and session protocol preamble added in v0.44.0. ADR id placeholders updated to promoted scheme in v0.48.0. -->
