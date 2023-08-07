import { TSchemas } from "../mod.ts";
import { RelationType } from "../types.ts";
import { getRelation } from "./getRelation.ts";

/**
 * this function is create for define all things in local scope
 *  and also  all functions of  relationFns define in this function
 * @param {@link ISchema} schemasObjs - input is all record of schemas
 * @returns - return objects of all functions that define in this function
 */
export const relationFns = (schemasObjs: TSchemas) => {
  return {
    getRelation: (
      name: string,
      relationType: RelationType,
    ) => getRelation(schemasObjs, name, relationType),
  };
};
