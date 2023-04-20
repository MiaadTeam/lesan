import { schemaFns } from "../../models/mod.ts";

export const getPureFromDoc = (
  collectionName: string,
  schemaObj: Record<string, any>,
  doc: Record<string, any>,
) => {
  let pureObj = {};
  const pureSchemaKeys = Object.keys(
    schemaFns(schemaObj).getPureSchema(collectionName),
  );

  for (const key in doc) {
    if (pureSchemaKeys.includes(key)) {
      pureObj = {
        ...pureObj,
        [key]: doc[key],
      };
    }
  }

  return pureObj;
};
