/**
 * @file index.ts
 * @description Dependency Injection Container for Platform Adapters.
 *
 * This module automatically detects the current JavaScript runtime (Node.js, Bun, or Deno)
 * and exports the appropriate platform-specific adapters for file system, environment,
 * HTTP server, and bundler operations.
 *
 * This is the single source of truth for platform-specific functionality in the Lesan core.
 */

import { detectRuntime, RuntimeType } from "../runtime.interface.ts";

// Interfaces
import type { FileSystemAdapter } from "../fs.interface.ts";
import type { EnvironmentAdapter } from "../env.interface.ts";
import type { HttpServerAdapter } from "../http.interface.ts";
import type { BundlerAdapter } from "../bundler.interface.ts";

// Deno Adapters
import { denoFsAdapter } from "../../adapters/deno/fs.adapter.ts";
import { denoEnvAdapter } from "../../adapters/deno/env.adapter.ts";
import { denoHttpAdapter } from "../../adapters/deno/http.adapter.ts";
import { DenoBundlerAdapter } from "../../adapters/deno/bundler.adapter.ts";

// Node.js Adapters
import { nodeFsAdapter } from "../../adapters/node/fs.adapter.ts";
import { nodeEnvAdapter } from "../../adapters/node/env.adapter.ts";
import { nodeHttpAdapter } from "../../adapters/node/http.adapter.ts";
import { nodeBundlerAdapter } from "../../adapters/node/bundler.adapter.ts";

// Bun Adapters
import { bunFileSystemAdapter } from "../../adapters/bun/fs.adapter.ts";
import { bunEnvAdapter } from "../../adapters/bun/env.adapter.ts";
import { bunHttpAdapter } from "../../adapters/bun/http.adapter.ts";
import { bunBundlerAdapter } from "../../adapters/bun/bundler.adapter.ts";

const runtimeInfo = detectRuntime();

let fs: FileSystemAdapter;
let env: EnvironmentAdapter;
let http: HttpServerAdapter;
let bundler: BundlerAdapter;

switch (runtimeInfo.type) {
  case RuntimeType.Deno:
    fs = denoFsAdapter;
    env = denoEnvAdapter;
    http = denoHttpAdapter;
    bundler = new DenoBundlerAdapter();
    break;
  case RuntimeType.Bun:
    fs = bunFileSystemAdapter;
    env = bunEnvAdapter;
    http = bunHttpAdapter;
    bundler = bunBundlerAdapter;
    break;
  case RuntimeType.Node:
    fs = nodeFsAdapter;
    env = nodeEnvAdapter;
    http = nodeHttpAdapter;
    bundler = nodeBundlerAdapter;
    break;
  default:
    console.warn(
      `[Lesan] Unknown runtime detected (${runtimeInfo.name}). Falling back to Node.js adapters.`,
    );
    fs = nodeFsAdapter;
    env = nodeEnvAdapter;
    http = nodeHttpAdapter;
    bundler = nodeBundlerAdapter;
    break;
}

export { bundler, env, fs, http, runtimeInfo };
