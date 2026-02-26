/**
 * @file http.test.ts
 * @description Contract tests for the Bun HTTP Server adapter.
 *
 * Run this test using the Bun test runner:
 * bun test tests/adapters/bun/http.test.ts
 */

import { testHttpServerAdapter } from "../../platform/http.contract.test.ts";
import { bunHttpAdapter } from "../../../src/adapters/bun/http.adapter.ts";

// Run the shared contract tests against the Bun adapter
testHttpServerAdapter(bunHttpAdapter, { runtime: "Bun" });
