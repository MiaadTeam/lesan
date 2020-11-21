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

const userSchemaContent = `
import db from "../db.ts";
import type { City, RCity } from "./City.ts";
import type { RState, State } from "./State.ts";
import type { Country, RCountry } from "./Country.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.12.1/ts/types.ts";

export enum Gender {
  Male = "Male",
  Female = "Female",
}

export enum Level {
  Normal = "Normal",
  Editor = "Editor",
  Admin = "Admin",
  Ghost = "Ghost",
}

export interface User {
  _id: ObjectId;
  name: string;
  family: string;
  phone: number;
  gender: Gender;
  birthDate: Date;
  postalCode: string;
  address: {
    country: Country;
    state: State;
    city: City;
    text: string;
  };
  level: Level[];
  email?: string;
  password?: string;
  isActive?: boolean;
}

export interface RUser {
  _id: 0 | 1;
  name?: 0 | 1;
  family?: 0 | 1;
  phone?: 0 | 1;
  gender?: 0 | 1;
  birthDate?: 0 | 1;
  postalCode?: 0 | 1;
  address?: {
    country?: RCountry;
    state?: RState;
    city?: RCity;
    text?: 0 | 1;
  };
  level?: 0 | 1;
  email?: 0 | 1;
  password?: 0 | 1;
  isActive?: 0 | 1;
}

export const users = db.collection<User>("Users");
`;

const stateSchemaContent = `
import { ObjectId } from "https://deno.land/x/mongo@v0.12.1/ts/types.ts";
import db from "../db.ts";
import { RCity } from "./City.ts";
import type { Country, RCountry } from "./Country.ts";

export interface State {
  _id: ObjectId;
  name: string;
  enName: string;
  country: Country;
}

export interface RState {
  _id?: 0 | 1;
  name?: 0 | 1;
  enName?: 0 | 1;
  cities?: RCity;
  country?: RCountry;
}

export const states = db.collection<State>("States");
`;

const createProject = async (init: string | boolean) => {
  init === true ? (init = "funql") : (init = init);
  await ensureDir(`./${init}`);
  await Deno.writeTextFile(`./${init}/index.ts`, indexContent);
  await Deno.writeTextFile(`./${init}/scripts.json`, scriptJsonContent);

  await ensureDir(`./${init}/.vscode`);
  await Deno.writeTextFile(`./${init}/.vscode/settings.json`, vscodeSetting);

  await ensureDir(`./${init}/src`);
  await ensureDir(`./${init}/src/utils`);
  await ensureDir(`./${init}/utils`);

  await ensureDir(`./${init}/schemas`);
  await Deno.writeTextFile(`./${init}/schemas/user.ts`, userSchemaContent);
  await Deno.writeTextFile(`./${init}/schemas/state.ts`, stateSchemaContent);
};

args.init
  ? await createProject(args.init)
  : console.log("nothing can do for know");
