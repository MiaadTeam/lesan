import { type ActFn, ObjectId } from "lesan";
import { budgetLine, coreApp, purchaseOrder } from "../../../mod.ts";
import { throwError } from "@lib";
import type { MyContext } from "@lib";

export const cancelFn: ActFn = async (body) => {
  const {
    set: { _id, reason },
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

  const cancellable = ["Draft", "Pending", "InProgress"];
  if (!cancellable.includes(po!.status)) {
    throwError("this purchase order cannot be cancelled");
  }

  if ((po as any)?.budgetLine?._id) {
    await budgetLine.findOneAndUpdate({
      filter: { _id: (po as any).budgetLine._id },
      update: {
        $inc: {
          totalEncumbered: -(po!.estimatedAmount || 0),
          remainingBudget: po!.estimatedAmount || 0,
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
        status: "Cancelled",
        completedAt: new Date(),
      },
      $push: {
        history: {
          action: "cancelled",
          performed: {
            by: user._id.toString(),
            name: performerName,
            at: new Date(),
            role: { id: "", name: "" },
          },
          ...(reason && { details: { reason } }),
        },
      },
    },
    projection: get,
  });
};
