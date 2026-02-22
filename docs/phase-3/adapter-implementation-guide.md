# Lesan Cross-Platform Adapter Implementation Guide

**Version:** 1.0  
**Phase:** 3 (Cross-Platform Expansion)  
**Target Audience:** Core Contributors & Adapter Authors

---

## 1. Introduction

Welcome to the Lesan Adapter Implementation Guide! This document outlines the standard operating procedures, best practices, and critical lessons learned for implementing platform-specific adapters (Node.js, Bun, etc.) for the Lesan framework.

In Phase 1, we defined strict TypeScript interfaces for all platform-dependent operations (`fs`, `env`, `http`, `bundler`, `runtime`). In Phase 2, we successfully implemented the Deno adapters and achieved a 100% pass rate across 79 rigorous contract tests. 

This guide codifies the knowledge gained during Phase 2 to ensure that all future adapters maintain the same high standards of reliability, performance, and resource safety.

---

## 2. The Contract-First Approach

Lesan uses a **Contract-First** architecture for cross-platform compatibility. 

1. **The Interface is the Law:** The interfaces defined in `src/platform/*.interface.ts` dictate exactly what an adapter must do.
2. **The Contract Tests are the Judge:** The tests in `tests/platform/*.contract.test.ts` verify that the adapter obeys the law.
3. **The Adapter is the Implementation:** Your job is to write the code in `src/adapters/<platform>/` that satisfies the interface and passes the contract tests.

You should **never** need to write custom tests for standard adapter functionality. If a contract test fails, fix the adapter. If the contract test is flawed, update the contract test for *all* platforms.

---

## 3. Implementation Checklist

Follow these steps when implementing a new adapter:

- [ ] **1. Preparation:** Read the target interface in `src/platform/` thoroughly.
- [ ] **2. Scaffolding:** Copy `templates/adapter-template.ts` to `src/adapters/<platform>/<feature>.adapter.ts`.
- [ ] **3. Test Setup:** Copy `templates/adapter-test-template.ts` to `tests/adapters/<platform>/<feature>.test.ts`.
- [ ] **4. Implementation:** Implement each method using the platform's native APIs.
- [ ] **5. Error Mapping:** Ensure all native errors are caught and re-thrown as Lesan custom errors (e.g., `LesanFsError`).
- [ ] **6. Validation:** Run the contract tests using the platform's native test runner.
- [ ] **7. Leak Check:** Ensure zero resource leaks (file handles, HTTP connections, streams).
- [ ] **8. Refinement:** Optimize for performance and clean up code.

---

## 4. Critical Patterns & Anti-Patterns

During Phase 2, we encountered several strict requirements around resource management and asynchronous operations. Adhere to these patterns strictly.

### 4.1 Resource Management (The #1 Cause of Test Failures)

**Anti-Pattern: Leaving resources open**
Failing to close file handles, network sockets, or streams will cause test runners (and eventually production servers) to crash or leak memory.

**Pattern: Always use `try/finally` for cleanup**
```typescript
// ✅ DO THIS
let fileHandle;
try {
  fileHandle = await nativeFs.open(path);
  return await fileHandle.read();
} finally {
  if (fileHandle) await fileHandle.close();
}
```

### 4.2 HTTP Server Lifecycle

**Anti-Pattern: Storing server references asynchronously**
If you store the server reference inside an asynchronous callback (like `onListen`), the test runner might attempt to shut down the server before the reference is saved, causing a crash.

**Pattern: Store references synchronously**
```typescript
// ✅ DO THIS
const server = nativeHttp.createServer(handler);
activeServers.set(port, server); // Store immediately!
server.listen(port, () => {
  // Ready callback
});
```

### 4.3 HTTP Response Bodies

**Anti-Pattern: Ignoring response bodies**
When making HTTP requests (especially in tests or internal fetch calls), failing to consume the response body leaves the `ReadableStream` open.

**Pattern: Always consume or cancel the body**
```typescript
// ✅ DO THIS
const response = await fetch(url);
const data = await response.text(); // Consume the body!
// OR
await response.body?.cancel(); // Explicitly close the stream
```

### 4.4 Asynchronous Operations

**Anti-Pattern: Dangling Promises**
Firing off an async operation without `await`ing it or returning the Promise.

**Pattern: Await everything**
Ensure all asynchronous platform calls are properly awaited so that errors can be caught and mapped correctly.

---

## 5. Error Handling Guidelines

Platform native APIs throw platform-specific errors (e.g., Node's `ENOENT`, Deno's `NotFound`). Lesan core logic cannot depend on these specific error codes.

You **must** catch native errors and wrap them in Lesan's custom error classes defined in `src/platform/index.ts`.

```typescript
import { LesanFsError } from "../../platform/index.ts";

async readTextFile(path: string): Promise<string> {
  try {
    return await nativeFs.readFile(path, 'utf-8');
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      throw new LesanFsError(`File not found: ${path}`, 'NOT_FOUND');
    }
    throw new LesanFsError(`Failed to read file: ${error.message}`);
  }
}
```

---

## 6. Testing Strategy

We use the platform's native test runner to execute the shared contract tests.

### Node.js
Node.js (v18+) has a built-in test runner. We use `tsx` to handle TypeScript execution.
```bash
# Run a specific test
npx tsx --test tests/adapters/node/fs.test.ts
```

### Bun
Bun has a highly optimized, Jest-compatible built-in test runner.
```bash
# Run a specific test
bun test tests/adapters/bun/fs.test.ts
```

### Deno
Deno has a strict built-in test runner with excellent leak detection.
```bash
# Run a specific test
deno test --allow-all tests/adapters/deno/fs.test.ts
```

---

## 7. Platform-Specific Considerations

### Node.js Adapter Tips
- **File System:** Use `node:fs/promises` for all async file operations.
- **HTTP:** Use `node:http` and `node:https`. Note that Node's HTTP req/res objects are different from the Web Standard `Request`/`Response` objects used by Lesan's core. You will need to map Node's `IncomingMessage` to a Web `Request`, and map the Web `Response` back to Node's `ServerResponse`.
- **Bundler:** You will likely need to integrate `esbuild` or a similar tool, as Node does not have a built-in TypeScript bundler like Deno or Bun.

### Bun Adapter Tips
- **File System:** Use `Bun.file(path).text()` and `Bun.write(path, content)`. They are highly optimized.
- **HTTP:** Use `Bun.serve()`. It natively uses Web Standard `Request` and `Response` objects, making the adapter implementation very thin and fast.
- **Bundler:** Use `Bun.build()`. It is built-in, incredibly fast, and supports TypeScript and JSX out of the box.

---

## 8. Using the Templates

To speed up development, use the provided templates:

1. **Adapter Template:** `templates/adapter-template.ts`
   Contains the basic structure, error handling boilerplate, and reminders for resource management.
2. **Test Template:** `templates/adapter-test-template.ts`
   Contains the boilerplate for importing the contract test suite and injecting your new adapter.

---

**"Small, careful steps with great caution."**  
Happy coding!
