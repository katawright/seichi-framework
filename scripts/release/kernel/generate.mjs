// Kernel manifest generator — assembles the self-contained, stamped kernel
// exports from the YAML vocabulary sources, the rule registry, and the
// canonical stage front matter:
//
//   spec/generated/manifest.json          machine contract consumers (JSON)
//   spec/generated/schema-projection.json the schema-facing equivalence export
//   spec/generated/reference.md           human-readable reference (Markdown)
//
// Every output is a pure function of its inputs (Decision 3.4): the
// generated_at stamp is source-derived (INDEX.md Last Updated), never
// wall-clock, so identical inputs produce byte-identical artifacts.

import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { existsSync } from "node:fs";
import { join } from "node:path";

import {
  compareRuleIds,
  loadKernelSources,
  RULES_FILE,
} from "./sources.mjs";
import { headingRiderIssue } from "./markers.mjs";

export const KERNEL_INTERFACE_VERSION = "0.1";

export const GENERATED_FILES = [
  "spec/generated/manifest.json",
  "spec/generated/reference.md",
  "spec/generated/schema-projection.json",
];

/** kebab-case framework identifier -> snake_case consumer projection. */
export function toSnake(value) {
  return value.replace(/-/g, "_");
}

function sortedObject(entries) {
  const out = {};
  for (const [k, v] of [...entries].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))) {
    out[k] = v;
  }
  return out;
}

// A rule `source` may be a single-star glob (one rule's canonical data home
// spans sibling files, e.g. stages/*/README.md). Existence then means: the
// pattern matches at least one file.
function sourceExists(repoRoot, source) {
  if (!source.includes("*")) return existsSync(join(repoRoot, source));
  const segments = source.split("/");
  let dirs = [repoRoot];
  for (const segment of segments) {
    const next = [];
    for (const dir of dirs) {
      if (segment.includes("*")) {
        const re = new RegExp(
          `^${segment.split("*").map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join(".*")}$`,
        );
        try {
          for (const name of readdirSync(dir)) {
            if (re.test(name)) next.push(join(dir, name));
          }
        } catch {
          /* unreadable dir — no matches */
        }
      } else {
        next.push(join(dir, segment));
      }
    }
    dirs = next;
  }
  return dirs.some((p) => existsSync(p));
}

// Cascade-landing families -> the vocabulary their landing_status/from
// values resolve against. `null` = the family's status vocabulary is
// deliberately not authored in the first slice (not on the ADR admission
// list); its landing values are prose-verified only, flagged when swept.
const CASCADE_FAMILY_VOCAB = {
  run: { machine: "run_lifecycle" },
  batch: { machine: "batch_lifecycle" },
  directive: { machine: "directive_lifecycle" },
  escalation: { machine: "escalation_lifecycle" },
  "approved-deviation": { machine: "deviation_lifecycle" },
  "decision-record": { machine: "adr_lifecycle" },
  goal: { family: "goal_status" },
  "success-criterion": { family: "success_criterion_status" },
  requirement: { family: "requirement_status" },
  assumption: { family: "assumption_status" },
  risk: { family: "risk_status" },
  "carry-forward-condition": null,
};

// ── Source validation (shared with the .schema kernel check) ───────────────

/**
 * Structural validation over the kernel sources: duplicate rule IDs, broken
 * rule/machine/state references, malformed IDs, missing source files.
 * Returns a flat array of issue strings (empty = valid).
 */
export function validateKernelSources(repoRoot, sources) {
  const issues = [];
  const { vocab, rules } = sources;

  // Rule registry: well-formed, unique IDs, existing source files.
  const ids = new Set();
  const ID_RE = /^[A-Z]+-\d{3}[a-z]?$/;
  for (const rule of rules) {
    if (!rule.id || !ID_RE.test(rule.id)) {
      issues.push(`KERNEL  ${RULES_FILE}  malformed rule id: ${String(rule.id)}`);
      continue;
    }
    if (ids.has(rule.id)) {
      issues.push(`KERNEL  ${RULES_FILE}  duplicate rule id: ${rule.id}`);
    }
    ids.add(rule.id);
    for (const field of ["title", "layer", "basis", "source", "introduced", "status"]) {
      if (rule[field] === undefined || rule[field] === null || rule[field] === "") {
        issues.push(`KERNEL  ${RULES_FILE}  ${rule.id}: missing field \`${field}\``);
      }
    }
    if (rule.layer !== undefined && !["1a", "1b"].includes(rule.layer)) {
      issues.push(`KERNEL  ${RULES_FILE}  ${rule.id}: invalid layer \`${rule.layer}\``);
    }
    if (
      rule.basis !== undefined &&
      !["both-conjuncts", "divergent-consumption", "resolver-input", "1b"].includes(rule.basis)
    ) {
      issues.push(`KERNEL  ${RULES_FILE}  ${rule.id}: invalid basis \`${rule.basis}\``);
    }
    if (rule.status !== undefined && !["active", "superseded", "deprecated"].includes(rule.status)) {
      issues.push(`KERNEL  ${RULES_FILE}  ${rule.id}: invalid status \`${rule.status}\``);
    }
    if (rule.source && !sourceExists(repoRoot, rule.source)) {
      issues.push(`KERNEL  ${RULES_FILE}  ${rule.id}: source file missing: ${rule.source}`);
    }
    // Phase 3 migration fields (Decisions P3-2/P3-3), optional until the
    // rule's wave migrates it.
    if (
      rule.representation !== undefined &&
      !["data", "data+contract", "contract"].includes(rule.representation)
    ) {
      issues.push(
        `KERNEL  ${RULES_FILE}  ${rule.id}: invalid representation \`${rule.representation}\``,
      );
    }
    if (rule.links !== undefined) {
      if (!Array.isArray(rule.links) || rule.links.length === 0) {
        issues.push(`KERNEL  ${RULES_FILE}  ${rule.id}: \`links\` must be a non-empty array`);
      } else {
        for (const link of rule.links) {
          if (typeof link !== "string" || link === "") {
            issues.push(`KERNEL  ${RULES_FILE}  ${rule.id}: \`links\` entries must be non-empty strings`);
            continue;
          }
          const path = link.split("#")[0];
          if (!sourceExists(repoRoot, path)) {
            issues.push(`KERNEL  ${RULES_FILE}  ${rule.id}: links target missing: ${path}`);
          }
        }
      }
    }
  }

  // Marker-anchored bodies: structural defects found while extracting, plus
  // the representation ⇔ marker coupling (single-home made structural —
  // Decision 2.3): a migrated rule (representation recorded, P3-3) has
  // exactly one marker pair in its source; an unmigrated rule has none.
  // The extracted body must open with the visible ID heading (the Q2 rider).
  for (const issue of sources.markerIssues ?? []) {
    issues.push(`KERNEL  ${issue}`);
  }
  for (const rule of rules) {
    if (!rule.id) continue;
    const body = (sources.ruleBodies ?? {})[rule.id];
    if (rule.representation !== undefined && body === undefined) {
      issues.push(
        `KERNEL  ${RULES_FILE}  ${rule.id}: representation recorded but no marker-anchored body in ${rule.source}`,
      );
    }
    if (rule.representation === undefined && body !== undefined) {
      issues.push(
        `KERNEL  ${RULES_FILE}  ${rule.id}: marker-anchored body found but no \`representation\` recorded (set it in the migrating commit — P3-3)`,
      );
    }
    if (body !== undefined) {
      const rider = headingRiderIssue(rule.id, body);
      if (rider) issues.push(`KERNEL  ${rule.source}: ${rider}`);
    }
  }

  const checkOwningRule = (where, owningRule) => {
    if (!owningRule) {
      issues.push(`KERNEL  ${where}: missing owning_rule`);
    } else if (!ids.has(owningRule)) {
      issues.push(`KERNEL  ${where}: owning_rule ${owningRule} not in ${RULES_FILE}`);
    }
  };

  // Machines: terminals/edges within states; owning rules resolve.
  const machines = vocab.statuses.machines ?? {};
  for (const [name, m] of Object.entries(machines)) {
    const where = `spec/vocabulary/statuses.yaml#machines.${name}`;
    checkOwningRule(where, m.owning_rule);
    const states = new Set(m.states ?? []);
    if (states.size !== (m.states ?? []).length) {
      issues.push(`KERNEL  ${where}: duplicate state values`);
    }
    for (const t of m.terminals ?? []) {
      if (!states.has(t)) issues.push(`KERNEL  ${where}: terminal \`${t}\` not a state`);
    }
    for (const [from, to] of m.edges ?? []) {
      if (!states.has(from)) issues.push(`KERNEL  ${where}: edge from unknown state \`${from}\``);
      if (!states.has(to)) issues.push(`KERNEL  ${where}: edge to unknown state \`${to}\``);
    }
    for (const t of m.terminals ?? []) {
      if ((m.edges ?? []).some(([from]) => from === t)) {
        issues.push(`KERNEL  ${where}: terminal \`${t}\` has an outgoing edge (terminals are absorbing)`);
      }
    }
  }

  // Reason sets: machine exists, keyed states exist, owning rules resolve.
  for (const [name, r] of Object.entries(vocab.reasons.reason_sets ?? {})) {
    const where = `spec/vocabulary/reasons.yaml#reason_sets.${name}`;
    checkOwningRule(where, r.owning_rule);
    const machineName = name === "run_pause" || name === "run_outcome"
      ? "run_lifecycle"
      : name === "directive_void"
        ? "directive_lifecycle"
        : name;
    const machine = machines[machineName];
    if (!machine) {
      issues.push(`KERNEL  ${where}: no machine \`${machineName}\` in statuses.yaml`);
      continue;
    }
    const states = new Set(machine.states ?? []);
    for (const state of Object.keys(r.by_state ?? {})) {
      if (!states.has(state)) {
        issues.push(`KERNEL  ${where}: reason set keyed on unknown state \`${state}\``);
      }
    }
    for (const state of Object.keys(r.by_source_state ?? {})) {
      if (!states.has(state)) {
        issues.push(`KERNEL  ${where}: source-state reason set keyed on unknown state \`${state}\``);
      }
    }
    // The iff, both ways: every reason-required state carries a closed set
    // or an explicit machine-readable missing-code flag; no set is keyed on
    // a state not declared reason-required.
    if (r.required_reason_states === undefined) {
      issues.push(`KERNEL  ${where}: missing \`required_reason_states\``);
    } else {
      const covered = new Set([
        ...Object.keys(r.by_state ?? {}),
        ...Object.keys(r.missing_codes ?? {}),
      ]);
      for (const state of r.required_reason_states) {
        if (!states.has(state)) {
          issues.push(`KERNEL  ${where}: required-reason state \`${state}\` not a state`);
        }
        if (!covered.has(state)) {
          issues.push(
            `KERNEL  ${where}: reason-required state \`${state}\` has no closed set and no missing_codes flag`,
          );
        }
      }
      const required = new Set(r.required_reason_states);
      for (const state of covered) {
        if (!required.has(state)) {
          issues.push(
            `KERNEL  ${where}: state \`${state}\` carries a reason set but is not in required_reason_states`,
          );
        }
      }
    }
  }

  // Flat vocabularies (grades, config, concurrency) + planning families.
  for (const fileName of ["grades", "config", "concurrency", "checkpoints"]) {
    for (const [name, v] of Object.entries(vocab[fileName].vocabularies ?? {})) {
      const where = `spec/vocabulary/${fileName}.yaml#vocabularies.${name}`;
      checkOwningRule(where, v.owning_rule);
      const values = v.values ?? [];
      if (new Set(values).size !== values.length) {
        issues.push(`KERNEL  ${where}: duplicate values`);
      }
      if (values.length === 0) {
        issues.push(`KERNEL  ${where}: empty value set`);
      }
    }
  }
  const pf = vocab.statuses.planning_families ?? {};
  checkOwningRule("spec/vocabulary/statuses.yaml#planning_families", pf.owning_rule);
  checkOwningRule(
    "spec/vocabulary/statuses.yaml#standing_resting_partition",
    (vocab.statuses.standing_resting_partition ?? {}).owning_rule,
  );

  // Standing/resting partition: exact cover of the family's value set.
  const partition = vocab.statuses.standing_resting_partition ?? {};
  for (const [family, split] of Object.entries(partition)) {
    if (family === "owning_rule" || family === "source") continue;
    const where = `spec/vocabulary/statuses.yaml#standing_resting_partition.${family}`;
    const declared = pf[family]?.values;
    if (!declared) {
      issues.push(`KERNEL  ${where}: no planning family \`${family}\``);
      continue;
    }
    const covered = [...(split.standing ?? []), ...(split.resting ?? [])];
    if (
      covered.length !== declared.length ||
      new Set(covered).size !== covered.length ||
      !covered.every((v) => declared.includes(v))
    ) {
      issues.push(`KERNEL  ${where}: partition does not exactly cover the status set`);
    }
  }

  // Terminal integrity blocks: owning rules resolve.
  const ti = vocab.statuses.terminal_integrity ?? {};
  for (const key of ["quiescence_set", "post_terminal_sanctions", "cascade_landing"]) {
    checkOwningRule(`spec/vocabulary/statuses.yaml#terminal_integrity.${key}`, ti[key]?.owning_rule);
  }

  // Cascade-landing references resolve against the landed family's authored
  // vocabulary; families whose vocabulary the first slice deliberately does
  // not author are allowlisted (null) and skipped.
  const planningFamilies = vocab.statuses.planning_families ?? {};
  const resolveFamilyValues = (spec) => {
    if (spec.machine) return machines[spec.machine]?.states;
    return planningFamilies[spec.family]?.values;
  };
  for (const hop of ["project_canceled", "run_terminal"]) {
    for (const row of ti.cascade_landing?.[hop] ?? []) {
      const where = `spec/vocabulary/statuses.yaml#terminal_integrity.cascade_landing.${hop}`;
      if (!(row.family in CASCADE_FAMILY_VOCAB)) {
        issues.push(`KERNEL  ${where}: unknown family \`${row.family}\``);
        continue;
      }
      const spec = CASCADE_FAMILY_VOCAB[row.family];
      if (spec === null) continue; // vocabulary deliberately unauthored this slice
      const values = resolveFamilyValues(spec);
      if (!values) {
        issues.push(`KERNEL  ${where}: family \`${row.family}\` vocabulary not found`);
        continue;
      }
      if (!values.includes(row.landing_status)) {
        issues.push(
          `KERNEL  ${where}: \`${row.family}\` landing status \`${row.landing_status}\` not in its vocabulary`,
        );
      }
      if (row.from !== undefined && !values.includes(row.from)) {
        issues.push(
          `KERNEL  ${where}: \`${row.family}\` from-state \`${row.from}\` not in its vocabulary`,
        );
      }
    }
  }
  checkOwningRule(
    "spec/vocabulary/grades.yaml#record_requirements",
    (vocab.grades.record_requirements ?? {}).owning_rule,
  );

  return issues;
}

// ── Manifest assembly ──────────────────────────────────────────────────────

function vocabularyEntries(sources) {
  const { vocab } = sources;
  const entries = [];

  for (const [name, m] of Object.entries(vocab.statuses.machines)) {
    entries.push([
      name,
      {
        values: m.states,
        owning_rule: m.owning_rule,
        source: m.source,
        consumers: m.consumers ?? [],
      },
    ]);
  }
  const pf = vocab.statuses.planning_families;
  for (const [name, v] of Object.entries(pf)) {
    if (name === "owning_rule" || name === "source") continue;
    entries.push([
      name,
      {
        values: v.values,
        owning_rule: pf.owning_rule,
        source: pf.source,
        consumers: v.consumers ?? [],
      },
    ]);
  }
  for (const fileName of ["grades", "config", "concurrency", "checkpoints"]) {
    for (const [name, v] of Object.entries(vocab[fileName].vocabularies)) {
      entries.push([
        name,
        {
          values: v.values,
          owning_rule: v.owning_rule,
          source: v.source,
          consumers: v.consumers ?? [],
        },
      ]);
    }
  }
  return sortedObject(entries);
}

function transitionEntries(sources) {
  const { vocab } = sources;
  const reasonsByMachine = {};
  for (const [name, r] of Object.entries(vocab.reasons.reason_sets)) {
    const machineName = name === "run_pause" || name === "run_outcome"
      ? "run_lifecycle"
      : name === "directive_void"
        ? "directive_lifecycle"
        : name;
    reasonsByMachine[machineName] ??= {
      by_state: {},
      by_source_state: {},
      required: [],
      missing: {},
    };
    const acc = reasonsByMachine[machineName];
    for (const [state, values] of Object.entries(r.by_state ?? {})) {
      acc.by_state[state] = [...(acc.by_state[state] ?? []), ...values];
    }
    for (const [state, values] of Object.entries(r.by_source_state ?? {})) {
      acc.by_source_state[state] = values;
    }
    for (const state of r.required_reason_states ?? []) {
      if (!acc.required.includes(state)) acc.required.push(state);
    }
    for (const [state, note] of Object.entries(r.missing_codes ?? {})) {
      acc.missing[state] = note;
    }
  }

  const entries = [];
  for (const [name, m] of Object.entries(vocab.statuses.machines)) {
    const reasons = reasonsByMachine[name] ?? {
      by_state: {},
      by_source_state: {},
      required: [],
      missing: {},
    };
    entries.push([
      name,
      {
        states: m.states,
        terminals: m.terminals,
        edges: m.edges,
        reason_required_states: [...reasons.required].sort(),
        reason_sets: sortedObject(Object.entries(reasons.by_state)),
        ...(Object.keys(reasons.by_source_state).length > 0
          ? { reason_sets_by_source_state: sortedObject(Object.entries(reasons.by_source_state)) }
          : {}),
        ...(Object.keys(reasons.missing).length > 0
          ? { missing_reason_codes: sortedObject(Object.entries(reasons.missing)) }
          : {}),
      },
    ]);
  }
  return sortedObject(entries);
}

export function buildKernelManifest(sources) {
  const rules = [...sources.rules].sort((a, b) => compareRuleIds(a.id, b.id));
  const rulesMap = {};
  for (const r of rules) {
    rulesMap[r.id] = {
      title: r.title,
      layer: r.layer,
      basis: r.basis,
      source: r.source,
      introduced: r.introduced,
      status: r.status,
      ...(r.notes ? { notes: r.notes } : {}),
      ...(r.representation ? { representation: r.representation } : {}),
      ...(r.links ? { links: r.links } : {}),
    };
  }

  const ti = sources.vocab.statuses.terminal_integrity;
  const rr = sources.vocab.grades.record_requirements;

  const pipeline = [...sources.pipeline].sort(
    (a, b) => a.stage_number - b.stage_number,
  );
  const stageMetadata = {};
  for (const stage of pipeline) {
    if (sources.stageMetadata[stage.id]) {
      stageMetadata[stage.id] = sources.stageMetadata[stage.id];
    }
  }

  return {
    meta: {
      framework_version: sources.frameworkVersion,
      kernel_interface_version: KERNEL_INTERFACE_VERSION,
      source_hash: sources.sourceHash,
      generated_at: sources.generatedAt,
      generated: "GENERATED by scripts/release/kernel — do not hand-edit",
    },
    vocabularies: vocabularyEntries(sources),
    rules: rulesMap,
    transitions: transitionEntries(sources),
    record_requirements: rr.properties,
    terminal_integrity: {
      quiescence_set: ti.quiescence_set,
      post_terminal_sanctions: ti.post_terminal_sanctions,
      cascade_landing: ti.cascade_landing,
    },
    stages: {
      pipeline,
      stage_metadata: stageMetadata,
    },
  };
}

// ── Schema-facing projection ───────────────────────────────────────────────

// Framework vocabulary/reason-set -> consuming enum, for the equivalence
// comparison. Values project kebab->snake mechanically.
const ENUM_PROJECTION = [
  ["project_lifecycle", { machine: "project_lifecycle" }],
  ["run_lifecycle", { machine: "run_lifecycle" }],
  ["batch_status", { machine: "batch_lifecycle" }],
  ["directive_state", { machine: "directive_lifecycle" }],
  ["escalation_state", { machine: "escalation_lifecycle" }],
  ["deviation_status", { machine: "deviation_lifecycle" }],
  ["policy_status", { machine: "policy_lifecycle" }],
  ["adr_status", { machine: "adr_lifecycle" }],
  ["project_lifecycle_reason", { reasons: "project_lifecycle" }],
  ["pause_reason", { reasons: "run_pause" }],
  ["run_outcome", { reasons: "run_outcome" }],
  ["batch_terminal_reason", { reasons: "batch_lifecycle" }],
  ["directive_void_reason", { reasons: "directive_void" }],
  ["escalation_withdrawn_reason", { reasons: "escalation_lifecycle" }],
  ["deviation_revoked_reason", { reasons: "deviation_lifecycle" }],
  ["goal_status", { vocabulary: "goal_status" }],
  ["sc_status", { vocabulary: "success_criterion_status" }],
  ["req_status", { vocabulary: "requirement_status" }],
  ["assumption_status", { vocabulary: "assumption_status" }],
  ["risk_status", { vocabulary: "risk_status" }],
  ["identity_grade", { vocabulary: "identity_grade" }],
  ["independence_grade", { vocabulary: "independence_grade" }],
  ["attribution_source", { vocabulary: "attribution_source" }],
  ["assurance_level", { vocabulary: "assurance_level" }],
  ["executor_read_path", { vocabulary: "executor_read_path" }],
  ["consequence_tier", { vocabulary: "consequence_tier" }],
  ["forcing_dependency", { vocabulary: "forcing_dependency" }],
  ["safety_conclusion", { vocabulary: "safety_conclusion" }],
];

export function buildSchemaProjection(sources, manifest) {
  const enums = {};
  for (const [enumName, spec] of ENUM_PROJECTION) {
    let frameworkValues;
    let source;
    if (spec.machine) {
      frameworkValues = manifest.vocabularies[spec.machine].values;
      source = `manifest:vocabularies.${spec.machine}`;
    } else if (spec.vocabulary) {
      frameworkValues = manifest.vocabularies[spec.vocabulary].values;
      source = `manifest:vocabularies.${spec.vocabulary}`;
    } else {
      const r = sources.vocab.reasons.reason_sets[spec.reasons];
      const union = [];
      for (const values of Object.values(r.by_state ?? {})) {
        for (const v of values) if (!union.includes(v)) union.push(v);
      }
      frameworkValues = union;
      source = `manifest:transitions (reason sets: ${spec.reasons})`;
    }
    enums[enumName] = {
      values: frameworkValues.map(toSnake),
      framework_values: frameworkValues,
      source,
      ...(spec.note ? { note: spec.note } : {}),
    };
  }

  return {
    meta: manifest.meta,
    projection_convention:
      "framework kebab-case identifiers project to the consumer's snake_case mechanically (s/-/_/g); sets are compared order-insensitively",
    enums: sortedObject(Object.entries(enums)),
    representations: {
      write_class: {
        values: manifest.vocabularies.write_class.values,
        note: "consumed as a boolean write-class flag, not an enum",
      },
    },
    record_requirements: manifest.record_requirements,
    transitions: manifest.transitions,
  };
}

// ── Human-readable reference ───────────────────────────────────────────────

export function buildReference(manifest, ruleBodies = {}) {
  const lines = [];
  const push = (s = "") => lines.push(s);

  push("<!-- GENERATED by scripts/release/kernel — do not hand-edit. -->");
  push(`<!-- source_hash: ${manifest.meta.source_hash} -->`);
  push();
  push("# Kernel Reference");
  push();
  push(
    `Framework ${manifest.meta.framework_version} · kernel interface ` +
      `${manifest.meta.kernel_interface_version} (0.x, pre-1.0) · as-of ` +
      `${manifest.meta.generated_at}`,
  );
  push();
  push(
    "Generated view of the kernel sources (`spec/vocabulary/*.yaml`, " +
      "`spec/rules/index.yaml`, stage front matter). Machine consumers " +
      "ingest `manifest.json`; the schema-facing equivalence export is " +
      "`schema-projection.json`. Rule bodies live in the cited source files.",
  );
  push();

  push("## Vocabularies");
  push();
  push("| Vocabulary | Values | Owning rule | Source |");
  push("| --- | --- | --- | --- |");
  for (const [name, v] of Object.entries(manifest.vocabularies)) {
    push(
      `| \`${name}\` | ${v.values.map((x) => `\`${x}\``).join(" · ")} | ` +
        `${v.owning_rule} | \`${v.source}\` |`,
    );
  }
  push();

  push("## Lifecycle machines");
  push();
  for (const [name, t] of Object.entries(manifest.transitions)) {
    push(`### ${name}`);
    push();
    push(`- States: ${t.states.map((s) => `\`${s}\``).join(" · ")}`);
    push(`- Terminals: ${t.terminals.map((s) => `\`${s}\``).join(" · ")}`);
    push(
      `- Edges: ${t.edges.map(([a, b]) => `\`${a} -> ${b}\``).join(", ")}`,
    );
    const reasonStates = Object.keys(t.reason_sets);
    if (reasonStates.length > 0) {
      push("- Reason sets (present iff the state requires one):");
      for (const state of reasonStates) {
        push(
          `  - \`${state}\`: ${t.reason_sets[state].map((r) => `\`${r}\``).join(" · ")}`,
        );
      }
    }
    if (t.reason_sets_by_source_state) {
      push("- Reason sets closed per source state:");
      for (const [state, values] of Object.entries(t.reason_sets_by_source_state)) {
        push(
          `  - from \`${state}\`: ${values.map((r) => `\`${r}\``).join(" · ")}`,
        );
      }
    }
    if (t.missing_reason_codes) {
      push("- Missing codes (flagged, unratified — routed to a planning cycle):");
      for (const [state, note] of Object.entries(t.missing_reason_codes)) {
        push(`  - \`${state}\`: ${note}`);
      }
    }
    push();
  }

  push("## Record requirements");
  push();
  push(
    manifest.record_requirements.map((p) => `\`${p}\``).join(" · ") +
      " (CS-079).",
  );
  push();

  // Terminal integrity — the generated view of the CS-028/029/030 data
  // (the cascade landing table's generated view per the recorded maintainer
  // decision; the spec bodies bind the data and link here).
  const ti = manifest.terminal_integrity;
  push("## Terminal integrity");
  push();
  push("### Quiescence set (CS-028)");
  push();
  push("| Family | Condition |");
  push("| --- | --- |");
  for (const m of ti.quiescence_set.members ?? []) {
    push(`| \`${m.family}\` | ${m.condition} |`);
  }
  for (const e of ti.quiescence_set.exemptions ?? []) {
    push(`| \`${e.family}\` | **exempt** — ${e.rationale} |`);
  }
  push();
  push("### Post-terminal sanctions (CS-029)");
  push();
  push("| After | Family | Sanctioned landing | From postures |");
  push("| --- | --- | --- | --- |");
  for (const s of ti.post_terminal_sanctions.after_closed ?? []) {
    push(
      `| \`closed\` | \`${s.family}\` | ${s.landing_statuses.map((v) => `\`${v}\``).join(" · ")} | ` +
        `${(s.from_postures ?? []).map((v) => `\`${v}\``).join(" · ") || "—"} |`,
    );
  }
  if ((ti.post_terminal_sanctions.after_canceled ?? []).length === 0) {
    push("| `canceled` | — | none — no planning record moves | — |");
  }
  push();
  push("### Cascade landing (CS-030)");
  push();
  push("| Hop | Family | From | Landing status | Reason |");
  push("| --- | --- | --- | --- | --- |");
  for (const [hop, rows] of Object.entries({
    project_canceled: ti.cascade_landing.project_canceled ?? [],
    run_terminal: ti.cascade_landing.run_terminal ?? [],
  })) {
    for (const r of rows) {
      push(
        `| ${hop.replace("_", " ")} | \`${r.family}\` | ${r.from ? `\`${r.from}\`` : "any"} | ` +
          `\`${r.landing_status}\` | \`${r.reason}\` |`,
      );
    }
  }
  push();

  push("## Rule registry");
  push();
  push("| ID | Title | Layer | Basis | Source | Representation |");
  push("| --- | --- | --- | --- | --- | --- |");
  for (const [id, r] of Object.entries(manifest.rules)) {
    push(
      `| ${id} | ${r.title} | ${r.layer} | ${r.basis} | \`${r.source}\` | ` +
        `${r.representation ?? "—"} |`,
    );
  }
  push();

  // Per-rule contract sections (migration plan step 4): the marker-anchored
  // bodies, verbatim from their normative homes. Each body opens with its
  // own visible `### <ID> — <title>` heading (the Q2 rider), so no heading
  // is synthesized here. Present only once rules have migrated (Waves A–D).
  const migratedIds = Object.keys(manifest.rules).filter((id) => ruleBodies[id] !== undefined);
  if (migratedIds.length > 0) {
    push("## Rule contracts");
    push();
    push(
      "Marker-anchored rule bodies, extracted verbatim from each rule's " +
        "normative home (`spec/rules/index.yaml` `source`). Rules without a " +
        "section here have not yet migrated; their bodies live unanchored in " +
        "the cited source.",
    );
    push();
    for (const id of migratedIds) {
      push(ruleBodies[id]);
      push();
    }
  }

  push("## Stage pipeline");
  push();
  push("| # | Stage | Pattern | Feeds into |");
  push("| --- | --- | --- | --- |");
  for (const s of manifest.stages.pipeline) {
    push(
      `| ${s.stage_number} | \`${s.id}\` | ${s.execution_pattern} | ` +
        `${s.feeds_into.map((f) => `\`${f}\``).join(", ")} |`,
    );
  }
  push();

  return lines.join("\n") + "\n";
}

// ── Entry points ───────────────────────────────────────────────────────────

/** Generate all kernel exports in-memory. Returns { relPath: content }. */
export function generateKernel(repoRoot) {
  const sources = loadKernelSources(repoRoot);
  const issues = validateKernelSources(repoRoot, sources);
  if (issues.length > 0) {
    throw new Error(`Kernel sources invalid:\n${issues.join("\n")}`);
  }
  const manifest = buildKernelManifest(sources);
  const projection = buildSchemaProjection(sources, manifest);
  return {
    "spec/generated/manifest.json": `${JSON.stringify(manifest, null, 2)}\n`,
    "spec/generated/reference.md": buildReference(manifest, sources.ruleBodies),
    "spec/generated/schema-projection.json": `${JSON.stringify(projection, null, 2)}\n`,
  };
}

/** Write the kernel exports to disk. */
export function writeKernel(repoRoot) {
  const files = generateKernel(repoRoot);
  mkdirSync(join(repoRoot, "spec", "generated"), { recursive: true });
  for (const [relPath, content] of Object.entries(files)) {
    writeFileSync(join(repoRoot, relPath), content, "utf8");
  }
  return Object.keys(files);
}

/**
 * Compare regenerated exports against the committed files. Returns issue
 * strings — stale (source changed, exports not regenerated) and hand-edited
 * files both surface as byte diffs.
 */
export function checkKernelFreshness(repoRoot) {
  const issues = [];
  let files;
  try {
    files = generateKernel(repoRoot);
  } catch (err) {
    return [`KERNEL  ${err.message}`];
  }
  for (const [relPath, expected] of Object.entries(files)) {
    let actual;
    try {
      actual = readFileSync(join(repoRoot, relPath), "utf8").replace(/\r\n/g, "\n");
    } catch {
      issues.push(`KERNEL  ${relPath}  missing — run \`npm run kernel\``);
      continue;
    }
    if (actual !== expected.replace(/\r\n/g, "\n")) {
      issues.push(
        `KERNEL  ${relPath}  stale or hand-edited — regenerate with \`npm run kernel\``,
      );
    }
  }
  return issues;
}
