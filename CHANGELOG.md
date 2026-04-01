# Changelog

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
