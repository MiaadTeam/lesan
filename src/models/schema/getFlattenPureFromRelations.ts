import { object } from "../../npmDeps.ts";
import { getPureSchema } from "./getPureSchema.ts";
import { getSchema } from "./getSchema.ts";
import { TSchemas } from "./mod.ts";

export const getFlattenPureFromRelations = (
  schemas: TSchemas,
  schemaName: string,
  relationType: "MainRelations" | "RelatedRelations" | "All",
) => {
  const schema = getSchema(schemas, schemaName);
  let pureSchemas = {};

  const addMainRelation = () => {
    for (const property in schema.mainRelations) {
      pureSchemas = {
        ...pureSchemas,
        [property]: object(
          getPureSchema(schemas, schema.mainRelations[property].schemaName),
        ),
      };
    }
  };
  const addRelationRelation = () => {
    for (const property in schema.relatedRelations) {
      pureSchemas = {
        ...pureSchemas,
        [property]: object(
          getPureSchema(schemas, schema.relatedRelations[property].schemaName),
        ),
      };
    }
  };

  if (relationType === "MainRelations") {
    addMainRelation();
  }
  if (relationType === "RelatedRelations") {
    addRelationRelation();
  }
  if (relationType === "All") {
    addMainRelation();
    addRelationRelation();
  }
  return pureSchemas;
};
