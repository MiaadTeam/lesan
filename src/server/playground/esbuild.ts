import * as esbuild from "https://deno.land/x/esbuild@v0.18.9/mod.js";

esbuild
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
  })
  .then((result) => {
    /*
     *  @LOG @DEBUG @INFO
     *  This log written by ::==> {{ syd }}
     *
     *  Please remove your log after debugging
     */
    console.log(" ============= ");
    console.group("result, error ------ ");
    console.log();
    console.info({ result }, " ------ ");
    console.log();
    console.groupEnd();
    console.log(" ============= ");
  })
  .catch((e) => console.log(e));
