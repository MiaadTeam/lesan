import { walk } from "https://deno.land/std/fs/mod.ts";

export const createPlay = async () => {
  const __dirname = new URL(".", import.meta.url).pathname;
  const buildFolder = `${__dirname}../playground/build`;
  let content = `
import { ensureDir } from "https://deno.land/std/fs/mod.ts";
      /**
       * This file generated automaticly
       * @author syd
       * please dont touch it
       */
      export const generatePlay = async () => {
        await ensureDir(".play");
    `;

  for await (const entry of walk(buildFolder)) {
    const readedFile = entry.isFile ? await Deno.readFile(entry.path) : null;

    console.log(entry.path);

    if (readedFile) {
      const name = entry.path.slice(
        entry.path.lastIndexOf("/"),
        entry.path.length,
      );
      const path = entry.path.slice(
        entry.path.indexOf("build/") + 6,
        entry.path.lastIndexOf("/"),
      );

      if (path) {
        content = content + `
  await ensureDir(".play/${path}");
                    `;
      }

      content = content + `
        await Deno.writeFile(".play${
        path ? "/" + path + name : name
      }", new Uint8Array([${readedFile}]))
        `;
    }
  }
  content = content + `
        }
        `;
  await Deno.writeTextFile("./generatePlay.ts", content);
};

createPlay();
