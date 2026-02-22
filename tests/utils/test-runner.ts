import { test as nodeTest } from "node:test";

export function test(
  options: { name: string; fn: () => void | Promise<void> },
) {
  // @ts-ignore - Deno might not be defined in Node.js
  if (typeof Deno !== "undefined" && Deno.test) {
    // @ts-ignore
    Deno.test(options);
    // @ts-ignore - Bun might not be defined
  } else if (typeof Bun !== "undefined") {
    // @ts-ignore
    const { test: bunTest } = require("bun:test");
    bunTest(options.name, options.fn);
  } else {
    nodeTest(options.name, options.fn);
  }
}
