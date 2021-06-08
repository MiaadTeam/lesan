import { parse } from "https://deno.land/std/flags/mod.ts";
import { ensureDir } from "https://deno.land/std/fs/mod.ts";
import { createBlog } from "./blog/index.ts";
import "./config/mod.ts";
import { upgrade } from "./cli/mod.ts";
import { generateDeclarations } from "./declarations/mod.ts";
import { exec } from "https://deno.land/x/exec/mod.ts";
import { runHelp } from "./help.ts";

export interface CommandArgs {
  init?: boolean | string;
  declaration?: boolean;
  upgrade?: string;
  _: (string | number)[];
  playground?: boolean;
  help?: boolean;
}

const args: CommandArgs = parse(Deno.args);

const createProject = async (init: string | boolean) => {
  init === true && (init = "funql");
  await ensureDir(`./${init}`);
  await createBlog(`./${init}`);
};

const __filename = new URL(".", import.meta.url).pathname;

const runPlayground = async () => {
  //   console.log(__filename, "sallam", Deno.cwd());
  //
  //   Deno.chdir(`${Deno.cwd()}/playground`);

  // Deno.run({
  //   cmd: ["npm", "run", "start"],
  //   // cmd: ["yarn", "start"],
  // });

  await exec("deno run -A playground.ts");
};

args.init && (await createProject(args.init));
args.declaration && (await generateDeclarations(true, true));
args.playground && (await runPlayground());
args.help && (runHelp());

args.upgrade && (await upgrade(args.upgrade));
