import { type ActFn, ObjectId } from "lesan";
import { unit } from "../../../mod.ts";

export const updateUnitRelationsFn: ActFn = async (body) => {
  const {
    set: { _id, organization, head, parentUnit },
    get,
  } = body.details;

  const modelId = new ObjectId(_id as string);

  if (organization) {
    await unit.addRelation({
      filters: { _id: modelId },
      relations: {
        organization: {
          _ids: new ObjectId(organization as string),
          relatedRelations: { units: true },
        },
      },
      projection: get,
      replace: true,
    });
  }

  if (head) {
    await unit.addRelation({
      filters: { _id: modelId },
      relations: {
        head: {
          _ids: new ObjectId(head as string),
          relatedRelations: { headedUnits: true },
        },
      },
      projection: get,
      replace: true,
    });
  }

  if (parentUnit) {
    await unit.addRelation({
      filters: { _id: modelId },
      relations: {
        parentUnit: {
          _ids: new ObjectId(parentUnit as string),
          relatedRelations: { children: true },
        },
      },
      projection: get,
      replace: true,
    });
  }

  return await unit.findOne({
    filters: { _id: modelId },
    projection: get,
  });
};
