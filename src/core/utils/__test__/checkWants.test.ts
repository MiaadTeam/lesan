import { test } from "../../../../tests/utils/test-runner.ts";
import { assertEquals } from "https://deno.land/std@0.211.0/assert/assert_equals.ts";
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

  assertEquals(result.service, "main");
  assertEquals(result.model, "user");
  assertEquals(result.act, "create");
  assertEquals(result.details.set.name, "John Doe");
  assertEquals(result.details.set.age, 30);
  assertEquals(result.details.get.id, true);
  assertEquals(result.details.get.name, true);
  assertEquals(result.details.get.age, true);
});
