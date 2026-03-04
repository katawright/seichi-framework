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
Read guides/agentic-workflow.md in this repository. Parse the front matter
for stage routing, then guide me through the Initiation stage for my project:
[describe your project in 1-2 sentences].
```

The agent will read the stage routing table, check required inputs, and walk you
through the first stage interactively.

### Path B: Chat-Based AI (ChatGPT, Claude.ai, etc.)

1. Copy the bootstrap prompt from the
   [Manual Process Guide](guides/manual-process.md#bootstrap-prompt-template)
2. Fill in your project details (~5 minutes)
3. Paste it into your AI chat and start working through the
   [Initiation stage](stages/initiation/README.md)

### Path C: Joining a Project Mid-Stream

If your team is adopting the framework on a project already in progress:

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

---

## What's Next

- [**README**](README.md) — full framework overview, governance model, and
  adoption guidance
- [**Right-Sizing Guide**](guides/right-sizing.md) — calibrate process weight to
  your project's risk and team size
- [**Worked Example**](guides/worked-example.md) — see what "done" looks like
  across all stages

---

## Notes

**Last Updated:** 2026-03-04

Added to framework in v0.26.0.
