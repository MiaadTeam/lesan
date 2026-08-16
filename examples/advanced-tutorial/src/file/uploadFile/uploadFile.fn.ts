import { type ActFn } from "lesan";
import { coreApp, file } from "../../../mod.ts";
import type { MyContext } from "@lib";

export const uploadFileFn: ActFn = async (body) => {
  const { set, get } = body.details;
  const { user }: MyContext = coreApp.contextFns.getContextModel() as MyContext;

  const { activeRoleId, ...rest } = set;

  return await file.insertOne({
    doc: rest,
    relations: {
      uploader: {
        _ids: user._id,
      },
    },
    projection: get,
  });
};
