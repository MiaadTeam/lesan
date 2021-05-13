import { parse } from "https://deno.land/std/flags/mod.ts";
import { ensureDir } from "https://deno.land/std/fs/mod.ts";
import { createBlog } from "./blog/index.ts";
import { getDeclarations } from "./declarations/mod.ts";
import "./config/mod.ts";
import { upgrade } from "./cli/mod.ts";
import { log } from "./deps.ts";

export interface CommandArgs {
  init?: boolean | string;
  declaration?: boolean;
  upgrade?: string;
  _: (string | number)[];
}

const args: CommandArgs = parse(Deno.args);

const createProject = async (init: string | boolean) => {
  init === true && (init = "funql");
  await ensureDir(`./${init}`);
  await createBlog(`./${init}`);
};
log.info(args._);

args.init && (await createProject(args.init));
args.declaration && (await getDeclarations());

args.upgrade && (await upgrade(args.upgrade));
