import {
  BulkWriteOptions,
  Db,
  Document,
  ObjectId,
  OptionalUnlessRequiredId,
  UpdateFilter,
} from "../../../npmDeps.ts";
import { IRelationsFileds } from "../../../mod.ts";
import { createProjection } from "../../models/createProjection.ts";
import { schemaFns, TInsertRelations, TSchemas } from "../../models/mod.ts";
import { throwError } from "../../utils/mod.ts";
import { Projection } from "../aggregation/type.ts";
import { findOne } from "../find/findOne.ts";
import { find } from "../find/find.ts";
import { filterDocsByProjection } from "../utils/filterDocsByProjection.ts";

export const insertMany = async <
  TR extends IRelationsFileds,
  PureFields extends Document,
>({
  db,
  schemasObj,
  collection,
  docs,
  relations,
  options,
  projection,
}: {
  db: Db;
  schemasObj: TSchemas;
  collection: string;
  docs: OptionalUnlessRequiredId<PureFields>[];
  relations?: TInsertRelations<TR>;
  options?: BulkWriteOptions;
  projection?: Projection;
}) => {
  const foundedSchema = schemaFns(schemasObj).getSchema(collection);

  const populatedMainRelations = [];

  let generatedDocs = docs.map((doc) => ({ _id: new ObjectId(), ...doc }));
  const cloneDocsWithId = [...generatedDocs];

  const pureDocProjection = createProjection(
    schemasObj,
    collection,
    "Pure",
  );

  // allan bayad ham ba senatio QQ pish beram ham senario somthing is wrong:: aval ye generatedDoc besazam baad hame relationharo peyda konam berizam to ye done arraye ba noe relationha baad age hamechi dorost bood QQ ro start bezanam baad relationharo brooz konam baad insert document to bezanam va baad QQ isFinished ro true konam

  let somethingIsWrong = false;
  for (const rel in foundedSchema.relations) {
    const pureRelProjection = createProjection(
      schemasObj,
      foundedSchema.relations[rel].schemaName,
      "Pure",
      foundedSchema.relations[rel].excludes,
    );

    if (foundedSchema.relations[rel].optional) {
      if (relations && relations[rel]) {
        if (foundedSchema.relations[rel].type === "single") {
          const foundedSingleMainRelation = await findOne({
            db,
            collection: foundedSchema.relations[rel].schemaName,
            filters: { _id: relations![rel]!._ids },
          });

          if (!foundedSingleMainRelation) {
            throwError(`can not find this relatation : ${rel}`);
          }

          const pureOfFoundedSingleMainRelation: Record<string, any> = {};

          for (const pureKey in pureRelProjection) {
            pureOfFoundedSingleMainRelation[pureKey] =
              foundedSingleMainRelation![pureKey];
          }

          generatedDocs = generatedDocs.map((doc) => ({
            ...doc,
            [rel]: pureOfFoundedSingleMainRelation,
          }));

          for (
            const relatedRel in foundedSchema.relations[rel]
              .relatedRelations
          ) {
            const relatedRelation =
              foundedSchema.relations[rel].relatedRelations[relatedRel];
            const relationSchemName = foundedSchema.relations[rel].schemaName;
            const updateId: ObjectId = foundedSingleMainRelation!._id;

            if (
              relations && relations[rel] && relations[rel]!.relatedRelations &&
              relations[rel]!.relatedRelations![relatedRel] === true
            ) {
              if (relatedRelation.limit) {
                if (!relatedRelation.sort) {
                  throwError("you most be set sort field");
                }
                if (relatedRelation.type !== "multiple") {
                  throwError("you most be set relation type to multiple");
                }
              }

              const updateFilter: UpdateFilter<Document> = [{
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
                    $setUnion: [
                      cloneDocsWithId,
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

              const updatedRel = await db.collection(relationSchemName)
                .updateOne(
                  {
                    _id: updateId,
                  },
                  updateFilter,
                );
            }
          }
        } else {
          const findWithIds = {
            _id: { "$in": (relations[rel]!._ids as ObjectId[]) },
          };

          const foundedMultiMainRelation = await find({
            db,
            collection: foundedSchema.relations[rel].schemaName,
            filters: findWithIds,
          }).toArray();

          if (!foundedMultiMainRelation) {
            throwError(`can not find this relatation : ${rel}`);
          }

          if (
            foundedMultiMainRelation.length !==
              (relations![rel]!._ids as ObjectId[]).length
          ) {
            throwError(`we have problem with this relatation : ${rel}`);
          }

          const pureOfFoundedMultiMainRelation = filterDocsByProjection(
            foundedMultiMainRelation,
            pureRelProjection,
          );

          generatedDocs = generatedDocs.map((doc) => ({
            ...doc,
            [rel]: pureOfFoundedMultiMainRelation,
          }));

          for (
            const relatedRel in foundedSchema.relations[rel]
              .relatedRelations
          ) {
            const relatedRelation =
              foundedSchema.relations[rel].relatedRelations[relatedRel];
            const relationSchemName = foundedSchema.relations[rel].schemaName;

            if (
              relations && relations[rel] && relations[rel]!.relatedRelations &&
              relations[rel]!.relatedRelations![relatedRel] === true
            ) {
              if (relatedRelation.limit) {
                if (!relatedRelation.sort) {
                  throwError("you most be set sort field");
                }
                if (relatedRelation.type !== "multiple") {
                  throwError("you most be set relation type to multiple");
                }
              }

              const updateFilter: UpdateFilter<Document> = [{
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
                    $setUnion: [
                      cloneDocsWithId,
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

              const updatedRel = await db.collection(relationSchemName)
                .updateMany(
                  findWithIds,
                  updateFilter,
                );
            }
          }
        }
      }
    } else {
      if (relations && relations[rel]) {
        if (foundedSchema.relations[rel].type === "single") {
          const foundedSingleMainRelation = await findOne({
            db,
            collection: foundedSchema.relations[rel].schemaName,
            filters: { _id: relations![rel]!._ids },
          });

          if (!foundedSingleMainRelation) {
            throwError(`can not find this relatation : ${rel}`);
          }

          const pureOfFoundedSingleMainRelation: Record<string, any> = {};

          for (const pureKey in pureRelProjection) {
            pureOfFoundedSingleMainRelation[pureKey] =
              foundedSingleMainRelation![pureKey];
          }

          generatedDocs = generatedDocs.map((doc) => ({
            ...doc,
            [rel]: pureOfFoundedSingleMainRelation,
          }));

          for (
            const relatedRel in foundedSchema.relations[rel]
              .relatedRelations
          ) {
            const relatedRelation =
              foundedSchema.relations[rel].relatedRelations[relatedRel];
            const relationSchemName = foundedSchema.relations[rel].schemaName;
            const updateId: ObjectId = foundedSingleMainRelation!._id;

            if (
              relations && relations[rel] && relations[rel]!.relatedRelations &&
              relations[rel]!.relatedRelations![relatedRel] === true
            ) {
              if (relatedRelation.limit) {
                if (!relatedRelation.sort) {
                  throwError("you most be set sort field");
                }
                if (relatedRelation.type !== "multiple") {
                  throwError("you most be set relation type to multiple");
                }
              }

              const updateFilter: UpdateFilter<Document> = [{
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
                    $setUnion: [
                      cloneDocsWithId,
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

              const updatedRel = await db.collection(relationSchemName)
                .updateOne(
                  {
                    _id: updateId,
                  },
                  updateFilter,
                );
            }
          }
        } else {
          const findWithIds = {
            _id: { "$in": (relations[rel]!._ids as ObjectId[]) },
          };

          const foundedMultiMainRelation = await find({
            db,
            collection: foundedSchema.relations[rel].schemaName,
            filters: findWithIds,
          }).toArray();

          if (!foundedMultiMainRelation) {
            throwError(`can not find this relatation : ${rel}`);
          }

          if (
            foundedMultiMainRelation.length !==
              (relations![rel]!._ids as ObjectId[]).length
          ) {
            throwError(`we have problem with this relatation : ${rel}`);
          }

          const pureOfFoundedMultiMainRelation = filterDocsByProjection(
            foundedMultiMainRelation,
            pureRelProjection,
          );

          generatedDocs = generatedDocs.map((doc) => ({
            ...doc,
            [rel]: pureOfFoundedMultiMainRelation,
          }));

          for (
            const relatedRel in foundedSchema.relations[rel]
              .relatedRelations
          ) {
            const relatedRelation =
              foundedSchema.relations[rel].relatedRelations[relatedRel];
            const relationSchemName = foundedSchema.relations[rel].schemaName;

            if (
              relations && relations[rel] && relations[rel]!.relatedRelations &&
              relations[rel]!.relatedRelations![relatedRel] === true
            ) {
              if (relatedRelation.limit) {
                if (!relatedRelation.sort) {
                  throwError("you most be set sort field");
                }
                if (relatedRelation.type !== "multiple") {
                  throwError("you most be set relation type to multiple");
                }
              }

              const updateFilter: UpdateFilter<Document> = [{
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
                    $setUnion: [
                      cloneDocsWithId,
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

              const updatedRel = await db.collection(relationSchemName)
                .updateMany(
                  findWithIds,
                  updateFilter,
                );
            }
          }
        }
      } else {
        throwError(`can not find this relatation : ${rel}`);
      }
    }
  }

  await db.collection(collection).insertMany(generatedDocs, options);

  return projection
    ? await db.collection(collection).find({
      _id: { $in: generatedDocs.map((gd) => gd._id) },
    }, { projection }).toArray()
    : generatedDocs;
};
