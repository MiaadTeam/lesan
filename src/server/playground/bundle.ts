import { bundle, ensureDir } from "../../deps.ts";

const getClientReact = async () => {
  const result = await bundle("./hydrate.tsx", {
    compilerOptions: { sourceMap: false },
  });
  const { code } = result;

  await ensureDir("./dist");
  await Deno.writeTextFile("./dist/bundle.js", code);
};

await getClientReact();
