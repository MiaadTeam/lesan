/**
 * @file http.adapter.ts
 * @description Node.js implementation of the HttpServerAdapter interface.
 */

import * as http from "node:http";
import * as fs from "node:fs/promises";
import { createReadStream } from "node:fs";
import { Readable } from "node:stream";
import type {
  HttpServerAdapter,
  RequestHandler,
  ServeFileOptions,
  ServerOptions,
  ShutdownOptions,
} from "../../platform/http.interface.ts";
import { HttpServerError } from "../../platform/http.interface.ts";

/**
 * Common MIME types mapping
 */
const MIME_TYPES: Record<string, string> = {
  ".html": "text/html",
  ".htm": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".md": "text/markdown",
  ".csv": "text/csv",

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

  // Media
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".ogg": "audio/ogg",
  ".wav": "audio/wav",

  // Archives
  ".zip": "application/zip",
  ".tar": "application/x-tar",
  ".gz": "application/gzip",

  // Documents
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

  // Default
  ".bin": "application/octet-stream",
};

/**
 * Server registry to track active servers for cleanup
 */
const activeServers = new Map<number, http.Server>();

/**
 * Node.js implementation of HttpServerAdapter
 *
 * This adapter wraps Node's native HTTP server APIs (`node:http`) to provide a consistent
 * interface for HTTP operations across all runtimes. It handles the conversion between
 * Node's `IncomingMessage`/`ServerResponse` and the Web Standard `Request`/`Response`.
 *
 * @example
 * ```typescript
 * import { nodeHttpAdapter } from './adapters/node/http.adapter.ts';
 *
 * nodeHttpAdapter.serve({ port: 3000 }, async (request) => {
 *   return new Response('Hello, World!');
 * });
 * ```
 */
export const nodeHttpAdapter: HttpServerAdapter = {
  /**
   * Start an HTTP server
   */
  serve(options: ServerOptions, handler: RequestHandler): void {
    try {
      const { port, hostname = "0.0.0.0", onListen, onError } = options;

      const server = http.createServer(async (req, res) => {
        try {
          // 1. Convert Node.js IncomingMessage to Web Standard Request
          const protocol = req.socket && "encrypted" in req.socket
            ? "https"
            : "http";
          const host = req.headers.host || `${hostname}:${port}`;
          const url = new URL(req.url || "/", `${protocol}://${host}`);

          const headers = new Headers();
          for (let i = 0; i < req.rawHeaders.length; i += 2) {
            headers.append(req.rawHeaders[i], req.rawHeaders[i + 1]);
          }

          const init: RequestInit = {
            method: req.method,
            headers,
          };

          if (req.method !== "GET" && req.method !== "HEAD") {
            init.body = Readable.toWeb(req) as ReadableStream;
            // Node.js requires duplex: 'half' for Request with ReadableStream body
            (init as any).duplex = "half";
          }

          const request = new Request(url.toString(), init);

          // 2. Call the Lesan handler
          const response = await handler(request);

          // 3. Convert Web Standard Response to Node.js ServerResponse
          res.statusCode = response.status;
          res.statusMessage = response.statusText;

          response.headers.forEach((value, key) => {
            res.setHeader(key, value);
          });

          if (response.body) {
            const reader = response.body.getReader();
            try {
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                res.write(value);
              }
            } finally {
              reader.releaseLock();
            }
            res.end();
          } else {
            res.end();
          }
        } catch (error) {
          console.error("Request handler error:", error);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.end("Internal Server Error");
          } else {
            res.end();
          }
        }
      });

      server.on("error", (error) => {
        if (onError) {
          onError(error);
        }
      });

      // Store server immediately for cleanup
      activeServers.set(port, server);

      server.listen(port, hostname, () => {
        if (onListen) {
          onListen({ hostname, port });
        }
      });
    } catch (error) {
      throw new HttpServerError(
        `Failed to start HTTP server: ${(error as Error).message}`,
        "serve",
        error as Error,
      );
    }
  },

  /**
   * Serve a static file
   */
  async serveFile(
    request: Request,
    filePath: string,
    options?: ServeFileOptions,
  ): Promise<Response> {
    try {
      let stat;
      try {
        stat = await fs.stat(filePath);
      } catch (error: any) {
        if (error.code === "ENOENT") {
          return new Response("Not Found", { status: 404 });
        }
        throw error;
      }

      if (!stat.isFile()) {
        return new Response("Not Found", { status: 404 });
      }

      const nodeStream = createReadStream(filePath);
      const webStream = Readable.toWeb(nodeStream);

      const contentType = options?.contentType ||
        nodeHttpAdapter.getMimeType(filePath);
      const headers = new Headers();
      headers.set("Content-Type", contentType);
      headers.set("Content-Length", stat.size.toString());

      if (options?.headers) {
        for (const [key, value] of Object.entries(options.headers)) {
          headers.set(key, value);
        }
      }

      return new Response(webStream as ReadableStream, {
        status: 200,
        headers,
      });
    } catch (error) {
      throw new HttpServerError(
        `Failed to serve file: ${filePath}`,
        "serveFile",
        error as Error,
      );
    }
  },

  /**
   * Get MIME type for a file
   */
  getMimeType(path: string): string {
    // Extract extension
    const ext = path.includes(".")
      ? path.substring(path.lastIndexOf(".")).toLowerCase()
      : path.toLowerCase();

    // Return MIME type or default
    return MIME_TYPES[ext] || "application/octet-stream";
  },

  /**
   * Shutdown the HTTP server
   */
  async shutdown(options?: ShutdownOptions): Promise<void> {
    try {
      const timeout = options?.timeout || 10000;
      const force = options?.force || false;

      const shutdownPromises = Array.from(activeServers.entries()).map(
        ([port, server]) => {
          return new Promise<void>((resolve) => {
            if (force) {
              // Node 18.2.0+ supports closeAllConnections
              if (typeof server.closeAllConnections === "function") {
                server.closeAllConnections();
              }
            }

            const timer = setTimeout(() => {
              if (typeof server.closeAllConnections === "function") {
                server.closeAllConnections();
              }
              resolve();
            }, timeout);

            server.close(() => {
              clearTimeout(timer);
              resolve();
            });

            activeServers.delete(port);
          });
        },
      );

      await Promise.all(shutdownPromises);
    } catch (error) {
      throw new HttpServerError(
        "Failed to shutdown server",
        "shutdown",
        error as Error,
      );
    }
  },
};

/**
 * Helper function to shutdown a specific server by port
 */
export async function shutdownServerByPort(port: number): Promise<void> {
  const server = activeServers.get(port);
  if (server) {
    return new Promise<void>((resolve) => {
      if (typeof server.closeAllConnections === "function") {
        server.closeAllConnections();
      }
      server.close(() => {
        resolve();
      });
      activeServers.delete(port);
    });
  }
}
