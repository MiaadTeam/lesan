import { Project, log, emptyDir, rgb24 } from "../../../deps.ts";
import {
  jsonObToTsType,
  convertFvObToTsOb,
  constructFVSchema,
} from "./utils/mod.ts";
import { denoResolutionHost, pickRandomColor } from "../../utils/mod.ts";

export const getRequestDeclarations = async (
  givenDirPath?: string,
  givenOutPath?: string
) => {
  log.info("Generating of declarations of request is started");
  const project = new Project({
    resolutionHost: denoResolutionHost,
  });

  const dirPath = givenDirPath || Deno.cwd();
  const outPath = `${givenOutPath || Deno.cwd()}/declarations/request`;

  await emptyDir(outPath);

  project.addSourceFilesAtPaths(`${dirPath}/**/*.ts`);

  const sourceFile = project.getSourceFileOrThrow(`${dirPath}/mod.ts`);

  const newSourceFile = project.createSourceFile(
    `${outPath}/schema.ts`,
    undefined,
    {
      overwrite: true,
    }
  );

  const fastestValidatorObject = await constructFVSchema(sourceFile);
  const object = convertFvObToTsOb(fastestValidatorObject, {});

  //store fastest validator object
  await Deno.writeTextFile(
    `${outPath}/fastestValidatorSchema.json`,
    JSON.stringify(fastestValidatorObject, null, 2)
  );

  //store regular object
  await Deno.writeTextFile(
    `${outPath}/schema.json`,
    JSON.stringify(object, null, 2)
  );

  //construct new interface
  const funQLInterface = newSourceFile.addInterface({
    name: "FunQLRequest",
    isExported: true,
  });
  //add types to interface
  funQLInterface.addProperty({
    name: "schema",
    type: jsonObToTsType(object["schema"]),
  });
  //format new interface
  newSourceFile.formatText({ indentSize: 1 });
  //save new interface
  await newSourceFile.save();
  log.info(`creating of declaration files for request was successful
  ${rgb24(
    `
    -------------------------------------------------------------
    | Fastest validator schema:  file://${outPath}/fastestValidatorSchema.json
    | Json schema:  file://${outPath}/schema.json
    | Ts interface:   file://${outPath}/schema.ts
    -------------------------------------------------------------
    `,
    pickRandomColor()
  )}
  `);

  return true;
};
