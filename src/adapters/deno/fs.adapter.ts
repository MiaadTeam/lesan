// Deno File System Adapter
// Wraps Deno's native file system APIs to implement FileSystemAdapter interface

import type {
  FileInfo,
  FileSystemAdapter,
} from "../../platform/fs.interface.ts";
import { FileSystemError } from "../../platform/fs.interface.ts";

/**
 * Deno implementation of FileSystemAdapter
 *
 * This adapter wraps Deno's native file system APIs to provide a consistent
 * interface for file operations across all runtimes.
 *
 * @example
 * ```typescript
 * import { denoFsAdapter } from './adapters/deno/fs.adapter.ts';
 *
 * const content = await denoFsAdapter.readTextFile('./config.json');
 * await denoFsAdapter.writeTextFile('./output.txt', 'Hello, World!');
 * ```
 */
export const denoFsAdapter: FileSystemAdapter = {
  /**
   * Read a file as UTF-8 text
   */
  async readTextFile(path: string): Promise<string> {
    try {
      return await Deno.readTextFile(path);
    } catch (error) {
      throw new FileSystemError(
        `Failed to read text file: ${path}`,
        "readTextFile",
        path,
        error as Error,
      );
    }
  },

  /**
   * Write UTF-8 text to a file
   */
  async writeTextFile(path: string, content: string): Promise<void> {
    try {
      // Ensure parent directory exists
      const dir = path.substring(0, path.lastIndexOf("/"));
      if (dir) {
        await Deno.mkdir(dir, { recursive: true });
      }
      await Deno.writeTextFile(path, content);
    } catch (error) {
      throw new FileSystemError(
        `Failed to write text file: ${path}`,
        "writeTextFile",
        path,
        error as Error,
      );
    }
  },

  /**
   * Read a file as binary data
   */
  async readFile(path: string): Promise<Uint8Array> {
    try {
      return await Deno.readFile(path);
    } catch (error) {
      throw new FileSystemError(
        `Failed to read file: ${path}`,
        "readFile",
        path,
        error as Error,
      );
    }
  },

  /**
   * Write binary data to a file
   */
  async writeFile(path: string, data: Uint8Array): Promise<void> {
    try {
      // Ensure parent directory exists
      const dir = path.substring(0, path.lastIndexOf("/"));
      if (dir) {
        await Deno.mkdir(dir, { recursive: true });
      }
      await Deno.writeFile(path, data);
    } catch (error) {
      throw new FileSystemError(
        `Failed to write file: ${path}`,
        "writeFile",
        path,
        error as Error,
      );
    }
  },

  /**
   * Ensure a directory exists, creating it recursively if needed
   */
  async ensureDir(path: string): Promise<void> {
    try {
      await Deno.mkdir(path, { recursive: true });
    } catch (error) {
      throw new FileSystemError(
        `Failed to ensure directory: ${path}`,
        "ensureDir",
        path,
        error as Error,
      );
    }
  },

  /**
   * Get the current working directory
   */
  getCwd(): string {
    try {
      return Deno.cwd();
    } catch (error) {
      throw new FileSystemError(
        "Failed to get current working directory",
        "getCwd",
        "",
        error as Error,
      );
    }
  },

  /**
   * Check if a file or directory exists
   */
  async exists(path: string): Promise<boolean> {
    try {
      await Deno.stat(path);
      return true;
    } catch (error) {
      // Deno throws NotFound error if path doesn't exist
      if (error instanceof Deno.errors.NotFound) {
        return false;
      }
      // Re-throw other errors
      throw new FileSystemError(
        `Failed to check existence: ${path}`,
        "exists",
        path,
        error as Error,
      );
    }
  },

  /**
   * Read directory contents
   */
  async readDir(path: string): Promise<string[]> {
    try {
      const entries: string[] = [];
      for await (const entry of Deno.readDir(path)) {
        entries.push(entry.name);
      }
      return entries;
    } catch (error) {
      throw new FileSystemError(
        `Failed to read directory: ${path}`,
        "readDir",
        path,
        error as Error,
      );
    }
  },

  /**
   * Remove a file or empty directory
   */
  async remove(path: string): Promise<void> {
    try {
      await Deno.remove(path);
    } catch (error) {
      throw new FileSystemError(
        `Failed to remove: ${path}`,
        "remove",
        path,
        error as Error,
      );
    }
  },

  /**
   * Remove a file or directory recursively
   */
  async removeAll(path: string): Promise<void> {
    try {
      await Deno.remove(path, { recursive: true });
    } catch (error) {
      throw new FileSystemError(
        `Failed to remove recursively: ${path}`,
        "removeAll",
        path,
        error as Error,
      );
    }
  },

  /**
   * Get file or directory information
   */
  async stat(path: string): Promise<FileInfo> {
    try {
      const info = await Deno.stat(path);
      return {
        isFile: info.isFile,
        isDirectory: info.isDirectory,
        isSymlink: info.isSymlink,
        size: info.size,
        mtime: info.mtime || null,
        atime: info.atime || null,
        birthtime: info.birthtime || null,
      };
    } catch (error) {
      throw new FileSystemError(
        `Failed to get file info: ${path}`,
        "stat",
        path,
        error as Error,
      );
    }
  },
};
