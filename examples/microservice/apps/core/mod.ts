import { countries, users } from "../../libs/dbs/schemas/core/mod.ts";
import { lesan, MongoClient } from "./deps.ts";
import { dynamicSetup } from "./src/dynamics/mod.ts";

export const coreApp = lesan();

export const user = users();
export const country = countries();

export const {
  setAct,
  setService,
  getAtcsWithServices,
  getDynamicActs,
} = coreApp.acts;

export const {
  selectStruct,
  getSchemas,
} = coreApp.schemas;

const client = new MongoClient();

// Connecting to a Local Database
await client.connect("mongodb://localhost:27017/");
const db = client.database("arc|core");

setService("ecommerce", "http://localhost:8574/lesan");
// setService("ecommerce", ecommerceMainActs);
coreApp.odm.setDb(db);
dynamicSetup();
coreApp.runServer({ port: 8585, playground: false, typeGeneration: true });
