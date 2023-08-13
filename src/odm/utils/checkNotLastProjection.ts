import { Projection } from "../aggregation/type.ts";

export const checkNotLastProjecion = (
  projection: Projection,
) => {
  let notLast = false;

  for (const prop in projection) {
    typeof projection[prop] === "object" &&
      (notLast = true);
  }

  return notLast ? true : false;
};
