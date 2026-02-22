import { defineConfig } from "tsup";

export default defineConfig({
  // The entry point(s) for the build
  entry: {
    index: "src/mod.ts",
  },

  // Output formats: ECMAScript Modules and CommonJS
  format: ["esm", "cjs"],

  // Generate TypeScript declaration files (.d.ts and .d.cts)
  dts: true,

  // Clean the output directory before each build
  clean: true,

  // Target environment (matches tsconfig.json)
  target: "es2022",

  // Generate source maps for debugging
  sourcemap: true,

  // Disable code splitting for a single-file output per format (or keep it simple)
  splitting: false,

  // Don't minify the library code (consumers will minify their own apps)
  minify: false,

  // External dependencies that shouldn't be bundled
  external: [
    "mongodb",
    "superstruct",
  ],
});
