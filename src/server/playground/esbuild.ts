import * as esbuild from "https://deno.land/x/esbuild@v0.19.4/mod.js";

const result = await esbuild
  .build({
    entryPoints: ["./hydrate.tsx"],
    outfile: "./dist/bundle-es.js",
    jsxFactory: "h",
    jsxFragment: "Fragment",
    jsxImportSource: "preact",
    bundle: true,
    minify: true,
    format: "esm",
    sourcemap: true,
    external: ["preact"],
    drop: ["console"],
  });

const cssUrl = new URL("./css/index.css", import.meta.url);
const cssContet = await Deno.readTextFile(cssUrl);

const tsAddress = new URL(
  "./dist/bundle-es.js",
  import.meta.url,
);
const tsContent = await Deno.readTextFile(tsAddress);

const bundleTsContent = `
    export const bundleTs = ${JSON.stringify(tsContent)};

    export const bundleCss = \`${cssContet}\`;
    `;

console.log("esbuild result is ", { result });
await Deno.writeTextFile("./dist/bundleContent.ts", bundleTsContent);

esbuild.stop();
