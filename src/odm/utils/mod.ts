import { instance, ObjectId, size, string } from "../../deps.ts";

export const objectIdValidation = instance(ObjectId) || size(string(), 24);

export * from "./addOutrelation.ts";
export * from "./checkInsertRelation.ts";
export * from "./collectData.ts";
export * from "./getPureFromDoc.ts";
export * from "./makeProjection.ts";
// export * from "./makePureProjection.ts";
