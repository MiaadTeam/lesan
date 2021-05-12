import { convertFvObToTsOb } from "./convertFvObToTsOb.ts";
import { obToStr } from "./obToStr.ts";

/**
 * @function
 * find type from schema value
 * @param schemaValue section 2 of fastest validator schema object
 */
export function fvTypesConvertor(schemaValue: any): any {
  //define variable
  let result;
  const postfixes: string[] = [];
  //selection
  switch (schemaValue["type"]) {
    case "string" ||
      "url" ||
      "date" ||
      "email" ||
      "currency" ||
      "mac" ||
      "uuid":
      result = "string";
      break;
    case "number":
      result = "number";
      break;
    case "boolean":
      result = "boolean";
      break;
    case "equal":
      result = schemaValue["value"];
      break;
    //handle object field
    case "object":
      result = convertFvObToTsOb(schemaValue["props"], {});
      break;
    //handle enum field
    case "enum":
      result = (schemaValue["values"] as Array<any>)
        .map((val) => `'${val}'`)
        .join(" | ");

      break;
    //handle array field
    case "array":
      if (schemaValue["items"]["type"] === "object") {
        result = convertFvObToTsOb(schemaValue["items"]["props"], {});
        postfixes.push("[]");
      } else if (schemaValue["items"]["type"]) {
        result = fvTypesConvertor(schemaValue["items"]);
        postfixes.push("[]");
      } else {
        result = schemaValue["items"];
        postfixes.push("[]");
      }
      break;

    default:
      // result = "any";
      break;
  }

  //handle postfixes for example []
  if (postfixes.length > 0) {
    return obToStr(result).concat(postfixes.join());
  }

  return result;
}
