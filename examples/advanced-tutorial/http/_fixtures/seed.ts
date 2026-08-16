import { MongoClient } from "npm:mongodb@^6.3.0";

const MONGO_URI = Deno.env.get("MONGO_URI") || "mongodb://127.0.0.1:27017/";
const DB_NAME = "advancedTutorial";

const client = new MongoClient(MONGO_URI);
await client.connect();

const db = client.db(DB_NAME);
await db.dropDatabase();

const encoder = new TextEncoder();
const toHex = (buffer: ArrayBuffer) =>
  [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, "0")).join(
    "",
  );

const digest = await crypto.subtle.digest(
  "SHA-256",
  encoder.encode("GhostPass123!"),
);

await db.collection("user").insertOne({
  first_name: "Ghost",
  last_name: "Admin",
  email: "ghost@medsupply.io",
  password: toHex(digest),
  position: "System Superuser",
  isActive: true,
  isGhost: true,
  features: [],
  roles: [{ roleId: crypto.randomUUID(), name: "Manager" }],
  createdAt: new Date(),
  updatedAt: new Date(),
});

await client.close();
console.log(
  "Seeded ghost admin: ghost@medsupply.io / GhostPass123!",
);
