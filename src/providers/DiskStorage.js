import { promises } from "fs";
import { resolve } from "path";
import { TMP_FOLDER, UPLOADS_FOLDER } from "../configs/upload.js";

export default class DiskStorage {
  async saveFile(file) {
    await promises.rename(
      resolve(TMP_FOLDER, file),
      resolve(UPLOADS_FOLDER, file)
    );
    return file;
  }

  async deleteFile(file) {
    const filePath = resolve(UPLOADS_FOLDER, file);
    try {
      await promises.stat(filePath);
    } catch (error) {
      return error.message;
    }
    await promises.unlink(filePath);
  }
}
