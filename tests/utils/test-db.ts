import { Db, MongoClient } from "../../src/npmDeps.ts";

let mongod: any = null;
let client: MongoClient | null = null;
let db: Db | null = null;

export async function startTestDb(): Promise<Db> {
  if (!mongod) {
    const mms = await import("mongodb-memory-server");
    const MongoMemoryServer = mms.MongoMemoryServer ||
      (mms.default && mms.default.MongoMemoryServer);
    mongod = await MongoMemoryServer.create({
      binary: {
        version: "6.0.14",
      },
    });
  }

  const uri = mongod.getUri();

  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }

  if (!db) {
    db = client.db("lesan_test_db");
  }

  return db;
}

export async function stopTestDb() {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
  if (mongod) {
    await mongod.stop();
    mongod = null;
  }
}

export async function clearTestDb() {
  if (db) {
    const collections = await db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
    }
  }
}
