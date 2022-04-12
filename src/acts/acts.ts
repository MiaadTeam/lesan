import { Struct } from "https://deno.land/x/lestruct/mod.ts";
import { SchemasKey } from "../models/mod.ts";
import { Body, throwError } from "../utils/mod.ts";

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

export type ActFn = (body: Body) => any;

export interface Act {
    validator: Struct<any>;
    fn: ActFn;
}

export interface Acts {
    dynamic: {
        [key: string]: {
            [key: string]: Act;
        };
    };
    static: {
        [key: string]: {
            [key: string]: Act;
        };
    };
}

export interface Services {
    main: Acts;
    [key: string]: Acts | string | undefined;
}

const acts: Services = {
    main: {
        dynamic: {},
        static: {},
    },
};

export interface ActInp {
    type: "static" | "dynamic";
    schema: SchemasKey;
    actName: string;
    validator: Struct<any>;
    fn: ActFn;
}

export const setAct: (actInp: ActInp) => void = (
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
export type ServiceKeys = keyof typeof acts;

export const getDynamicActs = (serviceName?: ServiceKeys) => {
    return (serviceName && acts[serviceName]
            && (typeof acts[serviceName] !== "string"))
        ? (acts[serviceName] as Acts).dynamic
        : acts.main.dynamic;
};

export const getStaticActs = (serviceName?: ServiceKeys) => {
    return (serviceName && acts[serviceName]
            && (typeof acts[serviceName] !== "string"))
        ? (acts[serviceName] as Acts).static
        : acts.main.static;
};

export const getStaticKeys = (serviceName?: ServiceKeys) => {
    return (serviceName && acts[serviceName]
            && (typeof acts[serviceName] !== "string"))
        ? Object.keys((acts[serviceName] as Acts).static)
        : (serviceName === "main")
        ? Object.keys(acts.main.static)
        : throwError(`serviceName not valid : ${serviceName}`);
};

// TODO : check if acts[serviceName] === "string" should throw an error
export const getDynamicKeys = (serviceName: ServiceKeys) => {
    return (serviceName && acts[serviceName]
            && (typeof acts[serviceName] !== "string"))
        ? Object.keys((acts[serviceName] as Acts).dynamic)
        : (serviceName === "main")
        ? Object.keys(acts.main.dynamic)
        : throwError(`serviceName not valid : ${serviceName}`);
};

export const getServiceKeys = () => Object.keys(acts);

export const getSchemaDynamicActs: (
    schema: SchemasKey,
) => { [key: string]: Act } = (
    schema,
) => {
    if (!acts.main.dynamic[schema]) {
        throw new Error(`Invalid schema: ${schema}`);
    }
    return acts.main.dynamic[schema];
};

export const getSchemaStaticActs: (schema: string) => { [key: string]: Act } = (
    schema,
) => {
    if (!acts.main.static[schema]) {
        throw new Error(`Invalid schema: ${schema}`);
    }
    return acts.main.static[schema];
};

export const getDynamicAct: (
    schema: SchemasKey,
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

export const getStaticAct: (
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

export const getActs = (type: "static" | "dynamic", schema: string) => {
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

export const getActsKeys = (
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

export const getAct = (
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

export const getAtcsWithServices = () => acts;

export const setService: (serviceName: string, service: Acts | string) => void = (serviceName, service) => {
    acts[serviceName] = service;
};

export const getService: (serviceName: ServiceKeys) => void = (serviceName) => {
    if (!acts[serviceName]) {
        throw new Error(`Invalid serviceName: ${serviceName}`);
    }
    return acts[serviceName];
};
