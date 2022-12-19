//import cors from "cors";
// CTRL + ALT + L CONSOLE LOG INCRIVEL

import "express-async-errors";

import express, { json, urlencoded } from "express";

import { UPLOADS_FOLDER } from "./configs/upload.js";

import AppError from "./utils/AppError.js";

import routes from "./routes/index.js";

const app = express();

//app.use(cors({ credentials: true, origin: true }));
//app.options("*", cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/files", express.static(UPLOADS_FOLDER));

app.use(routes);

app.use((error, res) => {
  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({ status: "error", message: error.message });
  }
  console.log(error);
  return res
    .status(500)
    .json({ status: "error", message: "Internal Server Error" });
});

app.listen(3000, () => console.log("Listening on 3000"));
