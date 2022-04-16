import { Struct } from "../deps.ts";
import { Body } from "../utils/mod.ts";

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

export interface ActInp {
  type: "static" | "dynamic";
  schema: string;
  actName: string;
  validator: Struct<any>;
  fn: ActFn;
}
