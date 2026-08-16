/**
 * Feature Constants — Feature flag enum definitions.
 *
 * Defines the fine-grained permission flags that can be assigned to Users
 * and Units. `checkFeature` uses these to gate access to specific system
 * actions beyond role-based access.
 *
 * @example
 * // A Purchasing Manager might have:
 * [
 *   { feature: "canRegisterPurchaseOrder" },
 *   { feature: "canApprovePurchaseOrder" },
 *   { feature: "canCreateTender" }
 * ]
 */
import { enums } from "lesan";

export const feature_array = [
  "canRegisterPurchaseOrder",
  "canApprovePurchaseOrder",
  "canCreateTender",
  "canRespondToTender",
  "canViewWarehouse",
  "canManageInventory",
  "canManageBudget",
  "canConfirmGoodsReceipt",
  "canIssuePaymentOrder",
  "canManageUsers",
  "canManageFeatures",
] as const;

export const feature_enums = enums(feature_array);
