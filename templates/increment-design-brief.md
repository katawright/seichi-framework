<!-- For guidance on completing this brief, see increment-design/README.md -->

# Increment Design Brief

**Last Updated:** YYYY-MM-DD

---

**Project Name:** [Project Name] **Increment Number/Name:** [e.g., Increment 1:
Foundation] **Date:** [YYYY-MM-DD] **Author(s):** [Engineering Lead]
**Reviewers:** [Engineering Team, QA Engineers]

---

## Metadata

- **Related Requirements:** [Link to requirements-brief.md]
- **Related System Design:** [Link to system-design-brief.md]
- **Execution Pattern:** Iterative (see
  [AI-Assisted SDLC Stages](../guides/stages.md))
- **Primary Role:** Engineers
- **Supporting Roles:** QA Engineers, Product Manager
- **Checkpoint:** Quality Checkpoint (optional for Minimal; recommended for
  Standard; required for Enterprise)
- **Constraining ADRs:** [ADR-001, ADR-003 — list decisions that shape this
  increment's design]

---

## 1. Increment Scope

**Requirements in Scope:**

- [List requirement IDs from increment plan]

**Acceptance Criteria:**

- [Key ACs from requirements-brief for this increment]

**Out of Scope for This Increment:**

- [What's NOT included to prevent scope creep]

---

## 2. Component Design

### 2.1 Components in This Increment

<!-- Minimal: brief notes per component | Standard: component specs with responsibilities | Enterprise: detailed design docs with review -->

**Component: [Name]**

**Responsibilities:** [What it does]

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

<!-- Include sections below that apply to your project. Not all projects require data storage or schema changes. -->

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

<!-- Include sections below that apply to your project. Choose the interface types relevant to your technology stack. -->

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

- Manual test scenarios referencing ACs from requirements-brief
- UAT script for stakeholders

### 5.4 Performance Testing (if applicable)

- Load test scenarios validating NFRs
- Tools and approach
- Success criteria

<!-- For detailed testing strategy examples, see ../stages/increment-design/reference.md#testing-strategy-example -->

---

## 6. Implementation Notes

Guidance, tips, and considerations for engineers:

### Security Notes

- [Security considerations specific to this increment]

### Performance Notes

- [Performance considerations, indexes, optimizations]

### Code Patterns

- [Patterns to follow, conventions, gotchas]

<!-- Before proceeding to Implementation, run the Increment Design Checklist: ../stages/increment-design/checklist.md -->

<!-- Template Last Updated: 2026-02-27 | Added in v0.12.0 -->
