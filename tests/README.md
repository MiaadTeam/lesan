# Lesan Cross-Platform Testing

**Status:** ✅ Phase 2 Complete - All Contract Tests Passing! 🎉  
**Phase:** 2 - Contract Tests & Adapter Templates  
**Last Updated:** 2025-01-21

---

## Overview

This directory contains the test infrastructure for validating Lesan's cross-platform compatibility across Node.js, Bun, and Deno runtimes.

## Testing Strategy

### Contract Tests

**Contract tests** ensure that all runtime adapters (Deno, Node, Bun) behave identically when implementing the platform interfaces. These tests:

- Test the **interface contract**, not the implementation
- Run against **any adapter** that implements the interface
- Ensure **consistent behavior** across all runtimes
- Catch **breaking changes** early
- Validate that **interfaces are complete**

### Test-Driven Development

We follow a TDD approach:

1. Define interfaces first (Phase 1) ✅
2. Write contract tests (Phase 2) ⏳
3. Implement adapters (Phase 4)
4. Validate with tests
5. Refactor with confidence

---

## Directory Structure

```
tests/
├── README.md                          # This file
│
├── platform/                          # Contract tests for platform interfaces
│   ├── fs.contract.test.ts           # File System adapter tests ✅
│   ├── http.contract.test.ts         # HTTP Server adapter tests ✅
│   ├── env.contract.test.ts          # Environment adapter tests ✅
│   ├── bundler.contract.test.ts      # Bundler adapter tests ✅
│   └── runtime.contract.test.ts      # Runtime detection tests (TODO)
│
├── adapters/                          # Adapter-specific test runners
│   ├── deno/                         # Deno adapter tests
│   │   ├── fs.test.ts               # ✅ 12/12 tests passing
│   │   ├── env.test.ts              # ✅ 30/30 tests passing
│   │   ├── bundler.test.ts          # ✅ 26/26 tests passing
│   │   └── http.test.ts             # ✅ 11/11 tests passing
│   ├── node/                         # Node adapter tests (TODO)
│   └── bun/                          # Bun adapter tests (TODO)
│
├── fixtures/                          # Test data and sample files
│   ├── sample.txt                    # Sample text file ✅
│   ├── sample.json                   # Sample JSON file ✅
│   ├── index.html                    # HTTP test fixture ✅
│   ├── style.css                     # HTTP test fixture ✅
│   ├── script.js                     # HTTP test fixture ✅
│   ├── bundle-simple.ts              # Bundler test fixture ✅
│   ├── bundle-with-import.ts         # Bundler test fixture ✅
│   ├── bundle-jsx.tsx                # Bundler test fixture ✅
│   ├── bundle-error.ts               # Bundler test fixture (syntax errors) ✅
│   └── ...                           # More fixtures as needed
│
├── utils/                             # Test utilities and helpers
│   └── test-helpers.ts               # Common test utilities ✅
│
└── temp/                             # Temporary test files (gitignored)
```

---

## Running Tests

### Deno (Current)

```bash
# Run all tests
deno test

# Run specific test file
deno test tests/platform/fs.contract.test.ts

# Run with verbose output
deno test --allow-read --allow-write

# Run with coverage
deno test --coverage=coverage/

# Generate coverage report
deno coverage coverage/ --lcov --output=coverage/lcov.info
```

### Node.js (Future)

```bash
# Run all tests
node --test

# Run specific test file
node --test tests/platform/fs.contract.test.ts

# Run with test runner
npm test
```

### Bun (Future)

```bash
# Run all tests
bun test

# Run specific test file
bun test tests/platform/fs.contract.test.ts

# Run with watch mode
bun test --watch
```

---

## Writing Contract Tests

### Basic Structure

```typescript
// Import the interface type
import type { FileSystemAdapter } from "../../src/platform/fs.interface.ts";

/**
 * Contract test suite
 * @param adapter - The adapter implementation to test
 * @param testContext - Optional context (e.g., runtime name)
 */
export function testFileSystemAdapter(
  adapter: FileSystemAdapter,
  testContext: { runtime?: string } = {},
) {
  const runtime = testContext.runtime || "unknown";

  Deno.test({
    name: `[${runtime}] FileSystem: should do something`,
    async fn() {
      // Arrange
      const input = "test data";

      // Act
      const result = await adapter.someMethod(input);

      // Assert
      assertEquals(result, expectedValue);
    },
  });
}
```

### Test Organization

Each contract test should:

1. **Test one interface method** at a time
2. **Cover happy path** (normal operation)
3. **Cover error cases** (expected failures)
4. **Cover edge cases** (boundary conditions)
5. **Be deterministic** (same input = same output)
6. **Be isolated** (no shared state between tests)
7. **Clean up** after itself (remove test files)

### Example: Testing File Operations

```typescript
Deno.test({
  name: `[${runtime}] FileSystem: readTextFile should read content`,
  async fn() {
    // Setup
    const testDir = TestDirectory.create("test");
    await adapter.ensureDir(testDir);

    const filePath = `${testDir}/test.txt`;
    const content = "Hello, World!";

    // Write test file
    await adapter.writeTextFile(filePath, content);

    // Test reading
    const result = await adapter.readTextFile(filePath);
    assertEquals(result, content);

    // Cleanup
    await adapter.removeAll(testDir);
  },
});
```

---

## Test Utilities

### TestDirectory

Manages temporary test directories:

```typescript
import { TestDirectory } from "../utils/test-helpers.ts";

// Create unique test directory
const testDir = TestDirectory.create("my_test");
// Returns: "./tests/temp/my_test_1234567890_1"
```

### TestPaths

Provides test path utilities:

```typescript
import { TestPaths } from "../utils/test-helpers.ts";

// Get fixture path
const fixturePath = TestPaths.fixture("sample.txt");
// Returns: "./tests/fixtures/sample.txt"

// Get temp file path
const tempPath = TestPaths.temp(testDir, "output.txt");
// Returns: "{testDir}/output.txt"
```

### TestAssertions

Custom assertions for cleaner tests:

```typescript
import { TestAssertions } from "../utils/test-helpers.ts";

// Assert value is defined
TestAssertions.isDefined(value);

// Assert equality
TestAssertions.equals(actual, expected);

// Assert string contains substring
TestAssertions.contains("hello world", "world");

// Assert function throws
await TestAssertions.throws(async () => await failingFunction(), ExpectedError);
```

### TestData

Generate test data:

```typescript
import { TestData } from "../utils/test-helpers.ts";

// Random string
const str = TestData.randomString(10);

// Sample text
const text = TestData.sampleText(3); // 3 lines

// Sample JSON
const json = TestData.sampleJSON();
```

### TestCleanup

Register cleanup functions:

```typescript
import { TestCleanup } from "../utils/test-helpers.ts";

// Register cleanup
TestCleanup.register(async () => {
  await adapter.removeAll(testDir);
});

// Run all cleanups (automatically called after tests)
await TestCleanup.runAll();
```

### TestLogger

Logging for test output:

```typescript
import { TestLogger } from "../utils/test-helpers.ts";

TestLogger.info("Starting test suite");
TestLogger.warn("This might be slow");
TestLogger.error("Unexpected error occurred");
```

### TestPerformance

Performance measurements:

```typescript
import { TestPerformance } from "../utils/test-helpers.ts";

// Start timing
TestPerformance.start("operation");

// ... do something ...

// Get duration
const duration = TestPerformance.end("operation");
console.log(`Operation took ${duration}ms`);

// Or measure automatically
const { result, duration } = await TestPerformance.measure(
  "async_op",
  async () => await someOperation(),
);
```

---

## Best Practices

### 1. Test Independence

Each test should be completely independent:

```typescript
// ✅ Good - independent test
Deno.test("test A", async () => {
  const testDir = TestDirectory.create("test_a");
  await adapter.ensureDir(testDir);
  // ... test logic ...
  await adapter.removeAll(testDir);
});

// ❌ Bad - depends on previous test
let sharedTestDir: string;

Deno.test("test A", async () => {
  sharedTestDir = TestDirectory.create("shared");
  await adapter.ensureDir(sharedTestDir);
});

Deno.test("test B", async () => {
  // Depends on test A running first!
  await adapter.writeTextFile(`${sharedTestDir}/file.txt`, "data");
});
```

### 2. Descriptive Test Names

Use clear, descriptive test names:

```typescript
// ✅ Good - clear what is being tested
Deno.test("[Deno] FileSystem: readTextFile should return file content", ...);
Deno.test("[Deno] FileSystem: readTextFile should throw for missing file", ...);

// ❌ Bad - unclear what is being tested
Deno.test("test 1", ...);
Deno.test("file system test", ...);
```

### 3. Arrange-Act-Assert Pattern

Structure tests clearly:

```typescript
Deno.test("test name", async () => {
  // Arrange - set up test conditions
  const testDir = TestDirectory.create("test");
  await adapter.ensureDir(testDir);
  const filePath = `${testDir}/test.txt`;

  // Act - perform the operation
  await adapter.writeTextFile(filePath, "content");

  // Assert - verify the result
  const exists = await adapter.exists(filePath);
  assertEquals(exists, true);

  // Cleanup
  await adapter.removeAll(testDir);
});
```

### 4. Test Both Success and Failure

Always test error cases:

```typescript
// Test success
Deno.test("should read existing file", async () => {
  // ... test happy path ...
});

// Test failure
Deno.test("should throw for missing file", async () => {
  await assertRejects(async () => await adapter.readTextFile("missing.txt"), FileSystemError);
});
```

### 5. Clean Up Resources

Always clean up test resources:

```typescript
Deno.test("test with cleanup", async () => {
  const testDir = TestDirectory.create("test");

  try {
    // Test logic here
    await adapter.ensureDir(testDir);
    // ...
  } finally {
    // Always cleanup, even if test fails
    await adapter.removeAll(testDir);
  }
});
```

---

## Contract Test Checklist

When writing contract tests for an interface, ensure you cover:

### File System Tests

- [ ] Read text file (happy path)
- [ ] Read text file (missing file error)
- [ ] Write text file (new file)
- [ ] Write text file (overwrite existing)
- [ ] Read binary file
- [ ] Write binary file
- [ ] Create directory (single level)
- [ ] Create directory (nested/recursive)
- [ ] Check file exists (true case)
- [ ] Check file exists (false case)
- [ ] Get current working directory
- [ ] Read directory contents
- [ ] Remove file
- [ ] Remove directory (recursive)
- [ ] Get file info/stats
- [ ] Handle UTF-8 characters
- [ ] Handle empty files
- [ ] Handle large files (performance)

### HTTP Server Tests ✅

- [x] Start server
- [x] Handle request
- [x] Return response
- [x] Serve static file
- [x] Handle missing file (404)
- [x] Get correct MIME type
- [x] Handle concurrent requests
- [x] Graceful shutdown
- [x] Different paths/routing
- [x] POST requests with body
- [x] Request headers handling
- [x] Performance testing

### Environment Tests (TODO)

- [ ] Get environment variable
- [ ] Get missing variable (undefined)
- [ ] Set environment variable
- [ ] Check if variable exists
- [ ] Delete variable
- [ ] Get all variables as object
- [ ] Parse boolean value
- [ ] Parse number value
- [ ] Parse array value
- [ ] Require variable (throw if missing)

### Bundler Tests ✅

- [x] Bundle TypeScript file
- [x] Bundle JavaScript file
- [x] Bundle from URL
- [x] Bundle from string
- [x] Transpile only (no bundle)
- [x] Handle dependencies
- [x] Handle syntax errors
- [x] Generate source maps
- [x] Minify output
- [x] Different output formats (ESM, IIFE, CJS)
- [x] Target options (ES2015, ES2020, ESNext)
- [x] Performance testing
- [x] Empty code handling
- [x] Large bundle handling
- [x] JSX support detection

---

## Current Status

### ✅ Completed

- Test directory structure
- Test utilities (`test-helpers.ts`) with enhanced helpers
- Test fixtures (text, JSON, HTML, CSS, JS, TypeScript, JSX)
- File System contract tests (`fs.contract.test.ts`) - **12/12 passing** ✅
- Environment contract tests (`env.contract.test.ts`) - **30/30 passing** ✅
- Bundler contract tests (`bundler.contract.test.ts`) - **26/26 passing** ✅
- HTTP Server contract tests (`http.contract.test.ts`) - **11/11 passing** ✅
- Deno File System adapter implementation
- Deno Environment adapter implementation
- Deno Bundler adapter implementation (using deno_emit)
- Deno HTTP Server adapter implementation
- Testing documentation (this file)
- **Phase 2 Complete - 100% test coverage!** 🎉

### 🔜 Next Steps

1. ~~Run File System contract tests with Deno~~ ✅
2. ~~Create Environment contract tests~~ ✅
3. ~~Create Bundler contract tests~~ ✅
4. ~~Fix HTTP Server lifecycle and resource cleanup issues~~ ✅
5. Create adapter implementation guidelines (Step 2.6)
6. Create Runtime detection contract tests (optional)
7. Implement Node.js adapters (Phase 3)
8. Implement Bun adapters (Phase 3)
9. Set up CI/CD pipeline for multi-runtime testing

---

## Troubleshooting

### Tests Not Running

**Problem:** `deno test` doesn't find tests

**Solution:** Ensure test files end with `.test.ts` or `_test.ts`

### Permission Errors

**Problem:** `PermissionDenied` errors during tests

**Solution:** Run with required permissions:

```bash
deno test --allow-read --allow-write --allow-env --allow-net
```

### Test Cleanup Failures

**Problem:** Test directory not cleaned up

**Solution:** Use try-finally blocks:

```typescript
try {
  // test logic
} finally {
  await adapter.removeAll(testDir);
}
```

### Flaky Tests

**Problem:** Tests pass sometimes, fail other times

**Solutions:**

- Ensure test independence
- Use unique test directories
- Avoid timing dependencies
- Use `TestRetry.withRetry()` for genuinely flaky operations

---

## Contributing

When adding new tests:

1. **Follow naming conventions**
   - Contract tests: `{interface}.contract.test.ts`
   - Adapter tests: `{adapter}/{interface}.test.ts`

2. **Use test utilities**
   - Don't recreate common functionality
   - Extend utilities if needed

3. **Document your tests**
   - Add JSDoc comments for test suites
   - Explain complex test scenarios

4. **Keep tests focused**
   - One test = one assertion area
   - Split complex tests into smaller ones

5. **Update this README**
   - Document new test patterns
   - Update checklists
   - Add examples

---

## Resources

### Documentation

- [Deno Testing](https://docs.deno.com/runtime/manual/basics/testing/)
- [Node Test Runner](https://nodejs.org/api/test.html)
- [Bun Test Runner](https://bun.sh/docs/cli/test)

### Related Files

- Platform Interfaces: `../src/platform/`
- Platform Documentation: `../src/platform/README.md`
- Project TODO: `../TODO.md`

---

## Philosophy

> "Test what should happen, not how it happens."

Our contract tests focus on **behavior**, not **implementation**. We care that:

- Files can be read and written
- Servers can handle requests
- Environment variables can be accessed

We don't care about:

- How Deno implements file I/O
- How Node implements HTTP servers
- How Bun manages environment variables

This allows each runtime to optimize its implementation while maintaining consistent behavior.

---

**"Trust in the Lord with all your heart, and do not lean on your own understanding."**  
— Proverbs 3:5

With hope in God, we test our code with confidence and diligence. 🚀

---

**Last Updated:** 2025-01-21  
**Status:** ✅ Phase 2 Complete | ✅ 79/79 Contract Tests Passing (100%) 🎉  
**Next:** Create adapter guidelines, then implement Node.js and Bun adapters

---

## Test Results Summary

| Interface   | Contract Tests | Deno Adapter           | Node Adapter | Bun Adapter |
| ----------- | -------------- | ---------------------- | ------------ | ----------- |
| File System | 12 tests       | ✅ 12/12               | 🔜 TODO      | 🔜 TODO     |
| Environment | 30 tests       | ✅ 30/30               | 🔜 TODO      | 🔜 TODO     |
| Bundler     | 26 tests       | ✅ 26/26               | 🔜 TODO      | 🔜 TODO     |
| HTTP Server | 11 tests       | ✅ 11/11               | 🔜 TODO      | 🔜 TODO     |
| Runtime     | -              | 🔜 TODO                | 🔜 TODO      | 🔜 TODO     |
| **Total**   | **79 tests**   | **✅ 79/79 (100%)** 🎉 | **0%**       | **0%**      |
