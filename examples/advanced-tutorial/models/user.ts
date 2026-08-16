/**
 * User — System user with role-based access control.
 *
 * Central authentication entity. Supports multi-role assignment, feature-based
 * permissions, and organization/unit membership. `isGhost` marks the bootstrap
 * superuser. Passwords are excluded from API responses by default.
 *
 * Pure fields: first_name, last_name, email, password, position,
 *   isActive, isGhost, features, roles
 * Relations: avatar (File), organizations (Organization[]), units (Unit[])
 *
 * @example
 * {
 *   _id: ObjectId("..."),
 *   first_name: "Sara",
 *   last_name: "Ahmadi",
 *   email: "sara@medsupply.io",
 *   position: "Purchasing Manager",
 *   isActive: true,
 *   isGhost: false,
 *   features: [{ feature: "canRegisterPurchaseOrder" }, { feature: "canApprovePurchaseOrder" }],
 *   roles: [
 *     { roleId: "uuid-1", name: "Manager", scopeType: "organization", scopeId: "org_central" },
 *     { roleId: "uuid-2", name: "UnitHead", scopeType: "unit", scopeId: "unit_purchasing" }
 *   ],
 *   // avatar → { _id: ObjectId("file_1"), name: "sara.jpg", type: "image" }
 *   // organizations → [{ _id: ObjectId("org_central"), name: "Central Hospital" }]
 *   // units → [{ _id: ObjectId("unit_purchasing"), name: "Purchasing" }]
 * }
 */
import { coreApp } from "../mod.ts";
import {
  array,
  boolean,
  coerce,
  defaulted,
  enums,
  object,
  optional,
  pattern,
  type RelationDataType,
  type RelationSortOrderType,
  string,
} from "lesan";
import { createUpdateAt } from "@lib";
import {
  file_excludes,
  organization_excludes,
  unit_excludes,
} from "./excludes.ts";
import { feature_enums } from "./featureConstants.ts";

export const role_array = [
  "Manager",
  "Admin",
  "OrgHead",
  "UnitHead",
  "StoreHead",
  "Employee",
  "Ordinary",
];

export const role_emums = enums(role_array);

export const role_scope_type_emums = enums(["organization", "unit", "store"]);

export const emailPattern = pattern(
  string(),
  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
);

export const user_pure = {
  first_name: string(),
  last_name: string(),
  email: emailPattern,
  password: string(),
  position: optional(string()),
  isActive: defaulted(boolean(), true),
  isGhost: defaulted(boolean(), false),
  features: defaulted(array(object({ feature: feature_enums })), []),
  roles: defaulted(
    array(
      object({
        roleId: string(),
        name: role_emums,
        scopeType: optional(role_scope_type_emums),
        scopeId: optional(string()),
      }),
    ),
    [{ roleId: crypto.randomUUID(), name: "Ordinary" }],
  ),
  ...createUpdateAt,
};

export const user_relations = {
  avatar: {
    schemaName: "file",
    type: "single" as RelationDataType,
    optional: true,
    excludes: file_excludes,
    relatedRelations: {},
  },
  organizations: {
    schemaName: "organization",
    type: "multiple" as RelationDataType,
    optional: true,
    excludes: organization_excludes,
    limit: 50,
    sort: {
      field: "_id",
      order: "desc" as RelationSortOrderType,
    },
    relatedRelations: {
      users: {
        type: "multiple" as RelationDataType,
        limit: 50,
        sort: {
          field: "_id",
          order: "desc" as RelationSortOrderType,
        },
      },
    },
  },
  units: {
    schemaName: "unit",
    type: "multiple" as RelationDataType,
    optional: true,
    excludes: unit_excludes,
    limit: 50,
    sort: {
      field: "_id",
      order: "desc" as RelationSortOrderType,
    },
    relatedRelations: {
      members: {
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

export const users = () =>
  coreApp.odm.newModel("user", user_pure, user_relations, {
    createIndex: {
      indexSpec: { email: 1 },
      options: { unique: true },
    },
    excludes: ["password"],
  });

export const createUserTextIndex = async () => {
  const collection = coreApp.odm.getCollection("user");
  try {
    await collection.createIndex({
      first_name: "text",
      last_name: "text",
      email: "text",
    });
  } catch (error) {
    console.error(
      "Text index already exists or creation failed:",
      (error as Error).message,
    );
  }
};
