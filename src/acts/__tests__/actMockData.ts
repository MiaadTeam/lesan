import { object, string } from "../../npmDeps.ts";
import { Services } from "../types.ts";

export const testUserObj = { name: string() };
export const testGetUserAct = {
  validator: object(testUserObj),
  fn: () => ({ name: "amir" }),
};
export const testGetWareAct = {
  validator: object(testUserObj),
  fn: () => ({ name: "wareName" }),
};

export const mockActs: Services = {
  main: {
    user: {
      getUser: testGetUserAct,
    },
  },
  ecommerce: "http://localhost:8080/lesan",
  storeHouse: {
    ware: {
      getWares: testGetWareAct,
    },
  },
};
