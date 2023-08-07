import { TSchemas } from "../../models/mod.ts";

const getInrelationSchemaKey = (schemaName: string, schemas: TSchemas) =>
  Object.keys(schemas[schemaName]["mainRelations"]);

const getOutrelationSchemaKey = (schemaName: string, schemas: TSchemas) =>
  Object.keys(schemas[schemaName]["relatedRelations"]);

type Projection = { [key: string]: 0 | 1 | Projection };

export const makeProjection = (
  schemaName: string,
  pureObj: any,
  get: Record<string, any>,
  schemas: TSchemas,
) => {
  const projection: Projection = {};
  for (const key in get) {
    if (
      getOutrelationSchemaKey(schemaName, schemas).includes(key)
    ) {
      const name = schemas[schemaName]["relatedRelations"][key]["schemaName"];

      projection[key] = get[key] === 1
        ? makeProjection(name, projection, schemas[name]["pure"], schemas)
        : makeProjection(
          name,
          projection,
          get[key],
          schemas,
        );
    } else if (getInrelationSchemaKey(schemaName, schemas).includes(key)) {
      const name = schemas[schemaName]["mainRelations"][key]["schemaName"];

      projection[key] = get[key] === 1
        ? makeProjection(name, projection, schemas[name]["pure"], schemas)
        : makeProjection(
          name,
          projection,
          get[key],
          schemas,
        );
    } else if (get[key] === 1) {
      projection[key] = 1;
    } else if (get[key] === 0) {
      for (const prop in schemas[schemaName]["pure"]) {
        if (
          key !== prop && get[prop] !== 0 &&
          !(projection[prop] instanceof Object)
        ) {
          projection[prop] = 1;
        }
      }
    }
  }

  return projection;
};
