/**
 * @file env.adapter.ts
 * @description Node.js implementation of the EnvironmentAdapter interface.
 */

import type { EnvironmentAdapter } from "../../platform/env.interface.ts";
import { EnvironmentError } from "../../platform/env.interface.ts";

/**
 * Node.js implementation of EnvironmentAdapter
 *
 * This adapter wraps Node's native environment variable APIs (process.env) to provide
 * a consistent interface for environment operations across all runtimes.
 *
 * @example
 * ```typescript
 * import { nodeEnvAdapter } from './adapters/node/env.adapter.ts';
 *
 * const nodeEnv = nodeEnvAdapter.get('NODE_ENV');
 * nodeEnvAdapter.set('LOG_LEVEL', 'debug');
 * ```
 */
export const nodeEnvAdapter: EnvironmentAdapter = {
  /**
   * Get an environment variable
   */
  get(key: string): string | undefined {
    try {
      return process.env[key];
    } catch (error) {
      throw new EnvironmentError(
        `Failed to get environment variable: ${key}`,
        key,
        "get",
        error as Error,
      );
    }
  },

  /**
   * Set an environment variable
   */
  set(key: string, value: string): void {
    try {
      process.env[key] = value;
    } catch (error) {
      throw new EnvironmentError(
        `Failed to set environment variable: ${key}`,
        key,
        "set",
        error as Error,
      );
    }
  },

  /**
   * Check if an environment variable exists
   */
  has(key: string): boolean {
    try {
      return Object.prototype.hasOwnProperty.call(process.env, key);
    } catch (error) {
      throw new EnvironmentError(
        `Failed to check environment variable: ${key}`,
        key,
        "has",
        error as Error,
      );
    }
  },

  /**
   * Delete an environment variable
   */
  delete(key: string): void {
    try {
      delete process.env[key];
    } catch (error) {
      throw new EnvironmentError(
        `Failed to delete environment variable: ${key}`,
        key,
        "delete",
        error as Error,
      );
    }
  },

  /**
   * Get all environment variables as an object
   */
  toObject(): Record<string, string> {
    try {
      // process.env can contain undefined values in some edge cases,
      // so we filter them out to match the Record<string, string> signature
      const result: Record<string, string> = {};
      for (const [key, value] of Object.entries(process.env)) {
        if (value !== undefined) {
          result[key] = value;
        }
      }
      return result;
    } catch (error) {
      throw new EnvironmentError(
        "Failed to get all environment variables",
        "",
        "toObject",
        error as Error,
      );
    }
  },

  /**
   * Get an environment variable as a boolean
   */
  getBoolean(key: string, defaultValue: boolean = false): boolean {
    const value = this.get(key);

    if (value === undefined || value === "") {
      return defaultValue;
    }

    const normalized = value.toLowerCase().trim();

    // True values
    if (["true", "1", "yes", "on"].includes(normalized)) {
      return true;
    }

    // False values
    if (["false", "0", "no", "off"].includes(normalized)) {
      return false;
    }

    // Invalid value, return default
    return defaultValue;
  },

  /**
   * Get an environment variable as a number
   */
  getNumber(key: string, defaultValue: number = 0): number {
    const value = this.get(key);

    if (value === undefined || value === "") {
      return defaultValue;
    }

    const parsed = Number(value);

    // Check if parsing resulted in NaN
    if (isNaN(parsed)) {
      return defaultValue;
    }

    return parsed;
  },

  /**
   * Get an environment variable as an array
   */
  getArray(
    key: string,
    delimiter: string = ",",
    defaultValue: string[] = [],
  ): string[] {
    const value = this.get(key);

    if (value === undefined || value === "") {
      return defaultValue;
    }

    // Split and trim each item
    return value
      .split(delimiter)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  },

  /**
   * Get a required environment variable or throw
   */
  require(key: string): string {
    const value = this.get(key);

    if (value === undefined || value === "") {
      throw new EnvironmentError(
        `Required environment variable is missing or empty: ${key}`,
        key,
        "require",
      );
    }

    return value;
  },
};
