import { Bson, Database } from "../../deps.ts";
import { schemaFns, TSchemas } from "../../models/mod.ts";
import { getPureFromDoc } from "./mod.ts";

// TODO : refactor this code please as soon as possible
export const checkRelation = (
  schemaName: keyof TSchemas,
  schemaMainRelation: Record<string, any>,
  schemaObj: Record<string, any>,
  doc: Bson.Document,
  db: Database,
) => {
  const pureDoc = getPureFromDoc(schemaName, schemaObj, doc);

  Object.keys(schemaMainRelation).forEach((key) => {
    Object.entries(
      schemaFns(schemaObj).getSchema(schemaMainRelation[key]["schemaName"])
        .relatedRelations,
    ).forEach(async ([keyName, obj]) => {
      if (
        schemaName === obj.schemaName &&
        schemaMainRelation[key]["type"] === "single"
      ) {
        if (obj.sort.type === "objectId" || obj.sort.type === "date") {
          doc[key] && obj.sort.order === "asc"
            ? await db.collection(schemaMainRelation[key]["schemaName"])
              .updateOne({
                _id: doc[key]._id,
              }, {
                $push: {
                  [keyName]: {
                    $each: [{ ...pureDoc }],
                  },
                },
              })
            : await db.collection(schemaMainRelation[key]["schemaName"])
              .updateOne({
                _id: doc[key]._id,
              }, {
                $push: {
                  [keyName]: {
                    $each: [{ ...pureDoc }],
                    $position: 0,
                  },
                },
              });
        } else if (obj.sort.type === "number") {
          // TODO : implement number strategy
        }
      } else if (
        schemaName === obj.schemaName &&
        schemaMainRelation[key]["type"] === "multiple"
      ) {
        if (obj.sort.type === "objectId" || obj.sort.type === "date") {
          doc[key] && obj.sort.order === "asc"
            ? doc[key].forEach(async (document: any) => {
              await db.collection(schemaMainRelation[key]["schemaName"])
                .updateOne({
                  _id: document._id,
                }, {
                  $push: {
                    [keyName]: {
                      $each: [{ ...pureDoc }],
                    },
                  },
                });
            })
            : doc[key].forEach(async (document: any) => {
              await db.collection(schemaMainRelation[key]["schemaName"])
                .updateOne({
                  _id: document._id,
                }, {
                  $push: {
                    [keyName]: {
                      $each: [{ ...pureDoc }],
                      $position: 0,
                    },
                  },
                });
            });
        }
      }
    });
  });
};
