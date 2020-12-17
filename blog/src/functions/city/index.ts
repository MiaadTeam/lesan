import { ensureDir } from "https://deno.land/std@0.78.0/fs/ensure_dir.ts";
import { createFuncsIndexContent } from "./funcs/index.ts";

const content = `
export * from "./funcs/index.ts";
`;

export const createCityIndexContent = async (init: string) => {
  init = `${init}/city`;
  await ensureDir(init);

  await createFuncsIndexContent(init);

  await Deno.writeTextFile(`${init}/index.ts`, content);
};
