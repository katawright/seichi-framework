# Clean-Agent Test 1 — 2026-06-10

Archived run of the on-ramp validation plan's **Test 1** (framework-only,
clean-agent test) against released **v0.48.0**. See
[`project-onramp-validation-plan`](../../../) memory for the protocol.

## Verdict: PASS

All three on-ramp exit criteria met (#97 one-paste zero-to-interview, #93
interview-before-scaffolding, #96 no taxonomy pick / `[ASSUMED]` defaults) plus a
seeded Minimal-tier Initiation Brief. One secondary finding filed as an issue:
the Minimal-tier brief was produced at Standard/Enterprise weight.

## Contents

- `verdict.md` — full grading, test conditions, finding, caveats.
- `transcript.md` — turn-by-turn transcript (user/persona ↔ agent).
- `persona-card.md` — persona + answer bank, authored **before** launch.
- `prompt-1-initial.txt`, `answer-*.txt` — exact inputs relayed to the agent.
- `turn-*.json` — raw headless `claude -p --output-format json` results.
- `generated-workspace/` — the artifacts the cold agent produced (AGENTS.md,
  CLAUDE.md, projects/, the seeded Initiation Brief, the agent's own memory/).

> **Excluded:** the agent also downloaded `frameworks/v0.48.0/` (a verbatim copy
> of the v0.48.0 release) into its workspace. That redundant copy is omitted here
> to keep the repo lean — it is reproducible from the release tag.

## Run conditions

Cold headless `claude -p`, model `claude-sonnet-4-6`, effort `medium`,
`--strict-mcp-config` (no MCP), `--permission-mode acceptEdits` + scoped
allowedTools, cwd = an empty dir outside any repo. Session
`f6fededd-81bb-4015-86f9-3156f7d17173`. No permission denials.
