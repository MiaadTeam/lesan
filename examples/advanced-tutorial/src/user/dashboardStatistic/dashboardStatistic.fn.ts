import type { ActFn, Document } from "lesan";
import { ObjectId } from "lesan";
import {
  budgetLine,
  coreApp,
  inventory,
  purchaseOrder,
  stepApproval,
  stockMovement,
} from "../../../mod.ts";
import type { MyContext } from "@lib";
import { throwError } from "@lib";

export const dashboardStatisticFn: ActFn = async (body) => {
  const {
    set: { activeRoleId, unitId: paramUnitId, orgId: paramOrgId },
    get,
  } = body.details;

  const { user }: MyContext = coreApp.contextFns.getContextModel() as MyContext;

  const activeRole = (user.roles || []).find(
    (r: { roleId: string }) => r.roleId === activeRoleId,
  ) as { name: string; scopeType?: string; scopeId?: string } | undefined;

  if (!activeRole) {
    throwError("Active role not found");
    return;
  }

  let effectiveUnitId: ObjectId | null = null;
  let effectiveOrgId: ObjectId | null = null;

  if (activeRole.name === "OrgHead" || activeRole.name === "Manager") {
    if (activeRole.scopeType === "organization" && activeRole.scopeId) {
      effectiveOrgId = new ObjectId(activeRole.scopeId);
    } else if (paramOrgId) {
      effectiveOrgId = new ObjectId(paramOrgId as string);
    }
  } else if (activeRole.name === "UnitHead") {
    if (activeRole.scopeType === "unit" && activeRole.scopeId) {
      effectiveUnitId = new ObjectId(activeRole.scopeId);
    }
  } else {
    if (paramUnitId) effectiveUnitId = new ObjectId(paramUnitId as string);
    if (paramOrgId) effectiveOrgId = new ObjectId(paramOrgId as string);
  }

  const result: Record<string, unknown> = {};
  const tasks: Promise<void>[] = [];

  const prMatch: Document = {};
  if (effectiveUnitId) prMatch["requestingUnit._id"] = effectiveUnitId;
  else if (effectiveOrgId) prMatch["organization._id"] = effectiveOrgId;

  if (get.purchasingOrderCounts === 1) {
    tasks.push(
      purchaseOrder.aggregation({
        pipeline: [
          ...(Object.keys(prMatch).length > 0 ? [{ $match: prMatch }] : []),
          {
            $group: {
              _id: null,
              draft: { $sum: { $cond: [{ $eq: ["$status", "Draft"] }, 1, 0] } },
              pending: { $sum: { $cond: [{ $eq: ["$status", "Pending"] }, 1, 0] } },
              inProgress: { $sum: { $cond: [{ $eq: ["$status", "InProgress"] }, 1, 0] } },
              approved: { $sum: { $cond: [{ $eq: ["$status", "Approved"] }, 1, 0] } },
              rejected: { $sum: { $cond: [{ $eq: ["$status", "Rejected"] }, 1, 0] } },
              completed: { $sum: { $cond: [{ $eq: ["$status", "Completed"] }, 1, 0] } },
              cancelled: { $sum: { $cond: [{ $eq: ["$status", "Cancelled"] }, 1, 0] } },
              total: { $sum: 1 },
            },
          },
        ],
      }).toArray().then((arr) => {
        const c = arr[0];
        result.purchasingOrderCounts = c
          ? {
            draft: c.draft,
            pending: c.pending,
            inProgress: c.inProgress,
            approved: c.approved,
            rejected: c.rejected,
            completed: c.completed,
            cancelled: c.cancelled,
            total: c.total,
          }
          : { draft: 0, pending: 0, inProgress: 0, approved: 0, rejected: 0, completed: 0, cancelled: 0, total: 0 };
      }),
    );
  }

  if (get.prStatusDistribution === 1) {
    const statuses = [
      "Draft",
      "Pending",
      "InProgress",
      "Approved",
      "Rejected",
      "Completed",
      "Cancelled",
    ];
    tasks.push(
      purchaseOrder.aggregation({
        pipeline: [
          ...(Object.keys(prMatch).length > 0 ? [{ $match: prMatch }] : []),
          { $group: { _id: "$status", count: { $sum: 1 } } },
        ],
      }).toArray().then((arr) => {
        const groups: Record<string, number> = {};
        for (const g of arr) groups[g._id as string] = g.count;
        result.prStatusDistribution = Object.fromEntries(
          statuses.map((s) => [s.toLowerCase(), groups[s] || 0]),
        );
      }),
    );
  }

  if (get.pendingApprovalCount === 1 || get.recentApprovals === 1) {
    const saMatch: Document = {};
    if (effectiveUnitId) saMatch["unit._id"] = effectiveUnitId;

    const saFacet: Record<string, unknown[]> = {};
    if (get.pendingApprovalCount === 1) {
      saFacet.pendingApprovalCount = [
        { $match: { status: "pending" } },
        { $count: "count" },
      ];
    }
    if (get.recentApprovals === 1) {
      saFacet.recentApprovals = [
        { $match: { status: "pending" } },
        { $sort: { createdAt: -1 } },
        { $limit: 5 },
      ];
    }

    tasks.push(
      stepApproval.aggregation({
        pipeline: [
          ...(Object.keys(saMatch).length > 0 ? [{ $match: saMatch }] : []),
          { $facet: saFacet },
        ],
      }).toArray().then((arr) => {
        const facet = arr[0] || {};
        result.pendingApprovalCount = facet.pendingApprovalCount?.[0]?.count || 0;
        result.recentApprovals = facet.recentApprovals || [];
      }),
    );
  }

  if (get.finance === 1) {
    const blMatch: Document = {};
    if (effectiveOrgId) blMatch["organization._id"] = effectiveOrgId;
    if (effectiveUnitId) blMatch["unit._id"] = effectiveUnitId;

    tasks.push(
      budgetLine.aggregation({
        pipeline: [
          ...(Object.keys(blMatch).length > 0 ? [{ $match: blMatch }] : []),
          {
            $group: {
              _id: null,
              totalAllocated: { $sum: "$totalAllocated" },
              totalEncumbered: { $sum: "$totalEncumbered" },
              totalSpent: { $sum: "$totalSpent" },
              totalRemaining: { $sum: "$remainingBudget" },
            },
          },
        ],
      }).toArray().then((arr) => {
        result.finance = arr[0]
          ? {
            totalAllocated: arr[0].totalAllocated,
            totalEncumbered: arr[0].totalEncumbered,
            totalSpent: arr[0].totalSpent,
            totalRemaining: arr[0].totalRemaining,
          }
          : { totalAllocated: 0, totalEncumbered: 0, totalSpent: 0, totalRemaining: 0 };
      }),
    );
  }

  if (get.inventorySummary === 1) {
    tasks.push(
      inventory.aggregation({
        pipeline: [
          {
            $facet: {
              total: [
                {
                  $group: {
                    _id: null,
                    totalItems: { $sum: 1 },
                    totalQuantity: { $sum: "$quantity" },
                  },
                },
              ],
              byProduct: [
                { $match: { "product._id": { $exists: true, $ne: null } } },
                {
                  $group: {
                    _id: "$product._id",
                    name: { $first: "$product.name" },
                    count: { $sum: 1 },
                    totalQuantity: { $sum: "$quantity" },
                  },
                },
                { $sort: { totalQuantity: -1 } },
                { $limit: 5 },
              ],
            },
          },
        ],
      }).toArray().then((arr) => {
        const facet = arr[0] || {};
        const total = facet.total?.[0];
        result.inventorySummary = {
          totalItems: total?.totalItems || 0,
          totalQuantity: total?.totalQuantity || 0,
          byProduct: facet.byProduct || [],
        };
      }),
    );
  }

  if (get.inventoryLowStock === 1) {
    tasks.push(
      inventory.aggregation({
        pipeline: [
          { $match: { minQuantity: { $exists: true, $ne: null } } },
          { $match: { $expr: { $lt: ["$quantity", "$minQuantity"] } } },
          { $count: "count" },
        ],
      }).toArray().then((arr) => {
        result.inventoryLowStock = arr[0]?.count || 0;
      }),
    );
  }

  if (get.budgetBurnDown === 1) {
    const blMatch: Document = {};
    if (effectiveOrgId) blMatch["organization._id"] = effectiveOrgId;

    tasks.push(
      budgetLine.aggregation({
        pipeline: [
          ...(Object.keys(blMatch).length > 0 ? [{ $match: blMatch }] : []),
          {
            $group: {
              _id: null,
              totalAllocated: { $sum: "$totalAllocated" },
              totalEncumbered: { $sum: "$totalEncumbered" },
              totalSpent: { $sum: "$totalSpent" },
              totalRemaining: { $sum: "$remainingBudget" },
            },
          },
        ],
      }).toArray().then((arr) => {
        result.budgetBurnDown = arr[0]
          ? {
            totalAllocated: arr[0].totalAllocated,
            totalEncumbered: arr[0].totalEncumbered,
            totalSpent: arr[0].totalSpent,
            totalRemaining: arr[0].totalRemaining,
          }
          : { totalAllocated: 0, totalEncumbered: 0, totalSpent: 0, totalRemaining: 0 };
      }),
    );
  }

  if (get.prMonthlyTrend === 1) {
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    tasks.push(
      purchaseOrder.aggregation({
        pipeline: [
          { $match: { requestedAt: { $gte: twelveMonthsAgo }, ...prMatch } },
          {
            $group: {
              _id: {
                year: { $year: "$requestedAt" },
                month: { $month: "$requestedAt" },
              },
              count: { $sum: 1 },
            },
          },
          { $sort: { "_id.year": 1, "_id.month": 1 } },
          {
            $project: {
              _id: 0,
              year: "$_id.year",
              month: "$_id.month",
              count: 1,
            },
          },
        ],
      }).toArray().then((arr) => {
        result.prMonthlyTrend = arr || [];
      }),
    );
  }

  if (get.stockMovementSummary === 1) {
    tasks.push(
      stockMovement.aggregation({
        pipeline: [
          {
            $group: {
              _id: "$reason",
              totalQuantity: { $sum: "$quantity" },
              count: { $sum: 1 },
            },
          },
          { $sort: { _id: 1 } },
        ],
      }).toArray().then((arr) => {
        const byReason = arr || [];
        const totalIn = byReason
          .filter((r) => (r.totalQuantity as number) > 0)
          .reduce((sum, r) => sum + (r.totalQuantity as number), 0);
        const totalOut = byReason
          .filter((r) => (r.totalQuantity as number) < 0)
          .reduce((sum, r) => sum + Math.abs(r.totalQuantity as number), 0);
        result.stockMovementSummary = { totalIn, totalOut, byReason };
      }),
    );
  }

  await Promise.all(tasks);
  return result;
};
