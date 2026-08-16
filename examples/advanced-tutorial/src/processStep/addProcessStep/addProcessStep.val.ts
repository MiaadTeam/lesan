import { array, boolean, defaulted, number, object, objectIdValidation, optional, string } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";
import { group_operator_emums, step_type_emums } from "@model";

export const addProcessStepValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      name: string(),
      description: optional(string()),
      stepType: optional(step_type_emums),
      order: number(),
      required: optional(boolean()),
      groupsOperator: group_operator_emums,
      assigneeGroups: array(
        object({
          operator: group_operator_emums,
          unitIds: array(string()),
        }),
      ),
      process: objectIdValidation,
    }),
    get: selectStruct("processStep", 1),
  });
};
