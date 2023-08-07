import { TSchemas } from "../mod.ts";
import { getRelatedRelations } from "./getRelatedRelations.ts";

/**
 * this function is create for define all things in local scope
 *  and also  all functions of outrelation define in this function
 * @function
 * @returns - return objects of all functions that define in this function
 */
export const relatedRelationFns = (schemasObj: TSchemas) => {
  return {
    getRelatedRelations: (schemaName: string) =>
      getRelatedRelations(schemasObj, schemaName),
  };
};
