import { type ActFn, type TInsertRelations, ObjectId } from "lesan";
import { budgetLine } from "../../../mod.ts";
import { stripActiveRole } from "@lib";
import type { budgetLine_relations } from "@model";

export const addBudgetLineFn: ActFn = async (body) => {
  const { set, get } = body.details;
  const { organization, ...rest } = stripActiveRole(set);

  const relations: TInsertRelations<typeof budgetLine_relations> = {};

  organization &&
    (relations.organization = {
      _ids: new ObjectId(organization as string),
      relatedRelations: { budgetLines: true },
    });

  return await budgetLine.insertOne({
    doc: {
      ...rest,
      totalEncumbered: 0,
      totalSpent: 0,
      remainingBudget: (rest as any).totalAllocated || 0,
    },
    relations,
    projection: get,
  });
};
