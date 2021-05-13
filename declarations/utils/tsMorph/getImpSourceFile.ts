import { SourceFile } from "../../../deps.ts";

/**
 * @function
 * get source file of import in specified name in a source file
 * @param sourceFile
 * @param name
 */
export const getImpSourceFile = (
  sourceFile: SourceFile,
  name: string
): SourceFile => {
  const importDeclaration = sourceFile.getImportDeclaration((i) =>
    i
      .getImportClauseOrThrow()
      .getChildren()
      .find((importKey) => importKey.getText().match(name))
      ? true
      : false
  );
  //get source file of specified name
  let sf = importDeclaration?.getModuleSpecifierSourceFile()!;

  //get actual source file when programmer use export *
  sf.getExportedDeclarations().forEach((val, key) => {
    if (key === name) {
      sf = val[0].getSourceFile();
    }
  });

  return sf;
};
