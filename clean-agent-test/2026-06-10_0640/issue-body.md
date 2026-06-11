## Summary

When the idea-path on-ramp seeds an Initiation Brief at **Minimal** tier, the
resulting brief is produced at **Standard/Enterprise weight**, contradicting the
framework's own right-sizing guidance. Surfaced by clean-agent Test 1 of the
on-ramp validation (released v0.48.0); the three on-ramp exit criteria
(#93/#96/#97) all passed — this is a distinct, secondary finding.

## What happened

A cold agent ran the verbatim QUICKSTART "I Only Have an Idea" prompt for a
naive solo user (personal fridge/food-waste app). It correctly inferred Minimal
tier and seeded `initiation-brief.md` as **Tier: Minimal [ASSUMED]** — then
filled out essentially every section of the full template:

- 3 success criteria with baselines
- a full risk register (5 risks with likelihood/impact/mitigation)
- a 3-failure-mode pre-mortem
- 5 detailed assumptions + 6 non-goals
- Options Considered analysis, range estimation with confidence label, and a
  Data Sensitivity/Compliance section

Result: a ~280-line brief for a personal toy app.

## Why it's a problem

`stages/initiation/README.md` (L259–281) right-sizing table specifies, for
**Minimal**:

| Practice | Minimal |
| --- | --- |
| Problem statement | Brief description of the need |
| Success criteria | 1-2 measurable outcomes |
| Non-goals/assumptions | Quick list |
| Risk assessment | Mental note of key risks |
| Pre-mortem | **Skip or 1-sentence risk note** |
| Estimation | Rough range |

…and closes with *"keep the Brief concise and move quickly to Requirements."*
The seeded brief lands in the Standard/Enterprise columns instead. For the
naive solo first-look user the on-ramp targets, this is exactly the ceremony
Minimal tier exists to avoid — likely adoption friction.

## Likely root cause (guidance gap, not capability gap)

- `templates/initiation-brief.md` presents all sections without strong
  Minimal-tier "collapse / skip" cues, so an agent handed the template fills it.
- The "Arriving with Only an Idea" seeding guidance doesn't instruct the agent
  to trim to the **Minimal** right-sizing column when seeding.

## Recommendation

- Add explicit Minimal-tier section-collapse cues to the brief template
  (which sections to skip / one-line at Minimal), and/or have the idea-path
  seeding step trim to the Minimal right-sizing column.
- Cross-check the Solo Worked Example brief weight for consistency with whatever
  Minimal collapse rule is chosen.

## Evidence

Full run archived in-repo at `clean-agent-test/2026-06-10_0640/`
(`verdict.md`, `transcript.md`, and the seeded brief under
`generated-workspace/`). Conditions: headless `claude -p`,
`claude-sonnet-4-6`, effort `medium`, MCP disabled, empty dir outside any repo.
