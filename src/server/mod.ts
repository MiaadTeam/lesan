import { serve } from "https://deno.land/std@0.128.0/http/server.ts";
import { Services } from "../acts/mod.ts";
import { ISchema } from "../models/mod.ts";
import { generateSchemTypes } from "../types/mod.ts";
import { lesanFns } from "../utils/mod.ts";
import { runPlayground } from "./playground/mod.tsx";

/**
 * this function is for run Server and get request of client and send response of request for client
 *  @param port - port of listen
 *  @param playground - use playground or not?
 * @param db - connection of DB
 * @param typeGeneration -
 */

export const lesanServer = (schemasObj: ISchema, actsObj: Services) => {
  const runServer = async ({
    port,
    playground,
    typeGeneration,
  }: {
    port: number;
    playground: boolean;
    typeGeneration: boolean;
  }) => {
    typeGeneration && (await generateSchemTypes(schemasObj));
    const handler = async (request: Request): Promise<Response> => {
      try {
        return request.method === "GET"
          // ? await serveStatic(request)
          ? await runPlayground(request, schemasObj, actsObj)
          : await lesanFns(actsObj).serveLesan(request, port);
        // return await lesanFns(actsObj).serveLesan(request, port);
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
              "Content-Type": "application/json",
            },
          },
        );
      }
    };

    console.log(
      `HTTP webserver running. please send a post request to http://localhost:${port}/lesan`,
    );
    await serve(handler, { port });
    // playground && runPlayground();
  };
  return runServer;
};
