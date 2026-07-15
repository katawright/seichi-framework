// Type surface for the plain-ESM kernel generator (generate.mjs). The
// generator is JavaScript so the .schema validation suite (plain Node, no
// tsx) can import it directly; this declaration keeps the TypeScript release
// pipeline typed.

export declare const KERNEL_INTERFACE_VERSION: string;
export declare const GENERATED_FILES: string[];
export declare function toSnake(value: string): string;
export declare function validateKernelSources(
  repoRoot: string,
  sources: unknown,
): string[];
export declare function generateKernel(repoRoot: string): Record<string, string>;
export declare function writeKernel(repoRoot: string): string[];
export declare function checkKernelFreshness(repoRoot: string): string[];
