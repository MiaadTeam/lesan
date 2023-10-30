import { ObjectId } from "./npmDeps.ts";
import { instance, size, string } from "./npmDeps.ts";
import { TLesanBody } from "./utils/checkWants.ts";

export const objectIdValidation = instance(ObjectId) || size(string(), 24);

/**
 * details of input is include set , get
 * @public
 */
export interface Details {
  /**
   *  set of query
   */
  set: Record<string, any>;
  /**
   * get pf query
   * What the client wants to return
   */
  get: Record<string, any>;
}

/**
 * interface is type of input of Actions
 * @public
 */
export interface TLesanBody {
  /**
   * name of service
   * "main" | "blog" | "ecommerce"
   */
  service?: string;
  /**
   * model : schema name that client wants
   * act : name of Actions
   */
  model: string;
  act: string;
  /**
   * details of request set and get
   */
  details: Details;
}

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
  body: TLesanBody | null;
}
