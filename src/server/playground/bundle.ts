import { bundler, fs } from "../../platform/adapters/index.ts";

const getClientReact = async () => {
  const result = await bundler.bundle("./hydrate.tsx", {
    compilerOptions: { sourceMap: false },
  });
  const { code } = result;

  await fs.ensureDir("./dist");
  await fs.writeTextFile("./dist/bundle.js", code);
};

await getClientReact();
