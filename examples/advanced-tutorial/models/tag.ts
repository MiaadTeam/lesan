/**
 * Tag — Lightweight label used to classify products.
 *
 * Pure fields: name, color
 * Relations: none
 *
 * @example
 * {
 *   _id: ObjectId("..."),
 *   name: "Medical",
 *   color: "#ff5252"
 * }
 */
import { coreApp } from "../mod.ts";
import { string } from "lesan";
import { createUpdateAt } from "@lib";

export const tag_pure = {
  name: string(),
  color: string(),
  ...createUpdateAt,
};

export const tag_relations = {};

export const tags = () =>
  coreApp.odm.newModel("tag", tag_pure, tag_relations, {
    createIndex: {
      indexSpec: { name: 1 },
      options: { unique: true },
    },
  });
