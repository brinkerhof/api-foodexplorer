import { Router } from "express";
import multer from "multer";
import { MULTER } from "../configs/upload.js";

import PlatesController from "../controllers/PlatesController.js";
import PlatePhotoController from "../controllers/PlatePhotoController.js";
import ensureAuthenticated from "../middlewares/ensureAuthenticated.js";


const platesController = new PlatesController();
const platePhotoController = new PlatePhotoController();

const platesRoutes = Router();
const upload = multer(MULTER);

platesRoutes.get("/", platesController.index);
platesRoutes.get("/:id", platesController.show);
platesRoutes.post("/", platesController.create)
platesRoutes.patch(
  '/image/:id',
  upload.single('image'),
  platePhotoController.update
);
platesRoutes.put("/:id", ensureAuthenticated, platesController.update);
platesRoutes.delete("/:id", ensureAuthenticated, platesController.delete);

export default platesRoutes;
