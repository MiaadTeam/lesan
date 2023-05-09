// import { renderToString } from "https://esm.sh/preact-render-to-string@6.0.2?deps=preact@10.13.2";
/** @jsx h */
import { renderToString } from "https://esm.sh/preact-render-to-string@5.1.19?deps=preact@10.5.15";
import { h } from "https://esm.sh/preact@10.5.15";
import { Services } from "../../mod.ts";
import { ISchema } from "../../models/mod.ts";
import { Page } from "./comp/preact.tsx";

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
  actsObj: Services,
) => {
  const js = `
import { h, hydrate } from "https://esm.sh/preact@10.5.15";
import { useState, useRef } from "https://esm.sh/preact@10.5.15/hooks";

 const App = ${Page};
  const props = {schemasObj:${JSON.stringify(schemasObj)}, actsObj: ${
    JSON.stringify(actsObj)
  }}
 hydrate(h(App, props), document.getElementById('root'));`;

  const getClientReact = () => {
    return new Response(js, {
      headers: { "content-type": "application/javascript" },
    });
  };

  const getSsrReact = () => {
    const body = renderToString(
      <Page schemasObj={schemasObj} actsObj={actsObj} />,
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
    : getSsrReact();
};
