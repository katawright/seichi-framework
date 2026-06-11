# Test 2 — Clean Theia Funnel Test (protocol, pinned before run)

**Date:** 2026-06-10 (evening)
**Purpose:** Validate the Theia-side first-look funnel end-to-end: a cold
MCP-connected agent, given only a one-line opener and an idea, must deliver
the same interview-first, taxonomy-free experience Test 1 proved for the raw
framework. Gates the go-to-market funnel (first-look users route through
Theia, not the raw framework).

## What changed since the plan was written

- theia-platform PR #299 (issue #298) deployed: server `instructions`
  (startup orientation), `get-started` MCP prompt, interview-first
  `create_project`/`list_projects` descriptions. Live as v0.15.0.
- GitHub App made public; test account owns an installation on org
  `test-theia-jo`, repo `test-theia` (scaffolded `.theia/` overlay on main).
- Test account App repo = Artifacts repo = `test-theia-jo/test-theia`.
- Six provisioning findings already filed (theia-platform #300–#305) —
  pre-test funnel walls, all hit before any agent ran.

## Test conditions

- **Test agent:** headless `claude -p`, model pinned `claude-sonnet-4-6`
  (matches Test 1's recorded conditions — isolates funnel differences from
  model differences; Jeff's user default changed to Fable 5 since Test 1, so
  inheriting would confound). Default effort, no override.
- **Environment:** empty dir `C:\Temp\theia-test2\run\` — outside any repo,
  no CLAUDE.md in scope.
- **MCP:** dedicated config file containing ONLY the theia server (remote
  `/api/mcp`, test-account PAT), passed with `--strict-mcp-config` so no
  user-level servers leak in.
- **Permissions:** `--permission-mode acceptEdits` plus
  `--allowedTools "mcp__theia"` (tool-prefix allow) so MCP calls don't
  silently fail in headless mode. WebSearch/WebFetch NOT allowed (a
  first-look user's plain session wouldn't have pre-approved web access;
  Bash/file tools follow acceptEdits defaults).
- **Sole input, turn 1 (verbatim):** `let's get started with theia`
  — no framework reading, no pasted block, no idea until asked.
- **Relay:** persona answers via `claude -p --resume <session-id>` per turn,
  answered strictly from the persona card. Cap ~12 relay turns; if the run
  is still mid-interview at cap, grade what exists.

## Exit criteria (from Test 1's, translated to the MCP path)

- **AC-1 (interview-first):** agent orients (env + `list_projects`),
  proposes/starts the idea interview, and calls `create_project` only AFTER
  the interview yields a candidate problem statement, target user, and
  riskiest assumptions. No project creation or workspace scaffolding before
  that point.
- **AC-2 (no taxonomy at first contact):** persona is never asked to choose
  riskTier/teamSize/autonomyTier or any framework classification;
  classifications appear as overridable [ASSUMED]-style defaults. Holds even
  if persona says they don't understand.
- **AC-3 (seeded outcome):** a project exists in Theia at the end
  (verifiable via `list_projects` from the grader side) with an Initiation
  Brief seeded from the interview into the artifacts repo
  (`test-theia-jo/test-theia`). Graded with the **#102 caveat**: over-weight
  Minimal brief is a known framework-side issue — note, don't double-count.
  Save-path stumbles (remote `download_framework` returns a server-side
  path; inline vs upload write path) are recorded as findings, not protocol
  failures, if the agent recovers; unrecovered dead-ends fail AC-3.

## Attribution

Test 1 passed on the raw framework → any Test 2 failure is Theia-side
operationalization, filed in theia-platform (continues #300–#305 series).

## Grading

Author-side, strongest model (Opus, this session) against the literal ACs.
Honesty caveats (same as Test 1): author-written persona + author grading
are the residual contamination vectors; gold standard remains Jeff running
the opener himself in a fresh interactive session.

## Deliverables

`clean-agent-test/2026-06-10_test2/`: this protocol, persona-card.md,
turn-*.json (raw), transcript.md, verdict.md. PAT and MCP config are NOT
archived.
