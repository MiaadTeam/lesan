import { type ActFn, type TInsertRelations, ObjectId } from "lesan";
import { product } from "../../../mod.ts";
import { stripActiveRole } from "@lib";
import type { product_relations } from "@model";

export const addProductFn: ActFn = async (body) => {
  const { set, get } = body.details;
  const { parent, tags, ...rest } = stripActiveRole(set);

  const relations: TInsertRelations<typeof product_relations> = {};

  parent &&
    (relations.parent = {
      _ids: new ObjectId(parent as string),
      relatedRelations: { children: true },
    });

  if (tags && (tags as string[]).length > 0) {
    relations.tags = {
      _ids: (tags as string[]).map((id: string) => new ObjectId(id)),
      relatedRelations: {
        products: true,
      },
    };
  }

  return await product.insertOne({
    doc: rest,
    relations,
    projection: get,
  });
};
