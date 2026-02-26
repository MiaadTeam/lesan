import { TRelatedRelation } from "../../../mod.ts";
import { Db, Document, ObjectId, UpdateFilter } from "../../../npmDeps.ts";
import { throwError } from "../../utils/throwError.ts";

export const generateRemoveRelatedRelationFilter = async (
  {
    db,
    relatedRelation,
    relatedRel,
    removeDocId,
    relatedRelSchemaName,
    mainSchemaName,
    prevRelationDoc,
    mainSchemaRelationName,
    pureMainProjection,
  }: {
    db: Db;
    relatedRelation: TRelatedRelation;
    relatedRel: string;
    removeDocId: ObjectId;
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
                        removeDocId,
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
                      removeDocId,
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
