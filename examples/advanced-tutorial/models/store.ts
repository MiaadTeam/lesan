/**
 * Store — Physical location (warehouse/shelf) where inventory is kept.
 *
 * Pure fields: name, code, address
 * Relations: unit (Unit — the warehouse unit that owns the store)
 *
 * @example
 * {
 *   _id: ObjectId("store_wh1"),
 *   name: "Central Warehouse",
 *   code: "ST-01",
 *   // unit → { _id: ObjectId("unit_warehouse"), name: "Central Warehouse Unit" }
 * }
 */
import { coreApp } from "../mod.ts";
import {
  optional,
  type RelationDataType,
  type RelationSortOrderType,
  string,
} from "lesan";
import { createUpdateAt } from "@lib";
import { unit_excludes } from "./excludes.ts";

export const store_pure = {
  name: string(),
  code: string(),
  address: optional(string()),
  ...createUpdateAt,
};

export const store_relations = {
  unit: {
    schemaName: "unit",
    type: "single" as RelationDataType,
    optional: true,
    excludes: unit_excludes,
    relatedRelations: {
      stores: {
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

export const stores = () =>
  coreApp.odm.newModel("store", store_pure, store_relations, {
    createIndex: {
      indexSpec: { code: 1 },
      options: { unique: true },
    },
  });
