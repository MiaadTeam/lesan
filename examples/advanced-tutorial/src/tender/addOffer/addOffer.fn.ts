import { type ActFn, ObjectId } from "lesan";
import { tender } from "../../../mod.ts";
import { throwError } from "@lib";

export const addOfferFn: ActFn = async (body) => {
  const {
    set: { tenderId, supplier, price, score, submittedAt },
    get,
  } = body.details;

  const tenderIdObj = new ObjectId(tenderId as string);

  const foundedTender = await tender.findOne({
    filters: { _id: tenderIdObj },
    projection: { _id: 1, status: 1 },
  });

  !foundedTender && throwError("tender not found");

  if (foundedTender!.status !== "Open") {
    throwError("tender is not open for offers");
  }

  return await tender.findOneAndUpdate({
    filter: { _id: tenderIdObj },
    update: {
      $push: {
        offers: {
          supplier,
          price,
          score,
          submittedAt: new Date(submittedAt as string),
        },
      },
    },
    projection: get,
  });
};
