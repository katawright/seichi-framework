# Quick Start

Get from zero to your first stage in under 5 minutes.

---

## The Framework in 30 Seconds

Eight stages, three execution patterns:

| Stage            | What happens                                           |
| ---------------- | ------------------------------------------------------ |
| Initiation       | Define the problem, stakeholders, and success criteria |
| Requirements     | Capture what to build and how to verify it             |
| System Design    | Choose architecture, patterns, and tech stack          |
| Increment Design | Plan one increment's scope and approach                |
| Implementation   | Build the increment with AI assistance                 |
| Verification     | Test, review, and validate the increment               |
| Deployment       | Release to production                                  |
| Support          | Monitor, maintain, and feed back into future work      |

The first three stages run once per project. The next four repeat per increment
(epic, sprint, milestone — whatever your team calls a unit of deliverable work).
Support is continuous.

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

**Last Updated:** 2026-03-01

Added to framework in v0.26.0.
