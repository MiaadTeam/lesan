/**
 * @file env.test.ts
 * @description Test runner for the Node.js Environment adapter.
 *
 * Runs the shared Environment contract tests against the Node.js implementation.
 *
 * Run with:
 * `npx tsx --test tests/adapters/node/env.test.ts`
 */

import { testEnvironmentAdapter } from "../../platform/env.contract.test.ts";
import { nodeEnvAdapter } from "../../../src/adapters/node/env.adapter.ts";

// Run the contract tests against the Node.js adapter
testEnvironmentAdapter(nodeEnvAdapter, { runtime: "Node.js" });
