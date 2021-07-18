import { SourceFile, InterfaceDeclaration } from "../../../../deps.ts";
import { constructResponseContent } from "./constructResponseContent.ts";

export function constructResponseSchema(
  sourceFile: SourceFile,
  createdInterfaceWihDetails: InterfaceDeclaration,
  createdInterfaceWithoutDetails: InterfaceDeclaration,
  createdSourceFile: SourceFile
) {
  const propertyWithDetails = createdInterfaceWihDetails.addProperty({
    name: "schema",
  });
  const propertyWithoutDetails = createdInterfaceWithoutDetails.addProperty({
    name: "schema",
  });

  const responseContentWithDetails = constructResponseContent(
    sourceFile,
    createdSourceFile,
    true
  );
  const responseContentWithoutDetails = constructResponseContent(
    sourceFile,
    createdSourceFile,
    false
  );
  propertyWithDetails.setType(`{contents: ${responseContentWithDetails}}`);
  propertyWithoutDetails.setType(
    `{contents: ${responseContentWithoutDetails}}`
  );
}
