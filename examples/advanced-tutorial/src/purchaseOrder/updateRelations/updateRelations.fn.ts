import { type ActFn, ObjectId } from "lesan";
import { purchaseOrder } from "../../../mod.ts";

export const updateRelationsFn: ActFn = async (body) => {
  const {
    set: { _id, requester, organization, requestingUnit, product, process, attachments, budgetLine, tender },
    get,
  } = body.details;

  const modelId = new ObjectId(_id as string);

  const single = {
    requester,
    organization,
    requestingUnit,
    product,
    process,
    budgetLine,
    tender,
  } as Record<string, unknown>;

  for (const [rel, value] of Object.entries(single)) {
    if (!value) continue;
    const related = (() => {
      switch (rel) {
        case "requester":
          return { purchaseOrders: true };
        case "organization":
          return { purchaseOrders: true };
        case "requestingUnit":
          return { purchaseOrders: true };
        case "product":
          return { purchaseOrders: true };
        case "process":
          return { purchaseOrders: true };
        case "budgetLine":
          return { purchaseOrders: true };
        case "tender":
          return { purchaseOrders: true };
        default:
          return {};
      }
    })();

    await purchaseOrder.addRelation({
      filters: { _id: modelId },
      relations: {
        [rel]: {
          _ids: new ObjectId(value as string),
          relatedRelations: related,
        },
      },
      projection: get,
      replace: true,
    });
  }

  if (attachments) {
    await purchaseOrder.addRelation({
      filters: { _id: modelId },
      relations: {
        attachments: {
          _ids: (attachments as string[]).map((id: string) => new ObjectId(id)),
          relatedRelations: {},
        },
      },
      projection: get,
      replace: true,
    });
  }

  return await purchaseOrder.findOne({
    filters: { _id: modelId },
    projection: get,
  });
};
