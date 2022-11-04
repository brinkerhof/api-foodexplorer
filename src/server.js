//import cors from "cors";

import express, { json, urlencoded } from "express";

const app = express();

//app.use(cors({ credentials: true, origin: true }));
//app.options("*", cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.listen(3000, () => console.log("Listening on 3000"));
