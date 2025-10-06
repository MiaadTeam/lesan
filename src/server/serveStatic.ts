import { serveFile } from "../deps.ts";
import { Services } from "../mod.ts";
import { TSchemas } from "../models/mod.ts";
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
    const isInPath = staticPath.some((path) => url.pathname.startsWith(path));
    return isInPath;
  };
  if (checkPath()) {
    // Get the original response from serveFile
    const fileResponse = await serveFile(
      req,
      `${Deno.cwd()}${decodeURIComponent(url.pathname)}`,
    );

    // Create a new response with CORS headers
    const headers = new Headers(fileResponse.headers);
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set(
      "Access-Control-Allow-Methods",
      "GET, HEAD, PUT, POST, DELETE, OPTIONS",
    );
    headers.set("Access-Control-Allow-Headers", "*");
    headers.set("Access-Control-Max-Age", "86400"); // 24 hours

    return new Response(fileResponse.body, {
      status: fileResponse.status,
      statusText: fileResponse.statusText,
      headers: headers,
    });
  } else {
    return throwError("can not serve this path");
  }
};

const getSchemas = (schemasObj: TSchemas, actsObj: Services) => {
  return new Response(JSON.stringify({ schemas: schemasObj, acts: actsObj }), {
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, PUT, POST, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Max-Age": "86400", // 24 hours
    },
  });
};
const checkStaticPath = async (
  req: Request,
  url: URL,
  staticPath: string[],
  schemasObj: TSchemas,
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
  schemasObj: TSchemas,
  actsObj: Services,
  playground: boolean,
  staticPath: string[],
) => {
  const url = new URL(req.url);

  // Handle OPTIONS requests for CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, HEAD, PUT, POST, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Max-Age": "86400", // 24 hours
      },
    });
  }

  return playground && url.pathname === "/playground"
    ? runPlayground(url)
    : await checkStaticPath(req, url, staticPath, schemasObj, actsObj);
};
