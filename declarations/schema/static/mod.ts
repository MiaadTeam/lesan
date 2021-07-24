import { findStaticSchemaFromSourceFile } from "./utils/mod.ts";
import { emptyDir, Project, log, rgb24, SourceFile } from "../../../deps.ts";
import { denoResolutionHost, throwError } from "../../utils/mod.ts";
import { addFunQLInterfaceToSourceFile } from "../utils/addInterfaceToSrcFile.ts";

/**
 * @function
 * construct static schemas
 * @param dirPath
 */
export const getStaticSchemaDeclarations = async (
  project: Project,
  createdSourceFile: SourceFile,
  dirPath: string
) => {
  try {
    log.info("Generating of declarations of static schemas is started");

    //handle differentiate between path that project was created
    const dir =
      project.getDirectory(`${dirPath}/isdb`) ||
      project.getDirectory(`${dirPath}/src/isdb`);

    //throws error if dir not found
    !dir &&
      throwError(
        "isdb directory was not found, please move your isdb folder to path ./src/isdb or ./isdb"
      );

    dir?.getDirectories().map((staticSchemaDirectory) => {
      staticSchemaDirectory.getDirectories().map((sliceSchemaDirectory) => {
        const sourceFile = sliceSchemaDirectory.getSourceFileOrThrow("mod.ts");
        const schemaInterface = findStaticSchemaFromSourceFile(sourceFile);
        schemaInterface &&
          addFunQLInterfaceToSourceFile(schemaInterface, createdSourceFile, {
            type: "static",
          });
      });
    });

    await createdSourceFile.save();
  } catch (error) {
    log.error(
      `creating of static schemas was unsuccessful please review your project 
      ${error}
      `
    );
  }
  return true;
};
