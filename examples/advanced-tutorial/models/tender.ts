/**
 * Tender — Public procurement auction for a purchase order.
 *
 * Collects offers from suppliers (embedded `offers` array). A purchase order
 * references a tender; when it is awarded, the winning offer's price becomes
 * the order's committed amount.
 *
 * Pure fields: title, status (Open|Awarded|Closed), deadline, description,
 *   offers [{ supplier, price, score, submittedAt }]
 * Relations: organization (Organization), createdBy (User)
 *
 * @example
 * {
 *   _id: ObjectId("tender_1"),
 *   title: "TSH Kit Supply Tender",
 *   status: "Open",
 *   deadline: ISODate("2024-07-01T00:00:00Z"),
 *   offers: [
 *     { supplier: "ZistShimi", price: 240000, score: 92, submittedAt: ISODate("2024-06-20T10:00:00Z") }
 *   ],
 *   // organization → { _id: ObjectId("org_central"), name: "Central Hospital" }
 *   // createdBy → { _id: ObjectId("user_1"), first_name: "Sara", last_name: "Ahmadi" }
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
import { organization_excludes, user_excludes } from "./excludes.ts";

export const tender_status_array = ["Open", "Awarded", "Closed"];
export const tender_status_emums = enums(tender_status_array);

export const tenderOffer_pure = {
  supplier: string(),
  price: number(),
  score: defaulted(number(), 0),
  submittedAt: coerce(date(), string(), (value) => new Date(value)),
};

export const tender_pure = {
  title: string(),
  status: defaulted(
    coerce(
      tender_status_emums,
      string(),
      (value) => value as typeof tender_status_array[number],
    ),
    "Open",
  ),
  deadline: optional(coerce(date(), string(), (value) => new Date(value))),
  description: optional(string()),
  offers: defaulted(array(object(tenderOffer_pure)), []),
  ...createUpdateAt,
};

export const tender_relations = {
  organization: {
    schemaName: "organization",
    type: "single" as RelationDataType,
    optional: true,
    excludes: organization_excludes,
    relatedRelations: {
      tenders: {
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
      createdTenders: {
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

export const tenders = () =>
  coreApp.odm.newModel("tender", tender_pure, tender_relations);
