import { Services } from "../mod.ts";
import { ISchema } from "../models/mod.ts";
import {
  getClientReact,
  getCSSFile,
  getJSFile,
  runPlayground,
} from "./playground/mod.tsx";

const getSchemas = (schemasObj: ISchema, actsObj: Services) => {
  return new Response(
    JSON.stringify({ schemas: schemasObj, acts: actsObj }),
    {
      headers: { "content-type": "application/json" },
    },
  );
};
const checkStaticPath = async (
  url: URL,
  staticPath: string[],
  schemasObj: ISchema,
  actsObj: Services,
) => {
  return url.pathname === `/playground/static/client.js`
    ? await getClientReact()
    : url.pathname === `/playground/static/index.css`
    ? await getCSSFile()
    : url.pathname === `/playground/static/bundle.js`
    ? await getJSFile()
    : url.pathname === `/playground/static/get/schemas`
    ? getSchemas(schemasObj, actsObj)
    : new Response(
      `please implement staticPath: ${staticPath} ---- for getting playground please goto: ${url.origin}/playground`,
    );
};

export const serveStatic = async (
  request: Request,
  schemasObj: ISchema,
  actsObj: Services,
  playground: boolean,
  staticPath: string[],
) => {
  const url = new URL(request.url);
  return playground && url.pathname === "/playground"
    ? await runPlayground(url)
    : await checkStaticPath(url, staticPath, schemasObj, actsObj);
};
