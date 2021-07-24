import { Project, log, emptyDir, rgb24 } from "../../../deps.ts";
import { denoResolutionHost, pickRandomColor } from "../../utils/mod.ts";
import { constructResponseSchema } from "./utils/constructResponseSchema.ts";

/**
 * @function
 * @async
 * construct response type of functions in funQL
 */
export const getResponseDeclarations = async (
  givenDirPath?: string,
  givenOutPath?: string
) => {
  log.info("Generating of declarations of response is started");
  const project = new Project({
    resolutionHost: denoResolutionHost,
  });

  const dirPath = givenDirPath || Deno.cwd();
  const outPath = `${givenOutPath || Deno.cwd()}/declarations/response`;

  await emptyDir(outPath);

  project.addSourceFilesAtPaths(`${dirPath}/**/*.ts`);

  const sourceFile = project.getSourceFileOrThrow(`${dirPath}/mod.ts`);

  const createdSourceFile = project.createSourceFile(
    `${outPath}/schema.ts`,
    undefined,
    { overwrite: true }
  );

  const createdInterfaceWithDetails = createdSourceFile.addInterface({
    name: "FunQLResponseWithDetails",
    isExported: true,
  });

  const createdInterfaceWithoutDetails = createdSourceFile.addInterface({
    name: "FunQLResponseWithoutDetails",
    isExported: true,
  });

  constructResponseSchema(
    sourceFile,
    createdInterfaceWithDetails,
    createdInterfaceWithoutDetails,
    createdSourceFile
  );

  createdSourceFile.formatText({
    indentSize: 1,
    insertSpaceAfterSemicolonInForStatements: true,
    insertSpaceAfterCommaDelimiter: true,
  });
  await createdSourceFile.save();
  log.info(`creating of declaration files for response was successful
  ${rgb24(
    `
    -------------------------------------------------------------
    | Ts interface:   file://${createdSourceFile.getFilePath()}
    -------------------------------------------------------------
    `,
    pickRandomColor()
  )}
  `);

  return true;
};
