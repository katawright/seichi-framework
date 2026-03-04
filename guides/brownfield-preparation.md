---
id: brownfield-preparation
type: guide
concerns: [brownfield-preparation, discovery-activities, codebase-readiness]
---

# Brownfield Preparation Guide

## Overview

Operational guide for preparing a brownfield codebase for AI-assisted feature
work — from discovery activities through multi-increment preparation projects.

### Why Brownfield Preparation

Brownfield codebases that score below "AI-Ready" on the
[readiness assessment](brownfield-readiness.md#5-dimension-readiness-assessment)
need preparation work before AI tools can assist feature development
effectively. Without structured preparation guidance, teams either prepare too
little (AI-assisted work fails on an unsuitable codebase) or too much
(preparation becomes an open-ended refactoring project that never reaches
feature work).

### Purpose

- Define discovery and preparation activities by readiness dimension
- Provide infrastructure planning guidance for first AI-assisted projects
- Connect preparation work to the framework's iterative stage cycle
- Establish what "enough preparation" means for each dimension

### Key Principle

Preparation is bounded, not open-ended. The goal is "enough to start AI-assisted
feature work in targeted areas," not "perfect codebase." Define the target area,
prepare it, deliver features, then expand preparation incrementally.

### How to Use This Guide

1. Complete the readiness assessment in the
   [Brownfield Readiness Guide](brownfield-readiness.md#5-dimension-readiness-assessment)
   first
2. Follow [**Discovery Activities**](#discovery-activities) for all brownfield
   projects (Discovery Only and above)
3. Use
   [**Preparation Activities by Dimension**](#preparation-activities-by-dimension)
   for codebases that need preparation beyond discovery
4. See [**Infrastructure Planning**](#brownfield-infrastructure-planning) for
   System Design outputs specific to brownfield projects
5. Consider [**Preparation as Adoption Pilot**](#preparation-as-adoption-pilot)
   when treating preparation as your organization's first framework experience

---

## Discovery Activities

All brownfield projects — even those assessed as "AI-Ready" — benefit from a
discovery pass that documents existing systems for AI context. Discovery is the
minimum foundation work for any brownfield project adopting AI assistance.

### What to Discover

- **Architecture:** Component boundaries, data flows, integration points,
  deployment topology
- **Conventions:** Code patterns, naming conventions, directory structure,
  branching strategy
- **Constraints:** Performance SLAs, security policies, API contracts, data
  schemas, deployment windows
- **Infrastructure:** CI/CD pipelines, environments, monitoring, alerting
- **Operational processes:** Incident response, on-call, runbooks, support
  workflows

### Discovery Artifacts

| Artifact                    | Purpose                                            | Location            |
| --------------------------- | -------------------------------------------------- | ------------------- |
| AGENTS.md                   | Project conventions and AI context                 | Project root        |
| Architecture documentation  | Component diagrams, data flows, integration points | `docs/architecture` |
| Dependency map              | Cross-repo and external service dependencies       | `docs/architecture` |
| Infrastructure inventory    | Environments, pipelines, monitoring                | `docs/ops`          |
| Constraints and conventions | Coding standards, deployment rules, SLAs           | AGENTS.md or `docs` |

### How to Scope Discovery

- **Time-box:** 1-2 weeks for Discovery Only; longer for codebases needing
  preparation
- **AI-assisted:** AI tools can draft architecture documentation from code
  analysis — have team experts verify and correct
- **Verification:** Discovery is complete when an AI assistant, given only the
  documented context, can accurately describe the system's architecture,
  conventions, and constraints

**Route to stage-specific guides:**

- **Architecture discovery -->**
  [System Design Reference: First AI-Assisted Project (Discovery)](../stages/system-design/reference.md#first-ai-assisted-project-discovery)
- **Deployment infrastructure -->**
  [Deployment Setup Guide: Brownfield Path](../stages/deployment/setup.md#brownfield-path)
- **Operational processes -->**
  [Support Operations Guide: Brownfield Path](../stages/support/operations.md#brownfield-path)

---

## Preparation Activities by Dimension

For codebases assessed at "Needs Preparation" or "Needs Significant
Preparation," address gaps in the dimensions that scored lowest. The table below
defines what "enough preparation" looks like per dimension for the area targeted
for initial AI-assisted feature work.

| Dimension                 | Preparation Activities                                                                                | "Enough" Threshold                                                        |
| ------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Test coverage             | Add tests to critical business paths in the target area; prioritize integration tests over unit tests | AI-generated changes in the target area can be verified by existing tests |
| Documentation             | Document architecture, key patterns, and constraints; create AGENTS.md                                | AI tools can reason about the target area without hallucinating structure |
| Architectural consistency | Clarify the dominant pattern for the target area; document exceptions                                 | One clear pattern per layer in the target area; deviations are documented |
| Dependency health         | Map cross-repo dependencies for the target area; document API contracts                               | Changes in the target area have predictable cross-repo impact             |
| Database/business logic   | Document stored procedures, triggers, and views that affect the target area; add tests where possible | Business logic affecting the target area is documented and testable       |

> **Bounded preparation:** You don't need to prepare the entire codebase — only
> the area targeted for initial AI-assisted feature work. Expand preparation to
> additional areas as you expand AI-assisted development.

### Illustrative Preparation Sequence

For codebases needing significant preparation, treat preparation as a dedicated
project with its own increments:

1. **Increment 1:** Document architecture, map repositories and dependencies
2. **Increment 2:** Establish test coverage for critical business paths
3. **Increment 3:** Extract or document database-layer business logic
4. **Increment 4:** Stabilize patterns in areas targeted for feature work

Each increment follows the framework's iterative cycle (Increment Design -->
Implementation --> Verification --> Deployment). See the
[Project Foundation Guide](project-foundation.md#how-foundation-work-flows-through-stages)
for how foundation work maps to stages.

---

## Brownfield Infrastructure Planning

During **System Design**, infrastructure planning is a **required output** for
all project types. Brownfield projects have specific infrastructure planning
needs depending on whether this is the first or subsequent AI-assisted project.

### First AI-Assisted Project

- Assessment of existing infrastructure capabilities (team's tribal knowledge)
- ADRs for infrastructure adaptations or extensions
- Integration plan with existing CI/CD pipelines
- Deployment strategy within existing constraints
- Monitoring extensions or dashboard updates
- Security and compliance adjustments
- Readiness assessment using the
  [5-dimension assessment](brownfield-readiness.md#5-dimension-readiness-assessment)
  to determine foundation scope
- Preparation plan if readiness assessment identifies gaps beyond documentation
  (test coverage, pattern stabilization, dependency mapping, database logic)
- Increment plan identifying **Increment 0 = document existing context for AI**
  - What to document: architecture, conventions, constraints, infrastructure
  - Documentation structure approach (use existing or propose new)
  - Discovery approach (AI tools + team expert verification)
  - **Note:** If Increment 0 reveals significant gaps in team's understanding,
    may trigger return to System Design stage to reassess plans

### Subsequent Projects

- Assessment of existing infrastructure capabilities (use documented context)
- ADRs for infrastructure adaptations or extensions
- Integration plan with existing CI/CD pipelines
- Deployment strategy within existing constraints
- Monitoring extensions or dashboard updates
- Security and compliance adjustments
- Increment plan identifying **Increment 1 = first feature** (no foundation work
  needed)

**Key output:** All project types exit System Design with a clear plan that
enables subsequent feature delivery — greenfield and brownfield-first establish
foundations (infrastructure or documentation), brownfield-subsequent proceeds to
features.

---

## Preparation as Adoption Pilot

When a brownfield codebase needs significant preparation, the preparation
project itself can serve as the organization's adoption pilot for the framework.

**Key insight:** Preparation work — adding tests, documenting architecture,
mapping dependencies — exercises the framework's stages on familiar code. The
team builds framework fluency on territory they already know.

**Approach:**

1. Run 1-2 preparation increments through the framework's full cycle (Increment
   Design --> Implementation --> Verification --> Deployment)
2. Evaluate results using the
   [Adoption Guide success criteria](adoption.md#success-criteria-for-phase-2)
3. Decide whether to complete the full preparation project or adjust the
   approach

**Why this works:**

- Preparation outputs (tests, documentation, dependency maps) have immediate
  value regardless of whether the organization continues with the framework
- The team gains hands-on framework experience before tackling new feature work
- Lower risk than piloting on new feature development — preparation changes are
  additive, not behavior-changing

For the full organizational adoption context, see the
[Organizational Adoption Guide](adoption.md#brownfield-preparation-as-a-pilot).

---

## Structural Placeholders

The following topics are identified for expansion in a subsequent content
refinement pass. They are listed here to establish their structural home within
the preparation guide.

### Bounded Preparation Pattern

_How to define and enforce preparation boundaries — avoiding open-ended
refactoring while ensuring enough preparation for effective AI-assisted work._

### Definition of Enough Preparation

_Concrete criteria for deciding when preparation is sufficient to begin
AI-assisted feature work in a target area. Includes readiness re-assessment gate
to validate that preparation achieved its goals._

### Service Provider Contract Documentation

_Guidance for documenting contracts and interfaces with external service
providers, legacy systems, and third-party integrations that constrain
AI-assisted development._

### Migration Framework Setup

_Checklist for establishing the infrastructure needed when AI-assisted work
involves migrating from legacy patterns — feature flags, parallel-run
capability, rollback mechanisms._

### Cross-Increment Dependency Mapping

_How to identify and manage dependencies between preparation increments and
between preparation and feature work — preventing preparation from becoming a
serial bottleneck._

### Business Justification for Preparation

_How to frame preparation work in business terms — connecting codebase
preparation investment to delivery velocity, risk reduction, and AI adoption
ROI._

---

## Notes

**Last Updated:** 2026-03-04

Added to framework in v0.37.0.
