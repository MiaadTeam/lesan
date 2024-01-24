# Getting start

I copy this simple example from [installation](./installation.md) page. We will keep this file as `mod.ts` and continue to add various models and functions to it.

```ts
import { lesan, MongoClient } from "https://deno.land/x/lesan@vx.x.x/mod.ts"; // Please replace `x.x.x` with the latest version in [releases](https://github.com/MiaadTeam/lesan/releases)

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
  countryRelations
);
```

> We also need to import `string` and `number` from lesan. These are validators exported from [Superstruct](https://github.com/ianstormtaylor/superstruct). We use Superstruct to define models and validate function inputs and some other things.

The `newModel` function accepts three inputs:

- The first input is to define the name of the new model.
- The second input is to define the pure fields of that model in the database. For this, we use an object whose keys are the names of each of the fields, and the value of these keys is obtained by one of the functions exported from [Superstruct](https://github.com/ianstormtaylor/superstruct).
- The third input is to define the relationship between models. Because we have just one model here, we pass an empty object for that. We will read more about this later.

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

> We need to import `object` function `ActFn` type from `lesan`

### The `setAct` function

As you can see, to add an act to `country`, we need to use the `setAct` function in `coreApp.acts`.
This function receives an object as input that has the following keys:

- `schema` is the name of the model to which we want to set an action.
- `actName` is just a simple string to identify the act.
- `fn` is the function we call when a request arrives for it.
- `validator` is a superstruct object which is called before calling the act fn and validating the given data. Validator includes `set` and `get` objects.
- An optional key named `validationRunType` that receives the values of `assert` and `create` and determines the type of validator run so that we can create data or change previous data during validation. You can read about it [here](https://docs.superstructjs.org/guides/03-coercing-data).
- There is another optional key called `preAct` which receives an array of functions. These functions are executed in the order of the array index before the execution of the main endpoint function. With these functions, we can store information in the context and use it in the main function, or not allow the main function to be executed. We mostly use this key for `authorization` and `authentication`. You can think of that key as middleware in Express.
- Like `preAct`, there is another optional key called `preValidation`. which, like `preAct`, receives an array of functions and executes them in order before executing the validation function.

There is a `context` inside Lesan, which is available by `contextFns.getContextModel()` function. And we can share information between the functions of an `Act` like `preAct`, `preValidation`, `validator` and `fn` through this context. By default, the `body` and `header` of each request are available in this context.

In addition, the `fn` function receives an input called `body`, which is the `body` of the sent request. If we have changed the body in the `context`. The body entered in `fn` function will be updated and changed.

### The Validator function

In the `addCountryValidator` function that we wrote for the `validator` key, we have returned the `object` function from the Superstruct struct.  
This `object` contains two key:

- `set`: It is an `object` in which we define the required input information for each function available on the client side. In the desired function, we can get the `set` object information from this address. `body.details.set`. Note that this object must be of Superstruct `object` function type.
- `get`: This key is also a Superstruct `object`, where we specify what data can be sent to the client. This object is used in such a way that the client can specify what data he needs with values of `0` or `1` for each `key`. Actually, this object can be like this:
  ```ts
  get: object({
    name: enums([0, 1]),
    population: enums([0, 1]),
    abb: enums([0, 1]),
  });
  ```
  But as you can see, we have used `selectStruct` function of `coreApp.schemas.selectStruct`. This function has two inputs. The first input is the `name` of the model for which we want to generate this object, and the second input specifies the degree of penetration into each `relationship`. The second input of the `selectStruct` function can be entered as a `number` or an `object`. If entered as an object, the keys of this object must be the `names` of the selected model relationships, and its value can again be a `number` or an `object` of its key relationships. Such as:
  ```ts
    get: coreApp.schemas.selectStruct("country", {
        provinces: {
          cities: 1
        },
        createdBy: 2,
        users:{
          posts: 1
        }
      }),
  ```
  As a result, an object will be produced as follows:
  ```ts
  get: object({
    name: enums([0, 1]),
    population: enums([0, 1]),
    abb: enums([0, 1]),
    provinces: object({
      name: enums([0, 1]),
      population: enums([0, 1]),
      abb: enums([0, 1]),
      cities: object({
        name: enums([0, 1]),
        population: enums([0, 1]),
        abb: enums([0, 1]),
      }),
    }),
    createdBy: object({
      name: enums([0, 1]),
      family: enums([0, 1]),
      email: enums([0, 1]),
      livedCity: object({
        name: enums([0, 1]),
        population: enums([0, 1]),
        abb: enums([0, 1]),
        province: object({
          name: enums([0, 1]),
          population: enums([0, 1]),
          abb: enums([0, 1]),
        }),
      }),
      posts: object({
        title: enums([0, 1]),
        description: enums([0, 1]),
        photo: enums([0, 1]),
        auther: object({
          name: enums([0, 1]),
          family: enums([0, 1]),
          email: enums([0, 1]),
        }),
      }),
    }),
    users: object({
      name: enums([0, 1]),
      family: enums([0, 1]),
      email: enums([0, 1]),
      post: object({
        title: enums([0, 1]),
        description: enums([0, 1]),
        photo: enums([0, 1]),
      }),
    }),
  });
  ```
  We directly send the data received from the get key as a projection to MongoDB.

### The `fn` function

The `fn` key receives the main `act` function, we write this function for that:

```ts
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
```

This function receives an input called `body`, the `body` of the `request` sent from the client side is passed to it when this function is called, as a result, we have access to the information sent by users.
The request body sent from the client side should be a json like this:

```JSON
{
  "service": "main",
  "model": "country",
  "act": "addCountry",
  "details": {
    "set": {
      "name": "Iran",
      "population": 85000000,
      "abb": "IR"
    },
    "get": {
      "_id": 1,
      "name": 1,
      "population": 1,
      "abb": 1
    }
  }
}
```

- The `service` key is used to select one of the microservices set on the application. You can read more about this here.
- The `model` key is used to select one of the models added to the application.
- The `act` key is used to select one of the acts added to the application.
- The `act` key is used to select one of the acts added to the application.
- The `details` key is used to receive data to be sent from the client side along with data to be delivered to users. This key has two internal keys called `get` and `set`, we talked a little about it before.
  - `set`: It contains the information we need in the main function. For this reason, we can extract `name`, `population`, and `abb` from within `body.details.set`.
  - `get`: Contains selected information that the user needs to be returned. Therefore, we can pass this object directly to Mongo `projection`.

As you can see, we have used the `insertOne` function, which was exported from the `countries` model, to add a new document. This function accepts an object as input, which has the following keys:

```ts
{
  doc: OptionalUnlessRequiredId<InferPureFieldsType>;
  relations?: TInsertRelations<TR>;
  options?: InsertOptions;
  projection?: Projection;
}
```

- The `doc` key receives an object of the pure values of the selected model. `OptionalUnlessRequiredId` type is the `document` type in the official MongoDB driver. You can read about it [here](https://mongodb.github.io/node-mongodb-native/6.1/types/OptionalUnlessRequiredId.html).
- The `relations` key receives an object from the relations of this model. There is no relationship here. We will read about this in the next section.
- The `options` key gets the official MongoDB driver options to insertOne. You can read more about this [here](https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertOne)
- The `projection` key is used to receive written data. We use native projection in MangoDB. You can read MongoDB's own documentation [here](https://www.mongodb.com/docs/manual/tutorial/project-fields-from-query-results/). In `insertOne`, you can only penetrate one step in relationships. Here you can get only pure fields because there is no relation. We will read more about this later.

## The code

So this is all the code we've written so far (You can also see and download this code from [here](https://raw.githubusercontent.com/MiaadTeam/lesan/main/examples/document/02-impement-first-fn.ts)):

```ts
import {
  ActFn,
  lesan,
  MongoClient,
  number,
  object,
  string,
} from "https://deno.land/x/lesan@vx.x.x/mod.ts"; // Please replace `x.x.x` with the latest version in [releases](https://github.com/MiaadTeam/lesan/releases)

const coreApp = lesan();

const client = await new MongoClient("mongodb://127.0.0.1:27017/").connect();

const db = client.db("dbName"); // change dbName to the appropriate name for your project.

coreApp.odm.setDb(db);

const countryPure = {
  name: string(),
  population: number(),
  abb: string(),
};

const countryRelations = {};

const countries = coreApp.odm.newModel(
  "country",
  countryPure,
  countryRelations
);

const addCountryValidator = () => {
  return object({
    set: object(countryPure),
    get: coreApp.schemas.selectStruct("country", { users: 1 }),
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

coreApp.runServer({ port: 1366, typeGeneration: false, playground: true });
```

> Please replace `x.x.x` in the import link with the latest version in [releases](https://github.com/MiaadTeam/lesan/releases)

### Run Server function

The last thing we want to talk about is the `coreApp.runServer` function, this function receives an `object` input that has the following keys:

- `port` used to specify the port used to run the server.
- `polyground` that receives a `Boolean` value that specifies whether the Polyground is available at `http://{server-address}:{port}/playground` address.
- `typeGeneration`, which receives a `Boolean` value and creates a folder named `declarations`, and inside it, the typefaces of the program are generated to be used in various cases, we will read more about this later.
- `staticPath` that receives an `array` of paths as a `string` and makes the content inside these paths statically serveable. We will read more about this later.
- `cors` which receives either the `*` value or an `array` of URLs as a `string`, and makes these addresses have the ability to communicate with the server and not receive the `cors` error.

### Running App

> Now you can run `deno run -A mod.ts` for running the Application with deno

You can use playground:
<img width="1680" alt="Screen Shot 1402-07-30 at 11 17 19" src="https://github.com/MiaadTeam/lesan/assets/6236123/1e514e6c-58b3-484b-ae73-e6cc8e26c56c">
Or postman:
<img width="1643" alt="Screen Shot 1402-07-30 at 11 35 40" src="https://github.com/MiaadTeam/lesan/assets/6236123/1c9e0d4a-c875-4b14-9832-8d7c680ebe18">

To send a `post` request to `http://localhost:1366/lesan` with this `request body`:

```JSON
{
  "service": "main",
  "model": "country",
  "act": "addCountry",
  "details": {
    "set": {
      "name": "Iran",
      "population": 85000000,
      "abb": "IR"
    },
    "get": {
      "_id": 1,
      "name": 1,
      "population": 1,
      "abb": 1
    }
  }
}
```

For inserting a new country.

You shuold get this result:

```JSON
{
  "body": {
    "_id": "6534d7c6c5dec0be8e7bf751",
    "name": "Iran",
    "population": 85000000,
    "abb": "IR"
  },
  "success": true
}
```

### Add E2E Test

For adding `addCountry` request to E2E section you should click on the **E2E button**, like below picture.

<img width="1680" alt="e2e sequence" src="https://github.com/MiaadTeam/lesan/assets/96171913/fae58c10-f792-4041-89ca-186dc89bcee1">

Then, when you go to the **E2E section**, you can see 2 sequense that first one is the default sequence that you should delete that.
so, you have one sequence that include your request information(like bottom picture).

<img alt="e2e sequence" src="https://github.com/MiaadTeam/lesan/assets/96171913/e56cfaea-5a7c-4aab-ab7f-4c215e875fb6">
