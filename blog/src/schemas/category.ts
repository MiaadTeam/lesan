export const content = `
import { db } from "../../config/index.ts";

export interface Category {
  name: string;
  enName: string;
  icon: string;
  description: string;
}

export const categories = db.collection<Category>("Categories");
`;

export const createCategorySchema = async (init: string) => {
  await Deno.writeTextFile(`${init}/category.ts`, content);
};
