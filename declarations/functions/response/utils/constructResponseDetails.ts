import { SourceFile, SyntaxKind, log } from "../../../../deps.ts";
import { addNodeInnerTypeToSrcFile } from "../../../schema/utils/addInnerTypeToScrFile.ts";
import { throwError } from "../../../utils/throwError.ts";

/**
 * @function
 * construct details for putting type of response type in it
 * @remark for some reasons we remove Promise from return type of
 * @remark this function construct all dependencies of used types in return type in createdSourceFile
 * @param sourceFile source file that fn functions places in there
 * @param createdSourceFile the source file that is created for storing response interface and all dependencies
 * @returns {string}
 */
export const constructResponseDetails = (
  sourceFile: SourceFile,
  functionName: string,
  createdSourceFile: SourceFile,
  withDetails: boolean = true
): string => {
  try {
    //finds funql function that by convention ends with Fn and declare with variable declaration
    const fnDeclaration = sourceFile
      .getDescendantsOfKind(SyntaxKind.VariableDeclaration)
      .find(
        (vd) => vd.getName().endsWith("Fn") || vd.getName() === functionName
      );

    //checks fun declaration was found are not
    !fnDeclaration && throwError("fn function was not found");

    //finds actual type of Fn function
    const fnType = fnDeclaration!
      .getSymbolOrThrow()
      .getDeclarations()[0]
      .getType();

    //checks fn type was found are not
    !fnType && throwError("type of fn function was not found");

    //finds declaration of fn type
    const fnTypeDeclaration = fnType!.getSymbolOrThrow().getDeclarations()[0];

    //checks fn type declaration was found are not
    !fnTypeDeclaration &&
      throwError("declaration of type of fn function was not found");

    //finds return type
    const returnTypeDeclaration =
      fnTypeDeclaration!.getLastChildByKind(SyntaxKind.TypeReference) ||
      fnTypeDeclaration!.getLastChildIfKind(SyntaxKind.AnyKeyword);

    //TODO add more conditions
    (returnTypeDeclaration!.getText() === "any" ||
      returnTypeDeclaration!.getText() === "Promise<any>" ||
      returnTypeDeclaration!.getText() === "Promise<any[]>") &&
      throwError("return type is any");
    !returnTypeDeclaration &&
      throwError("some problem in finding return type please review your code");

    //remove promise from return type
    const returnTypeDeclarationWithoutPromise =
      returnTypeDeclaration
        ?.getFirstChildByKind(SyntaxKind.Identifier)
        ?.getText() === "Promise"
        ? returnTypeDeclaration.getFirstChildByKind(SyntaxKind.SyntaxList)
        : returnTypeDeclaration;

    //add all dependencies of return type to created source file that main interface is here
    returnTypeDeclarationWithoutPromise &&
      addNodeInnerTypeToSrcFile(
        returnTypeDeclarationWithoutPromise,
        createdSourceFile,
        {
          type: "response",
        }
      );

    !returnTypeDeclarationWithoutPromise &&
      throwError("can not detect return type");

    //returns all of things that we need to create details in string format
    return withDetails
      ? JSON.stringify({
          response: returnTypeDeclarationWithoutPromise?.getText() ?? "any",
        }).replaceAll('"', "")
      : returnTypeDeclarationWithoutPromise?.getText() ?? "any";
  } catch (error) {
    log.warning(
      `we have some problem in finding return type in file: ${sourceFile.getFilePath()} we assume it any
      Error: ${error}
      `
    );
    //returns all of things that we need to create details in string format
    return withDetails
      ? JSON.stringify({
          response: "any",
        }).replaceAll('"', "")
      : "any";
  }
};
