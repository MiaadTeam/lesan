import { serve } from "https://deno.land/std@0.128.0/http/server.ts";
import { Services } from "../acts/mod.ts";
import { Database } from "../deps.ts";
import { ISchema } from "../models/mod.ts";
import { odm } from "../odm/mod.ts";
import { generateSchemTypes } from "../types/mod.ts";
import { lesanFns } from "../utils/mod.ts";
import { runPlayground } from "./playground/mod.ts";

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
        // return request.method === "GET"
        //   ? await serveStatic(request)
        //   : await serveLesan(request);
        return await lesanFns(actsObj).serveLesan(request, port);
      } catch (e) {
        return new Response(
          `Something gone wrong =>> :: ${
            e.message || "We do not know anything about the issue!!! sorry"
          }`,
          { status: 501 }
        );
      }
    };

    console.log(
      `HTTP webserver running. Access it at: http://localhost:${port}/`
    );
    await serve(handler, { port });
    playground && runPlayground();
  };
  return runServer;
};
