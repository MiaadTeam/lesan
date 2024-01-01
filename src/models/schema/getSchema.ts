import { TSchemas } from "./mod.ts";

/**
 * get one feature of schema by schemaName
 * @param schemaName - name of schema that we want feature
 * @returns
 * return one schema feature for example:
 *   pure: {
 *       "_id": string(),
 *       "name": string(),
 *       "location": array(number(), number()),
 *     },
 *
  "relations": {
    "country": {
      "schemaName": "country",
      "type": "single",
      "optional": false,
      "relatedRelations": {
        "cities": {
          "type": "multiple",
          "limit": 5,
          "sort": {
            "field": "_id",
            "order": "asc"
          }
        }
}
}
}
  "mainRelations": {
    "country": {
      "schemaName": "country",
      "type": "single",
      "optional": false
    }
  },
  "relatedRelations": {
    "users": {
      "mainRelationName": "livedCities",
      "mainRelationType": "multiple",
      "schemaName": "user",
      "type": "multiple",
      "limit": 5,
      "sort": {
        "field": "_id",
        "order": "desc"
      }
    }
}

 *
 *
 * description:
 * - pure object key value are [Superstruct Struct type](https://docs.superstructjs.org/api-reference/types)
 * - relations type must be [this type](https://miaadteam.github.io/lesan/api/types/schema/model/TRelation.html)
 * - mainRelation type must be [this type](https://miaadteam.github.io/lesan/api/types/schema/model/TRelation.html)
 */

export const getSchema = (schemas: TSchemas, schemaName: string) => {
  const schema = schemas[schemaName];

  if (!schema) {
    throw new Error(`Schema ${schemaName} not found`);
  }
  return schema;
};
