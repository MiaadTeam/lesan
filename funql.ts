import { parse } from "https://deno.land/std/flags/mod.ts";
import { ensureDir } from "https://deno.land/std/fs/mod.ts";
import { createBlog } from "./blog/index.ts";
import { getDeclerations } from "./declerations/mod.ts";

const args = parse(Deno.args);

const createProject = async (init: string | boolean) => {
  init === true && (init = "funql");
  await ensureDir(`./${init}`);
  await createBlog(`./${init}`);
};

args.init &&
  await createProject(args.init);

args.dec && await getDeclerations();
