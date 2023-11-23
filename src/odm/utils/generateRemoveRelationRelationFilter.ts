import { TRelatedRelation } from "../../mod.ts";
import { Db, Document, UpdateFilter } from "../../npmDeps.ts";
import { throwError } from "../../utils/throwError.ts";

export const generateRemoveRelatedRelationFilter = async (
  {
    db,
    relatedRelation,
    relatedRel,
    removeDoc,
    relatedRelSchemaName,
    mainSchemaName,
    prevRelationDoc,
    mainSchemaRelationName,
    pureMainProjection,
  }: {
    db: Db;
    relatedRelation: TRelatedRelation;
    relatedRel: string;
    removeDoc: Document;
    relatedRelSchemaName: string;
    mainSchemaName: string;
    mainSchemaRelationName: string;
    prevRelationDoc: Document;
    pureMainProjection: Record<string, any>;
  },
) => {
  let updateFilter: UpdateFilter<Document>[];
  if (relatedRelation.type === "single") {
    updateFilter = [{ $set: { [relatedRel]: {} } }];
  } else {
    updateFilter = [];

    if (relatedRelation.limit) {
      if (!relatedRelation.sort) {
        throwError("You related relation is incorrect please add sort field");
      }
      const foundedRelatedRel = await db.collection(relatedRelSchemaName)
        .findOne({
          _id: prevRelationDoc._id,
        });

      if (!foundedRelatedRel) {
        throwError("can not find this related relation");
      }

      const relatedRelDoc = foundedRelatedRel![relatedRel];

      const reachedLimit = relatedRelDoc.length === relatedRelation.limit
        ? true
        : false;

      // const indexOfFoundedRelatedRel = relatedRelDoc.findIndex((
      //   rr: any,
      // ) => rr._id.equals(removeDoc._id));

      // if (indexOfFoundedRelatedRel > -1) {
      //   updateFilter.push(
      //     {
      //       $set: {
      //         [relatedRel]: {
      //           $filter: {
      //             input: `$${relatedRel}`,
      //             as: `${relatedRel}Item`,
      //             cond: {
      //               $ne: [
      //                 `$$${relatedRel}Item._id`,
      //                 removeDoc._id,
      //               ],
      //             },
      //           },
      //         },
      //       },
      //     },
      //     // {
      //     //   $set: {
      //     //     [relatedRel]: newRelatedRelArr,
      //     //   },
      //     // },
      //   );

      if (reachedLimit) {
        const fieldName = relatedRelation.sort!.field;
        const operator = relatedRelation.sort?.order === "asc"
          ? { $gte: relatedRelDoc[relatedRelDoc.length - 1][fieldName] }
          : { $lte: relatedRelDoc[relatedRelDoc.length - 1][fieldName] };

        const findNextRelatedRelForAdd = await db.collection(mainSchemaName)
          .find({
            [`${mainSchemaRelationName}._id`]: foundedRelatedRel!._id,
            [fieldName]: operator,
          }, {
            projection: pureMainProjection,
            sort: {
              [fieldName]: relatedRelation.sort?.order === "asc" ? 1 : -1,
            },
            limit: 2,
          }).toArray();

        if (findNextRelatedRelForAdd) {
          updateFilter.push(
            {
              $set: {
                [relatedRel]: {
                  $setUnion: [
                    findNextRelatedRelForAdd,
                    `$${relatedRel}`,
                  ],
                },
              },
            },
            {
              $set: {
                [relatedRel]: {
                  $filter: {
                    input: `$${relatedRel}`,
                    as: `${relatedRel}Item`,
                    cond: {
                      $ne: [
                        `$$${relatedRel}Item._id`,
                        removeDoc._id,
                      ],
                    },
                  },
                },
              },
            },
            {
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
            },
            {
              $set: {
                [relatedRel]: {
                  $slice: [`$${relatedRel}`, relatedRelation.limit],
                },
              },
            },
          );
        }
      } else {
        updateFilter.push(
          {
            $set: {
              [relatedRel]: {
                $filter: {
                  input: `$${relatedRel}`,
                  as: `${relatedRel}Item`,
                  cond: {
                    $ne: [
                      `$$${relatedRel}Item._id`,
                      removeDoc._id,
                    ],
                  },
                },
              },
            },
          },
          // {
          //   $set: {
          //     [relatedRel]: newRelatedRelArr,
          //   },
          // },
        );
      }

      // }
    }
  }
  return updateFilter;
};
