import { Project, log } from "../../deps.ts";
import { ensureDir } from "../../deps.ts";
import { rgb24 } from "https://deno.land/std@0.96.0/fmt/colors.ts";
import { denoResolutionHost } from "../utils/mod.ts";
import { addFunQLInterfaceToSourceFile } from "./utils/addInterfaceToSrcFile.ts";

export const getSchemaDeclarations = async (dirPath?: string) => {
  log.info("Generating of declarations of schema is started");
  const project = new Project({
    resolutionHost: denoResolutionHost,
  });

  const __dirname = dirPath || Deno.cwd();
  await ensureDir("declarations/schema");
  project.addSourceFilesAtPaths(`${__dirname}/**/*.ts`);
  //handle differentiate between schema and schemas
  const dir =
    project.getDirectory(`${__dirname}/schema`) ||
    project.getDirectory(`${__dirname}/schemas`);

  const createdSourceFile = project.createSourceFile(
    `${__dirname}/declarations/schema/schema.ts`,
    undefined,
    {
      overwrite: true,
    }
  );

  const sourceFiles = dir?.getSourceFiles();

  //get all of interfaces
  sourceFiles?.map((sourceFile) => {
    const selectedInterfaces = sourceFile
      .getInterfaces()
      .filter(
        (inter) =>
          inter.getName().startsWith("Pu") ||
          inter.getName().startsWith("Em") ||
          inter.getName().startsWith("In") ||
          inter.getName().startsWith("OutRel") ||
          inter.getName().startsWith("I")
      );

    selectedInterfaces.map((inter) =>
      addFunQLInterfaceToSourceFile(inter, createdSourceFile)
    );
  });

  //console.log(newSourceFile.getText());
  await createdSourceFile.save();

  log.info(`creating of declaration files for schema was successful
    ${rgb24(
      `
      -------------------------------------------------------------
      |  schema:  file://${__dirname}/declarations/schema/schema.ts
      -------------------------------------------------------------
      `,
      0xadfc03
    )}
    `);
};
