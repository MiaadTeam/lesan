import { type ActFn, ObjectId } from "lesan";
import { tender } from "../../../mod.ts";
import { throwError } from "@lib";

export const awardFn: ActFn = async (body) => {
  const {
    set: { tenderId, supplier },
    get,
  } = body.details;

  const tenderIdObj = new ObjectId(tenderId as string);

  const foundedTender = await tender.findOne({
    filters: { _id: tenderIdObj },
    projection: { _id: 1, status: 1, offers: 1 },
  });

  !foundedTender && throwError("tender not found");

  if (foundedTender!.status !== "Open") {
    throwError("tender is not open for awarding");
  }

  const offers = (foundedTender as any).offers || [];
  const winningOffer = offers.find((o: { supplier: string }) => o.supplier === supplier);

  !winningOffer && throwError("the selected supplier has no offer on this tender");

  return await tender.findOneAndUpdate({
    filter: { _id: tenderIdObj },
    update: {
      $set: {
        status: "Awarded",
      },
    },
    projection: get,
  });
};
