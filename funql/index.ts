
import { serve } from "https://deno.land/std/http/server.ts";
import {
  CountryDoit,
  countryFns,
  UserDoit,
  usrFns,
} from "./src/functions/index.ts";
import { parsBody } from "./src/utils/index.ts";

const s = serve({ port: 8000 });
console.log("http://localhost:8000/");

type model = "User" | "State" | "City" | "Category" | "Country";

for await (const req of s) {
  try {
    const reqBody = await parsBody(req);
    const response: (
      { model, doit }: { model: model; doit: UserDoit | string },
      details: any
    ) => Promise<any> = async ({ model, doit }, details) =>
      ({
        ["User"]: async () => await usrFns(doit as UserDoit, details),
        ["Country"]: async () => await countryFns(doit as CountryDoit, details),
        ["State"]: () => ({ _id: "state" }),
        ["City"]: () => ({ _id: "city" }),
        ["Category"]: () => ({ _id: "category" }),
      }[model]());

    req.respond({
      body: JSON.stringify({
        success: true,
        body: await response(reqBody.wants, reqBody.details),
      }),
      status: 200,
    });
  } catch (error) {
    req.respond({
      body: JSON.stringify({
        success: false,
        body: error.message || "nothing ...",
      }),

      status: 500,
    });
  }
}
