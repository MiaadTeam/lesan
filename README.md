# Lesan is a combination of the web server and MongoDb ODM with some microservice setting

it also has several concepts about arbitrary embedding documents and creating SSG contents

### let's create a simple web server :

first of all create a ts file called `mod.ts` and import last version of `lesan` and assign a constant call `coreApp` to it's :

```typescript
import { lesan } from "https://deno.land/x/lesan@0.0.58/mod.ts";

const coreApp = lesan();
```

before anything lets connect `database` to our app, so please adding new `MongoDb` instance :

first add `MongoClient` from `lesan` :

```typescript
import { lesan, MongoClient } from "https://deno.land/x/lesan@0.0.58/mod.ts";
```

and create `new MongoClient` :

```typescript
const client = new MongoClient();
await client.connect("mongodb://localhost:27017/arc");
const db = client.database("core");
```

we should setup `ODM` with new database :

```typescript
coreApp.odm.setDb(db);
```

we have three concept for every model in databse : `pure` and `inrelation` and `outrelation`.

`pure` is just simple object with `key` of `string` and `value` of [SuperStruct](https://github.com/ianstormtaylor/superstruct) structure.

`inrelation` is a `array` or `single` `pure` object of another `MongoDb collection` we wants to embedding. in `SQL` paradim every relations we saved the `key` or `id` of it we called `inrelation`. for example we have a `blogPost` which it has creator from `user` `collection`. and we save `pure` of `user` in `blogPost` `collection`.

`outrelation` is a relations for `collection` but it is very huage and we do not even save `key` or `id` of it in `SQL` paradim. for example we have a `user` `collection` which he/she write many `blogPost` and we save for example 50 `array` `pure` object of `blogPost` in order of date sort for first pagination in `user` `collection`.

so lets create `user` and `country` schema :

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
} from "https://deno.land/x/lesan@0.0.57/mod.ts";
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

at this point we need to have some endpoint to calling from http request, so lets go to write some endpoint.

for creating end point we need to set `act` from `coreApp.acts.setAct` function which require `type` `schema` `actName` `validator` and `fn`.

the `type` is just enum of `static` and `dynamic`.
`schema` is the model name we wants to set action to it.
`actName` is just a simple string for indetify `act`.
`validator` is a superstruct `object` which is call before `act` `fn` calling and validatin the giving data. `validator` include `set` and `get` `object`.
`fn` is the function we call when request for it is arrived.

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
} from "https://deno.land/x/lesan@0.0.57/mod.ts";
```

and import `userInp` from generated type when running server :

```typescript
import { userInp } from "./declarations/selectInp.ts";
```

and this is `act` :

```typescript
const addUserValidator = () => {
  return object({
    set: object(userPure),
    get: coreApp.schemas.selectStruct<userInp>("user", { country: 1 }),
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

the last thing we need is just run the web server :

```typescript
coreApp.runServer({ port: 8080, typeGeneration: true, playground: false });
```

when `typeGeneration` is set to `true` it's create a `declarations` folder with some typescript type we need in project.

now run the in termial with :

```bash
deno rum -A mod.ts
```

that's all now we can send a `POST` https request to `http://localhost:8080/lesan` whit this `JSON` in body to get data :

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

the `coreApp.schemas.selectStruct` funtions can limit this projection based on your schema relation and prevent to cycling in retive data

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
} from "https://deno.land/x/lesan@0.0.57/mod.ts";
import { ecommerceActs } from "../ecommerce/mod.ts";
import { countryInp, userInp } from "./declarations/selectInp.ts";

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
    get: coreApp.schemas.selectStruct<userInp>("user", { country: 1 }),
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
    get: coreApp.schemas.selectStruct<countryInp>("country", { users: 1 }),
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

coreApp.acts.setService("ecommerce", ecommerceActs);

coreApp.runServer({ port: 8080, typeGeneration: true, playground: false });
```

#### Documantation is comming ...
