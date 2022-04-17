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

/**
 * this function is create for define all things in local scope
 *  and also define all functions in this function
 * @function
 * @param {Services} acts - is type of Services for get ServiceKeys in function
 * @returns - return objects of all functions that define in this function
 */
export const acts = (acts: Services) => {
    /**
     * type of ServiceKeys of input
     */
    type ServiceKeys = keyof typeof acts;

    /**
     * set Actions to main service
     * @param {ActInp} actInp - actInp is equal to{
     * type: type of Actions static or dynamic,
     * schema: schema name of action  for example city
     * actName: name of action  for example createCity,
     * validator: validator function,
     * fn: function of createUser
     * }
     */
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

    /**
     * get Dynamic Actions wih service key,
     * @param serviceName - name of service that we want get dynamic of Actions
     * @returns dynamic actions
     * if service doesnt have dynamic Acts throw Exception
     */
    const getDynamicActs = (serviceName?: ServiceKeys) => {
        return (serviceName && acts[serviceName]
                && (typeof acts[serviceName] !== "string"))
            ? (acts[serviceName] as Acts).dynamic
            : acts.main.dynamic;
    };
    /**
     * get Static Actions wih service key,
     * @param serviceName - name of service that we want get static of Actions
     * @returns static actions
     * if service doesnt have static Acts throw Exception
     */
    const getStaticActs = (serviceName?: ServiceKeys) => {
        return (serviceName && acts[serviceName]
                && (typeof acts[serviceName] !== "string"))
            ? (acts[serviceName] as Acts).static
            : acts.main.static;
    };

    /**
     * get key of Static Actions wih service Name,
     * @param serviceName - name of service that we want get key of static of Actions
     * @returns key of static actions
     * if service doesnt have static Acts throw Exception
     */
    const getStaticKeys = (serviceName?: ServiceKeys) => {
        return (serviceName && acts[serviceName]
                && (typeof acts[serviceName] !== "string"))
            ? Object.keys((acts[serviceName] as Acts).static)
            : (serviceName === "main")
            ? Object.keys(acts.main.static)
            : throwError(`serviceName not valid : ${serviceName}`);
    };

    /**
     * get key of Dynamic Actions wih service Name,
     * @param serviceName - name of service that we want get key of dynamic of Actions
     * @returns key of dynamic actions
     * if service doesnt have static Acts throw Exception
     */
    const getDynamicKeys = (serviceName: ServiceKeys) => {
        return (serviceName && acts[serviceName]
                && (typeof acts[serviceName] !== "string"))
            ? Object.keys((acts[serviceName] as Acts).dynamic)
            : (serviceName === "main")
            ? Object.keys(acts.main.dynamic)
            : throwError(`serviceName not valid : ${serviceName}`);
    };

    /**
     * get key of services
     * @function
     */
    const getServiceKeys = () => Object.keys(acts);

    /**
     *  get Dynamic Actions of main service with schemaName
     *  @param schema - name of schema
     *  @returns dynamic Actions of specific schema of main service
     */
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

    /**
     *  get Static Actions of main service with schemaName
     *  @param schema - name of schema
     *  @returns static Actions of specific schema of main service
     */
    const getSchemaStaticActs: (schema: string) => { [key: string]: Act } = (
        schema,
    ) => {
        if (!acts.main.static[schema]) {
            throw new Error(`Invalid schema: ${schema}`);
        }
        return acts.main.static[schema];
    };

    /**
     *  get specific Dynamic Action of main service with schemaName and actName
     *  @param schema - name of schema for example: user
     *  @param actName - name of Actions for example: create
     *  @returns
     *  return specific action of schema
     *  @example
     *  for example output is:
     *      {
     *         validator: (input: any) => {
     *           return true;
     *         },
     *         fn: (input: any) => {
     *           return input;
     *         },
     *        }
     */
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

    /**
     *  get specific Static Action of main service with schemaName and actName
     *  @param schema - name of schema for example: user
     *  @param actName - name of Actions for example: create
     *  @returns
     *  return specific action of schema
     */
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
    /**
     * get actions of schema of main service
     *  @param schema - name of schema
     *  @param type - type of sctions of service dynamic or static
     */
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

    /**
     * get actions of schema of specific service
     * @param service - name of service for example "main" | "ecommerce" | "blog"
     *  @param schema - name of schema
     *  @param type - type of actions of service dynamic or static
     */
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

    /**
     * get specific action of schema of specific service
     * @param service - name of service for example "main" | "ecommerce" | "blog"
     *  @param schema - name of schema
     *  @param type - type of actions of service dynamic or static
     *  @param actName - name of actions
     */
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

    /**
     * get all acts of all service
     * @function
     */
    const getAtcsWithServices = () => acts;

    /**
     * get acts of main service
     * @function
     */
    const getMainActs = () => acts.main;

    /**
     * set acts to service or ser addreess to service
     *  @param serviceName - name of service
     *  @param service - type of service string or Acts
     */
    const setService: (serviceName: string, service: Acts | string) => void = (
        serviceName,
        service,
    ) => {
        acts[serviceName] = service;
    };
    /**
     * get all of acts of specific service
     * @param serviceName - name of service
     */
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
