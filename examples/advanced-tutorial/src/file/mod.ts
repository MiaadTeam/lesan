import { getFilesSetup } from "./getFiles/mod.ts";
import { uploadFileSetup } from "./uploadFile/mod.ts";
import { getFileSetup } from "./getFile/mod.ts";
import { removeFileSetup } from "./removeFile/mod.ts";

export const fileSetup = () => {
  getFilesSetup();
  uploadFileSetup();
  getFileSetup();
  removeFileSetup();
};
