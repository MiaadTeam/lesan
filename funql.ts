import { parse } from "https://deno.land/std/flags/mod.ts";
import { ensureDir } from "https://deno.land/std/fs/mod.ts";
import { createStateSchema } from "./schemas/state.ts";
import { createUserSchema } from "./schemas/user.ts";

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
import { whatWants } from "./src/index.ts";

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
const dbContent = `
import { MongoClient } from "https://deno.land/x/mongo@v1.0.0/mod.ts";

const client = new MongoClient();
client.connectWithUri("mongodb://localhost:27017");

const db = client.database("lwob");

export default db;
`;

const checkWantsContent = `
import type { ServerRequest } from "https://deno.land/std@0.77.0/http/server.ts";
import { throwError } from "./throwErr.ts";
import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";

const v = new FastestValidator();
const check = v.compile({
  wants: {
    type: "object",
    props: {
      model: { type: "string", enum: ["User", "City"] },
      do: { type: "string" },
    },
  },
});

export interface body {
  wants: {
    model: "User" | "City";
    do: "create" | "get";
  };
}

export const whatWants = async (req: ServerRequest) => {
  if (req.headers.get("content-type") !== "application/json")
    throwError("your req body is incorrect");

  const decoder = new TextDecoder();
  const body = await Deno.readAll(req.body);
  const decodedBody = decoder.decode(body);
  const parsedBody: body = JSON.parse(decodedBody);

  const checkBody = (body: body) => {
    const isRight = check(body);
    return isRight === true
      ? isRight
      : throwError(\`\${isRight[0].message} but get \${isRight[0].actual}\`);
  };

  return req.method === "POST" && req.url === "/funql" && checkBody(parsedBody)
    ? parsedBody.wants
    : throwError("do not provide wants on body");
};
`;

const throwErrContent = `
export const throwError = (msg?: string) => {
  throw new Error(msg);
};
`;

const utilsIndexContent = `
export * from "./checkWants.ts";
export * from "./throwErr.ts";
`;

const srcIndex = `
export * from "./Utils/index.ts";
`;

const createProject = async (init: string | boolean) => {
  init === true ? (init = "funql") : (init = init);
  await ensureDir(`./${init}`);
  await Deno.writeTextFile(`./${init}/index.ts`, indexContent);
  await Deno.writeTextFile(`./${init}/scripts.json`, scriptJsonContent);
  await Deno.writeTextFile(`./${init}/db.ts`, dbContent);

  await ensureDir(`./${init}/.vscode`);
  await Deno.writeTextFile(`./${init}/.vscode/settings.json`, vscodeSetting);

  await ensureDir(`./${init}/src`);
  await Deno.writeTextFile(`./${init}/.index.ts`, srcIndex);

  await ensureDir(`./${init}/src/utils`);
  await Deno.writeTextFile(
    `./${init}/src/utils/checkWants.ts`,
    checkWantsContent
  );
  await Deno.writeTextFile(`./${init}/src/utils/throwErr.ts`, throwErrContent);
  await Deno.writeTextFile(`./${init}/src/utils/index.ts`, utilsIndexContent);

  await ensureDir(`./${init}/utils`);

  await createUserSchema(init as string);
  await createStateSchema(init as string);
};

args.init
  ? await createProject(args.init)
  : console.log("nothing can do for know");
