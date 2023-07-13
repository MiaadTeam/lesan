# Starting work with Lesan

Let's create a simple web server with deno:

You can find a complete implementation of this example [here](https://github.com/MiaadTeam/lesan/tree/main/examples/simpleMircoservice).

First of all, create a mod.ts file and import the latest version of lesan and assign it to a constant variable called coreApp:

```typescript
import { lesan } from "https://deno.land/x/lesan@vx.xx/mod.ts";

const coreApp = lesan();
```

###### Please select the final version of Lusan from [here](https://deno.land/x/lusan) and replace xxx with it.

Before anything, let's connect a database to our app, so add a new MongoDb instance to your code.

First, import MongoClient from lesan:

```typescript
import { lesan, MongoClient } from "https://deno.land/x/lesan@vx.xx/mod.ts";
```

and create a database instance via new MongoClient:

```typescript
const client = new MongoClient();

await client.connect("mongodb://localhost:27017/${your_database_name}");

const db = client.database("core");
```

We should set up the ODM with a new database instance:

```typescript
coreApp.odm.setDb(db);
```

As we have said before, to create a model, we need to define its pure fields with the name of pure and the relations of that model in two types of inrelation and outrelation.

pure is merely a simple object with key of string and a value similar to [SuperStruct](https://github.com/ianstormtaylor/superstruct) structure.

inrelation represents an **array** or a **single** pure object of another MongoDb collection, we want to embed in the current document. In SQL modeling, for every relation we save the key or id which we call inrelation. As an example, we have a blogPost which has a creator from the user collection and we save the pure model of the user in the blogPost collection.

outrelation specifies a relation for a specific collection but it could contain an unbound set of data that could outgrow the **16MB** limit size of a document in MongoDB. Thus we do not even save its key or id in SQL modeling. For example, we have a user entity who writes many blog posts and we save for example an array of pure objects of blogPost in order of the date published for the first pagination in the user collection containing the latest 50 blog posts.

Now let's get our hands dirty and create the user and country schemas:

First import string number optional InRelation and OutRelation from lesan :

```typescript
import {
  InRelation,
  lesan,
  MongoClient,
  number,
  optional,
  OutRelation,
  string,
} from "https://deno.land/x/lesan@vx.xx/mod.ts";
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
    optional: false,
  },
};

const userOutRel = {};

const countryInRel: Record<string, InRelation> = {};

const countryOutRel: Record<string, OutRelation> = {
  users: {
    schemaName: "user",
    number: 50,
    sort: { field: "_id", order: "desc", type: "objectId" },
  },
};
```

We should set the schema in coreApp:

```typescript
const users = coreApp.odm.setModel("user", userPure, userInRel, userOutRel);
const countries = coreApp.odm.setModel(
  "country",
  countryPure,
  countryInRel,
  countryOutRel
);
```

At this point, we need to have some endpoints to call from an HTTP request, so let's write some endpoints.

For creating an endpoint, we need to set the act from coreApp.acts.setAct function which requires type schema actName validator and fn.

- The type is just an enum of two possible options namely, static and dynamic.
- schema is the name of the model to which we want to set an action.
- actName is just a simple string to identify the act.
- a validator is a superstruct object which is called before the act fn calling and validation the given data.
- validator includes set and get objects.
- fn is the function we call when a request for it arrives.

The following is an one example of act:

Before creating act, import object and ActFn from lesan:

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
} from "https://deno.land/x/lesan@vx.xx/mod.ts";
```

and the act will be in the following form:

```typescript
const addUserValidator = () => {
  return object({
    set: object(userPure),
    get: coreApp.schemas.selectStruct("user", { country: 1 }),
  });
};

const addUser: ActFn = async (body) =>
  await users.insertOne({
    doc: body.details.set,
    get: body.details.get,
  });

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

When typeGeneration is set to true, it creates a **declarations** folder with some typescript typings we need in the project.

Now run this command in the terminal:

```typescript
deno run -A mod.ts
```

If the web server comes up correctly, you will see the following message:

We are all set and now we can send a POST HTTP request to http://localhost:8080/lesan, include the following in JSON format inside the body in order to retrieve the desired data:

```typescript
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

The working of projection for retrieving data is fundamentally based on [MongoDb Projection](https://www.mongodb.com/docs/manual/tutorial/project-fields-from-query-results/).

The coreApp.schemas.selectStruct function can limit the projection based on your schema relationships and prevent an infinite loop in retrieving data.

After running the server with typeGeneration set to true, the declarations folder is created and you can import userInp from generated type and make coreApp.schemas.selectStruct<userInp>("user", { country: 1 }) type safe:

```typescript
import { userInp } from "./declarations/selectInp.ts";

const addUserValidator = () => {
  return object({
    set: object(userPure),
    get: coreApp.schemas.selectStruct<userInp>("user", { country: 1 }),
  });
};
```

The following is the full example of what we have discussed so far:

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
} from "https://deno.land/x/lesan@vx.xx/mod.ts";

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
    optional: false,
  },
};

const userOutRel = {};

const countryInRel: Record<string, InRelation> = {};

const countryOutRel: Record<string, OutRelation> = {
  users: {
    schemaName: "user",
    number: 50,
    sort: { field: "_id", order: "desc", type: "objectId" },
  },
};

const users = coreApp.odm.setModel("user", userPure, userInRel, userOutRel);
const countries = coreApp.odm.setModel(
  "country",
  countryPure,
  countryInRel,
  countryOutRel
);

const addUserValidator = () => {
  return object({
    set: object(userPure),
    get: coreApp.schemas.selectStruct("user", { country: 1 }),
  });
};

const addUser: ActFn = async (body) =>
  await users.insertOne({
    doc: body.details.set,
    get: body.details.get,
  });

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
