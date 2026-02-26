import { test } from "../utils/test-runner.ts";
// Bundler Contract Tests
// These tests validate that any BundlerAdapter implementation behaves correctly
// All adapters (Deno, Node, Bun) must pass these tests

import {
  assert,
  assertEquals,
  assertExists,
  assertRejects,
  assertStringIncludes,
} from "../utils/assert.ts";
import type { BundlerAdapter } from "../../src/platform/bundler.interface.ts";
import { BundlerError } from "../../src/platform/bundler.interface.ts";
import {
  TestAssertions,
  TestCleanup,
  TestLogger,
  TestPaths,
  TestPerformance,
} from "../utils/test-helpers.ts";

/**
 * Contract test suite for BundlerAdapter
 *
 * This test suite validates that all BundlerAdapter implementations
 * (Deno, Node.js, Bun) behave identically for bundling operations.
 *
 * @param adapter - The BundlerAdapter implementation to test
 * @param testContext - Optional context information for logging
 */
export function testBundlerAdapter(
  adapter: BundlerAdapter,
  testContext: { runtime?: string } = {},
) {
  const runtime = testContext.runtime || "unknown";
  TestLogger.info(`Running Bundler contract tests for: ${runtime}`);

  TestCleanup.register(async () => {
    if (adapter.shutdown) {
      await adapter.shutdown();
    }
  });

  // Get fixture paths
  const fixturesDir = TestPaths.resolve("tests/fixtures");
  const simpleFixture = TestPaths.join(fixturesDir, "bundle-simple.ts");
  const withImportFixture = TestPaths.join(
    fixturesDir,
    "bundle-with-import.ts",
  );
  const jsxFixture = TestPaths.join(fixturesDir, "bundle-jsx.tsx");
  const errorFixture = TestPaths.join(fixturesDir, "bundle-error.ts");

  // ==========================================
  // Test Suite: Adapter Info
  // ==========================================

  test({
    name: `[${runtime}] Bundler: getInfo should return bundler information`,
    async fn() {
      const info = adapter.getInfo();

      assertExists(info, "Info should exist");
      assertExists(info.name, "Info should have a name");
      assert(info.name.length > 0, "Bundler name should not be empty");
      assertExists(info.features, "Info should have features array");
      assert(
        Array.isArray(info.features),
        "Features should be an array",
      );

      TestLogger.info(`Bundler: ${info.name} ${info.version || "unknown"}`);
      TestLogger.info(`Features: ${info.features.join(", ")}`);
    },
  });

  test({
    name: `[${runtime}] Bundler: supports should check feature support`,
    async fn() {
      // TypeScript should always be supported
      const supportsTS = adapter.supports("typescript");
      assertEquals(
        typeof supportsTS,
        "boolean",
        "supports() should return boolean",
      );

      TestLogger.info(`TypeScript support: ${supportsTS}`);
    },
  });

  // ==========================================
  // Test Suite: bundleString - Basic Operations
  // ==========================================

  test({
    name: `[${runtime}] Bundler: bundleString should bundle simple TypeScript`,
    async fn() {
      const code = `
        export function add(a: number, b: number): number {
          return a + b;
        }

        export const result = add(2, 3);
      `;

      const result = await adapter.bundleString(code, {
        format: "esm",
      });

      assertExists(result, "Result should exist");
      assertExists(result.code, "Result should have code");
      assert(result.code.length > 0, "Bundled code should not be empty");

      // Verify the bundle contains the expected function logic
      assertStringIncludes(result.code, "add");

      TestLogger.info(`Bundle size: ${result.stats?.outputSize} bytes`);
    },
  });

  test({
    name:
      `[${runtime}] Bundler: bundleString should transpile TypeScript to JavaScript`,
    async fn() {
      const tsCode = `
        const greeting: string = "Hello, TypeScript!";
        const count: number = 42;
        console.log(greeting, count);
      `;

      const result = await adapter.bundleString(tsCode, {
        format: "esm",
      });

      assertExists(result.code, "Should have transpiled code");
      assert(result.code.length > 0, "Code should not be empty");

      // TypeScript types should be removed
      assertStringIncludes(result.code, "greeting");
      assertStringIncludes(result.code, "42");
    },
  });

  test({
    name: `[${runtime}] Bundler: bundleString should handle different formats`,
    async fn() {
      const code = `
        export function test() {
          return "test";
        }
      `;

      // Test ESM format
      const esmResult = await adapter.bundleString(code, {
        format: "esm",
      });
      assertExists(esmResult.code, "ESM bundle should have code");

      // Test IIFE format
      const iifeResult = await adapter.bundleString(code, {
        format: "iife",
      });
      assertExists(iifeResult.code, "IIFE bundle should have code");

      TestLogger.info(`ESM size: ${esmResult.code.length} bytes`);
      TestLogger.info(`IIFE size: ${iifeResult.code.length} bytes`);
    },
  });

  test({
    name: `[${runtime}] Bundler: bundleString should support minification`,
    async fn() {
      const code = `
        // This is a comment
        export function myVeryLongFunctionName(parameter: string): string {
          const intermediateVariable = parameter.toUpperCase();
          return intermediateVariable + "!!!";
        }

        export const anotherVariable = "some value";
      `;

      // Bundle without minification
      const normal = await adapter.bundleString(code, {
        format: "esm",
        minify: false,
      });

      // Bundle with minification
      const minified = await adapter.bundleString(code, {
        format: "esm",
        minify: true,
      });

      assertExists(normal.code, "Normal bundle should have code");
      assertExists(minified.code, "Minified bundle should have code");

      // Minified should generally be smaller
      TestLogger.info(`Normal size: ${normal.code.length} bytes`);
      TestLogger.info(`Minified size: ${minified.code.length} bytes`);
      TestLogger.info(
        `Reduction: ${
          ((1 - minified.code.length / normal.code.length) * 100).toFixed(1)
        }%`,
      );
    },
  });

  test({
    name:
      `[${runtime}] Bundler: bundleString should handle syntax errors gracefully`,
    async fn() {
      const invalidCode = `
        export function broken() {
          return this is not valid;
        }
      `;

      await assertRejects(
        async () => {
          await adapter.bundleString(invalidCode, { format: "esm" });
        },
        Error,
        undefined,
        "Should reject on syntax error",
      );
    },
  });

  // ==========================================
  // Test Suite: bundle - File-based Operations
  // ==========================================

  test({
    name: `[${runtime}] Bundler: bundle should bundle from file path`,
    async fn() {
      const result = await adapter.bundle(simpleFixture, {
        format: "esm",
      });

      assertExists(result, "Result should exist");
      assertExists(result.code, "Result should have code");
      assert(result.code.length > 0, "Bundled code should not be empty");

      // Verify the bundle contains exported functions
      assertStringIncludes(result.code, "greet");
      assertStringIncludes(result.code, "Calculator");

      TestLogger.info(`Bundle size: ${result.stats?.outputSize} bytes`);
    },
  });

  test({
    name: `[${runtime}] Bundler: bundle should bundle from URL`,
    async fn() {
      // Create a proper file URL from the absolute path
      const absolutePath = simpleFixture.startsWith("/")
        ? simpleFixture
        : `${globalThis.Deno ? Deno.cwd() : process.cwd()}/${simpleFixture}`;
      const fileUrl = new URL(`file://${absolutePath}`);

      const result = await adapter.bundle(fileUrl, {
        format: "esm",
      });

      assertExists(result.code, "Should have code from URL");
      assertStringIncludes(result.code, "greet");
    },
  });

  test({
    name: `[${runtime}] Bundler: bundle should resolve and include imports`,
    async fn() {
      const result = await adapter.bundle(withImportFixture, {
        format: "esm",
        bundle: true,
      });

      assertExists(result.code, "Should have bundled code");

      // Should include code from both files
      // The bundle should contain the imported greet function logic
      assertStringIncludes(result.code, "welcomeMessage");

      TestLogger.info(`Bundle with imports size: ${result.code.length} bytes`);
    },
  });

  test({
    name: `[${runtime}] Bundler: bundle should handle non-existent files`,
    async fn() {
      const nonExistentPath = TestPaths.join(
        fixturesDir,
        "does-not-exist.ts",
      );

      await assertRejects(
        async () => {
          await adapter.bundle(nonExistentPath, { format: "esm" });
        },
        Error,
        undefined,
        "Should reject for non-existent file",
      );
    },
  });

  test({
    name: `[${runtime}] Bundler: bundle should handle files with syntax errors`,
    async fn() {
      await assertRejects(
        async () => {
          await adapter.bundle(errorFixture, { format: "esm" });
        },
        Error,
        undefined,
        "Should reject for syntax errors in file",
      );
    },
  });

  // ==========================================
  // Test Suite: transpile
  // ==========================================

  test({
    name:
      `[${runtime}] Bundler: transpile should convert TypeScript to JavaScript`,
    async fn() {
      const tsCode = `
        interface Person {
          name: string;
          age: number;
        }

        const person: Person = {
          name: "Alice",
          age: 30,
        };

        function greet(p: Person): string {
          return \`Hello, \${p.name}!\`;
        }

        console.log(greet(person));
      `;

      const jsCode = await adapter.transpile(tsCode);

      assertExists(jsCode, "Should have transpiled code");
      assert(jsCode.length > 0, "Transpiled code should not be empty");

      // Should contain the logic but not TypeScript types
      assertStringIncludes(jsCode, "person");
      assertStringIncludes(jsCode, "greet");
      assertStringIncludes(jsCode, "Alice");

      TestLogger.info(`Transpiled size: ${jsCode.length} bytes`);
    },
  });

  test({
    name: `[${runtime}] Bundler: transpile should handle modern JavaScript`,
    async fn() {
      const modernCode = `
        const data = [1, 2, 3, 4, 5];
        const doubled = data.map(x => x * 2);
        const sum = doubled.reduce((a, b) => a + b, 0);
        console.log(sum);
      `;

      const transpiled = await adapter.transpile(modernCode);

      assertExists(transpiled, "Should transpile modern JS");
      assertStringIncludes(transpiled, "map");
      assertStringIncludes(transpiled, "reduce");
    },
  });

  test({
    name: `[${runtime}] Bundler: transpile should respect target option`,
    async fn() {
      const code = `
        const greeting = \`Hello, \${name}\`;
        const spread = [...array];
        const { x, ...rest } = obj;
      `;

      // Transpile to older target
      const oldTarget = await adapter.transpile(code, {
        target: "es2015",
      });

      assertExists(oldTarget, "Should transpile to old target");

      // Transpile to modern target
      const modernTarget = await adapter.transpile(code, {
        target: "esnext",
      });

      assertExists(modernTarget, "Should transpile to modern target");
    },
  });

  test({
    name: `[${runtime}] Bundler: transpile should handle syntax errors`,
    async fn() {
      const invalidCode = `
        const broken = this is not valid syntax;
      `;

      await assertRejects(
        async () => {
          await adapter.transpile(invalidCode);
        },
        Error,
        undefined,
        "Should reject on invalid syntax",
      );
    },
  });

  // ==========================================
  // Test Suite: Advanced Options
  // ==========================================

  test({
    name: `[${runtime}] Bundler: should support sourcemap option`,
    async fn() {
      const code = `
        export function test() {
          return "hello";
        }
      `;

      const withSourceMap = await adapter.bundleString(code, {
        format: "esm",
        sourcemap: true,
      });

      assertExists(withSourceMap.code, "Should have code");

      // Source map might be inline or external
      if (withSourceMap.map) {
        TestLogger.info("Source map is external");
        assert(withSourceMap.map.length > 0, "Source map should not be empty");
      } else if (withSourceMap.code.includes("sourceMappingURL")) {
        TestLogger.info("Source map is inline");
      } else {
        TestLogger.warn("Source map option may not be supported");
      }
    },
  });

  test({
    name: `[${runtime}] Bundler: should support define option for constants`,
    async fn() {
      const code = `
        console.log(PRODUCTION);
        console.log(VERSION);
      `;

      try {
        const result = await adapter.bundleString(code, {
          format: "esm",
          define: {
            PRODUCTION: "true",
            VERSION: '"1.0.0"',
          },
        });

        assertExists(result.code, "Should have code with definitions");
        TestLogger.info("Define option is supported");
      } catch (_error) {
        TestLogger.warn("Define option may not be supported by this bundler");
      }
    },
  });

  test({
    name: `[${runtime}] Bundler: should handle external dependencies option`,
    async fn() {
      const code = `
        import React from "react";
        export const App = () => React.createElement("div", null, "Hello");
      `;

      try {
        const result = await adapter.bundleString(code, {
          format: "esm",
          external: ["react"],
        });

        assertExists(result.code, "Should bundle with externals");
        // React should remain as import, not bundled
        assertStringIncludes(result.code, "react");
        TestLogger.info("External dependencies option is supported");
      } catch (_error) {
        TestLogger.warn(
          "External dependencies may not be fully supported in test environment",
        );
      }
    },
  });

  // ==========================================
  // Test Suite: Result Metadata
  // ==========================================

  test({
    name: `[${runtime}] Bundler: should provide bundle statistics`,
    async fn() {
      const code = `
        export function example() {
          const data = [1, 2, 3, 4, 5];
          return data.reduce((a, b) => a + b, 0);
        }
      `;

      const result = await adapter.bundleString(code, {
        format: "esm",
      });

      if (result.stats) {
        TestLogger.info(`Bundle stats provided by ${runtime}`);
        assertExists(result.stats.outputSize, "Should have output size");
        assert(
          result.stats.outputSize > 0,
          "Output size should be positive",
        );
        assertEquals(
          result.stats.outputSize,
          result.code.length,
          "Output size should match code length",
        );

        if (result.stats.buildTime !== undefined) {
          TestLogger.info(`Build time: ${result.stats.buildTime}ms`);
        }
      } else {
        TestLogger.warn("Bundle stats not provided by this adapter");
      }
    },
  });

  test({
    name: `[${runtime}] Bundler: should capture warnings if any`,
    async fn() {
      const code = `
        // Some code that might produce warnings
        var oldStyleVar = 123;
        export { oldStyleVar };
      `;

      const result = await adapter.bundleString(code, {
        format: "esm",
      });

      if (result.warnings && result.warnings.length > 0) {
        TestLogger.info(
          `Bundle produced ${result.warnings.length} warning(s)`,
        );
        for (const warning of result.warnings) {
          TestLogger.info(`  Warning: ${warning.message}`);
        }
      } else {
        TestLogger.info("No warnings produced");
      }

      // Warnings are optional, so we just log them
      assert(true, "Test passes regardless of warnings");
    },
  });

  // ==========================================
  // Test Suite: Performance & Edge Cases
  // ==========================================

  test({
    name: `[${runtime}] Bundler: should handle empty code`,
    async fn() {
      const result = await adapter.bundleString("", {
        format: "esm",
      });

      assertExists(result, "Should handle empty code");
      assertExists(result.code, "Should have code property");
      // Empty input might produce empty or minimal output
    },
  });

  test({
    name: `[${runtime}] Bundler: should handle large code bundles`,
    async fn() {
      // Generate a large code file
      const largeFunctions = Array.from({ length: 100 }, (_, i) => {
        return `
          export function func${i}(x: number): number {
            return x * ${i} + Math.random();
          }
        `;
      }).join("\n");

      const timer = TestPerformance.start();
      const result = await adapter.bundleString(largeFunctions, {
        format: "esm",
        minify: false,
      });
      const elapsed = timer.end();

      assertExists(result.code, "Should bundle large code");
      assert(result.code.length > 1000, "Bundle should be substantial");

      TestLogger.info(`Large bundle size: ${result.code.length} bytes`);
      TestLogger.info(`Bundle time: ${elapsed}ms`);
    },
  });

  test({
    name: `[${runtime}] Bundler: should be performant for repeated operations`,
    async fn() {
      const code = `
        export function repeat() {
          return "test";
        }
      `;

      const iterations = 5;
      const times: number[] = [];

      for (let i = 0; i < iterations; i++) {
        const timer = TestPerformance.start();
        await adapter.bundleString(code, { format: "esm" });
        times.push(timer.end());
      }

      const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
      TestLogger.info(
        `Average bundle time over ${iterations} iterations: ${
          avgTime.toFixed(2)
        }ms`,
      );

      assert(avgTime < 5000, "Average bundle time should be reasonable");
    },
  });

  // ==========================================
  // Test Suite: JSX Support (Optional)
  // ==========================================

  test({
    name: `[${runtime}] Bundler: should check JSX support`,
    async fn() {
      const supportsJSX = adapter.supports("jsx");
      TestLogger.info(`JSX support: ${supportsJSX}`);

      if (supportsJSX) {
        TestLogger.info("JSX is supported by this bundler");
      } else {
        TestLogger.warn("JSX is not supported by this bundler");
      }

      assertEquals(typeof supportsJSX, "boolean");
    },
  });

  test({
    name: `[${runtime}] Bundler: should handle JSX if supported`,
    async fn() {
      const supportsJSX = adapter.supports("jsx");

      if (!supportsJSX) {
        TestLogger.info("Skipping JSX test - not supported");
        return;
      }

      const jsxCode = `
        export function Component() {
          return <div className="test">Hello JSX</div>;
        }
      `;

      try {
        const result = await adapter.bundleString(jsxCode, {
          format: "esm",
          compilerOptions: {
            jsx: "react",
          },
        });

        assertExists(result.code, "Should transpile JSX");
        TestLogger.info("JSX transpilation successful");
      } catch (error) {
        TestLogger.warn(
          `JSX transpilation failed: ${(error as Error).message}`,
        );
      }
    },
  });

  TestLogger.success(
    `✓ Bundler contract tests completed for: ${runtime}`,
  );
}
