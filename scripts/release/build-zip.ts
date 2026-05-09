import { createWriteStream, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

import archiver from "archiver";

const FIXED_MTIME = new Date("1980-01-01T00:00:00Z");

function listFilesRecursive(root: string): string[] {
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir).sort()) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) {
        walk(full);
      } else {
        out.push(full);
      }
    }
  };
  walk(root);
  return out;
}

function toZipPath(absPath: string, root: string): string {
  return relative(root, absPath).split(sep).join("/");
}

/**
 * Pack `sourceDir` into a deterministic zip at `outputPath`.
 *
 * Determinism levers: every entry uses a fixed mtime
 * (`1980-01-01T00:00:00Z`), entries are appended in lexicographic order,
 * and the archive uses `STORE` (no compression) so compression-level
 * heuristics cannot vary the bytes. Same input → byte-identical output
 * across runs and machines.
 */
export async function buildZip(sourceDir: string, outputPath: string): Promise<void> {
  const files = listFilesRecursive(sourceDir);

  return new Promise((resolve, reject) => {
    const output = createWriteStream(outputPath);
    const archive = archiver("zip", {
      zlib: { level: 0 },
      store: true,
    });

    output.on("close", () => resolve());
    output.on("error", reject);
    archive.on("error", reject);
    archive.pipe(output);

    for (const file of files) {
      const data = readFileSync(file);
      archive.append(data, {
        name: toZipPath(file, sourceDir),
        date: FIXED_MTIME,
        mode: 0o644,
      });
    }

    void archive.finalize();
  });
}
