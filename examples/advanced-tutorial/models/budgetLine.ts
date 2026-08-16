/**
 * BudgetLine — A budget allocation that purchase orders draw against.
 *
 * The lifecycle: purchase order submission creates an encumbrance (reserves
 * funds) → completion converts the encumbrance to spend → cancellation
 * releases it. `remainingBudget` is kept in sync by the workflow acts.
 *
 * Pure fields: code, title, year, totalAllocated, totalEncumbered, totalSpent,
 *   remainingBudget
 * Relations: organization (Organization), fiscalYear (FiscalYear)
 *
 * @example
 * {
 *   _id: ObjectId("bl_1"),
 *   code: "BL-2024-01",
 *   title: "Laboratory Consumables",
 *   year: 2024,
 *   totalAllocated: 100000000,
 *   totalEncumbered: 25000000,
 *   totalSpent: 0,
 *   remainingBudget: 75000000,
 *   // organization → { _id: ObjectId("org_central"), name: "Central Hospital" }
 *   // fiscalYear → { _id: ObjectId("fy_2024"), name: "2024" }
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
import { organization_excludes } from "./excludes.ts";

export const budgetLine_pure = {
  code: string(),
  title: string(),
  year: number(),
  totalAllocated: defaulted(number(), 0),
  totalEncumbered: defaulted(number(), 0),
  totalSpent: defaulted(number(), 0),
  remainingBudget: defaulted(number(), 0),
  startDate: optional(coerce(date(), string(), (value) => new Date(value))),
  endDate: optional(coerce(date(), string(), (value) => new Date(value))),
  ...createUpdateAt,
};

export const budgetLine_relations = {
  organization: {
    schemaName: "organization",
    type: "single" as RelationDataType,
    optional: true,
    excludes: organization_excludes,
    relatedRelations: {
      budgetLines: {
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

export const budgetLines = () =>
  coreApp.odm.newModel("budgetLine", budgetLine_pure, budgetLine_relations);
