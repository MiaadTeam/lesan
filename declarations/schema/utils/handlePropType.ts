import { PropertySignature, SourceFile, SyntaxKind } from "../../../deps.ts";
import { getInterfaceFromType, getEnumFromType } from "./ts-morph/mod.ts";
import { addFunQLInterfaceToSourceFile } from "./addInterfaceToSrcFile.ts";
import { addFunQLEnumToSourceFile } from "./mod.ts";

/**
 * @function
 * find and add associated declaration to this type to source file
 * @param type
 * @param createdSourceFile
 */
export function handlePropType(
  prop: PropertySignature,
  createdSourceFile: SourceFile
) {
  const typeReferences = prop.getDescendantsOfKind(SyntaxKind.TypeReference);
  typeReferences.map((reference) => {
    //get type of references
    const typeOfReference = reference.getType();

    //if type is interface we should find interface and process it again
    if (typeOfReference.isInterface()) {
      const foundedInterface = getInterfaceFromType(typeOfReference);
      addFunQLInterfaceToSourceFile(foundedInterface, createdSourceFile);
    }
    //if type is enum we should find enum and add it to source file
    if (typeOfReference.isEnum()) {
      const foundedEnum = getEnumFromType(typeOfReference);
      addFunQLEnumToSourceFile(foundedEnum, createdSourceFile);
    }
  });
}
