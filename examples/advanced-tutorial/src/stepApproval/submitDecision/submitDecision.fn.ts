import { type ActFn, ObjectId } from "lesan";
import {
  coreApp,
  processStep,
  purchaseOrder,
  stepApproval,
} from "../../../mod.ts";
import { evaluateStepStatus, throwError } from "@lib";
import type { MyContext } from "@lib";

export const submitDecisionFn: ActFn = async (body) => {
  const {
    set: { approvalId, decision, comment },
    get,
  } = body.details;

  const { user }: MyContext = coreApp.contextFns.getContextModel() as MyContext;

  const approvalIdObj = new ObjectId(approvalId as string);

  const approval = await stepApproval.findOne({
    filters: { _id: approvalIdObj },
    projection: {
      _id: 1,
      status: 1,
      "purchaseOrder._id": 1,
      "purchaseOrder.status": 1,
      "purchaseOrder.currentStep": 1,
      "processStep._id": 1,
      "processStep.groupsOperator": 1,
      "processStep.assigneeGroups": 1,
      "unit._id": 1,
    },
  });

  !approval && throwError("approval not found");

  if (approval!.status !== "pending") {
    throwError("this approval has already been decided");
  }

  const poStatus = (approval as any)?.purchaseOrder?.status;
  if (poStatus !== "InProgress") {
    throwError("the purchase order is not in progress");
  }

  const poId = new ObjectId((approval as any).purchaseOrder._id as string);
  const stepId = new ObjectId((approval as any).processStep._id as string);

  await stepApproval.findOneAndUpdate({
    filter: { _id: approvalIdObj },
    update: {
      $set: {
        status: decision,
        ...(comment && { comment }),
        decidedAt: new Date(),
      },
    },
    projection: { _id: 1 },
  });

  if (decision === "approved") {
    await stepApproval.addRelation({
      filters: { _id: approvalIdObj },
      relations: {
        decidedBy: {
          _ids: user._id,
          relatedRelations: { stepDecisions: true },
        },
      },
      projection: { _id: 1 },
      replace: true,
    });
  }

  const stepDoc = await processStep.findOne({
    filters: { _id: stepId },
    projection: {
      _id: 1,
      order: 1,
      groupsOperator: 1,
      assigneeGroups: 1,
    },
  });

  !stepDoc && throwError("process step not found");

  const approvals = await stepApproval
    .aggregation({
      pipeline: [
        {
          $match: {
            "purchaseOrder._id": poId,
            "processStep._id": stepId,
          },
        },
        { $project: { unitId: { $toString: "$unit._id" }, status: 1 } },
      ],
    })
    .toArray();

  const stepStatus = evaluateStepStatus(
    approvals.map((a) => ({
      unitId: (a as any).unitId as string,
      status: (a as any).status as "pending" | "approved" | "rejected",
    })),
    (stepDoc as any).groupsOperator as "AND" | "OR",
    ((stepDoc as any).assigneeGroups || []) as {
      operator: "AND" | "OR";
      unitIds: string[];
    }[],
  );

  const po = await purchaseOrder.findOne({
    filters: { _id: poId },
    projection: { _id: 1, status: 1, currentStep: 1, "process._id": 1 },
  });

  const performerName = `${(user as any).first_name ?? ""} ${(user as any).last_name ?? ""}`.trim();

  const pushHistory = (action: string, details?: Record<string, unknown>) => ({
    $push: {
      history: {
        action,
        performed: {
          by: user._id.toString(),
          name: performerName,
          at: new Date(),
          role: { id: "", name: "" },
        },
        ...(details && { details }),
      },
    },
  });

  if (stepStatus === "rejected") {
    return await purchaseOrder.findOneAndUpdate({
      filter: { _id: poId },
      update: {
        $set: { status: "Rejected", completedAt: new Date() },
        ...pushHistory("rejected", { stepOrder: (stepDoc as any).order, decision }),
      },
      projection: get,
    });
  }

  if (stepStatus === "approved") {
    const nextSteps = await processStep
      .aggregation({
        pipeline: [
          { $match: { "process._id": (po as any)?.process?._id, order: { $gt: (stepDoc as any).order } } },
          { $sort: { order: 1 } },
          { $limit: 1 },
        ],
        projection: { _id: 1, order: 1, groupsOperator: 1, assigneeGroups: 1 },
      })
      .toArray();

    const nextStep = nextSteps[0];

    if (!nextStep) {
      return await purchaseOrder.findOneAndUpdate({
        filter: { _id: poId },
        update: {
          $set: { status: "Approved", completedAt: new Date() },
          ...pushHistory("approved", { stepOrder: (stepDoc as any).order, decision }),
        },
        projection: get,
      });
    }

    const nextUnits = (nextStep as any).assigneeGroups.flatMap(
      (g: { unitIds: string[] }) => g.unitIds,
    );
    const uniqueUnits = [...new Set(nextUnits.map((u: unknown) => String(u)))];

    for (const unitId of uniqueUnits) {
      await stepApproval.insertOne({
        doc: { status: "pending" },
        relations: {
          purchaseOrder: {
            _ids: poId,
            relatedRelations: { stepApprovals: true },
          },
          processStep: {
            _ids: new ObjectId(nextStep._id as string),
            relatedRelations: { approvals: true },
          },
          unit: {
            _ids: new ObjectId(String(unitId)),
            relatedRelations: { stepApprovals: true },
          },
        },
        projection: { _id: 1 },
      });
    }

    return await purchaseOrder.findOneAndUpdate({
      filter: { _id: poId },
      update: {
        $set: { currentStep: (nextStep as any).order },
        ...pushHistory("approved", { stepOrder: (stepDoc as any).order, decision }),
      },
      projection: get,
    });
  }

  return await purchaseOrder.findOneAndUpdate({
    filter: { _id: poId },
    update: {
      ...pushHistory("decision", { stepOrder: (stepDoc as any).order, decision }),
    },
    projection: get,
  });
};
