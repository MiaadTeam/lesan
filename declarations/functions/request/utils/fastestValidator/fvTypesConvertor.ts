import { convertFvObToTsOb } from "./convertFvObToTsOb.ts";
import { fv, log } from "../../../../../deps.ts";

/**
 * @function
 * find type from schema value
 * @param schemaValue section 2 of fastest validator schema object
 */
export function fvTypesConvertor(schemaValue: any): any {
  //it is shorthand type
  if (typeof schemaValue === "string") {
    schemaValue = fv.parseShortHand(schemaValue);
  }
  switch (schemaValue["type"]) {
    case "string" ||
      "url" ||
      "email" ||
      "currency" ||
      "mac" ||
      "uuid" ||
      "luhn" ||
      "objectID":
      return "string";
    case "forbidden": 
      return "never";
    case "number" || "date":
      return "number";
    case "boolean":
      return "boolean";
    case "equal":
      return convertLiteralValue(schemaValue["value"]);
    //handle object field
    case "object":
      return convertFvObToTsOb(schemaValue["props"], {});
    //handle enum field
    case "enum":
      return (schemaValue["values"] as Array<any>)
        .map((val) => convertLiteralValue(val))
        .join(" | ");

    //handle array field
    case "array":
      //convert result to array
      return Array(findItemsType(schemaValue["items"]));

    case "tuple":
      //tuple items should be array
      if (!Array.isArray(schemaValue["items"])) {
        log.warning("tuple items should be array");
        return "any";
      }
      return (schemaValue["items"] as Array<any>).map((item: any) =>
        findItemsType(item)
      );

    default:
      return "any";
  }
}
/**
 * @function
 * for converting reason we should surrounding string literal to ' in order to save it in convert json to type
 * @param val : value of literal
 *
 */
const convertLiteralValue = (val: any) => {
  return typeof val === "string" ? `'${val}'` : val;
};

/**
 * @function
 * find type of items in array or tuple in fastest validator schema
 * @param items items field in fastest validator schema
 */
const findItemsType = (items: any) => {
  if (items["type"] === "object") {
    return convertFvObToTsOb(items["props"], {});
  } else if (items["type"]) {
    return fvTypesConvertor(["items"]);
    //amy be shorthand version
  } else if (typeof items === "string") {
    return fvTypesConvertor(items);
  } else {
    log.warning("some of items in array or tuple is not valid");
    return "any";
  }
};
