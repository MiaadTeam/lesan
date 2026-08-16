import { addTagSetup } from "./addTag/mod.ts";
import { getTagsSetup } from "./getTags/mod.ts";
import { updateTagSetup } from "./updateTag/mod.ts";
import { removeTagSetup } from "./removeTag/mod.ts";

export const tagSetup = () => {
  addTagSetup();
  getTagsSetup();
  updateTagSetup();
  removeTagSetup();
};
