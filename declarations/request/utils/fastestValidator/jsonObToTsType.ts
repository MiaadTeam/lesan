export function jsonObToTsType(obj: object): string {
  convertWrongTupleToArray(obj);
  const text = JSON.stringify(obj, null, 2);

  /**
   * @note ' notation should be exists for represent string literal in types
   */
  return text.replaceAll('"', " ").replaceAll("{}", "any");
}

function convertWrongTupleToArray(obj: any) {
  for (const key in obj) {
    let isArr = false;
    if (Array.isArray(obj[key])) {
      obj[key].length === 1 && (isArr = true);
      (obj[key] as Array<any>).map((elem, i) => {
        if (typeof elem === "object") {
          convertWrongTupleToArray(obj[key][i]);
        }
      });
    } else if (typeof obj[key] === "object") {
      convertWrongTupleToArray(obj[key]);
    }

    if (isArr) {
      const str = JSON.stringify(obj[key]).replaceAll('"', "");
      const firstBracket = str.indexOf("[");
      const lastBracket = str.lastIndexOf("]");
      obj[key] = str.substring(firstBracket + 1, lastBracket).concat("[]");
    }
  }
}
