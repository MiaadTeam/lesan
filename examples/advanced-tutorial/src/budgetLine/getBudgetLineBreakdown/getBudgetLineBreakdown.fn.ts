import { type ActFn, ObjectId } from "lesan";
import { budgetLine, purchaseOrder } from "../../../mod.ts";
import { throwError } from "@lib";

export const getBudgetLineBreakdownFn: ActFn = async (body) => {
  const {
    set: { _id },
  } = body.details;

  const budgetLineId = new ObjectId(_id as string);

  const bl = await budgetLine.findOne({
    filters: { _id: budgetLineId },
    projection: {
      _id: 1,
      code: 1,
      title: 1,
      year: 1,
      totalAllocated: 1,
      totalEncumbered: 1,
      totalSpent: 1,
      remainingBudget: 1,
    },
  });

  !bl && throwError("budget line not found");

  const relatedPOs = await purchaseOrder
    .aggregation({
      pipeline: [
        { $match: { "budgetLine._id": budgetLineId } },
        { $sort: { createdAt: -1 } },
        {
          $project: {
            _id: 1,
            title: 1,
            estimatedAmount: 1,
            status: 1,
            currentStep: 1,
            requestedAt: 1,
          },
        },
      ],
    })
    .toArray();

  const encumbered = relatedPOs
    .filter((po) => ["Pending", "InProgress", "Approved"].includes(po.status))
    .reduce((sum, po) => sum + (po.estimatedAmount as number) || 0, 0);

  const spent = relatedPOs
    .filter((po) => po.status === "Completed")
    .reduce((sum, po) => sum + (po.estimatedAmount as number) || 0, 0);

  return {
    ...bl,
    purchaseOrders: relatedPOs,
    computed: {
      encumbered,
      spent,
      available: (bl as any).totalAllocated - encumbered - spent,
    },
  };
};
