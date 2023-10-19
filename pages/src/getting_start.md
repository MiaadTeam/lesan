# Getting start

I'm copy this simple example from [installation](./installation.md) page. We will keep this file as `mod.ts` and continue to add various models and functions to it.
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

## Add New Model
For adding a new model we should call `newModel` function from `coreApp.odm`. Lets add a country model, please add this code before `coreApp.runServer`:
```ts
const countryPure = {
  name: string(),
  population: number(),
  abb: string(),
};

const countryRelations = {};

const countries = coreApp.odm.newModel(
  "country",
  countryPure,
  countryRelations,
);
```
> We also need to import `string` and `number` from lesan. These are validators exported from [Superstruct](https://github.com/ianstormtaylor/superstruct). We use Superstruct to define models and validate function inputs and some other things.

The `newModel` function accepts three inputs:

- The first input is to define the name of the new model.
- The second input is to define the pure fields of that model in the database. For this, we use an object whose keys are the names of each of the fields, and the value of these keys is obtained by one of the functions exported from [Superstruct](https://github.com/ianstormtaylor/superstruct).
- The third input is to define the relationship between models. Because we have just one model here, we pass an empty object for that.

