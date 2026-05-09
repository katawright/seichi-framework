/**
 * Title-case a kebab-case slug for use as `display_name`.
 *
 * Maps `requirements-brief` → `Requirements Brief`, `system-design` →
 * `System Design`. Used for both stages and artifacts whose frontmatter
 * does not carry an explicit `display_name`.
 */
export function deriveDisplayName(slug: string): string {
  return slug
    .split("-")
    .map((part) => (part.length === 0 ? part : part[0].toUpperCase() + part.slice(1)))
    .join(" ");
}
