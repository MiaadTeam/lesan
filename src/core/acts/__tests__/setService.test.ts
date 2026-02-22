import { object, string } from "../../../npmDeps.ts";
import { mockActs } from "./actMockData.ts";
import { setService } from "../setService.ts";
import {
  assertEquals,
  assertExists,
} from "https://deno.land/std@0.211.0/assert/mod.ts";

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
