import { getAct } from "./getAct.ts";
import { getActs } from "./getActs.ts";
import { getActsKeys } from "./getActsKeys.ts";
import { getAtcsWithServices } from "./getActsWithServices.ts";
import { getDynamicAct } from "./getDynamicAct.ts";
import { getDynamicActs } from "./getDynamicActs.ts";
import { getDynamicKeys } from "./getDynamicKeys.ts";
import { getMainActs } from "./getMainActs.ts";
import { getSchemaDynamicActs } from "./getSchemaDynamicActs.ts";
import { getSchemaStaticActs } from "./getSchemaStaticActs.ts";
import { getService } from "./getService.ts";
import { getServiceKeys } from "./getServiceKeys.ts";
import { getStaticAct } from "./getStaticAct.ts";
import { getStaticActs } from "./getStaticActs.ts";
import { getStaticKeys } from "./getStaticKeys.ts";
import { setAct } from "./setAct.ts";
import { setService } from "./setService.ts";
import { ActInp, Acts, Services } from "./types.ts";

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
//
// const actsObj: Services = {
//   main: {
//     dynamic: {},
//     static: {},
//   },
// };

/**
 * this function is create for define all things in local scope
 *  and also  all functions define in this function
 * @function
 * @param {Services} acts - is type of Services for get ServiceKeys in function
 * @returns - return objects of all functions that define in this function
 */
export const acts = (acts: Services) => {
  return {
    setAct: (actInp: ActInp) => setAct(acts, actInp),
    getDynamicActs: (
      serviceName?: keyof typeof acts,
    ) => getDynamicActs(acts, serviceName),
    getDynamicKeys: (serviceName: keyof typeof acts) =>
      getDynamicKeys(acts, serviceName),
    getServiceKeys: () => getServiceKeys(acts),
    getSchemaDynamicActs: (schema: string) =>
      getSchemaDynamicActs(acts, schema),
    getSchemaStaticActs: (schema: string) => getSchemaStaticActs(acts, schema),
    getDynamicAct: (schema: string, actName: string) =>
      getDynamicAct(acts, schema, actName),
    getStaticAct: (
      schema: string,
      actName: string,
    ) => getStaticAct(acts, schema, actName),
    getActs: (
      type: "static" | "dynamic",
      schema: string,
    ) => getActs(acts, type, schema),
    getActsKeys: (
      service: keyof typeof acts,
      type: "static" | "dynamic",
      schema: string,
    ) => getActsKeys(acts, service, type, schema),
    getAct: (
      service: keyof typeof acts,
      type: "static" | "dynamic",
      schema: string,
      actName: string,
    ) => getAct(acts, service, type, schema, actName),
    getAtcsWithServices: () => getAtcsWithServices(acts),
    getMainActs: () => getMainActs(acts),
    setService: (
      serviceName: keyof typeof acts,
      service: Acts | string,
    ) => setService(acts, serviceName, service),
    getService: (
      service: keyof typeof acts,
    ) => getService(acts, service),
    getStaticActs: (serviceName?: keyof typeof acts) =>
      getStaticActs(acts, serviceName),
    getStaticKeys: (serviceName?: keyof typeof acts) =>
      getStaticKeys(acts, serviceName),
  };
};
