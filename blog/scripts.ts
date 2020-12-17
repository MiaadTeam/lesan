const content = `
{
  "$schema": "https://deno.land/x/denon/schema.json",
  "scripts": {
    "start": {
      "cmd": "deno run index.ts",
      "desc": "run my app.ts file",
      "allow": ["plugin", "net", "read", "write", "env"],
      "unstable": true,
      "watch": true
    }
  },
  "watcher": {
    "interval": 350,
    "match": [
      "./src/**/*.ts",
      "./index.ts",
      "./scripts.json",
      "./redis.ts",
      "./db.ts"
    ],
    "skip": ["*/.git/*"],
    "legacy": false
  },
  "logger": {
    "debug": true,
    "fullscreen": true
  }
}
`;

export const createScripts = async (init: string) => {
  await Deno.writeTextFile(`${init}/scripts.json`, content);
};
