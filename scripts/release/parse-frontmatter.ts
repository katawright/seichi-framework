import { readFileSync } from "node:fs";

import matter from "gray-matter";

export interface RawStageFrontmatter {
  id: string;
  outputs?: ReadonlyArray<{
    artifact: string;
    template?: string;
    embedded_in?: string;
  }>;
  checkpoints?: ReadonlyArray<{
    type?: string;
    name?: string;
    condition?: string;
  }>;
  default_autonomy?: string;
  default_oversight_intensity?: string;
  working_location?: string;
}

/**
 * Read a stage README file and return its parsed YAML frontmatter.
 *
 * Throws if the file is missing, has no frontmatter, or the frontmatter
 * fails to parse.
 */
export function parseStageFrontmatter(readmePath: string): RawStageFrontmatter {
  const text = readFileSync(readmePath, "utf8");
  const parsed = matter(text);
  if (Object.keys(parsed.data).length === 0) {
    throw new Error(`No frontmatter found in ${readmePath}`);
  }
  const data = parsed.data as RawStageFrontmatter;
  if (typeof data.id !== "string" || data.id.length === 0) {
    throw new Error(`Frontmatter missing required \`id\` field: ${readmePath}`);
  }
  return data;
}
