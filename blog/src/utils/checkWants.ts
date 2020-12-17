const content = `
import type { ServerRequest } from "https://deno.land/std/http/server.ts";
import { throwError } from "./throwErr.ts";
import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";

const v = new FastestValidator();
const check = v.compile({
  wants: {
    type: "object",
    props: {
      model: {
        type: "enum",
        values: ["User", "City", "State", "Category", "Country"],
      },
    },
  },
});

export interface body {
  wants: {
    model: "User" | "City";
    doit: string;
  };
  details: any;
  select: any;
}

export const parsBody = async (req: ServerRequest) => {
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
    ? parsedBody
    : throwError("do not provide wants on body");
};
`;

export const createCheckWantsContent = async (init: string) => {
  await Deno.writeTextFile(`${init}/checkWants.ts`, content);
};
