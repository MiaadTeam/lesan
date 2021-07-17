import { SourceFile, InterfaceDeclaration } from "../../../../deps.ts";
import { constructResponseContent } from "./constructResponseContent.ts";

export async function constructResponseSchema(
  sourceFile: SourceFile,
  createdInterface: InterfaceDeclaration,
  createdSourceFile: SourceFile
) {
  const property = createdInterface.addProperty({ name: "schema" });
  const responseContent = await constructResponseContent(
    sourceFile,
    createdSourceFile
  );
  property.setType(`{contents: ${responseContent}}`);
}
