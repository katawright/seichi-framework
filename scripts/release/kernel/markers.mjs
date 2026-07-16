// Rule-body marker parsing — the Phase 3 anchor convention (migration plan
// Decision P3-2; design-review Q2 resolution).
//
// A migrated rule body is delimited by an HTML-comment marker pair in its
// one normative home:
//
//   <!-- rule: DR-005 -->
//   ### DR-005 — <title>
//   …six-field contract (1b) or binding statement over the data (1a)…
//   <!-- /rule: DR-005 -->
//
// The comment pair is purely the machine span-delimiter; the visible
// `### <ID> — <title>` heading keeps every citable handle off the
// comment-only channel (the Q2 rider). Spans are flat — nesting is
// disallowed (a rule body is not composed of marked sub-rules).
//
// Plain ESM, pure string-in/out (the lib.mjs discipline): imported by the
// kernel generator (body extraction for reference.md and the source hash)
// and by the .schema rule-markers check (span integrity, single-home,
// citation resolution).

/** Matches one marker comment. Group 1 = "/" for a close, group 2 = the ID. */
export const MARKER_RE = /<!--\s*(\/?)rule:\s*([A-Za-z0-9-]+)\s*-->/g;

/** 1-based line number for a string index (duplicated from .schema lib to
 * keep this module dependency-free in both import directions). */
export function lineOf(content, index) {
  return content.slice(0, index).split("\n").length;
}

/**
 * Blank fenced code blocks, preserving line and column offsets — same
 * CommonMark rules as .schema/checks/lib.mjs stripFences (duplicated here
 * because the dependency direction is .schema → scripts, never the reverse).
 * Markers are matched on the fence-stripped text so a fenced *example* pair
 * (documentation showing the convention) is never parsed as a real span;
 * body text is then sliced from the raw content at the preserved offsets.
 */
export function blankFences(content) {
  const lines = content.split("\n");
  let fence = null; // { char, len } of the open fence, or null
  return lines
    .map((line) => {
      const m = line.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);
      if (m) {
        const ch = m[1][0];
        const len = m[1].length;
        const info = m[2];
        if (fence === null) {
          fence = { char: ch, len };
        } else if (ch === fence.char && len >= fence.len && info.trim() === "") {
          fence = null;
        }
        return " ".repeat(line.length);
      }
      return fence ? " ".repeat(line.length) : line;
    })
    .join("\n");
}

/**
 * Parse the rule-marker spans of one document.
 *
 * Returns { spans, issues }:
 *   spans  — [{ id, body, openLine, closeLine }] for every well-formed
 *            open+close pair, in document order (duplicates included; the
 *            caller decides what a duplicate means).
 *   issues — human-readable strings (no file prefix) for every structural
 *            defect: a close with no open, an open closed by a different
 *            ID, a nested open, an open never closed.
 */
export function parseRuleSpans(content) {
  const spans = [];
  const issues = [];
  let open = null; // { id, endIndex, line }

  const stripped = blankFences(content);
  for (const m of stripped.matchAll(MARKER_RE)) {
    const isClose = m[1] === "/";
    const id = m[2];
    const line = lineOf(content, m.index);
    if (isClose) {
      if (open === null) {
        issues.push(`line ${line}: close marker for ${id} with no open marker`);
      } else if (open.id !== id) {
        issues.push(
          `line ${line}: close marker for ${id} does not match open marker for ${open.id} (line ${open.line})`,
        );
        open = null;
      } else {
        spans.push({
          id,
          body: trimBody(content.slice(open.endIndex, m.index)),
          openLine: open.line,
          closeLine: line,
        });
        open = null;
      }
    } else {
      if (open !== null) {
        issues.push(
          `line ${line}: open marker for ${id} inside the open span of ${open.id} (line ${open.line}) — spans are flat, nesting is disallowed`,
        );
        open = null;
      }
      open = { id, endIndex: m.index + m[0].length, line };
    }
  }
  if (open !== null) {
    issues.push(`line ${open.line}: open marker for ${open.id} is never closed`);
  }
  return { spans, issues };
}

/** Normalize a span body: strip leading/trailing blank lines, keep inner
 * text verbatim. Deterministic — the same body is hashed and emitted. */
function trimBody(text) {
  return text.replace(/^\s*\n/, "").replace(/\s+$/, "");
}

/**
 * The Q2 rider: no citable handle is comment-only. The first non-blank line
 * of a span body must be a visible Markdown heading whose text starts with
 * the rule's ID followed by an em-dash separator (`### DR-005 — <title>`).
 * Returns an issue string, or null if the rider holds.
 */
export function headingRiderIssue(id, body) {
  const first = body.split("\n").find((l) => l.trim() !== "");
  if (!first) {
    return `body of ${id} is empty — a marked span must carry the contract`;
  }
  const re = new RegExp(`^#{1,6}[ \\t]+${escapeRe(id)}[ \\t]+—[ \\t]+\\S`);
  if (!re.test(first.trim())) {
    return `body of ${id} must open with a visible ID heading (\`### ${id} — <title>\`); found: ${first.trim().slice(0, 60)}`;
  }
  return null;
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Extract every registered-prefix rule-ID-shaped token (`<PREFIX>-<NNN>`
 * with optional lowercase suffix) from a document — the C11 guide-citation
 * scan. Scoped to the prefixes the registry actually uses so template
 * placeholders (INC-001, REQ-001) and foreign identifiers (AES-256) never
 * false-positive. Marker comments are blanked first: their IDs are the
 * marker↔registry check's job, not a citation.
 *
 * Returns [{ token, index }].
 */
export function extractIdTokens(content, prefixes) {
  if (prefixes.length === 0) return [];
  const blanked = content.replace(MARKER_RE, (m) => " ".repeat(m.length));
  const re = new RegExp(
    `\\b(?:${[...prefixes].map(escapeRe).join("|")})-\\d{3}[a-z]?\\b`,
    "g",
  );
  const out = [];
  for (const m of blanked.matchAll(re)) {
    out.push({ token: m[0], index: m.index });
  }
  return out;
}

/** The set of ID prefixes a rule registry uses (e.g. CS, DR, OMG). */
export function registryPrefixes(ruleIds) {
  const prefixes = new Set();
  for (const id of ruleIds) {
    const m = /^([A-Z]+)-/.exec(id);
    if (m) prefixes.add(m[1]);
  }
  return [...prefixes].sort();
}
