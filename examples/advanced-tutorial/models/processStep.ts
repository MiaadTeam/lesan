/**
 * ProcessStep — Individual step within a process workflow.
 *
 * Each step has a type (Approval|Review|Notification|Action|Delivery|Receipt|Payment),
 * an order number, and assignee groups with OR/AND logic. The `groupsOperator`
 * combines groups, while each group's internal `operator` combines its unitIds.
 * Steps are sorted by `order` ascending on the process relation.
 *
 * Pure fields: name, description, stepType, order, required, groupsOperator,
 *   assigneeGroups
 * Relations: process (Process)
 *
 * @example
 * // Step 1 of proc_lab: Purchasing OR Warehouse must approve (OR within group, AND across groups)
 * {
 *   _id: ObjectId("step1"),
 *   name: "Purchasing Manager Approval",
 *   stepType: "Approval",
 *   order: 1,
 *   required: true,
 *   groupsOperator: "AND",
 *   assigneeGroups: [
 *     { operator: "OR", unitIds: [ObjectId("unit_purchasing"), ObjectId("unit_warehouse")] }
 *   ],
 *   // process → { _id: ObjectId("proc_lab"), name: "Medical Equipment Purchase" }
 * }
 */
import { coreApp } from "../mod.ts";
import {
  array,
  boolean,
  coerce,
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
import { process_excludes } from "./excludes.ts";

export const group_operator_array = ["AND", "OR"];
export const group_operator_emums = enums(group_operator_array);

export const step_type_array = [
  "Approval",
  "Review",
  "Notification",
  "Action",
  "Delivery",
  "Receipt",
  "Payment",
];
export const step_type_emums = enums(step_type_array);

export const assigneeGroup_pure = {
  operator: coerce(
    group_operator_emums,
    enums(group_operator_array),
    (value) => value as typeof group_operator_array[number],
  ),
  unitIds: array(string()),
};

export const processStep_pure = {
  name: string(),
  description: optional(string()),
  stepType: defaulted(
    coerce(
      step_type_emums,
      string(),
      (value) => value as typeof step_type_array[number],
    ),
    "Approval",
  ),
  order: number(),
  required: defaulted(boolean(), true),
  groupsOperator: coerce(
    group_operator_emums,
    enums(group_operator_array),
    (value) => value as typeof group_operator_array[number],
  ),
  assigneeGroups: defaulted(array(object(assigneeGroup_pure)), []),
  ...createUpdateAt,
};

export const processStep_relations = {
  process: {
    schemaName: "process",
    type: "single" as RelationDataType,
    optional: false,
    excludes: process_excludes,
    relatedRelations: {
      steps: {
        type: "multiple" as RelationDataType,
        limit: 50,
        sort: {
          field: "order",
          order: "asc" as RelationSortOrderType,
        },
      },
    },
  },
};

export const processSteps = () =>
  coreApp.odm.newModel("processStep", processStep_pure, processStep_relations);
