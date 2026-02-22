/**
 * File System Platform Interface
 *
 * Provides a unified interface for file system operations across different JavaScript runtimes
 * (Node.js, Bun, and Deno). All methods are asynchronous to ensure consistency across platforms.
 *
 * @module platform/fs
 * @since 2.0.0
 */

/**
 * Unified interface for file system operations across different JavaScript runtimes.
 *
 * This interface abstracts runtime-specific file system APIs to provide a consistent
 * API for Lesan core functionality. Implementations must handle platform-specific
 * differences in:
 * - Path resolution
 * - Error handling
 * - Permission systems
 * - Character encoding
 *
 * @interface FileSystemAdapter
 *
 * @example
 * ```typescript
 * const fs: FileSystemAdapter = getAdapter();
 *
 * // Read a configuration file
 * const config = await fs.readTextFile('./config.json');
 *
 * // Write output
 * await fs.writeTextFile('./output.txt', 'Hello, World!');
 *
 * // Ensure directory exists
 * await fs.ensureDir('./data/cache');
 * ```
 */
export interface FileSystemAdapter {
  /**
   * Reads the entire contents of a file as a UTF-8 encoded string.
   *
   * @param path - The path to the file to read (relative or absolute)
   * @returns A promise that resolves to the file contents as a string
   * @throws {Error} If the file does not exist, cannot be read, or permission is denied
   *
   * @example
   * ```typescript
   * const content = await fs.readTextFile('./config.json');
   * const config = JSON.parse(content);
   * ```
   */
  readTextFile(path: string): Promise<string>;

  /**
   * Writes a string to a file, creating the file if it doesn't exist and overwriting
   * if it does. The content is encoded as UTF-8.
   *
   * If the parent directory does not exist, implementations should create it recursively.
   *
   * @param path - The path to the file to write (relative or absolute)
   * @param content - The string content to write to the file
   * @returns A promise that resolves when the write operation is complete
   * @throws {Error} If the file cannot be written or permission is denied
   *
   * @example
   * ```typescript
   * const data = { name: 'Lesan', version: '2.0.0' };
   * await fs.writeTextFile('./config.json', JSON.stringify(data, null, 2));
   * ```
   */
  writeTextFile(path: string, content: string): Promise<void>;

  /**
   * Reads the entire contents of a file as binary data (Uint8Array).
   *
   * Use this method when working with non-text files such as images, PDFs,
   * or other binary formats.
   *
   * @param path - The path to the file to read (relative or absolute)
   * @returns A promise that resolves to the file contents as a Uint8Array
   * @throws {Error} If the file does not exist, cannot be read, or permission is denied
   *
   * @example
   * ```typescript
   * const imageData = await fs.readFile('./logo.png');
   * // Process binary data...
   * ```
   */
  readFile(path: string): Promise<Uint8Array>;

  /**
   * Writes binary data to a file, creating the file if it doesn't exist and
   * overwriting if it does.
   *
   * If the parent directory does not exist, implementations should create it recursively.
   *
   * @param path - The path to the file to write (relative or absolute)
   * @param data - The binary data to write as a Uint8Array
   * @returns A promise that resolves when the write operation is complete
   * @throws {Error} If the file cannot be written or permission is denied
   *
   * @example
   * ```typescript
   * const imageData = new Uint8Array([...]); // Binary data
   * await fs.writeFile('./output.png', imageData);
   * ```
   */
  writeFile(path: string, data: Uint8Array): Promise<void>;

  /**
   * Ensures that a directory exists, creating it and any necessary parent directories
   * if they don't exist. Similar to `mkdir -p` in Unix systems.
   *
   * If the directory already exists, this method should succeed without error.
   *
   * @param path - The path to the directory to create (relative or absolute)
   * @returns A promise that resolves when the directory is ensured to exist
   * @throws {Error} If the directory cannot be created or permission is denied
   *
   * @example
   * ```typescript
   * // Create nested directories
   * await fs.ensureDir('./data/cache/temp');
   *
   * // Now safe to write files in this directory
   * await fs.writeTextFile('./data/cache/temp/file.txt', 'content');
   * ```
   */
  ensureDir(path: string): Promise<void>;

  /**
   * Returns the current working directory of the process.
   *
   * This is the directory from which relative paths are resolved.
   * Equivalent to `pwd` in Unix systems or `cd` without arguments in Windows.
   *
   * @returns The absolute path of the current working directory
   *
   * @example
   * ```typescript
   * const cwd = fs.getCwd();
   * console.log(`Running from: ${cwd}`);
   * // Running from: /home/user/projects/lesan
   * ```
   */
  getCwd(): string;

  /**
   * Checks whether a file or directory exists at the specified path.
   *
   * Note: This method should not throw errors for permission issues.
   * Instead, it should return `false` if the path cannot be accessed.
   *
   * @param path - The path to check (relative or absolute)
   * @returns A promise that resolves to `true` if the path exists, `false` otherwise
   *
   * @example
   * ```typescript
   * if (await fs.exists('./config.json')) {
   *   const config = await fs.readTextFile('./config.json');
   * } else {
   *   console.log('Config file not found');
   * }
   * ```
   */
  exists(path: string): Promise<boolean>;

  /**
   * Reads the contents of a directory and returns an array of entry names.
   *
   * The returned array contains only the names of the entries (files and directories),
   * not full paths. The entries are not guaranteed to be in any particular order.
   *
   * Special directory entries like "." and ".." should not be included in the result.
   *
   * @param path - The path to the directory to read (relative or absolute)
   * @returns A promise that resolves to an array of entry names in the directory
   * @throws {Error} If the directory does not exist, cannot be read, or is not a directory
   *
   * @example
   * ```typescript
   * const entries = await fs.readDir('./src');
   * console.log(entries); // ['index.ts', 'utils', 'models', ...]
   *
   * // Filter only TypeScript files
   * const tsFiles = entries.filter(name => name.endsWith('.ts'));
   * ```
   */
  readDir(path: string): Promise<string[]>;

  /**
   * Removes a file or empty directory at the specified path.
   *
   * If the path points to a directory, it must be empty. Use `removeAll()` to
   * recursively remove directories with content.
   *
   * @param path - The path to the file or empty directory to remove
   * @returns A promise that resolves when the removal is complete
   * @throws {Error} If the path does not exist, cannot be removed, or directory is not empty
   *
   * @example
   * ```typescript
   * // Remove a file
   * await fs.remove('./temp.txt');
   *
   * // Remove an empty directory
   * await fs.remove('./empty-dir');
   * ```
   */
  remove(path: string): Promise<void>;

  /**
   * Recursively removes a file or directory and all its contents.
   * Similar to `rm -rf` in Unix systems.
   *
   * **Use with caution**: This operation is irreversible and will delete
   * all files and subdirectories without confirmation.
   *
   * If the path does not exist, this method should succeed without error.
   *
   * @param path - The path to the file or directory to remove recursively
   * @returns A promise that resolves when the removal is complete
   * @throws {Error} If the removal fails due to permissions or other errors
   *
   * @example
   * ```typescript
   * // Remove a directory and all its contents
   * await fs.removeAll('./temp-dir');
   *
   * // Remove build artifacts
   * await fs.removeAll('./dist');
   * ```
   */
  removeAll(path: string): Promise<void>;

  /**
   * Gets information about a file or directory at the specified path.
   *
   * @param path - The path to the file or directory
   * @returns A promise that resolves to file/directory information
   * @throws {Error} If the path does not exist or cannot be accessed
   *
   * @example
   * ```typescript
   * const info = await fs.stat('./config.json');
   * console.log(`File size: ${info.size} bytes`);
   * console.log(`Is directory: ${info.isDirectory}`);
   * console.log(`Modified: ${info.mtime}`);
   * ```
   */
  stat(path: string): Promise<FileInfo>;
}

/**
 * Information about a file or directory.
 *
 * @interface FileInfo
 */
export interface FileInfo {
  /**
   * Whether this entry is a file.
   */
  isFile: boolean;

  /**
   * Whether this entry is a directory.
   */
  isDirectory: boolean;

  /**
   * Whether this entry is a symbolic link.
   */
  isSymlink: boolean;

  /**
   * The size of the file in bytes.
   * For directories, this may be 0 or the size of the directory entry.
   */
  size: number;

  /**
   * The last modification time of the file/directory.
   */
  mtime: Date | null;

  /**
   * The last access time of the file/directory (may not be available on all platforms).
   */
  atime: Date | null;

  /**
   * The creation/birth time of the file/directory (may not be available on all platforms).
   */
  birthtime: Date | null;
}

/**
 * Error thrown when a file system operation fails.
 *
 * @class FileSystemError
 * @extends Error
 */
export class FileSystemError extends Error {
  /**
   * Creates a new FileSystemError.
   *
   * @param message - The error message
   * @param operation - The file system operation that failed (e.g., 'readFile', 'writeFile')
   * @param path - The path involved in the operation
   * @param cause - The underlying error that caused this error
   */
  constructor(
    message: string,
    public readonly operation: string,
    public readonly path: string,
    public override readonly cause?: Error,
  ) {
    super(message);
    this.name = "FileSystemError";

    // Maintains proper stack trace in V8 engines
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FileSystemError);
    }
  }
}

/**
 * Type guard to check if an error is a FileSystemError.
 *
 * @param error - The error to check
 * @returns True if the error is a FileSystemError
 *
 * @example
 * ```typescript
 * try {
 *   await fs.readTextFile('./missing.txt');
 * } catch (error) {
 *   if (isFileSystemError(error)) {
 *     console.log(`Failed to ${error.operation} at ${error.path}`);
 *   }
 * }
 * ```
 */
export function isFileSystemError(error: unknown): error is FileSystemError {
  return error instanceof FileSystemError;
}
