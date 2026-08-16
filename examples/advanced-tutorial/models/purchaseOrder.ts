/**
 * PurchaseOrder — The core procurement document.
 *
 * Created as Draft, then submitted to begin the workflow (Pending) and flow
 * through step approvals (InProgress → Approved/Rejected → Completed/Cancelled).
 * Tracks an embedded history[] of every performed action, and creates budget
 * encumbrances against a BudgetLine when submitted.
 *
 * Pure fields: title, description, estimatedAmount, status, currentStep,
 *   requestedAt, completedAt, history
 * Relations: requester (User), organization (Organization), requestingUnit (Unit),
 *   product (Product), process (Process), attachments (File[]),
 *   stepApprovals (StepApproval[]), budgetLine (BudgetLine), tender (Tender)
 *
 * @example
 * {
 *   _id: ObjectId("po_tsh"),
 *   title: "Purchase 100 TSH kits",
 *   estimatedAmount: 25000000,
 *   status: "InProgress",
 *   currentStep: 1,
 *   requestedAt: ISODate("2024-06-01T08:00:00Z"),
 *   history: [{ action: "submitted", performed: { by: "user_1", name: "Sara Ahmadi", at: ISODate("...") } }],
 *   // requester → { _id: ObjectId("user_1"), first_name: "Sara", last_name: "Ahmadi" }
 *   // organization → { _id: ObjectId("org_central"), name: "Central Hospital" }
 *   // requestingUnit → { _id: ObjectId("unit_lab"), name: "Laboratory" }
 *   // product → { _id: ObjectId("prod_tsh"), name: "TSH Lab Kit" }
 *   // process → { _id: ObjectId("proc_lab"), name: "Medical Equipment Purchase" }
 *   // stepApprovals → [ ... ]
 *   // budgetLine → { _id: ObjectId("bl_1"), code: "BL-2024-01" }
 *   // tender → { _id: ObjectId("tender_1"), status: "Open" }
 * }
 */
import { coreApp } from "../mod.ts";
import {
  array,
  coerce,
  date,
  defaulted,
  enums,
  number,
  object,
  optional,
  type RelationDataType,
  type RelationSortOrderType,
  string,
} from "lesan";
import { createUpdateAt } from "@lib";
import {
  budgetLine_excludes,
  file_excludes,
  organization_excludes,
  process_excludes,
  product_excludes,
  stepApproval_excludes,
  tender_excludes,
  unit_excludes,
  user_excludes,
} from "./excludes.ts";

export const purchaseOrder_status_array = [
  "Draft",
  "Pending",
  "InProgress",
  "Approved",
  "Rejected",
  "Completed",
  "Cancelled",
];
export const purchaseOrder_status_emums = enums(purchaseOrder_status_array);

export const purchaseOrder_pure = {
  title: string(),
  description: optional(string()),
  estimatedAmount: defaulted(number(), 0),
  status: defaulted(
    coerce(
      purchaseOrder_status_emums,
      string(),
      (value) => value as typeof purchaseOrder_status_array[number],
    ),
    "Draft",
  ),
  currentStep: defaulted(number(), 0),
  requestedAt: optional(coerce(date(), string(), (value) => new Date(value))),
  completedAt: optional(coerce(date(), string(), (value) => new Date(value))),
  history: defaulted(
    array(
      object({
        action: string(),
        performed: object({
          by: string(),
          name: string(),
          at: coerce(date(), string(), (value) => new Date(value)),
          role: object({
            id: string(),
            name: string(),
            scopeType: optional(string()),
            scopeId: optional(string()),
          }),
        }),
        unit: optional(object({
          _id: string(),
          name: string(),
        })),
        details: optional(object({})),
      }),
    ),
    [],
  ),
  ...createUpdateAt,
};

export const purchaseOrder_relations = {
  requester: {
    schemaName: "user",
    type: "single" as RelationDataType,
    optional: false,
    excludes: user_excludes,
    relatedRelations: {
      purchaseOrders: {
        type: "multiple" as RelationDataType,
        limit: 50,
        sort: {
          field: "_id",
          order: "desc" as RelationSortOrderType,
        },
      },
    },
  },
  organization: {
    schemaName: "organization",
    type: "single" as RelationDataType,
    optional: true,
    excludes: organization_excludes,
    relatedRelations: {
      purchaseOrders: {
        type: "multiple" as RelationDataType,
        limit: 50,
        sort: {
          field: "_id",
          order: "desc" as RelationSortOrderType,
        },
      },
    },
  },
  requestingUnit: {
    schemaName: "unit",
    type: "single" as RelationDataType,
    optional: true,
    excludes: unit_excludes,
    relatedRelations: {
      purchaseOrders: {
        type: "multiple" as RelationDataType,
        limit: 50,
        sort: {
          field: "_id",
          order: "desc" as RelationSortOrderType,
        },
      },
    },
  },
  product: {
    schemaName: "product",
    type: "single" as RelationDataType,
    optional: false,
    excludes: product_excludes,
    relatedRelations: {
      purchaseOrders: {
        type: "multiple" as RelationDataType,
        limit: 50,
        sort: {
          field: "_id",
          order: "desc" as RelationSortOrderType,
        },
      },
    },
  },
  process: {
    schemaName: "process",
    type: "single" as RelationDataType,
    optional: true,
    excludes: process_excludes,
    relatedRelations: {
      purchaseOrders: {
        type: "multiple" as RelationDataType,
        limit: 50,
        sort: {
          field: "_id",
          order: "desc" as RelationSortOrderType,
        },
      },
    },
  },
  attachments: {
    schemaName: "file",
    type: "multiple" as RelationDataType,
    optional: true,
    excludes: file_excludes,
    limit: 50,
    sort: {
      field: "_id",
      order: "desc" as RelationSortOrderType,
    },
    relatedRelations: {},
  },
  budgetLine: {
    schemaName: "budgetLine",
    type: "single" as RelationDataType,
    optional: true,
    excludes: budgetLine_excludes,
    relatedRelations: {
      purchaseOrders: {
        type: "multiple" as RelationDataType,
        limit: 50,
        sort: {
          field: "_id",
          order: "desc" as RelationSortOrderType,
        },
      },
    },
  },
  tender: {
    schemaName: "tender",
    type: "single" as RelationDataType,
    optional: true,
    excludes: tender_excludes,
    relatedRelations: {
      purchaseOrders: {
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

export const purchaseOrders = () =>
  coreApp.odm.newModel(
    "purchaseOrder",
    purchaseOrder_pure,
    purchaseOrder_relations,
    {
      createIndex: {
        indexSpec: {
          title: "text",
          description: "text",
        },
      },
    },
  );
