import { readFileSync } from "node:fs";
import { resolve, relative, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import fg from "fast-glob";
import { minimatch } from "minimatch";
import { runAnchors } from "./checks/anchors.mjs";
import { runRetiredVocab } from "./checks/retired-vocab.mjs";
import { runStamps } from "./checks/stamps.mjs";
import { runIndexCounts } from "./checks/index-counts.mjs";
import { runIndexOrder } from "./checks/index-order.mjs";
import { runFloorTable } from "./checks/floor-table.mjs";
import { runKernel } from "./checks/kernel.mjs";
import { runRuleMarkers } from "./checks/rule-markers.mjs";
import { runShipList } from "./checks/ship-list.mjs";
import { runFuncGroup } from "./checks/func-group.mjs";
import { runCallout } from "./checks/callout.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");

// ── Helpers ─────────────────────────────────────────────────────────

/** Recursively convert Date objects to YYYY-MM-DD strings. */
function normalizeValues(obj) {
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    if (val instanceof Date) {
      obj[key] = val.toISOString().slice(0, 10);
    } else if (val && typeof val === "object" && !Array.isArray(val)) {
      normalizeValues(val);
    } else if (Array.isArray(val)) {
      val.forEach((item, i) => {
        if (item instanceof Date) {
          val[i] = item.toISOString().slice(0, 10);
        } else if (item && typeof item === "object") {
          normalizeValues(item);
        }
      });
    }
  }
}

// ── Load configuration ──────────────────────────────────────────────

const fileMap = JSON.parse(
  readFileSync(join(__dirname, "file-map.json"), "utf8"),
);

// ── Load and compile schemas ────────────────────────────────────────

const schemasDir = join(__dirname, "schemas");

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);

// Load shared definitions first so $ref can resolve
const defsSchema = JSON.parse(
  readFileSync(join(schemasDir, "defs.schema.json"), "utf8"),
);
ajv.addSchema(defsSchema);

// Compile each mapping schema
const validators = {};
for (const { schema } of fileMap.mappings) {
  if (!validators[schema]) {
    const schemaJson = JSON.parse(
      readFileSync(join(schemasDir, schema), "utf8"),
    );
    validators[schema] = ajv.compile(schemaJson);
  }
}

// ── Determine files to validate ─────────────────────────────────────

let files;
if (process.argv.length > 2) {
  // Specific files passed as arguments (e.g., from pre-commit hook)
  files = process.argv.slice(2).map((f) => relative(repoRoot, resolve(f)));
} else {
  // Discover all .md files in the repo
  files = await fg("**/*.md", {
    cwd: repoRoot,
    ignore: ["node_modules/**"],
  });
}

// Normalize to forward slashes
files = files.map((f) => f.replace(/\\/g, "/"));

// ── Validate ────────────────────────────────────────────────────────

let passed = 0;
let failed = 0;
let skipped = 0;
let warned = 0;
const failures = [];

for (const file of files) {
  // Check exclusions
  if (fileMap.exclude.some((pattern) => minimatch(file, pattern))) {
    skipped++;
    continue;
  }

  // Find matching schema
  const mapping = fileMap.mappings.find((m) => minimatch(file, m.glob));

  // Read file
  const absPath = join(repoRoot, file);
  let content;
  try {
    content = readFileSync(absPath, "utf8");
  } catch {
    failures.push({ file, errors: ["File not readable"] });
    failed++;
    continue;
  }

  // Check for front matter
  const hasFrontMatter = content.startsWith("---");

  if (!hasFrontMatter) {
    if (mapping) {
      failures.push({
        file,
        errors: ["Expected front matter but found none"],
      });
      failed++;
    } else {
      skipped++;
    }
    continue;
  }

  if (!mapping) {
    console.log(`WARN  ${file} (front matter found, no matching schema)`);
    warned++;
    continue;
  }

  // Parse front matter
  let data;
  try {
    data = matter(content).data;
  } catch (err) {
    failures.push({ file, errors: [`YAML parse error: ${err.message}`] });
    failed++;
    continue;
  }

  // Normalize Date objects to ISO date strings (YAML parsers auto-convert
  // date-like values such as 2026-03-19 into JS Date objects)
  normalizeValues(data);

  // Validate against schema
  const validate = validators[mapping.schema];
  const valid = validate(data);

  if (valid) {
    console.log(`PASS  ${file}`);
    passed++;
  } else {
    const errors = validate.errors.map((e) => {
      const path = e.instancePath || "/";
      if (e.keyword === "additionalProperties") {
        return `${path} has unknown property '${e.params.additionalProperty}'`;
      }
      return `${path} ${e.message}`;
    });
    failures.push({ file, errors });
    failed++;
  }
}

// ── Structure checks ────────────────────────────────────────────────
// Verify that in-scope markdown files follow the canonical document
// structure defined in STYLE_GUIDE.md (Overview H3 headings, Notes).

const structureExclude = fileMap.structureExclude || [];
let structureWarnings = 0;
const structureIssues = [];

// Re-discover files for structure check (the front-matter pass skips
// files without front matter, but structure checks apply to all).
const structureFiles =
  process.argv.length > 2
    ? process.argv.slice(2).map((f) => relative(repoRoot, resolve(f)))
    : await fg("**/*.md", { cwd: repoRoot, ignore: ["node_modules/**"] });

for (let file of structureFiles) {
  file = file.replace(/\\/g, "/");

  if (structureExclude.some((pattern) => minimatch(file, pattern))) continue;

  const absPath = join(repoRoot, file);
  let content;
  try {
    content = readFileSync(absPath, "utf8");
  } catch {
    continue;
  }

  const headings = [...content.matchAll(/^(#{1,3}) (.+)$/gm)].map((m) => ({
    level: m[1].length,
    text: m[2],
  }));

  const issues = [];
  const hasOverview = headings.some(
    (h) => h.level === 2 && h.text === "Overview",
  );

  if (hasOverview) {
    if (!headings.some((h) => h.level === 3 && h.text.startsWith("Why "))) {
      issues.push("Missing ### Why [Topic] in Overview");
    }
    if (
      !headings.some(
        (h) => h.level === 3 && h.text.startsWith("Goals of This "),
      )
    ) {
      issues.push("Missing ### Goals of This [Type] in Overview");
    }
    if (
      !headings.some((h) => h.level === 3 && h.text === "Key Principle")
    ) {
      issues.push("Missing ### Key Principle in Overview");
    }
    if (
      !headings.some(
        (h) => h.level === 3 && h.text.startsWith("How to Use This "),
      )
    ) {
      issues.push("Missing ### How to Use This [Type] in Overview");
    }
  }

  if (!headings.some((h) => h.level === 2 && h.text === "Notes")) {
    issues.push("Missing ## Notes section");
  }

  if (issues.length > 0) {
    structureIssues.push({ file, issues });
    structureWarnings += issues.length;
  }
}

// ── Extended checks ─────────────────────────────────────────────────
// Deterministic checks for the mechanizable cold-review finding classes:
// anchor/link integrity, retired vocabulary as live guidance, Last Updated
// stamp freshness, INDEX count self-consistency, INDEX table sort-order,
// consequence-floor table parity, kernel rule-marker span integrity +
// rule-ID citation resolution, and the restatement-family regression guards
// (shipped-layer enumeration, operator-table function grouping, stage-callout
// uniformity). Fatal issues fail the build (exit 1), the same as a schema
// failure; warn-tier issues (heuristic callout semantics, operational skips) are
// printed but do not break the build. If the retired-vocab check ever trips on a
// legitimate new usage, tune .schema/checks/retired-vocab.json.

const checkExclude = fileMap.checkExclude || [];
const checkFiles = structureFiles.filter(
  (f) => !checkExclude.some((pattern) => minimatch(f, pattern)),
);

function runCheck(label, fn) {
  try {
    return fn();
  } catch (err) {
    return [`${label}  (check error: ${err.message})`];
  }
}

// Checks that return a flat array of fatal issues.
const checkIssues = [
  ...runCheck("ANCHOR", () =>
    runAnchors(repoRoot, checkFiles, fileMap.linkAllowlist || []),
  ),
  ...runCheck("VOCAB", () =>
    runRetiredVocab(
      repoRoot,
      checkFiles.filter((f) => f !== "CHANGELOG.md"),
    ),
  ),
  ...runCheck("STAMP", () => runStamps(repoRoot, checkFiles)),
  ...runCheck("COUNT", () => runIndexCounts(repoRoot)),
  ...runCheck("ORDER", () => runIndexOrder(repoRoot)),
  ...runCheck("FLOOR", () => runFloorTable(repoRoot)),
  ...runCheck("KERNEL", () => runKernel(repoRoot)),
  ...runCheck("MARKER", () => runRuleMarkers(repoRoot, fileMap.checkExclude || [])),
];

// Restatement-family guards return { fatal, warn }: the drift itself is fatal,
// while heuristic semantics and operational skips (unparseable source, missing
// sentinel) only warn.
function runFamilyCheck(label, fn) {
  try {
    const r = fn();
    return { fatal: r.fatal || [], warn: r.warn || [] };
  } catch (err) {
    return { fatal: [`${label}  (check error: ${err.message})`], warn: [] };
  }
}

const familyChecks = [
  runFamilyCheck("SHIP", () => runShipList(repoRoot)),
  runFamilyCheck("FUNCGROUP", () => runFuncGroup(repoRoot)),
  runFamilyCheck("CALLOUT", () => runCallout(repoRoot)),
];

const fatalIssues = [...checkIssues, ...familyChecks.flatMap((r) => r.fatal)];
const checkWarnings = familyChecks.flatMap((r) => r.warn);

// ── Report ──────────────────────────────────────────────────────────

if (failures.length > 0) {
  console.log("");
  for (const { file, errors } of failures) {
    console.log(`FAIL  ${file}`);
    for (const err of errors) {
      console.log(`  - ${err}`);
    }
  }
}

if (structureIssues.length > 0) {
  console.log("");
  for (const { file, issues } of structureIssues) {
    console.log(`STRUCT  ${file}`);
    for (const issue of issues) {
      console.log(`  - ${issue}`);
    }
  }
}

if (fatalIssues.length > 0) {
  console.log("");
  for (const issue of fatalIssues) {
    console.log(issue);
  }
}

if (checkWarnings.length > 0) {
  console.log("");
  for (const issue of checkWarnings) {
    console.log(`WARN  ${issue}`);
  }
}

console.log("");
console.log(
  `Results: ${passed} passed, ${failed} failed, ${skipped} skipped, ${warned} warned` +
    (structureWarnings > 0
      ? `, ${structureWarnings} structure warnings`
      : "") +
    (fatalIssues.length > 0 ? `, ${fatalIssues.length} check failures` : "") +
    (checkWarnings.length > 0 ? `, ${checkWarnings.length} check warnings` : ""),
);

process.exit(failed > 0 || fatalIssues.length > 0 ? 1 : 0);
