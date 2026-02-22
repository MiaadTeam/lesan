/**
 * @file fs.adapter.ts
 * @description Node.js implementation of the FileSystemAdapter interface.
 */

import * as fs from "node:fs/promises";
import * as pathModule from "node:path";
import type {
  FileInfo,
  FileSystemAdapter,
} from "../../platform/fs.interface.ts";
import { FileSystemError } from "../../platform/fs.interface.ts";

/**
 * Node.js implementation of FileSystemAdapter
 *
 * This adapter wraps Node's native file system APIs (node:fs/promises) to provide
 * a consistent interface for file operations across all runtimes.
 *
 * @example
 * ```typescript
 * import { nodeFsAdapter } from './adapters/node/fs.adapter.ts';
 *
 * const content = await nodeFsAdapter.readTextFile('./config.json');
 * await nodeFsAdapter.writeTextFile('./output.txt', 'Hello, World!');
 * ```
 */
export const nodeFsAdapter: FileSystemAdapter = {
  /**
   * Read a file as UTF-8 text
   */
  async readTextFile(path: string): Promise<string> {
    try {
      return await fs.readFile(path, "utf-8");
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
      const dir = pathModule.dirname(path);
      if (dir) {
        await fs.mkdir(dir, { recursive: true });
      }
      await fs.writeFile(path, content, "utf-8");
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
      const buffer = await fs.readFile(path);
      return new Uint8Array(
        buffer.buffer,
        buffer.byteOffset,
        buffer.byteLength,
      );
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
      const dir = pathModule.dirname(path);
      if (dir) {
        await fs.mkdir(dir, { recursive: true });
      }
      await fs.writeFile(path, data);
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
      await fs.mkdir(path, { recursive: true });
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
      return process.cwd();
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
      await fs.access(path);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Read directory contents
   */
  async readDir(path: string): Promise<string[]> {
    try {
      return await fs.readdir(path);
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
      const stat = await fs.stat(path);
      if (stat.isDirectory()) {
        await fs.rmdir(path);
      } else {
        await fs.unlink(path);
      }
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
      await fs.rm(path, { recursive: true, force: true });
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
      const info = await fs.stat(path);
      return {
        isFile: info.isFile(),
        isDirectory: info.isDirectory(),
        isSymlink: info.isSymbolicLink(),
        size: info.size,
        mtime: info.mtime,
        atime: info.atime,
        birthtime: info.birthtime,
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
