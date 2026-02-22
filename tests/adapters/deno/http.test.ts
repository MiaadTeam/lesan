// Deno HTTP Server Adapter Tests
// Runs the HTTP Server contract tests against the Deno adapter

import { denoHttpAdapter } from "../../../src/adapters/deno/http.adapter.ts";
import { testHttpServerAdapter } from "../../platform/http.contract.test.ts";

// Run contract tests against Deno adapter
testHttpServerAdapter(denoHttpAdapter, { runtime: "Deno" });
