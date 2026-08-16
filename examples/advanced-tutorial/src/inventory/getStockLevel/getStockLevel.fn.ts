import { type ActFn } from "lesan";
import { getStockLevel as getStockLevelUtil } from "@lib";

export const getStockLevelFn: ActFn = async (body) => {
  const {
    set: { storeId, productId },
  } = body.details;

  return await getStockLevelUtil(storeId as string, productId as string);
};
