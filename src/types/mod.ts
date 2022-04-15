import { getSchemas } from "../mod.ts";

export const generateSchemTypes = () => {
  const schemas = getSchemas();

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
  Deno.writeTextFileSync("./schemas.ts", str);
};
