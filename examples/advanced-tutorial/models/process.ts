/**
 * Process — Workflow process definition.
 *
 * Defines a procurement workflow (Draft → Active → Archived) that governs how
 * PurchaseOrders flow through approval steps. Custom actions: activateProcess
 * (validates steps and transitions to Active), duplicateProcess (clones process + steps).
 *
 * Pure fields: name, description, status (Draft|Active|Archived), version, isActive
 * Relations: organization (Organization), createdBy (User)
 *
 * @example
 * // An active procurement process for a hospital, created by Sara
 * {
 *   _id: ObjectId("proc_lab"),
 *   name: "Medical Equipment Purchase",
 *   description: "Approval flow for medical equipment",
 *   status: "Active",
 *   version: 1,
 *   isActive: true,
 *   // organization → { _id: ObjectId("org_central"), name: "Central Hospital" }
 *   // createdBy → { _id: ObjectId("user_1"), first_name: "Sara", last_name: "Ahmadi" }
 *   // steps → [
 *   //   { _id: ObjectId("step1"), name: "Department Head Approval", order: 1, stepType: "Approval" },
 *   //   { _id: ObjectId("step2"), name: "Finance Review", order: 2, stepType: "Review" },
 *   //   { _id: ObjectId("step3"), name: "Org Head Final Approval", order: 3, stepType: "Approval" }
 *   // ]
 * }
 */
import { coreApp } from "../mod.ts";
import {
  boolean,
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
  organization_excludes,
  product_excludes,
  unit_excludes,
  user_excludes,
} from "./excludes.ts";

export const process_status_array = ["Draft", "Active", "Archived"];
export const process_status_emums = enums(process_status_array);

export const process_pure = {
  name: string(),
  description: optional(string()),
  status: defaulted(
    coerce(
      process_status_emums,
      string(),
      (value) => value as typeof process_status_array[number],
    ),
    "Draft",
  ),
  version: defaulted(number(), 1),
  isActive: defaulted(boolean(), false),
  ...createUpdateAt,
};

export const process_relations = {
  organization: {
    schemaName: "organization",
    type: "single" as RelationDataType,
    optional: false,
    excludes: organization_excludes,
    relatedRelations: {
      processes: {
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
      createdProcesses: {
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
    optional: true,
    excludes: unit_excludes,
    relatedRelations: {},
  },
  product: {
    schemaName: "product",
    type: "single" as RelationDataType,
    optional: true,
    excludes: product_excludes,
    relatedRelations: {},
  },
};

export const processes = () =>
  coreApp.odm.newModel("process", process_pure, process_relations);
