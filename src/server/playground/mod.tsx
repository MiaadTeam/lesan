// import { renderToString } from "https://esm.sh/preact-render-to-string@6.0.2?deps=preact@10.13.2";
/** @jsx h */
import { renderToString } from "https://esm.sh/preact-render-to-string@5.1.19?deps=preact@10.5.15";
import { h } from "https://esm.sh/preact@10.5.15";
import { bundle } from "../../deps.ts";
import { Services } from "../../mod.ts";
import { ISchema } from "../../models/mod.ts";
import { Page } from "./comp/preact.tsx";
import { ManagedLesanContext } from "./comp/ManagedLesanContext.tsx";

const getCSSFile = async () => {
  const url = new URL("./css/index.css", import.meta.url);
  const data = await Deno.readTextFile(url);
  return new Response(data, {
    headers: { "content-type": "text/css" },
  });
};

export const runPlayground = async (
  request: Request,
  schemasObj: ISchema,
  actsObj: Services
) => {
  const url = new URL("./hydrate.tsx", import.meta.url);

  const result = await bundle(url);

  const { code } = result;

  const getClientReact = () => {
    return new Response(code, {
      headers: { "content-type": "application/javascript" },
    });
  };

  const getSchemas = () => {
    return new Response(
      JSON.stringify({ schemas: schemasObj, acts: actsObj }),
      {
        headers: { "content-type": "application/json" },
      }
    );
  };

  const getSsrReact = () => {
    const body = renderToString(
      <ManagedLesanContext>
        <Page />
      </ManagedLesanContext>
    );

    const html = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="http://localhost:8000/static/index.css">
        <title>Lesan Playground</title>
      </head>
      <body >
        <div id="root">${body}</div>
        <script type="module" src="http://localhost:8000/static/client.js" defer></script>
      </body>
      </html>`;

    return new Response(html, {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  };
  return request.url === "http://localhost:8000/static/client.js"
    ? getClientReact()
    : request.url === "http://localhost:8000/static/index.css"
    ? await getCSSFile()
    : request.url === "http://localhost:8000/static/get/schemas"
    ? getSchemas()
    : getSsrReact();
};
