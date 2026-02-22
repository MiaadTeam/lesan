/**
 * Deno Bundler Adapter
 *
 * Implements the BundlerAdapter interface using deno_emit for bundling operations.
 *
 * @module adapters/deno/bundler
 */

import { bundle, transpile } from "https://deno.land/x/emit@0.38.2/mod.ts";
import type {
  BundleOptions,
  BundlerAdapter,
  BundleResult,
  BundlerInfo,
} from "../../platform/bundler.interface.ts";
import { BundlerError } from "../../platform/bundler.interface.ts";

/**
 * Deno implementation of the BundlerAdapter interface.
 *
 * Uses deno_emit for TypeScript transpilation and bundling.
 */
export class DenoBundlerAdapter implements BundlerAdapter {
  private readonly denoVersion: string;

  constructor() {
    this.denoVersion = Deno.version.deno;
  }

  /**
   * Bundles code from a URL or file path using deno_emit
   */
  async bundle(
    entry: string | URL,
    options?: BundleOptions,
  ): Promise<BundleResult> {
    const startTime = performance.now();

    try {
      // Convert string path to URL if needed
      let entryUrl: URL;
      if (typeof entry === "string") {
        // Handle relative paths - need to resolve to absolute path
        if (
          !entry.startsWith("http://") && !entry.startsWith("https://") &&
          !entry.startsWith("file://")
        ) {
          // It's a file path - resolve to absolute
          const absolutePath = entry.startsWith("/")
            ? entry
            : `${Deno.cwd()}/${entry}`;
          entryUrl = new URL(`file://${absolutePath}`);
        } else {
          entryUrl = new URL(entry);
        }
      } else {
        entryUrl = entry;
      }

      // Use deno_emit for bundling
      const result = await bundle(entryUrl, {
        compilerOptions: this.buildCompilerOptions(options),
        importMap: options?.importMap
          ? { imports: options.importMap }
          : undefined,
      });

      const code = result.code;
      const buildTime = performance.now() - startTime;

      // Apply minification if requested
      let finalCode = code;
      if (options?.minify) {
        finalCode = this.minifyCode(code);
      }

      // Apply format transformation
      finalCode = this.transformFormat(finalCode, options?.format || "esm");

      return {
        code: finalCode,
        stats: {
          outputSize: finalCode.length,
          buildTime: Math.round(buildTime),
          moduleCount: 1,
        },
        warnings: [],
        errors: [],
      };
    } catch (error) {
      throw new BundlerError(
        `Failed to bundle: ${(error as Error).message}`,
        [{
          message: (error as Error).message,
          stack: (error as Error).stack,
        }],
        error as Error,
      );
    }
  }

  /**
   * Bundles code from a string of source code
   */
  async bundleString(
    code: string,
    options?: BundleOptions,
  ): Promise<BundleResult> {
    const startTime = performance.now();

    try {
      // Create a temporary file URL for the code
      const tempUrl = `data:application/typescript;base64,${btoa(code)}`;

      // Use deno_emit bundle function
      const result = await bundle(new URL(tempUrl), {
        compilerOptions: this.buildCompilerOptions(options),
        importMap: options?.importMap
          ? { imports: options.importMap }
          : undefined,
      });

      let bundledCode = result.code;
      const buildTime = performance.now() - startTime;

      // Apply format transformation
      bundledCode = this.transformFormat(
        bundledCode,
        options?.format || "esm",
      );

      // Apply minification if requested
      if (options?.minify) {
        bundledCode = this.minifyCode(bundledCode);
      }

      // Handle source maps
      let sourceMap: string | undefined;
      if (options?.sourcemap) {
        if (options.sourcemap === "inline") {
          bundledCode = this.addInlineSourceMap(bundledCode, code);
        } else {
          sourceMap = this.generateSourceMap(code, bundledCode);
        }
      }

      return {
        code: bundledCode,
        map: sourceMap,
        stats: {
          outputSize: bundledCode.length,
          buildTime: Math.round(buildTime),
          moduleCount: 1,
          inputSize: code.length,
        },
        warnings: [],
        errors: [],
      };
    } catch (error) {
      throw new BundlerError(
        `Failed to bundle string: ${(error as Error).message}`,
        [{
          message: (error as Error).message,
          stack: (error as Error).stack,
        }],
        error as Error,
      );
    }
  }

  /**
   * Transpiles TypeScript to JavaScript without bundling
   */
  async transpile(code: string, options?: BundleOptions): Promise<string> {
    try {
      // Use deno_emit transpile function with a proper URL
      const url = new URL("file:///main.ts");
      const result = await transpile(url, {
        load: (specifier: string) => {
          if (specifier === "file:///main.ts") {
            return Promise.resolve({
              kind: "module",
              specifier,
              content: code,
            });
          }
          return Promise.resolve({
            kind: "external",
            specifier,
          });
        },
        compilerOptions: this.buildCompilerOptions(options),
      });

      // The result is a map of URLs to transpiled code
      const transpiled = result.get("file:///main.ts");
      if (!transpiled) {
        throw new Error("Failed to retrieve transpiled code");
      }
      return transpiled;
    } catch (error) {
      throw new BundlerError(
        `Failed to transpile: ${(error as Error).message}`,
        [{
          message: (error as Error).message,
          stack: (error as Error).stack,
        }],
        error as Error,
      );
    }
  }

  /**
   * Checks if the bundler supports a specific feature
   */
  supports(feature: string): boolean {
    const supportedFeatures = [
      "typescript",
      "jsx",
      "tsx",
      "esm",
      "sourcemap",
      "minify",
    ];

    return supportedFeatures.includes(feature.toLowerCase());
  }

  /**
   * Gets information about the bundler implementation
   */
  getInfo(): BundlerInfo {
    return {
      name: "deno_emit",
      version: "0.38.2",
      features: [
        "typescript",
        "jsx",
        "tsx",
        "esm",
        "sourcemap",
        "minify",
        "data-urls",
      ],
      metadata: {
        runtime: "deno",
        denoVersion: this.denoVersion,
      },
    };
  }

  /**
   * Builds TypeScript compiler options from BundleOptions
   */
  private buildCompilerOptions(
    options?: BundleOptions,
  ): Record<string, unknown> {
    const compilerOptions: Record<string, unknown> = {
      target: this.mapTarget(options?.target || "esnext"),
      lib: ["dom", "esnext"],
      sourceMap: options?.sourcemap === true ||
        options?.sourcemap === "external",
      ...options?.compilerOptions,
    };

    return compilerOptions;
  }

  /**
   * Maps bundle target to TypeScript target
   */
  private mapTarget(target: string): string {
    const targetMap: Record<string, string> = {
      es2015: "es2015",
      es2016: "es2016",
      es2017: "es2017",
      es2018: "es2018",
      es2019: "es2019",
      es2020: "es2020",
      es2021: "es2021",
      es2022: "es2022",
      esnext: "esnext",
    };

    return targetMap[target] || "esnext";
  }

  /**
   * Transform code to different module formats
   */
  private transformFormat(code: string, format: string): string {
    switch (format) {
      case "iife":
        return this.wrapAsIIFE(code);
      case "cjs":
        return this.convertToCommonJS(code);
      case "esm":
      case "classic":
      default:
        return code;
    }
  }

  /**
   * Wraps code in an IIFE (Immediately Invoked Function Expression)
   */
  private wrapAsIIFE(code: string): string {
    return `(function() {
'use strict';
${code}
})();`;
  }

  /**
   * Converts ESM exports to CommonJS (simple conversion)
   */
  private convertToCommonJS(code: string): string {
    let converted = code;

    // Replace export default
    converted = converted.replace(
      /export\s+default\s+/g,
      "module.exports = ",
    );

    // Replace named exports (simplified)
    converted = converted.replace(
      /export\s+\{([^}]+)\}/g,
      (_match, names) => {
        const exports = names.split(",").map((n: string) => n.trim());
        return exports
          .map((name: string) => `module.exports.${name} = ${name};`)
          .join("\n");
      },
    );

    // Replace export const/let/var
    converted = converted.replace(
      /export\s+(const|let|var)\s+(\w+)/g,
      (_match, keyword, name) => {
        return `${keyword} ${name}`;
      },
    );

    return converted;
  }

  /**
   * Basic minification (removes whitespace and comments)
   */
  private minifyCode(code: string): string {
    return code
      // Remove single-line comments
      .replace(/\/\/.*$/gm, "")
      // Remove multi-line comments
      .replace(/\/\*[\s\S]*?\*\//g, "")
      // Remove extra whitespace
      .replace(/\s+/g, " ")
      // Remove whitespace around certain characters
      .replace(/\s*([{};,:])\s*/g, "$1")
      .trim();
  }

  /**
   * Adds inline source map to code
   */
  private addInlineSourceMap(code: string, originalCode: string): string {
    const sourceMap = this.generateSourceMap(originalCode, code);
    const base64Map = btoa(sourceMap);
    return `${code}\n//# sourceMappingURL=data:application/json;base64,${base64Map}`;
  }

  /**
   * Generates a basic source map
   */
  private generateSourceMap(source: string, generated: string): string {
    // Basic source map structure
    const map = {
      version: 3,
      sources: ["input.ts"],
      sourcesContent: [source],
      names: [],
      mappings: "", // Empty mappings for simple case
      file: "output.js",
    };

    return JSON.stringify(map);
  }
}

/**
 * Factory function to create a Deno bundler adapter
 */
export function createDenoBundlerAdapter(): BundlerAdapter {
  return new DenoBundlerAdapter();
}
