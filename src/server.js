// CTRL + ALT + L CONSOLE LOG INCRIVEL

import express from "express";
import cors from "cors";

import { UPLOADS_FOLDER } from "./configs/upload.js";

import AppError from "./utils/AppError.js";

import routes from "./routes/index.js";

const app = express();

app.options("*", cors({ origin: true, credentials: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/files", express.static(UPLOADS_FOLDER));

app.use(routes);

app.use((error, res) => {
  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({ status: "error", message: error.message });
  }
  console.log((error));
  return res
    .status(500)
    .json({ status: "error", message: "Internal Server Error" });
});

app.listen(3000, () => console.log("Listening on 3000"));
