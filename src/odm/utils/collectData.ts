import { Bson, Database, Filter, FindOptions } from "../../deps.ts";

import { throwError } from "../../utils/mod.ts";

export const collectData = async (
  schemas: any,
  filter: Filter<Bson.Document>,
  db: Database,
  projection: any,
  collection: string,
  result: any = {},
  type: "single" | "mutiple",
  options?: FindOptions,
) => {
  result = type === "single"
    ? db
      ? await db.collection(collection).findOne(filter, {
        ...options,
        projection,
      })
      : throwError("No database connection")
    : db
    ? await db.collection(collection).find({ _id: { $in: filter } }, {
      ...options,
      projection,
    }).toArray()
    : throwError("No database connection");

  for (let key in projection) {
    if (
      Object.keys(schemas[collection]["mainRelations"]).includes(key) &&
      schemas[collection]["mainRelations"][key]["type"] === "mutiple"
    ) {
      if (
        !Array.isArray(result) &&
        Object.keys(projection[key]).length !==
          Object.keys(result[key][0]).length
      ) {
        filter = result[key].map((value: any) => value._id);

        result[key] = await collectData(
          schemas,
          filter,
          db,
          projection[key],
          schemas[collection]["inrelation"][key]["schemaName"],
          {},
          "mutiple",
        );
      } else if (
        Array.isArray(result) &&
        Object.keys(projection[key]).length !==
          Object.keys(result[0][key]).length
      ) {
        for (const item of result) {
          filter = item[key].map((value: any) => value._id);

          item[key] = await collectData(
            schemas,
            filter,
            db,
            projection[key],
            schemas[collection]["mainRelations"][key]["schemaName"],
            {},
            "mutiple",
          );
        }
      }
    } else if (
      Object.keys(schemas[collection]["mainRelations"]).includes(key) &&
      schemas[collection]["mainRelations"][key]["type"] === "one"
    ) {
      if (
        !Array.isArray(result) &&
        Object.keys(projection[key]).length !==
          Object.keys(result[key]).length
      ) {
        filter = { _id: result[key]._id };

        result[key] = await collectData(
          schemas,
          filter,
          db,
          projection[key],
          schemas[collection]["mainRelations"][key]["schemaName"],
          {},
          "single",
        );
      } else if (
        Array.isArray(result) &&
        Object.keys(projection[key]).length !==
          Object.keys(result[0][key]).length
      ) {
        for (const item of result) {
          filter = { _id: item[key]._id };

          item[key] = await collectData(
            schemas,
            filter,
            db,
            projection[key],
            schemas[collection]["mainRelations"][key]["schemaName"],
            {},
            "mutiple",
          );
        }
      }
    } else if (
      Object.keys(schemas[collection]["relatedRelations"]).includes(key)
    ) {
      if (
        (result instanceof Object && !(result instanceof Array)) &&
        Object.keys(projection[key]).length !==
          Object.keys(result[key][0]).length
      ) {
        filter = result[key].map((value: any) => value._id);

        result[key] = await collectData(
          schemas,
          filter,
          db,
          projection[key],
          schemas[collection]["relatedRelations"][key]["schemaName"],
          {},
          "mutiple",
        );
      } else if (
        Array.isArray(result) &&
        Object.keys(projection).length !==
          Object.keys(result[0][key]).length
      ) {
        for (const item of result) {
          filter = item[key].map((value: any) => value._id);

          item[key] = await collectData(
            schemas,
            filter,
            db,
            projection[key],
            schemas[collection]["relatedRelations"][key]["schemaName"],
            {},
            "mutiple",
          );
        }
      }
    }
  }

  return result;
};
