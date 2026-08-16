import { type ActFn, ObjectId } from "lesan";
import { budgetLine, coreApp, process, processStep, purchaseOrder, stepApproval } from "../../../mod.ts";
import { resolveProcessForPO, throwError } from "@lib";
import type { MyContext } from "@lib";

export const submitFn: ActFn = async (body) => {
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
      currentStep: 1,
      estimatedAmount: 1,
      title: 1,
      "organization._id": 1,
      "requestingUnit._id": 1,
      "product._id": 1,
      "process._id": 1,
      "budgetLine._id": 1,
    },
  });

  !po && throwError("purchase order not found");

  if (po!.status !== "Draft" && po!.status !== "Pending") {
    throwError("only draft orders can be submitted");
  }

  let processId = (po as any)?.process?._id as string | undefined;

  if (!processId && (po as any)?.organization?._id) {
    processId = await resolveProcessForPO({
      organizationId: (po as any).organization._id.toString(),
      ...((po as any)?.requestingUnit?._id && {
        requestingUnitId: (po as any).requestingUnit._id.toString(),
      }),
      productId: (po as any).product._id.toString(),
    });
  }

  !processId && throwError("no active process found for this purchase order");

  const processDoc = await process.findOne({
    filters: { _id: new ObjectId(processId) },
    projection: { _id: 1, status: 1 },
  });

  !processDoc || processDoc!.status !== "Active" &&
    throwError("process is not active");

  const steps = await processStep
    .aggregation({
      pipeline: [
        { $match: { "process._id": new ObjectId(processId as string) } },
        { $sort: { order: 1 } },
      ],
      projection: {
        _id: 1,
        name: 1,
        order: 1,
        stepType: 1,
        groupsOperator: 1,
        assigneeGroups: 1,
      },
    })
    .toArray();

  if (!steps || steps.length === 0) {
    throwError("process has no steps");
  }

  const firstStep = steps[0];
  const firstStepUnits = (firstStep!.assigneeGroups as {
    unitIds: string[];
  }[]).flatMap((g) => g.unitIds);

  const uniqueUnitIds = [...new Set(firstStepUnits.map((u) => u.toString()))];

  for (const unitId of uniqueUnitIds) {
    await stepApproval.insertOne({
      doc: { status: "pending" },
      relations: {
        purchaseOrder: {
          _ids: poId,
          relatedRelations: { stepApprovals: true },
        },
        processStep: {
          _ids: new ObjectId(firstStep!._id as string),
          relatedRelations: { approvals: true },
        },
        unit: {
          _ids: new ObjectId(unitId),
          relatedRelations: { stepApprovals: true },
        },
      },
      projection: { _id: 1 },
    });
  }

  const performerName = `${(user as any).first_name ?? ""} ${(user as any).last_name ?? ""}`.trim();
  const performedBy = user._id.toString();

  const historyEntry = {
    action: "submitted",
    performed: {
      by: performedBy,
      name: performerName,
      at: new Date(),
      role: {
        id: "",
        name: "",
      },
    },
    details: { processId, stepOrder: 1 },
  };

  const updates: Record<string, unknown> = {
    status: "InProgress",
    currentStep: 1,
  };

  if (!(po as any).process?._id) {
    await purchaseOrder.addRelation({
      filters: { _id: poId },
      relations: {
        process: {
          _ids: new ObjectId(processId as string),
          relatedRelations: { purchaseOrders: true },
        },
      },
      projection: { _id: 1 },
      replace: true,
    });
  }

  if ((po as any)?.budgetLine?._id) {
    const budgetLineId = (po as any).budgetLine._id;
    await budgetLine.findOneAndUpdate({
      filter: { _id: budgetLineId },
      update: {
        $inc: {
          totalEncumbered: po!.estimatedAmount || 0,
          remainingBudget: -(po!.estimatedAmount || 0),
        },
      },
      projection: { _id: 1 },
    });
  }

  return await purchaseOrder.findOneAndUpdate({
    filter: { _id: poId },
    update: {
      $set: updates,
      $push: { history: historyEntry },
    },
    projection: get,
  });
};
