import { test as nodeTest } from "node:test";

export interface TestOptions {
  name: string;
  fn: () => void | Promise<void>;
  ignore?: boolean;
  only?: boolean;
}

export function test(
  nameOrOptions: string | TestOptions,
  fn?: () => void | Promise<void>,
) {
  let name: string;
  let testFn: () => void | Promise<void>;
  let ignore = false;
  let only = false;

  if (typeof nameOrOptions === "string") {
    name = nameOrOptions;
    if (!fn) throw new Error("Test function is required");
    testFn = fn;
  } else {
    name = nameOrOptions.name;
    testFn = nameOrOptions.fn;
    ignore = nameOrOptions.ignore || false;
    only = nameOrOptions.only || false;
  }

  // Deno
  // @ts-ignore - Deno might not be defined in Node.js/Bun
  if (typeof Deno !== "undefined" && Deno.test) {
    // @ts-ignore
    Deno.test({
      name,
      fn: testFn,
      ignore,
      only,
      sanitizeOps: false,
      sanitizeResources: false,
    });
    return;
  }

  // Bun
  // @ts-ignore - Bun might not be defined in Node.js/Deno
  if (typeof Bun !== "undefined") {
    // Hide require from bundlers by using a variable
    const moduleName = "bun:test";
    // @ts-ignore
    const bunTestModule = typeof require !== "undefined"
      ? require(moduleName)
      // @ts-ignore
      : (import.meta as any).require(moduleName);
    const bunTest = bunTestModule.test;

    if (ignore) {
      bunTest.skip(name, testFn);
    } else if (only) {
      bunTest.only(name, testFn);
    } else {
      bunTest(name, testFn);
    }
    return;
  }

  // Node.js (and fallback for Bun if not running via `bun test`)
  nodeTest(name, { skip: ignore, only }, testFn);
}
