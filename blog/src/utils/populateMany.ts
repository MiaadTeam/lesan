const content = `
import { Bson } from "https://deno.land/x/mongo@v0.20.0/deps.ts";
import { ld } from "https://deno.land/x/deno_lodash/mod.ts";

export const getUniqIds = (foundedModels: any[], field: string) => {
  const fieldIds = foundedModels.map((model) => model[field]);
  return ld.uniqWith([].concat.apply([], fieldIds), ld.isEqual);
};

export const populateMany = async <C>(
  foundedModels: any[],
  relatedSchema: ({
    filter,
    getObj,
  }: {
    filter: Bson.Document;
    getObj: any;
  }) => Promise<C[]>,
  field: string,
  getObj: any
) => {
  const uniqIds = getUniqIds(foundedModels, field);
  const relatedPopulate = await relatedSchema({
    filter: { _id: { $in: uniqIds } },
    getObj,
  });
  return foundedModels.map((model) => {
    const ids = uniqIds.map((id: Bson.ObjectID) => id!.toString());
    model[field] = relatedPopulate.map(
      (mo: any) => ids.indexOf(mo._id.toString()) > -1
    );
    return model;
  });
};
`;

export const createPopulateMany = async (init: string) => {
  await Deno.writeTextFile(`${init}/populateMany.ts`, content);
};
