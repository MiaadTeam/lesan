# Why **Lesan**?

Even though _**NoSQL**_ is very fast, its complexities are very troublesome for large-scale projects. On the other hand, _**GraphQL**_ shines in client-server connectivity but it has several weaknesses and is somewhat complex, adding another layer of complexity to the project. That’s why we created **LESAN**.

### Look below code:

Create a file called `mod.ts` and paste the code below into it:

```typescript
import {
  ActFn,
  InRelation,
  lesan,
  MongoClient,
  number,
  object,
  ObjectId,
  optional,
  OutRelation,
  size,
  string,
} from "https://deno.land/x/lesan@vx.x.x/mod.ts";

const coreApp = lesan();

const client = new MongoClient();

await client.connect("mongodb://127.0.0.1:27017/");
const db = client.database("sample");

coreApp.odm.setDb(db);

// ================== MODEL SECTION ==================
// ------------------ Country Model ------------------
const countryPure = {
  name: string(),
  description: string(),
};
const countryInRel: Record<string, InRelation> = {};
const countryOutRel: Record<string, OutRelation> = {
  users: {
    schemaName: "user",
    number: 50,
    sort: { field: "_id", order: "desc", type: "objectId" },
  },
};
const countries = coreApp.odm.setModel(
  "country",
  countryPure,
  countryInRel,
  countryOutRel,
);

// ------------------ User Model ------------------
const userPure = {
  name: string(),
  address: optional(string()),
  age: number(),
};
const userInRel: Record<string, InRelation> = {
  country: {
    schemaName: "country",
    type: "one",
    optional: false,
  },
};

const userOutRel = {};
const users = coreApp.odm.setModel("user", userPure, userInRel, userOutRel);

// ================== MODEL SECTION ==================
// ------------------ Country Founctions ------------------
const addCountryValidator = () => {
  return object({
    set: object(countryPure),
    get: coreApp.schemas.selectStruct("country", { users: 1 }),
  });
};

const addCountry: ActFn = async (body) =>
  await countries.insertOne({ doc: body.details.set, get: body.details.get });

coreApp.acts.setAct({
  type: "dynamic",
  schema: "country",
  actName: "addCountry",
  validator: addCountryValidator(),
  fn: addCountry,
});

// ------------------ User Founctions ------------------
const addUserValidator = () => {
  return object({
    set: object({ ...userPure, country: string() }),
    get: coreApp.schemas.selectStruct("user", 1),
  });
};
const addUser: ActFn = async (body) => {
  const { country, ...rest } = body.details.set;
  return await users.insertOne({
    doc: rest,
    get: body.details.get,
    relation: { country: new ObjectId(country) },
  });
};
coreApp.acts.setAct({
  type: "dynamic",
  schema: "user",
  actName: "addUser",
  validator: addUserValidator(),
  fn: addUser,
});

const getUsersValidator = () => {
  return object({
    set: object({
      page: number(),
      take: number(),
      countryId: optional(size(string(), 24)),
    }),
    get: coreApp.schemas.selectStruct("user", { country: 1 }),
  });
};
const getUsers: ActFn = async (body) => {
  const {
    set: {
      page,
      take,
      countryId,
    },
    get,
  } = body.details;
  const pipline = [];

  pipline.push({ $limit: take });
  pipline.push({ $skip: (page - 1) * take });
  countryId &&
    pipline.push({ $match: { "country._id": new ObjectId(countryId) } });

  return await users.aggregation({
    pipline,
    get,
  });
};

coreApp.acts.setAct({
  type: "dynamic",
  schema: "user",
  actName: "getUsers",
  validator: getUsersValidator(),
  fn: getUsers,
});

coreApp.runServer({ port: 8080, typeGeneration: false, playground: true });
```

> Please replace `x.x.x` in the import link with the latest version in [releases](https://github.com/MiaadTeam/lesan/releases)

Now run this command in the terminal:

```bash
deno run -A mod.ts
```

You should see this messsage:

```bash
HTTP webserver running.
please send a post request to http://localhost:8080/lesan
you can visit playground on http://localhost:8080/playground

Listening on http://localhost:8080/
```

Now you can visit the playground at `http://localhost:8080/playground` and send requests to the server for `addCountry`, `addUser`, and `getUsers`.
<img width="1672" alt="Screen Shot 1402-04-26 at 20 47 05" src="https://github.com/MiaadTeam/lesan/assets/6236123/1486687b-b695-46da-9f67-334bf719cf8a">

alternativly you can send post request to `http://localhost:8080/lesan` with `postman` include the following in JSON format inside the body in order to retrieve the desired data:

```JSON
{
  "contents": "dynamic",
  "wants": {
    "model": "country",
    "act": "addCountry"
  },
  "details": {
    "set": {
      "name": "Iran",
      "description": "A beautiful and civilized country"
    },
    "get": {
      "_id": 1,
      "name": 1,
      "description": 1,
      "users": {
        "_id": 1,
        "name": 1,
        "address": 1,
        "age": 1
      }
    }
  }
}
```

![Screen Shot 1402-04-25 at 18 24 16](https://github.com/MiaadTeam/lesan/assets/6236123/7e9c7c93-cf08-4120-9c44-df93475c108f)

We handle all relationships between the data and `embed` everything. You can also control the level of penetration into the `action get` depth. On the `client-side`, you can describe what you want and get back exactly what you described.
