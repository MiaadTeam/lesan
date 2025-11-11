/**
 * File: src/odm/utils/checkNotLastProjection.ts
 *
 * This file contains a utility function to determine if a projection object
 * has nested projection objects, indicating it's not the "last" level of projection.
 */

import { Projection } from "../aggregation/type.ts";

/**
 * Checks if a projection object contains nested projection objects.
 * Returns true if any value in the projection is an object (indicating nested projections),
 * false otherwise.
 *
 * This function is used to determine whether a projection level requires additional
 * MongoDB aggregation pipeline stages for related collections.
 *
 * Parameters:
 * - projection: A projection object to check for nested objects
 *
 * Returns:
 * - Boolean: true if nested objects exist, false otherwise
 */
export const checkNotLastProjecion = (
  projection: Projection,
) => {
  let notLast = false;

  // Check if any value in the projection is an object
  for (const prop in projection) {
    typeof projection[prop] === "object" &&
      (notLast = true);
  }

  return notLast ? true : false;
};
