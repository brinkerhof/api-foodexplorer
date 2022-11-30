import { Router } from "express";

import PlatesController from "../controllers/PlatesController.js";
import ensureAuthenticated from "../middlewares/ensureAuthenticated.js";

const platesController = new PlatesController();

const platesRoutes = Router();

platesRoutes.get("/", platesController.index);
platesRoutes.get("/:id", platesController.show);
platesRoutes.get("/", ensureAuthenticated, platesController.create);
platesRoutes.get("/:id", ensureAuthenticated, platesController.update);
platesRoutes.get("/:id", ensureAuthenticated, platesController.delete);

export default platesRoutes;
