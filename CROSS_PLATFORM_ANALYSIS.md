# Lesan Framework - Cross-Platform Migration Analysis

**Version:** 1.0  
**Date:** 2025-01-XX  
**Target Runtimes:** Node.js, Bun, Deno

---

## Executive Summary

This document provides a comprehensive analysis of the Lesan framework's current architecture and outlines the strategy for making it cross-platform compatible with Node.js, Bun, and Deno. The analysis identifies all runtime-specific dependencies and proposes a professional, incremental migration path.

---

## 1. Current State Analysis

### 1.1 Project Overview

**Lesan** is a high-performance TypeScript framework currently built exclusively for Deno, providing:
- Alternative to GraphQL/REST APIs for MongoDB
- Object Document Mapper (ODM)
- Microservices architecture support
- Built-in HTTP server
- Playground interface
- Type generation capabilities

### 1.2 Technology Stack

```
Runtime:     Deno (exclusive)
Language:    TypeScript
Database:    MongoDB (via npm:mongodb@6.3.0)
Validation:  superstruct@2.0.2
```

### 1.3 Project Structure

```
src/
├── acts/           # Action handling and service management
├── models/         # Schema and model definitions
├── odm/            # Object Document Mapper for MongoDB
├── server/         # HTTP server implementation
│   └── playground/ # Interactive playground UI
├── types/          # Type definitions and generation
├── utils/          # Helper utilities
├── deps.ts         # Deno-specific dependencies
├── npmDeps.ts      # NPM dependencies (cross-platform)
└── lesan.ts        # Main entry point
```

---

## 2. Runtime-Specific Dependencies Audit

### 2.1 Deno Standard Library Dependencies (`deps.ts`)

```typescript
// Current Deno-specific imports
export { ensureDir } from "https://deno.land/std@0.224.0/fs/mod.ts";
export { serveFile } from "https://deno.land/std@0.224.0/http/file_server.ts";
export { serve } from "https://deno.land/std@0.224.0/http/server.ts";
export { bundle } from "https://deno.land/x/emit@0.38.2/mod.ts";
```

**Impact Areas:**
- File system operations
- HTTP server
- Static file serving
- TypeScript bundling

### 2.2 Deno Global API Usage

Identified Deno-specific API calls throughout the codebase:

#### **File System Operations**
```typescript
// src/types/mod.ts
await Deno.writeTextFile("./declarations/selectInp.ts", str);

// src/server/playground/mod.tsx
const data = await Deno.readTextFile(url);

// src/server/playground/esbuild.ts
await Deno.readTextFile(cssUrl);
await Deno.writeTextFile("./dist/bundleContent.ts", bundleTsContent);

// src/server/serveStatic.ts
`${Deno.cwd()}${decodeURIComponent(url.pathname)}`
```

#### **Environment Variables**
```typescript
// src/server/playground/mod.tsx
Deno.env.get("PLAYENV")
```

#### **HTTP Server**
```typescript
// src/server/mod.ts
Deno.serve({ port }, handler);
```

#### **Testing Framework**
```typescript
// Various test files
Deno.test("test name", () => { ... });
```

### 2.3 NPM Dependencies (Already Cross-Platform)

```typescript
// src/npmDeps.ts
export * from "npm:superstruct@2.0.2";
export * from "npm:mongodb@6.3.0";
```

✅ These are already cross-platform compatible!

---

## 3. Cross-Platform Strategy & Best Practices

### 3.1 Research Findings

Based on research of Node.js, Bun, and Deno documentation:

#### **Conditional Exports (Recommended Approach)**
- Use `package.json` "exports" field with runtime conditions
- Separate entry points per runtime
- Maintain shared business logic
- Tree-shakeable for optimal bundle size

#### **Runtime Conditions**
```json
{
  "exports": {
    ".": {
      "deno": "./dist/deno/mod.ts",
      "bun": "./dist/bun/mod.ts",
      "node": "./dist/node/mod.js",
      "default": "./dist/node/mod.js"
    }
  }
}
```

#### **Available Conditions:**
- `"deno"` - Deno runtime
- `"bun"` - Bun runtime  
- `"node"` - Node.js runtime
- `"import"` - ES modules
- `"require"` - CommonJS
- `"default"` - Fallback

### 3.2 Proposed Architecture

```
lesan/
├── src/
│   ├── core/              # Runtime-agnostic business logic
│   │   ├── acts/
│   │   ├── models/
│   │   ├── odm/
│   │   ├── types/
│   │   └── utils/
│   │
│   ├── adapters/          # Runtime-specific adapters
│   │   ├── deno/
│   │   │   ├── fs.ts      # File system adapter
│   │   │   ├── http.ts    # HTTP server adapter
│   │   │   ├── env.ts     # Environment adapter
│   │   │   └── mod.ts     # Deno entry point
│   │   │
│   │   ├── node/
│   │   │   ├── fs.ts
│   │   │   ├── http.ts
│   │   │   ├── env.ts
│   │   │   └── mod.ts
│   │   │
│   │   └── bun/
│   │       ├── fs.ts
│   │       ├── http.ts
│   │       ├── env.ts
│   │       └── mod.ts
│   │
│   └── platform/          # Platform abstraction layer
│       ├── fs.interface.ts
│       ├── http.interface.ts
│       └── env.interface.ts
│
├── dist/                  # Build output
│   ├── deno/
│   ├── node/
│   └── bun/
│
└── package.json           # With conditional exports
```

---

## 4. Detailed Migration Plan

### 4.1 Phase 1: Analysis & Preparation (CURRENT PHASE)

**Objective:** Understand the codebase and plan the migration

**Tasks:**
- ✅ Audit all runtime-specific code
- ✅ Document dependencies
- ✅ Research cross-platform best practices
- ✅ Create migration strategy document
- ⏳ Define platform abstraction interfaces
- ⏳ Set up testing strategy for all runtimes

**Deliverables:**
- This analysis document
- Platform interface definitions
- Test plan

### 4.2 Phase 2: Abstraction Layer Design

**Objective:** Create runtime-agnostic interfaces

**Tasks:**
1. Define File System interface
2. Define HTTP Server interface
3. Define Environment interface
4. Define Bundler interface (for playground)
5. Define Testing interface

**Example Interface:**
```typescript
// platform/fs.interface.ts
export interface FileSystemAdapter {
  readTextFile(path: string): Promise<string>;
  writeTextFile(path: string, content: string): Promise<void>;
  ensureDir(path: string): Promise<void>;
  getCwd(): string;
}

// platform/http.interface.ts
export interface HttpServerAdapter {
  serve(options: ServerOptions, handler: RequestHandler): void;
  serveFile(request: Request, path: string): Promise<Response>;
}
```

### 4.3 Phase 3: Core Logic Refactoring

**Objective:** Separate business logic from runtime dependencies

**Tasks:**
1. Move pure business logic to `src/core/`
2. Replace direct Deno API calls with interface calls
3. Inject platform adapters via dependency injection
4. Update imports across the codebase

**Critical Files to Refactor:**
- `src/server/mod.ts` - HTTP server logic
- `src/server/serveStatic.ts` - Static file serving
- `src/server/playground/mod.tsx` - Playground features
- `src/types/mod.ts` - Type generation
- `src/utils/` - Utility functions

### 4.4 Phase 4: Runtime Adapter Implementation

**Objective:** Implement adapters for each runtime

**Priority Order:**
1. **Deno Adapter** (maintain current functionality)
2. **Node Adapter** (most common use case)
3. **Bun Adapter** (similar to Node, optimized)

**For Each Adapter:**

#### **Deno Adapter**
```typescript
// adapters/deno/fs.ts
import { ensureDir } from "https://deno.land/std@0.224.0/fs/mod.ts";

export const denoFsAdapter: FileSystemAdapter = {
  readTextFile: (path) => Deno.readTextFile(path),
  writeTextFile: (path, content) => Deno.writeTextFile(path, content),
  ensureDir: (path) => ensureDir(path),
  getCwd: () => Deno.cwd(),
};
```

#### **Node Adapter**
```typescript
// adapters/node/fs.ts
import { promises as fs } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

export const nodeFsAdapter: FileSystemAdapter = {
  readTextFile: (path) => fs.readFile(path, 'utf-8'),
  writeTextFile: async (path, content) => {
    await mkdir(dirname(path), { recursive: true });
    await fs.writeFile(path, content, 'utf-8');
  },
  ensureDir: (path) => mkdir(path, { recursive: true }),
  getCwd: () => process.cwd(),
};
```

#### **Bun Adapter**
```typescript
// adapters/bun/fs.ts
import { file, write } from 'bun';

export const bunFsAdapter: FileSystemAdapter = {
  readTextFile: async (path) => await file(path).text(),
  writeTextFile: async (path, content) => await write(path, content),
  ensureDir: async (path) => await mkdir(path, { recursive: true }),
  getCwd: () => process.cwd(),
};
```

### 4.5 Phase 5: Build System Setup

**Objective:** Configure build tooling for all platforms

**Tasks:**
1. Set up TypeScript configurations for each runtime
2. Configure bundlers (if needed)
3. Set up package.json with conditional exports
4. Create build scripts

**Example package.json:**
```json
{
  "name": "lesan",
  "version": "1.0.0",
  "type": "module",
  "exports": {
    ".": {
      "deno": "./src/adapters/deno/mod.ts",
      "bun": "./dist/bun/mod.js",
      "node": "./dist/node/mod.js",
      "import": "./dist/node/mod.js",
      "require": "./dist/node/mod.cjs",
      "default": "./dist/node/mod.js"
    }
  },
  "files": [
    "dist",
    "src/adapters/deno"
  ]
}
```

### 4.6 Phase 6: Testing & Validation

**Objective:** Ensure functionality across all runtimes

**Tasks:**
1. Set up test runners for each runtime
2. Create cross-platform test suite
3. Test MongoDB integration
4. Test HTTP server functionality
5. Test playground features
6. Performance benchmarking

**Test Commands:**
```bash
# Deno
deno test

# Node
node --test

# Bun  
bun test
```

### 4.7 Phase 7: Documentation & Examples

**Objective:** Update all documentation for multi-runtime support

**Tasks:**
1. Update README with installation for all runtimes
2. Update API documentation
3. Create runtime-specific examples
4. Update migration guide
5. Create troubleshooting guide

---

## 5. Critical Dependencies Mapping

### 5.1 HTTP Server Implementations

| Feature | Deno | Node | Bun |
|---------|------|------|-----|
| HTTP Server | `Deno.serve()` | `node:http` / `node:https` | `Bun.serve()` |
| Request/Response | Web Standard | Web Standard (v18+) | Web Standard |
| WebSocket | Native | `ws` package | Native |

### 5.2 File System Operations

| Operation | Deno | Node | Bun |
|-----------|------|------|-----|
| Read File | `Deno.readTextFile()` | `fs.readFile()` | `Bun.file().text()` |
| Write File | `Deno.writeTextFile()` | `fs.writeFile()` | `Bun.write()` |
| Ensure Directory | `ensureDir()` | `fs.mkdir()` | `fs.mkdir()` |
| Current Directory | `Deno.cwd()` | `process.cwd()` | `process.cwd()` |

### 5.3 TypeScript & Bundling

| Feature | Deno | Node | Bun |
|---------|------|------|-----|
| TS Support | Native | `tsx` / `ts-node` | Native |
| Bundler | `deno emit` | `esbuild` / `rollup` | Native |
| Import Maps | Native | `--import` flag | Native |

### 5.4 Testing Framework

| Feature | Deno | Node | Bun |
|---------|------|------|-----|
| Test Runner | `Deno.test()` | `node:test` | `bun:test` |
| Assertions | `@std/assert` | `node:assert` | `bun:test` |

---

## 6. Risks & Mitigation

### 6.1 Breaking Changes

**Risk:** Existing Deno users may need to update their code

**Mitigation:**
- Maintain backward compatibility for Deno
- Provide clear migration guide
- Version the release as 2.0.0 (major)
- Deprecation warnings before removal

### 6.2 Performance Differences

**Risk:** Different runtimes may have different performance characteristics

**Mitigation:**
- Benchmark all runtimes
- Document performance differences
- Optimize hot paths per runtime
- Consider runtime-specific optimizations

### 6.3 Maintenance Complexity

**Risk:** Supporting 3 runtimes increases maintenance burden

**Mitigation:**
- Strong abstraction layer
- Comprehensive test coverage
- Automated CI/CD for all runtimes
- Clear contribution guidelines

### 6.4 Bundle Size

**Risk:** Including adapters for all runtimes may increase size

**Mitigation:**
- Use conditional exports (tree-shaking)
- Separate packages if needed
- Optimize imports
- Document bundle size impact

---

## 7. Success Criteria

### 7.1 Functional Requirements

- ✅ All core features work on all three runtimes
- ✅ MongoDB operations identical across runtimes
- ✅ HTTP server functionality consistent
- ✅ Playground works on all runtimes
- ✅ Type generation works on all runtimes
- ✅ Tests pass on all runtimes

### 7.2 Non-Functional Requirements

- ✅ Performance within 10% across runtimes
- ✅ No breaking changes for Deno users
- ✅ Clear documentation for all runtimes
- ✅ Easy installation process
- ✅ Active CI/CD for all platforms

### 7.3 Developer Experience

- ✅ Simple API across all runtimes
- ✅ Good TypeScript support
- ✅ Clear error messages
- ✅ Comprehensive examples

---

## 8. Immediate Next Steps (Step 1)

As requested, we'll take a very small, careful first step:

### **Step 1: Define Platform Abstraction Interfaces**

**Goal:** Create TypeScript interfaces that define the contract between core logic and runtime adapters.

**Tasks:**
1. Create `src/platform/` directory
2. Define `fs.interface.ts` - File system operations
3. Define `http.interface.ts` - HTTP server operations
4. Define `env.interface.ts` - Environment variables
5. Define `runtime.interface.ts` - Runtime detection
6. Document each interface with JSDoc comments

**Deliverables:**
- Interface files in `src/platform/`
- No breaking changes to existing code
- Foundation for future adapter implementations

**Why This Step?**
- Non-breaking (no existing code changes)
- Establishes clear contracts
- Enables parallel development
- Low risk, high value
- Easy to review and validate

---

## 9. Future Considerations

### 9.1 Additional Runtimes

Consider support for:
- **Cloudflare Workers** - Edge computing
- **AWS Lambda** - Serverless
- **Vercel Edge** - Edge functions

### 9.2 Package Distribution

- Publish to npm (Node/Bun)
- Publish to deno.land/x (Deno)
- Publish to JSR (all runtimes)

### 9.3 Community Feedback

- Create RFC (Request for Comments)
- Gather community input
- Beta testing period
- Iterative improvements

---

## 10. Conclusion

Making Lesan cross-platform is a significant but achievable goal. By following this incremental, well-planned approach, we can:

1. **Maintain Quality:** No compromise on existing Deno functionality
2. **Expand Reach:** Open to Node.js and Bun ecosystems  
3. **Future-Proof:** Clear architecture for additional runtimes
4. **Professional Approach:** Industry best practices and patterns

**Recommendation:** Proceed with Phase 1 Step 1 - Define Platform Abstraction Interfaces

This provides immediate value while maintaining zero risk to the existing codebase.

---

## Appendix A: References

- [Deno Node Compatibility](https://docs.deno.com/runtime/fundamentals/node/)
- [Node.js Package Exports](https://nodejs.org/api/packages.html#conditional-exports)
- [Bun Runtime APIs](https://bun.sh/docs/runtime/nodejs-apis)
- [Runtime Keys Proposal (WinterCG)](https://runtime-keys.proposal.wintercg.org/)

## Appendix B: File Inventory

**Files with Deno-specific code (15 files):**
1. `src/deps.ts` - Deno standard library imports
2. `src/server/mod.ts` - Deno.serve()
3. `src/server/serveStatic.ts` - Deno.cwd(), serveFile
4. `src/server/playground/mod.tsx` - Deno.readTextFile(), Deno.env.get()
5. `src/server/playground/esbuild.ts` - Deno.readTextFile(), Deno.writeTextFile()
6. `src/server/playground/bundle.ts` - Deno.writeTextFile()
7. `src/types/mod.ts` - Deno.writeTextFile()
8. `src/utils/__test__/*.test.ts` - Deno.test()
9. `src/models/**/__test__/*.test.ts` - Deno.test()

**Runtime-agnostic files (268+ files):**
- All core business logic in `acts/`, `models/`, `odm/`, `utils/`
- MongoDB operations (already use npm package)
- Validation logic (superstruct)
- Type definitions

---

**Document Version:** 1.0  
**Last Updated:** 2025-01-XX  
**Status:** Draft for Review
