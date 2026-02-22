import { test } from "../utils/test-runner.ts";
// HTTP Server Contract Tests
// These tests validate that any HttpServerAdapter implementation behaves correctly
// All adapters (Deno, Node, Bun) must pass these tests

import {
  assertEquals,
  assertRejects,
} from "../utils/assert.ts";
import type { HttpServerAdapter } from "../../src/platform/http.interface.ts";
import { HttpServerError } from "../../src/platform/http.interface.ts";
import {
  TestAssertions,
  TestCleanup,
  TestLogger,
  TestPaths,
  TestPerformance,
} from "../utils/test-helpers.ts";

/**
 * Helper to find an available port for testing
 */
let currentTestPort = 8100;
function getTestPort(): number {
  return currentTestPort++;
}

/**
 * Helper to make HTTP requests for testing
 */
async function fetchWithTimeout(
  url: string,
  timeoutMs: number = 5000,
): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);
    return response;
  } catch (error) {
    clearTimeout(timeout);
    throw error;
  }
}

/**
 * Helper to wait for server to be ready
 */
async function waitForServer(
  port: number,
  maxAttempts: number = 10,
): Promise<boolean> {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const response = await fetchWithTimeout(
        `http://localhost:${port}/`,
        1000,
      );
      await response.text(); // Consume body to prevent leak
      return true;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
  return false;
}

/**
 * Contract test suite for HttpServerAdapter
 *
 * This test suite validates that all HttpServerAdapter implementations
 * (Deno, Node.js, Bun) behave identically for HTTP server operations.
 *
 * @param adapter - The HttpServerAdapter implementation to test
 * @param testContext - Optional context information for logging
 */
export function testHttpServerAdapter(
  adapter: HttpServerAdapter,
  testContext: { runtime?: string } = {},
) {
  const runtime = testContext.runtime || "unknown";
  TestLogger.info(`Running HTTP Server contract tests for: ${runtime}`);

  /**
   * Cleanup function to stop all test servers
   */
  async function cleanupServers() {
    try {
      if (adapter.shutdown) {
        await adapter.shutdown();
        TestLogger.info(`Shut down all test servers`);
      }
    } catch (error) {
      TestLogger.warn(
        `Failed to shutdown servers: ${(error as Error).message}`,
      );
    }
  }

  // Register cleanup
  TestCleanup.register(cleanupServers);

  // ==========================================
  // Test Suite: Basic Server Operations
  // ==========================================

  test({
    name: `[${runtime}] HTTP Server: should start server and handle requests`,
    async fn() {
      const port = getTestPort();
      let serverStarted = false;

      // Start server
      const serverPromise = adapter.serve(
        {
          port,
          onListen: ({ port: listenPort }) => {
            TestLogger.info(`Test server started on port ${listenPort}`);
            serverStarted = true;
          },
        },
        async (request) => {
          return new Response("Hello, World!", {
            headers: { "Content-Type": "text/plain" },
          });
        },
      );

      // Wait for server to be ready
      const ready = await waitForServer(port);
      assertEquals(ready, true, "Server should start successfully");
      assertEquals(serverStarted, true, "onListen callback should be called");

      // Make a request
      const response = await fetchWithTimeout(`http://localhost:${port}/`);
      const text = await response.text();

      assertEquals(response.status, 200, "Should return 200 status");
      assertEquals(text, "Hello, World!", "Should return correct response");

      await cleanupServers();
    },
  });

  test({
    name: `[${runtime}] HTTP Server: should handle different paths`,
    async fn() {
      const port = getTestPort();

      // Start server with path-based routing
      adapter.serve(
        { port },
        async (request) => {
          const url = new URL(request.url);

          if (url.pathname === "/") {
            return new Response("Home", { status: 200 });
          } else if (url.pathname === "/about") {
            return new Response("About", { status: 200 });
          } else if (url.pathname === "/api/data") {
            return new Response(JSON.stringify({ message: "API Response" }), {
              headers: { "Content-Type": "application/json" },
            });
          } else {
            return new Response("Not Found", { status: 404 });
          }
        },
      );

      await waitForServer(port);

      // Test home route
      const homeResponse = await fetchWithTimeout(`http://localhost:${port}/`);
      assertEquals(await homeResponse.text(), "Home");

      // Test about route
      const aboutResponse = await fetchWithTimeout(
        `http://localhost:${port}/about`,
      );
      assertEquals(await aboutResponse.text(), "About");

      // Test API route
      const apiResponse = await fetchWithTimeout(
        `http://localhost:${port}/api/data`,
      );
      const apiData = await apiResponse.json();
      assertEquals(apiData.message, "API Response");

      // Test 404
      const notFoundResponse = await fetchWithTimeout(
        `http://localhost:${port}/missing`,
      );
      assertEquals(notFoundResponse.status, 404);
      await notFoundResponse.text(); // Consume body to prevent leak

      await cleanupServers();
    },
  });

  test({
    name: `[${runtime}] HTTP Server: should handle POST requests with body`,
    async fn() {
      const port = getTestPort();

      adapter.serve(
        { port },
        async (request) => {
          if (request.method === "POST") {
            const body = await request.text();
            return new Response(`Received: ${body}`, { status: 200 });
          }
          return new Response("Method Not Allowed", { status: 405 });
        },
      );

      await waitForServer(port);

      // Make POST request
      const response = await fetch(`http://localhost:${port}/`, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: "Test Data",
      });

      assertEquals(response.status, 200);
      assertEquals(await response.text(), "Received: Test Data");

      await cleanupServers();
    },
  });

  test({
    name: `[${runtime}] HTTP Server: should handle request headers`,
    async fn() {
      const port = getTestPort();

      adapter.serve(
        { port },
        async (request) => {
          const userAgent = request.headers.get("User-Agent") || "Unknown";
          const customHeader = request.headers.get("X-Custom-Header") ||
            "None";

          return new Response(
            JSON.stringify({ userAgent, customHeader }),
            {
              headers: { "Content-Type": "application/json" },
            },
          );
        },
      );

      await waitForServer(port);

      // Make request with custom headers
      const response = await fetch(`http://localhost:${port}/`, {
        headers: {
          "User-Agent": "Lesan-Test/1.0",
          "X-Custom-Header": "TestValue",
        },
      });

      const data = await response.json();
      assertEquals(data.customHeader, "TestValue");

      await cleanupServers();
    },
  });

  // ==========================================
  // Test Suite: Static File Serving
  // ==========================================

  test({
    name:
      `[${runtime}] HTTP Server: getMimeType should return correct MIME types`,
    fn() {
      // Test common file extensions
      assertEquals(
        adapter.getMimeType("index.html"),
        "text/html",
        "HTML files should have text/html MIME type",
      );
      assertEquals(
        adapter.getMimeType("style.css"),
        "text/css",
        "CSS files should have text/css MIME type",
      );
      assertEquals(
        adapter.getMimeType("script.js"),
        "application/javascript",
        "JS files should have application/javascript MIME type",
      );
      assertEquals(
        adapter.getMimeType("data.json"),
        "application/json",
        "JSON files should have application/json MIME type",
      );
      assertEquals(
        adapter.getMimeType("image.png"),
        "image/png",
        "PNG files should have image/png MIME type",
      );

      // Test with just extensions
      assertEquals(adapter.getMimeType(".html"), "text/html");
      assertEquals(adapter.getMimeType(".js"), "application/javascript");

      // Test unknown extension
      const unknownType = adapter.getMimeType("file.unknown");
      TestAssertions.isDefined(
        unknownType,
        "Unknown extensions should return a MIME type",
      );
    },
  });

  test({
    name: `[${runtime}] HTTP Server: serveFile should serve HTML file`,
    async fn() {
      const port = getTestPort();
      const htmlPath = TestPaths.fixture("index.html");

      adapter.serve(
        { port },
        async (request) => {
          const url = new URL(request.url);
          if (url.pathname === "/test.html") {
            return await adapter.serveFile(request, htmlPath);
          }
          return new Response("Not Found", { status: 404 });
        },
      );

      await waitForServer(port);

      // Request the HTML file
      const response = await fetchWithTimeout(
        `http://localhost:${port}/test.html`,
      );

      assertEquals(response.status, 200, "Should return 200 for existing file");
      assertEquals(
        response.headers.get("Content-Type")?.includes("text/html"),
        true,
        "Should have correct Content-Type header",
      );

      const html = await response.text();
      TestAssertions.contains(
        html,
        "Lesan HTTP Server Test",
        "Should contain expected HTML content",
      );

      await cleanupServers();
    },
  });

  test({
    name: `[${runtime}] HTTP Server: serveFile should serve CSS file`,
    async fn() {
      const port = getTestPort();
      const cssPath = TestPaths.fixture("style.css");

      adapter.serve(
        { port },
        async (request) => {
          return await adapter.serveFile(request, cssPath);
        },
      );

      await waitForServer(port);

      const response = await fetchWithTimeout(`http://localhost:${port}/`);

      assertEquals(response.status, 200);
      assertEquals(
        response.headers.get("Content-Type")?.includes("text/css"),
        true,
        "Should have CSS Content-Type",
      );

      const css = await response.text();
      TestAssertions.contains(css, "Lesan Test Styles");

      await cleanupServers();
    },
  });

  test({
    name: `[${runtime}] HTTP Server: serveFile should serve JavaScript file`,
    async fn() {
      const port = getTestPort();
      const jsPath = TestPaths.fixture("script.js");

      adapter.serve(
        { port },
        async (request) => {
          return await adapter.serveFile(request, jsPath);
        },
      );

      await waitForServer(port);

      const response = await fetchWithTimeout(`http://localhost:${port}/`);

      assertEquals(response.status, 200);
      const contentType = response.headers.get("Content-Type") || "";
      TestAssertions.isTrue(
        contentType.includes("javascript") || contentType.includes("js"),
        "Should have JavaScript Content-Type",
      );

      const js = await response.text();
      TestAssertions.contains(js, "Lesan Test Script");

      await cleanupServers();
    },
  });

  test({
    name:
      `[${runtime}] HTTP Server: serveFile should return 404 for missing file`,
    async fn() {
      const port = getTestPort();

      adapter.serve(
        { port },
        async (request) => {
          try {
            return await adapter.serveFile(
              request,
              TestPaths.fixture("missing-file.html"),
            );
          } catch (error) {
            // If adapter throws error, return 404 response
            return new Response("Not Found", { status: 404 });
          }
        },
      );

      await waitForServer(port);

      const response = await fetchWithTimeout(`http://localhost:${port}/`);

      assertEquals(
        response.status,
        404,
        "Should return 404 for missing file",
      );
      await response.text(); // Consume body to prevent leak

      await cleanupServers();
    },
  });

  // ==========================================
  // Test Suite: Performance & Concurrency
  // ==========================================

  test({
    name: `[${runtime}] HTTP Server: should handle concurrent requests`,
    async fn() {
      const port = getTestPort();
      let requestCount = 0;

      adapter.serve(
        { port },
        async (request) => {
          requestCount++;
          // Simulate some async work
          await new Promise((resolve) => setTimeout(resolve, 10));
          return new Response(`Request ${requestCount}`, { status: 200 });
        },
      );

      await waitForServer(port);

      // Reset counter after wait request
      requestCount = 0;

      // Make 10 concurrent requests
      const promises = Array.from(
        { length: 10 },
        (_, i) => fetchWithTimeout(`http://localhost:${port}/?id=${i}`),
      );

      const responses = await Promise.all(promises);

      // All should succeed
      for (const response of responses) {
        assertEquals(response.status, 200);
        await response.text(); // Consume body to prevent leak
      }

      // Should have handled all requests
      assertEquals(
        requestCount,
        10,
        "Should handle all concurrent requests",
      );

      await cleanupServers();
    },
  });

  test({
    name: `[${runtime}] HTTP Server: should handle requests reasonably fast`,
    async fn() {
      const port = getTestPort();

      adapter.serve(
        { port },
        async (request) => {
          return new Response("Fast Response", { status: 200 });
        },
      );

      await waitForServer(port);

      // Measure response time
      const timer = TestPerformance.start();
      const response = await fetchWithTimeout(`http://localhost:${port}/`);
      await response.text(); // Consume body to prevent leak
      const duration = timer.end();

      TestLogger.info(`Request completed in ${duration.toFixed(2)}ms`);

      // Should be reasonably fast (< 500ms for local server with network overhead)
      TestAssertions.isTrue(
        duration < 500,
        `Request should complete in < 500ms, took ${duration.toFixed(2)}ms`,
      );

      await cleanupServers();
    },
  });

  TestLogger.info(`HTTP Server contract tests completed for: ${runtime}`);
}

/**
 * Helper function to run minimal contract tests
 * Use this for quick validation during development
 */
export function testHttpServerAdapterMinimal(
  adapter: HttpServerAdapter,
  testContext: { runtime?: string } = {},
) {
  const runtime = testContext.runtime || "unknown";
  TestLogger.info(`Running MINIMAL HTTP Server tests for: ${runtime}`);

  test({
    name: `[${runtime}] HTTP Server (minimal): basic server start and request`,
    async fn() {
      const port = getTestPort();

      adapter.serve(
        { port },
        async (request) => {
          return new Response("OK", { status: 200 });
        },
      );

      await waitForServer(port);

      const response = await fetchWithTimeout(`http://localhost:${port}/`);
      assertEquals(response.status, 200);
      assertEquals(await response.text(), "OK");
    },
  });

  TestLogger.info(`MINIMAL HTTP Server tests completed for: ${runtime}`);
}
