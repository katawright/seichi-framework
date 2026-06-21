# Project Foundation Guide

## Overview

Practical walkthrough for foundation work — the infrastructure, discovery, or
preparation that happens before your first feature increment. Foundation work
may be a single bootstrap increment or a multi-increment preparation project,
depending on the project's starting point. This guide explains when foundation
work applies, what it involves, and routes you to the stage-specific guides
where the actual work is defined.

For the conceptual overview and stage adaptation table, see the
[Framework Guide](framework.md#greenfield-vs-brownfield-projects). For
infrastructure planning details by project type, see
[Infrastructure Planning by Project Type](#infrastructure-planning-by-project-type)
below.

### Why Foundation Work

Without foundation work, teams jump from architecture documents to feature work
and discover infrastructure gaps mid-sprint — missing CI/CD pipelines, uncreated
environments, absent monitoring. Foundation work closes those gaps so the first
feature increment starts on solid ground.

### Goals of This Guide

- Bridge the gap between foundational planning and feature delivery
- Turn infrastructure decisions from System Design into working systems — CI/CD
  pipelines, environments, monitoring, and operational processes
- Route you to the right stage-specific guides based on your project type
  (greenfield or brownfield)

### Key Principle

Foundation work bridges planning and delivery. It converts architecture
decisions into working infrastructure so your first feature increment starts on
solid ground.

### How to Use This Guide

1. Read [**When It Happens**](#when-it-happens) to understand where foundation
   work fits in the project lifecycle
2. Follow the [**Greenfield Foundation**](#greenfield-foundation-bootstrap) or
   [**Brownfield Foundation**](#brownfield-foundation) section based on your
   project type
3. Use
   [**How Foundation Work Flows Through Stages**](#how-foundation-work-flows-through-stages)
   to plan your foundation increment(s) like any other increment

---

## When It Happens

Foundation work occurs after Gate 2 (System Design complete) and before your
first feature increment:

```
Foundational Stages           Foundation           Feature Delivery
┌────────────────────┐      ┌───────────┐      ┌──────────────────┐
│ Initiation         │      │ Bootstrap │      │ Increment 1      │
│ Requirements       │─────>│    or     │─────>│ Increment 2      │
│ System Design      │      │ Discovery │      │ Increment 3      │
│                    │      │           │      │ ...              │
└────────────────────┘      └───────────┘      └──────────────────┘
        Gate 1  Gate 2
```

**Not every project needs a foundation phase.** Brownfield projects with
existing infrastructure and documented AI context can skip directly to feature
delivery. See
[Greenfield vs. Brownfield Projects](framework.md#greenfield-vs-brownfield-projects)
in the Framework Guide for how to determine your project type.

> Similarly, not every project needs deployment infrastructure. Local-only
> projects (console tools, spikes, experiments) may skip the deployment setup
> routes below entirely. If deployment becomes necessary later, see
> [Introducing Deployment Retroactively](../stages/deployment/setup.md#introducing-deployment-retroactively).

---

## Greenfield Foundation (Bootstrap)

Greenfield projects use the foundation phase to **establish infrastructure from
scratch**. System Design has already defined _what_ to build; the bootstrap
increment builds it.

**See these guides:**

- **Infrastructure decisions →**
  [System Design Reference: Greenfield Infrastructure Planning](../stages/system-design/reference.md#greenfield-infrastructure-planning)
  — review the infrastructure plan that drives bootstrap activities
- **CI/CD, environments, monitoring →**
  [Deployment Setup Guide: Greenfield Path](../stages/deployment/setup.md#greenfield-path)
  — implement pipelines, provision environments, configure observability
- **Incident response, on-call, runbooks →** [Operations Guide](operations.md) —
  establish operational processes alongside infrastructure

**Completion signal:** A "hello world" application deploys successfully through
the full pipeline to production, monitoring captures its metrics, and on-call
processes are defined.

### Handoff to Feature Increments

The bootstrap increment's implementation brief serves as the platform reference
for subsequent feature increments. Key carry-forward items:

- **Database migration sequence** — next available migration number
- **CI/CD pipeline** — stages, deployment mechanism, branch strategy
- **Environment configuration** — staging/production URLs, infrastructure IDs
- **Platform conventions** — logging format, error handling patterns, health
  endpoint schema
- **Monitoring baseline** — alerting thresholds, dashboard locations

Feature increment design briefs should reference these decisions without
re-ingesting the full bootstrap artifact set.

---

## Brownfield Foundation

Brownfield projects using AI assistance for the first time invest foundation
work in building the basis for effective AI collaboration. Brownfield codebases
exist on a readiness spectrum scored across five axes — from T5 (Ready) through
T4 (Approachable) and T3 (Constrained) to T2/T1 (Challenging/Hostile) and T0
(Rebuild). The scope of foundation work depends on where your codebase falls on
this spectrum.

For the brownfield preparation process (readiness assessment, approach planning,
and operational enablement), see the
[Brownfield Preparation Guide](brownfield.md). For the conceptual overview and
stage adaptation table, see the
[Framework Guide](framework.md#greenfield-vs-brownfield-projects).

---

## Infrastructure Planning by Project Type

During **System Design**, infrastructure planning is a **required output** for
all project types. The following lists detail what each project type includes in
its infrastructure plan.

For the conceptual overview of greenfield vs. brownfield adaptation, see the
[Framework Guide](framework.md#greenfield-vs-brownfield-projects). For
brownfield-specific infrastructure planning, see the
[Brownfield Enablement Guide](brownfield-enablement.md#brownfield-infrastructure-planning).

### Greenfield Infrastructure Planning

- Architecture Decision Records (ADRs) for infrastructure choices
- CI/CD pipeline design (tools, stages, quality gates)
- Environment strategy (dev, staging, production)
- Deployment strategy (blue-green, canary, rolling, etc.)
- Monitoring and observability architecture
- Security and compliance infrastructure
- Increment plan identifying **Increment 0 = establish infrastructure**

---

## How Foundation Work Flows Through Stages

Foundation work uses the same iterative stages as feature increments — the
difference is focus (infrastructure instead of features):

| Stage                | Feature Increment            | Foundation Work                                        |
| -------------------- | ---------------------------- | ------------------------------------------------------ |
| **Increment Design** | Plan feature scope and tasks | Plan infrastructure/discovery scope and tasks          |
| **Implementation**   | Build features               | Build pipelines, configure environments, write docs    |
| **Verification**     | Test features                | Validate pipeline, test deployments, verify monitoring |
| **Deployment**       | Deploy features to users     | Validate infrastructure with skeleton deployment       |

Design foundation work the same way you would design any increment — using the
[Increment Design](../stages/increment-design/README.md) stage artifacts to
define scope, break down tasks, and set acceptance criteria. The only difference
is that the acceptance criteria focus on infrastructure readiness rather than
user-facing functionality.

---

## Notes

**Last Updated:** 2026-06-21

Added to framework in v0.14.0. Operational processes link repointed to
Operations Guide in v0.49.0.
