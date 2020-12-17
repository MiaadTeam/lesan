import { ensureDir } from "https://deno.land/std@0.78.0/fs/ensure_dir.ts";
import { createFieldTypeContent } from "./fieldType.ts";

const content = `
export * from "./fieldType.ts";
`;

export const createUtilsIndexContent = async (init: string) => {
  init = `${init}/utils`;
  await ensureDir(init);

  await createFieldTypeContent(init);

  await Deno.writeTextFile(`${init}/index.ts`, content);
};
