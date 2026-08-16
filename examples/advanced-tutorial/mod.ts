import { lesan, MongoClient } from "lesan";
import {
  budgetLines,
  createInventoryIndex,
  createUserTextIndex,
  files,
  inventories,
  organizations,
  processes,
  processSteps,
  products,
  purchaseOrders,
  stepApprovals,
  stockMovements,
  stores,
  tags,
  tenders,
  units,
  users,
} from "@model";
import { functionsSetup } from "./src/mod.ts";

const MONGO_URI = Deno.env.get("MONGO_URI") || "mongodb://127.0.0.1:27017/";
const APP_PORT = Deno.env.get("APP_PORT") || 1380;
const ENV = Deno.env.get("ENV") || "development";

export const coreApp = lesan();
const client = await new MongoClient(MONGO_URI).connect();
const db = client.db("advancedTutorial");
coreApp.odm.setDb(db);

export const user = users();
export const file = files();
export const tag = tags();
export const organization = organizations();
export const unit = units();
export const process = processes();
export const processStep = processSteps();
export const product = products();
export const store = stores();
export const inventory = inventories();
export const stockMovement = stockMovements();
export const purchaseOrder = purchaseOrders();
export const stepApproval = stepApprovals();
export const budgetLine = budgetLines();
export const tender = tenders();

export const { setAct, setService, getAtcsWithServices } = coreApp.acts;

export const { selectStruct, getSchemas } = coreApp.schemas;

functionsSetup();

createInventoryIndex();
createUserTextIndex();

coreApp.runServer({
  port: Number(APP_PORT),
  typeGeneration: true,
  playground: ENV === "development" ? true : false,
  staticPath: ["/uploads"],
  cors: ["http://localhost:3000"],
});
