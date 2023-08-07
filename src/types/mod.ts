import { ensureDir } from "../mod.ts";
import { schemas as schemaFns, TSchemas } from "../models/mod.ts";

export const generateSchemTypes = async (schemasObj: TSchemas) => {
  const schemas = schemaFns(schemasObj).getSchemas();

  let str = "";

  for (const schema in schemas) {
    str = str + `
    export type ${schema}Inp = {
      ${
      Object.keys(schemas[schema].mainRelations).map(schemaName =>
        `${schemaName}: number | ${
          schemas[schema].mainRelations[schemaName].schemaName
        }Inp`
      ).join("\n")
    }
      ${
      Object.keys(schemas[schema].relatedRelations).map(schemaName =>
        `${schemaName}: number | ${
          schemas[schema].relatedRelations[schemaName].schemaName
        }Inp`
      ).join("\n")
    }
    }
`;
  }
  await ensureDir("./declarations");
  await Deno.writeTextFile("./declarations/selectInp.ts", str);
};
