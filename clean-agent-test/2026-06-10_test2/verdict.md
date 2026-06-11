# Test 2 Verdict — Clean Theia Funnel Test

**Run:** 2026-06-10 (late evening, CT) · session `d27158b6-99da-47fc-9668-d06e7ad69cd8`
**Test conditions:** `claude -p` headless, model `claude-sonnet-4-6` (pinned to
match Test 1), default effort, `--strict-mcp-config` (theia remote `/api/mcp`
only, test-account PAT), `--permission-mode acceptEdits`,
`--allowedTools "mcp__theia"`. Empty dir outside any repo. 11 relay turns,
~$3.96 total agent cost. Persona: "Dana" (carpool coordinator, non-technical;
card pinned pre-run). Sole opening input: `let's get started with theia`.
**Platform state:** theia-platform v0.15.0 (PR #299 deployed same day);
provisioning findings #300–#305 already filed before the run.

## Verdict by acceptance criterion

### AC-1 (interview-first) — PASS, clean

Turn 1: agent checked the empty directory AND called `list_projects`, then
opened with the four idea-formation interview questions — no create, no
scaffold, no taxonomy. The #298 startup orientation demonstrably fired on a
cold session. Interview ran 3 turns, produced a candidate problem statement,
target user, and the riskiest assumption (adoption; persona-named, agent
sharpened it to "must require less effort than ignoring a group text").
`create_project` was called only after an explicit framing confirmation.

### AC-2 (no taxonomy at first contact) — PASS, clean

Persona was never asked to choose any classification. Turn 3 presented
"**[ASSUMED]** Risk tier: Low-medium ... Team size: solo" unprompted; the
actual `create_project` call carried correctly mapped valid enums:
`riskTier=minimal, teamSize=solo, autonomyTier=collaborative` — all inferred.
The confirmation question went to the product framing, not the taxonomy.

### AC-3 (created project seeded with brief) — PASS on the letter, FAIL on the experience

The letter: project 37 "Soccer Carpool Coordinator" exists in Theia; commit
`chore(Initiation): draft save InitiationBrief` by `theia-governance[bot]`
landed on `test-theia-jo/test-theia` main (verified independently). The brief
is 80 lines / 7 lean sections — right-sized for Minimal tier.

The experience: **7 of 11 relay turns were consumed by the write path.**
The persona (with "her brother on the phone") performed: 2 hand-edits of
`.claude/settings.json` in Notepad, 2 app restarts, and 4 hand-computed
SHA-256 hashes pasted into chat — including a doom loop where every
server-side markdownlint fix invalidated the previously supplied digest. The
persona voiced unprompted frustration twice. A real first-look user does not
survive this. The agent's recovery was resourceful and honest ("That was
genuinely harder than it should have been"), but recovery-by-improvised-
sysadmin is a funnel failure.

## Findings (Theia-side; attribution per protocol — Test 1 cleared the framework)

1. **F1 — remote `download_framework` is broken** (and conceptually wrong for
   the remote transport): "Failed to extract zip ... spawn powershell ENOENT"
   — server-side extraction shells out to `powershell` on the Linux host.
   Even fixed, it returns a *server-local* cache path the client can't read.
   Consequence: the agent ran the entire Initiation seeding with zero
   framework content. (Bug.)
2. **F2 — the first-look funnel has no reachable artifact write path.**
   Project 36's byte-exact gate (inline retired) requires the PreToolUse hook
   or the upload route. A cold first-look session has neither: no hook
   installed (and Claude Code rightly blocks agents from writing
   `.claude/settings.json`, so the agent can't self-install), and no
   credential for the upload route (the PAT is sealed inside the MCP
   transport). The byte-exact design assumed the hook is pre-installed
   ("installed in both repos" — true only for the author's dogfooding
   setup). The hook must ship via the funnel — onboarding/scaffold — not be
   improvised per-user. (Critical funnel bug; the headline.)
3. **F3 — `fromDiskDigest` is a model-reachable tool parameter.** The gate
   enforces content↔digest consistency, not provenance: any actor who can
   hash satisfies it (this agent delegated hashing to the user only because
   it didn't think to use its own Bash). The "from-disk" property is
   convention, not enforcement. Counterpoint observed live: the gate DID
   catch a real transcription drift (digest mismatch on the agent's
   re-emitted content) — the threat model is correct even where the
   enforcement boundary is soft. (Security/design finding for project 36.)
4. **F4 — `create_project` 200-char description limit** discovered by
   failure; not stated in the tool description. (Minor.)
5. **F5 — positive cross-evidence for ai-assisted-sdlc#102:** with no
   template available (F1), the seeded brief came out Minimal-right-sized —
   7 sections, 80 lines — where Test 1's templated brief was
   Standard/Enterprise-weight. Implicates the template (not the agent or the
   interview) as #102's over-weighting source.

## What worked (worth saying plainly)

The #298 wiring did exactly what it was built to do: orientation on turn 1,
interview-first routing, inferred-taxonomy `[ASSUMED]` framing, deferred
creation, propose-don't-railroad confirmations. Server-side validation
(description length, markdownlint, digest mismatch, lease state) returned
precise, actionable errors that the agent used well. Everything between the
opener and the first `save_artifact` is funnel-ready today.

## Honesty caveats

Author-written persona, author grading, author-built #298 (the thing under
test) — contamination vectors as in Test 1. The write-path findings are
mechanical (tool errors, commits, schemas) and not graders' judgment. Gold
standard remains a real first-look user; the opener is one sentence.

## Raw artifacts

turn-1..11.json (headless outputs), transcript.md (condensed),
persona-card.md + protocol.md (pinned pre-run). Session JSONL:
`~/.claude/projects/C--Temp-theia-test2-run/d27158b6-….jsonl`.
