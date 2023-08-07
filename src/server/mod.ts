import { Services } from "../acts/mod.ts";
import { serve } from "../deps.ts";
import { TSchemas } from "../models/mod.ts";
import { generateSchemTypes } from "../types/mod.ts";
import { lesanFns } from "../utils/mod.ts";
import { addCors, addCorsObj } from "./cors.ts";
import { serveStatic } from "./serveStatic.ts";

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
  }: {
    port: number;
    playground: boolean;
    typeGeneration: boolean;
    staticPath?: string[];
  } = {
    port: 8000,
    playground: false,
    typeGeneration: false,
    staticPath: [],
  }) => {
    typeGeneration && (await generateSchemTypes(schemasObj));
    const handler = async (request: Request): Promise<Response> => {
      try {
        // temporarly add cors to request
        // TODO should export cors fn to user and add some custom input to that
        if (request.method === "OPTIONS") {
          return new Response(undefined, {
            headers: addCors(),
          });
          // return;
        }

        return request.method === "GET"
          ? await serveStatic(
            request,
            schemasObj,
            actsObj,
            playground,
            staticPath || [],
          )
          : await lesanFns(actsObj).serveLesan(request, port);
      } catch (e) {
        return new Response(
          JSON.stringify({
            body: {
              message: `Something gone wrong =>> :: ${
                e.message || "We do not know anything about the issue!!! sorry"
              }`,
            },
            success: false,
          }),
          {
            status: e.status || 501,
            headers: {
              ...addCorsObj(),
              "Content-Type": "application/json",
            },
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
