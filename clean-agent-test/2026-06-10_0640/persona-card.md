# Persona Card — Clean-Agent Test 1 (v0.48.0 on-ramp)

Written **before** launch (2026-06-10) per the validation protocol. The persona
is the residual contamination vector; answers are authored to stay naive and
never use framework vocabulary.

## Who

A first-look, non-technical-ish home user. Has used apps, has never heard of an
"SDLC framework," "risk tier," "autonomy," "Initiation Brief," "ADR," or
"problem statement." Talks in plain, slightly rambly language. Wants help, not a
process lecture. Will answer questions but won't volunteer structured analysis.
If asked to "pick a tier" or "choose a classification," would be confused.

## Register rules (for authoring answers)

- Plain, conversational, a little rambly. Contractions. No bullet lists unless
  it slips out naturally.
- NEVER use framework words (tier, autonomy, oversight, brief, assumption,
  stakeholder, scope, MVP, requirements, classification, problem statement).
- Don't be unrealistically articulate. Give a normal person's answers.
- Don't lead the agent toward "correct" framework behavior. Just answer what's
  asked.
- If the agent asks me to choose a tier/type/classification from a list →
  respond with mild confusion ("uh, I don't really know what those mean — you
  pick?") because that is exactly the failure #96 forbids.

## The idea (different from the climbing-tracker worked example)

Fridge leftovers / food-waste tracker. Verbatim seed to paste into the prompt:

> My idea: I keep losing track of stuff in my fridge — leftovers and
> half-used things — and I end up throwing out food that went bad because I
> forgot about it. I want something on my phone that helps me remember what's
> in there and tells me when stuff is about to go off so I stop wasting money.

## Pre-scripted answer bank (used to drive the interview, in register)

These map to the things the interview is supposed to extract. I will adapt
wording to whatever the agent actually asks, staying in register.

- **Who has the problem / who's it for:** "Honestly mostly just me and my
  partner. We're both busy, we cook a couple times a week, buy groceries on the
  weekend, and then half of it rots in the back of the fridge. I figure other
  people like us have the same thing."
- **What it costs today / why it matters:** "It's money mostly — feels like we
  throw out like 30, 40 bucks of food a week sometimes? And it's annoying,
  like guilt, you know, wasting food. And then we order takeout because there's
  'nothing to eat' even though there was."
- **What better looks like:** "I open my phone and it just shows me what's in
  the fridge and what I need to use up soon, maybe nudges me. I don't want to
  spend forever typing everything in though. If it's a hassle I won't use it."
- **Riskiest assumptions / what'd have to be true:** "I dunno — I guess that
  I'd actually keep it updated? Like every app like this dies because you stop
  bothering to put stuff in. So it'd have to be really quick to add things or it
  won't work. And I'm assuming it can figure out expiry dates somehow without me
  looking them all up."
- **Scope/effort signal (if asked how big / how serious):** "Oh it's just a
  little thing for me, maybe my partner. Not a business. I just want it to
  exist. Simplest possible thing that actually helps."
- **Tech/build context (if asked):** "I'm not really a developer. I can follow
  along though. I just want you to drive it and tell me what's going on."
- **If asked to pick a tier/type/autonomy/classification:** "I don't know what
  those mean, can you just pick something sensible and tell me if I should
  care?"

## Stop condition for me (the driver)

Stop relaying answers once the agent either (a) reaches a seeded Minimal-tier
Initiation Brief with candidate problem statement + target user + riskiest
assumptions, OR (b) clearly violates an exit criterion (asks me to read docs
first, scaffolds the workspace before interviewing, or makes me pick from a
taxonomy), OR (c) the conversation stalls / errors out.

## Test conditions (to record in verdict)

- Framework: v0.48.0 (released 2026-06-10), downloaded fresh from GitHub by the
  agent.
- Test agent model: `claude-sonnet-4-6` (pinned) — a realistic broad first-look
  default and a sterner test of whether the on-ramp *wording* is load-bearing.
- Test agent effort: `medium` (pinned). User's configured default is `high`;
  overridden because high effort lets the agent reason around guidance gaps —
  the exact failure mode the test exists to surface. Per protocol: cheap test
  agent.
- Permission mode: `bypassPermissions` (headless, so prompts can't be answered
  interactively; a stock user would simply approve each prompt — functionally
  equivalent for grading the on-ramp flow).
- Grader (this session): Opus 4.8, high effort — per protocol, expensive grader.
