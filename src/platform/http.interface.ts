/**
 * HTTP Server Platform Interface
 *
 * Provides a unified interface for HTTP server operations across different JavaScript runtimes
 * (Node.js, Bun, and Deno). This interface abstracts runtime-specific HTTP server APIs.
 *
 * @module platform/http
 * @since 2.0.0
 */

/**
 * Options for configuring an HTTP server.
 *
 * @interface ServerOptions
 */
export interface ServerOptions {
  /**
   * The port number to listen on.
   * @default 8000
   */
  port: number;

  /**
   * The hostname to bind to.
   * @default "0.0.0.0" (all interfaces)
   */
  hostname?: string;

  /**
   * TLS/SSL certificate for HTTPS (optional).
   */
  cert?: string;

  /**
   * TLS/SSL private key for HTTPS (optional).
   */
  key?: string;

  /**
   * Callback invoked when server starts listening.
   */
  onListen?: (params: { hostname: string; port: number }) => void;

  /**
   * Callback invoked when server encounters an error.
   */
  onError?: (error: Error) => void;
}

/**
 * Represents an HTTP request handler function.
 *
 * @callback RequestHandler
 * @param request - The incoming HTTP request
 * @returns A Response object or a Promise that resolves to a Response
 */
export type RequestHandler = (request: Request) => Response | Promise<Response>;

/**
 * Options for serving static files.
 *
 * @interface ServeFileOptions
 */
export interface ServeFileOptions {
  /**
   * Override the MIME type detection.
   */
  contentType?: string;

  /**
   * Additional headers to include in the response.
   */
  headers?: Record<string, string>;

  /**
   * Whether to automatically add ETag header for caching.
   * @default true
   */
  etagAlgorithm?: "fnv1a" | "sha-1" | "sha-256" | false;

  /**
   * Maximum age for Cache-Control header (in seconds).
   */
  maxAge?: number;

  /**
   * Whether to serve index.html for directory requests.
   * @default false
   */
  serveIndexHtml?: boolean;
}

/**
 * Information about a static file being served.
 *
 * @interface FileServeInfo
 */
export interface FileServeInfo {
  /**
   * The full path to the file being served.
   */
  path: string;

  /**
   * The detected MIME type of the file.
   */
  contentType: string;

  /**
   * The size of the file in bytes.
   */
  size: number;

  /**
   * The last modification time of the file.
   */
  mtime: Date | null;
}

/**
 * Unified interface for HTTP server operations across different JavaScript runtimes.
 *
 * This interface abstracts runtime-specific HTTP server APIs to provide a consistent
 * API for Lesan's server functionality. Implementations must handle platform-specific
 * differences in:
 * - Server lifecycle management
 * - Request/Response handling
 * - Static file serving
 * - WebSocket upgrades (future)
 * - Error handling
 *
 * All implementations should use the Web Standard Request and Response objects
 * for maximum compatibility.
 *
 * @interface HttpServerAdapter
 *
 * @example
 * ```typescript
 * const http: HttpServerAdapter = getAdapter();
 *
 * // Start a simple HTTP server
 * http.serve({
 *   port: 8000,
 *   onListen: ({ port }) => console.log(`Server running on port ${port}`)
 * }, async (request) => {
 *   return new Response('Hello, World!');
 * });
 * ```
 */
export interface HttpServerAdapter {
  /**
   * Starts an HTTP server with the specified options and request handler.
   *
   * The server will listen for incoming HTTP requests and invoke the handler
   * for each request. The handler must return a standard Response object.
   *
   * This method may block the current execution (Deno) or run in the background
   * (Node.js, Bun) depending on the runtime implementation.
   *
   * @param options - Server configuration options
   * @param handler - Function to handle incoming requests
   * @returns A promise that resolves when the server starts, or void for blocking implementations
   * @throws {HttpServerError} If the server fails to start (e.g., port already in use)
   *
   * @example
   * ```typescript
   * await http.serve({ port: 3000 }, async (request) => {
   *   const url = new URL(request.url);
   *
   *   if (url.pathname === '/') {
   *     return new Response('Home Page', {
   *       headers: { 'Content-Type': 'text/plain' }
   *     });
   *   }
   *
   *   return new Response('Not Found', { status: 404 });
   * });
   * ```
   */
  serve(options: ServerOptions, handler: RequestHandler): void | Promise<void>;

  /**
   * Serves a static file from the file system.
   *
   * This method reads the file at the specified path and returns it as an HTTP response
   * with appropriate headers (Content-Type, Content-Length, ETag, Cache-Control, etc.).
   *
   * The method should:
   * - Automatically detect the MIME type based on file extension
   * - Add appropriate caching headers
   * - Handle range requests for large files (optional but recommended)
   * - Return 404 if file doesn't exist
   * - Return 403 if file cannot be accessed
   *
   * @param request - The incoming HTTP request
   * @param filePath - The path to the file to serve (can be relative or absolute)
   * @param options - Optional configuration for serving the file
   * @returns A promise that resolves to an HTTP Response with the file contents
   * @throws {HttpServerError} If the file cannot be read or served
   *
   * @example
   * ```typescript
   * await http.serve({ port: 8000 }, async (request) => {
   *   const url = new URL(request.url);
   *
   *   // Serve static files from public directory
   *   if (url.pathname.startsWith('/static/')) {
   *     return await http.serveFile(request, `./public${url.pathname}`);
   *   }
   *
   *   return new Response('Not Found', { status: 404 });
   * });
   * ```
   */
  serveFile(
    request: Request,
    filePath: string,
    options?: ServeFileOptions,
  ): Promise<Response>;

  /**
   * Gets the MIME type for a file based on its extension.
   *
   * This is a helper method that can be used to determine content types
   * without actually reading the file.
   *
   * @param path - The file path or extension (e.g., 'index.html' or '.html')
   * @returns The MIME type string (e.g., 'text/html') or 'application/octet-stream' if unknown
   *
   * @example
   * ```typescript
   * const mimeType = http.getMimeType('./index.html');
   * console.log(mimeType); // 'text/html'
   *
   * const jsType = http.getMimeType('.js');
   * console.log(jsType); // 'application/javascript'
   * ```
   */
  getMimeType(path: string): string;

  /**
   * Stops the HTTP server gracefully.
   *
   * This method should:
   * - Stop accepting new connections
   * - Wait for existing requests to complete (with optional timeout)
   * - Clean up resources
   *
   * @param options - Options for server shutdown
   * @returns A promise that resolves when the server has shut down
   *
   * @example
   * ```typescript
   * // Graceful shutdown with 5 second timeout
   * await http.shutdown({ timeout: 5000 });
   * ```
   */
  shutdown?(options?: ShutdownOptions): Promise<void>;
}

/**
 * Options for shutting down the server.
 *
 * @interface ShutdownOptions
 */
export interface ShutdownOptions {
  /**
   * Maximum time to wait for existing requests to complete (in milliseconds).
   * After this timeout, the server will force-close all connections.
   * @default 10000 (10 seconds)
   */
  timeout?: number;

  /**
   * Whether to abort all in-flight requests immediately.
   * @default false
   */
  force?: boolean;
}

/**
 * Error thrown when an HTTP server operation fails.
 *
 * @class HttpServerError
 * @extends Error
 */
export class HttpServerError extends Error {
  /**
   * Creates a new HttpServerError.
   *
   * @param message - The error message
   * @param code - Error code (e.g., 'EADDRINUSE', 'EACCES')
   * @param cause - The underlying error that caused this error
   */
  constructor(
    message: string,
    public readonly code: string,
    public override readonly cause?: Error,
  ) {
    super(message);
    this.name = "HttpServerError";

    // Maintains proper stack trace in V8 engines
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpServerError);
    }
  }
}

/**
 * Type guard to check if an error is an HttpServerError.
 *
 * @param error - The error to check
 * @returns True if the error is an HttpServerError
 *
 * @example
 * ```typescript
 * try {
 *   await http.serve({ port: 80 }, handler);
 * } catch (error) {
 *   if (isHttpServerError(error)) {
 *     if (error.code === 'EACCES') {
 *       console.error('Permission denied. Try using a higher port number.');
 *     } else if (error.code === 'EADDRINUSE') {
 *       console.error('Port is already in use.');
 *     }
 *   }
 * }
 * ```
 */
export function isHttpServerError(error: unknown): error is HttpServerError {
  return error instanceof HttpServerError;
}

/**
 * Common MIME types mapping.
 *
 * This is a reference list of common MIME types that adapters should support.
 * Adapters may use their runtime's built-in MIME type detection or implement
 * their own based on this mapping.
 *
 * @const COMMON_MIME_TYPES
 */
export const COMMON_MIME_TYPES: Record<string, string> = {
  // Text
  ".html": "text/html",
  ".htm": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".md": "text/markdown",

  // Images
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",

  // Fonts
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",

  // Application
  ".pdf": "application/pdf",
  ".zip": "application/zip",
  ".gz": "application/gzip",
  ".wasm": "application/wasm",

  // TypeScript
  ".ts": "application/typescript",
  ".tsx": "application/typescript",
} as const;

/**
 * Helper function to determine if a request is using a secure protocol (HTTPS).
 *
 * @param request - The HTTP request to check
 * @returns True if the request is using HTTPS
 *
 * @example
 * ```typescript
 * if (isSecureRequest(request)) {
 *   // Handle HTTPS-specific logic
 * }
 * ```
 */
export function isSecureRequest(request: Request): boolean {
  const url = new URL(request.url);
  return url.protocol === "https:";
}

/**
 * Helper function to extract client IP address from request headers.
 *
 * Checks various headers commonly used by proxies and load balancers.
 *
 * @param request - The HTTP request
 * @returns The client IP address or null if not available
 *
 * @example
 * ```typescript
 * const clientIp = getClientIp(request);
 * console.log(`Request from: ${clientIp}`);
 * ```
 */
export function getClientIp(request: Request): string | null {
  // Check common proxy headers
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  // Note: The actual client IP is not available in the standard Request object
  // Adapters may need to provide this through additional metadata
  return null;
}
