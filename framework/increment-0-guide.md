# Increment 0 Guide

Practical walkthrough for Increment 0 — the infrastructure or discovery work
that happens before your first feature increment. This guide explains when
Increment 0 applies, what it involves, and routes you to the stage-specific
guides where the actual work is defined.

For detailed activity lists and project-type comparisons, see the
[Framework Guide](framework-guide.md) section on
[Increment 0: The Critical Difference](framework-guide.md#increment-0-the-critical-difference).

---

## Purpose

Increment 0 is the bridge between foundational planning and feature delivery. It
takes the infrastructure decisions made during System Design and turns them into
working systems — CI/CD pipelines, environments, monitoring, and operational
processes.

Without Increment 0, teams jump from architecture documents to feature work and
discover infrastructure gaps mid-sprint. With it, the first feature increment
starts on solid ground.

## When It Happens

Increment 0 occurs after Gate 2 (System Design complete) and before your first
feature increment:

```
Foundational Stages          Increment 0          Feature Delivery
┌────────────────────┐      ┌───────────┐      ┌──────────────────┐
│ Initiation         │      │ Bootstrap │      │ Increment 1      │
│ Requirements       │─────>│    or     │─────>│ Increment 2      │
│ System Design      │      │ Discovery │      │ Increment 3      │
│                    │      │           │      │ ...              │
└────────────────────┘      └───────────┘      └──────────────────┘
        Gate 1  Gate 2           Gate 3
```

**Not every project needs Increment 0.** Brownfield projects with existing
infrastructure and documented AI context can skip directly to feature delivery.
See
[Greenfield vs. Brownfield Projects](framework-guide.md#greenfield-vs-brownfield-projects)
in the Framework Guide for how to determine your project type.

## Greenfield Increment 0 (Bootstrap)

Greenfield projects use Increment 0 to **establish infrastructure from
scratch**. System Design has already defined _what_ to build; Increment 0 builds
it.

**Route to these guides:**

- **Infrastructure decisions →**
  [System Design Reference: Greenfield Infrastructure Planning](system-design/system-design-reference.md#greenfield-infrastructure-planning)
  — review the infrastructure plan that drives Increment 0 activities
- **CI/CD, environments, monitoring →**
  [Deployment Setup Guide: Greenfield Path](deployment/deployment-setup-guide.md#greenfield-path)
  — implement pipelines, provision environments, configure observability
- **Incident response, on-call, runbooks →**
  [Support Operations Guide: Greenfield Path](support/support-operations-guide.md#greenfield-path)
  — establish operational processes alongside infrastructure

**Completion signal:** A "hello world" application deploys successfully through
the full pipeline to production, monitoring captures its metrics, and on-call
processes are defined.

## Brownfield Increment 0 (Discovery)

Brownfield projects using AI assistance for the first time invest Increment 0 in
**discovering and documenting existing systems** so AI tools have the context
they need to be effective.

**Route to these guides:**

- **Existing architecture discovery →**
  [System Design Reference: First AI-Assisted Project (Discovery)](system-design/system-design-reference.md#first-ai-assisted-project-discovery)
  — document architecture, components, and data flows
- **Existing deployment infrastructure →**
  [Deployment Setup Guide: Brownfield Path](deployment/deployment-setup-guide.md#brownfield-path)
  — inventory environments, capture tribal knowledge, identify gaps
- **Existing operational processes →**
  [Support Operations Guide: Brownfield Path](support/support-operations-guide.md#brownfield-path)
  — document incident response, monitoring, and support workflows

**Completion signal:** Architecture, infrastructure, and operational processes
are documented in a structure (AGENTS.md, docs/) that AI tools can reference
effectively.

## How Increment 0 Flows Through Stages

Increment 0 uses the same iterative stages as feature increments — the
difference is focus (infrastructure instead of features):

| Stage                | Feature Increment            | Increment 0                                            |
| -------------------- | ---------------------------- | ------------------------------------------------------ |
| **Increment Design** | Plan feature scope and tasks | Plan infrastructure/discovery scope and tasks          |
| **Implementation**   | Build features               | Build pipelines, configure environments, write docs    |
| **Verification**     | Test features                | Validate pipeline, test deployments, verify monitoring |
| **Deployment**       | Deploy features to users     | Validate infrastructure with skeleton deployment       |

Design Increment 0 the same way you would design any increment — using the
[Increment Design](increment-design/README.md) stage artifacts to define scope,
break down tasks, and set acceptance criteria. The only difference is that the
acceptance criteria focus on infrastructure readiness rather than user-facing
functionality.

---

## Notes

**Last Updated:** 2026-02-19

Added to framework in v0.14.0.
