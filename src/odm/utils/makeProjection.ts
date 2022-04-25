const getInrelationSchemaKey = (schemaName: string, schemas: any) =>
  Object.keys(schemas[schemaName]["inrelation"]);

const getOutrelationSchemaKey = (schemaName: string, schemas: any) =>
  Object.keys(schemas[schemaName]["outrelation"]);

type Projection = { [key: string]: 0 | 1 | Projection };

type Schema = {
  [key: string]: {
    [key in "pure" | "inrelation" | "outrelation"]: any;
  };
};

export const makeProjection = (
  schemaName: string,
  pureObj: any,
  get: Record<string, any>,
  schemas: Schema,
) => {
  const projection: Projection = {};
  for (const key in get) {
    if (
      getOutrelationSchemaKey(schemaName, schemas).includes(key)
    ) {
      const name = schemas[schemaName]["outrelation"][key]["schemaName"];

      projection[key] = get[key] === 1
        ? makeProjection(name, projection, schemas[name]["pure"], schemas)
        : makeProjection(
          name,
          projection,
          get[key],
          schemas,
        );
    } else if (getInrelationSchemaKey(schemaName, schemas).includes(key)) {
      const name = schemas[schemaName]["inrelation"][key]["schemaName"];

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
