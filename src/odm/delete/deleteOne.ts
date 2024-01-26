import { IMainRelation } from "../../mod.ts";
import { createProjection } from "../../models/createProjection.ts";
import { getSchema, TSchemas } from "../../models/mod.ts";
import {
  Db,
  DeleteOptions,
  Document,
  Filter,
  ObjectId,
} from "../../npmDeps.ts";
import { throwError } from "../../utils/mod.ts";
import { proccessUpdateOrDeleteRelations } from "../update/findOneAndUpdate.ts";
import { filterDocByProjection } from "../utils/filterDocByProjection.ts";

interface IFindMainRelation extends IMainRelation {
  fieldName: string;
  collection: string;
}

const processFindOtherSchemaMainRelatins = (
  { schemasObj, collection }: { schemasObj: TSchemas; collection: string },
) => {
  const findMainRelations: IFindMainRelation[] = [];
  for (const schema in schemasObj) {
    for (const mr in schemasObj[schema].mainRelations) {
      if (schemasObj[schema].mainRelations[mr].schemaName === collection) {
        findMainRelations.push({
          ...schemasObj[schema].mainRelations[mr],
          fieldName: mr,
          collection: schema,
        });
      }
    }
  }
  return findMainRelations;
};

const proccessDeletion = async (
  { db, schemasObj, collection, _id }: {
    db: Db;
    schemasObj: TSchemas;
    collection: string;
    _id: ObjectId;
  },
) => {
  for await (
    const mr of processFindOtherSchemaMainRelatins({ schemasObj, collection })
  ) {
    const findedMr = await db.collection(mr.collection).find({
      [`${mr.fieldName}._id`]: _id,
    }, { projection: { _id: 1 } }).toArray();
    if (findedMr.length > 0) {
      const ids = findedMr.map((fmr) => fmr._id);
      await db.collection(mr.collection).deleteMany({
        _id: {
          $in: ids,
        },
      });
      for await (const fmr of findedMr) {
        await proccessDeletion({
          db,
          schemasObj,
          collection: mr.collection,
          _id: fmr._id,
        });
      }
    }
  }
};

export const deleteOne = async <PureFields extends Document = Document>({
  db,
  schemasObj,
  collection,
  filter,
  options,
  hardCascade,
}: {
  db: Db;
  schemasObj: TSchemas;
  collection: string;
  filter: Filter<PureFields>;
  options?: DeleteOptions;
  hardCascade?: boolean;
}) => {
  const foundedDoc = await db.collection(collection).findOne(
    filter as Filter<Document>,
  );

  const deleteOwnRelation = async () => {
    const foundedSchema = getSchema(schemasObj, collection);

    if (!foundedSchema) {
      throwError(`can not find this schema: ${collection}`);
    }

    const pureDocProjection = createProjection(
      schemasObj,
      collection,
      "Pure",
    );

    const pureUpdatedDoc = filterDocByProjection(
      foundedDoc!,
      pureDocProjection,
    );

    for (const rel in foundedSchema.relations) {
      const actualRel = foundedSchema.relations[rel];
      const relatedRelations = actualRel.relatedRelations;

      if (actualRel.type === "single") {
        if (foundedDoc && foundedDoc[rel]) {
          const foundedActualRelSingleDoc = await db.collection(
            actualRel.schemaName,
          ).findOne({ _id: foundedDoc[rel]._id });

          if (foundedActualRelSingleDoc) {
            await proccessUpdateOrDeleteRelations({
              db,
              collection,
              rel,
              relatedRelations,
              foundedDoc: foundedActualRelSingleDoc,
              pureUpdatedDoc,
              pureDocProjection,
              relationSchemaName: actualRel.schemaName,
              isDelete: true,
            });
          }
        }
      } else {
        if (
          foundedDoc && foundedDoc[rel] &&
          Array.isArray(foundedDoc[rel])
        ) {
          const relMultiDocs = foundedDoc![rel];

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
                pureUpdatedDoc,
                pureDocProjection,
                relationSchemaName: actualRel.schemaName,
                isDelete: true,
              });
            }
          }
        }
      }
    }
  };

  const deleteRelatedRelation = async () => {
    const processFindOtherSchemaMainRelatins = (
      { schemasObj, collection }: { schemasObj: TSchemas; collection: string },
    ) => {
      const findMainRelations: IFindMainRelation[] = [];
      for (const schema in schemasObj) {
        for (const mr in schemasObj[schema].mainRelations) {
          if (schemasObj[schema].mainRelations[mr].schemaName === collection) {
            findMainRelations.push({
              ...schemasObj[schema].mainRelations[mr],
              fieldName: mr,
              collection: schema,
            });
          }
        }
      }
      return findMainRelations;
    };

    const findDocsBasedOnOtherSchemaMainRelationt = [];

    const foundedOtherSchemaMainRelations = processFindOtherSchemaMainRelatins({
      schemasObj,
      collection,
    });

    for await (
      const mr of foundedOtherSchemaMainRelations
    ) {
      const findedMr = await db.collection(mr.collection).findOne({
        [`${mr.fieldName}._id`]: foundedDoc!._id,
      });
      findedMr &&
        findDocsBasedOnOtherSchemaMainRelationt.push({ ...mr, doc: findedMr });
    }

    const deletedData = async () => {
      if (findDocsBasedOnOtherSchemaMainRelationt.length > 0) {
        await proccessDeletion({
          db,
          schemasObj,
          collection,
          _id: foundedDoc!._id,
        });
      }
      await db.collection(collection).deleteOne(
        filter as Filter<Document>,
        options,
      );
      return true;
    };

    return hardCascade
      ? await deletedData()
      : findDocsBasedOnOtherSchemaMainRelationt.length === 0
      ? await deletedData()
      : throwError(
        `please clear below relations status before deletion: ${
          JSON.stringify(findDocsBasedOnOtherSchemaMainRelationt, null, 1)
            .replace(
              /\r\n|\n|\r/gm,
              "",
            )
        }`,
      );
  };

  const deleteProcces = async () => {
    const deleteRelated = await deleteRelatedRelation();
    await deleteOwnRelation();
    return deleteRelated;
  };

  return foundedDoc
    ? await deleteProcces()
    : throwError("can not find this documents");
};
