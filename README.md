# Lesan is a combination of the web server and MongoDb ODM with some microservice infrastructure:

It also has employed several concepts about arbitrary embedding documents and creating **SSG** contents.

### Let's create a simple web server:

You can find complete implementation of this example [here](https://github.com/MiaadTeam/lesan/tree/main/examples/simpleMircoservice)

First of all, create a ts file called `mod.ts` and import the last version of `lesan` and assign a constant called `coreApp`:

```typescript
import { lesan } from "https://deno.land/x/lesan@vx.x.x/mod.ts";

const coreApp = lesan();
```

> Please replace `x.x.x` in the import link with the latest version in [releases](https://github.com/MiaadTeam/lesan/releases)

Before anything let's connect a `database` to our app, so add a new `MongoDb` instance.

First add `MongoClient` from `lesan`:

```typescript
import { lesan, MongoClient } from "https://deno.land/x/lesan@vx.x.x/mod.ts";
```

and create `new MongoClient` :

```typescript
const client = new MongoClient();

await client.connect("mongodb://localhost:27017/arc");

const db = client.database("core");
```

We should set up the `ODM` with a new database:

```typescript
coreApp.odm.setDb(db);
```

Conceptually we have three important concepts for every model in the database, namely: `pure` and `inrelation` and `outrelation`.

`pure` is merely a simple object with `key` of `string` and a `value` similar to [SuperStruct](https://github.com/ianstormtaylor/superstruct) structure.

`inrelation` represents an **array** or ***single*** `pure` object of another `MongoDb collection`, we want to embed in the current document. In `SQL` modeling, for every relation we save the `key` or `id` which we call `inrelation`. As an example, we have a `blogPost` which has a creator from `user` collection and we save `pure` model of the `user` in `blogPost` collection.

`outrelation` specifies a relation for a specific `collection` but it could contain a massive set of data, thus we do not even save its `key` or `id` in `SQL` modeling. For example, we have a `user` entity who writes many blog posts and we save for example an `array` of `pure` object of `blogPost` in order of the date published for the first pagination in `user` `collection` containing the latest 50 blog posts.

Now let's get our hands dirty and create the `user` and `country` schemas:

First import `string` `number` `optional` `InRelation` and `OutRelation` from `lesan` :

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

and then create the schema shapes:

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

We should set the schema in `coreApp`:

```typescript
const users = coreApp.odm.setModel("user", userPure, userInRel, userOutRel);
const countries = coreApp.odm.setModel(
  "country",
  countryPure,
  countryInRel,
  countryOutRel,
);
```

At this point, we need to have some endpoints to call from an HTTP request, so let's write some endpoints.

For creating an end point, we need to set `act` from `coreApp.acts.setAct` function which requires `type` `schema` `actName` `validator` and `fn`.

- The `type` is just an enum of two possible options namely, `static` and `dynamic`.
- `schema` is the name of the model to which we want to set an action.
- `actName` is just a simple string to identify the `act`.
- `validator` is a superstruct `object` which is called before `act` `fn` calling and validation the giving data.  
- `validator` includes `set` and `get` objects.
- `fn` is the function we call when a request for it arrives.

The following is an one example of `act`:

Before creating `act`, import `object` and `ActFn` from `lesan`:

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

and the `act` will be in the following form:

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

The last thing we need is just to run the web server:

```typescript
coreApp.runServer({ port: 8080, typeGeneration: true, playground: false });
```

When `typeGeneration` is set to `true`, it creates a **declarations** folder with some typescript typings we need in the project.

Now run this command in the terminal:

```bash
deno rum -A mod.ts
```

We are all set and now we can send a `POST` HTTP request to `http://localhost:8080/lesan`, include the following in `JSON` format inside the body in order to retrieve the desired data:

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

The `projection` of retrieving data is fundamentally based on [MongoDb Projection](https://www.mongodb.com/docs/manual/tutorial/project-fields-from-query-results/).

The `coreApp.schemas.selectStruct` function can limit the projection based on your schema relationships and prevent an infinite loop in retrieving data.

After running the server with `typeGeneration` set to true, the `declarations` folder is created now you can

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

### The following is the full example of what we have discussed so far:

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

### Microservice Architecture with Lesan:

Move the `mod.ts` file to `core/mod.ts` and create another file in `ecommerce/mod.ts` and place the following code in it:

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

Now we have to create servers, one for the `core` on `port: 8080` and another for `ecommerce` on `port: 8585`.

Then let's implement `ecommerce` as a microservice in `core`. It's can be done quitely easy by just adding this lines of code before `coreApp.runServer(...)`.

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

You can now send an `HTTP POST` request for adding wareType which belongs to the `ecommerce` service on the `http://localhost:8585/lesan` endpoint with the following `JSON` in the request body:

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
