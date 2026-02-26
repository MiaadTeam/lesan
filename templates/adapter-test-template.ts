/**
 * @file adapter-test-template.ts
 * @description Scaffolding template for running platform-specific adapter contract tests.
 *
 * INSTRUCTIONS FOR USE:
 * 1. Copy this file to `tests/adapters/<platform>/<feature>.test.ts` (e.g., `tests/adapters/node/fs.test.ts`)
 * 2. Update the imports to pull in the correct contract test suite from `tests/platform/`
 * 3. Update the imports to pull in your platform-specific adapter from `src/adapters/<platform>/`
 * 4. Call the contract test runner function with your adapter.
 * 5. Run the test using the platform's native test runner:
 *    - Node.js: `node --test tests/adapters/node/<feature>.test.ts` (or via tsx/ts-node)
 *    - Bun: `bun test tests/adapters/bun/<feature>.test.ts`
 *    - Deno: `deno test --allow-all tests/adapters/deno/<feature>.test.ts`
 *
 * ⚠️ CRITICAL LESSONS FROM PHASE 2:
 * - Do not write custom tests here unless they are strictly platform-specific edge cases.
 * - The contract tests (`tests/platform/*.contract.test.ts`) are designed to be exhaustive.
 * - If a contract test fails, fix the adapter implementation, not the test (unless the test is flawed).
 * - Ensure your platform's test runner is configured to handle TypeScript and async operations properly.
 */

// TODO: 1. Import the contract test suite
// import { runFeatureContractTests } from "../../platform/feature.contract.test.ts";

// TODO: 2. Import your platform-specific adapter
// import { platformFeatureAdapter } from "../../../src/adapters/<platform>/feature.adapter.ts";

// TODO: 3. Run the contract tests with your adapter
// runFeatureContractTests(platformFeatureAdapter);
