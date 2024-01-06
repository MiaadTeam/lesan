# Installation
Currently, only the [Deno](https://deno.land/) version of **Lesan's** framework is ready and usable, [Node](https://nodejs.org/en) and [Bun](https://bun.sh/) versions will also be ready soon.

### Pre request
- At least version 7 of [MongoDB](https://www.mongodb.com/docs/manual/installation/) must be installed.
- The latest version of [Deno](https://docs.deno.com/runtime/manual/getting_started/installation) must be installed.
- It is good to have [NodeJS](https://nodejs.org/en/download) installed on your system.
- If you need to see database information, it is better to install [MongoDB Compass](https://www.mongodb.com/docs/compass/current/install/).
- Using a suitable editor such as: 
  - [VS Code](https://code.visualstudio.com/download) please install [deno extension](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno)
  - [Lesvim](https://github.com/MiaadTeam/lesvim) The configuration of this editor is a bit difficult.
  - [Helix](https://docs.helix-editor.com/install.html) The configuration of this editor is simple and the performance is excellent. Please add `.helix/languages.toml` file to the root of project and insert [this config](https://raw.githubusercontent.com/MiaadTeam/lesan/main/.helix/languages.toml) for better support of `Deno`.

### Importing
After completing the prerequisites, create a file named `mod.ts`.
Now just use the latest version of `Lesan` along with `MongoClient` in this file.

```ts
import {
  lesan,
  MongoClient,
} from "https://deno.land/x/lesan@vx.x.x/mod.ts"; // Please replace `x.x.x` with the latest version in [releases](https://github.com/MiaadTeam/lesan/releases)

const coreApp = lesan();

const client = await new MongoClient("mongodb://127.0.0.1:27017/").connect();

const db = client.db("dbName"); // change dbName to the appropriate name for your project.

coreApp.odm.setDb(db);

coreApp.runServer({ port: 1366, typeGeneration: false, playground: true });
```
> Please replace `x.x.x` in the import link with the latest version in [releases](https://github.com/MiaadTeam/lesan/releases)

Now run this command in the terminal:

```bash
deno run -A mod.ts
```

You should see this messsage:

```bash
HTTP webserver running.
please send a post request to http://localhost:1366/lesan
you can visit playground on http://localhost:1366/playground

Listening on http://localhost:1366/
```

Now you can visit the playground at `http://localhost:1366/playground`.
<img width="1679" alt="Screen Shot 1402-07-27 at 13 12 58" src="https://github.com/MiaadTeam/lesan/assets/6236123/e578cac5-25b5-42f5-b05b-18d7b383afa6">
> Because no database model and no function have been written yet, we still cannot send a request to the server.

**[implement first `model`](./getting_start.md)**


