import { test } from "../../../../tests/utils/test-runner.ts";
import { object, string } from "../../../npmDeps.ts";
import { mockActs } from "./actMockData.ts";
import { setService } from "../setService.ts";
import {
  assertEquals,
  assertExists,
} from "../../../../tests/utils/assert.ts";

test({
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

test({
  name: "setService creates service within mockActs",
  fn() {
    setService(mockActs, "anbar", "testing");
    assertEquals(mockActs.anbar, "testing");
  },
});
