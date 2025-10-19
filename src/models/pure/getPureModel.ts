import { throwError } from "../../utils/throwError.ts";
import { getPureSchema } from "../mod.ts";
import { schemaFns, TSchemas } from "../mod.ts";

/**
 * get pure features of one schema
 * @param name - name of schema that we want to get pure feature
 */
export const getPureModel = (
  schemasObj: TSchemas,
  name: string,
  excludes?: string[],
) => {
  const schemas = schemaFns(schemasObj).getSchemas();
  return schemas[name]
    ? getPureSchema(schemas, name, excludes)
    : throwError(`Schema ${name} is not exist in the Schema Object`);
};
