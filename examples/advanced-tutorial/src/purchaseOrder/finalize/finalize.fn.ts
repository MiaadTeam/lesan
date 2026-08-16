import { type ActFn, ObjectId } from "lesan";
import { budgetLine, coreApp, purchaseOrder } from "../../../mod.ts";
import { throwError } from "@lib";
import type { MyContext } from "@lib";

export const finalizeFn: ActFn = async (body) => {
  const {
    set: { _id },
    get,
  } = body.details;

  const { user }: MyContext = coreApp.contextFns.getContextModel() as MyContext;

  const poId = new ObjectId(_id as string);

  const po = await purchaseOrder.findOne({
    filters: { _id: poId },
    projection: {
      _id: 1,
      status: 1,
      estimatedAmount: 1,
      "budgetLine._id": 1,
    },
  });

  !po && throwError("purchase order not found");

  if (po!.status !== "Approved") {
    throwError("only approved purchase orders can be finalized");
  }

  if ((po as any)?.budgetLine?._id) {
    const amount = po!.estimatedAmount || 0;
    await budgetLine.findOneAndUpdate({
      filter: { _id: (po as any).budgetLine._id },
      update: {
        $inc: {
          totalEncumbered: -amount,
          totalSpent: amount,
        },
      },
      projection: { _id: 1 },
    });
  }

  const performerName = `${(user as any).first_name ?? ""} ${(user as any).last_name ?? ""}`.trim();

  return await purchaseOrder.findOneAndUpdate({
    filter: { _id: poId },
    update: {
      $set: {
        status: "Completed",
        completedAt: new Date(),
      },
      $push: {
        history: {
          action: "finalized",
          performed: {
            by: user._id.toString(),
            name: performerName,
            at: new Date(),
            role: { id: "", name: "" },
          },
        },
      },
    },
    projection: get,
  });
};
