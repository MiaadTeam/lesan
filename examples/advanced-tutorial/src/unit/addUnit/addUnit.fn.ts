import { type ActFn, type TInsertRelations, ObjectId } from "lesan";
import { unit } from "../../../mod.ts";
import { stripActiveRole } from "@lib";
import type { unit_relations } from "@model";

export const addUnitFn: ActFn = async (body) => {
  const { set, get } = body.details;
  const { organization, head, parentUnit, ...rest } = stripActiveRole(set);

  const relations: TInsertRelations<typeof unit_relations> = {
    organization: {
      _ids: new ObjectId(organization as string),
      relatedRelations: { units: true },
    },
  };

  head &&
    (relations.head = {
      _ids: new ObjectId(head as string),
      relatedRelations: { headedUnits: true },
    });

  parentUnit &&
    (relations.parentUnit = {
      _ids: new ObjectId(parentUnit as string),
      relatedRelations: { children: true },
    });

  return await unit.insertOne({
    doc: rest,
    relations,
    projection: get,
  });
};
