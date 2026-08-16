import { type Document, ObjectId } from "lesan";
import { inventory, product, stockMovement } from "../mod.ts";

type StockOptions = {
  referenceType?: string;
  referenceId?: string;
  description?: string;
  lastCountedBy?: string;
};

export async function addStock(
  storeId: string,
  productId: string,
  quantity: number,
  reason: string,
  createdByUserId: string,
  options?: StockOptions,
): Promise<Document> {
  const existing = await inventory.findOne({
    filters: {
      "store._id": new ObjectId(storeId),
      "product._id": new ObjectId(productId),
    },
    projection: { _id: 1, quantity: 1 },
  }) as Document | null;

  let balanceBefore = 0;

  if (existing) {
    balanceBefore = (existing.quantity as number) || 0;
    await inventory.findOneAndUpdate({
      filter: { _id: existing._id as ObjectId },
      update: {
        $inc: { quantity },
        $set: { updatedAt: new Date() },
      },
      projection: { _id: 1, quantity: 1 },
    });
  } else {
    await inventory.insertOne({
      doc: { quantity },
      relations: {
        store: {
          _ids: new ObjectId(storeId),
          relatedRelations: { inventories: true },
        },
        product: {
          _ids: new ObjectId(productId),
          relatedRelations: { inventories: true },
        },
      },
      projection: { _id: 1, quantity: 1 },
    });
  }

  const balanceAfter = balanceBefore + quantity;

  await stockMovement.insertOne({
    doc: {
      quantity,
      balanceBefore,
      balanceAfter,
      reason,
      ...(options?.referenceType && { referenceType: options.referenceType }),
      ...(options?.referenceId && { referenceId: options.referenceId }),
      ...(options?.description && { description: options.description }),
    },
    relations: {
      store: {
        _ids: new ObjectId(storeId),
        relatedRelations: { stockMovements: true },
      },
      product: {
        _ids: new ObjectId(productId),
        relatedRelations: { stockMovements: true },
      },
      createdBy: {
        _ids: new ObjectId(createdByUserId),
        relatedRelations: { createdStockMovements: true },
      },
    },
    projection: { _id: 1, quantity: 1, balanceBefore: 1, balanceAfter: 1 },
  });

  return { success: true, productId, balanceBefore, balanceAfter };
}

export async function removeStock(
  storeId: string,
  productId: string,
  quantity: number,
  reason: string,
  createdByUserId: string,
  options?: StockOptions,
): Promise<Document> {
  const existing = await inventory.findOne({
    filters: {
      "store._id": new ObjectId(storeId),
      "product._id": new ObjectId(productId),
    },
    projection: { _id: 1, quantity: 1 },
  }) as Document | null;

  if (!existing) {
    throw new Error("Inventory not found for this store and product");
  }

  const balanceBefore = (existing.quantity as number) || 0;

  if (balanceBefore < quantity) {
    throw new Error("Insufficient inventory quantity");
  }

  const negQuantity = -Math.abs(quantity);

  await inventory.findOneAndUpdate({
    filter: { _id: existing._id as ObjectId },
    update: {
      $inc: { quantity: negQuantity },
      $set: { updatedAt: new Date() },
    },
    projection: { _id: 1, quantity: 1 },
  });

  const balanceAfter = balanceBefore - quantity;

  await stockMovement.insertOne({
    doc: {
      quantity: negQuantity,
      balanceBefore,
      balanceAfter,
      reason,
      ...(options?.referenceType && { referenceType: options.referenceType }),
      ...(options?.referenceId && { referenceId: options.referenceId }),
      ...(options?.description && { description: options.description }),
    },
    relations: {
      store: {
        _ids: new ObjectId(storeId),
        relatedRelations: { stockMovements: true },
      },
      product: {
        _ids: new ObjectId(productId),
        relatedRelations: { stockMovements: true },
      },
      createdBy: {
        _ids: new ObjectId(createdByUserId),
        relatedRelations: { createdStockMovements: true },
      },
    },
    projection: { _id: 1, quantity: 1, balanceBefore: 1, balanceAfter: 1 },
  });

  return { success: true, productId, balanceBefore, balanceAfter };
}

export async function transferStock(
  fromStoreId: string,
  toStoreId: string,
  productId: string,
  quantity: number,
  createdByUserId: string,
): Promise<Document> {
  await removeStock(fromStoreId, productId, quantity, "transfer_out", createdByUserId, {
    referenceType: "store",
    referenceId: toStoreId,
    description: `Transfer to store ${toStoreId}`,
  });

  await addStock(toStoreId, productId, quantity, "transfer_in", createdByUserId, {
    referenceType: "store",
    referenceId: fromStoreId,
    description: `Transfer from store ${fromStoreId}`,
  });

  return { success: true, productId, quantity, fromStoreId, toStoreId };
}

export async function getStockLevel(
  storeId: string,
  productId: string,
): Promise<Document> {
  const result = await inventory.findOne({
    filters: {
      "store._id": new ObjectId(storeId),
      "product._id": new ObjectId(productId),
    },
    projection: {
      _id: 1,
      quantity: 1,
      minQuantity: 1,
      maxQuantity: 1,
      batchNo: 1,
      expirationDate: 1,
      location: 1,
      store: 1,
      product: 1,
    },
  });

  return (result as Document) || { quantity: 0 };
}

export async function getProductStockLevels(productId: string): Promise<Document[]> {
  const results = await inventory
    .aggregation({
      pipeline: [
        { $match: { "product._id": new ObjectId(productId) } },
        { $sort: { quantity: -1 } },
      ],
      projection: {
        _id: 1,
        quantity: 1,
        minQuantity: 1,
        maxQuantity: 1,
        store: 1,
        product: 1,
      },
    })
    .toArray();

  return results as Document[];
}
