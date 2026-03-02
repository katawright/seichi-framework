# Simulation Plan

Design for agent and team simulations to validate the framework under realistic
conditions. Execute after review issues from the evaluation rubric are
addressed.

## Agent Simulation

Test whether an AI coding agent can follow the framework autonomously.

### Scenario 1: Greenfield Initiation

**Setup:** An AI coding agent is dropped into the repository with no prior
context and given:

```
Read guides/agentic-workflow.md and orient yourself in the AI-Assisted SDLC
framework.

Work through the Initiation stage for:
- Project: Employee onboarding task tracker
- Risk tier: Standard
- Autonomy: Collaborative

Produce a completed initiation brief using the template.
Validate against the checklist.
```

**Evaluate:**

- Did the agent find and parse `guides/agentic-workflow.md` front matter?
- Did it correctly route to `stages/initiation/README.md`?
- Did it read the checklist and reference (if any)?
- Did it use `templates/initiation-brief.md` as the artifact template?
- Does the produced brief pass the initiation checklist?
- Did the agent pause at Gate 1 for human review?
- Did the agent flag any missing inputs as `[ASSUMED]`?

**Success criteria:** The agent produces a checklist-passing initiation brief
without human intervention (except at the gate).

### Scenario 2: Brownfield Increment Cycle

**Setup:** An AI coding agent is given a pre-populated project context
(completed initiation brief, requirements brief, and system design brief) and
asked to:

```
Read guides/agentic-workflow.md and orient yourself.

The project has completed Initiation, Requirements, and System Design.
[Attach completed briefs or point to files.]

Work through Increment Design for Increment 1, then Implementation,
then Verification. Produce all stage briefs and validate against checklists.
Risk tier: Standard. Autonomy: AI-Led.
```

**Evaluate:**

- Did the agent correctly identify the iterative stage sequence?
- Did it carry forward inputs from prior stages (traceability)?
- Did it produce increment design brief, implementation brief, and verification
  brief?
- Did each brief pass its respective checklist?
- Did the agent pause at gates (Design Review, PR Review + CI, Test Coverage
  Review)?
- Did the agent use session logs for multi-session work?

**Success criteria:** The agent produces three checklist-passing briefs with
full traceability from requirements through verification.

### Execution Model

- Run each scenario with at least 2 different AI tools (e.g., Claude Code and
  Cursor) to test tool-agnosticism
- Record agent behavior in a session log
- Note any points where the agent got stuck, misrouted, or produced non-
  compliant artifacts
- Capture the agent's interpretation of front matter and routing decisions

---

## Team Simulation

Test whether a cross-functional team can follow the framework for a real (small)
project.

### Setup

- **Team:** 2-3 engineers, 1 PM/BA, 1 observer (evaluator)
- **Project:** A small internal tool (e.g., team standup tracker, meeting notes
  organizer) — real enough to exercise the framework, small enough to complete
  in 2-3 sessions
- **Risk tier:** Minimal
- **Duration:** 2-3 half-day sessions over 1-2 weeks

### Session Plan

**Session 1: Initiation + Requirements (3 hours)**

- PM/BA leads Initiation with AI assistance
- Team collaborates on Requirements
- Observer notes: Where do people get stuck? What questions arise? Where does
  the framework not provide enough guidance?

**Session 2: System Design + Increment Design (3 hours)**

- Engineers lead System Design with AI assistance
- Team plans Increment 1
- Observer notes: Do engineers find the framework helpful or bureaucratic? Where
  do templates help vs. hinder?

**Session 3: Implementation + Verification + Deployment (3 hours)**

- Engineers implement Increment 1 with AI assistance
- Team runs verification
- Team completes deployment brief (even if not actually deploying)
- Observer notes: Does the measurement throughline work end-to-end? Can the team
  trace from goals to deployed code?

### Evaluation Criteria

- **Time to productivity:** How long before the team felt productive with the
  framework?
- **Framework overhead:** What percentage of time was spent on framework
  activities vs. actual project work?
- **Completeness:** Did the team produce all expected artifacts?
- **Quality:** Do artifacts pass their respective checklists?
- **Traceability:** Can you trace from Initiation goals through to deployment?
- **Pain points:** What caused the most frustration or confusion?
- **Adoption signal:** Would the team use this framework again?

### Deliverables

- Observer notes (per session)
- Completed project artifacts (all stage briefs)
- Team retrospective (using `templates/retrospective.md`)
- Summary evaluation against criteria above

---

## Sequencing

1. Address review findings from rubric evaluation first
2. Run agent simulation (Scenarios 1 and 2)
3. Address agent simulation findings
4. Run team simulation
5. Address team simulation findings
6. Final readiness assessment for broader testing
