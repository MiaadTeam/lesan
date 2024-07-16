import { ObjectSchema } from "https://deno.land/x/lestruct@v0.0.2/src/utils.ts";
import { enums, object, optional } from "../npmDeps.ts";
import { pureFns, schemaFns, TSchemas } from "./mod.ts";

export type Iterate = Record<string, number | any>;

export const selectStructFns = (schemasObj: TSchemas) => {
  const fieldType = optional(enums([0, 1]));

  const decreaseIterate = (depth: Iterate) => {
    for (const key in depth) {
      // comments recursive becuase of decrease just first level and proccess every level on its fns
      // typeof depth[key] === "number" ? depth[key]-- : decreaseIterate(depth[key]);

      (typeof depth[key] === "number") && depth[key]--;
    }
    return depth;
  };

  type CheckRelation = (depth: Iterate, relation: string) => boolean;
  const checkRelation: CheckRelation = (depth, relation) =>
    depth && (typeof depth[relation] === "object" || depth[relation] > -1);

  const selectStruct = <T>(
    schema: keyof TSchemas,
    depth: number | T = 2,
  ): any => {
    const pureSchema = pureFns(schemasObj).getPureModel(schema);
    let returnObj = {};
    for (const property in pureSchema) {
      // console.log(`${property}: ${object[property]}`);
      returnObj = {
        ...returnObj,
        [property]: fieldType,
      };
    }

    const numDepthIterateRelations = (
      schema: keyof TSchemas,
      depth: number,
      pureObj: Record<string, unknown>,
    ) => {
      let returnObj = { ...pureObj };
      const foundedSchema = schemaFns(schemasObj).getSchema(schema);
      for (const property in foundedSchema.mainRelations) {
        returnObj = {
          ...returnObj,
          [property]: optional(selectStruct(
            foundedSchema.mainRelations[property].schemaName,
            depth,
          )),
        };
      }
      for (const property in foundedSchema.relatedRelations) {
        returnObj = {
          ...returnObj,
          [property]: optional(selectStruct(
            foundedSchema.relatedRelations[property].schemaName,
            depth,
          )),
        };
      }

      return object(returnObj as ObjectSchema);
    };

    const numberDepth = (depth: number, pureObj: Record<string, any>) => {
      depth--;
      return depth > -1
        ? numDepthIterateRelations(schema, depth, pureObj)
        : object(pureObj);
    };

    const objectDepth = (depth: any, pureObj: Record<string, any>) => {
      depth = decreaseIterate(depth);

      const foundedSchema = schemaFns(schemasObj).getSchema(schema);
      for (const property in foundedSchema.mainRelations) {
        checkRelation(depth, property) &&
          (pureObj = {
            ...pureObj,
            [property]: optional(selectStruct(
              foundedSchema.mainRelations[property].schemaName,
              depth[property],
            )),
          });
      }
      for (const property in foundedSchema.relatedRelations) {
        checkRelation(depth, property) &&
          (pureObj = {
            ...pureObj,
            [property]: optional(selectStruct(
              foundedSchema.relatedRelations[property].schemaName,
              depth[property],
            )),
          });
      }

      return object(pureObj);
    };

    const completeObj = typeof depth === "number"
      ? numberDepth(depth, returnObj)
      : objectDepth(depth, returnObj);

    return completeObj;
  };
  return {
    fieldType,
    decreaseIterate,
    checkRelation,
    selectStruct,
  };
};
