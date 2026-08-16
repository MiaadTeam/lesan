import { type ActFn, type TInsertRelations, ObjectId } from "lesan";
import { process } from "../../../mod.ts";
import { coreApp } from "../../../mod.ts";
import { stripActiveRole } from "@lib";
import type { MyContext } from "@lib";
import type { process_relations } from "@model";

export const addProcessFn: ActFn = async (body) => {
  const { set, get } = body.details;
  const { organization, unit, product, status, ...rest } = stripActiveRole(set);

  const { user }: MyContext = coreApp.contextFns.getContextModel() as MyContext;

  const relations: TInsertRelations<typeof process_relations> = {
    organization: {
      _ids: new ObjectId(organization as string),
      relatedRelations: { processes: true },
    },
  };

  unit &&
    (relations.unit = {
      _ids: new ObjectId(unit as string),
    });

  product &&
    (relations.product = {
      _ids: new ObjectId(product as string),
    });

  return await process.insertOne({
    doc: { ...rest, status: status ?? "Draft" },
    relations: {
      ...relations,
      createdBy: {
        _ids: user._id,
      },
    },
    projection: get,
  });
};
