import { bundle } from "../../deps.ts";
import { bundleCss, bundleTs } from "./dist/bundleContent.ts";

export const getCSSFile = async () => {
  const getFileCss = async () => {
    const url = new URL("./css/index.css", import.meta.url);
    const data = await Deno.readTextFile(url);
    return new Response(data, {
      headers: { "content-type": "text/css" },
    });
  };

  const getConstCss = () => {
    return new Response(bundleCss, {
      headers: { "content-type": "text/css" },
    });
  };

  return Deno.env.get("PLAYENV") === "development"
    ? await getFileCss()
    : getConstCss();
};

export const getClientReact = async () => {
  const url = new URL("./hydrate.tsx", import.meta.url);
  const result = await bundle(url, {
    type: "classic",
    compilerOptions: { sourceMap: false },
  });
  const { code } = result;

  return new Response(code, {
    headers: { "content-type": "application/javascript" },
  });
};

export const getJSFile = async () => {
  const getBundle = async () => {
    // const url = new URL("./dist/bundle-es.js", import.meta.url);
    // const data = await Deno.readTextFile(url);

    return new Response(bundleTs, {
      headers: { "content-type": "application/javascript" },
    });
  };

  return Deno.env.get("PLAYENV") === "development"
    ? await getClientReact()
    : await getBundle();
};

export const runPlayground = (
  url: URL,
) => {
  const getSsrReact = () => {
    const html = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="${url.origin}/playground/static/index.css">
        <title>Lesan Playground</title>
      </head>
      <body >
        <div id="root"></div>
        <script type="module" src="${url.origin}/playground/static/bundle.js" defer></script>
      </body>
      </html>`;

    return new Response(html, {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  };
  return getSsrReact();
};
