/**
 * @file bundler.adapter.ts
 * @description Node.js implementation of the BundlerAdapter interface.
 */

import * as esbuild from "esbuild";
import * as path from "node:path";
import * as fs from "node:fs/promises";
import type {
  BundleOptions,
  BundlerAdapter,
  BundleResult,
  BundlerInfo,
} from "../../platform/bundler.interface.ts";
import { BundlerError } from "../../platform/bundler.interface.ts";

/**
 * Node.js implementation of the BundlerAdapter interface.
 *
 * Uses esbuild for extremely fast TypeScript transpilation and bundling.
 */
export class NodeBundlerAdapter implements BundlerAdapter {
  /**
   * Bundles code from a URL or file path using esbuild
   */
  async bundle(
    entry: string | URL,
    options?: BundleOptions,
  ): Promise<BundleResult> {
    const startTime = performance.now();

    try {
      // Resolve entry path
      let entryPath: string;
      if (entry instanceof URL) {
        if (entry.protocol !== "file:") {
          throw new Error("Only file:// URLs are supported for bundling");
        }
        entryPath = entry.pathname;
      } else {
        entryPath = entry.startsWith("/")
          ? entry
          : path.resolve(process.cwd(), entry);
      }

      // Map options to esbuild config
      const buildOptions = this.mapEsbuildOptions(options);
      buildOptions.entryPoints = [entryPath];
      buildOptions.write = false; // Return result in memory

      // Run esbuild
      const result = await esbuild.build(buildOptions);

      const buildTime = performance.now() - startTime;

      // Extract output
      let code = "";
      let map: string | undefined;

      for (const file of result.outputFiles || []) {
        if (file.path.endsWith(".map")) {
          map = file.text;
        } else {
          code = file.text;
        }
      }

      return {
        code,
        map,
        stats: {
          outputSize: code.length,
          buildTime: Math.round(buildTime),
          moduleCount: Object.keys(result.metafile?.inputs || {}).length || 1,
        },
        warnings: result.warnings.map((w) => ({
          message: w.text,
          file: w.location?.file,
          line: w.location?.line,
          column: w.location?.column,
        })),
        errors: [],
      };
    } catch (error: any) {
      const errors = error.errors?.map((e: any) => ({
        message: e.text,
        file: e.location?.file,
        line: e.location?.line,
        column: e.location?.column,
      })) || [{ message: error.message }];

      throw new BundlerError(
        `Failed to bundle: ${error.message}`,
        errors,
        error,
      );
    } finally {
      await esbuild.stop();
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
      // Map options to esbuild config
      const buildOptions = this.mapEsbuildOptions(options);
      buildOptions.stdin = {
        contents: code,
        resolveDir: process.cwd(),
        loader: "tsx", // Assume TSX to support everything
      };
      buildOptions.write = false;

      // Run esbuild
      const result = await esbuild.build(buildOptions);

      const buildTime = performance.now() - startTime;

      // Extract output
      let bundledCode = "";
      let map: string | undefined;

      for (const file of result.outputFiles || []) {
        if (file.path.endsWith(".map")) {
          map = file.text;
        } else {
          bundledCode = file.text;
        }
      }

      return {
        code: bundledCode,
        map,
        stats: {
          outputSize: bundledCode.length,
          buildTime: Math.round(buildTime),
          moduleCount: Object.keys(result.metafile?.inputs || {}).length || 1,
          inputSize: code.length,
        },
        warnings: result.warnings.map((w) => ({
          message: w.text,
          file: w.location?.file,
          line: w.location?.line,
          column: w.location?.column,
        })),
        errors: [],
      };
    } catch (error: any) {
      const errors = error.errors?.map((e: any) => ({
        message: e.text,
        file: e.location?.file,
        line: e.location?.line,
        column: e.location?.column,
      })) || [{ message: error.message }];

      throw new BundlerError(
        `Failed to bundle string: ${error.message}`,
        errors,
        error,
      );
    } finally {
      await esbuild.stop();
    }
  }

  /**
   * Transpiles TypeScript to JavaScript without bundling
   */
  async transpile(code: string, options?: BundleOptions): Promise<string> {
    try {
      const transformOptions: esbuild.TransformOptions = {
        loader: "tsx",
        target: this.mapTarget(options?.target || "esnext"),
        format: options?.format === "cjs" ? "cjs" : "esm",
        minify: options?.minify,
        sourcemap: options?.sourcemap === true ? "inline" : false,
      };

      if (options?.compilerOptions?.jsxFactory) {
        transformOptions.jsxFactory = options.compilerOptions.jsxFactory;
      }
      if (options?.compilerOptions?.jsxFragmentFactory) {
        transformOptions.jsxFragment =
          options.compilerOptions.jsxFragmentFactory;
      }

      const result = await esbuild.transform(code, transformOptions);
      return result.code;
    } catch (error: any) {
      const errors = error.errors?.map((e: any) => ({
        message: e.text,
        file: e.location?.file,
        line: e.location?.line,
        column: e.location?.column,
      })) || [{ message: error.message }];

      throw new BundlerError(
        `Failed to transpile: ${error.message}`,
        errors,
        error,
      );
    } finally {
      await esbuild.stop();
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
      "cjs",
      "iife",
      "sourcemap",
      "minify",
      "css",
      "json",
    ];

    return supportedFeatures.includes(feature.toLowerCase());
  }

  /**
   * Gets information about the bundler implementation
   */
  getInfo(): BundlerInfo {
    return {
      name: "esbuild",
      version: esbuild.version,
      features: [
        "typescript",
        "jsx",
        "tsx",
        "esm",
        "cjs",
        "iife",
        "sourcemap",
        "minify",
        "css",
        "json",
      ],
      metadata: {
        runtime: "node",
      },
    };
  }

  /**
   * Shuts down the bundler and cleans up any background processes or resources.
   */
  async shutdown(): Promise<void> {
    await esbuild.stop();
  }

  /**
   * Maps BundleOptions to esbuild BuildOptions
   */
  private mapEsbuildOptions(options?: BundleOptions): esbuild.BuildOptions {
    const buildOptions: esbuild.BuildOptions = {
      bundle: options?.bundle !== false,
      minify: options?.minify,
      target: this.mapTarget(options?.target || "esnext"),
      format: options?.format === "cjs"
        ? "cjs"
        : options?.format === "iife"
        ? "iife"
        : "esm",
      external: options?.external,
      define: options?.define,
      metafile: true, // Always generate metafile for stats
    };

    // Handle sourcemaps
    if (options?.sourcemap) {
      if (options.sourcemap === "inline") {
        buildOptions.sourcemap = "inline";
      } else if (options.sourcemap === "external") {
        buildOptions.sourcemap = "external";
      } else {
        buildOptions.sourcemap = true;
      }
    }

    // Handle JSX options
    if (options?.compilerOptions?.jsxFactory) {
      buildOptions.jsxFactory = options.compilerOptions.jsxFactory;
    }
    if (options?.compilerOptions?.jsxFragmentFactory) {
      buildOptions.jsxFragment = options.compilerOptions.jsxFragmentFactory;
    }

    return buildOptions;
  }

  /**
   * Maps bundle target to esbuild target
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
}

/**
 * Factory function to create a Node.js bundler adapter
 */
export function createNodeBundlerAdapter(): BundlerAdapter {
  return new NodeBundlerAdapter();
}

// Export a default instance for convenience
export const nodeBundlerAdapter = createNodeBundlerAdapter();
