/**
 * Organization — Top-level tenant (hospital, clinic, chain).
 *
 * Supports a self-referencing parent tree so organizations can nest.
 * Users, units, and purchase orders all belong to an organization.
 *
 * Pure fields: name, code, description
 * Relations: parent (Organization)
 *
 * @example
 * {
 *   _id: ObjectId("org_central"),
 *   name: "Central Hospital",
 *   code: "ORG-001",
 *   // parent → { _id: ObjectId("org_chain"), name: "MedSupply Group" }
 *   // users → [{ _id: ObjectId("user_1") }, ...]
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
import { organization_excludes } from "./excludes.ts";

export const organization_pure = {
  name: string(),
  code: string(),
  description: optional(string()),
  ...createUpdateAt,
};

export const organization_relations = {
  parent: {
    schemaName: "organization",
    type: "single" as RelationDataType,
    optional: true,
    excludes: organization_excludes,
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

export const organizations = () =>
  coreApp.odm.newModel("organization", organization_pure, organization_relations, {
    createIndex: {
      indexSpec: { code: 1 },
      options: { unique: true },
    },
  });
