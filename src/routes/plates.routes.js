import { Router } from "express";
import multer from "multer";
import { MULTER } from "../configs/upload.js";

import PlatesController from "../controllers/PlatesController.js";
import ensureAuthenticated from "../middlewares/ensureAuthenticated.js";

const upload = multer(MULTER);

const platesController = new PlatesController();

const platesRoutes = Router();

platesRoutes.get("/", platesController.index);
platesRoutes.get("/:id", platesController.show);
platesRoutes.get("/:id/ingredients", platesController.showIngredients);
platesRoutes.post("/", upload.single("image"), platesController.create);
platesRoutes.put("/:id", ensureAuthenticated, platesController.update);
platesRoutes.delete("/:id", ensureAuthenticated, platesController.delete);

export default platesRoutes;
