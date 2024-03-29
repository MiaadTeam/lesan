import { Struct } from "../npmDeps.ts";
import { TLesanBody } from "../utils/mod.ts";

/**
 * type of ActFn
 *  @param body - input of function is type of body
 *  type of Body is equal to
 *  { service?: ServiceKeys; - nameOfService
 *  contents: "dynamic" | "static"; - type of contest
 *  wants: {
 *    model: string; -model that client want to execute action (name of schema)
 *    act: string;
 *  };
 *  details: Details;
 *  }
 */
export type ActFn = (body: TLesanBody) => any;

/**
 * interface of Act is include of tow features
 * validator of function and fn
 * @interface
 */
export interface Act {
  validator: Struct<any>;
  fn: ActFn;
  preAct?: Function[];
  preValidation?: Function[];
  validationRunType?: "assert" | "create";
}
/**
 * Acts include tow features : dynamic and static
 *  dynamic for dynamic request and static for static request for example get static file
 *  @example
 *
 *     user: {
 *       create: {
 *         validator: (input: any) => {
 *           return true;
 *         },
 *         fn: (input: any) => {
 *           return input;
 *         },
 *       },
 *       update: {
 *         validator: (input: any) => {
 *           return true;
 *         },
 *         fn: (input: any) => {
 *           return input;
 *         },
 *       },
 *     },
 */
export interface Acts {
  [key: string]: {
    [key: string]: Act;
  };
}

/**
 * service inteface is include main service and functions
 *  and also maybe include other services
 *  @example
 *  {
 *     main:{
 *     user: {
 *       create: {
 *         validator: (input: any) => {
 *           return true;
 *         },
 *         fn: (input: any) => {
 *           return input;
 *         },
 *       },
 *     },
 *     "ecommerce":"https://localhost:5050/lesan",
 *      "blog":{
 *     user: {
 *       create: {
 *         validator: (input: any) => {
 *           return true;
 *         },
 *         fn: (input: any) => {
 *           return input;
 *         },
 *       },
 *  },
 *  main services is type of Acts , other services maybe type of string or Act:
 *  if type of string we get answer of req with http Request , but if type of it equal to Acts with anwer to req directly
 */
export interface Services {
  main: Acts;
  [key: string]: Acts | string | undefined;
}

/**
 * ActInp  is type of action in lesan
 * for set action function
 * @interface
 */
export interface ActInp {
  /**
   * name of schema that set action for it
   */
  schema: string;
  /**
   * name of action
   */
  actName: string;
  /**
   * validator function for example for validion input date
   */
  validator: Struct<any>;

  /**
   * function
   */
  fn: ActFn;

  /**
   * these functions use to implement somthing in context or body before run fn
   */
  preAct?: Function[];

  /**
   * these functions use to implement somthing in context or body before run validation
   */
  preValidation?: Function[];

  /**
   * the type of validation shuold run
   */
  validationRunType?: "assert" | "create";
}
