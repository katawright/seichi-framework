// Floor-table consistency (inventory category H). The right-sizing guide carries
// an [Informative] reproduction of the normative consequence-floor table that
// lives in the operating-model spec. Reviewers hand-diffed the two every cold
// review; this check asserts their floor *values* are identical cell-for-cell so
// they cannot drift, while letting the two keep different column *headers*
// (reader-friendly in the guide, normative in the spec).

import { readFileSync } from "node:fs";
import { join } from "node:path";

const SPEC_FILE = "spec/operating-model.md";
const RS_FILE = "guides/right-sizing.md";
const CONSEQUENCES = ["negligible", "low", "moderate", "high", "critical"];

// Normalize a cell for comparison: drop emphasis/backticks, collapse whitespace,
// lowercase. So `**Negligible**` == `Negligible` and `_if … available_` italics
// don't matter — only the substance is compared.
function norm(cell) {
  return cell
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function rowCells(line) {
  return line
    .trim()
    .split("|")
    .slice(1, -1)
    .map((c) => c.trim());
}

// Extract the consequence-floor table's data rows from markdown content, keyed by
// normalized consequence. The floor table is the unique one whose header row
// names both "Lights-Out" and "floor". Returns Map<consequence, cells[]> or null.
export function extractFloorTable(content) {
  const lines = content.split("\n");
  let inTable = false;
  const rows = new Map();
  for (const raw of lines) {
    const t = raw.trim();
    if (t.startsWith("|")) {
      const cells = rowCells(raw);
      if (!inTable) {
        const hay = cells.join(" ").toLowerCase();
        if (hay.includes("lights-out") && hay.includes("floor")) inTable = true;
        continue; // header row itself is not compared
      }
      if (cells.every((c) => /^:?-+:?$/.test(c))) continue; // separator row
      const key = norm(cells[0]);
      if (CONSEQUENCES.includes(key)) rows.set(key, cells);
    } else if (inTable) {
      break; // table ended
    }
  }
  return rows.size ? rows : null;
}

export function floorTableIssues(specContent, rsContent) {
  const spec = extractFloorTable(specContent);
  const rs = extractFloorTable(rsContent);
  if (!spec) return [`FLOOR  ${SPEC_FILE}  consequence-floor table not found`];
  if (!rs) return [`FLOOR  ${RS_FILE}  consequence-floor table not found`];

  const issues = [];
  for (const key of CONSEQUENCES) {
    const a = spec.get(key);
    const b = rs.get(key);
    if (!a) issues.push(`FLOOR  ${SPEC_FILE}  missing '${key}' row`);
    if (!b) issues.push(`FLOOR  ${RS_FILE}  missing '${key}' row`);
    if (!a || !b) continue;
    if (a.length !== b.length) {
      issues.push(
        `FLOOR  '${key}' column count differs (spec ${a.length}, right-sizing ${b.length})`,
      );
      continue;
    }
    for (let i = 0; i < a.length; i++) {
      if (norm(a[i]) !== norm(b[i])) {
        issues.push(
          `FLOOR  '${key}' col ${i + 1}: spec "${a[i]}" != right-sizing "${b[i]}"`,
        );
      }
    }
  }
  return issues;
}

export function runFloorTable(repoRoot) {
  let specContent, rsContent;
  try {
    specContent = readFileSync(join(repoRoot, SPEC_FILE), "utf8");
  } catch {
    return [`FLOOR  ${SPEC_FILE}  not readable`];
  }
  try {
    rsContent = readFileSync(join(repoRoot, RS_FILE), "utf8");
  } catch {
    return [`FLOOR  ${RS_FILE}  not readable`];
  }
  return floorTableIssues(specContent, rsContent);
}
