import { IPureFields, TSchemas } from "../mod.ts";
import { addPureModel } from "./addPureModel.ts";
import { getPureModel } from "./getPureModel.ts";
import { getPureModelByNameAndKey } from "./getPureModelByNameAndKey.ts";

/**
 * this function is create for define all things in local scope
 *  and also  all functions of  pure define in this function
 * @function
 * @returns - return objects of all functions that define in this function
 */
export const pureFns = (schemasObj: TSchemas) => {
  return {
    addPureModel: (name: string, pureModel: IPureFields) =>
      addPureModel(schemasObj, name, pureModel),
    getPureModel: (name: string) => getPureModel(schemasObj, name),
    getPureModelByNameAndKey: (name: string, key: string) =>
      getPureModelByNameAndKey(schemasObj, name, key),
  };
};

export * from "./addPureModel.ts";
export * from "./getPureModel.ts";
export * from "./getPureModelByNameAndKey.ts";
