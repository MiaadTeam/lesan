import { Project, log, emptyDir, rgb24 } from "../../../deps.ts";
import { denoResolutionHost, pickRandomColor } from "../../utils/mod.ts";
import { constructResponseSchema } from "./utils/constructResponseSchema.ts";

/**
 * @function
 * @async
 * construct response type of functions in funQL
 */
export const getResponseDeclarations = async (dirPath?: string) => {
  log.info("Generating of declarations of response is started");
  const project = new Project({
    resolutionHost: denoResolutionHost,
  });

  const __dirname = dirPath || Deno.cwd();

  await emptyDir("declarations/response");

  project.addSourceFilesAtPaths(`${__dirname}/**/*.ts`);

  const sourceFile = project.getSourceFileOrThrow(`${__dirname}/mod.ts`);

  const createdSourceFile = project.createSourceFile(
    "declarations/response/schema.ts",
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

  createdSourceFile.formatText({ indentSize: 1 });
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
