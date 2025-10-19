import { getPureModel, TSchemas } from "./mod.ts";
import { getFlattenPureFromRelations } from "./schema/getFlattenPureFromRelations.ts";

export type TProjectionType =
  | "Pure"
  | "MainRelations"
  | "RelatedRelations"
  | "PureMainRelations"
  | "PureRelatedRelations"
  | "PureMainRelationsRelatedRelations"
  | "MainRelationsRelatedRelations";

const setFiledsToOne = (input: Record<string, any>) => {
  const returnObj: Record<string, any> = {};
  for (const key in input) {
    input[key].type === "object"
      ? returnObj[key] = setFiledsToOne(input[key].schema)
      : returnObj[key] = 1;
  }
  return returnObj;
};

export const createProjection = (
  schemasObj: TSchemas,
  schemaName: string,
  projectionType: TProjectionType,
  excludes?: string[],
) => {
  switch (projectionType) {
    case "Pure":
      return setFiledsToOne(getPureModel(schemasObj, schemaName, excludes));
    case "MainRelations":
      return setFiledsToOne(
        getFlattenPureFromRelations(schemasObj, schemaName, "MainRelations"),
      );
    case "RelatedRelations":
      return setFiledsToOne(
        getFlattenPureFromRelations(schemasObj, schemaName, "RelatedRelations"),
      );
    case "PureMainRelations":
      return setFiledsToOne({
        ...getPureModel(schemasObj, schemaName, excludes),
        ...getFlattenPureFromRelations(schemasObj, schemaName, "MainRelations"),
      });
    case "PureRelatedRelations":
      return setFiledsToOne({
        ...getPureModel(schemasObj, schemaName, excludes),
        ...getFlattenPureFromRelations(
          schemasObj,
          schemaName,
          "RelatedRelations",
        ),
      });
    case "PureMainRelationsRelatedRelations":
      return setFiledsToOne({
        ...getPureModel(schemasObj, schemaName, excludes),
        ...getFlattenPureFromRelations(schemasObj, schemaName, "All"),
      });
    case "MainRelationsRelatedRelations":
      return setFiledsToOne(
        getFlattenPureFromRelations(schemasObj, schemaName, "All"),
      );
    default:
      return {};
  }
};
