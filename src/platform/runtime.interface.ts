/**
 * Runtime Detection Platform Interface
 *
 * Provides utilities for detecting and identifying the current JavaScript runtime
 * environment (Node.js, Bun, or Deno). This allows the framework to automatically
 * load the appropriate platform adapters.
 *
 * @module platform/runtime
 * @since 2.0.0
 */

/**
 * Enumeration of supported JavaScript runtimes.
 *
 * @enum {string}
 */
export enum RuntimeType {
  /**
   * Deno runtime - https://deno.land
   */
  Deno = "deno",

  /**
   * Node.js runtime - https://nodejs.org
   */
  Node = "node",

  /**
   * Bun runtime - https://bun.sh
   */
  Bun = "bun",

  /**
   * Unknown or unsupported runtime
   */
  Unknown = "unknown",
}

/**
 * Information about the detected runtime environment.
 *
 * @interface RuntimeInfo
 */
export interface RuntimeInfo {
  /**
   * The type of runtime (Deno, Node, Bun, or Unknown).
   */
  type: RuntimeType;

  /**
   * The version string of the runtime (e.g., "1.40.0", "20.10.0").
   * May be undefined if version cannot be determined.
   */
  version?: string;

  /**
   * The runtime name as a readable string (e.g., "Deno", "Node.js", "Bun").
   */
  name: string;

  /**
   * Whether the runtime supports TypeScript natively.
   */
  supportsTypeScript: boolean;

  /**
   * Whether the runtime has a built-in bundler.
   */
  hasBuiltInBundler: boolean;

  /**
   * Whether the runtime has a built-in test runner.
   */
  hasBuiltInTestRunner: boolean;

  /**
   * Additional runtime-specific metadata.
   */
  metadata?: Record<string, unknown>;
}

/**
 * Unified interface for runtime detection operations.
 *
 * This interface provides utilities to detect the current JavaScript runtime
 * and access runtime-specific information. This enables the Lesan framework
 * to automatically select and load the appropriate platform adapters.
 *
 * @interface RuntimeAdapter
 *
 * @example
 * ```typescript
 * const runtime: RuntimeAdapter = getRuntimeAdapter();
 *
 * // Detect current runtime
 * const info = runtime.detect();
 * console.log(`Running on ${info.name} v${info.version}`);
 *
 * // Check specific runtime
 * if (runtime.isDeno()) {
 *   console.log('Using Deno-specific features');
 * }
 * ```
 */
export interface RuntimeAdapter {
  /**
   * Detects the current JavaScript runtime environment.
   *
   * This method analyzes global objects and environment variables to determine
   * which runtime is currently executing the code. The detection is performed
   * in the following order:
   * 1. Check for Deno global
   * 2. Check for Bun global
   * 3. Check for Node.js process.versions
   * 4. Return Unknown if none match
   *
   * @returns Information about the detected runtime
   *
   * @example
   * ```typescript
   * const info = runtime.detect();
   *
   * switch (info.type) {
   *   case RuntimeType.Deno:
   *     console.log('Running on Deno');
   *     break;
   *   case RuntimeType.Node:
   *     console.log('Running on Node.js');
   *     break;
   *   case RuntimeType.Bun:
   *     console.log('Running on Bun');
   *     break;
   *   default:
   *     console.warn('Unknown runtime');
   * }
   * ```
   */
  detect(): RuntimeInfo;

  /**
   * Checks if the current runtime is Deno.
   *
   * @returns True if running on Deno, false otherwise
   *
   * @example
   * ```typescript
   * if (runtime.isDeno()) {
   *   // Use Deno-specific APIs
   *   const data = await Deno.readTextFile('./config.json');
   * }
   * ```
   */
  isDeno(): boolean;

  /**
   * Checks if the current runtime is Node.js.
   *
   * @returns True if running on Node.js, false otherwise
   *
   * @example
   * ```typescript
   * if (runtime.isNode()) {
   *   // Use Node.js-specific APIs
   *   const fs = require('fs');
   * }
   * ```
   */
  isNode(): boolean;

  /**
   * Checks if the current runtime is Bun.
   *
   * @returns True if running on Bun, false otherwise
   *
   * @example
   * ```typescript
   * if (runtime.isBun()) {
   *   // Use Bun-specific APIs
   *   const data = await Bun.file('./config.json').text();
   * }
   * ```
   */
  isBun(): boolean;

  /**
   * Gets the runtime version string.
   *
   * @returns The version string (e.g., "1.40.0") or undefined if unavailable
   *
   * @example
   * ```typescript
   * const version = runtime.getVersion();
   * console.log(`Runtime version: ${version}`);
   * ```
   */
  getVersion(): string | undefined;

  /**
   * Gets the current runtime type.
   *
   * @returns The RuntimeType enum value
   *
   * @example
   * ```typescript
   * const type = runtime.getType();
   * if (type === RuntimeType.Deno) {
   *   console.log('Deno detected');
   * }
   * ```
   */
  getType(): RuntimeType;

  /**
   * Checks if the runtime meets a minimum version requirement.
   *
   * This is useful for ensuring compatibility with specific runtime features.
   * The version comparison follows semantic versioning rules.
   *
   * @param minVersion - The minimum required version (e.g., "20.0.0")
   * @returns True if the runtime version meets or exceeds the minimum, false otherwise
   *
   * @example
   * ```typescript
   * if (runtime.meetsVersion('20.0.0')) {
   *   // Use features available in Node.js 20+
   * } else {
   *   console.warn('Node.js 20+ required for this feature');
   * }
   * ```
   */
  meetsVersion(minVersion: string): boolean;

  /**
   * Gets a string representation of the runtime for logging/debugging.
   *
   * @returns A human-readable string like "Deno 1.40.0" or "Node.js 20.10.0"
   *
   * @example
   * ```typescript
   * console.log(`Starting server on ${runtime.toString()}`);
   * // Output: "Starting server on Deno 1.40.0"
   * ```
   */
  toString(): string;
}

/**
 * Detects the current JavaScript runtime environment.
 *
 * This function performs runtime detection by checking for runtime-specific
 * global objects and properties. It should be called once at application
 * startup to determine which platform adapters to load.
 *
 * @returns Information about the detected runtime
 *
 * @example
 * ```typescript
 * import { detectRuntime } from './platform/runtime.interface.ts';
 *
 * const info = detectRuntime();
 * console.log(`Running on: ${info.name}`);
 * console.log(`Version: ${info.version}`);
 * console.log(`TypeScript support: ${info.supportsTypeScript}`);
 * ```
 */
export function detectRuntime(): RuntimeInfo {
  // Check for Deno
  if (typeof Deno !== "undefined" && Deno.version?.deno) {
    return {
      type: RuntimeType.Deno,
      version: Deno.version.deno,
      name: "Deno",
      supportsTypeScript: true,
      hasBuiltInBundler: true,
      hasBuiltInTestRunner: true,
      metadata: {
        v8: Deno.version.v8,
        typescript: Deno.version.typescript,
      },
    };
  }

  // Check for Bun
  if (typeof Bun !== "undefined" && Bun.version) {
    return {
      type: RuntimeType.Bun,
      version: Bun.version,
      name: "Bun",
      supportsTypeScript: true,
      hasBuiltInBundler: true,
      hasBuiltInTestRunner: true,
      metadata: {
        revision: Bun.revision,
      },
    };
  }

  // Check for Node.js
  if (
    typeof process !== "undefined" &&
    process.versions &&
    process.versions.node
  ) {
    return {
      type: RuntimeType.Node,
      version: process.versions.node,
      name: "Node.js",
      supportsTypeScript: false,
      hasBuiltInBundler: false,
      hasBuiltInTestRunner: true, // node:test since v18
      metadata: {
        v8: process.versions.v8,
        modules: process.versions.modules,
      },
    };
  }

  // Unknown runtime
  return {
    type: RuntimeType.Unknown,
    name: "Unknown",
    supportsTypeScript: false,
    hasBuiltInBundler: false,
    hasBuiltInTestRunner: false,
  };
}

/**
 * Checks if the current runtime is Deno.
 *
 * @returns True if running on Deno
 *
 * @example
 * ```typescript
 * import { isDeno } from './platform/runtime.interface.ts';
 *
 * if (isDeno()) {
 *   console.log('Running on Deno');
 * }
 * ```
 */
export function isDeno(): boolean {
  return typeof Deno !== "undefined" && Deno.version?.deno !== undefined;
}

/**
 * Checks if the current runtime is Node.js.
 *
 * @returns True if running on Node.js
 *
 * @example
 * ```typescript
 * import { isNode } from './platform/runtime.interface.ts';
 *
 * if (isNode()) {
 *   console.log('Running on Node.js');
 * }
 * ```
 */
export function isNode(): boolean {
  return (
    typeof process !== "undefined" &&
    process.versions?.node !== undefined &&
    typeof Deno === "undefined" &&
    typeof Bun === "undefined"
  );
}

/**
 * Checks if the current runtime is Bun.
 *
 * @returns True if running on Bun
 *
 * @example
 * ```typescript
 * import { isBun } from './platform/runtime.interface.ts';
 *
 * if (isBun()) {
 *   console.log('Running on Bun');
 * }
 * ```
 */
export function isBun(): boolean {
  return typeof Bun !== "undefined" && Bun.version !== undefined;
}

/**
 * Gets the runtime version string.
 *
 * @returns The version string or undefined if unavailable
 *
 * @example
 * ```typescript
 * import { getRuntimeVersion } from './platform/runtime.interface.ts';
 *
 * const version = getRuntimeVersion();
 * console.log(`Runtime version: ${version}`);
 * ```
 */
export function getRuntimeVersion(): string | undefined {
  if (isDeno()) {
    return Deno.version.deno;
  }
  if (isBun()) {
    return Bun.version;
  }
  if (isNode()) {
    return process.versions.node;
  }
  return undefined;
}

/**
 * Compares two semantic version strings.
 *
 * @param version - The version to compare
 * @param minVersion - The minimum required version
 * @returns True if version >= minVersion
 *
 * @example
 * ```typescript
 * compareVersions('20.10.0', '20.0.0'); // true
 * compareVersions('18.0.0', '20.0.0');  // false
 * ```
 */
export function compareVersions(
  version: string,
  minVersion: string,
): boolean {
  const v1Parts = version.split(".").map(Number);
  const v2Parts = minVersion.split(".").map(Number);

  for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
    const v1 = v1Parts[i] || 0;
    const v2 = v2Parts[i] || 0;

    if (v1 > v2) return true;
    if (v1 < v2) return false;
  }

  return true; // Equal versions
}

/**
 * Checks if the runtime meets a minimum version requirement.
 *
 * @param minVersion - The minimum required version
 * @returns True if the current runtime version meets or exceeds the minimum
 *
 * @example
 * ```typescript
 * import { meetsVersion } from './platform/runtime.interface.ts';
 *
 * if (meetsVersion('20.0.0')) {
 *   // Use Node.js 20+ features
 * }
 * ```
 */
export function meetsVersion(minVersion: string): boolean {
  const version = getRuntimeVersion();
  if (!version) return false;
  return compareVersions(version, minVersion);
}

/**
 * Gets a string representation of the current runtime.
 *
 * @returns A human-readable string like "Deno 1.40.0"
 *
 * @example
 * ```typescript
 * import { getRuntimeString } from './platform/runtime.interface.ts';
 *
 * console.log(`Running on ${getRuntimeString()}`);
 * // Output: "Running on Deno 1.40.0"
 * ```
 */
export function getRuntimeString(): string {
  const info = detectRuntime();
  return info.version ? `${info.name} ${info.version}` : info.name;
}

/**
 * Runtime detection error.
 *
 * @class RuntimeError
 * @extends Error
 */
export class RuntimeError extends Error {
  constructor(
    message: string,
    public readonly detectedRuntime: RuntimeType,
    public override readonly cause?: Error,
  ) {
    super(message);
    this.name = "RuntimeError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RuntimeError);
    }
  }
}

/**
 * Type guard to check if an error is a RuntimeError.
 *
 * @param error - The error to check
 * @returns True if the error is a RuntimeError
 */
export function isRuntimeError(error: unknown): error is RuntimeError {
  return error instanceof RuntimeError;
}

/**
 * Assert that the code is running on a specific runtime.
 *
 * @param expectedRuntime - The expected runtime type
 * @throws {RuntimeError} If the current runtime doesn't match the expected one
 *
 * @example
 * ```typescript
 * import { assertRuntime, RuntimeType } from './platform/runtime.interface.ts';
 *
 * // Ensure we're running on Deno
 * assertRuntime(RuntimeType.Deno);
 *
 * // Now safe to use Deno-specific APIs
 * const data = await Deno.readTextFile('./config.json');
 * ```
 */
export function assertRuntime(expectedRuntime: RuntimeType): void {
  const info = detectRuntime();
  if (info.type !== expectedRuntime) {
    throw new RuntimeError(
      `Expected runtime ${expectedRuntime}, but detected ${info.type}`,
      info.type,
    );
  }
}

declare var Bun: any;
