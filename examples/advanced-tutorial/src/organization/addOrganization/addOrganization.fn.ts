import { type ActFn, ObjectId } from "lesan";
import { organization } from "../../../mod.ts";
import { stripActiveRole } from "@lib";

export const addOrganizationFn: ActFn = async (body) => {
  const { set, get } = body.details;
  const { parent, ...rest } = stripActiveRole(set);

  return await organization.insertOne({
    doc: rest,
    relations: {
      ...(parent ? { parent: { _ids: [new ObjectId(parent as string)] } } : {}),
    },
    projection: get,
  });
};
