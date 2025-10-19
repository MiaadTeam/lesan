import { TRelatedRelation } from "../../mod.ts";
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

export const proccessUpdateOrDeleteRelations = async (
  {
    db,
    collection,
    rel,
    relatedRelations,
    foundedDoc,
    pureUpdatedDoc,
    pureDocProjection,
    relationSchemaName,
    isDelete,
  }: {
    db: Db;
    collection: string;
    rel: string;
    relatedRelations: Record<string, TRelatedRelation>;
    foundedDoc: Record<string, any>;
    pureUpdatedDoc: Record<string, any>;
    pureDocProjection: Record<string, any>;
    relationSchemaName: string;
    isDelete?: boolean;
  },
) => {
  const updatePipeline = [];
  for (const relatedRel in relatedRelations) {
    const actualRelatedRel = relatedRelations[relatedRel];

    // injaro farda ke omadam bayad check konam bbinam daram az che document va modeli excludes migiram yani injori nabashe ke exlude male relation bashe man az RelatedRel fieldharo kam konam
    const pureDocProjectionWithExcludes = { ...pureDocProjection };
    if (actualRelatedRel.excludes && actualRelatedRel.excludes.length > 0) {
      actualRelatedRel.excludes.forEach((p) =>
        delete pureDocProjectionWithExcludes[p]
      );
    }

    if (
      actualRelatedRel.type === "single" && foundedDoc[relatedRel] &&
      foundedDoc[relatedRel]._id
    ) {
      if (
        foundedDoc[relatedRel]._id.equals(
          pureUpdatedDoc._id,
        )
      ) {
        isDelete
          ? updatePipeline.push({ $set: { [relatedRel]: {} } })
          : updatePipeline.push({ $set: { [relatedRel]: pureUpdatedDoc } });
      }
    } else {
      const relatedRelDocs = foundedDoc![relatedRel];
      if (
        relatedRelDocs && Array.isArray(relatedRelDocs)
      ) {
        const isRelInArrRel = relatedRelDocs.some((relatedRelDoc) =>
          relatedRelDoc._id.equals(pureUpdatedDoc._id)
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
                        pureUpdatedDoc._id,
                      ],
                    },
                  },
                },
              },
            },
          );
        }

        const reachedLimit = relatedRelDocs.length === actualRelatedRel.limit
          ? true
          : false;

        if (
          reachedLimit && isRelInArrRel
        ) {
          const fieldName = actualRelatedRel.sort!.field;
          const operator = actualRelatedRel.sort?.order === "asc"
            ? {
              $gte: relatedRelDocs[relatedRelDocs.length - 1][fieldName],
            }
            : {
              $lte: relatedRelDocs[relatedRelDocs.length - 1][fieldName],
            };

          const findNextCommand = {
            [`${rel}._id`]: foundedDoc._id,
            [fieldName]: operator,
          };
          const findNextRelatedRelForAdd = await db.collection(collection)
            .find(findNextCommand, {
              projection: pureDocProjectionWithExcludes,
              sort: {
                [fieldName]: actualRelatedRel.sort?.order === "asc" ? 1 : -1,
              },
              limit: 2,
            }).toArray();

          const concatArrays = isDelete
            ? findNextRelatedRelForAdd ? findNextRelatedRelForAdd : []
            : findNextRelatedRelForAdd
            ? [...findNextRelatedRelForAdd, pureUpdatedDoc]
            : [pureUpdatedDoc];

          if (concatArrays.length > 0) {
            updatePipeline.push(
              {
                $set: {
                  [relatedRel]: {
                    $reduce: {
                      input: concatArrays,
                      initialValue: `$${relatedRel}`,
                      in: {
                        $concatArrays: [
                          "$$value",
                          {
                            $ifNull: [
                              {
                                $cond: {
                                  if: {
                                    $not: {
                                      $in: [
                                        "$$this._id",
                                        `$${relatedRel}._id`,
                                      ],
                                    },
                                  },
                                  then: [
                                    "$$this",
                                  ],
                                  else: null,
                                },
                              },
                              [],
                            ],
                          },
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
        } else {
          if (isDelete === false || isDelete === undefined) {
            updatePipeline.push(
              {
                $set: {
                  [relatedRel]: {
                    $reduce: {
                      input: [pureUpdatedDoc],
                      initialValue: `$${relatedRel}`,
                      in: {
                        $concatArrays: [
                          "$$value",
                          {
                            $ifNull: [
                              {
                                $cond: {
                                  if: {
                                    $not: {
                                      $in: [
                                        "$$this._id",
                                        `$${relatedRel}._id`,
                                      ],
                                    },
                                  },
                                  then: [
                                    "$$this",
                                  ],
                                  else: null,
                                },
                              },
                              [],
                            ],
                          },
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
  }

  const updatedActualRelSingleDoc = updatePipeline.length > 0
    ? await db.collection(
      relationSchemaName,
    ).updateOne({ _id: foundedDoc._id }, updatePipeline)
    : {};

  // /*
  //  * 	@LOG @DEBUG @INFO
  //  * 	This log written by ::==> {{ `` }}
  //  *
  //  * 	Please remove your log after debugging
  //  */
  // // console.log woth no truncate
  // await Deno.stdout.write(
  //   new TextEncoder().encode(
  //     `the updatePipeline is : => ${JSON.stringify(updatePipeline, null, 2)}\n
  //     and the updatedActualRelSingleDoc is => ${
  //       JSON.stringify(updatedActualRelSingleDoc, null, 2)
  //     }\n`,
  //   ),
  // );

  return updatedActualRelSingleDoc;
};

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

  const updatedDocValue = updatedDoc.value;
  const pureUpdatedDoc = filterDocByProjection(
    updatedDocValue!,
    pureDocProjection,
  );

  for (const rel in foundedSchema.relations) {
    const actualRel = foundedSchema.relations[rel];
    const relatedRelations = actualRel.relatedRelations;

    const pureUpdatedDocClonedInRelForLoop = { ...pureUpdatedDoc };

    if (actualRel.excludes && actualRel.excludes.length > 0) {
      actualRel.excludes.forEach((p) =>
        delete pureUpdatedDocClonedInRelForLoop[p]
      );
    }

    if (actualRel.type === "single") {
      if (
        updatedDocValue && updatedDocValue[rel] &&
        updatedDocValue[rel]._id
      ) {
        const foundedActualRelSingleDoc = await db.collection(
          actualRel.schemaName,
        ).findOne({ _id: updatedDocValue[rel]._id });

        await proccessUpdateOrDeleteRelations({
          db,
          collection,
          rel,
          relatedRelations,
          foundedDoc: foundedActualRelSingleDoc!,
          pureUpdatedDoc: pureUpdatedDocClonedInRelForLoop,
          pureDocProjection,
          relationSchemaName: actualRel.schemaName,
        });
      }
    } else {
      if (
        updatedDocValue && updatedDocValue[rel] &&
        Array.isArray(updatedDocValue[rel])
      ) {
        const relMultiDocs = updatedDoc.value![rel];

        const foundedActualRelMultiDocs = await db.collection(
          actualRel.schemaName,
        ).find({ _id: { $in: relMultiDocs.map((re: any) => re._id) } })
          .toArray();

        if (foundedActualRelMultiDocs) {
          // TODO :: Shoud be updated by one Pipeline
          for await (
            const eachActualRel of foundedActualRelMultiDocs
          ) {
            await proccessUpdateOrDeleteRelations({
              db,
              collection,
              rel,
              relatedRelations,
              foundedDoc: eachActualRel,
              pureUpdatedDoc: pureUpdatedDocClonedInRelForLoop,
              pureDocProjection,
              relationSchemaName: actualRel.schemaName,
            });
          }
        }
      }
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
