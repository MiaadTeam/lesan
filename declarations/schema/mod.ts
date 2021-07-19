import { Project, emptyDir, log, rgb24 } from "../../deps.ts";
import { denoResolutionHost, pickRandomColor } from "../utils/mod.ts";
import { getDynamicSchemaDeclarations } from "./dynamic/mod.ts";
import { getStaticSchemaDeclarations } from "./static/mod.ts";

/**
 * @function
 * @async
 * construct dynamic and static schemas
 * @param givenDirPath
 */
export const getSchemaDeclarations = async (
  givenDirPath?: string,
  givenOutPath?: string
) => {
  const project = new Project({
    resolutionHost: denoResolutionHost,
  });
  try {
    const dirPath = givenDirPath || Deno.cwd();
    const outPath = `${givenOutPath || Deno.cwd()}/declarations/schema`;

    project.addSourceFilesAtPaths(`${dirPath}/**/*.ts`);

    //construct a dir and delete content of it
    await emptyDir(outPath);

    //create schema file for putting results in it
    const createdSourceFile = project.createSourceFile(
      `${outPath}/schema.ts`,
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
      pickRandomColor()
    )}
    `);
  } catch (error) {
    log.error("some problems in creating schema was found ");
  }
  return true;
};
