// Shared helpers for the extended validator checks (anchors, retired-vocab,
// stamps, INDEX counts). Kept pure and string-in/out so they are unit-testable.

/**
 * Blank fenced code blocks (``` or ~~~), preserving line and column offsets so
 * that file:line reporting stays accurate. Headings/links inside fences are
 * thereby excluded from scans — fixing the long-standing "numbered ## inside a
 * fenced ```markdown block double-counts" false positive.
 */
export function stripFences(content) {
  const lines = content.split("\n");
  let fence = null; // { char, len } of the open fence, or null
  return lines
    .map((line) => {
      // A fence line: up to 3 spaces of indent, then >=3 backticks or tildes.
      const m = line.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);
      if (m) {
        const ch = m[1][0];
        const len = m[1].length;
        const info = m[2];
        if (fence === null) {
          // Opening fence (an info string is allowed).
          fence = { char: ch, len };
        } else if (ch === fence.char && len >= fence.len && info.trim() === "") {
          // CommonMark close: same char, >= opening length, no info string.
          // A shorter / different-char / info-bearing fence line nested inside
          // (e.g. ```json inside a ````markdown block) is content, not a close.
          fence = null;
        }
        return " ".repeat(line.length);
      }
      return fence ? " ".repeat(line.length) : line;
    })
    .join("\n");
}

/** Blank fenced blocks AND inline code spans (`like this`), preserving offsets. */
export function stripCode(content) {
  return stripFences(content)
    .split("\n")
    .map((line) => line.replace(/`[^`\n]*`/g, (m) => " ".repeat(m.length)))
    .join("\n");
}

/**
 * GitHub-style heading-anchor slug. Lowercases, drops every character that is
 * not a Unicode letter/number, space, hyphen, or underscore (so `—`, `:`, `/`,
 * `.`, parens, backticks, `&` all vanish), then turns spaces into hyphens.
 * Critically does NOT collapse consecutive hyphens — GitHub keeps them, so
 * "Authority — who may decide" → "authority--who-may-decide".
 */
export function slugify(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N} _-]/gu, "")
    .replace(/ /g, "-");
}

/**
 * The set of GitHub heading-anchor slugs a document exposes (headings 1–6,
 * fences excluded, duplicates suffixed -1, -2, … in document order).
 */
export function headingSlugs(content) {
  const stripped = stripFences(content);
  const seen = new Map();
  const slugs = new Set();
  for (const m of stripped.matchAll(/^#{1,6}[ \t]+(.+?)[ \t]*#*[ \t]*$/gm)) {
    const base = slugify(m[1]);
    if (!base) continue;
    let slug = base;
    if (seen.has(base)) {
      const n = seen.get(base) + 1;
      seen.set(base, n);
      slug = `${base}-${n}`;
    } else {
      seen.set(base, 0);
    }
    slugs.add(slug);
  }
  return slugs;
}

/** Extract inline markdown links [text](target). Returns {target, index}. */
export function extractLinks(content) {
  const links = [];
  const re = /\[[^\]]*\]\(\s*([^)\s]+?)(?:\s+"[^"]*")?\s*\)/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    links.push({ target: m[1], index: m.index });
  }
  return links;
}

/**
 * Explicitly-relative (./ or ../) *.md path tokens inside HTML comments — the
 * guidance-pointer class. Only relative paths are reported: a `../x.md` is
 * unambiguously an intended file-relative link, whereas a bare `guides/x.md`
 * in a comment is usually a prose identifier or example content, not a link.
 */
export function extractCommentMdPaths(content) {
  const out = [];
  const commentRe = /<!--([\s\S]*?)-->/g;
  let c;
  while ((c = commentRe.exec(content)) !== null) {
    const body = c[1];
    const offset = c.index + 4; // length of "<!--"
    const pathRe = /([\w./-]+\.md)(#[-\w]+)?/g;
    let p;
    while ((p = pathRe.exec(body)) !== null) {
      if (!/^\.\.?\//.test(p[1])) continue; // only ./ or ../ paths
      out.push({ path: p[1], index: offset + p.index });
    }
  }
  return out;
}

/** 1-based line number for a string index. */
export function lineOf(content, index) {
  return content.slice(0, index).split("\n").length;
}
