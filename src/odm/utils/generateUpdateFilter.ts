import { TRelatedRelation } from "../../mod.ts";
import { Document, UpdateFilter } from "../../npmDeps.ts";

export const generateUpdateFilter = (
  { relatedRelation, relatedRel, updatedDoc }: {
    relatedRelation: TRelatedRelation;
    relatedRel: string;
    updatedDoc: Document;
  },
) => {
  let updateFilter: UpdateFilter<Document>;
  if (relatedRelation.type === "single") {
    updateFilter = { $set: { [relatedRel]: updatedDoc } };
  } else {
    updateFilter = [{
      $addFields: {
        [relatedRel]: {
          $cond: {
            if: { "$ne": [{ "$type": `$${relatedRel}` }, "array"] },
            then: [],
            else: `$${relatedRel}`,
          },
        },
      },
    }, {
      $set: {
        [relatedRel]: {
          $concatArrays: [
            {
              $cond: {
                if: { $in: [updatedDoc, `$${relatedRel}`] },
                then: [],
                else: [updatedDoc],
              },
            },
            `$${relatedRel}`,
          ],
        },
      },
    }];

    if (relatedRelation.sort) {
      updateFilter.push({
        $set: {
          [relatedRel]: {
            $sortArray: {
              input: `$${relatedRel}`,
              sortBy: {
                [relatedRelation.sort!.field]:
                  relatedRelation.sort?.order === "asc" ? 1 : -1,
              },
            },
          },
        },
      });
    }
    if (relatedRelation.limit) {
      updateFilter.push({
        $set: {
          [relatedRel]: {
            $slice: [`$${relatedRel}`, relatedRelation.limit],
          },
        },
      });
    }
  }
  return updateFilter;
};
