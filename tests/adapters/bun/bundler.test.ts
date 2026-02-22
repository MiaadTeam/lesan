/**
 * @file bundler.test.ts
 * @description Contract tests for the Bun Bundler adapter.
 *
 * Run this test using the Bun test runner:
 * bun test tests/adapters/bun/bundler.test.ts
 */

import { testBundlerAdapter } from "../../platform/bundler.contract.test.ts";
import { bunBundlerAdapter } from "../../../src/adapters/bun/bundler.adapter.ts";

// Run the shared contract tests against the Bun adapter
testBundlerAdapter(bunBundlerAdapter, { runtime: "Bun" });
