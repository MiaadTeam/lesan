import { createMakePagination } from './makePagination.ts';
import { ensureDir } from "https://deno.land/std@0.78.0/fs/ensure_dir.ts";
import { createCheckWantsContent } from "./checkWants.ts";
import { createPopulateMany } from "./populateMany.ts";
import { createRegCode } from "./regCode.ts";
import { createThrowError } from "./throwErr.ts";
import { createMakeProjections } from "./makeProjections.ts";

const content = `
export * from "./checkWants.ts";
export * from "./throwErr.ts";
export * from "./regCode.ts";
export * from "./populateMany.ts";
export * from "./makeProjections.ts";
`;

export const createUtilsIndex = async (init: string) => {
  init = `${init}/utils`;
  await ensureDir(init);
  await createCheckWantsContent(init);
  await createMakeProjections(init);
  await createPopulateMany(init);
  await createRegCode(init);
  await createThrowError(init);

  await createMakePagination(init);

  await Deno.writeTextFile(`${init}/index.ts`, content);
};
