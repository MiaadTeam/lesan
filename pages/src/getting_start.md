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
For adding a new model we should call `newModel` function from `coreApp.odm`. Lets add a country model, please add the following code before `coreApp.runServer`:
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

Finally, the `newModel` function returns an object that has services such as `insertOne`, `insertMany`, `updateOne`, `deleteOne`, and so on.

## Add an access point

Every model needs at least one `act` as an access point to communicate and send or receive data. For adding an `act` to `countries` please add the following code before `coreApp.runServer`:
```ts
const addCountryValidator = () => {
  return object({
    set: object(countryPure),
    get: coreApp.schemas.selectStruct("country", 1),
  });
};

const addCountry: ActFn = async (body) => {
  const { name, population, abb } = body.details.set;
  return await countries.insertOne({
    doc: {
      name,
      population,
      abb,
    },
    projection: body.details.get,
  });
};

coreApp.acts.setAct({
  schema: "country",
  actName: "addCountry",
  validator: addCountryValidator(),
  fn: addCountry,
});
```
> We need to import `ActFn` type from `lesan`

### The `setAct` function
As you can see, to add an act to `country`, we need to use the `setAct` function in `coreApp.acts`.
This function receives an object as input that has the following keys:

- `schema` is the name of the model to which we want to set an action.
- `actName` is just a simple string to identify the act.
- `fn` is the function we call when a request for it arrives.
- `validator` is a superstruct object which is called before the act fn calling and validation the given data. Validator includes `set` and `get` objects.
- An optional key named `validationRunType` that receives the values of `assert` and `create` and determines the type of validator run so that we can create data or change previous data during validation. You can read about it [here](https://docs.superstructjs.org/guides/03-coercing-data).
- There is another optional key called `preAct` which receives an array of functions. These functions are executed in the order of the array index before the execution of the main endpoint function. With these functions, we can store information in the context and use it in the main function, or not allow the main function to be executed. We mostly use this key for authorization and authentication. You can think of that key as middleware in Express.

### The Validator function
In the `addCountryValidator` function that we wrote for the `validator` key, we have returned the `object` function from the Superstruct struct.  
This `object` contains to key:  
- `set`: this key used for getting data from client side. we have access to this key inside of main function in this address `body.details.set`

