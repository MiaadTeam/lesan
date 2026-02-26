/**
 * Bundler Platform Interface
 *
 * Provides a unified interface for code bundling operations across different JavaScript
 * runtimes (Node.js, Bun, and Deno). This is primarily used for the Lesan playground
 * feature to bundle TypeScript/JavaScript code for the browser.
 *
 * @module platform/bundler
 * @since 2.0.0
 */

/**
 * Options for configuring the bundling process.
 *
 * @interface BundleOptions
 */
export interface BundleOptions {
  /**
   * The module format for the output bundle.
   * - 'esm': ES modules (import/export)
   * - 'cjs': CommonJS (require/module.exports)
   * - 'iife': Immediately Invoked Function Expression (for browsers)
   * - 'classic': Classic script tag format
   * @default 'esm'
   */
  format?: "esm" | "cjs" | "iife" | "classic";

  /**
   * Whether to minify the output bundle.
   * @default false
   */
  minify?: boolean;

  /**
   * Whether to generate source maps.
   * @default false
   */
  sourcemap?: boolean | "inline" | "external";

  /**
   * Target environment for the bundle.
   * Affects which language features are transpiled.
   * @default 'esnext'
   */
  target?:
    | "es2015"
    | "es2016"
    | "es2017"
    | "es2018"
    | "es2019"
    | "es2020"
    | "es2021"
    | "es2022"
    | "esnext";

  /**
   * External modules that should not be bundled.
   * These will be left as import statements in the output.
   */
  external?: string[];

  /**
   * Custom import map for resolving module specifiers.
   */
  importMap?: Record<string, string>;

  /**
   * TypeScript compiler options.
   */
  compilerOptions?: {
    /**
     * Target JavaScript version.
     */
    target?: string;

    /**
     * Module system.
     */
    module?: string;

    /**
     * Enable JSX support.
     */
    jsx?: "react" | "react-jsx" | "react-jsxdev" | "preserve";

    /**
     * JSX factory function.
     * @default 'React.createElement'
     */
    jsxFactory?: string;

    /**
     * JSX fragment factory.
     * @default 'React.Fragment'
     */
    jsxFragmentFactory?: string;

    /**
     * Whether to generate source maps.
     */
    sourceMap?: boolean;

    /**
     * Additional compiler options.
     */
    [key: string]: unknown;
  };

  /**
   * Plugin hooks for customizing the bundling process.
   */
  plugins?: BundlerPlugin[];

  /**
   * Whether to bundle all dependencies or leave them external.
   * @default true
   */
  bundle?: boolean;

  /**
   * Define global constants that will be replaced during bundling.
   */
  define?: Record<string, string>;

  /**
   * Loader configuration for different file types.
   */
  loader?: Record<string, "js" | "jsx" | "ts" | "tsx" | "json" | "text">;

  /**
   * Whether to preserve comments in the output.
   * @default false
   */
  keepComments?: boolean;
}

/**
 * Result of a bundling operation.
 *
 * @interface BundleResult
 */
export interface BundleResult {
  /**
   * The bundled code as a string.
   */
  code: string;

  /**
   * Source map for the bundled code (if sourcemap option was enabled).
   */
  map?: string;

  /**
   * Array of warnings generated during bundling.
   */
  warnings?: BundleWarning[];

  /**
   * Array of errors that occurred during bundling.
   */
  errors?: BundleError[];

  /**
   * Statistics about the bundle.
   */
  stats?: BundleStats;

  /**
   * List of modules included in the bundle.
   */
  modules?: BundleModule[];
}

/**
 * Information about a module in the bundle.
 *
 * @interface BundleModule
 */
export interface BundleModule {
  /**
   * The path or specifier of the module.
   */
  path: string;

  /**
   * Size of the module in bytes (before bundling).
   */
  size: number;

  /**
   * Dependencies of this module.
   */
  dependencies?: string[];
}

/**
 * Statistics about the bundling process.
 *
 * @interface BundleStats
 */
export interface BundleStats {
  /**
   * Size of the output bundle in bytes.
   */
  outputSize: number;

  /**
   * Time taken to bundle in milliseconds.
   */
  buildTime: number;

  /**
   * Number of modules bundled.
   */
  moduleCount: number;

  /**
   * Total size of all input modules before bundling.
   */
  inputSize?: number;
}

/**
 * Warning message from the bundler.
 *
 * @interface BundleWarning
 */
export interface BundleWarning {
  /**
   * The warning message.
   */
  message: string;

  /**
   * File where the warning occurred.
   */
  file?: string;

  /**
   * Line number where the warning occurred.
   */
  line?: number;

  /**
   * Column number where the warning occurred.
   */
  column?: number;
}

/**
 * Error from the bundler.
 *
 * @interface BundleError
 */
export interface BundleError {
  /**
   * The error message.
   */
  message: string;

  /**
   * File where the error occurred.
   */
  file?: string;

  /**
   * Line number where the error occurred.
   */
  line?: number;

  /**
   * Column number where the error occurred.
   */
  column?: number;

  /**
   * Stack trace of the error.
   */
  stack?: string;
}

/**
 * Plugin interface for extending bundler functionality.
 *
 * @interface BundlerPlugin
 */
export interface BundlerPlugin {
  /**
   * Name of the plugin.
   */
  name: string;

  /**
   * Setup function called when the plugin is loaded.
   */
  setup?: (build: unknown) => void | Promise<void>;
}

/**
 * Unified interface for code bundling operations across different JavaScript runtimes.
 *
 * This interface abstracts runtime-specific bundler APIs to provide a consistent
 * API for Lesan's playground feature. Implementations must handle platform-specific
 * differences in:
 * - Module resolution
 * - TypeScript compilation
 * - Code transformation
 * - Source map generation
 *
 * @interface BundlerAdapter
 *
 * @example
 * ```typescript
 * const bundler: BundlerAdapter = getAdapter();
 *
 * // Bundle TypeScript code
 * const result = await bundler.bundle(
 *   new URL('./playground/hydrate.tsx', import.meta.url),
 *   {
 *     format: 'esm',
 *     minify: true,
 *     sourcemap: true
 *   }
 * );
 *
 * console.log(`Bundle size: ${result.stats?.outputSize} bytes`);
 * ```
 */
export interface BundlerAdapter {
  /**
   * Bundles code from a URL or file path.
   *
   * This method takes an entry point (file path or URL) and produces a bundled
   * output that can be executed in the target environment. The bundler will:
   * - Resolve and load all dependencies
   * - Transpile TypeScript to JavaScript
   * - Transform modern syntax for target compatibility
   * - Optionally minify the output
   * - Generate source maps
   *
   * @param entry - The entry point for bundling (file path or URL)
   * @param options - Configuration options for the bundling process
   * @returns A promise that resolves to the bundle result
   * @throws {BundlerError} If bundling fails
   *
   * @example
   * ```typescript
   * // Bundle from file path
   * const result1 = await bundler.bundle('./src/index.ts', {
   *   format: 'esm',
   *   minify: true
   * });
   *
   * // Bundle from URL
   * const result2 = await bundler.bundle(
   *   new URL('./mod.ts', import.meta.url),
   *   { format: 'iife' }
   * );
   * ```
   */
  bundle(entry: string | URL, options?: BundleOptions): Promise<BundleResult>;

  /**
   * Bundles code from a string of source code.
   *
   * This is useful for bundling dynamically generated code or code that
   * doesn't exist as a file.
   *
   * @param code - The source code to bundle
   * @param options - Configuration options for the bundling process
   * @returns A promise that resolves to the bundle result
   * @throws {BundlerError} If bundling fails
   *
   * @example
   * ```typescript
   * const code = `
   *   import { hello } from './utils.ts';
   *   console.log(hello());
   * `;
   *
   * const result = await bundler.bundleString(code, {
   *   format: 'esm'
   * });
   * ```
   */
  bundleString(code: string, options?: BundleOptions): Promise<BundleResult>;

  /**
   * Transpiles TypeScript to JavaScript without bundling.
   *
   * This method only performs TypeScript compilation without resolving
   * dependencies or bundling. Useful for quick transformations.
   *
   * @param code - The TypeScript code to transpile
   * @param options - Compiler options
   * @returns A promise that resolves to the transpiled JavaScript code
   * @throws {BundlerError} If transpilation fails
   *
   * @example
   * ```typescript
   * const tsCode = `
   *   const greeting: string = 'Hello, TypeScript!';
   *   console.log(greeting);
   * `;
   *
   * const jsCode = await bundler.transpile(tsCode);
   * ```
   */
  transpile(code: string, options?: BundleOptions): Promise<string>;

  /**
   * Checks if the bundler supports a specific feature.
   *
   * @param feature - The feature to check (e.g., 'jsx', 'css', 'json')
   * @returns True if the feature is supported
   *
   * @example
   * ```typescript
   * if (bundler.supports('jsx')) {
   *   // Bundle React components
   * }
   * ```
   */
  supports(feature: string): boolean;

  /**
   * Gets information about the underlying bundler implementation.
   *
   * @returns Information about the bundler
   *
   * @example
   * ```typescript
   * const info = bundler.getInfo();
   * console.log(`Using ${info.name} v${info.version}`);
   * ```
   */
  getInfo(): BundlerInfo;

  /**
   * Shuts down the bundler and cleans up any background processes or resources.
   *
   * Some bundlers (like esbuild) maintain background worker processes that need
   * to be explicitly stopped when the bundler is no longer needed, especially
   * in testing environments to prevent resource leaks.
   *
   * @returns A promise that resolves when shutdown is complete, or void
   */
  shutdown?(): Promise<void> | void;
}

/**
 * Information about the bundler implementation.
 *
 * @interface BundlerInfo
 */
export interface BundlerInfo {
  /**
   * Name of the bundler (e.g., 'esbuild', 'deno-emit', 'bun-bundler').
   */
  name: string;

  /**
   * Version of the bundler.
   */
  version?: string;

  /**
   * Features supported by this bundler.
   */
  features: string[];

  /**
   * Additional metadata about the bundler.
   */
  metadata?: Record<string, unknown>;
}

/**
 * Error thrown when a bundling operation fails.
 *
 * @class BundlerError
 * @extends Error
 */
export class BundlerError extends Error {
  /**
   * Creates a new BundlerError.
   *
   * @param message - The error message
   * @param errors - Array of detailed error information
   * @param cause - The underlying error that caused this error
   */
  constructor(
    message: string,
    public readonly errors: BundleError[] = [],
    public override readonly cause?: Error,
  ) {
    super(message);
    this.name = "BundlerError";

    // Maintains proper stack trace in V8 engines
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BundlerError);
    }
  }
}

/**
 * Type guard to check if an error is a BundlerError.
 *
 * @param error - The error to check
 * @returns True if the error is a BundlerError
 *
 * @example
 * ```typescript
 * try {
 *   await bundler.bundle('./index.ts');
 * } catch (error) {
 *   if (isBundlerError(error)) {
 *     console.error('Bundling failed:', error.message);
 *     error.errors.forEach(err => {
 *       console.error(`  ${err.file}:${err.line} - ${err.message}`);
 *     });
 *   }
 * }
 * ```
 */
export function isBundlerError(error: unknown): error is BundlerError {
  return error instanceof BundlerError;
}

/**
 * Helper function to format bundle size in human-readable format.
 *
 * @param bytes - Size in bytes
 * @returns Formatted string (e.g., "1.5 KB", "2.3 MB")
 *
 * @example
 * ```typescript
 * const size = formatBundleSize(15000);
 * console.log(size); // "14.6 KB"
 * ```
 */
export function formatBundleSize(bytes: number): string {
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
}

/**
 * Helper function to estimate gzipped size (rough approximation).
 *
 * @param code - The code to estimate
 * @returns Estimated gzipped size in bytes
 *
 * @example
 * ```typescript
 * const gzipSize = estimateGzipSize(result.code);
 * console.log(`Estimated gzip size: ${formatBundleSize(gzipSize)}`);
 * ```
 */
export function estimateGzipSize(code: string): number {
  // Rough approximation: gzip typically achieves 70-80% compression for JS
  return Math.floor(code.length * 0.3);
}
