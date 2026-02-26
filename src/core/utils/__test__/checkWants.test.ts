import { test } from "../../../../tests/utils/test-runner.ts";
import assert from "node:assert";
import { parsBody } from "../mod.ts";

test("parsBody function test", async () => {
  const req = new Request("http://localhost:8000/lesan", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      service: "main",
      model: "user",
      act: "create",
      details: {
        set: { name: "John Doe", age: 30 },
        get: { id: true, name: true, age: true },
      },
    }),
  });

  const port = 8000;

  const result = await parsBody(req, port);

  assert.strictEqual(result.service, "main");
  assert.strictEqual(result.model, "user");
  assert.strictEqual(result.act, "create");
  assert.strictEqual(result.details.set.name, "John Doe");
  assert.strictEqual(result.details.set.age, 30);
  assert.strictEqual(result.details.get.id, true);
  assert.strictEqual(result.details.get.name, true);
  assert.strictEqual(result.details.get.age, true);
});
