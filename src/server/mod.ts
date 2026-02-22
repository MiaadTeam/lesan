import { Services } from "../core/acts/mod.ts";
import { TSchemas } from "../core/models/mod.ts";
import { generateSchemTypes } from "../core/types/mod.ts";
import { HttpError } from "../core/utils/HttpError.ts";
import { lesanFns } from "../core/utils/mod.ts";
import { addCors } from "./cors.ts";
import { serveStatic } from "./serveStatic.ts";
import { http } from "../platform/adapters/index.ts";

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
    typeGeneration && (await generateSchemTypes(schemasObj, actsObj));
    const handler = async (request: Request): Promise<Response> => {
      try {
        if (request.method === "OPTIONS") {
          const contentType = request.headers.get("content-type") ||
            "application/json";
          if (cors) {
            return new Response(undefined, {
              headers: addCors(
                cors,
                request.headers.get("origin"),
                contentType,
              ),
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
      } catch (error) {
        const contentType = request.headers.get("content-type") ||
          "application/json";
        let headers = {};
        headers = {
          ...headers,
          ...addCors(cors, request.headers.get("origin"), contentType),
        };

        return new Response(
          JSON.stringify({
            body: {
              message: (error as HttpError).message ||
                "We do not know anything about the issue!!! sorry",
            },
            success: false,
          }, replacer),
          {
            status: (error as HttpError).status || 501,
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
    await http.serve({ port }, handler);
  };
  return runServer;
};
