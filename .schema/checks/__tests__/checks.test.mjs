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
import { parseStamp } from "../stamps.mjs";

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
  it("finds bare md paths inside HTML comments", () => {
    const out = extractCommentMdPaths("<!-- see increment-design/README.md -->");
    expect(out[0].path).toBe("increment-design/README.md");
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
