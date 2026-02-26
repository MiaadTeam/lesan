import { number, object } from "../../npmDeps.ts";
import { schemas, TSchemas } from "./mod.ts";

export type Type = Record<string, number | any>;

const selectInp = (schema: keyof TSchemas, schemasObj: TSchemas) => {
  const foundedSchema = schemas(schemasObj).getSchema(schema);
  let returnObj: Type = {};

  for (const property in foundedSchema.mainRelations) {
    returnObj = object({
      ...returnObj,
      [property]: selectInp(
        foundedSchema.mainRelations[property].schemaName,
        schemasObj,
      ) ||
        number,
    });
  }
  for (const property in foundedSchema.relatedRelations) {
    returnObj = object({
      ...returnObj,
      [property]:
        selectInp(
          foundedSchema.relatedRelations[property].schemaName,
          schemasObj,
        ) ||
        number,
    });
  }

  return returnObj;
};
