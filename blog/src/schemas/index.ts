import { ensureDir } from "https://deno.land/std@0.78.0/fs/ensure_dir.ts";
import { createCategorySchema } from "./category.ts";
import { createCitySchema } from "./city.ts";
import { createCommentSchema } from "./comment.ts";
import { createCountrySchema } from "./country.ts";
import { createStateSchema } from "./state.ts";
import { createUserSchema } from "./user.ts";
import { createUtilsIndexContent } from "./utils/index.ts";

const content = `
export * from "./utils/index.ts";
export * from "./category.ts";
export * from "./city.ts";
export * from "./state.ts";
export * from "./country.ts";
`;

export const createIndexSchema = async (init: string) => {
  init = `${init}/schemas`;
  await ensureDir(init);

  await createUtilsIndexContent(init);
  await createCategorySchema(init);
  await createCitySchema(init);
  await createCommentSchema(init);
  await createCountrySchema(init);
  await createStateSchema(init);
  await createUserSchema(init);

  await Deno.writeTextFile(`${init}/index.ts`, content);
};
