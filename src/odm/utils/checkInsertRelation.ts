import { Bson, Database } from "../../deps.ts";
import { schemaFns } from "../../models/mod.ts";
import { getPureFromDoc } from "./mod.ts";

export const checkRelation = (
  schemaName: string,
  schemaInrel: Record<string, any>,
  schemaObj: Record<string, any>,
  doc: Bson.Document,
  db: Database,
) => {
  console.log("================================>");
  console.log("in function body");
  console.log("================================>");

  const pureDoc = getPureFromDoc(schemaName, schemaObj, doc);

  Object.keys(schemaInrel).forEach((key) => {
    Object.entries(
      schemaFns(schemaObj).getSchema(schemaInrel[key]["schemaName"])
        .outrelation,
    ).forEach(async ([keyName, obj]) => {
      if (schemaName === obj.schemaName && schemaInrel[key]["type"] === "one") {
        console.log("================================>");
        console.log("one type condition its ok");
        console.log("================>", key);
        console.log("================================>");

        if (obj.sort.type === "objectId" || obj.sort.type === "date") {
          doc[key] && obj.sort.order === "asc"
            ? await db.collection(schemaInrel[key]["schemaName"]).updateOne({
              _id: doc[key]._id,
            }, {
              $push: {
                [keyName]: {
                  $each: [{ ...pureDoc }],
                },
              },
            })
            : await db.collection(schemaInrel[key]["schemaName"])
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
        }
      } else if (
        schemaName === obj.schemaName && schemaInrel[key]["type"] === "many"
      ) {
        console.log("================================>");
        console.log("many type condition its ok");
        console.log("================>", key);
        console.log("================================>");

        if (obj.sort.type === "objectId" || obj.sort.type === "date") {
          doc[key] && obj.sort.order === "asc"
            ? doc[key].forEach(async (document: any) => {
              await db.collection(schemaInrel[key]["schemaName"]).updateOne({
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
              await db.collection(schemaInrel[key]["schemaName"]).updateOne({
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
