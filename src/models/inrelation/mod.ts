import { InRelation, ISchema } from "./../mod.ts";
import { addInrelations } from "./addInrelations.ts";
import { addOneInRelation } from "./addOneInRelation.ts";
import { getInrelations } from "./getInrelations.ts";

/**
 * this function is create for define all things in local scope
 *  and also  all functions of inrelation define in this function
 * @function
 * @returns - return objects of all functions that define in this function
 */
export const inrelationFns = (schemasObj: ISchema) => {
  return {
    addInrelations: (
      { schemaName, inrelation }: {
        schemaName: string;
        inrelation: Record<string, InRelation>;
      },
    ) => addInrelations(schemasObj, { schemaName, inrelation }),
    addOneInRelation: (
      { schemaName, inrelationName, schemaInRelation, type, optional }: {
        schemaName: string;
        inrelationName: string;
        schemaInRelation: string;
        type: "one" | "many";
        optional: boolean;
      },
    ) =>
      addOneInRelation(schemasObj, {
        schemaName,
        inrelationName,
        schemaInRelation,
        type,
        optional,
      }),
    getInrelations: (schemaName: string) =>
      getInrelations(schemasObj, schemaName),
  };
};

export * from "./addInrelations.ts";
export * from "./addOneInRelation.ts";
export * from "./getInrelations.ts";
