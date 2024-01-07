import { assertEquals } from "https://deno.land/std@0.211.0/assert/mod.ts";
import { getNumericPosition } from "../getNumericPosition.ts";

Deno.test("getNumericPosition - ascending order", () => {
  const arr = [{ value: 5 }, { value: 15 }, { value: 25 }, { value: 35 }];
  assertEquals(getNumericPosition(arr, 25, "value", "asc"), 2);
  assertEquals(getNumericPosition(arr, 35, "value", "asc"), 3);
  assertEquals(getNumericPosition(arr, 5, "value", "asc"), 0);
});

Deno.test("getNumericPosition - descending order", () => {
  const arr = [{ value: 35 }, { value: 25 }, { value: 15 }, { value: 5 }];
  assertEquals(getNumericPosition(arr, 25, "value", "desc"), 1);
  assertEquals(getNumericPosition(arr, 35, "value", "desc"), 0);
  assertEquals(getNumericPosition(arr, 5, "value", "desc"), 3);
});
