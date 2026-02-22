/**
 * Platform Abstraction Layer - Barrel Export
 *
 * This module exports all platform interfaces and utilities for cross-runtime support.
 * Import from this module to access all platform abstractions.
 *
 * @module platform
 * @since 2.0.0
 *
 * @example
 * ```typescript
 * // Import specific interfaces
 * import { FileSystemAdapter, HttpServerAdapter } from './platform';
 *
 * // Import runtime detection
 * import { detectRuntime, RuntimeType } from './platform';
 *
 * // Use in application
 * const runtime = detectRuntime();
 * console.log(`Running on ${runtime.name}`);
 * ```
 */

// File System Interface
import type { FileInfo, FileSystemAdapter } from "./fs.interface.ts";
export type { FileInfo, FileSystemAdapter };
export { FileSystemError, isFileSystemError } from "./fs.interface.ts";

// HTTP Server Interface
import type {
  FileServeInfo,
  HttpServerAdapter,
  RequestHandler,
  ServeFileOptions,
  ServerOptions,
  ShutdownOptions,
} from "./http.interface.ts";
export type {
  FileServeInfo,
  HttpServerAdapter,
  RequestHandler,
  ServeFileOptions,
  ServerOptions,
  ShutdownOptions,
};
export {
  COMMON_MIME_TYPES,
  getClientIp,
  HttpServerError,
  isHttpServerError,
  isSecureRequest,
} from "./http.interface.ts";

// Environment Interface
import type { EnvironmentAdapter } from "./env.interface.ts";
export type { EnvironmentAdapter };
export {
  EnvironmentError,
  isEnvironmentError,
  parseArray,
  parseBoolean,
  parseNumber,
} from "./env.interface.ts";

// Runtime Detection Interface
import type { RuntimeAdapter, RuntimeInfo } from "./runtime.interface.ts";
export type { RuntimeAdapter, RuntimeInfo };
export {
  assertRuntime,
  compareVersions,
  detectRuntime,
  getRuntimeString,
  getRuntimeVersion,
  isBun,
  isDeno,
  isNode,
  isRuntimeError,
  meetsVersion,
  RuntimeError,
  RuntimeType,
} from "./runtime.interface.ts";

// Bundler Interface
import type {
  BundleError,
  BundleModule,
  BundleOptions,
  BundlerAdapter,
  BundleResult,
  BundlerInfo,
  BundlerPlugin,
  BundleStats,
  BundleWarning,
} from "./bundler.interface.ts";
export type {
  BundleError,
  BundleModule,
  BundleOptions,
  BundlerAdapter,
  BundleResult,
  BundlerInfo,
  BundlerPlugin,
  BundleStats,
  BundleWarning,
};
export {
  BundlerError,
  estimateGzipSize,
  formatBundleSize,
  isBundlerError,
} from "./bundler.interface.ts";

/**
 * Complete platform adapter interface.
 *
 * This combines all platform-specific adapters into a single object
 * that can be injected into the core framework.
 *
 * @interface PlatformAdapter
 */
export interface PlatformAdapter {
  /**
   * File system operations adapter.
   */
  fs: FileSystemAdapter;

  /**
   * HTTP server operations adapter.
   */
  http: HttpServerAdapter;

  /**
   * Environment variables adapter.
   */
  env: EnvironmentAdapter;

  /**
   * Runtime detection adapter.
   */
  runtime: RuntimeAdapter;

  /**
   * Code bundler adapter (optional, for playground features).
   */
  bundler?: BundlerAdapter;
}

/**
 * Platform adapter factory function type.
 *
 * This function creates and returns a complete platform adapter
 * for a specific runtime.
 *
 * @callback PlatformAdapterFactory
 * @returns The platform adapter instance
 */
export type PlatformAdapterFactory = () => PlatformAdapter;
