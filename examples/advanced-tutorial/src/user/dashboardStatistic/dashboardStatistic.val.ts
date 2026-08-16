import { number, object, optional, string } from "lesan";
import { activeRoleMixin } from "@lib";

export const dashboardStatisticValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      unitId: optional(string()),
      orgId: optional(string()),
    }),
    get: object({
      purchasingOrderCounts: optional(number()),
      pendingApprovalCount: optional(number()),
      recentApprovals: optional(number()),
      finance: optional(number()),
      prStatusDistribution: optional(number()),
      inventorySummary: optional(number()),
      inventoryLowStock: optional(number()),
      budgetBurnDown: optional(number()),
      prMonthlyTrend: optional(number()),
      stockMovementSummary: optional(number()),
    }),
  });
};
