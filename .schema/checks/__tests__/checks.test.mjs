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

describe("slugify (GitHub rules)", () => {
  it("drops an em-dash, leaving the two flanking spaces as --", () => {
    expect(slugify("Authority — who may decide")).toBe("authority--who-may-decide");
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
    expect(slugify("Re-Size as the Project Evolves")).toBe("re-size-as-the-project-evolves");
  });
  it("drops backticks (inline code in a heading)", () => {
    expect(slugify("Using `npm` here")).toBe("using-npm-here");
  });
});

describe("headingSlugs", () => {
  it("suffixes duplicate headings -1, -2", () => {
    const s = headingSlugs("# A\n## Supervised\n## Supervised\n## Supervised\n");
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
    expect(headingSlugs("#### ADR Publishing\n").has("adr-publishing")).toBe(true);
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
    const out = extractCommentMdPaths("<!-- see ../stages/initiation/reference.md#x -->");
    expect(out[0].path).toBe("../stages/initiation/reference.md");
  });
  it("ignores bare (non-relative) md paths — prose identifiers, not links", () => {
    expect(extractCommentMdPaths("<!-- keep in sync with guides/framework.md -->")).toEqual([]);
  });
});

describe("findRetired", () => {
  it("flags a retired term in live prose", () => {
    expect(findRetired("Use the Human-Led posture.\n").some((h) => h.term === "Human-Led")).toBe(
      true,
    );
  });
  it("ignores a retired term inside ## Notes", () => {
    const hits = findRetired("Live.\n\n## Notes\n- renamed Human-Led to Humans.\n");
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
    const md = "## Guides (2)\n\n| F | D |\n| --- | --- |\n| a | x |\n| b | y |\n\n## Spec (1)\n\n| F | D |\n| --- | --- |\n| c | z |\n";
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
    expect(tables[0].rows.map((r) => r.path)).toEqual(["guides/a.md", "guides/b.md"]);
  });
});

describe("indexOrderIssues", () => {
  const table = (...rows) =>
    "| Path | D |\n| --- | --- |\n" + rows.map((p) => `| \`${p}\` | x |\n`).join("");

  it("passes a table already in file-path order", () => {
    expect(indexOrderIssues(table("guides/adoption.md", "guides/bootstrap.md"))).toEqual([]);
  });

  it("flags a row that sorts before its predecessor", () => {
    const issues = indexOrderIssues(table("guides/framework.md", "guides/bootstrap.md"));
    expect(issues).toHaveLength(1);
    expect(issues[0]).toContain("guides/bootstrap.md out of file-path sort order");
  });

  it("strips the .md extension so a base file precedes its hyphen-suffixed sibling", () => {
    // With the extension kept, '.'(46) > '-'(45) would call this out of order.
    expect(
      indexOrderIssues(table("guides/brownfield.md", "guides/brownfield-approach.md")),
    ).toEqual([]);
  });

  it("exempts README from the sequence — first (Spec-style) is fine", () => {
    expect(
      indexOrderIssues(table("spec/README.md", "spec/canonical-state.md", "spec/delegated-run.md")),
    ).toEqual([]);
  });

  it("exempts README from the sequence — mid-table (stage-style) is fine", () => {
    expect(
      indexOrderIssues(
        table("stages/x/checklist.md", "stages/x/README.md", "stages/x/reference.md"),
      ),
    ).toEqual([]);
  });

  it("checks each table independently (stage-grouped pipeline order not flagged)", () => {
    const md =
      table("stages/initiation/README.md", "stages/initiation/reference.md") +
      "\n" +
      table("stages/requirements/README.md", "stages/requirements/reference.md");
    expect(indexOrderIssues(md)).toEqual([]);
  });
});

describe("parseStamp", () => {
  it("reads a Notes stamp with a trailing free-text suffix", () => {
    expect(parseStamp("## Notes\n**Last Updated:** 2026-06-21 — v0.49 sweep\n")).toBe("2026-06-21");
  });
  it("reads a template footer stamp", () => {
    expect(parseStamp("<!-- Template Last Updated: 2026-06-20 | added v0.47 -->")).toBe(
      "2026-06-20",
    );
  });
  it("returns null when absent", () => {
    expect(parseStamp("no stamp here")).toBe(null);
  });
});

describe("stampFormatIssues", () => {
  it("passes a bare-date stamp and canonical 'Added to framework' line", () => {
    expect(
      stampFormatIssues("**Last Updated:** 2026-06-21\n\nAdded to framework in v0.49.0.\n"),
    ).toEqual([]);
  });
  it("flags trailing change-history on the Last Updated line", () => {
    const issues = stampFormatIssues("**Last Updated:** 2026-06-21 — v0.49 sweep: renamed X\n");
    expect(issues).toHaveLength(1);
    expect(issues[0]).toContain("must be a bare date");
  });
  it("flags 'Added to the framework' (stray 'the')", () => {
    const issues = stampFormatIssues("**Last Updated:** 2026-06-21\n\nAdded to the framework in v0.49.0.\n");
    expect(issues.some((i) => i.includes("'Added to the framework'"))).toBe(true);
  });
  it("leaves the template footer form (no markdown stamp line) alone", () => {
    expect(stampFormatIssues("<!-- Template Last Updated: 2026-06-20 | added v0.47 -->\n")).toEqual(
      [],
    );
  });
  it("exempts template fill-in lines (placeholder date, trailing fields)", () => {
    expect(
      stampFormatIssues("**Last Updated:** YYYY-MM-DD **Increment:** [name]\n"),
    ).toEqual([]);
    expect(stampFormatIssues("**Last Updated:** YYYY-MM-DD HH:MM\n")).toEqual([]);
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
      "| Consequence | Reach |\n| --- | --- |\n| Negligible | nobody |\n\n" + specMd;
    const t = extractFloorTable(withDecoy);
    expect(t.get("moderate")[1]).toBe("Internal, else Self");
    expect(t.has("negligible")).toBe(true);
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
    expect(shipListIssues(ts, [{ file: "CONTRIBUTING.md", content: md }]).fatal).toEqual([]);
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
    const { fatal } = shipListIssues(ts, [{ file: "CONTRIBUTING.md", content: md }]);
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
    const { fatal } = funcGroupIssues(spec, table("No — standing (unattended runs)"));
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
      executionPinHits("Human execution required — humans execute deployment steps.").length,
    ).toBeGreaterThan(0);
  });

  it("execution-pin: conforms when the execute verb's subject is AI", () => {
    expect(
      executionPinHits("AI drafts, executes within the path; humans own the decision."),
    ).toEqual([]);
  });

  it("execution-pin: ignores callouts with no execution verb", () => {
    expect(executionPinHits("AI produces drafts; humans own all decisions.")).toEqual([]);
  });

  it("finds the How AI Helps section", () => {
    expect(howAiHelpsSection("## How AI Helps\n\nBody.\n\n## Next\n").text).toContain(
      "How AI Helps",
    );
  });

  it("finds the Oversight paragraph", () => {
    const md =
      "x\n\n**Oversight at this stage.** Folds into Authority. See the [guide](../../guides/operating-model.md).\n\ny";
    expect(oversightPara(md).text).toContain("Oversight at this stage");
  });
});
