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

  /*
  *  @LOG @DEBUG @INFO
  *  This log written by ::==> {{ syd }}
  *
  *  Please remove your log after debugging
  */
  console.group("acts ------ inside addUser");
  console.log(" ============= ");
  console.log();
  console.info({ acts }, " ------ ");
  console.log();
  console.log(" ============= ");
  console.groupEnd();

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
