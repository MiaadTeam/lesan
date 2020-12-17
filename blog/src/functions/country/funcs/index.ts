import { ensureDir } from "https://deno.land/std@0.78.0/fs/ensure_dir.ts";
import { createGetCountriesSchema } from "./getCountries.ts";
import { createGetCountryContent } from "./getCountry.ts";

const content = `
export * from "./getCountry.ts";
export * from "./getCountries.ts";
`;

export const createFuncsIndexContent = async (init: string) => {
  init = `${init}/funcs`;
  await ensureDir(init);

  await createGetCountriesSchema(init);
  await createGetCountryContent(init);

  await Deno.writeTextFile(`${init}/index.ts`, content);
};
