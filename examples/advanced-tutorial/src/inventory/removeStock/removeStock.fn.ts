import { type ActFn } from "lesan";
import { removeStock as removeStockUtil } from "@lib";
import { coreApp } from "../../../mod.ts";
import type { MyContext } from "@lib";

export const removeStockFn: ActFn = async (body) => {
  const {
    set: { storeId, productId, quantity, reason, description, referenceType, referenceId },
  } = body.details;

  const { user }: MyContext = coreApp.contextFns.getContextModel() as MyContext;

  return await removeStockUtil(
    storeId as string,
    productId as string,
    quantity as number,
    (reason as string) || "goods_issue",
    user._id.toString(),
    {
      ...(description && { description: description as string }),
      ...(referenceType && { referenceType: referenceType as string }),
      ...(referenceId && { referenceId: referenceId as string }),
    },
  );
};
