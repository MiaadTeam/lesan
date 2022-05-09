import { ISchema, OutRelation } from "../mod.ts";
import { addOneOutRelation } from "./addOneOutRelation.ts";
import { addOutRelations } from "./addOutRelations.ts";
import { getOutRelations } from "./getOutRelations.ts";

/**
 * this function is create for define all things in local scope
 *  and also  all functions of outrelation define in this function
 * @function
 * @returns - return objects of all functions that define in this function
 */
export const outrelationFns = (schemasObj: ISchema) => {
  return {
    addOneOutRelation: (
      { schemaName, outrelationName, schemaOuterRelation, number, sort }: {
        schemaName: string;
        outrelationName: string;
        schemaOuterRelation: string;
        number: number;
        sort: {
          field: string;
          order: "asc" | "desc";
          type: "number" | "date" | "objectId";
        };
      },
    ) =>
      addOneOutRelation(schemasObj, {
        schemaName,
        outrelationName,
        schemaOuterRelation,
        number,
        sort,
      }),
    addOutRelations: (
      { schemaName, outrelation }: {
        schemaName: string;
        outrelation: Record<string, OutRelation>;
      },
    ) => addOutRelations(schemasObj, { schemaName, outrelation }),
    getOutRelations: (schemaName: string) =>
      getOutRelations(schemasObj, schemaName),
  };
};
