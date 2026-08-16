/**
 * File — Uploaded file metadata.
 *
 * Tracks uploaded files with MIME type, size, and an optional uploader
 * relation. Used as attachments across the system (avatars, purchase-order
 * attachments, tender documents).
 *
 * Pure fields: name, mimeType, size, type, alt_text
 * Relations: uploader (User)
 *
 * @example
 * {
 *   _id: ObjectId("..."),
 *   name: "quote_2024.pdf",
 *   mimeType: "application/pdf",
 *   size: 245760,
 *   type: "docs",
 *   // uploader → { _id: ObjectId("user_1"), first_name: "Sara", last_name: "Ahmadi" }
 * }
 */
import { coreApp } from "../mod.ts";
import {
  coerce,
  defaulted,
  enums,
  number,
  optional,
  type RelationDataType,
  type RelationSortOrderType,
  string,
} from "lesan";
import { createUpdateAt } from "@lib";
import { user_excludes } from "./excludes.ts";

export const file_type_array = ["image", "video", "docs", "other"];
export const file_type_emums = enums(file_type_array);

export const file_pure = {
  name: string(),
  mimeType: string(),
  size: number(),
  type: defaulted(
    coerce(
      file_type_emums,
      string(),
      (value) => value as typeof file_type_array[number],
    ),
    "other",
  ),
  alt_text: optional(string()),
  ...createUpdateAt,
};

export const file_relations = {
  uploader: {
    schemaName: "user",
    type: "single" as RelationDataType,
    optional: true,
    excludes: user_excludes,
    relatedRelations: {
      files: {
        type: "multiple" as RelationDataType,
        limit: 50,
        sort: {
          field: "_id",
          order: "desc" as RelationSortOrderType,
        },
      },
    },
  },
};

export const files = () =>
  coreApp.odm.newModel("file", file_pure, file_relations);
