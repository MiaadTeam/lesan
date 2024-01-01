import { assertExists } from "https://deno.land/std/assert/mod.ts";
import { object, string } from "../../npmDeps.ts";
import { mockActs } from "./getAct.test.ts";
import { setService } from "../setService.ts";
import { assertEquals } from "https://deno.land/std@0.210.0/assert/assert_equals.ts";

Deno.test({
  name: "setService creates service within mockActs",
  fn() {
    setService(mockActs, "anbar", {
      posts: {
        getPosts: {
          validator: object({ title: string() }),
          fn: () => ({ title: "nothing" }),
        },
      },
    });
    assertExists(mockActs.anbar);
  },
});

Deno.test({
  name: "setService creates service within mockActs",
  fn() {
    setService(mockActs, "anbar", "testing");
    assertEquals(mockActs.anbar, "testing");
  },
});
