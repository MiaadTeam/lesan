import { ensureDir } from "https://deno.land/std@0.78.0/fs/ensure_dir.ts";
import { createGetStatesContent } from "./getStates.ts";

const content = `
export * from "./getStates.ts";
`;

export const createFuncsIndexContent = async (init: string) => {
  init = `${init}/funcs`;
  await ensureDir(init);

  await createGetStatesContent(init);

  await Deno.writeTextFile(`${init}/index.ts`, content);
};
