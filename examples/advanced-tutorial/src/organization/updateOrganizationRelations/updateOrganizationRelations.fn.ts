import { type ActFn, ObjectId } from "lesan";
import { organization } from "../../../mod.ts";

export const updateOrganizationRelationsFn: ActFn = async (body) => {
  const {
    set: { _id, parent },
    get,
  } = body.details;

  const modelId = new ObjectId(_id as string);

  if (parent) {
    await organization.addRelation({
      filters: { _id: modelId },
      relations: {
        parent: {
          _ids: new ObjectId(parent as string),
          relatedRelations: {
            children: true,
          },
        },
      },
      projection: get,
      replace: true,
    });
  }

  return await organization.findOne({
    filters: { _id: modelId },
    projection: get,
  });
};
