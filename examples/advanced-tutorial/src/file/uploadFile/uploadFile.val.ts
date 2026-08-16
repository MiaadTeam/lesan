import { defaulted, enums, number, object, optional, string } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";
import { file_type_array } from "@model";

export const uploadFileValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      name: string(),
      mimeType: string(),
      size: number(),
      type: optional(defaulted(enums(file_type_array), () => "other")),
      alt_text: optional(string()),
    }),
    get: selectStruct("file", 1),
  });
};
