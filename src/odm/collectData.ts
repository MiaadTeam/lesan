import { Bson, Database, Filter, FindOptions } from "../deps.ts";

export const collectDate = async (
  schemas: any,
  filter: Filter<Bson.Document>,
  db: Database,
  projection: any,
  collection: string,
  result: any = {},
  type: "one" | "many" = "one",
  options?: FindOptions,
) => {
  result = type === "one"
    ? await db.collection(collection).findOne(filter, {
      ...options,
      projection,
    })
    : await db.collection(collection).find({ _id: { $in: filter } }, {
      ...options,
      projection,
    });

  for (let key in projection) {
    if (
      Object.keys(schemas[collection]["inrelation"]).includes(key) &&
      schemas[collection]["inrelation"][key][type] === "many" &&
      Object.keys(projection[key]).length !== Object.keys(result[key][0]).length
    ) {
      filter = result[key].map((value: any) => value._id);

      result[key] = collectDate(
        schemas,
        filter,
        db,
        projection[key],
        schemas[collection]["inrelation"][key]["schemaName"],
        {},
        "many",
      );
    } else if (
      Object.keys(schemas[collection]["inrelation"]).includes(key) &&
      schemas[collection]["inrelation"][key][type] === "one" &&
      Object.keys(projection[key]).length !== Object.keys(result[key]).length
    ) {
      result[key] = collectDate(
        schemas,
        filter,
        db,
        projection[key],
        schemas[collection]["inrelation"][key]["schemaName"],
        {},
        "one",
      );
    } else if (
      Object.keys(schemas[collection]["outrelation"]).includes(key) &&
      Object.keys(projection[key]).length !== Object.keys(result[key][0]).length
    ) {
      result[key] = collectDate(
        schemas,
        filter,
        db,
        projection[key],
        schemas[collection]["outrelation"][key]["schemaName"],
        {},
        "many",
      );
    }
  }
  return result;
};
