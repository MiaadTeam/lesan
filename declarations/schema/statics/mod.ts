import { findStaticSchemaFromSourceFile } from "./utils/mod.ts";
import { emptyDir, Project, log, rgb24 } from "../../../deps.ts";
import { denoResolutionHost, throwError } from "../../utils/mod.ts";
import { addFunQLInterfaceToSourceFile } from "../utils/addInterfaceToSrcFile.ts";

/**
 * @function
 * construct static schemas
 * @param dirPath
 */
export const getStaticSchemaDeclarations = async (dirPath?: string) => {
  try {
    log.info("Generating of declarations of  static schemas is started");
    const project = new Project({
      resolutionHost: denoResolutionHost,
    });

    const __dirname = dirPath || Deno.cwd();
    await emptyDir("declarations/schema/static");
    project.addSourceFilesAtPaths(`${__dirname}/**/*.ts`);
    //handle differentiate between path that project was created
    const dir =
      project.getDirectory(`${__dirname}/isdb`) ||
      project.getDirectory(`${__dirname}/src/isdb`);

    //throws error if dir not found
    !dir &&
      throwError(
        "isdb directory was not found, please move your isdb folder to path ./src/isdb or ./isdb"
      );

    //create schema file for putting results in it
    const createdSourceFile = project.createSourceFile(
      `${__dirname}/declarations/schema/static/schema.ts`,
      undefined,
      {
        overwrite: true,
      }
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

    //console.log(newSourceFile.getText());
    await createdSourceFile.save();

    log.info(`creating of declaration files for static schemas was successful
    ${rgb24(
      `
     -------------------------------------------------------------
     |  Ts interface:  file://${createdSourceFile.getFilePath()}
     -------------------------------------------------------------
     `,
      0xebd300
    )}
    `);
  } catch (error) {
    log.error(
      `creating of schema was unsuccessful please review your project 
      ${error}
      `
    );
  }
  return true;
};
