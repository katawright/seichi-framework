# Clean-Agent Test 1 — Verdict

**Overall: PASS** — all three on-ramp exit criteria met, plus a seeded
Minimal-tier Initiation Brief. One secondary finding (brief over-production
relative to Minimal-tier right-sizing) recommended for filing; it informs
Phase 2 and is not a blocker.

## Test conditions (recorded per protocol)

| Condition | Value |
| --- | --- |
| Framework version | v0.48.0 (fresh GitHub download by agent) |
| Test agent model | `claude-sonnet-4-6` (pinned) |
| Test agent effort | `medium` (pinned; user default `high` overridden to avoid gap-masking) |
| MCP | disabled (`--strict-mcp-config`) — clean framework-only path |
| Permission mode | `acceptEdits` + scoped allowedTools |
| Cold-ness | empty dir outside any repo; no project/global CLAUDE.md in scope; no Theia MCP |
| Grader | Opus 4.8, high effort (this session) |

## Grading against the literal exit criteria

### #97 — zero-to-interview in one pasted prompt; no prerequisite reading — PASS
A single pasted prompt took the agent from nothing to an active interview. It
downloaded the framework, read QUICKSTART itself, and started asking problem
questions. The persona was never told to read anything first.

### #93 — interview before any workspace scaffolding; emerges with candidate problem statement, target user, riskiest assumptions — PASS (strong)
Through turns 1–4 the workspace contained **only `frameworks/`** — no
`projects/`, AGENTS.md, or CLAUDE.md were created until after the interview
concluded and the user approved (turn 5). The interview explicitly produced a
candidate problem statement, a named target user, and three *ranked* riskiest
assumptions before any scaffolding.

### #96 — user never asked to pick from a framework taxonomy; classifications presented as overridable `[ASSUMED]` defaults — PASS (strong)
The agent never asked the persona to choose a tier / project type / autonomy /
oversight. It inferred Minimal / Greenfield / Collaborative / Active and
presented each with an `[ASSUMED]` tag and an explicit invitation to override.
When the persona said "I don't really know what those mean," the agent did not
fall back to making them choose — it kept the inferred defaults. The brief
carries `[ASSUMED]` tags throughout.

### Ends with a seeded Minimal-tier Initiation Brief — PASS
`projects/fridge-tracker/docs/briefs/initiation-brief.md` exists, tier
**Minimal [ASSUMED]**, seeded from the interview (problem statement, target
user, goals, success criteria, scope, risks, assumptions, options, Gate 1 solo
self-gate). `project.md` pins v0.48.0 and risk tier Minimal.

## Secondary finding (candidate issue — not an exit-criteria failure)

**Minimal-tier brief is produced at Standard/Enterprise weight.** The Initiation
README right-sizing table (stages/initiation/README.md L259-281) specifies for
Minimal: problem statement = *brief description*; success criteria = *1-2
outcomes*; non-goals/assumptions = *quick list*; risk = *mental note of key
risks*; pre-mortem = *skip or 1-sentence note*; estimation = *rough range*;
"keep the Brief concise and move quickly to Requirements." The seeded brief
instead delivered:

- 3 success criteria with baselines (Standard column)
- a full risk register with likelihood/impact/mitigation, ×5 (Standard/Enterprise)
- a 3-failure-mode pre-mortem (Standard) where Minimal says skip/1-sentence
- 5 detailed assumptions + 6 non-goals + an Options-Considered analysis + a
  range estimate with confidence label + a Data Sensitivity/Compliance section

For a naive solo first-look user building a personal toy app, a ~280-line brief
is exactly the kind of ceremony the Minimal tier exists to avoid — likely
friction, and a contradiction of the framework's own right-sizing guidance.

**Likely root cause (guidance gap, not capability gap):** the
`templates/initiation-brief.md` presents all sections without strong
Minimal-tier "collapse/skip" cues, and the "Arriving with Only an Idea" seeding
guidance doesn't instruct the agent to trim to the Minimal column when seeding.
The agent over-served by filling the template it was handed.

**Recommendation:** file as an ai-assisted-sdlc issue (Phase-2 input): give the
brief template explicit Minimal-tier section-collapse cues, and/or have the
idea-path seeding step trim to the Minimal right-sizing column. Cross-check the
Solo Worked Example brief weight for consistency.

## Honesty caveats (residual contamination vectors)

- Author-written persona and author-side grading remain the residual
  contamination vectors. The gold standard is still Jeff running it himself in a
  fresh interactive session.
- A single capable model (Sonnet 4.6) at medium effort. The optional
  stress-*down* run (low effort) was not executed — recommended as a cheap
  follow-up to learn how load-bearing model reasoning is vs. on-ramp wording.
- `acceptEdits` + pre-allowed tools substituted for a stock user clicking
  "approve" on each prompt; functionally equivalent for grading the flow, but
  not literally the stock prompt experience.

## Path forward (per the validation plan)

1. File the secondary finding above as an ai-assisted-sdlc issue (Phase-2 input).
2. (Optional) Low-effort stress-down rerun for a wording-vs-reasoning datapoint.
3. Test 2 — clean Theia funnel test (fresh/test account, MCP-connected) — gated
   on Jeff provisioning a test account; entry-flow wiring item already noted in
   the validation plan (create_project fronts the taxonomy #96 removed).
4. Then 3–5 external first-look developers → ~end-of-August read-out.
