import { Document } from "../../../npmDeps.ts";

interface SortOption {
  field: string;
  order: "asc" | "desc";
}

/**
 * Generates a MongoDB update pipeline to add elements to a relation array,
 * removing duplicates, with optional sorting and limiting.
 * @param fieldName - The name of the field to update (e.g., "friends").
 * @param updatedDoc - Array of elements to add to the field.
 * @param sort - Optional sorting configuration.
 * @param limit - Optional limit for the number of elements in the array.
 * @returns MongoDB update pipeline.
 */
export const generateRelationUpdatePipeline = (
  fieldName: string,
  updatedDoc: unknown[], // Use specific type like string[] or ObjectId[] if known
  sort?: SortOption,
  limit?: number,
): Document[] => {
  // Validate inputs
  if (!fieldName || typeof fieldName !== "string") {
    throw new Error("fieldName must be a non-empty string");
  }
  if (!Array.isArray(updatedDoc)) {
    throw new Error("updatedDoc must be an array");
  }

  const pipeline: Document[] = [
    {
      $addFields: {
        [fieldName]: {
          $cond: {
            if: { $ne: [{ $type: `$${fieldName}` }, "array"] },
            then: [],
            else: `$${fieldName}`,
          },
        },
      },
    },
    {
      $set: {
        [fieldName]: {
          $setUnion: [`$${fieldName}`, updatedDoc],
        },
      },
    },
  ];

  if (sort) {
    pipeline.push({
      $set: {
        [fieldName]: {
          $sortArray: {
            input: `$${fieldName}`,
            sortBy: {
              [sort.field]: sort.order === "asc" ? 1 : -1,
            },
          },
        },
      },
    });
  }

  if (limit !== undefined && limit >= 0) {
    pipeline.push({
      $set: {
        [fieldName]: {
          $slice: [`$${fieldName}`, limit],
        },
      },
    });
  }

  return pipeline;
};
