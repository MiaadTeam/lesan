import { Project, ts } from "https://deno.land/x/ts_morph@10.0.1/mod.ts";
import { constructFVSchema, convetFvObToTsOb, obToStr } from "./utils/mod.ts";

//code start from here--------------------------------------------------------------------------------------------------
export const project = new Project({
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
            moduleResolutionHost,
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

const __dirname = new URL(".", import.meta.url).pathname;

project.addSourceFilesAtPaths(`${__dirname}/**/*.ts`);

const sourceFile = project.getSourceFileOrThrow(`${__dirname}/mod.ts`);

const newSourceFile = project.createSourceFile(
  `${__dirname}/declerations/schema.ts`,
  undefined,
  {
    overwrite: true,
  },
);

const fastestValidatorObject = await constructFVSchema(
  sourceFile,
);
const object = convetFvObToTsOb(
  fastestValidatorObject,
  {},
);

//store fastest validator object
await Deno.writeTextFile(
  `${__dirname}/declerations/fastestValidatorSchema.json`,
  JSON.stringify(fastestValidatorObject, null, 2),
);

//store regular object
await Deno.writeTextFile(
  `${__dirname}/declerations/schema.json`,
  JSON.stringify(object, null, 2),
);

const int = newSourceFile.addInterface({ name: "Funql" });
//await Deno.writeTextFile("schema.ts", );
int.addProperty({ name: "schema", type: obToStr(object["schema"]) });
await newSourceFile.save();
