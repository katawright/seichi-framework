import { readFileSync } from "node:fs";
import { resolve, relative, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import fg from "fast-glob";
import { minimatch } from "minimatch";

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

console.log("");
console.log(
  `Results: ${passed} passed, ${failed} failed, ${skipped} skipped, ${warned} warned`,
);

process.exit(failed > 0 ? 1 : 0);
