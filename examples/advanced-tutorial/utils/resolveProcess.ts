import { ObjectId } from "lesan";
import { process } from "../mod.ts";
import { throwError } from "./throwError.ts";

interface ResolveProcessParams {
  organizationId: string;
  requestingUnitId?: string;
  productId: string;
}

export async function resolveProcessForPO(
  params: ResolveProcessParams,
): Promise<string> {
  const {
    organizationId,
    requestingUnitId,
    productId,
  } = params;
  const orgId = new ObjectId(organizationId);

  if (requestingUnitId) {
    const unitProcess = await process.findOne({
      filters: {
        "organization._id": orgId,
        "unit._id": new ObjectId(requestingUnitId),
        status: "Active",
      },
      projection: { _id: 1 },
    });
    if (unitProcess) return unitProcess._id.toString();
  }

  const doc = await process.findOne({
    filters: {
      "organization._id": orgId,
      "product._id": new ObjectId(productId),
      status: "Active",
    },
    projection: { _id: 1 },
  });
  if (doc) return doc._id.toString();

  const [orgProcess] = await process.aggregation({
    pipeline: [
      {
        $match: {
          "organization._id": orgId,
          status: "Active",
          $and: [
            { "unit._id": { $exists: false } },
            { "product._id": { $exists: false } },
          ],
        },
      },
      { $limit: 1 },
    ],
    projection: { _id: 1 },
  }).toArray();

  if (orgProcess) return orgProcess._id.toString();

  throwError(
    "No active process found for this organization. Please create and activate a process first.",
  );
  return "";
}
