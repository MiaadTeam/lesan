# Lesan is a combination of the web server and MongoDb ODM with some microservice setting

it also has several concepts about arbitrary embedding documents and creating SSG contents

### let's create a simple web server :

you can find complete implemention of this example [here](https://github.com/MiaadTeam/lesan/tree/main/examples/simpleMicroservice)

first of all, create a ts file called `mod.ts` and import the last version of `lesan` and assign a constant call `coreApp` to its:

```typescript
import { lesan } from "https://deno.land/x/lesan@vx.x.x/mod.ts";

const coreApp = lesan();
```

please replace `x.x.x` with the latest version in [releases](https://github.com/MiaadTeam/lesan/releases)

before anything let's connect `database` to our app, so please add a new `MongoDb` instance :

first add `MongoClient` from `lesan` :

```typescript
import { lesan, MongoClient } from "https://deno.land/x/lesan@vx.x.x/mod.ts";
```

and create `new MongoClient` :

```typescript
const client = new MongoClient();
await client.connect("mongodb://localhost:27017/arc");
const db = client.database("core");
```

we should set up `ODM` with a new database :

```typescript
coreApp.odm.setDb(db);
```

we have three concepts for every model in the database: `pure` and `inrelation` and `outrelation`.

`pure` is just a simple object with `key` of `string` and `value` of [SuperStruct](https://github.com/ianstormtaylor/superstruct) structure.

`inrelation` is an `array` or `single` `pure` object of another `MongoDb collection` we want to embed. in `SQL` paradigm every relation we saved the `key` or `id` of it we called `inrelation`. for example we have a `blogPost` which has a creator from `user` `collection`. and we save `pure` of `user` in `blogPost` `collection`.

`outrelation` is a relation for `collection` but it is very huge and we do not even save `key` or `id` of it in `SQL` paradigm. for example, we have a `user` `collection` which he/she writes many `blogPost` and we save for example 50 `array` `pure` object of `blogPost` in order of date sort for the first pagination in `user` `collection`.

so let's create `user` and `country` schema :

first let import `string` `number` `optional` `InRelation` and `OutRelation` from `lesan` :

```typescript
import {
  InRelation,
  lesan,
  MongoClient,
  number,
  optional,
  OutRelation,
  string,
} from "https://deno.land/x/lesan@vx.x.x/mod.ts";
```

and then create schema shapes :

```typescript
const userPure = {
  name: string(),
  address: optional(string()),
  age: number(),
};

const countryPure = {
  name: string(),
  description: string(),
};

const userInRel: Record<string, InRelation> = {
  country: {
    schemaName: "country",
    type: "one",
  },
};

const userOutRel = {};

const countryInRel: Record<string, InRelation> = {};

const countryOutRel: Record<string, OutRelation> = {
  users: {
    schemaName: "user",
    number: 50,
    sort: { field: "_id", order: "desc" },
  },
};
```

we should set schema in `coreApp` :

```typescript
const users = coreApp.odm.setModel("user", userPure, userInRel, userOutRel);
const countries = coreApp.odm.setModel(
  "country",
  countryPure,
  countryInRel,
  countryOutRel,
);
```

at this point we need to have some endpoint to call from an HTTP request, so let's go to write some endpoint.

for creating end point we need to set `act` from `coreApp.acts.setAct` function which require `type` `schema` `actName` `validator` and `fn`.

the `type` is just an enum of `static` and `dynamic`.
`schema` is the model name we want to set an action to it.
`actName` is just a simple string to identify `act`.
`validator` is a superstruct `object` which is call before `act` `fn` calling and validation the giving data. `validator` include `set` and `get` `object`.
`fn` is the function we call when a request for it arrives.

this is a one example of `act` :

before creating `act` please import `object` and `ActFn` from `lesan` :

```typescript
import {
  ActFn,
  InRelation,
  lesan,
  MongoClient,
  number,
  object,
  optional,
  OutRelation,
  string,
} from "https://deno.land/x/lesan@vx.x.x/mod.ts";
```

and this is `act` :

```typescript
const addUserValidator = () => {
  return object({
    set: object(userPure),
    get: coreApp.schemas.selectStruct("user", { country: 1 }),
  });
};

const addUser: ActFn = async (body) => {
  const createdUser = await users.insertOne(body.details.set);
  return await users.findOne({ _id: createdUser }, body.details.get);
};

coreApp.acts.setAct({
  type: "dynamic",
  schema: "user",
  actName: "addUser",
  validator: addUserValidator(),
  fn: addUser,
});
```

the last thing we need is just to run the web server :

```typescript
coreApp.runServer({ port: 8080, typeGeneration: true, playground: false });
```

when `typeGeneration` is set to `true` it creates a `declarations` folder with some typescript type we need in the project.

now run this command in the terminal :

```bash
deno rum -A mod.ts
```

that's all now we can send a `POST` HTTP request to `http://localhost:8080/lesan` whit this `JSON` in the body to get data :

```JSON
{
  "contents": "dynamic",
  "wants": {
    "model": "user",
    "act": "addUser"
  },
  "details": {
    "set": {
      "name": "Seyyedeh Sare Hosseini",
      "address": "Iran, Hamedan",
      "age": 5
    },
    "get": {
      "age": 1,
      "address": 1
    }
  }
}
```

the `projection` of getting data is based on [MongoDb Projection](https://www.mongodb.com/docs/manual/tutorial/project-fields-from-query-results/)

the `coreApp.schemas.selectStruct` function can limit the projection based on your schema relation and prevent an Infinite loop in retrieving data

after running the server whit `typeGeneration` set to true. the `declarations` folder is created now you can

import `userInp` from generated type and make `coreApp.schemas.selectStruct<userInp>("user", { country: 1 })` type safe:

```typescript
import { userInp } from "./declarations/selectInp.ts";

const addUserValidator = () => {
  return object({
    set: object(userPure),
    get: coreApp.schemas.selectStruct<userInp>("user", { country: 1 }),
  });
};
```

### this is the full example text :

```typescript
import {
  ActFn,
  InRelation,
  lesan,
  MongoClient,
  number,
  object,
  optional,
  OutRelation,
  string,
} from "https://deno.land/x/lesan@vx.x.x/mod.ts";

const coreApp = lesan();

const client = new MongoClient();

await client.connect("mongodb://localhost:27017/arc");
const db = client.database("core");

coreApp.odm.setDb(db);

const userPure = {
  name: string(),
  address: optional(string()),
  age: number(),
};

const countryPure = {
  name: string(),
  description: string(),
};

const userInRel: Record<string, InRelation> = {
  country: {
    schemaName: "country",
    type: "one",
  },
};

const userOutRel = {};

const countryInRel: Record<string, InRelation> = {};

const countryOutRel: Record<string, OutRelation> = {
  users: {
    schemaName: "user",
    number: 50,
    sort: { field: "_id", order: "desc" },
  },
};

const users = coreApp.odm.setModel("user", userPure, userInRel, userOutRel);
const countries = coreApp.odm.setModel(
  "country",
  countryPure,
  countryInRel,
  countryOutRel,
);

const addUserValidator = () => {
  return object({
    set: object(userPure),
    get: coreApp.schemas.selectStruct("user", { country: 1 }),
  });
};

const addUser: ActFn = async (body) => {
  const acts = coreApp.acts.getAtcsWithServices();
  const createdUser = await users.insertOne(body.details.set);
  return await users.findOne({ _id: createdUser }, body.details.get);
};

coreApp.acts.setAct({
  type: "dynamic",
  schema: "user",
  actName: "addUser",
  validator: addUserValidator(),
  fn: addUser,
});

const addCountryValidator = () => {
  return object({
    set: object(countryPure),
    get: coreApp.schemas.selectStruct("country", { users: 1 }),
  });
};

const addCountry: ActFn = async (body) => {
  const createdCountry = await countries.insertOne(body.details.set);
  return await countries.findOne({ _id: createdCountry }, body.details.get);
};

coreApp.acts.setAct({
  type: "dynamic",
  schema: "country",
  actName: "addCountry",
  validator: addCountryValidator(),
  fn: addCountry,
});

coreApp.runServer({ port: 8080, typeGeneration: true, playground: false });
```

### lets create microservice

please move the `mod.ts` file to `core/mod.ts` and create another file in `ecommerce/mod.ts` and paste these codes into it :

```typescript
import {
  ActFn,
  InRelation,
  lesan,
  MongoClient,
  number,
  object,
  optional,
  OutRelation,
  string,
} from "https://deno.land/x/lesan@vx.x.x/mod.ts";

const ecommerceApp = lesan();

const client = new MongoClient();

await client.connect("mongodb://localhost:27017/arc");
const db = client.database("core");

ecommerceApp.odm.setDb(db);

const warePure = {
  name: string(),
  brand: optional(string()),
  price: number(),
};

const wareTypePure = {
  name: string(),
  description: string(),
};

const wareInRel: Record<string, InRelation> = {
  wareType: {
    schemaName: "wareType",
    type: "one",
  },
};

const wareOutRel = {};

const wareTypeInRel: Record<string, InRelation> = {};

const wareTypeOutRel: Record<string, OutRelation> = {
  wares: {
    schemaName: "ware",
    number: 50,
    sort: { field: "_id", order: "desc" },
  },
};

const wares = ecommerceApp.odm.setModel(
  "ware",
  warePure,
  wareInRel,
  wareOutRel,
);
const wareTypes = ecommerceApp.odm.setModel(
  "wareType",
  wareTypePure,
  wareTypeInRel,
  wareTypeOutRel,
);

const addWareValidator = () => {
  return object({
    set: object(warePure),
    get: ecommerceApp.schemas.selectStruct("ware", { country: 1 }),
  });
};

const addWare: ActFn = async (body) => {
  const createdWare = await wares.insertOne(body.details.set);
  return await wares.findOne({ _id: createdWare }, body.details.get);
};

ecommerceApp.acts.setAct({
  type: "dynamic",
  schema: "ware",
  actName: "addWare",
  validator: addWareValidator(),
  fn: addWare,
});

const addWareTypeValidator = () => {
  return object({
    set: object(wareTypePure),
    get: ecommerceApp.schemas.selectStruct("wareType", 2),
  });
};

const addWareType: ActFn = async (body) => {
  const createdWareType = await wareTypes.insertOne(body.details.set);
  return await wareTypes.findOne({ _id: createdWareType }, body.details.get);
};

ecommerceApp.acts.setAct({
  type: "dynamic",
  schema: "wareType",
  actName: "addWareType",
  validator: addWareTypeValidator(),
  fn: addWareType,
});

ecommerceApp.runServer({ port: 8585, typeGeneration: true, playground: false });
```

now we have to server one for `core` in `port: 8080` and another for `ecommerce` in `port: 8585`.

let's implement `ecommerce` as a microservice in `core`. it's very easy just add this line of code before `coreApp.runServer(...`.

```typescript
coreApp.acts.setService("ecommerce", "http://localhost:8585/lesan");
```

now execute `deno run -A mod.ts` in both `core/` and `ecommerce/` folder until see this log :

on `core/` :

```bash
HTTP webserver running. Access it at: http://localhost:8080/
```

and on `ecommerce/` :

```bash
HTTP webserver running. Access it at: http://localhost:8585/
```

you can now send an `HTTP POST` request for adding wareType which belongs to `ecommerce` service on the `http://localhost:8585/lesan` address with this `JSON` on the request body :

```JSON
{
  "contents": "dynamic",
  "wants": {
    "model": "wareType",
    "act": "addWareType"
  },
  "details": {
    "set": {
      "name": "digital",
      "description": "digital product include phone and ..."
    },
    "get": {
      "name": 1
    }
  }
}
```

and even add wareType by sending an `HTTP POST` request to `http://localhost:8080/lesan` which is for `core` service with this `JSON` on request body :

```bash
{
  "service": "ecommerce",
  "contents": "dynamic",
  "wants": {
    "model": "wareType",
    "act": "addWareType"
  },
  "details": {
    "set": {
      "name": "digital",
      "description": "digital product include phone and ..."
    },
    "get": {
      "name": 1
    }
  }
}
```

and even better you can export all `ecommerce` actions with just one line of code. so please add this line before `ecommerceApp.runServer(...` in `ecommerce/mod.ts` and comment `runServer` line

```typescript
export const ecommerceActs = ecommerceApp.acts.getMainActs();
// ecommerceApp.runServer({ port: 8585, typeGeneration: true, playground: false });
```

now import ecommerceActs in `core/mod.ts`:

```typescript
import { ecommerceActs } from "../ecommerce/mod.ts";
```

and change `coreApp.acts.setService` to :

```typescript
coreApp.acts.setService("ecommerce", ecommerceActs);
```

now we have all ecommerce actions without running ecommerce server and sending `addWareType` request to the `core` service for creating `wareType`.

if you want to see your actions just log this line of code in anywhere of your code :

```typescript
const acts = coreApp.acts.getAtcsWithServices();

console.log();
console.info({ acts }, " ------ ");
console.log();
```

#### Documantation is comming ...
