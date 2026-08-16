/**
 * StockMovement — Audit trail for every inventory change.
 *
 * Read-only model; records are created by the system (inventoryManager)
 * whenever inventory quantity changes. Each entry captures the before/after
 * balance, reason, and an optional reference to the triggering document.
 *
 * Pure fields: quantity, balanceBefore, balanceAfter, reason,
 *   referenceType, referenceId, description
 * Relations: store (Store), product (Product), createdBy (User)
 *
 * @example
 * {
 *   _id: ObjectId("sm_1"),
 *   quantity: 50,
 *   balanceBefore: 0,
 *   balanceAfter: 50,
 *   reason: "goods_receipt",
 *   referenceType: "purchaseOrder",
 *   referenceId: ObjectId("po_1"),
 *   // store → { _id: ObjectId("store_wh1") }
 *   // product → { _id: ObjectId("prod_tsh") }
 *   // createdBy → { _id: ObjectId("user_1") }
 * }
 */
import { coreApp } from "../mod.ts";
import {
  coerce,
  defaulted,
  enums,
  number,
  optional,
  type RelationDataType,
  type RelationSortOrderType,
  string,
} from "lesan";
import { createUpdateAt } from "@lib";
import {
  product_excludes,
  store_excludes,
  user_excludes,
} from "./excludes.ts";

export const stockMovement_reason_array = [
  "goods_receipt",
  "goods_issue",
  "transfer_in",
  "transfer_out",
  "adjustment",
];
export const stockMovement_reason_emums = enums(stockMovement_reason_array);

export const stockMovement_pure = {
  quantity: number(),
  balanceBefore: number(),
  balanceAfter: number(),
  reason: defaulted(
    coerce(
      stockMovement_reason_emums,
      string(),
      (value) => value as typeof stockMovement_reason_array[number],
    ),
    "adjustment",
  ),
  referenceType: optional(string()),
  referenceId: optional(string()),
  description: optional(string()),
  ...createUpdateAt,
};

export const stockMovement_relations = {
  store: {
    schemaName: "store",
    type: "single" as RelationDataType,
    optional: false,
    excludes: store_excludes,
    relatedRelations: {
      stockMovements: {
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
      stockMovements: {
        type: "multiple" as RelationDataType,
        limit: 50,
        sort: {
          field: "_id",
          order: "desc" as RelationSortOrderType,
        },
      },
    },
  },
  createdBy: {
    schemaName: "user",
    type: "single" as RelationDataType,
    optional: true,
    excludes: user_excludes,
    relatedRelations: {
      createdStockMovements: {
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

export const stockMovements = () =>
  coreApp.odm.newModel("stockMovement", stockMovement_pure, stockMovement_relations);
