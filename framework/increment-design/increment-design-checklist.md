# Increment Design Readiness Checklist

**Purpose:** Quick validation (60-90 seconds) that increment design is complete
and ready for Implementation.

**Usage:** Check every item before implementing each increment.

---

## Increment Scope

- [ ] Increment scope is clear (in/out of scope)
- [ ] Acceptance criteria identified
- [ ] Out-of-scope items documented

## Component Design

- [ ] Components detailed (responsibilities, structure, dependencies)
- [ ] Component interactions documented
- [ ] Error handling paths defined

## Data and APIs

- [ ] Data model changes specified with migrations
- [ ] Data access patterns clear
- [ ] API specifications complete (method, path, request, response, errors)
- [ ] API follows foundational conventions

## Testing Strategy

- [ ] Unit test approach defined with coverage targets
- [ ] Integration test scenarios listed
- [ ] Acceptance test cases created from ACs
- [ ] Performance tests planned (if applicable)
- [ ] Test strategy ready for Verification stage

## Implementation Readiness

- [ ] Implementation notes provided (guidance, gotchas)
- [ ] No major blockers (dependencies available)
- [ ] Engineers understand the design
- [ ] Design supports all increment requirements

---

## Decision: Ready to Proceed?

- [ ] **Ready for Implementation** — All items checked
- [ ] **Not Ready** — Address unchecked items

---

> For common issues and troubleshooting when items fail, see
> [Increment Design Reference: Checklist Troubleshooting](increment-design-reference.md#checklist-troubleshooting).

> **AI suggestion:** _"Walk me through this checklist for [describe your
> increment design] and flag items needing attention."_

---

**Related Documents:**

- [Increment Design Brief Template](increment-design-brief-template.md)
- [Increment Design Guide](increment-design-guide.md)
- [Increment Design Reference](increment-design-reference.md)
- [AI-Assisted SDLC Stages](../framework-stages.md)

---

## Notes

**Last Updated:** 2026-02-16

Added to framework in v0.12.0.
