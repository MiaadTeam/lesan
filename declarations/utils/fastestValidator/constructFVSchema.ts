import { SourceFile } from "../../deps.ts";
import { constructFVModels } from "./constructFVModels.ts";

export async function constructFVSchema(sourceFile: SourceFile) {
  const models = await constructFVModels(sourceFile);

  return {
    schema: {
      type: "object",
      props: { models: { type: "object", props: models } },
    },
  };
}
