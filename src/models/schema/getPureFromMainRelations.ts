import { array, object, optional } from "../../npmDeps.ts";
import { getSchema } from "./getSchema.ts";
import { TSchemas } from "./mod.ts";

export const getPureFromMainRelations = (
  schemas: TSchemas,
  schemaName: string,
) => {
  const schema = getSchema(schemas, schemaName);
  let pureSchemas = {};
  for (const property in schema.mainRelations) {
    // console.log(`${property}: ${object[property]}`);
    pureSchemas = {
      ...pureSchemas,
      [property]: schema.mainRelations[property].type === "single"
        ? schema.mainRelations[property].optional === true
          ? optional(
            object(schemas[schema.mainRelations[property].schemaName]?.pure),
          )
          : object(schemas[schema.mainRelations[property].schemaName]?.pure)
        : schema.mainRelations[property].optional === true
        ? optional(array(
          object(schemas[schema.mainRelations[property].schemaName]?.pure),
        ))
        : array(
          object(schemas[schema.mainRelations[property].schemaName]?.pure),
        ),
    };
  }
  return pureSchemas;
};
