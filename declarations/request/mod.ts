import { Project, log, emptyDir } from "../../deps.ts";
import {
  jsonObToTsType,
  convertFvObToTsOb,
  constructFVSchema,
} from "./utils/mod.ts";
import { rgb24 } from "https://deno.land/std@0.96.0/fmt/colors.ts";
import { denoResolutionHost } from "../utils/mod.ts";

export const getRequestDeclarations = async (dirPath?: string) => {
  log.info("Generating of declarations of request is started");
  const project = new Project({
    resolutionHost: denoResolutionHost,
  });

  const __dirname = dirPath || Deno.cwd();

  await emptyDir("declarations/request");

  project.addSourceFilesAtPaths(`${__dirname}/**/*.ts`);

  const sourceFile = project.getSourceFileOrThrow(`${__dirname}/mod.ts`);

  const newSourceFile = project.createSourceFile(
    `${__dirname}/declarations/request/schema.ts`,
    undefined,
    {
      overwrite: true,
    }
  );

  const fastestValidatorObject = await constructFVSchema(sourceFile);
  const object = convertFvObToTsOb(fastestValidatorObject, {});

  //store fastest validator object
  await Deno.writeTextFile(
    `${__dirname}/declarations/request/fastestValidatorSchema.json`,
    JSON.stringify(fastestValidatorObject, null, 2)
  );

  //store regular object
  await Deno.writeTextFile(
    `${__dirname}/declarations/request/schema.json`,
    JSON.stringify(object, null, 2)
  );

  //construct new interface
  const funQLInterface = newSourceFile.addInterface({
    name: "FunQL",
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
    | Fastest validator schema:  file://${__dirname}/declarations/request/fastestValidatorSchema.json
    | Json schema:  file://${__dirname}/declarations/request/schema.json
    | Ts interface:   file://${__dirname}/declarations/request/schema.ts
    -------------------------------------------------------------
    `,
    0x0fffc3
  )}
  `);

  return true;
};
