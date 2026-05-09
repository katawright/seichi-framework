import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { buildZip } from "./build-zip";
import { manifestSchema } from "./manifest-schema";
import { buildManifest } from "./project-manifest";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..");
const VERSION_REGEX = /^\d+\.\d+\.\d+$/;

// Top-level paths that compose a framework release. Everything else in the
// repo (.schema, scripts, .obsidian, .ignore, .evaluation, node_modules,
// CHANGELOG, CONTRIBUTING, STYLE_GUIDE, AGENTS, CLAUDE, .git, package.json,
// tsconfig, etc.) is maintainer-only and must not ship in the zip.
const FRAMEWORK_INCLUDES = [
  "guides",
  "stages",
  "templates",
  "INDEX.md",
  "QUICKSTART.md",
  "README.md",
  "VERSION",
];

function fail(message: string): never {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

function safeRemove(path: string): void {
  try {
    rmSync(path, { force: true, recursive: true });
  } catch {
    // Best-effort cleanup on failure path; ignore.
  }
}

function readVersionFile(): string {
  const versionPath = join(REPO_ROOT, "VERSION");
  if (!existsSync(versionPath)) {
    fail(`VERSION file not found at ${versionPath}`);
  }
  return readFileSync(versionPath, "utf8").trim();
}

async function main(): Promise<void> {
  const version = readVersionFile();
  if (!VERSION_REGEX.test(version)) {
    fail(`VERSION file content invalid: \`${version}\` (expected MAJOR.MINOR.PATCH).`);
  }

  // Optional argv version is a sanity check: catches a forgotten VERSION
  // bump before we publish a duplicate-named zip.
  const argVersion = process.argv[2];
  if (argVersion !== undefined) {
    if (!VERSION_REGEX.test(argVersion)) {
      fail(
        `Usage: npm run release [-- <version>]\n` +
          `  <version> (optional) must match MAJOR.MINOR.PATCH and the VERSION file.`,
      );
    }
    if (argVersion !== version) {
      fail(
        `Version mismatch: argv = ${argVersion}, VERSION file = ${version}.`,
      );
    }
  }

  let manifest;
  try {
    manifest = buildManifest(REPO_ROOT);
  } catch (err) {
    fail(`Failed to build manifest: ${err instanceof Error ? err.message : String(err)}`);
  }

  if (manifest.framework_version !== version) {
    fail(
      `Manifest version (${manifest.framework_version}) does not match VERSION file (${version}). ` +
        `Check that the VERSION file matches the source.`,
    );
  }

  const parsed = manifestSchema.safeParse(manifest);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    fail(`Manifest failed schema validation:\n${issues}`);
  }

  const distDir = join(REPO_ROOT, "dist");
  const stagingDir = join(distDir, `framework-v${version}-staging`);
  const zipPath = join(distDir, `framework-v${version}.zip`);
  const rootManifestPath = join(REPO_ROOT, "manifest.json");

  const manifestText = `${JSON.stringify(parsed.data, null, 2)}\n`;

  // Stage: copy the explicit include list into a clean directory, drop the
  // generated manifest in alongside, then zip from there. This guarantees
  // the zip contents are exactly the framework release surface — no
  // tooling, no notes, no node_modules, regardless of repo state.
  try {
    mkdirSync(distDir, { recursive: true });
    safeRemove(stagingDir);
    mkdirSync(stagingDir, { recursive: true });

    for (const item of FRAMEWORK_INCLUDES) {
      const src = join(REPO_ROOT, item);
      if (!existsSync(src)) {
        fail(`Required framework path missing: ${src}`);
      }
      cpSync(src, join(stagingDir, item), { recursive: true });
    }
    writeFileSync(join(stagingDir, "manifest.json"), manifestText, "utf8");
  } catch (err) {
    safeRemove(stagingDir);
    fail(`Failed to stage release: ${err instanceof Error ? err.message : String(err)}`);
  }

  try {
    safeRemove(zipPath);
    await buildZip(stagingDir, zipPath);
  } catch (err) {
    safeRemove(stagingDir);
    safeRemove(zipPath);
    fail(`Failed to build zip: ${err instanceof Error ? err.message : String(err)}`);
  }

  // Mirror the manifest at the repo root for human inspection. Gitignored.
  try {
    writeFileSync(rootManifestPath, manifestText, "utf8");
  } catch (err) {
    safeRemove(stagingDir);
    fail(`Failed to write manifest.json: ${err instanceof Error ? err.message : String(err)}`);
  }

  safeRemove(stagingDir);

  const stageCount = parsed.data.stages.length;
  const artifactCount = parsed.data.stages.reduce(
    (sum, stage) => sum + stage.artifacts.length,
    0,
  );
  process.stdout.write(
    `Released framework v${version}: ${stageCount} stages, ${artifactCount} artifacts.\n` +
      `  manifest: ${rootManifestPath}\n` +
      `  zip:      ${zipPath}\n`,
  );
}

main().catch((err) => {
  fail(`Unexpected error: ${err instanceof Error ? err.stack ?? err.message : String(err)}`);
});
