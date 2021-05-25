import {
  PropertySignature,
  SourceFile,
  SyntaxKind,
  log,
} from "../../../deps.ts";
import { getInterfaceFromType, getEnumFromType } from "./ts-morph/mod.ts";
import { addFunQLInterfaceToSourceFile } from "./addInterfaceToSrcFile.ts";
import { addFunQLEnumToSourceFile } from "./mod.ts";

/**
 * @function
 * find and add associated declaration to this type to source file
 * @param type
 * @param createdSourceFile
 * @todo handle type alias type
 */
export function handlePropType(
  prop: PropertySignature,
  createdSourceFile: SourceFile
) {
  const typeReferences = prop.getDescendantsOfKind(SyntaxKind.TypeReference);
  typeReferences.map((reference) => {
    try {
      //get type of references
      const typeOfReference = reference.getType();
      //if type is interface we should find interface and process it again
      if (typeOfReference.isInterface()) {
        const foundedInterface = getInterfaceFromType(typeOfReference);
        addFunQLInterfaceToSourceFile(foundedInterface, createdSourceFile);
        return;
      }
      //if type is enum we should find enum and add it to source file
      else if (typeOfReference.isEnum()) {
        const foundedEnum = getEnumFromType(typeOfReference);
        addFunQLEnumToSourceFile(foundedEnum, createdSourceFile);
        return;
      } else {
        throw Error(
          "please use only interface and enum types for your type referencing"
        );
      }
    } catch (error) {
      log.error(
        `we have some problem in finding type: ${reference.getText()} in file: ${reference
          .getSourceFile()
          .getBaseName()} 
          ${error}
        `
      );
    }
  });
}
