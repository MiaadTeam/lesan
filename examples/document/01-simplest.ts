import { lesan, MongoClient } from "../../mod.ts";

const coreApp = lesan();

const client = await new MongoClient("mongodb://127.0.0.1:27017/").connect();

const db = client.db("documentExamples");

coreApp.odm.setDb(db);

coreApp.runServer({ port: 1366, typeGeneration: false, playground: true });
