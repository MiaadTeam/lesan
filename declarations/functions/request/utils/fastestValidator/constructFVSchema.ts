import { SourceFile } from "../../../../../deps.ts";
import { constructFVContents } from "./constructFVContent.ts";

export async function constructFVSchema(sourceFile: SourceFile) {
  return {
    schema: {
      type: "object",
      props: {
        contents: {
          type: "object",
          props: await constructFVContents(sourceFile),
        },
      },
    },
  };
}
