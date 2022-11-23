import { Router } from "express";

import PlatesController from "../controllers/PlatesController.js";

const platesController = new PlatesController();

const platesRoutes = Router();

platesRoutes.get("/", platesController.index);
platesRoutes.get("/:id", platesController.show);
platesRoutes.get("/", platesController.create);
platesRoutes.get("/:id", platesController.update);
platesRoutes.get("/:id", platesController.delete);

export default platesRoutes;
