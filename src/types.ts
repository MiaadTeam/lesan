import { ObjectId } from "./deps.ts";
import { instance, size, string } from "./npmDeps.ts";
import { Body } from "./utils/checkWants.ts";

export const objectIdValidation = instance(ObjectId) || size(string(), 24);

/**
 * Context Holds values and carries them in functions.
 * @example
 * {
 *    Request: "values of Req",
 *      user: {
 *           "_id":1,
 *           "name":"ali",
 *           "lastName":"Alavi"
 *           "role":"Admin"
 *      }  *
 */
export interface LesanContenxt {
  [key: string]: any;
  Headers: Headers;
  body: Body | null;
}
