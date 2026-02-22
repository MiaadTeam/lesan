/**
 * @file bundler.adapter.ts
 * @description Bun implementation of the BundlerAdapter interface.
 *
 * This adapter uses Bun's native `Bun.build()` and `Bun.Transpiler` APIs
 * to provide lightning-fast bundling and transpilation.
 */

import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import type {
  BundleError,
  BundleOptions,
  BundlerAdapter,
  BundleResult,
  BundlerInfo,
  BundleWarning,
} from "../../platform/bundler.interface.ts";
import { BundlerError as LesanBundlerError } from "../../platform/bundler.interface.ts";

// Declare Bun globally to avoid TypeScript errors if bun-types is not included
declare const Bun: any;

/**
 * Helper to map Lesan sourcemap options to Bun's expected format
 */
function mapSourcemap(
  sourcemap?: boolean | "inline" | "external",
): "none" | "inline" | "external" {
  if (sourcemap === true) return "inline";
  if (sourcemap === false || !sourcemap) return "none";
  return sourcemap;
}

export const bunBundlerAdapter: BundlerAdapter = {
  async bundle(
    entry: string | URL,
    options?: BundleOptions,
  ): Promise<BundleResult> {
    try {
      const entryPath = entry instanceof URL ? entry.pathname : entry;
      const startTime = performance.now();

      const buildOptions = {
        entrypoints: [entryPath],
        minify: options?.minify ?? false,
        sourcemap: mapSourcemap(options?.sourcemap),
        external: options?.external ?? [],
        define: options?.define ?? {},
        // Bun primarily targets 'browser', 'bun', or 'node'.
        // For Lesan's playground, 'browser' is the most appropriate default.
        target: "browser",
        // Bun natively outputs ESM
        format: "esm",
      };

      const result = await Bun.build(buildOptions);
      const buildTime = performance.now() - startTime;

      if (!result.success) {
        const errors: BundleError[] = result.logs
          .filter((log: any) => log.level === "error")
          .map((log: any) => ({
            message: log.message,
            file: log.position?.file,
            line: log.position?.line,
            column: log.position?.column,
          }));
        throw new LesanBundlerError("Bun build failed", errors);
      }

      let code = "";
      let map: string | undefined = undefined;
      let outputSize = 0;

      // Extract code and sourcemap from outputs
      for (const output of result.outputs) {
        if (output.path.endsWith(".map")) {
          map = await output.text();
        } else {
          code = await output.text();
          outputSize = output.size;
        }
      }

      const warnings: BundleWarning[] = result.logs
        .filter((log: any) => log.level === "warning")
        .map((log: any) => ({
          message: log.message,
          file: log.position?.file,
          line: log.position?.line,
          column: log.position?.column,
        }));

      return {
        code,
        map,
        warnings,
        stats: {
          outputSize,
          buildTime,
          moduleCount: 1, // Bun doesn't expose the exact module count in the result object
        },
      };
    } catch (error: any) {
      if (error instanceof LesanBundlerError) throw error;
      throw new LesanBundlerError(error.message, [], error);
    }
  },

  async bundleString(
    code: string,
    options?: BundleOptions,
  ): Promise<BundleResult> {
    // Bun.build requires file entrypoints, so we write the string to a temporary file
    const tempFile = join(tmpdir(), `bun-bundle-${randomUUID()}.tsx`);
    try {
      await fs.writeFile(tempFile, code);
      return await this.bundle(tempFile, options);
    } finally {
      // Ensure cleanup happens even if bundling fails
      await fs.unlink(tempFile).catch(() => {});
    }
  },

  async transpile(code: string, options?: BundleOptions): Promise<string> {
    try {
      const transpiler = new Bun.Transpiler({
        loader: "tsx",
        target: "browser",
        minify: options?.minify ?? false,
      });
      return await transpiler.transform(code);
    } catch (error: any) {
      throw new LesanBundlerError(
        `Transpilation failed: ${error.message}`,
        [],
        error,
      );
    }
  },

  supports(feature: string): boolean {
    const supported = ["typescript", "jsx", "tsx", "esm", "minify"];
    return supported.includes(feature.toLowerCase());
  },

  getInfo(): BundlerInfo {
    return {
      name: "bun-build",
      version: typeof Bun !== "undefined" ? Bun.version : "unknown",
      features: ["typescript", "jsx", "tsx", "esm", "minify"],
    };
  },

  shutdown(): void {
    // Bun's bundler runs in the same process and doesn't spawn persistent
    // background workers like esbuild, so no explicit cleanup is required.
  },
};
