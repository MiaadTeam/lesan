import { test } from "../utils/test-runner.ts";
// Environment Contract Tests
// These tests validate that any EnvironmentAdapter implementation behaves correctly
// All adapters (Deno, Node, Bun) must pass these tests

import {
  assertEquals,
  assertRejects,
} from "../utils/assert.ts";
import type { EnvironmentAdapter } from "../../src/platform/env.interface.ts";
import { EnvironmentError } from "../../src/platform/env.interface.ts";
import {
  TestAssertions,
  TestCleanup,
  TestData,
  TestLogger,
} from "../utils/test-helpers.ts";

/**
 * Contract test suite for EnvironmentAdapter
 *
 * This test suite validates that all EnvironmentAdapter implementations
 * (Deno, Node.js, Bun) behave identically for environment variable operations.
 *
 * @param adapter - The EnvironmentAdapter implementation to test
 * @param testContext - Optional context information for logging
 */
export function testEnvironmentAdapter(
  adapter: EnvironmentAdapter,
  testContext: { runtime?: string } = {},
) {
  const runtime = testContext.runtime || "unknown";
  TestLogger.info(`Running Environment contract tests for: ${runtime}`);

  // Track test variables for cleanup
  const testVars: string[] = [];

  /**
   * Setup: Generate unique test variable names
   */
  function getTestVar(name: string): string {
    const varName = `LESAN_TEST_${name.toUpperCase()}_${Date.now()}`;
    testVars.push(varName);
    return varName;
  }

  /**
   * Cleanup: Remove all test variables
   */
  function cleanup() {
    for (const varName of testVars) {
      try {
        adapter.delete(varName);
      } catch (error) {
        TestLogger.warn(
          `Failed to cleanup variable ${varName}: ${(error as Error).message}`,
        );
      }
    }
    testVars.length = 0;
  }

  // Register cleanup
  TestCleanup.register(cleanup);

  // ==========================================
  // Test Suite: Basic Get/Set Operations
  // ==========================================

  test({
    name: `[${runtime}] Environment: set should create new variable`,
    fn() {
      const testVar = getTestVar("basic_set");

      // Set the variable
      adapter.set(testVar, "test_value");

      // Verify it was set
      const value = adapter.get(testVar);
      assertEquals(value, "test_value", "Variable should be set correctly");

      cleanup();
    },
  });

  test({
    name:
      `[${runtime}] Environment: get should return undefined for missing variable`,
    fn() {
      const testVar = getTestVar("missing");

      // Get non-existent variable
      const value = adapter.get(testVar);

      assertEquals(
        value,
        undefined,
        "Missing variable should return undefined",
      );

      cleanup();
    },
  });

  test({
    name: `[${runtime}] Environment: set should overwrite existing variable`,
    fn() {
      const testVar = getTestVar("overwrite");

      // Set initial value
      adapter.set(testVar, "initial");
      assertEquals(adapter.get(testVar), "initial");

      // Overwrite with new value
      adapter.set(testVar, "updated");
      assertEquals(
        adapter.get(testVar),
        "updated",
        "Variable should be overwritten",
      );

      cleanup();
    },
  });

  test({
    name: `[${runtime}] Environment: should handle empty string values`,
    fn() {
      const testVar = getTestVar("empty_string");

      // Set empty string
      adapter.set(testVar, "");

      // Should return empty string, not undefined
      const value = adapter.get(testVar);
      assertEquals(value, "", "Empty string should be preserved");

      cleanup();
    },
  });

  // ==========================================
  // Test Suite: Has Operation
  // ==========================================

  test({
    name:
      `[${runtime}] Environment: has should return true for existing variable`,
    fn() {
      const testVar = getTestVar("exists");

      adapter.set(testVar, "value");

      const exists = adapter.has(testVar);
      assertEquals(exists, true, "Should return true for existing variable");

      cleanup();
    },
  });

  test({
    name:
      `[${runtime}] Environment: has should return false for missing variable`,
    fn() {
      const testVar = getTestVar("not_exists");

      const exists = adapter.has(testVar);
      assertEquals(exists, false, "Should return false for missing variable");

      cleanup();
    },
  });

  test({
    name: `[${runtime}] Environment: has should return true for empty string`,
    fn() {
      const testVar = getTestVar("empty_has");

      // Set to empty string
      adapter.set(testVar, "");

      // Should still return true (variable exists)
      const exists = adapter.has(testVar);
      assertEquals(
        exists,
        true,
        "Should return true even for empty string",
      );

      cleanup();
    },
  });

  // ==========================================
  // Test Suite: Delete Operation
  // ==========================================

  test({
    name: `[${runtime}] Environment: delete should remove variable`,
    fn() {
      const testVar = getTestVar("delete");

      // Set then delete
      adapter.set(testVar, "temporary");
      assertEquals(adapter.has(testVar), true);

      adapter.delete(testVar);

      // Should be gone
      assertEquals(adapter.has(testVar), false);
      assertEquals(adapter.get(testVar), undefined);

      cleanup();
    },
  });

  test({
    name:
      `[${runtime}] Environment: delete should not throw for missing variable`,
    fn() {
      const testVar = getTestVar("delete_missing");

      // Delete non-existent variable (should succeed silently)
      adapter.delete(testVar);

      // Should still not exist
      assertEquals(adapter.has(testVar), false);

      cleanup();
    },
  });

  // ==========================================
  // Test Suite: toObject Operation
  // ==========================================

  test({
    name: `[${runtime}] Environment: toObject should return all variables`,
    fn() {
      const testVar1 = getTestVar("obj1");
      const testVar2 = getTestVar("obj2");

      adapter.set(testVar1, "value1");
      adapter.set(testVar2, "value2");

      const obj = adapter.toObject();

      // Should be an object
      TestAssertions.isDefined(obj, "toObject should return an object");
      assertEquals(typeof obj, "object");

      // Should contain our test variables
      assertEquals(obj[testVar1], "value1");
      assertEquals(obj[testVar2], "value2");

      cleanup();
    },
  });

  test({
    name:
      `[${runtime}] Environment: toObject should return snapshot (not live)`,
    fn() {
      const testVar = getTestVar("snapshot");

      adapter.set(testVar, "original");
      const obj = adapter.toObject();

      // Modify the returned object
      obj[testVar] = "modified_in_object";

      // Original should be unchanged
      assertEquals(
        adapter.get(testVar),
        "original",
        "Modifying returned object should not affect environment",
      );

      cleanup();
    },
  });

  // ==========================================
  // Test Suite: getBoolean Helper
  // ==========================================

  test({
    name: `[${runtime}] Environment: getBoolean should parse true values`,
    fn() {
      const trueValues = [
        "true",
        "TRUE",
        "True",
        "1",
        "yes",
        "YES",
        "on",
        "ON",
      ];

      for (const value of trueValues) {
        const testVar = getTestVar(`bool_true_${value}`);
        adapter.set(testVar, value);
        assertEquals(
          adapter.getBoolean(testVar, false),
          true,
          `"${value}" should be parsed as true`,
        );
        adapter.delete(testVar);
      }

      cleanup();
    },
  });

  test({
    name: `[${runtime}] Environment: getBoolean should parse false values`,
    fn() {
      const falseValues = [
        "false",
        "FALSE",
        "False",
        "0",
        "no",
        "NO",
        "off",
        "OFF",
      ];

      for (const value of falseValues) {
        const testVar = getTestVar(`bool_false_${value}`);
        adapter.set(testVar, value);
        assertEquals(
          adapter.getBoolean(testVar, true),
          false,
          `"${value}" should be parsed as false`,
        );
        adapter.delete(testVar);
      }

      cleanup();
    },
  });

  test({
    name:
      `[${runtime}] Environment: getBoolean should use default for invalid values`,
    fn() {
      const testVar = getTestVar("bool_invalid");

      adapter.set(testVar, "invalid");
      assertEquals(
        adapter.getBoolean(testVar, true),
        true,
        "Invalid value should return default (true)",
      );
      assertEquals(
        adapter.getBoolean(testVar, false),
        false,
        "Invalid value should return default (false)",
      );

      cleanup();
    },
  });

  test({
    name:
      `[${runtime}] Environment: getBoolean should use default for missing variable`,
    fn() {
      const testVar = getTestVar("bool_missing");

      assertEquals(
        adapter.getBoolean(testVar, true),
        true,
        "Missing variable should return default",
      );

      cleanup();
    },
  });

  // ==========================================
  // Test Suite: getNumber Helper
  // ==========================================

  test({
    name: `[${runtime}] Environment: getNumber should parse integer values`,
    fn() {
      const testVar = getTestVar("num_int");

      adapter.set(testVar, "42");
      assertEquals(adapter.getNumber(testVar, 0), 42);

      adapter.set(testVar, "-100");
      assertEquals(adapter.getNumber(testVar, 0), -100);

      cleanup();
    },
  });

  test({
    name: `[${runtime}] Environment: getNumber should parse float values`,
    fn() {
      const testVar = getTestVar("num_float");

      adapter.set(testVar, "3.14");
      assertEquals(adapter.getNumber(testVar, 0), 3.14);

      adapter.set(testVar, "-2.5");
      assertEquals(adapter.getNumber(testVar, 0), -2.5);

      cleanup();
    },
  });

  test({
    name:
      `[${runtime}] Environment: getNumber should use default for invalid values`,
    fn() {
      const testVar = getTestVar("num_invalid");

      adapter.set(testVar, "not_a_number");
      assertEquals(
        adapter.getNumber(testVar, 999),
        999,
        "Invalid value should return default",
      );

      cleanup();
    },
  });

  test({
    name:
      `[${runtime}] Environment: getNumber should use default for missing variable`,
    fn() {
      const testVar = getTestVar("num_missing");

      assertEquals(
        adapter.getNumber(testVar, 8000),
        8000,
        "Missing variable should return default",
      );

      cleanup();
    },
  });

  // ==========================================
  // Test Suite: getArray Helper
  // ==========================================

  test({
    name:
      `[${runtime}] Environment: getArray should split comma-separated values`,
    fn() {
      const testVar = getTestVar("arr_comma");

      adapter.set(testVar, "item1,item2,item3");
      const arr = adapter.getArray(testVar, ",");

      assertEquals(arr.length, 3);
      assertEquals(arr[0], "item1");
      assertEquals(arr[1], "item2");
      assertEquals(arr[2], "item3");

      cleanup();
    },
  });

  test({
    name: `[${runtime}] Environment: getArray should trim whitespace`,
    fn() {
      const testVar = getTestVar("arr_trim");

      adapter.set(testVar, " item1 , item2 , item3 ");
      const arr = adapter.getArray(testVar, ",");

      assertEquals(arr[0], "item1");
      assertEquals(arr[1], "item2");
      assertEquals(arr[2], "item3");

      cleanup();
    },
  });

  test({
    name: `[${runtime}] Environment: getArray should handle custom delimiters`,
    fn() {
      const testVar = getTestVar("arr_custom");

      adapter.set(testVar, "a:b:c");
      const arr = adapter.getArray(testVar, ":");

      assertEquals(arr.length, 3);
      assertEquals(arr, ["a", "b", "c"]);

      cleanup();
    },
  });

  test({
    name:
      `[${runtime}] Environment: getArray should return empty array for missing variable`,
    fn() {
      const testVar = getTestVar("arr_missing");

      const arr = adapter.getArray(testVar, ",", []);
      assertEquals(arr, []);

      cleanup();
    },
  });

  test({
    name:
      `[${runtime}] Environment: getArray should use default for missing variable`,
    fn() {
      const testVar = getTestVar("arr_default");

      const defaultArr = ["default1", "default2"];
      const arr = adapter.getArray(testVar, ",", defaultArr);
      assertEquals(arr, defaultArr);

      cleanup();
    },
  });

  // ==========================================
  // Test Suite: require Helper
  // ==========================================

  test({
    name:
      `[${runtime}] Environment: require should return value for existing variable`,
    fn() {
      const testVar = getTestVar("req_exists");

      adapter.set(testVar, "required_value");
      const value = adapter.require(testVar);

      assertEquals(value, "required_value");

      cleanup();
    },
  });

  test({
    name: `[${runtime}] Environment: require should throw for missing variable`,
    fn() {
      const testVar = getTestVar("req_missing");

      try {
        adapter.require(testVar);
        throw new Error("Should have thrown EnvironmentError");
      } catch (error) {
        TestAssertions.isTrue(
          error instanceof EnvironmentError,
          "Should throw EnvironmentError",
        );
      }

      cleanup();
    },
  });

  test({
    name: `[${runtime}] Environment: require should throw for empty string`,
    fn() {
      const testVar = getTestVar("req_empty");

      adapter.set(testVar, "");

      try {
        adapter.require(testVar);
        throw new Error("Should have thrown EnvironmentError");
      } catch (error) {
        TestAssertions.isTrue(
          error instanceof EnvironmentError,
          "Should throw EnvironmentError for empty string",
        );
      }

      cleanup();
    },
  });

  // ==========================================
  // Test Suite: Special Characters & Edge Cases
  // ==========================================

  test({
    name:
      `[${runtime}] Environment: should handle special characters in values`,
    fn() {
      const testVar = getTestVar("special");

      const specialValue = "value with spaces, symbols!@#$%^&*(), and 中文";
      adapter.set(testVar, specialValue);

      assertEquals(adapter.get(testVar), specialValue);

      cleanup();
    },
  });

  test({
    name: `[${runtime}] Environment: should handle multiline values`,
    fn() {
      const testVar = getTestVar("multiline");

      const multilineValue = "line1\nline2\nline3";
      adapter.set(testVar, multilineValue);

      assertEquals(adapter.get(testVar), multilineValue);

      cleanup();
    },
  });

  test({
    name: `[${runtime}] Environment: should handle very long values`,
    fn() {
      const testVar = getTestVar("long");

      const longValue = "x".repeat(10000);
      adapter.set(testVar, longValue);

      assertEquals(adapter.get(testVar), longValue);

      cleanup();
    },
  });

  TestLogger.info(`Environment contract tests completed for: ${runtime}`);
}

/**
 * Helper function to run minimal contract tests
 * Use this for quick validation during development
 */
export function testEnvironmentAdapterMinimal(
  adapter: EnvironmentAdapter,
  testContext: { runtime?: string } = {},
) {
  const runtime = testContext.runtime || "unknown";
  TestLogger.info(`Running MINIMAL Environment tests for: ${runtime}`);

  test({
    name: `[${runtime}] Environment (minimal): basic get/set/delete`,
    fn() {
      const testVar = `LESAN_TEST_MINIMAL_${Date.now()}`;

      // Set
      adapter.set(testVar, "test");
      assertEquals(adapter.get(testVar), "test");

      // Check has
      assertEquals(adapter.has(testVar), true);

      // Delete
      adapter.delete(testVar);
      assertEquals(adapter.has(testVar), false);
    },
  });

  TestLogger.info(`MINIMAL Environment tests completed for: ${runtime}`);
}
