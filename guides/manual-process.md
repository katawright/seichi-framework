---
id: manual-process
type: guide
concerns: [bootstrap-prompts, ai-tool-usage, session-management]
---

# Manual Process Guide

## Overview

Bootstrap prompt and step-by-step instructions for starting AI-assisted SDLC
sessions with any AI tool.

### Why a Manual Process Guide

> **Using an AI coding agent with filesystem access?** Agents like Claude Code
> or Cursor can read the framework files directly. Point your agent at
> [guides/agentic-workflow.md](agentic-workflow.md) instead — it provides
> structured metadata and routing for autonomous operation.

The framework documents explain what to do at each stage, but don't provide a
ready-to-use prompt for getting started with an AI assistant. This guide bridges
that gap with a copy-paste template and tool-specific adaptation tips.

### Purpose

- Provide a bootstrap prompt template for any AI tool
- Explain how to customize the prompt for your project and tooling
- Guide iterative, multi-session stage work
- Demonstrate stage progression with concrete examples

### Key Principle

Start simple, adapt freely — the bootstrap prompt is a starting point, not a
prescription.

### How to Use This Guide

1. [**Bootstrap Prompt Template**](#bootstrap-prompt-template) — copy the
   starting prompt
2. [**How to Use This Prompt**](#how-to-use-this-prompt) — customize and adapt
   for your tool
3. [**Example: Starting the Initiation Stage**](#example-starting-the-initiation-stage)
   — see a concrete usage
4. [**Progression Through Stages**](#progression-through-stages) — advance to
   subsequent stages

---

## Bootstrap Prompt Template

```
I'm using the AI-Assisted SDLC framework for a software project.

Please read these framework documents:
- guides/stages.md (stage definitions)
- guides/framework.md (key concepts)
- stages/[current-stage]/README.md (stage-specific guidance)

Help me work through the [STAGE NAME] stage for my project:

**Project context:**
- Description: [brief description of your project]
- Type: [greenfield / brownfield - first AI project / brownfield - has context]
- Tech stack: [if known, list key technologies]
- Team size: [solo/small (2-5)/large (6+)]
- Risk tier: [Minimal / Standard / Enterprise]
(See Right-Sizing Guide if unsure:
guides/right-sizing.md)

Guide me through the key activities for this stage, help me complete the
stage brief template, and validate against the checklist criteria. We may
need multiple sessions to complete this stage.
```

> **AI coding agents:** If your tool has filesystem access (Claude Code, Cursor,
> etc.), skip this prompt — point the agent at `guides/agentic-workflow.md`
> instead. It provides structured metadata and routing for autonomous operation.

---

## How to Use This Prompt

### Step 1: Customize for Your Project

Replace the bracketed placeholders with your project's specifics:

- **[STAGE NAME]:** Start with "Initiation" and progress through stages
- **[brief description]:** 1-2 sentences about what you're building
- **[Type]:** "greenfield" (new project), "brownfield - first AI project"
  (existing system, no AI context), or "brownfield - has context" (existing
  system with documented context)
- **[tech stack]:** Known technologies (or "to be determined")
- **[team size]:** Solo, small team, or large team

### Step 2: Adapt for Your AI Tool

**Claude Code / Cursor:**

These tools can read files directly from your filesystem. Simply provide the
file paths and the tool will read them.

```
I'm using the AI-Assisted SDLC framework for a software project.

Please read these framework documents:
- guides/stages.md
- guides/framework.md
- stages/initiation/README.md

[rest of prompt...]
```

> Use paths relative to your repository root. If your tool requires absolute
> paths, substitute your local root (e.g., `C:\your-repo\guides\stages.md`).

**ChatGPT / Claude.ai (Web-based):**

These tools cannot access your filesystem. You'll need to paste relevant
sections of the framework documents into your conversation, or provide links if
the documents are hosted online.

```
I'm using the AI-Assisted SDLC framework for a software project.

Here are the relevant framework concepts:

[Paste key sections from guides/stages.md and stage guide]

Help me work through the [STAGE NAME] stage for my project:
[rest of prompt...]
```

**GitHub Copilot:**

Copilot works best for implementation tasks with code in context. For earlier
stages (Initiation, Requirements, System Design), consider using ChatGPT or
Claude instead.

### Step 3: Work Iteratively

Important: **Stages are not completed in a single conversation.** Expect to:

- Have multiple sessions with your AI assistant per stage
- Iterate on your understanding and outputs
- Revisit and refine as new information emerges
- Move back and forth between draft and final versions

### Step 4: Use the Framework Artifacts

As you work through each stage:

1. **Read the stage guide** - Understand concepts and approach
2. **Complete the stage brief** - Fill out the template for your project
3. **Validate with checklist** - Ensure nothing critical is missed
4. **Progress to next stage** - Once exit criteria are met

### AI-Led Bootstrap Prompt

For teams operating at the AI-Led autonomy tier with an AI coding agent that has
filesystem access, use this streamlined prompt:

```
Read guides/agentic-workflow.md and orient yourself in the AI-Assisted SDLC
framework.

I need to work through the [STAGE NAME] stage for:
- Project: [brief description]
- Risk tier: [Minimal / Standard / Enterprise]
- Autonomy: AI-Led
- Oversight: [Active / Passive / Minimal]

Drive the stage activities autonomously. Flag assumptions, pause at gates
for my review, and maintain a session log.
```

This prompt relies on the agent reading the framework files directly — no need
to paste context. The agent will parse the structured front matter for stage
routing and follow the fallback protocols documented in the stage reference.

---

## Example: Starting the Initiation Stage

Here's a concrete example of the bootstrap prompt for a real project:

```
I'm using the AI-Assisted SDLC framework for a software project.

Please read these framework documents:
- guides/stages.md (stage definitions)
- guides/framework.md (key concepts)
- stages/initiation/README.md (Initiation stage guidance)

Help me work through the Initiation stage for my project:

**Project context:**
- Description: A web application for tracking employee onboarding tasks,
  ensuring new hires complete all required steps (paperwork, training,
  equipment setup) within their first 30 days.
- Type: greenfield
- Tech stack: To be determined (will decide during System Design stage)
- Team size: Small (3 engineers, 1 product manager)

Guide me through the key activities for this stage, help me complete the
initiation brief template, and validate against the checklist criteria. We
may need multiple sessions to complete this stage.
```

---

## Progression Through Stages

After completing Initiation, adapt the prompt for the next stage:

**For Requirements stage:**

```
I'm using the AI-Assisted SDLC framework for a software project.

Please read these framework documents:
- guides/stages.md
- guides/framework.md
- stages/requirements/README.md

I've completed the Initiation stage. Here's my initiation brief:

[Paste or reference your completed initiation brief]

Help me work through the Requirements stage, building on the foundation
established in Initiation.
```

Continue this pattern for each subsequent stage, always referencing completed
work from earlier stages to maintain continuity.

---

## Tips for Effective AI Collaboration

1. **Be specific about your context** - The more details you provide, the better
   your AI assistant can help
2. **Ask clarifying questions** - If the AI suggests something you don't
   understand, ask for explanation
3. **Challenge suggestions** - Your AI assistant may not know your constraints;
   push back when needed
4. **Iterate openly** - Tell your AI when something isn't working and ask for
   alternatives
5. **Reference framework concepts** - Use terms from the framework (e.g.,
   "MoSCoW prioritization," "acceptance criteria") to keep aligned
6. **Save your work** - Copy outputs into the appropriate brief templates and
   save them in your project
7. **Return with context** - When starting a new session, provide your AI with
   previous outputs to maintain continuity

---

## When You Need Multiple Sessions

You'll know you need multiple sessions when:

- **Scope is unclear** - Need to explore options before deciding
- **Stakeholder input needed** - Must gather information between sessions
- **Complex decisions required** - Need time to think through trade-offs
- **Work volume is large** - Can't complete all activities in one sitting
- **New information emerges** - Need to revise based on discoveries

This is normal and expected. The framework supports iterative work.

---

## Moving Beyond the Bootstrap

As you become familiar with the framework, you'll naturally adapt your prompts
to your specific needs:

- Asking more targeted questions based on your project
- Focusing on specific activities within a stage
- Creating your own prompt patterns that work for your workflow
- Developing shortcuts for common tasks

The bootstrap prompt is a **starting point**, not a prescription. Adapt it
freely.

---

## Getting Help

If you're stuck or unsure how to proceed:

1. **Review the stage guide** - Often contains answers to common questions
2. **Check the checklist** - Shows what you need to accomplish
3. **Ask your AI assistant** - "I'm stuck on [X], what are my options?"
4. **Consult guides/framework.md** - Explains cross-stage concepts
5. **Ask your team** - Collaborate with colleagues using the framework

---

## Notes

**Last Updated:** 2026-03-01

Added to framework in v0.9.0.
