import { Project, log, emptyDir, rgb24 } from "../../../deps.ts";
import { denoResolutionHost, pickRandomColor } from "../../utils/mod.ts";
import { constructResponseSchema } from "./utils/constructResponseSchema.ts";

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

  const createdInterface = createdSourceFile.addInterface({
    name: "response",
    isExported: true,
  });

  await constructResponseSchema(
    sourceFile,
    createdInterface,
    createdSourceFile
  );

  createdSourceFile.formatText({ indentSize: 1 });
  await createdSourceFile.save();
  log.info(`creating of declaration files for response was successful
  ${rgb24(
    `
    -------------------------------------------------------------
    | Fastest validator schema:  file://${__dirname}/declarations/request/fastestValidatorSchema.json
    | Json schema:  file://${__dirname}/declarations/request/schema.json
    | Ts interface:   file://${__dirname}/declarations/request/schema.ts
    -------------------------------------------------------------
    `,
    pickRandomColor()
  )}
  `);

  return true;
};
