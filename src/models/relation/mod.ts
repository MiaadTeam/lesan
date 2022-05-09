import { ISchema } from "../mod.ts";
import { getRelation } from "./getRelation.ts";

/**
 * this function is create for define all things in local scope
 *  and also  all functions of  relationFns define in this function
 * @param {@link ISchema} schemasObjs - input is all record of schemas
 * @returns - return objects of all functions that define in this function
 */
export const relationFns = (schemasObjs: ISchema) => {
  return {
    getRelation: (
      name: string,
      relationType: "inrelation" | "outrelation",
    ) => getRelation(schemasObjs, name, relationType),
  };
};
