import { parse } from "https://deno.land/std/flags/mod.ts";
import { copy, ensureDir, exists } from "https://deno.land/std/fs/mod.ts";
import { createBlog } from "./blog/index.ts";
import "./config/mod.ts";
import { upgrade } from "./cli/mod.ts";
import { generateDeclarations } from "./declarations/mod.ts";
import { runHelp } from "./help.ts";
import { Application } from "https://deno.land/x/abc@v1.3.1/mod.ts";

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

const runPlayground = async () => {
  const app = new Application();
  const __dirname = new URL(".", import.meta.url).pathname;
  const buildFolder = `${__dirname}playground/build`;

  const play = await exists("./.play");

  play && (await Deno.remove("./.play", { recursive: true }));

  // await generatePlay();
  /**
   * Please remove log after debug
   * @author syd
   * Please remove log after debug
   */
  console.group();
  console.log();
  console.log("realPath, buildFolder ================== realPath,");
  console.log(buildFolder);
  console.log("END ------------------ END");
  console.log();
  console.groupEnd();

  await copy(buildFolder, "./.play");

  console.log(" Playgroud start at http://localhost:1366/ ");
  app
    .static("/", "./.play")
    .file("/", "./.play/index.html")
    .start({ port: 1366 });
};

args.init && (await createProject(args.init));
args.declaration && (await generateDeclarations(true, true));
args.playground && (await runPlayground());
args.help && (runHelp());

args.upgrade && (await upgrade(args.upgrade));
