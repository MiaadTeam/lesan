import { ActFn, lesan, number, object, string } from "lesan";
import { MongoClient } from "mongodb";

// 1. Initialize Lesan
const app = lesan();

// 2. Connect to MongoDB
const client = await new MongoClient("mongodb://127.0.0.1:27017/").connect();
const db = client.db("lesan_deno_example");
app.odm.setDb(db);

// 3. Define a Model
const userPure = {
  name: string(),
  age: number(),
  email: string(),
};

const users = app.odm.newModel("user", userPure, {});

// 4. Define an Action (Route)
const addUserValidator = () => {
  return object({
    set: object(userPure),
    get: app.schemas.selectStruct("user", 1),
  });
};

const addUser: ActFn = async (body) => {
  const { name, age, email } = body.details.set;
  return await users.insertOne({
    doc: { name, age, email },
    projection: body.details.get,
  });
};

app.acts.setAct({
  schema: "user",
  actName: "addUser",
  validator: addUserValidator(),
  fn: addUser,
});

// 5. Run the Server
app.runServer({
  port: 8082,
  playground: true,
  typeGeneration: true,
});
