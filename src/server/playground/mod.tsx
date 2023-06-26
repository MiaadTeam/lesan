import { bundle } from "../../deps.ts";
import { Services } from "../../mod.ts";
import { ISchema } from "../../models/mod.ts";

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
  port: number,
) => {
  const getClientReact = async () => {
    const url = new URL("./hydrate.tsx", import.meta.url);
    const result = await bundle(url, {
      compilerOptions: { sourceMap: false },
    });
    const { code } = result;

    return new Response(code, {
      headers: { "content-type": "application/javascript" },
    });
  };

  const getJSFile = async () => {
    const getBundle = async () => {
      const url = new URL("./dist/bundle.js", import.meta.url);
      const data = await Deno.readTextFile(url);
      return new Response(data, {
        headers: { "content-type": "application/javascript" },
      });
    };

    return Deno.env.get("PLAYEND") === "development"
      ? await getBundle()
      : await getClientReact();
  };

  const getSchemas = () => {
    return new Response(
      JSON.stringify({ schemas: schemasObj, acts: actsObj }),
      {
        headers: { "content-type": "application/json" },
      },
    );
  };

  const getSsrReact = () => {
    const html = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="http://localhost:${port}/static/index.css">
        <title>Lesan Playground</title>
      </head>
      <body >
        <div id="root"></div>
        <script type="module" src="http://localhost:${port}/static/bundle.js" defer></script>
      </body>
      </html>`;

    return new Response(html, {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  };
  return request.url === `http://localhost:${port}/static/client.js`
    ? await getClientReact()
    : request.url === `http://localhost:${port}/static/index.css`
    ? await getCSSFile()
    : request.url === `http://localhost:${port}/static/bundle.js`
    ? await getJSFile()
    : request.url === `http://localhost:${port}/static/get/schemas`
    ? getSchemas()
    : getSsrReact();
};
