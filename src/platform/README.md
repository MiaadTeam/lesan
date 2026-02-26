# Platform Abstraction Layer

## Overview

The Platform Abstraction Layer provides a unified interface for runtime-specific operations across Node.js, Bun, and Deno. This layer ensures that the core Lesan framework remains runtime-agnostic while allowing each runtime to implement operations in the most efficient way possible.

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Lesan Core                           │
│              (Runtime-Agnostic Logic)                   │
└─────────────────┬───────────────────────────────────────┘
                  │
                  │ Uses Platform Interfaces
                  │
┌─────────────────▼───────────────────────────────────────┐
│              Platform Interfaces                        │
│  (fs, http, env, runtime, bundler, test)               │
└─────────────────┬───────────────────────────────────────┘
                  │
        ┌─────────┼─────────┐
        │         │         │
┌───────▼──┐ ┌───▼─────┐ ┌─▼────────┐
│  Deno    │ │  Node   │ │   Bun    │
│ Adapter  │ │ Adapter │ │ Adapter  │
└──────────┘ └─────────┘ └──────────┘
```

## Design Principles

1. **Interface Segregation**: Each interface focuses on a specific concern (file system, HTTP, etc.)
2. **Dependency Injection**: Adapters are injected into the core framework at initialization
3. **Runtime Detection**: Automatic detection and loading of the appropriate adapter
4. **Type Safety**: Full TypeScript support with strict typing
5. **Contract Testing**: All adapters must pass the same test suite
6. **Zero Runtime Overhead**: Adapters are resolved at startup, not on every call

## Interfaces

### 1. File System (`fs.interface.ts`)

Provides unified file system operations across runtimes.

**Key Methods:**
- `readTextFile()` - Read file as UTF-8 text
- `writeTextFile()` - Write text to file
- `readFile()` - Read file as binary
- `writeFile()` - Write binary data
- `ensureDir()` - Create directory recursively
- `getCwd()` - Get current working directory
- `exists()` - Check if path exists

### 2. HTTP Server (`http.interface.ts`)

Provides unified HTTP server operations.

**Key Methods:**
- `serve()` - Start HTTP server with request handler
- `serveFile()` - Serve static files with proper MIME types

### 3. Environment (`env.interface.ts`)

Provides unified environment variable access.

**Key Methods:**
- `get()` - Get environment variable value
- `set()` - Set environment variable
- `has()` - Check if environment variable exists

### 4. Runtime Detection (`runtime.interface.ts`)

Provides runtime detection and identification.

**Key Types:**
- `RuntimeType` - Enum of supported runtimes
- `detectRuntime()` - Detect current runtime
- Helper functions for runtime checking

### 5. Bundler (`bundler.interface.ts`)

Provides code bundling for the playground feature.

**Key Methods:**
- `bundle()` - Bundle TypeScript/JavaScript code

### 6. Test Framework (`test.interface.ts`)

Provides unified test framework operations (future).

**Key Methods:**
- `test()` - Define test cases
- `describe()` - Group tests
- `beforeEach()`, `afterEach()` - Test hooks

## Adapter Implementation Guide

### Creating a New Adapter

1. **Create adapter directory**: `src/adapters/{runtime}/`
2. **Implement each interface**: Create files matching interface names
3. **Export from mod.ts**: Create entry point that exports all adapters
4. **Write tests**: Ensure adapter passes contract tests
5. **Document quirks**: Note any runtime-specific behavior

### Example: Implementing File System Adapter

```typescript
// src/adapters/node/fs.ts
import { promises as fs } from 'node:fs';
import { dirname } from 'node:path';
import type { FileSystemAdapter } from '../../platform/fs.interface.ts';

export const nodeFsAdapter: FileSystemAdapter = {
  async readTextFile(path: string): Promise<string> {
    return await fs.readFile(path, 'utf-8');
  },

  async writeTextFile(path: string, content: string): Promise<void> {
    await fs.mkdir(dirname(path), { recursive: true });
    await fs.writeFile(path, content, 'utf-8');
  },

  async readFile(path: string): Promise<Uint8Array> {
    const buffer = await fs.readFile(path);
    return new Uint8Array(buffer);
  },

  async writeFile(path: string, data: Uint8Array): Promise<void> {
    await fs.mkdir(dirname(path), { recursive: true });
    await fs.writeFile(path, data);
  },

  async ensureDir(path: string): Promise<void> {
    await fs.mkdir(path, { recursive: true });
  },

  getCwd(): string {
    return process.cwd();
  },

  async exists(path: string): Promise<boolean> {
    try {
      await fs.access(path);
      return true;
    } catch {
      return false;
    }
  },
};
```

## Using Adapters in Core Code

### Before (Deno-specific):
```typescript
// Direct Deno API usage
const content = await Deno.readTextFile('./config.json');
await Deno.writeTextFile('./output.txt', result);
```

### After (Runtime-agnostic):
```typescript
// Using platform adapter
const content = await platform.fs.readTextFile('./config.json');
await platform.fs.writeTextFile('./output.txt', result);
```

## Dependency Injection Pattern

The Lesan framework uses dependency injection to provide adapters to core modules:

```typescript
// src/lesan.ts
import { detectRuntime } from './platform/runtime.interface.ts';
import { loadAdapters } from './adapters/loader.ts';

export const lesan = () => {
  // Detect runtime and load appropriate adapters
  const runtime = detectRuntime();
  const platform = loadAdapters(runtime);

  // Inject adapters into core modules
  return {
    schemas: { ...schemas(platform) },
    acts: { ...acts(platform) },
    odm: { ...odm(platform) },
    runServer: lesanServer(platform),
    // ...
  };
};
```

## Runtime Detection

The framework automatically detects the runtime environment:

```typescript
// Deno
if (typeof Deno !== 'undefined') → RuntimeType.Deno

// Bun
if (typeof Bun !== 'undefined') → RuntimeType.Bun

// Node.js
if (typeof process !== 'undefined' && process.versions?.node) → RuntimeType.Node

// Unknown
Otherwise → RuntimeType.Unknown
```

## Testing Strategy

### Contract Tests

All adapters must pass the same contract test suite:

```typescript
// tests/platform/fs.contract.test.ts
export function testFileSystemAdapter(adapter: FileSystemAdapter) {
  test('readTextFile should read file content', async () => {
    // Test implementation
  });

  test('writeTextFile should write file content', async () => {
    // Test implementation
  });

  // More tests...
}
```

### Adapter-Specific Tests

Each adapter can have additional tests for runtime-specific features:

```typescript
// tests/adapters/deno/fs.test.ts
import { denoFsAdapter } from '../../../src/adapters/deno/fs.ts';
import { testFileSystemAdapter } from '../../platform/fs.contract.test.ts';

// Run contract tests
testFileSystemAdapter(denoFsAdapter);

// Deno-specific tests
test('should handle Deno permissions correctly', async () => {
  // Deno-specific test
});
```

## Performance Considerations

1. **Adapter Resolution**: Adapters are resolved once at startup, not on every call
2. **No Proxy Overhead**: Direct function calls, no proxy or wrapper overhead
3. **Tree Shaking**: Unused adapters are eliminated in production builds
4. **Async/Await**: All I/O operations use async/await for optimal performance
5. **Error Handling**: Consistent error handling across all adapters

## Error Handling

All adapters should:
- Use consistent error types across runtimes
- Provide meaningful error messages
- Preserve original error information when possible
- Throw errors for unrecoverable issues
- Return error values for expected failures

Example:
```typescript
export class PlatformError extends Error {
  constructor(
    message: string,
    public readonly runtime: RuntimeType,
    public readonly cause?: Error
  ) {
    super(message);
    this.name = 'PlatformError';
  }
}
```

## Migration Path

### Phase 1: Define Interfaces ✅
- Create interface definitions
- Document contracts
- Review with team

### Phase 2: Implement Deno Adapter
- Wrap existing Deno code
- Maintain backward compatibility
- Test thoroughly

### Phase 3: Refactor Core
- Replace direct API calls
- Inject adapters
- Update tests

### Phase 4: Implement Node/Bun Adapters
- Create new adapters
- Run contract tests
- Performance testing

## Best Practices

1. **Keep Interfaces Minimal**: Only include operations actually needed
2. **Document Edge Cases**: Note platform-specific behavior differences
3. **Use TypeScript Strictly**: Leverage type system for safety
4. **Write Tests First**: Contract tests before implementation
5. **Handle Errors Gracefully**: Consistent error handling across adapters
6. **Optimize Hot Paths**: Profile and optimize frequently-called operations
7. **Version Carefully**: Breaking changes to interfaces require major version bump

## Future Considerations

### Additional Runtimes
- Cloudflare Workers
- AWS Lambda
- Vercel Edge Functions

### Additional Interfaces
- WebSocket operations
- Database connections
- Caching layer
- Logging system

## References

- [Node.js API Documentation](https://nodejs.org/api/)
- [Deno Standard Library](https://deno.land/std)
- [Bun APIs](https://bun.sh/docs/api)
- [Conditional Exports](https://nodejs.org/api/packages.html#conditional-exports)

## Contributing

When adding new platform operations:
1. Discuss in GitHub issue first
2. Define interface with JSDoc
3. Get approval from maintainers
4. Implement for all runtimes
5. Write contract tests
6. Update documentation

---

**Last Updated**: 2025-01-XX  
**Status**: ✅ Interfaces Defined | ⏳ Adapters In Progress
