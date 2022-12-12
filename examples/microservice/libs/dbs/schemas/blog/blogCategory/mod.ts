import { ecommerceApp } from "../../../../../apps/ecommerce/mod.ts";
import { array, InRelation, number, object, optional, OutRelation, string } from "../../../deps.ts";

import {
    blogCategoryInRel as sharedblogCategoryInRel,
    blogCategoryOutRel as sharedblogCategoryOutRel,
    pureblogCategoryObj as sharedPureblogCategoryObj,
} from "../../shared/mod.ts";

const blogCategoryPureObj: Partial<typeof sharedPureblogCategoryObj> = {
    name: string(),
    enName: string(),
    description: string()
};

const blogCategoryInRel: Partial<typeof sharedblogCategoryInRel> = {};

const blogCategoryOutRel: Partial<typeof sharedblogCategoryOutRel> = {
    blogPosts: {
        schemaName: "blogPost",
        number: 50,
        sort: { type: "objectId", field: "_id", order: "desc" },
      },
  };

export const blogCategories = () =>
    ecommerceApp.odm.setModel(
        "blogCategory",
        blogCategoryPureObj,
        blogCategoryInRel as Record<string, InRelation>,
        blogCategoryOutRel as Record<string, OutRelation>,
    );
