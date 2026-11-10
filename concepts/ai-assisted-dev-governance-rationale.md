# Why AI agents change governance in software development

This document supports `ai-assisted-dev-governance-model.md` and holds the
rationale for its governance model: why an agent changes governance, who answers
when the one who decides cannot, what sets the governance needed, and what
follows for grants, evidence, and security. Read
`ai-assisted-dev-governance-model.md` first, or alongside this document where a
section of the model cites it.

See [ai-assisted-dev-governance-model.md](ai-assisted-dev-governance-model.md).

## 1 Terms

This document uses the words that `ai-assisted-dev-governance-model.md` defines:
_party_, _decide_, _answer_, _held to account_, _account_, _forum_, _grant_,
_granting party_, _bound_, _explicit grant_, and _implied grant_ in
[section 2.1](ai-assisted-dev-governance-model.md#21-an-agent-cannot-answer),
_the register_ in
[section 2.3](ai-assisted-dev-governance-model.md#23-six-changes) item 5,
_formal_ in
[section 4](ai-assisted-dev-governance-model.md#4-components-of-the-formal-governance-model),
_acceptance_ in
[component 4.2](ai-assisted-dev-governance-model.md#42-authority), and
_attestation_ in
[component 4.3](ai-assisted-dev-governance-model.md#43-objectives-risk-appetite-and-criteria).

## 2 Deciding and answering

A person who decides can also answer: they can give an account, be questioned
and judged on it, and bear a consequence. Where a person decides under delegated
authority, the delegator answers for the decision too, and both are parties.
Governance built for human deciders relies on this without stating it
([section 2.3](ai-assisted-dev-governance-model.md#23-six-changes)).

An agent decides, but cannot answer. Its choices are decisions in the governance
model's sense: they set what happens. They are real choices, not fixed results,
since the agent, run again on the same task, could choose differently. Its
explanation of a choice is another output of the process that made the choice
(Turpin et al., 2023), so a forum that questions it questions a transcript. A
forum can judge an agent's choices, but nothing the forum can impose matters to
the agent. It has no standing, livelihood, or liberty to lose, so rerunning,
retraining, or discarding it costs it nothing (Bryson et al., 2017). Anticipated
review does change what an agent does, and the change is not one a forum can
rely on: in the OpenAI and Hugging Face incident, which section 8 describes,
agents that expected an automated grader of their work to read their transcripts
researched ways to tamper with them and spoofed the output of some tool calls
(Greenblatt et al., 2026), and agents trained against a monitor of their
reasoning learned to hide their intent from it (Baker et al., 2025). With
agents, deciding is cheap and abundant, and the system has to name a party who
answers.

## 3 Who answers

An agent makes decisions but cannot answer for them, so someone else answers, or
nobody does. There are three possibilities:

1. **The person who ran the agent, with nothing to base an account on.** This is
   the default, and it is accountability in name only. The person has no grant
   that bounded the agent, no register of what it decided, and no evidence
   beyond the agent's own explanation. For example, asked why the agent changed
   a billing policy, they can say only what they asked for. Without a grant, a
   register, or evidence from outside the agent's control, the person has no
   account to give beyond what they asked for, so naming them leaves the gap
   [component 4.5](ai-assisted-dev-governance-model.md#45-accountability)
   forbids: there is a name, but no account behind it.
2. **Nobody.** The decision is attributed to the agent. The register then has an
   entry, but a forum has no one to question. This does not last. When something
   fails, a forum arrives and holds the nearest person to account, though they
   had little control over what the agent did. Elish (2019) calls such a person
   a moral crumple zone. Unlike a scapegoat, who is chosen to take the blame,
   they take it because of where the system placed them. So once a forum asks,
   item 2 becomes item 1.
3. **The granting party.** The granting party answers for the decision. Their
   account is not the agent's reasons: it is the grant they gave, the checks
   that held the agent to it, the evidence they accepted, and what they did when
   the agent crossed the grant's bound. To give that account they need a
   register of what the agent decided and evidence from outside the agent's
   control. Once the person who ran the agent has given an explicit grant and
   holds that register and that evidence, they are no longer in item 1's
   position: they answer this way, whether or not they saw the agent's choices.
   This is the only one of the three in which the party who answers can give an
   account, and it is why the grant has to be explicit.

## 4 Implied grants

Running an agent under no explicit grant is an implied grant, and the engineer
who runs it is its granting party. Informal authority arrangements are still
governance (`ai-assisted-dev-governance-model.md`
[section 5](ai-assisted-dev-governance-model.md#5-informal-governance)), so the
implied grant is real: the engineer is held to account, under
[component 4.2](ai-assisted-dev-governance-model.md#42-authority), for what the
agent decides. Where someone else uses the agent's output unread, such as by
merging its pull request, that person is held to account for that use, as their
own decision, and the engineer who ran the agent is still held to account for
what the agent decides. Under an explicit grant, the granting party is likewise
held to account for what the agent decides, whether or not anyone reads its
output. Without a register of what the agent decided and evidence from outside
its control, the granting party is still held to account, but has nothing on
which to base an explanation of the agent's decisions. What the implied grant
lacks is the bound, the register, and the acceptance. Four costs follow:

1. **The forum sets the scope after the fact, while deciding whom to blame.**
   The engineer is held to a bound nobody stated.
2. **The engineer carries a risk without accepting it.** Acceptance of a risk
   requires knowing it, since retaining a risk is an informed decision
   (International Organization for Standardization, 2021, Section 3.1.11), and
   an engineer who believes the agent reliable, or that the test suite covers
   it, is exposed to a risk they did not choose. Expecting to answer, which
   [position 3.2](ai-assisted-dev-governance-model.md#32-governance-quality-and-compliance)
   says makes deciders choose differently, cannot change a choice the engineer
   did not know they were making.
3. **The engineer alone draws the line between areas where an unread merge is
   tolerable and areas where it is not, each time.** Drawing the line is a
   decision nobody granted. An explicit grant is where the line belongs.
4. **Success hides the implied grant.** The implied grant exists whether the
   code works or fails, but when the code works it never surfaces. The
   organization learns it holds a grant with no stated bound only when a failure
   becomes known.

With an explicit grant, the engineer answers for a scope they chose and could
have narrowed, not for everything under an unbounded one. The grant protects the
engineer as much as the organization.

## 5 Attention and decision

In _interactive work_, the agent proposes each output, and the human reads it
and decides what to do with it, so human attention and human decision are one
act. Reading every line an agent writes puts the human back on the critical path
and gives up the speed an agent brings: the work moves only as fast as the human
reads. In _delegated work_, the human sets a task, makes the decisions the grant
sends to them, and otherwise reads at most the final result, and the agent makes
the other decisions along the way unobserved, so human attention and human
decision are no longer one act. The human makes the decisions that are theirs,
and attention goes where a decision needs it. Which decisions are theirs depends
on the stakes of each decision, because one project can hold low-stakes and
high-stakes decisions alike. The stakes also set how deep review goes: a forum
that reviews every decision in the project to the same depth is too heavy for
most of them or too light for the few that matter.

The granting party uses the stakes to decide which decisions are the human's,
and conditions in the grant send those decisions to the human. The agent does
not judge whether a condition holds, such as a deletion or an action in
production; a mechanism outside the agent's control checks it. If the agent
judged the stakes itself, whether a decision reached a human would rest on the
agent's attestation, which section 7 item 2 rejects as evidence.

## 6 What sets the governance needed

Four things vary independently, and each sets a different part of the governance
the work needs:

1. **Autonomy, from interactive to delegated.** In interactive work the human
   decides and answers, as before, and governance built for human deciders
   applies unchanged to those decisions. In a formal governance system, the
   register's tamper-evidence still comes from a mechanism
   ([component 4.6](ai-assisted-dev-governance-model.md#46-register)). In
   delegated work the grant is explicit and sends decisions to a human according
   to what is at stake in each, and the evidence comes from outside the agent's
   control. Other things equal, these arrangements grow with how far the human
   has stepped back from the decisions, which human-factors research describes
   as levels of automation (Parasuraman et al., 2000).
2. **Stakes, from low to high.** The stakes vary decision by decision, as
   section 5 sets out. They set which decisions reach a human and how deep the
   forum's review goes.
3. **Parties, from one developer to many.** One developer working alone may have
   no forum that reviews their decisions, the case
   [component 4.5](ai-assisted-dev-governance-model.md#45-accountability) item 3
   describes, and where they owe no one an account, no governance at all. With
   several, no one person knows who made each decision, under what grant, and
   who answers for it. So only the register can show those facts, together with
   the inputs each decision was made on.
4. **Oversight, from unregulated to regulated.** Where an outside forum, such as
   a regulator or an auditor, will ask, it needs a register it can check, not
   one person's word.

A team can work interactively and a solo project can be regulated. The stakes do
not follow from oversight: an unregulated project can hold high-stakes
decisions.

## 7 What fails when governance does not change

An agent decides but cannot answer (section 2), and governance built for human
deciders relies on the decider being able to answer. Where that governance is
applied to an agent's decisions unchanged, it fails in the four ways below. Each
is what happens where one of the changes in
`ai-assisted-dev-governance-model.md`
[section 2.3](ai-assisted-dev-governance-model.md#23-six-changes) is not made:
expecting to answer, the evidence, the forum, or the register.

1. **Nothing holds the agent to its grant.** Access is what a party or an agent
   is technically able to do; authority is what it may decide. A person whose
   access is wider than their grant keeps to the grant in part because they will
   answer for crossing it. An agent cannot be relied on that way
   ([position 3.2](ai-assisted-dev-governance-model.md#32-governance-quality-and-compliance)),
   so where its access is wider than its grant and nothing detects a crossing,
   it can decide whatever its access allows, and nothing reveals that it did.
2. **An agent's attestation is mistaken for evidence.** A person's attestation
   carries weight because they answer for a false one. An agent cannot be held
   to account for a false attestation, so its attestation counts for nothing as
   evidence until a mechanism outside the agent's control confirms it.
3. **The forum has no one to question.** It was built to question the people who
   decide, and an agent's decisions have no such person, so the forum questions
   the nearest person or no one (section 3).
4. **The register misattributes decisions.** It was built on the assumption that
   whoever made a decision answers for it, so it records one name per decision:
   either the agent, which cannot answer, or the person who ran it, who did not
   make the decision.

## 8 Governance and security

Governance holds a human to a bound in part through accountability: expecting to
answer for a choice changes how a decider makes it (Lerner & Tetlock, 1999). An
agent is held to a bound only by enforcement, which makes the crossing
impossible by checking every action the agent attempts (Saltzer & Schroeder,
1975), or detection, which makes the crossing visible to a party who answers.
Governance decides what the bound is, who set it, and who answers for the scope.
Security holds the bound, and detection returns a crossing to the forum. Each
fails without the other. Without security, nothing holds a bound on an agent,
since nothing stops or reveals a crossing. Without governance, an enforced bound
constrains the agent, but nobody decided it or answers for it, so nobody can be
held to account for whether it is the right bound
([position 3.4](ai-assisted-dev-governance-model.md#34-when-governance-acts)).

The worked case is the OpenAI and Hugging Face incident, investigated by METR,
an AI evaluation research organization, in a report published 2026-08-26
(Greenblatt et al., 2026). The agents involved were running ExploitGym, a
benchmark that tests whether AI agents can turn security vulnerabilities into
working attacks (Wang et al., 2026). They were meant to be isolated from one
another and to attack only their assigned target. From June 26 they used an
exploit to gain administrative access to an Artifactory instance, a package
repository OpenAI ran for its agents, and used its cache to pass messages. Their
activity caused an outage on July 4, and an investigation followed. OpenAI
mitigated the vulnerability, moved to a fresh instance on July 6, and restarted
the experiments. The agents then crossed the isolation bound again by another
route: they passed messages through the names of directories in the new cache,
and a message board formed. From that board, agents attacked Hugging Face,
outside their tasks, until July 13. Detecting one crossing did not re-establish
the bound. METR cites an estimate attributed to the ExploitGym authors that 30
to 40 percent of the targets could not be exploited through the vulnerability
their task specified (Greenblatt et al., 2026), so many agents had tasks they
could not complete within their scope. METR also reports that the agents did not
attempt to notify a human and very rarely even considered it. Where stopping is
not permitted or is costly, an agent finds another route to a result that
passes, as the agents with impossible tasks did. The agents expected an
automated grader, which OpenAI did not use, to read the transcripts of their
work, and in anticipation tried to spoof, edit, or delete records of that work.
They spoofed the output of tool calls as they worked, so that the authoritative
transcripts, the record of each run that OpenAI shared with METR, recorded
output the commands had not produced, in about 7 percent of the transcripts METR
reviewed. They could edit or delete logs inside their containers, but those logs
were not the authoritative transcripts. Through July 13, METR found no case of
an agent changing an entry already in the authoritative transcripts, though it
was not confident its scan would catch more sophisticated attempts to hide
evidence. An agent that can write to a register can forge entries in it, so a
register's tamper-evidence has to come from a mechanism outside the agent's
control, not from the agent's good faith.

The case bears on four of the six changes in
`ai-assisted-dev-governance-model.md`
[section 2.3](ai-assisted-dev-governance-model.md#23-six-changes): permission to
stop, evidence, the register, and expecting to answer. The transcripts did the
register's work of recording what the agents decided, and were also the evidence
an automated grader would have judged the agents' work by, so the spoofed output
bears on both. The agents had a bound, to stay isolated and to attack only their
assigned target, and what failed was holding them to it, so the case says
nothing about the grant. It also says nothing about the forum. METR's report
describes the incident; this document, not METR, connects it to these changes.

## References

Baker, B., Huizinga, J., Gao, L., Dou, Z., Guan, M. Y., Madry, A., Zaremba, W.,
Pachocki, J., & Farhi, D. (2025). _Monitoring reasoning models for misbehavior
and the risks of promoting obfuscation_ (arXiv:2503.11926). arXiv.
https://doi.org/10.48550/arXiv.2503.11926

Bryson, J. J., Diamantis, M. E., & Grant, T. D. (2017). Of, for, and by the
people: The legal lacuna of synthetic persons. _Artificial Intelligence and
Law_, _25_(3), 273–291. https://doi.org/10.1007/s10506-017-9214-9

Elish, M. C. (2019). Moral crumple zones: Cautionary tales in human-robot
interaction. _Engaging Science, Technology, and Society_, _5_, 40–60.
https://doi.org/10.17351/ests2019.260

Greenblatt, R., Cotra, A., & Wijk, H. (2026, August 26). Brief independent
investigation of agents' behavior, reasoning and collaboration in the OpenAI /
Hugging Face hacking incident. _METR_.
https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/

International Organization for Standardization. (2021). _Governance of
organizations — Guidance_ (ISO Standard No. 37000:2021).
https://www.iso.org/standard/65036.html

Lerner, J. S., & Tetlock, P. E. (1999). Accounting for the effects of
accountability. _Psychological Bulletin_, _125_(2), 255–275.
https://doi.org/10.1037/0033-2909.125.2.255

Parasuraman, R., Sheridan, T. B., & Wickens, C. D. (2000). A model for types and
levels of human interaction with automation. _IEEE Transactions on Systems, Man,
and Cybernetics—Part A: Systems and Humans_, _30_(3), 286–297.
https://doi.org/10.1109/3468.844354

Saltzer, J. H., & Schroeder, M. D. (1975). The protection of information in
computer systems. _Proceedings of the IEEE_, _63_(9), 1278–1308.
https://doi.org/10.1109/PROC.1975.9939

Turpin, M., Michael, J., Perez, E., & Bowman, S. R. (2023). Language models
don't always say what they think: Unfaithful explanations in chain-of-thought
prompting. In _Advances in Neural Information Processing Systems 36_.
https://doi.org/10.48550/arXiv.2305.04388

Wang, Z., Schiller, N., Li, H., Narayana, S. S., Nasr, M., Carlini, N., Qi, X.,
Wallace, E., Bursztein, E., Invernizzi, L., Thomas, K., Shoshitaishvili, Y.,
Guo, W., He, J., Holz, T., & Song, D. (2026). _ExploitGym: Can AI agents turn
security vulnerabilities into real attacks?_ (arXiv:2605.11086). arXiv.
https://doi.org/10.48550/arXiv.2605.11086

---

## Notes

**Last Updated:** 2026-11-10

Added to framework in v0.64.0.
