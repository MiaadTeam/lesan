import { serveFile } from "https://deno.land/std@0.140.0/http/file_server.ts";
import { Services } from "../mod.ts";
import { ISchema } from "../models/mod.ts";
import { throwError } from "../utils/throwError.ts";
import {
  getClientReact,
  getCSSFile,
  getJSFile,
  runPlayground,
} from "./playground/mod.tsx";

const checkFiles = async (req: Request, staticPath: string[]) => {
  const url = new URL(req.url);
  const checkPath = () => {
    const isInPath = staticPath.some(path => url.pathname.startsWith(path));
    return isInPath;
  };
  return checkPath()
    ? await serveFile(req, `${Deno.cwd()}${url.pathname}`)
    : throwError("can not serve this path");
};

const getSchemas = (schemasObj: ISchema, actsObj: Services) => {
  return new Response(
    JSON.stringify({ schemas: schemasObj, acts: actsObj }),
    {
      headers: { "content-type": "application/json" },
    },
  );
};
const checkStaticPath = async (
  req: Request,
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
    : await checkFiles(req, staticPath);
};

export const serveStatic = async (
  req: Request,
  schemasObj: ISchema,
  actsObj: Services,
  playground: boolean,
  staticPath: string[],
) => {
  const url = new URL(req.url);
  return playground && url.pathname === "/playground"
    ? await runPlayground(url)
    : await checkStaticPath(req, url, staticPath, schemasObj, actsObj);
};
