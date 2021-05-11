import { SourceFile } from "https://deno.land/x/ts_morph@10.0.1/mod.ts";
import { constructFVModels } from "./constructFVModels.ts";

export async function constructFVSchema(sourceFile: SourceFile) {
  const models = await constructFVModels(sourceFile);

  return {
    schema: {
      type: "object",
      props: { models },
    },
  };
}
