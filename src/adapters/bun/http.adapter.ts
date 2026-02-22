/**
 * @file http.adapter.ts
 * @description Bun implementation of the HttpServerAdapter interface.
 *
 * This adapter uses Bun's native `Bun.serve()` and `Bun.file()` APIs to provide
 * a highly optimized, Web Standards-compliant HTTP server.
 */

import type {
  HttpServerAdapter,
  RequestHandler,
  ServeFileOptions,
  ServerOptions,
  ShutdownOptions,
} from "../../platform/http.interface.ts";
import {
  COMMON_MIME_TYPES,
  HttpServerError,
} from "../../platform/http.interface.ts";

// Declare Bun globally to avoid TypeScript errors if bun-types is not included in the base tsconfig
declare const Bun: any;

/**
 * Tracks active server instances to ensure they can be gracefully shut down,
 * preventing resource leaks during testing or application termination.
 */
const activeServers = new Set<any>();

export const bunHttpAdapter: HttpServerAdapter = {
  serve(options: ServerOptions, handler: RequestHandler): void {
    try {
      const server = Bun.serve({
        port: options.port,
        hostname: options.hostname || "0.0.0.0",
        // Bun natively uses Web Standard Request and Response objects
        fetch(request: Request) {
          return handler(request);
        },
        error(error: Error) {
          if (options.onError) {
            options.onError(error);
          }
          return new Response("Internal Server Error", { status: 500 });
        },
      });

      // Track the server for graceful shutdown
      activeServers.add(server);

      // Trigger the onListen callback synchronously since Bun.serve starts immediately
      if (options.onListen) {
        options.onListen({
          port: server.port,
          hostname: server.hostname,
        });
      }
    } catch (error: any) {
      if (error.code === "EADDRINUSE") {
        throw new HttpServerError(
          `Port ${options.port} is already in use`,
          "EADDRINUSE",
          error,
        );
      }
      throw new HttpServerError(
        `Failed to start Bun HTTP server: ${error.message}`,
        error.code || "UNKNOWN_ERROR",
        error,
      );
    }
  },

  async serveFile(
    request: Request,
    filePath: string,
    options?: ServeFileOptions,
  ): Promise<Response> {
    try {
      const file = Bun.file(filePath);
      const exists = await file.exists();

      if (!exists) {
        return new Response("Not Found", { status: 404 });
      }

      const headers = new Headers();

      // Set Content-Type
      if (options?.contentType) {
        headers.set("Content-Type", options.contentType);
      } else {
        // Fallback to our getMimeType if Bun doesn't detect it
        headers.set("Content-Type", file.type || this.getMimeType(filePath));
      }

      // Apply custom headers
      if (options?.headers) {
        for (const [key, value] of Object.entries(options.headers)) {
          headers.set(key, value);
        }
      }

      // Bun automatically handles streaming the file and setting Content-Length
      return new Response(file, { headers });
    } catch (error: any) {
      throw new HttpServerError(
        `Failed to serve file at ${filePath}: ${error.message}`,
        error.code || "FILE_SERVE_ERROR",
        error,
      );
    }
  },

  getMimeType(path: string): string {
    const lastDotIndex = path.lastIndexOf(".");
    if (lastDotIndex === -1) {
      return "application/octet-stream";
    }

    const extension = path.substring(lastDotIndex).toLowerCase();
    return COMMON_MIME_TYPES[extension] || "application/octet-stream";
  },

  async shutdown(options?: ShutdownOptions): Promise<void> {
    const force = options?.force ?? true; // Default to true for tests to prevent hanging

    for (const server of activeServers) {
      try {
        // Bun's server.stop() takes a boolean indicating whether to close active connections
        server.stop(force);
      } catch (error) {
        console.error("Error shutting down Bun server:", error);
      }
    }

    activeServers.clear();
  },
};
