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
  const acts = ecommerceApp.acts.getAtcsWithServices();

  /*
  *  @LOG @DEBUG @INFO
  *  This log written by ::==> {{ syd }}
  *
  *  Please remove your log after debugging
  */
  console.group("acts ------ inside addWare");
  console.log(" ============= ");
  console.log();
  console.info({ acts }, " ------ ");
  console.log();
  console.log(" ============= ");
  console.groupEnd();
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

export const ecommerceActs = ecommerceApp.acts.getMainActs();
// ecommerceApp.runServer({ port: 8585, typeGeneration: true, playground: false });
