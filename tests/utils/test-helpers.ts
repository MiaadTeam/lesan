// Test Helper Utilities for Contract Tests
// Provides common utilities for testing platform adapters across all runtimes

import { join } from "node:path";

/**
 * Test directory management
 */
export class TestDirectory {
  private static baseDir = "./tests/temp";
  private static counter = 0;

  /**
   * Create a unique temporary directory for a test
   */
  static create(testName: string): string {
    const timestamp = Date.now();
    const count = ++this.counter;
    const dirName = `${
      testName.replace(/[^a-z0-9]/gi, "_")
    }_${timestamp}_${count}`;
    return join(this.baseDir, dirName);
  }

  /**
   * Get the base temporary directory
   */
  static getBase(): string {
    return this.baseDir;
  }
}

/**
 * Test file path utilities
 */
export class TestPaths {
  /**
   * Get path to a test fixture
   */
  static fixture(filename: string): string {
    return join("./tests/fixtures", filename);
  }

  /**
   * Get path to a temporary test file
   */
  static temp(testDir: string, filename: string): string {
    return join(testDir, filename);
  }

  /**
   * Resolve a path relative to the project root
   */
  static resolve(path: string): string {
    return join("./", path);
  }

  /**
   * Join path segments
   */
  static join(...segments: string[]): string {
    return join(...segments);
  }
}

/**
 * Test assertions and validation
 */
export class TestAssertions {
  /**
   * Assert that a value is defined (not null or undefined)
   */
  static isDefined<T>(
    value: T | null | undefined,
    message?: string,
  ): asserts value is T {
    if (value === null || value === undefined) {
      throw new Error(message || "Expected value to be defined");
    }
  }

  /**
   * Assert that two values are equal
   */
  static equals<T>(actual: T, expected: T, message?: string): void {
    if (actual !== expected) {
      throw new Error(
        message || `Expected ${String(expected)}, but got ${String(actual)}`,
      );
    }
  }

  /**
   * Assert that a string contains a substring
   */
  static contains(haystack: string, needle: string, message?: string): void {
    if (!haystack.includes(needle)) {
      throw new Error(
        message ||
          `Expected string to contain "${needle}", but got "${haystack}"`,
      );
    }
  }

  /**
   * Assert that a value is truthy
   */
  static isTrue(value: unknown, message?: string): void {
    if (!value) {
      throw new Error(message || "Expected value to be truthy");
    }
  }

  /**
   * Assert that a value is falsy
   */
  static isFalse(value: unknown, message?: string): void {
    if (value) {
      throw new Error(message || "Expected value to be falsy");
    }
  }

  /**
   * Assert that an async function throws an error
   */
  static async throws(
    fn: () => Promise<unknown>,
    expectedError?: new (...args: any[]) => Error,
    message?: string,
  ): Promise<void> {
    let didThrow = false;
    let error: Error | undefined;

    try {
      await fn();
    } catch (e) {
      didThrow = true;
      error = e as Error;
    }

    if (!didThrow) {
      throw new Error(message || "Expected function to throw an error");
    }

    if (expectedError && error && !(error instanceof expectedError)) {
      const errorName =
        (error as Error & { constructor: { name: string } }).constructor.name;
      throw new Error(
        `Expected error of type ${expectedError.name}, but got ${errorName}`,
      );
    }
  }

  /**
   * Assert that an async function does not throw
   */
  static async doesNotThrow(
    fn: () => Promise<unknown>,
    message?: string,
  ): Promise<void> {
    try {
      await fn();
    } catch (e) {
      throw new Error(
        message ||
          `Expected function not to throw, but got: ${(e as Error).message}`,
      );
    }
  }
}

/**
 * Test data generators
 */
export class TestData {
  /**
   * Generate random string
   */
  static randomString(length: number = 10): string {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Generate random number
   */
  static randomNumber(min: number = 0, max: number = 100): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generate random boolean
   */
  static randomBoolean(): boolean {
    return Math.random() < 0.5;
  }

  /**
   * Generate sample text content
   */
  static sampleText(lines: number = 3): string {
    const sampleLines = [
      "The quick brown fox jumps over the lazy dog.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Testing file system operations across multiple runtimes.",
      "Lesan framework - building cross-platform applications.",
      "With hope in God, we continue our journey.",
    ];

    return sampleLines.slice(0, lines).join("\n");
  }

  /**
   * Generate sample JSON data
   */
  static sampleJSON(): Record<string, unknown> {
    return {
      id: this.randomNumber(1, 1000),
      name: `test_${this.randomString(5)}`,
      enabled: this.randomBoolean(),
      timestamp: new Date().toISOString(),
      data: {
        value: this.randomNumber(),
        items: [1, 2, 3],
      },
    };
  }
}

/**
 * Test cleanup utilities
 */
export class TestCleanup {
  private static cleanupFns: Array<() => Promise<void> | void> = [];

  /**
   * Register a cleanup function to run after tests
   */
  static register(fn: () => Promise<void> | void): void {
    this.cleanupFns.push(fn);
  }

  /**
   * Run all registered cleanup functions
   */
  static async runAll(): Promise<void> {
    for (const fn of this.cleanupFns) {
      try {
        await fn();
      } catch (error) {
        console.error("Cleanup error:", error);
      }
    }
    this.cleanupFns = [];
  }

  /**
   * Clear all registered cleanup functions without running them
   */
  static clear(): void {
    this.cleanupFns = [];
  }
}

/**
 * Simple logger for test output
 */
export class TestLogger {
  private static enabled = true;

  static enable(): void {
    this.enabled = true;
  }

  static disable(): void {
    this.enabled = false;
  }

  static log(message: string, ...args: unknown[]): void {
    if (this.enabled) {
      console.log(`[TEST] ${message}`, ...args);
    }
  }

  static info(message: string, ...args: unknown[]): void {
    if (this.enabled) {
      console.info(`[TEST INFO] ${message}`, ...args);
    }
  }

  static warn(message: string, ...args: unknown[]): void {
    if (this.enabled) {
      console.warn(`[TEST WARN] ${message}`, ...args);
    }
  }

  static error(message: string, ...args: unknown[]): void {
    if (this.enabled) {
      console.error(`[TEST ERROR] ${message}`, ...args);
    }
  }

  static success(message: string, ...args: unknown[]): void {
    if (this.enabled) {
      console.log(`[TEST SUCCESS] ✓ ${message}`, ...args);
    }
  }
}

/**
 * Performance testing utilities
 */
export class TestPerformance {
  private static marks = new Map<string, number>();

  /**
   * Start a performance measurement
   * @returns An object with an end() method to stop timing
   */
  static start(label?: string): { end: () => number } {
    const startTime = performance.now();
    const markLabel = label || `mark_${Date.now()}_${Math.random()}`;
    this.marks.set(markLabel, startTime);

    return {
      end: (): number => {
        const duration = performance.now() - startTime;
        this.marks.delete(markLabel);
        return duration;
      },
    };
  }

  /**
   * End a performance measurement and return duration in ms
   */
  static end(label: string): number {
    const start = this.marks.get(label);
    if (!start) {
      throw new Error(`No performance mark found for "${label}"`);
    }
    const duration = performance.now() - start;
    this.marks.delete(label);
    return duration;
  }

  /**
   * Measure the execution time of an async function
   */
  static async measure<T>(
    label: string,
    fn: () => Promise<T>,
  ): Promise<{ result: T; duration: number }> {
    this.start(label);
    const result = await fn();
    const duration = this.end(label);
    return { result, duration };
  }

  /**
   * Clear all performance marks
   */
  static clear(): void {
    this.marks.clear();
  }
}

/**
 * Retry utilities for flaky tests
 */
export class TestRetry {
  /**
   * Retry an async function up to maxAttempts times
   */
  static async withRetry<T>(
    fn: () => Promise<T>,
    maxAttempts: number = 3,
    delayMs: number = 100,
  ): Promise<T> {
    let lastError: Error | undefined;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;
        if (attempt < maxAttempts) {
          await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
      }
    }

    throw new Error(
      `Failed after ${maxAttempts} attempts. Last error: ${lastError?.message}`,
    );
  }
}
