<div align="center">
  <img src="./pages/src/img/besmelah.jpg" alt="بسم الله الرحمن الرحیم">
</div>

# Why **Lesan**?

Even though _**NoSQL**_ is very fast, its complexities are very troublesome for large-scale projects. On the other hand, _**GraphQL**_ shines in client-server connectivity but it has several weaknesses and is somewhat complex, adding another layer of complexity to the project. That’s why we created **LESAN**.

🚀 **Now Cross-Platform!** Lesan natively supports **Node.js**, **Bun**, and **Deno** with zero configuration. Write your code once and run it anywhere!

<a href="https://youtu.be/FzMNIGanXSQ" target="_blank">This video</a> is an introductory tutorial on **Lesan** framework in Farsi language.

# Benchmarks

<div align="center">
  <img src="chart.svg" width="800" height="180" alt="benchmark-animation">
</div>

We use this formula to calculate the difference : (B - A) ÷ A \* 100  
 As you see on the chart:

- [Lesan](https://github.com/MiaadTeam/lesan) return data to client `1168%` faster than the `prisma-express-rest`. Which uses `postgres` as a database.
- [Lesan](https://github.com/MiaadTeam/lesan) return data to client `1417%` faster than the `prisma-express-graphql`. Which uses `postgres` as a database.
- [Lesan](https://github.com/MiaadTeam/lesan) return data to client `4435%` faster than the `mongoose-express-rest` (Note that we did not sort in this query)
- [Lesan](https://github.com/MiaadTeam/lesan) return data to client `72289%` faster than the `mongo-express-rest` (Note that we did not sort in this query)
- [Lesan](https://github.com/MiaadTeam/lesan) return data to client `298971%` faster than the `mongoose-express-rest` (used sortby)

**Maybe we created the most performant framework in the world!** [see more detailed benchmark](https://github.com/MiaadTeam/benchmark)

_Note: With our new cross-platform architecture, Lesan achieves over 10,000 requests per second on Bun and Deno! Check out our [Cross-Platform Benchmarks](./docs/benchmarks.md)._

# Documentation

- [Introduction](https://miaadteam.github.io/lesan/introduction.html)
- [Installation](https://miaadteam.github.io/lesan/installation.html)
- [Getting start](https://miaadteam.github.io/lesan/getting_start.html)
- [Advanced Guide](https://miaadteam.github.io/lesan/an_advanced_project.html)
- [Lesan Philosophy](https://miaadteam.github.io/lesan/Receiving_Data.html)
- [Structures](https://miaadteam.github.io/lesan/Schemas.html)
- [API Reference](https://miaadteam.github.io/lesan/api/lesan_fn.html)
- [Types](https://miaadteam.github.io/lesan/api/types/types.html)

# Installation

Lesan is designed to work seamlessly across all major JavaScript runtimes.

### Node.js

```bash
npm install lesan mongodb
```

### Bun

```bash
bun add lesan mongodb
```

### Deno

```typescript
import { lesan } from "npm:lesan";
import { MongoClient } from "npm:mongodb";
```

# A little trip

### Look at the code below:

Create a file called `main.ts` (or `main.js`) and paste the code below into it:

```typescript
import {
  ActFn,
  Document,
  Filter,
  lesan,
  number,
  object,
  ObjectId,
  optional,
  size,
  string,
} from "lesan"; // Use "npm:lesan" for Deno
import { MongoClient } from "mongodb"; // Use "npm:mongodb" for Deno

const coreApp = lesan();

const client = await new MongoClient("mongodb://127.0.0.1:27017/").connect();
const db = client.db("civil");

coreApp.odm.setDb(db);

// ================== MODEL SECTION ==================
// ------------------ Country Model ------------------
const countryPure = {
  name: string(),
  population: number(),
  abb: string(),
};
const countryRelations = {};
const countries = coreApp.odm.newModel("country", countryPure, countryRelations);

// ------------------ User Model ------------------
const userPure = {
  name: string(),
  age: number(),
};
const users = coreApp.odm.newModel("user", userPure, {
  country: {
    optional: false,
    schemaName: "country",
    type: "single",
    relatedRelations: {
      users: {
        type: "multiple",
        limit: 50,
        sort: {
          field: "_id",
          order: "desc",
        },
      },
    },
  },
});

// ================== FUNCTIONS SECTION ==================
// ------------------ Add Country ------------------
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

// ------------------ Get Countries  ------------------
const getCountriesValidator = () => {
  return object({
    set: object({
      page: number(),
      limit: number(),
    }),
    get: coreApp.schemas.selectStruct("country", 1),
  });
};

const getCountries: ActFn = async (body) => {
  let {
    set: { page, limit },
    get,
  } = body.details;

  page = page || 1;
  limit = limit || 50;
  const skip = limit * (page - 1);

  return await countries.find({ projection: get, filters: {} }).skip(skip).limit(limit).toArray();
};

coreApp.acts.setAct({
  schema: "country",
  actName: "getCountries",
  validator: getCountriesValidator(),
  fn: getCountries,
});

// --------------------- Add User ----------------------
const addUserValidator = () => {
  return object({
    set: object({
      ...userPure,
      country: string(),
    }),
    get: coreApp.schemas.selectStruct("user", 1),
  });
};
const addUser: ActFn = async (body) => {
  const { country, name, age } = body.details.set;

  return await users.insertOne({
    doc: { name, age },
    projection: body.details.get,
    relations: {
      country: {
        _ids: new ObjectId(country),
        relatedRelations: {
          users: true,
        },
      },
    },
  });
};

coreApp.acts.setAct({
  schema: "user",
  actName: "addUser",
  validator: addUserValidator(),
  fn: addUser,
});

// --------------------- Get Users ----------------------
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
  let {
    set: { page, limit, countryId },
    get,
  } = body.details;

  page = page || 1;
  limit = limit || 50;
  const skip = limit * (page - 1);
  const filters: Filter<Document> = {};
  countryId && (filters["country._id"] = new ObjectId(countryId));

  return await users.find({ projection: get, filters }).skip(skip).limit(limit).toArray();
};

coreApp.acts.setAct({
  schema: "user",
  actName: "getUsers",
  validator: getUsersValidator(),
  fn: getUsers,
});

// ================== RUN SECTION ==================
coreApp.runServer({ port: 1366, typeGeneration: false, playground: true });
```

### Run the server

Depending on your runtime, run the following command in your terminal:

**Node.js** (requires `tsx` or similar for TypeScript):

```bash
npx tsx main.ts
```

**Bun**:

```bash
bun run main.ts
```

**Deno**:

```bash
deno run -A main.ts
```

You should see this message:

```bash
HTTP webserver running.
please send a post request to http://localhost:1366/lesan
you can visit playground on http://localhost:1366/playground

Listening on http://localhost:1366/
```

Now you can visit the playground at `http://localhost:1366/playground` and send requests to the server for `addCountry`, `addUser`, and `getUsers`.
<img width="1672" alt="Screen Shot 1402-04-26 at 20 47 05" src="https://github.com/MiaadTeam/lesan/assets/6236123/7edb3be1-6180-4f3e-b00c-161aa2c3c8cd">

Alternatively, you can send a POST request to `http://localhost:1366/lesan` with `postman` including the following in JSON format inside the body in order to retrieve the desired data:

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

![Screen Shot 1402-04-25 at 18 24 16](https://github.com/MiaadTeam/lesan/assets/6236123/7e9c7c93-cf08-4120-9c44-df93475c108f)

We handle all relationships between the data and `embed` everything. You can also control the level of penetration into the `action get` depth. On the `client-side`, you can describe what you want and get back exactly what you described.

# Contributors

<a href="https://github.com/MiaadTeam/lesan/graphs/contributors">
<img src="https://contrib.rocks/image?repo=MiaadTeam/lesan" />
</a>

# Many thanks to those who supported us

<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/MCKH03"><img src="https://avatars.githubusercontent.com/u/127620974?v=4?s=100" width="100px;" alt="Mehrshad Cheshm Khavari"/><br /><sub><b>Mehrshad Cheshm Khavari</b></sub></a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/MahdiRamezani8"><img src="https://avatars.githubusercontent.com/u/110328874?v=4?s=100" width="100px;" alt="Mahdi Ramezani"/><br /><sub><b>Mahdi Ramezani</b></sub></a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/asafaeirad"><img src="https://avatars.githubusercontent.com/u/28571761?v=4?s=100" width="100px;" alt="Alireza Safaierad"/><br /><sub><b>Alireza Safaierad</b></sub></a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/alidavodii"><img src="https://avatars.githubusercontent.com/u/52744305?v=4?s=100" width="100px;" alt="ali davodi"/><br /><sub><b>ali davodi</b></sub></a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/soorenaganji"><img src="https://avatars.githubusercontent.com/u/109369184?v=4?s=100" width="100px;" alt="sorena ganji"/><br /><sub><b>sorena ganji</b></sub></a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://t.me/NodeMaster"><img src="https://github.com/MiaadTeam/lesan/assets/72462171/659d2c0a-6803-46a9-95a5-64f8b5f1affb" width="100px;" alt="Node Master"/><br /><sub><b>Node Master</b></sub></a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/asafaeirad"><img src="https://avatars.githubusercontent.com/u/28571761?v=4" width="100px;" alt="Alireza Safaierad"/><br /><sub><b>Alireza Safaierad</b></sub></a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/erfan-asadi"><img src="https://avatars.githubusercontent.com/u/50593999?v=4?s=100" width="100px;" alt="Erfan Asadi"/><br /><sub><b>Erfan Asadi</b></sub></a></td>
    </tr>
</table>
