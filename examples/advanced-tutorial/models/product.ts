/**
 * Product — Purchasable good, optionally nested in a category tree.
 *
 * Collapses Satek's wareType/wareClass/wareGroup/wareModel/ware hierarchy into
 * a single self-referencing `parent` relation. Each product has a price, an
 * active flag, and optional tags for classification.
 *
 * Pure fields: name, code, price, unit, active, description
 * Relations: parent (Product), tags (Tag[])
 *
 * @example
 * {
 *   _id: ObjectId("prod_tsh"),
 *   name: "TSH Lab Kit",
 *   code: "PRD-001",
 *   price: 250000,
 *   unit: "pack",
 *   active: true,
 *   // parent → { _id: ObjectId("cat_lab"), name: "Lab Equipment" }
 *   // tags → [{ _id: ObjectId("tag_medical"), name: "Medical" }]
 * }
 */
import { coreApp } from "../mod.ts";
import {
  boolean,
  defaulted,
  number,
  optional,
  type RelationDataType,
  type RelationSortOrderType,
  string,
} from "lesan";
import { createUpdateAt } from "@lib";
import { product_excludes, tag_excludes } from "./excludes.ts";

export const product_pure = {
  name: string(),
  code: string(),
  price: defaulted(number(), 0),
  unit: optional(string()),
  active: defaulted(boolean(), true),
  description: optional(string()),
  ...createUpdateAt,
};

export const product_relations = {
  parent: {
    schemaName: "product",
    type: "single" as RelationDataType,
    optional: true,
    excludes: product_excludes,
    relatedRelations: {
      children: {
        type: "multiple" as RelationDataType,
        limit: 50,
        sort: {
          field: "_id",
          order: "desc" as RelationSortOrderType,
        },
      },
    },
  },
  tags: {
    schemaName: "tag",
    type: "multiple" as RelationDataType,
    optional: true,
    excludes: tag_excludes,
    limit: 20,
    sort: {
      field: "name",
      order: "asc" as RelationSortOrderType,
    },
    relatedRelations: {
      products: {
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

export const products = () =>
  coreApp.odm.newModel("product", product_pure, product_relations, {
    createIndex: {
      indexSpec: { code: 1 },
      options: { unique: true },
    },
  });
