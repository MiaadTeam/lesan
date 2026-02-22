// Deno Bundler Adapter Test Runner
// Runs the bundler contract tests against the Deno adapter implementation

import { testBundlerAdapter } from "../../platform/bundler.contract.test.ts";
import { createDenoBundlerAdapter } from "../../../src/adapters/deno/bundler.adapter.ts";

// Create the Deno bundler adapter
const adapter = createDenoBundlerAdapter();

// Run the contract tests
testBundlerAdapter(adapter, { runtime: "Deno" });
