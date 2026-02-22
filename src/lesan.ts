import { acts, Services } from "./core/acts/mod.ts";
import { contextFns } from "./context.ts";
import { schemas, TSchemas } from "./core/models/mod.ts";
import { odm } from "./core/odm/mod.ts";
import { lesanServer } from "./server/mod.ts";
import { generateSchemTypes } from "./core/types/mod.ts";

export const lesan = () => {
  const schemasObj: TSchemas = {};

  const actsObj: Services = {
    main: {},
  };

  return {
    schemas: { ...schemas(schemasObj) },
    acts: { ...acts(actsObj) },
    odm: { ...odm(schemasObj) },
    runServer: lesanServer(schemasObj, actsObj),
    contextFns,
    generateSchemTypes: () => generateSchemTypes(schemasObj, actsObj),
  };
};
