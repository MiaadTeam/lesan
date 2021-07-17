import {
  SourceFile,
  SyntaxKind,
  InterfaceDeclaration,
  log,
} from "../../../../deps.ts";
import { getInterfaceFromType } from "../../utils/ts-morph/mod.ts";

/**
 * finds static schema in specified source file and
 * @remark it finds interface declaration from generic type in call expression

 * @param sourceFile 
 */
export const findStaticSchemaFromSourceFile = (
  sourceFile: SourceFile
): InterfaceDeclaration | undefined => {
  try {
    const createCallExp = sourceFile.getFirstDescendantByKindOrThrow(
      SyntaxKind.CallExpression
    );

    const createCallExpName = createCallExp
      .getFirstChildByKindOrThrow(SyntaxKind.Identifier)
      .getText();
    log.info(
      `try to find static schema from 1\`st generic parameter of function ${createCallExpName} in file: ${sourceFile.getBaseName()} `
    );

    const typeRef = createCallExp.getFirstChildByKindOrThrow(
      SyntaxKind.TypeReference
    );
    return getInterfaceFromType(typeRef.getType());
  } catch (error) {
    log.warning(
      `could not find schema interface in file: ${sourceFile.getFilePath()}`
    );
  }
};
