//import cors from "cors";

import "express-async-errors";

import express, { json, urlencoded } from "express";

import AppError from "../src/utils/AppError.js";

import routes from "./routes/index.js";

const app = express();

//app.use(cors({ credentials: true, origin: true }));
//app.options("*", cors());
app.use(json());
app.use(urlencoded({ extended: true }));

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
