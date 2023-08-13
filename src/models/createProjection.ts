import { getPureModel, getSchema, TSchemas } from "./mod.ts";

export type TProjectionType =
  | "Pure"
  | "MainRelations"
  | "RelatedRelations"
  | "PureMainRelations"
  | "PureRelatedRelations"
  | "PureMainRelationsRelatedRelations"
  | "MainRelationsRelatedRelations";

const setFiledsToOne = (input: Record<string, any>) => {
  /*
   *  @LOG @DEBUG @INFO
   *  This log written by ::==> {{ syd }}
   *
   *  Please remove your log after debugging
   */
  console.log(" ============= ");
  console.group("input ------ ");
  console.log();
  console.info({ input }, " ------ ");
  console.log();
  console.groupEnd();
  console.log(" ============= ");
  const returnObj: Record<string, 1> = {};
  for (const key in input) {
    returnObj[key] = 1;
  }
  return returnObj;
};

export const createProjection = (
  schemasObj: TSchemas,
  schemaName: string,
  projectionType: TProjectionType,
) => {
  switch (projectionType) {
    case "Pure":
      const schema = getPureModel(schemasObj, schemaName);
      return setFiledsToOne(schema);
    default:
      return null;
  }
};
