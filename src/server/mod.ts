import { Services } from "../acts/mod.ts";
import { serve } from "../deps.ts";
import { TSchemas } from "../models/mod.ts";
import { generateSchemTypes } from "../types/mod.ts";
import { lesanFns } from "../utils/mod.ts";
import { addCors, addCorsObj } from "./cors.ts";
import { serveStatic } from "./serveStatic.ts";

function replacer(key: any, value: any) {
  if (typeof value === "string") {
    return value.replace(/"/g, "").replace(/,/g, ", ").replace(/:/g, ": ");
  } else {
    return value;
  }
}
/**
 * this function is for run Server and get request of client and send response of request for client
 *  @param port - port of listen
 *  @param playground - use playground or not?
 * @param db - connection of DB
 * @param typeGeneration -
 */

export const lesanServer = (schemasObj: TSchemas, actsObj: Services) => {
  const runServer = async ({
    port,
    playground,
    typeGeneration,
    staticPath,
    cors,
  }: {
    port: number;
    playground: boolean;
    typeGeneration: boolean;
    staticPath?: string[];
    cors?: "*" | string[];
  } = {
    port: 8000,
    playground: false,
    typeGeneration: false,
    staticPath: [],
  }) => {
    typeGeneration && (await generateSchemTypes(schemasObj));
    const handler = async (request: Request): Promise<Response> => {
      try {
        if (request.method === "OPTIONS") {
          if (cors) {
            return new Response(undefined, {
              headers: addCors(cors, request.headers.get("origin")),
            });
          }
        }

        return request.method === "GET"
          ? await serveStatic(
            request,
            schemasObj,
            actsObj,
            playground,
            staticPath || [],
          )
          : await lesanFns(actsObj).serveLesan(request, port, cors);
      } catch (e) {
        let headers = {
          "Content-Type": "application/json",
        };
        headers = {
          ...addCorsObj(cors, request.headers.get("origin")),
          ...headers,
        };

        return new Response(
          JSON.stringify({
            body: {
              message: e.message ||
                "We do not know anything about the issue!!! sorry",
            },
            success: false,
          }, replacer),
          {
            status: e.status || 501,
            headers,
          },
        );
      }
    };

    console.log(
      `HTTP webserver running.
please send a post request to http://localhost:${port}/lesan
${
        playground
          ? "you can visit playground on http://localhost:" + port +
            "/playground"
          : ""
      }\n`,
    );
    await serve(handler, { port });
    // playground && runPlayground();
  };
  return runServer;
};
