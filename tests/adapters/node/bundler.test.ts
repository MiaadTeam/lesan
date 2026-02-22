/**
 * @file bundler.test.ts
 * @description Test runner for the Node.js Bundler adapter.
 *
 * Runs the shared Bundler contract tests against the Node.js implementation.
 *
 * Run with:
 * `npx tsx --test tests/adapters/node/bundler.test.ts`
 */

import { testBundlerAdapter } from "../../platform/bundler.contract.test.ts";
import { nodeBundlerAdapter } from "../../../src/adapters/node/bundler.adapter.ts";

// Run the contract tests against the Node.js adapter
testBundlerAdapter(nodeBundlerAdapter, { runtime: "Node.js" });
