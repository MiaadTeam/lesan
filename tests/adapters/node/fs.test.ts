/**
 * @file fs.test.ts
 * @description Test runner for the Node.js File System adapter.
 *
 * Runs the shared File System contract tests against the Node.js implementation.
 *
 * Run with:
 * `npx tsx --test tests/adapters/node/fs.test.ts`
 */

import { testFileSystemAdapter } from "../../platform/fs.contract.test.ts";
import { nodeFsAdapter } from "../../../src/adapters/node/fs.adapter.ts";

// Run the contract tests against the Node.js adapter
testFileSystemAdapter(nodeFsAdapter, { runtime: "Node.js" });
