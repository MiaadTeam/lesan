import { ensureDir } from "https://deno.land/std@0.78.0/fs/ensure_dir.ts";
import { createGetCitiesContent } from "./getCities.ts";

const content = `
export * from "./getCities.ts";
`;

export const createFuncsIndexContent = async (init: string) => {
  init = `${init}/funcs`;
  await ensureDir(init);

  await createGetCitiesContent(init);

  await Deno.writeTextFile(`${init}/index.ts`, content);
};
