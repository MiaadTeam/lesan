export * from "https://deno.land/x/ts_morph@10.0.1/mod.ts";
export * from "https://deno.land/std/fs/mod.ts";
export * from "https://deno.land/std@0.96.0/fmt/colors.ts";
import * as l from "https://deno.land/std/log/mod.ts";
export const log = l;

import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
export const fv = new FastestValidator();
