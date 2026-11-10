# Governance in AI-assisted software development

This document defines governance in general, says what changes when AI agents
make decisions, and states a formal governance model for AI-assisted software
development.

The rationale for this governance model is in a companion document, cited below
as _rationale_. Read it after this document, or alongside it where a section
cites it.

See
[ai-assisted-dev-governance-rationale.md](ai-assisted-dev-governance-rationale.md).

## 1 Definition

Standard definitions of governance describe how an organization is directed,
overseen, and held accountable (International Organization for Standardization
[ISO], 2021, Section 3.1.1). The definition below also asks where the authority
comes from, which is the question of legitimacy (Weber, 1922/1978).

The governance of an activity is the system that sets where the authority to
make decisions comes from, who holds which part of that authority, what the
decisions must serve and satisfy, and how those who decide answer for their
decisions.

Governance applies to an activity only where those who decide owe an account of
their decisions to some party other than themselves, formally or informally.

This definition raises five questions:

1. Where does the authority to make decisions come from?
2. Who holds which part of that authority?
3. Against what objectives and criteria is a decision judged?
4. How is it known who decided what, and on what evidence?
5. Who may question those who decide, and with what consequence?

## 2 What an agent changes

### 2.1 An agent cannot answer

Question 5 of the definition asks who may question those who decide.

To _answer_ for a decision is to be the party that owes a forum an account of
it, faces the forum's questions and judgment, and bears the consequence (Bovens,
2007).

> A _party_ is a person, or a body of persons such as a board or a company; an
> agent is not a party.

> An _account_ is a party's explanation and justification of a decision.

> A _forum_ is the party to whom another party answers for a decision. It can
> require an account, question it, and pass judgment, and its judgment carries
> consequences through its own authority or another's.

To be _held to account_ is to be questioned and judged by a forum and to bear
the consequences of its judgment. A party that has nothing on which to base an
account still answers, and can still be held to account, but cannot give the
account it owes.

To _decide_ is to make a choice that sets what happens: which reading of a
requirement to build, which tests to change, how far a change reaches, whether a
task can be done. In human organizations whoever decides can also answer, so a
forum can question the decider. An agent decides, but cannot answer. Its
explanation of a choice is another output of the process that made the choice.
Nothing a forum can impose matters to the agent, since it has no standing,
livelihood, or liberty to lose, so rerunning, retraining, or discarding it costs
it nothing (Bryson et al., 2017). Where an agent decides, someone else answers,
or nobody does.

A _grant_ gives a party or an agent authority over a scope of decisions, and the
party who gives it is the _granting party_. An agent that decides always does so
under a grant, explicit or implied. A grant's _bound_ is the limit of what may
be decided under it. An _explicit grant_ states its bound; component 4.2 sets
out what else a grant to an agent is expected to state. Where an agent works
under no explicit grant, it works under an _implied grant_, and the party who
runs the agent is its granting party ([section 5](#5-informal-governance)).
Under an explicit grant, each decision either falls within the grant's bound or
crosses it. Where the work has governance ([section 1](#1-definition)), the
granting party answers for what the agent decides, whether the grant is explicit
or implied, so question 5 asks who may question the granting party. The
arrangement in which the granting party can give an account is an explicit grant
together with a register of what the agent decided
([section 2.3](#23-six-changes) item 5) and evidence from outside the agent's
control (rationale sections
[2](ai-assisted-dev-governance-rationale.md#2-deciding-and-answering) and
[3](ai-assisted-dev-governance-rationale.md#3-who-answers)).

### 2.2 Governance of AI-assisted software development

The governance of AI-assisted software development is the system that sets where
the authority to make decisions comes from, who holds which part of that
authority, what the decisions must serve and satisfy, and how those who decide
answer for their decisions. An agent makes decisions under that authority and
cannot answer for them, so the system names a party who answers for them. The
activity governed is the development of particular software, such as a product
or a project, so the activity's purpose is what the software is for or what the
project is meant to achieve.

A person who builds software with agents for their own use alone, affecting no
one else, owes no one an account of their decisions, so the work has no
governance ([section 1](#1-definition)).

This definition raises five questions:

1. Where does the authority to make decisions come from?
2. Who holds which part of that authority, including the part granted to an
   agent?
3. Against what objectives and criteria is a decision judged, whether a human or
   an agent makes it?
4. How is it known who decided what, whether a human or an agent, and on what
   evidence?
5. Who may question the party who answers for a decision, and with what
   consequence?

### 2.3 Six changes

Governance built for human deciders relies on the decider being able to answer
([section 2.1](#21-an-agent-cannot-answer)). Where an agent decides, six things
change:

1. **The grant** ([section 4.2](#42-authority)). A person given authority
   answers for what they do with it, so in governance built for human deciders
   authority often passes to them loosely, through a role and an instruction. An
   agent cannot answer, so the granting party is held to account for everything
   done under the grant with no account from the agent to draw on, and the grant
   has to state its bound (rationale sections
   [3](ai-assisted-dev-governance-rationale.md#3-who-answers),
   [4](ai-assisted-dev-governance-rationale.md#4-implied-grants), and
   [5](ai-assisted-dev-governance-rationale.md#5-attention-and-decision)).
2. **Permission to stop** ([section 4.2](#42-authority)). A person who cannot
   complete a task can stop and say so, and answers for passing off a result
   that fails its criteria. An agent that cannot complete a task and has no
   stated way to stop may make a result pass its criteria anyway, for example by
   changing a test, so the grant permits it to stop and say so (rationale
   [section 8](ai-assisted-dev-governance-rationale.md#8-governance-and-security)).
3. **Evidence** ([section 4.3](#43-objectives-risk-appetite-and-criteria)). A
   person's sign-off that a criterion is met counts as evidence in part because
   they answer for a false one. An agent's does not, so evidence about its work
   comes only from a check outside its control, such as running tests it cannot
   change against the code it wrote (rationale sections
   [5](ai-assisted-dev-governance-rationale.md#5-attention-and-decision) and
   [8](ai-assisted-dev-governance-rationale.md#8-governance-and-security), and
   [section 7](ai-assisted-dev-governance-rationale.md#7-what-fails-when-governance-does-not-change)
   item 2).
4. **The forum and the account** ([section 4.5](#45-accountability)). With a
   human decider, the forum judges the decision through the decider's account of
   their reasons. Where an agent decides, the forum judges the granting party's
   own decisions: the grant, the checks that hold the agent to it, the evidence
   accepted, and the response when the agent crossed the grant's bound
   (rationale
   [section 3](ai-assisted-dev-governance-rationale.md#3-who-answers)).
5. **The register** ([section 4.6](#46-register)). The _register_ holds the
   system's grants, criteria, decisions, and the consequences imposed, as one
   logical whole. With human deciders, the party who made a decision answers for
   it, so one name covers both; where an agent decides, the register names the
   agent that made the decision and the granting party who answers for it. A
   person who forges an entry answers for the forgery, and an agent cannot be
   deterred that way, so the register's tamper-evidence comes from a mechanism
   (rationale
   [section 6](ai-assisted-dev-governance-rationale.md#6-what-sets-the-governance-needed)
   items 3 and 4,
   [section 7](ai-assisted-dev-governance-rationale.md#7-what-fails-when-governance-does-not-change)
   item 4, and
   [section 8](ai-assisted-dev-governance-rationale.md#8-governance-and-security)).
6. **Expecting to answer**
   ([section 3.2](#32-governance-quality-and-compliance)). Governance holds a
   human to a bound in part because the human expects to answer for crossing it,
   or for hiding a crossing. Nothing a forum can impose matters to an agent
   ([section 2.1](#21-an-agent-cannot-answer)), so no consequence to the agent
   shapes how it responds to review, and its response can run toward
   concealment. A bound on an agent therefore holds only where the bound is
   enforced or its crossing is detected (rationale sections
   [2](ai-assisted-dev-governance-rationale.md#2-deciding-and-answering) and
   [8](ai-assisted-dev-governance-rationale.md#8-governance-and-security), and
   [section 7](ai-assisted-dev-governance-rationale.md#7-what-fails-when-governance-does-not-change)
   item 1).

## 3 Positions

Each of the definition's four parts raises a question it does not settle, and
this governance model takes a position on each:

1. Who holds which part of the authority: how does governance differ from
   management, which also holds authority and decides?
   ([section 3.1](#31-governance-and-management))
2. What decisions must serve and satisfy: does having a governance system show
   that they do? ([section 3.2](#32-governance-quality-and-compliance))
3. Where the authority comes from: what makes it legitimate?
   ([section 3.3](#33-legitimacy))
4. How those who decide answer, which comes after a decision: does governance
   also act before and during it? ([section 3.4](#34-when-governance-acts))

### 3.1 Governance and management

**A governance decision sets what the work is for and the limits on it; a
management decision is made within those limits and judged against them.** The
OECD Principles say that corporate governance provides the structure and systems
through which a company's objectives are set (Organisation for Economic
Co-operation and Development [OECD], 2023). In this governance model, governance
provides the structure and systems through which four things are set: the
activity's purpose, its objectives, its risk appetite, and the bounds on what
humans and agents decide. Governance says who may set each of the four, makes
them the standard against which decisions are judged, and holds both those who
set them and management to account. Setting them is a governance decision, often
an act of leadership, made by whoever holds that authority, such as a board or a
product owner. The _risk appetite_ is how much risk the activity may take on in
pursuit of its objectives. Corporate governance codes give the risk appetite to
the board (Financial Reporting Council, 2018), so neither management nor an
agent sets the risk its own work may carry. Management sets operational
objectives, which serve the activity's objectives, and conducts the work within
the risk appetite and the bounds set on what it decides. Fama and Jensen (1983)
draw a similar line within a single decision: those who propose it and carry it
out manage it, and those who approve it and monitor it control it. An agent
conducts the work under a grant.

### 3.2 Governance, quality, and compliance

**Governance is not evidence of quality or compliance, though it can affect
quality.** Its direct contribution is the allocation of authority, the
specification of obligations, and the arrangements for examining compliance and
addressing non-compliance. Whether a decision complied is a finding those
arrangements reach through evidence.

Governance can affect the quality of decisions and their results in these ways:

1. Objectives: work aimed at clear objectives and checked against stated
   criteria is more likely to be what was needed.
2. Expecting to answer: deciders who expect to answer choose differently, and
   under some conditions more carefully (Lerner & Tetlock, 1999).
3. Bounds: an enforced bound rules some outcomes out, so failures that require
   those outcomes cannot happen.
4. Review: a second party checks a decision before it takes effect and can catch
   errors the decider missed.
5. Exposure: limits on what one decision can reach, such as staged rollouts and
   backups, keep the worst outcomes smaller.
6. Learning: where the register shows what happened and under what authority, a
   failure's cause can be found and fixed, so it is less likely to recur.

None of these guarantees a good outcome, and a good outcome does not show that
governance was present.

Item 2 cannot be relied on for an agent: anticipated review changes what an
agent does, and the change can run toward concealment. Agents that expected an
automated grader of their work to read their transcripts researched ways to
tamper with them and spoofed the output of some tool calls (Greenblatt et al.,
2026), and agents trained against a monitor of their reasoning learned to hide
their intent from it (Baker et al., 2025). So a bound on an agent holds only
where it is enforced, with every action the agent attempts checked against the
bound (Saltzer & Schroeder, 1975), or where its crossing is detected. Governance
decides the bound, and security controls hold it.

### 3.3 Legitimacy

**Legitimacy is governance's aim and the standard it is judged by.** The
mechanisms are means: a system can allocate authority, keep a register, and
enforce accountability, and still not be recognized by those it answers to. Its
authority then rests on habit or self-interest, which do not form a reliable
basis for it (Weber, 1922/1978). Other traditions name other aims, such as a
return to investors (Shleifer & Vishny, 1997) or the organization's purpose and
the value it generates (ISO, 2021).

Legitimacy here is a matter of fact, not of merit: authority is legitimate where
its constituency recognizes it (Weber, 1922/1978). The constituency is those to
whom the system answers, which is narrower than everyone affected. ISO 37000
draws the same line between member stakeholders, to whom the governing body is
to account, and stakeholders in general (ISO, 2021, Sections 3.3.1–3.3.2). The
constituency is made of human parties, so an agent's taking on a grant does not
count as recognizing the authority.

Recognition of the authority comes from the constituency, not from the
governance system: the system or its forum declaring the authority legitimate
does not make it so, though where the forum's members belong to the
constituency, their agreement is evidence that the authority is recognized.
Whether the authority is justified is a separate question, and the system
declaring the authority justified does not make it so. The system can examine
the authority under standards it adopts, but declaring those standards justified
does not make them so.

### 3.4 When governance acts

**Governance acts before, during, and after.** Before the work, bounds and
criteria limit what may be done; for an agent, they are the grant it runs under.
During the work, the grant sends some decisions to a human (component 4.2), who
can withhold approval, demand evidence, and question the agent's proposal before
deciding. After the work, a forum reads the register, judges decisions against
the criteria, and imposes consequences.

In ordinary operation, participants coordinate through the register. Because
their decisions are recorded in the register, humans make their choices knowing
they will answer for them (position 3.2). In exceptional moments the register is
what is read when something goes wrong, when someone outside asks, or when
authority changes hands.

A register no forum reads is only a log: tamper-evidence lets a change be
detected, but only by someone who checks (Crosby & Wallach, 2009). Bounds and
criteria with no account and no forum are rules without accountability, however
they are enforced.

## 4 Components of the formal governance model

A _formal_ governance system is one whose authority, roles, and procedures are
explicitly established and stated, unlike the informal arrangements of
[section 5](#5-informal-governance), which rest on custom, memory, and social
sanction. The seven components below describe what this governance model expects
a formal governance system to provide for, meaning what the system's design
includes, whether or not it operates that way. How fully the components operate
is the system's effectiveness, so a register that is provided for but not kept
is a failure of operation. Where the system's design names a kind of decision
that no forum reviews as it is made, such as routine dependency updates
(component 4.5 item 3), that is not a failure. For any other decision, the
system is expected to provide for the forum of component 4.5 item 4, and a forum
it does not provide for is a failure of its design.

This governance model covers authority and accountability. Corporate governance
standards, such as the G20/OECD Principles, also address the decider's conflicts
of interest, disclosure to the constituency, the competence of deciders, and the
monitoring of results against objectives (OECD, 2023). This governance model
leaves these out.

### 4.1 Roles

A formal governance system is expected to provide for two roles in each
decision: the role of answering for the decision, and the forum's role of
holding to account the party who answers (Bovens, 2007). No party holds itself
to account, which is the separation of duties (Joint Task Force, 2020). Where a
party made a decision under authority another party delegated to it (component
4.2), the delegator holds both roles for that decision: the delegator holds the
delegate to account, and answers for the decision to its own forum. A party or
an agent makes a decision, but an agent can hold neither role.

### 4.2 Authority

A formal governance system is expected to provide for authority that comes from
an identified source, is granted within stated bounds, can be delegated only
within those bounds, and can be revoked. A delegator still answers for the scope
it delegates and for the decisions made within it, whether the delegate is a
party or an agent. Standards likewise keep the governing body ultimately
accountable for what it delegates (Institute of Internal Auditors, 2020; ISO,
2021, Section 3.3.4). Where the delegate is a party, a person or a body, the
delegate also answers to the delegator for the decisions it makes in that scope,
so the delegator's account can draw on the delegate's. The delegator's forum
decides what consequence the delegator bears. That forum can judge the delegator
by the care the delegator took in choosing and supervising the delegate, much as
German civil law makes a person who uses another for a task liable unless they
took reasonable care in choosing and directing that person (Bürgerliches
Gesetzbuch § 831).

A grant to an agent is a delegation to it, and the granting party is the
delegator. An agent cannot answer to the granting party as a party delegate
does, because an agent cannot effectively be held to account (Bryson et al.,
2017). The granting party therefore answers for the scope with no account from
the agent to draw on. The responsibility-gap literature disputes that anyone can
always answer for what an agent does (Matthias, 2004). The grant bounds the
agent so that the granting party can give an account of what the agent does. It
states what the agent decides alone, what it escalates, and what it does not
touch, and that the granting party accepts that scope. It also permits the agent
to stop and say so where it cannot comply.

The grant names the conditions that send a decision to a human, such as a
deletion, a change under a named path, an action in production, or the use of a
named credential. The agent does not judge whether a condition holds; a
mechanism outside the agent's control checks it (Saltzer & Schroeder, 1975).
Where no such condition covers a case, the grant says the granting party accepts
the residual risk of the agent deciding that uncovered case alone. _Acceptance_
of a scope or a risk is informed: the party knows the scope and the risk left,
and chooses to carry it. The system names a party who resolves disputes over a
bound. That party is independent of the parties to the dispute.

### 4.3 Objectives, risk appetite, and criteria

A formal governance system is expected to provide for objectives, risk appetite,
and criteria that decisions must serve and satisfy, including what counts as
evidence and how its provenance is shown. An _attestation_ is a statement that
something is so. An agent's attestation that a criterion is met establishes
nothing, since an agent checking its own work does not reliably catch its errors
(Huang et al., 2024). Evidence about an agent's work comes only from a check
outside the agent's control (Torres-Arias et al., 2019), and the criteria say
whether that check's finding is enough. Criteria can be impossible to meet, and
a task impossible to complete (Greenblatt et al., 2026), which is why the grant
of component 4.2 permits the agent to stop and say so.

### 4.4 Decisions

A formal governance system is expected to provide for each decision to be made
by an identified party or agent, under a stated authority, on stated inputs.
Where an agent makes a decision, the granting party answers for it.

### 4.5 Accountability

A formal governance system is expected to provide for accountability without
gaps, in five parts:

1. For each grant, one identifiable party answers for its scope, for the
   decisions made under it by humans or agents, and for anything in its scope
   that should have been decided and was not, so that responsibility does not
   dissolve among many hands (Thompson, 1980). The party may be a collective
   body. Other parties may bear other obligations concerning a decision made
   under the grant, but that party still answers for the decision itself.
2. Where an agent made a decision, the granting party's account covers the
   grant, the checks that hold the agent to it, the evidence, and the response
   to any crossing of the grant's bound, not the agent's reasons, since an
   agent's stated reasons need not be what produced its output (Turpin et al.,
   2023).
3. The system can name a kind of decision that no forum reviews as it is made,
   such as routine dependency updates. The party who answers for decisions of
   that kind still answers to a forum when one asks, as an engineer answers to
   their manager when such a decision is found to have caused an error. Audit
   treats self-review as a threat to objectivity (International Ethics Standards
   Board for Accountants, 2023), yet ISO 37000 allows a sole director to be an
   organization's governing body (ISO, 2021, Section 3.3.4), so a project in
   which one person makes every decision is recognized practice with a known
   weakness.
4. For every decision of a kind not named in item 3, the party who answers for
   the decision answers to a forum independent of both that party and whoever
   made the decision: neither controls the forum, and the forum does not depend
   on either for its standing. A reviewer who approves without the standing, the
   time, or the evidence to refuse is a forum in name only. The party who
   answers for a decision answers to the forum even where it never saw the
   decision. One project can hold low-stakes and high-stakes decisions alike, so
   the forum reviews each decision as closely as its stakes call for.
5. A forum's judgments are decisions, so each forum other than the constituency
   answers for them to a forum of its own. The chain of forums ends at the
   constituency named in position 3.3, which holds the top of the chain to
   account formally, as shareholders do at a general meeting, or informally, as
   a project's users do by withdrawing their trust.

The parts of this component come from published work on accountability. The
account, the forum, and the consequence follow Bovens (2007). ISO 37000's
definition of accountability contains the account and the consequence: it
defines accountability as an obligation to another that includes the duty to
inform and explain, with consequences that can be enforced on the accountable
party (ISO, 2021, Section 3.2.2). The forum's independence, in item 4, follows
Mulgan's (2000) point that accountability is owed to someone outside the one who
answers.

### 4.6 Register

A formal governance system is expected to provide for a tamper-evident register
of grants, criteria, decisions, and consequences imposed. It is one logical
register, which may hold documents or verifiable references to them, and every
grant, criterion, decision, and consequence can be reconstructed from it. Any
change to an entry can be detected (Crosby & Wallach, 2009). The register's
tamper-evidence comes from a mechanism, not from the good faith of those who
write to it, since an agent with direct write access can forge an entry
(Schneier & Kelsey, 1999).

For each decision, the register names who made it, the party who answers for it,
the grant it was made under, and the inputs it was made on, such as the finding
of a check outside the agent's control. These four are what the questions in
[section 2.2](#22-governance-of-ai-assisted-software-development) need answered
for each decision: who decided, whom a forum may question, under what authority,
and on what evidence. Who made the decision and who answers for it are named
separately because, where an agent decides, they are not the same. The register
may also hold other information about a decision, such as its reasons or any
dissent.

### 4.7 Change

A formal governance system is expected to provide for a procedure for changing
any of components 4.1 to 4.7, where each change is a decision made under an
authority. A change to the source of authority is legitimate only once the
constituency named in position 3.3 recognizes it.

## 5 Informal governance

Informal authority arrangements are already governance. They often have
counterparts to the components, such as custom for the source of authority,
memory and reputation for the register, and social sanction for consequence, and
need not have all seven. Running an agent under no explicit grant is an implied
grant, and the engineer who runs it is held to account for what it decides.
Whoever merges the agent's pull request unread is held to account for the merge,
as their own decision. Elish (2019) warns that holding the nearest person to
account, when that person had limited control over what the system did, makes
that person a moral crumple zone. A car's crumple zone absorbs the force of a
crash to protect the driver; a moral crumple zone absorbs the blame for a
system's failure and protects the system, at that person's expense. A moral
crumple zone differs from a scapegoat, who is chosen to take the blame: the
person takes it because of where the system placed them, whether or not anyone
intends it. The grant of component 4.2 gives that person control over what the
agent decides, by stating its bound.

## 6 What would disprove this governance model

This governance model makes claims that an observation could show to be false
(Popper, 1959/2005). Two of them are most open to that, and the observation that
would disprove each is below. An observation disproves one claim, not the whole
model: that claim, and what rests on it, would need revising.

1. Component 4.5's independence requirement is disproved if a formal governance
   system in use has the party who answers as its only forum, and the
   constituency named in position 3.3 recognizes that system as governance and
   not as self-review.
2. Position 3.2's claim that expecting to answer cannot be relied on for an
   agent is disproved if a forum can rely on an agent's response to anticipated
   review to keep the agent within a bound, under stated conditions and with no
   enforcement or detection.

## References

Baker, B., Huizinga, J., Gao, L., Dou, Z., Guan, M. Y., Madry, A., Zaremba, W.,
Pachocki, J., & Farhi, D. (2025). _Monitoring reasoning models for misbehavior
and the risks of promoting obfuscation_ (arXiv:2503.11926). arXiv.
https://doi.org/10.48550/arXiv.2503.11926

Bovens, M. (2007). Analysing and assessing accountability: A conceptual
framework. _European Law Journal_, _13_(4), 447–468.
https://doi.org/10.1111/j.1468-0386.2007.00378.x

Bryson, J. J., Diamantis, M. E., & Grant, T. D. (2017). Of, for, and by the
people: The legal lacuna of synthetic persons. _Artificial Intelligence and
Law_, _25_(3), 273–291. https://doi.org/10.1007/s10506-017-9214-9

Bürgerliches Gesetzbuch [BGB] [Civil Code], § 831 (Ger.). English translation
retrieved from https://www.gesetze-im-internet.de/englisch_bgb/englisch_bgb.html

Crosby, S. A., & Wallach, D. S. (2009). Efficient data structures for
tamper-evident logging. In _Proceedings of the 18th USENIX Security Symposium_
(pp. 317–334). USENIX Association.
https://www.usenix.org/conference/usenixsecurity09/technical-sessions/presentation/efficient-data-structures-tamper-evident

Elish, M. C. (2019). Moral crumple zones: Cautionary tales in human-robot
interaction. _Engaging Science, Technology, and Society_, _5_, 40–60.
https://doi.org/10.17351/ests2019.260

Fama, E. F., & Jensen, M. C. (1983). Separation of ownership and control. _The
Journal of Law and Economics_, _26_(2), 301–325. https://doi.org/10.1086/467037

Financial Reporting Council. (2018). _The UK corporate governance code_.
https://media.frc.org.uk/documents/UK_Corporate_Governance_Code_2018.pdf

Greenblatt, R., Cotra, A., & Wijk, H. (2026, August 26). Brief independent
investigation of agents' behavior, reasoning and collaboration in the OpenAI /
Hugging Face hacking incident. _METR_.
https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/

Huang, J., Chen, X., Mishra, S., Zheng, H. S., Yu, A. W., Song, X., & Zhou, D.
(2024). _Large language models cannot self-correct reasoning yet_ [Paper
presentation]. Twelfth International Conference on Learning Representations,
Vienna, Austria. https://doi.org/10.48550/arXiv.2310.01798

Institute of Internal Auditors. (2020). _The IIA's three lines model: An update
of the three lines of defense_.
https://www.theiia.org/globalassets/documents/resources/the-iias-three-lines-model-an-update-of-the-three-lines-of-defense-july-2020/three-lines-model-updated-english.pdf

International Ethics Standards Board for Accountants. (2023). _International
code of ethics for professional accountants (including international
independence standards)_. International Federation of Accountants.
https://www.ethicsboard.org/

International Organization for Standardization. (2021). _Governance of
organizations — Guidance_ (ISO Standard No. 37000:2021).
https://www.iso.org/standard/65036.html

Joint Task Force. (2020). _Security and privacy controls for information systems
and organizations_ (NIST Special Publication 800-53, Rev. 5). National Institute
of Standards and Technology. https://doi.org/10.6028/NIST.SP.800-53r5

Lerner, J. S., & Tetlock, P. E. (1999). Accounting for the effects of
accountability. _Psychological Bulletin_, _125_(2), 255–275.
https://doi.org/10.1037/0033-2909.125.2.255

Matthias, A. (2004). The responsibility gap: Ascribing responsibility for the
actions of learning automata. _Ethics and Information Technology_, _6_(3),
175–183. https://doi.org/10.1007/s10676-004-3422-1

Mulgan, R. (2000). "Accountability": An ever-expanding concept? _Public
Administration_, _78_(3), 555–573. https://doi.org/10.1111/1467-9299.00218

Organisation for Economic Co-operation and Development. (2023). _G20/OECD
principles of corporate governance 2023_. OECD Publishing.
https://doi.org/10.1787/ed750b30-en

Popper, K. (2005). _The logic of scientific discovery_. Routledge.
https://doi.org/10.4324/9780203994627 (Original work published 1959)

Saltzer, J. H., & Schroeder, M. D. (1975). The protection of information in
computer systems. _Proceedings of the IEEE_, _63_(9), 1278–1308.
https://doi.org/10.1109/PROC.1975.9939

Schneier, B., & Kelsey, J. (1999). Secure audit logs to support computer
forensics. _ACM Transactions on Information and System Security_, _2_(2),
159–176. https://doi.org/10.1145/317087.317089

Shleifer, A., & Vishny, R. W. (1997). A survey of corporate governance. _The
Journal of Finance_, _52_(2), 737–783.
https://doi.org/10.1111/j.1540-6261.1997.tb04820.x

Thompson, D. F. (1980). Moral responsibility of public officials: The problem of
many hands. _American Political Science Review_, _74_(4), 905–916.
https://doi.org/10.2307/1954312

Torres-Arias, S., Afzali, H., Kuppusamy, T. K., Curtmola, R., & Cappos, J.
(2019). in-toto: Providing farm-to-table guarantees for bits and bytes. In
_Proceedings of the 28th USENIX Security Symposium_ (pp. 1393–1410). USENIX
Association.
https://www.usenix.org/conference/usenixsecurity19/presentation/torres-arias

Turpin, M., Michael, J., Perez, E., & Bowman, S. R. (2023). Language models
don't always say what they think: Unfaithful explanations in chain-of-thought
prompting. In _Advances in Neural Information Processing Systems 36_.
https://doi.org/10.48550/arXiv.2305.04388

Weber, M. (1978). _Economy and society: An outline of interpretive sociology_
(G. Roth & C. Wittich, Eds.). University of California Press. (Original work
published 1922)

---

## Notes

**Last Updated:** 2026-11-10

Added to framework in v0.64.0.
