import { getAct } from "./getAct.ts";
import { getActs } from "./getActs.ts";
import { getActsKeys } from "./getActsKeys.ts";
import { getAtcsWithServices } from "./getActsWithServices.ts";
import { getMainAct } from "./getMainAct.ts";
import { getMainActs } from "./getMainActs.ts";
import { getService } from "./getService.ts";
import { getServiceKeys } from "./getServiceKeys.ts";
import { getActKeys } from "./mod.ts";
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
    getServiceKeys: () => getServiceKeys(acts),
    getActs: (
      schema: string,
    ) => getActs(acts, schema),
    getActsKeys: (
      service: keyof typeof acts,
      schema: string,
    ) => getActsKeys(acts, service, schema),
    getActKeys: (
      schema: string,
    ) => getActKeys(acts, schema),
    getAct: (
      service: keyof typeof acts,
      schema: string,
      actName: string,
    ) => getAct(acts, service, schema, actName),
    getAtcsWithServices: () => getAtcsWithServices(acts),
    getMainActs: () => getMainActs(acts),
    getMainAct: (
      schema: string,
      actName: string,
    ) => getMainAct(acts, schema, actName),
    setService: (
      serviceName: keyof typeof acts,
      service: Acts | string,
    ) => setService(acts, serviceName, service),
    getService: (
      service: keyof typeof acts,
    ) => getService(acts, service),
  };
};
