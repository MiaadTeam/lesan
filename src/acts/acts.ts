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
import { Services } from "./types.ts";

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
    setAct: setAct(acts),
    getDynamicActs: getDynamicActs(acts),
    getStaticActs: getStaticActs(acts),
    getStaticKeys: getStaticKeys(acts),
    getDynamicKeys: getDynamicKeys(acts),
    getServiceKeys: getServiceKeys(acts),
    getSchemaDynamicActs: getSchemaDynamicActs(acts),
    getSchemaStaticActs: getSchemaStaticActs(acts),
    getDynamicAct: getDynamicAct(acts),
    getStaticAct: getStaticAct(acts),
    getActs: getActs(acts),
    getActsKeys: getActsKeys(acts),
    getAct: getAct(acts),
    getAtcsWithServices: getAtcsWithServices(acts),
    getMainActs: getMainActs(acts),
    setService: setService(acts),
    getService: getService(acts),
  };
};
