/**
 * Excludes — Field exclusion lists for relation projections.
 *
 * Each array defines which pure fields to exclude when a related document is
 * embedded through a relation. Most models exclude `createdAt`/`updatedAt`
 * for brevity; `user` additionally hides `password`.
 *
 * These arrays are referenced by the `excludes` property in relation
 * definitions across all model files to keep relation payloads lean.
 */
export const shared_relation_excludes: string[] = [
  "createdAt",
  "updatedAt",
  "description",
];

export const file_excludes: string[] = ["createdAt", "updatedAt", "size"];

export const user_excludes: string[] = ["createdAt", "updatedAt", "password"];

export const tag_excludes: string[] = ["createdAt", "updatedAt"];

export const organization_excludes: string[] = ["createdAt", "updatedAt"];

export const process_excludes: string[] = ["createdAt", "updatedAt"];

export const processStep_excludes: string[] = ["createdAt", "updatedAt"];

export const unit_excludes: string[] = ["createdAt", "updatedAt"];

export const product_excludes: string[] = ["createdAt", "updatedAt", "price"];

export const store_excludes: string[] = ["createdAt", "updatedAt"];

export const inventory_excludes: string[] = ["createdAt", "updatedAt"];

export const stockMovement_excludes: string[] = ["createdAt", "updatedAt"];

export const purchaseOrder_excludes: string[] = ["createdAt", "updatedAt"];

export const approvalStep_excludes: string[] = ["createdAt", "updatedAt"];

export const stepApproval_excludes: string[] = ["createdAt", "updatedAt"];

export const budgetLine_excludes: string[] = ["createdAt", "updatedAt"];

export const tender_excludes: string[] = ["createdAt", "updatedAt"];
