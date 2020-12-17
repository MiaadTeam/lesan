import { ensureDir } from "https://deno.land/std/fs/mod.ts";
import { createDb } from "./db.ts";
import { createRedis } from "./redis.ts";

const content = `
export * from "./db.ts";
export * from "./redis.ts";
`;

export const createConfig = async (init: string) => {
  init = `${init}/config`;
  await ensureDir(init);

  await createDb(init);
  await createRedis(init);

  await Deno.writeTextFile(`${init}/index.ts`, content);
};
