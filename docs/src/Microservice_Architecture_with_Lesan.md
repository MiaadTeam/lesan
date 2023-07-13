# Microservice Architecture with Lesan:

Lesan provides the capability to create independent services which follow the distributed architecture for your system.

Follow the below instructions in order to create a microservice example:

Move the mod.ts file to core/mod.ts and create another file in ecommerce/mod.ts and place the following code in it:

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
  wareOutRel
);
const wareTypes = ecommerceApp.odm.setModel(
  "wareType",
  wareTypePure,
  wareTypeInRel,
  wareTypeOutRel
);

const addWareValidator = () => {
  return object({
    set: object(warePure),
    get: ecommerceApp.schemas.selectStruct("ware", { country: 1 }),
  });
};

const addWare: ActFn = async (body) =>
  await wares.insertOne({
    doc: body.details.set,
    get: body.details.get,
  });

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

const addWareType: ActFn = async (body) =>
  await wareTypes.insertOne({
    doc: body.details.set,
    get: body.details.get,
  });

ecommerceApp.acts.setAct({
  type: "dynamic",
  schema: "wareType",
  actName: "addWareType",
  validator: addWareTypeValidator(),
  fn: addWareType,
});

ecommerceApp.runServer({ port: 8282, typeGeneration: true, playground: false });
```

Now we have to create servers, one for the core on port: 8080 and another server for ecommerce on port: 8585.

Then let's implement ecommerce as a microservice in core. It can be done quite easily by just adding these lines of code before coreApp.runServer(...).

```typescript
coreApp.acts.setService("ecommerce", "http://localhost:8282/lesan");
```

Now execute deno run -A mod.ts in both of core/ and ecommerce/ folders until you could see the following message in your terminal:

/on core :

```typescript
HTTP webserver running. Access it at: http://localhost:8080/
```

and on /ecommerce :

```typescript
HTTP webserver running. Access it at: http://localhost:8282/
```

You can now send an HTTP POST request for adding wareType which belongs to the ecommerce service on the http://localhost:8585/lesan endpoint with the following JSON in the request body:

```typescript
{
  "contents": "dynamic",
  "wants": {
    "model": "wareType",
    "act": "addWareType"
  },
  "details": {
    "set": {
      "name": "digital",
      "description": "digital products include phone and ..."
    },
    "get": {
      "name": 1
    }
  }
}
```

And even add wareType by sending an HTTP POST request to http://localhost:8080/lesan which is for core service with this JSON on request body :

```typescript
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
      "description": "digital products include phone and ..."
    },
    "get": {
      "name": 1
    }
  }
}
```

and even better you can export all ecommerce actions with just one line of code. Thus, add the below code before `ecommerceApp.runServer(...)` in `ecommerce/mod.ts` and comment the runServer line.

```typescript
export const ecommerceActs = ecommerceApp.acts.getMainActs();
// ecommerceApp.runServer({ port: 8585, typeGeneration: true, playground: false });
```

Now import ecommerceActs in core/mod.ts:

```typescript
import { ecommerceActs } from "../ecommerce/mod.ts";
```

and change coreApp.acts.setService to :

```typescript
coreApp.acts.setService("ecommerce", ecommerceActs);
```

Now we have all the ecommerce actions, even without running the ecommerce server and sending addWareType request to the core service for creating wareType.

If you want to see your actions, simply use this line of code anywhere in your code:

```typescript
const acts = coreApp.acts.getAtcsWithServices();

console.log();
console.info({ acts }, " ------ ");
console.log();
```
