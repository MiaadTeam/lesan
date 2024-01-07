import { throwError } from "../../utils/throwError.ts";
import { schemaFns, TSchemas } from "../mod.ts";

/**
 * get pure features of one schema
 * @param name - name of schema that we want to get pure feature
 */
export const getPureModel = (schemasObj: TSchemas, name: string) => {
  const schemas = schemaFns(schemasObj).getSchemas();
  return schemas[name]
    ? schemas[name].pure
    : throwError(`Schema ${name} is not exist in the Schema Object`);
};
