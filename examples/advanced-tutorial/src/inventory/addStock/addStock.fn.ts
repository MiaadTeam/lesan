import { type ActFn } from "lesan";
import { addStock as addStockUtil } from "@lib";
import { coreApp } from "../../../mod.ts";
import type { MyContext } from "@lib";

export const addStockFn: ActFn = async (body) => {
  const {
    set: { storeId, productId, quantity, reason, description, referenceType, referenceId },
  } = body.details;

  const { user }: MyContext = coreApp.contextFns.getContextModel() as MyContext;

  return await addStockUtil(
    storeId as string,
    productId as string,
    quantity as number,
    (reason as string) || "goods_receipt",
    user._id.toString(),
    {
      ...(description && { description: description as string }),
      ...(referenceType && { referenceType: referenceType as string }),
      ...(referenceId && { referenceId: referenceId as string }),
    },
  );
};
