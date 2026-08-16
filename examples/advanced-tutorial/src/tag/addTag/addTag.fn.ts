import { type ActFn } from "lesan";
import { tag } from "../../../mod.ts";
import { stripActiveRole } from "@lib";

export const addTagFn: ActFn = async (body) => {
  const { set, get } = body.details;
  const { name, color } = stripActiveRole(set);

  return await tag.insertOne({
    doc: { name, color },
    projection: get,
  });
};
