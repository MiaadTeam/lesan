import { test } from "../utils/test-runner.ts";
// File System Contract Tests
// These tests validate that any FileSystemAdapter implementation behaves correctly
// All adapters (Deno, Node, Bun) must pass these tests

import {
  assertEquals,
  assertRejects,
} from "../utils/assert.ts";
import type { FileSystemAdapter } from "../../src/platform/fs.interface.ts";
import { FileSystemError } from "../../src/platform/fs.interface.ts";
import {
  TestAssertions,
  TestCleanup,
  TestData,
  TestDirectory,
  TestLogger,
  TestPaths,
} from "../utils/test-helpers.ts";

/**
 * Contract test suite for FileSystemAdapter
 *
 * This test suite validates that all FileSystemAdapter implementations
 * (Deno, Node.js, Bun) behave identically for the same operations.
 *
 * @param adapter - The FileSystemAdapter implementation to test
 * @param testContext - Optional context information for logging
 */
export function testFileSystemAdapter(
  adapter: FileSystemAdapter,
  testContext: { runtime?: string } = {},
) {
  const runtime = testContext.runtime || "unknown";
  TestLogger.info(`Running File System contract tests for: ${runtime}`);

  // Test directory for this test suite
  const testDir = TestDirectory.create("fs_contract");

  /**
   * Setup: Create test directory before tests
   */
  async function setup() {
    try {
      await adapter.ensureDir(testDir);
      TestLogger.info(`Created test directory: ${testDir}`);
    } catch (error) {
      TestLogger.error(`Setup failed: ${(error as Error).message}`);
      throw error;
    }
  }

  /**
   * Teardown: Clean up test directory after tests
   */
  async function teardown() {
    try {
      const exists = await adapter.exists(testDir);
      if (exists) {
        await adapter.removeAll(testDir);
        TestLogger.info(`Cleaned up test directory: ${testDir}`);
      }
    } catch (error) {
      TestLogger.warn(`Teardown warning: ${(error as Error).message}`);
    }
  }

  // Register cleanup
  TestCleanup.register(teardown);

  // ==========================================
  // Test Suite: Basic File Operations
  // ==========================================

  test({
    name: `[${runtime}] FileSystem: writeTextFile should create a text file`,
    async fn() {
      await setup();

      const filePath = `${testDir}/test-write.txt`;
      const content = "Hello, Lesan!";

      // Write the file
      await adapter.writeTextFile(filePath, content);

      // Verify file was created
      const exists = await adapter.exists(filePath);
      assertEquals(exists, true, "File should exist after writing");

      await teardown();
    },
  });

  test({
    name: `[${runtime}] FileSystem: readTextFile should read file content`,
    async fn() {
      await setup();

      const filePath = `${testDir}/test-read.txt`;
      const expectedContent = "Reading test content\nLine 2\nLine 3";

      // Write file first
      await adapter.writeTextFile(filePath, expectedContent);

      // Read the file
      const actualContent = await adapter.readTextFile(filePath);

      assertEquals(
        actualContent,
        expectedContent,
        "Read content should match written content",
      );

      await teardown();
    },
  });

  test({
    name:
      `[${runtime}] FileSystem: readTextFile should throw FileSystemError for missing file`,
    async fn() {
      await setup();

      const missingFile = `${testDir}/does-not-exist.txt`;

      // Attempt to read non-existent file
      await assertRejects(
        async () => {
          await adapter.readTextFile(missingFile);
        },
        FileSystemError,
        undefined,
        "Should throw FileSystemError for missing file",
      );

      await teardown();
    },
  });

  test({
    name:
      `[${runtime}] FileSystem: exists should return true for existing file`,
    async fn() {
      await setup();

      const filePath = `${testDir}/exists-test.txt`;

      // Create the file
      await adapter.writeTextFile(filePath, "test");

      // Check if exists
      const exists = await adapter.exists(filePath);

      assertEquals(exists, true, "Should return true for existing file");

      await teardown();
    },
  });

  test({
    name:
      `[${runtime}] FileSystem: exists should return false for missing file`,
    async fn() {
      await setup();

      const missingFile = `${testDir}/missing-file.txt`;

      // Check if exists (without creating it)
      const exists = await adapter.exists(missingFile);

      assertEquals(exists, false, "Should return false for missing file");

      await teardown();
    },
  });

  test({
    name:
      `[${runtime}] FileSystem: ensureDir should create directory recursively`,
    async fn() {
      await setup();

      const nestedDir = `${testDir}/level1/level2/level3`;

      // Create nested directory
      await adapter.ensureDir(nestedDir);

      // Verify directory exists
      const exists = await adapter.exists(nestedDir);

      assertEquals(exists, true, "Nested directory should exist");

      await teardown();
    },
  });

  test({
    name:
      `[${runtime}] FileSystem: getCwd should return current working directory`,
    fn() {
      const cwd = adapter.getCwd();

      // Basic validation
      TestAssertions.isDefined(cwd, "getCwd should return a defined value");
      TestAssertions.isTrue(
        cwd.length > 0,
        "getCwd should return a non-empty string",
      );
      TestAssertions.isTrue(
        typeof cwd === "string",
        "getCwd should return a string",
      );
    },
  });

  // ==========================================
  // Test Suite: File Content Handling
  // ==========================================

  test({
    name: `[${runtime}] FileSystem: should handle empty file content`,
    async fn() {
      await setup();

      const filePath = `${testDir}/empty-file.txt`;

      // Write empty content
      await adapter.writeTextFile(filePath, "");

      // Read it back
      const content = await adapter.readTextFile(filePath);

      assertEquals(content, "", "Should handle empty file content");

      await teardown();
    },
  });

  test({
    name: `[${runtime}] FileSystem: should handle multi-line content`,
    async fn() {
      await setup();

      const filePath = `${testDir}/multiline.txt`;
      const multilineContent = `Line 1
Line 2
Line 3
Line 4`;

      // Write multi-line content
      await adapter.writeTextFile(filePath, multilineContent);

      // Read it back
      const content = await adapter.readTextFile(filePath);

      assertEquals(content, multilineContent, "Should preserve line breaks");

      await teardown();
    },
  });

  test({
    name: `[${runtime}] FileSystem: should handle UTF-8 content`,
    async fn() {
      await setup();

      const filePath = `${testDir}/utf8.txt`;
      const utf8Content = "Hello 世界 🌍 Café";

      // Write UTF-8 content
      await adapter.writeTextFile(filePath, utf8Content);

      // Read it back
      const content = await adapter.readTextFile(filePath);

      assertEquals(content, utf8Content, "Should handle UTF-8 characters");

      await teardown();
    },
  });

  // ==========================================
  // Test Suite: Edge Cases
  // ==========================================

  test({
    name:
      `[${runtime}] FileSystem: writeTextFile should overwrite existing file`,
    async fn() {
      await setup();

      const filePath = `${testDir}/overwrite-test.txt`;

      // Write initial content
      await adapter.writeTextFile(filePath, "Initial content");

      // Overwrite with new content
      await adapter.writeTextFile(filePath, "New content");

      // Read and verify
      const content = await adapter.readTextFile(filePath);

      assertEquals(content, "New content", "Should overwrite existing file");

      await teardown();
    },
  });

  test({
    name:
      `[${runtime}] FileSystem: writeTextFile should create parent directories`,
    async fn() {
      await setup();

      const filePath = `${testDir}/nested/deep/file.txt`;

      // Write file (should create parent directories)
      await adapter.writeTextFile(filePath, "Content in nested file");

      // Verify file exists
      const exists = await adapter.exists(filePath);

      assertEquals(
        exists,
        true,
        "Should create parent directories automatically",
      );

      await teardown();
    },
  });

  TestLogger.info(`File System contract tests completed for: ${runtime}`);
}

/**
 * Helper function to run minimal contract tests
 * Use this for quick validation during development
 */
export function testFileSystemAdapterMinimal(
  adapter: FileSystemAdapter,
  testContext: { runtime?: string } = {},
) {
  const runtime = testContext.runtime || "unknown";
  TestLogger.info(`Running MINIMAL File System tests for: ${runtime}`);

  const testDir = TestDirectory.create("fs_minimal");

  test({
    name: `[${runtime}] FileSystem (minimal): basic read/write`,
    async fn() {
      await adapter.ensureDir(testDir);

      const filePath = `${testDir}/basic.txt`;
      const content = "Basic test";

      await adapter.writeTextFile(filePath, content);
      const read = await adapter.readTextFile(filePath);

      assertEquals(read, content);

      await adapter.removeAll(testDir);
    },
  });

  TestLogger.info(`MINIMAL File System tests completed for: ${runtime}`);
}
