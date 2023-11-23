import { createProjection } from "../../models/createProjection.ts";
import { schemaFns, TSchemas } from "../../models/mod.ts";
import {
  Db,
  Document,
  Filter,
  FindOneAndUpdateOptions,
  UpdateFilter,
} from "../../npmDeps.ts";
import { throwError } from "../../utils/mod.ts";
import { filterDocByProjection } from "../utils/filterDocByProjection.ts";

export const findOneAndUpdate = async <PureFields extends Document = Document>(
  { db, collection, filter, update, options, projection, schemasObj }: {
    db: Db;
    schemasObj: TSchemas;
    collection: string;
    filter: Filter<PureFields>;
    update: UpdateFilter<PureFields>;
    options?: FindOneAndUpdateOptions & {
      includeResultMetadata: true;
    };
    projection: Document;
  },
) => {
  const foundedSchema = schemaFns(schemasObj).getSchema(collection);

  const pureDocProjection = createProjection(
    schemasObj,
    collection,
    "Pure",
  );
  const updatedDoc = await db.collection(collection).findOneAndUpdate(
    filter as Filter<Document>,
    update as UpdateFilter<Document>,
    {
      ...options,
      returnDocument: "after",
      includeResultMetadata: true,
    },
  );
  if (
    updatedDoc.lastErrorObject?.updatedExisting === false ||
    updatedDoc.lastErrorObject?.n <= 0
  ) {
    throwError("can not update this doc");
  }

  const pureUpdatedDoc = filterDocByProjection(
    updatedDoc.value!,
    pureDocProjection,
  );

  for (const rel in foundedSchema.relations) {
    const actualRel = foundedSchema.relations[rel];
    const relatedRelations = actualRel.relatedRelations;

    if (actualRel.type === "single") {
      const foundedActualRelSingleDoc = await db.collection(
        actualRel.schemaName,
      ).findOne({ _id: updatedDoc.value![rel]._id });

      const updatePipeline = [];
      for (const relatedRel in relatedRelations) {
        const actualRelatedRel = relatedRelations[relatedRel];
        if (actualRelatedRel.type === "single") {
          if (
            foundedActualRelSingleDoc![relatedRel]._id.equals(
              updatedDoc.value?._id,
            )
          ) {
            updatePipeline.push({ $set: { [relatedRel]: pureUpdatedDoc } });
          }
        } else {
          const relatedRelDocs = foundedActualRelSingleDoc![relatedRel];
          if (
            relatedRelDocs && Array.isArray(relatedRelDocs)
          ) {
            const isRelInArrRel = relatedRelDocs.some((relatedRelDoc) =>
              relatedRelDoc._id.equals(updatedDoc.value?._id)
            );

            if (isRelInArrRel) {
              updatePipeline.push(
                {
                  $set: {
                    [relatedRel]: {
                      $filter: {
                        input: `$${relatedRel}`,
                        as: `${relatedRel}Item`,
                        cond: {
                          $ne: [
                            `$$${relatedRel}Item._id`,
                            updatedDoc.value?._id,
                          ],
                        },
                      },
                    },
                  },
                },
              );
            }

            const reachedLimit =
              relatedRelDocs.length === actualRelatedRel.limit ? true : false;

            if (
              reachedLimit && isRelInArrRel
            ) {
              const fieldName = actualRelatedRel.sort!.field;
              const operator = actualRelatedRel.sort?.order === "asc"
                ? { $gte: relatedRelDocs[relatedRelDocs.length - 1][fieldName] }
                : {
                  $lte: relatedRelDocs[relatedRelDocs.length - 1][fieldName],
                };

              const findOneCommand = {
                [`${rel}._id`]: foundedActualRelSingleDoc!._id,
                [fieldName]: operator,
              };
              const findNextRelatedRelForAdd = await db.collection(collection)
                .find(findOneCommand, {
                  projection: pureDocProjection,
                  sort: {
                    [fieldName]: actualRelatedRel.sort?.order === "asc"
                      ? 1
                      : -1,
                  },
                  limit: 2,
                }).toArray();

              const concatArrays = findNextRelatedRelForAdd
                ? [...findNextRelatedRelForAdd, pureUpdatedDoc]
                : [pureUpdatedDoc];

              updatePipeline.push(
                {
                  $set: {
                    [relatedRel]: {
                      $setUnion: [
                        concatArrays,
                        `$${relatedRel}`,
                      ],
                    },
                  },
                },
                {
                  $set: {
                    [relatedRel]: {
                      $sortArray: {
                        input: `$${relatedRel}`,
                        sortBy: {
                          [actualRelatedRel.sort!.field]:
                            actualRelatedRel.sort?.order === "asc" ? 1 : -1,
                        },
                      },
                    },
                  },
                },
                {
                  $set: {
                    [relatedRel]: {
                      $slice: [`$${relatedRel}`, actualRelatedRel.limit],
                    },
                  },
                },
              );
            } else {
              updatePipeline.push(
                {
                  $set: {
                    [relatedRel]: {
                      $setUnion: [
                        [pureUpdatedDoc],
                        `$${relatedRel}`,
                      ],
                    },
                  },
                },
                {
                  $set: {
                    [relatedRel]: {
                      $sortArray: {
                        input: `$${relatedRel}`,
                        sortBy: {
                          [actualRelatedRel.sort!.field]:
                            actualRelatedRel.sort?.order === "asc" ? 1 : -1,
                        },
                      },
                    },
                  },
                },
                {
                  $set: {
                    [relatedRel]: {
                      $slice: [`$${relatedRel}`, actualRelatedRel.limit],
                    },
                  },
                },
              );
            }
          }
        }
      }
      const updatedActualRelSingleDoc = await db.collection(
        actualRel.schemaName,
      ).updateOne({ _id: updatedDoc.value![rel]._id }, updatePipeline);
      // /*
      //  * 	@LOG @DEBUG @INFO
      //  * 	This log written by ::==> {{ `` }}
      //  *
      //  * 	Please remove your log after debugging
      //  */
      // // console.log woth no truncate
      // await Deno.stdout.write(
      //   new TextEncoder().encode(
      //     `the updatePipeline is : => ${
      //       JSON.stringify(updatePipeline, null, 2)
      //     }\n
      //     and the updatedActualRelSingleDoc is => ${
      //       JSON.stringify(updatedActualRelSingleDoc, null, 2)
      //     }\n`,
      //   ),
      // );
    } else {
      /*
       * 	@LOG @DEBUG @INFO
       * 	This log written by ::==> {{ `` }}
       *
       * 	Please remove your log after debugging
       */
      console.log(" ============= ");
      console.group("actualRel ------ ");
      console.log();
      console.info({ actualRel }, " ------ ");
      console.log();
      console.groupEnd();
      console.log(" ============= ");
    }
  }

  const schemaRelatedToThis = new Set<string>();

  for (const relatedRel in foundedSchema.relatedRelations) {
    schemaRelatedToThis.add(
      foundedSchema.relatedRelations[relatedRel].schemaName,
    );
  }

  for (const schema of schemaRelatedToThis) {
    const foundRelatedSchema = schemaFns(schemasObj).getSchema(schema);
    // console.log({ schema, foundRelatedSchema });
    for (const relation in foundRelatedSchema.relations) {
      if (foundRelatedSchema.relations[relation].schemaName === collection) {
        // TODO shayad chand bar mainRelation dade bashe ba in schema : pas bayad ye update aggregation benevisam
        const actualRelatedRel = foundRelatedSchema.relations[relation];
        if (actualRelatedRel.type === "single") {
          await db.collection(schema).updateMany({
            [`${relation}._id`]: pureUpdatedDoc._id,
          }, { $set: { [relation]: pureUpdatedDoc } });
        } else {
          const updateMultiPipeline: UpdateFilter<Document>[] = [{
            $set: {
              [relation]: {
                $filter: {
                  input: `$${relation}`,
                  as: `${relation}Item`,
                  cond: {
                    $ne: [
                      `$$${relation}Item._id`,
                      updatedDoc.value?._id,
                    ],
                  },
                },
              },
            },
          }, {
            $set: {
              [relation]: {
                $concatArrays: [
                  [pureUpdatedDoc],
                  `$${relation}`,
                ],
              },
            },
          }];
          if (actualRelatedRel.sort) {
            updateMultiPipeline.push({
              $set: {
                [relation]: {
                  $sortArray: {
                    input: `$${relation}`,
                    sortBy: {
                      [actualRelatedRel.sort!.field]:
                        actualRelatedRel.sort?.order === "asc" ? 1 : -1,
                    },
                  },
                },
              },
            });
          }
          const updatedMultiDoc = await db.collection(schema).updateMany({
            [`${relation}`]: { $elemMatch: { _id: pureUpdatedDoc._id } },
          }, updateMultiPipeline);
        }
      }
    }
  }

  return projection
    ? db.collection(collection).findOne({ _id: pureUpdatedDoc._id }, {
      projection,
    })
    : pureUpdatedDoc;
};
