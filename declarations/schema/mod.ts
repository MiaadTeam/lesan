import { Project, emptyDir, log, rgb24 } from "../../deps.ts";
import { denoResolutionHost } from "../utils/mod.ts";
import { getDynamicSchemaDeclarations } from "./dynamics/mod.ts";
import { getStaticSchemaDeclarations } from "./statics/mod.ts";

/**
 * @function
 * @async
 * construct dynamic and static schemas
 * @param givenDirPath
 */
export const getSchemaDeclarations = async (givenDirPath?: string) => {
  const project = new Project({
    resolutionHost: denoResolutionHost,
  });
  try {
    const dirPath = givenDirPath || Deno.cwd();

    project.addSourceFilesAtPaths(`${dirPath}/**/*.ts`);

    //construct a dir and delete content of it
    await emptyDir("declarations/schema");

    //create schema file for putting results in it
    const createdSourceFile = project.createSourceFile(
      `${dirPath}/declarations/schema/schema.ts`,
      undefined,
      {
        overwrite: true,
      }
    );

    //construct dynamic and static schemas
    await getDynamicSchemaDeclarations(project, createdSourceFile, dirPath);
    await getStaticSchemaDeclarations(project, createdSourceFile, dirPath);

    log.info(`creating of declaration files for schema was successful
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
    log.error("some problems in creating schema was found ");
  }
  return true;
};
