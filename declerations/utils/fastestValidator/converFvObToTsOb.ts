import { fvTypesConvertor } from "./fvTypesConvertor.ts";

/**
 * @function
 * convert fastest validator object to regular object
 * @param schema schema of fastest validator
 * @param createdObject regular object
 */
export const convetFvObToTsOb = (
  schema: Record<string, any>,
  createdObject: Record<string, any>,
) => {
  for (const key in schema) {
    const optional = schema[key]["optional"] === true ? "?" : undefined;

    const type = fvTypesConvertor(schema[key]);
    createdObject[optional ? key + optional : key] = type;
  }

  return createdObject;
};
