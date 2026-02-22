// Deno File System Adapter Tests
// Runs the File System contract tests against the Deno adapter

import { denoFsAdapter } from "../../../src/adapters/deno/fs.adapter.ts";
import { testFileSystemAdapter } from "../../platform/fs.contract.test.ts";

// Run contract tests against Deno adapter
testFileSystemAdapter(denoFsAdapter, { runtime: "Deno" });
