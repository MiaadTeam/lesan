import "./config/mod.ts";
import { Project, ts, log } from "./deps.ts";
import { ensureDir } from "./deps.ts";
import {
  jsonObToTsType,
  convertFvObToTsOb,
  constructFVSchema,
} from "./utils/mod.ts";
import { rgb24 } from "https://deno.land/std@0.96.0/fmt/colors.ts";

export const getDeclarations = async (dirPath?: string) => {
  log.info("Generating of declarations is started");
  const project = new Project({
    resolutionHost: (moduleResolutionHost, getCompilerOptions) => {
      return {
        resolveModuleNames: (moduleNames, containingFile) => {
          const compilerOptions = getCompilerOptions();
          const resolvedModules: ts.ResolvedModule[] = [];

          for (const moduleName of moduleNames.map(removeTsExtension)) {
            const result = ts.resolveModuleName(
              moduleName,
              containingFile,
              compilerOptions,
              moduleResolutionHost
            );
            resolvedModules.push(result.resolvedModule!);
          }

          return resolvedModules;
        },
      };

      function removeTsExtension(moduleName: string) {
        if (
          moduleName.slice(-3).toLowerCase() === ".ts" &&
          !moduleName.startsWith("http")
        ) {
          return moduleName.slice(0, -3);
        }
        return moduleName;
      }
    },
  });

  const __dirname = dirPath || ".";

  await ensureDir("declarations");

  project.addSourceFilesAtPaths(`${__dirname}/**/*.ts`);

  const sourceFile = project.getSourceFileOrThrow(`${__dirname}/mod.ts`);

  const newSourceFile = project.createSourceFile(
    `${__dirname}/declarations/schema.ts`,
    undefined,
    {
      overwrite: true,
    }
  );

  const fastestValidatorObject = await constructFVSchema(sourceFile);
  const object = convertFvObToTsOb(fastestValidatorObject, {});

  //store fastest validator object
  await Deno.writeTextFile(
    `${__dirname}/declarations/fastestValidatorSchema.json`,
    JSON.stringify(fastestValidatorObject, null, 2)
  );

  //store regular object
  await Deno.writeTextFile(
    `${__dirname}/declarations/schema.json`,
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
  log.info(`creating of declaration files was successful
  ${rgb24(
    `
    -------------------------------------------------------------
    | Fastest validator schema:  ${__dirname}/declarations/fastestValidatorSchema.json
    | Json schema:  ${__dirname}/declarations/schema.json
    | Ts interface:   ${__dirname}/declarations/schema.ts
    -------------------------------------------------------------
    `,
    0xd257ff
  )}
  `);
};
