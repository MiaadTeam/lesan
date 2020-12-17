import { ensureDir } from "https://deno.land/std/fs/mod.ts";
import { createFunctionsIndex } from "./functions/index.ts";
import { createIndexSchema } from "./schemas/index.ts";
import { createUtilsIndex } from "./utils/index.ts";

const content = `
export * from "./functions/index.ts";
export * from "./schemas/index.ts";
export * from "./utils/index.ts";
`;

export const createSrc = async (init: string) => {
  init = `${init}/src`;
  await ensureDir(init);

  await createFunctionsIndex(init);
  await createIndexSchema(init);
  await createUtilsIndex(init);

  await Deno.writeTextFile(`${init}/index.ts`, content);
};
