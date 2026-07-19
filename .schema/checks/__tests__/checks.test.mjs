import { describe, it, expect } from "vitest";
import {
  slugify,
  headingSlugs,
  stripFences,
  stripCode,
  extractLinks,
  extractCommentMdPaths,
} from "../lib.mjs";
import { findRetired } from "../retired-vocab.mjs";
import { parseIndexSections } from "../index-counts.mjs";
import { parseIndexTables, indexOrderIssues } from "../index-order.mjs";
import { parseStamp, stampFormatIssues } from "../stamps.mjs";
import { extractFloorTable, floorTableIssues } from "../floor-table.mjs";
import {
  parseFrameworkIncludes,
  shipsListTokens,
  shipListIssues,
} from "../ship-list.mjs";
import {
  specAlwaysSet,
  operatorStandingRows,
  funcGroupIssues,
} from "../func-group.mjs";
import {
  requiredGatesCallout,
  howAiHelpsSection,
  oversightPara,
  executionPinHits,
} from "../callout.mjs";
import {
  parseRuleSpans,
  headingRiderIssue,
  extractIdTokens,
  registryPrefixes,
} from "../../../scripts/release/kernel/markers.mjs";

describe("slugify (GitHub rules)", () => {
  it("drops an em-dash, leaving the two flanking spaces as --", () => {
    expect(slugify("Authority — who may decide")).toBe(
      "authority--who-may-decide",
    );
  });
  it("drops a colon", () => {
    expect(slugify("Lights-Out: the far end of the spectrum")).toBe(
      "lights-out-the-far-end-of-the-spectrum",
    );
  });
  it("drops the period in a numbered heading", () => {
    expect(slugify("5.3 Acceptance Testing")).toBe("53-acceptance-testing");
  });
  it("keeps internal hyphens", () => {
    expect(slugify("Re-Size as the Project Evolves")).toBe(
      "re-size-as-the-project-evolves",
    );
  });
  it("drops backticks (inline code in a heading)", () => {
    expect(slugify("Using `npm` here")).toBe("using-npm-here");
  });
});

describe("headingSlugs", () => {
  it("suffixes duplicate headings -1, -2", () => {
    const s = headingSlugs(
      "# A\n## Supervised\n## Supervised\n## Supervised\n",
    );
    expect(s.has("supervised")).toBe(true);
    expect(s.has("supervised-1")).toBe(true);
    expect(s.has("supervised-2")).toBe(true);
  });
  it("ignores headings inside fenced code", () => {
    const s = headingSlugs("# Real\n```\n## Fake\n```\n");
    expect(s.has("real")).toBe(true);
    expect(s.has("fake")).toBe(false);
  });
  it("indexes deep headings (####)", () => {
    expect(headingSlugs("#### ADR Publishing\n").has("adr-publishing")).toBe(
      true,
    );
  });
});

describe("stripFences / stripCode", () => {
  it("blanks inline code spans", () => {
    expect(stripCode("see `x.md` here").includes("x.md")).toBe(false);
  });
  it("blanks fenced blocks but preserves line count", () => {
    const out = stripFences("a\n```\nfenced\n```\nb");
    expect(out.split("\n").length).toBe(5);
    expect(out.includes("fenced")).toBe(false);
  });
});

describe("extractLinks", () => {
  it("captures the target and ignores titles", () => {
    const links = extractLinks('[x](../a.md#sec "title") and [y](#z)');
    expect(links.map((l) => l.target)).toEqual(["../a.md#sec", "#z"]);
  });
});

describe("extractCommentMdPaths", () => {
  it("finds explicitly-relative md paths inside HTML comments", () => {
    const out = extractCommentMdPaths(
      "<!-- see ../stages/initiation/reference.md#x -->",
    );
    expect(out[0].path).toBe("../stages/initiation/reference.md");
  });
  it("ignores bare (non-relative) md paths — prose identifiers, not links", () => {
    expect(
      extractCommentMdPaths("<!-- keep in sync with guides/framework.md -->"),
    ).toEqual([]);
  });
});

describe("findRetired", () => {
  it("flags a retired term in live prose", () => {
    expect(
      findRetired("Use the Human-Led posture.\n").some(
        (h) => h.term === "Human-Led",
      ),
    ).toBe(true);
  });
  it("ignores a retired term inside ## Notes", () => {
    const hits = findRetired(
      "Live.\n\n## Notes\n- renamed Human-Led to Humans.\n",
    );
    expect(hits.some((h) => h.term === "Human-Led")).toBe(false);
  });
  it("ignores a retired term in a migration callout", () => {
    const hits = findRetired("> If you used v0.48, Human-Led is now Humans.\n");
    expect(hits.some((h) => h.term === "Human-Led")).toBe(false);
  });
  it("ignores a retired term shown inside code", () => {
    expect(findRetired("Example: `Human-Led`.\n").length).toBe(0);
  });
  it("reports a 1-based line number", () => {
    const hits = findRetired("line one\nuse AI operating tier here\n");
    expect(hits[0].line).toBe(2);
  });
});

describe("parseIndexSections", () => {
  it("counts table rows vs the declared heading count", () => {
    const md =
      "## Guides (2)\n\n| F | D |\n| --- | --- |\n| a | x |\n| b | y |\n\n## Spec (1)\n\n| F | D |\n| --- | --- |\n| c | z |\n";
    const secs = parseIndexSections(md);
    const g = secs.find((s) => s.name === "Guides");
    expect(g.declared).toBe(2);
    expect(g.rows).toBe(2);
    expect(secs.find((s) => s.name === "Spec").rows).toBe(1);
  });
});

describe("parseIndexTables", () => {
  it("captures the first-column path of each data row, per table", () => {
    const md =
      "| Path | D |\n| --- | --- |\n| `guides/a.md` | x |\n| `guides/b.md` | y |\n";
    const tables = parseIndexTables(md);
    expect(tables).toHaveLength(1);
    expect(tables[0].rows.map((r) => r.path)).toEqual([
      "guides/a.md",
      "guides/b.md",
    ]);
  });
});

describe("indexOrderIssues", () => {
  const table = (...rows) =>
    "| Path | D |\n| --- | --- |\n" +
    rows.map((p) => `| \`${p}\` | x |\n`).join("");

  it("passes a table already in file-path order", () => {
    expect(
      indexOrderIssues(table("guides/adoption.md", "guides/bootstrap.md")),
    ).toEqual([]);
  });

  it("flags a row that sorts before its predecessor", () => {
    const issues = indexOrderIssues(
      table("guides/framework.md", "guides/bootstrap.md"),
    );
    expect(issues).toHaveLength(1);
    expect(issues[0]).toContain(
      "guides/bootstrap.md out of file-path sort order",
    );
  });

  it("strips the .md extension so a base file precedes its hyphen-suffixed sibling", () => {
    // With the extension kept, '.'(46) > '-'(45) would call this out of order.
    expect(
      indexOrderIssues(
        table("guides/brownfield.md", "guides/brownfield-approach.md"),
      ),
    ).toEqual([]);
  });

  it("exempts README from the sequence — first (Spec-style) is fine", () => {
    expect(
      indexOrderIssues(
        table(
          "spec/README.md",
          "spec/canonical-state.md",
          "spec/delegated-run.md",
        ),
      ),
    ).toEqual([]);
  });

  it("exempts README from the sequence — mid-table (stage-style) is fine", () => {
    expect(
      indexOrderIssues(
        table(
          "stages/x/checklist.md",
          "stages/x/README.md",
          "stages/x/reference.md",
        ),
      ),
    ).toEqual([]);
  });

  it("checks each table independently (stage-grouped pipeline order not flagged)", () => {
    const md =
      table("stages/initiation/README.md", "stages/initiation/reference.md") +
      "\n" +
      table(
        "stages/requirements/README.md",
        "stages/requirements/reference.md",
      );
    expect(indexOrderIssues(md)).toEqual([]);
  });
});

describe("parseStamp", () => {
  it("reads a Notes stamp with a trailing free-text suffix", () => {
    expect(
      parseStamp("## Notes\n**Last Updated:** 2026-06-21 — v0.49 sweep\n"),
    ).toBe("2026-06-21");
  });
  it("reads a template footer stamp", () => {
    expect(
      parseStamp("<!-- Template Last Updated: 2026-06-20 | added v0.47 -->"),
    ).toBe("2026-06-20");
  });
  it("returns null when absent", () => {
    expect(parseStamp("no stamp here")).toBe(null);
  });
});

describe("stampFormatIssues", () => {
  it("passes a bare-date stamp and canonical 'Added to framework' line", () => {
    expect(
      stampFormatIssues(
        "**Last Updated:** 2026-06-21\n\nAdded to framework in v0.49.0.\n",
      ),
    ).toEqual([]);
  });
  it("flags trailing change-history on the Last Updated line", () => {
    const issues = stampFormatIssues(
      "**Last Updated:** 2026-06-21 — v0.49 sweep: renamed X\n",
    );
    expect(issues).toHaveLength(1);
    expect(issues[0]).toContain("must be a bare date");
  });
  it("exempts a pipe-delimited structured continuation (INDEX header)", () => {
    expect(
      stampFormatIssues(
        "**Last Updated:** 2026-06-28 | **Framework Version:** 0.52.0\n",
      ),
    ).toEqual([]);
  });
  it("flags 'Added to the framework' (stray 'the')", () => {
    const issues = stampFormatIssues(
      "**Last Updated:** 2026-06-21\n\nAdded to the framework in v0.49.0.\n",
    );
    expect(issues.some((i) => i.includes("'Added to the framework'"))).toBe(
      true,
    );
  });
  it("leaves the template footer form (no markdown stamp line) alone", () => {
    expect(
      stampFormatIssues(
        "<!-- Template Last Updated: 2026-06-20 | added v0.47 -->\n",
      ),
    ).toEqual([]);
  });
  it("exempts template fill-in lines (placeholder date, trailing fields)", () => {
    expect(
      stampFormatIssues("**Last Updated:** YYYY-MM-DD **Increment:** [name]\n"),
    ).toEqual([]);
    expect(stampFormatIssues("**Last Updated:** YYYY-MM-DD HH:MM\n")).toEqual(
      [],
    );
  });
});

describe("floor-table consistency", () => {
  // Minimal spec/guide pair: same floor values, intentionally different headers.
  const specMd =
    "## Floors\n\n" +
    "| Consequence | Assurance floor (min) | Lights-Out | Preset |\n" +
    "| --- | --- | --- | --- |\n" +
    "| Negligible | None | eligible | off-grid |\n" +
    "| Low | Self | eligible | Minimal |\n" +
    "| Moderate | Internal, else Self | eligible, bounded pauses | Standard |\n" +
    "| High | Internal (required) | gated | Enterprise |\n" +
    "| Critical | Internal (required) | up to gates | off-grid |\n";
  const rsMd = (moderate) =>
    "> [Informative]\n\n" +
    "| Consequence | Required Assurance floor | Lights-Out | Governance-weight preset |\n" +
    "| --- | --- | --- | --- |\n" +
    "| **Negligible** | None | eligible | off-grid |\n" +
    "| **Low** | Self | eligible | Minimal |\n" +
    `| **Moderate** | ${moderate} | eligible, bounded pauses | Standard |\n` +
    "| **High** | Internal (required) | gated | Enterprise |\n" +
    "| **Critical** | Internal (required) | up to gates | off-grid |\n";

  it("finds the floor table by its Lights-Out + floor header (ignores other tables)", () => {
    const withDecoy =
      "| Consequence | Reach |\n| --- | --- |\n| Negligible | nobody |\n\n" +
      specMd;
    const t = extractFloorTable(withDecoy);
    expect(t.get("moderate")[1]).toBe("Internal, else Self");
    expect(t.has("negligible")).toBe(true);
  });

  it("is not fooled by a body row naming Lights-Out and floor (OMG-016 bundle row)", () => {
    const withBundleTable =
      "| Operating preset | Settings (default bundle) | Minimum coverage |\n" +
      "| --- | --- | --- |\n" +
      "| **Supervised** | short steps, human-reviewed | none |\n" +
      "| **Lights-Out** | pauses only where a floor forces a gate | continuity |\n\n" +
      specMd;
    const t = extractFloorTable(withBundleTable);
    expect(t).not.toBeNull();
    expect(t.get("moderate")[1]).toBe("Internal, else Self");
  });

  it("still finds the floor table when it is indented inside a rule body", () => {
    const indented = specMd
      .split("\n")
      .map((l) => (l.startsWith("|") ? `  ${l}` : l))
      .join("\n");
    const t = extractFloorTable(indented);
    expect(t).not.toBeNull();
    expect(t.has("critical")).toBe(true);
  });

  it("passes when floor values match despite different headers and bold", () => {
    expect(floorTableIssues(specMd, rsMd("Internal, else Self"))).toEqual([]);
  });

  it("flags a diverged floor cell", () => {
    const issues = floorTableIssues(specMd, rsMd("Internal"));
    expect(issues).toHaveLength(1);
    expect(issues[0]).toContain("'moderate'");
  });
});

describe("ship-list (I-ship)", () => {
  const ts =
    'const FRAMEWORK_INCLUDES = [\n  "guides",\n  "spec",\n  "stages",\n' +
    '  "templates",\n  "INDEX.md",\n  "QUICKSTART.md",\n  "README.md",\n' +
    '  "VERSION",\n];';

  it("parses the FRAMEWORK_INCLUDES array literal", () => {
    expect(parseFrameworkIncludes(ts)).toEqual([
      "guides",
      "spec",
      "stages",
      "templates",
      "INDEX.md",
      "QUICKSTART.md",
      "README.md",
      "VERSION",
    ]);
  });

  it("extracts layer tokens, dropping multi-segment paths and manifest.json", () => {
    const toks = shipsListTokens(
      "`dist/framework-vX.Y.Z.zip` `guides/`, `spec/`, `INDEX.md`, `manifest.json`",
    );
    expect([...toks].sort()).toEqual(["INDEX.md", "guides", "spec"]);
  });

  const block = (...layers) =>
    "- A **packaged zip** (`dist/framework-vX.Y.Z.zip`) containing only the " +
    "framework surface — <!-- ships-list -->" +
    layers.map((l) => `\`${l}\``).join(", ") +
    ", plus a generated `manifest.json`.";

  it("passes a complete ships-list", () => {
    const md = block(
      "guides/",
      "spec/",
      "stages/",
      "templates/",
      "INDEX.md",
      "QUICKSTART.md",
      "README.md",
      "VERSION",
    );
    expect(
      shipListIssues(ts, [{ file: "CONTRIBUTING.md", content: md }]).fatal,
    ).toEqual([]);
  });

  it("flags a ships-list missing the spec/ layer (R13)", () => {
    const md = block(
      "guides/",
      "stages/",
      "templates/",
      "INDEX.md",
      "QUICKSTART.md",
      "README.md",
      "VERSION",
    );
    const { fatal } = shipListIssues(ts, [
      { file: "CONTRIBUTING.md", content: md },
    ]);
    expect(fatal).toHaveLength(1);
    expect(fatal[0]).toContain("missing: spec");
  });

  it("warns (does not fail) when no sentinel is present", () => {
    const { fatal, warn } = shipListIssues(ts, [
      { file: "x.md", content: "no marker here" },
    ]);
    expect(fatal).toEqual([]);
    expect(warn.some((w) => w.includes("ships-list"))).toBe(true);
  });
});

describe("func-group (H-funcgroup)", () => {
  const spec =
    "- **Standing functions** (no setting): evidence capture; escalation and " +
    "stop enforcement; orchestration; run continuity.\n" +
    "- Evidence capture and stop enforcement MUST always be treated as " +
    "required. Orchestration and integration are required only when parallel " +
    "execution applies; run continuity and completion are required only when " +
    "delegated runs apply.\n";

  const table = (stopCell) =>
    "| Operating function | What it covers | Operator configures? |\n" +
    "| --- | --- | --- |\n" +
    "| **Work execution** | Producing the work | Yes → Work Execution setting |\n" +
    "| **Evidence capture** | Recording | No — standing |\n" +
    `| **Escalation & stop enforcement** | Halting | ${stopCell} |\n` +
    "| **Orchestration & integration** | Coordinating | No — standing (parallel batches) |\n" +
    "| **Run continuity & completion** | Persisting | No — standing (delegated runs) |\n";

  it("reads the always-required set from the spec", () => {
    const s = specAlwaysSet(spec);
    expect(s.has("evidence")).toBe(true);
    expect(s.has("stop")).toBe(true);
    expect(s.has("orchestration")).toBe(false);
  });

  it("finds the four standing rows (skips the configurable row)", () => {
    const rows = operatorStandingRows(table("No — standing"));
    expect(rows.map((r) => r.key)).toEqual([
      "evidence",
      "stop",
      "orchestration",
      "continuity",
    ]);
  });

  it("passes when standing-row qualifiers match the spec grouping", () => {
    expect(funcGroupIssues(spec, table("No — standing")).fatal).toEqual([]);
  });

  it("flags a conditional qualifier on an always-required function (R15)", () => {
    const { fatal } = funcGroupIssues(
      spec,
      table("No — standing (unattended runs)"),
    );
    expect(fatal).toHaveLength(1);
    expect(fatal[0]).toContain("stop enforcement");
  });
});

describe("callout (G-callout)", () => {
  it("extracts the Required gates callout blockquote", () => {
    const md =
      "intro\n\n> **Required gates:** Human approval — humans own all\n> decisions.\n\nafter";
    expect(requiredGatesCallout(md).text).toContain("Required gates");
  });

  it("execution-pin: flags a human-subject execution verb (R14)", () => {
    expect(
      executionPinHits(
        "Human execution required — humans execute deployment steps.",
      ).length,
    ).toBeGreaterThan(0);
  });

  it("execution-pin: conforms when the execute verb's subject is AI", () => {
    expect(
      executionPinHits(
        "AI drafts, executes within the path; humans own the decision.",
      ),
    ).toEqual([]);
  });

  it("execution-pin: ignores callouts with no execution verb", () => {
    expect(
      executionPinHits("AI produces drafts; humans own all decisions."),
    ).toEqual([]);
  });

  it("finds the How AI Helps section", () => {
    expect(
      howAiHelpsSection("## How AI Helps\n\nBody.\n\n## Next\n").text,
    ).toContain("How AI Helps");
  });

  it("finds the Oversight paragraph", () => {
    const md =
      "x\n\n**Oversight at this stage.** Folds into Authority. See the [guide](../../guides/operating-model.md).\n\ny";
    expect(oversightPara(md).text).toContain("Oversight at this stage");
  });
});

describe("parseRuleSpans (rule-body markers)", () => {
  const body = "### DR-005 — Run lifecycle machine\n\nThe contract text.";
  const doc = `intro\n\n<!-- rule: DR-005 -->\n${body}\n<!-- /rule: DR-005 -->\n`;

  it("extracts a well-formed span with a trimmed body", () => {
    const { spans, issues } = parseRuleSpans(doc);
    expect(issues).toEqual([]);
    expect(spans).toHaveLength(1);
    expect(spans[0].id).toBe("DR-005");
    expect(spans[0].body).toBe(body);
    expect(spans[0].openLine).toBe(3);
  });

  it("flags a close with no open", () => {
    const { spans, issues } = parseRuleSpans("<!-- /rule: DR-005 -->\n");
    expect(spans).toEqual([]);
    expect(issues[0]).toMatch(/close marker for DR-005 with no open/);
  });

  it("flags an open never closed", () => {
    const { issues } = parseRuleSpans("<!-- rule: DR-005 -->\ntext\n");
    expect(issues[0]).toMatch(/never closed/);
  });

  it("flags a mismatched close", () => {
    const { spans, issues } = parseRuleSpans(
      "<!-- rule: DR-005 -->\ntext\n<!-- /rule: CS-007 -->\n",
    );
    expect(spans).toEqual([]);
    expect(issues[0]).toMatch(
      /close marker for CS-007 does not match open marker for DR-005/,
    );
  });

  it("flags a nested open (spans are flat)", () => {
    const { issues } = parseRuleSpans(
      "<!-- rule: DR-005 -->\n<!-- rule: CS-007 -->\ntext\n<!-- /rule: CS-007 -->\n",
    );
    expect(issues.some((i) => /nesting is disallowed/.test(i))).toBe(true);
  });

  it("ignores example markers inside fenced code blocks", () => {
    const fenced =
      "```markdown\n<!-- rule: XX-001 -->\nexample\n<!-- /rule: XX-001 -->\n```\n";
    const { spans, issues } = parseRuleSpans(fenced + doc);
    expect(issues).toEqual([]);
    expect(spans.map((s) => s.id)).toEqual(["DR-005"]);
  });

  it("returns duplicate spans for the caller to adjudicate", () => {
    const { spans, issues } = parseRuleSpans(doc + "\n" + doc);
    expect(issues).toEqual([]);
    expect(spans.map((s) => s.id)).toEqual(["DR-005", "DR-005"]);
  });
});

describe("headingRiderIssue (visible ID token — the Q2 rider)", () => {
  it("passes a body opening with the ID heading", () => {
    expect(
      headingRiderIssue("DR-005", "### DR-005 — Run lifecycle machine\n\ntext"),
    ).toBeNull();
  });
  it("fails a body whose first line is prose", () => {
    expect(headingRiderIssue("DR-005", "The contract text.")).toMatch(
      /visible ID heading/,
    );
  });
  it("fails a heading carrying the wrong ID", () => {
    expect(headingRiderIssue("DR-005", "### CS-007 — Wrong rule")).toMatch(
      /visible ID heading/,
    );
  });
  it("fails an empty body", () => {
    expect(headingRiderIssue("DR-005", "")).toMatch(/empty/);
  });
  it("accepts a sub-ID heading (AW-004a)", () => {
    expect(
      headingRiderIssue("AW-004a", "### AW-004a — Never fronted as menus"),
    ).toBeNull();
  });
});

describe("extractIdTokens (C11 citation scan)", () => {
  const prefixes = ["AW", "CS", "DR"];

  it("finds registered-prefix tokens, including sub-IDs", () => {
    const tokens = extractIdTokens("see DR-005 and `AW-004a` here", prefixes);
    expect(tokens.map((t) => t.token)).toEqual(["DR-005", "AW-004a"]);
  });

  it("skips unregistered prefixes (template placeholders, foreign identifiers)", () => {
    expect(extractIdTokens("INC-001, AES-256, REQ-001", prefixes)).toEqual([]);
  });

  it("does not match 2-digit handles or 4-digit identifiers", () => {
    expect(
      extractIdTokens("CP-01 and ISO-8601 and DR-0055", ["CP", "ISO", "DR"]),
    ).toEqual([]);
  });

  it("blanks marker comments — a marker ID is not a citation", () => {
    const doc =
      "<!-- rule: DR-005 -->\n### DR-005 — Title\n<!-- /rule: DR-005 -->";
    expect(extractIdTokens(doc, prefixes).map((t) => t.token)).toEqual([
      "DR-005",
    ]);
  });
});

describe("registryPrefixes", () => {
  it("collects the sorted prefix set from rule IDs", () => {
    expect(
      registryPrefixes(["DR-005", "CS-007", "OMG-002", "AW-004a"]),
    ).toEqual(["AW", "CS", "DR", "OMG"]);
  });
});

import {
  outcomeSets,
  normalizeValue,
  lineValues,
  boldLabels,
  untaggedRestatement,
  exampleTypeOutcome,
  checkpointOutcomeIssues,
} from "../checkpoint-outcomes.mjs";

describe("checkpoint-outcomes guard (CKPT)", () => {
  const SETS = {
    gate: new Set(["proceed", "proceed-with-conditions", "revise", "stop"]),
    review: new Set(["ready", "not-ready"]),
    alignment: new Set(["aligned", "adjustments-needed"]),
  };

  it("parses the three outcome sets from checkpoints.yaml", () => {
    const yaml = [
      "vocabularies:",
      "  gate_outcome:",
      "    values: [proceed, stop]",
      "  review_outcome:",
      "    values: [ready, not-ready]",
      "  alignment_outcome:",
      "    values: [aligned, adjustments-needed]",
    ].join("\n");
    const sets = outcomeSets(yaml);
    expect([...sets.gate]).toEqual(["proceed", "stop"]);
    expect(Object.keys(sets)).toEqual(["gate", "review", "alignment"]);
  });

  it("normalizes display values to kebab identifiers", () => {
    expect(normalizeValue("Proceed with conditions")).toBe(
      "proceed-with-conditions",
    );
    expect(normalizeValue("Not Ready — [reason and action needed]")).toBe(
      "not-ready",
    );
    expect(normalizeValue("[Ready]")).toBe("ready");
  });

  it("extracts values from bold-label and heading-label lines", () => {
    expect(lineValues("**Decision:** Ready / Not Ready")).toEqual([
      "ready",
      "not-ready",
    ]);
    expect(lineValues("## Decision: Proceed / Revise")).toEqual([
      "proceed",
      "revise",
    ]);
    expect(lineValues("**Gate 1 implication:**")).toEqual([]);
    expect(lineValues("plain prose")).toBeNull();
  });

  it("passes a tagged line whose values are in the set", () => {
    const doc =
      "**Decision:** Ready / Not Ready <!-- checkpoint-outcome: review -->";
    expect(checkpointOutcomeIssues("stages/x/checklist.md", doc, SETS)).toEqual(
      [],
    );
  });

  it("M-8 regression: a Review outcome collapsed into the lifecycle terminal", () => {
    const doc =
      "**Decision:** Closed / Not Closed <!-- checkpoint-outcome: review -->";
    const issues = checkpointOutcomeIssues(
      "stages/closure/checklist.md",
      doc,
      SETS,
    );
    expect(issues).toHaveLength(1);
    expect(issues[0]).toContain("off-canon review outcome");
    expect(issues[0]).toContain("closed, not-closed");
  });

  it("M-4 regression: an invented Gate 1 checkbox vocabulary", () => {
    const doc = [
      "**Gate 1 implication:** <!-- checkpoint-outcome: gate -->",
      "",
      "- [ ] Proceed — cost negligible",
      "- [ ] Proceed with prep — approved as prerequisite; include in scope",
      "      and estimates",
      "- [ ] Postpone — revisit when [condition]",
      "- [ ] Abandon — not justified",
    ].join("\n");
    const issues = checkpointOutcomeIssues(
      "templates/initiation-brief.md",
      doc,
      SETS,
    );
    expect(issues).toHaveLength(1);
    expect(issues[0]).toContain("proceed-with-prep, postpone, abandon");
  });

  it("M-5 regression: a status axis on a decision-record template", () => {
    const doc =
      "**Status:** Pending / Approved / Held / Rejected / Rolled Back";
    const issues = checkpointOutcomeIssues(
      "templates/checkpoint-decision.md",
      doc,
      SETS,
    );
    expect(issues).toHaveLength(1);
    expect(issues[0]).toContain("no status axis");
  });

  it("allows a Status axis outside the two decision-record templates", () => {
    const doc = "**Status:** [Open / Triaged / Resolved / Won't Fix]";
    expect(
      checkpointOutcomeIssues("templates/friction-log.md", doc, SETS),
    ).toEqual([]);
  });

  it("flags an untagged value-carrying Decision line", () => {
    const doc = "**Decision:** Ready / Not Ready";
    const issues = checkpointOutcomeIssues("stages/x/checklist.md", doc, SETS);
    expect(issues).toHaveLength(1);
    expect(issues[0]).toContain("untagged");
  });

  it("standalone sentinel above a heading targets the heading (anchor-safe)", () => {
    const doc = [
      "<!-- checkpoint-outcome: gate -->",
      "",
      "## Decision: Proceed / Proceed with conditions / Revise / Stop",
    ].join("\n");
    expect(
      checkpointOutcomeIssues("templates/gate-decision.md", doc, SETS),
    ).toEqual([]);
  });

  it("ignores Decision lines inside fences and comments", () => {
    const doc = [
      "```markdown",
      "**Decision:** Anything / Goes",
      "```",
      "<!-- e.g. record with '## Decision: Approved / Held' inline",
      "**Decision:** Foo / Bar -->",
    ].join("\n");
    expect(checkpointOutcomeIssues("templates/x.md", doc, SETS)).toEqual([]);
  });

  it("flags an unknown sentinel type", () => {
    const doc = "**Decision:** Ready <!-- checkpoint-outcome: quality -->";
    const issues = checkpointOutcomeIssues("templates/x.md", doc, SETS);
    expect(issues).toHaveLength(1);
    expect(issues[0]).toContain('unknown checkpoint-outcome type "quality"');
  });
});

// The two Sweep-2 majors that shipped through the first trigger, which matched
// only a line-initial `**Decision:**`.
describe("checkpoint-outcomes widened trigger (Sweep-2 holes)", () => {
  const SETS = {
    gate: new Set(["proceed", "proceed-with-conditions", "revise", "stop"]),
    review: new Set(["ready", "not-ready"]),
    alignment: new Set(["aligned", "adjustments-needed"]),
  };

  it("M-10 regression: an invented Review outcome in an example label", () => {
    const doc =
      '- _Example (Review, Ready with conditions):_ "Operations accepts ownership"';
    const issues = checkpointOutcomeIssues(
      "templates/checkpoint-decision.md",
      doc,
      SETS,
    );
    expect(issues).toHaveLength(1);
    expect(issues[0]).toContain("off-canon review outcome value");
    expect(issues[0]).toContain("ready-with-conditions");
  });

  it("M-10 fixed form and the gate labels beside it pass", () => {
    const doc = [
      '- _Example (Review, Ready — conditions recorded):_ "Operations accepts"',
      '- _Example (Review, Not Ready):_ "Address blockers"',
      '- _Example (Gate 1, Proceed with conditions):_ "Preparation approved"',
      '- _Example (Gate 2, Stop):_ "Archive project artifacts"',
      // No checkpoint type declared — not an outcome label at all.
      '- _Example (Deployment):_ "Verification brief, rollback plan"',
      '- _Example (Conditional Go):_ "Proceed with feature work"',
    ].join("\n");
    expect(checkpointOutcomeIssues("templates/x.md", doc, SETS)).toEqual([]);
  });

  it("M-17 regression: a status axis on a gate decision, in a table cell", () => {
    const doc =
      "| **Gate Status**    | [Pending / Approved / Rejected — Approver: name] |";
    const issues = checkpointOutcomeIssues(
      "templates/session-log.md",
      doc,
      SETS,
    );
    expect(issues).toHaveLength(1);
    expect(issues[0]).toContain("no status axis");
  });

  it("M-17 fixed form passes — a held/not-held tracker is not a status axis", () => {
    const doc = [
      "| **Stage Status**   | [Not Started / In Progress / Blocked / Complete] |",
      "| **Gate decision**  | [Not yet held / Held — outcome rides in the gate-decision record (link)] |",
    ].join("\n");
    expect(
      checkpointOutcomeIssues("templates/session-log.md", doc, SETS),
    ).toEqual([]);
  });

  it("flags an untagged restatement under a wider label, in a list item", () => {
    const doc =
      "- **AppSec recommendation:** [Proceed / Proceed with conditions / Revise]";
    const issues = checkpointOutcomeIssues(
      "templates/gate-decision.md",
      doc,
      SETS,
    );
    expect(issues).toHaveLength(1);
    expect(issues[0]).toContain("untagged");
  });

  it("does not read a single-value prose gloss as a set restatement", () => {
    const doc = [
      "**Recommendation:** (the preparation-specific next step this routes to)",
      "- **Decision makers:**",
      "- **Decision being made:** (what is being decided)",
      "**Decision Authority:** [Name, Role]",
    ].join("\n");
    expect(checkpointOutcomeIssues("templates/x.md", doc, SETS)).toEqual([]);
  });

  it("a bare sentinel above a checkbox block tags that block", () => {
    const doc = [
      "> **If items are unchecked, address before proceeding.**",
      "",
      "<!-- checkpoint-outcome: review -->",
      "",
      "- [ ] **Ready** — All items checked; proceed to System Design",
      "- [ ] **Not Ready** — Address weak items and re-check",
    ].join("\n");
    expect(
      checkpointOutcomeIssues("stages/requirements/checklist.md", doc, SETS),
    ).toEqual([]);
  });

  it("that block form still fails on an off-canon value", () => {
    const doc = [
      "<!-- checkpoint-outcome: review -->",
      "",
      "- [ ] **Ready for System Design** — All items checked",
      "- [ ] **Not Ready** — Address weak items",
    ].join("\n");
    const issues = checkpointOutcomeIssues(
      "stages/requirements/checklist.md",
      doc,
      SETS,
    );
    expect(issues).toHaveLength(1);
    expect(issues[0]).toContain("ready-for-system-design");
  });

  it("sees restatements in a CRLF working-tree file", () => {
    const doc = ["**Decision:** Ready / Not Ready", "", "more"].join("\r\n");
    const issues = checkpointOutcomeIssues("stages/x/checklist.md", doc, SETS);
    expect(issues).toHaveLength(1);
    expect(issues[0]).toContain("untagged");
  });

  it("parses labels and example parentheticals", () => {
    expect(boldLabels("| **Gate Status** | x |")).toEqual(["gate status"]);
    expect(boldLabels("**Decision (Review):** Ready")).toEqual(["decision"]);
    expect(untaggedRestatement("**Decision:** Ready")).toEqual(["ready"]);
    expect(untaggedRestatement("**Rationale:** a / b")).toBeNull();
    expect(exampleTypeOutcome("_Example (Gate 1, Proceed):_ x")).toEqual([
      "gate",
      "proceed",
    ]);
    expect(exampleTypeOutcome("_Example (Deployment):_ x")).toBeNull();
  });
});

describe("checkpoint-outcomes sentinel wrap form", () => {
  const SETS = {
    gate: new Set(["proceed", "proceed-with-conditions", "revise", "stop"]),
    review: new Set(["ready", "not-ready"]),
    alignment: new Set(["aligned", "adjustments-needed"]),
  };

  it("a prettier-wrapped sentinel targets the labeled line above it", () => {
    const doc = [
      "- **Decision type (choose one):**",
      "  - **Alignment:** Aligned / Adjustments Needed",
      "    <!-- checkpoint-outcome: alignment -->",
      "- **Rationale:** (why this decision was made)",
    ].join("\n");
    expect(checkpointOutcomeIssues("templates/x.md", doc, SETS)).toEqual([]);
  });

  it("the wrap form still fails on off-canon values above", () => {
    const doc = [
      "  - **Alignment:** Approved / Held",
      "    <!-- checkpoint-outcome: alignment -->",
    ].join("\n");
    const issues = checkpointOutcomeIssues("templates/x.md", doc, SETS);
    expect(issues).toHaveLength(1);
    expect(issues[0]).toContain("approved, held");
  });
});

describe("checkpoint-outcomes blank-separated sentinel", () => {
  const SETS = {
    gate: new Set(["proceed", "proceed-with-conditions", "revise", "stop"]),
    review: new Set(["ready", "not-ready"]),
    alignment: new Set(["aligned", "adjustments-needed"]),
  };

  it("a sentinel separated from its line above by a blank still targets it", () => {
    const doc = [
      "**Decision:** Proceed / Proceed with conditions / Revise / Stop",
      "",
      "<!-- checkpoint-outcome: gate -->",
      "",
      "**Decision makers:**",
    ].join("\n");
    expect(
      checkpointOutcomeIssues("templates/gate-decision.md", doc, SETS),
    ).toEqual([]);
  });

  it("still fails on off-canon values across the blank", () => {
    const doc = [
      "**Decision:** Approved / Held",
      "",
      "<!-- checkpoint-outcome: gate -->",
    ].join("\n");
    const issues = checkpointOutcomeIssues("templates/x.md", doc, SETS);
    expect(issues).toHaveLength(1);
    expect(issues[0]).toContain("approved, held");
  });
});

import {
  versionMarkers,
  changelogSection,
  retirementNoteIssues,
} from "../retirement-notes.mjs";

import { KNOWN_DIVERGENCES } from "../../../scripts/release/kernel/generate.mjs";
import { readFileSync as _readFileSync } from "node:fs";

describe("known divergences (unprojected consumer enums)", () => {
  const projection = JSON.parse(
    _readFileSync("spec/generated/schema-projection.json", "utf8"),
  );

  it("every entry carries the fields the report renders", () => {
    for (const d of KNOWN_DIVERGENCES) {
      expect(Array.isArray(d.consumer_enums)).toBe(true);
      expect(d.consumer_enums.length).toBeGreaterThan(0);
      for (const f of ["summary", "why_unprojected", "decision_home"]) {
        expect(typeof d[f]).toBe("string");
        expect(d[f].length).toBeGreaterThan(0);
      }
    }
  });

  it("a divergence is never also projected — the two claims contradict", () => {
    // If an enum is projected, compare-schema enforces equivalence on it; a
    // known divergence asserts the opposite (held out pending a decision).
    const projected = new Set(Object.keys(projection.enums));
    for (const d of KNOWN_DIVERGENCES) {
      for (const e of d.consumer_enums) {
        expect(projected.has(e)).toBe(false);
      }
    }
  });

  it("ships in the generated projection so consumers see it too", () => {
    expect(projection.known_divergences).toEqual(KNOWN_DIVERGENCES);
  });
});

describe("retirement notes guard (RELNOTE)", () => {
  const ENTRIES = [
    {
      regex: "\\bmet.synthetic\\b",
      flags: "gi",
      replacement: "met (v0.64 — …)",
    },
    {
      regex: "\\bcancelled\\b",
      flags: "gi",
      replacement: "canceled (…, v0.59)",
    },
    { regex: "\\bunrelated\\b", flags: "g", replacement: "other (v0.61)" },
  ];
  const section = (body) =>
    `# Changelog\n\n## 0.64.0 (2026-07-19)\n\n${body}\n\n## 0.63.0 (2026-07-15)\n\nolder\n`;

  it("derives both the full and minor version markers", () => {
    expect(versionMarkers("0.64.0")).toEqual(["v0.64.0", "v0.64"]);
  });

  it("extracts only the section for the version asked for", () => {
    const s = changelogSection(section("- **spec:** a change"), "0.64.0");
    expect(s).toContain("a change");
    expect(s).not.toContain("older");
  });

  it("is silent before the release section exists", () => {
    const pre = "# Changelog\n\n## 0.63.0 (2026-07-15)\n\nolder\n";
    expect(retirementNoteIssues(ENTRIES, pre, "0.64.0")).toEqual([]);
    expect(changelogSection(pre, "0.64.0")).toBeNull();
  });

  it("flags a retirement missing from its release section", () => {
    const issues = retirementNoteIssues(
      ENTRIES,
      section("- **framework:** drained the sweep majors"),
      "0.64.0",
    );
    expect(issues).toHaveLength(1);
    expect(issues[0]).toContain("met.synthetic");
    expect(issues[0]).toContain("CHANGELOG.md");
  });

  it("passes once the section names the retired term", () => {
    const issues = retirementNoteIssues(
      ENTRIES,
      section("- **spec:** retired met-synthetic from the SC status set"),
      "0.64.0",
    );
    expect(issues).toEqual([]);
  });

  it("only gates retirements marked for the version being released", () => {
    // `cancelled` is a v0.59 retirement; a v0.64 release must not demand it.
    const issues = retirementNoteIssues(
      ENTRIES,
      section("- **spec:** retired met-synthetic"),
      "0.64.0",
    );
    expect(issues).toEqual([]);
  });

  it("reproduces the historical v0.59 miss that motivated the guard", () => {
    const v59 =
      "# Changelog\n\n## 0.59.0 (2026-07-10)\n\n- **spec:** other work\n";
    const issues = retirementNoteIssues(ENTRIES, v59, "0.59.0");
    expect(issues).toHaveLength(1);
    expect(issues[0]).toContain("cancelled");
  });
});
