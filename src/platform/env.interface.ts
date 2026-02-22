/**
 * Environment Variables Platform Interface
 *
 * Provides a unified interface for environment variable operations across different
 * JavaScript runtimes (Node.js, Bun, and Deno). This interface abstracts runtime-specific
 * environment variable APIs.
 *
 * @module platform/env
 * @since 2.0.0
 */

/**
 * Unified interface for environment variable operations across different JavaScript runtimes.
 *
 * This interface abstracts runtime-specific environment variable APIs to provide a consistent
 * API for Lesan core functionality. Implementations must handle platform-specific differences in:
 * - Environment variable access patterns
 * - Permission systems (particularly in Deno)
 * - Variable name case sensitivity
 * - Variable value types
 *
 * Environment variables are always strings or undefined. This interface does not perform
 * automatic type conversion - that should be handled by the calling code.
 *
 * @interface EnvironmentAdapter
 *
 * @example
 * ```typescript
 * const env: EnvironmentAdapter = getAdapter();
 *
 * // Get an environment variable
 * const dbUrl = env.get('DATABASE_URL');
 *
 * // Get with default value
 * const port = env.get('PORT') ?? '8000';
 *
 * // Check if variable exists
 * if (env.has('NODE_ENV')) {
 *   console.log('Running in:', env.get('NODE_ENV'));
 * }
 * ```
 */
export interface EnvironmentAdapter {
  /**
   * Gets the value of an environment variable.
   *
   * Returns `undefined` if the variable is not set. Empty strings are valid values
   * and will be returned as-is (not converted to undefined).
   *
   * @param key - The name of the environment variable (case-sensitive on most platforms)
   * @returns The value of the environment variable as a string, or undefined if not set
   * @throws {EnvironmentError} If access to environment variables is denied (e.g., Deno permissions)
   *
   * @example
   * ```typescript
   * const nodeEnv = env.get('NODE_ENV');
   * if (nodeEnv === 'production') {
   *   console.log('Running in production mode');
   * }
   *
   * // Handle missing variables
   * const apiKey = env.get('API_KEY');
   * if (!apiKey) {
   *   throw new Error('API_KEY environment variable is required');
   * }
   * ```
   */
  get(key: string): string | undefined;

  /**
   * Sets or updates an environment variable.
   *
   * This operation modifies the environment for the current process only.
   * Changes do not persist beyond the process lifetime and do not affect
   * the parent process or other processes.
   *
   * Note: Some runtimes or deployment environments may restrict environment
   * variable modifications. Check runtime-specific documentation.
   *
   * @param key - The name of the environment variable to set
   * @param value - The value to set (will be converted to string)
   * @throws {EnvironmentError} If the operation fails or is not permitted
   *
   * @example
   * ```typescript
   * // Set a new variable
   * env.set('LOG_LEVEL', 'debug');
   *
   * // Update existing variable
   * env.set('NODE_ENV', 'development');
   *
   * // Set numeric values (converted to string)
   * env.set('PORT', '3000');
   * ```
   */
  set(key: string, value: string): void;

  /**
   * Checks whether an environment variable exists.
   *
   * Returns `true` if the variable is set, even if its value is an empty string.
   * Returns `false` only if the variable is not defined at all.
   *
   * This is useful for distinguishing between unset variables and variables
   * set to empty strings.
   *
   * @param key - The name of the environment variable to check
   * @returns True if the environment variable exists (even if empty), false otherwise
   * @throws {EnvironmentError} If access to environment variables is denied
   *
   * @example
   * ```typescript
   * // Check before using
   * if (env.has('DEBUG')) {
   *   const debug = env.get('DEBUG');
   *   console.log('Debug mode:', debug);
   * }
   *
   * // Distinguish between unset and empty
   * if (env.has('API_KEY')) {
   *   const apiKey = env.get('API_KEY');
   *   if (apiKey === '') {
   *     console.warn('API_KEY is set but empty');
   *   }
   * } else {
   *   console.error('API_KEY is not set');
   * }
   * ```
   */
  has(key: string): boolean;

  /**
   * Deletes an environment variable.
   *
   * Removes the variable from the current process environment. After deletion,
   * `get()` will return `undefined` and `has()` will return `false` for this variable.
   *
   * If the variable doesn't exist, this method succeeds silently (no error).
   *
   * @param key - The name of the environment variable to delete
   * @throws {EnvironmentError} If the operation fails or is not permitted
   *
   * @example
   * ```typescript
   * // Remove a temporary variable
   * env.delete('TEMP_TOKEN');
   *
   * // Cleanup after use
   * env.delete('ONE_TIME_PASSWORD');
   * ```
   */
  delete(key: string): void;

  /**
   * Gets all environment variables as a plain object.
   *
   * Returns a snapshot of all environment variables at the time of the call.
   * Modifications to the returned object do not affect the actual environment.
   *
   * **Security Warning**: Be careful when logging or exposing this object as it
   * may contain sensitive information like API keys, passwords, and tokens.
   *
   * @returns An object containing all environment variables as key-value pairs
   * @throws {EnvironmentError} If access to environment variables is denied
   *
   * @example
   * ```typescript
   * // Get all variables
   * const allVars = env.toObject();
   * console.log('Environment variables:', Object.keys(allVars).length);
   *
   * // Filter for specific prefix
   * const appVars = Object.entries(allVars)
   *   .filter(([key]) => key.startsWith('APP_'))
   *   .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
   * ```
   */
  toObject(): Record<string, string>;

  /**
   * Gets an environment variable as a boolean value.
   *
   * Convenience method that converts string values to boolean:
   * - `true`, `1`, `yes`, `on` (case-insensitive) → `true`
   * - `false`, `0`, `no`, `off` (case-insensitive) → `false`
   * - Empty string or undefined → `defaultValue`
   * - Any other value → `defaultValue`
   *
   * @param key - The name of the environment variable
   * @param defaultValue - The default value to return if variable is not set or invalid
   * @returns The boolean value of the environment variable
   *
   * @example
   * ```typescript
   * // Check feature flags
   * const debugMode = env.getBoolean('DEBUG', false);
   * const enableCache = env.getBoolean('ENABLE_CACHE', true);
   *
   * if (debugMode) {
   *   console.log('Debug mode enabled');
   * }
   * ```
   */
  getBoolean(key: string, defaultValue?: boolean): boolean;

  /**
   * Gets an environment variable as a number.
   *
   * Convenience method that parses string values as numbers:
   * - Valid numeric strings → parsed number
   * - Invalid or missing values → `defaultValue`
   * - NaN results → `defaultValue`
   *
   * @param key - The name of the environment variable
   * @param defaultValue - The default value to return if variable is not set or invalid
   * @returns The numeric value of the environment variable
   *
   * @example
   * ```typescript
   * // Parse port number
   * const port = env.getNumber('PORT', 8000);
   *
   * // Parse timeout
   * const timeout = env.getNumber('TIMEOUT', 5000);
   *
   * console.log(`Server will start on port ${port}`);
   * ```
   */
  getNumber(key: string, defaultValue?: number): number;

  /**
   * Gets an environment variable as an array by splitting on a delimiter.
   *
   * Convenience method that splits string values into arrays:
   * - Non-empty strings → split by delimiter and trimmed
   * - Empty string or undefined → empty array or defaultValue
   *
   * @param key - The name of the environment variable
   * @param delimiter - The delimiter to split on (default: ',')
   * @param defaultValue - The default value to return if variable is not set
   * @returns The array of strings
   *
   * @example
   * ```typescript
   * // Parse comma-separated list
   * const allowedOrigins = env.getArray('CORS_ORIGINS', ',');
   * // CORS_ORIGINS="http://localhost:3000,https://example.com"
   * // Result: ['http://localhost:3000', 'https://example.com']
   *
   * // Parse space-separated list
   * const features = env.getArray('FEATURES', ' ');
   * // FEATURES="auth logging metrics"
   * // Result: ['auth', 'logging', 'metrics']
   * ```
   */
  getArray(key: string, delimiter?: string, defaultValue?: string[]): string[];

  /**
   * Gets a required environment variable or throws an error.
   *
   * Convenience method for mandatory environment variables. If the variable
   * is not set or is an empty string, throws an EnvironmentError.
   *
   * @param key - The name of the environment variable
   * @returns The value of the environment variable
   * @throws {EnvironmentError} If the variable is not set or is empty
   *
   * @example
   * ```typescript
   * // Require critical configuration
   * const databaseUrl = env.require('DATABASE_URL');
   * const apiKey = env.require('API_KEY');
   *
   * // This will throw if JWT_SECRET is not set
   * const jwtSecret = env.require('JWT_SECRET');
   * ```
   */
  require(key: string): string;
}

/**
 * Error thrown when an environment variable operation fails.
 *
 * @class EnvironmentError
 * @extends Error
 */
export class EnvironmentError extends Error {
  /**
   * Creates a new EnvironmentError.
   *
   * @param message - The error message
   * @param key - The environment variable key involved in the operation
   * @param operation - The operation that failed (e.g., 'get', 'set', 'require')
   * @param cause - The underlying error that caused this error
   */
  constructor(
    message: string,
    public readonly key: string,
    public readonly operation: string,
    public override readonly cause?: Error,
  ) {
    super(message);
    this.name = "EnvironmentError";

    // Maintains proper stack trace in V8 engines
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, EnvironmentError);
    }
  }
}

/**
 * Type guard to check if an error is an EnvironmentError.
 *
 * @param error - The error to check
 * @returns True if the error is an EnvironmentError
 *
 * @example
 * ```typescript
 * try {
 *   const apiKey = env.require('API_KEY');
 * } catch (error) {
 *   if (isEnvironmentError(error)) {
 *     console.error(`Missing environment variable: ${error.key}`);
 *     console.error(`Operation: ${error.operation}`);
 *   }
 * }
 * ```
 */
export function isEnvironmentError(error: unknown): error is EnvironmentError {
  return error instanceof EnvironmentError;
}

/**
 * Helper function to parse boolean-like environment variable values.
 *
 * @param value - The string value to parse
 * @param defaultValue - The default value if parsing fails
 * @returns The parsed boolean value
 *
 * @example
 * ```typescript
 * parseBoolean('true');    // true
 * parseBoolean('1');       // true
 * parseBoolean('yes');     // true
 * parseBoolean('false');   // false
 * parseBoolean('0');       // false
 * parseBoolean('no');      // false
 * parseBoolean('invalid'); // false (defaultValue)
 * ```
 */
export function parseBoolean(
  value: string | undefined,
  defaultValue = false,
): boolean {
  if (!value) return defaultValue;

  const normalized = value.toLowerCase().trim();
  const truthyValues = ["true", "1", "yes", "on"];
  const falsyValues = ["false", "0", "no", "off"];

  if (truthyValues.includes(normalized)) return true;
  if (falsyValues.includes(normalized)) return false;

  return defaultValue;
}

/**
 * Helper function to parse numeric environment variable values.
 *
 * @param value - The string value to parse
 * @param defaultValue - The default value if parsing fails
 * @returns The parsed numeric value
 *
 * @example
 * ```typescript
 * parseNumber('3000');      // 3000
 * parseNumber('3.14');      // 3.14
 * parseNumber('invalid');   // 0 (defaultValue)
 * parseNumber('', 8000);    // 8000
 * ```
 */
export function parseNumber(
  value: string | undefined,
  defaultValue = 0,
): number {
  if (!value) return defaultValue;

  const parsed = Number(value);
  return isNaN(parsed) ? defaultValue : parsed;
}

/**
 * Helper function to parse array-like environment variable values.
 *
 * @param value - The string value to parse
 * @param delimiter - The delimiter to split on
 * @param defaultValue - The default value if parsing fails
 * @returns The parsed array of strings
 *
 * @example
 * ```typescript
 * parseArray('a,b,c', ',');           // ['a', 'b', 'c']
 * parseArray('a, b, c', ',');         // ['a', 'b', 'c'] (trimmed)
 * parseArray('x:y:z', ':');           // ['x', 'y', 'z']
 * parseArray('', ',');                // []
 * parseArray(undefined, ',', ['default']); // ['default']
 * ```
 */
export function parseArray(
  value: string | undefined,
  delimiter = ",",
  defaultValue: string[] = [],
): string[] {
  if (!value) return defaultValue;

  return value
    .split(delimiter)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}
