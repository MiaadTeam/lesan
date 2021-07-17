import { fvTypesConvertor } from "./fvTypesConvertor.ts";
import { log } from "../../../../../deps.ts";

/**
 * @function
 * convert fastest validator object to regular object
 * @param schema schema of fastest validator
 * @param createdObject regular object
 */
export const convertFvObToTsOb = (
  schema: Record<string, any>,
  createdObject: Record<string, any>
) => {
  for (const key in schema) {
    //check for optional sign
    const optional =
      schema[key]["optional"] === true || schema[key]["nullable"] === true
        ? "?"
        : null;
    let type;

    try {
      type = fvTypesConvertor(schema[key]);
    } catch (error) {
      log.warning(
        `error in  converting type of field: '${key}' we assume it any `
      );
      type = "any";
    }

    createdObject[optional ? key + optional : key] = type;
  }

  return createdObject;
};
