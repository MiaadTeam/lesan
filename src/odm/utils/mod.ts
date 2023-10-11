import { ObjectId } from "../../npmDeps.ts";
import { instance, size, string } from "../../npmDeps.ts";

export const objectIdValidation = instance(ObjectId) || size(string(), 24);

export * from "./checkNotLastProjection.ts";
export * from "./getPureFromDoc.ts";
export * from "./makeProjection.ts";
// export * from "./makePureProjection.ts";
