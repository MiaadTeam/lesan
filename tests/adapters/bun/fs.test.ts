/**
 * @file fs.test.ts
 * @description Contract tests for the Bun File System adapter.
 *
 * Run this test using the Bun test runner:
 * bun test tests/adapters/bun/fs.test.ts
 */

import { testFileSystemAdapter } from "../../platform/fs.contract.test.ts";
import { bunFileSystemAdapter } from "../../../src/adapters/bun/fs.adapter.ts";

// Run the shared contract tests against the Bun adapter
testFileSystemAdapter(bunFileSystemAdapter, { runtime: "Bun" });
