import { type ActFn, ObjectId } from "lesan";
import { file } from "../../../mod.ts";
import { throwError } from "@lib";

export const getFileFn: ActFn = async (body) => {
  const {
    set: { _id },
    get,
  } = body.details;

  const foundedFile = await file.findOne({
    filters: { _id: new ObjectId(_id as string) },
    projection: get,
  });

  !foundedFile && throwError("file not found");
  return foundedFile;
};
