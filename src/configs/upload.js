import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import crypto from "crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const TMP_FOLDER = resolve(__dirname, "..", "..", "tmp");

export const UPLOADS_FOLDER = resolve(TMP_FOLDER, "uploads");

export const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(req, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
