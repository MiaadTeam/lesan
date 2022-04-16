import { number, object } from "https://deno.land/x/lestruct@v0.0.2/mod.ts";
import { ISchema, schemas } from "./mod.ts";

export type Type = Record<string, number | any>;

const selectInp = (schema: string, schemasObj: ISchema) => {
  const foundedSchema = schemas(schemasObj).getSchema(schema);
  let returnObj: Type = {};

  for (const property in foundedSchema.inrelation) {
    returnObj = object({
      ...returnObj,
      [property]:
        selectInp(foundedSchema.inrelation[property].schemaName, schemasObj) ||
        number,
    });
  }
  for (const property in foundedSchema.outrelation) {
    returnObj = object({
      ...returnObj,
      [property]:
        selectInp(foundedSchema.outrelation[property].schemaName, schemasObj) ||
        number,
    });
  }

  return returnObj;
};
