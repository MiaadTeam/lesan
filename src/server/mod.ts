import { serve } from "https://deno.land/std@0.128.0/http/server.ts";
import { Services } from "../acts/mod.ts";
import { Database } from "../deps.ts";
import { ISchema } from "../models/mod.ts";
import { odm } from "../odm/mod.ts";
import { generateSchemTypes } from "../types/mod.ts";
import { lesanFns } from "../utils/mod.ts";
import { runPlayground } from "./playground/mod.ts";

const setDb = odm().setDb;

export const lesanServer = (schemasObj: ISchema, actsObj: Services) => {
  const runServer = async (
    { port, playground, db, typeGeneration }: {
      port: number;
      playground: boolean;
      db: Database;
      typeGeneration: boolean;
    },
  ) => {
    setDb(db);
    typeGeneration && await generateSchemTypes(schemasObj);
    const handler = async (request: Request): Promise<Response> => {
      try {
        // return request.method === "GET"
        //   ? await serveStatic(request)
        //   : await serveLesan(request);
        return await lesanFns(actsObj).serveLesan(request, port);
      } catch (e) {
        return new Response(
          `Somthing has wrong =>> :: ${
            e.message ||
            "we do not know anything !!! sorry"
          }`,
          { status: 501 },
        );
      }
    };

    console.log(
      `HTTP webserver running. Access it at: http://localhost:${port}/`,
    );
    await serve(handler, { port });
    playground && runPlayground();
  };
  return runServer;
};
