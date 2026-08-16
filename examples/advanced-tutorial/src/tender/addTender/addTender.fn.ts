import { type ActFn, type TInsertRelations, ObjectId } from "lesan";
import { coreApp, tender } from "../../../mod.ts";
import { stripActiveRole } from "@lib";
import type { MyContext } from "@lib";
import type { tender_relations } from "@model";

export const addTenderFn: ActFn = async (body) => {
  const { set, get } = body.details;
  const { organization, status, ...rest } = stripActiveRole(set);

  const { user }: MyContext = coreApp.contextFns.getContextModel() as MyContext;

  const relations: TInsertRelations<typeof tender_relations> = {};

  organization &&
    (relations.organization = {
      _ids: new ObjectId(organization as string),
      relatedRelations: { tenders: true },
    });

  relations.createdBy = {
    _ids: user._id,
    relatedRelations: { createdTenders: true },
  };

  return await tender.insertOne({
    doc: { ...rest, status: status ?? "Open" },
    relations,
    projection: get,
  });
};
