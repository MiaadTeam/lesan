import { MongoClient } from "./utils/deps.ts";

const client = new MongoClient();
// await client.connect("mongodb://localhost:27017");
const db = await client.connect("mongodb://127.0.0.1:27017/arc");
export default db;
