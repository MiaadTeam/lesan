import { Project, log, emptyDir } from "../../../deps.ts";
import { rgb24 } from "https://deno.land/std@0.96.0/fmt/colors.ts";
import { denoResolutionHost, throwError } from "../../utils/mod.ts";
import { addFunQLInterfaceToSourceFile } from "../utils/addInterfaceToSrcFile.ts";

export const getDynamicSchemaDeclarations = async (dirPath?: string) => {
  try {
    log.info("Generating of declarations of schema is started");
    const project = new Project({
      resolutionHost: denoResolutionHost,
    });

    const __dirname = dirPath || Deno.cwd();
    await emptyDir("declarations/schema");
    project.addSourceFilesAtPaths(`${__dirname}/**/*.ts`);
    //handle differentiate between schema and schemas
    const dir =
      project.getDirectory(`${__dirname}/schema`) ||
      project.getDirectory(`${__dirname}/schemas`) ||
      project.getDirectory(`${__dirname}/src/schemas`) ||
      project.getDirectory(`${__dirname}/src/schema`);

    //throws error if dir not found
    !dir &&
      throwError(
        "directory of schema was not found, please move your schemas to path ./src/schema(s) or ./schema(s)"
      );

    const createdSourceFile = project.createSourceFile(
      `${__dirname}/declarations/schema/dynamic/schema.ts`,
      undefined,
      {
        overwrite: true,
      }
    );

    const sourceFiles = dir!.getSourceFiles();

    //get all of interfaces
    sourceFiles?.map((sourceFile) => {
      const selectedInterfaces = sourceFile
        .getInterfaces()
        .filter(
          (inter) =>
            inter.getName().startsWith("Pu") ||
            inter.getName().startsWith("Em") ||
            inter.getName().startsWith("InRel") ||
            inter.getName().startsWith("OutRel") ||
            inter.getName().startsWith("I")
        );

      selectedInterfaces.map((inter) =>
        addFunQLInterfaceToSourceFile(inter, createdSourceFile)
      );
    });

    //console.log(newSourceFile.getText());
    await createdSourceFile.save();

    log.info(`creating of declaration files for dynamic schemas was successful
    ${rgb24(
      `
     -------------------------------------------------------------
     |  Ts interface:  file://${createdSourceFile.getFilePath()}
     -------------------------------------------------------------
     `,
      0xadfc03
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
