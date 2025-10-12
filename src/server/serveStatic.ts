import { serveFile } from "../deps.ts";
import { Services } from "../mod.ts";
import { TSchemas } from "../models/mod.ts";
import { throwError } from "../utils/throwError.ts";
import { addCors } from "./cors.ts";
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
    const origin = req.headers.get("origin");

    return new Response(fileResponse.body, {
      status: fileResponse.status,
      statusText: fileResponse.statusText,
      headers: {
        ...fileResponse.headers,
        ...addCors(
          "*",
          origin,
          fileResponse.headers.get("Content-Type") || undefined,
        ),
      },
    });
  } else {
    return throwError("can not serve this path");
  }
};

const getSchemas = (schemasObj: TSchemas, actsObj: Services, req: Request) => {
  const origin = req.headers.get("origin");
  const corsHeaders = addCors("*", origin, "application/json");
  return new Response(JSON.stringify({ schemas: schemasObj, acts: actsObj }), {
    headers: corsHeaders,
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
    ? getSchemas(schemasObj, actsObj, req)
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
    const origin = req.headers.get("origin");
    const contentType = req.headers.get("content-type") || "application/json";
    const corsHeaders = addCors("*", origin, contentType);
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  return playground && url.pathname === "/playground"
    ? runPlayground(url)
    : await checkStaticPath(req, url, staticPath, schemasObj, actsObj);
};
