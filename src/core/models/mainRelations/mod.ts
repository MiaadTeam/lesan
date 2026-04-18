import { TSchemas } from "../schema/mod.ts";
import { getMainRelations } from "./getMainRelations.ts";

/**
 * this function is create for define all things in local scope
 *  and also  all functions of inrelation define in this function
 * @function
 * @returns - return objects of all functions that define in this function
 */
export const mainRelationsFns = (schemasObj: TSchemas): {
  getMainRelations: (
    schemaName: string,
  ) => ReturnType<typeof import("./getMainRelations.ts").getMainRelations>;
} => {
  return {
    getMainRelations: (schemaName: string) =>
      getMainRelations(schemasObj, schemaName),
  };
};
