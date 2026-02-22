import { Db, Document, Filter } from "../../../npmDeps.ts";
import { createProjection } from "../../models/createProjection.ts";
import {
  IRelationsFileds,
  schemaFns,
  TInsertRelations,
  TSchemas,
} from "../../models/mod.ts";
import { throwError } from "../../utils/throwError.ts";
import { Projection } from "../aggregation/type.ts";
import { handleMultiRelation } from "../utils/insert/handleMultiRelation.ts";
import { handleSingleRelation } from "../utils/insert/handleSingleRelation.ts";
import { processRemoveRelatedRelations } from "../utils/processRemoveRelatedRelations.ts";
import { generateRelationUpdatePipeline } from "../utils/generateRelationUpdatePipeline.ts";

/**
 * # addRelation
 *
 * Attaches one or more relations to an existing document in a MongoDB collection,
 * keeping **both sides** of every relation (the main document and its related
 * "back-reference" documents) fully denormalised and in sync.
 *
 * Lesan stores relation data **inline** inside every document (denormalisation).
 * That means when a `city` points to a `province`, the city document embeds a
 * snapshot of the province, and the province document also embeds a snapshot of
 * the city inside its `cities` array. `addRelation` takes care of wiring all of
 * that up in a single call, including cleaning up any previously embedded
 * relation data when a relation is being replaced.
 *
 * ---
 *
 * ## Parameters
 *
 * | Name         | Type                     | Required | Description |
 * |--------------|--------------------------|----------|-------------|
 * | `db`         | `Db`                     | ✅       | The active MongoDB `Db` instance. |
 * | `schemasObj` | `TSchemas`               | ✅       | The full Lesan schema registry. Used to look up relation definitions and build projections. |
 * | `collection` | `string`                 | ✅       | Name of the collection whose document will receive the new relation(s). |
 * | `filters`    | `Filter<Document>`       | ✅       | MongoDB filter that uniquely identifies the target document (typically `{ _id: ... }`). |
 * | `relations`  | `TInsertRelations<TR>`   | ✅       | Map of relation field names to relation payloads. Each payload carries the `_id`(s) of the related document(s) and a `relatedRelations` flag map indicating which back-references should be updated. |
 * | `projection` | `Projection`             | ❌       | Optional MongoDB projection for the final return value. When omitted only `{ _id }` is returned. |
 * | `replace`    | `boolean`                | ❌       | When `true`, an existing **single** relation is silently replaced. When `false` or `undefined` and the relation already exists, an error is thrown. Has no effect on `multiple` relations. |
 *
 * ---
 *
 * ## How it works — step by step
 *
 * ### 1. Document lookup
 * The target document is fetched from `collection` using `filters`.  A hard
 * error is thrown when no document matches, because every subsequent step
 * depends on the document existing.
 *
 * ### 2. Pure-field projection snapshot
 * A "pure" projection (only scalar fields, no relation fields) is built for the
 * collection via `createProjection(..., "Pure")`.  A `generatedDoc` object is
 * then populated with those pure fields from the found document.  This snapshot
 * travels through the helper functions so that when the current document's data
 * is embedded inside a related document's back-reference it only contains the
 * scalar fields — never nested relation objects.
 *
 * ### 3. Per-relation processing loop
 * For every entry in `relations` the function branches on the relation type
 * defined in the schema:
 *
 * #### 3a. `type === "single"` — single-value relation
 *
 * 1. **Guard against double-write** — if the relation field is already populated
 *    on the document AND `replace` is not explicitly `true`, an error is thrown.
 *
 * 2. **Remove previous back-references** (`processRemoveRelatedRelations`) —
 *    When a relation is being *replaced* the old related document still holds
 *    the current document in its back-reference arrays/fields. This step cleans
 *    those up before the new relation is set.  Only the `relatedRelations` that
 *    are flagged `true` in the incoming payload are cleaned up.
 *    - `removeDocId` is the `_id` of the main document (the one being updated)
 *      — it is used to filter this document out of the old related document's
 *      back-reference arrays.
 *    - `relDocForUpdate` is the `_id` of the *previously embedded* related
 *      document — it is the `_id` of the document on whose collection the
 *      back-reference cleanup `updateOne` is executed.
 *
 * 3. **Set the new relation** (`handleSingleRelation`) — fetches the new related
 *    document, slices it to its pure fields (applying `excludes` from the schema
 *    definition), embeds it into `generatedDoc[rel]`, and then updates every
 *    `relatedRelations` that is flagged `true` on the related document's side
 *    (i.e. adds the current document's snapshot to the related document).
 *
 * 4. **Persist** — writes `{ $set: { [rel]: generatedDoc[rel] } }` to the main
 *    document.
 *
 * #### 3b. `type === "multiple"` — array relation
 *
 * 1. **Fetch & embed** (`handleMultiRelation`) — fetches all related documents
 *    by the supplied `_ids`, slices each to pure fields, stores the array in
 *    `generatedDoc[rel]`, and updates back-references on each related document
 *    where the corresponding `relatedRelations` flag is `true`.
 *
 * 2. **Persist with limit-aware pipeline** — if the schema declares a `limit`
 *    for this relation, `generateRelationUpdatePipeline` produces an aggregation
 *    update pipeline that merges the new items into the existing array, applies
 *    the configured `sort`, and then `$slice`s the array down to `limit`.
 *    Otherwise a plain `$addToSet` is used to append without duplicates.
 *
 * ### 4. Return value
 * After all relations are processed, the function re-fetches the document:
 * - With `projection` → returns the full document filtered by that projection.
 * - Without `projection` → returns only `{ _id }`.
 *
 * ---
 *
 * ## Behaviour matrix for `single` relations
 *
 * | Relation already set? | `replace` value | Outcome |
 * |-----------------------|-----------------|---------|
 * | No                    | any             | Relation is set normally. |
 * | Yes                   | `true`          | Previous back-references are cleaned up, then new relation is set. |
 * | Yes                   | `false`         | Error thrown — relation already exists. |
 * | Yes                   | `undefined`     | Error thrown — relation already exists. |
 *
 * ---
 *
 * ## Sub-routines called
 *
 * | Function                          | Responsibility |
 * |-----------------------------------|----------------|
 * | `schemaFns(schemasObj).getSchema` | Retrieves the compiled schema definition (pure fields + relation definitions) for the collection. |
 * | `createProjection`                | Builds a MongoDB projection object that covers only the "pure" (scalar) fields of a schema, optionally excluding specified keys. |
 * | `processRemoveRelatedRelations`   | For a relation being replaced, removes the current document's snapshot from the old related document's back-reference fields. |
 * | `handleSingleRelation`            | Fetches the new related document, embeds it in `generatedDoc`, and writes back-reference updates to the related document. |
 * | `handleMultiRelation`             | Fetches multiple related documents, embeds them in `generatedDoc`, and writes back-reference updates to each related document. |
 * | `generateRelationUpdatePipeline`  | Builds a MongoDB aggregation update pipeline that merges, sorts, and limits a relation array field. |
 *
 * ---
 *
 * ## Usage example
 *
 * The following example is taken from the `updateCityRelations` action and shows
 * how to attach a `province` to a `city` document.  The `province` schema has a
 * `cities` back-reference (type `multiple`, limit 50) and a `center`
 * back-reference (type `single`).  Passing `cities: true` means the current
 * city will be added to (or maintained in) the province's `cities` array.
 * Passing `center: false` means the province's `center` field is left untouched.
 *
 * ```ts
 * import { type ActFn, ObjectId, type TInsertRelations } from "@deps";
 * import type { city_relations } from "@model";
 * import { city } from "../../../mod.ts";
 *
 * export const updateCityRelationsFn: ActFn = async (body) => {
 *   const {
 *     set: { _id, province },
 *     get,
 *   } = body.details;
 *
 *   const relations: TInsertRelations<typeof city_relations> = {};
 *
 *   if (province) {
 *     relations.province = {
 *       // The _id of the province document to attach.
 *       _ids: new ObjectId(province as string),
 *       relatedRelations: {
 *         // true  → add this city to the province's `cities` array.
 *         cities: true,
 *         // false → do NOT update the province's `center` field.
 *         center: false,
 *       },
 *     };
 *   }
 *
 *   return city.addRelation({
 *     filters: { _id: new ObjectId(_id as string) },
 *     relations,
 *     projection: get,
 *     // replace: true would be needed if the city already has a province
 *     // and you want to swap it for a different one.
 *     replace: true,
 *   });
 * };
 * ```
 *
 * ---
 *
 * ## Important notes for AI agents
 *
 * - **`schemasObj` is mandatory** even though it is not part of the public
 *   model method signature seen by callers — it is injected automatically by
 *   the ODM wrapper.  Do not omit it when calling this function directly.
 *
 * - **`removeDocId` vs `relDocForUpdate`** — these two `ObjectId` values serve
 *   different purposes inside `processRemoveRelatedRelations`:
 *   - `removeDocId` = `_id` of the **main** document (the city). It is used as
 *     a filter value to remove the city's snapshot from the old province's array.
 *   - `relDocForUpdate` = `_id` of the **previously embedded related** document
 *     (the old province). It identifies which related document's record to update.
 *
 * - **Denormalisation**: Lesan does not use references (foreign keys). Every
 *   embedded relation field holds a full snapshot of the related document's
 *   pure fields at the time of the call.  Changing the related document later
 *   does **not** automatically update existing snapshots — a separate
 *   `updateRelation` / `updateField` call is required for that.
 *
 * - **`relatedRelations` flags**: Only the flags explicitly set to `true` in the
 *   incoming `relations[rel].relatedRelations` map trigger a back-reference
 *   write on the related document's collection. Flags set to `false` are
 *   completely skipped, which is an intentional performance optimisation —
 *   callers opt-in to the back-reference updates they actually need.
 *
 * @template TR - Shape of the relation fields for the target collection,
 *   inferred from the model's `relations` export.  Used to provide
 *   type-safe auto-completion for the `relations` parameter.
 *
 * @param options - See parameter table above.
 * @returns The updated document filtered by `projection`, or `{ _id }` when no
 *   projection is provided.
 *
 * @throws When the target document is not found.
 * @throws When a `single` relation is already set and `replace` is not `true`.
 * @throws When any of the specified related documents cannot be found.
 */
export const addRelation = async <TR extends IRelationsFileds>({
  db,
  schemasObj,
  collection,
  filters,
  relations,
  projection,
  replace,
}: {
  db: Db;
  schemasObj: TSchemas;
  collection: string;
  filters: Filter<Document>;
  relations: TInsertRelations<TR>;
  projection?: Projection;
  replace?: boolean;
}) => {
  const foundedSchema = schemaFns(schemasObj).getSchema(collection);
  const foundedDoc = await db.collection(collection).findOne(filters);

  if (!foundedDoc) {
    throwError("can not find this document");
  }

  // Build a "pure" projection (scalar fields only, no embedded relations) for
  // the main collection. This is used to:
  //   1. Seed generatedDoc with the current pure field values of the document.
  //   2. Determine which fields to embed when writing back-references.
  const foundedDocPureProjection = createProjection(
    schemasObj,
    collection,
    "Pure",
  );

  // Populate generatedDoc with only the pure (scalar) fields of the found
  // document. Relation helper functions (handleSingleRelation,
  // handleMultiRelation) will add the newly resolved relation fields to this
  // object during processing.
  const generatedDoc: Document = {};
  for (const pureKey in foundedDocPureProjection) {
    generatedDoc[pureKey] = foundedDoc![pureKey];
  }

  // A second pure projection used when embedding the main document's data into
  // back-reference fields on the related documents' side.
  const pureDocProjection = createProjection(
    schemasObj,
    collection,
    "Pure",
  );

  for (const rel in relations) {
    // Build the pure projection for the *related* collection, applying any
    // `excludes` configured on the relation definition. This controls which
    // fields of the related document are embedded into the main document.
    const pureRelProjection = createProjection(
      schemasObj,
      foundedSchema.relations[rel].schemaName,
      "Pure",
      foundedSchema.relations[rel].excludes,
    );

    if (foundedSchema.relations[rel]) {
      if (foundedSchema.relations[rel].type === "single") {
        // Guard: if this single-value relation field is already occupied and
        // the caller has not explicitly opted into replacement, reject the call.
        if (foundedDoc![rel] && replace === undefined || replace === false) {
          throwError(
            `the ${rel} relation is already added if you want to replaced this please add replace option`,
          );
        }

        // When replacing an existing relation we must first clean up the old
        // back-references so the previously related document no longer holds a
        // snapshot of this document in its back-reference fields.
        //   - removeDocId    : _id of THIS document (to remove from the old
        //                      related document's arrays/fields).
        //   - relDocForUpdate: _id of the OLD related document (the document
        //                      whose collection we will update).
        if (foundedDoc && foundedDoc[rel]) {
          await processRemoveRelatedRelations({
            db,
            rel,
            relations,
            foundedDoc,
            foundedSchema,
            collection,
            schemasObj,
            prevRelationDoc: foundedDoc[rel],
            removeDocId: foundedDoc!._id,
            relDocForUpdate: foundedDoc[rel]._id,
          });
        }

        // Fetch the new related document, embed it into generatedDoc[rel],
        // and write the opt-in back-reference updates on the related document.
        await handleSingleRelation({
          db,
          relations,
          rel,
          foundedSchema,
          pureRelProjection,
          pureDocProjection,
          generatedDoc,
        });

        // Persist the newly resolved relation field on the main document.
        await db.collection(collection).updateOne({ _id: foundedDoc!._id }, {
          $set: { [rel]: generatedDoc[rel] },
        });
      } else {
        // For multiple relations: fetch all related docs, embed them into
        // generatedDoc[rel], and write opt-in back-reference updates on each.
        await handleMultiRelation({
          db,
          foundedSchema,
          relations,
          rel,
          pureRelProjection,
          pureDocProjection,
          generatedDoc,
        });

        if (foundedSchema.relations[rel].limit) {
          // When the schema defines a limit for this relation array, use an
          // aggregation update pipeline so the array is merged, sorted, and
          // capped to the configured limit atomically.
          const generateUpdatePipeline = generateRelationUpdatePipeline(
            rel,
            generatedDoc[rel],
            foundedSchema.relations[rel].sort,
            foundedSchema.relations[rel].limit,
          );

          await db.collection(collection).updateOne(
            { _id: foundedDoc!._id },
            generateUpdatePipeline,
          );
        } else {
          // No limit configured: simply append all new items without duplicates.
          await db.collection(collection).updateOne({ _id: foundedDoc!._id }, {
            $addToSet: { [rel]: { $each: generatedDoc[rel] } },
          });
        }
      }
    }
  }

  // Return the updated document filtered by the caller's projection, or just
  // { _id } when no projection was supplied.
  return projection
    ? await db.collection(collection).findOne({ _id: foundedDoc!._id }, {
      projection,
    })
    : { _id: foundedDoc!._id };
};
