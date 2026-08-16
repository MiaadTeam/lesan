import { type ActFn, type TInsertRelations, ObjectId } from "lesan";
import { coreApp, purchaseOrder } from "../../../mod.ts";
import { stripActiveRole } from "@lib";
import type { MyContext } from "@lib";
import { resolveProcessForPO } from "@lib";
import type { purchaseOrder_relations } from "@model";

export const addFn: ActFn = async (body) => {
  const { set, get } = body.details;
  const {
    requester,
    organization,
    requestingUnit,
    product,
    process,
    attachments,
    budgetLine,
    status,
    ...rest
  } = stripActiveRole(set);

  const { user }: MyContext = coreApp.contextFns.getContextModel() as MyContext;

  let resolvedProcess = process as string | undefined;
  if (!resolvedProcess && organization) {
    resolvedProcess = await resolveProcessForPO({
      organizationId: organization as string,
      ...(requestingUnit && { requestingUnitId: requestingUnit as string }),
      productId: product as string,
    });
  }

  const relations: TInsertRelations<typeof purchaseOrder_relations> = {
    requester: {
      _ids: new ObjectId(requester as string),
      relatedRelations: { purchaseOrders: true },
    },
  };

  organization &&
    (relations.organization = {
      _ids: new ObjectId(organization as string),
      relatedRelations: { purchaseOrders: true },
    });

  requestingUnit &&
    (relations.requestingUnit = {
      _ids: new ObjectId(requestingUnit as string),
      relatedRelations: { purchaseOrders: true },
    });

  relations.product = {
    _ids: new ObjectId(product as string),
    relatedRelations: { purchaseOrders: true },
  };

  resolvedProcess &&
    (relations.process = {
      _ids: new ObjectId(resolvedProcess as string),
      relatedRelations: { purchaseOrders: true },
    });

  if (attachments && (attachments as string[]).length > 0) {
    relations.attachments = {
      _ids: (attachments as string[]).map((id: string) => new ObjectId(id)),
      relatedRelations: {},
    };
  }

  budgetLine &&
    (relations.budgetLine = {
      _ids: new ObjectId(budgetLine as string),
      relatedRelations: { purchaseOrders: true },
    });

  const history = [
    {
      action: "created",
      performed: {
        by: user._id.toString(),
        name: `${(user as any).first_name ?? ""} ${(user as any).last_name ?? ""}`.trim(),
        at: new Date(),
        role: {
          id: "",
          name: "",
        },
      },
    },
  ];

  return await purchaseOrder.insertOne({
    doc: { ...rest, status: status ?? "Draft", history },
    relations,
    projection: get,
  });
};
