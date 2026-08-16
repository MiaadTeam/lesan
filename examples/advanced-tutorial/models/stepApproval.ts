/**
 * StepApproval — Per-unit, per-step approval decision on a purchase order.
 *
 * Tracks each unit's decision (pending|approved|rejected) for a specific step
 * within a PurchaseOrder's workflow. Created automatically when the order
 * reaches a step. The `submitDecision` custom action processes a unit's vote,
 * evaluates the step via `evaluateStepStatus()`, and auto-advances the order
 * or marks it rejected/completed.
 *
 * Pure fields: status (pending|approved|rejected), comment, decidedAt
 * Relations: purchaseOrder (PurchaseOrder), processStep (ProcessStep),
 *   unit (Unit), decidedBy (User)
 *
 * @example
 * // An approved decision by the Central Warehouse for step 1 of purchase order po_tsh
 * {
 *   _id: ObjectId("sa_step1_warehouse"),
 *   status: "approved",
 *   comment: "Approved. Stock is sufficient.",
 *   decidedAt: ISODate("2024-06-10T11:30:00Z"),
 *   // purchaseOrder → { _id: ObjectId("po_tsh"), title: "Purchase 100 TSH kits" }
 *   // processStep → { _id: ObjectId("step1"), name: "Purchasing Manager Approval", order: 1 }
 *   // unit → { _id: ObjectId("unit_warehouse"), name: "Central Warehouse Unit" }
 *   // decidedBy → { _id: ObjectId("user_2"), first_name: "Ali", last_name: "Rezaei" }
 * }
 */
import { coreApp } from "../mod.ts";
import {
  coerce,
  date,
  defaulted,
  enums,
  optional,
  type RelationDataType,
  type RelationSortOrderType,
  string,
} from "lesan";
import { createUpdateAt } from "@lib";
import {
  processStep_excludes,
  purchaseOrder_excludes,
  unit_excludes,
  user_excludes,
} from "./excludes.ts";

export const approval_status_array = ["pending", "approved", "rejected"];
export const approval_status_emums = enums(approval_status_array);

export const stepApproval_pure = {
  status: defaulted(
    coerce(
      approval_status_emums,
      string(),
      (value) => value as typeof approval_status_array[number],
    ),
    "pending",
  ),
  comment: optional(string()),
  decidedAt: optional(coerce(date(), string(), (value) => new Date(value))),
  ...createUpdateAt,
};

export const stepApproval_relations = {
  purchaseOrder: {
    schemaName: "purchaseOrder",
    type: "single" as RelationDataType,
    optional: false,
    excludes: purchaseOrder_excludes,
    relatedRelations: {
      stepApprovals: {
        type: "multiple" as RelationDataType,
        limit: 50,
        sort: {
          field: "_id",
          order: "desc" as RelationSortOrderType,
        },
      },
    },
  },
  processStep: {
    schemaName: "processStep",
    type: "single" as RelationDataType,
    optional: false,
    excludes: processStep_excludes,
    relatedRelations: {
      approvals: {
        type: "multiple" as RelationDataType,
        limit: 50,
        sort: {
          field: "_id",
          order: "desc" as RelationSortOrderType,
        },
      },
    },
  },
  unit: {
    schemaName: "unit",
    type: "single" as RelationDataType,
    optional: false,
    excludes: unit_excludes,
    relatedRelations: {
      stepApprovals: {
        type: "multiple" as RelationDataType,
        limit: 50,
        sort: {
          field: "_id",
          order: "desc" as RelationSortOrderType,
        },
      },
    },
  },
  decidedBy: {
    schemaName: "user",
    type: "single" as RelationDataType,
    optional: true,
    excludes: user_excludes,
    relatedRelations: {
      stepDecisions: {
        type: "multiple" as RelationDataType,
        limit: 50,
        sort: {
          field: "_id",
          order: "desc" as RelationSortOrderType,
        },
      },
    },
  },
};

export const stepApprovals = () =>
  coreApp.odm.newModel("stepApproval", stepApproval_pure, stepApproval_relations);
