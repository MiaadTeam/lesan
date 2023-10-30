/// context type ----
//

import { LesanContenxt } from "./types.ts";
import { TLesanBody } from "./utils/checkWants.ts";

/**
 *  variable of context
 *  @defaultValue
 *   the value of context is '{}'
 */
let context: LesanContenxt = {
  Headers: new Headers(),
  body: null,
};

/**
 * @returns The contextObj
 */
const getContextModel = () => context;

/**
 * @returns The contextObj
 */
const setContext = (
  obj: Record<string, any>,
) => (context = { ...getContextModel(), ...obj });
/**
 * asigne all of value that we want to carry
 *  @param con - objects of key , value
 * @returns nothing
 */
const addContexts = (con: LesanContenxt) => context = con;

/**
 * add values to previous values that we want to carry
 *  @param con - objects of key , value
 * @returns nothing
 */
const addContext = (con: LesanContenxt) => context = { ...context, con };
/**
 * add Request to Context because the requeste may be required in later functions
 *  @param con - request of user
 * @returns nothing
 */
const addReqToContext = (con: Request) => context["Request"] = con;

/**
 * add Request Header to Context because the requeste may be required in later functions
 *  @param con - Headers of user
 * @returns nothing
 */
const addHeaderToContext = (con: Headers) => context["Headers"] = con;

/**
 * add Request Header to Context because the requeste may be required in later functions
 *  @param con - Headers of user
 * @returns nothing
 */
const addBodyToContext = (body: TLesanBody) => context["body"] = body;

/**
 * this function is create for define all things in local scope
 *  and also  all functions of context define in this function
 * @returns - return objects of all functions that define in this function
 */
export const contextFns = {
  getContextModel,
  setContext,
  addContexts,
  addContext,
  addReqToContext,
  addHeaderToContext,
  addBodyToContext,
};
