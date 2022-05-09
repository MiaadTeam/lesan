import { array, object, optional } from "../../deps.ts";
import { getSchema } from "./getSchema.ts";
import { Schemas } from "./mod.ts";

export const getPureFromInRel = (schemas: Schemas, schemaName: string) => {
  const schema = getSchema(schemas, schemaName);
  let pureSchemas = {};
  for (const property in schema.inrelation) {
    // console.log(`${property}: ${object[property]}`);
    pureSchemas = {
      ...pureSchemas,
      [property]: schema.inrelation[property].type === "one"
        ? schema.inrelation[property].optional === true
          ? optional(
            object(schemas[schema.inrelation[property].schemaName]?.pure),
          )
          : object(schemas[schema.inrelation[property].schemaName]?.pure)
        : schema.inrelation[property].optional === true
        ? optional(array(
          object(schemas[schema.inrelation[property].schemaName]?.pure),
        ))
        : array(
          object(schemas[schema.inrelation[property].schemaName]?.pure),
        ),
    };
  }
  return pureSchemas;
};
