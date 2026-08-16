import { type ActFn, type TInsertRelations, ObjectId } from "lesan";
import { store } from "../../../mod.ts";
import { stripActiveRole } from "@lib";
import type { store_relations } from "@model";

export const addStoreFn: ActFn = async (body) => {
  const { set, get } = body.details;
  const { unit, ...rest } = stripActiveRole(set);

  const relations: TInsertRelations<typeof store_relations> = {};

  unit &&
    (relations.unit = {
      _ids: new ObjectId(unit as string),
      relatedRelations: { stores: true },
    });

  return await store.insertOne({
    doc: rest,
    relations,
    projection: get,
  });
};
