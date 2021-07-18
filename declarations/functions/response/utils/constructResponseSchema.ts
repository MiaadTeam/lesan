import { SourceFile, InterfaceDeclaration } from "../../../../deps.ts";
import { constructResponseContent } from "./constructResponseContent.ts";

export function constructResponseSchema(
  sourceFile: SourceFile,
  createdInterface: InterfaceDeclaration,
  createdSourceFile: SourceFile
) {
  const property = createdInterface.addProperty({ name: "schema" });
  const responseContent = constructResponseContent(
    sourceFile,
    createdSourceFile
  );
  property.setType(`{contents: ${responseContent}}`);
}
