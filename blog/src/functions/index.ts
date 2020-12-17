import { ensureDir } from "https://deno.land/std@0.78.0/fs/ensure_dir.ts";
import { createCityIndexContent } from "./city/index.ts";
import { createCountryIndexContent } from "./country/index.ts";
import { createStateIndexContent } from "./state/index.ts";
import { createUsrIndexContent } from "./user/index.ts";

const content = `
export * from "./city/index.ts";
export * from "./country/index.ts";
export * from "./state/index.ts";
export * from "./user/index.ts";
`;

export const createFunctionsIndex = async (init: string) => {
  init = `${init}/functions`;
  await ensureDir(init);

  await createCityIndexContent(init);
  await createCountryIndexContent(init);
  await createStateIndexContent(init);
  await createUsrIndexContent(init);

  await Deno.writeTextFile(`${init}/index.ts`, content);
};
