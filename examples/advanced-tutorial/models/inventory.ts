/**
 * Inventory — Per-store, per-product stock tracking.
 *
 * Has a unique compound index on (store, "product._id") guaranteeing one
 * record per store+product combo. Records are created/updated by the
 * inventoryManager utility (addStock, removeStock, transferStock).
 *
 * Pure fields: quantity, minQuantity, maxQuantity, batchNo, expirationDate,
 *   location
 * Relations: store (Store), product (Product), lastCountedBy (User)
 *
 * @example
 * {
 *   _id: ObjectId("inv_1"),
 *   quantity: 50,
 *   minQuantity: 10,
 *   maxQuantity: 200,
 *   // store → { _id: ObjectId("store_wh1"), name: "Central Warehouse" }
 *   // product → { _id: ObjectId("prod_tsh"), name: "TSH Lab Kit" }
 * }
 */
import { coreApp } from "../mod.ts";
import {
  coerce,
  date,
  defaulted,
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

export const inventory_pure = {
  quantity: defaulted(number(), 0),
  minQuantity: optional(number()),
  maxQuantity: optional(number()),
  batchNo: optional(string()),
  expirationDate: optional(coerce(date(), string(), (value) => new Date(value))),
  location: optional(string()),
  ...createUpdateAt,
};

export const inventory_relations = {
  store: {
    schemaName: "store",
    type: "single" as RelationDataType,
    optional: false,
    excludes: store_excludes,
    relatedRelations: {
      inventories: {
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
      inventories: {
        type: "multiple" as RelationDataType,
        limit: 50,
        sort: {
          field: "_id",
          order: "desc" as RelationSortOrderType,
        },
      },
    },
  },
  lastCountedBy: {
    schemaName: "user",
    type: "single" as RelationDataType,
    optional: true,
    excludes: user_excludes,
    relatedRelations: {
      countedInventories: {
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

export const inventories = () =>
  coreApp.odm.newModel("inventory", inventory_pure, inventory_relations);

export const createInventoryIndex = async () => {
  const collection = coreApp.odm.getCollection("inventory");
  try {
    await collection.createIndex(
      { store: 1, "product._id": 1 },
      { unique: true },
    );
  } catch (error) {
    console.error(
      "Inventory compound index already exists or creation failed:",
      (error as Error).message,
    );
  }
};
