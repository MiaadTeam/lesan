import { type ActFn, ObjectId } from "lesan";
import { product } from "../../../mod.ts";

export const updateProductRelationsFn: ActFn = async (body) => {
  const {
    set: { _id, parent, tags },
    get,
  } = body.details;

  const modelId = new ObjectId(_id as string);

  if (parent) {
    await product.addRelation({
      filters: { _id: modelId },
      relations: {
        parent: {
          _ids: new ObjectId(parent as string),
          relatedRelations: { children: true },
        },
      },
      projection: get,
      replace: true,
    });
  }

  if (tags) {
    await product.addRelation({
      filters: { _id: modelId },
      relations: {
        tags: {
          _ids: (tags as string[]).map((id: string) => new ObjectId(id)),
          relatedRelations: {
            products: true,
          },
        },
      },
      projection: get,
      replace: true,
    });
  }

  return await product.findOne({
    filters: { _id: modelId },
    projection: get,
  });
};
