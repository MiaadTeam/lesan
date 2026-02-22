import { lesan } from "../../src/lesan.ts";
import { object, string } from "../../src/npmDeps.ts";

const app = lesan();

// Simple JSON response endpoint
app.acts.setAct({
  schema: "benchmark",
  actName: "hello",
  validator: object({}),
  fn: () => ({ message: "Hello World" }),
});

// Simulated async task endpoint
app.acts.setAct({
  schema: "benchmark",
  actName: "asyncTask",
  validator: object({}),
  fn: async () => {
    await new Promise((resolve) => setTimeout(resolve, 10));
    return { message: "Async Task Complete" };
  },
});

// Echo endpoint to test payload parsing
app.acts.setAct({
  schema: "benchmark",
  actName: "echo",
  validator: object({ text: string() }),
  fn: ({ set }: { set: { text: string } }) => ({ message: set.text }),
});

const port = 8080;

console.log(`Starting Lesan benchmark server on port ${port}...`);

app.runServer({
  port,
  playground: false,
  typeGeneration: false,
});
