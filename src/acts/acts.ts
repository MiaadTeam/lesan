import { throwError } from "../utils/mod.ts";
import { Act, ActInp, Acts, Services } from "./types.ts";

// const actsSample = {
//
//   dynamic: {
//     user: {
//       create: {
//         validator: (input: any) => {
//           return true;
//         },
//         fn: (input: any) => {
//           return input;
//         },
//       },
//       update: {
//         validator: (input: any) => {
//           return true;
//         },
//         fn: (input: any) => {
//           return input;
//         },
//       },
//     },
//   },
//   static: {
//     "blogFirstPage": {
//       "get": {
//         "validator": (input: any) => {
//           return true;
//         },
//         "fn": (input: any) => {
//           return input;
//         },
//       },
//       "set": {
//         "validator": (input: any) => {
//           return true;
//         },
//         "fn": (input: any) => {
//           return input;
//         },
//       },
//     },
//   },
// };

export const acts = (acts: Services) => {
  type ServiceKeys = keyof typeof acts;

  const setAct: (actInp: ActInp) => void = (
    { type, schema, actName, validator, fn },
  ) => {
    if (!acts.main[type]) {
      throw new Error(`Invalid type: ${type}`);
    }
    if (!acts.main[type][schema]) {
      acts.main[type][schema] = {};
    }
    acts.main[type][schema][actName] = {
      validator,
      fn,
    };
  };

  const getDynamicActs = (serviceName?: ServiceKeys) => {
    return (serviceName && acts[serviceName] &&
        (typeof acts[serviceName] !== "string"))
      ? (acts[serviceName] as Acts).dynamic
      : acts.main.dynamic;
  };

  const getStaticActs = (serviceName?: ServiceKeys) => {
    return (serviceName && acts[serviceName] &&
        (typeof acts[serviceName] !== "string"))
      ? (acts[serviceName] as Acts).static
      : acts.main.static;
  };

  const getStaticKeys = (serviceName?: ServiceKeys) => {
    return (serviceName && acts[serviceName] &&
        (typeof acts[serviceName] !== "string"))
      ? Object.keys((acts[serviceName] as Acts).static)
      : (serviceName === "main")
      ? Object.keys(acts.main.static)
      : throwError(`serviceName not valid : ${serviceName}`);
  };

  // TODO : check if acts[serviceName] === "string" should throw an error
  const getDynamicKeys = (serviceName: ServiceKeys) => {
    return (serviceName && acts[serviceName] &&
        (typeof acts[serviceName] !== "string"))
      ? Object.keys((acts[serviceName] as Acts).dynamic)
      : (serviceName === "main")
      ? Object.keys(acts.main.dynamic)
      : throwError(`serviceName not valid : ${serviceName}`);
  };

  const getServiceKeys = () => Object.keys(acts);

  const getSchemaDynamicActs: (
    schema: string,
  ) => { [key: string]: Act } = (
    schema,
  ) => {
    if (!acts.main.dynamic[schema]) {
      throw new Error(`Invalid schema: ${schema}`);
    }
    return acts.main.dynamic[schema];
  };

  const getSchemaStaticActs: (schema: string) => { [key: string]: Act } = (
    schema,
  ) => {
    if (!acts.main.static[schema]) {
      throw new Error(`Invalid schema: ${schema}`);
    }
    return acts.main.static[schema];
  };

  const getDynamicAct: (
    schema: string,
    actName: string,
  ) => Act = (schema, actName) => {
    if (!acts.main.dynamic[schema]) {
      throw new Error(`Invalid schema: ${schema}`);
    }
    if (!acts.main.dynamic[schema][actName]) {
      throw new Error(`Invalid actName: ${actName}`);
    }
    return acts.main.dynamic[schema][actName];
  };

  const getStaticAct: (
    schema: string,
    actName: string,
  ) => Act = (schema, actName) => {
    if (!acts.main.static[schema]) {
      throw new Error(`Invalid actName: ${actName}`);
    }
    if (!acts.main.static[schema][actName]) {
      throw new Error(`Invalid actName: ${actName}`);
    }
    return acts.main.static[schema][actName];
  };

  const getActs = (type: "static" | "dynamic", schema: string) => {
    if (!acts.main[type]) {
      throw new Error(
        `Invalid action type: ${type} it just include dynamic and static`,
      );
    }
    if (!acts.main[type][schema]) {
      throw new Error(`Invalid schema: ${schema}`);
    }
    return acts.main[type][schema];
  };

  const getActsKeys = (
    service: ServiceKeys,
    type: "static" | "dynamic",
    schema: string,
  ) => {
    if (!acts[service] && typeof acts[service] === "string") {
      throw new Error(
        `Invalid service name: ${service} `,
      );
    }
    if (!(acts[service] as Acts)[type]) {
      throw new Error(
        `Invalid action type: ${type} it just include dynamic and static`,
      );
    }
    if (!(acts[service] as Acts)[type][schema]) {
      throw new Error(`Invalid schema: ${schema}`);
    }
    return Object.keys((acts[service] as Acts)[type][schema]);
  };

  const getAct = (
    service: ServiceKeys,
    type: "static" | "dynamic",
    schema: string,
    actName: string,
  ) => {
    if (!acts[service] && typeof acts[service] === "string") {
      throw new Error(
        `Invalid service name: ${service} `,
      );
    }
    if (!(acts[service] as Acts)[type]) {
      throw new Error(
        `Invalid action type: ${type} it just include dynamic and static`,
      );
    }
    if (!(acts[service] as Acts)[type][schema]) {
      throw new Error(`Invalid schema: ${schema}`);
    }
    if (!(acts[service] as Acts)[type][schema][actName]) {
      throw new Error(`Invalid action name: ${actName}`);
    }
    return (acts[service] as Acts)[type][schema][actName];
  };

  const getAtcsWithServices = () => acts;

  const getMainActs = () => acts.main;

  const setService: (serviceName: string, service: Acts | string) => void = (
    serviceName,
    service,
  ) => {
    acts[serviceName] = service;
  };

  const getService: (serviceName: ServiceKeys) => void = (serviceName) => {
    if (!acts[serviceName]) {
      throw new Error(`Invalid serviceName: ${serviceName}`);
    }
    return acts[serviceName];
  };

  return {
    setAct,
    getDynamicActs,
    getStaticActs,
    getStaticKeys,
    getDynamicKeys,
    getServiceKeys,
    getSchemaDynamicActs,
    getSchemaStaticActs,
    getDynamicAct,
    getStaticAct,
    getActs,
    getActsKeys,
    getAct,
    getAtcsWithServices,
    getMainActs,
    setService,
    getService,
  };
};
