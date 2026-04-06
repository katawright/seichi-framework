# Changelog

## 0.43.0 (2026-04-05)

### Features

* **right-sizing:** promote Success Criteria Register from Optional to
  Recommended at Minimal tier — agents now surface it for all projects
* **checklists:** raise [H] items inline during interactive stage execution
  rather than batching at the end (all 8 stage checklists)
* **increment-design:** add non-code deliverable cross-reference checklist item
  to catch platform configuration, documentation, and manual setup tasks
* **tooling:** add `/release-prep` command combining VERSION, CHANGELOG, and
  INDEX.md updates into a single step

### Improvements

* **framework:** clarify MoSCoW terminology — replace "release" with "increment"
  in definitions, distinguish MoSCoW prioritization from increment plan, clarify
  Won't Have scope (future project or dropped entirely)
* **requirements:** add MoSCoW guide link to checklist item
* **bootstrap:** replace hardcoded version references with `v<version>`
  placeholder in QUICKSTART and Bootstrap Guide
* **contributing:** document release process
* **tooling:** merge `/index` command into `/release-prep`

### Bug Fixes

* **framework:** surface draft ADR convention in template, gate decision, and
  checklist
* **checklists:** remove stale `(Standard+)` tier qualifiers from success
  criteria register references

## 0.42.0 (2026-03-31)

### Features

* **stages:** comprehensive multi-dimensional review (1X/AX/OX/RX/UX) across all
  stages — added purpose statements, CD workflow adaptations, handoff protocols,
  discovery decision trees, retrospective triggers, artifact placement, and
  working locations model
* **brownfield:** hostile-brownfield deployment guidance with readiness rubric
  and deployment checklist
* **governance:** AI governance trajectory — execution, decision, and
  accountability dimensions (ADR)
* **schema:** JSON Schema validation for stage README and guide front matter
* **workspace:** multi-repo workspace support with AGENTS.md template and
  monorepo guidance
* **bootstrap:** replaced manual process guide with streamlined bootstrap guide
  and reworked quickstart

### Improvements

* **brownfield:** restructured guides, investment models, tiers, exit protocol,
  topology-aware scoring, and completion signals
* **roles:** overhauled role definitions — extracted to dedicated guide, renamed
  PM/BA to PM, standardized IDs and stakeholder guidance
* **schema:** consolidated stage metadata into READMEs, extracted pipeline
  topology into stages.md, cleaned up schema definitions
* **checkpoints:** extracted checkpoint taxonomy, standardized fallback
  protocols, handoffs, and cross-references
* **assessment:** replaced rework severity ladder with guided assessment model
* **structure:** standardized Overview H3 headings with structure validation;
  removed duplicated stage tables from guides
* **agents:** merged AGENTS.md into CLAUDE.md as single source of truth
* **enablement:** deepened enablement tactics and tightened cross-references

### Bug Fixes

* **simulation:** addressed minimal-greenfield simulation findings (ADR-003)
* **tooling:** cross-platform compatibility for install-hooks script
* **review:** addressed 200+ findings across 11 review runs spanning all stages
