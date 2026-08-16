/**
 * Unit — Department within an organization.
 *
 * Every unit belongs to exactly one organization and can optionally have a
 * head user and a parent unit (tree). Units are the scope objects for
 * step approvals and inventory ownership.
 *
 * Pure fields: name, code, type, description
 * Relations: organization (Organization), head (User), parentUnit (Unit)
 *
 * @example
 * {
 *   _id: ObjectId("unit_purchasing"),
 *   name: "Purchasing Department",
 *   code: "UNIT-PUR",
 *   type: "Department",
 *   // organization → { _id: ObjectId("org_central"), name: "Central Hospital" }
 *   // head → { _id: ObjectId("user_1"), first_name: "Sara", last_name: "Ahmadi" }
 *   // parentUnit → { _id: ObjectId("unit_admin"), name: "Administration" }
 *   // members → [{ _id: ObjectId("user_1") }, ...]
 * }
 */
import { coreApp } from "../mod.ts";
import {
  coerce,
  defaulted,
  enums,
  optional,
  type RelationDataType,
  type RelationSortOrderType,
  string,
} from "lesan";
import { createUpdateAt } from "@lib";
import { organization_excludes, unit_excludes, user_excludes } from "./excludes.ts";

export const unit_type_array = [
  "Department",
  "Warehouse",
  "Finance",
  "Store",
];
export const unit_type_emums = enums(unit_type_array);

export const unit_pure = {
  name: string(),
  code: string(),
  type: defaulted(
    coerce(
      unit_type_emums,
      string(),
      (value) => value as typeof unit_type_array[number],
    ),
    "Department",
  ),
  description: optional(string()),
  ...createUpdateAt,
};

export const unit_relations = {
  organization: {
    schemaName: "organization",
    type: "single" as RelationDataType,
    optional: false,
    excludes: organization_excludes,
    relatedRelations: {
      units: {
        type: "multiple" as RelationDataType,
        limit: 50,
        sort: {
          field: "_id",
          order: "desc" as RelationSortOrderType,
        },
      },
    },
  },
  head: {
    schemaName: "user",
    type: "single" as RelationDataType,
    optional: true,
    excludes: user_excludes,
    relatedRelations: {
      headedUnits: {
        type: "multiple" as RelationDataType,
        limit: 50,
        sort: {
          field: "_id",
          order: "desc" as RelationSortOrderType,
        },
      },
    },
  },
  parentUnit: {
    schemaName: "unit",
    type: "single" as RelationDataType,
    optional: true,
    excludes: unit_excludes,
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
};

export const units = () =>
  coreApp.odm.newModel("unit", unit_pure, unit_relations);
