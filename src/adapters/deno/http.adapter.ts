// Deno HTTP Server Adapter
// Wraps Deno's native HTTP server APIs to implement HttpServerAdapter interface

import { serveFile } from "https://deno.land/std@0.224.0/http/file_server.ts";
import type {
  HttpServerAdapter,
  RequestHandler,
  ServeFileOptions,
  ServerOptions,
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
const activeServers = new Map<number, Deno.HttpServer<Deno.NetAddr>>();

/**
 * Deno implementation of HttpServerAdapter
 *
 * This adapter wraps Deno's native HTTP server APIs to provide a consistent
 * interface for HTTP operations across all runtimes.
 *
 * @example
 * ```typescript
 * import { denoHttpAdapter } from './adapters/deno/http.adapter.ts';
 *
 * denoHttpAdapter.serve({ port: 3000 }, async (request) => {
 *   return new Response('Hello, World!');
 * });
 * ```
 */
export const denoHttpAdapter: HttpServerAdapter = {
  /**
   * Start an HTTP server
   */
  serve(options: ServerOptions, handler: RequestHandler): void {
    try {
      const { port, hostname = "0.0.0.0", onListen, onError } = options;

      // Start the server - store reference immediately
      const server = Deno.serve(
        {
          port,
          hostname,
          onListen: (addr) => {
            if (onListen) {
              onListen({
                hostname: addr.hostname,
                port: addr.port,
              });
            }
          },
          onError: (error) => {
            if (onError) {
              onError(error as Error);
            }
            return new Response("Internal Server Error", { status: 500 });
          },
        },
        async (request) => {
          try {
            return await handler(request);
          } catch (error) {
            console.error("Request handler error:", error);
            return new Response("Internal Server Error", { status: 500 });
          }
        },
      );

      // Store server immediately for cleanup
      activeServers.set(port, server);
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
      // Check if file exists
      try {
        await Deno.stat(filePath);
      } catch (error) {
        if (error instanceof Deno.errors.NotFound) {
          return new Response("Not Found", { status: 404 });
        }
        throw error;
      }

      // Use Deno's serveFile helper
      const response = await serveFile(request, filePath);

      // Override content type if specified
      if (options?.contentType) {
        const headers = new Headers(response.headers);
        headers.set("Content-Type", options.contentType);
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers,
        });
      }

      // Add custom headers if specified
      if (options?.headers) {
        const headers = new Headers(response.headers);
        for (const [key, value] of Object.entries(options.headers)) {
          headers.set(key, value);
        }
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers,
        });
      }

      return response;
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
  async shutdown(options): Promise<void> {
    try {
      // Shutdown all active servers
      const shutdownPromises = Array.from(activeServers.entries()).map(
        async ([port, server]) => {
          try {
            await server.shutdown();
            activeServers.delete(port);
          } catch (error) {
            console.error(`Failed to shutdown server on port ${port}:`, error);
          }
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
    await server.shutdown();
    activeServers.delete(port);
  }
}
