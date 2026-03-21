# Quick Start

Get from zero to your first stage in under 5 minutes.

---

## The Framework in 30 Seconds

Eight stages across three execution patterns guide AI-assisted software delivery
from idea to production:

- **Foundational** (once per project): Initiation → Requirements → System Design
- **Iterative** (per increment): Increment Design → Implementation →
  Verification → Deployment
- **Continuous** (ongoing): Support

See the [README Stage Overview](README.md#stage-overview) for what happens at
each stage.

Scale the process to fit your project with three tiers: **Minimal** (MVPs,
prototypes), **Standard** (production apps), or **Enterprise** (regulated,
mission-critical). See the [Right-Sizing Guide](guides/right-sizing.md) for
details.

---

## Start in Under 5 Minutes

### Path A: AI Coding Agent (Claude Code, Cursor, etc.)

Point your agent at the framework and let it self-orient:

```text
Read [framework-path]/guides/agentic-workflow.md. Parse the front matter for
stage routing and working locations, then guide me through the Initiation
stage for my project: [describe your project in 1-2 sentences].
```

Replace `[framework-path]` with the path to your local clone of this framework
repository (e.g., `../ai-assisted-sdlc` or an absolute path). The agent will
read the stage routing table, determine the correct working location, check
required inputs, and walk you through the first stage interactively.

### Path B: Chat-Based AI (ChatGPT, Claude.ai, etc.)

1. Copy the bootstrap prompt from the
   [Manual Process Guide](guides/manual-process.md#bootstrap-prompt-template)
2. Fill in your project details and location context (~5 minutes)
3. Paste it into your AI chat and start working through the
   [Initiation stage](stages/initiation/README.md)

The bootstrap prompt includes location setup guidance so the AI understands
where framework, artifacts, and source code live.

### Path C: Joining a Project Mid-Stream

If your team is adopting the framework on a project already in progress:

Review the [stage lifecycle](guides/stages.md) to identify which stages apply,
then:

1. Identify where the project is in the stage lifecycle (which stages are
   already complete?)
2. Create lightweight retroactive artifacts for completed stages — a brief
   summary of decisions made and constraints in play, not full briefs
3. Pick up the framework at the current stage and follow it forward
4. Use the [Worked Example](guides/worked-example.md) to calibrate the expected
   detail level for artifacts

> **Key insight:** You don't need to go back and formally complete every prior
> stage. Document enough context for the current stage's inputs to be
> understood, then follow the framework forward.

> **Joining to operate an already-deployed system?** Start at the
> [Support Stage Guide](stages/support/README.md) and complete the
> [Support Readiness Checklist](stages/support/readiness-checklist.md).

> **Joining in a specific role?**
>
> - **Product Managers / Business Analysts:** Start with
>   [Initiation](stages/initiation/README.md) to build your business case (Path
>   B above shows the AI-assisted approach)
> - **Architects / Engineers:** Start with
>   [System Design](stages/system-design/README.md) for architecture work,
>   [Increment Design](stages/increment-design/README.md) for component specs
>   and test strategy, or
>   [Implementation](stages/implementation/README.md) for development
> - **Project Managers / Delivery Leads:** Start with the
>   [Delivery Operating Guide](guides/delivery-operating-guide.md) for
>   week-by-week operating rhythm
> - **DevOps / Platform Engineers:** Start with the
>   [DevOps Integration Guide](guides/devops-integration.md) or jump to
>   [Deployment Setup](stages/deployment/setup.md) +
>   [Pipeline Checklist](stages/deployment/pipeline-checklist.md)
> - **Support / Operations:** Start with the
>   [Support Readiness Checklist](stages/support/readiness-checklist.md) and
>   review the [Support Operations Guide](stages/support/operations.md)

### Minimum Viable Adoption

If you want the highest value for the least process, start with just three
artifacts at the Minimal tier:

1. **Initiation Brief** — forces problem-first thinking and prevents building
   the wrong thing
2. **Increment Design Brief** — gives engineers enough spec to implement without
   guessing
3. **Verification Checklist** — prevents shipping untested work

These three create a lightweight loop: define the problem, design the solution,
verify it works. Add more artifacts only when you feel the gaps.

> For projects deploying to production, add a **Deployment Brief**,
> **Rollback Procedure**, and **Support Brief** to this minimum set.

---

## What's Next

- [**README**](README.md) — full framework overview, governance model, and
  adoption guidance
- [**Right-Sizing Guide**](guides/right-sizing.md) — calibrate process weight to
  your project's risk and team size
- [**Worked Example**](guides/worked-example.md) — see what "done" looks like
  across all stages (greenfield)
- [**Brownfield Worked Example**](guides/worked-example-brownfield.md) — see
  preparation, exit checkpoint, and feature delivery for an existing codebase
- [**Delivery Operating Guide**](guides/delivery-operating-guide.md) —
  week-by-week operating rhythm for Sprint and Kanban delivery

---

## Notes

**Last Updated:** 2026-03-19

Added to framework in v0.26.0.
