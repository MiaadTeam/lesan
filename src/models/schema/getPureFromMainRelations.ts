import { array, object, optional } from "../../npmDeps.ts";
import { getSchema } from "./getSchema.ts";
import { getPureSchema, TSchemas } from "./mod.ts";

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
            object(
              getPureSchema(
                schemas,
                schema.mainRelations[property].schemaName,
                schema.mainRelations[property].excludes,
              ),
            ),
          )
          : object(
            getPureSchema(
              schemas,
              schema.mainRelations[property].schemaName,
              schema.mainRelations[property].excludes,
            ),
          )
        : schema.mainRelations[property].optional === true
        ? optional(array(
          object(
            getPureSchema(
              schemas,
              schema.mainRelations[property].schemaName,
              schema.mainRelations[property].excludes,
            ),
          ),
        ))
        : array(
          object(
            getPureSchema(
              schemas,
              schema.mainRelations[property].schemaName,
              schema.mainRelations[property].excludes,
            ),
          ),
        ),
    };
  }
  return pureSchemas;
};
