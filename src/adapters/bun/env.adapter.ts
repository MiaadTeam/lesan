/**
 * @file env.adapter.ts
 * @description Bun implementation of the EnvironmentAdapter interface.
 *
 * This adapter uses `Bun.env` to interact with environment variables,
 * providing a fast and native way to access the environment in Bun.
 */

import type { EnvironmentAdapter } from "../../platform/env.interface.ts";
import {
  EnvironmentError,
  parseArray,
  parseBoolean,
  parseNumber,
} from "../../platform/env.interface.ts";

// Declare Bun globally to avoid TypeScript errors if bun-types is not included
declare const Bun: any;

export const bunEnvAdapter: EnvironmentAdapter = {
  get(key: string): string | undefined {
    try {
      return Bun.env[key];
    } catch (error: any) {
      throw new EnvironmentError(
        `Failed to get environment variable: ${key}`,
        key,
        "get",
        error,
      );
    }
  },

  set(key: string, value: string): void {
    try {
      Bun.env[key] = String(value);
    } catch (error: any) {
      throw new EnvironmentError(
        `Failed to set environment variable: ${key}`,
        key,
        "set",
        error,
      );
    }
  },

  has(key: string): boolean {
    try {
      return Bun.env[key] !== undefined;
    } catch (error: any) {
      throw new EnvironmentError(
        `Failed to check environment variable: ${key}`,
        key,
        "has",
        error,
      );
    }
  },

  delete(key: string): void {
    try {
      delete Bun.env[key];
    } catch (error: any) {
      throw new EnvironmentError(
        `Failed to delete environment variable: ${key}`,
        key,
        "delete",
        error,
      );
    }
  },

  toObject(): Record<string, string> {
    try {
      // Bun.env is a proxy, spreading it creates a plain object snapshot
      return { ...Bun.env };
    } catch (error: any) {
      throw new EnvironmentError(
        "Failed to get all environment variables",
        "ALL",
        "toObject",
        error,
      );
    }
  },

  getBoolean(key: string, defaultValue?: boolean): boolean {
    return parseBoolean(this.get(key), defaultValue);
  },

  getNumber(key: string, defaultValue?: number): number {
    return parseNumber(this.get(key), defaultValue);
  },

  getArray(
    key: string,
    delimiter?: string,
    defaultValue?: string[],
  ): string[] {
    return parseArray(this.get(key), delimiter, defaultValue);
  },

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
