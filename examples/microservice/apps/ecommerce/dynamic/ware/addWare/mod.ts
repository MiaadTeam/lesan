import { ecommerceApp } from "../../../mod.ts";
import { addWareFn } from "./addWare.fn.ts";
import { addWareValidator } from "./addWare.val.ts";

export * from "./addWare.fn.ts";
export * from "./addWare.val.ts";

export const addWareSetup = () => {};
// ecommerceApp.acts.setAct({
//   type: "dynamic",
//   schema: "ware",
//   fn: addWareFn,
//   actName: "addWare",
//   validator: addWareValidator(),
// });
