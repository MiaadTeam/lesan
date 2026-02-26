// Deno Environment Adapter Tests
// Runs the Environment contract tests against the Deno adapter

import { denoEnvAdapter } from "../../../src/adapters/deno/env.adapter.ts";
import { testEnvironmentAdapter } from "../../platform/env.contract.test.ts";

// Run contract tests against Deno adapter
testEnvironmentAdapter(denoEnvAdapter, { runtime: "Deno" });
