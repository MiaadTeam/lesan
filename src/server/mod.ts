import { serve } from "https://deno.land/std@0.128.0/http/server.ts";
import { serveLesan } from "../utils/mod.ts";
import { runPlayground } from "./playground/mod.ts";

export const runServer = async (
  { port, playground }: { port: number; playground: boolean } = {
    port: 8080,
    playground: false,
  },
) => {
  const handler = async (request: Request): Promise<Response> => {
    try {
      // return request.method === "GET"
      //   ? await serveStatic(request)
      //   : await serveLesan(request);
      return await serveLesan(request, port);
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
