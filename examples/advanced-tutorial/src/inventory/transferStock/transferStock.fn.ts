import { type ActFn } from "lesan";
import { transferStock as transferStockUtil } from "@lib";
import { coreApp } from "../../../mod.ts";
import type { MyContext } from "@lib";

export const transferStockFn: ActFn = async (body) => {
  const {
    set: { fromStoreId, toStoreId, productId, quantity },
  } = body.details;

  const { user }: MyContext = coreApp.contextFns.getContextModel() as MyContext;

  return await transferStockUtil(
    fromStoreId as string,
    toStoreId as string,
    productId as string,
    quantity as number,
    user._id.toString(),
  );
};
