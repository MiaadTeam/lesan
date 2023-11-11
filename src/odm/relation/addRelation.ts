import { Db, ObjectId } from "../../npmDeps.ts";
import { createProjection } from "../../models/createProjection.ts";
import { IRelationsFileds, schemaFns, TSchemas } from "../../models/mod.ts";
import { throwError } from "../../utils/throwError.ts";
import { Projection } from "../aggregation/type.ts";
import { TInsertRelations } from "../insert/insertOne.ts";
import { handleMultiRelation } from "../utils/insert/handleMultiRelation.ts";
import { handleSingleRelation } from "../utils/insert/handleSingleRelation.ts";
import { generateRemoveRelatedRelationFilter } from "../utils/generateRemoveRelationRelationFilter.ts";
import { filterDocByProjection } from "../utils/filterDocByProjection.ts";

export const addRelation = async <TR extends IRelationsFileds>({
  db,
  schemasObj,
  collection,
  _id,
  relations,
  projection,
  replace,
}: {
  db: Db;
  schemasObj: TSchemas;
  collection: string;
  _id: ObjectId;
  relations: TInsertRelations<TR>;
  projection?: Projection;
  replace?: boolean;
}) => {
  const foundedSchema = schemaFns(schemasObj).getSchema(collection);
  const foundedDoc = await db.collection(collection).findOne({ _id });

  if (foundedDoc) {
    const foundedDocPureProjection = createProjection(
      schemasObj,
      collection,
      "Pure",
    );

    const generatedDoc: Record<string, any> = {};
    for (const pureKey in foundedDocPureProjection) {
      generatedDoc[pureKey] = foundedDoc![pureKey];
    }
    const pureDocProjection = createProjection(
      schemasObj,
      collection,
      "Pure",
    );

    for (const rel in relations) {
      const pureRelProjection = createProjection(
        schemasObj,
        foundedSchema.relations[rel].schemaName,
        "Pure",
      );
      if (foundedSchema.relations[rel]) {
        if (foundedSchema.relations[rel].type === "single") {
          if (foundedDoc[rel] && replace === undefined || replace === false) {
            throwError(
              `the ${rel} relation is already added if you want to replaced this please add replace option`,
            );
          }
          // first remove previus relatedRelation
          for (
            const relatedRel in foundedSchema.relations[rel]
              .relatedRelations
          ) {
            const relatedRelation =
              foundedSchema.relations[rel].relatedRelations[relatedRel];

            if (
              relations[rel]?.relatedRelations &&
              relations[rel]?.relatedRelations![relatedRel]
            ) {
              const updateFilterForRemoveRelatedRelation =
                await generateRemoveRelatedRelationFilter({
                  db,
                  relatedRelation,
                  removeDoc: filterDocByProjection(
                    foundedDoc,
                    pureDocProjection,
                  ),
                  relatedRel,
                  mainSchemaName: collection,
                  mainSchemaRelationName: rel,
                  relatedRelSchemaName: foundedSchema.relations[rel].schemaName,
                  prevRelationDoc: foundedDoc[rel],
                  pureMainProjection: foundedDocPureProjection,
                });

              if (updateFilterForRemoveRelatedRelation.length > 0) {
                const updatedRel = await db.collection(
                  foundedSchema.relations[rel].schemaName,
                ).updateOne(
                  {
                    _id: foundedDoc[rel]._id,
                  },
                  updateFilterForRemoveRelatedRelation,
                );

                // console.log woth no truncate
                // await Deno.stdout.write(
                //   new TextEncoder().encode(
                //     `inside if with this relation: => ${
                //       JSON.stringify(relations, null, 2)
                //     }\n relationName: => ${rel}\n relatedRelSchemaName: => ${
                //       foundedSchema.relations[rel].schemaName
                //     }\n updateFileterForRemove: => ${
                //       JSON.stringify(updatedRel, null, 2)
                //     } \n with this updated doc: => ${
                //       JSON.stringify(foundedDoc[rel], null, 2)
                //     } \n with this update aggregation: => ${
                //       JSON.stringify(
                //         updateFilterForRemoveRelatedRelation,
                //         null,
                //         2,
                //       )
                //     }
                //   \n`,
                //   ),
                // );
              }
            }
          }
          await handleSingleRelation({
            db,
            relations,
            rel,
            foundedSchema,
            pureRelProjection,
            pureDocProjection,
            generatedDoc,
          });
          await db.collection(collection).updateOne({ _id: foundedDoc._id }, {
            $set: { [rel]: generatedDoc[rel] },
          });
        } else {
          await handleMultiRelation({
            db,
            foundedSchema,
            relations,
            rel,
            pureRelProjection,
            pureDocProjection,
            generatedDoc,
          });
          await db.collection(collection).updateOne({ _id: foundedDoc._id }, {
            $addToSet: { [rel]: { $each: generatedDoc[rel] } },
          });
        }
      }
    }
  } else {
    throwError("can not find this document");
  }
  return projection
    ? await db.collection(collection).findOne({ _id }, { projection })
    : { _id: foundedDoc!._id };
};
