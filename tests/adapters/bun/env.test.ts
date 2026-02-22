/**
 * @file env.test.ts
 * @description Contract tests for the Bun Environment adapter.
 *
 * Run this test using the Bun test runner:
 * bun test tests/adapters/bun/env.test.ts
 */

import { testEnvironmentAdapter } from "../../platform/env.contract.test.ts";
import { bunEnvAdapter } from "../../../src/adapters/bun/env.adapter.ts";

// Run the shared contract tests against the Bun adapter
testEnvironmentAdapter(bunEnvAdapter, { runtime: "Bun" });
