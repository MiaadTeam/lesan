import { Project, log, SourceFile } from "../../../deps.ts";
import { rgb24 } from "https://deno.land/std@0.96.0/fmt/colors.ts";
import { throwError } from "../../utils/mod.ts";
import { addFunQLInterfaceToSourceFile } from "../utils/addInterfaceToSrcFile.ts";

export const getDynamicSchemaDeclarations = async (
  project: Project,
  createdSourceFile: SourceFile,
  dirPath: string
) => {
  try {
    log.info("Generating of declarations of  dynamic schemas is started");

    //handle differentiate between schema and schemas
    const dir =
      project.getDirectory(`${dirPath}/schema`) ||
      project.getDirectory(`${dirPath}/schemas`) ||
      project.getDirectory(`${dirPath}/src/schemas`) ||
      project.getDirectory(`${dirPath}/src/schema`);

    //throws error if dir not found
    !dir &&
      throwError(
        "directory of schema was not found, please move your schemas to path ./src/schema(s) or ./schema(s)"
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
  } catch (error) {
    log.error(
      `creating of dynamic schema was unsuccessful please review your project 
      ${error}
      `
    );
  }
  return true;
};
