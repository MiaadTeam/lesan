import { acts, Services } from "./acts/mod.ts";
import { contextFns } from "./context.ts";
import { Database } from "./deps.ts";
import { Model, schemas } from "./models/mod.ts";
import { odm } from "./odm/mod.ts";
import { lesanServer } from "./server/mod.ts";
import { generateSchemTypes } from "./types/mod.ts";

export const lesan = () => {
  const schemasObj: Record<string, Model> = {};

  const actsObj: Services = {
    main: {
      dynamic: {},
      static: {},
    },
  };

  return {
    acts: { ...acts(actsObj) },
    schemas: { ...schemas(schemasObj) },
    odm: { ...odm(schemasObj) },
    runServer: lesanServer(schemasObj, actsObj),
    contextFns,
    generateSchemTypes: generateSchemTypes(schemasObj),
  };
};
