import { IFindInput } from "./find.ts";

export const findOne = ({
  db,
  collection,
  filters,
  projection,
  options,
}: IFindInput) => {
  return db.collection(collection).findOne(filters, { ...options, projection });
};
