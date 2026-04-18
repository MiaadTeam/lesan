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
export const pureFns = (schemasObj: TSchemas): {
  addPureModel: (
    schemaName: string,
    pureModel: Record<string, any>,
  ) => ReturnType<typeof import("./addPureModel.ts").addPureModel>;
  getPureModel: (
    schemaName: string,
    excludes?: string[],
  ) => ReturnType<typeof import("./getPureModel.ts").getPureModel>;
  getPureModelByNameAndKey: (
    schemaName: string,
    keyName: string,
  ) => ReturnType<
    typeof import("./getPureModelByNameAndKey.ts").getPureModelByNameAndKey
  >;
} => {
  return {
    addPureModel: (name: string, pureModel: IPureFields) =>
      addPureModel(schemasObj, name, pureModel),
    getPureModel: (name: string, excludes?: string[]) =>
      getPureModel(schemasObj, name, excludes),
    getPureModelByNameAndKey: (name: string, key: string) =>
      getPureModelByNameAndKey(schemasObj, name, key),
  };
};

export * from "./addPureModel.ts";
export * from "./getPureModel.ts";
export * from "./getPureModelByNameAndKey.ts";
