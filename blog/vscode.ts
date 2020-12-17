import { ensureDir } from "https://deno.land/std/fs/mod.ts";

const content = `
{
  "deno.enable": true,
  "deno.import_intellisense_origins": {
    "https://deno.land": true
  }
}
`;

export const createVscodeSetting = async (init: string) => {
  await ensureDir(`${init}/.vscode`);
  await Deno.writeTextFile(`${init}/.vscode/settings.json`, content);
};
