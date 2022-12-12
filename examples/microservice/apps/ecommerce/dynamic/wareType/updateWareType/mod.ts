import { ecommerceApp } from "../../../mod.ts";
import { updateWareTypeFn } from "./updateWareType.fn.ts";
import { updateWareTypeValidator } from "./updateWareType.val.ts";

export * from "./updateWareType.fn.ts";
export * from "./updateWareType.val.ts";

export const updateWareTypeSetup = () =>
  ecommerceApp.acts.setAct({
    type: "dynamic",
    schema: "wareType",
    fn: updateWareTypeFn,
    actName: "updateWareType",
    validator: updateWareTypeValidator(),
  });
