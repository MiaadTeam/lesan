import { ensureDir } from "../mod.ts";
import { ISchema, schemas as schemaFns } from "../models/mod.ts";

export const generateSchemTypes = async (schemasObj: ISchema) => {
  const schemas = schemaFns(schemasObj).getSchemas();

  let str = "";

  for (const schema in schemas) {
    str = str + `
    export type ${schema}Inp = {
      ${
      Object.keys(schemas[schema].inrelation).map(schemaName =>
        `${schemaName}: number | ${
          schemas[schema].inrelation[schemaName].schemaName
        }Inp`
      ).join("\n")
    }
      ${
      Object.keys(schemas[schema].outrelation).map(schemaName =>
        `${schemaName}: number | ${
          schemas[schema].outrelation[schemaName].schemaName
        }Inp`
      ).join("\n")
    }
    }
`;
  }
  await ensureDir("./declarations");
  await Deno.writeTextFile("./declarations/selectInp.ts", str);
};
