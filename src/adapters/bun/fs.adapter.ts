/**
 * @file fs.adapter.ts
 * @description Bun implementation of the FileSystemAdapter interface.
 *
 * This adapter uses Bun's highly optimized `Bun.file()` and `Bun.write()` APIs
 * for file I/O, and falls back to `node:fs/promises` for directory and metadata
 * operations, which Bun implements natively.
 */

import { promises as fs } from "node:fs";
import { dirname } from "node:path";
import type {
  FileInfo,
  FileSystemAdapter,
} from "../../platform/fs.interface.ts";
import { FileSystemError } from "../../platform/fs.interface.ts";

// Declare Bun globally to avoid TypeScript errors if bun-types is not included
declare const Bun: any;

export const bunFileSystemAdapter: FileSystemAdapter = {
  async readTextFile(path: string): Promise<string> {
    try {
      const file = Bun.file(path);
      const exists = await file.exists();
      if (!exists) {
        throw new Error(`ENOENT: no such file or directory, open '${path}'`);
      }
      return await file.text();
    } catch (error: any) {
      throw new FileSystemError(
        `Failed to read text file at ${path}: ${error.message}`,
        "readTextFile",
        path,
        error,
      );
    }
  },

  async writeTextFile(path: string, content: string): Promise<void> {
    try {
      await fs.mkdir(dirname(path), { recursive: true });
      await Bun.write(path, content);
    } catch (error: any) {
      throw new FileSystemError(
        `Failed to write text file at ${path}: ${error.message}`,
        "writeTextFile",
        path,
        error,
      );
    }
  },

  async readFile(path: string): Promise<Uint8Array> {
    try {
      const file = Bun.file(path);
      const exists = await file.exists();
      if (!exists) {
        throw new Error(`ENOENT: no such file or directory, open '${path}'`);
      }
      const arrayBuffer = await file.arrayBuffer();
      return new Uint8Array(arrayBuffer);
    } catch (error: any) {
      throw new FileSystemError(
        `Failed to read file at ${path}: ${error.message}`,
        "readFile",
        path,
        error,
      );
    }
  },

  async writeFile(path: string, data: Uint8Array): Promise<void> {
    try {
      await fs.mkdir(dirname(path), { recursive: true });
      await Bun.write(path, data);
    } catch (error: any) {
      throw new FileSystemError(
        `Failed to write file at ${path}: ${error.message}`,
        "writeFile",
        path,
        error,
      );
    }
  },

  async ensureDir(path: string): Promise<void> {
    try {
      await fs.mkdir(path, { recursive: true });
    } catch (error: any) {
      throw new FileSystemError(
        `Failed to ensure directory at ${path}: ${error.message}`,
        "ensureDir",
        path,
        error,
      );
    }
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

  async readDir(path: string): Promise<string[]> {
    try {
      return await fs.readdir(path);
    } catch (error: any) {
      throw new FileSystemError(
        `Failed to read directory at ${path}: ${error.message}`,
        "readDir",
        path,
        error,
      );
    }
  },

  async remove(path: string): Promise<void> {
    try {
      const stat = await fs.stat(path);
      if (stat.isDirectory()) {
        await fs.rmdir(path);
      } else {
        await fs.unlink(path);
      }
    } catch (error: any) {
      throw new FileSystemError(
        `Failed to remove at ${path}: ${error.message}`,
        "remove",
        path,
        error,
      );
    }
  },

  async removeAll(path: string): Promise<void> {
    try {
      await fs.rm(path, { recursive: true, force: true });
    } catch (error: any) {
      throw new FileSystemError(
        `Failed to remove all at ${path}: ${error.message}`,
        "removeAll",
        path,
        error,
      );
    }
  },

  async stat(path: string): Promise<FileInfo> {
    try {
      const stat = await fs.stat(path);
      return {
        isFile: stat.isFile(),
        isDirectory: stat.isDirectory(),
        isSymlink: stat.isSymbolicLink(),
        size: stat.size,
        mtime: stat.mtime,
        atime: stat.atime,
        birthtime: stat.birthtime,
      };
    } catch (error: any) {
      throw new FileSystemError(
        `Failed to get stat for ${path}: ${error.message}`,
        "stat",
        path,
        error,
      );
    }
  },
};
