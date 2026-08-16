import { type ActFn, ObjectId, type TInsertRelations } from "lesan";
import { user } from "../../../mod.ts";
import type { user_relations } from "@model";
import { hashPassword } from "../../../utils/password.ts";

export const addUserFn: ActFn = async (body) => {
  const { set, get } = body.details;

  const { activeRoleId, avatar, organizations, units, password, ...rest } =
    set;

  const relations: TInsertRelations<typeof user_relations> = {};

  avatar &&
    (relations.avatar = {
      _ids: new ObjectId(avatar as string),
    });

  if (organizations && (organizations as string[]).length > 0) {
    relations.organizations = {
      _ids: (organizations as string[]).map((id: string) => new ObjectId(id)),
      relatedRelations: {
        users: true,
      },
    };
  }

  if (units && (units as string[]).length > 0) {
    relations.units = {
      _ids: (units as string[]).map((id: string) => new ObjectId(id)),
      relatedRelations: {
        members: true,
      },
    };
  }

  const addedUser = await user.insertOne({
    doc: {
      ...rest,
      password: password ? await hashPassword(password as string) : undefined,
    },
    relations,
    projection: get,
  });

  return addedUser;
};
