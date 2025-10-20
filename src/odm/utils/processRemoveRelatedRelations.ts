import { Db, Document, UpdateFilter } from "../../npmDeps.ts";
import {
  IModel,
  IRelationsFileds,
  ObjectId,
  TInsertRelations,
  WithId,
} from "../../mod.ts";
import { generateRemoveRelatedRelationFilter } from "./generateRemoveRelationRelationFilter.ts";
import { createProjection } from "../../models/createProjection.ts";
import { TSchemas } from "../../models/mod.ts";

export const processRemoveRelatedRelations = async <
  TR extends IRelationsFileds,
>(
  {
    db,
    relations,
    foundedSchema,
    rel,
    collection,
    prevRelationDoc,
    removeDocId,
    relDocForUpdate,
    schemasObj,
  }: {
    db: Db;
    relations: TInsertRelations<TR>;
    foundedSchema: IModel;
    rel: string;
    collection: string;
    foundedDoc: WithId<Document> | null;
    prevRelationDoc: Record<string, any>;
    removeDocId: ObjectId;
    relDocForUpdate: ObjectId;
    schemasObj: TSchemas;
  },
) => {
  const updatePipeline: UpdateFilter<Document>[] = [];

  for (const relatedRel in foundedSchema.relations[rel].relatedRelations) {
    const relatedRelation =
      foundedSchema.relations[rel].relatedRelations[relatedRel];

    const pureRelatedRelProjection = createProjection(
      schemasObj,
      collection,
      "Pure",
      relatedRelation.excludes,
    );

    if (
      relations[rel]?.relatedRelations &&
      relations[rel]?.relatedRelations[relatedRel]
    ) {
      const updateFilterForRemoveRelatedRelation =
        await generateRemoveRelatedRelationFilter({
          db,
          relatedRelation,
          removeDocId,
          relatedRel,
          mainSchemaName: collection,
          mainSchemaRelationName: rel,
          relatedRelSchemaName: foundedSchema.relations[rel].schemaName,
          prevRelationDoc,
          pureMainProjection: pureRelatedRelProjection,
        });
      if (updateFilterForRemoveRelatedRelation.length > 0) {
        updatePipeline.push(...updateFilterForRemoveRelatedRelation);
      }
    }
  }

  if (updatePipeline.length > 0) {
    const updatedRel = await db.collection(
      foundedSchema.relations[rel].schemaName,
    ).updateOne(
      {
        _id: relDocForUpdate,
      },
      updatePipeline,
    );

    // console.log woth no truncate
    // await Deno.stdout.write(
    //   new TextEncoder().encode(
    //     `the relatedRel is ${relatedRel}\n inside if with this relation: => ${
    //       JSON.stringify(relations, null, 2)
    //     }\n relationName: => ${rel}\n relatedRelSchemaName: => ${
    //       foundedSchema.relations[rel].schemaName
    //     }\n updateFileterForRemove: => ${
    //       JSON.stringify(updatedRel, null, 2)
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
    return updatedRel;
  }
};
