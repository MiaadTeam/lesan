/**
 * @file http.test.ts
 * @description Test runner for the Node.js HTTP Server adapter.
 *
 * Runs the shared HTTP Server contract tests against the Node.js implementation.
 *
 * Run with:
 * `npx tsx --test tests/adapters/node/http.test.ts`
 */

import { testHttpServerAdapter } from "../../platform/http.contract.test.ts";
import { nodeHttpAdapter } from "../../../src/adapters/node/http.adapter.ts";

// Run the contract tests against the Node.js adapter
testHttpServerAdapter(nodeHttpAdapter, { runtime: "Node.js" });
