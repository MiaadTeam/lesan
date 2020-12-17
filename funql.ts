import { parse } from "https://deno.land/std/flags/mod.ts";
import { ensureDir } from "https://deno.land/std/fs/mod.ts";
import { createBlog } from "./blog/index.ts";

const args = parse(Deno.args);

const createProject = async (init: string | boolean) => {
  init === true ? (init = "funql") : (init = init);
  await ensureDir(`./${init}`);
  await createBlog(`./${init}`);
};

args.init
  ? await createProject(args.init)
  : console.log("nothing can do for know");
