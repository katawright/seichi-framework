---
id: brownfield-readiness
type: guide
concerns: [brownfield-assessment, readiness-spectrum, codebase-evaluation]
---

# Brownfield Readiness Guide

## Overview

Assessment framework and routing logic for brownfield projects adopting
AI-assisted development — from evaluating codebase state to choosing the right
preparation path.

### Why Brownfield Readiness

Brownfield projects vary enormously. A well-tested codebase with current
documentation needs only a discovery pass before AI-assisted feature work, while
a codebase with no tests, tribal-knowledge-only architecture, and tangled
multi-repo dependencies may need months of preparation. Without a structured
readiness assessment, teams either over-invest in preparation (delaying value)
or under-invest (setting AI tools up to fail on a codebase they can't reason
about effectively).

### Purpose

- Define the full brownfield readiness spectrum from AI-Ready to Consider
  AI-Native Replacement
- Provide a 5-dimension assessment framework for evaluating codebase readiness
- Route teams to the right preparation path based on assessment results
- Address multi-repository and database considerations that extend beyond a
  single codebase

### Key Principle

Assess the weakest dimension, not the average. A single critical gap — such as
zero test coverage or entirely undocumented architecture — can shift the overall
assessment rightward regardless of other dimensions.

### How to Use This Guide

1. Review the [**Readiness Spectrum**](#readiness-spectrum) to understand the
   full range of brownfield states
2. Complete the
   [**5-Dimension Readiness Assessment**](#5-dimension-readiness-assessment) for
   your codebase
3. Follow the [**Routing by Spectrum Level**](#routing-by-spectrum-level) to
   determine your preparation path
4. Check
   [**Multi-Repository and Database Considerations**](#multi-repository-and-database-considerations)
   if your system extends beyond a single repository

---

## Readiness Spectrum

Brownfield codebases exist on a spectrum. The framework defines five levels,
expanding from the original three-path model to cover the full range of
real-world brownfield states:

| Level                              | Description                                                                         | Foundation Work                   |
| ---------------------------------- | ----------------------------------------------------------------------------------- | --------------------------------- |
| **AI-Ready**                       | Well-tested, documented, consistent patterns. AI tools can work effectively as-is.  | Minimal — AGENTS.md + conventions |
| **Discovery Only**                 | Mostly ready, needs documentation for AI context. No structural changes needed.     | Focused discovery increment       |
| **Needs Preparation**              | Organized enough to work with but has notable gaps in tests, docs, or consistency.  | Extended foundation (time-boxed)  |
| **Needs Significant Preparation**  | Pervasive gaps across multiple dimensions. Single increment is not enough.          | Dedicated preparation project     |
| **Consider AI-Native Replacement** | Codebase state makes AI-assisted modification impractical or higher-risk than value | Flag for strategic evaluation     |

> **Note:** Most brownfield codebases fall in the middle three levels. The
> endpoints (AI-Ready and Consider AI-Native Replacement) are less common but
> important to recognize when they apply.

---

## 5-Dimension Readiness Assessment

Before planning foundation activities, assess the codebase across five
dimensions. This assessment shapes whether foundation work is a straightforward
discovery exercise or requires deeper preparation.

| Dimension                 | Ready                                      | Needs Preparation                           | Needs Significant Prep                                              |
| ------------------------- | ------------------------------------------ | ------------------------------------------- | ------------------------------------------------------------------- |
| Test coverage             | Automated tests cover critical paths       | Partial coverage, gaps in key areas         | Little or no test coverage                                          |
| Documentation             | Architecture documented                    | Some docs but gaps or stale                 | Undocumented, tribal knowledge only                                 |
| Architectural consistency | Consistent patterns across codebase        | Mostly consistent, some divergence          | Inconsistent, multiple conflicting approaches                       |
| Dependency health         | Single repo or clear multi-repo boundaries | Some cross-repo tangles, manageable         | Tangled cross-repo dependencies, unclear boundaries                 |
| Database and data logic   | Business logic in application code         | Some logic in stored procedures, documented | Significant untested logic in stored procedures, triggers, or views |

> **Interpretation:** A single critical gap — such as zero test coverage or
> entirely undocumented architecture — can shift the overall assessment
> rightward regardless of other dimensions. Focus on the weakest dimension when
> choosing a path.

### Indicative Thresholds

Use these thresholds as starting points — adjust to your organization's context.

| Dimension                 | Ready                             | Needs Preparation                | Needs Significant Prep            |
| ------------------------- | --------------------------------- | -------------------------------- | --------------------------------- |
| Test coverage             | >=70% on critical paths           | 50-69% or gaps in key areas      | <50% or no automated tests        |
| Documentation             | Architecture docs current         | Docs exist but partially stale   | Undocumented / tribal knowledge   |
| Architectural consistency | One dominant pattern per layer    | Minor divergence, mostly aligned | Multiple conflicting patterns     |
| Dependency health         | Clear repo boundaries, <6 mo deps | Some tangles, manageable debt    | Tangled cross-repo, outdated deps |
| Database/business logic   | Logic in application code         | Some stored procs, documented    | Significant untested DB logic     |

---

## Routing by Spectrum Level

### AI-Ready

When all dimensions are "Ready" and AI context documentation already exists (or
is trivially producible), the codebase is AI-Ready. Foundation work is minimal.

**What to do:**

- Create an AGENTS.md at your project root with project-specific conventions,
  tech stack, and workflow
- Verify existing documentation is accessible to AI tools
- Proceed directly to feature delivery

**Completion signal:** AGENTS.md exists and AI tools can reference project
conventions effectively.

### Discovery Only

When most dimensions are "Ready," foundation work is a focused discovery and
documentation effort — no structural changes needed.

**Route to these guides:**

- **Existing architecture discovery -->**
  [System Design Reference: First AI-Assisted Project (Discovery)](../stages/system-design/reference.md#first-ai-assisted-project-discovery)
  — document architecture, components, and data flows
- **Existing deployment infrastructure -->**
  [Deployment Setup Guide: Brownfield Path](../stages/deployment/setup.md#brownfield-path)
  — inventory environments, capture tribal knowledge, identify gaps
- **Existing operational processes -->**
  [Support Operations Guide: Brownfield Path](../stages/support/operations.md#brownfield-path)
  — document incident response, monitoring, and support workflows

**Completion signal:** Architecture, infrastructure, and operational processes
are documented in a structure (AGENTS.md, docs/) that AI tools can reference
effectively. Create an AGENTS.md at your project root with project-specific
conventions, tech stack, and workflow — your AI assistant can help generate one.

### Needs Preparation: Extended Foundation

When the codebase is organized enough to work with but has notable gaps —
limited test coverage, stale documentation, or some tangled dependencies —
extend foundation work beyond pure discovery to address the highest-priority
gaps.

**Typical additional activities:**

- Add test coverage to critical business paths
- Clarify and document key architectural patterns
- Map cross-repository dependencies and contracts
- Document business logic in stored procedures or database views

Keep this time-boxed. The goal is "enough foundation to start," not perfection.
Address remaining gaps incrementally during feature work.

**Completion signal:** AI context is documented AND the team can verify
AI-generated changes in the areas targeted for pilot work.

For operational guidance on preparation activities, see the
[Brownfield Preparation Guide](brownfield-preparation.md).

### Needs Significant Preparation: Preparation Project

When the codebase has pervasive gaps — poor test coverage, inconsistent
architecture, tangled multi-repo dependencies, or significant untested database
logic — a single increment is not enough. Treat preparation as a dedicated
project that runs through the framework's own stages across multiple increments.

**Illustrative increment sequence** (adapt to your situation):

1. **Increment 1:** Document architecture, map repositories and dependencies
2. **Increment 2:** Establish test coverage for critical business paths
3. **Increment 3:** Extract or document database-layer business logic
4. **Increment 4:** Stabilize patterns in areas targeted for feature work

**How AI helps with preparation:** AI tools accelerate preparation itself —
generating initial test suites for existing code, drafting architecture
documentation from code analysis, mapping dependency graphs, and documenting
stored procedure logic. Preparation is faster with AI even before the codebase
is fully ready for AI-assisted feature work.

> **Preparation as a pilot:** This preparation project can serve as your
> organization's adoption pilot. Run 1-2 preparation increments, evaluate
> results, then decide whether to complete the full preparation. See the
> [Organizational Adoption Guide](adoption.md#brownfield-preparation-as-a-pilot)
> for details.

**Completion signal:** Areas targeted for AI-assisted feature work meet the
"Ready" level on assessment dimensions.

For operational guidance on preparation activities, see the
[Brownfield Preparation Guide](brownfield-preparation.md).

### Consider AI-Native Replacement

When a codebase's state makes AI-assisted modification impractical — the cost of
preparation exceeds the value of incremental improvement — teams should flag
this for strategic evaluation rather than forcing AI-assisted work onto an
unsuitable codebase.

**Indicators:**

- Preparation effort estimated at 6+ months with uncertain outcomes
- Architecture is fundamentally incompatible with incremental modification
- Business logic is distributed across untestable layers with no documentation
- The system is already a candidate for replacement on other grounds

> **TODO (deferred):** How far the framework should go on this end of the
> spectrum — flag-only vs. light evaluation criteria vs. full decision guide.
> Currently this level serves as a recognition flag, not a decision framework.

---

## Multi-Repository and Database Considerations

"The codebase" may extend beyond a single repository. Consider:

- **Multiple repositories** with shared dependencies or a central dependency
  repo
- **Cross-repository contracts** — API boundaries, shared types, and dependency
  graphs that span repos
- **Database-layer business logic** — stored procedures, triggers, and views
  containing business rules that AI tools cannot analyze directly from
  application code

**Sequencing advice:**

1. Start with the central or most-depended-upon repository
2. Document cross-repo contracts and integration points
3. Treat database logic as a separate documentation and testing effort — AI
   tools analyze application code effectively but need explicit documentation
   for database-layer logic

---

## Brownfield Requirements: Capturing Constraints

During **Requirements**, brownfield projects must **capture existing system
constraints** that new work must satisfy:

- **Performance constraints:** Existing SLAs (e.g., "API responses < 1 second")
- **Security policies:** Authentication, authorization, data encryption
  standards
- **API contracts:** Existing interfaces that must remain compatible
- **Data schemas:** Database structures, data formats, integration formats
- **Compliance requirements:** Regulatory constraints already in place
- **Architectural constraints:** Patterns, frameworks, languages in use
- **Operational constraints:** Deployment windows, rollback requirements

These constraints become **Non-Functional Requirements (NFRs)** that shape
design and testing. See the
[Requirements Stage Guide](../stages/requirements/README.md#constraints) for
detailed guidance.

---

## Key Concepts

The following concepts are important for brownfield readiness decisions.
Structural placeholders are included for content that will be expanded in a
subsequent refinement pass.

### Logic Authority

_Where does the authoritative business logic live?_ In brownfield systems,
business logic may be split across application code, stored procedures,
triggers, views, and external services. Identifying logic authority per domain
area is critical for scoping AI-assisted work — AI tools can reason about
application code but need explicit documentation for database-layer and
external-service logic.

### Wrap vs. Extract Decision

When existing code is poorly structured for AI-assisted modification, teams face
a choice: **wrap** the existing code (build new functionality around it,
treating it as a black box) or **extract** and restructure it (make it
AI-accessible). The right choice depends on the scope of planned changes, the
cost of extraction, and whether the existing code is a temporary or long-term
fixture.

### External Write Paths

Systems where external processes write directly to the database — ETL jobs,
partner integrations, manual data fixes — create hidden dependencies that
AI-assisted changes may break. Identify and document external write paths during
readiness assessment.

---

## Notes

**Last Updated:** 2026-03-04

Added to framework in v0.37.0.
