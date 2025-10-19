import { Db, Document, Filter, ObjectId } from "../../npmDeps.ts";
import {
  IRelationsFileds,
  schemaFns,
  TInsertRelations,
  TSchemas,
} from "../../models/mod.ts";
import { Projection } from "../aggregation/type.ts";
import { throwError } from "../../utils/throwError.ts";
import { createProjection } from "../../models/createProjection.ts";
import { filterDocByProjection } from "../utils/filterDocByProjection.ts";
import { processRemoveRelatedRelations } from "../utils/processRemoveRelatedRelations.ts";

export const removeRelation = async <TR extends IRelationsFileds>({
  db,
  schemasObj,
  collection,
  relations,
  projection,
  filters,
}: {
  db: Db;
  schemasObj: TSchemas;
  collection: string;
  filters: Filter<Document>;
  relations: TInsertRelations<TR>;
  projection?: Projection;
}) => {
  const foundedSchema = schemaFns(schemasObj).getSchema(collection);
  const foundedDoc = await db.collection(collection).findOne(filters);

  if (!foundedDoc) {
    throwError("can not find this document");
  }

  for (const rel in relations) {
    const pureRelProjection = createProjection(
      schemasObj,
      foundedSchema.relations[rel].schemaName,
      "Pure",
      foundedSchema.relations[rel].excludes,
    );
    if (foundedSchema.relations[rel]) {
      if (foundedSchema.relations[rel].type === "single") {
        if (foundedSchema.relations[rel].optional === false) {
          throwError(
            "this relation can not be removed becuase it's single and not optional, please use addRelation to replace it",
          );
        }
        if (!foundedDoc![rel]._id.equals(relations[rel]?._ids)) {
          throwError(
            `the _ids you sent is not compitable with this relations ${rel}`,
          );
        }

        // first remove previus relatedRelation
        await processRemoveRelatedRelations({
          db,
          rel,
          relations,
          foundedDoc,
          schemasObj,
          foundedSchema,
          collection,
          prevRelationDoc: foundedDoc![rel],
          removeDocId: foundedDoc!._id,
          relDocForUpdate: foundedDoc![rel]._id,
        });

        await db.collection(collection).updateOne({ _id: foundedDoc!._id }, {
          $set: { [rel]: {} },
        });
      } else {
        if (!Array.isArray(foundedDoc![rel])) {
          throwError(
            `Sorry the type of ${rel} is not Array`,
          );
        }

        if (!Array.isArray(relations[rel]?._ids)) {
          throwError(
            `You most send Array of _ids for ${rel} relation`,
          );
        }

        //TODO Allan inja daram be ezaye har relation yekbar query mongo mizanam ta az relation doc asli ro pak konam bayad bbinam toye mongo query hast ke yek dafe in kar ro anjam bedam ehtamal besyar ziad hast (aggregation)
        const relationIds = relations[rel]?._ids as ObjectId[];

        for (const rr in relationIds) {
          if (
            !foundedDoc![rel].some((fr: any) => fr._id.equals(relationIds[rr]))
          ) {
            throwError(
              `${relationIds[rr]} dos not exits in the ${rel}`,
            );
          }
        }

        // first remove previus relatedRelation
        for (const rr in relationIds) {
          const foundedRelationDoc = foundedDoc![rel].find((drr: any) =>
            drr._id.equals(relationIds[rr])
          );
          await processRemoveRelatedRelations({
            db,
            rel,
            relations,
            foundedDoc,
            schemasObj,
            foundedSchema,
            collection,
            prevRelationDoc: foundedRelationDoc,
            removeDocId: foundedDoc!._id,
            relDocForUpdate: foundedRelationDoc._id,
          });
        }

        const reachLimit =
          foundedDoc![rel].length === foundedSchema.relations[rel].limit
            ? true
            : false;

        //WARN I'm in the dengrouse side becuase in most cases we do not need to have two many-to-many limited relation one side of many-to-many should be unlimited always (becuase we do not have seperate table to keep all reffrence)
        if (reachLimit && foundedDoc) {
          const selectedRelation = foundedSchema.relations[rel];

          const fieldName = selectedRelation.sort!.field;
          const operator = selectedRelation.sort?.order === "asc"
            ? { $gte: foundedDoc[rel][foundedDoc[rel].length - 1][fieldName] }
            : {
              $lte: foundedDoc[rel][foundedDoc[rel].length - 1][fieldName],
            };

          const relatedRelationFieldName =
            Object.keys(selectedRelation.relatedRelations)[0];

          const findNextRelatedRelForAdd = await db.collection(
            selectedRelation.schemaName,
          )
            .find({
              [`${relatedRelationFieldName}._id`]: foundedDoc._id,
              [fieldName]: operator,
            }, {
              projection: pureRelProjection,
              sort: {
                [fieldName]: selectedRelation.sort?.order === "asc" ? 1 : -1,
              },
              limit: relationIds.length + 1,
            }).toArray();

          const updatePipeline: Document = [];

          if (findNextRelatedRelForAdd) {
            updatePipeline.push(
              {
                $set: {
                  [rel]: {
                    $setUnion: [
                      findNextRelatedRelForAdd,
                      `$${rel}`,
                    ],
                  },
                },
              },
              {
                $set: {
                  [rel]: {
                    $filter: {
                      input: `$${rel}`,
                      as: `${rel}Item`,
                      cond: {
                        $ne: [
                          `$$${rel}Item._id`,
                          relationIds[relationIds.length - 1],
                        ],
                      },
                    },
                  },
                },
              },
              {
                $set: {
                  [rel]: {
                    $sortArray: {
                      input: `$${rel}`,
                      sortBy: {
                        [selectedRelation.sort!.field]:
                          selectedRelation.sort?.order === "asc" ? 1 : -1,
                      },
                    },
                  },
                },
              },
              {
                $set: {
                  [rel]: {
                    $slice: [`$${rel}`, selectedRelation.limit],
                  },
                },
              },
            );
          }

          await db.collection(collection).updateOne(
            { _id: foundedDoc!._id },
            updatePipeline,
          );
        } else {
          //TODO in ghesmat bayad dorost beshe chon inja ham allan momkene limit dashte bashim va agar be limit reside bashe bayad peyda kone documet badi ro va jaygozin kone bejaye faght $pull kardan khali
          await db.collection(collection).updateOne({ _id: foundedDoc!._id }, {
            $pull: { [rel]: { _id: { $in: relations[rel]?._ids } } },
          });
        }
      }
    }
  }

  return projection
    ? await db.collection(collection).findOne({ _id: foundedDoc!._id }, {
      projection,
    })
    : { _id: foundedDoc!._id };
};
