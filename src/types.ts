import { Body } from "./utils/checkWants.ts";

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
