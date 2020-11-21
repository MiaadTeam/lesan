import { parse } from "https://deno.land/std/flags/mod.ts";
import { ensureDir } from "https://deno.land/std/fs/mod.ts";

const args = parse(Deno.args);

const vscodeSetting = `
{
  "deno.enable": true,
  "deno.import_intellisense_origins": {
    "https://deno.land": true
  }
}
`;

const indexContent = `
import { serve } from "https://deno.land/std/http/server.ts";
import { whatWants } from "./src/utils/index.ts";

const s = serve({ port: 8000 });
console.log("http://localhost:8000/");
for await (const req of s) {
  try {
    const wants = await whatWants(req);
    switch (wants.model) {
      case "User":
        break;

      default:
        break;
    }
    // req.respond({ body: "Hello World\n" });
  } catch (error) {
    req.respond({
      body: error.message || "nothing ...",
    });
  }
}
`;

const scriptJsonContent = `
{
  "$schema": "https://deno.land/x/denon/schema.json",
  "scripts": {
    "start": {
      "cmd": "deno run index.ts",
      "desc": "run my app.ts file",
      "allow": ["plugin", "net", "read", "write", "env"],
      "unstable": true,
      "watch": true
    }
  },
  "watcher": {
    "interval": 350,
    "match": ["./src/**/*.ts", "./index.ts", "./scripts.json"],
    "skip": ["*/.git/*"],
    "legacy": false
  },
  "logger": {
    "debug": true,
    "fullscreen": true
  }
}
`;

const createProject = async (init: string | boolean) => {
  init === true ? (init = "funql") : (init = init);
  await ensureDir(`./${init}`);
  await ensureDir(`./${init}/src`);
  await ensureDir(`./${init}/src/utils`);
  await ensureDir(`./${init}/utils`);
  await ensureDir(`./${init}/schemas`);
  await Deno.writeTextFile(`./${init}/index.ts`, indexContent);
  await Deno.writeTextFile(`./${init}/scripts.json`, scriptJsonContent);
  await Deno.writeTextFile(`./${init}/.vscode/settings.json`, vscodeSetting);
};

args.init ? await createProject(args.init) : console.log("nothing can do know");
