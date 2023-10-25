import * as esbuild from "https://deno.land/x/esbuild@v0.19.4/mod.js";

const jsBundleResult = await esbuild
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

const cssBunldeResult = await esbuild.build({
  entryPoints: ["./css/index.css"],
  bundle: true,
  outfile: "./dist/bundle-css.css",
});

const cssUrl = new URL("./dist/bundle-css.css", import.meta.url);
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

await Deno.writeTextFile("./dist/bundleContent.ts", bundleTsContent);

console.log("everything done compleltly", { jsBundleResult, cssBunldeResult });
esbuild.stop();
