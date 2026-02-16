# Design Stage Readiness Checklist

**Purpose:** Quick validation (60-90 seconds) that design is complete and ready
to proceed.

**Instructions:**

- Check the appropriate section based on design type (Foundational or Iterative)
- Every item should be checked before proceeding to next stage
- If any item is unchecked, address it before moving forward
- This is a quality checkpoint, not a gate - fix issues and retry

---

## Part A: Foundational Design Readiness

**Use this section after completing the initial architecture design, before Gate
2 decision.**

### Architecture and Technology

- [ ] **System architecture diagram exists** - Shows components, boundaries, and
      interactions
- [ ] **Technology stack is documented** - All major technologies selected with
      justification
- [ ] **Architecture Decision Records (ADRs) created** - Key decisions
      documented with rationale
- [ ] **Data architecture defined** - Entity model, relationships, and
      persistence strategy clear

### API and Integration

- [ ] **API design principles established** - Versioning, authentication, error
      handling conventions defined
- [ ] **Integration points identified** - Third-party APIs and services
      documented with patterns
- [ ] **Authentication/authorization approach defined** - Security mechanisms
      specified

### Non-Functional Requirements

- [ ] **Security architecture designed** - Authentication, encryption, input
      validation, vulnerability prevention
- [ ] **Compliance requirements addressed** - GDPR, HIPAA, or other regulations
      incorporated into design
- [ ] **Performance targets specified** - Response time, throughput, concurrency
      requirements clear
- [ ] **Scalability approach defined** - Horizontal/vertical scaling, caching,
      database scaling strategy

### Observability and Measurement

- [ ] **Monitoring and logging strategy designed** - Tools, metrics, alerts, and
      dashboards planned
- [ ] **Success criteria instrumentation planned** - How Initiation-stage
      success metrics will be measured
- [ ] **Measurement throughline validated** - NFRs from Requirements include
      instrumentation needs

### Increment Plan

- [ ] **Iteration plan created** - MoSCoW priorities mapped to specific
      increments
- [ ] **Must Have requirements in first increments** - Minimum viable
      functionality prioritized
- [ ] **Should Have requirements sequenced** - Dependencies and value considered
- [ ] **Could Have evaluation approach defined** - Opportunistic build/skip
      criteria clear
- [ ] **Won't Have requirements documented** - Out-of-scope items explicitly
      listed

### Readiness for Gate 2

- [ ] **All requirements have architectural approach** - Every FR and NFR can be
      implemented with this design
- [ ] **No major technical unknowns remain** - Prototyping done for risky or
      uncertain areas
- [ ] **Design is implementable within constraints** - Team skills, budget,
      timeline are realistic
- [ ] **Alignment Review conducted** - Stakeholders reviewed and approved
      architecture

---

## Part B: Iterative Design Readiness (Per Increment)

**Use this section before implementing each increment, after foundational
architecture is established.**

### Increment Scope

- [ ] **Increment scope is clear** - Requirements in scope are explicitly listed
- [ ] **Out-of-scope items documented** - What's NOT included in this increment
      is clear
- [ ] **Acceptance criteria identified** - Key ACs from requirements-brief that
      apply to this increment

### Component Design

- [ ] **Components detailed** - Responsibilities, structure, and dependencies
      specified
- [ ] **Component interactions documented** - Sequence diagrams or flow
      descriptions exist
- [ ] **Error handling paths defined** - Both happy path and error scenarios
      documented

### Data and APIs

- [ ] **Data model changes specified** - New tables, columns, indexes documented
      with migrations
- [ ] **Data access patterns clear** - Queries, ORM usage, caching strategy
      defined
- [ ] **API specifications complete** - All endpoints have method, path,
      request, response, errors
- [ ] **API follows conventions** - Adheres to design principles from
      foundational design

### Testing Strategy

- [ ] **Unit test approach defined** - Key functions identified, test cases
      outlined, coverage targets set
- [ ] **Integration test scenarios listed** - API endpoint tests, database
      tests, end-to-end flows
- [ ] **Acceptance test cases created** - Manual UAT scripts reference
      acceptance criteria
- [ ] **Performance tests planned** - Load test scenarios validate NFRs (if
      applicable to this increment)
- [ ] **Test strategy ready for Verification** - Plan is detailed enough for QA
      team to execute tests in Verification stage

### Implementation Readiness

- [ ] **Implementation notes provided** - Guidance, gotchas, security
      considerations documented
- [ ] **No major blockers** - Dependencies are available (or mocked),
      environment is ready
- [ ] **Engineers understand the design** - Team has reviewed and can implement
      without guessing
- [ ] **Design supports requirements** - All requirements in this increment have
      implementable designs

### Optional Quality Checkpoint

- [ ] **Quality Checkpoint conducted (if needed)** - For complex/risky
      increments, tech lead reviewed and approved
- [ ] **Feedback incorporated** - Any review comments addressed in design

---

## Exit Criteria Alignment

This checklist ensures the Design stage exit criteria from
[AI-Assisted SDLC Stages](../framework-stages.md) are met:

**Foundational:**

- Architecture reviewed and approved ✓
- Security and performance considerations addressed ✓
- Design is implementable within constraints ✓

**Iterative:**

- Design supports all requirements for increment ✓
- Component interactions are clear ✓
- Testing approach is defined ✓

---

## Decision: Ready to Proceed?

**Foundational Design:**

- [ ] **Ready for Gate 2** - All foundational items checked, proceed to
      build/no-build decision
- [ ] **Not Ready** - Address unchecked items, iterate on design

**Iterative Design:**

- [ ] **Ready for Implementation** - All iterative items checked, proceed to
      coding
- [ ] **Not Ready** - Address unchecked items, refine detailed design

---

**If Not Ready:**

**Common issues and solutions:**

- **Architecture doesn't address all requirements** → Review requirements-brief,
  revisit architecture
- **Technology choices not justified** → Document trade-offs in ADRs
- **Iteration plan missing or unclear** → Map MoSCoW priorities to increments
  with dependencies
- **Security/performance not addressed** → Add sections to design-brief
- **API specs incomplete** → Detail all endpoints with request/response formats
- **Testing strategy missing** → Define unit, integration, acceptance test
  approaches
- **Major unknowns remain** → Prototype or spike risky areas before proceeding

---

**Related Documents:**

- [Design Brief Template](design-brief-template.md) - Complete this before using
  checklist
- [Design Guide](design-guide.md) - Detailed guidance on design practices
- [AI-Assisted SDLC Stages](../framework-stages.md) - Design stage definition and exit criteria

---

## Notes

**Last Updated:** 2026-02-15

Added to framework in v0.4.0.
