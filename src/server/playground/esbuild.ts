import { bundler, fs } from "../../platform/adapters/index.ts";

await fs.ensureDir("./dist");

const jsBundleResult = await bundler.bundle("./hydrate.tsx", {
  compilerOptions: {
    jsxFactory: "h",
    jsxFragmentFactory: "Fragment",
  },
  bundle: true,
  minify: true,
  format: "esm",
  sourcemap: true,
  external: ["preact"],
});

await fs.writeTextFile("./dist/bundle-es.js", jsBundleResult.code);

let cssContent = "";
try {
  const cssBundleResult = await bundler.bundle("./css/index.css", {
    bundle: true,
  });
  cssContent = cssBundleResult.code;
} catch (e) {
  // Fallback to reading the file directly if the bundler doesn't support CSS
  const cssUrl = new URL("./css/index.css", import.meta.url);
  cssContent = await fs.readTextFile(cssUrl.pathname);
}

await fs.writeTextFile("./dist/bundle-css.css", cssContent);

const bundleTsContent = `
    export const bundleTs = ${JSON.stringify(jsBundleResult.code)};

    export const bundleCss = \`${cssContent}\`;
    `;

await fs.writeTextFile("./dist/bundleContent.ts", bundleTsContent);

console.log("everything done completely", { jsBundleResult });

if (bundler.shutdown) {
  await bundler.shutdown();
}
