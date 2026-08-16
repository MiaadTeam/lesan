import { type ActFn, ObjectId } from "lesan";
import { user } from "../../../mod.ts";

export const updateUserRelationsFn: ActFn = async (body) => {
  const {
    set: { _id, avatar, organizations, units },
    get,
  } = body.details;

  const modelId = new ObjectId(_id as string);

  if (avatar) {
    await user.addRelation({
      filters: { _id: modelId },
      relations: {
        avatar: {
          _ids: new ObjectId(avatar as string),
          relatedRelations: {},
        },
      },
      projection: get,
      replace: true,
    });
  }

  if (organizations) {
    await user.addRelation({
      filters: { _id: modelId },
      relations: {
        organizations: {
          _ids: (organizations as string[]).map((id: string) => new ObjectId(id)),
          relatedRelations: {
            users: true,
          },
        },
      },
      projection: get,
      replace: true,
    });
  }

  if (units) {
    await user.addRelation({
      filters: { _id: modelId },
      relations: {
        units: {
          _ids: (units as string[]).map((id: string) => new ObjectId(id)),
          relatedRelations: {
            members: true,
          },
        },
      },
      projection: get,
      replace: true,
    });
  }

  return await user.findOne({
    filters: { _id: modelId },
    projection: get,
  });
};
